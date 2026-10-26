// Série "OAuth 2.0" (cap.dev.02, trecho oauth), no ritmo lento com história pedido em 25/10/2026: a
// primeira aula conta do repasse de senhas ao OAuth 2.0 e ao PKCE; as seguintes ensinam a autorização
// delegada e os papéis, depois tokens e escopos, depois os fluxos e o PKCE passo a passo, uma ideia
// por etapa. Fatos conferidos com o texto do capítulo (02-oauth.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.02', sectionId: 'oauth' } as const;

export const devOauHistoria: MicroLesson = {
  ...S,
  id: 'dev.oauth.1',
  series: { id: 'dev.oauth', order: 1 },
  title: 'Por que o OAuth foi criado',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um aplicativo quer importar os contatos do seu e-mail e pede a sua senha do e-mail. Parece uma boa ideia?',
    options: [
      { text: 'Não: com a senha, ele poderia fazer tudo na sua conta', why: 'Isso. Esta aula conta como o OAuth resolveu esse problema.' },
      { text: 'Sim, é o jeito normal', why: 'Já foi comum, mas dava acesso total à conta.' },
      { text: 'Sim, desde que o aplicativo seja bonito', why: 'A aparência não limita o que ele faria com a senha.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'senhas',
      part: 'A história',
      title: 'Meados dos anos 2000: entregar a senha',
      art: 'cadeado',
      goal: 'Entender o problema que o OAuth veio resolver.',
      explain:
        'Em meados dos anos 2000, muitos sites queriam usar dados de outros serviços: importar contatos, publicar numa rede social.\n\nO jeito comum era **pedir a senha** do usuário naquele outro serviço. Isso era perigoso:\n\n- o site recebia **acesso total** à conta;\n- não dava para **limitar** o que ele podia fazer;\n- para cortar o acesso, só **trocando a senha**.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Qual era o problema de entregar a senha a outro site?',
        options: [
          { text: 'Ele ganhava acesso total, sem limite', why: 'Isso.' },
          { text: 'A senha ficava mais forte', why: 'Repassar a senha só aumenta o risco.' },
          { text: 'Nenhum problema', why: 'O site podia fazer tudo na conta.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como entregar a **chave da sua casa** ao entregador só para ele deixar um pacote na varanda. Ele poderia abrir **todos os cômodos**. E, para tirar o acesso, você teria de **trocar a fechadura**.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Para cortar o acesso de um site que tinha sua senha, era preciso:',
          options: [
            { text: 'Trocar a senha', why: 'Isso: e todos os outros perdiam acesso junto.' },
            { text: 'Apagar só aquele acesso, com um clique', why: 'Isso o OAuth tornou possível; com a senha, não.' },
            { text: 'Nada; o acesso expirava sozinho', why: 'A senha não expira sozinha.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'oauth1',
      part: 'A história',
      title: '2006 e 2007: o OAuth 1.0',
      art: 'professores',
      goal: 'Saber de onde veio o OAuth 1.0.',
      explain:
        'Em **2006**, **Blaine Cook**, que trabalhava no **Twitter**, e outros desenvolvedores procuravam um jeito de um site acessar dados de outro **sem receber a senha**.\n\nDesse grupo saiu, em **2007**, a primeira versão do **OAuth**: o usuário **autoriza** o acesso no próprio serviço, e o site recebe um **token** com permissões limitadas.\n\nEm **2010**, essa versão foi publicada como **RFC 5849**.',
      check: {
        kind: 'choice',
        id: 'o1-c',
        prompt: 'Qual foi a ideia central do OAuth?',
        options: [
          { text: 'Dar ao site um token com permissões limitadas, em vez da senha', why: 'Isso.' },
          { text: 'Criptografar a senha antes de entregá-la', why: 'A ideia é não entregar a senha de jeito nenhum.' },
          { text: 'Proibir sites de usar dados de outros', why: 'A ideia é permitir, com limite.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Em vez da chave da casa, você dá ao entregador uma **chave de manobrista**: abre só a varanda e só por um tempo. Você continua com a sua chave. Esse é o **token** do OAuth.',
        check: {
          kind: 'choice',
          id: 'o1-r',
          prompt: 'Onde trabalhava Blaine Cook quando a ideia do OAuth começou?',
          options: [
            { text: 'No Twitter', why: 'Isso.' },
            { text: 'No MIT', why: 'O MIT é do CTSS.' },
            { text: 'Na Wordnik', why: 'A Wordnik é do Swagger.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'oauth2',
      part: 'A história',
      title: '2012 e 2015: OAuth 2.0 e PKCE',
      art: 'calendario',
      goal: 'Ordenar o OAuth 2.0, o bearer e o PKCE.',
      explain:
        'O OAuth foi refeito, mais simples e flexível:\n\n- **2012**: **OAuth 2.0**, na **RFC 6749**; no mesmo ano, a **RFC 6750** definiu o token **portador** (*bearer*);\n- **2015**: o **PKCE**, na **RFC 7636**, protegeu os **aplicativos de celular**.\n\nHoje, as boas práticas estão sendo consolidadas no **OAuth 2.1**, em elaboração na IETF.',
      check: {
        kind: 'order',
        id: 'o2-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['OAuth 1.0 (2007)', 'OAuth 2.0, RFC 6749 (2012)', 'PKCE, RFC 7636 (2015)', 'OAuth 2.1, em elaboração'],
        why: 'Da primeira versão às boas práticas atuais.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Guarde três números: **6749** é o OAuth 2.0; **6750**, logo depois, é o token portador; **7636** é o PKCE, que veio três anos mais tarde para proteger o celular.',
        check: {
          kind: 'choice',
          id: 'o2-r',
          prompt: 'Qual RFC definiu o OAuth 2.0?',
          options: [
            { text: 'RFC 6749', why: 'Isso, em 2012.' },
            { text: 'RFC 7636', why: 'Essa é o PKCE.' },
            { text: 'RFC 6455', why: 'Essa é o WebSocket.' },
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
      items: ['Sites pediam a senha do usuário', 'OAuth 1.0 (2007)', 'OAuth 2.0 (2012)', 'PKCE (2015)'],
      why: 'Do repasse de senhas ao fluxo protegido no celular.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada RFC trata de quê?',
      categories: ['OAuth', 'Outro assunto'],
      items: [
        { text: 'RFC 6749', cat: 0, why: 'OAuth 2.0.' },
        { text: 'RFC 7636', cat: 0, why: 'PKCE.' },
        { text: 'RFC 6455', cat: 1, why: 'WebSocket.' },
        { text: 'RFC 8259', cat: 1, why: 'JSON.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['OAuth: token em vez da senha', 'RFC 6750: token portador', 'PKCE: protege senhas guardadas no site'],
      bug: 2,
      why: 'O PKCE protege o fluxo de código de autorização em aplicativos de celular; ninguém guarda a senha do usuário.',
      fixed: 'PKCE: protege aplicativos de celular',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Antes: sites pediam a senha do usuário em outro serviço, ganhando acesso total.',
    '2006 e 2007: Blaine Cook (Twitter) e outros criam o OAuth 1.0; RFC 5849 em 2010.',
    '2012: OAuth 2.0 (RFC 6749) e token portador (RFC 6750). 2015: PKCE (RFC 7636). OAuth 2.1 em elaboração.',
  ],
};

export const devOauPapeis: MicroLesson = {
  ...S,
  id: 'dev.oauth.2',
  series: { id: 'dev.oauth', order: 2 },
  title: 'Autorização delegada e os quatro papéis',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O OAuth 2.0 serve para provar quem o usuário é ou para dar acesso a recursos dele?',
    options: [
      { text: 'Para dar acesso a recursos: é autorização', why: 'Isso. Esta aula mostra como.' },
      { text: 'Para provar quem é: é autenticação', why: 'Essa é a pegadinha clássica: o OAuth é de autorização.' },
      { text: 'Para guardar senhas', why: 'Ele existe justamente para não repassar senhas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'delegada',
      part: 'O que é',
      title: 'Autorização delegada',
      art: 'balanca',
      goal: 'Definir o OAuth 2.0 como autorização delegada.',
      explain:
        'O **OAuth 2.0** (RFC 6749) é um *framework* de **autorização delegada**: um aplicativo acessa recursos de um usuário em outro serviço **sem receber a senha**, só um **token de acesso** com permissões limitadas.\n\nAtenção: o OAuth trata de **autorização**, não de autenticação. Saber **quem é** o usuário é papel do **OpenID Connect**, construído por cima do OAuth.',
      example: 'Um aplicativo de agenda pede acesso ao seu calendário. Você autoriza o escopo "ler eventos", e ele recebe um token que só serve para isso.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'O OAuth 2.0 é corretamente descrito como:',
        options: [
          { text: 'Framework de autorização delegada, com token de escopo limitado', why: 'Isso.' },
          { text: 'Protocolo de autenticação que repassa a senha', why: 'Ele existe para evitar o repasse.' },
          { text: 'Formato de token em três partes', why: 'Isso é o JWT.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma **procuração** autoriza alguém a fazer **uma coisa específica** em seu nome, como retirar um documento, sem lhe dar sua identidade inteira. O token do OAuth é essa procuração. Quem prova quem você é, é outro papel: o OpenID Connect.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Quem acrescenta a autenticação padronizada sobre o OAuth?',
          options: [
            { text: 'O OpenID Connect', why: 'Isso.' },
            { text: 'O próprio OAuth 2.0', why: 'O OAuth é de autorização.' },
            { text: 'O SAML', why: 'O SAML é outro padrão, em XML.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'papeis',
      part: 'Os papéis',
      title: 'Quatro papéis',
      art: 'pessoal',
      goal: 'Reconhecer os quatro papéis do OAuth.',
      explain:
        'No exemplo da agenda:\n\n- **proprietário do recurso**: quem pode conceder acesso. **Você**;\n- **cliente**: o aplicativo que quer acessar. O **aplicativo de agenda**;\n- **servidor de autorização**: **autentica** o proprietário, pede o **consentimento** e **emite os tokens**. O login do serviço de calendário;\n- **servidor de recursos**: a **API** que guarda os dados e **aceita tokens**. A API do calendário.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Quem autentica o proprietário, obtém o consentimento e emite os tokens?',
        options: [
          { text: 'O servidor de autorização', why: 'Isso.' },
          { text: 'O servidor de recursos', why: 'Esse aceita tokens e entrega dados.' },
          { text: 'O cliente', why: 'O cliente é quem pede acesso.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Num **cofre de banco**: você é o **dono** do cofre; seu contador é o **cliente**; a **gerência**, que confere sua identidade e assina a autorização, é o **servidor de autorização**; a **sala dos cofres**, que só abre com a autorização, é o **servidor de recursos**.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'A API que guarda os dados e aceita os tokens é o:',
          options: [
            { text: 'Servidor de recursos', why: 'Isso.' },
            { text: 'Servidor de autorização', why: 'Esse emite os tokens.' },
            { text: 'Proprietário do recurso', why: 'O proprietário é o usuário.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'consentimento',
      part: 'Os papéis',
      title: 'O caminho do consentimento',
      art: 'trilha',
      goal: 'Seguir a ordem em que os papéis agem.',
      explain:
        'De forma simplificada:\n\n1. o **cliente** pede acesso e manda o usuário ao **servidor de autorização**;\n2. o **proprietário** entra e **consente** com o escopo pedido;\n3. o servidor de autorização **emite um token** ao cliente;\n4. o cliente usa o token no **servidor de recursos**.\n\nEm momento nenhum o cliente **vê a senha**: ela é digitada só no servidor de autorização.',
      check: {
        kind: 'order',
        id: 'co-c',
        prompt: 'Ordene os passos.',
        items: ['Cliente pede acesso', 'Proprietário consente no servidor de autorização', 'Servidor de autorização emite o token', 'Cliente chama o servidor de recursos com o token'],
        why: 'Pedido, consentimento, token e uso.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Volte ao **cofre**: o contador pede (cliente); você vai à **gerência** e assina (consentimento); a gerência entrega ao contador um **papel de autorização** (token); com ele, o contador entra na **sala dos cofres** (servidor de recursos).',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Onde o usuário digita a senha no OAuth?',
          options: [
            { text: 'Só no servidor de autorização', why: 'Isso: o cliente nunca vê a senha.' },
            { text: 'No aplicativo cliente', why: 'É justamente o que o OAuth evita.' },
            { text: 'Na API de recursos', why: 'A API aceita tokens, não senhas.' },
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
      prompt: 'No exemplo da agenda, quem é quem?',
      categories: ['Proprietário', 'Cliente', 'Servidor de autorização', 'Servidor de recursos'],
      items: [
        { text: 'Você', cat: 0, why: 'Concede o acesso.' },
        { text: 'Aplicativo de agenda', cat: 1, why: 'Pede acesso.' },
        { text: 'Login do serviço de calendário', cat: 2, why: 'Emite tokens.' },
        { text: 'API do calendário', cat: 3, why: 'Aceita tokens.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['OAuth 2.0: autorização delegada', 'Cliente recebe token, não senha', 'OAuth 2.0: protocolo de autenticação'],
      bug: 2,
      why: 'É de autorização; a autenticação padronizada vem com o OpenID Connect.',
      fixed: 'OAuth 2.0: framework de autorização',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um sistema de relatórios precisa ler a agenda dos auditores em outro serviço. Qual desenho respeita o OAuth?',
      scenarios: [
        { title: 'Opção A', body: 'Cada auditor digita a senha do outro serviço no sistema de relatórios.' },
        { title: 'Opção B', body: 'Cada auditor **consente** no servidor de autorização e o sistema recebe um **token** de leitura.' },
      ],
      answer: 1,
      why: 'Com o OAuth, o cliente recebe só um token limitado; a senha fica no servidor de autorização.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.003' },
  ],
  summary: [
    'OAuth 2.0 (RFC 6749): autorização delegada; o cliente recebe um token de acesso limitado, não a senha.',
    'Não é autenticação: saber quem é o usuário é papel do OpenID Connect.',
    'Papéis: proprietário do recurso, cliente, servidor de autorização (autentica, consente, emite tokens) e servidor de recursos (API).',
  ],
};

export const devOauTokens: MicroLesson = {
  ...S,
  id: 'dev.oauth.3',
  series: { id: 'dev.oauth', order: 3 },
  title: 'Tokens e escopos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Se alguém pega o token de acesso de outra pessoa, consegue usá-lo?',
    options: [
      { text: 'Sim: quem tem o token pode usá-lo', why: 'Isso. Por isso ele é chamado de "portador". Esta aula explica.' },
      { text: 'Não: o token só funciona no celular do dono', why: 'O token portador funciona para quem o tiver.' },
      { text: 'Só se souber a senha também', why: 'O token dispensa a senha; por isso precisa ser protegido.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'acesso',
      part: 'Os tokens',
      title: 'Token de acesso e o portador',
      art: 'cartao',
      goal: 'Saber como o token de acesso é usado e por que exige TLS.',
      explain:
        'O **token de acesso** (*access token*) é uma credencial de **curta duração** enviada à API, geralmente no cabeçalho:\n\n`Authorization: Bearer <token>`\n\n**Portador** (*bearer*, RFC 6750) quer dizer que **quem tiver o token pode usá-lo**. Por isso ele **só deve trafegar com TLS**.',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'Por que tokens do tipo bearer devem trafegar só com TLS?',
        options: [
          { text: 'Porque qualquer um que os possua pode usá-los', why: 'Isso.' },
          { text: 'Porque o TLS deixa o token mais curto', why: 'O TLS protege o trânsito; não muda o token.' },
          { text: 'Porque sem TLS o token expira', why: 'A expiração não depende do TLS.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **ingresso de show sem nome**: quem estiver com ele **entra**. Ninguém confere a identidade. Por isso você não o deixa à vista, e o token não pode viajar sem a proteção do **TLS**.',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'Em que cabeçalho o token de acesso costuma ir?',
          options: [
            { text: 'Authorization: Bearer', why: 'Isso.' },
            { text: 'Content-Type', why: 'Content-Type diz o formato do corpo.' },
            { text: 'Upgrade', why: 'Upgrade é usado para abrir o WebSocket.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'refresh',
      part: 'Os tokens',
      title: 'Token de atualização',
      art: 'revisao',
      goal: 'Saber para que serve o token de atualização e onde ele é usado.',
      explain:
        'Como o token de acesso dura pouco, existe o **token de atualização** (*refresh token*):\n\n- tem **duração maior**;\n- fica com o **cliente**;\n- serve para pedir **novos tokens de acesso** sem incomodar o usuário.\n\nEle é usado **só junto ao servidor de autorização**. **Nunca** é enviado à API de recursos.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Para onde o token de atualização é enviado?',
        options: [
          { text: 'Só para o servidor de autorização', why: 'Isso.' },
          { text: 'Para a API em toda chamada', why: 'À API vai só o token de acesso.' },
          { text: 'Para o usuário, por e-mail', why: 'Fica com o cliente.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O token de acesso é a **senha do dia** na portaria: vale pouco tempo. O token de atualização é o **crachá funcional** que você leva à **administração** (o servidor de autorização) para pegar a senha do dia seguinte. Você não mostra o crachá funcional na portaria.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'O token de acesso deve ter vida:',
          options: [
            { text: 'Curta, renovada pelo token de atualização', why: 'Isso.' },
            { text: 'Longa, para evitar renovações', why: 'Vida longa aumenta o dano se for roubado.' },
            { text: 'Infinita', why: 'Sem expiração, um token roubado valeria para sempre.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'escopo',
      part: 'Os limites',
      title: 'Escopo',
      art: 'alvo',
      goal: 'Saber o que o escopo define.',
      explain:
        'O **escopo** (*scope*) define a **extensão** do acesso concedido. Por exemplo:\n\n- `processos:leitura` permite **ler** processos;\n- não permite **alterar** nem **apagar**.\n\nO escopo aplica o **menor privilégio**: o cliente recebe só o que precisa. Atenção: o escopo **não** define a **duração** do token. Duração é a **expiração**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'O escopo de um token define:',
        options: [
          { text: 'A extensão do acesso concedido', why: 'Isso.' },
          { text: 'A duração do token', why: 'Duração é a expiração.' },
          { text: 'A senha do usuário', why: 'O token nunca contém a senha.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **procuração**, o escopo é a cláusula "**para retirar documentos no cartório X**". Ela diz **o que** o procurador pode fazer, não **até quando**. O "até quando" é outra cláusula: a validade.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Qual princípio o escopo aplica?',
          options: [
            { text: 'Menor privilégio', why: 'Isso.' },
            { text: 'Acesso total', why: 'O contrário: só o necessário.' },
            { text: 'Idempotência', why: 'Idempotência é sobre repetir requisições.' },
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
      prompt: 'Cada característica é do token de acesso ou do de atualização?',
      categories: ['Token de acesso', 'Token de atualização'],
      items: [
        { text: 'Curta duração', cat: 0, why: 'Vale minutos.' },
        { text: 'Vai à API no cabeçalho Authorization', cat: 0, why: 'É ele que a API aceita.' },
        { text: 'Duração maior', cat: 1, why: 'Serve para renovar.' },
        { text: 'Usado só no servidor de autorização', cat: 1, why: 'Nunca vai à API.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Bearer: quem tem, usa', 'Token só com TLS', 'Escopo: define a duração do token'],
      bug: 2,
      why: 'O escopo define a extensão do acesso; a duração é a expiração.',
      fixed: 'Escopo: define a extensão do acesso',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um painel só precisa mostrar processos. Qual pedido de acesso é melhor?',
      scenarios: [
        { title: 'Opção A', body: 'Escopo `processos:leitura`.' },
        { title: 'Opção B', body: 'Todos os escopos, "para o caso de precisar".' },
      ],
      answer: 0,
      why: 'Menor privilégio: só o que o painel usa. Se o token vazar, o estrago é menor.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.006' }],
  summary: [
    'Token de acesso: curta duração, enviado à API em Authorization: Bearer (RFC 6750).',
    'Bearer: quem tem, usa; só com TLS.',
    'Token de atualização: duração maior, usado só no servidor de autorização para renovar; nunca vai à API.',
    'Escopo: extensão do acesso (menor privilégio), não a duração.',
  ],
};

export const devOauFluxos: MicroLesson = {
  ...S,
  id: 'dev.oauth.4',
  series: { id: 'dev.oauth', order: 4 },
  title: 'Os fluxos e o PKCE',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um serviço noturno chama outra API sem nenhum usuário por perto. Ele pode usar o OAuth?',
    options: [
      { text: 'Sim, com um fluxo próprio para sistemas', why: 'Isso: o de credenciais do cliente. Esta aula mostra todos os fluxos.' },
      { text: 'Não: o OAuth exige um usuário', why: 'Há um fluxo para sistemas sem usuário.' },
      { text: 'Só usando a senha de algum servidor', why: 'Não é preciso senha de usuário.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'codigo',
      part: 'Os fluxos',
      title: 'Código de autorização e credenciais do cliente',
      art: 'trilha',
      goal: 'Escolher entre o fluxo de código e o de credenciais do cliente.',
      explain:
        'Os dois fluxos recomendados hoje:\n\n- **código de autorização** (*authorization code*): para aplicativos **com usuário** (web, celular, SPA). O navegador vai ao servidor de autorização, que devolve um **código**; o cliente troca o código por tokens. Recomendado **com PKCE**;\n- **credenciais do cliente** (*client credentials*): comunicação **entre sistemas, sem usuário**. Um serviço chama outro **em nome próprio**.',
      check: {
        kind: 'choice',
        id: 'cd-c',
        prompt: 'Um serviço noturno consulta outra API interna, sem usuário. Qual fluxo?',
        options: [
          { text: 'Credenciais do cliente', why: 'Isso.' },
          { text: 'Código de autorização com PKCE', why: 'Pressupõe um usuário consentindo no navegador.' },
          { text: 'Implícito', why: 'Desaconselhado e voltado a navegadores.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: **tem uma pessoa** consentindo? Se tem, **código de autorização** (com PKCE). Se é **máquina falando com máquina**, como um robô que roda de madrugada, **credenciais do cliente**.',
        check: {
          kind: 'choice',
          id: 'cd-r',
          prompt: 'Um aplicativo de celular com login do usuário usa:',
          options: [
            { text: 'Código de autorização com PKCE', why: 'Isso.' },
            { text: 'Credenciais do cliente', why: 'Esse é para sistemas sem usuário.' },
            { text: 'Senha do proprietário', why: 'Desaconselhado.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'desaconselhados',
      part: 'Os fluxos',
      title: 'Os fluxos desaconselhados',
      art: 'vazio',
      goal: 'Saber quais fluxos não se usam mais e por quê.',
      explain:
        'Dois fluxos antigos são hoje **desaconselhados**:\n\n- **implícito** (*implicit*): entregava o token **direto na URL** do navegador, onde ele fica **exposto**;\n- **senha do proprietário** (*password*): o cliente recebia a **senha do usuário**, o que **contraria a ideia** do OAuth.\n\nAs boas práticas atuais, consolidadas no **OAuth 2.1**, **eliminam** os dois e **exigem PKCE**.',
      check: {
        kind: 'choice',
        id: 'dz-c',
        prompt: 'Por que o fluxo implícito é desaconselhado?',
        options: [
          { text: 'Entregava o token direto na URL, expondo-o', why: 'Isso.' },
          { text: 'Era lento demais', why: 'O problema é a exposição do token.' },
          { text: 'Exigia PKCE', why: 'Ele nem usava código; entregava o token direto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O implícito é como mandar o **ingresso escrito no envelope**, por fora: qualquer um que veja o envelope copia. O de senha é **voltar a entregar a chave da casa**, justo o que o OAuth veio evitar.',
        check: {
          kind: 'choice',
          id: 'dz-r',
          prompt: 'Para um aplicativo de página única (SPA), hoje se recomenda:',
          options: [
            { text: 'Código de autorização com PKCE', why: 'Isso.' },
            { text: 'Fluxo implícito', why: 'Pegadinha: o implícito é desaconselhado.' },
            { text: 'Senha do proprietário', why: 'Desaconselhado.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pkce',
      part: 'O PKCE',
      title: 'O PKCE passo a passo',
      art: 'cadeado',
      goal: 'Entender como o PKCE protege um código interceptado.',
      explain:
        'Um aplicativo de celular **não consegue guardar segredo**. O **PKCE** (RFC 7636) resolve assim:\n\n1. o cliente cria um segredo aleatório, o *code verifier*, e calcula o resumo dele (SHA-256), o *code challenge*;\n2. manda **só o challenge** ao servidor de autorização;\n3. recebe o **código**;\n4. troca o código **junto com o verifier**.\n\nQuem **interceptar o código** não tem o verifier e **não consegue trocá-lo**. Já o parâmetro `state` protege contra **CSRF**.',
      check: {
        kind: 'choice',
        id: 'pk-c',
        prompt: 'O que o PKCE impede?',
        options: [
          { text: 'Que um código interceptado seja trocado por quem não tem o verifier', why: 'Isso.' },
          { text: 'Que o token precise de TLS', why: 'O TLS continua obrigatório.' },
          { text: 'Que exista servidor de autorização', why: 'Ele continua necessário.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Você deixa um **pedido** na loja com a metade de um **bilhete rasgado** (o challenge) e guarda a outra metade (o verifier). Para retirar a encomenda (o token), precisa mostrar a **metade que encaixa**. Quem roubar o comprovante do pedido (o código) não tem a sua metade.',
        check: {
          kind: 'order',
          id: 'pk-r',
          prompt: 'Ordene os passos do PKCE.',
          items: ['Criar o code verifier e calcular o challenge', 'Enviar só o challenge ao servidor', 'Receber o código de autorização', 'Trocar o código junto com o verifier'],
          why: 'Primeiro o segredo; no fim, a prova de que se conhece o segredo.',
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Cada fluxo é recomendado ou desaconselhado?',
      categories: ['Recomendado', 'Desaconselhado'],
      items: [
        { text: 'Código de autorização com PKCE', cat: 0, why: 'Para aplicativos com usuário.' },
        { text: 'Credenciais do cliente', cat: 0, why: 'Para sistemas sem usuário.' },
        { text: 'Implícito', cat: 1, why: 'Expõe o token na URL.' },
        { text: 'Senha do proprietário', cat: 1, why: 'O cliente recebe a senha.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O novo aplicativo de celular do órgão vai acessar a API em nome do servidor público logado. Qual desenho?',
      scenarios: [
        { title: 'Opção A', body: '**Código de autorização com PKCE**, com o login no servidor de autorização.' },
        { title: 'Opção B', body: 'Guardar um **segredo de cliente** dentro do aplicativo e usar o fluxo implícito.' },
      ],
      answer: 0,
      why: 'Aplicativos públicos não guardam segredos com segurança; por isso existe o PKCE. O implícito é desaconselhado.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['PKCE: envia o challenge primeiro', 'Na troca, apresenta o verifier', 'PKCE dispensa o TLS'],
      bug: 2,
      why: 'O PKCE não substitui o TLS; os dois se somam.',
      fixed: 'PKCE se soma ao TLS',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.02.005' },
  ],
  summary: [
    'Código de autorização com PKCE: aplicativos com usuário (web, celular, SPA).',
    'Credenciais do cliente: sistema chama sistema, sem usuário.',
    'Implícito e senha do proprietário: desaconselhados; o OAuth 2.1 os elimina e exige PKCE.',
    'PKCE (RFC 7636): verifier secreto, challenge (SHA-256) enviado antes; código interceptado não serve sem o verifier. state protege contra CSRF.',
  ],
};
