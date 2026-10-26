// Série "APIs RESTful e HTTP" (cap.dev.01, trecho rest), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do HTTP de Berners-Lee à tese de Fielding; as seguintes ensinam o
// estilo REST e os métodos HTTP, depois códigos de status e boas práticas, uma ideia por etapa. Fatos
// conferidos com o texto do capítulo (01-rest.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.01', sectionId: 'rest' } as const;

export const devRestHistoria: MicroLesson = {
  ...S,
  id: 'dev.rest.1',
  series: { id: 'dev.rest', order: 1 },
  title: 'Do HTTP à tese de Fielding',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O aplicativo do banco no celular mostra seu saldo. De onde vem esse número?',
    options: [
      { text: 'De um servidor, que responde a um pedido do aplicativo', why: 'Isso. Esse pedido e essa resposta seguem regras com uma longa história, que esta aula conta.' },
      { text: 'Fica guardado só no celular', why: 'O saldo vem do servidor do banco, a cada consulta.' },
      { text: 'O aplicativo calcula sozinho', why: 'Ele pede ao servidor, que tem os dados.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'http',
      part: 'A história',
      title: '1991: o HTTP',
      art: 'rede',
      goal: 'Saber que o HTTP nasceu com a Web e no início só tinha GET.',
      explain:
        'Em **1991**, **Tim Berners-Lee** criou o **HTTP** para a World Wide Web.\n\nA ideia era simples: o **navegador pede** uma página, o **servidor responde**.\n\nA primeira versão só tinha **um método**: o **GET**, "me dê esta página". Tudo o que veio depois, das lojas virtuais aos aplicativos de banco, cresceu em cima dessa conversa de **pedido e resposta**.',
      check: {
        kind: 'choice',
        id: 'ht-c',
        prompt: 'Qual era o único método da primeira versão do HTTP?',
        options: [
          { text: 'GET', why: 'Isso.' },
          { text: 'DELETE', why: 'DELETE veio em versões posteriores.' },
          { text: 'POST', why: 'POST também veio depois.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **balcão de biblioteca** em que só se pode dizer "**me empresta este livro**". Era o HTTP de 1991: só pedir (GET). Depois o balcão aprendeu a receber livros, trocar e devolver: novos métodos.',
        check: {
          kind: 'choice',
          id: 'ht-r',
          prompt: 'Quem criou o HTTP?',
          options: [
            { text: 'Tim Berners-Lee', why: 'Isso, junto com a Web.' },
            { text: 'Roy Fielding', why: 'Fielding ajudou a escrever o HTTP/1.1 e descreveu o REST.' },
            { text: 'Linus Torvalds', why: 'Torvalds começou o Linux.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'versoes',
      part: 'A história',
      title: '1996 e 1999: o HTTP cresce',
      art: 'degraus',
      goal: 'Situar o HTTP/1.0 e o HTTP/1.1.',
      explain:
        'O **HTTP/1.0** (RFC 1945, **1996**) trouxe **cabeçalhos**, **códigos de status** e **outros métodos**.\n\nO **HTTP/1.1** (RFC 2616, **1999**), escrito com a participação de **Roy Fielding**, tornou-se a **base da web** por mais de uma década.\n\nOs códigos que você vai estudar, como **200**, **404** e **500**, vêm dessa época.',
      check: {
        kind: 'order',
        id: 've-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['HTTP com só o GET (1991)', 'HTTP/1.0, RFC 1945 (1996)', 'HTTP/1.1, RFC 2616 (1999)'],
        why: 'De um método só ao protocolo completo.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine o **formulário de protocolo** de um órgão: no começo, só um campo ("o que você quer?"); depois ganha **carimbos de resposta** (os códigos de status: atendido, não encontrado, erro) e **campos extras** (os cabeçalhos). Foi assim que o HTTP amadureceu.',
        check: {
          kind: 'choice',
          id: 've-r',
          prompt: 'Quem participou da escrita do HTTP/1.1?',
          options: [
            { text: 'Roy Fielding', why: 'Isso.' },
            { text: 'Ada Lovelace', why: 'Ada é de 1843.' },
            { text: 'Claude Shannon', why: 'Shannon é da teoria da informação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'soap',
      part: 'A história',
      title: 'Por volta de 2000: o SOAP',
      art: 'cartao',
      goal: 'Saber que o SOAP usava mensagens XML com contratos rígidos.',
      explain:
        'Por volta de **2000**, para que **sistemas** conversassem entre si (e não só navegadores e páginas), surgiram os **serviços web** com **SOAP**.\n\nAs mensagens eram em **XML**, com **contratos rígidos** e muitas regras.\n\nFuncionava em grandes integrações, mas era **pesado**: até para pedir um dado simples era preciso montar um envelope XML completo.',
      check: {
        kind: 'choice',
        id: 'so-c',
        prompt: 'Como eram as mensagens dos serviços SOAP?',
        options: [
          { text: 'Em XML, com contratos rígidos', why: 'Isso.' },
          { text: 'Em JSON simples', why: 'O SOAP usava XML.' },
          { text: 'Só em voz', why: 'Eram mensagens XML.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em mandar um **ofício formal**, com cabeçalho, número, assinatura e envelope, só para perguntar "qual o horário de atendimento?". Era o SOAP: completo e seguro, mas **pesado** para coisas simples.',
        check: {
          kind: 'choice',
          id: 'so-r',
          prompt: 'Qual era a principal crítica ao SOAP?',
          options: [
            { text: 'Era pesado, até para pedidos simples', why: 'Isso.' },
            { text: 'Não tinha contrato nenhum', why: 'Tinha contratos rígidos.' },
            { text: 'Não usava XML', why: 'Usava XML.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'fielding',
      part: 'A história',
      title: '2000: o REST de Fielding',
      art: 'livro',
      goal: 'Saber que REST foi descrito por Fielding em 2000 como estilo arquitetural.',
      explain:
        'Em **2000**, na sua **tese de doutorado**, **Roy Fielding** descreveu o **REST** (*Representational State Transfer*).\n\nEra um jeito **mais simples** de fazer sistemas conversarem: usar o **próprio HTTP** como ele foi pensado, com URIs para os recursos e métodos para as ações.\n\nAtenção: REST **não é** protocolo nem padrão formal. É um **estilo arquitetural**, definido por **restrições**.',
      check: {
        kind: 'choice',
        id: 'fi-c',
        prompt: 'O REST é:',
        options: [
          { text: 'Um estilo arquitetural definido por restrições', why: 'Isso.' },
          { text: 'Um protocolo formal como o HTTP', why: 'REST não é protocolo: é estilo.' },
          { text: 'Uma linguagem de programação', why: 'É um estilo de arquitetura de APIs.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Compare **regras de trânsito** com **estilo de dirigir**. O HTTP é a regra (protocolo). O REST é um **jeito recomendado** de usar essas regras: um estilo, com princípios. Por isso se fala em API "**RESTful**": que segue o estilo.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Onde Fielding descreveu o REST?',
          options: [
            { text: 'Na tese de doutorado, em 2000', why: 'Isso.' },
            { text: 'Na RFC do HTTP/1.0', why: 'A RFC 1945 é de 1996 e trata do protocolo.' },
            { text: 'No livro Design Patterns', why: 'Design Patterns é de 1994, sobre orientação a objetos.' },
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
      lines: ['1991: HTTP de Berners-Lee', '1999: HTTP/1.1', '2000: REST vira um protocolo formal'],
      bug: 2,
      why: 'Em 2000 Fielding descreveu o REST como estilo arquitetural, não protocolo.',
      fixed: '2000: REST, estilo arquitetural de Fielding',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que características combinam com cada um?',
      categories: ['SOAP', 'REST'],
      items: [
        { text: 'Mensagens XML com contratos rígidos', cat: 0, why: 'Serviços web pesados.' },
        { text: 'Usa o próprio HTTP: URIs e métodos', cat: 1, why: 'Estilo mais simples.' },
        { text: 'Envelope completo até para pedido simples', cat: 0, why: 'Pesado.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega diz que "REST é um padrão oficial com regras fixas como uma RFC". O que aprendemos?',
      options: [
        { text: 'REST é um estilo arquitetural, definido por restrições', why: 'Isso.' },
        { text: 'Ele está certo', why: 'REST não é protocolo nem padrão formal.' },
        { text: 'REST é uma linguagem', why: 'É um estilo de arquitetura.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1991: HTTP de Berners-Lee, com só o GET.',
    'HTTP/1.0 (1996) e HTTP/1.1 (1999, com Fielding): cabeçalhos, status, métodos.',
    'Por volta de 2000: SOAP, XML com contratos rígidos, pesado.',
    '2000: Fielding descreve o REST na tese, um estilo arquitetural, não um protocolo.',
  ],
};

export const devRestMetodos: MicroLesson = {
  ...S,
  id: 'dev.rest.2',
  series: { id: 'dev.rest', order: 2 },
  title: 'O estilo REST e os métodos HTTP',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você manda apagar o processo 123 duas vezes, porque a primeira resposta se perdeu. O sistema fica diferente de apagar uma vez só?',
    options: [
      { text: 'Não: continua apagado, igual', why: 'Isso: o DELETE é idempotente. Esta aula explica esse e outros conceitos.' },
      { text: 'Sim: apaga dois processos', why: 'Apaga o mesmo processo; o estado final é o mesmo.' },
      { text: 'Sim: dá erro e desfaz tudo', why: 'A segunda resposta pode ser 404, mas o estado é o mesmo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'api',
      part: 'REST',
      title: 'API e recurso',
      art: 'suporte',
      goal: 'Saber o que é API, recurso e URI.',
      explain:
        'Uma **API** (*Application Programming Interface*) é o **contrato** pelo qual um sistema oferece funções a outro. Na web, o mais comum é a API **REST** sobre HTTP: o aplicativo pede dados, o servidor responde em **JSON**.\n\n**Recurso** é qualquer coisa nomeável: um processo, um jurisdicionado, uma lista de pareceres.\n\nA **URI** nomeia o recurso com **substantivos** (**/processos/123**), e o **método HTTP** diz **o que fazer** com ele.',
      check: {
        kind: 'choice',
        id: 'ap-c',
        prompt: 'No REST, o que a URI e o método fazem?',
        options: [
          { text: 'A URI nomeia o recurso; o método diz o que fazer com ele', why: 'Isso.' },
          { text: 'A URI diz a ação; o método nomeia o recurso', why: 'É o contrário.' },
          { text: 'Os dois guardam a senha', why: 'Senha vai na autenticação, não na URI.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **frase**: o **método** é o **verbo** (ler, criar, apagar) e a **URI** é o **objeto** (o processo 123). "GET /processos/123" = "**ler** o **processo 123**". Por isso a URI usa substantivos: o verbo já está no método.',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'Qual URI segue melhor o estilo REST?',
          options: [
            { text: '/processos/123', why: 'Isso: substantivo, sem verbo.' },
            { text: '/buscarProcesso?id=123', why: 'Tem verbo na URI; o verbo deve ser o método.' },
            { text: '/apagar/123', why: 'A ação vai no método DELETE.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'restricoes',
      part: 'REST',
      title: 'As restrições do REST',
      art: 'livro',
      goal: 'Reconhecer as restrições do REST, em especial a ausência de estado.',
      explain:
        '- **Cliente-servidor**: interface separada do armazenamento.\n- **Sem estado** (*stateless*): cada requisição traz **tudo** o que o servidor precisa; o servidor **não guarda sessão** do cliente entre chamadas.\n- **Cache**: respostas indicam se podem ser reutilizadas.\n- **Interface uniforme**: recursos por URI, representações, mensagens autodescritivas, hipermídia (**HATEOAS**).\n- **Sistema em camadas**: o cliente não sabe se fala com o servidor final ou com um intermediário.\n- **Código sob demanda**: opcional.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'A restrição em que cada requisição traz tudo o que é preciso, sem sessão guardada no servidor, é:',
        options: [
          { text: 'Sem estado (stateless)', why: 'Isso.' },
          { text: 'Cache', why: 'Cache trata de reaproveitar respostas.' },
          { text: 'Sistema em camadas', why: 'Camadas tratam de intermediários.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Imagine um **atendente que não lembra de ninguém**: a cada vez, você mostra o documento e diz tudo de novo. Parece chato, mas qualquer atendente pode te atender, e ninguém precisa guardar fichas. É o "sem estado": cada pedido é **completo** por si.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Na restrição de sistema em camadas, o cliente:',
          options: [
            { text: 'Não sabe se fala com o servidor final ou com um intermediário', why: 'Isso.' },
            { text: 'Precisa conhecer cada servidor', why: 'É o contrário.' },
            { text: 'Guarda a sessão no servidor', why: 'Isso iria contra o "sem estado".' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'metodos',
      part: 'Métodos',
      title: 'GET, POST, PUT, PATCH, DELETE',
      art: 'cartao',
      goal: 'Associar cada método HTTP ao seu uso típico.',
      explain:
        '- **GET**: **ler** um recurso.\n- **HEAD**: como GET, só os cabeçalhos.\n- **OPTIONS**: consultar os métodos permitidos.\n- **POST**: **criar** ou processar.\n- **PUT**: **substituir** o recurso **inteiro** (ou criar em URI conhecida).\n- **PATCH**: **alterar parte** do recurso.\n- **DELETE**: **remover**.',
      check: {
        kind: 'sort',
        id: 'me-c',
        prompt: 'Qual método para cada ação?',
        categories: ['GET', 'POST', 'PATCH'],
        items: [
          { text: 'Consultar o processo 987', cat: 0, why: 'Ler.' },
          { text: 'Cadastrar um processo novo', cat: 1, why: 'Criar.' },
          { text: 'Mudar só o relator do processo', cat: 2, why: 'Alterar parte.' },
        ],
      },
      recovery: {
        explain: 'Associe a um **arquivo de pastas**: **GET** é **olhar** a pasta; **POST** é **abrir uma pasta nova**; **PUT** é **trocar todo o conteúdo** da pasta; **PATCH** é **trocar uma folha**; **DELETE** é **jogar a pasta fora**.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Para substituir o recurso inteiro, usa-se:',
          options: [
            { text: 'PUT', why: 'Isso.' },
            { text: 'PATCH', why: 'PATCH altera só parte.' },
            { text: 'GET', why: 'GET só lê.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'seguro',
      part: 'Métodos',
      title: 'Seguro e idempotente',
      art: 'balanca',
      goal: 'Classificar os métodos em seguros e idempotentes.',
      explain:
        '- **Seguro**: **não altera** o estado do servidor. GET, HEAD, OPTIONS.\n- **Idempotente**: repetir a mesma requisição tem o **mesmo efeito** que fazê-la uma vez. GET, HEAD, OPTIONS, **PUT**, **DELETE**.\n- **Não idempotentes**: **POST**; **PATCH**, não necessariamente.\n\nApagar o processo 123 duas vezes deixa o sistema **igual** a apagar uma vez (a segunda resposta pode ser 404, mas o estado é o mesmo).\n\nCaso clássico de prova: **PUT** e **DELETE** são **idempotentes**, mas **não seguros**.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'É idempotente, mas não é seguro, o método:',
        options: [
          { text: 'DELETE', why: 'Isso: altera o estado, mas repetir dá o mesmo resultado.' },
          { text: 'GET', why: 'GET é seguro e idempotente.' },
          { text: 'POST', why: 'POST não é seguro nem idempotente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Duas perguntas. **Muda algo no servidor?** Se não, é **seguro** (só GET, HEAD, OPTIONS). **Fazer duas vezes dá o mesmo estado que uma?** Se sim, é **idempotente**. "Trocar a pasta inteira pelo conteúdo X" (PUT) duas vezes dá o mesmo; "**criar** uma pasta" (POST) duas vezes cria duas.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'A resposta de um POST se perdeu e o cliente reenvia. Qual o risco?',
          options: [
            { text: 'Criar um registro duplicado', why: 'Isso: POST não é idempotente.' },
            { text: 'Nenhum', why: 'POST repetido pode criar dois registros.' },
            { text: 'Apagar o registro', why: 'POST cria ou processa; não apaga.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Classifique cada método.',
      categories: ['Seguro e idempotente', 'Idempotente, não seguro', 'Nem seguro nem idempotente'],
      items: [
        { text: 'GET', cat: 0, why: 'Só lê.' },
        { text: 'PUT', cat: 1, why: 'Substitui; repetir dá o mesmo.' },
        { text: 'POST', cat: 2, why: 'Cria; repetir duplica.' },
        { text: 'DELETE', cat: 1, why: 'Remove; repetir dá o mesmo estado.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Sem estado: cada requisição traz tudo', 'URI usa substantivos', 'POST é idempotente'],
      bug: 2,
      why: 'POST não é idempotente: repetir pode criar duplicados.',
      fixed: 'POST não é idempotente',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: numa rede instável, qual operação pode ser reenviada sem medo de duplicar?',
      options: [
        { text: 'PUT /processos/987 com o conteúdo completo', why: 'Isso: PUT é idempotente.' },
        { text: 'POST /processos', why: 'Repetir pode criar outro registro.' },
        { text: 'Nenhuma', why: 'As idempotentes, como PUT, podem.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.002' },
  ],
  summary: [
    'API: contrato entre sistemas. Recurso: algo nomeável; URI com substantivos; método diz a ação.',
    'Restrições: cliente-servidor, sem estado, cache, interface uniforme (HATEOAS), camadas, código sob demanda (opcional).',
    'GET lê; POST cria; PUT substitui inteiro; PATCH altera parte; DELETE remove; HEAD e OPTIONS.',
    'Seguros: GET, HEAD, OPTIONS. Idempotentes: esses mais PUT e DELETE. POST não é idempotente.',
  ],
};

export const devRestStatus: MicroLesson = {
  ...S,
  id: 'dev.rest.3',
  series: { id: 'dev.rest', order: 3 },
  title: 'Códigos de status e boas práticas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você entra no sistema com seu usuário, mas tenta apagar um processo que não é seu. Qual deveria ser a resposta?',
    options: [
      { text: '"Sei quem você é, mas você não tem permissão"', why: 'Isso: código 403. Esta aula mostra os códigos e a pegadinha do 401.' },
      { text: '"Não sei quem você é"', why: 'Você está autenticado; o problema é a permissão.' },
      { text: '"Processo apagado com sucesso"', why: 'Sem permissão, não pode apagar.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'faixas',
      part: 'Status',
      title: 'As cinco famílias',
      art: 'degraus',
      goal: 'Reconhecer as faixas de códigos de status.',
      explain:
        '- **2xx sucesso**: **200** OK; **201** Created; **204** No Content.\n- **3xx redirecionamento**: **301** movido permanentemente; **302** em outro lugar; **304** não modificado (use o cache).\n- **4xx erro do cliente**: **400** malformada; **401**; **403**; **404** não encontrado; **405** método não permitido; **409** conflito; **422** conteúdo inválido; **429** requisições demais.\n- **5xx erro do servidor**: **500** erro interno; **502** gateway recebeu resposta inválida; **503** indisponível; **504** tempo esgotado no gateway.',
      check: {
        kind: 'sort',
        id: 'fa-c',
        prompt: 'A que família pertence cada código?',
        categories: ['Sucesso', 'Erro do cliente', 'Erro do servidor'],
        items: [
          { text: '201', cat: 0, why: '2xx.' },
          { text: '404', cat: 1, why: '4xx.' },
          { text: '503', cat: 2, why: '5xx.' },
          { text: '429', cat: 1, why: '4xx: requisições demais.' },
        ],
      },
      recovery: {
        explain: 'Olhe o **primeiro dígito**: **2** "deu certo", **3** "vá a outro lugar", **4** "**você** errou" (cliente), **5** "**eu** errei" (servidor). Decorado o primeiro dígito, metade da questão está resolvida.',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'O código 500 indica:',
          options: [
            { text: 'Erro interno do servidor', why: 'Isso.' },
            { text: 'Recurso não encontrado', why: 'Isso é o 404.' },
            { text: 'Sucesso', why: 'Sucesso é 2xx.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'auth',
      part: 'Status',
      title: '401 ou 403',
      art: 'cadeado',
      goal: 'Distinguir 401 de 403.',
      explain:
        'A pegadinha clássica é a dupla **401 e 403**.\n\n- **401**: apesar do nome oficial "**Unauthorized**", significa que **faltou autenticação**: credencial **ausente ou inválida**. "Não sei quem você é."\n- **403**: o servidor **sabe quem você é**, mas você **não tem permissão**. "Sei quem você é, e você não pode."',
      check: {
        kind: 'choice',
        id: 'au-c',
        prompt: 'Um usuário autenticado tentou excluir um processo sem ter permissão. O código mais adequado é:',
        options: [
          { text: '403', why: 'Isso: autenticado, sem permissão.' },
          { text: '401', why: '401 é para falta de autenticação.' },
          { text: '404', why: '404 é recurso não encontrado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **portaria** do prédio: **401** é "mostre seu crachá" (não sei quem você é). **403** é "seu crachá é válido, mas você não tem acesso a este andar". Primeiro vem a identificação, depois a permissão.',
        check: {
          kind: 'choice',
          id: 'au-r',
          prompt: 'A requisição chegou sem token de acesso. O código adequado é:',
          options: [
            { text: '401', why: 'Isso: faltou autenticação.' },
            { text: '403', why: '403 é quando se sabe quem é, mas falta permissão.' },
            { text: '201', why: '201 é recurso criado.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'criado',
      part: 'Status',
      title: 'Um POST bem respondido',
      art: 'cartao',
      goal: 'Ler um diálogo HTTP e reconhecer a resposta 201 com Location.',
      explain:
        '```\nPOST /api/processos HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOi...\n\n{ "numero": "12345/2026" }\n\nHTTP/1.1 201 Created\nLocation: /api/processos/987\n\n{ "id": 987, "numero": "12345/2026" }\n```\n\nApós criar com sucesso, a resposta mais apropriada é **201 Created**, com o cabeçalho **Location** apontando para o **novo recurso**.',
      check: {
        kind: 'choice',
        id: 'cr-c',
        prompt: 'Após o cadastro bem-sucedido via POST, a resposta mais apropriada é:',
        options: [
          { text: '201 Created, com Location apontando para o novo recurso', why: 'Isso.' },
          { text: '200 OK sem corpo', why: 'Funciona, mas 201 com Location é o mais apropriado.' },
          { text: '204 No Content', why: '204 é para sucesso sem corpo, comum em DELETE.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **protocolo** que, ao receber seu pedido, devolve o **número do processo criado**: "criado, está aqui: 987". O **201** diz "criei"; o **Location** diz "**onde** está o que criei".',
        check: {
          kind: 'choice',
          id: 'cr-r',
          prompt: 'No diálogo, onde está o endereço do processo criado?',
          options: [
            { text: 'No cabeçalho Location: /api/processos/987', why: 'Isso.' },
            { text: 'No cabeçalho Content-Type', why: 'Content-Type diz o formato do corpo.' },
            { text: 'No cabeçalho Authorization', why: 'Authorization traz a credencial.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'praticas',
      part: 'Boas práticas',
      title: 'URIs, filtros, versões e erros',
      art: 'alvo',
      goal: 'Aplicar as boas práticas de desenho de APIs REST.',
      explain:
        '- **Substantivos no plural**, sem verbos: **GET /processos**, não GET /listarProcessos.\n- **Filtros e paginação** na *query string*: **/processos?ano=2026&page=2**.\n- **Versionamento** explícito: **/v1/...** ou cabeçalho.\n- **Erros** com corpo padronizado, como o *Problem Details* (**RFC 9457**).\n- **HTTPS** sempre, e **limitação de taxa** (**429**) para evitar abuso.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Qual URI e método são mais aderentes ao REST para listar os processos de 2026, segunda página?',
        options: [
          { text: 'GET /processos?ano=2026&page=2', why: 'Isso: substantivo, filtros e paginação na query string.' },
          { text: 'POST /listarProcessos2026Pagina2', why: 'Verbo na URI e POST para leitura.' },
          { text: 'GET /processos/listar/2026/2', why: 'Verbo na URI e filtros fora da query string.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Monte em partes: **o quê**? "processos" (substantivo, plural). **Ler**? GET. **Filtrar e paginar**? Depois do "?": **ano=2026**, **page=2**. Junte: GET /processos?ano=2026&page=2.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Que código usar quando um cliente faz requisições demais em pouco tempo?',
          options: [
            { text: '429', why: 'Isso: limitação de taxa.' },
            { text: '200', why: '200 é sucesso.' },
            { text: '301', why: '301 é redirecionamento permanente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual código para cada situação?',
      categories: ['401', '403', '404'],
      items: [
        { text: 'Token ausente', cat: 0, why: 'Falta autenticação.' },
        { text: 'Servidor de outro setor tenta editar processo sigiloso', cat: 1, why: 'Sem permissão.' },
        { text: 'Processo de número inexistente', cat: 2, why: 'Não encontrado.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['201: recurso criado, com Location', '429: requisições demais', '401: autenticado, porém sem permissão'],
      bug: 2,
      why: 'Isso descreve o 403. O 401 é falta de autenticação.',
      fixed: '401: credencial ausente ou inválida',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual desenho de API é mais aderente ao REST?',
      scenarios: [
        { title: 'Desenho A', body: '```\nPOST /apagarProcesso?id=987\nGET /criarProcesso?numero=1/2026\n```' },
        { title: 'Desenho B', body: '```\nDELETE /processos/987\nPOST /processos\n```' },
      ],
      answer: 1,
      why: 'B usa substantivos na URI e o método certo para cada ação. A põe verbos na URI e usa GET para criar.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.004' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.012' },
  ],
  summary: [
    '2xx sucesso (200, 201, 204); 3xx redirecionamento (301, 302, 304); 4xx cliente (400, 401, 403, 404, 405, 409, 422, 429); 5xx servidor (500, 502, 503, 504).',
    '401: faltou autenticação. 403: autenticado, sem permissão.',
    'POST bem-sucedido: 201 Created com Location do novo recurso.',
    'Boas práticas: substantivos no plural, filtros e paginação na query string, versionamento, Problem Details (RFC 9457), HTTPS e 429.',
  ],
};
