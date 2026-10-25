// Série "Hardware e software" (cap.prim.01, trecho hardware), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como hardware e software se separaram; as seguintes apresentam as
// peças e os tipos de programa, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (02-hardware-software.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.01', sectionId: 'hardware' } as const;

export const primHwHistoria: MicroLesson = {
  ...S,
  id: 'prim.hardware.1',
  series: { id: 'prim.hardware', order: 1 },
  title: 'Da fiação ao programa',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No seu celular, você troca de um aplicativo de banco para um de mensagens em um segundo. Nos primeiros computadores, trocar de tarefa era assim tão fácil?',
    options: [
      { text: 'Não: era preciso mexer na própria máquina', why: 'Isso. Esta aula conta como se chegou ao jeito de hoje, em que basta trocar o programa.' },
      { text: 'Sim, sempre foi um toque na tela', why: 'Telas de toque vieram muito depois. Esta aula mostra como era antes.' },
      { text: 'Os primeiros computadores não trocavam de tarefa nunca', why: 'Trocavam, mas com muito trabalho. Esta aula mostra como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cabos',
      part: 'A história',
      title: 'Programar mudando cabos',
      art: 'valvula',
      goal: 'Entender que no ENIAC as instruções ficavam nas conexões da máquina.',
      explain:
        'Lembra do **ENIAC**, de 1946, aquele computador do tamanho de uma sala?\n\nPara ele resolver **outro problema**, era preciso **mudar cabos e chaves à mão**. Trocar de tarefa podia levar **dias**.\n\nAs instruções não ficavam guardadas em lugar nenhum: estavam, literalmente, **nas conexões da máquina**.',
      example: 'É como se, para trocar a música de um rádio, você tivesse de abrir o aparelho e mudar os fios por dentro.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Como o ENIAC passava a fazer uma tarefa diferente?',
        options: [
          { text: 'Mudando cabos e chaves à mão', why: 'Isso. Por isso trocar de tarefa podia levar dias.' },
          { text: 'Abrindo outro aplicativo', why: 'Aplicativos como os de hoje ainda não existiam.' },
          { text: 'Ele nunca mudava de tarefa', why: 'Mudava, mas com muito trabalho manual.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine uma **central telefônica antiga**, com telefonistas ligando cabos de um furo a outro para conectar as chamadas. No ENIAC era parecido: a tarefa dependia de **como os cabos estavam ligados**. Tarefa nova, cabos religados.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'No ENIAC, onde ficavam as instruções da tarefa?',
          options: [
            { text: 'Nas conexões de cabos e chaves', why: 'Isso.' },
            { text: 'Num aplicativo guardado no celular', why: 'Celulares só surgiram décadas depois.' },
            { text: 'Num pendrive', why: 'O pendrive é de por volta de 2000.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'armazenado',
      part: 'A história',
      title: 'A grande ideia: guardar o programa',
      art: 'chip',
      goal: 'Saber que a ideia de guardar as instruções na memória separou hardware e software.',
      explain:
        'Em **1945**, um relatório de **John von Neumann** sobre o projeto EDVAC descreveu outra ideia: guardar as **instruções na memória**, junto com os dados.\n\nCom isso, trocar de tarefa passa a ser **trocar o programa**, sem mexer nos fios.\n\nFoi aí que nasceu a separação que usamos até hoje: de um lado, a **máquina**; do outro, as **instruções** que ela segue.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'O que mudou com a ideia de guardar as instruções na memória?',
        options: [
          { text: 'Trocar de tarefa passou a ser trocar o programa, sem mexer nos fios', why: 'Isso.' },
          { text: 'O computador passou a não precisar de eletricidade', why: 'Continuou precisando: a mudança foi onde ficam as instruções.' },
          { text: 'As máquinas ficaram do tamanho de um celular na mesma hora', why: 'O encolhimento veio com o transistor e o chip, depois.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte ao rádio: em vez de mudar os fios por dentro, agora você só **troca o disco** que toca. O aparelho é o mesmo; o disco traz a música. Na computação, o aparelho é a máquina e o disco são as **instruções guardadas**, o programa.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Quem descreveu, em 1945, a ideia de guardar as instruções na memória?',
          options: [
            { text: 'John von Neumann, num relatório sobre o EDVAC', why: 'Isso.' },
            { text: 'Blaise Pascal', why: 'Pascal fez a máquina de somar em 1642.' },
            { text: 'Ada Lovelace', why: 'Ada escreveu o primeiro programa em 1843, para a máquina de Babbage.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hardware',
      part: 'Os nomes',
      title: 'Hardware: o que você pode tocar',
      art: 'pessoal',
      goal: 'Reconhecer o que é hardware.',
      explain:
        'A parte **física** do computador chama-se **hardware**: a placa, o processador, os cabos, a tela, o teclado.\n\nUm jeito fácil de lembrar: **se cai no chão e quebra, é hardware**.\n\nA palavra vem do inglês e quer dizer algo como "ferragem", as peças duras da máquina.',
      check: {
        kind: 'multi',
        id: 'hw-c',
        prompt: 'O que é hardware? Marque todos.',
        options: [
          { text: 'A tela', correct: true, why: 'Peça física.' },
          { text: 'O teclado', correct: true, why: 'Você pode tocar.' },
          { text: 'O processador', correct: true, why: 'É uma peça, um chip.' },
          { text: 'O aplicativo de banco', correct: false, why: 'É um programa: você não pega com a mão.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Faça o teste da **mão**: dá para segurar? Então é hardware. Um cabo, um mouse, um chip: dá. Um aplicativo: não, você só o vê funcionando na tela.',
        check: {
          kind: 'choice',
          id: 'hw-r',
          prompt: 'O cabo de rede é:',
          options: [
            { text: 'Hardware', why: 'Isso: é físico.' },
            { text: 'Software', why: 'O cabo você segura com a mão: é hardware.' },
            { text: 'Nem um nem outro', why: 'Tudo o que é físico no computador é hardware.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'software',
      part: 'Os nomes',
      title: 'Software: as instruções',
      art: 'celular',
      goal: 'Reconhecer o que é software e entender que um não serve sem o outro.',
      explain:
        'O conjunto de **instruções** que diz ao hardware o que fazer chama-se **software**. São os **programas**.\n\nVocê não pega um software com a mão. Ele fica gravado e roda dentro da máquina.\n\nUm não serve sem o outro: hardware sem software é uma **caixa parada**; software sem hardware **não tem onde rodar**. Pense num **piano** (hardware) e numa **partitura** (software): a música só acontece com os dois.',
      check: {
        kind: 'sort',
        id: 'sw-c',
        prompt: 'Classifique.',
        categories: ['Hardware', 'Software'],
        items: [
          { text: 'Processador', cat: 0, why: 'Peça física.' },
          { text: 'Programa de planilhas', cat: 1, why: 'Instruções.' },
          { text: 'Monitor', cat: 0, why: 'Peça física.' },
          { text: 'Navegador de internet', cat: 1, why: 'Programa.' },
        ],
      },
      recovery: {
        explain: 'Na história que vimos, o hardware é a **máquina** e o software é o que antes estava **nos cabos** e passou a ficar **guardado**: as instruções. Piano e partitura; rádio e disco.',
        check: {
          kind: 'choice',
          id: 'sw-r',
          prompt: 'O que acontece com um computador sem nenhum software?',
          options: [
            { text: 'Fica parado: não tem instruções para seguir', why: 'Isso.' },
            { text: 'Funciona normalmente', why: 'Sem instruções, o hardware não sabe o que fazer.' },
            { text: 'Vira um software', why: 'Continua sendo hardware, só que parado.' },
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
      prompt: 'Ordene a história.',
      items: ['Relatório de von Neumann sobre guardar o programa (1945)', 'ENIAC é apresentado (1946)', 'Disco rígido do RAMAC (1956)'],
      why: '1945, 1946 e 1956. Repare que a ideia do programa guardado veio no papel antes de virar máquina comum.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Hardware: a parte física', 'Software: as instruções, os programas', 'O teclado é software'],
      bug: 2,
      why: 'O teclado é físico: hardware.',
      fixed: 'O teclado é hardware',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o técnico diz "o problema não é peça, é de programa". Ele quer dizer que o defeito está:',
      options: [
        { text: 'No software', why: 'Isso: programa é software.' },
        { text: 'No hardware', why: 'Ele disse que não é peça.' },
        { text: 'Na tomada', why: 'A tomada é física; ele disse que é programa.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'No ENIAC, trocar de tarefa era mudar cabos e chaves à mão.',
    'Em 1945, von Neumann descreveu a ideia de guardar o programa na memória: nasce a separação entre máquina e instruções.',
    'Hardware: a parte física. Se cai e quebra, é hardware.',
    'Software: as instruções, os programas. Um não serve sem o outro (piano e partitura).',
  ],
};

export const primHwPecas: MicroLesson = {
  ...S,
  id: 'prim.hardware.2',
  series: { id: 'prim.hardware', order: 2 },
  title: 'As peças por dentro',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você abre um processo para ler na mesa e, no fim do dia, guarda no arquivo de aço. Mesa e arquivo fazem a mesma coisa?',
    options: [
      { text: 'Não: a mesa é para trabalhar agora; o arquivo, para guardar', why: 'Isso. O computador tem peças com esses dois papéis, e esta aula mostra quais.' },
      { text: 'Sim, os dois guardam papéis', why: 'Guardam, mas de jeitos diferentes: um por pouco tempo, outro por anos.' },
      { text: 'A mesa guarda por mais tempo que o arquivo', why: 'É o contrário: a mesa é esvaziada; o arquivo guarda por anos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cpu',
      part: 'As peças',
      title: 'O processador executa',
      art: 'chip',
      goal: 'Saber o que o processador faz.',
      explain:
        'Você já conhece o **processador**, ou **CPU**: a peça que **executa as instruções**, uma atrás da outra, **muito rápido**.\n\nAgora que sabemos o que é software, dá para dizer melhor: o processador é quem **segue** as instruções do programa.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'O que o processador faz com as instruções de um programa?',
        options: [
          { text: 'Executa, uma atrás da outra, muito rápido', why: 'Isso.' },
          { text: 'Guarda por anos', why: 'Guardar por anos é papel do armazenamento.' },
          { text: 'Mostra na tela', why: 'Mostrar é papel da tela, um dispositivo de saída.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na partitura e no **pianista**: a partitura é o programa; quem lê nota por nota e toca é o pianista. No computador, o pianista é o **processador**.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Na comparação do piano, o processador é:',
          options: [
            { text: 'O pianista, que segue a partitura', why: 'Isso.' },
            { text: 'A partitura', why: 'A partitura é o software.' },
            { text: 'A plateia', why: 'A plateia não toca nada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ram',
      part: 'As peças',
      title: 'A RAM é a mesa de trabalho',
      art: 'degraus',
      goal: 'Saber que a RAM é rápida e volátil.',
      explain:
        'A **memória RAM** é a **mesa de trabalho**: guarda o que está **aberto agora**.\n\nEla é **rápida**, mas **volátil**: quando o computador desliga, ela **se apaga**.\n\nMesa maior permite abrir mais coisas ao mesmo tempo. Por isso computadores com mais RAM aguentam mais programas abertos juntos.',
      check: {
        kind: 'choice',
        id: 'ra-c',
        prompt: 'Uma memória rápida, que guarda o que está aberto agora e se apaga quando o computador desliga, é a:',
        options: [
          { text: 'Memória RAM', why: 'Isso: rápida e volátil.' },
          { text: 'Unidade SSD', why: 'O SSD guarda mesmo desligado.' },
          { text: 'Placa-mãe', why: 'A placa-mãe é onde as peças se encaixam.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Volátil** quer dizer "que evapora". Como a mesa do escritório que é esvaziada no fim do dia, a RAM fica vazia quando a energia acaba. Por isso salvar o arquivo é importante: salvar é levar da mesa para o armário.',
        check: {
          kind: 'choice',
          id: 'ra-r',
          prompt: 'Faltou luz e você não tinha salvado o texto. O que se perdeu estava:',
          options: [
            { text: 'Na RAM, que é volátil', why: 'Isso: sem energia, a RAM se apaga.' },
            { text: 'No SSD', why: 'O que está no SSD continua lá depois de desligar.' },
            { text: 'No processador', why: 'O processador executa; quem segura o texto aberto é a RAM.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'armazenamento',
      part: 'As peças',
      title: 'O armazenamento é o armário',
      art: 'cartao',
      goal: 'Saber que o armazenamento guarda mesmo desligado e conhecer sua evolução.',
      explain:
        'O **armazenamento** é o **armário**: guarda os arquivos **mesmo com a máquina desligada**.\n\nEle mudou muito:\n\n- primeiro, **cartões perfurados** e **fitas magnéticas**;\n- em **1956**, o **RAMAC**, da IBM, o primeiro com **disco rígido**: cerca de 5 milhões de caracteres num móvel do tamanho de duas geladeiras;\n- depois, **disquete** (a partir de 1971), **CD** e **pendrive** (por volta de 2000).',
      check: {
        kind: 'order',
        id: 'am-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Cartão perfurado', 'Disco rígido do RAMAC (1956)', 'Disquete (a partir de 1971)', 'Pendrive (por volta de 2000)'],
        why: 'Do cartão ao pendrive, cada vez mais coisa em menos espaço.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A RAM é a mesa (esvazia ao desligar); o armazenamento é o **armário** (guarda por anos). O armário foi ficando menor e cabendo mais: de um móvel do tamanho de duas geladeiras a um pendrive no chaveiro.',
        check: {
          kind: 'choice',
          id: 'am-r',
          prompt: 'Você desliga o computador e liga no dia seguinte. Onde o relatório salvo continua guardado?',
          options: [
            { text: 'No armazenamento', why: 'Isso: ele guarda mesmo desligado.' },
            { text: 'Na RAM', why: 'A RAM se apaga ao desligar.' },
            { text: 'No teclado', why: 'O teclado é dispositivo de entrada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hd-ssd',
      part: 'As peças',
      title: 'HD e SSD; e a placa-mãe',
      art: 'degraus',
      goal: 'Diferenciar HD de SSD e saber o que é a placa-mãe.',
      explain:
        'Hoje o armazenamento costuma ser de dois tipos:\n\n- **HD**: um **disco que gira**, herdeiro do RAMAC; mais antigo;\n- **SSD**: **sem partes móveis**, mais rápido.\n\nTodas essas peças precisam de um lugar para se encaixar e conversar: a **placa-mãe**.',
      check: {
        kind: 'sort',
        id: 'hs-c',
        prompt: 'Classifique.',
        categories: ['HD', 'SSD', 'Placa-mãe'],
        items: [
          { text: 'Tem um disco que gira', cat: 0, why: 'Herdeiro do RAMAC.' },
          { text: 'Sem partes móveis, mais rápido', cat: 1, why: 'Armazenamento moderno.' },
          { text: 'Onde as peças se encaixam e conversam', cat: 2, why: 'A placa principal.' },
        ],
      },
      recovery: {
        explain: 'Pense num **toca-discos** (HD: algo girando e uma agulha lendo) e num **pendrive** (SSD: nada se mexe). Os dois guardam mesmo desligados; o SSD é mais rápido. A **placa-mãe** é como a **mesa de reunião** onde todos se sentam para conversar.',
        check: {
          kind: 'choice',
          id: 'hs-r',
          prompt: 'O SSD é:',
          options: [
            { text: 'Uma peça de armazenamento, portanto hardware', why: 'Isso.' },
            { text: 'Um software que acelera o computador', why: 'É uma peça física: hardware.' },
            { text: 'Um tipo de memória RAM', why: 'O SSD guarda mesmo desligado; a RAM não.' },
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
      prompt: 'Mesa ou armário?',
      categories: ['Mesa (RAM)', 'Armário (armazenamento)'],
      items: [
        { text: 'Apaga ao desligar', cat: 0, why: 'Volátil.' },
        { text: 'Guarda o relatório do ano passado', cat: 1, why: 'Guarda por anos.' },
        { text: 'Mais programas abertos ao mesmo tempo', cat: 0, why: 'Mesa maior.' },
        { text: 'SSD ou HD', cat: 1, why: 'Tipos de armazenamento.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['RAM: rápida e volátil', 'SSD: sem partes móveis', 'A RAM guarda os arquivos depois que o computador desliga'],
      bug: 2,
      why: 'A RAM é volátil; quem guarda depois de desligar é o armazenamento.',
      fixed: 'O armazenamento guarda os arquivos depois que o computador desliga',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o computador fica lento quando muitas planilhas estão abertas ao mesmo tempo. Que peça maior ajudaria?',
      options: [
        { text: 'Mais memória RAM', why: 'Isso: mesa maior, mais coisas abertas juntas.' },
        { text: 'Um teclado maior', why: 'O teclado não muda quantas coisas cabem abertas.' },
        { text: 'Uma tela maior', why: 'A tela mostra mais, mas quem segura o que está aberto é a RAM.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.004' }],
  summary: [
    'Processador (CPU): executa as instruções, uma atrás da outra, muito rápido.',
    'RAM: a mesa de trabalho; rápida e volátil (apaga ao desligar).',
    'Armazenamento: o armário; guarda mesmo desligado. Do cartão perfurado ao RAMAC (1956), disquete, CD e pendrive.',
    'HD: disco que gira. SSD: sem partes móveis, mais rápido. Placa-mãe: onde as peças se encaixam.',
  ],
  vocab: [{ term: 'volátil', match: 'vol[aá]til', step: 'ram' }],
};

export const primHwTipos: MicroLesson = {
  ...S,
  id: 'prim.hardware.3',
  series: { id: 'prim.hardware', order: 3 },
  title: 'Programas de sistema e aplicativos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Para você abrir uma planilha, alguém precisa ligar a tela, organizar a memória e chamar o processador. Quem faz esse trabalho de bastidor?',
    options: [
      { text: 'Um programa que cuida da própria máquina', why: 'Isso. Esta aula mostra os dois grandes grupos de software: os que cuidam da máquina e os que resolvem as suas tarefas.' },
      { text: 'A própria planilha, sozinha', why: 'A planilha resolve a sua tarefa; o bastidor é de outro programa, que esta aula apresenta.' },
      { text: 'Ninguém: acontece por mágica', why: 'Nada de mágica: é um programa específico, que esta aula apresenta.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sistema',
      part: 'Tipos de software',
      title: 'Software de sistema',
      art: 'computador',
      goal: 'Reconhecer o software de sistema e o sistema operacional.',
      explain:
        'O **software de sistema** cuida da **própria máquina**.\n\nO principal deles é o **sistema operacional**, como **Windows** ou **Linux**. Ele organiza o hardware, os programas e os arquivos, para que tudo funcione junto.\n\nO sistema operacional é um **software**: ninguém o segura com a mão.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'O sistema operacional é:',
        options: [
          { text: 'Um software de sistema', why: 'Isso: cuida da própria máquina.' },
          { text: 'Uma peça de hardware', why: 'Ninguém segura o sistema operacional com a mão: é software.' },
          { text: 'Um aplicativo de planilha', why: 'A planilha é aplicativo; o sistema operacional cuida da máquina.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no **zelador de um prédio**: ele não mora em nenhum apartamento, mas cuida da luz, da água e do elevador para todos. O **sistema operacional** é o zelador do computador.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Qual destes é um sistema operacional?',
          options: [
            { text: 'Linux', why: 'Isso.' },
            { text: 'Navegador de internet', why: 'O navegador é aplicativo.' },
            { text: 'Teclado', why: 'O teclado é hardware.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'aplicativo',
      part: 'Tipos de software',
      title: 'Software aplicativo',
      art: 'celular',
      goal: 'Reconhecer o software aplicativo.',
      explain:
        'O **software aplicativo** resolve uma **tarefa sua**.\n\nExemplos: **editor de texto**, **planilha**, **navegador** e **aplicativo de banco**.\n\nSe o sistema operacional é o zelador do prédio, os aplicativos são os **moradores**, cada um com sua atividade.',
      check: {
        kind: 'sort',
        id: 'ap-c',
        prompt: 'Classifique.',
        categories: ['Software de sistema', 'Software aplicativo'],
        items: [
          { text: 'Windows', cat: 0, why: 'Sistema operacional.' },
          { text: 'Editor de texto', cat: 1, why: 'Resolve a sua tarefa.' },
          { text: 'Aplicativo de banco', cat: 1, why: 'Resolve a sua tarefa.' },
          { text: 'Linux', cat: 0, why: 'Sistema operacional.' },
        ],
      },
      recovery: {
        explain: 'Pergunte: **este programa existe para cuidar do computador ou para fazer algo por mim?** Cuidar do computador: sistema. Fazer algo por mim (escrever, calcular, pagar uma conta): aplicativo.',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'O navegador de internet é:',
          options: [
            { text: 'Software aplicativo', why: 'Isso: resolve uma tarefa sua.' },
            { text: 'Software de sistema', why: 'Ele não cuida da máquina; ajuda você a navegar.' },
            { text: 'Hardware', why: 'Não se segura com a mão: é software.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'juntos',
      part: 'Juntando',
      title: 'Todos trabalhando juntos',
      art: 'pessoal',
      goal: 'Acompanhar hardware, sistema e aplicativo num exemplo completo.',
      explain:
        'Ao abrir uma planilha:\n\n1. o **sistema operacional** (software de sistema)\n2. pede ao **processador** e à **memória** (hardware)\n3. que executem o **programa de planilha** (software aplicativo).\n\nOs três trabalham juntos o tempo todo.',
      check: {
        kind: 'order',
        id: 'ju-c',
        prompt: 'Ordene o que acontece ao abrir uma planilha.',
        items: ['Você pede para abrir a planilha', 'O sistema operacional organiza o pedido', 'Processador e memória executam o programa', 'A planilha aparece na tela'],
        why: 'Pedido, sistema, hardware executando, resultado.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'No prédio: um morador (aplicativo) precisa de água; o zelador (sistema operacional) abre o registro; os canos e a bomba (hardware) levam a água. Sem qualquer um dos três, a água não chega.',
        check: {
          kind: 'choice',
          id: 'ju-r',
          prompt: 'Ao abrir uma planilha, quem executa de fato o programa?',
          options: [
            { text: 'O processador e a memória (hardware)', why: 'Isso, a pedido do sistema operacional.' },
            { text: 'O teclado', why: 'O teclado só leva o seu pedido para dentro.' },
            { text: 'A própria planilha, sem hardware', why: 'Software sem hardware não tem onde rodar.' },
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
      prompt: 'Hardware, sistema ou aplicativo?',
      categories: ['Hardware', 'Software de sistema', 'Software aplicativo'],
      items: [
        { text: 'Memória RAM', cat: 0, why: 'Peça física.' },
        { text: 'Windows', cat: 1, why: 'Sistema operacional.' },
        { text: 'Planilha', cat: 2, why: 'Resolve a sua tarefa.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Linux: software de sistema', 'Navegador: software aplicativo', 'O sistema operacional é hardware'],
      bug: 2,
      why: 'O sistema operacional é software, de sistema.',
      fixed: 'O sistema operacional é software de sistema',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o celular foi atualizado para uma versão nova do Android, o sistema dele. O que foi atualizado?',
      options: [
        { text: 'O software de sistema', why: 'Isso: Android é o sistema operacional do celular.' },
        { text: 'O hardware', why: 'As peças continuaram as mesmas.' },
        { text: 'Só um aplicativo de mensagens', why: 'Foi o sistema operacional inteiro.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.003' }],
  summary: [
    'Software de sistema cuida da máquina; o principal é o sistema operacional (Windows, Linux).',
    'Software aplicativo resolve a sua tarefa: editor de texto, planilha, navegador, banco.',
    'Ao abrir um programa, sistema operacional, hardware e aplicativo trabalham juntos.',
  ],
};
