// Série "Java e Python" (cap.dev.04, trecho java-python), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta o nascimento das duas linguagens; as seguintes ensinam a
// plataforma Java, as exceções e o Python para automação, uma ideia por etapa. Fatos conferidos com
// o texto do capítulo (01-java-python.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.04', sectionId: 'java-python' } as const;

export const devJpHistoria: MicroLesson = {
  ...S,
  id: 'dev.javapy.1',
  series: { id: 'dev.javapy', order: 1 },
  title: 'Como nasceram o Java e o Python',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O mesmo programa Java roda no Windows, no Linux e no Mac sem ser reescrito. Isso foi planejado desde o começo?',
    options: [
      { text: 'Sim: era a promessa "escreva uma vez, execute em qualquer lugar"', why: 'Isso. Esta aula conta de onde veio essa ideia e também o Python.' },
      { text: 'Não, foi um acaso', why: 'Foi o objetivo central do projeto.' },
      { text: 'Não roda; é preciso reescrever', why: 'Roda em qualquer sistema com a máquina virtual Java.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'python',
      part: 'A história',
      title: '1991: o Python',
      art: 'teclado',
      goal: 'Saber quem criou o Python e qual era a ideia.',
      explain:
        'No fim de **1989**, o holandês **Guido van Rossum** começou a criar uma linguagem como passatempo. A primeira versão pública do **Python** saiu em **1991**.\n\nO nome não vem da cobra: vem do grupo de humor britânico **Monty Python**.\n\nA ideia era um código **fácil de ler**: os blocos são marcados pela **indentação**, sem chaves.',
      check: {
        kind: 'choice',
        id: 'py-c',
        prompt: 'Como o Python marca os blocos de código?',
        options: [
          { text: 'Pela indentação', why: 'Isso.' },
          { text: 'Por chaves', why: 'Chaves são de Java e JavaScript.' },
          { text: 'Por números de linha', why: 'O Python usa indentação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Num **sumário de livro**, os subitens ficam **recuados** sob o item principal: o recuo mostra quem pertence a quem. O Python faz o mesmo com o código: o recuo (4 espaços, pelo guia PEP 8) é o bloco.',
        check: {
          kind: 'choice',
          id: 'py-r',
          prompt: 'Quem criou o Python?',
          options: [
            { text: 'Guido van Rossum', why: 'Isso.' },
            { text: 'James Gosling', why: 'Gosling é do Java.' },
            { text: 'Brendan Eich', why: 'Eich é do JavaScript.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'java',
      part: 'A história',
      title: '1995: o Java',
      art: 'computador',
      goal: 'Saber quem criou o Java e qual era a promessa.',
      explain:
        'Em **1991**, na **Sun Microsystems**, a equipe de **James Gosling** começou um projeto para aparelhos eletrônicos. Dele nasceu o **Java**, lançado em **1995**.\n\nA promessa era "**escreva uma vez, execute em qualquer lugar**": o programa é compilado para um código intermediário, o **bytecode**, e roda em qualquer sistema que tenha a **máquina virtual Java** (JVM).\n\nEm **2010**, a **Oracle** comprou a Sun.',
      check: {
        kind: 'choice',
        id: 'ja-c',
        prompt: 'O que torna o Java portável entre sistemas?',
        options: [
          { text: 'O bytecode executado pela JVM', why: 'Isso.' },
          { text: 'Ser reescrito para cada sistema', why: 'A ideia é justamente não reescrever.' },
          { text: 'Rodar só no navegador', why: 'O Java roda na JVM, em qualquer sistema.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **tomada universal**: o aparelho (bytecode) é um só, e cada país tem o seu **adaptador** (a JVM do sistema). Com o adaptador certo, o aparelho funciona em qualquer lugar.',
        check: {
          kind: 'choice',
          id: 'ja-r',
          prompt: 'Em que empresa o Java foi criado?',
          options: [
            { text: 'Sun Microsystems', why: 'Isso; a Oracle a comprou em 2010.' },
            { text: 'Microsoft', why: 'A Microsoft criou o TypeScript, entre outros.' },
            { text: 'Netscape', why: 'A Netscape criou o JavaScript.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'diferencas',
      part: 'Hoje',
      title: 'Parecidas e diferentes',
      art: 'balanca',
      goal: 'Comparar Java e Python na tipagem e na execução.',
      explain:
        'As duas são **orientadas a objetos** e muito usadas em órgãos públicos. Mas diferem:\n\n- **Java**: tipagem **estática** (o tipo é declarado e conferido na compilação); compilado para bytecode pelo `javac`;\n- **Python**: tipagem **dinâmica e forte** (o tipo pertence ao valor, e não há conversão implícita); interpretado pelo CPython.\n\nO edital pede **Java (conceitos básicos)** e **Python para automação e back-end**.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Qual afirmação está correta?',
        options: [
          { text: 'Java tem tipagem estática; Python, dinâmica e forte', why: 'Isso.' },
          { text: 'Python tem tipagem estática', why: 'No Python o tipo pertence ao valor: dinâmica.' },
          { text: 'Java não é orientado a objetos', why: 'As duas são orientadas a objetos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No **Java**, cada **gaveta** tem uma etiqueta fixa ("só inteiros") conferida antes de usar. No **Python**, a gaveta aceita qualquer coisa, mas **cada objeto** sabe o que é, e misturar texto com número dá erro.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: 'Em Python, "1" + 1 resulta em:',
          options: [
            { text: 'TypeError', why: 'Isso: tipagem forte, sem conversão implícita.' },
            { text: '2', why: 'O Python não converte texto em número sozinho.' },
            { text: '"11"', why: 'Isso aconteceria em JavaScript, não em Python.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['Guido começa o Python (1989)', 'Primeira versão do Python (1991)', 'Lançamento do Java (1995)', 'Oracle compra a Sun (2010)'],
      why: 'Das duas linguagens à mudança de dono do Java.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada característica é do Java ou do Python?',
      categories: ['Java', 'Python'],
      items: [
        { text: 'Bytecode na JVM', cat: 0, why: 'Compilado pelo javac.' },
        { text: 'Tipagem estática', cat: 0, why: 'Tipos conferidos na compilação.' },
        { text: 'Blocos por indentação', cat: 1, why: 'Sem chaves.' },
        { text: 'Criado por Guido van Rossum', cat: 1, why: 'Desde 1991.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Java: escreva uma vez, execute em qualquer lugar', 'Python: nome vem do Monty Python', 'Python: tipagem fraca, converte "1" + 1 em 2'],
      bug: 2,
      why: 'A tipagem do Python é forte: "1" + 1 gera TypeError.',
      fixed: 'Python: tipagem dinâmica e forte',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1991: primeira versão do Python, de Guido van Rossum; blocos por indentação.',
    '1995: Java, da Sun (James Gosling); bytecode na JVM: escreva uma vez, execute em qualquer lugar. 2010: Oracle compra a Sun.',
    'Java: tipagem estática. Python: dinâmica e forte.',
  ],
};

export const devJpJava: MicroLesson = {
  ...S,
  id: 'dev.javapy.2',
  series: { id: 'dev.javapy', order: 2 },
  title: 'A plataforma Java',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A JVM executa diretamente o arquivo .java que o programador escreveu?',
    options: [
      { text: 'Não: executa o bytecode (.class) gerado pelo javac', why: 'Isso. Esta aula percorre a plataforma.' },
      { text: 'Sim, linha por linha', why: 'Pegadinha: a JVM executa bytecode, não o fonte.' },
      { text: 'Sim, depois de convertê-lo em Python', why: 'Não há conversão para Python.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'jvm',
      part: 'A plataforma',
      title: 'javac, bytecode, JVM, JRE e JDK',
      art: 'engrenagem',
      goal: 'Seguir o caminho do código-fonte até a execução.',
      explain:
        'O caminho:\n\n1. o `javac` compila o `.java` para **bytecode** (`.class`);\n2. a **JVM** executa o bytecode; o compilador **JIT** traduz trechos frequentes para código de máquina.\n\nAs siglas:\n\n- **JVM**: máquina virtual que executa bytecode;\n- **JRE**: JVM e bibliotecas padrão;\n- **JDK**: JRE, `javac` e ferramentas.\n\nA memória é liberada pelo **coletor de lixo**.',
      check: {
        kind: 'choice',
        id: 'jv-c',
        prompt: 'Para compilar código Java, é preciso ter:',
        options: [
          { text: 'O JDK, que inclui o javac', why: 'Isso.' },
          { text: 'Só a JVM', why: 'A JVM só executa; quem compila é o javac, do JDK.' },
          { text: 'Só o JRE', why: 'O JRE executa; o compilador vem no JDK.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **caixa dentro da outra**: a **JVM** está dentro do **JRE**, que está dentro do **JDK**. Quem só quer **rodar** precisa do JRE. Quem quer **programar** precisa do JDK, que traz o compilador.',
        check: {
          kind: 'choice',
          id: 'jv-r',
          prompt: 'O que faz o coletor de lixo?',
          options: [
            { text: 'Remove objetos sem referências', why: 'Isso: libera a memória automaticamente.' },
            { text: 'Apaga arquivos .class antigos', why: 'Ele trabalha na memória, com objetos.' },
            { text: 'Compila o código', why: 'Quem compila é o javac.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tipos',
      part: 'Os tipos',
      title: 'Primitivos e referências',
      art: 'dados',
      goal: 'Distinguir primitivos de referências e == de equals().',
      explain:
        'Java tem **oito primitivos**, que guardam o valor direto: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`.\n\nTodo o resto (objetos, vetores, `String`) é **referência**: a variável guarda **onde** o objeto está. Por isso, em objetos:\n\n- `==` compara **referências** (é o mesmo objeto?);\n- `equals()` compara **conteúdo**.\n\n`String` é **imutável**. Java passa argumentos **por valor**; em objetos, o valor copiado é a referência.',
      check: {
        kind: 'choice',
        id: 'ti-c',
        prompt: 'Para saber se duas Strings têm o mesmo texto, usa-se:',
        options: [
          { text: 'equals()', why: 'Isso: compara o conteúdo.' },
          { text: '==', why: 'Em objetos, == compara se é o mesmo objeto.' },
          { text: '=', why: '= é atribuição.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Duas **cópias do mesmo edital** têm o **mesmo texto** (equals é verdadeiro), mas são **folhas diferentes** (== é falso). O == pergunta "é a mesma folha?"; o equals pergunta "diz a mesma coisa?".',
        check: {
          kind: 'choice',
          id: 'ti-r',
          prompt: 'Quantos tipos primitivos o Java tem?',
          options: [
            { text: 'Oito', why: 'Isso.' },
            { text: 'Quatro', why: 'São oito: byte, short, int, long, float, double, char, boolean.' },
            { text: 'Doze', why: 'São oito.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'modificadores',
      part: 'Acesso',
      title: 'private, padrão, protected, public',
      art: 'cadeado',
      goal: 'Saber quem acessa cada modificador.',
      explain:
        '| Modificador | Alcance |\n|---|---|\n| `private` | só a classe |\n| padrão (sem palavra) | classe e pacote |\n| `protected` | pacote e subclasses de outros pacotes |\n| `public` | qualquer lugar |\n\nOutros: `static` (da classe, não do objeto), `final` (não reatribui, não sobrescreve, não estende) e `abstract`.',
      check: {
        kind: 'choice',
        id: 'mo-c',
        prompt: 'O modificador protected permite acesso por:',
        options: [
          { text: 'Classes do mesmo pacote e subclasses de outros pacotes', why: 'Isso.' },
          { text: 'Só a própria classe', why: 'Isso é private.' },
          { text: 'Só subclasses, nunca o pacote', why: 'Pegadinha: o pacote também acessa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **portas de um prédio**: **private** é o quarto (só você); **padrão** é o apartamento (a família, o pacote); **protected** é o apartamento mais os **filhos** que moram fora (subclasses); **public** é a portaria (todos).',
        check: {
          kind: 'choice',
          id: 'mo-r',
          prompt: 'Uma classe declarada final:',
          options: [
            { text: 'Não pode ser estendida', why: 'Isso.' },
            { text: 'Não pode ter métodos', why: 'Pode ter métodos; não pode ter subclasses.' },
            { text: 'É sempre abstrata', why: 'final e abstract se opõem.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene do código à execução.',
      items: ['Escrever o .java', 'Compilar com javac', 'Gerar o bytecode .class', 'Executar na JVM'],
      why: 'Fonte, compilação, bytecode e máquina virtual.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada item é primitivo ou referência?',
      categories: ['Primitivo', 'Referência'],
      items: [
        { text: 'int', cat: 0, why: 'Guarda o valor.' },
        { text: 'boolean', cat: 0, why: 'Guarda o valor.' },
        { text: 'String', cat: 1, why: 'É objeto.' },
        { text: 'Integer', cat: 1, why: 'É a classe wrapper.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['JDK inclui o javac', 'equals() compara conteúdo', 'A JVM executa o arquivo .java'],
      bug: 2,
      why: 'A JVM executa o bytecode .class gerado pelo javac.',
      fixed: 'A JVM executa o bytecode .class',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.001' }],
  summary: [
    'javac compila o .java em bytecode .class; a JVM executa, com JIT. JRE = JVM + bibliotecas; JDK = JRE + javac.',
    'Oito primitivos; o resto é referência. Em objetos, == compara referências e equals() compara conteúdo. String é imutável.',
    'private (classe), padrão (pacote), protected (pacote e subclasses), public (todos). final, static, abstract.',
  ],
};

export const devJpExcecoes: MicroLesson = {
  ...S,
  id: 'dev.javapy.3',
  series: { id: 'dev.javapy', order: 3 },
  title: 'Exceções em Java',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um método lê um arquivo e pode lançar IOException. O compilador deixa ignorar isso?',
    options: [
      { text: 'Não: é preciso tratar ou declarar a exceção', why: 'Isso: é uma exceção checked. Esta aula explica.' },
      { text: 'Sim, sempre', why: 'Exceções checked obrigam tratamento ou declaração.' },
      { text: 'Sim, se o arquivo existir', why: 'O compilador não sabe se o arquivo existe; exige o tratamento.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'hierarquia',
      part: 'A família',
      title: 'Throwable, Error e Exception',
      art: 'degraus',
      goal: 'Situar Error, Exception e RuntimeException na hierarquia.',
      explain:
        'Todas as exceções descendem de **Throwable**, que se divide em:\n\n- **Error**: falhas graves da JVM, como `OutOfMemoryError`;\n- **Exception**: problemas que o programa pode tratar.\n\nDentro de Exception há um ramo especial, **RuntimeException**, com `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException` e `IllegalArgumentException`.',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'NullPointerException descende de:',
        options: [
          { text: 'RuntimeException', why: 'Isso.' },
          { text: 'Error', why: 'Error é para falhas graves da JVM.' },
          { text: 'IOException', why: 'IOException é de entrada e saída.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **árvore genealógica**: o avô é **Throwable**; os filhos são **Error** (doenças graves, fora do seu controle) e **Exception** (problemas tratáveis). Um dos netos de Exception é **RuntimeException**, que tem seus próprios filhos, como o NullPointerException.',
        check: {
          kind: 'choice',
          id: 'hi-r',
          prompt: 'OutOfMemoryError é:',
          options: [
            { text: 'Um Error, falha grave da JVM', why: 'Isso.' },
            { text: 'Uma Exception checked', why: 'É um Error.' },
            { text: 'Uma RuntimeException', why: 'É um Error, não uma Exception.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'checked',
      part: 'Checked e unchecked',
      title: 'Quem o compilador obriga a tratar',
      art: 'balanca',
      goal: 'Distinguir exceções checked de unchecked.',
      explain:
        '- **Checked**: subclasses de Exception que **não** são RuntimeException, como `IOException` e `SQLException`. O compilador **obriga** a tratar com `try/catch` ou declarar com `throws`;\n- **Unchecked**: **RuntimeException** e suas subclasses, além de **Error**. O tratamento é **opcional**.\n\nRegra prática: problemas **externos** (arquivo, banco) costumam ser checked; **erros de programação** (nulo, índice), unchecked.',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'Um método usa FileReader, que pode lançar IOException. Para compilar, ele deve:',
        options: [
          { text: 'Tratar com try/catch ou declarar com throws', why: 'Isso.' },
          { text: 'Não fazer nada', why: 'IOException é checked: o compilador exige.' },
          { text: 'Ser declarado static', why: 'static não tem relação com exceções.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O compilador é um **fiscal de obra** que olha só para os **riscos previsíveis**: "vai ler arquivo? Mostre o plano para quando o arquivo faltar". Para **erros de descuido** (um nulo), ele não pede plano: são unchecked.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'ArithmeticException (divisão por zero) é:',
          options: [
            { text: 'Unchecked', why: 'Isso: é subclasse de RuntimeException.' },
            { text: 'Checked', why: 'É RuntimeException, portanto unchecked.' },
            { text: 'Um Error', why: 'É uma Exception, do ramo RuntimeException.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'try',
      part: 'Tratamento',
      title: 'try, catch, finally e recursos',
      art: 'revisao',
      goal: 'Entender o fluxo de try, catch, finally e try-with-resources.',
      explain:
        '```java\ntry (BufferedReader r = new BufferedReader(new FileReader("contratos.csv"))) {\n    System.out.println(r.readLine());\n} catch (IOException e) {\n    System.err.println("Falha: " + e.getMessage());\n} finally {\n    System.out.println("executa sempre");\n}\n```\n\n- **try**: o código que pode falhar;\n- **catch**: o que fazer se falhar;\n- **finally**: executa **sempre**, com ou sem erro;\n- o **try-with-resources** (desde o Java 7) **fecha sozinho** recursos `AutoCloseable`.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Quando o bloco finally executa?',
        options: [
          { text: 'Sempre, com ou sem exceção', why: 'Isso.' },
          { text: 'Só quando há exceção', why: 'Isso seria o catch.' },
          { text: 'Nunca, se houver catch', why: 'O finally executa mesmo havendo catch.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Numa **cirurgia**: o **try** é a operação; o **catch** é o plano para uma complicação; o **finally** é **lavar as mãos no fim**, que acontece dê certo ou não. O try-with-resources é a enfermeira que **guarda os instrumentos** sozinha.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'O que o try-with-resources faz?',
          options: [
            { text: 'Fecha automaticamente recursos AutoCloseable', why: 'Isso.' },
            { text: 'Ignora todas as exceções', why: 'Ele fecha recursos; as exceções seguem tratadas.' },
            { text: 'Torna a exceção unchecked', why: 'Não muda o tipo da exceção.' },
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
      prompt: 'Cada exceção é checked ou unchecked?',
      categories: ['Checked', 'Unchecked'],
      items: [
        { text: 'IOException', cat: 0, why: 'Exception fora de RuntimeException.' },
        { text: 'SQLException', cat: 0, why: 'Exception fora de RuntimeException.' },
        { text: 'NullPointerException', cat: 1, why: 'RuntimeException.' },
        { text: 'IllegalArgumentException', cat: 1, why: 'RuntimeException.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['finally: executa sempre', 'IOException: checked', 'NullPointerException: checked'],
      bug: 2,
      why: 'NullPointerException é subclasse de RuntimeException: unchecked.',
      fixed: 'NullPointerException: unchecked',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um método lê o CSV de contratos e não compila por causa de IOException. Qual solução?',
      scenarios: [
        { title: 'Opção A', body: 'Envolver a leitura em **try/catch (IOException e)** ou declarar **throws IOException**.' },
        { title: 'Opção B', body: 'Trocar o tipo do método para **static**.' },
      ],
      answer: 0,
      why: 'Exceção checked exige tratamento ou declaração; static não tem relação.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.002' }],
  summary: [
    'Throwable divide-se em Error (falhas graves da JVM) e Exception.',
    'Checked: Exception fora de RuntimeException (IOException, SQLException); tratar com try/catch ou declarar com throws.',
    'Unchecked: RuntimeException (NullPointer, Arithmetic, ArrayIndexOutOfBounds, IllegalArgument) e Error.',
    'finally executa sempre; try-with-resources (Java 7) fecha recursos AutoCloseable.',
  ],
};

export const devJpPython: MicroLesson = {
  ...S,
  id: 'dev.javapy.4',
  series: { id: 'dev.javapy', order: 4 },
  title: 'Python para automação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você quer guardar pares "código do órgão → nome do órgão" e achar o nome rápido pelo código. Que estrutura do Python usar?',
    options: [
      { text: 'Um dicionário', why: 'Isso: chave e valor. Esta aula mostra as coleções e o ambiente virtual.' },
      { text: 'Uma tupla', why: 'A tupla guarda uma sequência; a busca por chave é do dicionário.' },
      { text: 'Um conjunto', why: 'O conjunto guarda itens sem repetição, sem valor associado.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'colecoes',
      part: 'Coleções',
      title: 'Lista, tupla, dicionário e conjunto',
      art: 'dados',
      goal: 'Escolher a coleção certa e saber quais são mutáveis.',
      explain:
        '| Coleção | Sintaxe | Mutável? |\n|---|---|---|\n| Lista | `[1, 2, 3]` | sim |\n| Tupla | `(1, 2, 3)` | **não** |\n| Dicionário | `{"cpf": "123"}` | sim |\n| Conjunto | `{1, 2, 3}` | sim |\n\nA **lista** é ordenada e aceita repetidos. A **tupla**, por ser imutável, pode ser **chave** de dicionário. O **dicionário** guarda chave e valor e mantém a ordem de inserção. O **conjunto** não tem repetidos nem ordem.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Qual coleção do Python é imutável?',
        options: [
          { text: 'Tupla', why: 'Isso.' },
          { text: 'Lista', why: 'Pegadinha: a lista é mutável; a tupla, não.' },
          { text: 'Dicionário', why: 'O dicionário é mutável.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **lista** é um **caderno a lápis**: dá para apagar e escrever. A **tupla** é um **documento assinado**: não se altera. O **dicionário** é uma **agenda telefônica**: procura-se pelo nome (chave) e acha-se o número (valor).',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Para remover repetidos de uma lista de CPFs, a coleção natural é:',
          options: [
            { text: 'Conjunto', why: 'Isso: não guarda repetidos.' },
            { text: 'Tupla', why: 'A tupla aceita repetidos.' },
            { text: 'Lista', why: 'A lista aceita repetidos.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'funcoes',
      part: 'Funções',
      title: 'Compreensões e uma armadilha',
      art: 'engrenagem',
      goal: 'Ler compreensões e evitar o valor padrão mutável.',
      explain:
        '**Compreensões** criam coleções numa linha:\n\n```python\nvalores = [120000, 80000, 45000]\nacima = [v for v in valores if v > 50000]\n```\n\n`acima` vale `[120000, 80000]`.\n\nFunções usam `def`, aceitam valores padrão, `*args` e `**kwargs`. Armadilha: o valor padrão é avaliado **uma vez**. `def f(x, lista=[])` **compartilha** a mesma lista entre chamadas; o certo é `lista=None`.',
      check: {
        kind: 'choice',
        id: 'fu-c',
        prompt: 'Qual o resultado de [v * 2 for v in [1, 2, 3] if v > 1]?',
        options: [
          { text: '[4, 6]', why: 'Isso: filtra 2 e 3, depois dobra.' },
          { text: '[2, 4, 6]', why: 'O filtro tira o 1.' },
          { text: '[2, 3]', why: 'Falta dobrar: v * 2.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Leia a compreensão **de trás para a frente**: "para cada v em [1, 2, 3], **se** v > 1, guarde v * 2". Passam o 2 e o 3; dobrados, viram 4 e 6.',
        check: {
          kind: 'choice',
          id: 'fu-r',
          prompt: 'Por que evitar def f(x, lista=[])?',
          options: [
            { text: 'A mesma lista é compartilhada entre as chamadas', why: 'Isso: o padrão é avaliado uma vez.' },
            { text: 'Listas não podem ser parâmetros', why: 'Podem; o problema é o valor padrão mutável.' },
            { text: 'Dá erro de sintaxe', why: 'A sintaxe é válida; o problema aparece na execução.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'venv',
      part: 'Ambiente',
      title: 'venv, pip e a biblioteca padrão',
      art: 'nuvem',
      goal: 'Isolar dependências com venv e reproduzir o ambiente.',
      explain:
        '```bash\npython -m venv .venv\nsource .venv/bin/activate\npip install requests\npip freeze > requirements.txt\npip install -r requirements.txt\n```\n\nO **venv** isola as dependências **de cada projeto**, evitando conflito de versões. O `requirements.txt` permite **reproduzir** o ambiente.\n\nPara automação, a biblioteca padrão traz `pathlib`, `csv`, `json`, `datetime`, `re` e `subprocess`. No back-end: **Django**, **Flask** e **FastAPI**.',
      check: {
        kind: 'choice',
        id: 've-c',
        prompt: 'Para isolar as bibliotecas de um script das de outros projetos, usa-se:',
        options: [
          { text: 'Um ambiente virtual criado com venv', why: 'Isso.' },
          { text: 'Um dicionário', why: 'O dicionário guarda dados; não isola bibliotecas.' },
          { text: 'Instalar tudo globalmente', why: 'Isso causaria conflito de versões entre projetos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Cada projeto ganha a sua **caixa de ferramentas** separada (o venv). Assim, um projeto pode usar a versão 2 de uma biblioteca e outro a versão 3, sem briga. O `requirements.txt` é a **lista** do que vai na caixa.',
        check: {
          kind: 'choice',
          id: 've-r',
          prompt: 'O que faz pip freeze > requirements.txt?',
          options: [
            { text: 'Registra as versões instaladas', why: 'Isso.' },
            { text: 'Congela o computador', why: 'Só grava a lista de pacotes.' },
            { text: 'Apaga os pacotes', why: 'Não apaga nada; registra.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'A coleção é mutável ou imutável?',
      categories: ['Mutável', 'Imutável'],
      items: [
        { text: 'Lista', cat: 0, why: 'Altera-se.' },
        { text: 'Dicionário', cat: 0, why: 'Altera-se.' },
        { text: 'Tupla', cat: 1, why: 'Não se altera.' },
      ],
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene a preparação de um projeto Python.',
      items: ['Criar o venv', 'Ativar o venv', 'Instalar pacotes com pip', 'Registrar com pip freeze'],
      why: 'Isolar, ativar, instalar e registrar.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Dicionário: chave e valor', 'Conjunto: sem repetidos', 'Tupla: mutável; lista: imutável'],
      bug: 2,
      why: 'É o inverso: tupla é imutável; lista é mutável.',
      fixed: 'Tupla: imutável; lista: mutável',
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.003' }],
  summary: [
    'Lista (mutável), tupla (imutável, pode ser chave), dicionário (chave e valor), conjunto (sem repetidos).',
    'Compreensões: [v for v in valores if v > 50000]. Valor padrão mutável é armadilha: use None.',
    'venv isola dependências; pip instala; requirements.txt reproduz. Back-end: Django, Flask, FastAPI.',
  ],
};
