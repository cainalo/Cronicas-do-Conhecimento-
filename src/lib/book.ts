// Livro paginado: o capítulo é dividido em blocos (parágrafo, tabela, lista, código, citação) que
// depois são distribuídos em páginas conforme a altura disponível na tela. Funções puras.
import type { Chapter, SectionExtras } from '@/content/types';
import { parsePegadinhas } from './practice';

export type BookBlock =
  | { kind: 'cover' }
  | { kind: 'scene'; sectionId: string; lines: { who: string; text: string }[] }
  | { kind: 'title'; sectionId: string; number: number; title: string }
  | { kind: 'md'; sectionId: string; md: string; first?: boolean }
  | { kind: 'quiz'; sectionId: string; items: { statement: string; answer: boolean; why: string }[] }
  | { kind: 'end'; sectionId: string }
  | { kind: 'glossary'; items: { term: string; definition: string }[] }
  | { kind: 'refs'; items: { title: string; detail: string }[] };

/** Divide Markdown em blocos indivisíveis; o subtítulo (###) fica grudado no bloco seguinte. */
export function splitMarkdown(md: string): string[] {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks: string[] = [];
  let cur: string[] = [];
  let fence = false;
  const flush = () => {
    if (cur.some((l) => l.trim())) blocks.push(cur.join('\n').trim());
    cur = [];
  };
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      fence = !fence;
      cur.push(line);
      if (!fence) flush();
      continue;
    }
    if (fence) {
      cur.push(line);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    cur.push(line);
  }
  flush();
  // Junta subtítulos ao bloco seguinte, para não ficarem sozinhos no pé da página.
  const out: string[] = [];
  for (let i = 0; i < blocks.length; i++) {
    if (/^###\s/.test(blocks[i]) && !blocks[i].includes('\n') && i + 1 < blocks.length) {
      out.push(`${blocks[i]}\n\n${blocks[i + 1]}`);
      i++;
    } else out.push(blocks[i]);
  }
  return out;
}

/** Todos os blocos do livro de um capítulo, na ordem de leitura. */
export function chapterBlocks(chapter: Chapter, extras: (sectionId: string) => SectionExtras | undefined): BookBlock[] {
  const out: BookBlock[] = [{ kind: 'cover' }];
  chapter.sections.forEach((s, idx) => {
    const ex = extras(s.id);
    if (ex?.scene?.length) out.push({ kind: 'scene', sectionId: s.id, lines: ex.scene });
    out.push({ kind: 'title', sectionId: s.id, number: idx + 1, title: s.title.replace(/^\d+\.\s*/, '') });
    const i = s.body.indexOf('### Pegadinhas');
    const body = i >= 0 ? s.body.slice(0, i) : s.body;
    splitMarkdown(body).forEach((md, k) => out.push({ kind: 'md', sectionId: s.id, md, first: k === 0 }));
    const quiz = parsePegadinhas(s.body);
    if (quiz.length) out.push({ kind: 'quiz', sectionId: s.id, items: quiz });
    out.push({ kind: 'end', sectionId: s.id });
  });
  for (let i = 0; i < chapter.glossary.length; i += 4) out.push({ kind: 'glossary', items: chapter.glossary.slice(i, i + 4) });
  if (chapter.references.length) out.push({ kind: 'refs', items: chapter.references });
  return out;
}

/** Blocos que sempre começam página nova. */
/**
 * Distribui os blocos em páginas, dada a altura de cada bloco e a altura útil da página.
 * Cena e título de seção abrem página; o título fica na mesma página do primeiro parágrafo.
 * Bloco maior que a página ocupa uma página sozinho (com rolagem interna).
 */
export function paginate(blocks: BookBlock[], heights: number[], pageHeight: number): number[][] {
  const pages: number[][] = [];
  let cur: number[] = [];
  let used = 0;
  blocks.forEach((b, i) => {
    const h = heights[i] ?? 0;
    const forced = b.kind === 'scene' || b.kind === 'cover' || blocks[i - 1]?.kind === 'cover' || b.kind === 'glossary' || b.kind === 'refs' || (b.kind === 'title' && blocks[i - 1]?.kind !== 'scene');
    const afterScene = b.kind === 'title' && blocks[i - 1]?.kind === 'scene';
    if (cur.length && (forced || afterScene || used + h > pageHeight)) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(i);
    used += h;
  });
  if (cur.length) pages.push(cur);
  return pages;
}
