// Série "Identidade: conceitos" (cap.dev.02, trecho conceitos), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta da primeira senha ao login único; as seguintes separam
// identificação, autenticação e autorização, e depois sessões, tokens, claims e SSO, uma ideia por
// etapa. Fatos conferidos com o texto do capítulo (01-conceitos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.02', sectionId: 'conceitos' } as const;

export const devIdHistoria: MicroLesson = {
  ...S,
  id: 'dev.identidade.1',
  series: { id: 'dev.identidade', order: 1 },
  title: 'Da primeira senha ao login único',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você entra com a conta gov.br e, sem digitar a senha de novo, acessa vários serviços do governo. Como isso é possível?',
    options: [
      { text: 'Os serviços confiam num provedor de identidade central', why: 'Isso. Esta aula conta como se chegou a essa ideia.' },
      { text: 'Cada serviço guarda uma cópia da sua senha', why: 'É justamente o que se quer evitar.' },
      { text: 'Os serviços não verificam quem você é', why: 'Verificam, mas por meio do provedor de identidade.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'senha',
      part: 'A história',
      title: '1961: a primeira senha',
      art: 'cadeado',
      goal: 'Saber por que a senha surgiu nos computadores compartilhados.',
      explain:
        'No começo dos anos 1960, no **MIT**, a equipe de **Fernando Corbató** criou o **CTSS**, um sistema em que **vários usuários** usavam o **mesmo computador** ao mesmo tempo.\n\nSurgiu um problema novo: como impedir que um usuário mexesse nos arquivos de outro?\n\nA solução foi pedir uma **senha** a cada um. O CTSS é lembrado como um dos **primeiros sistemas com senhas** de computador.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Por que o CTSS precisou de senhas?',
        options: [
          { text: 'Vários usuários dividiam o mesmo computador', why: 'Isso: era preciso separar os arquivos de cada um.' },
          { text: 'Para acessar a internet', why: 'A internet ainda não existia.' },
          { text: 'Para deixar o computador mais rápido', why: 'A senha protege; não acelera.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Num **armário de vestiário** com muitas portinhas, cada um precisa de um **cadeado** com segredo próprio. O CTSS era esse vestiário: muita gente no mesmo computador, cada uma com a sua senha.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Onde foi criado o CTSS?',
          options: [
            { text: 'No MIT', why: 'Isso, com a equipe de Fernando Corbató.' },
            { text: 'No Facebook', why: 'Bem depois; o CTSS é dos anos 1960.' },
            { text: 'Na Wordnik', why: 'A Wordnik é a empresa do Swagger.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'saml',
      part: 'A história',
      title: '2002: o SAML e o login único',
      art: 'rede',
      goal: 'Saber que o SAML padronizou o login único nas empresas.',
      explain:
        'Com o tempo, cada funcionário tinha **dezenas de sistemas** e uma senha para cada. Muitas senhas viram senhas fracas, repetidas ou anotadas.\n\nEm **2002**, o consórcio **OASIS** publicou o **SAML**, um padrão em XML para um sistema **confiar no login feito em outro**.\n\nAssim nasceu, nas empresas, o **login único** (*single sign-on*, **SSO**): autenticar uma vez e acessar vários sistemas.',
      check: {
        kind: 'choice',
        id: 'sa-c',
        prompt: 'O que o login único (SSO) permite?',
        options: [
          { text: 'Autenticar uma vez e acessar vários sistemas', why: 'Isso.' },
          { text: 'Usar a mesma senha copiada em cada sistema', why: 'No SSO, os sistemas confiam num login central; não copiam a senha.' },
          { text: 'Entrar sem nenhuma autenticação', why: 'Há autenticação, uma vez só.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **prédio** de um órgão, você se identifica **uma vez na portaria** e recebe um **crachá**. Depois, cada andar confia no crachá, sem pedir documento de novo. O SAML padronizou esse crachá entre sistemas.',
        check: {
          kind: 'choice',
          id: 'sa-r',
          prompt: 'Quem publicou o SAML em 2002?',
          options: [
            { text: 'O consórcio OASIS', why: 'Isso.' },
            { text: 'A Linux Foundation', why: 'A Linux Foundation abriga a OpenAPI Initiative.' },
            { text: 'O Google', why: 'O SAML é um padrão do OASIS.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'idp',
      part: 'Hoje',
      title: 'O provedor de identidade',
      art: 'pessoal',
      goal: 'Entender o papel do provedor de identidade (IdP).',
      explain:
        'Hoje, nas organizações, um **provedor de identidade** (**IdP**) centraliza **contas** e **autenticação**. Os sistemas **confiam nele** em vez de guardar senhas próprias.\n\nNa web, o protocolo mais usado para isso é o **OpenID Connect**; em ambientes corporativos mais antigos, o **SAML**.\n\nNo governo federal, o **gov.br** é um exemplo de provedor de identidade que oferece OpenID Connect.',
      check: {
        kind: 'choice',
        id: 'id-c',
        prompt: 'O que faz um provedor de identidade?',
        options: [
          { text: 'Centraliza contas e autenticação para outros sistemas', why: 'Isso.' },
          { text: 'Guarda os arquivos de cada sistema', why: 'Ele cuida da identidade, não dos arquivos.' },
          { text: 'Substitui o banco de dados de todos os sistemas', why: 'Cuida só de contas e autenticação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **cartório** reconhece a sua firma; os outros órgãos **confiam no cartório** e não precisam conferir a assinatura de novo. O provedor de identidade é o cartório dos sistemas.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'Qual protocolo de identidade o gov.br oferece?',
          options: [
            { text: 'OpenID Connect', why: 'Isso.' },
            { text: 'FTP', why: 'FTP transfere arquivos.' },
            { text: 'SMTP', why: 'SMTP envia e-mail.' },
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
      items: ['Senhas no CTSS do MIT (anos 1960)', 'SAML do OASIS (2002)', 'Provedores de identidade com OpenID Connect, como o gov.br'],
      why: 'Da senha por usuário ao login central.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada item é do SAML ou do OpenID Connect?',
      categories: ['SAML', 'OpenID Connect'],
      items: [
        { text: 'Padrão do OASIS de 2002', cat: 0, why: 'O SAML é do OASIS.' },
        { text: 'Comum em ambientes corporativos mais antigos', cat: 0, why: 'Assim diz o capítulo.' },
        { text: 'Oferecido pelo gov.br', cat: 1, why: 'O gov.br oferece OpenID Connect.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['IdP centraliza contas e autenticação', 'SSO: autenticar uma vez', 'No SSO, cada sistema guarda a senha do usuário'],
      bug: 2,
      why: 'No SSO, os sistemas confiam no provedor de identidade e não guardam senhas próprias.',
      fixed: 'No SSO, os sistemas confiam no IdP',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Anos 1960: o CTSS, no MIT (Fernando Corbató), é um dos primeiros sistemas com senhas.',
    '2002: o OASIS publica o SAML; nasce o login único (SSO) nas empresas.',
    'Hoje: provedores de identidade (IdP) centralizam contas; na web, OpenID Connect. O gov.br é um exemplo.',
  ],
};

export const devIdTres: MicroLesson = {
  ...S,
  id: 'dev.identidade.2',
  series: { id: 'dev.identidade', order: 2 },
  title: 'Quem é você e o que pode fazer',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Na portaria, você diz seu nome, mostra o documento e o porteiro diz que você pode ir só ao 3º andar. Quantas etapas diferentes houve?',
    options: [
      { text: 'Três: dizer quem é, provar e receber a permissão', why: 'Isso. Esta aula dá nome a cada uma.' },
      { text: 'Uma só', why: 'São três ideias diferentes, que a prova gosta de misturar.' },
      { text: 'Duas: entrar e sair', why: 'São dizer, provar e receber permissão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tres',
      part: 'Os conceitos',
      title: 'Identificação, autenticação, autorização',
      art: 'degraus',
      goal: 'Separar as três ideias.',
      explain:
        'Três perguntas diferentes:\n\n- **identificação**: **quem você diz ser?** (informar o CPF ou o e-mail);\n- **autenticação**: **você é mesmo quem diz ser?** (senha, certificado digital, código do aplicativo);\n- **autorização**: **o que você pode fazer?** (ler, mas não alterar, um processo).\n\nA autenticação **sempre vem antes** da autorização: só faz sentido decidir o que alguém pode fazer depois de saber quem é.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Verificar se um usuário já identificado pode aprovar um parecer é:',
        options: [
          { text: 'Autorização', why: 'Isso: é decidir o que ele pode fazer.' },
          { text: 'Autenticação', why: 'Autenticação é provar quem se é.' },
          { text: 'Identificação', why: 'Identificação é dizer quem se é.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No **aeroporto**: dizer o nome no balcão é **identificação**; mostrar o documento com foto é **autenticação**; o cartão de embarque dizer em **qual voo** você pode entrar é **autorização**.',
        check: {
          kind: 'order',
          id: 'tr-r',
          prompt: 'Ordene as etapas como acontecem.',
          items: ['Identificação', 'Autenticação', 'Autorização'],
          why: 'Dizer quem é, provar, e só então receber a permissão.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'fatores',
      part: 'Autenticação',
      title: 'Os três fatores',
      art: 'cartao',
      goal: 'Classificar os fatores de autenticação.',
      explain:
        'Há três **categorias** de fator para provar quem você é:\n\n- **algo que você sabe**: senha, PIN;\n- **algo que você tem**: celular com aplicativo autenticador, token físico, cartão com certificado;\n- **algo que você é**: biometria, como a digital ou o rosto.',
      check: {
        kind: 'sort',
        id: 'fa-c',
        prompt: 'Em qual categoria fica cada fator?',
        categories: ['Algo que você sabe', 'Algo que você tem', 'Algo que você é'],
        items: [
          { text: 'PIN', cat: 0, why: 'Está na memória.' },
          { text: 'Cartão com certificado', cat: 1, why: 'É um objeto.' },
          { text: 'Impressão digital', cat: 2, why: 'É biometria.' },
        ],
      },
      recovery: {
        explain: 'No **caixa eletrônico**: o **cartão** é algo que você **tem**; a **senha** é algo que você **sabe**; em alguns bancos, a **digital** é algo que você **é**.',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'O código do aplicativo autenticador no celular é de qual categoria?',
          options: [
            { text: 'Algo que você tem', why: 'Isso: prova que você tem o celular.' },
            { text: 'Algo que você sabe', why: 'Você não decora o código; ele vem do aparelho.' },
            { text: 'Algo que você é', why: 'Não é biometria.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'mfa',
      part: 'Autenticação',
      title: 'Multifator de verdade',
      art: 'alvo',
      goal: 'Reconhecer quando há autenticação multifator.',
      explain:
        'A **autenticação multifator** (**MFA**) exige fatores de **categorias diferentes**.\n\n- Senha **e** código do aplicativo no celular: **sabe** mais **tem**. É MFA.\n- Senha **e** pergunta secreta: **sabe** mais **sabe**. **Não** é MFA, mesmo sendo duas etapas.\n\nO que conta é a **categoria**, não a quantidade.',
      check: {
        kind: 'choice',
        id: 'mf-c',
        prompt: 'Qual combinação é autenticação multifator?',
        options: [
          { text: 'Senha e código gerado por aplicativo no celular', why: 'Isso: sabe mais tem.' },
          { text: 'Senha e pergunta secreta', why: 'As duas são "algo que você sabe".' },
          { text: 'Duas senhas diferentes', why: 'Mesma categoria duas vezes.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um ladrão que **descobre** suas senhas descobre todas de uma vez, porque estão no mesmo lugar: a sua memória. Para entrar com MFA, ele precisaria também **roubar o celular**. Por isso as categorias precisam ser diferentes.',
        check: {
          kind: 'choice',
          id: 'mf-r',
          prompt: 'Senha e PIN formam MFA?',
          options: [
            { text: 'Não: são dois fatores da mesma categoria', why: 'Isso.' },
            { text: 'Sim: são duas etapas', why: 'Contam as categorias, não as etapas.' },
            { text: 'Sim, se o PIN for longo', why: 'O tamanho não muda a categoria.' },
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
      prompt: 'Cada situação é identificação, autenticação ou autorização?',
      categories: ['Identificação', 'Autenticação', 'Autorização'],
      items: [
        { text: 'Digitar o CPF no login', cat: 0, why: 'Dizer quem é.' },
        { text: 'Digitar a senha', cat: 1, why: 'Provar quem é.' },
        { text: 'Poder ler, mas não alterar, o processo', cat: 2, why: 'O que se pode fazer.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O órgão quer reforçar o login dos auditores com autenticação multifator. Qual proposta atende?',
      scenarios: [
        { title: 'Opção A', body: 'Senha **mais** pergunta "nome do primeiro animal de estimação".' },
        { title: 'Opção B', body: 'Senha **mais** código do aplicativo autenticador no celular funcional.' },
      ],
      answer: 1,
      why: 'Só a opção B usa categorias diferentes (sabe e tem). A A repete "algo que você sabe".',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Autenticação: você é mesmo quem diz ser?', 'Autorização: o que você pode fazer?', 'Autorização vem antes da autenticação'],
      bug: 2,
      why: 'Primeiro se sabe quem é a pessoa; só depois se decide o que ela pode fazer.',
      fixed: 'Autenticação vem antes da autorização',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.012' },
  ],
  summary: [
    'Identificação: quem você diz ser. Autenticação: prova de que é. Autorização: o que pode fazer.',
    'Autenticação vem antes da autorização.',
    'Fatores: algo que você sabe (senha), tem (celular, token, cartão) e é (biometria).',
    'MFA exige categorias diferentes; senha mais pergunta secreta não é MFA.',
  ],
};

export const devIdSessoes: MicroLesson = {
  ...S,
  id: 'dev.identidade.3',
  series: { id: 'dev.identidade', order: 3 },
  title: 'Sessões, tokens e claims',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Depois do login, o sistema não pede sua senha a cada clique. Como ele sabe que é você nas próximas requisições?',
    options: [
      { text: 'Por uma sessão ou por um token entregue no login', why: 'Isso. Esta aula compara os dois.' },
      { text: 'Ele adivinha pelo endereço do computador', why: 'Não é seguro nem é assim que funciona.' },
      { text: 'Ele guarda a senha no navegador e reenvia', why: 'Reenviar a senha a cada clique seria arriscado.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sessao',
      part: 'Depois do login',
      title: 'Sessão no servidor',
      art: 'computador',
      goal: 'Entender a sessão guardada no servidor.',
      explain:
        'No modelo de **sessão no servidor**:\n\n- o servidor **guarda a sessão** (quem é o usuário, quando entrou);\n- o navegador recebe só um **identificador**, num **cookie**.\n\nVantagem: é **fácil de revogar**, basta apagar a sessão no servidor.\n\nCusto: com vários servidores, todos precisam **consultar o mesmo armazenamento** de sessões.',
      check: {
        kind: 'choice',
        id: 'ss-c',
        prompt: 'Na sessão no servidor, como se revoga o acesso de alguém?',
        options: [
          { text: 'Apagando a sessão no servidor', why: 'Isso: simples.' },
          { text: 'Esperando o cookie expirar sozinho', why: 'Não é preciso esperar; apaga-se a sessão.' },
          { text: 'Não há como revogar', why: 'É justamente fácil revogar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É a **chapelaria** do teatro: você recebe só um **número** (o cookie); o casaco (a sessão) fica lá dentro. Se a chapelaria **jogar fora a ficha** do número, ele não vale mais nada.',
        check: {
          kind: 'choice',
          id: 'ss-r',
          prompt: 'Na sessão no servidor, o que vai para o navegador?',
          options: [
            { text: 'Só um identificador, em cookie', why: 'Isso.' },
            { text: 'Todos os dados do usuário', why: 'Os dados ficam no servidor.' },
            { text: 'A senha do usuário', why: 'A senha nunca deve ir.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'token',
      part: 'Depois do login',
      title: 'Token autocontido',
      art: 'cartao',
      goal: 'Comparar o token autocontido com a sessão.',
      explain:
        'No modelo de **token autocontido**, o servidor entrega um **token assinado** que **carrega as informações** dentro dele. Um exemplo é o **JWT**.\n\n- **Não exige consulta** a cada requisição: basta conferir a assinatura;\n- combina com **APIs sem estado**;\n- mas **revogar antes de expirar é mais difícil**, porque ninguém consulta uma lista central.',
      check: {
        kind: 'choice',
        id: 'tk-c',
        prompt: 'Qual é a desvantagem típica do token autocontido?',
        options: [
          { text: 'Revogar antes de expirar é mais difícil', why: 'Isso.' },
          { text: 'Exige consulta ao banco a cada requisição', why: 'É o contrário: dispensa a consulta.' },
          { text: 'Não combina com APIs sem estado', why: 'Combina muito bem.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O token é um **ingresso impresso** com data e assinatura: o porteiro confere o carimbo e deixa entrar, **sem ligar para a bilheteria**. Rápido. Mas, se o ingresso foi cancelado, o porteiro **não fica sabendo** até a data vencer.',
        check: {
          kind: 'choice',
          id: 'tk-r',
          prompt: 'Qual é um exemplo de token autocontido?',
          options: [
            { text: 'JWT', why: 'Isso.' },
            { text: 'Um identificador de sessão em cookie', why: 'Esse aponta para a sessão no servidor.' },
            { text: 'Um PIN', why: 'PIN é fator de autenticação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'claims',
      part: 'Dentro do token',
      title: 'Claims',
      art: 'dados',
      goal: 'Saber o que é uma claim.',
      explain:
        'Uma **claim** (declaração, alegação) é uma **informação afirmada** sobre o usuário ou sobre o próprio token:\n\n- o **identificador** do usuário;\n- o **emissor** do token;\n- a **validade**;\n- os **perfis**, como "auditor".\n\nTokens **carregam claims**. Quem recebe o token decide se **confia no emissor**.',
      check: {
        kind: 'multi',
        id: 'cl-c',
        prompt: 'Quais destes podem ser claims de um token? Marque todas.',
        options: [
          { text: 'Identificador do usuário', correct: true, why: 'Isso.' },
          { text: 'Emissor do token', correct: true, why: 'Isso.' },
          { text: 'Validade', correct: true, why: 'Isso.' },
          { text: 'A senha do usuário', correct: false, why: 'Senha nunca vai num token.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **crachá**: nele estão **declarados** o nome, o setor, a validade e quem emitiu. Cada linha é uma claim. O segurança aceita o crachá porque **confia em quem o emitiu**.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'Quem recebe um token decide aceitá-lo com base em quê?',
          options: [
            { text: 'Na confiança no emissor', why: 'Isso.' },
            { text: 'Na cor do token', why: 'Tokens não têm cor; o que importa é o emissor.' },
            { text: 'No tamanho do token', why: 'O que importa é o emissor e a assinatura.' },
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
      prompt: 'Cada característica é da sessão no servidor ou do token autocontido?',
      categories: ['Sessão no servidor', 'Token autocontido'],
      items: [
        { text: 'Fácil de revogar', cat: 0, why: 'Apaga-se a sessão.' },
        { text: 'Cookie com um identificador', cat: 0, why: 'Os dados ficam no servidor.' },
        { text: 'Dispensa consulta a cada requisição', cat: 1, why: 'Confere-se a assinatura.' },
        { text: 'Combina com APIs sem estado', cat: 1, why: 'Leva as informações consigo.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Uma API sem estado roda em dez servidores e não quer consultar um banco de sessões a cada chamada. Qual modelo combina?',
      scenarios: [
        { title: 'Opção A', body: '**Token autocontido** assinado, como um JWT.' },
        { title: 'Opção B', body: '**Sessão no servidor**, com armazenamento compartilhado entre os dez.' },
      ],
      answer: 0,
      why: 'O token assinado é conferido em qualquer servidor, sem consulta central.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Claim: informação afirmada', 'Tokens carregam claims', 'Token autocontido: revogação imediata e fácil'],
      bug: 2,
      why: 'Revogar um token autocontido antes de expirar é mais difícil; fácil é na sessão.',
      fixed: 'Token autocontido: revogação mais difícil',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'Sessão no servidor: identificador em cookie; fácil de revogar; exige armazenamento compartilhado.',
    'Token autocontido (como o JWT): assinado, sem consulta a cada requisição; revogar antes de expirar é difícil.',
    'Claim: informação afirmada sobre o usuário ou o token; quem recebe decide se confia no emissor.',
  ],
};
