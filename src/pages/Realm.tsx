import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, grimoires, questionsForContest } from '@/content';
import { regionNames } from '@/content/game/realm';
import { RealmMap, type RegionState } from '@/components/RealmMap';
import { topicMastery } from '@/lib/game';

export function useRegions(): RegionState[] {
  const { data } = useStudy();
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  return contest.disciplines.map((d) => {
    const topicIds = d.topics.map((t) => t.id);
    const chs = chapters.filter((c) => c.topicIds.some((t) => topicIds.includes(t)));
    const withQuestions = topicIds.filter((t) => bank.some((q) => q.topicId === t));
    const mastery = withQuestions.length ? withQuestions.reduce((s, t) => s + topicMastery(data, t, bank), 0) / withQuestions.length : 0;
    const g = grimoires.find((x) => x.chapterIds.includes(chs[0]?.id ?? ''));
    return { discipline: d, name: regionNames[d.id] ?? d.title, explored: chs.length > 0, mastery, to: g ? `/grimorio/${g.id}` : undefined };
  });
}

export function RealmPage() {
  const regions = useRegions();
  const explored = regions.filter((r) => r.explored).length;
  return (
    <div className="space-y-5">
      <header className="text-center">
        <h1 className="text-4xl">Mappa regni</h1>
        <p className="font-display text-muted">o reino a investigar</p>
      </header>
      <div className="card p-2">
        <RealmMap regions={regions} />
      </div>
      <p className="text-center text-sm italic text-muted">
        {explored} de {regions.length} regiões com grimório. A cor se intensifica com o domínio demonstrado; regiões sob névoa aguardam o seu livro.
      </p>
      <ul className="ledger">
        {regions.map((r) => (
          <li key={r.discipline.id}>
            {r.to ? (
              <Link to={r.to} className="ledger-row">
                <span>
                  {r.name}
                  <span className="block text-sm italic text-muted">{r.discipline.title}</span>
                </span>
                <span className="rubric shrink-0">{Math.round(r.mastery * 100)}%</span>
              </Link>
            ) : (
              <div className="ledger-row text-muted">
                <span>
                  {r.name}
                  <span className="block text-sm italic">{r.discipline.title}</span>
                </span>
                <span className="shrink-0 text-sm italic">sob névoa</span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <Link to="/progresso" className="btn-ghost flex-1">
          Progresso por tópico
        </Link>
        <Link to="/edital" className="btn-ghost flex-1">
          Edital
        </Link>
      </div>
    </div>
  );
}
