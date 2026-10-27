// Conteúdo de referência em fluxo contínuo. Sem capa, diálogo de personagem ou paginação física.
import type { Chapter } from '@/content/types';
import { parsePegadinhas } from './practice';

export type ReadingBlock =
  | { kind: 'title'; sectionId: string; number: number; title: string }
  | { kind: 'md'; sectionId: string; md: string; first?: boolean }
  | { kind: 'quiz'; sectionId: string; items: { statement: string; answer: boolean; why: string }[] }
  | { kind: 'end'; sectionId: string }
  | { kind: 'glossary'; items: { term: string; definition: string }[] }
  | { kind: 'refs'; items: { title: string; detail: string }[] };

/** Divide o Markdown em blocos de leitura natural sem quebrar código nem separar subtítulo do texto. */
export function splitMarkdown(md: string): string[] {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks: string[] = [];
  let current: string[] = [];
  let inFence = false;
  const flush = () => {
    if (current.some((line) => line.trim())) blocks.push(current.join('\n').trim());
    current = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      current.push(line);
      if (!inFence) flush();
      continue;
    }
    if (inFence) {
      current.push(line);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    current.push(line);
  }
  flush();

  const out: string[] = [];
  for (let i = 0; i < blocks.length; i++) {
    if (/^###\s/.test(blocks[i]) && !blocks[i].includes('\n') && i + 1 < blocks.length) {
      out.push(`${blocks[i]}\n\n${blocks[i + 1]}`);
      i++;
    } else {
      out.push(blocks[i]);
    }
  }
  return out;
}

/** Material de um capítulo em ordem de leitura: seções, verificações, glossário e referências. */
export function readingBlocks(chapter: Chapter): ReadingBlock[] {
  const out: ReadingBlock[] = [];
  chapter.sections.forEach((section, index) => {
    out.push({ kind: 'title', sectionId: section.id, number: index + 1, title: section.title.replace(/^\d+\.\s*/, '') });
    const pegadinhaStart = section.body.indexOf('### Pegadinhas');
    const body = pegadinhaStart >= 0 ? section.body.slice(0, pegadinhaStart) : section.body;
    splitMarkdown(body).forEach((md, blockIndex) => out.push({ kind: 'md', sectionId: section.id, md, first: blockIndex === 0 }));
    const quiz = parsePegadinhas(section.body);
    if (quiz.length) out.push({ kind: 'quiz', sectionId: section.id, items: quiz });
    out.push({ kind: 'end', sectionId: section.id });
  });
  for (let i = 0; i < chapter.glossary.length; i += 4) out.push({ kind: 'glossary', items: chapter.glossary.slice(i, i + 4) });
  if (chapter.references.length) out.push({ kind: 'refs', items: chapter.references });
  return out;
}
