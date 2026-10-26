// Série "Requisitos" (cap.es.01, trecho requisitos), no ritmo lento com história pedido em 25/10/2026:
// a primeira aula conta dos casos de uso de Jacobson às histórias com INVEST e BDD; as seguintes
// ensinam requisitos funcionais e não funcionais, a engenharia de requisitos, e histórias com casos
// de uso, uma ideia por etapa. Fatos conferidos com o texto do capítulo (02-requisitos.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.es.01', sectionId: 'requisitos' } as const;

export const esReqHistoria: MicroLesson = {
  ...S,
  id: 'es.requisitos.1',
  series: { id: 'es.requisitos', order: 1 },
  title: 'Como se aprendeu a escrever requisitos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um pedido como "o sistema tem que ser rápido" basta para a equipe construir?',
    options: [
      { text: 'Não: é vago; precisa ser medível', why: 'Isso. Esta aula conta como os requisitos ganharam forma.' },
      { text: 'Sim, todo mundo sabe o que é rápido', why: 'Cada um entende "rápido" de um jeito.' },
      { text: 'Sim, desde que seja escrito em maiúsculas', why: 'A forma de escrever não resolve a imprecisão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'casos',
      part: 'A história',
      title: '1987 e 1997: casos de uso e UML',
      art: 'pessoal',
      goal: 'Saber de onde vêm os casos de uso.',
      explain:
        'Em **1987**, o sueco **Ivar Jacobson** apresentou os **casos de uso**: descrever o sistema pelas **interações** entre **atores** (pessoas ou sistemas externos) e o sistema, para atingir um objetivo.\n\nEm **1997**, o OMG adotou a **UML**, linguagem de modelagem unificada por **Grady Booch**, **James Rumbaugh** e o próprio **Jacobson**. O **diagrama de casos de uso** faz parte dela.',
      check: {
        kind: 'choice',
        id: 'cu-c',
        prompt: 'O que um caso de uso descreve?',
        options: [
          { text: 'A interação entre atores e o sistema para atingir um objetivo', why: 'Isso.' },
          { text: 'As tabelas do banco de dados', why: 'Isso é modelagem de dados.' },
          { text: 'O código-fonte das telas', why: 'O caso de uso descreve o comportamento, não o código.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **roteiro de atendimento** de balcão: "o cidadão chega, apresenta o documento, o servidor confere, o sistema emite a certidão". Quem participa são os **atores**; o objetivo é a certidão. Isso é um caso de uso.',
        check: {
          kind: 'choice',
          id: 'cu-r',
          prompt: 'Quem apresentou os casos de uso em 1987?',
          options: [
            { text: 'Ivar Jacobson', why: 'Isso.' },
            { text: 'Kent Beck', why: 'Kent Beck é do XP.' },
            { text: 'Barry Boehm', why: 'Boehm é do modelo espiral.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'historias',
      part: 'A história',
      title: 'Anos 1990 e 2003: histórias e INVEST',
      art: 'livro',
      goal: 'Saber de onde vêm as histórias de usuário e o INVEST.',
      explain:
        'Com o **XP**, nos anos **1990**, os requisitos passaram a ser escritos como **histórias de usuário**: frases curtas, do ponto de vista de quem usa, que viram conversa com a equipe.\n\nEm **2003**, **Bill Wake** propôs o acrônimo **INVEST** para lembrar como é uma boa história: independente, negociável, valiosa, estimável, pequena e testável.',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'As histórias de usuário ganharam força com qual método?',
        options: [
          { text: 'Extreme Programming (XP)', why: 'Isso.' },
          { text: 'Modelo cascata', why: 'A cascata usava documentos de especificação extensos.' },
          { text: 'Modelo em V', why: 'O V liga especificações a testes.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Em vez de um **caderno de 200 páginas**, a história é um **cartão**: "Como auditor, quero filtrar por fornecedor...". O cartão é o lembrete de uma **conversa**. Bill Wake deu a lista de conferência para um bom cartão: INVEST.',
        check: {
          kind: 'choice',
          id: 'hi-r',
          prompt: 'Quem propôs o acrônimo INVEST?',
          options: [
            { text: 'Bill Wake', why: 'Isso, em 2003.' },
            { text: 'Ivar Jacobson', why: 'Jacobson é dos casos de uso.' },
            { text: 'Winston Royce', why: 'Royce é do artigo de 1970.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'bdd',
      part: 'A história',
      title: 'Anos 2000: dado, quando, então',
      art: 'alvo',
      goal: 'Saber de onde vem o formato Given/When/Then.',
      explain:
        'Em meados dos anos **2000**, **Dan North** propôs o **BDD** (desenvolvimento guiado por comportamento) e popularizou o formato **Given/When/Then**: **dado** um contexto, **quando** ocorre uma ação, **então** espera-se um resultado.\n\nEsse formato virou uma forma comum de escrever **critérios de aceite**, que dizem quando uma história está atendida.',
      check: {
        kind: 'order',
        id: 'bd-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Casos de uso de Jacobson (1987)', 'UML adotada pelo OMG (1997)', 'INVEST de Bill Wake (2003)'],
        why: 'Dos casos de uso às boas histórias.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O Given/When/Then é uma **receita de teste** em linguagem comum: **dado** que há 3 contratos do fornecedor X; **quando** filtro por X; **então** vejo os 3 e o total. Qualquer pessoa entende, e a equipe consegue testar.',
        check: {
          kind: 'choice',
          id: 'bd-r',
          prompt: 'Em critérios de aceite, "então" introduz:',
          options: [
            { text: 'O resultado esperado', why: 'Isso.' },
            { text: 'O contexto inicial', why: 'O contexto vem no "dado".' },
            { text: 'A ação do usuário', why: 'A ação vem no "quando".' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['Casos de uso (1987)', 'UML (1997)', 'INVEST (2003)', 'BDD com Given/When/Then (anos 2000)'],
      why: 'Das interações modeladas às histórias testáveis.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem está ligado a cada ideia?',
      categories: ['Jacobson', 'Bill Wake', 'Dan North'],
      items: [
        { text: 'Casos de uso', cat: 0, why: '1987.' },
        { text: 'INVEST', cat: 1, why: '2003.' },
        { text: 'Given/When/Then', cat: 2, why: 'BDD.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['UML unificada por Booch, Rumbaugh e Jacobson', 'Histórias ganharam força com o XP', 'INVEST veio com o modelo cascata'],
      bug: 2,
      why: 'O INVEST, de Bill Wake (2003), é para histórias de usuário, do mundo ágil.',
      fixed: 'INVEST veio para histórias ágeis',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1987: Ivar Jacobson apresenta os casos de uso. 1997: o OMG adota a UML (Booch, Rumbaugh, Jacobson).',
    'Anos 1990: histórias de usuário com o XP. 2003: Bill Wake propõe o INVEST.',
    'Anos 2000: Dan North e o BDD popularizam Given/When/Then nos critérios de aceite.',
  ],
};

export const esReqTipos: MicroLesson = {
  ...S,
  id: 'es.requisitos.2',
  series: { id: 'es.requisitos', order: 2 },
  title: 'Funcionais e não funcionais',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"O sistema deve ficar disponível 99,5% do tempo." Isso é um requisito funcional?',
    options: [
      { text: 'Não: é não funcional, uma qualidade', why: 'Isso. Esta aula separa os dois tipos.' },
      { text: 'Sim, é uma função', why: 'Disponibilidade descreve como o sistema é, não o que faz.' },
      { text: 'Não é requisito', why: 'É requisito, do tipo não funcional.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'diferenca',
      part: 'Os tipos',
      title: 'O que faz e como deve ser',
      art: 'balanca',
      goal: 'Separar requisitos funcionais de não funcionais.',
      explain:
        'Um **requisito** é uma condição ou capacidade que o sistema deve ter.\n\n- **Funcional**: **o que** o sistema faz. "O sistema deve permitir que o jurisdicionado envie a prestação de contas em PDF";\n- **não funcional**: **como** o sistema deve ser, suas qualidades e restrições. "A consulta deve responder em até 2 segundos para 95% das requisições".',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Qual requisito é NÃO funcional?',
        options: [
          { text: 'Os dados pessoais devem ser cifrados em repouso.', why: 'Isso: é uma restrição de segurança.' },
          { text: 'O sistema deve permitir anexar documentos ao processo.', why: 'Descreve uma função.' },
          { text: 'O sistema deve emitir certidão negativa.', why: 'Descreve uma função.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **carro**: "levar cinco pessoas" é **o que ele faz** (funcional). "Fazer 15 km por litro" e "ter airbag" é **como ele deve ser** (não funcional). Se a frase começa com uma **ação** do sistema, é funcional; se fala de **qualidade**, não funcional.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: '"O sistema deve permitir filtrar contratos por fornecedor" é:',
          options: [
            { text: 'Funcional', why: 'Isso: é uma função.' },
            { text: 'Não funcional', why: 'Não fala de qualidade; descreve o que o sistema faz.' },
            { text: 'Não é requisito', why: 'É um requisito funcional.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'nf',
      part: 'Não funcionais',
      title: 'Os tipos de qualidade',
      art: 'engrenagem',
      goal: 'Reconhecer os requisitos não funcionais comuns.',
      explain:
        'Requisitos não funcionais comuns:\n\n- **desempenho** e **escalabilidade**;\n- **disponibilidade**;\n- **segurança**;\n- **usabilidade** e **acessibilidade**;\n- **manutenibilidade** e **portabilidade**;\n- **conformidade legal**, como a **LGPD**.',
      check: {
        kind: 'multi',
        id: 'nf-c',
        prompt: 'Quais são requisitos não funcionais? Marque todos.',
        options: [
          { text: 'Disponibilidade de 99,5%', correct: true, why: 'Isso.' },
          { text: 'Atender à LGPD', correct: true, why: 'Isso: conformidade legal.' },
          { text: 'Ser acessível por leitor de tela', correct: true, why: 'Isso: acessibilidade.' },
          { text: 'Emitir boleto de multa', correct: false, why: 'É uma função: requisito funcional.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Os não funcionais respondem a perguntas do tipo **"quão"**: quão **rápido**? quão **disponível**? quão **seguro**? quão **fácil de usar**? quão **fácil de manter**? E também "de acordo com qual **lei**?".',
        check: {
          kind: 'choice',
          id: 'nf-r',
          prompt: '"O sistema deve suportar o dobro de usuários sem perder desempenho" trata de:',
          options: [
            { text: 'Escalabilidade', why: 'Isso.' },
            { text: 'Portabilidade', why: 'Portabilidade é rodar em outros ambientes.' },
            { text: 'Usabilidade', why: 'Usabilidade é facilidade de uso.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'mensuravel',
      part: 'Não funcionais',
      title: 'Bom requisito é mensurável',
      art: 'alvo',
      goal: 'Reescrever um requisito vago de forma mensurável.',
      explain:
        'Um bom requisito não funcional é **mensurável**.\n\n- "O sistema deve ser **rápido**": não serve. Rápido para quem? Quanto?\n- "A consulta deve responder em **até 2 segundos** para **95%** das requisições": serve. Dá para **testar**.\n\nSe não dá para medir, não dá para saber se foi atendido.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'Qual versão do requisito é melhor?',
        options: [
          { text: 'O sistema deve estar disponível em 99,5% do tempo mensal.', why: 'Isso: mensurável.' },
          { text: 'O sistema deve estar quase sempre no ar.', why: '"Quase sempre" não é medível.' },
          { text: 'O sistema deve ser muito bom.', why: 'Vago: não dá para testar.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine que você é o **fiscal do contrato** e precisa dizer se o fornecedor cumpriu. "Rápido" vira briga. "Até 2 segundos em 95% das consultas" vira **conta**: mede-se e pronto.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Por que "fácil de usar" é um requisito fraco?',
          options: [
            { text: 'Porque não é mensurável', why: 'Isso: falta um critério de medida.' },
            { text: 'Porque usabilidade não é requisito', why: 'É, mas precisa ser medida.' },
            { text: 'Porque é funcional', why: 'É não funcional; o problema é a falta de medida.' },
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
      prompt: 'Funcional ou não funcional?',
      categories: ['Funcional', 'Não funcional'],
      items: [
        { text: 'Enviar prestação de contas em PDF', cat: 0, why: 'Função.' },
        { text: 'Filtrar contratos por fornecedor', cat: 0, why: 'Função.' },
        { text: 'Responder em até 2 s para 95% das consultas', cat: 1, why: 'Desempenho.' },
        { text: 'Cifrar dados pessoais em repouso', cat: 1, why: 'Segurança.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Funcional: o que o sistema faz', 'Não funcional: como deve ser', 'Disponibilidade de 99,5%: funcional'],
      bug: 2,
      why: 'Disponibilidade é uma qualidade: requisito não funcional.',
      fixed: 'Disponibilidade de 99,5%: não funcional',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O termo de referência diz: "o portal deve ser seguro". Como melhorar?',
      scenarios: [
        { title: 'Opção A', body: '"Senhas armazenadas com hash e sal; acesso administrativo com MFA; dados pessoais cifrados em repouso."' },
        { title: 'Opção B', body: '"O portal deve ser muito seguro mesmo."' },
      ],
      answer: 0,
      why: 'A opção A detalha critérios verificáveis; a B continua vaga.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.006' }],
  summary: [
    'Funcional: o que o sistema faz. Não funcional: como deve ser (qualidades e restrições).',
    'Não funcionais: desempenho, escalabilidade, disponibilidade, segurança, usabilidade, acessibilidade, manutenibilidade, portabilidade, conformidade (LGPD).',
    'Bom requisito não funcional é mensurável: "até 2 s para 95%", não "rápido".',
  ],
};

export const esReqEngenharia: MicroLesson = {
  ...S,
  id: 'es.requisitos.3',
  series: { id: 'es.requisitos', order: 3 },
  title: 'A engenharia de requisitos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Estamos construindo o produto certo?" Que atividade responde a essa pergunta?',
    options: [
      { text: 'A validação', why: 'Isso. Esta aula percorre as atividades e separa validação de verificação.' },
      { text: 'A verificação', why: 'Verificação pergunta se o produto foi feito do jeito certo.' },
      { text: 'O levantamento', why: 'O levantamento coleta as necessidades; não as confirma.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'atividades',
      part: 'As atividades',
      title: 'Levantar, analisar, especificar',
      art: 'trilha',
      goal: 'Conhecer as três primeiras atividades da engenharia de requisitos.',
      explain:
        '- **Levantamento** (elicitação): **entrevistas**, oficinas, questionários, **observação**, análise de documentos, **prototipação**;\n- **análise**: resolver **conflitos**, **priorizar** e modelar. Uma técnica de priorização é o **MoSCoW**: *must*, *should*, *could*, *won\'t*;\n- **especificação**: documentar de forma **clara**, **sem ambiguidade** e **verificável**.',
      check: {
        kind: 'choice',
        id: 'at-c',
        prompt: 'O MoSCoW é uma técnica de:',
        options: [
          { text: 'Priorização, na análise', why: 'Isso.' },
          { text: 'Levantamento por entrevista', why: 'Entrevista é técnica de levantamento.' },
          { text: 'Teste automatizado', why: 'MoSCoW prioriza requisitos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O MoSCoW é a **lista de mudança** de casa: o que **tem** que ir (must), o que **deveria** ir (should), o que **poderia** ir se couber (could) e o que **não vai** desta vez (won\'t).',
        check: {
          kind: 'choice',
          id: 'at-r',
          prompt: 'Observar os servidores trabalhando para entender o processo é técnica de:',
          options: [
            { text: 'Levantamento', why: 'Isso: observação.' },
            { text: 'Validação', why: 'Validação confirma requisitos já documentados.' },
            { text: 'Gerenciamento', why: 'Gerenciamento controla mudanças e rastreabilidade.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'validacao',
      part: 'As atividades',
      title: 'Validação e verificação',
      art: 'balanca',
      goal: 'Distinguir validação de verificação.',
      explain:
        '- **Validação**: confirmar com os interessados que os requisitos representam **a necessidade real**. "Estamos construindo o **produto certo**?";\n- **verificação**: conferir se o produto foi feito **do jeito certo**, conforme a especificação.\n\nUm sistema pode passar na verificação (fiel ao documento) e falhar na validação (o documento não era o que o usuário precisava).',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'Confirmar com os interessados que os requisitos representam a necessidade real é:',
        options: [
          { text: 'Validação', why: 'Isso.' },
          { text: 'Verificação', why: 'Verificação confere a fidelidade à especificação.' },
          { text: 'Especificação', why: 'Especificar é documentar.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um **alfaiate** pode costurar o terno **exatamente** conforme as medidas anotadas (verificação ok). Mas se anotou as medidas **da pessoa errada**, o terno não serve (validação falhou). Validar é conferir **com o cliente**.',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: '"O código segue a especificação?" é pergunta de:',
          options: [
            { text: 'Verificação', why: 'Isso: feito do jeito certo.' },
            { text: 'Validação', why: 'Validação pergunta se é o produto certo.' },
            { text: 'Levantamento', why: 'Levantamento coleta necessidades.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'gerenciamento',
      part: 'As atividades',
      title: 'Gerenciamento e rastreabilidade',
      art: 'revisao',
      goal: 'Saber o que é gerenciar requisitos e rastreá-los.',
      explain:
        'O **gerenciamento** de requisitos controla **mudanças**, **versões** e **rastreabilidade**.\n\n**Rastreabilidade** é poder seguir um requisito **do pedido ao código e ao teste**: de onde veio, onde foi implementado, qual teste o confere.\n\nQuando a lei muda, a rastreabilidade mostra **o que** precisa ser alterado e **o que** precisa ser testado de novo.',
      check: {
        kind: 'choice',
        id: 'ge-c',
        prompt: 'Rastreabilidade de requisitos permite:',
        options: [
          { text: 'Seguir o requisito até o código e o teste', why: 'Isso.' },
          { text: 'Rastrear o celular do usuário', why: 'Não; trata da ligação entre requisito, código e teste.' },
          { text: 'Apagar requisitos antigos', why: 'Rastrear é ligar, não apagar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **número de protocolo** de um processo: com ele, você acha a origem, cada despacho e a decisão. A rastreabilidade dá esse "protocolo" ao requisito: pedido, código e teste ligados.',
        check: {
          kind: 'order',
          id: 'ge-r',
          prompt: 'Ordene as atividades da engenharia de requisitos.',
          items: ['Levantamento', 'Análise', 'Especificação', 'Validação', 'Gerenciamento'],
          why: 'Coletar, analisar, documentar, confirmar e controlar.',
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Cada pergunta é de validação ou de verificação?',
      categories: ['Validação', 'Verificação'],
      items: [
        { text: 'É isso que o auditor precisa?', cat: 0, why: 'Produto certo.' },
        { text: 'O requisito reflete a necessidade real?', cat: 0, why: 'Produto certo.' },
        { text: 'A tela segue o especificado?', cat: 1, why: 'Feito do jeito certo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['MoSCoW: priorização', 'Rastreabilidade: requisito ao código e ao teste', 'Validação: o código segue a especificação'],
      bug: 2,
      why: 'Isso é verificação; validação confirma a necessidade real.',
      fixed: 'Validação: o produto certo',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A lei mudou o prazo de recurso. Como saber o que alterar no sistema?',
      scenarios: [
        { title: 'Opção A', body: 'Usar a **rastreabilidade** do requisito de prazo até o código e os testes.' },
        { title: 'Opção B', body: 'Procurar no código, linha por linha, sem referência.' },
      ],
      answer: 0,
      why: 'A rastreabilidade aponta o que implementa e o que testa o requisito.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.007' }],
  summary: [
    'Levantamento (entrevistas, observação, prototipação), análise (conflitos, MoSCoW), especificação (clara e verificável).',
    'Validação: produto certo (necessidade real). Verificação: feito do jeito certo (conforme a especificação).',
    'Gerenciamento: mudanças, versões e rastreabilidade do requisito ao código e ao teste.',
  ],
};

export const esReqHistorias: MicroLesson = {
  ...S,
  id: 'es.requisitos.4',
  series: { id: 'es.requisitos', order: 4 },
  title: 'Histórias e casos de uso',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Como auditor, quero filtrar contratos por fornecedor, para identificar concentração de gastos." Que formato é esse?',
    options: [
      { text: 'Uma história de usuário', why: 'Isso: papel, ação e benefício. Esta aula mostra histórias e casos de uso.' },
      { text: 'Um caso de uso com fluxos', why: 'O caso de uso tem atores e fluxos; aqui é uma história.' },
      { text: 'Um requisito não funcional', why: 'Descreve uma função desejada, em forma de história.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'invest',
      part: 'Histórias',
      title: 'Como, quero, para e INVEST',
      art: 'livro',
      goal: 'Escrever histórias e conferi-las pelo INVEST.',
      explain:
        'Formato comum: **Como** [papel], **quero** [ação], **para** [benefício].\n\nBoas histórias seguem o **INVEST**:\n\n- **I**ndependente;\n- **N**egociável;\n- **V**aliosa;\n- **E**stimável;\n- **S**mall, pequena;\n- **T**estável: dá para saber, com critérios claros, se foi atendida.',
      check: {
        kind: 'choice',
        id: 'iv-c',
        prompt: 'No INVEST, a letra T significa que a história deve ser:',
        options: [
          { text: 'Testável', why: 'Isso.' },
          { text: 'Técnica', why: 'A história é do ponto de vista do usuário.' },
          { text: 'Temporária', why: 'T é de testável.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia o INVEST como uma **lista de conferência**: dá para fazer **sozinha**? Dá para **conversar** sobre ela? **Vale a pena**? Dá para **estimar**? É **pequena**? Dá para **testar**? Seis sins, boa história.',
        check: {
          kind: 'choice',
          id: 'iv-r',
          prompt: 'Na história, o trecho "para identificar concentração de gastos" é:',
          options: [
            { text: 'O benefício', why: 'Isso.' },
            { text: 'O papel', why: 'O papel é "auditor".' },
            { text: 'A ação', why: 'A ação é "filtrar contratos por fornecedor".' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'aceite',
      part: 'Histórias',
      title: 'Critérios de aceite',
      art: 'alvo',
      goal: 'Escrever critérios de aceite em Dado/Quando/Então.',
      explain:
        'Os **critérios de aceite** definem quando **cada história** está atendida. Uma forma comum é a do BDD:\n\n> **Dado** que existem 3 contratos do fornecedor X, **quando** o auditor filtrar por X, **então** o sistema exibe os 3 contratos e o valor total.\n\nNão confunda com a **Definição de Pronto**: o critério é **de cada história**; a Definição de Pronto vale para **todo incremento**.',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'Critério de aceite e Definição de Pronto:',
        options: [
          { text: 'São diferentes: um é de cada história; o outro vale para todo incremento', why: 'Isso.' },
          { text: 'São a mesma coisa', why: 'Pegadinha: têm alcances diferentes.' },
          { text: 'Só existem no modelo cascata', why: 'São usados em métodos ágeis.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Numa **obra**: o critério de aceite é "**esta janela** abre e fecha sem ranger" (de um item). A Definição de Pronto é "**todo cômodo** entregue está limpo, pintado e vistoriado" (regra geral).',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'No critério "Dado..., quando..., então...", o "quando" traz:',
          options: [
            { text: 'A ação', why: 'Isso.' },
            { text: 'O contexto', why: 'O contexto vem no "dado".' },
            { text: 'O resultado', why: 'O resultado vem no "então".' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'casos',
      part: 'Casos de uso',
      title: 'Fluxos, include e extend',
      art: 'rede',
      goal: 'Distinguir include de extend no diagrama de casos de uso.',
      explain:
        'Um caso de uso tem **fluxo principal** (sucesso), **fluxos alternativos** e **de exceção**, além de **pré** e **pós-condições**.\n\nNo diagrama UML:\n\n- **include**: o incluído é executado **sempre**, como "Autenticar";\n- **extend**: o estendido acontece **só em certas condições**, como "Emitir comprovante";\n- **generalização**: herança entre atores ou entre casos.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: '"Emitir comprovante" acontece só quando o usuário pede, ao final de "Enviar prestação de contas". A relação é:',
        options: [
          { text: 'extend', why: 'Isso: comportamento opcional.' },
          { text: 'include', why: 'include é obrigatório, sempre executado.' },
          { text: 'generalização', why: 'Generalização é herança.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Numa **viagem de avião**: **passar pelo raio X** acontece **sempre** (include). **Comprar no free shop** acontece **só se você quiser** (extend). Obrigatório é include; opcional é extend.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: '"Autenticar" executado sempre antes de "Consultar processo" é:',
          options: [
            { text: 'include', why: 'Isso: sempre executado.' },
            { text: 'extend', why: 'extend é opcional.' },
            { text: 'Ator', why: 'Autenticar é um caso de uso, não um ator.' },
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
      prompt: 'include ou extend?',
      categories: ['include (sempre)', 'extend (às vezes)'],
      items: [
        { text: 'Autenticar antes de qualquer consulta', cat: 0, why: 'Obrigatório.' },
        { text: 'Validar o certificado ao assinar', cat: 0, why: 'Sempre executado.' },
        { text: 'Emitir comprovante se o usuário pedir', cat: 1, why: 'Opcional.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['INVEST: T de testável', 'Critério de aceite: de cada história', 'include: comportamento opcional'],
      bug: 2,
      why: 'Opcional é o extend; o include é sempre executado.',
      fixed: 'include: comportamento obrigatório',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual critério de aceite é melhor para "filtrar contratos por fornecedor"?',
      scenarios: [
        { title: 'Opção A', body: '"**Dado** 3 contratos do fornecedor X, **quando** filtrar por X, **então** exibe os 3 e o valor total."' },
        { title: 'Opção B', body: '"O filtro deve funcionar bem."' },
      ],
      answer: 0,
      why: 'A opção A é testável; a B é vaga.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.009' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.es.01.010' },
  ],
  summary: [
    'História: Como [papel], quero [ação], para [benefício]. INVEST: independente, negociável, valiosa, estimável, pequena, testável.',
    'Critérios de aceite (Dado/Quando/Então) são de cada história; a Definição de Pronto vale para todo incremento.',
    'Casos de uso: fluxos principal, alternativos e de exceção. include: sempre; extend: só em certas condições; generalização: herança.',
  ],
};
