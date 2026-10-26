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
  else if (u.kind === 'narrada' || u.kind === 'professores' || u.kind === 'flashcards') typical = 5;
  else if (u.kind === 'video') typical = 10;
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

export interface PlannedDay {
  /** AAAA-MM-DD, horário local. */
  date: string;
  weekday: number;
  study: boolean;
  newMinutes: number;
  practiceMinutes: number;
  reviewMinutes: number;
  units: { key: string; title: string; kind: Unit['kind']; minutes: number }[];
}

/** Parcela máxima do dia reservada a revisão (erros, cartões e revisão espaçada). */
export const REVIEW_DAY_SHARE = 0.3;

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Próximos 7 dias em minutos: revisão primeiro (até 30% do dia), depois as atividades pendentes da
 * trilha, na ordem, pelo tempo típico. Uma atividade que não cabe no resto do dia passa para o
 * seguinte (exceto se o dia ainda está vazio, para nunca travar com uma atividade longa).
 */
export function weeklyPlan(input: {
  data: StudyData;
  units: Unit[];
  chapters: Chapter[];
  learningUnits: LearningUnit[];
  missions: Mission[];
  minutesPerDay: number;
  weekdays: number[];
  examDate: string;
  pendingReviewQuestions: number;
  dueCards: number;
  now?: Date;
}): PlannedDay[] {
  const now = input.now ?? new Date();
  const ctx = { chapters: input.chapters, learningUnits: input.learningUnits, missions: input.missions };
  const queue = input.units.filter((u) => !unitDone(input.data, u));
  let backlog = input.pendingReviewQuestions * MIN.revisaoQuestao + input.dueCards * MIN.cartao;
  const out: PlannedDay[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const date = ymd(day);
    const study = input.weekdays.includes(day.getDay()) && date < input.examDate;
    const pd: PlannedDay = { date, weekday: day.getDay(), study, newMinutes: 0, practiceMinutes: 0, reviewMinutes: 0, units: [] };
    if (study) {
      let left = input.minutesPerDay;
      // Revisão: o atraso acumulado, mais a revisão espaçada do que já foi aprendido (a partir do 2º dia de estudo).
      const spaced = out.some((d) => d.study && d.newMinutes) ? Math.round(input.minutesPerDay * SPACED_REVIEW_SHARE) : 0;
      const review = Math.min(Math.round(left * REVIEW_DAY_SHARE), Math.ceil(backlog) + spaced);
      backlog = Math.max(0, backlog - review);
      pd.reviewMinutes = review;
      left -= review;
      while (queue.length) {
        const u = queue[0];
        const m = Math.round(unitMinutes(u, ctx).typical);
        if (m > left && pd.units.length) break;
        queue.shift();
        pd.units.push({ key: u.key, title: u.title, kind: u.kind, minutes: m });
        if (u.kind === 'aprender') pd.newMinutes += m;
        else pd.practiceMinutes += m;
        left -= m;
        if (left <= 0) break;
      }
      // Sem conteúdo novo, o tempo livre vira revisão e treino.
      if (!queue.length && left > 0) pd.reviewMinutes += left;
    }
    out.push(pd);
  }
  return out;
}

/** Fotografia versionada do plano, para comparar com o que foi feito depois. */
export interface PlanSnapshot {
  version: 1;
  createdAt: string;
  minutesPerDay: number;
  weekdays: number[];
  examDate: string;
  requiredMinutes: number;
  availableMinutes: number;
  days: { date: string; minutes: number; unitKeys: string[] }[];
}

export function snapshotPlan(f: PlanFeasibility, days: PlannedDay[], s: { minutesPerDay: number; weekdays: number[]; examDate: string }, now = new Date()): PlanSnapshot {
  return {
    version: 1,
    createdAt: now.toISOString(),
    ...s,
    requiredMinutes: f.requiredMinutes,
    availableMinutes: f.availableMinutes,
    days: days.filter((d) => d.study).map((d) => ({ date: d.date, minutes: d.newMinutes + d.practiceMinutes + d.reviewMinutes, unitKeys: d.units.map((u) => u.key) })),
  };
}

/** "3 h 20 min" a partir de minutos. */
export const fmtHours = (m: number) => {
  const h = Math.floor(m / 60);
  const r = Math.round(m % 60);
  return h ? `${h} h${r ? ` ${r} min` : ''}` : `${r} min`;
};
