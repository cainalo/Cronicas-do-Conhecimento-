import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, flashcards, getContest, lessons, questionsForContest } from '@/content';
import { recommend, reviewQueue } from '@/lib/study';
import { dueCards } from '@/lib/training';
import { isDone, settingsOf } from '@/lib/planner';
import { characterSheet } from '@/lib/game';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor, tint } from '@/app/areas';
import { DisciplineSummary } from './Progress';
import { HeroScene } from '@/components/HeroScene';
import { ProgressRing } from '@/components/ProgressRing';
import { AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';
import { SyncBadge } from '@/components/Layout';
import { IconBadge, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';
import { Mascot } from '@/components/Mascot';

function daysUntil(iso: string) {
  const ms = new Date(iso + 'T00:00:00-03:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export function Dashboard() {
  const { data, session } = useStudy();
  const dark = useIsDark();
  const c = (k: Parameters<typeof areaColor>[0]) => areaColor(k, dark);
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  const rec = recommend(data, chapters, lessons, bank);
  const sheet = characterSheet(data);
  const queue = reviewQueue(data, bank);
  const cardsDue = dueCards(data, flashcards.map((f) => f.id)).length;
  const localDay = (iso: string) => new Date(iso).toLocaleDateString('sv');
  const today = localDay(new Date().toISOString());
  const answeredToday = data.attempts.filter((a) => localDay(a.answeredAt) === today).length;
  const dailyGoal = settingsOf(data).dailyQuestionGoal;
  const days = daysUntil(contest.examDate);
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
      {/* Saudação do mascote, como a abertura da página Funções do NutriConnect */}
      <section className="flex items-end gap-2">
        <Mascot mood={sheet.streak ? 'cheer' : 'talk'} size={88} />
        <div className="mb-3 min-w-0 flex-1">
          <div className="anim-toast-in rounded-2xl rounded-bl-sm border border-line bg-surface px-3.5 py-2.5 shadow-[var(--shadow-card)]">
            <p className="font-display text-lg leading-tight">
              {greet}, {sheet.title.toLowerCase()}!
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {sheet.streak ? `Você estuda há ${sheet.streak} dia(s) seguido(s). Não deixe a chama apagar.` : 'Um pouco de estudo hoje acende a sua sequência.'}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm" style={{ background: '#c2571f' }}>
              <Icon name="chama" size={14} strokeWidth={2.2} /> {sheet.streak} dia(s)
            </span>
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm" style={{ background: '#a8740c' }}>
              <Icon name="estrela" size={14} strokeWidth={2.2} /> {sheet.xp} XP
            </span>
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm" style={{ background: '#4a7f46' }}>
              <Icon name="escudo" size={14} strokeWidth={2.2} /> nível {sheet.level}
            </span>
          </div>
        </div>
      </section>

      {/* Abertura: contagem regressiva e a próxima missão, no mesmo cartão */}
      <section
        className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-card)]"
        style={{ borderColor: tint(torre, 22), background: `linear-gradient(160deg, ${tint(torre, 14)}, ${tint(torre, 3)}), rgb(var(--surface))` }}
      >
        <HeroScene>
          <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-[#f3e3c0] backdrop-blur">
            {contest.name} · FCC
          </span>
          <p className="mt-2 font-display text-[2rem] font-bold leading-none text-[#f8ead0] drop-shadow">{days} dias</p>
          <p className="text-[0.95rem] text-[#e9d6b4]">até a prova, em 17 de janeiro</p>
        </HeroScene>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold" style={{ color: torre }}>
              Próxima missão
            </p>
            <span className="sm:hidden">
              <SyncBadge />
            </span>
          </div>
          {rec ? (
            <>
              <h2 className="mt-1 text-xl leading-snug">{rec.title}</h2>
              <p className="mt-1 text-sm text-muted">{rec.reason}</p>
              <Link to={rec.to} className="btn-primary mt-4 w-full">
                <Icon name="play" size={18} fill="currentColor" /> Começar
              </Link>
            </>
          ) : (
            <>
              <h2 className="mt-1 text-xl">Todo o material disponível foi estudado</h2>
              <p className="mt-1 text-sm text-muted">Refaça as lições e revise os erros para manter a memória viva.</p>
            </>
          )}
        </div>
      </section>

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
          <Tile to="/biblioteca" icon="grimorio" color={c('grimorios')} title="Grimórios" text="Ler os capítulos e fazer as lições." />
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
