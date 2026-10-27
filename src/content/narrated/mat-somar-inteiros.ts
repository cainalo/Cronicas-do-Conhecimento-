// Roteiro editorial ampliado: soma e subtração de inteiros com progressão visual passo a passo.
// As falas descrevem a ação matemática; os estados da reta correspondem aos passos narrados.
// Revisão editorial humana final e teste de pronúncia continuam pendentes.
import type { NarratedLesson } from './types';

export const narradaSomarInteiros: NarratedLesson = {
  id: 'narrada.mat.somar-inteiros',
  title: 'Somar e subtrair inteiros na reta',
  chapterId: 'cap.mat.01',
  sectionId: 'inteiros',
  lessonId: 'mat.inteiros.2',
  minutes: 8,
  review: 'nao-revisado',
  scenes: [
    {
      id: 'abertura',
      heading: 'Um saldo pode ficar abaixo de zero',
      visual: { kind: 'title', title: 'Somar e subtrair inteiros', subtitle: 'entenda os sinais caminhando sobre a reta', art: 'trilha' },
      beats: [
        { say: 'Imagine que sua conta tem saldo zero. Você recebe dez reais e depois gasta quinze. O saldo final não é quinze positivo: faltam cinco reais. Para representar situações assim, a matemática usa números negativos.' },
        { say: 'Nesta aula, vamos somar e subtrair números inteiros usando uma reta numérica. Primeiro vamos acompanhar os movimentos; depois vamos descobrir regras que permitem calcular sem desenhar cada passo.' },
      ],
    },
    {
      id: 'reta',
      heading: 'A reta numérica é um mapa dos números',
      visual: {
        kind: 'numberline',
        from: -6,
        to: 6,
        states: [
          { points: [0] },
          { points: [0, 3] },
          { points: [0, 3, -2] },
        ],
      },
      beats: [
        { say: 'Pense numa linha com marcas igualmente espaçadas. O zero é a referência. À direita ficam os números positivos, como um, dois e três; à esquerda ficam os negativos, como menos um, menos dois e menos três.', show: 0 },
        { say: 'Na reta, caminhar para a direita significa ir para números maiores. Por isso, três é maior que zero e também maior que menos dois. Não compare apenas os algarismos: observe sempre a posição em relação ao zero.', show: 1 },
        { say: 'O sinal de menos indica que o número está abaixo da referência, não que ele deixou de ser um número. Menos dois fica à esquerda de zero; três fica à direita. Portanto, três é maior que menos dois.', show: 2 },
      ],
    },
    {
      id: 'somar-positivo',
      heading: 'Somar um positivo: mover-se para a direita',
      visual: {
        kind: 'numberline',
        from: -6,
        to: 6,
        states: [
          { points: [-1] },
          { points: [-1, 0], jumps: [{ from: -1, to: 0 }] },
          { points: [-1, 0, 1], jumps: [{ from: 0, to: 1 }] },
          { points: [-1, 0, 1, 2], jumps: [{ from: 1, to: 2 }] },
          { points: [-1, 0, 1, 2, 3], jumps: [{ from: 2, to: 3 }] },
        ],
      },
      beats: [
        { say: 'Vamos calcular menos um mais quatro. Comece no menos um, porque esse é o primeiro número da conta. O ponto inicial fica à esquerda do zero.', show: 0 },
        { say: 'Somar um significa dar um passo para a direita. Saindo de menos um, o primeiro passo chega ao zero. Não pule a marca do zero: ela faz parte da contagem.', show: 1 },
        { say: 'O segundo passo para a direita chega ao mais um. Repare que a cada passo o valor aumenta uma unidade. O sinal muda quando atravessamos o zero, não porque a regra mudou, mas porque passamos da região negativa para a positiva.', show: 2 },
        { say: 'O terceiro passo chega ao dois. Ainda estamos somando uma unidade, então continuamos caminhando para a direita na reta.', show: 3 },
        { say: 'O quarto passo chega ao três. Portanto, menos um mais quatro é igual a três. A reta deixou visível por que o resultado ficou positivo: demos quatro passos para a direita e ultrapassamos o zero.', show: 4 },
      ],
    },
    {
      id: 'somar-negativo',
      heading: 'Somar um negativo: mover-se para a esquerda',
      visual: {
        kind: 'numberline',
        from: -6,
        to: 6,
        states: [
          { points: [3] },
          { points: [3, 2], jumps: [{ from: 3, to: 2 }] },
          { points: [3, 2, 1], jumps: [{ from: 2, to: 1 }] },
          { points: [3, 2, 1, 0], jumps: [{ from: 1, to: 0 }] },
          { points: [3, 2, 1, 0, -1], jumps: [{ from: 0, to: -1 }] },
          { points: [3, 2, 1, 0, -1, -2], jumps: [{ from: -1, to: -2 }] },
        ],
      },
      beats: [
        { say: 'Agora calcule três mais menos cinco. Comece no três. O que vem depois é somar um número negativo, ou seja, somar uma quantidade abaixo de zero.', show: 0 },
        { say: 'Cada unidade negativa nos faz caminhar uma marca para a esquerda. O primeiro passo sai do três e chega ao dois.', show: 1 },
        { say: 'O segundo passo para a esquerda chega ao um. Continuamos usando a mesma regra: um passo, uma marca.', show: 2 },
        { say: 'O terceiro passo chega ao zero. Cruzar o zero não encerra a conta; ainda temos dois passos para cumprir.', show: 3 },
        { say: 'O quarto passo chega a menos um. Agora estamos do lado negativo da reta.', show: 4 },
        { say: 'O quinto passo chega a menos dois. Então três mais menos cinco é igual a menos dois. Somar um negativo é andar para a esquerda; essa ideia continua funcionando mesmo quando passamos pelo zero.', show: 5 },
      ],
    },
    {
      id: 'atalho',
      heading: 'Como calcular sem desenhar a reta',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Sinais iguais', text: 'Some os módulos e mantenha o sinal comum.' },
          { title: 'Sinais diferentes', text: 'Subtraia os módulos e use o sinal do maior módulo.' },
          { title: 'Módulos iguais, sinais opostos', text: 'Os valores se anulam: o resultado é zero.' },
        ],
      },
      beats: [
        { say: 'A reta explica a regra, mas para números grandes seria demorado desenhar muitos passos. Há um atalho. Primeiro, lembre que módulo é a distância entre o número e o zero: o módulo de menos sete é sete.', show: 1 },
        { say: 'Quando os sinais são iguais, os movimentos seguem na mesma direção. Some os módulos e mantenha o sinal. Por exemplo, mais seis mais mais quatro dá dez; menos três mais menos quatro dá menos sete.', show: 1 },
        { say: 'Quando os sinais são diferentes, parte de um movimento desfaz parte do outro. Subtraia o menor módulo do maior e mantenha o sinal do número que tem o maior módulo. Em menos nove mais quatro, nove menos quatro dá cinco, e o sinal é negativo: o resultado é menos cinco.', show: 2 },
        { say: 'Se os módulos forem iguais e os sinais opostos, os movimentos se cancelam por completo. Menos sete mais sete é zero. Não sobra direção para um lado ou para o outro.', show: 3 },
      ],
    },
    {
      id: 'subtrair',
      heading: 'Subtrair é somar o oposto',
      visual: {
        kind: 'equation',
        lines: ['5 − 8', '= 5 + (−8)', '= −3'],
        note: 'Troque a subtração pela soma do oposto do segundo número.',
      },
      beats: [
        { say: 'Vamos calcular cinco menos oito. Na reta, começaríamos no cinco e caminharíamos oito unidades para a esquerda. Como oito passos são mais do que cinco, terminaríamos três unidades depois do zero, no menos três.', show: 1 },
        { say: 'Existe uma regra geral que resume esse movimento: subtrair um número equivale a somar o oposto dele. O oposto de mais oito é menos oito; por isso, cinco menos oito pode ser reescrito como cinco mais menos oito.', show: 2 },
        { say: 'Agora aplicamos a regra de sinais. Cinco e menos oito têm sinais diferentes: oito menos cinco dá três, e o sinal fica negativo porque o módulo oito é maior. O resultado é menos três.', show: 3 },
      ],
    },
    {
      id: 'tirar-negativo',
      heading: 'Por que subtrair um negativo dá uma soma?',
      visual: {
        kind: 'equation',
        lines: ['6 − (−2)', '= 6 + 2', '= 8'],
        note: 'Subtrair −2 é somar o oposto de −2, que é +2.',
      },
      beats: [
        { say: 'Agora observe seis menos menos dois. É comum olhar os dois sinais de menos e tentar decorar que eles viram mais, mas é mais seguro entender a operação: estamos subtraindo o número negativo menos dois.', show: 1 },
        { say: 'Pela regra, subtrair um número é somar o oposto dele. O oposto de menos dois é mais dois. Então seis menos menos dois vira seis mais dois.', show: 2 },
        { say: 'Seis mais dois é oito. Pense em um saldo de seis reais que está sendo reduzido por uma dívida de dois reais: ao cancelar essa dívida, o saldo fica dois reais maior. A analogia ajuda, mas a regra matemática vale independentemente de dinheiro.', show: 3 },
      ],
    },
    {
      id: 'erros-comuns',
      heading: 'Não decore apenas a aparência dos sinais',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Identifique a operação', text: '−4 + 9 é uma soma de números com sinais diferentes.' },
          { title: 'Compare os módulos', text: '9 − 4 = 5; o maior módulo é 9.' },
          { title: 'Escolha o sinal', text: 'Como 9 é positivo, o resultado é +5.' },
        ],
      },
      beats: [
        { say: 'O primeiro erro comum é somar os módulos em qualquer situação. Isso só funciona diretamente quando os sinais são iguais. Com sinais diferentes, os módulos são subtraídos.', show: 1 },
        { say: 'Veja menos quatro mais nove. Os módulos são quatro e nove. A diferença é nove menos quatro, que vale cinco. Esse é o tamanho do resultado.', show: 2 },
        { say: 'O sinal vem do número que tem o maior módulo. Como nove é positivo e tem módulo maior, a resposta é mais cinco. O cálculo completo fica: menos quatro mais nove é igual a cinco.', show: 3 },
      ],
    },
    {
      id: 'resumo',
      heading: 'Quatro ideias para levar à prática',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Somar positivo', text: 'Ande para a direita na reta.' },
          { title: 'Somar negativo', text: 'Ande para a esquerda na reta.' },
          { title: 'Sinais iguais', text: 'Some os módulos e mantenha o sinal.' },
          { title: 'Subtrair', text: 'Some o oposto do segundo número.' },
        ],
      },
      beats: [
        { say: 'Primeira ideia: somar um positivo move o ponto para a direita. Segunda: somar um negativo move o ponto para a esquerda.', show: 1 },
        { say: 'Terceira: se os sinais forem iguais, some os módulos e mantenha o sinal. Se forem diferentes, subtraia os módulos e use o sinal do maior módulo; se os módulos forem iguais e os sinais opostos, o resultado é zero.', show: 3 },
        { say: 'Quarta: subtrair é somar o oposto. Transforme a conta com cuidado, calcule os módulos quando necessário e só então escolha o sinal. Com esse roteiro, você consegue conferir a resposta tanto pela regra quanto pela reta numérica.', show: 4 },
        { say: 'Antes de praticar, tente explicar com suas palavras por que três mais menos cinco dá menos dois e por que seis menos menos dois dá oito. Se conseguir justificar o movimento, não estará apenas decorando sinais: estará entendendo a operação.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'choice',
    id: 'narrada-check',
    prompt: 'Quanto é −4 + 9?',
    options: [
      { text: '5', why: 'Isso. Os sinais são diferentes: 9 − 4 = 5, e o maior módulo pertence ao número positivo 9.' },
      { text: '−13', why: 'Aqui os sinais são diferentes. Em vez de somar os módulos, subtraia 9 − 4 e use o sinal do maior módulo.' },
      { text: '−5', why: 'A diferença entre os módulos é 5, mas o sinal vem do maior módulo. Como 9 é positivo, o resultado é +5.' },
    ],
    answer: 0,
  },
};
