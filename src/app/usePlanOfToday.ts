import { useMemo, useState } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, journey, lessons, questionsForContest } from '@/content';
import { buildPlan, isDone, localDay, settingsOf, type Plan } from '@/lib/planner';
import { GUEST } from '@/lib/storage';
import { recommend } from '@/lib/study';

/**
 * A ordem do dia é congelada no aparelho na primeira abertura do dia, para que as
 * atividades cumpridas continuem visíveis (marcadas) em vez de sumirem.
 */
export function usePlanOfToday() {
  const { data, session } = useStudy();
  const owner = session?.user.id ?? GUEST;
  const content = useMemo(
    () => ({ chapters: journey, lessons, bank: questionsForContest(DEFAULT_CONTEST_ID), cardIds: flashcards.map((f) => f.id), essays: essayPrompts }),
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

/** Próxima atividade para o botão "Continuar": a primeira pendente da ordem do dia, ou a recomendação. */
export function useNextActivity(): { to: string; title: string } {
  const { data } = useStudy();
  const { plan, content } = usePlanOfToday();
  const pending = plan.items.find((i) => !isDone(i, data, plan.day));
  if (pending) return { to: pending.to, title: pending.title };
  const rec = recommend(data, content.chapters, content.lessons, content.bank);
  return rec ? { to: rec.to, title: rec.title } : { to: '/biblioteca', title: 'Escolher um grimório' };
}
