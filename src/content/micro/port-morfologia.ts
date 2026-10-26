// Série "Morfossintaxe, formação de palavras e sinonímia" (cap.port.01, trecho morfologia), no ritmo
// lento com história pedido em 25/10/2026: a primeira aula conta de Dionísio Trácio à NGB; as
// seguintes ensinam classes, funções e os valores de "que" e "se", depois estrutura, formação e
// sentido das palavras, uma ideia por etapa. Regras conferidas com o texto do capítulo
// (04-morfologia.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.01', sectionId: 'morfologia' } as const;

export const portMorHistoria: MicroLesson = {
  ...S,
  id: 'port.morfologia.1',
  series: { id: 'port.morfologia', order: 1 },
  title: 'De Dionísio Trácio à NGB',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Substantivo, adjetivo, verbo... Quem inventou a ideia de separar as palavras em classes?',
    options: [
      { text: 'Os gregos antigos', why: 'Isso. Esta aula conta essa história até os nomes usados hoje nos concursos.' },
      { text: 'As bancas de concurso', why: 'As bancas usam nomes muito mais antigos que elas.' },
      { text: 'Os computadores', why: 'A gramática é muito mais antiga que os computadores.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'dionisio',
      part: 'A história',
      title: 'Século II a.C.: oito classes',
      art: 'livro',
      goal: 'Saber que Dionísio Trácio dividiu as palavras em classes.',
      explain:
        'No **século II a.C.**, o gramático grego **Dionísio Trácio** escreveu a ***Arte da Gramática***.\n\nNela, dividiu as palavras em **oito classes**, conforme **o que elas são**.\n\nA ideia de que "**mesa**" é um tipo de palavra e "**correr**" é outro, cada um com seu papel, começa aí. É a raiz da **morfologia**, o estudo das **classes** e da **forma** das palavras.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'O que Dionísio Trácio fez na Arte da Gramática?',
        options: [
          { text: 'Dividiu as palavras em oito classes', why: 'Isso.' },
          { text: 'Criou o Acordo Ortográfico', why: 'O Acordo é de 1990.' },
          { text: 'Inventou a vírgula', why: 'A vírgula tem outra história.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em organizar uma **caixa de ferramentas**: martelos num lugar, chaves em outro. Dionísio fez isso com as palavras: separou-as em **gavetas** (classes) pelo tipo. Até hoje se pergunta, na prova: "de que **classe** é esta palavra?".',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'Morfologia estuda:',
          options: [
            { text: 'As classes e a forma das palavras', why: 'Isso.' },
            { text: 'Só a pontuação', why: 'Pontuação é outro assunto.' },
            { text: 'Só o som das palavras', why: 'O som é da fonologia.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'portugues',
      part: 'A história',
      title: '1536 e 1540: as primeiras gramáticas do português',
      art: 'cartao',
      goal: 'Conhecer as primeiras gramáticas da língua portuguesa.',
      explain:
        'O português também ganhou suas gramáticas:\n\n- em **1536**, **Fernão de Oliveira** publicou a ***Gramática da Linguagem Portuguesa***;\n- em **1540**, **João de Barros** publicou a sua ***Gramática***.\n\nPela primeira vez, alguém descreveu **as regras do português** como língua própria, e não só do latim.',
      check: {
        kind: 'order',
        id: 'po-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Arte da Gramática de Dionísio Trácio (século II a.C.)', 'Gramática de Fernão de Oliveira (1536)', 'Gramática de João de Barros (1540)'],
        why: 'Do grego ao português do século XVI.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Durante séculos, quem estudava gramática na Europa estudava **latim**. Fernão de Oliveira e João de Barros mostraram que o **português** também tinha regras próprias que valia a pena escrever. Foram os primeiros "manuais" da nossa língua.',
        check: {
          kind: 'choice',
          id: 'po-r',
          prompt: 'Quem publicou a Gramática da Linguagem Portuguesa, em 1536?',
          options: [
            { text: 'Fernão de Oliveira', why: 'Isso.' },
            { text: 'Gonçalves Dias', why: 'Gonçalves Dias foi poeta do século XIX.' },
            { text: 'Dionísio Trácio', why: 'Dionísio escreveu sobre o grego, no século II a.C.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ngb',
      part: 'A história',
      title: '1959: os nomes padronizados',
      art: 'balanca',
      goal: 'Saber que a NGB padronizou os nomes gramaticais no Brasil.',
      explain:
        'Cada gramático dava **nomes diferentes** às mesmas coisas, e os alunos se confundiam.\n\nEm **1959**, no Brasil, a **Nomenclatura Gramatical Brasileira (NGB)** fixou os nomes usados nas **escolas** e nos **concursos**.\n\nÉ por causa dela que todas as bancas falam em "**derivação parassintética**", "**conjunção integrante**" e outros termos que esta série vai ensinar.',
      check: {
        kind: 'choice',
        id: 'ng-c',
        prompt: 'Para que serviu a NGB, de 1959?',
        options: [
          { text: 'Padronizar os nomes gramaticais usados nas escolas e concursos', why: 'Isso.' },
          { text: 'Mudar a ortografia', why: 'Ortografia é assunto dos acordos e reformas.' },
          { text: 'Criar novas palavras', why: 'Ela fixou nomes de conceitos gramaticais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine cada hospital chamando o mesmo remédio por um nome diferente: seria perigoso. A **NGB** fez a gramática "falar a mesma língua": um nome só para cada conceito, em todo o país.',
        check: {
          kind: 'choice',
          id: 'ng-r',
          prompt: 'O que quer dizer a sigla NGB?',
          options: [
            { text: 'Nomenclatura Gramatical Brasileira', why: 'Isso.' },
            { text: 'Norma Geral de Bancas', why: 'É Nomenclatura Gramatical Brasileira.' },
            { text: 'Novo Guia de Barros', why: 'É Nomenclatura Gramatical Brasileira.' },
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
      lines: ['Dionísio Trácio: oito classes de palavras', 'João de Barros: gramática de 1540', 'NGB: Acordo Ortográfico de 1959'],
      bug: 2,
      why: 'A NGB padronizou nomes gramaticais; o Acordo Ortográfico é de 1990.',
      fixed: 'NGB: nomes gramaticais padronizados (1959)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem ou o quê, em cada época?',
      categories: ['Século II a.C.', 'Século XVI', '1959'],
      items: [
        { text: 'Arte da Gramática', cat: 0, why: 'Dionísio Trácio.' },
        { text: 'Fernão de Oliveira e João de Barros', cat: 1, why: '1536 e 1540.' },
        { text: 'Nomenclatura Gramatical Brasileira', cat: 2, why: 'NGB.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: duas apostilas chamam a mesma coisa por nomes diferentes. Qual nome a prova vai usar?',
      options: [
        { text: 'O da NGB, padrão nas bancas', why: 'Isso.' },
        { text: 'O mais antigo', why: 'O padrão é a NGB.' },
        { text: 'Qualquer um', why: 'As bancas seguem a nomenclatura padronizada.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Dionísio Trácio (século II a.C.), Arte da Gramática: oito classes de palavras, raiz da morfologia.',
    'Fernão de Oliveira (1536) e João de Barros (1540): primeiras gramáticas do português.',
    'NGB (1959): nomes gramaticais padronizados nas escolas e concursos.',
  ],
};

export const portMorClasses: MicroLesson = {
  ...S,
  id: 'port.morfologia.2',
  series: { id: 'port.morfologia', order: 2 },
  title: 'Classes, funções e os valores de "que" e "se"',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Em "O olhar do relator era severo", "olhar" é verbo?',
    options: [
      { text: 'Não: aqui funciona como substantivo, com "o" antes', why: 'Isso: a palavra mudou de classe pelo uso. Esta aula mostra como reconhecer.' },
      { text: 'Sim, sempre é verbo', why: 'Com artigo e sendo sujeito, "olhar" vira substantivo.' },
      { text: 'É advérbio', why: 'É um substantivo: "o olhar" é o sujeito.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'classes-funcoes',
      part: 'Classes e funções',
      title: 'O que a palavra é e o que ela faz',
      art: 'pessoal',
      goal: 'Distinguir classe (morfologia) de função (sintaxe).',
      explain:
        '**Morfossintaxe** estuda junto a **classe** (o que a palavra **é**) e a **função** (o que ela **faz** na frase).\n\n- **Substantivo**: sujeito, objeto, predicativo, aposto.\n- **Adjetivo**: adjunto adnominal, predicativo.\n- **Advérbio**: adjunto adverbial.\n- **Verbo**: núcleo do predicado.\n- **Pronome**: substitui ou acompanha o substantivo.\n- **Preposição** e **conjunção**: conectam termos e orações.',
      check: {
        kind: 'choice',
        id: 'cf-c',
        prompt: 'Em "O auditor analisou rapidamente o contrato", qual a classe de "rapidamente"?',
        options: [
          { text: 'Advérbio (função de adjunto adverbial)', why: 'Isso: indica o modo.' },
          { text: 'Adjetivo', why: 'Adjetivo acompanha substantivo; "rapidamente" modifica o verbo.' },
          { text: 'Substantivo', why: 'Não nomeia nada: indica modo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **ator**: ele **é** uma pessoa (a classe), mas **faz** papéis diferentes em cada peça (a função). A palavra também: "rapidamente" **é** advérbio e, nesta frase, **faz** o papel de adjunto adverbial, dizendo **como** foi a análise.',
        check: {
          kind: 'choice',
          id: 'cf-r',
          prompt: 'Preposições e conjunções servem para:',
          options: [
            { text: 'Conectar termos e orações', why: 'Isso.' },
            { text: 'Nomear seres', why: 'Isso é o substantivo.' },
            { text: 'Ser núcleo do predicado', why: 'Isso é o verbo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'impropria',
      part: 'Classes e funções',
      title: 'Quando a palavra muda de classe',
      art: 'interruptor',
      goal: 'Reconhecer a derivação imprópria.',
      explain:
        'A mesma palavra pode **mudar de classe** conforme o uso, **sem mudar a forma**. Isso é a **derivação imprópria**.\n\n- "O **olhar** do relator era severo": verbo usado como **substantivo**.\n- "Ele falou **alto**": adjetivo usado como **advérbio**, invariável.\n- "O **porquê** da decisão": conjunção **substantivada**.\n\nA pista costuma ser um **artigo** antes ("o olhar", "o porquê") ou a palavra modificando um **verbo**.',
      check: {
        kind: 'choice',
        id: 'im-c',
        prompt: 'Em "O sim do conselho surpreendeu", "sim" é:',
        options: [
          { text: 'Substantivo, por derivação imprópria', why: 'Isso: com artigo, vira substantivo.' },
          { text: 'Advérbio', why: 'Normalmente é, mas aqui tem artigo e é sujeito.' },
          { text: 'Verbo', why: 'Não indica ação: é o nome da resposta.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Ponha um "**o**" na frente e veja se dá sentido de **nome**: "o sim", "o olhar", "o porquê", "o amanhã". Se a palavra passa a **nomear** algo, virou substantivo. A forma não mudou; mudou o **uso**.',
        check: {
          kind: 'choice',
          id: 'im-r',
          prompt: 'Em "Os auditores falaram baixo", "baixo" funciona como:',
          options: [
            { text: 'Advérbio, invariável', why: 'Isso: modifica o verbo "falaram".' },
            { text: 'Adjetivo no plural', why: 'Modifica o verbo, não o substantivo: fica invariável.' },
            { text: 'Substantivo', why: 'Não nomeia nada: indica o modo de falar.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'que',
      part: 'Que e se',
      title: 'Os valores de "que"',
      art: 'degraus',
      goal: 'Distinguir os principais valores de "que".',
      explain:
        '- **Pronome relativo**: retoma um termo; troca-se por "**o qual**". "O relatório **que** li..."\n- **Conjunção integrante**: inicia oração substantiva; troca-se por "**isso**". "Sabe-se **que** houve dano." (Sabe-se **isso**.)\n- **Consecutiva**: com "tão", "tanto". "Era tão complexo **que** demorou."\n- **Causal ou explicativa**: "Apresse-se, **que** o prazo acaba."\n- **Expletiva**: pode ser retirada. "Nós é **que** decidimos."',
      check: {
        kind: 'choice',
        id: 'qu-c',
        prompt: 'Em "Sabe-se que houve dano", o "que" é:',
        options: [
          { text: 'Conjunção integrante', why: 'Isso: troca-se por "isso" (sabe-se isso).' },
          { text: 'Pronome relativo', why: 'Não retoma nenhum termo anterior.' },
          { text: 'Partícula expletiva', why: 'Não pode ser retirado sem estragar a frase.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Faça os **dois testes de troca**. Dá para pôr "**o qual**"? ("O relatório o qual li": dá.) É **relativo**. Dá para trocar a oração inteira por "**isso**"? ("Sabe-se isso": dá.) É **integrante**. Se dá para **apagar** o "que" sem perder nada, é **expletivo**.',
        check: {
          kind: 'choice',
          id: 'qu-r',
          prompt: 'Em "O processo que analisei foi arquivado", o "que" é:',
          options: [
            { text: 'Pronome relativo', why: 'Isso: retoma "processo" (o qual analisei).' },
            { text: 'Conjunção integrante', why: 'Não dá para trocar por "isso".' },
            { text: 'Conjunção consecutiva', why: 'Não há "tão" ou "tanto".' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'se',
      part: 'Que e se',
      title: 'Os valores de "se"',
      art: 'balanca',
      goal: 'Distinguir os principais valores de "se".',
      explain:
        '- **Pronome apassivador**: voz passiva sintética, com verbo **transitivo direto**. "Analisaram-**se** as contas." (As contas foram analisadas.)\n- **Índice de indeterminação do sujeito**: com verbo transitivo **indireto**, intransitivo ou de ligação. "Precisa-**se** de técnicos."\n- **Reflexivo**: a ação volta para o sujeito. "O gestor **se** defendeu."\n- **Conjunção condicional**: "**Se** houver dano, haverá ressarcimento."\n- **Conjunção integrante**: "Perguntou **se** o prazo vencera."',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Em "Precisa-se de técnicos", o "se" é:',
        options: [
          { text: 'Índice de indeterminação do sujeito', why: 'Isso: "precisar de" é transitivo indireto.' },
          { text: 'Pronome apassivador', why: 'O apassivador vem com transitivo direto; "precisar de" tem preposição.' },
          { text: 'Conjunção condicional', why: 'Não há condição.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Olhe o **verbo**. Se ele liga **direto** ao complemento (analisar **as contas**), dá para virar passiva: "as contas **foram analisadas**": o "se" é **apassivador**. Se tem **preposição** (precisar **de**), não vira passiva: o "se" só deixa o sujeito **indeterminado**.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Em "Analisaram-se as contas", o "se" é:',
          options: [
            { text: 'Pronome apassivador', why: 'Isso: equivale a "as contas foram analisadas".' },
            { text: 'Reflexivo', why: 'As contas não analisam a si mesmas.' },
            { text: 'Índice de indeterminação do sujeito', why: '"Analisar" é transitivo direto: o "se" é apassivador.' },
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
      prompt: 'Que valor tem o "que" em cada frase?',
      categories: ['Relativo', 'Integrante', 'Consecutiva'],
      items: [
        { text: 'O ofício que chegou está na mesa.', cat: 0, why: 'O qual chegou.' },
        { text: 'Informou que a sessão foi adiada.', cat: 1, why: 'Informou isso.' },
        { text: 'Choveu tanto que a sessão foi adiada.', cat: 2, why: 'Com "tanto".' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['"Precisa-se de técnicos": indeterminação', '"O gestor se defendeu": reflexivo', '"Analisaram-se as contas": indeterminação do sujeito'],
      bug: 2,
      why: '"Analisar" é transitivo direto: o "se" é apassivador (as contas foram analisadas).',
      fixed: '"Analisaram-se as contas": pronome apassivador',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: "Perguntou se o relatório estava pronto." O "se" é:',
      options: [
        { text: 'Conjunção integrante', why: 'Isso: perguntou isso.' },
        { text: 'Condicional', why: 'Não há condição: há uma pergunta indireta.' },
        { text: 'Reflexivo', why: 'Não há ação voltada ao sujeito.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'Classe é o que a palavra é; função é o que ela faz na frase.',
    'Derivação imprópria: muda a classe sem mudar a forma (o olhar, falou alto, o porquê).',
    '"Que": relativo (o qual), integrante (isso), consecutivo (tão, tanto), causal, expletivo.',
    '"Se": apassivador (transitivo direto), indeterminação (com preposição ou intransitivo), reflexivo, condicional, integrante.',
  ],
};

export const portMorFormacao: MicroLesson = {
  ...S,
  id: 'port.morfologia.3',
  series: { id: 'port.morfologia', order: 3 },
  title: 'Estrutura, formação e sentido das palavras',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Existe a palavra "entarde"? E "tardecer"? E "entardecer"?',
    options: [
      { text: 'Só "entardecer" existe', why: 'Isso: o prefixo e o sufixo entraram juntos. Esta aula mostra esse e outros processos.' },
      { text: 'As três existem', why: '"Entarde" e "tardecer" não existem: só a palavra completa.' },
      { text: 'Nenhuma existe', why: '"Entardecer" existe, e é o exemplo clássico desta aula.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'estrutura',
      part: 'Estrutura',
      title: 'Radical, afixos e desinências',
      art: 'degraus',
      goal: 'Identificar as partes de uma palavra.',
      explain:
        'Em "**infraestruturas**":\n\n- **radical**: a base do significado, **estrutur-**;\n- **afixos**: **prefixo** (antes), **infra-**; **sufixo** (depois), quando há;\n- **vogal temática**: liga o radical às desinências, **-a-**;\n- **desinências**: indicam gênero, número, pessoa, tempo, como o **-s** do plural.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Em "infraestruturas", o que é "infra-"?',
        options: [
          { text: 'Prefixo', why: 'Isso: vem antes do radical.' },
          { text: 'Radical', why: 'O radical é estrutur-.' },
          { text: 'Desinência', why: 'A desinência é o -s do plural.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **casa**: o **radical** é o terreno com a construção principal (o sentido); o **prefixo** é a varanda da frente; o **sufixo**, os fundos; e as **desinências** são as placas na porta dizendo quantos moram (plural) ou quando (tempo).',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'O -s de "infraestruturas" é:',
          options: [
            { text: 'Desinência de número (plural)', why: 'Isso.' },
            { text: 'Prefixo', why: 'Prefixo vem antes.' },
            { text: 'Vogal temática', why: 'A vogal temática é o -a-.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'derivacao',
      part: 'Formação',
      title: 'Prefixal, sufixal ou parassintética',
      art: 'balanca',
      goal: 'Distinguir derivação prefixal e sufixal de parassíntese.',
      explain:
        '- **Prefixal**: acrescenta prefixo. **in**constitucional, **re**analisar.\n- **Sufixal**: acrescenta sufixo. fiscaliza**ção**, transparên**cia**.\n- **Prefixal e sufixal**: prefixo e sufixo **independentes**; a palavra existe sem um deles. **des**leal**dade** (existem "desleal" e "lealdade").\n- **Parassintética**: prefixo e sufixo **simultâneos**; não existe só com um. **en**tard**ecer**, **em**pobr**ecer**, **a**mold**ar** (não existem "entarde" nem "tardecer").',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: '"Empobrecer" e "entardecer" são formadas por:',
        options: [
          { text: 'Derivação parassintética', why: 'Isso: prefixo e sufixo entraram juntos.' },
          { text: 'Derivação prefixal e sufixal', why: 'Nesse caso existiriam "empobre" ou "pobrecer", o que não ocorre.' },
          { text: 'Derivação regressiva', why: 'A regressiva reduz a palavra, como em "combate".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Faça o **teste de tirar um pedaço**. Tire o prefixo de "desleal**dade**": sobra "lealdade", que existe. Tire o sufixo: sobra "desleal", que existe. Então é **prefixal e sufixal**. Em "entardecer", tirar qualquer pedaço dá "tardecer" ou "entarde", que **não existem**: é **parassintética**.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: '"Deslealdade" é formada por:',
          options: [
            { text: 'Derivação prefixal e sufixal', why: 'Isso: existem "desleal" e "lealdade".' },
            { text: 'Derivação parassintética', why: 'As partes existem separadas: não é parassíntese.' },
            { text: 'Composição por aglutinação', why: 'Não há duas palavras unidas.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'regressiva',
      part: 'Formação',
      title: 'Regressiva e imprópria',
      art: 'revisao',
      goal: 'Reconhecer derivação regressiva e imprópria.',
      explain:
        '- **Regressiva**: **supressão** de parte da palavra; forma substantivos a partir de **verbos**. debater → **debate**; combater → **combate**; buscar → **busca**.\n- **Imprópria**: **mudança de classe** sem alterar a forma. "o **sim** do conselho".\n\nNa regressiva, a palavra **encolhe**; na imprópria, ela **fica igual** e muda de papel.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: '"Combate" (de combater) é formado por:',
        options: [
          { text: 'Derivação regressiva', why: 'Isso: o substantivo nasce da redução do verbo.' },
          { text: 'Derivação sufixal', why: 'Nada foi acrescentado: algo foi retirado.' },
          { text: 'Composição por justaposição', why: 'Não há duas palavras unidas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Compare os tamanhos: com**bater** é maior que com**bate**. Se o substantivo é **menor** que o verbo de onde veio, houve **corte**: regressiva. Se a palavra é **idêntica** mas mudou de classe ("o jantar", "o sim"), é imprópria.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: '"Busca" (de buscar) é exemplo de:',
          options: [
            { text: 'Derivação regressiva', why: 'Isso.' },
            { text: 'Derivação imprópria', why: 'A forma mudou (ficou menor): é regressiva.' },
            { text: 'Hibridismo', why: 'Não há línguas diferentes misturadas.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'composicao',
      part: 'Formação',
      title: 'Composição, hibridismo e siglas',
      art: 'cartao',
      goal: 'Distinguir justaposição, aglutinação, hibridismo e sigla.',
      explain:
        '- **Justaposição**: une palavras **sem alteração** de som. passatempo, guarda-chuva, segunda-feira.\n- **Aglutinação**: une **com perda** de fonemas. **planalto** (plano + alto), **embora** (em boa hora), fidalgo.\n- **Hibridismo**: elementos de **línguas diferentes**. automóvel (grego + latim), sociologia.\n- **Sigla e abreviação**: redução. TCE, foto, pneu.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: '"Planalto" é formado por:',
        options: [
          { text: 'Composição por aglutinação', why: 'Isso: plano + alto, com perda de fonema.' },
          { text: 'Composição por justaposição', why: 'Na justaposição nada se perde; aqui o "o" de plano sumiu.' },
          { text: 'Hibridismo', why: 'As duas partes são do português.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Escreva as duas palavras lado a lado e compare: "**passa + tempo**" → passatempo, **nada sumiu**: justaposição. "**plano + alto**" → planalto, **sumiu o "o"**: aglutinação. Se as partes vêm de **línguas diferentes** (auto, grego; móvel, latim), é hibridismo.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"Guarda-chuva" é formado por:',
          options: [
            { text: 'Justaposição', why: 'Isso: nada se perdeu na junção.' },
            { text: 'Aglutinação', why: 'Não houve perda de fonemas.' },
            { text: 'Derivação parassintética', why: 'São duas palavras unidas, não prefixo e sufixo.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sentido',
      part: 'Sentido',
      title: 'Sinônimos, antônimos e hiperônimos',
      art: 'livro',
      goal: 'Escolher sinônimos pelo contexto e reconhecer polissemia e hiperônimos.',
      explain:
        '- **Sinônimos**: sentido igual ou próximo **no contexto**. "O conselheiro **ponderou** que..." aceita "observou", mas não "pesou".\n- **Antônimos**: sentido oposto. lícito × ilícito, prolixo × conciso, **exíguo** × amplo.\n- **Polissemia**: vários sentidos relacionados ("conta" bancária, "prestar contas").\n- **Hiperônimo**: termo geral. "**Documento**" é hiperônimo de "ofício", "contrato"; usá-lo evita repetição.\n\nVocabulário de controle: **elidir** (eliminar, afastar), **exíguo** (curto, insuficiente), **óbice** (obstáculo), **mitigar** (atenuar), **precípuo** (principal), **corroborar** (confirmar).',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: '"O prazo era exíguo, mas o argumento não elidiu a irregularidade." Sinônimos de "exíguo" e "elidiu":',
        options: [
          { text: 'insuficiente e afastou', why: 'Isso.' },
          { text: 'amplo e confirmou', why: '"Amplo" é antônimo de "exíguo"; "confirmou" inverte o sentido.' },
          { text: 'ilegítimo e ocultou', why: '"Exíguo" é sobre duração; "elidir" não é ocultar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Troque a palavra na frase e **leia de novo**: "o prazo era **insuficiente**, mas o argumento não **afastou** a irregularidade". Se o sentido se mantém, é sinônimo **no contexto**. É sempre esse o teste, nunca a lista do dicionário isolada.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Em prova, o sinônimo se avalia:',
          options: [
            { text: 'No contexto da frase', why: 'Isso.' },
            { text: 'Só pelo dicionário, fora da frase', why: 'O sentido é sempre o do contexto.' },
            { text: 'Pelo tamanho da palavra', why: 'O tamanho não decide nada.' },
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
      prompt: 'Qual processo formou cada palavra?',
      categories: ['Parassintética', 'Regressiva', 'Aglutinação'],
      items: [
        { text: 'amoldar', cat: 0, why: 'Prefixo e sufixo juntos.' },
        { text: 'debate', cat: 1, why: 'Redução de debater.' },
        { text: 'embora', cat: 2, why: 'Em boa hora, com perda.' },
        { text: 'entardecer', cat: 0, why: 'Não existe "entarde" nem "tardecer".' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Deslealdade: prefixal e sufixal', 'Planalto: aglutinação', 'Entardecer e deslealdade: mesmo processo'],
      bug: 2,
      why: 'Entardecer é parassintética; deslealdade é prefixal e sufixal.',
      fixed: 'Entardecer e deslealdade: processos diferentes',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: "A falta de servidores é um óbice ao andamento dos processos." "Óbice" significa:',
      options: [
        { text: 'Obstáculo', why: 'Isso.' },
        { text: 'Estímulo', why: 'É quase o contrário.' },
        { text: 'Prazo', why: 'Óbice é obstáculo, impedimento.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.012' },
  ],
  summary: [
    'Estrutura: radical (base), prefixo e sufixo (afixos), vogal temática, desinências (gênero, número, pessoa, tempo).',
    'Prefixal e sufixal: partes independentes (deslealdade). Parassintética: prefixo e sufixo simultâneos (entardecer).',
    'Regressiva: o substantivo encolhe do verbo (combate). Imprópria: muda a classe, não a forma.',
    'Justaposição sem perda (passatempo); aglutinação com perda (planalto); hibridismo (automóvel); siglas.',
    'Sinônimo se avalia no contexto. Exíguo: insuficiente; elidir: afastar; óbice: obstáculo; mitigar: atenuar.',
  ],
};
