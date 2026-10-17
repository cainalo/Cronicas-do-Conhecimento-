import { NavLink, Outlet, Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { levelInfo, totalXp } from '@/lib/study';

const nav = [
  { to: '/', label: 'Torre', icon: '🏰', end: true },
  { to: '/biblioteca', label: 'Grimórios', icon: '📜' },
  { to: '/revisao', label: 'Revisão', icon: '🔁' },
  { to: '/progresso', label: 'Progresso', icon: '🧭' },
  { to: '/conta', label: 'Conta', icon: '🗝️' },
];

export function SyncBadge() {
  const { sync, session } = useStudy();
  const map = {
    local: { t: 'Local', c: 'text-muted' },
    idle: { t: sync.pending ? `${sync.pending} pendente(s)` : 'Sincronizado', c: sync.pending ? 'text-gold' : 'text-ok' },
    syncing: { t: 'Sincronizando…', c: 'text-gold' },
    offline: { t: `Offline · ${sync.pending} pendente(s)`, c: 'text-gold' },
    error: { t: `Erro · ${sync.pending} pendente(s)`, c: 'text-bad' },
  } as const;
  const m = map[sync.state];
  return (
    <Link to="/conta" className={`whitespace-nowrap text-xs ${m.c}`} title={session ? (sync.error ?? '') : 'Entre para salvar no servidor'}>
      ● {m.t}
    </Link>
  );
}

export function Layout() {
  const { data } = useStudy();
  const lv = levelInfo(totalXp(data));
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <header className="sticky top-0 z-20 flex h-12 items-center justify-between gap-3 border-b border-line bg-bg/95 px-4 backdrop-blur">
        <Link to="/" className="truncate font-display text-sm font-bold text-gold">
          Crônicas do Conhecimento
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <SyncBadge />
          <span className="chip whitespace-nowrap" title={`${lv.into}/${lv.span} XP para o próximo nível`}>
            Nv {lv.level}
          </span>
        </div>
      </header>
      <main className="flex-1 px-4 pb-24 pt-4">
        <Outlet />
      </main>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur" aria-label="Navegação principal">
        <ul className="mx-auto grid max-w-3xl grid-cols-5">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] ${isActive ? 'text-gold' : 'text-muted'}`
                }
              >
                <span aria-hidden className="text-lg leading-none">
                  {n.icon}
                </span>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
