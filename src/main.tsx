import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { registerSW } from 'virtual:pwa-register';

// Atualiza o app sozinho quando houver versão nova publicada.
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
