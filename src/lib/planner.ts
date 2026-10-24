// Planejador de estudos: monta a "ordem do dia" a partir do estado real de estudo.
// O plano é derivado (não apaga nada): replanejar nunca altera o histórico.
import type { Chapter, EssayPrompt, Lesson, Question } from '@/content/types';
import type { StudyData, StudySettings } from './model';
import { reviewQueue, latestAttempt } from './study';
import { dueCards } from './training';
import { unitDone, type Unit } from './pace';
import { getLearningCheckpoint } from './checkpoint';

export const DEFAULT_SETTINGS: Omit<StudySettings, 'updatedAt'> = { minutesPerDay: 60, weekdays: [1, 2, 3, 4, 5, 6], dailyQuestionGoal: 10 };

export function settingsOf(data: StudyData): Omit<StudySettings, 'updatedAt'> {
  return data.settings ?? DEFAULT_SETTINGS;
}

export function setSettings(data: StudyData, s: Omit<StudySettings, 'updatedAt'>, now = new Date().toISOString()): StudyData {
  return { ...data, settings: { ...s, updatedAt: now }, pending: { ...data.pending, settings: true } };
}

/** Data local AAAA-MM-DD (o estudo acontece no fuso do usuário). */
export const localDay = (d: Date | string) => new Date(d).toLocaleDateString('sv');

export const MINUTES = { lesson: 12, practice: 8, mission: 15, reviewQuestion: 2, card: 0.5, essay: 45, examPerQuestion: 2 } as const;

export type PlanKind = 'read' | 'lesson' | 'trail' | 'review' | 'cards' | 'exam' | 'essay';
export interface PlanItem {
  key: string;
  kind: PlanKind;
  title: string;
  why: string;
  minutes: number;
  to: string;
  /** Quantidade alvo (questões ou cartões), quando aplicável. */
  target?: number;
  ref?: string;
  chapterId?: string;
  /** Atividade da trilha única (kind 'trail'). */
  unit?: Unit;
}

export interface Plan {
  day: string;
  restDay: boolean;
  items: PlanItem[];
  budget: number;
}

interface Content {
  chapters: Chapter[];
  lessons: Lesson[];
  bank: Question[];
  cardIds: string[];
  essays: EssayPrompt[];
  /** Trilha única (courseUnits). Quando presente, o conteúdo novo segue a mesma ordem do Continuar. */
  units?: Unit[];
}

const TRAIL_WHY: Record<Unit['kind'], string> = {
  aprender: 'Próximo trecho da trilha, explicado parte por parte.',
  praticar: 'Praticar logo após aprender fixa o conteúdo.',
  missao: 'Usar o que aprendeu num caso do Arquivo Real.',
  desafio: 'Fechar o capítulo com questões no estilo da prova.',
};

const sectionMinutes = (c: Chapter) => Math.max(5, Math.round(c.estimatedMinutes / c.sections.length));

export function buildPlan(data: StudyData, s: Omit<StudySettings, 'updatedAt'>, content: Content, now = new Date()): Plan {
  const day = localDay(now);
  const budget = s.minutesPerDay;
  if (!s.weekdays.includes(now.getDay())) return { day, restDay: true, items: [], budget };

  const items: PlanItem[] = [];
  let left = budget;
  const add = (it: PlanItem) => {
    items.push(it);
    left -= it.minutes;
  };

  // 1. Erros pendentes: até um quarto do tempo.
  const queue = reviewQueue(data, content.bank).length;
  if (queue) {
    const n = Math.min(queue, Math.max(1, Math.floor((budget * 0.25) / MINUTES.reviewQuestion)));
    add({ key: 'review', kind: 'review', title: `Revisar ${n} questão(ões) errada(s)`, why: 'Erros recentes são os mais fáceis de corrigir.', minutes: n * MINUTES.reviewQuestion, to: '/revisao', target: n });
  }

  // 2. Flashcards vencidos: até 15% do tempo.
  const due = dueCards(data, content.cardIds, now.toISOString()).length;
  if (due) {
    const n = Math.min(due, Math.max(5, Math.floor((budget * 0.15) / MINUTES.card)));
    add({ key: 'cards', kind: 'cards', title: `${n} flashcards`, why: 'Revisão espaçada antes de esquecer.', minutes: Math.ceil(n * MINUTES.card), to: '/flashcards', target: n });
  }

  // 3. Prática discursiva semanal no primeiro dia de estudo da semana.
  // A semana começa na segunda-feira.
  const order = (w: number) => (w + 6) % 7;
  const byWeek = [...s.weekdays].sort((a, b) => order(a) - order(b));
  const firstDay = byWeek[0];
  const essayThisWeek = Object.values(data.essays).some((e) => e.submittedAt && now.getTime() - new Date(e.submittedAt).getTime() < 6 * 86400000);
  const nextEssay = content.essays.find((p) => !data.essays[p.id]?.submittedAt);
  if (now.getDay() === firstDay && nextEssay && !essayThisWeek && left >= MINUTES.essay) {
    add({ key: `essay:${nextEssay.id}`, kind: 'essay', title: `Estudo de caso: ${nextEssay.title}`, why: 'Treino semanal da prova discursiva, que pode eliminar.', minutes: MINUTES.essay, to: `/discursiva/${nextEssay.id}`, ref: nextEssay.id });
  }

  // 4. Simulado semanal no último dia de estudo da semana.
  const lastDay = byWeek[byWeek.length - 1];
  const examThisWeek = Object.values(data.exams).some((e) => e.finishedAt && now.getTime() - new Date(e.finishedAt).getTime() < 6 * 86400000);
  const answered = content.bank.filter((q) => latestAttempt(data, q.id)).length;
  if (now.getDay() === lastDay && !examThisWeek && answered >= 10 && left >= 20) {
    const n = Math.min(20, Math.floor(left / MINUTES.examPerQuestion));
    add({ key: 'exam', kind: 'exam', title: `Simulado de ${n} questões`, why: 'Medir o progresso semanal em condição de prova.', minutes: n * MINUTES.examPerQuestion, to: '/simulado', target: n });
  }

  // 5. Conteúdo novo. Com a trilha única, a ordem é a mesma do Continuar: primeiro a atividade em
  // andamento (se houver), depois as pendentes na ordem do caminho. Nada já concluído entra.
  if (content.units) {
    const cp = getLearningCheckpoint(data, content.units);
    const pending = content.units.filter((u) => !unitDone(data, u));
    const ordered = cp.unit ? [cp.unit, ...pending.filter((u) => u.key !== cp.unit!.key)] : pending;
    for (const u of ordered) {
      if (left < 5) break;
      const ch = content.chapters.find((c) => c.id === u.chapterId);
      const minutes = u.kind === 'aprender' && ch ? sectionMinutes(ch) : MINUTES[u.kind === 'missao' ? 'mission' : u.kind === 'desafio' ? 'lesson' : 'practice'];
      add({ key: `trail:${u.key}`, kind: 'trail', title: u.title, why: TRAIL_WHY[u.kind], minutes, to: u.to, ref: u.key, chapterId: u.chapterId, unit: u });
    }
    return { day, restDay: false, items, budget };
  }

  // Sem a trilha (uso antigo): conteúdo novo na ordem dos grimórios, com a lição ao fim de cada capítulo.
  for (const ch of content.chapters) {
    if (left < 5) break;
    const read = data.reading[ch.id]?.sectionsRead ?? [];
    for (const sec of ch.sections) {
      if (left < 5) break;
      if (read.includes(sec.id)) continue;
      add({ key: `read:${ch.id}:${sec.id}`, kind: 'read', title: `${ch.title}: ${sec.title}`, why: 'Tópico do edital ainda não lido.', minutes: sectionMinutes(ch), to: `/capitulo/${ch.id}#${sec.id}`, ref: sec.id, chapterId: ch.id });
    }
    for (const lid of ch.lessonIds) {
      if (left < 5) break;
      if (data.lessons[lid]) continue;
      const l = content.lessons.find((x) => x.id === lid);
      if (l) add({ key: `lesson:${lid}`, kind: 'lesson', title: `Lição: ${l.title}`, why: 'Praticar logo após a leitura fixa o conteúdo.', minutes: MINUTES.lesson, to: `/licao/${lid}`, ref: lid });
    }
  }
  return { day, restDay: false, items, budget };
}

/** Uma atividade da ordem do dia está cumprida quando o estudo real aconteceu. */
export function isDone(it: PlanItem, data: StudyData, day: string): boolean {
  const today = <T extends string | undefined>(iso: T) => !!iso && localDay(iso) === day;
  switch (it.kind) {
    case 'read':
      return !!data.reading[it.chapterId!]?.sectionsRead.includes(it.ref!);
    case 'lesson':
      return !!data.lessons[it.ref!];
    case 'trail':
      return !!(it.unit && unitDone(data, it.unit));
    case 'review':
      return data.attempts.filter((a) => a.context === 'review' && today(a.answeredAt)).length >= (it.target ?? 1);
    case 'cards':
      return Object.values(data.cards).filter((c) => today(c.updatedAt)).length >= (it.target ?? 1);
    case 'exam':
      return Object.values(data.exams).some((e) => today(e.finishedAt));
    case 'essay':
      return !!data.essays[it.ref!]?.submittedAt;
  }
}

/** Quantos dias de estudo restam até a prova (inclui hoje). */
export function studyDaysUntil(examDate: string, weekdays: number[], now = new Date()): number {
  const end = new Date(examDate + 'T00:00:00');
  let n = 0;
  for (const d = new Date(now.getFullYear(), now.getMonth(), now.getDate()); d < end; d.setDate(d.getDate() + 1)) {
    if (weekdays.includes(d.getDay())) n++;
  }
  return n;
}

/** Minutos de estudo que ainda faltam para o material já escrito. */
export function remainingMinutes(data: StudyData, content: Content): number {
  let m = 0;
  for (const ch of content.chapters) {
    const read = data.reading[ch.id]?.sectionsRead ?? [];
    m += ch.sections.filter((s) => !read.includes(s.id)).length * sectionMinutes(ch);
    m += ch.lessonIds.filter((l) => !data.lessons[l]).length * MINUTES.lesson;
  }
  m += content.essays.filter((p) => !data.essays[p.id]?.submittedAt).length * MINUTES.essay;
  m += reviewQueue(data, content.bank).length * MINUTES.reviewQuestion;
  return m;
}
