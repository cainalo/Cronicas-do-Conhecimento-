// Série "O que é um computador" (cap.prim.01, trecho computador), aulas 3 e 4: bits, bytes e
// tamanhos. Ritmo lento pedido em 25/10/2026. Fatos conferidos com o texto do capítulo
// (01-o-que-e.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.01', sectionId: 'computador' } as const;

export const primBits: MicroLesson = {
  ...S,
  id: 'prim.computador.3',
  series: { id: 'prim.computador', order: 3 },
  title: 'Ligado ou desligado: o bit',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um interruptor de luz só tem duas posições. Dá para mandar uma mensagem usando só uma lâmpada que acende e apaga?',
    options: [
      { text: 'Sim, combinando o que significa acesa e apagada', why: 'Isso. Com duas posições e um combinado, já dá para dizer algo. É assim que o computador guarda tudo.' },
      { text: 'Não: com duas posições não se diz nada', why: 'Dá, sim: basta combinar o significado de cada posição. Esta aula mostra como.' },
      { text: 'Só se a lâmpada mudar de cor', why: 'Nem precisa mudar de cor: acesa e apagada já bastam, com um combinado.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'dois-estados',
      part: 'O bit',
      title: 'Por dentro, só dois estados',
      goal: 'Entender que o computador, por dentro, só distingue ligado e desligado.',
      explain:
        'Lembra das **válvulas** do ENIAC e do **transistor** que as substituiu? Os dois são, no fundo, **interruptores**: deixam passar eletricidade ou não deixam.\n\nPor isso, por dentro, o computador só entende **dois estados**: **ligado** ou **desligado**, como a luz de um quarto.\n\nPara escrever esses estados, usamos dois algarismos: **1** para ligado e **0** para desligado.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'Por dentro, quantos estados o computador distingue?',
        options: [
          { text: 'Dois: ligado e desligado', why: 'Isso. Escritos como 1 e 0.' },
          { text: 'Dez, como os algarismos de 0 a 9', why: 'Nós contamos com dez algarismos; o computador, por dentro, só com dois.' },
          { text: 'Um só: ligado', why: 'O desligado também conta: ele é o 0.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **milhões de interruptores de luz** minúsculos. Cada um está aceso ou apagado, nada no meio. Chamamos aceso de **1** e apagado de **0**. Tudo o que o computador guarda é feito de muitos desses.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Como escrevemos o estado "desligado"?',
          options: [
            { text: '0', why: 'Isso. E ligado é 1.' },
            { text: '1', why: 'O 1 é ligado; desligado é 0.' },
            { text: '2', why: 'Só existem dois algarismos: 0 e 1.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'bit',
      part: 'O bit',
      title: 'O bit: a menor informação',
      goal: 'Saber o que é um bit.',
      explain:
        'Cada um desses sinais, **0** ou **1**, chama-se **bit**.\n\nO **bit** é a **menor unidade de informação** do computador. Não existe "meio bit".\n\nUm bit sozinho responde a uma pergunta de **sim ou não**: a luz está acesa? O processo foi lido? Sim (1) ou não (0).',
      example: 'Um bit pode guardar se um processo foi **lido** (1) ou **não lido** (0). Só isso.',
      check: {
        kind: 'choice',
        id: 'bi-c',
        prompt: 'O que é um bit?',
        options: [
          { text: 'A menor unidade de informação: vale 0 ou 1', why: 'Isso.' },
          { text: 'Um programa de computador', why: 'Programa é um conjunto de instruções; o bit é um único 0 ou 1.' },
          { text: 'Uma peça do teclado', why: 'O bit não é peça: é a menor unidade de informação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **sinal de sim ou não com a cabeça**: um aceno diz "sim" ou "não", nada mais. O bit é esse aceno: a menor resposta possível, 1 ou 0.',
        check: {
          kind: 'choice',
          id: 'bi-r',
          prompt: 'Quantos valores diferentes um único bit pode ter?',
          options: [
            { text: 'Dois: 0 ou 1', why: 'Isso.' },
            { text: 'Oito', why: 'Oito aparece quando juntamos bits, como veremos. Um bit sozinho tem dois valores.' },
            { text: 'Infinitos', why: 'Um bit só pode ser 0 ou 1.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'juntar',
      part: 'Juntando bits',
      title: 'Juntando bits, as combinações dobram',
      goal: 'Perceber que cada bit a mais dobra as combinações possíveis.',
      explain:
        'Um bit sozinho diz pouco. Por isso os bits andam **em grupos**.\n\n- Com **1 bit**: 0 ou 1. São **2** combinações.\n- Com **2 bits**: 00, 01, 10, 11. São **4**.\n- Com **3 bits**: 8 combinações.\n\nCada bit a mais **dobra** as combinações. Assim, com bits suficientes, dá para representar números, letras, cores e sons.',
      check: {
        kind: 'choice',
        id: 'ju-c',
        prompt: 'Com 2 bits, quantas combinações diferentes existem?',
        options: [
          { text: '4', why: 'Isso: 00, 01, 10 e 11.' },
          { text: '2', why: 'Duas é com 1 bit. Com 2 bits, são 4.' },
          { text: '3', why: 'Escreva todas: 00, 01, 10, 11. São 4.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **duas lâmpadas**: as duas apagadas; só a primeira acesa; só a segunda acesa; as duas acesas. São **4** jeitos. Com três lâmpadas, cada um desses 4 pode ter a terceira acesa ou apagada: **8** jeitos. Sempre dobra.',
        check: {
          kind: 'choice',
          id: 'ju-r',
          prompt: 'Com 3 bits, quantas combinações?',
          options: [
            { text: '8', why: 'Isso: 2 × 2 × 2.' },
            { text: '6', why: 'Não é 3 × 2: cada bit dobra. 2 × 2 × 2 = 8.' },
            { text: '3', why: 'São 3 bits, mas 8 combinações.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'byte',
      part: 'Juntando bits',
      title: 'Oito bits formam um byte',
      goal: 'Saber que um byte tem 8 bits e guarda uma letra simples.',
      explain:
        'O grupo mais usado tem **8 bits**. Esse grupo de 8 bits chama-se **byte**.\n\nCom 8 bits, as combinações dobram oito vezes: são **256** combinações. É o bastante para dar um número a cada letra, algarismo e sinal comum.\n\nPor isso **um byte basta para guardar uma letra simples**, como "A".',
      example: 'A palavra **"OI"** tem duas letras simples: ocupa **2 bytes**, ou seja, **16 bits**.',
      check: {
        kind: 'choice',
        id: 'by-c',
        prompt: 'Um byte é formado por:',
        options: [
          { text: '8 bits', why: 'Isso.' },
          { text: '10 bits', why: 'São 8, não 10.' },
          { text: '2 bits', why: 'Dois bits dão só 4 combinações. O byte tem 8 bits.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **fileira de 8 lâmpadas**. Cada jeito de acender e apagar as 8 é um código diferente, e há 256 jeitos. Combinamos que um desses jeitos significa "A", outro "B", e assim por diante. Cada fileira de 8 é um **byte**.',
        check: {
          kind: 'choice',
          id: 'by-r',
          prompt: 'A palavra "SIM" (três letras simples) ocupa quantos bytes?',
          options: [
            { text: '3 bytes', why: 'Isso: um byte por letra simples.' },
            { text: '8 bytes', why: 'Oito é o número de bits de cada byte. São 3 letras, 3 bytes.' },
            { text: '1 byte', why: 'Um byte guarda uma letra; são três letras.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene do MENOR para o MAIOR.',
      items: ['1 bit', '2 bits', '1 byte (8 bits)'],
      why: 'O bit é a menor unidade; 8 bits formam um byte.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Bit: a menor unidade, vale 0 ou 1', 'Byte: grupo de 8 bits', 'Com 2 bits há 2 combinações'],
      bug: 2,
      why: 'Com 2 bits há 4 combinações: 00, 01, 10, 11.',
      fixed: 'Com 2 bits há 4 combinações',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um painel tem 4 lâmpadas, cada uma acesa ou apagada. Quantas mensagens diferentes ele mostra?',
      options: [
        { text: '16', why: 'Isso: 2 × 2 × 2 × 2.' },
        { text: '8', why: 'Oito é com 3 lâmpadas. Com 4, dobra de novo: 16.' },
        { text: '4', why: 'São 4 lâmpadas, mas cada uma dobra as combinações: 16.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Por dentro, o computador só distingue ligado (1) e desligado (0): são interruptores.',
    'Cada 0 ou 1 é um bit, a menor unidade de informação.',
    'Cada bit a mais dobra as combinações: 1 bit dá 2, 2 bits dão 4, 3 bits dão 8.',
    'Byte = 8 bits = 256 combinações; basta para uma letra simples.',
  ],
  vocab: [
    { term: 'bit', match: '\\bbits?\\b', step: 'bit' },
    { term: 'byte', match: '\\bbytes?\\b', step: 'byte' },
  ],
};

export const primTamanhos: MicroLesson = {
  ...S,
  id: 'prim.computador.4',
  series: { id: 'prim.computador', order: 4 },
  title: 'Do byte ao terabyte',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Seu celular avisa: "armazenamento quase cheio, 2 GB livres". O que é esse "GB"?',
    options: [
      { text: 'Uma medida de quanta informação cabe ali', why: 'Isso. É um dos degraus de tamanho que esta aula explica, a partir do byte.' },
      { text: 'A marca do celular', why: 'Não é marca: é uma medida de tamanho de informação.' },
      { text: 'A velocidade da internet', why: 'Aqui o GB mede espaço guardado. Vamos ver os degraus de tamanho.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'degraus',
      part: 'Tamanhos',
      title: 'Os degraus: KB, MB, GB e TB',
      goal: 'Conhecer os degraus de tamanho a partir do byte.',
      explain:
        'Uma letra cabe num **byte**. Mas um relatório tem milhares de letras, e uma foto tem muito mais. Por isso os tamanhos crescem em **degraus**:\n\n| Degrau | Cerca de | Exemplo |\n|---|---|---|\n| **quilobyte (KB)** | mil bytes | um texto curto |\n| **megabyte (MB)** | um milhão de bytes | uma foto de celular |\n| **gigabyte (GB)** | um bilhão de bytes | um filme |\n| **terabyte (TB)** | um trilhão de bytes | um disco grande |',
      check: {
        kind: 'order',
        id: 'dg-c',
        prompt: 'Ordene do MENOR para o MAIOR.',
        items: ['Quilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
        why: 'Mil, um milhão, um bilhão e um trilhão de bytes, aproximadamente.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Use a ordem que você já conhece do dinheiro: **mil**, **milhão**, **bilhão**, **trilhão**. Os degraus seguem a mesma ordem: **quilo** (mil), **mega** (milhão), **giga** (bilhão), **tera** (trilhão).',
        check: {
          kind: 'sort',
          id: 'dg-r',
          prompt: 'Qual degrau combina com cada exemplo?',
          categories: ['KB', 'MB', 'GB'],
          items: [
            { text: 'Um texto curto', cat: 0, why: 'Cerca de mil bytes.' },
            { text: 'Uma foto de celular', cat: 1, why: 'Cerca de um milhão de bytes.' },
            { text: 'Um filme', cat: 2, why: 'Cerca de um bilhão de bytes.' },
          ],
        },
      },
    },
    {
      id: 'mil-vinte-quatro',
      part: 'Tamanhos',
      title: 'Por que 1.024 e não 1.000',
      goal: 'Saber que, em computação, cada degrau costuma valer 1.024 vezes o anterior.',
      explain:
        'Dissemos "**cerca de** mil". Em computação, cada degrau costuma valer **1.024** vezes o anterior, e não 1.000 exatas.\n\nO motivo vem dos bits: as combinações **dobram** (2, 4, 8, 16...). Dobrando dez vezes, chega-se a **1.024**, o número dessa sequência mais próximo de mil.\n\nAssim, 1 KB costuma ser **1.024 bytes**, e 1 MB, **1.024 KB**.',
      check: {
        kind: 'choice',
        id: 'mv-c',
        prompt: 'Em computação, 1 KB costuma valer:',
        options: [
          { text: '1.024 bytes', why: 'Isso.' },
          { text: 'Exatamente 1.000 bytes', why: 'Cerca de mil, mas em computação costuma ser 1.024.' },
          { text: '8 bytes', why: 'Oito é o número de bits num byte.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Dobre a partir de 1: 2, 4, 8, 16, 32, 64, 128, 256, 512, **1.024**. São dez dobras. Como o computador vive de dobras, ele usa 1.024 no lugar do mil redondo.',
        check: {
          kind: 'choice',
          id: 'mv-r',
          prompt: 'Quantos KB costuma ter 1 MB?',
          options: [
            { text: '1.024 KB', why: 'Isso: cada degrau vale 1.024 vezes o anterior.' },
            { text: '8 KB', why: 'Oito é a relação entre bit e byte, não entre os degraus.' },
            { text: '100 KB', why: 'Cada degrau multiplica por cerca de mil (1.024).' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'tribunal',
      part: 'No trabalho',
      title: 'Por que isso importa no Tribunal',
      goal: 'Relacionar tamanhos de arquivo com espaço em disco e tempo de envio.',
      explain:
        'Um auditor recebe **planilhas**, **contratos** e **relatórios** em arquivos digitais. Tudo isso vira bits.\n\nSaber os degraus ajuda a entender:\n\n- **tamanho de arquivo**: um contrato em texto tem poucos KB; escaneado como imagem, pode ter vários MB;\n- **espaço em disco**: quantos arquivos ainda cabem;\n- **velocidade de transferência**: arquivos maiores demoram mais para enviar.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'O mesmo contrato, salvo como texto e como imagem escaneada. Qual tende a ser maior?',
        options: [
          { text: 'A imagem escaneada', why: 'Isso: imagem guarda muito mais informação que o texto.' },
          { text: 'O texto', why: 'O texto costuma ter poucos KB; a imagem, vários MB.' },
          { text: 'Os dois têm sempre o mesmo tamanho', why: 'O formato muda bastante o tamanho.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **texto**, cada letra ocupa cerca de um byte. Na **imagem**, cada pontinho da página guarda sua cor, letras e espaços em branco também. Por isso o mesmo contrato fica muito maior como imagem, e demora mais para enviar.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'Um arquivo de 2 GB e outro de 2 MB, na mesma conexão. Qual demora mais para enviar?',
          options: [
            { text: 'O de 2 GB', why: 'Isso: é cerca de mil vezes maior.' },
            { text: 'O de 2 MB', why: 'MB é menor que GB.' },
            { text: 'Os dois demoram o mesmo', why: 'Arquivos maiores demoram mais na mesma conexão.' },
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
      lines: ['1 byte = 8 bits', 'Uma foto de celular: cerca de um megabyte', 'O terabyte é menor que o gigabyte'],
      bug: 2,
      why: 'O terabyte é o degrau acima do gigabyte: cerca de um trilhão de bytes.',
      fixed: 'O terabyte é maior que o gigabyte',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Classifique cada tamanho.',
      categories: ['Cabe uma letra', 'Cabe uma foto', 'Cabe um filme'],
      items: [
        { text: '1 byte', cat: 0, why: 'Uma letra simples.' },
        { text: 'Alguns MB', cat: 1, why: 'Uma foto de celular.' },
        { text: 'Alguns GB', cat: 2, why: 'Um filme.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um pendrive de 1 TB e outro de 64 GB. Qual guarda mais?',
      options: [
        { text: 'O de 1 TB', why: 'Isso: 1 TB vale cerca de mil GB.' },
        { text: 'O de 64 GB', why: '64 é maior que 1, mas TB é um degrau acima de GB.' },
        { text: 'Os dois guardam o mesmo', why: 'TB é o degrau acima de GB.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.002' }],
  summary: [
    'Degraus: KB (mil bytes), MB (milhão), GB (bilhão), TB (trilhão), aproximadamente.',
    'Em computação, cada degrau costuma valer 1.024 vezes o anterior, por causa das dobras.',
    'Tamanho de arquivo afeta espaço em disco e tempo de envio.',
  ],
};
