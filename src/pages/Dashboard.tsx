import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, flashcards, getContest, journey, lessons, missions, questionsForContest } from '@/content';
import { missionDone, missionsDue } from '@/lib/mission';
import { computePace, courseUnits, daysUntilExam, type Pace } from '@/lib/pace';
import { reviewQueue } from '@/lib/study';
import { useCheckpoint } from '@/app/useCheckpoint';
import { dueCards } from '@/lib/training';
import { isDone, settingsOf } from '@/lib/planner';
import { characterSheet } from '@/lib/game';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor } from '@/app/areas';
import { DisciplineSummary } from './Progress';
import { ProgressRing } from '@/components/ProgressRing';
import { AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';
import { SyncBadge } from '@/components/Layout';
import { IconBadge, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';

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
            O curso inteiro tem <b className="text-ink">{pace.total} atividades</b> (cada trecho tem Aprender e Praticar; cada capítulo tem Desafio; há missões). Você já fez {pace.done} e faltam{' '}
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
  const cardsDue = dueCards(data, flashcards.map((f) => f.id)).length;
  const localDay = (iso: string) => new Date(iso).toLocaleDateString('sv');
  const today = localDay(new Date().toISOString());
  const answeredToday = data.attempts.filter((a) => localDay(a.answeredAt) === today).length;
  const dailyGoal = settingsOf(data).dailyQuestionGoal;
  const days = daysUntilExam(contest.examDate);
  const pace = computePace(data, courseUnits(journey, lessons, missions), contest.examDate);
  const { plan } = usePlanOfToday();
  const pending = plan.items.filter((i) => !isDone(i, data, plan.day));
  const torre = c('torre');
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  // "Você sabia?": um termo de glossário por dia, sempre o mesmo durante o dia.
  const dayNum = Math.floor(Date.now() / 86400000);
  const fact = flashcards[dayNum % flashcards.length];

  return (
    <div className="stagger space-y-6">
      {/* Saudação e indicadores do dia */}
      <section aria-label="Saudação">
        <h1 className="text-[1.6rem] leading-tight">{greet}!</h1>
        <p className="mt-0.5 text-sm text-muted">
          {sheet.streak ? `Você estuda há ${sheet.streak} dia(s) seguido(s).` : 'Um pouco de estudo hoje já conta.'} Este é o seu painel de hoje.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2.5 py-1 text-xs font-semibold text-ink">
            <Icon name="chama" size={14} strokeWidth={2.2} className="text-leaf" /> {sheet.streak} dia(s) seguidos
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/12 px-2.5 py-1 text-xs font-semibold text-ink">
            <Icon name="estrela" size={14} strokeWidth={2.2} className="text-gold" /> {sheet.xp} pontos
          </span>
        </div>
      </section>

      {/* Abertura: contagem regressiva e a próxima missão, no mesmo cartão */}
      <section
        className="card overflow-hidden"
      >
        <div className="bg-gold px-4 py-5 text-white sm:px-5" style={{ backgroundImage: 'linear-gradient(135deg, rgb(var(--gold)), rgb(var(--azure)))' }}>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">{contest.name} · FCC</span>
          <p className="mt-2 text-[2rem] font-bold leading-none">{days} dias</p>
          <p className="text-[0.95rem] text-white/90">até a prova, em {longDate(contest.examDate, true)}</p>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold" style={{ color: torre }}>
              {cp.resuming ? 'Você parou aqui' : cp.action === 'Começar' ? 'Primeiro passo' : 'Próximo passo da trilha'}
            </p>
            <span className="sm:hidden">
              <SyncBadge />
            </span>
          </div>
          <h2 className="mt-1 text-xl leading-snug">{cp.title}</h2>
          <p className="mt-1 text-sm text-muted">{cp.context}</p>
          <Link to={cp.to} className="btn-primary mt-4 w-full" data-testid="continuar-torre">
            <Icon name="play" size={18} fill="currentColor" /> {cp.action}
          </Link>
        </div>
      </section>

      <PaceCard pace={pace} examDate={contest.examDate} />

      {/* Missões do Arquivo Real: a nova, ou a que tem revisão marcada para hoje */}
      {(() => {
        const due = missionsDue(data);
        const m = missions.find((x) => due.includes(x.id) && missionDone(data, x.id));
        if (!m) return null;
        const review = due.includes(m.id);
        return (
          <Link to={`/missao/${m.id}`} className="card relative flex items-center gap-4 overflow-hidden border-l-4 p-4" style={{ borderLeftColor: torre }}>
            <IconBadge icon="mapa" color={torre} />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold" style={{ color: torre }}>
                {review ? 'Revisão de missão marcada para hoje' : 'Missão do Arquivo Real'}
              </span>
              <span className="block font-display text-lg leading-snug">{m.title}</span>
              <span className="block text-sm text-muted">Cena 3D, laboratório de consultas e um desfecho que depende de você · {m.minutes} min</span>
            </span>
            <Icon name="seta" size={18} />
          </Link>
        );
      })()}

      {/* Números do dia */}
      <section className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        <Link to="/plano" className="card col-span-3 flex items-center gap-4 p-4 sm:col-span-1 sm:flex-col sm:text-center">
          <ProgressRing value={answeredToday / dailyGoal}>
            <span className="font-display text-xl font-bold">{answeredToday}</span>
            <span className="-mt-1 text-[0.7rem] text-muted">de {dailyGoal}</span>
          </ProgressRing>
          <span className="min-w-0">
            <span className="block font-semibold">Meta do dia</span>
            <span className="block text-sm text-muted">
              {plan.restDay ? 'hoje é dia de descanso' : `${pending.length} atividade(s) na ordem do dia`}
            </span>
          </span>
        </Link>
        <Stat to="/revisao" label="Erros a revisar" value={queue.length} color={c('treino')} />
        <Stat to="/flashcards" label="Cartões para hoje" value={cardsDue} color={c('treino')} />
        <Stat to="/personagem" label={sheet.title} value={`Nv ${sheet.level}`} color={c('reino')} small />
      </section>

      {/* Atalhos, como a página Funções do NutriConnect */}
      <section>
        <SectionTitle icon="torre" color={torre}>
          Atalhos
        </SectionTitle>
        <TileGrid>
          <Tile to="/estudos" icon="grimorio" color={c('grimorios')} title="Estudos" text="Trilha, livros, atividades rápidas, vídeos e materiais." />
          <Tile to="/plano" icon="calendario" color={c('treino')} title="Ordem do dia" text="O que estudar hoje, no seu ritmo." badge={plan.restDay ? undefined : `${plan.items.length - pending.length}/${plan.items.length}`} />
          <Tile to="/simulado" icon="relogio" color={c('treino')} title="Simulado" text="Questões sorteadas com tempo e boletim." />
          <Tile to="/reino" icon="mapa" color={c('reino')} title="Mapa do reino" text="Seu domínio em cada disciplina." />
        </TileGrid>
      </section>

      {fact && (
        <Link to="/flashcards" className="card group relative block overflow-hidden p-4">
          <span className="absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-15" style={{ background: c('grimorios') }} />
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: c('grimorios') }}>
            <Icon name="estrela" size={16} strokeWidth={2.2} className="anim-twinkle" /> Você sabia?
          </p>
          <p className="mt-1 font-display text-lg leading-snug">{fact.front}</p>
          <p className="mt-1 text-sm text-muted">{fact.back}</p>
        </Link>
      )}

      {!session && (
        <Link to="/conta" className="card flex items-center gap-3 p-4">
          <IconBadge icon="chave" color={c('conta')} />
          <span className="flex-1 text-[0.95rem]">
            <span className="block font-semibold">Você está como visitante</span>
            <span className="block text-sm text-muted">Crie uma conta para guardar o progresso no servidor e usar em outros aparelhos.</span>
          </span>
          <Icon name="seta" size={18} className="text-muted" />
        </Link>
      )}

      <AppDownload compact />

      <section>
        <SectionTitle icon="grafico" color={c('reino')} action={<Link to="/progresso" className="text-gold">ver tópicos</Link>}>
          Domínio por disciplina
        </SectionTitle>
        <DisciplineSummary />
      </section>
    </div>
  );
}

function Stat({ to, label, value, color, small }: { to: string; label: string; value: number | string; color: string; small?: boolean }) {
  return (
    <Link to={to} className="card flex flex-col justify-between gap-1 p-3.5">
      <span className={`font-display font-bold leading-none ${small ? 'text-lg' : 'text-2xl'}`} style={{ color }}>
        {value}
      </span>
      <span className="line-clamp-2 text-xs leading-snug text-muted">{label}</span>
    </Link>
  );
}
