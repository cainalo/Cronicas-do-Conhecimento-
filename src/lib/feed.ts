// Feed didático (pacote v4, etapa 4): uma segunda forma de percorrer o MESMO currículo. Os posts são
// gerados das aulas da trilha (microaulas), na ordem da trilha: cada etapa vira explicação (ou
// carrossel), exemplo e atividade; no fim da aula, vídeo, aula narrada, dicas e resumo. Nada de ordem
// por engajamento. Ler posts não conclui a aula: só a conclusão explícita, depois de responder todas
// as checagens, registra a aula na trilha. Funções puras.
import type { MicroLesson } from '@/content/types';
import type { TeacherPost } from '@/content/teachers';
import type { CuratedVideo } from '@/content/estudos/materiais';
import type { NarratedLesson } from '@/content/narrated/types';
import type { MissionActivity } from './activities';
import { splitMarkdown } from './book';

export type FeedPostKind = 'explica' | 'carrossel' | 'exemplo' | 'atividade' | 'video' | 'narrada' | 'dica' | 'resumo';

export interface FeedPost {
  id: string;
  kind: FeedPostKind;
  lessonId: string;
  /** Etapa da aula de onde o post vem (quando vier de uma etapa). */
  stepId?: string;
  title: string;
  /** Texto (Markdown) ou slides do carrossel. */
  md?: string;
  slides?: string[];
  activity?: MissionActivity;
  recovery?: { md: string; activity: MissionActivity };
  video?: CuratedVideo;
  narrated?: NarratedLesson;
  tip?: TeacherPost;
  summary?: string[];
}

/** Explicações com 3 partes ou mais viram carrossel; menores, um post só. */
export function postsOfLesson(m: MicroLesson, extras: { videos: CuratedVideo[]; narrated?: NarratedLesson; tips: TeacherPost[] }): FeedPost[] {
  const out: FeedPost[] = [];
  m.steps.forEach((s) => {
    const parts = splitMarkdown(s.explain);
    if (parts.length >= 3) out.push({ id: `${m.id}:${s.id}:c`, kind: 'carrossel', lessonId: m.id, stepId: s.id, title: s.title, slides: parts });
    else out.push({ id: `${m.id}:${s.id}:e`, kind: 'explica', lessonId: m.id, stepId: s.id, title: s.title, md: s.explain });
    if (s.example) out.push({ id: `${m.id}:${s.id}:x`, kind: 'exemplo', lessonId: m.id, stepId: s.id, title: `Exemplo: ${s.title.toLowerCase()}`, md: s.example });
    out.push({ id: `${m.id}:${s.id}:a`, kind: 'atividade', lessonId: m.id, stepId: s.id, title: `Confira: ${s.title.toLowerCase()}`, activity: s.check, recovery: { md: s.recovery.explain, activity: s.recovery.check } });
  });
  // Vídeo, aula narrada e dicas só depois de todas as etapas: tudo o que pressupõem já foi ensinado.
  if (extras.narrated) out.push({ id: `${m.id}:narrada`, kind: 'narrada', lessonId: m.id, title: extras.narrated.title, narrated: extras.narrated });
  for (const v of extras.videos) out.push({ id: `${m.id}:video:${v.id}`, kind: 'video', lessonId: m.id, title: v.title, video: v });
  for (const t of extras.tips) out.push({ id: `${m.id}:dica:${t.id}`, kind: 'dica', lessonId: m.id, title: t.title, tip: t });
  out.push({ id: `${m.id}:resumo`, kind: 'resumo', lessonId: m.id, title: `Resumo: ${m.title}`, summary: m.summary });
  return out;
}

export interface FeedPrefs {
  /** Último post aberto em cada aula. */
  cursor: Record<string, number>;
  react: Record<string, { entendi?: boolean; rever?: boolean; salvo?: boolean }>;
  notes: Record<string, string>;
  /** Dúvidas guardadas para levar ao professor (sem resposta automática). */
  questions: Record<string, string>;
  /** Atividade respondida (true = acertou de primeira). */
  answers: Record<string, boolean>;
}

export const emptyFeed = (): FeedPrefs => ({ cursor: {}, react: {}, notes: {}, questions: {}, answers: {} });

/** Todas as atividades da aula foram respondidas no feed (pode concluir a aula). */
export function lessonAnswered(posts: FeedPost[], prefs: FeedPrefs): boolean {
  const acts = posts.filter((p) => p.kind === 'atividade');
  return acts.length > 0 && acts.every((p) => p.id in prefs.answers);
}

/** Aula do feed liberada: a primeira, ou todas as anteriores concluídas (na trilha). */
export function lessonUnlocked(order: string[], done: (lessonId: string) => boolean, lessonId: string): boolean {
  const i = order.indexOf(lessonId);
  return i >= 0 && order.slice(0, i).every(done);
}

/** Posts marcados "preciso rever", em ordem do currículo. */
export function toReview(all: FeedPost[], prefs: FeedPrefs): FeedPost[] {
  return all.filter((p) => prefs.react[p.id]?.rever);
}
