// Série "Múltiplos, divisores, MMC e MDC" (cap.mat.01, trecho divisores), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta de Euclides a Gauss; as seguintes ensinam múltiplos,
// divisores, primos, decomposição e critérios, depois MMC, MDC e problemas com resto, uma ideia por
// etapa. Fatos e contas conferidos com o texto do capítulo (02-multiplos-divisores.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'divisores' } as const;

export const matDivHistoria: MicroLesson = {
  ...S,
  id: 'mat.divisores.1',
  series: { id: 'mat.divisores', order: 1 },
  title: 'De Euclides a Gauss: a história dos primos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você tem 12 balas para dividir igualmente entre crianças, sem sobrar nenhuma. Dá para dividir entre 5 crianças?',
    options: [
      { text: 'Não: sobrariam 2 balas', why: 'Isso. 5 não divide 12 exatamente. Esta aula conta como os gregos estudaram esses números.' },
      { text: 'Sim: cada uma ganha 2 e sobra pouco', why: 'Sobrar 2 já não é dividir igualmente sem sobra. Esta aula mostra essa ideia.' },
      { text: 'Sim, sempre dá', why: 'Nem sempre: com 5 crianças sobram 2 balas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'exata',
      part: 'A ideia',
      title: 'Divisão exata',
      art: 'abaco',
      goal: 'Entender divisão exata como dividir sem sobra.',
      explain:
        'Dividir **12 balas** entre **3 crianças** dá **4 para cada**, sem sobra. Entre **5 crianças**, cada uma ganha 2 e **sobram 2**.\n\nQuando **não sobra nada**, a divisão é **exata**, e o resto é **zero**.\n\nEssa pergunta simples, "divide sem sobra?", ocupou matemáticos por mais de dois mil anos. É dela que nascem as ideias de **múltiplo**, **divisor** e **número primo**.',
      check: {
        kind: 'choice',
        id: 'ex-c',
        prompt: 'Quais destas divisões são exatas?',
        options: [
          { text: '12 ÷ 4', why: 'Isso: dá 3, sem sobra.' },
          { text: '12 ÷ 5', why: 'Dá 2 e sobra 2: não é exata.' },
          { text: '12 ÷ 7', why: 'Dá 1 e sobra 5: não é exata.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça com as mãos: distribua as balas uma a uma, em rodadas, para cada criança. Se, no fim, **não sobrar nenhuma bala na mesa**, a divisão foi exata. Com 12 balas e 4 crianças, cada uma fica com 3 e a mesa fica vazia.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'Numa divisão exata, o resto é:',
          options: [
            { text: 'Zero', why: 'Isso: não sobra nada.' },
            { text: 'Um', why: 'Se sobrasse 1, não seria exata.' },
            { text: 'Igual ao divisor', why: 'O resto é sempre menor que o divisor; na exata, é zero.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'euclides',
      part: 'A história',
      title: 'Por volta de 300 a.C.: Euclides',
      art: 'livro',
      goal: 'Saber o que Euclides provou e descreveu nos Elementos.',
      explain:
        'Por volta de **300 a.C.**, o matemático grego **Euclides** escreveu os ***Elementos***, um dos livros mais estudados da história.\n\nNele, ele:\n\n- provou que **os números primos são infinitos**;\n- descreveu um método para achar o **maior divisor comum** de dois números, o **algoritmo de Euclides**, usado até hoje.\n\nPrimo é um número que só se divide exatamente por 1 e por ele mesmo, como 2, 3, 5 e 7.',
      check: {
        kind: 'choice',
        id: 'eu-c',
        prompt: 'O que Euclides provou sobre os números primos?',
        options: [
          { text: 'Que eles são infinitos', why: 'Isso.' },
          { text: 'Que existem só dez primos', why: 'Ele provou o contrário: nunca acabam.' },
          { text: 'Que todo número par é primo', why: 'Só o 2 é primo e par.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Por mais longe que se vá na lista dos números, **sempre aparece mais um primo**. Euclides mostrou isso há mais de dois mil anos, sem computador, só com raciocínio. No mesmo livro, ensinou a achar o maior número que divide dois números ao mesmo tempo.',
        check: {
          kind: 'choice',
          id: 'eu-r',
          prompt: 'Como se chama o livro de Euclides?',
          options: [
            { text: 'Elementos', why: 'Isso.' },
            { text: 'Liber Abaci', why: 'Liber Abaci é de Fibonacci, de 1202.' },
            { text: 'Disquisitiones Arithmeticae', why: 'Esse é de Gauss, de 1801.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'crivo',
      part: 'A história',
      title: 'O crivo de Eratóstenes',
      art: 'degraus',
      goal: 'Aplicar o crivo de Eratóstenes para achar primos.',
      explain:
        'No **século III a.C.**, **Eratóstenes**, que viveu em **Alexandria**, propôs um jeito simples de achar os primos:\n\n1. escreva os números em ordem, a partir do 2;\n2. o 2 é primo: **risque** os outros múltiplos de 2 (4, 6, 8...);\n3. o próximo não riscado, o 3, é primo: risque os múltiplos de 3;\n4. siga assim com 5, 7...\n\nO que **sobra sem riscar** é **primo**. "Crivo" quer dizer **peneira**.',
      check: {
        kind: 'multi',
        id: 'cr-c',
        prompt: 'Usando o crivo de 2 a 20, quais números sobram sem riscar? Marque todos os primos.',
        options: [
          { text: '2', correct: true, why: 'Primo.' },
          { text: '7', correct: true, why: 'Primo.' },
          { text: '13', correct: true, why: 'Primo.' },
          { text: '9', correct: false, why: 'É riscado como múltiplo de 3.' },
          { text: '15', correct: false, why: 'É riscado como múltiplo de 3 e de 5.' },
        ],
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **peneira de feijão**: as pedrinhas ficam presas e o feijão passa. No crivo, os **múltiplos** vão ficando presos (riscados) e passam só os **primos**. O 9 fica preso porque é 3 × 3; o 15, porque é 3 × 5.',
        check: {
          kind: 'choice',
          id: 'cr-r',
          prompt: 'No crivo, por que o 21 é riscado?',
          options: [
            { text: 'Porque é múltiplo de 3 (3 × 7)', why: 'Isso.' },
            { text: 'Porque termina em 1', why: 'Terminar em 1 não decide nada: 11 e 31 são primos.' },
            { text: 'Não é riscado: é primo', why: '21 = 3 × 7, então não é primo.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'gauss',
      part: 'A história',
      title: '1801: Gauss e a decomposição única',
      art: 'alvo',
      goal: 'Saber o que diz o teorema fundamental da aritmética.',
      explain:
        'Em **1801**, no livro ***Disquisitiones Arithmeticae***, o alemão **Carl Friedrich Gauss** demonstrou com rigor:\n\ntodo número natural **maior que 1** se escreve como **produto de primos** de **um único jeito**.\n\nÉ o **teorema fundamental da aritmética**. Exemplo: **12 = 2 × 2 × 3**. Não existe outro conjunto de primos que, multiplicados, dê 12.\n\nÉ por causa dele que dá para calcular MMC e MDC, assunto das próximas aulas.',
      check: {
        kind: 'choice',
        id: 'ga-c',
        prompt: 'Qual é a decomposição de 18 em primos?',
        options: [
          { text: '2 × 3 × 3', why: 'Isso: 2 × 9 = 18, e 9 = 3 × 3.' },
          { text: '2 × 9', why: '9 não é primo: ainda dá para decompor em 3 × 3.' },
          { text: '3 × 6', why: '6 não é primo: 6 = 2 × 3.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Decompor é **quebrar** o número até sobrarem **só primos**. 18 = 2 × 9; o 9 ainda quebra em 3 × 3. Fica **2 × 3 × 3**, e daí não quebra mais. Gauss provou que, por qualquer caminho que você vá, chega sempre aos mesmos primos.',
        check: {
          kind: 'choice',
          id: 'ga-r',
          prompt: 'O que o teorema fundamental da aritmética garante?',
          options: [
            { text: 'A decomposição em primos é única', why: 'Isso.' },
            { text: 'Todo número é primo', why: 'Não: os não primos se decompõem em primos.' },
            { text: 'Os primos acabam no 100', why: 'Euclides provou que os primos são infinitos.' },
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
      items: ['Euclides escreve os Elementos (cerca de 300 a.C.)', 'Eratóstenes propõe o crivo (século III a.C.)', 'Gauss demonstra a decomposição única (1801)'],
      why: 'Dois gregos da Antiguidade e, muitos séculos depois, Gauss.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Euclides: os primos são infinitos', 'Crivo: riscar os múltiplos', 'Gauss: 12 = 2 × 6 é a decomposição em primos'],
      bug: 2,
      why: '6 não é primo. A decomposição de 12 é 2 × 2 × 3.',
      fixed: 'Gauss: 12 = 2 × 2 × 3',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: decomponha 30 em primos.',
      options: [
        { text: '2 × 3 × 5', why: 'Isso.' },
        { text: '5 × 6', why: '6 ainda se decompõe em 2 × 3.' },
        { text: '3 × 10', why: '10 ainda se decompõe em 2 × 5.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Divisão exata: não sobra nada; o resto é zero.',
    'Euclides (cerca de 300 a.C.), nos Elementos: os primos são infinitos; algoritmo do maior divisor comum.',
    'Eratóstenes: o crivo, riscando múltiplos; o que sobra é primo.',
    'Gauss (1801): todo natural maior que 1 se decompõe em primos de um único jeito.',
  ],
  vocab: [{ term: 'decomposição', match: 'decomposi[cç][aã]o', step: 'gauss' }],
};

export const matDivCriterios: MicroLesson = {
  ...S,
  id: 'mat.divisores.2',
  series: { id: 'mat.divisores', order: 2 },
  title: 'Múltiplos, divisores, primos e critérios',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Sem fazer a conta, dá para saber se 7.452 se divide exatamente por 3?',
    options: [
      { text: 'Sim: somando os algarismos', why: 'Isso. 7 + 4 + 5 + 2 = 18, que se divide por 3. Esta aula ensina esses atalhos.' },
      { text: 'Não: tem que dividir', why: 'Há atalhos chamados critérios de divisibilidade. Esta aula ensina.' },
      { text: 'Só olhando se é par', why: 'Ser par diz se divide por 2; para o 3 há outro atalho.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'multiplo-divisor',
      part: 'Conceitos',
      title: 'Múltiplo e divisor',
      art: 'abaco',
      goal: 'Distinguir múltiplo de divisor.',
      explain:
        '- **Múltiplo**: 36 é múltiplo de 9 porque **36 = 9 × 4**. Todo número tem **infinitos** múltiplos, e o **zero** é múltiplo de todos.\n- **Divisor**: 9 é divisor de 36 porque **36 ÷ 9** é **exata** (resto zero).\n\nAs duas frases dizem a mesma coisa vista de lados opostos: "36 é múltiplo de 9" e "9 é divisor de 36".',
      check: {
        kind: 'choice',
        id: 'md-c',
        prompt: 'Qual frase está certa?',
        options: [
          { text: '45 é múltiplo de 5, e 5 é divisor de 45', why: 'Isso: 45 = 5 × 9.' },
          { text: '5 é múltiplo de 45', why: 'É o contrário: 45 é múltiplo de 5.' },
          { text: '45 é divisor de 5', why: 'É o contrário: 5 é divisor de 45.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense na **tabuada do 9**: 9, 18, 27, 36... Todos esses são **múltiplos** de 9 (o número "maior", que aparece na tabuada). E o 9 é **divisor** de cada um deles (o número "menor", que divide exato).',
        check: {
          kind: 'choice',
          id: 'md-r',
          prompt: 'O zero é múltiplo de 7?',
          options: [
            { text: 'Sim: 0 = 7 × 0', why: 'Isso: o zero é múltiplo de todos.' },
            { text: 'Não: zero não é múltiplo de nada', why: '7 × 0 = 0, então é múltiplo.' },
            { text: 'Só de números pares', why: 'O zero é múltiplo de todos os números.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'primo',
      part: 'Conceitos',
      title: 'Número primo',
      art: 'alvo',
      goal: 'Reconhecer números primos e os casos especiais do 1 e do 2.',
      explain:
        'Um número **primo** tem **exatamente dois divisores** naturais: **1** e **ele mesmo**. Exemplos: 2, 3, 5, 7, 11, 13...\n\nDois cuidados:\n\n- o **1 não é primo**: tem um divisor só;\n- o **2** é o **único primo par**: todo outro par se divide por 2.',
      check: {
        kind: 'multi',
        id: 'pr-c',
        prompt: 'Quais são primos? Marque todos.',
        options: [
          { text: '2', correct: true, why: 'Único primo par.' },
          { text: '11', correct: true, why: 'Só 1 e 11.' },
          { text: '1', correct: false, why: 'Tem um divisor só.' },
          { text: '27', correct: false, why: '27 = 3 × 9.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Conte os divisores. **7**: 1 e 7, dois divisores, primo. **9**: 1, 3 e 9, três divisores, não é primo. **1**: só o 1, um divisor, **não é primo**. A regra é "exatamente dois", nem mais, nem menos.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: '"O número 1 é primo." Isso está:',
          options: [
            { text: 'Errado: tem apenas um divisor natural', why: 'Isso.' },
            { text: 'Certo', why: 'Primo precisa de exatamente dois divisores.' },
            { text: 'Certo só às vezes', why: 'A regra é fixa: o 1 não é primo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'decompor',
      part: 'Decomposição',
      title: 'Decompor e contar divisores',
      art: 'degraus',
      goal: 'Decompor em fatores primos e calcular a quantidade de divisores.',
      explain:
        'Divida sempre pelo **menor primo possível**:\n\n360 ÷ 2 = 180; ÷ 2 = 90; ÷ 2 = 45; ÷ 3 = 15; ÷ 3 = 5; ÷ 5 = 1.\n\nLogo **360 = 2³ × 3² × 5**.\n\n**Quantos divisores?** Some **1 a cada expoente** e **multiplique**: (3 + 1)(2 + 1)(1 + 1) = 4 × 3 × 2 = **24 divisores**.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: '72 = 2³ × 3². Quantos divisores naturais ele tem?',
        options: [
          { text: '12', why: 'Isso: (3 + 1)(2 + 1) = 12.' },
          { text: '6', why: 'Some 1 a cada expoente antes de multiplicar: 4 × 3 = 12.' },
          { text: '5', why: 'Não se somam os expoentes: (3 + 1)(2 + 1) = 12.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Por que somar 1? Um divisor de 2³ × 3² escolhe **quantos 2** usar (0, 1, 2 ou 3: **4 opções**) e **quantos 3** (0, 1 ou 2: **3 opções**). Combinando: 4 × 3 = **12**. O "+1" é a opção de não usar aquele primo.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Qual a decomposição de 60?',
          options: [
            { text: '2² × 3 × 5', why: 'Isso: 60 ÷ 2 ÷ 2 ÷ 3 ÷ 5 = 1.' },
            { text: '2 × 3 × 10', why: '10 ainda se decompõe em 2 × 5.' },
            { text: '6 × 10', why: '6 e 10 não são primos.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'criterios-a',
      part: 'Critérios',
      title: 'Atalhos para 2, 3, 5, 9 e 10',
      art: 'livro',
      goal: 'Aplicar os critérios de divisibilidade mais usados.',
      explain:
        '- **2**: termina em algarismo **par**.\n- **3**: a **soma dos algarismos** se divide por 3.\n- **5**: termina em **0 ou 5**.\n- **9**: a **soma dos algarismos** se divide por 9.\n- **10**: termina em **0**.\n\nExemplo: **7.452**. Termina em 2 (par): divide por 2. Soma 7 + 4 + 5 + 2 = **18**: divide por 3 e por 9.',
      check: {
        kind: 'sort',
        id: 'ca-c',
        prompt: 'O número 3.150 é divisível por quais? Classifique.',
        categories: ['Divisível', 'Não divisível'],
        items: [
          { text: 'Por 2', cat: 0, why: 'Termina em 0, que é par.' },
          { text: 'Por 9', cat: 0, why: 'Soma 3 + 1 + 5 + 0 = 9.' },
          { text: 'Por 10', cat: 0, why: 'Termina em 0.' },
          { text: 'Por 4', cat: 1, why: 'Os dois últimos formam 50, que não se divide por 4.' },
        ],
      },
      recovery: {
        explain: 'Dois tipos de atalho: os que olham **o final** do número (2, 5, 10) e os que olham **a soma dos algarismos** (3 e 9). Para 3.150: final 0 → divide por 2, 5 e 10; soma 9 → divide por 3 e por 9.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: '1.236 é divisível por 3?',
          options: [
            { text: 'Sim: 1 + 2 + 3 + 6 = 12, que se divide por 3', why: 'Isso.' },
            { text: 'Não: não termina em 3', why: 'Para o 3, olha-se a soma dos algarismos, não o final.' },
            { text: 'Não: é par', why: 'Ser par não impede: 1.236 = 3 × 412.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'criterios-b',
      part: 'Critérios',
      title: '4, 6, 8, 11 e combinações',
      art: 'balanca',
      goal: 'Aplicar critérios de 4, 6, 8 e 11 e combinar critérios de fatores primos entre si.',
      explain:
        '- **4**: os **dois últimos** algarismos formam número divisível por 4 (7.452: 52 = 4 × 13).\n- **6**: divisível por **2 e por 3**.\n- **8**: os **três últimos** formam número divisível por 8 (5.136: 136 = 8 × 17).\n- **11**: soma dos algarismos de ordem ímpar menos a dos de ordem par dá múltiplo de 11, inclusive 0 (2.574: (4 + 5) − (7 + 2) = 0).\n\nPara compostos, combine fatores **primos entre si**: divisível por **36** é ser por **4 e por 9**. Cuidado: por 4 e por 6 **não** garante 24 (o 12 é exemplo).',
      check: {
        kind: 'choice',
        id: 'cb-c',
        prompt: '"Se um número é divisível por 4 e por 6, é divisível por 24." Isso está:',
        options: [
          { text: 'Errado: 12 é divisível por 4 e por 6, e não por 24', why: 'Isso: 4 e 6 não são primos entre si.' },
          { text: 'Certo: 4 × 6 = 24', why: 'Só vale para fatores primos entre si; 4 e 6 têm o 2 em comum.' },
          { text: 'Certo só para números pares', why: 'O 12 é par e é contraexemplo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Primos entre si** são números que não têm divisor em comum além do 1, como 4 e 9. Aí vale juntar: por 4 e por 9 → por 36. Mas 4 e 6 dividem o 2 em comum; por isso "por 4 e por 6" só garante o **12**, não o 24.',
        check: {
          kind: 'choice',
          id: 'cb-r',
          prompt: 'Para saber se um número é divisível por 6, basta verificar:',
          options: [
            { text: 'Se é divisível por 2 e por 3', why: 'Isso: 2 e 3 são primos entre si.' },
            { text: 'Se termina em 6', why: '16 termina em 6 e não é divisível por 6.' },
            { text: 'Se a soma dos algarismos é 6', why: 'O critério é por 2 e por 3.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'resolvido',
      part: 'Critérios',
      title: 'Exemplo: o código 3A5B',
      art: 'cartao',
      goal: 'Usar critérios para descobrir algarismos desconhecidos.',
      explain:
        'Um código tem a forma **3A5B** e deve ser divisível por **2**, por **5** e por **9**.\n\n1. Por 2 **e** por 5 exige **terminar em 0**: **B = 0**.\n2. Por 9: a soma 3 + A + 5 + 0 = **8 + A** deve ser múltiplo de 9. Só **A = 1** serve (soma 9).\n\nO código é **3.150**. Conferência: 3.150 ÷ 9 = 350 e 3.150 ÷ 10 = 315.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Um número 2A4 é divisível por 9. Qual é o algarismo A?',
        options: [
          { text: '3', why: 'Isso: 2 + 3 + 4 = 9.' },
          { text: '9', why: '2 + 9 + 4 = 15, que não é múltiplo de 9.' },
          { text: '6', why: '2 + 6 + 4 = 12, que não é múltiplo de 9.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva a soma com o algarismo desconhecido: 2 + A + 4 = **6 + A**. Quais múltiplos de 9 podem aparecer? 9 ou 18. Com A de 0 a 9: 6 + A = 9 dá **A = 3**; 6 + A = 18 daria A = 12, que não é algarismo.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Ser divisível por 2 e por 5 ao mesmo tempo exige terminar em:',
          options: [
            { text: '0', why: 'Isso: é ser divisível por 10.' },
            { text: '5', why: 'Terminando em 5, não é par.' },
            { text: 'Qualquer par', why: 'Precisa também terminar em 0 ou 5: só o 0 serve.' },
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
      lines: ['O 2 é o único primo par', '360 = 2³ × 3² × 5 tem 24 divisores', 'Divisível por 3: termina em 3'],
      bug: 2,
      why: 'O critério do 3 é a soma dos algarismos.',
      fixed: 'Divisível por 3: soma dos algarismos divisível por 3',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Primo ou não primo?',
      categories: ['Primo', 'Não primo'],
      items: [
        { text: '17', cat: 0, why: 'Só 1 e 17.' },
        { text: '1', cat: 1, why: 'Um divisor só.' },
        { text: '51', cat: 1, why: '51 = 3 × 17 (soma 6).' },
        { text: '23', cat: 0, why: 'Só 1 e 23.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: quantos divisores naturais tem 100 = 2² × 5²?',
      options: [
        { text: '9', why: 'Isso: (2 + 1)(2 + 1) = 9.' },
        { text: '4', why: 'Some 1 a cada expoente: 3 × 3 = 9.' },
        { text: '10', why: 'Some 1 a cada expoente e multiplique: 9.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.006' }],
  summary: [
    'Múltiplo e divisor são a mesma relação vista dos dois lados: 36 = 9 × 4. O zero é múltiplo de todos.',
    'Primo: exatamente dois divisores. O 1 não é primo; o 2 é o único primo par.',
    'Decomposição: divida pelo menor primo. Quantidade de divisores: some 1 a cada expoente e multiplique.',
    'Critérios: 2, 5 e 10 pelo final; 3 e 9 pela soma; 4 e 8 pelos últimos dois ou três; 6 é 2 e 3; 11 pela diferença das somas.',
    'Combine só fatores primos entre si: por 4 e por 9 dá 36; por 4 e por 6 não garante 24.',
  ],
};

export const matDivMmcMdc: MicroLesson = {
  ...S,
  id: 'mat.divisores.3',
  series: { id: 'mat.divisores', order: 3 },
  title: 'MMC, MDC e problemas com resto',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um ônibus passa a cada 6 minutos e outro a cada 8. Os dois passaram juntos agora. Quando voltam a passar juntos?',
    options: [
      { text: 'Daqui a 24 minutos', why: 'Isso: é o menor múltiplo comum de 6 e 8. Esta aula ensina a calcular.' },
      { text: 'Daqui a 48 minutos', why: '48 também é múltiplo comum, mas não é o menor: antes disso, em 24, já coincidem.' },
      { text: 'Daqui a 14 minutos', why: '14 não é múltiplo de 6 nem de 8.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'mdc',
      part: 'Cálculo',
      title: 'MDC: fatores comuns, menor expoente',
      art: 'balanca',
      goal: 'Calcular o MDC pela decomposição.',
      explain:
        '**MDC** é o **maior divisor comum**: o maior número que divide todos ao mesmo tempo.\n\nPela decomposição: produto dos fatores **comuns**, cada um com o **menor** expoente.\n\n60 = 2² × 3 × 5\n84 = 2² × 3 × 7\n\nComuns: 2² e 3. **MDC = 2² × 3 = 12**.',
      check: {
        kind: 'choice',
        id: 'md-c',
        prompt: '24 = 2³ × 3 e 36 = 2² × 3². Qual é o MDC?',
        options: [
          { text: '12', why: 'Isso: 2² × 3.' },
          { text: '72', why: '72 é o MMC: maiores expoentes.' },
          { text: '6', why: 'O 2 aparece com expoente mínimo 2: 2² × 3 = 12.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O MDC é o que **os dois têm em comum**, sem passar do que cada um tem. O 24 tem três 2 e o 36 tem dois: em comum, **dois 2** (2²). O 24 tem um 3 e o 36 tem dois: em comum, **um 3**. Juntando: 4 × 3 = **12**.',
        check: {
          kind: 'choice',
          id: 'md-r',
          prompt: 'No MDC, cada fator comum entra com qual expoente?',
          options: [
            { text: 'O menor', why: 'Isso.' },
            { text: 'O maior', why: 'Maior expoente é do MMC.' },
            { text: 'A soma dos expoentes', why: 'Não se somam: usa-se o menor.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'mmc',
      part: 'Cálculo',
      title: 'MMC: todos os fatores, maior expoente',
      art: 'degraus',
      goal: 'Calcular o MMC pela decomposição e conferir com MDC × MMC.',
      explain:
        '**MMC** é o **menor múltiplo comum**: o menor número que é múltiplo de todos.\n\nPela decomposição: produto de **todos** os fatores, cada um com o **maior** expoente.\n\n60 = 2² × 3 × 5\n84 = 2² × 3 × 7\n\n**MMC = 2² × 3 × 5 × 7 = 420**.\n\nConferência para dois números: **MDC × MMC = produto**. 12 × 420 = 5.040, e 60 × 84 = 5.040.',
      check: {
        kind: 'choice',
        id: 'mm-c',
        prompt: 'Qual o MMC de 6 = 2 × 3, 8 = 2³ e 10 = 2 × 5?',
        options: [
          { text: '120', why: 'Isso: 2³ × 3 × 5.' },
          { text: '480', why: '480 = 6 × 8 × 10 é múltiplo comum, mas não o menor.' },
          { text: '60', why: '60 não é múltiplo de 8.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O MMC precisa **caber todos**: tem de ter três 2 (por causa do 8), um 3 (do 6) e um 5 (do 10). Fica 8 × 3 × 5 = **120**. Multiplicar tudo (480) dá um múltiplo comum, mas **não o menor**, e a banca costuma pôr esse valor como alternativa.',
        check: {
          kind: 'choice',
          id: 'mm-r',
          prompt: '"O MMC de dois primos entre si é o produto deles." Isso está:',
          options: [
            { text: 'Certo: como o MDC é 1, MMC = produto', why: 'Isso.' },
            { text: 'Errado: é sempre a soma', why: 'Não é soma: MDC × MMC = produto, e o MDC é 1.' },
            { text: 'Errado: é sempre 1', why: '1 é o MDC deles.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'qual',
      part: 'Problemas',
      title: 'MMC ou MDC? As pistas',
      art: 'alvo',
      goal: 'Reconhecer no enunciado quando usar MMC e quando usar MDC.',
      explain:
        '- **MMC**: "**voltarão a coincidir**", "**próxima vez juntos**", "**a cada x dias**". Procura-se o **menor tempo** que é múltiplo de todos os períodos.\n- **MDC**: "**maior tamanho possível**", "**mesma quantidade em cada grupo**", "**sem sobras e sem misturar**". Procura-se o **maior número** que divide todas as quantidades.\n\nExemplo de MMC: cópias de segurança a cada 6, 8 e 10 dias coincidiram hoje; voltam a coincidir em **120 dias**.',
      check: {
        kind: 'sort',
        id: 'qu-c',
        prompt: 'MMC ou MDC?',
        categories: ['MMC', 'MDC'],
        items: [
          { text: 'Quando três alarmes voltam a tocar juntos', cat: 0, why: 'Coincidir de novo.' },
          { text: 'Maior tamanho de lote, sem misturar tipos', cat: 1, why: 'Dividir em grupos iguais.' },
          { text: 'Próxima vez que dois plantões caem no mesmo dia', cat: 0, why: 'Coincidir de novo.' },
          { text: 'Cortar fitas de 30 e 45 cm em pedaços iguais, os maiores possíveis', cat: 1, why: 'Maior divisor.' },
        ],
      },
      recovery: {
        explain: 'Pergunte: o resultado é **maior** ou **menor** que os números dados? Coincidir de novo dá um tempo **maior** que cada período: **MMC** (múltiplo). Lotes do maior tamanho dão um número **menor** que cada quantidade: **MDC** (divisor).',
        check: {
          kind: 'choice',
          id: 'qu-r',
          prompt: '"Em problema de lotes iguais com o maior tamanho possível, usa-se o MMC." Isso está:',
          options: [
            { text: 'Errado: usa-se o MDC', why: 'Isso.' },
            { text: 'Certo', why: 'Lote de maior tamanho é o maior divisor comum.' },
            { text: 'Certo se houver três quantidades', why: 'O número de quantidades não muda a regra.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'lotes',
      part: 'Problemas',
      title: 'Tamanho do lote ou número de lotes',
      art: 'cartao',
      goal: 'Resolver um problema de lotes e distinguir o tamanho do número de lotes.',
      explain:
        'Separar **48** processos de licitação, **72** de convênios e **120** de pessoal em lotes iguais, **sem misturar**, do **maior tamanho possível**:\n\n48 = 2⁴ × 3; 72 = 2³ × 3²; 120 = 2³ × 3 × 5.\n\n**MDC = 2³ × 3 = 24** processos por lote.\n\nNúmero de lotes: 48 ÷ 24 + 72 ÷ 24 + 120 ÷ 24 = 2 + 3 + 5 = **10 lotes**.\n\nLeia o que se pede: **tamanho** (24) ou **número** (10). As duas aparecem nas alternativas.',
      check: {
        kind: 'choice',
        id: 'lo-c',
        prompt: '30 processos de obras e 45 de saúde, em lotes iguais, sem misturar, do maior tamanho. Quantos lotes ao todo?',
        options: [
          { text: '5', why: 'Isso: MDC 15; 30 ÷ 15 + 45 ÷ 15 = 2 + 3.' },
          { text: '15', why: '15 é o tamanho de cada lote, não o número de lotes.' },
          { text: '90', why: '90 é o MMC; aqui se usa o MDC.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Faça em duas etapas e escreva cada uma: **1)** tamanho do lote = MDC(30, 45) = **15**; **2)** quantos lotes = 30 ÷ 15 + 45 ÷ 15 = 2 + 3 = **5**. Depois volte ao enunciado e confira qual das duas ele pediu.',
        check: {
          kind: 'choice',
          id: 'lo-r',
          prompt: 'No exemplo de 48, 72 e 120 processos, qual é o tamanho de cada lote?',
          options: [
            { text: '24 processos', why: 'Isso: o MDC.' },
            { text: '10 processos', why: '10 é o número de lotes.' },
            { text: '240 processos', why: '240 é o total de processos.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'resto',
      part: 'Problemas',
      title: 'Problemas com resto',
      art: 'abaco',
      goal: 'Resolver problemas em que a divisão deixa sempre o mesmo resto.',
      explain:
        '"Qual o menor número **maior que 2** que, dividido por 6, 8 ou 10, deixa **sempre resto 2**?"\n\nEle é um **múltiplo comum mais 2**: MMC(6, 8, 10) + 2 = 120 + 2 = **122**.\n\nConferência: 122 = 6 × 20 + 2 = 8 × 15 + 2 = 10 × 12 + 2.\n\nRelação da divisão: **dividendo = divisor × quociente + resto**, com o resto **menor que o divisor**.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'Qual o menor número maior que 1 que, dividido por 4 ou por 6, deixa sempre resto 1?',
        options: [
          { text: '13', why: 'Isso: MMC(4, 6) = 12, mais 1.' },
          { text: '25', why: '25 também deixa resto 1, mas não é o menor.' },
          { text: '11', why: '11 ÷ 4 deixa resto 3.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Se tirar o resto, o número fica **divisível por todos**: vira um múltiplo comum. Então ache o menor múltiplo comum (o MMC) e **devolva o resto**. MMC(4, 6) = 12; 12 + 1 = **13**. Confira: 13 = 4 × 3 + 1 = 6 × 2 + 1.',
        check: {
          kind: 'choice',
          id: 'rs-r',
          prompt: 'Na divisão de 17 por 5, quais são o quociente e o resto?',
          options: [
            { text: 'Quociente 3, resto 2', why: 'Isso: 17 = 5 × 3 + 2.' },
            { text: 'Quociente 2, resto 7', why: 'O resto precisa ser menor que o divisor (5).' },
            { text: 'Quociente 3, resto 5', why: 'Se o resto fosse 5, caberia mais um 5.' },
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
      lines: ['MDC: fatores comuns, menor expoente', 'MMC: todos os fatores, maior expoente', 'MDC × MMC = soma dos dois números'],
      bug: 2,
      why: 'Para dois números, MDC × MMC é o produto deles.',
      fixed: 'MDC × MMC = produto dos dois números',
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene os passos para resolver um problema de "voltar a coincidir".',
      items: ['Identificar os períodos no enunciado', 'Decompor cada período em primos', 'Multiplicar todos os fatores com o maior expoente', 'Somar o resultado ao momento inicial'],
      why: 'Pista, decomposição, MMC e, por fim, a data ou hora.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: três rotinas rodam a cada 4, 6 e 10 horas e rodaram juntas segunda às 8h. Quando voltam a rodar juntas?',
      options: [
        { text: 'Quarta às 20h', why: 'Isso: MMC 60 horas; 48 h dá quarta às 8h, mais 12 h.' },
        { text: 'Terça às 8h', why: '24 h não é múltiplo de 10.' },
        { text: 'Quinta às 8h', why: 'Isso seria 72 horas; o MMC é 60.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.005' },
  ],
  summary: [
    'MDC: fatores comuns, menor expoente. MMC: todos os fatores, maior expoente.',
    'Para dois números: MDC × MMC = produto. Primos entre si: MMC = produto.',
    'MMC para "voltar a coincidir"; MDC para "maior grupo igual, sem sobra".',
    'Atenção ao que se pede: tamanho do lote (MDC) ou número de lotes (soma das divisões).',
    'Resto sempre igual: MMC + resto. Dividendo = divisor × quociente + resto, com resto menor que o divisor.',
  ],
};
