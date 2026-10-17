import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, questionsForContest, topicsForContest } from '@/content';
import { topicStats } from '@/lib/study';
import { PageHeader } from '@/components/Page';

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
              {hasContent && <span className="rubric font-display">{pct(s.mastery)}</span>}
            </div>
            {hasContent ? (
              <>
                <div className="meter mt-2" aria-label={`Domínio ${pct(s.mastery)}`}>
                  <span style={{ width: pct(s.mastery) }} />
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
      <PageHeader area="reino" icon="grafico" title="Progresso" subtitle="Domínio por tópico do edital" />
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

/** Resumo compacto por disciplina (apenas as que já têm material). */
export function DisciplineSummary() {
  const { data } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const rows = contest.disciplines
    .map((d) => {
      const stats = d.topics.map((t) => topicStats(data, t.id, bank, chapters)).filter((s) => s.totalQuestions > 0);
      const total = stats.reduce((n, s) => n + s.totalQuestions, 0);
      const correct = stats.reduce((n, s) => n + s.correctNow, 0);
      return { d, total, mastery: total ? correct / total : 0 };
    })
    .filter((r) => r.total > 0);
  return (
    <ul className="ledger">
      {rows.map(({ d, mastery }) => (
        <li key={d.id} className="ledger-row">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.95rem]">{d.title}</span>
            <span className="meter mt-1.5">
              <span style={{ width: pct(mastery) }} />
            </span>
          </span>
          <span className="w-11 shrink-0 text-right text-sm font-semibold font-bold text-gold">{pct(mastery)}</span>
        </li>
      ))}
    </ul>
  );
}
