// Série "Documentação de APIs" (cap.dev.01, trecho openapi), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do WSDL ao OpenAPI 3.0; as seguintes ensinam o documento OpenAPI
// e depois os usos e as abordagens, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (04-openapi.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.01', sectionId: 'openapi' } as const;

export const devOapHistoria: MicroLesson = {
  ...S,
  id: 'dev.openapi.1',
  series: { id: 'dev.openapi', order: 1 },
  title: 'Do WSDL ao OpenAPI',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você recebe uma API pronta, mas ninguém explica quais endereços existem nem o que eles devolvem. O que faltou?',
    options: [
      { text: 'Uma documentação da API', why: 'Isso. Esta aula conta como essa documentação foi padronizada.' },
      { text: 'Um banco de dados maior', why: 'O banco não explica a API a quem vai usá-la.' },
      { text: 'Um servidor mais rápido', why: 'Velocidade não ensina ninguém a usar a API.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'wsdl',
      part: 'A história',
      title: '2001: o WSDL',
      art: 'livro',
      goal: 'Saber que o WSDL descrevia serviços SOAP em XML.',
      explain:
        'Em **2001**, os serviços web do tipo **SOAP** ganharam uma forma padronizada de se descrever: o **WSDL**.\n\nEle era um documento em **XML** que listava as **operações** do serviço, o que cada uma recebia e o que devolvia.\n\nEra **completo**, mas **difícil de ler**: arquivos longos, feitos mais para máquinas do que para pessoas.',
      check: {
        kind: 'choice',
        id: 'ws-c',
        prompt: 'O que o WSDL descrevia?',
        options: [
          { text: 'As operações de serviços SOAP, em XML', why: 'Isso.' },
          { text: 'APIs REST, em YAML', why: 'YAML e REST vêm depois, com o Swagger e o OpenAPI.' },
          { text: 'Tabelas de banco de dados', why: 'Descrevia serviços web, não tabelas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **manual técnico de 300 páginas** que vem com um aparelho: tudo está lá, mas ninguém lê por prazer. O WSDL era esse manual para os serviços **SOAP**, escrito em **XML**.',
        check: {
          kind: 'choice',
          id: 'ws-r',
          prompt: 'Qual era o ponto fraco do WSDL?',
          options: [
            { text: 'Era difícil de ler', why: 'Isso: completo, mas pesado.' },
            { text: 'Não descrevia as operações', why: 'Descrevia, e com detalhe.' },
            { text: 'Só funcionava em celular', why: 'Não tinha relação com celular.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'swagger',
      part: 'A história',
      title: '2010 e 2011: o Swagger',
      art: 'professores',
      goal: 'Saber quem criou o Swagger e para quê.',
      explain:
        'Com a popularização do **REST**, faltava um jeito simples de descrever essas APIs.\n\nEntre **2010 e 2011**, **Tony Tam**, na empresa **Wordnik**, criou o **Swagger**: um formato leve para descrever APIs REST e, a partir dele, **gerar uma documentação interativa**.\n\nA ideia pegou: muitas equipes passaram a publicar suas APIs com páginas do Swagger.',
      check: {
        kind: 'choice',
        id: 'sw-c',
        prompt: 'O Swagger foi criado para descrever:',
        options: [
          { text: 'APIs REST, de forma simples', why: 'Isso.' },
          { text: 'Serviços SOAP, em WSDL', why: 'Para SOAP já existia o WSDL.' },
          { text: 'Planilhas de orçamento', why: 'É um formato para APIs.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Se o WSDL era o manual de 300 páginas, o **Swagger** foi o **guia rápido** com botões para testar: leve, legível e feito para APIs **REST**. Quem o criou foi **Tony Tam**, na **Wordnik**.',
        check: {
          kind: 'choice',
          id: 'sw-r',
          prompt: 'Onde o Swagger nasceu?',
          options: [
            { text: 'Na Wordnik, com Tony Tam', why: 'Isso.' },
            { text: 'No Facebook', why: 'O Facebook criou o GraphQL.' },
            { text: 'No W3C, junto com o XML', why: 'Nasceu numa empresa, a Wordnik.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'openapi',
      part: 'A história',
      title: '2015 a 2017: o nome OpenAPI',
      art: 'calendario',
      goal: 'Ordenar a doação, a troca de nome e a versão 3.0.',
      explain:
        'O Swagger cresceu tanto que deixou de ser de uma empresa só:\n\n- **2015**: foi doado à **OpenAPI Initiative**, sob a **Linux Foundation**;\n- **2016**: a especificação foi **renomeada OpenAPI**;\n- **2017**: saiu o **OpenAPI 3.0**, a primeira versão lançada já com o novo nome.\n\nPor isso a versão 2.0 ainda é chamada de "**Swagger 2.0**".',
      check: {
        kind: 'order',
        id: 'oa-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Doação à OpenAPI Initiative (2015)', 'Troca do nome para OpenAPI (2016)', 'Lançamento do OpenAPI 3.0 (2017)'],
        why: 'Primeiro a doação, depois o nome novo, depois a primeira versão com esse nome.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como um **time de bairro** que cresce: primeiro passa a ser de uma **liga** (a OpenAPI Initiative, 2015), depois muda de **nome** (OpenAPI, 2016) e só então disputa o primeiro **campeonato** com o nome novo (versão 3.0, 2017).',
        check: {
          kind: 'choice',
          id: 'oa-r',
          prompt: 'A versão 2.0 da especificação é conhecida como:',
          options: [
            { text: 'Swagger 2.0', why: 'Isso: ela é anterior à troca de nome.' },
            { text: 'OpenAPI 3.0', why: 'A 3.0 é a primeira com o nome novo.' },
            { text: 'WSDL 2.0', why: 'WSDL é outro padrão, para SOAP.' },
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
      prompt: 'Ordene a história da documentação de APIs.',
      items: ['WSDL para SOAP (2001)', 'Swagger na Wordnik (2010 e 2011)', 'Doação à OpenAPI Initiative (2015)', 'OpenAPI 3.0 (2017)'],
      why: 'Do XML pesado dos serviços SOAP ao padrão aberto para APIs REST.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada item combina com qual padrão?',
      categories: ['WSDL', 'Swagger e OpenAPI'],
      items: [
        { text: 'Serviços SOAP', cat: 0, why: 'O WSDL descrevia serviços SOAP.' },
        { text: 'Escrito em XML', cat: 0, why: 'O WSDL é XML.' },
        { text: 'Criado por Tony Tam', cat: 1, why: 'Tony Tam criou o Swagger.' },
        { text: 'APIs REST', cat: 1, why: 'Swagger e OpenAPI descrevem APIs HTTP no estilo REST.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['2015: Swagger doado à OpenAPI Initiative', '2016: renomeado para OpenAPI', '2017: lançado o Swagger 2.0'],
      bug: 2,
      why: 'Em 2017 saiu o OpenAPI 3.0; o Swagger 2.0 é anterior.',
      fixed: '2017: lançado o OpenAPI 3.0',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    '2001: WSDL, documento XML que descrevia as operações de serviços SOAP; completo, mas difícil de ler.',
    '2010 e 2011: Tony Tam, na Wordnik, cria o Swagger para APIs REST, com documentação interativa.',
    '2015: doação à OpenAPI Initiative (Linux Foundation); 2016: nome OpenAPI; 2017: OpenAPI 3.0.',
    'A versão 2.0 ainda é chamada de Swagger 2.0.',
  ],
};

export const devOapDocumento: MicroLesson = {
  ...S,
  id: 'dev.openapi.2',
  series: { id: 'dev.openapi', order: 2 },
  title: 'O documento OpenAPI',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Hoje, quando alguém fala "o Swagger da API", costuma estar se referindo a quê?',
    options: [
      { text: 'Às ferramentas, como a página interativa do Swagger UI', why: 'Isso. A especificação se chama OpenAPI; Swagger ficou com as ferramentas.' },
      { text: 'Ao banco de dados da API', why: 'Não. Fala-se da documentação e das ferramentas.' },
      { text: 'À senha de acesso', why: 'Não. Fala-se da documentação da API.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'formato',
      part: 'O que é',
      title: 'Um arquivo que descreve a API',
      art: 'dados',
      goal: 'Saber o que a Especificação OpenAPI descreve e em que formato.',
      explain:
        'A **Especificação OpenAPI** é um formato padronizado para descrever **APIs HTTP**. O documento é escrito em **YAML** ou **JSON** e diz:\n\n- os **caminhos** (como `/processos/{numero}`);\n- as **operações** em cada caminho (GET, POST...);\n- os **parâmetros** e os **corpos** de requisição e resposta;\n- os **códigos de status** possíveis;\n- os **esquemas de segurança**.',
      example: 'Quem lê o documento sabe, sem abrir o código, que `GET /processos/{numero}` devolve 200 com o processo ou 404 se ele não existir.',
      check: {
        kind: 'multi',
        id: 'fo-c',
        prompt: 'O que um documento OpenAPI descreve? Marque todas.',
        options: [
          { text: 'Caminhos e operações', correct: true, why: 'Isso.' },
          { text: 'Parâmetros e respostas', correct: true, why: 'Isso.' },
          { text: 'Esquemas de segurança', correct: true, why: 'Isso.' },
          { text: 'A cor dos botões do site', correct: false, why: 'Ele descreve a API, não a aparência de um site.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **cardápio** de um restaurante: diz quais **pratos** existem (caminhos e operações), o que **acompanha** cada um (parâmetros e respostas) e as **regras da casa** (segurança). Você pede sem entrar na cozinha.',
        check: {
          kind: 'choice',
          id: 'fo-r',
          prompt: 'Em que formatos se escreve um documento OpenAPI?',
          options: [
            { text: 'YAML ou JSON', why: 'Isso.' },
            { text: 'Só em XML', why: 'XML é o formato do WSDL.' },
            { text: 'Em PDF', why: 'É um arquivo legível por máquina: YAML ou JSON.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'partes',
      part: 'O que é',
      title: 'As partes do documento',
      art: 'trilha',
      goal: 'Reconhecer info, paths e components num documento.',
      explain:
        'Um documento OpenAPI 3 tem três blocos principais:\n\n```yaml\nopenapi: 3.0.3\ninfo:\n  title: API de Processos\npaths:\n  /processos/{numero}:\n    get:\n      summary: Consulta um processo\ncomponents:\n  schemas:\n    Processo:\n      type: object\n```\n\n**info** traz título e versão; **paths**, os caminhos e operações; **components**, peças reutilizáveis, como o esquema `Processo` e o `bearerAuth`.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Em qual bloco ficam os caminhos como `/processos/{numero}`?',
        options: [
          { text: 'paths', why: 'Isso.' },
          { text: 'info', why: 'info traz título e versão.' },
          { text: 'components', why: 'components guarda peças reutilizáveis, como esquemas.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia o documento como uma **pasta de processo**: a **capa** (info) diz do que se trata; o **índice** (paths) lista o que se pode fazer; os **anexos** (components) guardam modelos usados várias vezes, citados com `$ref`.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Um esquema `Processo` usado em várias respostas fica em:',
          options: [
            { text: 'components', why: 'Isso: é peça reutilizável.' },
            { text: 'info', why: 'info só tem título e versão.' },
            { text: 'Em nenhum lugar; repete-se em cada resposta', why: 'Define-se uma vez em components e cita-se com $ref.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ferramentas',
      part: 'As ferramentas',
      title: 'Swagger UI e Swagger Editor',
      art: 'computador',
      goal: 'Distinguir a especificação das ferramentas Swagger.',
      explain:
        'Hoje os nomes se dividem assim:\n\n- **OpenAPI** é a **especificação**, o formato do documento;\n- **Swagger** designa principalmente as **ferramentas** em torno dela.\n\nO **Swagger UI** lê o documento e gera uma **página interativa**, em que se pode **testar as chamadas no navegador**. O **Swagger Editor** ajuda a **escrever** o documento.',
      check: {
        kind: 'choice',
        id: 'fe-c',
        prompt: 'O que o Swagger UI faz?',
        options: [
          { text: 'Gera uma documentação interativa a partir do documento OpenAPI', why: 'Isso.' },
          { text: 'Substitui o servidor da API', why: 'Ele só mostra e testa a API; quem responde é o servidor.' },
          { text: 'Converte a API para SOAP', why: 'Não faz conversão de estilo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A **partitura** é a especificação: o que deve ser tocado. O **músico** que lê a partitura e faz a música soar é a ferramenta. O documento **OpenAPI** é a partitura; o **Swagger UI** é quem a transforma numa página que você usa.',
        check: {
          kind: 'choice',
          id: 'fe-r',
          prompt: 'Hoje, "OpenAPI" e "Swagger" designam, respectivamente:',
          options: [
            { text: 'A especificação e as ferramentas', why: 'Isso.' },
            { text: 'As ferramentas e a especificação', why: 'É o contrário.' },
            { text: 'Duas linguagens de programação', why: 'Nenhum dos dois é linguagem de programação.' },
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
      prompt: 'Em qual bloco do documento fica cada item?',
      categories: ['info', 'paths', 'components'],
      items: [
        { text: 'Título e versão da API', cat: 0, why: 'São dados gerais.' },
        { text: 'GET /processos/{numero}', cat: 1, why: 'É caminho com operação.' },
        { text: 'Esquema Processo', cat: 2, why: 'É peça reutilizável.' },
        { text: 'Esquema de segurança bearerAuth', cat: 2, why: 'securitySchemes fica em components.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['OpenAPI: a especificação', 'Escrita em YAML ou JSON', 'Swagger UI: o servidor que responde às chamadas'],
      bug: 2,
      why: 'O Swagger UI é a página interativa de documentação; quem responde é o servidor da API.',
      fixed: 'Swagger UI: documentação interativa',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma equipe quer que outros órgãos testem a API de processos pelo navegador, sem instalar nada. O que oferecer?',
      scenarios: [
        { title: 'Opção A', body: 'Um PDF com a lista de endereços, escrito à mão.' },
        { title: 'Opção B', body: 'O documento OpenAPI publicado com o **Swagger UI**.' },
      ],
      answer: 1,
      why: 'O Swagger UI gera, a partir do documento, uma página em que se testam as chamadas.',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.010' }],
  summary: [
    'Especificação OpenAPI: descreve APIs HTTP em YAML ou JSON.',
    'Descreve caminhos, operações, parâmetros, corpos, códigos de status e esquemas de segurança.',
    'Blocos: info (título e versão), paths (caminhos e operações), components (esquemas e segurança, citados com $ref).',
    'Swagger hoje designa as ferramentas: Swagger UI (documentação interativa) e Swagger Editor.',
  ],
};

export const devOapUsos: MicroLesson = {
  ...S,
  id: 'dev.openapi.3',
  series: { id: 'dev.openapi', order: 3 },
  title: 'Usos e abordagens',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A equipe do aplicativo e a do servidor querem trabalhar ao mesmo tempo, sem uma esperar a outra. O que ajuda?',
    options: [
      { text: 'Combinar antes um contrato da API', why: 'Isso. Esta aula mostra essa abordagem.' },
      { text: 'Cada equipe adivinhar os campos', why: 'Adivinhar gera retrabalho na hora de juntar.' },
      { text: 'Só começar o aplicativo quando o servidor estiver pronto', why: 'Funciona, mas uma equipe fica parada.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'usos',
      part: 'Para que serve',
      title: 'Quatro usos do documento',
      art: 'engrenagem',
      goal: 'Listar os usos de um documento OpenAPI.',
      explain:
        'O mesmo documento serve para várias coisas:\n\n- **documentação interativa**, com o Swagger UI;\n- **contrato entre equipes**, que combinam a interface antes de implementar;\n- **geração de código**, de clientes e de esqueletos de servidor;\n- **validação e testes**, conferindo se requisições e respostas obedecem ao contrato.',
      check: {
        kind: 'multi',
        id: 'us-c',
        prompt: 'Para que serve um documento OpenAPI? Marque todas.',
        options: [
          { text: 'Gerar código de clientes', correct: true, why: 'Isso.' },
          { text: 'Validar respostas contra o contrato', correct: true, why: 'Isso.' },
          { text: 'Documentação interativa', correct: true, why: 'Isso.' },
          { text: 'Guardar os dados dos usuários', correct: false, why: 'Quem guarda dados é o banco; o documento descreve a API.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A **planta de uma casa** serve ao pedreiro (construir), ao eletricista (instalar), ao fiscal (conferir) e ao comprador (entender). O documento OpenAPI é a planta da API: um só desenho, muitos usos.',
        check: {
          kind: 'choice',
          id: 'us-r',
          prompt: 'Conferir se a resposta da API obedece ao documento é um uso de:',
          options: [
            { text: 'Validação e testes', why: 'Isso.' },
            { text: 'Geração de código', why: 'Gerar código é criar clientes e esqueletos.' },
            { text: 'Nenhum: o documento não serve para isso', why: 'Serve, sim: valida-se contra o contrato.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'abordagens',
      part: 'Abordagens',
      title: 'Design-first e code-first',
      art: 'balanca',
      goal: 'Distinguir design-first de code-first.',
      explain:
        'Há duas formas de chegar ao documento:\n\n- ***design-first*** (ou *contract-first*): escreve-se **primeiro o documento** OpenAPI; o código segue o contrato;\n- ***code-first***: escreve-se **primeiro o código**, e **anotações** nele geram o documento automaticamente.\n\nNo design-first, front-end e back-end trabalham **em paralelo**, cada um seguindo o contrato combinado.',
      check: {
        kind: 'choice',
        id: 'ab-c',
        prompt: 'Anotações no código gerando o documento depois caracterizam:',
        options: [
          { text: 'Code-first', why: 'Isso.' },
          { text: 'Design-first', why: 'No design-first, o documento vem antes do código.' },
          { text: 'Contract-first', why: 'Contract-first é outro nome do design-first.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **obra**, design-first é **desenhar a planta antes** de levantar as paredes. Code-first é **levantar as paredes** e depois **medir** e desenhar a planta do que ficou. As duas dão uma planta; muda a ordem.',
        check: {
          kind: 'choice',
          id: 'ab-r',
          prompt: 'Contract-first é o mesmo que:',
          options: [
            { text: 'Design-first', why: 'Isso: o contrato vem primeiro.' },
            { text: 'Code-first', why: 'No code-first o código vem primeiro.' },
            { text: 'Não usar documentação', why: 'O contrato é a documentação central.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'outros',
      part: 'Relação com outros padrões',
      title: 'Quem descreve o quê',
      art: 'rede',
      goal: 'Associar cada estilo de API ao seu padrão de descrição.',
      explain:
        'Cada estilo de API tem o seu jeito de se descrever:\n\n- **REST** sobre HTTP: **OpenAPI**;\n- **GraphQL**: o próprio **esquema** do GraphQL;\n- **SOAP**: o **WSDL**, o equivalente histórico;\n- APIs **orientadas a eventos** e mensagens: o **AsyncAPI**.',
      check: {
        kind: 'choice',
        id: 'ou-c',
        prompt: 'Para uma API orientada a eventos e mensagens, o padrão de descrição é:',
        options: [
          { text: 'AsyncAPI', why: 'Isso.' },
          { text: 'WSDL', why: 'WSDL descreve serviços SOAP.' },
          { text: 'O esquema GraphQL', why: 'O esquema descreve APIs GraphQL.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Cada estilo tem o seu **documento de identidade**: o REST mostra o **OpenAPI**; o GraphQL, o seu **esquema**; o SOAP, o **WSDL**; e quem conversa por **eventos**, o **AsyncAPI**.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: 'Uma API GraphQL é descrita por:',
          options: [
            { text: 'Seu próprio esquema', why: 'Isso.' },
            { text: 'Um documento OpenAPI obrigatório', why: 'O GraphQL já se descreve pelo esquema.' },
            { text: 'WSDL', why: 'WSDL é dos serviços SOAP.' },
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
      prompt: 'Design-first ou code-first?',
      categories: ['Design-first', 'Code-first'],
      items: [
        { text: 'O documento é escrito antes do código', cat: 0, why: 'O contrato vem primeiro.' },
        { text: 'Front-end e back-end trabalham em paralelo desde o início', cat: 0, why: 'Os dois seguem o contrato combinado.' },
        { text: 'Anotações no código geram o documento', cat: 1, why: 'O código vem primeiro.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Duas equipes vão construir, ao mesmo tempo, o aplicativo e o servidor de um novo sistema de protocolo. Qual abordagem evita que uma espere a outra?',
      scenarios: [
        { title: 'Opção A', body: '**Design-first**: combinar o documento OpenAPI antes de programar.' },
        { title: 'Opção B', body: '**Code-first**: esperar o servidor ficar pronto para gerar o documento.' },
      ],
      answer: 0,
      why: 'Com o contrato combinado antes, as duas equipes programam em paralelo e validam contra ele.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['REST: OpenAPI', 'SOAP: WSDL', 'Eventos e mensagens: esquema GraphQL'],
      bug: 2,
      why: 'Para eventos e mensagens, o padrão é o AsyncAPI.',
      fixed: 'Eventos e mensagens: AsyncAPI',
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.011' }],
  summary: [
    'Usos: documentação interativa, contrato entre equipes, geração de código, validação e testes.',
    'Design-first (contract-first): o documento vem antes; equipes trabalham em paralelo.',
    'Code-first: anotações no código geram o documento.',
    'REST: OpenAPI; GraphQL: esquema; SOAP: WSDL; eventos: AsyncAPI.',
  ],
};
