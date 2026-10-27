// Gamificação derivada do estudo real: títulos, selos (conquistas), inventário,
// missões semanais e sequência de dias. Nada aqui é concedido sem atividade registrada.
import type { Chapter, Question } from '@/content/types';
import type { StudyData } from './model';
import { grantXp, latestAttempt, levelInfo, totalXp } from './study';
import { MASTERED_DAYS } from './training';

const localDay = (iso: string) => new Date(iso).toLocaleDateString('sv');

// --- Títulos -----------------------------------------------------------------
export const TITLES: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: 'Iniciante' },
  { minLevel: 3, title: 'Praticante' },
  { minLevel: 5, title: 'Estudioso' },
  { minLevel: 8, title: 'Analista' },
  { minLevel: 12, title: 'Especialista' },
  { minLevel: 16, title: 'Referência' },
];

export function titleFor(level: number) {
  return [...TITLES].reverse().find((t) => level >= t.minLevel)!.title;
}

// --- Sequência de dias ---------------------------------------------------------
export function activeDays(data: StudyData): Set<string> {
  const days = new Set<string>();
  data.attempts.forEach((a) => days.add(localDay(a.answeredAt)));
  Object.values(data.lessons).forEach((l) => days.add(localDay(l.lastCompletedAt)));
  Object.values(data.cards).forEach((c) => days.add(localDay(c.updatedAt)));
  Object.values(data.essays).forEach((e) => e.submittedAt && days.add(localDay(e.submittedAt)));
  Object.values(data.reading).forEach((r) => r.sectionsRead.length && days.add(localDay(r.updatedAt)));
  return days;
}

/** Dias seguidos com estudo até hoje (ou até ontem, se hoje ainda não houve estudo). */
export function streak(data: StudyData, now = new Date()): number {
  const days = activeDays(data);
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(d.toLocaleDateString('sv'))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(d.toLocaleDateString('sv'))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function bestStreak(data: StudyData): number {
  const days = [...activeDays(data)].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const s of days) {
    const cur = new Date(s + 'T12:00:00');
    run = prev && Math.round((cur.getTime() - prev.getTime()) / 86400000) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = cur;
  }
  return best;
}

// --- Domínio por tópico e inventário -------------------------------------------
export const MASTERY_FOR_ARTIFACT = 0.8;

export function topicMastery(data: StudyData, topicId: string, bank: Question[]) {
  const qs = bank.filter((q) => q.topicId === topicId);
  if (!qs.length) return 0;
  return qs.filter((q) => latestAttempt(data, q.id)?.isCorrect).length / qs.length;
}

// --- Selos (conquistas) ---------------------------------------------------------
export interface Achievement {
  id: string;
  name: string;
  how: string;
  progress: (ctx: Ctx) => [number, number];
}
interface Ctx {
  data: StudyData;
  chapters: Chapter[];
  bank: Question[];
}

const chaptersDone = ({ data, chapters }: Ctx) => chapters.filter((c) => data.reading[c.id]?.completedAt).length;

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'primeira-pagina', name: 'Primeiro passo', how: 'Concluir o primeiro trecho de estudo.', progress: ({ data }) => [Math.min(1, Object.values(data.reading).reduce((n, r) => n + r.sectionsRead.length, 0)), 1] },
  { id: 'capitulo', name: 'Capítulo concluído', how: 'Concluir todos os trechos de um capítulo.', progress: (c) => [Math.min(1, chaptersDone(c)), 1] },
  { id: 'bibliotecario', name: 'Leitor constante', how: 'Concluir cinco capítulos.', progress: (c) => [Math.min(5, chaptersDone(c)), 5] },
  { id: 'primeira-licao', name: 'Primeira Lição', how: 'Concluir uma lição.', progress: ({ data }) => [Math.min(1, Object.keys(data.lessons).length), 1] },
  { id: 'licao-perfeita', name: 'Precisão total', how: 'Acertar todas as questões de uma lição.', progress: ({ data }) => [Object.values(data.lessons).some((l) => l.bestScore === 100) ? 1 : 0, 1] },
  { id: 'cem-respostas', name: 'Cem Respostas', how: 'Responder 100 questões.', progress: ({ data }) => [Math.min(100, data.attempts.length), 100] },
  { id: 'redencao', name: 'Redenção', how: 'Recuperar na revisão 10 questões erradas.', progress: ({ data }) => [Math.min(10, data.xp.filter((e) => e.kind === 'review_recovered').length), 10] },
  { id: 'constancia', name: 'Constância', how: 'Estudar 7 dias seguidos.', progress: ({ data }) => [Math.min(7, bestStreak(data)), 7] },
  {
    id: 'provacao',
    name: 'Provação Simulada',
    how: 'Concluir um simulado de pelo menos 10 questões com 70% de acertos.',
    progress: ({ data }) => [Object.values(data.exams).some((e) => e.finishedAt && e.questionIds.length >= 10 && (e.correct ?? 0) / e.questionIds.length >= 0.7) ? 1 : 0, 1],
  },
  { id: 'pena-firme', name: 'Caso entregue', how: 'Entregar um estudo de caso.', progress: ({ data }) => [Object.values(data.essays).some((e) => e.submittedAt) ? 1 : 0, 1] },
  { id: 'memoria', name: 'Memória consolidada', how: `Levar 10 flashcards a intervalos de ${MASTERED_DAYS} dias ou mais.`, progress: ({ data }) => [Math.min(10, Object.values(data.cards).filter((c) => c.intervalDays >= MASTERED_DAYS).length), 10] },
  {
    id: 'dominio',
    name: 'Domínio Demonstrado',
    how: 'Acertar, na última tentativa, todas as questões de um tópico.',
    progress: ({ data, bank }) => [[...new Set(bank.map((q) => q.topicId))].some((t) => topicMastery(data, t, bank) === 1) ? 1 : 0, 1],
  },
];

export function achievements(data: StudyData, chapters: Chapter[], bank: Question[]) {
  const ctx = { data, chapters, bank };
  return ACHIEVEMENTS.map((a) => {
    const [cur, max] = a.progress(ctx);
    return { ...a, cur, max, done: cur >= max };
  });
}

// --- Missões semanais -----------------------------------------------------------
/** Segunda-feira da semana (AAAA-MM-DD), identificador da semana. */
export function weekId(now = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toLocaleDateString('sv');
}

export interface Mission {
  id: string;
  title: string;
  target: number;
}

export const MISSIONS: Mission[] = [
  { id: 'questoes', title: 'Responder 50 questões', target: 50 },
  { id: 'licoes', title: 'Concluir 2 lições', target: 2 },
  { id: 'cartoes', title: 'Revisar 30 flashcards', target: 30 },
  { id: 'prova', title: 'Concluir um simulado ou entregar um estudo de caso', target: 1 },
];

export function missionProgress(data: StudyData, now = new Date()) {
  const wk = weekId(now);
  const start = new Date(wk + 'T00:00:00').getTime();
  const end = start + 7 * 86400000;
  const inWeek = (iso?: string) => !!iso && new Date(iso).getTime() >= start && new Date(iso).getTime() < end;
  const count: Record<string, number> = {
    questoes: data.attempts.filter((a) => inWeek(a.answeredAt)).length,
    licoes: Object.values(data.lessons).filter((l) => inWeek(l.lastCompletedAt)).length,
    cartoes: Object.values(data.cards).filter((c) => inWeek(c.updatedAt)).length,
    prova:
      Object.values(data.exams).filter((e) => inWeek(e.finishedAt)).length + Object.values(data.essays).filter((e) => inWeek(e.submittedAt)).length,
  };
  return MISSIONS.map((m) => {
    const ref = `${wk}:${m.id}`;
    const cur = Math.min(m.target, count[m.id] ?? 0);
    return { ...m, ref, cur, done: cur >= m.target, claimed: data.xp.some((e) => e.kind === 'weekly_mission' && e.refId === ref) };
  });
}

/** Resgata a recompensa de uma missão cumprida (uma vez por missão por semana). */
export function claimMission(data: StudyData, missionId: string, now = new Date()) {
  const m = missionProgress(data, now).find((x) => x.id === missionId);
  if (!m || !m.done || m.claimed) return { data };
  return grantXp(data, 'weekly_mission', m.ref, now.toISOString());
}

export function characterSheet(data: StudyData) {
  const xp = totalXp(data);
  const lv = levelInfo(xp);
  return { xp, ...lv, title: titleFor(lv.level), streak: streak(data) };
}

/** Pistas reveladas em proporção ao avanço total (trechos praticados + desafios concluídos). */
export function cluesRevealed(completed: number, totalUnits: number, nClues: number): number {
  if (completed <= 0 || totalUnits <= 0) return 0;
  return Math.min(nClues, Math.ceil((completed / totalUnits) * nClues));
}
