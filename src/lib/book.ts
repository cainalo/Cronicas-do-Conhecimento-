// Utilitários de conteúdo para leitura contínua. Mantém divisão segura de Markdown para blocos altos.
import type { Chapter } from '@/content/types';
import { parsePegadinhas } from './practice';

export type BookBlock =
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

/**
 * Cria blocos semânticos em ordem para uma página contínua. Sem capa, cena, fólio ou paginação.
 */
export function chapterBlocks(chapter: Chapter): BookBlock[] {
  const out: BookBlock[] = [];
  chapter.sections.forEach((section, index) => {
    out.push({ kind: 'title', sectionId: section.id, number: index + 1, title: section.title.replace(/^\d+\.\s*/, '') });
    const marker = section.body.indexOf('### Pegadinhas');
    const body = marker >= 0 ? section.body.slice(0, marker) : section.body;
    splitMarkdown(body).forEach((md, blockIndex) => out.push({ kind: 'md', sectionId: section.id, md, first: blockIndex === 0 }));
    const quiz = parsePegadinhas(section.body);
    if (quiz.length) out.push({ kind: 'quiz', sectionId: section.id, items: quiz });
    out.push({ kind: 'end', sectionId: section.id });
  });
  for (let i = 0; i < chapter.glossary.length; i += 4) out.push({ kind: 'glossary', items: chapter.glossary.slice(i, i + 4) });
  if (chapter.references.length) out.push({ kind: 'refs', items: chapter.references });
  return out;
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

