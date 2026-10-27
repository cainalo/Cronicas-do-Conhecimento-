// Caso prático de SQL (tópico ti.dados.sql do edital TCE-GO 2026, B02).
// Conceitos conferidos com o capítulo cap.dados.01 (seção "sql") e com a lógica de três valores
// implementada em src/lib/sql.ts. Os fornecedores e valores são fictícios.
import type { Mission } from '@/content/types';

const fornecedor = {
  name: 'fornecedor',
  columns: ['cnpj', 'nome', 'cidade'],
  rows: [
    [11, 'Alfa Tecnologia', 'Goiânia'],
    [22, 'Papelaria Central', 'Anápolis'],
    [33, 'TecnoDados', 'Goiânia'],
    [44, 'Serviços Integrados', null],
  ],
};

const empenho = {
  name: 'empenho',
  columns: ['id', 'cnpj_fornecedor', 'valor', 'ano', 'status'],
  rows: [
    [1, 11, 12000, 2026, 'pago'],
    [2, 22, 3500, 2026, 'pago'],
    [3, 11, 8000, 2025, 'pago'],
    [4, 44, 95000, 2026, null],
    [5, 44, 87000, 2026, null],
    [6, 99, 40000, 2026, 'pago'],
  ],
};

const ON: [string, string] = ['empenho.cnpj_fornecedor', 'fornecedor.cnpj'];

export const missaoSql01: Mission = {
  id: 'missao.sql.01',
  title: 'A lista que veio vazia',
  chapterId: 'cap.dados.01',
  sectionId: 'sql',
  topicIds: ['ti.dados.sql'],
  minutes: 12,
  place: 'Auditoria de dados e empenhos',
  mystery: 'Por que a lista de empenhos sem conferência veio vazia, se a equipe de controle tem certeza de que há pagamentos pendentes?',
  objectives: [
    'Ler uma tabela: linha, coluna e chave.',
    'Filtrar linhas com WHERE e entender por que NULL não se compara com "=".',
    'Juntar duas tabelas com JOIN e saber o que o INNER descarta.',
    'Descobrir o que a lista vazia escondia.',
  ],
  discovery: [
    {
      title: 'Uma tabela é uma planilha com regras',
      text: 'Cada **linha** é um fornecedor. Cada **coluna** é uma informação sobre ele. A coluna **cnpj** identifica cada fornecedor sem repetir: é a **chave primária**. O vazio na cidade da última linha se chama **NULL** e quer dizer "não informado".',
      table: 'fornecedor',
      check: {
        kind: 'choice',
        id: 'd1',
        prompt: 'Na tabela acima, o que identifica cada fornecedor sem repetição?',
        options: [
          { text: 'A coluna cnpj', why: 'Isso. Dois fornecedores nunca têm o mesmo cnpj; por isso ele é a chave primária.' },
          { text: 'A coluna cidade', why: 'Duas linhas são de Goiânia: cidade se repete e não identifica ninguém.' },
          { text: 'O número da linha na tela', why: 'A posição na tela muda conforme a consulta; a chave fica guardada nos dados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
    },
    {
      title: 'SELECT, FROM, WHERE',
      text: 'Uma consulta lê como uma frase:\n\n```sql\nSELECT nome\nFROM fornecedor\nWHERE cidade = \'Goiânia\';\n```\n\n**SELECT** diz quais colunas mostrar. **FROM** diz de qual tabela. **WHERE** filtra as linhas: só ficam as que tornam a condição verdadeira.',
      table: 'fornecedor',
      check: {
        kind: 'choice',
        id: 'd2',
        prompt: 'Quantas linhas essa consulta devolve?',
        options: [
          { text: 'Duas: Ferraria do Vale e Tecelagem Aurora', why: 'Exato. Só essas duas têm cidade igual a Goiânia.' },
          { text: 'Quatro, porque a tabela tem quatro linhas', why: 'O WHERE filtra: a Papelaria (Anápolis) e a Névoa Cinzenta (NULL) não passam.' },
          { text: 'Três, contando a linha sem cidade', why: 'NULL não é igual a Goiânia. Comparar com NULL nunca dá verdadeiro.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
    },
    {
      title: 'NULL não é zero nem texto vazio',
      text: 'NULL significa "não sei". Por isso, `cidade = NULL` não dá verdadeiro nem falso: dá **desconhecido**, e o WHERE descarta a linha. Para achar campos vazios, o SQL tem um teste próprio: **IS NULL**. O contrário é **IS NOT NULL**.',
      table: 'empenho',
      check: {
        kind: 'choice',
        id: 'd3',
        prompt: 'Qual condição encontra os empenhos sem status preenchido?',
        options: [
          { text: "WHERE status IS NULL", why: 'Certo. IS NULL é o teste feito para campos não informados.' },
          { text: "WHERE status = NULL", why: 'Parece natural, mas comparar com NULL dá desconhecido e nenhuma linha passa.' },
          { text: "WHERE status = ''", why: "'' é um texto vazio, que é diferente de NULL (não informado)." },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
    },
    {
      title: 'JOIN: juntar duas tabelas',
      text: 'O empenho guarda só o **cnpj_fornecedor**. Para ver o nome, juntamos as tabelas quando `empenho.cnpj_fornecedor = fornecedor.cnpj`.\n\n- **INNER JOIN** mostra só os pares que combinam.\n- **LEFT JOIN** mostra todas as linhas da tabela da esquerda; quando não há par, as colunas da direita vêm NULL.',
      table: 'empenho',
      check: {
        kind: 'choice',
        id: 'd4',
        prompt: 'O empenho 6 tem cnpj_fornecedor 99, que não existe na tabela fornecedor. Num INNER JOIN, o que acontece com ele?',
        options: [
          { text: 'Some do resultado, porque não tem par', why: 'Isso. INNER JOIN só mostra pares que combinam.' },
          { text: 'Aparece com o nome NULL', why: 'Isso acontece no LEFT JOIN, que mantém todas as linhas da esquerda.' },
          { text: 'O banco dá erro', why: 'Não há erro: a consulta roda e simplesmente não encontra par para ele.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
    },
  ],
  lab: {
    db: { fornecedor, empenho },
    tasks: [
      {
        id: 'l1',
        title: 'Aquecimento',
        ask: 'Mostre o nome dos fornecedores de Goiânia.',
        start: { select: [], from: 'fornecedor', where: [] },
        expected: { select: ['nome'], from: 'fornecedor', where: [{ col: 'cidade', op: '=', value: 'Goiânia' }] },
        hints: ['Escolha só a coluna nome.', "Acrescente um filtro: cidade = 'Goiânia'."],
        explain: 'O SELECT escolheu a coluna e o WHERE deixou passar só as linhas de Goiânia.',
      },
      {
        id: 'l2',
        title: 'A consulta do relatório',
        ask: 'Esta é a consulta que o relatório usou. Rode, veja que vem vazia e corrija para mostrar os empenhos sem status.',
        start: { select: ['id', 'valor'], from: 'empenho', where: [{ col: 'status', op: '=', value: null }] },
        expected: { select: ['id', 'valor'], from: 'empenho', where: [{ col: 'status', op: 'IS NULL' }] },
        hints: ['Rode a consulta como está. O que vem?', 'Comparar com "= NULL" nunca é verdadeiro. Troque o operador.', 'Use o operador IS NULL.'],
        explain: 'Achado: dois empenhos de 2026, R$ 95.000 e R$ 87.000, estão sem conferência. A lista do Tesoureiro veio vazia por causa do "= NULL".',
      },
      {
        id: 'l3',
        title: 'Quem recebeu?',
        ask: 'Mostre id, nome e valor de todos os empenhos, mesmo os de fornecedor que não está no cadastro.',
        start: { select: ['id', 'nome', 'valor'], from: 'empenho', join: { type: 'INNER', table: 'fornecedor', on: ON }, where: [] },
        expected: { select: ['id', 'nome', 'valor'], from: 'empenho', join: { type: 'LEFT', table: 'fornecedor', on: ON }, where: [] },
        hints: ['Conte as linhas: são 6 empenhos, mas o resultado mostra 5.', 'O INNER JOIN descarta quem não tem par.', 'Troque para LEFT JOIN.'],
        explain: 'O empenho 6, de R$ 40.000, foi pago a um cnpj (99) que não existe no cadastro de fornecedores. O INNER JOIN o escondia.',
        allowJoin: true,
      },
    ],
  },
  training: [
    {
      kind: 'order',
      id: 't1',
      prompt: 'Coloque as partes da consulta na ordem em que se escrevem.',
      items: ['SELECT nome, valor', 'FROM empenho', 'LEFT JOIN fornecedor ON empenho.cnpj_fornecedor = fornecedor.cnpj', 'WHERE ano = 2026', 'ORDER BY valor DESC'],
      why: 'Escreve-se SELECT, FROM, JOIN, WHERE e por último ORDER BY. O JOIN faz parte da origem dos dados, logo depois do FROM.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 't2',
      prompt: 'Para que serve cada pedaço? Toque num cartão e depois na caixa certa.',
      categories: ['Escolhe colunas', 'Filtra linhas', 'Junta tabelas'],
      items: [
        { text: 'SELECT nome, cidade', cat: 0, why: 'O SELECT só escolhe o que mostrar.' },
        { text: "WHERE cidade = 'Goiânia'", cat: 1, why: 'WHERE decide quais linhas ficam.' },
        { text: 'WHERE status IS NULL', cat: 1, why: 'IS NULL também é um filtro de linhas.' },
        { text: 'ON empenho.cnpj_fornecedor = fornecedor.cnpj', cat: 2, why: 'O ON diz como as linhas das duas tabelas combinam.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'multi',
      id: 't3',
      prompt: 'Quais condições trazem o empenho 4 (valor 95000, status NULL)? Marque todas.',
      options: [
        { text: 'status IS NULL', correct: true, why: 'O status do empenho 4 não foi informado.' },
        { text: 'valor > 90000', correct: true, why: '95000 é maior que 90000.' },
        { text: 'status = NULL', correct: false, why: 'Comparar com NULL dá desconhecido: a linha não passa.' },
        { text: "status <> 'pago'", correct: false, why: "Também dá desconhecido, porque o status é NULL. Muita gente erra esta." },
      ],
      errorKind: 'confusao',
      variant: {
        kind: 'multi',
        id: 't3b',
        prompt: 'Agora com a tabela fornecedor: quais condições trazem a Companhia Névoa Cinzenta (cidade NULL, cnpj 44)?',
        options: [
          { text: 'cidade IS NULL', correct: true, why: 'A cidade dela não foi informada.' },
          { text: 'cnpj = 44', correct: true, why: 'O cnpj dela é 44.' },
          { text: "cidade <> 'Goiânia'", correct: false, why: 'Com cidade NULL, a comparação dá desconhecido.' },
          { text: 'cidade = NULL', correct: false, why: 'Nunca é verdadeiro; o teste certo é IS NULL.' },
        ],
      },
    },
    {
      kind: 'compare',
      id: 't4',
      prompt: 'A coordenação quer a lista de todos os fornecedores, inclusive os que não receberam nenhum empenho. Qual consulta atende?',
      scenarios: [
        { title: 'Consulta A', body: '```sql\nSELECT nome, valor\nFROM fornecedor\nINNER JOIN empenho\n  ON empenho.cnpj_fornecedor = fornecedor.cnpj;\n```' },
        { title: 'Consulta B', body: '```sql\nSELECT nome, valor\nFROM fornecedor\nLEFT JOIN empenho\n  ON empenho.cnpj_fornecedor = fornecedor.cnpj;\n```' },
      ],
      answer: 1,
      why: 'A Consulta B mantém todos os fornecedores (tabela da esquerda). A Tecelagem Aurora, sem empenho, aparece com valor NULL. A Consulta A a esconderia.',
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 't5',
      prompt: 'Uma colega escreveu esta consulta para achar os fornecedores sem cidade, mas ela não traz nada. Toque na linha com o erro.',
      lines: ['SELECT nome', 'FROM fornecedor', 'WHERE cidade = NULL;'],
      bug: 2,
      why: 'O erro está no "= NULL". Comparar com NULL nunca dá verdadeiro.',
      fixed: 'WHERE cidade IS NULL;',
      errorKind: 'procedimento',
      variant: {
        kind: 'fix',
        id: 't5b',
        prompt: 'Outra consulta da colega: deveria listar os empenhos que já têm status. Onde está o erro?',
        lines: ['SELECT id, status', 'FROM empenho', 'WHERE status <> NULL;'],
        bug: 2,
        why: '"<> NULL" também dá desconhecido em todas as linhas.',
        fixed: 'WHERE status IS NOT NULL;',
      },
    },
    {
      kind: 'choice',
      id: 't6',
      prompt: 'A tabela empenho tem 6 linhas, e 2 delas estão com status NULL. Quanto dão COUNT(*) e COUNT(status)?',
      context: 'COUNT(*) conta linhas. COUNT(coluna) conta só os valores preenchidos daquela coluna.',
      options: [
        { text: '6 e 4', why: 'Isso. COUNT(*) conta as 6 linhas; COUNT(status) ignora os 2 NULL.' },
        { text: '6 e 6', why: 'COUNT(status) não conta os campos NULL.' },
        { text: '4 e 4', why: 'COUNT(*) conta todas as linhas, mesmo as que têm NULL em alguma coluna.' },
        { text: '6 e 2', why: '2 é a quantidade de NULL, justamente o que COUNT(status) deixa de fora.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
    {
      kind: 'tf',
      id: 't7',
      prompt: 'Num LEFT JOIN, quando uma linha da esquerda não tem par, as colunas da tabela da direita aparecem como NULL.',
      answer: true,
      why: 'É assim que o LEFT JOIN mantém todas as linhas da esquerda: preenche com NULL o que falta.',
    },
    {
      kind: 'choice',
      id: 't8',
      prompt: 'Situação nova: na tabela servidor, a coluna data_saida fica NULL para quem ainda trabalha no Tribunal. Como listar quem ainda trabalha?',
      options: [
        { text: 'WHERE data_saida IS NULL', why: 'Certo: quem não saiu não tem data de saída.' },
        { text: 'WHERE data_saida = NULL', why: 'O mesmo erro do Tesoureiro: nenhuma linha passa.' },
        { text: 'WHERE data_saida = 0', why: 'NULL não é zero.' },
        { text: 'WHERE data_saida IS NOT NULL', why: 'Isso traria justamente quem já saiu.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: { kind: 'exam', id: 'prova', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.007' },
  ending: {
    text: 'Você tem duas provas escritas: R$ 182.000 em empenhos de 2026 sem conferência para a Companhia Névoa Cinzenta, que nem cidade informou, e R$ 40.000 pagos a um cnpj que não existe no cadastro.',
    prompt: 'A quem você leva a consulta primeiro?',
    options: [
      {
        id: 'leonor',
        label: 'À auditora Leonor, do Conselho',
        result: 'Leonor roda a consulta de novo, confere linha por linha e registra o achado com a sua assinatura. "Assim ninguém poderá dizer que a lista sumiu", diz ela.',
        trust: { leonor: 1 },
        clue: 'O cnpj 99 recebeu R$ 40.000 sem estar no cadastro. Leonor registrou o achado no livro do Conselho.',
      },
      {
        id: 'valerio',
        label: 'Ao Conde Valério, que pediu a lista',
        result: 'Valério agradece e promete "cuidar disso". No dia seguinte, os dois empenhos da Névoa Cinzenta aparecem com status "pago", sem nota fiscal. Agora há também uma alteração suspeita para explicar.',
        trust: { valerio: 1, isolda: -1 },
        clue: 'Depois que Valério viu a consulta, os empenhos 4 e 5 mudaram para "pago" sem nota fiscal.',
      },
      {
        id: 'isolda',
        label: 'A Isolda, para guardar uma cópia no Arquivo',
        result: 'Isolda manda copiar a consulta e o resultado para o livro do Arquivo antes de qualquer conversa. "Primeiro a prova fica segura. Depois decidimos a quem mostrar."',
        trust: { isolda: 1 },
        clue: 'Há uma cópia da consulta e do resultado no livro do Arquivo, com data e hora.',
      },
    ],
  },
  recap: {
    learned: ['Tabela, linha, coluna e chave primária.', 'SELECT escolhe colunas, FROM a tabela, WHERE filtra linhas.', 'NULL se testa com IS NULL; "= NULL" nunca é verdadeiro.', 'INNER JOIN mostra só pares; LEFT JOIN mantém toda a tabela da esquerda.', 'COUNT(*) conta linhas; COUNT(coluna) ignora NULL.'],
    watch: ['"<> valor" também descarta as linhas com NULL.', 'Lista vazia pode ser erro na consulta, e não falta de dados.'],
  },
};
