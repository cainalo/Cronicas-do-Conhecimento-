// Página do endereço /download/: leva direto ao APK, para quem chega pelo link curto.
import { Link } from 'react-router-dom';
import { APK_URL, AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';

export function DownloadPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Baixar o app Android</h1>
      <AppDownload />
      <a href={APK_URL} download className="btn-primary w-full">
        <Icon name="seta" size={18} /> Baixar o APK
      </a>
      <p className="text-sm text-muted">Depois de baixar, abra o arquivo e permita a instalação. Para atualizar, baixe e instale de novo: o progresso fica guardado.</p>
      <Link to="/" className="btn-ghost w-full">
        Voltar para Hoje
      </Link>
    </div>
  );
}
