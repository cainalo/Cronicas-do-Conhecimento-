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
  /** Nome do ícone de capa (ver components/Icon.tsx). */
  sigil?: 'chave' | 'pena' | 'selo' | 'grimorio';
  /** Cor do couro da encadernação. */
  binding?: 'sangue' | 'floresta' | 'noite' | 'castanho';
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

export interface Flashcard {
  id: string;
  chapterId: string;
  topicId: string;
  front: string;
  back: string;
}

/** Estudo de caso para prática discursiva. Critérios são pedagógicos, NÃO os da banca. */
export interface EssayPrompt {
  id: string;
  contestId: string;
  topicIds: string[];
  title: string;
  /** Situação apresentada (markdown). */
  scenario: string;
  /** O que o candidato deve responder (markdown). */
  command: string;
  /** Limite de linhas usado no treino (a FCC define o limite em cada questão). */
  lineLimit: number;
  criteria: { id: string; text: string; points: number }[];
  modelAnswer: string;
  commentary: string;
  origin: QuestionOrigin;
  review: ReviewStatus;
}

/**
 * Extras de cada seção para a trilha estilo Duolingo: cena da história antes da leitura,
 * atividades interativas próprias (além das questões) e a fala de encerramento.
 * Chave: `${chapterId}:${sectionId}`.
 */
export interface SectionExtras {
  /** Cena de abertura: 3 a 5 falas curtas. who: 'Bubo', 'Aprendiz' ou outro personagem da história. */
  scene: { who: string; text: string }[];
  /** Verdadeiro ou falso sobre o conteúdo da seção (equilibrar verdadeiras e falsas). */
  truths: { statement: string; answer: boolean; why: string }[];
  /** Complete a lacuna: a frase tem "___" e uma das opções é a correta. */
  blanks: { sentence: string; options: string[]; answer: string; why: string }[];
  /** Fala do Bubo ao terminar a prática da seção. */
  outro: string;
}
