import { readFile, writeFile, stat } from 'node:fs/promises';

const manifestPath = 'public/manifest.webmanifest';
const htmlPath = 'index.html';
// Unique per workflow commit: mobile browsers often cache installed-app icons more
// aggressively than ordinary page assets, so a permanent version string is insufficient.
const version = 'portico-' + (process.env.GITHUB_SHA?.slice(0, 12) || Date.now().toString(36));
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

for (const path of ['public/pwa-192.png', 'public/pwa-512.png', 'public/maskable-512.png', 'public/apple-touch-icon.png']) {
  const info = await stat(path);
  if (info.size < 1000) throw new Error('Ícone web ausente ou inválido: ' + path);
}

// capacitor-assets can rewrite the manifest during generation. Reapply the approved
// Pórtico metadata and version all installed-app icon URLs.
Object.assign(manifest, {
  id: './',
  name: 'Pórtico',
  short_name: 'Pórtico',
  description: 'Conhecimento é o nosso ponto de partida.',
  start_url: './',
  scope: './',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#f7efdf',
  theme_color: '#0f4c5c',
  icons: [
    { src: './pwa-192.png?v=' + version, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: './pwa-512.png?v=' + version, sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: './maskable-512.png?v=' + version, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
});
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

let html = await readFile(htmlPath, 'utf8');
for (const asset of ['icon\\.svg', 'apple-touch-icon\\.png', 'manifest\\.webmanifest']) {
  const pattern = new RegExp('(href="%BASE_URL%' + asset + '\\?v=)[^"]+');
  if (!pattern.test(html)) throw new Error('Link com versão de cache não encontrado em index.html: ' + asset);
  html = html.replace(pattern, (_match, prefix) => prefix + version);
}
await writeFile(htmlPath, html);
console.log('Ícones Pórtico gerados e cache invalidado com ' + version);
