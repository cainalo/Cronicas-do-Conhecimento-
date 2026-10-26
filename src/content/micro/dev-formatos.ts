// Série "JSON e XML" (cap.dev.01, trecho formatos), no ritmo lento com história pedido em 25/10/2026:
// a primeira aula conta do SGML ao JSON normatizado; as seguintes ensinam JSON, depois XML e a
// comparação entre os dois, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (02-formatos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.01', sectionId: 'formatos' } as const;

export const devFmtHistoria: MicroLesson = {
  ...S,
  id: 'dev.formatos.1',
  series: { id: 'dev.formatos', order: 1 },
  title: 'Do SGML ao JSON',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Dois sistemas precisam trocar os dados de um processo: número, relator, anexos. Basta mandar um texto qualquer?',
    options: [
      { text: 'Não: precisa de um formato que os dois entendam', why: 'Isso. Esta aula conta como surgiram os formatos mais usados.' },
      { text: 'Sim: qualquer texto serve', why: 'Sem formato combinado, um sistema não sabe onde está cada dado.' },
      { text: 'Só mandando um PDF', why: 'PDF é para pessoas lerem; sistemas precisam de dados estruturados.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sgml',
      part: 'A história',
      title: '1986: marcar documentos com etiquetas',
      art: 'livro',
      goal: 'Saber que o SGML foi padronizado em 1986 e deu origem ao HTML.',
      explain:
        'Em **1986**, a **ISO** padronizou o **SGML**, uma linguagem para **marcar documentos** com **etiquetas**: "isto é um título", "isto é um parágrafo".\n\nO **HTML** da web, de Tim Berners-Lee, **nasceu dele**.\n\nA ideia de cercar cada informação por **etiquetas de abertura e fechamento** vem daí.',
      check: {
        kind: 'choice',
        id: 'sg-c',
        prompt: 'Que linguagem nasceu do SGML?',
        options: [
          { text: 'O HTML', why: 'Isso.' },
          { text: 'O SQL', why: 'O SQL é linguagem de banco de dados.' },
          { text: 'O Python', why: 'Python é linguagem de programação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **etiquetas coloridas** num documento de papel: "título", "assinatura", "data". O SGML padronizou isso para o computador, e o HTML usou a ideia para as páginas da web.',
        check: {
          kind: 'choice',
          id: 'sg-r',
          prompt: 'Quem padronizou o SGML, em 1986?',
          options: [
            { text: 'A ISO', why: 'Isso.' },
            { text: 'O Facebook', why: 'O Facebook é de 2004.' },
            { text: 'A OWASP', why: 'A OWASP trata de segurança.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'xml',
      part: 'A história',
      title: '1998: o XML',
      art: 'cartao',
      goal: 'Saber que o XML 1.0 foi publicado pelo W3C em 1998.',
      explain:
        'Em **1998**, o **W3C** publicou o **XML 1.0**: uma versão **mais simples do SGML**, pensada para **trocar dados estruturados entre sistemas**.\n\nEle se espalhou por integrações, serviços **SOAP** e documentos oficiais, como as **notas fiscais eletrônicas**.\n\nO preço: muitas etiquetas de fechamento, arquivos **longos**.',
      check: {
        kind: 'choice',
        id: 'xm-c',
        prompt: 'O XML 1.0 foi publicado por quem e quando?',
        options: [
          { text: 'Pelo W3C, em 1998', why: 'Isso.' },
          { text: 'Pela ISO, em 1986', why: 'Em 1986 a ISO padronizou o SGML.' },
          { text: 'Por Crockford, em 2001', why: 'Crockford é ligado ao JSON.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O XML pegou a ideia das **etiquetas** do SGML e a simplificou para **dados**: em vez de "isto é um título", "isto é o **número do processo**", "isto é o **relator**". Por isso virou padrão de integração por muitos anos.',
        check: {
          kind: 'choice',
          id: 'xm-r',
          prompt: 'Qual destes usa XML até hoje no Brasil?',
          options: [
            { text: 'A nota fiscal eletrônica', why: 'Isso.' },
            { text: 'A tabela de um banco relacional', why: 'Tabelas usam o modelo relacional.' },
            { text: 'A senha do e-mail', why: 'Senha não é formato de troca de dados.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'json',
      part: 'A história',
      title: 'Anos 2000: o JSON',
      art: 'teclado',
      goal: 'Saber que Crockford popularizou o JSON e por que ele dominou as APIs.',
      explain:
        'No **início dos anos 2000**, **Douglas Crockford** popularizou o **JSON**, que aproveita a forma como o **JavaScript escreve objetos**.\n\nEle é **muito mais curto** que o XML: sem etiquetas de fechamento, só chaves, colchetes e vírgulas.\n\nComo os navegadores já falavam JavaScript, o JSON **logo dominou as APIs web**.',
      check: {
        kind: 'choice',
        id: 'js-c',
        prompt: 'Por que o JSON dominou as APIs web?',
        options: [
          { text: 'É curto e segue a forma como o JavaScript escreve objetos', why: 'Isso.' },
          { text: 'Tem mais etiquetas que o XML', why: 'É o contrário: não tem etiquetas de fechamento.' },
          { text: 'Foi imposto por lei', why: 'Venceu por ser prático.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Compare um **formulário longo** com um **bilhete curto**: o XML repete o nome de cada campo na abertura e no fechamento; o JSON escreve o nome uma vez e o valor ao lado. Para o navegador, que já falava JavaScript, o bilhete era a língua natural.',
        check: {
          kind: 'choice',
          id: 'js-r',
          prompt: 'Quem popularizou o JSON?',
          options: [
            { text: 'Douglas Crockford', why: 'Isso.' },
            { text: 'Roy Fielding', why: 'Fielding descreveu o REST.' },
            { text: 'Tim Berners-Lee', why: 'Berners-Lee criou a Web e o HTTP.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'normas',
      part: 'A história',
      title: '2006 a 2017: o JSON vira norma',
      art: 'degraus',
      goal: 'Saber que a RFC 8259 é a referência atual do JSON.',
      explain:
        'O formato foi ganhando **normas**:\n\n- **RFC 4627**, em **2006**;\n- **ECMA-404**, em **2013**;\n- **RFC 8259**, em **2017**, a **referência atual**.\n\nIsso garante que um JSON gerado em Java seja lido igual em Python, no navegador ou no celular.',
      check: {
        kind: 'order',
        id: 'no-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['SGML pela ISO (1986)', 'XML 1.0 pelo W3C (1998)', 'RFC 4627 do JSON (2006)', 'RFC 8259 do JSON (2017)'],
        why: 'Das etiquetas ao JSON normatizado.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma **norma** é como o **padrão da tomada**: todo aparelho encaixa em toda parede. A RFC 8259 é o "padrão da tomada" do JSON: quem segue, se entende com todos.',
        check: {
          kind: 'choice',
          id: 'no-r',
          prompt: 'Qual é a referência atual do JSON?',
          options: [
            { text: 'RFC 8259', why: 'Isso.' },
            { text: 'RFC 1945', why: 'RFC 1945 é o HTTP/1.0.' },
            { text: 'RFC 6455', why: 'RFC 6455 é o WebSocket.' },
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
      lines: ['1986: SGML', '1998: XML 1.0', '1998: JSON substitui o HTML'],
      bug: 2,
      why: 'O JSON foi popularizado no início dos anos 2000 para dados, não substituiu o HTML.',
      fixed: 'Anos 2000: JSON popularizado por Crockford',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'XML ou JSON?',
      categories: ['XML', 'JSON'],
      items: [
        { text: 'Publicado pelo W3C em 1998', cat: 0, why: 'XML 1.0.' },
        { text: 'Popularizado por Crockford', cat: 1, why: 'JSON.' },
        { text: 'Etiquetas de abertura e fechamento', cat: 0, why: 'Herança do SGML.' },
        { text: 'RFC 8259', cat: 1, why: 'Norma atual do JSON.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: uma API nova do Tribunal vai servir um aplicativo de celular. Qual formato a história indica como mais usado hoje?',
      options: [
        { text: 'JSON', why: 'Isso: domina as APIs web.' },
        { text: 'SGML', why: 'O SGML é o antepassado, pouco usado em APIs.' },
        { text: 'PDF', why: 'PDF é para pessoas lerem.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1986: SGML (ISO), etiquetas em documentos; dele nasceu o HTML.',
    '1998: XML 1.0 (W3C), dados estruturados com etiquetas; SOAP, notas fiscais.',
    'Anos 2000: JSON popularizado por Crockford, curto e próximo do JavaScript; dominou as APIs.',
    'Normas do JSON: RFC 4627 (2006), ECMA-404 (2013), RFC 8259 (2017, atual).',
  ],
};

export const devFmtJson: MicroLesson = {
  ...S,
  id: 'dev.formatos.2',
  series: { id: 'dev.formatos', order: 2 },
  title: 'JSON: tipos e regras',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num arquivo JSON, alguém escreveu um comentário explicando um campo. Isso é permitido?',
    options: [
      { text: 'Não: JSON não tem comentários', why: 'Isso. Esta aula mostra essa e as outras regras que caem em prova.' },
      { text: 'Sim, como em qualquer código', why: 'JSON não aceita comentários.' },
      { text: 'Só no fim do arquivo', why: 'Em nenhuma parte.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tipos',
      part: 'Tipos',
      title: 'Os seis tipos',
      art: 'dados',
      goal: 'Reconhecer os seis tipos de valor do JSON.',
      explain:
        'O **JSON** (*JavaScript Object Notation*, RFC 8259) tem **seis tipos**:\n\n- **objeto**: **{ "nome": "Ana", "idade": 30 }**;\n- **array**: **[1, 2, 3]**;\n- **string**: **"texto entre aspas duplas"**;\n- **número**: **42**, **3.14**, **-1e3**;\n- **booleano**: **true**, **false**;\n- **nulo**: **null**.',
      check: {
        kind: 'sort',
        id: 'ti-c',
        prompt: 'Que tipo é cada valor?',
        categories: ['String', 'Número', 'Booleano'],
        items: [
          { text: '"12345/2026"', cat: 0, why: 'Entre aspas duplas.' },
          { text: '3.14', cat: 1, why: 'Número.' },
          { text: 'false', cat: 2, why: 'Verdadeiro ou falso.' },
          { text: '"42"', cat: 0, why: 'Entre aspas é texto, mesmo sendo dígitos.' },
        ],
      },
      recovery: {
        explain: 'Olhe a **roupa** do valor: com **aspas duplas** é texto (string), mesmo "42"; **sem aspas** e com dígitos é número; **true/false** sem aspas é booleano; **null** é "nada"; **{ }** é objeto; **[ ]** é lista (array).',
        check: {
          kind: 'choice',
          id: 'ti-r',
          prompt: 'O valor [ "parecer.pdf", "voto.pdf" ] é:',
          options: [
            { text: 'Um array', why: 'Isso: lista entre colchetes.' },
            { text: 'Um objeto', why: 'Objeto usa chaves { } e pares chave-valor.' },
            { text: 'Um booleano', why: 'Booleano é true ou false.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'regras',
      part: 'Regras',
      title: 'Aspas duplas, sem comentários, sem vírgula sobrando',
      art: 'cadeado',
      goal: 'Aplicar as regras de validade do JSON.',
      explain:
        '- **Chaves** de objeto são **sempre strings entre aspas duplas**. **Aspas simples não valem.**\n- **Não há comentários**.\n- **Não há tipo de data**: datas viajam como **string**, em geral no formato **ISO 8601** ("2027-01-17T08:00:00-03:00").\n- **Vírgula depois do último item** (*trailing comma*) é **inválida**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Qual trecho é um JSON válido?',
        options: [
          { text: '{ "numero": "123/2026", "sigiloso": false }', why: 'Isso.' },
          { text: "{ 'numero': '123/2026' }", why: 'Aspas simples não são válidas.' },
          { text: '{ "numero": "123/2026", }', why: 'Vírgula sobrando depois do último item.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Faça um **checklist** de três itens: (1) toda chave tem **aspas duplas**? (2) há **comentário** (//, #)? (3) há **vírgula** antes do } ou do ] final? Passou nos três, provavelmente é válido.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Como se representa uma data em JSON?',
          options: [
            { text: 'Como string, em geral no formato ISO 8601', why: 'Isso: não há tipo de data.' },
            { text: 'Com um tipo date próprio', why: 'JSON não tem tipo de data.' },
            { text: 'Não é possível', why: 'É possível, como string.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'exemplo',
      part: 'Exemplo',
      title: 'Lendo um JSON de processo',
      art: 'trilha',
      goal: 'Ler um documento JSON com objetos aninhados e arrays.',
      explain:
        '```\n{\n  "processo": "12345/2026",\n  "relator": {\n    "nome": "Conselheiro A",\n    "gabinete": 3\n  },\n  "anexos": ["parecer.pdf", "voto.pdf"],\n  "sigiloso": false,\n  "julgado_em": null\n}\n```\n\nO **relator** é um **objeto** dentro do objeto; **anexos** é um **array** de strings; **sigiloso** é booleano; **julgado_em** é **null** (ainda não julgado).',
      check: {
        kind: 'choice',
        id: 'ex-c',
        prompt: 'No exemplo, qual o tipo do valor de "gabinete"?',
        options: [
          { text: 'Número', why: 'Isso: 3, sem aspas.' },
          { text: 'String', why: 'Não está entre aspas.' },
          { text: 'Array', why: 'Array usa colchetes.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia de fora para dentro: o **objeto grande** tem cinco chaves. A chave "relator" abre **outro objeto** (com nome e gabinete). A chave "anexos" abre uma **lista**. É como uma **pasta** com subpastas e listas dentro.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'O que "julgado_em": null indica?',
          options: [
            { text: 'Que não há valor ainda', why: 'Isso: nulo.' },
            { text: 'Que foi julgado em 1970', why: 'null não é data.' },
            { text: 'Que o JSON é inválido', why: 'null é um tipo válido.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Chaves com aspas duplas', 'Sem vírgula depois do último item', 'Comentários com // são permitidos'],
      bug: 2,
      why: 'JSON não tem comentários.',
      fixed: 'JSON não tem comentários',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Válido ou inválido?',
      categories: ['Válido', 'Inválido'],
      items: [
        { text: '{ "ativo": true }', cat: 0, why: 'Correto.' },
        { text: '{ ativo: true }', cat: 1, why: 'Chave sem aspas.' },
        { text: '[1, 2, 3,]', cat: 1, why: 'Vírgula sobrando.' },
        { text: '{ "nota": null }', cat: 0, why: 'null é válido.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual representação de data segue a prática usual em JSON?',
      scenarios: [
        { title: 'Opção A', body: '```\n{ "sessao": "2027-01-17T08:00:00-03:00" }\n```' },
        { title: 'Opção B', body: '```\n{ "sessao": data(17/01/2027) }\n```' },
      ],
      answer: 0,
      why: 'JSON não tem tipo de data: usa-se string, em geral ISO 8601. B nem é JSON válido.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.005' }],
  summary: [
    'Seis tipos: objeto { }, array [ ], string (aspas duplas), número, booleano (true, false), null.',
    'Regras: chaves com aspas duplas (simples não valem), sem comentários, sem vírgula sobrando.',
    'Datas: string, em geral ISO 8601.',
    'Objetos e arrays podem se aninhar, como pastas dentro de pastas.',
  ],
};

export const devFmtXml: MicroLesson = {
  ...S,
  id: 'dev.formatos.3',
  series: { id: 'dev.formatos', order: 3 },
  title: 'XML: bem formado, válido e a comparação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um XML segue todas as regras de escrita, mas não obedece ao esquema da nota fiscal. Ele está "certo"?',
    options: [
      { text: 'Está bem formado, mas não é válido', why: 'Isso. Esta aula mostra essa diferença, que cai muito.' },
      { text: 'Está totalmente certo', why: 'Ser bem formado não basta para ser válido.' },
      { text: 'Não é XML', why: 'É XML bem formado; só não segue o esquema.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'estrutura',
      part: 'XML',
      title: 'Elementos e atributos',
      art: 'cartao',
      goal: 'Ler a estrutura de um documento XML.',
      explain:
        'O **XML** organiza os dados em **elementos aninhados**, com marcação de **abertura** e **fechamento**, e pode ter **atributos**.\n\n```\n<?xml version="1.0" encoding="UTF-8"?>\n<processo numero="12345/2026">\n  <relator gabinete="3">Conselheiro A</relator>\n  <anexos>\n    <anexo>parecer.pdf</anexo>\n  </anexos>\n</processo>\n```\n\n**numero** e **gabinete** são **atributos**; **relator** e **anexo** são **elementos**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'No exemplo, "gabinete" é:',
        options: [
          { text: 'Um atributo do elemento relator', why: 'Isso.' },
          { text: 'Um elemento filho de processo', why: 'Está dentro da marcação de abertura de relator: é atributo.' },
          { text: 'O elemento raiz', why: 'A raiz é processo.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Atributo fica **dentro da etiqueta de abertura**, como uma **anotação no rótulo** da pasta: `<relator gabinete="3">`. Elemento é a **pasta** em si, com conteúdo entre a abertura e o fechamento: `<anexo>parecer.pdf</anexo>`.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Qual é o elemento raiz do exemplo?',
          options: [
            { text: 'processo', why: 'Isso: envolve todos os outros.' },
            { text: 'anexo', why: 'anexo está dentro de anexos.' },
            { text: 'relator', why: 'relator está dentro de processo.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'bem-formado',
      part: 'XML',
      title: 'Bem formado ou válido',
      art: 'balanca',
      goal: 'Distinguir XML bem formado de XML válido.',
      explain:
        '- **Bem formado**: segue a **sintaxe** do XML: **um único elemento raiz**, todas as marcações **fechadas e corretamente aninhadas**, atributos **entre aspas**, diferença entre **maiúsculas e minúsculas**.\n- **Válido**: **além de bem formado**, obedece a um **esquema** declarado (**DTD** ou **XSD**), que define quais elementos e tipos são permitidos.\n\n**Todo válido é bem formado**; **nem todo bem formado é válido**.',
      check: {
        kind: 'choice',
        id: 'bf-c',
        prompt: 'Um XML que segue a sintaxe, mas não obedece ao XSD a que se refere, é:',
        options: [
          { text: 'Bem formado, mas não válido', why: 'Isso.' },
          { text: 'Válido, mas não bem formado', why: 'Não existe válido sem ser bem formado.' },
          { text: 'Válido e bem formado', why: 'Não obedece ao esquema: não é válido.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **ofício**: **bem formado** é estar escrito em português correto, com começo, meio e fim. **Válido** é, além disso, seguir o **modelo oficial** do órgão (campos obrigatórios, ordem). Um texto pode estar bem escrito e fora do modelo.',
        check: {
          kind: 'choice',
          id: 'bf-r',
          prompt: 'Qual destes impede o XML de ser bem formado?',
          options: [
            { text: 'Uma marcação aberta e nunca fechada', why: 'Isso.' },
            { text: 'Faltar um elemento que o XSD exige', why: 'Isso o torna inválido, mas pode continuar bem formado.' },
            { text: 'Ter atributos entre aspas', why: 'Aspas são exigidas; não atrapalham.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'extras',
      part: 'XML',
      title: 'Namespaces, XPath e SOAP',
      art: 'rede',
      goal: 'Conhecer namespaces, XPath e a relação do XML com o SOAP.',
      explain:
        '- **Namespaces** evitam **conflito de nomes** entre vocabulários: dois esquemas podem ter um elemento "nome" com sentidos diferentes.\n- **XPath** **localiza partes** do documento, como **/processo/relator**.\n- O XML é a base de padrões **mais antigos** de serviços web, como o **SOAP**.',
      check: {
        kind: 'choice',
        id: 'ex-c',
        prompt: 'Para localizar o elemento relator dentro do processo, usa-se:',
        options: [
          { text: 'XPath', why: 'Isso.' },
          { text: 'Namespace', why: 'Namespace evita conflito de nomes.' },
          { text: 'JSON Schema', why: 'JSON Schema valida JSON.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **XPath** é um **endereço** dentro do documento: "/processo/relator" é como "Rua Processo, casa Relator". O **namespace** é o **sobrenome** de um elemento: "nome" da Receita não se confunde com "nome" do Tribunal.',
        check: {
          kind: 'choice',
          id: 'ex-r',
          prompt: 'Para que servem os namespaces?',
          options: [
            { text: 'Evitar conflito de nomes entre vocabulários', why: 'Isso.' },
            { text: 'Compactar o arquivo', why: 'Não compactam nada.' },
            { text: 'Criptografar o XML', why: 'Não criptografam.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'comparacao',
      part: 'Comparação',
      title: 'JSON ou XML',
      art: 'degraus',
      goal: 'Comparar JSON e XML.',
      explain:
        '- **Verbosidade**: JSON **menor**; XML **maior** (marcações de fechamento).\n- **Tipos nativos**: JSON tem número, booleano, nulo, array; no XML **tudo é texto**, e os tipos vêm do **esquema**.\n- **Validação**: JSON Schema (opcional); XML com **DTD** ou **XSD**.\n- **Comentários**: JSON **não**; XML **sim** (`<!-- -->`).\n- **Atributos**: JSON **não**; XML **sim**.\n- **Uso hoje**: JSON em APIs REST e configuração; XML em documentos, integrações legadas, SOAP, **notas fiscais eletrônicas**.',
      check: {
        kind: 'sort',
        id: 'cp-c',
        prompt: 'JSON ou XML?',
        categories: ['JSON', 'XML'],
        items: [
          { text: 'Aceita comentários', cat: 1, why: 'Com <!-- -->.' },
          { text: 'Tem booleano e nulo nativos', cat: 0, why: 'true, false, null.' },
          { text: 'Validação por XSD', cat: 1, why: 'Esquema do XML.' },
          { text: 'Mais usado em APIs REST', cat: 0, why: 'Menos verboso.' },
        ],
      },
      recovery: {
        explain: 'Resuma assim: o **XML** é o **formulário completo** (rótulos, anotações, comentários, modelo rígido); o **JSON** é o **bilhete enxuto** (só o essencial, com tipos simples). Para documentos oficiais e legados, XML; para APIs modernas, JSON.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'No XML, de onde vêm os tipos dos dados?',
          options: [
            { text: 'Do esquema (DTD ou XSD)', why: 'Isso: sem esquema, tudo é texto.' },
            { text: 'Dos colchetes e chaves', why: 'Isso é JSON.' },
            { text: 'Do navegador', why: 'Vêm do esquema.' },
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
      lines: ['Todo XML válido é bem formado', 'XML aceita comentários', 'Todo XML bem formado é válido'],
      bug: 2,
      why: 'Bem formado pode não obedecer ao esquema: não é necessariamente válido.',
      fixed: 'Nem todo bem formado é válido',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que problema torna o XML não bem formado ou só não válido?',
      categories: ['Não bem formado', 'Bem formado, mas não válido'],
      items: [
        { text: 'Dois elementos raiz', cat: 0, why: 'Exige um único raiz.' },
        { text: 'Falta um campo que o XSD exige', cat: 1, why: 'Esquema.' },
        { text: '<relator> sem </relator>', cat: 0, why: 'Marcação não fechada.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o sistema precisa receber notas fiscais eletrônicas de fornecedores. Que formato esperar?',
      options: [
        { text: 'XML, validado pelo esquema da nota', why: 'Isso.' },
        { text: 'JSON sem esquema', why: 'A nota fiscal eletrônica usa XML.' },
        { text: 'Imagem JPG', why: 'É um documento estruturado em XML.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.01.006' }],
  summary: [
    'XML: elementos aninhados com abertura e fechamento; atributos na marcação de abertura.',
    'Bem formado: um raiz, tudo fechado e aninhado, atributos entre aspas, maiúsculas importam. Válido: também obedece ao DTD ou XSD.',
    'Namespaces evitam conflito de nomes; XPath localiza partes; XML é base do SOAP.',
    'JSON: menor, tipos nativos, sem comentários nem atributos, APIs. XML: verboso, tipos do esquema, comentários, atributos, notas fiscais.',
  ],
};
