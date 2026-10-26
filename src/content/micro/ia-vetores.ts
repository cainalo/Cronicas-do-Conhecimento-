// Série "Embeddings e bancos vetoriais" (cap.ia.01, trecho vetores), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta de Salton ao pgvector; as seguintes ensinam embeddings e
// medidas de proximidade, depois banco vetorial, pgvector e cuidados, uma ideia por etapa. Fatos
// conferidos com o texto do capítulo (05-vetores.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.01', sectionId: 'vetores' } as const;

export const iaVetHistoria: MicroLesson = {
  ...S,
  id: 'ia.vetores.1',
  series: { id: 'ia.vetores', order: 1 },
  title: 'De Salton ao pgvector',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num mapa, cidades próximas ficam perto umas das outras. Dá para pôr textos num "mapa", com os de assunto parecido perto?',
    options: [
      { text: 'Sim: transformando textos em vetores', why: 'Isso. Esta aula conta como essa ideia surgiu e chegou aos bancos de dados.' },
      { text: 'Não: texto não vira número', why: 'Vira, e a ideia tem quase cinquenta anos. Esta aula conta.' },
      { text: 'Só textos curtos', why: 'Textos de qualquer tamanho podem virar vetores.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'salton',
      part: 'A história',
      title: '1975: textos como vetores',
      art: 'abaco',
      goal: 'Saber que Salton propôs o modelo de espaço vetorial.',
      explain:
        'Em **1975**, **Gerard Salton**, criador do sistema de busca **SMART**, publicou o **modelo de espaço vetorial**.\n\nA ideia: cada documento vira um **vetor**, uma lista de números. E a **proximidade** entre os vetores mede a **semelhança** entre os documentos.\n\nFoi a base da busca em documentos por décadas, e a raiz dos bancos vetoriais de hoje.',
      check: {
        kind: 'choice',
        id: 'sa-c',
        prompt: 'O que propôs o modelo de espaço vetorial de Salton?',
        options: [
          { text: 'Representar documentos como vetores e medir semelhança pela proximidade', why: 'Isso.' },
          { text: 'Guardar documentos em tabelas relacionais', why: 'Isso é o modelo relacional de Codd.' },
          { text: 'Traduzir textos automaticamente', why: 'É sobre representar e comparar documentos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine dar a cada documento um **endereço num mapa** feito de números. Documentos sobre "licitação" moram num bairro; sobre "folha de pagamento", em outro. Para achar parecidos, basta procurar os **vizinhos**. Salton propôs esse "mapa" em 1975.',
        check: {
          kind: 'choice',
          id: 'sa-r',
          prompt: 'Qual era o sistema de busca criado por Salton?',
          options: [
            { text: 'SMART', why: 'Isso.' },
            { text: 'ELIZA', why: 'ELIZA é o programa de conversa de 1966.' },
            { text: 'Okapi', why: 'Okapi é o projeto do BM25.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'w2v',
      part: 'A história',
      title: '2013: vetores pelo sentido',
      art: 'rede',
      goal: 'Saber que o word2vec aproximou palavras pelo significado.',
      explain:
        'Os vetores de Salton contavam **palavras**. Textos com **palavras diferentes**, mas **sentido igual**, ficavam longe.\n\nEm **2013**, o **word2vec** mostrou que vetores **aprendidos pelo contexto** aproximam palavras de **significado parecido**.\n\nDaí vieram os **embeddings** de hoje: "Tribunal de Contas" e "órgão de controle externo" ficam **perto**, mesmo sem palavra em comum.',
      check: {
        kind: 'choice',
        id: 'wv-c',
        prompt: 'O que o word2vec trouxe de novo em relação aos vetores de contagem?',
        options: [
          { text: 'Aproximar palavras pelo sentido, aprendido pelo contexto', why: 'Isso.' },
          { text: 'Contar palavras mais rápido', why: 'A novidade foi capturar o sentido.' },
          { text: 'Eliminar os vetores', why: 'Ele criou vetores melhores.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Contando palavras, "veículo" e "carro" são **estranhos**: letras diferentes. Aprendendo pelo **uso** ("dirigi o ___", "estacionei o ___"), os dois aparecem nos mesmos lugares e ficam **vizinhos**. É isso que o word2vec fez.',
        check: {
          kind: 'choice',
          id: 'wv-r',
          prompt: 'Em embeddings, "Tribunal de Contas" e "órgão de controle externo" ficam:',
          options: [
            { text: 'Próximos', why: 'Isso: sentido parecido.' },
            { text: 'Longe, por não terem palavras em comum', why: 'Embeddings aproximam pelo sentido.' },
            { text: 'Idênticos', why: 'Ficam próximos, não iguais.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hnsw',
      part: 'A história',
      title: '2016 e 2017: buscar rápido entre milhões',
      art: 'degraus',
      goal: 'Conhecer o HNSW e a FAISS.',
      explain:
        'Comparar a pergunta com **milhões** de vetores, um por um, é **lento**.\n\nEm **2016**, **Malkov e Yashunin** publicaram o índice **HNSW**, baseado em **grafos** em camadas, que acha vizinhos próximos em pouquíssimos passos.\n\nEm **2017**, o **Facebook** lançou a biblioteca **FAISS**, para busca de vizinhos em grande escala.\n\nCom eles, a busca vetorial ficou **rápida** de verdade.',
      check: {
        kind: 'choice',
        id: 'hn-c',
        prompt: 'O HNSW é:',
        options: [
          { text: 'Um índice baseado em grafos para achar vizinhos próximos rapidamente', why: 'Isso.' },
          { text: 'Um modelo de linguagem', why: 'É um índice de busca vetorial.' },
          { text: 'Uma lei sobre dados', why: 'É um índice de busca.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **estradas, avenidas e ruas**: para ir longe, você pega a estrada (camada de cima, poucos pontos); perto do destino, desce para as ruas (camadas de baixo). O HNSW navega assim entre os vetores, em vez de visitar um por um.',
        check: {
          kind: 'choice',
          id: 'hn-r',
          prompt: 'Quem lançou a biblioteca FAISS?',
          options: [
            { text: 'O Facebook, em 2017', why: 'Isso.' },
            { text: 'A IBM, em 1975', why: 'Em 1975 foi o modelo de Salton.' },
            { text: 'O Google, em 2022', why: 'A FAISS é do Facebook, de 2017.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pgvector',
      part: 'A história',
      title: '2021: vetores no PostgreSQL',
      art: 'dados',
      goal: 'Saber que o pgvector levou a busca vetorial ao PostgreSQL.',
      explain:
        'Em **2021**, foi lançada a extensão **pgvector**, que adiciona ao **PostgreSQL** um tipo **vector** e índices para busca vetorial.\n\nCom isso, dá para guardar **embeddings** no **mesmo banco** dos dados relacionais, sem adotar outro sistema.\n\nPara um órgão que já usa PostgreSQL, isso simplifica muito.',
      check: {
        kind: 'order',
        id: 'pg-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Modelo de espaço vetorial de Salton (1975)', 'word2vec (2013)', 'Índice HNSW (2016)', 'pgvector (2021)'],
        why: 'Da ideia de vetores à busca vetorial dentro do PostgreSQL.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Antes, quem tinha dados no PostgreSQL e queria busca vetorial precisava de **outro banco**, só para os vetores. O **pgvector** pôs tudo **no mesmo lugar**: a tabela de processos e o vetor de cada processo, lado a lado.',
        check: {
          kind: 'choice',
          id: 'pg-r',
          prompt: 'O que o pgvector acrescenta ao PostgreSQL?',
          options: [
            { text: 'Um tipo vector e índices para busca vetorial', why: 'Isso.' },
            { text: 'Um novo idioma de consultas', why: 'Continua sendo SQL, com um tipo novo.' },
            { text: 'Um modelo de linguagem embutido', why: 'Ele guarda e busca vetores; não gera texto.' },
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
      lines: ['1975: Salton e o espaço vetorial', '2016: HNSW', '2021: pgvector substitui o PostgreSQL'],
      bug: 2,
      why: 'O pgvector é uma extensão do PostgreSQL, não um substituto.',
      fixed: '2021: pgvector, extensão do PostgreSQL',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O que cada marco trouxe?',
      categories: ['Salton', 'word2vec', 'HNSW'],
      items: [
        { text: 'Documentos como vetores', cat: 0, why: '1975.' },
        { text: 'Vetores pelo sentido', cat: 1, why: '2013.' },
        { text: 'Busca rápida por grafos', cat: 2, why: '2016.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a equipe já usa PostgreSQL e quer busca por similaridade sem adotar outro banco. O que aprendemos?',
      options: [
        { text: 'Usar a extensão pgvector', why: 'Isso.' },
        { text: 'Migrar tudo para outro banco', why: 'Não é necessário com o pgvector.' },
        { text: 'Desistir da busca vetorial', why: 'O pgvector resolve isso.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    '1975: Salton (sistema SMART) propõe o modelo de espaço vetorial: documentos como vetores, semelhança pela proximidade.',
    '2013: word2vec, vetores pelo sentido; base dos embeddings.',
    '2016: índice HNSW (grafos); 2017: biblioteca FAISS (Facebook).',
    '2021: pgvector, tipo vector e índices no PostgreSQL.',
  ],
};

export const iaVetMedidas: MicroLesson = {
  ...S,
  id: 'ia.vetores.2',
  series: { id: 'ia.vetores', order: 2 },
  title: 'Embeddings e medidas de proximidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Dois vetores apontam exatamente para a mesma direção. Os textos que eles representam são parecidos?',
    options: [
      { text: 'Muito parecidos', why: 'Isso. Esta aula mostra como medir essa proximidade.' },
      { text: 'Opostos', why: 'Mesma direção indica semelhança.' },
      { text: 'Sem relação', why: 'Mesma direção é a maior semelhança possível.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'embedding',
      part: 'Embeddings',
      title: 'O que é um embedding',
      art: 'rede',
      goal: 'Saber o que é um embedding e a busca semântica.',
      explain:
        'Um **embedding** é um **vetor de números**, com **centenas ou milhares de dimensões**, gerado por um modelo, de forma que conteúdos com **significado parecido** fiquem **próximos** no espaço vetorial.\n\nÉ isso que permite a **busca semântica**: encontrar trechos **pelo sentido**, mesmo que usem **palavras diferentes** das da pergunta.\n\nPergunta "regras de viagem a serviço" acha o trecho sobre "**diárias e passagens**".',
      check: {
        kind: 'choice',
        id: 'em-c',
        prompt: 'Em sistemas de IA, embedding é:',
        options: [
          { text: 'Um vetor de números que representa o sentido de um conteúdo', why: 'Isso.' },
          { text: 'Uma senha de acesso ao modelo', why: 'É um vetor que representa sentido.' },
          { text: 'Um tipo de tabela relacional', why: 'É um vetor, não uma tabela.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **coordenadas GPS do sentido**: em vez de latitude e longitude, centenas de números. Textos sobre o mesmo assunto ganham coordenadas **próximas**. A busca semântica procura os vizinhos da pergunta nesse "mapa".',
        check: {
          kind: 'choice',
          id: 'em-r',
          prompt: 'A busca semântica encontra trechos:',
          options: [
            { text: 'Pelo sentido, mesmo com palavras diferentes', why: 'Isso.' },
            { text: 'Só com as mesmas palavras exatas', why: 'Isso é a busca por palavra-chave.' },
            { text: 'Pela data de criação', why: 'É pelo sentido.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'cosseno',
      part: 'Medidas',
      title: 'Similaridade de cosseno',
      art: 'alvo',
      goal: 'Interpretar a similaridade de cosseno.',
      explain:
        'A **similaridade de cosseno** é o **cosseno do ângulo** entre os vetores.\n\n- Varia de **−1 a 1**.\n- **Perto de 1**: mesma direção, **muito parecidos**.\n- **Perto de 0**: sem relação.\n- **−1**: direções **opostas**.\n\nEla **ignora o tamanho** dos vetores: compara só a **direção**.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Similaridade de cosseno igual a 1 indica:',
        options: [
          { text: 'Vetores na mesma direção: muito parecidos', why: 'Isso.' },
          { text: 'Vetores opostos', why: 'Opostos é −1.' },
          { text: 'Vetores sem relação', why: 'Sem relação é perto de 0.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine **ponteiros de relógio** saindo do mesmo centro. Juntos, apontando para o mesmo lado: cosseno **1**. Formando um "L": cosseno **0**. Apontando para lados contrários: **−1**. O comprimento dos ponteiros não importa, só para onde apontam.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"Similaridade de cosseno igual a 1 indica vetores opostos." Isso está:',
          options: [
            { text: 'Errado: 1 é mesma direção; −1 é oposta', why: 'Isso.' },
            { text: 'Certo', why: 'Opostos dão −1.' },
            { text: 'Certo para vetores longos', why: 'O cosseno ignora o tamanho.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'outras',
      part: 'Medidas',
      title: 'Produto escalar e distância euclidiana',
      art: 'balanca',
      goal: 'Distinguir produto escalar e distância euclidiana do cosseno.',
      explain:
        '- **Produto escalar**: **soma dos produtos** das coordenadas. **Maior** valor indica **mais semelhança**. Para vetores **normalizados** (de tamanho 1), **equivale ao cosseno**.\n- **Distância euclidiana**: a distância "**em linha reta**". **Quanto menor**, **mais parecidos**.\n\nCuidado com o sentido: na **similaridade**, maior é mais parecido; na **distância**, **menor** é mais parecido.',
      check: {
        kind: 'sort',
        id: 'ou-c',
        prompt: 'Nessa medida, mais parecido é maior ou menor?',
        categories: ['Maior = mais parecido', 'Menor = mais parecido'],
        items: [
          { text: 'Similaridade de cosseno', cat: 0, why: 'Perto de 1 é mais parecido.' },
          { text: 'Distância euclidiana', cat: 1, why: 'Menos distância, mais parecido.' },
          { text: 'Produto escalar', cat: 0, why: 'Maior valor, mais semelhança.' },
        ],
      },
      recovery: {
        explain: 'Use o bom senso das palavras: **similaridade** é "quanto se **parecem**": quanto mais, melhor. **Distância** é "quão **longe** estão": quanto menos, mais perto, mais parecidos. O produto escalar se comporta como similaridade.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: 'Para vetores normalizados, o produto escalar equivale a:',
          options: [
            { text: 'Similaridade de cosseno', why: 'Isso.' },
            { text: 'Distância euclidiana', why: 'Equivale ao cosseno.' },
            { text: 'Zero sempre', why: 'Equivale ao cosseno.' },
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
      lines: ['Cosseno varia de −1 a 1', 'Distância euclidiana: menor é mais parecido', 'Cosseno leva em conta o tamanho dos vetores'],
      bug: 2,
      why: 'O cosseno ignora o tamanho: compara só a direção.',
      fixed: 'Cosseno ignora o tamanho dos vetores',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que valor de cosseno combina com cada caso?',
      categories: ['Perto de 1', 'Perto de 0', 'Perto de −1'],
      items: [
        { text: 'Dois pareceres sobre o mesmo contrato', cat: 0, why: 'Muito parecidos.' },
        { text: 'Um parecer e uma receita de bolo', cat: 1, why: 'Sem relação.' },
        { text: 'Vetores em direções opostas', cat: 2, why: 'Opostos.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a pergunta "como pedir reembolso de viagem" deve achar o trecho "diárias e passagens". Que tipo de busca resolve?',
      options: [
        { text: 'Busca semântica com embeddings', why: 'Isso: acha pelo sentido.' },
        { text: 'Busca só por palavras exatas', why: 'As palavras são diferentes.' },
        { text: 'Ordenar por data', why: 'A data não diz nada do sentido.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.016' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.017' },
  ],
  summary: [
    'Embedding: vetor de centenas ou milhares de dimensões; sentidos parecidos ficam próximos. Base da busca semântica.',
    'Cosseno: de −1 a 1; perto de 1, mesma direção; −1, opostos. Ignora o tamanho.',
    'Produto escalar: maior, mais parecido (igual ao cosseno se normalizado). Euclidiana: menor, mais parecido.',
  ],
};

export const iaVetBanco: MicroLesson = {
  ...S,
  id: 'ia.vetores.3',
  series: { id: 'ia.vetores', order: 3 },
  title: 'Banco vetorial, pgvector e cuidados',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'São 10 milhões de trechos. Comparar a pergunta com cada um, um por um, é rápido?',
    options: [
      { text: 'Não: por isso existem índices aproximados', why: 'Isso. Esta aula mostra como os bancos vetoriais resolvem.' },
      { text: 'Sim, sempre', why: 'Com milhões de itens, a busca exata fica lenta.' },
      { text: 'Só com internet rápida', why: 'O problema é a quantidade de comparações.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'banco',
      part: 'Banco vetorial',
      title: 'Vizinhos mais próximos, aproximados',
      art: 'degraus',
      goal: 'Saber por que bancos vetoriais usam índices ANN como o HNSW.',
      explain:
        'Um **banco de dados vetorial** guarda embeddings e responde: "quais são os **k vetores mais próximos** deste?".\n\nComparar com **todos** (busca exata) fica **lento** com milhões de itens. Por isso se usam índices de **vizinho mais próximo aproximado** (**ANN**), que **trocam um pouco de precisão por muita velocidade**.\n\nUm dos mais usados é o **HNSW**, baseado em **grafos**.',
      check: {
        kind: 'choice',
        id: 'ba-c',
        prompt: 'Bancos vetoriais usam índices ANN, como o HNSW, porque:',
        options: [
          { text: 'Trocam um pouco de precisão por muita velocidade', why: 'Isso.' },
          { text: 'Garantem sempre o resultado exato', why: 'São aproximados: podem errar um pouco.' },
          { text: 'Dispensam os embeddings', why: 'Eles indexam justamente os embeddings.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Procurar o **restaurante mais próximo** olhando **todos** os da cidade é exato, mas demora. Olhar **só os do bairro** é quase sempre certo e muito mais rápido. O ANN faz essa troca: quase sempre acerta, em uma fração do tempo.',
        check: {
          kind: 'choice',
          id: 'ba-r',
          prompt: 'A sigla ANN quer dizer:',
          options: [
            { text: 'Vizinho mais próximo aproximado', why: 'Isso: Approximate Nearest Neighbor.' },
            { text: 'Agente de Navegação Neural', why: 'É Approximate Nearest Neighbor.' },
            { text: 'Arquivo Nacional de Notas', why: 'É Approximate Nearest Neighbor.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'tecnologias',
      part: 'Banco vetorial',
      title: 'As tecnologias',
      art: 'chip',
      goal: 'Reconhecer exemplos de tecnologias de busca vetorial.',
      explain:
        '- **pgvector**: extensão do **PostgreSQL**, com tipo **vector** e índices. Mantém vetores e dados relacionais **no mesmo banco**.\n- **Bancos dedicados**: Milvus, Qdrant, Weaviate, Pinecone, Chroma.\n- **Bibliotecas de busca**: como a **FAISS**.\n\nPara quem **já usa PostgreSQL**, o pgvector costuma ser o caminho mais simples.',
      check: {
        kind: 'choice',
        id: 'te-c',
        prompt: 'Uma equipe que já usa PostgreSQL quer guardar embeddings e buscar por similaridade sem adotar outro banco. A solução indicada é:',
        options: [
          { text: 'pgvector', why: 'Isso.' },
          { text: 'Um banco dedicado como Pinecone', why: 'Seria adotar outro banco.' },
          { text: 'Uma planilha', why: 'Não oferece busca vetorial.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **ampliar a casa** ou **mudar de casa**. O pgvector é ampliar: um cômodo novo (o tipo vector) na casa que você já tem (PostgreSQL). Os bancos dedicados são uma casa nova só para vetores. A FAISS é uma **ferramenta** de busca, não uma casa.',
        check: {
          kind: 'sort',
          id: 'te-r',
          prompt: 'Que tipo de tecnologia é cada uma?',
          categories: ['Extensão do PostgreSQL', 'Banco vetorial dedicado', 'Biblioteca de busca'],
          items: [
            { text: 'pgvector', cat: 0, why: 'Extensão.' },
            { text: 'Qdrant', cat: 1, why: 'Banco dedicado.' },
            { text: 'FAISS', cat: 2, why: 'Biblioteca.' },
          ],
        },
      },
    },
    {
      id: 'sql',
      part: 'pgvector',
      title: 'Uma consulta com pgvector',
      art: 'dados',
      goal: 'Ler uma consulta pgvector e os operadores de distância.',
      explain:
        '```\nCREATE EXTENSION IF NOT EXISTS vector;\nCREATE TABLE trechos (\n  id bigserial PRIMARY KEY,\n  conteudo text,\n  embedding vector(1536)\n);\nSELECT conteudo FROM trechos\nORDER BY embedding <=> $1\nLIMIT 5;\n```\n\nO **1536** é só exemplo: deve ser **igual à dimensão** do modelo de embedding. Operadores: **<->** distância **euclidiana**; **<=>** distância de **cosseno**; **<#>** produto interno **negativo**.',
      check: {
        kind: 'choice',
        id: 'sq-c',
        prompt: 'No pgvector, qual operador calcula a distância de cosseno?',
        options: [
          { text: '<=>', why: 'Isso.' },
          { text: '<->', why: '<-> é a distância euclidiana.' },
          { text: '<#>', why: '<#> é o produto interno negativo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia a consulta em português: "**pegue o conteúdo** dos trechos, **ordene** pela distância de cosseno até o vetor da pergunta e **traga os 5** mais próximos". O **ORDER BY ... LIMIT 5** é o "top-k" do RAG, com k = 5.',
        check: {
          kind: 'choice',
          id: 'sq-r',
          prompt: 'O número em vector(1536) deve ser:',
          options: [
            { text: 'Igual à dimensão do modelo de embedding usado', why: 'Isso.' },
            { text: 'Sempre 1536', why: 'É só exemplo: depende do modelo.' },
            { text: 'O número de linhas da tabela', why: 'É a dimensão do vetor.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'cuidados',
      part: 'Cuidados',
      title: 'Mesmo modelo, recalcular, LGPD',
      art: 'cadeado',
      goal: 'Conhecer os cuidados com embeddings.',
      explain:
        '- Use o **mesmo modelo de embedding** para **indexar** e **consultar**: vetores de modelos diferentes **não são comparáveis**.\n- **Trocar de modelo** exige **recalcular** os vetores.\n- **Embeddings de dados pessoais** também são **dados pessoais** para fins de **LGPD**: o **controle de acesso** precisa acompanhar o documento de origem.',
      check: {
        kind: 'choice',
        id: 'cu-c',
        prompt: 'A equipe indexou com o modelo A e passou a consultar com o modelo B. O que acontece?',
        options: [
          { text: 'Os vetores não são comparáveis; é preciso recalcular a base com o mesmo modelo', why: 'Isso.' },
          { text: 'Funciona normalmente', why: 'Vetores de modelos diferentes vivem em "mapas" diferentes.' },
          { text: 'Fica mais preciso', why: 'Fica incoerente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Cada modelo desenha o **seu próprio mapa**. Comparar uma coordenada do mapa A com outra do mapa B é como misturar **graus de latitude** com **quilômetros**: os números não conversam. Mudou o modelo, refaça o mapa todo.',
        check: {
          kind: 'choice',
          id: 'cu-r',
          prompt: 'Embeddings gerados a partir de documentos com dados pessoais são, para a LGPD:',
          options: [
            { text: 'Também dados pessoais, com o mesmo controle de acesso', why: 'Isso.' },
            { text: 'Dados anônimos, livres de controle', why: 'Continuam ligados aos dados pessoais de origem.' },
            { text: 'Irrelevantes para a lei', why: 'A proteção acompanha o documento de origem.' },
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
      prompt: 'Que operador do pgvector calcula cada medida?',
      categories: ['<->', '<=>', '<#>'],
      items: [
        { text: 'Distância euclidiana', cat: 0, why: '<->.' },
        { text: 'Distância de cosseno', cat: 1, why: '<=>.' },
        { text: 'Produto interno negativo', cat: 2, why: '<#>.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['ANN troca precisão por velocidade', 'HNSW é baseado em grafos', 'Pode-se consultar com um modelo e indexar com outro'],
      bug: 2,
      why: 'É preciso usar o mesmo modelo para indexar e consultar.',
      fixed: 'Indexar e consultar com o mesmo modelo',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o órgão vai trocar o modelo de embedding por um melhor. O que precisa ser feito com a base?',
      options: [
        { text: 'Recalcular todos os vetores com o novo modelo', why: 'Isso.' },
        { text: 'Nada: os vetores antigos continuam valendo', why: 'Não são comparáveis com os do novo modelo.' },
        { text: 'Apagar os documentos', why: 'Basta recalcular os vetores.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.018' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.019' },
  ],
  summary: [
    'Banco vetorial: responde os k vetores mais próximos. Índices ANN (como o HNSW, por grafos) trocam um pouco de precisão por muita velocidade.',
    'Tecnologias: pgvector (extensão do PostgreSQL), bancos dedicados (Milvus, Qdrant, Weaviate, Pinecone, Chroma), FAISS.',
    'pgvector: vector(n) com n igual à dimensão do modelo; <-> euclidiana, <=> cosseno, <#> produto interno negativo; ORDER BY ... LIMIT k.',
    'Cuidados: mesmo modelo para indexar e consultar; trocar de modelo exige recalcular; embeddings de dados pessoais seguem a LGPD.',
  ],
};
