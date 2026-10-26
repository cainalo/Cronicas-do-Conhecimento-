// Série "Arquitetura e princípios" (cap.es.02, trecho arquitetura), no ritmo lento com história pedido
// em 25/10/2026: a primeira aula conta de Dijkstra e Parnas aos microsserviços; as seguintes ensinam
// os estilos arquiteturais, coesão, acoplamento e SOLID, e DRY, KISS e YAGNI, uma ideia por etapa.
// Fatos conferidos com o texto do capítulo (01-arquitetura.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.es.02', sectionId: 'arquitetura' } as const;

export const esArqHistoria: MicroLesson = {
  ...S,
  id: 'es.arquitetura.1',
  series: { id: 'es.arquitetura', order: 1 },
  title: 'Das camadas aos microsserviços',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um sistema gigante em que tudo depende de tudo: mexer numa parte quebra outra. Isso tem nome?',
    options: [
      { text: 'Sim: alto acoplamento', why: 'Isso. Esta aula conta como se aprendeu a dividir sistemas em partes.' },
      { text: 'Não, é normal e não se evita', why: 'Há décadas de estudo sobre como evitar isso.' },
      { text: 'Sim: alta coesão', why: 'Coesão alta é desejável; o problema descrito é acoplamento.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'camadas',
      part: 'A história',
      title: '1968 e 1972: camadas e módulos',
      art: 'degraus',
      goal: 'Saber de onde vêm as camadas e a divisão em módulos.',
      explain:
        'Em **1968**, **Edsger Dijkstra** descreveu o sistema **THE**, organizado em **camadas**: cada nível usava só o de baixo.\n\nEm **1972**, **David Parnas** publicou um artigo sobre como **dividir um sistema em módulos**: cada módulo deve **esconder** uma decisão de projeto, para que mudá-la não afete os outros.\n\nNos anos **1970**, **Larry Constantine** deu nome a duas medidas: **coesão** e **acoplamento**.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Qual era a ideia de Parnas para dividir em módulos?',
        options: [
          { text: 'Cada módulo esconde uma decisão de projeto', why: 'Isso: mudar a decisão não afeta os outros.' },
          { text: 'Cada módulo deve ter o mesmo tamanho', why: 'O critério é esconder decisões, não o tamanho.' },
          { text: 'Todos os módulos compartilham tudo', why: 'É o contrário: cada um esconde o seu.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **restaurante**: o cliente pede ao garçom, e não precisa saber **como a cozinha** prepara o prato. Se a cozinha trocar o fogão, o cliente nem percebe. Cada módulo é uma cozinha que **esconde** como trabalha.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'Quem descreveu o sistema THE, em camadas, em 1968?',
          options: [
            { text: 'Edsger Dijkstra', why: 'Isso.' },
            { text: 'David Parnas', why: 'Parnas é dos módulos, em 1972.' },
            { text: 'Kent Beck', why: 'Kent Beck é do XP.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'solid',
      part: 'A história',
      title: '1987 a 2004: Liskov e SOLID',
      art: 'livro',
      goal: 'Saber de onde vêm os princípios SOLID.',
      explain:
        'Em **1987**, **Barbara Liskov** apresentou a ideia de que um **subtipo** deve poder **substituir** o seu tipo base sem quebrar o comportamento. Virou o princípio de **Liskov**.\n\nPor volta de **2000**, **Robert C. Martin** reuniu princípios de projeto orientado a objetos. Pouco depois, **Michael Feathers** notou que as iniciais formavam a palavra **SOLID**.',
      check: {
        kind: 'choice',
        id: 'so-c',
        prompt: 'O que diz o princípio de Liskov?',
        options: [
          { text: 'Subtipos devem substituir o tipo base sem quebrar o comportamento', why: 'Isso.' },
          { text: 'Toda classe deve ter um só método', why: 'Não é isso; Liskov trata de substituição.' },
          { text: 'Nunca usar herança', why: 'Liskov orienta o bom uso da herança.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Se o contrato diz "**um veículo** levará os documentos", tanto um carro quanto uma moto devem servir **sem surpresa**. Se a moto não aceitasse documentos, ela **quebraria** o contrato do "veículo". Esse é o espírito de Liskov.',
        check: {
          kind: 'choice',
          id: 'so-r',
          prompt: 'Quem reuniu os princípios que formam o SOLID?',
          options: [
            { text: 'Robert C. Martin', why: 'Isso; o acrônimo foi notado por Michael Feathers.' },
            { text: 'Edsger Dijkstra', why: 'Dijkstra é das camadas do THE.' },
            { text: 'Ivar Jacobson', why: 'Jacobson é dos casos de uso.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'micro',
      part: 'A história',
      title: '2014: microsserviços',
      art: 'nuvem',
      goal: 'Saber quando o termo microsserviços se popularizou.',
      explain:
        'Nos anos **2000**, as empresas usaram a **SOA**: serviços corporativos ligados por um **barramento** (ESB), muitas vezes com SOAP.\n\nEm **2014**, **James Lewis** e **Martin Fowler** publicaram um artigo que popularizou o termo **microsserviços**: serviços **pequenos**, **independentes**, cada um com **seus dados**, implantados separadamente.\n\nO próprio texto alerta: microsserviços têm **custos** e não servem para todo sistema.',
      check: {
        kind: 'order',
        id: 'mi-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Camadas do THE (1968)', 'Módulos de Parnas (1972)', 'Princípio de Liskov (1987)', 'Artigo sobre microsserviços (2014)'],
        why: 'Das camadas aos serviços independentes.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A **SOA** é um **condomínio com uma portaria central** por onde tudo passa (o barramento). Os **microsserviços** são **casas independentes** na mesma rua, cada uma com a sua chave e a sua despensa (os dados).',
        check: {
          kind: 'choice',
          id: 'mi-r',
          prompt: 'O que a SOA costuma usar para integrar serviços?',
          options: [
            { text: 'Um barramento (ESB)', why: 'Isso.' },
            { text: 'Um banco por serviço, sem barramento', why: 'Isso lembra os microsserviços.' },
            { text: 'Nenhuma comunicação', why: 'Os serviços se comunicam, via barramento.' },
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
      prompt: 'Ordene a história.',
      items: ['Dijkstra e as camadas (1968)', 'Parnas e os módulos (1972)', 'SOLID de Robert C. Martin (por volta de 2000)', 'Microsserviços (2014)'],
      why: 'Da divisão em partes à arquitetura distribuída.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem está ligado a cada ideia?',
      categories: ['Parnas', 'Liskov', 'Lewis e Fowler'],
      items: [
        { text: 'Módulos que escondem decisões', cat: 0, why: '1972.' },
        { text: 'Substituição de subtipos', cat: 1, why: '1987.' },
        { text: 'Microsserviços', cat: 2, why: '2014.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Constantine: coesão e acoplamento', 'Feathers notou o acrônimo SOLID', 'Microsserviços servem para todo sistema'],
      bug: 2,
      why: 'Microsserviços trazem custos que só compensam com escala e equipes suficientes.',
      fixed: 'Microsserviços têm custos e nem sempre compensam',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1968: Dijkstra e as camadas do THE. 1972: Parnas e os módulos que escondem decisões. Anos 1970: Constantine, coesão e acoplamento.',
    '1987: Liskov e a substituição de subtipos. Por volta de 2000: Robert C. Martin e os princípios; Feathers nota o acrônimo SOLID.',
    'Anos 2000: SOA com barramento. 2014: Lewis e Fowler popularizam microsserviços.',
  ],
};

export const esArqEstilos: MicroLesson = {
  ...S,
  id: 'es.arquitetura.2',
  series: { id: 'es.arquitetura', order: 2 },
  title: 'Estilos arquiteturais',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Em microsserviços, o ideal é todos os serviços usarem o mesmo banco de dados?',
    options: [
      { text: 'Não: cada serviço é dono dos seus dados', why: 'Isso. Esta aula compara os estilos.' },
      { text: 'Sim, para facilitar', why: 'Pegadinha: banco compartilhado acopla os serviços.' },
      { text: 'Tanto faz', why: 'Faz diferença: cada serviço deve ter os seus dados.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'camadas',
      part: 'Os estilos',
      title: 'Camadas e SOA',
      art: 'degraus',
      goal: 'Reconhecer o estilo em camadas e a SOA.',
      explain:
        '- **Camadas**: apresentação, negócio e dados; cada camada usa **só a de baixo**. Vantagem: separação de responsabilidades. Cuidado: pode virar um "monólito em camadas" e acrescentar latência;\n- **SOA**: serviços **corporativos reutilizáveis**, com **contratos formais** (muitas vezes SOAP e WSDL), integrados por um **ESB**. Vantagem: reuso e integração com legados. Cuidado: o barramento central vira **gargalo**.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Qual é um cuidado típico da SOA?',
        options: [
          { text: 'O barramento central pode virar gargalo', why: 'Isso.' },
          { text: 'Não permite reuso de serviços', why: 'Reuso é justamente a vantagem da SOA.' },
          { text: 'Proíbe contratos formais', why: 'A SOA usa contratos formais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Num **prédio de três andares**: o térreo atende o público (apresentação), o primeiro analisa (negócio), o subsolo guarda os arquivos (dados). Cada andar só fala com o de baixo. Na SOA, todos os prédios se falam por **uma central telefônica**, que pode congestionar.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'No estilo em camadas, cada camada:',
          options: [
            { text: 'Usa só a camada de baixo', why: 'Isso.' },
            { text: 'Usa qualquer outra livremente', why: 'Isso quebraria a separação.' },
            { text: 'Não se comunica com nenhuma', why: 'Usa a de baixo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'micro',
      part: 'Os estilos',
      title: 'Microsserviços e eventos',
      art: 'rede',
      goal: 'Reconhecer microsserviços e a arquitetura orientada a eventos.',
      explain:
        '- **Microsserviços**: serviços **pequenos e independentes**, cada um com **seus dados**, **implantados separadamente**, falando por APIs leves ou mensagens. Vantagens: escala e implantação independentes, equipes autônomas. Cuidado: **complexidade distribuída** (rede, consistência eventual, observabilidade);\n- **orientada a eventos**: componentes **publicam eventos** e outros **reagem**, via *broker*. Vantagens: baixo acoplamento e assincronia. Cuidado: fluxo difícil de rastrear.',
      check: {
        kind: 'choice',
        id: 'mi-c',
        prompt: 'É característica dos microsserviços:',
        options: [
          { text: 'Serviços pequenos, implantáveis de forma independente, cada um com seus dados', why: 'Isso.' },
          { text: 'Um banco único compartilhado por todos', why: 'Cada serviço é dono dos seus dados.' },
          { text: 'Uma única implantação para o sistema inteiro', why: 'Isso é o monólito.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na arquitetura de **eventos**, pense num **mural de avisos**: quem tem novidade **afixa** ("processo julgado"); quem se interessa **lê e age** (o setor de publicação, o de arquivo). Quem afixou nem precisa saber quem leu.',
        check: {
          kind: 'choice',
          id: 'mi-r',
          prompt: 'Um cuidado típico dos microsserviços é:',
          options: [
            { text: 'A complexidade distribuída: rede, consistência, observabilidade', why: 'Isso.' },
            { text: 'Não poder escalar partes separadamente', why: 'Escalar separadamente é uma vantagem deles.' },
            { text: 'Exigir um ESB central', why: 'ESB é típico da SOA.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'padroes',
      part: 'Padrões associados',
      title: 'Gateway, circuit breaker, saga, CQRS',
      art: 'engrenagem',
      goal: 'Associar cada padrão ao problema que resolve.',
      explain:
        '- **API Gateway**: **porta única** de entrada;\n- **circuit breaker**: **para de chamar** um serviço que está falhando;\n- **saga**: transações distribuídas com **compensação**;\n- **CQRS**: separar **escrita** e **leitura**;\n- ***event sourcing***: guardar a **sequência de eventos** como fonte da verdade.\n\nE lembre: um **monólito bem modular não é erro**.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Qual padrão para de chamar um serviço que está falhando?',
        options: [
          { text: 'Circuit breaker', why: 'Isso.' },
          { text: 'API Gateway', why: 'O gateway é a porta de entrada.' },
          { text: 'CQRS', why: 'CQRS separa escrita e leitura.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **circuit breaker** é o **disjuntor** da sua casa: se um aparelho dá curto, o disjuntor **desarma** para não queimar o resto. Depois de um tempo, tenta religar. A **saga** é o **estorno**: se uma etapa da compra falha, desfazem-se as anteriores.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'A saga lida com transações distribuídas por meio de:',
          options: [
            { text: 'Compensação das etapas já feitas', why: 'Isso.' },
            { text: 'Um banco único com bloqueio global', why: 'A saga evita esse bloqueio distribuído.' },
            { text: 'Ignorar as falhas', why: 'Ela compensa as falhas.' },
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
      prompt: 'Qual estilo cada descrição indica?',
      categories: ['Camadas', 'SOA', 'Microsserviços'],
      items: [
        { text: 'Apresentação, negócio e dados', cat: 0, why: 'Cada uma usa a de baixo.' },
        { text: 'Serviços corporativos ligados por ESB', cat: 1, why: 'Barramento.' },
        { text: 'Cada serviço com seus dados e implantação própria', cat: 2, why: 'Independência.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['API Gateway: porta única', 'Event sourcing: eventos como fonte da verdade', 'Monólito modular é sempre um erro'],
      bug: 2,
      why: 'Um monólito bem modular não é erro; microsserviços têm custos.',
      fixed: 'Monólito modular pode ser a melhor escolha',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma equipe de três pessoas vai fazer um sistema pequeno de agendamento. O que tende a servir melhor?',
      scenarios: [
        { title: 'Opção A', body: 'Um **monólito bem modular**, simples de implantar.' },
        { title: 'Opção B', body: 'Vinte **microsserviços**, cada um com banco próprio.' },
      ],
      answer: 0,
      why: 'Microsserviços só compensam com escala e equipes suficientes; aqui o custo seria maior que o ganho.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.001' }],
  summary: [
    'Camadas: cada uma usa a de baixo. SOA: serviços corporativos e ESB (gargalo).',
    'Microsserviços: pequenos, independentes, com seus dados; custo de complexidade distribuída. Eventos: publicar e reagir via broker.',
    'Padrões: API Gateway, circuit breaker, saga, CQRS, event sourcing. Monólito modular não é erro.',
  ],
};

export const esArqSolid: MicroLesson = {
  ...S,
  id: 'es.arquitetura.3',
  series: { id: 'es.arquitetura', order: 3 },
  title: 'Coesão, acoplamento e SOLID',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma classe calcula valores, formata o PDF e envia o e-mail. Qualquer mudança em uma dessas tarefas mexe na mesma classe. Isso é bom?',
    options: [
      { text: 'Não: ela tem responsabilidades demais', why: 'Isso. Esta aula mostra coesão, acoplamento e os cinco princípios SOLID.' },
      { text: 'Sim: tudo num lugar só é mais fácil', why: 'Fica mais frágil: cada mudança arrisca as outras tarefas.' },
      { text: 'Tanto faz', why: 'Faz diferença na manutenção.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'coesao',
      part: 'Medidas',
      title: 'Alta coesão, baixo acoplamento',
      art: 'balanca',
      goal: 'Distinguir coesão de acoplamento.',
      explain:
        '- **Coesão**: quão relacionadas são as responsabilidades **dentro** de um módulo. Queremos **alta** coesão;\n- **acoplamento**: quanto um módulo **depende** de outro. Queremos **baixo** acoplamento.\n\nRegra de ouro: **alta coesão, baixo acoplamento**. Alto acoplamento **espalha** o efeito das mudanças.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Em projeto de software, recomenda-se buscar:',
        options: [
          { text: 'Alta coesão e baixo acoplamento', why: 'Isso.' },
          { text: 'Baixa coesão e alto acoplamento', why: 'É o inverso do desejável.' },
          { text: 'Alto acoplamento para facilitar a manutenção', why: 'Alto acoplamento espalha as mudanças.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Numa **repartição**, cada setor com **tarefas afins** (todo o protocolo no Protocolo) tem **alta coesão**. Setores que **não dependem** de pedir licença ao outro para trabalhar têm **baixo acoplamento**. É assim que o órgão anda bem.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Acoplamento mede:',
          options: [
            { text: 'Quanto um módulo depende de outro', why: 'Isso.' },
            { text: 'Quão afins são as tarefas dentro do módulo', why: 'Isso é coesão.' },
            { text: 'O tamanho do código', why: 'Mede dependência.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sol',
      part: 'SOLID',
      title: 'S, O e L',
      art: 'livro',
      goal: 'Aplicar responsabilidade única, aberto/fechado e Liskov.',
      explain:
        '- **S, responsabilidade única**: uma classe deve ter **um só motivo para mudar**;\n- **O, aberto/fechado**: **aberto para extensão**, **fechado para modificação**. Evolui-se **acrescentando**, não alterando o que funciona;\n- **L, substituição de Liskov**: **subtipos** devem poder **substituir** o tipo base sem quebrar o comportamento.',
      check: {
        kind: 'choice',
        id: 'so-c',
        prompt: 'A classe que calcula, formata o PDF e envia o e-mail viola qual princípio?',
        options: [
          { text: 'Responsabilidade única', why: 'Isso: tem três motivos para mudar.' },
          { text: 'Inversão de dependência', why: 'O problema central é o excesso de responsabilidades.' },
          { text: 'Segregação de interfaces', why: 'Essa trata de interfaces grandes demais.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte à classe: **"por quantos motivos você pode mudar?"**. Se o cálculo muda, se o layout do PDF muda, se o servidor de e-mail muda: **três motivos**. Separe em três classes, uma para cada.',
        check: {
          kind: 'choice',
          id: 'so-r',
          prompt: '"Aberto/fechado" proíbe evoluir o sistema?',
          options: [
            { text: 'Não: pede que se evolua por extensão', why: 'Isso.' },
            { text: 'Sim, nada pode mudar', why: 'Pegadinha: a evolução vem por extensão.' },
            { text: 'Sim, exceto aos domingos', why: 'Evolui-se por extensão, sempre.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'id',
      part: 'SOLID',
      title: 'I e D',
      art: 'engrenagem',
      goal: 'Aplicar segregação de interfaces e inversão de dependência.',
      explain:
        '- **I, segregação de interfaces**: várias interfaces **específicas** são melhores que **uma geral**. Ninguém deve depender de métodos que **não usa**;\n- **D, inversão de dependência**: dependa de **abstrações**, não de **implementações concretas**.\n\nExemplo do D: o serviço de relatório depende de uma interface "Notificador", e não diretamente da classe "EmailSmtp". Trocar e-mail por mensagem fica fácil.',
      check: {
        kind: 'choice',
        id: 'id-c',
        prompt: '"Dependa de abstrações, não de implementações concretas" é o princípio da:',
        options: [
          { text: 'Inversão de dependência', why: 'Isso.' },
          { text: 'Responsabilidade única', why: 'Essa trata de motivos para mudar.' },
          { text: 'Substituição de Liskov', why: 'Liskov trata de subtipos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma **tomada padrão** é uma abstração: qualquer aparelho com o **plugue certo** funciona. Se a parede tivesse os fios de **um aparelho específico** soldados, trocar o aparelho exigiria quebrar a parede. Dependa da tomada, não do aparelho.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'Uma interface enorme que obriga as classes a implementar métodos que não usam viola:',
          options: [
            { text: 'A segregação de interfaces', why: 'Isso.' },
            { text: 'O aberto/fechado', why: 'Esse trata de evoluir por extensão.' },
            { text: 'Nenhum princípio', why: 'Viola a segregação de interfaces.' },
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
      prompt: 'Qual letra do SOLID cada frase resume?',
      categories: ['S', 'O', 'D'],
      items: [
        { text: 'Um só motivo para mudar', cat: 0, why: 'Responsabilidade única.' },
        { text: 'Estender sem modificar', cat: 1, why: 'Aberto/fechado.' },
        { text: 'Depender de abstrações', cat: 2, why: 'Inversão de dependência.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['L: subtipos substituem o tipo base', 'I: interfaces específicas', 'Alto acoplamento facilita a manutenção'],
      bug: 2,
      why: 'Alto acoplamento espalha o efeito das mudanças.',
      fixed: 'Baixo acoplamento facilita a manutenção',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O órgão quer trocar o envio de avisos por e-mail por avisos no aplicativo. Qual desenho facilita?',
      scenarios: [
        { title: 'Opção A', body: 'O serviço depende de uma **interface Notificador**, com uma implementação por canal.' },
        { title: 'Opção B', body: 'O serviço chama direto a classe **EmailSmtp** em vinte lugares.' },
      ],
      answer: 0,
      why: 'Com a abstração, basta uma nova implementação; é a inversão de dependência.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.003' },
  ],
  summary: [
    'Alta coesão (tarefas afins dentro do módulo) e baixo acoplamento (pouca dependência entre módulos).',
    'S: um motivo para mudar. O: aberto para extensão, fechado para modificação. L: subtipos substituem o base.',
    'I: interfaces específicas. D: dependa de abstrações.',
  ],
};

export const esArqPrincipios: MicroLesson = {
  ...S,
  id: 'es.arquitetura.4',
  series: { id: 'es.arquitetura', order: 4 },
  title: 'DRY, KISS e YAGNI',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um desenvolvedor prepara o sistema para "todos os cenários que um dia podem surgir", sem nenhuma demanda atual. É boa prática?',
    options: [
      { text: 'Não: contraria o YAGNI', why: 'Isso. Esta aula mostra DRY, KISS e YAGNI.' },
      { text: 'Sim: prevenir é sempre melhor', why: 'Código sem demanda custa e atrapalha; contraria o YAGNI.' },
      { text: 'Sim, é exigido pelo SOLID', why: 'O SOLID não pede isso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'dry',
      part: 'Princípios',
      title: 'DRY: não se repita',
      art: 'revisao',
      goal: 'Aplicar o DRY.',
      explain:
        '**DRY** (*Don\'t Repeat Yourself*, não se repita): cada **conhecimento** deve ter uma **representação única** no sistema.\n\nSe a regra do prazo de recurso está **copiada** em cinco telas, quando a lei mudar alguém vai esquecer uma. Com a regra num **lugar só**, muda-se uma vez.',
      check: {
        kind: 'choice',
        id: 'dr-c',
        prompt: 'A mesma regra de cálculo de multa copiada em cinco lugares viola:',
        options: [
          { text: 'DRY', why: 'Isso.' },
          { text: 'YAGNI', why: 'YAGNI trata de construir o que não é necessário.' },
          { text: 'KISS', why: 'KISS trata de simplicidade.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **endereço** que você deixou em cinco cadastros: ao se mudar, precisa atualizar os cinco, e sempre sobra um errado. Se todos consultassem **um cadastro único**, bastaria mudar uma vez.',
        check: {
          kind: 'choice',
          id: 'dr-r',
          prompt: 'DRY significa:',
          options: [
            { text: 'Não se repita', why: 'Isso.' },
            { text: 'Faça o mais simples', why: 'Isso é o KISS.' },
            { text: 'Você não vai precisar disso', why: 'Isso é o YAGNI.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'kiss',
      part: 'Princípios',
      title: 'KISS: mantenha simples',
      art: 'alvo',
      goal: 'Aplicar o KISS.',
      explain:
        '**KISS** (*Keep It Simple, Stupid*): prefira a **solução mais simples que funcione**.\n\nComplexidade sem necessidade traz mais **defeitos**, mais tempo para **entender** e mais custo de **manutenção**. Uma solução simples e clara é mais fácil de testar e de mudar depois.',
      check: {
        kind: 'choice',
        id: 'ki-c',
        prompt: 'O KISS recomenda:',
        options: [
          { text: 'A solução mais simples que funcione', why: 'Isso.' },
          { text: 'A solução mais sofisticada possível', why: 'É o contrário.' },
          { text: 'Nunca usar bibliotecas', why: 'Não é isso: trata de simplicidade.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Para **pendurar um quadro**, um prego basta. Montar um sistema de trilhos, motores e controle remoto também pendura o quadro, mas quebra mais, custa mais e ninguém entende. KISS é escolher o prego.',
        check: {
          kind: 'choice',
          id: 'ki-r',
          prompt: 'Complexidade desnecessária tende a:',
          options: [
            { text: 'Aumentar defeitos e custo de manutenção', why: 'Isso.' },
            { text: 'Reduzir defeitos', why: 'Mais complexidade, mais chance de erro.' },
            { text: 'Não afetar nada', why: 'Afeta compreensão, testes e manutenção.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'yagni',
      part: 'Princípios',
      title: 'YAGNI: você não vai precisar',
      art: 'vazio',
      goal: 'Aplicar o YAGNI.',
      explain:
        '**YAGNI** (*You Aren\'t Gonna Need It*): **não implemente o que ainda não é necessário**.\n\nParâmetros de configuração, camadas genéricas e suporte a vários bancos "**para o caso de um dia ser preciso**", sem demanda atual, custam **tempo**, criam **código para manter** e muitas vezes **nunca** são usados.\n\nQuando a necessidade surgir de verdade, implementa-se, com a informação certa.',
      check: {
        kind: 'choice',
        id: 'ya-c',
        prompt: 'Criar suporte a vários bancos "para o caso de um dia ser preciso", sem demanda, contraria:',
        options: [
          { text: 'YAGNI', why: 'Isso.' },
          { text: 'DRY', why: 'DRY trata de repetição.' },
          { text: 'Responsabilidade única', why: 'O problema é construir sem necessidade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como **comprar uma garagem para três carros** quando você não tem carro nem planos concretos de ter. Paga-se IPTU, limpa-se, mantém-se, e talvez nunca se use. YAGNI: construa quando precisar.',
        check: {
          kind: 'choice',
          id: 'ya-r',
          prompt: 'YAGNI recomenda preparar o código para todos os cenários futuros?',
          options: [
            { text: 'Não: recomenda o contrário', why: 'Isso.' },
            { text: 'Sim', why: 'Pegadinha: YAGNI diz para não fazer isso.' },
            { text: 'Só em microsserviços', why: 'Vale para qualquer código.' },
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
      prompt: 'Qual princípio cada situação fere?',
      categories: ['DRY', 'KISS', 'YAGNI'],
      items: [
        { text: 'Mesma regra copiada em cinco telas', cat: 0, why: 'Repetição.' },
        { text: 'Solução cheia de camadas para um problema simples', cat: 1, why: 'Complexidade desnecessária.' },
        { text: 'Funções prontas que ninguém pediu', cat: 2, why: 'Sem necessidade atual.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['DRY: representação única', 'KISS: solução mais simples que funcione', 'YAGNI: preparar tudo para o futuro'],
      bug: 2,
      why: 'YAGNI recomenda não implementar o que ainda não é necessário.',
      fixed: 'YAGNI: só o que é necessário agora',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A regra do prazo de recurso aparece em várias telas. Qual correção?',
      scenarios: [
        { title: 'Opção A', body: 'Centralizar a regra numa **função única**, usada por todas as telas.' },
        { title: 'Opção B', body: 'Manter as cópias e anotar onde estão.' },
      ],
      answer: 0,
      why: 'Com uma representação única (DRY), a mudança da lei é feita uma vez.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.004' }],
  summary: [
    'DRY: cada conhecimento com representação única.',
    'KISS: a solução mais simples que funcione.',
    'YAGNI: não implementar o que ainda não é necessário.',
  ],
};
