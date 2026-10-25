import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Children, isValidElement, type ReactNode } from 'react';

function highlight(children: ReactNode, term?: string): ReactNode {
  if (!term || term.length < 2) return children;
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return Children.map(children, (c) => {
    if (typeof c !== 'string') return isValidElement(c) ? c : c;
    return c.split(re).map((part, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="search-hit">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  });
}

export function Markdown({
  children,
  highlightTerm,
  strong,
}: {
  children: string;
  highlightTerm?: string;
  /** Troca um trecho em negrito por outro elemento (ex.: termo clicável do glossário). */
  strong?: (text: string) => ReactNode | undefined;
}) {
  const h = (Tag: 'p' | 'li' | 'td' | 'th') =>
    function Hl({ children: c }: { children?: ReactNode }) {
      return <Tag>{highlight(c, highlightTerm)}</Tag>;
    };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children: c }) => (
          <div className="table-wrap">
            <table>{c}</table>
          </div>
        ),
        p: h('p'),
        li: h('li'),
        td: h('td'),
        th: h('th'),
        ...(strong
          ? {
              strong: ({ children: c }: { children?: ReactNode }) => {
                const text = Children.toArray(c).filter((x) => typeof x === 'string').join('');
                return (text && strong(text)) || <strong>{c}</strong>;
              },
            }
          : {}),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
