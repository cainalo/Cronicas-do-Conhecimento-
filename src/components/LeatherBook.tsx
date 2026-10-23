// Livro de couro com páginas de pergaminho que viram de verdade. No celular, uma página por vez: a
// dobra corre da direita para a esquerda e mostra o verso (com a tinta da frente vista por trás). Em
// tela larga e deitada, o livro abre em duas páginas (códice): a folha da direita gira sobre a lombada
// e o verso dela vira a próxima página da esquerda, como num livro de verdade. Arrastar, tocar nas
// bordas, usar os botões ou as setas do teclado vira a página.
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { useFx } from '@/app/fx';
import { Icon } from '@/components/Icon';

export const reducedMotion = () => import.meta.env.MODE === 'test' || (typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

const FLIP_MS = 700;

/** Duas páginas lado a lado: tela de pelo menos 1024 px, deitada. */
export function useSpread(): boolean {
  const q = '(min-width: 1024px) and (orientation: landscape)';
  const get = () => import.meta.env.MODE !== 'test' && typeof window !== 'undefined' && !!window.matchMedia?.(q).matches;
  const [on, setOn] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia?.(q);
    if (!mq) return;
    const f = () => setOn(get());
    mq.addEventListener?.('change', f);
    return () => mq.removeEventListener?.('change', f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return on;
}

/** Páginas visíveis a partir da página atual (no códice, a dupla começa numa página par). */
export const visiblePages = (page: number, total: number, spread: boolean) => (spread ? [page - (page % 2), page - (page % 2) + 1].filter((p) => p < total) : [page]);

/** Uma folha de pergaminho: moldura da página com cabeçalho e número do fólio. */
export function Leaf({ head, folio, children }: { head?: ReactNode; folio?: ReactNode; children: ReactNode }) {
  return (
    <div className="absolute inset-0">
      <div className="book-page manuscript parchment-aged flex h-full flex-col overflow-hidden px-5 pb-2 pt-3">
        {head && <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[rgb(var(--line)/0.35)] pb-1 text-[0.68rem] tracking-wide text-muted">{head}</div>}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3 [scrollbar-width:none]">{children}</div>
        {folio !== undefined && <div className="shrink-0 text-center font-logo text-[0.7rem] text-muted">{folio}</div>}
      </div>
    </div>
  );
}

interface Props {
  page: number;
  total: number;
  onPage: (p: number) => void;
  render: (i: number) => ReactNode;
  /** Botão do lugar de "Virar" na última página. */
  last?: ReactNode;
  /** Algo ocupa a área do livro (medidor invisível, referência de altura). */
  overlay?: ReactNode;
  nextLabel?: string;
  /** Duas páginas lado a lado (o chamador decide com useSpread). */
  spread?: boolean;
}

export function LeatherBook({ page, total, onPage, render, last, overlay, nextLabel = 'Virar', spread = false }: Props) {
  const { sfx } = useFx();
  const [flip, setFlip] = useState<{ from: number; to: number; dir: 1 | -1 } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const step = spread ? 2 : 1;
  const base = spread ? page - (page % 2) : page;

  const go = (raw: number) => {
    const to = spread ? raw - (((raw % 2) + 2) % 2) : raw;
    if (to < 0 || to >= total || to === base || flip) return;
    const dir = to > base ? 1 : -1;
    if (reducedMotion() || Math.abs(to - base) > step) {
      onPage(to);
      return;
    }
    sfx('tap');
    setFlip({ from: base, to, dir });
    window.setTimeout(() => {
      onPage(to);
      setFlip(null);
    }, FLIP_MS);
  };

  const onDown = (e: RPointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: RPointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    if ((e.target as HTMLElement).closest('button, a, input, summary, details, pre, .table-wrap')) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) return go(dx < 0 ? base + step : base - step);
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    if (x > (spread ? 0.85 : 0.72)) go(base + step);
    else if (x < (spread ? 0.15 : 0.28)) go(base - step);
  };

  // Setas do teclado viram a página (fora de campos de texto).
  const goRef = useRef(go);
  goRef.current = go;
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowRight') goRef.current(base + step);
      else if (e.key === 'ArrowLeft') goRef.current(base - step);
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [base, step]);

  // Folha que gira: frente é a página que sai (ou que volta), verso é o pergaminho do outro lado.
  const turning = flip && (flip.dir === 1 ? flip.from : flip.to);
  const under = flip && (flip.dir === 1 ? flip.to : flip.from);
  const cur = Math.min(base, total - 1);
  // Folhas que restam de cada lado, desenhadas como bordas empilhadas.
  const leftLeaves = Math.min(6, Math.ceil(cur / step));
  const rightLeaves = Math.min(6, Math.ceil((total - 1 - cur) / step));
  const slot = (i: number) => (i >= 0 && i < total ? render(i) : <div className="book-page manuscript parchment-aged absolute inset-0" />);

  const single = (
    <div className="relative h-full overflow-hidden rounded-[1.1rem]" onPointerDown={onDown} onPointerUp={onUp}>
      {overlay}
      {flip && turning !== null && under !== null ? (
        <div key={`f${flip.from}-${flip.to}`} className={`absolute inset-0 ${flip.dir === 1 ? 'curl-fwd' : 'curl-back'}`}>
          {render(under)}
          <div className="curl-under-shade pointer-events-none absolute inset-y-0" />
          <div className="curl-front absolute inset-0">{render(turning)}</div>
          <div className="curl-flap-wrap pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="curl-flap absolute inset-0">
              <div className="absolute inset-0 -scale-x-100 opacity-[0.12] blur-[0.5px]">{render(turning)}</div>
              <div className="curl-flap-shade absolute inset-0" />
            </div>
          </div>
        </div>
      ) : (
        render(cur)
      )}
    </div>
  );

  // Códice: a dupla atual; ao virar para frente, a folha da direita (frente = página da direita,
  // verso = próxima página da esquerda) gira sobre a lombada; para trás, a folha da esquerda volta.
  const L = cur;
  const leftStatic = flip ? (flip.dir === 1 ? L : flip.to) : L;
  const rightStatic = flip ? (flip.dir === 1 ? flip.to + 1 : L + 1) : L + 1;
  const codex = (
    <div className="relative flex h-full [perspective:4200px]" onPointerDown={onDown} onPointerUp={onUp}>
      <div className="relative h-full w-1/2 overflow-hidden rounded-l-[1.1rem]">
        {overlay}
        {slot(leftStatic)}
      </div>
      <div className="relative h-full w-1/2 overflow-hidden rounded-r-[1.1rem]">{slot(rightStatic)}</div>
      <div className="codex-gutter pointer-events-none absolute inset-y-0 left-1/2 w-16 -translate-x-1/2" aria-hidden="true" />
      {flip && (
        <div key={`s${flip.from}-${flip.to}`} className={`codex-leaf absolute inset-y-0 w-1/2 ${flip.dir === 1 ? 'codex-fwd left-1/2' : 'codex-back left-0'}`}>
          <div className="codex-face">{slot(flip.dir === 1 ? L + 1 : L)}</div>
          <div className="codex-face codex-back-face">{slot(flip.dir === 1 ? flip.to : flip.to + 1)}</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="leather-cover relative min-h-0 flex-1 p-2 pl-4">
        <span className="leather-clasp" aria-hidden="true" />
        <div className="relative mr-[9px] ml-[5px] h-full">
          <div className="page-edges-right" style={{ width: rightLeaves * 1.5 + 1, right: -(rightLeaves * 1.5 + 1) }} aria-hidden="true" />
          <div className="page-edges-left" style={{ width: leftLeaves * (spread ? 1.5 : 0.8), left: -(leftLeaves * (spread ? 1.5 : 0.8)) }} aria-hidden="true" />
          {spread ? codex : single}
        </div>
      </div>

      <div className="mt-2 flex shrink-0 items-center gap-2">
        <button className="btn-ghost !min-h-[44px] flex-1 text-sm" disabled={base === 0} onClick={() => go(base - step)} aria-label="Página anterior">
          <Icon name="voltar" size={18} /> Anterior
        </button>
        {base + step <= total - 1 || !last ? (
          <button className="btn-primary !min-h-[44px] flex-1 text-sm" disabled={base + step > total - 1} onClick={() => go(base + step)} aria-label="Próxima página">
            {nextLabel} <Icon name="seta" size={18} />
          </button>
        ) : (
          last
        )}
      </div>
    </>
  );
}
