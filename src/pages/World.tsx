// Escritório 2D (pacote v4, etapa 2; refeito em 25/10/2026 a pedido do usuário): o mapa ocupa a tela
// inteira e tudo acontece por cima dele (objetivo, conversa, caderno, "ir até", direcional). Vista de
// cima ilustrada, em vetor chapado sem degradê, no estilo do app. O personagem anda casa a casa com
// movimento suave, olha para as quatro direções e mexe pernas e braços; os colegas viram para quem se
// aproxima. Setas/WASD, toque no destino ou direcional (segurar continua andando). Opcional: não mexe
// no checkpoint da trilha. Posição e escolhas ficam salvas neste aparelho.
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { getScenario } from '@/content';
import { escritorio } from '@/content/world/escritorio';
import { advance, choose, decisionOf, startScenario, type Scenario } from '@/lib/scenario';
import {
  adjacentInteractable,
  currentObjective,
  decorTiles,
  examine,
  facingOf,
  findPath,
  occupied,
  pathNextTo,
  restoreWorld,
  roomAt,
  same,
  talk,
  walkable,
  type Decor,
  type Facing,
  type Tile,
  type World,
  type WorldActor,
  type WorldState,
} from '@/lib/world';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { logUnit } from '@/lib/pace';
import { ScenarioClosing } from './Scenarios';

/** Unidade de desenho de uma casa (o mapa é escalado para a tela). */
const T = 48;
const STEP_MS = 170;
const KEY = (id: string) => `cronicas:mundo:${id}`;
const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function load(w: World, s: Scenario): WorldState | undefined {
  try {
    return restoreWorld(w, s, JSON.parse(localStorage.getItem(KEY(w.id)) ?? 'null') ?? undefined);
  } catch {
    return undefined;
  }
}
const fresh = (w: World, s: Scenario): WorldState => ({ worldId: w.id, version: w.version, pos: w.start, facing: 'baixo', examined: [], scenario: startScenario(s), updatedAt: new Date().toISOString() });

export function WorldPage() {
  const s = getScenario(escritorio.scenarioId)!;
  const { data } = useStudy();
  const missing = s.requires.filter((r) => !data.reading[r.chapterId]?.sectionsRead.includes(r.sectionId));
  if (missing.length) {
    return (
      <div className="space-y-4">
        <PageHeader area="explorar" title="Escritório de TI" subtitle="Ande pelo escritório, converse com a equipe e resolva um chamado." art="suporte" />
        <section className="card p-5" data-testid="mundo-bloqueado">
          <h2 className="text-lg">Primeiro, estude o assunto</h2>
          <p className="mt-1 text-sm">A situação deste escritório aplica o que a aula ensina; ela não ensina do zero. Conclua antes:</p>
          <ul className="mt-3 space-y-2">
            {missing.map((r) => (
              <li key={r.sectionId}>
                <Link to={`/aprender/${r.chapterId}/${r.sectionId}`} className="btn-primary w-full">
                  {r.label} <Icon name="avancar" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
  return <WorldPlay w={escritorio} s={s} />;
}

type Panel = { kind: 'actor'; id: string } | { kind: 'object'; id: string } | null;
type Sheet = 'caderno' | 'ir' | null;

/** Tamanho da janela (o mapa ocupa a tela inteira). */
function useViewport() {
  const get = () => ({ w: typeof window === 'undefined' ? 1024 : window.innerWidth, h: typeof window === 'undefined' ? 768 : window.innerHeight });
  const [v, setV] = useState(get);
  useEffect(() => {
    const on = () => setV(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return v;
}

function WorldPlay({ w, s }: { w: World; s: Scenario }) {
  const navigate = useNavigate();
  const { update } = useStudy();
  const [st, setSt] = useState<WorldState>(() => load(w, s) ?? fresh(w, s));
  useEffect(() => {
    if (st.closed && w.id === 'escritorio-ti') update((data) => logUnit(data, 'escritorio:processos-linux'));
  }, [st.closed, update, w.id]);
  const [path, setPath] = useState<Tile[]>([]);
  const [after, setAfter] = useState<Panel>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [walking, setWalking] = useState(false);
  const hold = useRef<{ d: Tile; timer: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const vp = useViewport();
  const width = w.grid[0].length;
  const height = w.grid.length;
  // Tamanho da casa na tela: o mapa inteiro em telas grandes; no celular, casas de pelo menos 44 px.
  const px = Math.max(44, Math.min(76, Math.floor(Math.min(vp.w / width, vp.h / height))));
  const scale = px / T;
  const mapW = width * px;
  const mapH = height * px;
  // Com um painel aberto embaixo, a câmera sobe o mapa para o personagem ficar visível acima dele.
  const overlay = !!(panel || sheet || st.closed);
  const viewH = overlay ? vp.h * 0.55 : vp.h;
  const cam = {
    x: mapW <= vp.w ? -(vp.w - mapW) / 2 : Math.max(0, Math.min(mapW - vp.w, (st.pos.x + 0.5) * px - vp.w / 2)),
    y: overlay ? (st.pos.y + 0.5) * px - viewH / 2 : mapH <= vp.h ? -(vp.h - mapH) / 2 : Math.max(0, Math.min(mapH - vp.h, (st.pos.y + 0.5) * px - vp.h / 2)),
  };
  const occ = useMemo(() => occupied(w), [w]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY(w.id), JSON.stringify(st));
    } catch {
      /* sem armazenamento: o mapa continua, só não retoma */
    }
  }, [st, w.id]);

  // A página por baixo não rola enquanto o mapa ocupa a tela.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const stepTo = useCallback((t: Tile) => {
    setSt((cur) => ({ ...cur, pos: t, facing: facingOf(cur.pos, t, cur.facing), updatedAt: new Date().toISOString() }));
  }, []);

  // Pernas param um pouco depois do último passo (o deslize termina antes).
  const walkPulse = useRef(0);
  const pulseWalking = useCallback(() => {
    setWalking(true);
    window.clearTimeout(walkPulse.current);
    walkPulse.current = window.setTimeout(() => setWalking(false), STEP_MS + 60);
  }, []);

  // Anda casa a casa pelo caminho; ao chegar, abre a interação pedida.
  useEffect(() => {
    if (!path.length) {
      if (after) {
        setPanel(after);
        setAfter(null);
      }
      return;
    }
    if (reduced()) {
      stepTo(path[path.length - 1]);
      setPath([]);
      return;
    }
    const id = window.setTimeout(() => {
      stepTo(path[0]);
      pulseWalking();
      setPath((p) => p.slice(1));
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [path, after, stepTo, pulseWalking]);

  const goNextTo = useCallback(
    (target: Panel) => {
      if (!target) return;
      const tiles = target.kind === 'actor' ? [w.actors.find((a) => a.id === target.id)!.at] : w.objects.find((o) => o.id === target.id)!.tiles;
      const p = pathNextTo(w, st.pos, tiles);
      if (p === null) return;
      setPanel(null);
      setSheet(null);
      setAfter(target);
      setPath(p);
    },
    [w, st.pos],
  );

  // Abrir um objeto já disponível o anota no caderno (o exame acontece aqui, fora da renderização).
  useEffect(() => {
    if (panel?.kind === 'object') setSt((cur) => examine(w, s, cur, panel.id).state);
  }, [panel, w, s]);

  const near = adjacentInteractable(w, st.pos);
  const interact = useCallback(() => {
    if (!near) return;
    // Vira para quem (ou o que) vai interagir.
    const t = near.kind === 'actor' ? near.actor.at : near.object.tiles.find((x) => Math.abs(x.x - st.pos.x) + Math.abs(x.y - st.pos.y) === 1) ?? near.object.tiles[0];
    setSt((cur) => ({ ...cur, facing: facingOf(cur.pos, t, cur.facing) }));
    setPanel(near.kind === 'actor' ? { kind: 'actor', id: near.actor.id } : { kind: 'object', id: near.object.id });
  }, [near, st.pos]);

  const move = useCallback(
    (d: Tile) => {
      setPath([]);
      setAfter(null);
      setSt((cur) => {
        const t = { x: cur.pos.x + d.x, y: cur.pos.y + d.y };
        const facing = facingOf(cur.pos, t, cur.facing);
        if (!walkable(w, t, occ)) return { ...cur, facing };
        return { ...cur, pos: t, facing, updatedAt: new Date().toISOString() };
      });
      pulseWalking();
      setPanel(null);
    },
    [w, occ, pulseWalking],
  );

  // Direcional: tocar anda uma casa; segurar continua andando.
  const startHold = (d: Tile) => {
    move(d);
    stopHold();
    hold.current = { d, timer: window.setInterval(() => move(d), STEP_MS) };
  };
  const stopHold = () => {
    if (hold.current) window.clearInterval(hold.current.timer);
    hold.current = null;
  };
  useEffect(() => stopHold, []);

  // Teclado: setas ou WASD andam (segurar repete); Enter, E ou espaço interagem; Esc fecha o painel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const d: Record<string, Tile> = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 } };
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (d[k]) {
        e.preventDefault();
        move(d[k]);
      } else if (k === 'Escape') {
        setPanel(null);
        setSheet(null);
      } else if ((k === 'Enter' || k === 'e' || k === ' ') && tag !== 'BUTTON') {
        if (near) {
          e.preventDefault();
          interact();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, near, interact]);

  // Toque ou clique no mapa: anda até a casa; em pessoa ou objeto, anda até o lado e interage.
  const onMapClick = (e: RPointerEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const t = { x: Math.floor((e.clientX - r.left + cam.x) / px), y: Math.floor((e.clientY - r.top + cam.y) / px) };
    const actor = w.actors.find((a) => same(a.at, t));
    const obj = w.objects.find((o) => o.tiles.some((x) => same(x, t)));
    if (actor) return goNextTo({ kind: 'actor', id: actor.id });
    if (obj) return goNextTo({ kind: 'object', id: obj.id });
    const p2 = findPath(w, st.pos, t);
    if (p2.length) {
      setPanel(null);
      setAfter(null);
      setPath(p2);
    }
  };

  const nodeActor = w.nodeActor[st.scenario.nodeId];
  const tk = talk(w, st, nodeActor);
  const needObjects = tk.kind === 'falta' ? tk.objectIds : [];
  const room = roomAt(w, st.pos);
  const objective = currentObjective(w, st);
  const restart = () => {
    setSt(fresh(w, s));
    setPanel(null);
    setPath([]);
  };

  return createPortal(
    <div className="fixed inset-0 z-[70] overflow-hidden bg-[#2a2723] text-ink" data-testid="mundo">
      <svg
        ref={svgRef}
        width={vp.w}
        height={vp.h}
        className="absolute inset-0 block cursor-pointer touch-none select-none"
        role="application"
        aria-label="Mapa do escritório. Use as setas para andar e Enter para falar ou examinar."
        onPointerUp={onMapClick}
        data-testid="mundo-mapa"
        data-cam={`${Math.round(cam.x)},${Math.round(cam.y)},${px}`}
      >
        <g style={{ transform: `translate(${-cam.x}px, ${-cam.y}px)`, transition: reduced() ? undefined : `transform ${STEP_MS + 80}ms linear` }}>
          <g transform={`scale(${scale})`}>
            <MapArt w={w} />
            {w.objects.map((o) =>
              needObjects.includes(o.id) ? (
                <g key={o.id} transform={`translate(${o.tiles[0].x * T + T / 2},${o.tiles[0].y * T + 4})`}>
                  <circle r="9" fill="rgb(var(--gold) / 0.25)" className="anim-twinkle" />
                  <circle r="5" fill="rgb(var(--gold))" />
                </g>
              ) : null,
            )}
            {w.actors.map((a) => (
              <g key={a.id} transform={`translate(${a.at.x * T},${a.at.y * T})`}>
                <Person look={a.look} facing={npcFacing(a, st.pos)} />
                <NameTag name={a.name} highlight={nodeActor === a.id && !st.closed && needObjects.length === 0} />
              </g>
            ))}
            <g style={{ transform: `translate(${st.pos.x * T}px, ${st.pos.y * T}px)`, transition: reduced() ? undefined : `transform ${STEP_MS}ms linear` }} data-testid="mundo-voce">
              <Person look={{ shirt: '#1b1a17', hair: '#3b2a1e', skin: '#d9a77c', hairStyle: 'curto' }} facing={st.facing} walking={walking || path.length > 0} you />
            </g>
          </g>
        </g>
      </svg>

      {/* Barra do alto: sair, onde estou, objetivo, caderno e "ir até". */}
      <div className="pointer-events-none absolute inset-x-0 top-0 p-3" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
        <div className="pointer-events-auto flex items-start gap-2">
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface/95 shadow-md" onClick={() => navigate('/explorar')} aria-label="Sair do escritório (fica salvo)">
            <Icon name="voltar" size={20} />
          </button>
          <div className="min-w-0 flex-1 rounded-2xl bg-surface/95 px-3 py-2 shadow-md">
            <p className="truncate text-xs text-muted">
              Escritório de TI · <span data-testid="mundo-sala">{room?.name ?? ''}</span>
            </p>
            <p className="text-sm leading-snug">
              <span className="kicker">Objetivo</span> <b data-testid="mundo-objetivo">{objective}</b>
            </p>
          </div>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface/95 shadow-md" onClick={() => setSheet(sheet === 'caderno' ? null : 'caderno')} aria-label="Caderno de investigação" aria-pressed={sheet === 'caderno'}>
            <Icon name="pena" size={20} />
          </button>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface/95 shadow-md" onClick={() => setSheet(sheet === 'ir' ? null : 'ir')} aria-label="Ir até" aria-pressed={sheet === 'ir'}>
            <Icon name="mapa" size={20} />
          </button>
        </div>
      </div>

      {/* Painel por cima do mapa: conversa, objeto, caderno ou "ir até". */}
      {(panel || st.closed || sheet) && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-3" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="relative max-h-[58dvh] w-full max-w-xl overflow-y-auto rounded-2xl bg-surface shadow-xl">
            <button className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => (setPanel(null), setSheet(null))} aria-label="Fechar o painel">
              <Icon name="errado" size={18} />
            </button>
            {sheet === 'caderno' ? (
              <Notebook s={s} w={w} st={st} />
            ) : sheet === 'ir' ? (
              <GoTo w={w} onGo={goNextTo} />
            ) : (
              <InteractionPanel w={w} s={s} st={st} setSt={setSt} panel={panel} onRestart={restart} />
            )}
          </div>
        </div>
      )}

      {/* Controles: direcional (segurar continua andando) e ação. */}
      {!panel && !sheet && !st.closed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3" style={{ paddingBottom: 'max(0.9rem, env(safe-area-inset-bottom))' }}>
          <DPad onStart={startHold} onStop={stopHold} />
          {near ? (
            <button className="btn-primary pointer-events-auto max-w-[60%] shadow-lg" onClick={interact} data-testid="mundo-interagir">
              {near.kind === 'actor' ? `Falar com ${near.actor.name}` : `Examinar ${near.object.label.replace(/^o |^a /, '')}`}
            </button>
          ) : (
            <p className="pointer-events-auto max-w-[55%] rounded-xl bg-surface/90 px-3 py-2 text-xs text-muted shadow">Toque num lugar para andar até ele, ou numa pessoa para conversar.</p>
          )}
        </div>
      )}
    </div>,
    document.body,
  );
}

/** Colegas olham para você quando chega perto; longe, olham para a frente. */
function npcFacing(a: WorldActor, you: Tile): Facing {
  const dx = you.x - a.at.x;
  const dy = you.y - a.at.y;
  if (Math.abs(dx) + Math.abs(dy) > 4) return 'baixo';
  if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? 'esquerda' : 'direita';
  return dy < 0 ? 'cima' : 'baixo';
}

function GoTo({ w, onGo }: { w: World; onGo: (p: Panel) => void }) {
  return (
    <section className="p-4" aria-label="Ir até">
      <h2 className="pr-8 text-base">Ir até</h2>
      <p className="text-xs text-muted">Escolha e o seu personagem anda até lá.</p>
      <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {w.actors.map((a) => (
          <li key={a.id}>
            <button className="btn-ghost w-full !justify-start text-left text-sm" onClick={() => onGo({ kind: 'actor', id: a.id })}>
              <Icon name="pessoa" size={16} /> {a.name}, {roomAt(w, a.at)?.name}
            </button>
          </li>
        ))}
        {w.objects.map((o) => (
          <li key={o.id}>
            <button className="btn-ghost w-full !justify-start text-left text-sm" onClick={() => onGo({ kind: 'object', id: o.id })}>
              <Icon name="tela" size={16} /> {o.label.replace(/^o |^a /, '').replace(/^./, (c) => c.toUpperCase())}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InteractionPanel({ w, s, st, setSt, panel, onRestart }: { w: World; s: Scenario; st: WorldState; setSt: (f: (x: WorldState) => WorldState) => void; panel: Panel; onRestart: () => void }) {
  if (st.closed)
    return (
      <div className="p-4 pr-12">
        <ScenarioClosing s={s} st={st.scenario} onRestart={onRestart} />
      </div>
    );
  if (!panel) return null;

  if (panel.kind === 'object') {
    const o = w.objects.find((x) => x.id === panel.id)!;
    const res = examine(w, s, st, o.id);
    const evs = s.evidence.filter((e) => o.evidenceIds.includes(e.id));
    return (
      <section className="p-4" aria-live="polite" data-testid="mundo-objeto">
        <p className="kicker">Examinando</p>
        <h2 className="mt-0.5 pr-8 text-lg first-letter:uppercase">{o.label}</h2>
        {!res.available ? (
          <p className="mt-2 text-sm">{o.locked}</p>
        ) : evs.length === 0 ? (
          <p className="mt-2 text-sm">{o.info}</p>
        ) : (
          <div className="mt-2 space-y-3">
            {evs.map((e) => (
              <div key={e.id}>
                <p className="text-sm font-semibold">{e.title}</p>
                <pre className="mt-1 whitespace-pre-wrap break-words rounded-md border border-line bg-ink/5 p-3 font-mono text-[0.78rem] leading-relaxed">{e.body}</pre>
                {e.hint && <p className="mt-1 text-sm text-muted">{e.hint}</p>}
              </div>
            ))}
            <p className="text-xs text-muted">Anotado no caderno.</p>
          </div>
        )}
        {o.id === 'terminal' && (
          <div className="mt-4 border-t border-line pt-3">
            <Link to="/laboratorio/processos-linux?origem=escritorio" className="btn-primary w-full">
              Investigar com comandos no terminal <Icon name="avancar" size={18} />
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-muted">Abra o laboratório, execute comandos Linux e volte ao mapa para concluir o chamado.</p>
          </div>
        )}
      </section>
    );
  }

  const a = w.actors.find((x) => x.id === panel.id)!;
  const t = talk(w, st, a.id);
  const node = s.nodes.find((n) => n.id === st.scenario.nodeId)!;
  const pend = st.scenario.pending && decisionOf(s, st.scenario.pending.nodeId, st.scenario.pending.decisionId);
  let body: JSX.Element;
  if (t.kind === 'conversa') {
    const who = w.actors.find((x) => x.id === w.nodeActor[st.scenario.nodeId]);
    body = <p className="mt-2">{who && who.id !== a.id && st.scenario.choices.length ? `${a.idle} Acho que ${who.name} está esperando por você.` : a.idle}</p>;
  } else if (t.kind === 'falta') {
    const labels = w.objects.filter((o) => t.objectIds.includes(o.id)).map((o) => o.label);
    body = <p className="mt-2">Antes de seguirmos, examine {labels.join(' e ')}. Depois volte aqui.</p>;
  } else if (node.terminal) {
    body = (
      <>
        <p className="mt-2">{node.dialogue}</p>
        <button className="btn-primary mt-3 w-full" onClick={() => setSt((x) => ({ ...x, closed: true, updatedAt: new Date().toISOString() }))} data-testid="mundo-fechar">
          Fechar o chamado <Icon name="avancar" size={18} />
        </button>
      </>
    );
  } else if (pend) {
    const goesBack = pend.nextNodeId === node.id;
    body = (
      <div className="mt-2" data-testid="mundo-retorno">
        <p className={`font-semibold ${pend.outcome === 'boa' ? 'text-ok' : pend.outcome === 'aceitavel' ? 'text-gold' : 'text-bad'}`}>
          {pend.outcome === 'boa' ? 'Boa decisão' : pend.outcome === 'aceitavel' ? 'Funciona, mas dá para fazer melhor' : 'Essa não resolve'}
        </p>
        <p className="mt-1">{pend.feedback}</p>
        <button className="btn-primary mt-3 w-full" onClick={() => setSt((x) => ({ ...x, scenario: advance(s, x.scenario), updatedAt: new Date().toISOString() }))}>
          {goesBack ? 'Tentar outra decisão' : 'Continuar'}
        </button>
      </div>
    );
  } else {
    body = (
      <>
        <p className="mt-2">{node.dialogue}</p>
        <div className="mt-3 space-y-2">
          {node.decisions!.map((d) => (
            <button key={d.id} className="btn-ghost w-full !justify-start text-left" onClick={() => setSt((x) => ({ ...x, scenario: choose(s, x.scenario, d.id), updatedAt: new Date().toISOString() }))}>
              {d.label}
            </button>
          ))}
        </div>
      </>
    );
  }
  return (
    <section className="p-4" aria-live="polite" data-testid="mundo-conversa">
      <div className="flex items-center gap-3 pr-8">
        <svg viewBox="0 0 48 48" className="h-14 w-14 shrink-0 rounded-full border border-line bg-raised" aria-hidden="true">
          <g transform="translate(0,6)">
            <Person look={a.look} facing="baixo" />
          </g>
        </svg>
        <p className="min-w-0">
          <span className="block font-title text-lg leading-tight">{a.name}</span>
          <span className="block text-xs text-muted">{a.role}</span>
        </p>
      </div>
      {body}
    </section>
  );
}

function Notebook({ s, w, st }: { s: Scenario; w: World; st: WorldState }) {
  const seen = new Set([...w.objects.filter((o) => st.examined.includes(o.id)).flatMap((o) => o.evidenceIds), ...(st.scenario.evidence ?? []).filter((e) => !w.objects.some((o) => o.evidenceIds.includes(e)))]);
  const evs = s.evidence.filter((e) => seen.has(e.id));
  return (
    <section className="p-4" aria-label="Caderno">
      <h2 className="pr-8 text-base">Caderno de investigação</h2>
      {evs.length === 0 ? (
        <p className="mt-1 text-sm text-muted">Vazio. Examine objetos e converse com as pessoas.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {evs.map((e) => (
            <li key={e.id}>
              <details>
                <summary className="cursor-pointer text-sm font-semibold">{e.title}</summary>
                <pre className="mt-1 whitespace-pre-wrap break-words rounded-md bg-ink/5 p-2 font-mono text-[0.75rem] leading-relaxed">{e.body}</pre>
              </details>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 border-t border-line pt-2 text-xs text-muted">
        Este caso aplica a aula{' '}
        {s.requires.map((r, i) => (
          <span key={r.sectionId}>
            {i > 0 && ', '}
            <Link to={`/aprender/${r.chapterId}/${r.sectionId}`} className="font-semibold text-gold underline">
              {r.label}
            </Link>
          </span>
        ))}
        .
      </p>
    </section>
  );
}

function DPad({ onStart, onStop }: { onStart: (d: Tile) => void; onStop: () => void }) {
  const b = 'grid h-12 w-12 place-items-center rounded-xl bg-surface/90 text-ink shadow active:bg-raised';
  const btn = (d: Tile, label: string, icon: JSX.Element) => (
    <button
      className={b}
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onStart(d);
      }}
      onPointerUp={onStop}
      onPointerLeave={onStop}
      onPointerCancel={onStop}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onStart(d)}
      onKeyUp={onStop}
      onContextMenu={(e) => e.preventDefault()}
    >
      {icon}
    </button>
  );
  return (
    <div className="pointer-events-auto grid shrink-0 grid-cols-3 gap-1" aria-label="Direcional">
      <span />
      {btn({ x: 0, y: -1 }, 'Andar para cima', <Icon name="voltar" size={18} className="rotate-90" />)}
      <span />
      {btn({ x: -1, y: 0 }, 'Andar para a esquerda', <Icon name="voltar" size={18} />)}
      <span />
      {btn({ x: 1, y: 0 }, 'Andar para a direita', <Icon name="seta" size={18} />)}
      <span />
      {btn({ x: 0, y: 1 }, 'Andar para baixo', <Icon name="seta" size={18} className="rotate-90" />)}
      <span />
    </div>
  );
}

/** Nome sobre a cabeça; quem tem algo para você agora ganha um balão. */
function NameTag({ name, highlight }: { name: string; highlight: boolean }) {
  const wpx = name.length * 6.4 + 12;
  return (
    <g transform={`translate(${T / 2},-14)`}>
      {highlight && (
        <g transform="translate(0,-24)" className="anim-bob">
          <path d="M-9 -10h18v13h-6l-3 5-3-5h-6z" fill="rgb(var(--gold))" />
          <path d="M0 -7v6M0 2.5v.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      <rect x={-wpx / 2} y={-8} width={wpx} height={14} rx={7} fill="rgb(27 26 23 / 0.72)" />
      <text y={2.5} textAnchor="middle" fontSize="10" fill="#F4F0E8" fontFamily="var(--font-text)">
        {name}
      </text>
    </g>
  );
}

/**
 * Pessoa vista de cima, em leve perspectiva, nas quatro direções: sombra, pernas e braços que
 * balançam ao andar, tronco que respira, cabeça com rosto (de frente), nuca (de costas) ou perfil.
 */
function Person({ look, facing, walking, you }: { look: WorldActor['look']; facing: Facing; walking?: boolean; you?: boolean }) {
  const side = facing === 'esquerda' || facing === 'direita';
  const back = facing === 'cima';
  const flip = facing === 'esquerda' ? -1 : 1;
  const hairBack =
    look.hairStyle === 'longo' ? (
      <path d="M-9 -33a9 9 0 0 1 18 0v12c-2 1.6-4 1.6-5 0v-6h-8v6c-1 1.6-3 1.6-5 0z" fill={look.hair} />
    ) : look.hairStyle === 'coque' ? (
      <>
        <path d="M-9 -33a9 9 0 0 1 18 0v2h-18z" fill={look.hair} />
        <circle cx="0" cy="-42" r="4" fill={look.hair} />
      </>
    ) : (
      <path d="M-9 -33a9 9 0 0 1 18 0c-3-2-6-2.8-9-2.8s-6 .8-9 2.8z" fill={look.hair} />
    );
  return (
    <g transform={`translate(${T / 2},${T - 5})`} className={walking ? 'person walking' : 'person'}>
      <ellipse cx="0" cy="0" rx="12" ry="3.8" fill="rgb(0 0 0 / 0.2)" />
      <g transform={`scale(${flip},1)`}>
        {/* Pernas: de lado, uma na frente da outra; de frente e de costas, lado a lado. */}
        {side ? (
          <>
            <rect className="leg leg-a" x="-4" y="-12" width="5" height="12" rx="2.5" fill="#2c2a27" />
            <rect className="leg leg-b" x="0" y="-12" width="5" height="12" rx="2.5" fill="#3a3733" />
          </>
        ) : (
          <>
            <rect className="leg leg-a" x="-6" y="-12" width="5" height="12" rx="2.5" fill="#2c2a27" />
            <rect className="leg leg-b" x="1" y="-12" width="5" height="12" rx="2.5" fill="#2c2a27" />
          </>
        )}
        <g className="torso">
          {/* Braços atrás do tronco quando de lado. */}
          {side && <rect className="arm arm-b" x="-1.5" y="-24" width="4.4" height="12" rx="2.2" fill={look.shirt} style={{ filter: 'brightness(0.85)' }} />}
          <path d={side ? 'M-7 -11c0-9 2-14 7-14s7 5 7 14z' : 'M-10.5 -11c0-9 3.5-14.5 10.5-14.5s10.5 5.5 10.5 14.5z'} fill={look.shirt} />
          {!side && !back && <path d="M-3.2 -25.3l3.2 4 3.2-4" fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1.3" strokeLinejoin="round" />}
          {side ? (
            <>
              <rect className="arm arm-a" x="-2" y="-24" width="4.4" height="12" rx="2.2" fill={look.shirt} />
              <circle className="arm arm-a" cx="0.2" cy="-11.5" r="2.2" fill={look.skin} />
            </>
          ) : (
            <>
              <rect className="arm arm-a" x="-13.2" y="-23" width="4.2" height="11" rx="2.1" fill={look.shirt} />
              <rect className="arm arm-b" x="9" y="-23" width="4.2" height="11" rx="2.1" fill={look.shirt} />
              <circle className="arm arm-a" cx="-11.1" cy="-11.5" r="2.2" fill={look.skin} />
              <circle className="arm arm-b" cx="11.1" cy="-11.5" r="2.2" fill={look.skin} />
            </>
          )}
          <rect x="-2.4" y="-28.5" width="4.8" height="4" fill={look.skin} />
          <circle cx="0" cy="-33" r="8.6" fill={look.skin} />
          {back ? (
            <path d="M-9 -33a9 9 0 0 1 18 0v4c-3 2-6 2.6-9 2.6s-6-.6-9-2.6z" fill={look.hair} />
          ) : (
            hairBack
          )}
          {!back && (side ? <circle cx="4.6" cy="-32.5" r="1.2" fill="#1b1a17" /> : (
            <>
              <circle cx="-3.2" cy="-32" r="1.2" fill="#1b1a17" />
              <circle cx="3.2" cy="-32" r="1.2" fill="#1b1a17" />
              <path d="M-2 -28.6c1.2.8 2.8.8 4 0" stroke="#1b1a17" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            </>
          ))}
        </g>
      </g>
      {you && <path d="M0 -50l-4 -6h8z" fill="rgb(var(--gold))" className="anim-bob" />}
    </g>
  );
}

/* ---------- Mapa ---------- */

type FloorKind = 'madeira' | 'piso' | 'carpete' | 'corredor' | 'tecnico';
const FLOOR: Record<string, { kind: FloorKind; a: string; b: string }> = {
  recepcao: { kind: 'madeira', a: '#d9b98e', b: '#cfae82' },
  copa: { kind: 'piso', a: '#ece6da', b: '#e0d8c9' },
  servidores: { kind: 'tecnico', a: '#c9ced3', b: '#b9bfc5' },
  corredor: { kind: 'corredor', a: '#e8e2d6', b: '#ddd6c8' },
  suporte: { kind: 'carpete', a: '#9fb2b8', b: '#94a8ae' },
  reuniao: { kind: 'madeira', a: '#c9a479', b: '#bf9a6f' },
  relatorios: { kind: 'carpete', a: '#b7ad98', b: '#ada38e' },
};

/** Planta do escritório: pisos por sala, paredes com espessura, janelas, portas e móveis. */
function MapArt({ w }: { w: World }) {
  const cells: JSX.Element[] = [];
  const H = w.grid.length;
  w.grid.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      const X = x * T;
      const Y = y * T;
      const k = `${x}-${y}`;
      if (ch === '#') {
        const below = w.grid[y + 1]?.[x];
        cells.push(<rect key={k} x={X} y={Y} width={T} height={T} fill="#4a443d" />);
        // Topo da parede (mais claro) e face voltada para o piso (quando há piso abaixo).
        cells.push(<rect key={`${k}t`} x={X} y={Y} width={T} height={T * 0.55} fill="#5d564d" />);
        if (below === '.') {
          cells.push(<rect key={`${k}f`} x={X} y={Y + T * 0.55} width={T} height={T * 0.45} fill="#e9e1d3" />);
          cells.push(<rect key={`${k}r`} x={X} y={Y + T - 4} width={T} height={4} fill="#b8ad9b" />);
          // Janelas na parede externa de cima.
          if (y === 0 && x % 3 === 1) cells.push(<Window key={`${k}w`} x={X} y={Y} />);
        }
        return;
      }
      const room = roomAt(w, { x, y });
      const f = FLOOR[room?.id ?? 'corredor'] ?? FLOOR.corredor;
      cells.push(<Floor key={k} x={X} y={Y} f={f} tx={x} ty={y} />);
      // Porta: piso no meio de uma parede.
      if ((w.grid[y]?.[x - 1] === '#' && w.grid[y]?.[x + 1] === '#') || (y > 0 && y < H - 1 && row[x - 1] === '#' && row[x + 1] === '#')) {
        cells.push(<rect key={`${k}d`} x={X + 2} y={Y + T / 2 - 2} width={T - 4} height={4} fill="#a07e58" opacity=".55" />);
      }
    }),
  );
  return (
    <g>
      {cells}
      {(w.decor ?? []).map((d, i) => (
        <DecorArt key={i} d={d} />
      ))}
      {w.rooms
        .filter((r) => r.id !== 'corredor')
        .map((r) => (
          <text key={r.id} x={((r.from.x + r.to.x + 1) / 2) * T} y={(r.to.y + 1) * T - 8} textAnchor="middle" fontSize="13" fontStyle="italic" fontFamily="var(--font-title)" fill="rgb(27 26 23 / 0.45)">
            {r.name}
          </text>
        ))}
    </g>
  );
}

function Floor({ x, y, f, tx, ty }: { x: number; y: number; f: { kind: FloorKind; a: string; b: string }; tx: number; ty: number }) {
  if (f.kind === 'madeira')
    return (
      <g>
        <rect x={x} y={y} width={T} height={T} fill={f.a} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={x} y={y + i * 12} width={T} height={12} fill={(i + tx) % 2 ? f.b : f.a} />
        ))}
        <path d={`M${x + ((ty * 17) % 40)} ${y}v12M${x + ((ty * 29 + 20) % 40)} ${y + 12}v12M${x + ((ty * 13 + 8) % 40)} ${y + 24}v12M${x + ((ty * 31 + 30) % 40)} ${y + 36}v12`} stroke="rgb(0 0 0 / 0.1)" />
      </g>
    );
  if (f.kind === 'piso' || f.kind === 'tecnico')
    return (
      <g>
        <rect x={x} y={y} width={T} height={T} fill={(tx + ty) % 2 ? f.a : f.b} />
        <rect x={x + 0.5} y={y + 0.5} width={T - 1} height={T - 1} fill="none" stroke="rgb(0 0 0 / 0.08)" />
        {f.kind === 'tecnico' && <circle cx={x + 4} cy={y + 4} r={1.2} fill="rgb(0 0 0 / 0.18)" />}
      </g>
    );
  if (f.kind === 'carpete')
    return (
      <g>
        <rect x={x} y={y} width={T} height={T} fill={f.a} />
        <path d={`M${x} ${y + 16}h${T}M${x} ${y + 32}h${T}`} stroke={f.b} strokeWidth="1.2" />
      </g>
    );
  return (
    <g>
      <rect x={x} y={y} width={T} height={T} fill={(tx + ty) % 2 ? f.a : f.b} />
    </g>
  );
}

function Window({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 4} y={y + 8} width={T * 2 - 8} height={T * 0.45} fill="#bcd6dc" />
      <path d={`M${x + T} ${y + 8}v${T * 0.45}M${x + 4} ${y + 8 + T * 0.22}h${T * 2 - 8}`} stroke="#f4f0e8" strokeWidth="2" />
      <path d={`M${x + 10} ${y + 12}l10 10`} stroke="#e8f2f4" strokeWidth="2" />
    </g>
  );
}

const WOOD = '#9a6b43';
const WOOD_L = '#b9875a';
const DARK = '#2b2f36';

function DecorArt({ d }: { d: Decor }) {
  const x = d.x * T;
  const y = d.y * T;
  const W = (d.w ?? 1) * T;
  const Hh = (d.h ?? 1) * T;
  switch (d.kind) {
    case 'balcao':
      return (
        <g>
          <rect x={x + 2} y={y + 10} width={W - 4} height={30} rx={4} fill={WOOD} />
          <rect x={x + 2} y={y + 10} width={W - 4} height={8} rx={3} fill={WOOD_L} />
          <rect x={x + 14} y={y + 20} width={18} height={14} fill="#fbf9f4" stroke="rgb(0 0 0 / 0.25)" />
          <path d={`M${x + 17} ${y + 25}h12M${x + 17} ${y + 29}h8`} stroke="#8a7f70" />
          <rect x={x + W - 34} y={y + 4} width={22} height={14} rx={2} fill="#1b1a17" />
          <rect x={x + W - 32} y={y + 6} width={18} height={9} fill="#30465a" />
        </g>
      );
    case 'sofa':
      return (
        <g>
          <rect x={x + 3} y={y + 6} width={W - 6} height={36} rx={8} fill="#2c5f6e" />
          <rect x={x + 3} y={y + 6} width={W - 6} height={12} rx={6} fill="#357183" />
          <rect x={x + 3} y={y + 14} width={9} height={28} rx={4} fill="#244f5c" />
          <rect x={x + W - 12} y={y + 14} width={9} height={28} rx={4} fill="#244f5c" />
          <path d={`M${x + W / 2} ${y + 20}v20`} stroke="#244f5c" strokeWidth="2" />
        </g>
      );
    case 'planta':
      return (
        <g>
          <path d={`M${x + 15} ${y + 32}h18l-3 12h-12z`} fill="#a65a3a" />
          <circle cx={x + 24} cy={y + 21} r={11} fill="#3e6b3a" />
          <circle cx={x + 16} cy={y + 26} r={7} fill="#4f8048" />
          <circle cx={x + 32} cy={y + 26} r={7} fill="#355f33" />
          <circle cx={x + 24} cy={y + 13} r={6} fill="#5a8f52" />
        </g>
      );
    case 'bebedouro':
      return (
        <g>
          <rect x={x + 14} y={y + 20} width={20} height={24} rx={3} fill="#e9e3d8" stroke="rgb(0 0 0 / 0.2)" />
          <rect x={x + 16} y={y + 4} width={16} height={18} rx={6} fill="#a8d0dc" stroke="rgb(0 0 0 / 0.15)" />
          <circle cx={x + 24} cy={y + 30} r={2} fill="#c8402a" />
        </g>
      );
    case 'tapete':
      return (
        <g>
          <rect x={x + 6} y={y + 6} width={W - 12} height={Hh - 12} rx={4} fill="#c8402a" opacity=".85" />
          <rect x={x + 12} y={y + 12} width={W - 24} height={Hh - 24} rx={3} fill="none" stroke="#f4f0e8" strokeWidth="2" opacity=".7" />
        </g>
      );
    case 'rack':
      return (
        <g>
          <rect x={x + 5} y={y + 3} width={T - 10} height={T - 4} rx={3} fill={DARK} />
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x={x + 9} y={y + 7 + r * 7.6} width={T - 18} height={5.4} fill="#3a4049" />
              <circle cx={x + T - 13} cy={y + 9.7 + r * 7.6} r={1.5} fill={r % 2 ? '#7bd88f' : '#e8b13b'} className={(r + d.x) % 3 === 0 ? 'anim-twinkle' : undefined} />
              <circle cx={x + T - 18} cy={y + 9.7 + r * 7.6} r={1.2} fill="#7bd88f" />
            </g>
          ))}
        </g>
      );
    case 'console':
      return (
        <g>
          <rect x={x + 2} y={y + 18} width={W - 4} height={26} rx={3} fill="#6b5a48" />
          <rect x={x + 2} y={y + 18} width={W - 4} height={6} rx={2} fill="#7d6a56" />
          <rect x={x + W / 2 - 22} y={y + 2} width={44} height={22} rx={2} fill="#1b1a17" />
          <path d={`M${x + W / 2 - 17} ${y + 9}h16M${x + W / 2 - 17} ${y + 13}h26M${x + W / 2 - 17} ${y + 17}h11`} stroke="#7bd88f" strokeWidth="1.5" />
          <rect x={x + W / 2 - 16} y={y + 30} width={32} height={7} rx={1.5} fill="#e9e3d8" />
        </g>
      );
    case 'arcond':
      return (
        <g>
          <rect x={x + 4} y={y + 4} width={T - 8} height={18} rx={4} fill="#f4f0e8" stroke="rgb(0 0 0 / 0.2)" />
          <path d={`M${x + 9} ${y + 16}h${T - 18}`} stroke="#9aa4ad" strokeWidth="2" />
          <path d={`M${x + 14} ${y + 26}q4 4 0 8M${x + 24} ${y + 26}q4 4 0 8M${x + 34} ${y + 26}q4 4 0 8`} stroke="#a8d0dc" strokeWidth="1.6" fill="none" className="anim-twinkle" />
        </g>
      );
    case 'nobreak':
      return (
        <g>
          <rect x={x + 10} y={y + 8} width={28} height={34} rx={3} fill="#3a3733" />
          <rect x={x + 14} y={y + 12} width={20} height={8} rx={1} fill="#1b1a17" />
          <path d={`M${x + 17} ${y + 16}h9`} stroke="#7bd88f" strokeWidth="2" />
          <circle cx={x + 24} cy={y + 32} r={3} fill="#7bd88f" />
        </g>
      );
    case 'mesa':
      return (
        <g>
          <rect x={x + 2} y={y + 8} width={W - 4} height={30} rx={3} fill="#c8a57c" />
          <rect x={x + 2} y={y + 8} width={W - 4} height={5} rx={2} fill="#d8b98f" />
          <rect x={x + W / 2 - 16} y={y} width={32} height={18} rx={2} fill="#1b1a17" />
          <rect x={x + W / 2 - 13} y={y + 2.5} width={26} height={12} fill={d.x % 2 ? '#30465a' : '#3b5a46'} />
          <rect x={x + W / 2 - 14} y={y + 24} width={28} height={6} rx={1.5} fill="#e9e3d8" />
          <rect x={x + 8} y={y + 22} width={10} height={12} rx={1} fill="#fbf9f4" stroke="rgb(0 0 0 / 0.15)" />
          <circle cx={x + W - 12} cy={y + 28} r={4} fill="#f4f0e8" stroke="rgb(0 0 0 / 0.2)" />
        </g>
      );
    case 'mesaGrande':
      return (
        <g>
          <rect x={x + 4} y={y + 6} width={W - 8} height={Hh - 12} rx={14} fill="#8a5d3a" />
          <rect x={x + 10} y={y + 12} width={W - 20} height={Hh - 24} rx={10} fill="#9a6b43" />
          <rect x={x + W / 2 - 10} y={y + Hh / 2 - 7} width={20} height={14} rx={2} fill="#fbf9f4" />
          <circle cx={x + 26} cy={y + Hh / 2} r={4} fill="#f4f0e8" />
        </g>
      );
    case 'cadeira':
      return (
        <g transform={d.v ? `translate(${x + T},${y}) scale(-1,1)` : `translate(${x},${y})`}>
          <rect x={12} y={14} width={22} height={20} rx={5} fill="#3a3733" />
          <rect x={10} y={10} width={26} height={8} rx={4} fill="#4a4640" />
        </g>
      );
    case 'quadro':
      return (
        <g>
          <rect x={x + 3} y={y + 2} width={W - 6} height={22} rx={2} fill="#fbf9f4" stroke="#8a7f70" strokeWidth="1.5" />
          <rect x={x + 7} y={y + 6} width={10} height={7} fill="#e8b13b" />
          <rect x={x + 20} y={y + 6} width={10} height={7} fill="#a8d0dc" />
          {W > T && <rect x={x + 34} y={y + 10} width={10} height={7} fill="#e8b13b" />}
          {W > T && <rect x={x + 52} y={y + 6} width={10} height={7} fill="#c8402a" />}
          <path d={`M${x + 7} ${y + 18}h${W - 20}`} stroke="#8a7f70" />
        </g>
      );
    case 'tv':
      return (
        <g>
          <rect x={x + 6} y={y + 4} width={W - 12} height={20} rx={2} fill="#1b1a17" />
          <rect x={x + 9} y={y + 6.5} width={W - 18} height={15} fill="#30465a" />
          <path d={`M${x + 14} ${y + 18}l10-6 8 4 10-7`} stroke="#e8b13b" strokeWidth="1.6" fill="none" />
        </g>
      );
    case 'impressora':
      return (
        <g>
          <rect x={x + 6} y={y + 14} width={36} height={24} rx={3} fill="#e9e3d8" stroke="rgb(0 0 0 / 0.25)" />
          <rect x={x + 12} y={y + 6} width={24} height={10} fill="#fbf9f4" stroke="rgb(0 0 0 / 0.2)" />
          <rect x={x + 10} y={y + 30} width={28} height={3} fill="#3a3733" />
          <circle cx={x + 36} cy={y + 20} r={1.8} fill="#7bd88f" />
        </g>
      );
    case 'armario':
      return (
        <g>
          <rect x={x + 3} y={y + 4} width={W - 6} height={36} rx={2} fill="#8a7f70" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={x + 6 + i * ((W - 12) / 3)} y={y + 8} width={(W - 12) / 3 - 3} height={28} fill="#9d9282" />
              <rect x={x + 6 + i * ((W - 12) / 3) + ((W - 12) / 3 - 3) / 2 - 4} y={y + 14} width={8} height={2} fill="#5d564d" />
            </g>
          ))}
        </g>
      );
    case 'geladeira':
      return (
        <g>
          <rect x={x + 8} y={y + 2} width={32} height={42} rx={4} fill="#f4f0e8" stroke="rgb(0 0 0 / 0.25)" />
          <path d={`M${x + 8} ${y + 18}h32`} stroke="rgb(0 0 0 / 0.25)" />
          <rect x={x + 34} y={y + 8} width={2.4} height={7} rx={1} fill="#8a7f70" />
          <rect x={x + 34} y={y + 23} width={2.4} height={10} rx={1} fill="#8a7f70" />
          <rect x={x + 14} y={y + 24} width={8} height={6} fill="#e8b13b" />
        </g>
      );
    case 'bancada':
      return (
        <g>
          <rect x={x + 2} y={y + 8} width={W - 4} height={28} rx={3} fill="#e9e3d8" stroke="rgb(0 0 0 / 0.18)" />
          <rect x={x + 8} y={y + 10} width={20} height={20} rx={3} fill="#3a3733" />
          <rect x={x + 12} y={y + 18} width={12} height={10} rx={2} fill="#6b4a2f" />
          <rect x={x + 40} y={y + 14} width={22} height={14} rx={7} fill="#cfd6db" stroke="rgb(0 0 0 / 0.15)" />
          <circle cx={x + W - 22} cy={y + 20} r={5} fill="#fbf9f4" stroke="rgb(0 0 0 / 0.2)" />
          <circle cx={x + W - 12} cy={y + 24} r={4} fill="#fbf9f4" stroke="rgb(0 0 0 / 0.2)" />
        </g>
      );
    case 'mesaCafe':
      return (
        <g>
          <ellipse cx={x + W / 2} cy={y + T / 2 + 2} rx={W / 2 - 6} ry={16} fill="#b9875a" />
          <ellipse cx={x + W / 2} cy={y + T / 2} rx={W / 2 - 10} ry={12} fill="#c99a6b" />
          <circle cx={x + W / 2 - 10} cy={y + T / 2} r={4} fill="#fbf9f4" />
          <circle cx={x + W / 2 + 12} cy={y + T / 2 - 2} r={4} fill="#fbf9f4" />
        </g>
      );
    case 'janela':
      return <Window x={x} y={y} />;
  }
}

/** Casas de móveis (para quem quiser saber o que ocupa uma casa). */
export const decorAt = (w: World, t: Tile) => (w.decor ?? []).find((d) => decorTiles(d).some((x) => same(x, t)));
