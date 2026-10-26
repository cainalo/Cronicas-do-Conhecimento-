// Série "NoSQL, distribuição e governança" (cap.dados.02, trecho nosql), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta como a escala da web levou ao NoSQL e ao teorema CAP;
// as seguintes ensinam os quatro modelos, depois consistência e CAP, depois replicação, backup e
// governança, uma ideia por etapa. Fatos conferidos com o texto do capítulo (02-nosql.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dados.02', sectionId: 'nosql' } as const;

export const dadosNosHistoria: MicroLesson = {
  ...S,
  id: 'dados.nosql.1',
  series: { id: 'dados.nosql', order: 1 },
  title: 'Como surgiu o NoSQL',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um site com milhões de usuários no mundo todo cresce sem parar. Comprar um servidor cada vez maior resolve para sempre?',
    options: [
      { text: 'Não: chega uma hora em que é preciso espalhar os dados por muitos servidores', why: 'Isso. Esta aula conta como esse problema gerou o NoSQL.' },
      { text: 'Sim, sempre existe um servidor maior', why: 'Há limite de tamanho e de custo para um servidor só.' },
      { text: 'Basta apagar dados antigos', why: 'Os dados continuam crescendo; apagar não é solução.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'escala',
      part: 'A história',
      title: '2006 e 2007: a escala da web',
      art: 'nuvem',
      goal: 'Saber que Google e Amazon publicaram sistemas que inspiraram o NoSQL.',
      explain:
        'Nos anos 2000, empresas como **Google** e **Amazon** guardavam volumes que nenhum servidor sozinho comportava.\n\nElas criaram sistemas próprios, espalhados por **muitos servidores baratos**, e publicaram artigos sobre eles:\n\n- **2006**: o **Bigtable**, do Google;\n- **2007**: o **Dynamo**, da Amazon.\n\nEsses sistemas abriam mão de parte das garantias do modelo relacional para **escalar horizontalmente**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Qual problema levou Google e Amazon a criar o Bigtable e o Dynamo?',
        options: [
          { text: 'Volumes grandes demais para um servidor só', why: 'Isso.' },
          { text: 'Falta de uma linguagem de consulta', why: 'O SQL já existia; o problema era a escala.' },
          { text: 'Planilhas lentas', why: 'O problema era a escala de dados da web.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Quando o **arquivo do órgão** não cabe mais numa sala, há duas saídas: construir uma **sala gigante** (escala vertical, com limite) ou espalhar os documentos por **muitas salas** (escala horizontal). Google e Amazon escolheram as muitas salas.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Espalhar os dados por muitos servidores é escalar:',
          options: [
            { text: 'Horizontalmente', why: 'Isso.' },
            { text: 'Verticalmente', why: 'Vertical é aumentar um servidor só.' },
            { text: 'Para baixo', why: 'O termo é escala horizontal.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'nome',
      part: 'A história',
      title: '2009: o nome NoSQL',
      art: 'professores',
      goal: 'Saber quando o termo NoSQL se popularizou e quais produtos vieram.',
      explain:
        'Em **2009**, o termo **NoSQL** se popularizou com um encontro de desenvolvedores sobre bancos **distribuídos e não relacionais**.\n\nNo mesmo ano surgiram o **MongoDB** (documentos) e o **Redis** (chave-valor).\n\nCom o tempo, o nome passou a ser lido como "**não apenas SQL**": os NoSQL **não substituem** os relacionais; cada um serve melhor a certos problemas.',
      check: {
        kind: 'choice',
        id: 'no-c',
        prompt: 'Hoje, "NoSQL" costuma ser lido como:',
        options: [
          { text: 'Não apenas SQL', why: 'Isso: convive com os relacionais.' },
          { text: 'Proibido usar SQL', why: 'Não há proibição; é "não apenas".' },
          { text: 'Banco sem dados', why: 'Guarda dados, de outras formas.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Na cozinha, ter **panela de pressão** não aposenta a **frigideira**: cada uma serve a um prato. NoSQL e relacional são isso: ferramentas diferentes, **lado a lado**.',
        check: {
          kind: 'choice',
          id: 'no-r',
          prompt: 'Quais bancos surgiram em 2009?',
          options: [
            { text: 'MongoDB e Redis', why: 'Isso.' },
            { text: 'Oracle e PostgreSQL', why: 'São relacionais, bem mais antigos.' },
            { text: 'Bigtable e Dynamo', why: 'Esses são de 2006 e 2007.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'cap',
      part: 'A história',
      title: '2000 e 2002: o teorema CAP',
      art: 'balanca',
      goal: 'Saber quem propôs e quem provou o teorema CAP.',
      explain:
        'Antes mesmo do nome NoSQL, um limite dos sistemas distribuídos já tinha sido descrito.\n\nEm **2000**, **Eric Brewer** apresentou uma conjectura: um sistema espalhado por vários servidores não consegue garantir, **ao mesmo tempo**, consistência, disponibilidade e tolerância a partição.\n\nEm **2002**, **Seth Gilbert** e **Nancy Lynch** a **provaram**: virou o **teorema CAP**, que você vai estudar na terceira aula.',
      check: {
        kind: 'order',
        id: 'ca-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Conjectura de Brewer (2000)', 'Prova de Gilbert e Lynch (2002)', 'Bigtable (2006)', 'Termo NoSQL popular (2009)'],
        why: 'O limite teórico veio antes dos produtos.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Brewer foi quem **desconfiou** (conjectura, 2000); Gilbert e Lynch foram quem **demonstrou** (prova, 2002). Uma conjectura vira teorema quando alguém a prova.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'Quem provou o teorema CAP?',
          options: [
            { text: 'Seth Gilbert e Nancy Lynch', why: 'Isso, em 2002.' },
            { text: 'Eric Brewer', why: 'Brewer propôs a conjectura em 2000.' },
            { text: 'Edgar Codd', why: 'Codd propôs o modelo relacional.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['Conjectura CAP (2000)', 'Bigtable do Google (2006)', 'Dynamo da Amazon (2007)', 'MongoDB e Redis (2009)'],
      why: 'Do limite teórico aos produtos.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Empresa da web', 'Pesquisadores'],
      items: [
        { text: 'Bigtable', cat: 0, why: 'Google, 2006.' },
        { text: 'Dynamo', cat: 0, why: 'Amazon, 2007.' },
        { text: 'Conjectura CAP', cat: 1, why: 'Eric Brewer, 2000.' },
        { text: 'Prova do teorema CAP', cat: 1, why: 'Gilbert e Lynch, 2002.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['NoSQL: não apenas SQL', 'Nasceu da escala horizontal', 'NoSQL substitui todos os bancos relacionais'],
      bug: 2,
      why: 'Os NoSQL convivem com os relacionais; cada um serve melhor a certos problemas.',
      fixed: 'NoSQL convive com os relacionais',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '2006 e 2007: Bigtable (Google) e Dynamo (Amazon), sistemas espalhados por muitos servidores.',
    '2009: o termo NoSQL se populariza; surgem MongoDB e Redis. Hoje lido como "não apenas SQL".',
    'CAP: conjectura de Eric Brewer (2000), provada por Seth Gilbert e Nancy Lynch (2002).',
  ],
};

export const dadosNosModelos: MicroLesson = {
  ...S,
  id: 'dados.nosql.2',
  series: { id: 'dados.nosql', order: 2 },
  title: 'Os quatro modelos NoSQL',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um cadastro em que cada pessoa tem campos diferentes (uma tem dois telefones, outra nenhum) cabe bem numa tabela rígida?',
    options: [
      { text: 'Cabe melhor num formato flexível, como documentos', why: 'Isso. Esta aula mostra esse e os outros modelos.' },
      { text: 'Sim, é o caso ideal para tabela rígida', why: 'Tabelas rígidas sofrem com estrutura muito variável.' },
      { text: 'Não dá para guardar em banco nenhum', why: 'Dá, sim: num banco de documentos, por exemplo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'documento',
      part: 'Os modelos',
      title: 'Documento: o MongoDB',
      art: 'livro',
      goal: 'Reconhecer o modelo de documentos e o MongoDB.',
      explain:
        'No modelo **de documentos**, cada registro é um **documento semiestruturado**, como um JSON, e documentos ficam agrupados em **coleções**.\n\nO **MongoDB** é o exemplo clássico:\n\n- guarda em **BSON** (JSON binário);\n- **não exige esquema fixo**: cada documento pode ter campos diferentes;\n- consulta por campos, com **índices secundários**;\n- replica com *replica sets* e distribui com *sharding*.',
      check: {
        kind: 'choice',
        id: 'do-c',
        prompt: 'O MongoDB é um banco NoSQL orientado a:',
        options: [
          { text: 'Documentos', why: 'Isso.' },
          { text: 'Grafos', why: 'Grafos é o Neo4j.' },
          { text: 'Chave-valor', why: 'Chave-valor é o Redis.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **fichas de papel** numa gaveta: cada ficha pode ter campos diferentes, e a **gaveta** é a coleção. No MongoDB, cada ficha é um documento em BSON, e ninguém obriga todas a terem os mesmos campos.',
        check: {
          kind: 'choice',
          id: 'do-r',
          prompt: 'O MongoDB exige esquema fixo antes da inserção?',
          options: [
            { text: 'Não: o esquema é flexível', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'Pegadinha comum: o esquema é flexível.' },
            { text: 'Só às segundas-feiras', why: 'O esquema é flexível sempre.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'chave',
      part: 'Os modelos',
      title: 'Chave-valor: o Redis',
      art: 'cartao',
      goal: 'Reconhecer o modelo chave-valor e o Redis.',
      explain:
        'No modelo **chave-valor**, cada dado é um par **chave → valor**, buscado **pela chave**. É simples e muito rápido.\n\nO **Redis** é o exemplo clássico:\n\n- guarda os dados **em memória**, com persistência **opcional** em disco;\n- oferece listas, conjuntos e *hashes*;\n- **expira chaves sozinho** (**TTL**).\n\nPor isso é ideal para **cache**, **sessões**, filas e contadores.',
      example: 'Sessão do usuário com expiração em 30 minutos: chave `sessao:8f2a`, valor com os dados da sessão, TTL de 1800 segundos.',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'Um cache de sessões em memória, com expiração automática em 30 minutos, pede:',
        options: [
          { text: 'Redis, com TTL nas chaves', why: 'Isso.' },
          { text: 'Neo4j', why: 'Neo4j é para relações em grafo.' },
          { text: 'Uma tabela relacional sem índice', why: 'Seria lenta e sem expiração automática.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É o **guarda-volumes** da rodoviária: você entrega a **ficha** (chave) e recebe a **mala** (valor) na hora. E o guarda-volumes pode ter regra: depois de 30 minutos, a mala é devolvida sozinha. Isso é o **TTL**.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'O Redis é um banco:',
          options: [
            { text: 'Chave-valor, em memória', why: 'Isso.' },
            { text: 'Orientado a documentos', why: 'Pegadinha: documentos é o MongoDB.' },
            { text: 'De grafos', why: 'Grafos é o Neo4j.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'colunas',
      part: 'Os modelos',
      title: 'Colunas e grafos',
      art: 'rede',
      goal: 'Reconhecer famílias de colunas e grafos e quando usar cada um.',
      explain:
        'Os outros dois modelos:\n\n- **famílias de colunas** (*wide-column*): linhas com conjuntos **flexíveis de colunas**, agrupadas em famílias. Exemplos: **Cassandra** e **HBase**. Bons para **muitas escritas** e **séries temporais**;\n- **grafos**: **nós** e **arestas** com propriedades. Exemplo: **Neo4j**. Bons para **relações complexas**.\n\nPergunta como "quais empresas se ligam a este sócio em até quatro níveis?" pediria muitas junções no relacional; num grafo, é natural.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Investigar redes de empresas ligadas por sócios em comum, em vários níveis, pede um banco:',
        options: [
          { text: 'De grafos', why: 'Isso.' },
          { text: 'Chave-valor', why: 'Chave-valor não navega relações.' },
          { text: 'De famílias de colunas', why: 'É bom para muitas escritas, não para caminhos entre nós.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Desenhe no **quadro de investigação**: cada **foto** de pessoa ou empresa é um **nó**, cada **barbante** ligando duas fotos é uma **aresta**. Seguir os barbantes é o que um banco de **grafos** faz bem.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Cassandra e HBase são exemplos de:',
          options: [
            { text: 'Famílias de colunas', why: 'Isso.' },
            { text: 'Grafos', why: 'Grafos é o Neo4j.' },
            { text: 'Documentos', why: 'Documentos é o MongoDB.' },
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
      prompt: 'Cada banco é de qual modelo?',
      categories: ['Documento', 'Chave-valor', 'Colunas', 'Grafos'],
      items: [
        { text: 'MongoDB', cat: 0, why: 'Documentos em BSON.' },
        { text: 'Redis', cat: 1, why: 'Chave-valor em memória.' },
        { text: 'Cassandra', cat: 2, why: 'Famílias de colunas.' },
        { text: 'Neo4j', cat: 3, why: 'Nós e arestas.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Um catálogo de produtos em que cada item tem atributos diferentes (livro tem autor; geladeira tem voltagem). Qual escolha combina melhor?',
      scenarios: [
        { title: 'Opção A', body: 'Banco de **documentos**, como o MongoDB.' },
        { title: 'Opção B', body: 'Banco **chave-valor** usado só pela chave, como o Redis.' },
      ],
      answer: 0,
      why: 'Documentos com esquema flexível e consulta por campos servem a catálogos variados.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['MongoDB: documentos em BSON', 'Redis: documentos em disco', 'Neo4j: nós e arestas'],
      bug: 1,
      why: 'O Redis é chave-valor, em memória, com persistência opcional.',
      fixed: 'Redis: chave-valor em memória',
      errorKind: 'confusao',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.006' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.007' },
  ],
  summary: [
    'Documento: MongoDB, BSON, esquema flexível, índices secundários, replica sets e sharding.',
    'Chave-valor: Redis, em memória, TTL; ideal para cache, sessões, filas e contadores.',
    'Famílias de colunas: Cassandra e HBase; muitas escritas e séries temporais.',
    'Grafos: Neo4j; relações complexas, como vínculos societários e fraudes.',
  ],
};

export const dadosNosConsistencia: MicroLesson = {
  ...S,
  id: 'dados.nosql.3',
  series: { id: 'dados.nosql', order: 3 },
  title: 'BASE e o teorema CAP',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você curte uma foto e, por alguns segundos, um amigo em outro país ainda vê o número antigo de curtidas. Isso é um erro grave?',
    options: [
      { text: 'Não: é consistência eventual, o número chega lá', why: 'Isso. Esta aula explica essa escolha.' },
      { text: 'Sim, o banco perdeu a curtida', why: 'A curtida não se perdeu; só demora a aparecer em todas as cópias.' },
      { text: 'Sim, o amigo foi bloqueado', why: 'É só a cópia dele que ainda não recebeu a atualização.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'base',
      part: 'Consistência',
      title: 'ACID e BASE',
      art: 'balanca',
      goal: 'Saber o que significa o modelo BASE.',
      explain:
        'Os bancos relacionais seguem o **ACID**: cada transação é atômica, consistente, isolada e durável.\n\nMuitos NoSQL distribuídos seguem o **BASE**:\n\n- *Basically Available*: **basicamente disponível**;\n- *Soft state*: **estado flexível**;\n- *Eventually consistent*: **consistência eventual**.\n\nNa prática, uma escrita pode **levar algum tempo** para aparecer em todas as réplicas, mas acaba aparecendo.',
      check: {
        kind: 'choice',
        id: 'ba-c',
        prompt: 'No modelo BASE, "consistência eventual" quer dizer que:',
        options: [
          { text: 'A escrita pode demorar a aparecer em todas as réplicas, mas aparece', why: 'Isso.' },
          { text: 'Os dados nunca ficam consistentes', why: 'Ficam, com o tempo.' },
          { text: 'Toda leitura vê sempre o dado mais recente', why: 'Isso seria consistência forte.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Quando a **circular** sai do gabinete, ela não chega a todas as unidades no mesmo segundo: uma lê hoje, outra amanhã. Mas **todas acabam recebendo**. Isso é a consistência eventual do BASE.',
        check: {
          kind: 'choice',
          id: 'ba-r',
          prompt: 'O modelo típico dos bancos relacionais é o:',
          options: [
            { text: 'ACID', why: 'Isso.' },
            { text: 'BASE', why: 'BASE é típico de NoSQL distribuído.' },
            { text: 'CAP', why: 'CAP é um teorema, não um modelo de transação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'cap',
      part: 'O teorema',
      title: 'C, A e P',
      art: 'rede',
      goal: 'Saber a escolha que o teorema CAP impõe durante uma partição.',
      explain:
        'As três letras:\n\n- **C**, consistência: todos leem o **dado mais recente**;\n- **A**, disponibilidade: **toda requisição recebe resposta**;\n- **P**, tolerância a **partição**: o sistema segue funcionando se a rede entre servidores se dividir.\n\nO teorema diz: **durante uma partição**, é preciso **escolher entre C e A**. Não dá para ter as três ao mesmo tempo nesse momento.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Durante uma partição de rede, o sistema distribuído precisa escolher entre:',
        options: [
          { text: 'Consistência e disponibilidade', why: 'Isso.' },
          { text: 'Durabilidade e atomicidade', why: 'Essas são letras do ACID, não do CAP.' },
          { text: 'Nada: mantém as três propriedades', why: 'É exatamente o que o teorema nega.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Duas **agências** perderam a ligação entre si (partição). Um cliente pede o saldo. A agência pode **responder com o saldo que tem**, talvez desatualizado (escolhe **A**), ou **recusar até a ligação voltar** (escolhe **C**). Não dá para responder e garantir o mais recente ao mesmo tempo.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Recusar respostas até garantir o dado mais recente é priorizar:',
          options: [
            { text: 'Consistência', why: 'Isso.' },
            { text: 'Disponibilidade', why: 'Disponibilidade é responder sempre.' },
            { text: 'Partição', why: 'A partição é a situação, não a escolha.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'vetoriais',
      part: 'Um modelo a mais',
      title: 'Bancos vetoriais',
      art: 'alvo',
      goal: 'Saber o que guardam os bancos vetoriais e o papel do pgvector.',
      explain:
        'Um tipo mais recente são os **bancos vetoriais**. Eles guardam **embeddings**, listas de números que representam o sentido de um texto ou de uma imagem.\n\nA busca não é por igualdade, mas **por similaridade**: "quais trechos se parecem com esta pergunta?". É a base do RAG, visto no Livro dos Autômatos.\n\nNo PostgreSQL, a extensão **pgvector** cumpre esse papel.',
      check: {
        kind: 'choice',
        id: 've-c',
        prompt: 'Como um banco vetorial busca os dados?',
        options: [
          { text: 'Por similaridade entre embeddings', why: 'Isso.' },
          { text: 'Só por chave exata', why: 'Isso é chave-valor.' },
          { text: 'Seguindo arestas entre nós', why: 'Isso é grafo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na **biblioteca**, em vez de procurar pelo título exato, você diz ao bibliotecário: "quero livros **parecidos** com este". O banco vetorial faz isso com números: acha os embeddings **mais próximos**.',
        check: {
          kind: 'choice',
          id: 've-r',
          prompt: 'No PostgreSQL, qual extensão oferece busca vetorial?',
          options: [
            { text: 'pgvector', why: 'Isso.' },
            { text: 'PostGIS', why: 'PostGIS é para dados geográficos.' },
            { text: 'pg_dump', why: 'pg_dump faz backup lógico.' },
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
      prompt: 'O que cada letra do CAP garante?',
      categories: ['C', 'A', 'P'],
      items: [
        { text: 'Todos leem o dado mais recente', cat: 0, why: 'Consistência.' },
        { text: 'Toda requisição recebe resposta', cat: 1, why: 'Disponibilidade.' },
        { text: 'Segue funcionando com a rede dividida', cat: 2, why: 'Tolerância a partição.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Durante uma partição, um sistema de curtidas prefere responder sempre, mesmo com número um pouco atrasado. O que ele priorizou?',
      scenarios: [
        { title: 'Opção A', body: '**Disponibilidade**, com consistência eventual.' },
        { title: 'Opção B', body: '**Consistência**, recusando respostas até sincronizar.' },
      ],
      answer: 0,
      why: 'Responder sempre, arriscando dado desatualizado, é priorizar disponibilidade, como nos sistemas BASE.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['BASE: consistência eventual', 'CAP: na partição, escolher entre C e A', 'CAP: dá para ter C, A e P durante a partição'],
      bug: 2,
      why: 'É justamente o que o teorema nega.',
      fixed: 'CAP: não dá para ter C, A e P durante a partição',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.008' }],
  summary: [
    'ACID nos relacionais; BASE em muitos NoSQL distribuídos: basicamente disponível, estado flexível, consistência eventual.',
    'CAP: C (dado mais recente), A (sempre responde), P (tolera partição).',
    'Durante uma partição, escolhe-se entre consistência e disponibilidade.',
    'Bancos vetoriais guardam embeddings e buscam por similaridade; no PostgreSQL, pgvector.',
  ],
};

export const dadosNosReplicacao: MicroLesson = {
  ...S,
  id: 'dados.nosql.4',
  series: { id: 'dados.nosql', order: 4 },
  title: 'Replicação, backup e governança',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O banco tem três réplicas sempre atualizadas. Alguém roda um DELETE errado. As réplicas salvam os dados?',
    options: [
      { text: 'Não: o DELETE é copiado para as réplicas também', why: 'Isso. Esta aula mostra por que replicação não é backup.' },
      { text: 'Sim, as réplicas ignoram o DELETE', why: 'As réplicas copiam tudo, inclusive o erro.' },
      { text: 'Sim, desde que sejam três', why: 'Quantidade de réplicas não muda isso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sincrona',
      part: 'Replicação',
      title: 'Síncrona e assíncrona',
      art: 'valvula',
      goal: 'Distinguir replicação síncrona de assíncrona.',
      explain:
        'Há duas formas de copiar as alterações para uma réplica:\n\n- **síncrona**: o commit só é **confirmado depois que a réplica grava**. Sem perda de dados confirmados, mas com **mais latência**;\n- **assíncrona**: o primário **confirma antes**, e a réplica recebe depois. É **mais rápida**, mas pode **perder as últimas transações** numa falha do primário.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'Qual afirmação está correta?',
        options: [
          { text: 'A síncrona evita perda de dados confirmados, ao custo de mais latência', why: 'Isso.' },
          { text: 'A síncrona confirma antes de a réplica gravar', why: 'Isso descreve a assíncrona.' },
          { text: 'A assíncrona elimina qualquer perda de dados', why: 'Pode perder as últimas transações.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No **protocolo** com duas vias: na síncrona, o atendente só diz "registrado" **depois** que a segunda via foi arquivada. Na assíncrona, diz "registrado" na hora e manda a segunda via **depois**; se o prédio pegar fogo nesse meio-tempo, a segunda via se perde.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Qual é mais rápida?',
          options: [
            { text: 'A assíncrona', why: 'Isso: não espera a réplica.' },
            { text: 'A síncrona', why: 'A síncrona espera a réplica e é mais lenta.' },
            { text: 'São iguais', why: 'A assíncrona responde antes.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ha',
      part: 'Alta disponibilidade',
      title: 'Failover, sharding e réplicas de leitura',
      art: 'degraus',
      goal: 'Distinguir failover, sharding e réplicas de leitura.',
      explain:
        'Mais três termos:\n\n- **failover**: promover uma **réplica** a primário quando o primário cai;\n- **sharding**: **dividir** os dados entre servidores por uma chave (particionamento horizontal), para escalar;\n- **réplicas de leitura**: recebem consultas e **aliviam** o primário.\n\nCuidado: **sharding divide** os dados; **replicação copia**. E **replicação não substitui backup**: um DELETE errado é replicado para todas as cópias.',
      check: {
        kind: 'choice',
        id: 'ha-c',
        prompt: 'Sharding é:',
        options: [
          { text: 'Dividir os dados entre servidores por uma chave', why: 'Isso.' },
          { text: 'Um sinônimo de replicação', why: 'Replicação copia; sharding divide.' },
          { text: 'Promover uma réplica quando o primário cai', why: 'Isso é failover.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Num **cartório** grande: **sharding** é separar os livros por letra (A a M numa sala, N a Z na outra). **Replicação** é ter **cópia** do mesmo livro em outra sala. **Failover** é, se a sala principal fechar, passar a atender pela cópia.',
        check: {
          kind: 'choice',
          id: 'ha-r',
          prompt: 'Por que replicação não substitui backup?',
          options: [
            { text: 'Porque erros, como um DELETE indevido, também são replicados', why: 'Isso.' },
            { text: 'Porque réplicas não guardam dados', why: 'Guardam, e copiam tudo.' },
            { text: 'Porque é proibido por lei', why: 'O motivo é técnico: o erro é copiado.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'governanca',
      part: 'Segurança e governança',
      title: 'Cuidar dos dados pessoais',
      art: 'cadeado',
      goal: 'Aplicar as práticas de segurança e governança de dados.',
      explain:
        'Boas práticas:\n\n- **acesso**: contas **nominais** e **menor privilégio** por papéis; nada de aplicação usando superusuário;\n- **criptografia** em trânsito (**TLS**) e em repouso (por exemplo, **TDE** no Oracle);\n- **mascaramento e anonimização** de dados pessoais em ambientes de **teste**;\n- **auditoria** de acessos e alterações sensíveis;\n- **governança**: dono de cada conjunto de dados, catálogo, qualidade, ciclo de vida e conformidade com a **LGPD**.',
      check: {
        kind: 'choice',
        id: 'go-c',
        prompt: 'Uma cópia do banco com CPFs e salários vai para testes. O mais adequado é:',
        options: [
          { text: 'Mascarar ou anonimizar os dados pessoais antes', why: 'Isso.' },
          { text: 'Copiar tudo e dar acesso amplo', why: 'Expõe dados pessoais sem necessidade.' },
          { text: 'Só criptografar a conexão', why: 'O TLS protege o trânsito; os dados reais seguem expostos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Para **treinar** um novo servidor no atendimento, ninguém entrega processos **reais** com dados de cidadãos: usa-se um processo de **exemplo**, com nomes trocados. No banco, isso é **mascarar** ou **anonimizar** antes do teste.',
        check: {
          kind: 'choice',
          id: 'go-r',
          prompt: 'Criptografia em repouso no Oracle é feita por:',
          options: [
            { text: 'TDE', why: 'Isso.' },
            { text: 'TLS', why: 'TLS protege em trânsito.' },
            { text: 'TTL', why: 'TTL é a expiração de chaves no Redis.' },
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
      prompt: 'Cada item é replicação ou divisão dos dados?',
      categories: ['Copia os dados', 'Divide os dados'],
      items: [
        { text: 'Réplica de leitura', cat: 0, why: 'É cópia.' },
        { text: 'Replicação síncrona', cat: 0, why: 'É cópia.' },
        { text: 'Sharding por chave', cat: 1, why: 'Divide entre servidores.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Num sistema de pagamentos, nenhuma transação confirmada pode se perder, mesmo que o primário caia. Qual replicação?',
      scenarios: [
        { title: 'Opção A', body: '**Síncrona**: o commit espera a réplica gravar.' },
        { title: 'Opção B', body: '**Assíncrona**: o primário responde antes da réplica.' },
      ],
      answer: 0,
      why: 'A síncrona evita perder o que foi confirmado; o custo é mais latência.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Contas nominais e menor privilégio', 'Mascarar dados pessoais em teste', 'Aplicação usa o superusuário para evitar erros'],
      bug: 2,
      why: 'Aplicações devem usar contas com o menor privilégio necessário.',
      fixed: 'Aplicação usa conta com menor privilégio',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.010' },
  ],
  summary: [
    'Síncrona: commit após a réplica gravar; sem perda, mais latência. Assíncrona: mais rápida, pode perder as últimas transações.',
    'Failover: promover réplica. Sharding: dividir por chave. Réplicas de leitura: aliviam o primário.',
    'Replicação não substitui backup: erros lógicos são replicados.',
    'Segurança: contas nominais, menor privilégio, TLS e TDE, mascaramento em teste, auditoria, governança e LGPD.',
  ],
};
