// Viabilidade do plano (reformulação, Fase 4; spec 15): horas que faltam contra horas disponíveis. Se
// não cabe, mostra o déficit e opções reais; nunca uma barra verde "no ritmo certo".
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits } from '@/app/useCheckpoint';
import { DEFAULT_CONTEST_ID, flashcards, getContest, journey, learningUnits, missions, questionsForContest } from '@/content';
import { computeFeasibility, fmtHours, snapshotPlan, weeklyPlan, type PlanSnapshot } from '@/lib/feasibility';
import { settingsOf } from '@/lib/planner';
import { reviewQueue } from '@/lib/study';
import { dueCards, unlockedCardIds } from '@/lib/training';
import { Icon } from '@/components/Icon';

const WEEK = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

export function useFeasibility() {
  const { data } = useStudy();
  return useMemo(() => {
    const s = settingsOf(data);
    const input = {
      data,
      units: trailUnits(),
      chapters: journey,
      learningUnits,
      missions,
      examDate: getContest(DEFAULT_CONTEST_ID)!.examDate,
      minutesPerDay: s.minutesPerDay,
      weekdays: s.weekdays,
      pendingReviewQuestions: reviewQueue(data, questionsForContest(DEFAULT_CONTEST_ID)).length,
      dueCards: dueCards(data, unlockedCardIds(data, flashcards)).length,
    };
    return { settings: s, f: computeFeasibility(input), week: weeklyPlan(input) };
  }, [data]);
}

const SNAP_KEY = 'cronicas:plan-snapshots';

/** Guarda a fotografia do plano neste aparelho (as 12 mais recentes). */
export function savePlanSnapshot(snap: PlanSnapshot) {
  try {
    const list = JSON.parse(localStorage.getItem(SNAP_KEY) ?? '[]') as PlanSnapshot[];
    localStorage.setItem(SNAP_KEY, JSON.stringify([...list, snap].slice(-12)));
  } catch {
    /* sem armazenamento: o plano continua funcionando */
  }
}

export function WeekPlanCard() {
  const { week, f, settings } = useFeasibility();
  const [saved, setSaved] = useState(false);
  const today = week[0]?.date;
  return (
    <section className="card p-4 sm:p-5" aria-label="Plano da semana">
      <h2 className="text-lg">Próximos 7 dias</h2>
      <p className="mt-1 text-sm text-muted">Revisão primeiro, depois a trilha na ordem. Os minutos são estimativas típicas.</p>
      <ol className="mt-3 space-y-2">
        {week.map((d) => {
          const total = d.newMinutes + d.practiceMinutes + d.reviewMinutes;
          const [, m, dd] = d.date.split('-');
          return (
            <li key={d.date} className={`rounded-2xl border border-line p-3 ${d.study ? 'bg-surface' : 'bg-raised/60'}`} data-testid={`dia-${d.date}`}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold">
                  {d.date === today ? 'Hoje' : WEEK[d.weekday]} <span className="text-sm font-normal text-muted">{dd}/{m}</span>
                </span>
                <span className="text-sm text-muted">{d.study ? fmtHours(total) : 'descanso'}</span>
              </div>
              {d.study && total > 0 && (
                <>
                  <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-raised" role="img" aria-label={`Novo ${d.newMinutes} min, prática ${d.practiceMinutes} min, revisão ${d.reviewMinutes} min`}>
                    <span className="bg-gold" style={{ width: `${(d.newMinutes / total) * 100}%` }} />
                    <span className="bg-azure" style={{ width: `${(d.practiceMinutes / total) * 100}%` }} />
                    <span className="bg-leaf" style={{ width: `${(d.reviewMinutes / total) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Novo {d.newMinutes} min · Prática {d.practiceMinutes} min · Revisão {d.reviewMinutes} min
                  </p>
                  {d.units.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-sm">
                      {d.units.map((u) => (
                        <li key={u.key} className="break-words">
                          {u.title} <span className="text-muted">({u.minutes} min)</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        className="btn-ghost mt-3 w-full text-sm"
        onClick={() => {
          savePlanSnapshot(snapshotPlan(f, week, { minutesPerDay: settings.minutesPerDay, weekdays: settings.weekdays, examDate: getContest(DEFAULT_CONTEST_ID)!.examDate }));
          setSaved(true);
        }}
      >
        {saved ? 'Plano guardado neste aparelho' : 'Guardar este plano para comparar depois'}
      </button>
    </section>
  );
}

export function FeasibilityCard() {
  const { f, settings } = useFeasibility();
  const pct = Math.min(100, Math.round((f.availableMinutes / Math.max(1, f.requiredMinutes)) * 100));
  const days = settings.weekdays.map((d) => WEEK[d]).join(', ');
  return (
    <section className="card p-4 sm:p-5" aria-label="Viabilidade do plano">
      <div className="flex items-start gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white ${f.feasible ? 'bg-ok' : 'bg-bad'}`} aria-hidden="true">
          <Icon name={f.feasible ? 'certo' : 'aviso'} size={22} strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg leading-snug">{f.feasible ? 'O plano cabe até a prova' : `Faltam ${fmtHours(f.deficitMinutes)} para caber tudo`}</h2>
          <p className="mt-1 text-sm text-muted">
            Falta estudar cerca de <b className="text-ink">{fmtHours(f.requiredMinutes)}</b> (entre {fmtHours(f.requiredRange.min)} e {fmtHours(f.requiredRange.max)}). Com {settings.minutesPerDay} min em{' '}
            {f.studyDays} dias de estudo ({days}), você tem <b className="text-ink">{fmtHours(f.availableMinutes)}</b>.
          </p>
        </div>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-raised" role="img" aria-label={`Tempo disponível cobre ${pct}% do necessário`}>
        <div className={`h-full rounded-full ${f.feasible ? 'bg-ok' : 'bg-bad'} progress-shine`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted">Tempo disponível cobre {pct}% do necessário.</p>
      {f.feasible ? (
        <p className="mt-2 text-sm">
          {f.finalReviewDays ? `Sobram os últimos ${f.finalReviewDays} dias de estudo para revisão e simulados.` : 'Não sobra semana final de revisão: considere um pouco mais de tempo.'}
        </p>
      ) : (
        <div className="mt-3 rounded-2xl border border-bad/40 bg-bad/10 p-3 text-sm">
          <p className="font-semibold">Opções para caber (nenhum conteúdo é retirado):</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            <li>
              estudar <b>{f.minutesPerDayNeeded} min</b> por dia nos mesmos dias;
            </li>
            <li>incluir mais dias da semana no plano;</li>
            <li>ou aceitar terminar a matéria nova depois e chegar à prova com parte só revisada em resumo.</li>
          </ul>
        </div>
      )}
      <Link to="/plano" className="btn-ghost mt-3 w-full text-sm">
        Ajustar dias e minutos
      </Link>
    </section>
  );
}
