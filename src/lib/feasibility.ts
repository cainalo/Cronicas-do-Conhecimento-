// Viabilidade do plano em minutos (reformulação, Fase 4; spec 15). Compara o tempo que falta estudar
// (conteúdo novo da trilha, revisões e uma folga) com o tempo disponível nos dias de estudo até a prova.
// Se não cabe, mostra o déficit e opções reais, sem esconder conteúdo nem fingir que a meta é possível.
// Estimativas são faixas (mínimo, típico, máximo): o app não promete precisão que não tem.
// Funções puras, sem React.
import type { Chapter, Mission } from '@/content/types';
import type { LearningUnit } from '@/content/learning';
import type { StudyData } from './model';
import { unitDone, type Unit } from './pace';

export const MIN = { praticar: 8, desafio: 12, missaoPadrao: 15, revisaoQuestao: 2, cartao: 0.5 } as const;
/** Folga para imprevistos e para a revisão espaçada do que vai sendo aprendido. */
export const BUFFER = 0.1;
export const SPACED_REVIEW_SHARE = 0.15;
export const FINAL_REVIEW_DAYS = 7;

export interface Range {
  min: number;
  typical: number;
  max: number;
}

/** Minutos estimados de uma atividade da trilha. */
export function unitMinutes(u: Unit, ctx: { chapters: Chapter[]; learningUnits: LearningUnit[]; missions: Mission[] }): Range {
  let typical: number;
  if (u.kind === 'aprender') {
    const lu = ctx.learningUnits.find((x) => x.chapterId === u.chapterId && x.sectionId === u.sectionId);
    const ch = ctx.chapters.find((c) => c.id === u.chapterId);
    typical = lu ? (lu.estimatedMinutes[0] + lu.estimatedMinutes[1]) / 2 : ch ? Math.max(5, ch.estimatedMinutes / ch.sections.length) : 10;
  } else if (u.kind === 'praticar') typical = MIN.praticar;
  else if (u.kind === 'desafio') typical = MIN.desafio;
  else typical = ctx.missions.find((m) => `/missao/${m.id}` === u.to)?.minutes ?? MIN.missaoPadrao;
  return { min: typical * 0.75, typical, max: typical * 1.4 };
}

/** Dias de estudo de hoje (inclusive) até a véspera da prova, nos dias da semana escolhidos. */
export function studyDaysBetween(now: Date, examDate: string, weekdays: number[]): number {
  const [y, m, d] = examDate.split('-').map(Number);
  const exam = new Date(y, m - 1, d);
  let n = 0;
  for (let day = new Date(now.getFullYear(), now.getMonth(), now.getDate()); day < exam; day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)) {
    if (weekdays.includes(day.getDay())) n++;
  }
  return n;
}

export interface PlanFeasibility {
  requiredMinutes: number;
  requiredRange: { min: number; max: number };
  availableMinutes: number;
  deficitMinutes: number;
  feasible: boolean;
  studyDays: number;
  /** Dias de estudo reservados ao fim para revisão e simulados (0 se não couber). */
  finalReviewDays: number;
  /** Minutos por dia de estudo necessários para caber tudo. */
  minutesPerDayNeeded: number;
  /** Quantos dias de estudo seriam necessários com os minutos atuais. */
  studyDaysNeeded: number;
  newContentMinutes: number;
  reviewMinutes: number;
  assumptions: string[];
}

export function computeFeasibility(input: {
  data: StudyData;
  units: Unit[];
  chapters: Chapter[];
  learningUnits: LearningUnit[];
  missions: Mission[];
  examDate: string;
  minutesPerDay: number;
  weekdays: number[];
  /** Questões erradas na fila e cartões vencidos agora. */
  pendingReviewQuestions: number;
  dueCards: number;
  now?: Date;
}): PlanFeasibility {
  const now = input.now ?? new Date();
  const ctx = { chapters: input.chapters, learningUnits: input.learningUnits, missions: input.missions };
  const pending = input.units.filter((u) => !unitDone(input.data, u));
  const sum = (k: keyof Range) => pending.reduce((s, u) => s + unitMinutes(u, ctx)[k], 0);
  const newT = sum('typical');
  const reviewNow = input.pendingReviewQuestions * MIN.revisaoQuestao + input.dueCards * MIN.cartao;
  const spaced = newT * SPACED_REVIEW_SHARE;
  const review = reviewNow + spaced;
  const total = (newBase: number) => Math.round((newBase + reviewNow + newBase * SPACED_REVIEW_SHARE) * (1 + BUFFER));
  const required = total(newT);
  const days = studyDaysBetween(now, input.examDate, input.weekdays);
  const available = days * input.minutesPerDay;
  // A semana final de revisão só é reservada se ainda couber todo o conteúdo novo antes dela.
  const reviewDaysInWindow = Math.min(days, Math.round((FINAL_REVIEW_DAYS * input.weekdays.length) / 7));
  const finalReviewDays = (days - reviewDaysInWindow) * input.minutesPerDay >= required ? reviewDaysInWindow : 0;
  const deficit = Math.max(0, required - available);
  return {
    requiredMinutes: required,
    requiredRange: { min: total(sum('min')), max: total(sum('max')) },
    availableMinutes: available,
    deficitMinutes: deficit,
    feasible: deficit === 0,
    studyDays: days,
    finalReviewDays,
    minutesPerDayNeeded: days ? Math.ceil(required / days) : required,
    studyDaysNeeded: input.minutesPerDay ? Math.ceil(required / input.minutesPerDay) : Infinity,
    newContentMinutes: Math.round(newT),
    reviewMinutes: Math.round(review),
    assumptions: [
      'Tempo de cada atividade estimado (aulas interativas pela faixa da unidade; trechos pelo tempo do capítulo; prática 8 min; desafio 12 min).',
      `Revisão espaçada estimada em ${Math.round(SPACED_REVIEW_SHARE * 100)}% do conteúdo novo, mais os erros e cartões pendentes.`,
      `Folga de ${Math.round(BUFFER * 100)}% para imprevistos.`,
      'Dias de estudo contados de hoje até a véspera da prova, nos dias da semana escolhidos.',
    ],
  };
}

/** "3 h 20 min" a partir de minutos. */
export const fmtHours = (m: number) => {
  const h = Math.floor(m / 60);
  const r = Math.round(m % 60);
  return h ? `${h} h${r ? ` ${r} min` : ''}` : `${r} min`;
};
