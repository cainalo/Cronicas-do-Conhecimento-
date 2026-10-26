// Série "Qualidade, testes e dívida técnica" (cap.es.02, trecho qualidade), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta da ISO 9126 à pirâmide de testes; as seguintes
// ensinam os atributos de qualidade, os tipos de teste, e revisão, refatoração e dívida técnica, uma
// ideia por etapa. Fatos conferidos com o texto do capítulo (03-qualidade.md). Revisão editorial
// humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.es.02', sectionId: 'qualidade' } as const;

export const esQuaHistoria: MicroLesson = {
  ...S,
  id: 'es.qualidade.1',
  series: { id: 'es.qualidade', order: 1 },
  title: 'Como se aprendeu a medir qualidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O que significa um software "de qualidade"?',
    options: [
      { text: 'Atender a várias características, como desempenho, confiabilidade e manutenibilidade', why: 'Isso. Esta aula conta como essas características foram organizadas.' },
      { text: 'Ter tela bonita', why: 'A aparência é só uma parte; há muitas características.' },
      { text: 'Ter muitas linhas de código', why: 'Quantidade de código não mede qualidade.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'iso',
      part: 'A história',
      title: '1991 a 2023: da ISO 9126 à 25010',
      art: 'livro',
      goal: 'Situar a ISO/IEC 25010 e suas edições.',
      explain:
        'Em **1991**, a norma **ISO/IEC 9126** organizou a qualidade de software em **características**.\n\nEm **2011**, ela foi substituída pela **ISO/IEC 25010**, com **oito** características: adequação funcional, eficiência de desempenho, compatibilidade, usabilidade, confiabilidade, segurança, manutenibilidade e portabilidade.\n\nA revisão de **2023** acrescentou a **proteção** (*safety*) e renomeou algumas, como usabilidade para **capacidade de interação**.',
      check: {
        kind: 'choice',
        id: 'is-c',
        prompt: 'Qual é a norma de referência atual para qualidade de produto de software?',
        options: [
          { text: 'ISO/IEC 25010', why: 'Isso.' },
          { text: 'ISO 9001', why: 'A 9001 trata de gestão da qualidade em geral.' },
          { text: 'RFC 6749', why: 'A RFC 6749 é o OAuth 2.0.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A norma é uma **ficha de inspeção** de veículo: em vez de dizer só "carro bom", confere **freios**, **faróis**, **pneus**, **emissão**. A ISO/IEC 25010 faz isso com o software: uma lista de características a avaliar.',
        check: {
          kind: 'choice',
          id: 'is-r',
          prompt: 'Quantas características tinha a edição de 2011 da ISO/IEC 25010?',
          options: [
            { text: 'Oito', why: 'Isso.' },
            { text: 'Três', why: 'Eram oito.' },
            { text: 'Vinte e três', why: '23 são os padrões GoF.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'divida',
      part: 'A história',
      title: '1992 e 1999: dívida técnica e refatoração',
      art: 'balanca',
      goal: 'Saber de onde vêm os termos dívida técnica e refatoração.',
      explain:
        'Em **1992**, **Ward Cunningham** comparou atalhos no código a uma **dívida**: entregar mais rápido hoje é como pegar um empréstimo, e os **juros** aparecem depois, em cada mudança mais lenta.\n\nEm **1999**, **Martin Fowler** publicou *Refactoring*, que popularizou a **refatoração**: melhorar a estrutura interna **sem mudar o comportamento**. É assim que se **paga** a dívida.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Quem cunhou a metáfora da dívida técnica?',
        options: [
          { text: 'Ward Cunningham', why: 'Isso, em 1992.' },
          { text: 'Martin Fowler', why: 'Fowler popularizou a refatoração, em 1999.' },
          { text: 'Barry Boehm', why: 'Boehm é do modelo espiral.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no **cartão de crédito**: comprar hoje e pagar depois resolve na hora, mas, se a fatura não é paga, os **juros** crescem. Atalhos no código são essa compra; refatorar é **pagar a fatura** aos poucos.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'Quem publicou o livro Refactoring, em 1999?',
          options: [
            { text: 'Martin Fowler', why: 'Isso.' },
            { text: 'Ward Cunningham', why: 'Cunningham é da metáfora da dívida.' },
            { text: 'Kent Beck', why: 'Beck é do XP.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'piramide',
      part: 'A história',
      title: '2009: a pirâmide de testes',
      art: 'degraus',
      goal: 'Saber de onde vem a pirâmide de testes.',
      explain:
        'Em **2009**, **Mike Cohn** popularizou a **pirâmide de testes**:\n\n- na **base**, **muitos** testes **unitários**, rápidos e baratos;\n- no meio, **menos** testes de **integração**;\n- no topo, **poucos** testes de **ponta a ponta**, lentos e frágeis.\n\nA ideia: testar o máximo possível **embaixo**, onde é mais barato.',
      check: {
        kind: 'order',
        id: 'pi-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['ISO/IEC 9126 (1991)', 'Dívida técnica de Cunningham (1992)', 'Refactoring de Fowler (1999)', 'Pirâmide de testes de Cohn (2009)', 'ISO/IEC 25010 (2011)'],
        why: 'Da primeira norma à norma atual, passando pelas práticas.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma **pirâmide de verdade** tem a base **larga** e o topo **estreito**. Assim também os testes: muitos pequenos embaixo, que seguram tudo; poucos grandes em cima. De cabeça para baixo, ela tomba.',
        check: {
          kind: 'choice',
          id: 'pi-r',
          prompt: 'Na pirâmide, quais testes devem ser mais numerosos?',
          options: [
            { text: 'Os unitários', why: 'Isso.' },
            { text: 'Os de ponta a ponta', why: 'Pegadinha: esses ficam no topo, em menor número.' },
            { text: 'Todos iguais', why: 'A pirâmide pede muitos unitários e poucos de ponta a ponta.' },
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
      items: ['ISO 9126 (1991)', 'Dívida técnica (1992)', 'Refactoring (1999)', 'ISO 25010 (2011)', 'Revisão da 25010 (2023)'],
      why: 'Normas e práticas de qualidade ao longo do tempo.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem está ligado a cada ideia?',
      categories: ['Cunningham', 'Fowler', 'Cohn'],
      items: [
        { text: 'Dívida técnica', cat: 0, why: '1992.' },
        { text: 'Refatoração', cat: 1, why: '1999.' },
        { text: 'Pirâmide de testes', cat: 2, why: '2009.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['ISO 25010 substituiu a 9126', 'Revisão de 2023 acrescentou a proteção', 'Pirâmide: mais testes de ponta a ponta'],
      bug: 2,
      why: 'A pirâmide pede mais unitários e poucos de ponta a ponta.',
      fixed: 'Pirâmide: mais testes unitários',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    '1991: ISO/IEC 9126. 2011: ISO/IEC 25010, com oito características. 2023: revisão acrescenta a proteção.',
    '1992: Ward Cunningham e a dívida técnica. 1999: Martin Fowler e a refatoração.',
    '2009: Mike Cohn e a pirâmide de testes.',
  ],
};

export const esQuaAtributos: MicroLesson = {
  ...S,
  id: 'es.qualidade.2',
  series: { id: 'es.qualidade', order: 2 },
  title: 'Atributos de qualidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"O sistema ficou no ar 99,9% do mês." Isso mede qual atributo?',
    options: [
      { text: 'Disponibilidade', why: 'Isso. Esta aula mostra os cinco atributos do edital e como medi-los.' },
      { text: 'Manutenibilidade', why: 'Manutenibilidade é facilidade de corrigir e evoluir.' },
      { text: 'Usabilidade', why: 'Usabilidade é facilidade de uso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'desempenho',
      part: 'Os atributos',
      title: 'Desempenho e escalabilidade',
      art: 'engrenagem',
      goal: 'Distinguir desempenho de escalabilidade e saber como medir.',
      explain:
        '- **Desempenho**: quão **rápido** e com que **uso de recursos**? Mede-se por **tempo de resposta** (percentil 95), **vazão**, CPU e memória;\n- **escalabilidade**: o sistema **aguenta mais carga** acrescentando recursos? Mede-se pela **vazão** conforme se adicionam instâncias.\n\nUm sistema pode ser rápido com 10 usuários e não escalar para 10 mil.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: '"Com o dobro de servidores, o sistema atende quase o dobro de requisições." Isso mostra boa:',
        options: [
          { text: 'Escalabilidade', why: 'Isso.' },
          { text: 'Confiabilidade', why: 'Confiabilidade é funcionar sem falhas por um período.' },
          { text: 'Usabilidade', why: 'Usabilidade é facilidade de uso.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um **caixa de banco** rápido tem bom **desempenho**. Se, ao abrir **mais caixas**, a fila diminui na mesma proporção, a agência tem boa **escalabilidade**. Rapidez de um e capacidade de crescer são coisas diferentes.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Por que usar o percentil 95 do tempo de resposta?',
          options: [
            { text: 'Para medir a experiência da maioria, sem esconder as lentidões na média', why: 'Isso.' },
            { text: 'Porque é o valor mais baixo', why: 'O p95 mostra o tempo que 95% não ultrapassam.' },
            { text: 'Porque é obrigatório por lei', why: 'É uma boa prática de medição.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'disponibilidade',
      part: 'Os atributos',
      title: 'Disponibilidade e confiabilidade',
      art: 'nuvem',
      goal: 'Distinguir disponibilidade de confiabilidade e conhecer o MTBF.',
      explain:
        '- **Disponibilidade**: está **acessível quando necessário**? Mede-se pelo **percentual de tempo no ar**, como 99,9%;\n- **confiabilidade**: funciona **sem falhas** por um período? Mede-se pelo **tempo médio entre falhas** (**MTBF**) e pela taxa de erros.\n\nUm sistema que cai rápido e volta rápido pode ter boa disponibilidade e baixa confiabilidade.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'O MTBF mede:',
        options: [
          { text: 'O tempo médio entre falhas, para confiabilidade', why: 'Isso.' },
          { text: 'O tempo médio de reparo', why: 'Isso é o MTTR, ligado à manutenibilidade.' },
          { text: 'O número de usuários', why: 'Mede tempo entre falhas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um **carro** que quebra **toda semana**, mas o mecânico **conserta em 5 minutos**, quase nunca fica parado (**disponível**), mas não é **confiável**. Confiabilidade é **quanto tempo ele roda** sem quebrar.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: '"No ar 99,9% do tempo" é medida de:',
          options: [
            { text: 'Disponibilidade', why: 'Isso.' },
            { text: 'Desempenho', why: 'Desempenho é rapidez e uso de recursos.' },
            { text: 'Escalabilidade', why: 'Escalabilidade é crescer com recursos.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'manutenibilidade',
      part: 'Os atributos',
      title: 'Manutenibilidade',
      art: 'revisao',
      goal: 'Saber o que é manutenibilidade e como medi-la.',
      explain:
        '**Manutenibilidade**: é **fácil de corrigir e evoluir**?\n\nMede-se pelo **tempo médio de reparo** (**MTTR**), pela **complexidade** do código e pela **cobertura de testes**.\n\nCódigo com alta coesão, baixo acoplamento, testes e sem duplicação tem **alta manutenibilidade**: mudar uma regra leva pouco tempo e pouco risco.',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'Qual medida está ligada à manutenibilidade?',
        options: [
          { text: 'MTTR, o tempo médio de reparo', why: 'Isso.' },
          { text: 'Percentual de tempo no ar', why: 'Isso é disponibilidade.' },
          { text: 'Vazão por instância', why: 'Isso é escalabilidade.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um **armário bem organizado**, com etiquetas, permite achar e trocar uma peça em **minutos**. Um armário bagunçado transforma a mesma troca numa **tarde inteira**. Manutenibilidade é a arrumação do código.',
        check: {
          kind: 'choice',
          id: 'ma-r',
          prompt: 'Mais cobertura de testes tende a:',
          options: [
            { text: 'Aumentar a manutenibilidade', why: 'Isso: mudar fica mais seguro.' },
            { text: 'Reduzir a manutenibilidade', why: 'Testes dão segurança para mudar.' },
            { text: 'Não ter relação', why: 'É uma das medidas de manutenibilidade.' },
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
      prompt: 'Qual atributo cada medida avalia?',
      categories: ['Disponibilidade', 'Confiabilidade', 'Manutenibilidade'],
      items: [
        { text: '99,9% do tempo no ar', cat: 0, why: 'Tempo acessível.' },
        { text: 'MTBF', cat: 1, why: 'Tempo entre falhas.' },
        { text: 'MTTR', cat: 2, why: 'Tempo de reparo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Desempenho: tempo de resposta e vazão', 'Escalabilidade: aguenta mais carga com mais recursos', 'MTTR: tempo médio entre falhas'],
      bug: 2,
      why: 'MTTR é o tempo médio de reparo; entre falhas é o MTBF.',
      fixed: 'MTTR: tempo médio de reparo',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O contrato diz "o portal deve ser estável". Qual redação mede melhor?',
      scenarios: [
        { title: 'Opção A', body: '"Disponibilidade mensal de 99,9% e tempo de resposta até 2 s no percentil 95."' },
        { title: 'Opção B', body: '"O portal deve funcionar bem quase sempre."' },
      ],
      answer: 0,
      why: 'A opção A usa medidas verificáveis de disponibilidade e desempenho.',
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Desempenho: tempo de resposta (p95), vazão, CPU e memória. Escalabilidade: vazão ao acrescentar instâncias.',
    'Disponibilidade: percentual no ar. Confiabilidade: MTBF e taxa de erros.',
    'Manutenibilidade: MTTR, complexidade, cobertura de testes. Referência: ISO/IEC 25010.',
  ],
};

export const esQuaTestes: MicroLesson = {
  ...S,
  id: 'es.qualidade.3',
  series: { id: 'es.qualidade', order: 3 },
  title: 'Tipos de teste',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Teste de carga e teste de estresse são a mesma coisa?',
    options: [
      { text: 'Não: carga usa a carga esperada; estresse vai além do limite', why: 'Isso. Esta aula mostra os tipos de teste.' },
      { text: 'Sim, são sinônimos', why: 'Pegadinha: o estresse passa do limite até quebrar.' },
      { text: 'Estresse é o teste mais leve', why: 'É o mais pesado: vai além da capacidade.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'niveis',
      part: 'Os tipos',
      title: 'Unitário, integração, funcional, aceitação',
      art: 'degraus',
      goal: 'Distinguir os níveis de teste.',
      explain:
        '- **Unitário**: a **menor unidade isolada** (função, classe), com dependências simuladas (*mocks*). Ex.: o cálculo de juros de mora;\n- **integração**: a **comunicação** entre componentes. Ex.: o serviço gravando de fato no banco;\n- **funcional**: o sistema faz **o que os requisitos pedem**, do ponto de vista do usuário (caixa-preta);\n- **aceitação**: o **usuário aceita** a entrega, conferindo os critérios de aceite.',
      check: {
        kind: 'choice',
        id: 'ni-c',
        prompt: 'Testar se o serviço realmente grava no banco de dados é um teste de:',
        options: [
          { text: 'Integração', why: 'Isso: comunicação entre componentes.' },
          { text: 'Unitário', why: 'O unitário isola a unidade, simulando o banco.' },
          { text: 'Estresse', why: 'Estresse trata de carga além do limite.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Na **montagem de um carro**: testar **cada peça** na bancada é unitário; testar se o **motor conversa com o câmbio** é integração; dirigir para ver se o carro **faz o que se espera** é funcional; o **cliente aprovar** na entrega é aceitação.',
        check: {
          kind: 'choice',
          id: 'ni-r',
          prompt: 'Mocks são típicos de qual teste?',
          options: [
            { text: 'Unitário', why: 'Isso: simulam as dependências para isolar a unidade.' },
            { text: 'Aceitação', why: 'Na aceitação, o usuário usa o sistema real.' },
            { text: 'Carga', why: 'Carga usa o sistema completo sob uso.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'carga',
      part: 'Os tipos',
      title: 'Regressão, carga e estresse',
      art: 'engrenagem',
      goal: 'Distinguir regressão, carga e estresse.',
      explain:
        '- **Regressão**: o que funcionava **continua funcionando** depois de mudanças. Ex.: rodar toda a suíte a cada *commit*;\n- **carga**: o comportamento sob a carga **esperada**. Ex.: 2.000 usuários no último dia de prazo;\n- **estresse**: o comportamento **além do limite**, **até quebrar**, e a **recuperação**. Ex.: dobrar a carga até a falha.',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Para ver como o sistema se comporta além da capacidade máxima, até falhar, e como se recupera, aplica-se o teste de:',
        options: [
          { text: 'Estresse', why: 'Isso.' },
          { text: 'Carga', why: 'Carga é a carga esperada, não além do limite.' },
          { text: 'Regressão', why: 'Regressão confere se nada quebrou após mudanças.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Numa **ponte**: o teste de **carga** passa com os caminhões **previstos** e confere que ela aguenta. O de **estresse** põe **cada vez mais peso** até ela ceder, para saber **onde** é o limite e se ela volta ao normal.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'O teste de regressão é feito:',
          options: [
            { text: 'A cada mudança', why: 'Isso.' },
            { text: 'Só na primeira versão', why: 'Pegadinha: é feito a cada mudança.' },
            { text: 'Nunca', why: 'É essencial após mudanças.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'caixas',
      part: 'Técnicas',
      title: 'Caixa-branca, caixa-preta e automação',
      art: 'alvo',
      goal: 'Distinguir caixa-branca de caixa-preta e entender o papel da automação.',
      explain:
        '- **Caixa-branca**: **conhece o código**; mede cobertura de comandos e de desvios;\n- **caixa-preta**: só **entradas e saídas**; usa **partição de equivalência** e **valor-limite**.\n\n**Testes automatizados** são a base da **integração contínua**: sem eles, cada entrega exige retestar tudo à mão.',
      check: {
        kind: 'choice',
        id: 'cx-c',
        prompt: 'Testar os valores 17, 18 e 19 para uma regra "maior de 18 anos" é técnica de:',
        options: [
          { text: 'Valor-limite, caixa-preta', why: 'Isso.' },
          { text: 'Cobertura de desvios, caixa-branca', why: 'Cobertura de desvios olha o código por dentro.' },
          { text: 'Teste de estresse', why: 'Estresse trata de carga.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Os erros moram **nas bordas**: quem escreveu "maior" quis dizer "maior ou igual"? Por isso o **valor-limite** testa **logo antes, no limite e logo depois**. É caixa-preta: você só olha a regra, não o código.',
        check: {
          kind: 'choice',
          id: 'cx-r',
          prompt: 'Medir a cobertura de comandos do código é técnica de:',
          options: [
            { text: 'Caixa-branca', why: 'Isso: exige conhecer o código.' },
            { text: 'Caixa-preta', why: 'A caixa-preta não olha o código.' },
            { text: 'Aceitação', why: 'Aceitação é do usuário.' },
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
      prompt: 'Qual teste cada situação descreve?',
      categories: ['Carga', 'Estresse', 'Regressão'],
      items: [
        { text: '2.000 usuários no último dia de prazo', cat: 0, why: 'Carga esperada.' },
        { text: 'Dobrar a carga até a falha', cat: 1, why: 'Além do limite.' },
        { text: 'Rodar a suíte inteira a cada commit', cat: 2, why: 'Nada quebrou?' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Unitário: unidade isolada', 'Integração: comunicação entre componentes', 'Estresse: carga normal esperada'],
      bug: 2,
      why: 'Carga normal é o teste de carga; o estresse vai além do limite.',
      fixed: 'Estresse: além do limite',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Cada entrega quebra algo que já funcionava. O que falta?',
      scenarios: [
        { title: 'Opção A', body: '**Testes de regressão automatizados**, rodando a cada mudança.' },
        { title: 'Opção B', body: 'Mais testes de estresse, uma vez por ano.' },
      ],
      answer: 0,
      why: 'A regressão automatizada detecta o que quebrou logo após cada mudança.',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.010' }],
  summary: [
    'Unitário (unidade isolada, mocks), integração (comunicação), funcional (requisitos, caixa-preta), aceitação (usuário).',
    'Regressão (nada quebrou), carga (carga esperada), estresse (além do limite e recuperação).',
    'Caixa-branca (cobertura) e caixa-preta (partição, valor-limite). Automação sustenta a integração contínua.',
  ],
};

export const esQuaRefatoracao: MicroLesson = {
  ...S,
  id: 'es.qualidade.4',
  series: { id: 'es.qualidade', order: 4 },
  title: 'Revisão, refatoração e dívida técnica',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Refatorar é acrescentar funcionalidades ao sistema?',
    options: [
      { text: 'Não: é melhorar a estrutura sem mudar o comportamento', why: 'Isso. Esta aula mostra revisão, refatoração e dívida técnica.' },
      { text: 'Sim', why: 'Pegadinha: na refatoração, o comportamento externo não muda.' },
      { text: 'É apagar o sistema e começar de novo', why: 'Refatorar é melhorar aos poucos, sem mudar o comportamento.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'revisao',
      part: 'Revisão',
      title: 'Revisão de código',
      art: 'pessoal',
      goal: 'Saber para que serve a revisão de código.',
      explain:
        'Na **revisão de código** (*code review*), **outra pessoa** examina a mudança **antes de integrá-la**, por exemplo num *pull request*.\n\nEla **encontra defeitos cedo**, **espalha conhecimento** pela equipe e **mantém padrões**.\n\nFerramentas de **análise estática** complementam, mas **não substituem** a revisão humana.',
      check: {
        kind: 'multi',
        id: 'rv-c',
        prompt: 'Quais são benefícios da revisão de código? Marque todos.',
        options: [
          { text: 'Encontrar defeitos cedo', correct: true, why: 'Isso.' },
          { text: 'Espalhar conhecimento', correct: true, why: 'Isso.' },
          { text: 'Manter padrões', correct: true, why: 'Isso.' },
          { text: 'Dispensar todos os testes', correct: false, why: 'Revisão e testes se complementam.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É a **revisão do parecer** antes de assinar: um colega lê, aponta um erro de cálculo, sugere uma redação melhor e, de quebra, **aprende** sobre o caso. A ferramenta automática é o **corretor ortográfico**: ajuda, mas não lê o mérito.',
        check: {
          kind: 'choice',
          id: 'rv-r',
          prompt: 'Análise estática substitui a revisão humana?',
          options: [
            { text: 'Não: complementa', why: 'Isso.' },
            { text: 'Sim, totalmente', why: 'Ela não avalia o mérito e o desenho como uma pessoa.' },
            { text: 'Só em Java', why: 'Em nenhuma linguagem ela substitui a revisão.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'refatorar',
      part: 'Refatoração',
      title: 'Melhorar sem mudar o comportamento',
      art: 'revisao',
      goal: 'Aplicar a refatoração e reconhecer code smells.',
      explain:
        '**Refatoração**: melhorar a **estrutura interna** do código **sem alterar o comportamento externo**. Ela **depende de testes** para garantir que nada mudou.\n\nExemplos: **extrair método**, **renomear**, **remover duplicação**.\n\n***Code smells*** (maus cheiros) indicam a hora de refatorar: método **longo**, classe **gigante**, código **duplicado**, **muitos parâmetros**.',
      check: {
        kind: 'choice',
        id: 'rf-c',
        prompt: 'Refatorar um código significa:',
        options: [
          { text: 'Melhorar a estrutura interna sem alterar o comportamento externo', why: 'Isso.' },
          { text: 'Acrescentar funcionalidades', why: 'Isso é evolução, não refatoração.' },
          { text: 'Corrigir requisitos com o cliente', why: 'Isso é validação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Refatorar é **reorganizar a cozinha** sem mudar o cardápio: os pratos que saem são os mesmos, mas agora tudo está ao alcance. Os **testes** são o **provador**: conferem que o prato continua com o mesmo sabor.',
        check: {
          kind: 'choice',
          id: 'rf-r',
          prompt: 'Um método de 400 linhas é um exemplo de:',
          options: [
            { text: 'Code smell', why: 'Isso: método longo.' },
            { text: 'Boa prática', why: 'Métodos longos dificultam a manutenção.' },
            { text: 'Teste de estresse', why: 'É um sinal de que é hora de refatorar.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'divida',
      part: 'Dívida técnica',
      title: 'Deliberada, inadvertida e visível',
      art: 'balanca',
      goal: 'Classificar a dívida técnica e saber como gerenciá-la.',
      explain:
        '**Dívida técnica** é o custo futuro de atalhos de hoje: código apressado, falta de testes, arquitetura que não acompanhou o crescimento. Ela gera **juros**: cada mudança fica mais lenta e arriscada.\n\n- **Deliberada**: atalho **consciente**, com plano de pagamento;\n- **inadvertida**: por **desconhecimento**.\n\nDeve ser **visível**: registrada no *backlog* e paga aos poucos. Regra do escoteiro: deixe o código **melhor do que encontrou**.',
      check: {
        kind: 'choice',
        id: 'dv-c',
        prompt: 'Para cumprir um prazo legal, a equipe publicou sem testes e registrou no backlog a correção. Isso ilustra:',
        options: [
          { text: 'Dívida técnica deliberada, visível, a ser paga', why: 'Isso.' },
          { text: 'Dívida técnica inadvertida', why: 'Foi um atalho consciente: deliberada.' },
          { text: 'Refatoração', why: 'A refatoração vai pagar a dívida depois.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pegar um **empréstimo** sabendo que vai pagar, com **parcelas anotadas**, é dívida **deliberada** e controlada. Descobrir uma conta esquecida que **não sabia** que tinha é dívida **inadvertida**. Nos dois casos, anote e pague.',
        check: {
          kind: 'choice',
          id: 'dv-r',
          prompt: 'A regra do escoteiro diz:',
          options: [
            { text: 'Deixe o código melhor do que encontrou', why: 'Isso.' },
            { text: 'Nunca mexa em código alheio', why: 'É o contrário: melhore um pouco a cada passagem.' },
            { text: 'Reescreva tudo do zero', why: 'A ideia é melhorar aos poucos.' },
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
      prompt: 'A dívida técnica é deliberada ou inadvertida?',
      categories: ['Deliberada', 'Inadvertida'],
      items: [
        { text: 'Pular testes para cumprir prazo, com plano de correção', cat: 0, why: 'Atalho consciente.' },
        { text: 'Duplicar regra sabendo e registrando no backlog', cat: 0, why: 'Atalho consciente.' },
        { text: 'Usar um padrão errado por desconhecimento', cat: 1, why: 'Não se sabia.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Refatorar depende de testes', 'Dívida técnica gera juros', 'Refatorar é acrescentar funcionalidades'],
      bug: 2,
      why: 'Na refatoração, o comportamento externo não muda.',
      fixed: 'Refatorar é melhorar a estrutura',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'A equipe quer melhorar um módulo antigo e sem testes. Por onde começar?',
      scenarios: [
        { title: 'Opção A', body: 'Escrever **testes** do comportamento atual e depois **refatorar** em passos pequenos.' },
        { title: 'Opção B', body: 'Refatorar tudo de uma vez, sem testes, e ver se algo quebra.' },
      ],
      answer: 0,
      why: 'A refatoração depende de testes para garantir que o comportamento não mudou.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.es.02.012' },
  ],
  summary: [
    'Revisão de código: acha defeitos cedo, espalha conhecimento, mantém padrões; análise estática complementa.',
    'Refatoração: melhorar a estrutura sem mudar o comportamento, com testes. Code smells: método longo, classe gigante, duplicação.',
    'Dívida técnica: custo futuro de atalhos, com juros. Deliberada ou inadvertida; visível no backlog; regra do escoteiro.',
  ],
};
