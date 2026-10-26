// Série "Modelagem de dados" (cap.dados.01, trecho modelagem), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como surgiram o modelo relacional, as formas normais e o diagrama
// entidade-relacionamento; as seguintes ensinam o MER e o mapeamento para tabelas, depois chaves,
// normalização e desnormalização, uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (01-modelagem.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dados.01', sectionId: 'modelagem' } as const;

export const dadosModHistoria: MicroLesson = {
  ...S,
  id: 'dados.modelagem.1',
  series: { id: 'dados.modelagem', order: 1 },
  title: 'De Codd a Peter Chen: como nasceu a modelagem',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Antes de construir uma casa, o arquiteto faz a planta. Faz sentido desenhar os dados antes de criar as tabelas de um sistema?',
    options: [
      { text: 'Sim: é a planta do banco de dados', why: 'Isso. Esta aula conta como essa "planta" foi inventada.' },
      { text: 'Não: é só ir criando as tabelas', why: 'Dá retrabalho e erro, como construir sem planta. Esta aula mostra como se chegou ao desenho.' },
      { text: 'Só em sistemas pequenos', why: 'É o contrário: quanto maior o sistema, mais a planta ajuda.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'codd',
      part: 'A história',
      title: '1970: dados em tabelas',
      art: 'dados',
      goal: 'Lembrar que Codd propôs o modelo relacional em 1970.',
      explain:
        'Você já viu, em Primeiros Passos, que em **1970** **Edgar F. Codd**, da IBM, propôs o **modelo relacional**.\n\nNele, os dados ficam em **tabelas**, que os matemáticos chamam de **relações**, ligadas por **valores em comum**.\n\nA tabela Processo guarda o código do relator; a tabela Servidor guarda o mesmo código. É esse valor repetido que liga as duas.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'No modelo relacional de Codd, como duas tabelas se ligam?',
        options: [
          { text: 'Por valores em comum, como o código do relator', why: 'Isso.' },
          { text: 'Por fios entre os discos', why: 'A ligação é lógica, por valores, não física.' },
          { text: 'Não se ligam: cada tabela é isolada', why: 'A graça do modelo é justamente ligar tabelas por valores.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em duas fichas de papel: a do processo diz "relator: 0123"; a do servidor 0123 diz "Ana Souza". Ninguém grampeou as fichas, mas o **mesmo número** nas duas permite ligá-las. O modelo relacional funciona assim.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Outro nome que a matemática dá à tabela no modelo relacional é:',
          options: [
            { text: 'Relação', why: 'Isso: daí o nome "relacional".' },
            { text: 'Pacote', why: 'Pacote é pedaço de mensagem na rede.' },
            { text: 'Laço', why: 'Laço é repetição em programação.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'formas',
      part: 'A história',
      title: '1971 a 1974: as formas normais',
      art: 'degraus',
      goal: 'Saber quem criou as formas normais e quando.',
      explain:
        'Codd percebeu que tabelas mal desenhadas **repetem dados** e geram erros. Por isso definiu regras chamadas **formas normais**:\n\n- a **primeira** (1FN), junto com o modelo, em 1970;\n- a **segunda** (2FN) e a **terceira** (3FN), em **1971**;\n- em **1974**, com **Raymond Boyce**, a **forma normal de Boyce-Codd** (FNBC).\n\nCada forma é um **degrau**: para estar na 3FN, a tabela precisa estar antes na 2FN.',
      check: {
        kind: 'order',
        id: 'fo-c',
        prompt: 'Ordene as formas normais, do primeiro degrau ao mais rigoroso.',
        items: ['1FN', '2FN', '3FN', 'FNBC (Boyce-Codd)'],
        why: 'Cada uma exige a anterior; a FNBC é a versão mais rigorosa da 3FN.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como as **faixas de uma arte marcial**: não se pula da branca para a preta. A tabela sobe um degrau por vez: **1FN**, **2FN**, **3FN** e, mais exigente, **FNBC**, que leva o nome de Boyce e Codd.',
        check: {
          kind: 'choice',
          id: 'fo-r',
          prompt: 'A FNBC leva o nome de quem?',
          options: [
            { text: 'Raymond Boyce e Edgar F. Codd', why: 'Isso, em 1974.' },
            { text: 'Peter Chen', why: 'Chen criou o diagrama entidade-relacionamento, em 1976.' },
            { text: 'Tim Berners-Lee', why: 'Tim Berners-Lee propôs a Web.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'chen',
      part: 'A história',
      title: '1976: o diagrama de Peter Chen',
      art: 'trilha',
      goal: 'Conhecer o modelo entidade-relacionamento de Peter Chen.',
      explain:
        'Tabelas são boas para o computador, mas difíceis para conversar com quem não é técnico.\n\nEm **1976**, **Peter Chen** publicou o **modelo entidade-relacionamento** (MER), com um diagrama:\n\n- **retângulos** para as **entidades**;\n- **losangos** para os **relacionamentos**;\n- **elipses** para os **atributos**.\n\nCom ele, analista e usuário desenham juntos **o que** o sistema vai guardar, **antes** de criar qualquer tabela.',
      check: {
        kind: 'sort',
        id: 'ch-c',
        prompt: 'No diagrama de Chen, que forma representa cada coisa?',
        categories: ['Retângulo', 'Losango', 'Elipse'],
        items: [
          { text: 'Entidade, como Processo', cat: 0, why: 'Entidades ficam em retângulos.' },
          { text: 'Relacionamento, como "relata"', cat: 1, why: 'Relacionamentos ficam em losangos.' },
          { text: 'Atributo, como "data de autuação"', cat: 2, why: 'Atributos ficam em elipses.' },
        ],
      },
      recovery: {
        explain: 'Pense na **planta da casa**: ela não mostra tijolos, mostra cômodos e portas. O diagrama de Chen é a planta dos dados: os "cômodos" são as **entidades** (retângulos), as "portas" entre eles são os **relacionamentos** (losangos) e os detalhes de cada cômodo são os **atributos** (elipses).',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'Para que serve o modelo entidade-relacionamento?',
          options: [
            { text: 'Para decidir o que guardar e como se relaciona, antes das tabelas', why: 'Isso: é a planta do banco.' },
            { text: 'Para acelerar consultas já prontas', why: 'Isso é papel dos índices.' },
            { text: 'Para cifrar os dados', why: 'Cifrar é assunto de segurança.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'etapas',
      part: 'Juntando',
      title: 'Da planta às tabelas',
      art: 'pessoal',
      goal: 'Ver as etapas da modelagem, do desenho às tabelas normalizadas.',
      explain:
        'Hoje a modelagem costuma seguir este caminho, que junta as duas invenções:\n\n1. desenhar o **modelo conceitual** (o diagrama de Chen);\n2. transformá-lo em **tabelas** do modelo relacional (a ideia de Codd);\n3. conferir as tabelas pelas **formas normais**, para tirar repetições.\n\nAs próximas aulas percorrem esse caminho com exemplos do Tribunal.',
      check: {
        kind: 'order',
        id: 'et-c',
        prompt: 'Ordene as etapas da modelagem.',
        items: ['Desenhar entidades e relacionamentos', 'Transformar o desenho em tabelas', 'Conferir as tabelas pelas formas normais'],
        why: 'Primeiro a planta, depois a construção, por fim a vistoria.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na obra: **planta** (diagrama), **construção** (tabelas) e **vistoria** (formas normais), que aponta paredes duplicadas ou mal colocadas. Fazer a vistoria antes de construir não faz sentido, nem construir sem planta.',
        check: {
          kind: 'choice',
          id: 'et-r',
          prompt: 'Em que etapa se usam as formas normais?',
          options: [
            { text: 'Para conferir as tabelas e tirar repetições', why: 'Isso.' },
            { text: 'Para desenhar os losangos do diagrama', why: 'O desenho vem antes; as formas normais conferem as tabelas.' },
            { text: 'Para fazer backup', why: 'Backup é cópia de segurança, não modelagem.' },
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
      items: ['Codd propõe o modelo relacional (1970)', 'Codd define a 2FN e a 3FN (1971)', 'Boyce e Codd definem a FNBC (1974)', 'Peter Chen publica o modelo entidade-relacionamento (1976)'],
      why: '1970, 1971, 1974 e 1976.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Codd: modelo relacional, com tabelas', 'Chen: diagrama entidade-relacionamento', 'No diagrama de Chen, atributos ficam em losangos'],
      bug: 2,
      why: 'Losangos são relacionamentos; atributos ficam em elipses.',
      fixed: 'No diagrama de Chen, atributos ficam em elipses',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o setor de licitações pede um sistema novo. Qual o primeiro passo da modelagem?',
      options: [
        { text: 'Desenhar com o setor as entidades e os relacionamentos', why: 'Isso: a planta vem antes das tabelas.' },
        { text: 'Criar índices em todas as colunas', why: 'Índices vêm muito depois, quando as tabelas existem.' },
        { text: 'Desnormalizar tudo para ficar rápido', why: 'Primeiro se modela; desnormalizar é decisão posterior e consciente.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Em 1970, Codd propôs o modelo relacional: tabelas (relações) ligadas por valores em comum.',
    'Formas normais: 1FN (1970), 2FN e 3FN (1971), FNBC com Boyce (1974). Cada uma exige a anterior.',
    'Em 1976, Peter Chen publicou o modelo entidade-relacionamento: retângulos (entidades), losangos (relacionamentos), elipses (atributos).',
    'Caminho da modelagem: desenho conceitual, tabelas, conferência pelas formas normais.',
  ],
};

export const dadosModMer: MicroLesson = {
  ...S,
  id: 'dados.modelagem.2',
  series: { id: 'dados.modelagem', order: 2 },
  title: 'Entidades, atributos e relacionamentos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No Tribunal, um servidor relata vários processos. Para guardar isso num sistema, o que é preciso decidir primeiro?',
    options: [
      { text: 'Quais coisas existem e como se ligam', why: 'Isso: servidor, processo e a ligação "relata". Esta aula ensina os nomes de cada parte.' },
      { text: 'A cor da tela do sistema', why: 'A aparência vem depois; primeiro, o que se guarda.' },
      { text: 'Qual impressora usar', why: 'Primeiro se decide o que guardar e como se liga.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'entidade',
      part: 'O MER',
      title: 'Entidade e atributo',
      art: 'cartao',
      goal: 'Distinguir entidade de atributo e reconhecer o atributo-chave.',
      explain:
        'No MER:\n\n- **Entidade** é algo sobre o qual se guardam dados: **Processo**, **Jurisdicionado**, **Servidor**.\n- **Atributo** é uma propriedade da entidade: o **número do processo**, a **data de autuação**.\n- **Atributo-chave** é o que **identifica cada ocorrência**: o **CPF**, o **número do processo**.\n\nRegra prática: entidade costuma ser um **substantivo**; atributo, uma **característica** dele.',
      check: {
        kind: 'sort',
        id: 'en-c',
        prompt: 'Entidade ou atributo?',
        categories: ['Entidade', 'Atributo'],
        items: [
          { text: 'Servidor', cat: 0, why: 'Algo sobre o qual se guardam dados.' },
          { text: 'Data de autuação', cat: 1, why: 'Propriedade do processo.' },
          { text: 'Jurisdicionado', cat: 0, why: 'Algo sobre o qual se guardam dados.' },
          { text: 'Número do processo', cat: 1, why: 'Propriedade, e também atributo-chave.' },
        ],
      },
      recovery: {
        explain: 'Pense num **formulário de cadastro**: o título do formulário ("Cadastro de Servidor") é a **entidade**; cada campo a preencher (nome, matrícula, cargo) é um **atributo**. O campo que nunca se repete, como a matrícula, é o **atributo-chave**.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'Na entidade Servidor, qual atributo serve como atributo-chave?',
          options: [
            { text: 'CPF', why: 'Isso: identifica cada servidor.' },
            { text: 'Cargo', why: 'Muitos servidores têm o mesmo cargo.' },
            { text: 'Cidade', why: 'A cidade se repete entre servidores.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tipos',
      part: 'O MER',
      title: 'Tipos de atributo',
      art: 'dados',
      goal: 'Reconhecer atributos simples, compostos, multivalorados e derivados.',
      explain:
        'Os atributos têm tipos:\n\n- **simples**: indivisível, como o CPF;\n- **composto**: formado por partes, como o **endereço** (rua, número, cidade);\n- **multivalorado**: pode ter vários valores, como **vários telefones**;\n- **derivado**: calculado de outro, como a **idade**, que sai da data de nascimento.',
      check: {
        kind: 'sort',
        id: 'ti-c',
        prompt: 'Que tipo é cada atributo?',
        categories: ['Composto', 'Multivalorado', 'Derivado'],
        items: [
          { text: 'Endereço (rua, número, cidade)', cat: 0, why: 'Formado por partes.' },
          { text: 'Telefones do servidor', cat: 1, why: 'Pode ter vários.' },
          { text: 'Idade', cat: 2, why: 'Calculada da data de nascimento.' },
        ],
      },
      recovery: {
        explain: 'Faça três perguntas ao atributo. **Tem partes?** Composto. **Pode ter vários ao mesmo tempo?** Multivalorado. **Dá para calcular a partir de outro?** Derivado. Se nenhuma vale, é simples.',
        check: {
          kind: 'choice',
          id: 'ti-r',
          prompt: '"Tempo de serviço", calculado da data de posse, é um atributo:',
          options: [
            { text: 'Derivado', why: 'Isso: é calculado de outro atributo.' },
            { text: 'Multivalorado', why: 'Tem um valor só; o que o define é ser calculado.' },
            { text: 'Composto', why: 'Não tem partes: é calculado.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'fraca',
      part: 'O MER',
      title: 'Entidade fraca',
      art: 'livro',
      goal: 'Reconhecer a entidade fraca.',
      explain:
        'Uma **entidade fraca** **depende de outra** para ser identificada.\n\nExemplo: o **item de um empenho** só existe **com o empenho**. "Item 3" sozinho não diz nada; "item 3 do empenho 2026NE0045" diz.\n\nPor isso a identificação do item usa a chave do empenho mais o número do item.',
      check: {
        kind: 'choice',
        id: 'fr-c',
        prompt: 'Qual destas é uma entidade fraca?',
        options: [
          { text: 'Item de empenho, que só existe com o empenho', why: 'Isso.' },
          { text: 'Servidor, identificado pelo CPF', why: 'O servidor se identifica sozinho pelo CPF.' },
          { text: 'Fornecedor, identificado pelo CNPJ', why: 'O fornecedor se identifica sozinho pelo CNPJ.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nos **apartamentos** de um prédio: "apartamento 101" só faz sentido junto com o endereço do prédio. O apartamento é a entidade **fraca**; o prédio, a entidade da qual ele depende.',
        check: {
          kind: 'choice',
          id: 'fr-r',
          prompt: 'Por que o "item 3" de um empenho é entidade fraca?',
          options: [
            { text: 'Só é identificado junto com o empenho', why: 'Isso.' },
            { text: 'Porque tem valor baixo', why: 'O valor não importa; o que importa é depender de outra entidade.' },
            { text: 'Porque é um atributo', why: 'É entidade, mas depende de outra para ser identificada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'cardinalidade',
      part: 'O MER',
      title: 'Relacionamento e cardinalidade',
      art: 'rede',
      goal: 'Reconhecer as cardinalidades 1:1, 1:N e N:M.',
      explain:
        '**Relacionamento** é a associação entre entidades: o **Servidor relata Processo**.\n\n**Cardinalidade** diz **quantas ocorrências** se associam:\n\n- **1:1**: um com um;\n- **1:N**: um com vários (um relator para vários processos, cada processo com um relator);\n- **N:M**: vários com vários (um processo tem vários auditores, e cada auditor atua em vários processos).',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Cada processo tem vários auditores, e cada auditor atua em vários processos. A cardinalidade é:',
        options: [
          { text: 'N:M', why: 'Isso: vários com vários.' },
          { text: '1:N', why: 'Em 1:N, um dos lados só teria um.' },
          { text: '1:1', why: 'Um com um não descreve vários auditores.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Faça a pergunta **dos dois lados**. "Um processo tem quantos relatores?" Um. "Um relator tem quantos processos?" Vários. Logo, **1:N**. Se as duas respostas forem "vários", é **N:M**; se forem "um", **1:1**.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'Um processo tem um único relator; um relator tem vários processos. A cardinalidade é:',
          options: [
            { text: '1:N', why: 'Isso.' },
            { text: 'N:M', why: 'Um processo só tem um relator: não é vários com vários.' },
            { text: '1:1', why: 'O relator tem vários processos.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'mapeamento',
      part: 'Às tabelas',
      title: 'Do desenho às tabelas',
      art: 'degraus',
      goal: 'Mapear 1:N, N:M e atributo multivalorado para tabelas.',
      explain:
        'Para passar do desenho às tabelas:\n\n- **1:N**: a chave do lado "1" vira **chave estrangeira** na tabela do lado "N". Cada processo guarda o código do seu relator.\n- **N:M**: cria-se uma **tabela associativa** com as chaves das duas entidades, como ProcessoAuditor(processo, auditor).\n- **Multivalorado**: vira uma **tabela própria**, como TelefoneServidor.',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'Como se implementa o N:M entre Processo e Auditor?',
        options: [
          { text: 'Com uma tabela associativa com as chaves das duas', why: 'Isso.' },
          { text: 'Repetindo os auditores numa coluna do processo', why: 'Isso quebraria a atomicidade da coluna; o certo é a tabela associativa.' },
          { text: 'Juntando as duas entidades numa só tabela', why: 'Misturaria assuntos e repetiria dados.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'No N:M, nenhum dos lados consegue guardar "o outro" numa coluna só, porque são vários. Então se cria uma **lista de pares**: cada linha diz "processo X tem o auditor Y". Essa lista é a **tabela associativa**. No 1:N basta o lado "N" anotar o código do lado "1".',
        check: {
          kind: 'choice',
          id: 'ma-r',
          prompt: 'No 1:N entre Relator e Processo, onde fica a chave estrangeira?',
          options: [
            { text: 'Na tabela Processo, o lado N', why: 'Isso: cada processo guarda o código do seu relator.' },
            { text: 'Na tabela Relator', why: 'O relator tem vários processos; não caberia numa coluna.' },
            { text: 'Numa tabela associativa obrigatória', why: 'Associativa é para N:M.' },
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
      prompt: 'Como cada situação vira tabela?',
      categories: ['Chave estrangeira no lado N', 'Tabela associativa', 'Tabela própria'],
      items: [
        { text: 'Um órgão tem vários contratos; cada contrato, um órgão', cat: 0, why: '1:N.' },
        { text: 'Servidores participam de várias comissões, e cada comissão tem vários servidores', cat: 1, why: 'N:M.' },
        { text: 'Vários e-mails do mesmo fornecedor', cat: 2, why: 'Atributo multivalorado.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Entidade: algo sobre o qual se guardam dados', 'Idade: atributo derivado', 'N:M: chave estrangeira no lado N'],
      bug: 2,
      why: 'N:M vira tabela associativa; a chave estrangeira no lado N é do 1:N.',
      fixed: 'N:M: tabela associativa',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual desenho guarda melhor os auditores de cada processo?',
      scenarios: [
        { title: 'Desenho A', body: 'Processo(numero, auditores) com "Ana; Bruno; Carla" na coluna auditores.' },
        { title: 'Desenho B', body: 'Processo(numero) e ProcessoAuditor(numero, auditor), uma linha por par.' },
      ],
      answer: 1,
      why: 'O B usa tabela associativa para o N:M. O A mistura vários valores numa coluna.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.001' }],
  summary: [
    'Entidade: algo sobre o qual se guardam dados. Atributo: propriedade. Atributo-chave: identifica cada ocorrência.',
    'Atributos: simples, composto (endereço), multivalorado (telefones), derivado (idade).',
    'Entidade fraca depende de outra para ser identificada (item do empenho).',
    'Cardinalidade: 1:1, 1:N, N:M. Pergunte dos dois lados.',
    'Às tabelas: 1:N com chave estrangeira no lado N; N:M com tabela associativa; multivalorado em tabela própria.',
  ],
  vocab: [{ term: 'cardinalidade', match: 'cardinalidade', step: 'cardinalidade' }],
};

export const dadosModNormal: MicroLesson = {
  ...S,
  id: 'dados.modelagem.3',
  series: { id: 'dados.modelagem', order: 3 },
  title: 'Chaves, normalização e desnormalização',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O nome de um fornecedor aparece repetido em mil linhas de lançamentos. Ele muda de razão social. O que pode dar errado?',
    options: [
      { text: 'Alguma linha ficar com o nome antigo', why: 'Isso: é uma anomalia de atualização. Esta aula mostra como a normalização evita isso.' },
      { text: 'Nada: o banco troca sozinho', why: 'O banco não adivinha. Cada cópia precisa ser trocada, e alguma pode ficar para trás.' },
      { text: 'O banco apaga o fornecedor', why: 'Não apaga; o risco é ficarem nomes diferentes para a mesma empresa.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'chaves',
      part: 'Chaves',
      title: 'Candidata, primária e alternativa',
      art: 'cadeado',
      goal: 'Distinguir chave candidata, primária e alternativa.',
      explain:
        '- **Candidata**: conjunto **mínimo** de atributos que identifica uma linha de forma única.\n- **Primária**: a candidata **escolhida** como identificador oficial. É única e **não nula**.\n- **Alternativa**: candidata que **não foi escolhida**. Costuma receber restrição **UNIQUE**.\n\nNa tabela Servidor, matrícula e CPF são candidatas. Escolhida a matrícula como primária, o CPF é **alternativa**.',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'Na tabela Fornecedor, CNPJ e código interno identificam cada linha. O código foi escolhido como primária. O CNPJ é chave:',
        options: [
          { text: 'Alternativa', why: 'Isso: candidata não escolhida.' },
          { text: 'Estrangeira', why: 'Estrangeira aponta para outra tabela; aqui o CNPJ identifica a própria linha.' },
          { text: 'Nenhuma: deixou de ser chave', why: 'Continua identificando: é chave alternativa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **eleição**: todos os que podem concorrer são **candidatos**; o eleito é o **primário**; os outros continuam aptos, como **alternativos**. Matrícula e CPF concorrem; a escolhida vira primária; a outra é alternativa, e ganha UNIQUE para não repetir.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'A chave primária pode ter valor nulo?',
          options: [
            { text: 'Não: é única e não nula', why: 'Isso.' },
            { text: 'Sim, se for alternativa', why: 'A primária nunca é nula.' },
            { text: 'Sim, sempre', why: 'Linha sem identificador não pode ser localizada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'estrangeira',
      part: 'Chaves',
      title: 'Estrangeira e integridade referencial',
      art: 'rede',
      goal: 'Saber que a chave estrangeira garante a integridade referencial.',
      explain:
        'A **chave estrangeira** referencia a chave de **outra tabela**.\n\nEla garante a **integridade referencial**: não se pode registrar um contrato com um CNPJ de fornecedor **que não existe** na tabela Fornecedor.\n\nO banco **recusa** a referência a algo inexistente, e assim não ficam "contratos órfãos".',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Alguém tenta gravar um contrato com um CNPJ que não está na tabela Fornecedor. Com chave estrangeira, o banco:',
        options: [
          { text: 'Recusa, para manter a integridade referencial', why: 'Isso.' },
          { text: 'Cria o fornecedor sozinho', why: 'O banco não inventa dados: recusa a referência.' },
          { text: 'Grava normalmente', why: 'A chave estrangeira existe justamente para impedir isso.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como o **protocolo** que só aceita processo de **jurisdicionado cadastrado**. Se o órgão não existe no cadastro, o protocolo devolve. A chave estrangeira faz esse papel: só aceita apontar para o que **existe** na outra tabela.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'O que a integridade referencial evita?',
          options: [
            { text: 'Referências a registros que não existem', why: 'Isso.' },
            { text: 'Leituras lentas', why: 'Velocidade é assunto de índices.' },
            { text: 'Senhas fracas', why: 'Senhas são de segurança.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'dependencia',
      part: 'Normalização',
      title: 'Por que normalizar',
      art: 'balanca',
      goal: 'Entender anomalias e dependência funcional.',
      explain:
        '**Normalizar** é organizar as tabelas para **eliminar redundância** e **anomalias** de **inserção**, **atualização** e **exclusão**.\n\nA base é a **dependência funcional**: **A → B** quer dizer que o valor de A **determina** o de B.\n\nExemplo: **cnpj → nome**. Sabendo o CNPJ, sabe-se o nome. Se o nome estiver copiado em mil linhas, mudar a razão social exige mil trocas: é a anomalia de atualização.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: '"cnpj → nome" significa:',
        options: [
          { text: 'O CNPJ determina o nome', why: 'Isso: sabendo um, sabe-se o outro.' },
          { text: 'O nome determina o CNPJ', why: 'A seta vai do determinante (CNPJ) para o determinado (nome).' },
          { text: 'CNPJ e nome não têm relação', why: 'A seta indica justamente uma dependência.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia a seta como "**define**": "o CNPJ **define** o nome". Se você copia o nome em vários lugares, o que o CNPJ define fica espalhado, e uma troca pode esquecer alguma cópia. Normalizar é guardar o nome **uma vez só**, junto do CNPJ.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'O que a normalização elimina?',
          options: [
            { text: 'Redundância e anomalias de inserção, atualização e exclusão', why: 'Isso.' },
            { text: 'Todas as chaves estrangeiras', why: 'Ela costuma até criar chaves estrangeiras ao separar tabelas.' },
            { text: 'A necessidade de backup', why: 'Backup continua necessário.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'fn1-2',
      part: 'Normalização',
      title: '1FN e 2FN',
      art: 'degraus',
      goal: 'Reconhecer violações da 1FN e da 2FN.',
      explain:
        '- **1FN**: atributos **atômicos**. Sem grupos repetidos nem vários valores na mesma coluna. "Ana; Bruno; Carla" numa coluna viola a 1FN.\n- **2FN**: estar na 1FN e **nenhum atributo não chave depender de só parte** de uma **chave composta**. Isso é a **dependência parcial**.\n\nExemplo: chave **(num_empenho, item)**. Se o fornecedor dependesse **só do num_empenho**, violaria a 2FN. Solução: levar o fornecedor para a tabela **Empenho**.',
      check: {
        kind: 'choice',
        id: 'f2-c',
        prompt: 'Com chave (num_empenho, item), o fornecedor depende só de num_empenho. Que regra é violada?',
        options: [
          { text: '2FN: dependência parcial', why: 'Isso: depende de só parte da chave.' },
          { text: '1FN: coluna com vários valores', why: 'Não há vários valores numa coluna; o problema é depender de parte da chave.' },
          { text: 'Nenhuma', why: 'Depender de parte da chave composta viola a 2FN.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A 2FN só se preocupa com **chave composta** (de mais de uma coluna). Pergunte: "este atributo precisa da chave **inteira** ou só de um pedaço?". O fornecedor é o mesmo para todos os itens do empenho: precisa só do pedaço num_empenho. Então ele mora na tabela Empenho.',
        check: {
          kind: 'choice',
          id: 'f2-r',
          prompt: 'Uma coluna "telefones" com "3201-0000, 3201-1111" viola:',
          options: [
            { text: 'A 1FN', why: 'Isso: o valor não é atômico.' },
            { text: 'A 3FN', why: 'O problema é anterior: vários valores numa coluna, 1FN.' },
            { text: 'A FNBC', why: 'O problema é de atomicidade, 1FN.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'fn3',
      part: 'Normalização',
      title: '3FN e FNBC',
      art: 'alvo',
      goal: 'Reconhecer a dependência transitiva e a exigência da FNBC.',
      explain:
        '- **3FN**: estar na 2FN e **nenhum atributo não chave depender de outro não chave**. Isso é a **dependência transitiva**.\n- **FNBC**: todo **determinante** é chave candidata. Versão mais rigorosa da 3FN.\n\nNa tabela Lancamento, com chave (num_empenho, item): chave → cnpj_fornecedor → nome_fornecedor. O nome depende do CNPJ, que não é chave: viola a **3FN**. Solução: **Fornecedor(cnpj, nome)**.\n\nPara lembrar: depender "da chave, da chave inteira e de nada além da chave".',
      check: {
        kind: 'choice',
        id: 'f3-c',
        prompt: 'nome_fornecedor depende de cnpj_fornecedor, que não é chave. Isso é:',
        options: [
          { text: 'Dependência transitiva, que viola a 3FN', why: 'Isso.' },
          { text: 'Dependência parcial, que viola a 2FN', why: 'Parcial é depender de parte da chave; aqui depende de um não chave.' },
          { text: 'Algo permitido na 3FN', why: 'A 3FN proíbe exatamente isso.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Use a frase: "**a chave** (1FN), **a chave inteira** (2FN) e **nada além da chave** (3FN)". O nome do fornecedor depende de algo **além da chave**, o CNPJ. Por isso viola a terceira parte da frase: 3FN. Separar Fornecedor(cnpj, nome) resolve.',
        check: {
          kind: 'choice',
          id: 'f3-r',
          prompt: 'Uma tabela na 3FN pode ter dependência transitiva?',
          options: [
            { text: 'Não: a 3FN elimina exatamente isso', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'A 3FN proíbe dependência transitiva.' },
            { text: 'Só na FNBC', why: 'A FNBC é ainda mais rigorosa; nenhuma das duas admite.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'desnormalizar',
      part: 'Desnormalização',
      title: 'Repetir de propósito',
      art: 'progresso',
      goal: 'Saber o que é desnormalizar e quando se faz.',
      explain:
        '**Desnormalizar** é **reintroduzir redundância de propósito** para **ganhar desempenho em leitura**.\n\nÉ comum em **relatórios** e em **data warehouses**: repetir o nome do órgão em cada linha evita juntar tabelas a cada consulta.\n\nO custo é **manter as cópias consistentes** quando o dado original muda. É uma **decisão consciente**, não um descuido de modelagem.',
      check: {
        kind: 'choice',
        id: 'dn-c',
        prompt: 'A equipe repete o nome do órgão na tabela de fatos para acelerar relatórios. Isso é:',
        options: [
          { text: 'Desnormalização consciente, para ganhar leitura', why: 'Isso.' },
          { text: 'Erro de modelagem sem justificativa', why: 'Há justificativa: desempenho em leitura, assumindo o custo das cópias.' },
          { text: 'Normalização na 3FN', why: 'Repetir dados é o contrário de normalizar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em ter o **telefone da farmácia** colado na geladeira, além de na agenda. É uma cópia, mas poupa tempo toda vez. O preço: se o número mudar, é preciso lembrar de trocar as duas. Desnormalizar é isso, feito **de propósito**.',
        check: {
          kind: 'choice',
          id: 'dn-r',
          prompt: 'Qual é o custo da desnormalização?',
          options: [
            { text: 'Manter as cópias consistentes quando o dado muda', why: 'Isso.' },
            { text: 'Leituras mais lentas', why: 'A desnormalização é feita justamente para ler mais rápido.' },
            { text: 'Perder a chave primária', why: 'As chaves continuam; o custo é a manutenção das cópias.' },
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
      prompt: 'Qual forma normal cada problema viola?',
      categories: ['1FN', '2FN', '3FN'],
      items: [
        { text: 'Coluna "emails" com vários endereços', cat: 0, why: 'Valor não atômico.' },
        { text: 'Atributo que depende de parte da chave composta', cat: 1, why: 'Dependência parcial.' },
        { text: 'Atributo não chave que depende de outro não chave', cat: 2, why: 'Dependência transitiva.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Chave primária: única e não nula', 'Chave alternativa: candidata não escolhida', 'Desnormalizar: descuido de modelagem'],
      bug: 2,
      why: 'Desnormalizar é decisão consciente para ganhar desempenho em leitura.',
      fixed: 'Desnormalizar: redundância de propósito para ler mais rápido',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: Contrato(numero, cnpj_fornecedor, cidade_fornecedor), chave numero; a cidade depende do CNPJ. Como normalizar?',
      options: [
        { text: 'Criar Fornecedor(cnpj, cidade) e deixar só o CNPJ em Contrato', why: 'Isso: tira a dependência transitiva (3FN).' },
        { text: 'Criar um índice na cidade', why: 'Índice acelera, mas não tira a dependência transitiva.' },
        { text: 'Repetir a cidade em mais tabelas', why: 'Isso aumenta a redundância.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.003' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dados.01.004' },
  ],
  summary: [
    'Chaves: candidata (mínima e única), primária (a escolhida, não nula), alternativa (a não escolhida, com UNIQUE), estrangeira (aponta para outra tabela).',
    'Integridade referencial: não se aponta para registro inexistente.',
    'Normalizar elimina redundância e anomalias, com base em dependências funcionais (A → B).',
    '1FN: atômico. 2FN: sem dependência parcial. 3FN: sem dependência transitiva. FNBC: todo determinante é chave candidata.',
    'Desnormalizar: redundância de propósito para leitura, com o custo de manter as cópias.',
  ],
  vocab: [{ term: 'dependência transitiva', match: 'dependência transitiva', step: 'fn3' }],
};
