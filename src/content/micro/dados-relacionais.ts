// Série "Bancos relacionais: PostgreSQL e Oracle" (cap.dados.02, trecho relacionais), no ritmo lento
// com história pedido em 25/10/2026: a primeira aula conta de onde vieram os dois produtos; as
// seguintes ensinam os conceitos do PostgreSQL e depois os do Oracle e as rotinas de administração,
// uma ideia por etapa. Fatos conferidos com o texto do capítulo (01-relacionais.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dados.02', sectionId: 'relacionais' } as const;

export const dadosRelHistoria: MicroLesson = {
  ...S,
  id: 'dados.relacionais.1',
  series: { id: 'dados.relacionais', order: 1 },
  title: 'De onde vieram o PostgreSQL e o Oracle',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O edital cita dois sistemas de banco relacional pelo nome. Um é gratuito e nasceu numa universidade; o outro é comercial. Você sabe quais?',
    options: [
      { text: 'PostgreSQL e Oracle Database', why: 'Isso. Esta aula conta a origem de cada um.' },
      { text: 'MongoDB e Redis', why: 'Esses são NoSQL, assunto do próximo trecho.' },
      { text: 'Excel e Word', why: 'Não são sistemas de banco de dados.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'oracle',
      part: 'A história',
      title: '1977 a 1979: o Oracle',
      art: 'calendario',
      goal: 'Saber que o Oracle foi um dos primeiros bancos SQL comerciais.',
      explain:
        'Em **1970**, Edgar Codd, na IBM, propôs o **modelo relacional**, e a IBM começou a pesquisar um sistema com a linguagem que viraria o SQL.\n\nEm **1977**, **Larry Ellison**, **Bob Miner** e **Ed Oates** fundaram uma pequena empresa nos Estados Unidos. Em **1979**, ela lançou o **Oracle**, um dos **primeiros bancos relacionais com SQL vendidos comercialmente**.\n\nO produto fez tanto sucesso que a empresa passou a se chamar **Oracle**.',
      check: {
        kind: 'choice',
        id: 'or-c',
        prompt: 'O que o Oracle tinha de marcante em 1979?',
        options: [
          { text: 'Foi um dos primeiros bancos relacionais com SQL vendidos comercialmente', why: 'Isso.' },
          { text: 'Foi o primeiro banco NoSQL', why: 'O Oracle é relacional; o NoSQL vem décadas depois.' },
          { text: 'Foi criado numa universidade, de graça', why: 'Esse é o caminho do PostgreSQL.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Codd desenhou a **receita** (o modelo relacional, 1970). Uma empresa pequena, de Ellison, Miner e Oates, foi das primeiras a **abrir a padaria** e **vender o pão**: o Oracle, em 1979.',
        check: {
          kind: 'choice',
          id: 'or-r',
          prompt: 'Quem propôs o modelo relacional em 1970?',
          options: [
            { text: 'Edgar Codd, na IBM', why: 'Isso.' },
            { text: 'Larry Ellison', why: 'Ellison fundou a empresa que fez o Oracle.' },
            { text: 'Tim Berners-Lee', why: 'Ele criou a Web.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'postgres',
      part: 'A história',
      title: '1986 a 1996: o PostgreSQL',
      art: 'livro',
      goal: 'Saber que o PostgreSQL nasceu na Universidade da Califórnia em Berkeley.',
      explain:
        'Na **Universidade da Califórnia em Berkeley**, o professor **Michael Stonebraker** liderou nos anos 1970 o banco **Ingres**.\n\nEm **1986**, ele começou um sucessor, o projeto **Postgres** ("depois do Ingres").\n\nEm **1994**, dois alunos acrescentaram o **SQL**, e o sistema virou **Postgres95**. Em **1996**, ganhou o nome definitivo: **PostgreSQL**, mantido até hoje por uma comunidade, com código aberto e gratuito.',
      check: {
        kind: 'order',
        id: 'pg-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Ingres, em Berkeley (anos 1970)', 'Projeto Postgres (1986)', 'Postgres95, já com SQL (1994)', 'Nome PostgreSQL (1996)'],
        why: 'Do Ingres ao nome que ficou.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O nome conta a história: **Post-gres** é "o que veio **depois do Ingres**", e o **SQL** no fim lembra que, em 1994, ele aprendeu a falar SQL. Tudo começou numa **universidade**, Berkeley.',
        check: {
          kind: 'choice',
          id: 'pg-r',
          prompt: 'O que o nome "Postgres" quer dizer?',
          options: [
            { text: 'O sucessor do Ingres', why: 'Isso: "post-Ingres".' },
            { text: 'Um banco dos correios', why: 'O nome vem de "depois do Ingres".' },
            { text: 'Uma versão do Oracle', why: 'São projetos independentes.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'hoje',
      part: 'Hoje',
      title: 'Por que os dois caem na prova',
      art: 'balanca',
      goal: 'Situar PostgreSQL e Oracle no uso atual.',
      explain:
        'Os dois são **SGBDs relacionais** e seguem o **SQL**, mas têm origens diferentes:\n\n- **Oracle**: **comercial**, com licença paga, muito usado em governos e grandes empresas;\n- **PostgreSQL**: **código aberto** e gratuito, com **extensões** como o pgvector e o PostGIS.\n\nO edital cita a "**administração e otimização de PostgreSQL e Oracle Database**". Nas próximas aulas, você verá os conceitos de cada um.',
      check: {
        kind: 'choice',
        id: 'ho-c',
        prompt: 'Qual dos dois é de código aberto e gratuito?',
        options: [
          { text: 'PostgreSQL', why: 'Isso.' },
          { text: 'Oracle Database', why: 'O Oracle é comercial, com licença paga.' },
          { text: 'Nenhum dos dois', why: 'O PostgreSQL é aberto e gratuito.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **dois carros**: um de **concessionária**, com contrato e assistência paga (o **Oracle**); outro montado por um **clube de entusiastas**, que qualquer um pode usar e melhorar (o **PostgreSQL**). Os dois andam pela mesma estrada: o SQL.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'O que PostgreSQL e Oracle têm em comum?',
          options: [
            { text: 'São relacionais e usam SQL', why: 'Isso.' },
            { text: 'São ambos NoSQL', why: 'Os dois são relacionais.' },
            { text: 'Têm o mesmo dono', why: 'Um é de uma empresa, o outro de uma comunidade.' },
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
      prompt: 'Cada fato é do PostgreSQL ou do Oracle?',
      categories: ['PostgreSQL', 'Oracle'],
      items: [
        { text: 'Nasceu em Berkeley', cat: 0, why: 'Projeto de Stonebraker, na universidade.' },
        { text: 'Código aberto e gratuito', cat: 0, why: 'Mantido por uma comunidade.' },
        { text: 'Lançado em 1979 por uma empresa', cat: 1, why: 'A empresa de Ellison, Miner e Oates.' },
        { text: 'Licença comercial paga', cat: 1, why: 'É um produto comercial.' },
      ],
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene os marcos.',
      items: ['Modelo relacional de Codd (1970)', 'Lançamento do Oracle (1979)', 'Projeto Postgres (1986)', 'Nome PostgreSQL (1996)'],
      why: 'Primeiro a teoria, depois os produtos.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Postgres: sucessor do Ingres', 'Postgres95: ganhou o SQL', 'PostgreSQL: produto comercial da Oracle'],
      bug: 2,
      why: 'O PostgreSQL é aberto, mantido por uma comunidade; não pertence à Oracle.',
      fixed: 'PostgreSQL: código aberto, mantido por uma comunidade',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    '1970: Codd propõe o modelo relacional; 1979: o Oracle, um dos primeiros bancos SQL comerciais (Ellison, Miner e Oates).',
    'Berkeley: Ingres (anos 1970), Postgres (1986), Postgres95 com SQL (1994), PostgreSQL (1996).',
    'Oracle: comercial. PostgreSQL: código aberto, com extensões como pgvector e PostGIS.',
  ],
};

export const dadosRelPostgres: MicroLesson = {
  ...S,
  id: 'dados.relacionais.2',
  series: { id: 'dados.relacionais', order: 2 },
  title: 'PostgreSQL por dentro',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Alguém está lendo uma tabela enquanto outra pessoa altera uma linha dela. No PostgreSQL, quem lê precisa esperar?',
    options: [
      { text: 'Não: quem lê vê a versão anterior da linha', why: 'Isso. Esta aula explica esse mecanismo, o MVCC.' },
      { text: 'Sim, sempre fica bloqueado', why: 'No PostgreSQL, leitores não bloqueiam escritores, nem o contrário.' },
      { text: 'A leitura dá erro', why: 'Não dá erro: lê-se a versão anterior.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'mvcc',
      part: 'Concorrência',
      title: 'MVCC e VACUUM',
      art: 'engrenagem',
      goal: 'Entender o MVCC e por que existe o VACUUM.',
      explain:
        'O PostgreSQL usa o **MVCC**, controle de concorrência por **múltiplas versões**:\n\n- cada **atualização cria uma nova versão** da linha;\n- quem estava lendo continua vendo a **versão anterior**, sem bloqueio.\n\nO preço: as versões antigas, as "**tuplas mortas**", ocupam espaço. O **VACUUM** recupera esse espaço, e o **autovacuum** faz isso sozinho.\n\nJá o **ANALYZE** atualiza as **estatísticas** que o otimizador usa para escolher o plano.',
      check: {
        kind: 'choice',
        id: 'mv-c',
        prompt: 'O que o VACUUM faz?',
        options: [
          { text: 'Recupera o espaço das versões que ninguém mais enxerga', why: 'Isso.' },
          { text: 'Apaga dados válidos antigos', why: 'Pegadinha: só recupera versões já invisíveis para todas as transações.' },
          { text: 'Atualiza as estatísticas do otimizador', why: 'Isso é o ANALYZE.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Num **quadro de avisos**, em vez de apagar o aviso antigo, cola-se um **novo por cima**: quem já estava lendo termina de ler o antigo. De vez em quando, alguém **tira os papéis velhos** que ninguém mais lê. Esse alguém é o **VACUUM**.',
        check: {
          kind: 'choice',
          id: 'mv-r',
          prompt: 'Qual comando atualiza as estatísticas usadas pelo otimizador?',
          options: [
            { text: 'ANALYZE', why: 'Isso.' },
            { text: 'VACUUM', why: 'VACUUM recupera espaço.' },
            { text: 'GRANT', why: 'GRANT concede permissões.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'wal',
      part: 'Durabilidade',
      title: 'O WAL e as peças do banco',
      art: 'dados',
      goal: 'Saber o que é o WAL e o que são schemas e extensões.',
      explain:
        'O **WAL** (*Write-Ahead Log*) é um registro em que **toda alteração é gravada antes** de ir para os arquivos de dados.\n\nSe o servidor cair no meio, o WAL permite **refazer** o que foi confirmado. Ele também é a base da **replicação** e da **recuperação**.\n\nOutras peças: **schemas** são espaços de nomes dentro de um banco (como `public`); **extensões** acrescentam recursos, como **pgvector** (vetores) e **PostGIS** (mapas).',
      check: {
        kind: 'choice',
        id: 'wa-c',
        prompt: 'No PostgreSQL, o WAL é:',
        options: [
          { text: 'O registro em que as alterações são gravadas antes dos arquivos de dados', why: 'Isso.' },
          { text: 'Uma extensão para dados geográficos', why: 'Essa é o PostGIS.' },
          { text: 'Um espaço de nomes dentro do banco', why: 'Isso é um schema.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Antes de mexer no **livro-caixa**, o contador anota cada lançamento num **caderno de rascunho numerado**. Se a luz cair, ele refaz tudo pelo caderno. O WAL é esse caderno: **primeiro o registro, depois os dados**.',
        check: {
          kind: 'choice',
          id: 'wa-r',
          prompt: 'Qual extensão do PostgreSQL guarda vetores para busca por similaridade?',
          options: [
            { text: 'pgvector', why: 'Isso.' },
            { text: 'PostGIS', why: 'PostGIS é para dados geográficos.' },
            { text: 'public', why: 'public é o schema padrão.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'backup',
      part: 'Backup e réplica',
      title: 'Backup lógico, físico e PITR',
      art: 'nuvem',
      goal: 'Distinguir pg_dump de pg_basebackup e saber o que é PITR.',
      explain:
        'Há dois tipos de backup:\n\n- **lógico**: `pg_dump` (um banco) e `pg_dumpall` (todo o servidor) geram comandos SQL, restaurados com `psql` ou `pg_restore`;\n- **físico**: `pg_basebackup` copia os arquivos do servidor.\n\nO físico, somado ao **arquivamento contínuo do WAL**, permite a **recuperação a um ponto no tempo** (**PITR**): voltar o banco ao estado exato de, por exemplo, 14h32.\n\nReplicação: **por streaming** (cópia idêntica) e **lógica** (tabelas escolhidas).',
      check: {
        kind: 'choice',
        id: 'bk-c',
        prompt: 'Para voltar o banco ao estado de 14h32, minutos antes de um DELETE acidental, usa-se:',
        options: [
          { text: 'Backup físico com arquivamento contínuo do WAL (PITR)', why: 'Isso.' },
          { text: 'Só o pg_dump da semana passada', why: 'Voltaria à semana passada, não às 14h32.' },
          { text: 'Uma réplica por streaming', why: 'A réplica recebe o DELETE também.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O backup físico é a **foto** do banco num dia. O WAL arquivado é o **filme** de tudo que aconteceu depois. Com a foto e o filme, você **para o filme em 14h32**: isso é o PITR.',
        check: {
          kind: 'choice',
          id: 'bk-r',
          prompt: 'Qual ferramenta faz backup lógico de um banco?',
          options: [
            { text: 'pg_dump', why: 'Isso.' },
            { text: 'pg_basebackup', why: 'Esse faz backup físico.' },
            { text: 'VACUUM', why: 'VACUUM recupera espaço.' },
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
      prompt: 'Para que serve cada item?',
      categories: ['Desempenho e espaço', 'Backup e recuperação'],
      items: [
        { text: 'VACUUM', cat: 0, why: 'Recupera espaço.' },
        { text: 'ANALYZE', cat: 0, why: 'Atualiza estatísticas do otimizador.' },
        { text: 'pg_dump', cat: 1, why: 'Backup lógico.' },
        { text: 'pg_basebackup com WAL arquivado', cat: 1, why: 'Backup físico e PITR.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['MVCC: cada atualização cria nova versão', 'Leitores não bloqueiam escritores', 'Replicação dispensa o backup'],
      bug: 2,
      why: 'A réplica copia também os erros, como um DELETE acidental.',
      fixed: 'Replicação não substitui backup',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O arquivo de dados do servidor corrompeu às 10h. Qual plano devolve o banco ao estado das 9h59?',
      scenarios: [
        { title: 'Opção A', body: '`pg_basebackup` de ontem mais o **WAL arquivado** até 9h59.' },
        { title: 'Opção B', body: 'Rodar `VACUUM` na tabela.' },
      ],
      answer: 0,
      why: 'Com o backup físico e o WAL, recupera-se até o ponto desejado. O VACUUM só libera espaço.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.002' },
  ],
  summary: [
    'MVCC: cada atualização cria nova versão; leitores não bloqueiam escritores.',
    'VACUUM (e autovacuum) recupera o espaço das tuplas mortas; ANALYZE atualiza estatísticas.',
    'WAL: alterações gravadas antes dos dados; base de durabilidade, replicação e recuperação.',
    'Backup lógico: pg_dump e pg_dumpall. Físico: pg_basebackup; com WAL arquivado, PITR.',
    'Replicação por streaming (física) e lógica (publicação e assinatura).',
  ],
};

export const dadosRelOracle: MicroLesson = {
  ...S,
  id: 'dados.relacionais.3',
  series: { id: 'dados.relacionais', order: 3 },
  title: 'Oracle e a rotina do administrador',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No Oracle, "instância" e "banco de dados" são a mesma coisa?',
    options: [
      { text: 'Não: a instância é processos e memória; o banco são os arquivos', why: 'Isso. Esta aula começa por essa diferença.' },
      { text: 'Sim, são sinônimos', why: 'No Oracle, são coisas distintas.' },
      { text: 'Instância é o nome do usuário', why: 'Instância é o conjunto de processos e memória.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'estrutura',
      part: 'Oracle',
      title: 'Instância, banco e tablespace',
      art: 'chip',
      goal: 'Distinguir instância, banco e tablespace.',
      explain:
        'No Oracle:\n\n- a **instância** é o conjunto de **processos e memória** (a **SGA**) que está rodando;\n- o **banco** são os **arquivos de dados** no disco;\n- a **tablespace** é uma **unidade lógica** de armazenamento, formada por arquivos de dados.\n\nAs tabelas ficam dentro de tablespaces, que ficam dentro do banco.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'A SGA faz parte:',
        options: [
          { text: 'Da instância, como memória', why: 'Isso.' },
          { text: 'Dos arquivos de dados', why: 'Arquivos são o banco; a SGA é memória da instância.' },
          { text: 'Da tablespace', why: 'Tablespace é armazenamento lógico em arquivos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **biblioteca**: os **livros na estante** são o banco (arquivos); as **seções** (história, direito) são as tablespaces; os **bibliotecários trabalhando** e a **mesa de atendimento** são a instância (processos e memória).',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'O que é uma tablespace?',
          options: [
            { text: 'Uma unidade lógica de armazenamento, formada por arquivos de dados', why: 'Isso.' },
            { text: 'Um processo em memória', why: 'Processos e memória são a instância.' },
            { text: 'Uma ferramenta de backup', why: 'A ferramenta de backup é o RMAN.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'redo',
      part: 'Oracle',
      title: 'Redo, undo e as ferramentas',
      art: 'revisao',
      goal: 'Distinguir redo de undo e reconhecer RMAN, Data Guard, RAC e Data Pump.',
      explain:
        'Dois registros parecidos no nome:\n\n- **redo log**: registra as **alterações** para **refazê-las** na recuperação (parente do WAL);\n- **undo**: guarda os **valores anteriores**, para o **rollback** e para outras sessões lerem de forma consistente.\n\nFerramentas: **RMAN** (backup e recuperação), **Data Guard** (bancos *standby* para desastres), **RAC** (várias instâncias em servidores diferentes acessando o **mesmo banco**) e **Data Pump** (`expdp` e `impdp`).',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Qual estrutura guarda os valores anteriores e permite o rollback?',
        options: [
          { text: 'Undo', why: 'Isso.' },
          { text: 'Redo log', why: 'O redo guarda as alterações para refazê-las.' },
          { text: 'Data Pump', why: 'Data Pump exporta e importa dados.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Os nomes ajudam: **redo** é "**refazer**", e **undo** é "**desfazer**". Para desfazer (rollback), é preciso lembrar como era antes: o undo guarda o **antes**. Para refazer depois de uma queda, é preciso a lista do que mudou: o redo.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Várias instâncias, em servidores diferentes, acessando o mesmo banco é o:',
          options: [
            { text: 'RAC', why: 'Isso: Real Application Clusters.' },
            { text: 'Data Guard', why: 'O Data Guard mantém bancos standby separados.' },
            { text: 'RMAN', why: 'RMAN é backup e recuperação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'rotina',
      part: 'Administração',
      title: 'A rotina de quem cuida do banco',
      art: 'calendario',
      goal: 'Listar as tarefas rotineiras de administração e otimização.',
      explain:
        'Valem para PostgreSQL e Oracle:\n\n- monitorar **consultas lentas** e ler **planos de execução**;\n- criar ou remover **índices** conforme o uso; manter **estatísticas** em dia;\n- controlar o crescimento do **armazenamento** e dos **logs**;\n- **testar a restauração** dos backups de tempos em tempos;\n- dar permissões com **menor privilégio** (`GRANT` e `REVOKE`);\n- aplicar **atualizações** de versão e de segurança.',
      check: {
        kind: 'multi',
        id: 'ro-c',
        prompt: 'Quais são boas práticas de administração? Marque todas.',
        options: [
          { text: 'Testar restaurações periodicamente', correct: true, why: 'Isso: backup que nunca foi restaurado é dúvida.' },
          { text: 'Conceder permissões com menor privilégio', correct: true, why: 'Isso.' },
          { text: 'Analisar planos de consultas lentas', correct: true, why: 'Isso.' },
          { text: 'Dar acesso de superusuário a todas as aplicações', correct: false, why: 'O contrário: menor privilégio.' },
        ],
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'É como **manter um carro**: olhar o painel (consultas lentas), trocar peças conforme o uso (índices), conferir o estepe **antes** de precisar (testar a restauração) e não entregar a chave a qualquer um (menor privilégio).',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: 'Qual comando retira uma permissão concedida?',
          options: [
            { text: 'REVOKE', why: 'Isso.' },
            { text: 'GRANT', why: 'GRANT concede.' },
            { text: 'ANALYZE', why: 'ANALYZE atualiza estatísticas.' },
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
      prompt: 'Para que serve cada recurso do Oracle?',
      categories: ['Recuperação e desastre', 'Disponibilidade e escala', 'Exportação de dados'],
      items: [
        { text: 'RMAN', cat: 0, why: 'Backup e recuperação.' },
        { text: 'Data Guard', cat: 0, why: 'Standby para desastres.' },
        { text: 'RAC', cat: 1, why: 'Várias instâncias no mesmo banco.' },
        { text: 'Data Pump', cat: 2, why: 'expdp e impdp.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Redo: alterações para refazer', 'Undo: valores para refazer após a queda', 'Instância: processos e memória (SGA)'],
      bug: 1,
      why: 'O undo guarda os valores anteriores, para desfazer (rollback) e leitura consistente.',
      fixed: 'Undo: valores anteriores, para rollback',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O órgão quer que o sistema continue atendendo mesmo se um dos servidores do banco cair, com todos acessando o mesmo banco. Qual recurso?',
      scenarios: [
        { title: 'Opção A', body: '**RAC**: várias instâncias em servidores diferentes, um só banco.' },
        { title: 'Opção B', body: '**Data Pump**: exportar os dados toda noite.' },
      ],
      answer: 0,
      why: 'O RAC dá disponibilidade e escala com várias instâncias. O Data Pump só exporta e importa.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.02.004' },
  ],
  summary: [
    'Instância: processos e memória (SGA). Banco: arquivos de dados. Tablespace: unidade lógica de armazenamento.',
    'Redo log: alterações para refazer. Undo: valores anteriores, para rollback e leitura consistente.',
    'RMAN (backup), Data Guard (standby), RAC (várias instâncias, um banco), Data Pump (expdp e impdp).',
    'Rotina: consultas lentas e planos, índices e estatísticas, armazenamento, testar restauração, menor privilégio, atualizações.',
  ],
};
