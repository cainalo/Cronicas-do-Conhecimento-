import { getScenario } from '@/content';
import { escritorio } from '@/content/world/escritorio';
import { advance, choose, startScenario } from '@/lib/scenario';
import { adjacentInteractable, currentObjective, examine, findPath, pathNextTo, restoreWorld, roomAt, talk, validateWorld, walkable, type WorldState } from '@/lib/world';

const s = getScenario(escritorio.scenarioId)!;
const start = (): WorldState => ({ worldId: escritorio.id, version: escritorio.version, pos: escritorio.start, facing: 'direita', examined: [], scenario: startScenario(s, 't0'), updatedAt: 't0' });

describe('escritório 2D', () => {
  it('mapa válido: grade regular, todos alcançáveis, cada nó com quem o apresenta', () => {
    expect(validateWorld(escritorio, s)).toEqual([]);
    expect(roomAt(escritorio, escritorio.start)?.name).toBe('Recepção');
  });

  it('caminho desvia de paredes, móveis e pessoas; destino bloqueado não tem caminho', () => {
    const marta = escritorio.actors.find((a) => a.id === 'marta')!;
    const p = pathNextTo(escritorio, escritorio.start, [marta.at])!;
    expect(p.length).toBeGreaterThan(5);
    for (const t of p) expect(walkable(escritorio, t)).toBe(true);
    // Passos de uma casa por vez.
    let cur = escritorio.start;
    for (const t of p) {
      expect(Math.abs(t.x - cur.x) + Math.abs(t.y - cur.y)).toBe(1);
      cur = t;
    }
    expect(adjacentInteractable(escritorio, cur)).toEqual({ kind: 'actor', actor: marta });
    expect(findPath(escritorio, escritorio.start, { x: 0, y: 0 })).toEqual([]);
  });

  it('situação completa pelo mapa: conversa, objeto exigido, decisão errada com volta, conferência e fechamento', () => {
    let w = start();
    expect(currentObjective(escritorio, w)).toMatch(/Marta/);
    // Falar com quem não apresenta a etapa é só conversa.
    expect(talk(escritorio, w, 'joao').kind).toBe('conversa');
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.top')) };
    // A hipótese só abre depois de examinar o terminal.
    expect(talk(escritorio, w, 'marta')).toEqual({ kind: 'falta', objectIds: ['terminal'] });
    expect(currentObjective(escritorio, w)).toMatch(/terminal/);
    w = examine(escritorio, s, w, 'terminal').state;
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    // Hipótese errada volta à mesma etapa; a certa leva ao João.
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.cpu')) };
    expect(w.scenario.nodeId).toBe('n.top');
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.thrashing')) };
    expect(talk(escritorio, w, 'joao').kind).toBe('node');
    // O console só mostra algo depois da decisão.
    expect(examine(escritorio, s, w, 'console').available).toBe(false);
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.term')) };
    expect(talk(escritorio, w, 'marta')).toEqual({ kind: 'falta', objectIds: ['console'] });
    const ex = examine(escritorio, s, w, 'console');
    expect(ex.available).toBe(true);
    w = ex.state;
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    w = { ...w, closed: true };
    expect(currentObjective(escritorio, w)).toMatch(/resolvida/);
  });

  it('estado salvo volta na mesma versão e em casa válida', () => {
    const w = { ...start(), pos: { x: 3, y: 5 } };
    expect(restoreWorld(escritorio, s, w)).toBe(w);
    expect(restoreWorld(escritorio, s, { ...w, pos: { x: 0, y: 0 } })).toBeUndefined();
    expect(restoreWorld(escritorio, s, { ...w, version: 99 })).toBeUndefined();
  });
});
