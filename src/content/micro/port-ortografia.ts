// Série "Ortografia, acentuação e crase" (cap.port.01, trecho ortografia), no ritmo lento com história
// pedido em 25/10/2026: a primeira aula conta das reformas de 1911 e 1943 ao Acordo de 1990; as
// seguintes ensinam acentuação, mudanças do Acordo, hífen e parônimos, depois crase, uma ideia por
// etapa. Regras conferidas com o texto do capítulo (02-ortografia-crase.md). Revisão editorial
// humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.01', sectionId: 'ortografia' } as const;

export const portOrtHistoria: MicroLesson = {
  ...S,
  id: 'port.ortografia.1',
  series: { id: 'port.ortografia', order: 1 },
  title: 'Das reformas ao Acordo de 1990',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Seus avós talvez escrevessem "idéia" e "freqüente". Hoje se escreve "ideia" e "frequente". Por que mudou?',
    options: [
      { text: 'Porque houve um acordo entre os países de língua portuguesa', why: 'Isso: o Acordo Ortográfico de 1990. Esta aula conta essa história.' },
      { text: 'Porque cada pessoa escreve como quer', why: 'A ortografia oficial segue regras comuns, definidas em acordos e decretos.' },
      { text: 'Por erro dos jornais', why: 'Foi uma mudança oficial, por acordo e decreto.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'crase-nome',
      part: 'A história',
      title: 'Crase quer dizer mistura',
      art: 'livro',
      goal: 'Saber a origem e o sentido da palavra crase.',
      explain:
        'A palavra **crase** vem do grego ***krâsis***, que quer dizer "**mistura**".\n\nNa gramática, crase é a **fusão de duas vogais iguais** em uma só: a preposição **a** com o artigo **a**.\n\n"Fui **a** + **a** sede" vira "Fui **à** sede". O **acento grave**, o sinalzinho de **à**, só **marca** que houve essa mistura.',
      check: {
        kind: 'choice',
        id: 'cn-c',
        prompt: 'O que é crase?',
        options: [
          { text: 'A fusão da preposição "a" com o artigo "a"', why: 'Isso: "mistura" de duas vogais iguais.' },
          { text: 'Um acento que se põe em toda palavra feminina', why: 'Só há crase quando há a fusão de preposição e artigo.' },
          { text: 'Um sinal de pontuação', why: 'É um fenômeno de fusão de vogais, marcado pelo acento grave.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **misturar dois copos de água**: viram um só, e você não distingue mais. Na crase, o **a** que a frase pede (preposição) se mistura com o **a** que acompanha a palavra feminina (artigo). O acento grave é a **etiqueta** que avisa: "aqui houve mistura".',
        check: {
          kind: 'choice',
          id: 'cn-r',
          prompt: 'A palavra grega krâsis quer dizer:',
          options: [
            { text: 'Mistura', why: 'Isso.' },
            { text: 'Acento', why: 'Quer dizer mistura.' },
            { text: 'Feminino', why: 'Quer dizer mistura.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'reformas',
      part: 'A história',
      title: '1911 e 1943: cada país do seu jeito',
      art: 'calendario',
      goal: 'Saber que Portugal e Brasil fizeram reformas separadas no século XX.',
      explain:
        'Por muito tempo, cada um escrevia mais ou menos como achava certo.\n\nEm **1911**, **Portugal** fez uma grande **reforma da ortografia**. Em **1943**, o **Brasil** adotou o seu **Formulário Ortográfico**.\n\nComo as regras foram feitas **separadamente**, os dois países passaram **décadas** escrevendo de jeitos diferentes a mesma língua.',
      check: {
        kind: 'order',
        id: 're-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Reforma ortográfica em Portugal (1911)', 'Formulário Ortográfico no Brasil (1943)', 'Acordo Ortográfico (1990)'],
        why: '1911, 1943 e 1990: primeiro separados, depois o acordo.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine **duas filiais** da mesma empresa, cada uma com seu manual de redação. Depois de anos, os documentos já não batem. Foi o que aconteceu com Portugal (1911) e Brasil (1943), até o acordo comum de 1990.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Em que ano o Brasil adotou o Formulário Ortográfico?',
          options: [
            { text: '1943', why: 'Isso.' },
            { text: '1911', why: '1911 foi a reforma em Portugal.' },
            { text: '1990', why: '1990 é o ano do Acordo.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'acordo',
      part: 'A história',
      title: '1990: o Acordo e os decretos',
      art: 'balanca',
      goal: 'Saber quais decretos puseram o Acordo em vigor no Brasil.',
      explain:
        'Em **1990**, os países de língua portuguesa assinaram o **Acordo Ortográfico**, para aproximar a escrita.\n\nNo Brasil:\n\n- o **Decreto nº 6.583/2008** pôs o Acordo em vigor a partir de **2009**;\n- o **Decreto nº 7.875/2012** estendeu a transição até o **fim de 2015**.\n\nDesde **2016**, as regras novas são as **únicas aceitas**. O edital cita exatamente esses dois decretos.',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'Quais decretos o edital cita para as normas ortográficas?',
        options: [
          { text: 'Decreto nº 6.583/2008 e Decreto nº 7.875/2012', why: 'Isso.' },
          { text: 'Só a reforma de 1911', why: 'A de 1911 é portuguesa e anterior ao Acordo.' },
          { text: 'Nenhum: o Acordo não tem decreto', why: 'O Acordo entrou em vigor no Brasil por decreto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um tratado entre países precisa de um ato interno para valer. No Brasil, foram dois: o de **2008** (começa a valer em 2009) e o de **2012** (dá mais prazo de adaptação, até 2015). A partir de **2016**, acabou a transição.',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'Desde quando as regras novas são as únicas aceitas no Brasil?',
          options: [
            { text: '2016', why: 'Isso: a transição terminou no fim de 2015.' },
            { text: '1990', why: 'Em 1990 o Acordo foi assinado, mas ainda não valia.' },
            { text: '2009', why: 'Em 2009 começou a vigência, com transição.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Crase: mistura de "a" com "a"', 'Acordo Ortográfico: 1990', 'Brasil: Formulário Ortográfico de 1911'],
      bug: 2,
      why: 'O Formulário Ortográfico brasileiro é de 1943; 1911 foi a reforma em Portugal.',
      fixed: 'Brasil: Formulário Ortográfico de 1943',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O que aconteceu em cada ano?',
      categories: ['1990', '2008', '2012'],
      items: [
        { text: 'Assinatura do Acordo Ortográfico', cat: 0, why: 'O tratado.' },
        { text: 'Decreto que pôs o Acordo em vigor a partir de 2009', cat: 1, why: 'Decreto nº 6.583.' },
        { text: 'Decreto que estendeu a transição até 2015', cat: 2, why: 'Decreto nº 7.875.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: num documento de 2026, alguém escreveu "freqüente". Como fica?',
      options: [
        { text: '"frequente", sem trema, pelas regras do Acordo', why: 'Isso.' },
        { text: '"freqüente" está certo', why: 'O trema foi abolido nas palavras portuguesas.' },
        { text: 'Tanto faz', why: 'Desde 2016 só valem as regras novas.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Crase vem do grego krâsis, "mistura": fusão da preposição a com o artigo a, marcada pelo acento grave.',
    'Portugal reformou a ortografia em 1911; o Brasil adotou o Formulário Ortográfico em 1943.',
    'Acordo Ortográfico de 1990; no Brasil, Decreto nº 6.583/2008 (vigência em 2009) e nº 7.875/2012 (transição até 2015). Desde 2016, só as regras novas.',
  ],
};

export const portOrtAcentos: MicroLesson = {
  ...S,
  id: 'port.ortografia.2',
  series: { id: 'port.ortografia', order: 2 },
  title: 'Acentuação, o Acordo e o hífen',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Público", "crédito" e "análise" têm acento. O que essas palavras têm em comum?',
    options: [
      { text: 'A sílaba mais forte é a antepenúltima', why: 'Isso: são proparoxítonas, e todas levam acento. Esta aula mostra as regras.' },
      { text: 'Todas terminam em vogal', why: 'Muitas palavras terminam em vogal sem acento; o que vale é a sílaba forte.' },
      { text: 'São palavras longas', why: 'O tamanho não decide o acento.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'regras',
      part: 'Acentuação',
      title: 'As regras gerais',
      art: 'livro',
      goal: 'Aplicar as regras de acentuação de proparoxítonas, paroxítonas, oxítonas e monossílabos.',
      explain:
        '- **Proparoxítonas** (sílaba forte na antepenúltima): **todas** acentuadas. público, análise, lâmpada.\n- **Paroxítonas** (na penúltima): acentuadas se terminadas em **l, n, r, x, ps, ã(s), ão(s), i(s), us, um, uns** ou **ditongo oral**. útil, hífen, caráter, júri, vírus, ciência.\n- **Oxítonas** (na última): acentuadas se terminadas em **a(s), e(s), o(s), em, ens**. está, você, após, parabéns.\n- **Monossílabos tônicos**: acentuados se terminados em **a(s), e(s), o(s)**. já, pé, nós.',
      check: {
        kind: 'choice',
        id: 'rg-c',
        prompt: 'Qual destas está corretamente acentuada?',
        options: [
          { text: 'caráter', why: 'Isso: paroxítona terminada em r.' },
          { text: 'ítens', why: '"itens" é paroxítona em -ens: sem acento.' },
          { text: 'cajú', why: 'Oxítona terminada em u não leva acento: caju.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Primeiro ache a **sílaba forte**, depois olhe o **final**. "ca-RÁ-ter": forte na penúltima (paroxítona), termina em **r**: acento. "I-tens": paroxítona em **-ens**: a lista das paroxítonas não tem -ens, então **sem acento**. Por isso "hífen" leva acento e "hifens" não.',
        check: {
          kind: 'choice',
          id: 'rg-r',
          prompt: 'Toda proparoxítona é acentuada?',
          options: [
            { text: 'Sim, todas', why: 'Isso.' },
            { text: 'Só as terminadas em vogal', why: 'Todas as proparoxítonas levam acento.' },
            { text: 'Nenhuma', why: 'Todas levam: público, crédito, análise.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'mudancas',
      part: 'O Acordo',
      title: 'O que perdeu o acento',
      art: 'revisao',
      goal: 'Reconhecer as mudanças de acentuação do Acordo de 1990.',
      explain:
        '- **Ditongos abertos éi, ói em paroxítonas**: perdem o acento. ideia, heroico, assembleia, jiboia. Nas **oxítonas** e **monossílabos** o acento **fica**: herói, papéis, chapéu, céu.\n- **i e u tônicos depois de ditongo**, em **paroxítonas**: perdem. feiura, baiuca. Em oxítonas, ficam: Piauí.\n- **Hiato ee e oo**: perde o circunflexo. creem, leem, veem, voo, enjoo.\n- **Trema**: abolido em palavras portuguesas. frequente, linguiça. Fica em nomes estrangeiros: Müller.',
      check: {
        kind: 'choice',
        id: 'mu-c',
        prompt: 'Qual grupo está todo de acordo com o Acordo vigente?',
        options: [
          { text: 'ideia, heroico, voo, eles têm', why: 'Isso.' },
          { text: 'idéia, herói, vôo, eles têm', why: '"Idéia" e "vôo" perderam o acento.' },
          { text: 'feiúra, Piauí, lêem, eles vêm', why: '"Feiura" e "leem" não levam mais acento.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Repare no **par herói / heroico**: em "he-RÓI" a força está no **final** (oxítona): o acento **fica**. Em "he-roi-co" a força está na **penúltima** (paroxítona): o acento **cai**. A regra mudou só para as paroxítonas.',
        check: {
          kind: 'choice',
          id: 'mu-r',
          prompt: '"Após o Acordo, heroico e herói perderam o acento." Isso está:',
          options: [
            { text: 'Errado: só heroico (paroxítona) perdeu; herói (oxítona) mantém', why: 'Isso.' },
            { text: 'Certo', why: 'Herói é oxítona e manteve o acento.' },
            { text: 'Errado: os dois mantêm', why: 'Heroico perdeu o acento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'diferenciais',
      part: 'O Acordo',
      title: 'Diferenciais: o que caiu e o que ficou',
      art: 'balanca',
      goal: 'Saber quais acentos diferenciais caíram e quais permanecem.',
      explain:
        '**Caíram**: pára, péla, pêlo, pólo, pêra → **para, pela, pelo, polo, pera**. E argúi → **argui**.\n\n**Ficaram**:\n\n- **pôr** (verbo) × **por** (preposição);\n- **pôde** (passado) × **pode** (presente);\n- **têm**, **vêm** (plural) × **tem**, **vem** (singular). Também ele **detém**, eles **detêm**; ele **intervém**, eles **intervêm**.\n\n**Facultativos**: **fôrma** (molde) × forma; **dêmos** × demos.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Em qual frase o acento está correto?',
        options: [
          { text: 'Ontem ele não pôde comparecer.', why: 'Isso: "pôde" (passado) mantém o diferencial.' },
          { text: 'O carro pára no sinal.', why: 'O diferencial de "para" (verbo) foi eliminado.' },
          { text: 'Ele têm dois processos.', why: '"Têm" é plural; com "ele", é "tem".' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Os diferenciais que **sobraram** distinguem coisas que mudariam o sentido da frase: **pôr** e por, **pôde** e pode, **têm** e tem. "Pára" e "pélo" eram tão fáceis de entender pelo contexto que o acento foi tirado.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: '"Eles ______ muitos processos." Qual a forma correta?',
          options: [
            { text: 'detêm', why: 'Isso: plural com circunflexo.' },
            { text: 'detém', why: '"Detém" é singular: ele detém.' },
            { text: 'detem', why: 'O plural leva circunflexo.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'hifen',
      part: 'Hífen e grafias',
      title: 'Hífen nos prefixos',
      art: 'degraus',
      goal: 'Aplicar a regra básica do hífen com prefixos.',
      explain:
        '- **Com hífen**: quando o segundo elemento começa por **h** (anti-higiênico, super-homem) ou pela **mesma vogal** em que o prefixo termina (micro-ondas, anti-inflamatório).\n- **Junto**: com **vogais diferentes** (autoescola, infraestrutura).\n- **Dobra a consoante**: prefixo em vogal + palavra começando por **r** ou **s** (antirrábico, contrarregra, ultrassom).\n- **Sempre com hífen**: **ex-**, **vice-**, **pós-**, **pré-**, **pró-** tônicos (ex-diretor, vice-presidente, pós-graduação).',
      check: {
        kind: 'choice',
        id: 'hf-c',
        prompt: 'Qual grafia está correta?',
        options: [
          { text: 'infraestrutura', why: 'Isso: vogais diferentes, junta.' },
          { text: 'micro ondas', why: 'Mesma vogal (o-o): micro-ondas.' },
          { text: 'anti-rábico', why: 'Prefixo em vogal + r: dobra, antirrábico.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Olhe **onde as palavras se encontram**: "infr**a-e**strutura": vogais **diferentes** se dão bem, juntam. "micr**o-o**ndas": vogais **iguais** batem, precisam do hífen para separar. "ant**i-r**ábico": o **r** sozinho entre vogais mudaria o som, então dobra: **antirrábico**.',
        check: {
          kind: 'choice',
          id: 'hf-r',
          prompt: 'Qual destas está correta?',
          options: [
            { text: 'ex-diretor', why: 'Isso: ex- sempre pede hífen.' },
            { text: 'exdiretor', why: 'O prefixo ex- pede hífen.' },
            { text: 'ex diretor', why: 'Usa-se hífen: ex-diretor.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'paronimos',
      part: 'Hífen e grafias',
      title: 'Parônimos que caem em prova',
      art: 'cartao',
      goal: 'Distinguir parônimos e homônimos comuns em textos de controle.',
      explain:
        '- **ratificar** (confirmar) × **retificar** (corrigir);\n- **eminente** (ilustre) × **iminente** (prestes a ocorrer);\n- **mandado** (ordem judicial) × **mandato** (período de exercício);\n- **sessão** (reunião) × **seção** (divisão) × **cessão** (ato de ceder);\n- **infligir** (aplicar pena) × **infringir** (violar);\n- **descrição** × **discrição**; **despensa** × **dispensa**.',
      check: {
        kind: 'sort',
        id: 'pa-c',
        prompt: 'Qual palavra completa cada frase?',
        categories: ['retificar', 'iminente', 'infringir'],
        items: [
          { text: 'O setor vai ______ o valor errado do empenho.', cat: 0, why: 'Corrigir.' },
          { text: 'O prazo de prescrição é ______.', cat: 1, why: 'Prestes a ocorrer.' },
          { text: 'O gestor não pode ______ a lei de licitações.', cat: 2, why: 'Violar.' },
        ],
      },
      recovery: {
        explain: 'Use pistas na própria palavra: **R-E-tificar** tem o "re" de **refazer** (corrigir); **RA-tificar** confirma. **I-minente** tem o "i" de **iminência** (está para acontecer). **IN-fringir** tem o som de **in**fração (violar); **in-fligir** é aplicar a pena.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: '"O Plenário se reuniu em ______ extraordinária." Qual palavra?',
          options: [
            { text: 'sessão', why: 'Isso: reunião.' },
            { text: 'seção', why: 'Seção é divisão, como a seção de um setor.' },
            { text: 'cessão', why: 'Cessão é o ato de ceder.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['herói mantém o acento', 'leem e voo não têm acento', 'pára (verbo) mantém o acento'],
      bug: 2,
      why: 'O diferencial de "para" foi eliminado.',
      fixed: 'para (verbo) perdeu o acento',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Com hífen, junto ou dobrando a consoante?',
      categories: ['Com hífen', 'Junto', 'Dobra a consoante'],
      items: [
        { text: 'anti + inflamatório', cat: 0, why: 'Mesma vogal.' },
        { text: 'auto + escola', cat: 1, why: 'Vogais diferentes.' },
        { text: 'ultra + som', cat: 2, why: 'Vogal + s: ultrassom.' },
        { text: 'super + homem', cat: 0, why: 'Segundo elemento com h.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: qual frase está correta?',
      options: [
        { text: 'O conselheiro vai ratificar a decisão do relator.', why: 'Isso: ratificar é confirmar.' },
        { text: 'Os juízes têm mandado de quatro anos.', why: 'Período de exercício é mandato.' },
        { text: 'A sanção foi infringida ao gestor.', why: 'Aplicar pena é infligir.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.004' }],
  summary: [
    'Proparoxítonas: todas acentuadas. Paroxítonas: l, n, r, x, ps, ã, ão, i, us, um, ditongo. Oxítonas: a, e, o, em, ens.',
    'Acordo: paroxítonas com éi, ói perdem acento (ideia, heroico); oxítonas mantêm (herói). Caíram creem, leem, voo, feiura e o trema.',
    'Diferenciais que ficam: pôr, pôde, têm, vêm, detêm. Caíram pára, pélo, pólo, pêra.',
    'Hífen: segundo elemento com h ou mesma vogal; junto com vogais diferentes; dobra r e s; ex-, vice-, pós-, pré-, pró-.',
    'Parônimos: ratificar e retificar, eminente e iminente, mandado e mandato, sessão, seção e cessão, infligir e infringir.',
  ],
};

export const portOrtCrase: MicroLesson = {
  ...S,
  id: 'port.ortografia.3',
  series: { id: 'port.ortografia', order: 3 },
  title: 'Crase: o teste do masculino e os casos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Encaminhou o relatório à Presidência." Trocando por uma palavra masculina, como fica?',
    options: [
      { text: '"Encaminhou o relatório ao Presidente."', why: 'Isso: apareceu "ao", então há crase. Esta aula usa esse teste o tempo todo.' },
      { text: '"Encaminhou o relatório o Presidente."', why: 'Falta a preposição: "encaminhar a" alguém.' },
      { text: '"Encaminhou o relatório a Presidente."', why: 'Com masculino aparece "ao": a + o.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'teste',
      part: 'O teste',
      title: 'Troque pelo masculino',
      art: 'balanca',
      goal: 'Usar o teste do masculino para decidir a crase.',
      explain:
        'Crase é a fusão da **preposição a** com o **artigo a(s)** ou com o **a** inicial de **aquele(s), aquela(s), aquilo**.\n\nO **teste mais seguro**: troque a palavra feminina por uma **masculina**. Se surgir **ao**, há crase.\n\n- "Encaminhou o relatório **à** Presidência" → "**ao** Presidente": **há** crase.\n- "Refiro-me **àquele** processo" (a + aquele).',
      check: {
        kind: 'choice',
        id: 'te-c',
        prompt: '"Obedeceu ___ normas." Trocando por "regulamentos", fica "obedeceu aos regulamentos". Logo:',
        options: [
          { text: 'Obedeceu às normas', why: 'Isso: "aos" no masculino indica crase.' },
          { text: 'Obedeceu as normas', why: 'Se no masculino aparece "aos", no feminino há crase.' },
          { text: 'Obedeceu à normas', why: 'Com "normas" no plural, a crase também vai ao plural: às.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O masculino **mostra** o que está escondido. Em "obedeceu **aos** regulamentos", o "aos" é **a + os**: preposição e artigo. No feminino, é **a + as** = **às**. Se no masculino aparecesse só "os" ou só "a", não haveria crase.',
        check: {
          kind: 'choice',
          id: 'te-r',
          prompt: '"Refiro-me ___ processo." Qual a forma correta?',
          options: [
            { text: 'àquele', why: 'Isso: a + aquele.' },
            { text: 'aquele', why: '"Referir-se a" pede preposição, que se funde com "aquele".' },
            { text: 'à aquele', why: 'A fusão vira uma palavra só: àquele.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'obrigatoria',
      part: 'Casos',
      title: 'Quando é obrigatória',
      art: 'alvo',
      goal: 'Reconhecer os casos obrigatórios de crase.',
      explain:
        '- **Regência** que pede "a" + palavra feminina **determinada**: Obedeceu **às** normas.\n- **Locuções femininas**: **às** pressas, **à** noite, **à** medida que, **à** custa de, **às** vezes.\n- **Horas determinadas**: A sessão começa **às** 14h.\n- "**À moda de**", mesmo implícita: bacalhau **à** Gomes de Sá.',
      check: {
        kind: 'choice',
        id: 'ob-c',
        prompt: 'Em qual frase a crase é obrigatória?',
        options: [
          { text: 'À medida que a auditoria avançava, surgiam achados.', why: 'Isso: locução conjuntiva feminina.' },
          { text: 'Fez referência à sua equipe.', why: 'Antes de possessivo feminino singular, é facultativa.' },
          { text: 'Começou à analisar.', why: 'Antes de verbo não há crase.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'As **locuções** (à medida que, às vezes, à noite) são expressões **prontas**, que já trazem a crase "de fábrica". As **horas** também: "às 14h" = "a + as 14 horas". Decore essas como bloco.',
        check: {
          kind: 'choice',
          id: 'ob-r',
          prompt: '"O relatório foi encaminhado ___ Presidência ___ 15h." Preencha.',
          options: [
            { text: 'à / às', why: 'Isso: regência com feminino determinado e hora determinada.' },
            { text: 'a / as', why: 'As duas pedem crase.' },
            { text: 'à / as', why: 'Hora determinada também pede crase: às 15h.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'proibida',
      part: 'Casos',
      title: 'Quando é proibida',
      art: 'cadeado',
      goal: 'Reconhecer os casos em que não há crase.',
      explain:
        '- Antes de palavra **masculina**: pagamento **a** prazo.\n- Antes de **verbo**: começou **a** analisar.\n- Antes da maioria dos **pronomes** (pessoais, de tratamento, indefinidos, esta/essa): **a** ela; **a** Vossa Excelência; **a** ninguém.\n- Entre palavras **repetidas**: cara **a** cara.\n- "**a**" no **singular** antes de **plural**: não atende **a** reclamações.\n- **Cidade** sem determinante: vou **a** Goiânia (mas: **à** Goiânia **das** novas avenidas).',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Qual frase está correta?',
        options: [
          { text: 'Dirijo-me a Vossa Excelência.', why: 'Isso: pronome de tratamento não admite artigo.' },
          { text: 'A compra foi feita com pagamento à prazo.', why: '"Prazo" é masculino: sem crase.' },
          { text: 'A ouvidoria não atende à reclamações anônimas.', why: '"A" singular antes de plural é só preposição.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Lembre: crase precisa de **artigo feminino**. Antes de masculino, de verbo ou de "Vossa Excelência", **não existe** esse artigo, então não há o que misturar. E em "a reclamações", se houvesse artigo seria "**as** reclamações": com "a" no singular, é só preposição.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: '"Vou ___ Goiânia amanhã." Qual a forma correta?',
          options: [
            { text: 'a', why: 'Isso: cidade sem determinante.' },
            { text: 'à', why: 'Só com determinante: "à Goiânia das novas avenidas".' },
            { text: 'às', why: 'Não há plural nem artigo aqui.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'facultativa',
      part: 'Casos',
      title: 'Quando é facultativa',
      art: 'interruptor',
      goal: 'Reconhecer os casos facultativos de crase.',
      explain:
        'A crase é **facultativa**:\n\n- antes de **pronome possessivo feminino** no singular: "Fez referência **a/à** sua equipe";\n- antes de **nome próprio feminino** de pessoa: "Entregou o ofício **a/à** Maria";\n- depois da preposição **até**: "Foi **até a/à** sede do Tribunal".\n\nNos três casos, o **artigo é opcional**; por isso a crase também é.',
      check: {
        kind: 'choice',
        id: 'fa-c',
        prompt: 'Em qual frase a crase é facultativa?',
        options: [
          { text: 'O conselheiro fez referência à sua equipe.', why: 'Isso: possessivo feminino singular.' },
          { text: 'Os gestores obedeceram às normas.', why: 'Obrigatória: "obedecer a" + "as normas".' },
          { text: 'A comitiva chegou à sede pela manhã.', why: 'Obrigatória: "chegar a" + "a sede".' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Teste com o masculino: "fez referência **a** seu chefe" e "fez referência **ao** seu chefe" estão **ambos** certos. Se o masculino aceita as duas formas, o feminino também: crase **facultativa**. É o caso do possessivo, do nome de pessoa e do "até".',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'Depois de "até", a crase antes de palavra feminina é:',
          options: [
            { text: 'Facultativa', why: 'Isso: até a/à sede.' },
            { text: 'Obrigatória', why: 'Depois de "até" é facultativa.' },
            { text: 'Proibida', why: 'É permitida, mas não obrigatória.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'especiais',
      part: 'Casos',
      title: 'Casa, terra e distância',
      art: 'trilha',
      goal: 'Aplicar a crase nos casos especiais de casa, terra e distância.',
      explain:
        '- **Casa**: sem determinante, **sem** crase ("Voltou **a** casa"); com determinante, **com** ("Voltou **à** casa dos pais").\n- **Terra** (oposto a bordo): **sem** crase ("Os marinheiros desceram **a** terra"); planeta ou lugar determinado, **com** ("Voltou **à** terra natal").\n- **Distância**: determinada, **com** crase ("**à** distância de cem metros"); indeterminada, a gramática tradicional **não** usa ("ensino **a** distância"), embora muitos autores admitam.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Qual frase está de acordo com a gramática tradicional?',
        options: [
          { text: 'Depois da sessão, voltou a casa.', why: 'Isso: casa sem determinante, sem crase.' },
          { text: 'Voltou a casa dos pais.', why: 'Com determinante ("dos pais"), há crase: à casa dos pais.' },
          { text: 'O carro ficou a distância de cem metros.', why: 'Distância determinada pede crase: à distância de cem metros.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O segredo é o **determinante**: "casa" sozinha (o lar) não recebe artigo; "a casa **dos pais**" recebe. O mesmo com distância: "**a** distância" (vaga) não; "**à** distância **de cem metros**" (medida) sim. Determinou, apareceu o artigo, apareceu a crase.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: '"Os marinheiros desceram ___ terra." (terra oposta a bordo)',
          options: [
            { text: 'a', why: 'Isso: sem crase.' },
            { text: 'à', why: 'Terra oposta a bordo não recebe artigo.' },
            { text: 'às', why: 'Não há plural.' },
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
      prompt: 'A crase é obrigatória, proibida ou facultativa?',
      categories: ['Obrigatória', 'Proibida', 'Facultativa'],
      items: [
        { text: 'A sessão começa ___ 14h.', cat: 0, why: 'Hora determinada.' },
        { text: 'Começou ___ analisar as contas.', cat: 1, why: 'Antes de verbo.' },
        { text: 'Entregou o ofício ___ Maria.', cat: 2, why: 'Nome próprio feminino de pessoa.' },
        { text: 'Pagamento ___ prazo.', cat: 1, why: 'Palavra masculina.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Antes de verbo: sem crase', 'Locuções femininas: com crase', 'Antes de Vossa Excelência: com crase'],
      bug: 2,
      why: 'Pronomes de tratamento não admitem artigo: sem crase.',
      fixed: 'Antes de Vossa Excelência: sem crase',
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual frase está de acordo com a norma-padrão?',
      scenarios: [
        { title: 'Frase A', body: 'A equipe começou à analisar os contratos de obras.' },
        { title: 'Frase B', body: 'O relatório foi encaminhado à Presidência do Tribunal às 15h.' },
      ],
      answer: 1,
      why: 'Em B há regência com feminino determinado e hora determinada. Em A, antes de verbo, não há crase.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.006' },
  ],
  summary: [
    'Crase: preposição a + artigo a(s), ou + aquele, aquela, aquilo. Teste: troque pelo masculino; se surgir "ao", há crase.',
    'Obrigatória: regência com feminino determinado, locuções femininas, horas determinadas, "à moda de".',
    'Proibida: masculino, verbo, pronomes de tratamento e a maioria dos pronomes, palavras repetidas, "a" singular antes de plural, cidade sem determinante.',
    'Facultativa: possessivo feminino singular, nome próprio feminino de pessoa, depois de "até".',
    'Casa e terra sem determinante: sem crase. Distância determinada: com crase; indeterminada: sem, pela gramática tradicional.',
  ],
};
