// Aulas narradas da série "O que é um computador" (cap.prim.01).
// Roteiro revisado para separar contexto histórico, contribuição e consequência técnica.
// Revisão editorial humana: pendente até validação no player e leitura por especialista.
import type { NarratedLesson } from './types';

const S = { chapterId: 'cap.prim.01', sectionId: 'computador', review: 'nao-revisado' } as const;

export const narradaHistoriaComputador: NarratedLesson = {
  ...S,
  id: 'narrada.prim.historia',
  title: 'Do ábaco ao celular',
  lessonId: 'prim.computador.1',
  minutes: 8,
  scenes: [
    {
      id: 'abertura',
      heading: 'Uma história feita de muitas ideias',
      visual: { kind: 'title', title: 'Do ábaco ao celular', subtitle: 'como a computação passou de contas manuais a máquinas programáveis', art: 'computador' },
      beats: [
        { say: 'Quando você toca na tela de um celular, parece que a resposta aparece quase por mágica. Mas cada toque depende de ideias que foram sendo desenvolvidas durante séculos: representar números, automatizar tarefas, guardar instruções e processar sinais elétricos.' },
        { say: 'Nesta viagem, vamos observar o que mudou em cada etapa e, principalmente, que ideia ela acrescentou. O computador moderno não nasceu de uma única invenção nem de uma única pessoa.' },
      ],
    },
    {
      id: 'abaco-pascal',
      heading: 'Antes da eletricidade: ajudar as pessoas a calcular',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Há milhares de anos', title: 'Ábaco', text: 'Contas móveis ajudam a representar quantidades e a fazer cálculos.' },
          { year: '1642', title: 'Pascalina', text: 'Engrenagens executam operações aritméticas.' },
          { year: 'A mudança', title: 'Automatizar', text: 'Uma parte do trabalho passa da mão da pessoa para um mecanismo.' },
        ],
      },
      beats: [
        { say: 'Muito antes dos computadores, diferentes povos usavam instrumentos de cálculo, entre eles o ábaco. Mover as contas ajudava a representar quantidades e a acompanhar uma operação; a pessoa ainda precisava decidir quais passos executar.', show: 1 },
        { say: 'Em 1642, o matemático francês Blaise Pascal começou a construir a Pascalina, uma calculadora mecânica de engrenagens, para ajudar seu pai no trabalho de cálculo. O mecanismo podia automatizar somas e subtrações, incluindo o transporte de uma casa decimal para a seguinte.', show: 2 },
        { say: 'O ponto importante não é dizer que o ábaco já era um computador. É perceber uma mudança gradual: primeiro criamos ferramentas para apoiar o cálculo; depois, mecanismos passam a executar algumas operações sem que a pessoa faça cada passo à mão.', show: 3 },
      ],
    },
    {
      id: 'jacquard',
      heading: 'Cartões que davam instruções a uma máquina',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1804', title: 'Tear de Jacquard', text: 'Cartões perfurados selecionam o padrão que o tear deve tecer.' },
          { year: 'A ideia', title: 'Instruções separadas', text: 'Trocar os cartões muda o trabalho sem trocar toda a máquina.' },
        ],
      },
      beats: [
        { say: 'Em 1804, o tear associado a Joseph-Marie Jacquard usava cartões perfurados para controlar quais fios seriam levantados durante a tecelagem. Os furos não eram enfeite: cada sequência de cartões ajudava a determinar o padrão produzido no tecido.', show: 1 },
        { say: 'Ao trocar a sequência de cartões, era possível produzir outro desenho com a mesma máquina. Um tear não era um computador de uso geral, mas mostrou uma ideia importante para a computação: instruções registradas em um meio físico podem controlar uma máquina.', show: 2 },
      ],
    },
    {
      id: 'babbage-ada',
      heading: 'Babbage projetou a máquina; Ada explorou o que ela poderia fazer',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Década de 1830', title: 'Máquina Analítica', text: 'Projeto de uma máquina programável com cálculo, armazenamento e cartões.' },
          { year: '1843', title: 'Notas de Ada Lovelace', text: 'Uma tradução acompanhada de notas extensas sobre a máquina.' },
          { year: 'O algoritmo', title: 'Números de Bernoulli', text: 'Instruções ordenadas mostram como resolver um problema passo a passo.' },
        ],
      },
      beats: [
        { say: 'Charles Babbage, matemático e inventor britânico, projetou a Máquina Analítica na década de 1830. O plano previa cartões perfurados para indicar operações, um “moinho” para fazer cálculos e um “armazém” para guardar números. A máquina completa não chegou a ser construída durante a vida dele.', show: 1 },
        { say: 'Ada Lovelace era uma matemática britânica que estudou o projeto. Em 1843, ela traduziu um artigo de Luigi Menabrea sobre a Máquina Analítica e acrescentou notas muito mais extensas que o texto original. Essas notas explicavam não apenas a máquina, mas também possibilidades de usar sequências de instruções.', show: 2 },
        { say: 'Em uma das notas, Ada descreveu um procedimento para calcular números de Bernoulli. Por isso, ela é frequentemente lembrada como a primeira programadora: escreveu um algoritmo pensado para uma máquina de propósito geral, mesmo sem ter uma Máquina Analítica completa para executar o programa.', show: 3 },
      ],
    },
    {
      id: 'hollerith',
      heading: 'Cartões perfurados para organizar grandes quantidades de dados',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1890', title: 'Censo dos Estados Unidos', text: 'Máquinas tabuladoras leem cartões com dados codificados em furos.' },
          { year: 'Como funcionava', title: 'Ler e contar', text: 'Pinos fazem contato elétrico através dos furos e avançam contadores.' },
          { year: 'Décadas depois', title: 'Origem da IBM', text: 'A empresa de Hollerith participou de uma cadeia de fusões empresariais.' },
        ],
      },
      beats: [
        { say: 'No censo dos Estados Unidos de 1890, Herman Hollerith usou cartões perfurados para representar dados de cada pessoa. A máquina detectava os furos por meio de contatos elétricos e avançava contadores, permitindo tabular informações em muito menos tempo do que a contagem manual.', show: 1 },
        { say: 'É um bom exemplo de processamento de dados: os cartões representavam as informações, a máquina contava ocorrências e os operadores conferiam os resultados. O sistema não era igual a um computador atual, mas automatizou uma tarefa importante em grande escala.', show: 2 },
        { say: 'A empresa fundada por Hollerith entrou depois em uma sequência de fusões e mudanças corporativas. Ela foi parte da origem da companhia que, em 1924, adotou o nome IBM. Portanto, não foi uma transformação direta e imediata de uma única empresa para a IBM.', show: 3 },
      ],
    },
    {
      id: 'eniac',
      heading: 'O computador eletrônico ocupa uma sala inteira',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1945', title: 'ENIAC concluído', text: 'Um computador eletrônico digital de propósito geral.' },
          { year: '1946', title: 'Apresentação pública', text: 'Painéis e circuitos ocupam uma grande sala.' },
          { year: 'Programação', title: 'Configurar a máquina', text: 'Cabos e interruptores definiam a sequência de operações.' },
        ],
      },
      beats: [
        { say: 'O ENIAC foi concluído em 1945 e apresentado publicamente em 1946. Era um computador eletrônico digital de propósito geral: usava sinais elétricos e podia realizar diferentes tipos de cálculo. Em vez de uma caixa sobre a mesa, eram painéis enormes instalados em uma sala.', show: 1 },
        { say: 'O ENIAC usava cerca de 17.468 válvulas eletrônicas, além de muitos outros componentes. Para reconfigurar programas, era necessário ajustar interruptores e conectar cabos; não bastava abrir um arquivo. A máquina consumia muita energia, ocupava espaço e precisava de manutenção cuidadosa.', show: 2 },
        { say: 'Mulheres treinadas para programar o ENIAC, incluindo Jean Jennings Bartik e Betty Snyder Holberton, ajudaram a transformar os esquemas da máquina em sequências de operações. Por muitos anos, esse trabalho ficou menos conhecido do que o dos engenheiros que construíram o equipamento.', show: 3 },
      ],
    },
    {
      id: 'transistor-circuito',
      heading: 'Componentes menores mudam o tamanho das máquinas',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1947', title: 'Transistor', text: 'Um componente semicondutor pode controlar sinais elétricos.' },
          { year: '1958–1959', title: 'Circuito integrado', text: 'Vários componentes passam a ser fabricados juntos em um chip.' },
          { year: 'O efeito', title: 'Menor e mais confiável', text: 'A miniaturização reduz tamanho e consumo em muitas aplicações.' },
        ],
      },
      beats: [
        { say: 'Em 1947, pesquisadores dos Laboratórios Bell demonstraram o transistor. Assim como uma válvula, ele podia controlar um sinal elétrico, mas era muito menor e podia exigir menos energia. A mudança não aconteceu de um dia para o outro: durante anos, tecnologias antigas e novas coexistiram.', show: 1 },
        { say: 'No fim da década de 1950, Jack Kilby e Robert Noyce desenvolveram, por caminhos diferentes, circuitos integrados. Em vez de montar cada componente separadamente, partes de um circuito podiam ser fabricadas juntas em uma pequena peça de material semicondutor.', show: 2 },
        { say: 'A integração tornou possível colocar cada vez mais componentes em menos espaço. Essa miniaturização ajudou a reduzir custo e consumo e preparou o caminho para reunir a unidade central de processamento em um único chip.', show: 3 },
      ],
    },
    {
      id: 'microprocessador',
      heading: 'O processador cabe em um chip',
      visual: {
        kind: 'timeline',
        items: [
          { year: '15 de novembro de 1971', title: 'Intel 4004', text: 'Primeiro microprocessador comercialmente disponível, de 4 bits.' },
          { year: '1977', title: 'Apple II', text: 'Computadores pessoais chegam a mais casas, escolas e empresas.' },
          { year: '1981', title: 'IBM PC', text: 'Uma plataforma de computador pessoal ganha grande influência no mercado.' },
        ],
      },
      beats: [
        { say: 'Em novembro de 1971, a Intel anunciou a disponibilidade do 4004, um microprocessador de 4 bits desenvolvido inicialmente para uma calculadora da Busicom. Ele reunia em um único chip as funções de uma unidade central de processamento; isso facilitou a produção em escala de sistemas programáveis menores.', show: 1 },
        { say: 'Nos anos seguintes, computadores pessoais como o Apple II, lançado em 1977, e o IBM PC, lançado em 1981, ajudaram a levar a computação para casas e escritórios. A experiência deixou de ser exclusiva de grandes instituições e passou a fazer parte do cotidiano de mais pessoas.', show: 2 },
        { say: 'Os celulares inteligentes também têm uma história anterior a 2007. O lançamento do iPhone naquele ano ajudou a popularizar uma experiência baseada em tela multitoque, aplicativos e navegação pela internet. Ele foi um marco importante, não o primeiro aparelho que combinava telefone e funções de computador.', show: 3 },
      ],
    },
    {
      id: 'fecho',
      heading: 'O que mudou — e o que continua',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Entrada', text: 'Receber dados, como um toque ou uma tecla.' },
          { title: 'Processamento', text: 'Executar instruções e transformar dados.' },
          { title: 'Memória e armazenamento', text: 'Manter informações durante o trabalho ou por mais tempo.' },
          { title: 'Saída', text: 'Mostrar ou transmitir o resultado.' },
        ],
      },
      beats: [
        { say: 'A história não é uma linha reta em que uma invenção apaga todas as anteriores. Ferramentas, máquinas mecânicas, cartões, componentes eletrônicos e programas contribuíram de maneiras diferentes para a computação atual.', show: 1 },
        { say: 'Hoje, um computador recebe dados, processa instruções, usa memória, guarda informações e produz resultados. O celular faz isso em um aparelho pequeno; o ENIAC precisava de uma sala. Na próxima aula, vamos olhar com mais atenção para essas quatro funções.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'order',
    id: 'narrada-check',
    prompt: 'Coloque em ordem, do mais antigo ao mais recente.',
    items: ['Máquina de Pascal', 'Tear de Jacquard', 'ENIAC', 'Microprocessador 4004', 'Smartphone moderno multitoque'],
    why: 'A Pascalina data de 1642; o tear de Jacquard, de 1804; o ENIAC foi concluído em 1945 e apresentado em 1946; o Intel 4004 foi anunciado em novembro de 1971; e o iPhone ajudou a popularizar a experiência moderna de smartphone em 2007.',
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
