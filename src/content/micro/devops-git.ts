// Série "Git e versionamento" (cap.devops.01, trecho git), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do SCCS ao Git e ao GitHub; as seguintes ensinam as três áreas e
// os comandos, as estratégias de branching, e pull requests com cuidados de segurança, uma ideia por
// etapa. Fatos conferidos com o texto do capítulo (01-git.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.devops.01', sectionId: 'git' } as const;

export const dvGitHistoria: MicroLesson = {
  ...S,
  id: 'devops.git.1',
  series: { id: 'devops.git', order: 1 },
  title: 'Do SCCS ao Git',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Duas pessoas editam o mesmo arquivo de código ao mesmo tempo. Sem uma ferramenta, o que costuma acontecer?',
    options: [
      { text: 'Uma sobrescreve o trabalho da outra', why: 'Isso. Esta aula conta como o controle de versão resolveu esse problema.' },
      { text: 'O computador junta tudo sozinho', why: 'Sem ferramenta de versão, não há quem junte as mudanças.' },
      { text: 'Nada; arquivos não mudam', why: 'Mudam, e o trabalho de um pode apagar o do outro.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'centralizados',
      part: 'A história',
      title: '1972 a 2000: os sistemas centralizados',
      art: 'livro',
      goal: 'Conhecer os primeiros sistemas de controle de versão.',
      explain:
        'Em **1972**, nos laboratórios Bell, surgiu o **SCCS**, um dos primeiros sistemas de **controle de versão**: guardava o histórico de cada arquivo.\n\nVieram depois o **RCS** (1982), o **CVS** (1990) e o **Subversion** (2000).\n\nNesses sistemas, o histórico ficava num **servidor central**. Sem conexão com ele, não se registrava nada.',
      check: {
        kind: 'choice',
        id: 'ce-c',
        prompt: 'Nos sistemas como CVS e Subversion, onde ficava o histórico?',
        options: [
          { text: 'Num servidor central', why: 'Isso.' },
          { text: 'Em cada cópia, completo', why: 'Isso é o modelo distribuído, como o Git.' },
          { text: 'Em nenhum lugar', why: 'Guardar o histórico é o objetivo do controle de versão.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cartório**: o livro de registros fica **num lugar só**. Para registrar algo, é preciso **ir até lá**. Os sistemas centralizados eram esse cartório; o Git, como você verá, dá **uma cópia do livro inteiro** a cada um.',
        check: {
          kind: 'choice',
          id: 'ce-r',
          prompt: 'Qual destes veio primeiro?',
          options: [
            { text: 'SCCS (1972)', why: 'Isso.' },
            { text: 'Subversion (2000)', why: 'O Subversion é de 2000.' },
            { text: 'Git (2005)', why: 'O Git é de 2005.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'git',
      part: 'A história',
      title: '2005: Linus Torvalds cria o Git',
      art: 'rede',
      goal: 'Saber por que e quando o Git foi criado.',
      explain:
        'O núcleo do **Linux** usava uma ferramenta comercial, o **BitKeeper**. Em **2005**, a licença gratuita foi retirada.\n\nEm poucas semanas, **Linus Torvalds**, criador do Linux, escreveu o **Git**: um sistema **distribuído**, em que **cada clone tem o histórico completo**.\n\nCom o Git, dá para fazer **commits sem conexão** com servidor nenhum.',
      check: {
        kind: 'choice',
        id: 'gi-c',
        prompt: 'O Git é distribuído. O que isso significa?',
        options: [
          { text: 'Cada clone tem o histórico completo', why: 'Isso.' },
          { text: 'Precisa de conexão permanente com o servidor', why: 'Pegadinha: dá para fazer commits sem conexão.' },
          { text: 'Só funciona em Linux', why: 'Funciona em vários sistemas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No Git, cada um leva **o livro de registros inteiro** para casa. Registra o que quiser, **mesmo sem internet**, e depois **sincroniza** com os colegas. Ninguém depende de ir ao cartório para trabalhar.',
        check: {
          kind: 'choice',
          id: 'gi-r',
          prompt: 'Quem criou o Git?',
          options: [
            { text: 'Linus Torvalds', why: 'Isso, em 2005.' },
            { text: 'Kent Beck', why: 'Kent Beck é do XP.' },
            { text: 'Tim Berners-Lee', why: 'Ele criou a Web.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'github',
      part: 'A história',
      title: '2008 e 2010: GitHub e Git Flow',
      art: 'professores',
      goal: 'Saber de onde vêm o GitHub, os pull requests e o Git Flow.',
      explain:
        'Em **2008**, foi lançado o **GitHub**, que hospeda repositórios Git e popularizou o **pull request**: pedir para integrar um branch, com discussão e revisão.\n\nEm **2010**, **Vincent Driessen** publicou um texto descrevendo o **Git Flow**, uma estratégia com branches `main`, `develop`, `feature`, `release` e `hotfix`.\n\nDepois vieram estratégias mais leves, como o **trunk-based** e o **GitHub Flow**.',
      check: {
        kind: 'order',
        id: 'gh-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['SCCS (1972)', 'Subversion (2000)', 'Git (2005)', 'GitHub (2008)', 'Git Flow (2010)'],
        why: 'Do controle centralizado ao Git e às estratégias de branching.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **Git** é a ferramenta; o **GitHub** é um **lugar** onde os repositórios Git ficam guardados e onde a equipe conversa sobre as mudanças. O **pull request** é o "pedido de despacho" para integrar um trabalho.',
        check: {
          kind: 'choice',
          id: 'gh-r',
          prompt: 'Quem descreveu o Git Flow?',
          options: [
            { text: 'Vincent Driessen', why: 'Isso, em 2010.' },
            { text: 'Linus Torvalds', why: 'Torvalds criou o Git, não o Git Flow.' },
            { text: 'Martin Fowler', why: 'Fowler escreveu sobre integração contínua e refatoração.' },
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
      items: ['RCS (1982)', 'CVS (1990)', 'Git (2005)', 'GitHub (2008)'],
      why: 'Dos sistemas centralizados ao Git hospedado.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Centralizado ou distribuído?',
      categories: ['Centralizado', 'Distribuído'],
      items: [
        { text: 'CVS', cat: 0, why: 'Servidor central.' },
        { text: 'Subversion', cat: 0, why: 'Servidor central.' },
        { text: 'Git', cat: 1, why: 'Cada clone tem tudo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Git: criado por Linus Torvalds', 'GitHub popularizou o pull request', 'Git exige conexão para fazer commits'],
      bug: 2,
      why: 'O Git é distribuído: commits podem ser feitos sem conexão.',
      fixed: 'Git permite commits sem conexão',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1972: SCCS; depois RCS (1982), CVS (1990) e Subversion (2000), com histórico num servidor central.',
    '2005: Linus Torvalds cria o Git, distribuído: cada clone tem o histórico completo.',
    '2008: GitHub e o pull request. 2010: Vincent Driessen descreve o Git Flow.',
  ],
};

export const dvGitComandos: MicroLesson = {
  ...S,
  id: 'devops.git.2',
  series: { id: 'devops.git', order: 2 },
  title: 'As três áreas e os comandos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O git fetch altera os arquivos do branch em que você está?',
    options: [
      { text: 'Não: só baixa as novidades do remoto', why: 'Isso. Esta aula mostra as áreas e os comandos.' },
      { text: 'Sim, sempre', why: 'Pegadinha: quem integra é o merge ou o pull.' },
      { text: 'Só se houver conflito', why: 'O fetch nunca altera os arquivos do branch atual.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'areas',
      part: 'As áreas',
      title: 'Trabalho, preparação e repositório',
      art: 'dados',
      goal: 'Seguir uma mudança pelas três áreas do Git.',
      explain:
        '- **Diretório de trabalho**: os arquivos como estão no disco;\n- **área de preparação** (*staging*, *index*): o que vai entrar no próximo commit;\n- **repositório** (`.git`): o histórico de commits.\n\n```bash\ngit add src/filtro.ts\ngit commit -m "Filtra contratos por fornecedor"\ngit push -u origin feature/filtro\n```\n\n`add` leva à preparação; `commit` grava no histórico; `push` envia ao remoto.',
      check: {
        kind: 'order',
        id: 'ar-c',
        prompt: 'Ordene o caminho de uma mudança.',
        items: ['Editar o arquivo', 'git add', 'git commit', 'git push'],
        why: 'Trabalho, preparação, histórico local e remoto.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **enviar uma carta**: você **escreve** (diretório de trabalho), **põe no envelope** o que vai mandar (add, preparação), **lacra** (commit, histórico) e **leva aos Correios** (push, remoto).',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'O que o git add faz?',
          options: [
            { text: 'Prepara a alteração para o próximo commit', why: 'Isso.' },
            { text: 'Envia ao servidor', why: 'Isso é o push.' },
            { text: 'Cria um branch', why: 'Isso é o git switch -c ou o git branch.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'remoto',
      part: 'Comandos',
      title: 'fetch, pull, merge e rebase',
      art: 'rede',
      goal: 'Distinguir fetch, pull, merge e rebase.',
      explain:
        '- `git fetch`: **baixa** as novidades do remoto **sem** alterar o branch atual;\n- `git pull`: `fetch` **seguido de integração** (merge ou rebase);\n- `git merge`: integra outro branch, podendo criar um commit de merge;\n- `git rebase`: reaplica os commits sobre outra base, deixando o histórico **linear**. Ele **reescreve** o histórico: **não se faz em branch compartilhado**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Qual comando baixa os commits novos do remoto sem alterar os arquivos do branch atual?',
        options: [
          { text: 'git fetch', why: 'Isso.' },
          { text: 'git pull', why: 'O pull também integra, alterando o branch.' },
          { text: 'git push', why: 'O push envia, não baixa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **fetch** é **buscar a correspondência na caixa postal** e deixá-la na mesa, sem abrir. O **pull** é buscar **e já arquivar** nas pastas. O **rebase** é **reescrever a ordem** dos registros: perigoso se outros já usam aquele arquivo.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Por que não fazer rebase em branch compartilhado?',
          options: [
            { text: 'Porque reescreve o histórico que outros já têm', why: 'Isso.' },
            { text: 'Porque apaga o repositório', why: 'Não apaga; reescreve o histórico.' },
            { text: 'Porque é lento', why: 'O problema é reescrever o histórico.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'desfazer',
      part: 'Comandos',
      title: 'revert, reset, stash, cherry-pick, tag',
      art: 'revisao',
      goal: 'Escolher o comando certo para desfazer ou guardar mudanças.',
      explain:
        '- `git revert`: cria um **novo commit** que desfaz outro, **preservando** o histórico. **Seguro** em branch compartilhado;\n- `git reset`: move o ponteiro do branch; `--hard` **descarta** alterações locais;\n- `git stash`: **guarda** alterações não confirmadas, temporariamente;\n- `git cherry-pick`: aplica **um commit específico** em outro branch;\n- `git tag`: **marca** uma versão, como `v1.4.0`.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'Um commit com defeito já está na main compartilhada. A forma mais segura de desfazê-lo é:',
        options: [
          { text: 'git revert, gerando um commit que o desfaz', why: 'Isso: preserva o histórico.' },
          { text: 'git reset --hard e push forçado', why: 'Reescreve o histórico compartilhado: arriscado.' },
          { text: 'git rebase', why: 'Rebase também reescreve o histórico.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'No **Diário Oficial**, não se arranca a página errada: publica-se uma **retificação**. O `revert` é essa retificação: um commit novo que anula o anterior, e todos veem o que aconteceu.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Para guardar mudanças inacabadas e trocar de branch rapidamente, usa-se:',
          options: [
            { text: 'git stash', why: 'Isso.' },
            { text: 'git tag', why: 'tag marca versões.' },
            { text: 'git cherry-pick', why: 'cherry-pick aplica um commit específico.' },
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
      prompt: 'O comando reescreve o histórico ou o preserva?',
      categories: ['Preserva', 'Reescreve'],
      items: [
        { text: 'git revert', cat: 0, why: 'Commit novo.' },
        { text: 'git merge', cat: 0, why: 'Integra sem reescrever.' },
        { text: 'git rebase', cat: 1, why: 'Reaplica commits.' },
        { text: 'git reset --hard em branch publicado', cat: 1, why: 'Move o ponteiro e descarta.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['pull: fetch e integração', 'tag: marca uma versão', 'fetch: altera os arquivos do branch atual'],
      bug: 2,
      why: 'O fetch só baixa; quem integra é o merge ou o pull.',
      fixed: 'fetch: só baixa as novidades',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma correção feita no branch de release precisa ir também para a main, sem trazer o resto. O que usar?',
      scenarios: [
        { title: 'Opção A', body: '**git cherry-pick** do commit da correção.' },
        { title: 'Opção B', body: '**git merge** do branch de release inteiro.' },
      ],
      answer: 0,
      why: 'O cherry-pick aplica só o commit escolhido.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.002' },
  ],
  summary: [
    'Diretório de trabalho → add (preparação) → commit (repositório) → push (remoto).',
    'fetch baixa sem alterar; pull = fetch + integração; merge integra; rebase reescreve (não em branch compartilhado).',
    'revert desfaz com commit novo (seguro); reset move o ponteiro; stash guarda; cherry-pick aplica um commit; tag marca versão.',
  ],
};

export const dvGitBranches: MicroLesson = {
  ...S,
  id: 'devops.git.3',
  series: { id: 'devops.git', order: 3 },
  title: 'Estratégias de branching',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma equipe integra na main várias vezes ao dia e esconde o que está inacabado atrás de chaves de configuração. Que estratégia é essa?',
    options: [
      { text: 'Trunk-based com feature flags', why: 'Isso. Esta aula compara as estratégias.' },
      { text: 'Git Flow', why: 'O Git Flow tem branches de longa duração.' },
      { text: 'Nenhuma', why: 'É o trunk-based development.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'gitflow',
      part: 'Estratégias',
      title: 'Git Flow',
      art: 'trilha',
      goal: 'Conhecer os branches do Git Flow.',
      explain:
        'No **Git Flow**:\n\n- `main` (produção) e `develop` (integração) são **de longa duração**;\n- `feature/*`: cada funcionalidade nova, a partir de develop;\n- `release/*`: preparar uma versão;\n- `hotfix/*`: **correção urgente** em produção, criada **a partir da main** e integrada **na main e na develop**.\n\nCombina com **versões planejadas** e várias versões em manutenção.',
      check: {
        kind: 'choice',
        id: 'gf-c',
        prompt: 'No Git Flow, a correção urgente de um defeito em produção é feita num branch:',
        options: [
          { text: 'hotfix, a partir da main, integrado na main e na develop', why: 'Isso.' },
          { text: 'feature, a partir da develop', why: 'feature é para funcionalidades novas.' },
          { text: 'release, sem voltar à develop', why: 'A correção urgente é hotfix, e volta também à develop.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **hospital**: o **pronto-socorro** (hotfix) atende a emergência **direto** e depois **avisa o prontuário geral** (develop), para que o problema não volte na próxima versão.',
        check: {
          kind: 'choice',
          id: 'gf-r',
          prompt: 'Quais branches do Git Flow são de longa duração?',
          options: [
            { text: 'main e develop', why: 'Isso.' },
            { text: 'feature e hotfix', why: 'Esses são temporários.' },
            { text: 'release e feature', why: 'Esses são temporários.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'trunk',
      part: 'Estratégias',
      title: 'Trunk-based e GitHub Flow',
      art: 'nuvem',
      goal: 'Reconhecer o trunk-based e o GitHub Flow.',
      explain:
        '- **Trunk-based development**: todos integram no **tronco** (main) **pelo menos diariamente**, com branches curtíssimos ou nenhum. Funcionalidades incompletas ficam escondidas por ***feature flags***. Combina com **integração e entrega contínuas**;\n- **GitHub Flow**: a `main` está **sempre implantável**; cada mudança vai num **branch curto** com **pull request**. Combina com aplicações web de implantação contínua.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'No trunk-based, as funcionalidades ficam semanas em branches separados?',
        options: [
          { text: 'Não: a integração é ao menos diária', why: 'Isso.' },
          { text: 'Sim, até ficarem prontas', why: 'Pegadinha: o trunk-based integra cedo e usa feature flags.' },
          { text: 'Sim, num branch develop', why: 'develop é do Git Flow.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No trunk-based, todos escrevem **no mesmo caderno** todo dia. O que ainda não está pronto fica com uma **tarja "não publicar"** (a feature flag): está no caderno, mas ninguém vê até tirar a tarja.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'Para que servem as feature flags?',
          options: [
            { text: 'Esconder funcionalidades incompletas que já estão no código', why: 'Isso.' },
            { text: 'Marcar versões', why: 'Isso é tag.' },
            { text: 'Proteger senhas', why: 'Senhas vão em cofres de segredos.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'escolha',
      part: 'Escolher',
      title: 'Qual estratégia para qual equipe',
      art: 'balanca',
      goal: 'Escolher a estratégia de acordo com o ritmo de publicação.',
      explain:
        'Resumo para escolher:\n\n- **versões planejadas**, várias em manutenção ao mesmo tempo: **Git Flow**;\n- **publicação frequente**, integração contínua forte: **trunk-based**;\n- **aplicação web** com main sempre pronta e PRs curtos: **GitHub Flow**.\n\nNão há estratégia proibida: o que importa é combinar com o jeito de entregar da equipe.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Um sistema com versões 2.x e 3.x mantidas ao mesmo tempo, lançadas em datas planejadas, combina mais com:',
        options: [
          { text: 'Git Flow', why: 'Isso.' },
          { text: 'Trunk-based sem branches', why: 'Manter várias versões pede branches de release.' },
          { text: 'Nenhuma estratégia', why: 'O Git Flow atende bem esse cenário.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: **com que frequência publicamos?** Poucas vezes, com datas e várias versões vivas: Git Flow. Muitas vezes por dia: trunk-based. Web com main sempre pronta e revisão por PR: GitHub Flow.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'No GitHub Flow, a main está:',
          options: [
            { text: 'Sempre implantável', why: 'Isso.' },
            { text: 'Sempre quebrada', why: 'É justamente o contrário.' },
            { text: 'Congelada para sempre', why: 'Recebe mudanças por PR.' },
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
      prompt: 'Qual estratégia cada característica indica?',
      categories: ['Git Flow', 'Trunk-based'],
      items: [
        { text: 'Branches develop, release e hotfix', cat: 0, why: 'Longa duração e tipos fixos.' },
        { text: 'Versões planejadas', cat: 0, why: 'Ciclos definidos.' },
        { text: 'Integração ao menos diária na main', cat: 1, why: 'Tronco único.' },
        { text: 'Feature flags para o inacabado', cat: 1, why: 'Esconde sem branch longo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Hotfix: a partir da main', 'Hotfix: volta à main e à develop', 'Trunk-based: branches de semanas'],
      bug: 2,
      why: 'No trunk-based, os branches são curtíssimos e a integração é ao menos diária.',
      fixed: 'Trunk-based: integração ao menos diária',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A equipe publica o portal várias vezes ao dia. Qual estratégia combina?',
      scenarios: [
        { title: 'Opção A', body: '**Trunk-based** com feature flags.' },
        { title: 'Opção B', body: '**Git Flow** com releases mensais.' },
      ],
      answer: 0,
      why: 'Publicação frequente pede integração contínua no tronco.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.004' },
  ],
  summary: [
    'Git Flow: main e develop de longa duração; feature, release e hotfix (da main, de volta à main e à develop).',
    'Trunk-based: integração ao menos diária no tronco, feature flags. GitHub Flow: main sempre implantável, PRs curtos.',
    'Escolha conforme o ritmo: versões planejadas (Git Flow), publicação frequente (trunk-based), web com PR (GitHub Flow).',
  ],
};

export const dvGitPr: MicroLesson = {
  ...S,
  id: 'devops.git.4',
  series: { id: 'devops.git', order: 4 },
  title: 'Pull requests e segredos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Alguém enviou a senha do banco ao repositório e apagou o arquivo no commit seguinte. Está resolvido?',
    options: [
      { text: 'Não: a senha continua no histórico e precisa ser trocada', why: 'Isso. Esta aula mostra pull requests e o cuidado com segredos.' },
      { text: 'Sim, o arquivo foi apagado', why: 'Pegadinha: o commit anterior ainda guarda a senha.' },
      { text: 'Sim, se ninguém olhou', why: 'Não há como garantir; a senha deve ser revogada.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'pr',
      part: 'Pull requests',
      title: 'Pedir para integrar, com revisão',
      art: 'pessoal',
      goal: 'Saber o que é um pull request e as boas práticas.',
      explain:
        'O **pull request** (GitHub) ou **merge request** (GitLab) é o pedido para integrar um branch em outro, com **discussão**, **revisão de código** e execução automática do **pipeline**.\n\nBoas práticas:\n\n- PRs **pequenos** e com descrição clara;\n- **squash** ou **merge**, conforme a convenção do projeto.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Merge request é o nome, no GitLab, do que no GitHub se chama:',
        options: [
          { text: 'Pull request', why: 'Isso.' },
          { text: 'Fetch', why: 'fetch é um comando do Git.' },
          { text: 'Tag', why: 'tag marca versões.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O PR é como **submeter uma minuta** ao chefe antes de publicar: ele **lê**, **comenta**, pede ajustes, e um **robô** confere a formatação (o pipeline). Minutas curtas são revisadas melhor.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Por que preferir PRs pequenos?',
          options: [
            { text: 'São revisados com mais atenção e menos risco', why: 'Isso.' },
            { text: 'Porque o GitHub proíbe PRs grandes', why: 'Não proíbe; é boa prática.' },
            { text: 'Porque dispensam testes', why: 'Os testes continuam necessários.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'protecao',
      part: 'Proteção',
      title: 'Proteger a main',
      art: 'cadeado',
      goal: 'Configurar a proteção de branch e o CODEOWNERS.',
      explain:
        'Para que nada entre na main sem cuidado:\n\n- **proteção de branch**: proibir **push direto** na main, exigir **aprovação** e **pipeline verde**;\n- **CODEOWNERS**: indicar **revisores obrigatórios** por área do código.\n\nAssim, toda mudança passa por revisão e testes antes de chegar ao tronco.',
      check: {
        kind: 'choice',
        id: 'pt-c',
        prompt: 'Para impedir mudanças na main sem revisão e sem testes, a medida mais adequada é:',
        options: [
          { text: 'Proteger o branch, exigindo PR aprovado e pipeline verde', why: 'Isso.' },
          { text: 'Pedir por e-mail que ninguém faça push', why: 'Pedidos não impedem; a proteção impede.' },
          { text: 'Apagar a main toda semana', why: 'Não resolve e destrói o histórico.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'A proteção de branch é a **catraca** da portaria: não adianta pedir para não entrar sem crachá; a catraca **só abre** com crachá (aprovação) e **leitura ok** (pipeline verde). O CODEOWNERS diz **quem** pode liberar cada área.',
        check: {
          kind: 'choice',
          id: 'pt-r',
          prompt: 'O arquivo CODEOWNERS serve para:',
          options: [
            { text: 'Indicar revisores obrigatórios por área', why: 'Isso.' },
            { text: 'Guardar senhas', why: 'Senhas nunca vão ao repositório.' },
            { text: 'Listar dependências', why: 'Dependências vão no package.json e afins.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'segredos',
      part: 'Segredos',
      title: '.gitignore e senha vazada',
      art: 'vazio',
      goal: 'Prevenir e tratar segredos enviados ao repositório.',
      explain:
        'O arquivo **`.gitignore`** lista o que **não deve ser versionado**: dependências, artefatos de build e **arquivos de segredo**.\n\nSe uma senha for enviada por engano, apagá-la no commit seguinte **não basta**: ela **continua no histórico**, e qualquer um com acesso ao repositório pode ver.\n\nA medida certa é **revogar e trocar** a senha.',
      check: {
        kind: 'choice',
        id: 'se-c',
        prompt: 'A senha do banco foi enviada e apagada no commit seguinte. O que fazer?',
        options: [
          { text: 'Revogar e trocar a senha, pois ela permanece no histórico', why: 'Isso.' },
          { text: 'Nada; já foi apagada', why: 'Pegadinha: ela continua nos commits anteriores.' },
          { text: 'Só acrescentar o arquivo ao .gitignore', why: 'Isso evita o próximo envio, mas não o que já vazou.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Se você **perdeu a chave de casa**, não adianta só prometer que não perde a próxima: é preciso **trocar a fechadura**. A senha vazada é a chave perdida; o `.gitignore` é a promessa para a próxima vez.',
        check: {
          kind: 'choice',
          id: 'se-r',
          prompt: 'O que deve ir no .gitignore?',
          options: [
            { text: 'Dependências, artefatos de build e arquivos de segredo', why: 'Isso.' },
            { text: 'O código-fonte principal', why: 'O código-fonte deve ser versionado.' },
            { text: 'O lockfile', why: 'O lockfile deve ser versionado.' },
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
      prompt: 'Versionar ou ignorar?',
      categories: ['Versionar', 'Ignorar (.gitignore)'],
      items: [
        { text: 'Código-fonte', cat: 0, why: 'É o que se controla.' },
        { text: 'Lockfile', cat: 0, why: 'Garante instalações iguais.' },
        { text: 'node_modules', cat: 1, why: 'Dependências instaladas.' },
        { text: 'Arquivo .env com senhas', cat: 1, why: 'Segredo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Proteger a main: PR aprovado e pipeline verde', 'CODEOWNERS: revisores por área', 'Senha apagada no commit seguinte: resolvido'],
      bug: 2,
      why: 'A senha continua no histórico; é preciso revogá-la e trocá-la.',
      fixed: 'Senha vazada: revogar e trocar',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um estagiário fez push direto na main e quebrou a produção. Qual medida evita a repetição?',
      scenarios: [
        { title: 'Opção A', body: '**Proteção de branch**: sem push direto, com PR aprovado e pipeline verde.' },
        { title: 'Opção B', body: 'Proibir estagiários de usar o Git.' },
      ],
      answer: 0,
      why: 'A proteção vale para todos e garante revisão e testes antes da main.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.006' },
  ],
  summary: [
    'Pull request (GitHub) ou merge request (GitLab): integrar com discussão, revisão e pipeline. PRs pequenos.',
    'Proteção de branch: sem push direto, com aprovação e pipeline verde. CODEOWNERS: revisores obrigatórios.',
    '.gitignore para dependências, build e segredos. Senha enviada por engano: revogar e trocar.',
  ],
};
