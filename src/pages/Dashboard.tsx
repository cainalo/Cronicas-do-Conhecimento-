import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, lessons, questionsForContest } from '@/content';
import { levelInfo, recommend, reviewQueue, totalXp } from '@/lib/study';
import { TopicProgressList } from './Progress';
import { WaxSeal } from '@/components/WaxSeal';

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
        <h1 className="text-center text-[2.6rem] leading-none">{contest.name}</h1>
        <p className="mt-2 text-center italic text-muted">{contest.role}</p>
        <p className="mt-3 text-center font-display">
          Faltam <span className="rubric text-xl">{daysUntil(contest.examDate)}</span> dias para a provação de 17 de janeiro
        </p>
      </section>

      {rec ? (
        <section className="manuscript relative mt-2 px-5 pb-5 pt-6">
          <WaxSeal letter="M" size={58} className="absolute -right-2 -top-5 rotate-12 drop-shadow-[2px_3px_2px_rgb(0_0_0/0.45)]" />
          <p className="rubric font-display text-lg">Próxima missão</p>
          <h2 className="mt-1 pr-8 text-xl leading-snug">{rec.title}</h2>
          <p className="mt-2 italic">{rec.reason}</p>
          <Link to={rec.to} className="btn-primary mt-4 w-full">
            Começar
          </Link>
        </section>
      ) : (
        <section className="manuscript p-5">
          <h2 className="text-xl">Você concluiu todo o material disponível</h2>
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
        <p className="border-l-2 border-ember/60 pl-3 text-[0.95rem] italic text-muted">
          Você está estudando como visitante: o progresso fica só neste aparelho.{' '}
          <Link to="/conta" className="rubric underline">
            Entre ou crie uma conta
          </Link>{' '}
          para guardá-lo no servidor e usá-lo em outros dispositivos.
        </p>
      )}

      <section>
        <h2 className="mb-2 text-xl">Progresso por tópico</h2>
        <TopicProgressList onlyWithContent />
      </section>
    </div>
  );
}
