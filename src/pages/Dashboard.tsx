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
        <section className="manuscript rounded-sm p-4">
          <p className="font-display text-sm text-ember">Próxima missão</p>
          <h2 className="mt-1 text-lg text-gold">{rec.title}</h2>
          <p className="mt-2 text-[0.95rem] opacity-90">{rec.reason}</p>
          <Link to={rec.to} className="btn-primary mt-4 w-full">
            Começar
          </Link>
        </section>
      ) : (
        <section className="manuscript rounded-sm p-4">
          <h2 className="text-lg text-gold">Você concluiu todo o material disponível</h2>
          <p className="mt-1 opacity-90">Novos grimórios estão sendo escritos. Enquanto isso, refaça as lições para manter a memória viva.</p>
        </section>
      )}

      <section aria-label="Resumo do dia" className="ledger">
        <div className="ledger-row">
          <span>Nível {lv.level}</span>
          <span className="text-muted">
            {xp} XP, faltam {lv.span - lv.into} para o nível {lv.level + 1}
          </span>
        </div>
        <div className="ledger-row">
          <span>Questões hoje</span>
          <span className={answeredToday >= dailyGoal ? 'text-ok' : 'text-muted'}>
            {answeredToday} de {dailyGoal}
          </span>
        </div>
        <Link to="/revisao" className="ledger-row">
          <span>Revisões pendentes</span>
          <span className={queue.length ? 'text-ember' : 'text-muted'}>{queue.length}</span>
        </Link>
      </section>

      {!session && (
        <p className="border-l-2 border-gold/60 pl-3 text-sm text-muted">
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
