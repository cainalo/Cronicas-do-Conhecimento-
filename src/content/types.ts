// Modelo de conteúdo. Todo conteúdo é independente das telas e identificado por IDs estáveis,
// que também são as chaves usadas nos dados privados do usuário (Supabase / armazenamento local).

/** Grau de confirmação de uma informação do edital. */
export type SourceStatus =
  | 'oficial-verificado' // conferido no documento oficial (edital/retificação)
  | 'fonte-secundaria' // vindo de cursinhos/imprensa; pendente de conferência no oficial
  | 'nao-confirmado';

/** Estado editorial de um material didático. */
export type ReviewStatus = 'nao-revisado' | 'revisado-editorialmente' | 'validado-tecnicamente' | 'pendente-atualizacao';

/** Origem de uma questão. Nunca usar 'oficial' sem comprovação da prova de origem. */
export type QuestionOrigin = 'autoral' | 'oficial' | 'gerada-nao-revisada';

export interface Topic {
  id: string;
  title: string;
  status: SourceStatus;
}

export interface Discipline {
  id: string;
  title: string;
  block: 'gerais' | 'especificos';
  /** Número de questões, quando conhecido. */
  questions?: number;
  questionsStatus?: SourceStatus;
  topics: Topic[];
}

export interface ExamPart {
  title: string;
  detail: string;
  status: SourceStatus;
}

export interface Contest {
  id: string;
  name: string;
  role: string;
  board: string;
  examDate: string; // ISO (data prevista)
  facts: { label: string; value: string; status: SourceStatus }[];
  exam: ExamPart[];
  disciplines: Discipline[];
  sources: { title: string; url: string; kind: 'oficial' | 'secundaria'; accessed: string; note?: string }[];
  /** Histórico de versões do edital consideradas. */
  editalVersions: { id: string; title: string; date: string; summary: string; status: SourceStatus }[];
}

export interface Section {
  id: string;
  title: string;
  /** Markdown (GFM: tabelas, listas, código). */
  body: string;
}

export interface Chapter {
  id: string;
  grimoireId: string;
  number: number;
  title: string;
  subtitle: string;
  topicIds: string[];
  review: ReviewStatus;
  estimatedMinutes: number;
  sections: Section[];
  glossary: { term: string; definition: string }[];
  references: { title: string; detail: string }[];
  lessonIds: string[];
}

export interface Grimoire {
  id: string;
  contestId: string;
  disciplineId: string;
  title: string;
  epithet: string;
  description: string;
  chapterIds: string[];
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  /** Comentário específico sobre esta alternativa. */
  comment: string;
}

export interface Question {
  id: string;
  contestId: string;
  topicId: string;
  chapterId: string;
  /** Seção do capítulo onde o assunto é explicado (link de estudo). */
  sectionId: string;
  origin: QuestionOrigin;
  review: ReviewStatus;
  difficulty: 1 | 2 | 3;
  stem: string;
  options: QuestionOption[];
  answer: QuestionOption['key'];
  explanation: string;
}

export interface LessonCard {
  title: string;
  body: string; // markdown
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  goal: string;
  cards: LessonCard[];
  questionIds: string[];
}
