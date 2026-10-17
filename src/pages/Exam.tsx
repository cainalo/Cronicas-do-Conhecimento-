import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, getContest, getQuestion, questionsForContest, topicTitle } from '@/content';
import { activeExam, answerExam, examDeadline, finishExam, pickExamQuestions, startExam } from '@/lib/training';
import type { MockExam } from '@/lib/model';
import { PageHeader } from '@/components/Page';
import { QuestionStem } from '@/components/QuestionCard';

const fmt = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h ? `${h}h` : ''}${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

export function ExamPage() {
  const { data } = useStudy();
  const exam = activeExam(data);
  return exam ? <ExamRun exam={exam} /> : <ExamSetup />;
}

function ExamSetup() {
  const { data, update } = useStudy();
  const navigate = useNavigate();
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  const groups = contest.disciplines
    .map((d) => ({ d, topics: d.topics.map((t) => ({ t, n: bank.filter((q) => q.topicId === t.id).length })).filter((x) => x.n > 0) }))
    .filter((g) => g.topics.length);
  const allTopics = groups.flatMap((g) => g.topics.map((x) => x.t.id));
  const [sel, setSel] = useState<string[]>(allTopics);
  const available = bank.filter((q) => sel.includes(q.topicId)).length;
  const [count, setCount] = useState(Math.min(20, available));
  const [pace, setPace] = useState<0 | 2 | 3>(3);
  const n = Math.min(count, available);
  const past = Object.values(data.exams)
    .filter((e) => e.finishedAt)
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!));

  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="space-y-5">
      <header>
        <PageHeader area="treino" icon="relogio" title="Simulado" />
        <p className="-mt-2 text-sm text-muted">
          Sem correção durante a prova. A prova real terá 70 questões de 5 alternativas (25 gerais, peso 1; 45 específicas, peso 2); aqui o
          sorteio usa as questões já escritas.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl">Matérias</h2>
        {groups.map((g) => (
          <fieldset key={g.d.id} className="card p-3">
            <legend className="rubric px-1 font-display">{g.d.title}</legend>
            {g.topics.map(({ t, n: nq }) => (
              <label key={t.id} className="flex items-start gap-3 py-1.5">
                <input type="checkbox" className="mt-1.5 h-4 w-4 accent-[rgb(var(--ember))]" checked={sel.includes(t.id)} onChange={() => toggle(t.id)} />
                <span className="flex-1">{t.title}</span>
                <span className="text-sm text-muted">{nq}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl">Número de questões</h2>
        <div className="flex gap-2">
          {[10, 20, 30, 40].map((c) => (
            <button key={c} disabled={c > available && c !== 10} className={count === c ? 'btn-primary flex-1' : 'btn-ghost flex-1'} onClick={() => setCount(c)}>
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">Disponíveis nas matérias marcadas: {available}.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl">Tempo</h2>
        <div className="flex gap-2">
          {([
            [0, 'Livre'],
            [2, '2 min/questão'],
            [3, '3 min/questão'],
          ] as const).map(([v, l]) => (
            <button key={v} className={pace === v ? 'btn-primary flex-1 !px-2' : 'btn-ghost flex-1 !px-2'} onClick={() => setPace(v)}>
              {l}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">
          {pace ? `Limite de ${n * pace} minutos; ao esgotar, a prova é entregue automaticamente.` : 'Sem cronômetro.'} O edital não fixa a duração; ela sairá
          no edital de convocação.
        </p>
      </section>

      <button
        className="btn-primary w-full"
        disabled={n === 0}
        onClick={() => {
          const qs = pickExamQuestions(bank, sel, n).map((q) => q.id);
          update((d) => startExam(d, contest.id, qs, pace ? n * pace : undefined).data);
          navigate('/simulado');
        }}
      >
        Iniciar simulado com {n} questões
      </button>

      {past.length > 0 && (
        <section>
          <h2 className="text-xl">Simulados anteriores</h2>
          <ul className="ledger mt-2">
            {past.map((e) => (
              <li key={e.id}>
                <Link to={`/simulado/${e.id}`} className="ledger-row">
                  <span>{new Date(e.finishedAt!).toLocaleDateString('pt-BR')}</span>
                  <span className="">
                    {e.correct} de {e.questionIds.length} ({Math.round(((e.correct ?? 0) / e.questionIds.length) * 100)}%)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ExamRun({ exam }: { exam: MockExam }) {
  const { update } = useStudy();
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [now, setNow] = useState(Date.now());
  const bank = useMemo(() => questionsForContest(exam.contestId), [exam.contestId]);
  const deadline = examDeadline(exam);
  const q = getQuestion(exam.questionIds[i])!;
  const answered = Object.keys(exam.answers).length;

  const finish = () => {
    update((d) => finishExam(d, exam.id, bank));
    navigate(`/simulado/${exam.id}`, { replace: true });
  };

  useEffect(() => {
    if (!deadline) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [deadline]);
  useEffect(() => {
    if (deadline && now >= deadline) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, deadline]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">
          Respondidas {answered} de {exam.questionIds.length}
        </span>
        {deadline && (
          <span className={`font-display text-lg ${deadline - now < 5 * 60000 ? 'rubric' : ''}`} aria-live="off">
            {fmt(deadline - now)}
          </span>
        )}
      </div>

      <nav aria-label="Questões do simulado" className="flex flex-wrap gap-1.5">
        {exam.questionIds.map((id, k) => (
          <button
            key={id}
            onClick={() => setI(k)}
            className={`h-9 w-9 rounded-lg border text-sm font-bold transition ${k === i ? 'border-gold bg-gold/15 text-gold' : 'border-line/50'} ${exam.answers[id] && k !== i ? 'bg-raised text-ink' : ''}`}
            aria-label={`Questão ${k + 1}${exam.answers[id] ? ', respondida' : ''}`}
          >
            {k + 1}
          </button>
        ))}
      </nav>

      <article className="card p-4">
        <p className="rubric font-display">Questão {i + 1}</p>
        <QuestionStem text={q.stem} className="mt-2" />
        <ol className="mt-3 space-y-2">
          {q.options.map((o) => {
            const on = exam.answers[q.id] === o.key;
            return (
              <li key={o.key}>
                <button
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition duration-150 active:scale-[0.99] ${on ? 'border-gold bg-gold/10 shadow-[inset_0_0_0_1px_rgb(var(--gold))]' : 'border-line/50 hover:border-gold/40 hover:bg-raised/50'}`}
                  aria-pressed={on}
                  onClick={() => update((d) => answerExam(d, exam.id, q.id, o.key))}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold ${on ? 'bg-gold text-white' : 'bg-raised text-muted'}`}>{o.key}</span>
                  <span className="flex-1">{o.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </article>

      <div className="flex gap-2">
        <button className="btn-ghost flex-1" disabled={i === 0} onClick={() => setI(i - 1)}>
          Anterior
        </button>
        <button className="btn-ghost flex-1" disabled={i === exam.questionIds.length - 1} onClick={() => setI(i + 1)}>
          Próxima
        </button>
      </div>
      <button
        className="btn-primary w-full"
        onClick={() => {
          const missing = exam.questionIds.length - answered;
          if (missing && !confirm(`Há ${missing} questão(ões) sem resposta, que contarão como erro. Entregar mesmo assim?`)) return;
          finish();
        }}
      >
        Entregar a prova
      </button>
    </div>
  );
}

export function ExamResultPage() {
  const { id = '' } = useParams();
  const { data } = useStudy();
  const e = data.exams[id];
  if (!e?.finishedAt) return <p>Simulado não encontrado.</p>;
  const qs = e.questionIds.map((x) => getQuestion(x)).filter((q): q is NonNullable<typeof q> => !!q);
  const byTopic = new Map<string, { ok: number; n: number }>();
  for (const q of qs) {
    const s = byTopic.get(q.topicId) ?? { ok: 0, n: 0 };
    s.n++;
    if (e.answers[q.id] === q.answer) s.ok++;
    byTopic.set(q.topicId, s);
  }
  const pct = Math.round(((e.correct ?? 0) / e.questionIds.length) * 100);
  const minutes = Math.round((new Date(e.finishedAt).getTime() - new Date(e.startedAt).getTime()) / 60000);

  return (
    <div className="space-y-5">
      <PageHeader area="treino" icon="relogio" title="Boletim do simulado" />
      <header className="card p-5 text-center">
        <p className="font-display text-5xl">{pct}%</p>
        <p className="mt-1 text-muted">
          {e.correct} de {e.questionIds.length} corretas em {minutes} min
          {e.timeLimitMin ? ` (limite de ${e.timeLimitMin} min)` : ''}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Na prova real a nota é padronizada pelo desempenho do grupo (edital, cap. 9); este percentual serve só para o seu acompanhamento.
        </p>
      </header>

      <section>
        <h2 className="text-xl">Por tópico</h2>
        <ul className="ledger mt-2">
          {[...byTopic].map(([t, s]) => (
            <li key={t} className="ledger-row">
              <span>{topicTitle(e.contestId, t)}</span>
              <span className="shrink-0">
                {s.ok}/{s.n}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl">Questões</h2>
        {qs.map((q, k) => {
          const sel = e.answers[q.id];
          const ok = sel === q.answer;
          return (
            <details key={q.id} className="card p-3">
              <summary className="cursor-pointer list-none">
                <span className={ok ? 'text-ok' : 'rubric'}>{ok ? 'Certa' : sel ? 'Errada' : 'Em branco'}</span> · {k + 1}. {q.stem.slice(0, 80)}…
              </summary>
              <div className="mt-2 space-y-2 text-[0.98rem]">
                <p>
                  Sua resposta: <b>{sel ?? 'nenhuma'}</b> · Gabarito: <b>{q.answer}</b>
                </p>
                <p>{q.explanation}</p>
                <Link to={`/capitulo/${q.chapterId}#${q.sectionId}`} className="rubric underline">
                  Estudar no grimório
                </Link>
              </div>
            </details>
          );
        })}
      </section>
      <div className="flex gap-2">
        <Link to="/revisao" className="btn-primary flex-1">
          Revisar erros
        </Link>
        <Link to="/simulado" className="btn-ghost flex-1">
          Novo simulado
        </Link>
      </div>
    </div>
  );
}
