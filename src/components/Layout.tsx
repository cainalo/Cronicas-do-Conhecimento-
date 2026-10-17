import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { levelInfo, totalXp } from '@/lib/study';
import { Icon, type IconName } from '@/components/Icon';

const nav: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Torre', icon: 'torre', end: true },
  { to: '/biblioteca', label: 'Grimórios', icon: 'grimorio' },
  { to: '/treino', label: 'Treino', icon: 'ampulheta' },
  { to: '/reino', label: 'Reino', icon: 'mapa' },
  { to: '/conta', label: 'Conta', icon: 'chave' },
];

export function SyncBadge() {
  const { sync, session } = useStudy();
  const map = {
    local: { t: 'Local', c: 'text-muted' },
    idle: { t: sync.pending ? `${sync.pending} a enviar` : 'Salvo', c: sync.pending ? 'text-gold' : 'text-ok' },
    syncing: { t: 'Salvando…', c: 'text-gold' },
    offline: { t: `Offline (${sync.pending})`, c: 'text-gold' },
    error: { t: `Falha (${sync.pending})`, c: 'text-bad' },
  } as const;
  const m = map[sync.state];
  return (
    <Link to="/conta" className={`whitespace-nowrap text-xs ${m.c}`} title={session ? (sync.error ?? '') : 'Entre para salvar no servidor'}>
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />
      {m.t}
    </Link>
  );
}

export function Layout() {
  const { data } = useStudy();
  const { pathname } = useLocation();
  const lv = levelInfo(totalXp(data));
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <header className="safe-top sticky top-0 z-20 border-b border-line/30 bg-bg/80 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}pwa-192.png`} alt="" className="h-8 w-8 rounded-lg shadow-md" />
            <span className="truncate font-gothic text-[1.35rem] leading-none text-gold">Crônicas</span>
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            <SyncBadge />
            <Link
              to="/personagem"
              className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 py-1 pl-1 pr-3 font-display text-xs text-gold transition hover:bg-gold/20"
              title={`${lv.into}/${lv.span} XP para o próximo nível`}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-[0.7rem] font-bold text-[#2b1d0b]">{lv.level}</span>
              Nível
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 pb-32 pt-5 sm:px-6">
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 px-3" aria-label="Navegação principal">
        <ul className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-2xl border border-line/40 bg-surface/95 p-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `group flex min-h-[54px] flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium transition-all duration-200 ${
                    isActive ? 'bg-gold/15 text-gold' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon name={n.icon} size={22} className={`transition-transform duration-200 ${isActive ? '-translate-y-0.5 scale-110' : 'group-active:scale-90'}`} />
                    {n.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
