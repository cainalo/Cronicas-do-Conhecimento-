import type { SectionExtras } from '@/content/types';

// Cenas e atividades por seção dos grimórios de Desenvolvimento e de Infraestrutura:
// grim.dev (Tratado das Pontes e dos Selos, região Pontes de Pedra) e
// grim.infra (Atlas das Estradas e das Nuvens, região Encruzilhada das Estradas).
// Todo o conteúdo é autoral e usa apenas fatos apresentados no texto de cada seção.

export const scenesDevInfra: Record<string, SectionExtras> = {
  // ─── Tratado das Pontes e dos Selos (Pontes de Pedra) ────────────────────────

  'cap.dev.01:rest': {
    scene: [
      { who: 'Bubo', text: 'A ponte de registros amanheceu confusa, aprendiz. Dois pedidos idênticos de cadastro chegaram, e agora há dois processos com o mesmo número.' },
      { who: 'Aprendiz', text: 'Alguém clicou duas vezes? Ou a névoa engoliu a primeira resposta e o sistema reenviou o pedido?' },
      { who: 'Arquivista', text: 'E quando tento consultar o processo, a ponte me devolve um código de três dígitos que ninguém aqui sabe ler.' },
      { who: 'Bubo', text: 'Cada método e cada código das pontes tem um sentido preciso. Leia a seção e descubra por que o pedido se duplicou.' },
    ],
    truths: [
      {
        statement: 'O método PUT é idempotente, mas não é seguro.',
        answer: true,
        why: 'PUT altera o estado do servidor, por isso não é seguro. Repetir a mesma substituição deixa o sistema no mesmo estado, por isso é idempotente.',
      },
      {
        statement: 'REST é um protocolo formal, publicado como padrão, com regras obrigatórias de mensagem.',
        answer: false,
        why: 'REST é um estilo arquitetural definido por restrições, descrito por Roy Fielding em sua tese de 2000. Não é protocolo nem padrão formal.',
      },
      {
        statement: 'A resposta 201 Created costuma trazer o cabeçalho Location, que indica onde está o recurso criado.',
        answer: true,
        why: 'A tabela de códigos e o exemplo de diálogo mostram o 201 acompanhado de Location: /api/processos/987.',
      },
    ],
    blanks: [
      {
        sentence: 'A resposta 304 indica que o recurso ___, e o cliente pode usar a cópia em cache.',
        options: ['não foi modificado', 'foi movido permanentemente', 'não foi encontrado', 'está em conflito'],
        answer: 'não foi modificado',
        why: '304 é "não modificado". Movido permanentemente é 301, não encontrado é 404 e conflito é 409.',
      },
      {
        sentence: 'Pelas boas práticas de desenho REST, as URIs usam ___ no plural, como em /processos.',
        options: ['substantivos', 'verbos', 'códigos de status', 'métodos HTTP'],
        answer: 'substantivos',
        why: 'A URI nomeia o recurso com substantivos; o que fazer com ele é dito pelo método HTTP. Por isso GET /processos, e não /listarProcessos.',
      },
    ],
    outro: 'As respostas voltaram a fazer sentido nas Pontes de Pedra. Nenhum pedido repetido vai duplicar um processo sem que você perceba.',
  },

  'cap.dev.01:formatos': {
    scene: [
      { who: 'Arquivista', text: 'O relatório de anexos chegou da ponte vizinha e o leitor recusou. Diz que o arquivo está quebrado.' },
      { who: 'Aprendiz', text: 'Abri e vi aspas simples nas chaves e uma vírgula sobrando depois do último item da lista.' },
      { who: 'Bubo', text: 'E o outro arquivo, em XML, passou na leitura, mas foi barrado na conferência do esquema. São falhas de natureza diferente.' },
      { who: 'Bubo', text: 'Leia sobre JSON e XML e me diga qual regra cada arquivo quebrou.' },
    ],
    truths: [
      {
        statement: 'O JSON tem um tipo nativo próprio para representar datas.',
        answer: false,
        why: 'Os seis tipos do JSON são objeto, array, string, número, booleano e nulo. Datas viajam como string, geralmente no formato ISO 8601.',
      },
      {
        statement: 'Para ser bem formado, um documento XML precisa ter um único elemento raiz.',
        answer: true,
        why: 'Um único elemento raiz é uma das exigências de sintaxe, ao lado de marcações fechadas e bem aninhadas e atributos entre aspas.',
      },
      {
        statement: 'O JSON admite atributos nos elementos, assim como o XML.',
        answer: false,
        why: 'Na comparação da seção, atributos existem no XML e não existem no JSON.',
      },
    ],
    blanks: [
      {
        sentence: 'Um documento XML que, além de bem formado, obedece a um esquema DTD ou XSD é chamado de ___.',
        options: ['válido', 'canônico', 'serializado', 'compacto'],
        answer: 'válido',
        why: 'Validade exige obedecer a um esquema declarado. Todo documento válido é bem formado, mas não o contrário.',
      },
      {
        sentence: 'Para localizar partes de um documento XML, usa-se o ___.',
        options: ['XPath', 'JSON Schema', 'namespace', 'SOAP'],
        answer: 'XPath',
        why: 'XPath localiza partes do documento. Namespaces evitam conflito de nomes, e SOAP é um padrão de serviços web baseado em XML.',
      },
    ],
    outro: 'Os pergaminhos de dados voltaram a circular pelas Pontes. Agora você sabe reconhecer um arquivo bem escrito de um que só parece certo.',
  },

  'cap.dev.01:graphql-ws': {
    scene: [
      { who: 'Morador das Pontes', text: 'O painel de cotações do mercado só atualiza quando alguém recarrega a página. E a ficha de um processo exige seis chamadas para aparecer.' },
      { who: 'Aprendiz', text: 'Seis chamadas para uma tela só? E ainda chegam vários campos que ninguém usa.' },
      { who: 'Bubo', text: 'Dois males antigos, cada um com seu remédio. Um muda a forma de perguntar; o outro mantém a conversa aberta.' },
      { who: 'Bubo', text: 'Leia sobre GraphQL e WebSockets antes de propor qualquer conserto.' },
    ],
    truths: [
      {
        statement: 'Em GraphQL, a operação mutation é a usada para leitura de dados.',
        answer: false,
        why: 'Leitura é feita com query. A mutation altera dados (criar, atualizar, excluir).',
      },
      {
        statement: 'Ao aceitar a abertura de um WebSocket, o servidor responde com 101 Switching Protocols.',
        answer: true,
        why: 'O cliente envia uma requisição HTTP com Upgrade: websocket, e o servidor aceita com 101. A partir daí trafegam quadros WebSocket.',
      },
      {
        statement: 'Server-Sent Events oferecem um canal de ida e volta entre cliente e servidor.',
        answer: false,
        why: 'SSE é um fluxo contínuo só de ida, do servidor para o cliente. O canal de ida e volta persistente é o WebSocket.',
      },
    ],
    blanks: [
      {
        sentence: 'Quando o endpoint devolve campos que o cliente não usa, ocorre o problema de ___.',
        options: ['over-fetching', 'under-fetching', 'N+1 consultas', 'long polling'],
        answer: 'over-fetching',
        why: 'Over-fetching é o excesso de dados. Under-fetching é a falta, que obriga o cliente a fazer várias chamadas.',
      },
      {
        sentence: 'O esquema de URI de um WebSocket cifrado com TLS é ___.',
        options: ['wss://', 'ws://', 'https://', 'tls://'],
        answer: 'wss://',
        why: 'ws:// é o esquema sem cifra; wss:// é o mesmo protocolo protegido por TLS.',
      },
    ],
    outro: 'O painel do mercado agora recebe as novidades sem que ninguém precise perguntar. Mais uma ponte livre da névoa.',
  },

  'cap.dev.01:openapi': {
    scene: [
      { who: 'Aprendiz', text: 'Bubo, a equipe da ponte norte construiu uma API, mas ninguém do outro lado sabe quais parâmetros ela aceita.' },
      { who: 'Bubo', text: 'O pergaminho que descrevia a ponte sumiu na névoa. Sem ele, cada mensageiro adivinha o caminho.' },
      { who: 'Arquivista', text: 'Encontrei um rascunho em YAML com caminhos, respostas e um tal de bearerAuth. Serve para alguma coisa?' },
      { who: 'Bubo', text: 'Serve, e muito. Leia a seção sobre OpenAPI e veja o que esse rascunho pode fazer pelas duas equipes.' },
    ],
    truths: [
      {
        statement: 'A versão 3.0 foi a primeira da especificação lançada já com o nome OpenAPI.',
        answer: true,
        why: 'A versão 2.0 ainda é conhecida como Swagger 2.0. A especificação foi renomeada para OpenAPI em 2016, e a 3.0 foi a primeira com o novo nome.',
      },
      {
        statement: 'Na abordagem code-first, escreve-se primeiro o documento OpenAPI e o código segue o contrato.',
        answer: false,
        why: 'Isso descreve o design-first. No code-first, anotações no código geram o documento automaticamente.',
      },
      {
        statement: 'Para APIs orientadas a eventos e mensagens existe uma especificação própria, o AsyncAPI.',
        answer: true,
        why: 'A seção relaciona o OpenAPI a outros padrões: esquema GraphQL, WSDL para SOAP e AsyncAPI para eventos e mensagens.',
      },
    ],
    blanks: [
      {
        sentence: 'Para serviços SOAP, o equivalente histórico da descrição OpenAPI é o ___.',
        options: ['WSDL', 'AsyncAPI', 'XPath', 'JSON Schema'],
        answer: 'WSDL',
        why: 'A seção indica o WSDL como equivalente histórico para SOAP. O AsyncAPI é para APIs orientadas a eventos.',
      },
      {
        sentence: 'O ___ oferece documentação interativa e permite testar as chamadas da API no navegador.',
        options: ['Swagger UI', 'WSDL', 'XPath', 'AsyncAPI'],
        answer: 'Swagger UI',
        why: 'O Swagger UI faz parte do conjunto de ferramentas em torno da especificação e gera a documentação interativa.',
      },
    ],
    outro: 'O pergaminho da ponte norte foi refeito. As duas equipes falam o mesmo contrato, e a névoa perdeu mais um esconderijo.',
  },

  'cap.dev.02:conceitos': {
    scene: [
      { who: 'Tesoureiro-Mor', text: 'Exijo acesso ao cofre de contratos. Já disse meu nome ao guarda. Não basta?' },
      { who: 'Aprendiz', text: 'Ele disse quem é, mas ninguém conferiu. E mesmo que conferisse, isso daria direito ao cofre?' },
      { who: 'Bubo', text: 'Boa pergunta. A névoa adora misturar três ideias que vivem separadas, e quem as confunde abre portas que deviam ficar fechadas.' },
      { who: 'Bubo', text: 'Leia a seção e separe cada etapa antes de decidir sobre o pedido do Tesoureiro-Mor.' },
    ],
    truths: [
      {
        statement: 'A biometria corresponde ao fator de autenticação "algo que você é".',
        answer: true,
        why: 'Os três fatores são algo que você sabe (senha), algo que você tem (celular, token) e algo que você é (biometria).',
      },
      {
        statement: 'No modelo de sessão guardada no servidor, revogar o acesso é fácil, porque basta apagar a sessão.',
        answer: true,
        why: 'A tabela de sessões e tokens aponta essa vantagem; a desvantagem é exigir armazenamento compartilhado entre servidores.',
      },
      {
        statement: 'No login único (SSO), cada sistema precisa manter senhas próprias do usuário.',
        answer: false,
        why: 'No SSO, um provedor de identidade centraliza contas e autenticação, e os sistemas confiam nele em vez de guardar senhas próprias.',
      },
    ],
    blanks: [
      {
        sentence: 'Senha combinada com um código do aplicativo autenticador no celular configura ___.',
        options: ['autenticação multifator', 'autorização delegada', 'identificação simples', 'login único'],
        answer: 'autenticação multifator',
        why: 'São fatores de categorias diferentes: a senha é algo que você sabe, e o celular é algo que você tem.',
      },
      {
        sentence: 'Uma informação afirmada sobre o sujeito ou sobre o próprio token, como emissor ou validade, chama-se ___.',
        options: ['claim', 'escopo', 'sessão', 'fator'],
        answer: 'claim',
        why: 'Claim é a declaração carregada pelo token; quem o recebe decide se confia no emissor.',
      },
    ],
    outro: 'O guarda do cofre já sabe perguntar quem é, provar quem é e decidir o que pode. O Tesoureiro-Mor vai ter de passar pelas três etapas.',
  },

  'cap.dev.02:oauth': {
    scene: [
      { who: 'Morador das Pontes', text: 'Um aplicativo de agenda pediu minha senha do calendário real para ler meus compromissos. Devo entregar?' },
      { who: 'Bubo', text: 'Espero que não. Há um jeito de o aplicativo ler só o que precisa sem jamais ver a sua senha.' },
      { who: 'Aprendiz', text: 'E se um mensageiro interceptar o código que volta do castelo no meio do caminho?' },
      { who: 'Bubo', text: 'Também há defesa para isso. Leia sobre OAuth 2.0 e me diga quais papéis aparecem nessa história.' },
    ],
    truths: [
      {
        statement: 'No OAuth 2.0, o servidor de recursos é a API que guarda os dados e aceita os tokens.',
        answer: true,
        why: 'Na tabela de papéis, o servidor de recursos é a API, e o servidor de autorização é quem autentica o proprietário e emite os tokens.',
      },
      {
        statement: 'O fluxo de credenciais do cliente é o indicado para um aplicativo de celular em que o usuário concede acesso.',
        answer: false,
        why: 'Credenciais do cliente servem à comunicação entre sistemas, sem usuário. Para celular, o recomendado é o código de autorização com PKCE.',
      },
      {
        statement: 'No fluxo de código de autorização, o parâmetro state protege contra falsificação de requisição entre sites (CSRF).',
        answer: true,
        why: 'A seção atribui ao state a proteção contra CSRF, e ao PKCE a proteção contra o uso de um código interceptado.',
      },
    ],
    blanks: [
      {
        sentence: 'No PKCE, o cliente envia ao servidor de autorização apenas o resumo do segredo, chamado ___.',
        options: ['code challenge', 'code verifier', 'refresh token', 'client_id'],
        answer: 'code challenge',
        why: 'O code verifier é o segredo aleatório; o code challenge é o seu resumo SHA-256. Na troca do código, o cliente apresenta o verifier.',
      },
      {
        sentence: 'A extensão do acesso concedido, como processos:leitura, é definida pelo ___.',
        options: ['escopo', 'proprietário do recurso', 'token de atualização', 'redirect_uri'],
        answer: 'escopo',
        why: 'O escopo limita o que o token permite fazer e aplica o menor privilégio.',
      },
    ],
    outro: 'O morador guardou a senha e o aplicativo recebeu só o que precisava. Nas Pontes de Pedra, cada mensageiro passa com o selo certo.',
  },

  'cap.dev.02:oidc-jwt': {
    scene: [
      { who: 'Arquivista', text: 'Um mensageiro chegou com um selo em três partes separadas por pontos. Diz ser auditor e quer entrar na sala dos pareceres.' },
      { who: 'Aprendiz', text: 'Consegui ler o conteúdo do selo sem chave nenhuma. Isso quer dizer que ele é falso?' },
      { who: 'Bubo', text: 'Não necessariamente. Ler é uma coisa, confiar é outra. Antes de abrir a porta, há uma lista de conferências a fazer.' },
      { who: 'Bubo', text: 'Leia sobre OpenID Connect e JWT e me diga o que verificar nesse selo.' },
    ],
    truths: [
      {
        statement: 'O ID Token do OpenID Connect é destinado ao cliente, e não à API.',
        answer: true,
        why: 'O token de acesso vai para a API; o ID Token informa ao cliente quem se autenticou.',
      },
      {
        statement: 'No JWT, a claim aud identifica o emissor do token.',
        answer: false,
        why: 'O emissor é indicado por iss. A claim aud indica a quem o token se destina.',
      },
      {
        statement: 'O OAuth 2.0 exige que o token de acesso esteja sempre no formato JWT.',
        answer: false,
        why: 'O formato do token de acesso não é definido pelo OAuth: pode ser opaco ou JWT. Quem é sempre JWT é o ID Token do OIDC.',
      },
    ],
    blanks: [
      {
        sentence: 'Para dar sigilo ao conteúdo de um JWT, existe o ___.',
        options: ['JWE', 'JWS', 'HS256', 'UserInfo'],
        answer: 'JWE',
        why: 'O JWT assinado (JWS) não é cifrado e qualquer um lê a carga. O JWE (JSON Web Encryption) é o formato para sigilo.',
      },
      {
        sentence: 'O endereço /.well-known/openid-configuration faz parte do mecanismo de ___ do OIDC.',
        options: ['descoberta', 'UserInfo', 'revogação', 'consentimento'],
        answer: 'descoberta',
        why: 'A descoberta publica os endereços e as chaves públicas do provedor. O UserInfo é outro endpoint, que fornece dados do usuário.',
      },
    ],
    outro: 'O selo foi conferido parte por parte. Quem tentar entrar com assinatura trocada ou prazo vencido vai ficar do lado de fora.',
  },

  'cap.dev.02:resumo': {
    scene: [
      { who: 'Bubo', text: 'A névoa embaralhou as fichas de revisão das Pontes. As definições estão aqui, mas os nomes sumiram.' },
      { who: 'Aprendiz', text: 'Então preciso ligar cada pista ao conceito certo, como num quadro de investigação.' },
      { who: 'Bubo', text: 'Exatamente. É assim que a banca pergunta: descreve o comportamento e espera que você diga o nome.' },
      { who: 'Bubo', text: 'Leia o quadro-resumo com calma. Ele reúne os dois capítulos inteiros.' },
    ],
    truths: [
      {
        statement: 'Quando um sistema chama outro em nome próprio, sem usuário envolvido, o fluxo indicado é o client credentials.',
        answer: true,
        why: 'O quadro-resumo associa "sistema chama sistema, sem usuário" ao fluxo de credenciais do cliente.',
      },
      {
        statement: 'O escopo openid sinaliza um pedido de autenticação do OpenID Connect.',
        answer: true,
        why: 'Saber quem é o usuário, ID Token e escopo openid apontam para o OpenID Connect.',
      },
      {
        statement: 'DELETE não é idempotente, porque a segunda chamada pode receber um 404.',
        answer: false,
        why: 'DELETE é idempotente: o estado final do servidor é o mesmo, ainda que a segunda resposta seja 404.',
      },
    ],
    blanks: [
      {
        sentence: 'Um canal bidirecional persistente, aberto com o cabeçalho Upgrade e a resposta 101, aponta para ___.',
        options: ['WebSocket', 'GraphQL', 'SSE', 'OpenAPI'],
        answer: 'WebSocket',
        why: 'O quadro-resumo associa Upgrade, 101 e canal bidirecional persistente ao WebSocket.',
      },
      {
        sentence: 'Requisição que traz todo o contexto, com servidor que não guarda sessão, descreve a restrição REST ___.',
        options: ['sem estado', 'interface uniforme', 'cache', 'sistema em camadas'],
        answer: 'sem estado',
        why: 'É a restrição stateless: cada requisição traz tudo o que o servidor precisa para atendê-la.',
      },
    ],
    outro: 'As fichas estão em ordem de novo. As Pontes de Pedra guardam seus selos, e você sabe o nome de cada um.',
  },

  'cap.dev.03:logica': {
    scene: [
      { who: 'Arquivista', text: 'O programa que cruza a folha de pagamento com a base de óbitos está rodando desde ontem e não termina.' },
      { who: 'Aprendiz', text: 'Talvez esteja comparando cada servidor com cada registro, um a um?' },
      { who: 'Bubo', text: 'Pode ser. E outro programa, recursivo, caiu com a pilha estourada. A névoa adora laços sem fim e funções sem saída.' },
      { who: 'Bubo', text: 'Leia sobre lógica, recursão e complexidade. Vamos medir o custo antes de culpar a máquina.' },
    ],
    truths: [
      {
        statement: 'O teorema de Böhm e Jacopini mostra que sequência, seleção e repetição bastam para expressar qualquer algoritmo computável.',
        answer: true,
        why: 'Esse resultado de 1966 fundamenta a programação estruturada, sem goto.',
      },
      {
        statement: 'Em a && b, com avaliação em curto-circuito, b é avaliado mesmo quando a é falso.',
        answer: false,
        why: 'No curto-circuito, se a for falso, b nem é avaliado. Por isso é seguro testar se o objeto é nulo antes de usá-lo.',
      },
      {
        statement: 'A busca linear tem melhor caso O(1), quando o item procurado é o primeiro.',
        answer: true,
        why: 'O pior caso é O(n). Quando a questão não especifica, a convenção é falar do pior caso.',
      },
    ],
    blanks: [
      {
        sentence: 'Guardar resultados já calculados, técnica chamada ___, reduz o Fibonacci recursivo de custo exponencial para linear.',
        options: ['memoização', 'curto-circuito', 'iteração', 'encapsulamento'],
        answer: 'memoização',
        why: 'A memoização, base da programação dinâmica, evita recalcular os mesmos valores.',
      },
      {
        sentence: 'Um laço que divide o problema pela metade a cada volta tem complexidade ___.',
        options: ['O(log n)', 'O(n)', 'O(n²)', 'O(2ⁿ)'],
        answer: 'O(log n)',
        why: 'Dividir pela metade a cada passo leva a custo logarítmico, como na busca binária.',
      },
    ],
    outro: 'O cruzamento da folha terminou em minutos depois que você trocou a comparação par a par por uma tabela hash. A névoa não esperava por isso.',
  },

  'cap.dev.03:estruturas': {
    scene: [
      { who: 'Morador das Pontes', text: 'O balcão de atendimento perdeu a ordem de chegada. Quem chegou por último está sendo atendido primeiro.' },
      { who: 'Aprendiz', text: 'Parece que alguém trocou a fila por uma pilha.' },
      { who: 'Bubo', text: 'Bem observado. E no arquivo, a busca por um contrato demora porque a névoa embaralhou as fichas.' },
      { who: 'Bubo', text: 'Leia sobre estruturas de dados, buscas e ordenação. Cada estrutura tem sua vocação.' },
    ],
    truths: [
      {
        statement: 'Em um heap binário, consultar o elemento do topo custa O(1).',
        answer: true,
        why: 'Consultar o topo é O(1); inserir e remover o topo custam O(log n). Por isso o heap implementa bem a fila de prioridade.',
      },
      {
        statement: 'Tabelas hash mantêm os dados ordenados pela chave.',
        answer: false,
        why: 'A função hash espalha as chaves pelo vetor interno. A seção afirma que tabelas hash não mantêm os dados ordenados.',
      },
      {
        statement: 'A busca em largura (BFS) usa uma pilha para controlar os vértices a visitar.',
        answer: false,
        why: 'A BFS usa uma fila. Quem usa pilha (ou recursão) é a busca em profundidade (DFS).',
      },
    ],
    blanks: [
      {
        sentence: 'O percurso ___ de uma árvore binária de busca visita os valores em ordem crescente.',
        options: ['em ordem', 'pré-ordem', 'pós-ordem', 'em largura'],
        answer: 'em ordem',
        why: 'O percurso em ordem visita esquerda, raiz e direita, o que numa ABB produz os valores em ordem crescente.',
      },
      {
        sentence: 'Um algoritmo de ordenação ___ mantém a ordem relativa original de elementos com chaves iguais.',
        options: ['estável', 'balanceado', 'recursivo', 'linear'],
        answer: 'estável',
        why: 'É a definição de estabilidade: ordenar licitações por valor preserva a ordem por data entre as de mesmo valor.',
      },
    ],
    outro: 'O balcão voltou a atender por ordem de chegada, e o arquivo encontra cada contrato em poucos passos. As Pontes respiram melhor.',
  },

  'cap.dev.03:paradigmas': {
    scene: [
      { who: 'Arquivista', text: 'O módulo de relatórios tem uma subclasse para cada combinação de formato e tipo. Qualquer mudança na classe-mãe quebra todas.' },
      { who: 'Aprendiz', text: 'E a função que soma os contratos dá resultados diferentes conforme a hora em que é chamada.' },
      { who: 'Bubo', text: 'Dois sintomas de projeto mal amarrado. A névoa se esconde bem no estado que muda sem aviso.' },
      { who: 'Bubo', text: 'Leia sobre orientação a objetos e programação funcional antes de reescrever qualquer linha.' },
    ],
    truths: [
      {
        statement: 'Uma classe abstrata não pode ser instanciada, mas pode ter métodos concretos.',
        answer: true,
        why: 'A classe abstrata pode combinar métodos abstratos (sem corpo) e concretos; o que ela não admite é ser instanciada.',
      },
      {
        statement: 'Desde o Java 8, interfaces podem ter métodos default com corpo.',
        answer: true,
        why: 'A seção registra essa possibilidade a partir do Java 8.',
      },
      {
        statement: 'Em Java, mudar apenas o tipo de retorno de um método já caracteriza sobrecarga.',
        answer: false,
        why: 'Sobrecarga exige parâmetros diferentes. Dois métodos com os mesmos parâmetros são rejeitados pelo compilador, ainda que o retorno mude.',
      },
    ],
    blanks: [
      {
        sentence: 'O pilar da POO que esconde o estado interno e expõe apenas operações controladas é o ___.',
        options: ['encapsulamento', 'polimorfismo', 'herança', 'abstração'],
        answer: 'encapsulamento',
        why: 'Encapsular é manter atributos privados e oferecer métodos que validam o acesso.',
      },
      {
        sentence: 'O método ___ combina todos os elementos de um vetor em um único valor, a partir de um acumulador inicial.',
        options: ['reduce', 'map', 'filter', 'push'],
        answer: 'reduce',
        why: 'map devolve um vetor do mesmo tamanho, filter devolve zero ou mais elementos, e reduce acumula tudo em um valor.',
      },
    ],
    outro: 'O módulo de relatórios agora tem um exportador em vez de dezenas de subclasses, e a soma dos contratos não depende mais da hora. Bom trabalho.',
  },

  'cap.dev.04:java-python': {
    scene: [
      { who: 'Aprendiz', text: 'O script em Python que soma os empenhos falhou com TypeError, e o sistema em Java do vizinho diz que dois textos iguais são diferentes.' },
      { who: 'Bubo', text: 'Duas linguagens, duas maneiras de tratar tipos. A névoa só se aproveita de quem esquece as regras de cada uma.' },
      { who: 'Arquivista', text: 'E o servidor da ponte reclama que falta a JRE. Achei que bastava o código-fonte.' },
      { who: 'Bubo', text: 'Leia sobre Java e Python. Vamos descobrir onde cada mensageiro tropeçou.' },
    ],
    truths: [
      {
        statement: 'Em Java, para objetos, o operador == compara referências, enquanto equals() compara conteúdo.',
        answer: true,
        why: 'Objetos são tipos por referência: == verifica se é o mesmo objeto, e equals() compara o conteúdo.',
      },
      {
        statement: 'O JDK reúne a JRE, o compilador javac e outras ferramentas de desenvolvimento.',
        answer: true,
        why: 'JVM executa bytecode, JRE soma JVM e bibliotecas, e JDK acrescenta o compilador e as ferramentas.',
      },
      {
        statement: 'Em Python, dicionários não preservam a ordem de inserção das chaves.',
        answer: false,
        why: 'Desde o Python 3.7, a manutenção da ordem de inserção nos dicionários é garantida.',
      },
    ],
    blanks: [
      {
        sentence: 'Em Java, IOException é uma exceção ___, que o compilador obriga a tratar ou declarar.',
        options: ['checked', 'unchecked', 'de tempo de execução', 'do tipo Error'],
        answer: 'checked',
        why: 'IOException é subclasse de Exception sem ser RuntimeException, portanto checked: exige try/catch ou throws.',
      },
      {
        sentence: 'Em Python, o ___ isola as dependências de cada projeto, evitando conflito de versões entre sistemas.',
        options: ['venv', 'PyPI', 'pathlib', 'subprocess'],
        answer: 'venv',
        why: 'O venv cria um ambiente isolado. O PyPI é o repositório de onde o pip baixa os pacotes.',
      },
    ],
    outro: 'O script de empenhos somou tudo certo, e o sistema do vizinho voltou a reconhecer textos iguais. As Pontes ficam mais firmes a cada linguagem dominada.',
  },

  'cap.dev.04:javascript-ts': {
    scene: [
      { who: 'Morador das Pontes', text: 'O painel de prazos diz que o número zero é igual ao texto zero. E um campo vazio aparece como "object" na tela.' },
      { who: 'Aprendiz', text: 'E as mensagens do console saíram fora de ordem: o temporizador de zero milissegundos apareceu por último.' },
      { who: 'Bubo', text: 'Nada disso é feitiço. O JavaScript tem regras próprias de comparação e de filas, e a névoa só engana quem não as conhece.' },
      { who: 'Bubo', text: 'Leia sobre JavaScript, Node.js e TypeScript e explique ao morador o que aconteceu.' },
    ],
    truths: [
      {
        statement: 'Uma função declarada com async sempre retorna uma Promise.',
        answer: true,
        why: 'async e await são sintaxe sobre Promises, e a função async sempre devolve uma Promise.',
      },
      {
        statement: 'Variáveis declaradas com var têm escopo de bloco.',
        answer: false,
        why: 'var tem escopo de função. let e const é que têm escopo de bloco.',
      },
      {
        statement: 'A tipagem do TypeScript é estrutural: dois tipos com a mesma forma são compatíveis, ainda que tenham nomes diferentes.',
        answer: true,
        why: 'A seção define a tipagem do TypeScript como estrutural, baseada na forma do tipo e não no nome.',
      },
    ],
    blanks: [
      {
        sentence: 'O método ___ espera todas as Promises e informa o resultado de cada uma.',
        options: ['Promise.allSettled', 'Promise.all', 'Promise.race', 'Promise.any'],
        answer: 'Promise.allSettled',
        why: 'Promise.all rejeita na primeira rejeição, race assume a primeira que se resolver, any cumpre com a primeira que cumprir.',
      },
      {
        sentence: 'No TypeScript, ___ obriga a verificar o tipo antes de usar o valor, ao contrário de any.',
        options: ['unknown', 'never', 'void', 'object'],
        answer: 'unknown',
        why: 'any desliga a verificação; unknown exige verificar o tipo antes de usar o valor.',
      },
    ],
    outro: 'O painel de prazos compara com igualdade estrita e mostra as mensagens na ordem que você previu. A névoa perdeu o truque.',
  },

  'cap.dev.04:web-react': {
    scene: [
      { who: 'Arquivista', text: 'O formulário de denúncias aceitou um e-mail inválido. Alguém contornou a checagem do navegador e enviou assim mesmo.' },
      { who: 'Aprendiz', text: 'E o leitor de tela da biblioteca não consegue anunciar os campos. Parece que estão sem rótulo.' },
      { who: 'Bubo', text: 'Sem falar na lista de processos que troca os itens quando alguém insere um no meio. A névoa gosta de páginas descuidadas.' },
      { who: 'Bubo', text: 'Leia sobre HTML5, CSS3 e React. Cada camada tem sua responsabilidade.' },
    ],
    truths: [
      {
        statement: 'Com box-sizing: content-box, um elemento com width: 200px, padding: 20px e border: 5px ocupa 250 px de largura.',
        answer: true,
        why: 'No content-box, width vale só para o conteúdo: 200 + 2 × 20 + 2 × 5 = 250 px.',
      },
      {
        statement: 'Em empate de especificidade no CSS, vence a regra declarada primeiro.',
        answer: false,
        why: 'Com especificidade igual, vence a regra declarada por último.',
      },
      {
        statement: 'Usar o índice do vetor como key é a escolha recomendada para listas React que podem ser reordenadas.',
        answer: false,
        why: 'O índice causa erros quando a lista é reordenada ou recebe itens no meio. Prefere-se um identificador estável do dado.',
      },
    ],
    blanks: [
      {
        sentence: 'O elemento HTML5 ___ marca conteúdo independente, que faz sentido sozinho, como uma notícia ou um acórdão.',
        options: ['<article>', '<section>', '<aside>', '<main>'],
        answer: '<article>',
        why: 'section agrupa por tema com título, aside traz conteúdo lateral relacionado, e main é o conteúdo principal da página.',
      },
      {
        sentence: 'Em React, os dados que o componente pai passa ao filho, somente leitura para este, são as ___.',
        options: ['props', 'keys', 'hooks', 'classes'],
        answer: 'props',
        why: 'Props descem do pai para o filho e não podem ser alteradas por ele. O estado é o dado interno que muda com o tempo.',
      },
    ],
    outro: 'O formulário agora valida também no servidor, cada campo tem rótulo e a lista não troca mais os itens. As Pontes ficaram acessíveis a todos.',
  },

  'cap.dev.04:pacotes': {
    scene: [
      { who: 'Morador das Pontes', text: 'Ontem o painel da ponte funcionava. Hoje, sem mudar uma linha, o build quebrou depois que as dependências foram instaladas de novo.' },
      { who: 'Aprendiz', text: 'Alguma biblioteca subiu de versão sozinha? O package.json aceitava versões próximas da original.' },
      { who: 'Bubo', text: 'E ninguém guardou o registro exato da árvore inteira. A névoa adora versões soltas.' },
      { who: 'Bubo', text: 'Leia sobre dependências, empacotamento e publicação. Vamos travar essa ponte.' },
    ],
    truths: [
      {
        statement: 'Em integração contínua, npm ci instala estritamente pelo lockfile e falha se ele estiver inconsistente com o package.json.',
        answer: true,
        why: 'Além disso, o npm ci apaga o node_modules antes de instalar.',
      },
      {
        statement: 'Uma versão já publicada no registro do npm pode ser republicada com o mesmo número depois de corrigida.',
        answer: false,
        why: 'Uma versão publicada não pode ser republicada com o mesmo número; correções exigem nova versão.',
      },
      {
        statement: 'No Maven, a fase install envia o artefato para o repositório remoto.',
        answer: false,
        why: 'install copia o artefato para o repositório local. Quem envia ao repositório remoto é a fase deploy.',
      },
    ],
    blanks: [
      {
        sentence: 'Pelo SemVer, acrescentar funcionalidade nova compatível leva a versão 2.4.1 para ___.',
        options: ['2.5.0', '3.0.0', '2.4.2', '2.4.1-beta.1'],
        answer: '2.5.0',
        why: 'Funcionalidade nova compatível incrementa o MINOR e zera o PATCH. MAJOR é para mudança incompatível; PATCH, para correção.',
      },
      {
        sentence: 'No package.json, ferramentas usadas só para desenvolver, testar e construir ficam em ___.',
        options: ['devDependencies', 'dependencies', 'peerDependencies', 'scripts'],
        answer: 'devDependencies',
        why: 'dependencies são necessárias em produção, e peerDependencies são as que o projeto hospedeiro deve fornecer.',
      },
    ],
    outro: 'Com o lockfile versionado, o painel volta a ser construído igual em qualquer máquina. As Pontes de Pedra estão firmes, do alicerce ao parapeito.',
  },

  // ─── Atlas das Estradas e das Nuvens (Encruzilhada das Estradas) ─────────────

  'cap.infra.01:tcpip': {
    scene: [
      { who: 'Bubo', text: 'Na Encruzilhada, as mensagens de voz chegam picotadas, mas os contratos enviados pela mesma estrada chegam inteiros e em ordem.' },
      { who: 'Aprendiz', text: 'Mesma estrada, comportamentos diferentes. Será que cada carga viaja num tipo de carroça?' },
      { who: 'Morador da Encruzilhada', text: 'E a placa que indicava a porta do acesso remoto sumiu. Ninguém sabe mais para onde mandar a conexão.' },
      { who: 'Bubo', text: 'Leia sobre a arquitetura TCP/IP e as portas. Vamos repor as placas da Encruzilhada.' },
    ],
    truths: [
      {
        statement: 'Na arquitetura TCP/IP, o IP e o ICMP pertencem à camada de Internet.',
        answer: true,
        why: 'A camada de Internet do TCP/IP corresponde à camada de rede do OSI, onde estão IP e ICMP.',
      },
      {
        statement: 'A unidade de dados da camada de enlace é chamada de segmento.',
        answer: false,
        why: 'No enlace a unidade é o quadro. Segmento é a unidade do TCP na camada de transporte.',
      },
      {
        statement: 'O RDP usa a porta 3389 sobre TCP.',
        answer: true,
        why: 'Está na tabela de portas da seção: RDP, 3389, TCP.',
      },
    ],
    blanks: [
      {
        sentence: 'O aperto de mão em três vias do TCP segue a sequência SYN, ___ e ACK.',
        options: ['SYN-ACK', 'FIN', 'RST', 'ACK-ACK'],
        answer: 'SYN-ACK',
        why: 'O cliente envia SYN, o servidor responde SYN-ACK, e o cliente confirma com ACK.',
      },
      {
        sentence: 'O traceroute usa o campo ___ para descobrir o caminho até o destino.',
        options: ['TTL', 'checksum', 'porta', 'SYN'],
        answer: 'TTL',
        why: 'A seção explica que o traceroute (tracert no Windows) usa o campo TTL; o ping usa echo request e echo reply do ICMP.',
      },
    ],
    outro: 'As placas da Encruzilhada estão de volta, cada serviço na sua porta. A névoa já não decide por onde as cargas passam.',
  },

  'cap.infra.01:enderecos': {
    scene: [
      { who: 'Morador da Encruzilhada', text: 'Os computadores do posto de pedágio receberam endereços começando por 169.254, e nenhum consegue sair para a rede.' },
      { who: 'Aprendiz', text: 'Parece um endereço que a máquina atribuiu a si mesma. Será que o servidor de endereços falhou?' },
      { who: 'Bubo', text: 'Pode ser. E o mapa de sub-redes que o capuz cinza deixou para trás tem contas de hosts que não fecham.' },
      { who: 'Bubo', text: 'Leia sobre endereçamento IPv4 e IPv6 e confira cada faixa do mapa.' },
    ],
    truths: [
      {
        statement: 'Um prefixo /27 oferece 30 hosts utilizáveis.',
        answer: true,
        why: 'Um /27 tem 5 bits de host: 2⁵ = 32 endereços, menos rede e broadcast, dá 30 hosts.',
      },
      {
        statement: 'O endereço 172.20.5.10 pertence a uma faixa privada da RFC 1918.',
        answer: true,
        why: 'A faixa 172.16.0.0/12 vai de 172.16 a 172.31, e 172.20 está dentro dela.',
      },
      {
        statement: 'O cabeçalho do IPv6 tem tamanho variável e inclui checksum.',
        answer: false,
        why: 'Isso descreve o IPv4. O cabeçalho do IPv6 é fixo, de 40 bytes, e não tem checksum.',
      },
    ],
    blanks: [
      {
        sentence: 'O endereço de loopback no IPv6 é ___.',
        options: ['::1', 'fe80::1', '127.0.0.1', 'ff00::'],
        answer: '::1',
        why: '127.0.0.1 é o loopback do IPv4, e fe80::/10 é a faixa link-local do IPv6.',
      },
      {
        sentence: 'No IPv6, a autoconfiguração de endereços tem o nome de ___.',
        options: ['SLAAC', 'NAT', 'CIDR', 'DORA'],
        answer: 'SLAAC',
        why: 'O IPv6 se configura por SLAAC (autoconfiguração) ou DHCPv6. NAT traduz endereços, CIDR é notação de prefixo e DORA são as mensagens do DHCP.',
      },
    ],
    outro: 'O mapa de sub-redes foi refeito com contas certas. O capuz cinza vai ter de inventar outro truque para confundir a Encruzilhada.',
  },

  'cap.infra.01:servicos': {
    scene: [
      { who: 'Arquivista', text: 'O portal do Tribunal some e volta. Às vezes o nome leva ao endereço certo, às vezes a lugar nenhum.' },
      { who: 'Aprendiz', text: 'E os e-mails da Torre estão sendo devolvidos. Alguém mexeu nos registros do domínio?' },
      { who: 'Bubo', text: 'A névoa gosta de apagar as listas que traduzem nomes em endereços. Sem elas, nenhum mensageiro acha a porta.' },
      { who: 'Bubo', text: 'Leia sobre DNS, DHCP e os protocolos de aplicação. A pista está nos registros.' },
    ],
    truths: [
      {
        statement: 'O registro PTR faz a resolução reversa, de endereço IP para nome.',
        answer: true,
        why: 'Na tabela de registros DNS, PTR é a resolução reversa.',
      },
      {
        statement: 'Na consulta iterativa de DNS, o resolvedor faz todo o trabalho e devolve a resposta final ao cliente.',
        answer: false,
        why: 'Isso é a consulta recursiva. Na iterativa, cada servidor indica o próximo a ser consultado.',
      },
      {
        statement: 'O IMAP mantém as mensagens no servidor e sincroniza as pastas.',
        answer: true,
        why: 'Para ler e-mail, o IMAP mantém as mensagens no servidor; o POP3 as baixa.',
      },
    ],
    blanks: [
      {
        sentence: 'Na sigla DORA do DHCP, a mensagem em que o cliente pede o endereço oferecido é o ___.',
        options: ['Request', 'Offer', 'Discover', 'Acknowledge'],
        answer: 'Request',
        why: 'Discover procura servidores, Offer oferece um endereço, Request o pede e Acknowledge confirma.',
      },
      {
        sentence: 'O HTTP/2 atende várias requisições na mesma conexão graças à ___.',
        options: ['multiplexação', 'resolução reversa', 'transferência de zona', 'concessão'],
        answer: 'multiplexação',
        why: 'O HTTP/2 trouxe formato binário, multiplexação, compressão de cabeçalhos (HPACK) e prioridades.',
      },
    ],
    outro: 'Os registros do domínio foram restaurados e os e-mails voltaram a chegar à Torre. A Encruzilhada reencontrou seus nomes.',
  },

  'cap.infra.01:perimetro': {
    scene: [
      { who: 'Morador da Encruzilhada', text: 'Um servidor do portal foi invadido na semana passada, mas o invasor não chegou aos arquivos internos. Como pode?' },
      { who: 'Bubo', text: 'Alguém, no passado, separou bem as muralhas. Agora a névoa tenta derrubá-las, e precisamos entender cada uma.' },
      { who: 'Aprendiz', text: 'E o escritório regional precisa falar com a sede pela internet sem que ninguém leia as mensagens no caminho.' },
      { who: 'Bubo', text: 'Leia sobre firewalls, VPN, proxies e balanceamento. A Encruzilhada depende dessas defesas.' },
    ],
    truths: [
      {
        statement: 'Um firewall com estado libera automaticamente as respostas de conexões iniciadas de dentro.',
        answer: true,
        why: 'O firewall stateful acompanha as conexões, o que o filtro de pacotes sem estado não faz.',
      },
      {
        statement: 'No IPsec, o protocolo AH cifra o conteúdo, enquanto o ESP apenas autentica.',
        answer: false,
        why: 'É o inverso: o AH autentica, e o ESP cifra e autentica.',
      },
      {
        statement: 'Um balanceador de camada 4 decide o destino pelo caminho e pelos cookies da requisição HTTP.',
        answer: false,
        why: 'A camada 4 decide por IP e porta, sem olhar o conteúdo. Decidir pelo conteúdo HTTP é papel da camada 7.',
      },
    ],
    blanks: [
      {
        sentence: 'A sub-rede intermediária onde ficam os serviços expostos à internet, separada da rede interna por firewall, chama-se ___.',
        options: ['DMZ', 'VPN', 'NAT', 'WAF'],
        answer: 'DMZ',
        why: 'Na DMZ, um servidor comprometido ainda não dá ao atacante acesso à rede interna.',
      },
      {
        sentence: 'No modo Enterprise do Wi-Fi, cada usuário é autenticado por 802.1X com um servidor ___.',
        options: ['RADIUS', 'DHCP', 'DNS', 'proxy'],
        answer: 'RADIUS',
        why: 'O modo Enterprise substitui a senha compartilhada pela autenticação individual via 802.1X e RADIUS.',
      },
    ],
    outro: 'As muralhas da Encruzilhada estão de pé, e o túnel até o escritório regional está cifrado. A névoa encontra cada vez menos frestas.',
  },

  'cap.infra.02:modelos': {
    scene: [
      { who: 'Tesoureiro-Mor', text: 'Contratamos nuvem. Agora a segurança dos dados é problema do provedor, não meu.' },
      { who: 'Aprendiz', text: 'Será? O contrato fala em máquinas virtuais, e as atualizações do sistema estão atrasadas há meses.' },
      { who: 'Bubo', text: 'Eis um mal-entendido que a névoa adora espalhar. Cada modelo divide as tarefas de um jeito.' },
      { who: 'Bubo', text: 'Leia sobre conceito, modelos de serviço e de implantação antes de responder ao Tesoureiro-Mor.' },
    ],
    truths: [
      {
        statement: 'A definição de computação em nuvem mais citada é a do NIST, na publicação SP 800-145.',
        answer: true,
        why: 'A seção parte dessa definição, de 2011, e das cinco características essenciais que ela lista.',
      },
      {
        statement: 'No modelo PaaS, o cliente gerencia o sistema operacional das máquinas.',
        answer: false,
        why: 'Em PaaS o provedor entrega infraestrutura, sistema operacional e ambiente de execução; o cliente gerencia aplicação e dados.',
      },
      {
        statement: 'A nuvem comunitária atende um grupo de organizações com interesses comuns, como órgãos públicos.',
        answer: true,
        why: 'É a definição de nuvem comunitária na tabela de modelos de implantação.',
      },
    ],
    blanks: [
      {
        sentence: 'A característica essencial em que o uso é monitorado e cobrado ou controlado chama-se ___.',
        options: ['serviço medido', 'elasticidade rápida', 'agrupamento de recursos', 'autoatendimento sob demanda'],
        answer: 'serviço medido',
        why: 'Serviço medido é o "pague pelo que usar". As demais são outras características essenciais do NIST.',
      },
      {
        sentence: 'Em ___, o provedor entrega a aplicação completa, e o cliente cuida da configuração e dos dados de uso.',
        options: ['SaaS', 'IaaS', 'PaaS', 'nuvem privada'],
        answer: 'SaaS',
        why: 'No SaaS quase tudo fica com o provedor, exceto o controle de acesso dos usuários e os dados.',
      },
    ],
    outro: 'O Tesoureiro-Mor ouviu calado: em IaaS, as atualizações do sistema são tarefa do cliente. Uma nuvem a menos sobre a Encruzilhada.',
  },

  'cap.infra.02:escala': {
    scene: [
      { who: 'Morador da Encruzilhada', text: 'No último dia do prazo de prestação de contas, o portal caiu. Nos outros dias, os servidores ficam ociosos.' },
      { who: 'Aprendiz', text: 'Então precisamos de mais capacidade só quando a procura aumenta, e de menos quando ela some.' },
      { who: 'Bubo', text: 'E de um plano para quando tudo falhar. A névoa costuma atacar justamente no dia de maior movimento.' },
      { who: 'Bubo', text: 'Leia sobre serverless, escala e alta disponibilidade. Vamos preparar o portal para o próximo prazo.' },
    ],
    truths: [
      {
        statement: 'A escala horizontal exige que a aplicação esteja preparada, por exemplo sem guardar sessão localmente.',
        answer: true,
        why: 'Ao distribuir a carga entre várias máquinas, qualquer uma precisa atender qualquer requisição, como nas APIs REST sem estado.',
      },
      {
        statement: 'Uma disponibilidade de 99,9% admite cerca de 53 minutos de indisponibilidade por ano.',
        answer: false,
        why: '99,9% admite cerca de 8 horas e 46 minutos por ano. Cerca de 53 minutos corresponde a 99,99%.',
      },
      {
        statement: 'Zonas de disponibilidade são datacenters independentes de uma mesma região.',
        answer: true,
        why: 'Distribuir o serviço entre zonas elimina pontos únicos de falha dentro da região.',
      },
    ],
    blanks: [
      {
        sentence: 'A capacidade de escalar para cima e para baixo automaticamente, acompanhando a demanda, chama-se ___.',
        options: ['elasticidade', 'escala vertical', 'alta disponibilidade', 'observabilidade'],
        answer: 'elasticidade',
        why: 'Escala vertical é aumentar uma máquina; alta disponibilidade é resistir a falhas; elasticidade é acompanhar a demanda nos dois sentidos.',
      },
      {
        sentence: 'No serverless (FaaS), a cobrança típica é feita por ___.',
        options: ['execução e tempo de execução', 'tempo ligado', 'recursos do cluster', 'número de usuários'],
        answer: 'execução e tempo de execução',
        why: 'Máquinas virtuais costumam ser cobradas por tempo ligado e containers pelos recursos do cluster.',
      },
    ],
    outro: 'O portal agora cresce no dia do prazo e encolhe depois, com réplicas em zonas diferentes. A névoa vai encontrá-lo de pé.',
  },

  'cap.infra.03:processos': {
    scene: [
      { who: 'Arquivista', text: 'O sistema de protocolo da Encruzilhada está lentíssimo. O disco não para de trabalhar e nada anda.' },
      { who: 'Aprendiz', text: 'Um processo de relatório está com a CPU no máximo. Posso simplesmente derrubá-lo?' },
      { who: 'Bubo', text: 'Pode, mas há modos gentis e modos brutos de pedir que um processo pare. E um serviço que sobe agora nem sempre sobe no próximo boot.' },
      { who: 'Bubo', text: 'Leia sobre processos, memória e serviços antes de tocar no servidor.' },
    ],
    truths: [
      {
        statement: 'Um processo no estado bloqueado aguarda um evento, como a leitura de disco ou a resposta de rede.',
        answer: true,
        why: 'O processo pronto aguarda só a CPU; o bloqueado espera um evento externo.',
      },
      {
        statement: 'O sinal SIGKILL pode ser capturado pelo programa para que ele salve seus dados antes de encerrar.',
        answer: false,
        why: 'SIGKILL (9) é encerramento forçado e não pode ser capturado nem ignorado. Quem permite ao programa se preparar é o SIGTERM.',
      },
      {
        statement: 'No Linux, o superusuário root tem UID 0.',
        answer: true,
        why: 'A seção identifica o root pelo UID 0; usuários autorizados executam comandos administrativos com sudo.',
      },
    ],
    blanks: [
      {
        sentence: 'Quando o processo acessa uma página que não está na RAM, ocorre uma ___.',
        options: ['falta de página', 'troca de contexto', 'preempção', 'concessão'],
        answer: 'falta de página',
        why: 'Na falta de página (page fault), o sistema busca a página no disco. Troca de contexto é trocar o processo que usa a CPU.',
      },
      {
        sentence: 'No Linux com systemd, os logs do serviço nginx são consultados com ___.',
        options: ['journalctl -u nginx', 'systemctl enable nginx', 'free -h', 'ps aux'],
        answer: 'journalctl -u nginx',
        why: 'systemctl enable configura a subida no boot, free -h mostra memória e ps aux lista processos.',
      },
    ],
    outro: 'O protocolo voltou a andar, e o serviço continua configurado para subir no boot. As engrenagens da Encruzilhada giram no seu ritmo.',
  },

  'cap.infra.03:arquivos': {
    scene: [
      { who: 'Arquivista', text: 'A pasta de papéis de trabalho da auditoria amanheceu aberta para qualquer um. Alguém trocou as permissões durante a noite.' },
      { who: 'Aprendiz', text: 'E no servidor Windows, a coordenação deveria só ler, mas consegue apagar arquivos.' },
      { who: 'Bubo', text: 'A névoa não precisa roubar documentos se puder deixá-los à mercê de todos. Precisamos ler cada trio de letras com cuidado.' },
      { who: 'Bubo', text: 'Leia sobre sistemas de arquivos e permissões. A resposta está na saída do ls -l.' },
    ],
    truths: [
      {
        statement: 'A permissão octal 755 corresponde a rwxr-xr-x.',
        answer: true,
        why: '7 = 4+2+1 (rwx) para o dono; 5 = 4+1 (r-x) para grupo e outros.',
      },
      {
        statement: 'Com umask 022, arquivos novos nascem com permissão 644.',
        answer: true,
        why: 'A seção dá esse exemplo: com umask 022, arquivos nascem 644 e diretórios 755.',
      },
      {
        statement: 'No NTFS, uma permissão concedida prevalece sobre uma negação explícita no mesmo nível.',
        answer: false,
        why: 'A negação explícita prevalece sobre a permissão concedida no mesmo nível; por isso recomenda-se usar Negar com moderação.',
      },
    ],
    blanks: [
      {
        sentence: 'No Linux, os hashes de senha ficam em ___, arquivo legível apenas pelo root.',
        options: ['/etc/shadow', '/etc/passwd', '/var/log', '/proc'],
        answer: '/etc/shadow',
        why: 'Os usuários ficam em /etc/passwd, mas os hashes de senha ficam em /etc/shadow.',
      },
      {
        sentence: 'O comando ___ cria um link simbólico, que fica quebrado se o original for apagado.',
        options: ['ln -s', 'ln', 'chgrp', 'chown'],
        answer: 'ln -s',
        why: 'ln sem opção cria um hard link, outro nome para o mesmo inode. A opção -s cria o link simbólico.',
      },
    ],
    outro: 'A pasta da auditoria voltou a ser da equipe, e a coordenação só lê. Os arquivos da Encruzilhada estão protegidos outra vez.',
  },

  'cap.infra.03:shell': {
    scene: [
      { who: 'Morador da Encruzilhada', text: 'O backup noturno parou de rodar, e o arquivo de registro foi apagado e recomeçado do zero.' },
      { who: 'Aprendiz', text: 'Talvez alguém tenha trocado um sinal de redirecionamento no script. Ou o agendamento sumiu.' },
      { who: 'Bubo', text: 'E no servidor Windows, um script de inventário se recusa a rodar. Shell e PowerShell pensam de maneiras diferentes.' },
      { who: 'Bubo', text: 'Leia sobre shell, PowerShell e scripts. Vamos refazer a rotina do backup.' },
    ],
    truths: [
      {
        statement: 'Em um script bash, $# informa a quantidade de argumentos recebidos.',
        answer: true,
        why: '$1 e $2 são os argumentos, $# é a quantidade deles e $? é o código de saída do último comando.',
      },
      {
        statement: 'No find, a opção -mtime +30 seleciona arquivos modificados há menos de 30 dias.',
        answer: false,
        why: '-mtime +30 significa modificado há mais de 30 dias.',
      },
      {
        statement: 'Os cmdlets do PowerShell seguem o formato Verbo-Substantivo, como Get-Process.',
        answer: true,
        why: 'Get-Service, Set-Location e Stop-Process são outros exemplos do mesmo padrão.',
      },
    ],
    blanks: [
      {
        sentence: 'No PowerShell, o cmdlet ___ mostra as propriedades e os métodos de um objeto.',
        options: ['Get-Member', 'Get-Help', 'Get-Command', 'Select-Object'],
        answer: 'Get-Member',
        why: 'Get-Help traz a ajuda, Get-Command lista comandos e Select-Object escolhe propriedades ou quantidade.',
      },
      {
        sentence: 'A linha de cron 30 2 * * 1-5 executa o comando às 2h30 de ___.',
        options: ['segunda a sexta', 'todos os dias', 'domingo a quinta', 'sábado e domingo'],
        answer: 'segunda a sexta',
        why: 'Os campos são minuto, hora, dia do mês, mês e dia da semana; 1-5 no último campo indica de segunda a sexta.',
      },
    ],
    outro: 'O backup voltou a rodar de madrugada e o registro só cresce, sem ser apagado. As estradas da Encruzilhada têm rotina outra vez.',
  },

  'cap.infra.03:diretorio': {
    scene: [
      { who: 'Arquivista', text: 'Hoje cedo ninguém conseguia entrar nos computadores da Torre. O controlador de domínio recusava todos os logons.' },
      { who: 'Aprendiz', text: 'Descobri que o relógio do servidor estava adiantado em quase meia hora. Será coincidência?' },
      { who: 'Bubo', text: 'Na Ordem não acreditamos em coincidências. E há mais: um sistema web consulta o diretório enviando senhas sem proteção.' },
      { who: 'Bubo', text: 'Leia sobre Active Directory, LDAP, virtualização e containers. A névoa deixou rastros em cada um.' },
    ],
    truths: [
      {
        statement: 'No Kerberos, o usuário recebe um TGT do KDC no momento do logon.',
        answer: true,
        why: 'Com o TGT, o usuário depois obtém tickets de serviço, sem enviar a senha pela rede.',
      },
      {
        statement: 'No Active Directory, grupos de distribuição são os que recebem permissões em recursos.',
        answer: false,
        why: 'Permissões vão para grupos de segurança. Grupos de distribuição servem a listas de e-mail.',
      },
      {
        statement: 'Na ordem LSDOU, a GPO da OU é aplicada por último e, em conflito, prevalece, salvo opções como Imposto ou Bloquear herança.',
        answer: true,
        why: 'As GPOs são aplicadas de Local a OU, e prevalece a aplicada por último, a mais próxima do objeto.',
      },
    ],
    blanks: [
      {
        sentence: 'No nome distinto CN=Maria Souza,OU=Auditoria,DC=tribunal,DC=local, a sigla DC significa ___.',
        options: ['componente de domínio', 'controlador de domínio', 'diretório central', 'domínio confiável'],
        answer: 'componente de domínio',
        why: 'No DN, DC é cada parte do nome DNS. A mesma sigla, em outro contexto, designa o controlador de domínio, o que costuma confundir.',
      },
      {
        sentence: 'Containers Linux usam ___ para ter uma visão própria de processos, rede, pontos de montagem e nome do host.',
        options: ['namespaces', 'cgroups', 'snapshots', 'GPOs'],
        answer: 'namespaces',
        why: 'Os namespaces isolam a visão do container; os cgroups limitam e contabilizam CPU, memória e E/S.',
      },
    ],
    outro: 'O relógio foi acertado, os logons voltaram e o sistema web passou a usar LDAPS. A Encruzilhada inteira está sinalizada, e a névoa recua para longe.',
  },
};
