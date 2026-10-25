// Aparência e leitura: tema, tamanho do texto e o painel completo de personalização.
import { Link } from 'react-router-dom';
import { usePrefs } from '@/app/prefs';
import { Icon } from '@/components/Icon';
import { SettingsPage } from './common';

export function AppearancePage() {
  const { prefs, setPrefs } = usePrefs();
  const scale = Math.round(prefs.fontScale * 100);
  return (
    <SettingsPage title="Aparência e leitura" subtitle="Tema, tamanho do texto e cores">
      <section className="card space-y-3 p-4">
        <h2 className="text-base">Tema</h2>
        <div className="flex gap-2">
          <button className={prefs.theme === 'light' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={prefs.theme === 'light'} onClick={() => setPrefs({ theme: 'light' })}>
            <Icon name="sol" size={18} /> Claro
          </button>
          <button className={prefs.theme === 'dark' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={prefs.theme === 'dark'} onClick={() => setPrefs({ theme: 'dark' })}>
            <Icon name="lua" size={18} /> Escuro
          </button>
        </div>
      </section>
      <section className="card space-y-3 p-4">
        <h2 className="text-base">Tamanho do texto das aulas</h2>
        <div className="flex items-center gap-3">
          <button className="btn-ghost !min-h-[44px] !px-4" aria-label="Diminuir texto" disabled={scale <= 90} onClick={() => setPrefs({ fontScale: Math.max(0.9, +(prefs.fontScale - 0.05).toFixed(2)) })}>
            A−
          </button>
          <span className="flex-1 text-center tabular-nums" aria-live="polite">
            {scale}%
          </span>
          <button className="btn-ghost !min-h-[44px] !px-4" aria-label="Aumentar texto" disabled={scale >= 140} onClick={() => setPrefs({ fontScale: Math.min(1.4, +(prefs.fontScale + 0.05).toFixed(2)) })}>
            A+
          </button>
        </div>
        <p className="text-sm text-muted" style={{ fontSize: `${prefs.fontScale}rem` }}>
          Exemplo: um processo é um programa em execução.
        </p>
      </section>
      <Link to="/personalizar" className="btn-primary w-full" data-testid="abrir-personalizar">
        <Icon name="estrela" size={18} /> Personalizar cores e estilos
      </Link>
      <p className="text-xs text-muted">Animações seguem a preferência de movimento reduzido do aparelho. As aulas narradas têm legendas e transcrição.</p>
    </SettingsPage>
  );
}
