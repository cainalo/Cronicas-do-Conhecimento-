// Livro de couro com páginas de pergaminho que viram de verdade: a folha gira presa à lombada e,
// no meio do giro, mostra o verso (com a tinta da frente aparecendo ao contrário, como em papel
// fino). A dobra corre da direita para a esquerda, como o polegar levando a folha. Arrastar para o lado, tocar nas bordas ou usar os botões vira a página.
import { useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { useFx } from '@/app/fx';
import { Icon } from '@/components/Icon';

export const reducedMotion = () => import.meta.env.MODE === 'test' || (typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

const FLIP_MS = 700;

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
}

export function LeatherBook({ page, total, onPage, render, last, overlay, nextLabel = 'Virar' }: Props) {
  const { sfx } = useFx();
  const [flip, setFlip] = useState<{ from: number; to: number; dir: 1 | -1 } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const go = (to: number) => {
    if (to < 0 || to >= total || to === page || flip) return;
    const dir = to > page ? 1 : -1;
    if (reducedMotion() || Math.abs(to - page) > 1) {
      onPage(to);
      return;
    }
    sfx('tap');
    setFlip({ from: page, to, dir });
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
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) return go(dx < 0 ? page + 1 : page - 1);
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    if (x > 0.72) go(page + 1);
    else if (x < 0.28) go(page - 1);
  };

  // Folha que gira: frente é a página que sai (ou que volta), verso é o pergaminho do outro lado.
  const turning = flip && (flip.dir === 1 ? flip.from : flip.to);
  const under = flip && (flip.dir === 1 ? flip.to : flip.from);
  const cur = Math.min(page, total - 1);
  // Folhas que restam de cada lado, desenhadas como bordas empilhadas.
  const leftLeaves = Math.min(6, cur);
  const rightLeaves = Math.min(6, total - 1 - cur);

  return (
    <>
      <div className="leather-cover relative min-h-0 flex-1 p-2 pl-4">
        <span className="leather-clasp" aria-hidden="true" />
        <div className="relative mr-[9px] ml-[5px] h-full">
          <div className="page-edges-right" style={{ width: rightLeaves * 1.5 + 1, right: -(rightLeaves * 1.5 + 1) }} aria-hidden="true" />
          <div className="page-edges-left" style={{ width: leftLeaves * 0.8, left: -(leftLeaves * 0.8) }} aria-hidden="true" />
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
        </div>
      </div>

      <div className="mt-2 flex shrink-0 items-center gap-2">
        <button className="btn-ghost !min-h-[44px] flex-1 text-sm" disabled={page === 0} onClick={() => go(page - 1)} aria-label="Página anterior">
          <Icon name="voltar" size={18} /> Anterior
        </button>
        {page < total - 1 || !last ? (
          <button className="btn-primary !min-h-[44px] flex-1 text-sm" disabled={page >= total - 1} onClick={() => go(page + 1)} aria-label="Próxima página">
            {nextLabel} <Icon name="seta" size={18} />
          </button>
        ) : (
          last
        )}
      </div>
    </>
  );
}
