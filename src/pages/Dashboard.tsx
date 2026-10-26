import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, flashcards, getContest, missions, questionsForContest } from '@/content';
import { missionDone, missionsDue } from '@/lib/mission';
import { computePace, daysUntilExam, type Pace } from '@/lib/pace';
import { reviewQueue } from '@/lib/study';
import { trailUnits, useCheckpoint } from '@/app/useCheckpoint';
import { dueCards, unlockedCardIds } from '@/lib/training';
import { isDone, settingsOf } from '@/lib/planner';
import { characterSheet } from '@/lib/game';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor } from '@/app/areas';
import { DisciplineSummary } from './Progress';
import { ProgressRing } from '@/components/ProgressRing';
import { FeasibilityCard } from '@/components/FeasibilityCard';
import { AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';
import { SyncBadge } from '@/components/Layout';
import { SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';
import { useCountUp } from '@/app/useCountUp';

const longDate = (iso: string, year = false) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', ...(year ? { year: 'numeric' } : {}) });
};

/** Ritmo até a prova: meta de hoje, total do curso e quanto falta. */
export function PaceCard({ pace, examDate }: { pace: Pace; examDate: string }) {
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const pips = Math.min(pace.perDay, 12);
  return (
    <section className="card p-4 sm:p-5" aria-label="Ritmo até a prova">
      <p className="text-sm text-muted first-letter:uppercase">
        {today}. Faltam <b className="text-ink">{pace.daysLeft} dias</b> para a prova ({longDate(examDate, true)}).
      </p>
      <h2 className="mt-2 text-xl leading-snug">
        {pace.remaining === 0 ? 'Todo o curso foi feito. Agora é revisão e simulado.' : pace.leftToday === 0 ? 'Meta de hoje cumprida' : `Meta de hoje: ${pace.perDay} atividade${pace.perDay > 1 ? 's' : ''}`}
      </h2>
      {pace.remaining > 0 && (
        <>
          <div className="mt-2 flex flex-wrap gap-1.5" aria-label={`${pace.doneToday} de ${pace.perDay} feitas hoje`}>
            {Array.from({ length: pips }, (_, i) => (
              <span key={i} className={`h-3 flex-1 rounded-full ${i < pace.doneToday ? 'bg-gold' : 'bg-raised'}`} style={{ minWidth: 14 }} />
            ))}
          </div>
          <p className="mt-1 text-sm">
            Hoje você fez <b>{pace.doneToday}</b> de {pace.perDay}.{pace.leftToday > 0 ? ` Faltam ${pace.leftToday}.` : ' Se quiser adiantar, o amanhã fica mais leve.'}
          </p>
          <p className="mt-3 text-sm text-muted">
            O curso inteiro tem <b className="text-ink">{pace.total} atividades</b> (cada trecho tem Aprender e Praticar; cada capítulo tem Desafio; há casos práticos). Você já fez {pace.done} e faltam{' '}
            {pace.remaining}. Para terminar tudo até {longDate(pace.finishBy)}
            {pace.studyDays < pace.daysLeft ? ' e usar a última semana para revisão e simulados' : ''}, são {pace.perDay} por dia. Se pular um dia, a meta dos próximos sobe um pouco.
          </p>
        </>
      )}
    </section>
  );
}

export function Dashboard() {
  const { data, session } = useStudy();
  const dark = useIsDark();
  const c = (k: Parameters<typeof areaColor>[0]) => areaColor(k, dark);
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  const cp = useCheckpoint();
  const sheet = characterSheet(data);
  const queue = reviewQueue(data, bank);
  const cardsDue = dueCards(data, unlockedCardIds(data, flashcards)).length;
  const localDay = (iso: string) => new Date(iso).toLocaleDateString('sv');
  const today = localDay(new Date().toISOString());
  const answeredToday = data.attempts.filter((a) => localDay(a.answeredAt) === today).length;
  const dailyGoal = settingsOf(data).dailyQuestionGoal;
  const days = daysUntilExam(contest.examDate);
  const shownDays = useCountUp(days);
  const pace = computePace(data, trailUnits(), contest.examDate);
  const { plan } = usePlanOfToday();
  const pending = plan.items.filter((i) => !isDone(i, data, plan.day));
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const dateLine = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  // "Você sabia?": um termo de glossário por dia, sempre o mesmo durante o dia.
  const dayNum = Math.floor(Date.now() / 86400000);
  const fact = flashcards[dayNum % flashcards.length];

  return (
    <div className="stagger space-y-8">
      {/* Cabeçalho editorial: data, saudação e a contagem até a prova em números grandes */}
      <header aria-label="Saudação" className="border-b border-ink pb-5">
        <p className="kicker first-letter:uppercase">{dateLine}</p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h1 className="text-[2.2rem] leading-[1.02] sm:text-[2.8rem]">{greet}.</h1>
          <span className="sm:hidden">
            <SyncBadge />
          </span>
        </div>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-[3.4rem] leading-none tabular-nums text-gold">{shownDays}</span>
          <span className="text-[0.95rem] leading-snug text-muted">
            dias até a prova
            <br />
            {contest.name}, {longDate(contest.examDate, true)}
          </span>
        </p>
        <p className="mt-3 text-sm text-muted">
          {sheet.streak ? `${sheet.streak} dia${sheet.streak > 1 ? 's' : ''} seguido${sheet.streak > 1 ? 's' : ''} de estudo` : 'Um pouco de estudo hoje já conta'} · {sheet.xp} pontos
        </p>
      </header>

      {/* Próximo passo da trilha: a mesma fonte do Continuar do topo */}
      <section aria-label="Próximo passo">
        <p className="kicker">{cp.resuming ? 'Você parou aqui' : cp.action === 'Começar' ? 'Primeiro passo' : 'Próximo passo da trilha'}</p>
        <h2 className="mt-1 text-[1.5rem] leading-snug">{cp.title}</h2>
        <p className="mt-1 text-sm text-muted">{cp.context}</p>
        <Link to={cp.to} className="btn-primary mt-4 w-full sm:w-auto" data-testid="continuar-torre">
          {cp.action} <Icon name="avancar" size={18} />
        </Link>
      </section>

      <PaceCard pace={pace} examDate={contest.examDate} />

      <FeasibilityCard />

      {/* Caso prático com revisão marcada para hoje */}
      {(() => {
        const due = missionsDue(data);
        const m = missions.find((x) => due.includes(x.id) && missionDone(data, x.id));
        if (!m) return null;
        return (
          <Link to={`/missao/${m.id}`} className="card flex items-center gap-4 border-l-2 border-l-gold p-4">
            <span className="min-w-0 flex-1">
              <span className="kicker block">Revisão do caso prático marcada para hoje</span>
              <span className="block font-display text-lg leading-snug">{m.title}</span>
              <span className="block text-sm text-muted">Objetivos, laboratório de consultas e revisão · {m.minutes} min</span>
            </span>
            <Icon name="seta" size={18} />
          </Link>
        );
      })()}

      {/* Números do dia */}
      <section aria-label="Números do dia" className="grid grid-cols-3 border-y border-line">
        <Link to="/plano" className="flex flex-col items-start gap-2 py-4 pr-3">
          <ProgressRing value={answeredToday / dailyGoal} size={52}>
            <span className="font-display text-base tabular-nums">{answeredToday}</span>
          </ProgressRing>
          <span className="text-xs leading-snug text-muted">
            de {dailyGoal} questões hoje{plan.restDay ? ' · descanso' : pending.length ? ` · ${pending.length} na ordem do dia` : ''}
          </span>
        </Link>
        <Stat to="/revisao" label="erros a revisar" value={queue.length} />
        <Stat to="/flashcards" label="cartões para hoje" value={cardsDue} />
      </section>

      <section>
        <SectionTitle>Atalhos</SectionTitle>
        <TileGrid>
          <Tile to="/estudos" icon="livro" color={c('grimorios')} title="Estudos" text="Trilha, livros, atividades rápidas, vídeos e materiais." />
          <Tile to="/plano" icon="calendario" color={c('treino')} title="Ordem do dia" text="O que estudar hoje, no seu ritmo." badge={plan.restDay ? undefined : `${plan.items.length - pending.length}/${plan.items.length}`} />
          <Tile to="/simulado" icon="relogio" color={c('treino')} title="Simulado" text="Questões sorteadas com tempo e boletim." />
          <Tile to="/progresso" icon="progresso" color={c('reino')} title="Progresso" text="Seu domínio em cada disciplina e trecho." />
        </TileGrid>
      </section>

      {fact && (
        <Link to="/flashcards" className="block border-l-2 border-l-gold pl-4">
          <p className="kicker">Você sabia?</p>
          <p className="mt-1 font-display text-lg leading-snug">{fact.front}</p>
          <p className="mt-1 text-sm text-muted">{fact.back}</p>
        </Link>
      )}

      {!session && (
        <Link to="/conta/acesso" className="card flex items-center gap-3 p-4">
          <Icon name="nuvem" size={20} className="shrink-0 text-gold" />
          <span className="flex-1 text-[0.95rem]">
            <span className="block font-semibold">Você está como visitante</span>
            <span className="block text-sm text-muted">Crie uma conta para guardar o progresso no servidor e usar em outros aparelhos.</span>
          </span>
          <Icon name="seta" size={18} className="text-muted" />
        </Link>
      )}

      <AppDownload compact />

      <section>
        <SectionTitle action={<Link to="/progresso" className="link-grow text-gold">ver tópicos</Link>}>Domínio por disciplina</SectionTitle>
        <DisciplineSummary />
      </section>
    </div>
  );
}

function Stat({ to, label, value }: { to: string; label: string; value: number }) {
  const n = useCountUp(value);
  return (
    <Link to={to} className="flex flex-col justify-between gap-2 border-l border-line py-4 pl-3">
      <span className="font-display text-[2rem] leading-none tabular-nums">{n}</span>
      <span className="text-xs leading-snug text-muted">{label}</span>
    </Link>
  );
}
