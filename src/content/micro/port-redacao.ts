// Série "Redação oficial" (cap.port.02, trecho redacao-oficial), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta as edições do Manual de Redação da Presidência e o Decreto nº
// 9.758/2019; as seguintes ensinam os atributos, os pronomes de tratamento e fechos e o padrão ofício,
// uma ideia por etapa. Fatos conferidos com o texto do capítulo (04-redacao-oficial.md), respeitando
// as notas de fonte dele. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.02', sectionId: 'redacao-oficial' } as const;

export const portRedHistoria: MicroLesson = {
  ...S,
  id: 'port.redacao.1',
  series: { id: 'port.redacao', order: 1 },
  title: 'A história do Manual de Redação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um ofício de um ministério e outro de um tribunal costumam ter a mesma cara. Por quê?',
    options: [
      { text: 'Porque seguem um manual de padronização', why: 'Isso: o Manual de Redação da Presidência da República. Esta aula conta a história dele.' },
      { text: 'Por coincidência', why: 'Há um padrão escrito, usado como referência.' },
      { text: 'Porque são escritos pela mesma pessoa', why: 'São órgãos diferentes; o padrão vem do Manual.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'manual',
      part: 'A história',
      title: '1991: a primeira edição',
      art: 'livro',
      goal: 'Saber que o Manual existe desde 1991.',
      explain:
        'Em **1991**, a Presidência da República publicou a **primeira edição** do **Manual de Redação da Presidência da República**.\n\nO objetivo era **padronizar** as comunicações do poder público: mesma linguagem formal, mesmos pronomes de tratamento, mesma forma de documento.\n\nRegras tradicionais, como os **fechos** "Respeitosamente" e "Atenciosamente", vêm dessa época.',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'Para que o Manual foi criado?',
        options: [
          { text: 'Padronizar as comunicações do poder público', why: 'Isso.' },
          { text: 'Ensinar literatura', why: 'O foco é a comunicação oficial.' },
          { text: 'Criar leis', why: 'O Manual orienta a redação; não cria leis.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **uniforme**: não importa o órgão, o documento "veste" a mesma roupa, com a mesma linguagem e o mesmo formato. O Manual de 1991 desenhou esse uniforme.',
        check: {
          kind: 'choice',
          id: 'ma-r',
          prompt: 'Em que ano saiu a primeira edição do Manual?',
          options: [
            { text: '1991', why: 'Isso.' },
            { text: '2018', why: '2018 é a 3ª edição.' },
            { text: '1959', why: '1959 é a NGB.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'terceira',
      part: 'A história',
      title: '2018: a 3ª edição',
      art: 'calendario',
      goal: 'Saber o que a 3ª edição trouxe de mais cobrado.',
      explain:
        'A **3ª edição**, **revista, atualizada e ampliada**, foi publicada em **2018**. É a que as bancas usam como base.\n\nDuas mudanças muito cobradas:\n\n- **ofício, aviso e memorando** foram **unificados** sob o **padrão ofício**, com o nome único "**ofício**";\n- a fonte passou a ser **Calibri ou Carlito** (a edição anterior usava Times New Roman).',
      check: {
        kind: 'choice',
        id: 'te-c',
        prompt: 'O que a 3ª edição fez com ofício, aviso e memorando?',
        options: [
          { text: 'Unificou os três no padrão ofício, com o nome "ofício"', why: 'Isso.' },
          { text: 'Aboliu o ofício e manteve o memorando', why: 'Foi o contrário: todos viraram "ofício".' },
          { text: 'Criou um formato diferente para cada um', why: 'Antes eram diferentes; a 3ª edição unificou.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Antes, havia **três formulários** diferentes para tarefas parecidas. A 3ª edição juntou tudo num **formulário só**: o **ofício**, usado entre órgãos, dentro do órgão e com particulares.',
        check: {
          kind: 'choice',
          id: 'te-r',
          prompt: 'Qual fonte a 3ª edição adotou?',
          options: [
            { text: 'Calibri ou Carlito', why: 'Isso.' },
            { text: 'Times New Roman', why: 'Essa era a da edição anterior.' },
            { text: 'Comic Sans', why: 'O Manual indica Calibri ou Carlito.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'decreto',
      part: 'A história',
      title: '2019: o Decreto nº 9.758',
      art: 'balanca',
      goal: 'Saber o que o Decreto nº 9.758/2019 estabeleceu e o seu alcance.',
      explain:
        'O **Decreto nº 9.758**, de **11 de abril de 2019**, posterior ao Manual, estabeleceu que, na comunicação com **agentes públicos federais** do **Poder Executivo**, o único pronome de tratamento é "**senhor**" (com flexões).\n\nEle **não se aplica** a comunicações com Judiciário, Legislativo, **Tribunais de Contas**, Ministério Público, Defensoria e outros entes federativos que exijam tratamento especial.\n\nNota: a vigência atual do decreto não foi reconferida no site do Planalto.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'O Decreto nº 9.758/2019 trata de comunicações com:',
        options: [
          { text: 'Agentes públicos federais do Poder Executivo', why: 'Isso.' },
          { text: 'Todos os Tribunais de Contas', why: 'Os Tribunais de Contas estão entre as exceções.' },
          { text: 'Empresas privadas estrangeiras', why: 'O decreto trata do Executivo federal.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'O decreto é uma **regra da casa** do Executivo federal: dentro dele, todos se chamam "senhor". Quando a carta vai para **outra casa**, como um Tribunal de Contas, valem as formas especiais do Manual.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'No âmbito do decreto, qual é o pronome de tratamento?',
          options: [
            { text: '"Senhor", com flexões', why: 'Isso.' },
            { text: '"Vossa Magnificência"', why: 'Está entre os vedados pelo decreto.' },
            { text: '"Doutor"', why: 'Está entre os vedados pelo decreto.' },
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
      items: ['1ª edição do Manual (1991)', '3ª edição do Manual (2018)', 'Decreto nº 9.758 (2019)'],
      why: 'Do primeiro Manual ao decreto do Executivo federal.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O decreto de 2019 se aplica à comunicação com quem?',
      categories: ['Aplica-se', 'Não se aplica'],
      items: [
        { text: 'Agente público do Executivo federal', cat: 0, why: 'É o âmbito do decreto.' },
        { text: 'Tribunal de Contas', cat: 1, why: 'Exceção.' },
        { text: 'Poder Judiciário', cat: 1, why: 'Exceção.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['3ª edição: 2018', 'Padrão ofício unificou três expedientes', '3ª edição: fonte Times New Roman'],
      bug: 2,
      why: 'A 3ª edição usa Calibri ou Carlito; Times New Roman era da anterior.',
      fixed: '3ª edição: Calibri ou Carlito',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    '1991: primeira edição do Manual de Redação da Presidência da República.',
    '2018: 3ª edição; ofício, aviso e memorando unificados no padrão ofício; fonte Calibri ou Carlito.',
    '2019: Decreto nº 9.758: "senhor" na comunicação com agentes do Executivo federal; não se aplica a Tribunais de Contas e outros.',
  ],
};

export const portRedAtributos: MicroLesson = {
  ...S,
  id: 'port.redacao.2',
  series: { id: 'port.redacao', order: 2 },
  title: 'Os atributos da redação oficial',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Venho, por meio deste, mui respeitosamente, solicitar..." Esse começo deixa o ofício melhor?',
    options: [
      { text: 'Não: são palavras que nada acrescentam', why: 'Isso: fere a concisão. Esta aula mostra os atributos.' },
      { text: 'Sim: quanto mais formal, melhor', why: 'Rebuscamento não torna o texto mais formal; só mais longo.' },
      { text: 'Sim: é obrigatório começar assim', why: 'O Manual não exige essas fórmulas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'lista',
      part: 'Os atributos',
      title: 'Sete atributos',
      art: 'trilha',
      goal: 'Listar os atributos da redação oficial.',
      explain:
        'O Manual lista como atributos:\n\n- **clareza e precisão**;\n- **objetividade**;\n- **concisão**;\n- **coesão e coerência**;\n- **impessoalidade**;\n- **formalidade e padronização**;\n- uso da **norma padrão**.\n\nEles derivam dos princípios da administração pública do **art. 37** da Constituição, em especial **impessoalidade** e **publicidade**.',
      check: {
        kind: 'multi',
        id: 'li-c',
        prompt: 'Quais são atributos da redação oficial? Marque todos.',
        options: [
          { text: 'Concisão', correct: true, why: 'Isso.' },
          { text: 'Impessoalidade', correct: true, why: 'Isso.' },
          { text: 'Clareza e precisão', correct: true, why: 'Isso.' },
          { text: 'Rebuscamento', correct: false, why: 'O Manual rejeita o rebuscamento e o preciosismo.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em quem **lê** o ofício: precisa **entender logo** (clareza), achar **o pedido sem rodeio** (objetividade), sem **palavra sobrando** (concisão), com **ideias ligadas** (coesão), sem **opinião pessoal** (impessoalidade), em **forma padronizada** e **português correto**.',
        check: {
          kind: 'choice',
          id: 'li-r',
          prompt: 'Os atributos derivam de qual artigo da Constituição?',
          options: [
            { text: 'Art. 37', why: 'Isso: princípios da administração pública.' },
            { text: 'Art. 5º', why: 'O art. 5º trata de direitos e garantias fundamentais.' },
            { text: 'Art. 1º', why: 'O capítulo liga os atributos ao art. 37.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'violacoes',
      part: 'Os atributos',
      title: 'Reconhecer a violação',
      art: 'alvo',
      goal: 'Associar cada falha ao atributo que ela fere.',
      explain:
        'Exemplos de violação:\n\n- "O auditor informou ao gestor que **seu** relatório estava atrasado" (de quem?): fere a **clareza**;\n- três parágrafos de introdução antes do pedido: fere a **objetividade**;\n- "Venho por meio deste respeitosamente solicitar...": fere a **concisão**;\n- "**Achei** o pedido simpático": fere a **impessoalidade**;\n- gírias e layout livre: ferem a **formalidade e padronização**.',
      check: {
        kind: 'choice',
        id: 'vi-c',
        prompt: '"O auditor informou ao gestor que seu relatório estava atrasado." O problema é de:',
        options: [
          { text: 'Clareza: "seu" é ambíguo', why: 'Isso: relatório de quem?' },
          { text: 'Concisão', why: 'A frase não é longa demais; é ambígua.' },
          { text: 'Formalidade', why: 'A linguagem é formal; falta clareza.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia a frase como se **não soubesse** a resposta. "**Seu** relatório": do auditor ou do gestor? Se você precisa **adivinhar**, falta **clareza**. Corrija: "o relatório **do gestor** estava atrasado".',
        check: {
          kind: 'choice',
          id: 'vi-r',
          prompt: '"Achei o pedido simpático" num ofício fere a:',
          options: [
            { text: 'Impessoalidade', why: 'Isso: quem comunica é o órgão, sem impressões pessoais.' },
            { text: 'Concisão', why: 'É curta; o problema é a opinião pessoal.' },
            { text: 'Coesão', why: 'As partes estão ligadas; o problema é a impressão pessoal.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'concisao',
      part: 'Cuidados',
      title: 'Concisão não é cortar o essencial',
      art: 'revisao',
      goal: 'Aplicar concisão e linguagem técnica com equilíbrio.',
      explain:
        'Dois equilíbrios:\n\n- **concisão** é o **máximo de informação** com o **mínimo de palavras**, mas **sem cortar o essencial**. Corta-se o supérfluo, nunca o necessário;\n- a **linguagem técnica** pode ser usada quando necessária, mas deve ser **explicada** se o destinatário não a dominar.\n\n**Rebuscamento** e **preciosismo** não tornam o texto mais formal.',
      check: {
        kind: 'choice',
        id: 'cc-c',
        prompt: 'Concisão autoriza cortar informação essencial para encurtar o texto?',
        options: [
          { text: 'Não: corta-se o supérfluo, não o necessário', why: 'Isso.' },
          { text: 'Sim: quanto mais curto, melhor', why: 'Curto demais pode ferir a clareza.' },
          { text: 'Sim, se o chefe pedir', why: 'O essencial nunca se corta.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como **arrumar uma mala**: tire as **roupas repetidas** (palavras que nada acrescentam), mas não deixe o **documento de identidade** (a informação essencial). Mala leve, mas completa.',
        check: {
          kind: 'choice',
          id: 'cc-r',
          prompt: 'Um termo técnico que o destinatário não conhece deve ser:',
          options: [
            { text: 'Explicado', why: 'Isso.' },
            { text: 'Proibido sempre', why: 'Pode ser usado quando necessário, com explicação.' },
            { text: 'Repetido várias vezes', why: 'Repetir não explica.' },
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
      prompt: 'Qual atributo cada falha fere?',
      categories: ['Concisão', 'Impessoalidade', 'Clareza'],
      items: [
        { text: '"Venho por meio deste respeitosamente solicitar"', cat: 0, why: 'Palavras supérfluas.' },
        { text: '"Achei o pedido simpático"', cat: 1, why: 'Impressão pessoal.' },
        { text: '"seu relatório" sem dizer de quem', cat: 2, why: 'Ambiguidade.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Concisão: sem palavras supérfluas', 'Impessoalidade: fala o órgão', 'Rebuscamento: deixa o texto mais formal'],
      bug: 2,
      why: 'Rebuscamento e preciosismo não tornam o texto mais formal.',
      fixed: 'Rebuscamento: deve ser evitado',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual abertura de ofício respeita os atributos?',
      scenarios: [
        { title: 'Opção A', body: '"Solicito o envio dos documentos do Processo nº 123/2026 até 30 de outubro."' },
        { title: 'Opção B', body: '"Venho, por meio deste, mui respeitosamente, solicitar a Vossa Senhoria que, se lhe aprouver, se digne a encaminhar os documentos."' },
      ],
      answer: 0,
      why: 'A opção A é clara, objetiva e concisa. A B usa fórmulas que nada acrescentam.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.013' }],
  summary: [
    'Atributos: clareza e precisão; objetividade; concisão; coesão e coerência; impessoalidade; formalidade e padronização; norma padrão.',
    'Derivam do art. 37 da Constituição (impessoalidade e publicidade).',
    'Concisão corta o supérfluo, não o essencial. Termo técnico: explique. Rebuscamento não é formalidade.',
  ],
};

export const portRedTratamento: MicroLesson = {
  ...S,
  id: 'port.redacao.3',
  series: { id: 'port.redacao', order: 3 },
  title: 'Tratamento e fechos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Vossa Excelência decidiu" ou "Vossa Excelência decidistes"?',
    options: [
      { text: '"Vossa Excelência decidiu"', why: 'Isso: com pronomes de tratamento, o verbo vai à 3ª pessoa. Esta aula explica.' },
      { text: '"Vossa Excelência decidistes"', why: 'Pegadinha: o "vossa" engana, mas o verbo vai à 3ª pessoa.' },
      { text: 'As duas', why: 'Só a 3ª pessoa segue a norma.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'concordancia',
      part: 'Pronomes de tratamento',
      title: '3ª pessoa e o sexo da pessoa',
      art: 'pessoal',
      goal: 'Concordar verbos, pronomes e adjetivos com os pronomes de tratamento.',
      explain:
        'Com pronomes de tratamento:\n\n- verbo e pronomes vão à **3ª pessoa**: "Vossa Excelência **decidiu**", "**sua** decisão";\n- adjetivos concordam com o **sexo da pessoa**: "Vossa Excelência está **atarefado**", se homem;\n- **Vossa** Excelência: quando se fala **com** a autoridade; **Sua** Excelência: quando se fala **dela**.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Qual frase segue a norma?',
        options: [
          { text: 'Vossa Excelência apresentou sua proposta.', why: 'Isso: 3ª pessoa no verbo e no possessivo.' },
          { text: 'Vossa Excelência apresentastes vossa proposta.', why: 'Verbo e pronome vão à 3ª pessoa.' },
          { text: 'Vossa Excelência apresentou vossa proposta.', why: 'O possessivo também vai à 3ª pessoa: sua.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense que "Vossa Excelência" é como dizer "**a excelência de vocês**": a palavra que manda é **Excelência**, um nome. Nomes levam o verbo à **3ª pessoa**, como "a senhora **decidiu**".',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Num ofício que fala do ministro a um terceiro, usa-se:',
          options: [
            { text: 'Sua Excelência', why: 'Isso: fala-se dele.' },
            { text: 'Vossa Excelência', why: '"Vossa" é para falar com ele.' },
            { text: 'Ilustríssimo', why: '"Ilustríssimo" foi abolido.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'quem',
      part: 'Pronomes de tratamento',
      title: 'Excelência ou Senhoria',
      art: 'balanca',
      goal: 'Escolher entre Vossa Excelência e Vossa Senhoria e o endereçamento.',
      explain:
        '- **Vossa Excelência**: altas autoridades dos três Poderes, como Presidente, ministros, parlamentares, magistrados, **membros dos Tribunais de Contas**, governadores e prefeitos. Vocativo: "**Excelentíssimo Senhor** Presidente da República," para chefes de Poder; "**Senhor** Conselheiro," para os demais. Endereçamento: "A Sua Excelência o Senhor";\n- **Vossa Senhoria**: demais autoridades e particulares. Endereçamento: "**Ao Senhor**", "**À Senhora**".\n\nEstão **abolidos** "Digníssimo" e "Ilustríssimo".',
      check: {
        kind: 'choice',
        id: 'qu-c',
        prompt: 'Para um conselheiro de Tribunal de Contas, o vocativo indicado é:',
        options: [
          { text: '"Senhor Conselheiro,"', why: 'Isso: "Excelentíssimo" fica para os chefes de Poder.' },
          { text: '"Ilustríssimo Senhor Conselheiro,"', why: '"Ilustríssimo" foi abolido.' },
          { text: '"Digníssimo Conselheiro,"', why: '"Digníssimo" foi abolido.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Há um **degrau de cima** só para os **chefes de Poder**: "**Excelentíssimo** Senhor Presidente". Os demais, mesmo tratados por Vossa Excelência, recebem "**Senhor** Ministro", "**Senhor** Conselheiro". E os enfeites antigos ("Ilustríssimo", "Digníssimo") saíram.',
        check: {
          kind: 'choice',
          id: 'qu-r',
          prompt: 'O Manual considera "doutor":',
          options: [
            { text: 'Título acadêmico, não forma de tratamento', why: 'Isso: deve ser evitado indiscriminadamente.' },
            { text: 'Forma de tratamento obrigatória para juízes', why: 'O Manual diz que "doutor" não é forma de tratamento.' },
            { text: 'Sinônimo de Vossa Excelência', why: 'Não é forma de tratamento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'fechos',
      part: 'Fechos',
      title: 'Respeitosamente ou atenciosamente',
      art: 'degraus',
      goal: 'Escolher o fecho conforme a hierarquia.',
      explain:
        'O Manual prevê **dois fechos**:\n\n- **Respeitosamente,** para autoridades de hierarquia **superior** à do remetente, **inclusive o Presidente da República**;\n- **Atenciosamente,** para autoridades de **mesma** hierarquia, de hierarquia **inferior** e demais casos.\n\nNa **identificação do signatário**, constam **nome e cargo**, exceto nas comunicações assinadas pelo Presidente da República.',
      check: {
        kind: 'choice',
        id: 'fe-c',
        prompt: 'Um diretor escreve ao Presidente da República. Qual fecho?',
        options: [
          { text: 'Respeitosamente,', why: 'Isso: autoridade superior.' },
          { text: 'Atenciosamente,', why: 'Pegadinha: para o Presidente, o fecho é "Respeitosamente".' },
          { text: 'Cordialmente,', why: 'O Manual prevê só dois fechos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Olhe a **escada da hierarquia**: escrevendo **para cima**, "**Respeitosamente**". Para o **mesmo degrau** ou **para baixo**, "**Atenciosamente**". Só dois fechos; não invente outros.',
        check: {
          kind: 'choice',
          id: 'fe-r',
          prompt: 'Um ofício a um particular termina com:',
          options: [
            { text: 'Atenciosamente,', why: 'Isso: demais casos.' },
            { text: 'Respeitosamente,', why: '"Respeitosamente" é para hierarquia superior.' },
            { text: 'Abraços,', why: 'Informal; o Manual prevê "Atenciosamente".' },
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
      prompt: 'Qual fecho cada ofício usa?',
      categories: ['Respeitosamente', 'Atenciosamente'],
      items: [
        { text: 'Ao Presidente da República', cat: 0, why: 'Autoridade superior.' },
        { text: 'A uma autoridade superior ao remetente', cat: 0, why: 'Hierarquia superior.' },
        { text: 'A um colega de mesmo cargo', cat: 1, why: 'Mesma hierarquia.' },
        { text: 'A um cidadão', cat: 1, why: 'Demais casos.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Vossa Excelência: verbo na 3ª pessoa', 'Endereçamento de Vossa Senhoria: "Ao Senhor"', 'Endereçamento de Vossa Senhoria: "Ilustríssimo Senhor"'],
      bug: 2,
      why: '"Ilustríssimo" foi abolido; usa-se "Ao Senhor".',
      fixed: 'Endereçamento: "Ao Senhor"',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual frase de ofício a uma ministra está certa?',
      scenarios: [
        { title: 'Opção A', body: '"Vossa Excelência está **atarefada** e **sua** agenda, cheia."' },
        { title: 'Opção B', body: '"Vossa Excelência estais **atarefado** e **vossa** agenda, cheia."' },
      ],
      answer: 0,
      why: 'Verbo e possessivo na 3ª pessoa; adjetivo conforme o sexo da pessoa.',
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Pronomes de tratamento: verbo e pronomes na 3ª pessoa; adjetivo conforme o sexo da pessoa.',
    'Vossa Excelência (com a autoridade) e Sua Excelência (sobre ela). Vossa Senhoria: demais autoridades e particulares.',
    '"Excelentíssimo" só para chefes de Poder. "Digníssimo" e "Ilustríssimo" abolidos; "doutor" é título, não tratamento.',
    'Fechos: Respeitosamente (superior, inclusive o Presidente) e Atenciosamente (mesma, inferior e demais).',
  ],
};

export const portRedOficio: MicroLesson = {
  ...S,
  id: 'port.redacao.4',
  series: { id: 'port.redacao', order: 4 },
  title: 'O padrão ofício',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num ofício, onde vão o local e a data?',
    options: [
      { text: 'Por extenso, alinhados à direita', why: 'Isso. Esta aula percorre as partes do ofício, de cima a baixo.' },
      { text: 'No rodapé, em números', why: 'Vão no alto, por extenso, à direita.' },
      { text: 'Não precisam constar', why: 'Local e data são partes obrigatórias.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'partes1',
      part: 'As partes',
      title: 'Do cabeçalho ao assunto',
      art: 'dados',
      goal: 'Ordenar as partes iniciais do ofício.',
      explain:
        'As partes iniciais, de cima para baixo:\n\n1. **cabeçalho**, com brasão e nome do órgão (na primeira página);\n2. **identificação do expediente**: nome, número, ano e siglas. Exemplo ilustrativo: "Ofício nº 123/2026/SETOR/TCE-GO";\n3. **local e data**, por extenso, alinhados à direita: "Goiânia, 17 de outubro de 2026.";\n4. **endereçamento**: tratamento, nome, cargo e endereço;\n5. **assunto**: resumo do teor, em poucas palavras.',
      check: {
        kind: 'order',
        id: 'p1-c',
        prompt: 'Ordene as partes iniciais do ofício.',
        items: ['Cabeçalho', 'Identificação do expediente', 'Local e data', 'Endereçamento', 'Assunto'],
        why: 'De cima para baixo, como na folha.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **carta com crachá**: primeiro **quem envia** (cabeçalho do órgão), depois o **número de protocolo** (identificação), **onde e quando** (local e data), **para quem** (endereçamento) e **sobre o quê** (assunto).',
        check: {
          kind: 'choice',
          id: 'p1-r',
          prompt: 'O que vai no campo "assunto"?',
          options: [
            { text: 'Um resumo do teor, em poucas palavras', why: 'Isso.' },
            { text: 'O texto completo', why: 'O texto vem depois; o assunto é um resumo.' },
            { text: 'O nome do signatário', why: 'O signatário vai no fim.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'partes2',
      part: 'As partes',
      title: 'Texto, fecho e signatário',
      art: 'revisao',
      goal: 'Ordenar as partes finais do ofício.',
      explain:
        'Depois do assunto:\n\n6. **texto**: introdução, desenvolvimento e conclusão. Em **encaminhamento de documentos**, a introdução menciona o expediente que motivou a comunicação;\n7. **fecho**: Respeitosamente ou Atenciosamente;\n8. **identificação do signatário**: nome e cargo de quem assina.\n\nE vale lembrar: o nome "**ofício**" serve para as três situações, entre órgãos, dentro do órgão e com particulares.',
      check: {
        kind: 'choice',
        id: 'p2-c',
        prompt: 'Num ofício que encaminha documentos, o que a introdução deve mencionar?',
        options: [
          { text: 'O expediente que motivou a comunicação', why: 'Isso.' },
          { text: 'A opinião pessoal do remetente', why: 'Fere a impessoalidade.' },
          { text: 'Nada; vai direto ao fecho', why: 'O texto tem introdução, desenvolvimento e conclusão.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Quando você **responde** a alguém, começa lembrando **o que ele pediu**: "Em resposta ao Ofício nº 45/2026...". No encaminhamento é igual: a introdução aponta o expediente que **originou** o envio.',
        check: {
          kind: 'order',
          id: 'p2-r',
          prompt: 'Ordene as partes finais.',
          items: ['Texto', 'Fecho', 'Identificação do signatário'],
          why: 'Conteúdo, despedida e assinatura.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'formatacao',
      part: 'Formatação',
      title: 'Fonte, papel e margens',
      art: 'computador',
      goal: 'Reconhecer a formatação do padrão ofício.',
      explain:
        'A formatação do padrão ofício:\n\n- fonte **Calibri ou Carlito**;\n- papel **A4**;\n- margem **esquerda** mínima de **3 cm**, **direita** de **1,5 cm**, **superior** e **inferior** de **2 cm**;\n- **numeração de páginas** obrigatória a partir da **segunda**.\n\nNota: tamanhos de fonte e espaçamentos não foram conferidos no texto integral do Manual.',
      check: {
        kind: 'choice',
        id: 'fm-c',
        prompt: 'A partir de qual página a numeração é obrigatória?',
        options: [
          { text: 'Da segunda', why: 'Isso.' },
          { text: 'Da primeira', why: 'A obrigatoriedade começa na segunda.' },
          { text: 'Nunca é obrigatória', why: 'É obrigatória a partir da segunda.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Lembre pela **encadernação**: a margem **esquerda** é a maior (**3 cm**), porque é ali que o papel é furado ou grampeado. A direita é a menor (**1,5 cm**). Em cima e embaixo, **2 cm**.',
        check: {
          kind: 'choice',
          id: 'fm-r',
          prompt: 'Qual margem é a maior no padrão ofício?',
          options: [
            { text: 'A esquerda, mínima de 3 cm', why: 'Isso.' },
            { text: 'A direita', why: 'A direita é de 1,5 cm.' },
            { text: 'A superior', why: 'A superior é de 2 cm.' },
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
      prompt: 'Ordene todas as partes do ofício.',
      items: ['Cabeçalho', 'Identificação do expediente', 'Local e data', 'Endereçamento', 'Assunto', 'Texto', 'Fecho', 'Identificação do signatário'],
      why: 'De cima para baixo.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Margem esquerda: 3 cm', 'Margem direita: 1,5 cm', 'Memorando: formato próprio, separado do ofício'],
      bug: 2,
      why: 'Na 3ª edição, ofício, aviso e memorando seguem o padrão ofício, com o nome "ofício".',
      fixed: 'Memorando: unificado no padrão ofício',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual linha de local e data segue o padrão?',
      scenarios: [
        { title: 'Opção A', body: '"Goiânia, 17 de outubro de 2026.", alinhada à direita.' },
        { title: 'Opção B', body: '"17/10/26 - GYN", alinhada à esquerda.' },
      ],
      answer: 0,
      why: 'Local e data vão por extenso e alinhados à direita.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.012' }],
  summary: [
    'Partes: cabeçalho, identificação do expediente, local e data (por extenso, à direita), endereçamento, assunto, texto, fecho, signatário.',
    'O nome "ofício" vale para comunicação entre órgãos, interna e com particulares.',
    'Calibri ou Carlito, A4; margens: esquerda 3 cm, direita 1,5 cm, superior e inferior 2 cm; páginas numeradas a partir da segunda.',
  ],
};
