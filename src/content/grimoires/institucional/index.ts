import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-cf/01-administracao-publica.md?raw';
import c1s2 from './cap01-cf/02-servidores.md?raw';
import c1s3 from './cap01-cf/03-fiscalizacao.md?raw';
import c2s1 from './cap02-goias/01-tce-go.md?raw';
import c2s2 from './cap02-goias/02-pessoal.md?raw';
import c2s3 from './cap02-goias/03-etica-resolucoes.md?raw';

export const grimorioInstitucional: Grimoire = {
  id: 'grim.institucional',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'cg.legislacao',
  title: 'Legislação Institucional',
  description: 'Principais normas e sua aplicação: a Administração Pública e o controle externo na Constituição Federal, a Constituição do Estado de Goiás, a Lei Orgânica e o Regimento do TCE-GO, as carreiras, o estatuto dos servidores, o Código de Ética e as políticas internas do Tribunal.',
  chapterIds: ['cap.inst.01', 'cap.inst.02'],
};

export const capInstCf: Chapter = {
  id: 'cap.inst.01',
  grimoireId: 'grim.institucional',
  number: 1,
  title: 'A Constituição e o Controle',
  subtitle: 'Administração Pública (arts. 37 a 41) e fiscalização (arts. 70 a 75)',
  topicIds: ['cg.legislacao.cf'],
  review: 'nao-revisado',
  estimatedMinutes: 50,
  sections: [
    { id: 'administracao-publica', title: '1. Princípios e regras do art. 37', body: c1s1 },
    { id: 'servidores', title: '2. Mandato eletivo e estabilidade (arts. 38 a 41)', body: c1s2 },
    { id: 'fiscalizacao', title: '3. Fiscalização e controle (arts. 70 a 75)', body: c1s3 },
  ],
  glossary: [
    { term: 'LIMPE', definition: 'Legalidade, impessoalidade, moralidade, publicidade e eficiência (CF, art. 37, caput).' },
    { term: 'Validade do concurso', definition: 'Até dois anos, prorrogável uma vez, por igual período (art. 37, III).' },
    { term: 'Função de confiança', definition: 'Exercida exclusivamente por ocupante de cargo efetivo; só direção, chefia e assessoramento.' },
    { term: 'Responsabilidade objetiva', definition: 'Pessoas de direito público e privadas prestadoras de serviço público respondem pelos danos de seus agentes, com regresso em dolo ou culpa (art. 37, § 6º).' },
    { term: 'Estabilidade', definition: 'Após três anos de efetivo exercício em cargo efetivo provido por concurso, com avaliação especial de desempenho (art. 41).' },
    { term: 'Parecer prévio', definition: 'Opinião técnica do Tribunal sobre as contas do Chefe do Executivo, em 60 dias; quem julga é o Legislativo (art. 71, I).' },
    { term: 'Julgamento de contas', definition: 'Competência própria do Tribunal sobre administradores e responsáveis por recursos públicos (art. 71, II).' },
    { term: 'Sustação de contrato', definition: 'Ato do Legislativo; o Tribunal decide se, em 90 dias, Legislativo ou Executivo não agirem (art. 71, §§ 1º e 2º).' },
    { term: 'Título executivo', definition: 'Eficácia das decisões do Tribunal que imputam débito ou multa (art. 71, § 3º).' },
    { term: 'Denúncia ao Tribunal', definition: 'Qualquer cidadão, partido político, associação ou sindicato é parte legítima (art. 74, § 2º).' },
    { term: 'Sete conselheiros', definition: 'Composição dos Tribunais de Contas estaduais (art. 75, parágrafo único).' },
    { term: 'Súmula 653 do STF', definition: 'Nos TCEs, quatro conselheiros escolhidos pela Assembleia e três pelo Governador (um auditor, um do MP de Contas, um livre).' },
  ],
  references: [
    { title: 'Constituição da República Federativa do Brasil de 1988', detail: 'Arts. 37 a 41 e 70 a 75, texto compilado no portal do Planalto.' },
    { title: 'Emenda Constitucional nº 122/2022', detail: 'Elevou para menos de setenta anos a idade máxima para nomeação de Ministros do TCU.' },
    { title: 'STF, Súmula 653 e Súmula Vinculante 3', detail: 'Composição dos TCEs; contraditório nos processos dos Tribunais de Contas.' },
    { title: 'DI PIETRO, M. S. Z.', detail: 'Direito Administrativo. Forense.' },
    { title: 'LIMA, L. H.', detail: 'Controle Externo: teoria e jurisprudência para os Tribunais de Contas. Método.' },
  ],
  lessonIds: ['lic.inst.01'],
};

export const capInstGoias: Chapter = {
  id: 'cap.inst.02',
  grimoireId: 'grim.institucional',
  number: 2,
  title: 'Legislação institucional',
  subtitle: 'Constituição de Goiás, Lei Orgânica, Regimento, carreiras, estatuto, ética e resoluções do TCE-GO',
  topicIds: [
    'cg.legislacao.ce-go',
    'cg.legislacao.lei-organica',
    'cg.legislacao.regimento',
    'cg.legislacao.pccr',
    'cg.legislacao.regime-juridico',
    'cg.legislacao.etica',
    'cg.legislacao.resolucoes',
  ],
  review: 'nao-revisado',
  estimatedMinutes: 40,
  sections: [
    { id: 'tce-go', title: '1. Constituição estadual, Lei Orgânica e Regimento', body: c2s1 },
    { id: 'pessoal', title: '2. Carreiras (Lei 15.122/2005) e estatuto (Lei 20.756/2020)', body: c2s2 },
    { id: 'etica-resolucoes', title: '3. Código de Ética e resoluções do Tribunal', body: c2s3 },
  ],
  glossary: [
    { term: 'Contas regulares', definition: 'Exatidão dos demonstrativos e legalidade, legitimidade e economicidade da gestão; dão quitação plena (Lei 16.168/2007, art. 72).' },
    { term: 'Contas regulares com ressalva', definition: 'Impropriedade ou falta formal sem dano ao erário (Lei 16.168/2007, art. 73).' },
    { term: 'Contas iliquidáveis', definition: 'Caso fortuito ou força maior impede o julgamento de mérito; o Tribunal ordena o trancamento (art. 77).' },
    { term: 'Multa do art. 111', definition: 'Até duas vezes o valor atualizado do dano, quando o responsável é julgado em débito.' },
    { term: 'Multa do art. 112', definition: 'Multa com teto em valor fixo, atualizado periodicamente pelo Tribunal.' },
    { term: 'Quadro efetivo do TCE-GO', definition: 'Analista, Técnico e Auxiliar de Controle Externo (Lei 15.122/2005).' },
    { term: 'Estágio probatório (GO)', definition: 'Três anos de efetivo exercício; avalia iniciativa, assiduidade e pontualidade, relacionamento, eficiência e comprometimento.' },
    { term: 'Penalidades (Lei 20.756/2020)', definition: 'Advertência, suspensão, multa, demissão, cassação de aposentadoria, cassação de disponibilidade e destituição de cargo em comissão.' },
    { term: 'RA 14/2025', definition: 'Estrutura organizacional e competências do TCE-GO; revogou a RA 19/2022.' },
    { term: 'RA 24/2024', definition: 'Uso de ferramentas de Inteligência Artificial no TCE-GO.' },
  ],
  references: [
    { title: 'Constituição do Estado de Goiás', detail: 'Arts. 25 a 28 (Tribunal de Contas). Texto compilado na Assembleia Legislativa (não consultado diretamente).' },
    { title: 'Lei estadual nº 16.168/2007', detail: 'Lei Orgânica do TCE-GO. Texto compilado na Casa Civil de Goiás (não consultado diretamente).' },
    { title: 'Resolução nº 22/2008 (TCE-GO)', detail: 'Regimento Interno, no sistema GNOI (não consultado diretamente).' },
    { title: 'Leis estaduais nº 15.122/2005 e nº 20.756/2020', detail: 'PCCR dos servidores do TCE-GO e regime jurídico dos servidores civis de Goiás (não consultados diretamente).' },
    { title: 'TCE-GO, RA 1/2014, Resolução 6/2026 e resoluções do edital', detail: 'Código de Ética e RA 14/2025, 17/2024, 24/2024, 5/2024, 19/2024, 15/2024 e RN 5/2024 (não consultados diretamente).' },
  ],
  lessonIds: ['lic.inst.02'],
};

export const licoesInstitucional: Lesson[] = [
  {
    id: 'lic.inst.01',
    chapterId: 'cap.inst.01',
    title: 'O Juramento da Carta',
    goal: 'Princípios e regras do art. 37, mandato eletivo e estabilidade, e as competências do controle externo nos arts. 70 a 75.',
    cards: [
      { title: 'Art. 37', body: '**LIMPE**. Concurso: **até 2 anos, prorroga 1 vez**. Função de confiança: **só efetivos**.\n\nAcumula: **2 professor**, **professor + técnico/científico**, **2 saúde**. Improbidade: **suspensão** dos direitos políticos. § 6º: responsabilidade **objetiva**, regresso por dolo ou culpa.' },
      { title: 'Arts. 38 a 41', body: 'Vereador com horário compatível **acumula**; Prefeito **opta**.\n\nEstável após **3 anos** + **avaliação especial**. Perde o cargo por sentença transitada, PAD ou **avaliação periódica** (LC). Disponibilidade: remuneração **proporcional**.' },
      { title: 'Arts. 70 a 75', body: 'Presidente: **aprecia** (parecer em **60 dias**). Gestores: **julga**.\n\nAto: Tribunal **susta**. Contrato: **Legislativo**; Tribunal decide após **90 dias**. Débito e multa: **título executivo**.\n\nTCU **9** Ministros (1/3 Presidente, 2/3 Congresso). TCE **7** Conselheiros.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.inst.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.inst.02',
    chapterId: 'cap.inst.02',
    title: 'Fontes e referências institucionais',
    goal: 'O TCE-GO na Constituição estadual e na Lei Orgânica, julgamento de contas e sanções, carreiras, estatuto goiano, ética e resoluções.',
    cards: [
      { title: 'TCE-GO e Lei Orgânica', body: '**7 conselheiros**, sede na Capital. Contas do Governador: parecer em **60 dias**.\n\nRegulares: **quitação plena**. Com ressalva: falta **formal sem dano**. Iliquidáveis: **trancamento**.\n\nArt. 111: multa até **2x o dano**. Art. 112: teto em valor fixo.' },
      { title: 'Pessoal', body: 'Quadro: **Analista, Técnico e Auxiliar** de Controle Externo.\n\nEstágio probatório: **3 anos**. Penalidades: **7**, incluindo **multa** (aposentado ou em disponibilidade); suspensão até **90 dias**.' },
      { title: 'Normas internas', body: 'RA **14/2025** estrutura; RA **17/2024** segurança; RN **5/2024** dados pessoais; RA **24/2024** IA; RA **5/2024** pessoas; RA **19/2024** comunicação; RA **15/2024** planejamento e gestão.\n\nCódigo de Ética: RA 1/2014, atualizado pela Resolução 6/2026.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.inst.02.${String(i + 1).padStart(3, '0')}`),
  },
];
