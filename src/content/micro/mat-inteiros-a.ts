// Série "Números inteiros e racionais" (cap.mat.01, trecho inteiros), aulas 1 a 3. Revisão didática
// de 26/10/2026: a seção de referência (01-inteiros-fracoes.md) misturava conjuntos, sinais, ordem
// das operações, potências, frações e dízimas; aqui cada aula ensina uma base pequena, do zero, e
// só cobra o que já foi explicado (vocabulário controlado em `vocab`, conferido pelo teste).
// Fatos conferidos com o capítulo. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'inteiros' } as const;

export const matNumerosReta: MicroLesson = {
  ...S,
  id: 'mat.inteiros.1',
  series: { id: 'mat.inteiros', order: 1 },
  title: 'Números na reta: zero, ordem e negativos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma conta bancária tinha R$ 0 e a pessoa pagou uma tarifa de R$ 15. Como você descreveria o saldo agora?',
    options: [
      { text: '15 reais abaixo de zero', why: 'Boa intuição. Esta aula mostra como os números representam valores abaixo de zero.' },
      { text: 'Zero, porque não dá para ter menos que nada', why: 'É uma ideia comum. Nesta aula você verá como representar o que fica abaixo de zero.' },
      { text: '15 reais', why: 'Quinze é o tamanho da tarifa, mas o saldo ficou do lado de baixo do zero. Esta aula mostra como escrever isso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'contar',
      part: 'Contar',
      title: 'Para que servem os números',
      goal: 'Reconhecer os números naturais como as quantidades usadas para contar.',
      explain:
        'Números respondem à pergunta **"quantos?"**: quantos processos estão na mesa, quantos servidores há no setor.\n\nPara contar usamos 0, 1, 2, 3, 4 e assim por diante, sem fim. Esses são os **números naturais**. O conjunto deles tem um símbolo próprio: **ℕ**.\n\nO **zero** também é natural: ele diz "nenhum". Uma gaveta vazia tem 0 pastas.\n\nRepare que entre os naturais não existe "meio" nem "um quarto": eles contam coisas inteiras.',
      example: 'Um setor recebeu 4 processos de manhã e nenhum à tarde. As duas quantidades são naturais: **4** e **0**.',
      check: {
        kind: 'choice',
        id: 'ct-c',
        prompt: 'Qual destas listas tem apenas números naturais?',
        options: [
          { text: '0, 7, 12, 300', why: 'Isso. Todos servem para contar coisas inteiras, inclusive o zero.' },
          { text: '1, 2, meio, 3', why: '"Meio" não conta uma coisa inteira, então não é natural.' },
          { text: '5, 8, um quarto', why: '"Um quarto" é parte de uma coisa; os naturais contam coisas inteiras.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nos números que você usaria para contar cadeiras numa sala: 0 (sala vazia), 1, 2, 3... Nunca "meia cadeira". Esses são os naturais.',
        check: {
          kind: 'choice',
          id: 'ct-r',
          prompt: 'Uma sala tem 9 cadeiras. Que tipo de número é o 9?',
          options: [
            { text: 'Natural', why: 'Isso. Ele conta cadeiras inteiras.' },
            { text: 'Não é número natural, porque é grande', why: 'O tamanho não importa: qualquer contagem inteira é natural.' },
            { text: 'Só seria natural se fosse 0', why: 'O zero é natural, mas não é o único.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'reta',
      part: 'A reta',
      title: 'A reta numérica: mais à direita, maior',
      goal: 'Localizar e comparar números naturais numa reta numérica.',
      explain:
        'Uma forma muito útil de ver números é colocá-los numa linha, com marcas igualmente espaçadas: a **reta numérica**.\n\nO 0 fica numa marca; o 1 na seguinte, à direita; o 2 na outra, e assim por diante.\n\nA regra que vamos usar o tempo todo: **quanto mais à direita, maior o número**. O 7 está à direita do 3, então 7 é maior que 3. Escreve-se **7 > 3** ("sete é maior que três") ou **3 < 7** ("três é menor que sete"). A ponta do sinal aponta para o menor.',
      example: '`0 —— 1 —— 2 —— 3 —— 4 —— 5 —— 6 —— 7`\n\nO 5 está duas marcas à direita do 3. Logo, 5 > 3.',
      check: {
        kind: 'choice',
        id: 'rt-c',
        prompt: 'Na reta numérica, qual número fica mais à direita: 12 ou 9?',
        options: [
          { text: '12', why: 'Isso. 12 é maior, então fica mais à direita.' },
          { text: '9', why: 'O 9 vem antes do 12 na contagem, então fica à esquerda.' },
          { text: 'Ficam no mesmo lugar', why: 'Cada número tem a sua marca; números diferentes ficam em lugares diferentes.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine uma fila de casas numeradas da esquerda para a direita: 0, 1, 2, 3... Andar para a direita é ir para números maiores. O sinal > abre a boca para o maior: 8 > 2.',
        check: {
          kind: 'choice',
          id: 'rt-r',
          prompt: 'Qual escrita está correta?',
          options: [
            { text: '6 > 4', why: 'Isso. Seis é maior que quatro; a abertura do sinal fica do lado do 6.' },
            { text: '6 < 4', why: 'Isso diria que 6 é menor que 4. A abertura do sinal fica do lado do maior.' },
            { text: '4 > 6', why: 'Quatro fica à esquerda de seis, então é menor.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'negativos',
      part: 'Negativos',
      title: 'Abaixo de zero: os números negativos',
      goal: 'Escrever valores abaixo de zero com o sinal de menos e reconhecer os inteiros.',
      explain:
        'Alguns valores ficam **abaixo de zero**: um saldo devedor, uma temperatura de inverno, um prejuízo.\n\nPara isso a reta continua **à esquerda do zero**: −1, −2, −3... Esses são os **números negativos**. O −5 se lê "menos cinco" e quer dizer "5 abaixo de zero".\n\nJuntando os naturais com os negativos temos os **números inteiros**, cujo símbolo é **ℤ**: ..., −3, −2, −1, 0, 1, 2, 3, ...\n\nO zero não é positivo nem negativo: é a referência.',
      example: '`−4 —— −3 —— −2 —— −1 —— 0 —— 1 —— 2 —— 3`\n\nUma conta com saldo de 20 reais abaixo de zero tem saldo **−20**.',
      check: {
        kind: 'choice',
        id: 'ng-c',
        prompt: 'A temperatura numa cidade ficou 6 graus abaixo de zero. Como escrever?',
        options: [
          { text: '−6', why: 'Isso. O sinal de menos indica "abaixo de zero".' },
          { text: '6', why: 'Assim seria 6 graus acima de zero.' },
          { text: '0', why: 'Zero seria exatamente na referência, sem estar abaixo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num elevador: o térreo é o 0, os andares de cima são 1, 2, 3, e as garagens no subsolo são −1, −2, −3. O sinal de menos diz "abaixo do térreo".',
        check: {
          kind: 'choice',
          id: 'ng-r',
          prompt: 'O carro está estacionado dois andares abaixo do térreo. Qual é o andar?',
          options: [
            { text: '−2', why: 'Isso. Dois abaixo da referência.' },
            { text: '2', why: 'O 2 seria o segundo andar acima do térreo.' },
            { text: '−1', why: 'O −1 é um andar abaixo; o carro está dois abaixo.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'comparar',
      part: 'Negativos',
      title: 'Comparar números negativos',
      goal: 'Ordenar números inteiros usando a posição na reta, inclusive os negativos.',
      explain:
        'A regra da reta continua valendo: **mais à direita, maior**.\n\nComo os negativos ficam à esquerda do zero, **todo negativo é menor que zero** e menor que qualquer positivo.\n\nEntre dois negativos, o maior é o que está **mais perto do zero**: −2 está à direita de −8, então **−2 > −8**.\n\nO erro comum é olhar só o 8 e o 2 e achar que −8 é maior. Mas estar 8 abaixo de zero é estar mais embaixo do que estar 2 abaixo: uma dívida de 8 é pior que uma de 2.',
      example: 'Do menor para o maior: **−8, −2, 0, 5**.',
      check: {
        kind: 'order',
        id: 'cp-c',
        prompt: 'Ponha do menor para o maior.',
        items: ['−9', '−3', '0', '4'],
        why: 'Na reta, da esquerda para a direita: −9 (mais longe do zero, para baixo), −3, 0 e 4.',
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Use dinheiro: dever 9 reais (−9) é estar pior que dever 3 reais (−3). Quem está pior tem o número menor. Por isso −9 < −3.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Qual é maior: −5 ou −1?',
          options: [
            { text: '−1', why: 'Isso. −1 está mais perto do zero, à direita de −5.' },
            { text: '−5', why: 'Estar 5 abaixo de zero é estar mais embaixo do que estar 1 abaixo.' },
            { text: 'São iguais', why: 'Ficam em marcas diferentes da reta.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'modulo',
      part: 'Distância ao zero',
      title: 'Oposto e módulo',
      goal: 'Encontrar o oposto de um número e o módulo (a distância até o zero).',
      explain:
        'O 5 e o −5 ficam à **mesma distância do zero**, um de cada lado. Números assim são **opostos**: o oposto de 5 é −5, e o oposto de −5 é 5.\n\nA distância de um número até o zero, sem importar o lado, chama-se **módulo**. Escreve-se entre barras: |−5| = 5 e |5| = 5.\n\nO módulo nunca é negativo, porque distância não é negativa. Ele vai ser útil na próxima aula, para somar números com sinais diferentes.',
      example: '|−12| = 12, porque o −12 está a 12 marcas do zero. O oposto de −12 é 12.',
      check: {
        kind: 'choice',
        id: 'md-c',
        prompt: 'Quanto vale |−7|?',
        options: [
          { text: '7', why: 'Isso. O −7 está a 7 marcas do zero.' },
          { text: '−7', why: 'O módulo é uma distância, e distância não é negativa.' },
          { text: '0', why: 'Zero seria a distância do próprio zero; o −7 está a 7 marcas dele.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine que você está no 0 e anda até o número. Quantos passos deu? Esse é o módulo. Até o −3 são 3 passos; até o 3, também 3 passos.',
        check: {
          kind: 'choice',
          id: 'md-r',
          prompt: 'Qual é o oposto de −10?',
          options: [
            { text: '10', why: 'Isso. Mesma distância do zero, do outro lado.' },
            { text: '−10', why: 'Esse é o próprio número; o oposto fica do outro lado do zero.' },
            { text: '0', why: 'O zero é a referência, não o oposto de −10.' },
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
      categories: ['Natural', 'Inteiro negativo'],
      items: [
        { text: '0', cat: 0, why: 'O zero é natural.' },
        { text: '−4', cat: 1, why: 'Abaixo de zero.' },
        { text: '25', cat: 0, why: 'Conta coisas inteiras.' },
        { text: '−1', cat: 1, why: 'Um abaixo de zero.' },
      ],
    },
    {
      kind: 'order',
      id: 'cs-2',
      prompt: 'Ponha do menor para o maior.',
      items: ['−12', '−7', '−1', '3'],
      why: 'Mais longe do zero para baixo é menor: −12, depois −7, −1 e, à direita do zero, 3.',
    },
    {
      kind: 'choice',
      id: 'cs-3',
      prompt: 'Qual afirmação está correta?',
      options: [
        { text: '|−9| = |9|', why: 'Isso. Os dois estão a 9 marcas do zero.' },
        { text: '−9 > 9', why: 'Negativos ficam à esquerda dos positivos, então são menores.' },
        { text: 'O oposto de 9 é 9', why: 'O oposto fica do outro lado do zero: é −9.' },
      ],
      answer: 0,
    },
  ],
  exam: [],
  summary: [
    'Naturais (ℕ) contam: 0, 1, 2, 3...',
    'Na reta numérica, quanto mais à direita, maior.',
    'Negativos ficam à esquerda do zero; com os naturais, formam os inteiros (ℤ).',
    'Entre negativos, o maior é o mais perto do zero: −2 > −8.',
    'Opostos ficam à mesma distância do zero; o módulo é essa distância: |−5| = 5.',
  ],
  vocab: [
    { term: 'natural', match: 'natura(l|is)', step: 'contar' },
    { term: 'reta numérica', match: 'reta num', step: 'reta' },
    { term: 'negativo', match: 'negativ', step: 'negativos' },
    { term: 'inteiro', match: 'inteiros?\\b', step: 'negativos' },
    { term: 'oposto', match: 'oposto', step: 'modulo' },
    { term: 'módulo', match: 'módulo|\\|−?\\d+\\|', step: 'modulo' },
  ],
};

export const matSomarSubtrair: MicroLesson = {
  ...S,
  id: 'mat.inteiros.2',
  series: { id: 'mat.inteiros', order: 2 },
  title: 'Somar e subtrair inteiros',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você deve R$ 10 e recebe R$ 4. Como fica o seu saldo?',
    options: [
      { text: 'Ainda deve R$ 6', why: 'Boa intuição. Nesta aula você vai ver por que isso é −10 + 4 = −6.' },
      { text: 'Tem R$ 14', why: 'Receber dinheiro diminui a dívida, não soma com ela. Esta aula mostra como pensar.' },
      { text: 'Deve R$ 14', why: 'Receber dinheiro não aumenta a dívida. Esta aula mostra o caminho na reta.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'andar',
      part: 'Somar',
      title: 'Somar é andar na reta',
      goal: 'Somar um número positivo ou negativo andando na reta numérica.',
      explain:
        'Na reta numérica, **somar é andar** a partir do primeiro número.\n\nSomar um **positivo** é andar para a **direita**: 3 + 4 começa no 3 e anda 4 marcas para a direita, chegando ao **7**.\n\nSomar um **negativo** é andar para a **esquerda**: 3 + (−5) começa no 3 e anda 5 marcas para a esquerda, chegando ao **−2**.\n\nO parêntese em (−5) só separa o sinal de "mais" da operação do sinal de menos do número, para não ficarem dois sinais colados.',
      example: '−1 + 4: começo no −1 e ando 4 para a direita: 0, 1, 2, **3**.',
      check: {
        kind: 'choice',
        id: 'an-c',
        prompt: 'Quanto é 2 + (−6)?',
        options: [
          { text: '−4', why: 'Isso. Do 2, seis marcas para a esquerda: 1, 0, −1, −2, −3, −4.' },
          { text: '8', why: 'Seria andar para a direita. Somar negativo é andar para a esquerda.' },
          { text: '4', why: 'Do 2, andar 6 para a esquerda passa do zero e termina no −4.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em saldo: começo com 2 reais e pago 6. Os 2 acabam e ainda faltam 4. Fico com −4. Pagar é o mesmo que somar um negativo.',
        check: {
          kind: 'choice',
          id: 'an-r',
          prompt: 'Quanto é 5 + (−3)?',
          options: [
            { text: '2', why: 'Isso. Do 5, três para a esquerda: 4, 3, 2.' },
            { text: '8', why: 'Somar negativo anda para a esquerda, não para a direita.' },
            { text: '−8', why: 'Do 5 andando só 3 para a esquerda ainda não se passa do zero.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'regra-soma',
      part: 'Somar',
      title: 'Atalho: sinais iguais ou diferentes',
      goal: 'Somar inteiros sem desenhar a reta, usando os módulos.',
      explain:
        'Andar na reta sempre funciona, mas com números grandes cansa. O atalho sai do mesmo raciocínio:\n\n**Sinais iguais**: os dois passos vão para o mesmo lado. Some os módulos e mantenha o sinal. (−3) + (−4) = **−7**.\n\n**Sinais diferentes**: um passo desfaz parte do outro. Subtraia o módulo menor do maior e use o sinal de quem tem o **maior módulo**. (−9) + 4: módulos 9 e 4; 9 − 4 = 5; o maior é do −9, então o resultado é **−5**.',
      example: '15 + (−20): módulos 15 e 20. 20 − 15 = 5. O maior módulo é do −20, então o resultado é **−5**.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'Quanto é (−12) + 7?',
        options: [
          { text: '−5', why: 'Isso. 12 − 7 = 5, com o sinal do −12, que tem o maior módulo.' },
          { text: '5', why: 'A conta dos módulos está certa, mas o sinal vem de quem tem o maior módulo: o −12.' },
          { text: '−19', why: 'Somar os módulos é para sinais iguais. Aqui os sinais são diferentes.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em força: um time puxa 12 para a esquerda, outro puxa 7 para a direita. Vence o mais forte (esquerda), por 12 − 7 = 5. Resultado: −5.',
        check: {
          kind: 'choice',
          id: 'rs-r',
          prompt: 'Quanto é (−6) + (−8)?',
          options: [
            { text: '−14', why: 'Isso. Sinais iguais: soma os módulos e mantém o sinal.' },
            { text: '−2', why: 'Subtrair módulos é para sinais diferentes. Aqui os dois são negativos.' },
            { text: '14', why: 'Os dois passos vão para a esquerda, então o resultado é negativo.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'subtrair',
      part: 'Subtrair',
      title: 'Subtrair é somar o oposto',
      goal: 'Transformar uma subtração numa soma com o oposto.',
      explain:
        'Subtrair é **andar no sentido contrário** ao da soma. 5 − 8 começa no 5 e anda 8 marcas para a **esquerda**, chegando ao **−3**.\n\nAndar 8 para a esquerda é exatamente o mesmo que somar −8. Por isso vale a ideia mais importante desta aula:\n\n**Subtrair um número é somar o seu oposto.** 5 − 8 = 5 + (−8) = −3.\n\nCom isso, toda subtração vira uma soma, e você já sabe somar.',
      example: '4 − 9 = 4 + (−9). Sinais diferentes: 9 − 4 = 5, sinal do −9. Resultado: **−5**.',
      check: {
        kind: 'choice',
        id: 'sb-c',
        prompt: 'Quanto é 3 − 10?',
        options: [
          { text: '−7', why: 'Isso. 3 + (−10): 10 − 3 = 7, com o sinal do −10.' },
          { text: '7', why: 'O 10 tem o maior módulo, e ele entrou como −10. O resultado é negativo.' },
          { text: '13', why: 'Subtrair 10 anda para a esquerda, não para a direita.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Saldo de novo: tenho 3 reais e gasto 10. Os 3 acabam e faltam 7: fico com −7. Gastar 10 é o mesmo que somar −10 ao saldo.',
        check: {
          kind: 'choice',
          id: 'sb-r',
          prompt: 'Qual soma é igual a 6 − 11?',
          options: [
            { text: '6 + (−11)', why: 'Isso. Subtrair 11 é somar o oposto de 11.' },
            { text: '6 + 11', why: 'Assim andaria para a direita; subtrair anda para a esquerda.' },
            { text: '(−6) + 11', why: 'O primeiro número não muda; só o 11 vira o seu oposto.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'menos-menos',
      part: 'Subtrair',
      title: 'Tirar um negativo e o menos antes de parênteses',
      goal: 'Resolver subtrações de números negativos e o sinal de menos antes de parênteses.',
      explain:
        'Pela regra anterior, subtrair −2 é somar o oposto de −2, que é 2: **6 − (−2) = 6 + 2 = 8**.\n\nFaz sentido: se alguém **cancela uma dívida** de 2 reais que você tinha, o seu saldo **sobe** 2.\n\nO mesmo vale para o menos sozinho na frente de um parêntese: ele pede o oposto do que está dentro. **−(−3) = 3** e **−(4) = −4**.',
      example: '−5 − (−9) = −5 + 9. Sinais diferentes: 9 − 5 = 4, sinal do 9. Resultado: **4**.',
      check: {
        kind: 'choice',
        id: 'mm-c',
        prompt: 'Quanto é 7 − (−5)?',
        options: [
          { text: '12', why: 'Isso. Tirar −5 é somar 5: 7 + 5 = 12.' },
          { text: '2', why: 'Isso seria 7 − 5. Aqui se tira um negativo, o que soma.' },
          { text: '−12', why: 'Tirar uma dívida aumenta o saldo; o resultado é positivo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia "menos menos" como "tirar uma dívida". Se o seu saldo é 1 e somem com uma dívida de 4, você fica com 1 + 4 = 5. Por isso 1 − (−4) = 5.',
        check: {
          kind: 'choice',
          id: 'mm-r',
          prompt: 'Quanto vale −(−8)?',
          options: [
            { text: '8', why: 'Isso. O menos pede o oposto de −8, que é 8.' },
            { text: '−8', why: 'O menos de fora pede o oposto do que está dentro: o oposto de −8 é 8.' },
            { text: '0', why: 'Não há nada sendo cancelado com outro número; só se pega o oposto.' },
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
      prompt: 'Um termômetro marcava −3 graus e a temperatura subiu 8 graus. Quanto marca agora?',
      options: [
        { text: '5', why: 'Isso. −3 + 8: sinais diferentes, 8 − 3 = 5, sinal do 8.' },
        { text: '−11', why: 'Subir é somar um positivo, andando para a direita.' },
        { text: '11', why: 'Os módulos são subtraídos, porque os sinais são diferentes.' },
      ],
      answer: 0,
    },
    {
      kind: 'fix',
      id: 'cs-2',
      prompt: 'Uma colega resolveu 4 − (−6) assim. Em que linha está o erro?',
      lines: ['4 − (−6)', '= 4 + (−6)', '= −2'],
      bug: 1,
      why: 'Subtrair −6 é somar o oposto de −6, que é 6, não −6.',
      fixed: '= 4 + 6 = 10',
    },
    {
      kind: 'sort',
      id: 'cs-3',
      prompt: 'O resultado é positivo ou negativo?',
      categories: ['Positivo', 'Negativo'],
      items: [
        { text: '(−2) + (−3)', cat: 1, why: 'Dois passos para a esquerda: −5.' },
        { text: '−4 + 10', cat: 0, why: 'O 10 tem o maior módulo: 6.' },
        { text: '2 − 9', cat: 1, why: '2 + (−9) = −7.' },
        { text: '1 − (−1)', cat: 0, why: '1 + 1 = 2.' },
      ],
    },
  ],
  exam: [],
  summary: [
    'Somar positivo anda para a direita; somar negativo, para a esquerda.',
    'Sinais iguais: soma os módulos e mantém o sinal.',
    'Sinais diferentes: subtrai os módulos e usa o sinal do maior módulo.',
    'Subtrair é somar o oposto: 5 − 8 = 5 + (−8).',
    'Tirar um negativo soma: 6 − (−2) = 8; −(−3) = 3.',
  ],
};

export const matMultiplicarDividir: MicroLesson = {
  ...S,
  id: 'mat.inteiros.3',
  series: { id: 'mat.inteiros', order: 3 },
  title: 'Multiplicar e dividir inteiros',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma pessoa paga uma parcela de R$ 50 por mês, durante 3 meses. Como o saldo dela muda?',
    options: [
      { text: 'Diminui R$ 150', why: 'Boa intuição. Isso é 3 × (−50) = −150, o tema desta aula.' },
      { text: 'Aumenta R$ 150', why: 'Pagar tira dinheiro do saldo. Esta aula mostra como o sinal entra na multiplicação.' },
      { text: 'Diminui R$ 50', why: 'São três parcelas, não uma. Esta aula explica a multiplicação como repetição.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'grupos',
      part: 'Multiplicar',
      title: 'Multiplicar é juntar grupos iguais',
      goal: 'Entender a multiplicação como soma repetida de grupos iguais.',
      explain:
        'Se há **3 caixas com 4 pastas** cada, o total é 4 + 4 + 4 = 12. Somar o mesmo número várias vezes aparece tanto que ganhou uma operação própria: a **multiplicação**.\n\n**3 × 4** lê-se "três vezes quatro" e quer dizer "três grupos de 4". O resultado, 12, chama-se **produto**.\n\nA ordem não muda o produto: 3 × 4 = 4 × 3 = 12 (quatro grupos de 3 também dão 12).',
      example: '5 × 2 = 2 + 2 + 2 + 2 + 2 = **10**.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'Qual soma é igual a 4 × 6?',
        options: [
          { text: '6 + 6 + 6 + 6', why: 'Isso. Quatro grupos de 6.' },
          { text: '4 + 6', why: 'Isso junta só um 4 e um 6; a multiplicação repete grupos.' },
          { text: '6 + 6 + 6 + 6 + 6 + 6', why: 'Isso são seis grupos de 6, que é 6 × 6.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine prateleiras: 2 prateleiras com 7 livros cada. Você conta 7 e depois mais 7: 14. Isso é 2 × 7.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Quantos livros há em 3 prateleiras com 5 livros cada?',
          options: [
            { text: '15', why: 'Isso. 5 + 5 + 5 = 15 = 3 × 5.' },
            { text: '8', why: 'Isso seria 3 + 5. São três grupos de 5.' },
            { text: '35', why: 'Confira somando: 5 + 5 + 5.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'vezes-negativo',
      part: 'Multiplicar',
      title: 'Grupos de números negativos',
      goal: 'Multiplicar um positivo por um negativo.',
      explain:
        'A mesma ideia vale para grupos negativos. **3 × (−50)** é "três grupos de −50": três parcelas de 50 reais a pagar.\n\n(−50) + (−50) + (−50) = **−150**. Pela soma que você já conhece, sinais iguais: soma os módulos e mantém o negativo.\n\nConclusão: **positivo vezes negativo dá negativo**. Como a ordem não muda o produto, (−50) × 3 também é −150.',
      example: '4 × (−2) = (−2) + (−2) + (−2) + (−2) = **−8**.',
      check: {
        kind: 'choice',
        id: 'vn-c',
        prompt: 'Quanto é 5 × (−3)?',
        options: [
          { text: '−15', why: 'Isso. Cinco grupos de −3.' },
          { text: '15', why: 'Somar cinco vezes o −3 dá um resultado negativo.' },
          { text: '−8', why: 'Isso seria 5 + (−3) com outro sinal; aqui são cinco grupos de −3.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em perdas: perder 3 reais por dia, durante 5 dias, é perder 15 reais. Perder é negativo, então o total é −15.',
        check: {
          kind: 'choice',
          id: 'vn-r',
          prompt: 'Quanto é (−7) × 2?',
          options: [
            { text: '−14', why: 'Isso. Dois grupos de −7.' },
            { text: '14', why: 'Juntar dois −7 dá um negativo: −14.' },
            { text: '−5', why: 'Isso seria −7 + 2. Aqui é multiplicação.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'sinais',
      part: 'Multiplicar',
      title: 'Negativo vezes negativo: por que dá positivo',
      goal: 'Entender e aplicar a regra de sinais da multiplicação.',
      explain:
        'Não dá para ter "−3 grupos". Mas dá para ver o que **precisa** acontecer seguindo o padrão:\n\n(−3) × 2 = −6\n(−3) × 1 = −3\n(−3) × 0 = 0\n\nCada vez que o segundo número diminui 1, o resultado **sobe 3**. Seguindo o mesmo passo: (−3) × (−1) = **3** e (−3) × (−2) = **6**.\n\nResumo, chamado **regra de sinais**: **sinais iguais dão positivo; sinais diferentes dão negativo**.',
      example: '(−4) × (−5): sinais iguais, então positivo. 4 × 5 = 20. Resultado: **20**.',
      check: {
        kind: 'choice',
        id: 'sn-c',
        prompt: 'Quanto é (−6) × (−2)?',
        options: [
          { text: '12', why: 'Isso. Sinais iguais dão positivo.' },
          { text: '−12', why: 'Pela regra de sinais, dois negativos multiplicados dão positivo.' },
          { text: '−8', why: 'Isso seria uma soma. Aqui é multiplicação: 6 × 2 com sinal positivo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Outro jeito de ver: o sinal de menos quer dizer "o oposto". (−6) × (−2) é o oposto de 6 × (−2) = −12. O oposto de −12 é 12.',
        check: {
          kind: 'choice',
          id: 'sn-r',
          prompt: 'Qual resultado é positivo?',
          options: [
            { text: '(−9) × (−1)', why: 'Isso. Sinais iguais: 9.' },
            { text: '9 × (−1)', why: 'Sinais diferentes dão negativo: −9.' },
            { text: '(−9) × 1', why: 'Sinais diferentes dão negativo: −9.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dividir',
      part: 'Dividir',
      title: 'Dividir é desfazer a multiplicação',
      goal: 'Dividir inteiros usando a relação com a multiplicação.',
      explain:
        'Dividir é **repartir em partes iguais**: 12 pastas para 3 pessoas dá **4** para cada. Escreve-se **12 ÷ 3 = 4**.\n\nA divisão **desfaz** a multiplicação: 12 ÷ 3 = 4 porque **3 × 4 = 12**. Para conferir uma divisão, multiplique de volta.\n\nPor isso a divisão segue a **mesma regra de sinais**: (−12) ÷ 3 = −4, porque 3 × (−4) = −12. E (−12) ÷ (−3) = 4, porque (−3) × 4 = −12.',
      example: '(−20) ÷ 4: sinais diferentes, então negativo. 20 ÷ 4 = 5. Resultado: **−5**. Conferência: 4 × (−5) = −20.',
      check: {
        kind: 'choice',
        id: 'dv-c',
        prompt: 'Quanto é (−18) ÷ (−6)?',
        options: [
          { text: '3', why: 'Isso. Sinais iguais: positivo. Conferência: (−6) × 3 = −18.' },
          { text: '−3', why: 'Sinais iguais dão positivo também na divisão.' },
          { text: '12', why: 'Isso seria uma subtração. Dividir é ver quantas vezes o 6 cabe no 18.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: "que número, multiplicado por −6, dá −18?". Teste 3: (−6) × 3 = −18. Então a resposta é 3.',
        check: {
          kind: 'choice',
          id: 'dv-r',
          prompt: 'Quanto é 15 ÷ (−5)?',
          options: [
            { text: '−3', why: 'Isso. (−5) × (−3) = 15.' },
            { text: '3', why: 'Confira: (−5) × 3 = −15, não 15. Sinais diferentes dão negativo.' },
            { text: '10', why: 'Isso seria 15 − 5. Aqui é divisão.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'zero',
      part: 'Dividir',
      title: 'Zero na divisão',
      goal: 'Saber quando a divisão envolvendo zero existe.',
      explain:
        'Repartir **nada** entre 5 pessoas dá nada para cada: **0 ÷ 5 = 0**. Confere: 5 × 0 = 0.\n\nAgora **5 ÷ 0**: seria um número que, multiplicado por 0, desse 5. Mas **qualquer número vezes 0 dá 0**, nunca 5. Esse número não existe.\n\nPor isso **não se divide por zero**: a divisão por zero não tem resultado. Em prova, uma alternativa que divide por zero está errada.',
      example: '0 ÷ (−7) = 0, porque (−7) × 0 = 0. Já (−7) ÷ 0 **não existe**.',
      check: {
        kind: 'choice',
        id: 'zr-c',
        prompt: 'Qual destas divisões não tem resultado?',
        options: [
          { text: '8 ÷ 0', why: 'Isso. Nenhum número vezes 0 dá 8.' },
          { text: '0 ÷ 8', why: 'Essa existe e vale 0, porque 8 × 0 = 0.' },
          { text: '8 ÷ 8', why: 'Essa vale 1, porque 8 × 1 = 8.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Confira sempre multiplicando de volta. Para 6 ÷ 0, procure um número que vezes 0 dê 6. Qualquer número vezes 0 dá 0. Não há candidato: a divisão não existe.',
        check: {
          kind: 'choice',
          id: 'zr-r',
          prompt: 'Quanto vale 0 ÷ 4?',
          options: [
            { text: '0', why: 'Isso. Repartir nada dá nada; 4 × 0 = 0.' },
            { text: 'Não existe', why: 'O problema é dividir POR zero. Dividir o zero por 4 dá 0.' },
            { text: '4', why: 'Confira: 4 × 4 = 16, não 0.' },
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
        { text: '(−3) × (−7)', cat: 0, why: 'Sinais iguais: 21.' },
        { text: '(−24) ÷ 6', cat: 1, why: 'Sinais diferentes: −4.' },
        { text: '8 × (−2)', cat: 1, why: 'Sinais diferentes: −16.' },
        { text: '(−30) ÷ (−5)', cat: 0, why: 'Sinais iguais: 6.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cs-2',
      prompt: 'Uma dívida de R$ 120 será paga em 4 parcelas iguais. Qual o valor de cada parcela, como número com sinal?',
      options: [
        { text: '−30', why: 'Isso. (−120) ÷ 4 = −30: cada parcela tira 30 do saldo.' },
        { text: '30', why: 'O valor é 30, mas a dívida é negativa, e dividir negativo por positivo dá negativo.' },
        { text: '−480', why: 'Isso seria multiplicar. A dívida é repartida em 4.' },
      ],
      answer: 0,
    },
    {
      kind: 'fix',
      id: 'cs-3',
      prompt: 'Em que linha está o erro?',
      lines: ['(−2) × (−3) × (−1)', '= 6 × (−1)', '= 6'],
      bug: 2,
      why: '6 × (−1) tem sinais diferentes, então dá −6.',
      fixed: '= −6',
    },
  ],
  exam: [],
  summary: [
    'Multiplicar é juntar grupos iguais: 3 × 4 = 4 + 4 + 4.',
    'Regra de sinais: sinais iguais dão positivo; diferentes, negativo.',
    'Dividir desfaz a multiplicação; confira multiplicando de volta.',
    'A divisão segue a mesma regra de sinais.',
    '0 dividido por qualquer número (não nulo) é 0; dividir por zero não existe.',
  ],
  vocab: [
    { term: 'produto', match: 'produto', step: 'grupos' },
    { term: 'regra de sinais', match: 'regra de sinais', step: 'sinais' },
  ],
};
