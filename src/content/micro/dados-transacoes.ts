// Série "Transações, isolamento e índices" (cap.dados.01, trecho transacoes), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta como surgiram a transação, a árvore B, a sigla
// ACID e os níveis de isolamento; as seguintes ensinam ACID, depois anomalias, níveis e índices, uma
// ideia por etapa. Fatos conferidos com o texto do capítulo (03-transacoes.md). Revisão editorial
// humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dados.01', sectionId: 'transacoes' } as const;

export const dadosTxHistoria: MicroLesson = {
  ...S,
  id: 'dados.transacoes.1',
  series: { id: 'dados.transacoes', order: 1 },
  title: 'Muitos ao mesmo tempo: a história das transações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Duas pessoas compram, no mesmo segundo, o último assento de um voo pela internet. O que o sistema precisa garantir?',
    options: [
      { text: 'Que só uma das duas fique com o assento', why: 'Isso. Esta aula conta como os bancos aprenderam a garantir isso.' },
      { text: 'Que as duas fiquem com o mesmo assento', why: 'Seria um problema sério. Esta aula mostra como se evita.' },
      { text: 'Nada: é sorte de quem chega primeiro', why: 'O banco precisa decidir de forma segura. Esta aula mostra como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'gray',
      part: 'A história',
      title: 'Anos 1970: a transação',
      art: 'pessoal',
      goal: 'Saber que a ideia de transação nasceu com bancos usados por muitos ao mesmo tempo.',
      explain:
        'Nos **anos 1970**, bancos de dados passaram a ser usados por **muita gente ao mesmo tempo**, como nos sistemas de **reservas** e de **bancos**.\n\n**Jim Gray**, que trabalhou na IBM, ajudou a definir a **transação**: um conjunto de operações que **acontece por inteiro ou não acontece**.\n\nEm **1998**, ele recebeu o **Prêmio Turing**, o "Nobel da computação", por esse trabalho.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'O que é uma transação?',
        options: [
          { text: 'Um conjunto de operações que acontece por inteiro ou não acontece', why: 'Isso.' },
          { text: 'Uma consulta que só lê dados', why: 'A transação pode ler e alterar; o que a define é ser tudo ou nada.' },
          { text: 'Um tipo de índice', why: 'Índice acelera buscas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **compra no caixa**: você paga e recebe o produto. Se o pagamento passa e o produto não vem, há problema. A transação junta as duas coisas num **pacote**: ou as duas acontecem, ou nenhuma.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Quem ajudou a definir a transação e recebeu o Prêmio Turing em 1998?',
          options: [
            { text: 'Jim Gray', why: 'Isso.' },
            { text: 'Edgar F. Codd', why: 'Codd propôs o modelo relacional.' },
            { text: 'Peter Chen', why: 'Chen criou o diagrama entidade-relacionamento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'btree',
      part: 'A história',
      title: '1972: a árvore B',
      art: 'degraus',
      goal: 'Saber que a árvore B é de 1972 e é o índice padrão.',
      explain:
        'Com tabelas cada vez maiores, procurar linha por linha ficou lento.\n\nEm **1972**, **Rudolf Bayer** e **Edward McCreight** publicaram a **árvore B** (*B-tree*): uma estrutura que organiza as chaves em **níveis**, como um índice que se abre em subíndices.\n\nAté hoje ela é o **índice padrão** da maioria dos bancos.',
      check: {
        kind: 'choice',
        id: 'bt-c',
        prompt: 'O que é a árvore B?',
        options: [
          { text: 'A estrutura que, até hoje, é o índice padrão da maioria dos bancos', why: 'Isso.' },
          { text: 'Um diagrama de entidades', why: 'Diagrama de entidades é o MER de Chen.' },
          { text: 'Um nível de isolamento', why: 'Níveis de isolamento são outra coisa; a árvore B é índice.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **dicionário de papel**: você abre no meio, vê se a palavra vem antes ou depois, abre de novo na metade certa. Em poucos passos chega à página. A árvore B faz isso com as chaves, em **níveis**, sem ler a tabela inteira.',
        check: {
          kind: 'choice',
          id: 'bt-r',
          prompt: 'Quem publicou a árvore B, em 1972?',
          options: [
            { text: 'Rudolf Bayer e Edward McCreight', why: 'Isso.' },
            { text: 'Theo Härder e Andreas Reuter', why: 'Eles cunharam a sigla ACID, em 1983.' },
            { text: 'Donald Chamberlin e Raymond Boyce', why: 'Eles criaram o SEQUEL.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'acid',
      part: 'A história',
      title: '1983: a sigla ACID',
      art: 'livro',
      goal: 'Saber quem cunhou a sigla ACID.',
      explain:
        'Em **1983**, **Theo Härder** e **Andreas Reuter** deram um nome curto às **quatro garantias** de uma transação: **ACID**.\n\nCada letra é uma garantia:\n\n- **A**tomicidade;\n- **C**onsistência;\n- **I**solamento;\n- **D**urabilidade.\n\nA próxima aula explica cada uma com calma.',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'O que a sigla ACID resume?',
        options: [
          { text: 'As quatro garantias de uma transação', why: 'Isso.' },
          { text: 'Os quatro tipos de junção', why: 'Junções são INNER, LEFT, RIGHT, FULL e CROSS.' },
          { text: 'As quatro formas normais', why: 'As formas normais são 1FN, 2FN, 3FN e FNBC.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma sigla é um **atalho de memória**: em vez de decorar quatro palavras soltas, decora-se uma só, **ACID**, e cada letra puxa a sua palavra: Atomicidade, Consistência, Isolamento, Durabilidade.',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'O "I" de ACID quer dizer:',
          options: [
            { text: 'Isolamento', why: 'Isso.' },
            { text: 'Índice', why: 'Índice não é uma das garantias da transação.' },
            { text: 'Integridade referencial', why: 'O "I" de ACID é Isolamento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sql92',
      part: 'A história',
      title: '1992: os níveis de isolamento',
      art: 'degraus',
      goal: 'Saber que o SQL-92 descreveu os quatro níveis de isolamento.',
      explain:
        'Isolar totalmente as transações deixa tudo mais seguro, mas **mais lento**, porque uma espera a outra.\n\nO padrão **SQL-92** descreveu **quatro níveis de isolamento**, do mais fraco ao mais forte:\n\n1. **READ UNCOMMITTED**\n2. **READ COMMITTED**\n3. **REPEATABLE READ**\n4. **SERIALIZABLE**\n\nCada sistema escolhe o equilíbrio entre **segurança** e **velocidade**.',
      check: {
        kind: 'order',
        id: 'sq-c',
        prompt: 'Ordene os níveis, do mais fraco ao mais forte.',
        items: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
        why: 'Quanto mais forte, menos anomalias e menos concorrência.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **portas de uma sala de reunião**: totalmente aberta (READ UNCOMMITTED), entra-se só depois de bater (READ COMMITTED), trancada durante a reunião (REPEATABLE READ), ou um grupo por vez no prédio (SERIALIZABLE). Mais fechado é mais seguro, mas mais gente espera na fila.',
        check: {
          kind: 'choice',
          id: 'sq-r',
          prompt: 'Qual é o nível mais forte?',
          options: [
            { text: 'SERIALIZABLE', why: 'Isso.' },
            { text: 'READ UNCOMMITTED', why: 'Esse é o mais fraco.' },
            { text: 'READ COMMITTED', why: 'É o segundo, do mais fraco para o mais forte.' },
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
      items: ['Árvore B de Bayer e McCreight (1972)', 'Sigla ACID de Härder e Reuter (1983)', 'Níveis de isolamento no SQL-92 (1992)', 'Prêmio Turing para Jim Gray (1998)'],
      why: '1972, 1983, 1992 e 1998.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Transação: tudo ou nada', 'Árvore B: índice padrão', 'ACID: sigla das quatro formas normais'],
      bug: 2,
      why: 'ACID resume as quatro garantias de uma transação.',
      fixed: 'ACID: as quatro garantias da transação',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um sistema de inscrições em concurso recebe milhares de pedidos por minuto. Por que não usar sempre o nível mais forte de isolamento?',
      options: [
        { text: 'Porque fica mais lento: as transações esperam umas pelas outras', why: 'Isso: é o equilíbrio entre segurança e velocidade.' },
        { text: 'Porque o nível mais forte não existe', why: 'Existe: SERIALIZABLE.' },
        { text: 'Porque o nível mais forte apaga os dados', why: 'Não apaga; só reduz a concorrência.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Nos anos 1970, com muitos usuários ao mesmo tempo, Jim Gray ajudou a definir a transação: tudo ou nada. Prêmio Turing em 1998.',
    'Em 1972, Bayer e McCreight publicaram a árvore B, índice padrão até hoje.',
    'Em 1983, Härder e Reuter cunharam a sigla ACID.',
    'O SQL-92 descreveu quatro níveis de isolamento: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.',
  ],
};

export const dadosTxAcid: MicroLesson = {
  ...S,
  id: 'dados.transacoes.2',
  series: { id: 'dados.transacoes', order: 2 },
  title: 'As quatro garantias: ACID',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma transferência debita R$ 500 de uma conta e credita em outra. A luz acaba entre o débito e o crédito. O que deveria acontecer?',
    options: [
      { text: 'O débito ser desfeito', why: 'Isso. Esta aula mostra a garantia que faz isso e as outras três.' },
      { text: 'O dinheiro sumir', why: 'É exatamente o que o banco de dados evita. Esta aula mostra como.' },
      { text: 'O crédito ser feito duas vezes', why: 'Também seria erro. Esta aula mostra as garantias.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'atomicidade',
      part: 'ACID',
      title: 'A: atomicidade',
      art: 'interruptor',
      goal: 'Saber o que é atomicidade, commit e rollback.',
      explain:
        '**Atomicidade**: a transação é **indivisível**. Em caso de falha, **tudo é desfeito** (*rollback*).\n\n```\nBEGIN;\nUPDATE conta SET saldo = saldo - 500 WHERE id = 1;\nUPDATE conta SET saldo = saldo + 500 WHERE id = 2;\nCOMMIT;\n```\n\nSó com o **COMMIT** a transferência é confirmada. Se algo falhar antes, o banco faz **ROLLBACK** e o débito some.',
      check: {
        kind: 'choice',
        id: 'at-c',
        prompt: 'O sistema caiu depois do débito e antes do crédito, e o banco desfez o débito. Qual propriedade garantiu isso?',
        options: [
          { text: 'Atomicidade', why: 'Isso: tudo ou nada.' },
          { text: 'Durabilidade', why: 'Durabilidade protege o que já teve COMMIT.' },
          { text: 'Isolamento', why: 'Isolamento trata de transações simultâneas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Átomo**, em grego, quer dizer "**indivisível**". A transação atômica não se parte ao meio: é como um **interruptor**, que fica ligado ou desligado, nunca pela metade. Sem COMMIT, volta tudo ao estado de antes.',
        check: {
          kind: 'choice',
          id: 'at-r',
          prompt: 'Que comando desfaz uma transação inteira?',
          options: [
            { text: 'ROLLBACK', why: 'Isso.' },
            { text: 'COMMIT', why: 'COMMIT confirma.' },
            { text: 'GRANT', why: 'GRANT dá permissão.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'consistencia',
      part: 'ACID',
      title: 'C: consistência',
      art: 'balanca',
      goal: 'Saber o que é consistência.',
      explain:
        '**Consistência**: o banco passa de **um estado válido a outro**, respeitando **restrições e regras**.\n\nSe existe a regra "o saldo não pode ficar negativo", uma transação que deixaria o saldo em −100 é **recusada**.\n\nO mesmo vale para chaves primárias, estrangeiras e outras restrições: a transação não termina deixando o banco quebrado.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: 'Uma regra proíbe saldo negativo, e o banco recusa uma transação que o deixaria em −100. Que propriedade é essa?',
        options: [
          { text: 'Consistência', why: 'Isso: só estados válidos.' },
          { text: 'Atomicidade', why: 'A atomicidade trata de tudo ou nada; aqui a questão é a regra.' },
          { text: 'Durabilidade', why: 'Durabilidade é persistir após o COMMIT.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense na **balança da contabilidade**: débitos e créditos sempre fecham. A consistência garante que, ao terminar, a balança **continua fechando**, ou seja, todas as regras do banco valem.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'Consistência quer dizer:',
          options: [
            { text: 'Ir de um estado válido a outro, respeitando as regras', why: 'Isso.' },
            { text: 'Ler sempre o mesmo valor', why: 'Isso lembra leitura repetível, um tema de isolamento.' },
            { text: 'Guardar cópias', why: 'Cópias são backup.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'isolamento',
      part: 'ACID',
      title: 'I: isolamento',
      art: 'pessoal',
      goal: 'Saber o que é isolamento.',
      explain:
        '**Isolamento**: transações **simultâneas** não interferem **indevidamente** umas nas outras.\n\nNo exemplo do último assento do voo: duas compras ao mesmo tempo não podem, as duas, ver o assento livre e ficar com ele.\n\nO **quanto** se isola depende do **nível de isolamento** escolhido, assunto da próxima aula.',
      check: {
        kind: 'choice',
        id: 'is-c',
        prompt: 'Que propriedade impede que duas compras simultâneas fiquem com o mesmo assento?',
        options: [
          { text: 'Isolamento', why: 'Isso.' },
          { text: 'Durabilidade', why: 'Durabilidade é persistir depois do COMMIT.' },
          { text: 'Consistência', why: 'A consistência cuida das regras; quem trata da simultaneidade é o isolamento.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **cabines de votação**: cada eleitor vota **sozinho**, sem ver nem atrapalhar o outro, mesmo que muitos votem ao mesmo tempo. O isolamento dá a cada transação a sua "cabine".',
        check: {
          kind: 'choice',
          id: 'is-r',
          prompt: 'O isolamento trata de:',
          options: [
            { text: 'Transações que rodam ao mesmo tempo', why: 'Isso.' },
            { text: 'Queda de energia depois do COMMIT', why: 'Isso é durabilidade.' },
            { text: 'Valores nulos', why: 'NULL é assunto de consultas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'durabilidade',
      part: 'ACID',
      title: 'D: durabilidade',
      art: 'cartao',
      goal: 'Saber o que é durabilidade e como o log a garante.',
      explain:
        '**Durabilidade**: depois do **COMMIT**, os dados **persistem**, mesmo após **queda de energia**.\n\nQuem garante isso é o **registro de log**: antes de confirmar, o banco anota a mudança num arquivo em disco. Se a luz cair, ao religar ele lê o log e refaz o que tinha sido confirmado.\n\nResumo para lembrar: **A** tudo ou nada; **C** regras; **I** simultâneas; **D** após o COMMIT.',
      check: {
        kind: 'sort',
        id: 'du-c',
        prompt: 'Qual propriedade ACID cada situação mostra?',
        categories: ['Atomicidade', 'Durabilidade'],
        items: [
          { text: 'Caiu antes do COMMIT, e tudo foi desfeito', cat: 0, why: 'Tudo ou nada.' },
          { text: 'Caiu depois do COMMIT, e o dado continuou lá', cat: 1, why: 'Persistência.' },
          { text: 'Uma das duas operações falhou, e a outra foi desfeita', cat: 0, why: 'Indivisível.' },
        ],
      },
      recovery: {
        explain: 'O **log** é como o **livro de protocolo**: tudo o que foi confirmado está anotado ali, à caneta. Se o sistema "esquecer" algo na queda, basta reler o livro. Por isso o que teve COMMIT **dura**.',
        check: {
          kind: 'choice',
          id: 'du-r',
          prompt: 'O que garante a durabilidade após uma queda de energia?',
          options: [
            { text: 'O registro de log', why: 'Isso.' },
            { text: 'O índice', why: 'O índice acelera buscas.' },
            { text: 'A view', why: 'A view é consulta salva.' },
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
      prompt: 'Qual propriedade ACID cada situação mostra?',
      categories: ['Consistência', 'Isolamento', 'Durabilidade'],
      items: [
        { text: 'O banco recusa um contrato com valor negativo, proibido por regra', cat: 0, why: 'Regras respeitadas.' },
        { text: 'Dois servidores editam o mesmo processo sem um estragar o outro', cat: 1, why: 'Simultâneas.' },
        { text: 'Após o COMMIT, o servidor reiniciou e o dado estava lá', cat: 2, why: 'Persistência.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Atomicidade: tudo ou nada', 'Durabilidade: persiste após o COMMIT', 'Isolamento: o dado é apagado após o COMMIT'],
      bug: 2,
      why: 'Isolamento trata de transações simultâneas sem interferência.',
      fixed: 'Isolamento: transações simultâneas sem interferência',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um pagamento grava o empenho e a liquidação. A gravação da liquidação falha. O que o banco deve fazer?',
      options: [
        { text: 'ROLLBACK: desfazer também o empenho', why: 'Isso: atomicidade.' },
        { text: 'COMMIT só do empenho', why: 'Ficaria pela metade: viola a atomicidade.' },
        { text: 'Apagar a tabela', why: 'Basta desfazer a transação.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.010' }],
  summary: [
    'Atomicidade: indivisível; falhou, ROLLBACK. Só o COMMIT confirma.',
    'Consistência: de um estado válido a outro, respeitando regras e restrições.',
    'Isolamento: transações simultâneas não interferem indevidamente.',
    'Durabilidade: após o COMMIT, persiste mesmo com queda de energia, graças ao log.',
  ],
};

export const dadosTxIsolamento: MicroLesson = {
  ...S,
  id: 'dados.transacoes.3',
  series: { id: 'dados.transacoes', order: 3 },
  title: 'Anomalias, níveis de isolamento e índices',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você lê o saldo de uma conta, e outra pessoa, ao mesmo tempo, está mudando esse saldo sem ter confirmado. Você deveria ver o valor novo?',
    options: [
      { text: 'Não: ele ainda pode ser desfeito', why: 'Isso. Ler isso seria uma "leitura suja". Esta aula mostra as anomalias e como evitá-las.' },
      { text: 'Sim, sempre o mais recente', why: 'Se a outra transação desfizer, você terá lido algo que nunca existiu.' },
      { text: 'Tanto faz', why: 'Faz diferença: decisões podem ser tomadas com um valor que nunca valeu.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'suja',
      part: 'Anomalias',
      title: 'Leitura suja',
      art: 'vazio',
      goal: 'Reconhecer a leitura suja.',
      explain:
        '**Leitura suja** (*dirty read*): ler um dado **alterado por outra transação ainda não confirmada**.\n\nSe essa outra transação fizer **ROLLBACK**, você terá lido um valor que **nunca existiu** de verdade.\n\nExemplo: o analista vê o contrato com valor R$ 900 mil, que outro usuário digitou e depois desfez.',
      check: {
        kind: 'choice',
        id: 'su-c',
        prompt: 'Ler um valor alterado por outra transação ainda sem COMMIT é:',
        options: [
          { text: 'Leitura suja', why: 'Isso.' },
          { text: 'Leitura fantasma', why: 'Fantasma é aparecer ou sumir linhas.' },
          { text: 'Leitura não repetível', why: 'Não repetível envolve outra transação que já confirmou.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'É como ler o **rascunho** de outra pessoa por cima do ombro e tomar uma decisão. Se ela apagar o rascunho, sua decisão se baseou em algo que **nunca foi publicado**. "Suja" porque ainda não foi "lavada" pelo COMMIT.',
        check: {
          kind: 'choice',
          id: 'su-r',
          prompt: 'Por que a leitura suja é perigosa?',
          options: [
            { text: 'O valor lido pode ser desfeito e nunca ter existido', why: 'Isso.' },
            { text: 'Porque apaga a tabela', why: 'Não apaga nada; o risco é ler algo provisório.' },
            { text: 'Porque é lenta', why: 'O problema não é velocidade, é ler dado não confirmado.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'repetivel-fantasma',
      part: 'Anomalias',
      title: 'Não repetível e fantasma',
      art: 'revisao',
      goal: 'Distinguir leitura não repetível de leitura fantasma.',
      explain:
        '- **Leitura não repetível**: ler a **mesma linha** duas vezes e obter **valores diferentes**, porque outra transação a **alterou e confirmou** no meio.\n- **Leitura fantasma** (*phantom*): repetir uma consulta e **aparecerem ou sumirem linhas**, porque outra transação **inseriu ou excluiu** e confirmou.\n\nDica: não repetível é **valor** que muda; fantasma é **linha** que aparece ou some.',
      check: {
        kind: 'choice',
        id: 'rf-c',
        prompt: 'Você conta os contratos de 2026 e acha 40. Conta de novo, na mesma transação, e acha 41, porque alguém inseriu um. Isso é:',
        options: [
          { text: 'Leitura fantasma', why: 'Isso: apareceu uma linha.' },
          { text: 'Leitura não repetível', why: 'Não repetível é o valor de uma mesma linha mudar.' },
          { text: 'Leitura suja', why: 'A inserção foi confirmada; não é dado sem COMMIT.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **chamada da turma**: se o aluno "Ana" muda de nota entre uma leitura e outra, é **não repetível** (o valor mudou). Se um **aluno novo** aparece na lista na segunda chamada, é **fantasma** (surgiu uma linha).',
        check: {
          kind: 'choice',
          id: 'rf-r',
          prompt: 'Você lê o valor do contrato 045 duas vezes e ele muda, porque outra transação alterou e confirmou. Isso é:',
          options: [
            { text: 'Leitura não repetível', why: 'Isso.' },
            { text: 'Leitura fantasma', why: 'Nenhuma linha apareceu ou sumiu; o valor mudou.' },
            { text: 'Leitura suja', why: 'A alteração foi confirmada.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'niveis',
      part: 'Níveis',
      title: 'O que cada nível evita',
      art: 'degraus',
      goal: 'Saber quais anomalias cada nível de isolamento evita.',
      explain:
        '- **READ UNCOMMITTED**: não evita nenhuma.\n- **READ COMMITTED**: evita a **leitura suja**.\n- **REPEATABLE READ**: evita suja e **não repetível**.\n- **SERIALIZABLE**: evita as **três**, inclusive o fantasma.\n\nO **READ COMMITTED** é o padrão do **PostgreSQL** e do **Oracle**. Implementações reais podem ir além do mínimo: o REPEATABLE READ do PostgreSQL também impede fantasmas.',
      check: {
        kind: 'choice',
        id: 'ni-c',
        prompt: 'No READ COMMITTED, segundo o padrão SQL:',
        options: [
          { text: 'Evita-se a leitura suja, mas não repetível e fantasma podem ocorrer', why: 'Isso.' },
          { text: 'Evitam-se as três anomalias', why: 'Isso é o SERIALIZABLE.' },
          { text: 'Nenhuma anomalia é evitada', why: 'Isso é o READ UNCOMMITTED.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Suba os degraus acumulando proteções: o **2º** (READ COMMITTED) tira a **suja**; o **3º** (REPEATABLE READ) tira também a **não repetível**; o **4º** (SERIALIZABLE) tira também o **fantasma**. O 1º não tira nada.',
        check: {
          kind: 'choice',
          id: 'ni-r',
          prompt: 'Qual o nível padrão do PostgreSQL e do Oracle?',
          options: [
            { text: 'READ COMMITTED', why: 'Isso.' },
            { text: 'SERIALIZABLE', why: 'É o mais forte, mas não é o padrão deles.' },
            { text: 'READ UNCOMMITTED', why: 'É o mais fraco.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'indice',
      part: 'Índices',
      title: 'Índice: rápido para ler, custoso para escrever',
      art: 'livro',
      goal: 'Saber o que é índice e qual seu custo.',
      explain:
        'Um **índice** é uma estrutura auxiliar que **acelera a localização** de linhas, como o **índice remissivo** de um livro.\n\n- O tipo padrão é a **árvore B**, boa para **igualdade**, **intervalos** e **ordenação**.\n- Índices **aceleram leituras**, mas **custam espaço** e **tornam as escritas mais lentas**: precisam ser atualizados a cada INSERT, UPDATE e DELETE.\n- São mais úteis em colunas **seletivas** (muitos valores distintos) usadas em filtros e junções.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Sobre índices, é correto afirmar:',
        options: [
          { text: 'Aceleram leituras, mas ocupam espaço e deixam as escritas mais lentas', why: 'Isso.' },
          { text: 'Sempre melhoram o desempenho de tudo', why: 'Pioram as escritas e ocupam espaço.' },
          { text: 'Funcionam melhor em colunas com poucos valores distintos', why: 'São mais úteis em colunas seletivas, com muitos valores distintos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No livro, o **índice remissivo** faz você achar "crase" em segundos. Mas, se o autor acrescenta um capítulo, precisa **refazer o índice**. E um índice de "a", "de", "o" (palavras que estão em toda página) não ajudaria: por isso índices servem mais para colunas **seletivas**.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Por que índices deixam as escritas mais lentas?',
          options: [
            { text: 'Precisam ser atualizados a cada INSERT, UPDATE e DELETE', why: 'Isso.' },
            { text: 'Porque apagam linhas', why: 'Índices não apagam nada.' },
            { text: 'Não deixam: escritas ficam mais rápidas', why: 'Ficam mais lentas por causa da atualização do índice.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'composto-explain',
      part: 'Índices',
      title: 'Índice composto e plano de execução',
      art: 'alvo',
      goal: 'Usar bem o índice composto e conhecer o EXPLAIN.',
      explain:
        '- Num índice composto **(ano, orgao)**, a **ordem importa**: ajuda consultas por **ano** ou por **ano e orgao**, mas pouco por **orgao** sozinho.\n- Funções sobre a coluna no filtro, como **WHERE UPPER(nome) = ...**, podem **impedir** o uso do índice comum.\n\nPara ver o que o banco fará, usa-se o **plano de execução**: **EXPLAIN** (e **EXPLAIN ANALYZE**, que executa e mede, no PostgreSQL). Alerta: **varredura completa** (*sequential scan*) em tabela grande com filtro seletivo.',
      check: {
        kind: 'choice',
        id: 'ce-c',
        prompt: 'Há um índice composto (ano, orgao). Qual consulta ele ajuda menos?',
        options: [
          { text: 'WHERE orgao = \'SEDUC\'', why: 'Isso: orgao sozinho não é o começo do índice.' },
          { text: 'WHERE ano = 2026', why: 'Ano é a primeira coluna: o índice ajuda.' },
          { text: 'WHERE ano = 2026 AND orgao = \'SEDUC\'', why: 'Usa as duas colunas na ordem: ajuda muito.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **lista telefônica** ordenada por **sobrenome e depois nome**. Achar "Silva" é fácil; achar "Silva, Ana" também. Mas achar todas as "Ana", de qualquer sobrenome, obriga a ler a lista toda. No índice (ano, orgao), o ano é o "sobrenome".',
        check: {
          kind: 'choice',
          id: 'ce-r',
          prompt: 'Qual comando mostra o plano de execução de uma consulta?',
          options: [
            { text: 'EXPLAIN', why: 'Isso.' },
            { text: 'GRANT', why: 'GRANT dá permissão.' },
            { text: 'TRUNCATE', why: 'TRUNCATE esvazia a tabela.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Que anomalia é cada situação?',
      categories: ['Leitura suja', 'Não repetível', 'Fantasma'],
      items: [
        { text: 'Leu um valor que depois foi desfeito', cat: 0, why: 'Sem COMMIT.' },
        { text: 'O mesmo empenho mudou de valor entre duas leituras', cat: 1, why: 'Valor da mesma linha.' },
        { text: 'Surgiram linhas novas ao repetir a consulta', cat: 2, why: 'Linhas que aparecem.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['READ COMMITTED: evita a leitura suja', 'SERIALIZABLE: evita as três anomalias', 'Índices sempre melhoram o desempenho'],
      bug: 2,
      why: 'Índices pioram as escritas e ocupam espaço.',
      fixed: 'Índices aceleram leituras e pioram escritas',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A tabela de empenhos tem milhões de linhas e há um índice em nome. Qual filtro aproveita melhor o índice comum?',
      scenarios: [
        { title: 'Filtro A', body: '```\nWHERE UPPER(nome) = \'ANA SOUZA\'\n```' },
        { title: 'Filtro B', body: '```\nWHERE nome = \'Ana Souza\'\n```' },
      ],
      answer: 1,
      why: 'A função UPPER sobre a coluna pode impedir o uso do índice comum; o filtro B compara a coluna direto.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.012' },
  ],
  summary: [
    'Leitura suja: ler dado sem COMMIT. Não repetível: o valor da mesma linha muda. Fantasma: linhas aparecem ou somem.',
    'READ UNCOMMITTED não evita nada; READ COMMITTED evita a suja; REPEATABLE READ evita também a não repetível; SERIALIZABLE evita as três.',
    'READ COMMITTED é o padrão do PostgreSQL e do Oracle.',
    'Índice (árvore B) acelera leituras, custa espaço e escritas; melhor em colunas seletivas.',
    'No composto (ano, orgao), a ordem importa. Funções na coluna podem impedir o índice. EXPLAIN mostra o plano.',
  ],
};
