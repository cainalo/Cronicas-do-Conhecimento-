import { readFile, writeFile } from 'node:fs/promises';

const manifestPath = 'public/manifest.webmanifest';
const version = 'portico-20261028-2';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

// capacitor-assets pode reescrever o manifesto ao gerar os PNGs. Reaplique a marca
// aprovada e atribua URLs versionadas para forçar o celular a buscar os ícones novos.
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
console.log('Manifesto Pórtico atualizado; cache dos ícones marcado como ' + version);
