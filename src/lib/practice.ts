// Prática estilo Duolingo: cada seção vira uma rodada curta de atividades variadas, montada a
// partir do próprio conteúdo (pegadinhas do texto, glossário do capítulo, questões da seção e os
// extras escritos para a seção: verdadeiro ou falso e complete a lacuna). Regras puras e testáveis.
import type { Chapter, Question, SectionExtras, SimpleSection } from '@/content/types';
import type { StudyData } from './model';
import { grantXp } from './study';

export type Activity =
  | { kind: 'tf'; id: string; statement: string; answer: boolean; why: string }
  | { kind: 'blank'; id: string; sentence: string; options: string[]; answer: string; why: string }
  | { kind: 'term'; id: string; definition: string; options: string[]; answer: string }
  | { kind: 'pairs'; id: string; pairs: { term: string; definition: string }[] }
  | { kind: 'mcq'; id: string; question: Question };

export const PRACTICE_PREFIX = 'pratica:';
export const practiceId = (chapterId: string, sectionId: string) => `${PRACTICE_PREFIX}${chapterId}:${sectionId}`;
export const isPracticeId = (id: string) => id.startsWith(PRACTICE_PREFIX);

/** Lê a lista "### Pegadinhas" de uma seção: `1. "Afirmação." Falso. Explicação.` */
export function parsePegadinhas(md: string): { statement: string; answer: boolean; why: string }[] {
  const i = md.indexOf('### Pegadinhas');
  if (i < 0) return [];
  const out: { statement: string; answer: boolean; why: string }[] = [];
  for (const line of md.slice(i).split('\n').slice(1)) {
    if (line.startsWith('### ')) break;
    const m = /^\d+\.\s+["“](.+?)["”]\s+(Falso|Verdadeiro)\.?\s*(.*)$/.exec(line.trim());
    if (m) out.push({ statement: m[1].trim(), answer: m[2] === 'Verdadeiro', why: m[3].trim() || (m[2] === 'Verdadeiro' ? 'A afirmação está correta.' : 'A afirmação está incorreta.') });
  }
  return out;
}

function shuffle<T>(a: T[], rand: () => number): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Monta a rodada de prática de uma seção (cerca de 8 a 12 atividades, tipos intercalados). */
export function buildPractice(
  chapter: Chapter,
  sectionId: string,
  bank: Question[],
  extras?: SectionExtras,
  rand: () => number = Math.random,
  simple?: SimpleSection,
): Activity[] {
  const section = chapter.sections.find((s) => s.id === sectionId);
  if (!section) return [];
  const key = `${chapter.id}:${sectionId}`;

  const tfs: Activity[] = [
    ...(extras?.truths ?? []).map((t, i) => ({ kind: 'tf' as const, id: `${key}:v${i}`, ...t })),
    ...shuffle(parsePegadinhas(section.body), rand)
      .slice(0, 2)
      .map((t, i) => ({ kind: 'tf' as const, id: `${key}:p${i}`, ...t })),
  ];
  const blanks: Activity[] = (extras?.blanks ?? []).map((b, i) => ({
    kind: 'blank' as const,
    id: `${key}:b${i}`,
    sentence: b.sentence,
    options: shuffle(b.options, rand),
    answer: b.answer,
    why: b.why,
  }));

  // Glossário do capítulo: escolher o termo certo e associar pares.
  const gloss = shuffle(chapter.glossary, rand);
  const terms: Activity[] = gloss.slice(0, 2).map((g, i) => {
    const others = shuffle(
      chapter.glossary.filter((x) => x.term !== g.term),
      rand,
    )
      .slice(0, 3)
      .map((x) => x.term);
    return { kind: 'term' as const, id: `${key}:t${i}`, definition: g.definition, options: shuffle([g.term, ...others], rand), answer: g.term };
  });
  const pairs: Activity[] =
    chapter.glossary.length >= 4 ? [{ kind: 'pairs', id: `${key}:pares`, pairs: gloss.slice(2, 6).length === 4 ? gloss.slice(2, 6) : gloss.slice(0, 4) }] : [];

  const mcqs: Activity[] = shuffle(
    bank.filter((q) => q.chapterId === chapter.id && q.sectionId === sectionId),
    rand,
  )
    .slice(0, 3)
    .map((q) => ({ kind: 'mcq' as const, id: q.id, question: q }));

  // Aquecimento bem fácil, tirado da explicação simples: verdadeiro ou falso e palavras novas.
  const warm: Activity[] = [];
  if (simple) {
    simple.checks.slice(0, 2).forEach((c, i) => warm.push({ kind: 'tf', id: `${key}:s${i}`, ...c }));
    const w = shuffle(simple.words, rand);
    if (w.length >= 4) {
      const g = w[0];
      const others = w.slice(1, 4).map((x) => x.term);
      warm.push({ kind: 'term', id: `${key}:w0`, definition: g.meaning, options: shuffle([g.term, ...others], rand), answer: g.term });
      warm.push({ kind: 'pairs', id: `${key}:wp`, pairs: w.slice(0, 4).map((x) => ({ term: x.term, definition: x.meaning })) });
    }
  }

  // Intercala: começa leve (V/F, termo), mistura lacunas e pares no meio, questões no fim.
  const order: Activity[] = [];
  const queues = [tfs, terms, blanks, pairs];
  while (queues.some((q) => q.length)) {
    for (const q of queues) {
      const x = q.shift();
      if (x) order.push(x);
    }
  }
  // Com aquecimento, a rodada continua curta: menos itens no meio e no máximo duas questões.
  return simple ? [...warm, ...order.slice(0, 6), ...mcqs.slice(0, 2)] : [...order, ...mcqs];
}

/** Conclui a prática de uma seção (guardada junto das lições, com prefixo próprio). */
export function completePractice(data: StudyData, chapterId: string, sectionId: string, scorePct: number, now = new Date().toISOString()) {
  const id = practiceId(chapterId, sectionId);
  const cur = data.lessons[id];
  const score = Math.round(Math.max(0, Math.min(100, scorePct)));
  const next: StudyData = {
    ...data,
    lessons: {
      ...data.lessons,
      [id]: { lessonId: id, bestScore: Math.max(cur?.bestScore ?? 0, score), firstCompletedAt: cur?.firstCompletedAt ?? now, lastCompletedAt: now },
    },
    pending: { ...data.pending, lessons: [...new Set([...data.pending.lessons, id])] },
  };
  return grantXp(next, 'lesson_complete', id, now);
}

export const practiceDone = (data: StudyData, chapterId: string, sectionId: string) => !!data.lessons[practiceId(chapterId, sectionId)];
