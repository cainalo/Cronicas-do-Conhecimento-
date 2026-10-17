import type { Contest, Discipline, SourceStatus, Topic } from '@/content/types';

// Fonte: Edital nº 01/2026 — Abertura de Inscrições (RETIFICADO), versão consolidada de 15/09/2026,
// cópia em docs/fontes/. Tópicos agrupados a partir do texto literal do Anexo II (cargo B02).

const OF: SourceStatus = 'oficial-verificado';
const t = (id: string, title: string): Topic => ({ id, title, status: OF });
const d = (id: string, title: string, block: Discipline['block'], questions: number, topics: Topic[]): Discipline => ({
  id,
  title,
  block,
  questions,
  questionsStatus: OF,
  topics,
});

export const tceGo2026: Contest = {
  id: 'tce-go-2026-tecnico-ti',
  name: 'TCE-GO 2026',
  role: 'Técnico de Controle Externo — Especialidade: Tecnologia da Informação (código B02)',
  board: 'Fundação Carlos Chagas (FCC)',
  examDate: '2027-01-17',
  facts: [
    { label: 'Vagas (B02)', value: '10 (1 PcD, 2 negros)', status: OF },
    { label: 'Vencimento inicial', value: 'R$ 11.862,19', status: OF },
    { label: 'Escolaridade', value: 'Ensino médio completo', status: OF },
    { label: 'Inscrições', value: '05/10 a 06/11/2026 (pagamento até 09/11)', status: OF },
    { label: 'Taxa', value: 'R$ 100,00', status: OF },
    { label: 'Provas', value: '17/01/2027, em Goiânia/GO (prevista)', status: OF },
    { label: 'Convocação para as provas', value: '11/12/2026 (prevista)', status: OF },
    { label: 'Gabarito preliminar', value: '18/01/2027, a partir das 17h', status: OF },
  ],
  exam: [
    {
      title: 'Prova objetiva — 70 questões de 5 alternativas',
      detail:
        'Conhecimentos Gerais: 25 questões, peso 1. Conhecimentos Específicos: 45 questões, peso 2. Ambas eliminatórias e classificatórias. As questões podem avaliar compreensão, aplicação e análise, e contemplar mais de um objeto de avaliação (item 7.3).',
      status: OF,
    },
    {
      title: 'Nota da objetiva — escore padronizado',
      detail:
        'Cada prova vira nota padronizada NP = [(A − média do grupo) / desvio padrão] × 10 + 50, multiplicada pelo peso. Habilitado: soma das NPs ponderadas ≥ 150 (itens 9.3 a 9.5). Ou seja, o resultado depende do desempenho relativo ao grupo, não de um percentual fixo de acertos.',
      status: OF,
    },
    {
      title: 'Prova Discursiva — Estudo de Caso',
      detail:
        '1 questão prática com solução por escrito sobre os Conhecimentos Específicos (as disciplinas podem estar inter-relacionadas). Avalia domínio do tema, experiência prévia e adequação às atribuições do cargo. Nota de 0 a 100; habilitado com ≥ 50. Limite de linhas definido na própria questão. Corrigida apenas para os habilitados na objetiva até a 48ª posição (ampla), 12ª (negros) e todos os PcD habilitados (Capítulo 11).',
      status: OF,
    },
    {
      title: 'Nota zero na discursiva',
      detail:
        'Fuga ao tema; texto não articulado verbalmente; identificação do candidato; em branco; letra ilegível; assinatura fora do local; não atender à grade de correção da banca. Cópia de textos públicos ou da própria prova pode reduzir drasticamente a nota (11.12 e 11.15).',
      status: OF,
    },
    {
      title: 'Aplicação e duração',
      detail:
        'Objetiva e discursiva no mesmo dia e período. O edital não fixa a duração total; ela constará do Edital de Convocação. Só é permitido sair após 3 horas do início.',
      status: OF,
    },
    {
      title: 'Nota final e desempate',
      detail: 'Soma das notas ponderadas das objetivas + nota do Estudo de Caso. Primeiro critério de desempate para TI: maior nota no Estudo de Caso.',
      status: OF,
    },
  ],
  disciplines: [
    d('cg.portugues', 'Língua Portuguesa', 'gerais', 10, [
      t('cg.portugues.interpretacao', 'Compreensão e interpretação de textos; contexto; denotação e conotação; discurso direto/indireto; intertextualidade; figuras de linguagem'),
      t('cg.portugues.gramatica', 'Ortografia, acentuação, crase, pontuação, pronomes, morfossintaxe, formação de palavras, sinonímia'),
      t('cg.portugues.sintaxe', 'Concordância, regência, flexões, vozes e correlação verbal, coordenação/subordinação, conectivos'),
      t('cg.portugues.redacao', 'Redação Oficial; reescrita e equivalência de frases e estruturas'),
    ]),
    d('cg.matematica', 'Matemática e Raciocínio Lógico', 'gerais', 10, [
      t('cg.matematica.aritmetica', 'Inteiros e racionais, expressões, múltiplos e divisores, frações'),
      t('cg.matematica.proporcao', 'Razões e proporções, divisão proporcional, regra de três, porcentagem, acréscimos e descontos'),
      t('cg.matematica.logica', 'Raciocínio lógico: relações arbitrárias, raciocínio verbal, matemático, sequencial, espacial/temporal, dedução'),
    ]),
    d('cg.legislacao', 'Legislação Institucional', 'gerais', 5, [
      t('cg.legislacao.cf', 'CF/88: Administração Pública; fiscalização contábil, financeira, orçamentária; controle interno e externo'),
      t('cg.legislacao.ce-go', 'Constituição do Estado de Goiás: disposições sobre o TCE-GO'),
      t('cg.legislacao.lei-organica', 'Lei Orgânica do TCE-GO (Lei estadual nº 16.168/2007)'),
      t('cg.legislacao.regimento', 'Regimento Interno do TCE-GO (Resolução nº 22/2008)'),
      t('cg.legislacao.pccr', 'Plano de Cargos, Carreiras e Remuneração (Lei estadual nº 15.122/2005)'),
      t('cg.legislacao.regime-juridico', 'Regime Jurídico dos Servidores de Goiás (Lei estadual nº 20.756/2020)'),
      t('cg.legislacao.etica', 'Código de Ética dos Servidores do TCE-GO'),
      t('cg.legislacao.resolucoes', 'Resoluções: RA 14/2025 (estrutura), RA 17/2024 (Segurança da Informação), RN 5/2024 (dados pessoais), RA 24/2024 (IA), RA 5/2024 (Gestão de Pessoas), RA 19/2024 (Comunicação), RA 15/2024 (Planejamento e Gestão)'),
    ]),
    d('ti.engsoft', 'Engenharia de Software', 'especificos', 4, [
      t('ti.engsoft.ciclo', 'Ciclo de vida: preditivo, iterativo, incremental, ágil; Scrum, Kanban, Lean, XP'),
      t('ti.engsoft.requisitos', 'Requisitos funcionais e não funcionais; histórias de usuário, casos de uso, critérios de aceite'),
      t('ti.engsoft.arquitetura', 'Arquitetura: camadas, SOA, microsserviços, eventos; SOLID, DRY, KISS, YAGNI; coesão e acoplamento'),
      t('ti.engsoft.modelagem', 'UML, BPMN e padrões de projeto (criacionais, estruturais, comportamentais)'),
      t('ti.engsoft.qualidade', 'Qualidade; testes (unitário, integração, funcional, regressão, carga, estresse); revisão, refatoração, dívida técnica'),
    ]),
    d('ti.dev', 'Desenvolvimento de Sistemas', 'especificos', 5, [
      t('ti.dev.algoritmos', 'Algoritmos, lógica de programação e estruturas de dados; POO e programação funcional'),
      t('ti.dev.linguagens', 'Java (básico), JavaScript/Node.js, React, Python, HTML5, CSS3, TypeScript'),
      t('ti.dev.apis', 'APIs RESTful, GraphQL, WebSockets, JSON/XML, OpenAPI/Swagger'),
      t('ti.dev.auth', 'OAuth 2.0, OpenID Connect 1.0, tokens e claims, JWT'),
      t('ti.dev.git-pacotes', 'Git; dependências, empacotamento e publicação'),
    ]),
    d('ti.ia-eng', 'Engenharia de Software Assistida por IA e Sistemas Agentivos', 'especificos', 4, [
      t('ti.ia-eng.llm', 'IA no desenvolvimento; LLMs; programação baseada em intenção'),
      t('ti.ia-eng.contexto', 'Engenharia de contexto e de prompts; gestão de contexto e memória; RAG e bancos vetoriais'),
      t('ti.ia-eng.agentes', 'Agentes de codificação (CLI/IDE, ex.: Claude Code, Antigravity CLI); ciclo agentivo; self-healing'),
      t('ti.ia-eng.mcp', 'Model Context Protocol (MCP); skills e tool use'),
      t('ti.ia-eng.qualidade', 'Geração/revisão/testes com IA; alucinações e validação; segurança, privacidade, PI e ética'),
    ]),
    d('ti.devops', 'DevOps, Plataforma de Desenvolvimento e Engenharia de Entrega', 'especificos', 4, [
      t('ti.devops.cicd', 'CI/CD, pipelines, automação de build e testes; GitHub Actions, GitLab CI/CD, Jenkins'),
      t('ti.devops.iac', 'Infraestrutura como código e gerenciamento de configuração; ambientes dev/homologação/produção'),
      t('ti.devops.observabilidade', 'Observabilidade: métricas, logs, traces, telemetria, alertas'),
      t('ti.devops.git', 'Git, GitHub/GitLab, Git Flow, trunk-based, pull/merge requests'),
      t('ti.devops.containers', 'Docker, Docker Compose e Kubernetes'),
    ]),
    d('ti.dados', 'Banco de Dados', 'especificos', 4, [
      t('ti.dados.modelagem', 'Modelo ER, normalização e desnormalização'),
      t('ti.dados.sql', 'SQL, álgebra relacional, transações e ACID; índices e otimização; procedures, triggers, views'),
      t('ti.dados.sgbd', 'PostgreSQL e Oracle: administração e otimização; replicação, backup, alta disponibilidade'),
      t('ti.dados.nosql', 'NoSQL (documento, chave-valor, colunas, grafos; MongoDB, Redis) e bancos vetoriais (embeddings)'),
      t('ti.dados.governanca', 'Segurança e governança de dados'),
    ]),
    d('ti.ia', 'Inteligência Artificial, Ciência de Dados e Automação', 'especificos', 5, [
      t('ti.ia.fundamentos', 'Fundamentos de IA; aprendizado supervisionado, não supervisionado e por reforço; redes neurais e deep learning; PLN'),
      t('ti.ia.generativa', 'IA generativa, agentes inteligentes, modelos multimodais; prompts, contexto e RAG; automação'),
      t('ti.ia.etica', 'Ética, IA responsável, explicabilidade, governança de IA, LGPD aplicada à IA; Estratégia Brasileira de IA'),
      t('ti.ia.dados', 'Ciência de dados: preparação, exploração, estatística aplicada, avaliação de modelos; Big Data'),
    ]),
    d('ti.seguranca', 'Segurança da Informação', 'especificos', 4, [
      t('ti.seguranca.principios', 'Princípios (CID, autenticidade, não repúdio); riscos, vulnerabilidades, incidentes; classificação da informação'),
      t('ti.seguranca.acesso', 'Controle de acesso: autenticação, autorização, IAM'),
      t('ti.seguranca.criptografia', 'Criptografia simétrica e assimétrica; infraestrutura de chaves públicas; certificados e assinatura digital'),
      t('ti.seguranca.owasp', 'OWASP Top 10:2025; DevSecOps; segurança em APIs, containers e nuvem'),
      t('ti.seguranca.continuidade', 'Backup, continuidade de negócios e recuperação de desastres'),
      t('ti.seguranca.ameacas', 'Malware, ransomware, phishing, engenharia social; firewalls, antivírus, IDS/IPS; pentest'),
      t('ti.seguranca.zero-trust', 'Conceito de Zero Trust'),
      t('ti.seguranca.iso27000', 'Família ABNT NBR ISO/IEC 27000'),
    ]),
    d('ti.infra', 'Sistemas Operacionais, Redes e Computação em Nuvem', 'especificos', 5, [
      t('ti.infra.so', 'Windows e Linux: processos, memória, arquivos; shell e PowerShell; scripts'),
      t('ti.infra.diretorio', 'Active Directory e LDAP; virtualização e containers'),
      t('ti.infra.redes', 'TCP/IP, IPv4/IPv6, DNS, DHCP; HTTP/2, HTTP/3, HTTPS, SMTP, FTP, SSH'),
      t('ti.infra.perimetro', 'VPN, balanceamento de carga, proxies, firewalls; redes sem fio'),
      t('ti.infra.nuvem', 'Nuvem: IaaS, PaaS, SaaS, serverless, escalabilidade, nuvem híbrida, monitoramento'),
    ]),
    d('ti.governanca', 'Governança de Tecnologia da Informação', 'especificos', 4, [
      t('ti.governanca.estrategia', 'Governança de TI e alinhamento estratégico; ISO/IEC 38500:2024; COBIT 2019'),
      t('ti.governanca.itil', 'Gestão de serviços (ITIL v4): catálogo, incidentes, problemas, mudanças, configuração; portfólio e ativos'),
      t('ti.governanca.projetos', 'PMBOK 8ª edição e métodos ágeis em projetos'),
      t('ti.governanca.contratacoes', 'Contratações de TIC na Lei nº 14.133/2021'),
      t('ti.governanca.governo-digital', 'Lei do Governo Digital (14.129/2021) e ENGD 2024–2027 (Decreto 12.069/2024)'),
    ]),
    d('ti.legislacao', 'Legislação Aplicada à Tecnologia da Informação', 'especificos', 4, [
      t('ti.legislacao.lgpd', 'LGPD aplicada a sistemas: privacy by design/default, minimização, anonimização, pseudonimização'),
      t('ti.legislacao.marco-civil', 'Marco Civil da Internet: neutralidade, proteção de dados, guarda de registros'),
      t('ti.legislacao.contratacoes', 'Requisitos de segurança em contratações de TIC; certificação digital em sistemas'),
      t('ti.legislacao.goias', 'Lei Complementar estadual nº 205/2025'),
      t('ti.legislacao.tce', 'Normativos do TCE-GO: RN 13/2016 (CETI), RA 14/2024, RA 17/2024, RA 14/2025 (DTI), PDTI 2025–2026'),
    ]),
    d('ti.ingles', 'Língua Inglesa (Leitura Técnica)', 'especificos', 2, [
      t('ti.ingles.leitura', 'Leitura de textos técnicos, manuais e documentação de APIs; ideia principal e vocabulário de TI'),
    ]),
  ],
  sources: [
    {
      title: 'Edital nº 01/2026 — Abertura de Inscrições (retificado), versão consolidada de 15/09/2026',
      url: 'https://www.concursosfcc.com.br/concursos/tcego125/index.html',
      kind: 'oficial',
      accessed: '2026-10-17',
      note: 'PDF enviado pelo usuário; cópia em docs/fontes/.',
    },
    {
      title: 'TCE-GO — notícia de abertura do concurso',
      url: 'https://portal.tce.go.gov.br/-/concurso-publico-tce-go-abre-inscricoes-para-vagas-com-salario-de-r-11-8-mil',
      kind: 'oficial',
      accessed: '2026-10-17',
      note: 'Não lido diretamente (rede bloqueada).',
    },
  ],
  editalVersions: [
    {
      id: 'edital-01-2026-consolidado-2026-09-15',
      title: 'Edital nº 01/2026 (retificado) — consolidado em 15/09/2026',
      date: '2026-09-15',
      summary:
        'Versão vigente usada no app. Incorpora a retificação nº 02/2026 (DOE-GO 16/09/2026): distribuição de questões por disciplina e nova redação de Legislação Institucional.',
      status: OF,
    },
  ],
};
