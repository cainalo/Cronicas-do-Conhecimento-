// Regras puras de simulados, prática discursiva e flashcards.
import type { Question } from '@/content/types';
import type { CardState, EssayAnswer, MockExam, StudyData } from './model';
import { grantXp, recordAnswer } from './study';

const uniq = (xs: string[]) => [...new Set(xs)];

// --- Simulados -------------------------------------------------------------

/** Embaralhamento determinístico quando há semente (testes) e aleatório caso contrário. */
export function shuffle<T>(list: T[], rand: () => number = Math.random): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Sorteia questões distribuindo-as entre os tópicos escolhidos o mais igualmente possível,
 * para que um tópico com muitas questões não domine o simulado.
 */
export function pickExamQuestions(bank: Question[], topicIds: string[], count: number, rand: () => number = Math.random): Question[] {
  const pools = topicIds.map((t) => shuffle(bank.filter((q) => q.topicId === t), rand)).filter((p) => p.length);
  const out: Question[] = [];
  while (out.length < count && pools.some((p) => p.length)) {
    for (const p of pools) {
      const q = p.shift();
      if (q) out.push(q);
      if (out.length >= count) break;
    }
  }
  return shuffle(out, rand);
}

export function startExam(data: StudyData, contestId: string, questionIds: string[], timeLimitMin: number | undefined, now = new Date().toISOString()) {
  const exam: MockExam = { id: crypto.randomUUID(), contestId, questionIds, answers: {}, timeLimitMin, startedAt: now };
  return { data: { ...data, exams: { ...data.exams, [exam.id]: exam } }, exam };
}

export function answerExam(data: StudyData, examId: string, questionId: string, key: string): StudyData {
  const e = data.exams[examId];
  if (!e || e.finishedAt) return data;
  return { ...data, exams: { ...data.exams, [examId]: { ...e, answers: { ...e.answers, [questionId]: key } } } };
}

/** Encerra o simulado: corrige, grava as tentativas no histórico e marca para envio. */
export function finishExam(data: StudyData, examId: string, bank: Question[], now = new Date().toISOString()): StudyData {
  const e = data.exams[examId];
  if (!e || e.finishedAt) return data;
  let next = data;
  let correct = 0;
  for (const qid of e.questionIds) {
    const q = bank.find((x) => x.id === qid);
    const sel = e.answers[qid];
    if (!q || !sel) continue;
    if (sel === q.answer) correct++;
    next = recordAnswer(next, q, sel, 'exam', examId, now).data;
  }
  const done: MockExam = { ...e, finishedAt: now, correct };
  return {
    ...next,
    exams: { ...next.exams, [examId]: done },
    pending: { ...next.pending, exams: uniq([...next.pending.exams, examId]) },
  };
}

export function examDeadline(e: MockExam): number | null {
  return e.timeLimitMin ? new Date(e.startedAt).getTime() + e.timeLimitMin * 60000 : null;
}

export function activeExam(data: StudyData): MockExam | undefined {
  return Object.values(data.exams).find((e) => !e.finishedAt);
}

// --- Discursiva ------------------------------------------------------------

export function saveEssay(data: StudyData, promptId: string, body: string, checklist: string[], now = new Date().toISOString()): StudyData {
  const cur = data.essays[promptId];
  const essay: EssayAnswer = { promptId, body, checklist, submittedAt: cur?.submittedAt, updatedAt: now };
  return {
    ...data,
    essays: { ...data.essays, [promptId]: essay },
    pending: { ...data.pending, essays: uniq([...data.pending.essays, promptId]) },
  };
}

/** Marca a resposta como entregue (libera o modelo comentado) e concede XP uma única vez. */
export function submitEssay(data: StudyData, promptId: string, now = new Date().toISOString()) {
  const cur = data.essays[promptId];
  if (!cur || !cur.body.trim()) return { data };
  let next: StudyData = {
    ...data,
    essays: { ...data.essays, [promptId]: { ...cur, submittedAt: cur.submittedAt ?? now, updatedAt: now } },
    pending: { ...data.pending, essays: uniq([...data.pending.essays, promptId]) },
  };
  const r = grantXp(next, 'essay_submitted', promptId, now);
  next = r.data;
  return { data: next, xp: r.event };
}

/**
 * Estimativa de linhas manuscritas. A FCC define o limite de linhas em cada questão;
 * para letra cursiva em folha de resposta usamos ~75 caracteres por linha (aproximação pedagógica).
 */
export function estimateLines(text: string, charsPerLine = 75): number {
  if (!text.trim()) return 0;
  return text.split('\n').reduce((n, par) => n + Math.max(1, Math.ceil(par.trim().length / charsPerLine)), 0);
}

// --- Flashcards (SM-2 simplificado) ---------------------------------------

export type Grade = 'errei' | 'dificil' | 'bom' | 'facil';
const DAY = 86400000;
export const MASTERED_DAYS = 21;

export function newCard(cardId: string, now: string): CardState {
  return { cardId, dueAt: now, intervalDays: 0, ease: 2.5, reps: 0, lapses: 0, updatedAt: now };
}

export function schedule(c: CardState, grade: Grade, now = new Date().toISOString()): CardState {
  const t = new Date(now).getTime();
  let { intervalDays, ease, reps, lapses } = c;
  if (grade === 'errei') {
    reps = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
    intervalDays = 0;
    return { ...c, intervalDays, ease, reps, lapses, dueAt: new Date(t + 10 * 60000).toISOString(), updatedAt: now };
  }
  if (grade === 'dificil') {
    intervalDays = reps === 0 ? 1 : Math.max(1, intervalDays * 1.2);
    ease = Math.max(1.3, ease - 0.15);
  } else if (grade === 'bom') {
    intervalDays = reps === 0 ? 1 : reps === 1 ? 3 : intervalDays * ease;
  } else {
    intervalDays = reps === 0 ? 3 : Math.max(intervalDays, 1) * ease * 1.3;
    ease = Math.min(3.5, ease + 0.15);
  }
  reps += 1;
  intervalDays = Math.round(intervalDays * 10) / 10;
  return { ...c, intervalDays, ease, reps, lapses, dueAt: new Date(t + intervalDays * DAY).toISOString(), updatedAt: now };
}

export function reviewCard(data: StudyData, cardId: string, grade: Grade, now = new Date().toISOString()) {
  const cur = data.cards[cardId] ?? newCard(cardId, now);
  const s = schedule(cur, grade, now);
  let next: StudyData = {
    ...data,
    cards: { ...data.cards, [cardId]: s },
    pending: { ...data.pending, cards: uniq([...data.pending.cards, cardId]) },
  };
  let xp;
  if (s.intervalDays >= MASTERED_DAYS) {
    const r = grantXp(next, 'card_mastered', cardId, now);
    next = r.data;
    xp = r.event;
  }
  return { data: next, state: s, xp };
}

/** Cartões vencidos primeiro (mais atrasados antes), depois os novos, até o limite de novos por dia. */
export function dueCards(data: StudyData, cardIds: string[], now = new Date().toISOString(), newLimit = 15): string[] {
  const t = new Date(now).getTime();
  const seen = cardIds.filter((id) => data.cards[id]);
  const due = seen.filter((id) => new Date(data.cards[id].dueAt).getTime() <= t).sort((a, b) => data.cards[a].dueAt.localeCompare(data.cards[b].dueAt));
  const fresh = cardIds.filter((id) => !data.cards[id]).slice(0, newLimit);
  return [...due, ...fresh];
}
