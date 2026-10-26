import type { SectionExtras } from '@/content/types';

// Cenas e atividades das seções dos grimórios de dados, governança, legislação de TI,
// engenharia de software e DevOps. Fatos restritos ao texto de cada seção.
export const scenesTiGestao: Record<string, SectionExtras> = {
  // ===== grim.dados: O Arquivo Profundo =====
  'cap.dados.01:modelagem': {
    scene: [
      { who: 'Arquivista', text: 'Auditor, a névoa passou pela sala dos empenhos. O nome de um fornecedor aparece de um jeito em cem fichas e de outro em três.' },
      { who: 'Aprendiz', text: 'Se o mesmo nome está copiado em tantas fichas, basta uma cópia esquecida para o registro ficar contraditório.' },
      { who: 'Bubo', text: 'Exato. Esse tipo de anomalia nasce quando as tabelas são desenhadas sem cuidado com as dependências entre os dados.' },
      { who: 'Bubo', text: 'Antes de culpar a névoa, vamos aprender a desenhar o arquivo. Leia sobre entidades, chaves e formas normais.' },
    ],
    truths: [
      { statement: 'Em um relacionamento N:M, cria-se uma tabela associativa com as chaves das duas entidades.', answer: true, why: 'É assim que o texto converte N:M para tabelas: uma tabela associativa reúne as chaves das duas entidades.' },
      { statement: 'A chave alternativa é a chave candidata escolhida como identificador oficial da tabela.', answer: false, why: 'A candidata escolhida é a primária. A alternativa é a candidata que não foi escolhida e costuma receber restrição UNIQUE.' },
      { statement: 'A idade calculada a partir da data de nascimento é um exemplo de atributo derivado.', answer: true, why: 'O texto define atributo derivado justamente com esse exemplo: a idade é calculada da data de nascimento.' },
    ],
    blanks: [
      { sentence: 'Em um relacionamento 1:N, a chave da entidade do lado "1" vira ___ na tabela do lado "N".', options: ['chave estrangeira', 'chave alternativa', 'tabela associativa', 'atributo derivado'], answer: 'chave estrangeira', why: 'No 1:N, a tabela do lado N guarda a chave do lado 1 como chave estrangeira, como o processo que guarda o código do relator.' },
      { sentence: 'A forma normal em que todo determinante é chave candidata é a ___.', options: ['FNBC', '1FN', '2FN', '3FN'], answer: 'FNBC', why: 'A forma normal de Boyce-Codd exige que todo determinante seja chave candidata e é a versão mais rigorosa da 3FN.' },
    ],
    outro: 'O nome do fornecedor agora mora numa só tabela. A névoa não tem mais cópias para desencontrar.',
  },
  'cap.dados.01:sql': {
    scene: [
      { who: 'Tesoureiro-Mor', text: 'Auditor, a lista dos maiores fornecedores do ano veio vazia. Talvez simplesmente não haja ninguém acima do limite.' },
      { who: 'Aprendiz', text: 'Vazia? O livro de pagamentos está cheio. Alguém escreveu a consulta errado ou de propósito.' },
      { who: 'Bubo', text: 'Uma consulta mal ordenada esconde tanto quanto a névoa. Quem filtra o quê, e em que momento, muda tudo.' },
      { who: 'Bubo', text: 'Leia sobre comandos, junções, agregações e álgebra relacional. Depois reescrevemos essa consulta juntos.' },
    ],
    truths: [
      { statement: 'Na ordem lógica de execução, o WHERE é avaliado antes do GROUP BY.', answer: true, why: 'A ordem lógica é FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT e ORDER BY.' },
      { statement: 'O apelido definido no SELECT pode ser usado no WHERE da mesma consulta.', answer: false, why: 'O SELECT é avaliado depois do WHERE; o apelido pode ser usado no ORDER BY, mas não no WHERE.' },
      { statement: 'GRANT e REVOKE pertencem à categoria DCL, de controle de permissões.', answer: true, why: 'A tabela de categorias coloca GRANT e REVOKE na DCL, que trata de permissões.' },
    ],
    blanks: [
      { sentence: 'Para listar todas as linhas da tabela da esquerda, mesmo sem correspondência na da direita, usa-se ___.', options: ['LEFT JOIN', 'INNER JOIN', 'CROSS JOIN', 'RIGHT JOIN'], answer: 'LEFT JOIN', why: 'O LEFT JOIN traz todas as linhas da esquerda; as colunas da direita sem correspondência ficam NULL.' },
      { sentence: 'Uma rotina disparada automaticamente por INSERT, UPDATE ou DELETE é um ___.', options: ['trigger', 'procedure', 'view', 'savepoint'], answer: 'trigger', why: 'O gatilho (trigger) é disparado por um evento, antes ou depois; a procedure é chamada explicitamente.' },
    ],
    outro: 'A consulta corrigida devolveu os nomes. Um deles não consta em nenhum cadastro do Reino. Guarde essa pista.',
  },
  'cap.dados.01:transacoes': {
    scene: [
      { who: 'Arquivista', text: 'Na transferência de ontem, o dinheiro saiu do cofre do Tesouro e nunca chegou ao cofre da obra. O servidor caiu no meio.' },
      { who: 'Aprendiz', text: 'Então uma metade da operação aconteceu e a outra não. Isso não deveria ser possível.' },
      { who: 'Bubo', text: 'Não deveria, se as operações estivessem dentro de uma transação. E o relatório também demora horas para abrir.' },
      { who: 'Bubo', text: 'Dois mistérios, um capítulo. Leia sobre ACID, níveis de isolamento e índices.' },
    ],
    truths: [
      { statement: 'A durabilidade garante que, depois do commit, os dados persistem mesmo após queda de energia.', answer: true, why: 'É a definição de durabilidade no texto, garantida pelo registro de log.' },
      { statement: 'No nível SERIALIZABLE, a leitura fantasma ainda pode ocorrer pelo padrão SQL.', answer: false, why: 'Pela tabela do padrão SQL, o SERIALIZABLE evita leitura suja, não repetível e fantasma.' },
      { statement: 'Um índice composto (ano, orgao) ajuda pouco em consultas que filtram só por orgao.', answer: true, why: 'A ordem das colunas importa: o índice ajuda consultas por ano ou por ano e orgao, mas pouco por orgao sozinho.' },
    ],
    blanks: [
      { sentence: 'Ler um dado alterado por outra transação ainda não confirmada é a anomalia chamada ___.', options: ['leitura suja', 'leitura fantasma', 'leitura não repetível', 'leitura consistente'], answer: 'leitura suja', why: 'A leitura suja (dirty read) lê dados não confirmados; a fantasma envolve linhas inseridas ou excluídas.' },
      { sentence: 'No PostgreSQL, o comando que executa a consulta e mede o plano real é o ___.', options: ['EXPLAIN ANALYZE', 'VACUUM', 'ROLLBACK', 'REFRESH'], answer: 'EXPLAIN ANALYZE', why: 'O EXPLAIN mostra o plano; o EXPLAIN ANALYZE também executa e mede, no PostgreSQL.' },
    ],
    outro: 'Agora a transferência é tudo ou nada. Se o dinheiro sumir de novo, não terá sido por falha do servidor.',
  },
  'cap.dados.02:relacionais': {
    scene: [
      { who: 'Arquivista', text: 'Auditor, alguém apagou a tabela de pagamentos da madrugada. O backup lógico de ontem não tem as últimas horas.' },
      { who: 'Aprendiz', text: 'Então perdemos tudo o que aconteceu entre o backup e o apagamento?' },
      { who: 'Bubo', text: 'Talvez não. Depende de como o Arquivo guarda o registro de cada alteração e de quais cópias foram feitas.' },
      { who: 'Bubo', text: 'Leia sobre PostgreSQL e Oracle. Os dois têm caminhos para voltar no tempo.' },
    ],
    truths: [
      { statement: 'No PostgreSQL, o MVCC faz com que leitores não bloqueiem escritores.', answer: true, why: 'O MVCC controla a concorrência por múltiplas versões: cada atualização cria uma nova versão da linha.' },
      { statement: 'No Oracle, a instância é o conjunto de arquivos de dados, e o banco é o conjunto de processos e memória.', answer: false, why: 'É o inverso: a instância é processos e memória (SGA); o banco são os arquivos de dados.' },
      { statement: 'O pg_basebackup, com arquivamento contínuo do WAL, permite a recuperação a um ponto no tempo.', answer: true, why: 'O texto descreve o backup físico com pg_basebackup e WAL arquivado como base do PITR.' },
    ],
    blanks: [
      { sentence: 'No PostgreSQL, o comando que atualiza as estatísticas usadas pelo otimizador é o ___.', options: ['ANALYZE', 'VACUUM', 'pg_dump', 'GRANT'], answer: 'ANALYZE', why: 'O ANALYZE atualiza estatísticas; o VACUUM recupera o espaço das tuplas mortas.' },
      { sentence: 'A ferramenta oficial de backup e recuperação do Oracle é o ___.', options: ['RMAN', 'Data Pump', 'RAC', 'Data Guard'], answer: 'RMAN', why: 'O RMAN faz backup e recuperação; o Data Pump exporta e importa de forma lógica.' },
    ],
    outro: 'Com o WAL arquivado, a tabela voltou ao minuto anterior ao apagamento. O registro da madrugada mostra quem estava conectado.',
  },
  'cap.dados.02:nosql': {
    scene: [
      { who: 'Arquivista', text: 'Copiamos o Arquivo para três servidores. Mesmo assim, as fichas do fornecedor sumiram de todos ao mesmo tempo.' },
      { who: 'Aprendiz', text: 'Se as três cópias perderam a mesma coisa, a réplica não serviu de proteção.' },
      { who: 'Bubo', text: 'Copiar não é o mesmo que guardar. E nem todo dado do Reino precisa morar em tabelas: há cofres de outros formatos.' },
      { who: 'Bubo', text: 'Leia sobre NoSQL, replicação e governança dos dados. Vamos descobrir onde estava o ponto de retorno.' },
    ],
    truths: [
      { statement: 'O MongoDB armazena documentos em BSON, sem esquema obrigatório.', answer: true, why: 'O texto descreve o MongoDB como orientado a documentos em BSON, com esquema flexível.' },
      { statement: 'Na replicação assíncrona, o commit só é confirmado depois que a réplica grava.', answer: false, why: 'Isso descreve a replicação síncrona. Na assíncrona, o primário confirma e a réplica recebe depois, podendo perder as últimas transações.' },
      { statement: 'Bancos de grafos são indicados para relações complexas, como redes de vínculos societários.', answer: true, why: 'A tabela de modelos aponta os grafos (como Neo4j) para relações complexas, como vínculos societários e fraudes.' },
    ],
    blanks: [
      { sentence: 'No modelo BASE, a letra E corresponde à consistência ___.', options: ['eventual', 'imediata', 'forte', 'transacional'], answer: 'eventual', why: 'BASE é Basically Available, Soft state, Eventually consistent: uma escrita pode levar tempo para chegar a todas as réplicas.' },
      { sentence: 'Dividir os dados entre servidores por uma chave, para escalar horizontalmente, chama-se ___.', options: ['sharding', 'failover', 'mascaramento', 'replicação síncrona'], answer: 'sharding', why: 'Sharding é o particionamento horizontal por chave; failover é a promoção de uma réplica quando o primário cai.' },
    ],
    outro: 'O Arquivo Profundo ganhou backup separado das réplicas. Da próxima vez, um apagamento não leva todas as cópias junto.',
  },

  // ===== grim.governanca: As Atas do Conselho =====
  'cap.gov.01:governanca': {
    scene: [
      { who: 'Bubo', text: 'Bem-vindo ao Conselho dos Regentes. Aqui não se instala servidor nenhum: aqui se decide para onde a TI do Reino vai.' },
      { who: 'Aprendiz', text: 'Encontrei nas atas um projeto caríssimo aprovado sem nenhum objetivo do Reino que o justifique.' },
      { who: 'Bubo', text: 'Moderno, caro e sem propósito. A névoa gosta de projetos assim, porque ninguém sabe dizer se deram certo.' },
      { who: 'Bubo', text: 'Leia sobre alinhamento estratégico, a ISO/IEC 38500 e o COBIT 2019. Vamos ver quem devia ter avaliado e monitorado.' },
    ],
    truths: [
      { statement: 'O PDTI reúne diagnóstico, necessidades, metas e ações de TI para um período, alinhados ao planejamento institucional.', answer: true, why: 'É o papel do PDTI na cadeia de alinhamento descrita no texto.' },
      { statement: 'O COBIT 2019 tem 40 objetivos distribuídos em cinco domínios.', answer: true, why: 'Os domínios EDM, APO, BAI, DSS e MEA somam 5 + 14 + 11 + 6 + 4 = 40 objetivos.' },
      { statement: 'No COBIT 2019, o domínio BAI trata de entregar, servir e suportar.', answer: false, why: 'BAI é Construir, Adquirir e Implementar. Entregar, Servir e Suportar é o domínio DSS.' },
    ],
    blanks: [
      { sentence: 'O modelo central da ISO/IEC 38500 é avaliar, dirigir e ___.', options: ['monitorar', 'executar', 'construir', 'planejar'], answer: 'monitorar', why: 'O modelo EDM (Evaluate, Direct, Monitor) é estável entre as edições da norma.' },
      { sentence: 'No COBIT 2019, os ___ servem para adaptar o sistema de governança a cada organização.', options: ['fatores de desenho', 'níveis de capacidade', 'princípios do modelo', 'objetivos de alinhamento'], answer: 'fatores de desenho', why: 'Os fatores de desenho, como estratégia, porte e perfil de risco, adaptam o sistema de governança.' },
    ],
    outro: 'As atas agora mostram quem avaliou, quem dirigiu e quem deveria ter monitorado. Um nome se repete em todas elas.',
  },
  'cap.gov.01:itil': {
    scene: [
      { who: 'Morador', text: 'O balcão de atendimento do Conselho caiu três vezes nesta semana. Toda vez reiniciam, volta, e depois cai de novo.' },
      { who: 'Aprendiz', text: 'Reiniciar devolve o serviço, mas ninguém está procurando o motivo das quedas.' },
      { who: 'Bubo', text: 'Você acaba de separar duas práticas diferentes. Uma restaura, a outra investiga. A névoa se esconde entre elas.' },
      { who: 'Bubo', text: 'Leia sobre o ITIL 4: princípios, cadeia de valor e as práticas que mais caem em prova.' },
    ],
    truths: [
      { statement: 'O ITIL 4 descreve 34 práticas, divididas entre gerenciamento geral, de serviços e técnico.', answer: true, why: 'São 14 práticas de gerenciamento geral, 17 de gerenciamento de serviços e 3 de gerenciamento técnico.' },
      { statement: 'Mudanças emergenciais são as de baixo risco e já pré-autorizadas.', answer: false, why: 'Baixo risco e pré-autorização caracterizam a mudança padrão. A emergencial deve ser implementada o quanto antes.' },
      { statement: 'Os dados sobre itens de configuração e suas relações ficam no CMDB.', answer: true, why: 'O gerenciamento da configuração do serviço mantém essas informações no banco de dados de gerenciamento da configuração.' },
    ],
    blanks: [
      { sentence: 'No ITIL 4, ___ é a causa de um ou mais incidentes.', options: ['problema', 'erro conhecido', 'requisição', 'mudança'], answer: 'problema', why: 'Problema é a causa; erro conhecido é um problema já analisado e ainda não resolvido.' },
      { sentence: 'A prática que funciona como ponto único de contato com os usuários é a ___.', options: ['central de serviço', 'gestão de ativos de TI', 'habilitação de mudanças', 'gestão de nível de serviço'], answer: 'central de serviço', why: 'A central de serviço é o ponto único de contato e registra incidentes e requisições.' },
    ],
    outro: 'O balcão voltou, e agora há um problema registrado com solução de contorno. A causa das quedas já tem nome no diário.',
  },
  'cap.gov.01:projetos': {
    scene: [
      { who: 'Aprendiz', text: 'A reforma do Arquivo está atrasada há meses. Cada regente diz que a culpa é de uma etapa diferente.' },
      { who: 'Bubo', text: 'Em todo projeto, há uma sequência de atividades que não pode atrasar sem atrasar tudo. Alguém sabe qual é?' },
      { who: 'Aprendiz', text: 'Pelo jeito, ninguém. Nem há documento que autorize a obra e diga quem manda nela.' },
      { who: 'Bubo', text: 'Sem termo de abertura, sem escopo decomposto e sem dono do backlog, a névoa faz a festa. Leia sobre projetos e métodos ágeis.' },
    ],
    truths: [
      { statement: 'A EAP é a decomposição hierárquica do escopo em entregas e pacotes de trabalho.', answer: true, why: 'É a definição de estrutura analítica do projeto apresentada no texto.' },
      { statement: 'No Kanban, as iterações têm sempre tamanho fixo de até um mês.', answer: false, why: 'O Kanban não prescreve iterações de tamanho fixo. A Sprint de até um mês é do Scrum.' },
      { statement: 'No Scrum, o Incremento está associado ao compromisso da Definição de Pronto.', answer: true, why: 'Pelo Guia do Scrum 2020, cada artefato tem um compromisso: o do Incremento é a Definição de Pronto.' },
    ],
    blanks: [
      { sentence: 'O documento que autoriza formalmente o projeto e dá autoridade ao gerente é o ___.', options: ['termo de abertura', 'caminho crítico', 'Sprint Backlog', 'plano de contratações'], answer: 'termo de abertura', why: 'O termo de abertura (charter) autoriza o projeto e confere autoridade ao gerente.' },
      { sentence: 'No Scrum, a Daily Scrum tem duração de ___.', options: ['15 minutos', '30 minutos', 'uma hora', 'um dia'], answer: '15 minutos', why: 'O Guia do Scrum fixa a Daily Scrum em 15 minutos.' },
    ],
    outro: 'O caminho crítico da reforma está desenhado. O atraso começou numa compra que nunca foi entregue, de um fornecedor que ninguém conhece.',
  },
  'cap.gov.02:contratacoes': {
    scene: [
      { who: 'Tesoureiro-Mor', text: 'O contrato de sistemas foi assinado às pressas. Não havia tempo para estudos, auditor. O Reino precisava da solução.' },
      { who: 'Aprendiz', text: 'Sem estudo, como alguém provou que aquela era a melhor solução? E o pagamento é por posto de trabalho.' },
      { who: 'Bubo', text: 'Boas perguntas. A lei descreve uma fase inteira de planejamento antes de escolher fornecedor.' },
      { who: 'Bubo', text: 'Leia sobre as contratações de TIC na Lei 14.133/2021. Depois voltamos a esse contrato com outros olhos.' },
    ],
    truths: [
      { statement: 'O diálogo competitivo serve a objetos com inovação tecnológica ou técnica, quando a administração não consegue definir sozinha a solução.', answer: true, why: 'Nesse caso a administração dialoga com licitantes previamente selecionados.' },
      { statement: 'Serviços contínuos podem ter contratos de até 5 anos, prorrogáveis até 10 anos no total.', answer: true, why: 'É o limite descrito no texto para serviços e fornecimentos contínuos.' },
      { statement: 'A análise de riscos pertence à fase de gestão do contrato, depois da assinatura.', answer: false, why: 'A análise de riscos é produto da fase preparatória, junto com o ETP e o Termo de Referência.' },
    ],
    blanks: [
      { sentence: 'O contrato que preveja a operação continuada de sistemas estruturantes de TI pode ter vigência máxima de ___.', options: ['15 anos', '5 anos', '10 anos', '20 anos'], answer: '15 anos', why: 'O texto indica 15 anos para a operação continuada de sistemas estruturantes de TI.' },
      { sentence: 'Pela IN SGD/ME nº 94/2022, a equipe de planejamento tem integrantes requisitante, técnico e ___.', options: ['administrativo', 'jurídico', 'financeiro', 'externo'], answer: 'administrativo', why: 'A equipe de planejamento reúne os integrantes requisitante, técnico e administrativo.' },
    ],
    outro: 'O contrato não tem ETP, não tem indicadores e paga por posto. A névoa encobria isso, mas agora está escrito no seu relatório.',
  },
  'cap.gov.02:governo-digital': {
    scene: [
      { who: 'Morador', text: 'Pedi uma certidão ao Conselho e me mandaram voltar com três documentos que eles mesmos emitiram.' },
      { who: 'Aprendiz', text: 'E o formulário está escrito numa língua que nem eu, que estudo leis, entendo direito.' },
      { who: 'Bubo', text: 'A névoa também mora na burocracia. Há uma lei inteira sobre servir o cidadão pelo meio digital, com clareza.' },
      { who: 'Bubo', text: 'Leia sobre a Lei do Governo Digital e a estratégia nacional que vem com ela.' },
    ],
    truths: [
      { statement: 'Pela Lei nº 14.129/2021, o número do CPF é suficiente para identificar o cidadão nos bancos de dados de serviços públicos.', answer: true, why: 'É a regra de identificação descrita na seção.' },
      { statement: 'O uso de linguagem clara está entre as ideias centrais da Lei do Governo Digital.', answer: true, why: 'A linguagem clara aparece entre os princípios e diretrizes listados.' },
      { statement: 'Na Lei do Governo Digital, a interoperabilidade entre sistemas é tratada como opcional e fora dos seus princípios.', answer: false, why: 'A interoperabilidade entre sistemas está entre as ideias centrais da lei.' },
    ],
    blanks: [
      { sentence: 'Uma plataforma de governo digital com ferramenta de autenticação e acompanhamento das solicitações é o ___.', options: ['gov.br', 'PDTI', 'CMDB', 'SISP'], answer: 'gov.br', why: 'O gov.br é citado entre os instrumentos da lei, com autenticação e acompanhamento das solicitações.' },
      { sentence: 'Nos Estados, DF e Municípios, a Lei do Governo Digital se aplica quando adotada por ___.', options: ['ato normativo próprio', 'decisão do TCU', 'contrato de adesão', 'portaria federal'], answer: 'ato normativo próprio', why: 'A abrangência sobre os demais entes depende de adoção por ato normativo próprio.' },
    ],
    outro: 'O balcão do Conselho aceita pedidos pelo meio digital e não exige o que já possui. A névoa recua das Atas do Conselho.',
  },

  // ===== grim.legislacao: O Livro das Leis do Reino (Cartório do Reino) =====
  'cap.leg.01:lgpd': {
    scene: [
      { who: 'Arquivista', text: 'Auditor, o novo sistema do Cartório grava o CPF completo de cada súdito nos registros de erro. E guarda tudo para sempre.' },
      { who: 'Aprendiz', text: 'Se a névoa ou o capuz cinza alcançarem esses registros, terão os dados de todo o Reino.' },
      { who: 'Bubo', text: 'Por isso a lei pede que a privacidade nasça junto com o sistema, e não seja remendada depois.' },
      { who: 'Bubo', text: 'Leia sobre a LGPD aplicada a sistemas: papéis, princípios, anonimização e o que fazer diante de um incidente.' },
    ],
    truths: [
      { statement: 'Dado biométrico está entre os dados pessoais sensíveis definidos pela LGPD.', answer: true, why: 'O art. 5º inclui o dado genético ou biométrico na definição de dado pessoal sensível.' },
      { statement: 'O operador é quem toma as decisões sobre o tratamento dos dados pessoais.', answer: false, why: 'Quem decide é o controlador. O operador trata os dados em nome do controlador.' },
      { statement: 'O titular pode pedir revisão de decisões tomadas unicamente com base em tratamento automatizado.', answer: true, why: 'É o que prevê o art. 20 da LGPD.' },
    ],
    blanks: [
      { sentence: 'O princípio da LGPD que fundamenta a minimização, tratar só o mínimo necessário para a finalidade, é o da ___.', options: ['necessidade', 'transparência', 'adequação', 'qualidade dos dados'], answer: 'necessidade', why: 'O princípio da necessidade exige dados pertinentes, proporcionais e não excessivos em relação à finalidade.' },
      { sentence: 'Pela Resolução CD/ANPD nº 15/2024, o prazo para comunicar incidente de risco ou dano relevante é de ___.', options: ['três dias úteis', 'vinte e quatro horas', 'cinco dias corridos', 'trinta dias'], answer: 'três dias úteis', why: 'O regulamento da ANPD fixou o prazo de três dias úteis para a comunicação prevista no art. 48.' },
    ],
    outro: 'Os registros de erro agora guardam só o necessário, e o CPF dá lugar a um identificador. A tabela de correspondência fica à parte, bem trancada.',
  },
  'cap.leg.01:marco-civil': {
    scene: [
      { who: 'Aprendiz', text: 'Quero saber de onde o capuz cinza se conectou na noite do apagamento. Posso pedir os registros direto ao provedor?' },
      { who: 'Bubo', text: 'Calma. Há registros de tipos diferentes, guardados por quem é obrigado a guardá-los e entregues só de certo modo.' },
      { who: 'Morador', text: 'E desde ontem o mensageiro da cidade só anda devagar quando leva cartas do concorrente do provedor. Isso pode?' },
      { who: 'Bubo', text: 'Duas perguntas, uma lei. Leia sobre o Marco Civil da Internet antes de pedirmos qualquer coisa.' },
    ],
    truths: [
      { statement: 'O registro de conexão inclui data e hora de início e término, duração e o endereço IP usado.', answer: true, why: 'É o conteúdo definido no art. 5º, VI, do Marco Civil.' },
      { statement: 'Dados cadastrais, como qualificação pessoal, filiação e endereço, só podem ser obtidos por ordem judicial.', answer: false, why: 'O art. 10, § 3º, permite que autoridades administrativas com competência legal os requisitem.' },
      { statement: 'O usuário pode pedir a exclusão definitiva dos dados fornecidos a uma aplicação ao término da relação, ressalvada a guarda obrigatória de registros.', answer: true, why: 'É um dos direitos do art. 7º do Marco Civil.' },
    ],
    blanks: [
      { sentence: 'A guarda dos registros de acesso a aplicações cabe ao provedor de aplicação pelo prazo mínimo de ___.', options: ['6 meses', '1 ano', '3 meses', '2 anos'], answer: '6 meses', why: 'O art. 15 fixa 6 meses para os registros de acesso a aplicações; 1 ano é o prazo dos registros de conexão.' },
      { sentence: 'Pela neutralidade de rede, os pacotes de dados devem ser tratados de forma ___.', options: ['isonômica', 'prioritária', 'seletiva', 'anônima'], answer: 'isonômica', why: 'O art. 9º exige tratamento isonômico, sem distinção por conteúdo, origem e destino, serviço, terminal ou aplicação.' },
    ],
    outro: 'O pedido de guarda foi feito, e o fornecimento ficará a cargo do juiz. Os registros do capuz cinza não vão se perder no caminho.',
  },
  'cap.leg.02:contratacoes-certificacao': {
    scene: [
      { who: 'Arquivista', text: 'O contrato do fornecedor fantasma está assinado digitalmente. A assinatura confere, mas ninguém sabe quando ela foi feita.' },
      { who: 'Aprendiz', text: 'E se o certificado já estivesse revogado no dia da assinatura? A matemática da assinatura não diria nada.' },
      { who: 'Bubo', text: 'Boa desconfiança. Validar uma assinatura é mais do que conferir as contas. E o contrato também esqueceu a segurança.' },
      { who: 'Bubo', text: 'Leia sobre segurança nas contratações de TIC e sobre certificação digital.' },
    ],
    truths: [
      { statement: 'O termo de ciência é assinado pelos profissionais que atuarão no contrato.', answer: true, why: 'Pela IN SGD/ME nº 94/2022, o termo de compromisso de sigilo é do representante da empresa, e o de ciência, dos profissionais.' },
      { statement: 'Na ICP-Brasil, as Autoridades de Registro emitem e revogam os certificados.', answer: false, why: 'Quem emite e revoga são as Autoridades Certificadoras. As Autoridades de Registro identificam o titular.' },
      { statement: 'Devolução dos dados em formato aberto e eliminação comprovada das cópias são requisitos típicos do encerramento do contrato.', answer: true, why: 'A tabela da seção lista esses itens no momento de encerramento, junto com revogação de acessos e transferência de conhecimento.' },
    ],
    blanks: [
      { sentence: 'O recurso que comprova quando uma assinatura digital foi feita é o ___.', options: ['carimbo do tempo', 'certificado A1', 'OCSP', 'TLS mútuo'], answer: 'carimbo do tempo', why: 'O carimbo do tempo comprova o momento da assinatura; LCR e OCSP servem para verificar revogação.' },
      { sentence: 'Na ICP-Brasil, o papel de AC Raiz é exercido pelo ___.', options: ['ITI', 'GSI', 'SISP', 'Serpro'], answer: 'ITI', why: 'O Instituto Nacional de Tecnologia da Informação é a AC Raiz da cadeia ICP-Brasil.' },
    ],
    outro: 'A assinatura do contrato foi feita com certificado revogado. O Cartório marcou o documento, e a névoa perdeu mais um disfarce.',
  },
  'cap.leg.02:goias-tce': {
    scene: [
      { who: 'Aprendiz', text: 'Bubo, as normas internas do Tribunal estão quase ilegíveis. Algumas páginas a névoa levou por inteiro.' },
      { who: 'Bubo', text: 'Por isso este capítulo é um mapa, não um tratado. Sabemos os nomes, os assuntos e alguns pontos conferidos.' },
      { who: 'Arquivista', text: 'O que ainda resta legível diz quem aprova o plano de TI e quem cuida da segurança da informação.' },
      { who: 'Bubo', text: 'Leia o mapa com atenção e, antes do Grande Exame, procure os textos completos no portal oficial.' },
    ],
    truths: [
      { statement: 'A Resolução Normativa nº 13/2016 do TCE-GO institui o Comitê Estratégico de Tecnologia da Informação (CETI).', answer: true, why: 'É o assunto da norma conforme o próprio edital.' },
      { statement: 'A Resolução Administrativa nº 17/2024 do TCE-GO trata da estrutura da Diretoria de Tecnologia da Informação.', answer: false, why: 'A RA 17/2024 é a Política de Segurança da Informação. A estrutura da DTI é assunto da RA 14/2025.' },
      { statement: 'A Lei Complementar estadual nº 205/2025 trata de inovação em inteligência artificial em Goiás.', answer: true, why: 'Ela institui a Política Estadual de Fomento à Inovação em Inteligência Artificial.' },
    ],
    blanks: [
      { sentence: 'Na relação entre as normas, o CETI é a instância de ___, e a DTI, de gestão.', options: ['governança', 'auditoria externa', 'operação', 'fiscalização contratual'], answer: 'governança', why: 'O texto relaciona o CETI ao papel de avaliar, dirigir e monitorar, e a DTI à gestão.' },
      { sentence: 'No TCE-GO, a Política de Governança Organizacional é a Resolução Administrativa nº ___.', options: ['14/2024', '17/2024', '13/2016', '14/2025'], answer: '14/2024', why: 'Conforme o edital, a RA 14/2024 é a Política de Governança Organizacional do Tribunal.' },
    ],
    outro: 'O mapa das normas está no seu diário. Quando os textos completos voltarem ao Cartório, você saberá exatamente onde encaixá-los.',
  },

  // ===== grim.engsoft: O Caderno dos Arquitetos (Oficinas dos Arquitetos) =====
  'cap.es.01:ciclo': {
    scene: [
      { who: 'Morador', text: 'Mestre auditor, há dois anos construímos o sistema de protocolo de uma vez só. No dia da entrega, já não servia para nada.' },
      { who: 'Aprendiz', text: 'Dois anos sem mostrar nada a ninguém? As regras do Reino mudaram três vezes nesse tempo.' },
      { who: 'Bubo', text: 'Nem toda obra deve seguir o mesmo caminho. Há ciclos que entregam em fatias e outros que refinam a cada volta.' },
      { who: 'Bubo', text: 'Leia sobre ciclos de vida, Kanban, Lean e XP. Assim saberemos se o erro foi do método ou de quem o escolheu.' },
    ],
    truths: [
      { statement: 'O modelo espiral, de Boehm, é iterativo e orientado a riscos.', answer: true, why: 'É assim que a seção caracteriza o modelo espiral.' },
      { statement: 'No Kanban, o lead time mede o tempo do início do trabalho até a entrega.', answer: false, why: 'Isso é o cycle time. O lead time vai do pedido até a entrega.' },
      { statement: 'Programação em par e propriedade coletiva do código estão entre as práticas do XP.', answer: true, why: 'Ambas aparecem na lista de práticas mais cobradas do Extreme Programming.' },
    ],
    blanks: [
      { sentence: 'O modelo em ___ associa cada fase de especificação a um nível de teste.', options: ['V', 'espiral', 'cascata', 'incremental'], answer: 'V', why: 'O modelo em V liga cada fase de especificação a um nível de teste correspondente.' },
      { sentence: 'No Lean, decidir no último momento responsável corresponde ao princípio de ___ compromissos.', options: ['adiar', 'antecipar', 'eliminar', 'documentar'], answer: 'adiar', why: 'Adiar compromissos é um dos sete princípios do Lean Software Development.' },
    ],
    outro: 'O novo protocolo será entregue em partes, com o cliente por perto. As Oficinas voltam a ouvir quem usa o que constroem.',
  },
  'cap.es.01:requisitos': {
    scene: [
      { who: 'Morador', text: 'O pedido dizia apenas: o sistema deve ser rápido. Os arquitetos entregaram, e cada consulta leva um minuto inteiro.' },
      { who: 'Aprendiz', text: 'Rápido para quem? Sem um número, ninguém pode dizer se o pedido foi cumprido.' },
      { who: 'Bubo', text: 'Exato. Um requisito vago é uma porta aberta para a névoa, e para fornecedores que gostam de discutir o que entregaram.' },
      { who: 'Bubo', text: 'Leia sobre requisitos funcionais e não funcionais, histórias de usuário e casos de uso.' },
    ],
    truths: [
      { statement: 'Na priorização MoSCoW, as letras correspondem a must, should, could e won’t.', answer: true, why: 'É a técnica de priorização citada na atividade de análise de requisitos.' },
      { statement: 'Rastreabilidade, do requisito ao código e ao teste, faz parte do gerenciamento de requisitos.', answer: true, why: 'O gerenciamento controla mudanças, versões e rastreabilidade.' },
      { statement: 'No caso de uso, o fluxo principal descreve o tratamento das situações de exceção.', answer: false, why: 'O fluxo principal é o cenário de sucesso. As situações excepcionais ficam nos fluxos de exceção.' },
    ],
    blanks: [
      { sentence: 'No acrônimo INVEST, a letra T indica que a história deve ser ___.', options: ['testável', 'técnica', 'temporária', 'total'], answer: 'testável', why: 'INVEST: independente, negociável, valiosa, estimável, pequena (small) e testável.' },
      { sentence: 'No diagrama de casos de uso, o caso que acontece só em certas condições é ligado por ___.', options: ['extend', 'include', 'generalização', 'associação'], answer: 'extend', why: 'O extend representa comportamento opcional; o include é executado sempre.' },
    ],
    outro: 'O pedido agora diz até 2 segundos para 95% das consultas. Com um número, nenhuma entrega malfeita passa despercebida.',
  },
  'cap.es.02:arquitetura': {
    scene: [
      { who: 'Arquivista', text: 'Quando o serviço de pagamentos cai, caem junto o protocolo, o cadastro e o portal. Tudo usa o mesmo banco.' },
      { who: 'Aprendiz', text: 'Então uma falha num canto derruba o Reino inteiro. Alguém desenhou isso assim de propósito?' },
      { who: 'Bubo', text: 'Talvez por pressa, talvez por descuido. A forma como as peças se ligam decide até onde uma falha se espalha.' },
      { who: 'Bubo', text: 'Leia sobre estilos arquiteturais, coesão, acoplamento e os princípios SOLID.' },
    ],
    truths: [
      { statement: 'O padrão circuit breaker para de chamar um serviço que está falhando.', answer: true, why: 'É a definição do padrão apresentada entre os padrões associados aos estilos arquiteturais.' },
      { statement: 'No SOA, o barramento centralizado (ESB) elimina qualquer ponto de acoplamento entre os sistemas.', answer: false, why: 'O texto aponta o contrário: o barramento centralizado pode virar gargalo e ponto de acoplamento.' },
      { statement: 'O princípio da inversão de dependência recomenda depender de abstrações, e não de implementações concretas.', answer: true, why: 'É a letra D do SOLID.' },
    ],
    blanks: [
      { sentence: 'O padrão que separa as operações de escrita e de leitura chama-se ___.', options: ['CQRS', 'saga', 'API Gateway', 'event sourcing'], answer: 'CQRS', why: 'CQRS separa escrita e leitura; a saga trata transações distribuídas com compensação.' },
      { sentence: 'O princípio que diz para não implementar o que ainda não é necessário é o ___.', options: ['YAGNI', 'DRY', 'KISS', 'SOLID'], answer: 'YAGNI', why: 'YAGNI (You Aren’t Gonna Need It) desaconselha antecipar o que não é necessário.' },
    ],
    outro: 'Cada serviço ganhou seus próprios dados e um disjuntor na porta. Quando um cair, os outros seguem de pé.',
  },
  'cap.es.02:modelagem': {
    scene: [
      { who: 'Aprendiz', text: 'Encontrei o desenho do fluxo de pagamentos. Há um caminho que pula a aprovação do Conselho quando o valor é alto.' },
      { who: 'Bubo', text: 'Um losango fora do lugar pode mudar quem decide o quê. Antes de acusar, precisamos ler o desenho do jeito certo.' },
      { who: 'Arquivista', text: 'Temos também os diagramas do sistema de contratos, mas ninguém aqui sabe o que significa cada losango e cada seta.' },
      { who: 'Bubo', text: 'Leia sobre UML, BPMN e padrões de projeto. Depois examinamos o desenho juntos.' },
    ],
    truths: [
      { statement: 'Na UML 2.5, há 14 diagramas, sendo 7 estruturais e 7 comportamentais.', answer: true, why: 'É a divisão apresentada na seção.' },
      { statement: 'Na BPMN, o gateway paralelo segue um único caminho, conforme a condição.', answer: false, why: 'Um único caminho é o comportamento do gateway exclusivo. O paralelo segue todos os caminhos ao mesmo tempo.' },
      { statement: 'O padrão Observer notifica vários objetos quando um deles muda de estado.', answer: true, why: 'É a definição do Observer, apontado como base de eventos.' },
    ],
    blanks: [
      { sentence: 'Na UML, o diagrama que mostra a troca de mensagens entre objetos ao longo do tempo é o de ___.', options: ['sequência', 'classes', 'implantação', 'componentes'], answer: 'sequência', why: 'O diagrama de sequência usa linhas de vida verticais para mostrar mensagens ao longo do tempo.' },
      { sentence: 'O padrão que oferece uma interface simples para um subsistema complexo é o ___.', options: ['Facade', 'Singleton', 'Strategy', 'Builder'], answer: 'Facade', why: 'Facade simplifica o acesso a um subsistema; é um padrão estrutural.' },
    ],
    outro: 'O desenho mostra que o atalho foi incluído depois, por alguém de fora da equipe. A pista vai para o diário.',
  },
  'cap.es.02:qualidade': {
    scene: [
      { who: 'Morador', text: 'Toda vez que os arquitetos corrigem um erro no sistema de diárias, outro volta a aparecer onde já funcionava.' },
      { who: 'Aprendiz', text: 'E ninguém confere nada antes de publicar. Cada mudança é um salto no escuro.' },
      { who: 'Bubo', text: 'Isso tem nome: atalhos de ontem cobrando juros hoje. E existem testes feitos justamente para esse tipo de recaída.' },
      { who: 'Bubo', text: 'Leia sobre atributos de qualidade, tipos de teste, revisão de código e dívida técnica.' },
    ],
    truths: [
      { statement: 'O teste de regressão verifica se o que funcionava continua funcionando após mudanças.', answer: true, why: 'É a definição de teste de regressão da seção, com o exemplo de rodar a suíte a cada commit.' },
      { statement: 'Partição de equivalência e valor-limite são técnicas de teste caixa-branca.', answer: false, why: 'São técnicas de caixa-preta, que olham só entradas e saídas. A caixa-branca mede cobertura de comandos e desvios.' },
      { statement: 'A dívida técnica pode ser deliberada, como um atalho consciente com plano de pagamento.', answer: true, why: 'O texto distingue a dívida deliberada da inadvertida, que ocorre por desconhecimento.' },
    ],
    blanks: [
      { sentence: 'O tempo médio entre falhas, usado para medir confiabilidade, é indicado pela sigla ___.', options: ['MTBF', 'MTTR', 'SLA', 'WIP'], answer: 'MTBF', why: 'MTBF mede confiabilidade; o MTTR, tempo médio de reparo, aparece como medida de manutenibilidade.' },
      { sentence: 'Melhorar a estrutura interna do código sem alterar o comportamento externo é ___.', options: ['refatoração', 'regressão', 'integração', 'aceitação'], answer: 'refatoração', why: 'Refatorar muda a estrutura sem mudar o comportamento e depende de testes para garantir isso.' },
    ],
    outro: 'O sistema de diárias ganhou testes e revisão antes de cada entrega. As Oficinas voltaram a construir com prumo.',
  },

  // ===== grim.devops: O Diário do Porto (Porto das Entregas) =====
  'cap.devops.01:git': {
    scene: [
      { who: 'Morador', text: 'Auditor, alguém mexeu no código do sistema de cargas do Porto. A versão que funcionava sumiu, e cada um tem uma cópia diferente.' },
      { who: 'Aprendiz', text: 'Se o histórico estiver guardado, dá para saber quem mudou o quê e voltar atrás.' },
      { who: 'Bubo', text: 'Dá, mas há jeitos de voltar que apagam rastros e jeitos que os preservam. Para uma investigação, isso faz toda a diferença.' },
      { who: 'Bubo', text: 'Leia sobre Git, estratégias de branching e pull requests.' },
    ],
    truths: [
      { statement: 'O git revert cria um novo commit que desfaz outro, preservando o histórico.', answer: true, why: 'Por isso o revert é seguro em branch compartilhado, ao contrário de reescrever o histórico.' },
      { statement: 'No Git Flow, as correções urgentes de produção costumam ficar em branches feature/*.', answer: false, why: 'O Git Flow tem branches próprios hotfix/* para isso; feature/* é para novas funcionalidades.' },
      { statement: 'Uma senha enviada por engano continua no histórico mesmo depois de apagada no commit seguinte.', answer: true, why: 'Por isso a seção orienta revogar a senha, e não apenas apagá-la do arquivo.' },
    ],
    blanks: [
      { sentence: 'O comando que guarda temporariamente alterações ainda não confirmadas é o ___.', options: ['git stash', 'git tag', 'git fetch', 'git cherry-pick'], answer: 'git stash', why: 'O git stash guarda alterações não confirmadas; o cherry-pick aplica um commit específico em outro branch.' },
      { sentence: 'O arquivo que indica revisores obrigatórios por área do repositório é o ___.', options: ['CODEOWNERS', '.gitignore', 'Jenkinsfile', 'compose.yaml'], answer: 'CODEOWNERS', why: 'O CODEOWNERS define revisores obrigatórios; o .gitignore lista o que não deve ser versionado.' },
    ],
    outro: 'O histórico do Porto mostra a mudança, o dia e a conta usada. Era a conta de um servidor que estava de férias.',
  },
  'cap.devops.01:cicd': {
    scene: [
      { who: 'Morador', text: 'Os navios saem do Porto sem inspeção. Um deles voltou com o casco furado e ninguém sabe em que doca foi montado.' },
      { who: 'Aprendiz', text: 'Se cada navio passasse pelas mesmas inspeções, na mesma ordem, saberíamos onde o defeito entrou.' },
      { who: 'Bubo', text: 'É essa a ideia de uma esteira automática. E também há formas de lançar um navio novo sem arriscar a frota inteira.' },
      { who: 'Bubo', text: 'Leia sobre CI/CD, pipelines, ambientes e estratégias de implantação.' },
    ],
    truths: [
      { statement: 'Pelo princípio construa uma vez, implante muitas, o mesmo artefato passa por todos os ambientes, mudando só a configuração.', answer: true, why: 'É um dos princípios do pipeline descritos na seção.' },
      { statement: 'O ambiente de homologação deve ser uma réplica o mais fiel possível da produção.', answer: true, why: 'A homologação serve a testes e ao aceite do usuário, por isso deve se parecer com a produção.' },
      { statement: 'No GitHub Actions, os workflows são configurados no arquivo .gitlab-ci.yml, na raiz do repositório.', answer: false, why: 'O GitHub Actions usa arquivos YAML em .github/workflows/. O .gitlab-ci.yml é do GitLab CI/CD.' },
    ],
    blanks: [
      { sentence: 'A estratégia em que a nova versão recebe primeiro uma pequena fatia dos usuários é a ___.', options: ['canary', 'blue-green', 'rolling', 'feature flag'], answer: 'canary', why: 'Na canary, amplia-se a fatia se as métricas estiverem boas; no blue-green, a troca é de uma vez.' },
      { sentence: 'No Jenkins, os pipelines são descritos num arquivo chamado ___.', options: ['Jenkinsfile', 'Dockerfile', 'playbook', 'workflow.yml'], answer: 'Jenkinsfile', why: 'O Jenkinsfile descreve o pipeline, de forma declarativa ou scripted.' },
    ],
    outro: 'Agora todo navio passa pela mesma esteira antes de zarpar. Nenhuma avaria embarca sem que o diário registre.',
  },
  'cap.devops.02:iac-containers': {
    scene: [
      { who: 'Morador', text: 'O armazém novo do Porto foi montado à mão. Ninguém consegue montar outro igual, e ele já está diferente da planta.' },
      { who: 'Aprendiz', text: 'Se a planta estivesse escrita e versionada, daria para reconstruir o armazém idêntico quantas vezes fosse preciso.' },
      { who: 'Bubo', text: 'E daria para ver quem mexeu fora da planta. A névoa adora mudanças manuais que ninguém registrou.' },
      { who: 'Bubo', text: 'Leia sobre infraestrutura como código, Docker e Kubernetes.' },
    ],
    truths: [
      { statement: 'O Ansible é agentless, conecta-se por SSH e usa playbooks em YAML.', answer: true, why: 'É a descrição do Ansible na parte de gerenciamento de configuração.' },
      { statement: 'Um volume, no Docker, é armazenamento que desaparece junto com o contêiner.', answer: false, why: 'O volume é armazenamento persistente fora do ciclo de vida do contêiner.' },
      { statement: 'No Kubernetes, a probe de readiness indica quando o Pod está pronto para receber tráfego.', answer: true, why: 'A readiness controla o recebimento de tráfego; a liveness reinicia o contêiner que travou.' },
    ],
    blanks: [
      { sentence: 'A diferença entre o código de infraestrutura e o ambiente real, geralmente por mudanças manuais, chama-se ___.', options: ['deriva de configuração', 'idempotência', 'infraestrutura imutável', 'multi-stage build'], answer: 'deriva de configuração', why: 'A deriva (drift) surge quando o ambiente muda fora do código.' },
      { sentence: 'No Kubernetes, o objeto que dá endereço estável e balanceamento a um conjunto de Pods é o ___.', options: ['Service', 'Deployment', 'Namespace', 'ConfigMap'], answer: 'Service', why: 'O Service oferece endereço estável e balanceamento; o Deployment mantém o número de réplicas.' },
    ],
    outro: 'O armazém agora nasce de uma planta versionada. Quem mexer por fora vai aparecer como deriva no próximo plano.',
  },
  'cap.devops.02:observabilidade': {
    scene: [
      { who: 'Morador', text: 'O sistema de despacho do Porto fica lento toda tarde. Os painéis mostram tudo verde, e mesmo assim as filas crescem.' },
      { who: 'Aprendiz', text: 'Se os painéis só respondem às perguntas que alguém previu, a lentidão pode estar onde ninguém olhou.' },
      { who: 'Bubo', text: 'Isso separa vigiar de enxergar. Precisamos seguir uma requisição de ponta a ponta e ver onde o tempo se perde.' },
      { who: 'Bubo', text: 'Leia sobre os três sinais, telemetria, indicadores e alertas.' },
    ],
    truths: [
      { statement: 'O Prometheus coleta métricas por pull e as guarda em série temporal.', answer: true, why: 'É a descrição do Prometheus na seção; o Grafana fica com os painéis.' },
      { statement: 'Os sinais dourados do SRE do Google são latência, tráfego, erros e saturação.', answer: true, why: 'São os quatro sinais dourados listados no texto.' },
      { statement: 'Bons alertas disparam a cada oscilação de CPU, mesmo sem efeito para o usuário.', answer: false, why: 'Bons alertas disparam por sintomas que afetam o usuário, são acionáveis e evitam a fadiga de alertas.' },
    ],
    blanks: [
      { sentence: 'Com um SLO de 99,5%, o orçamento de erro corresponde a ___ das requisições.', options: ['0,5%', '99,5%', '1%', '5%'], answer: '0,5%', why: 'O orçamento de erro é 100% menos o SLO: 100% − 99,5% = 0,5%.' },
      { sentence: 'O padrão aberto da CNCF para gerar e coletar métricas, logs e traces é o ___.', options: ['OpenTelemetry', 'Grafana', 'Jaeger', 'Loki'], answer: 'OpenTelemetry', why: 'O OpenTelemetry é o padrão aberto; Grafana, Jaeger e Loki são ferramentas de painel, traces e logs.' },
    ],
    outro: 'O trace mostrou a lentidão num serviço que consulta o Tesouro toda tarde. O Porto tem faróis, e a névoa recua do cais.',
  },
};
