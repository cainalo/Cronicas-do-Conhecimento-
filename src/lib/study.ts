// Regras de estudo puras (sem React, sem rede): registro de respostas, XP sem duplicidade,
// fila de revisão, progresso por tópico e recomendação da próxima atividade.
import type { Chapter, Lesson, Question } from '@/content/types';
import type { Attempt, AttemptContext, StudyData, XpEvent, XpKind } from './model';

export const XP_RULES: Record<XpKind, number> = {
  question_first_correct: 10,
  review_recovered: 5,
  lesson_complete: 30,
  chapter_read: 50,
  essay_submitted: 20,
  card_mastered: 3,
  weekly_mission: 40,
};

const uuid = () => crypto.randomUUID();
const uniq = (xs: string[]) => [...new Set(xs)];

export function hasXp(data: StudyData, kind: XpKind, refId: string) {
  return data.xp.some((e) => e.kind === kind && e.refId === refId);
}

/** Concede XP apenas uma vez por (tipo, referência). */
export function grantXp(data: StudyData, kind: XpKind, refId: string, now: string): { data: StudyData; event?: XpEvent } {
  if (hasXp(data, kind, refId)) return { data };
  const event: XpEvent = { id: uuid(), kind, refId, amount: XP_RULES[kind], createdAt: now };
  return {
    event,
    data: { ...data, xp: [...data.xp, event], pending: { ...data.pending, xp: [...data.pending.xp, event.id] } },
  };
}

export function attemptsFor(data: StudyData, questionId: string) {
  return data.attempts.filter((a) => a.questionId === questionId).sort((a, b) => a.answeredAt.localeCompare(b.answeredAt));
}

export function latestAttempt(data: StudyData, questionId: string): Attempt | undefined {
  const list = attemptsFor(data, questionId);
  return list[list.length - 1];
}

export interface AnswerResult {
  data: StudyData;
  attempt: Attempt;
  xp: XpEvent[];
}

export function recordAnswer(
  data: StudyData,
  q: Question,
  selected: string,
  context: AttemptContext,
  contextRef: string | undefined,
  now = new Date().toISOString(),
): AnswerResult {
  const previous = attemptsFor(data, q.id);
  const isCorrect = selected === q.answer;
  const attempt: Attempt = {
    id: uuid(),
    contestId: q.contestId,
    questionId: q.id,
    topicId: q.topicId,
    selectedOption: selected,
    isCorrect,
    context,
    contextRef,
    answeredAt: now,
  };
  let next: StudyData = {
    ...data,
    attempts: [...data.attempts, attempt],
    pending: { ...data.pending, attempts: [...data.pending.attempts, attempt.id] },
  };
  const xp: XpEvent[] = [];
  if (isCorrect) {
    const neverCorrect = !previous.some((a) => a.isCorrect);
    if (neverCorrect) {
      const r = grantXp(next, 'question_first_correct', q.id, now);
      next = r.data;
      if (r.event) xp.push(r.event);
    }
    const last = previous[previous.length - 1];
    if (last && !last.isCorrect) {
      const r = grantXp(next, 'review_recovered', q.id, now);
      next = r.data;
      if (r.event) xp.push(r.event);
    }
  }
  return { data: next, attempt, xp };
}

export function markSectionRead(data: StudyData, chapter: Chapter, sectionId: string, now = new Date().toISOString()) {
  const cur = data.reading[chapter.id] ?? { chapterId: chapter.id, sectionsRead: [], updatedAt: now };
  const sectionsRead = uniq([...cur.sectionsRead, sectionId]);
  const done = chapter.sections.every((s) => sectionsRead.includes(s.id));
  let next: StudyData = {
    ...data,
    reading: {
      ...data.reading,
      [chapter.id]: { ...cur, sectionsRead, lastSectionId: sectionId, completedAt: cur.completedAt ?? (done ? now : undefined), updatedAt: now },
    },
    pending: { ...data.pending, reading: uniq([...data.pending.reading, chapter.id]) },
    // Data da primeira vez que o trecho foi estudado (para o ritmo diário).
    unitLog: data.unitLog?.[`aprender:${chapter.id}:${sectionId}`] ? data.unitLog : { ...data.unitLog, [`aprender:${chapter.id}:${sectionId}`]: now },
  };
  let xp: XpEvent | undefined;
  if (done) {
    const r = grantXp(next, 'chapter_read', chapter.id, now);
    next = r.data;
    xp = r.event;
  }
  return { data: next, xp };
}

export function setLastSection(data: StudyData, chapterId: string, sectionId: string, now = new Date().toISOString()): StudyData {
  const cur = data.reading[chapterId] ?? { chapterId, sectionsRead: [], updatedAt: now };
  if (cur.lastSectionId === sectionId) return data;
  return {
    ...data,
    reading: { ...data.reading, [chapterId]: { ...cur, lastSectionId: sectionId, updatedAt: now } },
    pending: { ...data.pending, reading: uniq([...data.pending.reading, chapterId]) },
  };
}

export function completeLesson(data: StudyData, lesson: Lesson, scorePct: number, now = new Date().toISOString()) {
  const cur = data.lessons[lesson.id];
  const score = Math.round(Math.max(0, Math.min(100, scorePct)));
  let next: StudyData = {
    ...data,
    lessons: {
      ...data.lessons,
      [lesson.id]: {
        lessonId: lesson.id,
        bestScore: Math.max(cur?.bestScore ?? 0, score),
        firstCompletedAt: cur?.firstCompletedAt ?? now,
        lastCompletedAt: now,
      },
    },
    pending: { ...data.pending, lessons: uniq([...data.pending.lessons, lesson.id]) },
  };
  const r = grantXp(next, 'lesson_complete', lesson.id, now);
  next = r.data;
  return { data: next, xp: r.event };
}

export function toggleBookmark(data: StudyData, chapterId: string, sectionId: string, now = new Date().toISOString()): StudyData {
  const existing = data.bookmarks.find((b) => b.chapterId === chapterId && b.sectionId === sectionId);
  if (existing) {
    const wasPending = data.pending.bookmarks.includes(existing.id);
    return {
      ...data,
      bookmarks: data.bookmarks.filter((b) => b.id !== existing.id),
      pending: {
        ...data.pending,
        bookmarks: data.pending.bookmarks.filter((id) => id !== existing.id),
        bookmarkDeletes: wasPending ? data.pending.bookmarkDeletes : [...data.pending.bookmarkDeletes, { chapterId, sectionId }],
      },
    };
  }
  const b = { id: uuid(), chapterId, sectionId, createdAt: now };
  return {
    ...data,
    bookmarks: [...data.bookmarks, b],
    pending: {
      ...data.pending,
      bookmarks: [...data.pending.bookmarks, b.id],
      bookmarkDeletes: data.pending.bookmarkDeletes.filter((d) => !(d.chapterId === chapterId && d.sectionId === sectionId)),
    },
  };
}

// --- Leituras derivadas --------------------------------------------------

export const totalXp = (data: StudyData) => data.xp.reduce((s, e) => s + e.amount, 0);

/** Nível n exige 50·(n−1)² XP: 0, 50, 200, 450, 800... */
export function levelInfo(xp: number) {
  const level = Math.floor(Math.sqrt(xp / 50)) + 1;
  const floor = 50 * (level - 1) ** 2;
  const ceil = 50 * level ** 2;
  return { level, into: xp - floor, span: ceil - floor };
}

/** Questões cuja tentativa mais recente foi errada. */
export function reviewQueue(data: StudyData, bank: Question[]): Question[] {
  return bank.filter((q) => {
    const last = latestAttempt(data, q.id);
    return last !== undefined && !last.isCorrect;
  });
}

export interface TopicStats {
  topicId: string;
  totalQuestions: number;
  answered: number;
  correctNow: number; // questões cuja última tentativa está correta
  attempts: number;
  accuracy: number | null; // acerto sobre todas as tentativas
  mastery: number; // correctNow / totalQuestions
  chaptersRead: number;
  chaptersTotal: number;
}

export function topicStats(data: StudyData, topicId: string, bank: Question[], allChapters: Chapter[]): TopicStats {
  const qs = bank.filter((q) => q.topicId === topicId);
  const atts = data.attempts.filter((a) => a.topicId === topicId);
  const answered = qs.filter((q) => latestAttempt(data, q.id)).length;
  const correctNow = qs.filter((q) => latestAttempt(data, q.id)?.isCorrect).length;
  const chs = allChapters.filter((c) => c.topicIds.includes(topicId));
  return {
    topicId,
    totalQuestions: qs.length,
    answered,
    correctNow,
    attempts: atts.length,
    accuracy: atts.length ? atts.filter((a) => a.isCorrect).length / atts.length : null,
    mastery: qs.length ? correctNow / qs.length : 0,
    chaptersRead: chs.filter((c) => data.reading[c.id]?.completedAt).length,
    chaptersTotal: chs.length,
  };
}

export interface Recommendation {
  kind: 'review' | 'read' | 'lesson' | 'retry';
  title: string;
  reason: string;
  to: string;
}

export function recommend(data: StudyData, allChapters: Chapter[], allLessons: Lesson[], bank: Question[]): Recommendation | null {
  const queue = reviewQueue(data, bank);
  if (queue.length >= 3) {
    return {
      kind: 'review',
      title: `Revisar ${queue.length} questões erradas`,
      reason: 'Você tem erros acumulados. Revisá-los logo, enquanto a explicação ainda está fresca, fixa melhor o conteúdo.',
      to: '/revisao',
    };
  }
  for (const ch of allChapters) {
    const rp = data.reading[ch.id];
    const pendingLesson = ch.lessonIds.map((id) => allLessons.find((l) => l.id === id)).find((l) => l && !data.lessons[l.id]);
    if (!rp?.completedAt && (rp?.sectionsRead.length ?? 0) < ch.sections.length) {
      const nextSection = ch.sections.find((s) => !rp?.sectionsRead.includes(s.id)) ?? ch.sections[0];
      // Depois de ler metade do capítulo, intercala com a lição correspondente.
      if (pendingLesson && (rp?.sectionsRead.length ?? 0) >= Math.ceil(ch.sections.length / 2) && pendingLesson === allLessons.find((l) => l.id === ch.lessonIds[0])) {
        return {
          kind: 'lesson',
          title: pendingLesson.title,
          reason: 'Você já leu metade do capítulo. Praticar agora consolida a primeira parte antes de seguir.',
          to: `/licao/${pendingLesson.id}`,
        };
      }
      return {
        kind: 'read',
        title: `${ch.title}: ${nextSection.title}`,
        reason: rp ? 'Retome de onde parou.' : 'Assunto do edital ainda não estudado. Começa pela explicação simples.',
        to: `/aprender/${ch.id}/${nextSection.id}`,
      };
    }
    if (pendingLesson) {
      return { kind: 'lesson', title: pendingLesson.title, reason: 'Capítulo lido; falta praticar com a lição.', to: `/licao/${pendingLesson.id}` };
    }
  }
  if (queue.length > 0) {
    return { kind: 'review', title: `Revisar ${queue.length} questão(ões) errada(s)`, reason: 'Ainda há erros sem nova tentativa correta.', to: '/revisao' };
  }
  const weakest = allLessons.filter((l) => data.lessons[l.id]).sort((a, b) => data.lessons[a.id].bestScore - data.lessons[b.id].bestScore)[0];
  if (weakest && data.lessons[weakest.id].bestScore < 100) {
    return {
      kind: 'retry',
      title: `Refazer: ${weakest.title}`,
      reason: `Sua melhor nota nesta lição foi ${data.lessons[weakest.id].bestScore}%. É a mais fraca até agora.`,
      to: `/licao/${weakest.id}`,
    };
  }
  return null;
}
