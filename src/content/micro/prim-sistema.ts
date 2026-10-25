// Série "Sistema operacional e arquivos" (cap.prim.01, trecho sistema), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta como o operador humano deu lugar ao sistema operacional;
// as seguintes apresentam o que ele faz e como organiza arquivos, extensões e permissões, uma ideia por
// etapa. Fatos conferidos com o texto do capítulo (03-sistema-arquivos.md). Revisão editorial humana:
// pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.01', sectionId: 'sistema' } as const;

export const primSoHistoria: MicroLesson = {
  ...S,
  id: 'prim.sistema.1',
  series: { id: 'prim.sistema', order: 1 },
  title: 'Do operador ao sistema operacional',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Hoje você deixa música tocando, o navegador aberto e uma planilha ao lado, tudo ao mesmo tempo. Quem decide a vez de cada um?',
    options: [
      { text: 'Um programa que gerencia a máquina', why: 'Isso. Ele se chama sistema operacional, e esta aula conta como ele surgiu.' },
      { text: 'Ninguém: cada programa faz o que quer', why: 'Se fosse assim, um programa atropelaria o outro. Alguém organiza, e esta aula mostra quem.' },
      { text: 'Uma pessoa sentada dentro do computador', why: 'Hoje não, mas no começo era quase isso. Esta aula conta essa história.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'operador',
      part: 'A história',
      title: 'Quando o gerente era uma pessoa',
      art: 'cartao',
      goal: 'Saber que nos primeiros computadores um operador humano fazia o trabalho de organizar as tarefas.',
      explain:
        'Nos anos **1940 e 1950** não existia sistema operacional.\n\nUma pessoa, o **operador**, carregava cada programa na máquina, em **cartões ou fitas**, esperava terminar e só então carregava o próximo.\n\nEntre um trabalho e outro, a máquina, caríssima, **ficava parada** esperando.',
      example: 'É como uma lavanderia com uma só máquina e um funcionário que só põe a próxima roupa depois de tirar a anterior e dobrar.',
      check: {
        kind: 'choice',
        id: 'op-c',
        prompt: 'Nos primeiros computadores, quem colocava um programa depois do outro para rodar?',
        options: [
          { text: 'Uma pessoa, o operador', why: 'Isso. Ainda não havia sistema operacional.' },
          { text: 'O Windows', why: 'O Windows só apareceu em 1985.' },
          { text: 'O próprio programa, sozinho', why: 'Não: os programas eram carregados um a um, à mão.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **fila de cartório** com um único atendente que só chama o próximo depois de terminar tudo com o anterior. Nos primeiros computadores, quem chamava "o próximo" era o **operador humano**, e a máquina esperava parada no intervalo.',
        check: {
          kind: 'choice',
          id: 'op-r',
          prompt: 'Qual era o problema desse jeito de trabalhar?',
          options: [
            { text: 'A máquina cara ficava parada entre um trabalho e outro', why: 'Isso. Foi esse desperdício que levou ao primeiro "gerente" automático.' },
            { text: 'Os programas rodavam todos ao mesmo tempo', why: 'Era o contrário: um de cada vez, com espera no meio.' },
            { text: 'Não havia problema nenhum', why: 'Havia: tempo de máquina desperdiçado.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'primeiro',
      part: 'A história',
      title: 'O primeiro gerente automático',
      art: 'engrenagem',
      goal: 'Saber que, em 1956, programas passaram a encadear os trabalhos sozinhos.',
      explain:
        'Em **1956**, programas como o **GM-NAA I/O**, feito para o computador **IBM 704**, passaram a **encadear os trabalhos sozinhos**: terminou um, já começa o próximo.\n\nEle é considerado **um dos primeiros sistemas operacionais**.\n\nA ideia é simples e continua valendo: um programa cuja função é **cuidar dos outros programas** e da máquina.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'O que o GM-NAA I/O, de 1956, passou a fazer sozinho?',
        options: [
          { text: 'Encadear os trabalhos, um depois do outro', why: 'Isso. Foi um dos primeiros sistemas operacionais.' },
          { text: 'Mostrar janelas e ícones', why: 'Janelas e mouse só se popularizaram em 1984.' },
          { text: 'Conectar o computador à internet', why: 'A internet como conhecemos é muito posterior.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à lavanderia: agora a máquina tem um **programador automático** que, ao terminar uma lavagem, já começa a próxima da fila. O funcionário não precisa ficar ali. O GM-NAA I/O fez isso com os trabalhos do IBM 704.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Um programa cuja função é cuidar dos outros programas e da máquina é chamado de:',
          options: [
            { text: 'Sistema operacional', why: 'Isso.' },
            { text: 'Planilha', why: 'Planilha é um aplicativo para fazer contas e tabelas.' },
            { text: 'Hardware', why: 'Hardware é a parte física; o sistema operacional é software.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'unix',
      part: 'A história',
      title: 'Unix: pastas dentro de pastas',
      art: 'computador',
      goal: 'Conhecer o Unix e saber que muitas ideias dele vivem no Linux e no macOS.',
      explain:
        'Em **1969**, nos Laboratórios Bell, **Ken Thompson** e **Dennis Ritchie** criaram o **Unix**.\n\nEle trouxe duas ideias que usamos até hoje:\n\n- organizar os arquivos em **pastas dentro de pastas**;\n- permitir **várias pessoas e vários programas ao mesmo tempo**.\n\nMuitas ideias do Unix estão até hoje no **Linux** e no **macOS**.',
      check: {
        kind: 'multi',
        id: 'un-c',
        prompt: 'O que o Unix trouxe? Marque todos.',
        options: [
          { text: 'Pastas dentro de pastas', correct: true, why: 'Isso: a organização em árvore.' },
          { text: 'Várias pessoas e programas ao mesmo tempo', correct: true, why: 'Isso.' },
          { text: 'A tela de toque dos celulares', correct: false, why: 'Celulares com iOS e Android só vieram em 2007 e 2008.' },
          { text: 'O fim de todos os sistemas operacionais', correct: false, why: 'Pelo contrário: inspirou muitos outros.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um **armário com gavetas**, e dentro de cada gaveta, **pastas**, e dentro das pastas, mais pastas. É assim que o Unix organizava os arquivos. E, em vez de um usuário por vez, **várias pessoas** podiam usar a mesma máquina juntas.',
        check: {
          kind: 'choice',
          id: 'un-r',
          prompt: 'Quais sistemas de hoje herdaram muitas ideias do Unix?',
          options: [
            { text: 'Linux e macOS', why: 'Isso.' },
            { text: 'Só o MS-DOS', why: 'O texto do capítulo cita Linux e macOS como herdeiros.' },
            { text: 'Nenhum', why: 'Muitas ideias do Unix continuam vivas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'janelas',
      part: 'A história',
      title: 'Dos comandos às janelas',
      art: 'teclado',
      goal: 'Saber a passagem do MS-DOS, de comandos digitados, para as janelas com mouse.',
      explain:
        'Em **1981**, o IBM PC chegou com o **MS-DOS**, da Microsoft. Nele, **tudo era feito digitando comandos**.\n\nEm **1984**, o **Macintosh**, da Apple, popularizou a tela com **janelas, ícones e mouse**. O **Windows** veio em **1985**.\n\nO computador deixou de exigir que a pessoa decorasse comandos: bastava **apontar e clicar**.',
      check: {
        kind: 'order',
        id: 'ja-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['MS-DOS no IBM PC (1981)', 'Macintosh com janelas e mouse (1984)', 'Windows (1985)'],
        why: '1981, 1984 e 1985: dos comandos digitados às janelas.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **MS-DOS**, você precisava **escrever** o que queria, como quem pede por bilhete. Com **janelas e mouse**, passou a **apontar** para o que queria, como quem mostra com o dedo. Primeiro veio o bilhete (1981), depois o dedo (1984 no Mac, 1985 no Windows).',
        check: {
          kind: 'choice',
          id: 'ja-r',
          prompt: 'No MS-DOS, como a pessoa pedia algo ao computador?',
          options: [
            { text: 'Digitando comandos', why: 'Isso.' },
            { text: 'Clicando em ícones', why: 'Ícones e mouse se popularizaram depois, com o Macintosh.' },
            { text: 'Tocando na tela', why: 'Telas de toque nos celulares vieram muito depois.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hoje',
      part: 'A história',
      title: 'Linux e o sistema no bolso',
      art: 'celular',
      goal: 'Conhecer o Linux como código aberto e saber que iOS e Android são sistemas operacionais de celular.',
      explain:
        'Em **1991**, o finlandês **Linus Torvalds** começou o **Linux**, de **código aberto**: qualquer pessoa pode estudar e melhorar.\n\nDepois o sistema operacional foi para o bolso: o **iOS** chegou em **2007** e o **Android** em **2008**.\n\nResumindo os mais conhecidos hoje: no computador, **Windows**, **Linux** e **macOS**; no celular, **Android** e **iOS**.',
      check: {
        kind: 'sort',
        id: 'ho-c',
        prompt: 'Onde cada sistema operacional costuma rodar?',
        categories: ['Computador', 'Celular'],
        items: [
          { text: 'Windows', cat: 0, why: 'Sistema de computador.' },
          { text: 'Android', cat: 1, why: 'Sistema de celular, de 2008.' },
          { text: 'macOS', cat: 0, why: 'Sistema dos computadores da Apple.' },
          { text: 'iOS', cat: 1, why: 'Sistema do iPhone, de 2007.' },
        ],
      },
      recovery: {
        explain: '**Código aberto** é como uma receita publicada: todos podem ler, testar e sugerir melhorias. O Linux nasceu assim, em 1991. E o celular também precisa de um gerente: o **Android** e o **iOS** fazem nele o que o Windows faz no computador.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'O que quer dizer que o Linux é de código aberto?',
          options: [
            { text: 'Qualquer pessoa pode estudar e melhorar o sistema', why: 'Isso.' },
            { text: 'Ele só funciona com a tampa do computador aberta', why: 'Não tem nada a ver com a tampa: é sobre as instruções do programa.' },
            { text: 'Ele não tem senha', why: 'O Linux também controla usuários e senhas.' },
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
      prompt: 'Ordene a história inteira.',
      items: ['Operador humano carrega um programa por vez (anos 1940 e 1950)', 'GM-NAA I/O encadeia os trabalhos (1956)', 'Unix nos Laboratórios Bell (1969)', 'Linux de Linus Torvalds (1991)'],
      why: 'Do gerente humano ao gerente automático, e dele aos sistemas de hoje.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['MS-DOS: comandos digitados (1981)', 'Macintosh: janelas, ícones e mouse (1984)', 'Android: sistema de computador de mesa'],
      bug: 2,
      why: 'O Android é sistema operacional de celular, de 2008.',
      fixed: 'Android: sistema de celular (2008)',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega diz que o Linux "é um aplicativo para editar textos". Como você corrige?',
      options: [
        { text: 'O Linux é um sistema operacional: gerencia a máquina e os programas', why: 'Isso.' },
        { text: 'O Linux é uma peça de hardware', why: 'Não se segura com a mão: é software, de sistema.' },
        { text: 'O colega está certo', why: 'Editor de texto é aplicativo; o Linux é sistema operacional.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'Nos anos 1940 e 1950, um operador humano carregava um programa por vez, e a máquina esperava parada.',
    'Em 1956, o GM-NAA I/O, do IBM 704, passou a encadear os trabalhos: um dos primeiros sistemas operacionais.',
    'Em 1969, o Unix trouxe pastas dentro de pastas e várias pessoas ao mesmo tempo.',
    'MS-DOS (1981) era por comandos; Macintosh (1984) e Windows (1985) trouxeram janelas e mouse.',
    'Linux (1991) é de código aberto; iOS (2007) e Android (2008) são sistemas de celular.',
  ],
};

export const primSoGerente: MicroLesson = {
  ...S,
  id: 'prim.sistema.2',
  series: { id: 'prim.sistema', order: 2 },
  title: 'O gerente da máquina',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num cartório, alguém distribui o trabalho entre os atendentes, cuida do arquivo e decide quem entra em cada sala. Quem faz isso dentro do computador?',
    options: [
      { text: 'O sistema operacional', why: 'Isso. Esta aula mostra cada uma dessas tarefas.' },
      { text: 'O teclado', why: 'O teclado só leva o que você digita para dentro.' },
      { text: 'A planilha', why: 'A planilha é um aplicativo: resolve uma tarefa sua, não gerencia a máquina.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'divide',
      part: 'O que ele faz',
      title: 'Divide processador e memória',
      art: 'chip',
      goal: 'Saber que o sistema operacional reparte processador e memória entre os programas abertos.',
      explain:
        'Quando você liga o computador, o primeiro programa importante que entra em ação é o **sistema operacional**.\n\nSua primeira tarefa: **dividir o processador e a memória** entre os programas abertos, para que **todos funcionem**.\n\nÉ por isso que a música continua tocando enquanto você escreve: o sistema dá a vez a cada programa, muito rápido.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Você tem navegador, planilha e música abertos. Quem reparte o processador e a memória entre eles?',
        options: [
          { text: 'O sistema operacional', why: 'Isso.' },
          { text: 'O próprio navegador', why: 'O navegador é só um dos programas que recebem a sua vez.' },
          { text: 'O monitor', why: 'O monitor só mostra a imagem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No cartório, o **gerente** distribui as fichas entre os atendentes para que ninguém fique parado e nenhum pedido seja esquecido. No computador, os "atendentes" são o processador e a memória; os pedidos são os programas; o gerente é o **sistema operacional**.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'Na comparação do cartório, o sistema operacional é:',
          options: [
            { text: 'O gerente que distribui o trabalho', why: 'Isso.' },
            { text: 'Um dos papéis no arquivo', why: 'Os papéis seriam os arquivos.' },
            { text: 'O cliente na fila', why: 'O cliente faria o pedido; quem organiza é o gerente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pecas',
      part: 'O que ele faz',
      title: 'Conversa com as peças',
      art: 'pessoal',
      goal: 'Saber que o sistema operacional faz a ponte entre os programas e as peças.',
      explain:
        'Segunda tarefa: **conversar com as peças**, como **impressora**, **tela** e **disco**.\n\nQuando você manda imprimir um documento, o editor de texto não fala direto com a impressora: ele **pede ao sistema operacional**, e o sistema leva o pedido até a peça.\n\nAssim, cada programa não precisa saber os detalhes de cada impressora do mundo.',
      check: {
        kind: 'order',
        id: 'pe-c',
        prompt: 'Ordene o caminho de um pedido de impressão.',
        items: ['Você clica em Imprimir no editor de texto', 'O editor pede ao sistema operacional', 'O sistema operacional fala com a impressora', 'A folha sai impressa'],
        why: 'O sistema operacional fica no meio, entre o programa e a peça.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como pedir um documento no balcão: você fala com o **atendente**, e ele vai ao arquivo buscar. Você não precisa saber em que gaveta está. O programa pede ao **sistema operacional**, e ele cuida de falar com a peça.',
        check: {
          kind: 'choice',
          id: 'pe-r',
          prompt: 'Quem leva o pedido do editor de texto até a impressora?',
          options: [
            { text: 'O sistema operacional', why: 'Isso.' },
            { text: 'O mouse', why: 'O mouse só serve para você apontar e clicar.' },
            { text: 'Ninguém: o editor fala direto com a impressora', why: 'O editor pede ao sistema operacional, que conversa com a peça.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'arquivo-acesso',
      part: 'O que ele faz',
      title: 'Organiza arquivos e controla acesso',
      art: 'cadeado',
      goal: 'Saber que o sistema operacional organiza os arquivos e controla quem entra e o que cada um pode fazer.',
      explain:
        'Mais duas tarefas:\n\n- **organizar os arquivos**, guardando cada um no seu lugar;\n- **controlar quem pode entrar** e **o que cada pessoa pode fazer**.\n\nNo cartório, o gerente cuida do arquivo e decide quem tem acesso a cada sala. No computador, quem faz isso é o **sistema operacional**, com usuários, senhas e permissões.',
      check: {
        kind: 'multi',
        id: 'aa-c',
        prompt: 'O que o sistema operacional faz? Marque todos.',
        options: [
          { text: 'Divide processador e memória entre os programas', correct: true, why: 'Isso.' },
          { text: 'Conversa com impressora, tela e disco', correct: true, why: 'Isso.' },
          { text: 'Organiza os arquivos', correct: true, why: 'Isso.' },
          { text: 'Escreve o relatório por você', correct: false, why: 'Escrever o relatório é com você, num aplicativo como o editor de texto.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Lembre das **quatro tarefas** do gerente: dividir o trabalho (processador e memória), falar com as peças, cuidar do arquivo e controlar o acesso. Fazer o trabalho do cliente, como escrever um texto, não é tarefa dele: isso é dos aplicativos.',
        check: {
          kind: 'choice',
          id: 'aa-r',
          prompt: 'Ao ligar o computador, ele pede seu usuário e senha. Qual tarefa do sistema operacional é essa?',
          options: [
            { text: 'Controlar quem pode entrar', why: 'Isso.' },
            { text: 'Falar com a impressora', why: 'O pedido de senha é controle de acesso.' },
            { text: 'Dividir a memória', why: 'O pedido de senha é controle de acesso.' },
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
      prompt: 'É tarefa do sistema operacional ou de um aplicativo?',
      categories: ['Sistema operacional', 'Aplicativo'],
      items: [
        { text: 'Dividir a memória entre os programas', cat: 0, why: 'Gerenciar a máquina.' },
        { text: 'Calcular a soma de uma coluna', cat: 1, why: 'Tarefa sua, numa planilha.' },
        { text: 'Pedir usuário e senha ao ligar', cat: 0, why: 'Controle de acesso.' },
        { text: 'Mostrar uma página da internet', cat: 1, why: 'Tarefa do navegador.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['O sistema operacional divide processador e memória', 'Ele conversa com as peças, como a impressora', 'Ele é uma peça física dentro do gabinete'],
      bug: 2,
      why: 'O sistema operacional é software, não peça física.',
      fixed: 'Ele é um software, o gerente da máquina',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: no Tribunal, cada servidor entra no computador com o próprio usuário e vê só as pastas do seu setor. Quem garante isso?',
      options: [
        { text: 'O sistema operacional, controlando o acesso', why: 'Isso.' },
        { text: 'O monitor, escondendo as pastas', why: 'O monitor só mostra a imagem.' },
        { text: 'O editor de texto', why: 'O editor é um aplicativo; o controle de acesso é do sistema.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.005' }],
  summary: [
    'O sistema operacional é o gerente da máquina: Windows, Linux e macOS no computador; Android e iOS no celular.',
    'Ele divide processador e memória entre os programas abertos.',
    'Conversa com as peças, como impressora, tela e disco.',
    'Organiza os arquivos e controla quem entra e o que cada pessoa pode fazer.',
  ],
};

export const primSoArquivos: MicroLesson = {
  ...S,
  id: 'prim.sistema.3',
  series: { id: 'prim.sistema', order: 3 },
  title: 'Arquivos, pastas, extensões e permissões',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num escritório de papel, contratos ficam em pastas, as pastas em gavetas, e só alguns funcionários podem rabiscar neles. O computador faz algo parecido?',
    options: [
      { text: 'Sim: arquivos, pastas e permissões', why: 'Isso. Esta aula mostra cada um, com exemplos do dia a dia.' },
      { text: 'Não: no computador tudo fica solto', why: 'Ficaria uma bagunça. O sistema operacional organiza em pastas.' },
      { text: 'Só no celular', why: 'Computador e celular organizam arquivos em pastas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'arquivo',
      part: 'Arquivos e pastas',
      title: 'Arquivo e pasta',
      art: 'livro',
      goal: 'Saber o que é arquivo e o que é pasta (diretório).',
      explain:
        'Um **arquivo** é um conjunto de dados **guardado com um nome**. Um contrato em texto é um arquivo. Uma foto é outro.\n\nUma **pasta**, também chamada de **diretório**, é um lugar para **agrupar arquivos**, como uma pasta de papel numa gaveta.\n\nPastas podem ficar **dentro de outras pastas**, a ideia que vimos no Unix.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'Outro nome para pasta é:',
        options: [
          { text: 'Diretório', why: 'Isso: pasta e diretório são a mesma coisa.' },
          { text: 'Extensão', why: 'A extensão é o final do nome do arquivo.' },
          { text: 'Processador', why: 'O processador é a peça que executa as instruções.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no armário: cada **folha** com um nome é um **arquivo**; a **pasta de papel** que junta várias folhas é a **pasta**, ou **diretório**. E uma pasta pode estar dentro de outra, como uma pasta suspensa dentro da gaveta.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Uma foto guardada com o nome "praia.jpg" é:',
          options: [
            { text: 'Um arquivo', why: 'Isso: dados guardados com um nome.' },
            { text: 'Uma pasta', why: 'Pasta é o lugar que agrupa arquivos.' },
            { text: 'Um sistema operacional', why: 'É só uma foto, um arquivo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'caminho',
      part: 'Arquivos e pastas',
      title: 'O caminho até o arquivo',
      art: 'trilha',
      goal: 'Ler um caminho de pastas até um arquivo.',
      explain:
        'O **caminho** mostra o percurso de pastas até chegar ao arquivo. Veja:\n\n`Documentos/Contratos/2026/contrato-01.pdf`\n\nLeia da esquerda para a direita: dentro de **Documentos** há a pasta **Contratos**; dentro dela, a pasta **2026**; e lá está o arquivo **contrato-01.pdf**.',
      example: 'É como um endereço: cidade, bairro, rua, número.',
      check: {
        kind: 'order',
        id: 'ca-c',
        prompt: 'Monte o caminho, da pasta mais de fora até o arquivo.',
        items: ['Documentos', 'Contratos', '2026', 'contrato-01.pdf'],
        why: 'Da pasta de fora para a de dentro, e o arquivo no fim.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Leia o caminho como um **endereço**: do maior para o menor. Primeiro a pasta mais de fora (**Documentos**), depois as de dentro (**Contratos**, **2026**) e, por último, o **arquivo**, que é a "casa" que você procura.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'No caminho Documentos/Contratos/2026/contrato-01.pdf, em qual pasta o arquivo está diretamente?',
          options: [
            { text: '2026', why: 'Isso: é a última pasta antes do nome do arquivo.' },
            { text: 'Documentos', why: 'Documentos é a pasta mais de fora.' },
            { text: 'contrato-01.pdf', why: 'Esse é o próprio arquivo.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'extensao',
      part: 'Extensões',
      title: 'O final do nome diz o tipo',
      art: 'dados',
      goal: 'Reconhecer as extensões mais comuns.',
      explain:
        'A **extensão** é o final do nome do arquivo, **depois do ponto**. Ela indica o **tipo** do arquivo e **qual programa** costuma abri-lo.\n\n- **.pdf**: documento pronto para leitura e impressão;\n- **.docx**: texto do Microsoft Word;\n- **.xlsx**: planilha do Microsoft Excel;\n- **.jpg** ou **.png**: imagem;\n- **.exe**: programa executável no Windows.',
      check: {
        kind: 'sort',
        id: 'ex-c',
        prompt: 'Qual o tipo de cada arquivo?',
        categories: ['Texto do Word', 'Planilha', 'Imagem'],
        items: [
          { text: 'parecer.docx', cat: 0, why: '.docx é texto do Word.' },
          { text: 'orcamento.xlsx', cat: 1, why: '.xlsx é planilha do Excel.' },
          { text: 'foto.jpg', cat: 2, why: '.jpg é imagem.' },
          { text: 'logo.png', cat: 2, why: '.png também é imagem.' },
        ],
      },
      recovery: {
        explain: 'A extensão funciona como a **etiqueta** colada na pasta de papel: "planilhas", "fotos", "textos". Olhe sempre **o que vem depois do último ponto** do nome: é ali que está a etiqueta.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'Em "relatorio-final.pdf", qual é a extensão?',
          options: [
            { text: '.pdf', why: 'Isso: o que vem depois do ponto.' },
            { text: 'relatorio', why: 'Essa é parte do nome, antes do ponto.' },
            { text: 'final', why: 'Essa é parte do nome, antes do ponto.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'golpe',
      part: 'Extensões',
      title: 'Trocar a extensão não muda o arquivo',
      art: 'cadeado',
      goal: 'Saber que a extensão é só parte do nome e reconhecer o truque usado em golpes.',
      explain:
        'Cuidado: a extensão é **só parte do nome**.\n\nTrocar ".exe" por ".pdf" **não transforma um programa em documento**. O conteúdo continua o mesmo.\n\n**Golpistas** usam esse truque: mandam um programa disfarçado com nome de documento, esperando que a pessoa abra sem desconfiar.',
      check: {
        kind: 'choice',
        id: 'go-c',
        prompt: 'Alguém renomeou "instalador.exe" para "instalador.pdf". O que o arquivo é agora?',
        options: [
          { text: 'Continua sendo um programa; só o nome mudou', why: 'Isso. O conteúdo não muda com o nome.' },
          { text: 'Virou um documento PDF de verdade', why: 'A extensão é só parte do nome: o conteúdo continua sendo de programa.' },
          { text: 'Ficou vazio', why: 'O conteúdo continua lá, igual.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Trocar a etiqueta de um pote de **sal** para "açúcar" não muda o que tem dentro: continua salgado. Com arquivos é igual: o nome (e a extensão) é a etiqueta; o **conteúdo** é o que está dentro do pote.',
        check: {
          kind: 'choice',
          id: 'go-r',
          prompt: 'Por que golpistas trocam a extensão de um programa para ".pdf"?',
          options: [
            { text: 'Para disfarçar o programa e fazer a pessoa abrir', why: 'Isso: o disfarce está só no nome.' },
            { text: 'Para o programa virar documento de verdade', why: 'Trocar o nome não muda o conteúdo.' },
            { text: 'Para o arquivo ficar menor', why: 'O nome não muda o tamanho do conteúdo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'permissoes',
      part: 'Permissões',
      title: 'Ler, alterar, executar',
      art: 'balanca',
      goal: 'Distinguir as permissões de leitura, escrita e execução.',
      explain:
        'O sistema operacional guarda **permissões**: regras que dizem quem pode, em cada arquivo,\n\n- **ler** (ver o conteúdo);\n- **alterar**, ou **gravar** (mudar o conteúdo);\n- **executar** (rodar, se for um programa).\n\nNo **Linux**, elas se chamam **leitura, escrita e execução**.\n\nNo Tribunal, o servidor do setor de contratos pode **alterar** a planilha de contratos; um estagiário talvez só possa **ler**.',
      check: {
        kind: 'choice',
        id: 'pe-c',
        prompt: 'O estagiário consegue abrir e ver a planilha de contratos, mas não consegue salvar mudanças. Que permissão ele tem?',
        options: [
          { text: 'Só leitura', why: 'Isso: ver sim, alterar não.' },
          { text: 'Escrita', why: 'Com escrita ele conseguiria salvar mudanças.' },
          { text: 'Nenhuma', why: 'Sem nenhuma permissão ele nem veria o conteúdo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **livro da biblioteca**: você pode **ler** à vontade, mas não pode **escrever** nele. Escrever exige outra autorização. No computador é igual: **ler** é só ver; **alterar** exige permissão de **escrita**. Isso protege a informação contra mudanças indevidas.',
        check: {
          kind: 'choice',
          id: 'pe-r',
          prompt: 'Para mudar o conteúdo de um arquivo, é preciso permissão de:',
          options: [
            { text: 'Escrita (alterar)', why: 'Isso.' },
            { text: 'Leitura', why: 'Leitura é só ver o conteúdo.' },
            { text: 'Execução', why: 'Execução é rodar um programa.' },
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
      lines: ['Pasta e diretório são a mesma coisa', '.xlsx é planilha do Excel', 'Mudar a extensão muda o conteúdo do arquivo'],
      bug: 2,
      why: 'A extensão é só parte do nome; o conteúdo continua o mesmo.',
      fixed: 'Mudar a extensão não muda o conteúdo do arquivo',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual permissão cada situação precisa?',
      categories: ['Leitura', 'Escrita', 'Execução'],
      items: [
        { text: 'Ver um parecer sem mudar nada', cat: 0, why: 'Só ver: leitura.' },
        { text: 'Corrigir um valor na planilha', cat: 1, why: 'Mudar o conteúdo: escrita.' },
        { text: 'Rodar um programa', cat: 2, why: 'Rodar: execução.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Chegou um e-mail com um anexo. Qual atitude é a mais segura?',
      scenarios: [
        { title: 'Atitude A', body: 'O anexo se chama "fatura.pdf.exe". Abro, porque tem "pdf" no nome.' },
        { title: 'Atitude B', body: 'O anexo se chama "fatura.pdf.exe". Não abro: o que vale é o final, ".exe", um programa.' },
      ],
      answer: 1,
      why: 'A extensão é o que vem depois do último ponto: ".exe" é programa executável, disfarçado de documento.',
      errorKind: 'leitura',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.01.006' }],
  summary: [
    'Arquivo: dados guardados com um nome. Pasta, ou diretório: agrupa arquivos, e pode ficar dentro de outra pasta.',
    'O caminho, como Documentos/Contratos/2026/contrato-01.pdf, mostra o percurso de pastas até o arquivo.',
    'A extensão, depois do ponto, indica o tipo: .pdf, .docx, .xlsx, .jpg/.png, .exe.',
    'Trocar a extensão não muda o conteúdo: golpistas usam esse truque.',
    'Permissões: ler (ver), escrever (alterar) e executar (rodar um programa).',
  ],
  vocab: [{ term: 'diretório', match: 'diret[oó]rio', step: 'arquivo' }],
};
