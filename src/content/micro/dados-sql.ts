// Série "SQL e álgebra relacional" (cap.dados.01, trecho sql), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como surgiram a álgebra relacional, o SEQUEL e o padrão SQL; as
// seguintes ensinam comandos e consultas (ordem lógica, WHERE e HAVING, NULL), depois junções,
// subconsultas, álgebra, visões e gatilhos, uma ideia por etapa. Fatos conferidos com o texto do
// capítulo (02-sql.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dados.01', sectionId: 'sql' } as const;

export const dadosSqlHistoria: MicroLesson = {
  ...S,
  id: 'dados.sql.1',
  series: { id: 'dados.sql', order: 1 },
  title: 'Da álgebra de Codd ao padrão SQL',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você quer saber, numa tabela de empenhos, quanto cada fornecedor recebeu em 2026. Precisa escrever um programa inteiro, passo a passo?',
    options: [
      { text: 'Não: basta descrever o que se quer, numa consulta', why: 'Isso. Esta aula conta como nasceu essa forma de perguntar ao banco.' },
      { text: 'Sim, com laços e condições para cada linha', why: 'Daria, mas o SQL foi criado para você só dizer o que quer. Esta aula conta como.' },
      { text: 'Não dá para saber isso pelo computador', why: 'Dá, e em segundos. Esta aula mostra a origem da linguagem que faz isso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'algebra',
      part: 'A história',
      title: '1970: operações sobre tabelas',
      art: 'abaco',
      goal: 'Saber que Codd descreveu a álgebra relacional junto com o modelo.',
      explain:
        'Junto com o modelo relacional, em **1970**, **Codd** descreveu **operações matemáticas sobre tabelas**:\n\n- **selecionar linhas** que atendem a uma condição;\n- **escolher colunas**;\n- **combinar** tabelas.\n\nEsse conjunto de operações se chama **álgebra relacional**. Ela é a **base teórica** de toda consulta que se faz hoje.',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'O que é a álgebra relacional?',
        options: [
          { text: 'Operações matemáticas sobre tabelas, a base das consultas', why: 'Isso.' },
          { text: 'Um tipo de índice', why: 'Índices aceleram buscas; a álgebra é a teoria das consultas.' },
          { text: 'A matéria de matemática do ensino médio', why: 'É um conjunto de operações sobre tabelas, descrito por Codd.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Assim como a aritmética tem **somar** e **multiplicar** números, a álgebra relacional tem **filtrar linhas**, **escolher colunas** e **juntar tabelas**. Toda consulta, por mais longa, é uma combinação dessas operações.',
        check: {
          kind: 'choice',
          id: 'al-r',
          prompt: 'Quem descreveu a álgebra relacional?',
          options: [
            { text: 'Edgar F. Codd, junto com o modelo relacional', why: 'Isso.' },
            { text: 'Peter Chen', why: 'Chen criou o diagrama entidade-relacionamento.' },
            { text: 'Jim Gray', why: 'Jim Gray é lembrado pelo trabalho com transações.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sequel',
      part: 'A história',
      title: '1974: o SEQUEL',
      art: 'teclado',
      goal: 'Saber que o SQL nasceu como SEQUEL na IBM.',
      explain:
        'Fórmulas matemáticas não são práticas no dia a dia. Em **1974**, na IBM, **Donald Chamberlin** e **Raymond Boyce** criaram uma linguagem com palavras do **inglês simples** para consultar tabelas: o **SEQUEL**.\n\nEla foi usada no protótipo **System R**.\n\nMais tarde, o nome foi **encurtado** para **SQL**. Por isso muita gente ainda pronuncia "síquel".',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Qual era o nome original do SQL?',
        options: [
          { text: 'SEQUEL', why: 'Isso, criado na IBM em 1974.' },
          { text: 'FORTRAN', why: 'FORTRAN é linguagem de programação de 1957, da IBM, para cálculos.' },
          { text: 'Python', why: 'Python é de 1991.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A ideia do SEQUEL foi trocar símbolos por **palavras**: em vez de uma fórmula, escrever algo como "SELECT nome FROM fornecedor WHERE cidade = Goiânia". Quase uma frase em inglês. Depois, o nome virou **SQL**.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Em que protótipo da IBM o SEQUEL foi usado?',
          options: [
            { text: 'System R', why: 'Isso.' },
            { text: 'ARPANET', why: 'A ARPANET foi a rede de pesquisa de 1969.' },
            { text: 'ENIAC', why: 'O ENIAC é de 1946.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'padrao',
      part: 'A história',
      title: 'Do produto ao padrão',
      art: 'livro',
      goal: 'Saber que o SQL virou norma ANSI e ISO.',
      explain:
        'Em **1979**, a empresa que depois se chamaria **Oracle** lançou um dos primeiros bancos relacionais **comerciais** com SQL.\n\nCom vários fabricantes, era preciso combinar regras. O SQL virou **norma** do **ANSI** em **1986** e da **ISO** em **1987**.\n\nPor isso o mesmo comando funciona, com **pequenas diferenças**, em **PostgreSQL**, **Oracle**, **MySQL** e **SQL Server**.',
      check: {
        kind: 'order',
        id: 'pa-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Álgebra relacional de Codd (1970)', 'SEQUEL na IBM (1974)', 'Banco comercial com SQL da futura Oracle (1979)', 'SQL vira norma ANSI (1986)'],
        why: '1970, 1974, 1979 e 1986: da teoria à linguagem, ao produto e ao padrão.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na **tomada elétrica**: com uma norma, qualquer aparelho encaixa em qualquer parede. A norma do SQL fez o mesmo: quem aprende num banco consegue usar os outros, ajustando poucos detalhes.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Por que um comando SQL funciona em bancos de fabricantes diferentes?',
          options: [
            { text: 'Porque o SQL é padronizado (ANSI e ISO)', why: 'Isso, com pequenas diferenças entre eles.' },
            { text: 'Porque todos os bancos são do mesmo fabricante', why: 'São de fabricantes diferentes; o que os aproxima é a norma.' },
            { text: 'Por sorte', why: 'É por causa da norma ANSI e ISO.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['1970: Codd descreve a álgebra relacional', '1974: Chamberlin e Boyce criam o SEQUEL', '1986: o SQL é proibido pelo ANSI'],
      bug: 2,
      why: 'Em 1986 o SQL virou norma do ANSI.',
      fixed: '1986: o SQL vira norma do ANSI',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Codd', 'Chamberlin e Boyce', 'ANSI e ISO'],
      items: [
        { text: 'Operações matemáticas sobre tabelas', cat: 0, why: 'Álgebra relacional.' },
        { text: 'Linguagem com palavras em inglês', cat: 1, why: 'SEQUEL, depois SQL.' },
        { text: 'Norma comum para todos os fabricantes', cat: 2, why: 'Padronização.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um analista que sabe SQL no PostgreSQL vai trabalhar com Oracle. O que esperar?',
      options: [
        { text: 'A mesma linguagem, com pequenas diferenças', why: 'Isso, por causa da norma.' },
        { text: 'Uma linguagem totalmente diferente', why: 'Ambos seguem o padrão SQL.' },
        { text: 'Que o Oracle não usa SQL', why: 'O Oracle foi um dos primeiros bancos comerciais com SQL.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Em 1970, Codd descreveu a álgebra relacional: operações sobre tabelas, base das consultas.',
    'Em 1974, Chamberlin e Boyce criaram o SEQUEL na IBM (System R); depois virou SQL.',
    'Em 1979, a futura Oracle lançou banco comercial com SQL; norma ANSI em 1986 e ISO em 1987.',
  ],
};

export const dadosSqlConsultas: MicroLesson = {
  ...S,
  id: 'dados.sql.2',
  series: { id: 'dados.sql', order: 2 },
  title: 'Comandos, consultas e o NULL',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Criar uma tabela, inserir um empenho e dar permissão a um usuário são o mesmo tipo de comando?',
    options: [
      { text: 'Não: cada um é de uma categoria', why: 'Isso. Esta aula começa pelas categorias e depois monta uma consulta completa.' },
      { text: 'Sim, é tudo SELECT', why: 'SELECT só consulta. Há outras categorias, e esta aula mostra cada uma.' },
      { text: 'Permissão não se dá em SQL', why: 'Dá sim, com GRANT. Esta aula mostra.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'categorias',
      part: 'Comandos',
      title: 'DDL, DML, DCL e TCL',
      art: 'dados',
      goal: 'Classificar os comandos SQL nas quatro categorias.',
      explain:
        '- **DDL** (definição): **CREATE**, **ALTER**, **DROP**, **TRUNCATE**. Mexe na **estrutura**.\n- **DML** (manipulação): **SELECT**, **INSERT**, **UPDATE**, **DELETE**. Mexe nos **dados**.\n- **DCL** (controle): **GRANT**, **REVOKE**. Mexe nas **permissões**.\n- **DTL** ou **TCL** (transação): **COMMIT**, **ROLLBACK**, **SAVEPOINT**. Confirma ou desfaz.\n\nAlgumas classificações tratam o SELECT à parte, como **DQL** (consulta).',
      check: {
        kind: 'sort',
        id: 'ca-c',
        prompt: 'Em que categoria fica cada comando?',
        categories: ['DDL', 'DML', 'DCL'],
        items: [
          { text: 'CREATE TABLE', cat: 0, why: 'Define estrutura.' },
          { text: 'UPDATE', cat: 1, why: 'Mexe nos dados.' },
          { text: 'GRANT', cat: 2, why: 'Dá permissão.' },
          { text: 'ALTER TABLE', cat: 0, why: 'Muda a estrutura.' },
        ],
      },
      recovery: {
        explain: 'Pense num **prédio**: construir ou reformar paredes é **DDL** (estrutura); mudar os móveis de lugar é **DML** (dados); entregar ou recolher chaves é **DCL** (permissões); e assinar ou rasgar o contrato da mudança é **TCL** (confirmar ou desfazer).',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'COMMIT e ROLLBACK são comandos de:',
          options: [
            { text: 'Transação (DTL ou TCL)', why: 'Isso: confirmam ou desfazem.' },
            { text: 'Definição (DDL)', why: 'DDL mexe na estrutura.' },
            { text: 'Controle de acesso (DCL)', why: 'DCL é GRANT e REVOKE.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'truncate',
      part: 'Comandos',
      title: 'DELETE sem WHERE ou TRUNCATE',
      art: 'revisao',
      goal: 'Diferenciar DELETE sem WHERE de TRUNCATE.',
      explain:
        'Os dois esvaziam uma tabela, mas de jeitos diferentes:\n\n- **DELETE sem WHERE** é **DML**: remove as linhas **uma a uma**, **pode ser desfeito** na transação e **dispara gatilhos**.\n- **TRUNCATE** é **DDL**: **esvazia a tabela inteira de uma vez**.\n\nPegadinha comum: achar que os dois são iguais.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Qual comando remove as linhas uma a uma e dispara gatilhos?',
        options: [
          { text: 'DELETE sem WHERE', why: 'Isso: é DML.' },
          { text: 'TRUNCATE', why: 'TRUNCATE esvazia de uma vez; é DDL.' },
          { text: 'DROP', why: 'DROP apaga a tabela inteira, estrutura e tudo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Esvaziar uma gaveta: **DELETE** é tirar **papel por papel**, anotando cada um (os gatilhos "veem" cada retirada). **TRUNCATE** é **virar a gaveta** de uma vez. **DROP** seria jogar fora a própria gaveta.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'TRUNCATE pertence a qual categoria?',
          options: [
            { text: 'DDL', why: 'Isso.' },
            { text: 'DML', why: 'Quem é DML é o DELETE.' },
            { text: 'DCL', why: 'DCL é permissão.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ordem',
      part: 'Consultas',
      title: 'A ordem lógica da consulta',
      art: 'degraus',
      goal: 'Conhecer a ordem lógica de execução das cláusulas.',
      explain:
        'Escreve-se a consulta começando pelo SELECT, mas o banco a **executa** numa ordem lógica diferente:\n\n1. **FROM** e **JOIN**\n2. **WHERE**\n3. **GROUP BY**\n4. **HAVING**\n5. **SELECT**\n6. **ORDER BY**\n\nEssa ordem explica muitas pegadinhas, como as das próximas etapas.',
      check: {
        kind: 'order',
        id: 'or-c',
        prompt: 'Ordene as cláusulas na ordem lógica de execução.',
        items: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'],
        why: 'De onde, filtro de linhas, agrupar, filtro de grupos, colunas, ordenar.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em preparar um relatório à mão: **pega as pastas** (FROM), **separa as de 2026** (WHERE), **empilha por fornecedor** (GROUP BY), **descarta as pilhas pequenas** (HAVING), **anota as colunas** que interessam (SELECT) e, por fim, **põe em ordem** (ORDER BY).',
        check: {
          kind: 'choice',
          id: 'or-r',
          prompt: 'Na ordem lógica, o que vem logo depois do WHERE?',
          options: [
            { text: 'GROUP BY', why: 'Isso: depois de filtrar as linhas, agrupa.' },
            { text: 'SELECT', why: 'O SELECT vem depois do GROUP BY e do HAVING.' },
            { text: 'ORDER BY', why: 'ORDER BY é o último.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'having',
      part: 'Consultas',
      title: 'WHERE filtra linhas; HAVING, grupos',
      art: 'balanca',
      goal: 'Usar WHERE e HAVING corretamente e saber onde o apelido vale.',
      explain:
        '```\nSELECT f.nome, SUM(e.valor) AS total\nFROM empenho e JOIN fornecedor f\n  ON f.cnpj = e.cnpj_fornecedor\nWHERE e.ano = 2026\nGROUP BY f.nome\nHAVING SUM(e.valor) > 100000\nORDER BY total DESC;\n```\n\n- **WHERE** filtra **linhas antes** do agrupamento e **não aceita** funções de agregação.\n- **HAVING** filtra **grupos depois**.\n- O apelido **total** vale no **ORDER BY**, mas **não no WHERE**, que roda antes do SELECT.',
      check: {
        kind: 'choice',
        id: 'ha-c',
        prompt: 'Para manter só os fornecedores com soma acima de R$ 100 mil, a condição sobre a soma vai em:',
        options: [
          { text: 'HAVING', why: 'Isso: filtra grupos depois do agrupamento.' },
          { text: 'WHERE', why: 'WHERE roda antes de agrupar e não aceita SUM.' },
          { text: 'ORDER BY', why: 'ORDER BY só ordena; não filtra.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Volte ao relatório à mão: você **separa as pastas de 2026** antes de empilhar (WHERE, por linha). Só **depois de empilhar** dá para saber o total de cada pilha e descartar as pequenas (HAVING, por grupo). Uma soma não existe antes de haver pilhas.',
        check: {
          kind: 'choice',
          id: 'ha-r',
          prompt: '"HAVING filtra linhas antes do agrupamento." Isso está:',
          options: [
            { text: 'Errado: quem faz isso é o WHERE', why: 'Isso. HAVING filtra grupos depois.' },
            { text: 'Certo', why: 'Antes do agrupamento quem filtra é o WHERE.' },
            { text: 'Certo só com ORDER BY', why: 'Não depende do ORDER BY.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'null',
      part: 'Consultas',
      title: 'O NULL e as agregações',
      art: 'vazio',
      goal: 'Tratar NULL nas comparações e nas contagens.',
      explain:
        '**NULL** significa "**desconhecido**".\n\n- Comparar com **= NULL** não dá verdadeiro: usa-se **IS NULL** e **IS NOT NULL**.\n- `COUNT(*)` conta **linhas**.\n- **COUNT(coluna)** **ignora NULL**.\n- **SUM**, **AVG**, **MIN** e **MAX** também **ignoram NULL**.\n\nExemplo: 10 linhas, telefone preenchido em 7. `COUNT(*)` dá **10**; **COUNT(telefone)** dá **7**.',
      check: {
        kind: 'choice',
        id: 'nu-c',
        prompt: 'Tabela com 8 linhas; e-mail preenchido em 5. Quanto dão COUNT(*) e COUNT(email)?',
        options: [
          { text: '8 e 5', why: 'Isso: COUNT(*) conta linhas; COUNT(email) ignora NULL.' },
          { text: '8 e 8', why: 'COUNT(coluna) ignora os NULL.' },
          { text: '5 e 5', why: 'COUNT(*) conta todas as linhas, mesmo com NULL.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'NULL é uma **casa em branco** no formulário: não é zero, é "não se sabe". Contar **formulários** (`COUNT(*)`) inclui os em branco; contar **e-mails preenchidos** (COUNT(email)) não. E perguntar "é igual a não se sabe?" não tem resposta: por isso existe **IS NULL**.',
        check: {
          kind: 'choice',
          id: 'nu-r',
          prompt: 'Como encontrar as linhas sem telefone?',
          options: [
            { text: 'WHERE telefone IS NULL', why: 'Isso.' },
            { text: 'WHERE telefone = NULL', why: 'Comparar com = NULL nunca dá verdadeiro.' },
            { text: 'WHERE telefone = 0', why: 'NULL não é zero.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['WHERE filtra linhas antes de agrupar', 'HAVING filtra grupos', 'COUNT(coluna) conta também os nulos'],
      bug: 2,
      why: 'COUNT(coluna) ignora NULL; só COUNT(*) conta todas as linhas.',
      fixed: 'COUNT(coluna) ignora os nulos',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Onde vai cada condição?',
      categories: ['WHERE', 'HAVING'],
      items: [
        { text: 'ano = 2026', cat: 0, why: 'Condição de linha.' },
        { text: 'SUM(valor) > 100000', cat: 1, why: 'Condição de grupo.' },
        { text: 'COUNT(*) >= 3', cat: 1, why: 'Condição de grupo.' },
        { text: 'orgao = \'SEDUC\'', cat: 0, why: 'Condição de linha.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual consulta está correta?',
      scenarios: [
        { title: 'Consulta A', body: '```\nSELECT orgao, SUM(valor) AS total\nFROM empenho\nWHERE total > 1000\nGROUP BY orgao;\n```' },
        { title: 'Consulta B', body: '```\nSELECT orgao, SUM(valor) AS total\nFROM empenho\nGROUP BY orgao\nHAVING SUM(valor) > 1000;\n```' },
      ],
      answer: 1,
      why: 'Na A, o WHERE usa um apelido e uma soma que ainda não existem. A B filtra o grupo no HAVING.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.006' },
  ],
  summary: [
    'DDL (CREATE, ALTER, DROP, TRUNCATE), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK, SAVEPOINT).',
    'DELETE sem WHERE é DML, linha a linha, desfazível e com gatilhos; TRUNCATE é DDL, esvazia de uma vez.',
    'Ordem lógica: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.',
    'WHERE filtra linhas e não aceita agregação; HAVING filtra grupos. O apelido vale no ORDER BY, não no WHERE.',
    'NULL é desconhecido: use IS NULL. COUNT(*) conta linhas; COUNT(coluna), SUM e AVG ignoram NULL.',
  ],
};

export const dadosSqlJuncoes: MicroLesson = {
  ...S,
  id: 'dados.sql.3',
  series: { id: 'dados.sql', order: 3 },
  title: 'Junções, subconsultas, álgebra e gatilhos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você quer a lista de todos os fornecedores, inclusive os que nunca receberam empenho. Juntar só as linhas que combinam nas duas tabelas resolve?',
    options: [
      { text: 'Não: os sem empenho sumiriam', why: 'Isso. Esta aula mostra os tipos de junção e qual usar.' },
      { text: 'Sim, sempre aparecem todos', why: 'A junção que só pega correspondências deixa de fora os sem empenho.' },
      { text: 'Não dá para fazer isso em SQL', why: 'Dá, com o tipo certo de junção.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'joins',
      part: 'Junções',
      title: 'Os tipos de junção',
      art: 'rede',
      goal: 'Distinguir INNER, LEFT, RIGHT, FULL e CROSS JOIN.',
      explain:
        '- **INNER JOIN**: só as linhas **com correspondência** nas duas tabelas.\n- **LEFT JOIN**: **todas da esquerda**; da direita, só as correspondentes (o resto vira **NULL**).\n- **RIGHT JOIN**: o inverso do LEFT.\n- **FULL JOIN**: **todas** as linhas das duas, casando quando possível.\n- **CROSS JOIN**: **produto cartesiano**, cada linha com cada linha.',
      check: {
        kind: 'choice',
        id: 'jo-c',
        prompt: 'Para listar todos os fornecedores (à esquerda), com ou sem empenho (à direita), use:',
        options: [
          { text: 'LEFT JOIN', why: 'Isso: mantém todas as linhas da esquerda.' },
          { text: 'INNER JOIN', why: 'O INNER descartaria os fornecedores sem empenho.' },
          { text: 'CROSS JOIN', why: 'O CROSS combina cada fornecedor com cada empenho, sem critério.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine a **lista de convidados** (esquerda) e a **lista de presença** (direita). **INNER**: só quem foi convidado **e** veio. **LEFT**: **todos os convidados**, com "não veio" (NULL) para os ausentes. **FULL**: todos os convidados e todos os presentes. **CROSS**: cada convidado pareado com cada presente.',
        check: {
          kind: 'choice',
          id: 'jo-r',
          prompt: 'Qual junção traz só as linhas com correspondência nas duas tabelas?',
          options: [
            { text: 'INNER JOIN', why: 'Isso.' },
            { text: 'FULL JOIN', why: 'O FULL traz todas, mesmo sem correspondência.' },
            { text: 'LEFT JOIN', why: 'O LEFT traz todas da esquerda.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sem-par',
      part: 'Junções',
      title: 'Achar quem não tem par',
      art: 'vazio',
      goal: 'Listar registros sem correspondência com LEFT JOIN e IS NULL.',
      explain:
        'Para listar só os fornecedores **sem** empenho:\n\n```\nSELECT f.nome\nFROM fornecedor f\nLEFT JOIN empenho e\n  ON e.cnpj_fornecedor = f.cnpj\nWHERE e.cnpj_fornecedor IS NULL;\n```\n\nO LEFT JOIN traz todos; quem não tem empenho vem com as colunas de empenho em **NULL**. O **WHERE ... IS NULL** fica só com esses. Outra forma é **NOT EXISTS**.',
      check: {
        kind: 'choice',
        id: 'sp-c',
        prompt: 'Depois do LEFT JOIN, que condição deixa só os fornecedores sem empenho?',
        options: [
          { text: 'WHERE e.cnpj_fornecedor IS NULL', why: 'Isso: sem par, as colunas de empenho vêm nulas.' },
          { text: 'WHERE e.cnpj_fornecedor = NULL', why: '= NULL nunca é verdadeiro; use IS NULL.' },
          { text: 'HAVING COUNT(*) > 0', why: 'Isso pegaria quem tem empenho.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na lista de convidados com presença, quem **não veio** fica com o campo "chegada" **em branco**. Para achar os ausentes, filtre os que estão em branco: **IS NULL**. É o mesmo truque com fornecedor e empenho.',
        check: {
          kind: 'choice',
          id: 'sp-r',
          prompt: 'Além do LEFT JOIN com IS NULL, que outra forma lista os fornecedores sem empenho?',
          options: [
            { text: 'NOT EXISTS', why: 'Isso.' },
            { text: 'CROSS JOIN', why: 'O CROSS faz produto cartesiano.' },
            { text: 'TRUNCATE', why: 'TRUNCATE esvazia a tabela.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'subconsulta',
      part: 'Subconsultas',
      title: 'Consulta dentro de consulta',
      art: 'degraus',
      goal: 'Ler uma subconsulta correlacionada e diferenciar IN de EXISTS.',
      explain:
        '```\nSELECT * FROM empenho e\nWHERE e.valor > (\n  SELECT AVG(valor) FROM empenho x\n  WHERE x.ano = e.ano);\n```\n\nEssa consulta traz empenhos **acima da média do próprio ano**. A subconsulta usa **e.ano**, da consulta de fora: é **correlacionada**.\n\n- **IN** compara com uma **lista**.\n- **EXISTS** testa se a subconsulta devolve **alguma linha** e **para na primeira**.',
      check: {
        kind: 'choice',
        id: 'sc-c',
        prompt: 'Por que a subconsulta do exemplo é correlacionada?',
        options: [
          { text: 'Ela usa e.ano, da consulta de fora', why: 'Isso: depende da linha de fora.' },
          { text: 'Porque usa AVG', why: 'AVG é agregação; o que a torna correlacionada é usar coluna de fora.' },
          { text: 'Porque está entre parênteses', why: 'Toda subconsulta está entre parênteses.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Para cada empenho, a pergunta de dentro muda: "qual a média **do ano deste empenho**?". Como depende de quem está sendo olhado fora, é **correlacionada**. Já o **EXISTS** é como perguntar "tem alguém?": ao achar o primeiro, já responde sim.',
        check: {
          kind: 'choice',
          id: 'sc-r',
          prompt: 'Qual operador testa se a subconsulta devolve alguma linha e para na primeira?',
          options: [
            { text: 'EXISTS', why: 'Isso.' },
            { text: 'IN', why: 'IN compara com uma lista de valores.' },
            { text: 'ORDER BY', why: 'ORDER BY ordena.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'algebra',
      part: 'Álgebra',
      title: 'Seleção, projeção e companhia',
      art: 'abaco',
      goal: 'Associar as operações da álgebra relacional ao SQL.',
      explain:
        '- **Seleção (σ)**: filtra **linhas**. Em SQL, **WHERE**.\n- **Projeção (π)**: escolhe **colunas**, **sem duplicatas**. Lista do **SELECT DISTINCT**.\n- **Produto cartesiano (×)**: **CROSS JOIN**.\n- **Junção (⋈)**: **JOIN**.\n- **União, interseção, diferença (∪, ∩, −)**: **UNION**, **INTERSECT**, **EXCEPT**.\n- **Renomeação (ρ)**: **AS**.\n\nPegadinha: **seleção é linha; projeção é coluna**.',
      check: {
        kind: 'choice',
        id: 'ag-c',
        prompt: 'A operação que escolhe colunas e elimina duplicatas é a:',
        options: [
          { text: 'Projeção (π)', why: 'Isso.' },
          { text: 'Seleção (σ)', why: 'Seleção filtra linhas.' },
          { text: 'Junção (⋈)', why: 'Junção combina tabelas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Use a **luz do projetor**: ela **projeta** a imagem na parede, mostrando só uma **face**, as colunas escolhidas. A **seleção** é como **escolher** quais alunos da turma (linhas) entram na foto. Projeção recorta em pé (colunas); seleção recorta deitado (linhas).',
        check: {
          kind: 'choice',
          id: 'ag-r',
          prompt: 'A seleção (σ) corresponde, em SQL, a:',
          options: [
            { text: 'WHERE', why: 'Isso: filtra linhas.' },
            { text: 'A lista do SELECT', why: 'Escolher colunas é projeção.' },
            { text: 'AS', why: 'AS é renomeação (ρ).' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'views',
      part: 'Objetos do banco',
      title: 'Visões, procedimentos e funções',
      art: 'livro',
      goal: 'Distinguir view, view materializada, procedure e função.',
      explain:
        '- **View** (visão): **consulta salva com nome**, usada como **tabela virtual**. Simplifica e **restringe** o que cada usuário vê.\n- **View materializada**: **guarda o resultado** fisicamente. Rápida de ler; precisa ser atualizada (**REFRESH**).\n- **Procedure**: rotina no banco, **chamada explicitamente**, que pode fazer várias operações.\n- **Função**: rotina que **devolve um valor** e pode ser usada **dentro de consultas**.',
      check: {
        kind: 'choice',
        id: 'vi-c',
        prompt: 'Qual objeto guarda o resultado fisicamente e precisa de REFRESH?',
        options: [
          { text: 'View materializada', why: 'Isso.' },
          { text: 'View comum', why: 'A view comum só guarda a consulta; roda de novo a cada uso.' },
          { text: 'Função', why: 'Função é rotina que devolve valor.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **view comum** é uma **receita** guardada: toda vez que você pede, ela é feita na hora. A **materializada** é o **prato pronto na geladeira**: sai rápido, mas, se os ingredientes mudarem, é preciso refazer (REFRESH).',
        check: {
          kind: 'choice',
          id: 'vi-r',
          prompt: 'Uma view pode servir para restringir o que cada usuário vê?',
          options: [
            { text: 'Sim: mostra só as colunas e linhas permitidas', why: 'Isso.' },
            { text: 'Não: views mostram sempre a tabela inteira', why: 'A view mostra só o que a consulta dela seleciona.' },
            { text: 'Só se for materializada', why: 'Qualquer view pode restringir.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'trigger',
      part: 'Objetos do banco',
      title: 'Gatilhos: o que acontece sozinho',
      art: 'interruptor',
      goal: 'Saber o que é um trigger e para que serve.',
      explain:
        'Um **trigger** (gatilho) é uma rotina **disparada automaticamente** por um evento: **INSERT**, **UPDATE** ou **DELETE**.\n\nPode rodar **antes** (**BEFORE**) ou **depois** (**AFTER**), **por linha** ou **por comando**.\n\nUsos: **auditoria**, **validação**, manter **campos calculados**.\n\nExemplo: um trigger **AFTER UPDATE** grava, numa tabela de auditoria, o valor antigo e o novo de cada contrato alterado, **qualquer que seja a aplicação**.',
      check: {
        kind: 'choice',
        id: 'tg-c',
        prompt: 'O Tribunal quer registrar toda alteração no valor de um contrato, sem depender das aplicações. O recurso mais adequado é:',
        options: [
          { text: 'Um trigger AFTER UPDATE', why: 'Isso: dispara sozinho a cada alteração.' },
          { text: 'Uma view', why: 'A view mostra dados; não reage a alterações.' },
          { text: 'Um índice', why: 'O índice acelera buscas; não registra alterações.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **alarme da porta**: ninguém precisa lembrar de acioná-lo; **abriu, tocou**. O trigger é esse alarme dentro do banco: **alterou, gravou** a auditoria. Por isso funciona mesmo que a aplicação esqueça.',
        check: {
          kind: 'choice',
          id: 'tg-r',
          prompt: 'Qual a diferença entre procedure e trigger?',
          options: [
            { text: 'A procedure é chamada explicitamente; o trigger dispara sozinho', why: 'Isso.' },
            { text: 'Não há diferença', why: 'A forma de execução é diferente.' },
            { text: 'O trigger só existe em planilhas', why: 'Trigger é recurso do banco de dados.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual recurso usar em cada caso?',
      categories: ['LEFT JOIN', 'Trigger', 'View'],
      items: [
        { text: 'Todos os órgãos, com ou sem contrato', cat: 0, why: 'Mantém todos da esquerda.' },
        { text: 'Gravar quem apagou cada empenho', cat: 1, why: 'Auditoria automática.' },
        { text: 'Mostrar ao estagiário só nome e cidade do fornecedor', cat: 2, why: 'Restringe o que se vê.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Seleção: filtra linhas', 'INNER JOIN: só as correspondências', 'Projeção: filtra linhas'],
      bug: 2,
      why: 'Projeção escolhe colunas.',
      fixed: 'Projeção: escolhe colunas',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual consulta lista os servidores que não estão em nenhuma comissão?',
      scenarios: [
        { title: 'Consulta A', body: '```\nSELECT s.nome FROM servidor s\nINNER JOIN membro m ON m.servidor = s.id;\n```' },
        { title: 'Consulta B', body: '```\nSELECT s.nome FROM servidor s\nLEFT JOIN membro m ON m.servidor = s.id\nWHERE m.servidor IS NULL;\n```' },
      ],
      answer: 1,
      why: 'A B mantém todos e fica com os sem par. A A traz justamente quem está em comissão.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.008' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.009' },
  ],
  summary: [
    'INNER: só correspondências. LEFT: todas da esquerda. RIGHT: o inverso. FULL: todas. CROSS: produto cartesiano.',
    'Sem par: LEFT JOIN com WHERE ... IS NULL, ou NOT EXISTS.',
    'Subconsulta correlacionada usa coluna da consulta de fora. IN compara com lista; EXISTS para na primeira linha.',
    'Seleção (σ) filtra linhas (WHERE); projeção (π) escolhe colunas sem duplicatas.',
    'View: consulta salva; materializada: resultado guardado (REFRESH). Procedure: chamada; trigger: dispara sozinho.',
  ],
};
