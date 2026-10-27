// Roteiro editorial ampliado: história do computador, da contagem manual aos dispositivos pessoais.
// As falas preservam contexto e causalidade; cada mudança de show acompanha o evento explicado.
// Fatos para revisão humana final: docs/REVISAO_TECNICA_NARRADAS_E_VOZ_2026-10-26.md
import type { NarratedLesson } from './types';

const S = { chapterId: 'cap.prim.01', sectionId: 'computador', review: 'nao-revisado' } as const;

export const narradaHistoriaComputador: NarratedLesson = {
  ...S,
  id: 'narrada.prim.historia',
  title: 'Do ábaco ao celular',
  lessonId: 'prim.computador.1',
  minutes: 9,
  scenes: [
    {
      id: 'abertura',
      heading: 'Uma história de ideias acumuladas',
      visual: { kind: 'title', title: 'Do ábaco ao celular', subtitle: 'como a humanidade ensinou máquinas a trabalhar com informação', art: 'computador' },
      beats: [
        { say: 'Pegue o celular que está na sua mão. Em poucos segundos, ele pode fazer uma conta, guardar uma fotografia, abrir um mapa e conversar com alguém do outro lado do mundo. Mas nenhuma dessas capacidades apareceu de uma vez.' },
        { say: 'A história do computador é uma sequência de problemas e ideias: primeiro, representar quantidades; depois, automatizar cálculos; em seguida, ensinar máquinas a seguir instruções; por fim, reunir cada vez mais capacidade em componentes menores.' },
      ],
    },
    {
      id: 'primeiras-maquinas',
      heading: 'Antes do computador, ferramentas para contar',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Há milhares de anos', title: 'Ábaco', text: 'Contas móveis ajudam uma pessoa a representar quantidades e executar cálculos.' },
          { year: '1642', title: 'Pascalina', text: 'Engrenagens executam operações aritméticas, reduzindo parte do trabalho manual.' },
          { year: '1804', title: 'Tear de Jacquard', text: 'Cartões perfurados selecionam padrões e fazem uma máquina seguir instruções externas.' },
        ],
      },
      beats: [
        { say: 'Muito antes da eletricidade, diferentes povos usavam instrumentos de contagem, entre eles formas de ábaco. As contas deslizavam em varetas ou trilhos e ajudavam a organizar os números. O instrumento não pensava sozinho: a pessoa decidia qual operação fazer e interpretava o resultado.', show: 1 },
        { say: 'Essa distinção importa. Uma ferramenta de cálculo ajuda a pessoa; uma máquina automatizada executa ao menos parte das etapas por um mecanismo. O ábaco é um antepassado importante da computação, mas não era um computador eletrônico nem programável.', show: 1 },
        { say: 'Em 1642, Blaise Pascal construiu um dispositivo mecânico conhecido como Pascalina. Rodas dentadas representavam os números e transferiam o excesso de uma ordem para a seguinte — como quando nove unidades mais uma unidade formam uma dezena. A máquina foi pensada para facilitar cálculos financeiros do pai de Pascal.', show: 2 },
        { say: 'A Pascalina podia realizar adições e subtrações; multiplicações e divisões podiam ser obtidas por repetições de operações. Ainda era uma máquina especializada: não recebia um programa geral para resolver qualquer tarefa. Mesmo assim, mostrou que partes de uma conta podiam ser delegadas a um mecanismo.', show: 2 },
        { say: 'Em 1804, o tear associado a Joseph-Marie Jacquard usava cartões perfurados para controlar quais fios seriam levantados durante a tecelagem. Uma sequência diferente de cartões produzia um padrão diferente. Os cartões não faziam contas: carregavam instruções que a máquina seguia fisicamente.', show: 3 },
        { say: 'O princípio novo era poderoso: em vez de reconstruir toda a máquina para mudar o trabalho, era possível trocar as instruções. Essa ideia de separar a máquina da sequência de instruções preparou o terreno para os computadores programáveis.', show: 3 },
      ],
    },
    {
      id: 'babbage-ada-hollerith',
      heading: 'Quando as instruções se aproximam de um programa',
      visual: {
        kind: 'timeline',
        items: [
          { year: 'Década de 1830', title: 'Máquina Analítica', text: 'Projeto de Charles Babbage com mecanismos de cálculo e armazenamento de números.' },
          { year: '1843', title: 'Ada Lovelace', text: 'Notas sobre a Máquina Analítica incluem um método para calcular números de Bernoulli.' },
          { year: '1890', title: 'Herman Hollerith', text: 'Máquinas eletromecânicas e cartões perfurados aceleram a apuração do censo dos EUA.' },
        ],
      },
      beats: [
        { say: 'Na década de 1830, o matemático e inventor Charles Babbage projetou a Máquina Analítica. O projeto previa uma parte para executar operações — que ele chamava de moinho — e outra para guardar números — o armazém. Cartões perfurados serviriam para fornecer instruções.', show: 1 },
        { say: 'A diferença em relação a uma calculadora fixa é a proposta de mudar a sequência de operações por meio de instruções. A Máquina Analítica nunca foi concluída durante a vida de Babbage; por isso, não devemos imaginá-la como um computador moderno que já funcionava. Seu projeto, porém, antecipou ideias centrais da computação programável.', show: 1 },
        { say: 'Ada Lovelace, matemática britânica, estudou o projeto e colaborou intelectualmente com sua divulgação. Em 1843, traduziu um artigo sobre a Máquina Analítica e acrescentou notas extensas, que explicavam possibilidades da máquina muito além de uma simples calculadora.', show: 2 },
        { say: 'Uma das notas descrevia um procedimento, passo a passo, para calcular números de Bernoulli. Como esse método foi escrito para ser executado por uma máquina programável, Ada é frequentemente reconhecida como pioneira da programação e seu texto como um dos primeiros programas publicados. A máquina completa, contudo, não chegou a executar esse programa em sua época.', show: 2 },
        { say: 'Em 1890, Herman Hollerith usou cartões perfurados e máquinas eletromecânicas para tabular dados do censo dos Estados Unidos. Em vez de contar cada registro manualmente, a máquina detectava posições perfuradas e acumulava totais. Isso reduziu o trabalho de processamento de grandes conjuntos de dados.', show: 3 },
        { say: 'A empresa criada por Hollerith passou por mudanças e incorporações empresariais; uma dessas linhas de sucessão levou à IBM. A IBM, portanto, não surgiu instantaneamente em 1890 com o nome atual. O exemplo mostra também uma mudança de uso: máquinas passaram a processar não apenas contas, mas informações administrativas em grande escala.', show: 3 },
      ],
    },
    {
      id: 'eletronicos',
      heading: 'A eletrônica muda a escala',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1945–1946', title: 'ENIAC', text: 'Computador eletrônico de uso geral, formado por grandes painéis e milhares de válvulas.' },
          { year: 'Década de 1940', title: 'As programadoras', text: 'Mulheres da equipe do ENIAC desenvolveram e documentaram procedimentos para programar a máquina.' },
          { year: '1947', title: 'Transistor', text: 'Um interruptor eletrônico menor e mais eficiente abre caminho para circuitos compactos.' },
          { year: '1958–1959', title: 'Circuito integrado', text: 'Vários componentes eletrônicos são reunidos em um único pedaço de material semicondutor.' },
        ],
      },
      beats: [
        { say: 'O ENIAC foi concluído em 1945 e apresentado publicamente em 1946. Foi um dos primeiros computadores eletrônicos digitais de uso geral. Em vez de caber numa mesa, ocupava uma sala e era construído com grandes painéis metálicos.', show: 1 },
        { say: 'Ele usava aproximadamente dezoito mil válvulas eletrônicas, consumia muita energia e exigia refrigeração. Alterar um programa podia envolver religar cabos e ajustar interruptores. Isso é bem diferente de abrir um aplicativo: a programação era próxima do próprio hardware.', show: 1 },
        { say: 'Seis mulheres — entre elas Jean Jennings Bartik e Betty Snyder Holberton — estiveram entre as programadoras originais do ENIAC. Elas elaboravam, testavam e documentavam os passos necessários para resolver problemas. Durante muito tempo, esse trabalho técnico recebeu menos reconhecimento público do que merecia.', show: 2 },
        { say: 'Em 1947, pesquisadores dos Laboratórios Bell demonstraram o transistor, um componente capaz de controlar o fluxo de corrente elétrica. Em comparação com uma válvula, ele podia ser muito menor, consumir menos energia e produzir menos calor. A adoção dos transistores foi um dos passos que tornou possível reduzir o tamanho e aumentar a confiabilidade dos computadores.', show: 3 },
        { say: 'No fim dos anos 1950, Jack Kilby e, de forma independente, Robert Noyce ajudaram a desenvolver a ideia de circuito integrado: vários componentes conectados em uma pequena peça de material semicondutor. Em lugar de montar cada componente isoladamente, era possível fabricar circuitos inteiros em escala muito menor.', show: 4 },
      ],
    },
    {
      id: 'microprocessador-e-pc',
      heading: 'Do chip ao computador pessoal',
      visual: {
        kind: 'timeline',
        items: [
          { year: '1971', title: 'Intel 4004', text: 'Um dos primeiros microprocessadores comerciais reúne a CPU em um único chip.' },
          { year: '1977–1981', title: 'Computadores pessoais', text: 'Modelos como Apple II e IBM PC ampliam o uso doméstico e profissional.' },
          { year: 'A partir de 2007', title: 'Smartphone moderno', text: 'A tela sensível ao toque e os aplicativos ajudam o computador de bolso a se popularizar.' },
        ],
      },
      beats: [
        { say: 'Em 1971, a Intel lançou o 4004, um dos primeiros microprocessadores comerciais: a unidade central de processamento, ou CPU, reunida em um único chip. Isso não quer dizer que o computador inteiro coubesse nesse chip — memória, entrada, saída e outros circuitos continuavam necessários.', show: 1 },
        { say: 'Durante os anos 1970 e 1980, componentes mais compactos e baratos ajudaram a tornar viáveis os computadores pessoais. O Apple II, lançado em 1977, e o IBM PC, de 1981, são marcos conhecidos dessa popularização em casas, escolas e escritórios.', show: 2 },
        { say: 'Celulares com funções computacionais existiam antes de 2007. O lançamento do iPhone naquele ano, porém, tornou-se um marco na popularização de smartphones com tela multitoque, navegador e aplicativos integrados. A evolução continuou com diferentes fabricantes, sistemas e formatos.', show: 3 },
        { say: 'Olhe de novo para o celular atual. O tamanho mudou de uma sala para o bolso, mas continuam existindo processador, memória, armazenamento, dispositivos de entrada e formas de saída. A história não é apenas uma sucessão de datas: é a integração de muitas ideias e tecnologias.', show: 3 },
      ],
    },
    {
      id: 'ideia-central',
      heading: 'O que todos esses computadores fazem?',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Entrada', text: 'Receber dados e instruções: teclado, câmera, toque ou sensores.' },
          { title: 'Processamento', text: 'Executar instruções e transformar os dados.' },
          { title: 'Memória e armazenamento', text: 'Manter dados durante o trabalho ou guardá-los por mais tempo.' },
          { title: 'Saída', text: 'Apresentar resultados: tela, som, impressão ou uma resposta pela rede.' },
        ],
      },
      beats: [
        { say: 'A primeira tarefa é a entrada: o computador recebe dados. Quando você toca numa tecla, fotografa algo ou fala com um assistente, uma entrada fornece informação para o sistema.', show: 1 },
        { say: 'A segunda é o processamento. A CPU executa instruções; em conjunto com outros componentes, transforma os dados de acordo com o programa. Por exemplo, uma calculadora aplica uma operação aos números que você informou.', show: 2 },
        { say: 'A terceira tarefa é guardar informação. A memória de trabalho mantém dados que estão sendo usados, enquanto o armazenamento conserva arquivos e programas mesmo depois que o aparelho é desligado. São funções relacionadas, mas não são a mesma coisa.', show: 3 },
        { say: 'Por fim vem a saída: a tela mostra o resultado, o alto-falante reproduz som ou a rede envia uma resposta. Em resumo, o computador recebe, processa, guarda e apresenta informação. Esse modelo simples ajuda a entender tanto uma máquina histórica quanto o celular que usamos hoje.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'order',
    id: 'narrada-check',
    prompt: 'Organize do mais antigo ao mais recente.',
    items: ['Pascalina', 'Tear de Jacquard', 'Máquina Analítica de Babbage', 'ENIAC', 'Transistor', 'Intel 4004', 'Smartphone moderno'],
    why: '1642; 1804; projeto na década de 1830; ENIAC em 1945–1946; transistor em 1947; Intel 4004 em 1971; marco de popularização do smartphone moderno a partir de 2007.',
  },
};

export const narradaQuatroTarefas: NarratedLesson = {
  ...S,
  id: 'narrada.prim.tarefas',
  title: 'As quatro tarefas do computador',
  lessonId: 'prim.computador.2',
  minutes: 4,
  scenes: [
    {
      id: 'cozinha',
      heading: 'Uma cozinha ajuda a explicar',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Ingredientes chegam', text: 'Entrada: a informação entra no sistema.' },
          { title: 'A cozinheira prepara', text: 'Processamento: os ingredientes são transformados.' },
          { title: 'A geladeira guarda', text: 'Memória ou armazenamento: manter informação disponível.' },
          { title: 'O prato sai', text: 'Saída: o resultado chega a quem precisa.' },
        ],
      },
      beats: [
        { say: 'Imagine uma cozinha de restaurante. Os ingredientes chegam e alguém confere o pedido. Isso nos ajuda a pensar na entrada de dados de um computador.', show: 1 },
        { say: 'Depois, a cozinheira segue instruções e transforma os ingredientes no prato. No computador, o processamento é a execução das instruções que transformam os dados.', show: 2 },
        { say: 'Alguns ingredientes ficam guardados na geladeira para uso posterior. Do mesmo modo, o computador mantém informação na memória durante o trabalho e pode salvar arquivos no armazenamento.', show: 3 },
        { say: 'Por fim, o prato vai para a mesa: o resultado sai da cozinha. Um computador também produz saídas, como texto na tela, um som ou um arquivo. A analogia não é perfeita, mas ajuda a memorizar a sequência.', show: 4 },
      ],
    },
    {
      id: 'nomes',
      heading: 'Os nomes técnicos',
      visual: {
        kind: 'cards',
        cards: [
          { title: 'Entrada', text: 'Teclado, mouse, microfone, câmera e sensores.' },
          { title: 'Processamento', text: 'CPU e outros circuitos que executam instruções.' },
          { title: 'Memória e armazenamento', text: 'RAM temporária; SSD, cartão ou disco para guardar dados.' },
          { title: 'Saída', text: 'Tela, impressora, caixa de som ou resposta enviada pela rede.' },
        ],
      },
      beats: [
        { say: 'Entrada é o caminho pelo qual os dados chegam: teclado, mouse, microfone, câmera e sensores são exemplos. Um toque na tela também pode funcionar como entrada.', show: 1 },
        { say: 'Processamento é a execução das instruções. A CPU, sigla de unidade central de processamento, é a peça principal que executa instruções gerais, embora um sistema também possa usar processadores especializados.', show: 2 },
        { say: 'A memória RAM mantém temporariamente os dados e programas em uso e normalmente perde seu conteúdo quando o aparelho desliga. Já um SSD, cartão de memória ou disco é armazenamento: serve para conservar dados por mais tempo.', show: 3 },
        { say: 'Saída é a forma de apresentar o resultado: tela, impressora e alto-falante são exemplos. Em uma rede, enviar uma resposta para outro aparelho também pode ser uma saída de informação.', show: 4 },
      ],
    },
    {
      id: 'conta',
      heading: 'Acompanhe uma conta',
      visual: { kind: 'equation', lines: ['Entrada: 2 + 3', 'CPU: calcula a soma', 'Memória: mantém o resultado 5', 'Saída: a tela mostra 5'], note: 'Uma conta simples percorre as quatro tarefas.' },
      beats: [
        { say: 'Você digita dois mais três na calculadora. Os símbolos entram pelo teclado ou pela tela: essa é a entrada.', show: 1 },
        { say: 'A calculadora executa a operação e obtém cinco. Essa transformação dos dados é o processamento.', show: 2 },
        { say: 'Enquanto o cálculo acontece, o sistema mantém os dados necessários na memória. O armazenamento pode guardar o histórico, se o aplicativo oferecer essa função.', show: 3 },
        { say: 'A tela apresenta o número cinco. Essa é a saída. Separar essas tarefas ajuda a localizar onde uma informação entra, onde é trabalhada e onde o resultado aparece.', show: 4 },
      ],
    },
  ],
  check: {
    kind: 'sort',
    id: 'narrada-check',
    prompt: 'Classifique cada dispositivo.',
    categories: ['Entrada', 'Saída'],
    items: [
      { text: 'Teclado', cat: 0, why: 'Leva informação para dentro do sistema.' },
      { text: 'Impressora', cat: 1, why: 'Apresenta o resultado em papel.' },
      { text: 'Microfone', cat: 0, why: 'Capta som para o sistema.' },
      { text: 'Caixa de som', cat: 1, why: 'Apresenta som como resultado.' },
    ],
  },
};
