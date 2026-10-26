// Série "JavaScript, Node.js e TypeScript" (cap.dev.04, trecho javascript-ts), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta de 1995 ao TypeScript; as seguintes ensinam
// tipos, variáveis e comparação, o event loop e as Promises, e Node.js com TypeScript, uma ideia por
// etapa. Fatos conferidos com o texto do capítulo (02-javascript-ts.md). Revisão editorial humana:
// pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.04', sectionId: 'javascript-ts' } as const;

export const devJsHistoria: MicroLesson = {
  ...S,
  id: 'dev.jsts.1',
  series: { id: 'dev.jsts', order: 1 },
  title: 'Do navegador ao servidor',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'JavaScript e Java são a mesma linguagem?',
    options: [
      { text: 'Não: são linguagens diferentes, com nomes parecidos', why: 'Isso. Esta aula conta como o JavaScript nasceu e chegou ao servidor.' },
      { text: 'Sim, JavaScript é o Java no navegador', why: 'São linguagens diferentes, criadas por empresas diferentes.' },
      { text: 'Sim, mudou só o nome', why: 'Têm origens, regras e usos diferentes.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'netscape',
      part: 'A história',
      title: '1995: o JavaScript na Netscape',
      art: 'computador',
      goal: 'Saber onde e para que o JavaScript nasceu.',
      explain:
        'Em **1995**, **Brendan Eich**, na empresa **Netscape**, criou uma linguagem para dar **comportamento às páginas web**: reagir a cliques, validar formulários.\n\nO nome "JavaScript" aproveitou a fama do Java, lançado no mesmo ano, mas as linguagens são **diferentes**.\n\nEm **1997**, a linguagem foi padronizada pela **Ecma International** com o nome de **ECMAScript**.',
      check: {
        kind: 'choice',
        id: 'ne-c',
        prompt: 'Para que o JavaScript foi criado?',
        options: [
          { text: 'Dar comportamento às páginas web', why: 'Isso.' },
          { text: 'Substituir o Java nos servidores', why: 'Nasceu para o navegador; o servidor veio depois.' },
          { text: 'Guardar dados em tabelas', why: 'Isso é tarefa de banco de dados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Lembre das **três camadas** da página: o HTML é o **esqueleto**, o CSS é a **roupa**, o JavaScript é o **movimento**. Em 1995, a Netscape quis dar movimento às páginas, e Brendan Eich criou essa camada.',
        check: {
          kind: 'choice',
          id: 'ne-r',
          prompt: 'Qual é o nome do padrão oficial do JavaScript?',
          options: [
            { text: 'ECMAScript', why: 'Isso, desde 1997.' },
            { text: 'JavaEE', why: 'JavaEE é da plataforma Java.' },
            { text: 'TypeScript', why: 'TypeScript é uma linguagem por cima do JavaScript.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'node',
      part: 'A história',
      title: '2009: o Node.js',
      art: 'rede',
      goal: 'Saber que o Node.js levou o JavaScript ao servidor.',
      explain:
        'Por muitos anos, o JavaScript só rodava **dentro do navegador**.\n\nEm **2009**, **Ryan Dahl** lançou o **Node.js**, um ambiente para rodar JavaScript **fora do navegador**, construído sobre o motor **V8**, do Google Chrome.\n\nCom ele, a mesma linguagem passou a servir também para **APIs e servidores**.',
      check: {
        kind: 'choice',
        id: 'no-c',
        prompt: 'O que o Node.js permitiu?',
        options: [
          { text: 'Rodar JavaScript fora do navegador, no servidor', why: 'Isso.' },
          { text: 'Rodar Java no navegador', why: 'Node.js roda JavaScript.' },
          { text: 'Desenhar páginas sem HTML', why: 'Node.js é um ambiente de execução.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **motor V8** era o "coração" que fazia o JavaScript andar no Chrome. Ryan Dahl **tirou esse motor do carro** (o navegador) e o pôs num **caminhão de carga** (o servidor): nasceu o Node.js.',
        check: {
          kind: 'choice',
          id: 'no-r',
          prompt: 'Sobre qual motor o Node.js foi construído?',
          options: [
            { text: 'V8', why: 'Isso, o motor do Chrome.' },
            { text: 'JVM', why: 'A JVM é a máquina virtual do Java.' },
            { text: 'CPython', why: 'CPython executa Python.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'typescript',
      part: 'A história',
      title: '2012: o TypeScript',
      art: 'cartao',
      goal: 'Saber que o TypeScript acrescentou tipos ao JavaScript.',
      explain:
        'Sistemas grandes em JavaScript ficavam difíceis de manter: um erro de tipo só aparecia **na hora de rodar**.\n\nEm **2012**, a **Microsoft**, com a equipe de **Anders Hejlsberg**, lançou o **TypeScript**: JavaScript com **tipos estáticos**, conferidos **antes** de executar.\n\nO TypeScript é compilado para JavaScript comum. Hoje, um sistema pode ter front-end em React com TypeScript e API em Node.js.',
      check: {
        kind: 'order',
        id: 'ts-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['JavaScript na Netscape (1995)', 'Padrão ECMAScript (1997)', 'Node.js (2009)', 'TypeScript (2012)'],
        why: 'Da linguagem do navegador aos tipos estáticos.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O TypeScript é um **corretor ortográfico** para o JavaScript: aponta o erro **enquanto você escreve**, antes de o texto ir para a gráfica (a execução). Depois, entrega o JavaScript comum.',
        check: {
          kind: 'choice',
          id: 'ts-r',
          prompt: 'Que empresa lançou o TypeScript?',
          options: [
            { text: 'Microsoft', why: 'Isso, em 2012.' },
            { text: 'Netscape', why: 'A Netscape criou o JavaScript.' },
            { text: 'Sun Microsystems', why: 'A Sun criou o Java.' },
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
      items: ['JavaScript (1995)', 'ECMAScript (1997)', 'Node.js (2009)', 'TypeScript (2012)'],
      why: 'Navegador, padrão, servidor e tipos.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem criou cada tecnologia?',
      categories: ['Brendan Eich', 'Ryan Dahl', 'Microsoft'],
      items: [
        { text: 'JavaScript', cat: 0, why: 'Na Netscape, 1995.' },
        { text: 'Node.js', cat: 1, why: '2009.' },
        { text: 'TypeScript', cat: 2, why: '2012.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Node.js: JavaScript fora do navegador', 'TypeScript: tipos estáticos', 'JavaScript: versão do Java para navegador'],
      bug: 2,
      why: 'São linguagens diferentes; o nome só aproveitou a fama do Java.',
      fixed: 'JavaScript: linguagem diferente do Java',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1995: Brendan Eich cria o JavaScript na Netscape; 1997: padronizado como ECMAScript.',
    '2009: Ryan Dahl lança o Node.js, sobre o motor V8.',
    '2012: Microsoft lança o TypeScript, com tipos estáticos compilados para JavaScript.',
  ],
};

export const devJsTipos: MicroLesson = {
  ...S,
  id: 'dev.jsts.2',
  series: { id: 'dev.jsts', order: 2 },
  title: 'Tipos, variáveis e comparação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Em JavaScript, 0 == "0" dá verdadeiro. E 0 === "0"?',
    options: [
      { text: 'Falso: === compara também o tipo', why: 'Isso. Esta aula explica a diferença.' },
      { text: 'Verdadeiro também', why: 'O === não faz coerção: número e texto são tipos diferentes.' },
      { text: 'Dá erro', why: 'Não dá erro; dá falso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tipos',
      part: 'Os tipos',
      title: 'Dinâmica e fraca',
      art: 'dados',
      goal: 'Conhecer os primitivos e as curiosidades do JavaScript.',
      explain:
        'JavaScript tem tipagem **dinâmica e fraca**: faz **coerção** implícita de tipos.\n\nSão **sete primitivos**: `string`, `number`, `bigint`, `boolean`, `undefined`, `null` e `symbol`. Todo o resto é `object`, incluindo vetores e funções.\n\nDuas curiosidades históricas:\n\n- `typeof null` retorna `"object"`;\n- `NaN === NaN` é **falso** (use `Number.isNaN`).',
      check: {
        kind: 'choice',
        id: 'ti-c',
        prompt: 'Em JavaScript, a tipagem é:',
        options: [
          { text: 'Dinâmica e fraca', why: 'Isso: faz coerção implícita.' },
          { text: 'Estática e forte', why: 'Tipos estáticos vêm com o TypeScript.' },
          { text: 'Dinâmica e forte, como o Python', why: 'O JavaScript faz coerção; é fraca.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Compare com o Python: lá, "1" + 1 **dá erro** (forte). No JavaScript, "1" + 1 vira **"11"**: ele **converte** sozinho o número em texto. Essa conversão automática é a **coerção** da tipagem fraca.',
        check: {
          kind: 'choice',
          id: 'ti-r',
          prompt: 'Como testar com segurança se um valor é NaN?',
          options: [
            { text: 'Number.isNaN(valor)', why: 'Isso.' },
            { text: 'valor === NaN', why: 'NaN === NaN é falso; o teste sempre falharia.' },
            { text: 'typeof valor === "NaN"', why: 'typeof de NaN é "number".' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'variaveis',
      part: 'Variáveis',
      title: 'var, let e const',
      art: 'cadeado',
      goal: 'Distinguir var, let e const no escopo e na reatribuição.',
      explain:
        '| | Escopo | Reatribui? |\n|---|---|---|\n| `var` | de **função** | sim |\n| `let` | de **bloco** | sim |\n| `const` | de **bloco** | **não** |\n\n`var` é içada (*hoisting*) e começa como `undefined`. `let` e `const` também são içadas, mas ficam **inacessíveis** antes da declaração.\n\nAtenção: `const` impede **reatribuir**, mas **não** impede mudar o conteúdo de um objeto: `const lista = []; lista.push(1)` é válido.',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'const lista = []; lista.push(1); O que acontece?',
        options: [
          { text: 'Funciona: const só impede reatribuir a variável', why: 'Isso.' },
          { text: 'Dá erro: const torna o vetor imutável', why: 'Pegadinha: const não congela o objeto.' },
          { text: 'A lista vira undefined', why: 'A lista passa a ter um elemento.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'const é como **parafusar a etiqueta** numa caixa: a etiqueta não sai daquela caixa (não reatribui). Mas você ainda pode **pôr coisas dentro** da caixa (alterar o objeto).',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: 'Qual declaração tem escopo de função?',
          options: [
            { text: 'var', why: 'Isso.' },
            { text: 'let', why: 'let tem escopo de bloco.' },
            { text: 'const', why: 'const tem escopo de bloco.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'comparacao',
      part: 'Comparação',
      title: '== e ===, closures e arrows',
      art: 'balanca',
      goal: 'Usar === e reconhecer closures e arrow functions.',
      explain:
        '- `==` compara **depois de converter** os tipos: `0 == "0"` é verdadeiro; `null == undefined` também;\n- `===` compara **valor e tipo**, sem conversão: `0 === "0"` é falso.\n\nFunções formam **closures**: uma função interna continua acessando as variáveis do escopo externo, mesmo depois que ele terminou.\n\nAs **arrow functions** (`x => x * 2`) **não têm `this` próprio**: herdam o `this` de onde foram definidas.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'null === undefined resulta em:',
        options: [
          { text: 'false', why: 'Isso: tipos diferentes, sem coerção.' },
          { text: 'true', why: 'Isso vale para ==, não para ===.' },
          { text: 'Erro', why: 'Não dá erro.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O `==` é um **porteiro tolerante**: aceita o crachá de outra cor se o nome bate. O `===` é **rigoroso**: nome **e** cor do crachá precisam bater. Na prova e no código, prefira o rigoroso.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Uma arrow function tem this próprio?',
          options: [
            { text: 'Não: herda o this de onde foi definida', why: 'Isso.' },
            { text: 'Sim, sempre o objeto global', why: 'Ela herda o this do escopo externo.' },
            { text: 'Sim, o do objeto que a chama', why: 'Isso vale para funções comuns, não para arrows.' },
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
      prompt: 'O resultado é true ou false?',
      categories: ['true', 'false'],
      items: [
        { text: '0 == "0"', cat: 0, why: 'Coerção.' },
        { text: 'null == undefined', cat: 0, why: 'Regra especial do ==.' },
        { text: '0 === "0"', cat: 1, why: 'Tipos diferentes.' },
        { text: 'NaN === NaN', cat: 1, why: 'NaN nunca é igual a si mesmo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['let: escopo de bloco', 'var: escopo de função', 'const: torna o objeto imutável'],
      bug: 2,
      why: 'const impede só reatribuir a variável; o objeto pode mudar.',
      fixed: 'const: impede reatribuir a variável',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um formulário compara o código digitado (texto) com um número. Qual escolha evita surpresas?',
      scenarios: [
        { title: 'Opção A', body: 'Converter explicitamente com **Number(codigo)** e comparar com **===**.' },
        { title: 'Opção B', body: 'Comparar direto com **==** e confiar na coerção.' },
      ],
      answer: 0,
      why: 'Converter de propósito e usar === deixa a comparação previsível.',
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Tipagem dinâmica e fraca. Sete primitivos; o resto é object. typeof null é "object"; NaN === NaN é false.',
    'var: escopo de função. let e const: de bloco. const não reatribui, mas o objeto pode mudar.',
    '== converte tipos; === compara valor e tipo. Closures guardam o escopo externo. Arrows herdam o this.',
  ],
};

export const devJsAssincrono: MicroLesson = {
  ...S,
  id: 'dev.jsts.3',
  series: { id: 'dev.jsts', order: 3 },
  title: 'Event loop, Promises e async',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um setTimeout de 0 milissegundos executa imediatamente?',
    options: [
      { text: 'Não: entra numa fila e espera a pilha esvaziar', why: 'Isso. Esta aula mostra o event loop.' },
      { text: 'Sim, na mesma hora', why: 'Ele vai para a fila de macrotarefas.' },
      { text: 'Nunca executa', why: 'Executa, depois que a pilha esvazia.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'loop',
      part: 'O event loop',
      title: 'Uma thread, uma pilha e filas',
      art: 'engrenagem',
      goal: 'Prever a ordem de execução com microtarefas e macrotarefas.',
      explain:
        'JavaScript executa em **uma única thread**, com uma **pilha de chamadas**. Operações demoradas vão para o ambiente, e seus *callbacks* entram em **filas**.\n\nO **event loop** só tira algo da fila quando a pilha está **vazia**. E as **microtarefas** (Promises) passam **antes** da próxima **macrotarefa** (`setTimeout`).\n\n```javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");\n```\n\nSaída: **1, 4, 3, 2**.',
      check: {
        kind: 'choice',
        id: 'lo-c',
        prompt: 'Por que o "3" sai antes do "2" no exemplo?',
        options: [
          { text: 'Promises são microtarefas e passam antes dos setTimeout', why: 'Isso.' },
          { text: 'Porque 3 é maior que 2', why: 'A ordem vem das filas, não dos números.' },
          { text: 'Porque o setTimeout falhou', why: 'Ele executa, só que depois.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **guichê com uma atendente** (a thread). Primeiro ela termina **quem está no balcão** (o código síncrono: 1 e 4). Depois atende a **fila preferencial** (microtarefas: 3). Só então a **fila comum** (macrotarefas: 2).',
        check: {
          kind: 'order',
          id: 'lo-r',
          prompt: 'Ordene quem é atendido primeiro.',
          items: ['Código síncrono na pilha', 'Microtarefas (Promises)', 'Macrotarefas (setTimeout)'],
          why: 'Pilha, fila preferencial e fila comum.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'promises',
      part: 'Promises',
      title: 'Três estados e quatro combinadores',
      art: 'calendario',
      goal: 'Saber os estados de uma Promise e o que fazem all, allSettled, race e any.',
      explain:
        'Uma **Promise** é um valor futuro, em um de três estados: **pendente**, **cumprida** ou **rejeitada**. Resolvida, **não muda mais**.\n\n| Método | Comportamento |\n|---|---|\n| `all` | cumpre quando **todas** cumprem; rejeita na **primeira** rejeição |\n| `allSettled` | espera todas e informa cada resultado |\n| `race` | fica com a **primeira** que se resolver |\n| `any` | cumpre com a primeira que **cumprir** |',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Para esperar todas as consultas e saber o resultado de cada uma, mesmo com falhas, usa-se:',
        options: [
          { text: 'Promise.allSettled', why: 'Isso.' },
          { text: 'Promise.all', why: 'O all rejeita na primeira falha.' },
          { text: 'Promise.race', why: 'O race fica só com a primeira.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine **quatro ofícios** enviados. O **all** é o chefe que desiste ao primeiro "não". O **allSettled** espera **todas as respostas** e monta o relatório. O **race** fica com a **primeira** resposta, seja qual for. O **any**, com o primeiro "sim".',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Uma Promise cumprida pode depois ser rejeitada?',
          options: [
            { text: 'Não: resolvida, não muda mais de estado', why: 'Isso.' },
            { text: 'Sim, a qualquer momento', why: 'O estado final é definitivo.' },
            { text: 'Só com setTimeout', why: 'Nada muda o estado depois de resolvida.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'async',
      part: 'async e await',
      title: 'Esperar sem travar',
      art: 'trilha',
      goal: 'Entender que async retorna Promise e await não bloqueia a thread.',
      explain:
        '`async` e `await` são uma forma mais legível de usar Promises:\n\n- uma função `async` **sempre retorna uma Promise**;\n- `await` **suspende só a função**, até a Promise se resolver, **sem bloquear** a thread;\n- erros são capturados com `try/catch`.\n\n```javascript\nasync function buscar(id) {\n  const resp = await fetch("/api/processos/" + id);\n  return await resp.json();\n}\n```',
      check: {
        kind: 'choice',
        id: 'as-c',
        prompt: 'O que o await faz?',
        options: [
          { text: 'Suspende a função async sem bloquear o event loop', why: 'Isso.' },
          { text: 'Bloqueia a thread principal até a Promise terminar', why: 'Pegadinha: só a função espera; o resto segue.' },
          { text: 'Transforma o código em síncrono para todos', why: 'Só a função async é suspensa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O `await` é o servidor que diz "**volto quando o documento chegar**" e libera o guichê. A atendente (a thread) segue atendendo outras pessoas; quando o documento chega, ela retoma aquele atendimento de onde parou.',
        check: {
          kind: 'choice',
          id: 'as-r',
          prompt: 'O que uma função async retorna?',
          options: [
            { text: 'Sempre uma Promise', why: 'Isso.' },
            { text: 'Sempre undefined', why: 'Retorna uma Promise do valor.' },
            { text: 'O valor direto, sem Promise', why: 'O valor vem embrulhado numa Promise.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Qual a ordem de saída de: log X; setTimeout Y; Promise.then Z; log W?',
      items: ['X', 'W', 'Z', 'Y'],
      why: 'Síncronos (X, W), microtarefa (Z), macrotarefa (Y).',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O que cada método faz com um conjunto de Promises?',
      categories: ['Rejeita na primeira falha', 'Espera todas', 'Fica com a primeira a se resolver'],
      items: [
        { text: 'Promise.all', cat: 0, why: 'Desiste na primeira rejeição.' },
        { text: 'Promise.allSettled', cat: 1, why: 'Informa cada resultado.' },
        { text: 'Promise.race', cat: 2, why: 'Assume o resultado da primeira.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['async sempre retorna Promise', 'Microtarefas antes de macrotarefas', 'await bloqueia a thread principal'],
      bug: 2,
      why: 'await suspende só a função async; o event loop continua.',
      fixed: 'await suspende só a função',
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.004' }],
  summary: [
    'Uma thread e uma pilha; o event loop tira da fila quando a pilha esvazia. Microtarefas (Promises) antes de macrotarefas (setTimeout).',
    'Promise: pendente, cumprida ou rejeitada; resolvida não muda.',
    'all (rejeita na primeira), allSettled (espera todas), race (primeira), any (primeira cumprida).',
    'async sempre retorna Promise; await suspende só a função, sem bloquear.',
  ],
};

export const devJsNodeTs: MicroLesson = {
  ...S,
  id: 'dev.jsts.4',
  series: { id: 'dev.jsts', order: 4 },
  title: 'Node.js, módulos e TypeScript',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Os tipos do TypeScript continuam existindo quando o programa roda no navegador?',
    options: [
      { text: 'Não: são verificados na compilação e apagados', why: 'Isso. Esta aula mostra Node.js, módulos e TypeScript.' },
      { text: 'Sim, o navegador confere os tipos', why: 'Pegadinha: o navegador recebe JavaScript comum.' },
      { text: 'Só em computadores rápidos', why: 'Os tipos são apagados sempre.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'node',
      part: 'Node.js',
      title: 'E/S não bloqueante',
      art: 'rede',
      goal: 'Saber para que o Node.js é adequado e o que o atrapalha.',
      explain:
        '**Node.js** roda JavaScript fora do navegador, sobre o **V8**, com **E/S não bloqueante** orientada a eventos.\n\n- É bom para **APIs** com **muitas conexões** e pouco processamento pesado por requisição.\n- Tarefas **intensivas de CPU** bloqueiam o event loop: pedem **worker threads** ou outro serviço.\n\nO **npm** é o gerenciador de pacotes que acompanha o Node.js.',
      check: {
        kind: 'choice',
        id: 'nd-c',
        prompt: 'Qual cenário combina menos com o Node.js puro?',
        options: [
          { text: 'Cálculo pesado de CPU em cada requisição', why: 'Isso: bloqueia o event loop.' },
          { text: 'API com muitas conexões simultâneas', why: 'Esse é o ponto forte do Node.js.' },
          { text: 'Chat com mensagens curtas', why: 'Muitas conexões e pouco cálculo: combina bem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O Node.js é uma **atendente muito rápida** que nunca fica parada esperando: enquanto o banco responde, ela atende outro. Mas se alguém pedir que ela **faça uma conta enorme** no balcão, a fila inteira para.',
        check: {
          kind: 'choice',
          id: 'nd-r',
          prompt: 'Para tarefas pesadas de CPU no Node.js, usa-se:',
          options: [
            { text: 'Worker threads ou outro serviço', why: 'Isso.' },
            { text: 'Mais setTimeout', why: 'setTimeout não tira o cálculo da thread.' },
            { text: 'Nada; o Node.js resolve sozinho', why: 'O cálculo pesado bloqueia o event loop.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'modulos',
      part: 'Módulos',
      title: 'CommonJS e ES Modules',
      art: 'trilha',
      goal: 'Distinguir CommonJS de ES Modules.',
      explain:
        '| | CommonJS | ES Modules |\n|---|---|---|\n| Importar | `require("fs")` | `import fs from "fs"` |\n| Exportar | `module.exports` | `export` |\n| Carga | síncrona, na execução | estática, antes |\n\nNo Node.js, o CommonJS é o padrão histórico; o ESM se ativa com `.mjs` ou `"type": "module"` no `package.json`.\n\nO **ESM** é o padrão da linguagem, desde o **ECMAScript 2015**, e é o usado nos navegadores.',
      check: {
        kind: 'choice',
        id: 'md-c',
        prompt: 'Como ativar ES Modules num projeto Node.js?',
        options: [
          { text: '"type": "module" no package.json, ou arquivos .mjs', why: 'Isso.' },
          { text: 'Usando require', why: 'require é do CommonJS.' },
          { text: 'Não é possível no Node.js', why: 'É possível, com .mjs ou "type": "module".' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O **CommonJS** é a **carta antiga**: você pede a peça (require) na hora em que precisa. O **ESM** é a **lista de compras** entregue antes: os imports são lidos **antes** de rodar, e as ferramentas sabem tudo de antemão.',
        check: {
          kind: 'choice',
          id: 'md-r',
          prompt: 'Qual sistema de módulos é o padrão da linguagem?',
          options: [
            { text: 'ES Modules', why: 'Isso, desde o ECMAScript 2015.' },
            { text: 'CommonJS', why: 'O CommonJS é o padrão histórico do Node.js.' },
            { text: 'Maven', why: 'Maven é do Java.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ts',
      part: 'TypeScript',
      title: 'Tipos que somem na compilação',
      art: 'cartao',
      goal: 'Reconhecer genéricos, uniões e o apagamento de tipos.',
      explain:
        'O TypeScript é **superconjunto** do JavaScript, com tipos **estáticos** que são **apagados** no JavaScript gerado.\n\n```typescript\ntype Id = string | number;\nfunction primeiro<T>(itens: T[]): T | undefined {\n  return itens[0];\n}\n```\n\n- `Id` é um **tipo união**: aceita um ou outro;\n- `primeiro` é **genérica**: preserva o tipo dos itens;\n- `any` desliga a verificação; `unknown` obriga a verificar;\n- a tipagem é **estrutural**: mesma forma, tipos compatíveis.',
      check: {
        kind: 'choice',
        id: 'tt-c',
        prompt: 'Em function primeiro<T>(itens: T[]): T | undefined, o T indica:',
        options: [
          { text: 'Um tipo genérico, que preserva o tipo dos itens', why: 'Isso.' },
          { text: 'Um tipo fixo chamado T', why: 'T é um parâmetro de tipo, preenchido em cada uso.' },
          { text: 'Que a função aceita só textos', why: 'Aceita vetor de qualquer tipo T.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O `T` é um **molde vazio**: chame `primeiro` com uma lista de processos, e o molde vira **Processo**; com uma lista de números, vira **number**. A função serve para todos e não perde a informação do tipo.',
        check: {
          kind: 'choice',
          id: 'tt-r',
          prompt: 'interface ou type: qual permite união, como string | number?',
          options: [
            { text: 'type', why: 'Isso: uniões se fazem com type.' },
            { text: 'interface', why: 'interface descreve formato de objeto; não faz união.' },
            { text: 'Nenhum dos dois', why: 'type permite.' },
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
      prompt: 'Cada item é de CommonJS ou de ES Modules?',
      categories: ['CommonJS', 'ES Modules'],
      items: [
        { text: 'require', cat: 0, why: 'Importação do CommonJS.' },
        { text: 'module.exports', cat: 0, why: 'Exportação do CommonJS.' },
        { text: 'import', cat: 1, why: 'Importação do ESM.' },
        { text: 'export default', cat: 1, why: 'Exportação do ESM.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['TypeScript: superconjunto do JavaScript', 'unknown obriga a verificar', 'Os tipos são conferidos pelo navegador'],
      bug: 2,
      why: 'Os tipos são verificados na compilação e apagados no JavaScript gerado.',
      fixed: 'Os tipos são conferidos na compilação',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A API do órgão recebe um dado externo de formato desconhecido. Qual tipo usar até validar?',
      scenarios: [
        { title: 'Opção A', body: '**unknown**: obriga a verificar antes de usar.' },
        { title: 'Opção B', body: '**any**: desliga a verificação.' },
      ],
      answer: 0,
      why: 'unknown mantém a segurança: o compilador exige checar o tipo antes do uso.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.006' },
  ],
  summary: [
    'Node.js: V8 com E/S não bloqueante; bom para muitas conexões; CPU pesada pede worker threads.',
    'CommonJS (require, module.exports) e ES Modules (import, export), o padrão desde o ECMAScript 2015.',
    'TypeScript: tipos estáticos apagados na compilação; genéricos, uniões (type), any e unknown; tipagem estrutural.',
  ],
};
