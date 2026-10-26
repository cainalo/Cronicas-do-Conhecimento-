// Série "Dados e bancos de dados" (cap.prim.02, trecho dados), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como se passou das fichas de papel ao banco relacional e ao SQL; as
// seguintes apresentam dado, informação e SGBD, depois tabelas e chaves, uma ideia por etapa. Fatos
// conferidos com o texto do capítulo (02-dados-bancos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.02', sectionId: 'dados' } as const;

export const primDadosHistoria: MicroLesson = {
  ...S,
  id: 'prim.dados.1',
  series: { id: 'prim.dados', order: 1 },
  title: 'Das fichas de papel ao banco relacional',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num arquivo de aço com mil fichas de fornecedores, você precisa achar todos os de Goiânia. Como faria sem computador?',
    options: [
      { text: 'Olhando ficha por ficha, à mão', why: 'Isso. Era assim por séculos, e esta aula conta como os bancos de dados mudaram isso.' },
      { text: 'Perguntando ao arquivo de aço', why: 'O arquivo de aço não responde nada. Alguém precisa procurar.' },
      { text: 'Não daria para achar', why: 'Daria, mas com muito trabalho. Esta aula mostra como isso ficou fácil.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'fichas',
      part: 'A história',
      title: 'Livros, fichas e arquivos de aço',
      art: 'livro',
      goal: 'Saber que, antes do computador, a informação era guardada e procurada à mão.',
      explain:
        'Por **séculos**, cartórios, bibliotecas e repartições guardaram a informação em **livros de registro**, **fichas** e **pastas** em arquivos de aço.\n\nFuncionava, mas **achar um dado** era **procurar à mão**, folha por folha.\n\nE cruzar informações, como "todos os contratos de um fornecedor", podia levar **dias**.',
      check: {
        kind: 'choice',
        id: 'fi-c',
        prompt: 'Antes do computador, como se achava um dado num arquivo de fichas?',
        options: [
          { text: 'Procurando à mão, ficha por ficha', why: 'Isso.' },
          { text: 'Com uma consulta em SQL', why: 'O SQL só surgiu nos anos 1970.' },
          { text: 'Pelo endereço IP da ficha', why: 'IP é endereço de aparelho na rede.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na **lista telefônica de papel**: para achar alguém pelo sobrenome, era fácil, porque estava em ordem. Mas para achar "todos que moram na rua X", era preciso ler a lista inteira. Os arquivos de fichas tinham o mesmo problema.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Qual era a maior dificuldade dos arquivos de papel?',
          options: [
            { text: 'Procurar e cruzar informações demorava muito', why: 'Isso.' },
            { text: 'Eles não guardavam nada', why: 'Guardavam; o difícil era procurar e cruzar.' },
            { text: 'Precisavam de internet', why: 'Papel não precisa de internet.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hollerith',
      part: 'A história',
      title: '1890: o censo em cartões',
      art: 'cartao',
      goal: 'Conhecer as máquinas de Hollerith e o uso de cartões perfurados para dados.',
      explain:
        'Nos Estados Unidos, o **censo de 1890** foi apurado com as máquinas de **Herman Hollerith**.\n\nOs dados de **cada pessoa** ficavam num **cartão perfurado**: os furos, em posições certas, diziam idade, sexo, estado.\n\nA máquina **lia os furos e contava**. A empresa de Hollerith deu origem, mais tarde, à **IBM**.',
      check: {
        kind: 'choice',
        id: 'ho-c',
        prompt: 'Nas máquinas de Hollerith, onde ficavam os dados de cada pessoa?',
        options: [
          { text: 'Num cartão perfurado', why: 'Isso: os furos guardavam as respostas.' },
          { text: 'Num pendrive', why: 'O pendrive é de por volta de 2000.' },
          { text: 'Numa tabela de SQL', why: 'O SQL só veio nos anos 1970.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um **gabarito de prova** em que você pinta bolinhas: a posição da bolinha diz a resposta, e uma máquina lê. O cartão de Hollerith era parecido, só que com **furos**: cada furo, numa posição, guardava uma informação sobre a pessoa.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'A empresa de Herman Hollerith deu origem, mais tarde, a qual empresa?',
          options: [
            { text: 'IBM', why: 'Isso.' },
            { text: 'Oracle', why: 'A Oracle veio muito depois: seu banco comercial com SQL é de 1979.' },
            { text: 'Amazon', why: 'A Amazon é muito posterior.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'anos60',
      part: 'A história',
      title: 'Os primeiros sistemas de banco de dados',
      art: 'computador',
      goal: 'Saber que nos anos 1960 surgiram os primeiros programas para guardar e procurar dados.',
      explain:
        'Nos **anos 1960**, os computadores chegaram às **empresas**.\n\nCom eles surgiram **programas para guardar e procurar dados**, os primeiros sistemas de banco de dados.\n\nUm exemplo foi o **IDS**, de **Charles Bachman**, na General Electric.\n\nA procura que levava dias no papel passou a ser feita **pela máquina**.',
      check: {
        kind: 'choice',
        id: 's6-c',
        prompt: 'O que surgiu nos anos 1960, com os computadores nas empresas?',
        options: [
          { text: 'Programas para guardar e procurar dados', why: 'Isso, como o IDS, de Charles Bachman.' },
          { text: 'A World Wide Web', why: 'A Web foi proposta em 1989.' },
          { text: 'O cartão perfurado', why: 'O cartão perfurado é bem mais antigo: já estava no censo de 1890.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como trocar o **arquivista** que procurava ficha por ficha por um **programa** que procura sozinho, muito mais rápido. Nos anos 1960, isso começou a acontecer nas empresas, com sistemas como o **IDS**.',
        check: {
          kind: 'choice',
          id: 's6-r',
          prompt: 'Quem criou o IDS, na General Electric?',
          options: [
            { text: 'Charles Bachman', why: 'Isso.' },
            { text: 'Tim Berners-Lee', why: 'Tim Berners-Lee propôs a Web.' },
            { text: 'Ada Lovelace', why: 'Ada escreveu o primeiro programa, em 1843.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'codd',
      part: 'A história',
      title: '1970: dados em tabelas',
      art: 'dados',
      goal: 'Saber que Codd propôs o modelo relacional, com dados em tabelas ligadas.',
      explain:
        'Em **1970**, **Edgar F. Codd**, pesquisador da **IBM**, publicou uma ideia: guardar os dados em **tabelas** ligadas entre si.\n\nIsso se chama **modelo relacional**.\n\nÉ o **mais usado até hoje**: quase todo sistema de tribunal, banco ou loja guarda os dados assim.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'O que Edgar F. Codd propôs em 1970?',
        options: [
          { text: 'Guardar os dados em tabelas ligadas entre si', why: 'Isso: o modelo relacional.' },
          { text: 'Dividir as mensagens em pacotes', why: 'Pacotes são da rede, não do modelo relacional.' },
          { text: 'Usar cartões perfurados no censo', why: 'Isso foi Hollerith, em 1890.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **planilha** com várias abas: uma de fornecedores, outra de contratos. Cada aba é uma **tabela**, e uma coluna liga uma aba à outra. A ideia de Codd foi essa: dados em tabelas que se **relacionam**, daí o nome **relacional**.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'O modelo relacional guarda os dados em:',
          options: [
            { text: 'Tabelas ligadas entre si', why: 'Isso.' },
            { text: 'Fichas soltas sem ordem', why: 'O modelo relacional organiza em tabelas.' },
            { text: 'Pacotes de rede', why: 'Pacotes são pedaços de mensagens na rede.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sql',
      part: 'A história',
      title: 'Nasce o SQL',
      art: 'teclado',
      goal: 'Saber quando e onde nasceu o SQL e conhecer os bancos dos anos 1990.',
      explain:
        'Na IBM, entre **1974 e 1979**, **Donald Chamberlin** e **Raymond Boyce** criaram uma linguagem para **consultar as tabelas**, que viria a se chamar **SQL**.\n\nEm **1979**, a empresa que depois se chamaria **Oracle** lançou um dos primeiros bancos relacionais **comerciais** com SQL.\n\nNos **anos 1990** surgiram o **MySQL** (1995) e o **PostgreSQL** (com esse nome desde 1996), **gratuitos** e de **código aberto**.',
      check: {
        kind: 'order',
        id: 'sq-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Censo com cartões de Hollerith (1890)', 'Modelo relacional de Codd (1970)', 'Banco comercial com SQL da futura Oracle (1979)', 'MySQL (1995)'],
        why: '1890, 1970, 1979 e 1995: dos cartões às tabelas, ao SQL e aos bancos gratuitos.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Com as tabelas de Codd, faltava um jeito simples de **perguntar** a elas: "quais contratos passam de R$ 100 mil?". O **SQL** é essa forma de perguntar. Depois, vieram bancos gratuitos como **MySQL** e **PostgreSQL**, que qualquer órgão pode usar.',
        check: {
          kind: 'choice',
          id: 'sq-r',
          prompt: 'Para que serve o SQL?',
          options: [
            { text: 'Para conversar com bancos relacionais: consultar e mudar dados', why: 'Isso.' },
            { text: 'Para traduzir nomes de sites', why: 'Isso é o DNS.' },
            { text: 'Para ligar redes', why: 'Isso é o roteador.' },
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
      lines: ['1890: censo com cartões de Hollerith', '1970: Codd propõe o modelo relacional', '1979: nasce a World Wide Web'],
      bug: 2,
      why: 'Em 1979, a futura Oracle lançou um banco relacional comercial com SQL. A Web foi proposta em 1989.',
      fixed: '1979: banco relacional comercial com SQL',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Herman Hollerith', 'Edgar F. Codd', 'Chamberlin e Boyce'],
      items: [
        { text: 'Máquinas que liam cartões no censo de 1890', cat: 0, why: 'Hollerith.' },
        { text: 'Modelo relacional, com tabelas', cat: 1, why: 'Codd, 1970.' },
        { text: 'A linguagem que viria a se chamar SQL', cat: 2, why: 'Chamberlin e Boyce, na IBM.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um órgão quer um banco de dados relacional gratuito e de código aberto. Qual destes serve?',
      options: [
        { text: 'PostgreSQL', why: 'Isso: gratuito e de código aberto.' },
        { text: 'IPv6', why: 'IPv6 é formato de endereço de rede.' },
        { text: 'Navegador', why: 'Navegador abre páginas; não é banco de dados.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'Por séculos, a informação ficou em livros, fichas e arquivos de aço, procurada à mão.',
    'Em 1890, o censo dos EUA usou os cartões perfurados de Hollerith; a empresa dele deu origem à IBM.',
    'Nos anos 1960 surgiram os primeiros sistemas de banco de dados, como o IDS, de Charles Bachman.',
    'Em 1970, Codd propôs o modelo relacional: dados em tabelas ligadas.',
    'Chamberlin e Boyce criaram o SQL na IBM; a futura Oracle lançou banco comercial em 1979; MySQL e PostgreSQL vieram nos anos 1990.',
  ],
};

export const primDadosSgbd: MicroLesson = {
  ...S,
  id: 'prim.dados.2',
  series: { id: 'prim.dados', order: 2 },
  title: 'Dado, informação e o SGBD',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num papel está escrito só "1500". Você sabe o que isso quer dizer?',
    options: [
      { text: 'Não: falta saber do que se trata', why: 'Isso. Um número solto é só um dado. Esta aula mostra quando ele vira informação.' },
      { text: 'Sim: é um salário', why: 'Pode ser, mas pode ser uma data, um código, uma quantidade. Falta contexto.' },
      { text: 'Sim: é um ano', why: 'Pode ser qualquer coisa. Sem contexto, não dá para saber.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'dado',
      part: 'Dado e informação',
      title: 'Dado solto, informação com sentido',
      art: 'cartao',
      goal: 'Distinguir dado de informação.',
      explain:
        'Um **dado** é um **registro solto**: "1500", "Maria", "10/03/2026".\n\nA **informação** surge quando o dado **ganha sentido**:\n\n"**Maria recebeu R$ 1.500 em 10/03/2026.**"\n\nOs dados são os tijolos; a informação é a parede pronta.',
      check: {
        kind: 'sort',
        id: 'da-c',
        prompt: 'Dado ou informação?',
        categories: ['Dado', 'Informação'],
        items: [
          { text: '"10/03/2026"', cat: 0, why: 'Solto, sem sentido.' },
          { text: '"Maria recebeu R$ 1.500 em 10/03/2026"', cat: 1, why: 'Os dados juntos ganharam sentido.' },
          { text: '"Maria"', cat: 0, why: 'Só um nome solto.' },
        ],
      },
      recovery: {
        explain: 'Pergunte: **dá para entender o que aconteceu?** "1500" sozinho, não. "Maria recebeu R$ 1.500" sim: agora você sabe quem, quanto e o quê. Quando a resposta é sim, é **informação**; quando é não, é só **dado**.',
        check: {
          kind: 'choice',
          id: 'da-r',
          prompt: '"O contrato 045/2026 vence em 30/06/2026." Isso é:',
          options: [
            { text: 'Informação', why: 'Isso: os dados ganharam sentido.' },
            { text: 'Só um dado solto', why: 'Há sentido completo: que contrato e quando vence.' },
            { text: 'Um protocolo', why: 'Protocolo é conjunto de regras de rede.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'banco',
      part: 'O banco',
      title: 'Banco de dados: o arquivo organizado',
      art: 'livro',
      goal: 'Saber o que é um banco de dados.',
      explain:
        'Um **banco de dados** é um conjunto de dados guardados **de forma organizada**, para **consultar** e **atualizar** com facilidade.\n\nPense num **grande arquivo de fichas, bem arrumado**, só que dentro do computador.\n\nUm Tribunal de Contas vive disso: contratos, pagamentos, fornecedores e processos precisam ser **achados e conferidos**.',
      check: {
        kind: 'choice',
        id: 'bd-c',
        prompt: 'Um banco de dados é:',
        options: [
          { text: 'Um conjunto de dados guardados de forma organizada', why: 'Isso: para consultar e atualizar com facilidade.' },
          { text: 'Uma agência bancária', why: 'O nome engana: é um arquivo organizado de dados.' },
          { text: 'Um cabo de rede', why: 'Cabo é hardware de rede.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Volte ao arquivo de aço da aula anterior: as fichas bem arrumadas já eram um "banco de dados" de papel. O banco de dados no computador é o **mesmo arquivo**, só que a procura é feita pela máquina, em segundos.',
        check: {
          kind: 'choice',
          id: 'bd-r',
          prompt: 'Por que guardar os dados de forma organizada?',
          options: [
            { text: 'Para consultar e atualizar com facilidade', why: 'Isso.' },
            { text: 'Para ocupar mais espaço', why: 'Organizar não é para ocupar espaço, é para achar fácil.' },
            { text: 'Para ninguém conseguir achar', why: 'É o contrário: para achar fácil.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sgbd',
      part: 'O banco',
      title: 'O SGBD, guardião do banco',
      art: 'cadeado',
      goal: 'Saber o que é SGBD, o que ele faz e reconhecer exemplos.',
      explain:
        'O programa que cuida do banco é o **SGBD**: sistema gerenciador de banco de dados. Exemplos: **PostgreSQL**, **MySQL**, **Oracle** e **SQL Server**.\n\nEle:\n\n- **guarda** os dados;\n- **procura** o que você pede;\n- **controla quem acessa**;\n- **evita** que duas pessoas estraguem o mesmo dado **ao mesmo tempo**.',
      check: {
        kind: 'multi',
        id: 'sg-c',
        prompt: 'Quais são exemplos de SGBD? Marque todos.',
        options: [
          { text: 'PostgreSQL', correct: true, why: 'Isso.' },
          { text: 'MySQL', correct: true, why: 'Isso.' },
          { text: 'Oracle', correct: true, why: 'Isso.' },
          { text: 'Firefox', correct: false, why: 'Firefox é navegador.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **SGBD** é o **arquivista-chefe**: guarda as fichas, busca o que pedem, só deixa entrar quem tem autorização e não deixa dois funcionários rabiscarem a mesma ficha ao mesmo tempo. O banco é o arquivo; o SGBD é quem cuida dele.',
        check: {
          kind: 'choice',
          id: 'sg-r',
          prompt: 'Duas pessoas tentam alterar o mesmo contrato no mesmo instante. Quem evita que o dado se estrague?',
          options: [
            { text: 'O SGBD', why: 'Isso.' },
            { text: 'O roteador', why: 'O roteador encaminha pacotes de rede.' },
            { text: 'O monitor', why: 'O monitor só mostra a imagem.' },
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
      lines: ['Dado: registro solto', 'Informação: dado com sentido', 'SGBD: um tipo de cabo de rede'],
      bug: 2,
      why: 'SGBD é o programa que cuida do banco de dados.',
      fixed: 'SGBD: programa que cuida do banco de dados',
      errorKind: 'confusao',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'O que o SGBD faz? Marque todos.',
      options: [
        { text: 'Guarda os dados', correct: true, why: 'Isso.' },
        { text: 'Controla quem acessa', correct: true, why: 'Isso.' },
        { text: 'Evita que duas pessoas estraguem o mesmo dado ao mesmo tempo', correct: true, why: 'Isso.' },
        { text: 'Liga o computador à tomada', correct: false, why: 'Isso é físico; o SGBD é um programa.' },
      ],
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um auditor pede "todos os pagamentos feitos a um fornecedor em 2026". Quem procura isso no banco?',
      options: [
        { text: 'O SGBD', why: 'Isso: ele guarda e procura o que você pede.' },
        { text: 'O DNS', why: 'O DNS traduz nomes de sites.' },
        { text: 'O teclado', why: 'O teclado só leva o pedido para dentro.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Dado: registro solto ("1500"). Informação: dado com sentido ("Maria recebeu R$ 1.500 em 10/03/2026").',
    'Banco de dados: dados guardados de forma organizada, para consultar e atualizar com facilidade.',
    'SGBD (PostgreSQL, MySQL, Oracle, SQL Server): guarda, procura, controla o acesso e evita que dois estraguem o mesmo dado.',
  ],
  vocab: [{ term: 'SGBD', match: 'SGBD', step: 'sgbd' }],
};

export const primDadosTabelas: MicroLesson = {
  ...S,
  id: 'prim.dados.3',
  series: { id: 'prim.dados', order: 3 },
  title: 'Tabelas, linhas, colunas e chaves',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Numa planilha de fornecedores, o cabeçalho tem CNPJ, nome e cidade, e cada fornecedor ocupa uma faixa embaixo. Já usou algo assim?',
    options: [
      { text: 'Sim: é uma tabela', why: 'Isso. O banco relacional guarda os dados em tabelas parecidas, e esta aula mostra as partes.' },
      { text: 'Não, nunca vi uma planilha', why: 'Sem problema: esta aula mostra cada parte com calma.' },
      { text: 'Isso é um programa de rede', why: 'É uma tabela, como as do banco relacional.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tabela',
      part: 'A tabela',
      title: 'Tabela: um assunto',
      art: 'dados',
      goal: 'Saber que no banco relacional a tabela reúne um assunto.',
      explain:
        'No tipo mais comum, o **banco relacional** (a ideia de Codd), os dados ficam em **tabelas**, parecidas com uma **planilha**.\n\nCada **tabela** reúne **um assunto**.\n\nExemplos: a tabela **Fornecedores**, a tabela **Contratos**, a tabela **Pagamentos**.',
      check: {
        kind: 'choice',
        id: 'ta-c',
        prompt: 'No banco relacional, uma tabela reúne:',
        options: [
          { text: 'Um assunto, como Fornecedores', why: 'Isso.' },
          { text: 'Todos os assuntos misturados', why: 'Cada assunto fica na sua tabela.' },
          { text: 'Só uma informação solta', why: 'A tabela reúne muitos registros de um assunto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nas **gavetas do arquivo**: uma só para fornecedores, outra só para contratos. Cada gaveta é uma **tabela**: guarda um único assunto, com muitas fichas dentro.',
        check: {
          kind: 'choice',
          id: 'ta-r',
          prompt: 'Onde ficariam os dados dos contratos do Tribunal?',
          options: [
            { text: 'Numa tabela Contratos', why: 'Isso: um assunto, uma tabela.' },
            { text: 'Num endereço IP', why: 'IP identifica aparelhos na rede.' },
            { text: 'No roteador', why: 'O roteador encaminha pacotes.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'linha-coluna',
      part: 'A tabela',
      title: 'Coluna é característica; linha é registro',
      art: 'degraus',
      goal: 'Distinguir linha de coluna numa tabela.',
      explain:
        'Dentro da tabela:\n\n- cada **coluna** é uma **característica**: CNPJ, nome, cidade;\n- cada **linha** é um **registro**, um **item completo**: um fornecedor específico, com seu CNPJ, nome e cidade.\n\nNa tabela **Contratos**, uma linha pode ser o contrato **045/2026**, com as colunas número, objeto, valor e fornecedor.',
      check: {
        kind: 'choice',
        id: 'lc-c',
        prompt: 'Na tabela Fornecedores, "Cidade" é:',
        options: [
          { text: 'Uma coluna, uma característica', why: 'Isso.' },
          { text: 'Uma linha, um registro', why: 'A linha é um fornecedor inteiro; "Cidade" é uma característica.' },
          { text: 'Uma tabela', why: 'É uma característica dentro da tabela Fornecedores.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **ficha de papel**, os campos impressos (CNPJ, nome, cidade) são as **colunas**; cada **ficha preenchida**, de um fornecedor, é uma **linha**. Coluna: o que se pergunta. Linha: um item com todas as respostas.',
        check: {
          kind: 'choice',
          id: 'lc-r',
          prompt: 'Um fornecedor específico, com CNPJ, nome e cidade, ocupa:',
          options: [
            { text: 'Uma linha', why: 'Isso: um registro completo.' },
            { text: 'Uma coluna', why: 'A coluna é uma característica, como a cidade.' },
            { text: 'Um banco inteiro', why: 'É um registro dentro de uma tabela.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'primaria',
      part: 'As chaves',
      title: 'Chave primária: a identidade',
      art: 'cadeado',
      goal: 'Saber o que é chave primária.',
      explain:
        'Uma **chave primária** é a **coluna** (ou grupo de colunas) que **identifica cada linha sem repetir**.\n\nÉ como o **CPF** de uma pessoa: **dois registros não podem ter a mesma chave**.\n\nNa tabela Fornecedores, o **CNPJ** é um bom candidato: cada empresa tem o seu.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Na tabela Fornecedores, qual coluna é a melhor chave primária?',
        options: [
          { text: 'CNPJ', why: 'Isso: cada empresa tem um CNPJ só dela.' },
          { text: 'Cidade', why: 'Muitos fornecedores podem ser da mesma cidade: repete.' },
          { text: 'Nome', why: 'Empresas diferentes podem ter nomes parecidos ou iguais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa sala com **duas Marias**. Chamar "Maria" não resolve; chamar pelo **CPF**, sim, porque não se repete. A chave primária é esse **número que não se repete**, para o banco nunca confundir dois registros.',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Dois registros da mesma tabela podem ter a mesma chave primária?',
          options: [
            { text: 'Não: ela existe justamente para não se repetir', why: 'Isso.' },
            { text: 'Sim, sem problema', why: 'Se repetisse, não identificaria cada linha.' },
            { text: 'Só se forem da mesma cidade', why: 'A chave primária nunca se repete.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'estrangeira',
      part: 'As chaves',
      title: 'Chave estrangeira: a ligação',
      art: 'rede',
      goal: 'Saber que a chave estrangeira liga uma tabela a outra.',
      explain:
        'Uma **chave estrangeira** é uma coluna que **aponta para a chave de outra tabela**.\n\nNa tabela **Contratos**, a coluna "**CNPJ do fornecedor**" liga cada contrato ao **fornecedor certo**, na tabela Fornecedores.\n\nÉ assim que as tabelas **se relacionam**, e daí vem o nome **relacional**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Na tabela Contratos, a coluna "CNPJ do fornecedor" serve para:',
        options: [
          { text: 'Ligar cada contrato ao fornecedor na outra tabela', why: 'Isso: é uma chave estrangeira.' },
          { text: 'Identificar o contrato sem repetir', why: 'Isso é a chave primária, como o número do contrato.' },
          { text: 'Guardar a senha do fornecedor', why: 'Ela aponta para a outra tabela; não guarda senha.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na ficha do contrato de papel, alguém anotava: "fornecedor: ver ficha do CNPJ 12.345...". Essa anotação é a **chave estrangeira**: não repete os dados do fornecedor, só **aponta** para a ficha dele em outra gaveta.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'A chave estrangeira aponta para:',
          options: [
            { text: 'A chave primária de outra tabela', why: 'Isso.' },
            { text: 'Um endereço IP', why: 'IP é da rede; a chave estrangeira é do banco.' },
            { text: 'Nada, é só enfeite', why: 'Ela liga as tabelas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sql',
      part: 'As chaves',
      title: 'SQL: a conversa com o banco',
      art: 'teclado',
      goal: 'Saber o que o SQL permite fazer.',
      explain:
        'O **SQL**, criado na IBM nos anos 1970, é a **linguagem** usada para **conversar com bancos relacionais**.\n\nCom ele você pode:\n\n- **pedir** dados;\n- **incluir** registros;\n- **alterar** registros;\n- **apagar** registros.\n\nÉ a forma de perguntar ao banco, por exemplo, "quais contratos são do fornecedor de tal CNPJ?".',
      check: {
        kind: 'multi',
        id: 'sl-c',
        prompt: 'O que se faz com SQL? Marque todos.',
        options: [
          { text: 'Pedir dados', correct: true, why: 'Isso.' },
          { text: 'Incluir registros', correct: true, why: 'Isso.' },
          { text: 'Apagar registros', correct: true, why: 'Isso.' },
          { text: 'Trocar o roteador de casa', correct: false, why: 'O SQL conversa com bancos de dados.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Se o banco é o **arquivo** e o SGBD é o **arquivista**, o **SQL** é a **língua** em que você faz os pedidos ao arquivista: "me traga", "acrescente", "corrija", "retire".',
        check: {
          kind: 'choice',
          id: 'sl-r',
          prompt: 'SQL é:',
          options: [
            { text: 'A linguagem para conversar com bancos relacionais', why: 'Isso.' },
            { text: 'Um tipo de memória', why: 'Memórias são RAM, SSD...; SQL é linguagem.' },
            { text: 'O endereço de um site', why: 'Endereços de site são traduzidos pelo DNS.' },
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
      prompt: 'Na tabela Contratos, o que é cada coisa?',
      categories: ['Coluna', 'Linha', 'Chave estrangeira'],
      items: [
        { text: '"Valor"', cat: 0, why: 'Uma característica.' },
        { text: 'O contrato 045/2026 com todos os campos', cat: 1, why: 'Um registro completo.' },
        { text: '"CNPJ do fornecedor"', cat: 2, why: 'Aponta para a tabela Fornecedores.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Linha: um registro completo', 'Chave primária: nunca se repete', 'Chave estrangeira: identifica a linha sem repetir'],
      bug: 2,
      why: 'Quem identifica sem repetir é a chave primária. A estrangeira liga a outra tabela.',
      fixed: 'Chave estrangeira: aponta para a chave de outra tabela',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual escolha de chave primária é melhor para a tabela Servidores?',
      scenarios: [
        { title: 'Escolha A', body: 'Coluna "Nome": "Maria Souza", "José Lima"...' },
        { title: 'Escolha B', body: 'Coluna "CPF": cada servidor tem o seu.' },
      ],
      answer: 1,
      why: 'Nomes podem se repetir; o CPF identifica cada pessoa sem repetir.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.005' },
  ],
  summary: [
    'No banco relacional, cada tabela reúne um assunto (Fornecedores, Contratos).',
    'Coluna: uma característica (CNPJ, nome). Linha: um registro completo (um fornecedor).',
    'Chave primária: identifica cada linha sem repetir, como o CPF.',
    'Chave estrangeira: aponta para a chave de outra tabela e liga as duas (daí "relacional").',
    'SQL: a linguagem para pedir, incluir, alterar e apagar dados.',
  ],
};
