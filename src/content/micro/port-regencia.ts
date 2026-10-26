// Série "Regência, vozes e verbos" (cap.port.02, trecho regencia), no ritmo lento com história pedido
// em 25/10/2026: a primeira aula conta como as preposições herdaram o papel dos casos do latim; as
// seguintes ensinam a regência verbal e os pronomes, a regência nominal e as vozes, e a correlação de
// tempos e a flexão, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (02-regencia-verbos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.02', sectionId: 'regencia' } as const;

export const portRegHistoria: MicroLesson = {
  ...S,
  id: 'port.regencia.1',
  series: { id: 'port.regencia', order: 1 },
  title: 'Dos casos do latim às preposições',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Assisti o filme" ou "Assisti ao filme"? Por que uma preposição pequena muda tanto?',
    options: [
      { text: 'Porque a preposição mostra a relação entre o verbo e o complemento', why: 'Isso. Esta aula conta de onde vem esse papel das preposições.' },
      { text: 'Porque a preposição é só enfeite', why: 'A preposição muda a relação e, às vezes, o sentido do verbo.' },
      { text: 'Porque frases com preposição são mais longas', why: 'Não é o tamanho; é a relação entre as palavras.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'casos',
      part: 'A história',
      title: 'No latim, as terminações mandavam',
      art: 'livro',
      goal: 'Saber que o latim marcava as funções com terminações (casos).',
      explain:
        'No **latim**, a função de uma palavra na frase era marcada pela sua **terminação**, os chamados **casos**.\n\nO **acusativo** marcava o que recebia a ação diretamente; o **dativo**, a quem algo era dado ou dito.\n\nPor isso a ordem das palavras podia variar muito: a terminação já dizia quem fazia o quê.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'No latim, como se sabia a função de uma palavra?',
        options: [
          { text: 'Pela terminação, os casos', why: 'Isso.' },
          { text: 'Só pela posição na frase', why: 'No latim, a terminação dizia a função.' },
          { text: 'Pela letra inicial', why: 'O que mudava era a terminação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **etiquetas coloridas** presas às palavras: verde para quem recebe a ação, azul para quem recebe algo. No latim, a **terminação** era essa etiqueta. Com ela, dava para embaralhar as palavras sem perder o sentido.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'O dativo latino marcava:',
          options: [
            { text: 'A quem algo era dado ou dito', why: 'Isso.' },
            { text: 'Quem praticava a ação', why: 'Isso era o nominativo.' },
            { text: 'O tempo do verbo', why: 'Casos são de nomes, não de tempo verbal.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'preposicoes',
      part: 'A história',
      title: 'No português, as preposições assumiram',
      art: 'trilha',
      goal: 'Entender que as preposições e a ordem herdaram o papel dos casos.',
      explain:
        'Na passagem do latim para o português, as **terminações de caso caíram**. Quem passou a mostrar a função das palavras foram a **ordem** da frase e as **preposições**.\n\nRestaram marcas nos pronomes: **o** vem do acusativo e é **objeto direto** ("vi-**o**"); **lhe** vem do dativo e é **objeto indireto** ("entreguei-**lhe** o relatório").\n\nA **regência** estuda isso: que preposição cada verbo ou nome exige.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'O pronome "lhe" funciona, em geral, como:',
        options: [
          { text: 'Objeto indireto', why: 'Isso: herdeiro do dativo latino.' },
          { text: 'Objeto direto', why: 'Objeto direto é "o", "a", "os", "as".' },
          { text: 'Sujeito', why: '"Lhe" não é sujeito.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Quando as **etiquetas** (terminações) caíram, foi preciso outro jeito de marcar. As **preposições** viraram as novas etiquetas: "entreguei o relatório **ao** chefe". Nos pronomes a etiqueta antiga ficou: "**lhe**" = "ao chefe".',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'Regência é o estudo de:',
          options: [
            { text: 'A preposição que um verbo ou nome exige no complemento', why: 'Isso.' },
            { text: 'A concordância de número e gênero', why: 'Isso é concordância.' },
            { text: 'O uso de vírgulas', why: 'Isso é pontuação.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'importancia',
      part: 'Hoje',
      title: 'Por que a regência cai tanto',
      art: 'alvo',
      goal: 'Ligar a regência à crase e aos pronomes relativos.',
      explain:
        'A regência aparece **escondida** em outras questões:\n\n- **crase**: só existe se o verbo exige "a" e a palavra seguinte aceita "a". "Assistimos **à** sessão";\n- **pronome relativo**: a preposição vai antes dele. "A sessão **a que** assistimos";\n- **troca de pronome**: "entregou o relatório **ao chefe**" vira "entregou-**lhe** o relatório".\n\nSaber a regência resolve as três.',
      check: {
        kind: 'choice',
        id: 'im-c',
        prompt: 'Por que há crase em "Assistimos à sessão"?',
        options: [
          { text: '"Assistir" (ver) pede "a" e "sessão" aceita "a"', why: 'Isso: a + a = à.' },
          { text: 'Porque toda palavra feminina leva crase', why: 'Só há crase se o verbo pedir a preposição "a".' },
          { text: 'Por enfeite', why: 'A crase é a fusão da preposição com o artigo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A crase é um **encontro**: a preposição "**a**", pedida pelo verbo, encontra o artigo "**a**" da palavra feminina. "Assistir" (ver) pede "a"; "sessão" pede "a". Os dois se fundem: **à**.',
        check: {
          kind: 'choice',
          id: 'im-r',
          prompt: '"A sessão ______ assistimos foi longa." Qual forma?',
          options: [
            { text: 'a que', why: 'Isso: assistir a algo; a preposição vem antes do relativo.' },
            { text: 'que', why: 'Falta a preposição exigida por "assistir".' },
            { text: 'de que', why: '"Assistir" (ver) pede "a", não "de".' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['Latim marca funções com terminações', 'As terminações caem', 'Preposições e ordem assumem o papel'],
      why: 'Das terminações às preposições.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada pronome substitui qual complemento?',
      categories: ['Objeto direto', 'Objeto indireto'],
      items: [
        { text: 'o', cat: 0, why: 'Do acusativo.' },
        { text: 'as', cat: 0, why: 'Feminino plural de "o".' },
        { text: 'lhe', cat: 1, why: 'Do dativo.' },
        { text: 'lhes', cat: 1, why: 'Plural de "lhe".' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Crase: preposição a + artigo a', 'Relativo leva a preposição antes', 'Toda palavra feminina leva crase'],
      bug: 2,
      why: 'Só há crase quando o termo regente exige a preposição "a".',
      fixed: 'Crase depende da regência',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Latim: funções marcadas por terminações (casos). Acusativo: recebe a ação; dativo: a quem se dá ou diz.',
    'Português: as terminações caíram; ordem e preposições assumiram. Restaram "o" (objeto direto) e "lhe" (objeto indireto).',
    'Regência explica a crase, a preposição antes do relativo e a troca por pronomes.',
  ],
};

export const portRegVerbal: MicroLesson = {
  ...S,
  id: 'port.regencia.2',
  series: { id: 'port.regencia', order: 2 },
  title: 'Verbos que mudam com a preposição',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"A auditoria visa o controle da despesa" ou "visa ao controle da despesa"?',
    options: [
      { text: '"Visa ao controle"', why: 'Isso: no sentido de "ter como objetivo", visar pede "a". Esta aula mostra outros verbos assim.' },
      { text: '"Visa o controle"', why: 'Na regência tradicional, "visar" com sentido de objetivar pede "a".' },
      { text: 'As duas, sempre', why: 'Depende do sentido: "visar" (pôr visto) é direto; (objetivar) pede "a".' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sentido',
      part: 'Regência verbal',
      title: 'Assistir, visar, aspirar',
      art: 'balanca',
      goal: 'Escolher a regência de acordo com o sentido do verbo.',
      explain:
        'Alguns verbos **mudam de sentido** conforme a regência:\n\n- **assistir** = ver: pede **a** ("assistimos **à** sessão"); = ajudar: direto ("assistiu **o** réu");\n- **visar** = ter como objetivo: pede **a** ("visa **ao** controle"); = pôr visto: direto ("visou **o** documento");\n- **aspirar** = desejar: pede **a** ("aspira **ao** cargo"); = respirar: direto ("aspirou **o** ar").',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Qual frase segue a regência tradicional?',
        options: [
          { text: 'O servidor aspira ao cargo de auditor.', why: 'Isso: desejar pede "a".' },
          { text: 'O servidor aspira o cargo de auditor.', why: 'No sentido de desejar, "aspirar" pede "a".' },
          { text: 'Os conselheiros assistiram a sessão plenária pela TV.', why: 'Ver pede "a": assistiram à sessão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte primeiro **o sentido**. "Assistir" é **ver**? Então você assiste **a** algo, como a plateia **ao** espetáculo. É **ajudar**? Então o médico assiste **o** paciente, direto. O sentido escolhe a regência.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: '"O chefe visou o documento" está certo quando "visar" significa:',
          options: [
            { text: 'Pôr visto', why: 'Isso: nesse sentido é direto.' },
            { text: 'Ter como objetivo', why: 'Nesse sentido seria "visou ao".' },
            { text: 'Desejar', why: 'Desejar é "aspirar a".' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'outros',
      part: 'Regência verbal',
      title: 'Implicar, preferir, obedecer, chegar',
      art: 'trilha',
      goal: 'Aplicar a regência de verbos muito cobrados.',
      explain:
        'Mais verbos da prova:\n\n- **implicar** = acarretar: direto. "O atraso implica **multa**" (não "implica em");\n- **preferir**: "prefiro A **a** B", sem "mais" e sem "do que";\n- **obedecer**: pede **a**. "Obedeceu **às** normas";\n- **chegar, ir**: pedem **a**. "Chegou **ao** Tribunal" ("chegar em" é coloquial);\n- **morar, residir**: pedem **em**. "Reside **na** Rua 82".',
      check: {
        kind: 'choice',
        id: 'ou-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Prefiro auditoria preventiva a corretiva.', why: 'Isso.' },
          { text: 'Prefiro mais auditoria preventiva do que corretiva.', why: '"Preferir" rejeita "mais" e "do que".' },
          { text: 'O atraso implica em multa.', why: 'Na norma tradicional, "implicar" (acarretar) é direto: implica multa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '"Preferir" já tem o "mais" **dentro dele**: "pre-ferir" é "pôr à frente". Dizer "prefiro **mais**" é como dizer "subir para cima". E a comparação usa "**a**": "prefiro café **a** chá".',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: '"Os servidores chegaram ______ sede às 8 h." Qual forma?',
          options: [
            { text: 'à', why: 'Isso: chegar a + a sede.' },
            { text: 'na', why: '"Chegar em" é coloquial; a norma pede "a".' },
            { text: 'pela', why: 'A regência é "chegar a".' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'pronomes',
      part: 'Pronomes',
      title: 'O ou lhe?',
      art: 'pessoal',
      goal: 'Trocar complementos por "o" ou "lhe" corretamente.',
      explain:
        'Para trocar um complemento por pronome:\n\n- **objeto direto** (sem preposição): **o, a, os, as**. "Analisou **o processo**" vira "analisou-**o**";\n- **objeto indireto de pessoa** (com "a"): **lhe, lhes**. "Entregou o relatório **ao chefe**" vira "entregou-**lhe** o relatório".\n\nAtenção: **aspirar a** e **assistir a** (ver) **não** aceitam "lhe": "aspira **a ele**", "assistiu **a ela**".',
      check: {
        kind: 'choice',
        id: 'pn-c',
        prompt: '"O técnico entregou o relatório AO CHEFE." Trocando o destaque por pronome:',
        options: [
          { text: 'O técnico entregou-lhe o relatório.', why: 'Isso: objeto indireto de pessoa vira "lhe".' },
          { text: 'O técnico entregou-o o relatório.', why: '"O" substitui objeto direto; "ao chefe" é indireto.' },
          { text: 'O técnico entregou-a o relatório.', why: '"Ao chefe" é indireto e masculino: "lhe".' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Olhe se há **preposição** antes do complemento. "**ao** chefe" tem o "a": é indireto, e de **pessoa**. Então vira **lhe**. "**o** relatório" não tem preposição: é direto, e viraria **o**.',
        check: {
          kind: 'choice',
          id: 'pn-r',
          prompt: '"O auditor analisou O CONTRATO." Trocando por pronome:',
          options: [
            { text: 'O auditor analisou-o.', why: 'Isso: objeto direto vira "o".' },
            { text: 'O auditor analisou-lhe.', why: '"Lhe" é para objeto indireto de pessoa.' },
            { text: 'O auditor analisou-se.', why: '"Se" mudaria o sentido.' },
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
      prompt: 'Com esse sentido, o verbo pede preposição "a" ou é direto?',
      categories: ['Pede "a"', 'Direto'],
      items: [
        { text: 'Assistir (ver)', cat: 0, why: 'Assistir à sessão.' },
        { text: 'Visar (objetivar)', cat: 0, why: 'Visar ao controle.' },
        { text: 'Implicar (acarretar)', cat: 1, why: 'Implica multa.' },
        { text: 'Aspirar (respirar)', cat: 1, why: 'Aspirou o ar.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Obedeceu às normas', 'Reside na Rua 82', 'Prefiro mais revisar do que reescrever'],
      bug: 2,
      why: '"Preferir" rejeita "mais" e "do que": prefiro revisar a reescrever.',
      fixed: 'Prefiro revisar a reescrever',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um despacho diz "O controle interno visa o aperfeiçoamento da gestão". Qual correção?',
      scenarios: [
        { title: 'Opção A', body: '"O controle interno **visa ao** aperfeiçoamento da gestão."' },
        { title: 'Opção B', body: '"O controle interno **visa-lhe** o aperfeiçoamento da gestão."' },
      ],
      answer: 0,
      why: 'No sentido de objetivar, "visar" pede "a" na regência tradicional.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.005' },
  ],
  summary: [
    'Assistir (ver), visar (objetivar), aspirar (desejar): pedem "a". Com outros sentidos, diretos.',
    'Implicar (acarretar): direto. Preferir A a B, sem "mais" e "do que". Obedecer a. Chegar a. Residir em.',
    'Objeto direto vira o, a, os, as. Objeto indireto de pessoa vira lhe, lhes. Aspirar a e assistir a (ver) não aceitam "lhe".',
  ],
};

export const portRegVozes: MicroLesson = {
  ...S,
  id: 'port.regencia.3',
  series: { id: 'port.regencia', order: 3 },
  title: 'Regência nominal e vozes do verbo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"É preferível prevenir do que remediar" ou "É preferível prevenir a remediar"?',
    options: [
      { text: '"Prevenir a remediar"', why: 'Isso: "preferível" pede "a", como o verbo preferir. Esta aula mostra que nomes também têm regência.' },
      { text: '"Prevenir do que remediar"', why: 'É muito ouvido, mas a norma pede "preferível a".' },
      { text: 'As duas', why: 'Só "preferível a" segue a norma-padrão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'nominal',
      part: 'Regência nominal',
      title: 'Nomes também pedem preposição',
      art: 'livro',
      goal: 'Reconhecer a preposição exigida por nomes frequentes.',
      explain:
        'Não só verbos: **nomes** também exigem preposição. Os mais cobrados:\n\n- **acessível a**, **contrário a**, **favorável a**, **alheio a**, **atento a**, **paralelo a**;\n- **apto a** ou **para**; **ansioso por** ou **para**;\n- **compatível com**;\n- **residente em**, **situado em**;\n- **preferível a**: "é preferível prevenir **a** remediar".',
      check: {
        kind: 'choice',
        id: 'no-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'O parecer foi favorável à aprovação.', why: 'Isso: favorável a.' },
          { text: 'O sistema é compatível ao padrão.', why: '"Compatível" pede "com".' },
          { text: 'A empresa é situada à Rua 82.', why: '"Situado" pede "em": situada na Rua 82.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Muitos nomes **herdam** a regência do verbo parente: **preferir a** dá **preferível a**; **residir em** dá **residente em**; **obedecer a** dá **obediência a**. Lembrou o verbo, lembrou o nome.',
        check: {
          kind: 'choice',
          id: 'no-r',
          prompt: '"Compatível" pede qual preposição?',
          options: [
            { text: 'com', why: 'Isso.' },
            { text: 'a', why: 'A norma registra "compatível com".' },
            { text: 'em', why: 'A norma registra "compatível com".' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'vozes',
      part: 'Vozes',
      title: 'Ativa, passiva e reflexiva',
      art: 'interruptor',
      goal: 'Distinguir as quatro formas de voz verbal.',
      explain:
        'As vozes do verbo:\n\n- **ativa**: o sujeito **pratica**. "O Tribunal **julgou** as contas";\n- **passiva analítica**: **ser + particípio**, com agente "por". "As contas **foram julgadas** pelo Tribunal";\n- **passiva sintética**: verbo direto + "**se**". "**Julgaram-se** as contas";\n- **reflexiva**: o sujeito **pratica e sofre**. "O servidor **feriu-se**".\n\nSó verbos **transitivos diretos** admitem passiva.',
      check: {
        kind: 'choice',
        id: 'vo-c',
        prompt: '"As contas foram julgadas pelo Tribunal" está na voz:',
        options: [
          { text: 'Passiva analítica', why: 'Isso: ser + particípio, com agente.' },
          { text: 'Passiva sintética', why: 'A sintética usa "se": julgaram-se.' },
          { text: 'Ativa', why: 'Na ativa, o Tribunal seria o sujeito.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte **quem está em destaque**. Na ativa, quem **faz** (o Tribunal). Na passiva, quem **sofre** (as contas). A passiva analítica é "longa" (**foram julgadas**); a sintética é "curta" (**julgaram-se**).',
        check: {
          kind: 'choice',
          id: 'vo-r',
          prompt: 'Qual tipo de verbo admite a voz passiva?',
          options: [
            { text: 'Transitivo direto', why: 'Isso: o objeto direto vira sujeito.' },
            { text: 'Intransitivo', why: 'Sem objeto direto, não há passiva.' },
            { text: 'De ligação', why: 'Verbo de ligação não tem objeto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'transpor',
      part: 'Vozes',
      title: 'Passar da ativa para a passiva',
      art: 'engrenagem',
      goal: 'Transpor uma frase da ativa para a passiva analítica.',
      explain:
        'Três passos:\n\n1. o **objeto direto** vira **sujeito**;\n2. o sujeito vira **agente da passiva**;\n3. o verbo **ser** assume o **tempo e o modo** do verbo original, e o principal vai ao **particípio**.\n\n| Ativa | Passiva |\n|---|---|\n| aprovará o relatório | o relatório **será aprovado** |\n| tinham analisado as notas | as notas **tinham sido analisadas** |\n| estava revisando os contratos | os contratos **estavam sendo revisados** |',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: '"O conselheiro aprovou o voto." Na passiva:',
        options: [
          { text: 'O voto foi aprovado pelo conselheiro.', why: 'Isso: "aprovou" (pretérito perfeito) vira "foi aprovado".' },
          { text: 'O voto é aprovado pelo conselheiro.', why: 'O tempo mudou para o presente.' },
          { text: 'O voto será aprovado pelo conselheiro.', why: 'O tempo mudou para o futuro.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O verbo **ser** "veste" o tempo do verbo antigo. "Apro**vou**" é passado: "**foi**". "Aprova**rá**" é futuro: "**será**". "**Tinha** analisado": "**tinha sido** analisado". O particípio só acompanha o novo sujeito em gênero e número.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'Na passiva, o particípio concorda com:',
          options: [
            { text: 'O novo sujeito', why: 'Isso: "as notas tinham sido analisadas".' },
            { text: 'O agente da passiva', why: 'Concorda com o sujeito, não com o agente.' },
            { text: 'Nada; fica sempre no masculino singular', why: 'Concorda com o sujeito: analisadas.' },
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
      prompt: 'Em que voz está cada frase?',
      categories: ['Ativa', 'Passiva analítica', 'Passiva sintética'],
      items: [
        { text: 'O Tribunal julgou as contas.', cat: 0, why: 'O sujeito pratica.' },
        { text: 'As contas foram julgadas.', cat: 1, why: 'Ser + particípio.' },
        { text: 'Julgaram-se as contas.', cat: 2, why: 'Verbo + se.' },
      ],
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene a transposição para a passiva.',
      items: ['Objeto direto vira sujeito', 'Sujeito vira agente da passiva', '"Ser" assume o tempo do verbo original', 'Principal vai ao particípio, concordando'],
      why: 'Sujeito novo, agente, tempo e particípio.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['favorável a', 'compatível com', 'preferível do que'],
      bug: 2,
      why: '"Preferível" pede "a": preferível prevenir a remediar.',
      fixed: 'preferível a',
      errorKind: 'confusao',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.006' }],
  summary: [
    'Regência nominal: acessível a, compatível com, favorável a, residente em, preferível a (nunca "do que").',
    'Vozes: ativa, passiva analítica (ser + particípio), passiva sintética (verbo + se), reflexiva.',
    'Transposição: objeto direto vira sujeito; "ser" no tempo original; particípio concorda com o sujeito.',
  ],
};

export const portRegTempos: MicroLesson = {
  ...S,
  id: 'port.regencia.4',
  series: { id: 'port.regencia', order: 4 },
  title: 'Correlação de tempos e flexão',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Se o gestor tivesse prestado contas, não ______ multado." Qual completa?',
    options: [
      { text: 'seria', why: 'Isso: imperfeito do subjuntivo pede futuro do pretérito. Esta aula mostra os pares.' },
      { text: 'será', why: '"Será" combinaria com "se for"; com "se tivesse", "seria".' },
      { text: 'é', why: 'O presente não combina com "se tivesse".' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'correlacao',
      part: 'Correlação',
      title: 'Os pares de tempos',
      art: 'balanca',
      goal: 'Combinar os tempos da oração principal e da subordinada.',
      explain:
        'Os pares mais cobrados:\n\n- **se** + imperfeito do subjuntivo → **futuro do pretérito**: "Se o prazo **fosse** maior, a equipe **concluiria**";\n- **se** + futuro do subjuntivo → **futuro do presente**: "Se o prazo **for** maior, a equipe **concluirá**";\n- presente → presente do subjuntivo: "**Exijo** que **apresente**";\n- passado → imperfeito do subjuntivo: "**Exigiu** que **apresentasse**".',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: '"Se o órgão ______ o contrato, haverá prejuízo." Qual forma?',
        options: [
          { text: 'mantiver', why: 'Isso: futuro do subjuntivo com futuro do presente (haverá).' },
          { text: 'mantivesse', why: '"Mantivesse" pediria "haveria".' },
          { text: 'manter', why: 'Pegadinha: o futuro do subjuntivo de "manter" é "mantiver".' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Os pares andam **de mãos dadas**: "fo**sse**" com "-**ria**" (concluiria, seria, haveria); "fo**r**" com "-**rá**" (concluirá, será, haverá). Viu "**-sse**", procure "**-ria**". Viu "**-r**" no "se", procure "**-rá**".',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"Se o gestor ______ as contas no prazo, não seria multado."',
          options: [
            { text: 'apresentasse', why: 'Isso: "-sse" com "-ria".' },
            { text: 'apresentar', why: '"Apresentar" combinaria com "será".' },
            { text: 'apresenta', why: 'O presente não combina com "seria".' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'ter-vir',
      part: 'Flexão verbal',
      title: 'Ter, vir, pôr e ver',
      art: 'engrenagem',
      goal: 'Flexionar os derivados de ter, vir e pôr e distinguir ver de vir.',
      explain:
        '**Derivados** seguem o verbo primitivo:\n\n- de **ter**: se eu **mantiver**, se ele **detiver** (não "manter", "deter");\n- de **vir**: se eles **intervierem**; ele **interveio**;\n- de **pôr**: quando **compuserem**, se **propuser**.\n\n**Ver** e **vir** no futuro do subjuntivo: quando eu **vir** (ver), quando eu **vier** (vir). "Se o auditor **ver** a nota" está errado: "se o auditor **vir**".',
      check: {
        kind: 'choice',
        id: 'tv-c',
        prompt: 'Qual frase segue a norma-padrão?',
        options: [
          { text: 'Quando o fiscal vir o documento, assinará.', why: 'Isso: futuro do subjuntivo de "ver" é "vir".' },
          { text: 'Quando o fiscal ver o documento, assinará.', why: 'Pegadinha: o futuro do subjuntivo de "ver" é "vir".' },
          { text: 'Se ele manter a decisão, recorreremos.', why: '"Manter" segue "ter": se ele mantiver.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Conjugue **o primitivo** primeiro e copie. "Se ele **tiver**" → "se ele man**tiver**". "Quando eles **vierem**" → "quando eles inter**vierem**". E para "ver": "se eu **vir** o filme" (como "se eu **vir**, avisarei").',
        check: {
          kind: 'choice',
          id: 'tv-r',
          prompt: 'O pretérito de "intervir" (ele) é:',
          options: [
            { text: 'interveio', why: 'Isso: segue "veio".' },
            { text: 'interviu', why: '"Intervir" segue "vir", não "ver": interveio.' },
            { text: 'intervinha', why: 'Isso é o imperfeito; o perfeito é "interveio".' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'especiais',
      part: 'Flexão verbal',
      title: 'Reaver, requerer e prover',
      art: 'revisao',
      goal: 'Flexionar reaver, requerer e prover.',
      explain:
        'Três verbos que confundem:\n\n- **reaver** só tem as formas em que "haver" tem a letra **v**: nós **reavemos**, eu **reouve**, se eu **reouver**. "Eu reavejo" não existe;\n- **requerer** não segue "querer": eu **requeiro**, ele **requereu**, se eu **requeresse**;\n- **prover** segue "ver" no presente, mas é regular no pretérito: ele **proveu** (não "proviu").',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Qual forma segue a norma-padrão?',
        options: [
          { text: 'O servidor requereu a revisão.', why: 'Isso: "requerer" é regular no pretérito.' },
          { text: 'O servidor requis a revisão.', why: '"Requerer" não segue "querer" (quis).' },
          { text: 'Eu reavejo o valor pago.', why: 'Essa forma não existe; "reaver" só tem as formas com "v".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Para **reaver**, pense em **haver** e fique só com as formas que têm **v**: "hav**e**mos" → "reav**e**mos"; "**houve**" → "re**ouve**". Formas como "hei" e "há" não têm v, então "reaver" não as tem.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'O pretérito de "prover" (ele) é:',
          options: [
            { text: 'proveu', why: 'Isso: regular no pretérito.' },
            { text: 'proviu', why: '"Prover" é regular no pretérito: proveu.' },
            { text: 'provio', why: 'Essa forma não existe.' },
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
      prompt: 'Cada forma segue a norma-padrão?',
      categories: ['Certa', 'Errada'],
      items: [
        { text: 'se eu mantiver', cat: 0, why: 'Segue "tiver".' },
        { text: 'quando eu vir (ver)', cat: 0, why: 'Futuro do subjuntivo de "ver".' },
        { text: 'se ele deter', cat: 1, why: 'O certo é "detiver".' },
        { text: 'eu reavejo', cat: 1, why: 'Forma inexistente.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Se fosse maior, concluiria', 'Se for maior, concluirá', 'Se tivesse prestado contas, não será multado'],
      bug: 2,
      why: '"Tivesse" combina com futuro do pretérito: não seria multado.',
      fixed: 'Se tivesse prestado contas, não seria multado',
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um ofício diz: "Caso os fiscais interverem, a obra para". Qual correção?',
      scenarios: [
        { title: 'Opção A', body: '"Caso os fiscais **intervenham**, a obra para."' },
        { title: 'Opção B', body: '"Caso os fiscais **intervirem**, a obra para."' },
      ],
      answer: 0,
      why: '"Caso" pede o presente do subjuntivo, e "intervir" segue "vir": que eles intervenham.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.008' },
  ],
  summary: [
    'Se + imperfeito do subjuntivo ("-sse") → futuro do pretérito ("-ria"). Se + futuro do subjuntivo ("-r") → futuro do presente ("-rá").',
    'Derivados de ter, vir e pôr seguem o primitivo: mantiver, intervierem, compuserem.',
    'Futuro do subjuntivo: ver → vir; vir → vier.',
    'Reaver só nas formas com "v"; requerer: requeiro, requereu; prover: proveu.',
  ],
};
