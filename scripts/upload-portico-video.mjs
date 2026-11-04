#!/usr/bin/env node
/**
 * Upload das videoaulas oficiais do Pórtico para o Supabase Storage.
 *
 * Requer:
 *   SUPABASE_SERVICE_ROLE_KEY (ou SUPABASE_SECRET_KEY) em variável de ambiente.
 *   @supabase/supabase-js instalado no projeto.
 *
 * Uso:
 *   node scripts/upload-portico-video.mjs caminho/do/video.mp4
 *   node scripts/upload-portico-video.mjs caminho/do/video.mp4 --upsert
 *
 * Nunca coloque a chave em arquivos, argumentos de terminal ou no Git.
 */
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? 'https://qptxcdksufdpbxddqpsw.supabase.co';
const BUCKET = 'portico-lesson-videos';
const SAFE_MAX_BYTES = 45 * 1024 * 1024;
const ALLOWED_FILES = new Set([
  '01-o-computador-por-dentro.mp4',
  '02-programa-e-processo.mp4',
]);

function fail(message) {
  console.error(`\nERRO: ${message}\n`);
  process.exit(1);
}

const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY;

if (!key) {
  fail(
    'Defina SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_SECRET_KEY apenas no seu terminal. ' +
      'Não envie essa chave pelo chat e não a salve no repositório.',
  );
}

const inputPath = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
if (!inputPath) {
  fail('Informe o caminho do arquivo MP4 como primeiro argumento.');
}

const filePath = path.resolve(inputPath);
const fileName = path.basename(filePath);

if (!ALLOWED_FILES.has(fileName)) {
  fail(
    `Nome não reconhecido: "${fileName}". Use um destes nomes: ${[...ALLOWED_FILES].join(', ')}.`,
  );
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
      `O limite preventivo deste script é 45 MiB; comprima o vídeo antes de enviar.`,
  );
}

const bytes = await readFile(filePath);
const supabase = createClient(SUPABASE_URL, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

console.log(`Projeto: ${new URL(SUPABASE_URL).host}`);
console.log(`Bucket: ${BUCKET}`);
console.log(`Arquivo: ${fileName} (${(fileStats.size / 1024 / 1024).toFixed(1)} MiB)`);
console.log('Enviando vídeo...');

const { error } = await supabase.storage.from(BUCKET).upload(fileName, bytes, {
  contentType: 'video/mp4',
  upsert: process.argv.includes('--upsert'),
  cacheControl: '31536000',
});

if (error) {
  if (/bucket.*not found|not found/i.test(error.message)) {
    fail(
      `O bucket "${BUCKET}" não existe. Aplique primeiro a migração ` +
        'supabase/migrations/20261104000100_portico_lesson_video_storage.sql.',
    );
  }
  if (/already exists|duplicate/i.test(error.message)) {
    fail(
      'O arquivo já existe no bucket. Para substituí-lo conscientemente, execute novamente com --upsert.',
    );
  }
  fail(error.message);
}

const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
const publicUrl = data.publicUrl;

console.log('\nUpload concluído.');
console.log('URL pública:');
console.log(publicUrl);

try {
  const response = await fetch(publicUrl, { method: 'HEAD' });
  if (response.ok) {
    console.log(`Verificação HTTP: ${response.status} — arquivo acessível publicamente.`);
    console.log(`Content-Type: ${response.headers.get('content-type') ?? 'não informado'}`);
  } else {
    console.warn(
      `O upload foi concluído, mas a verificação HEAD retornou HTTP ${response.status}. ` +
        'Abra a URL no navegador para verificar a reprodução.',
    );
  }
} catch (error) {
  console.warn(
    'O upload foi concluído, mas não consegui validar a URL automaticamente: ' +
      (error instanceof Error ? error.message : String(error)),
  );
}

console.log(
  '\nPróximo passo: abrir a URL em um navegador, testar imagem e áudio e só então ' +
    'adicionar o ID do vídeo a PUBLISHED_IDS em src/content/estudos/portico-videos.ts.',
);
