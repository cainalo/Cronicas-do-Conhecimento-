// Registro central do conteúdo. As telas consultam apenas estas funções,
// nunca os arquivos de um concurso específico.
import type { Chapter, Contest, EssayPrompt, Flashcard, Grimoire, Lesson, Question } from './types';
import { tceGo2026 } from './contests/tce-go-2026/contest';
import { capCriptografia, capDefesa, grimorioSeguranca, licoesCap02 } from './grimoires/seguranca';
import { questoesSegCap02 } from './grimoires/seguranca/questions-cap02';
import { questoesCap01 } from './grimoires/seguranca/questions-cap01';
import { licoesCap01 } from './grimoires/seguranca/lessons-cap01';
import { capIaAgentes, capIaLlm, grimorioIa } from './grimoires/ia';
import { questoesIaCap01 } from './grimoires/ia/questions-cap01';
import { questoesIaCap02 } from './grimoires/ia/questions-cap02';
import { licoesIa } from './grimoires/ia/lessons';
import { estudosDeCaso } from './discursivas/tce-go-2026';
import { capDevApis, capDevIdentidade, grimorioDev, licoesDev } from './grimoires/dev';
import { questoesDev } from './grimoires/dev/questions';
import { capInfraNuvem, capInfraRedes, grimorioInfra, licoesInfra } from './grimoires/infra';
import { questoesInfra } from './grimoires/infra/questions';
import { capDadosSgbd, capDadosSql, grimorioDados, licoesDados } from './grimoires/dados';
import { questoesDados } from './grimoires/dados/questions';
import { capGovModelos, capGovPublico, grimorioGovernanca, licoesGovernanca } from './grimoires/governanca';
import { questoesGovernanca } from './grimoires/governanca/questions';

export const contests: Contest[] = [tceGo2026];
export const grimoires: Grimoire[] = [grimorioSeguranca, grimorioIa, grimorioDev, grimorioInfra, grimorioDados, grimorioGovernanca];
export const chapters: Chapter[] = [capCriptografia, capDefesa, capIaLlm, capIaAgentes, capDevApis, capDevIdentidade, capInfraRedes, capInfraNuvem, capDadosSql, capDadosSgbd, capGovModelos, capGovPublico];
export const lessons: Lesson[] = [...licoesCap01, ...licoesCap02, ...licoesIa, ...licoesDev, ...licoesInfra, ...licoesDados, ...licoesGovernanca];
export const questions: Question[] = [...questoesCap01, ...questoesSegCap02, ...questoesIaCap01, ...questoesIaCap02, ...questoesDev, ...questoesInfra, ...questoesDados, ...questoesGovernanca];

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

export const essayPrompts: EssayPrompt[] = estudosDeCaso;
export const getEssayPrompt = (id: string) => essayPrompts.find((e) => e.id === id);

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Flashcards gerados a partir do glossário de cada capítulo (frente: termo; verso: definição). */
export const flashcards: Flashcard[] = chapters.flatMap((c) =>
  c.glossary.map((g) => ({
    id: `fc.${c.id}.${slug(g.term)}`,
    chapterId: c.id,
    topicId: c.topicIds[0],
    front: g.term,
    back: g.definition,
  })),
);
export const getFlashcard = (id: string) => flashcards.find((f) => f.id === id);
