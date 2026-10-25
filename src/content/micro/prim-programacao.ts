// Série "Algoritmos e programação" (cap.prim.01, trecho programacao), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta como se passou da receita passo a passo às linguagens de
// hoje; as seguintes apresentam algoritmo e variável, depois condição e repetição, uma ideia por etapa.
// Fatos conferidos com o texto do capítulo (04-programacao.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.01', sectionId: 'programacao' } as const;

export const primProgHistoria: MicroLesson = {
  ...S,
  id: 'prim.programacao.1',
  series: { id: 'prim.programacao', order: 1 },
  title: 'Da receita à linguagem de programação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma receita de bolo diz: misture, bata, despeje, asse por 40 minutos. Isso tem alguma coisa a ver com computador?',
    options: [
      { text: 'Sim: é uma lista de passos, como um programa', why: 'Isso. Esta aula conta como essa ideia virou a programação de hoje.' },
      { text: 'Não: receita é só coisa de cozinha', why: 'Tem tudo a ver: programar é escrever passos em ordem, como numa receita.' },
      { text: 'Só se o bolo for feito por um robô', why: 'Não precisa de robô: a ideia de passos em ordem é a mesma.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'palavra',
      part: 'A história',
      title: 'Uma palavra com mil anos',
      art: 'abaco',
      goal: 'Saber de onde vem a palavra "algoritmo" e o que ela quer dizer.',
      explain:
        'A palavra **algoritmo** vem do nome de um matemático persa, **al-Khwarizmi**, que viveu no **século IX**.\n\nEle escreveu sobre como fazer contas **passo a passo**.\n\nÉ isso que um algoritmo é até hoje: uma **sequência de passos, em ordem**, para resolver um problema. Muito antes de existir computador, as pessoas já seguiam algoritmos.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'De onde vem a palavra "algoritmo"?',
        options: [
          { text: 'Do nome do matemático persa al-Khwarizmi', why: 'Isso, do século IX.' },
          { text: 'De uma marca de computador', why: 'A palavra é muito mais antiga que os computadores.' },
          { text: 'Do inglês "bug"', why: 'Bug quer dizer inseto e virou nome de erro; não tem relação com algoritmo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em como você aprendeu a fazer uma **conta de dividir** na escola: um passo, depois outro, sempre na mesma ordem. Esse "jeito de fazer, passo a passo" é um algoritmo. O nome homenageia **al-Khwarizmi**, que escreveu sobre esses métodos de conta.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Um algoritmo é:',
          options: [
            { text: 'Uma sequência de passos, em ordem, para resolver um problema', why: 'Isso.' },
            { text: 'Uma peça do computador', why: 'Peça é hardware; algoritmo é uma ideia, uma receita.' },
            { text: 'Um tipo de arquivo', why: 'Tipos de arquivo são indicados pela extensão.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ada-maquina',
      part: 'A história',
      title: 'Ada e a linguagem de máquina',
      art: 'cartao',
      goal: 'Lembrar o programa de Ada Lovelace e saber que os primeiros computadores só entendiam números.',
      explain:
        'Em **1843**, **Ada Lovelace** publicou instruções para a máquina analítica de **Charles Babbage**, que nunca foi terminada. É considerado o **primeiro programa** de computador.\n\nQuando os computadores de verdade chegaram, nos **anos 1940**, eles só entendiam instruções em **números**: a **linguagem de máquina**.\n\nEscrever um programa assim era **lento** e **fácil de errar**.',
      example: 'Imagine escrever uma receita inteira só com códigos: "3 7 2 9" em vez de "misture os ovos".',
      check: {
        kind: 'choice',
        id: 'am-c',
        prompt: 'Como era a linguagem de máquina dos primeiros computadores?',
        options: [
          { text: 'Instruções em números, lentas de escrever e fáceis de errar', why: 'Isso.' },
          { text: 'Frases em português', why: 'Linguagens próximas da escrita humana vieram bem depois.' },
          { text: 'Desenhos na tela', why: 'Os primeiros computadores nem tinham tela como as de hoje.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Lembra dos **bits**, os zeros e uns? A máquina, por dentro, só entende isso. A **linguagem de máquina** é escrever as instruções nesse idioma de números, sem palavras. Funciona, mas um único número errado estraga o programa, e achar o erro é difícil.',
        check: {
          kind: 'choice',
          id: 'am-r',
          prompt: 'Quem publicou, em 1843, o que é considerado o primeiro programa de computador?',
          options: [
            { text: 'Ada Lovelace', why: 'Isso, para a máquina analítica de Babbage.' },
            { text: 'Grace Hopper', why: 'Grace Hopper criou um dos primeiros compiladores, em 1952.' },
            { text: 'Linus Torvalds', why: 'Linus Torvalds começou o Linux em 1991.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'bug',
      part: 'A história',
      title: 'Por que erro se chama bug',
      art: 'revisao',
      goal: 'Conhecer a história da mariposa de 1947 e o sentido de "bug".',
      explain:
        'Em **1947**, a equipe do computador **Harvard Mark II** achou uma **mariposa** presa numa peça da máquina.\n\nEles **colaram o inseto** no caderno de registros.\n\nO caso ajudou a popularizar a palavra **bug**, que quer dizer **inseto** em inglês, para **erro em computador**. Até hoje se diz que um programa "tem um bug" quando ele faz algo errado.',
      check: {
        kind: 'choice',
        id: 'bu-c',
        prompt: 'Um aplicativo fecha sozinho quando você toca num botão. Um programador diria que ele tem:',
        options: [
          { text: 'Um bug, um erro', why: 'Isso.' },
          { text: 'Um algoritmo novo', why: 'Algoritmo é a receita; o erro nela se chama bug.' },
          { text: 'Uma extensão', why: 'Extensão é o final do nome de um arquivo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A palavra vem de um **inseto de verdade**: uma mariposa que atrapalhou o Harvard Mark II em 1947 e foi colada no caderno da equipe. Desde então, "bug" (inseto) ficou como apelido de **erro** em programa.',
        check: {
          kind: 'choice',
          id: 'bu-r',
          prompt: 'O que a equipe do Harvard Mark II encontrou em 1947?',
          options: [
            { text: 'Uma mariposa presa numa peça da máquina', why: 'Isso.' },
            { text: 'Um pendrive esquecido', why: 'O pendrive é de por volta de 2000.' },
            { text: 'Um vírus de e-mail', why: 'E-mail, como o de hoje, ainda não existia.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tradutor',
      part: 'A história',
      title: 'O tradutor automático',
      art: 'engrenagem',
      goal: 'Saber o que é um compilador e o papel de Grace Hopper e do FORTRAN.',
      explain:
        'Em **1952**, **Grace Hopper** criou um dos primeiros **compiladores**, o **A-0**.\n\nUm compilador é um **tradutor**: pega instruções escritas por pessoas e traduz para a **linguagem de máquina**.\n\nEm **1957**, a IBM lançou o **FORTRAN**, uma das primeiras linguagens muito usadas, em que se escrevia algo parecido com **fórmulas de matemática**.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'O que faz um compilador?',
        options: [
          { text: 'Traduz instruções escritas por pessoas para a linguagem de máquina', why: 'Isso.' },
          { text: 'Organiza os arquivos em pastas', why: 'Isso é tarefa do sistema operacional.' },
          { text: 'Imprime o programa em papel', why: 'Imprimir é com a impressora.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **intérprete de idiomas** numa audiência: a testemunha fala português, o juiz estrangeiro ouve na língua dele. O compilador faz isso entre a pessoa que programa e a máquina: você escreve algo legível, ele entrega à máquina **em números**.',
        check: {
          kind: 'order',
          id: 'tr-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Programa de Ada Lovelace (1843)', 'Compilador A-0 de Grace Hopper (1952)', 'FORTRAN, da IBM (1957)'],
          why: '1843, 1952 e 1957: da primeira receita para máquina ao tradutor e às linguagens.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hoje',
      part: 'A história',
      title: 'As linguagens de hoje',
      art: 'teclado',
      goal: 'Conhecer Python, Java e JavaScript e saber que programa é algoritmo escrito numa linguagem.',
      explain:
        'Nos **anos 1990** chegaram linguagens muito usadas até hoje:\n\n- **Python**, lançado em **1991**;\n- **Java** e **JavaScript**, em **1995**.\n\nElas são bem mais próximas da **escrita humana** do que os números dos anos 1940.\n\nE aqui juntamos tudo: um **programa** é um **algoritmo** escrito numa **linguagem de programação**.',
      check: {
        kind: 'multi',
        id: 'ho-c',
        prompt: 'Quais são linguagens de programação? Marque todas.',
        options: [
          { text: 'Python', correct: true, why: 'Isso, de 1991.' },
          { text: 'Java', correct: true, why: 'Isso, de 1995.' },
          { text: 'JavaScript', correct: true, why: 'Isso, de 1995.' },
          { text: 'Windows', correct: false, why: 'Windows é sistema operacional.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A receita é a mesma; o que muda é o **idioma** em que ela está escrita. O algoritmo é a receita; a **linguagem** (Python, Java, JavaScript) é o idioma; o **programa** é a receita escrita nesse idioma, pronta para a máquina seguir.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'Um programa é:',
          options: [
            { text: 'Um algoritmo escrito numa linguagem de programação', why: 'Isso.' },
            { text: 'Uma peça física do computador', why: 'Programa é software, não peça.' },
            { text: 'O mesmo que uma pasta', why: 'Pasta agrupa arquivos; programa é um conjunto de instruções.' },
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
      prompt: 'Ordene a história inteira.',
      items: ['al-Khwarizmi escreve sobre contas passo a passo (século IX)', 'Ada Lovelace publica o primeiro programa (1843)', 'A mariposa do Harvard Mark II (1947)', 'Python é lançado (1991)'],
      why: 'Dos passos de conta à linguagem moderna, passando pelo primeiro programa e pelo primeiro "bug" famoso.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Compilador: traduz para a linguagem de máquina', 'FORTRAN: lançado pela IBM em 1957', 'Bug: um novo tipo de processador'],
      bug: 2,
      why: 'Bug é o nome dado a um erro em programa.',
      fixed: 'Bug: um erro em programa',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega escreve um programa em Python. Para a máquina executar, o que precisa acontecer?',
      options: [
        { text: 'As instruções são traduzidas para a linguagem de máquina', why: 'Isso: a máquina, por dentro, só entende números.' },
        { text: 'Nada: a máquina entende Python direto, como uma pessoa', why: 'Por dentro, a máquina só entende a linguagem de máquina; há sempre uma tradução.' },
        { text: 'O programa precisa ser impresso', why: 'Imprimir não faz o computador executar nada.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'A palavra algoritmo vem do matemático persa al-Khwarizmi (século IX): passos em ordem para resolver um problema.',
    'Ada Lovelace publicou o primeiro programa em 1843. Nos anos 1940, programava-se em números, a linguagem de máquina.',
    'Em 1947, a mariposa do Harvard Mark II ajudou a popularizar "bug" como nome de erro.',
    'Grace Hopper criou um dos primeiros compiladores (1952); a IBM lançou o FORTRAN (1957).',
    'Python (1991), Java e JavaScript (1995): um programa é um algoritmo escrito numa linguagem.',
  ],
};

export const primProgVariavel: MicroLesson = {
  ...S,
  id: 'prim.programacao.2',
  series: { id: 'prim.programacao', order: 2 },
  title: 'Algoritmo e variável',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma receita diz "asse até ficar bom". Outra diz "asse por 40 minutos". Qual uma pessoa que nunca cozinhou consegue seguir sem dúvida?',
    options: [
      { text: '"Asse por 40 minutos"', why: 'Isso. Um bom algoritmo tem passos claros, e esta aula mostra por quê.' },
      { text: '"Asse até ficar bom"', why: 'Quem nunca cozinhou não sabe o que é "bom". O passo precisa ser claro.' },
      { text: 'As duas são igualmente claras', why: 'Uma tem tempo exato; a outra depende de quem está cozinhando.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'receita',
      part: 'Algoritmo',
      title: 'A ordem importa',
      art: 'livro',
      goal: 'Entender que num algoritmo a ordem dos passos muda o resultado.',
      explain:
        'Um **algoritmo** é uma sequência de passos, **em ordem**, para resolver um problema.\n\nA receita de bolo é um algoritmo: **misture, bata, despeje, asse por 40 minutos**.\n\nSe você **troca a ordem**, o resultado **muda**. Assar antes de misturar não dá bolo.',
      check: {
        kind: 'order',
        id: 're-c',
        prompt: 'Coloque a receita na ordem certa.',
        items: ['Misture', 'Bata', 'Despeje na forma', 'Asse por 40 minutos'],
        why: 'Misture, bata, despeje, asse: em outra ordem, o resultado muda.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **vestir-se**: meia, depois sapato. Ao contrário, não funciona. Num algoritmo é igual: cada passo depende do anterior, e por isso a **ordem** faz parte da receita.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'O que acontece se você troca a ordem dos passos de um algoritmo?',
          options: [
            { text: 'O resultado pode mudar', why: 'Isso: a ordem faz parte do algoritmo.' },
            { text: 'Nada, o resultado é sempre igual', why: 'Assar antes de misturar não dá bolo: a ordem importa.' },
            { text: 'O computador desliga', why: 'Não desliga; só o resultado sai diferente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'claro',
      part: 'Algoritmo',
      title: 'Passos claros e um fim',
      art: 'alvo',
      goal: 'Reconhecer as três marcas de um bom algoritmo.',
      explain:
        'Um bom algoritmo tem:\n\n- **passos claros**;\n- **ordem definida**;\n- **um fim**.\n\n"Asse até ficar bom" é **vago**: cada um entende de um jeito. "Asse por 40 minutos" é **claro**: qualquer um segue igual.\n\nO computador não adivinha: ele só segue o que está escrito.',
      check: {
        kind: 'compare',
        id: 'cl-c',
        prompt: 'Qual instrução serve para um algoritmo?',
        scenarios: [
          { title: 'Instrução A', body: 'Confira as notas fiscais até cansar.' },
          { title: 'Instrução B', body: 'Confira cada nota fiscal da pilha e pare quando a pilha acabar.' },
        ],
        answer: 1,
        why: 'A instrução B é clara e tem fim: a pilha acabar. "Até cansar" é vago.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine entregar a receita a alguém que **nunca cozinhou** e que faz **exatamente** o que está escrito, sem adivinhar nada. Esse alguém é o computador. Se o passo for vago ("até ficar bom") ou não tiver fim, ele não sabe o que fazer.',
        check: {
          kind: 'multi',
          id: 'cl-r',
          prompt: 'Quais são marcas de um bom algoritmo? Marque todas.',
          options: [
            { text: 'Passos claros', correct: true, why: 'Isso.' },
            { text: 'Ordem definida', correct: true, why: 'Isso.' },
            { text: 'Um fim', correct: true, why: 'Isso.' },
            { text: 'Passos vagos, para dar liberdade', correct: false, why: 'O computador não adivinha: passos vagos não funcionam.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'variavel',
      part: 'Variável',
      title: 'A caixinha com etiqueta',
      art: 'dados',
      goal: 'Saber o que é uma variável.',
      explain:
        'Uma **variável** é um espaço na **memória** com um **nome**, onde o programa guarda um **valor**.\n\nPense num **pote com etiqueta "açúcar"**. O que está dentro pode mudar, mas a **etiqueta continua a mesma**.\n\nExemplo:\n\n`valor = 1500`\n\nguarda o número **1500** na variável chamada **valor**.',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'Em "valor = 1500", qual é o nome da variável e qual é o conteúdo?',
        options: [
          { text: 'Nome: valor. Conteúdo: 1500', why: 'Isso: a etiqueta é "valor" e dentro está 1500.' },
          { text: 'Nome: 1500. Conteúdo: valor', why: 'É o contrário: o nome fica à esquerda, o conteúdo à direita.' },
          { text: 'Não há variável aí', why: 'Há sim: "valor" é a variável.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia o sinal **=** como "**guarde em**", da direita para a esquerda: "guarde 1500 no pote chamado valor". À esquerda fica a **etiqueta** (o nome); à direita, o que vai **dentro** (o valor).',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: 'Em "limite = 5000", o que fica guardado na variável limite?',
          options: [
            { text: 'O número 5000', why: 'Isso.' },
            { text: 'A palavra "limite"', why: '"limite" é a etiqueta, o nome da variável.' },
            { text: 'Nada', why: 'O sinal = guarda 5000 na variável.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'muda',
      part: 'Variável',
      title: 'O conteúdo pode mudar',
      art: 'degraus',
      goal: 'Entender que o valor de uma variável pode ser trocado durante o programa.',
      explain:
        'Depois de `valor = 1500`, o programa pode fazer:\n\n`valor = valor + 100`\n\nLeia assim: pegue o que está em **valor** (1500), some **100** e guarde de volta em **valor**.\n\nAgora o conteúdo é **1600**. O **nome** ficou; o **conteúdo** mudou. Por isso se chama **variável**: o que está dentro **varia**.',
      check: {
        kind: 'choice',
        id: 'mu-c',
        prompt: 'O programa faz "valor = 1500" e depois "valor = valor + 100". Quanto vale "valor" no fim?',
        options: [
          { text: '1600', why: 'Isso: 1500 + 100, guardado de volta em valor.' },
          { text: '1500', why: 'O segundo passo trocou o conteúdo: agora é 1600.' },
          { text: '100', why: 'O programa somou 100 ao que já havia (1500).' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Volte ao pote: havia **1500 gramas** de açúcar; você **põe mais 100**. Agora há **1600**, e a etiqueta continua dizendo "açúcar". Em `valor = valor + 100`, primeiro se faz a conta do lado direito, com o conteúdo antigo, e depois se guarda o resultado no mesmo pote.',
        check: {
          kind: 'choice',
          id: 'mu-r',
          prompt: '"total = 10" e depois "total = total + 5". Quanto vale total?',
          options: [
            { text: '15', why: 'Isso: 10 + 5.' },
            { text: '10', why: 'O segundo passo mudou o conteúdo.' },
            { text: '5', why: 'Somou-se 5 ao que já havia, 10.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Algoritmo: passos claros, em ordem, com um fim', 'Variável: espaço na memória com um nome', 'O valor de uma variável nunca pode mudar'],
      bug: 2,
      why: 'O nome fica, mas o conteúdo pode ser trocado durante o programa.',
      fixed: 'O valor de uma variável pode mudar; o nome fica',
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene o algoritmo para trocar uma lâmpada.',
      items: ['Desligue o interruptor', 'Retire a lâmpada queimada', 'Coloque a lâmpada nova', 'Ligue o interruptor e teste'],
      why: 'Desligar primeiro por segurança; testar só no fim.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: "contador = 0", depois "contador = contador + 1" três vezes seguidas. Quanto vale contador?',
      options: [
        { text: '3', why: 'Isso: 0, 1, 2, 3.' },
        { text: '1', why: 'A soma foi feita três vezes, uma sobre a outra.' },
        { text: '0', why: 'O conteúdo mudou a cada soma.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.007' }],
  summary: [
    'Algoritmo: passos em ordem para resolver um problema. Trocar a ordem muda o resultado.',
    'Um bom algoritmo tem passos claros, ordem definida e um fim ("asse por 40 minutos", não "até ficar bom").',
    'Variável: espaço na memória com um nome, que guarda um valor (valor = 1500).',
    'O conteúdo pode mudar (valor = valor + 100 dá 1600); o nome fica.',
  ],
  vocab: [{ term: 'variável', match: 'vari[aá]vel', step: 'variavel' }],
};

export const primProgDecisao: MicroLesson = {
  ...S,
  id: 'prim.programacao.3',
  series: { id: 'prim.programacao', order: 3 },
  title: 'Condição e repetição',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você tem mil notas fiscais para conferir e separar as acima de um valor. Precisa escrever mil vezes a mesma instrução?',
    options: [
      { text: 'Não: dá para mandar repetir e decidir em cada nota', why: 'Isso. Esta aula mostra as duas ferramentas: a condição e a repetição.' },
      { text: 'Sim, uma instrução para cada nota', why: 'Daria um trabalho enorme. Existe um jeito de mandar repetir.' },
      { text: 'Computador não consegue fazer isso', why: 'Consegue, e muito rápido. Esta aula mostra como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'se',
      part: 'Condição',
      title: 'O "se... senão"',
      art: 'balanca',
      goal: 'Entender que a condição faz o programa escolher um caminho.',
      explain:
        'Uma **condição** faz o programa **escolher um caminho**. A forma mais comum é **se... senão**.\n\nDo dia a dia: **se** estiver chovendo, leve o guarda-chuva; **senão**, leve o boné.\n\nDo Tribunal: **se** o valor do contrato for maior que o limite, marque para análise; **senão**, arquive.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Regra: "se o valor for maior que 5000, marque para análise; senão, arquive". Um contrato de 3000 é:',
        options: [
          { text: 'Arquivado', why: 'Isso: 3000 não é maior que 5000, então vai para o "senão".' },
          { text: 'Marcado para análise', why: '3000 não passa de 5000; vale o "senão".' },
          { text: 'Os dois ao mesmo tempo', why: 'A condição escolhe um caminho só.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'A condição é uma **bifurcação na estrada**: o programa faz uma pergunta ("o valor é maior que o limite?"). **Sim**: segue pelo "se". **Não**: segue pelo "senão". Nunca pelos dois.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: '"Se estiver chovendo, leve o guarda-chuva; senão, leve o boné." Está sol. O que você leva?',
          options: [
            { text: 'O boné', why: 'Isso: não está chovendo, então vale o "senão".' },
            { text: 'O guarda-chuva', why: 'O guarda-chuva é para quando chove.' },
            { text: 'Nada', why: 'O "senão" manda levar o boné.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'para-cada',
      part: 'Repetição',
      title: 'O "para cada"',
      art: 'trilha',
      goal: 'Entender que o "para cada" repete uma vez para cada item.',
      explain:
        'Uma **repetição**, também chamada de **laço**, faz o programa **repetir passos** sem você escrever tudo de novo.\n\nO **para cada** repete **uma vez para cada item**:\n\n"**Para cada** nota fiscal da pilha, confira o valor."\n\nSe a pilha tem mil notas, o passo roda mil vezes, e você escreveu **uma linha só**.',
      check: {
        kind: 'choice',
        id: 'pc-c',
        prompt: '"Para cada processo da lista, carimbe a data." A lista tem 12 processos. Quantas vezes o carimbo é usado?',
        options: [
          { text: '12', why: 'Isso: uma vez para cada item.' },
          { text: '1', why: 'O "para cada" repete para todos os itens, não só o primeiro.' },
          { text: 'Infinitas', why: 'Termina quando os itens acabam.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como **distribuir convites**: "para cada pessoa da lista, entregue um convite". Você não escreve "entregue para Ana, entregue para Bruno...". Escreve uma vez, e a repetição passa por **cada nome** até a lista acabar.',
        check: {
          kind: 'choice',
          id: 'pc-r',
          prompt: 'Outro nome para repetição em programação é:',
          options: [
            { text: 'Laço', why: 'Isso.' },
            { text: 'Extensão', why: 'Extensão é o final do nome de um arquivo.' },
            { text: 'Variável', why: 'Variável é o pote com etiqueta que guarda um valor.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'enquanto',
      part: 'Repetição',
      title: 'O "enquanto"',
      art: 'interruptor',
      goal: 'Entender que o "enquanto" repete enquanto uma condição for verdadeira.',
      explain:
        'O **enquanto** repete **enquanto uma condição for verdadeira**:\n\n"**Enquanto** houver processos na fila, atenda o próximo."\n\nA cada volta, o programa pergunta de novo: "ainda há processos?". **Sim**: atende mais um. **Não**: para.\n\nDiferença: o "para cada" anda por uma lista conhecida; o "enquanto" depende de uma **pergunta** que se repete.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: '"Enquanto houver processos na fila, atenda o próximo." Quando a repetição para?',
        options: [
          { text: 'Quando a fila ficar vazia', why: 'Isso: a condição deixa de ser verdadeira.' },
          { text: 'Depois do primeiro processo', why: 'Ela continua enquanto houver processos.' },
          { text: 'Nunca', why: 'Ela para quando a condição fica falsa: fila vazia.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **encher um copo**: "enquanto o copo não estiver cheio, continue colocando água". A cada instante você olha o copo. Quando a resposta muda (encheu), você para. O "enquanto" é essa olhada repetida.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'O "enquanto" repete:',
          options: [
            { text: 'Enquanto uma condição for verdadeira', why: 'Isso.' },
            { text: 'Sempre exatamente 10 vezes', why: 'Não há número fixo: depende da condição.' },
            { text: 'Só uma vez', why: 'Repete enquanto a condição continuar verdadeira.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'infinito',
      part: 'Repetição',
      title: 'O laço infinito',
      art: 'revisao',
      goal: 'Reconhecer o laço infinito como um erro.',
      explain:
        'Se a condição de um **enquanto** **nunca ficar falsa**, o laço **não termina**. É o **laço infinito**.\n\nExemplo: "**enquanto** houver processos na fila, **olhe a fila**". Quem só olha não atende ninguém, a fila nunca diminui, e a repetição **nunca para**.\n\nPor isso, dentro do laço, algo precisa ir **mudando** até a condição ficar falsa.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Por que "enquanto houver processos na fila, olhe a fila" vira um laço infinito?',
        options: [
          { text: 'Porque nada tira processos da fila, e a condição nunca fica falsa', why: 'Isso.' },
          { text: 'Porque a fila é grande demais', why: 'Mesmo uma fila pequena nunca acabaria se ninguém for atendido.' },
          { text: 'Não vira: todo laço termina sozinho', why: 'Se a condição nunca ficar falsa, o laço não termina.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Voltando ao copo: "enquanto o copo não estiver cheio, **olhe para ele**". Se você só olha e não põe água, o copo nunca enche e você fica ali para sempre. No laço, algum passo precisa **aproximar o fim**: atender um processo, pôr água.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Um laço "enquanto" sempre termina sozinho, qualquer que seja a condição?',
          options: [
            { text: 'Não: se a condição nunca ficar falsa, vira laço infinito', why: 'Isso.' },
            { text: 'Sim, sempre termina', why: 'Se nada mudar a condição, ele não termina.' },
            { text: 'Só termina se o computador desligar', why: 'Um laço bem feito termina quando a condição fica falsa.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'juntos',
      part: 'Juntando',
      title: 'Laço, condição e variável juntos',
      art: 'pessoal',
      goal: 'Ver variável, condição e repetição trabalhando juntas numa tarefa real.',
      explain:
        'Conferir **mil notas fiscais** e separar as acima de um valor usa as três ferramentas:\n\n1. um **laço** que passa por **cada nota**;\n2. uma **condição** que **compara o valor** com o limite;\n3. uma **variável** que **conta** quantas foram separadas.\n\nCom variáveis, condições e repetições você já descreve muitas tarefas.',
      check: {
        kind: 'sort',
        id: 'ju-c',
        prompt: 'Qual ferramenta faz cada parte da tarefa?',
        categories: ['Repetição', 'Condição', 'Variável'],
        items: [
          { text: 'Passar por cada nota fiscal', cat: 0, why: 'Para cada nota: repetição.' },
          { text: 'Comparar o valor com o limite', cat: 1, why: 'Se passar do limite: condição.' },
          { text: 'Guardar quantas foram separadas', cat: 2, why: 'O contador fica numa variável.' },
        ],
      },
      recovery: {
        explain: 'Imagine um servidor fazendo à mão: pega **nota por nota** (repetição); em cada uma, pergunta **"passou do limite?"** (condição); quando sim, faz um **risquinho** num papel para contar (variável). O programa faz exatamente isso, só que muito mais rápido.',
        check: {
          kind: 'choice',
          id: 'ju-r',
          prompt: 'Na tarefa das notas, o que decide se uma nota é separada?',
          options: [
            { text: 'A condição', why: 'Isso: "se o valor passar do limite".' },
            { text: 'A repetição', why: 'A repetição só passa por cada nota; quem decide é a condição.' },
            { text: 'A extensão do arquivo', why: 'Extensão é o tipo do arquivo; não decide nada aqui.' },
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
      prompt: 'Condição ou repetição?',
      categories: ['Condição', 'Repetição'],
      items: [
        { text: 'Se o prazo venceu, avise o setor', cat: 0, why: 'Escolhe um caminho: condição.' },
        { text: 'Para cada servidor da lista, envie o aviso', cat: 1, why: 'Repete por item: repetição.' },
        { text: 'Enquanto houver e-mails não lidos, abra o próximo', cat: 1, why: 'Repete enquanto for verdade: repetição.' },
        { text: 'Se a senha estiver errada, negue o acesso', cat: 0, why: 'Escolhe um caminho: condição.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['"Se... senão" escolhe um caminho', '"Para cada" repete uma vez por item', 'Todo "enquanto" termina sozinho'],
      bug: 2,
      why: 'Se a condição nunca ficar falsa, o "enquanto" vira laço infinito.',
      fixed: 'Um "enquanto" só termina quando a condição fica falsa',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual laço termina?',
      scenarios: [
        { title: 'Laço A', body: 'Enquanto houver processos na fila, atenda o próximo.' },
        { title: 'Laço B', body: 'Enquanto houver processos na fila, olhe a fila.' },
      ],
      answer: 0,
      why: 'No laço A, cada volta tira um processo da fila, até ela esvaziar. No B, nada muda: laço infinito.',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.008' }],
  summary: [
    'Condição (se... senão): o programa escolhe um caminho, nunca os dois.',
    'Repetição, ou laço: "para cada" repete uma vez por item; "enquanto" repete enquanto a condição for verdadeira.',
    'Se a condição de um "enquanto" nunca ficar falsa, é laço infinito: um erro.',
    'Laço, condição e variável juntos descrevem tarefas reais, como conferir mil notas fiscais.',
  ],
};
