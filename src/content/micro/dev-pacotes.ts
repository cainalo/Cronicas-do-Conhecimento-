// Série "Dependências e pacotes" (cap.dev.04, trecho pacotes), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta dos primeiros repositórios de pacotes ao lockfile e ao caso
// left-pad; as seguintes ensinam o versionamento semântico, o package.json com o lockfile, e pip,
// Maven e publicação, uma ideia por etapa. Fatos conferidos com o texto do capítulo (04-pacotes.md).
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.04', sectionId: 'pacotes' } as const;

export const devPacHistoria: MicroLesson = {
  ...S,
  id: 'dev.pacotes.1',
  series: { id: 'dev.pacotes', order: 1 },
  title: 'Dos primeiros repositórios ao lockfile',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Quantas bibliotecas de terceiros um sistema web moderno costuma usar, contando as dependências das dependências?',
    options: [
      { text: 'Centenas, às vezes milhares', why: 'Isso. Esta aula conta como se chegou a gerenciar tudo isso.' },
      { text: 'Nenhuma: tudo é escrito do zero', why: 'Quase nenhum sistema é escrito do zero.' },
      { text: 'Duas ou três', why: 'Com as dependências transitivas, são muitas mais.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'repositorios',
      part: 'A história',
      title: '1995 a 2010: os repositórios',
      art: 'nuvem',
      goal: 'Conhecer os marcos dos repositórios de pacotes.',
      explain:
        'Antes, para usar a biblioteca de alguém, era preciso **baixar à mão** e copiar para o projeto.\n\n- **1995**: a comunidade Perl criou o **CPAN**, um dos primeiros grandes repositórios de pacotes;\n- **2004**: saiu o **Maven** 1.0, da Apache, para projetos Java, com o repositório central;\n- **2010**: **Isaac Schlueter** lançou o **npm**, que acompanha o Node.js.\n\nCom eles, bastava **declarar** a dependência, e a ferramenta baixava.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'O que os gerenciadores de pacotes mudaram?',
        options: [
          { text: 'Basta declarar a dependência e a ferramenta baixa', why: 'Isso.' },
          { text: 'Proibiram usar bibliotecas de terceiros', why: 'Facilitaram usá-las.' },
          { text: 'Obrigaram a copiar o código à mão', why: 'Era assim antes deles.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Antes, era como **ir a cada loja** comprar cada peça. O gerenciador de pacotes é a **lista de compras entregue em casa**: você escreve o que precisa, e ele busca tudo, inclusive as peças que as peças precisam.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Qual gerenciador acompanha o Node.js?',
          options: [
            { text: 'npm', why: 'Isso, de 2010.' },
            { text: 'Maven', why: 'Maven é do Java.' },
            { text: 'CPAN', why: 'CPAN é do Perl.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'semver',
      part: 'A história',
      title: 'Por volta de 2010: o versionamento semântico',
      art: 'calendario',
      goal: 'Saber de onde vem o SemVer.',
      explain:
        'Com milhares de pacotes se atualizando, surgiu uma pergunta: **posso atualizar sem quebrar meu sistema?**\n\nPor volta de **2010**, **Tom Preston-Werner**, cofundador do GitHub, publicou o **Versionamento Semântico** (**SemVer**), em semver.org.\n\nA ideia: o número da versão, **MAJOR.MINOR.PATCH**, **comunica** o tipo de mudança. Assim, a ferramenta sabe quais atualizações são seguras.',
      check: {
        kind: 'choice',
        id: 'sv-c',
        prompt: 'Para que serve o SemVer?',
        options: [
          { text: 'Fazer o número da versão comunicar o tipo de mudança', why: 'Isso.' },
          { text: 'Criptografar os pacotes', why: 'O SemVer trata de numeração de versões.' },
          { text: 'Escolher a cor do ícone do pacote', why: 'O SemVer trata de numeração.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nas **edições de um livro**: uma **errata** (PATCH) corrige vírgulas; uma **edição ampliada** (MINOR) acrescenta capítulos sem mudar os antigos; uma **nova edição reescrita** (MAJOR) muda a numeração das páginas, e quem citava a antiga precisa ajustar.',
        check: {
          kind: 'choice',
          id: 'sv-r',
          prompt: 'Quem publicou o SemVer?',
          options: [
            { text: 'Tom Preston-Werner', why: 'Isso, cofundador do GitHub.' },
            { text: 'Isaac Schlueter', why: 'Schlueter criou o npm.' },
            { text: 'Guido van Rossum', why: 'Guido criou o Python.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'leftpad',
      part: 'A história',
      title: '2016 e 2017: left-pad e o lockfile',
      art: 'cadeado',
      goal: 'Entender por que o lockfile e a cadeia de suprimentos importam.',
      explain:
        'Em **2016**, um autor retirou do npm um pacote minúsculo chamado **left-pad**, de poucas linhas. Milhares de projetos que dependiam dele, **direta ou indiretamente**, pararam de compilar.\n\nO caso mostrou o tamanho das **cadeias de dependência**.\n\nEm **2017**, o npm 5 passou a gerar o **package-lock.json**, que **trava** a versão exata de **toda a árvore**, para que todos instalem exatamente o mesmo.',
      check: {
        kind: 'order',
        id: 'lp-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['CPAN (1995)', 'Maven 1.0 (2004)', 'npm (2010)', 'Caso left-pad (2016)', 'package-lock.json no npm 5 (2017)'],
        why: 'Dos repositórios ao travamento de versões.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma **torre de cartas**: cada carta de cima se apoia nas de baixo. Tirar uma carta pequena **lá embaixo** (o left-pad) derrubou torres enormes. O lockfile é a **fotografia** de como a torre estava montada, para remontá-la igual.',
        check: {
          kind: 'choice',
          id: 'lp-r',
          prompt: 'O que o lockfile registra?',
          options: [
            { text: 'A versão exata de toda a árvore de dependências', why: 'Isso, inclusive as transitivas.' },
            { text: 'Só as dependências diretas, com intervalos', why: 'Isso é o package.json.' },
            { text: 'As senhas do registro', why: 'Nunca; registra versões e hashes.' },
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
      items: ['CPAN (1995)', 'Maven (2004)', 'npm (2010)', 'left-pad (2016)'],
      why: 'Repositórios e a lição sobre cadeias de dependência.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada ferramenta é de qual linguagem?',
      categories: ['JavaScript', 'Java', 'Perl'],
      items: [
        { text: 'npm', cat: 0, why: 'Acompanha o Node.js.' },
        { text: 'Maven', cat: 1, why: 'Apache, 2004.' },
        { text: 'CPAN', cat: 2, why: '1995.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['SemVer: MAJOR.MINOR.PATCH', 'Lockfile: versões exatas da árvore', 'left-pad: um pacote grande e central'],
      bug: 2,
      why: 'O left-pad tinha poucas linhas; o problema foi a cadeia de dependências.',
      fixed: 'left-pad: um pacote minúsculo',
      errorKind: 'leitura',
    },
  ],
  exam: [],
  summary: [
    'CPAN (1995), Maven 1.0 (2004) e npm (2010, Isaac Schlueter): declarar e baixar dependências.',
    'Por volta de 2010: Tom Preston-Werner publica o SemVer, MAJOR.MINOR.PATCH.',
    '2016: caso left-pad; 2017: npm 5 traz o package-lock.json.',
  ],
};

export const devPacSemver: MicroLesson = {
  ...S,
  id: 'dev.pacotes.2',
  series: { id: 'dev.pacotes', order: 2 },
  title: 'Versionamento semântico',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma biblioteca passou da versão 2.4.1 para a 3.0.0. O que isso avisa?',
    options: [
      { text: 'Há mudança incompatível: pode quebrar quem usa', why: 'Isso. Esta aula mostra as três partes e os intervalos do npm.' },
      { text: 'Só correções pequenas', why: 'Correção pequena mexe no PATCH: 2.4.2.' },
      { text: 'Nada; os números são aleatórios', why: 'No SemVer, cada parte tem um significado.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'partes',
      part: 'SemVer',
      title: 'MAJOR, MINOR e PATCH',
      art: 'degraus',
      goal: 'Saber qual parte incrementar em cada tipo de mudança.',
      explain:
        '| Parte | Incrementa quando | Exemplo |\n|---|---|---|\n| MAJOR | mudança **incompatível** | 2.4.1 → 3.0.0 |\n| MINOR | novidade **compatível** | 2.4.1 → 2.5.0 |\n| PATCH | **correção** compatível | 2.4.1 → 2.4.2 |\n\nVersões **0.y.z** indicam desenvolvimento inicial: a API pode mudar a qualquer momento. Pré-lançamentos vêm após hífen: `1.0.0-beta.1`.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Uma função nova, sem quebrar as antigas, em 1.3.2. A próxima versão é:',
        options: [
          { text: '1.4.0', why: 'Isso: MINOR sobe e PATCH zera.' },
          { text: '2.0.0', why: 'MAJOR é para mudança incompatível.' },
          { text: '1.3.3', why: 'PATCH é para correção, não para novidade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: **quebra quem usa?** Sim: MAJOR. **Acrescenta algo** sem quebrar? MINOR. **Só conserta**? PATCH. E, ao subir uma parte, as da direita **voltam a zero**: 1.3.2 com novidade vira 1.4.0.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Uma mudança incompatível na API exige incrementar:',
          options: [
            { text: 'O MAJOR', why: 'Isso.' },
            { text: 'O MINOR', why: 'MINOR é para novidade compatível.' },
            { text: 'O PATCH', why: 'PATCH é para correção.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'intervalos',
      part: 'npm',
      title: 'Til e circunflexo',
      art: 'alvo',
      goal: 'Ler os intervalos ~ e ^ do npm.',
      explain:
        '| Notação | Aceita | Em palavras |\n|---|---|---|\n| `1.2.3` | só 1.2.3 | exata |\n| `~1.2.3` | ≥ 1.2.3 e < 1.3.0 | só **patches** |\n| `^1.2.3` | ≥ 1.2.3 e < 2.0.0 | **minor e patch** |\n| `^0.2.3` | ≥ 0.2.3 e < 0.3.0 | major 0: mais conservador |\n| `*` | qualquer | evitar |\n\nO **circunflexo** é o padrão que o `npm install` grava no `package.json`.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Com "~3.1.4", qual versão pode ser instalada?',
        options: [
          { text: '3.1.9', why: 'Isso: o til aceita só patches.' },
          { text: '3.2.0', why: 'O til não aceita mudança de MINOR.' },
          { text: '4.0.0', why: 'O til não aceita mudança de MAJOR.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O **til (~)** é o **cuidadoso**: deixa mexer só no **último número**. O **circunflexo (^)** é o **moderado**: deixa mexer nos **dois últimos**, mas segura o primeiro. Para lembrar: o chapéu (^) cobre mais coisa que a ondinha (~).',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: '"^1.2.3" aceita a versão 1.9.0?',
          options: [
            { text: 'Sim: mantém o MAJOR 1', why: 'Isso; mas não aceitaria 2.0.0.' },
            { text: 'Não: só patches', why: 'Só patches é o til.' },
            { text: 'Não: só a versão exata', why: 'Versão exata é sem símbolo.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'zero',
      part: 'npm',
      title: 'O caso do major zero',
      art: 'interruptor',
      goal: 'Aplicar o circunflexo a versões 0.y.z.',
      explain:
        'Com **major 0**, a API ainda é instável. Por isso o circunflexo fica **mais conservador**:\n\n- `^0.2.3` aceita de 0.2.3 até **antes de 0.3.0**;\n- ou seja, trata o **segundo número** como se fosse o major.\n\nExemplo: com `^0.4.1`, entra 0.4.7, mas **não** 0.5.0.',
      check: {
        kind: 'choice',
        id: 'ze-c',
        prompt: 'Com "^0.4.1", qual versão é aceita?',
        options: [
          { text: '0.4.7', why: 'Isso: dentro de 0.4.x.' },
          { text: '0.5.0', why: 'Com major 0, o circunflexo não sobe o segundo número.' },
          { text: '1.0.0', why: 'Mudaria o major.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na versão **0**, o pacote ainda está **em obra**. Cada novo segundo número (0.4 → 0.5) pode **mudar tudo**. Por isso o npm, prudente, só aceita os **patches** dentro do mesmo 0.4.',
        check: {
          kind: 'choice',
          id: 'ze-r',
          prompt: 'O que indicam as versões 0.y.z?',
          options: [
            { text: 'Desenvolvimento inicial: a API pode mudar', why: 'Isso.' },
            { text: 'Versões abandonadas', why: 'Indicam desenvolvimento inicial.' },
            { text: 'Versões sem defeitos', why: 'Indicam API ainda instável.' },
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
      prompt: '"~2.4.1" aceita a versão?',
      categories: ['Aceita', 'Não aceita'],
      items: [
        { text: '2.4.9', cat: 0, why: 'Só patch.' },
        { text: '2.4.2', cat: 0, why: 'Só patch.' },
        { text: '2.5.0', cat: 1, why: 'Mudou o MINOR.' },
        { text: '3.0.0', cat: 1, why: 'Mudou o MAJOR.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['^1.2.3 aceita 1.9.0', '~1.2.3 aceita 1.2.8', '~1.2.3 aceita 1.3.0'],
      bug: 2,
      why: 'O til aceita só patches: até antes de 1.3.0.',
      fixed: '~1.2.3 não aceita 1.3.0',
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma biblioteca de assinatura digital quebrou o sistema ao atualizar sozinha. Qual intervalo dá menos risco?',
      scenarios: [
        { title: 'Opção A', body: '**~5.2.0**: só correções.' },
        { title: 'Opção B', body: 'O **asterisco**: qualquer versão.' },
      ],
      answer: 0,
      why: 'O til limita a patches; o asterisco aceita até mudanças incompatíveis.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.010' }],
  summary: [
    'SemVer: MAJOR (incompatível), MINOR (novidade compatível), PATCH (correção). 0.y.z: API instável.',
    '~1.2.3: só patches (< 1.3.0). ^1.2.3: minor e patch (< 2.0.0). ^0.2.3: < 0.3.0. * : evitar.',
    'O npm install grava o circunflexo por padrão.',
  ],
};

export const devPacLock: MicroLesson = {
  ...S,
  id: 'dev.pacotes.3',
  series: { id: 'dev.pacotes', order: 3 },
  title: 'package.json e lockfile',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O mesmo commit gera builds diferentes em máquinas diferentes. O que pode estar faltando?',
    options: [
      { text: 'Versionar o lockfile e instalar por ele', why: 'Isso. Esta aula mostra o package.json, o lockfile e o npm ci.' },
      { text: 'Um computador mais rápido', why: 'A velocidade não muda as versões instaladas.' },
      { text: 'Apagar o package.json', why: 'Sem ele, não há nem lista de dependências.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'packagejson',
      part: 'package.json',
      title: 'As seções do package.json',
      art: 'dados',
      goal: 'Distinguir dependencies, devDependencies, peerDependencies e scripts.',
      explain:
        'O `package.json` descreve o projeto:\n\n- `dependencies`: necessárias **em produção**;\n- `devDependencies`: só para **desenvolver, testar e construir** (compilador, testes, linters);\n- `peerDependencies`: o pacote espera que o **projeto hospedeiro** forneça (comum em plugins de React);\n- `scripts`: comandos rodados com `npm run nome` (`npm test` e `npm start` dispensam o `run`).',
      check: {
        kind: 'choice',
        id: 'pj-c',
        prompt: 'O TypeScript, usado só para compilar, deve ficar em:',
        options: [
          { text: 'devDependencies', why: 'Isso: só no desenvolvimento e no build.' },
          { text: 'dependencies', why: 'Não é preciso em produção.' },
          { text: 'peerDependencies', why: 'peer é para o hospedeiro fornecer.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Numa **obra**: os **tijolos** ficam na casa pronta (dependencies); os **andaimes** só servem para construir e vão embora (devDependencies). O TypeScript é andaime: depois do build, sobra só o JavaScript.',
        check: {
          kind: 'choice',
          id: 'pj-r',
          prompt: 'Qual comando roda o script "build" do package.json?',
          options: [
            { text: 'npm run build', why: 'Isso.' },
            { text: 'npm build install', why: 'O comando é npm run build.' },
            { text: 'npm test build', why: 'npm test roda o script test.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'lockfile',
      part: 'Lockfile',
      title: 'Travar a árvore inteira',
      art: 'cadeado',
      goal: 'Saber o que o lockfile guarda e que deve ser versionado.',
      explain:
        'O **lockfile** (`package-lock.json` no npm; `yarn.lock` e `pnpm-lock.yaml` em outras ferramentas) registra a versão **exata** de **toda a árvore**, incluindo as dependências **transitivas**, com **hashes de integridade**.\n\n- Ele **deve ser versionado** no Git, para todos instalarem o mesmo;\n- a pasta `node_modules` **não** vai para o repositório.',
      check: {
        kind: 'choice',
        id: 'lk-c',
        prompt: 'O que vai para o Git?',
        options: [
          { text: 'O lockfile, mas não o node_modules', why: 'Isso.' },
          { text: 'O node_modules, mas não o lockfile', why: 'É o inverso.' },
          { text: 'Nenhum dos dois', why: 'O lockfile deve ser versionado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O lockfile é a **receita exata**, com a marca de cada ingrediente; o node_modules é o **bolo pronto**. Guarda-se a **receita** no arquivo (pequena, precisa); o bolo cada um faz na sua cozinha.',
        check: {
          kind: 'choice',
          id: 'lk-r',
          prompt: 'Dependências transitivas são:',
          options: [
            { text: 'As dependências das dependências', why: 'Isso.' },
            { text: 'Só as declaradas no package.json', why: 'Essas são as diretas.' },
            { text: 'As que nunca são instaladas', why: 'São instaladas, indiretamente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'npmci',
      part: 'Integração contínua',
      title: 'npm ci e outros comandos',
      art: 'engrenagem',
      goal: 'Usar npm ci na integração contínua e reconhecer outros comandos.',
      explain:
        'Na **integração contínua**, use `npm ci`:\n\n- instala **estritamente pelo lockfile**;\n- **apaga o node_modules** antes;\n- **falha** se lockfile e package.json estiverem inconsistentes.\n\nOutros comandos: `npm install pacote`, `npm install -D pacote` (de desenvolvimento), `npm update`, `npm outdated`, `npm audit` (vulnerabilidades conhecidas) e `npx ferramenta` (roda sem instalar globalmente).',
      check: {
        kind: 'choice',
        id: 'ci-c',
        prompt: 'Builds diferentes em máquinas diferentes, por versões transitivas. A medida mais adequada:',
        options: [
          { text: 'Versionar o package-lock.json e usar npm ci na integração contínua', why: 'Isso.' },
          { text: 'Trocar todos os intervalos por *', why: 'Pioraria: aceitaria qualquer versão.' },
          { text: 'Apagar o lockfile antes de cada build', why: 'É o contrário: o lockfile garante a igualdade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O `npm install` é um **cozinheiro criativo**: segue a receita, mas pode trocar um ingrediente por um mais novo. O `npm ci` é o **cozinheiro de laboratório**: usa **exatamente** o que o lockfile manda, ou para.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'Qual comando aponta vulnerabilidades conhecidas nas dependências?',
          options: [
            { text: 'npm audit', why: 'Isso.' },
            { text: 'npm outdated', why: 'Mostra versões desatualizadas, não vulnerabilidades.' },
            { text: 'npx', why: 'npx roda ferramentas.' },
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
      prompt: 'Onde fica cada pacote?',
      categories: ['dependencies', 'devDependencies'],
      items: [
        { text: 'react', cat: 0, why: 'Usado em produção.' },
        { text: 'typescript', cat: 1, why: 'Só para compilar.' },
        { text: 'vitest', cat: 1, why: 'Só para testar.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['npm ci instala pelo lockfile', 'node_modules fora do Git', 'Lockfile fora do Git'],
      bug: 2,
      why: 'O lockfile deve ser versionado.',
      fixed: 'Lockfile no Git',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual comando usar no pipeline de integração contínua?',
      scenarios: [
        { title: 'Opção A', body: '**npm ci**: estritamente pelo lockfile.' },
        { title: 'Opção B', body: '**npm update**: atualiza para as versões mais novas permitidas.' },
      ],
      answer: 0,
      why: 'Na integração contínua, quer-se o mesmo conjunto sempre; npm update mudaria as versões.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.011' }],
  summary: [
    'dependencies (produção), devDependencies (desenvolver e construir), peerDependencies (o hospedeiro fornece), scripts (npm run).',
    'Lockfile: versões exatas da árvore inteira, com hashes; versionar no Git. node_modules fica fora.',
    'npm ci: instala pelo lockfile, apaga node_modules, falha em inconsistência. npm audit: vulnerabilidades.',
  ],
};

export const devPacBuild: MicroLesson = {
  ...S,
  id: 'dev.pacotes.4',
  series: { id: 'dev.pacotes', order: 4 },
  title: 'pip, Maven e publicação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No Maven, ao rodar mvn package, os testes também rodam?',
    options: [
      { text: 'Sim: cada fase executa as anteriores do ciclo', why: 'Isso. Esta aula mostra o ciclo do Maven, o pip e a publicação.' },
      { text: 'Não: package só empacota', why: 'Pegadinha: package executa compile e test antes.' },
      { text: 'Só se pedir com outro comando', why: 'As fases anteriores rodam automaticamente.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'pip',
      part: 'Python',
      title: 'pip, requirements e wheel',
      art: 'teclado',
      goal: 'Reconhecer as peças de dependência e empacotamento em Python.',
      explain:
        'Em **Python**:\n\n- o `pip` instala pacotes do **PyPI**;\n- o `requirements.txt` lista dependências, geralmente fixadas com `==`; o operador `~=` indica versão compatível (`~=1.4.2` aceita de 1.4.2 até antes de 1.5);\n- o `pyproject.toml` é o arquivo moderno de configuração;\n- o empacotamento gera uma **wheel** (`.whl`, pronta) e uma **sdist** (código-fonte), com `python -m build`; a publicação no PyPI costuma usar o `twine`.',
      check: {
        kind: 'choice',
        id: 'pi-c',
        prompt: 'Em requirements.txt, "~=1.4.2" aceita:',
        options: [
          { text: 'De 1.4.2 até antes de 1.5', why: 'Isso.' },
          { text: 'Só 1.4.2', why: 'Só a exata seria ==1.4.2.' },
          { text: 'Qualquer versão 1.x', why: 'O ~= segura em 1.4.x aqui.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O `~=` do pip é **primo do til do npm**: deixa subir só o **último número** que você escreveu. Escreveu 1.4.2? Pode ir até 1.4.9, mas não 1.5.',
        check: {
          kind: 'choice',
          id: 'pi-r',
          prompt: 'O que é uma wheel em Python?',
          options: [
            { text: 'Uma distribuição pronta do pacote (.whl)', why: 'Isso.' },
            { text: 'O código-fonte do pacote', why: 'O código-fonte é a sdist.' },
            { text: 'Um ambiente virtual', why: 'Ambiente virtual é o venv.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'maven',
      part: 'Java',
      title: 'Maven: coordenadas e ciclo de vida',
      art: 'degraus',
      goal: 'Ordenar as fases do Maven e saber o que cada uma faz.',
      explain:
        'O **Maven** declara dependências no `pom.xml` por **coordenadas**: groupId, artifactId e version. Baixa do **Maven Central** e guarda em `~/.m2`.\n\nO ciclo padrão: **validate**, **compile**, **test**, **package** (gera **JAR** ou **WAR**), **verify**, **install** (repositório **local**) e **deploy** (repositório **remoto**).\n\nExecutar uma fase executa **todas as anteriores**. Versões `-SNAPSHOT` estão em desenvolvimento. O **Gradle** é a principal alternativa.',
      check: {
        kind: 'choice',
        id: 'mv-c',
        prompt: 'Depois de mvn package com sucesso, é correto afirmar que:',
        options: [
          { text: 'compile e test também rodaram, e foi gerado um JAR ou WAR', why: 'Isso.' },
          { text: 'o artefato foi enviado ao repositório remoto', why: 'Isso é o deploy, que vem depois.' },
          { text: 'os testes foram pulados', why: 'test é anterior a package e roda junto.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O ciclo do Maven é uma **escada**: para chegar ao degrau **package**, você pisa em **validate, compile e test**. **install** guarda o artefato **na sua estante** (local); **deploy** manda para a **biblioteca central** (remota).',
        check: {
          kind: 'order',
          id: 'mv-r',
          prompt: 'Ordene as fases do ciclo padrão.',
          items: ['compile', 'test', 'package', 'install', 'deploy'],
          why: 'Compilar, testar, empacotar, guardar local, enviar remoto.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'publicar',
      part: 'Publicação',
      title: 'Publicar e proteger a cadeia',
      art: 'cadeado',
      goal: 'Publicar uma versão e aplicar cuidados de cadeia de suprimentos.',
      explain:
        'Para publicar no npm: `npm version minor` (1.4.0 → 1.5.0, com commit e tag) e `npm publish`. Uma versão publicada **não pode ser republicada** com o mesmo número.\n\nOrganizações usam **registros privados** (Nexus, Artifactory, GitHub Packages).\n\nCuidados de **cadeia de suprimentos**: travar com lockfile; revisar dependências novas; rodar `npm audit` ou `pip-audit`; desconfiar de nomes parecidos (*typosquatting*); gerar **SBOM** quando exigido; buscar builds **reprodutíveis**.',
      check: {
        kind: 'choice',
        id: 'pu-c',
        prompt: 'Uma versão 1.5.0 publicada tinha um defeito. Como corrigir no registro do npm?',
        options: [
          { text: 'Publicar uma nova versão, como 1.5.1', why: 'Isso: o mesmo número não pode ser republicado.' },
          { text: 'Republicar a 1.5.0 corrigida', why: 'O npm não permite republicar o mesmo número.' },
          { text: 'Apagar o package.json', why: 'Não resolve; é preciso nova versão.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Uma versão publicada é como um **Diário Oficial impresso**: não se reimprime a mesma edição com outro texto. Publica-se uma **retificação**, com número novo. No npm, a correção vira 1.5.1.',
        check: {
          kind: 'choice',
          id: 'pu-r',
          prompt: 'Typosquatting é:',
          options: [
            { text: 'Publicar pacote com nome parecido com um popular para enganar', why: 'Isso.' },
            { text: 'Um erro de digitação no código', why: 'É uma tática de ataque com nomes parecidos.' },
            { text: 'Um formato de lockfile', why: 'É uma ameaça à cadeia de suprimentos.' },
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
      prompt: 'Cada item é do ecossistema Python ou Java?',
      categories: ['Python', 'Java'],
      items: [
        { text: 'requirements.txt', cat: 0, why: 'Lista do pip.' },
        { text: 'wheel (.whl)', cat: 0, why: 'Distribuição Python.' },
        { text: 'pom.xml', cat: 1, why: 'Maven.' },
        { text: 'JAR ou WAR', cat: 1, why: 'Artefatos Java.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['install: repositório local', 'deploy: repositório remoto', 'package: não executa os testes'],
      bug: 2,
      why: 'package executa as fases anteriores, inclusive test.',
      fixed: 'package: executa compile e test antes',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A equipe quer instalar um pacote novo chamado "reactt", sugerido por um site. O que fazer?',
      scenarios: [
        { title: 'Opção A', body: 'Desconfiar: pode ser **typosquatting**; conferir o nome oficial e rodar **npm audit**.' },
        { title: 'Opção B', body: 'Instalar logo, já que o nome é parecido com o do React.' },
      ],
      answer: 0,
      why: 'Nomes parecidos com pacotes populares são um golpe conhecido na cadeia de suprimentos.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.04.012' }],
  summary: [
    'Python: pip e PyPI; requirements.txt (== e ~=); pyproject.toml; wheel e sdist com python -m build; twine publica.',
    'Maven: pom.xml com groupId, artifactId, version; validate, compile, test, package (JAR/WAR), verify, install (local), deploy (remoto); cada fase roda as anteriores.',
    'npm version e npm publish; não se republica o mesmo número. Cadeia: lockfile, revisão, audit, typosquatting, SBOM, builds reprodutíveis.',
  ],
};
