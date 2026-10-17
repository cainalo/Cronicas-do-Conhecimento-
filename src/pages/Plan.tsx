import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest } from '@/content';
import { isDone, remainingMinutes, setSettings, settingsOf, studyDaysUntil } from '@/lib/planner';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { latestAttempt } from '@/lib/study';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { MascotSays } from '@/components/Mascot';

const WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const fmtMin = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, '0') : ''}` : `${m} min`);

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
      <PageHeader area="treino" icon="calendario" title="Ordem do dia" subtitle="O que estudar hoje, montado a partir do seu histórico" />
      {!plan.restDay && plan.items.length > 0 && (
        <MascotSays mood={done.length === plan.items.length ? 'cheer' : 'talk'} size={72}>
          {done.length === plan.items.length
            ? 'Ordem do dia cumprida! Descanse a pena ou siga treinando.'
            : `Faltam ${plan.items.length - done.length} atividade(s). O botão Continuar leva direto à próxima.`}
        </MascotSays>
      )}

      {plan.restDay ? (
        <section className="manuscript p-5 text-center">
          <h2 className="text-xl">Hoje é dia de descanso</h2>
          <p className="mt-1">Descansar também faz parte da preparação. Se quiser estudar mesmo assim, o treino continua aberto.</p>
          <Link to="/treino" className="btn-ghost mt-3">
            Ir ao treino
          </Link>
        </section>
      ) : (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl">Hoje</h2>
            <span className="text-muted">
              {fmtMin(doneMin)} de {fmtMin(plan.items.reduce((m, i) => m + i.minutes, 0))}
            </span>
          </div>
          {plan.items.length === 0 ? (
            <p className="mt-2">Nada pendente no material já escrito. Use o treino para manter a memória viva.</p>
          ) : (
            <ol className="ledger mt-2">
              {plan.items.map((it) => {
                const ok = isDone(it, data, plan.day);
                return (
                  <li key={it.key}>
                    <Link to={it.to} className="ledger-row items-start">
                      <span
                        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${ok ? 'border-ok bg-ok text-white' : 'border-line'}`}
                        aria-label={ok ? 'feito' : 'pendente'}
                      >
                        {ok && <Icon name="certo" size={14} strokeWidth={2.6} />}
                      </span>
                      <span className="flex-1">
                        <span className={ok ? 'line-through decoration-ink/40' : ''}>{it.title}</span>
                        <span className="block text-sm text-muted">{it.why}</span>
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
          <p className="mt-1 text-center text-xs text-muted">Refazer não apaga nada do histórico; só recalcula as próximas atividades.</p>
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
        <p className="mt-2 text-sm text-muted">
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
              <p className="font-semibold">Minutos por dia de estudo</p>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {[30, 45, 60, 90, 120].map((m) => (
                  <button key={m} className={form.minutesPerDay === m ? 'btn-primary !px-1' : 'btn-ghost !px-1'} onClick={() => setForm({ ...form, minutesPerDay: m })}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold">Dias da semana</p>
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
              <p className="font-semibold">Meta diária de questões</p>
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
