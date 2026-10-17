// Dados privados do usuário (espelho das tabelas do Supabase, em camelCase).

export type AttemptContext = 'lesson' | 'review' | 'practice' | 'exam';

export interface Attempt {
  id: string;
  contestId: string;
  questionId: string;
  topicId: string;
  selectedOption: string;
  isCorrect: boolean;
  context: AttemptContext;
  contextRef?: string;
  answeredAt: string;
}

export interface ReadingProgress {
  chapterId: string;
  lastSectionId?: string;
  sectionsRead: string[];
  completedAt?: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  chapterId: string;
  sectionId: string;
  createdAt: string;
}

export interface LessonCompletion {
  lessonId: string;
  bestScore: number;
  firstCompletedAt: string;
  lastCompletedAt: string;
}

export type XpKind = 'question_first_correct' | 'lesson_complete' | 'chapter_read' | 'review_recovered';

export interface XpEvent {
  id: string;
  kind: XpKind;
  refId: string;
  amount: number;
  createdAt: string;
}

/** Registros ainda não confirmados pelo backend. */
export interface Pending {
  attempts: string[];
  xp: string[];
  bookmarks: string[];
  bookmarkDeletes: { chapterId: string; sectionId: string }[];
  reading: string[];
  lessons: string[];
}

export interface StudyData {
  version: 1;
  attempts: Attempt[];
  reading: Record<string, ReadingProgress>;
  bookmarks: Bookmark[];
  lessons: Record<string, LessonCompletion>;
  xp: XpEvent[];
  pending: Pending;
  lastSyncAt?: string;
}

export const emptyPending = (): Pending => ({ attempts: [], xp: [], bookmarks: [], bookmarkDeletes: [], reading: [], lessons: [] });

export const emptyData = (): StudyData => ({
  version: 1,
  attempts: [],
  reading: {},
  bookmarks: [],
  lessons: {},
  xp: [],
  pending: emptyPending(),
});

export const pendingCount = (p: Pending) =>
  p.attempts.length + p.xp.length + p.bookmarks.length + p.bookmarkDeletes.length + p.reading.length + p.lessons.length;
