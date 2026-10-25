// Estimativa de domínio por trecho (reformulação, Fase 4; spec 15). Heurística explicável, não modelo
// estatístico: cada nível vem com os motivos que o justificam, para a pessoa saber o que falta.
// Funções puras, sem React.
import type { Chapter, Question } from '@/content/types';
import type { StudyData } from './model';

export type MasteryLevel = 'novo' | 'lido' | 'aprendendo' | 'firme';

export interface MasteryEstimate {
  level: MasteryLevel;
  /** 0 a 1. */
  score: number;
  answered: number;
  total: number;
  reasons: string[];
}

export const MASTERY_LABEL: Record<MasteryLevel, string> = {
  novo: 'Ainda não estudado',
  lido: 'Lido, sem prática',
  aprendendo: 'Aprendendo',
  firme: 'Firme',
};

/** Acerto mínimo nas respostas mais recentes para considerar firme. */
export const FIRM_SCORE = 0.8;

const dayOf = (iso: string) => iso.slice(0, 10);

export function sectionMastery(data: StudyData, chapterId: string, sectionId: string, bank: Question[]): MasteryEstimate {
  const qs = bank.filter((q) => q.chapterId === chapterId && q.sectionId === sectionId);
  const read = !!data.reading[chapterId]?.sectionsRead.includes(sectionId) || !!data.unitLog?.[`aprender:${chapterId}:${sectionId}`];
  const ids = new Set(qs.map((q) => q.id));
  const atts = data.attempts.filter((a) => ids.has(a.questionId));
  const latest = new Map<string, (typeof atts)[number]>();
  for (const a of atts) {
    const cur = latest.get(a.questionId);
    if (!cur || a.answeredAt > cur.answeredAt) latest.set(a.questionId, a);
  }
  const answered = latest.size;
  const correctNow = [...latest.values()].filter((a) => a.isCorrect).length;
  const accuracy = answered ? correctNow / answered : 0;
  const coverage = qs.length ? answered / qs.length : 0;
  const correctDays = new Set(atts.filter((a) => a.isCorrect).map((a) => dayOf(a.answeredAt))).size;
  const score = Math.round(((read ? 0.2 : 0) + 0.8 * accuracy * coverage) * 100) / 100;

  const reasons: string[] = [];
  reasons.push(read ? 'Trecho estudado.' : 'Trecho ainda não estudado.');
  if (qs.length) reasons.push(`Respondidas ${answered} de ${qs.length} questões; ${correctNow} certas na última resposta.`);
  else reasons.push('Ainda não há questões deste trecho no banco.');
  if (answered) reasons.push(correctDays >= 2 ? `Acertos em ${correctDays} dias diferentes.` : 'Acertos ainda em um só dia: a memória não foi testada depois.');

  let level: MasteryLevel;
  if (!read && !answered) level = 'novo';
  else if (!answered) level = 'lido';
  else if (accuracy >= FIRM_SCORE && coverage >= 0.5 && correctDays >= 2) level = 'firme';
  else level = 'aprendendo';
  return { level, score, answered, total: qs.length, reasons };
}

export function chapterMastery(data: StudyData, chapter: Chapter, bank: Question[]) {
  const sections = chapter.sections.map((s) => ({ section: s, m: sectionMastery(data, chapter.id, s.id, bank) }));
  const count = (l: MasteryLevel) => sections.filter((x) => x.m.level === l).length;
  return {
    sections,
    firm: count('firme'),
    learning: count('aprendendo'),
    read: count('lido'),
    fresh: count('novo'),
    score: sections.length ? Math.round((sections.reduce((s, x) => s + x.m.score, 0) / sections.length) * 100) / 100 : 0,
  };
}
