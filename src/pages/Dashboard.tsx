import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, flashcards, getContest, missions, questionsForContest } from '@/content';
import { missionDone, missionsDue } from '@/lib/mission';
import { reviewQueue } from '@/lib/study';
import { useCheckpoint } from '@/app/useCheckpoint';
import { dueCards, unlockedCardIds } from '@/lib/training';
import { isDone, settingsOf } from '@/lib/planner';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor } from '@/app/areas';
import { DisciplineSummary } from './Progress';
import { AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';
import { SyncBadge } from '@/components/Layout';
import { SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';

function CompactStat({ label, value, hint, to, color, icon }: { label: string; value: number; hint: string; to: string; color: string; icon: 'chama' | 'cartas' | 'certo' }) {
  return (
    <Link
      to={to}
      className="group min-w-0 rounded-2xl border border-line p-3 transition hover:-translate-y-0.5 hover:border-ink/20 sm:p-4"
      style={{ background: `color-mix(in srgb, ${color} 10%, rgb(var(--surface)))` }}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold leading-snug text-muted">{label}</span>
        <Icon name={icon} size={17} className="shrink-0" style={{ color }} />
      </span>
      <span className="mt-2 block text-3xl font-semibold leading-none tabular-nums">{value}</span>
      <span className="mt-2 block text-xs leading-snug text-muted">{hint}</span>
    </Link>
  );
}

export function Dashboard() {
  const { data, session } = useStudy();
  const dark = useIsDark();
  const color = (key: Parameters<typeof areaColor>[0]) => areaColor(key, dark);
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  const checkpoint = useCheckpoint();
  const questionsToReview = reviewQueue(data, bank).length;
  const cardsDue = dueCards(data, unlockedCardIds(data, flashcards)).length;
  const dailyGoal = settingsOf(data).dailyQuestionGoal;
  const today = new Date().toDateString();
  const answeredToday = data.attempts.filter((attempt) => new Date(attempt.answeredAt).toDateString() === today).length;
  const { plan } = usePlanOfToday();
  const pending = plan.items.filter((item) => !isDone(item, data, plan.day));
  const dateLine = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const flashcard = flashcards.length ? flashcards[Math.floor(Date.now() / 86400000) % flashcards.length] : undefined;
  const dueMission = (() => {
    const due = missionsDue(data);
    return missions.find((mission) => due.includes(mission.id) && missionDone(data, mission.id));
  })();
  const totalSections = chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
  const sectionsRead = chapters.reduce((sum, chapter) => sum + Math.min(chapter.sections.length, data.reading[chapter.id]?.sectionsRead.length ?? 0), 0);
  const progressPercent = totalSections ? Math.round((sectionsRead / totalSections) * 100) : 0;

  return (
    <div className="stagger space-y-6 pb-4 sm:space-y-8">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="kicker first-letter:uppercase">{dateLine}</p>
          <h1 className="mt-1 text-[2rem] leading-tight sm:text-[2.6rem]">{greeting}.</h1>
          <p className="mt-1 text-sm text-muted">Um passo de cada vez. Vamos continuar seus estudos?</p>
        </div>
        <span className="shrink-0 pt-1 sm:hidden"><SyncBadge /></span>
        <div className="hidden shrink-0 rounded-xl border border-line bg-surface px-3 py-2 sm:block"><SyncBadge /></div>
      </header>

      <section
        className="relative overflow-hidden rounded-3xl border border-line p-5 sm:p-6"
        style={{ background: `linear-gradient(120deg, color-mix(in srgb, ${color('explorar')} 16%, rgb(var(--surface))), rgb(var(--surface)) 78%)` }}
        aria-label="Continuar estudando"
      >
        <div className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 rounded-full border-[18px] opacity-20" style={{ borderColor: color('grimorios') }} />
        <p className="kicker">{checkpoint.resuming ? 'Retome de onde parou' : checkpoint.action === 'Começar' ? 'Seu primeiro passo' : 'Próxima atividade'}</p>
        <h2 className="relative mt-2 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">{checkpoint.title}</h2>
        <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-muted">{checkpoint.context}</p>
        <div className="relative mt-5 flex flex-wrap items-center gap-3">
          <Link to={checkpoint.to} className="btn-primary inline-flex min-h-[46px] items-center justify-center gap-2 px-5" data-testid="continuar-torre">
            <Icon name="play" size={17} fill="currentColor" /> {checkpoint.action} <Icon name="avancar" size={17} />
          </Link>
          <Link to="/trilha" className="inline-flex min-h-[42px] items-center gap-1 text-sm font-semibold text-muted underline-offset-4 hover:underline">
            Ver trilha <Icon name="avancar" size={15} />
          </Link>
        </div>
      </section>

      <section aria-label="Resumo de hoje" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold">Seu dia de estudo</h2>
          <Link to="/plano" className="text-sm font-semibold text-muted underline-offset-4 hover:underline">Plano completo</Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <CompactStat label="Questões hoje" value={answeredToday} hint={`Meta: ${dailyGoal}`} to="/historico" color={color('treino')} icon="certo" />
          <CompactStat label="Para revisar" value={questionsToReview} hint={questionsToReview ? 'Erros para retomar' : 'Tudo em dia'} to="/revisao" color={color('explorar')} icon="chama" />
          <CompactStat label="Cartões de hoje" value={cardsDue} hint={cardsDue ? 'Revisão espaçada' : 'Nenhum pendente'} to="/flashcards" color={color('treino')} icon="cartas" />
        </div>
        <Link to="/plano" className="block rounded-2xl border border-line bg-surface p-4 transition hover:border-ink/20">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Plano de hoje</span>
            <span className="text-sm text-muted">{plan.restDay ? 'Dia de descanso' : pending.length ? `${pending.length} pendente(s)` : 'Concluído'}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised">
            <div className="h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${plan.items.length ? Math.round(((plan.items.length - pending.length) / plan.items.length) * 100) : 100}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
            <span>{plan.items.length - pending.length} de {plan.items.length} atividades feitas</span>
            <span className="inline-flex items-center gap-1 font-semibold">Abrir plano <Icon name="avancar" size={14} /></span>
          </div>
        </Link>
      </section>

      {dueMission && (
        <Link to={`/missao/${dueMission.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-ink/20">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure"><Icon name="alvo" size={23} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-muted">Revisão prática para hoje</span>
            <span className="mt-1 block font-semibold">{dueMission.title}</span>
            <span className="mt-1 block text-sm text-muted">Caso aplicado · {dueMission.minutes} min</span>
          </span>
          <Icon name="avancar" size={18} className="shrink-0 text-muted" />
        </Link>
      )}


      <section aria-label="Seu avanço nas matérias" className="overflow-hidden rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted">Sua evolução</p>
            <h2 className="mt-1 text-lg font-semibold">Você já avançou em {progressPercent}% do conteúdo</h2>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/10 text-base font-bold tabular-nums text-teal">{progressPercent}%</span>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-raised" role="progressbar" aria-label="Conteúdo lido" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
          <div className="h-full rounded-full bg-teal transition-[width] duration-700" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted">
          <span>{sectionsRead} de {totalSections} trechos estudados</span>
          <Link to="/progresso" className="font-semibold underline-offset-4 hover:underline">Ver detalhes <Icon name="avancar" size={13} /></Link>
        </div>
      </section>

      <section>
        <SectionTitle>Continue por aqui</SectionTitle>
        <TileGrid>
          <Tile to="/estudos" icon="lista" color={color('explorar')} title="Matérias e materiais" text="Conteúdo por disciplina, vídeos e aulas narradas." index={0} />
          <Tile to="/simulado" icon="relogio" color={color('treino')} title="Simulado" text="Treine com tempo e veja seu resultado." index={1} />
          <Tile to="/progresso" icon="progresso" color={color('reino')} title="Progresso" text="Acompanhe o domínio por disciplina." index={2} />
          <Tile to="/relampago" icon="chama" color={color('grimorios')} title="Rodada rápida" text="Cinco questões para revisar em poucos minutos." index={3} />
        </TileGrid>
      </section>

      {flashcard && (
        <Link to="/flashcards" className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-ink/20">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold"><Icon name="estrela" size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="kicker">Uma ideia para levar</span>
            <span className="mt-1 block font-semibold leading-snug">{flashcard.front}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{flashcard.back}</span>
          </span>
          <Icon name="avancar" size={16} className="mt-1 shrink-0 text-muted" />
        </Link>
      )}

      <details className="rounded-2xl border border-line bg-surface p-4">
        <summary className="cursor-pointer font-semibold">Ver domínio por disciplina</summary>
        <div className="mt-4"><DisciplineSummary /></div>
      </details>

      {!session && (
        <Link to="/conta/acesso" className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-ink/20">
          <Icon name="nuvem" size={21} className="shrink-0 text-gold" />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">Salvar o progresso em outros aparelhos</span>
            <span className="mt-1 block text-sm text-muted">Crie uma conta para sincronizar seu estudo.</span>
          </span>
          <Icon name="avancar" size={17} className="shrink-0 text-muted" />
        </Link>
      )}

      <AppDownload compact />
      <p className="text-center text-xs text-muted">Leitura registrada · {sectionsRead} de {totalSections} trechos ({progressPercent}%)</p>
    </div>
  );
}
