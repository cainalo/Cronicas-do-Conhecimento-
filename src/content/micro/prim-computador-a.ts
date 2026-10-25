// Série "O que é um computador" (cap.prim.01, trecho computador), aulas 1 e 2. Ritmo pedido em
// 25/10/2026: para quem não sabe nada de computação, devagar, começando pela história de como o
// computador surgiu e foi melhorando. Uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (01-o-que-e.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.01', sectionId: 'computador' } as const;

export const primHistoria: MicroLesson = {
  ...S,
  id: 'prim.computador.1',
  series: { id: 'prim.computador', order: 1 },
  title: 'Como o computador surgiu',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Antes de existir computador, como alguém fazia uma conta grande, como somar os gastos de um ano inteiro?',
    options: [
      { text: 'À mão, com papel, ou com ajuda de objetos para contar', why: 'Isso. Por muito tempo, quem fazia a conta era a pessoa. Esta aula conta como isso foi mudando até chegar ao computador.' },
      { text: 'Não era possível fazer contas grandes', why: 'Era possível, só que demorava e dava erro. Esta aula mostra como as máquinas foram ajudando.' },
      { text: 'Com o celular', why: 'O celular é bem recente. Vamos ver o que existia antes dele, desde muito tempo atrás.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'abaco',
      part: 'O começo',
      title: 'Contar com as mãos e com o ábaco',
      goal: 'Entender que o computador nasceu da vontade de fazer contas mais depressa e sem erro.',
      explain:
        'O computador não foi inventado de uma vez. Ele é o resultado de **séculos** de tentativas de fazer contas **mais depressa** e **sem erro**.\n\nHá milhares de anos, vários povos já usavam o **ábaco**: um quadro com contas que deslizam em varetas. Cada conta representa um número, e mexer nelas ajuda a somar e subtrair.\n\nMas repare: no ábaco, **quem pensa é a pessoa**. O ábaco só ajuda a não esquecer os números no meio da conta.',
      example: 'Imagine somar os processos de cada mês do ano. Com papel, você anota e soma linha por linha. Com o ábaco, você empurra as contas. Nos dois casos, **é você** quem faz a conta.',
      check: {
        kind: 'choice',
        id: 'ab-c',
        prompt: 'No ábaco, quem faz a conta de verdade?',
        options: [
          { text: 'A pessoa que mexe nas contas', why: 'Isso. O ábaco só ajuda a guardar os números enquanto a pessoa pensa.' },
          { text: 'O próprio ábaco, sozinho', why: 'O ábaco não faz nada sozinho: alguém precisa mexer as contas e pensar.' },
          { text: 'Uma energia elétrica dentro dele', why: 'O ábaco não usa eletricidade: são contas de madeira ou pedra em varetas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **calculadora de papel**: você escreve os números para não esquecer, mas a conta está na sua cabeça. O ábaco é parecido: guarda os números à vista, e a pessoa faz o resto.',
        check: {
          kind: 'choice',
          id: 'ab-r',
          prompt: 'Por que as pessoas começaram a criar instrumentos como o ábaco?',
          options: [
            { text: 'Para fazer contas mais depressa e errar menos', why: 'Isso. Essa vontade guiou toda a história do computador.' },
            { text: 'Para enfeitar as casas', why: 'O ábaco era uma ferramenta de trabalho, para contar.' },
            { text: 'Para mandar mensagens', why: 'Mensagens vieram muito depois. O ábaco servia para contar.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pascal',
      part: 'O começo',
      title: '1642: a primeira máquina que somava sozinha',
      goal: 'Saber que as primeiras máquinas de calcular eram mecânicas e faziam uma só tarefa.',
      explain:
        'Em **1642**, o francês **Blaise Pascal** construiu uma máquina cheia de **engrenagens**, parecidas com as de um relógio.\n\nVocê girava as rodinhas com os números, e a máquina **somava sozinha**, passando o "vai um" de uma roda para a outra.\n\nFoi um avanço enorme: pela primeira vez, **a máquina** fazia a conta. Mas ela era **mecânica** (só peças que giram, sem eletricidade) e sabia fazer **uma coisa só**: somar.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'O que a máquina de Pascal tinha de novo em relação ao ábaco?',
        options: [
          { text: 'Ela fazia a soma sozinha, com engrenagens', why: 'Isso. A conta passou a ser feita pela máquina.' },
          { text: 'Ela tinha uma tela e um teclado', why: 'Ainda não: era só de engrenagens, sem tela nem eletricidade.' },
          { text: 'Ela fazia qualquer tarefa que você pedisse', why: 'Não: ela só sabia somar. Seguir instruções diferentes veio depois.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **hodômetro de um carro antigo**, aquele contador de quilômetros com rodinhas: quando uma roda passa do 9, a do lado avança um. A máquina de Pascal usava a mesma ideia para somar sozinha. Só que fazia isso e mais nada.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'A máquina de Pascal funcionava com:',
          options: [
            { text: 'Engrenagens, sem eletricidade', why: 'Isso: era mecânica.' },
            { text: 'Eletricidade e luzes', why: 'A eletricidade só entraria nessas máquinas muito depois.' },
            { text: 'Internet', why: 'A internet surgiu mais de 300 anos depois.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'jacquard',
      part: 'Instruções',
      title: '1804: um tear que seguia cartões',
      goal: 'Entender a ideia de dar instruções a uma máquina.',
      explain:
        'Em **1804**, o francês **Joseph-Marie Jacquard** criou um **tear** (máquina de tecer pano) que seguia **cartões perfurados**: cartões com furinhos.\n\nOnde havia furo, um fio subia; onde não havia, o fio ficava. Assim, os cartões **diziam ao tear o que fazer**.\n\nA grande novidade: **trocando os cartões, o mesmo tear tecia outro desenho**. Nascia a ideia de dar **instruções** a uma máquina, sem precisar construir outra máquina.',
      check: {
        kind: 'choice',
        id: 'ja-c',
        prompt: 'O que acontecia quando se trocavam os cartões do tear de Jacquard?',
        options: [
          { text: 'O mesmo tear tecia outro desenho', why: 'Isso. As instruções mudavam, e a máquina era a mesma.' },
          { text: 'Era preciso construir outro tear', why: 'Não: essa era justamente a vantagem. Bastava trocar os cartões.' },
          { text: 'O tear parava de funcionar', why: 'Não: os cartões eram a forma de dizer o que tecer.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **caixinha de música** com um cilindro cheio de pininhos: trocando o cilindro, a mesma caixinha toca outra música. No tear de Jacquard, os cartões faziam o papel do cilindro. A máquina é a mesma; o que muda são as **instruções**.',
        check: {
          kind: 'choice',
          id: 'ja-r',
          prompt: 'Qual ideia importante para o computador nasceu com o tear de Jacquard?',
          options: [
            { text: 'Dar instruções a uma máquina, que podem ser trocadas', why: 'Isso. É a semente da ideia de programa.' },
            { text: 'Fazer contas com engrenagens', why: 'Isso já existia com Pascal. A novidade de Jacquard eram as instruções.' },
            { text: 'Usar eletricidade', why: 'O tear de Jacquard não era elétrico.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'babbage',
      part: 'Instruções',
      title: 'Babbage e Ada: a máquina que nunca ficou pronta',
      goal: 'Conhecer a máquina analítica e o primeiro programa de Ada Lovelace.',
      explain:
        'Na **década de 1830**, o inglês **Charles Babbage** juntou as duas ideias: uma máquina de **fazer contas** que seguiria **cartões perfurados**, como o tear.\n\nEla teria uma parte para **fazer as contas** e outra para **guardar os números**. Chamou-a de **máquina analítica**. Nunca foi terminada, mas já tinha as partes de um computador.\n\nEm **1843**, **Ada Lovelace** publicou instruções para essa máquina calcular uma sequência de números. É considerado o **primeiro programa de computador**.',
      check: {
        kind: 'choice',
        id: 'ba-c',
        prompt: 'Por que Ada Lovelace é lembrada na história da computação?',
        options: [
          { text: 'Publicou o que é considerado o primeiro programa de computador', why: 'Isso, em 1843, para a máquina de Babbage.' },
          { text: 'Construiu o primeiro computador elétrico', why: 'Ela escreveu instruções; computadores elétricos vieram quase cem anos depois.' },
          { text: 'Inventou o ábaco', why: 'O ábaco existia havia milhares de anos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Babbage desenhou a **máquina**; Ada escreveu a **receita** que a máquina seguiria. Essa receita, um passo a passo para a máquina, é o que hoje chamamos de **programa**. A máquina nunca ficou pronta, mas a ideia de programa ficou.',
        check: {
          kind: 'sort',
          id: 'ba-r',
          prompt: 'Quem fez o quê?',
          categories: ['Charles Babbage', 'Ada Lovelace'],
          items: [
            { text: 'Projetou a máquina analítica', cat: 0, why: 'A máquina era dele.' },
            { text: 'Publicou instruções para a máquina, em 1843', cat: 1, why: 'O primeiro programa.' },
          ],
        },
      },
    },
    {
      id: 'hollerith',
      part: 'Eletricidade',
      title: '1890: contar um país inteiro',
      goal: 'Ver como cartões perfurados e eletricidade aceleraram o trabalho de contar.',
      explain:
        'Contar a população de um país à mão levava anos. Para o **censo dos Estados Unidos de 1890**, **Herman Hollerith** criou máquinas **elétricas** que liam **cartões perfurados**.\n\nCada pessoa virava um cartão. Os furos marcavam informações como idade e cidade. A máquina lia os furos e **contava sozinha**, muito mais rápido.\n\nA empresa de Hollerith cresceu e deu origem à **IBM**, que depois se tornaria uma das maiores empresas de computadores.',
      check: {
        kind: 'choice',
        id: 'ho-c',
        prompt: 'O que as máquinas de Hollerith fizeram no censo de 1890?',
        options: [
          { text: 'Leram cartões perfurados e contaram a população muito mais rápido', why: 'Isso.' },
          { text: 'Teceram tecidos com desenhos', why: 'Isso era o tear de Jacquard.' },
          { text: 'Mandaram e-mails para os moradores', why: 'E-mail só existiria muito depois.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine uma **pilha de fichas**, uma por morador, cada uma com furinhos nas respostas. Em vez de alguém ler ficha por ficha, uma máquina elétrica passava as fichas e somava os furos. Foi a primeira vez que se usou eletricidade para contar em tão grande escala.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'Que empresa nasceu do trabalho de Hollerith?',
          options: [
            { text: 'A IBM', why: 'Isso.' },
            { text: 'A Intel', why: 'A Intel aparece mais adiante nesta história, com o chip.' },
            { text: 'A Apple', why: 'A Apple aparece bem depois, com o computador pessoal.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'eniac',
      part: 'Eletricidade',
      title: '1946: o ENIAC, um computador do tamanho de uma sala',
      goal: 'Conhecer o ENIAC e por que ele era tão grande.',
      explain:
        'Em **1946** foi apresentado, nos Estados Unidos, o **ENIAC**, um dos primeiros computadores **eletrônicos**.\n\nEle usava cerca de **18 mil válvulas**: peças de vidro, do tamanho de uma lâmpada, que ligavam e desligavam a passagem de eletricidade.\n\nPor isso era **gigante**: pesava quase **30 toneladas** e ocupava **uma sala inteira**. Esquentava muito e as válvulas queimavam com frequência. Mesmo assim, fazia em segundos contas que levariam horas à mão.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'Por que o ENIAC era tão grande?',
        options: [
          { text: 'Usava milhares de válvulas, peças grandes como lâmpadas', why: 'Isso: cerca de 18 mil válvulas.' },
          { text: 'Tinha uma tela enorme', why: 'O tamanho vinha das válvulas, não de uma tela.' },
          { text: 'Precisava guardar muitos cartões de tecido', why: 'Isso lembra o tear. O tamanho do ENIAC vinha das válvulas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine montar uma máquina com **18 mil lâmpadas** acesas ao mesmo tempo: precisa de muito espaço, esquenta muito e, de vez em quando, uma queima. Era assim o ENIAC. O desafio dali em diante foi fazer a mesma coisa com peças **menores**.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'Qual era o principal problema das válvulas?',
          options: [
            { text: 'Eram grandes, esquentavam e queimavam com frequência', why: 'Isso. Era preciso algo menor e mais confiável.' },
            { text: 'Eram pequenas demais para enxergar', why: 'Pelo contrário: eram do tamanho de lâmpadas.' },
            { text: 'Não usavam eletricidade', why: 'Usavam: eram eletrônicas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'chip',
      part: 'Encolhendo',
      title: 'Do transistor ao celular no bolso',
      goal: 'Seguir o caminho do transistor ao smartphone.',
      explain:
        '- **1947, transistor**: nos Laboratórios Bell, surgiu um **interruptor elétrico minúsculo**, que substituiu as válvulas. Menor, mais barato e esquentava menos.\n- **1958, circuito integrado**: vários transistores numa **peça só**, o **chip**.\n- **1971, microprocessador**: a Intel lançou o **4004**, um processador inteiro num único chip.\n- **Anos 1970 e 1980**: o **Apple II** (1977) e o **IBM PC** (1981) levaram o computador para casas e escritórios.\n- **A partir de 2007**: o **smartphone** virou um computador de bolso.',
      check: {
        kind: 'order',
        id: 'ch-c',
        prompt: 'Coloque em ordem, do mais antigo ao mais recente.',
        items: ['ENIAC, com válvulas', 'Transistor', 'Microprocessador 4004', 'Computador pessoal', 'Smartphone'],
        why: '1946, 1947, 1971, 1977-1981 e a partir de 2007.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A história é de **encolhimento**: a válvula (do tamanho de uma lâmpada) virou o **transistor** (minúsculo); muitos transistores juntos viraram o **chip**; um chip com o processador inteiro permitiu o **computador de mesa**; e mais encolhimento colocou um computador no **bolso**.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'O que o transistor substituiu?',
          options: [
            { text: 'As válvulas', why: 'Isso: fazia o mesmo trabalho, muito menor.' },
            { text: 'Os cartões perfurados', why: 'Os cartões eram instruções; o transistor substituiu as válvulas.' },
            { text: 'A tela', why: 'O transistor é uma peça interna que substituiu as válvulas.' },
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
      prompt: 'Organize a linha do tempo.',
      items: ['Ábaco', 'Máquina de Pascal (1642)', 'Tear de Jacquard (1804)', 'ENIAC (1946)', 'Microprocessador (1971)'],
      why: 'Do mais antigo ao mais recente.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada invenção trouxe uma ideia nova. Classifique.',
      categories: ['A máquina faz a conta', 'A máquina segue instruções', 'A máquina encolhe'],
      items: [
        { text: 'Máquina de somar de Pascal', cat: 0, why: 'As engrenagens somavam sozinhas.' },
        { text: 'Tear de Jacquard com cartões', cat: 1, why: 'Os cartões diziam o que tecer.' },
        { text: 'Transistor no lugar da válvula', cat: 2, why: 'Peça muito menor.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Depois de toda essa história, o que um computador moderno ainda faz, como as máquinas antigas?',
      options: [
        { text: 'Recebe informação, trabalha com ela, guarda e mostra o resultado', why: 'Isso. A ideia básica não mudou; é o tema da próxima aula.' },
        { text: 'Só faz somas, como a máquina de Pascal', why: 'Faz muito mais: segue qualquer instrução que receber.' },
        { text: 'Precisa de uma sala inteira', why: 'Hoje cabe no bolso, graças ao chip.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'O computador nasceu da vontade de fazer contas mais depressa e sem erro.',
    'Ábaco: a pessoa faz a conta. Pascal (1642): engrenagens somam sozinhas.',
    'Jacquard (1804): cartões perfurados dão instruções à máquina.',
    'Babbage (década de 1830) projetou a máquina analítica; Ada Lovelace (1843) escreveu o primeiro programa.',
    'Hollerith (1890): máquinas elétricas no censo; a empresa virou a IBM.',
    'ENIAC (1946): 18 mil válvulas, quase 30 toneladas, uma sala inteira.',
    'Transistor (1947), chip (1958), microprocessador 4004 (1971), computador pessoal (1977-1981), smartphone (2007).',
  ],
};

export const primQuatroTarefas: MicroLesson = {
  ...S,
  id: 'prim.computador.2',
  series: { id: 'prim.computador', order: 2 },
  title: 'As quatro tarefas do computador',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Numa cozinha de restaurante, chegam ingredientes, a cozinheira prepara, a geladeira guarda e o prato sai para a mesa. Um computador funciona de jeito parecido?',
    options: [
      { text: 'Sim: ele recebe, trabalha, guarda e mostra', why: 'Isso. São as quatro tarefas que esta aula explica, uma por vez.' },
      { text: 'Não: o computador não tem nada a ver com isso', why: 'Tem tudo a ver. Vamos ver as quatro tarefas, uma por vez.' },
      { text: 'Só em parte: ele só mostra coisas na tela', why: 'Mostrar é uma das quatro tarefas. Há outras três, que vamos ver.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cozinha',
      part: 'A ideia',
      title: 'Receber, trabalhar, guardar e mostrar',
      goal: 'Reconhecer as quatro tarefas de todo computador.',
      explain:
        'Todo computador, do ENIAC ao celular, faz quatro coisas:\n\n1. **recebe** informação;\n2. **trabalha** com ela;\n3. **guarda** o que precisa;\n4. **mostra** o resultado.\n\nNa cozinha: os **ingredientes chegam** (receber), a **cozinheira prepara** (trabalhar), a **geladeira guarda** (guardar) e o **prato sai** para a mesa (mostrar).\n\nNas próximas etapas, cada tarefa ganha um nome técnico.',
      check: {
        kind: 'order',
        id: 'co-c',
        prompt: 'Ordene o que acontece na cozinha, do começo ao fim.',
        items: ['Os ingredientes chegam', 'A cozinheira prepara', 'O prato sai para a mesa'],
        why: 'Chegar, preparar, servir. No computador: receber, trabalhar, mostrar.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em você fazendo uma **conta de cabeça** que alguém dita: você **ouve** os números (recebe), **calcula** (trabalha), **lembra** o resultado por um instante (guarda) e **fala** a resposta (mostra). O computador faz as mesmas quatro coisas.',
        check: {
          kind: 'sort',
          id: 'co-r',
          prompt: 'Na conta de cabeça, qual tarefa é cada ação?',
          categories: ['Receber', 'Trabalhar', 'Mostrar'],
          items: [
            { text: 'Ouvir os números', cat: 0, why: 'A informação chega.' },
            { text: 'Calcular', cat: 1, why: 'O trabalho com a informação.' },
            { text: 'Falar a resposta', cat: 2, why: 'O resultado sai.' },
          ],
        },
      },
    },
    {
      id: 'entrada',
      part: 'As tarefas',
      title: 'Entrada: por onde a informação chega',
      goal: 'Identificar dispositivos de entrada.',
      explain:
        'A tarefa de **receber** chama-se **entrada**. É por onde a informação **chega** ao computador.\n\nOs aparelhos que fazem isso são os **dispositivos de entrada**:\n\n- **teclado**: você digita letras e números;\n- **mouse**: você aponta e clica;\n- **microfone**: leva a sua voz;\n- **câmera**: leva imagens;\n- **leitor de código de barras**: lê o código de um produto.\n\nDica: se a informação **vai de você para dentro** da máquina, é entrada.',
      check: {
        kind: 'multi',
        id: 'en-c',
        prompt: 'Quais são dispositivos de entrada? Marque todos.',
        options: [
          { text: 'Teclado', correct: true, why: 'Leva o que você digita para dentro.' },
          { text: 'Microfone', correct: true, why: 'Leva a sua voz para dentro.' },
          { text: 'Câmera', correct: true, why: 'Leva imagens para dentro.' },
          { text: 'Impressora', correct: false, why: 'A impressora tira a informação de dentro para o papel: é saída.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Imagine uma **porta de entrada** da casa: por ela, as coisas **entram**. Teclado, mouse, microfone e câmera são portas por onde a informação entra no computador.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'No caixa do supermercado, o leitor que lê o código do produto é:',
          options: [
            { text: 'Dispositivo de entrada', why: 'Isso: leva o código para dentro do computador.' },
            { text: 'Dispositivo de saída', why: 'Ele não mostra nada: ele lê e leva para dentro.' },
            { text: 'Não é dispositivo do computador', why: 'É sim: um dispositivo de entrada.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'saida',
      part: 'As tarefas',
      title: 'Saída: por onde o resultado sai',
      goal: 'Identificar dispositivos de saída e diferenciá-los dos de entrada.',
      explain:
        'A tarefa de **mostrar** chama-se **saída**. É por onde o resultado **sai** do computador para você.\n\nOs **dispositivos de saída** mais comuns:\n\n- **tela** (monitor): mostra imagens e textos;\n- **impressora**: passa para o papel;\n- **caixa de som**: toca sons.\n\nDica: se a informação **vem de dentro da máquina para você**, é saída. É o caminho contrário da entrada.',
      check: {
        kind: 'choice',
        id: 'sa-c',
        prompt: 'Um servidor digita um relatório e depois o imprime. O teclado e a impressora são, respectivamente:',
        options: [
          { text: 'Entrada e saída', why: 'Isso: o teclado leva para dentro, a impressora traz para fora.' },
          { text: 'Saída e entrada', why: 'Invertido: o teclado é entrada e a impressora é saída.' },
          { text: 'Os dois são entrada', why: 'A impressora tira a informação do computador: é saída.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Use a **direção da seta**. Do mundo **para dentro** da máquina: entrada (teclado, mouse, microfone). De dentro da máquina **para o mundo**: saída (tela, impressora, caixa de som).',
        check: {
          kind: 'sort',
          id: 'sa-r',
          prompt: 'Classifique.',
          categories: ['Entrada', 'Saída'],
          items: [
            { text: 'Mouse', cat: 0, why: 'Você aponta: leva para dentro.' },
            { text: 'Tela', cat: 1, why: 'Mostra para você.' },
            { text: 'Caixa de som', cat: 1, why: 'Toca para você.' },
            { text: 'Microfone', cat: 0, why: 'Leva a voz para dentro.' },
          ],
        },
      },
    },
    {
      id: 'processamento',
      part: 'As tarefas',
      title: 'Processamento: a CPU trabalha',
      goal: 'Saber que o processador (CPU) é quem faz as contas e toma as decisões.',
      explain:
        'A tarefa de **trabalhar** com a informação chama-se **processamento**.\n\nQuem faz isso é o **processador**, também chamado de **CPU** (sigla em inglês para *unidade central de processamento*). Ele faz as **contas** e toma as **decisões**.\n\nÉ o "**cérebro**" da máquina: a cozinheira da nossa cozinha.\n\nLembra do **microprocessador 4004**, de 1971, na história? Era isso: um processador inteiro num único chip. Os de hoje fazem bilhões de contas por segundo.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Qual peça faz as contas e toma as decisões no computador?',
        options: [
          { text: 'O processador (CPU)', why: 'Isso: o "cérebro" da máquina.' },
          { text: 'A tela', why: 'A tela só mostra o resultado: é saída.' },
          { text: 'O teclado', why: 'O teclado só leva informação para dentro: é entrada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à cozinha: os ingredientes chegam (entrada) e o prato sai (saída), mas quem **transforma** uma coisa na outra é a **cozinheira**. No computador, a cozinheira é a **CPU**.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'CPU é outro nome para:',
          options: [
            { text: 'O processador', why: 'Isso: unidade central de processamento.' },
            { text: 'A impressora', why: 'A impressora é saída.' },
            { text: 'O mouse', why: 'O mouse é entrada.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'memoria',
      part: 'As tarefas',
      title: 'Memória: guardar por pouco e por muito tempo',
      goal: 'Diferenciar a memória de trabalho do armazenamento.',
      explain:
        'A tarefa de **guardar** é a **memória**. Existem dois tipos:\n\n- **memória de trabalho**: **rápida** e **temporária**. Guarda o que está sendo usado **agora**. É como a **bancada** da cozinha: os ingredientes do prato do momento ficam ali.\n- **armazenamento**: guarda por **muito tempo**, mesmo com o computador desligado. É como a **geladeira** e a **despensa**.\n\nNo próximo trecho, Hardware e software, você vai ver os nomes dessas peças. Por enquanto, guarde: uma é rápida e passageira; a outra guarda por anos.',
      check: {
        kind: 'sort',
        id: 'me-c',
        prompt: 'Qual tipo de memória?',
        categories: ['Memória de trabalho', 'Armazenamento'],
        items: [
          { text: 'Guarda o que está sendo usado agora', cat: 0, why: 'Rápida e temporária.' },
          { text: 'Guarda o relatório do ano passado', cat: 1, why: 'Guarda por muito tempo.' },
          { text: 'É como a bancada da cozinha', cat: 0, why: 'O que está em uso.' },
          { text: 'É como a despensa', cat: 1, why: 'Guarda por muito tempo.' },
        ],
      },
      recovery: {
        explain: 'Pense na sua **mesa de trabalho** e no seu **arquivo de gavetas**. Na mesa ficam os papéis do processo que você está lendo agora: fácil de pegar, mas no fim do dia a mesa é esvaziada. No arquivo ficam os processos antigos, guardados por anos.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'A CPU é o lugar onde os arquivos ficam guardados por anos?',
          options: [
            { text: 'Não: a CPU trabalha; quem guarda por anos é o armazenamento', why: 'Isso.' },
            { text: 'Sim: a CPU guarda tudo', why: 'A CPU processa. Guardar por anos é papel do armazenamento.' },
            { text: 'Sim, mas só os arquivos pequenos', why: 'Nenhum arquivo fica guardado na CPU por anos.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'juntando',
      part: 'Juntando',
      title: 'As quatro tarefas numa conta só',
      goal: 'Acompanhar as quatro tarefas num exemplo completo.',
      explain:
        'Veja tudo junto numa conta simples: você quer saber quanto é **2 + 3** na calculadora do computador.\n\n1. Você digita **2 + 3** no **teclado**: **entrada**.\n2. A **CPU** faz a soma: **processamento**.\n3. O resultado fica na **memória** por um instante: **memória**.\n4. A **tela** mostra **5**: **saída**.\n\nToda tarefa no computador, por maior que seja, segue esse mesmo caminho.',
      check: {
        kind: 'order',
        id: 'ju-c',
        prompt: 'Ordene o caminho da conta 2 + 3.',
        items: ['Digitar no teclado (entrada)', 'A CPU soma (processamento)', 'O resultado fica na memória', 'A tela mostra 5 (saída)'],
        why: 'Entrada, processamento, memória e saída.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Agora com uma foto: você **tira a foto** com a câmera (entrada), o celular **ajusta as cores** (processamento), **grava** a foto (memória) e a **mostra** na tela (saída). Mesmo caminho, outra tarefa.',
        check: {
          kind: 'sort',
          id: 'ju-r',
          prompt: 'Na foto do celular, qual tarefa é cada passo?',
          categories: ['Entrada', 'Processamento', 'Saída'],
          items: [
            { text: 'A câmera capta a imagem', cat: 0, why: 'A informação chega.' },
            { text: 'O celular ajusta as cores', cat: 1, why: 'O trabalho com a informação.' },
            { text: 'A foto aparece na tela', cat: 2, why: 'O resultado sai.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Classifique cada item na sua tarefa.',
      categories: ['Entrada', 'Processamento', 'Saída'],
      items: [
        { text: 'Teclado', cat: 0, why: 'Leva para dentro.' },
        { text: 'CPU', cat: 1, why: 'Faz as contas.' },
        { text: 'Impressora', cat: 2, why: 'Tira para o papel.' },
        { text: 'Câmera', cat: 0, why: 'Leva imagens para dentro.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Mouse: entrada', 'Tela: saída', 'Teclado: saída'],
      bug: 2,
      why: 'O teclado leva informação para dentro: é entrada.',
      fixed: 'Teclado: entrada',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: você fala "ligar a luz" para um assistente de voz, e ele responde "luz ligada" pela caixa de som. O microfone e a caixa de som são:',
      options: [
        { text: 'Entrada e saída', why: 'Isso: a voz entra pelo microfone e a resposta sai pela caixa de som.' },
        { text: 'Saída e entrada', why: 'Invertido.' },
        { text: 'Os dois são processamento', why: 'Quem processa é a CPU, lá dentro.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.001' }],
  summary: [
    'Todo computador recebe, trabalha, guarda e mostra.',
    'Entrada: teclado, mouse, microfone, câmera, leitor de código de barras.',
    'Saída: tela, impressora, caixa de som.',
    'Processamento: a CPU (processador), o "cérebro", faz as contas e decide.',
    'Memória de trabalho (rápida, temporária) e armazenamento (guarda por muito tempo).',
  ],
  vocab: [
    { term: 'CPU', match: '\\bCPU\\b', step: 'processamento' },
  ],
};
