// Seleção do feed da Sala dos Professores (Fase 6; spec 22). Ordem determinística: assunto atual da
// trilha, depois pontos fracos (última resposta errada no trecho), depois o que já foi estudado e, por
// fim, prévias do que ainda não foi estudado. Abrir o feed não mexe no checkpoint.
// Funções puras, sem React.
import type { Question } from '@/content/types';
import type { TeacherPost } from '@/content/teachers';
import type { StudyData } from './model';
import { latestAttempt } from './study';

export const FEED_PAGE = 5;

export interface FeedItem {
  post: TeacherPost;
  /** Trecho ainda não estudado: só leitura, sem mini-desafio. */
  preview: boolean;
  reason: 'agora' | 'reforco' | 'estudado' | 'previa';
}

export interface SalaPrefs {
  saved: string[];
  hidden: string[];
  /** Mini-desafios respondidos: id do post → acertou. */
  answered: Record<string, boolean>;
}

export const emptySala = (): SalaPrefs => ({ saved: [], hidden: [], answered: {} });

const sectionRead = (data: StudyData, chapterId: string, sectionId: string) =>
  !!data.reading[chapterId]?.sectionsRead.includes(sectionId) || !!data.unitLog?.[`aprender:${chapterId}:${sectionId}`];

export function buildFeed(input: {
  data: StudyData;
  posts: TeacherPost[];
  bank: Question[];
  prefs: SalaPrefs;
  /** Trecho do próximo passo da trilha. */
  current?: { chapterId: string; sectionId?: string };
}): FeedItem[] {
  const { data, bank, prefs, current } = input;
  const weak = new Set(bank.filter((q) => latestAttempt(data, q.id)?.isCorrect === false).map((q) => `${q.chapterId}:${q.sectionId}`));
  const rank = { agora: 0, reforco: 1, estudado: 2, previa: 3 } as const;
  return input.posts
    .filter((p) => !prefs.hidden.includes(p.id))
    .map((post): FeedItem => {
      const read = sectionRead(data, post.chapterId, post.sectionId);
      const isCurrent = !!current && current.chapterId === post.chapterId && current.sectionId === post.sectionId;
      const reason: FeedItem['reason'] = !read ? (isCurrent ? 'agora' : 'previa') : weak.has(`${post.chapterId}:${post.sectionId}`) ? 'reforco' : isCurrent ? 'agora' : 'estudado';
      return { post, preview: !read, reason };
    })
    .sort((a, b) => {
      // Já respondido desce, para reduzir repetição.
      const ra = rank[a.reason] + (a.post.id in prefs.answered ? 0.5 : 0);
      const rb = rank[b.reason] + (b.post.id in prefs.answered ? 0.5 : 0);
      return ra - rb || b.post.publishedAt.localeCompare(a.post.publishedAt) || a.post.id.localeCompare(b.post.id);
    });
}

export const REASON_LABEL: Record<FeedItem['reason'], string> = {
  agora: 'Do assunto de agora',
  reforco: 'Para reforçar um erro',
  estudado: 'Do que você já estudou',
  previa: 'Prévia: assunto ainda não estudado',
};
