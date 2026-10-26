// Série "UML, BPMN e padrões de projeto" (cap.es.02, trecho modelagem), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta de Christopher Alexander à BPMN 2.0; as seguintes
// ensinam a UML, a BPMN e os padrões GoF, uma ideia por etapa. Fatos conferidos com o texto do
// capítulo (02-modelagem.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.es.02', sectionId: 'modelagem' } as const;

export const esModHistoria: MicroLesson = {
  ...S,
  id: 'es.modelagem.1',
  series: { id: 'es.modelagem', order: 1 },
  title: 'De um livro de arquitetura aos padrões de software',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A ideia de "padrões de projeto" do software veio de qual área?',
    options: [
      { text: 'Da arquitetura de prédios e cidades', why: 'Isso. Esta aula conta essa história e a da UML e da BPMN.' },
      { text: 'Da medicina', why: 'Veio de um arquiteto, Christopher Alexander.' },
      { text: 'Da música', why: 'Veio da arquitetura de construções.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'alexander',
      part: 'A história',
      title: '1977 e 1994: dos prédios aos 23 padrões',
      art: 'livro',
      goal: 'Saber de onde vêm os padrões de projeto.',
      explain:
        'Em **1977**, o arquiteto **Christopher Alexander** publicou *A Pattern Language*: soluções **que se repetem** para problemas **que se repetem** na construção de casas e cidades.\n\nEm **1994**, **Gamma**, **Helm**, **Johnson** e **Vlissides**, a "**Gangue dos Quatro**" (GoF), levaram a ideia ao software no livro *Design Patterns*, com **23 padrões**.',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'Quantos padrões o catálogo GoF reúne?',
        options: [
          { text: '23', why: 'Isso.' },
          { text: '14', why: '14 são os diagramas da UML 2.5.' },
          { text: '7', why: 'São 23 padrões.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Um padrão é uma **receita testada**: "para uma cozinha ensolarada, abra a janela a leste". Alexander fez isso com casas; a Gangue dos Quatro fez com classes e objetos: "para converter interfaces, use um Adapter".',
        check: {
          kind: 'choice',
          id: 'al-r',
          prompt: 'Quem é a "Gangue dos Quatro"?',
          options: [
            { text: 'Gamma, Helm, Johnson e Vlissides', why: 'Isso.' },
            { text: 'Booch, Rumbaugh e Jacobson', why: 'Esses são os três da UML.' },
            { text: 'Os quatro fundadores da OTAN', why: 'É o apelido dos autores de Design Patterns.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'uml',
      part: 'A história',
      title: '1997: a UML',
      art: 'trilha',
      goal: 'Saber que a UML é uma linguagem de modelagem, não um processo.',
      explain:
        'Nos anos 1990, havia **dezenas de notações** para desenhar sistemas. **Grady Booch**, **James Rumbaugh** e **Ivar Jacobson** juntaram suas propostas.\n\nEm **1997**, a **OMG** adotou a **UML** (*Unified Modeling Language*). Hoje, a versão **2.5** tem **14 diagramas**.\n\nAtenção: a UML é uma **linguagem** de modelagem, **não um processo**. Ela diz **como desenhar**, não **como trabalhar**.',
      check: {
        kind: 'choice',
        id: 'um-c',
        prompt: 'A UML define o processo de desenvolvimento a seguir?',
        options: [
          { text: 'Não: é só uma linguagem de modelagem', why: 'Isso.' },
          { text: 'Sim, um processo em cascata', why: 'A UML não define processo.' },
          { text: 'Sim, um processo ágil', why: 'A UML é uma linguagem, usada com qualquer processo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A UML é como a **notação musical**: diz como **escrever** a música, mas não diz se a banda ensaia de manhã ou à noite. Processos (cascata, ágil) são o jeito de **ensaiar**; a UML é a **partitura**.',
        check: {
          kind: 'choice',
          id: 'um-r',
          prompt: 'Quantos diagramas tem a UML 2.5?',
          options: [
            { text: '14', why: 'Isso: 7 estruturais e 7 comportamentais.' },
            { text: '23', why: '23 são os padrões GoF.' },
            { text: '4', why: 'São 14.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'bpmn',
      part: 'A história',
      title: '2004 e 2011: a BPMN',
      art: 'rede',
      goal: 'Saber de onde vem a BPMN.',
      explain:
        'Para desenhar **processos de negócio** (como tramita uma denúncia, como se aprova um pagamento), surgiu a **BPMN**.\n\nA primeira versão saiu em **2004**, pela iniciativa **BPMI**. Depois, a especificação passou à **OMG**, que publicou a **BPMN 2.0** em **2011**.\n\nUML e BPMN são, hoje, **as duas da OMG**: uma para **sistemas**, outra para **processos**.',
      check: {
        kind: 'order',
        id: 'bp-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['A Pattern Language, de Alexander (1977)', 'Design Patterns, da GoF (1994)', 'UML adotada pela OMG (1997)', 'BPMN 2.0 da OMG (2011)'],
        why: 'Dos padrões às notações da OMG.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A UML desenha **o sistema por dentro** (classes, mensagens). A BPMN desenha **o caminho do trabalho** entre pessoas e setores, como um **fluxograma de tramitação** de processo. As duas são mantidas pela OMG.',
        check: {
          kind: 'choice',
          id: 'bp-r',
          prompt: 'A BPMN modela principalmente:',
          options: [
            { text: 'Processos de negócio', why: 'Isso.' },
            { text: 'Classes e objetos', why: 'Isso é UML, diagrama de classes.' },
            { text: 'Tabelas de banco', why: 'Tabelas são modelagem de dados.' },
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
      items: ['Alexander (1977)', 'GoF (1994)', 'UML (1997)', 'BPMN 1.0 (2004)'],
      why: 'Padrões, linguagem de modelagem e notação de processos.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada item é da UML, da BPMN ou da GoF?',
      categories: ['UML', 'BPMN', 'GoF'],
      items: [
        { text: 'Diagrama de sequência', cat: 0, why: 'Diagrama UML.' },
        { text: 'Pool e lane', cat: 1, why: 'Raias da BPMN.' },
        { text: 'Padrão Observer', cat: 2, why: 'Catálogo GoF.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['UML 2.5: 14 diagramas', 'GoF: 23 padrões', 'UML: define o processo de desenvolvimento'],
      bug: 2,
      why: 'A UML é só uma linguagem de modelagem, não um processo.',
      fixed: 'UML: linguagem de modelagem',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1977: Christopher Alexander, A Pattern Language. 1994: GoF, Design Patterns, 23 padrões.',
    '1997: OMG adota a UML (Booch, Rumbaugh, Jacobson); a 2.5 tem 14 diagramas; é linguagem, não processo.',
    '2004: BPMN pela BPMI; 2011: BPMN 2.0 pela OMG, para processos de negócio.',
  ],
};

export const esModUml: MicroLesson = {
  ...S,
  id: 'es.modelagem.2',
  series: { id: 'es.modelagem', order: 2 },
  title: 'Os diagramas UML',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Para mostrar a troca de mensagens entre a tela, o serviço e o banco ao longo do tempo, qual diagrama UML usar?',
    options: [
      { text: 'Sequência', why: 'Isso. Esta aula percorre os diagramas mais cobrados.' },
      { text: 'Classes', why: 'O de classes mostra a estrutura, não a troca ao longo do tempo.' },
      { text: 'Implantação', why: 'O de implantação mostra servidores e artefatos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'grupos',
      part: 'Os grupos',
      title: 'Estruturais e comportamentais',
      art: 'dados',
      goal: 'Classificar os diagramas UML em estruturais e comportamentais.',
      explain:
        'Os 14 diagramas da UML 2.5 se dividem em dois grupos de 7:\n\n- **estruturais**: **classes**, objetos, **componentes**, estrutura composta, pacotes, **implantação**, perfil;\n- **comportamentais**: **casos de uso**, **atividades**, **máquina de estados** e os de **interação**: **sequência**, comunicação, tempo e visão geral da interação.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'O diagrama de máquina de estados é:',
        options: [
          { text: 'Comportamental', why: 'Isso.' },
          { text: 'Estrutural', why: 'Ele mostra mudanças ao longo do tempo: comportamental.' },
          { text: 'Não é da UML', why: 'É um dos diagramas comportamentais.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: o diagrama mostra **como o sistema é** (uma **foto**) ou **como ele age** (um **filme**)? Classes e implantação são **fotos**: estruturais. Sequência, atividades e estados são **filmes**: comportamentais.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'O diagrama de implantação é:',
          options: [
            { text: 'Estrutural', why: 'Isso: mostra nós e artefatos.' },
            { text: 'Comportamental', why: 'Mostra a estrutura física, não o comportamento.' },
            { text: 'De interação', why: 'Interação são sequência, comunicação, tempo e visão geral.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'classes',
      part: 'Classes',
      title: 'Agregação, composição e visibilidade',
      art: 'engrenagem',
      goal: 'Distinguir agregação de composição e ler a visibilidade.',
      explain:
        'No diagrama de **classes**:\n\n- **agregação** (losango **vazio**): o todo e as partes existem **separadamente**, como um departamento e seus servidores;\n- **composição** (losango **cheio**): a parte **não existe sem o todo**, como um pedido e seus itens;\n- generalização (herança) e dependência.\n\nVisibilidade: `+` pública, `-` privada, `#` protegida, `~` pacote.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'Pedido e ItemPedido ligados por losango cheio, e os itens não existem sem o pedido. A relação é:',
        options: [
          { text: 'Composição', why: 'Isso.' },
          { text: 'Agregação', why: 'Agregação é losango vazio, com partes independentes.' },
          { text: 'Generalização', why: 'Generalização é herança.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **apagar o todo**. Se o **departamento** for extinto, os **servidores** continuam existindo, vão para outro setor: **agregação**. Se o **pedido** for cancelado, os **itens do pedido** somem com ele: **composição**. Losango **cheio** é o laço mais forte.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'O símbolo # na frente de um atributo indica visibilidade:',
          options: [
            { text: 'Protegida', why: 'Isso.' },
            { text: 'Privada', why: 'Privada é -.' },
            { text: 'Pública', why: 'Pública é +.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'comport',
      part: 'Comportamento',
      title: 'Sequência, atividades e estados',
      art: 'calendario',
      goal: 'Escolher o diagrama comportamental certo para cada necessidade.',
      explain:
        '- **Sequência**: troca de **mensagens** entre objetos **ao longo do tempo**, com linhas de vida verticais;\n- **atividades**: fluxo de **ações**, **decisões** e **paralelismo**, parecido com um fluxograma;\n- **máquina de estados**: os **estados** de um objeto e as **transições** disparadas por eventos. Exemplo: processo autuado, em instrução, julgado, arquivado;\n- **implantação** (estrutural): **nós físicos** e os artefatos instalados.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Para mostrar que um processo passa de autuado a em instrução, julgado e arquivado, usa-se o diagrama de:',
        options: [
          { text: 'Máquina de estados', why: 'Isso.' },
          { text: 'Sequência', why: 'Sequência mostra mensagens entre objetos.' },
          { text: 'Classes', why: 'Classes mostram a estrutura.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O de **sequência** é um **diálogo** em tirinha: quem fala com quem, em que ordem. O de **estados** é a **vida** de um objeto: em que situação ele está e o que o faz mudar. O de **atividades** é o **passo a passo** de uma tarefa.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Qual diagrama se parece com um fluxograma, com decisões e paralelismo?',
          options: [
            { text: 'Atividades', why: 'Isso.' },
            { text: 'Implantação', why: 'Implantação mostra servidores.' },
            { text: 'Casos de uso', why: 'Casos de uso mostram atores e objetivos.' },
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
      prompt: 'O diagrama é estrutural ou comportamental?',
      categories: ['Estrutural', 'Comportamental'],
      items: [
        { text: 'Classes', cat: 0, why: 'Estrutura.' },
        { text: 'Implantação', cat: 0, why: 'Nós físicos.' },
        { text: 'Sequência', cat: 1, why: 'Interação.' },
        { text: 'Atividades', cat: 1, why: 'Fluxo de ações.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Losango cheio: composição', '- : privada', 'Composição: a parte existe sem o todo'],
      bug: 2,
      why: 'Na composição a parte não existe sem o todo; isso é agregação.',
      fixed: 'Composição: a parte não existe sem o todo',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O time quer mostrar em quais servidores e contêineres cada parte do sistema roda. Qual diagrama?',
      scenarios: [
        { title: 'Opção A', body: '**Implantação**: nós físicos e artefatos.' },
        { title: 'Opção B', body: '**Sequência**: mensagens ao longo do tempo.' },
      ],
      answer: 0,
      why: 'O diagrama de implantação mostra a infraestrutura e o que está instalado nela.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.006' },
  ],
  summary: [
    'UML 2.5: 7 estruturais (classes, componentes, implantação...) e 7 comportamentais (casos de uso, atividades, estados, sequência...).',
    'Agregação (losango vazio): partes independentes. Composição (cheio): a parte não existe sem o todo. + - # ~.',
    'Sequência: mensagens no tempo. Atividades: fluxo. Estados: transições. Implantação: nós físicos.',
  ],
};

export const esModBpmn: MicroLesson = {
  ...S,
  id: 'es.modelagem.3',
  series: { id: 'es.modelagem', order: 3 },
  title: 'BPMN 2.0',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num diagrama BPMN, o Tribunal e o jurisdicionado estão em pools diferentes. Como representar a comunicação entre eles?',
    options: [
      { text: 'Por fluxo de mensagem, a seta tracejada', why: 'Isso. Esta aula mostra os elementos da BPMN.' },
      { text: 'Por fluxo de sequência, a seta cheia', why: 'Pegadinha: o fluxo de sequência fica dentro de um pool.' },
      { text: 'Não se representa', why: 'Representa-se com fluxo de mensagem.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'elementos',
      part: 'Os elementos',
      title: 'Eventos, atividades e gateways',
      art: 'alvo',
      goal: 'Reconhecer os objetos de fluxo da BPMN.',
      explain:
        'Os **objetos de fluxo**:\n\n- **eventos**: **círculos** (início, intermediário, fim);\n- **atividades**: **retângulos arredondados** (tarefa, subprocesso);\n- **gateways**: **losangos**, onde o caminho se divide ou se junta.\n\nOs **artefatos** completam: objeto de dados, grupo e anotação.',
      check: {
        kind: 'choice',
        id: 'el-c',
        prompt: 'Na BPMN, um losango representa:',
        options: [
          { text: 'Um gateway', why: 'Isso.' },
          { text: 'Um evento', why: 'Eventos são círculos.' },
          { text: 'Uma tarefa', why: 'Tarefas são retângulos arredondados.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pense numa **viagem de ônibus**: o **círculo** é a **parada** (algo acontece: começa, chega, termina); o **retângulo** é o **trecho percorrido** (trabalho feito); o **losango** é o **trevo** onde se escolhe o caminho.',
        check: {
          kind: 'choice',
          id: 'el-r',
          prompt: 'Um círculo na BPMN representa:',
          options: [
            { text: 'Um evento', why: 'Isso: início, intermediário ou fim.' },
            { text: 'Um gateway', why: 'Gateway é losango.' },
            { text: 'Um pool', why: 'Pool é uma raia grande.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'conexoes',
      part: 'Conexões e raias',
      title: 'Sequência, mensagem, pool e lane',
      art: 'rede',
      goal: 'Distinguir fluxo de sequência de fluxo de mensagem e pool de lane.',
      explain:
        '- **Fluxo de sequência**: seta **cheia**, **dentro** de um pool;\n- **fluxo de mensagem**: seta **tracejada**, **entre** pools;\n- **associação**: liga artefatos.\n\nRaias:\n\n- **pool**: um **participante**, como o Tribunal ou o jurisdicionado;\n- **lane**: uma **subdivisão** do pool, como os setores.',
      check: {
        kind: 'choice',
        id: 'cx-c',
        prompt: 'O setor de protocolo e o gabinete, dentro do mesmo Tribunal, seriam:',
        options: [
          { text: 'Lanes do mesmo pool', why: 'Isso: subdivisões de um participante.' },
          { text: 'Pools diferentes', why: 'Pools diferentes são participantes distintos.' },
          { text: 'Gateways', why: 'Gateways são pontos de decisão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **pool** é a **piscina** de um participante; as **lanes** são as **raias** dentro dela. Dentro da mesma piscina, nada-se em **seta cheia** (sequência). Para mandar algo **à outra piscina**, joga-se uma **garrafa com bilhete** (seta tracejada, mensagem).',
        check: {
          kind: 'choice',
          id: 'cx-r',
          prompt: 'O fluxo de sequência pode ligar pools diferentes?',
          options: [
            { text: 'Não: entre pools usa-se fluxo de mensagem', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'Pegadinha: entre pools, fluxo de mensagem.' },
            { text: 'Só com gateway', why: 'Entre pools, é fluxo de mensagem.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'gateways',
      part: 'Gateways',
      title: 'Exclusivo, paralelo, inclusivo, eventos',
      art: 'interruptor',
      goal: 'Escolher o tipo de gateway pelo comportamento.',
      explain:
        '| Gateway | Símbolo | Comportamento |\n|---|---|---|\n| Exclusivo | X | **um único** caminho |\n| Paralelo | + | **todos** ao mesmo tempo |\n| Inclusivo | O | **um ou mais** caminhos |\n| Baseado em eventos | pentágono | o **primeiro evento** decide |\n\nNo paralelo, ao **juntar**, espera-se **todos** os caminhos chegarem.',
      check: {
        kind: 'choice',
        id: 'gw-c',
        prompt: 'Depois da autuação, a análise técnica e a jurídica correm ao mesmo tempo. Qual gateway?',
        options: [
          { text: 'Paralelo (+)', why: 'Isso: todos os caminhos ao mesmo tempo.' },
          { text: 'Exclusivo (X)', why: 'O exclusivo escolheria só um caminho.' },
          { text: 'Baseado em eventos', why: 'Aqui não se espera um evento; os dois caminhos correm juntos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O **X** é uma **bifurcação** de estrada: você vai **por um** lado. O **+** é um **ônibus que se divide** em dois e **todos** os passageiros seguem viagem, encontrando-se depois. O **O** é "**um ou mais**" lados, conforme as condições.',
        check: {
          kind: 'choice',
          id: 'gw-r',
          prompt: '"Se o valor passar de R$ 1 milhão, vai ao plenário; senão, à câmara." Qual gateway?',
          options: [
            { text: 'Exclusivo (X)', why: 'Isso: um único caminho conforme a condição.' },
            { text: 'Paralelo (+)', why: 'O paralelo seguiria os dois.' },
            { text: 'Inclusivo (O)', why: 'Aqui só um caminho é possível.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual elemento BPMN tem cada forma?',
      categories: ['Evento', 'Atividade', 'Gateway'],
      items: [
        { text: 'Círculo', cat: 0, why: 'Início, intermediário, fim.' },
        { text: 'Retângulo arredondado', cat: 1, why: 'Tarefa ou subprocesso.' },
        { text: 'Losango', cat: 2, why: 'Divisão ou junção.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Pool: participante', 'Lane: subdivisão do pool', 'Fluxo de sequência: entre pools'],
      bug: 2,
      why: 'Entre pools, usa-se fluxo de mensagem; a sequência fica dentro do pool.',
      fixed: 'Fluxo de mensagem: entre pools',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O Tribunal envia um ofício ao jurisdicionado, em outro pool. Como desenhar?',
      scenarios: [
        { title: 'Opção A', body: 'Seta **tracejada** (fluxo de mensagem) entre os pools.' },
        { title: 'Opção B', body: 'Seta **cheia** (fluxo de sequência) atravessando os pools.' },
      ],
      answer: 0,
      why: 'A comunicação entre participantes é fluxo de mensagem.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.007' }],
  summary: [
    'Objetos de fluxo: eventos (círculos), atividades (retângulos arredondados), gateways (losangos).',
    'Fluxo de sequência (cheia) dentro do pool; fluxo de mensagem (tracejada) entre pools. Pool: participante; lane: subdivisão.',
    'Gateways: exclusivo X (um), paralelo + (todos), inclusivo O (um ou mais), baseado em eventos (o primeiro evento).',
  ],
};

export const esModPadroes: MicroLesson = {
  ...S,
  id: 'es.modelagem.4',
  series: { id: 'es.modelagem', order: 4 },
  title: 'Padrões de projeto GoF',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O sistema novo precisa usar um módulo legado com interface incompatível. Cria-se uma classe que converte as chamadas. Que padrão é esse?',
    options: [
      { text: 'Adapter', why: 'Isso. Esta aula mostra os três grupos e os padrões mais cobrados.' },
      { text: 'Singleton', why: 'Singleton garante uma única instância.' },
      { text: 'Observer', why: 'Observer notifica vários objetos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'grupos',
      part: 'Os grupos',
      title: 'Criacionais, estruturais e comportamentais',
      art: 'degraus',
      goal: 'Classificar os padrões nos três grupos.',
      explain:
        '- **Criacionais** (5): **como os objetos são criados**. Abstract Factory, **Builder**, **Factory Method**, Prototype, **Singleton**;\n- **estruturais** (7): **como se compõem**. **Adapter**, Bridge, **Composite**, **Decorator**, **Facade**, Flyweight, **Proxy**;\n- **comportamentais** (11): **como interagem**. Chain of Responsibility, **Command**, Interpreter, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Template Method, Visitor.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'São padrões comportamentais:',
        options: [
          { text: 'Iterator, State e Visitor', why: 'Isso.' },
          { text: 'Adapter, Facade e Proxy', why: 'Esses são estruturais.' },
          { text: 'Singleton, Builder e Factory Method', why: 'Esses são criacionais.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Três perguntas: **como nasce**? (criacionais: fábricas, construtor, instância única). **Como se encaixa**? (estruturais: adaptador, fachada, decorador). **Como conversa**? (comportamentais: observador, estratégia, comando).',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'O Adapter é um padrão:',
          options: [
            { text: 'Estrutural', why: 'Isso.' },
            { text: 'Criacional', why: 'Pegadinha: ele adapta interfaces, não cria objetos.' },
            { text: 'Comportamental', why: 'Ele trata de composição de interfaces.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'criacionais',
      part: 'Os mais cobrados',
      title: 'Singleton, Factory, Builder, Adapter, Facade',
      art: 'engrenagem',
      goal: 'Associar cada padrão ao problema que resolve.',
      explain:
        '- **Singleton**: **uma única instância** com acesso global (cuidado: dificulta testes);\n- **Factory Method**: **subclasses decidem** qual classe instanciar;\n- **Builder**: montar objetos complexos **passo a passo**;\n- **Adapter**: **converter a interface** de uma classe para a que o cliente espera, como um legado;\n- **Facade**: uma **interface simples** para um subsistema complexo.',
      check: {
        kind: 'choice',
        id: 'cr-c',
        prompt: 'Uma interface simples que esconde um subsistema complexo de folha de pagamento é um:',
        options: [
          { text: 'Facade', why: 'Isso.' },
          { text: 'Builder', why: 'Builder monta objetos passo a passo.' },
          { text: 'Singleton', why: 'Singleton garante instância única.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **Adapter** é o **adaptador de tomada** de viagem: faz o plugue antigo caber na tomada nova. A **Facade** é o **balcão único de atendimento**: você fala com uma pessoa, e ela resolve com os dez setores por trás.',
        check: {
          kind: 'choice',
          id: 'cr-r',
          prompt: 'Qual padrão garante uma única instância de uma classe?',
          options: [
            { text: 'Singleton', why: 'Isso.' },
            { text: 'Prototype', why: 'Prototype cria cópias de um objeto.' },
            { text: 'Proxy', why: 'Proxy controla o acesso a outro objeto.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'outros',
      part: 'Os mais cobrados',
      title: 'Decorator, Proxy, Composite, Observer, Strategy',
      art: 'trilha',
      goal: 'Associar cada padrão ao problema que resolve.',
      explain:
        '- **Decorator**: acrescentar responsabilidades a um objeto **dinamicamente**, sem herança;\n- **Proxy**: um **representante** que controla o acesso a outro objeto (cache, carga tardia, segurança);\n- **Composite**: tratar objetos e **composições** da mesma forma (árvores);\n- **Observer**: **notificar vários** objetos quando um muda (base de eventos);\n- **Strategy**: **trocar o algoritmo** em tempo de execução.',
      check: {
        kind: 'choice',
        id: 'ou-c',
        prompt: 'Trocar o cálculo de multa (diária, fixa, progressiva) em tempo de execução é o padrão:',
        options: [
          { text: 'Strategy', why: 'Isso: cada cálculo encapsulado e trocável.' },
          { text: 'Composite', why: 'Composite trata árvores de objetos.' },
          { text: 'Observer', why: 'Observer notifica mudanças.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O **Observer** é a **lista de e-mails** de um processo: quando ele muda, **todos os inscritos** são avisados. O **Strategy** é o **cardápio de rotas** do GPS: mais rápida, mais curta, sem pedágio; troca-se a rota sem trocar o GPS.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: 'Um representante que guarda em cache as respostas de um serviço lento é um:',
          options: [
            { text: 'Proxy', why: 'Isso.' },
            { text: 'Decorator', why: 'Decorator acrescenta responsabilidades; o cache controlando acesso é Proxy.' },
            { text: 'Builder', why: 'Builder monta objetos.' },
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
      prompt: 'Em qual grupo GoF fica cada padrão?',
      categories: ['Criacional', 'Estrutural', 'Comportamental'],
      items: [
        { text: 'Builder', cat: 0, why: 'Criação passo a passo.' },
        { text: 'Proxy', cat: 1, why: 'Composição.' },
        { text: 'Strategy', cat: 2, why: 'Interação.' },
        { text: 'Factory Method', cat: 0, why: 'Criação.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Observer: notificar vários', 'Facade: interface simples', 'Adapter: padrão criacional'],
      bug: 2,
      why: 'O Adapter é estrutural.',
      fixed: 'Adapter: padrão estrutural',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Vários painéis precisam ser atualizados quando um processo muda de situação. Qual padrão?',
      scenarios: [
        { title: 'Opção A', body: '**Observer**: os painéis se inscrevem e são notificados.' },
        { title: 'Opção B', body: '**Singleton**: uma instância única de painel.' },
      ],
      answer: 0,
      why: 'O Observer notifica todos os interessados quando o estado muda.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.009' },
  ],
  summary: [
    'GoF: 5 criacionais (Singleton, Factory Method, Builder...), 7 estruturais (Adapter, Facade, Decorator, Proxy, Composite...), 11 comportamentais (Observer, Strategy, Command...).',
    'Adapter converte interfaces; Facade simplifica subsistemas; Proxy controla acesso; Decorator acrescenta responsabilidades.',
    'Observer notifica vários; Strategy troca o algoritmo; Composite trata árvores.',
  ],
};
