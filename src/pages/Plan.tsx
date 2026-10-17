import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, essayPrompts, flashcards, getContest, lessons, questionsForContest } from '@/content';
import { buildPlan, isDone, localDay, remainingMinutes, setSettings, settingsOf, studyDaysUntil, type Plan } from '@/lib/planner';
import { GUEST } from '@/lib/storage';
import { latestAttempt } from '@/lib/study';
import { Icon } from '@/components/Icon';

const WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const fmtMin = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, '0') : ''}` : `${m} min`);

/**
 * A ordem do dia é congelada no aparelho na primeira abertura do dia, para que as
 * atividades cumpridas continuem visíveis (marcadas) em vez de sumirem.
 */
function usePlanOfToday() {
  const { data, session } = useStudy();
  const owner = session?.user.id ?? GUEST;
  const content = useMemo(
    () => ({ chapters, lessons, bank: questionsForContest(DEFAULT_CONTEST_ID), cardIds: flashcards.map((f) => f.id), essays: essayPrompts }),
    [],
  );
  const key = `cronicas:plano:${owner}:${localDay(new Date())}`;
  const read = (): Plan | null => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null');
    } catch {
      return null;
    }
  };
  const [plan, setPlan] = useState<Plan>(() => {
    const saved = read();
    if (saved) return saved;
    const p = buildPlan(data, settingsOf(data), content);
    try {
      localStorage.setItem(key, JSON.stringify(p));
    } catch {
      /* sem armazenamento: o plano vale só nesta visita */
    }
    return p;
  });
  const rebuild = (d = data) => {
    const p = buildPlan(d, settingsOf(d), content);
    try {
      localStorage.setItem(key, JSON.stringify(p));
    } catch {
      /* ignora */
    }
    setPlan(p);
  };
  return { plan, rebuild, content };
}

export function TodayPlanSummary() {
  const { data } = useStudy();
  const { plan } = usePlanOfToday();
  const done = plan.items.filter((i) => isDone(i, data, plan.day)).length;
  return (
    <Link to="/plano" className="ledger-row">
      <span>Ordem do dia</span>
      <span className={!plan.restDay && done < plan.items.length ? 'text-ember' : 'text-muted'}>
        {plan.restDay ? 'descanso' : `${done} de ${plan.items.length}`}
      </span>
    </Link>
  );
}

export function PlanPage() {
  const { data, update } = useStudy();
  const { plan, rebuild, content } = usePlanOfToday();
  const s = settingsOf(data);
  const [edit, setEdit] = useState(!data.settings);
  const [form, setForm] = useState(s);
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const days = studyDaysUntil(contest.examDate, s.weekdays);
  const remaining = remainingMinutes(data, content);
  const available = days * s.minutesPerDay;
  const done = plan.items.filter((i) => isDone(i, data, plan.day));
  const doneMin = done.reduce((m, i) => m + i.minutes, 0);

  // Previsto, estudado, revisado e com domínio demonstrado.
  const allSections = chapters.flatMap((c) => c.sections.map((x) => `${c.id}:${x.id}`));
  const readSections = chapters.flatMap((c) => (data.reading[c.id]?.sectionsRead ?? []).map((x) => `${c.id}:${x}`));
  const bank = content.bank;
  const lastOf = (id: string) => latestAttempt(data, id);
  const answered = bank.filter((q) => lastOf(q.id)).length;
  const mastered = bank.filter((q) => lastOf(q.id)?.isCorrect).length;

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-4xl">Ordo diei</h1>
        <p className="font-display text-muted">a ordem do dia do aprendiz</p>
      </header>

      {plan.restDay ? (
        <section className="manuscript p-5 text-center">
          <h2 className="text-xl">Hoje é dia de descanso</h2>
          <p className="mt-1 italic">Descansar também faz parte da preparação. Se quiser estudar mesmo assim, o treino continua aberto.</p>
          <Link to="/treino" className="btn-ghost mt-3">
            Ir ao treino
          </Link>
        </section>
      ) : (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl">Hoje</h2>
            <span className="italic text-muted">
              {fmtMin(doneMin)} de {fmtMin(plan.items.reduce((m, i) => m + i.minutes, 0))}
            </span>
          </div>
          {plan.items.length === 0 ? (
            <p className="mt-2 italic">Nada pendente no material já escrito. Use o treino para manter a memória viva.</p>
          ) : (
            <ol className="ledger mt-2">
              {plan.items.map((it) => {
                const ok = isDone(it, data, plan.day);
                return (
                  <li key={it.key}>
                    <Link to={it.to} className="ledger-row items-start">
                      <span className={`mt-1 shrink-0 ${ok ? 'text-ok' : 'text-muted'}`}>
                        {ok ? <Icon name="certo" size={18} /> : <span className="inline-block w-[18px] text-center">·</span>}
                      </span>
                      <span className="flex-1">
                        <span className={ok ? 'line-through decoration-ink/40' : ''}>{it.title}</span>
                        <span className="block text-sm italic text-muted">{it.why}</span>
                      </span>
                      <span className="shrink-0 text-sm text-muted">{fmtMin(it.minutes)}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
          <button className="btn-ghost mt-3 w-full" onClick={() => rebuild()}>
            Refazer a ordem do dia
          </button>
          <p className="mt-1 text-center text-xs italic text-muted">Refazer não apaga nada do histórico; só recalcula as próximas atividades.</p>
        </section>
      )}

      <section>
        <h2 className="text-xl">Até a prova</h2>
        <ul className="ledger mt-2">
          <li className="ledger-row">
            <span>Dias de estudo restantes</span>
            <span>{days}</span>
          </li>
          <li className="ledger-row">
            <span>Tempo disponível</span>
            <span>{fmtMin(available)}</span>
          </li>
          <li className="ledger-row">
            <span>Tempo para o material já escrito</span>
            <span>{fmtMin(remaining)}</span>
          </li>
          <li className="ledger-row">
            <span>Seções previstas / lidas</span>
            <span>
              {allSections.length} / {readSections.length}
            </span>
          </li>
          <li className="ledger-row">
            <span>Questões respondidas / com domínio</span>
            <span>
              {answered} / {mastered} de {bank.length}
            </span>
          </li>
        </ul>
        <p className="mt-2 text-sm italic text-muted">
          O material escrito cobre parte do edital (veja Progresso, Edital e cobertura). Ler não é dominar: domínio conta só as questões cuja última resposta está
          certa.
        </p>
      </section>

      <section>
        <button className="btn-ghost w-full" onClick={() => setEdit((v) => !v)} aria-expanded={edit}>
          {edit ? 'Fechar a disponibilidade' : 'Ajustar a disponibilidade'}
        </button>
        {edit && (
          <div className="card mt-3 space-y-4 p-4">
            <div>
              <p className="font-display">Minutos por dia de estudo</p>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {[30, 45, 60, 90, 120].map((m) => (
                  <button key={m} className={form.minutesPerDay === m ? 'btn-primary !px-1' : 'btn-ghost !px-1'} onClick={() => setForm({ ...form, minutesPerDay: m })}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display">Dias da semana</p>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {WEEK.map((w, i) => {
                  const on = form.weekdays.includes(i);
                  return (
                    <button
                      key={w}
                      aria-pressed={on}
                      className={on ? 'btn-primary !min-h-0 !px-0 !py-2 text-sm' : 'btn-ghost !min-h-0 !px-0 !py-2 text-sm'}
                      onClick={() =>
                        setForm({ ...form, weekdays: on ? form.weekdays.filter((x) => x !== i) : [...form.weekdays, i].sort() })
                      }
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="font-display">Meta diária de questões</p>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {[5, 10, 20, 30].map((g) => (
                  <button key={g} className={form.dailyQuestionGoal === g ? 'btn-primary' : 'btn-ghost'} onClick={() => setForm({ ...form, dailyQuestionGoal: g })}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="btn-primary w-full"
              disabled={form.weekdays.length === 0}
              onClick={() => {
                update((d) => setSettings(d, form));
                rebuild(setSettings(data, form));
                setEdit(false);
              }}
            >
              Salvar e refazer o plano
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
