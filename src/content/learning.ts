// Contrato declarativo da unidade didática (reformulação, Fase 2; spec 08 do pacote técnico).
// Hierarquia: edital → tópico → Concept → LearningUnit → LearningStep → ContentBlock / atividade.
// As microaulas existentes continuam sendo a fonte do texto: `unitFromMicro` as adapta, sem copiar
// conteúdo. O que a unidade acrescenta é o mapa de conceitos (o que cada etapa introduz e o que cada
// atividade cobra), que o validador (lib/contentValidator.ts) usa para garantir que nada é cobrado
// antes de ser ensinado.
import type { MissionActivity } from '@/lib/activities';
import type { MicroLesson } from './types';

export interface Concept {
  id: string;
  /** Nome curto, como aparece no glossário. */
  term: string;
  /** Formas em que o termo aparece em negrito no texto (viram termos clicáveis). */
  aliases: string[];
  /** Definição curta, fiel ao texto da unidade. */
  definition: string;
  topicIds: string[];
}

export type ContentBlock =
  | { kind: 'paragraph'; id: string; md: string }
  | { kind: 'workedExample'; id: string; md: string }
  | { kind: 'inlineActivity'; id: string; activity: MissionActivity; assesses: string[] };

export interface LearningStep {
  id: string;
  part: string;
  title: string;
  goal: string;
  /** Conceitos apresentados nesta etapa (antes da atividade da etapa). */
  introduces: string[];
  blocks: ContentBlock[];
  /** Se errar a checagem: outra explicação e atividade equivalente, diferente da original. */
  recovery: { md: string; activity: MissionActivity; assesses: string[] };
}

export type EditorialStatus = 'nao-revisado' | 'revisado-editorialmente' | 'validado-tecnicamente' | 'requer-atualizacao';

export interface LearningUnit {
  id: string;
  version: number;
  title: string;
  summary: string[];
  contestId: string;
  chapterId: string;
  sectionId: string;
  topicIds: string[];
  objective: string;
  /** Faixa de minutos estimada (mínimo, máximo). */
  estimatedMinutes: [number, number];
  difficulty: 1 | 2 | 3;
  prerequisiteConceptIds: string[];
  conceptIds: string[];
  /** Pergunta de motivação: diagnóstica, não conta como ensino nem como domínio. */
  opening: { activity: MissionActivity; diagnostic: true };
  steps: LearningStep[];
  /** Prática cumulativa e questões de prova, depois de todas as etapas. */
  practice: { activity: MissionActivity; assesses: string[] }[];
  exam: { activity: MissionActivity; assesses: string[] }[];
  editorial: EditorialStatus;
}

/** Mapa pedagógico que acompanha uma microaula existente. */
export interface UnitMap {
  unitId: string;
  version: number;
  topicIds: string[];
  objective: string;
  estimatedMinutes: [number, number];
  difficulty: 1 | 2 | 3;
  prerequisiteConceptIds: string[];
  /** Conceitos introduzidos em cada etapa (pelo id da etapa da microaula). */
  introduces: Record<string, string[]>;
  /** Conceitos cobrados por cada atividade (pelo id da atividade). */
  assesses: Record<string, string[]>;
}

/** Adapta uma microaula (fonte do texto) a uma LearningUnit, usando o mapa de conceitos. */
export function unitFromMicro(micro: MicroLesson, map: UnitMap, contestId: string): LearningUnit {
  const a = (act: MissionActivity) => map.assesses[act.id] ?? [];
  const steps: LearningStep[] = micro.steps.map((s) => ({
    id: s.id,
    part: s.part,
    title: s.title,
    goal: s.goal,
    introduces: map.introduces[s.id] ?? [],
    blocks: [
      { kind: 'paragraph', id: `${s.id}.texto`, md: s.explain },
      ...(s.example ? [{ kind: 'workedExample' as const, id: `${s.id}.exemplo`, md: s.example }] : []),
      { kind: 'inlineActivity', id: `${s.id}.checagem`, activity: s.check, assesses: a(s.check) },
    ],
    recovery: { md: s.recovery.explain, activity: s.recovery.check, assesses: a(s.recovery.check) },
  }));
  return {
    id: map.unitId,
    version: map.version,
    title: micro.title,
    summary: micro.summary,
    contestId,
    chapterId: micro.chapterId,
    sectionId: micro.sectionId,
    topicIds: map.topicIds,
    objective: map.objective,
    estimatedMinutes: map.estimatedMinutes,
    difficulty: map.difficulty,
    prerequisiteConceptIds: map.prerequisiteConceptIds,
    conceptIds: [...new Set(Object.values(map.introduces).flat())],
    opening: { activity: micro.opening, diagnostic: true },
    steps,
    practice: micro.consolidation.map((x) => ({ activity: x, assesses: a(x) })),
    exam: micro.exam.map((x) => ({ activity: x, assesses: a(x) })),
    editorial: 'nao-revisado',
  };
}
