// Registro central do conteúdo. As telas consultam apenas estas funções,
// nunca os arquivos de um concurso específico.
import type { Chapter, Contest, EssayPrompt, Flashcard, Grimoire, Lesson, MicroLesson, Question } from './types';
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
import { microSegSimetrica } from './micro/seg-simetrica';
import { microSegAssimetrica } from './micro/seg-assimetrica';
import { microSegHash } from './micro/seg-hash';
import { microSegAssinatura } from './micro/seg-assinatura';
import { microSegHibrida } from './micro/seg-hibrida';
import { microSegPrincipios } from './micro/seg-principios';
import { microSegAcesso } from './micro/seg-acesso';
import { microSegOwasp } from './micro/seg-owasp';
import { microSegAmeacas } from './micro/seg-ameacas';
import { microSegContinuidade } from './micro/seg-continuidade';
import { microSegIso } from './micro/seg-iso';
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
import { matNumerosReta, matSomarSubtrair, matMultiplicarDividir } from './micro/mat-inteiros-a';
import { matOrdemOperacoes, matPotencias, matFracaoIdeia } from './micro/mat-inteiros-b';
import { matSomarFracoes, matMultiplicarFracoes, matRacionaisRestante } from './micro/mat-inteiros-c';
import { primHistoria, primQuatroTarefas } from './micro/prim-computador-a';
import { primBits, primTamanhos } from './micro/prim-computador-b';
import { primHwHistoria, primHwPecas, primHwTipos } from './micro/prim-hardware';
import { primSoHistoria, primSoGerente, primSoArquivos } from './micro/prim-sistema';
import { primProgHistoria, primProgVariavel, primProgDecisao } from './micro/prim-programacao';
import { primRedeHistoria, primRedeEndereco, primRedeServidor } from './micro/prim-redes';
import { primDadosHistoria, primDadosSgbd, primDadosTabelas } from './micro/prim-dados';
import { primSegHistoria, primSegPilares, primSegDefesas } from './micro/prim-seguranca';
import { dadosModHistoria, dadosModMer, dadosModNormal } from './micro/dados-modelagem';
import { dadosSqlHistoria, dadosSqlConsultas, dadosSqlJuncoes } from './micro/dados-sql';
import { dadosTxHistoria, dadosTxAcid, dadosTxIsolamento } from './micro/dados-transacoes';
import { devLogHistoria, devLogControle, devLogComplexidade } from './micro/dev-logica';
import { devEstHistoria, devEstLineares, devEstOrdenacao } from './micro/dev-estruturas';
import { devParHistoria, devParPoo, devParFuncional } from './micro/dev-paradigmas';
import { matDivHistoria, matDivCriterios, matDivMmcMdc } from './micro/mat-divisores';
import { matRazHistoria, matRazProporcao, matRazRegraTres } from './micro/mat-razoes';
import { matPctHistoria, matPctFator, matPctSucessivos } from './micro/mat-porcentagem';
import { portIntHistoria, portIntLeitura, portIntFiguras } from './micro/port-interpretacao';
import { portOrtHistoria, portOrtAcentos, portOrtCrase } from './micro/port-ortografia';
import { portPonHistoria, portPonVirgula, portPonPronomes } from './micro/port-pontuacao';
import { portMorHistoria, portMorClasses, portMorFormacao } from './micro/port-morfologia';
import { iaAprHistoria, iaAprTipos, iaAprReforco } from './micro/ia-aprendizado';
import { iaRedHistoria, iaRedNeuronio, iaRedTreino } from './micro/ia-redes';
import { iaPlnHistoria, iaPlnPre, iaPlnRepresentacao } from './micro/ia-pln';
import { iaLlmHistoria, iaLlmFunciona, iaLlmTreino } from './micro/ia-llm';
import { iaPrpHistoria, iaPrpTecnicas, iaPrpPraticas } from './micro/ia-prompts';
import { iaCtxHistoria, iaCtxJanela, iaCtxTecnicas } from './micro/ia-contexto';
import { iaRagHistoria, iaRagFluxo, iaRagMelhorias } from './micro/ia-rag';
import { iaVetHistoria, iaVetMedidas, iaVetBanco } from './micro/ia-vetores';
import { iaResLinha, iaResQuadro } from './micro/ia-resumo';
import { devRestHistoria, devRestMetodos, devRestStatus } from './micro/dev-rest';
import { devFmtHistoria, devFmtJson, devFmtXml } from './micro/dev-formatos';
import { devGqlHistoria, devGqlConsulta, devGqlWebsocket } from './micro/dev-graphql';
import { devOapHistoria, devOapDocumento, devOapUsos } from './micro/dev-openapi';
import { dadosRelHistoria, dadosRelPostgres, dadosRelOracle } from './micro/dados-relacionais';
import { dadosNosHistoria, dadosNosModelos, dadosNosConsistencia, dadosNosReplicacao } from './micro/dados-nosql';
import { devIdHistoria, devIdTres, devIdSessoes } from './micro/dev-identidade';
import { devOauHistoria, devOauPapeis, devOauTokens, devOauFluxos } from './micro/dev-oauth';
import { devOidHistoria, devOidConnect, devOidJwt, devOidValidacao } from './micro/dev-oidc';
import { devIdrLinha, devIdrQuadro } from './micro/dev-idresumo';
import { matLogHistoria, matLogTabela, matLogOrdem, matLogDeducao } from './micro/mat-logica';
import { matSeqHistoria, matSeqNumeros, matSeqLetras, matSeqConceitos } from './micro/mat-sequencias';
import { matEspHistoria, matEspCalendario, matEspRelogio, matEspOrientacao } from './micro/mat-espaco';
import { portConHistoria, portConVerbal, portConSe, portConNominal } from './micro/port-concordancia';
import { portRegHistoria, portRegVerbal, portRegVozes, portRegTempos } from './micro/port-regencia';
import { portPerHistoria, portPerOracoes, portPerConectivos, portPerReescrita } from './micro/port-periodo';
import { portRedHistoria, portRedAtributos, portRedTratamento, portRedOficio } from './micro/port-redacao';
import { devJpHistoria, devJpJava, devJpExcecoes, devJpPython } from './micro/dev-javapy';
import { devJsHistoria, devJsTipos, devJsAssincrono, devJsNodeTs } from './micro/dev-jsts';
import { devWebHistoria, devWebHtml, devWebCss, devWebReact } from './micro/dev-web';
import { devPacHistoria, devPacSemver, devPacLock, devPacBuild } from './micro/dev-pacotes';
import { esCicHistoria, esCicAbordagens, esCicKanban, esCicXp } from './micro/es-ciclo';
import { esReqHistoria, esReqTipos, esReqEngenharia, esReqHistorias } from './micro/es-requisitos';
import { esArqHistoria, esArqEstilos, esArqSolid, esArqPrincipios } from './micro/es-arquitetura';
import { esModHistoria, esModUml, esModBpmn, esModPadroes } from './micro/es-modelagem';
import { esQuaHistoria, esQuaAtributos, esQuaTestes, esQuaRefatoracao } from './micro/es-qualidade';
import { dvGitHistoria, dvGitComandos, dvGitBranches, dvGitPr } from './micro/devops-git';
import { dvCiHistoria, dvCiPipeline, dvCiAmbientes, dvCiFerramentas } from './micro/devops-cicd';
import { dvIacHistoria, dvIacDeclarativa, dvIacContainers, dvIacKubernetes, dvObsHistoria, dvObsSlo, dvObsAlertas } from './micro/devops-plataforma';
import { microLessonsAgentesMcp } from './micro/ia-agentes-mcp';
export const microLessons: MicroLesson[] = [
  primHistoria,
  primQuatroTarefas,
  primBits,
  primTamanhos,
  primHwHistoria,
  primHwPecas,
  primHwTipos,
  primSoHistoria,
  primSoGerente,
  primSoArquivos,
  primProgHistoria,
  primProgVariavel,
  primProgDecisao,
  primRedeHistoria,
  primRedeEndereco,
  primRedeServidor,
  primDadosHistoria,
  primDadosSgbd,
  primDadosTabelas,
  primSegHistoria,
  primSegPilares,
  primSegDefesas,
  dadosModHistoria,
  dadosModMer,
  dadosModNormal,
  dadosSqlHistoria,
  dadosSqlConsultas,
  dadosSqlJuncoes,
  dadosTxHistoria,
  dadosTxAcid,
  dadosTxIsolamento,
  devLogHistoria,
  devLogControle,
  devLogComplexidade,
  devEstHistoria,
  devEstLineares,
  devEstOrdenacao,
  devParHistoria,
  devParPoo,
  devParFuncional,
  matDivHistoria,
  matDivCriterios,
  matDivMmcMdc,
  matRazHistoria,
  matRazProporcao,
  matRazRegraTres,
  matPctHistoria,
  matPctFator,
  matPctSucessivos,
  portIntHistoria,
  portIntLeitura,
  portIntFiguras,
  portOrtHistoria,
  portOrtAcentos,
  portOrtCrase,
  portPonHistoria,
  portPonVirgula,
  portPonPronomes,
  portMorHistoria,
  portMorClasses,
  portMorFormacao,
  iaAprHistoria,
  iaAprTipos,
  iaAprReforco,
  iaRedHistoria,
  iaRedNeuronio,
  iaRedTreino,
  iaPlnHistoria,
  iaPlnPre,
  iaPlnRepresentacao,
  iaLlmHistoria,
  iaLlmFunciona,
  iaLlmTreino,
  iaPrpHistoria,
  iaPrpTecnicas,
  iaPrpPraticas,
  iaCtxHistoria,
  iaCtxJanela,
  iaCtxTecnicas,
  iaRagHistoria,
  iaRagFluxo,
  iaRagMelhorias,
  iaVetHistoria,
  iaVetMedidas,
  iaVetBanco,
  iaResLinha,
  iaResQuadro,
  devRestHistoria,
  devRestMetodos,
  devRestStatus,
  devFmtHistoria,
  devFmtJson,
  devFmtXml,
  devGqlHistoria,
  devGqlConsulta,
  devGqlWebsocket,
  devOapHistoria,
  devOapDocumento,
  devOapUsos,
  dadosRelHistoria,
  dadosRelPostgres,
  dadosRelOracle,
  dadosNosHistoria,
  dadosNosModelos,
  dadosNosConsistencia,
  dadosNosReplicacao,
  devIdHistoria,
  devIdTres,
  devIdSessoes,
  devOauHistoria,
  devOauPapeis,
  devOauTokens,
  devOauFluxos,
  devOidHistoria,
  devOidConnect,
  devOidJwt,
  devOidValidacao,
  devIdrLinha,
  devIdrQuadro,
  matLogHistoria,
  matLogTabela,
  matLogOrdem,
  matLogDeducao,
  matSeqHistoria,
  matSeqNumeros,
  matSeqLetras,
  matSeqConceitos,
  matEspHistoria,
  matEspCalendario,
  matEspRelogio,
  matEspOrientacao,
  portConHistoria,
  portConVerbal,
  portConSe,
  portConNominal,
  portRegHistoria,
  portRegVerbal,
  portRegVozes,
  portRegTempos,
  portPerHistoria,
  portPerOracoes,
  portPerConectivos,
  portPerReescrita,
  portRedHistoria,
  portRedAtributos,
  portRedTratamento,
  portRedOficio,
  devJpHistoria,
  devJpJava,
  devJpExcecoes,
  devJpPython,
  devJsHistoria,
  devJsTipos,
  devJsAssincrono,
  devJsNodeTs,
  devWebHistoria,
  devWebHtml,
  devWebCss,
  devWebReact,
  devPacHistoria,
  devPacSemver,
  devPacLock,
  devPacBuild,
  esCicHistoria,
  esCicAbordagens,
  esCicKanban,
  esCicXp,
  esReqHistoria,
  esReqTipos,
  esReqEngenharia,
  esReqHistorias,
  esArqHistoria,
  esArqEstilos,
  esArqSolid,
  esArqPrincipios,
  esModHistoria,
  esModUml,
  esModBpmn,
  esModPadroes,
  esQuaHistoria,
  esQuaAtributos,
  esQuaTestes,
  esQuaRefatoracao,
  dvGitHistoria,
  dvGitComandos,
  dvGitBranches,
  dvGitPr,
  dvCiHistoria,
  dvCiPipeline,
  dvCiAmbientes,
  dvCiFerramentas,
  dvIacHistoria,
  dvIacDeclarativa,
  dvIacContainers,
  dvIacKubernetes,
  dvObsHistoria,
  dvObsSlo,
  dvObsAlertas,
  ...microLessonsAgentesMcp,
  matNumerosReta,
  matSomarSubtrair,
  matMultiplicarDividir,
  matOrdemOperacoes,
  matPotencias,
  matFracaoIdeia,
  matSomarFracoes,
  matMultiplicarFracoes,
  matRacionaisRestante,
  microInfraProcessos, microInfraArquivos, microInfraShell, microInfraDiretorio, microInfraTcpip, microInfraEnderecos, microInfraServicos, microInfraPerimetro, microInfraNuvemModelos, microInfraNuvemEscala, microSegFundamentos, microSegSimetrica, microSegAssimetrica, microSegHash, microSegAssinatura, microSegHibrida, microSegPrincipios, microSegAcesso, microSegOwasp, microSegAmeacas, microSegContinuidade, microSegIso];
export const getMicroLesson = (chapterId: string, sectionId: string) => microSeries(chapterId, sectionId)[0];
/** Títulos das aulas em série de um trecho (para montar a trilha). */
export const seriesOf = (chapterId: string, sectionId: string) => microSeries(chapterId, sectionId).map((m) => ({ id: m.id, title: m.title }));
/** Aulas do trecho, em ordem (uma só, quando o trecho não foi dividido em série). */
export function microSeries(chapterId: string, sectionId: string): MicroLesson[] {
  return microLessons.filter((m) => m.chapterId === chapterId && m.sectionId === sectionId).sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));
}

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
export { teachers, teacherPosts, teacherForChapter } from './teachers';
export type { FictionalTeacher, TeacherPost } from './teachers';

// Aulas visuais narradas (pacote v4, etapa 3): alternativa à aula em texto, com voz e cenas.
import { narradaHistoriaComputador, narradaQuatroTarefas } from './narrated/prim-computador';
import { narradaSomarInteiros } from './narrated/mat-somar-inteiros';
import type { NarratedLesson } from './narrated/types';
import { narratedFromMicro } from '@/lib/narrate';
const handmadeNarrated: NarratedLesson[] = [narradaHistoriaComputador, narradaQuatroTarefas, narradaSomarInteiros];
/**
 * Trilha integrada (26/10/2026): a primeira aula de cada trecho (a da história) ganha uma versão
 * narrada gerada do próprio texto da aula (lib/narrate.ts), quando ainda não há uma feita à mão.
 */
const autoNarrated: NarratedLesson[] = journey.flatMap((c) =>
  c.sections
    .map((s) => microSeries(c.id, s.id)[0])
    .filter((m): m is MicroLesson => !!m && m.series?.order === 1 && !handmadeNarrated.some((h) => h.lessonId === m.id))
    .map(narratedFromMicro),
);
export const narratedLessons: NarratedLesson[] = [...handmadeNarrated, ...autoNarrated];
export const getNarrated = (id: string) => narratedLessons.find((n) => n.id === id);
export const narratedFor = (lessonId: string) => narratedLessons.find((n) => n.lessonId === lessonId);

// Feed didático (pacote v4, etapa 4): as aulas em texto, na ordem da trilha, viram posts.
import { postsOfLesson, type FeedPost } from '@/lib/feed';
import type { TrailExtras } from '@/lib/pace';
import { terminalLabs } from '@/lib/terminal';
import { teacherPosts as _tips } from './teachers';
import { curatedVideos as _videos } from './estudos/materiais';
import { feedImages } from './estudos/imagens';
/** Aulas do feed, na ordem da trilha (capítulos, trechos e aulas da série). */
export const feedLessons: MicroLesson[] = journey.flatMap((c) => c.sections.flatMap((s) => microSeries(c.id, s.id)));
const feedCache = new Map<string, FeedPost[]>();
export function feedPostsOf(lessonId: string): FeedPost[] {
  const m = feedLessons.find((x) => x.id === lessonId);
  if (!m) return [];
  if (!feedCache.has(lessonId)) {
    const series = microSeries(m.chapterId, m.sectionId);
    const last = series[series.length - 1]?.id === m.id;
    feedCache.set(
      lessonId,
      postsOfLesson(m, {
        videos: _videos.filter((v) => v.lessonId === m.id),
        narrated: narratedFor(m.id),
        // Dicas do trecho entram no fim da última aula dele (tudo o que citam já foi ensinado).
        tips: last ? _tips.filter((t) => t.chapterId === m.chapterId && t.sectionId === m.sectionId) : [],
        images: feedImages,
      }),
    );
  }
  return feedCache.get(lessonId)!;
}

/**
 * Lugar de um conteúdo na trilha (sequência única, 25/10/2026): bibliotecas por tipo (vídeos, aulas
 * narradas, feed) mostram de que aula o item faz parte e levam até ela.
 */
export function trailPlaceOf(lessonId: string): { to: string; label: string } | undefined {
  const m = microLessons.find((x) => x.id === lessonId);
  if (!m) return undefined;
  const c = getChapter(m.chapterId);
  const series = microSeries(m.chapterId, m.sectionId);
  const i = series.indexOf(m);
  const where = series.length > 1 ? `Aula ${i + 1} de ${series.length}: ${m.title}` : m.title;
  return { to: `/aprender/${m.chapterId}/${m.sectionId}${series.length > 1 ? `/${m.id}` : ''}`, label: `${c?.title ?? ''} · ${where}` };
}

/** Materiais encaixados na trilha, na ordem lógica de cada trecho (ver courseUnits). */
export const trailExtras: TrailExtras = {
  narratedFor: (lessonId) => narratedFor(lessonId),
  videosFor: (chapterId, sectionId) => {
    // Vídeo sem sectionId é material de apoio do capítulo inteiro: aparece uma vez,
    // no primeiro trecho, e não se replica em todas as seções do mesmo capítulo.
    const firstSectionId = chapterMap.get(chapterId)?.sections[0]?.id;
    return _videos.filter((v) =>
      v.chapterId === chapterId &&
      (v.sectionId ? v.sectionId === sectionId : sectionId === firstSectionId),
    );
  },
  postsLessonFor: (chapterId, sectionId) => {
    const first = microSeries(chapterId, sectionId)[0];
    return first && feedPostsOf(first.id).length ? first.id : undefined;
  },
  labsFor: (chapterId, sectionId) => terminalLabs
    .filter((lab) => lab.chapterId === chapterId && lab.sectionId === sectionId)
    .map((lab) => ({ id: lab.id, title: lab.title })),
  officeFor: (chapterId, sectionId) => chapterId === 'cap.infra.03' && sectionId === 'processos'
    ? [
        { id: 'triagem', title: 'Fase 1 · Triagem e coleta de evidências' },
        { id: 'diagnostico', title: 'Fase 2 · Diagnóstico da causa' },
        { id: 'fechamento', title: 'Fase 3 · Intervenção, verificação e fechamento' },
      ]
    : [],
  hasCards: (chapterId) => flashcards.some((f) => f.chapterId === chapterId),
};
