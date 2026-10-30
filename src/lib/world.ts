// Ambiente de trabalho 2D (pacote v4, etapa 2): um escritório pequeno, em grade, por onde o estudante
// anda (teclado, toque ou direcional na tela), fala com colegas e examina objetos. A situação
// profissional reaproveita o motor de decisões de lib/scenario.ts: cada nó do cenário é apresentado
// por um personagem, e alguns só se abrem depois de examinar o objeto certo. Funções puras.
import type { Scenario, ScenarioState } from './scenario';

/**
 * O simulador independente pode apresentar saídas de referência junto do diálogo.
 * No mapa jogável, o terminal deve ser usado antes de registrar essas evidências.
 */
export function scenarioForOfficeMap(scenario: Scenario): Scenario {
  return {
    ...scenario,
    nodes: scenario.nodes.map((node) =>
      node.id === 'n.top' || node.id === 'n.fim'
        ? { ...node, evidenceIds: [] }
        : node,
    ),
  };
}

export interface Tile {
  x: number;
  y: number;
}

export interface WorldActor {
  id: string;
  name: string;
  role: string;
  at: Tile;
  /** Cores do personagem (camisa, cabelo, pele). */
  look: { shirt: string; hair: string; skin: string; hairStyle: 'curto' | 'coque' | 'longo' };
  /** O que diz quando não há nada dele na situação agora. */
  idle: string;
}

export interface WorldObject {
  id: string;
  label: string;
  /** O que se vê ao examinar, quando o objeto não traz evidência do cenário (ambiente do escritório). */
  info?: string;
  /** Casas ocupadas pelo objeto (não se anda sobre elas). */
  tiles: Tile[];
  /** Evidências do cenário que o objeto mostra. */
  evidenceIds: string[];
  /** Só mostra algo a partir deste nó do cenário (antes, diz `locked`). */
  availableFrom?: string;
  locked?: string;
}

export interface WorldRoom {
  id: string;
  name: string;
  /** Retângulo da sala, em casas (inclusive). */
  from: Tile;
  to: Tile;
  /** Casa livre onde o nome da sala é escrito (o texto segue para a direita). */
  label?: Tile;
}

/** Móvel ou enfeite desenhado no mapa, ocupando um retângulo de casas. */
export interface Decor {
  kind:
    | 'balcao' | 'sofa' | 'planta' | 'bebedouro' | 'tapete' | 'rack' | 'console' | 'arcond' | 'nobreak'
    | 'mesa' | 'mesaGrande' | 'cadeira' | 'quadro' | 'tv' | 'impressora' | 'armario' | 'geladeira'
    | 'bancada' | 'mesaCafe' | 'janela';
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** Bloqueia a passagem (padrão: sim; tapete, cadeira e janela não bloqueiam). */
  solid?: boolean;
  /** Variação de desenho (cor, orientação). */
  v?: number;
}

export interface World {
  id: string;
  version: number;
  title: string;
  /** Grade: '#' parede, '.' piso; outros caracteres são móveis (não se anda sobre eles). */
  grid: string[];
  /** Móveis e enfeites (os sólidos bloqueiam as casas que ocupam). */
  decor?: Decor[];
  rooms: WorldRoom[];
  start: Tile;
  actors: WorldActor[];
  objects: WorldObject[];
  scenarioId: string;
  /** Quem apresenta cada nó do cenário. */
  nodeActor: Record<string, string>;
  /** Evidências que precisam ter sido examinadas antes de o nó abrir. */
  nodeRequires: Record<string, string[]>;
  /** Objetivo mostrado em cada nó (e quando falta examinar algo). */
  objective: Record<string, string>;
}

export interface WorldState {
  worldId: string;
  version: number;
  pos: Tile;
  facing: Facing;
  /** Objetos já examinados. */
  examined: string[];
  scenario: ScenarioState;
  /** A conversa de fechamento já aconteceu (o cenário chega ao nó final antes da conferência). */
  closed?: boolean;
  updatedAt: string;
}

export type Facing = 'esquerda' | 'direita' | 'cima' | 'baixo';

/** Para onde olha quem anda de `from` para `to` (mantém a direção se não andou). */
export function facingOf(from: Tile, to: Tile, cur: Facing): Facing {
  if (to.x < from.x) return 'esquerda';
  if (to.x > from.x) return 'direita';
  if (to.y < from.y) return 'cima';
  if (to.y > from.y) return 'baixo';
  return cur;
}

export const same = (a: Tile, b: Tile) => a.x === b.x && a.y === b.y;

/** Casas de um móvel. */
export const decorTiles = (d: Decor): Tile[] => {
  const out: Tile[] = [];
  for (let y = d.y; y < d.y + (d.h ?? 1); y++) for (let x = d.x; x < d.x + (d.w ?? 1); x++) out.push({ x, y });
  return out;
};
const SOFT = new Set(['tapete', 'cadeira', 'janela']);
export const isSolid = (d: Decor) => d.solid ?? !SOFT.has(d.kind);
const key = (t: Tile) => `${t.x},${t.y}`;

/** Casas ocupadas por pessoas e objetos. */
export function occupied(w: World): Set<string> {
  return new Set([
    ...w.actors.map((a) => key(a.at)),
    ...w.objects.flatMap((o) => o.tiles.map(key)),
    ...(w.decor ?? []).filter(isSolid).flatMap((d) => decorTiles(d).map(key)),
  ]);
}

export function walkable(w: World, t: Tile, occ = occupied(w)): boolean {
  const row = w.grid[t.y];
  return !!row && t.x >= 0 && t.x < row.length && row[t.x] === '.' && !occ.has(key(t));
}

const DIRS: Tile[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export const neighbors = (t: Tile) => DIRS.map((d) => ({ x: t.x + d.x, y: t.y + d.y }));

/** Caminho mais curto (sem diagonais) até uma casa livre; vazio se não houver caminho. */
export function findPath(w: World, from: Tile, to: Tile): Tile[] {
  const occ = occupied(w);
  if (same(from, to)) return [];
  if (!walkable(w, to, occ)) return [];
  const prev = new Map<string, Tile | null>([[key(from), null]]);
  const queue = [from];
  while (queue.length) {
    const cur = queue.shift()!;
    if (same(cur, to)) break;
    for (const n of neighbors(cur)) {
      if (!prev.has(key(n)) && walkable(w, n, occ)) {
        prev.set(key(n), cur);
        queue.push(n);
      }
    }
  }
  if (!prev.has(key(to))) return [];
  const path: Tile[] = [];
  for (let t: Tile | null = to; t && !same(t, from); t = prev.get(key(t)) ?? null) path.unshift(t);
  return path;
}

/** Caminho até ficar ao lado de uma pessoa ou objeto (para interagir). */
export function pathNextTo(w: World, from: Tile, targets: Tile[]): Tile[] | null {
  if (targets.some((t) => neighbors(t).some((n) => same(n, from)))) return [];
  let best: Tile[] | null = null;
  for (const t of targets)
    for (const n of neighbors(t)) {
      const p = findPath(w, from, n);
      if (p.length && (!best || p.length < best.length)) best = p;
    }
  return best;
}

export type Interactable = { kind: 'actor'; actor: WorldActor } | { kind: 'object'; object: WorldObject };

/** Pessoa ou objeto ao lado da posição (o mais próximo na ordem: pessoas primeiro). */
export function adjacentInteractable(w: World, pos: Tile): Interactable | undefined {
  const near = (t: Tile) => neighbors(pos).some((n) => same(n, t));
  const actor = w.actors.find((a) => near(a.at));
  if (actor) return { kind: 'actor', actor };
  const object = w.objects.find((o) => o.tiles.some(near));
  return object ? { kind: 'object', object } : undefined;
}

export function roomAt(w: World, t: Tile): WorldRoom | undefined {
  return w.rooms.find((r) => t.x >= r.from.x && t.x <= r.to.x && t.y >= r.from.y && t.y <= r.to.y);
}

/** Evidências que faltam examinar para o nó abrir. */
export function missingEvidence(w: World, st: WorldState, nodeId: string): string[] {
  const seen = new Set(w.objects.filter((o) => st.examined.includes(o.id)).flatMap((o) => o.evidenceIds));
  return (w.nodeRequires[nodeId] ?? []).filter((e) => !seen.has(e));
}

/** O que acontece ao falar com uma pessoa: apresenta o nó atual, pede para examinar algo, ou só conversa. */
export function talk(w: World, st: WorldState, actorId: string): { kind: 'node' } | { kind: 'falta'; objectIds: string[] } | { kind: 'conversa' } {
  if (w.nodeActor[st.scenario.nodeId] !== actorId) return { kind: 'conversa' };
  const missing = missingEvidence(w, st, st.scenario.nodeId);
  if (!missing.length) return { kind: 'node' };
  return { kind: 'falta', objectIds: w.objects.filter((o) => o.evidenceIds.some((e) => missing.includes(e))).map((o) => o.id) };
}

/** Examinar um objeto: registra quando ele já está disponível na etapa atual do cenário. */
export function examine(w: World, s: Scenario, st: WorldState, objectId: string, now = new Date().toISOString()): { state: WorldState; available: boolean } {
  const o = w.objects.find((x) => x.id === objectId);
  if (!o) return { state: st, available: false };
  const order = s.nodes.map((n) => n.id);
  const available = !o.availableFrom || order.indexOf(st.scenario.nodeId) >= order.indexOf(o.availableFrom);
  if (!available || st.examined.includes(objectId)) return { state: st, available };
  const addedEvidence = o.evidenceIds.filter((id) => !st.scenario.evidence.includes(id));
  const scenario = addedEvidence.length
    ? { ...st.scenario, evidence: [...st.scenario.evidence, ...addedEvidence], updatedAt: now }
    : st.scenario;
  return { state: { ...st, examined: [...st.examined, objectId], scenario, updatedAt: now }, available };
}

/** Objetivo atual, em uma frase. */
export function currentObjective(w: World, st: WorldState): string {
  const node = st.scenario.nodeId;
  if (st.closed) return 'Situação resolvida. Veja o resumo.';
  const missing = missingEvidence(w, st, node);
  if (missing.length) {
    const obj = w.objects.find((o) => o.evidenceIds.some((e) => missing.includes(e)));
    return obj ? `Examine: ${obj.label}.` : w.objective[node] ?? '';
  }
  return w.objective[node] ?? '';
}

/** Problemas do mundo: grade irregular, pessoa ou objeto fora do piso, nó sem quem o apresente, sala inalcançável. */
export function validateWorld(w: World, s: Scenario): string[] {
  const errs: string[] = [];
  const width = w.grid[0]?.length ?? 0;
  w.grid.forEach((r, i) => r.length !== width && errs.push(`linha ${i} com largura ${r.length}`));
  if (!walkable(w, w.start)) errs.push('início não é piso livre');
  for (const a of w.actors) if (w.grid[a.at.y]?.[a.at.x] !== '.') errs.push(`${a.id} fora do piso`);
  for (const n of s.nodes) if (!w.nodeActor[n.id]) errs.push(`nó ${n.id} sem personagem`);
  for (const id of Object.values(w.nodeActor)) if (!w.actors.some((a) => a.id === id)) errs.push(`personagem ${id} não existe`);
  const evs = new Set(s.evidence.map((e) => e.id));
  for (const d of w.decor ?? []) for (const t of decorTiles(d)) if (w.grid[t.y]?.[t.x] !== '.') errs.push(`${d.kind} em ${t.x},${t.y} fora do piso`);
  for (const o of w.objects) {
    if (!o.evidenceIds.length && !o.info) errs.push(`${o.id}: sem evidência nem descrição`);
    for (const e of o.evidenceIds) if (!evs.has(e)) errs.push(`${o.id}: evidência ${e} não existe`);
    if (!pathNextTo(w, w.start, o.tiles)) errs.push(`${o.id} inalcançável`);
  }
  for (const a of w.actors) if (!pathNextTo(w, w.start, [a.at])) errs.push(`${a.id} inalcançável`);
  for (const ids of Object.values(w.nodeRequires)) for (const e of ids) if (!w.objects.some((o) => o.evidenceIds.includes(e))) errs.push(`evidência ${e} não está em nenhum objeto`);
  return errs;
}

export function restoreWorld(w: World, s: Scenario, saved: WorldState | undefined): WorldState | undefined {
  if (!saved || saved.worldId !== w.id || saved.version !== w.version || saved.scenario?.version !== s.version) return undefined;
  if (!walkable(w, saved.pos)) return undefined;
  return saved;
}
