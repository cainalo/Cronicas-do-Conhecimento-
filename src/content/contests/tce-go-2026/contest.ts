import type { Contest } from '@/content/types';

// ATENÇÃO: em 17/10/2026 o edital oficial (FCC / TCE-GO) não pôde ser lido diretamente porque a
// rede do ambiente de desenvolvimento bloqueou os domínios oficiais. Os dados abaixo vêm de fontes
// secundárias concordantes e estão marcados como 'fonte-secundaria' até a conferência no Anexo II.
// Ver docs/CONTENT_AND_EDITAL.md.

export const tceGo2026: Contest = {
  id: 'tce-go-2026-tecnico-ti',
  name: 'TCE-GO 2026',
  role: 'Técnico de Controle Externo — Tecnologia da Informação',
  board: 'Fundação Carlos Chagas (FCC)',
  examDate: '2027-01-17',
  facts: [
    { label: 'Vagas (TI)', value: '10', status: 'fonte-secundaria' },
    { label: 'Remuneração inicial', value: 'R$ 11.862,19', status: 'fonte-secundaria' },
    { label: 'Escolaridade', value: 'Ensino médio completo', status: 'fonte-secundaria' },
    { label: 'Inscrições', value: '5/10/2026 a 6/11/2026', status: 'fonte-secundaria' },
    { label: 'Taxa', value: 'R$ 100,00', status: 'fonte-secundaria' },
    { label: 'Prova', value: '17/01/2027 (prevista)', status: 'fonte-secundaria' },
  ],
  exam: [
    {
      title: 'Prova objetiva — 70 questões',
      detail: '25 de Conhecimentos Gerais (peso 1) e 45 de Conhecimentos Específicos (peso 2).',
      status: 'fonte-secundaria',
    },
    {
      title: 'Prova discursiva — Estudo de caso',
      detail:
        'Uma questão prática sobre Conhecimentos Específicos de TI, com solução apresentada por escrito. Nota mínima reportada: 50 pontos. Número de linhas e critérios de correção: não confirmados.',
      status: 'fonte-secundaria',
    },
    {
      title: 'Duração',
      detail: 'Objetiva e discursiva no mesmo dia e período, com duração prevista de 4h30.',
      status: 'fonte-secundaria',
    },
  ],
  disciplines: [
    {
      id: 'cg.portugues',
      title: 'Língua Portuguesa',
      block: 'gerais',
      questions: 10,
      questionsStatus: 'nao-confirmado',
      topics: [{ id: 'cg.portugues.geral', title: 'Compreensão de textos, ortografia, crase, redação oficial (itens a confirmar)', status: 'fonte-secundaria' }],
    },
    {
      id: 'cg.matematica',
      title: 'Matemática e Raciocínio Lógico',
      block: 'gerais',
      questions: 10,
      questionsStatus: 'nao-confirmado',
      topics: [{ id: 'cg.matematica.geral', title: 'Itens a confirmar no Anexo II', status: 'nao-confirmado' }],
    },
    {
      id: 'cg.legislacao',
      title: 'Legislação Institucional',
      block: 'gerais',
      questions: 5,
      questionsStatus: 'nao-confirmado',
      topics: [
        { id: 'cg.legislacao.lei-organica', title: 'Lei Orgânica do TCE-GO', status: 'fonte-secundaria' },
        { id: 'cg.legislacao.ra-14-2025', title: 'Resolução Administrativa nº 14/2025 (estrutura organizacional)', status: 'fonte-secundaria' },
        { id: 'cg.legislacao.ra-24-2024', title: 'Resolução Administrativa nº 24/2024 (uso de ferramentas de IA)', status: 'fonte-secundaria' },
        { id: 'cg.legislacao.ra-5-2024', title: 'Resolução Administrativa nº 5/2024 (Política de Gestão de Pessoas)', status: 'fonte-secundaria' },
      ],
    },
    {
      id: 'ti.seguranca',
      title: 'Segurança da Informação',
      block: 'especificos',
      topics: [
        { id: 'ti.seguranca.criptografia', title: 'Criptografia', status: 'fonte-secundaria' },
        { id: 'ti.seguranca.owasp', title: 'OWASP Top 10', status: 'fonte-secundaria' },
        { id: 'ti.seguranca.devsecops', title: 'DevSecOps', status: 'fonte-secundaria' },
        { id: 'ti.seguranca.zero-trust', title: 'Zero Trust', status: 'fonte-secundaria' },
        { id: 'ti.seguranca.iso27000', title: 'Família ISO/IEC 27000', status: 'fonte-secundaria' },
      ],
    },
    {
      id: 'ti.ia',
      title: 'Inteligência Artificial (dois blocos)',
      block: 'especificos',
      questions: 9,
      questionsStatus: 'fonte-secundaria',
      topics: [
        { id: 'ti.ia.llm', title: 'Modelos de linguagem e IA generativa', status: 'fonte-secundaria' },
        { id: 'ti.ia.prompt', title: 'Engenharia de prompts e de contexto', status: 'fonte-secundaria' },
        { id: 'ti.ia.rag', title: 'Geração aumentada por recuperação (RAG)', status: 'fonte-secundaria' },
        { id: 'ti.ia.mcp', title: 'Model Context Protocol (MCP) e agentes de codificação', status: 'fonte-secundaria' },
      ],
    },
    {
      id: 'ti.infra',
      title: 'Sistemas Operacionais, Redes e Computação em Nuvem',
      block: 'especificos',
      questions: 5,
      questionsStatus: 'fonte-secundaria',
      topics: [
        { id: 'ti.infra.so', title: 'Windows e Linux', status: 'fonte-secundaria' },
        { id: 'ti.infra.redes', title: 'Redes e TCP/IP', status: 'fonte-secundaria' },
        { id: 'ti.infra.nuvem', title: 'Computação em nuvem (IaaS, PaaS, SaaS)', status: 'fonte-secundaria' },
      ],
    },
    {
      id: 'ti.governanca',
      title: 'Governança de TI',
      block: 'especificos',
      questions: 4,
      questionsStatus: 'fonte-secundaria',
      topics: [
        { id: 'ti.governanca.cobit', title: 'COBIT 2019', status: 'fonte-secundaria' },
        { id: 'ti.governanca.itil', title: 'ITIL 4', status: 'fonte-secundaria' },
        { id: 'ti.governanca.pmbok', title: 'PMBOK (8ª edição)', status: 'fonte-secundaria' },
      ],
    },
    {
      id: 'ti.legislacao',
      title: 'Legislação Aplicada à TI',
      block: 'especificos',
      questions: 4,
      questionsStatus: 'fonte-secundaria',
      topics: [{ id: 'ti.legislacao.14133', title: 'Contratações de TIC na Lei nº 14.133/2021', status: 'fonte-secundaria' }],
    },
    {
      id: 'ti.engsoft',
      title: 'Engenharia de Software e Desenvolvimento',
      block: 'especificos',
      questions: 4,
      questionsStatus: 'nao-confirmado',
      topics: [{ id: 'ti.engsoft.geral', title: 'Itens a confirmar no Anexo II', status: 'nao-confirmado' }],
    },
    {
      id: 'ti.dados',
      title: 'Banco de Dados e Ciência de Dados',
      block: 'especificos',
      topics: [{ id: 'ti.dados.geral', title: 'Itens a confirmar no Anexo II', status: 'fonte-secundaria' }],
    },
    {
      id: 'ti.ingles',
      title: 'Língua Inglesa (leitura técnica)',
      block: 'especificos',
      questions: 2,
      questionsStatus: 'fonte-secundaria',
      topics: [{ id: 'ti.ingles.leitura', title: 'Compreensão de textos técnicos', status: 'fonte-secundaria' }],
    },
  ],
  sources: [
    {
      title: 'TCE-GO — notícia de abertura do concurso',
      url: 'https://portal.tce.go.gov.br/-/concurso-publico-tce-go-abre-inscricoes-para-vagas-com-salario-de-r-11-8-mil',
      kind: 'oficial',
      accessed: '2026-10-17',
      note: 'Não acessível do ambiente de desenvolvimento (rede bloqueada). Pendente de leitura.',
    },
    {
      title: 'FCC — página do concurso (edital, anexos, retificações)',
      url: 'https://www.concursosfcc.com.br/concursos/tcego125/index.html',
      kind: 'oficial',
      accessed: '2026-10-17',
      note: 'Não acessível do ambiente de desenvolvimento (rede bloqueada). Pendente de leitura.',
    },
    { title: 'Gran Cursos — retificação detalha provas e conteúdos', url: 'https://blog.grancursosonline.com.br/concurso-tce-go-retificacao-detalha-provas-e-conteudos/', kind: 'secundaria', accessed: '2026-10-17' },
    { title: 'Estratégia Concursos — retificação do edital', url: 'https://www.estrategiaconcursos.com.br/blog/concurso-tce-go-2026-retificacao/', kind: 'secundaria', accessed: '2026-10-17' },
    { title: 'Cursos do Portal — edital e preparação para a FCC', url: 'https://cursosdoportal.com.br/noticias/concurso-tce-go-2026-edital-e-preparacao-para-a-fcc', kind: 'secundaria', accessed: '2026-10-17' },
    { title: 'Você Concursado — edital verticalizado', url: 'https://voceconcursado.com.br/blog/edital-verticalizado-tce-go-2026/', kind: 'secundaria', accessed: '2026-10-17' },
  ],
  editalVersions: [
    { id: 'edital-01-2026', title: 'Edital nº 01/2026 — abertura', date: '2026', summary: 'Previa 25 questões gerais e 45 específicas sem detalhar a divisão por disciplina.', status: 'fonte-secundaria' },
    {
      id: 'edital-02-2026',
      title: 'Edital nº 02/2026 — retificação (DOE-GO de 16/09/2026)',
      date: '2026-09-16',
      summary: 'Detalha a distribuição por disciplina e altera Legislação Institucional (comum) e Noções de Administração Pública (só Técnico Administrativo). Não há relato de mudança nos específicos de TI.',
      status: 'fonte-secundaria',
    },
  ],
};
