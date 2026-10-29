// Prática estilo Duolingo: cada seção vira uma rodada curta de atividades variadas, montada a
// partir do próprio conteúdo (pegadinhas do texto, glossário do capítulo, questões da seção e os
// extras escritos para a seção: verdadeiro ou falso e complete a lacuna). Regras puras e testáveis.
import type { Chapter, Question, SectionExtras, SimpleSection } from '@/content/types';
import type { StudyData } from './model';
import { grantXp } from './study';

export type Activity =
  | { kind: 'tf'; id: string; statement: string; answer: boolean; why: string }
  | { kind: 'blank'; id: string; sentence: string; options: string[]; answer: string; why: string }
  | { kind: 'multiBlank'; id: string; prompt: string; sentence: string; options: string[]; answers: string[]; why: string }
  | { kind: 'term'; id: string; definition: string; options: string[]; answer: string }
  | { kind: 'pairs'; id: string; pairs: { term: string; definition: string }[] }
  | { kind: 'build'; id: string; prompt: string; words: string[]; answer: string[]; why: string }
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

/** Reordena as alternativas e renumera as letras; a resposta correta continua ligada ao mesmo texto. */
function shuffleQuestionAnswers(q: Question, rand: () => number): Question {
  const letters = ['A', 'B', 'C', 'D', 'E'] as const;
  const options = shuffle(q.options, rand);
  const correctIndex = options.findIndex((option) => option.key === q.answer);
  return {
    ...q,
    options: options.map((option, index) => ({ ...option, key: letters[index] })),
    answer: letters[Math.max(0, correctIndex)],
  };
}

/**
 * Banco complementar: uma questão objetiva por conceito do glossário.
 * Estas questões são identificadas como geradas e não revisadas — não são oficiais.
 */
function glossaryPracticeQuestions(
  chapter: Chapter,
  sectionId: string,
  glossary: { term: string; definition: string }[],
  contestId: string,
): Question[] {
  const terms = glossary.filter((g) => g.term.trim() && g.definition.trim());
  if (terms.length < 4) return [];
  const used = new Set<string>();
  const uniqueTerms = terms.filter((g) => {
    const term = g.term.trim().toLocaleLowerCase('pt-BR');
    if (used.has(term)) return false;
    used.add(term);
    return true;
  });
  return uniqueTerms.map((g, index) => {
    const distractors = uniqueTerms.filter((x) => x.term !== g.term);
    const offset = index % Math.max(1, distractors.length);
    const rotated = [...distractors.slice(offset), ...distractors.slice(0, offset)];
    const letters = ['A', 'B', 'C', 'D', 'E'] as const;
    const options = [g, ...rotated.slice(0, 4)].map((item, i) => ({
      key: letters[i],
      text: item.term,
      comment: item.term === g.term
        ? 'Corresponde à definição apresentada no glossário.'
        : 'Este termo representa outro conceito; compare a definição no capítulo.',
    }));
    const slug = g.term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return {
      id: chapter.id + ':' + sectionId + ':glossario:' + slug,
      contestId,
      topicId: chapter.topicIds[0] ?? 'treino-glossario',
      chapterId: chapter.id,
      sectionId,
      origin: 'gerada-nao-revisada' as const,
      review: 'nao-revisado' as const,
      difficulty: 1,
      stem: 'Qual termo corresponde a esta definição?\n\n> ' + g.definition,
      options,
      answer: 'A',
      explanation: g.term + ': ' + g.definition,
    };
  });
}

/** Monta a rodada de prática de uma seção (cerca de 8 a 12 atividades, tipos intercalados). */
export function buildPractice(
  chapter: Chapter,
  sectionId: string,
  bank: Question[],
  extras?: SectionExtras,
  rand: () => number = Math.random,
  simple?: SimpleSection,
  /** Glossário permitido (reformulação: só conceitos já ensinados). Padrão: o glossário do capítulo. */
  glossary: { term: string; definition: string }[] = chapter.glossary,
  /** IDs de questões usadas recentemente; as novas são priorizadas sem aumentar a rodada. */
  recentQuestionIds: string[] = [],
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
  const gloss = shuffle(glossary, rand);
  const terms: Activity[] = gloss.slice(0, 2).map((g, i) => {
    const others = shuffle(
      glossary.filter((x) => x.term !== g.term),
      rand,
    )
      .slice(0, 3)
      .map((x) => x.term);
    return { kind: 'term' as const, id: `${key}:t${i}`, definition: g.definition, options: shuffle([g.term, ...others], rand), answer: g.term };
  });
  const pairs: Activity[] =
    glossary.length >= 4 ? [{ kind: 'pairs', id: `${key}:pares`, pairs: gloss.slice(2, 6).length === 4 ? gloss.slice(2, 6) : gloss.slice(0, 4) }] : [];

  // Montagem de frase: palavras corretas embaralhadas com distratores plausíveis do mesmo glossário.
  const sentenceSource = gloss.find((g) => {
    const count = g.definition.trim().split(/\s+/).length;
    return count >= 5 && count <= 12;
  });
  const builds: Activity[] = [];
  if (sentenceSource) {
    const answer = sentenceSource.definition.trim().split(/\s+/);
    const decoys = shuffle(
      glossary
        .filter((g) => g.term !== sentenceSource.term)
        .flatMap((g) => g.definition.split(/\s+/))
        .filter((word) => word.length > 3 && !answer.includes(word)),
      rand,
    ).slice(0, 2);
    builds.push({
      kind: 'build',
      id: `${key}:montar-frase`,
      prompt: `Monte uma definição coerente para “${sentenceSource.term}”. Use as palavras na ordem correta; há palavras extras.`,
      words: shuffle([...answer, ...decoys], rand),
      answer,
      why: `${sentenceSource.term}: ${sentenceSource.definition}`,
    });
  }

  // Frase de revisão com duas lacunas independentes, construída a partir de uma definição do trecho.
  const stopWords = new Set(['aquilo', 'aquele', 'aquela', 'durante', 'porque', 'quando', 'também', 'entre', 'sobre', 'para', 'como', 'mais', 'menos', 'muito', 'muitas', 'muitos', 'pode', 'podem', 'deve', 'devem', 'este', 'esta', 'esse', 'essa', 'uma', 'uns', 'umas', 'dos', 'das', 'que', 'com', 'sem', 'por', 'ser', 'são', 'tem', 'ter']);
  const multiSource = gloss.find((g) => {
    const text = g.definition.replace(/\*\*/g, '').replace(/`/g, '');
    const words = [...new Set((text.match(/\p{L}{5,}/gu) ?? []).filter((word) => !stopWords.has(word.toLocaleLowerCase('pt-BR'))))];
    return words.length >= 2 && text.trim().split(/\s+/).length >= 6;
  });
  const multiBlanks: Activity[] = [];
  if (multiSource) {
    const sentence = multiSource.definition.replace(/\*\*/g, '').replace(/`/g, '');
    const targets = [...new Set((sentence.match(/\p{L}{5,}/gu) ?? []).filter((word) => !stopWords.has(word.toLocaleLowerCase('pt-BR'))))].slice(0, 2);
    const masked = targets.reduce((text, word) => text.replace(new RegExp('\\b' + word + '\\b', 'u'), '___'), sentence);
    const distractors = shuffle(
      glossary
        .filter((g) => g.term !== multiSource.term)
        .flatMap((g) => g.definition.replace(/\*\*/g, '').match(/\p{L}{5,}/gu) ?? [])
        .filter((word) => !targets.some((x) => x.toLocaleLowerCase('pt-BR') === word.toLocaleLowerCase('pt-BR')) && !stopWords.has(word.toLocaleLowerCase('pt-BR'))),
      rand,
    ).filter((word, index, all) => all.findIndex((x) => x.toLocaleLowerCase('pt-BR') === word.toLocaleLowerCase('pt-BR')) === index).slice(0, 3);
    multiBlanks.push({
      kind: 'multiBlank',
      id: `${key}:lacunas-duplas`,
      prompt: `Complete a definição de “${multiSource.term}”. Escolha uma palavra para cada lacuna.`,
      sentence: masked,
      options: shuffle([...targets, ...distractors], rand),
      answers: targets,
      why: `${multiSource.term}: ${sentence}`,
    });
  }

  const sectionQuestions = bank.filter((q) => q.chapterId === chapter.id && q.sectionId === sectionId);
  const contestId = sectionQuestions[0]?.contestId ?? bank[0]?.contestId ?? 'treino-glossario';
  const generatedQuestions = glossaryPracticeQuestions(chapter, sectionId, glossary, contestId);
  const recent = new Set(recentQuestionIds);
  const unseenOfficial = shuffle(sectionQuestions.filter((q) => !recent.has(q.id)), rand);
  const unseenGenerated = shuffle(generatedQuestions.filter((q) => !recent.has(q.id) && !sectionQuestions.some((existing) => existing.id === q.id)), rand);
  const seenOfficial = shuffle(sectionQuestions.filter((q) => recent.has(q.id)), rand);
  const seenGenerated = shuffle(generatedQuestions.filter((q) => recent.has(q.id) && !sectionQuestions.some((existing) => existing.id === q.id)), rand);
  // Questões oficiais/autoriais disponíveis mantêm precedência; o glossário amplia o conjunto para as próximas visitas.
  const questionPool = [...unseenOfficial, ...unseenGenerated, ...seenOfficial, ...seenGenerated];
  const mcqs: Activity[] = questionPool
    .slice(0, 3)
    .map((q) => ({ kind: 'mcq' as const, id: q.id, question: shuffleQuestionAnswers(q, rand) }));

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
  const queues = [tfs, terms, blanks, multiBlanks, builds, pairs];
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

/** Marca dos itens de recuperação (não contam na nota da primeira tentativa). */
export const RECOVERY_MARK = '#rec';
export const isRecovery = (id: string) => id.includes(RECOVERY_MARK);

/**
 * Recuperação adaptativa: depois de um erro, um item equivalente com outros dados (outro termo do
 * mesmo glossário, outra questão do mesmo trecho). Sem equivalente, devolve undefined e a própria
 * atividade volta no fim da fila, como antes.
 */
export function recoveryFor(
  act: Activity,
  ctx: { chapter: Chapter; sectionId: string; bank: Question[]; simple?: SimpleSection; queue: Activity[]; glossary?: { term: string; definition: string }[] },
  rand: () => number = Math.random,
): Activity | undefined {
  const base = act.id.split(RECOVERY_MARK)[0];
  const n = (act.id.split(RECOVERY_MARK)[1] ?? '').length + 1;
  const id = `${base}${RECOVERY_MARK}${'x'.repeat(n)}`;
  if (act.kind === 'term') {
    const pool = base.endsWith(':w0') && ctx.simple ? ctx.simple.words.map((w) => ({ term: w.term, definition: w.meaning })) : (ctx.glossary ?? ctx.chapter.glossary);
    const inQueue = new Set(ctx.queue.flatMap((a) => (a.kind === 'term' ? [a.answer] : [])));
    const cands = pool.filter((g) => g.term !== act.answer && !inQueue.has(g.term));
    if (!cands.length || pool.length < 4) return undefined;
    const g = shuffle(cands, rand)[0];
    const others = shuffle(
      pool.filter((x) => x.term !== g.term),
      rand,
    )
      .slice(0, 3)
      .map((x) => x.term);
    return { kind: 'term', id, definition: g.definition, options: shuffle([g.term, ...others], rand), answer: g.term };
  }
  if (act.kind === 'mcq') {
    const used = new Set([act.question.id, ...ctx.queue.flatMap((a) => (a.kind === 'mcq' ? [a.question.id] : []))]);
    const same = ctx.bank.filter((q) => q.chapterId === ctx.chapter.id && q.sectionId === ctx.sectionId && !used.has(q.id));
    if (!same.length) return undefined;
    const q = shuffle(same, rand)[0];
    return { kind: 'mcq', id: `${q.id}${RECOVERY_MARK}${'x'.repeat(n)}`, question: q };
  }
  return undefined;
}

/** Fila depois de responder: acerto sai; erro traz o equivalente logo adiante, ou a mesma no fim. */
export function nextQueue(queue: Activity[], ok: boolean, recovery?: Activity): Activity[] {
  const [head, ...rest] = queue;
  if (!head) return [];
  if (ok) return rest;
  if (!recovery) return [...rest, head];
  const at = Math.min(1, rest.length);
  return [...rest.slice(0, at), recovery, ...rest.slice(at)];
}
