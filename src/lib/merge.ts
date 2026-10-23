// Fusão determinística entre dados locais e remotos (ou entre visitante e conta).
// Registros imutáveis (tentativas, XP) são unidos por id; XP também por (tipo, referência).
import type { Bookmark, LessonCompletion, MockExam, ReadingProgress, StudyData, XpEvent } from './model';

const uniq = (xs: string[]) => [...new Set(xs)];

export function mergeReading(a: ReadingProgress | undefined, b: ReadingProgress | undefined): ReadingProgress | undefined {
  if (!a) return b;
  if (!b) return a;
  const newer = a.updatedAt >= b.updatedAt ? a : b;
  const completed = [a.completedAt, b.completedAt].filter(Boolean).sort()[0];
  return {
    chapterId: a.chapterId,
    sectionsRead: uniq([...a.sectionsRead, ...b.sectionsRead]),
    lastSectionId: newer.lastSectionId ?? a.lastSectionId ?? b.lastSectionId,
    completedAt: completed,
    updatedAt: newer.updatedAt,
  };
}

export function mergeLesson(a: LessonCompletion | undefined, b: LessonCompletion | undefined): LessonCompletion | undefined {
  if (!a) return b;
  if (!b) return a;
  return {
    lessonId: a.lessonId,
    bestScore: Math.max(a.bestScore, b.bestScore),
    firstCompletedAt: a.firstCompletedAt < b.firstCompletedAt ? a.firstCompletedAt : b.firstCompletedAt,
    lastCompletedAt: a.lastCompletedAt > b.lastCompletedAt ? a.lastCompletedAt : b.lastCompletedAt,
  };
}

/** Mantém um evento por (tipo, referência); prefere o de `preferred` (ex.: o confirmado no servidor). */
export function mergeXp(preferred: XpEvent[], other: XpEvent[]): XpEvent[] {
  const out = new Map<string, XpEvent>();
  for (const e of [...preferred, ...other]) {
    const k = `${e.kind}|${e.refId}`;
    if (!out.has(k)) out.set(k, e);
  }
  return [...out.values()];
}

/** Última escrita vence (rascunhos discursivos e estado de flashcards). */
export function newest<T extends { updatedAt: string }>(a: T | undefined, b: T | undefined): T | undefined {
  if (!a) return b;
  if (!b) return a;
  return a.updatedAt >= b.updatedAt ? a : b;
}

/** Simulado concluído prevalece sobre o mesmo simulado em andamento. */
export function mergeExam(a: MockExam | undefined, b: MockExam | undefined): MockExam | undefined {
  if (!a) return b;
  if (!b) return a;
  return a.finishedAt ? a : b.finishedAt ? b : a;
}

function mergeRecords<T>(a: Record<string, T>, b: Record<string, T>, f: (x?: T, y?: T) => T | undefined) {
  const out: Record<string, T> = {};
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const v = f(a[k], b[k]);
    if (v) out[k] = v;
  }
  return out;
}

/**
 * Funde `incoming` em `base`. O conjunto de pendências resultante contém as pendências de ambos,
 * mais (se `incomingIsPending`) todos os registros vindos de `incoming` — usado ao migrar o
 * progresso do modo visitante para uma conta.
 */
export function mergeData(base: StudyData, incoming: StudyData, incomingIsPending = false): StudyData {
  const attemptIds = new Set(base.attempts.map((a) => a.id));
  const attempts = [...base.attempts, ...incoming.attempts.filter((a) => !attemptIds.has(a.id))];
  const xp = mergeXp(base.xp, incoming.xp);
  const xpIds = new Set(xp.map((e) => e.id));

  const bm = new Map<string, Bookmark>();
  for (const b of [...base.bookmarks, ...incoming.bookmarks]) {
    const k = `${b.chapterId}|${b.sectionId}`;
    if (!bm.has(k)) bm.set(k, b);
  }
  const bookmarks = [...bm.values()];

  const p = base.pending;
  const q = incoming.pending;
  const pending = {
    attempts: uniq([...p.attempts, ...q.attempts, ...(incomingIsPending ? incoming.attempts.map((a) => a.id) : [])]),
    xp: uniq([...p.xp, ...q.xp, ...(incomingIsPending ? incoming.xp.map((e) => e.id) : [])]).filter((id) => xpIds.has(id)),
    bookmarks: uniq([...p.bookmarks, ...q.bookmarks, ...(incomingIsPending ? incoming.bookmarks.map((b) => b.id) : [])]).filter((id) =>
      bookmarks.some((b) => b.id === id),
    ),
    bookmarkDeletes: [...p.bookmarkDeletes, ...q.bookmarkDeletes],
    reading: uniq([...p.reading, ...q.reading, ...(incomingIsPending ? Object.keys(incoming.reading) : [])]),
    lessons: uniq([...p.lessons, ...q.lessons, ...(incomingIsPending ? Object.keys(incoming.lessons) : [])]),
    exams: uniq([
      ...p.exams,
      ...q.exams,
      ...(incomingIsPending ? Object.values(incoming.exams).filter((e) => e.finishedAt).map((e) => e.id) : []),
    ]),
    essays: uniq([...p.essays, ...q.essays, ...(incomingIsPending ? Object.keys(incoming.essays) : [])]),
    cards: uniq([...p.cards, ...q.cards, ...(incomingIsPending ? Object.keys(incoming.cards) : [])]),
    settings: p.settings || q.settings || (incomingIsPending && !!incoming.settings),
  };

  return {
    version: 1,
    attempts,
    xp,
    bookmarks,
    reading: mergeRecords(base.reading, incoming.reading, mergeReading),
    lessons: mergeRecords(base.lessons, incoming.lessons, mergeLesson),
    exams: mergeRecords(base.exams, incoming.exams, mergeExam),
    essays: mergeRecords(base.essays, incoming.essays, newest),
    cards: mergeRecords(base.cards, incoming.cards, newest),
    settings: newest(base.settings, incoming.settings),
    story: newest(base.story, incoming.story),
    unitLog: (() => {
      const out: Record<string, string> = { ...incoming.unitLog };
      for (const [k, v] of Object.entries(base.unitLog ?? {})) if (!out[k] || v < out[k]) out[k] = v;
      return Object.keys(out).length ? out : undefined;
    })(),
    pending,
    lastSyncAt: base.lastSyncAt,
  };
}
