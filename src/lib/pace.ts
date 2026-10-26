// Ritmo até a prova: quantos dias faltam (contados pelo calendário do aparelho), quantas atividades o
// curso tem, quantas já foram feitas e quantas fazer por dia para terminar a tempo. A última semana
// antes da prova fica reservada para revisão e simulados. Funções puras, sem React.
import type { Chapter, Lesson, Mission } from '@/content/types';
import type { StudyData } from './model';
import { practiceId } from './practice';
import { missionKey } from './mission';

/** Dias reservados no fim para revisão e simulados (quando ainda houver tempo). */
export const REVIEW_DAYS = 7;

export interface Unit {
  key: string;
  kind: 'aprender' | 'narrada' | 'video' | 'professores' | 'praticar' | 'missao' | 'flashcards' | 'desafio';
  chapterId: string;
  sectionId?: string;
  title: string;
  to: string;
}

export const learnKey = (chapterId: string, sectionId: string) => `aprender:${chapterId}:${sectionId}`;

/** Todas as atividades do curso, na ordem do caminho recomendado. */
/** Chave de uma aula dentro da série de um trecho. */
export const seriesKey = (chapterId: string, sectionId: string, lessonId: string) => `${learnKey(chapterId, sectionId)}#${lessonId}`;

/** Materiais de estudo encaixados na trilha (aulas narradas, vídeos, posts dos professores, cartões). */
export interface TrailExtras {
  /** Aula narrada que acompanha uma aula em texto. */
  narratedFor?: (lessonId: string) => { id: string; title: string } | undefined;
  /** Videoaulas de um trecho; com `lessonId`, as que acompanham aquela aula; sem, as do trecho todo. */
  videosFor?: (chapterId: string, sectionId: string) => { id: string; title: string; lessonId?: string }[];
  /** Primeira aula do trecho no feed dos professores (há posts quando o trecho tem aulas em série). */
  postsLessonFor?: (chapterId: string, sectionId: string) => string | undefined;
  /** O capítulo tem cartões de memorização. */
  hasCards?: (chapterId: string) => boolean;
}

/** Atividades que só pedem para abrir e acompanhar: concluídas ao abrir pela trilha (`?u=chave`). */
export const VISIT_KINDS: Unit['kind'][] = ['narrada', 'video', 'professores', 'flashcards'];
const withVisit = (to: string, key: string) => `${to}${to.includes('?') ? '&' : '?'}u=${encodeURIComponent(key)}`;

export function courseUnits(
  chapters: Chapter[],
  lessons: Lesson[],
  missions: Mission[],
  /** Aulas em série de um trecho (quando há mais de uma, cada uma vira uma etapa da trilha). */
  seriesOf?: (chapterId: string, sectionId: string) => { id: string; title: string }[],
  extras: TrailExtras = {},
): Unit[] {
  const out: Unit[] = [];
  for (const c of chapters) {
    for (const s of c.sections) {
      const t = s.title.replace(/^\d+\.\s*/, '');
      const series = seriesOf?.(c.id, s.id) ?? [];
      const videos = extras.videosFor?.(c.id, s.id) ?? [];
      const afterLesson = (lessonId: string) => {
        const n = extras.narratedFor?.(lessonId);
        if (n) {
          const key = `narrada:${n.id}`;
          out.push({ key, kind: 'narrada', chapterId: c.id, sectionId: s.id, title: `Aula narrada: ${n.title}`, to: withVisit(`/aula-narrada/${n.id}`, key) });
        }
        for (const v of videos.filter((x) => x.lessonId === lessonId)) {
          const key = `video:${v.id}`;
          out.push({ key, kind: 'video', chapterId: c.id, sectionId: s.id, title: `Videoaula: ${v.title}`, to: withVisit(`/video/${v.id}`, key) });
        }
      };
      if (series.length > 1) {
        for (const l of series) {
          out.push({ key: seriesKey(c.id, s.id, l.id), kind: 'aprender', chapterId: c.id, sectionId: s.id, title: `Aprender: ${l.title}`, to: `/aprender/${c.id}/${s.id}/${l.id}` });
          afterLesson(l.id);
        }
      } else {
        out.push({ key: learnKey(c.id, s.id), kind: 'aprender', chapterId: c.id, sectionId: s.id, title: `Aprender: ${t}`, to: `/aprender/${c.id}/${s.id}` });
        for (const l of series) afterLesson(l.id);
      }
      const known = new Set(series.map((l) => l.id));
      for (const v of videos.filter((x) => !x.lessonId || !known.has(x.lessonId))) {
        const key = `video:${v.id}`;
        out.push({ key, kind: 'video', chapterId: c.id, sectionId: s.id, title: `Videoaula: ${v.title}`, to: withVisit(`/video/${v.id}`, key) });
      }
      const postsLesson = extras.postsLessonFor?.(c.id, s.id);
      if (postsLesson) {
        const key = `professores:${c.id}:${s.id}`;
        out.push({ key, kind: 'professores', chapterId: c.id, sectionId: s.id, title: `Professores: ${t}`, to: withVisit(`/sala?aula=${postsLesson}`, key) });
      }
      out.push({ key: practiceId(c.id, s.id), kind: 'praticar', chapterId: c.id, sectionId: s.id, title: `Praticar: ${t}`, to: `/pratica/${c.id}/${s.id}` });
      const m = missions.find((x) => x.chapterId === c.id && x.sectionId === s.id);
      if (m) out.push({ key: missionKey(m.id), kind: 'missao', chapterId: c.id, sectionId: s.id, title: `Caso prático: ${m.title}`, to: `/missao/${m.id}` });
    }
    if (extras.hasCards?.(c.id)) {
      const key = `flashcards:${c.id}`;
      out.push({ key, kind: 'flashcards', chapterId: c.id, title: `Cartões: ${c.title}`, to: withVisit(`/flashcards?capitulo=${c.id}`, key) });
    }
    for (const lid of c.lessonIds) {
      const l = lessons.find((x) => x.id === lid);
      if (l) out.push({ key: lid, kind: 'desafio', chapterId: c.id, title: `Desafio: ${l.title}`, to: `/licao/${lid}` });
    }
  }
  return out;
}

/** Data em que a atividade foi concluída pela primeira vez (ou true, se concluída sem data guardada). */
export function unitDone(data: StudyData, u: Unit): string | true | undefined {
  if (VISIT_KINDS.includes(u.kind)) return data.unitLog?.[u.key];
  if (u.kind === 'aprender') {
    const log = data.unitLog?.[u.key];
    if (log) return log;
    return data.reading[u.chapterId]?.sectionsRead.includes(u.sectionId!) ? true : undefined;
  }
  return data.lessons[u.key]?.firstCompletedAt;
}

/** Registra a primeira conclusão de uma atividade (usado pelo Aprender, que não tinha data). */
export function logUnit(data: StudyData, key: string, now = new Date().toISOString()): StudyData {
  if (data.unitLog?.[key]) return data;
  return { ...data, unitLog: { ...data.unitLog, [key]: now } };
}

/** "AAAA-MM-DD" no fuso do aparelho. */
export const localDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Dias de calendário entre hoje e a data da prova (no dia da prova, 0). */
export function daysUntilExam(examDate: string, now = new Date()): number {
  const [y, m, d] = examDate.split('-').map(Number);
  const exam = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((exam - today) / 86400000));
}

export interface Pace {
  daysLeft: number;
  total: number;
  done: number;
  remaining: number;
  /** Dias de estudo de conteúdo novo, contando hoje (sem a semana de revisão). */
  studyDays: number;
  /** Data (AAAA-MM-DD) até a qual o conteúdo novo deve terminar. */
  finishBy: string;
  perDay: number;
  doneToday: number;
  /** Quanto ainda falta hoje para cumprir a meta. */
  leftToday: number;
  next?: Unit;
}

export function computePace(data: StudyData, units: Unit[], examDate: string, now = new Date()): Pace {
  const daysLeft = daysUntilExam(examDate, now);
  const today = localDay(now);
  let done = 0;
  let doneToday = 0;
  let next: Unit | undefined;
  for (const u of units) {
    const d = unitDone(data, u);
    if (d) {
      done++;
      if (d !== true && localDay(new Date(d)) === today) doneToday++;
    } else next ??= u;
  }
  const remaining = units.length - done;
  // Hoje conta como dia de estudo; a semana final fica para revisão quando sobra tempo para isso.
  const reserve = daysLeft > REVIEW_DAYS * 2 ? REVIEW_DAYS : 0;
  const studyDays = Math.max(1, daysLeft - reserve);
  // A meta de hoje é calculada sobre o que faltava no começo do dia, para não subir enquanto se estuda.
  const perDay = remaining + doneToday === 0 ? 0 : Math.ceil((remaining + doneToday) / studyDays);
  const [y, m, d] = examDate.split('-').map(Number);
  const fin = new Date(Date.UTC(y, m - 1, d - reserve - 1));
  const finishBy = `${fin.getUTCFullYear()}-${String(fin.getUTCMonth() + 1).padStart(2, '0')}-${String(fin.getUTCDate()).padStart(2, '0')}`;
  return { daysLeft, total: units.length, done, remaining, studyDays, finishBy, perDay, doneToday, leftToday: Math.max(0, perDay - doneToday), next };
}
