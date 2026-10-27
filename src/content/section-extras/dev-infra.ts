import type { SectionExtras } from '@/content/types';

// questões complementares por seção dos grimórios de Desenvolvimento e de Infraestrutura:
// grim.dev (Desenvolvimento de software, disciplina Desenvolvimento) e
// grim.infra (Infraestrutura e redes, disciplina Infraestrutura).
// Todo o conteúdo é autoral e usa apenas fatos apresentados no texto de cada seção.

export const extrasDevInfra: Record<string, SectionExtras> = {
  // ─── Desenvolvimento de software (Desenvolvimento) ────────────────────────

  'cap.dev.01:rest': {
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
  },

  'cap.dev.01:formatos': {
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
  },

  'cap.dev.01:graphql-ws': {
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
  },

  'cap.dev.01:openapi': {
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
  },

  'cap.dev.02:conceitos': {
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
  },

  'cap.dev.02:oauth': {
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
  },

  'cap.dev.02:oidc-jwt': {
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
  },

  'cap.dev.02:resumo': {
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
  },

  'cap.dev.03:logica': {
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
  },

  'cap.dev.03:estruturas': {
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
  },

  'cap.dev.03:paradigmas': {
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
  },

  'cap.dev.04:java-python': {
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
  },

  'cap.dev.04:javascript-ts': {
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
  },

  'cap.dev.04:web-react': {
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
  },

  'cap.dev.04:pacotes': {
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
  },

  // ─── Infraestrutura e redes (Infraestrutura) ─────────────

  'cap.infra.01:tcpip': {
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
  },

  'cap.infra.01:enderecos': {
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
  },

  'cap.infra.01:servicos': {
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
  },

  'cap.infra.01:perimetro': {
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
  },

  'cap.infra.02:modelos': {
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
  },

  'cap.infra.02:escala': {
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
  },

  'cap.infra.03:processos': {
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
  },

  'cap.infra.03:arquivos': {
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
  },

  'cap.infra.03:shell': {
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
  },

  'cap.infra.03:diretorio': {
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
  },
};
