import { useMemo, useState } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, journey, lessons, questionsForContest } from '@/content';
import { buildPlan, localDay, settingsOf, type Plan } from '@/lib/planner';
import { GUEST } from '@/lib/storage';
import { trailUnits } from '@/app/useCheckpoint';
import { unlockedCardIds } from '@/lib/training';

/**
 * A ordem do dia é congelada no aparelho na primeira abertura do dia, para que as
 * atividades cumpridas continuem visíveis (marcadas) em vez de sumirem.
 */
export function usePlanOfToday() {
  const { data, session } = useStudy();
  const owner = session?.user.id ?? GUEST;
  const content = useMemo(
    // Cartões só de capítulos já apresentados (revisão nunca cobra o que não foi ensinado).
    () => ({ chapters: journey, lessons, bank: questionsForContest(DEFAULT_CONTEST_ID), cardIds: unlockedCardIds(data, flashcards), essays: essayPrompts, units: trailUnits() }),
    [data],
  );
  // v2: a ordem do dia passou a seguir a trilha única; planos antigos congelados são refeitos.
  const key = `cronicas:plano:v2:${owner}:${localDay(new Date())}`;
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
