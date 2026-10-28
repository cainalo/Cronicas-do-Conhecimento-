import { useEffect, useState } from 'react';
import { isNative } from '@/app/native';
import { Icon } from './Icon';

interface Version {
  versionName: string;
  size: number;
  builtAt: string;
}

const base = import.meta.env.BASE_URL;
export const APK_URL = `${base}download/saberio.apk`;

/** Cartão de download do app Android. Não aparece dentro do próprio app. */
export function AppDownload({ compact = false }: { compact?: boolean }) {
  const [v, setV] = useState<Version | null>(null);
  const [help, setHelp] = useState(false);
  useEffect(() => {
    if (isNative()) return;
    fetch(`${base}download/version.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then(setV)
      .catch(() => setV(null));
  }, []);
  if (isNative() || !v) return null;
  const mb = (v.size / 1048576).toFixed(1);

  return (
    <section className="card overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <img src={`${base}pwa-192.png`} alt="" className="h-14 w-14 shrink-0 rounded-2xl shadow-lg" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight">App para Android</p>
          <p className="text-sm text-muted">
            Versão {v.versionName} · {mb} MB{compact ? '' : ` · ${new Date(v.builtAt).toLocaleDateString('pt-BR')}`}
          </p>
        </div>
        <a href={APK_URL} download className="btn-primary shrink-0 !px-4">
          <Icon name="download" size={18} /> Baixar
        </a>
      </div>
      {!compact && (
        <div className="border-t border-line/40 px-4 py-3 text-sm">
          <button className="text-gold underline-offset-4 hover:underline" onClick={() => setHelp((h) => !h)} aria-expanded={help}>
            {help ? 'Ocultar instruções' : 'Como instalar'}
          </button>
          {help && (
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
              <li>Toque em Baixar e abra o arquivo baixado.</li>
              <li>Se o Android pedir, permita instalar apps desta fonte (o navegador) e toque em Instalar.</li>
              <li>Novas versões instalam por cima, sem perder o progresso. Com conta, o progresso também fica no servidor.</li>
              <li>O app não está na Play Store; o arquivo vem deste site, gerado automaticamente a partir do código do projeto.</li>
            </ol>
          )}
        </div>
      )}
    </section>
  );
}
