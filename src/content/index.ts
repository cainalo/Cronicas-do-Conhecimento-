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
import { capIaEticaDados, capIaFundamentos, licoesIa34 } from './grimoires/ia/cap03-04';
import { questoesIaCap0304 } from './grimoires/ia/questions-cap03-04';
import { capPrimComputador, capPrimRedesDados, grimorioPrimeiros, licoesPrimeiros } from './grimoires/primeiros';
import { questoesPrimeiros } from './grimoires/primeiros/questions';
import { missaoSql01 } from './missions/sql-01';
import { microInfraProcessos } from './micro/infra-processos';
import { microInfraArquivos } from './micro/infra-arquivos';
import { microInfraShell } from './micro/infra-shell';
import { microInfraDiretorio } from './micro/infra-diretorio';
import { microInfraTcpip } from './micro/infra-tcpip';
import { microInfraEnderecos } from './micro/infra-enderecos';
import { microInfraServicos } from './micro/infra-servicos';
import { microInfraPerimetro } from './micro/infra-perimetro';
import { microInfraNuvemModelos } from './micro/infra-nuvem-modelos';
import { microInfraNuvemEscala } from './micro/infra-nuvem-escala';
import { microSegFundamentos } from './micro/seg-fundamentos';
import { estudosDeCaso } from './discursivas/tce-go-2026';
import { capDevApis, capDevIdentidade, grimorioDev, licoesDev } from './grimoires/dev';
import { questoesDev } from './grimoires/dev/questions';
import { capDevAlgoritmos, capDevLinguagens, licoesDev34 } from './grimoires/dev/cap03-04';
import { questoesDevCap0304 } from './grimoires/dev/questions-cap03-04';
import { capInfraNuvem, capInfraRedes, grimorioInfra, licoesInfra } from './grimoires/infra';
import { questoesInfra } from './grimoires/infra/questions';
import { capInfraSo, licoesInfraSo } from './grimoires/infra/cap03';
import { questoesInfraSo } from './grimoires/infra/questions-cap03';
import { capInglesLeitura, capInglesVocabulario, grimorioIngles, licoesIngles } from './grimoires/ingles';
import { questoesIngles } from './grimoires/ingles/questions';
import { capPortLeitura, capPortSintaxe, grimorioPortugues, licoesPortugues } from './grimoires/portugues';
import { questoesPortugues } from './grimoires/portugues/questions';
import { capInstCf, capInstGoias, grimorioInstitucional, licoesInstitucional } from './grimoires/institucional';
import { questoesInstitucional } from './grimoires/institucional/questions';
import { capMatAritmetica, capMatLogica, grimorioMatematica, licoesMatematica } from './grimoires/matematica';
import { questoesMatematica } from './grimoires/matematica/questions';
import { capDadosSgbd, capDadosSql, grimorioDados, licoesDados } from './grimoires/dados';
import { questoesDados } from './grimoires/dados/questions';
import { capGovModelos, capGovPublico, grimorioGovernanca, licoesGovernanca } from './grimoires/governanca';
import { questoesGovernanca } from './grimoires/governanca/questions';
import { capLegDados, capLegNormas, grimorioLegislacao, licoesLegislacao } from './grimoires/legislacao';
import { questoesLegislacao } from './grimoires/legislacao/questions';
import { capEsArquitetura, capEsProcesso, grimorioEngSoft, licoesEngSoft } from './grimoires/engsoft';
import { questoesEngSoft } from './grimoires/engsoft/questions';
import { capDevopsEntrega, capDevopsPlataforma, grimorioDevops, licoesDevops } from './grimoires/devops';
import { questoesDevops } from './grimoires/devops/questions';

export const contests: Contest[] = [tceGo2026];
export const grimoires: Grimoire[] = [grimorioPrimeiros, grimorioSeguranca, grimorioIa, grimorioDev, grimorioInfra, grimorioDados, grimorioGovernanca, grimorioLegislacao, grimorioEngSoft, grimorioDevops, grimorioIngles, grimorioPortugues, grimorioMatematica, grimorioInstitucional];
export const chapters: Chapter[] = [capPrimComputador, capPrimRedesDados, capCriptografia, capDefesa, capIaLlm, capIaAgentes, capIaFundamentos, capIaEticaDados, capDevApis, capDevIdentidade, capDevAlgoritmos, capDevLinguagens, capInfraRedes, capInfraNuvem, capInfraSo, capDadosSql, capDadosSgbd, capGovModelos, capGovPublico, capLegDados, capLegNormas, capEsProcesso, capEsArquitetura, capDevopsEntrega, capDevopsPlataforma, capInglesLeitura, capInglesVocabulario, capPortLeitura, capPortSintaxe, capInstCf, capInstGoias, capMatAritmetica, capMatLogica];
export const lessons: Lesson[] = [...licoesPrimeiros, ...licoesCap01, ...licoesCap02, ...licoesIa, ...licoesIa34, ...licoesDev, ...licoesDev34, ...licoesInfra, ...licoesInfraSo, ...licoesDados, ...licoesGovernanca, ...licoesLegislacao, ...licoesEngSoft, ...licoesDevops, ...licoesIngles, ...licoesPortugues, ...licoesInstitucional, ...licoesMatematica];
export const questions: Question[] = [...questoesPrimeiros, ...questoesCap01, ...questoesSegCap02, ...questoesIaCap01, ...questoesIaCap02, ...questoesIaCap0304, ...questoesDev, ...questoesDevCap0304, ...questoesInfra, ...questoesInfraSo, ...questoesDados, ...questoesGovernanca, ...questoesLegislacao, ...questoesEngSoft, ...questoesDevops, ...questoesIngles, ...questoesPortugues, ...questoesInstitucional, ...questoesMatematica];

/**
 * Caminho recomendado, do mais fácil ao mais difícil: começa pelo básico (Primeiro Pergaminho,
 * sistema operacional, redes, dados, lógica), intercala as matérias gerais e deixa para depois
 * os assuntos que dependem dos anteriores (criptografia, identidade, agentes, normas).
 */
const JOURNEY = [
  'cap.prim.01', 'cap.prim.02', 'cap.infra.03', 'cap.infra.01', 'cap.dados.01', 'cap.dev.03', 'cap.mat.01', 'cap.port.01',
  'cap.seg.02', 'cap.ia.03', 'cap.ia.01', 'cap.dev.01', 'cap.dados.02', 'cap.infra.02', 'cap.seg.01', 'cap.dev.02',
  'cap.mat.02', 'cap.port.02', 'cap.dev.04', 'cap.es.01', 'cap.es.02', 'cap.devops.01', 'cap.devops.02', 'cap.ia.02',
  'cap.ia.04', 'cap.ingles.01', 'cap.ingles.02', 'cap.gov.01', 'cap.gov.02', 'cap.leg.01', 'cap.leg.02', 'cap.inst.01', 'cap.inst.02',
];
const rank = (id: string) => (JOURNEY.indexOf(id) < 0 ? JOURNEY.length : JOURNEY.indexOf(id));
export const journey: Chapter[] = [...chapters].sort((a, b) => rank(a.id) - rank(b.id));

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

export { getSectionExtras, allSectionExtras } from './game/scenes';
export { getSimpleSection, allSimpleSections } from './game/simple';

/** Microaulas (piloto da auditoria: Processos, memória e serviços). Substituem o Aprender do trecho. */
export const microLessons = [microInfraProcessos, microInfraArquivos, microInfraShell, microInfraDiretorio, microInfraTcpip, microInfraEnderecos, microInfraServicos, microInfraPerimetro, microInfraNuvemModelos, microInfraNuvemEscala, microSegFundamentos];
export const getMicroLesson = (chapterId: string, sectionId: string) => microLessons.find((m) => m.chapterId === chapterId && m.sectionId === sectionId);

/** Missões do Arquivo Real (piloto: SQL). */
export const missions = [missaoSql01];
export const getMission = (id: string) => missions.find((m) => m.id === id);
export const missionForSection = (chapterId: string, sectionId: string) => missions.find((m) => m.chapterId === chapterId && m.sectionId === sectionId);

/** Unidades da jornada: um trecho praticado por seção e um desafio por lição. */
export const totalUnits = chapters.reduce((n, c) => n + c.sections.length, 0) + lessons.length + missions.length;

// Página Estudos: materiais externos com fonte verificável e videoaulas conferidas.
export { externalMaterials, curatedVideos } from './estudos/materiais';
export type { ExternalMaterial, CuratedVideo } from './estudos/materiais';

// Reformulação (Fase 2): unidades em texto interativo, com mapa de conceitos. O texto continua nas
// microaulas; a unidade só acrescenta o que cada etapa ensina e o que cada atividade cobra.
import { unitFromMicro, type Concept, type LearningUnit } from './learning';
import { conceitosProcessos, mapaProcessos } from './units/infra-processos';
export const concepts: Concept[] = [...conceitosProcessos];
export const learningUnits: LearningUnit[] = [unitFromMicro(microInfraProcessos, mapaProcessos, DEFAULT_CONTEST_ID)];
export const getLearningUnit = (chapterId: string, sectionId: string) => learningUnits.find((u) => u.chapterId === chapterId && u.sectionId === sectionId);
export type { Concept, LearningUnit, LearningStep, ContentBlock } from './learning';

// Fase 6: simulador de situações profissionais e Sala dos Professores (opcionais, não mexem na trilha).
import { cenarioSuporteLento } from './scenarios/suporte-lento';
import type { Scenario } from '@/lib/scenario';
export const scenarios: Scenario[] = [cenarioSuporteLento];
export const getScenario = (id: string) => scenarios.find((s) => s.id === id);
export { teachers, teacherPosts } from './teachers';
export type { FictionalTeacher, TeacherPost } from './teachers';
