// Livro paginado: o capítulo é dividido em blocos (parágrafo, tabela, lista, código, citação) que
// depois são distribuídos em páginas conforme a altura disponível na tela. Funções puras.
import type { Chapter, SectionExtras } from '@/content/types';
import { parsePegadinhas } from './practice';

export type BookBlock =
  | { kind: 'cover' }
  | { kind: 'scene'; sectionId: string; lines: { who: string; text: string }[]; cont?: boolean }
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

/**
 * Divide um bloco de Markdown alto demais em dois pedaços que fazem sentido sozinhos (auditoria
 * P0-06: nada de rolagem dentro da folha). Tabela: metade das linhas em cada pedaço, repetindo o
 * cabeçalho. Lista: metade dos itens. Código: metade das linhas, cada pedaço com sua cerca.
 * Parágrafo: corta no fim de frase mais próximo do meio. Devolve null se não houver como dividir.
 */
export function splitMdBlock(md: string): [string, string] | null {
  const lines = md.split('\n');
  // Subtítulo grudado: o título vai com o primeiro pedaço do conteúdo.
  if (/^###\s/.test(lines[0]) && lines.length > 2) {
    const rest = lines.slice(1).join('\n').replace(/^\n+/, '');
    const inner = splitMdBlock(rest);
    if (inner) return [`${lines[0]}\n\n${inner[0]}`, inner[1]];
    return [lines[0], rest];
  }
  // Tabela (com eventual texto antes dela).
  const t0 = lines.findIndex((l) => l.trim().startsWith('|'));
  if (t0 >= 0 && lines[t0 + 1]?.trim().startsWith('|') && /^\|?\s*:?-{2,}/.test(lines[t0 + 1].trim())) {
    const pre = lines.slice(0, t0).join('\n').trim();
    const head = lines.slice(t0, t0 + 2);
    const rows = lines.slice(t0 + 2).filter((l) => l.trim().startsWith('|'));
    const after = lines.slice(t0 + 2 + rows.length).join('\n').trim();
    if (pre) return [pre, lines.slice(t0).join('\n')];
    if (after) return [lines.slice(t0, t0 + 2 + rows.length).join('\n'), after];
    if (rows.length < 2) return null;
    const h = Math.ceil(rows.length / 2);
    return [[...head, ...rows.slice(0, h)].join('\n'), [...head, ...rows.slice(h)].join('\n')];
  }
  // Bloco de código.
  if (lines[0].trim().startsWith('```')) {
    const fence = lines[0];
    const body = lines.slice(1, lines[lines.length - 1].trim().startsWith('```') ? -1 : undefined);
    if (body.length < 2) return null;
    const h = Math.ceil(body.length / 2);
    return [[fence, ...body.slice(0, h), '```'].join('\n'), [fence, ...body.slice(h), '```'].join('\n')];
  }
  // Lista (itens começam com "- ", "* " ou "1. "); linhas de continuação ficam com o item.
  const isItem = (l: string) => /^(\s{0,3}[-*]\s|\s{0,3}\d+\.\s)/.test(l);
  if (isItem(lines[0])) {
    const starts = lines.map((l, i) => (isItem(l) && !/^\s{2,}/.test(l) ? i : -1)).filter((i) => i >= 0);
    if (starts.length < 2) return null;
    const cut = starts[Math.ceil(starts.length / 2)];
    return [lines.slice(0, cut).join('\n'), lines.slice(cut).join('\n')];
  }
  // Parágrafo: fim de frase mais perto do meio.
  const text = md;
  const mid = text.length / 2;
  let best = -1;
  const re = /[.!?;:](\s+)(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ"“(*`])/g;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const at = m.index + 1;
    if (best < 0 || Math.abs(at - mid) < Math.abs(best - mid)) best = at;
  }
  if (best <= 0 || best >= text.length - 1) return null;
  return [text.slice(0, best).trim(), text.slice(best).trim()];
}

/** Aplica splitMdBlock ao bloco i (só blocos de texto), mantendo seção e capitular só no primeiro. */
export function splitBlockAt(blocks: BookBlock[], i: number): BookBlock[] | null {
  const b = blocks[i];
  if (b.kind === 'md') {
    const parts = splitMdBlock(b.md);
    if (!parts) return null;
    return [...blocks.slice(0, i), { ...b, md: parts[0] }, { kind: 'md', sectionId: b.sectionId, md: parts[1] }, ...blocks.slice(i + 1)];
  }
  if (b.kind === 'scene' && b.lines.length > 1) {
    const h = Math.ceil(b.lines.length / 2);
    return [...blocks.slice(0, i), { ...b, lines: b.lines.slice(0, h) }, { ...b, lines: b.lines.slice(h), cont: true }, ...blocks.slice(i + 1)];
  }
  if (b.kind === 'quiz' && b.items.length > 1) {
    const h = Math.ceil(b.items.length / 2);
    return [...blocks.slice(0, i), { ...b, items: b.items.slice(0, h) }, { ...b, items: b.items.slice(h) }, ...blocks.slice(i + 1)];
  }
  if (b.kind === 'glossary' && b.items.length > 1) {
    const h = Math.ceil(b.items.length / 2);
    return [...blocks.slice(0, i), { ...b, items: b.items.slice(0, h) }, { ...b, items: b.items.slice(h) }, ...blocks.slice(i + 1)];
  }
  return null;
}
