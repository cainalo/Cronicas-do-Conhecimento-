// Série "Engenharia de contexto e memória" (cap.ia.01, trecho contexto), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta das janelas pequenas de 2020 às enormes de 2023; as
// seguintes ensinam o que ocupa a janela e os problemas típicos, depois técnicas, memória e a diferença
// para a engenharia de prompts, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (03-contexto.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.01', sectionId: 'contexto' } as const;

export const iaCtxHistoria: MicroLesson = {
  ...S,
  id: 'ia.contexto.1',
  series: { id: 'ia.contexto', order: 1 },
  title: 'Das janelas pequenas às enormes',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Sua mesa de trabalho é pequena e você precisa analisar um processo de mil páginas. Coloca tudo na mesa de uma vez?',
    options: [
      { text: 'Não: escolho as páginas que importam agora', why: 'Isso. Com modelos de IA é igual, e esta aula conta como isso mudou com o tempo.' },
      { text: 'Sim: empilho tudo', why: 'Não caberia, e você se perderia. Esta aula mostra o equivalente nos modelos.' },
      { text: 'Desisto do processo', why: 'Dá para trabalhar escolhendo bem o que fica na mesa.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'pequenas',
      part: 'A história',
      title: '2020: cerca de 2 mil tokens',
      art: 'cartao',
      goal: 'Saber que as primeiras janelas de contexto eram pequenas.',
      explain:
        'O **GPT-3**, de **2020**, considerava cerca de **2 mil tokens** de uma vez: **algumas páginas** de texto.\n\nTudo tinha de caber aí: as **instruções**, a **conversa**, os **documentos** e a **resposta**.\n\nEra preciso escolher com muito cuidado **o que entrava**. Um processo inteiro? Impossível.',
      check: {
        kind: 'choice',
        id: 'pq-c',
        prompt: 'Quantos tokens o GPT-3, de 2020, considerava de uma vez, aproximadamente?',
        options: [
          { text: 'Cerca de 2 mil', why: 'Isso: algumas páginas.' },
          { text: 'Cerca de 2 bilhões', why: 'Muito menos: cerca de 2 mil.' },
          { text: 'Ilimitados', why: 'A janela sempre tem limite.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **prancheta** com espaço para poucas folhas. Instruções, conversa e resposta disputavam o mesmo espaço. Em 2020, a "prancheta" dos modelos tinha cerca de **2 mil tokens**, o que obrigava a escolher bem.',
        check: {
          kind: 'choice',
          id: 'pq-r',
          prompt: 'O que precisava caber na janela de contexto?',
          options: [
            { text: 'Instruções, conversa, documentos e a própria resposta', why: 'Isso.' },
            { text: 'Só a pergunta', why: 'Tudo o que o modelo vê e escreve disputa o espaço.' },
            { text: 'Só a resposta', why: 'Instruções e documentos também.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'enormes',
      part: 'A história',
      title: '2023: janelas enormes e o meio esquecido',
      art: 'trilha',
      goal: 'Saber o que o estudo Lost in the Middle mostrou.',
      explain:
        'Em **2023**, modelos passaram a aceitar **100 mil tokens** ou mais: livros inteiros.\n\nSurgiu a tentação de **colocar tudo**. Mas o estudo ***Lost in the Middle*** (2023) mostrou que os modelos **aproveitam melhor o início e o fim** de contextos longos do que **o meio**.\n\nJanela maior **não** é, automaticamente, resposta melhor.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'O que o estudo Lost in the Middle mostrou?',
        options: [
          { text: 'Que o meio de contextos longos é pior aproveitado', why: 'Isso.' },
          { text: 'Que janelas maiores sempre melhoram a resposta', why: 'Mostrou justamente que não é bem assim.' },
          { text: 'Que os modelos não leem o início', why: 'O início e o fim são os mais aproveitados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Lembre de uma **palestra longa**: você guarda bem o começo e o fim, e o meio fica nebuloso. Os modelos têm um efeito parecido. Por isso, colocar a informação importante **no meio** de um contexto enorme é arriscado.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: '"Uma janela de contexto maior sempre melhora a resposta." Isso está:',
          options: [
            { text: 'Errado: contexto irrelevante atrapalha e o meio é pior aproveitado', why: 'Isso.' },
            { text: 'Certo', why: 'Mais contexto pode trazer ruído e perder informação no meio.' },
            { text: 'Certo se for em inglês', why: 'O efeito não depende do idioma.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'memoria',
      part: 'A história',
      title: 'Hoje: memória construída pela aplicação',
      art: 'livro',
      goal: 'Entender que o modelo não lembra nada sozinho entre chamadas.',
      explain:
        'O modelo, sozinho, **não lembra de nada entre chamadas**: cada pedido começa do zero.\n\nPor isso, os **agentes de programação** de hoje constroem a memória **por fora**:\n\n- **arquivos de instruções** lidos a cada sessão;\n- **compactação** do histórico;\n- **subagentes** com contexto próprio.\n\nEscolher, organizar e manter o que entra na janela virou uma disciplina: a **engenharia de contexto**.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'Entre uma chamada e outra, o modelo:',
        options: [
          { text: 'Não guarda nada sozinho; a memória é construída pela aplicação', why: 'Isso.' },
          { text: 'Lembra tudo para sempre', why: 'Ele não guarda nada entre chamadas.' },
          { text: 'Guarda só os erros', why: 'Não guarda nada por conta própria.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um consultor que **esquece tudo** ao sair da sala. Para ele continuar o trabalho no dia seguinte, você deixa um **caderno de anotações** sobre a mesa. A aplicação faz isso com o modelo: escreve e relê as anotações a cada sessão.',
        check: {
          kind: 'order',
          id: 'me-r',
          prompt: 'Ordene a evolução.',
          items: ['Janelas de cerca de 2 mil tokens (2020)', 'Janelas de 100 mil tokens e Lost in the Middle (2023)', 'Memória construída pela aplicação (hoje)'],
          why: 'De escolher por falta de espaço a escolher por qualidade.',
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
      lines: ['2020: janelas de cerca de 2 mil tokens', '2023: Lost in the Middle', 'O modelo lembra sozinho de todas as conversas'],
      bug: 2,
      why: 'O modelo não guarda nada entre chamadas; a memória é da aplicação.',
      fixed: 'A memória é construída pela aplicação',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Verdadeiro ou falso sobre o contexto?',
      categories: ['Correto', 'Incorreto'],
      items: [
        { text: 'O meio de contextos longos é pior aproveitado', cat: 0, why: 'Lost in the Middle.' },
        { text: 'Janela maior sempre ajuda', cat: 1, why: 'Ruído e meio esquecido.' },
        { text: 'A resposta também ocupa a janela', cat: 0, why: 'Tudo disputa o espaço.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: para um agente lembrar das convenções do projeto em toda sessão, o que se faz?',
      options: [
        { text: 'Deixar um arquivo de instruções lido no início de cada sessão', why: 'Isso.' },
        { text: 'Esperar que o modelo se lembre sozinho', why: 'Ele não guarda nada entre chamadas.' },
        { text: 'Aumentar a temperatura', why: 'A temperatura não cria memória.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    '2020: janelas de cerca de 2 mil tokens obrigavam a escolher com cuidado.',
    '2023: 100 mil tokens ou mais; Lost in the Middle mostra que o meio é pior aproveitado.',
    'O modelo não lembra nada entre chamadas: a memória é construída pela aplicação (arquivos de instruções, compactação, subagentes).',
  ],
};

export const iaCtxJanela: MicroLesson = {
  ...S,
  id: 'ia.contexto.2',
  series: { id: 'ia.contexto', order: 2 },
  title: 'O que ocupa a janela e o que dá errado',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num assistente de programação, além da sua pergunta, o que mais o modelo enxerga?',
    options: [
      { text: 'Regras do projeto, histórico, arquivos lidos, resultados de ferramentas', why: 'Isso. Esta aula lista tudo o que ocupa a janela e o que pode dar errado.' },
      { text: 'Só a pergunta', why: 'Ele enxerga muito mais, e tudo disputa espaço.' },
      { text: 'O computador inteiro', why: 'Só o que é colocado na janela de contexto.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ocupa',
      part: 'A janela',
      title: 'Tudo disputa o mesmo espaço',
      art: 'dados',
      goal: 'Listar o que ocupa a janela num assistente de programação.',
      explain:
        'Se o prompt é o **pedido**, o **contexto** é **tudo o que o modelo enxerga** ao responder. Num assistente de programação, a janela costuma conter:\n\n1. o **prompt de sistema** e as **regras do projeto**;\n2. o **histórico** da conversa;\n3. o conteúdo de **arquivos lidos**;\n4. os **resultados de ferramentas** (comandos, buscas, testes);\n5. **documentos** recuperados por **RAG**;\n6. a **resposta** em construção.\n\nContexto demais **custa caro**, **atrasa** e pode **piorar** a qualidade.',
      check: {
        kind: 'multi',
        id: 'oc-c',
        prompt: 'O que ocupa a janela de contexto? Marque todos.',
        options: [
          { text: 'O histórico da conversa', correct: true, why: 'Isso.' },
          { text: 'A saída de comandos e testes', correct: true, why: 'Isso: resultados de ferramentas.' },
          { text: 'A resposta em construção', correct: true, why: 'Isso.' },
          { text: 'Os arquivos que o modelo nunca leu', correct: false, why: 'O que não foi lido não está na janela.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à **mesa de trabalho**: cada papel que você põe nela (regras, conversa, arquivos, saída de testes) ocupa espaço. E a **folha da resposta** também. Por isso, encher a mesa de papel irrelevante deixa pouco espaço e confunde.',
        check: {
          kind: 'choice',
          id: 'oc-r',
          prompt: 'Qual o efeito de colocar contexto demais?',
          options: [
            { text: 'Custa caro, atrasa e pode piorar a qualidade', why: 'Isso.' },
            { text: 'Sempre melhora a resposta', why: 'Contexto demais pode atrapalhar.' },
            { text: 'Não tem efeito', why: 'Tem custo, demora e risco de ruído.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'estouro',
      part: 'Problemas',
      title: 'Estouro e informação perdida no meio',
      art: 'degraus',
      goal: 'Reconhecer o estouro da janela e a perda de informação no meio.',
      explain:
        '- **Estouro da janela**: a conversa longa **ultrapassa o limite** e **partes antigas precisam sair**.\n- **Informação perdida no meio**: em contextos longos, o modelo aproveita melhor o **início e o fim**; o que está **no meio** é menos aproveitado (*Lost in the Middle*, 2023).\n\nNuma sessão muito longa, uma decisão tomada lá no começo pode simplesmente sumir da janela.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Numa sessão muito longa, o modelo "esqueceu" uma decisão tomada no início. Qual o problema mais provável?',
        options: [
          { text: 'Estouro da janela: partes antigas saíram', why: 'Isso.' },
          { text: 'Temperatura alta', why: 'A temperatura afeta a variedade, não a memória.' },
          { text: 'Falta de internet', why: 'O problema é o limite da janela.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como uma **fita de gravação** que, cheia, começa a gravar **por cima do começo**. Se a decisão estava no começo, ela foi apagada. E mesmo antes de encher, o que está no **meio** de uma fita longa é o que menos se lembra.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Onde é mais seguro pôr a instrução mais importante num contexto longo?',
          options: [
            { text: 'No início ou no fim', why: 'Isso: são as posições mais aproveitadas.' },
            { text: 'Bem no meio', why: 'O meio é o menos aproveitado.' },
            { text: 'Tanto faz', why: 'A posição faz diferença em contextos longos.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'contaminado',
      part: 'Problemas',
      title: 'Contexto contaminado e ruído',
      art: 'revisao',
      goal: 'Reconhecer contexto contaminado e ruído.',
      explain:
        '- **Contexto contaminado**: um **erro** ou uma **informação velha** no histórico **continua influenciando** as respostas seguintes. Se lá atrás o modelo errou o nome de uma função, ele tende a repetir o erro.\n- **Ruído**: **arquivos irrelevantes** **distraem** o modelo do que importa.\n\nÀs vezes, a melhor saída é **começar uma conversa nova**, levando só o que vale.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'O modelo repete um erro antigo da conversa mesmo depois de corrigido uma vez. Isso é:',
        options: [
          { text: 'Contexto contaminado', why: 'Isso: o erro continua no histórico.' },
          { text: 'Injeção de prompt', why: 'Injeção é texto malicioso; aqui é um erro antigo.' },
          { text: 'Embedding', why: 'Embedding é representação vetorial.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **quadro branco** com uma conta errada que ninguém apagou: todos que olham continuam usando aquele número. O histórico funciona assim. Apagar (começar de novo) ou **corrigir explicitamente** ajuda; deixar ali, não.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Carregar o repositório inteiro, com milhares de arquivos sem relação com a tarefa, causa principalmente:',
          options: [
            { text: 'Ruído que distrai o modelo', why: 'Isso.' },
            { text: 'Respostas sempre melhores', why: 'Arquivos irrelevantes distraem.' },
            { text: 'Mais memória de longo prazo', why: 'É só mais ruído na janela.' },
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
      prompt: 'Que problema é cada situação?',
      categories: ['Estouro da janela', 'Contexto contaminado', 'Ruído'],
      items: [
        { text: 'A conversa passou do limite e o começo saiu', cat: 0, why: 'Limite atingido.' },
        { text: 'Uma informação errada antiga continua influenciando', cat: 1, why: 'Histórico com erro.' },
        { text: 'Dezenas de arquivos sem relação foram lidos', cat: 2, why: 'Distração.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Resultados de ferramentas ocupam a janela', 'O meio de contextos longos é pior aproveitado', 'A resposta não ocupa espaço na janela'],
      bug: 2,
      why: 'A resposta em construção também ocupa a janela.',
      fixed: 'A resposta também ocupa a janela',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: depois de três horas de sessão, o agente mistura decisões velhas e novas. Qual atitude ajuda?',
      options: [
        { text: 'Começar nova sessão levando um resumo das decisões válidas', why: 'Isso: limpa o contexto contaminado.' },
        { text: 'Colar mais arquivos para ele se lembrar', why: 'Aumenta o ruído.' },
        { text: 'Continuar sem mudar nada', why: 'O problema tende a piorar.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Na janela: sistema e regras, histórico, arquivos lidos, resultados de ferramentas, documentos do RAG e a resposta. Tudo disputa espaço.',
    'Estouro: partes antigas saem. Meio perdido: início e fim são mais aproveitados.',
    'Contaminado: erro antigo segue influenciando. Ruído: irrelevante distrai. Às vezes, recomeçar com um resumo.',
  ],
};

export const iaCtxTecnicas: MicroLesson = {
  ...S,
  id: 'ia.contexto.3',
  series: { id: 'ia.contexto', order: 3 },
  title: 'Técnicas, memória e a diferença para prompts',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A sessão com o agente está quase no limite da janela. Você quer liberar espaço sem perder as decisões tomadas. O que faz?',
    options: [
      { text: 'Resume o histórico, preservando decisões e pendências', why: 'Isso: é a compactação. Esta aula mostra essa e outras técnicas.' },
      { text: 'Apaga tudo e recomeça sem anotar nada', why: 'Perderia as decisões.' },
      { text: 'Cola o histórico duas vezes', why: 'Ocuparia ainda mais espaço.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'selecao',
      part: 'Técnicas',
      title: 'Seleção e recuperação sob demanda',
      art: 'alvo',
      goal: 'Usar seleção e recuperação sob demanda.',
      explain:
        '- **Seleção**: incluir **só o relevante** para a tarefa atual: **os arquivos certos**, não o repositório inteiro.\n- **Recuperação sob demanda**: **buscar** a informação **quando for necessária** (RAG, ferramentas de busca), em vez de carregar tudo antes.\n\nAs duas evitam ruído e guardam espaço para o que importa.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Para corrigir um erro num único módulo, o mais adequado é:',
        options: [
          { text: 'Incluir só os arquivos relevantes para esse módulo', why: 'Isso: seleção.' },
          { text: 'Carregar o repositório inteiro', why: 'Traria ruído e custo.' },
          { text: 'Não incluir nenhum arquivo', why: 'Sem os arquivos certos, o modelo adivinha.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Volte à mesa: para um parecer sobre **um contrato**, você puxa do arquivo **só a pasta dele** (seleção). Se surgir dúvida sobre uma lei, você **vai buscar** naquela hora (recuperação sob demanda), em vez de trazer a biblioteca toda logo de manhã.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Buscar a informação só quando ela for necessária é:',
          options: [
            { text: 'Recuperação sob demanda', why: 'Isso.' },
            { text: 'Compactação', why: 'Compactar é resumir o histórico.' },
            { text: 'Isolamento', why: 'Isolar é delegar a outro agente.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'compactar',
      part: 'Técnicas',
      title: 'Compactação, isolamento e estrutura',
      art: 'degraus',
      goal: 'Usar compactação, isolamento e estrutura.',
      explain:
        '- **Compactação**: **resumir o histórico antigo**, preservando **decisões e pendências**.\n- **Isolamento**: **delegar** uma subtarefa a **outro agente** com contexto próprio e receber **só o resultado**.\n- **Estrutura**: pôr instruções importantes em **posição de destaque** e separar seções com **marcações claras**.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Perto do limite da janela, a técnica que libera espaço preservando decisões e pendências é:',
        options: [
          { text: 'Compactação', why: 'Isso.' },
          { text: 'Aumentar a temperatura', why: 'A temperatura não libera espaço.' },
          { text: 'Few-shot', why: 'Few-shot acrescenta exemplos, ocupando mais espaço.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Compactar é como transformar **trinta páginas de ata** num **resumo de uma página** com o que foi decidido e o que falta. Isolar é **mandar um colega** pesquisar algo e trazer só a conclusão, sem lotar sua mesa com o caminho todo.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Delegar uma pesquisa a um subagente e receber só o resultado é:',
          options: [
            { text: 'Isolamento', why: 'Isso.' },
            { text: 'Seleção', why: 'Seleção é escolher o que entra na janela.' },
            { text: 'Estrutura', why: 'Estrutura é organizar e destacar.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'memoria',
      part: 'Memória',
      title: 'Curto e longo prazo',
      art: 'livro',
      goal: 'Distinguir memória de curto e de longo prazo.',
      explain:
        'Como o modelo **não guarda nada** entre chamadas, a **memória** é uma construção da **aplicação**:\n\n- **Curto prazo**: o próprio conteúdo da **janela** durante a sessão.\n- **Longo prazo**: informações **gravadas fora do modelo** (arquivos, banco de dados, **banco vetorial**) e **trazidas de volta** ao contexto quando necessário.',
      check: {
        kind: 'sort',
        id: 'me-c',
        prompt: 'Curto ou longo prazo?',
        categories: ['Curto prazo', 'Longo prazo'],
        items: [
          { text: 'O histórico da sessão atual na janela', cat: 0, why: 'Dentro da janela.' },
          { text: 'Notas gravadas num banco vetorial e recuperadas depois', cat: 1, why: 'Fora do modelo.' },
          { text: 'Arquivo de instruções salvo no repositório', cat: 1, why: 'Fora do modelo, relido a cada sessão.' },
        ],
      },
      recovery: {
        explain: '**Curto prazo** é o que está **na mesa agora**. **Longo prazo** é o que está **no arquivo**, guardado, e volta à mesa quando alguém vai buscar. O modelo só enxerga a mesa; o arquivo é responsabilidade da aplicação.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Onde fica a memória de longo prazo?',
          options: [
            { text: 'Fora do modelo: arquivos, banco de dados, banco vetorial', why: 'Isso.' },
            { text: 'Nos pesos do modelo, atualizados a cada conversa', why: 'Os pesos não mudam a cada conversa.' },
            { text: 'Em lugar nenhum', why: 'Ela é gravada fora e trazida de volta.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'instrucoes',
      part: 'Memória',
      title: 'Arquivos de instruções do projeto',
      art: 'cartao',
      goal: 'Saber a função dos arquivos de instruções lidos a cada sessão.',
      explain:
        'Nos agentes de programação, um exemplo prático de memória são os **arquivos de instruções do projeto**, lidos **no início de cada sessão**.\n\nNo **Claude Code**, esse papel é do arquivo **CLAUDE.md**, que registra **convenções**, **comandos** e **decisões** do repositório.\n\nÉ a mesma estratégia usada neste aplicativo para que uma nova sessão **retome o trabalho** sem depender da conversa anterior.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Arquivos como o CLAUDE.md funcionam principalmente como:',
        options: [
          { text: 'Memória de longo prazo lida a cada sessão', why: 'Isso.' },
          { text: 'Ataque de injeção de prompt', why: 'São instruções legítimas do próprio projeto.' },
          { text: 'Ajuste fino dos pesos do modelo', why: 'Não alteram pesos: entram no contexto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É o **caderno de passagem de plantão**: quem chega lê as anotações de quem saiu e continua de onde parou. O agente "chega" a cada sessão sem lembrar de nada; o CLAUDE.md é o caderno que ele lê primeiro.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'O que costuma estar registrado num arquivo como o CLAUDE.md?',
          options: [
            { text: 'Convenções, comandos e decisões do repositório', why: 'Isso.' },
            { text: 'As senhas dos usuários', why: 'Senhas nunca devem ficar em arquivos do repositório.' },
            { text: 'Os pesos do modelo', why: 'Os pesos não ficam no repositório do projeto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'diferenca',
      part: 'Prompt × contexto',
      title: 'Como pedir ou o que ter à mão',
      art: 'balanca',
      goal: 'Distinguir engenharia de prompts de engenharia de contexto.',
      explain:
        '- **Engenharia de prompts**: pergunta central "**como pedir?**". Unidade: **a instrução**. Exemplos: few-shot, papéis, formato de saída.\n- **Engenharia de contexto**: pergunta central "**o que o modelo precisa ter à mão?**". Unidade: **tudo o que entra na janela**. Exemplos: seleção de arquivos, **RAG**, **compactação**, **memória**.\n\nO edital usa os dois termos lado a lado.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'A engenharia de contexto se distingue da de prompts por se ocupar principalmente de:',
        options: [
          { text: 'Escolher, organizar e manter o que entra na janela', why: 'Isso.' },
          { text: 'Redigir só a frase do pedido', why: 'Isso é o foco da engenharia de prompts.' },
          { text: 'Treinar o modelo do zero', why: 'Nenhuma das duas treina o modelo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Numa audiência: a **engenharia de prompts** é **formular bem a pergunta** à testemunha; a **engenharia de contexto** é **montar os autos** que estarão sobre a mesa do juiz. Uma boa pergunta com autos errados não resolve, e vice-versa.',
        check: {
          kind: 'sort',
          id: 'df-r',
          prompt: 'Prompt ou contexto?',
          categories: ['Engenharia de prompts', 'Engenharia de contexto'],
          items: [
            { text: 'Few-shot e papel', cat: 0, why: 'Como pedir.' },
            { text: 'Compactar o histórico', cat: 1, why: 'O que fica na janela.' },
            { text: 'Formato de saída em JSON', cat: 0, why: 'Como pedir.' },
            { text: 'Recuperar trechos por RAG', cat: 1, why: 'O que entra na janela.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Que técnica é cada ação?',
      categories: ['Seleção', 'Compactação', 'Isolamento'],
      items: [
        { text: 'Abrir só os três arquivos do módulo com erro', cat: 0, why: 'Só o relevante.' },
        { text: 'Resumir a conversa antiga em decisões e pendências', cat: 1, why: 'Libera espaço.' },
        { text: 'Pedir a um subagente que investigue e traga a conclusão', cat: 2, why: 'Contexto próprio.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Memória de curto prazo: a janela', 'Memória de longo prazo: fora do modelo', 'CLAUDE.md: altera os pesos do modelo'],
      bug: 2,
      why: 'O CLAUDE.md é lido no contexto a cada sessão; não altera pesos.',
      fixed: 'CLAUDE.md: memória lida a cada sessão',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o agente precisa da jurisprudência só em um ponto da tarefa. O que é mais eficiente?',
      options: [
        { text: 'Buscar a jurisprudência quando chegar nesse ponto', why: 'Isso: recuperação sob demanda.' },
        { text: 'Carregar toda a jurisprudência no início', why: 'Ocuparia a janela à toa.' },
        { text: 'Pedir que ele invente, se não souber', why: 'Isso gera alucinação.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.010' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.ia.01.011' },
  ],
  summary: [
    'Técnicas: seleção (só o relevante), recuperação sob demanda (RAG, busca), compactação (resumo com decisões), isolamento (subagente), estrutura (destaque e marcações).',
    'Memória de curto prazo: a janela. Longo prazo: fora do modelo (arquivos, banco, banco vetorial), trazida de volta.',
    'Arquivos de instruções do projeto (CLAUDE.md) são lidos a cada sessão: convenções, comandos, decisões.',
    'Prompts: como pedir (a instrução). Contexto: o que o modelo precisa ter à mão (tudo na janela).',
  ],
};
