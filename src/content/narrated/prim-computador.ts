// Aulas narradas da série "O que é um computador" (cap.prim.01): o mesmo conteúdo das aulas em
// texto prim.computador.1 (história) e prim.computador.2 (quatro tarefas), em cenas com voz. Entram
// na própria aula, antes da prática (sequência única, 25/10/2026). Revisão editorial humana: pendente.
import type { NarratedLesson } from './types';

const S = { chapterId: 'cap.prim.01', sectionId: 'computador', review: 'nao-revisado' } as const;

export const narradaHistoriaComputador: NarratedLesson = {
  ...S,
  id: 'narrada.prim.historia',
  title: 'Do ábaco ao celular',
  lessonId: 'prim.computador.1',
  minutes: 7,
  scenes: [
    {
      id: 'abertura',
      heading: 'Nesta aula',
      visual: { kind: 'title', title: 'Do ábaco ao celular', subtitle: 'como o computador surgiu e foi melhorando', art: 'computador' },
      beats: [
        { say: 'O computador não foi inventado de uma vez. Ele é o resultado de séculos de tentativas de fazer contas mais depressa e sem erro.' },
        { say: 'Vamos percorrer essa história, do ábaco até o celular no seu bolso.' },
      ],
    },
    {
      id: 'contas',
      heading: 'Primeiro, as contas',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Há milhares de anos', title: 'Ábaco', text: 'Contas que deslizam em varetas. Quem pensa é a pessoa.' },
          { year: '1642', title: 'Máquina de Pascal', text: 'Engrenagens que somam sozinhas. Só sabia somar.' },
          { year: '1804', title: 'Tear de Jacquard', text: 'Cartões perfurados dizem o que tecer. Nasce a ideia de instrução.' },
        ],
      },
      beats: [
        { say: 'Há milhares de anos, vários povos usavam o ábaco. As contas ajudavam a não esquecer os números, mas quem pensava era a pessoa.' },
        { say: 'Em 1642, Blaise Pascal construiu uma máquina de engrenagens que somava sozinha. Era mecânica e só sabia somar.' },
        { say: 'Em 1804, Joseph-Marie Jacquard criou um tear que seguia cartões perfurados. Trocando os cartões, o mesmo tear tecia outro desenho.' },
      ],
    },
    {
      id: 'instrucoes',
      heading: 'Depois, as instruções',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Década de 1830', title: 'Máquina analítica de Babbage', text: 'Uma parte para fazer contas, outra para guardar números. Nunca terminada.' },
          { year: '1843', title: 'Ada Lovelace', text: 'Publica o que é considerado o primeiro programa de computador.' },
          { year: '1890', title: 'Censo de Hollerith', text: 'Máquinas elétricas leem cartões e contam a população. A empresa vira a IBM.' },
        ],
      },
      beats: [
        { say: 'Charles Babbage imaginou a Máquina Analítica: um projeto mecânico que receberia instruções em cartões perfurados. Ele separava o cálculo, chamado de moinho, do espaço para guardar números, chamado de armazém. A máquina completa nunca foi construída em sua época, mas a arquitetura antecipou ideias usadas nos computadores.', show: 1 },
        { say: 'Ada Lovelace era uma matemática britânica que estudou o projeto de Babbage. Em 1843, traduziu um texto sobre a máquina e acrescentou notas muito maiores que o original.', show: 2 },
        { say: 'Em suas notas, descreveu passo a passo como calcular números de Bernoulli com a máquina. Por isso, Ada é frequentemente considerada a primeira programadora, embora a máquina nunca tenha sido construída por completo naquela época.', show: 2 },
        { say: 'Em 1890, Herman Hollerith usou máquinas elétricas e cartões perfurados para contar a população dos Estados Unidos. A empresa que cresceu a partir do seu trabalho viria a ser conhecida como IBM.', show: 3 },
      ],
    },
    {
      id: 'eletronico',
      heading: 'Eletrônico e cada vez menor',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1946', title: 'ENIAC', text: 'Cerca de 18 mil válvulas, quase 30 toneladas, uma sala inteira.' },
          { year: '1947', title: 'Transistor', text: 'Um interruptor minúsculo substitui as válvulas.' },
          { year: '1971', title: 'Microprocessador 4004', text: 'Um processador inteiro num único chip.' },
        ],
      },
      beats: [
        { say: 'Em 1946, o ENIAC foi apresentado ao público como um computador digital eletrônico de uso geral. Não parecia um computador de mesa: era uma fileira de enormes painéis metálicos que ocupavam uma sala inteira.', show: 1 },
        { say: 'O ENIAC reunia cerca de dezoito mil válvulas eletrônicas e pesava dezenas de toneladas. Para mudar o programa, a equipe conectava cabos e ajustava interruptores nos painéis; não bastava abrir um arquivo como fazemos hoje.', show: 1 },
        { say: 'Um grupo de seis mulheres, entre elas Jean Jennings Bartik e Betty Snyder Holberton, aprendeu a programar a máquina e a calcular trajetórias e outros problemas. Por muito tempo, o trabalho dessas programadoras recebeu menos reconhecimento do que merecia.', show: 1 },
        { say: 'Em 1947 surgiu o transistor, um interruptor elétrico muito menor que uma válvula. Ele consumia menos energia, gerava menos calor e ajudou a tornar os computadores mais compactos e confiáveis.', show: 2 },
        { say: 'Em 1971, a Intel lançou o 4004, um microprocessador que reunia a unidade central de processamento em um único chip. Esse passo abriu caminho para dispositivos cada vez menores.', show: 3 },
      ],
    },
    {
      id: 'hoje',
      heading: 'Na mesa e no bolso',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1977 e 1981', title: 'Computador pessoal', text: 'Apple II e IBM PC chegam a casas e escritórios.' },
          { year: 'A partir de 2007', title: 'Smartphone', text: 'Um computador de bolso, com processador, memória, tela e internet.' },
        ],
      },
      beats: [
        { say: 'No fim dos anos setenta e nos anos oitenta, máquinas como o Apple II e o IBM PC levaram o computador para casas e escritórios.' },
        { say: 'A partir de 2007, o celular virou um computador de bolso.' },
      ],
    },
    {
      id: 'fecho',
      heading: 'O que não mudou',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Receber', text: 'A informação chega.' },
          { title: 'Trabalhar', text: 'As contas e as decisões.' },
          { title: 'Guardar', text: 'Por pouco ou por muito tempo.' },
          { title: 'Mostrar', text: 'O resultado sai.' },
        ],
      },
      beats: [
        { say: 'De uma sala inteira a um chip menor que uma unha, a ideia básica não mudou.', show: 0 },
        { say: 'Todo computador recebe informação,', show: 1 },
        { say: 'trabalha com ela,', show: 2 },
        { say: 'guarda o que precisa', show: 3 },
        { say: 'e mostra o resultado. É o assunto da próxima aula.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'order',
    id: 'narrada-check',
    prompt: 'Coloque em ordem, do mais antigo ao mais recente.',
    items: ['Máquina de Pascal', 'Tear de Jacquard', 'ENIAC', 'Microprocessador 4004', 'Smartphone'],
    why: '1642, 1804, 1946, 1971 e a partir de 2007.',
  },
};

export const narradaQuatroTarefas: NarratedLesson = {
  ...S,
  id: 'narrada.prim.tarefas',
  title: 'As quatro tarefas do computador',
  lessonId: 'prim.computador.2',
  minutes: 3,
  scenes: [
    {
      id: 'cozinha',
      heading: 'Uma cozinha',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Ingredientes chegam', text: 'Receber' },
          { title: 'A cozinheira prepara', text: 'Trabalhar' },
          { title: 'A geladeira guarda', text: 'Guardar' },
          { title: 'O prato sai', text: 'Mostrar' },
        ],
      },
      beats: [
        { say: 'Pense numa cozinha de restaurante. Os ingredientes chegam.' },
        { say: 'A cozinheira prepara.' },
        { say: 'A geladeira guarda.' },
        { say: 'E o prato sai para a mesa. O computador faz as mesmas quatro coisas.' },
      ],
    },
    {
      id: 'nomes',
      heading: 'Os nomes técnicos',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Entrada', text: 'Teclado, mouse, microfone, câmera.' },
          { title: 'Processamento', text: 'O processador, a CPU, faz as contas.' },
          { title: 'Memória', text: 'De trabalho, rápida; e armazenamento, por muito tempo.' },
          { title: 'Saída', text: 'Tela, impressora, caixa de som.' },
        ],
      },
      beats: [
        { say: 'Receber chama-se entrada: teclado, mouse, microfone e câmera levam a informação para dentro.' },
        { say: 'Trabalhar chama-se processamento. Quem faz é o processador, também chamado de CPU.' },
        { say: 'Guardar é a memória. A de trabalho é rápida e passageira; o armazenamento guarda por muito tempo.' },
        { say: 'Mostrar chama-se saída: tela, impressora e caixa de som.' },
      ],
    },
    {
      id: 'conta',
      heading: 'Tudo numa conta',
      visual: { kind: 'equation', lines: ['Teclado: 2 + 3', 'CPU: soma', 'Memória: guarda 5', 'Tela: mostra 5'], note: 'Entrada, processamento, memória e saída.' },
      beats: [
        { say: 'Veja numa conta. Você digita dois mais três no teclado: entrada.' },
        { say: 'A CPU faz a soma: processamento.' },
        { say: 'O resultado fica na memória por um instante.' },
        { say: 'E a tela mostra cinco: saída.' },
      ],
    },
  ],
  check: {
    kind: 'sort',
    id: 'narrada-check',
    prompt: 'Classifique.',
    categories: ['Entrada', 'Saída'],
    items: [
      { text: 'Teclado', cat: 0, why: 'Leva para dentro.' },
      { text: 'Impressora', cat: 1, why: 'Tira para o papel.' },
    ],
  },
};
