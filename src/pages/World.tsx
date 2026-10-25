// Escritório 2D (pacote v4, etapa 2): o estudante anda pelo mapa (setas/WASD, toque no destino ou
// direcional na tela), conversa com colegas e examina objetos para resolver uma situação de trabalho.
// Opcional: não mexe no checkpoint da trilha. Posição e escolhas ficam salvas neste aparelho.
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as RMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { getScenario } from '@/content';
import { escritorio } from '@/content/world/escritorio';
import { advance, choose, decisionOf, startScenario, type Scenario } from '@/lib/scenario';
import {
  adjacentInteractable,
  currentObjective,
  examine,
  findPath,
  occupied,
  pathNextTo,
  restoreWorld,
  roomAt,
  same,
  talk,
  walkable,
  type Tile,
  type World,
  type WorldActor,
  type WorldState,
} from '@/lib/world';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { ScenarioClosing } from './Scenarios';

const T = 32;
const KEY = (id: string) => `cronicas:mundo:${id}`;
const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function load(w: World, s: Scenario): WorldState | undefined {
  try {
    return restoreWorld(w, s, JSON.parse(localStorage.getItem(KEY(w.id)) ?? 'null') ?? undefined);
  } catch {
    return undefined;
  }
}
const fresh = (w: World, s: Scenario): WorldState => ({ worldId: w.id, version: w.version, pos: w.start, facing: 'direita', examined: [], scenario: startScenario(s), updatedAt: new Date().toISOString() });

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

function WorldPlay({ w, s }: { w: World; s: Scenario }) {
  const [st, setSt] = useState<WorldState>(() => load(w, s) ?? fresh(w, s));
  const [path, setPath] = useState<Tile[]>([]);
  const [after, setAfter] = useState<Panel>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const width = w.grid[0].length;
  const height = w.grid.length;
  // Em tela estreita, uma câmera acompanha o personagem (casas maiores, toque mais preciso).
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 400));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const view = narrow ? { w: 9, h: 8 } : { w: width, h: height };
  const cam = {
    x: Math.max(0, Math.min(width - view.w, st.pos.x - Math.floor(view.w / 2))),
    y: Math.max(0, Math.min(height - view.h, st.pos.y - Math.floor(view.h / 2))),
  };
  const occ = useMemo(() => occupied(w), [w]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY(w.id), JSON.stringify(st));
    } catch {
      /* sem armazenamento: o mapa continua, só não retoma */
    }
  }, [st, w.id]);

  const stepTo = useCallback((t: Tile) => {
    setSt((cur) => ({ ...cur, pos: t, facing: t.x < cur.pos.x ? 'esquerda' : t.x > cur.pos.x ? 'direita' : cur.facing, updatedAt: new Date().toISOString() }));
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
      setPath((p) => p.slice(1));
    }, 150);
    return () => window.clearTimeout(id);
  }, [path, after, stepTo]);

  const goNextTo = useCallback(
    (target: Panel) => {
      if (!target) return;
      const tiles = target.kind === 'actor' ? [w.actors.find((a) => a.id === target.id)!.at] : w.objects.find((o) => o.id === target.id)!.tiles;
      const p = pathNextTo(w, st.pos, tiles);
      if (p === null) return;
      setPanel(null);
      setAfter(target);
      setPath(p);
    },
    [w, st.pos],
  );

  // Abrir um objeto já disponível o anota no caderno (o exame acontece aqui, fora da renderização).
  useEffect(() => {
    if (panel?.kind === 'object') setSt((cur) => examine(w, s, cur, panel.id).state);
  }, [panel, w, s]);
  // No celular a conversa fica abaixo do mapa: ao abrir, ela entra na tela.
  useEffect(() => {
    if (panel && narrow) panelRef.current?.scrollIntoView?.({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
  }, [panel, narrow]);

  const near = adjacentInteractable(w, st.pos);
  const interact = useCallback(() => {
    if (!near) return;
    setPanel(near.kind === 'actor' ? { kind: 'actor', id: near.actor.id } : { kind: 'object', id: near.object.id });
  }, [near]);

  // Teclado: setas ou WASD andam uma casa; Enter, E ou espaço interagem.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const d: Record<string, Tile> = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 } };
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (d[k]) {
        e.preventDefault();
        setPath([]);
        setAfter(null);
        const t = { x: st.pos.x + d[k].x, y: st.pos.y + d[k].y };
        if (walkable(w, t, occ)) {
          stepTo(t);
          setPanel(null);
        } else setSt((cur) => ({ ...cur, facing: d[k].x < 0 ? 'esquerda' : d[k].x > 0 ? 'direita' : cur.facing }));
      } else if ((k === 'Enter' || k === 'e' || k === ' ') && (e.target as HTMLElement | null)?.tagName !== 'BUTTON') {
        if (near) {
          e.preventDefault();
          interact();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [st.pos, w, occ, near, interact, stepTo]);

  const move = (d: Tile) => {
    setPath([]);
    setAfter(null);
    const t = { x: st.pos.x + d.x, y: st.pos.y + d.y };
    if (walkable(w, t, occ)) {
      stepTo(t);
      setPanel(null);
    }
  };

  // Toque ou clique no mapa: anda até a casa; em pessoa ou objeto, anda até o lado e interage.
  const onMapClick = (e: RMouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = svg.getScreenCTM();
    if (!m) return;
    const p = pt.matrixTransform(m.inverse());
    const t = { x: Math.floor(p.x / T) + cam.x, y: Math.floor(p.y / T) + cam.y };
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
  const needObjects = talk(w, st, nodeActor).kind === 'falta' ? (talk(w, st, nodeActor) as { objectIds: string[] }).objectIds : [];
  const room = roomAt(w, st.pos);
  const objective = currentObjective(w, st);

  return (
    <div className="space-y-4">
      <PageHeader area="explorar" title="Escritório de TI" subtitle="Ande pelo escritório, converse com a equipe e resolva um chamado. Prática opcional: não muda o seu ponto na trilha." />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <p>
              <span className="kicker">Objetivo</span> <b data-testid="mundo-objetivo">{objective}</b>
            </p>
            <span className="shrink-0 text-muted">{room?.name}</span>
          </div>

          <div className="card overflow-hidden p-0" ref={boxRef}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${view.w * T} ${view.h * T}`}
              className="block h-auto w-full cursor-pointer touch-manipulation select-none"
              role="application"
              aria-label="Mapa do escritório. Use as setas para andar e Enter para falar ou examinar."
              onClick={onMapClick}
              data-testid="mundo-mapa"
              data-cam={`${cam.x},${cam.y},${view.w}`}
            >
              <g style={{ transform: `translate(${-cam.x * T}px, ${-cam.y * T}px)`, transition: reduced() ? undefined : 'transform 200ms ease-out' }}>
              <MapArt w={w} />
              {w.objects.map((o) =>
                needObjects.includes(o.id) ? (
                  <g key={o.id} transform={`translate(${o.tiles[0].x * T + T / 2},${o.tiles[0].y * T - 4})`}>
                    <circle r="5" fill="rgb(var(--gold))" className="anim-twinkle" />
                  </g>
                ) : null,
              )}
              {w.actors.map((a) => (
                <g key={a.id} transform={`translate(${a.at.x * T},${a.at.y * T})`}>
                  <Person look={a.look} facing={a.at.x > st.pos.x ? 'esquerda' : 'direita'} />
                  {nodeActor === a.id && !st.closed && needObjects.length === 0 && <Bubble />}
                </g>
              ))}
              <g style={{ transform: `translate(${st.pos.x * T}px, ${st.pos.y * T}px)`, transition: reduced() ? undefined : 'transform 150ms linear' }} data-testid="mundo-voce">
                <Person look={{ shirt: '#1b1a17', hair: '#3b2a1e', skin: '#d9a77c', hairStyle: 'curto' }} facing={st.facing} walking={path.length > 0} you />
              </g>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <DPad onMove={move} />
            <div className="min-w-0 flex-1 space-y-2">
              {near ? (
                <button className="btn-primary w-full" onClick={interact} data-testid="mundo-interagir">
                  {near.kind === 'actor' ? `Falar com ${near.actor.name}` : `Examinar ${near.object.label}`}
                </button>
              ) : (
                <p className="text-sm text-muted">Chegue perto de alguém ou de um objeto para interagir. No mapa, toque no destino.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div ref={panelRef} className="scroll-mt-20">
            <InteractionPanel w={w} s={s} st={st} setSt={setSt} panel={panel} onRestart={() => { setSt(fresh(w, s)); setPanel(null); setPath([]); }} />
          </div>

          <section className="card p-4" aria-label="Ir até">
            <h2 className="text-base">Ir até</h2>
            <p className="text-xs text-muted">Alternativa ao mapa: escolha e o seu personagem anda até lá.</p>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
              {w.actors.map((a) => (
                <li key={a.id}>
                  <button className="btn-ghost w-full !justify-start text-left text-sm" onClick={() => goNextTo({ kind: 'actor', id: a.id })}>
                    <Icon name="pessoa" size={16} /> {a.name}, {roomAt(w, a.at)?.name}
                  </button>
                </li>
              ))}
              {w.objects.map((o) => (
                <li key={o.id}>
                  <button className="btn-ghost w-full !justify-start text-left text-sm" onClick={() => goNextTo({ kind: 'object', id: o.id })}>
                    <Icon name="tela" size={16} /> {o.label.replace(/^o /, '').replace(/^./, (c) => c.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <Notebook s={s} w={w} st={st} />
        </div>
      </div>
    </div>
  );
}

function InteractionPanel({ w, s, st, setSt, panel, onRestart }: { w: World; s: Scenario; st: WorldState; setSt: (f: (x: WorldState) => WorldState) => void; panel: Panel; onRestart: () => void }) {
  if (st.closed) return <ScenarioClosing s={s} st={st.scenario} onRestart={onRestart} />;
  if (!panel)
    return (
      <section className="card p-4" aria-live="polite">
        <p className="kicker">Conversa</p>
        <p className="mt-1 text-sm text-muted">Ninguém falando agora. Siga o objetivo acima.</p>
      </section>
    );

  if (panel.kind === 'object') {
    const o = w.objects.find((x) => x.id === panel.id)!;
    const res = examine(w, s, st, o.id);
    const evs = s.evidence.filter((e) => o.evidenceIds.includes(e.id));
    return (
      <section className="card p-4" aria-live="polite" data-testid="mundo-objeto">
        <p className="kicker">Examinando</p>
        <h2 className="mt-0.5 text-lg first-letter:uppercase">{o.label}</h2>
        {!res.available ? (
          <p className="mt-2 text-sm">{o.locked}</p>
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
    <section className="card p-4" aria-live="polite" data-testid="mundo-conversa">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="h-12 w-12 shrink-0 rounded-full border border-line bg-raised" aria-hidden="true">
          <g transform="translate(0,4)">
            <Person look={a.look} facing="direita" />
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
    <section className="card p-4" aria-label="Caderno">
      <h2 className="text-base">Caderno de investigação</h2>
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
    </section>
  );
}

function DPad({ onMove }: { onMove: (d: Tile) => void }) {
  const b = 'grid h-11 w-11 place-items-center rounded-md border border-ink/20 bg-surface text-ink active:bg-ink/10';
  return (
    <div className="grid shrink-0 grid-cols-3 gap-1" aria-label="Direcional">
      <span />
      <button className={b} aria-label="Andar para cima" onClick={() => onMove({ x: 0, y: -1 })}>
        <Icon name="voltar" size={18} className="rotate-90" />
      </button>
      <span />
      <button className={b} aria-label="Andar para a esquerda" onClick={() => onMove({ x: -1, y: 0 })}>
        <Icon name="voltar" size={18} />
      </button>
      <span />
      <button className={b} aria-label="Andar para a direita" onClick={() => onMove({ x: 1, y: 0 })}>
        <Icon name="seta" size={18} />
      </button>
      <span />
      <button className={b} aria-label="Andar para baixo" onClick={() => onMove({ x: 0, y: 1 })}>
        <Icon name="seta" size={18} className="rotate-90" />
      </button>
      <span />
    </div>
  );
}

/** Balão de aviso: esta pessoa tem algo para você agora. */
function Bubble() {
  return (
    <g transform={`translate(${T / 2},-14)`} className="anim-bob">
      <path d="M-7 -8h14v10h-5l-2 4-2-4h-5z" fill="rgb(var(--gold))" />
      <path d="M0 -6v4M0 0v.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Pessoa vista de cima, de leve perspectiva: sombra, pernas que andam, tronco, braços, cabeça e cabelo. */
function Person({ look, facing, walking, you }: { look: WorldActor['look']; facing: 'esquerda' | 'direita'; walking?: boolean; you?: boolean }) {
  const hair =
    look.hairStyle === 'coque' ? (
      <>
        <path d="M-6.8 -26a6.8 6.8 0 0 1 13.6 0v1.5h-13.6z" fill={look.hair} />
        <circle cx="-4.5" cy="-31.5" r="3" fill={look.hair} />
      </>
    ) : look.hairStyle === 'longo' ? (
      <path d="M-7 -25a7 7 0 0 1 14 0v7c-1.5 1-3 1-3.5 0v-6h-7.5v6c-.6 1-2 1-3 0z" fill={look.hair} />
    ) : (
      <path d="M-6.8 -25.5a6.8 6.8 0 0 1 13.6 0c-2 -1.6-4-2.2-6.8-2.2s-4.8.6-6.8 2.2z M-6.8 -25.5v-1h13.6v1" fill={look.hair} />
    );
  return (
    <g transform={`translate(${T / 2},${T - 3}) scale(${facing === 'esquerda' ? -1 : 1},1)`} className={walking ? 'person walking' : 'person'}>
      <ellipse cx="0" cy="0" rx="9" ry="2.8" fill="rgb(0 0 0 / 0.16)" />
      <rect className="leg leg-a" x="-4.6" y="-9" width="3.8" height="9" rx="1.9" fill="#2c2a27" />
      <rect className="leg leg-b" x="0.8" y="-9" width="3.8" height="9" rx="1.9" fill="#2c2a27" />
      <g className="torso">
        <path d="M-8 -8.5c0-7 2.5-11 8-11s8 4 8 11z" fill={look.shirt} />
        <path d="M-2.4 -19.2l2.4 3 2.4-3" fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1.1" strokeLinejoin="round" />
        <rect x="-10" y="-17.5" width="3.2" height="8.5" rx="1.6" fill={look.shirt} />
        <rect x="6.8" y="-17.5" width="3.2" height="8.5" rx="1.6" fill={look.shirt} />
        <circle cx="-8.4" cy="-8.4" r="1.7" fill={look.skin} />
        <circle cx="8.4" cy="-8.4" r="1.7" fill={look.skin} />
        <rect x="-1.8" y="-21.5" width="3.6" height="3" fill={look.skin} />
        <circle cx="0" cy="-25" r="6.6" fill={look.skin} />
        <circle cx="3.1" cy="-24.6" r="0.9" fill="#1b1a17" />
        {hair}
      </g>
      {you && <circle cx="0" cy="-37" r="2.6" fill="rgb(var(--gold))" />}
    </g>
  );
}

const ROOM_TONE: Record<string, string> = {
  recepcao: 'var(--area-hoje)',
  servidores: 'var(--teal)',
  corredor: 'var(--line)',
  suporte: 'var(--gold)',
  relatorios: 'var(--ok)',
};

/** Planta do escritório: piso por sala, paredes e móveis desenhados. */
function MapArt({ w }: { w: World }) {
  const cells: JSX.Element[] = [];
  w.grid.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      const X = x * T;
      const Y = y * T;
      const k = `${x}-${y}`;
      if (ch === '#') {
        cells.push(<rect key={k} x={X} y={Y} width={T} height={T} fill="rgb(var(--ink) / 0.16)" />);
        if (w.grid[y + 1]?.[x] !== '#' && y + 1 < w.grid.length) cells.push(<rect key={`${k}e`} x={X} y={Y + T - 5} width={T} height={5} fill="rgb(var(--ink) / 0.32)" />);
        return;
      }
      const room = roomAt(w, { x, y });
      cells.push(<rect key={k} x={X} y={Y} width={T} height={T} fill="rgb(var(--surface))" />);
      cells.push(<rect key={`${k}t`} x={X} y={Y} width={T} height={T} fill={`rgb(${ROOM_TONE[room?.id ?? 'corredor']} / 0.1)`} stroke="rgb(var(--ink) / 0.05)" />);
      if (ch === 'B') cells.push(<Counter key={`${k}f`} x={X} y={Y} first={row[x - 1] !== 'B'} />);
      if (ch === 'R') cells.push(<Rack key={`${k}f`} x={X} y={Y} i={x} />);
      if (ch === 'T') cells.push(<Console key={`${k}f`} x={X} y={Y} />);
      if (ch === 'D') cells.push(<Desk key={`${k}f`} x={X} y={Y} />);
      if (ch === 'P') cells.push(<Plant key={`${k}f`} x={X} y={Y} />);
    }),
  );
  return (
    <g>
      {cells}
      {w.rooms
        .filter((r) => r.id !== 'corredor')
        .map((r) => (
          <text key={r.id} x={(r.label ?? r.from).x * T + 3} y={(r.label ?? r.from).y * T + T - 6} fontSize="9" fontStyle="italic" fontFamily="var(--font-title)" fill="rgb(var(--ink) / 0.6)">
            {r.name}
          </text>
        ))}
    </g>
  );
}

function Counter({ x, y, first }: { x: number; y: number; first: boolean }) {
  return (
    <g>
      <rect x={x + (first ? 3 : 0)} y={y + 8} width={T - (first ? 3 : 0)} height={18} rx={first ? 3 : 0} fill="#9a6b43" />
      <rect x={x + (first ? 3 : 0)} y={y + 8} width={T - (first ? 3 : 0)} height={4} fill="#b9875a" />
      {first && <rect x={x + 10} y={y + 13} width={12} height={9} fill="#fbf9f4" stroke="#1b1a17" strokeOpacity=".3" />}
    </g>
  );
}

function Rack({ x, y, i }: { x: number; y: number; i: number }) {
  return (
    <g>
      <rect x={x + 3} y={y + 2} width={T - 6} height={T - 4} rx={2} fill="#2b2f36" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={x + 6} y={y + 6 + r * 6} width={T - 12} height={4} fill="#3a4049" />
          <circle cx={x + T - 8} cy={y + 8 + r * 6} r={1.2} fill={r % 2 ? '#7bd88f' : '#e8b13b'} className={(r + i) % 3 === 0 ? 'anim-twinkle' : undefined} />
        </g>
      ))}
    </g>
  );
}

function Console({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 4} y={y + 18} width={T - 8} height={10} rx={2} fill="#6b5a48" />
      <rect x={x + 5} y={y + 3} width={T - 10} height={15} rx={2} fill="#1b1a17" />
      <path d={`M${x + 8} ${y + 8}h10M${x + 8} ${y + 11}h14M${x + 8} ${y + 14}h7`} stroke="#7bd88f" strokeWidth={1.2} />
    </g>
  );
}

function Desk({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y + 6} width={T} height={20} fill="#b58b62" />
      <rect x={x} y={y + 6} width={T} height={3} fill="#c9a079" />
      <rect x={x + 8} y={y + 1} width={16} height={11} rx={1.5} fill="#1b1a17" />
      <rect x={x + 10} y={y + 3} width={12} height={7} fill="#30465a" />
      <rect x={x + 9} y={y + 16} width={14} height={4} rx={1} fill="#e9e3d8" />
    </g>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x + 10} ${y + 22}h12l-2 8h-8z`} fill="#a65a3a" />
      <circle cx={x + 16} cy={y + 15} r={7} fill="#3e6b3a" />
      <circle cx={x + 11} cy={y + 18} r={5} fill="#4f8048" />
      <circle cx={x + 21} cy={y + 18} r={5} fill="#355f33" />
    </g>
  );
}

