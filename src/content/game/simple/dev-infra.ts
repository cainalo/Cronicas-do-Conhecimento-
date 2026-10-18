import type { SimpleSection } from '@/content/types';

/**
 * Porta de entrada "do zero" das seções dos grimórios de Desenvolvimento de
 * Sistemas e de Infraestrutura. O texto completo da seção continua disponível
 * como aprofundamento.
 */
export const simpleDevInfra: Record<string, SimpleSection> = {
  // ------------------------------------------------------------------
  // Desenvolvimento: APIs e serviços web
  // ------------------------------------------------------------------
  'cap.dev.01:rest': {
    pages: [
      {
        title: 'Para que serve uma API?',
        text: 'Pense num balcão de atendimento. Você faz um pedido e recebe a resposta, sem entrar na cozinha. Uma **API** é esse balcão entre dois sistemas: um pede dados, o outro responde. No Tribunal, o sistema de processos pode oferecer uma API para que outro sistema consulte um processo.',
      },
      {
        title: 'O que é REST?',
        text: '**REST** é um jeito muito usado de montar APIs na web. Nele, cada coisa tem um endereço, chamado **URI**, como `/processos/123`. Uma regra central: o REST é **sem estado**. Cada pedido traz tudo o que o **servidor**, o computador que responde, precisa. Ele não guarda lembrança da conversa anterior.',
      },
      {
        title: 'Os verbos do pedido',
        text: 'O **HTTP** é o conjunto de regras da web. O **método HTTP** diz o que você quer fazer com o endereço. **GET** lê. **POST** cria. **PUT** troca o item inteiro. **PATCH** altera só uma parte. **DELETE** apaga. Exemplo: `GET /processos/123` pede para ver o processo 123.',
      },
      {
        title: 'Repetir faz diferença?',
        text: 'Uma operação é **idempotente** quando repetir dá o mesmo resultado que fazer uma vez. Apagar o processo 123 duas vezes deixa o sistema igual a apagar uma vez. GET, PUT e DELETE são idempotentes. POST não é: enviar o mesmo POST duas vezes pode criar dois registros iguais.',
      },
      {
        title: 'Os códigos de resposta',
        text: 'O servidor responde com um número, o **código de status**. Começa com 2: deu certo, como 200 (OK) e 201 (criado). Começa com 4: erro de quem pediu, como 404 (não encontrado). Começa com 5: erro do servidor, como 500. É como o recado do atendente.',
      },
      {
        title: 'A pegadinha do 401 e do 403',
        text: 'O **401** quer dizer que faltou provar quem você é. Por exemplo, você não fez login ou a senha não vale. O **403** quer dizer que o servidor sabe quem você é, mas você não tem permissão. Num prédio, 401 é chegar sem crachá. 403 é ter crachá, mas não poder entrar naquela sala.',
      },
      {
        title: 'Resumindo',
        text: 'Uma API deixa um sistema pedir coisas a outro. No REST, cada pedido traz tudo o que precisa, e o método diz a ação. POST não é idempotente, 401 é falta de login e 403 é falta de permissão.',
      },
    ],
    words: [
      { term: 'API', meaning: 'Balcão por onde um sistema pede dados ou serviços a outro.' },
      { term: 'REST', meaning: 'Jeito comum de montar APIs na web, com endereços e métodos.' },
      { term: 'URI', meaning: 'Endereço que dá nome a uma coisa na API, como /processos/123.' },
      { term: 'Sem estado', meaning: 'O servidor não guarda a conversa; cada pedido traz tudo.' },
      { term: 'Método HTTP', meaning: 'Verbo do pedido: GET lê, POST cria, DELETE apaga.' },
      { term: 'Idempotente', meaning: 'Repetir a ação dá o mesmo resultado que fazer uma vez.' },
      { term: 'Código de status', meaning: 'Número da resposta que diz se deu certo ou qual erro houve.' },
    ],
    checks: [
      { statement: 'POST é idempotente.', answer: false, why: 'Repetir um POST pode criar dois registros iguais.' },
      { statement: 'O código 403 indica que o servidor sabe quem você é, mas você não tem permissão.', answer: true, why: 'O 403 é falta de permissão; o 401 é falta de login.' },
      { statement: 'No REST, o servidor guarda a conversa anterior com você.', answer: false, why: 'O REST é sem estado: cada pedido traz tudo o que é preciso.' },
    ],
  },

  'cap.dev.01:formatos': {
    pages: [
      {
        title: 'Para que serve um formato?',
        text: 'Quando dois sistemas trocam dados, os dois precisam entender a mesma escrita. É como combinar o modelo de um formulário antes de preencher. O edital cita dois formatos de texto: **JSON** e **XML**. Os dois organizam informações, como o número de um processo e o nome do relator.',
      },
      {
        title: 'Como é o JSON?',
        text: 'O **JSON** guarda dados em pares de nome e valor, entre chaves. Exemplo: `{ "nome": "Ana", "idade": 30 }`. Aqui, "nome" é a **chave** e "Ana" é o valor. Os valores podem ser texto, número, verdadeiro ou falso, listas e o vazio, escrito null.',
      },
      {
        title: 'Regras do JSON que caem',
        text: 'No JSON, a chave sempre fica entre aspas duplas. Aspas simples não valem. O JSON **não aceita comentários**, que são notas soltas no meio do texto. Também não existe tipo data: a data vai como texto. E não pode sobrar vírgula depois do último item.',
      },
      {
        title: 'Como é o XML?',
        text: 'O **XML** usa marcações que abrem e fecham, como etiquetas: `<relator>Conselheiro A</relator>`. Uma etiqueta pode ficar dentro de outra, como gavetas dentro de um armário. O XML aceita comentários e atributos. Ele é mais longo que o JSON e aparece em sistemas antigos e em notas fiscais eletrônicas.',
      },
      {
        title: 'Bem formado ou válido?',
        text: 'Um XML é **bem formado** quando segue a escrita certa: toda etiqueta aberta é fechada, na ordem certa. Ele é **válido** quando, além disso, obedece a um **esquema**, um molde que diz quais etiquetas são permitidas. Todo XML válido é bem formado. Mas nem todo bem formado é válido.',
      },
      {
        title: 'Resumindo',
        text: 'JSON e XML são formas de escrever dados para trocar entre sistemas. JSON usa chaves com aspas duplas e não tem comentários. XML usa etiquetas, e ser válido exige seguir um esquema.',
      },
    ],
    words: [
      { term: 'JSON', meaning: 'Formato de texto com pares de nome e valor entre chaves.' },
      { term: 'XML', meaning: 'Formato de texto com etiquetas que abrem e fecham.' },
      { term: 'Chave', meaning: 'No JSON, o nome do dado, sempre entre aspas duplas.' },
      { term: 'Comentário', meaning: 'Nota solta no texto que o programa ignora. JSON não aceita.' },
      { term: 'Bem formado', meaning: 'XML escrito do jeito certo, com etiquetas fechadas em ordem.' },
      { term: 'Esquema', meaning: 'Molde que diz quais etiquetas e tipos o XML pode ter.' },
    ],
    checks: [
      { statement: 'No JSON, você pode escrever comentários.', answer: false, why: 'O JSON não aceita comentários.' },
      { statement: 'Todo XML válido também é bem formado.', answer: true, why: 'Para ser válido, ele precisa primeiro estar bem formado.' },
      { statement: 'No JSON, a chave pode ficar entre aspas simples.', answer: false, why: 'A chave sempre fica entre aspas duplas.' },
    ],
  },

  'cap.dev.01:graphql-ws': {
    pages: [
      {
        title: 'Existem outras formas de API?',
        text: 'Sim. O REST é o mais comum, mas não é o único. O edital cobra mais duas ideias: **GraphQL** e **WebSocket**. A primeira muda o jeito de pedir dados. A segunda muda o jeito de manter a conversa aberta entre o sistema e quem o usa.',
      },
      {
        title: 'O que é GraphQL?',
        text: '**GraphQL** é uma linguagem para pedir dados a uma API. Ele tem um único **endpoint**, isto é, um só endereço para todos os pedidos. E você escolhe exatamente os campos que quer. É como montar o prato no restaurante: você pede só o nome do relator, sem receber o processo inteiro.',
      },
      {
        title: 'Que problema ele resolve?',
        text: 'No REST, às vezes a resposta traz dados demais, que você nem usa. Outras vezes traz de menos, e você precisa fazer vários pedidos. O GraphQL resolve os dois casos. Ele tem três operações: **query** para ler, **mutation** para alterar e **subscription** para receber avisos na hora.',
      },
      {
        title: 'O que é WebSocket?',
        text: 'Na web comum, você pergunta, o servidor responde e a conversa acaba. O **WebSocket** abre um canal que fica ligado, como uma ligação de telefone. Os dois lados falam quando quiserem, nos dois sentidos. Isso é útil em chat, jogos e painéis que mudam o tempo todo.',
      },
      {
        title: 'Como o canal é aberto?',
        text: 'Primeiro, o cliente faz um pedido comum com o aviso `Upgrade: websocket`, pedindo a troca. Se aceitar, o servidor responde com o código **101**, que significa troca de protocolo. Daí em diante, a conversa segue pelo WebSocket. O endereço começa com `ws://` ou, protegido, com `wss://`.',
      },
      {
        title: 'Resumindo',
        text: 'GraphQL usa um endereço único, e você escolhe os campos que quer. WebSocket mantém um canal aberto de ida e volta, iniciado com Upgrade e resposta 101.',
      },
    ],
    words: [
      { term: 'GraphQL', meaning: 'Linguagem para pedir dados escolhendo os campos, num endereço único.' },
      { term: 'Endpoint', meaning: 'Endereço de uma API para onde os pedidos são enviados.' },
      { term: 'Query', meaning: 'Operação do GraphQL que lê dados.' },
      { term: 'Mutation', meaning: 'Operação do GraphQL que cria, altera ou apaga dados.' },
      { term: 'WebSocket', meaning: 'Canal que fica aberto e deixa os dois lados falarem.' },
      { term: '101', meaning: 'Código com que o servidor aceita trocar para o WebSocket.' },
    ],
    checks: [
      { statement: 'GraphQL usa um único endereço para os pedidos.', answer: true, why: 'Ele tem um endpoint único, em vez de um por recurso.' },
      { statement: 'No WebSocket, só o cliente pode mandar mensagens.', answer: false, why: 'Os dois lados falam quando quiserem, nos dois sentidos.' },
      { statement: 'O servidor aceita o WebSocket respondendo com o código 101.', answer: true, why: 'O 101 significa troca de protocolo.' },
    ],
  },

  'cap.dev.01:openapi': {
    pages: [
      {
        title: 'Por que documentar uma API?',
        text: 'Uma API só ajuda se as pessoas souberem usá-la. Pense no manual de um eletrodoméstico: sem ele, você aperta botões no escuro. A **documentação** de uma API explica quais endereços existem. Ela diz o que cada um pede e o que devolve.',
      },
      {
        title: 'O que é OpenAPI?',
        text: '**OpenAPI** é um jeito padrão de escrever esse manual. Ele é escrito em **YAML** ou em JSON, dois formatos de texto organizado. O documento lista os caminhos, os parâmetros, as respostas e os códigos de status da API. Assim, pessoas e programas leem o mesmo manual.',
      },
      {
        title: 'E o Swagger?',
        text: 'O OpenAPI nasceu com o nome **Swagger**. Depois, a especificação passou a se chamar OpenAPI. Hoje, Swagger é o nome principal das ferramentas em volta dela. O **Swagger UI**, por exemplo, mostra o manual no navegador e deixa você testar os pedidos ali mesmo.',
      },
      {
        title: 'Para que mais serve?',
        text: 'O documento funciona como um **contrato** entre equipes. A equipe da tela e a equipe do servidor combinam tudo antes de programar. Ele também pode gerar código e ajudar nos testes. Exemplo: um teste confere se a resposta de `/processos/123` traz mesmo os campos prometidos.',
      },
      {
        title: 'Primeiro o manual ou o código?',
        text: 'Existem duas abordagens. No **design-first**, você escreve o documento OpenAPI primeiro, e o código segue o contrato. No **code-first**, você escreve o código com anotações, e o documento é gerado a partir dele. É como desenhar a planta antes da obra ou registrar a casa depois de pronta.',
      },
      {
        title: 'Resumindo',
        text: 'OpenAPI é o padrão para descrever APIs HTTP, em YAML ou JSON. Swagger era o nome antigo e hoje nomeia as ferramentas, como o Swagger UI.',
      },
    ],
    words: [
      { term: 'Documentação', meaning: 'Manual que explica como usar a API.' },
      { term: 'OpenAPI', meaning: 'Padrão para escrever o manual de uma API HTTP.' },
      { term: 'YAML', meaning: 'Formato de texto organizado, fácil de ler por pessoas.' },
      { term: 'Swagger UI', meaning: 'Ferramenta que mostra o manual e testa pedidos no navegador.' },
      { term: 'Contrato', meaning: 'Acordo sobre como a API funciona, feito antes de programar.' },
      { term: 'Design-first', meaning: 'Escrever o documento da API antes do código.' },
    ],
    checks: [
      { statement: 'O OpenAPI pode ser escrito em YAML ou em JSON.', answer: true, why: 'Esses são os dois formatos usados pelo OpenAPI.' },
      { statement: 'O Swagger UI permite testar pedidos no navegador.', answer: true, why: 'Ele mostra o manual e deixa testar as chamadas.' },
      { statement: 'No code-first, o documento é escrito antes do código.', answer: false, why: 'Isso é o design-first; no code-first o documento sai do código.' },
    ],
  },

  // ------------------------------------------------------------------
  // Desenvolvimento: identidade e autorização
  // ------------------------------------------------------------------
  'cap.dev.02:conceitos': {
    pages: [
      {
        title: 'Para que serve este assunto?',
        text: 'Todo sistema do Tribunal precisa saber quem está entrando e o que essa pessoa pode fazer. Um auditor pode ler um processo, mas talvez não possa alterá-lo. Este capítulo mostra como os sistemas fazem isso. Antes, você precisa separar três ideias que as provas gostam de misturar.',
      },
      {
        title: 'Três perguntas diferentes',
        text: '**Identificação** responde: quem você diz ser? Por exemplo, você digita seu CPF. **Autenticação** responde: você é mesmo essa pessoa? Por exemplo, você digita a senha. **Autorização** responde: o que você pode fazer? Por exemplo, ler, mas não alterar. A autenticação sempre vem antes da autorização.',
      },
      {
        title: 'Como provar quem você é?',
        text: 'Existem três tipos de prova, chamados **fatores**. Algo que você sabe, como uma senha. Algo que você tem, como o celular que recebe um código. Algo que você é, como a sua digital. A **autenticação multifator**, ou **MFA**, exige fatores de tipos diferentes.',
      },
      {
        title: 'A pegadinha do MFA',
        text: 'Senha mais pergunta secreta parecem duas provas. Mas as duas são algo que você sabe. Então isso não é MFA. Já senha mais um código no celular é MFA. Ela junta algo que você sabe com algo que você tem. Pense em duas fechaduras diferentes, e não em duas cópias da mesma chave.',
      },
      {
        title: 'Depois do login',
        text: 'Depois que você entra, o sistema não quer pedir a senha a cada clique. Ele pode guardar uma **sessão** no servidor. O navegador recebe um número num **cookie**, um pequeno arquivo que ele guarda. Ou pode entregar um **token**, um passe assinado que carrega informações. Cada informação dentro do token se chama **claim**.',
      },
      {
        title: 'Um login para vários sistemas',
        text: 'Numa organização, um **provedor de identidade** guarda as contas de todos. Os sistemas confiam nele, em vez de cada um ter suas próprias senhas. Isso permite o **SSO**, o login único: você entra uma vez e usa vários sistemas. O gov.br é um exemplo de provedor de identidade.',
      },
      {
        title: 'Resumindo',
        text: 'Autenticação prova quem você é. Autorização decide o que você pode fazer. MFA exige provas de tipos diferentes, como senha e celular.',
      },
    ],
    words: [
      { term: 'Identificação', meaning: 'Dizer quem você é, como informar o CPF.' },
      { term: 'Autenticação', meaning: 'Provar que você é mesmo quem diz ser.' },
      { term: 'Autorização', meaning: 'Decidir o que você pode fazer no sistema.' },
      { term: 'MFA', meaning: 'Login com provas de tipos diferentes, como senha e celular.' },
      { term: 'Token', meaning: 'Passe digital que o sistema entrega depois do login.' },
      { term: 'Claim', meaning: 'Informação escrita dentro de um token, como quem é o usuário.' },
      { term: 'SSO', meaning: 'Login único: entrar uma vez e usar vários sistemas.' },
    ],
    checks: [
      { statement: 'Senha mais pergunta secreta é MFA.', answer: false, why: 'As duas são algo que você sabe, do mesmo tipo.' },
      { statement: 'A autenticação vem antes da autorização.', answer: true, why: 'Primeiro o sistema sabe quem você é, depois decide o que pode.' },
      { statement: 'O SSO permite entrar uma vez e usar vários sistemas.', answer: true, why: 'SSO quer dizer login único.' },
    ],
  },

  'cap.dev.02:oauth': {
    pages: [
      {
        title: 'Para que serve o OAuth?',
        text: 'Imagine que um aplicativo de agenda quer ler seu calendário em outro serviço. Você não quer dar sua senha a ele. O **OAuth 2.0** resolve isso. Você autoriza no próprio serviço, e o aplicativo recebe só um passe com permissão limitada. Isso se chama **autorização delegada**.',
      },
      {
        title: 'Autorização, não autenticação',
        text: 'Esta é a pegadinha mais comum. O OAuth 2.0 trata de **autorização**: o que o aplicativo pode acessar. Ele não foi feito para dizer quem é o usuário. Para isso existe o OpenID Connect, que funciona por cima do OAuth. Você vai vê-lo na próxima seção.',
      },
      {
        title: 'Quem participa?',
        text: 'São quatro papéis. O **proprietário do recurso** é você, que dá a permissão. O **cliente** é o aplicativo que quer acessar. O **servidor de autorização** confere seu login e entrega os passes. O **servidor de recursos** é a API que guarda os dados e aceita os passes.',
      },
      {
        title: 'Os passes e o escopo',
        text: 'O **token de acesso** é o passe de curta duração enviado à API. Quem tiver o token pode usá-lo, como um ingresso. Por isso ele só deve viajar protegido. O **token de atualização** serve para pedir um passe novo sem incomodar você. O **escopo** diz até onde vai a permissão, como só ler eventos.',
      },
      {
        title: 'Qual caminho usar?',
        text: 'Os caminhos do OAuth se chamam **fluxos**. Para aplicativos com usuário, como sites e apps de celular, use o **código de autorização com PKCE**. O **PKCE** é um segredo extra que impede o uso de um código roubado. Quando um sistema chama outro, sem usuário, use o fluxo **client credentials**.',
      },
      {
        title: 'Fluxos desaconselhados',
        text: 'Dois fluxos antigos hoje são desaconselhados. O **implícito** entregava o token direto no endereço do navegador, onde ele ficava exposto. O de **senha** fazia o aplicativo receber a sua senha, o que contraria a ideia do OAuth. As boas práticas atuais eliminam esses dois fluxos.',
      },
      {
        title: 'Resumindo',
        text: 'OAuth 2.0 é autorização: o aplicativo recebe um token com escopo, não a sua senha. Para usuários, use código de autorização com PKCE. Entre sistemas, use client credentials.',
      },
    ],
    words: [
      { term: 'OAuth 2.0', meaning: 'Padrão para dar acesso limitado a um aplicativo sem passar a senha.' },
      { term: 'Autorização delegada', meaning: 'Você permite que um aplicativo acesse algo seu em seu nome.' },
      { term: 'Token de acesso', meaning: 'Passe de curta duração que o aplicativo mostra à API.' },
      { term: 'Token de atualização', meaning: 'Passe usado para pedir um novo token de acesso.' },
      { term: 'Escopo', meaning: 'Até onde vai a permissão, como só ler.' },
      { term: 'PKCE', meaning: 'Segredo extra que impede usar um código roubado.' },
      { term: 'Client credentials', meaning: 'Fluxo para um sistema chamar outro, sem usuário.' },
    ],
    checks: [
      { statement: 'O OAuth 2.0 trata de autorização.', answer: true, why: 'Ele define o que o aplicativo pode acessar.' },
      { statement: 'No OAuth, o aplicativo recebe a senha do usuário.', answer: false, why: 'Ele recebe só um token com permissão limitada.' },
      { statement: 'O fluxo implícito é o recomendado hoje.', answer: false, why: 'Ele é desaconselhado; o recomendado é o código de autorização com PKCE.' },
    ],
  },

  'cap.dev.02:oidc-jwt': {
    pages: [
      {
        title: 'Para que serve o OpenID Connect?',
        text: 'O OAuth diz o que um aplicativo pode acessar, mas não diz quem é você. O **OpenID Connect**, ou **OIDC**, preenche essa falta. Ele é uma camada de identidade por cima do OAuth 2.0. O gov.br é um exemplo de provedor que oferece OpenID Connect.',
      },
      {
        title: 'O que o OIDC acrescenta?',
        text: 'O pedido de login usa o escopo **openid**. A resposta traz um **ID Token**, um passe que conta quem se autenticou. Diferença importante: o token de acesso é para a API. O ID Token é para o aplicativo. O ID Token sempre vem no formato JWT, que você verá a seguir.',
      },
      {
        title: 'O que é um JWT?',
        text: '**JWT** é um passe digital compacto. Ele tem três partes separadas por pontos: cabeçalho, carga e assinatura. A **carga** traz as claims, como `exp`, a hora em que o passe vence. As partes são escritas em **Base64URL**, um jeito de escrever dados com letras e números. Isso é só codificação, não segredo.',
      },
      {
        title: 'Assinado não é secreto',
        text: 'A **assinatura** funciona como um lacre. Se alguém mexer na carga, o lacre quebra e o passe deixa de valer. Mas o JWT assinado **não é cifrado**, ou seja, não está escondido. Qualquer pessoa consegue ler a carga. Por isso, não coloque dados sigilosos ali. Para guardar segredo existe outro formato, o **JWE**.',
      },
      {
        title: 'Dois tipos de lacre',
        text: 'No **HS256**, quem cria e quem confere o passe usam o mesmo segredo. São como duas cópias da mesma chave. No **RS256**, existe um par de chaves. A **chave privada** assina e fica guardada com quem emite. A **chave pública** confere a assinatura, e qualquer um pode tê-la.',
      },
      {
        title: 'Como conferir um JWT?',
        text: 'Quem recebe um JWT deve conferir a assinatura com a chave esperada. Deve aceitar só os algoritmos combinados e nunca aceitar `alg: none`, que quer dizer sem assinatura. Também deve conferir três claims: `exp`, se venceu; `iss`, quem emitiu; e `aud`, para quem o passe foi feito.',
      },
      {
        title: 'Resumindo',
        text: 'O OIDC diz quem é o usuário, com o ID Token. O JWT tem cabeçalho, carga e assinatura. Assinado não é secreto: qualquer um lê a carga.',
      },
    ],
    words: [
      { term: 'OpenID Connect', meaning: 'Camada sobre o OAuth que informa quem é o usuário.' },
      { term: 'ID Token', meaning: 'Passe do OIDC que conta ao aplicativo quem fez login.' },
      { term: 'JWT', meaning: 'Passe digital em três partes: cabeçalho, carga e assinatura.' },
      { term: 'Base64URL', meaning: 'Jeito de escrever dados com letras e números; não esconde nada.' },
      { term: 'Assinatura', meaning: 'Lacre digital que mostra se o passe foi alterado.' },
      { term: 'HS256', meaning: 'Lacre feito com um segredo dividido entre os dois lados.' },
      { term: 'RS256', meaning: 'Lacre feito com chave privada e conferido com chave pública.' },
    ],
    checks: [
      { statement: 'Qualquer pessoa pode ler a carga de um JWT assinado.', answer: true, why: 'Assinado não é cifrado; a carga fica legível.' },
      { statement: 'No HS256 existe um par de chave pública e chave privada.', answer: false, why: 'O HS256 usa um segredo compartilhado; o par de chaves é do RS256.' },
      { statement: 'O ID Token é feito para a API.', answer: false, why: 'O ID Token é para o aplicativo; o token de acesso é para a API.' },
    ],
  },

  'cap.dev.02:resumo': {
    pages: [
      {
        title: 'Para que serve esta revisão?',
        text: 'Esta seção junta as ideias dos dois capítulos: APIs e identidade. As provas costumam trazer frases quase certas, com um detalhe errado. Essas frases se chamam **pegadinhas**. Aqui você treina achar o detalhe que muda tudo.',
      },
      {
        title: 'Pegadinhas de API',
        text: '"POST é idempotente." Falso: repetir um POST pode criar dois registros. "401 é falta de permissão." Falso: 401 é falta de login, e 403 é falta de permissão. "JSON aceita comentários." Falso. "Todo XML bem formado é válido." Falso: ser válido exige seguir um **esquema**, o molde do documento.',
      },
      {
        title: 'Pegadinhas de GraphQL e WebSocket',
        text: '"GraphQL exige um endereço para cada recurso." Falso: ele usa um **endpoint** único, isto é, um só endereço. Um canal de ida e volta que fica aberto, iniciado com Upgrade e resposta 101, é o WebSocket. Descrever a API em YAML ou JSON, com Swagger UI, é OpenAPI.',
      },
      {
        title: 'Pegadinhas de OAuth',
        text: '"OAuth 2.0 é um protocolo de autenticação." Falso: é de autorização. "O fluxo implícito é o recomendado para sites." Falso: hoje se usa o código de autorização com PKCE. "O token de atualização vai em toda chamada à API." Falso: ele só é usado com o servidor de autorização.',
      },
      {
        title: 'Pegadinhas de JWT',
        text: '"O conteúdo de um JWT assinado é **sigiloso**." Falso: ele só está em Base64URL, e qualquer um lê. "HS256 usa par de chaves." Falso: usa um **segredo compartilhado**. Quem usa par de chaves é o RS256. Saber quem é o usuário, com ID Token e escopo openid, é OpenID Connect.',
      },
      {
        title: 'Resumindo',
        text: 'Desconfie de frases que trocam autorização por autenticação, ou 401 por 403. Lembre também: POST não é idempotente, e JWT assinado não é secreto.',
      },
    ],
    words: [
      { term: 'Pegadinha', meaning: 'Frase de prova quase certa, com um detalhe errado.' },
      { term: 'Idempotente', meaning: 'Repetir a ação dá o mesmo resultado que fazer uma vez.' },
      { term: 'Endpoint', meaning: 'Endereço da API para onde vão os pedidos.' },
      { term: 'Esquema', meaning: 'Molde que diz o que um documento XML pode conter.' },
      { term: 'Sigiloso', meaning: 'Escondido, que só pessoas autorizadas podem ler.' },
      { term: 'Segredo compartilhado', meaning: 'Mesma chave guardada pelos dois lados da conversa.' },
    ],
    checks: [
      { statement: 'OAuth 2.0 é um protocolo de autenticação.', answer: false, why: 'Ele é de autorização; a autenticação vem com o OpenID Connect.' },
      { statement: 'O código 403 indica falta de permissão.', answer: true, why: 'O 403 é para quem já foi reconhecido, mas não pode acessar.' },
      { statement: 'O conteúdo de um JWT assinado é sigiloso.', answer: false, why: 'Ele só está em Base64URL, e qualquer um lê.' },
    ],
  },

  // ------------------------------------------------------------------
  // Desenvolvimento: algoritmos e estruturas de dados
  // ------------------------------------------------------------------
  'cap.dev.03:logica': {
    pages: [
      {
        title: 'O que é um algoritmo?',
        text: 'Um **algoritmo** é uma lista de passos que leva de um começo a um resultado. Uma receita de bolo é um algoritmo: os ingredientes são a **entrada** e o bolo é a **saída**. Todo programa segue algoritmos, como o que soma os valores dos contratos de um órgão.',
      },
      {
        title: 'O que faz um bom algoritmo?',
        text: 'Um algoritmo precisa terminar depois de um número limitado de passos. Isso se chama **finitude**. Cada passo também precisa ser claro, sem dúvida. Uma receita que diz "tempere a gosto" falha nisso, porque cada pessoa entende de um jeito. Um passo que se repete para sempre falha na finitude.',
      },
      {
        title: 'Repetir com while e do-while',
        text: 'Programas usam **laços**, que são blocos repetidos. O `while` testa a condição antes de cada volta, então pode não rodar nenhuma vez. O `do...while` testa depois, então roda **pelo menos uma vez**. Compare: olhar se há fila antes de entrar, ou entrar primeiro e olhar depois.',
      },
      {
        title: 'A função que chama a si mesma',
        text: 'Uma função é **recursiva** quando chama a si mesma com um problema menor. Ela precisa de um **caso base**, o ponto em que para. Exemplo: o fatorial de 4 é 4 vezes o fatorial de 3, e assim até chegar a 1. Sem caso base, as chamadas se acumulam e o programa quebra.',
      },
      {
        title: 'Quanto o trabalho cresce?',
        text: 'A **notação Big-O** mede como o trabalho cresce quando os dados aumentam. O(1) é constante: pegar o item de uma posição. O(n) é linear: olhar item por item. O(n²) é quadrático: comparar cada item com todos os outros. O Big-O indica um limite de cima para esse crescimento.',
      },
      {
        title: 'Regras rápidas do Big-O',
        text: 'Você descarta números fixos: O(3n + 10) vira O(n). Fica só a parte que mais cresce: O(n² + n) vira O(n²). Um laço dentro de outro multiplica: dois laços de n dão O(n²). Exemplo: comparar cada CPF de uma lista com todos os outros, para achar repetidos, é quadrático.',
      },
      {
        title: 'Resumindo',
        text: 'Algoritmo é uma lista de passos claros que termina. O do-while roda pelo menos uma vez, e a recursão precisa de caso base. Big-O mostra como o trabalho cresce.',
      },
    ],
    words: [
      { term: 'Algoritmo', meaning: 'Lista de passos claros que leva a um resultado.' },
      { term: 'Finitude', meaning: 'O algoritmo termina depois de um número limitado de passos.' },
      { term: 'Laço', meaning: 'Bloco de instruções que se repete.' },
      { term: 'Recursão', meaning: 'Função que chama a si mesma com um problema menor.' },
      { term: 'Caso base', meaning: 'Ponto em que a recursão para de chamar a si mesma.' },
      { term: 'Big-O', meaning: 'Medida de como o trabalho cresce quando os dados aumentam.' },
    ],
    checks: [
      { statement: 'O laço do-while pode não executar nenhuma vez.', answer: false, why: 'Ele testa no final, então roda pelo menos uma vez.' },
      { statement: 'Uma função recursiva precisa de um caso base.', answer: true, why: 'Sem caso base, as chamadas não param e o programa quebra.' },
      { statement: 'O(3n + 10) é o mesmo que O(n).', answer: true, why: 'No Big-O, os números fixos são descartados.' },
    ],
  },

  'cap.dev.03:estruturas': {
    pages: [
      {
        title: 'Para que servem as estruturas?',
        text: 'Uma **estrutura de dados** é um jeito de organizar dados na memória. É como escolher entre uma gaveta, uma pilha de pratos ou uma fila de banco. Cada jeito facilita uma tarefa. A escolha certa depende do que você mais faz: buscar, inserir ou pegar o mais urgente.',
      },
      {
        title: 'Pilha e fila',
        text: 'Na **pilha**, o último a entrar é o primeiro a sair, como pratos empilhados. Isso se chama **LIFO**. O botão desfazer usa uma pilha. Na **fila**, o primeiro a entrar é o primeiro a sair, como na fila do banco. Isso se chama **FIFO**. A fila de impressão usa uma fila.',
      },
      {
        title: 'Vetor e lista ligada',
        text: 'O **vetor** guarda os itens lado a lado na memória, como casas numeradas numa rua. Você vai direto à casa 5. A **lista ligada** é uma corrente: cada item aponta para o próximo. Para chegar ao quinto, você passa pelos anteriores. Em troca, encaixar um item novo é rápido quando você já está no lugar certo.',
      },
      {
        title: 'Tabela hash',
        text: 'A **tabela hash** funciona como um armário com etiquetas. Uma **função hash** transforma a chave, como um CPF, no número da gaveta certa. Assim, buscar costuma ser muito rápido, O(1) em média. Quando duas chaves caem na mesma gaveta, há uma **colisão**, que precisa ser tratada.',
      },
      {
        title: 'Busca linear e binária',
        text: 'A **busca linear** olha item por item: funciona sempre, mas é O(n). A **busca binária** exige dados **ordenados**. Ela olha o meio e descarta a metade errada, como procurar uma palavra no dicionário. Em 1 milhão de registros, ela faz no máximo cerca de 20 comparações.',
      },
      {
        title: 'Colocar em ordem',
        text: 'Ordenar é pôr os itens em ordem, como organizar cartas na mão. O **bubble sort** compara vizinhos e é lento, O(n²). O **merge sort** divide ao meio, ordena as partes e junta. Ele é sempre O(n log n), bem mais rápido que O(n²). O **quick sort** é muito rápido na prática, mas no pior caso chega a O(n²).',
      },
      {
        title: 'Resumindo',
        text: 'Pilha é LIFO e fila é FIFO. A tabela hash busca rápido pela chave, e a busca binária exige dados ordenados. O quick sort pode chegar a O(n²) no pior caso.',
      },
    ],
    words: [
      { term: 'Estrutura de dados', meaning: 'Jeito de organizar dados na memória do computador.' },
      { term: 'Pilha (LIFO)', meaning: 'O último a entrar é o primeiro a sair.' },
      { term: 'Fila (FIFO)', meaning: 'O primeiro a entrar é o primeiro a sair.' },
      { term: 'Vetor', meaning: 'Itens lado a lado, acessados direto pela posição.' },
      { term: 'Tabela hash', meaning: 'Estrutura que acha o item pela chave, muito rápido em média.' },
      { term: 'Busca binária', meaning: 'Busca que olha o meio e descarta metade; exige ordem.' },
      { term: 'Ordenação', meaning: 'Colocar os itens em ordem, como do menor ao maior.' },
    ],
    checks: [
      { statement: 'A pilha segue a regra FIFO.', answer: false, why: 'A pilha é LIFO; quem segue FIFO é a fila.' },
      { statement: 'A busca binária exige dados ordenados.', answer: true, why: 'Ela só funciona descartando metades de dados em ordem.' },
      { statement: 'O quick sort é sempre O(n log n).', answer: false, why: 'No pior caso ele chega a O(n²).' },
    ],
  },

  'cap.dev.03:paradigmas': {
    pages: [
      {
        title: 'O que é um paradigma?',
        text: 'Um **paradigma** é um estilo de organizar um programa. É como escolher entre cozinhar por fichas de cada prato ou numa linha de montagem. O edital cobra dois estilos: a **orientação a objetos** e a **programação funcional**. As linguagens modernas misturam os dois.',
      },
      {
        title: 'Classe e objeto',
        text: 'Uma **classe** é o molde, como a forma de um bolo. Um **objeto** é cada bolo feito com essa forma. A classe define os **atributos**, que são os dados, e os **métodos**, que são as ações. Exemplo: a classe Processo tem número e valor. Cada processo real é um objeto.',
      },
      {
        title: 'Os quatro pilares',
        text: '**Abstração**: guardar só o que importa. **Encapsulamento**: esconder os dados por dentro e deixar mexer só por métodos controlados. **Herança**: uma classe aproveita outra, numa relação "é um". **Polimorfismo**: o mesmo comando age de jeitos diferentes conforme o objeto, como o botão ligar da TV e do rádio.',
      },
      {
        title: 'Sobrecarga e sobrescrita',
        text: 'Na **sobrecarga**, métodos têm o mesmo nome, mas recebem coisas diferentes. Isso é decidido na compilação, quando o código é traduzido. Na **sobrescrita**, uma classe filha refaz um método da classe mãe, com os mesmos parâmetros. Isso é decidido durante a execução, conforme o objeto real.',
      },
      {
        title: 'Herança ou composição?',
        text: 'Herança é "é um": um processo licitatório é um processo. **Composição** é "tem um": um relatório tem um exportador de PDF. A composição cria menos dependência entre as partes. Por isso, um livro clássico de programação recomenda preferir composição a herança.',
      },
      {
        title: 'Programação funcional',
        text: 'Aqui o centro são as funções. Uma **função pura** sempre dá a mesma saída para a mesma entrada. E não tem **efeito colateral**, isto é, não muda nada fora dela, como gravar num arquivo. Funções como `filter` escolhem itens, `map` transforma cada item e `reduce` junta tudo num valor só.',
      },
      {
        title: 'Resumindo',
        text: 'Classe é o molde, e objeto é o que sai dele. Herança é "é um", e composição é "tem um". Função pura não tem efeito colateral.',
      },
    ],
    words: [
      { term: 'Paradigma', meaning: 'Estilo de organizar um programa.' },
      { term: 'Classe', meaning: 'Molde que define dados e ações dos objetos.' },
      { term: 'Objeto', meaning: 'Cada item criado a partir de uma classe.' },
      { term: 'Encapsulamento', meaning: 'Esconder os dados e deixar mexer só por métodos controlados.' },
      { term: 'Herança', meaning: 'Uma classe aproveita outra, numa relação "é um".' },
      { term: 'Polimorfismo', meaning: 'O mesmo comando age de jeitos diferentes conforme o objeto.' },
      { term: 'Função pura', meaning: 'Mesma entrada, mesma saída, sem mexer em nada fora dela.' },
      { term: 'Efeito colateral', meaning: 'Mudança fora da função, como gravar arquivo ou escrever na tela.' },
    ],
    checks: [
      { statement: 'Composição representa uma relação do tipo "tem um".', answer: true, why: 'Herança é "é um"; composição é "tem um".' },
      { statement: 'Uma função que grava um registro num arquivo continua pura.', answer: false, why: 'Gravar em arquivo é efeito colateral.' },
      { statement: 'A sobrecarga é decidida durante a execução.', answer: false, why: 'A sobrecarga é decidida na compilação; a sobrescrita, na execução.' },
    ],
  },

  // ------------------------------------------------------------------
  // Desenvolvimento: linguagens
  // ------------------------------------------------------------------
  'cap.dev.04:java-python': {
    pages: [
      {
        title: 'Por que Java e Python?',
        text: '**Linguagens de programação** são idiomas para dar ordens ao computador. Java e Python são muito usadas em órgãos públicos. Exemplo: com Python, você pode criar um pequeno programa que soma várias planilhas de gastos. O edital pede o básico das duas.',
      },
      {
        title: 'Como o Java roda?',
        text: 'Você escreve o código num arquivo `.java`. O **compilador** traduz esse texto para **bytecode**, um código intermediário. Quem roda o bytecode é a **JVM**, a máquina virtual do Java. Por isso o mesmo programa roda em qualquer sistema que tenha JVM. A JVM não lê o arquivo `.java` diretamente.',
      },
      {
        title: 'As siglas do Java',
        text: 'A **JVM** executa o bytecode. O **JRE** é o ambiente para rodar programas: a JVM mais as bibliotecas, que são códigos prontos. O **JDK** é o kit de quem programa: o JRE mais o compilador e outras ferramentas. Pense em caixas, uma dentro da outra. O Java também limpa a memória sozinho, com o **coletor de lixo**.',
      },
      {
        title: 'Erros que o Java obriga a tratar',
        text: 'Uma **exceção** é um erro que acontece com o programa rodando. As **checked** precisam ser tratadas, como a falha ao ler um arquivo. As **unchecked** têm tratamento opcional. Exemplo: a NullPointerException, que surge ao usar algo vazio, é unchecked. Tratar é dizer ao programa o que fazer se o erro ocorrer.',
      },
      {
        title: 'Como é o Python?',
        text: 'Em Python, os blocos de código são marcados pelo recuo da linha, chamado **indentação**, e não por chaves. A tipagem é **dinâmica**: uma variável pode guardar um número e depois um texto. Mas também é **forte**: somar o texto "1" com o número 1 dá erro, sem conversão automática.',
      },
      {
        title: 'Listas, tuplas e dicionários',
        text: 'A **lista** guarda itens em ordem e pode ser alterada: `[1, 2, 3]`. A **tupla** parece uma lista, mas não pode ser alterada: `(1, 2, 3)`. O **dicionário** liga chaves a valores, como uma agenda de nome e telefone. Para separar as bibliotecas de cada projeto, usa-se o **venv**.',
      },
      {
        title: 'Resumindo',
        text: 'O Java vira bytecode, e a JVM executa esse bytecode. Em Python, a indentação marca os blocos. A lista pode mudar, e a tupla não.',
      },
    ],
    words: [
      { term: 'Bytecode', meaning: 'Código intermediário que a JVM executa.' },
      { term: 'JVM', meaning: 'Máquina virtual que roda programas Java.' },
      { term: 'JDK', meaning: 'Kit de quem programa em Java, com o compilador.' },
      { term: 'Exceção', meaning: 'Erro que acontece com o programa rodando.' },
      { term: 'Indentação', meaning: 'Recuo no começo da linha que marca os blocos em Python.' },
      { term: 'Tupla', meaning: 'Lista do Python que não pode ser alterada.' },
      { term: 'venv', meaning: 'Ambiente separado com as bibliotecas de um projeto Python.' },
    ],
    checks: [
      { statement: 'A JVM executa o arquivo .java diretamente.', answer: false, why: 'Ela executa o bytecode gerado pelo compilador.' },
      { statement: 'Em Python, a tupla não pode ser alterada.', answer: true, why: 'A tupla é fixa; a lista é que pode mudar.' },
      { statement: 'Em Python, somar o texto "1" com o número 1 dá 2.', answer: false, why: 'A tipagem é forte, então a soma dá erro.' },
    ],
  },

  'cap.dev.04:javascript-ts': {
    pages: [
      {
        title: 'Para que serve o JavaScript?',
        text: 'O **JavaScript** nasceu para dar vida às páginas web, como fazer um botão responder ao clique. Hoje ele também roda no servidor, com o **Node.js**. O **TypeScript** é o JavaScript com tipos, que você verá adiante. Um sistema de protocolo eletrônico pode usar os três juntos.',
      },
      {
        title: 'let, const e var',
        text: 'Uma **variável** é uma caixa com nome que guarda um valor. Com `let`, você pode trocar o valor depois. Com `const`, não pode pôr outro valor na caixa. Mas, se dentro dela houver uma lista, a lista ainda pode mudar. O `var` é a forma antiga, com regras mais confusas.',
      },
      {
        title: 'Dois iguais ou três iguais?',
        text: 'O `==` compara depois de converter os tipos. Então `0 == \'0\'` dá verdadeiro. O `===` compara valor **e tipo**, sem converter. Então `0 === \'0\'` dá falso, porque um é número e o outro é texto. Na dúvida, prefira o `===`.',
      },
      {
        title: 'Uma tarefa de cada vez',
        text: 'O JavaScript trabalha numa **única thread**, isto é, faz uma coisa de cada vez. Tarefas demoradas, como buscar dados na rede, esperam numa fila. O **event loop** é o organizador: quando o programa termina o que está fazendo, ele pega a próxima tarefa da fila. Assim a página não trava.',
      },
      {
        title: 'Promessas de valor futuro',
        text: 'Uma **Promise** é a promessa de um valor que ainda vai chegar, como a senha de um restaurante. Ela pode estar pendente, cumprida ou rejeitada. O `await` espera a Promise dentro de uma função `async`, sem travar o resto do programa. O `Promise.all` falha assim que uma das promessas falha.',
      },
      {
        title: 'O que o TypeScript traz?',
        text: 'O **TypeScript** acrescenta **tipos** ao JavaScript: você diz que um campo é número ou texto. O compilador confere isso antes de o programa rodar. Depois, gera JavaScript comum, e os tipos são apagados. Exemplo: se `valor` deve ser número, escrever um texto ali gera um aviso na hora.',
      },
      {
        title: 'Resumindo',
        text: 'O `===` compara valor e tipo. O `const` impede trocar o valor da variável, mas não trava o conteúdo de uma lista. Os tipos do TypeScript são conferidos antes de rodar e depois apagados.',
      },
    ],
    words: [
      { term: 'JavaScript', meaning: 'Linguagem que dá vida às páginas web e roda no servidor.' },
      { term: 'Node.js', meaning: 'Ambiente que roda JavaScript fora do navegador.' },
      { term: 'const', meaning: 'Variável que não pode receber outro valor.' },
      { term: '===', meaning: 'Comparação que confere valor e tipo, sem converter.' },
      { term: 'Event loop', meaning: 'Organizador que pega a próxima tarefa da fila.' },
      { term: 'Promise', meaning: 'Promessa de um valor que ainda vai chegar.' },
      { term: 'TypeScript', meaning: 'JavaScript com tipos conferidos antes de rodar.' },
    ],
    checks: [
      { statement: 'Em JavaScript, 0 === \'0\' é verdadeiro.', answer: false, why: 'O === compara também o tipo, e número não é texto.' },
      { statement: 'O const impede pôr outro valor na variável.', answer: true, why: 'Com const não dá para trocar o valor da caixa.' },
      { statement: 'Os tipos do TypeScript são conferidos pelo navegador durante a execução.', answer: false, why: 'Eles são conferidos antes de rodar e depois apagados.' },
    ],
  },

  'cap.dev.04:web-react': {
    pages: [
      {
        title: 'Do que é feita uma página?',
        text: 'Uma página web tem três camadas. O **HTML** é a estrutura, como as paredes da casa. O **CSS** é a aparência, como a pintura e os móveis. O **JavaScript** é o comportamento, como as luzes que acendem. O **React** ajuda a montar telas com peças que podem ser reaproveitadas.',
      },
      {
        title: 'HTML com significado',
        text: 'O HTML5 trouxe **etiquetas semânticas**, que dizem o papel de cada parte. `<header>` é o cabeçalho, `<nav>` é o menu, `<main>` é o conteúdo principal e `<footer>` é o rodapé. Ele também trouxe campos como e-mail e data. Atenção: validar no navegador não dispensa validar no servidor.',
      },
      {
        title: 'Páginas para todas as pessoas',
        text: '**Acessibilidade** é permitir que pessoas com deficiência usem o sistema. Por exemplo, quem usa um leitor de tela, que lê a página em voz alta. Boas práticas: texto alternativo nas imagens, com o atributo `alt`, e um rótulo em cada campo. As regras internacionais se chamam **WCAG**.',
      },
      {
        title: 'Quem vence no CSS?',
        text: 'Quando duas regras de CSS brigam, vence a de maior **especificidade**, uma espécie de peso. Um seletor por **ID** aponta um único elemento. Ele pesa mais que um seletor por **classe**, que aponta um grupo. A classe pesa mais que o nome da etiqueta. Se o peso empatar, vence a regra escrita por último.',
      },
      {
        title: 'Flexbox e grid',
        text: 'O **flexbox** arruma itens numa direção só: uma linha ou uma coluna. O **grid** arruma em duas direções, linhas e colunas, como uma planilha. As **media queries** mudam o visual conforme o tamanho da tela. Exemplo: uma coluna no celular e três colunas no computador.',
      },
      {
        title: 'As peças do React',
        text: 'No React, a tela é feita de **componentes**, que são peças reaproveitáveis. As **props** são dados que a peça mãe passa à filha. A filha só lê as props, não pode alterá-las. O **estado** guarda dados que mudam, como uma lista carregada. Quando o estado muda, o React desenha a peça de novo.',
      },
      {
        title: 'Resumindo',
        text: 'HTML é a estrutura, CSS é a aparência e JavaScript é o comportamento. No CSS, ID pesa mais que classe. No React, as props são só de leitura.',
      },
    ],
    words: [
      { term: 'HTML', meaning: 'Linguagem que monta a estrutura da página.' },
      { term: 'CSS', meaning: 'Linguagem que define a aparência da página.' },
      { term: 'Acessibilidade', meaning: 'Permitir que pessoas com deficiência usem o sistema.' },
      { term: 'Especificidade', meaning: 'Peso que decide qual regra de CSS vence.' },
      { term: 'Flexbox', meaning: 'Arruma itens numa direção só: linha ou coluna.' },
      { term: 'Grid', meaning: 'Arruma itens em linhas e colunas ao mesmo tempo.' },
      { term: 'Componente', meaning: 'Peça reaproveitável de uma tela no React.' },
      { term: 'Props', meaning: 'Dados que o componente pai passa ao filho, só para leitura.' },
    ],
    checks: [
      { statement: 'Validar os campos no navegador dispensa validar no servidor.', answer: false, why: 'O usuário pode contornar o navegador, então o servidor também valida.' },
      { statement: 'O flexbox arruma em uma direção, e o grid em duas.', answer: true, why: 'Flexbox é linha ou coluna; grid é linhas e colunas.' },
      { statement: 'Um componente React pode alterar as props que recebeu.', answer: false, why: 'As props são só de leitura para o filho.' },
    ],
  },

  'cap.dev.04:pacotes': {
    pages: [
      {
        title: 'Por que usar pacotes?',
        text: 'Quase nenhum sistema é feito do zero. Ele usa **bibliotecas**, códigos prontos feitos por outras pessoas. Essas bibliotecas são as **dependências** do sistema. É como uma receita que usa massa pronta do mercado. Você precisa saber qual massa e qual versão usou, para o bolo sair sempre igual.',
      },
      {
        title: 'O número da versão',
        text: 'O **SemVer** escreve versões em três partes: MAJOR.MINOR.PATCH, como 2.4.1. O **PATCH** sobe quando há só correção: 2.4.2. O **MINOR** sobe com novidade compatível: 2.5.0. O **MAJOR** sobe quando há mudança incompatível, que quebra o uso antigo: 3.0.0.',
      },
      {
        title: 'Til e circunflexo',
        text: 'No **npm**, o gerenciador de pacotes do Node.js, o til de `~1.2.3` aceita só correções: vai até antes de 1.3.0. O circunflexo de `^1.2.3` aceita correções e novidades, mas mantém o primeiro número: vai até antes de 2.0.0. Então `^1.2.3` aceita 1.9.0, mas não 2.0.0.',
      },
      {
        title: 'package.json e lockfile',
        text: 'O **package.json** é a ficha do projeto: nome, versão, comandos e dependências. O **lockfile** registra a versão exata de cada dependência, até das dependências delas. Ele deve ser guardado no **Git**, o sistema que guarda o histórico do código. Já a pasta `node_modules`, com as bibliotecas baixadas, não vai para o Git.',
      },
      {
        title: 'Python e Java também têm',
        text: 'No Python, o **pip** instala pacotes, e o arquivo `requirements.txt` lista as dependências. No Java, o **Maven** usa o arquivo `pom.xml`. O Maven trabalha em fases em sequência, como compilar, testar e empacotar. Rodar uma fase roda também as anteriores. Assim, `mvn package` também compila e testa.',
      },
      {
        title: 'Montar e publicar',
        text: 'O **build** transforma o código num **artefato**, um pacote pronto para instalar ou rodar. Depois vem a **publicação**: enviar o artefato a um registro, como o do npm. Uma versão publicada no npm não pode ser publicada de novo com o mesmo número. Para corrigir, você lança uma nova versão.',
      },
      {
        title: 'Resumindo',
        text: 'No SemVer, mudança incompatível sobe o MAJOR. O til aceita só correções, e o circunflexo mantém o primeiro número. O lockfile vai para o Git, e o node_modules não.',
      },
    ],
    words: [
      { term: 'Dependência', meaning: 'Biblioteca pronta de que o seu sistema precisa.' },
      { term: 'SemVer', meaning: 'Regra de versão em três partes: MAJOR.MINOR.PATCH.' },
      { term: 'npm', meaning: 'Gerenciador de pacotes que acompanha o Node.js.' },
      { term: 'Lockfile', meaning: 'Arquivo com a versão exata de todas as dependências.' },
      { term: 'Maven', meaning: 'Ferramenta do Java que baixa dependências e monta o pacote.' },
      { term: 'Build', meaning: 'Etapa que transforma o código num pacote pronto.' },
      { term: 'Artefato', meaning: 'Pacote pronto para instalar ou rodar.' },
    ],
    checks: [
      { statement: 'A versão ~1.2.3 aceita a 1.3.0.', answer: false, why: 'O til aceita só correções, até antes de 1.3.0.' },
      { statement: 'O lockfile deve ser guardado no Git.', answer: true, why: 'Assim todos instalam exatamente as mesmas versões.' },
      { statement: 'No SemVer, uma mudança incompatível sobe o MINOR.', answer: false, why: 'Mudança incompatível sobe o MAJOR.' },
    ],
  },

  // ------------------------------------------------------------------
  // Infraestrutura: redes
  // ------------------------------------------------------------------
  'cap.infra.01:tcpip': {
    pages: [
      {
        title: 'Como os computadores conversam?',
        text: 'Quando você abre o portal do Tribunal, seu computador troca mensagens com um servidor distante. Uma **rede** é o conjunto de caminhos e regras que permite isso. Cada conjunto de regras de conversa se chama **protocolo**. A internet usa uma família de protocolos chamada **TCP/IP**.',
      },
      {
        title: 'Uma conversa em camadas',
        text: 'A rede funciona em **camadas**, como um envio pelo correio. Uma pessoa escreve a carta, outra põe no envelope, outra leva no caminhão. O TCP/IP tem quatro camadas: aplicação, transporte, internet e acesso à rede. Existe também o **modelo OSI**, com sete camadas, usado mais para ensinar.',
      },
      {
        title: 'Envelope dentro de envelope',
        text: 'Cada camada coloca seus dados de controle junto da mensagem, como um novo envelope. Isso se chama **encapsulamento**. Os pedaços ganham nomes diferentes em cada camada: **segmento** no transporte com TCP, **pacote** na camada de rede e **quadro** na camada mais próxima do cabo.',
      },
      {
        title: 'TCP ou UDP?',
        text: 'O **TCP** é como uma carta registrada: confirma a entrega, reenvia o que se perdeu e mantém a ordem. Ele abre a conexão com três mensagens: SYN, SYN-ACK e ACK. O **UDP** é como um cartão-postal: mais leve e rápido, mas sem garantia. Voz e vídeo ao vivo costumam usar UDP.',
      },
      {
        title: 'O que são portas?',
        text: 'Um servidor roda vários serviços ao mesmo tempo. A **porta** é um número que indica qual serviço recebe a mensagem. É como o número do apartamento num prédio. Exemplos: HTTP usa a porta 80, HTTPS usa a 443, SSH usa a 22 e DNS usa a 53.',
      },
      {
        title: 'Bater na porta com ping',
        text: 'O **ICMP** leva mensagens de controle e de erro da rede. O comando `ping` usa o ICMP para perguntar se outra máquina está respondendo. É como bater na porta de alguém. O `traceroute` mostra o caminho que a mensagem percorre até o destino.',
      },
      {
        title: 'Resumindo',
        text: 'O TCP/IP organiza a rede em quatro camadas. O TCP garante a entrega em ordem, e o UDP é rápido mas sem garantia. As portas apontam o serviço certo, como a 443 do HTTPS.',
      },
    ],
    words: [
      { term: 'Protocolo', meaning: 'Conjunto de regras combinadas para conversar na rede.' },
      { term: 'TCP/IP', meaning: 'Família de protocolos usada pela internet, em quatro camadas.' },
      { term: 'Camada', meaning: 'Etapa da comunicação que cuida de um problema só.' },
      { term: 'Encapsulamento', meaning: 'Cada camada põe seu envelope em volta da mensagem.' },
      { term: 'TCP', meaning: 'Protocolo que confirma a entrega e mantém a ordem.' },
      { term: 'UDP', meaning: 'Protocolo rápido e leve, sem garantia de entrega.' },
      { term: 'Porta', meaning: 'Número que indica qual serviço recebe a mensagem.' },
      { term: 'ICMP', meaning: 'Protocolo de mensagens de controle, usado pelo ping.' },
    ],
    checks: [
      { statement: 'O UDP garante a entrega em ordem.', answer: false, why: 'Quem garante a entrega em ordem é o TCP.' },
      { statement: 'O HTTPS usa a porta 443.', answer: true, why: 'A porta 443 é a do HTTPS.' },
      { statement: 'O TCP/IP tem sete camadas.', answer: false, why: 'O TCP/IP tem quatro; quem tem sete é o modelo OSI.' },
    ],
  },

  'cap.infra.01:enderecos': {
    pages: [
      {
        title: 'Para que serve um endereço IP?',
        text: 'Para uma carta chegar, ela precisa de endereço. Na rede é igual. Cada máquina recebe um **endereço IP**, que mostra onde ela está. Sem ele, os dados não sabem para onde ir. Há duas versões em uso: o **IPv4**, mais antigo, e o **IPv6**, mais novo e bem maior.',
      },
      {
        title: 'Como é um IPv4?',
        text: 'Um **bit** é a menor unidade de informação, um 0 ou um 1. Um IPv4 tem 32 bits, escritos como quatro números separados por pontos: `192.168.10.37`. Uma parte indica a **rede**, como a rua. A outra indica a máquina, chamada **host**, como o número da casa.',
      },
      {
        title: 'O que quer dizer /24?',
        text: 'A **máscara** diz onde termina a parte da rede. Na notação **CIDR**, o número depois da barra conta os bits da rede. Por exemplo, `/24` é o mesmo que a máscara 255.255.255.0. Sobram 8 bits para as máquinas, o que dá 256 endereços nessa sub-rede.',
      },
      {
        title: 'Quantas máquinas cabem?',
        text: 'Numa sub-rede, dois endereços ficam reservados: o da própria rede e o de **broadcast**, que fala com todos de uma vez. Por isso a conta é: endereços menos 2. Exemplo: um /26 tem 64 endereços e 62 máquinas utilizáveis. Um /24 tem 256 endereços e 254 utilizáveis.',
      },
      {
        title: 'Endereços especiais',
        text: 'Alguns endereços são **privados**, como os que começam com 192.168 ou com 10. Eles servem só dentro de uma rede interna. Para sair para a internet, o roteador usa o **NAT**, que troca o endereço privado pelo público. O endereço 127.0.0.1 é a própria máquina, chamado loopback.',
      },
      {
        title: 'E o IPv6?',
        text: 'O IPv6 tem 128 bits, escritos em oito grupos de letras e números, separados por dois-pontos. Para encurtar, uma sequência de grupos só de zeros vira `::`, mas só uma vez no endereço. O IPv6 não tem broadcast: usa **multicast**, que fala com um grupo escolhido.',
      },
      {
        title: 'Resumindo',
        text: 'O IPv4 tem 32 bits, e o IPv6 tem 128. Numa sub-rede, as máquinas utilizáveis são os endereços menos 2. No IPv6, o :: aparece só uma vez.',
      },
    ],
    words: [
      { term: 'Endereço IP', meaning: 'Número que mostra onde uma máquina está na rede.' },
      { term: 'Bit', meaning: 'Menor unidade de informação: um 0 ou um 1.' },
      { term: 'Host', meaning: 'Cada máquina ligada à rede.' },
      { term: 'Máscara', meaning: 'Indica onde termina a parte da rede no endereço.' },
      { term: 'Broadcast', meaning: 'Endereço que fala com todas as máquinas da rede de uma vez.' },
      { term: 'NAT', meaning: 'Troca o endereço privado pelo público para sair à internet.' },
      { term: 'IPv6', meaning: 'Versão nova do IP, com 128 bits e sem broadcast.' },
    ],
    checks: [
      { statement: 'Um /26 tem 64 máquinas utilizáveis.', answer: false, why: 'São 64 endereços, mas só 62 máquinas utilizáveis.' },
      { statement: 'O IPv6 tem 128 bits.', answer: true, why: 'O IPv4 tem 32 bits e o IPv6 tem 128.' },
      { statement: 'Um endereço IPv6 pode usar :: duas vezes.', answer: false, why: 'O :: pode aparecer só uma vez.' },
    ],
  },

  'cap.infra.01:servicos': {
    pages: [
      {
        title: 'Serviços que você usa sem ver',
        text: 'Quando você abre um site ou lê seus e-mails, vários serviços trabalham em silêncio. O **DNS** encontra o endereço do site. O **DHCP** dá um endereço à sua máquina. Outros protocolos levam páginas, e-mails e arquivos. Esta seção mostra os principais.',
      },
      {
        title: 'DNS, a agenda da internet',
        text: 'As pessoas lembram nomes, mas a rede usa números. O **DNS** traduz nomes, como portal.tce.go.gov.br, em endereços IP. É como a agenda do celular, que troca o nome do contato pelo telefone. As respostas ficam guardadas por um tempo, chamado **TTL**, para não perguntar de novo toda hora.',
      },
      {
        title: 'As fichas do DNS',
        text: 'O DNS guarda informações em **registros**, como fichas de um arquivo. O registro **A** liga um nome a um IPv4. O **AAAA** liga um nome a um IPv6. O **MX** diz quais servidores recebem o e-mail do domínio. O **CNAME** é um apelido que aponta para outro nome.',
      },
      {
        title: 'DHCP e o DORA',
        text: 'O **DHCP** entrega sozinho à sua máquina o endereço IP e outros dados da rede. A conversa tem quatro passos, lembrados pela sigla **DORA**: Discover, a máquina procura; Offer, o servidor oferece; Request, a máquina pede; Acknowledge, o servidor confirma.',
      },
      {
        title: 'As versões do HTTP',
        text: 'O **HTTP** leva as páginas web. O **HTTPS** é o HTTP protegido por TLS, uma camada de proteção. O **HTTP/2** manda vários pedidos juntos na mesma conexão. O **HTTP/3** funciona sobre o **QUIC**, que usa UDP, e não sobre TCP. Assim, a perda de um pedaço não trava os outros.',
      },
      {
        title: 'E-mail, arquivos e acesso remoto',
        text: 'O **SMTP** envia e-mails. Para ler, usa-se o **IMAP**, que mantém as mensagens no servidor, ou o **POP3**, que as baixa. O **FTP** transfere arquivos, mas manda a senha sem proteção. O **SSH**, na porta 22, dá acesso remoto protegido ao computador. Ele substituiu o Telnet.',
      },
      {
        title: 'Resumindo',
        text: 'O DNS traduz nomes em IPs, e o DHCP entrega endereços sozinho. O registro MX aponta o e-mail, e o AAAA aponta um IPv6. O HTTP/3 usa QUIC, que roda sobre UDP.',
      },
    ],
    words: [
      { term: 'DNS', meaning: 'Serviço que traduz nomes de sites em endereços IP.' },
      { term: 'TTL', meaning: 'Tempo que uma resposta fica guardada antes de perguntar de novo.' },
      { term: 'Registro MX', meaning: 'Ficha do DNS que indica os servidores de e-mail.' },
      { term: 'DHCP', meaning: 'Serviço que entrega endereço IP às máquinas automaticamente.' },
      { term: 'HTTPS', meaning: 'HTTP protegido por TLS.' },
      { term: 'QUIC', meaning: 'Protocolo sobre UDP usado pelo HTTP/3.' },
      { term: 'SSH', meaning: 'Acesso remoto protegido a um computador, na porta 22.' },
    ],
    checks: [
      { statement: 'O registro MX traduz um nome em endereço IPv6.', answer: false, why: 'Isso é o AAAA; o MX indica os servidores de e-mail.' },
      { statement: 'O DHCP entrega endereço IP automaticamente.', answer: true, why: 'Essa é a função do DHCP.' },
      { statement: 'O HTTP/3 funciona sobre TCP.', answer: false, why: 'Ele funciona sobre QUIC, que usa UDP.' },
    ],
  },

  'cap.infra.01:perimetro': {
    pages: [
      {
        title: 'Por que proteger a borda?',
        text: 'A rede do Tribunal se liga à internet, e por ali podem chegar ataques. O **perímetro** é a borda entre a rede interna e o mundo de fora. Nele ficam os guardas da rede: firewalls, VPNs, proxies e balanceadores. Cada um cuida de uma parte da entrada e da saída.',
      },
      {
        title: 'O firewall, porteiro da rede',
        text: 'O **firewall** é como o porteiro de um prédio: decide o que entra e o que sai, seguindo regras. O **firewall com estado** lembra das conversas abertas e deixa passar as respostas a pedidos feitos de dentro. O **WAF** protege sites e bloqueia ataques contra eles. Exemplo: a injeção de SQL, um truque para enganar o banco de dados.',
      },
      {
        title: 'A DMZ, a recepção da rede',
        text: 'A **DMZ** é uma área separada, entre a internet e a rede interna. Nela ficam os serviços que o público acessa, como o portal e o e-mail. Pense na recepção de um prédio: visitantes entram ali, mas não sobem às salas. Se um servidor da DMZ for invadido, o atacante ainda não está na rede interna.',
      },
      {
        title: 'VPN, o túnel seguro',
        text: 'A **VPN** cria um túnel protegido por criptografia sobre uma rede insegura, como a internet. **Criptografia** é transformar a mensagem em código que só quem tem a chave lê. A VPN pode ligar duas redes, como a sede e um escritório regional. Ou pode ligar à rede do órgão uma pessoa que trabalha de casa.',
      },
      {
        title: 'Proxy e proxy reverso',
        text: 'O **proxy** fica na frente dos usuários. Ele controla e registra o acesso deles à internet. O **proxy reverso** fica na frente dos servidores. Ele esconde os servidores internos e recebe os pedidos por eles. Lembre: o proxy cuida de quem pede, e o proxy reverso cuida de quem responde.',
      },
      {
        title: 'Dividir o trabalho',
        text: 'O **balanceador de carga** distribui os pedidos entre vários servidores. É como um gerente que manda cada cliente a um caixa livre. O **round robin** é o rodízio: um pedido para cada servidor, em ordem. Se um servidor para de responder, a **verificação de saúde** o tira do rodízio.',
      },
      {
        title: 'Resumindo',
        text: 'O firewall decide o que passa, e a DMZ separa os serviços públicos da rede interna. A VPN cria um túnel protegido. O proxy reverso fica na frente dos servidores.',
      },
    ],
    words: [
      { term: 'Firewall', meaning: 'Porteiro da rede que decide o que entra e o que sai.' },
      { term: 'WAF', meaning: 'Firewall que protege sites contra ataques na web.' },
      { term: 'DMZ', meaning: 'Área separada onde ficam os serviços abertos ao público.' },
      { term: 'VPN', meaning: 'Túnel protegido por criptografia sobre uma rede insegura.' },
      { term: 'Criptografia', meaning: 'Transformar a mensagem em código que só quem tem a chave lê.' },
      { term: 'Proxy reverso', meaning: 'Intermediário que fica na frente dos servidores.' },
      { term: 'Balanceador de carga', meaning: 'Distribui os pedidos entre vários servidores.' },
    ],
    checks: [
      { statement: 'O proxy reverso fica na frente dos servidores.', answer: true, why: 'Ele esconde os servidores e recebe os pedidos por eles.' },
      { statement: 'A DMZ é onde ficam os sistemas internos mais sigilosos.', answer: false, why: 'Na DMZ ficam os serviços abertos ao público, como o portal.' },
      { statement: 'A VPN cria um túnel protegido por criptografia.', answer: true, why: 'Esse é o papel da VPN sobre redes inseguras.' },
    ],
  },

  // ------------------------------------------------------------------
  // Infraestrutura: nuvem
  // ------------------------------------------------------------------
  'cap.infra.02:modelos': {
    pages: [
      {
        title: 'O que é computação em nuvem?',
        text: '**Computação em nuvem** é usar computadores, programas e espaço de guardar dados pela rede. Você usa na hora em que precisa e libera depois. É como usar a energia da rede elétrica em vez de manter um gerador: você paga pelo que usa. A definição mais citada é a do **NIST**, um órgão de padrões dos Estados Unidos, de 2011.',
      },
      {
        title: 'As cinco características',
        text: 'Para o NIST, a nuvem tem cinco marcas. **Autoatendimento**: você mesmo pede os recursos. **Amplo acesso pela rede**: dá para usar de vários aparelhos. **Agrupamento de recursos**: muitos clientes dividem as máquinas. **Elasticidade**: cresce e diminui conforme a necessidade. **Serviço medido**: o uso é medido e cobrado.',
      },
      {
        title: 'IaaS, PaaS e SaaS',
        text: 'Pense numa pizza. No **IaaS**, você recebe a cozinha e faz o resto: ganha máquinas virtuais e cuida do sistema e dos programas. No **PaaS**, a massa vem pronta: você só cuida da sua aplicação e dos dados. No **SaaS**, a pizza chega pronta: você só usa o programa, como um e-mail na web.',
      },
      {
        title: 'Quem cuida da segurança?',
        text: 'A segurança é **compartilhada** entre o provedor e o cliente. O provedor sempre cuida das máquinas físicas. O cliente sempre cuida dos seus dados, das suas contas e das permissões que dá. Exemplo: no IaaS, é o cliente quem atualiza o sistema operacional das máquinas virtuais.',
      },
      {
        title: 'Quem usa a nuvem?',
        text: 'A **nuvem pública** atende qualquer cliente. A **nuvem privada** atende uma só organização. A **nuvem comunitária** atende um grupo com interesses comuns, como vários órgãos públicos. A **nuvem híbrida** junta duas ou mais dessas, ligadas entre si.',
      },
      {
        title: 'Resumindo',
        text: 'Nuvem é usar recursos pela rede, sob demanda, pagando pelo uso. Do IaaS ao SaaS, você cuida de cada vez menos coisas. Os dados e os acessos são sempre responsabilidade do cliente.',
      },
    ],
    words: [
      { term: 'Computação em nuvem', meaning: 'Usar recursos de computação pela rede, sob demanda.' },
      { term: 'Elasticidade', meaning: 'Aumentar e diminuir os recursos conforme a necessidade.' },
      { term: 'IaaS', meaning: 'Nuvem que entrega máquinas virtuais; o cliente cuida do resto.' },
      { term: 'PaaS', meaning: 'Nuvem que entrega a plataforma; o cliente cuida da aplicação.' },
      { term: 'SaaS', meaning: 'Nuvem que entrega o programa pronto para usar.' },
      { term: 'Responsabilidade compartilhada', meaning: 'Segurança dividida entre provedor e cliente.' },
      { term: 'Nuvem híbrida', meaning: 'Junção de dois ou mais tipos de nuvem ligados entre si.' },
    ],
    checks: [
      { statement: 'No SaaS, o cliente atualiza o sistema operacional.', answer: false, why: 'Isso cabe ao cliente no IaaS; no SaaS quase tudo é do provedor.' },
      { statement: 'A nuvem comunitária atende um grupo com interesses comuns.', answer: true, why: 'Por exemplo, vários órgãos públicos.' },
      { statement: 'Na nuvem, a segurança dos dados é só do provedor.', answer: false, why: 'A responsabilidade é compartilhada; os dados são sempre do cliente.' },
    ],
  },

  'cap.infra.02:escala': {
    pages: [
      {
        title: 'Para que serve escalar?',
        text: 'Imagine o portal do Tribunal num dia de muitos acessos ao mesmo tempo. O sistema precisa aguentar esse pico e depois voltar ao normal. **Escalar** é aumentar ou diminuir a capacidade conforme a procura. Esta seção mostra os jeitos de fazer isso e de manter o serviço no ar.',
      },
      {
        title: 'Vertical ou horizontal?',
        text: 'Na **escala vertical**, você fortalece uma máquina: mais processador, mais memória. É como trocar o carro por um maior. Tem limite e costuma exigir reinício. Na **escala horizontal**, você acrescenta mais máquinas e divide o trabalho entre elas. É como pôr mais carros na rua.',
      },
      {
        title: 'Elasticidade',
        text: '**Elasticidade** é crescer **e** diminuir sozinho, acompanhando a procura. Quando o acesso sobe, o sistema liga mais máquinas. Quando o acesso cai, desliga as que sobram. Assim você não paga por máquinas paradas.',
      },
      {
        title: 'O que é serverless?',
        text: 'No **serverless**, você só escreve o código de uma função. O provedor roda essa função quando algo acontece, como um arquivo enviado. Atenção: serverless não quer dizer que não há servidores. Quer dizer que você não cuida deles. Ele cresce sozinho e pode até descer a zero.',
      },
      {
        title: 'Ficar no ar mesmo com falhas',
        text: '**Alta disponibilidade** é manter o serviço funcionando mesmo quando algo quebra. O segredo é evitar o **ponto único de falha**, uma peça que, se parar, derruba tudo. Para isso se usam servidores repetidos e cópias do banco de dados. Exemplo: 99,9% de disponibilidade permite cerca de 8 horas e 46 minutos fora do ar por ano.',
      },
      {
        title: 'RPO e RTO',
        text: 'Depois de um desastre, duas metas importam. O **RPO** diz quanta perda de dados é aceitável, medida em tempo: por exemplo, perder no máximo uma hora de dados. O **RTO** diz em quanto tempo o serviço precisa voltar. Dica: no RTO, o T lembra o tempo de volta.',
      },
      {
        title: 'Resumindo',
        text: 'Vertical é fortalecer uma máquina, e horizontal é acrescentar máquinas. Serverless tem servidores, mas você não cuida deles. RPO mede a perda de dados, e RTO mede o tempo de volta.',
      },
    ],
    words: [
      { term: 'Escala vertical', meaning: 'Dar mais força a uma mesma máquina.' },
      { term: 'Escala horizontal', meaning: 'Acrescentar mais máquinas e dividir o trabalho.' },
      { term: 'Elasticidade', meaning: 'Crescer e diminuir sozinho conforme a procura.' },
      { term: 'Serverless', meaning: 'O provedor roda seu código; você não cuida dos servidores.' },
      { term: 'Alta disponibilidade', meaning: 'Manter o serviço funcionando mesmo com falhas.' },
      { term: 'Ponto único de falha', meaning: 'Peça que, se parar, derruba o sistema inteiro.' },
      { term: 'RPO', meaning: 'Quanta perda de dados é aceitável, medida em tempo.' },
      { term: 'RTO', meaning: 'Em quanto tempo o serviço precisa voltar.' },
    ],
    checks: [
      { statement: 'Escala vertical é acrescentar mais máquinas.', answer: false, why: 'Acrescentar máquinas é escala horizontal.' },
      { statement: 'Serverless significa que não existem servidores.', answer: false, why: 'Os servidores existem, mas você não cuida deles.' },
      { statement: 'O RTO é o tempo para o serviço voltar.', answer: true, why: 'O RPO mede a perda de dados; o RTO, o tempo de volta.' },
    ],
  },

  // ------------------------------------------------------------------
  // Infraestrutura: sistemas operacionais
  // ------------------------------------------------------------------
  'cap.infra.03:processos': {
    pages: [
      {
        title: 'O que faz o sistema operacional?',
        text: 'O **sistema operacional** é o programa que administra o computador, como o Windows ou o Linux. Ele decide quem usa o processador, quanta memória cada programa recebe e quem pode abrir cada arquivo. É como o síndico de um prédio, que organiza o uso das áreas comuns.',
      },
      {
        title: 'Programa, processo e thread',
        text: 'O **programa** é o arquivo guardado no disco, parado, como uma receita no livro. O **processo** é o programa rodando, como o bolo sendo feito. Cada processo tem um número, o **PID**. A **thread** é uma linha de trabalho dentro do processo. As threads do mesmo processo dividem a mesma memória.',
      },
      {
        title: 'Os estados de um processo',
        text: 'Um processo muda de estado. **Pronto**: espera só a vez de usar o processador. **Executando**: está usando agora. **Bloqueado**: espera algo, como a leitura do disco. Quem escolhe o próximo a rodar é o **escalonador**. Ele é como o atendente que chama a próxima senha.',
      },
      {
        title: 'Encerrar um processo no Linux',
        text: 'O comando `ps aux` lista os processos, e o `top` mostra o uso em tempo real. O `kill PID` pede que o processo termine, enviando o sinal **SIGTERM**, de número 15. Assim ele pode salvar o que estava fazendo. Se ele não responder, `kill -9 PID` envia o **SIGKILL**, que encerra à força.',
      },
      {
        title: 'Memória virtual',
        text: 'Com a **memória virtual**, cada processo enxerga um espaço de memória só seu. O sistema divide a memória em blocos, chamados **páginas**. Quando falta memória, ele guarda páginas no disco, na área de **swap**. Se passa mais tempo trocando páginas do que trabalhando, acontece o **thrashing**, e tudo fica lento.',
      },
      {
        title: 'Serviços do sistema',
        text: '**Serviços** são programas que rodam em segundo plano, como um servidor web. No Linux, o `systemctl start` liga o serviço agora. O `systemctl enable` faz o serviço ligar sozinho quando o computador for iniciado. Um não faz o outro. Com start, o serviço liga hoje, mas pode não voltar depois de reiniciar.',
      },
      {
        title: 'Resumindo',
        text: 'Processo é um programa rodando, e as threads dele dividem a memória. O kill sem opção envia SIGTERM; o kill -9 força. O start liga agora, e o enable liga na inicialização.',
      },
    ],
    words: [
      { term: 'Sistema operacional', meaning: 'Programa que administra o computador, como Windows ou Linux.' },
      { term: 'Processo', meaning: 'Um programa em execução.' },
      { term: 'PID', meaning: 'Número que identifica cada processo.' },
      { term: 'Thread', meaning: 'Linha de trabalho dentro de um processo.' },
      { term: 'Escalonador', meaning: 'Parte do sistema que escolhe quem usa o processador.' },
      { term: 'SIGTERM', meaning: 'Sinal que pede ao processo para terminar; é o padrão do kill.' },
      { term: 'Swap', meaning: 'Área do disco que recebe páginas tiradas da memória.' },
      { term: 'Serviço', meaning: 'Programa que roda em segundo plano, sem janela.' },
    ],
    checks: [
      { statement: 'O comando kill PID, sem opções, envia o SIGKILL.', answer: false, why: 'O padrão é o SIGTERM, de número 15.' },
      { statement: 'As threads de um mesmo processo dividem a memória dele.', answer: true, why: 'Por isso a troca de dados entre elas é rápida.' },
      { statement: 'O systemctl enable liga o serviço imediatamente.', answer: false, why: 'Ele faz o serviço ligar na inicialização; para ligar agora, usa-se start.' },
    ],
  },

  'cap.infra.03:arquivos': {
    pages: [
      {
        title: 'Para que serve um sistema de arquivos?',
        text: 'Um disco guarda uma quantidade enorme de informação. O **sistema de arquivos** organiza tudo em arquivos e pastas, como um arquivo de aço com gavetas. Ele também anota quem é o dono de cada arquivo e quem pode ler ou alterar. No Tribunal, isso protege os papéis de trabalho de uma auditoria.',
      },
      {
        title: 'Os tipos mais comuns',
        text: 'O **NTFS** é o padrão do Windows e tem permissões por usuário. O **FAT32** aparece em pen drives, não tem permissões e limita cada arquivo a 4 GB. O **ext4** é o padrão em muitas versões do Linux. Vários usam **journaling**: anotam as mudanças num diário antes de fazê-las, para se recuperar de um desligamento brusco.',
      },
      {
        title: 'As pastas do Linux',
        text: 'No Linux, tudo parte de uma raiz única, escrita `/`. Não existe letra como `C:`. A pasta `/etc` guarda as configurações. A `/home` guarda as pastas pessoais dos usuários. A `/var/log` guarda os **logs**, que são os registros do que aconteceu no sistema. A `/tmp` guarda arquivos temporários.',
      },
      {
        title: 'Ler, gravar e executar',
        text: 'No Linux, cada arquivo tem três permissões: **r** para ler, **w** para gravar e **x** para executar. Elas valem para três públicos: o **dono**, o **grupo** e os **outros**. Exemplo: `rwxr-x---` quer dizer que o dono faz tudo, o grupo lê e executa, e os outros não acessam.',
      },
      {
        title: 'As permissões em números',
        text: 'Cada letra tem um valor: r vale 4, w vale 2 e x vale 1. Some os valores de cada público. Assim, rwx dá 7, r-x dá 5 e nada dá 0. Por isso `rwxr-x---` vira **750**. O comando `chmod 750 arquivo` aplica essas permissões. Já 640 deixa o dono ler e gravar, e o grupo só ler.',
      },
      {
        title: 'Permissões no Windows',
        text: 'No Windows, o NTFS usa **listas de controle de acesso**, as **ACL**: cada arquivo tem uma lista de quem pode fazer o quê. Por padrão, uma pasta passa suas permissões às de dentro, a **herança**. No acesso pela rede, valem as permissões do compartilhamento e as do NTFS. Vence a mais restritiva.',
      },
      {
        title: 'Resumindo',
        text: 'No Linux, r vale 4, w vale 2 e x vale 1, para dono, grupo e outros. FAT32 não tem permissões. No Windows, entre compartilhamento e NTFS, vence a permissão mais restritiva.',
      },
    ],
    words: [
      { term: 'Sistema de arquivos', meaning: 'Forma de organizar arquivos e pastas no disco.' },
      { term: 'NTFS', meaning: 'Sistema de arquivos padrão do Windows, com permissões.' },
      { term: 'Journaling', meaning: 'Anotar as mudanças num diário antes de fazê-las.' },
      { term: 'Log', meaning: 'Registro do que aconteceu no sistema.' },
      { term: 'Permissão', meaning: 'Regra que diz quem pode ler, gravar ou executar.' },
      { term: 'chmod', meaning: 'Comando do Linux que muda as permissões de um arquivo.' },
      { term: 'ACL', meaning: 'Lista de quem pode fazer o quê num arquivo ou pasta.' },
    ],
    checks: [
      { statement: 'A permissão 640 deixa o grupo gravar no arquivo.', answer: false, why: 'O 4 do grupo é só leitura.' },
      { statement: 'O FAT32 tem permissões por usuário, como o NTFS.', answer: false, why: 'O FAT32 não tem permissões.' },
      { statement: 'No Linux, tudo parte da raiz /.', answer: true, why: 'Não há letras de disco; tudo fica abaixo de /.' },
    ],
  },

  'cap.infra.03:shell': {
    pages: [
      {
        title: 'Para que serve o terminal?',
        text: 'O **terminal** é uma janela onde você dá ordens ao computador escrevendo, em vez de clicar. O programa que lê essas ordens se chama **shell**. No Linux, o mais comum é o **bash**. No Windows, existe o **PowerShell**. Com eles, um técnico faz em segundos o que levaria horas com o mouse.',
      },
      {
        title: 'Comandos básicos do Linux',
        text: '`pwd` mostra em que pasta você está. `cd` muda de pasta. `ls` lista os arquivos. `cp` copia, `mv` move ou renomeia e `rm` apaga. `mkdir` cria uma pasta. Atenção a uma dupla: o `grep` procura um texto **dentro** dos arquivos. O `find` procura **os arquivos** pelo nome, data ou tamanho.',
      },
      {
        title: 'Encadear e guardar',
        text: 'O **pipe**, escrito `|`, liga dois comandos: a saída do primeiro vira a entrada do segundo, como numa linha de montagem. O sinal `>` grava a saída num arquivo, apagando o que havia. O sinal `>>` acrescenta no final, sem apagar. Exemplo: `grep ERRO app.log > erros.txt` guarda as linhas com erro.',
      },
      {
        title: 'Scripts e agendamento',
        text: 'Um **script** é um arquivo com uma lista de comandos, como uma receita para o computador seguir. A primeira linha, `#!/bin/bash`, diz qual programa vai ler o script. O código de saída `$?` igual a 0 indica sucesso. O **cron** roda scripts em horários marcados, como um backup toda noite.',
      },
      {
        title: 'PowerShell trabalha com objetos',
        text: 'Os comandos do PowerShell se chamam **cmdlets** e seguem o formato Verbo-Substantivo, como `Get-Process`, que lista processos. A grande diferença: no bash, o pipe passa **texto**. No PowerShell, o pipe passa **objetos**, itens com propriedades, como nome e uso de processador. Assim dá para filtrar por propriedade.',
      },
      {
        title: 'Quando um script pode rodar?',
        text: 'No Windows, a **política de execução** define se scripts do PowerShell, com extensão .ps1, podem rodar. Na política **Restricted**, nenhum script roda. Na **RemoteSigned**, scripts feitos na máquina rodam, mas os baixados da internet precisam de assinatura. Qual política vem ligada depende do ambiente; confira na documentação da Microsoft.',
      },
      {
        title: 'Resumindo',
        text: 'O grep procura texto dentro dos arquivos, e o find procura os arquivos. O > sobrescreve, e o >> acrescenta. No PowerShell, o pipe passa objetos, e não texto.',
      },
    ],
    words: [
      { term: 'Terminal', meaning: 'Janela onde você dá ordens ao computador escrevendo.' },
      { term: 'Shell', meaning: 'Programa que lê e executa os comandos do terminal.' },
      { term: 'Pipe', meaning: 'Símbolo | que passa a saída de um comando ao próximo.' },
      { term: 'Script', meaning: 'Arquivo com uma lista de comandos para rodar em sequência.' },
      { term: 'cron', meaning: 'Agenda do Linux que roda tarefas em horários marcados.' },
      { term: 'Cmdlet', meaning: 'Comando do PowerShell no formato Verbo-Substantivo.' },
      { term: 'Política de execução', meaning: 'Regra do Windows que decide se scripts podem rodar.' },
    ],
    checks: [
      { statement: 'No PowerShell, o pipe passa texto, como no bash.', answer: false, why: 'No PowerShell, o pipe passa objetos.' },
      { statement: 'O >> acrescenta no final do arquivo.', answer: true, why: 'O >> acrescenta; o > apaga e grava de novo.' },
      { statement: 'O find procura um texto dentro dos arquivos.', answer: false, why: 'Quem procura texto dentro é o grep; o find procura os arquivos.' },
    ],
  },

  'cap.infra.03:diretorio': {
    pages: [
      {
        title: 'Para que serve um diretório?',
        text: 'Um órgão tem centenas de pessoas e computadores. Um **serviço de diretório** é um grande cadastro. Ele guarda os usuários, suas senhas e seus grupos. É como a lista telefônica da empresa, mas com chaves de acesso. O mais conhecido é o **Active Directory**, ou **AD**, da Microsoft.',
      },
      {
        title: 'Domínio, árvore e floresta',
        text: 'O **domínio** é uma unidade de administração com nome, como tribunal.local. O **controlador de domínio** é o servidor que guarda o cadastro e confere os logins. Domínios com nomes encadeados formam uma **árvore**. Uma ou mais árvores formam uma **floresta**, que é o limite de segurança do AD.',
      },
      {
        title: 'OU, grupo e GPO',
        text: 'A **OU**, unidade organizacional, é uma pasta para organizar contas, por exemplo por setor. Ela recebe as **GPOs**, que são pacotes de regras, como exigir senha forte. O **grupo** reúne contas para receber permissões, como abrir uma pasta. Pegadinha: permissão em pasta vai para grupos e usuários, não para uma OU.',
      },
      {
        title: 'Kerberos, o bilhete de entrada',
        text: 'No AD, o login usa o **Kerberos**. Ao entrar, você recebe um **TGT**, um bilhete geral, como a pulseira de um evento. Para usar um serviço, você troca a pulseira por um ingresso daquele serviço. Assim, a senha não viaja pela rede. Como os bilhetes vencem, os relógios das máquinas precisam estar acertados.',
      },
      {
        title: 'LDAP, o jeito de consultar',
        text: 'O **LDAP** é o protocolo padrão para consultar e alterar diretórios, inclusive o AD. Muitos sistemas usam LDAP para conferir o login dos usuários. Ele usa a porta 389. A versão protegida, o **LDAPS**, usa a porta 636. Sem proteção, a senha pode viajar em texto aberto pela rede.',
      },
      {
        title: 'Máquina virtual ou container?',
        text: 'A **virtualização** faz uma máquina física rodar várias máquinas virtuais, as VMs. Quem as controla é o **hipervisor**. O tipo 1 roda direto na máquina física. O tipo 2, como o VirtualBox, roda dentro de outro sistema. O **container** é mais leve: isola programas, mas divide o **núcleo**, a parte central do sistema principal.',
      },
      {
        title: 'Resumindo',
        text: 'O AD é o cadastro de usuários e computadores, e a floresta é seu limite de segurança. A OU recebe GPO, e o grupo recebe permissões. LDAP usa a porta 389, e LDAPS usa a 636.',
      },
    ],
    words: [
      { term: 'Serviço de diretório', meaning: 'Cadastro central de usuários, grupos e computadores.' },
      { term: 'Active Directory', meaning: 'Serviço de diretório da Microsoft, chamado AD.' },
      { term: 'Floresta', meaning: 'Conjunto de árvores de domínios; o limite de segurança do AD.' },
      { term: 'OU', meaning: 'Pasta do AD para organizar contas e aplicar regras.' },
      { term: 'GPO', meaning: 'Pacote de regras aplicado a usuários e computadores.' },
      { term: 'Kerberos', meaning: 'Login por bilhetes, sem mandar a senha pela rede.' },
      { term: 'LDAP', meaning: 'Protocolo para consultar e alterar diretórios.' },
      { term: 'Hipervisor', meaning: 'Programa que cria e controla as máquinas virtuais.' },
    ],
    checks: [
      { statement: 'Você pode dar permissão de pasta diretamente a uma OU.', answer: false, why: 'Permissões vão para usuários e grupos; a OU organiza e recebe GPO.' },
      { statement: 'O LDAPS usa a porta 636.', answer: true, why: 'O LDAP usa a 389, e o LDAPS, a 636.' },
      { statement: 'O VirtualBox é um hipervisor tipo 1.', answer: false, why: 'Ele roda dentro de outro sistema, então é tipo 2.' },
    ],
  },
};
