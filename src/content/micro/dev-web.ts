// Série "HTML, CSS e React" (cap.dev.04, trecho web-react), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do HTML de 1991 ao React; as seguintes ensinam HTML5 e
// acessibilidade, CSS e especificidade, e React com hooks, uma ideia por etapa. Fatos conferidos com
// o texto do capítulo (03-web-react.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.04', sectionId: 'web-react' } as const;

export const devWebHistoria: MicroLesson = {
  ...S,
  id: 'dev.web.1',
  series: { id: 'dev.web', order: 1 },
  title: 'Do HTML de 1991 ao React',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Numa página web, quem cuida da estrutura, quem cuida da aparência e quem cuida do comportamento?',
    options: [
      { text: 'HTML, CSS e JavaScript, nessa ordem', why: 'Isso. Esta aula conta como cada camada surgiu.' },
      { text: 'CSS, HTML e Java', why: 'A estrutura é do HTML; a aparência, do CSS; o comportamento, do JavaScript.' },
      { text: 'Tudo é feito pelo HTML', why: 'São três camadas com papéis diferentes.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'html',
      part: 'A história',
      title: '1991: o HTML',
      art: 'livro',
      goal: 'Saber que o HTML nasceu com a Web, no CERN.',
      explain:
        'Em **1991**, **Tim Berners-Lee**, no **CERN**, publicou a **World Wide Web**, com o **HTML** para marcar a estrutura das páginas: títulos, parágrafos e **links**.\n\nO HTML foi crescendo. Em **2014**, o **W3C** publicou a recomendação do **HTML5**, com elementos **semânticos**, vídeo e áudio nativos e novos campos de formulário.',
      check: {
        kind: 'choice',
        id: 'ht-c',
        prompt: 'Para que o HTML foi criado?',
        options: [
          { text: 'Marcar a estrutura das páginas e os links', why: 'Isso.' },
          { text: 'Definir as cores das páginas', why: 'Aparência é tarefa do CSS.' },
          { text: 'Programar o servidor', why: 'O HTML descreve a página; não programa o servidor.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O HTML é o **esqueleto** da página: diz "isto é um título", "isto é um parágrafo", "isto leva a outra página". Tim Berners-Lee o criou junto com a própria Web, em 1991.',
        check: {
          kind: 'choice',
          id: 'ht-r',
          prompt: 'Quem publica as recomendações do HTML5?',
          options: [
            { text: 'O W3C', why: 'Isso.' },
            { text: 'A Netscape', why: 'A Netscape criou o JavaScript.' },
            { text: 'O Facebook', why: 'O Facebook criou o React.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'css',
      part: 'A história',
      title: '1994 e 1996: o CSS',
      art: 'cartao',
      goal: 'Saber que o CSS separou a aparência da estrutura.',
      explain:
        'No começo, a aparência era escrita **misturada** ao HTML, página por página.\n\nEm **1994**, **Håkon Wium Lie**, que trabalhava com Tim Berners-Lee no CERN, propôs as **folhas de estilo em cascata**, o **CSS**. Em **1996**, o W3C publicou o **CSS1**.\n\nA ideia: o HTML diz **o que** é cada parte; o CSS diz **como** ela aparece. Uma só folha de estilo muda o visual de um site inteiro.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: 'Qual foi a grande ideia do CSS?',
        options: [
          { text: 'Separar a aparência da estrutura', why: 'Isso.' },
          { text: 'Substituir o HTML', why: 'O CSS complementa o HTML.' },
          { text: 'Criar bancos de dados', why: 'O CSS cuida da apresentação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **edital**: o texto (HTML) é o mesmo, mas o **modelo de formatação** (CSS) define fonte, margens e cores. Troque o modelo, e todos os editais mudam de cara sem mexer no texto.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'Quem propôs o CSS em 1994?',
          options: [
            { text: 'Håkon Wium Lie', why: 'Isso.' },
            { text: 'Brendan Eich', why: 'Eich criou o JavaScript.' },
            { text: 'Ryan Dahl', why: 'Dahl criou o Node.js.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'react',
      part: 'A história',
      title: '2013: o React',
      art: 'engrenagem',
      goal: 'Saber que o React organizou a interface em componentes.',
      explain:
        'Com páginas cada vez mais interativas, o código JavaScript virou um emaranhado.\n\nEm **2013**, o **Facebook** abriu o código do **React**, uma biblioteca para montar interfaces com **componentes** reutilizáveis: um botão, uma lista, um formulário, cada um no seu pedaço.\n\nEm **2019**, chegaram os **hooks**, como `useState` e `useEffect`, e os componentes passaram a ser escritos como **funções**.',
      check: {
        kind: 'order',
        id: 're-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['HTML com a Web (1991)', 'CSS1 (1996)', 'React aberto pelo Facebook (2013)', 'HTML5 recomendado pelo W3C (2014)'],
        why: 'Estrutura, aparência, componentes e a nova versão do HTML.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O React é um **jogo de blocos de montar**: cada bloco (componente) tem o seu formato e a sua função, e você monta a tela encaixando blocos. Um bloco "lista de processos" serve em várias telas.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Quem criou o React?',
          options: [
            { text: 'O Facebook', why: 'Isso, aberto em 2013.' },
            { text: 'O CERN', why: 'O CERN é o berço da Web.' },
            { text: 'A Microsoft', why: 'A Microsoft criou o TypeScript.' },
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
      items: ['HTML (1991)', 'Proposta do CSS (1994)', 'React (2013)', 'Hooks no React (2019)'],
      why: 'Da estrutura aos componentes com hooks.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada camada cuida de quê?',
      categories: ['Estrutura', 'Aparência', 'Comportamento'],
      items: [
        { text: 'HTML', cat: 0, why: 'Esqueleto.' },
        { text: 'CSS', cat: 1, why: 'Roupa.' },
        { text: 'JavaScript', cat: 2, why: 'Movimento.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['CSS separa aparência de estrutura', 'React organiza a interface em componentes', 'HTML define o comportamento da página'],
      bug: 2,
      why: 'O comportamento é do JavaScript; o HTML dá a estrutura.',
      fixed: 'HTML define a estrutura da página',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1991: Tim Berners-Lee, no CERN, cria a Web e o HTML. 2014: W3C recomenda o HTML5.',
    '1994: Håkon Wium Lie propõe o CSS; 1996: CSS1.',
    '2013: Facebook abre o React; 2019: hooks.',
  ],
};

export const devWebHtml: MicroLesson = {
  ...S,
  id: 'dev.web.2',
  series: { id: 'dev.web', order: 2 },
  title: 'HTML5 e acessibilidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um campo de formulário sem rótulo visível e sem label. O que um leitor de tela anuncia?',
    options: [
      { text: 'Quase nada útil: a pessoa não sabe o que preencher', why: 'Isso. Esta aula mostra como o HTML5 e a acessibilidade resolvem isso.' },
      { text: 'O nome do campo, sempre', why: 'Sem label associado, o leitor de tela não tem o que anunciar.' },
      { text: 'A cor do campo', why: 'O leitor de tela lê o texto associado; a cor não ajuda.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'semantica',
      part: 'HTML5',
      title: 'Elementos semânticos',
      art: 'trilha',
      goal: 'Associar cada elemento semântico ao seu papel.',
      explain:
        'O HTML5 começa com `<!DOCTYPE html>` e trouxe elementos que dizem o **papel** do conteúdo:\n\n- `header` (cabeçalho), `nav` (navegação), `main` (conteúdo principal, **um por página**);\n- `article` (conteúdo **independente**, como um acórdão), `section` (agrupamento temático), `aside` (lateral);\n- `footer` (rodapé), `figure` e `figcaption` (ilustração com legenda).',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'Qual elemento serve para um acórdão, que faz sentido sozinho?',
        options: [
          { text: 'article', why: 'Isso: conteúdo independente.' },
          { text: 'nav', why: 'nav é para navegação.' },
          { text: 'aside', why: 'aside é para conteúdo lateral, relacionado.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **jornal**: o **cabeçalho** com o nome (header), o **índice** de seções (nav), as **reportagens** completas (article), a **coluna lateral** de notas (aside) e o **rodapé** com o expediente (footer).',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'Quantos main deve haver numa página?',
          options: [
            { text: 'Um', why: 'Isso: o conteúdo principal.' },
            { text: 'Um por seção', why: 'section pode haver vários; main, um.' },
            { text: 'Nenhum', why: 'Recomenda-se um, com o conteúdo principal.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'formularios',
      part: 'HTML5',
      title: 'Formulários e validação',
      art: 'revisao',
      goal: 'Usar os novos campos e entender os limites da validação no navegador.',
      explain:
        'O HTML5 trouxe novos tipos de campo: `email`, `number`, `date`, `tel`, `url`, `range`. E atributos de validação: `required`, `pattern`, `min`, `max`, `maxlength`.\n\n```html\n<label for="email">E-mail para retorno</label>\n<input id="email" name="email" type="email" required>\n```\n\nAtenção: a validação no navegador **melhora a experiência**, mas **não substitui** a validação no **servidor**, porque o usuário pode contornar o HTML.',
      check: {
        kind: 'choice',
        id: 'fo-c',
        prompt: 'Com required no campo, ainda é preciso validar no servidor?',
        options: [
          { text: 'Sim: o cliente pode contornar o HTML', why: 'Isso.' },
          { text: 'Não: o required garante o dado', why: 'Pegadinha: qualquer um pode enviar sem passar pelo navegador.' },
          { text: 'Só em formulários longos', why: 'Sempre se valida no servidor.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A validação do navegador é o **aviso na porta** ("preencha todos os campos"): ajuda quem é honesto. A validação do servidor é o **conferente no protocolo**: confere de verdade, porque alguém pode ter entrado pela janela.',
        check: {
          kind: 'choice',
          id: 'fo-r',
          prompt: 'Qual tipo de campo pede um endereço de e-mail?',
          options: [
            { text: 'type="email"', why: 'Isso.' },
            { text: 'type="text" com required', why: 'Funciona, mas sem a validação de formato de e-mail.' },
            { text: 'type="url"', why: 'url é para endereços de páginas.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'acessibilidade',
      part: 'Acessibilidade',
      title: 'WCAG, eMAG e boas práticas',
      art: 'pessoal',
      goal: 'Aplicar as práticas básicas de acessibilidade.',
      explain:
        'As recomendações internacionais estão nas **WCAG**, do W3C; no governo federal, há também o **eMAG**. Práticas básicas:\n\n- `alt` em imagens informativas; `alt=""` nas decorativas;\n- todo campo com `label` associado (`for` igual ao `id`);\n- títulos `h1` a `h6` em hierarquia coerente;\n- idioma declarado, `lang="pt-BR"`;\n- contraste suficiente e foco visível no teclado;\n- preferir `button` e `a` a uma `div` clicável; ARIA só quando não houver elemento nativo.',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'No formulário de denúncias do portal, qual prática é recomendada?',
        options: [
          { text: 'Associar cada campo a um label e usar button para ações', why: 'Isso.' },
          { text: 'Usar div clicável no lugar de button', why: 'A div não é acessível por teclado nem anunciada como botão.' },
          { text: 'Pôr alt em todas as imagens decorativas com longas descrições', why: 'Decorativas levam alt vazio.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Feche os olhos e imagine usar o site **só ouvindo** e **só com o teclado**. Você precisa ouvir **o nome de cada campo** (label), chegar ao **botão** com Tab (button nativo) e saber o que cada **imagem** informa (alt).',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'Quando usar atributos ARIA?',
          options: [
            { text: 'Quando não houver elemento nativo adequado', why: 'Isso.' },
            { text: 'Sempre, em todo elemento', why: 'O nativo vem primeiro; ARIA complementa.' },
            { text: 'Nunca', why: 'ARIA tem uso quando falta elemento nativo.' },
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
      prompt: 'Qual elemento semântico serve para cada conteúdo?',
      categories: ['nav', 'article', 'footer'],
      items: [
        { text: 'Menu principal do portal', cat: 0, why: 'Navegação.' },
        { text: 'Um acórdão completo', cat: 1, why: 'Conteúdo independente.' },
        { text: 'Endereço e telefone do órgão no rodapé', cat: 2, why: 'Rodapé.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Imagem decorativa: alt vazio', 'Campo com label associado', 'required dispensa validar no servidor'],
      bug: 2,
      why: 'O cliente pode ser contornado; o servidor sempre valida.',
      fixed: 'Validar também no servidor',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O botão "Enviar denúncia" foi feito com uma div clicável. O que propor?',
      scenarios: [
        { title: 'Opção A', body: 'Trocar por um **button** nativo, acessível por teclado.' },
        { title: 'Opção B', body: 'Manter a div e aumentar a fonte.' },
      ],
      answer: 0,
      why: 'Elementos nativos são anunciados e focáveis; a div não.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.009' }],
  summary: [
    'Semântica: header, nav, main (um), article (independente), section, aside, footer, figure.',
    'Novos campos: email, number, date, tel, url, range; validação com required, pattern, min, max. Valide também no servidor.',
    'Acessibilidade (WCAG, eMAG): alt, label, títulos coerentes, lang, contraste e foco, elementos nativos; ARIA só sem nativo.',
  ],
};

export const devWebCss: MicroLesson = {
  ...S,
  id: 'dev.web.3',
  series: { id: 'dev.web', order: 3 },
  title: 'CSS: seletores e caixas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Duas regras dão cores diferentes ao mesmo link. Qual vence?',
    options: [
      { text: 'A de maior especificidade', why: 'Isso. Esta aula mostra como contar a especificidade.' },
      { text: 'Sempre a primeira escrita', why: 'Com especificidade igual, vence a última; senão, a mais específica.' },
      { text: 'Nenhuma; o link fica preto', why: 'Uma das regras é aplicada.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'seletores',
      part: 'Seletores',
      title: 'Tipo, classe, ID e companhia',
      art: 'alvo',
      goal: 'Ler os seletores mais comuns.',
      explain:
        'Os seletores mais comuns:\n\n- tipo: `p` (todos os parágrafos);\n- classe: `.alerta`;\n- ID: `#topo`;\n- atributo: `input[type="email"]`;\n- descendente: `nav a` (links em qualquer nível dentro de nav);\n- filho direto: `ul > li`;\n- irmão: `h2 + p` (o logo seguinte) e `h2 ~ p` (todos os seguintes);\n- pseudo-classe: `a:hover`; pseudo-elemento: `::before`.',
      check: {
        kind: 'choice',
        id: 'sl-c',
        prompt: 'O seletor ul > li seleciona:',
        options: [
          { text: 'Os li filhos diretos de ul', why: 'Isso.' },
          { text: 'Todos os li em qualquer nível dentro de ul', why: 'Isso seria "ul li", o descendente.' },
          { text: 'O li logo depois de ul', why: 'Isso seria "ul + li".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **família**: o **espaço** ("nav a") pega **todos os descendentes**, netos inclusive. O sinal **>** ("ul > li") pega só os **filhos**. O **+** pega o **irmão logo ao lado**; o **~**, **todos os irmãos** que vêm depois.',
        check: {
          kind: 'choice',
          id: 'sl-r',
          prompt: 'Qual seletor pega o elemento com id="topo"?',
          options: [
            { text: '#topo', why: 'Isso.' },
            { text: '.topo', why: 'O ponto é para classe.' },
            { text: 'topo', why: 'Sem símbolo, seria um elemento chamado topo.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'especificidade',
      part: 'Conflitos',
      title: 'Contar a especificidade',
      art: 'balanca',
      goal: 'Decidir qual regra vence pelo cálculo de especificidade.',
      explain:
        'A especificidade conta três níveis: **(IDs, classes, elementos)**.\n\n| Seletor | Especificidade |\n|---|---|\n| `a` | (0, 0, 1) |\n| `.menu a` | (0, 1, 1) |\n| `#topo a` | (1, 0, 1) |\n\nVence a **maior**, comparando da esquerda para a direita. Um ID vale mais que **qualquer quantidade** de classes.\n\nEstilo *inline* supera seletores; `!important` supera tudo. Em **empate**, vence a regra **declarada por último**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Entre .aviso p e p, qual tem maior especificidade?',
        options: [
          { text: '.aviso p, com (0, 1, 1)', why: 'Isso.' },
          { text: 'p, com (0, 0, 1)', why: 'p tem só um elemento; .aviso p tem classe e elemento.' },
          { text: 'Empatam', why: 'A classe faz .aviso p vencer.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **medalhas**: o **ouro** é o ID, a **prata** é a classe, o **bronze** é o elemento. Compara-se primeiro o ouro; só se empatar, a prata; só então o bronze. Um ouro vence qualquer pilha de pratas.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Duas regras com a mesma especificidade: qual vence?',
          options: [
            { text: 'A declarada por último', why: 'Isso.' },
            { text: 'A declarada primeiro', why: 'Em empate, vence a última.' },
            { text: 'A mais curta', why: 'O tamanho do texto não conta.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'caixas',
      part: 'Layout',
      title: 'Box model, flexbox e grid',
      art: 'dados',
      goal: 'Calcular a largura no box model e escolher entre flexbox e grid.',
      explain:
        'Todo elemento é uma caixa: **conteúdo**, **padding**, **border**, **margin**.\n\n- Com `content-box` (padrão), `width: 200px; padding: 20px; border: 5px` ocupa **250 px**;\n- com `border-box`, padding e borda ficam **dentro** dos 200 px.\n\n**Flexbox** organiza em **uma dimensão** (linha ou coluna). **Grid** organiza em **duas** (linhas e colunas). **Media queries** com `min-width` fazem o *mobile first*.',
      check: {
        kind: 'choice',
        id: 'cx-c',
        prompt: 'width: 100px; padding: 10px; border: 2px, com content-box. Largura total?',
        options: [
          { text: '124 px', why: 'Isso: 100 + 10 + 10 + 2 + 2.' },
          { text: '100 px', why: 'Seria assim com border-box.' },
          { text: '112 px', why: 'Padding e borda contam dos dois lados: 100 + 20 + 4.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **quadro na parede**: a **foto** (conteúdo), o **paspatur** em volta (padding), a **moldura** (border) e o **espaço até o próximo quadro** (margin). No content-box, o tamanho anunciado é só o da **foto**; o paspatur e a moldura somam **dos dois lados**.',
        check: {
          kind: 'choice',
          id: 'cx-r',
          prompt: 'Para um painel com linhas e colunas ao mesmo tempo, o mais indicado é:',
          options: [
            { text: 'Grid, bidimensional', why: 'Isso.' },
            { text: 'Flexbox, unidimensional', why: 'Flexbox trabalha numa dimensão por vez.' },
            { text: 'Só margin', why: 'Margin não organiza um layout.' },
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
      prompt: 'Ordene do menos para o mais específico.',
      items: ['a', '.menu a', '#topo a', 'estilo inline'],
      why: 'Elemento, classe, ID e inline.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Flexbox: uma dimensão', 'Grid: duas dimensões', 'Classe tem especificidade maior que ID'],
      bug: 2,
      why: 'O ID pesa mais que qualquer quantidade de classes.',
      fixed: 'ID tem especificidade maior que classe',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O link é alcançado por a { blue }, .menu a { green } e #topo a { red }, nessa ordem. Que cor fica?',
      scenarios: [
        { title: 'Opção A', body: '**Vermelho**: #topo a tem um ID, a maior especificidade.' },
        { title: 'Opção B', body: '**Azul**: a primeira regra prevalece.' },
      ],
      answer: 0,
      why: 'A especificidade decide antes da ordem; o ID vence.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.007' }],
  summary: [
    'Seletores: tipo, .classe, #id, [atributo], descendente (espaço), filho (>), irmãos (+ e ~), pseudo-classes e pseudo-elementos.',
    'Especificidade (IDs, classes, elementos); inline e !important acima; empate: vence a última.',
    'Box model: content-box soma padding e borda; border-box os inclui. Flexbox: 1 dimensão; grid: 2. Mobile first com min-width.',
  ],
};

export const devWebReact: MicroLesson = {
  ...S,
  id: 'dev.web.4',
  series: { id: 'dev.web', order: 4 },
  title: 'React: componentes e hooks',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um componente React pode alterar diretamente as props que recebeu do pai?',
    options: [
      { text: 'Não: props são somente leitura', why: 'Isso. Esta aula mostra props, estado e efeitos.' },
      { text: 'Sim, sempre', why: 'Props são do pai; o filho só lê.' },
      { text: 'Só se forem números', why: 'Nenhuma prop deve ser alterada pelo filho.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'props',
      part: 'Componentes',
      title: 'JSX, props e estado',
      art: 'pessoal',
      goal: 'Distinguir props de estado e entender o fluxo de dados.',
      explain:
        'Componentes são **funções** que retornam **JSX**, que parece HTML mas vira JavaScript (por isso `className` em vez de `class`).\n\n- **Props**: dados que o **pai** passa ao filho. **Somente leitura**.\n- **Estado**: dados **internos** que mudam. Alterar o estado com a função de atualização faz o React **renderizar de novo**.\n\nO fluxo é **unidirecional**: desce por props; o filho avisa o pai chamando uma função recebida.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'Como um filho avisa o pai que algo mudou?',
        options: [
          { text: 'Chamando uma função recebida por props', why: 'Isso.' },
          { text: 'Alterando as props diretamente', why: 'Props são somente leitura.' },
          { text: 'Mudando o HTML do pai', why: 'O fluxo é unidirecional, por funções.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **chefia e um servidor**: a chefia manda o **despacho** (props), que o servidor **não reescreve**. O servidor tem as **anotações dele** (estado). Para avisar a chefia, ele **usa o canal** que ela deu (a função recebida).',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'O que faz o React renderizar o componente de novo?',
          options: [
            { text: 'Atualizar o estado com a função de atualização', why: 'Isso.' },
            { text: 'Alterar uma variável comum', why: 'Variáveis comuns não avisam o React.' },
            { text: 'Mudar o CSS', why: 'O gatilho é a mudança de estado ou de props.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'efeito',
      part: 'Hooks',
      title: 'useEffect e suas dependências',
      art: 'calendario',
      goal: 'Saber quando o efeito executa conforme o vetor de dependências.',
      explain:
        '| `useEffect(fn, deps)` | Quando fn executa |\n|---|---|\n| sem segundo argumento | após **toda** renderização |\n| `[]` | só após a **montagem** |\n| `[a, b]` | na montagem e quando `a` ou `b` mudam |\n| função retornada | **limpeza**, antes de repetir e ao desmontar |\n\nRegras dos hooks: chamar só no **nível superior** do componente, nunca dentro de `if` ou laços.',
      check: {
        kind: 'choice',
        id: 'ef-c',
        prompt: 'useEffect(() => carregar(orgao), [orgao]) executa:',
        options: [
          { text: 'Na montagem e sempre que orgao mudar', why: 'Isso.' },
          { text: 'Só uma vez, na montagem', why: 'Isso seria com vetor vazio [].' },
          { text: 'Após toda renderização', why: 'Isso seria sem o segundo argumento.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O vetor de dependências é a **lista de vigia**: o efeito roda de novo **só quando algo da lista muda**. Lista vazia: ninguém a vigiar, roda **uma vez**. Sem lista: vigia **tudo**, roda **sempre**.',
        check: {
          kind: 'choice',
          id: 'ef-r',
          prompt: 'useEffect com vetor vazio [] executa:',
          options: [
            { text: 'Só após a montagem', why: 'Isso.' },
            { text: 'Após cada renderização', why: 'Pegadinha: isso é sem o segundo argumento.' },
            { text: 'Nunca', why: 'Executa uma vez, na montagem.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'listas',
      part: 'Listas e estado',
      title: 'key e estado imutável',
      art: 'trilha',
      goal: 'Usar key estável e atualizar o estado sem mutação.',
      explain:
        'Em listas, cada item precisa de uma **key** estável e única entre irmãos:\n\n```jsx\nitens.map(p => <li key={p.id}>{p.numero}</li>)\n```\n\nO React usa a key na **reconciliação**, para saber qual item mudou. Usar o **índice** como key causa erros quando a lista é reordenada.\n\nTrate o estado como **imutável**: `setItens([...itens, novo])`, não `itens.push(novo)`. Se o novo valor depende do anterior: `setContador(c => c + 1)`.',
      check: {
        kind: 'choice',
        id: 'li-c',
        prompt: 'Qual é a melhor key para uma lista de processos?',
        options: [
          { text: 'O identificador do processo, como p.id', why: 'Isso: estável e único.' },
          { text: 'O índice do vetor', why: 'Quebra quando a lista é reordenada ou recebe itens no meio.' },
          { text: 'Um número aleatório a cada renderização', why: 'Muda sempre; o React perde a referência.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'A key é o **número do processo** na pilha: se alguém **reordena** a pilha, você ainda sabe qual é qual. Se usasse a **posição na pilha**, ao tirar o primeiro, todos "mudariam de nome".',
        check: {
          kind: 'choice',
          id: 'li-r',
          prompt: 'Como adicionar um item ao estado itens?',
          options: [
            { text: 'setItens([...itens, novo])', why: 'Isso: novo vetor, sem mutação.' },
            { text: 'itens.push(novo)', why: 'Muta o estado e o React pode não perceber.' },
            { text: 'itens = novo', why: 'Reatribuir não avisa o React.' },
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
      prompt: 'Quando o efeito executa?',
      categories: ['Só na montagem', 'Quando a dependência muda', 'Após toda renderização'],
      items: [
        { text: 'useEffect(fn, [])', cat: 0, why: 'Vetor vazio.' },
        { text: 'useEffect(fn, [orgao])', cat: 1, why: 'Depende de orgao.' },
        { text: 'useEffect(fn)', cat: 2, why: 'Sem segundo argumento.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Props: somente leitura', 'Estado: atualizar sem mutação', 'Hooks podem ser chamados dentro de if'],
      bug: 2,
      why: 'Hooks só no nível superior do componente.',
      fixed: 'Hooks só no nível superior',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um contador soma 1 a cada clique, e às vezes perde cliques rápidos. Qual correção?',
      scenarios: [
        { title: 'Opção A', body: 'Usar a forma funcional **setContador(c => c + 1)**.' },
        { title: 'Opção B', body: 'Fazer **contador = contador + 1** direto.' },
      ],
      answer: 0,
      why: 'Quando o novo valor depende do anterior, a forma funcional usa sempre o valor mais recente.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.008' }],
  summary: [
    'Componentes são funções com JSX (className). Props: do pai, somente leitura. Estado: interno; atualizar renderiza de novo.',
    'useEffect: sem deps (sempre), [] (montagem), [a] (quando a muda); retorno é limpeza. Hooks só no nível superior.',
    'key estável e única (não o índice). Estado imutável; forma funcional quando depende do anterior.',
  ],
};
