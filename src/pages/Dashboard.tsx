import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, lessons, questionsForContest } from '@/content';
import { levelInfo, recommend, reviewQueue, totalXp } from '@/lib/study';
import { TopicProgressList } from './Progress';

function daysUntil(iso: string) {
  const ms = new Date(iso + 'T00:00:00-03:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export function Dashboard() {
  const { data, session } = useStudy();
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  const rec = recommend(data, chapters, lessons, bank);
  const xp = totalXp(data);
  const lv = levelInfo(xp);
  const queue = reviewQueue(data, bank);
  const localDay = (iso: string) => new Date(iso).toLocaleDateString('sv');
  const today = localDay(new Date().toISOString());
  const answeredToday = data.attempts.filter((a) => localDay(a.answeredAt) === today).length;
  const dailyGoal = 10;

  return (
    <div className="space-y-5">
      <section>
        <p className="text-sm text-muted">{contest.role}</p>
        <h1 className="text-xl text-gold">{contest.name}</h1>
        <p className="text-sm text-muted">
          Prova prevista em <b className="text-ink">{daysUntil(contest.examDate)} dias</b> (17/01/2027)
        </p>
      </section>

      {rec ? (
        <section className="card border-gold/60 p-4">
          <p className="font-display text-xs uppercase tracking-widest text-gold">Próxima missão</p>
          <h2 className="mt-1 text-lg">{rec.title}</h2>
          <p className="mt-1 text-sm text-muted">
            <span className="text-ink">Por quê?</span> {rec.reason}
          </p>
          <Link to={rec.to} className="btn-primary mt-3 w-full">
            Começar
          </Link>
        </section>
      ) : (
        <section className="card p-4">
          <h2 className="text-lg">Todo o conteúdo disponível foi dominado!</h2>
          <p className="text-sm text-muted">Novos grimórios estão sendo escritos. Enquanto isso, refaça as lições para manter a memória viva.</p>
        </section>
      )}

      <section className="grid grid-cols-3 gap-3 text-center">
        <div className="card p-3">
          <p className="font-display text-xl text-gold">{lv.level}</p>
          <p className="text-xs text-muted">Nível · {xp} XP</p>
          <div className="mt-2 h-1.5 rounded bg-raised">
            <div className="h-1.5 rounded bg-gold" style={{ width: `${(lv.into / lv.span) * 100}%` }} />
          </div>
        </div>
        <div className="card p-3">
          <p className="font-display text-xl">
            {answeredToday}/{dailyGoal}
          </p>
          <p className="text-xs text-muted">Meta de hoje (questões)</p>
        </div>
        <Link to="/revisao" className="card p-3">
          <p className={`font-display text-xl ${queue.length ? 'text-ember' : ''}`}>{queue.length}</p>
          <p className="text-xs text-muted">Revisões pendentes</p>
        </Link>
      </section>

      {!session && (
        <p className="rounded-lg border border-line p-3 text-sm text-muted">
          Você está estudando como visitante: o progresso fica só neste aparelho.{' '}
          <Link to="/conta" className="text-gold underline">
            Entre ou crie uma conta
          </Link>{' '}
          para guardá-lo no servidor e usá-lo em outros dispositivos.
        </p>
      )}

      <section>
        <h2 className="mb-2 text-base">Progresso por tópico</h2>
        <TopicProgressList onlyWithContent />
      </section>
    </div>
  );
}
