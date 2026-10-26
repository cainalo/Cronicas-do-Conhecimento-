// Série "Concordância" (cap.port.02, trecho concordancia), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta das primeiras gramáticas do português à técnica de prova; as
// seguintes ensinam a regra geral e os verbos impessoais, o "se" e os casos especiais, e a
// concordância nominal, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (01-concordancia.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.02', sectionId: 'concordancia' } as const;

export const portConHistoria: MicroLesson = {
  ...S,
  id: 'port.concordancia.1',
  series: { id: 'port.concordancia', order: 1 },
  title: 'De onde vêm as regras de concordância',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Qual frase soa certa: "Os relatórios foi entregue" ou "Os relatórios foram entregues"?',
    options: [
      { text: '"Os relatórios foram entregues"', why: 'Isso. Verbo e palavras combinam com o sujeito. Esta aula conta de onde vêm essas regras.' },
      { text: '"Os relatórios foi entregue"', why: 'O sujeito está no plural; verbo e particípio também vão ao plural.' },
      { text: 'As duas estão certas', why: 'Só a segunda combina o verbo com o sujeito plural.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'latim',
      part: 'A história',
      title: 'Uma herança do latim',
      art: 'livro',
      goal: 'Saber que a concordância vem do latim.',
      explain:
        'O português nasceu do **latim** falado no Império Romano. No latim, verbo e sujeito já **combinavam** em número e pessoa, e o adjetivo **combinava** com o substantivo.\n\nO português herdou essa ideia: o verbo acompanha o **sujeito** ("os relatórios **foram**"), e o adjetivo acompanha o **nome** ("planilhas **anexas**").\n\nÉ isso que chamamos de **concordância**.',
      check: {
        kind: 'choice',
        id: 'la-c',
        prompt: 'Concordância é:',
        options: [
          { text: 'A combinação entre palavras, como verbo e sujeito', why: 'Isso.' },
          { text: 'A ordem alfabética das palavras', why: 'Concordância é combinação de número, pessoa e gênero.' },
          { text: 'O uso de vírgulas', why: 'Vírgulas são pontuação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **uniforme de time**: se o time (sujeito) está de azul, o goleiro (verbo) também usa azul. Em "os relatórios **foram** entregues", tudo veste o **plural** do sujeito.',
        check: {
          kind: 'choice',
          id: 'la-r',
          prompt: 'De que língua o português herdou a concordância?',
          options: [
            { text: 'Do latim', why: 'Isso.' },
            { text: 'Do inglês', why: 'O português vem do latim.' },
            { text: 'Do tupi', why: 'O tupi deu palavras ao português, mas a gramática vem do latim.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'gramaticas',
      part: 'A história',
      title: '1536 e 1540: as primeiras gramáticas',
      art: 'professores',
      goal: 'Conhecer as primeiras gramáticas do português.',
      explain:
        'Em **1536**, **Fernão de Oliveira** publicou em Lisboa a **primeira gramática** impressa do português.\n\nEm **1540**, **João de Barros** publicou outra gramática, também muito lida.\n\nDesde então, as gramáticas registram as regras da **norma-padrão**, a forma da língua usada em documentos, leis e provas. As questões de concordância cobram justamente essa norma.',
      check: {
        kind: 'order',
        id: 'gr-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Latim do Império Romano', 'Gramática de Fernão de Oliveira (1536)', 'Gramática de João de Barros (1540)'],
        why: 'Da língua-mãe às primeiras gramáticas do português.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma gramática é o **regulamento** da língua escrita. O primeiro regulamento impresso do português saiu em **1536**, por Fernão de Oliveira; quatro anos depois, em **1540**, veio o de João de Barros.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Quem publicou a primeira gramática impressa do português?',
          options: [
            { text: 'Fernão de Oliveira, em 1536', why: 'Isso.' },
            { text: 'João de Barros, em 1540', why: 'A de Barros veio quatro anos depois.' },
            { text: 'Aristóteles', why: 'Aristóteles é da Grécia antiga, muito antes do português.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'tecnica',
      part: 'Hoje',
      title: 'A técnica de prova',
      art: 'alvo',
      goal: 'Aplicar os três passos para conferir a concordância verbal.',
      explain:
        'Concordância é o assunto de gramática **mais frequente** nas provas da FCC. A técnica é sempre a mesma:\n\n1. **ache o verbo**;\n2. **ache o sujeito** (pergunte "o que" ou "quem" pratica a ação);\n3. **ponha o sujeito antes do verbo** e confira.\n\nEm "Faltam ainda três documentos", a ordem direta é "**três documentos** ainda **faltam**": plural.',
      check: {
        kind: 'choice',
        id: 'te-c',
        prompt: 'Em "Foram apresentados ao Tribunal os relatórios de gestão", qual é o sujeito?',
        options: [
          { text: 'Os relatórios de gestão', why: 'Isso: os relatórios foram apresentados.' },
          { text: 'O Tribunal', why: '"Ao Tribunal" é a quem foram apresentados; tem preposição.' },
          { text: 'Não há sujeito', why: 'Há: "os relatórios de gestão", depois do verbo.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pergunte ao verbo: "**o que** foi apresentado?". A resposta, "**os relatórios**", é o sujeito, mesmo vindo no fim. Agora ponha na frente: "Os relatórios **foram** apresentados ao Tribunal". O plural fica evidente.',
        check: {
          kind: 'choice',
          id: 'te-r',
          prompt: 'Qual é a armadilha número um da concordância?',
          options: [
            { text: 'O sujeito posposto, depois do verbo', why: 'Isso: o verbo é atraído pelo termo mais próximo.' },
            { text: 'O uso de maiúsculas', why: 'Maiúsculas não afetam a concordância.' },
            { text: 'Frases curtas', why: 'O problema é o sujeito depois do verbo.' },
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
      prompt: 'Ordene a técnica de conferir a concordância.',
      items: ['Achar o verbo', 'Achar o sujeito', 'Pôr o sujeito antes do verbo', 'Conferir número e pessoa'],
      why: 'Verbo, sujeito, ordem direta e conferência.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O verbo destacado está certo ou errado?',
      categories: ['Certo', 'Errado'],
      items: [
        { text: 'Faltam ainda três documentos', cat: 0, why: 'Três documentos faltam.' },
        { text: 'Foram apresentados os relatórios', cat: 0, why: 'Os relatórios foram apresentados.' },
        { text: 'Falta ainda três documentos', cat: 1, why: 'O sujeito é plural: faltam.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['O português vem do latim', 'Fernão de Oliveira: primeira gramática (1536)', 'O verbo concorda com o termo mais próximo'],
      bug: 2,
      why: 'O verbo concorda com o núcleo do sujeito, não com o termo mais próximo.',
      fixed: 'O verbo concorda com o núcleo do sujeito',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'A concordância vem do latim: verbo combina com o sujeito; adjetivo, com o nome.',
    '1536: Fernão de Oliveira publica a primeira gramática impressa do português; 1540: João de Barros.',
    'Técnica: ache o verbo, ache o sujeito, ponha o sujeito antes e confira. Cuidado com o sujeito posposto.',
  ],
};

export const portConVerbal: MicroLesson = {
  ...S,
  id: 'port.concordancia.2',
  series: { id: 'port.concordancia', order: 2 },
  title: 'Regra geral, haver e fazer',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Havia irregularidades no edital" ou "Haviam irregularidades no edital"?',
    options: [
      { text: '"Havia irregularidades"', why: 'Isso: "haver" no sentido de existir não vai ao plural. Esta aula explica.' },
      { text: '"Haviam irregularidades"', why: 'Pegadinha: "haver" com sentido de existir é impessoal, fica no singular.' },
      { text: 'As duas', why: 'Só "havia" segue a norma-padrão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'geral',
      part: 'Regra geral',
      title: 'O verbo segue o núcleo do sujeito',
      art: 'balanca',
      goal: 'Aplicar a regra geral, inclusive com sujeito oracional.',
      explain:
        'O verbo concorda em **número e pessoa** com o **núcleo do sujeito**, esteja ele antes ou depois.\n\n- "**Foram** apresentados **os relatórios**": sujeito plural, depois do verbo.\n- "**Cabe** aos auditores **verificar** os contratos": o sujeito é a oração "verificar os contratos". **Sujeito oracional** deixa o verbo no **singular**.',
      check: {
        kind: 'choice',
        id: 'ge-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Cabe aos gestores apresentar as contas.', why: 'Isso: o sujeito é "apresentar as contas", uma oração.' },
          { text: 'Cabem aos gestores apresentar as contas.', why: 'O sujeito é a oração "apresentar as contas": singular.' },
          { text: 'Cabiam aos gestores apresentar as contas.', why: 'O sujeito é uma oração: o verbo fica no singular, "cabia".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: "**o que** cabe aos gestores?". Resposta: "**apresentar as contas**". Isso é uma **ação**, uma oração inteira, e ações contam como **uma coisa só**: singular, "cabe".',
        check: {
          kind: 'choice',
          id: 'ge-r',
          prompt: 'Com sujeito oracional, o verbo fica:',
          options: [
            { text: 'No singular', why: 'Isso.' },
            { text: 'No plural', why: 'Oração como sujeito leva o verbo ao singular.' },
            { text: 'No infinitivo, sempre', why: 'O verbo principal se flexiona no singular.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'haver',
      part: 'Impessoais',
      title: 'Haver e fazer não têm sujeito',
      art: 'vazio',
      goal: 'Reconhecer haver e fazer impessoais.',
      explain:
        'Alguns verbos **não têm sujeito** e ficam sempre no **singular**:\n\n- **haver** no sentido de **existir** ou **ocorrer**: "**Havia** irregularidades";\n- **haver** e **fazer** indicando **tempo**: "**Há** dois anos..."; "**Faz** três meses que...".\n\nJá **existir**, **ocorrer** e **acontecer** **têm** sujeito: "**Existiam** irregularidades"; "**Ocorreram** falhas".',
      check: {
        kind: 'choice',
        id: 'ha-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Fazia dez anos que o processo tramitava.', why: 'Isso: "fazer" de tempo é impessoal.' },
          { text: 'Faziam dez anos que o processo tramitava.', why: 'Pegadinha: "fazer" indicando tempo fica no singular.' },
          { text: 'Houveram muitas falhas no edital.', why: '"Haver" de existir fica no singular: houve.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Troque **haver** por **existir** e veja a diferença: "**existiam** falhas" (existir tem sujeito, vai ao plural), mas "**havia** falhas" (haver não tem, fica no singular). Os dois dizem o mesmo; só a concordância muda.',
        check: {
          kind: 'choice',
          id: 'ha-r',
          prompt: 'Qual verbo vai ao plural em "______ falhas no sistema"?',
          options: [
            { text: 'Ocorreram', why: 'Isso: "ocorrer" tem sujeito, "falhas".' },
            { text: 'Houveram', why: '"Haver" de ocorrer é impessoal: houve.' },
            { text: 'Fizeram', why: '"Fazer" não tem esse sentido aqui.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'auxiliar',
      part: 'Impessoais',
      title: 'O auxiliar também fica no singular',
      art: 'engrenagem',
      goal: 'Aplicar a impessoalidade ao verbo auxiliar da locução.',
      explain:
        'Quando **haver** ou **fazer** impessoais estão numa **locução verbal**, o **auxiliar** também fica no singular. A impessoalidade "**contamina**" o auxiliar:\n\n- "**Deve haver** falhas" (nunca "devem haver");\n- "**Vai fazer** dez anos";\n- "**Pode haver** recursos".\n\nCom **existir**, o auxiliar vai ao plural: "**Devem existir** falhas".',
      check: {
        kind: 'choice',
        id: 'au-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Deve haver falhas no controle.', why: 'Isso.' },
          { text: 'Devem haver falhas no controle.', why: 'Pegadinha: o auxiliar acompanha o "haver" impessoal.' },
          { text: 'Deve existir falhas no controle.', why: 'Com "existir", o sujeito é "falhas": devem existir.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no auxiliar como um **carro rebocando** o verbo principal: ele vai para onde o principal manda. "Haver" impessoal **não tem sujeito**; então o auxiliar não tem com quem concordar e fica no **singular**: "deve haver".',
        check: {
          kind: 'choice',
          id: 'au-r',
          prompt: 'Com "existir", como fica: "______ existir recursos"?',
          options: [
            { text: 'Podem', why: 'Isso: "recursos" é sujeito de existir.' },
            { text: 'Pode', why: 'Com existir, o sujeito "recursos" leva o auxiliar ao plural.' },
            { text: 'Poderá', why: 'Continua faltando o plural: "podem existir".' },
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
      prompt: 'A frase segue a norma-padrão?',
      categories: ['Certa', 'Errada'],
      items: [
        { text: 'Havia irregularidades no edital.', cat: 0, why: 'Haver impessoal.' },
        { text: 'Existiam irregularidades no edital.', cat: 0, why: 'Existir concorda.' },
        { text: 'Devem haver soluções.', cat: 1, why: 'O certo é "deve haver".' },
        { text: 'Faziam três meses que a obra parou.', cat: 1, why: 'O certo é "fazia".' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Haver de existir: singular', 'Fazer de tempo: singular', 'Existir: sempre no singular'],
      bug: 2,
      why: '"Existir" tem sujeito e concorda com ele: existiam falhas.',
      fixed: 'Existir: concorda com o sujeito',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um parecer diz: "Devem haver falhas no controle de estoques". Qual correção propor?',
      scenarios: [
        { title: 'Opção A', body: '"**Deve haver** falhas no controle de estoques."' },
        { title: 'Opção B', body: 'Manter: "devem" concorda com "falhas".' },
      ],
      answer: 0,
      why: 'O haver impessoal deixa o auxiliar no singular.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.001' }],
  summary: [
    'O verbo concorda com o núcleo do sujeito, antes ou depois dele. Sujeito oracional: singular.',
    'Haver (existir, ocorrer, tempo) e fazer (tempo, fenômeno): impessoais, no singular.',
    'Existir, ocorrer e acontecer têm sujeito e concordam.',
    'O auxiliar acompanha o impessoal: "deve haver", "vai fazer".',
  ],
};

export const portConSe: MicroLesson = {
  ...S,
  id: 'port.concordancia.3',
  series: { id: 'port.concordancia', order: 3 },
  title: 'O "se" e os casos especiais',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Vendem-se imóveis" ou "Vende-se imóveis"?',
    options: [
      { text: '"Vendem-se imóveis"', why: 'Isso: os imóveis são vendidos. Esta aula mostra o teste.' },
      { text: '"Vende-se imóveis"', why: 'É comum na rua, mas na norma-padrão "imóveis" é sujeito: vendem-se.' },
      { text: 'Tanto faz', why: 'Na norma-padrão, só "vendem-se" está certo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'apassivador',
      part: 'O "se"',
      title: '"Se" apassivador ou de indeterminação',
      art: 'interruptor',
      goal: 'Distinguir o "se" apassivador do índice de indeterminação.',
      explain:
        'Faça o **teste da passiva**:\n\n- dá para dizer "**foram analisados**"? Então o "se" é **apassivador**, e o verbo **concorda**: "**Analisaram-se** os processos" (os processos foram analisados);\n- há **preposição** depois do verbo? Então o "se" **indetermina** o sujeito, e o verbo fica no **singular**: "**Precisa-se de** auditores"; "**Trata-se de** casos graves".',
      check: {
        kind: 'choice',
        id: 'ap-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Precisa-se de técnicos.', why: 'Isso: há preposição; singular.' },
          { text: 'Precisam-se de técnicos.', why: 'Pegadinha: com preposição, o "se" indetermina; singular.' },
          { text: 'Analisou-se os contratos.', why: 'Os contratos foram analisados: analisaram-se.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Olhe **logo depois do verbo**. Veio uma **preposição** ("de", "a", "em")? O verbo não tem com quem concordar: **singular**. Não veio? Transforme: "os contratos **foram analisados**". Funcionou? Então "**analisaram-se** os contratos".',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'Em "Trata-se de casos graves", o verbo fica no singular porque:',
          options: [
            { text: 'Há preposição; o "se" indetermina o sujeito', why: 'Isso.' },
            { text: '"Casos" é singular', why: '"Casos" é plural; mas não é sujeito.' },
            { text: 'É erro; o certo é "tratam-se"', why: 'Com a preposição "de", fica "trata-se".' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'especiais1',
      part: 'Casos especiais',
      title: 'Maioria, porcentagem, um dos que',
      art: 'abaco',
      goal: 'Aplicar a concordância com partitivos, porcentagens e "um dos que".',
      explain:
        'Três casos frequentes:\n\n- **expressão partitiva** (a maioria de, grande parte de) + plural: **singular ou plural**. "A maioria dos gestores **apresentou** ou **apresentaram**";\n- **porcentagem**: concorda com o **numeral** ou com o **termo especificado**. "**30%** do orçamento **foi** executado";\n- "**um dos que**": preferencialmente **plural**. "Foi um dos auditores que mais **trabalharam**".',
      check: {
        kind: 'choice',
        id: 'e1-c',
        prompt: '"A maioria dos servidores ______ a proposta." Qual forma a norma aceita?',
        options: [
          { text: 'Aprovou ou aprovaram', why: 'Isso: com partitivo, as duas são aceitas.' },
          { text: 'Só aprovou', why: 'O plural também é aceito.' },
          { text: 'Só aprovaram', why: 'O singular também é aceito.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na **maioria dos servidores**, você pode olhar para o **grupo** ("a maioria", singular) ou para as **pessoas** ("os servidores", plural). A norma deixa escolher. Já em "**mais de um** conselheiro **votou**", o padrão é o singular.',
        check: {
          kind: 'choice',
          id: 'e1-r',
          prompt: '"Mais de um conselheiro ______ contra." Qual é o padrão?',
          options: [
            { text: 'Votou', why: 'Isso: singular, salvo reciprocidade ou repetição.' },
            { text: 'Votaram', why: 'O padrão com "mais de um" é o singular.' },
            { text: 'Votamos', why: 'Não há primeira pessoa no sujeito.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'especiais2',
      part: 'Casos especiais',
      title: 'Que, quem, composto e o verbo ser',
      art: 'pessoal',
      goal: 'Aplicar a concordância com relativos, sujeito composto e o verbo ser.',
      explain:
        'Mais casos:\n\n- **que**: o verbo concorda com o **antecedente**. "Fomos **nós que assinamos**";\n- **quem**: 3ª pessoa do singular ou com o antecedente. "Fui eu **quem assinou**" (ou **assinei**);\n- **sujeito composto antes** do verbo: **plural**. "O gestor e o contador **assinaram**";\n- **ser** pode concordar com o predicativo: "**Hoje são** 10 de maio"; "**É** meio-dia e meia".',
      check: {
        kind: 'choice',
        id: 'e2-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Fomos nós que assinamos o relatório.', why: 'Isso: o verbo concorda com "nós".' },
          { text: 'Fomos nós que assinou o relatório.', why: 'Com "que", o verbo concorda com o antecedente "nós".' },
          { text: 'Fomos nós que assinaram o relatório.', why: 'O antecedente é "nós": assinamos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O "**que**" é um **espelho**: reflete quem veio antes dele. Antes veio "**nós**", então o verbo depois do "que" se veste de "nós": **assinamos**. Já o "quem" aceita também a 3ª pessoa: "fui eu quem **assinou**".',
        check: {
          kind: 'choice',
          id: 'e2-r',
          prompt: '"Hoje ______ 10 de maio." Qual forma?',
          options: [
            { text: 'São', why: 'Isso: "ser" concorda com o predicativo nas datas.' },
            { text: 'É', why: 'Com datas no plural, o "ser" vai ao plural; "é" serve para "meio-dia".' },
            { text: 'Foi', why: 'Mudaria o tempo; e com dias no plural, "são".' },
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
      prompt: 'Que tipo de "se" aparece em cada frase?',
      categories: ['Apassivador (concorda)', 'Indeterminação (singular)'],
      items: [
        { text: 'Analisaram-se os processos.', cat: 0, why: 'Os processos foram analisados.' },
        { text: 'Vendem-se imóveis.', cat: 0, why: 'Imóveis são vendidos.' },
        { text: 'Precisa-se de auditores.', cat: 1, why: 'Há preposição.' },
        { text: 'Trata-se de casos graves.', cat: 1, why: 'Há preposição.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Analisaram-se os contratos', 'Precisa-se de técnicos', 'Precisam-se de técnicos'],
      bug: 2,
      why: 'Com preposição, o "se" indetermina o sujeito; o verbo fica no singular.',
      fixed: 'Precisa-se de técnicos',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O relatório diz "Analisou-se, no exercício, os contratos de manutenção". Qual correção?',
      scenarios: [
        { title: 'Opção A', body: '"**Analisaram-se**, no exercício, os contratos de manutenção."' },
        { title: 'Opção B', body: 'Manter: o "se" sempre deixa o verbo no singular.' },
      ],
      answer: 0,
      why: 'Os contratos foram analisados: "se" apassivador, verbo no plural.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.002' }],
  summary: [
    '"Se" apassivador (VTD): verbo concorda. Teste: "os processos foram analisados".',
    '"Se" de indeterminação (com preposição): singular. "Precisa-se de", "trata-se de".',
    'Partitivo: singular ou plural. Porcentagem: numeral ou termo. "Um dos que": plural. "Mais de um": singular.',
    '"Que" concorda com o antecedente; "quem" aceita a 3ª pessoa. "Ser" pode concordar com o predicativo.',
  ],
};

export const portConNominal: MicroLesson = {
  ...S,
  id: 'port.concordancia.4',
  series: { id: 'port.concordancia', order: 4 },
  title: 'Concordância nominal',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Seguem anexo as planilhas" ou "Seguem anexas as planilhas"?',
    options: [
      { text: '"Seguem anexas as planilhas"', why: 'Isso: "anexo" concorda com o nome. Esta aula mostra as palavras que variam e as que não variam.' },
      { text: '"Seguem anexo as planilhas"', why: '"Anexo" é adjetivo e concorda: anexas.' },
      { text: 'As duas', why: 'Só "anexas" concorda; ou então "em anexo", invariável.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'adjetivo',
      part: 'Adjetivos',
      title: 'O adjetivo e vários nomes',
      art: 'balanca',
      goal: 'Concordar o adjetivo com mais de um substantivo.',
      explain:
        'Quando um adjetivo se refere a **vários nomes**:\n\n- **depois** dos nomes: concorda com o **mais próximo** ou vai ao **plural** (o masculino prevalece). "Relatório e planilha **revisada**" ou "**revisados**";\n- **antes** dos nomes: concorda com o **mais próximo**. "**Revisada** planilha e relatório".',
      check: {
        kind: 'choice',
        id: 'ad-c',
        prompt: '"Contrato e nota ______." Quais formas a norma aceita?',
        options: [
          { text: 'Conferida ou conferidos', why: 'Isso: o mais próximo ou o plural masculino.' },
          { text: 'Só conferidas', why: 'No plural, o masculino prevalece: conferidos.' },
          { text: 'Só conferido', why: 'Concordaria com "contrato", que não é o mais próximo.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine o adjetivo **andando** até os nomes. Se ele chega **por trás** (depois), pode cumprimentar **só o vizinho** ("nota conferida") ou **todos de uma vez** ("conferidos", e no grupo misto vale o masculino).',
        check: {
          kind: 'choice',
          id: 'ad-r',
          prompt: 'Adjetivo antes de dois nomes concorda com:',
          options: [
            { text: 'O mais próximo', why: 'Isso.' },
            { text: 'O mais distante', why: 'Antes dos nomes, vale o mais próximo.' },
            { text: 'Sempre o masculino plural', why: 'Antes dos nomes, concorda com o mais próximo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'variaveis',
      part: 'Palavras que variam',
      title: 'Anexo, mesmo, quite, obrigado',
      art: 'cartao',
      goal: 'Concordar as palavras variáveis e reconhecer "em anexo".',
      explain:
        'Estas palavras **concordam** com o nome a que se referem: **anexo, incluso, obrigado, próprio, mesmo, quite**.\n\n- "Seguem **anexas** as planilhas";\n- "Elas **mesmas** assinaram";\n- "Estamos **quites**";\n- "Muito **obrigada**", diz a servidora.\n\nMas a locução **em anexo** é **invariável**: "Seguem **em anexo** as planilhas".',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Seguem anexas as planilhas de custos.', why: 'Isso.' },
          { text: 'Segue anexo as planilhas de custos.', why: '"Planilhas" é plural feminino: seguem anexas.' },
          { text: 'Seguem em anexas as planilhas.', why: '"Em anexo" é locução invariável.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: "**anexo**" está grudado num nome, como um adjetivo? Então ele **se veste** como o nome: planilha**s** anexa**s**. Apareceu o "**em**" antes? Virou uma locução, como "em ordem": não muda nunca.',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: '"Nós já estamos ______ com a tesouraria."',
          options: [
            { text: 'Quites', why: 'Isso: "quite" concorda.' },
            { text: 'Quite', why: '"Quite" é variável: nós estamos quites.' },
            { text: 'Em quite', why: 'Não existe essa locução.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'invariaveis',
      part: 'Depende do papel',
      title: 'Meio, bastante, só e é proibido',
      art: 'interruptor',
      goal: 'Decidir quando meio, bastante, só e "é proibido" variam.',
      explain:
        'O **papel** da palavra decide:\n\n- **meio** = um pouco (advérbio): **invariável**, "**meio** cansada"; = metade: varia, "**meia** hora";\n- **bastante** = muito (advérbio): invariável, "**bastante** atrasados"; antes de nome, varia: "**bastantes** provas";\n- **só** = sozinho: varia, "ficaram **sós**"; = somente: invariável;\n- **é proibido**, **é necessário**: invariáveis **sem** artigo, "**É proibido** entrada"; variáveis **com** artigo, "**É proibida a** entrada".\n\n**Menos** e **alerta** não variam.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'A servidora estava meio cansada.', why: 'Isso: "meio" = um pouco, invariável.' },
          { text: 'A servidora estava meia cansada.', why: '"Meio" aqui é advérbio: invariável.' },
          { text: 'É proibida entrada de visitantes.', why: 'Sem artigo, fica "é proibido entrada"; com artigo, "é proibida a entrada".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Troque pela palavra que explica o papel. "Meio cansada" = "**um pouco** cansada": advérbio, não muda. "Meia hora" = "**metade** de uma hora": numeral, muda. "Bastante atrasados" = "**muito** atrasados": não muda.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: '"Há ______ provas contra o réu." Qual forma?',
          options: [
            { text: 'Bastantes', why: 'Isso: antes do nome, "bastante" varia (= muitas).' },
            { text: 'Bastante', why: 'Antes do nome "provas", "bastante" concorda: bastantes.' },
            { text: 'Bastanta', why: 'Essa forma não existe.' },
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
      prompt: 'A palavra destacada varia ou não?',
      categories: ['Varia', 'Não varia'],
      items: [
        { text: 'anexo, em "planilhas anexas"', cat: 0, why: 'Adjetivo.' },
        { text: 'mesmo, em "elas mesmas"', cat: 0, why: 'Concorda com "elas".' },
        { text: 'em anexo', cat: 1, why: 'Locução invariável.' },
        { text: 'menos, em "menos falhas"', cat: 1, why: 'Sempre invariável.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['meia hora', 'meio cansada', 'menas falhas'],
      bug: 2,
      why: '"Menos" é invariável: menos falhas.',
      fixed: 'menos falhas',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma placa diz "É proibida entrada". Qual correção?',
      scenarios: [
        { title: 'Opção A', body: '"**É proibido** entrada" ou "**É proibida a** entrada."' },
        { title: 'Opção B', body: '"**São proibidas** entrada."' },
      ],
      answer: 0,
      why: 'Sem artigo, fica invariável; com artigo, concorda com "a entrada".',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.003' }],
  summary: [
    'Adjetivo depois de vários nomes: o mais próximo ou plural (masculino prevalece). Antes: o mais próximo.',
    'Variam: anexo, incluso, obrigado, próprio, mesmo, quite. "Em anexo" é invariável.',
    'Meio (um pouco) e bastante (muito) não variam; meia (metade) e bastantes (muitos) variam.',
    '"É proibido" sem artigo não varia; "é proibida a" concorda. Menos e alerta não variam.',
  ],
};
