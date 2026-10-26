// Série "O que é um LLM" (cap.ia.01, trecho llm), no ritmo lento com história pedido em 25/10/2026: a
// primeira aula conta de Shannon ao ChatGPT; as seguintes ensinam como o LLM funciona (token,
// parâmetros, atenção, janela, temperatura, embedding), depois treino, alucinação e multimodalidade,
// uma ideia por etapa. Fatos conferidos com o texto do capítulo (01-llm.md). Revisão editorial humana:
// pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.01', sectionId: 'llm' } as const;

export const iaLlmHistoria: MicroLesson = {
  ...S,
  id: 'ia.llm.1',
  series: { id: 'ia.llm', order: 1 },
  title: 'De Shannon ao ChatGPT',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O teclado do celular sugere a próxima palavra enquanto você digita. Isso tem a ver com os assistentes de IA que escrevem textos inteiros?',
    options: [
      { text: 'Sim: a ideia básica é prever o próximo pedaço de texto', why: 'Isso. Esta aula conta como essa ideia virou os LLMs.' },
      { text: 'Não: são coisas sem relação', why: 'A ideia de base é a mesma: prever o que vem depois.' },
      { text: 'Só se o celular estiver conectado', why: 'A relação está na ideia de prever, não na conexão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'shannon',
      part: 'A história',
      title: '1948: prever o próximo símbolo',
      art: 'abaco',
      goal: 'Saber que Shannon mostrou ser possível prever o próximo símbolo de um texto.',
      explain:
        'Em **1948**, no artigo "**A Mathematical Theory of Communication**", **Claude Shannon** mostrou que dá para **estimar o próximo caractere ou palavra** de um texto em inglês a partir dos **anteriores**.\n\nDepois de "Tribunal de", é muito provável vir "Contas". Depois de "q", em português, quase sempre vem "u".\n\nÉ a ideia de base de **todo modelo de linguagem**: prever o que vem depois.',
      check: {
        kind: 'choice',
        id: 'sh-c',
        prompt: 'O que Shannon mostrou em 1948?',
        options: [
          { text: 'Que dá para estimar o próximo símbolo de um texto pelos anteriores', why: 'Isso.' },
          { text: 'Que máquinas podem pensar', why: 'Essa pergunta é de Turing, em 1950.' },
          { text: 'Que a internet funcionaria', why: 'A internet é bem posterior.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Brinque de **completar frases**: "Bom..." → "dia". "Prestação de..." → "contas". Você usa o que veio antes para adivinhar o próximo. Shannon fez isso com estatística, e é o que os LLMs fazem em escala gigante.',
        check: {
          kind: 'choice',
          id: 'sh-r',
          prompt: 'Depois de "Tribunal de", qual palavra um modelo de linguagem consideraria mais provável?',
          options: [
            { text: '"Contas"', why: 'Isso: é a continuação mais comum.' },
            { text: '"bolo"', why: 'Possível, mas muito menos provável.' },
            { text: '"azul"', why: 'Muito improvável nesse contexto.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'transformer',
      part: 'A história',
      title: '2017: o transformer',
      art: 'rede',
      goal: 'Saber que o transformer tornou possível treinar modelos enormes.',
      explain:
        'Por décadas, prever texto era feito com modelos **pequenos**. Em **2017**, o artigo "**Attention Is All You Need**" apresentou o **transformer**.\n\nEle processa o texto **em paralelo** e, com o mecanismo de **atenção**, relaciona cada palavra com todas as outras.\n\nIsso tornou possível treinar modelos **enormes**, com **bilhões** de números ajustáveis. Nasciam os **LLMs** (*Large Language Models*).',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Qual arquitetura tornou possível treinar os LLMs?',
        options: [
          { text: 'O transformer', why: 'Isso.' },
          { text: 'O perceptron de uma camada', why: 'O perceptron é de 1958 e muito limitado.' },
          { text: 'A planilha eletrônica', why: 'Planilha não é arquitetura de IA.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Antes, os modelos liam o texto **palavra por palavra**, como quem soletra. O transformer lê **tudo de uma vez** e decide em que prestar **atenção**. Isso permitiu usar muitos computadores ao mesmo tempo e crescer o modelo.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'O que LLM quer dizer?',
          options: [
            { text: 'Large Language Model: modelo de linguagem de grande porte', why: 'Isso.' },
            { text: 'Linguagem de Lógica Matemática', why: 'É Large Language Model.' },
            { text: 'Lista de Leis Municipais', why: 'É Large Language Model.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'gpt',
      part: 'A história',
      title: '2018 a 2020: BERT, GPT e GPT-3',
      art: 'livro',
      goal: 'Situar BERT, GPT e GPT-3.',
      explain:
        'Em **2018**, o Google lançou o **BERT** e a OpenAI, o **GPT**, ambos baseados no transformer.\n\nEm **2020**, o **GPT-3** surpreendeu: um modelo muito grande aprendia **tarefas novas só com exemplos no prompt**, sem ser treinado de novo.\n\nO tamanho mudava a qualidade: quanto mais parâmetros e mais texto no treino, mais o modelo parecia "saber".',
      check: {
        kind: 'choice',
        id: 'gp-c',
        prompt: 'O que o GPT-3 mostrou em 2020?',
        options: [
          { text: 'Que um modelo grande aprende tarefas só com exemplos no prompt', why: 'Isso.' },
          { text: 'Que modelos não precisam de texto para treinar', why: 'Precisam de muito texto.' },
          { text: 'Que o transformer não funciona', why: 'O GPT-3 é baseado no transformer.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine mostrar a um colega **três exemplos** de ofício no padrão do Tribunal e ele escrever o quarto certinho, sem curso. O GPT-3 fez isso: aprendeu o padrão só com os exemplos do pedido.',
        check: {
          kind: 'order',
          id: 'gp-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Shannon e a previsão de texto (1948)', 'Transformer (2017)', 'BERT e GPT (2018)', 'GPT-3 (2020)'],
          why: 'Da ideia estatística aos grandes modelos.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'chatgpt',
      part: 'A história',
      title: '2022: o assistente para todos',
      art: 'celular',
      goal: 'Saber que o RLHF e o ChatGPT levaram os LLMs ao público.',
      explain:
        'Um modelo só treinado para prever texto **nem sempre segue instruções** bem.\n\nCom o **ajuste por preferências humanas** (**RLHF**), pessoas avaliaram respostas e o modelo aprendeu a preferir as **úteis, corretas e seguras**.\n\nNo **fim de 2022**, o **ChatGPT** levou os LLMs ao **grande público**: qualquer pessoa podia conversar com um modelo pelo navegador.',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'Para que serve o RLHF?',
        options: [
          { text: 'Ensinar o modelo a preferir respostas úteis, corretas e seguras', why: 'Isso: com feedback humano.' },
          { text: 'Aumentar a janela de contexto', why: 'A janela é outra característica.' },
          { text: 'Traduzir textos do russo', why: 'Isso lembra o experimento de 1954.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como um **estagiário** que sabe muito, mas responde de qualquer jeito. Um **orientador** lê as respostas e diz "esta é melhor que aquela". Com o tempo, o estagiário aprende o que é uma boa resposta. O RLHF faz isso com o modelo.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'O que o ChatGPT, no fim de 2022, trouxe de novo?',
          options: [
            { text: 'Levou os LLMs ao grande público, por conversa no navegador', why: 'Isso.' },
            { text: 'Inventou a ideia de prever texto', why: 'Essa ideia vem de Shannon, 1948.' },
            { text: 'Criou o transformer', why: 'O transformer é de 2017.' },
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
      lines: ['1948: Shannon e a previsão de texto', '2017: transformer', '2020: ChatGPT chega ao público'],
      bug: 2,
      why: 'Em 2020 veio o GPT-3; o ChatGPT chegou ao público no fim de 2022.',
      fixed: '2020: GPT-3 e o aprendizado com exemplos',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O que cada marco trouxe?',
      categories: ['Transformer', 'GPT-3', 'RLHF'],
      items: [
        { text: 'Atenção e processamento em paralelo', cat: 0, why: '2017.' },
        { text: 'Aprender tarefas com exemplos no prompt', cat: 1, why: '2020.' },
        { text: 'Preferir respostas úteis e seguras', cat: 2, why: 'Feedback humano.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega diz que os LLMs "entendem" o mundo como pessoas. Qual a descrição mais fiel ao que aprendemos?',
      options: [
        { text: 'Eles preveem o próximo pedaço de texto, em escala enorme', why: 'Isso.' },
        { text: 'Eles consultam um ser humano a cada resposta', why: 'O modelo gera sozinho a partir do que aprendeu.' },
        { text: 'Eles leem a internet inteira em tempo real', why: 'Só buscam se a aplicação oferecer ferramenta para isso.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Shannon (1948): estimar o próximo símbolo pelos anteriores, base de todo modelo de linguagem.',
    'Transformer (2017): atenção e paralelismo, que permitiram modelos enormes (LLMs).',
    'BERT e GPT (2018); GPT-3 (2020) aprende tarefas com exemplos no prompt.',
    'RLHF ensina a preferir respostas úteis e seguras; ChatGPT (fim de 2022) leva os LLMs ao público.',
  ],
};

export const iaLlmFunciona: MicroLesson = {
  ...S,
  id: 'ia.llm.2',
  series: { id: 'ia.llm', order: 2 },
  title: 'Como um LLM funciona',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um LLM escreve uma resposta inteira. Ele "pensa" o texto todo de uma vez?',
    options: [
      { text: 'Não: escreve um pedaço por vez, prevendo o próximo', why: 'Isso. Esta aula mostra as peças desse processo.' },
      { text: 'Sim: copia de um banco de respostas prontas', why: 'Ele gera, pedaço por pedaço.' },
      { text: 'Sim: pergunta a um humano', why: 'Ele gera sozinho, prevendo o próximo pedaço.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'conjuntos',
      part: 'Onde se encaixa',
      title: 'Conjuntos dentro de conjuntos',
      art: 'degraus',
      goal: 'Situar IA generativa e LLM dentro da IA.',
      explain:
        '- **Inteligência artificial**: qualquer técnica que faça a máquina executar tarefas associadas à inteligência humana.\n- **Aprendizado de máquina**: aprende padrões com dados.\n- **Aprendizado profundo**: com redes de muitas camadas.\n- **IA generativa**: produz **conteúdo novo**: texto, imagem, áudio, código.\n- **LLM**: modelo generativo de **linguagem**, com **bilhões de parâmetros**, treinado em grandes volumes de texto.',
      check: {
        kind: 'choice',
        id: 'cj-c',
        prompt: 'Um LLM é:',
        options: [
          { text: 'Um modelo generativo de linguagem com bilhões de parâmetros', why: 'Isso.' },
          { text: 'Um sistema especialista de regras', why: 'O LLM aprende com dados, não com regras escritas.' },
          { text: 'Um banco de dados relacional', why: 'É um modelo de IA.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte às bonecas russas: **IA** contém **aprendizado de máquina**, que contém **deep learning**. Dentro, a **IA generativa** é a que **cria** coisas novas; e o **LLM** é a generativa especializada em **texto**.',
        check: {
          kind: 'choice',
          id: 'cj-r',
          prompt: 'O que caracteriza a IA generativa?',
          options: [
            { text: 'Produzir conteúdo novo: texto, imagem, áudio, código', why: 'Isso.' },
            { text: 'Só classificar dados em categorias', why: 'Classificar não é gerar conteúdo novo.' },
            { text: 'Seguir regras escritas à mão', why: 'Isso é a abordagem simbólica.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'token',
      part: 'Peças',
      title: 'Token e parâmetros',
      art: 'cartao',
      goal: 'Saber o que são token e parâmetros.',
      explain:
        'Um LLM é uma rede neural, quase sempre **transformer**. Sua tarefa básica é **prever o próximo pedaço de texto**; repetindo isso, escreve respostas inteiras.\n\n- **Token**: a **unidade de texto** que o modelo lê e escreve: uma palavra, parte dela ou um sinal. **Limites e custos** costumam ser medidos em tokens.\n- **Parâmetros**: os **pesos** da rede, ajustados no treino. É o que o "**grande**" de LLM indica.',
      check: {
        kind: 'choice',
        id: 'to-c',
        prompt: 'Na etapa de pré-treinamento, a tarefa básica de um LLM é:',
        options: [
          { text: 'Prever o próximo token a partir dos anteriores', why: 'Isso.' },
          { text: 'Classificar imagens em categorias', why: 'Isso é tarefa típica de CNN.' },
          { text: 'Buscar respostas prontas na internet', why: 'Ele aprende a prever texto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **peças de Lego**: o modelo não lida com frases inteiras, mas com **pecinhas** (tokens) que encaixa uma após a outra. "Fiscalização" pode virar duas ou três pecinhas. E os **parâmetros** são os bilhões de "botões" internos que decidem qual pecinha vem a seguir.',
        check: {
          kind: 'choice',
          id: 'to-r',
          prompt: 'O "grande" de LLM se refere principalmente a:',
          options: [
            { text: 'A quantidade de parâmetros (pesos)', why: 'Isso.' },
            { text: 'O tamanho da tela', why: 'Refere-se aos parâmetros.' },
            { text: 'O número de usuários', why: 'Refere-se aos parâmetros do modelo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'atencao',
      part: 'Peças',
      title: 'Atenção',
      art: 'alvo',
      goal: 'Entender o mecanismo de atenção.',
      explain:
        'A **atenção** (*self-attention*) é o mecanismo que permite ao modelo **ponderar a relevância de cada token** do contexto ao gerar o próximo.\n\nEm "O auditor analisou o contrato e o **aprovou**", para gerar "aprovou", a atenção pesa mais "auditor" e "contrato" do que "o" e "e".\n\nÉ a **ideia central** do transformer.',
      check: {
        kind: 'choice',
        id: 'at-c',
        prompt: 'O mecanismo central do transformer, que pondera a relevância de cada token do contexto, é:',
        options: [
          { text: 'A atenção', why: 'Isso.' },
          { text: 'A temperatura', why: 'A temperatura controla a aleatoriedade.' },
          { text: 'O stemming', why: 'Stemming é pré-processamento do PLN clássico.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Ao ler um texto difícil, você **sublinha** as palavras-chave e passa por cima das outras. A atenção faz isso a cada novo token: decide **quais** dos anteriores merecem mais peso naquele momento.',
        check: {
          kind: 'choice',
          id: 'at-r',
          prompt: 'Na frase "O auditor analisou o contrato e o aprovou", ao gerar "aprovou", a atenção tende a pesar mais:',
          options: [
            { text: '"auditor" e "contrato"', why: 'Isso: são os mais relevantes.' },
            { text: '"o" e "e"', why: 'Essas palavras ajudam pouco a decidir.' },
            { text: 'Todas igualmente', why: 'A atenção dá pesos diferentes.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'janela',
      part: 'Peças',
      title: 'Janela de contexto',
      art: 'trilha',
      goal: 'Saber o que é a janela de contexto e o que acontece fora dela.',
      explain:
        'A **janela de contexto** é a quantidade **máxima de tokens** que o modelo considera de uma vez: **instruções**, **conversa**, **documentos** e a **própria resposta**.\n\nO que fica **fora da janela** simplesmente **não existe** para o modelo naquela chamada.\n\nPor isso, numa conversa muito longa, o começo pode ser "esquecido".',
      check: {
        kind: 'choice',
        id: 'ja-c',
        prompt: 'Sobre a janela de contexto, é correto afirmar:',
        options: [
          { text: 'É o máximo de tokens considerados de uma vez, incluindo a resposta', why: 'Isso.' },
          { text: 'É ilimitada', why: 'Ela tem limite.' },
          { text: 'Guarda tudo para sempre entre conversas', why: 'Fora da janela, nada existe para o modelo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine uma **mesa de trabalho** de tamanho fixo. Cabem nela as instruções, os papéis da conversa e a folha em que você escreve a resposta. O que **não cabe na mesa** fica no armário, e o modelo **não vê** o armário.',
        check: {
          kind: 'choice',
          id: 'ja-r',
          prompt: 'Um documento ficou fora da janela de contexto. O modelo:',
          options: [
            { text: 'Não o considera naquela chamada', why: 'Isso.' },
            { text: 'Lê assim mesmo', why: 'Fora da janela, não existe para ele.' },
            { text: 'Lê só o título', why: 'Nada do que está fora é visto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'temperatura',
      part: 'Peças',
      title: 'Temperatura e embedding',
      art: 'interruptor',
      goal: 'Saber o efeito da temperatura e o que é embedding.',
      explain:
        '- **Temperatura**: controla a **aleatoriedade** da geração. **Baixa** (perto de zero): saída **mais previsível**, repetível. **Alta**: **mais variada**, criativa e arriscada.\n- **Embedding**: representação de um texto como **vetor de números**, de modo que textos de **sentido parecido** fiquem **próximos**. É a base da **busca semântica** e do **RAG**.',
      check: {
        kind: 'choice',
        id: 'te-c',
        prompt: 'Com a temperatura perto de zero, o efeito esperado é:',
        options: [
          { text: 'Respostas mais previsíveis e repetíveis', why: 'Isso.' },
          { text: 'Respostas mais criativas e variadas', why: 'Isso é temperatura alta.' },
          { text: 'O modelo para de responder', why: 'Ele responde, de forma mais previsível.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **dados**. Temperatura baixa: o modelo quase sempre escolhe **a palavra mais provável**, como um dado viciado. Temperatura alta: dá chance às **menos prováveis**, como um dado solto. Para parecer jurídico, baixa; para ideias de nome de projeto, mais alta.',
        check: {
          kind: 'choice',
          id: 'te-r',
          prompt: '"Temperatura alta deixa a resposta mais determinística." Isso está:',
          options: [
            { text: 'Errado: é o contrário', why: 'Isso: alta deixa mais variada.' },
            { text: 'Certo', why: 'Determinística é com temperatura baixa.' },
            { text: 'Certo só em código', why: 'A regra vale para qualquer saída.' },
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
      prompt: 'Que conceito descreve cada frase?',
      categories: ['Token', 'Janela de contexto', 'Temperatura'],
      items: [
        { text: 'Unidade de texto lida e escrita pelo modelo', cat: 0, why: 'Pedaço de palavra ou sinal.' },
        { text: 'Máximo de tokens considerados de uma vez', cat: 1, why: 'Limite do que o modelo vê.' },
        { text: 'Controle da aleatoriedade', cat: 2, why: 'Previsível ou variado.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Atenção: pondera a relevância dos tokens', 'Embedding: texto como vetor', 'Fora da janela: o modelo ainda considera'],
      bug: 2,
      why: 'O que fica fora da janela não existe para o modelo naquela chamada.',
      fixed: 'Fora da janela: o modelo não considera',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um sistema gera minutas de ofício e precisa de respostas consistentes, iguais para o mesmo pedido. Que temperatura usar?',
      options: [
        { text: 'Baixa, perto de zero', why: 'Isso: mais previsível.' },
        { text: 'A mais alta possível', why: 'Deixaria as minutas variadas.' },
        { text: 'Tanto faz', why: 'A temperatura afeta a consistência.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.002' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.003' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.005' },
  ],
  summary: [
    'IA ⊃ aprendizado de máquina ⊃ deep learning; IA generativa cria conteúdo; LLM é a generativa de linguagem, com bilhões de parâmetros.',
    'O LLM (transformer) prevê o próximo token. Token: unidade de texto; parâmetros: os pesos.',
    'Atenção: pondera a relevância de cada token do contexto.',
    'Janela de contexto: máximo de tokens de uma vez, incluindo a resposta; fora dela, nada existe.',
    'Temperatura baixa: previsível; alta: variada. Embedding: texto como vetor, base da busca semântica e do RAG.',
  ],
};

export const iaLlmTreino: MicroLesson = {
  ...S,
  id: 'ia.llm.3',
  series: { id: 'ia.llm', order: 3 },
  title: 'Treino, alucinação e multimodalidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um assistente citou, com toda a segurança, um artigo de lei que não existe. Ele mentiu de propósito?',
    options: [
      { text: 'Não: gerou o texto mais provável, que não era verdadeiro', why: 'Isso: é a alucinação. Esta aula mostra por que acontece e como reduzir.' },
      { text: 'Sim: quis enganar', why: 'O modelo não tem intenção; ele gera o mais provável.' },
      { text: 'Não: a lei existe, sim', why: 'O enunciado diz que o artigo não existe.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'etapas',
      part: 'Treino',
      title: 'Pré-treino, ajuste fino e alinhamento',
      art: 'degraus',
      goal: 'Ordenar as etapas de treinamento de um LLM.',
      explain:
        '1. **Pré-treinamento**: o modelo aprende a **prever texto** num corpus **enorme**. Sai com amplo conhecimento, mas ainda **não segue instruções bem**.\n2. **Ajuste fino** (*fine-tuning*): treino adicional com **exemplos específicos**, como pares de instrução e resposta.\n3. **Alinhamento com preferências humanas**: técnicas como o **RLHF** ensinam a preferir respostas **úteis, corretas e seguras**.',
      check: {
        kind: 'order',
        id: 'et-c',
        prompt: 'Ordene as etapas de treinamento.',
        items: ['Pré-treinamento num corpus enorme', 'Ajuste fino com exemplos específicos', 'Alinhamento com preferências humanas (RLHF)'],
        why: 'Primeiro o conhecimento geral, depois o formato, por fim as preferências.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense na formação de um servidor: **faculdade** (pré-treino, muito conteúdo geral), **curso de formação** do órgão (ajuste fino, o jeito da casa) e **avaliação de chefia** com retorno contínuo (alinhamento, preferir o que é útil e correto).',
        check: {
          kind: 'choice',
          id: 'et-r',
          prompt: 'Depois do pré-treinamento, o modelo:',
          options: [
            { text: 'Tem amplo conhecimento, mas ainda não segue instruções bem', why: 'Isso.' },
            { text: 'Já é um assistente perfeito', why: 'Ainda precisa de ajuste fino e alinhamento.' },
            { text: 'Não sabe nada', why: 'Ele sai com amplo conhecimento.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'corte',
      part: 'Treino',
      title: 'A data de corte',
      art: 'calendario',
      goal: 'Entender a data de corte do conhecimento.',
      explain:
        'O conhecimento aprendido no treinamento tem uma **data de corte**: o modelo só "sabe" o que estava nos textos até ali.\n\nFatos **posteriores** só chegam ao modelo se forem **colocados no contexto**: por exemplo, com **RAG** ou **ferramentas de busca**.\n\nPergunta sobre uma resolução publicada ontem? Sem o texto no contexto, o modelo **não tem como saber**.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Como um fato posterior à data de corte chega ao modelo?',
        options: [
          { text: 'Sendo colocado no contexto, por RAG ou busca', why: 'Isso.' },
          { text: 'Sozinho, o modelo se atualiza todo dia', why: 'O conhecimento do treino fica parado na data de corte.' },
          { text: 'Não chega de jeito nenhum', why: 'Chega pelo contexto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine alguém que estudou muito e depois ficou **um ano sem notícias**. Ele sabe muito, mas nada do último ano, a menos que você **entregue o jornal** a ele. RAG e busca são esse "jornal" colocado no contexto.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"O LLM consulta a internet a cada resposta." Isso está:',
          options: [
            { text: 'Errado: só busca se a aplicação oferecer uma ferramenta para isso', why: 'Isso.' },
            { text: 'Certo', why: 'Ele gera a partir do treino e do contexto.' },
            { text: 'Certo sempre que a temperatura é alta', why: 'A temperatura não tem relação com busca.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'alucinacao',
      part: 'Alucinação',
      title: 'Fluente, convincente e falso',
      art: 'revisao',
      goal: 'Saber o que é alucinação e por que acontece.',
      explain:
        '**Alucinação** é a geração de conteúdo **fluente e convincente**, porém **falso** ou sem fundamento: uma **referência que não existe**, uma **função de biblioteca inventada**, um **artigo de lei trocado**.\n\nAcontece porque o modelo produz o texto **mais provável**, e o mais provável **nem sempre é o verdadeiro**.\n\n"Art. 1.250 da Lei nº 14.133/2021" soa como um artigo real, mas essa lei tem 194 artigos.',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'Um assistente citou, com segurança, um artigo de lei inexistente. Isso é:',
        options: [
          { text: 'Alucinação', why: 'Isso.' },
          { text: 'Injeção de prompt', why: 'Injeção é texto malicioso manipulando o modelo.' },
          { text: 'Overfitting', why: 'Overfitting é memorizar o treino e falhar em novos dados.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em alguém que **completa frases** muito bem, mas sem conferir os fatos. Ele diz "conforme o artigo..." e emenda um número que **soa certo**. O modelo faz isso: o que ele mede é se o texto **parece** certo, não se **é**.',
        check: {
          kind: 'choice',
          id: 'al-r',
          prompt: 'Por que a alucinação acontece?',
          options: [
            { text: 'O modelo gera o mais provável, que nem sempre é verdadeiro', why: 'Isso.' },
            { text: 'Porque o modelo quer enganar', why: 'Ele não tem intenção.' },
            { text: 'Porque a internet caiu', why: 'Acontece mesmo sem relação com conexão.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'reduzir',
      part: 'Alucinação',
      title: 'Como reduzir o risco',
      art: 'cadeado',
      goal: 'Conhecer as medidas que reduzem a alucinação.',
      explain:
        'Formas de **reduzir** a alucinação:\n\n- fornecer as **fontes no contexto** (RAG) e pedir que a resposta se **limite a elas**;\n- pedir **citações verificáveis**;\n- **validar** a saída com testes, ferramentas ou **revisão humana**;\n- permitir que o modelo **diga que não sabe**.\n\n**Nenhuma** dessas medidas **zera** o risco. Em código, a validação mais confiável continua sendo **executar testes**.',
      check: {
        kind: 'multi',
        id: 're-c',
        prompt: 'Quais medidas reduzem a alucinação? Marque todas.',
        options: [
          { text: 'Fornecer as fontes no contexto e limitar a resposta a elas', correct: true, why: 'Isso.' },
          { text: 'Pedir citações verificáveis', correct: true, why: 'Isso.' },
          { text: 'Permitir que o modelo diga que não sabe', correct: true, why: 'Isso.' },
          { text: 'Aumentar a temperatura ao máximo', correct: false, why: 'Mais aleatoriedade não ajuda a ser fiel aos fatos.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Trate o modelo como um **estagiário brilhante, mas que às vezes inventa**: entregue os **documentos** certos, exija que **cite** de onde tirou, **confira** o que ele escreveu e deixe claro que "**não sei**" é uma resposta aceitável. Mesmo assim, revise.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Em código gerado por IA, a validação mais confiável é:',
          options: [
            { text: 'Executar testes', why: 'Isso.' },
            { text: 'Confiar porque o código parece bem escrito', why: 'Fluência não garante correção.' },
            { text: 'Pedir para o modelo jurar que está certo', why: 'O modelo pode afirmar com segurança algo errado.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'multimodal',
      part: 'Multimodal',
      title: 'Mais de um tipo de dado',
      art: 'celular',
      goal: 'Saber o que são modelos multimodais.',
      explain:
        'Modelos **multimodais** **recebem** e, às vezes, **produzem** mais de um tipo de dado: **texto**, **imagem**, **áudio**.\n\nUm exemplo de uso em TI: enviar a **captura de tela** de um erro e pedir o **diagnóstico**.\n\nNo controle externo, imagine enviar a **foto** de uma nota fiscal e pedir que o modelo extraia CNPJ e valor.',
      check: {
        kind: 'choice',
        id: 'mm-c',
        prompt: 'Um modelo que recebe a captura de tela de um erro e devolve um diagnóstico em texto é:',
        options: [
          { text: 'Multimodal', why: 'Isso: imagem na entrada, texto na saída.' },
          { text: 'Um sistema especialista de regras', why: 'É um modelo que lida com mais de um tipo de dado.' },
          { text: 'Um banco vetorial', why: 'Banco vetorial guarda embeddings.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Multi** quer dizer **vários**; **modal**, **modos** de informação. Um modelo que só lê texto é "monomodal". O multimodal "lê" uma foto, "ouve" um áudio e responde em texto, ou o contrário.',
        check: {
          kind: 'choice',
          id: 'mm-r',
          prompt: 'Quais tipos de dado um modelo multimodal pode receber?',
          options: [
            { text: 'Texto, imagem, áudio', why: 'Isso.' },
            { text: 'Só texto', why: 'Isso seria um modelo só de texto.' },
            { text: 'Só números de CPF', why: 'Pode receber vários tipos de dado.' },
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
      lines: ['Pré-treino: prever texto num corpus enorme', 'RLHF: alinhamento com preferências humanas', 'RAG zera o risco de alucinação'],
      bug: 2,
      why: 'Nenhuma medida zera o risco; o RAG reduz.',
      fixed: 'RAG reduz, mas não zera, a alucinação',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Treino ou uso?',
      categories: ['Etapa de treino', 'Cuidado no uso'],
      items: [
        { text: 'Ajuste fino com pares de instrução e resposta', cat: 0, why: 'Treino adicional.' },
        { text: 'Pedir citações verificáveis', cat: 1, why: 'Reduz alucinação no uso.' },
        { text: 'Alinhamento com RLHF', cat: 0, why: 'Etapa de treino.' },
        { text: 'Colocar no contexto a resolução publicada ontem', cat: 1, why: 'Supera a data de corte.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o assistente do setor indicou uma súmula com número e texto que ninguém encontra. O que fazer?',
      options: [
        { text: 'Tratar como possível alucinação e conferir na fonte oficial', why: 'Isso.' },
        { text: 'Usar no parecer, porque o texto parece correto', why: 'Fluência não garante veracidade.' },
        { text: 'Aumentar a temperatura e perguntar de novo', why: 'Mais aleatoriedade não confirma fatos.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.004' }],
  summary: [
    'Treino: pré-treinamento (prever texto), ajuste fino (exemplos específicos), alinhamento (RLHF).',
    'Data de corte: fatos posteriores só chegam pelo contexto (RAG, busca). O LLM não consulta a internet sozinho.',
    'Alucinação: fluente e convincente, porém falso; vem de gerar o mais provável.',
    'Reduzir: fontes no contexto, citações, validação e testes, permitir "não sei". Nada zera o risco.',
    'Multimodais: texto, imagem, áudio (ex.: diagnosticar um erro por captura de tela).',
  ],
};
