import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Children, isValidElement, type ReactNode } from 'react';

type MarkdownNode = { type: string; value?: string; children?: MarkdownNode[]; data?: { hName?: string; hProperties?: Record<string, unknown> } };

/** Sintaxe editorial: ++termo-chave++ vira sublinhado sem permitir HTML arbitrário no material. */
function underlineTerms() {
  return (tree: MarkdownNode) => {
    const visit = (parent: MarkdownNode) => {
      if (!parent.children) return;
      const next: MarkdownNode[] = [];
      for (const node of parent.children) {
        if (node.type === 'text' && typeof node.value === 'string' && node.value.includes('++')) {
          const value = node.value;
          let cursor = 0;
          while (cursor < value.length) {
            const open = value.indexOf('++', cursor);
            if (open < 0) {
              next.push({ type: 'text', value: value.slice(cursor) });
              break;
            }
            if (open > cursor) next.push({ type: 'text', value: value.slice(cursor, open) });
            const close = value.indexOf('++', open + 2);
            if (close < 0) {
              next.push({ type: 'text', value: value.slice(open) });
              break;
            }
            const term = value.slice(open + 2, close);
            if (!term.trim() || term.includes('\\n')) {
              next.push({ type: 'text', value: value.slice(open, close + 2) });
            } else {
              next.push({
                type: 'underline',
                data: { hName: 'u', hProperties: { className: ['term-underline'] } },
                children: [{ type: 'text', value: term }],
              });
            }
            cursor = close + 2;
          }
        } else {
          visit(node);
          next.push(node);
        }
      }
      parent.children = next;
    };
    visit(tree);
  };
}

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
      remarkPlugins={[remarkGfm, underlineTerms as never]}
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
        u: ({ children: c }: { children?: ReactNode }) => <u className="term-underline">{c}</u>,
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
