// Série "GraphQL e WebSockets" (cap.dev.01, trecho graphql-ws), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do polling ao GraphQL Foundation; as seguintes ensinam GraphQL,
// depois WebSocket e as formas de receber atualizações, uma ideia por etapa. Fatos conferidos com o
// texto do capítulo (03-graphql-ws.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.01', sectionId: 'graphql-ws' } as const;

export const devGqlHistoria: MicroLesson = {
  ...S,
  id: 'dev.graphql.1',
  series: { id: 'dev.graphql', order: 1 },
  title: 'Do polling ao GraphQL',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num chat, a mensagem do colega aparece sozinha na sua tela. O navegador fica perguntando ao servidor "chegou algo?" a cada segundo?',
    options: [
      { text: 'Antigamente, quase isso; hoje há um canal sempre aberto', why: 'Isso. Esta aula conta essa evolução e a do GraphQL.' },
      { text: 'Sim, sempre foi assim', why: 'Era assim antes; hoje existe o WebSocket.' },
      { text: 'A mensagem chega por e-mail', why: 'Chega pelo navegador, num canal aberto com o servidor.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'polling',
      part: 'A história',
      title: 'Anos 2000: perguntar sem parar',
      art: 'interruptor',
      goal: 'Saber o que eram polling e long polling.',
      explain:
        'Nos **anos 2000**, para mostrar novidades em tempo real, as páginas faziam:\n\n- **polling**: perguntar ao servidor **de tempos em tempos** se havia novidade;\n- **long polling**: o servidor **segura a resposta** até haver novidade.\n\nFuncionava, mas **desperdiçava conexões**: milhares de perguntas, a maioria com resposta "nada novo".',
      check: {
        kind: 'choice',
        id: 'po-c',
        prompt: 'No long polling, o que o servidor faz?',
        options: [
          { text: 'Segura a resposta até haver novidade', why: 'Isso.' },
          { text: 'Responde na hora, sempre "nada novo"', why: 'Isso lembra o polling comum.' },
          { text: 'Fecha a conexão para sempre', why: 'Ele espera haver novidade e responde.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Polling** é a criança no carro perguntando "**já chegou?**" a cada minuto. **Long polling** é o motorista dizer: "pergunte uma vez e **eu só respondo quando chegarmos**". Melhor, mas ainda é uma pergunta por novidade.',
        check: {
          kind: 'choice',
          id: 'po-r',
          prompt: 'Qual o problema do polling?',
          options: [
            { text: 'Desperdiça conexões com perguntas sem novidade', why: 'Isso.' },
            { text: 'Não funciona em nenhum navegador', why: 'Funciona, mas é desperdício.' },
            { text: 'É rápido demais', why: 'O problema é o desperdício.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'websocket',
      part: 'A história',
      title: '2011: o WebSocket',
      art: 'rede',
      goal: 'Saber que a RFC 6455 padronizou o WebSocket em 2011.',
      explain:
        'Em **2011**, a **RFC 6455** padronizou o **WebSocket**: um **canal de ida e volta** que **fica aberto** entre navegador e servidor.\n\nAgora o **servidor pode falar primeiro**: quando chega uma mensagem no chat, ele a **empurra** para o navegador, sem esperar pergunta.\n\nChats, painéis em tempo real e jogos on-line passaram a usar isso.',
      check: {
        kind: 'choice',
        id: 'ws-c',
        prompt: 'O que o WebSocket trouxe de novo?',
        options: [
          { text: 'Um canal aberto de ida e volta, em que o servidor pode falar primeiro', why: 'Isso.' },
          { text: 'Um novo formato de dados no lugar do JSON', why: 'É um canal de comunicação, não um formato.' },
          { text: 'O fim do HTTP', why: 'Ele começa justamente com uma requisição HTTP.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Troque as **cartas** (pergunta e resposta, uma de cada vez) por uma **ligação telefônica**: a linha fica aberta, e qualquer um dos dois fala quando quiser. O WebSocket é essa ligação entre navegador e servidor.',
        check: {
          kind: 'choice',
          id: 'ws-r',
          prompt: 'Qual RFC padronizou o WebSocket?',
          options: [
            { text: 'RFC 6455', why: 'Isso, em 2011.' },
            { text: 'RFC 8259', why: 'RFC 8259 é o JSON.' },
            { text: 'RFC 9457', why: 'RFC 9457 é o Problem Details.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'graphql',
      part: 'A história',
      title: '2012 e 2015: o GraphQL',
      art: 'celular',
      goal: 'Saber por que o Facebook criou o GraphQL.',
      explain:
        'Em **2012**, o **Facebook** criou o **GraphQL** para o seu **aplicativo móvel**.\n\nO problema: uma tela precisava de **muitos dados**, de vários recursos, e o celular não podia fazer dezenas de chamadas numa rede lenta.\n\nCom o GraphQL, o aplicativo pede, numa **única chamada**, **exatamente os campos** que vai mostrar. Em **2015**, o Facebook **publicou** a tecnologia.',
      check: {
        kind: 'choice',
        id: 'gq-c',
        prompt: 'Para que o Facebook criou o GraphQL?',
        options: [
          { text: 'Para o aplicativo móvel pedir muitos dados em poucas chamadas', why: 'Isso.' },
          { text: 'Para substituir o HTML', why: 'É linguagem de consulta para APIs.' },
          { text: 'Para guardar senhas', why: 'É para consultar dados de APIs.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine pedir ao **almoxarifado** dez itens de dez setores diferentes. No REST, seriam **dez pedidos**. No GraphQL, você entrega **uma lista só**, dizendo exatamente o que quer, e recebe tudo de uma vez.',
        check: {
          kind: 'choice',
          id: 'gq-r',
          prompt: 'Em que ano o GraphQL foi publicado?',
          options: [
            { text: '2015', why: 'Isso: criado em 2012, publicado em 2015.' },
            { text: '1991', why: '1991 é o HTTP.' },
            { text: '2000', why: '2000 é o REST de Fielding.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'foundation',
      part: 'A história',
      title: '2018: governança aberta',
      art: 'pessoal',
      goal: 'Saber que o GraphQL passou à GraphQL Foundation.',
      explain:
        'Em **2018**, o GraphQL passou para a **GraphQL Foundation**, ligada à **Linux Foundation**.\n\nIsso significa que a tecnologia deixou de pertencer a uma empresa só: passou a ser cuidada de forma **aberta**, por uma comunidade.\n\nO mesmo caminho foi feito pelo **OpenAPI**, como se verá no próximo trecho.',
      check: {
        kind: 'order',
        id: 'fo-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Polling e long polling (anos 2000)', 'WebSocket, RFC 6455 (2011)', 'GraphQL criado no Facebook (2012)', 'GraphQL Foundation (2018)'],
        why: 'Do perguntar sem parar ao canal aberto e à consulta sob medida.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como uma **obra criada por uma família** que é doada a uma **fundação pública**: continua existindo, mas agora muitas mãos cuidam dela e ninguém pode fechá-la sozinho. Isso dá confiança para órgãos e empresas adotarem.',
        check: {
          kind: 'choice',
          id: 'fo-r',
          prompt: 'A GraphQL Foundation está ligada a:',
          options: [
            { text: 'Linux Foundation', why: 'Isso.' },
            { text: 'ISO', why: 'A ISO padronizou o SGML.' },
            { text: 'W3C', why: 'O W3C publicou o XML.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Polling: perguntar de tempos em tempos', 'WebSocket: canal aberto de ida e volta', 'GraphQL: criado pelo W3C em 1998'],
      bug: 2,
      why: 'O GraphQL foi criado pelo Facebook em 2012 e publicado em 2015.',
      fixed: 'GraphQL: criado pelo Facebook (2012)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que problema cada tecnologia resolveu?',
      categories: ['WebSocket', 'GraphQL'],
      items: [
        { text: 'Servidor avisar sem o cliente perguntar', cat: 0, why: 'Canal aberto.' },
        { text: 'Muitos dados numa única chamada', cat: 1, why: 'Consulta sob medida.' },
        { text: 'Desperdício do polling', cat: 0, why: 'Elimina perguntas inúteis.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um painel deve mostrar, na hora, cada processo novo protocolado. Que ideia desta aula ajuda?',
      options: [
        { text: 'Um canal aberto, como o WebSocket, em que o servidor avisa', why: 'Isso.' },
        { text: 'Perguntar ao servidor a cada segundo, para sempre', why: 'Funciona, mas desperdiça conexões.' },
        { text: 'Mandar um e-mail por processo', why: 'Não é tempo real no painel.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Anos 2000: polling (perguntar de tempos em tempos) e long polling (servidor segura a resposta); desperdício de conexões.',
    '2011: WebSocket (RFC 6455), canal aberto de ida e volta; o servidor pode falar primeiro.',
    '2012: GraphQL no Facebook, muitos dados em uma chamada, só os campos pedidos; publicado em 2015.',
    '2018: GraphQL Foundation, ligada à Linux Foundation.',
  ],
};

export const devGqlConsulta: MicroLesson = {
  ...S,
  id: 'dev.graphql.2',
  series: { id: 'dev.graphql', order: 2 },
  title: 'GraphQL: o cliente escolhe os campos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O aplicativo precisa só do nome do relator, mas o endpoint REST devolve 40 campos do processo. Isso é um problema?',
    options: [
      { text: 'Sim: excesso de dados, desperdício na rede', why: 'Isso: over-fetching. Esta aula mostra como o GraphQL resolve.' },
      { text: 'Não: dados a mais nunca atrapalham', why: 'No celular, em rede lenta, atrapalham.' },
      { text: 'Só se for JSON', why: 'O problema é a quantidade, não o formato.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'caracteristicas',
      part: 'GraphQL',
      title: 'Um endpoint, esquema tipado, campos escolhidos',
      art: 'alvo',
      goal: 'Conhecer as características centrais do GraphQL.',
      explain:
        'GraphQL é uma **linguagem de consulta para APIs**. Características:\n\n- **Um único endpoint** (por exemplo, **POST /graphql**), em vez de uma URI por recurso.\n- **Esquema tipado**: o servidor declara tipos, campos e relações.\n- **O cliente escolhe os campos** que quer, **na forma exata** da resposta.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Um aplicativo precisa de dados do processo, do relator e dos anexos, só os campos que exibe, numa única chamada. A tecnologia indicada é:',
        options: [
          { text: 'GraphQL', why: 'Isso.' },
          { text: 'WebSocket', why: 'WebSocket é canal de mensagens, não consulta sob medida.' },
          { text: 'SOAP', why: 'SOAP usa contratos rígidos em XML.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No REST há **um balcão por assunto** (processos, relatores, anexos). No GraphQL há **um balcão só**, com um **cardápio tipado**: você marca no papel exatamente os itens que quer, e recebe a bandeja montada do jeito que pediu.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'Quantos endpoints uma API GraphQL costuma ter?',
          options: [
            { text: 'Um único endpoint', why: 'Isso.' },
            { text: 'Um por campo', why: 'É um único endpoint.' },
            { text: 'Um por recurso, como no REST', why: 'Essa é a característica do REST.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'fetching',
      part: 'GraphQL',
      title: 'Excesso e falta de dados',
      art: 'balanca',
      goal: 'Distinguir over-fetching de under-fetching.',
      explain:
        'O GraphQL resolve dois problemas comuns do REST:\n\n- **Excesso de dados** (*over-fetching*): o endpoint devolve **campos que o cliente não usa**.\n- **Falta de dados** (*under-fetching*): o cliente precisa de **várias chamadas** para montar uma tela.\n\n```\nquery {\n  processo(numero: "12345/2026") {\n    relator { nome }\n    anexos { nome }\n  }\n}\n```',
      check: {
        kind: 'sort',
        id: 'fe-c',
        prompt: 'Excesso ou falta de dados?',
        categories: ['Excesso (over-fetching)', 'Falta (under-fetching)'],
        items: [
          { text: 'Recebe 40 campos e usa 2', cat: 0, why: 'Veio demais.' },
          { text: 'Precisa de 5 chamadas para uma tela', cat: 1, why: 'Faltou numa só.' },
          { text: 'Baixa o anexo inteiro só para ver o nome', cat: 0, why: 'Veio demais.' },
        ],
      },
      recovery: {
        explain: '**Over-fetching** é pedir um **copo d’água** e receber um **galão**. **Under-fetching** é pedir água, depois o copo, depois o gelo, **em três idas**. O GraphQL entrega **o copo com água e gelo, de uma vez**, na medida.',
        check: {
          kind: 'choice',
          id: 'fe-r',
          prompt: 'Na consulta do exemplo, o que volta do relator?',
          options: [
            { text: 'Só o nome', why: 'Isso: o cliente pediu só esse campo.' },
            { text: 'Todos os dados do relator', why: 'Volta só o que foi pedido.' },
            { text: 'Nada', why: 'Volta o nome, que foi pedido.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'operacoes',
      part: 'GraphQL',
      title: 'Query, mutation e subscription',
      art: 'cartao',
      goal: 'Associar as três operações do GraphQL aos seus papéis.',
      explain:
        '- **query**: **leitura**.\n- **mutation**: **alteração** (criar, atualizar, excluir).\n- **subscription**: **receber eventos em tempo real**, normalmente via **WebSocket**.\n\nRepare na ligação com a próxima aula: a subscription usa o canal aberto do WebSocket para empurrar novidades.',
      check: {
        kind: 'sort',
        id: 'op-c',
        prompt: 'Qual operação para cada caso?',
        categories: ['query', 'mutation', 'subscription'],
        items: [
          { text: 'Consultar os anexos de um processo', cat: 0, why: 'Leitura.' },
          { text: 'Cadastrar um novo parecer', cat: 1, why: 'Alteração.' },
          { text: 'Ser avisado quando o processo mudar de fase', cat: 2, why: 'Evento em tempo real.' },
        ],
      },
      recovery: {
        explain: 'Associe a **ler**, **escrever** e **assinar uma revista**. **Query**: ler o que está lá. **Mutation**: escrever, mudar. **Subscription**: "**assinar**" e receber em casa cada edição nova, sem pedir de novo.',
        check: {
          kind: 'choice',
          id: 'op-r',
          prompt: 'A subscription normalmente usa qual canal?',
          options: [
            { text: 'WebSocket', why: 'Isso.' },
            { text: 'E-mail', why: 'Usa um canal em tempo real, como o WebSocket.' },
            { text: 'Polling a cada hora', why: 'A ideia é tempo real, com canal aberto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'cuidados',
      part: 'GraphQL',
      title: 'Cuidados: cache, profundidade e N+1',
      art: 'revisao',
      goal: 'Reconhecer os cuidados do GraphQL, em especial o problema N+1.',
      explain:
        '- **Cache HTTP** tradicional funciona **pior**: tudo passa pelo mesmo endpoint, muitas vezes via POST.\n- Consultas **muito aninhadas** podem sobrecarregar o servidor: exigem **limites de profundidade e custo**.\n- **N+1 consultas**: cada campo relacionado dispara uma **consulta separada** ao banco. Listar 50 processos e buscar o relator de cada um, um por um, gera **51 consultas**.\n- Erros de negócio costumam vir no campo **errors**, muitas vezes com status HTTP **200**.',
      check: {
        kind: 'choice',
        id: 'cu-c',
        prompt: 'Cada processo listado dispara uma consulta separada para buscar o relator, gerando dezenas de consultas. Esse problema é:',
        options: [
          { text: 'N+1 consultas', why: 'Isso.' },
          { text: 'Over-fetching', why: 'Over-fetching é dado demais na resposta.' },
          { text: 'Leitura suja', why: 'Leitura suja é anomalia de transação.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '"N+1" é: **1** consulta para a lista e mais **N** consultas, uma para cada item. É como ir ao arquivo pegar a lista de 50 processos e depois voltar **50 vezes**, uma por relator. O certo é buscar os 50 relatores **de uma vez**.',
        check: {
          kind: 'choice',
          id: 'cu-r',
          prompt: 'Por que o cache HTTP tradicional funciona pior no GraphQL?',
          options: [
            { text: 'Tudo passa pelo mesmo endpoint, muitas vezes via POST', why: 'Isso.' },
            { text: 'Porque o GraphQL não usa HTTP', why: 'Usa HTTP, mas concentrado num endpoint.' },
            { text: 'Porque o GraphQL não tem esquema', why: 'Tem esquema tipado.' },
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
      lines: ['GraphQL: um endpoint', 'mutation: alteração', 'GraphQL: um endpoint por recurso, como no REST'],
      bug: 2,
      why: 'Um endpoint por recurso é do REST; o GraphQL tem um único endpoint.',
      fixed: 'REST: um endpoint por recurso',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Vantagem ou cuidado do GraphQL?',
      categories: ['Vantagem', 'Cuidado'],
      items: [
        { text: 'Cliente escolhe os campos', cat: 0, why: 'Evita excesso.' },
        { text: 'Problema N+1 no banco', cat: 1, why: 'Muitas consultas.' },
        { text: 'Uma chamada para a tela inteira', cat: 0, why: 'Evita falta.' },
        { text: 'Consultas aninhadas pesadas', cat: 1, why: 'Exigem limites.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a resposta GraphQL veio com status 200, mas com um campo errors dizendo "processo não encontrado". Isso é:',
      options: [
        { text: 'Comum: erros de negócio vêm em errors, muitas vezes com 200', why: 'Isso.' },
        { text: 'Impossível: todo erro vem com 404', why: 'No GraphQL, erros de negócio costumam vir em errors.' },
        { text: 'Sinal de que o servidor caiu', why: 'É só um erro de negócio relatado.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.009' },
  ],
  summary: [
    'GraphQL: linguagem de consulta; um único endpoint; esquema tipado; o cliente escolhe os campos.',
    'Resolve over-fetching (dados demais) e under-fetching (várias chamadas).',
    'query lê; mutation altera; subscription recebe eventos em tempo real, em geral via WebSocket.',
    'Cuidados: cache HTTP pior, profundidade e custo, N+1 consultas; erros de negócio em errors, muitas vezes com 200.',
  ],
};

export const devGqlWebsocket: MicroLesson = {
  ...S,
  id: 'dev.graphql.3',
  series: { id: 'dev.graphql', order: 3 },
  title: 'WebSocket e as formas de receber atualizações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma conversa por WebSocket começa como uma requisição HTTP comum?',
    options: [
      { text: 'Sim, e depois "troca de protocolo"', why: 'Isso. Esta aula mostra esse aperto de mãos e o que vem depois.' },
      { text: 'Não: não tem nada a ver com HTTP', why: 'Começa com HTTP e depois muda.' },
      { text: 'Começa por e-mail', why: 'Começa com uma requisição HTTP.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'duplex',
      part: 'WebSocket',
      title: 'Bidirecional e simultâneo',
      art: 'rede',
      goal: 'Saber que o WebSocket é full-duplex sobre uma conexão TCP aberta.',
      explain:
        'O **WebSocket** (RFC 6455) cria um canal **bidirecional e simultâneo** (*full-duplex*) sobre **uma única conexão TCP** que **permanece aberta**.\n\n**Servidor e cliente** podem enviar mensagens **a qualquer momento**, sem que o cliente precise perguntar.\n\nÉ o que faz o chat, o painel de cotações e o editor colaborativo atualizarem sozinhos.',
      check: {
        kind: 'choice',
        id: 'du-c',
        prompt: 'Sobre o WebSocket, é correto afirmar:',
        options: [
          { text: 'Cria um canal full-duplex sobre uma conexão TCP que fica aberta', why: 'Isso.' },
          { text: 'Só o cliente pode enviar mensagens', why: 'Os dois lados enviam a qualquer momento.' },
          { text: 'Abre uma conexão nova a cada mensagem', why: 'A mesma conexão fica aberta.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Full-duplex** é como um **telefone**: os dois falam e ouvem ao mesmo tempo. **Half-duplex** seria um **walkie-talkie**, um de cada vez. O WebSocket é telefone, e a linha fica aberta enquanto durar a conversa.',
        check: {
          kind: 'choice',
          id: 'du-r',
          prompt: '"Full-duplex" quer dizer:',
          options: [
            { text: 'Os dois lados enviam e recebem ao mesmo tempo', why: 'Isso.' },
            { text: 'Só um lado fala por vez', why: 'Isso seria half-duplex.' },
            { text: 'A conexão cai a cada mensagem', why: 'A conexão permanece aberta.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'handshake',
      part: 'WebSocket',
      title: 'O aperto de mãos: 101 Switching Protocols',
      art: 'interruptor',
      goal: 'Ordenar o estabelecimento de uma conexão WebSocket.',
      explain:
        '1. O cliente faz uma **requisição HTTP comum** com o cabeçalho **Upgrade: websocket**.\n2. O servidor aceita respondendo **101 Switching Protocols**.\n3. A partir daí, a conexão **deixa de ser HTTP** e passa a trafegar **quadros WebSocket**.\n\nEsquemas de URI: **ws://** e, cifrado com TLS, **wss://**.',
      check: {
        kind: 'order',
        id: 'hs-c',
        prompt: 'Ordene o estabelecimento da conexão.',
        items: ['Cliente envia requisição HTTP com Upgrade: websocket', 'Servidor responde 101 Switching Protocols', 'Conexão passa a trafegar quadros WebSocket'],
        why: 'Pedido de troca, aceite, novo protocolo.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como começar uma conversa **por escrito** (HTTP) e dizer: "**podemos passar para o telefone?**" (Upgrade). O outro responde "**pode, vamos trocar**" (101). Daí em diante, a conversa segue no novo canal.',
        check: {
          kind: 'choice',
          id: 'hs-r',
          prompt: 'Qual esquema de URI usa WebSocket cifrado com TLS?',
          options: [
            { text: 'wss://', why: 'Isso.' },
            { text: 'ws://', why: 'ws:// é sem cifragem.' },
            { text: 'ftp://', why: 'FTP é outro protocolo.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'formas',
      part: 'Atualizações',
      title: 'Polling, long polling, SSE ou WebSocket',
      art: 'degraus',
      goal: 'Escolher a técnica de atualização adequada a cada caso.',
      explain:
        '- **Polling**: o cliente pergunta de tempos em tempos. Simples; para **atualizações raras**.\n- **Long polling**: o servidor segura a resposta até haver novidade. **Compatibilidade** com infraestrutura antiga.\n- **SSE** (*Server-Sent Events*): o servidor envia um **fluxo contínuo, só de ida**, sobre HTTP. **Notificações** e **painéis**.\n- **WebSocket**: canal **de ida e volta** persistente. **Chat**, **colaboração**, **jogos**, **cotações**.',
      check: {
        kind: 'sort',
        id: 'fo-c',
        prompt: 'Qual técnica combina com cada caso?',
        categories: ['Polling', 'SSE', 'WebSocket'],
        items: [
          { text: 'Conferir uma vez por dia se saiu nova tabela de preços', cat: 0, why: 'Atualização rara.' },
          { text: 'Painel que só recebe avisos do servidor', cat: 1, why: 'Fluxo só de ida.' },
          { text: 'Chat entre auditores', cat: 2, why: 'Ida e volta.' },
        ],
      },
      recovery: {
        explain: 'Pergunte duas coisas. **Precisa ser em tempo real?** Se não, **polling** basta. **A conversa é de mão única ou dupla?** Mão única (servidor avisa): **SSE**. Mão dupla (os dois falam): **WebSocket**.',
        check: {
          kind: 'choice',
          id: 'fo-r',
          prompt: 'O SSE envia dados:',
          options: [
            { text: 'Só do servidor para o cliente', why: 'Isso: só de ida.' },
            { text: 'Nos dois sentidos', why: 'Os dois sentidos é o WebSocket.' },
            { text: 'Só do cliente para o servidor', why: 'É o servidor que envia o fluxo.' },
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
      lines: ['WebSocket: começa com Upgrade em HTTP', 'Servidor aceita com 101', 'WebSocket abre conexão nova a cada mensagem'],
      bug: 2,
      why: 'A mesma conexão TCP permanece aberta.',
      fixed: 'WebSocket mantém a conexão aberta',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Verdadeiro ou falso sobre o WebSocket?',
      categories: ['Verdadeiro', 'Falso'],
      items: [
        { text: 'O servidor pode enviar sem o cliente pedir', cat: 0, why: 'Full-duplex.' },
        { text: 'wss:// usa TLS', cat: 0, why: 'Cifrado.' },
        { text: 'É só de ida, como o SSE', cat: 1, why: 'É de ida e volta.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um editor de pareceres permite que dois auditores escrevam juntos, vendo as mudanças um do outro na hora. Qual técnica é mais adequada?',
      scenarios: [
        { title: 'Opção A', body: 'Polling a cada 30 segundos.' },
        { title: 'Opção B', body: 'WebSocket, com mensagens nos dois sentidos.' },
      ],
      answer: 1,
      why: 'Colaboração em tempo real pede canal de ida e volta. O polling atrasaria e desperdiçaria.',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.008' }],
  summary: [
    'WebSocket (RFC 6455): canal full-duplex sobre uma conexão TCP aberta; os dois lados enviam a qualquer momento.',
    'Começa com HTTP e Upgrade: websocket; o servidor responde 101 Switching Protocols; depois, quadros WebSocket.',
    'ws:// e wss:// (com TLS).',
    'Polling (raro), long polling (compatibilidade), SSE (só de ida: notificações), WebSocket (ida e volta: chat, colaboração).',
  ],
};
