import { NavLink, Outlet, Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { levelInfo, totalXp } from '@/lib/study';
import { roman } from '@/lib/roman';
import { Icon, type IconName } from '@/components/Icon';

const nav: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Torre', icon: 'torre', end: true },
  { to: '/biblioteca', label: 'Grimórios', icon: 'grimorio' },
  { to: '/revisao', label: 'Revisão', icon: 'ampulheta' },
  { to: '/progresso', label: 'Progresso', icon: 'mapa' },
  { to: '/conta', label: 'Conta', icon: 'chave' },
];

export function SyncBadge() {
  const { sync, session } = useStudy();
  const map = {
    local: { t: 'Local', c: 'opacity-70' },
    idle: { t: sync.pending ? `${sync.pending} a enviar` : 'Sincronizado', c: sync.pending ? 'opacity-90' : 'text-[#9fc58f]' },
    syncing: { t: 'Sincronizando…', c: 'opacity-90' },
    offline: { t: `Offline, ${sync.pending} a enviar`, c: 'opacity-90' },
    error: { t: `Falha no envio (${sync.pending})`, c: 'text-[#f0a08a]' },
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
  const lv = levelInfo(totalXp(data));
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <header className="leather-band top sticky top-0 z-20 flex h-12 items-center justify-between gap-3 px-4">
        <Link to="/" className="truncate font-gothic text-xl leading-none" style={{ textShadow: '0 1px 0 rgb(0 0 0 / 0.7)' }}>
          Crônicas do Conhecimento
        </Link>
        <div className="flex shrink-0 items-center gap-3 font-display text-sm">
          <SyncBadge />
          <span className="whitespace-nowrap" title={`${lv.into}/${lv.span} XP para o próximo nível`}>
            Nível {roman(lv.level).toUpperCase()}
          </span>
        </div>
      </header>
      <main className="folio mx-2 mb-24 mt-3 flex-1 px-4 pb-8 pt-5 sm:mx-4 sm:px-8">
        <Outlet />
      </main>
      <nav className="leather-band bottom safe-bottom fixed inset-x-0 bottom-0 z-20" aria-label="Navegação principal">
        <ul className="mx-auto grid max-w-3xl grid-cols-5">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex min-h-[58px] flex-col items-center justify-center gap-0.5 pt-1 font-display text-[12px] ${
                    isActive ? 'text-leaf' : 'text-[#d9c7a0]/60'
                  }`
                }
              >
                <Icon name={n.icon} size={22} />
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
