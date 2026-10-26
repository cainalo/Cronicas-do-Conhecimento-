// Série "Geração aumentada por recuperação (RAG)" (cap.ia.01, trecho rag), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta do BM25 ao artigo de Lewis; as seguintes ensinam o porquê
// e o fluxo do RAG, depois falhas, melhorias e a comparação com o ajuste fino, uma ideia por etapa.
// Fatos conferidos com o texto do capítulo (04-rag.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.01', sectionId: 'rag' } as const;

export const iaRagHistoria: MicroLesson = {
  ...S,
  id: 'ia.rag.1',
  series: { id: 'ia.rag', order: 1 },
  title: 'Da busca por palavras ao RAG',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Antes de responder a uma consulta difícil, um bom servidor vai ao arquivo buscar os documentos certos. Um modelo de IA pode fazer o mesmo?',
    options: [
      { text: 'Sim: buscar primeiro e responder depois', why: 'Isso: é o RAG. Esta aula conta como essa ideia surgiu.' },
      { text: 'Não: ele só sabe o que aprendeu no treino', why: 'Sozinho, sim; mas a aplicação pode buscar antes e entregar os trechos. Esta aula conta como.' },
      { text: 'Só se for retreinado todo dia', why: 'Com o RAG, não é preciso retreinar.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'bm25',
      part: 'A história',
      title: 'Anos 1990: buscar por palavras',
      art: 'livro',
      goal: 'Saber que o BM25 é a base da busca por palavras-chave.',
      explain:
        'Muito antes dos LLMs, já se buscavam documentos por **palavras-chave**.\n\nNos **anos 1990**, o algoritmo **BM25**, desenvolvido por **Stephen Robertson** e colegas no projeto **Okapi**, em Londres, tornou-se padrão: ele dá mais pontos a documentos que **contêm os termos** da busca, especialmente os **termos raros** (a mesma ideia do IDF).\n\nAté hoje é usado, inclusive **junto** com o RAG.',
      check: {
        kind: 'choice',
        id: 'bm-c',
        prompt: 'O BM25 é um algoritmo de:',
        options: [
          { text: 'Busca por palavras-chave', why: 'Isso.' },
          { text: 'Geração de imagens', why: 'É de busca por palavras.' },
          { text: 'Treino de redes neurais', why: 'É de busca, não de treino.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **índice remissivo** muito esperto: ele procura as páginas que têm as palavras que você pediu e dá **mais destaque** às palavras **raras**, que identificam melhor o assunto. O BM25 faz isso com milhões de documentos.',
        check: {
          kind: 'choice',
          id: 'bm-r',
          prompt: 'Em que projeto o BM25 foi desenvolvido?',
          options: [
            { text: 'Okapi, em Londres', why: 'Isso.' },
            { text: 'ARPANET', why: 'A ARPANET foi a rede de 1969.' },
            { text: 'System R', why: 'O System R é da IBM e do SQL.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'lewis',
      part: 'A história',
      title: '2020: nasce o nome RAG',
      art: 'rede',
      goal: 'Saber que o artigo de Lewis e colegas deu nome ao RAG.',
      explain:
        'Em **2020**, **Patrick Lewis** e colegas publicaram o artigo que juntou **busca** e **geração** e deu nome à técnica: **RAG** (*Retrieval-Augmented Generation*, **geração aumentada por recuperação**).\n\nA ideia: **antes** de o modelo responder, um sistema **recupera** trechos relevantes de uma base e os **coloca no contexto**.\n\nO modelo passa a responder **com base em documentos**, e não só no que lembra do treino.',
      check: {
        kind: 'choice',
        id: 'le-c',
        prompt: 'Na técnica RAG, antes de gerar a resposta, o sistema:',
        options: [
          { text: 'Recupera trechos relevantes de uma base e os coloca no contexto', why: 'Isso.' },
          { text: 'Retreina o modelo com os documentos', why: 'O RAG não retreina; coloca trechos no contexto.' },
          { text: 'Apaga a pergunta do usuário', why: 'A pergunta segue junto com os trechos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É a diferença entre responder **de cabeça** e responder **com os autos na mão**. O RAG é o **estagiário** que, antes de você responder, corre ao arquivo e põe na sua mesa as páginas que importam. Aí você responde citando-as.',
        check: {
          kind: 'choice',
          id: 'le-r',
          prompt: 'O que significa a sigla RAG?',
          options: [
            { text: 'Geração aumentada por recuperação', why: 'Isso: Retrieval-Augmented Generation.' },
            { text: 'Rede de Agentes Generativos', why: 'É Retrieval-Augmented Generation.' },
            { text: 'Regra de Arquivamento Geral', why: 'É Retrieval-Augmented Generation.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'toda-parte',
      part: 'A história',
      title: 'Depois de 2023: RAG em toda parte',
      art: 'suporte',
      goal: 'Ver por que o RAG se espalhou em empresas e órgãos.',
      explain:
        'Com a popularização dos assistentes conversacionais, **a partir de 2023**, empresas e órgãos passaram a conectar LLMs às **suas próprias bases de documentos**: normas internas, manuais, processos.\n\nO motivo é prático: responder **com fonte**, sobre documentos **atualizados** ou **privados**, que nunca estiveram no treino do modelo.\n\nUm assistente que responde sobre as **resoluções do Tribunal** é um caso típico de RAG.',
      check: {
        kind: 'order',
        id: 'tp-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['BM25 no projeto Okapi (anos 1990)', 'Artigo de Lewis dá nome ao RAG (2020)', 'RAG se espalha em empresas e órgãos (a partir de 2023)'],
        why: 'Da busca por palavras à busca junto com a geração.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O LLM sabe muito **de modo geral**, mas nada das **resoluções internas** do seu órgão. O RAG é a **ponte**: liga o modelo à base de documentos da casa, para que ele responda sobre ela e diga **de onde** tirou cada informação.',
        check: {
          kind: 'choice',
          id: 'tp-r',
          prompt: 'Por que órgãos públicos usam RAG?',
          options: [
            { text: 'Para responder sobre documentos próprios e atualizados, com fonte', why: 'Isso.' },
            { text: 'Para não precisar de documentos', why: 'O RAG depende justamente dos documentos.' },
            { text: 'Para treinar modelos do zero', why: 'O RAG dispensa retreino.' },
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
      lines: ['BM25: busca por palavras-chave', 'Lewis e colegas (2020): nome RAG', 'RAG: retreina o modelo a cada pergunta'],
      bug: 2,
      why: 'O RAG recupera trechos e os põe no contexto; não retreina.',
      fixed: 'RAG: recupera trechos e os põe no contexto',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Busca ou geração?',
      categories: ['Parte da busca (recuperação)', 'Parte da geração'],
      items: [
        { text: 'Achar os trechos mais relevantes', cat: 0, why: 'Recuperação.' },
        { text: 'Escrever a resposta usando os trechos', cat: 1, why: 'Geração pelo LLM.' },
        { text: 'BM25', cat: 0, why: 'Algoritmo de busca.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o Tribunal quer um assistente sobre o seu regimento interno, que muda às vezes. Qual ideia desta aula resolve?',
      options: [
        { text: 'RAG: buscar trechos do regimento antes de responder', why: 'Isso.' },
        { text: 'Confiar no que o modelo lembra do treino', why: 'O regimento interno pode nem estar no treino.' },
        { text: 'Aumentar a temperatura', why: 'Não traz conhecimento novo.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Anos 1990: BM25 (Robertson, projeto Okapi), busca por palavras-chave, valorizando termos raros.',
    '2020: Lewis e colegas dão nome ao RAG: recuperar trechos e colocá-los no contexto antes de gerar.',
    'A partir de 2023: RAG em empresas e órgãos, para responder com fonte sobre documentos próprios e atualizados.',
  ],
};

export const iaRagFluxo: MicroLesson = {
  ...S,
  id: 'ia.rag.2',
  series: { id: 'ia.rag', order: 2 },
  title: 'Por que usar e o fluxo passo a passo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um manual de 500 páginas precisa servir de base para o assistente. Dá para colocá-lo inteiro no prompt a cada pergunta?',
    options: [
      { text: 'Não é o ideal: melhor dividir e buscar só os trechos certos', why: 'Isso. Esta aula mostra esse fluxo, passo a passo.' },
      { text: 'Sim, sempre', why: 'Ocuparia a janela e traria ruído. O RAG busca só o necessário.' },
      { text: 'Não dá para usar o manual', why: 'Dá, com indexação e busca.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'porque',
      part: 'Por que usar',
      title: 'Quatro motivos',
      art: 'alvo',
      goal: 'Conhecer os motivos para usar RAG.',
      explain:
        '- O modelo passa a responder com base em documentos **atualizados ou privados** (normas internas, manuais, processos) que **não estavam no treino**.\n- **Reduz alucinações**, porque a resposta se apoia em texto fornecido.\n- Permite **citar a fonte** de cada afirmação.\n- **Atualizar** o conhecimento é só **atualizar a base**: não é preciso **treinar** o modelo de novo.',
      check: {
        kind: 'multi',
        id: 'pq-c',
        prompt: 'Quais são vantagens do RAG? Marque todas.',
        options: [
          { text: 'Usar documentos atualizados ou privados', correct: true, why: 'Isso.' },
          { text: 'Citar a fonte', correct: true, why: 'Isso.' },
          { text: 'Atualizar sem retreinar', correct: true, why: 'Isso.' },
          { text: 'Eliminar completamente as respostas erradas', correct: false, why: 'Reduz, mas não elimina.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **parecerista** que trabalha **com os autos abertos**: ele fala do caso **atual**, pode **citar a folha** de onde tirou cada fato e, se chegar documento novo, basta juntá-lo aos autos. Mas ainda pode **interpretar mal**: por isso o RAG reduz, não zera, os erros.',
        check: {
          kind: 'choice',
          id: 'pq-r',
          prompt: '"Para atualizar o conhecimento de um sistema RAG é preciso retreinar o modelo." Isso está:',
          options: [
            { text: 'Errado: atualiza-se a base indexada', why: 'Isso.' },
            { text: 'Certo', why: 'No RAG, o conhecimento novo entra pela base.' },
            { text: 'Certo uma vez por semana', why: 'Não há retreino: atualiza-se a base.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'indexacao',
      part: 'Indexação',
      title: 'Antes: coletar, dividir, vetorizar, guardar',
      art: 'degraus',
      goal: 'Ordenar as etapas da fase de indexação.',
      explain:
        'A **fase de indexação** é feita **antes** das perguntas:\n\n1. **Coleta** dos documentos (PDFs, páginas, tabelas).\n2. **Divisão em trechos** (*chunking*): textos longos viram **pedaços menores**, às vezes com **sobreposição**.\n3. **Geração de embeddings**: cada trecho vira um **vetor**.\n4. **Armazenamento** dos vetores, com o texto e **metadados**, num **banco vetorial**.',
      check: {
        kind: 'choice',
        id: 'ix-c',
        prompt: 'A etapa em que documentos longos são divididos em partes menores antes dos embeddings se chama:',
        options: [
          { text: 'Chunking (divisão em trechos)', why: 'Isso.' },
          { text: 'Re-ranking', why: 'Re-ranking reordena candidatos na consulta.' },
          { text: 'Few-shot', why: 'Few-shot é técnica de prompt.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'É como preparar um **fichário** antes do atendimento: você junta os documentos (**coleta**), recorta em fichas de um assunto cada (**chunking**), dá a cada ficha uma "etiqueta de sentido" (**embedding**) e guarda no móvel certo (**banco vetorial**). Tudo isso antes do primeiro cidadão chegar.',
        check: {
          kind: 'order',
          id: 'ix-r',
          prompt: 'Ordene a fase de indexação.',
          items: ['Coletar os documentos', 'Dividir em trechos', 'Gerar os embeddings', 'Guardar no banco vetorial'],
          why: 'Coleta, chunking, embeddings, armazenamento.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'consulta',
      part: 'Consulta',
      title: 'Na hora: buscar, aumentar, gerar',
      art: 'trilha',
      goal: 'Ordenar as etapas da fase de consulta.',
      explain:
        'A **fase de consulta** acontece **a cada pergunta**:\n\n5. A **pergunta** também vira **embedding**.\n6. **Busca por similaridade**: o banco devolve os **k trechos mais próximos** (*top-k*).\n7. **Aumento**: os trechos recuperados são **inseridos no prompt**, junto da pergunta.\n8. **Geração**: o LLM responde usando esses trechos, de preferência **citando-os**.',
      check: {
        kind: 'order',
        id: 'cs-c',
        prompt: 'Ordene a fase de consulta.',
        items: ['Converter a pergunta em embedding', 'Buscar os k trechos mais próximos', 'Inserir os trechos no prompt', 'Gerar a resposta com citações'],
        why: 'Embedding da pergunta, busca, aumento, geração.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Agora o cidadão chegou: você entende o **sentido** da pergunta (embedding), vai ao fichário e puxa as **cinco fichas mais parecidas** (top-k), põe as fichas **na mesa junto com a pergunta** (aumento) e responde **citando** as fichas (geração).',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'O que significa "top-k" na busca?',
          options: [
            { text: 'Os k trechos mais próximos da pergunta', why: 'Isso.' },
            { text: 'Os k documentos mais antigos', why: 'É pela proximidade, não pela data.' },
            { text: 'A temperatura k', why: 'Não tem relação com temperatura.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'desenho',
      part: 'Consulta',
      title: 'O fluxo num desenho',
      art: 'dados',
      goal: 'Ler o diagrama do fluxo do RAG.',
      explain:
        '```\nPergunta\n   ▼ embedding\nBusca no banco vetorial (top-k)\n   ▼ trechos relevantes\nPrompt = instruções + trechos\n         + pergunta\n   ▼\nLLM gera a resposta com citações\n```\n\nRepare: o **LLM só entra no fim**. Tudo antes dele é **busca**. Se a busca trouxer o trecho errado, o modelo responde mal.',
      check: {
        kind: 'choice',
        id: 'dz-c',
        prompt: 'No diagrama, em que momento o LLM entra?',
        options: [
          { text: 'No fim, depois que os trechos foram recuperados', why: 'Isso.' },
          { text: 'No começo, antes da busca', why: 'Primeiro vem a busca; o LLM gera no fim.' },
          { text: 'Ele não entra', why: 'Ele gera a resposta no fim.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia o desenho de cima para baixo, como uma **linha de produção**. As primeiras estações (embedding, busca) **separam a matéria-prima**; só a última (o LLM) **monta o produto**. Matéria-prima errada, produto errado.',
        check: {
          kind: 'choice',
          id: 'dz-r',
          prompt: 'O que compõe o prompt no RAG?',
          options: [
            { text: 'Instruções, trechos recuperados e a pergunta', why: 'Isso.' },
            { text: 'Só a pergunta', why: 'Os trechos recuperados são o "aumento".' },
            { text: 'Só os trechos', why: 'Instruções e pergunta também entram.' },
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
      prompt: 'Indexação (antes) ou consulta (a cada pergunta)?',
      categories: ['Indexação', 'Consulta'],
      items: [
        { text: 'Dividir os documentos em trechos', cat: 0, why: 'Feito antes.' },
        { text: 'Buscar os trechos mais próximos da pergunta', cat: 1, why: 'A cada pergunta.' },
        { text: 'Guardar os vetores no banco', cat: 0, why: 'Feito antes.' },
        { text: 'Inserir os trechos no prompt', cat: 1, why: 'A cada pergunta.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['RAG reduz alucinações', 'RAG permite citar a fonte', 'RAG elimina completamente respostas erradas'],
      bug: 2,
      why: 'Reduz, mas a recuperação pode falhar e o trecho pode ser mal interpretado.',
      fixed: 'RAG reduz, mas não elimina, respostas erradas',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: uma resolução nova foi publicada hoje. O que fazer para o assistente RAG já considerá-la?',
      options: [
        { text: 'Indexar a nova resolução na base', why: 'Isso: dividir, vetorizar e guardar.' },
        { text: 'Retreinar o LLM', why: 'Não é necessário no RAG.' },
        { text: 'Nada: ele já sabe', why: 'Ele só sabe o que estiver na base ou no treino.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.012' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.014' },
  ],
  summary: [
    'Por que RAG: documentos atualizados ou privados, menos alucinação, citação da fonte, atualizar sem retreinar.',
    'Indexação (antes): coleta, chunking (com ou sem sobreposição), embeddings, banco vetorial com metadados.',
    'Consulta (a cada pergunta): embedding da pergunta, busca top-k, aumento do prompt, geração com citações.',
    'O LLM entra no fim: se a busca falha, a resposta falha.',
  ],
};

export const iaRagMelhorias: MicroLesson = {
  ...S,
  id: 'ia.rag.3',
  series: { id: 'ia.rag', order: 3 },
  title: 'Falhas, melhorias e RAG ou ajuste fino',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O assistente RAG erra justamente quando a pergunta cita "RA nº 24/2024". Por que números exatos seriam difíceis para a busca pelo sentido?',
    options: [
      { text: 'Porque a busca semântica capta o sentido, não o número exato', why: 'Isso. Esta aula mostra essa e outras falhas, e como melhorar.' },
      { text: 'Porque o modelo não sabe ler números', why: 'Ele lê; a dificuldade está na busca semântica com termos exatos.' },
      { text: 'Porque a resolução não existe', why: 'O problema descrito é de recuperação.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'falhas',
      part: 'Falhas',
      title: 'Onde o RAG falha',
      art: 'revisao',
      goal: 'Reconhecer as causas comuns de falha do RAG.',
      explain:
        'A qualidade da resposta **depende da qualidade da recuperação**. Se o trecho certo **não vier**, o modelo responde mal ou **alucina**.\n\nCausas comuns:\n\n- trechos **grandes ou pequenos demais**;\n- documentos **mal convertidos** (PDF virou texto embaralhado);\n- perguntas com **termos exatos** (siglas, **números de lei**) que a busca semântica **não capta bem**.',
      check: {
        kind: 'choice',
        id: 'fa-c',
        prompt: 'Qual é uma causa comum de falha no RAG?',
        options: [
          { text: 'Perguntas com números exatos que a busca semântica não capta bem', why: 'Isso.' },
          { text: 'Temperatura baixa demais', why: 'A falha típica está na recuperação.' },
          { text: 'Usar delimitadores no prompt', why: 'Delimitadores ajudam; não são causa de falha.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A busca pelo **sentido** é ótima para "regras de diárias de viagem", mas "**RA nº 24/2024**" e "RA nº 42/2024" têm **sentido parecidíssimo** para ela. É como pedir a alguém que lembra de **assuntos** para achar um **número de protocolo**: ele traz algo parecido, não o exato.',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'Se a recuperação traz o trecho errado, o que tende a acontecer?',
          options: [
            { text: 'O modelo responde mal ou alucina', why: 'Isso.' },
            { text: 'O modelo corrige sozinho a busca', why: 'Ele só vê o que foi recuperado.' },
            { text: 'Nada muda', why: 'A resposta depende da recuperação.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hibrida',
      part: 'Melhorias',
      title: 'Busca híbrida',
      art: 'balanca',
      goal: 'Saber o que é a busca híbrida e quando usar.',
      explain:
        'A **busca híbrida** combina:\n\n- **busca por palavras-chave** (como o **BM25**), boa para **termos exatos**, siglas e números;\n- **busca vetorial**, boa para o **sentido**, mesmo com palavras diferentes.\n\nPara a pergunta com "**RA nº 24/2024**", a parte por palavras-chave acha o número exato, e a parte vetorial traz o assunto.',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'Perguntas com números exatos de resoluções recuperam trechos errados. Uma melhoria adequada é:',
        options: [
          { text: 'Busca híbrida, somando palavras-chave (BM25) à vetorial', why: 'Isso.' },
          { text: 'Aumentar a temperatura', why: 'Não melhora a recuperação.' },
          { text: 'Remover os números das perguntas', why: 'Perderia a informação mais importante.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Use **dois detetives**: um procura **pela letra exata** (BM25: "24/2024"), o outro **pelo assunto** (vetorial: "diárias"). Juntos, acham o documento que o primeiro sozinho ou o segundo sozinho poderiam perder.',
        check: {
          kind: 'choice',
          id: 'hi-r',
          prompt: 'A busca vetorial é especialmente boa para:',
          options: [
            { text: 'Encontrar pelo sentido, mesmo com palavras diferentes', why: 'Isso.' },
            { text: 'Achar números exatos de protocolo', why: 'Para termos exatos, a palavra-chave ajuda mais.' },
            { text: 'Gerar a resposta final', why: 'Quem gera é o LLM.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'rerank',
      part: 'Melhorias',
      title: 'Reordenação e metadados',
      art: 'degraus',
      goal: 'Conhecer re-ranking e filtros por metadados.',
      explain:
        '- **Reordenação** (*re-ranking*): um **segundo modelo** reordena os candidatos **antes** de enviá-los ao LLM, pondo no topo os realmente relevantes.\n- **Metadados e filtros**: restringir a busca por **data**, **órgão**, **tipo de documento**. "Só resoluções de 2024", "só do Plenário".\n\nAs duas reduzem o ruído que chega ao modelo.',
      check: {
        kind: 'sort',
        id: 'rr-c',
        prompt: 'Que melhoria é cada ação?',
        categories: ['Re-ranking', 'Filtro por metadados'],
        items: [
          { text: 'Um segundo modelo reordena os 20 candidatos', cat: 0, why: 'Reordenar antes do LLM.' },
          { text: 'Buscar só documentos de 2024', cat: 1, why: 'Filtro por data.' },
          { text: 'Buscar só pareceres do setor de obras', cat: 1, why: 'Filtro por tipo e órgão.' },
        ],
      },
      recovery: {
        explain: 'Pense numa **seleção de currículos**: primeiro uma triagem rápida traz 20 nomes (busca); depois um especialista **reordena** os 20 com mais calma (re-ranking). E antes de tudo, filtra-se "só quem mora em Goiás" (metadados).',
        check: {
          kind: 'choice',
          id: 'rr-r',
          prompt: 'Restringir a busca a documentos de um órgão específico usa:',
          options: [
            { text: 'Metadados e filtros', why: 'Isso.' },
            { text: 'Temperatura', why: 'A temperatura não filtra documentos.' },
            { text: 'Chunking', why: 'Chunking divide os documentos.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ajuste',
      part: 'RAG ou ajuste fino',
      title: 'Conhecimento ou comportamento',
      art: 'interruptor',
      goal: 'Escolher entre RAG e ajuste fino conforme o critério.',
      explain:
        '- **Conhecimento que muda com frequência**: **RAG** (basta atualizar a base). Ajuste fino exigiria novo treino.\n- **Citar a fonte**: natural no **RAG**; difícil no ajuste fino.\n- **Ensinar estilo, formato ou comportamento**: **ajuste fino** é adequado; RAG é limitado.\n- **Custo de atualização**: **baixo** no RAG; **alto** no ajuste fino.\n\nOs dois podem ser **combinados**. Em prova: **conhecimento atualizado e rastreável → RAG**; **comportamento ou estilo → ajuste fino**.',
      check: {
        kind: 'choice',
        id: 'aj-c',
        prompt: 'Um tribunal quer um assistente sobre resoluções internas, alteradas com frequência, sempre indicando a fonte. A abordagem mais adequada é:',
        options: [
          { text: 'RAG sobre a base de resoluções', why: 'Isso: conhecimento atualizado e com fonte.' },
          { text: 'Ajuste fino a cada alteração', why: 'Caro e sem citação natural.' },
          { text: 'Só aumentar a janela de contexto', why: 'Não organiza a busca nem a atualização.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na diferença entre dar a alguém um **fichário atualizado** (RAG) e mandá-lo a um **curso** (ajuste fino). Para saber a **norma vigente**, o fichário basta e é fácil de atualizar. Para aprender a **escrever no estilo da casa**, o curso funciona melhor.',
        check: {
          kind: 'choice',
          id: 'aj-r',
          prompt: 'Para ensinar o modelo a escrever sempre no estilo de ementa do Tribunal, o mais adequado é:',
          options: [
            { text: 'Ajuste fino', why: 'Isso: muda comportamento e estilo.' },
            { text: 'Só RAG', why: 'RAG traz conhecimento; estilo é melhor com ajuste fino.' },
            { text: 'Aumentar a temperatura', why: 'Mais variação não fixa estilo.' },
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
      prompt: 'RAG ou ajuste fino?',
      categories: ['RAG', 'Ajuste fino'],
      items: [
        { text: 'Responder sobre normas que mudam todo mês, com fonte', cat: 0, why: 'Atualizável e rastreável.' },
        { text: 'Fazer o modelo responder sempre em tom formal da casa', cat: 1, why: 'Estilo.' },
        { text: 'Baixo custo para atualizar o conhecimento', cat: 0, why: 'Basta a base.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Busca híbrida: palavras-chave + vetorial', 'Re-ranking: segundo modelo reordena', 'RAG não depende da qualidade da recuperação'],
      bug: 2,
      why: 'A qualidade da resposta depende diretamente da recuperação.',
      fixed: 'RAG depende da qualidade da recuperação',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Considere: I. RAG reduz alucinações. II. RAG elimina toda resposta errada. III. RAG permite atualizar sem retreinar. Estão corretas:',
      options: [
        { text: 'I e III', why: 'Isso: II exagera.' },
        { text: 'I, II e III', why: 'II é falsa: reduz, não elimina.' },
        { text: 'Só II', why: 'II é justamente a falsa.' },
      ],
      answer: 0,
      errorKind: 'leitura',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.013' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.015' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.020' },
  ],
  summary: [
    'O RAG falha quando a recuperação falha: trechos de tamanho ruim, documentos mal convertidos, termos exatos (siglas, números).',
    'Busca híbrida (BM25 + vetorial) ajuda com termos exatos; re-ranking reordena; metadados filtram por data, órgão, tipo.',
    'Conhecimento atualizado e com fonte → RAG. Estilo e comportamento → ajuste fino. Podem ser combinados.',
  ],
};
