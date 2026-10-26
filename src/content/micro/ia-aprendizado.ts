// Série "Fundamentos e tipos de aprendizado" (cap.ia.03, trecho aprendizado), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta de Turing ao AlphaGo; as seguintes ensinam IA,
// aprendizado supervisionado e não supervisionado, depois reforço, overfitting e aplicações, uma ideia
// por etapa. Fatos conferidos com o texto do capítulo (01-aprendizado.md). Revisão editorial humana:
// pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.ia.03', sectionId: 'aprendizado' } as const;

export const iaAprHistoria: MicroLesson = {
  ...S,
  id: 'ia.aprendizado.1',
  series: { id: 'ia.aprendizado', order: 1 },
  title: 'De Turing ao AlphaGo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um filtro de spam aprende sozinho, com os e-mails que você marca, quais mensagens são lixo. Alguém escreveu cada regra à mão?',
    options: [
      { text: 'Não: ele aprendeu com exemplos', why: 'Isso: é aprendizado de máquina. Esta aula conta como se chegou a essa ideia.' },
      { text: 'Sim: um programador escreveu todas as regras', why: 'No aprendizado de máquina, as regras saem dos exemplos. Esta aula conta a história.' },
      { text: 'O filtro adivinha', why: 'Ele não adivinha: ajusta-se com os exemplos marcados.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'turing',
      part: 'A história',
      title: '1950: máquinas podem pensar?',
      art: 'pessoal',
      goal: 'Conhecer a pergunta de Turing e o teste que leva seu nome.',
      explain:
        'Em **1950**, no artigo "**Computing Machinery and Intelligence**", **Alan Turing** fez uma pergunta ousada: **máquinas podem pensar?**\n\nComo "pensar" é difícil de definir, ele propôs um **jogo da imitação**: se uma pessoa conversa por escrito com uma máquina e não consegue saber se é máquina ou gente, a máquina "passou".\n\nHoje isso é chamado de **teste de Turing**.',
      check: {
        kind: 'choice',
        id: 'tu-c',
        prompt: 'O que o teste de Turing propõe?',
        options: [
          { text: 'Ver se uma pessoa distingue a máquina de um humano numa conversa', why: 'Isso: o jogo da imitação.' },
          { text: 'Medir a velocidade do processador', why: 'O teste é sobre conversa, não velocidade.' },
          { text: 'Verificar se a máquina tem vírus', why: 'O teste é sobre parecer humano numa conversa.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine trocar **mensagens** com alguém sem ver o rosto. Se, ao fim, você não souber dizer se do outro lado havia uma **pessoa** ou um **programa**, o programa "passou" no jogo de Turing. O mesmo Turing que, na guerra, ajudou a ler a Enigma.',
        check: {
          kind: 'choice',
          id: 'tu-r',
          prompt: 'Em que ano Turing publicou "Computing Machinery and Intelligence"?',
          options: [
            { text: '1950', why: 'Isso.' },
            { text: '1990', why: 'Muito antes: 1950.' },
            { text: '1843', why: '1843 é o ano do programa de Ada Lovelace.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'dartmouth',
      part: 'A história',
      title: '1956: nasce o nome',
      art: 'livro',
      goal: 'Saber onde e quando surgiu o termo inteligência artificial.',
      explain:
        'Em **1956**, num encontro de pesquisa na Universidade de **Dartmouth**, nos Estados Unidos, **John McCarthy** e colegas adotaram o termo **inteligência artificial**.\n\nA ideia era estudar como fazer máquinas resolverem problemas que, nas pessoas, exigem inteligência.\n\nO mesmo McCarthy criaria, dois anos depois, a linguagem **Lisp**.',
      check: {
        kind: 'choice',
        id: 'da-c',
        prompt: 'Onde o termo "inteligência artificial" foi adotado, em 1956?',
        options: [
          { text: 'Num encontro na Universidade de Dartmouth', why: 'Isso.' },
          { text: 'No CERN, na Suíça', why: 'No CERN nasceu a Web, em 1989.' },
          { text: 'Em Bletchley Park', why: 'Bletchley Park é ligado à Enigma, na Segunda Guerra.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Antes de 1956 havia pesquisas soltas sobre "máquinas que pensam". No encontro de **Dartmouth**, o grupo de **McCarthy** deu um **nome** ao campo: inteligência artificial. Nome dado, nasceu uma área de pesquisa.',
        check: {
          kind: 'choice',
          id: 'da-r',
          prompt: 'John McCarthy, além do termo IA, criou:',
          options: [
            { text: 'A linguagem Lisp', why: 'Isso, em 1958.' },
            { text: 'O Unix', why: 'O Unix é de Thompson e Ritchie, de 1969.' },
            { text: 'O SQL', why: 'O SQL nasceu na IBM, com Chamberlin e Boyce.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'samuel',
      part: 'A história',
      title: '1959: a máquina que aprende',
      art: 'abaco',
      goal: 'Saber que Arthur Samuel popularizou a expressão aprendizado de máquina.',
      explain:
        'Em **1959**, **Arthur Samuel**, da **IBM**, criou um programa de **damas** que **melhorava jogando**: quanto mais partidas, melhor ficava.\n\nEle popularizou a expressão **aprendizado de máquina** (*machine learning*).\n\nA grande mudança: em vez de escrever **cada regra à mão**, o programa **ajusta** seu comportamento a partir de **exemplos** e experiência.',
      check: {
        kind: 'choice',
        id: 'sa-c',
        prompt: 'O que o programa de damas de Arthur Samuel tinha de especial?',
        options: [
          { text: 'Melhorava jogando, a partir da experiência', why: 'Isso: aprendizado de máquina.' },
          { text: 'Tinha todas as jogadas escritas à mão', why: 'A novidade era o contrário: aprender com as partidas.' },
          { text: 'Jogava sem regras', why: 'Seguia as regras do jogo e aprendia a jogar melhor.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **aprendiz de cozinheiro**: ninguém escreve para ele cada movimento; ele erra, prova e **ajusta**. O programa de Samuel fazia o mesmo com as damas: cada partida deixava o programa um pouco melhor.',
        check: {
          kind: 'choice',
          id: 'sa-r',
          prompt: 'No aprendizado de máquina, de onde saem as regras?',
          options: [
            { text: 'Dos exemplos e da experiência', why: 'Isso.' },
            { text: 'Só de um programador que as escreve uma a uma', why: 'Isso é a abordagem simbólica, por regras.' },
            { text: 'Do acaso', why: 'Saem do ajuste aos exemplos.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'especialistas',
      part: 'A história',
      title: 'Sistemas especialistas e invernos',
      art: 'cartao',
      goal: 'Conhecer a fase dos sistemas especialistas e os invernos da IA.',
      explain:
        'Nos **anos 1970 e 1980**, fizeram sucesso os **sistemas especialistas**: programas com **regras escritas à mão** por especialistas, como "**se** o valor passa de X sem licitação, **então** gere alerta".\n\nFuncionavam, mas eram **caros de manter**: cada regra nova precisava de uma pessoa.\n\nPeríodos de desânimo e corte de verbas ficaram conhecidos como **"invernos da IA"**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Como funcionava um sistema especialista?',
        options: [
          { text: 'Com regras escritas à mão por especialistas', why: 'Isso: abordagem simbólica.' },
          { text: 'Aprendendo sozinho com milhões de exemplos', why: 'Isso é o aprendizado de máquina moderno.' },
          { text: 'Sorteando respostas', why: 'Aplicava regras escritas por especialistas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **manual de procedimentos** gigante: "se acontecer A, faça B". O sistema especialista era isso, dentro do computador. Ótimo enquanto as regras cabiam no manual; difícil quando o mundo mudava e alguém precisava reescrever tudo.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'O que foram os "invernos da IA"?',
          options: [
            { text: 'Períodos de desânimo e corte de verbas para a pesquisa', why: 'Isso.' },
            { text: 'Falhas de energia nos laboratórios', why: 'É uma metáfora para a queda de interesse e verbas.' },
            { text: 'Um tipo de rede neural', why: 'É o nome dado a fases de desânimo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'alphago',
      part: 'A história',
      title: '2016: AlphaGo',
      art: 'alvo',
      goal: 'Saber que o AlphaGo usou aprendizado por reforço.',
      explain:
        'Em **2016**, o programa **AlphaGo** venceu o campeão **Lee Sedol** no **Go**, um jogo de tabuleiro com mais posições possíveis do que se consegue contar.\n\nEle combinou **redes neurais** com **aprendizado por reforço**: jogou muitíssimas partidas e foi reforçando as jogadas que levavam à vitória.\n\nEra a terceira grande forma de aprender: além de exemplos com resposta e de dados sem resposta, **aprender por recompensa**.',
      check: {
        kind: 'order',
        id: 'al-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Artigo de Turing (1950)', 'Encontro de Dartmouth (1956)', 'Programa de damas de Samuel (1959)', 'AlphaGo vence Lee Sedol (2016)'],
        why: 'Da pergunta de Turing à vitória por reforço.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como **adestrar um cachorro**: ninguém mostra a ele a resposta certa escrita; ele tenta, e quando acerta ganha um petisco (a **recompensa**). Com o tempo, repete o que deu certo. O AlphaGo fez isso com milhões de partidas.',
        check: {
          kind: 'choice',
          id: 'al-r',
          prompt: 'O AlphaGo combinou redes neurais com:',
          options: [
            { text: 'Aprendizado por reforço', why: 'Isso.' },
            { text: 'Sistemas especialistas escritos à mão', why: 'A força do AlphaGo veio de aprender jogando.' },
            { text: 'Somente sorteio', why: 'Ele aprendia com recompensas.' },
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
      lines: ['Turing (1950): jogo da imitação', 'Dartmouth (1956): nasce o termo IA', 'Samuel (1959): primeiro sistema especialista'],
      bug: 2,
      why: 'Samuel criou o programa de damas que aprendia e popularizou o "aprendizado de máquina".',
      fixed: 'Samuel (1959): programa de damas que aprende',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Regras escritas à mão ou aprendizado?',
      categories: ['Regras escritas à mão', 'Aprende com dados ou experiência'],
      items: [
        { text: 'Sistema especialista', cat: 0, why: 'Abordagem simbólica.' },
        { text: 'Programa de damas de Samuel', cat: 1, why: 'Melhorava jogando.' },
        { text: 'AlphaGo', cat: 1, why: 'Aprendizado por reforço.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um sistema do Tribunal tem uma lista fixa de regras, escritas por auditores, para gerar alertas. Ele é:',
      options: [
        { text: 'Um sistema baseado em regras (abordagem simbólica)', why: 'Isso.' },
        { text: 'Aprendizado por reforço', why: 'Não há recompensa nem aprendizado: as regras são fixas.' },
        { text: 'Um teste de Turing', why: 'O teste é sobre conversa com máquina.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Turing (1950): "máquinas podem pensar?", o jogo da imitação (teste de Turing).',
    'Dartmouth (1956): McCarthy e colegas adotam o termo inteligência artificial.',
    'Samuel (1959): programa de damas que melhora jogando; "aprendizado de máquina".',
    'Anos 1970 e 1980: sistemas especialistas por regras; invernos da IA.',
    'AlphaGo (2016): redes neurais com aprendizado por reforço.',
  ],
};

export const iaAprTipos: MicroLesson = {
  ...S,
  id: 'ia.aprendizado.2',
  series: { id: 'ia.aprendizado', order: 2 },
  title: 'IA, supervisionado e não supervisionado',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você tem 20 mil notas fiscais já marcadas como "regular" ou "irregular" e quer classificar as novas. Os exemplos vêm com a resposta?',
    options: [
      { text: 'Sim: cada nota já tem a categoria certa', why: 'Isso: dados rotulados. Esta aula mostra o nome desse tipo de aprendizado.' },
      { text: 'Não: ninguém sabe a resposta', why: 'As notas já foram analisadas: a resposta está lá.' },
      { text: 'Só metade', why: 'O enunciado diz que todas estão marcadas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ia',
      part: 'O que é IA',
      title: 'Agentes, regras e aprendizado',
      art: 'pessoal',
      goal: 'Conhecer a definição de IA e as duas grandes abordagens.',
      explain:
        'Na definição clássica de **Russell e Norvig**, a IA estuda **agentes** que **percebem o ambiente** e **agem** para alcançar objetivos.\n\nHá duas grandes linhas:\n\n- **Simbólica**: pessoas escrevem **regras explícitas** e uma máquina de inferência as aplica (sistemas especialistas).\n- **Aprendizado de máquina**: o sistema **ajusta parâmetros a partir de exemplos**, sem cada regra escrita à mão.',
      check: {
        kind: 'sort',
        id: 'ia-c',
        prompt: 'Simbólica ou aprendizado de máquina?',
        categories: ['Simbólica', 'Aprendizado de máquina'],
        items: [
          { text: '"Se o contrato passa de X sem licitação, gere alerta"', cat: 0, why: 'Regra escrita à mão.' },
          { text: 'Modelo que aprende com processos antigos quais contratações têm irregularidade', cat: 1, why: 'Aprende com exemplos.' },
        ],
      },
      recovery: {
        explain: 'Pergunte: **quem escreveu a regra?** Se foi uma **pessoa**, linha por linha, é **simbólica**. Se a regra **saiu dos dados**, porque o sistema ajustou números até acertar os exemplos, é **aprendizado de máquina**.',
        check: {
          kind: 'choice',
          id: 'ia-r',
          prompt: 'Na definição de Russell e Norvig, a IA estuda:',
          options: [
            { text: 'Agentes que percebem o ambiente e agem para alcançar objetivos', why: 'Isso.' },
            { text: 'Só robôs com braços', why: 'Agentes podem ser programas, sem corpo.' },
            { text: 'Só bancos de dados', why: 'É sobre agentes que percebem e agem.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'inclusao',
      part: 'O que é IA',
      title: 'IA, ML, deep learning; fraca e forte',
      art: 'degraus',
      goal: 'Entender a relação de inclusão e a diferença entre IA fraca e forte.',
      explain:
        '- O **aprendizado profundo** (*deep learning*) é um **subconjunto** do **aprendizado de máquina**, que é um **subconjunto** da **IA**. Como bonecas russas: IA ⊃ ML ⊃ DL.\n- **IA fraca** (estreita): especializada em **uma tarefa**.\n- **IA forte** (geral): **hipotética**, com capacidade ampla comparável à humana.\n\nTodos os sistemas em uso hoje, inclusive os grandes modelos de linguagem, são classificados como **IA estreita** na literatura didática.',
      check: {
        kind: 'order',
        id: 'in-c',
        prompt: 'Ordene do conjunto maior ao menor.',
        items: ['Inteligência artificial', 'Aprendizado de máquina', 'Aprendizado profundo'],
        why: 'IA contém ML, que contém deep learning.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **Brasil, Goiás e Goiânia**: Goiânia está dentro de Goiás, que está dentro do Brasil. **Deep learning** está dentro de **aprendizado de máquina**, que está dentro de **IA**. Todo deep learning é ML, mas nem todo ML é deep learning.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Os sistemas de IA em uso hoje são classificados, na literatura didática, como:',
          options: [
            { text: 'IA fraca (estreita)', why: 'Isso: especializados.' },
            { text: 'IA forte (geral)', why: 'A IA forte é hipotética.' },
            { text: 'Nenhum dos dois', why: 'São IA estreita.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'supervisionado',
      part: 'Supervisionado',
      title: 'Com rótulo: classificar ou prever valor',
      art: 'alvo',
      goal: 'Distinguir classificação de regressão no aprendizado supervisionado.',
      explain:
        'No **supervisionado**, os dados têm **rótulo**: para cada entrada, a **resposta certa** é conhecida.\n\n- **Classificação**: saída é uma **categoria**. Ex.: nota fiscal "regular" ou "suspeita". Algoritmos: árvore de decisão, random forest, **regressão logística**, k-NN, SVM, Naive Bayes.\n- **Regressão**: saída é um **valor numérico contínuo**. Ex.: preço de referência de uma obra por metro quadrado. Algoritmos: regressão linear, árvores de regressão.\n\nPegadinha: a **regressão logística**, apesar do nome, é de **classificação**.',
      check: {
        kind: 'choice',
        id: 'su-c',
        prompt: 'Notas já marcadas "regular" ou "irregular", e quer-se a categoria das novas. É:',
        options: [
          { text: 'Supervisionado, de classificação', why: 'Isso: rótulo e saída categórica.' },
          { text: 'Supervisionado, de regressão', why: 'Regressão prevê número contínuo; aqui é categoria.' },
          { text: 'Não supervisionado, de agrupamento', why: 'Há rótulos: é supervisionado.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Duas perguntas. **Os exemplos têm a resposta?** Sim: supervisionado. **A resposta é uma etiqueta ou um número?** Etiqueta ("regular", "suspeita"): classificação. Número com vírgula (R$ 2.347,80 por m²): regressão. A logística dá uma **probabilidade** para decidir a etiqueta: é classificação.',
        check: {
          kind: 'choice',
          id: 'su-r',
          prompt: '"A regressão logística é usada para prever valores contínuos." Isso está:',
          options: [
            { text: 'Errado: ela é um método de classificação', why: 'Isso.' },
            { text: 'Certo', why: 'Apesar do nome, ela classifica.' },
            { text: 'Certo só em obras', why: 'Ela classifica em qualquer área.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'nao-supervisionado',
      part: 'Não supervisionado',
      title: 'Sem rótulo: descobrir estrutura',
      art: 'rede',
      goal: 'Reconhecer as tarefas e técnicas do aprendizado não supervisionado.',
      explain:
        'No **não supervisionado**, os dados **não têm rótulo**. Busca-se **estrutura**:\n\n- **Agrupamento**: reunir itens parecidos. O **k-means** exige **k definido antes**; o hierárquico gera um dendrograma; o **DBSCAN** agrupa por densidade e marca isolados como ruído.\n- **Redução de dimensionalidade**: a **PCA** cria novas variáveis não correlacionadas que concentram a variância.\n- **Regras de associação**: itens que aparecem juntos (**Apriori**, suporte e confiança).\n- **Detecção de anomalias**: registros fora do padrão.\n\nO **semissupervisionado** combina poucos rotulados com muitos não rotulados.',
      check: {
        kind: 'choice',
        id: 'ns-c',
        prompt: 'Sobre esses algoritmos, é correto afirmar:',
        options: [
          { text: 'No k-means, o número de grupos k é definido antes', why: 'Isso.' },
          { text: 'A PCA é uma técnica supervisionada de classificação', why: 'É redução de dimensionalidade, não supervisionada.' },
          { text: 'O Apriori classifica notas fiscais com rótulo', why: 'O Apriori minera regras de associação.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Imagine uma caixa de **fotos sem legenda**. Separá-las em pilhas parecidas é **agrupamento** (no k-means, você diz antes quantas pilhas quer). Descobrir que quem aparece na praia também aparece no churrasco é **associação**. Achar a foto estranha que não combina com nada é **anomalia**.',
        check: {
          kind: 'choice',
          id: 'ns-r',
          prompt: 'Achar pagamentos atípicos a um fornecedor, sem rótulos, é:',
          options: [
            { text: 'Detecção de anomalias', why: 'Isso.' },
            { text: 'Regressão linear', why: 'Regressão prevê número com rótulos.' },
            { text: 'Aprendizado por reforço', why: 'Não há agente nem recompensa.' },
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
      prompt: 'Que tipo de tarefa é cada caso?',
      categories: ['Classificação', 'Regressão', 'Agrupamento'],
      items: [
        { text: 'Indicar se a denúncia é de saúde, obras ou educação, com exemplos rotulados', cat: 0, why: 'Categoria.' },
        { text: 'Estimar o valor justo de um aluguel', cat: 1, why: 'Número contínuo.' },
        { text: 'Reunir fornecedores parecidos sem rótulo', cat: 2, why: 'Sem rótulo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Deep learning está dentro de ML', 'k-means: k definido antes', 'Regressão logística: prevê valores contínuos'],
      bug: 2,
      why: 'A regressão logística é de classificação.',
      fixed: 'Regressão logística: classificação',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: há 500 processos classificados por auditores e 50 mil sem classificação, e todos serão usados no treino. Isso é:',
      options: [
        { text: 'Aprendizado semissupervisionado', why: 'Isso: poucos rotulados e muitos não.' },
        { text: 'Aprendizado por reforço', why: 'Não há recompensa por ação.' },
        { text: 'Sistema especialista', why: 'Não são regras escritas à mão.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.002' },
  ],
  summary: [
    'IA estuda agentes que percebem e agem (Russell e Norvig). Simbólica (regras) ou aprendizado de máquina (exemplos).',
    'IA ⊃ ML ⊃ deep learning. IA fraca (estreita, a de hoje) e forte (geral, hipotética).',
    'Supervisionado: rótulo. Classificação (categoria; inclui regressão logística) ou regressão (número).',
    'Não supervisionado: agrupamento (k-means com k antes, hierárquico, DBSCAN), PCA, associação (Apriori), anomalias.',
    'Semissupervisionado: poucos rotulados e muitos não.',
  ],
};

export const iaAprReforco: MicroLesson = {
  ...S,
  id: 'ia.aprendizado.3',
  series: { id: 'ia.aprendizado', order: 3 },
  title: 'Reforço, overfitting e aplicações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um aluno decorou as respostas da apostila e, na prova com questões novas, foi mal. Ele aprendeu ou só memorizou?',
    options: [
      { text: 'Só memorizou', why: 'Isso. Modelos de IA também fazem isso: chama-se overfitting. Esta aula mostra.' },
      { text: 'Aprendeu tudo', why: 'Se aprendesse, iria bem nas questões novas.' },
      { text: 'Não fez nada', why: 'Decorou, mas não generalizou.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'elementos',
      part: 'Reforço',
      title: 'Agente, ambiente, recompensa',
      art: 'alvo',
      goal: 'Conhecer os elementos do aprendizado por reforço.',
      explain:
        'No **aprendizado por reforço**, um **agente** interage com um **ambiente**.\n\n- **Estado**: a situação atual.\n- **Ação**: a escolha do agente.\n- **Recompensa**: sinal numérico, positivo ou negativo, sobre a ação.\n- **Política**: a regra que diz **qual ação tomar em cada estado**, para **maximizar a recompensa acumulada**.\n\n**Não há rótulos** com a resposta certa: o agente aprende por **tentativa e erro**.',
      check: {
        kind: 'choice',
        id: 'el-c',
        prompt: 'O elemento que define qual ação tomar em cada estado, para maximizar a recompensa acumulada, é:',
        options: [
          { text: 'A política', why: 'Isso.' },
          { text: 'O rótulo', why: 'No reforço não há rótulos.' },
          { text: 'O ambiente', why: 'O ambiente é aquilo com que o agente interage.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Volte ao cachorro: ele é o **agente**; a casa é o **ambiente**; "estou na porta com a guia" é o **estado**; sentar é a **ação**; o petisco é a **recompensa**. Com o tempo, ele forma uma **política**: "quando vejo a guia, sento".',
        check: {
          kind: 'choice',
          id: 'el-r',
          prompt: '"No reforço, o agente aprende com exemplos rotulados com a ação correta." Isso está:',
          options: [
            { text: 'Errado: aprende pelas recompensas ao agir', why: 'Isso.' },
            { text: 'Certo', why: 'Quem usa exemplos rotulados é o supervisionado.' },
            { text: 'Certo só em jogos', why: 'Em qualquer caso, aprende por recompensa.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'exploracao',
      part: 'Reforço',
      title: 'Explorar ou aproveitar',
      art: 'trilha',
      goal: 'Entender o dilema exploração e aproveitamento.',
      explain:
        'O dilema **exploração × aproveitamento** (*exploration × exploitation*):\n\n- **explorar**: testar ações **novas**, que talvez sejam melhores;\n- **aproveitar**: repetir as que **já deram bons resultados**.\n\nSó aproveitar pode prender o agente numa solução mediana; só explorar desperdiça o que já se aprendeu. É preciso **equilibrar**.\n\nO **Q-learning** é um algoritmo clássico de reforço.',
      check: {
        kind: 'choice',
        id: 'ex-c',
        prompt: 'Testar uma ação nova, que pode ser melhor que a conhecida, é:',
        options: [
          { text: 'Exploração', why: 'Isso.' },
          { text: 'Aproveitamento', why: 'Aproveitar é repetir o que já funciona.' },
          { text: 'Overfitting', why: 'Overfitting é outro problema: memorizar o treino.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **escolher restaurante**: ir sempre ao de sempre é **aproveitar** (é bom, mas talvez exista um melhor). Testar um novo é **explorar** (pode ser ótimo ou ruim). Quem só faz um dos dois perde: o equilíbrio é o segredo.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'Qual algoritmo é clássico do aprendizado por reforço?',
          options: [
            { text: 'Q-learning', why: 'Isso.' },
            { text: 'k-means', why: 'k-means é agrupamento, não supervisionado.' },
            { text: 'Apriori', why: 'Apriori é para regras de associação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'overfitting',
      part: 'Ajuste',
      title: 'Overfitting e underfitting',
      art: 'balanca',
      goal: 'Diagnosticar overfitting e underfitting e conhecer os remédios.',
      explain:
        '- **Overfitting** (sobreajuste): erro **baixo no treino** e **alto em dados novos**. Causa: modelo **complexo demais**, poucos dados. Remédios: mais dados, **regularização**, poda de árvores, **dropout**, **parada antecipada**, **validação cruzada**.\n- **Underfitting** (subajuste): erro **alto** no treino **e** nos novos. Causa: modelo **simples demais**. Remédios: modelo mais expressivo, mais variáveis, mais treino.',
      check: {
        kind: 'choice',
        id: 'ov-c',
        prompt: 'Um modelo de sobrepreço teve erro quase zero no treino e alto em contratos novos. Diagnóstico e medida:',
        options: [
          { text: 'Overfitting; regularização ou mais dados', why: 'Isso.' },
          { text: 'Underfitting; modelo mais simples', why: 'Simplificar mais pioraria um underfitting; aqui é overfitting.' },
          { text: 'Nenhum problema', why: 'Ir mal em dados novos é o problema.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte ao aluno: **decorou** a apostila (acerta tudo no treino) e **errou** na prova nova: **overfitting**. Outro aluno que **nem estudou** erra na apostila e na prova: **underfitting**. Para o primeiro, mais questões variadas e menos decoreba; para o segundo, mais estudo.',
        check: {
          kind: 'choice',
          id: 'ov-r',
          prompt: 'Erro alto no treino e nos dados novos indica:',
          options: [
            { text: 'Underfitting', why: 'Isso: o modelo é simples demais.' },
            { text: 'Overfitting', why: 'No overfitting, o treino vai bem.' },
            { text: 'Modelo perfeito', why: 'Erro alto em tudo é problema.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'vies-variancia',
      part: 'Ajuste',
      title: 'Viés e variância',
      art: 'degraus',
      goal: 'Relacionar viés e variância a underfitting e overfitting.',
      explain:
        'O **trade-off viés-variância** resume o problema:\n\n- **viés alto**: erro de **suposições simplificadoras**; leva ao **underfitting**;\n- **variância alta**: **sensibilidade excessiva** aos dados de treino; leva ao **overfitting**.\n\n**Aumentar a complexidade** do modelo tende a **reduzir o viés** e **aumentar a variância**. O bom modelo fica no meio.',
      check: {
        kind: 'choice',
        id: 'vv-c',
        prompt: 'Aumentar muito a complexidade do modelo tende a:',
        options: [
          { text: 'Reduzir o viés e aumentar a variância', why: 'Isso.' },
          { text: 'Aumentar o viés e reduzir a variância', why: 'É o contrário.' },
          { text: 'Zerar os dois', why: 'Há sempre um equilíbrio entre eles.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **alvo de dardos**. **Viés alto**: os dardos ficam juntinhos, mas **longe do centro** (o modelo erra sempre do mesmo jeito, simples demais). **Variância alta**: os dardos ficam **espalhados** pelo alvo (o modelo muda muito conforme os dados). Quer-se dardos juntos **e** no centro.',
        check: {
          kind: 'choice',
          id: 'vv-r',
          prompt: 'Variância alta leva a:',
          options: [
            { text: 'Overfitting', why: 'Isso.' },
            { text: 'Underfitting', why: 'Underfitting vem do viés alto.' },
            { text: 'Aprendizado por reforço', why: 'São conceitos diferentes.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'aplicacoes',
      part: 'Aplicações',
      title: 'IA no controle externo e RPA',
      art: 'suporte',
      goal: 'Associar técnicas de IA a aplicações reais e distinguir RPA.',
      explain:
        'Em um órgão de controle:\n\n- **triagem de denúncias** por assunto: **classificação de texto**;\n- **empresas com sócios em comum**: **regras e grafos**;\n- **sobrepreço**: **regressão** e **anomalias**;\n- **dados de editais em PDF**: extração.\n\nA **automação robótica de processos** (**RPA**) executa tarefas **repetitivas** em sistemas, imitando cliques e digitação. Ela segue **regras fixas** e pode ser combinada com IA quando há decisões que dependem de interpretação.',
      check: {
        kind: 'choice',
        id: 'ap-c',
        prompt: 'Um robô de software que entra no sistema, copia dados de uma tela e cola em outra, sempre do mesmo jeito, é:',
        options: [
          { text: 'RPA, automação por regras fixas', why: 'Isso.' },
          { text: 'Aprendizado por reforço', why: 'Não há recompensa nem aprendizado: segue regras fixas.' },
          { text: 'Rede neural convolucional', why: 'Não há aprendizado com imagens: é automação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **RPA** é um **estagiário incansável** que repete exatamente o roteiro que recebeu: abrir, copiar, colar, salvar. Ele não "entende" nada. Quando é preciso **interpretar** (ler uma denúncia e decidir o assunto), entra a **IA**, que pode trabalhar junto com ele.',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'Detectar sobrepreço em obras usa, tipicamente:',
          options: [
            { text: 'Regressão e detecção de anomalias', why: 'Isso.' },
            { text: 'Somente RPA', why: 'RPA repete tarefas; não estima preços.' },
            { text: 'Teste de Turing', why: 'O teste é sobre conversa.' },
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
      lines: ['Política: ação para cada estado', 'Overfitting: bom no treino, ruim em novos', 'RPA: aprende sozinho com recompensas'],
      bug: 2,
      why: 'RPA segue regras fixas; quem aprende por recompensa é o reforço.',
      fixed: 'RPA: tarefas repetitivas com regras fixas',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que remédio serve para cada problema?',
      categories: ['Contra overfitting', 'Contra underfitting'],
      items: [
        { text: 'Regularização', cat: 0, why: 'Reduz a complexidade efetiva.' },
        { text: 'Modelo mais expressivo', cat: 1, why: 'Aumenta a capacidade.' },
        { text: 'Dropout', cat: 0, why: 'Evita memorizar.' },
        { text: 'Mais variáveis', cat: 1, why: 'Dá mais informação ao modelo.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um sistema de fila escolhe a ordem de atendimento e recebe pontos quando reduz o tempo de espera. Que tipo de aprendizado?',
      options: [
        { text: 'Por reforço', why: 'Isso: ação, recompensa e política.' },
        { text: 'Supervisionado', why: 'Não há exemplos rotulados com a ordem certa.' },
        { text: 'Não supervisionado', why: 'Há recompensa guiando o agente.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.ia.03.004' },
  ],
  summary: [
    'Reforço: agente, ambiente, estado, ação, recompensa e política (ação por estado). Sem rótulos: tentativa e erro.',
    'Exploração (testar novas) × aproveitamento (repetir as boas). Q-learning é clássico.',
    'Overfitting: bom no treino, ruim em novos (regularização, dropout, mais dados). Underfitting: ruim em tudo.',
    'Viés alto → underfitting; variância alta → overfitting. Mais complexidade: menos viés, mais variância.',
    'No controle: classificação de denúncias, grafos de sócios, regressão e anomalias. RPA: regras fixas, pode se somar à IA.',
  ],
};
