import type { SectionExtras } from '@/content/types';

// questões complementares das seções dos grimórios de dados, governança, legislação de TI,
// engenharia de software e DevOps. Fatos restritos ao texto de cada seção.
export const extrasTiGestao: Record<string, SectionExtras> = {
  // ===== grim.dados: Banco de dados =====
  'cap.dados.01:modelagem': {
    truths: [
      { statement: 'Em um relacionamento N:M, cria-se uma tabela associativa com as chaves das duas entidades.', answer: true, why: 'É assim que o texto converte N:M para tabelas: uma tabela associativa reúne as chaves das duas entidades.' },
      { statement: 'A chave alternativa é a chave candidata escolhida como identificador oficial da tabela.', answer: false, why: 'A candidata escolhida é a primária. A alternativa é a candidata que não foi escolhida e costuma receber restrição UNIQUE.' },
      { statement: 'A idade calculada a partir da data de nascimento é um exemplo de atributo derivado.', answer: true, why: 'O texto define atributo derivado justamente com esse exemplo: a idade é calculada da data de nascimento.' },
    ],
    blanks: [
      { sentence: 'Em um relacionamento 1:N, a chave da entidade do lado "1" vira ___ na tabela do lado "N".', options: ['chave estrangeira', 'chave alternativa', 'tabela associativa', 'atributo derivado'], answer: 'chave estrangeira', why: 'No 1:N, a tabela do lado N guarda a chave do lado 1 como chave estrangeira, como o processo que guarda o código do relator.' },
      { sentence: 'A forma normal em que todo determinante é chave candidata é a ___.', options: ['FNBC', '1FN', '2FN', '3FN'], answer: 'FNBC', why: 'A forma normal de Boyce-Codd exige que todo determinante seja chave candidata e é a versão mais rigorosa da 3FN.' },
    ],
  },
  'cap.dados.01:sql': {
    truths: [
      { statement: 'Na ordem lógica de execução, o WHERE é avaliado antes do GROUP BY.', answer: true, why: 'A ordem lógica é FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT e ORDER BY.' },
      { statement: 'O apelido definido no SELECT pode ser usado no WHERE da mesma consulta.', answer: false, why: 'O SELECT é avaliado depois do WHERE; o apelido pode ser usado no ORDER BY, mas não no WHERE.' },
      { statement: 'GRANT e REVOKE pertencem à categoria DCL, de controle de permissões.', answer: true, why: 'A tabela de categorias coloca GRANT e REVOKE na DCL, que trata de permissões.' },
    ],
    blanks: [
      { sentence: 'Para listar todas as linhas da tabela da esquerda, mesmo sem correspondência na da direita, usa-se ___.', options: ['LEFT JOIN', 'INNER JOIN', 'CROSS JOIN', 'RIGHT JOIN'], answer: 'LEFT JOIN', why: 'O LEFT JOIN traz todas as linhas da esquerda; as colunas da direita sem correspondência ficam NULL.' },
      { sentence: 'Uma rotina disparada automaticamente por INSERT, UPDATE ou DELETE é um ___.', options: ['trigger', 'procedure', 'view', 'savepoint'], answer: 'trigger', why: 'O gatilho (trigger) é disparado por um evento, antes ou depois; a procedure é chamada explicitamente.' },
    ],
  },
  'cap.dados.01:transacoes': {
    truths: [
      { statement: 'A durabilidade garante que, depois do commit, os dados persistem mesmo após queda de energia.', answer: true, why: 'É a definição de durabilidade no texto, garantida pelo registro de log.' },
      { statement: 'No nível SERIALIZABLE, a leitura fantasma ainda pode ocorrer pelo padrão SQL.', answer: false, why: 'Pela tabela do padrão SQL, o SERIALIZABLE evita leitura suja, não repetível e fantasma.' },
      { statement: 'Um índice composto (ano, orgao) ajuda pouco em consultas que filtram só por orgao.', answer: true, why: 'A ordem das colunas importa: o índice ajuda consultas por ano ou por ano e orgao, mas pouco por orgao sozinho.' },
    ],
    blanks: [
      { sentence: 'Ler um dado alterado por outra transação ainda não confirmada é a anomalia chamada ___.', options: ['leitura suja', 'leitura fantasma', 'leitura não repetível', 'leitura consistente'], answer: 'leitura suja', why: 'A leitura suja (dirty read) lê dados não confirmados; a fantasma envolve linhas inseridas ou excluídas.' },
      { sentence: 'No PostgreSQL, o comando que executa a consulta e mede o plano real é o ___.', options: ['EXPLAIN ANALYZE', 'VACUUM', 'ROLLBACK', 'REFRESH'], answer: 'EXPLAIN ANALYZE', why: 'O EXPLAIN mostra o plano; o EXPLAIN ANALYZE também executa e mede, no PostgreSQL.' },
    ],
  },
  'cap.dados.02:relacionais': {
    truths: [
      { statement: 'No PostgreSQL, o MVCC faz com que leitores não bloqueiem escritores.', answer: true, why: 'O MVCC controla a concorrência por múltiplas versões: cada atualização cria uma nova versão da linha.' },
      { statement: 'No Oracle, a instância é o conjunto de arquivos de dados, e o banco é o conjunto de processos e memória.', answer: false, why: 'É o inverso: a instância é processos e memória (SGA); o banco são os arquivos de dados.' },
      { statement: 'O pg_basebackup, com arquivamento contínuo do WAL, permite a recuperação a um ponto no tempo.', answer: true, why: 'O texto descreve o backup físico com pg_basebackup e WAL arquivado como base do PITR.' },
    ],
    blanks: [
      { sentence: 'No PostgreSQL, o comando que atualiza as estatísticas usadas pelo otimizador é o ___.', options: ['ANALYZE', 'VACUUM', 'pg_dump', 'GRANT'], answer: 'ANALYZE', why: 'O ANALYZE atualiza estatísticas; o VACUUM recupera o espaço das tuplas mortas.' },
      { sentence: 'A ferramenta oficial de backup e recuperação do Oracle é o ___.', options: ['RMAN', 'Data Pump', 'RAC', 'Data Guard'], answer: 'RMAN', why: 'O RMAN faz backup e recuperação; o Data Pump exporta e importa de forma lógica.' },
    ],
  },
  'cap.dados.02:nosql': {
    truths: [
      { statement: 'O MongoDB armazena documentos em BSON, sem esquema obrigatório.', answer: true, why: 'O texto descreve o MongoDB como orientado a documentos em BSON, com esquema flexível.' },
      { statement: 'Na replicação assíncrona, o commit só é confirmado depois que a réplica grava.', answer: false, why: 'Isso descreve a replicação síncrona. Na assíncrona, o primário confirma e a réplica recebe depois, podendo perder as últimas transações.' },
      { statement: 'Bancos de grafos são indicados para relações complexas, como redes de vínculos societários.', answer: true, why: 'A tabela de modelos aponta os grafos (como Neo4j) para relações complexas, como vínculos societários e fraudes.' },
    ],
    blanks: [
      { sentence: 'No modelo BASE, a letra E corresponde à consistência ___.', options: ['eventual', 'imediata', 'forte', 'transacional'], answer: 'eventual', why: 'BASE é Basically Available, Soft state, Eventually consistent: uma escrita pode levar tempo para chegar a todas as réplicas.' },
      { sentence: 'Dividir os dados entre servidores por uma chave, para escalar horizontalmente, chama-se ___.', options: ['sharding', 'failover', 'mascaramento', 'replicação síncrona'], answer: 'sharding', why: 'Sharding é o particionamento horizontal por chave; failover é a promoção de uma réplica quando o primário cai.' },
    ],
  },

  // ===== grim.governanca: As Atas do Conselho =====
  'cap.gov.01:governanca': {
    truths: [
      { statement: 'O PDTI reúne diagnóstico, necessidades, metas e ações de TI para um período, alinhados ao planejamento institucional.', answer: true, why: 'É o papel do PDTI na cadeia de alinhamento descrita no texto.' },
      { statement: 'O COBIT 2019 tem 40 objetivos distribuídos em cinco domínios.', answer: true, why: 'Os domínios EDM, APO, BAI, DSS e MEA somam 5 + 14 + 11 + 6 + 4 = 40 objetivos.' },
      { statement: 'No COBIT 2019, o domínio BAI trata de entregar, servir e suportar.', answer: false, why: 'BAI é Construir, Adquirir e Implementar. Entregar, Servir e Suportar é o domínio DSS.' },
    ],
    blanks: [
      { sentence: 'O modelo central da ISO/IEC 38500 é avaliar, dirigir e ___.', options: ['monitorar', 'executar', 'construir', 'planejar'], answer: 'monitorar', why: 'O modelo EDM (Evaluate, Direct, Monitor) é estável entre as edições da norma.' },
      { sentence: 'No COBIT 2019, os ___ servem para adaptar o sistema de governança a cada organização.', options: ['fatores de desenho', 'níveis de capacidade', 'princípios do modelo', 'objetivos de alinhamento'], answer: 'fatores de desenho', why: 'Os fatores de desenho, como estratégia, porte e perfil de risco, adaptam o sistema de governança.' },
    ],
  },
  'cap.gov.01:itil': {
    truths: [
      { statement: 'O ITIL 4 descreve 34 práticas, divididas entre gerenciamento geral, de serviços e técnico.', answer: true, why: 'São 14 práticas de gerenciamento geral, 17 de gerenciamento de serviços e 3 de gerenciamento técnico.' },
      { statement: 'Mudanças emergenciais são as de baixo risco e já pré-autorizadas.', answer: false, why: 'Baixo risco e pré-autorização caracterizam a mudança padrão. A emergencial deve ser implementada o quanto antes.' },
      { statement: 'Os dados sobre itens de configuração e suas relações ficam no CMDB.', answer: true, why: 'O gerenciamento da configuração do serviço mantém essas informações no banco de dados de gerenciamento da configuração.' },
    ],
    blanks: [
      { sentence: 'No ITIL 4, ___ é a causa de um ou mais incidentes.', options: ['problema', 'erro conhecido', 'requisição', 'mudança'], answer: 'problema', why: 'Problema é a causa; erro conhecido é um problema já analisado e ainda não resolvido.' },
      { sentence: 'A prática que funciona como ponto único de contato com os usuários é a ___.', options: ['central de serviço', 'gestão de ativos de TI', 'habilitação de mudanças', 'gestão de nível de serviço'], answer: 'central de serviço', why: 'A central de serviço é o ponto único de contato e registra incidentes e requisições.' },
    ],
  },
  'cap.gov.01:projetos': {
    truths: [
      { statement: 'A EAP é a decomposição hierárquica do escopo em entregas e pacotes de trabalho.', answer: true, why: 'É a definição de estrutura analítica do projeto apresentada no texto.' },
      { statement: 'No Kanban, as iterações têm sempre tamanho fixo de até um mês.', answer: false, why: 'O Kanban não prescreve iterações de tamanho fixo. A Sprint de até um mês é do Scrum.' },
      { statement: 'No Scrum, o Incremento está associado ao compromisso da Definição de Pronto.', answer: true, why: 'Pelo Guia do Scrum 2020, cada artefato tem um compromisso: o do Incremento é a Definição de Pronto.' },
    ],
    blanks: [
      { sentence: 'O documento que autoriza formalmente o projeto e dá autoridade ao gerente é o ___.', options: ['termo de abertura', 'caminho crítico', 'Sprint Backlog', 'plano de contratações'], answer: 'termo de abertura', why: 'O termo de abertura (charter) autoriza o projeto e confere autoridade ao gerente.' },
      { sentence: 'No Scrum, a Daily Scrum tem duração de ___.', options: ['15 minutos', '30 minutos', 'uma hora', 'um dia'], answer: '15 minutos', why: 'O Guia do Scrum fixa a Daily Scrum em 15 minutos.' },
    ],
  },
  'cap.gov.02:contratacoes': {
    truths: [
      { statement: 'O diálogo competitivo serve a objetos com inovação tecnológica ou técnica, quando a administração não consegue definir sozinha a solução.', answer: true, why: 'Nesse caso a administração dialoga com licitantes previamente selecionados.' },
      { statement: 'Serviços contínuos podem ter contratos de até 5 anos, prorrogáveis até 10 anos no total.', answer: true, why: 'É o limite descrito no texto para serviços e fornecimentos contínuos.' },
      { statement: 'A análise de riscos pertence à fase de gestão do contrato, depois da assinatura.', answer: false, why: 'A análise de riscos é produto da fase preparatória, junto com o ETP e o Termo de Referência.' },
    ],
    blanks: [
      { sentence: 'O contrato que preveja a operação continuada de sistemas estruturantes de TI pode ter vigência máxima de ___.', options: ['15 anos', '5 anos', '10 anos', '20 anos'], answer: '15 anos', why: 'O texto indica 15 anos para a operação continuada de sistemas estruturantes de TI.' },
      { sentence: 'Pela IN SGD/ME nº 94/2022, a equipe de planejamento tem integrantes requisitante, técnico e ___.', options: ['administrativo', 'jurídico', 'financeiro', 'externo'], answer: 'administrativo', why: 'A equipe de planejamento reúne os integrantes requisitante, técnico e administrativo.' },
    ],
  },
  'cap.gov.02:governo-digital': {
    truths: [
      { statement: 'Pela Lei nº 14.129/2021, o número do CPF é suficiente para identificar o cidadão nos bancos de dados de serviços públicos.', answer: true, why: 'É a regra de identificação descrita na seção.' },
      { statement: 'O uso de linguagem clara está entre as ideias centrais da Lei do Governo Digital.', answer: true, why: 'A linguagem clara aparece entre os princípios e diretrizes listados.' },
      { statement: 'Na Lei do Governo Digital, a interoperabilidade entre sistemas é tratada como opcional e fora dos seus princípios.', answer: false, why: 'A interoperabilidade entre sistemas está entre as ideias centrais da lei.' },
    ],
    blanks: [
      { sentence: 'Uma plataforma de governo digital com ferramenta de autenticação e acompanhamento das solicitações é o ___.', options: ['gov.br', 'PDTI', 'CMDB', 'SISP'], answer: 'gov.br', why: 'O gov.br é citado entre os instrumentos da lei, com autenticação e acompanhamento das solicitações.' },
      { sentence: 'Nos Estados, DF e Municípios, a Lei do Governo Digital se aplica quando adotada por ___.', options: ['ato normativo próprio', 'decisão do TCU', 'contrato de adesão', 'portaria federal'], answer: 'ato normativo próprio', why: 'A abrangência sobre os demais entes depende de adoção por ato normativo próprio.' },
    ],
  },

  // ===== grim.legislacao: O Livro das Leis do Reino (Cartório do Reino) =====
  'cap.leg.01:lgpd': {
    truths: [
      { statement: 'Dado biométrico está entre os dados pessoais sensíveis definidos pela LGPD.', answer: true, why: 'O art. 5º inclui o dado genético ou biométrico na definição de dado pessoal sensível.' },
      { statement: 'O operador é quem toma as decisões sobre o tratamento dos dados pessoais.', answer: false, why: 'Quem decide é o controlador. O operador trata os dados em nome do controlador.' },
      { statement: 'O titular pode pedir revisão de decisões tomadas unicamente com base em tratamento automatizado.', answer: true, why: 'É o que prevê o art. 20 da LGPD.' },
    ],
    blanks: [
      { sentence: 'O princípio da LGPD que fundamenta a minimização, tratar só o mínimo necessário para a finalidade, é o da ___.', options: ['necessidade', 'transparência', 'adequação', 'qualidade dos dados'], answer: 'necessidade', why: 'O princípio da necessidade exige dados pertinentes, proporcionais e não excessivos em relação à finalidade.' },
      { sentence: 'Pela Resolução CD/ANPD nº 15/2024, o prazo para comunicar incidente de risco ou dano relevante é de ___.', options: ['três dias úteis', 'vinte e quatro horas', 'cinco dias corridos', 'trinta dias'], answer: 'três dias úteis', why: 'O regulamento da ANPD fixou o prazo de três dias úteis para a comunicação prevista no art. 48.' },
    ],
  },
  'cap.leg.01:marco-civil': {
    truths: [
      { statement: 'O registro de conexão inclui data e hora de início e término, duração e o endereço IP usado.', answer: true, why: 'É o conteúdo definido no art. 5º, VI, do Marco Civil.' },
      { statement: 'Dados cadastrais, como qualificação pessoal, filiação e endereço, só podem ser obtidos por ordem judicial.', answer: false, why: 'O art. 10, § 3º, permite que autoridades administrativas com competência legal os requisitem.' },
      { statement: 'O usuário pode pedir a exclusão definitiva dos dados fornecidos a uma aplicação ao término da relação, ressalvada a guarda obrigatória de registros.', answer: true, why: 'É um dos direitos do art. 7º do Marco Civil.' },
    ],
    blanks: [
      { sentence: 'A guarda dos registros de acesso a aplicações cabe ao provedor de aplicação pelo prazo mínimo de ___.', options: ['6 meses', '1 ano', '3 meses', '2 anos'], answer: '6 meses', why: 'O art. 15 fixa 6 meses para os registros de acesso a aplicações; 1 ano é o prazo dos registros de conexão.' },
      { sentence: 'Pela neutralidade de rede, os pacotes de dados devem ser tratados de forma ___.', options: ['isonômica', 'prioritária', 'seletiva', 'anônima'], answer: 'isonômica', why: 'O art. 9º exige tratamento isonômico, sem distinção por conteúdo, origem e destino, serviço, terminal ou aplicação.' },
    ],
  },
  'cap.leg.02:contratacoes-certificacao': {
    truths: [
      { statement: 'O termo de ciência é assinado pelos profissionais que atuarão no contrato.', answer: true, why: 'Pela IN SGD/ME nº 94/2022, o termo de compromisso de sigilo é do representante da empresa, e o de ciência, dos profissionais.' },
      { statement: 'Na ICP-Brasil, as Autoridades de Registro emitem e revogam os certificados.', answer: false, why: 'Quem emite e revoga são as Autoridades Certificadoras. As Autoridades de Registro identificam o titular.' },
      { statement: 'Devolução dos dados em formato aberto e eliminação comprovada das cópias são requisitos típicos do encerramento do contrato.', answer: true, why: 'A tabela da seção lista esses itens no momento de encerramento, junto com revogação de acessos e transferência de conhecimento.' },
    ],
    blanks: [
      { sentence: 'O recurso que comprova quando uma assinatura digital foi feita é o ___.', options: ['carimbo do tempo', 'certificado A1', 'OCSP', 'TLS mútuo'], answer: 'carimbo do tempo', why: 'O carimbo do tempo comprova o momento da assinatura; LCR e OCSP servem para verificar revogação.' },
      { sentence: 'Na ICP-Brasil, o papel de AC Raiz é exercido pelo ___.', options: ['ITI', 'GSI', 'SISP', 'Serpro'], answer: 'ITI', why: 'O Instituto Nacional de Tecnologia da Informação é a AC Raiz da cadeia ICP-Brasil.' },
    ],
  },
  'cap.leg.02:goias-tce': {
    truths: [
      { statement: 'A Resolução Normativa nº 13/2016 do TCE-GO institui o Comitê Estratégico de Tecnologia da Informação (CETI).', answer: true, why: 'É o assunto da norma conforme o próprio edital.' },
      { statement: 'A Resolução Administrativa nº 17/2024 do TCE-GO trata da estrutura da Diretoria de Tecnologia da Informação.', answer: false, why: 'A RA 17/2024 é a Política de Segurança da Informação. A estrutura da DTI é assunto da RA 14/2025.' },
      { statement: 'A Lei Complementar estadual nº 205/2025 trata de inovação em inteligência artificial em Goiás.', answer: true, why: 'Ela institui a Política Estadual de Fomento à Inovação em Inteligência Artificial.' },
    ],
    blanks: [
      { sentence: 'Na relação entre as normas, o CETI é a instância de ___, e a DTI, de gestão.', options: ['governança', 'auditoria externa', 'operação', 'fiscalização contratual'], answer: 'governança', why: 'O texto relaciona o CETI ao papel de avaliar, dirigir e monitorar, e a DTI à gestão.' },
      { sentence: 'No TCE-GO, a Política de Governança Organizacional é a Resolução Administrativa nº ___.', options: ['14/2024', '17/2024', '13/2016', '14/2025'], answer: '14/2024', why: 'Conforme o edital, a RA 14/2024 é a Política de Governança Organizacional do Tribunal.' },
    ],
  },

  // ===== grim.engsoft: O Caderno dos Arquitetos (Oficinas dos Arquitetos) =====
  'cap.es.01:ciclo': {
    truths: [
      { statement: 'O modelo espiral, de Boehm, é iterativo e orientado a riscos.', answer: true, why: 'É assim que a seção caracteriza o modelo espiral.' },
      { statement: 'No Kanban, o lead time mede o tempo do início do trabalho até a entrega.', answer: false, why: 'Isso é o cycle time. O lead time vai do pedido até a entrega.' },
      { statement: 'Programação em par e propriedade coletiva do código estão entre as práticas do XP.', answer: true, why: 'Ambas aparecem na lista de práticas mais cobradas do Extreme Programming.' },
    ],
    blanks: [
      { sentence: 'O modelo em ___ associa cada fase de especificação a um nível de teste.', options: ['V', 'espiral', 'cascata', 'incremental'], answer: 'V', why: 'O modelo em V liga cada fase de especificação a um nível de teste correspondente.' },
      { sentence: 'No Lean, decidir no último momento responsável corresponde ao princípio de ___ compromissos.', options: ['adiar', 'antecipar', 'eliminar', 'documentar'], answer: 'adiar', why: 'Adiar compromissos é um dos sete princípios do Lean Software Development.' },
    ],
  },
  'cap.es.01:requisitos': {
    truths: [
      { statement: 'Na priorização MoSCoW, as letras correspondem a must, should, could e won’t.', answer: true, why: 'É a técnica de priorização citada na atividade de análise de requisitos.' },
      { statement: 'Rastreabilidade, do requisito ao código e ao teste, faz parte do gerenciamento de requisitos.', answer: true, why: 'O gerenciamento controla mudanças, versões e rastreabilidade.' },
      { statement: 'No caso de uso, o fluxo principal descreve o tratamento das situações de exceção.', answer: false, why: 'O fluxo principal é o cenário de sucesso. As situações excepcionais ficam nos fluxos de exceção.' },
    ],
    blanks: [
      { sentence: 'No acrônimo INVEST, a letra T indica que a história deve ser ___.', options: ['testável', 'técnica', 'temporária', 'total'], answer: 'testável', why: 'INVEST: independente, negociável, valiosa, estimável, pequena (small) e testável.' },
      { sentence: 'No diagrama de casos de uso, o caso que acontece só em certas condições é ligado por ___.', options: ['extend', 'include', 'generalização', 'associação'], answer: 'extend', why: 'O extend representa comportamento opcional; o include é executado sempre.' },
    ],
  },
  'cap.es.02:arquitetura': {
    truths: [
      { statement: 'O padrão circuit breaker para de chamar um serviço que está falhando.', answer: true, why: 'É a definição do padrão apresentada entre os padrões associados aos estilos arquiteturais.' },
      { statement: 'No SOA, o barramento centralizado (ESB) elimina qualquer ponto de acoplamento entre os sistemas.', answer: false, why: 'O texto aponta o contrário: o barramento centralizado pode virar gargalo e ponto de acoplamento.' },
      { statement: 'O princípio da inversão de dependência recomenda depender de abstrações, e não de implementações concretas.', answer: true, why: 'É a letra D do SOLID.' },
    ],
    blanks: [
      { sentence: 'O padrão que separa as operações de escrita e de leitura chama-se ___.', options: ['CQRS', 'saga', 'API Gateway', 'event sourcing'], answer: 'CQRS', why: 'CQRS separa escrita e leitura; a saga trata transações distribuídas com compensação.' },
      { sentence: 'O princípio que diz para não implementar o que ainda não é necessário é o ___.', options: ['YAGNI', 'DRY', 'KISS', 'SOLID'], answer: 'YAGNI', why: 'YAGNI (You Aren’t Gonna Need It) desaconselha antecipar o que não é necessário.' },
    ],
  },
  'cap.es.02:modelagem': {
    truths: [
      { statement: 'Na UML 2.5, há 14 diagramas, sendo 7 estruturais e 7 comportamentais.', answer: true, why: 'É a divisão apresentada na seção.' },
      { statement: 'Na BPMN, o gateway paralelo segue um único caminho, conforme a condição.', answer: false, why: 'Um único caminho é o comportamento do gateway exclusivo. O paralelo segue todos os caminhos ao mesmo tempo.' },
      { statement: 'O padrão Observer notifica vários objetos quando um deles muda de estado.', answer: true, why: 'É a definição do Observer, apontado como base de eventos.' },
    ],
    blanks: [
      { sentence: 'Na UML, o diagrama que mostra a troca de mensagens entre objetos ao longo do tempo é o de ___.', options: ['sequência', 'classes', 'implantação', 'componentes'], answer: 'sequência', why: 'O diagrama de sequência usa linhas de vida verticais para mostrar mensagens ao longo do tempo.' },
      { sentence: 'O padrão que oferece uma interface simples para um subsistema complexo é o ___.', options: ['Facade', 'Singleton', 'Strategy', 'Builder'], answer: 'Facade', why: 'Facade simplifica o acesso a um subsistema; é um padrão estrutural.' },
    ],
  },
  'cap.es.02:qualidade': {
    truths: [
      { statement: 'O teste de regressão verifica se o que funcionava continua funcionando após mudanças.', answer: true, why: 'É a definição de teste de regressão da seção, com o exemplo de rodar a suíte a cada commit.' },
      { statement: 'Partição de equivalência e valor-limite são técnicas de teste caixa-branca.', answer: false, why: 'São técnicas de caixa-preta, que olham só entradas e saídas. A caixa-branca mede cobertura de comandos e desvios.' },
      { statement: 'A dívida técnica pode ser deliberada, como um atalho consciente com plano de pagamento.', answer: true, why: 'O texto distingue a dívida deliberada da inadvertida, que ocorre por desconhecimento.' },
    ],
    blanks: [
      { sentence: 'O tempo médio entre falhas, usado para medir confiabilidade, é indicado pela sigla ___.', options: ['MTBF', 'MTTR', 'SLA', 'WIP'], answer: 'MTBF', why: 'MTBF mede confiabilidade; o MTTR, tempo médio de reparo, aparece como medida de manutenibilidade.' },
      { sentence: 'Melhorar a estrutura interna do código sem alterar o comportamento externo é ___.', options: ['refatoração', 'regressão', 'integração', 'aceitação'], answer: 'refatoração', why: 'Refatorar muda a estrutura sem mudar o comportamento e depende de testes para garantir isso.' },
    ],
  },

  // ===== grim.devops: O Diário do Porto (Porto das Entregas) =====
  'cap.devops.01:git': {
    truths: [
      { statement: 'O git revert cria um novo commit que desfaz outro, preservando o histórico.', answer: true, why: 'Por isso o revert é seguro em branch compartilhado, ao contrário de reescrever o histórico.' },
      { statement: 'No Git Flow, as correções urgentes de produção costumam ficar em branches feature/*.', answer: false, why: 'O Git Flow tem branches próprios hotfix/* para isso; feature/* é para novas funcionalidades.' },
      { statement: 'Uma senha enviada por engano continua no histórico mesmo depois de apagada no commit seguinte.', answer: true, why: 'Por isso a seção orienta revogar a senha, e não apenas apagá-la do arquivo.' },
    ],
    blanks: [
      { sentence: 'O comando que guarda temporariamente alterações ainda não confirmadas é o ___.', options: ['git stash', 'git tag', 'git fetch', 'git cherry-pick'], answer: 'git stash', why: 'O git stash guarda alterações não confirmadas; o cherry-pick aplica um commit específico em outro branch.' },
      { sentence: 'O arquivo que indica revisores obrigatórios por área do repositório é o ___.', options: ['CODEOWNERS', '.gitignore', 'Jenkinsfile', 'compose.yaml'], answer: 'CODEOWNERS', why: 'O CODEOWNERS define revisores obrigatórios; o .gitignore lista o que não deve ser versionado.' },
    ],
  },
  'cap.devops.01:cicd': {
    truths: [
      { statement: 'Pelo princípio construa uma vez, implante muitas, o mesmo artefato passa por todos os ambientes, mudando só a configuração.', answer: true, why: 'É um dos princípios do pipeline descritos na seção.' },
      { statement: 'O ambiente de homologação deve ser uma réplica o mais fiel possível da produção.', answer: true, why: 'A homologação serve a testes e ao aceite do usuário, por isso deve se parecer com a produção.' },
      { statement: 'No GitHub Actions, os workflows são configurados no arquivo .gitlab-ci.yml, na raiz do repositório.', answer: false, why: 'O GitHub Actions usa arquivos YAML em .github/workflows/. O .gitlab-ci.yml é do GitLab CI/CD.' },
    ],
    blanks: [
      { sentence: 'A estratégia em que a nova versão recebe primeiro uma pequena fatia dos usuários é a ___.', options: ['canary', 'blue-green', 'rolling', 'feature flag'], answer: 'canary', why: 'Na canary, amplia-se a fatia se as métricas estiverem boas; no blue-green, a troca é de uma vez.' },
      { sentence: 'No Jenkins, os pipelines são descritos num arquivo chamado ___.', options: ['Jenkinsfile', 'Dockerfile', 'playbook', 'workflow.yml'], answer: 'Jenkinsfile', why: 'O Jenkinsfile descreve o pipeline, de forma declarativa ou scripted.' },
    ],
  },
  'cap.devops.02:iac-containers': {
    truths: [
      { statement: 'O Ansible é agentless, conecta-se por SSH e usa playbooks em YAML.', answer: true, why: 'É a descrição do Ansible na parte de gerenciamento de configuração.' },
      { statement: 'Um volume, no Docker, é armazenamento que desaparece junto com o contêiner.', answer: false, why: 'O volume é armazenamento persistente fora do ciclo de vida do contêiner.' },
      { statement: 'No Kubernetes, a probe de readiness indica quando o Pod está pronto para receber tráfego.', answer: true, why: 'A readiness controla o recebimento de tráfego; a liveness reinicia o contêiner que travou.' },
    ],
    blanks: [
      { sentence: 'A diferença entre o código de infraestrutura e o ambiente real, geralmente por mudanças manuais, chama-se ___.', options: ['deriva de configuração', 'idempotência', 'infraestrutura imutável', 'multi-stage build'], answer: 'deriva de configuração', why: 'A deriva (drift) surge quando o ambiente muda fora do código.' },
      { sentence: 'No Kubernetes, o objeto que dá endereço estável e balanceamento a um conjunto de Pods é o ___.', options: ['Service', 'Deployment', 'Namespace', 'ConfigMap'], answer: 'Service', why: 'O Service oferece endereço estável e balanceamento; o Deployment mantém o número de réplicas.' },
    ],
  },
  'cap.devops.02:observabilidade': {
    truths: [
      { statement: 'O Prometheus coleta métricas por pull e as guarda em série temporal.', answer: true, why: 'É a descrição do Prometheus na seção; o Grafana fica com os painéis.' },
      { statement: 'Os sinais dourados do SRE do Google são latência, tráfego, erros e saturação.', answer: true, why: 'São os quatro sinais dourados listados no texto.' },
      { statement: 'Bons alertas disparam a cada oscilação de CPU, mesmo sem efeito para o usuário.', answer: false, why: 'Bons alertas disparam por sintomas que afetam o usuário, são acionáveis e evitam a fadiga de alertas.' },
    ],
    blanks: [
      { sentence: 'Com um SLO de 99,5%, o orçamento de erro corresponde a ___ das requisições.', options: ['0,5%', '99,5%', '1%', '5%'], answer: '0,5%', why: 'O orçamento de erro é 100% menos o SLO: 100% − 99,5% = 0,5%.' },
      { sentence: 'O padrão aberto da CNCF para gerar e coletar métricas, logs e traces é o ___.', options: ['OpenTelemetry', 'Grafana', 'Jaeger', 'Loki'], answer: 'OpenTelemetry', why: 'O OpenTelemetry é o padrão aberto; Grafana, Jaeger e Loki são ferramentas de painel, traces e logs.' },
    ],
  },
};
