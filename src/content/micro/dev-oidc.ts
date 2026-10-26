// Série "OpenID Connect e JWT" (cap.dev.02, trecho oidc-jwt), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do OpenID de 2005 ao JWT de 2015; as seguintes ensinam o OIDC,
// depois a estrutura e os algoritmos do JWT, depois a validação, a revogação e o armazenamento, uma
// ideia por etapa. Fatos conferidos com o texto do capítulo (03-oidc-jwt.md). Revisão editorial
// humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.02', sectionId: 'oidc-jwt' } as const;

export const devOidHistoria: MicroLesson = {
  ...S,
  id: 'dev.oidc.1',
  series: { id: 'dev.oidc', order: 1 },
  title: 'Do OpenID ao JWT',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num site novo, aparece o botão "Entrar com a conta de outro serviço". Quem confere a sua senha nesse caso?',
    options: [
      { text: 'O outro serviço, que depois diz ao site quem você é', why: 'Isso. Esta aula conta como essa ideia foi padronizada.' },
      { text: 'O site novo, que recebe a sua senha', why: 'A senha fica só no serviço onde você tem conta.' },
      { text: 'Ninguém confere', why: 'Confere, sim: o serviço onde você tem conta.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'openid',
      part: 'A história',
      title: '2005: o OpenID',
      art: 'pessoal',
      goal: 'Saber que o OpenID nasceu para usar uma identidade em vários sites.',
      explain:
        'Em **2005**, **Brad Fitzpatrick**, criador do site de blogs **LiveJournal**, propôs o **OpenID**: usar **uma identidade só** para entrar em **vários sites**, sem criar senha nova em cada um.\n\nO site confiava num **provedor** que confirmava quem era o usuário.\n\nA ideia era boa, mas o OpenID original **não conversava com o OAuth**, que surgia na mesma época para outra tarefa: dar acesso a recursos.',
      check: {
        kind: 'choice',
        id: 'op-c',
        prompt: 'Para que o OpenID foi proposto?',
        options: [
          { text: 'Usar uma identidade só para entrar em vários sites', why: 'Isso.' },
          { text: 'Dar acesso a recursos com tokens de escopo', why: 'Essa é a tarefa do OAuth.' },
          { text: 'Descrever APIs em YAML', why: 'Isso é o OpenAPI.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Em vez de uma **carteirinha para cada clube**, uma **carteira de identidade** que todos os clubes aceitam. Foi essa a proposta de Brad Fitzpatrick com o OpenID em 2005.',
        check: {
          kind: 'choice',
          id: 'op-r',
          prompt: 'Quem propôs o OpenID?',
          options: [
            { text: 'Brad Fitzpatrick, do LiveJournal', why: 'Isso.' },
            { text: 'Blaine Cook, do Twitter', why: 'Blaine Cook está na origem do OAuth.' },
            { text: 'Tony Tam, da Wordnik', why: 'Tony Tam criou o Swagger.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'oidc',
      part: 'A história',
      title: '2014: o OpenID Connect',
      art: 'rede',
      goal: 'Saber que o OpenID Connect 1.0 juntou identidade e OAuth 2.0.',
      explain:
        'Com o **OAuth 2.0** já espalhado (2012), faltava um jeito padronizado de saber **quem** era o usuário.\n\nEm **2014**, a **OpenID Foundation** publicou o **OpenID Connect 1.0**: uma **camada de identidade construída sobre o OAuth 2.0**, reaproveitando os mesmos fluxos.\n\nAssim, um único login passou a servir para **autorizar** o acesso e para **identificar** o usuário.',
      check: {
        kind: 'choice',
        id: 'oc-c',
        prompt: 'O OpenID Connect 1.0 foi construído sobre:',
        options: [
          { text: 'O OAuth 2.0', why: 'Isso: é uma camada de identidade sobre ele.' },
          { text: 'O SAML', why: 'O SAML é outro padrão, em XML.' },
          { text: 'O WebSocket', why: 'O WebSocket é um canal de comunicação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O OAuth 2.0 é a **estrada** já construída. O OpenID Connect é o **posto de identificação** colocado nessa estrada: aproveita o mesmo caminho e acrescenta o que faltava, dizer **quem** está passando.',
        check: {
          kind: 'choice',
          id: 'oc-r',
          prompt: 'Quem publicou o OpenID Connect 1.0, em 2014?',
          options: [
            { text: 'A OpenID Foundation', why: 'Isso.' },
            { text: 'O consórcio OASIS', why: 'O OASIS publicou o SAML.' },
            { text: 'A OpenAPI Initiative', why: 'Essa cuida do OpenAPI.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'jwt',
      part: 'A história',
      title: '2015: o JWT vira RFC',
      art: 'cartao',
      goal: 'Saber que o JWT foi padronizado na RFC 7519.',
      explain:
        'O OpenID Connect precisava de um **formato** para o documento que diz quem se autenticou. Escolheu o **JWT**, um token compacto em JSON.\n\nEm **2015**, o JWT foi padronizado na **RFC 7519**, junto com outras RFCs da família, como a do **JWS** (assinatura) e a do **JWE** (cifragem).\n\nHoje o JWT aparece em muitos sistemas, mesmo fora do OpenID Connect.',
      check: {
        kind: 'order',
        id: 'jw-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['OpenID (2005)', 'OAuth 2.0 (2012)', 'OpenID Connect 1.0 (2014)', 'JWT, RFC 7519 (2015)'],
        why: 'A identidade única, a autorização, a junção dos dois e o formato padronizado.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Guarde o par: **OIDC em 2014**, **JWT em 2015**, na **RFC 7519**. O OpenID Connect usa o JWT para o seu ID Token; o JWT, padronizado, passou a ser usado também em outros lugares.',
        check: {
          kind: 'choice',
          id: 'jw-r',
          prompt: 'Qual RFC padronizou o JWT?',
          options: [
            { text: 'RFC 7519', why: 'Isso.' },
            { text: 'RFC 6749', why: 'Essa é o OAuth 2.0.' },
            { text: 'RFC 7636', why: 'Essa é o PKCE.' },
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
      prompt: 'Ordene a história da identidade na web.',
      items: ['OpenID de Brad Fitzpatrick (2005)', 'OAuth 2.0 (2012)', 'OpenID Connect 1.0 (2014)', 'JWT na RFC 7519 (2015)'],
      why: 'Da identidade única ao formato de token padronizado.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada padrão serve principalmente para quê?',
      categories: ['Autorização', 'Identidade', 'Formato de token'],
      items: [
        { text: 'OAuth 2.0', cat: 0, why: 'Autorização delegada.' },
        { text: 'OpenID Connect', cat: 1, why: 'Diz quem se autenticou.' },
        { text: 'JWT', cat: 2, why: 'Formato compacto de claims.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['OIDC: camada de identidade', 'OIDC: construído sobre o OAuth 2.0', 'OIDC: substitui o OAuth 2.0'],
      bug: 2,
      why: 'O OIDC não substitui o OAuth: reaproveita seus fluxos e acrescenta a identidade.',
      fixed: 'OIDC: reaproveita os fluxos do OAuth 2.0',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '2005: OpenID, de Brad Fitzpatrick (LiveJournal): uma identidade para vários sites.',
    '2014: OpenID Connect 1.0, da OpenID Foundation: camada de identidade sobre o OAuth 2.0.',
    '2015: JWT padronizado na RFC 7519, com a família JWS e JWE.',
  ],
};

export const devOidConnect: MicroLesson = {
  ...S,
  id: 'dev.oidc.2',
  series: { id: 'dev.oidc', order: 2 },
  title: 'O que o OpenID Connect acrescenta',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Com só o OAuth 2.0, o aplicativo recebe um token para a API. Ele fica sabendo, de forma padronizada, quem é o usuário?',
    options: [
      { text: 'Não: é isso que o OpenID Connect acrescenta', why: 'Isso. Esta aula mostra as peças que ele traz.' },
      { text: 'Sim, o token de acesso sempre diz', why: 'O OAuth não define o formato do token de acesso nem padroniza a identidade.' },
      { text: 'Sim, pela senha', why: 'O cliente nunca recebe a senha.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'pecas',
      part: 'As peças',
      title: 'Escopo openid, ID Token, UserInfo, descoberta',
      art: 'engrenagem',
      goal: 'Listar o que o OIDC acrescenta ao OAuth.',
      explain:
        'O **OpenID Connect** acrescenta quatro peças:\n\n- o escopo **`openid`**, que indica um **pedido de autenticação**;\n- o **ID Token**, sempre em **JWT**, com dados da autenticação;\n- o endpoint **UserInfo**, de onde se obtêm mais dados do usuário, com o token de acesso;\n- a **descoberta**, em `/.well-known/openid-configuration`, que publica os **endereços** e as **chaves públicas** do provedor.',
      check: {
        kind: 'multi',
        id: 'pe-c',
        prompt: 'O que o OpenID Connect acrescenta ao OAuth 2.0? Marque todas.',
        options: [
          { text: 'O ID Token', correct: true, why: 'Isso.' },
          { text: 'O escopo openid', correct: true, why: 'Isso.' },
          { text: 'O endpoint UserInfo', correct: true, why: 'Isso.' },
          { text: 'O fluxo implícito', correct: false, why: 'O implícito é um fluxo antigo do OAuth, hoje desaconselhado.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **guichê de identificação**: a **senha de atendimento** "identificação" (escopo `openid`), o **comprovante** que você recebe (ID Token), o **balcão de informações** extra (UserInfo) e o **mapa na entrada** com os endereços (descoberta).',
        check: {
          kind: 'choice',
          id: 'pe-r',
          prompt: 'Onde o provedor publica seus endereços e chaves públicas?',
          options: [
            { text: 'Em /.well-known/openid-configuration', why: 'Isso: é a descoberta.' },
            { text: 'No ID Token', why: 'O ID Token traz dados da autenticação.' },
            { text: 'No escopo openid', why: 'O escopo só indica o pedido de autenticação.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'tokens',
      part: 'Dois tokens',
      title: 'Token de acesso e ID Token',
      art: 'balanca',
      goal: 'Distinguir o token de acesso do ID Token.',
      explain:
        'Dois tokens, dois destinos:\n\n- **token de acesso** (OAuth): vai para a **API**, para **autorizar** o acesso a recursos. O OAuth **não define o formato**: pode ser opaco ou JWT;\n- **ID Token** (OIDC): é para o **cliente**, para **informar quem se autenticou**. É **sempre JWT**.\n\nNão se manda o ID Token à API como se fosse token de acesso.',
      check: {
        kind: 'choice',
        id: 'tk-c',
        prompt: 'Para quem é o ID Token?',
        options: [
          { text: 'Para o cliente, para saber quem se autenticou', why: 'Isso.' },
          { text: 'Para a API, para autorizar o acesso', why: 'Isso é o token de acesso.' },
          { text: 'Para o servidor de autorização, para renovar', why: 'Renovar é papel do token de atualização.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No hotel, a **ficha de check-in** diz à **recepção** quem você é (ID Token, para o cliente). A **chave do quarto** abre a **porta** (token de acesso, para a API). Você não usa a ficha para abrir a porta.',
        check: {
          kind: 'choice',
          id: 'tk-r',
          prompt: 'Qual destes é sempre JWT?',
          options: [
            { text: 'O ID Token', why: 'Isso.' },
            { text: 'O token de acesso', why: 'O OAuth não define o formato dele.' },
            { text: 'O código de autorização', why: 'O código é um valor de uso único, sem formato JWT exigido.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'claims',
      part: 'Dentro do ID Token',
      title: 'As claims do ID Token',
      art: 'dados',
      goal: 'Reconhecer iss, sub, aud, exp, iat e nonce.',
      explain:
        'Claims típicas do ID Token:\n\n- **`iss`**: o **emissor**;\n- **`sub`**: o **identificador do usuário** no emissor;\n- **`aud`**: o **cliente** a que o token se destina;\n- **`exp`**: a **expiração**;\n- **`iat`**: o momento da **emissão**;\n- **`nonce`**: valor criado pelo cliente que **impede reutilização**.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'Qual claim diz a qual cliente o token se destina?',
        options: [
          { text: 'aud', why: 'Isso: audience, o destinatário.' },
          { text: 'sub', why: 'sub identifica o usuário.' },
          { text: 'iss', why: 'iss é o emissor.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia como uma **carta registrada**: **iss** é o **remetente**; **sub**, o **assunto** (de quem se fala); **aud**, o **destinatário**; **iat**, a data de **postagem**; **exp**, a data de **validade**.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'Qual claim identifica o usuário no emissor?',
          options: [
            { text: 'sub', why: 'Isso: subject.' },
            { text: 'exp', why: 'exp é a expiração.' },
            { text: 'nonce', why: 'nonce impede reutilização.' },
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
      prompt: 'Cada característica é do token de acesso ou do ID Token?',
      categories: ['Token de acesso', 'ID Token'],
      items: [
        { text: 'Vai para a API', cat: 0, why: 'Autoriza o acesso a recursos.' },
        { text: 'Formato não definido pelo OAuth', cat: 0, why: 'Pode ser opaco ou JWT.' },
        { text: 'Para o cliente saber quem entrou', cat: 1, why: 'Informa a autenticação.' },
        { text: 'Sempre JWT', cat: 1, why: 'Assim define o OIDC.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['iss: emissor', 'aud: destinatário', 'sub: data de expiração'],
      bug: 2,
      why: 'sub identifica o usuário; a expiração é exp.',
      fixed: 'sub: identificador do usuário',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O sistema de processos quer mostrar o nome de quem entrou pelo gov.br. Qual pedido faz sentido?',
      scenarios: [
        { title: 'Opção A', body: 'Pedir o escopo **`openid`** e ler o **ID Token**.' },
        { title: 'Opção B', body: 'Pedir a senha do gov.br ao usuário.' },
      ],
      answer: 0,
      why: 'O OIDC informa quem se autenticou pelo ID Token; a senha nunca vai ao cliente.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.007' }],
  summary: [
    'OIDC: camada de identidade sobre o OAuth 2.0.',
    'Acrescenta o escopo openid, o ID Token (sempre JWT), o UserInfo e a descoberta (/.well-known/openid-configuration).',
    'Token de acesso: para a API, formato livre. ID Token: para o cliente, diz quem se autenticou.',
    'Claims: iss, sub, aud, exp, iat, nonce.',
  ],
};

export const devOidJwt: MicroLesson = {
  ...S,
  id: 'dev.oidc.3',
  series: { id: 'dev.oidc', order: 3 },
  title: 'O JWT por dentro',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você cola um JWT num decodificador público e lê o nome do usuário. O token estava cifrado?',
    options: [
      { text: 'Não: estava só codificado, e qualquer um lê', why: 'Isso. Esta aula explica as três partes e o que a assinatura garante.' },
      { text: 'Sim, e o decodificador quebrou a cifra', why: 'Não havia cifra; Base64URL é só codificação.' },
      { text: 'Sim, e você tinha a chave', why: 'Não foi preciso chave: a carga não é cifrada.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'partes',
      part: 'A estrutura',
      title: 'Três partes separadas por pontos',
      art: 'trilha',
      goal: 'Reconhecer cabeçalho, carga e assinatura.',
      explain:
        'Na forma assinada (**JWS**), um JWT tem **três partes** em **Base64URL**, separadas por pontos:\n\n```\ncabeçalho.carga.assinatura\n```\n\n- o **cabeçalho** diz o algoritmo, como `{ "alg": "RS256", "typ": "JWT" }`;\n- a **carga** traz as **claims**, como `iss`, `sub`, `aud`, `exp`;\n- a **assinatura** é calculada sobre o cabeçalho e a carga.',
      check: {
        kind: 'order',
        id: 'pa-c',
        prompt: 'Ordene as partes de um JWT assinado.',
        items: ['Cabeçalho', 'Carga', 'Assinatura'],
        why: 'cabeçalho.carga.assinatura',
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pense num **envelope com selo**: na **frente**, a etiqueta dizendo como foi lacrado (cabeçalho); **dentro**, a carta (carga, com as claims); no **fecho**, o **lacre** que denuncia se alguém abriu (assinatura).',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Onde ficam as claims num JWT?',
          options: [
            { text: 'Na carga', why: 'Isso.' },
            { text: 'No cabeçalho', why: 'O cabeçalho diz o algoritmo e o tipo.' },
            { text: 'Na assinatura', why: 'A assinatura protege as outras partes.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'algoritmos',
      part: 'A assinatura',
      title: 'HS256, RS256 e ES256',
      art: 'cadeado',
      goal: 'Distinguir HMAC com segredo compartilhado de assinatura com par de chaves.',
      explain:
        'Três algoritmos comuns:\n\n- **HS256**: **HMAC** com SHA-256. Usa um **segredo compartilhado** entre emissor e verificador (**simétrico**);\n- **RS256**: **RSA** com SHA-256. O emissor assina com a chave **privada**; qualquer um verifica com a **pública**;\n- **ES256**: **ECDSA** (curva P-256) com SHA-256. Como o RS256, mas com **chaves menores**.\n\nRS256 e ES256 são **assinaturas digitais**.',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'Qual afirmação está correta?',
        options: [
          { text: 'HS256 usa segredo compartilhado; RS256 e ES256 usam par de chaves', why: 'Isso.' },
          { text: 'HS256 usa par de chaves pública e privada', why: 'Pegadinha: HS256 é HMAC com segredo compartilhado.' },
          { text: 'RS256 dispensa qualquer chave', why: 'Usa a privada para assinar e a pública para verificar.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **H** de HS256 lembra **HMAC**: um **segredo** que os dois lados conhecem, como a senha combinada entre dois amigos. O **R** e o **E** são assinaturas: só o emissor tem a **caneta** (privada), mas todos podem conferir a **firma** (pública).',
        check: {
          kind: 'choice',
          id: 'al-r',
          prompt: 'No RS256, com que chave se verifica a assinatura?',
          options: [
            { text: 'Com a chave pública do emissor', why: 'Isso.' },
            { text: 'Com a chave privada do emissor', why: 'A privada serve para assinar.' },
            { text: 'Com um segredo compartilhado', why: 'Segredo compartilhado é o HS256.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'garante',
      part: 'O que garante',
      title: 'Integridade, não sigilo',
      art: 'alvo',
      goal: 'Saber o que a assinatura do JWT garante e o que não garante.',
      explain:
        'A assinatura garante:\n\n- **integridade**: alterar a carga **invalida** o token;\n- **origem**: o token veio de quem tem a chave.\n\nMas um JWT assinado **não é cifrado**. **Base64URL é codificação**, não criptografia: **qualquer um lê** a carga. Não coloque dados sigilosos nela.\n\nPara **sigilo**, existe o **JWE** (*JSON Web Encryption*).',
      check: {
        kind: 'choice',
        id: 'ga-c',
        prompt: 'Por que se consegue ler a carga de um JWT assinado com RS256?',
        options: [
          { text: 'Porque ela é só codificada em Base64URL, não cifrada', why: 'Isso.' },
          { text: 'Porque o RS256 é fraco e foi quebrado', why: 'A assinatura está intacta; ela só não esconde nada.' },
          { text: 'Porque a chave privada é pública', why: 'A privada continua secreta; a carga não é cifrada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **cartão-postal com carimbo oficial**: o carimbo prova que **veio do órgão** e que **ninguém mexeu**. Mas o texto está à vista de qualquer carteiro. Para esconder o texto, é preciso um **envelope fechado**: o JWE.',
        check: {
          kind: 'choice',
          id: 'ga-r',
          prompt: 'Para que um JWT tenha conteúdo sigiloso, usa-se:',
          options: [
            { text: 'JWE', why: 'Isso: JSON Web Encryption.' },
            { text: 'Base64URL', why: 'Base64URL é só codificação.' },
            { text: 'HS256', why: 'HS256 assina; não cifra.' },
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
      prompt: 'Cada algoritmo usa qual tipo de chave?',
      categories: ['Segredo compartilhado', 'Par de chaves'],
      items: [
        { text: 'HS256', cat: 0, why: 'HMAC simétrico.' },
        { text: 'RS256', cat: 1, why: 'RSA: privada assina, pública verifica.' },
        { text: 'ES256', cat: 1, why: 'ECDSA: chaves menores.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['JWT: cabeçalho.carga.assinatura', 'Partes em Base64URL', 'A assinatura deixa a carga sigilosa'],
      bug: 2,
      why: 'A assinatura garante integridade e origem; a carga continua legível.',
      fixed: 'A assinatura garante integridade',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma equipe quer pôr o CPF e o salário do servidor dentro de um JWT assinado. O que dizer?',
      scenarios: [
        { title: 'Opção A', body: 'Pode: a assinatura **protege** os dados contra leitura.' },
        { title: 'Opção B', body: 'Evite: a carga é **legível**; se o sigilo for necessário, use JWE ou deixe os dados fora.' },
      ],
      answer: 1,
      why: 'Base64URL não é cifra. Qualquer um com o token lê a carga.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.009' },
  ],
  summary: [
    'JWT (RFC 7519) assinado (JWS): cabeçalho.carga.assinatura, em Base64URL.',
    'HS256: HMAC com segredo compartilhado. RS256 e ES256: assinatura com privada, verificação com pública.',
    'A assinatura garante integridade e origem, não sigilo. Base64URL é codificação. Sigilo: JWE.',
  ],
};

export const devOidValidacao: MicroLesson = {
  ...S,
  id: 'dev.oidc.4',
  series: { id: 'dev.oidc', order: 4 },
  title: 'Validar, revogar e guardar',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma API recebe um JWT cujo cabeçalho diz "alg: none", sem assinatura. Ela deve aceitar?',
    options: [
      { text: 'Não: nunca se aceita alg none', why: 'Isso. Esta aula mostra a validação correta.' },
      { text: 'Sim, se a carga parecer certa', why: 'Sem assinatura, qualquer um forjaria a carga.' },
      { text: 'Sim, o próprio token decide como ser verificado', why: 'É exatamente o que nunca se deve permitir.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'validar',
      part: 'Validação',
      title: 'Os quatro cuidados',
      art: 'revisao',
      goal: 'Seguir os passos da validação de um JWT.',
      explain:
        'Quem recebe um JWT deve:\n\n1. **verificar a assinatura** com a chave esperada;\n2. aceitar **só algoritmos previstos**, numa lista fixa. **Nunca** aceitar `alg: none` nem deixar o token escolher como será verificado;\n3. conferir **`exp`** (e `nbf`, se houver);\n4. conferir **`iss`** (emissor confiável) e **`aud`** (o token é para mim).',
      check: {
        kind: 'multi',
        id: 'va-c',
        prompt: 'O que a API deve fazer ao validar um JWT? Marque todas.',
        options: [
          { text: 'Verificar a assinatura com a chave esperada', correct: true, why: 'Isso.' },
          { text: 'Aceitar só algoritmos de uma lista fixa', correct: true, why: 'Isso.' },
          { text: 'Conferir exp, iss e aud', correct: true, why: 'Isso.' },
          { text: 'Usar o algoritmo que o próprio token indicar, qualquer que seja', correct: false, why: 'O token não pode escolher como será verificado.' },
        ],
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O **porteiro** confere a **assinatura** do crachá, aceita só os **modelos de crachá** conhecidos, olha a **validade** e vê se o crachá é **deste prédio** e foi emitido **por quem deve**. Um crachá que diz "não precisa conferir" vai direto para o lixo.',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: 'Conferir aud serve para quê?',
          options: [
            { text: 'Saber se o token é destinado a esta API', why: 'Isso.' },
            { text: 'Saber quando o token expira', why: 'Isso é exp.' },
            { text: 'Saber quem emitiu', why: 'Isso é iss.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'revogar',
      part: 'Revogação',
      title: 'Vida curta e renovação',
      art: 'calendario',
      goal: 'Saber como se contorna a dificuldade de revogar um JWT.',
      explain:
        'O JWT é verificado **sem consultar o emissor**. Por isso, **revogá-lo antes de `exp`** é difícil.\n\nA prática usual:\n\n- **tokens de acesso de vida curta** (minutos);\n- **tokens de atualização** para renovar, que **podem ser revogados** no servidor de autorização.\n\nSe a conta for bloqueada, o token de acesso atual vence logo, e o de atualização já não renova.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Uma dificuldade dos JWT autocontidos e a prática para mitigá-la são:',
        options: [
          { text: 'Revogar antes da expiração; tokens curtos renovados por tokens revogáveis', why: 'Isso.' },
          { text: 'Tamanho do token; comprimir com ZIP', why: 'O problema central é a revogação.' },
          { text: 'Velocidade; consultar o banco a cada chamada sempre', why: 'Isso anularia a vantagem do token autocontido.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **passe diário** de visitante vence à noite. Se alguém for proibido de entrar, basta **não emitir o passe do dia seguinte**. Tokens curtos funcionam assim: a renovação é o ponto de controle.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Onde se revoga o token de atualização?',
          options: [
            { text: 'No servidor de autorização', why: 'Isso.' },
            { text: 'Dentro da carga do JWT', why: 'A carga não muda depois de assinada.' },
            { text: 'Não é possível revogar', why: 'O de atualização pode ser revogado.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'guardar',
      part: 'Armazenamento',
      title: 'Onde guardar no navegador',
      art: 'computador',
      goal: 'Saber os riscos de localStorage e as proteções dos cookies.',
      explain:
        'No navegador, onde o token fica importa:\n\n- em **`localStorage`**, ele fica exposto a **scripts injetados** (**XSS**): um script malicioso o lê e envia para fora;\n- em **cookies** com **`HttpOnly`**, **`Secure`** e **`SameSite`**, o risco diminui: scripts não leem o cookie, ele só viaja com TLS e não é enviado por outros sites.',
      check: {
        kind: 'choice',
        id: 'gu-c',
        prompt: 'Qual o risco de guardar tokens em localStorage?',
        options: [
          { text: 'Ficam expostos a scripts injetados (XSS)', why: 'Isso.' },
          { text: 'Somem ao trocar de aba', why: 'localStorage persiste entre abas.' },
          { text: 'Nenhum risco', why: 'Scripts injetados conseguem lê-los.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Deixar o token no **localStorage** é deixar a chave **em cima da mesa**: qualquer um que entre na sala (um script injetado) pega. O cookie **HttpOnly** é a chave **no cofre da recepção**: só o servidor manuseia.',
        check: {
          kind: 'choice',
          id: 'gu-r',
          prompt: 'Qual atributo impede que scripts leiam o cookie?',
          options: [
            { text: 'HttpOnly', why: 'Isso.' },
            { text: 'Secure', why: 'Secure exige TLS.' },
            { text: 'SameSite', why: 'SameSite limita o envio por outros sites.' },
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
      prompt: 'Ordene a validação de um JWT.',
      items: ['Verificar a assinatura com a chave esperada', 'Conferir se o algoritmo está na lista fixa', 'Conferir exp', 'Conferir iss e aud'],
      why: 'Assinatura e algoritmo primeiro; depois validade, emissor e destinatário.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada atributo de cookie protege contra o quê?',
      categories: ['HttpOnly', 'Secure', 'SameSite'],
      items: [
        { text: 'Leitura por scripts injetados', cat: 0, why: 'Scripts não acessam o cookie.' },
        { text: 'Trânsito sem TLS', cat: 1, why: 'Só viaja cifrado.' },
        { text: 'Envio por outros sites', cat: 2, why: 'Limita requisições de outras origens.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Nunca aceitar alg none', 'Tokens de acesso de vida curta', 'Token de acesso de vida longa facilita revogar'],
      bug: 2,
      why: 'Vida longa piora: um token roubado vale mais tempo e não se revoga fácil.',
      fixed: 'Vida curta reduz o problema da revogação',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.010' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.011' },
  ],
  summary: [
    'Validar: assinatura com a chave esperada; algoritmos de lista fixa (nunca alg none); exp (e nbf); iss e aud.',
    'Revogar antes de exp é difícil: tokens de acesso curtos e de atualização revogáveis.',
    'No navegador: localStorage expõe a XSS; cookies HttpOnly, Secure e SameSite reduzem o risco.',
  ],
};
