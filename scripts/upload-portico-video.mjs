#!/usr/bin/env node
/**
 * Upload resiliente das videoaulas do Pórtico para Supabase Storage usando TUS.
 *
 * Requer Node 20+ e uma chave secreta do projeto em variável de ambiente.
 * O script não salva nem imprime a chave. A URL temporária TUS fica em um
 * arquivo protegido no diretório temporário do sistema para permitir retomada.
 *
 * Uso:
 *   node scripts/upload-portico-video.mjs caminho/do/video.mp4
 *   node scripts/upload-portico-video.mjs caminho/do/video.mp4 --upsert
 *
 * Nunca coloque a chave em arquivos, argumentos de terminal ou no Git.
 */
import { open, readFile, stat, writeFile, unlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? 'https://qptxcdksufdpbxddqpsw.supabase.co';
const BUCKET = 'portico-lesson-videos';
const SAFE_MAX_BYTES = 45 * 1024 * 1024;
const CHUNK_SIZE = 6 * 1024 * 1024;
const ALLOWED_FILES = new Set([
  '01-o-computador-por-dentro.mp4',
  '02-programa-e-processo.mp4',
]);
const RETRY_DELAYS_MS = [1500, 3000, 6000, 10000, 15000];

function fail(message) {
  console.error(`\nERRO: ${message}\n`);
  process.exit(1);
}

const key =
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!key) {
  fail(
    'Defina SUPABASE_SECRET_KEY (preferencial) ou SUPABASE_SERVICE_ROLE_KEY apenas no seu terminal. ' +
      'Não envie essa chave pelo chat e não a salve no repositório.',
  );
}

const inputPath = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
if (!inputPath) fail('Informe o caminho do arquivo MP4 como primeiro argumento.');

const filePath = path.resolve(inputPath);
const fileName = path.basename(filePath);
if (!ALLOWED_FILES.has(fileName)) {
  fail(`Nome não reconhecido: "${fileName}". Arquivos aceitos: ${[...ALLOWED_FILES].join(', ')}.`);
}

let fileStats;
try {
  fileStats = await stat(filePath);
} catch {
  fail(`Não encontrei o arquivo: ${filePath}`);
}
if (!fileStats.isFile()) fail('O caminho informado não é um arquivo.');
if (fileStats.size > SAFE_MAX_BYTES) {
  fail(
    `O arquivo tem ${(fileStats.size / 1024 / 1024).toFixed(1)} MiB. ` +
      'O limite preventivo é 45 MiB; comprima o vídeo antes de enviar.',
  );
}

let projectRef;
try {
  projectRef = new URL(SUPABASE_URL).hostname.split('.')[0];
} catch {
  fail('SUPABASE_URL não é uma URL válida.');
}
const endpoint = `https://${projectRef}.storage.supabase.co/storage/v1/upload/resumable`;
const publicUrl =
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(fileName)}`;
const upsert = process.argv.includes('--upsert');
const statePath = path.join(
  os.tmpdir(),
  `portico-tus-${projectRef}-${fileName}-${fileStats.size}.json`,
);
const authHeaders = {
  apikey: key,
  authorization: `Bearer ${key}`,
};

const b64 = (value) => Buffer.from(value, 'utf8').toString('base64');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getServerOffset(uploadUrl) {
  const response = await fetch(uploadUrl, {
    method: 'HEAD',
    headers: { ...authHeaders, 'Tus-Resumable': '1.0.0' },
  });
  if (!response.ok) {
    throw new Error(`Não foi possível consultar a retomada TUS (HTTP ${response.status}).`);
  }
  const offset = Number(response.headers.get('Upload-Offset'));
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > fileStats.size) {
    throw new Error('O Supabase retornou um ponto de retomada inválido.');
  }
  return offset;
}

async function createUploadUrl() {
  const metadata = [
    `bucketName ${b64(BUCKET)}`,
    `objectName ${b64(fileName)}`,
    `contentType ${b64('video/mp4')}`,
    `cacheControl ${b64('31536000')}`,
  ].join(',');

  const headers = {
    ...authHeaders,
    'Tus-Resumable': '1.0.0',
    'Upload-Length': String(fileStats.size),
    'Upload-Metadata': metadata,
  };
  if (upsert) headers['x-upsert'] = 'true';

  const response = await fetch(endpoint, { method: 'POST', headers });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    if (/bucket.*not found|not found/i.test(detail)) {
      fail(
        `O bucket "${BUCKET}" não existe. Aplique primeiro a migração ` +
          'supabase/migrations/20261104000100_portico_lesson_video_storage.sql.',
      );
    }
    if (/already exists|duplicate|asset.*exists/i.test(detail)) {
      fail(
        'O arquivo já existe no bucket. Para substituí-lo conscientemente, execute novamente com --upsert.',
      );
    }
    fail(`Não foi possível iniciar o envio TUS (HTTP ${response.status}): ${detail}`);
  }

  const location = response.headers.get('Location');
  if (!location) fail('O Supabase iniciou o envio, mas não retornou a URL temporária TUS.');
  return new URL(location, endpoint).toString();
}

console.log(`Projeto: ${projectRef}`);
console.log(`Bucket: ${BUCKET}`);
console.log(`Arquivo: ${fileName} — ${(fileStats.size / 1024 / 1024).toFixed(1)} MiB`);
console.log('Transferência resumível TUS; blocos de 6 MiB.');

let uploadUrl;
try {
  const saved = JSON.parse(await readFile(statePath, 'utf8'));
  if (saved.size === fileStats.size && saved.uploadUrl) {
    uploadUrl = saved.uploadUrl;
    await getServerOffset(uploadUrl);
    console.log('Retomando uma transferência anterior.');
  }
} catch {
  // Não há sessão anterior válida; uma nova será criada abaixo.
}

if (!uploadUrl) {
  uploadUrl = await createUploadUrl();
  await writeFile(
    statePath,
    JSON.stringify({ size: fileStats.size, uploadUrl }),
    { mode: 0o600 },
  );
}

const handle = await open(filePath, 'r');
let offset;
try {
  offset = await getServerOffset(uploadUrl);
  let retries = 0;

  while (offset < fileStats.size) {
    const chunkLength = Math.min(CHUNK_SIZE, fileStats.size - offset);
    const chunk = Buffer.alloc(chunkLength);
    const { bytesRead } = await handle.read(chunk, 0, chunkLength, offset);
    if (bytesRead !== chunkLength) {
      throw new Error('Não foi possível ler o próximo bloco completo do arquivo.');
    }

    let response;
    try {
      response = await fetch(uploadUrl, {
        method: 'PATCH',
        headers: {
          ...authHeaders,
          'Tus-Resumable': '1.0.0',
          'Upload-Offset': String(offset),
          'Content-Type': 'application/offset+octet-stream',
        },
        body: chunk,
      });
    } catch {
      response = null;
    }

    if (response?.status === 204) {
      const nextOffset = Number(response.headers.get('Upload-Offset'));
      if (!Number.isSafeInteger(nextOffset) || nextOffset <= offset) {
        throw new Error('O Supabase não confirmou o avanço da transferência.');
      }
      offset = nextOffset;
      retries = 0;
      const percentage = ((offset / fileStats.size) * 100).toFixed(1);
      console.log(`Progresso: ${percentage}%`);
      continue;
    }

    if (response && response.status !== 409 && response.status < 500 && response.status !== 408 && response.status !== 429) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Falha no bloco TUS (HTTP ${response.status}): ${detail}`);
    }

    if (retries >= RETRY_DELAYS_MS.length) {
      throw new Error('A transferência foi interrompida após várias tentativas. Execute o mesmo comando novamente para retomá-la.');
    }

    await sleep(RETRY_DELAYS_MS[retries++]);
    offset = await getServerOffset(uploadUrl);
    await writeFile(
      statePath,
      JSON.stringify({ size: fileStats.size, uploadUrl }),
      { mode: 0o600 },
    );
  }
} finally {
  await handle.close();
}

await unlink(statePath).catch(() => undefined);

console.log('\nUpload concluído. Testando acesso público...');
console.log(publicUrl);
try {
  const response = await fetch(publicUrl, { method: 'HEAD' });
  if (!response.ok) {
    console.warn(`O vídeo foi enviado, mas a verificação pública retornou HTTP ${response.status}.`);
    console.warn('Abra a URL acima no navegador e confirme imagem e som.');
  } else {
    console.log(`Verificação HTTP: ${response.status} — arquivo público acessível.`);
    console.log(`Content-Type: ${response.headers.get('content-type') ?? 'não informado'}`);
    console.log(`Tamanho publicado: ${response.headers.get('content-length') ?? 'não informado'} bytes`);
  }
} catch (error) {
  console.warn(
    'Não consegui testar a URL automaticamente: ' +
      (error instanceof Error ? error.message : String(error)),
  );
}

console.log(
  '\nPróximo passo: assistir ao vídeo por essa URL e só então adicionar ' +
    'o ID correspondente a PUBLISHED_IDS em src/content/estudos/portico-videos.ts.',
);
