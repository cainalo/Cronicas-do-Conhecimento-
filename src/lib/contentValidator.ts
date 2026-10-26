// Validador pedagógico das unidades (reformulação, Fase 2; spec 08 §7 e spec 11). Função pura: devolve
// erros acionáveis (unidade, id, vínculo inválido) em vez de lançar exceção genérica.
// Regras: ids únicos; conceitos registrados; nada é cobrado antes de ser introduzido (a abertura
// diagnóstica é a única exceção); unidade com objetivo, texto e tempo estimado; atividade da etapa
// depois da explicação; termos clicáveis só para conceitos registrados; pré-requisitos sem ciclo.
import type { Concept, LearningUnit } from '@/content/learning';

export interface ValidationError {
  unitId: string;
  ref: string;
  message: string;
}

export function validateUnit(unit: LearningUnit, concepts: Concept[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const err = (ref: string, message: string) => errors.push({ unitId: unit.id, ref, message });
  const known = new Set(concepts.map((c) => c.id));

  if (!unit.objective.trim()) err(unit.id, 'unidade sem objetivo');
  if (!(unit.estimatedMinutes[0] > 0 && unit.estimatedMinutes[1] >= unit.estimatedMinutes[0])) err(unit.id, 'tempo estimado inválido');
  if (!unit.steps.length) err(unit.id, 'unidade sem etapas');

  // Ids únicos (etapas, blocos e atividades).
  const seen = new Set<string>();
  const once = (id: string) => {
    if (seen.has(id)) err(id, 'id duplicado');
    seen.add(id);
  };
  once(unit.opening.activity.id);
  for (const s of unit.steps) {
    once(s.id);
    for (const b of s.blocks) {
      once(b.id);
      if (b.kind === 'inlineActivity') once(b.activity.id);
    }
    once(s.recovery.activity.id);
  }
  for (const x of [...unit.practice, ...unit.exam]) once(x.activity.id);

  // Conceitos registrados.
  for (const c of [...unit.conceptIds, ...unit.prerequisiteConceptIds]) if (!known.has(c)) err(c, 'conceito não registrado no glossário');

  // Nada cobrado antes de ser ensinado.
  const taught = new Set(unit.prerequisiteConceptIds);
  const check = (ref: string, assesses: string[]) => {
    if (!assesses.length) err(ref, 'atividade sem conceito avaliado (mapa incompleto)');
    for (const c of assesses) {
      if (!known.has(c)) err(ref, `cobra conceito não registrado: ${c}`);
      else if (!taught.has(c)) err(ref, `cobra ${c} antes de ele ser ensinado`);
    }
  };
  for (const s of unit.steps) {
    const firstText = s.blocks.findIndex((b) => b.kind === 'paragraph');
    const firstActivity = s.blocks.findIndex((b) => b.kind === 'inlineActivity');
    if (firstText < 0) err(s.id, 'etapa sem explicação em texto');
    if (firstActivity >= 0 && firstActivity < firstText) err(s.id, 'atividade antes da explicação');
    for (const c of s.introduces) taught.add(c);
    for (const b of s.blocks) if (b.kind === 'inlineActivity') check(b.activity.id, b.assesses);
    check(s.recovery.activity.id, s.recovery.assesses);
  }
  for (const x of [...unit.practice, ...unit.exam]) check(x.activity.id, x.assesses);
  return errors;
}

/** Glossário: ids e aliases únicos (um alias não pode apontar para dois conceitos). */
export function validateConcepts(concepts: Concept[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<string>();
  const alias = new Map<string, string>();
  for (const c of concepts) {
    if (ids.has(c.id)) errors.push({ unitId: '-', ref: c.id, message: 'conceito duplicado' });
    ids.add(c.id);
    if (!c.definition.trim()) errors.push({ unitId: '-', ref: c.id, message: 'conceito sem definição' });
    for (const a of c.aliases) {
      const k = a.toLocaleLowerCase('pt-BR');
      if (alias.has(k) && alias.get(k) !== c.id) errors.push({ unitId: '-', ref: c.id, message: `alias "${a}" também usado por ${alias.get(k)}` });
      alias.set(k, c.id);
    }
  }
  return errors;
}

/** Ciclo no grafo de pré-requisitos entre unidades (unidade → unidades que ela exige). */
export function findCycle(graph: Record<string, string[]>): string[] | null {
  const state = new Map<string, 1 | 2>();
  const path: string[] = [];
  const visit = (n: string): string[] | null => {
    if (state.get(n) === 2) return null;
    if (state.get(n) === 1) return [...path.slice(path.indexOf(n)), n];
    state.set(n, 1);
    path.push(n);
    for (const m of graph[n] ?? []) {
      const c = visit(m);
      if (c) return c;
    }
    path.pop();
    state.set(n, 2);
    return null;
  };
  for (const n of Object.keys(graph)) {
    const c = visit(n);
    if (c) return c;
  }
  return null;
}

/** Conceito que um termo em negrito representa, se já foi apresentado até a etapa atual. */
export function conceptForTerm(text: string, concepts: Concept[], available: Set<string>): Concept | undefined {
  const k = text.trim().toLocaleLowerCase('pt-BR');
  return concepts.find((c) => available.has(c.id) && c.aliases.some((a) => a.toLocaleLowerCase('pt-BR') === k));
}
