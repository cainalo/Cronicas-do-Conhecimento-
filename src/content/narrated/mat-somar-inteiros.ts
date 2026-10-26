// Aula narrada "Somar e subtrair inteiros na reta": o mesmo conteúdo da aula em texto
// mat.inteiros.2, em cenas com voz. Pressupõe a aula 1 (reta, negativos, módulo). Revisão editorial
// humana: pendente.
import type { NarratedLesson } from './types';

export const narradaSomarInteiros: NarratedLesson = {
  id: 'narrada.mat.somar-inteiros',
  title: 'Somar e subtrair inteiros na reta',
  chapterId: 'cap.mat.01',
  sectionId: 'inteiros',
  lessonId: 'mat.inteiros.2',
  minutes: 4,
  review: 'nao-revisado',
  scenes: [
    {
      id: 'abertura',
      heading: 'Nesta aula',
      visual: { kind: 'title', title: 'Somar e subtrair inteiros', subtitle: 'andando sobre a reta numérica', art: 'trilha' },
      beats: [{ say: 'Nesta aula curta, vamos somar e subtrair números inteiros, inclusive os negativos.' }, { say: 'A ideia toda cabe numa imagem: andar sobre a reta numérica.' }],
    },
    {
      id: 'reta',
      heading: 'A reta numérica',
      visual: { kind: 'numberline', from: -6, to: 6, states: [{ points: [0] }, { points: [3, -2] }] },
      beats: [
        { say: 'Esta é a reta numérica. O zero fica no meio. À direita ficam os positivos; à esquerda, os negativos.', show: 0 },
        { say: 'Quanto mais à direita, maior o número. Três é maior que menos dois.', show: 1 },
      ],
    },
    {
      id: 'somar-positivo',
      heading: 'Somar um positivo: andar para a direita',
      visual: { kind: 'numberline', from: -6, to: 6, states: [{ points: [2] }, { points: [2, 5], jumps: [{ from: 2, to: 5 }] }] },
      beats: [
        { say: 'Somar um número positivo é andar para a direita. Dois mais três: começo no dois.', show: 0 },
        { say: 'Ando três casas para a direita e chego ao cinco. Dois mais três é cinco.', show: 1 },
      ],
    },
    {
      id: 'somar-negativo',
      heading: 'Somar um negativo: andar para a esquerda',
      visual: { kind: 'numberline', from: -6, to: 6, states: [{ points: [3] }, { points: [3, -2], jumps: [{ from: 3, to: -2 }] }] },
      beats: [
        { say: 'Somar um número negativo é andar para a esquerda. Três mais menos cinco: começo no três.', show: 0 },
        { say: 'Ando cinco casas para a esquerda, passo do zero e chego ao menos dois.', show: 1 },
      ],
    },
    {
      id: 'atalho',
      heading: 'O atalho, sem desenhar a reta',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Sinais iguais', text: 'Some os módulos e mantenha o sinal. (−3) + (−4) = −7' },
          { title: 'Sinais diferentes', text: 'Subtraia os módulos; o sinal é do maior módulo. (−9) + 4 = −5' },
        ],
      },
      beats: [
        { say: 'Com números grandes, desenhar a reta cansa. O atalho sai do mesmo raciocínio.', show: 0 },
        { say: 'Sinais iguais: os dois passos vão para o mesmo lado. Some os módulos e mantenha o sinal. Menos três mais menos quatro dá menos sete.', show: 1 },
        { say: 'Sinais diferentes: um passo desfaz parte do outro. Subtraia os módulos e fique com o sinal de quem tem o maior módulo. Menos nove mais quatro dá menos cinco.', show: 2 },
      ],
    },
    {
      id: 'subtrair',
      heading: 'Subtrair é somar o oposto',
      visual: { kind: 'equation', lines: ['5 − 8', '= 5 + (−8)', '= −3'], note: 'Subtrair um número = somar o oposto dele' },
      beats: [
        { say: 'Subtrair é andar no sentido contrário ao da soma. Veja cinco menos oito.', show: 1 },
        { say: 'Tirar oito é o mesmo que somar o oposto de oito, que é menos oito.', show: 2 },
        { say: 'Sinais diferentes: oito menos cinco dá três, com o sinal do menos oito. Resultado: menos três.', show: 3 },
      ],
    },
    {
      id: 'tirar-negativo',
      heading: 'Tirar um negativo',
      visual: { kind: 'equation', lines: ['6 − (−2)', '= 6 + 2', '= 8'], note: 'Cancelar uma dívida faz o saldo subir' },
      beats: [
        { say: 'E se o número que se tira for negativo? Seis menos menos dois.', show: 1 },
        { say: 'Pela mesma regra, tirar menos dois é somar o oposto dele, que é dois.', show: 2 },
        { say: 'Seis mais dois: oito. É como cancelar uma dívida: o saldo sobe.', show: 3 },
      ],
    },
    {
      id: 'resumo',
      heading: 'Resumo',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Somar positivo', text: 'anda para a direita' },
          { title: 'Somar negativo', text: 'anda para a esquerda' },
          { title: 'Subtrair', text: 'é somar o oposto: 5 − 8 = 5 + (−8)' },
          { title: 'Tirar negativo', text: 'soma: 6 − (−2) = 8' },
        ],
      },
      beats: [
        { say: 'Resumindo. Somar um positivo anda para a direita.', show: 1 },
        { say: 'Somar um negativo anda para a esquerda.', show: 2 },
        { say: 'Subtrair é somar o oposto.', show: 3 },
        { say: 'E tirar um negativo faz somar. Agora, se quiser, confira com uma pergunta.', show: 4 },
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
