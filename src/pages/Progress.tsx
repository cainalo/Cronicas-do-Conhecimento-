import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, journey, questionsForContest, topicsForContest } from '@/content';
import { topicStats } from '@/lib/study';
import { FIRM_SCORE, MASTERY_LABEL, chapterMastery, type MasteryLevel } from '@/lib/mastery';
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
      <PageHeader area="reino" crumb={false} icon="grafico" title="Progresso" subtitle="Domínio por tópico do edital" />
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
      <SectionMasteryList />
      <h2 className="pt-2 text-xl">Por tópico do edital</h2>
      <TopicProgressList />
    </div>
  );
}

const LEVEL_TONE: Record<MasteryLevel, string> = {
  novo: 'bg-raised text-muted',
  lido: 'bg-azure/15 text-azure',
  aprendendo: 'bg-ember/15 text-ink',
  firme: 'bg-ok/15 text-ok',
};

/** Domínio estimado por trecho, com os motivos de cada nível. */
export function SectionMasteryList() {
  const { data } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const rows = journey.map((c) => ({ c, m: chapterMastery(data, c, bank) })).filter((r) => r.m.fresh < r.c.sections.length);
  return (
    <section aria-label="Domínio por trecho" className="space-y-2">
      <h2 className="text-xl">Domínio estimado por trecho</h2>
      <p className="text-sm text-muted">
        Firme = acerto de pelo menos {Math.round(FIRM_SCORE * 100)}% na última resposta, em metade das questões do trecho ou mais, com acertos em dois dias
        diferentes. Toque num trecho para ver os motivos.
      </p>
      {rows.length === 0 ? (
        <p className="card p-3 text-sm">Assim que você estudar o primeiro trecho, ele aparece aqui.</p>
      ) : (
        rows.map(({ c, m }) => (
          <div key={c.id} className="card p-3">
            <p className="font-semibold">{c.title}</p>
            <p className="text-xs text-muted">
              Firmes {m.firm} · Aprendendo {m.learning} · Lidos {m.read} · Não estudados {m.fresh}
            </p>
            <ul className="mt-2 space-y-1">
              {m.sections.map(({ section, m: s }) => (
                <li key={section.id}>
                  <details>
                    <summary className="flex cursor-pointer items-center justify-between gap-2 text-sm">
                      <span className="min-w-0 break-words">{section.title}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${LEVEL_TONE[s.level]}`}>{MASTERY_LABEL[s.level]}</span>
                    </summary>
                    <ul className="mt-1 list-disc pl-5 text-xs text-muted">
                      {s.reasons.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
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
