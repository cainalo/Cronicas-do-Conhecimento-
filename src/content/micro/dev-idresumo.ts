// Série "Quadro-resumo de APIs e identidade" (cap.dev.02, trecho resumo), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula monta a linha do tempo dos dois capítulos (APIs e identidade);
// a segunda percorre o quadro-resumo e as pegadinhas, uma ideia por etapa. Conteúdo conferido com os
// textos dos capítulos (cap01-apis e cap02-identidade, 04-resumo.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.02', sectionId: 'resumo' } as const;

export const devIdrLinha: MicroLesson = {
  ...S,
  id: 'dev.idresumo.1',
  series: { id: 'dev.idresumo', order: 1 },
  title: 'A linha do tempo de APIs e identidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Antes da revisão final, uma pergunta de ordem: o que veio primeiro, o OAuth 2.0 ou o OpenID Connect?',
    options: [
      { text: 'O OAuth 2.0 (2012), depois o OpenID Connect (2014)', why: 'Isso. O OIDC foi construído sobre o OAuth 2.0. Esta aula monta a linha inteira.' },
      { text: 'O OpenID Connect veio antes', why: 'O OIDC é de 2014, construído sobre o OAuth 2.0, de 2012.' },
      { text: 'Vieram no mesmo ano', why: 'Há dois anos entre eles.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'apis',
      part: 'Linha do tempo',
      title: 'As APIs: de 1991 a 2016',
      art: 'trilha',
      goal: 'Relembrar os marcos das APIs web.',
      explain:
        'Os marcos do capítulo de APIs:\n\n- **1991**: Tim Berners-Lee cria o **HTTP**;\n- **1998**: o W3C publica o **XML 1.0**;\n- **2000**: Roy Fielding descreve o **REST** na sua tese;\n- **2001**: o **WSDL** descreve serviços SOAP;\n- **2011**: o **WebSocket** (RFC 6455);\n- **2015**: o Facebook publica o **GraphQL**;\n- **2016**: o Swagger é renomeado **OpenAPI**.',
      check: {
        kind: 'order',
        id: 'ap-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['HTTP (1991)', 'Tese de Fielding sobre o REST (2000)', 'WebSocket (2011)', 'Nome OpenAPI (2016)'],
        why: 'Do protocolo da web à documentação padronizada.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Leia a linha como uma **casa sendo construída**: primeiro a **rua** (HTTP, 1991), depois o **jeito de usar a rua** (REST, 2000), depois uma **linha telefônica direta** (WebSocket, 2011) e, por fim, a **placa com o mapa** da casa (OpenAPI, 2016).',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'Quem descreveu o REST, em 2000?',
          options: [
            { text: 'Roy Fielding', why: 'Isso, na sua tese de doutorado.' },
            { text: 'Tim Berners-Lee', why: 'Ele criou o HTTP e a Web.' },
            { text: 'Douglas Crockford', why: 'Crockford popularizou o JSON.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'identidade',
      part: 'Linha do tempo',
      title: 'A identidade: de 1961 a 2015',
      art: 'cadeado',
      goal: 'Relembrar os marcos da identidade digital.',
      explain:
        'Os marcos do capítulo de identidade:\n\n- **anos 1960**: senhas no **CTSS**, no MIT;\n- **2002**: o OASIS publica o **SAML**;\n- **2005**: o **OpenID**, de Brad Fitzpatrick;\n- **2007**: o **OAuth 1.0**;\n- **2012**: o **OAuth 2.0** (RFC 6749);\n- **2014**: o **OpenID Connect 1.0**;\n- **2015**: o **JWT** (RFC 7519) e o **PKCE** (RFC 7636).',
      check: {
        kind: 'order',
        id: 'id-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['SAML (2002)', 'OAuth 1.0 (2007)', 'OAuth 2.0 (2012)', 'OpenID Connect 1.0 (2014)'],
        why: 'Do login único corporativo à identidade sobre o OAuth 2.0.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma dica: **2015** fecha a linha com dois padrões de uma vez, o **JWT** (o formato do token) e o **PKCE** (a proteção do celular). Antes deles, em 2014, veio o **OIDC**, que usa o JWT no ID Token.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'Quais padrões viraram RFC em 2015?',
          options: [
            { text: 'JWT e PKCE', why: 'Isso: RFC 7519 e RFC 7636.' },
            { text: 'OAuth 2.0 e bearer', why: 'Esses são de 2012.' },
            { text: 'SAML e WSDL', why: 'São do início dos anos 2000.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'juntando',
      part: 'Tudo junto',
      title: 'Um login moderno, peça por peça',
      art: 'engrenagem',
      goal: 'Ver como as peças dos dois capítulos se encaixam num login real.',
      explain:
        'Quando um aplicativo de celular usa "Entrar com o gov.br" e depois chama uma API:\n\n1. faz o fluxo de **código de autorização com PKCE**, pedindo o escopo **`openid`**;\n2. recebe um **ID Token** (JWT) e sabe **quem entrou**;\n3. recebe um **token de acesso** e o envia em **`Authorization: Bearer`**;\n4. a API **REST** responde em **JSON**, com **200**, **401** ou **403**.\n\nUm só login usa quase tudo o que você estudou.',
      check: {
        kind: 'choice',
        id: 'ju-c',
        prompt: 'Nesse login, o que diz ao aplicativo quem entrou?',
        options: [
          { text: 'O ID Token', why: 'Isso.' },
          { text: 'O token de acesso', why: 'Esse vai para a API, para autorizar.' },
          { text: 'O código 200', why: 'O 200 só diz que a requisição deu certo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Separe pelo **destino**: o que fica com o **aplicativo** para saber quem é a pessoa é o **ID Token**; o que vai para a **API** para abrir a porta é o **token de acesso**; o que a API devolve é o **JSON** com um código de status.',
        check: {
          kind: 'choice',
          id: 'ju-r',
          prompt: 'Se o token de acesso for válido, mas o usuário não tiver permissão, a API responde:',
          options: [
            { text: '403', why: 'Isso: autenticado, sem permissão.' },
            { text: '401', why: '401 é falta de autenticação válida.' },
            { text: '201', why: '201 indica recurso criado.' },
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
      prompt: 'Cada marco é do capítulo de APIs ou do de identidade?',
      categories: ['APIs', 'Identidade'],
      items: [
        { text: 'WebSocket (2011)', cat: 0, why: 'Canal de comunicação.' },
        { text: 'OpenAPI (2016)', cat: 0, why: 'Documentação de APIs.' },
        { text: 'OAuth 2.0 (2012)', cat: 1, why: 'Autorização delegada.' },
        { text: 'OpenID Connect (2014)', cat: 1, why: 'Camada de identidade.' },
      ],
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene os passos do login moderno.',
      items: ['Código de autorização com PKCE e escopo openid', 'Receber ID Token e token de acesso', 'Chamar a API com Authorization: Bearer', 'Receber JSON com o código de status'],
      why: 'Login, tokens, chamada e resposta.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['2012: OAuth 2.0', '2014: OpenID Connect 1.0', '2014: OAuth 1.0'],
      bug: 2,
      why: 'O OAuth 1.0 é de 2007, bem antes do OAuth 2.0.',
      fixed: '2007: OAuth 1.0',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'APIs: HTTP (1991), XML (1998), REST (2000), WSDL (2001), WebSocket (2011), GraphQL público (2015), OpenAPI (2016).',
    'Identidade: CTSS (anos 1960), SAML (2002), OpenID (2005), OAuth 1.0 (2007), OAuth 2.0 (2012), OIDC (2014), JWT e PKCE (2015).',
    'Login moderno: código com PKCE e openid, ID Token para o cliente, token de acesso para a API REST.',
  ],
};

export const devIdrQuadro: MicroLesson = {
  ...S,
  id: 'dev.idresumo.2',
  series: { id: 'dev.idresumo', order: 2 },
  title: 'Quadro-resumo e pegadinhas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Na prova, a questão diz: "sistema chama sistema, sem usuário". Em que você já pensa?',
    options: [
      { text: 'Client credentials, do OAuth 2.0', why: 'Isso. Esta aula treina esse reflexo com o quadro-resumo.' },
      { text: 'Código de autorização com PKCE', why: 'Esse pressupõe um usuário consentindo.' },
      { text: 'WebSocket', why: 'O WebSocket é um canal, não um fluxo de autorização.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'q-apis',
      part: 'Quadro-resumo',
      title: 'Se a questão fala de APIs',
      art: 'rede',
      goal: 'Associar descrições de APIs ao conceito certo.',
      explain:
        'Reflexos rápidos:\n\n- requisição traz todo o contexto, servidor não guarda sessão: **REST sem estado**;\n- repetir a chamada não muda o resultado final: **idempotência** (GET, PUT, DELETE);\n- recurso criado: **201**; sem credencial válida: **401**; credencial válida sem permissão: **403**;\n- um endpoint, o cliente escolhe os campos: **GraphQL**;\n- canal persistente, `Upgrade`, **101**: **WebSocket**;\n- descrever a API em YAML ou JSON: **OpenAPI**.',
      check: {
        kind: 'sort',
        id: 'qa-c',
        prompt: 'Ligue a descrição ao conceito.',
        categories: ['Idempotência', 'GraphQL', 'WebSocket'],
        items: [
          { text: 'Repetir a chamada não muda o resultado', cat: 0, why: 'GET, PUT e DELETE.' },
          { text: 'Um endpoint, o cliente escolhe os campos', cat: 1, why: 'Consulta sob medida.' },
          { text: 'Upgrade e 101 Switching Protocols', cat: 2, why: 'Abre o canal persistente.' },
        ],
      },
      recovery: {
        explain: 'Procure a **palavra-chave** na questão: "**repetir**" puxa idempotência; "**escolhe os campos**" puxa GraphQL; "**Upgrade**" ou "**101**" puxa WebSocket; "**YAML**" ou "**Swagger UI**" puxa OpenAPI.',
        check: {
          kind: 'choice',
          id: 'qa-r',
          prompt: 'Credencial válida, mas sem permissão para o recurso, gera:',
          options: [
            { text: '403', why: 'Isso.' },
            { text: '401', why: '401 é falta de autenticação válida.' },
            { text: '201', why: '201 é recurso criado.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'q-id',
      part: 'Quadro-resumo',
      title: 'Se a questão fala de identidade',
      art: 'pessoal',
      goal: 'Associar descrições de identidade ao padrão ou fluxo certo.',
      explain:
        'Mais reflexos:\n\n- acessar recurso do usuário **sem a senha dele**: **OAuth 2.0** (autorização delegada);\n- **sistema chama sistema**, sem usuário: ***client credentials***;\n- aplicativo de **celular ou SPA**: **código de autorização com PKCE**;\n- saber **quem é o usuário**, ID Token, escopo `openid`: **OpenID Connect**;\n- **cabeçalho.carga.assinatura** em Base64URL: **JWT**.',
      check: {
        kind: 'choice',
        id: 'qi-c',
        prompt: 'Um aplicativo de página única (SPA) com login do usuário deve usar:',
        options: [
          { text: 'Código de autorização com PKCE', why: 'Isso.' },
          { text: 'Client credentials', why: 'Esse é para sistemas sem usuário.' },
          { text: 'Fluxo implícito', why: 'Desaconselhado.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Três perguntas resolvem quase tudo: **tem usuário?** (sem usuário: client credentials); **é celular ou SPA?** (código com PKCE); **quer saber quem é?** (OpenID Connect por cima).',
        check: {
          kind: 'choice',
          id: 'qi-r',
          prompt: 'O escopo openid e o ID Token indicam:',
          options: [
            { text: 'OpenID Connect', why: 'Isso.' },
            { text: 'OAuth 1.0', why: 'O OAuth 1.0 não tinha ID Token.' },
            { text: 'OpenAPI', why: 'OpenAPI descreve APIs.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pegadinhas',
      part: 'Pegadinhas',
      title: 'As afirmações falsas mais comuns',
      art: 'vazio',
      goal: 'Reconhecer as pegadinhas dos dois capítulos.',
      explain:
        'Todas estas são **falsas**:\n\n- "OAuth 2.0 é protocolo de autenticação";\n- "o conteúdo de um JWT assinado é sigiloso";\n- "POST é idempotente";\n- "401 indica usuário autenticado sem permissão";\n- "todo XML bem formado é válido";\n- "o fluxo implícito é o recomendado para SPA";\n- "HS256 usa par de chaves";\n- "o token de atualização vai em toda chamada à API".',
      check: {
        kind: 'multi',
        id: 'pg-c',
        prompt: 'Quais afirmações são verdadeiras? Marque todas.',
        options: [
          { text: 'OAuth 2.0 é de autorização', correct: true, why: 'Isso.' },
          { text: 'A carga de um JWT assinado é legível', correct: true, why: 'Isso: Base64URL é codificação.' },
          { text: 'POST é idempotente', correct: false, why: 'Repetir um POST pode criar dois registros.' },
          { text: 'HS256 usa par de chaves', correct: false, why: 'HS256 usa segredo compartilhado.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Cada pegadinha troca **duas ideias vizinhas**: autorização por autenticação, codificar por cifrar, POST por PUT, 401 por 403, bem formado por válido, segredo compartilhado por par de chaves. Na dúvida, pergunte: "qual é a vizinha que estão trocando?".',
        check: {
          kind: 'choice',
          id: 'pg-r',
          prompt: 'Todo XML bem formado é válido?',
          options: [
            { text: 'Não: válido é o que obedece a um esquema', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'Pegadinha: bem formado é só a sintaxe.' },
            { text: 'Só se for curto', why: 'O tamanho não importa; importa o esquema.' },
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
      prompt: 'Verdadeiro ou falso?',
      categories: ['Verdadeiro', 'Falso'],
      items: [
        { text: 'GraphQL usa um endpoint único', cat: 0, why: 'O cliente escolhe os campos nele.' },
        { text: 'O token de atualização só vai ao servidor de autorização', cat: 0, why: 'Nunca à API.' },
        { text: 'Em JSON, comentários com // são permitidos', cat: 1, why: 'O JSON não aceita comentários.' },
        { text: 'GraphQL exige um endpoint por recurso', cat: 1, why: 'Usa um endpoint único.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Um robô de madrugada copia dados de um sistema para outro, sem pessoa envolvida. Qual desenho de acesso?',
      scenarios: [
        { title: 'Opção A', body: 'OAuth 2.0 com ***client credentials***.' },
        { title: 'Opção B', body: 'Guardar no robô a senha pessoal de um servidor público.' },
      ],
      answer: 0,
      why: 'Sistema chama sistema, em nome próprio: client credentials. Usar senha pessoal fere o menor privilégio e a rastreabilidade.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['201: recurso criado', '401: falta autenticação válida', '403: falta autenticação válida'],
      bug: 2,
      why: '403 é credencial válida sem permissão.',
      fixed: '403: autenticado, sem permissão',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'APIs: REST sem estado; idempotência (GET, PUT, DELETE); 201, 401, 403; GraphQL (um endpoint); WebSocket (Upgrade, 101); OpenAPI.',
    'Identidade: OAuth 2.0 (autorização delegada); client credentials (sem usuário); código com PKCE (celular e SPA); OIDC (quem é); JWT.',
    'Pegadinhas trocam ideias vizinhas: autorização e autenticação, codificar e cifrar, POST e PUT, 401 e 403, bem formado e válido, HS256 e RS256.',
  ],
};
