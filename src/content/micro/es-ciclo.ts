// Série "Ciclo de vida e métodos" (cap.es.01, trecho ciclo), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta da conferência de 1968 ao Manifesto Ágil; as seguintes ensinam as
// abordagens de ciclo de vida, Kanban e Lean, e XP com TDD, uma ideia por etapa. Fatos conferidos com
// o texto do capítulo (01-ciclo.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.es.01', sectionId: 'ciclo' } as const;

export const esCicHistoria: MicroLesson = {
  ...S,
  id: 'es.ciclo.1',
  series: { id: 'es.ciclo', order: 1 },
  title: 'Da crise do software ao Manifesto Ágil',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Projetos de software atrasados, caros e cheios de defeitos são um problema novo?',
    options: [
      { text: 'Não: já preocupavam nos anos 1960', why: 'Isso. Foi por isso que nasceu a engenharia de software. Esta aula conta essa história.' },
      { text: 'Sim, só começou com a internet', why: 'O problema já era discutido em 1968.' },
      { text: 'Não existem projetos assim', why: 'Existem, e desde cedo motivaram métodos de trabalho.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'crise',
      part: 'A história',
      title: '1968: a engenharia de software',
      art: 'professores',
      goal: 'Saber de onde vem o termo engenharia de software.',
      explain:
        'Nos anos 1960, os computadores ficaram mais potentes, e os programas, maiores. Muitos projetos **atrasavam**, **estouravam o orçamento** e **falhavam**. Falava-se numa "**crise do software**".\n\nEm **1968**, uma conferência da **OTAN** na Alemanha popularizou o termo **engenharia de software**: tratar o desenvolvimento com a disciplina de uma engenharia.\n\nHoje, ela é a abordagem **sistemática, disciplinada e quantificável** de desenvolver, operar e manter software.',
      check: {
        kind: 'choice',
        id: 'cr-c',
        prompt: 'Por que surgiu a engenharia de software?',
        options: [
          { text: 'Para enfrentar projetos atrasados, caros e falhos', why: 'Isso: a crise do software.' },
          { text: 'Para fabricar computadores', why: 'Isso é engenharia de hardware.' },
          { text: 'Para substituir os programadores', why: 'O objetivo era dar disciplina ao trabalho.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na **construção civil**, ninguém ergue um prédio sem planta, cálculo e fiscalização. Em 1968, os especialistas propuseram tratar o software **do mesmo jeito**: com método, medição e disciplina, como uma engenharia.',
        check: {
          kind: 'choice',
          id: 'cr-r',
          prompt: 'Em que ano uma conferência da OTAN popularizou o termo?',
          options: [
            { text: '1968', why: 'Isso.' },
            { text: '2001', why: '2001 é o Manifesto Ágil.' },
            { text: '1991', why: '1991 é o ano da Web e do Python.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'modelos',
      part: 'A história',
      title: '1970 e 1986: cascata e espiral',
      art: 'degraus',
      goal: 'Situar o modelo cascata e o espiral.',
      explain:
        'Em **1970**, **Winston Royce** publicou um artigo que descrevia as fases **em sequência**: requisitos, projeto, implementação, testes. A leitura mais rígida dessa sequência ficou conhecida como **cascata**. O próprio Royce já alertava para os riscos de seguir sem voltar atrás.\n\nEm **1986**, **Barry Boehm** propôs o **modelo espiral**: ciclos repetidos, com **análise de riscos** explícita antes de avançar.',
      check: {
        kind: 'choice',
        id: 'mo-c',
        prompt: 'O que caracteriza o modelo espiral de Boehm?',
        options: [
          { text: 'Ciclos repetidos com análise de riscos', why: 'Isso.' },
          { text: 'Fases em sequência, sem volta', why: 'Isso é a cascata.' },
          { text: 'Ausência de planejamento', why: 'O espiral planeja cada ciclo, olhando os riscos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **cascata** é a água que **só desce**: de uma fase para a outra, sem subir. A **espiral** é uma **escada em caracol**: a cada volta, você passa pelos mesmos pontos (planejar, avaliar riscos, construir, avaliar), mas mais alto.',
        check: {
          kind: 'choice',
          id: 'mo-r',
          prompt: 'Quem propôs o modelo espiral?',
          options: [
            { text: 'Barry Boehm', why: 'Isso, em 1986.' },
            { text: 'Winston Royce', why: 'Royce é do artigo de 1970, ligado à cascata.' },
            { text: 'Kent Beck', why: 'Kent Beck é do XP.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'agil',
      part: 'A história',
      title: 'Anos 1990 e 2001: o ágil',
      art: 'trilha',
      goal: 'Saber de onde vieram o XP, o Lean e o Manifesto Ágil.',
      explain:
        'Nos anos **1990**, surgiram métodos mais leves. **Kent Beck** organizou o **Extreme Programming** (XP), com práticas como programação em par e testes antes do código.\n\nEm **2001**, dezessete desenvolvedores reunidos em **Snowbird**, nos Estados Unidos, escreveram o **Manifesto Ágil**: pessoas, software funcionando, colaboração com o cliente e resposta a mudanças.\n\nEm **2003**, **Mary e Tom Poppendieck** levaram o pensamento enxuto da **Toyota** ao software: o **Lean**.',
      check: {
        kind: 'order',
        id: 'ag-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Conferência da OTAN (1968)', 'Artigo de Royce (1970)', 'Modelo espiral (1986)', 'Manifesto Ágil (2001)'],
        why: 'Da crise do software ao ágil.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **viagem**: a cascata compra **todas as passagens** antes de sair. O ágil compra **um trecho de cada vez** e decide o próximo vendo como foi o anterior. O Manifesto de 2001 deu nome a esse jeito de viajar.',
        check: {
          kind: 'choice',
          id: 'ag-r',
          prompt: 'De onde vem o pensamento do Lean?',
          options: [
            { text: 'Da produção enxuta da Toyota', why: 'Isso.' },
            { text: 'Da OTAN', why: 'A OTAN está ligada ao termo engenharia de software.' },
            { text: 'Do modelo cascata', why: 'O Lean vem da Toyota.' },
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
      items: ['Engenharia de software (1968)', 'Espiral de Boehm (1986)', 'Manifesto Ágil (2001)', 'Lean Software Development (2003)'],
      why: 'Da disciplina aos métodos ágeis e enxutos.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem está ligado a cada ideia?',
      categories: ['Boehm', 'Kent Beck', 'Poppendieck'],
      items: [
        { text: 'Modelo espiral', cat: 0, why: '1986.' },
        { text: 'Extreme Programming', cat: 1, why: 'Anos 1990.' },
        { text: 'Lean Software Development', cat: 2, why: '2003.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Espiral: ciclos com análise de riscos', 'Manifesto Ágil: 2001', 'Royce defendeu seguir as fases sem nunca voltar'],
      bug: 2,
      why: 'Royce já alertava para os riscos de seguir em sequência sem voltar.',
      fixed: 'Royce alertou para os riscos da sequência rígida',
      errorKind: 'leitura',
    },
  ],
  exam: [],
  summary: [
    '1968: conferência da OTAN populariza o termo engenharia de software, diante da crise do software.',
    '1970: artigo de Winston Royce, ligado à cascata. 1986: modelo espiral de Barry Boehm, orientado a riscos.',
    'Anos 1990: XP de Kent Beck. 2001: Manifesto Ágil, em Snowbird. 2003: Lean, dos Poppendieck.',
  ],
};

export const esCicAbordagens: MicroLesson = {
  ...S,
  id: 'es.ciclo.2',
  series: { id: 'es.ciclo', order: 2 },
  title: 'Abordagens de ciclo de vida',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Iterativo" e "incremental" são a mesma coisa?',
    options: [
      { text: 'Não: um refina, o outro acrescenta', why: 'Isso. Esta aula mostra a diferença e as outras abordagens.' },
      { text: 'Sim, são sinônimos', why: 'Pegadinha: iterativo refaz para melhorar; incremental soma partes prontas.' },
      { text: 'Iterativo é o mesmo que cascata', why: 'A cascata é sequencial; o iterativo repete ciclos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'preditiva',
      part: 'As abordagens',
      title: 'Preditiva, iterativa e incremental',
      art: 'degraus',
      goal: 'Distinguir as abordagens preditiva, iterativa e incremental.',
      explain:
        '- **Preditiva** (cascata): fases **em sequência**, escopo definido **no início**. Funciona com requisitos **estáveis** e exigência regulatória forte;\n- **iterativa**: repete ciclos para **refinar** a solução a partir de *feedback*;\n- **incremental**: entrega o produto em **partes funcionais** que **se somam**.\n\nIterativo é **refazer para melhorar**; incremental é **acrescentar pedaços prontos**.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'A equipe entrega o cadastro pronto, depois a consulta, depois os relatórios, um somando-se ao outro. Isso é:',
        options: [
          { text: 'Incremental', why: 'Isso: partes funcionais que se somam.' },
          { text: 'Iterativo', why: 'Iterativo é refinar a mesma solução em ciclos.' },
          { text: 'Preditivo', why: 'O preditivo entrega tudo no fim.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **retrato**. **Iterativo** é desenhar o rosto inteiro em rascunho e ir **melhorando** a cada passada. **Incremental** é pintar **primeiro os olhos, prontos**, depois o nariz, depois a boca, cada parte já acabada.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Quando a abordagem preditiva funciona bem?',
          options: [
            { text: 'Com requisitos estáveis e bem conhecidos', why: 'Isso.' },
            { text: 'Com requisitos que mudam toda semana', why: 'Esse cenário pede abordagens adaptativas.' },
            { text: 'Nunca', why: 'Funciona bem com requisitos estáveis.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'agil',
      part: 'As abordagens',
      title: 'Adaptativa e híbrida',
      art: 'engrenagem',
      goal: 'Reconhecer a abordagem adaptativa e a híbrida.',
      explain:
        '- **Adaptativa** ou **ágil**: **iterativa e incremental ao mesmo tempo**, com ciclos curtos, envolvimento do cliente e adaptação contínua. Boa quando o ambiente muda e o produto evolui;\n- **híbrida**: **combina** as anteriores, como contrato e marcos preditivos com entregas ágeis. É comum em **organizações públicas**.\n\nO modelo cascata **não é proibido** no setor público: serve quando os requisitos são estáveis.',
      check: {
        kind: 'choice',
        id: 'ag-c',
        prompt: 'A abordagem ágil é:',
        options: [
          { text: 'Iterativa e incremental, com ciclos curtos', why: 'Isso.' },
          { text: 'Só incremental, sem feedback', why: 'O ágil também refina com feedback.' },
          { text: 'Sequencial, com escopo fixo', why: 'Isso é a preditiva.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O ágil junta os dois retratos: a cada ciclo curto, entrega **uma parte pronta** (incremental) **e** ajusta o que já fez com base no que o cliente disse (iterativo). A híbrida mistura isso com marcos fixos de contrato.',
        check: {
          kind: 'choice',
          id: 'ag-r',
          prompt: 'Contrato com marcos fixos e entregas em sprints é uma abordagem:',
          options: [
            { text: 'Híbrida', why: 'Isso: combina preditiva e ágil.' },
            { text: 'Puramente preditiva', why: 'As sprints trazem o lado ágil.' },
            { text: 'Puramente ágil', why: 'Os marcos fixos trazem o lado preditivo.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'espiralv',
      part: 'Modelos clássicos',
      title: 'Espiral e modelo em V',
      art: 'alvo',
      goal: 'Reconhecer o espiral e o modelo em V.',
      explain:
        'Dois modelos que caem em prova:\n\n- **espiral** (Boehm): **iterativo** e orientado a **riscos**. Cada volta analisa os riscos antes de avançar;\n- **modelo em V**: associa cada fase de **especificação** a um **nível de teste**. Requisitos ligam-se ao teste de aceitação; o projeto, ao teste de integração; o detalhamento, ao teste de unidade.',
      check: {
        kind: 'choice',
        id: 'ev-c',
        prompt: 'O modelo organizado em ciclos que incluem a análise de riscos antes de avançar é o:',
        options: [
          { text: 'Espiral', why: 'Isso, de Boehm.' },
          { text: 'Em V', why: 'O V liga especificação e testes.' },
          { text: 'Cascata', why: 'A cascata não tem ciclos de risco.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Desenhe a letra **V**: do lado **esquerdo**, você **desce** especificando (requisitos, projeto, detalhes); do lado **direito**, **sobe** testando, e cada teste fica **na mesma altura** da especificação que ele confere.',
        check: {
          kind: 'choice',
          id: 'ev-r',
          prompt: 'No modelo em V, os requisitos se ligam a qual teste?',
          options: [
            { text: 'Teste de aceitação', why: 'Isso.' },
            { text: 'Teste de unidade', why: 'O de unidade se liga ao projeto detalhado.' },
            { text: 'Nenhum', why: 'Cada fase tem o seu nível de teste.' },
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
      prompt: 'Qual abordagem cada situação descreve?',
      categories: ['Iterativa', 'Incremental', 'Preditiva'],
      items: [
        { text: 'Refazer o protótipo a cada rodada de feedback', cat: 0, why: 'Refina.' },
        { text: 'Entregar módulo por módulo, cada um pronto', cat: 1, why: 'Acrescenta.' },
        { text: 'Fases em sequência com escopo fechado no início', cat: 2, why: 'Cascata.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Espiral: orientado a riscos', 'Em V: especificação ligada a testes', 'Cascata: proibida no setor público'],
      bug: 2,
      why: 'Não é proibida: serve quando os requisitos são estáveis.',
      fixed: 'Cascata: útil com requisitos estáveis',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um sistema de folha de pagamento segue uma lei detalhada, que não muda há anos. Qual abordagem tende a servir?',
      scenarios: [
        { title: 'Opção A', body: '**Preditiva**: os requisitos são estáveis e bem conhecidos.' },
        { title: 'Opção B', body: '**Sem planejamento**: começar a programar e ver no que dá.' },
      ],
      answer: 0,
      why: 'Requisitos estáveis e regulados combinam com a abordagem preditiva.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.002' },
  ],
  summary: [
    'Preditiva (cascata): sequencial, escopo inicial; requisitos estáveis.',
    'Iterativa refina; incremental acrescenta. Ágil: as duas, em ciclos curtos. Híbrida: combina.',
    'Espiral (Boehm): iterativo, orientado a riscos. Em V: cada especificação ligada a um nível de teste.',
  ],
};

export const esCicKanban: MicroLesson = {
  ...S,
  id: 'es.ciclo.3',
  series: { id: 'es.ciclo', order: 3 },
  title: 'Kanban e Lean',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O Kanban exige sprints de duração fixa?',
    options: [
      { text: 'Não: ele gerencia um fluxo contínuo', why: 'Isso. Esta aula mostra o Kanban e o Lean.' },
      { text: 'Sim, de duas semanas', why: 'Sprints são do Scrum; o Kanban trabalha com fluxo.' },
      { text: 'Sim, de um mês', why: 'O Kanban não tem iterações obrigatórias.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'kanban',
      part: 'Kanban',
      title: 'Gerenciar o fluxo',
      art: 'trilha',
      goal: 'Conhecer as práticas do Kanban.',
      explain:
        'O **Kanban** é um método de gestão do **fluxo**:\n\n- **visualizar** o trabalho num quadro;\n- **limitar o trabalho em progresso** (**WIP**);\n- **gerenciar** o fluxo;\n- **explicitar** as políticas;\n- **melhorar** continuamente.\n\n**Não há papéis nem iterações obrigatórias**. O limite de WIP evita começar muita coisa e terminar pouca.',
      check: {
        kind: 'choice',
        id: 'kb-c',
        prompt: 'Para que serve o limite de WIP?',
        options: [
          { text: 'Evitar muito trabalho começado e pouco terminado', why: 'Isso.' },
          { text: 'Fixar a duração da sprint', why: 'O Kanban não tem sprints.' },
          { text: 'Definir os papéis da equipe', why: 'O Kanban não define papéis obrigatórios.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cartório** com três balcões: se cada servidor aceitar dez processos ao mesmo tempo, nenhum sai. Com um **limite** ("no máximo dois por vez"), cada um termina antes de pegar o próximo, e a fila anda.',
        check: {
          kind: 'choice',
          id: 'kb-r',
          prompt: 'O que significa WIP?',
          options: [
            { text: 'Trabalho em progresso', why: 'Isso: work in progress.' },
            { text: 'Papel do gerente', why: 'WIP é a quantidade de trabalho em andamento.' },
            { text: 'Duração da iteração', why: 'O Kanban não tem iteração obrigatória.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'metricas',
      part: 'Kanban',
      title: 'Lead time, cycle time e vazão',
      art: 'calendario',
      goal: 'Distinguir lead time, cycle time e vazão.',
      explain:
        'Três métricas típicas:\n\n- **lead time**: do **pedido** à entrega;\n- **cycle time**: do **início do trabalho** à entrega;\n- **vazão**: **itens por período**.\n\nO lead time é sempre **maior ou igual** ao cycle time, porque inclui a **espera** antes de o trabalho começar.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'Um pedido chegou dia 1, o trabalho começou dia 5 e terminou dia 8. O cycle time é:',
        options: [
          { text: '3 dias', why: 'Isso: do início (5) à entrega (8).' },
          { text: '7 dias', why: 'Esse é o lead time, desde o pedido.' },
          { text: '4 dias', why: 'Foi a espera antes de começar.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na **pizzaria**: o **lead time** conta do momento em que você **liga** até a pizza chegar. O **cycle time** conta só do momento em que o pizzaiolo **começa a montar**. A vazão é **quantas pizzas** saem por hora.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Itens entregues por semana é uma medida de:',
          options: [
            { text: 'Vazão', why: 'Isso.' },
            { text: 'Lead time', why: 'Lead time é tempo, não quantidade.' },
            { text: 'Cycle time', why: 'Cycle time é tempo, não quantidade.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'lean',
      part: 'Lean',
      title: 'Os sete princípios e os desperdícios',
      art: 'vazio',
      goal: 'Reconhecer os princípios e os desperdícios do Lean.',
      explain:
        'Os sete princípios do **Lean Software Development**: **eliminar desperdícios**; construir com qualidade; criar conhecimento; **adiar compromissos** (decidir no último momento responsável); entregar rápido; respeitar as pessoas; otimizar o todo.\n\n**Desperdícios** típicos: funcionalidades que **ninguém usa**, trabalho **parcialmente feito**, **troca de contexto**, **espera**, **defeitos** e repasses desnecessários.',
      check: {
        kind: 'choice',
        id: 'le-c',
        prompt: 'Funcionalidades que ninguém usa e esperas por aprovação são, no Lean:',
        options: [
          { text: 'Desperdícios', why: 'Isso.' },
          { text: 'Boas práticas', why: 'Não agregam valor: são desperdício.' },
          { text: 'Métricas de vazão', why: 'Vazão é itens por período.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Olhe para cada coisa e pergunte: **isso entrega valor a quem usa?** Uma tela que ninguém abre, um relatório parado esperando assinatura, um defeito a corrigir: nada disso entrega valor. É desperdício.',
        check: {
          kind: 'choice',
          id: 'le-r',
          prompt: '"Adiar compromissos" no Lean significa:',
          options: [
            { text: 'Decidir no último momento responsável', why: 'Isso: com mais informação.' },
            { text: 'Nunca decidir', why: 'Decide-se, mas no momento certo.' },
            { text: 'Atrasar entregas de propósito', why: 'O Lean quer entregar rápido.' },
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
      prompt: 'Cada item é de Kanban ou de Lean?',
      categories: ['Kanban', 'Lean'],
      items: [
        { text: 'Limitar o WIP', cat: 0, why: 'Prática do Kanban.' },
        { text: 'Visualizar o trabalho no quadro', cat: 0, why: 'Prática do Kanban.' },
        { text: 'Eliminar desperdícios', cat: 1, why: 'Princípio do Lean.' },
        { text: 'Adiar compromissos', cat: 1, why: 'Princípio do Lean.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Lead time: do pedido à entrega', 'Cycle time: do início à entrega', 'Kanban: sprints de duração fixa'],
      bug: 2,
      why: 'O Kanban trabalha com fluxo contínuo, sem iterações obrigatórias.',
      fixed: 'Kanban: fluxo contínuo',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A equipe começa muitas demandas e termina poucas. O que o Kanban sugere?',
      scenarios: [
        { title: 'Opção A', body: '**Limitar o WIP** em cada coluna do quadro.' },
        { title: 'Opção B', body: 'Começar ainda mais demandas para mostrar serviço.' },
      ],
      answer: 0,
      why: 'Com limite de trabalho em progresso, a equipe termina antes de começar outra coisa.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.005' }],
  summary: [
    'Kanban: visualizar, limitar o WIP, gerenciar o fluxo, explicitar políticas, melhorar; sem papéis nem iterações obrigatórias.',
    'Lead time (pedido à entrega) ≥ cycle time (início à entrega). Vazão: itens por período.',
    'Lean: sete princípios, como eliminar desperdícios e adiar compromissos. Desperdícios: o que não usa, parcial, espera, defeitos.',
  ],
};

export const esCicXp: MicroLesson = {
  ...S,
  id: 'es.ciclo.4',
  series: { id: 'es.ciclo', order: 4 },
  title: 'XP e TDD',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No TDD, o teste é escrito antes ou depois do código?',
    options: [
      { text: 'Antes', why: 'Isso. Esta aula mostra o XP e o ciclo do TDD.' },
      { text: 'Depois', why: 'Pegadinha: no TDD, o teste vem primeiro.' },
      { text: 'Não há testes', why: 'O TDD é guiado por testes.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'valores',
      part: 'XP',
      title: 'Os valores do XP',
      art: 'pessoal',
      goal: 'Conhecer os cinco valores do XP.',
      explain:
        'O **Extreme Programming** (XP) tem cinco **valores**:\n\n- **comunicação**;\n- **simplicidade**;\n- ***feedback***;\n- **coragem**;\n- **respeito**.\n\nOs valores orientam as **práticas**: fazer o mais simples que funciona, mostrar cedo ao cliente, ter coragem de refatorar e respeitar a equipe.',
      check: {
        kind: 'multi',
        id: 'va-c',
        prompt: 'Quais são valores do XP? Marque todos.',
        options: [
          { text: 'Simplicidade', correct: true, why: 'Isso.' },
          { text: 'Coragem', correct: true, why: 'Isso.' },
          { text: 'Feedback', correct: true, why: 'Isso.' },
          { text: 'Burocracia', correct: false, why: 'O XP busca o contrário: leveza.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **equipe de resgate**: **comunicam-se** o tempo todo, fazem o **simples** que funciona, **conferem** o resultado a cada passo, têm **coragem** de mudar o plano e **respeitam** cada membro. São os cinco valores do XP.',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: 'Quantos valores o XP tem?',
          options: [
            { text: 'Cinco', why: 'Isso.' },
            { text: 'Sete', why: 'Sete são os princípios do Lean.' },
            { text: 'Doze', why: 'Doze são os princípios do Manifesto Ágil.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'praticas',
      part: 'XP',
      title: 'As práticas mais cobradas',
      art: 'engrenagem',
      goal: 'Reconhecer as práticas do XP.',
      explain:
        'Práticas do XP que mais caem:\n\n- **programação em par**;\n- **TDD** (teste antes do código);\n- **integração contínua**;\n- **refatoração** e **design simples**;\n- **pequenas entregas**;\n- **propriedade coletiva** do código e padrões de codificação;\n- **ritmo sustentável**;\n- **cliente presente** e jogo do planejamento.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Qual destas é uma prática do XP?',
        options: [
          { text: 'Programação em par', why: 'Isso.' },
          { text: 'Horas extras permanentes', why: 'O XP pede ritmo sustentável.' },
          { text: 'Código com dono exclusivo', why: 'O XP pede propriedade coletiva.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **programação em par**, um digita e o outro **revisa em tempo real**, como piloto e copiloto. **Propriedade coletiva** quer dizer que qualquer um pode melhorar qualquer parte. **Ritmo sustentável** quer dizer sem viradas de noite.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: '"Ritmo sustentável" no XP significa:',
          options: [
            { text: 'Trabalhar sem sobrecarga contínua', why: 'Isso.' },
            { text: 'Trabalhar o máximo de horas possível', why: 'É o contrário.' },
            { text: 'Entregar só uma vez por ano', why: 'O XP prefere pequenas entregas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tdd',
      part: 'TDD',
      title: 'Vermelho, verde, refatorar',
      art: 'interruptor',
      goal: 'Seguir o ciclo do TDD.',
      explain:
        'O ciclo do **TDD**:\n\n1. **vermelho**: escreve-se um teste que **falha**;\n2. **verde**: faz-se o **mínimo** para ele passar;\n3. **refatorar**: melhora-se o código **mantendo** os testes verdes.\n\nE recomeça com o próximo teste. O teste vem **antes** do código, e é ele que guia o que será escrito.',
      check: {
        kind: 'choice',
        id: 'td-c',
        prompt: 'Depois de fazer o teste passar com o mínimo, o próximo passo é:',
        options: [
          { text: 'Refatorar, mantendo os testes verdes', why: 'Isso.' },
          { text: 'Apagar o teste', why: 'O teste fica, para proteger o código.' },
          { text: 'Escrever todo o sistema de uma vez', why: 'O TDD avança em passos pequenos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **semáforo** que você mesmo controla: primeiro acende o **vermelho** de propósito (o teste falha, porque o código ainda não existe). Faz o mínimo para acender o **verde**. Depois **arruma** o caminho sem deixar o sinal voltar ao vermelho.',
        check: {
          kind: 'order',
          id: 'td-r',
          prompt: 'Ordene o ciclo do TDD.',
          items: ['Escrever um teste que falha', 'Fazer o mínimo para passar', 'Refatorar mantendo os testes verdes'],
          why: 'Vermelho, verde, refatorar.',
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Cada item é valor ou prática do XP?',
      categories: ['Valor', 'Prática'],
      items: [
        { text: 'Coragem', cat: 0, why: 'Um dos cinco valores.' },
        { text: 'Respeito', cat: 0, why: 'Um dos cinco valores.' },
        { text: 'Programação em par', cat: 1, why: 'Prática.' },
        { text: 'Integração contínua', cat: 1, why: 'Prática.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['TDD: vermelho, verde, refatorar', 'XP: propriedade coletiva do código', 'TDD: testes escritos depois do código'],
      bug: 2,
      why: 'No TDD, o teste vem antes do código.',
      fixed: 'TDD: testes escritos antes do código',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O teste novo acabou de passar, mas o código ficou repetitivo. O que fazer no TDD?',
      scenarios: [
        { title: 'Opção A', body: '**Refatorar**, rodando os testes para que continuem verdes.' },
        { title: 'Opção B', body: 'Deixar como está e nunca mexer, para não quebrar.' },
      ],
      answer: 0,
      why: 'O terceiro passo do ciclo é refatorar, protegido pelos testes.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.004' },
  ],
  summary: [
    'XP: valores de comunicação, simplicidade, feedback, coragem e respeito.',
    'Práticas: par, TDD, integração contínua, refatoração, design simples, pequenas entregas, propriedade coletiva, ritmo sustentável, cliente presente.',
    'TDD: vermelho (teste falha), verde (mínimo para passar), refatorar (com testes verdes).',
  ],
};
