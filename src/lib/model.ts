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

export type XpKind = 'question_first_correct' | 'lesson_complete' | 'chapter_read' | 'review_recovered' | 'essay_submitted' | 'card_mastered' | 'weekly_mission';

/** Simulado. Em andamento fica só no aparelho; concluído é imutável e vai ao servidor. */
export interface MockExam {
  id: string;
  contestId: string;
  questionIds: string[];
  answers: Record<string, string>;
  timeLimitMin?: number;
  startedAt: string;
  finishedAt?: string;
  correct?: number;
}

/** Resposta discursiva: um rascunho por enunciado; a versão mais recente prevalece. */
export interface EssayAnswer {
  promptId: string;
  body: string;
  checklist: string[];
  submittedAt?: string;
  updatedAt: string;
}

/** Estado de repetição espaçada (SM-2 simplificado) de um flashcard. */
export interface CardState {
  cardId: string;
  dueAt: string;
  intervalDays: number;
  ease: number;
  reps: number;
  lapses: number;
  updatedAt: string;
}

/** Preferências do planejador (sincronizadas). weekdays: 0 = domingo ... 6 = sábado. */
export interface StudySettings {
  minutesPerDay: number;
  weekdays: number[];
  dailyQuestionGoal: number;
  updatedAt: string;
}

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
  exams: string[];
  essays: string[];
  cards: string[];
  settings: boolean;
}

/** Estado da história das missões: escolhas, confiança dos personagens, pistas e revisões marcadas. Fica no aparelho. */
export interface StoryState {
  choices: Record<string, string>;
  trust: Record<string, number>;
  clues: string[];
  /** Próxima revisão de cada missão concluída (data ISO). */
  reviews: Record<string, string>;
  updatedAt: string;
}

export interface StudyData {
  version: 1;
  attempts: Attempt[];
  reading: Record<string, ReadingProgress>;
  bookmarks: Bookmark[];
  lessons: Record<string, LessonCompletion>;
  xp: XpEvent[];
  exams: Record<string, MockExam>;
  essays: Record<string, EssayAnswer>;
  cards: Record<string, CardState>;
  settings?: StudySettings;
  story?: StoryState;
  pending: Pending;
  lastSyncAt?: string;
}

export const emptyPending = (): Pending => ({
  attempts: [],
  xp: [],
  bookmarks: [],
  bookmarkDeletes: [],
  reading: [],
  lessons: [],
  exams: [],
  essays: [],
  cards: [],
  settings: false,
});

export const emptyData = (): StudyData => ({
  version: 1,
  attempts: [],
  reading: {},
  bookmarks: [],
  lessons: {},
  xp: [],
  exams: {},
  essays: {},
  cards: {},
  pending: emptyPending(),
});

export const pendingCount = (p: Pending) =>
  p.attempts.length +
  p.xp.length +
  p.bookmarks.length +
  p.bookmarkDeletes.length +
  p.reading.length +
  p.lessons.length +
  p.exams.length +
  p.essays.length +
  p.cards.length +
  (p.settings ? 1 : 0);
