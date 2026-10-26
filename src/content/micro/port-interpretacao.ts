// Série "Interpretação, discursos e figuras de linguagem" (cap.port.01, trecho interpretacao), no ritmo
// lento com história pedido em 25/10/2026: a primeira aula conta de Aristóteles a Graciliano Ramos; as
// seguintes ensinam compreensão, interpretação, pressupostos e discursos, depois denotação,
// intertextualidade e figuras, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (01-interpretacao.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.01', sectionId: 'interpretacao' } as const;

export const portIntHistoria: MicroLesson = {
  ...S,
  id: 'port.interpretacao.1',
  series: { id: 'port.interpretacao', order: 1 },
  title: 'De Aristóteles a Graciliano Ramos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Quando alguém diz "aquele processo é uma bomba-relógio", fala de uma bomba de verdade?',
    options: [
      { text: 'Não: é um jeito figurado de dizer que vai dar problema', why: 'Isso: é uma metáfora. Esta aula conta há quanto tempo se estuda isso.' },
      { text: 'Sim: há uma bomba no processo', why: 'É sentido figurado: o processo pode "explodir" em problemas.' },
      { text: 'Não quer dizer nada', why: 'Quer dizer muito: que o caso é perigoso e urgente.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'aristoteles',
      part: 'A história',
      title: 'A metáfora de Aristóteles',
      art: 'livro',
      goal: 'Saber que Aristóteles definiu a metáfora e estudou a retórica.',
      explain:
        'No **século IV a.C.**, o filósofo grego **Aristóteles** escreveu a ***Poética***. Nela, definiu a **metáfora** como **levar o nome de uma coisa para outra**.\n\nQuando se diz "o orçamento é uma **colcha curta**", leva-se o nome "colcha curta" para o orçamento: ele não cobre tudo.\n\nNa ***Retórica***, Aristóteles estudou **como os discursos convencem**. Ler bem, até hoje, é perceber esses recursos.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'Como Aristóteles definiu a metáfora?',
        options: [
          { text: 'Levar o nome de uma coisa para outra', why: 'Isso.' },
          { text: 'Exagerar de propósito', why: 'Exagero é a hipérbole.' },
          { text: 'Repetir uma palavra sem necessidade', why: 'Isso é o pleonasmo vicioso.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na metáfora, uma coisa **"empresta" o nome** de outra por semelhança. "Ele é um **leão** no tribunal" leva o nome do leão (forte, corajoso) para a pessoa. Ninguém pensa que ele tem juba.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Em que obra Aristóteles estudou como os discursos convencem?',
          options: [
            { text: 'Retórica', why: 'Isso.' },
            { text: 'Vidas Secas', why: 'Vidas Secas é de Graciliano Ramos, de 1938.' },
            { text: 'Elementos', why: 'Elementos é de Euclides, sobre matemática.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'quintiliano',
      part: 'A história',
      title: 'O catálogo de Quintiliano',
      art: 'cartao',
      goal: 'Saber que Quintiliano organizou as figuras de linguagem.',
      explain:
        'No **século I**, o professor romano **Quintiliano** escreveu a ***Instituição Oratória***, um manual para formar oradores.\n\nNele, organizou as **figuras de linguagem** que os oradores usavam para dar força ao discurso.\n\nMuitos nomes que estudamos até hoje, como **metonímia**, **hipérbole** e **ironia**, vêm dessa tradição greco-romana.',
      check: {
        kind: 'choice',
        id: 'qu-c',
        prompt: 'Para quem Quintiliano escreveu a Instituição Oratória?',
        options: [
          { text: 'Para formar oradores', why: 'Isso.' },
          { text: 'Para ensinar matemática', why: 'É um manual de oratória.' },
          { text: 'Para fixar a ortografia do português', why: 'O português nem existia; é um manual romano de oratória.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **curso de oratória** de hoje, com técnicas para prender a atenção. Quintiliano fez isso há quase dois mil anos, e por isso as figuras têm nomes gregos e latinos: **hipérbole**, "lançar além", exagero; **ironia**, "fingimento".',
        check: {
          kind: 'choice',
          id: 'qu-r',
          prompt: 'De onde vêm os nomes de muitas figuras de linguagem?',
          options: [
            { text: 'Da tradição greco-romana', why: 'Isso.' },
            { text: 'Do Acordo Ortográfico de 1990', why: 'O Acordo trata de grafia, não de figuras.' },
            { text: 'Dos dicionários do século XX', why: 'São muito mais antigos.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'palmeiras',
      part: 'A história',
      title: 'Um poema e sua paródia',
      art: 'trilha',
      goal: 'Reconhecer a paródia como forma de intertextualidade.',
      explain:
        'Em **1843**, **Gonçalves Dias** escreveu a "**Canção do Exílio**": "Minha terra tem **palmeiras**, / Onde canta o Sabiá".\n\nEm **1925**, **Oswald de Andrade** retomou o poema com outro sentido: "Minha terra tem **palmares**", lembrando o quilombo de Palmares.\n\nQuando um texto dialoga com outro, há **intertextualidade**. Quando retoma e **muda o sentido**, muitas vezes com crítica ou humor, é **paródia**.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'O "Minha terra tem palmares", de Oswald, em relação ao poema de Gonçalves Dias, é:',
        options: [
          { text: 'Paródia: retoma o texto e muda o sentido', why: 'Isso.' },
          { text: 'Citação literal', why: 'A citação reproduz sem mudar; aqui o sentido muda.' },
          { text: 'Um texto sem relação com o outro', why: 'A relação é evidente: é intertextualidade.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **música famosa** com a letra trocada para fazer crítica: todo mundo reconhece a original, e é justamente por isso que a nova faz efeito. Oswald fez isso com a Canção do Exílio: o leitor ouve "palmeiras" por trás de "palmares".',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Quando um texto dialoga com outro, há:',
          options: [
            { text: 'Intertextualidade', why: 'Isso.' },
            { text: 'Denotação', why: 'Denotação é sentido literal.' },
            { text: 'Crase', why: 'Crase é fusão de vogais.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'graciliano',
      part: 'A história',
      title: 'Vidas Secas e o indireto livre',
      art: 'pessoal',
      goal: 'Reconhecer o discurso indireto livre em Vidas Secas.',
      explain:
        'Em **1938**, em ***Vidas Secas***, **Graciliano Ramos** usou muito o **discurso indireto livre**.\n\nO narrador conta a história, mas, sem aviso, aparecem os **pensamentos do personagem** Fabiano, misturados à narração, sem dois-pontos nem aspas.\n\nNum exemplo do Tribunal: "O conselheiro folheava os autos. **Pedir vista? Talvez fosse prudente.**" A pergunta é dele, dentro da voz do narrador.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'No discurso indireto livre, o pensamento do personagem aparece:',
        options: [
          { text: 'Misturado à voz do narrador, sem marcas de introdução', why: 'Isso.' },
          { text: 'Sempre entre aspas, depois de dois-pontos', why: 'Isso é o discurso direto.' },
          { text: 'Numa oração com "que", contada pelo narrador', why: 'Isso é o discurso indireto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Repare na diferença: com **aspas e dois-pontos**, o personagem fala sozinho (direto); com "**que**", o narrador conta o que ele disse (indireto); **sem nada disso**, mas com o jeito de pensar do personagem, é o **indireto livre**: as duas vozes juntas.',
        check: {
          kind: 'order',
          id: 'gr-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Poética de Aristóteles (século IV a.C.)', 'Instituição Oratória de Quintiliano (século I)', 'Canção do Exílio (1843)', 'Vidas Secas (1938)'],
          why: 'Da Grécia antiga ao romance brasileiro.',
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
      lines: ['Aristóteles: definiu a metáfora', 'Oswald de Andrade: paródia da Canção do Exílio', 'Graciliano Ramos: escreveu a Canção do Exílio'],
      bug: 2,
      why: 'A Canção do Exílio é de Gonçalves Dias (1843). Graciliano escreveu Vidas Secas (1938).',
      fixed: 'Graciliano Ramos: Vidas Secas (1938)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Aristóteles', 'Quintiliano', 'Graciliano Ramos'],
      items: [
        { text: 'Poética e Retórica', cat: 0, why: 'Século IV a.C.' },
        { text: 'Instituição Oratória', cat: 1, why: 'Século I.' },
        { text: 'Vidas Secas', cat: 2, why: '1938.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um texto diz "O Tribunal é o cão de guarda do dinheiro público". Que recurso há?',
      options: [
        { text: 'Metáfora: o nome "cão de guarda" é levado para o Tribunal', why: 'Isso.' },
        { text: 'Discurso indireto', why: 'Não há fala relatada.' },
        { text: 'Sentido literal', why: 'O Tribunal não é um cão: o sentido é figurado.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Aristóteles (século IV a.C.): na Poética, a metáfora é levar o nome de uma coisa para outra; na Retórica, como os discursos convencem.',
    'Quintiliano (século I): Instituição Oratória, catálogo de figuras que dá nome às que estudamos.',
    'Gonçalves Dias (1843) e Oswald de Andrade (1925): poema e paródia, exemplo de intertextualidade.',
    'Graciliano Ramos, Vidas Secas (1938): discurso indireto livre, a voz do personagem dentro da do narrador.',
  ],
};

export const portIntLeitura: MicroLesson = {
  ...S,
  id: 'port.interpretacao.2',
  series: { id: 'port.interpretacao', order: 2 },
  title: 'Compreender, interpretar e os discursos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"O Tribunal voltou a apontar falhas." Só por essa frase, o que dá para saber?',
    options: [
      { text: 'Que o Tribunal já tinha apontado falhas antes', why: 'Isso: "voltou a" garante isso. Esta aula ensina a ler o que a frase garante.' },
      { text: 'Que as falhas foram corrigidas', why: 'A frase não diz isso.' },
      { text: 'Que a culpa é do servidor', why: 'A frase não atribui culpa a ninguém.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'compreender',
      part: 'Leitura',
      title: 'Compreender e interpretar',
      art: 'livro',
      goal: 'Distinguir compreensão de interpretação pelos comandos da questão.',
      explain:
        '- **Compreensão**: recuperar o que está **dito**, explícito no texto. Comandos: "**Segundo o texto...**", "**o autor afirma que...**".\n- **Interpretação**: inferir o que está **implícito**, a partir de pistas do próprio texto. Comandos: "**Depreende-se...**", "**infere-se que...**", "**o autor sugere que...**".\n\nNos dois casos, a resposta precisa estar **sustentada pelo texto**.',
      check: {
        kind: 'sort',
        id: 'co-c',
        prompt: 'O comando pede compreensão ou interpretação?',
        categories: ['Compreensão', 'Interpretação'],
        items: [
          { text: '"Segundo o texto, ..."', cat: 0, why: 'Recuperar o que está dito.' },
          { text: '"Infere-se do texto que..."', cat: 1, why: 'Inferir o implícito.' },
          { text: '"O autor afirma que..."', cat: 0, why: 'Está dito.' },
          { text: '"Depreende-se que..."', cat: 1, why: 'Inferir.' },
        ],
      },
      recovery: {
        explain: '**Compreender** é como ler o **cardápio**: o prato está escrito ali. **Interpretar** é perceber, pelo cheiro que vem da cozinha, que o forno está ligado: não está escrito, mas as **pistas** mostram. Nos dois casos, você não inventa nada.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Na interpretação, a resposta pode trazer a opinião do candidato?',
          options: [
            { text: 'Não: precisa estar sustentada pelo texto', why: 'Isso.' },
            { text: 'Sim, se for bem escrita', why: 'A opinião pessoal não é sustentada pelo texto.' },
            { text: 'Sim, sempre', why: 'Inferir é partir das pistas do texto, não da opinião.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'armadilhas',
      part: 'Leitura',
      title: 'Extrapolação e troca de agentes',
      art: 'alvo',
      goal: 'Reconhecer as armadilhas mais comuns nas alternativas.',
      explain:
        '- **Extrapolação**: palavras absolutas como "**sempre**", "**todos**", "**nunca**", "**exclusivamente**" costumam ir além do texto.\n- **Troca de agentes** ou de **causa e efeito**: o texto diz que **a auditoria revelou as falhas**; a alternativa diz que **as falhas motivaram a auditoria**.\n- **Opinião** do candidato não conta.\n\nConfirme sempre no texto antes de marcar.',
      check: {
        kind: 'choice',
        id: 'am-c',
        prompt: 'O texto: "A auditoria revelou falhas no almoxarifado." Qual alternativa troca causa e efeito?',
        options: [
          { text: 'As falhas no almoxarifado motivaram a auditoria', why: 'Isso: inverteu quem causou o quê.' },
          { text: 'A auditoria encontrou problemas no almoxarifado', why: 'Essa é fiel ao texto.' },
          { text: 'Houve falhas no almoxarifado', why: 'Essa é fiel ao texto.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia devagar quem **faz** a ação: no texto, **a auditoria** revelou (ela é o agente; as falhas apareceram **depois** dela). Na alternativa errada, **as falhas** viram o motivo, vindo **antes** da auditoria. A ordem e o agente mudaram.',
        check: {
          kind: 'choice',
          id: 'am-r',
          prompt: 'Por que alternativas com "exclusivamente" costumam estar erradas?',
          options: [
            { text: 'Tendem a ir além do que o texto diz', why: 'Isso, embora seja preciso conferir.' },
            { text: 'Porque a palavra é longa', why: 'O problema é o absoluto, não o tamanho.' },
            { text: 'Nunca estão erradas', why: 'Costumam extrapolar; confira no texto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pressuposto',
      part: 'Leitura',
      title: 'Pressuposto e subentendido',
      art: 'balanca',
      goal: 'Distinguir pressuposto de subentendido.',
      explain:
        '- **Pressuposto**: informação que a **própria frase garante**. "O Tribunal **voltou a** apontar irregularidades" pressupõe que **já as apontara antes**.\n- **Subentendido**: depende do **contexto** e da **intenção** de quem fala. "Está frio aqui", dito perto de uma janela aberta, pode sugerir "feche a janela".\n\nPressuposto e subentendido **não são sinônimos**.',
      check: {
        kind: 'choice',
        id: 'ps-c',
        prompt: '"O gestor deixou de prestar contas." Que pressuposto a frase traz?',
        options: [
          { text: 'Antes, o gestor prestava contas', why: 'Isso: "deixou de" garante que fazia antes.' },
          { text: 'O gestor é desonesto', why: 'Isso seria um julgamento, não algo que a frase garante.' },
          { text: 'O gestor será multado', why: 'A frase não garante consequência.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Procure as **palavrinhas que carregam passado**: "voltou a", "deixou de", "continua", "ainda", "de novo". Elas **garantem** algo sem dizer abertamente. Já o subentendido muda conforme quem fala e onde: é **insinuação**, não garantia.',
        check: {
          kind: 'choice',
          id: 'ps-r',
          prompt: 'O subentendido depende de:',
          options: [
            { text: 'Contexto e intenção de quem fala', why: 'Isso.' },
            { text: 'Só das palavras da frase', why: 'Isso define o pressuposto.' },
            { text: 'Da ortografia', why: 'Não tem relação com a grafia.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'generos',
      part: 'Leitura',
      title: 'Gêneros e contexto histórico',
      art: 'calendario',
      goal: 'Reconhecer a finalidade dos gêneros e ler o texto à luz de sua época.',
      explain:
        'Cada **gênero** tem uma finalidade:\n\n- **notícia** informa;\n- **editorial** e **artigo de opinião** argumentam;\n- **crônica** comenta o cotidiano com tom pessoal;\n- **relatório de auditoria** descreve achados com objetividade.\n\nO sentido também depende da **época**: uma crônica do início do século XX que fala de "**bondes**" e "**telegramas**" deve ser lida à luz do seu tempo.',
      check: {
        kind: 'sort',
        id: 'ge-c',
        prompt: 'Qual a finalidade principal de cada gênero?',
        categories: ['Informar', 'Argumentar', 'Comentar o cotidiano'],
        items: [
          { text: 'Notícia', cat: 0, why: 'Informa um fato.' },
          { text: 'Editorial', cat: 1, why: 'Defende uma posição.' },
          { text: 'Crônica', cat: 2, why: 'Tom pessoal sobre o dia a dia.' },
        ],
      },
      recovery: {
        explain: 'Pergunte: **para que** este texto foi escrito? Para **contar** o que aconteceu (notícia), para **convencer** (editorial, opinião), para **conversar** sobre a vida (crônica), para **registrar** achados com precisão (relatório). E pergunte também **quando**: palavras e costumes mudam.',
        check: {
          kind: 'choice',
          id: 'ge-r',
          prompt: 'Um relatório de auditoria descreve achados com:',
          options: [
            { text: 'Objetividade', why: 'Isso.' },
            { text: 'Tom pessoal e humor', why: 'Isso é mais da crônica.' },
            { text: 'Linguagem figurada', why: 'Relatórios preferem o sentido literal.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'discursos',
      part: 'Discursos',
      title: 'Direto, indireto e indireto livre',
      art: 'pessoal',
      goal: 'Reconhecer os três tipos de discurso.',
      explain:
        '- **Direto**: fala reproduzida **literalmente**, com verbo de elocução, dois-pontos, travessão ou aspas. O conselheiro declarou: "**Vou** pedir vista do processo."\n- **Indireto**: o narrador relata com suas palavras, numa oração com "**que**". O conselheiro declarou **que ia** pedir vista.\n- **Indireto livre**: fala ou pensamento misturado à voz do narrador, **sem marcas**. O conselheiro folheava os autos. **Pedir vista?**',
      check: {
        kind: 'sort',
        id: 'di-c',
        prompt: 'Que discurso é cada frase?',
        categories: ['Direto', 'Indireto', 'Indireto livre'],
        items: [
          { text: 'A auditora disse: "Encontrei o erro."', cat: 0, why: 'Fala literal, com aspas.' },
          { text: 'A auditora disse que encontrara o erro.', cat: 1, why: 'Relatada com "que".' },
          { text: 'A auditora releu a planilha. Seria aquele o erro?', cat: 2, why: 'Pensamento sem marcas.' },
        ],
      },
      recovery: {
        explain: 'Procure as **marcas**: aspas, travessão ou dois-pontos indicam **direto**; "disse **que**" indica **indireto**; uma pergunta ou exclamação do personagem **solta no meio da narração**, sem nada antes, indica **indireto livre**.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'O que costuma introduzir a fala no discurso indireto?',
          options: [
            { text: 'Uma oração com "que"', why: 'Isso.' },
            { text: 'Aspas', why: 'Aspas marcam o direto.' },
            { text: 'Nada', why: 'Sem marca é o indireto livre.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'transposicao',
      part: 'Discursos',
      title: 'Do direto para o indireto',
      art: 'degraus',
      goal: 'Transpor tempos, pessoas e advérbios do direto para o indireto.',
      explain:
        'Ao passar do direto para o indireto, mudam **pessoa**, **tempo** e **advérbios**:\n\n- presente "**vou**" → imperfeito "**ia**";\n- perfeito "**fiz**" → mais-que-perfeito "**fizera**" ou "**tinha feito**";\n- futuro "**farei**" → futuro do pretérito "**faria**";\n- imperativo "**entregue**" → "**que entregasse**";\n- "**hoje**, **aqui**, **este**" → "**naquele dia**, **ali**, **aquele**"; "**amanhã**" → "**no dia seguinte**".',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'O relator afirmou: "Vou apresentar o voto amanhã." No indireto, fica:',
        options: [
          { text: 'O relator afirmou que ia apresentar o voto no dia seguinte.', why: 'Isso: "vou" → "ia"; "amanhã" → "no dia seguinte".' },
          { text: 'O relator afirmou que vou apresentar o voto amanhã.', why: 'Manteve a 1ª pessoa e o advérbio do direto.' },
          { text: 'O relator afirmou que apresentara o voto no dia anterior.', why: 'O mais-que-perfeito muda o sentido: ação já feita.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Tudo "**recua um passo**" no tempo, porque agora é o narrador contando **depois**: o presente vira passado (vou → ia), o futuro vira futuro do pretérito (farei → faria), e as palavras de "agora e aqui" viram "**naquele momento e ali**" (amanhã → no dia seguinte).',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: '"Farei a entrega", no discurso indireto, vira:',
          options: [
            { text: 'que faria a entrega', why: 'Isso: futuro do presente → futuro do pretérito.' },
            { text: 'que farei a entrega', why: 'O tempo precisa recuar.' },
            { text: 'que fez a entrega', why: 'Isso muda o sentido: a entrega ainda não aconteceu.' },
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
      lines: ['"Voltou a" cria pressuposto', 'Indireto: "farei" vira "faria"', 'Pressuposto e subentendido são sinônimos'],
      bug: 2,
      why: 'O pressuposto decorre da frase; o subentendido depende do contexto e da intenção.',
      fixed: 'Pressuposto vem da frase; subentendido, do contexto',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Texto: "O Tribunal voltou a apontar falhas no estoque, que persistem apesar das recomendações." Qual alternativa se sustenta?',
      scenarios: [
        { title: 'Alternativa A', body: 'As falhas decorrem exclusivamente de falta de pessoal.' },
        { title: 'Alternativa B', body: 'As falhas já tinham sido apontadas anteriormente pelo Tribunal.' },
      ],
      answer: 1,
      why: 'B vem do pressuposto de "voltou a". A extrapola: a causa não é mencionada, e "exclusivamente" é absoluto.',
      errorKind: 'leitura',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'Como cada palavra fica no discurso indireto?',
      categories: ['ia', 'naquele dia', 'faria'],
      items: [
        { text: 'vou', cat: 0, why: 'Presente → imperfeito.' },
        { text: 'hoje', cat: 1, why: 'Advérbio de agora → daquele momento.' },
        { text: 'farei', cat: 2, why: 'Futuro → futuro do pretérito.' },
      ],
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.002' },
  ],
  summary: [
    'Compreensão: o que está dito ("segundo o texto"). Interpretação: o implícito ("infere-se"). Sempre sustentado pelo texto.',
    'Armadilhas: absolutos (sempre, nunca, exclusivamente), troca de agentes e de causa e efeito, opinião.',
    'Pressuposto: a frase garante ("voltou a"). Subentendido: depende do contexto e da intenção.',
    'Gêneros: notícia informa, editorial argumenta, crônica comenta, relatório descreve com objetividade. Leia à luz da época.',
    'Direto, indireto ("que") e indireto livre. No indireto, tudo recua: vou → ia, farei → faria, amanhã → no dia seguinte.',
  ],
};

export const portIntFiguras: MicroLesson = {
  ...S,
  id: 'port.interpretacao.3',
  series: { id: 'port.interpretacao', order: 3 },
  title: 'Denotação, intertextualidade e figuras',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"O Planalto vetou o projeto." Foi o prédio que vetou?',
    options: [
      { text: 'Não: o lugar está no lugar da instituição', why: 'Isso: é uma figura chamada metonímia. Esta aula mostra essa e outras.' },
      { text: 'Sim: o prédio votou', why: 'Prédios não votam: o nome do lugar representa o governo.' },
      { text: 'É uma metáfora', why: 'É metonímia: relação de proximidade (lugar pela instituição), não de semelhança.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'denotacao',
      part: 'Sentido',
      title: 'Denotação e conotação',
      art: 'livro',
      goal: 'Distinguir sentido literal de figurado.',
      explain:
        '- **Denotação**: sentido **literal**, de dicionário. "O auditor abriu a **porta** do arquivo."\n- **Conotação**: sentido **figurado**, ampliado pelo contexto. "A transparência é a **porta** de entrada do controle social."\n\nA denotação predomina em textos **técnicos**, **normativos** e **científicos**; a conotação, em **literatura**, **publicidade**, **crônica** e **discursos**.\n\nRedação oficial prefere a **denotação**, porque a conotação admite mais de uma leitura.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'Em qual frase "chave" está em sentido conotativo?',
        options: [
          { text: 'A transparência é a chave do bom governo.', why: 'Isso: sentido figurado.' },
          { text: 'Perdi a chave do armário.', why: 'Sentido literal.' },
          { text: 'A chave abre a sala de servidores.', why: 'Sentido literal.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pergunte: dá para **pegar com a mão**? A chave do armário, sim: **literal** (denotação). A "chave do bom governo", não: é o que **resolve**, por comparação. Isso é sentido **figurado** (conotação).',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Por que a redação oficial prefere a denotação?',
          options: [
            { text: 'Porque a conotação admite mais de uma leitura', why: 'Isso.' },
            { text: 'Porque a denotação é mais bonita', why: 'O motivo é a clareza, não a beleza.' },
            { text: 'Porque a conotação é proibida por lei', why: 'Não é proibida; é desaconselhada pela falta de precisão.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'intertexto',
      part: 'Intertextualidade',
      title: 'Citação, paráfrase, paródia, alusão, epígrafe',
      art: 'trilha',
      goal: 'Distinguir as formas de intertextualidade.',
      explain:
        '- **Citação**: reprodução **explícita**, em geral entre aspas, com a fonte.\n- **Paráfrase**: reescrita com **outras palavras**, **mantendo** o sentido.\n- **Paródia**: retomada com **inversão** de sentido, muitas vezes crítica ou humorística.\n- **Alusão**: referência **indireta** que o leitor deve reconhecer.\n- **Epígrafe**: trecho de outro autor na **abertura** do texto.\n\nPegadinha: quem **preserva** o sentido é a **paráfrase**, não a paródia.',
      check: {
        kind: 'choice',
        id: 'it-c',
        prompt: 'Reescrever um parecer com outras palavras, sem mudar o sentido, é:',
        options: [
          { text: 'Paráfrase', why: 'Isso.' },
          { text: 'Paródia', why: 'A paródia muda o sentido.' },
          { text: 'Epígrafe', why: 'Epígrafe é um trecho na abertura do texto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense nas palavras: **PARÁfrase** é "frase **ao lado**", que caminha junto com a original, no mesmo sentido. **PARÓdia** é "canto **contra**", que caminha em sentido oposto. A **citação** copia; a **alusão** só pisca o olho; a **epígrafe** abre a porta do texto.',
        check: {
          kind: 'choice',
          id: 'it-r',
          prompt: 'Um trecho de outro autor colocado na abertura do texto é:',
          options: [
            { text: 'Epígrafe', why: 'Isso.' },
            { text: 'Alusão', why: 'Alusão é referência indireta, em qualquer parte.' },
            { text: 'Paráfrase', why: 'Paráfrase é reescrita com outras palavras.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'metafora-metonimia',
      part: 'Figuras',
      title: 'Metáfora, comparação e metonímia',
      art: 'balanca',
      goal: 'Distinguir metáfora, comparação e metonímia.',
      explain:
        '- **Metáfora**: comparação **implícita**, **sem conectivo**. "O orçamento é uma colcha curta."\n- **Comparação** (símile): **com conectivo** (como, tal qual). "O processo andava **como** uma tartaruga."\n- **Metonímia**: troca por relação de **proximidade**: autor pela obra, lugar pela instituição, parte pelo todo. "Leu **Machado** inteiro"; "O **Planalto** vetou o projeto."\n\nNa metáfora há **semelhança**; na metonímia, **vizinhança**.',
      check: {
        kind: 'sort',
        id: 'mm-c',
        prompt: 'Que figura há em cada frase?',
        categories: ['Metáfora', 'Comparação', 'Metonímia'],
        items: [
          { text: 'Aquele parecer é um labirinto.', cat: 0, why: 'Semelhança, sem conectivo.' },
          { text: 'O parecer era confuso como um labirinto.', cat: 1, why: 'Com "como".' },
          { text: 'O Palácio das Esmeraldas anunciou cortes.', cat: 2, why: 'Lugar pela instituição.' },
        ],
      },
      recovery: {
        explain: 'Teste do **conectivo**: tem "como", "tal qual"? **Comparação**. Não tem, mas há semelhança? **Metáfora**. A troca é por algo **ligado** de verdade (o prédio onde o governo funciona, o autor da obra)? **Metonímia**.',
        check: {
          kind: 'choice',
          id: 'mm-r',
          prompt: '"Leu Machado inteiro" é exemplo de:',
          options: [
            { text: 'Metonímia: o autor pela obra', why: 'Isso.' },
            { text: 'Metáfora', why: 'Não há semelhança: é o autor no lugar da obra.' },
            { text: 'Comparação', why: 'Não há conectivo nem comparação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'intensidade',
      part: 'Figuras',
      title: 'Exagero, suavização, ironia e opostos',
      art: 'alvo',
      goal: 'Reconhecer hipérbole, eufemismo, ironia, antítese e paradoxo.',
      explain:
        '- **Hipérbole**: exagero intencional. "Já pedi esse documento **mil vezes**."\n- **Eufemismo**: suavização. "O servidor **nos deixou**" (morreu).\n- **Ironia**: dizer o contrário do que se pensa, com crítica. "Que gestão **exemplar**: três obras paradas."\n- **Antítese**: ideias opostas **aproximadas**. "Entre o **céu** e o **inferno** dos números."\n- **Paradoxo**: opostos atribuídos **ao mesmo ser**, com aparente absurdo. "Uma **ausência presente**."',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: '"Que fiscalização eficiente: o desvio durou dez anos." A figura é:',
        options: [
          { text: 'Ironia', why: 'Isso: diz "eficiente" querendo dizer o contrário.' },
          { text: 'Eufemismo', why: 'Eufemismo suaviza; aqui há crítica pelo contrário.' },
          { text: 'Hipérbole', why: 'Não há exagero: há inversão de sentido.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Ironia** é o "elogio" que é crítica: o resto da frase (o desvio de dez anos) denuncia que "eficiente" quer dizer o oposto. Na **antítese**, os opostos ficam **lado a lado** (céu e inferno); no **paradoxo**, eles se **fundem** no mesmo ser (ausência presente).',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: '"Uma ausência presente" é:',
          options: [
            { text: 'Paradoxo', why: 'Isso: opostos no mesmo ser.' },
            { text: 'Antítese', why: 'Na antítese, os opostos ficam aproximados, não fundidos no mesmo ser.' },
            { text: 'Metonímia', why: 'Não há troca por proximidade.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'outras',
      part: 'Figuras',
      title: 'Prosopopeia, pleonasmo, sinestesia e zeugma',
      art: 'pessoal',
      goal: 'Reconhecer prosopopeia, pleonasmo, sinestesia, elipse e zeugma.',
      explain:
        '- **Prosopopeia**: características **humanas** a seres inanimados. "Os relatórios **gritavam** o desvio."\n- **Pleonasmo**: redundância. É **figura** quando enfatiza ("Vi com meus próprios olhos"), **vício** quando é inútil ("subir para cima").\n- **Sinestesia**: mistura de **sensações**. "Um silêncio **áspero**."\n- **Elipse**: omissão de termo subentendido; **zeugma**: omissão de termo **já expresso**. "Eu analisei a receita; ela, a despesa."',
      check: {
        kind: 'sort',
        id: 'ou-c',
        prompt: 'Que figura há em cada frase?',
        categories: ['Prosopopeia', 'Sinestesia', 'Zeugma'],
        items: [
          { text: 'As planilhas choravam números vermelhos.', cat: 0, why: 'Ação humana a coisa.' },
          { text: 'Ouviu uma voz doce no telefone.', cat: 1, why: 'Audição e paladar.' },
          { text: 'Ele cuidou da folha; eu, das diárias.', cat: 2, why: 'Omitiu "cuidei", já expresso.' },
        ],
      },
      recovery: {
        explain: '**Prosopopeia**: a coisa ganha **gente** (grita, chora, sorri). **Sinestesia**: os **sentidos** se misturam (voz doce, silêncio áspero, cor quente). **Zeugma**: o verbo **já dito** some na segunda parte e você o "ouve" mesmo assim.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: '"Subir para cima" é:',
          options: [
            { text: 'Pleonasmo vicioso', why: 'Isso: redundância inútil.' },
            { text: 'Pleonasmo como figura de ênfase', why: 'Não acrescenta ênfase: é vício.' },
            { text: 'Sinestesia', why: 'Não há mistura de sensações.' },
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
      lines: ['Metonímia: lugar pela instituição', 'Paráfrase: mantém o sentido', 'Paródia: sempre preserva o sentido original'],
      bug: 2,
      why: 'A paródia subverte o sentido; quem preserva é a paráfrase.',
      fixed: 'Paródia: retoma e muda o sentido',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que figura há em cada frase?',
      categories: ['Hipérbole', 'Eufemismo', 'Antítese'],
      items: [
        { text: 'Morri de rir com o relatório.', cat: 0, why: 'Exagero.' },
        { text: 'Ele foi desligado do quadro (demitido).', cat: 1, why: 'Suavização.' },
        { text: 'Riqueza no papel, pobreza nas ruas.', cat: 2, why: 'Opostos aproximados.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: "O Itamaraty respondeu à nota do embaixador." A figura é:',
      options: [
        { text: 'Metonímia: o prédio pelo ministério', why: 'Isso.' },
        { text: 'Prosopopeia', why: 'Não se dá traço humano a coisa: o nome do lugar representa a instituição.' },
        { text: 'Ironia', why: 'Não há inversão de sentido.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.003' }],
  summary: [
    'Denotação: literal (textos técnicos e oficiais). Conotação: figurada (literatura, publicidade, crônica).',
    'Citação copia; paráfrase mantém o sentido; paródia inverte; alusão insinua; epígrafe abre o texto.',
    'Metáfora (semelhança, sem conectivo), comparação (com "como"), metonímia (proximidade: lugar pela instituição, autor pela obra).',
    'Hipérbole exagera; eufemismo suaviza; ironia diz o contrário; antítese aproxima opostos; paradoxo os funde.',
    'Prosopopeia (coisa com traço humano), pleonasmo (figura ou vício), sinestesia (sensações), elipse e zeugma (omissões).',
  ],
};
