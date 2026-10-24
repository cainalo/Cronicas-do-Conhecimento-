// Partes lado a lado, sem rolagem vertical: o conteúdo é medido na largura real da tela e
// distribuído em páginas que cabem na altura disponível. Troca-se de parte deslizando para o lado,
// pelas setas do teclado ou pelos botões do rodapé. Texto em Markdown alto demais é dividido
// (tabela, lista, código, frase) com a mesma regra do livro; itens prontos (botões, cartões) nunca
// são cortados ao meio.
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { splitMdBlock } from '@/lib/book';

export interface PageItem {
  key: string;
  /** Texto divisível. */
  md?: string;
  /** Conteúdo pronto (não divisível). */
  node?: ReactNode;
  /** Moldura do item; `cont` indica um pedaço que continua o anterior. */
  wrap?: (content: ReactNode, cont: boolean) => ReactNode;
}

interface Piece {
  item: number;
  md?: string;
  cont: boolean;
}

export interface PagerState {
  page: number;
  total: number;
  go: (i: number) => void;
}

/** Distribui alturas em páginas de altura máxima `h` (pura, para teste). */
export function packPages(heights: number[], h: number, gap: number): number[][] {
  const pages: number[][] = [];
  let cur: number[] = [];
  let used = 0;
  heights.forEach((x, i) => {
    const need = cur.length ? used + gap + x : x;
    if (cur.length && need > h) {
      pages.push(cur);
      cur = [i];
      used = x;
    } else {
      cur.push(i);
      used = need;
    }
  });
  if (cur.length) pages.push(cur);
  return pages;
}

export function SwipePages({
  items,
  layoutKey,
  renderMd,
  maxHeight,
  gap = 12,
  label,
  footer,
}: {
  items: PageItem[];
  /** Muda quando o conteúdo muda de verdade (refaz a medição). */
  layoutKey: string;
  renderMd: (md: string) => ReactNode;
  /** Sem ele, ocupa a altura que sobrar no pai (flex-1); com ele, cresce até esse limite. */
  maxHeight?: number;
  gap?: number;
  label: string;
  footer?: (s: PagerState) => ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [fonts, setFonts] = useState(0);
  const H = maxHeight ?? size.h;
  const sig = `${layoutKey}|${items.length}|${Math.round(size.w)}|${Math.round(H)}|${fonts}`;
  const init = (): Piece[] => items.map((it, i) => ({ item: i, md: it.md, cont: false }));
  const [st, setSt] = useState<{ sig: string; pieces: Piece[]; pages: number[][] | null; heights: number[] }>({ sig: '', pieces: [], pages: null, heights: [] });
  const cur = st.sig === sig ? st : { sig, pieces: init(), pages: null, heights: [] };
  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fontes carregadas mudam a altura do texto: mede de novo.
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && setFonts((n) => n + 1));
    return () => {
      alive = false;
    };
  }, []);

  // Volta para a primeira parte quando o conteúdo muda.
  useEffect(() => {
    setPage(0);
    track.current?.scrollTo?.({ left: 0 });
  }, [layoutKey]);

  useLayoutEffect(() => {
    if (cur.pages) return;
    const all = cur.pieces.map((_, i) => i);
    if (!H || !size.w) {
      setSt({ ...cur, pages: [all] });
      return;
    }
    const heights = cur.pieces.map((_, i) => refs.current[i]?.offsetHeight ?? 0);
    // Pedaços de texto mais altos que a página: divide todos de uma vez e mede de novo.
    let split = false;
    const next: Piece[] = [];
    cur.pieces.forEach((p, i) => {
      const parts = heights[i] > H && p.md !== undefined ? splitMdBlock(p.md) : null;
      if (parts) {
        split = true;
        next.push({ ...p, md: parts[0] }, { item: p.item, md: parts[1], cont: true });
      } else next.push(p);
    });
    if (split) {
      setSt({ sig, pieces: next, pages: null, heights: [] });
      return;
    }
    setSt({ ...cur, pages: packPages(heights, H, gap), heights });
  });

  const pages = cur.pages;
  const total = pages?.length ?? 1;
  const go = useCallback(
    (i: number) => {
      const t = track.current;
      const j = Math.max(0, Math.min(total - 1, i));
      setPage(j);
      if (t) t.scrollTo?.({ left: j * t.clientWidth, behavior: 'smooth' });
    },
    [total],
  );

  const piece = (p: Piece) => {
    const it = items[p.item];
    if (!it) return null;
    const content = p.md !== undefined ? renderMd(p.md) : it.node;
    return it.wrap ? it.wrap(content, p.cont) : content;
  };

  // Altura do trilho no modo "até o limite": a da parte mais alta.
  const trackH =
    maxHeight !== undefined && pages && cur.heights.length
      ? Math.min(maxHeight, Math.max(...pages.map((pg) => pg.reduce((s, i) => s + cur.heights[i], 0) + gap * (pg.length - 1))))
      : undefined;

  return (
    <>
      <div ref={outer} className={maxHeight === undefined ? 'relative min-h-0 flex-1' : 'relative'}>
        {!pages ? (
          <div className={`flex flex-col overflow-hidden ${maxHeight === undefined ? 'h-full' : ''}`} style={{ gap }}>
            {cur.pieces.map((p, i) => (
              <div key={i} className="shrink-0" ref={(el) => (refs.current[i] = el)}>
                {piece(p)}
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={track}
            role="region"
            aria-roledescription="carrossel"
            aria-label={total > 1 ? `${label}: parte ${page + 1} de ${total}` : label}
            tabIndex={total > 1 ? 0 : undefined}
            className={`no-scrollbar flex snap-x snap-mandatory overflow-y-hidden ${total > 1 ? 'overflow-x-auto' : 'overflow-x-hidden'} ${maxHeight === undefined ? 'h-full' : ''}`}
            style={trackH !== undefined ? { height: trackH } : undefined}
            onScroll={(e) => {
              const t = e.currentTarget;
              if (t.clientWidth) setPage(Math.round(t.scrollLeft / t.clientWidth));
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(page + 1);
              if (e.key === 'ArrowLeft') go(page - 1);
            }}
          >
            {pages.map((pg, k) => (
              <div key={k} className="flex h-full w-full shrink-0 snap-start snap-always flex-col overflow-hidden" style={{ gap }}>
                {pg.map((i) => (
                  <div key={i}>{piece(cur.pieces[i])}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {footer?.({ page, total, go })}
    </>
  );
}

/** Pontinhos de posição (clicáveis) para as partes. */
export function PageDots({ page, total, go }: PagerState) {
  if (total < 2) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 py-1.5" aria-label={`Parte ${page + 1} de ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => go(i)}
          aria-label={`Ir para a parte ${i + 1}`}
          aria-current={i === page ? 'step' : undefined}
          className={`h-2.5 rounded-full transition-all ${i === page ? 'w-6 bg-gold' : 'w-2.5 bg-line hover:bg-gold/50'}`}
        />
      ))}
      <span className="ml-2 text-xs text-muted">
        Parte {page + 1} de {total} · deslize para o lado
      </span>
    </div>
  );
}
