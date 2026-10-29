import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { logUnit } from '@/lib/pace';
import { AREAS, areaOf, isAreaHome, type AreaKey } from '@/app/areas';
import { useCheckpoint } from '@/app/useCheckpoint';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { returnToPreviousPage } from '@/lib/navigation';

// Reformulação (Fase 1): cinco áreas, iguais no celular (menu de baixo) e no computador (topo).
const TABS: AreaKey[] = ['torre', 'grimorios', 'explorar', 'treino', 'reino'];

export function SyncBadge() {
  const { sync, session } = useStudy();
  const map = {
    local: { t: 'Só neste aparelho', c: 'text-muted' },
    idle: { t: sync.pending ? `${sync.pending} a enviar` : 'Salvo', c: sync.pending ? 'text-ember' : 'text-ok' },
    syncing: { t: 'Salvando…', c: 'text-ember' },
    offline: { t: `Offline (${sync.pending})`, c: 'text-ember' },
    error: { t: `Falha (${sync.pending})`, c: 'text-bad' },
  } as const;
  const m = map[sync.state];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium ${m.c}`} title={session ? (sync.error ?? '') : 'Entre para salvar no servidor'}>
      <span className="inline-block h-2 w-2 rounded-full bg-current" />
      {m.t}
    </span>
  );
}

function Tab({ area, variant }: { area: AreaKey; variant: 'bottom' | 'top' }) {
  const { pathname } = useLocation();
  const a = AREAS[area];
  const active = areaOf(pathname) === area;
  if (variant === 'top') {
    return (
      <Link
        to={a.to}
        aria-current={active ? 'page' : undefined}
        className={`relative flex h-14 items-center px-3 text-[0.92rem] transition-colors ${active ? 'font-semibold text-ink' : 'text-muted hover:text-ink'}`}
      >
        {a.label}
        {active && <span className="nav-mark bottom-0" aria-hidden="true" />}
      </Link>
    );
  }
  return (
    <Link
      to={a.to}
      aria-current={active ? 'page' : undefined}
      className={`relative flex flex-1 flex-col items-center justify-center gap-1 pb-2 pt-2.5 text-[11px] transition-colors ${active ? 'font-semibold text-ink' : 'text-muted'}`}
    >
      {active && <span className="nav-mark top-0" aria-hidden="true" />}
      <Icon name={a.icon} size={22} strokeWidth={active ? 1.8 : 1.5} />
      <span>{a.label}</span>
    </Link>
  );
}

function ContinueButton({ variant }: { variant: 'compact' | 'pill' }) {
  // Mesmo destino de Hoje, da Trilha e do cartão de ritmo (fonte única: lib/checkpoint.ts).
  const next = useCheckpoint();
  return (
    <Link
      to={next.to}
      className={`btn-primary !min-h-[40px] text-sm ${variant === 'pill' ? '!px-4 !py-2' : '!px-3 !py-2'}`}
      title={`${next.title} · ${next.context}`}
      aria-label={`${next.action}: ${next.title}`}
      data-testid={variant === 'pill' ? 'continuar-topo' : 'continuar-menu'}
    >
      {next.action} <Icon name="avancar" size={16} />
    </Link>
  );
}

// Materiais abertos pela trilha (aula narrada, vídeo, posts, cartões) chegam com ?u=chave: abrir já
// conta como concluído, para a trilha seguir para a próxima atividade.
function useTrailVisit() {
  const { search } = useLocation();
  const { update } = useStudy();
  useEffect(() => {
    const key = new URLSearchParams(search).get('u');
    if (key) update((d) => logUnit(d, key));
  }, [search, update]);
}

export function Layout() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  useTrailVisit();
  const inner = !isAreaHome(pathname);
  // Leitura/prática ocultam a navegação inferior; aula narrada standalone ocupa a viewport inteira.
  const standaloneNarration = /^\/aula-narrada\//.test(pathname);
  const immersive = standaloneNarration || /^\/(capitulo|aprender|pratica|licao|missao)\//.test(pathname);
  const onAccount = areaOf(pathname) === 'conta';
  return (
    <div className={standaloneNarration ? "h-dvh overflow-hidden" : "flex min-h-dvh flex-col"}>
      {!standaloneNarration && <header className="wood-bar wood-bar-top safe-top sticky top-0 z-30">
        <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-[2.5rem] items-center gap-1">
            {inner ? (
              <button
                type="button"
                onClick={() => returnToPreviousPage(navigate, key, AREAS[areaOf(pathname)].to)}
                className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-ink/5"
                aria-label="Voltar"
              >
                <Icon name="voltar" size={22} />
              </button>
            ) : (
              <Logo />
            )}
            <nav aria-label="Navegação principal" className="ml-6 hidden items-center lg:flex">
              {TABS.map((t) => (
                <Tab key={t} area={t} variant="top" />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex">
              <SyncBadge />
            </span>
            {!immersive && (
              <span className="hidden lg:inline-flex">
                <ContinueButton variant="pill" />
              </span>
            )}
            {!immersive && (
              <span className="lg:hidden">
                <ContinueButton variant="compact" />
              </span>
            )}
            <Link
              to="/conta"
              aria-label="Conta e configurações"
              title="Conta e configurações"
              className={`relative grid h-10 w-10 place-items-center rounded-full border text-ink transition hover:border-ink ${onAccount ? 'border-ink' : 'border-ink/20'}`}
            >
              <Icon name="pessoa" size={19} />
            </Link>
          </div>
        </div>
      </header>}

      <main className={standaloneNarration ? 'h-dvh min-h-0 w-full overflow-hidden p-0' : `mx-auto w-full flex-1 px-4 sm:px-6 ${/^\/(capitulo|aprender|video)\//.test(pathname) ? 'max-w-3xl lg:max-w-6xl' : 'max-w-3xl'} ${immersive ? 'pb-3 pt-4' : 'pb-32 pt-5 lg:pb-12'}`}>
        <div key={pathname} className={standaloneNarration ? 'h-full min-h-0 w-full' : 'page-enter'}>
          <Outlet />
        </div>
      </main>

      {!immersive && <nav
        aria-label="Navegação principal"
        className="wood-bar wood-bar-bottom safe-bottom-nav fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around lg:hidden"
      >
        {TABS.map((t) => (
          <Tab key={t} area={t} variant="bottom" />
        ))}
      </nav>}
    </div>
  );
}

