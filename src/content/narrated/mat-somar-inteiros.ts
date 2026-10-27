// Aula narrada "Somar e subtrair inteiros na reta" (mat.inteiros.2).
// Reescrita didática: exemplos graduais, passos explícitos na reta e cuidado com o significado dos sinais.
// Revisão editorial humana e validação no player ainda pendentes.
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
      heading: 'O sinal indica direção e sentido',
      visual: { kind: 'title', title: 'Somar e subtrair inteiros', subtitle: 'entenda os sinais antes de decorar regras', art: 'trilha' },
      beats: [
        { say: 'Imagine que o zero é o ponto de partida de uma caminhada. Os números positivos ficam à direita do zero e os negativos ficam à esquerda. Somar e subtrair inteiros pode ser entendido como deslocar-se por essa reta.' },
        { say: 'Vamos usar a reta para enxergar cada passo e, só depois, transformar esse raciocínio em regras rápidas para fazer contas sem desenhar tudo.' },
      ],
    },
    {
      id: 'reta',
      heading: 'Leia a reta numérica',
      visual: { kind: 'numberline', from: -6, to: 6, states: [{ points: [0] }, { points: [0, 3, -2] }] },
      beats: [
        { say: 'A reta tem o zero como referência. À direita estão 1, 2, 3 e os demais positivos; à esquerda estão menos um, menos dois, menos três e os outros negativos.', show: 0 },
        { say: 'Quanto mais à direita, maior o número. Por isso, três é maior que menos dois: o três fica à direita, mesmo que o dois de “menos dois” pareça familiar.', show: 1 },
      ],
    },
    {
      id: 'somar-positivo',
      heading: 'Somar um número positivo: caminhar para a direita',
      visual: {
        kind: 'numberline', from: -6, to: 6,
        states: [
          { points: [2] },
          { points: [2, 3], jumps: [{ from: 2, to: 3 }] },
          { points: [2, 3, 4], jumps: [{ from: 2, to: 3 }, { from: 3, to: 4 }] },
          { points: [2, 3, 4, 5], jumps: [{ from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 }] },
        ],
      },
      beats: [
        { say: 'Resolva dois mais três. Primeiro, localize o número dois na reta: esse é o ponto onde começamos. O número que será somado diz quanto e para que lado vamos andar.', show: 0 },
        { say: 'Como três é positivo, vamos para a direita. O primeiro passo leva do dois ao três.', show: 1 },
        { say: 'O segundo passo parte do três e chega ao quatro. Agora avançamos duas das três unidades.', show: 2 },
        { say: 'O terceiro passo leva do quatro ao cinco. Completamos as três unidades para a direita.', show: 3 },
        { say: 'Terminamos no cinco. Portanto, dois mais três é igual a cinco. Começamos no primeiro número e usamos o segundo para definir o deslocamento.', show: 3 },
      ],
    },
    {
      id: 'somar-negativo',
      heading: 'Somar um número negativo: caminhar para a esquerda',
      visual: {
        kind: 'numberline', from: -6, to: 6,
        states: [
          { points: [3] },
          { points: [3, 2], jumps: [{ from: 3, to: 2 }] },
          { points: [3, 2, 1], jumps: [{ from: 3, to: 2 }, { from: 2, to: 1 }] },
          { points: [3, 2, 1, 0], jumps: [{ from: 3, to: 2 }, { from: 2, to: 1 }, { from: 1, to: 0 }] },
          { points: [3, 2, 1, 0, -1], jumps: [{ from: 3, to: 2 }, { from: 2, to: 1 }, { from: 1, to: 0 }, { from: 0, to: -1 }] },
          { points: [3, 2, 1, 0, -1, -2], jumps: [{ from: 3, to: 2 }, { from: 2, to: 1 }, { from: 1, to: 0 }, { from: 0, to: -1 }, { from: -1, to: -2 }] },
        ],
      },
      beats: [
        { say: 'Agora calcule três mais menos cinco. Comece no três. O segundo número é menos cinco, então vamos andar cinco unidades para a esquerda; o sinal negativo indica a direção.', show: 0 },
        { say: 'O primeiro passo para a esquerda leva do três ao dois.', show: 1 },
        { say: 'O segundo passo vai do dois ao um. Andamos duas das cinco unidades.', show: 2 },
        { say: 'O terceiro passo leva do um ao zero. Cruzar o zero não termina a conta: ainda faltam duas unidades.', show: 3 },
        { say: 'O quarto passo sai do zero e chega ao menos um.', show: 4 },
        { say: 'O quinto passo vai de menos um a menos dois. Chegamos ao destino depois de cinco unidades para a esquerda.', show: 5 },
        { say: 'O resultado é menos dois: três mais menos cinco é igual a menos dois.', show: 5 },
      ],
    },
    {
      id: 'sinais-iguais',
      heading: 'Quando os sinais são iguais',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Mesmo sentido', text: 'Os valores se acumulam.' },
          { title: 'Exemplo', text: '(−3) + (−4) = −7' },
          { title: 'Regra', text: 'Some os módulos e mantenha o sinal comum.' },
        ],
      },
      beats: [
        { say: 'Desenhar a reta é ótimo para entender, mas pode ficar trabalhoso com números grandes. Quando os dois números têm o mesmo sinal, os deslocamentos seguem o mesmo sentido: seus tamanhos se somam.', show: 1 },
        { say: 'Por exemplo, menos três mais menos quatro. O módulo é a distância até o zero: o módulo de menos três é três, e o de menos quatro é quatro. Três mais quatro é sete; como ambos são negativos, o resultado é menos sete.', show: 3 },
      ],
    },
    {
      id: 'sinais-diferentes',
      heading: 'Quando os sinais são diferentes',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Parte se compensa', text: '(−9) + 4 = −5' },
          { title: 'O sinal acompanha o maior módulo', text: '(−4) + 9 = 5' },
          { title: 'Se os módulos empatam', text: '(−6) + 6 = 0' },
        ],
      },
      beats: [
        { say: 'Quando os sinais são diferentes, um deslocamento acontece para a direita e o outro para a esquerda. Uma parte do caminho se compensa. Por isso, subtraímos os módulos em vez de somá-los.', show: 1 },
        { say: 'Veja menos nove mais quatro. O módulo de menos nove é nove, maior que quatro. Fazemos nove menos quatro, que dá cinco, e mantemos o sinal do número com maior módulo: menos cinco.', show: 2 },
        { say: 'No exemplo menos quatro mais nove, nove tem o maior módulo e é positivo, então o resultado é cinco. Se os módulos forem iguais, como menos seis mais seis, tudo se compensa e o resultado é zero.', show: 3 },
      ],
    },
    {
      id: 'subtracao',
      heading: 'Subtrair é somar o oposto',
      visual: {
        kind: 'equation',
        lines: ['5 − 8', '= 5 + (−8)', '= −3'],
        note: 'Troque a subtração pela adição do oposto do segundo número.',
      },
      beats: [
        { say: 'Agora vamos calcular cinco menos oito. Na reta, começamos no cinco e andar para trás oito unidades nos leva ao menos três. Mas há uma regra que funciona para todos os inteiros: subtrair um número é o mesmo que somar o seu oposto.', show: 1 },
        { say: 'O oposto de oito é menos oito. Então cinco menos oito pode ser reescrito como cinco mais menos oito. Agora temos uma soma com sinais diferentes: os módulos são cinco e oito.', show: 2 },
        { say: 'Oito é o maior módulo. Fazemos oito menos cinco, que dá três, e conservamos o sinal do número de maior módulo, que é menos oito. O resultado final é menos três.', show: 3 },
      ],
    },
    {
      id: 'subtrair-negativo',
      heading: 'Tirar um número negativo',
      visual: {
        kind: 'equation',
        lines: ['6 − (−2)', '= 6 + 2', '= 8'],
        note: 'O oposto de −2 é +2.',
      },
      beats: [
        { say: 'E se a conta for seis menos menos dois? Não decore apenas que “dois sinais de menos viram mais”. Leia a operação: estamos subtraindo o número negativo menos dois.', show: 1 },
        { say: 'A regra diz para somar o oposto do segundo número. O oposto de menos dois é mais dois, portanto seis menos menos dois fica seis mais dois.', show: 2 },
        { say: 'Seis mais dois é oito. Pense em uma dívida de dois reais que foi cancelada: sua situação melhora em dois reais. A comparação ajuda a imaginar o resultado, embora a regra matemática continue sendo somar o oposto.', show: 3 },
      ],
    },
    {
      id: 'cuidado-sinais',
      heading: 'Como evitar a armadilha dos sinais',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Na soma', text: '(−3) + (−4) = −7' },
          { title: 'Na subtração', text: '6 − (−2) = 6 + 2 = 8' },
          { title: 'Pergunta útil', text: 'Qual é a operação? Qual é o oposto?' },
        ],
      },
      beats: [
        { say: 'Cuidado com a frase “menos com menos dá mais”: sozinha, ela pode confundir. Na soma de menos três com menos quatro, o resultado é menos sete, não mais sete.', show: 1 },
        { say: 'Na subtração seis menos menos dois, o resultado é positivo porque subtrair menos dois equivale a somar mais dois. Identifique primeiro a operação e só depois aplique a regra dos sinais.', show: 3 },
      ],
    },
    {
      id: 'resumo',
      heading: 'Resumo para levar à prática',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Somar positivo', text: 'Desloque-se para a direita.' },
          { title: 'Somar negativo', text: 'Desloque-se para a esquerda.' },
          { title: 'Sinais iguais', text: 'Some os módulos e conserve o sinal.' },
          { title: 'Subtrair', text: 'Some o oposto; confira o exemplo antes de decorar.' },
        ],
      },
      beats: [
        { say: 'Guarde quatro ideias. Somar um positivo desloca para a direita; somar um negativo desloca para a esquerda. Na soma com sinais iguais, some os módulos e mantenha o sinal.', show: 3 },
        { say: 'Na soma com sinais diferentes, subtraia os módulos e use o sinal de quem tem maior módulo; se forem iguais, o resultado é zero. E, para subtrair, some o oposto. Agora você já pode testar essas regras em algumas contas.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'choice',
    id: 'narrada-check',
    prompt: 'Quanto é −4 + 9?',
    options: [
      { text: '5', why: 'Isso. Sinais diferentes: 9 − 4 = 5, com o sinal do 9, que tem o maior módulo.' },
      { text: '−13', why: 'Somar módulos é para sinais iguais. Aqui os sinais são diferentes.' },
      { text: '−5', why: 'A conta dos módulos está certa, mas o sinal vem do maior módulo, que é o do 9.' },
    ],
    answer: 0,
  },
};
