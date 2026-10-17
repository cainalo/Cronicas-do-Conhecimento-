import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, flashcards, getContest, lessons, questionsForContest } from '@/content';
import { recommend, reviewQueue } from '@/lib/study';
import { dueCards } from '@/lib/training';
import { settingsOf } from '@/lib/planner';
import { characterSheet } from '@/lib/game';
import { DisciplineSummary } from './Progress';
import { TodayPlanSummary } from './Plan';
import { WaxSeal } from '@/components/WaxSeal';
import { HeroScene } from '@/components/HeroScene';
import { ProgressRing } from '@/components/ProgressRing';
import { AppDownload } from '@/components/AppDownload';
import { Icon } from '@/components/Icon';

function daysUntil(iso: string) {
  const ms = new Date(iso + 'T00:00:00-03:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export function Dashboard() {
  const { data, session } = useStudy();
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

  return (
    <div className="stagger space-y-5">
      <HeroScene>
        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-[#f3e3c0] backdrop-blur">
          {contest.name} · {contest.board.replace('Fundação Carlos Chagas (FCC)', 'FCC')}
        </span>
        <p className="mt-2 font-display text-[2rem] font-bold leading-none text-[#f8ead0] drop-shadow">
          {days} dias
        </p>
        <p className="text-[0.95rem] text-[#e9d6b4]">até a prova de Técnico de TI, em 17 de janeiro</p>
      </HeroScene>

      {rec ? (
        <section className="manuscript px-5 pb-5 pt-6">
          <WaxSeal letter="M" size={60} className="stamp absolute right-2 -top-5 drop-shadow-[2px_4px_3px_rgb(0_0_0/0.45)]" />
          <p className="rubric font-display text-sm font-bold uppercase tracking-[0.14em]">Próxima missão</p>
          <h2 className="mt-1.5 pr-10 text-xl font-bold leading-snug">{rec.title}</h2>
          <p className="mt-2 font-serif italic text-muted">{rec.reason}</p>
          <Link to={rec.to} className="btn-primary mt-4 w-full">
            Começar <Icon name="pena" size={18} />
          </Link>
        </section>
      ) : (
        <section className="manuscript p-5">
          <h2 className="text-xl font-bold">Todo o material disponível foi estudado</h2>
          <p className="mt-1 font-serif">Novos grimórios estão sendo escritos. Enquanto isso, refaça as lições para manter a memória viva.</p>
        </section>
      )}

      <section className="grid grid-cols-5 gap-3">
        <Link to="/plano" className="card col-span-3 flex items-center gap-4 p-4">
          <ProgressRing value={answeredToday / dailyGoal}>
            <span className="font-display text-xl font-bold">{answeredToday}</span>
            <span className="-mt-1 text-[0.7rem] text-muted">de {dailyGoal}</span>
          </ProgressRing>
          <span className="min-w-0">
            <span className="block font-display text-sm font-bold">Meta do dia</span>
            <span className="block text-sm text-muted">questões respondidas</span>
          </span>
        </Link>
        <div className="col-span-2 grid gap-3">
          <Link to="/revisao" className="card flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted">Erros</span>
            <span className={`font-display text-xl font-bold ${queue.length ? 'text-ember' : ''}`}>{queue.length}</span>
          </Link>
          <Link to="/flashcards" className="card flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted">Cartões</span>
            <span className={`font-display text-xl font-bold ${cardsDue ? 'text-gold' : ''}`}>{cardsDue}</span>
          </Link>
        </div>
      </section>

      <section className="ledger">
        <TodayPlanSummary />
        <Link to="/personagem" className="ledger-row">
          <span className="flex items-center gap-3">
            <span className="icon-tile bg-gold/15 text-gold">
              <Icon name="selo" size={22} />
            </span>
            <span>
              <span className="block font-display text-sm font-bold">{sheet.title}</span>
              <span className="block text-sm text-muted">
                {sheet.xp} XP{sheet.streak ? ` · ${sheet.streak} dia(s) seguido(s)` : ''}
              </span>
            </span>
          </span>
          <span className="w-20">
            <span className="meter">
              <span style={{ width: `${(sheet.into / sheet.span) * 100}%`, background: 'rgb(var(--gold))' }} />
            </span>
          </span>
        </Link>
      </section>

      <AppDownload compact />

      {!session && (
        <Link to="/conta" className="card flex items-center gap-3 p-4">
          <span className="icon-tile bg-ember/15 text-ember">
            <Icon name="chave" size={22} />
          </span>
          <span className="flex-1 text-[0.95rem]">
            <span className="block font-medium">Você está como visitante</span>
            <span className="block text-sm text-muted">Crie uma conta para guardar o progresso no servidor e usar em outros aparelhos.</span>
          </span>
        </Link>
      )}

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-bold">Domínio por disciplina</h2>
          <Link to="/progresso" className="text-sm text-gold">
            ver tópicos
          </Link>
        </div>
        <DisciplineSummary />
      </section>
    </div>
  );
}
