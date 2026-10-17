import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, questionsForContest, topicsForContest } from '@/content';
import { topicStats } from '@/lib/study';

const pct = (x: number) => `${Math.round(x * 100)}%`;

export function TopicProgressList({ onlyWithContent = false }: { onlyWithContent?: boolean }) {
  const { data } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const topics = topicsForContest(DEFAULT_CONTEST_ID)
    .map((t) => ({ t, s: topicStats(data, t.id, bank, chapters) }))
    .filter((x) => !onlyWithContent || x.s.totalQuestions > 0 || x.s.chaptersTotal > 0);
  return (
    <ul className="space-y-2">
      {topics.map(({ t, s }) => {
        const hasContent = s.totalQuestions > 0 || s.chaptersTotal > 0;
        return (
          <li key={t.id} className="card p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm">
                <span className="text-muted">{t.discipline.title} · </span>
                {t.title}
              </p>
              {hasContent && <span className="font-display text-sm text-gold">{pct(s.mastery)}</span>}
            </div>
            {hasContent ? (
              <>
                <div className="mt-2 h-1.5 rounded bg-raised" aria-label={`Domínio ${pct(s.mastery)}`}>
                  <div className="h-1.5 rounded bg-ok" style={{ width: pct(s.mastery) }} />
                </div>
                <p className="mt-1 text-xs text-muted">
                  Leitura {s.chaptersRead}/{s.chaptersTotal} cap. · Respondidas {s.answered}/{s.totalQuestions} · Corretas agora {s.correctNow}
                  {s.accuracy !== null && ` · Acerto geral ${pct(s.accuracy)} (${s.attempts} tentativas)`}
                </p>
              </>
            ) : (
              <p className="mt-1 text-xs text-muted">Grimório ainda não escrito.</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ProgressPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl text-gold">Progresso</h1>
      <p className="text-sm text-muted">
        <b className="text-ink">Domínio</b> = parcela das questões do tópico cuja resposta mais recente está correta. Leitura concluída não conta como domínio.
      </p>
      <div className="flex gap-2">
        <Link to="/historico" className="btn-ghost flex-1">
          Histórico de questões
        </Link>
        <Link to="/edital" className="btn-ghost flex-1">
          Edital e cobertura
        </Link>
      </div>
      <TopicProgressList />
    </div>
  );
}
