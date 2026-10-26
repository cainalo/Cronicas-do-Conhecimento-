// Série "Lógica, recursão e complexidade" (cap.dev.03, trecho logica), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta de Fibonacci a Knuth; as seguintes ensinam algoritmo e
// estruturas de controle, depois recursão e notação Big-O, uma ideia por etapa. Fatos conferidos com o
// texto do capítulo (01-logica.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.03', sectionId: 'logica' } as const;

export const devLogHistoria: MicroLesson = {
  ...S,
  id: 'dev.logica.1',
  series: { id: 'dev.logica', order: 1 },
  title: 'De Fibonacci a Knuth',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Dois programas resolvem o mesmo problema. Um leva 1 segundo com mil registros; o outro, 1 hora. Existe um jeito de comparar programas assim antes de rodar?',
    options: [
      { text: 'Sim: analisando como o custo cresce com a entrada', why: 'Isso. Esta aula conta como surgiram essa análise e as regras da boa lógica.' },
      { text: 'Não: só rodando para ver', why: 'Dá para estimar antes, e a ideia vem da matemática do século XIX. Esta aula conta.' },
      { text: 'Basta comprar um computador mais rápido', why: 'Ajuda pouco quando o custo cresce muito rápido. Esta aula mostra por quê.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'fibonacci',
      part: 'A história',
      title: '1202: os coelhos de Fibonacci',
      art: 'abaco',
      goal: 'Conhecer a origem da sequência de Fibonacci, exemplo clássico de recursão.',
      explain:
        'Em **1202**, no livro *Liber Abaci*, **Leonardo de Pisa**, o **Fibonacci**, propôs um problema de **coelhos**: a cada mês, o número de casais é a **soma dos dois meses anteriores**.\n\n1, 1, 2, 3, 5, 8, 13...\n\nCada termo é definido **pelos anteriores**. Essa ideia, definir algo em termos de si mesmo, é a **recursão**, que até hoje usa Fibonacci como exemplo.',
      check: {
        kind: 'choice',
        id: 'fi-c',
        prompt: 'Na sequência 1, 1, 2, 3, 5, 8, qual é o próximo termo?',
        options: [
          { text: '13', why: 'Isso: 5 + 8.' },
          { text: '11', why: 'Some os dois anteriores: 5 + 8 = 13.' },
          { text: '16', why: 'Não é o dobro: é a soma dos dois anteriores.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'A regra é olhar **para trás duas casas** e somar. Depois de 5 e 8, vem **5 + 8 = 13**. Depois, 8 + 13 = 21. Cada número depende dos anteriores: é por isso que a sequência é exemplo de **recursão**.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Depois de 8 e 13, vem:',
          options: [
            { text: '21', why: 'Isso: 8 + 13.' },
            { text: '26', why: 'Não é o dobro: soma dos dois anteriores.' },
            { text: '14', why: 'Some os dois: 8 + 13 = 21.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'bigo',
      part: 'A história',
      title: '1894: a notação O',
      art: 'degraus',
      goal: 'Saber a origem da notação O, Ω e Θ.',
      explain:
        'Em **1894**, o matemático alemão **Paul Bachmann** usou o símbolo **O** para descrever **como uma função cresce**. **Edmund Landau** popularizou a notação.\n\nEm **1976**, **Donald Knuth** propôs usar também **Ω** e **Θ** na computação.\n\nÉ essa notação que permite dizer, **antes de rodar**, se um programa vai aguentar milhões de registros.',
      check: {
        kind: 'choice',
        id: 'bo-c',
        prompt: 'Para que serve a notação O?',
        options: [
          { text: 'Para descrever como o custo cresce com o tamanho da entrada', why: 'Isso.' },
          { text: 'Para dar nome a variáveis', why: 'Variáveis têm nomes; a notação O descreve crescimento.' },
          { text: 'Para medir a temperatura do processador', why: 'Ela descreve crescimento de custo, não temperatura.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em duas **escadas**: numa, cada degrau sobe 1 metro; na outra, cada degrau dobra a altura. Com poucos degraus, parecem iguais; com muitos, a segunda vai às nuvens. A notação O diz **qual escada** um programa é.',
        check: {
          kind: 'choice',
          id: 'bo-r',
          prompt: 'Quem trouxe Ω e Θ para a computação, em 1976?',
          options: [
            { text: 'Donald Knuth', why: 'Isso.' },
            { text: 'Fibonacci', why: 'Fibonacci é do século XIII.' },
            { text: 'Edgar F. Codd', why: 'Codd propôs o modelo relacional.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'estruturada',
      part: 'A história',
      title: '1966 e 1968: sem goto',
      art: 'trilha',
      goal: 'Saber o que Böhm, Jacopini e Dijkstra trouxeram à programação estruturada.',
      explain:
        'Os primeiros programas pulavam de um ponto a outro com o comando **goto** ("vá para"). Ficavam difíceis de entender, como um livro que manda pular de página em página.\n\nEm **1966**, **Böhm** e **Jacopini** mostraram que **sequência**, **seleção** e **repetição** **bastam** para qualquer algoritmo.\n\nEm **1968**, **Edsger Dijkstra** publicou a carta **"Go To Statement Considered Harmful"**. Nascia a **programação estruturada**.',
      check: {
        kind: 'multi',
        id: 'es-c',
        prompt: 'Segundo Böhm e Jacopini, quais estruturas bastam para qualquer algoritmo? Marque todas.',
        options: [
          { text: 'Sequência', correct: true, why: 'Isso.' },
          { text: 'Seleção', correct: true, why: 'Isso.' },
          { text: 'Repetição', correct: true, why: 'Isso.' },
          { text: 'goto', correct: false, why: 'O ponto é justamente dispensar o goto.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma **receita** bem escrita usa só três coisas: passos **em ordem** (sequência), **"se"** (seleção) e **"repita até"** (repetição). Ela não diz "volte para a página 3 e depois pule para a 12". Isso é a programação estruturada, sem goto.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Quem escreveu, em 1968, a carta contra o goto?',
          options: [
            { text: 'Edsger Dijkstra', why: 'Isso.' },
            { text: 'Paul Bachmann', why: 'Bachmann usou a notação O em 1894.' },
            { text: 'Ada Lovelace', why: 'Ada escreveu o primeiro programa em 1843.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'knuth',
      part: 'A história',
      title: '1968: o tratado de Knuth',
      art: 'livro',
      goal: 'Saber que Knuth listou as propriedades do algoritmo em The Art of Computer Programming.',
      explain:
        'Também em **1968**, **Donald Knuth** lançou o primeiro volume de ***The Art of Computer Programming***, um tratado que ainda hoje é referência.\n\nNele estão as **cinco propriedades** de um algoritmo, que a próxima aula explica: **finitude**, **definição**, **entrada**, **saída** e **efetividade**.\n\nO mesmo Knuth trouxe, anos depois, Ω e Θ para a computação.',
      check: {
        kind: 'choice',
        id: 'kn-c',
        prompt: 'Em que obra Knuth listou as propriedades do algoritmo?',
        options: [
          { text: 'The Art of Computer Programming', why: 'Isso, primeiro volume em 1968.' },
          { text: 'Liber Abaci', why: 'Liber Abaci é de Fibonacci, de 1202.' },
          { text: 'Design Patterns', why: 'Design Patterns é de 1994, sobre orientação a objetos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Assim como o direito tem seus **códigos** de referência, a computação tem o tratado de Knuth. Ali ele define, com rigor, o que **é** um algoritmo, e é dali que vêm as cinco propriedades cobradas em prova.',
        check: {
          kind: 'order',
          id: 'kn-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Liber Abaci de Fibonacci (1202)', 'Notação O de Bachmann (1894)', 'Teorema de Böhm e Jacopini (1966)', 'Ω e Θ propostos por Knuth (1976)'],
          why: '1202, 1894, 1966 e 1976.',
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Fibonacci: cada termo é a soma dos dois anteriores', 'Dijkstra (1968): carta contra o goto', 'Bachmann: inventou o comando goto'],
      bug: 2,
      why: 'Bachmann usou o símbolo O para descrever crescimento de funções, em 1894.',
      fixed: 'Bachmann: notação O (1894)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Fibonacci', 'Böhm e Jacopini', 'Knuth'],
      items: [
        { text: 'Problema dos coelhos', cat: 0, why: 'Liber Abaci, 1202.' },
        { text: 'Três estruturas bastam', cat: 1, why: '1966.' },
        { text: 'The Art of Computer Programming', cat: 2, why: '1968.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega escreveu um programa cheio de saltos "vá para a linha 40", "volte para a linha 12". Qual a crítica da programação estruturada?',
      options: [
        { text: 'Os saltos dificultam entender; bastam sequência, seleção e repetição', why: 'Isso.' },
        { text: 'Nenhuma: saltos são a forma recomendada', why: 'Dijkstra criticou justamente o goto.' },
        { text: 'O programa fica O(1)', why: 'Saltos não definem a complexidade; o problema é a clareza.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Em 1202, Fibonacci propôs a sequência em que cada termo soma os dois anteriores: exemplo clássico de recursão.',
    'Em 1894, Bachmann usou a notação O; Landau a popularizou; Knuth trouxe Ω e Θ em 1976.',
    'Böhm e Jacopini (1966): sequência, seleção e repetição bastam. Dijkstra (1968): contra o goto.',
    'Knuth (1968), The Art of Computer Programming: as cinco propriedades do algoritmo.',
  ],
};

export const devLogControle: MicroLesson = {
  ...S,
  id: 'dev.logica.2',
  series: { id: 'dev.logica', order: 2 },
  title: 'Algoritmo e estruturas de controle',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma receita diz "tempere a gosto". Um robô consegue seguir esse passo?',
    options: [
      { text: 'Não: o passo não é preciso', why: 'Isso. Falta "definição", uma das cinco propriedades. Esta aula mostra todas.' },
      { text: 'Sim, ele sabe o gosto de todo mundo', why: 'O robô não adivinha: cada passo precisa ser preciso.' },
      { text: 'Sim, se tiver internet', why: 'O problema é o passo ser vago, não a conexão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'propriedades',
      part: 'O algoritmo',
      title: 'As cinco propriedades',
      art: 'livro',
      goal: 'Reconhecer as cinco propriedades de Knuth.',
      explain:
        'Um **algoritmo** é uma sequência **finita** de passos **bem definidos** que transforma uma **entrada** em uma **saída**. Knuth lista cinco propriedades:\n\n- **finitude**: termina;\n- **definição**: cada passo é preciso;\n- **entrada**: zero ou mais;\n- **saída**: uma ou mais;\n- **efetividade**: cada passo pode ser executado de fato.\n\n"Tempere a gosto" falha na **definição**; um laço que nunca termina falha na **finitude**.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Um laço que nunca termina viola qual propriedade?',
        options: [
          { text: 'Finitude', why: 'Isso.' },
          { text: 'Entrada', why: 'Entrada pode ser zero ou mais; o problema é não terminar.' },
          { text: 'Saída', why: 'O problema é anterior: ele nunca termina.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **formulário de requerimento**: ele precisa **acabar** (finitude), cada campo precisa ser **claro** (definição), recebe **dados** (entrada), produz um **resultado** (saída), e cada etapa precisa ser **possível de fazer** (efetividade).',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: '"Tempere a gosto" viola qual propriedade?',
          options: [
            { text: 'Definição', why: 'Isso: o passo não é preciso.' },
            { text: 'Finitude', why: 'O passo termina; o problema é não ser preciso.' },
            { text: 'Saída', why: 'O problema é a falta de precisão do passo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tres',
      part: 'Controle',
      title: 'Sequência, seleção e repetição',
      art: 'trilha',
      goal: 'Associar as três estruturas aos seus comandos.',
      explain:
        'Todo programa imperativo combina:\n\n- **Sequência**: instruções uma após a outra (atribuições, chamadas).\n- **Seleção** (decisão): escolher um caminho conforme uma condição (**if**, **if/else**, **switch**).\n- **Repetição** (iteração): repetir um bloco (**while**, **do...while**, **for**).\n\nBöhm e Jacopini mostraram que as três **bastam**.',
      check: {
        kind: 'sort',
        id: 'tr-c',
        prompt: 'Que estrutura é cada comando?',
        categories: ['Seleção', 'Repetição'],
        items: [
          { text: 'if/else', cat: 0, why: 'Escolhe um caminho.' },
          { text: 'while', cat: 1, why: 'Repete.' },
          { text: 'switch', cat: 0, why: 'Escolhe entre casos.' },
          { text: 'for', cat: 1, why: 'Repete.' },
        ],
      },
      recovery: {
        explain: 'Pergunte ao comando: **ele decide** ou **ele repete**? if e switch **decidem** um caminho: seleção. while, do...while e for **repetem**: repetição. O resto, uma linha depois da outra, é sequência.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'O comando do...while é de:',
          options: [
            { text: 'Repetição', why: 'Isso.' },
            { text: 'Seleção', why: 'Ele repete um bloco.' },
            { text: 'Sequência', why: 'Ele repete; não é só uma linha depois da outra.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'dowhile',
      part: 'Controle',
      title: 'while ou do...while',
      art: 'interruptor',
      goal: 'Diferenciar while de do...while.',
      explain:
        '- **while** testa a condição **antes** de cada volta: o corpo **pode não executar nenhuma vez**.\n- **do...while** testa **depois**: o corpo executa **pelo menos uma vez**.\n\nExemplo: um **menu** que precisa aparecer **ao menos uma vez** antes de verificar se o usuário escolheu "sair" pede **do...while**.',
      check: {
        kind: 'choice',
        id: 'dw-c',
        prompt: 'O menu deve aparecer ao menos uma vez antes de testar a saída. Qual estrutura usar?',
        options: [
          { text: 'do...while', why: 'Isso: testa no fim, executa pelo menos uma vez.' },
          { text: 'while', why: 'O while testa antes e pode não mostrar o menu.' },
          { text: 'if', why: 'if não repete.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **while** é o porteiro que pergunta **antes** de deixar entrar: pode ser que ninguém entre. O **do...while** deixa **entrar primeiro** e pergunta na saída se quer voltar: entra-se **ao menos uma vez**.',
        check: {
          kind: 'choice',
          id: 'dw-r',
          prompt: '"O laço do...while pode não executar nenhuma vez." Isso está:',
          options: [
            { text: 'Errado: ele executa pelo menos uma vez', why: 'Isso.' },
            { text: 'Certo', why: 'Quem pode não executar é o while.' },
            { text: 'Certo só em Java', why: 'Em qualquer linguagem, o do...while testa no fim.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'for-switch',
      part: 'Controle',
      title: 'for e o break esquecido',
      art: 'degraus',
      goal: 'Saber quando usar for e o que é fall-through no switch.',
      explain:
        '- **for** reúne **inicialização**, **condição** e **incremento** numa linha. É usado quando o **número de voltas é conhecido**.\n- No **switch** de Java, C e JavaScript, **esquecer o break** faz a execução **"cair" no caso seguinte**: é o *fall-through*.\n\n```\nswitch (tipo) {\n  case 1: prazo = 15;\n  case 2: prazo = 30; break;\n}\n```\n\nCom tipo 1, sem break, o prazo termina **30**.',
      check: {
        kind: 'choice',
        id: 'fs-c',
        prompt: 'No exemplo, com tipo = 1, qual o valor final de prazo?',
        options: [
          { text: '30', why: 'Isso: sem break, cai no caso 2.' },
          { text: '15', why: 'Faltou o break no caso 1: a execução continuou.' },
          { text: 'Dá erro de compilação', why: 'Compila; só cai no caso seguinte.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'O **break** é a **porta de saída** de cada caso. Sem ela, quem entra no caso 1 **continua andando** pelo corredor e entra no caso 2 também. Por isso o prazo vira 15 e, logo depois, 30.',
        check: {
          kind: 'choice',
          id: 'fs-r',
          prompt: 'Quando o for é mais indicado?',
          options: [
            { text: 'Quando o número de voltas é conhecido', why: 'Isso.' },
            { text: 'Quando o corpo precisa rodar ao menos uma vez', why: 'Isso é o do...while.' },
            { text: 'Para escolher entre casos', why: 'Isso é o switch.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'curto',
      part: 'Controle',
      title: 'Curto-circuito',
      art: 'alvo',
      goal: 'Entender a avaliação em curto-circuito de && e ||.',
      explain:
        'Os operadores **E** (**&&**) e **OU** (**||**) costumam ser avaliados em **curto-circuito**:\n\n- em **a && b**, se **a** for falso, **b nem é avaliado**;\n- em **a || b**, se **a** for verdadeiro, **b nem é avaliado**.\n\nIsso permite escrever **if (processo != null && processo.ativo())** sem risco de **erro de referência nula**: se processo for nulo, a segunda parte não roda.',
      check: {
        kind: 'choice',
        id: 'cc-c',
        prompt: 'Em "processo != null && processo.ativo()", se processo for nulo, o que acontece?',
        options: [
          { text: 'processo.ativo() nem é chamado', why: 'Isso: o E para no primeiro falso.' },
          { text: 'Dá erro de referência nula', why: 'O curto-circuito evita justamente esse erro.' },
          { text: 'As duas partes são avaliadas', why: 'Com a primeira falsa, a segunda é pulada.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Para **E**, basta um falso para tudo ser falso: não precisa olhar o resto. É como checar "tem processo **e** ele está ativo?": se **não tem** processo, nem adianta perguntar se está ativo.',
        check: {
          kind: 'choice',
          id: 'cc-r',
          prompt: 'Em "a || b", quando b deixa de ser avaliado?',
          options: [
            { text: 'Quando a é verdadeiro', why: 'Isso: no OU, basta um verdadeiro.' },
            { text: 'Quando a é falso', why: 'Com a falso, o OU ainda precisa olhar b.' },
            { text: 'Nunca', why: 'Com curto-circuito, b é pulado quando a é verdadeiro.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['while: testa antes', 'do...while: executa ao menos uma vez', 'switch sem break: para no caso certo'],
      bug: 2,
      why: 'Sem break, a execução cai no caso seguinte.',
      fixed: 'switch sem break: cai no caso seguinte',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que propriedade cada problema viola?',
      categories: ['Finitude', 'Definição', 'Efetividade'],
      items: [
        { text: 'Repetir para sempre', cat: 0, why: 'Não termina.' },
        { text: '"Ajuste o valor conforme achar melhor"', cat: 1, why: 'Passo impreciso.' },
        { text: '"Liste todos os números reais entre 0 e 1"', cat: 2, why: 'Não pode ser executado de fato.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual condição evita erro quando lista pode ser nula?',
      scenarios: [
        { title: 'Condição A', body: '```\nif (lista.tamanho() > 0 && lista != null)\n```' },
        { title: 'Condição B', body: '```\nif (lista != null && lista.tamanho() > 0)\n```' },
      ],
      answer: 1,
      why: 'Na B, se lista for nula, o curto-circuito pula a segunda parte. Na A, tamanho() é chamado antes do teste.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.001' }],
  summary: [
    'Propriedades de Knuth: finitude, definição, entrada (zero ou mais), saída (uma ou mais), efetividade.',
    'Sequência, seleção (if, switch) e repetição (while, do...while, for) bastam.',
    'while testa antes (pode não executar); do...while testa depois (executa ao menos uma vez).',
    'for: voltas conhecidas. switch sem break: fall-through.',
    'Curto-circuito: em a && b, se a é falso, b não é avaliado; em a || b, se a é verdadeiro, b não é avaliado.',
  ],
};

export const devLogComplexidade: MicroLesson = {
  ...S,
  id: 'dev.logica.3',
  series: { id: 'dev.logica', order: 3 },
  title: 'Recursão e notação Big-O',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Duas bonecas russas: dentro de cada uma há outra menor, até a última, que não abre. O que impede de abrir bonecas para sempre?',
    options: [
      { text: 'A última, que não tem outra dentro', why: 'Isso. Na recursão, essa boneca se chama caso base. Esta aula começa por ela.' },
      { text: 'Nada: abre-se para sempre', why: 'Sempre há uma última boneca. Na recursão, também precisa haver.' },
      { text: 'O tamanho da mesa', why: 'O que encerra é a última boneca, a que não abre.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'recursao',
      part: 'Recursão',
      title: 'Caso base e passo recursivo',
      art: 'degraus',
      goal: 'Identificar caso base e passo recursivo.',
      explain:
        'Uma função é **recursiva** quando **chama a si mesma**. Toda recursão correta tem:\n\n1. **Caso base**: resolvido direto, sem nova chamada.\n2. **Passo recursivo**: chamada para um problema **menor**, que se aproxima do caso base.\n\n```\nfunction fatorial(n) {\n  if (n <= 1) return 1;\n  return n * fatorial(n - 1);\n}\n```\n\n**fatorial(4)** = 4 × 3 × 2 × 1 = **24**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'No fatorial, qual é o caso base?',
        options: [
          { text: 'if (n <= 1) return 1', why: 'Isso: resolve sem nova chamada.' },
          { text: 'return n * fatorial(n - 1)', why: 'Esse é o passo recursivo.' },
          { text: 'Não há caso base', why: 'Há: n <= 1 devolve 1.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Volte às bonecas: **abrir uma boneca e achar outra menor** é o passo recursivo; **a última, que não abre**, é o caso base. No fatorial, "n vezes o fatorial de n − 1" é abrir a boneca; "se n for 1, devolve 1" é a última.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Quanto vale fatorial(3)?',
          options: [
            { text: '6', why: 'Isso: 3 × 2 × 1.' },
            { text: '3', why: 'Multiplique até 1: 3 × 2 × 1 = 6.' },
            { text: '9', why: 'Não é 3 × 3: é 3 × 2 × 1.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'pilha',
      part: 'Recursão',
      title: 'A pilha de chamadas e o estouro',
      art: 'cartao',
      goal: 'Saber o que causa o estouro de pilha.',
      explain:
        'Cada chamada ocupa um quadro na **pilha de chamadas** (*call stack*).\n\nSem **caso base**, ou com um passo que **não reduz** o problema, as chamadas se **acumulam** até **estourar a pilha** (*stack overflow*).\n\n```\nfunction soma(n) {\n  return n + soma(n - 1);\n}\n```\n\nNão há caso base: **soma(5)** chama soma(4), soma(3)... e nunca para, até o estouro.\n\nRecursão é elegante, mas gasta memória proporcional à **profundidade**; a versão iterativa usa espaço **constante**.',
      check: {
        kind: 'choice',
        id: 'pi-c',
        prompt: 'O que acontece ao chamar soma(5) na função sem caso base?',
        options: [
          { text: 'As chamadas se acumulam até estourar a pilha', why: 'Isso.' },
          { text: 'Devolve 15', why: 'Sem caso base, ela nunca para de chamar.' },
          { text: 'Devolve 0', why: 'Ela nunca chega a devolver nada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine **empilhar pratos** a cada chamada: cada uma espera a próxima responder. Se nunca houver uma última que responda, a pilha de pratos cresce até **desabar**. Isso é o *stack overflow*. "Parar quando a memória acaba" não é comportamento correto: é erro.',
        check: {
          kind: 'choice',
          id: 'pi-r',
          prompt: 'Qual a vantagem da versão iterativa sobre a recursiva?',
          options: [
            { text: 'Usa espaço constante, sem acumular quadros na pilha', why: 'Isso.' },
            { text: 'Sempre é mais curta de escrever', why: 'Nem sempre; a vantagem é a memória.' },
            { text: 'Não precisa de condição de parada', why: 'Laços também precisam terminar.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'memo',
      part: 'Recursão',
      title: 'Fibonacci ingênuo e memoização',
      art: 'abaco',
      goal: 'Saber por que o Fibonacci ingênuo é exponencial e o que a memoização faz.',
      explain:
        'O Fibonacci recursivo ingênuo:\n\n**fib(n) = fib(n−1) + fib(n−2)**\n\n**recalcula** os mesmos valores muitas vezes. fib(5) chama fib(3) duas vezes, fib(2) três vezes... O custo é **exponencial**.\n\n**Memoização**: **guardar** os resultados já calculados e reusá-los. Reduz o custo para **linear**. É a base da **programação dinâmica**.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'O que a memoização faz?',
        options: [
          { text: 'Guarda resultados já calculados para não recalcular', why: 'Isso.' },
          { text: 'Apaga a pilha de chamadas', why: 'Ela guarda resultados; não apaga a pilha.' },
          { text: 'Transforma a função em laço infinito', why: 'Pelo contrário: torna o cálculo muito mais rápido.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como **anotar a tabuada** num papel: depois de calcular 7 × 8 uma vez, você não refaz a conta, só consulta. O Fibonacci ingênuo refaz as mesmas contas sem parar; com a anotação (memoização), cada valor é calculado **uma vez só**.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Qual o custo do Fibonacci recursivo ingênuo?',
          options: [
            { text: 'Exponencial', why: 'Isso: recalcula os mesmos valores.' },
            { text: 'Constante', why: 'Cresce, e muito, com n.' },
            { text: 'Linear', why: 'Linear é com memoização.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ordens',
      part: 'Complexidade',
      title: 'As ordens de crescimento',
      art: 'progresso',
      goal: 'Ordenar as principais classes de complexidade e dar exemplos.',
      explain:
        '**Big-O** dá um **limite superior** de crescimento. **Ω** é o limite inferior; **Θ**, o justo.\n\nDo mais lento ao mais rápido crescimento:\n\n- **O(1)**: acessar v[i];\n- **O(log n)**: busca binária;\n- **O(n)**: percorrer uma lista;\n- **O(n log n)**: merge sort;\n- **O(n²)**: dois laços aninhados;\n- **O(2ⁿ)**: Fibonacci ingênuo;\n- **O(n!)**: testar todas as permutações.',
      check: {
        kind: 'order',
        id: 'or-c',
        prompt: 'Ordene, do crescimento mais lento ao mais rápido.',
        items: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
        why: 'Constante, logarítmica, linear, linearítmica, quadrática, exponencial.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **n = 1.000**. O(1): 1 passo. O(log n): cerca de 10. O(n): 1.000. O(n log n): cerca de 10 mil. O(n²): 1 milhão. O(2ⁿ): um número com mais de 300 dígitos. Comparar com números concretos ajuda a fixar a ordem.',
        check: {
          kind: 'choice',
          id: 'or-r',
          prompt: 'A busca binária em vetor ordenado é:',
          options: [
            { text: 'O(log n)', why: 'Isso: descarta metade a cada passo.' },
            { text: 'O(n)', why: 'O(n) é a busca linear.' },
            { text: 'O(n²)', why: 'Muito mais rápida que isso.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'regras',
      part: 'Complexidade',
      title: 'As regras práticas',
      art: 'balanca',
      goal: 'Aplicar as regras de simplificação do Big-O.',
      explain:
        '- **Descarte constantes**: O(3n + 10) é **O(n)**.\n- **Fique com o termo dominante**: O(n² + n) é **O(n²)**.\n- Laços **em sequência somam**; laços **aninhados multiplicam**. Um laço de n dentro de outro de n dá **O(n²)**.\n- Um laço que **divide pela metade** a cada volta é **O(log n)**.\n\nExemplo: um laço aninhado n × n e, depois, um laço simples de n: **O(n² + n) = O(n²)**.',
      check: {
        kind: 'choice',
        id: 'rg-c',
        prompt: 'Laço de n dentro de laço de n e, depois, mais um laço de n. A complexidade é:',
        options: [
          { text: 'O(n²)', why: 'Isso: n² + n, fica o dominante.' },
          { text: 'O(3n)', why: 'O aninhado multiplica: n × n.' },
          { text: 'O(n³)', why: 'O laço de fora do aninhamento soma, não multiplica.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte as voltas: o aninhado faz **n × n** = n²; o simples, **n**. Total **n² + n**. Para n grande, n² manda; o "+ n" vira troco. Fica **O(n²)**. E lembre: quando a questão não diz, fala-se do **pior caso**.',
        check: {
          kind: 'choice',
          id: 'rg-r',
          prompt: 'O(2n + 100) é igual a:',
          options: [
            { text: 'O(n)', why: 'Isso: descartam-se as constantes.' },
            { text: 'O(2n)', why: 'A constante 2 também é descartada.' },
            { text: 'O(100)', why: 'O termo que cresce é n.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'hash',
      part: 'Complexidade',
      title: 'Cruzando bases no Tribunal',
      art: 'dados',
      goal: 'Ver como a escolha do algoritmo muda o custo de um cruzamento real.',
      explain:
        'Cruzar a folha de **200 mil servidores** com uma base de **óbitos** comparando **par a par** custa **O(n·m)** e pode levar **horas**.\n\nCarregar uma das bases numa **tabela hash** (conjunto) e consultar a outra reduz para **O(n + m)**.\n\nO mesmo vale para achar CPFs duplicados: comparar cada par é **O(n²)**; usar um **conjunto** é **O(n)** em média.',
      check: {
        kind: 'compare',
        id: 'hs-c',
        prompt: 'Qual estratégia é mais rápida para achar CPFs duplicados numa lista grande?',
        scenarios: [
          { title: 'Estratégia A', body: 'Comparar cada CPF com todos os seguintes, em dois laços aninhados.' },
          { title: 'Estratégia B', body: 'Colocar os CPFs num conjunto (hash) e comparar os tamanhos.' },
        ],
        answer: 1,
        why: 'A é O(n²); B é O(n) em média.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Comparar par a par é como conferir **cada nome da lista com todos os outros**, à mão. Com a tabela hash, é como ter um **fichário em ordem**: para cada nome, você vai direto à gaveta e vê se já existe. Uma olhada por nome, não milhares.',
        check: {
          kind: 'choice',
          id: 'hs-r',
          prompt: 'Cruzar duas bases com tabela hash custa:',
          options: [
            { text: 'O(n + m)', why: 'Isso.' },
            { text: 'O(n·m)', why: 'Esse é o custo do par a par.' },
            { text: 'O(n!)', why: 'Muito mais barato que isso.' },
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
      lines: ['Recursão precisa de caso base', 'Laços aninhados multiplicam', 'Dois laços aninhados de n dão O(2n)'],
      bug: 2,
      why: 'Aninhados multiplicam: O(n²).',
      fixed: 'Dois laços aninhados de n dão O(n²)',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual a complexidade de cada caso?',
      categories: ['O(1)', 'O(n)', 'O(n²)'],
      items: [
        { text: 'Acessar o 10º elemento de um vetor', cat: 0, why: 'Acesso direto.' },
        { text: 'Somar todos os valores de uma lista', cat: 1, why: 'Uma passada.' },
        { text: 'Comparar cada par de uma lista', cat: 2, why: 'Dois laços aninhados.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um laço divide pela metade o intervalo de busca a cada volta, num vetor de n elementos. A complexidade é:',
      options: [
        { text: 'O(log n)', why: 'Isso: dividir pela metade é logarítmico.' },
        { text: 'O(n)', why: 'Ele não olha todos: descarta metade por vez.' },
        { text: 'O(n²)', why: 'Não há laços aninhados sobre n.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.003' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.004' },
  ],
  summary: [
    'Recursão: caso base (resolve direto) e passo recursivo (problema menor).',
    'Sem caso base, as chamadas se acumulam na pilha até o stack overflow. A versão iterativa usa espaço constante.',
    'Fibonacci ingênuo é exponencial; memoização (programação dinâmica) o deixa linear.',
    'Big-O é limite superior (Ω inferior, Θ justo). O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).',
    'Descarte constantes, fique com o dominante; aninhados multiplicam; metade por volta é O(log n). Sem indicação, pior caso.',
  ],
};
