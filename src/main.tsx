import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/look.css';
import { setupNative } from './app/native';
import { loadPrefs } from './lib/storage';
import { applyLook, normalizeLook } from './lib/theme';

// Aplica a aparência escolhida antes da primeira pintura (sem piscar a paleta padrão).
{
  const p = loadPrefs();
  document.documentElement.dataset.theme = p.theme;
  applyLook(normalizeLook(p.look), p.theme);
}

// O site deixou de ser PWA: remove service workers e caches de versões anteriores.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
  if ('caches' in window) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k)));
}
void setupNative();

createRoot(document.getElementById('root')!).render(<App />);
