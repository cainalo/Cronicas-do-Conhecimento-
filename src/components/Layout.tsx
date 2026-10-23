import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { AREAS, areaColor, areaOf, isAreaHome, tint, type AreaKey } from '@/app/areas';
import { useNextActivity } from '@/app/usePlanOfToday';
import { levelInfo, totalXp } from '@/lib/study';
import { achievements, cluesRevealed } from '@/lib/game';
import { DEFAULT_CONTEST_ID, chapters, questionsForContest, totalUnits } from '@/content';
import { useCelebrations, useRegionCelebration } from '@/app/fx';
import { useRegions } from '@/pages/Realm';
import { Icon } from '@/components/Icon';
import { useIsDark } from '@/components/Page';
import { useState } from 'react';
import { Prologue, prologueSeen } from '@/components/Prologue';
import { clues } from '@/content/game/story';

const TABS: AreaKey[] = ['torre', 'grimorios', 'treino', 'reino'];

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
  const dark = useIsDark();
  const a = AREAS[area];
  const color = areaColor(area, dark);
  const active = areaOf(pathname) === area;
  if (variant === 'top') {
    return (
      <Link
        to={a.to}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${active ? 'font-bold' : 'font-medium text-muted hover:bg-raised hover:text-ink'}`}
        style={active ? { color, backgroundColor: tint(color) } : undefined}
      >
        <Icon name={a.icon} size={18} strokeWidth={active ? 2.2 : 1.8} />
        {a.label}
      </Link>
    );
  }
  return (
    <Link
      to={a.to}
      aria-current={active ? 'page' : undefined}
      className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium text-muted transition"
      style={active ? { color } : undefined}
    >
      <span className="grid h-8 w-14 place-items-center rounded-full transition" style={active ? { backgroundColor: tint(color) } : undefined}>
        <Icon name={a.icon} size={22} strokeWidth={active ? 2.2 : 1.8} />
      </span>
      <span className={active ? 'font-bold' : ''}>{a.label}</span>
    </Link>
  );
}

function ContinueButton({ variant }: { variant: 'fab' | 'pill' }) {
  const next = useNextActivity();
  if (variant === 'pill') {
    return (
      <Link to={next.to} className="btn-primary !min-h-[40px] !px-4 !py-2 text-sm" title={next.title}>
        <Icon name="play" size={16} fill="currentColor" /> Continuar
      </Link>
    );
  }
  return (
    <div className="flex flex-1 items-center justify-center">
      <Link
        to={next.to}
        aria-label={`Continuar: ${next.title}`}
        title={next.title}
        className="grid h-14 w-14 -translate-y-3 place-items-center rounded-full bg-ember text-white shadow-[0_10px_24px_-10px_rgb(var(--ember))] ring-4 ring-bg transition active:scale-95"
      >
        <Icon name="play" size={24} fill="currentColor" />
      </Link>
    </div>
  );
}

export function Layout() {
  const { data } = useStudy();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dark = useIsDark();
  const xp = totalXp(data);
  const lv = levelInfo(xp);
  useCelebrations(xp, lv.level, achievements(data, chapters, questionsForContest(DEFAULT_CONTEST_ID)), cluesRevealed(Object.keys(data.lessons).length, totalUnits, clues.length), clues.length);
  const regions = useRegions();
  useRegionCelebration(regions.filter((r) => r.explored && r.mastery >= 0.8).map((r) => r.name));
  const inner = !isAreaHome(pathname);
  // Leitura e prática ocupam a tela toda, como as lições do Duolingo (sem a barra inferior).
  const immersive = /^\/(capitulo|aprender|pratica|licao|missao)\//.test(pathname);
  const accountColor = areaColor('conta', dark);
  const onAccount = areaOf(pathname) === 'conta';
  // Prólogo na primeira visita (fora dos testes automatizados).
  const [showPrologue, setShowPrologue] = useState(() => import.meta.env.MODE !== 'test' && !prologueSeen());

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="safe-top sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-[2.5rem] items-center gap-1">
            {inner ? (
              <button
                type="button"
                onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(AREAS[areaOf(pathname)].to))}
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-raised"
                aria-label="Voltar"
              >
                <Icon name="voltar" size={22} strokeWidth={2} />
              </button>
            ) : (
              <span className="hidden lg:block">
                <Logo />
              </span>
            )}
            <nav aria-label="Navegação principal" className="ml-2 hidden items-center gap-1 lg:flex">
              {TABS.map((t) => (
                <Tab key={t} area={t} variant="top" />
              ))}
            </nav>
          </div>

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <Logo />
          </span>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex">
              <SyncBadge />
            </span>
            <span className="hidden lg:inline-flex">
              <ContinueButton variant="pill" />
            </span>
            <Link
              to="/conta"
              aria-label={`Conta · nível ${lv.level}`}
              title={`Conta · nível ${lv.level} (${lv.into}/${lv.span} XP)`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition hover:opacity-85"
              style={{ color: accountColor, backgroundColor: tint(accountColor, onAccount ? 22 : 14), boxShadow: onAccount ? `0 0 0 2px ${accountColor}` : undefined }}
            >
              <Icon name="pessoa" size={20} strokeWidth={2} />
              <span className="absolute -bottom-1 -right-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full border-2 border-bg px-1 text-[10px] font-bold text-white" style={{ background: accountColor }}>
                {lv.level}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {showPrologue && <Prologue onClose={() => setShowPrologue(false)} />}
      <main className={`mx-auto w-full flex-1 px-4 sm:px-6 ${/^\/(capitulo|aprender)\//.test(pathname) ? 'max-w-3xl lg:max-w-6xl' : 'max-w-3xl'} ${immersive ? 'pb-3 pt-4' : 'pb-32 pt-5 lg:pb-12'}`}>
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      {!immersive && <nav
        aria-label="Navegação principal"
        className="safe-bottom-nav fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-line bg-bg/95 shadow-[0_-4px_16px_-8px_rgb(0_0_0/0.15)] backdrop-blur-md lg:hidden"
      >
        <Tab area="torre" variant="bottom" />
        <Tab area="grimorios" variant="bottom" />
        <ContinueButton variant="fab" />
        <Tab area="treino" variant="bottom" />
        <Tab area="reino" variant="bottom" />
      </nav>}
    </div>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Crônicas do Arquivo Real, início">
      <img src={`${import.meta.env.BASE_URL}pwa-192.png`} alt="" className="h-7 w-7 rounded-lg shadow-sm" />
      <span className="whitespace-nowrap font-logo text-[1.05rem] leading-none text-ink">
        Crônicas<span className="hidden text-ember sm:inline lg:hidden"> do Arquivo Real</span>
      </span>
    </Link>
  );
}
