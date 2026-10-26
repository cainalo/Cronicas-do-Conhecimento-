// Série "Números inteiros e racionais" (cap.mat.01, trecho inteiros), aulas 4 a 6: ordem das
// operações, potências e o que é uma fração. Revisão didática de 26/10/2026. Fatos conferidos com
// o capítulo (01-inteiros-fracoes.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'inteiros' } as const;

export const matOrdemOperacoes: MicroLesson = {
  ...S,
  id: 'mat.inteiros.4',
  series: { id: 'mat.inteiros', order: 4 },
  title: 'Expressões: a ordem das operações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Duas pessoas calcularam 2 + 3 × 4. Uma achou 20 e a outra, 14. O que você acha?',
    options: [
      { text: 'Precisa haver uma regra para todos acharem o mesmo', why: 'Exatamente. Esta aula mostra a regra combinada e o porquê dela.' },
      { text: 'As duas estão certas', why: 'Uma conta precisa ter um só resultado. Esta aula mostra a regra.' },
      { text: 'Sempre se faz da esquerda para a direita', why: 'É uma ideia natural, mas não é a regra combinada. Esta aula explica.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'prioridade',
      part: 'Prioridade',
      title: 'Primeiro multiplicar e dividir',
      goal: 'Resolver uma expressão fazendo multiplicações e divisões antes de somas e subtrações.',
      explain:
        'Uma conta com várias operações seguidas chama-se **expressão numérica**. Se cada um escolhesse por onde começar, 2 + 3 × 4 poderia dar 20 ou 14.\n\nPara não haver dúvida, a matemática combinou uma regra: **multiplicações e divisões vêm antes de somas e subtrações**.\n\nPor que essa ordem? Porque 3 × 4 é um bloco só ("três grupos de 4"). A expressão diz "2, mais três grupos de 4": primeiro se monta o bloco, depois se soma.',
      example: '2 + 3 × 4 = 2 + 12 = **14**.\n\n10 − 8 ÷ 2 = 10 − 4 = **6**.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Quanto é 10 − 2 × 3?',
        options: [
          { text: '4', why: 'Isso. Primeiro 2 × 3 = 6; depois 10 − 6 = 4.' },
          { text: '24', why: 'Isso seria fazer 10 − 2 primeiro. A multiplicação vem antes.' },
          { text: '9', why: 'Confira a multiplicação: 2 × 3 = 6.' },
        ],
        errorKind: 'procedimento',
        answer: 0,
      },
      recovery: {
        explain: 'Leia a expressão como frase: "5, mais quatro grupos de 2". Primeiro você monta os grupos (4 × 2 = 8) e só depois junta com o 5: 13.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Quanto é 5 + 4 × 2?',
          options: [
            { text: '13', why: 'Isso. 4 × 2 = 8; 5 + 8 = 13.' },
            { text: '18', why: 'Isso seria somar primeiro. A multiplicação vem antes.' },
            { text: '11', why: 'Confira: 4 × 2 = 8, e 5 + 8 = 13.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'esquerda',
      part: 'Prioridade',
      title: 'Empate: da esquerda para a direita',
      goal: 'Resolver operações de mesma prioridade na ordem de leitura.',
      explain:
        'Multiplicação e divisão têm a **mesma prioridade**. Quando aparecem juntas, resolvem-se **na ordem em que aparecem, da esquerda para a direita**. O mesmo vale para soma e subtração entre si.\n\nO motivo: dividir por 4 e depois multiplicar por 5 é uma sequência de passos. Trocar a ordem muda o caminho e o resultado.\n\nEm **20 ÷ 4 × 5**, faz-se 20 ÷ 4 = 5 e depois 5 × 5 = **25**. Quem faz 4 × 5 primeiro acha 1, que está errado.',
      example: '10 − 4 + 2: da esquerda para a direita, 10 − 4 = 6 e 6 + 2 = **8** (e não 10 − 6 = 4).',
      check: {
        kind: 'choice',
        id: 'eq-c',
        prompt: 'Quanto é 24 ÷ 6 × 2?',
        options: [
          { text: '8', why: 'Isso. 24 ÷ 6 = 4; 4 × 2 = 8.' },
          { text: '2', why: 'Isso seria fazer 6 × 2 primeiro. Com mesma prioridade, vale a ordem de leitura.' },
          { text: '6', why: 'Confira a ordem: primeiro 24 ÷ 6.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa receita: "divida a massa em 6 e depois dobre cada parte". A ordem dos passos é a ordem do texto. Em 30 ÷ 5 × 3, divido primeiro (6) e depois multiplico (18).',
        check: {
          kind: 'choice',
          id: 'eq-r',
          prompt: 'Quanto é 9 − 3 + 1?',
          options: [
            { text: '7', why: 'Isso. 9 − 3 = 6; 6 + 1 = 7.' },
            { text: '5', why: 'Isso seria fazer 3 + 1 primeiro. Soma e subtração seguem a ordem de leitura.' },
            { text: '13', why: 'O 3 está sendo subtraído, não somado.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'parenteses',
      part: 'Agrupar',
      title: 'Parênteses, colchetes e chaves',
      goal: 'Usar parênteses, colchetes e chaves para indicar o que se resolve primeiro.',
      explain:
        'E se você **quiser** somar antes? Usa **parênteses**: o que está dentro deles se resolve **primeiro**. (2 + 3) × 4 = 5 × 4 = **20**.\n\nQuando é preciso agrupar dentro de um grupo, usam-se outros símbolos para não confundir: **colchetes** [ ] e **chaves** { }. A ordem é de dentro para fora: primeiro ( ), depois [ ], depois { }.\n\nDentro de cada grupo, valem as mesmas regras: multiplicar e dividir antes de somar e subtrair.',
      example: '18 − [4 + (6 − 2) × 2]\n\nParênteses: 6 − 2 = 4.\n\nColchete: 4 + 4 × 2 = 4 + 8 = 12.\n\nFim: 18 − 12 = **6**.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Quanto é (8 − 3) × 2?',
        options: [
          { text: '10', why: 'Isso. Parênteses primeiro: 5; depois 5 × 2 = 10.' },
          { text: '2', why: 'Isso seria 8 − 3 × 2. Os parênteses mandam fazer 8 − 3 antes.' },
          { text: '13', why: 'Confira: 8 − 3 = 5, e 5 × 2 = 10.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Parênteses são como uma caixa fechada: primeiro você resolve o que está dentro e troca a caixa pelo resultado. Em 3 × (1 + 4), a caixa vale 5, e sobra 3 × 5 = 15.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Quanto é 2 × [10 − (3 + 1)]?',
          options: [
            { text: '12', why: 'Isso. (3 + 1) = 4; [10 − 4] = 6; 2 × 6 = 12.' },
            { text: '16', why: 'Confira o colchete: 10 − 4 = 6, não 8.' },
            { text: '28', why: 'Os parênteses de dentro são resolvidos primeiro.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'com-sinais',
      part: 'Juntar tudo',
      title: 'Expressões com números negativos',
      goal: 'Resolver expressões que misturam a ordem das operações e as regras de sinais.',
      explain:
        'Nada muda com números negativos: a **ordem** é a mesma, e em cada conta você usa as regras de sinais que já aprendeu.\n\nAnote cada passo numa linha. A maior parte dos erros em prova não é de conta, é de pular passos e perder um sinal.\n\nEm −3 + 4 × (−2): primeiro a multiplicação, 4 × (−2) = −8 (sinais diferentes). Depois a soma: −3 + (−8) = **−11** (sinais iguais).',
      example: '12 ÷ (−3) − (−5)\n\nDivisão: 12 ÷ (−3) = −4.\n\nSubtração: −4 − (−5) = −4 + 5 = **1**.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: 'Quanto é 6 + (−2) × 5?',
        options: [
          { text: '−4', why: 'Isso. (−2) × 5 = −10; 6 + (−10) = −4.' },
          { text: '20', why: 'Isso seria somar primeiro: (6 − 2) × 5. A multiplicação vem antes.' },
          { text: '16', why: 'Confira o sinal: (−2) × 5 = −10.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Separe em duas linhas: primeiro só a multiplicação, com o sinal; depois só a soma. Em 1 − 3 × (−2): linha 1, 3 × (−2) = −6; linha 2, 1 − (−6) = 1 + 6 = 7.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'Quanto é 1 − 3 × (−2)?',
          options: [
            { text: '7', why: 'Isso. 3 × (−2) = −6; 1 − (−6) = 7.' },
            { text: '4', why: 'Isso seria (1 − 3) × (−2). Sem parênteses, multiplica-se antes.' },
            { text: '−5', why: 'Tirar −6 soma 6: 1 + 6 = 7.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cs-1',
      prompt: 'Ponha na ordem em que se resolve: 20 − [2 + (5 − 1) × 3]',
      items: ['Parênteses: 5 − 1 = 4', 'Multiplicação no colchete: 4 × 3 = 12', 'Soma no colchete: 2 + 12 = 14', 'Fim: 20 − 14 = 6'],
      why: 'De dentro para fora, e dentro do colchete a multiplicação vem antes da soma.',
    },
    {
      kind: 'choice',
      id: 'cs-2',
      prompt: 'Quanto é 30 ÷ 5 × 2 − 4?',
      options: [
        { text: '8', why: 'Isso. 30 ÷ 5 = 6; 6 × 2 = 12; 12 − 4 = 8.' },
        { text: '−1', why: 'Isso seria fazer 5 × 2 primeiro. Com mesma prioridade, vale a ordem de leitura.' },
        { text: '4', why: 'Confira a ordem: 30 ÷ 5 = 6, depois 6 × 2 = 12.' },
      ],
      answer: 0,
    },
    {
      kind: 'fix',
      id: 'cs-3',
      prompt: 'Onde está o erro?',
      lines: ['8 − 2 × (−3)', '= 6 × (−3)', '= −18'],
      bug: 1,
      why: 'Fez 8 − 2 primeiro. A multiplicação 2 × (−3) = −6 vem antes, e 8 − (−6) = 14.',
      fixed: '= 8 − (−6) = 14',
    },
  ],
  exam: [],
  summary: [
    'Multiplicar e dividir vêm antes de somar e subtrair.',
    'Com a mesma prioridade, resolve-se da esquerda para a direita.',
    'Parênteses, depois colchetes, depois chaves: de dentro para fora.',
    'Com negativos, a ordem é a mesma e cada conta usa a regra de sinais.',
  ],
  vocab: [
    { term: 'expressão numérica', match: 'expressão numérica', step: 'prioridade' },
    { term: 'colchetes', match: 'colchete', step: 'parenteses' },
    { term: 'chaves', match: '\\bchaves\\b|\\{', step: 'parenteses' },
  ],
};

export const matPotencias: MicroLesson = {
  ...S,
  id: 'mat.inteiros.5',
  series: { id: 'mat.inteiros', order: 5 },
  title: 'Potências',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Como escrever 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 de um jeito mais curto?',
    options: [
      { text: 'Deve haver um símbolo para "multiplicar o 2 por ele mesmo 8 vezes"', why: 'Exatamente. Esse símbolo é a potência, o tema desta aula.' },
      { text: '2 × 8', why: '2 × 8 = 16 é "oito grupos de 2", outra coisa. Esta aula mostra a diferença.' },
      { text: 'Não há como encurtar', why: 'Há, e é muito usado. Esta aula mostra como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'notacao',
      part: 'O que é',
      title: 'Multiplicação repetida: base e expoente',
      goal: 'Ler e calcular potências de expoente natural.',
      explain:
        'Assim como a multiplicação encurta uma soma repetida, a **potência** encurta uma **multiplicação repetida**.\n\n**2³** quer dizer 2 × 2 × 2 = 8. O número que se repete (2) é a **base**. O número pequeno no alto (3) é o **expoente**: diz **quantas vezes** a base aparece.\n\nLê-se "dois elevado a três" (ou "dois ao cubo"). 5² é "cinco ao quadrado" = 5 × 5 = 25.\n\nCuidado: 2³ **não** é 2 × 3. É 2 × 2 × 2.',
      example: '3⁴ = 3 × 3 × 3 × 3 = 9 × 3 × 3 = 27 × 3 = **81**.',
      check: {
        kind: 'choice',
        id: 'nt-c',
        prompt: 'Quanto é 4³?',
        options: [
          { text: '64', why: 'Isso. 4 × 4 × 4 = 64.' },
          { text: '12', why: 'Isso é 4 × 3. A potência multiplica o 4 por ele mesmo 3 vezes.' },
          { text: '16', why: 'Isso é 4², só duas vezes o 4.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O expoente conta quantas vezes a base aparece na multiplicação. Em 5³, escreva três cincos: 5 × 5 × 5. Calcule aos poucos: 25, depois 125.',
        check: {
          kind: 'choice',
          id: 'nt-r',
          prompt: 'Em 7², qual é a base e quanto vale?',
          options: [
            { text: 'Base 7; vale 49', why: 'Isso. 7 × 7 = 49.' },
            { text: 'Base 2; vale 14', why: 'A base é o número que se repete (7); 7 × 2 seria outra conta.' },
            { text: 'Base 7; vale 14', why: '14 é 7 × 2. A potência é 7 × 7.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'base-negativa',
      part: 'Sinais',
      title: 'Base negativa: expoente par ou ímpar',
      goal: 'Descobrir o sinal de uma potência de base negativa.',
      explain:
        'Se a base é negativa, use a regra de sinais da multiplicação, par a par.\n\n(−2)² = (−2) × (−2) = **4**: sinais iguais, positivo.\n\n(−2)³ = (−2) × (−2) × (−2) = 4 × (−2) = **−8**.\n\nCada par de negativos vira positivo. Com expoente **par**, todos formam pares e o resultado é **positivo**. Com expoente **ímpar**, sobra um negativo e o resultado é **negativo**.',
      example: '(−3)⁴ = 81 (expoente par). (−3)³ = −27 (expoente ímpar).',
      check: {
        kind: 'choice',
        id: 'bn-c',
        prompt: 'Quanto é (−5)²?',
        options: [
          { text: '25', why: 'Isso. (−5) × (−5): sinais iguais, positivo.' },
          { text: '−25', why: 'Dois negativos multiplicados dão positivo.' },
          { text: '−10', why: 'Isso seria (−5) × 2. A potência é (−5) × (−5).' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva os fatores e vá de dois em dois. (−1)⁵ = (−1)(−1)(−1)(−1)(−1): dois pares viram +1 cada, sobra um −1. Resultado: −1.',
        check: {
          kind: 'choice',
          id: 'bn-r',
          prompt: 'Qual é o sinal de (−4)⁵?',
          options: [
            { text: 'Negativo', why: 'Isso. Expoente ímpar: sobra um negativo sem par.' },
            { text: 'Positivo', why: 'Com expoente ímpar, sobra um fator negativo.' },
            { text: 'Depende do 4', why: 'O sinal depende só de o expoente ser par ou ímpar.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'sem-parenteses',
      part: 'Sinais',
      title: 'Cuidado: −2² não é (−2)²',
      goal: 'Identificar qual é a base quando não há parênteses.',
      explain:
        'O expoente atinge **só o que está colado nele**. Os parênteses é que dizem o que faz parte da base.\n\nEm **(−2)²**, a base é −2: (−2) × (−2) = **4**.\n\nEm **−2²**, a base é só o 2; o menos fica de fora: −(2 × 2) = **−4**.\n\nEsta é uma das pegadinhas mais cobradas em prova.',
      example: '−3² = −9, mas (−3)² = 9.',
      check: {
        kind: 'choice',
        id: 'sp-c',
        prompt: 'Quanto é −6²?',
        options: [
          { text: '−36', why: 'Isso. A base é 6: −(6 × 6) = −36.' },
          { text: '36', why: 'Isso seria (−6)². Sem parênteses, o menos fica fora da potência.' },
          { text: '−12', why: 'A potência é 6 × 6, não 6 × 2.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia −5² como "o oposto de 5²". Primeiro a potência (25), depois o oposto (−25). Já (−5)² é "menos cinco, ao quadrado", com o menos dentro da base.',
        check: {
          kind: 'choice',
          id: 'sp-r',
          prompt: 'Qual expressão vale 25?',
          options: [
            { text: '(−5)²', why: 'Isso. A base é −5, e dois negativos dão positivo.' },
            { text: '−5²', why: 'Essa vale −25: o menos fica fora da potência.' },
            { text: '−(5²)', why: 'É o mesmo que −5²: vale −25.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'zero-um',
      part: 'Casos especiais',
      title: 'Expoente 1 e expoente 0',
      goal: 'Calcular potências com expoente 1 e expoente 0.',
      explain:
        'Com **expoente 1**, a base aparece uma vez só: **a¹ = a**. 9¹ = 9.\n\nE o **expoente 0**? Veja o padrão:\n\n2³ = 8\n2² = 4\n2¹ = 2\n\nCada vez que o expoente diminui 1, o resultado é **dividido pela base** (2). Continuando: 2⁰ = 2 ÷ 2 = **1**.\n\nPor isso **a⁰ = 1** para qualquer base diferente de zero. 7⁰ = 1, (−3)⁰ = 1.',
      example: '10³ = 1.000, 10² = 100, 10¹ = 10, 10⁰ = **1**.',
      check: {
        kind: 'choice',
        id: 'zu-c',
        prompt: 'Quanto é 15⁰?',
        options: [
          { text: '1', why: 'Isso. Qualquer base diferente de zero elevada a 0 dá 1.' },
          { text: '0', why: 'É o erro mais comum. Pelo padrão de dividir pela base, chega-se a 1.' },
          { text: '15', why: 'Isso seria 15¹.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Faça a escada com 5: 5² = 25, 5¹ = 5. Descer um degrau é dividir por 5. Do 5 para o próximo degrau: 5 ÷ 5 = 1. Esse é o 5⁰.',
        check: {
          kind: 'choice',
          id: 'zu-r',
          prompt: 'Quanto é 3⁰ + 3¹?',
          options: [
            { text: '4', why: 'Isso. 1 + 3 = 4.' },
            { text: '3', why: '3⁰ vale 1, não 0.' },
            { text: '6', why: '3⁰ vale 1, não 3.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'propriedades',
      part: 'Propriedades',
      title: 'Contar fatores: as propriedades',
      goal: 'Usar as propriedades de produto, quociente e potência de potência.',
      explain:
        'As propriedades saem de **contar quantas vezes a base aparece**.\n\n**Produto de mesma base**: 2³ × 2⁴ tem 3 dois e depois mais 4 dois: 2⁷. **Somam-se os expoentes.**\n\n**Divisão de mesma base**: 5⁶ ÷ 5⁴: quatro cincos de cima cancelam com os de baixo; sobram 5². **Subtraem-se os expoentes.**\n\n**Potência de potência**: (3²)³ = 3² × 3² × 3²: três grupos de dois: 3⁶. **Multiplicam-se os expoentes.**',
      example: '2⁵ × 2² = 2⁷ = 128. 7⁸ ÷ 7⁶ = 7² = 49. (2³)² = 2⁶ = 64.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'Quanto é 3⁵ ÷ 3³?',
        options: [
          { text: '9', why: 'Isso. 5 − 3 = 2, e 3² = 9.' },
          { text: '3', why: 'Os expoentes se subtraem: 5 − 3 = 2, e 3² = 9.' },
          { text: '27', why: 'Isso seria 3³. Subtraindo os expoentes, sobra 3².' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva os fatores. 2⁴ × 2² = (2 × 2 × 2 × 2) × (2 × 2): seis fatores 2. Por isso 2⁶ = 64. Conte sempre quantas vezes a base aparece.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'A que é igual 10² × 10³?',
          options: [
            { text: '10⁵', why: 'Isso. Mesma base: somam-se os expoentes.' },
            { text: '10⁶', why: 'Multiplicar expoentes é para potência de potência. Aqui eles se somam.' },
            { text: '100⁵', why: 'A base continua 10; só os expoentes mudam.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'na-ordem',
      part: 'Juntar tudo',
      title: 'Potências na ordem das operações',
      goal: 'Encaixar as potências na ordem de resolução de uma expressão.',
      explain:
        'Na ordem das operações, as **potências vêm logo depois dos parênteses e antes de multiplicar e dividir**.\n\nOrdem completa:\n\n1. parênteses, colchetes e chaves;\n2. potências;\n3. multiplicações e divisões, da esquerda para a direita;\n4. somas e subtrações, da esquerda para a direita.\n\nO motivo: 2³ é um bloco só (a multiplicação repetida), como 3 × 4 era um bloco para a soma.',
      example: '3 + 2³ × 2\n\nPotência: 2³ = 8.\n\nMultiplicação: 8 × 2 = 16.\n\nSoma: 3 + 16 = **19**.',
      check: {
        kind: 'choice',
        id: 'no-c',
        prompt: 'Quanto é 1 + 3² × 2?',
        options: [
          { text: '19', why: 'Isso. 3² = 9; 9 × 2 = 18; 1 + 18 = 19.' },
          { text: '37', why: 'Isso seria (3 × 2)² + 1. A potência é só do 3.' },
          { text: '32', why: 'Isso seria (1 + 3)² × 2. A soma vem por último.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Marque a potência primeiro e troque pelo valor. Em 10 − 2² × 2, o 2² vira 4, ficando 10 − 4 × 2. Agora a multiplicação: 10 − 8 = 2.',
        check: {
          kind: 'choice',
          id: 'no-r',
          prompt: 'Quanto é 10 − 2² × 2?',
          options: [
            { text: '2', why: 'Isso. 2² = 4; 4 × 2 = 8; 10 − 8 = 2.' },
            { text: '128', why: 'A subtração é a última operação, não a primeira.' },
            { text: '6', why: 'Depois da potência, ainda há a multiplicação 4 × 2.' },
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
      prompt: 'O resultado é positivo ou negativo?',
      categories: ['Positivo', 'Negativo'],
      items: [
        { text: '(−2)⁴', cat: 0, why: 'Expoente par: 16.' },
        { text: '−2⁴', cat: 1, why: 'O menos fica fora: −16.' },
        { text: '(−1)⁷', cat: 1, why: 'Expoente ímpar: −1.' },
        { text: '(−9)⁰', cat: 0, why: 'Expoente zero: 1.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cs-2',
      prompt: 'Onde está o erro?',
      lines: ['2³ × 2²', '= 2⁶', '= 64'],
      bug: 1,
      why: 'Mesma base multiplicando: somam-se os expoentes (3 + 2 = 5), não se multiplicam.',
      fixed: '= 2⁵ = 32',
    },
    {
      kind: 'choice',
      id: 'cs-3',
      prompt: 'Quanto é −3² + (−2)³?',
      options: [
        { text: '−17', why: 'Isso. −3² = −9 e (−2)³ = −8; −9 + (−8) = −17.' },
        { text: '1', why: '−3² vale −9, não 9: o menos fica fora da potência.' },
        { text: '17', why: 'As duas parcelas são negativas.' },
      ],
      answer: 0,
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.001' }],
  summary: [
    'Potência é multiplicação repetida: a base se repete tantas vezes quanto diz o expoente.',
    'Base negativa: expoente par dá positivo; ímpar, negativo.',
    '−2² = −4, mas (−2)² = 4: os parênteses dizem qual é a base.',
    'a¹ = a e a⁰ = 1 (base diferente de zero).',
    'Mesma base: produto soma expoentes, divisão subtrai, potência de potência multiplica.',
    'Ordem: parênteses, potências, multiplicação e divisão, soma e subtração.',
  ],
  vocab: [
    { term: 'potência', match: 'potência', step: 'notacao' },
    { term: 'expoente', match: 'expoente', step: 'notacao' },
  ],
};

export const matFracaoIdeia: MicroLesson = {
  ...S,
  id: 'mat.inteiros.6',
  series: { id: 'mat.inteiros', order: 6 },
  title: 'O que é uma fração',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma pizza foi cortada em 8 pedaços iguais e você comeu 3. Que parte da pizza você comeu?',
    options: [
      { text: '3 de 8 pedaços iguais', why: 'Isso. Esse "3 de 8" é uma fração, o tema desta aula.' },
      { text: '3 pizzas', why: 'Foi uma pizza só, cortada em pedaços. Esta aula mostra como falar de partes.' },
      { text: '8 pedaços', why: '8 é o total de pedaços; você comeu só parte deles.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'partes',
      part: 'Partes',
      title: 'Partes iguais de um todo',
      goal: 'Escrever e ler uma fração como partes de um todo, com numerador e denominador.',
      explain:
        'Quando um **todo** é dividido em **partes iguais**, escrevemos quantas partes pegamos sobre em quantas partes o todo foi dividido. Isso é uma **fração**.\n\nPizza em 8 pedaços, 3 comidos: **3/8** ("três oitavos").\n\nO número de baixo é o **denominador**: em quantas partes iguais o todo foi dividido. O de cima é o **numerador**: quantas dessas partes foram tomadas.\n\nAs partes **precisam ser iguais**: se os pedaços tiverem tamanhos diferentes, "3 de 8" deixa de dizer quanto foi comido.',
      example: 'Um relatório de 10 páginas, 7 já revisadas: **7/10** revisadas. Numerador 7, denominador 10.',
      check: {
        kind: 'choice',
        id: 'pt-c',
        prompt: 'Uma barra de chocolate tem 6 quadradinhos iguais. Você comeu 2. Que fração comeu?',
        options: [
          { text: '2/6', why: 'Isso. 2 partes de um todo dividido em 6.' },
          { text: '6/2', why: 'O denominador (embaixo) é o total de partes: 6.' },
          { text: '2/4', why: 'O todo tem 6 partes; 4 é o que sobrou.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Leia a fração de baixo para cima: "o todo foi dividido em 5 partes, e eu peguei 2" = 2/5. Embaixo vai o total de partes; em cima, as que você pegou.',
        check: {
          kind: 'choice',
          id: 'pt-r',
          prompt: 'Em 4/9, qual é o denominador e o que ele diz?',
          options: [
            { text: '9: o todo foi dividido em 9 partes iguais', why: 'Isso.' },
            { text: '4: o todo foi dividido em 4 partes', why: 'O 4 é o numerador: quantas partes foram tomadas.' },
            { text: '9: foram tomadas 9 partes', why: 'Quem diz as partes tomadas é o numerador (4).' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'divisao',
      part: 'Partes',
      title: 'A fração também é uma divisão',
      goal: 'Ler uma fração como divisão do numerador pelo denominador.',
      explain:
        'Repartir **3 pizzas entre 4 pessoas** dá a cada uma **3/4** de pizza. Por isso a fração também é uma **divisão**: **3/4 = 3 ÷ 4**.\n\nQuando a divisão é exata, a fração é um número inteiro: 12/4 = 12 ÷ 4 = **3**. E todo inteiro pode ser escrito como fração: 5 = 5/1.\n\nComo é uma divisão, **o denominador nunca pode ser zero**: você já viu que dividir por zero não existe.',
      example: '20/5 = 20 ÷ 5 = **4**. Conferência: 5 × 4 = 20.',
      check: {
        kind: 'choice',
        id: 'dv-c',
        prompt: 'Quanto vale 18/6?',
        options: [
          { text: '3', why: 'Isso. 18 ÷ 6 = 3.' },
          { text: '12', why: 'Isso seria 18 − 6. A fração é uma divisão.' },
          { text: '108', why: 'Isso seria 18 × 6. A fração divide.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A barra da fração faz o papel do ÷. Se 10 pastas são repartidas em 2 caixas, cada caixa fica com 10/2 = 10 ÷ 2 = 5 pastas.',
        check: {
          kind: 'choice',
          id: 'dv-r',
          prompt: 'Qual destas frações não existe?',
          options: [
            { text: '7/0', why: 'Isso. Seria dividir por zero.' },
            { text: '0/7', why: 'Essa existe e vale 0.' },
            { text: '7/7', why: 'Essa vale 1.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'equivalentes',
      part: 'Mesma quantidade',
      title: 'Frações equivalentes',
      goal: 'Gerar frações equivalentes multiplicando numerador e denominador pelo mesmo número.',
      explain:
        'Metade de uma pizza é 1/2. Se você cortar **cada** metade em 2, terá 4 pedaços e a sua parte serão 2 deles: **2/4**. A quantidade de pizza não mudou.\n\nFrações que representam a **mesma quantidade** são **equivalentes**: 1/2 = 2/4 = 4/8.\n\nPara obter uma equivalente, **multiplique numerador e denominador pelo mesmo número** (diferente de zero). Isso é cortar cada pedaço no mesmo número de partes: há mais pedaços, menores, e a quantidade continua a mesma.',
      example: '3/5 = (3 × 2)/(5 × 2) = **6/10**.',
      check: {
        kind: 'choice',
        id: 'eq-c',
        prompt: 'Qual fração é equivalente a 2/3?',
        options: [
          { text: '8/12', why: 'Isso. Numerador e denominador multiplicados por 4.' },
          { text: '2/6', why: 'Só o denominador mudou; isso diminui a quantidade.' },
          { text: '4/5', why: 'Somar 2 em cima e embaixo não mantém a quantidade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O que vale é fazer a mesma conta de multiplicação em cima e embaixo. 1/4 vezes 3 em cima e embaixo dá 3/12: três pedaços pequenos ocupam o mesmo espaço que um pedaço grande.',
        check: {
          kind: 'choice',
          id: 'eq-r',
          prompt: 'Complete: 1/4 = ?/12',
          options: [
            { text: '3', why: 'Isso. O 4 foi multiplicado por 3; o 1 também.' },
            { text: '9', why: 'Isso seria somar 8 em cima e embaixo. Multiplica-se pelo mesmo número.' },
            { text: '1', why: 'Mudando só o denominador, a quantidade muda.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'simplificar',
      part: 'Mesma quantidade',
      title: 'Simplificar uma fração',
      goal: 'Simplificar dividindo numerador e denominador por um divisor comum.',
      explain:
        'Fazendo o caminho contrário, **dividimos** numerador e denominador pelo mesmo número. A fração fica com números menores e vale o mesmo. Isso é **simplificar**.\n\nO número escolhido precisa dividir os dois **exatamente**, sem resto. Um número assim é um **divisor comum** dos dois.\n\nEm 18/24, o 6 divide o 18 (dá 3) e o 24 (dá 4): **18/24 = 3/4**. Quando não há mais divisor comum além do 1, a fração está na forma mais simples.',
      example: '10/15: o 5 divide os dois. 10 ÷ 5 = 2; 15 ÷ 5 = 3. Resultado: **2/3**.',
      check: {
        kind: 'choice',
        id: 'sm-c',
        prompt: 'Qual é a forma mais simples de 12/16?',
        options: [
          { text: '3/4', why: 'Isso. Dividindo os dois por 4.' },
          { text: '6/8', why: 'Está certo, mas ainda dá para dividir os dois por 2.' },
          { text: '12/4', why: 'Só o denominador foi dividido; isso muda a quantidade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pode simplificar aos poucos: 12/16 dividido por 2 dá 6/8; de novo por 2 dá 3/4. Pare quando não houver número (além do 1) que divida os dois.',
        check: {
          kind: 'choice',
          id: 'sm-r',
          prompt: 'Simplifique 20/30.',
          options: [
            { text: '2/3', why: 'Isso. Dividindo os dois por 10.' },
            { text: '20/3', why: 'Só o denominador foi dividido.' },
            { text: '10/30', why: 'Só o numerador foi dividido; a quantidade mudou.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'comparar',
      part: 'Comparar',
      title: 'Qual fração é maior',
      goal: 'Comparar frações usando o mesmo denominador.',
      explain:
        'Com o **mesmo denominador**, os pedaços têm o mesmo tamanho; basta comparar os numeradores: **5/9 > 2/9**.\n\nCom denominadores **diferentes**, os pedaços têm tamanhos diferentes e não dá para comparar direto. Use frações equivalentes para deixar **os dois com o mesmo denominador**.\n\n2/3 ou 3/4? Os dois cabem em 12 partes: 2/3 = 8/12 e 3/4 = 9/12. Então **3/4 > 2/3**.',
      example: '1/2 ou 3/5? Em décimos: 1/2 = 5/10 e 3/5 = 6/10. Logo **3/5 > 1/2**.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Qual é maior: 3/4 ou 5/8?',
        options: [
          { text: '3/4', why: 'Isso. 3/4 = 6/8, e 6/8 > 5/8.' },
          { text: '5/8', why: 'O 5 é maior que o 3, mas os pedaços de 1/8 são menores. Em oitavos, 3/4 = 6/8.' },
          { text: 'São iguais', why: '3/4 = 6/8, que é diferente de 5/8.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Antes de comparar, ponha as duas frações em pedaços do mesmo tamanho. 1/3 e 2/5 em quinze avos: 5/15 e 6/15. Agora é só olhar os numeradores: 2/5 é maior.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Qual é maior: 1/3 ou 2/5?',
          options: [
            { text: '2/5', why: 'Isso. 2/5 = 6/15 e 1/3 = 5/15.' },
            { text: '1/3', why: 'Em quinze avos: 1/3 = 5/15 e 2/5 = 6/15.' },
            { text: 'São iguais', why: '5/15 é diferente de 6/15.' },
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
      prompt: 'Equivalente a 1/2 ou não?',
      categories: ['Equivalente a 1/2', 'Não equivalente'],
      items: [
        { text: '5/10', cat: 0, why: '1/2 com numerador e denominador vezes 5.' },
        { text: '2/3', cat: 1, why: '2/3 = 4/6, e 1/2 = 3/6.' },
        { text: '7/14', cat: 0, why: 'Vezes 7 em cima e embaixo.' },
        { text: '3/5', cat: 1, why: '3/5 = 6/10, e 1/2 = 5/10.' },
      ],
    },
    {
      kind: 'order',
      id: 'cs-2',
      prompt: 'Ponha da menor para a maior.',
      items: ['1/4', '1/2', '2/3', '5/6'],
      why: 'Em doze avos: 3/12, 6/12, 8/12 e 10/12.',
    },
    {
      kind: 'choice',
      id: 'cs-3',
      prompt: 'Um setor revisou 15 de 25 processos. Que fração, na forma mais simples, foi revisada?',
      options: [
        { text: '3/5', why: 'Isso. 15/25 dividido por 5.' },
        { text: '15/25', why: 'Está certa, mas ainda dá para simplificar por 5.' },
        { text: '2/5', why: '2/5 = 10/25: essa é a parte que falta revisar.' },
      ],
      answer: 0,
    },
  ],
  exam: [],
  summary: [
    'Fração: partes iguais de um todo. Denominador (embaixo): em quantas partes; numerador (em cima): quantas foram tomadas.',
    'Fração também é divisão: 3/4 = 3 ÷ 4. O denominador nunca é zero.',
    'Equivalentes: multiplique em cima e embaixo pelo mesmo número.',
    'Simplificar: divida em cima e embaixo por um divisor comum.',
    'Para comparar, deixe as frações com o mesmo denominador.',
  ],
  vocab: [
    { term: 'fração', match: 'fraç', step: 'partes' },
    { term: 'numerador', match: 'numerador', step: 'partes' },
    { term: 'denominador', match: 'denominador', step: 'partes' },
    { term: 'equivalente', match: 'equivalente', step: 'equivalentes' },
    { term: 'simplificar', match: 'simplific', step: 'simplificar' },
    { term: 'divisor comum', match: 'divisor comum', step: 'simplificar' },
  ],
};
