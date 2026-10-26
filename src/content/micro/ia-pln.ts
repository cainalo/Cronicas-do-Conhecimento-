// Série "Processamento de linguagem natural" (cap.ia.03, trecho pln), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta do experimento Georgetown-IBM ao word2vec; as seguintes
// ensinam o pré-processamento, depois representações, tarefas e similaridade, uma ideia por etapa.
// Fatos conferidos com o texto do capítulo (03-pln.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.03', sectionId: 'pln' } as const;

export const iaPlnHistoria: MicroLesson = {
  ...S,
  id: 'ia.pln.1',
  series: { id: 'ia.pln', order: 1 },
  title: 'Da tradução de 1954 ao word2vec',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O Tribunal recebe milhares de denúncias por ano, todas em texto livre. Um computador consegue ajudar a separar por assunto?',
    options: [
      { text: 'Sim: é o processamento de linguagem natural', why: 'Isso. Esta aula conta como as máquinas começaram a lidar com texto.' },
      { text: 'Não: computador só entende números', why: 'Por dentro, sim; mas o PLN transforma texto em números. Esta aula conta como.' },
      { text: 'Só se as denúncias forem em inglês', why: 'Há técnicas para o português também.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'georgetown',
      part: 'A história',
      title: '1954: a primeira tradução pública',
      art: 'livro',
      goal: 'Conhecer o experimento Georgetown-IBM.',
      explain:
        'Em **1954**, o experimento **Georgetown-IBM** mostrou ao público uma **tradução automática**: cerca de **sessenta frases** do **russo** para o **inglês**.\n\nTudo era feito com **regras escritas à mão**: dicionário e instruções de troca de palavras.\n\nParecia que a tradução perfeita estava perto. Não estava: a língua humana é cheia de **ambiguidades**, e regras fixas não davam conta.',
      check: {
        kind: 'choice',
        id: 'ge-c',
        prompt: 'Como o experimento Georgetown-IBM fazia a tradução?',
        options: [
          { text: 'Com regras escritas à mão', why: 'Isso.' },
          { text: 'Com redes neurais profundas', why: 'Redes profundas só se popularizaram décadas depois.' },
          { text: 'Com tradutores humanos escondidos', why: 'Era um programa com regras fixas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine traduzir só com um **dicionário de bolso**, palavra por palavra, sem entender a frase. Funciona para frases simples, mas tropeça em expressões e duplos sentidos. Era assim em 1954: regras fixas, sem compreensão.',
        check: {
          kind: 'choice',
          id: 'ge-r',
          prompt: 'Por que regras fixas não davam conta da língua?',
          options: [
            { text: 'Porque a língua é cheia de ambiguidades', why: 'Isso.' },
            { text: 'Porque faltavam letras no teclado', why: 'O problema era a complexidade da língua.' },
            { text: 'Porque o russo não tem gramática', why: 'Tem; o problema eram as ambiguidades.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'eliza',
      part: 'A história',
      title: '1966: ELIZA',
      art: 'pessoal',
      goal: 'Saber o que foi a ELIZA.',
      explain:
        'Em **1966**, no **MIT**, **Joseph Weizenbaum** criou a **ELIZA**, um programa que **conversava** imitando uma terapeuta.\n\nEla **não entendia** nada: apenas **reorganizava** as palavras do usuário. "Estou triste" virava "Por que você está triste?".\n\nMesmo assim, muita gente se sentiu compreendida. Foi um alerta precoce: **parecer** entender não é **entender**.',
      check: {
        kind: 'choice',
        id: 'el-c',
        prompt: 'Como a ELIZA respondia?',
        options: [
          { text: 'Reorganizando as palavras do usuário', why: 'Isso: sem compreensão real.' },
          { text: 'Compreendendo os sentimentos de verdade', why: 'Ela só rearranjava frases.' },
          { text: 'Buscando na internet', why: 'A internet como conhecemos não existia em 1966.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como um **papagaio esperto** que devolve suas palavras em forma de pergunta. Dá a impressão de conversa, mas não há entendimento. A ELIZA mostrou como é fácil confundir **forma** de conversa com **compreensão**.',
        check: {
          kind: 'choice',
          id: 'el-r',
          prompt: 'Quem criou a ELIZA?',
          options: [
            { text: 'Joseph Weizenbaum, no MIT', why: 'Isso.' },
            { text: 'Alan Turing', why: 'Turing propôs o jogo da imitação em 1950.' },
            { text: 'Karen Spärck Jones', why: 'Ela propôs o IDF, em 1972.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'idf',
      part: 'A história',
      title: '1972: o peso das palavras raras',
      art: 'balanca',
      goal: 'Saber que Karen Spärck Jones propôs a ideia do IDF.',
      explain:
        'Em **1972**, a cientista britânica **Karen Spärck Jones** propôs dar **mais peso** aos termos que aparecem em **poucos documentos**.\n\nA lógica: se "**processo**" aparece em todos os autos, ele **não ajuda** a diferenciar um do outro. Já "**superfaturamento**", que aparece em poucos, diz muito sobre aqueles documentos.\n\nEssa é a ideia do **IDF**, base do **TF-IDF**.',
      check: {
        kind: 'choice',
        id: 'id-c',
        prompt: 'Pela ideia do IDF, qual palavra ganha mais peso numa base de autos?',
        options: [
          { text: 'Uma palavra rara, que aparece em poucos documentos', why: 'Isso.' },
          { text: '"processo", que aparece em todos', why: 'Palavras em todos os documentos ganham peso baixo.' },
          { text: 'Todas pesam igual', why: 'O IDF diferencia pelo quanto a palavra é rara na coleção.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Numa sala onde **todos** usam terno, "terno" não ajuda a descrever ninguém. Mas o único de **chapéu** fica fácil de achar. Palavras comuns a todos os documentos são o "terno"; as raras são o "chapéu": identificam melhor.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'Quem propôs a ideia do IDF?',
          options: [
            { text: 'Karen Spärck Jones', why: 'Isso, em 1972.' },
            { text: 'Martin Porter', why: 'Porter criou um stemmer, em 1980.' },
            { text: 'Joseph Weizenbaum', why: 'Weizenbaum criou a ELIZA.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'porter-w2v',
      part: 'A história',
      title: '1980 e 2013: Porter e word2vec',
      art: 'degraus',
      goal: 'Situar o stemmer de Porter e o word2vec.',
      explain:
        'Em **1980**, **Martin Porter** publicou um algoritmo de **stemming** para o inglês: cortar sufixos por regras até chegar a um radical. Virou referência.\n\nEm **2013**, o **word2vec** mostrou que **vetores aprendidos pelo contexto** aproximam palavras de sentido parecido: palavras usadas nos mesmos lugares ficam perto.\n\nDas regras à **aprendizagem pelo uso**: é o caminho do PLN.',
      check: {
        kind: 'order',
        id: 'pw-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Georgetown-IBM (1954)', 'ELIZA (1966)', 'IDF de Spärck Jones (1972)', 'Stemmer de Porter (1980)', 'word2vec (2013)'],
        why: 'Das regras ao aprendizado pelo contexto.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O PLN começou com **dicionários e regras** (1954, 1966), ganhou **estatística** (o peso das palavras, 1972), **ferramentas de limpeza** (stemmer, 1980) e, por fim, **aprendizado pelo contexto** (word2vec, 2013). Cada etapa resolveu um limite da anterior.',
        check: {
          kind: 'choice',
          id: 'pw-r',
          prompt: 'O que o word2vec mostrou?',
          options: [
            { text: 'Vetores aprendidos pelo contexto aproximam palavras parecidas', why: 'Isso.' },
            { text: 'Que basta cortar sufixos', why: 'Isso é o stemming.' },
            { text: 'Que palavras não podem virar números', why: 'Ele transformou palavras em vetores.' },
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
      lines: ['1954: tradução russo-inglês por regras', '1966: ELIZA reorganiza frases', '1972: word2vec aproxima palavras'],
      bug: 2,
      why: 'Em 1972 veio o IDF, de Spärck Jones; o word2vec é de 2013.',
      fixed: '1972: IDF de Spärck Jones',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Regras ou aprendizado pelo contexto?',
      categories: ['Regras escritas', 'Aprendizado pelo contexto'],
      items: [
        { text: 'Georgetown-IBM', cat: 0, why: 'Dicionário e regras.' },
        { text: 'Stemmer de Porter', cat: 0, why: 'Corta sufixos por regras.' },
        { text: 'word2vec', cat: 1, why: 'Vetores pelo uso.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um robô de atendimento responde de modo convincente, mas só rearranja as frases do cidadão. A lição da ELIZA é:',
      options: [
        { text: 'Parecer entender não é entender', why: 'Isso.' },
        { text: 'Todo robô entende sentimentos', why: 'A ELIZA mostrou o contrário.' },
        { text: 'Robôs não podem conversar', why: 'Conversam; a questão é se entendem.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1954: Georgetown-IBM traduz cerca de sessenta frases do russo, com regras à mão.',
    '1966: ELIZA (Weizenbaum, MIT) conversa rearranjando frases: parecer entender não é entender.',
    '1972: Karen Spärck Jones propõe o IDF: mais peso a termos raros na coleção.',
    '1980: stemmer de Porter. 2013: word2vec, vetores pelo contexto.',
  ],
};

export const iaPlnPre: MicroLesson = {
  ...S,
  id: 'ia.pln.2',
  series: { id: 'ia.pln', order: 2 },
  title: 'Pré-processamento: do texto às unidades',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Licitações", "licitação" e "licitante" falam de coisas parecidas. Para um programa, são a mesma palavra?',
    options: [
      { text: 'Não, a menos que o texto seja preparado antes', why: 'Isso. Esta aula mostra as etapas de preparo do texto.' },
      { text: 'Sim, sempre', why: 'Para o programa, letras diferentes são palavras diferentes, até que se normalize.' },
      { text: 'O programa não lê palavras', why: 'Lê, depois de dividir o texto em unidades.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tokenizacao',
      part: 'Etapas',
      title: 'Tokenização e normalização',
      art: 'cartao',
      goal: 'Saber o que fazem a tokenização e a normalização.',
      explain:
        '- **Tokenização**: divide o texto em **unidades** (tokens): palavras, partes de palavras ou sinais. "Contrato vencido." → ["Contrato", "vencido", "."]\n- **Normalização**: **padroniza** o texto: minúsculas, remoção de acentos ou pontuação, **conforme o objetivo**. "CONTRATO" → "contrato".\n\nSem isso, "Contrato" e "contrato" seriam palavras diferentes para o programa.',
      check: {
        kind: 'choice',
        id: 'to-c',
        prompt: 'Dividir "Nota fiscal emitida." em ["Nota", "fiscal", "emitida", "."] é:',
        options: [
          { text: 'Tokenização', why: 'Isso.' },
          { text: 'Lematização', why: 'Lematização reduz à forma de dicionário.' },
          { text: 'Análise de sentimento', why: 'Isso é uma tarefa, não uma etapa de divisão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Tokenizar** é **picar** o texto em pedaços, como cortar uma frase em cartõezinhos, um por palavra ou sinal. **Normalizar** é passar todos os cartões para o **mesmo formato**, como escrever tudo em minúsculas, para que "CONTRATO" e "contrato" sejam o mesmo cartão.',
        check: {
          kind: 'choice',
          id: 'to-r',
          prompt: 'Converter tudo para minúsculas é exemplo de:',
          options: [
            { text: 'Normalização', why: 'Isso.' },
            { text: 'Tokenização', why: 'Tokenizar é dividir em unidades.' },
            { text: 'Stemming', why: 'Stemming corta sufixos.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'stopwords',
      part: 'Etapas',
      title: 'Stopwords: retirar com cuidado',
      art: 'revisao',
      goal: 'Saber o que são stopwords e quando não removê-las.',
      explain:
        '**Stopwords** são palavras **muito frequentes** e **pouco informativas**: "o", "de", "que", "em".\n\nRetirá-las reduz o volume e destaca as palavras importantes.\n\n**Cuidado**: nem sempre é bom. Em **análise de sentimento**, retirar o "**não**" pode **inverter o sentido**: "**não** gostei do atendimento" vira "gostei do atendimento".',
      check: {
        kind: 'choice',
        id: 'st-c',
        prompt: '"Remover stopwords é sempre benéfico." Isso está:',
        options: [
          { text: 'Errado: em sentimento, tirar a negação distorce o resultado', why: 'Isso.' },
          { text: 'Certo', why: 'Há casos, como a negação, em que remover atrapalha.' },
          { text: 'Certo só em português', why: 'O cuidado vale em qualquer língua.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Stopwords são como o **ruído** de uma gravação: tirar ajuda a ouvir o principal. Mas algumas "palavrinhas" carregam **sentido decisivo**: o "não" é uma delas. Antes de remover, pergunte: **para esta tarefa**, essa palavra importa?',
        check: {
          kind: 'choice',
          id: 'st-r',
          prompt: 'Qual destas é tipicamente uma stopword?',
          options: [
            { text: '"de"', why: 'Isso: muito frequente e pouco informativa.' },
            { text: '"superfaturamento"', why: 'É rara e informativa.' },
            { text: '"CNPJ"', why: 'É informativa para documentos de contratos.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'stemming',
      part: 'Etapas',
      title: 'Stemming ou lematização',
      art: 'degraus',
      goal: 'Distinguir stemming de lematização.',
      explain:
        '- **Stemming**: **corta sufixos** por regras para chegar a um **radical**, que **pode não ser** uma palavra real. "licitações", "licitante" → "**licit**". Mais **simples e rápido**, porém **grosseiro**. Para o português existe, por exemplo, o **RSLP**.\n- **Lematização**: reduz à **forma de dicionário** (lema), usando **análise morfológica**. "fiscalizaram" → "**fiscalizar**"; "melhores" → "**bom**". Mais **precisa**, porque considera vocabulário e classe gramatical.',
      check: {
        kind: 'choice',
        id: 'sm-c',
        prompt: 'A técnica que reduz "fiscalizaram" a "fiscalizar", usando vocabulário e análise morfológica, é:',
        options: [
          { text: 'Lematização', why: 'Isso: devolve a forma de dicionário.' },
          { text: 'Stemming', why: 'O stemming só corta sufixos e pode gerar formas como "fiscaliz".' },
          { text: 'Tokenização', why: 'Tokenizar é dividir em unidades.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **stemming** é uma **tesoura**: corta o final das palavras por regra, sem saber o que elas querem dizer ("licit"). A **lematização** é um **dicionarista**: sabe que "fiscalizaram" é o verbo "**fiscalizar**" conjugado e que "melhores" vem de "**bom**".',
        check: {
          kind: 'choice',
          id: 'sm-r',
          prompt: '"Stemming e lematização produzem sempre o mesmo resultado." Isso está:',
          options: [
            { text: 'Errado: o stemming corta por regra; a lematização dá a forma de dicionário', why: 'Isso.' },
            { text: 'Certo', why: 'Os resultados costumam ser diferentes.' },
            { text: 'Certo só em português', why: 'São técnicas diferentes em qualquer língua.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pos',
      part: 'Etapas',
      title: 'Etiquetagem morfossintática',
      art: 'livro',
      goal: 'Saber o que é POS tagging.',
      explain:
        'Outras tarefas de base são a **etiquetagem morfossintática** (*POS tagging*) e a **análise sintática**.\n\nA etiquetagem **identifica a classe** de cada palavra: substantivo, verbo, adjetivo...\n\nÉ o mesmo trabalho de **morfologia** que se estuda em Língua Portuguesa, só que feito pelo computador. Ajuda, por exemplo, a lematização a saber se "**pelo**" é preposição ou substantivo.',
      check: {
        kind: 'choice',
        id: 'po-c',
        prompt: 'Identificar que "auditor" é substantivo e "analisou" é verbo é:',
        options: [
          { text: 'Etiquetagem morfossintática (POS tagging)', why: 'Isso.' },
          { text: 'Remoção de stopwords', why: 'Remover stopwords é tirar palavras frequentes.' },
          { text: 'Tradução automática', why: 'Não há troca de idioma.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre da aula de **morfologia** em Português: dizer a **classe** de cada palavra. O computador faz isso pondo uma **etiqueta** em cada token: "auditor/SUBST", "analisou/VERBO". Por isso se chama etiquetagem.',
        check: {
          kind: 'choice',
          id: 'po-r',
          prompt: 'Por que a etiquetagem ajuda a lematização?',
          options: [
            { text: 'Saber a classe ajuda a achar a forma de dicionário certa', why: 'Isso.' },
            { text: 'Porque apaga as palavras', why: 'Ela etiqueta, não apaga.' },
            { text: 'Porque traduz o texto', why: 'Ela identifica classes.' },
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
      prompt: 'Ordene um pré-processamento típico.',
      items: ['Tokenizar o texto', 'Normalizar (minúsculas)', 'Remover stopwords, se fizer sentido', 'Lematizar'],
      why: 'Dividir, padronizar, limpar e reduzir à forma de dicionário.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Tokenização: divide em unidades', 'Lematização: forma de dicionário', 'Stemming: sempre gera palavras reais'],
      bug: 2,
      why: 'O stemming pode gerar radicais que não são palavras, como "licit".',
      fixed: 'Stemming: pode gerar radicais que não são palavras',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'Stemming ou lematização?',
      categories: ['Stemming', 'Lematização'],
      items: [
        { text: '"licitações" → "licit"', cat: 0, why: 'Corte por regra.' },
        { text: '"melhores" → "bom"', cat: 1, why: 'Forma de dicionário.' },
        { text: 'Algoritmo RSLP', cat: 0, why: 'Stemmer para o português.' },
      ],
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.009' }],
  summary: [
    'Tokenização divide em unidades; normalização padroniza (minúsculas, acentos), conforme o objetivo.',
    'Stopwords: frequentes e pouco informativas. Cuidado com a negação em análise de sentimento.',
    'Stemming corta sufixos por regra (licit; RSLP no português). Lematização dá a forma de dicionário (fiscalizar, bom).',
    'Etiquetagem morfossintática (POS tagging) identifica a classe de cada palavra.',
  ],
};

export const iaPlnRepresentacao: MicroLesson = {
  ...S,
  id: 'ia.pln.3',
  series: { id: 'ia.pln', order: 3 },
  title: 'Representação, tarefas e similaridade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"O fiscal multou a empresa" e "A empresa multou o fiscal" dizem a mesma coisa?',
    options: [
      { text: 'Não: a ordem das palavras muda o sentido', why: 'Isso. Mas há representações que ignoram a ordem. Esta aula mostra quais.' },
      { text: 'Sim: têm as mesmas palavras', why: 'Mesmas palavras, sentido oposto: a ordem importa.' },
      { text: 'Tanto faz', why: 'Para a auditoria, quem multou quem faz toda a diferença.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'bow',
      part: 'Representação',
      title: 'Saco de palavras e n-gramas',
      art: 'dados',
      goal: 'Entender bag-of-words e n-gramas.',
      explain:
        'Modelos precisam de **números**.\n\n- **Bag-of-words** (saco de palavras): cada documento vira um vetor de **contagens** das palavras do vocabulário. A **ordem é ignorada**: "O fiscal multou a empresa" e "a empresa multou o fiscal" ficam **iguais**.\n- **N-gramas**: sequências de **n** tokens, como o bigrama "**nota fiscal**", que recuperam parte do **contexto local**.',
      check: {
        kind: 'choice',
        id: 'bw-c',
        prompt: '"No modelo bag-of-words, a ordem das palavras é preservada." Isso está:',
        options: [
          { text: 'Errado: só importam as contagens', why: 'Isso.' },
          { text: 'Certo', why: 'É justamente o que o saco de palavras perde.' },
          { text: 'Certo com stopwords', why: 'A ordem é ignorada em qualquer caso.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine **recortar** todas as palavras de um texto e **jogar num saco**. Dá para contar quantas vezes "multou" aparece, mas não dá mais para saber **quem multou quem**. Os **n-gramas** guardam pedacinhos juntos ("nota fiscal") e recuperam um pouco da ordem.',
        check: {
          kind: 'choice',
          id: 'bw-r',
          prompt: '"nota fiscal" é um exemplo de:',
          options: [
            { text: 'Bigrama', why: 'Isso: sequência de 2 tokens.' },
            { text: 'Stopword', why: 'São palavras informativas.' },
            { text: 'Lema', why: 'Lema é a forma de dicionário de uma palavra.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'tfidf',
      part: 'Representação',
      title: 'TF-IDF',
      art: 'balanca',
      goal: 'Calcular a ideia do TF-IDF e prever pesos.',
      explain:
        '**TF-IDF** pondera a **frequência do termo no documento** (TF) pelo **inverso da frequência na coleção** (IDF). Uma forma comum: **tf × log(N / df)**, em que N é o número de documentos e df quantos contêm o termo.\n\n- Termo presente em **quase todos** os documentos (como "processo" numa base de autos): log(N/df) perto de zero, **peso baixo**.\n- Termo **raro** na coleção e **frequente** no documento (como "superfaturamento"): **peso alto**.',
      check: {
        kind: 'choice',
        id: 'ti-c',
        prompt: 'Em 50 mil processos, "processo" aparece em quase todos; "superfaturamento", em poucos, mas muito neles. No TF-IDF:',
        options: [
          { text: '"superfaturamento" tende a ter peso alto; "processo", baixo', why: 'Isso.' },
          { text: '"processo" tem peso alto por ser frequente', why: 'O IDF reduz o peso de termos muito comuns.' },
          { text: 'Os dois têm o mesmo peso', why: 'O IDF os diferencia.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **TF** como "quanto o termo **grita** neste documento" e no **IDF** como "quão **raro** ele é na coleção". Peso alto = grita aqui **e** é raro lá fora. "Processo" grita em todo lugar, então ninguém presta atenção nele: IDF quase zero.',
        check: {
          kind: 'choice',
          id: 'ti-r',
          prompt: 'Se um termo aparece em todos os N documentos, log(N/df) vale:',
          options: [
            { text: 'Zero (log de 1)', why: 'Isso: N/N = 1, e log 1 = 0.' },
            { text: 'N', why: 'N/df = 1, e o log de 1 é zero.' },
            { text: 'Infinito', why: 'Infinito seria se df fosse zero.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'embeddings',
      part: 'Representação',
      title: 'Embeddings: densos e contextuais',
      art: 'rede',
      goal: 'Distinguir vetores esparsos de embeddings densos e contextuais.',
      explain:
        '- **Embeddings de palavras**: vetores **densos** aprendidos pelo **contexto**, como no **word2vec** (2013). Palavras de sentido parecido ficam **próximas**. Diferente do bag-of-words e do TF-IDF, que geram vetores **esparsos** e **longos**, os embeddings são **densos** e de **dimensão menor**.\n- **Embeddings contextuais**: produzidos por **transformers**; a mesma palavra recebe vetores **diferentes** conforme a frase: "banco" de dados × "banco" da praça.',
      check: {
        kind: 'choice',
        id: 'em-c',
        prompt: 'Acerca das representações de texto, é correto afirmar:',
        options: [
          { text: 'Embeddings como os do word2vec são vetores densos aprendidos pelo contexto', why: 'Isso.' },
          { text: 'TF-IDF gera vetores densos que preservam a ordem', why: 'TF-IDF é esparso e ignora a ordem.' },
          { text: 'Embeddings contextuais dão sempre o mesmo vetor a uma palavra', why: 'Eles mudam conforme a frase.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O vetor **esparso** é uma **planilha enorme** com uma coluna por palavra do vocabulário, quase toda com zeros. O **denso** é um **resumo** com poucas centenas de números, todos preenchidos. E o **contextual** muda o resumo conforme a frase: o "banco" que guarda dados não é o "banco" onde se senta.',
        check: {
          kind: 'choice',
          id: 'em-r',
          prompt: 'Que representação dá vetores diferentes a "banco" em "banco de dados" e "banco da praça"?',
          options: [
            { text: 'Embeddings contextuais (transformers)', why: 'Isso.' },
            { text: 'Bag-of-words', why: 'No saco de palavras, "banco" é sempre a mesma contagem.' },
            { text: 'TF-IDF', why: 'O TF-IDF dá um peso por termo, sem olhar a frase.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'tarefas',
      part: 'Tarefas',
      title: 'As tarefas de PLN no controle externo',
      art: 'suporte',
      goal: 'Associar as tarefas de PLN a usos no Tribunal.',
      explain:
        '- **Classificação de texto**: triagem de denúncias por área.\n- **Reconhecimento de entidades nomeadas (NER)**: identificar pessoas, organizações, locais, datas, valores. Ex.: extrair CNPJ, fornecedor e valor de um extrato de contrato.\n- **Análise de sentimento**: polaridade de manifestações à ouvidoria.\n- **Sumarização**: **extrativa** (copia frases) ou **abstrativa** (reescreve).\n- **Tradução**, **perguntas e respostas** e **reconhecimento de fala** (transcrever sessões plenárias).',
      check: {
        kind: 'choice',
        id: 'ta-c',
        prompt: 'Extrair automaticamente nome da empresa, CNPJ, órgão e valor de extratos de contratos é:',
        options: [
          { text: 'Reconhecimento de entidades nomeadas (NER)', why: 'Isso.' },
          { text: 'Análise de sentimento', why: 'Sentimento mede polaridade, não extrai dados.' },
          { text: 'Sumarização abstrativa', why: 'Sumarizar é resumir; aqui se extraem campos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **marca-texto colorido**: amarelo para pessoas, verde para empresas, azul para valores. O **NER** faz isso no texto, marcando e classificando cada trecho. Já a **classificação** dá uma etiqueta ao documento **inteiro**, e a **sumarização** encurta o texto.',
        check: {
          kind: 'choice',
          id: 'ta-r',
          prompt: 'Um resumo que copia frases do relatório original é:',
          options: [
            { text: 'Sumarização extrativa', why: 'Isso.' },
            { text: 'Sumarização abstrativa', why: 'A abstrativa reescreve com novas palavras.' },
            { text: 'Tradução automática', why: 'Não há troca de idioma.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'cosseno',
      part: 'Tarefas',
      title: 'Similaridade e dificuldades',
      art: 'alvo',
      goal: 'Saber para que serve a similaridade de cosseno e as dificuldades da linguagem.',
      explain:
        'Com textos virados vetores, a proximidade é medida em geral pela **similaridade de cosseno**. Ela acha **processos parecidos** ou **documentos duplicados**, mesmo com **tamanhos diferentes**.\n\nDificuldades próprias da linguagem:\n\n- **ambiguidade** ("o auditor viu o gestor com o binóculo": quem tinha o binóculo?);\n- **ironia e sarcasmo**, que enganam a análise de sentimento;\n- **linguagem jurídica** e siglas do órgão;\n- **vieses** do texto de treino, que o modelo pode reproduzir.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Para achar pareceres parecidos, mesmo de tamanhos diferentes, usa-se em geral:',
        options: [
          { text: 'Similaridade de cosseno entre os vetores', why: 'Isso.' },
          { text: 'Contar o número de páginas', why: 'O tamanho não diz se o conteúdo é parecido.' },
          { text: 'Remover todas as palavras', why: 'Sem palavras não há o que comparar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O cosseno olha a **direção** dos vetores, não o **tamanho**. Dois textos sobre o mesmo assunto "apontam" para o mesmo lado, mesmo que um tenha 2 páginas e outro 20. E "o auditor viu o gestor com o binóculo" mostra que até humanos precisam do contexto para desfazer a ambiguidade.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"Que atendimento maravilhoso: esperei três horas." Por que confunde a análise de sentimento?',
          options: [
            { text: 'Por causa da ironia', why: 'Isso: "maravilhoso" é dito com sentido contrário.' },
            { text: 'Por ser curta', why: 'O problema é a ironia.' },
            { text: 'Por ter números', why: 'O problema é o sentido invertido.' },
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
      prompt: 'Que tarefa de PLN é cada caso?',
      categories: ['Classificação de texto', 'NER', 'Reconhecimento de fala'],
      items: [
        { text: 'Separar denúncias por área', cat: 0, why: 'Etiqueta o documento inteiro.' },
        { text: 'Marcar datas e valores num edital', cat: 1, why: 'Entidades no texto.' },
        { text: 'Transcrever uma sessão plenária', cat: 2, why: 'Áudio para texto.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Bag-of-words ignora a ordem', 'Embeddings são densos', 'TF-IDF dá peso alto a termos presentes em todos os documentos'],
      bug: 2,
      why: 'O IDF reduz o peso de termos muito comuns na coleção.',
      fixed: 'TF-IDF dá peso baixo a termos presentes em todos os documentos',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: dois pareceres usam vocabulário muito parecido, um com 3 páginas e outro com 30. Como saber se tratam do mesmo assunto?',
      options: [
        { text: 'Comparar seus vetores pela similaridade de cosseno', why: 'Isso: independe do tamanho.' },
        { text: 'Comparar o número de páginas', why: 'O tamanho não indica o assunto.' },
        { text: 'Contar só as stopwords', why: 'Stopwords são pouco informativas.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.010' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.011' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.012' },
  ],
  summary: [
    'Bag-of-words: contagens, ignora a ordem. N-gramas recuperam contexto local ("nota fiscal").',
    'TF-IDF: tf × log(N/df). Termo em quase todos os documentos: peso baixo; raro e frequente no documento: alto.',
    'Embeddings (word2vec): densos e pelo contexto. Contextuais (transformers): vetor muda conforme a frase.',
    'Tarefas: classificação, NER (pessoas, organizações, valores), sentimento, sumarização (extrativa, abstrativa), tradução, fala.',
    'Similaridade de cosseno compara direção, não tamanho. Dificuldades: ambiguidade, ironia, jargão, vieses.',
  ],
};
