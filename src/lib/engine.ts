// Engine de atividades (reformulação, Fase 3; specs 11 e 12). Um contrato único para os dois formatos
// que já existem (Prática: tf/blank/term/pairs/mcq; aulas e missões: choice/multi/order/sort/compare/
// fix/tf/exam), sem reescrever os renderers: adaptadores levam cada atividade a uma EngineActivity com
// tipo do spec, família, modo, conceitos exigidos/avaliados e códigos de erro. Também ficam aqui o gate
// de pré-requisito (nada é cobrado antes de ser ensinado) e a medida de diversidade da rodada.
// Funções puras, sem React.
import type { LearningUnit } from '@/content/learning';
import type { Chapter } from '@/content/types';
import type { StudyData } from './model';
import type { MissionActivity } from './activities';
import type { Activity as PracticeActivity } from './practice';
import { learnKey } from './pace';
import { readProgress } from './checkpoint';

/** Tipos do spec 12 que o app já implementa. */
export type ActivityKind =
  | 'single_choice'
  | 'multi_select'
  | 'true_false'
  | 'fill_blank'
  | 'multi_blank'
  | 'sentence_build'
  | 'matching_pairs'
  | 'order_sequence'
  | 'categorize'
  | 'find_error'
  | 'compare_solutions'
  | 'exam_item'
  | 'sql_lab';

export type Family = 'escolha' | 'selecao' | 'vf' | 'lacuna' | 'montar' | 'pares' | 'ordenar' | 'classificar' | 'depurar' | 'comparar' | 'prova' | 'laboratorio';
export type AssessmentMode = 'diagnostic' | 'instructional' | 'practice' | 'review' | 'exam';
/** Códigos de erro provável (spec 12 §5): hipótese, nunca certeza. */
export type ErrorCode = 'term_confusion' | 'sequence_error' | 'missed_condition' | 'calculation_error' | 'reading_misinterpretation' | 'careless_selection' | 'unknown';

export interface EngineActivity {
  id: string;
  kind: ActivityKind;
  family: Family;
  mode: AssessmentMode;
  requiresConceptIds: string[];
  assessesConceptIds: string[];
  /** Hipótese de erro quando a resposta está errada. */
  errorCode: ErrorCode;
  source: { format: 'missao'; activity: MissionActivity } | { format: 'pratica'; activity: PracticeActivity };
}

const FAMILY_OF: Record<ActivityKind, Family> = {
  single_choice: 'escolha',
  multi_select: 'selecao',
  true_false: 'vf',
  fill_blank: 'lacuna',
  multi_blank: 'lacuna',
  sentence_build: 'montar',
  matching_pairs: 'pares',
  order_sequence: 'ordenar',
  categorize: 'classificar',
  find_error: 'depurar',
  compare_solutions: 'comparar',
  exam_item: 'prova',
  sql_lab: 'laboratorio',
};

const MISSION_KIND: Record<MissionActivity['kind'], ActivityKind> = {
  choice: 'single_choice',
  multi: 'multi_select',
  order: 'order_sequence',
  sort: 'categorize',
  compare: 'compare_solutions',
  fix: 'find_error',
  tf: 'true_false',
  exam: 'exam_item',
};
const PRACTICE_KIND: Record<PracticeActivity['kind'], ActivityKind> = {
  tf: 'true_false',
  blank: 'fill_blank',
  multiBlank: 'multi_blank',
  build: 'sentence_build',
  term: 'single_choice',
  pairs: 'matching_pairs',
  mcq: 'exam_item',
};
const ERROR_CODE: Record<string, ErrorCode> = {
  conceito: 'missed_condition',
  confusao: 'term_confusion',
  procedimento: 'sequence_error',
  leitura: 'reading_misinterpretation',
};

export function fromMission(a: MissionActivity, assesses: string[] = [], mode: AssessmentMode = 'practice'): EngineActivity {
  const kind = MISSION_KIND[a.kind];
  return {
    id: a.id,
    kind,
    family: FAMILY_OF[kind],
    mode,
    requiresConceptIds: assesses,
    assessesConceptIds: mode === 'diagnostic' ? [] : assesses,
    errorCode: (a.errorKind && ERROR_CODE[a.errorKind]) || (kind === 'order_sequence' ? 'sequence_error' : 'unknown'),
    source: { format: 'missao', activity: a },
  };
}

export function fromPractice(a: PracticeActivity, assesses: string[] = [], mode: AssessmentMode = 'practice'): EngineActivity {
  const kind = PRACTICE_KIND[a.kind];
  return {
    id: a.id,
    kind,
    family: FAMILY_OF[kind],
    mode,
    requiresConceptIds: assesses,
    assessesConceptIds: assesses,
    errorCode: a.kind === 'term' || a.kind === 'pairs' ? 'term_confusion' : 'unknown',
    source: { format: 'pratica', activity: a },
  };
}

/** Problemas de diversidade (spec 12 §4): V/F até ~10%, no máximo duas da mesma família seguidas. */
export function diversityReport(acts: EngineActivity[], opts: { maxTfShare?: number } = {}): string[] {
  const out: string[] = [];
  const fams = acts.map((a) => a.family);
  for (let i = 2; i < fams.length; i++) if (fams[i] === fams[i - 1] && fams[i] === fams[i - 2]) out.push(`três "${fams[i]}" seguidas a partir da ${i - 1}ª`);
  const tf = fams.filter((f) => f === 'vf').length;
  const max = Math.max(1, Math.round(acts.length * (opts.maxTfShare ?? 0.1)));
  if (tf > max) out.push(`verdadeiro ou falso demais (${tf} de ${acts.length})`);
  return out;
}

/**
 * Reordena a rodada (sem tirar nada) para não ter três da mesma família seguidas, quando possível.
 * Determinístico: sempre escolhe a próxima atividade, na ordem original, que quebra a sequência.
 */
export function interleave<T extends { family: Family }>(acts: T[]): T[] {
  const rest = [...acts];
  const out: T[] = [];
  while (rest.length) {
    const n = out.length;
    const blocked = n >= 2 && out[n - 1].family === out[n - 2].family ? out[n - 1].family : undefined;
    const i = rest.findIndex((a) => a.family !== blocked);
    out.push(...rest.splice(i < 0 ? 0 : i, 1));
  }
  return out;
}

/**
 * Conceitos já ensinados ao estudante, segundo as unidades interativas: os de etapas concluídas da
 * unidade em andamento e todos os das unidades cujo trecho foi concluído. Diagnóstico não conta.
 */
export function taughtConcepts(data: StudyData, units: LearningUnit[]): Set<string> {
  const out = new Set<string>();
  for (const u of units) {
    const done = data.reading[u.chapterId]?.sectionsRead.includes(u.sectionId);
    const s = readProgress<{ stage?: string; step?: number; phase?: { k: string; i?: number } }>(data, learnKey(u.chapterId, u.sectionId));
    let upTo = done ? u.steps.length : 0;
    if (!done && s) {
      if (typeof s.step === 'number' && s.stage && s.stage !== 'abertura') upTo = s.stage === 'etapas' ? s.step : u.steps.length;
      else if (s.phase) upTo = ['praticar', 'prova', 'sintese'].includes(s.phase.k) ? u.steps.length : (s.phase.i ?? 0);
    }
    for (const c of u.prerequisiteConceptIds) out.add(c);
    for (const st of u.steps.slice(0, upTo)) st.introduces.forEach((c) => out.add(c));
  }
  return out;
}

/** Gate: a atividade regular só é elegível se tudo o que ela exige já foi ensinado. Diagnóstico passa. */
export function eligible(a: EngineActivity, taught: Set<string>): boolean {
  return a.mode === 'diagnostic' || a.requiresConceptIds.every((c) => taught.has(c));
}

/** Gate de trilha da Prática: o Aprender do mesmo trecho precisa estar concluído. */
export function practiceUnlocked(data: StudyData, chapter: Chapter, sectionId: string): boolean {
  return !!data.reading[chapter.id]?.sectionsRead.includes(sectionId);
}
