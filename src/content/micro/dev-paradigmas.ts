// Série "Orientação a objetos e programação funcional" (cap.dev.03, trecho paradigmas), no ritmo lento
// com história pedido em 25/10/2026: a primeira aula conta do cálculo lambda ao Java 8; as seguintes
// ensinam classes, pilares, sobrecarga e sobrescrita, composição, depois funções puras, map, filter,
// reduce e closures, uma ideia por etapa. Fatos conferidos com o texto do capítulo (03-paradigmas.md).
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.03', sectionId: 'paradigmas' } as const;

export const devParHistoria: MicroLesson = {
  ...S,
  id: 'dev.paradigmas.1',
  series: { id: 'dev.paradigmas', order: 1 },
  title: 'Do cálculo lambda ao Java 8',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Dá para escrever o mesmo programa organizando tudo em "coisas" com comportamento, ou em funções que transformam dados. São estilos diferentes?',
    options: [
      { text: 'Sim: são paradigmas diferentes', why: 'Isso. Esta aula conta como os dois estilos nasceram.' },
      { text: 'Não: só existe um jeito de programar', why: 'Há vários estilos, chamados paradigmas. Esta aula conta a origem de dois deles.' },
      { text: 'Só muda a cor do editor', why: 'Muda a forma de organizar o programa inteiro.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'church',
      part: 'A história',
      title: 'Anos 1930: tudo é função',
      art: 'abaco',
      goal: 'Saber que o cálculo lambda de Church é a raiz da programação funcional.',
      explain:
        'Antes mesmo dos computadores, nos **anos 1930**, o matemático **Alonzo Church** criou o **cálculo lambda**: um sistema em que **tudo é função**.\n\nEle é a **raiz da programação funcional**.\n\nDele vem também o nome **lambda**, usado até hoje para funções curtas sem nome, como **x => x * 2** em JavaScript.',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'Qual a ideia central do cálculo lambda de Church?',
        options: [
          { text: 'Tudo é função', why: 'Isso: raiz da programação funcional.' },
          { text: 'Tudo é objeto', why: 'Essa ideia vem da orientação a objetos, décadas depois.' },
          { text: 'Tudo é tabela', why: 'Tabelas são do modelo relacional de Codd.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **máquina de suco**: entra laranja, sai suco. Ela não guarda nada nem muda o mundo lá fora; só **transforma** a entrada. No cálculo lambda, todo cálculo é feito com "máquinas" assim, as **funções**.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'De onde vem o nome "lambda" usado para funções curtas?',
          options: [
            { text: 'Do cálculo lambda de Alonzo Church', why: 'Isso.' },
            { text: 'De uma marca de computador', why: 'Vem do cálculo lambda, dos anos 1930.' },
            { text: 'Do Java 8', why: 'O Java 8 só adotou o nome, muito depois.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'lisp',
      part: 'A história',
      title: '1958: Lisp',
      art: 'teclado',
      goal: 'Conhecer o Lisp como uma das primeiras linguagens funcionais.',
      explain:
        'Em **1958**, **John McCarthy** criou o **Lisp**, uma das **primeiras linguagens funcionais**.\n\nNele, **funções são valores**: podem ser guardadas, passadas e devolvidas. E os laços são feitos, muitas vezes, por **recursão**.\n\nIdeias do Lisp vivem hoje em JavaScript, Python e no próprio Java.',
      check: {
        kind: 'choice',
        id: 'li-c',
        prompt: 'O Lisp, de 1958, é lembrado como:',
        options: [
          { text: 'Uma das primeiras linguagens funcionais', why: 'Isso.' },
          { text: 'A primeira linguagem com classes', why: 'Essa foi o Simula, de 1967.' },
          { text: 'Um banco de dados', why: 'É uma linguagem de programação.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No Lisp, uma função é tratada **como qualquer dado**, igual a um número: dá para pôr numa variável, entregar a outra função, receber de volta. Essa ideia, "funções de primeira classe", está hoje em quase toda linguagem.',
        check: {
          kind: 'choice',
          id: 'li-r',
          prompt: 'Quem criou o Lisp?',
          options: [
            { text: 'John McCarthy', why: 'Isso.' },
            { text: 'Alan Kay', why: 'Alan Kay está ligado ao Smalltalk.' },
            { text: 'Alonzo Church', why: 'Church criou o cálculo lambda, nos anos 1930.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'simula',
      part: 'A história',
      title: '1967: classes e objetos',
      art: 'pessoal',
      goal: 'Saber que o Simula trouxe classes e objetos e o Smalltalk popularizou a orientação a objetos.',
      explain:
        'Em **1967**, na **Noruega**, **Ole-Johan Dahl** e **Kristen Nygaard** criaram o **Simula**, a primeira linguagem com **classes** e **objetos**. Queriam **simular filas e sistemas reais**: cada coisa do mundo virava um objeto.\n\nNos **anos 1970**, na **Xerox**, **Alan Kay** e sua equipe criaram o **Smalltalk** e **popularizaram** o termo **orientação a objetos**.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'Qual foi a primeira linguagem com classes e objetos?',
        options: [
          { text: 'Simula (1967)', why: 'Isso.' },
          { text: 'Lisp (1958)', why: 'O Lisp é funcional.' },
          { text: 'FORTRAN (1957)', why: 'O FORTRAN era voltado a fórmulas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Para simular uma **fila de banco**, o Simula criava objetos "cliente", "caixa", "fila", cada um com seus dados e ações. É a mesma ideia de hoje: o sistema do Tribunal tem objetos "processo", "servidor", "documento".',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Quem popularizou o termo "orientação a objetos", com o Smalltalk?',
          options: [
            { text: 'Alan Kay e sua equipe, na Xerox', why: 'Isso, nos anos 1970.' },
            { text: 'John McCarthy', why: 'McCarthy criou o Lisp.' },
            { text: 'Donald Knuth', why: 'Knuth escreveu The Art of Computer Programming.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'gof-java8',
      part: 'A história',
      title: '1994 e 2014: padrões e lambdas',
      art: 'livro',
      goal: 'Situar o livro Design Patterns e o Java 8.',
      explain:
        'Em **1994**, saiu o livro ***Design Patterns***, de Gamma, Helm, Johnson e Vlissides, a **"Gangue dos Quatro"**. Ele reuniu soluções de orientação a objetos e recomendou **preferir composição a herança**.\n\nEm **2014**, o **Java 8** trouxe as **expressões lambda**, aproximando a POO da programação funcional.\n\nHoje, as linguagens modernas **misturam** os dois paradigmas.',
      check: {
        kind: 'order',
        id: 'gj-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Cálculo lambda (anos 1930)', 'Lisp (1958)', 'Simula (1967)', 'Design Patterns (1994)', 'Lambdas no Java 8 (2014)'],
        why: 'Da matemática às linguagens, aos padrões e à mistura dos paradigmas.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Os dois rios correram separados por décadas: o **funcional** (Church, Lisp) e o **orientado a objetos** (Simula, Smalltalk). Em **2014**, com as lambdas do **Java 8**, até a linguagem mais "orientada a objetos" abriu espaço para funções. Hoje os rios se encontram.',
        check: {
          kind: 'choice',
          id: 'gj-r',
          prompt: 'O que o livro Design Patterns recomenda sobre herança?',
          options: [
            { text: 'Preferir composição a herança', why: 'Isso.' },
            { text: 'Usar herança para tudo', why: 'É o contrário: preferir composição.' },
            { text: 'Proibir classes', why: 'O livro é sobre orientação a objetos, com classes.' },
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
      prompt: 'Funcional ou orientado a objetos?',
      categories: ['Funcional', 'Orientado a objetos'],
      items: [
        { text: 'Cálculo lambda', cat: 0, why: 'Tudo é função.' },
        { text: 'Simula', cat: 1, why: 'Classes e objetos.' },
        { text: 'Lisp', cat: 0, why: 'Funções como valores.' },
        { text: 'Smalltalk', cat: 1, why: 'Popularizou a orientação a objetos.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Church: cálculo lambda', 'Dahl e Nygaard: Simula', 'Java 8 (2014): primeira linguagem com classes'],
      bug: 2,
      why: 'A primeira com classes foi o Simula (1967). O Java 8 trouxe as lambdas.',
      fixed: 'Java 8 (2014): expressões lambda',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um código Java usa classes e também lista.stream().filter(x -> x > 10). Que paradigmas estão presentes?',
      options: [
        { text: 'Os dois: orientação a objetos e funcional', why: 'Isso: classes e lambdas.' },
        { text: 'Só orientação a objetos', why: 'O x -> x > 10 é uma lambda, do estilo funcional.' },
        { text: 'Só o funcional', why: 'As classes são da orientação a objetos.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Anos 1930: Church e o cálculo lambda, em que tudo é função; raiz do paradigma funcional.',
    '1958: Lisp, de John McCarthy, uma das primeiras linguagens funcionais.',
    '1967: Simula, de Dahl e Nygaard, primeira com classes e objetos. Anos 1970: Smalltalk, de Alan Kay, popularizou a orientação a objetos.',
    '1994: Design Patterns (composição em vez de herança). 2014: lambdas no Java 8. Hoje os paradigmas se misturam.',
  ],
};

export const devParPoo: MicroLesson = {
  ...S,
  id: 'dev.paradigmas.2',
  series: { id: 'dev.paradigmas', order: 2 },
  title: 'Classes, pilares, sobrecarga e composição',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma forma de bolo faz muitos bolos iguais no formato, mas cada um com seu recheio. Isso lembra que ideia da orientação a objetos?',
    options: [
      { text: 'Classe (a forma) e objetos (os bolos)', why: 'Isso. Esta aula começa por aí e chega aos quatro pilares.' },
      { text: 'Banco de dados', why: 'A forma e os bolos lembram classe e objeto.' },
      { text: 'Laço infinito', why: 'A forma faz quantos bolos você quiser, mas não é laço: é classe.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'classe',
      part: 'Classes',
      title: 'Classe, objeto e construtor',
      art: 'cartao',
      goal: 'Distinguir classe, objeto e construtor.',
      explain:
        '- **Classe**: o **molde**. Define **atributos** (estado) e **métodos** (comportamento).\n- **Objeto**: uma **instância** da classe, criada em execução (em Java, com **new**).\n- **Construtor**: método especial chamado na criação, para **inicializar** o estado.\n\n```\nProcesso p = new Processo("123/2026", 50000.0);\n```\n\n**Processo** é a classe; **p** é o objeto; **Processo(...)** chama o construtor.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'Em "Processo p = new Processo(...)", o que é p?',
        options: [
          { text: 'Um objeto, instância da classe Processo', why: 'Isso.' },
          { text: 'A classe', why: 'A classe é Processo; p é o objeto criado.' },
          { text: 'Um atributo', why: 'p é o objeto inteiro.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **planta da casa** é a classe; cada **casa construída** é um objeto. O **construtor** é o mestre de obras no dia da entrega: põe número na porta, liga a luz. Uma planta, muitas casas.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'O que o construtor faz?',
          options: [
            { text: 'Inicializa o estado do objeto na criação', why: 'Isso.' },
            { text: 'Apaga o objeto', why: 'Ele inicializa; não apaga.' },
            { text: 'Ordena uma lista', why: 'Ordenar é outra coisa.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pilares',
      part: 'Pilares',
      title: 'Os quatro pilares',
      art: 'balanca',
      goal: 'Reconhecer abstração, encapsulamento, herança e polimorfismo.',
      explain:
        '- **Abstração**: representar só o **relevante**. Processo tem número e valor, não a cor da capa.\n- **Encapsulamento**: **esconder** o estado interno e expor operações controladas (**private**, métodos que validam).\n- **Herança**: a subclasse **reaproveita e especializa** a superclasse ("**é um**"): ProcessoLicitatorio **extends** Processo.\n- **Polimorfismo**: o **mesmo comando** produz comportamentos **diferentes** conforme o objeto: **doc.calcularPrazo()** age de um jeito para cada tipo.',
      check: {
        kind: 'sort',
        id: 'pl-c',
        prompt: 'Que pilar é cada situação?',
        categories: ['Encapsulamento', 'Herança', 'Polimorfismo'],
        items: [
          { text: 'Atributo valor é private e só muda por um método que valida', cat: 0, why: 'Esconde o estado.' },
          { text: 'ProcessoLicitatorio extends Processo', cat: 1, why: '"É um".' },
          { text: 'calcularPrazo() dá resultados diferentes para Recurso e Parecer', cat: 2, why: 'Mesmo comando, comportamentos diferentes.' },
        ],
      },
      recovery: {
        explain: 'No **carro**: você vê o volante e os pedais, não o motor (**abstração** e **encapsulamento**). Um carro elétrico **é um** carro (**herança**). "Acelerar" funciona em todos, mas cada motor faz do seu jeito (**polimorfismo**).',
        check: {
          kind: 'choice',
          id: 'pl-r',
          prompt: 'Representar só o que importa para o problema é:',
          options: [
            { text: 'Abstração', why: 'Isso.' },
            { text: 'Herança', why: 'Herança é "é um", reaproveitar uma classe.' },
            { text: 'Polimorfismo', why: 'Polimorfismo é o mesmo comando com comportamentos diferentes.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'interface',
      part: 'Pilares',
      title: 'Classe abstrata e interface',
      art: 'livro',
      goal: 'Distinguir classe abstrata de interface em Java.',
      explain:
        '- **Classe abstrata**: **não pode ser instanciada**. Pode ter métodos **abstratos** (sem corpo) e **concretos**.\n- **Interface**: define um **contrato** que as classes implementam.\n\nEm Java, uma classe **estende uma** superclasse, mas pode **implementar várias** interfaces.\n\nDesde o **Java 8**, interfaces podem ter métodos **default**, com corpo.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Em Java, uma classe pode:',
        options: [
          { text: 'Estender uma superclasse e implementar várias interfaces', why: 'Isso.' },
          { text: 'Estender várias classes e implementar uma interface', why: 'É o contrário.' },
          { text: 'Ser instanciada mesmo sendo abstrata', why: 'Classe abstrata não pode ser instanciada.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Em Java, um filho tem **um pai só** (uma superclasse), mas pode assinar **vários contratos** (interfaces): "sei imprimir", "sei exportar", "sei assinar". A classe abstrata é um **pai incompleto**: só existe através dos filhos.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Desde o Java 8, interfaces podem ter:',
          options: [
            { text: 'Métodos default, com corpo', why: 'Isso.' },
            { text: 'Construtores para criar objetos', why: 'Interfaces não são instanciadas.' },
            { text: 'Nada além de constantes', why: 'Desde o Java 8, podem ter métodos default.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sobre',
      part: 'Polimorfismo',
      title: 'Sobrecarga ou sobrescrita',
      art: 'degraus',
      goal: 'Diferenciar sobrecarga de sobrescrita.',
      explain:
        '- **Sobrecarga** (*overloading*): mesma classe, **mesmo nome, parâmetros diferentes**. Resolvida na **compilação**. Ex.: calcular(int) e calcular(int, double).\n- **Sobrescrita** (*overriding*): numa **subclasse**, **mesmo nome e mesmos parâmetros**. Resolvida na **execução** (ligação dinâmica).\n\n```\nDocumento d = new Recurso();\nd.prazo(); // 15: vale o objeto real\n```\n\nMudar **só o tipo de retorno** não é sobrecarga em Java: o compilador rejeita.',
      check: {
        kind: 'choice',
        id: 'so-c',
        prompt: 'Recurso redefine double prazo() de Documento. Em "Documento d = new Recurso(); d.prazo();" roda o de Recurso. Isso é:',
        options: [
          { text: 'Sobrescrita, resolvida em execução', why: 'Isso.' },
          { text: 'Sobrecarga, resolvida em compilação', why: 'Os parâmetros são iguais e o método é escolhido pelo objeto real: sobrescrita.' },
          { text: 'Encapsulamento', why: 'Encapsulamento é esconder o estado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Sobre-CARGA**: mais **carga** de parâmetros diferentes no mesmo nome (o compilador escolhe pelos argumentos). **Sobre-ESCRITA**: o filho **escreve por cima** do método do pai, com a mesma assinatura (escolhido pelo objeto real, ao rodar).',
        check: {
          kind: 'choice',
          id: 'so-r',
          prompt: '"Sobrecarga é resolvida em tempo de execução." Isso está:',
          options: [
            { text: 'Errado: é resolvida na compilação', why: 'Isso. Quem é resolvida na execução é a sobrescrita.' },
            { text: 'Certo', why: 'A sobrecarga é escolhida pelos parâmetros, na compilação.' },
            { text: 'Certo só com interfaces', why: 'A regra não depende de interfaces.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'composicao',
      part: 'Composição',
      title: 'Prefira composição a herança',
      art: 'pessoal',
      goal: 'Distinguir composição de herança e reconhecer coesão e acoplamento.',
      explain:
        '- **Herança** expressa "**é um**" e cria **acoplamento forte**: mudar a superclasse afeta todas as subclasses.\n- **Composição** expressa "**tem um**": o objeto guarda referências a outros e **delega**.\n\nUm **Relatorio** que **tem um** **Exportador** (PDF, CSV) troca o formato **sem** criar RelatorioPdf, RelatorioCsv.\n\nCritérios de qualidade: **alta coesão** (uma responsabilidade clara) e **baixo acoplamento** (dependências mínimas).',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Relatorio mantém uma referência a um Exportador e delega a ele, em vez de criar subclasses. Isso é:',
        options: [
          { text: 'Composição, relação "tem um"', why: 'Isso.' },
          { text: 'Herança, relação "é um"', why: 'Não há subclasse; há um objeto que tem outro.' },
          { text: 'Sobrecarga', why: 'Não se trata de métodos com parâmetros diferentes.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **carro tem um** motor: dá para trocar o motor sem fabricar um novo modelo de carro. Isso é composição. Se cada motor exigisse um "CarroComMotorX" diferente (herança), surgiriam dezenas de classes para cada combinação.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Quais são os dois critérios de qualidade citados?',
          options: [
            { text: 'Alta coesão e baixo acoplamento', why: 'Isso.' },
            { text: 'Baixa coesão e alto acoplamento', why: 'É o contrário.' },
            { text: 'Muita herança e pouca composição', why: 'A recomendação é preferir composição.' },
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
      lines: ['Composição: "tem um"', 'Herança: "é um"', 'Sobrecarga: mesmos parâmetros, numa subclasse'],
      bug: 2,
      why: 'Mesmos parâmetros numa subclasse é sobrescrita. Sobrecarga muda os parâmetros.',
      fixed: 'Sobrecarga: mesmo nome, parâmetros diferentes',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Sobrecarga ou sobrescrita?',
      categories: ['Sobrecarga', 'Sobrescrita'],
      items: [
        { text: 'calcular(int) e calcular(int, double)', cat: 0, why: 'Parâmetros diferentes.' },
        { text: '@Override double taxa() em ContaEspecial', cat: 1, why: 'Mesma assinatura na subclasse.' },
        { text: 'Escolhido em tempo de compilação', cat: 0, why: 'Polimorfismo estático.' },
        { text: 'Escolhido conforme o objeto real', cat: 1, why: 'Ligação dinâmica.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual desenho permite trocar o formato de exportação sem criar uma classe por combinação?',
      scenarios: [
        { title: 'Desenho A', body: 'RelatorioPdf extends Relatorio; RelatorioCsv extends Relatorio; RelatorioPdfAssinado...' },
        { title: 'Desenho B', body: 'Relatorio tem um Exportador; basta passar ExportadorPdf ou ExportadorCsv.' },
      ],
      answer: 1,
      why: 'B usa composição: troca o comportamento sem multiplicar subclasses.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.010' },
  ],
  summary: [
    'Classe é o molde (atributos e métodos); objeto é a instância (new); construtor inicializa.',
    'Pilares: abstração, encapsulamento, herança ("é um") e polimorfismo.',
    'Classe abstrata não se instancia; em Java, uma superclasse e várias interfaces; interfaces com default desde o Java 8.',
    'Sobrecarga: parâmetros diferentes, compilação. Sobrescrita: mesma assinatura na subclasse, execução.',
    'Composição ("tem um") em vez de herança; alta coesão e baixo acoplamento.',
  ],
};

export const devParFuncional: MicroLesson = {
  ...S,
  id: 'dev.paradigmas.3',
  series: { id: 'dev.paradigmas', order: 3 },
  title: 'Funções puras, map, filter, reduce e closures',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma calculadora sempre dá 4 para 2 + 2, e não muda nada fora dela. Isso é uma boa qualidade para uma função?',
    options: [
      { text: 'Sim: é previsível e não causa surpresas', why: 'Isso. Na programação funcional, isso se chama função pura.' },
      { text: 'Não: funções devem mudar coisas fora', why: 'Às vezes precisam, mas a pureza traz previsibilidade. Esta aula mostra por quê.' },
      { text: 'Tanto faz', why: 'Faz diferença: funções previsíveis são mais fáceis de testar.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'pura',
      part: 'Funções',
      title: 'Função pura e efeito colateral',
      art: 'balanca',
      goal: 'Reconhecer função pura e efeito colateral.',
      explain:
        '- **Função pura**: para a **mesma entrada**, devolve **sempre a mesma saída** e **não produz efeitos colaterais**. Isso dá **transparência referencial**: a chamada pode ser trocada pelo resultado.\n- **Efeito colateral**: qualquer mudança **observável fora** da função: alterar variável global, **gravar em arquivo ou banco**, **escrever no console**, fazer **requisição de rede**.\n\nUma função que **grava log** a cada chamada **não é pura**.',
      check: {
        kind: 'choice',
        id: 'pu-c',
        prompt: 'Uma função calcula o imposto e também grava uma linha de log. Ela é pura?',
        options: [
          { text: 'Não: gravar log é efeito colateral', why: 'Isso.' },
          { text: 'Sim: o cálculo está certo', why: 'Estar certo não basta; gravar log muda algo fora.' },
          { text: 'Sim, se o log for pequeno', why: 'Qualquer gravação é efeito colateral.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à **máquina de suco**: entra laranja, sai suco, **sempre igual**, e ela não mexe em nada da cozinha. Se, a cada suco, ela também **anotasse num caderno**, já mexeu em algo fora: efeito colateral.',
        check: {
          kind: 'choice',
          id: 'pu-r',
          prompt: 'Qual destas é efeito colateral?',
          options: [
            { text: 'Fazer uma requisição de rede', why: 'Isso.' },
            { text: 'Somar dois parâmetros e devolver o resultado', why: 'Isso é cálculo puro.' },
            { text: 'Devolver o maior de dois números', why: 'Isso é cálculo puro.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'imutavel',
      part: 'Funções',
      title: 'Imutabilidade e funções de primeira classe',
      art: 'cadeado',
      goal: 'Entender imutabilidade, funções de primeira classe e de alta ordem.',
      explain:
        '- **Imutabilidade**: em vez de **alterar** um dado, cria-se uma **nova versão**. Evita surpresas quando o mesmo objeto é compartilhado.\n- **Funções de primeira classe**: funções são **valores**; podem ir para variáveis, ser **passadas** e **devolvidas**.\n- **Funções de alta ordem**: **recebem ou devolvem** funções. Exemplos clássicos: **map**, **filter** e **reduce**.',
      check: {
        kind: 'choice',
        id: 'im-c',
        prompt: 'Uma função que recebe outra função como argumento é chamada de:',
        options: [
          { text: 'Função de alta ordem', why: 'Isso, como map, filter e reduce.' },
          { text: 'Construtor', why: 'Construtor inicializa objetos.' },
          { text: 'Efeito colateral', why: 'Efeito colateral é mudar algo fora da função.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Imutável** é como um **documento assinado**: não se rasura; faz-se uma **nova versão**. E função de **alta ordem** é como um **gerente** que recebe uma **instrução** ("confira o valor de cada nota") e a aplica a toda a pilha.',
        check: {
          kind: 'choice',
          id: 'im-r',
          prompt: 'Na imutabilidade, para "mudar" um dado, o que se faz?',
          options: [
            { text: 'Cria-se uma nova versão', why: 'Isso.' },
            { text: 'Altera-se o original', why: 'É justamente o que se evita.' },
            { text: 'Apaga-se o dado', why: 'Cria-se nova versão; não se apaga.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'mfr',
      part: 'map, filter, reduce',
      title: 'map, filter e reduce',
      art: 'trilha',
      goal: 'Aplicar map, filter e reduce e saber o tamanho do resultado de cada um.',
      explain:
        '- **map**: **transforma** cada elemento; novo vetor do **mesmo tamanho**.\n- **filter**: **mantém** os que passam no teste; **zero ou mais** elementos.\n- **reduce**: **combina** tudo em **um** valor, a partir de um acumulador inicial.\n\n```\nconst v = [10, 25, 40, 5];\nconst r = v.filter(x => x > 15)\n  .map(x => x * 2)\n  .reduce((a, x) => a + x, 0);\n```\n\nfilter dá [25, 40]; map dá [50, 80]; reduce dá **130**. O vetor **v** continua **[10, 25, 40, 5]**.',
      check: {
        kind: 'choice',
        id: 'mf-c',
        prompt: 'No exemplo, quais são o valor de r e o conteúdo de v?',
        options: [
          { text: '130 e [10, 25, 40, 5]', why: 'Isso: o original não é alterado.' },
          { text: '130 e [50, 80]', why: 'filter e map criam vetores novos; v não muda.' },
          { text: '160 e [10, 25, 40, 5]', why: 'O 10 e o 5 foram filtrados antes: 50 + 80 = 130.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça em três passos, no papel. **filter** (maior que 15): sobram 25 e 40. **map** (vezes 2): 50 e 80. **reduce** (somar a partir de 0): 130. Em nenhum passo o vetor original foi riscado: cada função entregou um **vetor novo**.',
        check: {
          kind: 'choice',
          id: 'mf-r',
          prompt: '"O filter sempre devolve um vetor do mesmo tamanho do original." Isso está:',
          options: [
            { text: 'Errado: quem mantém o tamanho é o map', why: 'Isso. O filter pode devolver menos.' },
            { text: 'Certo', why: 'O filter descarta os que não passam no teste.' },
            { text: 'Certo se não houver NULL', why: 'O tamanho depende do teste, não de NULL.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'closure',
      part: 'Closures',
      title: 'Closure: a função que lembra',
      art: 'livro',
      goal: 'Entender o que é closure.',
      explain:
        'Uma **closure** (fechamento) é uma função que **lembra** as variáveis do escopo onde foi criada, **mesmo depois** que esse escopo terminou.\n\n```\nfunction criaContador() {\n  let n = 0;\n  return () => ++n;\n}\nconst prox = criaContador();\nprox(); // 1\nprox(); // 2\n```\n\nClosures permitem **esconder estado** (um tipo de encapsulamento) e criar funções configuradas.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'No exemplo, quanto devolve a terceira chamada de prox()?',
        options: [
          { text: '3', why: 'Isso: a closure lembra n e soma 1 a cada chamada.' },
          { text: '1', why: 'n não volta a 0: a closure lembra o valor anterior.' },
          { text: 'Dá erro, porque criaContador já terminou', why: 'A closure mantém n vivo mesmo depois.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **cofrinho** que só a própria função consegue abrir. criaContador cria o cofrinho com 0 e entrega uma função que, a cada uso, põe mais uma moeda e diz quantas tem. Ninguém de fora mexe no cofrinho: é estado **escondido**.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'O que a closure "lembra"?',
          options: [
            { text: 'As variáveis do escopo onde foi criada', why: 'Isso.' },
            { text: 'Todas as variáveis do computador', why: 'Só as do escopo em que nasceu.' },
            { text: 'Nada: funções não guardam estado', why: 'A closure guarda justamente isso.' },
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
      prompt: 'Qual função usar em cada caso?',
      categories: ['map', 'filter', 'reduce'],
      items: [
        { text: 'Converter todos os valores de reais para centavos', cat: 0, why: 'Transforma cada um.' },
        { text: 'Ficar só com os contratos da SEDUC', cat: 1, why: 'Mantém os que passam.' },
        { text: 'Somar todos os valores', cat: 2, why: 'Combina em um.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Função pura: mesma entrada, mesma saída', 'map: mesmo tamanho do original', 'Gravar log mantém a função pura'],
      bug: 2,
      why: 'Gravar log é efeito colateral: a função deixa de ser pura.',
      fixed: 'Gravar log é efeito colateral',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: const multiplicaPor = k => x => x * k; const dobro = multiplicaPor(2); Quanto vale dobro(7)?',
      options: [
        { text: '14', why: 'Isso: a closure lembra k = 2.' },
        { text: '9', why: 'É multiplicação, não soma: 7 × 2.' },
        { text: '2', why: 'dobro recebe 7 e multiplica pelo k lembrado.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.012' },
  ],
  summary: [
    'Função pura: mesma entrada, mesma saída, sem efeitos colaterais (transparência referencial).',
    'Efeito colateral: global, arquivo, banco, console, rede. Gravar log não é puro.',
    'Imutabilidade: nova versão em vez de alterar. Funções de primeira classe e de alta ordem.',
    'map: mesmo tamanho; filter: zero ou mais; reduce: um valor. O original não muda.',
    'Closure: lembra as variáveis do escopo de criação; esconde estado.',
  ],
};
