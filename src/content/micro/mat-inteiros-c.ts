// Série "Números inteiros e racionais" (cap.mat.01, trecho inteiros), aulas 7 a 9: somar e subtrair
// frações; multiplicar, dividir e fração de uma quantidade; racionais, dízimas, expoente negativo e
// fração do restante. Revisão didática de 26/10/2026. Fatos conferidos com o capítulo
// (01-inteiros-fracoes.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'inteiros' } as const;

export const matSomarFracoes: MicroLesson = {
  ...S,
  id: 'mat.inteiros.7',
  series: { id: 'mat.inteiros', order: 7 },
  title: 'Somar e subtrair frações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você comeu 1/2 pizza e um colega comeu 1/3 de outra pizza igual. Juntos comeram 2/5 de pizza?',
    options: [
      { text: 'Parece estranho: 2/5 é menos que a metade que eu sozinho comi', why: 'Ótima desconfiança. Esta aula mostra por que não se somam os denominadores.' },
      { text: 'Sim, 1 + 1 = 2 e 2 + 3 = 5', why: 'É o erro mais comum. Esta aula mostra o que dá errado nessa conta.' },
      { text: 'Não dá para somar frações', why: 'Dá, sim, com um cuidado. Esta aula mostra qual.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'mesmo-denominador',
      part: 'Mesmo tamanho',
      title: 'Mesmo denominador: some os pedaços',
      goal: 'Somar e subtrair frações de mesmo denominador.',
      explain:
        'Quando os denominadores são iguais, os pedaços têm **o mesmo tamanho**. Somar é só contar pedaços: **2/7 + 3/7 = 5/7** (dois sétimos mais três sétimos são cinco sétimos).\n\nO **denominador não muda**, porque o tamanho do pedaço não muda. O erro comum é somar também os denominadores (5/14): isso diria que os pedaços ficaram menores só porque você juntou.\n\nSubtrair é igual: **6/9 − 4/9 = 2/9**.',
      example: '3/10 + 4/10 = **7/10**. 5/8 − 1/8 = **4/8** = **1/2** (simplificando por 4).',
      check: {
        kind: 'choice',
        id: 'md-c',
        prompt: 'Quanto é 4/11 + 5/11?',
        options: [
          { text: '9/11', why: 'Isso. Mesmo tamanho de pedaço: só se somam os numeradores.' },
          { text: '9/22', why: 'Somar os denominadores mudaria o tamanho do pedaço. O denominador fica 11.' },
          { text: '20/11', why: 'Isso seria multiplicar os numeradores. Na soma, eles se somam.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Troque "sétimos" por uma palavra qualquer: 2 maçãs + 3 maçãs = 5 maçãs, e não 5 "maçãs duplas". Da mesma forma, 2 sétimos + 3 sétimos = 5 sétimos.',
        check: {
          kind: 'choice',
          id: 'md-r',
          prompt: 'Quanto é 7/9 − 2/9?',
          options: [
            { text: '5/9', why: 'Isso. Sete nonos menos dois nonos.' },
            { text: '5/0', why: 'O denominador não se subtrai; ele continua 9.' },
            { text: '9/9', why: 'Isso seria somar. Aqui é subtração.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'diferentes',
      part: 'Tamanhos diferentes',
      title: 'Denominadores diferentes: igualar o tamanho dos pedaços',
      goal: 'Somar frações de denominadores diferentes usando frações equivalentes.',
      explain:
        'Em **1/2 + 1/3**, os pedaços têm tamanhos diferentes (meio e terço). Não dá para contá-los juntos, como não se somam metros com centímetros sem converter.\n\nA saída é usar **frações equivalentes** com um **denominador comum**: um mesmo tamanho de pedaço que sirva para as duas.\n\nMeios e terços cabem em sextos: 1/2 = 3/6 e 1/3 = 2/6. Agora os pedaços são iguais: **3/6 + 2/6 = 5/6**.',
      example: '1/4 + 1/2: a metade vira quartos, 1/2 = 2/4. Então 1/4 + 2/4 = **3/4**.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Quanto é 1/3 + 1/6?',
        options: [
          { text: '3/6, ou seja, 1/2', why: 'Isso. 1/3 = 2/6; 2/6 + 1/6 = 3/6 = 1/2.' },
          { text: '2/9', why: 'Somou numeradores e denominadores. Primeiro iguale os pedaços: 1/3 = 2/6.' },
          { text: '2/6', why: 'O 1/3 virou 2/6, mas ainda falta somar o 1/6.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em dinheiro: meio real são 50 centavos e um quarto de real são 25 centavos. Em centavos dá para somar: 75 centavos, que são 3/4 de real. O denominador comum é o "centavo" das frações.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: 'Para somar 1/2 + 1/5, qual denominador comum serve?',
          options: [
            { text: '10', why: 'Isso. 1/2 = 5/10 e 1/5 = 2/10.' },
            { text: '7', why: 'Nem meios nem quintos se escrevem exatamente em sétimos.' },
            { text: '3', why: 'Nem 2 nem 5 dividem o 3.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'mmc',
      part: 'Tamanhos diferentes',
      title: 'Como achar o denominador comum',
      goal: 'Encontrar um denominador comum listando múltiplos.',
      explain:
        'O denominador comum precisa ser um número que **os dois denominadores dividem**. Esses números são os **múltiplos**: os resultados da tabuada de cada um.\n\nPara 4 e 6: múltiplos de 4 são 4, 8, **12**, 16...; de 6 são 6, **12**, 18... O primeiro que aparece nas duas listas é **12**.\n\nO menor múltiplo comum tem nome: **MMC**. Usar o MMC deixa as contas menores. No próximo trecho você vai aprender um jeito rápido de calculá-lo; por enquanto, listar os múltiplos basta.',
      example: '1/4 + 2/3 − 5/6, com denominador 12: 3/12 + 8/12 − 10/12 = **1/12**.',
      check: {
        kind: 'choice',
        id: 'mc-c',
        prompt: 'Qual é o menor denominador comum para 1/6 e 3/8?',
        options: [
          { text: '24', why: 'Isso. Múltiplos de 6: 6, 12, 18, 24; de 8: 8, 16, 24.' },
          { text: '48', why: '48 também serve (é 6 × 8), mas 24 aparece antes nas duas listas.' },
          { text: '14', why: '14 é 6 + 8; nem 6 nem 8 dividem o 14.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva a tabuada dos dois lado a lado e pare no primeiro número repetido. Para 3 e 4: 3, 6, 9, 12 e 4, 8, 12. O 12 aparece nas duas: é o MMC. Se não quiser procurar, o produto dos denominadores (3 × 4) sempre serve.',
        check: {
          kind: 'choice',
          id: 'mc-r',
          prompt: 'Quanto é 1/3 + 1/4?',
          options: [
            { text: '7/12', why: 'Isso. 4/12 + 3/12 = 7/12.' },
            { text: '2/7', why: 'Somou numeradores e denominadores. Use o denominador 12.' },
            { text: '2/12', why: 'Ao trocar o denominador para 12, os numeradores também mudam: 1/3 = 4/12 e 1/4 = 3/12.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'todo',
      part: 'O inteiro',
      title: 'O inteiro como fração: quanto sobra',
      goal: 'Calcular a parte que sobra de um todo, escrevendo o inteiro como fração.',
      explain:
        'Muitos problemas perguntam **quanto sobra** depois de usar uma parte. O todo é **1**, e 1 pode ser escrito com qualquer denominador: 1 = 8/8 = 5/5.\n\nSe 3/8 de uma verba foram gastos, sobra 1 − 3/8 = 8/8 − 3/8 = **5/8**.\n\nEssa conta vai ser a base de vários problemas de prova, na última aula desta série.',
      example: 'Gastou 2/5. Sobra 5/5 − 2/5 = **3/5**.',
      check: {
        kind: 'choice',
        id: 'td-c',
        prompt: 'Um servidor leu 4/9 de um relatório. Que fração falta ler?',
        options: [
          { text: '5/9', why: 'Isso. 9/9 − 4/9 = 5/9.' },
          { text: '4/9', why: 'Essa é a parte já lida.' },
          { text: '1/9', why: 'O todo é 9/9; 9 − 4 = 5 nonos faltam.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Desenhe o todo dividido em partes iguais e risque as usadas. Em 7 partes, com 2 usadas, sobram 5: 5/7. O denominador é o total de partes do todo.',
        check: {
          kind: 'choice',
          id: 'td-r',
          prompt: 'Quanto é 1 − 2/7?',
          options: [
            { text: '5/7', why: 'Isso. 7/7 − 2/7.' },
            { text: '−1/7', why: 'O 1 vale 7/7, não 1/7.' },
            { text: '1/7', why: 'O 1 vira 7/7, e 7 − 2 = 5.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cs-1',
      prompt: 'Onde está o erro?',
      lines: ['2/3 + 1/4', '= 3/7', '(resposta final)'],
      bug: 1,
      why: 'Somou numeradores e denominadores. Com denominador 12: 8/12 + 3/12 = 11/12.',
      fixed: '= 8/12 + 3/12 = 11/12',
    },
    {
      kind: 'choice',
      id: 'cs-2',
      prompt: 'Quanto é 5/6 − 1/4?',
      options: [
        { text: '7/12', why: 'Isso. 10/12 − 3/12 = 7/12.' },
        { text: '4/2', why: 'Subtraiu numeradores e denominadores. Use o denominador comum 12.' },
        { text: '1/3', why: 'Confira a conversão: 5/6 = 10/12 e 1/4 = 3/12.' },
      ],
      answer: 0,
    },
    {
      kind: 'order',
      id: 'cs-3',
      prompt: 'Ponha os passos de 1/2 + 2/5 na ordem.',
      items: ['Achar um denominador comum: 10', 'Converter: 5/10 e 4/10', 'Somar os numeradores: 9', 'Resultado: 9/10'],
      why: 'Primeiro igualar o tamanho dos pedaços, depois contar.',
    },
  ],
  exam: [],
  summary: [
    'Mesmo denominador: somam-se ou subtraem-se os numeradores; o denominador fica.',
    'Denominadores diferentes: primeiro frações equivalentes com um denominador comum.',
    'Denominador comum: um múltiplo dos dois; o menor é o MMC.',
    'O inteiro é qualquer fração com numerador igual ao denominador: 1 = 8/8.',
  ],
  vocab: [
    { term: 'denominador comum', match: 'denominador comum', step: 'diferentes' },
    { term: 'múltiplo', match: 'múltiplo', step: 'mmc' },
    { term: 'MMC', match: '\\bMMC\\b', step: 'mmc' },
  ],
};

export const matMultiplicarFracoes: MicroLesson = {
  ...S,
  id: 'mat.inteiros.8',
  series: { id: 'mat.inteiros', order: 8 },
  title: 'Multiplicar, dividir e calcular fração de uma quantidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma verba de R$ 1.200 mil terá 3/8 gastos com custeio. Como descobrir quanto é isso?',
    options: [
      { text: 'Dividir a verba em 8 partes e pegar 3', why: 'Exatamente. É o primeiro passo desta aula.' },
      { text: 'Fazer 1.200 − 3/8', why: 'Subtrair tiraria só uma pequena parte de 1. Esta aula mostra o caminho.' },
      { text: 'Fazer 1.200 ÷ 3', why: 'Isso daria um terço. A aula mostra o papel do 8 e do 3.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'de-quantidade',
      part: 'Fração de um valor',
      title: 'Fração de uma quantidade',
      goal: 'Calcular uma fração de um número: dividir pelo denominador e multiplicar pelo numerador.',
      explain:
        '"**3/8 de 1.200**" quer dizer: divida 1.200 em **8 partes iguais** e pegue **3** delas.\n\nUma parte: 1.200 ÷ 8 = **150**. Três partes: 150 × 3 = **450**.\n\nÉ a mesma leitura da fração que você já conhece: o denominador diz em quantas partes dividir; o numerador, quantas pegar.',
      example: '2/5 de 750: 750 ÷ 5 = 150; 150 × 2 = **300**.',
      check: {
        kind: 'choice',
        id: 'dq-c',
        prompt: 'Quanto é 3/4 de 200?',
        options: [
          { text: '150', why: 'Isso. 200 ÷ 4 = 50; 50 × 3 = 150.' },
          { text: '50', why: 'Isso é só 1/4. Faltou multiplicar por 3.' },
          { text: '600', why: 'Multiplicou por 3 sem dividir por 4.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Dois passos, sempre nesta ordem prática: quanto vale UMA parte (divida pelo denominador) e quantas partes você quer (multiplique pelo numerador). 2/3 de 90: uma parte é 30; duas são 60.',
        check: {
          kind: 'choice',
          id: 'dq-r',
          prompt: 'Quanto é 2/3 de 90?',
          options: [
            { text: '60', why: 'Isso. 90 ÷ 3 = 30; 30 × 2 = 60.' },
            { text: '30', why: 'Isso é uma parte só; são duas.' },
            { text: '45', why: 'Isso é metade de 90. A fração é 2/3.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'multiplicar',
      part: 'Multiplicar',
      title: 'Multiplicar frações',
      goal: 'Multiplicar frações e entender o "de" como multiplicação.',
      explain:
        'Na matemática, o "**de**" de "fração de" é uma **multiplicação**: 3/8 de 1.200 = 3/8 × 1.200.\n\nE a fração de uma fração? **Metade de 3/4**: corte cada um dos 3 quartos ao meio. Cada pedaço vira um oitavo, e você fica com 3 deles: **3/8**.\n\nNa conta: **1/2 × 3/4 = (1 × 3)/(2 × 4) = 3/8**. Regra: **numerador vezes numerador, denominador vezes denominador**. Aqui não é preciso denominador comum.',
      example: '2/3 × 3/5 = 6/15 = **2/5** (simplificando por 3).',
      check: {
        kind: 'choice',
        id: 'mt-c',
        prompt: 'Quanto é 2/5 × 3/7?',
        options: [
          { text: '6/35', why: 'Isso. 2 × 3 em cima, 5 × 7 embaixo.' },
          { text: '5/12', why: 'Isso foi somar em cima e embaixo. Na multiplicação, multiplica-se.' },
          { text: '6/7', why: 'O denominador também é multiplicado: 5 × 7.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Leia "1/3 de 1/2": metade de algo, dividida em 3. Cada pedaço é um sexto, e você pega 1: 1/6. Na conta, 1 × 1 em cima e 3 × 2 embaixo.',
        check: {
          kind: 'choice',
          id: 'mt-r',
          prompt: 'Quanto é 1/3 de 1/2?',
          options: [
            { text: '1/6', why: 'Isso. 1/3 × 1/2 = 1/6.' },
            { text: '2/5', why: 'Isso seria somar em cima e embaixo.' },
            { text: '5/6', why: 'Isso é 1/3 + 1/2. Aqui é "de", multiplicação.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dividir-ideia',
      part: 'Dividir',
      title: 'Dividir por uma fração: quantas cabem?',
      goal: 'Interpretar a divisão por uma fração como "quantas partes cabem".',
      explain:
        'Dividir também responde: **quantas vezes uma coisa cabe na outra**. 12 ÷ 3 = 4 porque o 3 cabe 4 vezes no 12.\n\nEntão **3 ÷ 1/2** pergunta: quantas metades cabem em 3 inteiros? Cada inteiro tem 2 metades, então em 3 inteiros cabem **6**.\n\nRepare: dividir por 1/2 deu o **dobro** (3 virou 6). Dividir por uma fração menor que 1 aumenta o número, porque pedaços pequenos cabem muitas vezes.',
      example: '2 ÷ 1/4: em cada inteiro cabem 4 quartos; em 2 inteiros, **8**.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Quanto é 5 ÷ 1/3?',
        options: [
          { text: '15', why: 'Isso. Em cada inteiro cabem 3 terços; em 5, cabem 15.' },
          { text: '5/3', why: 'Isso seria dividir por 3. Dividir por 1/3 conta quantos terços cabem.' },
          { text: '1/15', why: 'Dividir por uma fração menor que 1 aumenta o número.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em garrafas: quantos copos de meio litro você enche com 4 litros? Cada litro enche 2 copos; 4 litros enchem 8. Isso é 4 ÷ 1/2 = 8.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'Quantos copos de 1/2 litro se enchem com 4 litros?',
          options: [
            { text: '8', why: 'Isso. 4 ÷ 1/2 = 8.' },
            { text: '2', why: 'Isso seria 4 ÷ 2. Cada copo é meio litro.' },
            { text: '4', why: 'Cada litro enche dois copos de meio litro.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'inverter',
      part: 'Dividir',
      title: 'Por que dividir é multiplicar pelo inverso',
      goal: 'Dividir frações multiplicando pela fração inversa, sabendo por que funciona.',
      explain:
        'Você viu que dividir por 1/2 é dobrar, ou seja, **multiplicar por 2/1**. Dividir por 1/3 é multiplicar por 3.\n\nA fração com numerador e denominador trocados é o **inverso**: o inverso de 2/5 é 5/2.\n\nRegra geral: **dividir por uma fração é multiplicar pelo seu inverso**. **3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8**.\n\nUm número inteiro também tem inverso: 4 = 4/1, cujo inverso é 1/4. Por isso 5/6 ÷ 4 = 5/6 × 1/4 = **5/24**.',
      example: '2/3 ÷ 4/9 = 2/3 × 9/4 = 18/12 = **3/2**.',
      check: {
        kind: 'choice',
        id: 'iv-c',
        prompt: 'Quanto é 1/2 ÷ 3/4?',
        options: [
          { text: '2/3', why: 'Isso. 1/2 × 4/3 = 4/6 = 2/3.' },
          { text: '3/8', why: 'Isso é 1/2 × 3/4. Na divisão, a segunda fração é invertida.' },
          { text: '3/2', why: 'Inverteu a primeira fração. Inverte-se a segunda.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Lembre do caso simples: ÷ 1/2 é o mesmo que × 2. A segunda fração vira de cabeça para baixo e a divisão vira multiplicação. A primeira fração fica como está.',
        check: {
          kind: 'choice',
          id: 'iv-r',
          prompt: 'Quanto é 3/5 ÷ 3?',
          options: [
            { text: '1/5', why: 'Isso. 3/5 × 1/3 = 3/15 = 1/5.' },
            { text: '9/5', why: 'Isso seria multiplicar por 3. Dividir por 3 é multiplicar por 1/3.' },
            { text: '5', why: 'A primeira fração não se inverte.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'choice',
      id: 'cs-1',
      prompt: 'Um contrato de R$ 48.000 tem 5/6 já pagos. Quanto foi pago?',
      options: [
        { text: 'R$ 40.000', why: 'Isso. 48.000 ÷ 6 = 8.000; × 5 = 40.000.' },
        { text: 'R$ 8.000', why: 'Isso é 1/6, o que falta pagar.' },
        { text: 'R$ 57.600', why: 'Dividir por 5/6 aumentaria o número. Aqui é "5/6 de".' },
      ],
      answer: 0,
    },
    {
      kind: 'sort',
      id: 'cs-2',
      prompt: 'O resultado é maior ou menor que o primeiro número?',
      categories: ['Maior', 'Menor'],
      items: [
        { text: '6 × 1/2', cat: 1, why: 'Metade de 6: 3.' },
        { text: '6 ÷ 1/2', cat: 0, why: 'Quantas metades cabem em 6: 12.' },
        { text: '6 ÷ 3', cat: 1, why: '2.' },
        { text: '6 ÷ 1/3', cat: 0, why: '18.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cs-3',
      prompt: 'Onde está o erro?',
      lines: ['4/5 ÷ 2/3', '= 5/4 × 2/3', '= 10/12 = 5/6'],
      bug: 1,
      why: 'Inverteu a primeira fração. Inverte-se a segunda: 4/5 × 3/2 = 12/10 = 6/5.',
      fixed: '= 4/5 × 3/2 = 12/10 = 6/5',
    },
  ],
  exam: [],
  summary: [
    'Fração de uma quantidade: divida pelo denominador e multiplique pelo numerador.',
    '"De" é multiplicação: numerador × numerador, denominador × denominador.',
    'Dividir por uma fração conta quantas partes cabem; por uma fração menor que 1, o número aumenta.',
    'Dividir é multiplicar pelo inverso da segunda fração.',
  ],
  vocab: [{ term: 'inverso', match: 'invers', step: 'inverter' }],
};

export const matRacionaisRestante: MicroLesson = {
  ...S,
  id: 'mat.inteiros.9',
  series: { id: 'mat.inteiros', order: 9 },
  title: 'Racionais, dízimas, expoente negativo e fração do restante',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma verba gastou 1/3 e depois 1/3 do que restou. Sobrou 1/3 da verba?',
    options: [
      { text: 'Talvez não: o segundo 1/3 é de uma parte menor', why: 'Ótima desconfiança. Esta aula mostra a conta certa.' },
      { text: 'Sim: 1 − 1/3 − 1/3 = 1/3', why: 'É a pegadinha preferida da banca. Esta aula mostra o que muda.' },
      { text: 'Não sobra nada', why: 'Sobra uma parte. Esta aula mostra quanto.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'racionais',
      part: 'Os conjuntos',
      title: 'Números racionais e decimais',
      goal: 'Reconhecer números racionais e converter decimais simples em fração.',
      explain:
        'Todo número que pode ser escrito como **fração de inteiros** (com denominador diferente de zero) é **racional**. O conjunto deles tem o símbolo **ℚ**.\n\nComo 5 = 5/1, **todo inteiro é racional**, e todo natural é inteiro. Os conjuntos estão um dentro do outro: ℕ dentro de ℤ, ℤ dentro de ℚ.\n\nUm **decimal** também é fração: os algarismos depois da vírgula contam décimos, centésimos, milésimos. 0,75 = 75/100 = **3/4**. −0,5 = −5/10 = **−1/2**.',
      example: '2,3 = 23/10. 0,08 = 8/100 = 2/25.',
      check: {
        kind: 'choice',
        id: 'rc-c',
        prompt: 'Qual fração é igual a 0,25?',
        options: [
          { text: '1/4', why: 'Isso. 0,25 = 25/100 = 1/4.' },
          { text: '25/10', why: 'Duas casas depois da vírgula são centésimos: 25/100.' },
          { text: '2/5', why: '2/5 = 0,4.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte as casas depois da vírgula: uma casa, denominador 10; duas, 100; três, 1.000. Depois simplifique. 0,6 = 6/10 = 3/5.',
        check: {
          kind: 'choice',
          id: 'rc-r',
          prompt: 'Qual afirmação é verdadeira?',
          options: [
            { text: '−7 é racional', why: 'Isso. −7 = −7/1.' },
            { text: '0,3 não é racional, porque tem vírgula', why: '0,3 = 3/10: é racional.' },
            { text: 'Todo racional é inteiro', why: 'É o contrário: todo inteiro é racional, mas 1/2 é racional e não é inteiro.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dizima',
      part: 'Os conjuntos',
      title: 'Dízimas periódicas',
      goal: 'Reconhecer uma dízima periódica e convertê-la em fração.',
      explain:
        'Algumas divisões nunca terminam: 1 ÷ 3 = 0,333... Os algarismos que se repetem para sempre formam o **período**, e o número é uma **dízima periódica**.\n\nComo nasceu de uma fração (1/3), **toda dízima periódica é racional**.\n\nPara a **dízima periódica simples** (o período começa logo depois da vírgula), há um atalho: o **período vai no numerador** e, no denominador, **tantos noves quantos algarismos tiver o período**.',
      example: '0,3636...: período 36 (dois algarismos). Fração: 36/99 = **4/11**. Conferência: 4 ÷ 11 = 0,3636...',
      check: {
        kind: 'choice',
        id: 'dz-c',
        prompt: 'Qual fração é igual a 0,777...?',
        options: [
          { text: '7/9', why: 'Isso. Período 7, um algarismo: um nove no denominador.' },
          { text: '7/10', why: '7/10 = 0,7, que termina. A dízima pede noves.' },
          { text: '77/99', why: 'O período é só o 7, de um algarismo.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Primeiro ache o período (o pedaço que se repete) e conte seus algarismos. 0,1212...: período 12, dois algarismos, então 12/99 = 4/33.',
        check: {
          kind: 'choice',
          id: 'dz-r',
          prompt: 'Qual fração é igual a 0,1212...?',
          options: [
            { text: '12/99', why: 'Isso. Período 12, dois algarismos: 99.' },
            { text: '12/100', why: 'Isso é 0,12, que termina.' },
            { text: '1/2', why: '1/2 = 0,5.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'expoente-negativo',
      part: 'Potências',
      title: 'Expoente negativo: o inverso',
      goal: 'Calcular potências de expoente negativo.',
      explain:
        'Continue a escada de potências, dividindo pela base a cada degrau:\n\n2¹ = 2\n2⁰ = 1\n2⁻¹ = 1 ÷ 2 = **1/2**\n2⁻² = 1/2 ÷ 2 = **1/4**\n\nRegra: **a⁻ⁿ = 1/aⁿ**. O expoente negativo indica o **inverso**, e **não** deixa o número negativo: 2⁻³ = 1/8.\n\nCom base fracionária, inverte-se a fração: **(a/b)⁻ⁿ = (b/a)ⁿ**. (2/3)⁻² = (3/2)² = 9/4.',
      example: '(1/2)⁻² = 2² = **4**. 3⁻¹ = **1/3**.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'Quanto é 5⁻²?',
        options: [
          { text: '1/25', why: 'Isso. 1/5² = 1/25.' },
          { text: '−25', why: 'O expoente negativo inverte; não troca o sinal.' },
          { text: '−10', why: 'Nem é potência: seria 5 × (−2).' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia o menos do expoente como "vire de cabeça para baixo". 4⁻¹: vire o 4 (4/1) e fica 1/4. 4⁻²: vire e eleve ao quadrado: 1/16.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'Quanto é (1/3)⁻²?',
          options: [
            { text: '9', why: 'Isso. Inverte para 3 e eleva ao quadrado.' },
            { text: '1/9', why: 'O expoente negativo inverte a base: (1/3)⁻² = 3² = 9.' },
            { text: '−9', why: 'O expoente negativo não troca o sinal.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'restante',
      part: 'Fração do restante',
      title: 'Fração do restante',
      goal: 'Resolver problemas em que uma segunda fração incide sobre o que sobrou.',
      explain:
        'Leia com atenção: "gastou 3/8 e, **do que restou**, 2/5". A segunda fração é **do restante**, não do total.\n\nPasso a passo, com 1.200: custeio 3/8 de 1.200 = 450. Restante: 1.200 − 450 = 750. Investimento: 2/5 de **750** = 300. Sobra: 750 − 300 = **450**.\n\nPelas frações: sobram 5/8 e, desse restante, sobram 3/5. Sobra final = 3/5 **de** 5/8 = 3/5 × 5/8 = 15/40 = **3/8** do total. E 3/8 de 1.200 = 450.',
      example: 'O erro clássico é fazer 2/5 de 1.200 = 480, aplicando a segunda fração ao total.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'Gastou 1/3 de uma verba e depois 1/3 do restante. Que fração da verba sobrou?',
        options: [
          { text: '4/9', why: 'Isso. Sobram 2/3 e, deles, 2/3: 2/3 × 2/3 = 4/9.' },
          { text: '1/3', why: 'O segundo 1/3 é do restante, que é menor que a verba toda.' },
          { text: '5/9', why: 'Essa é a parte gasta: 1/3 + 2/9.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Use um valor fácil, como 90. Gasta 1/3 (30): sobram 60. Gasta 1/3 de 60 (20): sobram 40. E 40 de 90 é 4/9. A segunda parte saiu dos 60, não dos 90.',
        check: {
          kind: 'choice',
          id: 'rs-r',
          prompt: 'De 200, gasta-se 1/4 e depois 1/2 do restante. Quanto sobra?',
          options: [
            { text: '75', why: 'Isso. Gasta 50, restam 150; gasta 75, sobram 75.' },
            { text: '50', why: 'A metade é dos 150 que restaram, não dos 200.' },
            { text: '25', why: 'Confira: 1/4 de 200 é 50; restam 150; a metade disso é 75.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'voltar',
      part: 'Fração do restante',
      title: 'Do que sobrou, achar o total',
      goal: 'Encontrar o valor total a partir da fração que sobrou e do seu valor.',
      explain:
        'A banca também faz o caminho inverso: dá **quanto sobrou** em reais e pede o total.\n\nPrimeiro descubra **que fração sobrou**. Depois use: se essa fração vale tal quantia, **uma parte** vale a quantia dividida pelo numerador, e o **todo** é uma parte vezes o denominador.\n\nSe sobram **3/20** da verba e isso é R$ 36.000: uma parte (1/20) vale 36.000 ÷ 3 = 12.000; o todo (20/20) vale 12.000 × 20 = **R$ 240.000**.',
      example: 'Sobram 2/5 e isso vale 800. Uma parte: 800 ÷ 2 = 400. Total: 400 × 5 = **2.000**.',
      check: {
        kind: 'choice',
        id: 'vt-c',
        prompt: 'Sobraram 3/10 de uma verba, o que equivale a R$ 9.000. Qual era a verba?',
        options: [
          { text: 'R$ 30.000', why: 'Isso. 9.000 ÷ 3 = 3.000 (um décimo); × 10 = 30.000.' },
          { text: 'R$ 2.700', why: 'Isso é 3/10 de 9.000. Aqui os 9.000 já são os 3/10.' },
          { text: 'R$ 3.000', why: 'Isso é só um décimo. O todo tem 10 décimos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Monte a frase "3 partes valem 9.000". Então 1 parte vale 3.000. O todo tem quantas partes? O denominador diz: 10. Logo, 30.000.',
        check: {
          kind: 'choice',
          id: 'vt-r',
          prompt: 'Sobram 2/7 de um estoque, que são 40 caixas. Quantas caixas havia?',
          options: [
            { text: '140', why: 'Isso. 40 ÷ 2 = 20 por parte; 20 × 7 = 140.' },
            { text: '80', why: 'Isso é 40 × 2. As 40 caixas já são 2 partes.' },
            { text: '20', why: 'Isso é uma parte só; o todo tem 7.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cs-1',
      prompt: 'Classifique cada número.',
      categories: ['Inteiro', 'Racional não inteiro'],
      items: [
        { text: '−12', cat: 0, why: 'Inteiro (e também racional).' },
        { text: '0,5', cat: 1, why: '1/2.' },
        { text: '0,333...', cat: 1, why: '1/3: dízima periódica.' },
        { text: '20/4', cat: 0, why: '20/4 = 5.' },
      ],
    },
    {
      kind: 'order',
      id: 'cs-2',
      prompt: 'Gastou 2/5 e depois 1/2 do restante, de R$ 1.000. Ponha os passos na ordem.',
      items: ['2/5 de 1.000 = 400', 'Restante: 1.000 − 400 = 600', '1/2 de 600 = 300', 'Sobra: 600 − 300 = 300'],
      why: 'A segunda fração incide sobre o restante, calculado antes dela.',
    },
    {
      kind: 'choice',
      id: 'cs-3',
      prompt: 'Quanto é 2⁻¹ + 4⁻¹?',
      options: [
        { text: '3/4', why: 'Isso. 1/2 + 1/4 = 2/4 + 1/4 = 3/4.' },
        { text: '−6', why: 'O expoente negativo indica inverso, não oposto.' },
        { text: '6⁻¹', why: 'Não se somam as bases. Calcule cada potência: 1/2 e 1/4.' },
      ],
      answer: 0,
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.003' },
  ],
  summary: [
    'Racional: pode ser escrito como fração de inteiros. ℕ dentro de ℤ, ℤ dentro de ℚ.',
    'Decimal é fração de 10, 100, 1.000; dízima periódica também é racional (0,3636... = 36/99).',
    'a⁻ⁿ = 1/aⁿ: o expoente negativo inverte, não deixa negativo.',
    'Fração do restante: a segunda fração incide sobre o que sobrou; as sobras se multiplicam.',
    'Do que sobrou ao total: divida pelo numerador e multiplique pelo denominador.',
  ],
  vocab: [
    { term: 'racional', match: 'racion', step: 'racionais' },
    { term: 'decimal', match: 'decima', step: 'racionais' },
    { term: 'dízima', match: 'dízima', step: 'dizima' },
    { term: 'período', match: 'período', step: 'dizima' },
    { term: 'expoente negativo', match: 'expoente negativo|⁻', step: 'expoente-negativo' },
    { term: 'restante', match: 'restante|do que restou', step: 'restante' },
  ],
};
