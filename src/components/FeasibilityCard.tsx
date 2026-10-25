// Viabilidade do plano (reformulação, Fase 4; spec 15): horas que faltam contra horas disponíveis. Se
// não cabe, mostra o déficit e opções reais; nunca uma barra verde "no ritmo certo".
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits } from '@/app/useCheckpoint';
import { DEFAULT_CONTEST_ID, flashcards, getContest, journey, learningUnits, missions, questionsForContest } from '@/content';
import { computeFeasibility, fmtHours } from '@/lib/feasibility';
import { settingsOf } from '@/lib/planner';
import { reviewQueue } from '@/lib/study';
import { dueCards, unlockedCardIds } from '@/lib/training';
import { Icon } from '@/components/Icon';

const WEEK = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

export function useFeasibility() {
  const { data } = useStudy();
  return useMemo(() => {
    const s = settingsOf(data);
    return {
      settings: s,
      f: computeFeasibility({
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
      }),
    };
  }, [data]);
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
