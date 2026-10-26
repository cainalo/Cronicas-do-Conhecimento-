// Série "Quadro-resumo e pegadinhas" (cap.ia.01, trecho resumo), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula revê a linha do tempo do capítulo; a segunda percorre o quadro-resumo e
// as pegadinhas, uma ideia por etapa. Conteúdo conferido com o texto do capítulo (06-resumo.md).
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.01', sectionId: 'resumo' } as const;

export const iaResLinha: MicroLesson = {
  ...S,
  id: 'ia.resumo.1',
  series: { id: 'ia.resumo', order: 1 },
  title: 'A linha do tempo do capítulo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Antes da revisão final, vale montar a história inteira numa linha só. Você lembra qual veio primeiro: o transformer ou o word2vec?',
    options: [
      { text: 'O word2vec (2013), depois o transformer (2017)', why: 'Isso. Esta aula monta a linha do tempo completa.' },
      { text: 'O transformer veio antes', why: 'O transformer é de 2017; o word2vec, de 2013.' },
      { text: 'Vieram no mesmo ano', why: 'Há quatro anos entre eles: 2013 e 2017.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'raizes',
      part: 'Linha do tempo',
      title: 'As raízes: 1948 e 1975',
      art: 'abaco',
      goal: 'Relembrar as duas ideias de base do capítulo.',
      explain:
        'Duas ideias antigas sustentam tudo o que você estudou:\n\n- **1948, Shannon**: prever o **próximo símbolo** de um texto pelos anteriores. É o que um **LLM** faz.\n- **1975, Salton**: representar documentos como **vetores** e medir a **semelhança** pela proximidade. É o que um **banco vetorial** faz.\n\nUm gera texto; o outro encontra texto. O **RAG** junta os dois.',
      check: {
        kind: 'sort',
        id: 'ra-c',
        prompt: 'Que ideia sustenta cada tecnologia?',
        categories: ['Prever o próximo símbolo (Shannon)', 'Documentos como vetores (Salton)'],
        items: [
          { text: 'LLM', cat: 0, why: 'Gera prevendo o próximo token.' },
          { text: 'Banco vetorial', cat: 1, why: 'Busca por proximidade.' },
          { text: 'Busca semântica', cat: 1, why: 'Vizinhos no espaço vetorial.' },
        ],
      },
      recovery: {
        explain: 'Pense em **escrever** e **procurar**. Escrever, palavra após palavra, é a ideia de **Shannon**: o LLM. Procurar o documento mais parecido é a ideia de **Salton**: o banco vetorial. O RAG primeiro **procura**, depois **escreve**.',
        check: {
          kind: 'choice',
          id: 'ra-r',
          prompt: 'O RAG junta quais duas ideias?',
          options: [
            { text: 'Buscar por proximidade e gerar prevendo texto', why: 'Isso.' },
            { text: 'Só gerar, sem buscar', why: 'O RAG busca antes de gerar.' },
            { text: 'Só buscar, sem gerar', why: 'O LLM gera a resposta no fim.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sentido',
      part: 'Linha do tempo',
      title: '2013 e 2017: sentido e atenção',
      art: 'rede',
      goal: 'Relembrar word2vec e transformer.',
      explain:
        '- **2013, word2vec**: palavras como **vetores densos**, aprendidos pelo contexto. Sentidos parecidos ficam perto. Base dos **embeddings**.\n- **2017, transformer** ("Attention Is All You Need"): o mecanismo de **atenção** e o processamento em **paralelo** tornaram possíveis os **LLMs**.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Qual marco tornou possíveis os LLMs?',
        options: [
          { text: 'O transformer, em 2017', why: 'Isso.' },
          { text: 'O word2vec, em 2013', why: 'O word2vec deu base aos embeddings.' },
          { text: 'O modelo de Salton, em 1975', why: 'Salton é a base da busca vetorial.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Associe: **word2vec** = **sentido** das palavras em vetores (2013). **Transformer** = **atenção**, a máquina que lê tudo de uma vez e cresce até virar LLM (2017). Um serve à busca; o outro, à geração.',
        check: {
          kind: 'order',
          id: 'se-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Shannon (1948)', 'Salton (1975)', 'word2vec (2013)', 'Transformer (2017)'],
          why: 'As raízes e depois as duas peças modernas.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'explosao',
      part: 'Linha do tempo',
      title: '2020 e 2022: few-shot, RAG e ChatGPT',
      art: 'progresso',
      goal: 'Relembrar os marcos de 2020 e 2022.',
      explain:
        '- **2020**: o **GPT-3** e o **few-shot** (aprender com exemplos no prompt); o artigo do **RAG** (Lewis e colegas).\n- **2022**: a **cadeia de pensamento**; o termo "**injeção de prompt**"; o **ChatGPT** leva os LLMs ao público.\n\nEm dois anos, surgiram as principais técnicas de **uso** e o principal **risco**.',
      check: {
        kind: 'sort',
        id: 'ex-c',
        prompt: 'Em que ano aconteceu cada marco?',
        categories: ['2020', '2022'],
        items: [
          { text: 'Few-shot no artigo do GPT-3', cat: 0, why: '2020.' },
          { text: 'Artigo que deu nome ao RAG', cat: 0, why: '2020.' },
          { text: 'Termo "injeção de prompt"', cat: 1, why: '2022.' },
          { text: 'Cadeia de pensamento', cat: 1, why: '2022.' },
        ],
      },
      recovery: {
        explain: 'Guarde em dois blocos. **2020 é o ano de "como dar conhecimento"**: exemplos no prompt (few-shot) e documentos recuperados (RAG). **2022 é o ano de "como pensar e como atacar"**: passo a passo (cadeia de pensamento) e injeção de prompt.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'Em que ano o ChatGPT levou os LLMs ao grande público?',
          options: [
            { text: 'No fim de 2022', why: 'Isso.' },
            { text: '2013', why: '2013 é o word2vec.' },
            { text: '1975', why: '1975 é o modelo de Salton.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'maturidade',
      part: 'Linha do tempo',
      title: '2023: limites e riscos',
      art: 'cadeado',
      goal: 'Relembrar os marcos de 2023.',
      explain:
        '- ***Lost in the Middle***: o **meio** de contextos longos é pior aproveitado. Janela maior não é, sozinha, resposta melhor.\n- **OWASP Top 10 for LLM**: a **injeção de prompt** em primeiro lugar (LLM01).\n\nO ano em que se aprendeu que **mais contexto** e **mais poder** trazem também **novos limites** e **novos riscos**.',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'O que os marcos de 2023 ensinaram?',
        options: [
          { text: 'Que contextos longos e agentes poderosos têm limites e riscos', why: 'Isso.' },
          { text: 'Que os LLMs não têm mais problemas', why: 'Mostraram justamente limites e riscos.' },
          { text: 'Que o RAG deixou de existir', why: 'O RAG se espalhou a partir de 2023.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Depois da euforia de 2022, 2023 foi o ano do **exame de consciência**: o estudo do "meio esquecido" e a lista de riscos da OWASP. Para a prova, guarde os dois: **meio pior aproveitado** e **LLM01 = injeção de prompt**.',
        check: {
          kind: 'choice',
          id: 'ma-r',
          prompt: 'Qual o item LLM01 do OWASP Top 10 for LLM?',
          options: [
            { text: 'Injeção de prompt', why: 'Isso.' },
            { text: 'Alucinação', why: 'O primeiro item é a injeção de prompt.' },
            { text: 'Temperatura alta', why: 'O primeiro item é a injeção de prompt.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a linha do tempo.',
      items: ['Shannon (1948)', 'Salton (1975)', 'word2vec (2013)', 'Transformer (2017)', 'GPT-3 e RAG (2020)', 'ChatGPT (2022)'],
      why: 'Das raízes estatísticas ao assistente para todos.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['1948: Shannon', '2017: transformer', '2013: ChatGPT chega ao público'],
      bug: 2,
      why: 'Em 2013 veio o word2vec; o ChatGPT é do fim de 2022.',
      fixed: '2013: word2vec',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um colega acha que "janela maior sempre resolve". Que marco de 2023 você citaria?',
      options: [
        { text: 'O estudo Lost in the Middle', why: 'Isso.' },
        { text: 'O word2vec', why: 'O word2vec é de 2013 e trata de vetores.' },
        { text: 'O BM25', why: 'O BM25 é da busca por palavras.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Raízes: Shannon (1948), prever o próximo símbolo; Salton (1975), documentos como vetores.',
    'word2vec (2013): sentido em vetores. Transformer (2017): atenção, base dos LLMs.',
    '2020: GPT-3 (few-shot) e RAG. 2022: cadeia de pensamento, injeção de prompt, ChatGPT.',
    '2023: Lost in the Middle e OWASP Top 10 para LLM.',
  ],
};

export const iaResQuadro: MicroLesson = {
  ...S,
  id: 'ia.resumo.2',
  series: { id: 'ia.resumo', order: 2 },
  title: 'Quadro-resumo e pegadinhas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Na prova, a questão fala em "exemplos no próprio prompt, sem mudar os pesos". Em que você deve pensar?',
    options: [
      { text: 'Few-shot, ou aprendizado em contexto', why: 'Isso. Esta aula treina essa associação rápida para cada conceito.' },
      { text: 'Ajuste fino', why: 'Ajuste fino muda os pesos.' },
      { text: 'RAG', why: 'RAG traz trechos recuperados, não exemplos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'modelo',
      part: 'Quadro-resumo',
      title: 'Se a questão fala do modelo',
      art: 'chip',
      goal: 'Associar descrições a conceitos do funcionamento do LLM.',
      explain:
        '- "Prever o próximo token, Transformer, atenção" → **funcionamento do LLM**.\n- "Limite de tokens que o modelo considera" → **janela de contexto**.\n- "Resposta convincente, porém falsa" → **alucinação**.\n\nTreine a **associação rápida**: na prova, o enunciado descreve; você dá o nome.',
      check: {
        kind: 'sort',
        id: 'mo-c',
        prompt: 'Qual conceito a descrição indica?',
        categories: ['Janela de contexto', 'Alucinação', 'Funcionamento do LLM'],
        items: [
          { text: 'Limite de tokens considerados', cat: 0, why: 'Tamanho da janela.' },
          { text: 'Citação de lei que não existe, dita com segurança', cat: 1, why: 'Falso e convincente.' },
          { text: 'Prever o próximo token com atenção', cat: 2, why: 'Como o LLM gera.' },
        ],
      },
      recovery: {
        explain: 'Pegue a **palavra-chave** do enunciado: "**limite**" de tokens → janela; "**convincente, porém falso**" → alucinação; "**próximo token**", "**atenção**" → funcionamento. Quase toda questão traz uma dessas pistas.',
        check: {
          kind: 'choice',
          id: 'mo-r',
          prompt: '"Resposta convincente, porém falsa" indica:',
          options: [
            { text: 'Alucinação', why: 'Isso.' },
            { text: 'Injeção de prompt', why: 'Injeção é texto externo manipulando o modelo.' },
            { text: 'Embedding', why: 'Embedding é vetor de sentido.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pedido',
      part: 'Quadro-resumo',
      title: 'Se a questão fala do pedido',
      art: 'cartao',
      goal: 'Associar descrições a técnicas de prompt e contexto.',
      explain:
        '- "Exemplos no próprio prompt, sem mudar pesos" → **few-shot** / aprendizado em contexto.\n- "Raciocínio passo a passo" → **cadeia de pensamento**.\n- "Texto externo que manipula o modelo" → **injeção de prompt** (indireta).\n- "Escolher o que entra na janela, compactar, memória" → **engenharia de contexto**.',
      check: {
        kind: 'sort',
        id: 'pe-c',
        prompt: 'Qual conceito a descrição indica?',
        categories: ['Few-shot', 'Cadeia de pensamento', 'Engenharia de contexto'],
        items: [
          { text: 'Três exemplos antes do pedido', cat: 0, why: 'Exemplos no prompt.' },
          { text: '"Raciocine passo a passo"', cat: 1, why: 'Etapas.' },
          { text: 'Compactar o histórico e escolher arquivos', cat: 2, why: 'O que entra na janela.' },
        ],
      },
      recovery: {
        explain: 'Separe em duas perguntas: **como pedir** (few-shot, passo a passo, papel: engenharia de **prompts**) e **o que o modelo tem à mão** (seleção, compactação, memória: engenharia de **contexto**). E, se o texto vem **de fora** e dá ordens, é **injeção**.',
        check: {
          kind: 'choice',
          id: 'pe-r',
          prompt: '"Texto de uma página web que manipula o modelo" indica:',
          options: [
            { text: 'Injeção de prompt indireta', why: 'Isso.' },
            { text: 'Few-shot', why: 'Few-shot é técnica legítima com exemplos.' },
            { text: 'Compactação', why: 'Compactação é resumir o histórico.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'busca',
      part: 'Quadro-resumo',
      title: 'Se a questão fala de busca',
      art: 'trilha',
      goal: 'Associar descrições a RAG, embedding e banco vetorial.',
      explain:
        '- "Buscar trechos e inserir no prompt antes de gerar" → **RAG**.\n- "Conhecimento atualizável e com fonte" → **RAG** (não ajuste fino).\n- "Vetor que representa o sentido de um texto" → **embedding**.\n- "k vizinhos mais próximos, HNSW, ANN" → **banco vetorial**.\n- "Extensão de busca vetorial do PostgreSQL" → **pgvector**.',
      check: {
        kind: 'sort',
        id: 'bu-c',
        prompt: 'Qual conceito a descrição indica?',
        categories: ['RAG', 'Banco vetorial', 'pgvector'],
        items: [
          { text: 'Recuperar trechos e pô-los no prompt', cat: 0, why: 'Busca + geração.' },
          { text: 'k vizinhos mais próximos com HNSW', cat: 1, why: 'Índice ANN.' },
          { text: 'Busca vetorial dentro do PostgreSQL', cat: 2, why: 'Extensão.' },
        ],
      },
      recovery: {
        explain: 'Pense na cadeia: o **embedding** é o "endereço de sentido"; o **banco vetorial** é o "arquivo" que acha vizinhos rápido (HNSW); o **pgvector** é esse arquivo **dentro do PostgreSQL**; e o **RAG** usa tudo isso para entregar trechos ao LLM.',
        check: {
          kind: 'choice',
          id: 'bu-r',
          prompt: '"Conhecimento atualizável e com fonte" aponta para:',
          options: [
            { text: 'RAG', why: 'Isso.' },
            { text: 'Ajuste fino', why: 'Ajuste fino é para estilo e comportamento.' },
            { text: 'Temperatura baixa', why: 'Temperatura não traz conhecimento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pegadinhas-a',
      part: 'Pegadinhas',
      title: 'Quatro falsos clássicos',
      art: 'revisao',
      goal: 'Reconhecer as pegadinhas sobre internet, few-shot, temperatura e RAG.',
      explain:
        'Todas **falsas**:\n\n1. "O LLM consulta a internet a cada resposta." Só se a aplicação oferecer ferramenta de busca.\n2. "**Few-shot** altera os pesos do modelo." Os exemplos ficam só no prompt.\n3. "**Temperatura alta** deixa a resposta mais determinística." É o contrário.\n4. "**RAG elimina** as alucinações." Reduz; a recuperação pode falhar.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Qual afirmação é verdadeira?',
        options: [
          { text: 'Temperatura baixa deixa a resposta mais previsível', why: 'Isso.' },
          { text: 'Few-shot altera os pesos do modelo', why: 'Falso: só o prompt muda.' },
          { text: 'RAG elimina as alucinações', why: 'Falso: reduz.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Desconfie de **absolutos** ("a cada resposta", "elimina") e de **inversões** (temperatura alta "determinística"). Na prova, a forma mais comum de errar é aceitar uma frase que **exagera** uma verdade: o RAG **reduz** (verdade) vira **elimina** (falso).',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: '"O LLM consulta a internet a cada resposta." Isso está:',
          options: [
            { text: 'Errado: só busca se a aplicação oferecer ferramenta', why: 'Isso.' },
            { text: 'Certo', why: 'Ele gera do treino e do contexto.' },
            { text: 'Certo com temperatura alta', why: 'Temperatura não tem relação com busca.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pegadinhas-b',
      part: 'Pegadinhas',
      title: 'Mais quatro falsos clássicos',
      art: 'alvo',
      goal: 'Reconhecer as pegadinhas sobre RAG, cosseno, delimitadores e janela.',
      explain:
        'Também **falsas**:\n\n5. "Para atualizar um **RAG** é preciso retreinar o modelo." Atualiza-se a base.\n6. "**Cosseno igual a 1** indica vetores opostos." Indica **mesma direção**; −1 é oposto.\n7. "**Delimitadores** eliminam a injeção de prompt." Ajudam; a defesa principal é **limitar o que o modelo pode fazer**.\n8. "**Janela maior** sempre melhora a resposta." Irrelevante atrapalha, e o meio é pior aproveitado.',
      check: {
        kind: 'multi',
        id: 'pb-c',
        prompt: 'Quais afirmações são falsas? Marque todas.',
        options: [
          { text: 'Cosseno igual a 1 indica vetores opostos', correct: true, why: 'Falsa: indica mesma direção.' },
          { text: 'Delimitadores eliminam a injeção', correct: true, why: 'Falsa: ajudam, não eliminam.' },
          { text: 'Janela maior sempre melhora', correct: true, why: 'Falsa.' },
          { text: 'No RAG, atualiza-se a base, sem retreinar', correct: false, why: 'Essa é verdadeira.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Para cada frase, pergunte: **ela troca algo de lugar?** (cosseno 1 com −1), **ela exagera?** (delimitador "elimina"; janela "sempre" melhora), **ela inventa um passo?** (retreinar no RAG). Achou um desses, é pegadinha.',
        check: {
          kind: 'choice',
          id: 'pb-r',
          prompt: 'A defesa principal contra injeção de prompt é:',
          options: [
            { text: 'Limitar o que o modelo pode fazer e exigir confirmação humana', why: 'Isso.' },
            { text: 'Usar só delimitadores', why: 'Ajudam, mas não bastam.' },
            { text: 'Aumentar a janela de contexto', why: 'Não protege contra injeção.' },
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
      prompt: 'Verdadeiro ou falso?',
      categories: ['Verdadeiro', 'Falso'],
      items: [
        { text: 'Few-shot mantém os pesos do modelo', cat: 0, why: 'Os exemplos ficam no prompt.' },
        { text: 'RAG elimina toda alucinação', cat: 1, why: 'Reduz.' },
        { text: 'pgvector é extensão do PostgreSQL', cat: 0, why: 'Isso.' },
        { text: 'Cosseno −1 indica mesma direção', cat: 1, why: '−1 é oposto.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Atenção: ideia central do Transformer', 'HNSW: índice de vizinhos aproximados', 'Ajuste fino: melhor para conhecimento que muda todo mês'],
      bug: 2,
      why: 'Conhecimento que muda com frequência pede RAG; ajuste fino é para estilo e comportamento.',
      fixed: 'RAG: melhor para conhecimento que muda todo mês',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a questão diz "o sistema recupera trechos de normas internas e os insere no prompt antes de o modelo responder, indicando a fonte". O conceito é:',
      options: [
        { text: 'RAG', why: 'Isso.' },
        { text: 'Few-shot', why: 'Few-shot usa exemplos, não trechos recuperados.' },
        { text: 'Alucinação', why: 'Alucinação é responder algo falso.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Modelo: próximo token e atenção (funcionamento); limite de tokens (janela); convincente e falso (alucinação).',
    'Pedido: exemplos sem mudar pesos (few-shot); passo a passo (cadeia de pensamento); texto externo que manipula (injeção); o que entra na janela (engenharia de contexto).',
    'Busca: trechos no prompt (RAG); vetor de sentido (embedding); k vizinhos e HNSW (banco vetorial); PostgreSQL (pgvector).',
    'Pegadinhas: internet a cada resposta, few-shot muda pesos, temperatura alta determinística, RAG elimina, retreinar o RAG, cosseno 1 oposto, delimitador elimina injeção, janela maior sempre melhor: todas falsas.',
  ],
};
