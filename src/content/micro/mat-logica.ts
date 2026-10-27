// Série "Relações e dedução" (cap.mat.02, trecho associacao), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula contextualiza a história da lógica e apresenta enigmas de verdade e mentira; as seguintes
// ensinam a tabela de associação, a ordenação e o método das hipóteses, e por fim a dedução válida,
// uma ideia por etapa, com exemplos resolvidos. Fatos conferidos com o texto do capítulo
// (01-relacoes-deducao.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.02', sectionId: 'associacao' } as const;

export const matLogHistoria: MicroLesson = {
  ...S,
  id: 'mat.logica.1',
  series: { id: 'mat.logica', order: 1 },
  title: 'De Aristóteles aos enigmas de lógica',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Todo auditor é servidor. Paulo é auditor." O que se pode concluir com certeza?',
    options: [
      { text: 'Paulo é servidor', why: 'Isso. Esse tipo de raciocínio foi estudado há mais de dois mil anos. Esta aula conta essa história.' },
      { text: 'Paulo é engenheiro', why: 'Nada nas frases fala de engenheiros.' },
      { text: 'Nada se pode concluir', why: 'Pode-se, sim: se todo auditor é servidor e Paulo é auditor, Paulo é servidor.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'aristoteles',
      part: 'A história',
      title: 'Século IV a.C.: Aristóteles e os estoicos',
      art: 'computador',
      goal: 'Saber que a lógica como estudo das conclusões válidas começou na Grécia antiga.',
      explain:
        'No **século IV a.C.**, o filósofo grego **Aristóteles** estudou os **silogismos**: duas premissas com "todo", "algum" ou "nenhum" e uma conclusão que decorre delas.\n\nPouco depois, os filósofos **estoicos**, como **Crisipo** (século III a.C.), estudaram frases do tipo "**se... então**". Deles vêm formas que a prova cobra até hoje, como o *modus ponens*.\n\nA pergunta dos dois era a mesma: **quando uma conclusão é obrigatória?**',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'O que Aristóteles estudou nos silogismos?',
        options: [
          { text: 'Conclusões que decorrem de premissas com "todo", "algum" e "nenhum"', why: 'Isso.' },
          { text: 'Contas com frações', why: 'Ele estudou o raciocínio com quantificadores.' },
          { text: 'O movimento dos planetas', why: 'Nos silogismos, o assunto é a conclusão válida.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O silogismo é uma **escada de duas premissas**: "Todo auditor é servidor" (degrau 1), "Paulo é auditor" (degrau 2), logo "Paulo é servidor" (o topo). Aristóteles estudou quais escadas **sempre** levam ao topo.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Quem estudou as frases do tipo "se... então" na Grécia antiga?',
          options: [
            { text: 'Os estoicos, como Crisipo', why: 'Isso.' },
            { text: 'Euclides', why: 'Euclides é da geometria.' },
            { text: 'Fibonacci', why: 'Fibonacci é da Idade Média e das sequências.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'diagramas',
      part: 'A história',
      title: '1768 e 1880: os círculos de Euler e Venn',
      art: 'alvo',
      goal: 'Saber de onde vêm os diagramas de conjuntos.',
      explain:
        'O matemático suíço **Leonhard Euler**, em cartas a uma princesa alemã **publicadas em 1768**, explicou os silogismos com **círculos**: "todo A é B" é o círculo A **dentro** do círculo B.\n\nEm **1880**, o inglês **John Venn** propôs desenhar os círculos **sempre se cruzando** e marcar o que existe em cada parte.\n\nHoje, quando você desenha conjuntos para resolver "todo", "algum" e "nenhum", está usando a ideia deles.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Como Euler representou "todo A é B"?',
        options: [
          { text: 'O círculo A dentro do círculo B', why: 'Isso.' },
          { text: 'Os dois círculos separados', why: 'Separados é "nenhum A é B".' },
          { text: 'Um quadrado', why: 'Euler usou círculos.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pense em **gavetas**: se todo auditor é servidor, a gaveta dos auditores está **dentro** do armário dos servidores. Esse desenho de "gaveta dentro do armário" é o círculo de Euler.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: '"Nenhum A é B" se desenha com:',
          options: [
            { text: 'Círculos separados', why: 'Isso: não há elemento em comum.' },
            { text: 'Um círculo dentro do outro', why: 'Esse é o "todo A é B".' },
            { text: 'Círculos iguais, sobrepostos', why: 'Isso diria que A e B são o mesmo conjunto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'enigmas',
      part: 'A história',
      title: '1978: pessoas verídicas e mentirosas',
      art: 'professores',
      goal: 'Conhecer a origem dos enigmas de verdade e mentira.',
      explain:
        'Em **1978**, o matemático e lógico americano **Raymond Smullyan** publicou um livro de enigmas com uma grupo de **verídicos**, que **sempre dizem a verdade**, e **pessoas mentirosas**, que **sempre mentem**.\n\nOs enigmas de "quem fala a verdade" se espalharam pelos concursos. A técnica para resolvê-los é a mesma dos gregos: **supor** uma possibilidade e ver se ela leva a uma **contradição**.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'Nos enigmas de Smullyan, um mentiroso:',
        options: [
          { text: 'Sempre mente', why: 'Isso.' },
          { text: 'Sempre diz a verdade', why: 'Esse é o verídico.' },
          { text: 'Às vezes mente, às vezes não', why: 'Nos enigmas, cada um é sempre fiel ao seu tipo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No grupo, ninguém muda de lado: o **verídico** é como um relógio certo, **sempre** acerta; o **mentiroso** é como um relógio que sempre marca a hora errada. Se você souber qual é qual, toda frase vira pista.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'Qual é a técnica básica para esses enigmas?',
          options: [
            { text: 'Supor uma possibilidade e procurar contradição', why: 'Isso.' },
            { text: 'Escolher a resposta mais comprida', why: 'Na lógica, testa-se cada hipótese.' },
            { text: 'Acreditar em quem fala primeiro', why: 'Quem fala primeiro pode ser mentiroso.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['Silogismos de Aristóteles (século IV a.C.)', 'Círculos de Euler (1768)', 'Diagramas de Venn (1880)', 'Pessoas verídicas e mentirosas de Smullyan (1978)'],
      why: 'Da Grécia antiga aos enigmas modernos.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada ideia vem de quem?',
      categories: ['Aristóteles', 'Estoicos', 'Euler e Venn'],
      items: [
        { text: 'Silogismos com "todo" e "algum"', cat: 0, why: 'Século IV a.C.' },
        { text: 'Frases do tipo "se... então"', cat: 1, why: 'Crisipo e outros.' },
        { text: 'Círculos para conjuntos', cat: 2, why: '1768 e 1880.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Verídico: sempre diz a verdade', 'Mentiroso: sempre mente', '"Todo A é B": círculos separados'],
      bug: 2,
      why: '"Todo A é B" é o círculo A dentro de B; separados é "nenhum".',
      fixed: '"Todo A é B": A dentro de B',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Século IV a.C.: Aristóteles e os silogismos ("todo", "algum", "nenhum").',
    'Século III a.C.: os estoicos, como Crisipo, e as frases "se... então".',
    '1768: círculos de Euler; 1880: diagramas de Venn.',
    '1978: Raymond Smullyan e os verídicos (verdade) e pessoas mentirosas (mentira).',
  ],
};

export const matLogTabela: MicroLesson = {
  ...S,
  id: 'mat.logica.2',
  series: { id: 'mat.logica', order: 2 },
  title: 'Quem fez o quê: a tabela de associação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Três pessoas, três setores, um setor para cada. Se Ana está em TI, alguém mais pode estar em TI?',
    options: [
      { text: 'Não: cada setor tem uma só pessoa', why: 'Isso. Essa regra é a chave da tabela de associação.' },
      { text: 'Sim, quantas quiserem', why: 'O enunciado diz um setor para cada, sem repetir.' },
      { text: 'Depende do dia', why: 'Na associação um para um, ninguém mais fica em TI.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'montar',
      part: 'A ferramenta',
      title: 'Linhas, colunas, X e ✓',
      art: 'dados',
      goal: 'Montar a tabela de dupla entrada.',
      explain:
        'Quando há pessoas e atributos em correspondência **um para um**, monte uma tabela: **pessoas nas linhas**, **atributos nas colunas**.\n\n- Marque **X** onde uma pista **proíbe** a combinação.\n- Marque **✓** onde ela **confirma**.\n\nComo cada pessoa tem um só atributo e cada atributo uma só pessoa, cada **linha** e cada **coluna** terá **exatamente um ✓**.',
      check: {
        kind: 'choice',
        id: 'mo-c',
        prompt: 'A pista "Davi não trabalha em Obras" vira, na tabela:',
        options: [
          { text: 'Um X na casa Davi × Obras', why: 'Isso: a pista proíbe a combinação.' },
          { text: 'Um ✓ na casa Davi × Obras', why: '✓ é para combinação confirmada.' },
          { text: 'Um X em toda a coluna Obras', why: 'A pista só fala de Davi.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **quadro de chaves** da portaria: cada chave (setor) vai para **um** gancho (pessoa). Um X é um gancho em que aquela chave **não pode** ficar. Um ✓ é a chave **pendurada** no gancho certo.',
        check: {
          kind: 'choice',
          id: 'mo-r',
          prompt: 'Quantos ✓ cada linha terá no final?',
          options: [
            { text: 'Exatamente um', why: 'Isso: cada pessoa tem um só atributo.' },
            { text: 'Nenhum', why: 'Cada pessoa tem um atributo; há um ✓.' },
            { text: 'Tantos quantas colunas', why: 'Só um, porque é um para um.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'propagar',
      part: 'A ferramenta',
      title: 'Propagar e completar',
      art: 'engrenagem',
      goal: 'Usar as duas regras que fazem a tabela avançar.',
      explain:
        'Duas regras fazem a tabela andar sozinha:\n\n1. **Achou um ✓?** Marque X no **resto da linha** e no **resto da coluna**.\n2. **Sobrou uma só casa livre** numa linha ou coluna? Ela é o ✓.\n\nDepois de cada avanço, **volte às pistas condicionais**, como "quem trabalha em Obras não é Fábio". Uma pista que não ajudava antes pode ajudar agora.',
      example: 'Se Elisa está em Licitações (✓), ninguém mais está em Licitações (X na coluna) e Elisa não está em mais nada (X na linha).',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Numa linha de quatro casas, três já têm X. O que fazer com a quarta?',
        options: [
          { text: 'Marcar ✓', why: 'Isso: é a única possibilidade que sobrou.' },
          { text: 'Marcar X também', why: 'A pessoa ficaria sem atributo, o que é impossível.' },
          { text: 'Deixar em branco para sempre', why: 'Ela é obrigatoriamente o ✓.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Volte ao **quadro de chaves**: se três ganchos já estão proibidos para a chave de TI, ela **só pode** ir para o quarto. E, pendurada ali, aquele gancho não recebe mais nenhuma chave.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Depois de marcar um ✓, o que se faz?',
          options: [
            { text: 'X no resto da linha e da coluna', why: 'Isso.' },
            { text: '✓ em toda a coluna', why: 'Só uma pessoa por atributo.' },
            { text: 'Nada', why: 'O ✓ elimina o resto da linha e da coluna.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'resolver',
      part: 'Exemplo resolvido',
      title: 'Davi, Elisa, Fábio e Gina',
      art: 'pessoal',
      goal: 'Resolver uma associação completa, pista por pista.',
      explain:
        'Setores: Licitações, Pessoal, Obras e TI. Pistas: Davi não está em Obras nem em TI; Elisa está em Licitações ou TI; Fábio não está em Pessoal nem em Licitações; Gina não está em Licitações nem em TI; quem está em Obras não é Fábio.\n\n1. Fábio só pode estar em Obras ou TI, e não está em Obras: **Fábio em TI**.\n2. Elisa, entre Licitações e TI: **Licitações**.\n3. Davi, entre Licitações e Pessoal: **Pessoal**.\n4. Sobra **Obras para Gina**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Por que a pista sobre Fábio foi a primeira a ser usada?',
        options: [
          { text: 'Somada à última pista, deixava uma só opção para ele', why: 'Isso: comece pela pessoa mais restrita.' },
          { text: 'Porque Fábio vem em ordem alfabética', why: 'A ordem alfabética não importa; importa a restrição.' },
          { text: 'Porque era a pista mais longa', why: 'Comece por quem tem menos opções.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Comece por **quem tem menos saídas**. Fábio tinha quatro setores; duas pistas tiraram Pessoal e Licitações, e a última tirou Obras. Sobrou **TI**. A partir daí, cada pessoa perde uma opção, e a tabela se resolve em cadeia.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'No exemplo, em que setor ficou Gina?',
          options: [
            { text: 'Obras', why: 'Isso: foi o setor que sobrou.' },
            { text: 'TI', why: 'TI ficou com Fábio.' },
            { text: 'Licitações', why: 'Licitações ficou com Elisa.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a resolução do exemplo.',
      items: ['Fábio em TI', 'Elisa em Licitações', 'Davi em Pessoal', 'Gina em Obras'],
      why: 'Cada conclusão abre caminho para a seguinte.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['X: combinação proibida', '✓: combinação confirmada', 'Uma linha pode ter dois ✓'],
      bug: 2,
      why: 'Na associação um para um, cada linha tem exatamente um ✓.',
      fixed: 'Cada linha tem exatamente um ✓',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Você empacou numa associação. Qual próximo passo é melhor?',
      scenarios: [
        { title: 'Opção A', body: 'Voltar às **pistas condicionais** e procurar uma linha ou coluna com **uma só casa livre**.' },
        { title: 'Opção B', body: 'Chutar um ✓ qualquer e seguir em frente sem conferir.' },
      ],
      answer: 0,
      why: 'As duas regras (propagar e completar) e a releitura das pistas fazem a tabela avançar sem chute.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.001' }],
  summary: [
    'Tabela de dupla entrada: pessoas nas linhas, atributos nas colunas; X proíbe, ✓ confirma.',
    'Um para um: cada linha e cada coluna têm exatamente um ✓.',
    'Achou ✓: X no resto da linha e da coluna. Sobrou uma casa: é o ✓.',
    'Comece pela pessoa mais restrita e volte às pistas condicionais a cada avanço.',
  ],
};

export const matLogOrdem: MicroLesson = {
  ...S,
  id: 'mat.logica.3',
  series: { id: 'mat.logica', order: 3 },
  title: 'Ordenação e verdade ou mentira',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Vera chegou imediatamente antes de Tom." Pode haver alguém entre Vera e Tom?',
    options: [
      { text: 'Não: "imediatamente" cola os dois', why: 'Isso. Esta aula usa essa ideia de bloco.' },
      { text: 'Sim, uma pessoa', why: '"Imediatamente" não deixa espaço entre eles.' },
      { text: 'Sim, várias', why: 'Sem o "imediatamente", poderia; com ele, não.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'linha',
      part: 'Ordenação',
      title: 'A linha de posições',
      art: 'degraus',
      goal: 'Resolver ordenação com posições fixas e blocos.',
      explain:
        'Pistas como "antes de", "depois de" e "imediatamente" pedem uma **linha de posições**.\n\nExemplo: cinco servidores chegaram. **Ulisses** foi o 1º; Rui antes de Sara; Tom depois de Sara; Vera **imediatamente** antes de Tom.\n\n1. Fixe Ulisses na posição 1.\n2. Vera e Tom formam um **bloco** colado: Vera-Tom.\n3. Sara vem antes de Tom, e o bloco não se separa: Sara antes de Vera.\n4. Rui antes de Sara.\n\nOrdem: **Ulisses, Rui, Sara, Vera, Tom**.',
      check: {
        kind: 'choice',
        id: 'li-c',
        prompt: 'Por onde começar uma ordenação?',
        options: [
          { text: 'Pelas posições fixas e pelos blocos "imediatamente"', why: 'Isso: são as pistas mais fortes.' },
          { text: 'Pela pista mais vaga', why: 'Pistas vagas ajudam pouco no começo.' },
          { text: 'Pela ordem alfabética dos nomes', why: 'A ordem das letras não diz nada sobre a chegada.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine uma **fila de banco**. Quem já tem **senha 1** fica parado no lugar (posição fixa). Duas pessoas **de mãos dadas** andam juntas (bloco). Só depois você encaixa os outros com "antes" e "depois".',
        check: {
          kind: 'order',
          id: 'li-r',
          prompt: 'Ordene a chegada do exemplo.',
          items: ['Ulisses', 'Rui', 'Sara', 'Vera', 'Tom'],
          why: 'Ulisses fixo, Rui antes de Sara, e o bloco Vera-Tom no fim.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'hipoteses',
      part: 'Verdade e mentira',
      title: 'O método das hipóteses',
      art: 'balanca',
      goal: 'Testar cada hipótese e contar as verdades.',
      explain:
        'Quando o problema diz **quantos falam a verdade**, teste **cada possibilidade**.\n\nUm entre A, B e C extraviou um processo. A: "Foi B". B: "Não fui eu". C: "Não fui eu". Só **um** diz a verdade.\n\n| Culpado | Verdades |\n|---|---|\n| A | 2 (B e C) |\n| B | 2 (A e C) |\n| C | **1** (só B) |\n\nSó "C é o culpado" deixa **exatamente uma** verdade. O responsável é **C**.',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'Se o culpado fosse A, quantas frases seriam verdadeiras?',
        options: [
          { text: 'Duas: as de B e de C', why: 'Isso: B e C de fato não foram.' },
          { text: 'Uma', why: 'A frase de A seria falsa, mas as de B e C seriam verdadeiras.' },
          { text: 'Nenhuma', why: 'B e C diriam a verdade ao negar.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça como um **investigador**: "vou **supor** que foi A e ler cada depoimento". A frase "Foi B" fica falsa; "Não fui eu", de B, fica verdadeira; a de C, também. São **duas** verdades, e o enunciado pede uma. Descarte e teste o próximo suspeito.',
        check: {
          kind: 'choice',
          id: 'hi-r',
          prompt: 'Qual hipótese é a correta?',
          options: [
            { text: 'A única que respeita a quantidade de verdades informada', why: 'Isso: por isso se testam todas.' },
            { text: 'A primeira que você testar', why: 'É preciso testar até achar a que bate com o enunciado.' },
            { text: 'A que tem mais verdades', why: 'Vale a que tem exatamente a quantidade pedida.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'contradicao',
      part: 'Verdade e mentira',
      title: 'Pessoas verídicas e mentirosas e contradição',
      art: 'interruptor',
      goal: 'Resolver um enigma de pessoas verídicas e mentirosas por contradição.',
      explain:
        'Lembre: **verídico** sempre diz a verdade, **mentiroso** sempre mente.\n\nA diz: "**Nós dois somos pessoas mentirosas**".\n\n1. Suponha que A é **verídico**. Então a frase é verdadeira, e A seria mentiroso. **Contradição**.\n2. Logo, A é **mentiroso**, e a frase é **falsa**.\n3. Se é falso que "os dois são pessoas mentirosas", pelo menos um não é. Como A é, **B é verídico**.',
      check: {
        kind: 'choice',
        id: 'ct-c',
        prompt: 'Por que A não pode ser verídico?',
        options: [
          { text: 'Porque a frase dele, sendo verdadeira, o tornaria mentiroso', why: 'Isso: é uma contradição.' },
          { text: 'Porque ele falou primeiro', why: 'A ordem de fala não importa.' },
          { text: 'Porque verídicos não falam de si', why: 'Falam, sim; o problema é a contradição.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **interruptor**: só tem duas posições. Se ligar ("A é verídico") faz a lâmpada mostrar "desligado", o interruptor **não pode** estar ligado. Então está desligado: A é mentiroso. Daí, a frase é mentira, e B é verídico.',
        check: {
          kind: 'choice',
          id: 'ct-r',
          prompt: 'No enigma, B é:',
          options: [
            { text: 'Verídico', why: 'Isso: a frase falsa de A diz que não são os dois pessoas mentirosas.' },
            { text: 'Mentiroso', why: 'Se B fosse mentiroso, a frase de A seria verdadeira.' },
            { text: 'Não dá para saber', why: 'Dá: B é verídico.' },
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
      prompt: 'Ordene os passos do método das hipóteses.',
      items: ['Listar os possíveis culpados', 'Supor um culpado de cada vez', 'Contar as frases verdadeiras', 'Ficar com a hipótese que bate com o enunciado'],
      why: 'Testar todas e comparar com a quantidade pedida.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['"Imediatamente antes" forma bloco', 'Posições fixas primeiro', 'A hipótese certa é a de mais verdades'],
      bug: 2,
      why: 'A certa é a que tem exatamente a quantidade de verdades informada.',
      fixed: 'A hipótese certa respeita a quantidade informada',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Num problema de verdade e mentira, você testou a primeira hipótese e ela funcionou. O que fazer?',
      scenarios: [
        { title: 'Opção A', body: 'Marcar e seguir, sem testar as outras.' },
        { title: 'Opção B', body: 'Testar as outras **rapidamente** para confirmar que só ela funciona.' },
      ],
      answer: 1,
      why: 'Se duas hipóteses funcionassem, o problema teria outra leitura. Conferir evita o erro.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.002' },
  ],
  summary: [
    'Ordenação: linha de posições; comece pelas posições fixas e pelos blocos "imediatamente".',
    'Verdade e mentira: teste cada hipótese e conte as verdades; vale a que bate com o enunciado.',
    'Pessoas verídicas e mentirosas: suponha um tipo e procure contradição.',
  ],
};

export const matLogDeducao: MicroLesson = {
  ...S,
  id: 'mat.logica.4',
  series: { id: 'mat.logica', order: 4 },
  title: 'Dedução válida',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Se chove, a sessão é adiada. A sessão foi adiada." Dá para concluir que choveu?',
    options: [
      { text: 'Não: a sessão pode ter sido adiada por outro motivo', why: 'Isso. Esta aula mostra por que essa conclusão é uma falácia.' },
      { text: 'Sim, com certeza', why: 'Essa é a falácia da afirmação do consequente.' },
      { text: 'Sim, se for inverno', why: 'A estação não muda a forma do argumento.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'conjuntos',
      part: 'Quantificadores',
      title: 'Desenhar antes de concluir',
      art: 'alvo',
      goal: 'Testar argumentos com "todo", "algum" e "nenhum" usando círculos.',
      explain:
        'Um argumento é **válido** quando, com as premissas verdadeiras, a conclusão é **obrigatoriamente** verdadeira.\n\n"Todo auditor é servidor. Algum servidor é engenheiro. Logo, algum auditor é engenheiro."\n\nDesenhe: o círculo dos auditores **dentro** do dos servidores. Os engenheiros cruzam o dos servidores, mas podem ficar **na parte de fora dos auditores**. A conclusão **não é obrigatória**: o argumento é **inválido**.',
      check: {
        kind: 'choice',
        id: 'cj-c',
        prompt: '"Nenhum estagiário assina relatório. Todo auditor assina relatório. Logo, nenhum auditor é estagiário." O argumento é:',
        options: [
          { text: 'Válido', why: 'Isso: os auditores estão dentro dos que assinam, que não tocam os estagiários.' },
          { text: 'Inválido', why: 'Desenhe: não há como um auditor ser estagiário.' },
          { text: 'Depende de quantos auditores existem', why: 'A validade depende da forma, não da quantidade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Procure um **contraexemplo**: dá para desenhar as premissas verdadeiras e a conclusão falsa? Se der, o argumento é **inválido**. No caso dos engenheiros, basta pôr os engenheiros só entre os servidores que **não** são auditores.',
        check: {
          kind: 'choice',
          id: 'cj-r',
          prompt: 'Validade depende de quê?',
          options: [
            { text: 'Da forma do argumento', why: 'Isso: não de a conclusão "parecer" certa.' },
            { text: 'De a conclusão parecer verdadeira', why: 'Parecer não basta; precisa ser obrigatória.' },
            { text: 'Do número de premissas', why: 'O que importa é a forma.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'condicionais',
      part: 'Condicionais',
      title: 'Ponens, tollens e as falácias',
      art: 'interruptor',
      goal: 'Distinguir as formas válidas das falácias com "se... então".',
      explain:
        'Com "**se P, então Q**":\n\n| Forma | Estrutura | |\n|---|---|---|\n| *Modus ponens* | P; logo Q | válida |\n| *Modus tollens* | não Q; logo não P | válida |\n| Afirmar o consequente | Q; logo P | **falácia** |\n| Negar o antecedente | não P; logo não Q | **falácia** |\n\n"Se chove, adia. Adiou. Logo choveu" é **afirmar o consequente**.',
      check: {
        kind: 'choice',
        id: 'cd-c',
        prompt: '"Se há sobrepreço, há dano. Não há dano. Logo, não há sobrepreço." Essa forma é:',
        options: [
          { text: 'Modus tollens, válida', why: 'Isso: não Q, logo não P.' },
          { text: 'Afirmação do consequente, falácia', why: 'Afirmar o consequente seria "há dano, logo há sobrepreço".' },
          { text: 'Negação do antecedente, falácia', why: 'Negar o antecedente seria "não há sobrepreço, logo não há dano".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no **alarme de incêndio**: "se há fogo, o alarme toca". Se o alarme **não tocou**, não há fogo (tollens). Mas se o alarme **tocou**, pode ter sido teste ou fumaça de cigarro: concluir "há fogo" é a falácia.',
        check: {
          kind: 'choice',
          id: 'cd-r',
          prompt: '"Se P, então Q" equivale a:',
          options: [
            { text: 'Se não Q, então não P', why: 'Isso: é a contrapositiva.' },
            { text: 'Se Q, então P', why: 'Essa é a recíproca, que não equivale.' },
            { text: 'Se não P, então não Q', why: 'Essa é a inversa, que não equivale.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'negacao',
      part: 'Negações',
      title: 'Negar "todo" e "nenhum"',
      art: 'vazio',
      goal: 'Negar corretamente frases com "todo" e "nenhum".',
      explain:
        'Duas negações que caem muito:\n\n- a negação de "**Todo** servidor é concursado" é "**Algum** servidor **não** é concursado";\n- a negação de "**Nenhum** processo atrasou" é "**Algum** processo atrasou".\n\nA pegadinha é trocar "todo" por "nenhum". Para desmentir "todos foram entregues", **basta um** que não foi.',
      check: {
        kind: 'choice',
        id: 'ng-c',
        prompt: 'A negação de "Todo relatório foi entregue" é:',
        options: [
          { text: 'Algum relatório não foi entregue', why: 'Isso: basta um para desmentir.' },
          { text: 'Nenhum relatório foi entregue', why: 'Pegadinha: isso é mais forte do que a negação.' },
          { text: 'Todo relatório não foi entregue', why: 'Isso equivale a "nenhum foi entregue".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O chefe diz: "**todos** entregaram o relatório". Para provar que ele errou, você não precisa mostrar que **ninguém** entregou. Basta apontar **um colega** que não entregou. A negação de "todo" é "algum não".',
        check: {
          kind: 'choice',
          id: 'ng-r',
          prompt: 'A negação de "Nenhum processo atrasou" é:',
          options: [
            { text: 'Algum processo atrasou', why: 'Isso.' },
            { text: 'Todo processo atrasou', why: 'Basta um atrasado para desmentir.' },
            { text: 'Nenhum processo foi julgado', why: 'Mudou o assunto da frase.' },
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
      prompt: 'Cada forma é válida ou falácia?',
      categories: ['Válida', 'Falácia'],
      items: [
        { text: 'Se P então Q; P; logo Q', cat: 0, why: 'Modus ponens.' },
        { text: 'Se P então Q; não Q; logo não P', cat: 0, why: 'Modus tollens.' },
        { text: 'Se P então Q; Q; logo P', cat: 1, why: 'Afirmação do consequente.' },
        { text: 'Se P então Q; não P; logo não Q', cat: 1, why: 'Negação do antecedente.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: '"Todo auditor é servidor. Algum servidor é engenheiro." Qual conclusão é obrigatória?',
      scenarios: [
        { title: 'Opção A', body: '"Algum auditor é engenheiro."' },
        { title: 'Opção B', body: 'Nenhuma das duas: os engenheiros podem estar fora dos auditores; só se garante que **algum servidor é engenheiro**.' },
      ],
      answer: 1,
      why: 'Desenhando, os engenheiros podem ficar entre os servidores que não são auditores.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Negação de "todo": "algum não"', 'Negação de "nenhum": "algum"', 'Negação de "todo": "nenhum"'],
      bug: 2,
      why: 'Basta um contraexemplo: "algum não".',
      fixed: 'Negação de "todo" não é "nenhum"',
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.004' }],
  summary: [
    'Válido: premissas verdadeiras obrigam a conclusão. Desenhe os conjuntos e procure contraexemplo.',
    'Válidas: modus ponens e modus tollens. Falácias: afirmar o consequente e negar o antecedente.',
    '"Se P, então Q" equivale a "se não Q, então não P" (contrapositiva).',
    'Negação de "todo" é "algum não"; de "nenhum", "algum".',
  ],
};
