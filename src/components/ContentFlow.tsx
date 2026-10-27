import { useEffect, useRef, type ReactNode } from 'react';
import { Markdown } from '@/components/Markdown';

/** Um item de conteúdo contínuo; não representa uma página nem uma lâmina separada. */
export interface ContentItem {
  key: string;
  /** Markdown renderizado pelo componente chamador. */
  md?: string;
  /** Elemento React já montado pelo chamador. */
  node?: ReactNode;
  /** Moldura semântica opcional do conteúdo. */
  wrap?: (content: ReactNode, continuation: boolean) => ReactNode;
}

export interface ContentFlowState {
  /** Interface compatível com rodapés antigos; um fluxo contínuo não pagina. */
  page: number;
  total: number;
  go: (index: number) => void;
}

/** Todo o conteúdo em uma única coluna rolável: sem páginas ou navegação horizontal. */
export function ContentFlow({
  items,
  layoutKey,
  renderMd,
  maxHeight,
  gap = 12,
  label,
  footer,
}: {
  items: ContentItem[];
  layoutKey: string;
  renderMd?: (md: string) => ReactNode;
  maxHeight?: number;
  gap?: number;
  label: string;
  footer?: (state: ContentFlowState) => ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    root.current?.scrollTo?.({ top: 0, behavior: 'auto' });
  }, [layoutKey]);

  const renderMarkdown = renderMd ?? ((md: string) => <Markdown>{md}</Markdown>);
  const go = (_index: number) => root.current?.scrollTo?.({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div
        ref={root}
        role="region"
        aria-label={label}
        className={`min-w-0 min-h-0 flex flex-col overflow-y-auto overscroll-contain ${maxHeight === undefined ? 'flex-1' : 'shrink-0'}`}
        style={{ gap, ...(maxHeight === undefined ? {} : { maxHeight }) }}
        data-testid="content-flow"
        data-layout-key={layoutKey}
      >
        {items.map((item) => {
          const content = item.md !== undefined ? renderMarkdown(item.md) : item.node;
          return (
            <div key={item.key} className="min-w-0 shrink-0">
              {item.wrap ? item.wrap(content, false) : content}
            </div>
          );
        })}
      </div>
      {footer?.({ page: 0, total: 1, go })}
    </>
  );
}

/** Mantido para imports antigos; não renderiza pontos de página no fluxo contínuo. */
export function PageDots(_state: ContentFlowState) {
  return null;
}
