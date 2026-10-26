// Peças comuns das áreas de Conta e ajustes (pacote v4, etapa 6).
import { useSyncExternalStore, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { soundscape } from '@/app/soundscape';
import { Icon, type IconName } from '@/components/Icon';
import { PageHeader } from '@/components/Page';

/** Página secundária: volta para a Conta e mantém a mesma hierarquia em todas. */
export function SettingsPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <PageHeader area="conta" title={title} subtitle={subtitle} />
      {children}
    </div>
  );
}

export function Switch({ label, sub, checked, onChange }: { label: string; sub?: ReactNode; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="min-w-0">
        <span className="block font-semibold">{label}</span>
        {sub && <span className="block text-sm text-muted">{sub}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-ok' : 'bg-line'}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </label>
  );
}

/** Linha da página de entrada: rótulo, estado atual em uma linha e destino real. */
export function HubRow({ to, icon, title, summary, testId }: { to: string; icon: IconName; title: string; summary: ReactNode; testId?: string }) {
  return (
    <Link to={to} className="ledger-row" data-testid={testId}>
      <Icon name={icon} size={20} className="shrink-0 text-gold" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-sm text-muted">{summary}</span>
      </span>
      <Icon name="seta" size={16} className="shrink-0 text-muted" />
    </Link>
  );
}

/** Estado do ambiente sonoro (tocando ou não), para qualquer tela. */
export function useSoundPlaying() {
  return useSyncExternalStore(
    (f) => soundscape.subscribe(f),
    () => soundscape.isPlaying,
    () => false,
  );
}
