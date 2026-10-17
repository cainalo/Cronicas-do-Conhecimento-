import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-dados/01-lgpd.md?raw';
import c1s2 from './cap01-dados/02-marco-civil.md?raw';
import c2s1 from './cap02-normas/01-contratacoes-certificacao.md?raw';
import c2s2 from './cap02-normas/02-goias-tce.md?raw';

export const grimorioLegislacao: Grimoire = {
  id: 'grim.legislacao',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.legislacao',
  title: 'O Livro das Leis do Reino',
  epithet: 'Grimório de Legislação Aplicada à TI',
  description: 'As leis que todo sistema deve obedecer: LGPD aplicada ao código, Marco Civil da Internet, segurança nas contratações, certificação digital e as normas de Goiás e do próprio Tribunal.',
  chapterIds: ['cap.leg.01', 'cap.leg.02'],
  sigil: 'pena',
  binding: 'noite',
};

export const capLegDados: Chapter = {
  id: 'cap.leg.01',
  grimoireId: 'grim.legislacao',
  number: 1,
  title: 'Dados Pessoais e Internet',
  subtitle: 'LGPD nos sistemas e Marco Civil da Internet',
  topicIds: ['ti.legislacao.lgpd', 'ti.legislacao.marco-civil'],
  review: 'nao-revisado',
  estimatedMinutes: 35,
  sections: [
    { id: 'lgpd', title: '1. LGPD aplicada a sistemas', body: c1s1 },
    { id: 'marco-civil', title: '2. Marco Civil da Internet', body: c1s2 },
  ],
  glossary: [
    { term: 'Dado pessoal sensível', definition: 'Origem racial ou étnica, religião, opinião política, filiação sindical, saúde, vida sexual, genético ou biométrico.' },
    { term: 'Controlador', definition: 'Quem toma as decisões sobre o tratamento de dados pessoais.' },
    { term: 'Operador', definition: 'Quem trata dados pessoais em nome do controlador.' },
    { term: 'Princípio da necessidade', definition: 'Tratar só o mínimo necessário à finalidade: base da minimização.' },
    { term: 'Privacy by design', definition: 'Proteção de dados desde a concepção do produto ou serviço (LGPD, art. 46, § 2º).' },
    { term: 'Privacy by default', definition: 'Configuração inicial mais protetiva, sem exigir ação do titular.' },
    { term: 'Anonimização', definition: 'O dado perde a associação a um indivíduo; deixa de ser dado pessoal.' },
    { term: 'Pseudonimização', definition: 'Associação só possível com informação adicional guardada à parte; continua dado pessoal.' },
    { term: 'Neutralidade de rede', definition: 'Tratamento isonômico dos pacotes, sem distinção por conteúdo, origem, destino, serviço, terminal ou aplicação.' },
    { term: 'Registro de conexão', definition: 'Início, término, duração e IP da conexão; guardado 1 ano pelo provedor de conexão.' },
    { term: 'Registro de acesso a aplicações', definition: 'Data e hora de uso de aplicação a partir de um IP; guardado 6 meses.' },
  ],
  references: [
    { title: 'Lei nº 13.709/2018', detail: 'Lei Geral de Proteção de Dados Pessoais (LGPD).' },
    { title: 'Resolução CD/ANPD nº 15/2024', detail: 'Regulamento de comunicação de incidente de segurança.' },
    { title: 'Lei nº 12.965/2014', detail: 'Marco Civil da Internet.' },
    { title: 'Decreto nº 8.771/2016', detail: 'Regulamenta o Marco Civil (neutralidade, guarda e proteção de dados).' },
  ],
  lessonIds: ['lic.leg.01'],
};

export const capLegNormas: Chapter = {
  id: 'cap.leg.02',
  grimoireId: 'grim.legislacao',
  number: 2,
  title: 'Contratações, Certificação e Normas de Goiás',
  subtitle: 'Segurança nos contratos, ICP-Brasil e os normativos do Tribunal',
  topicIds: ['ti.legislacao.contratacoes', 'ti.legislacao.goias', 'ti.legislacao.tce'],
  review: 'nao-revisado',
  estimatedMinutes: 30,
  sections: [
    { id: 'contratacoes-certificacao', title: '1. Segurança em contratações e certificação digital', body: c2s1 },
    { id: 'goias-tce', title: '2. LC estadual 205/2025 e normativos do TCE-GO', body: c2s2 },
  ],
  glossary: [
    { term: 'Termo de compromisso de sigilo', definition: 'Assinado pelo representante da contratada, obriga a manter o sigilo das informações.' },
    { term: 'Termo de ciência', definition: 'Assinado pelos profissionais da contratada, declarando conhecer as obrigações de sigilo.' },
    { term: 'ICP-Brasil', definition: 'Cadeia de certificação com validade jurídica no país (MP 2.200-2/2001); AC Raiz: ITI.' },
    { term: 'Certificado A3', definition: 'Chave privada em hardware criptográfico (token ou cartão).' },
    { term: 'Assinatura qualificada', definition: 'Feita com certificado ICP-Brasil (Lei 14.063/2020).' },
    { term: 'Carimbo do tempo', definition: 'Comprova a data e a hora em que um documento foi assinado.' },
    { term: 'CETI', definition: 'Comitê Estratégico de TI do TCE-GO (RN 13/2016); aprova o PDTI.' },
    { term: 'LC estadual 205/2025', definition: 'Política Estadual de Fomento à Inovação em Inteligência Artificial de Goiás.' },
  ],
  references: [
    { title: 'IN SGD/ME nº 94/2022', detail: 'Contratação de soluções de TIC.' },
    { title: 'IN GSI/PR nº 5/2021', detail: 'Requisitos mínimos de segurança para uso de nuvem por órgãos federais.' },
    { title: 'MP nº 2.200-2/2001 e Lei nº 14.063/2020', detail: 'ICP-Brasil; tipos de assinatura eletrônica.' },
    { title: 'Lei Complementar estadual nº 205/2025 (GO)', detail: 'Texto oficial na Casa Civil de Goiás (não consultado diretamente).' },
    { title: 'TCE-GO, portal de normativos (GNOI)', detail: 'RN 13/2016, RA 14/2024, RA 17/2024, RA 14/2025 e PDTI 2025–2026 (não consultados diretamente).' },
  ],
  lessonIds: ['lic.leg.02'],
};

export const licoesLegislacao: Lesson[] = [
  {
    id: 'lic.leg.01',
    chapterId: 'cap.leg.01',
    title: 'Os Segredos dos Súditos',
    goal: 'Conceitos e princípios da LGPD em sistemas, anonimização e pseudonimização, neutralidade e guarda de registros.',
    cards: [
      { title: 'LGPD no código', body: '**Necessidade** = minimização. **By design**: desde a concepção (art. 46, § 2º). **By default**: o padrão é o mais protetivo.\n\nAnonimizado **não** é dado pessoal; pseudonimizado **é**. Hash simples de CPF não anonimiza.' },
      { title: 'Marco Civil', body: 'Neutralidade: pacotes tratados de forma **isonômica**.\n\nConexão: **1 ano** (provedor de conexão). Aplicações: **6 meses**. Fornecer registros exige **ordem judicial**.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.leg.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.leg.02',
    chapterId: 'cap.leg.02',
    title: 'Selos, Contratos e Regimentos',
    goal: 'Segurança no ciclo da contratação de TIC, ICP-Brasil e assinaturas, LC 205/2025 e normativos do TCE-GO.',
    cards: [
      { title: 'Contratos e certificados', body: 'Segurança desde o **ETP e o TR**; termos de **sigilo** e de **ciência**; dados devolvidos e eliminados no fim.\n\nA1 em software, **A3 em token**. Qualificada = **ICP-Brasil**. Valide cadeia e revogação.' },
      { title: 'Normas de Goiás', body: '**LC 205/2025**: fomento à inovação em IA em Goiás.\n\nTCE-GO: **RN 13/2016** cria o **CETI**; RA 17/2024 = **PSI**; RA 14/2024 = governança; PDTI 2025–2026 aprovado pelo CETI.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.leg.02.${String(i + 1).padStart(3, '0')}`),
  },
];
