// Registro central do conteúdo. As telas consultam apenas estas funções,
// nunca os arquivos de um concurso específico.
import type { Chapter, Contest, Grimoire, Lesson, Question } from './types';
import { tceGo2026 } from './contests/tce-go-2026/contest';
import { capCriptografia, grimorioSeguranca } from './grimoires/seguranca';
import { questoesCap01 } from './grimoires/seguranca/questions-cap01';
import { licoesCap01 } from './grimoires/seguranca/lessons-cap01';

export const contests: Contest[] = [tceGo2026];
export const grimoires: Grimoire[] = [grimorioSeguranca];
export const chapters: Chapter[] = [capCriptografia];
export const lessons: Lesson[] = [...licoesCap01];
export const questions: Question[] = [...questoesCap01];

const byId = <T extends { id: string }>(list: T[]) => new Map(list.map((x) => [x.id, x]));
const contestMap = byId(contests);
const grimoireMap = byId(grimoires);
const chapterMap = byId(chapters);
const lessonMap = byId(lessons);
const questionMap = byId(questions);

export const DEFAULT_CONTEST_ID = tceGo2026.id;

export const getContest = (id: string) => contestMap.get(id);
export const getGrimoire = (id: string) => grimoireMap.get(id);
export const getChapter = (id: string) => chapterMap.get(id);
export const getLesson = (id: string) => lessonMap.get(id);
export const getQuestion = (id: string) => questionMap.get(id);

export const grimoiresForContest = (contestId: string) => grimoires.filter((g) => g.contestId === contestId);
export const questionsForContest = (contestId: string) => questions.filter((q) => q.contestId === contestId);

export function topicTitle(contestId: string, topicId: string): string {
  for (const d of getContest(contestId)?.disciplines ?? []) {
    const t = d.topics.find((x) => x.id === topicId);
    if (t) return t.title;
  }
  return topicId;
}

/** Todos os tópicos do concurso com a disciplina a que pertencem. */
export function topicsForContest(contestId: string) {
  return (getContest(contestId)?.disciplines ?? []).flatMap((d) => d.topics.map((t) => ({ ...t, discipline: d })));
}
