// Regras das missões: conclusão (com XP uma única vez, guardada junto das lições com prefixo próprio),
// escolha do desfecho (confiança dos personagens e pista persistentes) e revisão marcada. Funções puras.
import type { Mission } from '@/content/types';
import type { StoryState, StudyData } from './model';
import { grantXp } from './study';

export const MISSION_PREFIX = 'missao:';
export const missionKey = (id: string) => `${MISSION_PREFIX}${id}`;
export const missionDone = (data: StudyData, id: string) => !!data.lessons[missionKey(id)];

const emptyStory = (now: string): StoryState => ({ choices: {}, trust: {}, clues: [], reviews: {}, updatedAt: now });

/** Dias até a próxima revisão: mais cedo quando houve mais erros. */
export function reviewDelayDays(scorePct: number): number {
  return scorePct >= 90 ? 3 : scorePct >= 70 ? 2 : 1;
}

export function completeMission(data: StudyData, m: Mission, scorePct: number, now = new Date().toISOString()) {
  const id = missionKey(m.id);
  const cur = data.lessons[id];
  const score = Math.round(Math.max(0, Math.min(100, scorePct)));
  const due = new Date(new Date(now).getTime() + reviewDelayDays(score) * 86400000).toISOString();
  const story = data.story ?? emptyStory(now);
  const next: StudyData = {
    ...data,
    lessons: {
      ...data.lessons,
      [id]: { lessonId: id, bestScore: Math.max(cur?.bestScore ?? 0, score), firstCompletedAt: cur?.firstCompletedAt ?? now, lastCompletedAt: now },
    },
    story: { ...story, reviews: { ...story.reviews, [m.id]: due }, updatedAt: now },
    pending: { ...data.pending, lessons: [...new Set([...data.pending.lessons, id])] },
  };
  return grantXp(next, 'lesson_complete', id, now);
}

/** Registra a escolha do desfecho. A primeira escolha vale para a história; refazer a missão não a troca. */
export function chooseEnding(data: StudyData, m: Mission, optionId: string, now = new Date().toISOString()): StudyData {
  const story = data.story ?? emptyStory(now);
  if (story.choices[m.id]) return data;
  const opt = m.ending.options.find((o) => o.id === optionId);
  if (!opt) return data;
  const trust = { ...story.trust };
  for (const [k, v] of Object.entries(opt.trust)) trust[k] = (trust[k] ?? 0) + v;
  return {
    ...data,
    story: { ...story, choices: { ...story.choices, [m.id]: optionId }, trust, clues: [...story.clues, opt.clue], updatedAt: now },
  };
}

/** Missões com revisão vencida. */
export function missionsDue(data: StudyData, now = new Date().toISOString()): string[] {
  return Object.entries(data.story?.reviews ?? {})
    .filter(([, due]) => due <= now)
    .map(([id]) => id);
}
