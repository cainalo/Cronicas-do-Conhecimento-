import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-governanca/01-governanca.md?raw';
import c1s2 from './cap01-governanca/02-itil.md?raw';
import c1s3 from './cap01-governanca/03-projetos.md?raw';
import c2s1 from './cap02-publico/01-contratacoes.md?raw';
import c2s2 from './cap02-publico/02-governo-digital.md?raw';

export const grimorioGovernanca: Grimoire = {
  id: 'grim.governanca',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.governanca',
  title: 'Governança de TI',
  description: 'Como a organização define prioridades de tecnologia: ISO/IEC 38500, COBIT 2019, ITIL 4, PMBOK 8 e métodos ágeis, contratações de TIC na Lei 14.133 e a estratégia de governo digital.',
  chapterIds: ['cap.gov.01', 'cap.gov.02'],
};

export const capGovModelos: Chapter = {
  id: 'cap.gov.01',
  grimoireId: 'grim.governanca',
  number: 1,
  title: 'Governança, Serviços e Projetos',
  subtitle: 'Quem decide, quem executa e como se mede',
  topicIds: ['ti.governanca.estrategia', 'ti.governanca.itil', 'ti.governanca.projetos'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'governanca', title: '1. Alinhamento, ISO/IEC 38500 e COBIT 2019', body: c1s1 },
    { id: 'itil', title: '2. Gestão de serviços com ITIL 4', body: c1s2 },
    { id: 'projetos', title: '3. PMBOK 8 e métodos ágeis', body: c1s3 },
  ],
  glossary: [
    { term: 'Avaliar, dirigir, monitorar', definition: 'Tarefas do órgão de governança na ISO/IEC 38500 e nome do domínio EDM do COBIT.' },
    { term: 'COBIT 2019', definition: 'Modelo da ISACA com 40 objetivos de governança (EDM) e gestão (APO, BAI, DSS, MEA).' },
    { term: 'Fatores de desenho', definition: 'Elementos do COBIT 2019 que adaptam o sistema de governança a cada organização.' },
    { term: 'PDTI', definition: 'Plano Diretor de TI: diagnóstico, metas e ações de TI alinhados ao planejamento do órgão.' },
    { term: 'Incidente', definition: 'Interrupção não planejada ou redução de qualidade de um serviço.' },
    { term: 'Problema', definition: 'Causa, real ou potencial, de um ou mais incidentes.' },
    { term: 'Erro conhecido', definition: 'Problema analisado, com causa identificada, ainda não resolvido.' },
    { term: 'Mudança padrão', definition: 'Mudança de baixo risco, conhecida e pré-autorizada.' },
    { term: 'Item de configuração', definition: 'Componente que precisa ser gerenciado para entregar um serviço; registrado no CMDB.' },
    { term: 'Caminho crítico', definition: 'Sequência mais longa de atividades dependentes; folga zero.' },
    { term: 'Product Owner', definition: 'Responsável por maximizar o valor do produto e gerir o Product Backlog.' },
    { term: 'Limite de WIP', definition: 'Teto de trabalho em progresso por etapa no Kanban.' },
  ],
  references: [
    { title: 'ISO/IEC 38500:2024', detail: 'Information technology — Governance of IT for the organization.' },
    { title: 'ISACA', detail: 'COBIT 2019 Framework: Introduction and Methodology; Governance and Management Objectives.' },
    { title: 'AXELOS / PeopleCert', detail: 'ITIL Foundation, ITIL 4 Edition.' },
    { title: 'PMI', detail: 'Guia PMBOK, 8ª edição (2025).' },
    { title: 'SCHWABER, K.; SUTHERLAND, J.', detail: 'O Guia do Scrum (2020).' },
  ],
  lessonIds: ['lic.gov.01'],
};

export const capGovPublico: Chapter = {
  id: 'cap.gov.02',
  grimoireId: 'grim.governanca',
  number: 2,
  title: 'Contratações e Governo Digital',
  subtitle: 'Comprar tecnologia e servir o cidadão pela tela',
  topicIds: ['ti.governanca.contratacoes', 'ti.governanca.governo-digital'],
  review: 'nao-revisado',
  estimatedMinutes: 30,
  sections: [
    { id: 'contratacoes', title: '1. Contratações de TIC na Lei 14.133/2021', body: c2s1 },
    { id: 'governo-digital', title: '2. Lei do Governo Digital e ENGD 2024–2027', body: c2s2 },
  ],
  glossary: [
    { term: 'ETP', definition: 'Estudo Técnico Preliminar: demonstra o problema, as alternativas e a solução escolhida.' },
    { term: 'Termo de Referência', definition: 'Descreve o objeto a contratar, a forma de medição e as obrigações.' },
    { term: 'Bens e serviços comuns', definition: 'Aqueles com padrões definíveis por especificações usuais de mercado; regra: pregão.' },
    { term: 'Diálogo competitivo', definition: 'Modalidade para objetos com inovação, em que a solução é construída em diálogo com licitantes.' },
    { term: 'Pagamento por resultado', definition: 'Remuneração vinculada a entregas e níveis de serviço, não a horas trabalhadas.' },
    { term: 'Sistemas estruturantes', definition: 'Contrato de operação continuada pode durar até 15 anos (Lei 14.133).' },
    { term: 'Governo como plataforma', definition: 'Estado que oferece dados e serviços reutilizáveis para outros criarem soluções.' },
    { term: 'ENGD 2024–2027', definition: 'Estratégia Nacional de Governo Digital, instituída pelo Decreto 12.069/2024.' },
  ],
  references: [
    { title: 'Lei nº 14.133/2021', detail: 'Licitações e contratos administrativos.' },
    { title: 'IN SGD/ME nº 94/2022', detail: 'Contratação de soluções de TIC no SISP.' },
    { title: 'Lei nº 14.129/2021', detail: 'Lei do Governo Digital.' },
    { title: 'Decreto nº 12.069/2024', detail: 'Estratégia Nacional de Governo Digital 2024–2027 e Rede Gov.br.' },
  ],
  lessonIds: ['lic.gov.02'],
};

export const licoesGovernanca: Lesson[] = [
  {
    id: 'lic.gov.01',
    chapterId: 'cap.gov.01',
    title: 'Governança, gestão e frameworks',
    goal: 'Governança × gestão, ISO/IEC 38500, COBIT 2019, práticas do ITIL 4, PMBOK 8 e Scrum.',
    cards: [
      { title: 'Governar × gerir', body: 'Governança **avalia, dirige e monitora** (ISO/IEC 38500; domínio **EDM** do COBIT).\n\nCOBIT 2019: **40 objetivos**; EDM 5, APO 14, BAI 11, DSS 6, MEA 4.' },
      { title: 'ITIL 4', body: '**Incidente**: restaurar rápido. **Problema**: achar a causa. **Erro conhecido**: causa achada, sem solução definitiva.\n\nMudança **padrão** é pré-autorizada. Catálogo = parte do portfólio em operação.' },
      { title: 'Projetos', body: 'PMBOK 8: **6 princípios**, **7 domínios**, 5 áreas de foco, 40 processos.\n\nScrum: PO gere o backlog; Sprint até 1 mês; Daily 15 min. Kanban limita o **WIP**.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.gov.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.gov.02',
    chapterId: 'cap.gov.02',
    title: 'Governança e Serviços Públicos',
    goal: 'Fases da contratação de TIC, ETP e TR, modalidades, pagamento por resultado, Lei do Governo Digital e ENGD.',
    cards: [
      { title: 'Contratar TIC', body: '**ETP** (problema e solução) → **TR** (objeto e medição) → seleção → gestão.\n\nBens comuns: **pregão**. Inovação: **diálogo competitivo**. Pague por **resultado**, não por hora.' },
      { title: 'Governo digital', body: 'Lei 14.129: serviços digitais, dados abertos, linguagem clara, interoperabilidade; nos entes, vale se **adotada por ato próprio**.\n\nENGD 2024–2027: quadrienal, com o PPA; Rede Gov.br.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.gov.02.${String(i + 1).padStart(3, '0')}`),
  },
];
