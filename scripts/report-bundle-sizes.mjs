// Relatório simples do bundle gerado pelo Vite.
// Executar após npm run build; só usa APIs nativas do Node e não altera o build.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = resolve('dist');
const HTML = join(DIST, 'index.html');

function javascriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return javascriptFiles(path);
    return entry.isFile() && path.endsWith('.js') ? [path] : [];
  });
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KiB';
}

if (!statSync(DIST, { throwIfNoEntry: false })?.isDirectory()) {
  throw new Error('Pasta dist/ ausente. Execute npm run build antes deste relatório.');
}

const html = readFileSync(HTML, 'utf8');
const referencedNames = new Set(
  [...html.matchAll(/(?:src|href)\s*=\s*["']([^"'#]+\.js(?:\?[^"']*)?)["']/g)]
    .map((match) => basename(new URL(match[1], 'https://local.invalid/').pathname)),
);
if (!referencedNames.size) {
  throw new Error('Não foi possível identificar scripts JS referenciados em dist/index.html; a medição inicial seria incorreta.');
}

const files = javascriptFiles(DIST)
  .map((path) => {
    const buffer = readFileSync(path);
    return {
      path: relative(DIST, path).replaceAll('\\', '/'),
      name: basename(path),
      bytes: buffer.byteLength,
      gzipBytes: gzipSync(buffer, { level: 9 }).byteLength,
    };
  })
  .sort((a, b) => b.bytes - a.bytes);

const initial = files.filter((file) => referencedNames.has(file.name));
const missing = [...referencedNames].filter((name) => !files.some((file) => file.name === name));
const total = (items, key) => items.reduce((sum, item) => sum + item[key], 0);

console.log('\nBundle JavaScript — medição do build atual');
console.log('Arquivos JS gerados: ' + files.length);
console.log('Arquivos referenciados pelo HTML inicial (entry + modulepreload): ' + initial.length);
console.log('Carga inicial estimada: ' + formatBytes(total(initial, 'bytes')) + ' bruta; ' + formatBytes(total(initial, 'gzipBytes')) + ' gzip');
console.log('\nTodos os chunks, do maior para o menor:');
for (const file of files) {
  const kind = referencedNames.has(file.name) ? '[inicial]' : '[sob demanda/dependência]';
  console.log(kind + ' ' + file.path + ' — ' + formatBytes(file.bytes) + ' bruta; ' + formatBytes(file.gzipBytes) + ' gzip');
}
if (missing.length) console.warn('Referências JS no HTML não localizadas em dist/: ' + missing.join(', '));
