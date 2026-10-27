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
 * Versão "do zero" de uma seção: explicação em linguagem simples, para quem nunca estudou o
 * assunto. É o primeiro passo da trilha (Aprender); o texto completo fica para aprofundar.
 * Chave: `${chapterId}:${sectionId}`.
 */
export interface SimpleSection {
  /** 4 a 7 páginas curtas: uma ideia por página. */
  pages: { title: string; text: string }[];
  /** Palavras novas do trecho, com significado simples. */
  words: { term: string; meaning: string }[];
  /** Verificações bem fáceis, tiradas das páginas. */
  checks: { statement: string; answer: boolean; why: string }[];
}

// ---------- Missões (kit de reformulação "Arquivo Real", seção 4) ----------
import type { Db, Query } from '@/lib/sql';
import type { MissionActivity } from '@/lib/activities';

/** Fala do prólogo, com indicação de câmera e ação para a cena 3D. */
export interface SceneBeat {
  who: string;
  text: string;
  /** Enquadramento: plano geral, dois personagens, close em alguém, objeto. */
  shot: 'geral' | 'dupla' | 'close' | 'objeto';
  /** Ação de corpo ou do cenário neste momento (ex.: "valerio-entra"). */
  action?: string;
}

export interface LabTask {
  id: string;
  title: string;
  ask: string;
  /** Consulta inicial que o aluno recebe (pode estar errada de propósito). */
  start: Query;
  /** Consulta de referência: o resultado dela é o esperado. */
  expected: Query;
  hints: string[];
  /** Explicação depois do acerto. */
  explain: string;
  allowJoin?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  chapterId: string;
  sectionId: string;
  topicIds: string[];
  minutes: number;
  place: string;
  mystery: string;
  scene: SceneBeat[];
  objectives: string[];
  discovery: { title: string; text: string; table?: string; check: MissionActivity }[];
  lab: { db: Db; tasks: LabTask[] };
  training: MissionActivity[];
  exam: MissionActivity;
  ending: {
    text: string;
    prompt: string;
    options: { id: string; label: string; result: string; trust: Record<string, number>; clue: string }[];
  };
  recap: { learned: string[]; watch: string[] };
}

// ---------- Microaulas (auditoria de 24/10/2026, P0-04): uma ideia por vez, com checagem imediata ----------
export interface MicroStep {
  id: string;
  /** Parte da aula (ex.: "Processos", "Memória"). */
  part: string;
  title: string;
  /** O que a pessoa deve conseguir fazer ao fim desta etapa. */
  goal: string;
  /** Explicação curta, termos definidos na hora (Markdown). */
  explain: string;
  /** Exemplo trabalhado (Markdown; pode ter tabela ou comando). */
  example?: string;
  /** Ilustração própria da etapa (aparece na explicação e no post do feed). */
  art?: import('@/components/Illustration').IllustrationName;
  /** Checagem imediata do que acabou de ser ensinado. */
  check: import('@/lib/activities').MissionActivity;
  /** Se errar: outra explicação e um item equivalente com outros dados. */
  recovery: { explain: string; check: import('@/lib/activities').MissionActivity };
}

export interface MicroLesson {
  id: string;
  chapterId: string;
  sectionId: string;
  title: string;
  /** Problema concreto de abertura (pergunta antes da explicação). */
  opening: import('@/lib/activities').MissionActivity;
  steps: MicroStep[];
  /** Prática cumulativa, depois de todas as etapas. */
  consolidation: import('@/lib/activities').MissionActivity[];
  /** Questão(ões) no estilo da prova, só sobre o que já foi ensinado. */
  exam: import('@/lib/activities').MissionActivity[];
  summary: string[];
  /**
   * Série de aulas curtas do mesmo trecho (revisão didática de 26/10/2026): um trecho grande vira
   * várias aulas pequenas, em ordem. Cada aula é uma etapa da trilha; o trecho só conta como lido
   * no fim da última.
   */
  series?: { id: string; order: number };
  /**
   * Vocabulário controlado: termos que esta aula apresenta e a etapa em que aparecem pela primeira
   * vez. O teste de conteúdo impede que uma atividade ou explicação use o termo antes disso.
   * `match` é uma expressão regular (sem barras), sem diferenciar maiúsculas.
   */
  vocab?: { term: string; match: string; step: string }[];
}
