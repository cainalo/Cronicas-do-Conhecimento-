// Série "Redes neurais e deep learning" (cap.ia.03, trecho redes), no ritmo lento com história pedido
// em 25/10/2026: a primeira aula conta de McCulloch e Pitts ao transformer; as seguintes ensinam o
// neurônio, camadas e ativações, depois treino e arquiteturas, uma ideia por etapa. Fatos conferidos
// com o texto do capítulo (02-redes-neurais.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.03', sectionId: 'redes' } as const;

export const iaRedHistoria: MicroLesson = {
  ...S,
  id: 'ia.redes.1',
  series: { id: 'ia.redes', order: 1 },
  title: 'Do neurônio no papel ao transformer',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O cérebro tem bilhões de neurônios ligados entre si. Dá para imitar essa ideia num computador?',
    options: [
      { text: 'Sim, de forma muito simplificada', why: 'Isso: são as redes neurais artificiais. Esta aula conta como surgiram.' },
      { text: 'Não, nunca se tentou', why: 'Tentou-se desde 1943. Esta aula conta a história.' },
      { text: 'Sim, é uma cópia exata do cérebro', why: 'É só inspirada no cérebro, bem mais simples.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'mcculloch',
      part: 'A história',
      title: '1943: o neurônio no papel',
      art: 'interruptor',
      goal: 'Saber que McCulloch e Pitts criaram o primeiro modelo matemático de neurônio.',
      explain:
        'Em **1943**, **Warren McCulloch** e **Walter Pitts** descreveram um **modelo matemático** simples de neurônio.\n\nEle recebe sinais e **liga ou desliga** conforme as entradas, como um **interruptor** que só acende quando a soma dos sinais passa de um limite.\n\nFoi a primeira vez que se mostrou que "neurônios" assim, ligados, podem fazer contas de lógica.',
      check: {
        kind: 'choice',
        id: 'mc-c',
        prompt: 'O que fazia o neurônio de McCulloch e Pitts?',
        options: [
          { text: 'Ligava ou desligava conforme as entradas', why: 'Isso.' },
          { text: 'Lia imagens coloridas', why: 'Era um modelo simples, de liga e desliga.' },
          { text: 'Traduzia idiomas', why: 'Era só um modelo de neurônio, bem simples.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **campainha com várias pessoas apertando**: ela só toca se **pessoas suficientes** apertarem ao mesmo tempo. O neurônio de 1943 era isso: soma as entradas e, se passar do limite, "dispara".',
        check: {
          kind: 'choice',
          id: 'mc-r',
          prompt: 'Em que ano McCulloch e Pitts publicaram o modelo de neurônio?',
          options: [
            { text: '1943', why: 'Isso.' },
            { text: '2017', why: '2017 é o ano do transformer.' },
            { text: '1986', why: '1986 é o ano em que a retropropagação foi popularizada.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'rosenblatt',
      part: 'A história',
      title: '1958: o perceptron',
      art: 'chip',
      goal: 'Saber que o perceptron aprendia ajustando pesos.',
      explain:
        'Em **1958**, **Frank Rosenblatt** construiu o **perceptron**.\n\nA novidade: ele **aprendia**. Cada entrada tinha um **peso**, e a máquina **ajustava os pesos** com exemplos até acertar.\n\nFoi o modelo pioneiro de rede neural que aprende, com **uma única camada**.',
      check: {
        kind: 'choice',
        id: 'ro-c',
        prompt: 'Como o perceptron de Rosenblatt aprendia?',
        options: [
          { text: 'Ajustando os pesos com exemplos', why: 'Isso.' },
          { text: 'Lendo regras escritas à mão', why: 'Isso seria um sistema especialista.' },
          { text: 'Não aprendia: era fixo', why: 'A novidade era justamente aprender.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine uma **mesa de som** com vários botões de volume (os **pesos**). Você ouve o resultado, compara com o que queria e **gira os botões** um pouco. Repetindo, chega ao som certo. O perceptron girava seus "botões" com cada exemplo.',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: 'Quantas camadas tinha o perceptron original?',
          options: [
            { text: 'Uma única camada', why: 'Isso.' },
            { text: 'Centenas', why: 'Redes profundas vieram muito depois.' },
            { text: 'Nenhuma', why: 'Tinha uma camada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'minsky',
      part: 'A história',
      title: '1969: o limite do XOR',
      art: 'cadeado',
      goal: 'Saber que uma camada só não resolve o XOR e que isso freou as redes.',
      explain:
        'Em **1969**, no livro ***Perceptrons***, **Marvin Minsky** e **Seymour Papert** mostraram um limite: uma camada só **não resolve** problemas como o **XOR** ("ou exclusivo": verdadeiro quando **só uma** das duas entradas é verdadeira).\n\nO motivo: o XOR **não é linearmente separável**. Não dá para separar os "sim" dos "não" com uma única reta.\n\nO interesse pelas redes **caiu** por anos.',
      check: {
        kind: 'choice',
        id: 'mi-c',
        prompt: 'Por que um perceptron de uma camada não resolve o XOR?',
        options: [
          { text: 'O XOR não é linearmente separável', why: 'Isso.' },
          { text: 'O XOR é grande demais', why: 'É pequeno: o problema é não ser separável por uma reta.' },
          { text: 'Faltava energia elétrica', why: 'É um limite matemático, não de energia.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Desenhe quatro pontos num quadrado: os cantos opostos de **uma diagonal** são "sim"; os da **outra** diagonal, "não". Tente separar com **uma régua**: impossível. Uma camada só traça uma reta. Por isso é preciso uma **camada oculta**.',
        check: {
          kind: 'choice',
          id: 'mi-r',
          prompt: 'Quem mostrou, em 1969, esse limite do perceptron?',
          options: [
            { text: 'Minsky e Papert', why: 'Isso, no livro Perceptrons.' },
            { text: 'Rosenblatt', why: 'Rosenblatt criou o perceptron.' },
            { text: 'Turing', why: 'Turing propôs o jogo da imitação em 1950.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'backprop',
      part: 'A história',
      title: '1986: a retropropagação',
      art: 'degraus',
      goal: 'Saber que a retropropagação permitiu treinar redes com camadas ocultas.',
      explain:
        'Em **1986**, **Rumelhart**, **Hinton** e **Williams** popularizaram a **retropropagação** (*backpropagation*).\n\nCom ela, ficou possível **treinar redes com camadas ocultas**: o erro da saída é levado **de volta**, camada por camada, para ajustar cada peso.\n\nO limite do XOR estava superado.',
      check: {
        kind: 'choice',
        id: 'bp-c',
        prompt: 'O que a retropropagação permitiu?',
        options: [
          { text: 'Treinar redes com camadas ocultas', why: 'Isso.' },
          { text: 'Eliminar a necessidade de dados', why: 'Continua sendo preciso treinar com dados.' },
          { text: 'Escrever regras à mão', why: 'É um método de ajustar pesos, não de escrever regras.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Numa **fábrica com várias etapas**, se o produto sai com defeito, você volta **de trás para a frente** perguntando: "quanto cada etapa contribuiu para o erro?". A retropropagação faz isso com as camadas, e ajusta mais quem mais errou.',
        check: {
          kind: 'choice',
          id: 'bp-r',
          prompt: 'Na retropropagação, o erro é levado:',
          options: [
            { text: 'Da saída para a entrada', why: 'Isso: daí o nome "retro".' },
            { text: 'Da entrada para a saída', why: 'Esse é o caminho da propagação direta.' },
            { text: 'Para outro computador', why: 'O erro percorre a própria rede, de trás para a frente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'virada',
      part: 'A história',
      title: '2012 e 2017: AlexNet e o transformer',
      art: 'progresso',
      goal: 'Conhecer AlexNet e o transformer como marcos do deep learning.',
      explain:
        'Em **2012**, a rede convolucional **AlexNet** venceu **com folga** a competição de imagens **ImageNet**. Começava a era do **deep learning**, com redes de muitas camadas e muito dado.\n\nEm **2017**, o artigo "**Attention Is All You Need**" apresentou o **transformer**, base dos grandes modelos de linguagem de hoje.',
      check: {
        kind: 'order',
        id: 'vi-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Neurônio de McCulloch e Pitts (1943)', 'Perceptron de Rosenblatt (1958)', 'Livro Perceptrons (1969)', 'Retropropagação popularizada (1986)', 'Transformer (2017)'],
        why: 'Do modelo no papel ao transformer.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma montanha-russa: **subida** com o perceptron (1958), **queda** com o livro de Minsky (1969), **nova subida** com a retropropagação (1986) e a **grande arrancada** com AlexNet (2012) e o transformer (2017).',
        check: {
          kind: 'choice',
          id: 'vi-r',
          prompt: 'Que artigo apresentou o transformer, em 2017?',
          options: [
            { text: '"Attention Is All You Need"', why: 'Isso.' },
            { text: '"Computing Machinery and Intelligence"', why: 'Esse é o de Turing, de 1950.' },
            { text: '"Go To Statement Considered Harmful"', why: 'Essa é a carta de Dijkstra, de 1968.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['1958: perceptron de Rosenblatt', '1969: limite do XOR', '1986: AlexNet vence o ImageNet'],
      bug: 2,
      why: 'Em 1986 popularizou-se a retropropagação; a AlexNet é de 2012.',
      fixed: '1986: retropropagação popularizada',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Rosenblatt', 'Minsky e Papert', 'Rumelhart, Hinton e Williams'],
      items: [
        { text: 'Perceptron que aprende pesos', cat: 0, why: '1958.' },
        { text: 'Mostraram o limite do XOR', cat: 1, why: '1969.' },
        { text: 'Popularizaram a retropropagação', cat: 2, why: '1986.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o XOR de "aprovado no prazo" e "aprovado com ressalva" deve dar verdadeiro só quando apenas um deles é verdadeiro. Um perceptron de uma camada resolve?',
      options: [
        { text: 'Não: precisa de camada oculta', why: 'Isso.' },
        { text: 'Sim, sempre', why: 'XOR não é linearmente separável.' },
        { text: 'Sim, se tiver mais dados', why: 'Mais dados não resolvem um limite da arquitetura.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1943: McCulloch e Pitts, neurônio matemático que liga ou desliga.',
    '1958: perceptron de Rosenblatt, uma camada, aprende ajustando pesos.',
    '1969: Minsky e Papert mostram que uma camada não resolve o XOR (não linearmente separável).',
    '1986: retropropagação popularizada (Rumelhart, Hinton, Williams): treinar camadas ocultas.',
    '2012: AlexNet no ImageNet. 2017: transformer ("Attention Is All You Need").',
  ],
};

export const iaRedNeuronio: MicroLesson = {
  ...S,
  id: 'ia.redes.2',
  series: { id: 'ia.redes', order: 2 },
  title: 'Neurônio, camadas e ativações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Para decidir se um contrato é de risco, você dá mais importância ao valor do que ao prazo. Isso lembra que ideia da rede neural?',
    options: [
      { text: 'Pesos diferentes para cada entrada', why: 'Isso. Esta aula mostra como o neurônio combina entradas com pesos.' },
      { text: 'Camada de saída', why: 'A saída é o resultado; a importância de cada entrada são os pesos.' },
      { text: 'Retropropagação', why: 'A retropropagação ajusta os pesos; a importância em si são os pesos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'neuronio',
      part: 'O neurônio',
      title: 'Pesos, viés e ativação',
      art: 'balanca',
      goal: 'Montar a conta do neurônio artificial.',
      explain:
        'Um neurônio artificial:\n\n1. recebe entradas **x₁, x₂, ..., xₙ**;\n2. multiplica cada uma por um **peso wᵢ**;\n3. **soma** tudo com um **viés** (*bias*) **b**;\n4. aplica uma **função de ativação f**.\n\n**saída = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)**\n\nOs **pesos** e o **viés** são os **parâmetros** aprendidos no treino.',
      check: {
        kind: 'choice',
        id: 'ne-c',
        prompt: 'No neurônio artificial, a função de ativação é aplicada à:',
        options: [
          { text: 'Soma das entradas multiplicadas pelos pesos, mais o viés', why: 'Isso.' },
          { text: 'Maior entrada, sem pesos', why: 'Todas as entradas entram, cada uma com seu peso.' },
          { text: 'Média dos rótulos do treino', why: 'Ela é aplicada à soma ponderada mais o viés.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **nota final ponderada**: prova vale peso 3, trabalho vale 1; soma-se tudo e acrescenta-se um **bônus fixo** (o viés). Depois, uma regra decide o resultado: "acima de 6, aprovado" (a **ativação**). O neurônio faz exatamente isso.',
        check: {
          kind: 'choice',
          id: 'ne-r',
          prompt: 'O que a rede aprende durante o treino?',
          options: [
            { text: 'Os pesos e o viés', why: 'Isso: os parâmetros.' },
            { text: 'As entradas', why: 'As entradas são os dados; os parâmetros é que mudam.' },
            { text: 'A quantidade de camadas', why: 'Isso é escolha de arquitetura, não aprendido no treino.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'camadas',
      part: 'Camadas',
      title: 'Entrada, ocultas e saída',
      art: 'degraus',
      goal: 'Conhecer os papéis das camadas e o que é uma rede profunda.',
      explain:
        '- **Entrada**: recebe os atributos (valor do contrato, prazo, modalidade).\n- **Ocultas**: combinam as entradas e aprendem **representações intermediárias**.\n- **Saída**: produz a previsão (classe, probabilidade, valor).\n\nCom **várias camadas ocultas**, a rede é **profunda**: daí *deep learning*. O **perceptron multicamadas (MLP)** é a rede totalmente conectada clássica.\n\nCom camada oculta, o **XOR** passa a ser resolvido.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Qual camada aprende representações intermediárias?',
        options: [
          { text: 'As camadas ocultas', why: 'Isso.' },
          { text: 'A camada de entrada', why: 'A entrada só recebe os atributos.' },
          { text: 'Nenhuma', why: 'As ocultas fazem isso.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Numa **linha de montagem**, a entrada recebe as **peças**, as estações do meio (ocultas) montam **partes** (motor, porta), e a saída entrega o **carro**. Numa rede para ler fotos, as primeiras ocultas veem bordas, as seguintes formas, e a saída diz "obra concluída".',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'Uma rede é chamada "profunda" quando:',
          options: [
            { text: 'Tem várias camadas ocultas', why: 'Isso.' },
            { text: 'Tem muitos dados de entrada', why: 'O que define é o número de camadas ocultas.' },
            { text: 'Roda devagar', why: 'A velocidade não define a profundidade.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ativacoes',
      part: 'Ativações',
      title: 'Degrau, sigmoide, tanh, ReLU, softmax',
      art: 'interruptor',
      goal: 'Reconhecer as funções de ativação e suas faixas.',
      explain:
        '- **Degrau**: 0 ou 1. Do perceptron original.\n- **Sigmoide**: de **0 a 1**, lida como probabilidade; sofre com gradiente que desaparece.\n- **Tanh**: de **−1 a 1**, centrada em zero.\n- **ReLU**: **max(0, x)**, de 0 ao infinito. Simples e muito usada em camadas **ocultas**.\n- **Softmax**: valores entre 0 e 1 que **somam 1**. Usada na **saída** em classificação com **várias classes**.',
      check: {
        kind: 'sort',
        id: 'at-c',
        prompt: 'Qual a característica de cada função?',
        categories: ['ReLU', 'Softmax', 'Tanh'],
        items: [
          { text: 'max(0, x), comum nas ocultas', cat: 0, why: 'Zera os negativos.' },
          { text: 'Saídas que somam 1, várias classes', cat: 1, why: 'Probabilidades das classes.' },
          { text: 'De −1 a 1, centrada em zero', cat: 2, why: 'Tangente hiperbólica.' },
        ],
      },
      recovery: {
        explain: 'Associe a imagens. **Degrau**: interruptor (liga ou não). **Sigmoide**: rampa suave de 0 a 1. **ReLU**: "se for negativo, vira zero; se não, passa como está". **Softmax**: divide uma **pizza** entre as classes: as fatias somam 100%.',
        check: {
          kind: 'choice',
          id: 'at-r',
          prompt: 'Quanto vale ReLU(−3)?',
          options: [
            { text: '0', why: 'Isso: max(0, −3).' },
            { text: '−3', why: 'A ReLU zera os negativos.' },
            { text: '3', why: 'Ela não troca o sinal: zera.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'nao-linear',
      part: 'Ativações',
      title: 'Por que precisa ser não linear',
      art: 'alvo',
      goal: 'Entender por que ativações não lineares são essenciais.',
      explain:
        'Sem funções de ativação **não lineares**, várias camadas equivaleriam a **uma única transformação linear**.\n\nOu seja: empilhar dez camadas lineares dá o mesmo poder de **uma só**, e a rede **não resolveria** o XOR nem padrões complexos.\n\nÉ a **não linearidade** (ReLU, sigmoide, tanh) que dá às camadas ocultas o poder de representar curvas e combinações.',
      check: {
        kind: 'choice',
        id: 'nl-c',
        prompt: '"Empilhar camadas lineares sem ativação não linear aumenta o poder da rede." Isso está:',
        options: [
          { text: 'Errado: o resultado continua linear, como uma só camada', why: 'Isso.' },
          { text: 'Certo: mais camadas, mais poder', why: 'Sem não linearidade, as camadas se reduzem a uma.' },
          { text: 'Certo só com softmax na saída', why: 'O problema está nas ocultas lineares.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Dobrar e depois triplicar um número é o mesmo que **multiplicar por seis**: duas operações lineares viram uma só. Assim, dez camadas lineares viram **uma**. Para a rede aprender curvas, cada camada precisa de uma "**dobra**": a ativação não linear.',
        check: {
          kind: 'choice',
          id: 'nl-r',
          prompt: 'Qual destas é uma ativação não linear?',
          options: [
            { text: 'ReLU', why: 'Isso.' },
            { text: 'Multiplicar por 2', why: 'Multiplicar por constante é linear.' },
            { text: 'Somar 5', why: 'Somar constante também é linear.' },
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
      lines: ['Pesos e viés: aprendidos no treino', 'Softmax: saídas que somam 1', 'Perceptron de uma camada resolve o XOR'],
      bug: 2,
      why: 'XOR não é linearmente separável; exige camada oculta.',
      fixed: 'XOR exige camada oculta',
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene a conta de um neurônio.',
      items: ['Multiplicar cada entrada pelo seu peso', 'Somar os produtos e o viés', 'Aplicar a função de ativação'],
      why: 'Pesos, soma com viés, ativação.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a rede deve dizer se uma denúncia é de saúde, obras, educação ou outros, com a probabilidade de cada. Que ativação na saída?',
      options: [
        { text: 'Softmax', why: 'Isso: várias classes, probabilidades que somam 1.' },
        { text: 'Degrau', why: 'O degrau só dá 0 ou 1, sem probabilidades.' },
        { text: 'ReLU', why: 'A ReLU é típica das ocultas.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.008' },
  ],
  summary: [
    'Neurônio: saída = f(soma das entradas × pesos + viés). Pesos e viés são aprendidos.',
    'Camadas: entrada, ocultas (representações intermediárias), saída. Várias ocultas: rede profunda (MLP clássico).',
    'Ativações: degrau (0/1), sigmoide (0 a 1), tanh (−1 a 1), ReLU (max(0, x)), softmax (somam 1, várias classes).',
    'Sem não linearidade, várias camadas valem uma só. XOR exige camada oculta.',
  ],
};

export const iaRedTreino: MicroLesson = {
  ...S,
  id: 'ia.redes.3',
  series: { id: 'ia.redes', order: 3 },
  title: 'Como a rede aprende e as arquiteturas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num jogo de "quente ou frio", você dá passos na direção que esquenta. Isso lembra como a rede ajusta os pesos?',
    options: [
      { text: 'Sim: ela dá passos na direção que diminui o erro', why: 'Isso: é o gradiente descendente. Esta aula mostra o passo a passo.' },
      { text: 'Não: ela sorteia os pesos', why: 'Ela segue a direção que reduz o erro.' },
      { text: 'Não: os pesos nunca mudam', why: 'Treinar é justamente ajustar os pesos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ciclo',
      part: 'Treino',
      title: 'Os quatro passos do treino',
      art: 'trilha',
      goal: 'Ordenar propagação direta, perda, retropropagação e gradiente descendente.',
      explain:
        '1. **Propagação direta** (*forward*): os dados passam pela rede e geram uma **previsão**.\n2. **Função de perda** (*loss*): mede o **erro** (erro quadrático médio na regressão; entropia cruzada na classificação).\n3. **Retropropagação**: calcula, pela **regra da cadeia**, o **gradiente** da perda em relação a cada peso, **da saída para a entrada**.\n4. **Gradiente descendente**: ajusta cada peso no sentido **oposto** ao gradiente.',
      check: {
        kind: 'order',
        id: 'ci-c',
        prompt: 'Ordene os passos de uma rodada de treino.',
        items: ['Propagação direta: gerar a previsão', 'Calcular a perda', 'Retropropagação: calcular os gradientes', 'Gradiente descendente: ajustar os pesos'],
        why: 'Prever, medir o erro, achar a culpa de cada peso, corrigir.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como corrigir uma **redação**: o aluno escreve (**previsão**), o professor dá a nota (**perda**), aponta onde cada parte errou (**retropropagação**) e o aluno reescreve um pouco melhor (**gradiente descendente**). Repete-se muitas vezes.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'A retropropagação:',
          options: [
            { text: 'Calcula os gradientes da perda em relação a cada peso', why: 'Isso.' },
            { text: 'Define quantas camadas a rede terá', why: 'A arquitetura é escolhida antes; ela calcula gradientes.' },
            { text: 'Gera a previsão inicial', why: 'Isso é a propagação direta.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'taxa',
      part: 'Treino',
      title: 'Taxa de aprendizado, época e lotes',
      art: 'degraus',
      goal: 'Entender o efeito da taxa de aprendizado e os termos época, SGD e mini-batch.',
      explain:
        '- **Taxa de aprendizado**: o tamanho do passo. **Alta demais**: o treino **oscila ou diverge**. **Baixa demais**: o treino fica **lento**.\n- **Época**: uma passagem **completa** pelos dados de treino.\n- **SGD** (estocástico): atualiza os pesos **a cada exemplo**.\n- **Mini-batch**: atualiza a cada **pequeno lote**.',
      check: {
        kind: 'choice',
        id: 'tx-c',
        prompt: '"Uma taxa de aprendizado muito alta garante convergência mais rápida e estável." Isso está:',
        options: [
          { text: 'Errado: pode fazer o treino oscilar ou divergir', why: 'Isso.' },
          { text: 'Certo', why: 'Passos grandes demais passam do ponto e oscilam.' },
          { text: 'Certo se houver dropout', why: 'Dropout não resolve passos grandes demais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Descendo um **vale no escuro**: passos **gigantes** fazem você pular de um lado para o outro do fundo sem nunca parar nele (oscila); passos **minúsculos** chegam, mas demoram uma eternidade. A taxa certa fica no meio.',
        check: {
          kind: 'choice',
          id: 'tx-r',
          prompt: 'Uma passagem completa por todos os dados de treino é:',
          options: [
            { text: 'Uma época', why: 'Isso.' },
            { text: 'Um lote', why: 'O lote é só um pedaço dos dados.' },
            { text: 'Uma camada', why: 'Camada é parte da rede, não do treino.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'problemas',
      part: 'Treino',
      title: 'Gradiente que desaparece e dropout',
      art: 'vazio',
      goal: 'Reconhecer o gradiente que desaparece e as defesas contra o overfitting.',
      explain:
        '- **Gradiente que desaparece** (*vanishing gradient*): os gradientes ficam **muito pequenos** nas camadas iniciais, que **quase não aprendem**. Ajudam: **ReLU**, normalização e arquiteturas como **LSTM**.\n- Contra o **overfitting**: **dropout** (desligar neurônios **aleatoriamente** no treino), regularização **L1/L2** e **parada antecipada**.',
      check: {
        kind: 'choice',
        id: 'pb-c',
        prompt: 'Desligar neurônios aleatoriamente durante o treino, para evitar overfitting, é:',
        options: [
          { text: 'Dropout', why: 'Isso.' },
          { text: 'Gradiente que desaparece', why: 'Esse é um problema, não uma técnica.' },
          { text: 'Softmax', why: 'Softmax é ativação de saída.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Num **time**, se o treinador tira jogadores ao acaso nos treinos, ninguém fica dependente de uma estrela: todos aprendem. O **dropout** faz isso com os neurônios. Já o gradiente que desaparece é como um **recado sussurrado** numa fila longa: chega quase mudo ao começo.',
        check: {
          kind: 'choice',
          id: 'pb-r',
          prompt: 'O que ajuda contra o gradiente que desaparece?',
          options: [
            { text: 'ReLU, normalização e arquiteturas como LSTM', why: 'Isso.' },
            { text: 'Aumentar muito a taxa de aprendizado', why: 'Isso pode fazer o treino divergir.' },
            { text: 'Tirar as funções de ativação', why: 'Sem ativação, a rede vira linear.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'arquiteturas',
      part: 'Arquiteturas',
      title: 'CNN, RNN e transformer',
      art: 'rede',
      goal: 'Associar CNN, RNN e transformer aos seus usos.',
      explain:
        '- **CNN** (convolucional): **filtros** percorrem a imagem e detectam **padrões locais**; o *pooling* reduz a dimensão. Uso: **imagens**, como fotos de fiscalização de obras.\n- **RNN** (recorrente): mantém um **estado oculto** que carrega informação dos passos anteriores. Uso: **séries temporais** e texto. **LSTM** e **GRU** lidam melhor com dependências longas.\n- **Transformer**: mecanismo de **atenção**; cada elemento pondera a relevância de todos os outros, **em paralelo**. Base dos **LLMs**.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'Para identificar em fotos de campo se a estrutura de uma escola está concluída, a arquitetura mais tradicional é:',
        options: [
          { text: 'CNN', why: 'Isso: padrões locais em imagens.' },
          { text: 'RNN', why: 'RNNs são associadas a sequências.' },
          { text: 'Q-learning', why: 'Q-learning é algoritmo de reforço.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Associe ao tipo de dado. **Foto** (espaço): a **CNN** passa uma "lupa" por cada pedaço. **Sequência** no tempo: a **RNN** lê um passo de cada vez, lembrando o anterior. **Texto longo**: o **transformer** olha tudo de uma vez e decide no que prestar **atenção**.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Qual a vantagem do transformer sobre a RNN?',
          options: [
            { text: 'Processa a sequência em paralelo e relaciona posições distantes', why: 'Isso.' },
            { text: 'Não precisa de dados', why: 'Precisa, e muito.' },
            { text: 'Só funciona com imagens', why: 'É base dos modelos de linguagem.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'transferencia',
      part: 'Arquiteturas',
      title: 'Aprendizado por transferência',
      art: 'suporte',
      goal: 'Entender o aprendizado por transferência e sua utilidade.',
      explain:
        'Em vez de treinar **do zero**, reaproveita-se um modelo **já treinado** em grande volume de dados e **ajusta-se** para a tarefa nova. É o **aprendizado por transferência** (*transfer learning*) ou **ajuste fino**.\n\nIsso **reduz a necessidade de dados rotulados**, o que é útil para **órgãos públicos com bases pequenas**.',
      check: {
        kind: 'choice',
        id: 'tf-c',
        prompt: 'O Tribunal tem poucas fotos rotuladas de obras. Qual a estratégia mais adequada?',
        options: [
          { text: 'Ajustar um modelo já treinado em muitas imagens', why: 'Isso: transferência.' },
          { text: 'Treinar uma rede enorme do zero só com as poucas fotos', why: 'Com poucos dados, o risco de overfitting é alto.' },
          { text: 'Desistir de usar IA', why: 'A transferência resolve justamente esse caso.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **motorista de carro** aprende a dirigir caminhão muito mais rápido que alguém que nunca dirigiu: ele **transfere** o que já sabe. O modelo pré-treinado já "sabe ver" bordas e formas; só precisa aprender o detalhe novo.',
        check: {
          kind: 'choice',
          id: 'tf-r',
          prompt: 'O aprendizado por transferência reduz:',
          options: [
            { text: 'A necessidade de dados rotulados', why: 'Isso.' },
            { text: 'A necessidade de funções de ativação', why: 'As ativações continuam lá.' },
            { text: 'O número de camadas a zero', why: 'O modelo continua com suas camadas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Que arquitetura combina com cada uso?',
      categories: ['CNN', 'RNN (LSTM)', 'Transformer'],
      items: [
        { text: 'Ler documentos digitalizados', cat: 0, why: 'Imagem.' },
        { text: 'Prever a série de arrecadação mês a mês', cat: 1, why: 'Sequência temporal.' },
        { text: 'Base de um grande modelo de linguagem', cat: 2, why: 'Atenção.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Retropropagação: calcula gradientes', 'Época: passada completa pelos dados', 'Retropropagação: define a arquitetura da rede'],
      bug: 2,
      why: 'Ela calcula os gradientes usados para ajustar os pesos; a arquitetura é escolhida antes.',
      fixed: 'Arquitetura: escolhida antes do treino',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: no treino, a perda sobe e desce sem parar e nunca se estabiliza. Qual ajuste tentar primeiro?',
      options: [
        { text: 'Reduzir a taxa de aprendizado', why: 'Isso: passos menores param de oscilar.' },
        { text: 'Tirar as ativações não lineares', why: 'Isso deixaria a rede linear.' },
        { text: 'Aumentar a taxa de aprendizado', why: 'Pioraria a oscilação.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.006' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.007' },
  ],
  summary: [
    'Treino: propagação direta, perda, retropropagação (gradientes pela regra da cadeia, da saída para a entrada), gradiente descendente.',
    'Taxa alta oscila ou diverge; baixa é lenta. Época: passada completa. SGD por exemplo; mini-batch por lote.',
    'Gradiente que desaparece: ReLU, normalização, LSTM. Overfitting: dropout, L1/L2, parada antecipada.',
    'CNN para imagens; RNN (LSTM, GRU) para sequências; transformer com atenção, em paralelo, base dos LLMs.',
    'Transferência (ajuste fino): reaproveita modelo treinado e reduz a necessidade de dados rotulados.',
  ],
};
