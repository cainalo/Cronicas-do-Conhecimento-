// Simulador de situações profissionais (reformulação, Fase 6; spec 21). O cenário é um grafo finito de
// nós escrito no conteúdo; a escolha só segue a transição declarada (nada de código dinâmico). Escolha
// ruim não encerra com "fracasso": mostra a consequência e devolve a uma etapa anterior.
// Funções puras, sem React.

export interface ScenarioCharacter {
  id: string;
  name: string;
  role: string;
  /** Cor do retrato (variável de tema). */
  tone: 'gold' | 'azure' | 'teal' | 'pink' | 'leaf' | 'ember';
}

export interface ScenarioEvidence {
  id: string;
  title: string;
  /** Artefato fictício: saída de comando, tabela, trecho de log. */
  body: string;
  /** Como ler o artefato, em uma ou duas frases. */
  hint?: string;
}

export interface ScenarioDecision {
  id: string;
  label: string;
  /** Explicação da consequência, sempre mostrada depois da escolha. */
  feedback: string;
  outcome: 'boa' | 'aceitavel' | 'ruim';
  nextNodeId: string;
  conceptIds: string[];
}

export interface ScenarioNode {
  id: string;
  speakerId?: string;
  dialogue: string;
  evidenceIds?: string[];
  decisions?: ScenarioDecision[];
  terminal?: boolean;
  objective?: string;
}

export interface Scenario {
  id: string;
  version: number;
  title: string;
  summary: string;
  setting: string;
  topicIds: string[];
  /** Trechos que precisam estar estudados antes (o cenário não ensina; aplica). */
  requires: { chapterId: string; sectionId: string; label: string }[];
  prerequisiteConceptIds: string[];
  characters: ScenarioCharacter[];
  evidence: ScenarioEvidence[];
  entryNodeId: string;
  nodes: ScenarioNode[];
  estimatedMinutes: number;
  review: 'nao-revisado' | 'revisado';
  /** Fechamento: o princípio técnico em poucas frases. */
  principle: string;
}

export interface ScenarioState {
  scenarioId: string;
  version: number;
  nodeId: string;
  /** Decisões na ordem em que foram tomadas. */
  choices: { nodeId: string; decisionId: string; at: string }[];
  evidence: string[];
  /** Última escolha, para mostrar o retorno antes de seguir. */
  pending?: { nodeId: string; decisionId: string };
  finishedAt?: string;
  updatedAt: string;
}

/** Problemas do grafo: transição para nó inexistente, nó inalcançável, nó sem saída, beco sem fim. */
export function validateScenario(s: Scenario): string[] {
  const errs: string[] = [];
  const byId = new Map(s.nodes.map((n) => [n.id, n]));
  const ev = new Set(s.evidence.map((e) => e.id));
  const chars = new Set(s.characters.map((c) => c.id));
  if (!byId.has(s.entryNodeId)) errs.push(`entrada ${s.entryNodeId} não existe`);
  if (byId.size !== s.nodes.length) errs.push('ids de nó repetidos');
  for (const n of s.nodes) {
    if (n.speakerId && !chars.has(n.speakerId)) errs.push(`${n.id}: personagem ${n.speakerId} não existe`);
    for (const e of n.evidenceIds ?? []) if (!ev.has(e)) errs.push(`${n.id}: evidência ${e} não existe`);
    if (!n.terminal && !n.decisions?.length) errs.push(`${n.id}: nó sem decisão e sem fechamento`);
    if (n.terminal && n.decisions?.length) errs.push(`${n.id}: fechamento com decisões`);
    for (const d of n.decisions ?? []) {
      if (!byId.has(d.nextNodeId)) errs.push(`${n.id}/${d.id}: destino ${d.nextNodeId} não existe`);
      if (!d.feedback.trim()) errs.push(`${n.id}/${d.id}: sem explicação`);
    }
    if (n.decisions && !n.decisions.some((d) => d.outcome !== 'ruim')) errs.push(`${n.id}: nenhuma escolha boa`);
  }
  // Alcançáveis a partir da entrada.
  const seen = new Set<string>();
  const stack = [s.entryNodeId];
  while (stack.length) {
    const id = stack.pop()!;
    if (seen.has(id) || !byId.has(id)) continue;
    seen.add(id);
    for (const d of byId.get(id)!.decisions ?? []) stack.push(d.nextNodeId);
  }
  for (const n of s.nodes) if (!seen.has(n.id)) errs.push(`${n.id}: inalcançável`);
  // De todo nó alcançável se chega a um fechamento (sem beco sem saída).
  const canEnd = new Set(s.nodes.filter((n) => n.terminal).map((n) => n.id));
  for (let changed = true; changed; ) {
    changed = false;
    for (const n of s.nodes) {
      if (!canEnd.has(n.id) && n.decisions?.some((d) => canEnd.has(d.nextNodeId))) {
        canEnd.add(n.id);
        changed = true;
      }
    }
  }
  for (const id of seen) if (!canEnd.has(id)) errs.push(`${id}: não leva a nenhum fechamento`);
  return errs;
}

export function startScenario(s: Scenario, now = new Date().toISOString()): ScenarioState {
  const entry = s.nodes.find((n) => n.id === s.entryNodeId)!;
  return { scenarioId: s.id, version: s.version, nodeId: entry.id, choices: [], evidence: [...(entry.evidenceIds ?? [])], updatedAt: now };
}

/** Registra a escolha e mostra o retorno; o avanço de nó acontece em `advance`. */
export function choose(s: Scenario, st: ScenarioState, decisionId: string, now = new Date().toISOString()): ScenarioState {
  if (st.pending || st.finishedAt) return st;
  const node = s.nodes.find((n) => n.id === st.nodeId);
  const d = node?.decisions?.find((x) => x.id === decisionId);
  if (!node || !d) return st;
  return { ...st, choices: [...st.choices, { nodeId: node.id, decisionId, at: now }], pending: { nodeId: node.id, decisionId }, updatedAt: now };
}

export function advance(s: Scenario, st: ScenarioState, now = new Date().toISOString()): ScenarioState {
  if (!st.pending) return st;
  const d = s.nodes.find((n) => n.id === st.pending!.nodeId)?.decisions?.find((x) => x.id === st.pending!.decisionId);
  const next = d && s.nodes.find((n) => n.id === d.nextNodeId);
  if (!next) return { ...st, pending: undefined };
  const evidence = [...st.evidence, ...(next.evidenceIds ?? []).filter((e) => !st.evidence.includes(e))];
  return { ...st, nodeId: next.id, evidence, pending: undefined, finishedAt: next.terminal ? now : undefined, updatedAt: now };
}

export function decisionOf(s: Scenario, nodeId: string, decisionId: string) {
  return s.nodes.find((n) => n.id === nodeId)?.decisions?.find((d) => d.id === decisionId);
}

/** Resumo do fechamento: primeira escolha de cada etapa e conceitos a revisar. */
export function scenarioReport(s: Scenario, st: ScenarioState) {
  const firstByNode = new Map<string, string>();
  for (const c of st.choices) if (!firstByNode.has(c.nodeId)) firstByNode.set(c.nodeId, c.decisionId);
  const firsts = [...firstByNode.entries()].map(([n, d]) => decisionOf(s, n, d)!).filter(Boolean);
  const good = firsts.filter((d) => d.outcome === 'boa').length;
  const toReview = [...new Set(st.choices.map((c) => decisionOf(s, c.nodeId, c.decisionId)).filter((d) => d && d.outcome !== 'boa').flatMap((d) => d!.conceptIds))];
  return { steps: firsts.length, goodFirstTry: good, toReview };
}

/** Estado salvo vale só para a mesma versão do cenário; versão nova recomeça (o antigo não é apagado à toa). */
export function restoreScenario(s: Scenario, saved: ScenarioState | undefined): ScenarioState | undefined {
  if (!saved || saved.scenarioId !== s.id || saved.version !== s.version) return undefined;
  if (!s.nodes.some((n) => n.id === saved.nodeId)) return undefined;
  return saved;
}
