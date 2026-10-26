// Série "Porcentagem, acréscimos e descontos" (cap.mat.01, trecho porcentagem), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta do imposto romano ao símbolo %; as seguintes
// ensinam porcentagem como fração e fator multiplicativo, depois sucessivos, problema reverso e ponto
// percentual, uma ideia por etapa. Contas conferidas com o texto do capítulo (04-porcentagem.md).
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'porcentagem' } as const;

export const matPctHistoria: MicroLesson = {
  ...S,
  id: 'mat.porcentagem.1',
  series: { id: 'mat.porcentagem', order: 1 },
  title: 'Do imposto romano ao símbolo %',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Num anúncio, "desconto de 10%". De cada R$ 100 do preço, quanto você deixa de pagar?',
    options: [
      { text: 'R$ 10', why: 'Isso: "por cento" quer dizer "a cada cem". Esta aula conta de onde veio essa ideia.' },
      { text: 'R$ 1', why: 'R$ 1 seria 1% de R$ 100.' },
      { text: 'R$ 90', why: 'R$ 90 é o que você paga; o desconto é R$ 10.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'roma',
      part: 'A história',
      title: 'Roma: o imposto do centésimo',
      art: 'abaco',
      goal: 'Ver na Roma antiga a ideia de contar "por cem".',
      explain:
        'No tempo do imperador **Augusto**, Roma cobrava a ***centesima rerum venalium***: um imposto de **um centésimo** sobre as **vendas**.\n\nA cada **100** moedas vendidas, **1** ia para o império.\n\nContar "**por cem**" facilitava o cálculo, porque dividir por 100 é fácil. Hoje diríamos: um imposto de **1%**.',
      check: {
        kind: 'choice',
        id: 'ro-c',
        prompt: 'Com o imposto de um centésimo, numa venda de 500 moedas, quanto ia para Roma?',
        options: [
          { text: '5 moedas', why: 'Isso: 1 a cada 100; 500 tem cinco centenas.' },
          { text: '50 moedas', why: '50 seria um décimo (10%).' },
          { text: '1 moeda', why: '1 moeda a cada 100; em 500, são 5.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Separe a venda em **montes de 100**: 500 moedas são **5 montes**. De cada monte sai 1 moeda. Ao todo, **5 moedas**. É isso que "1%" quer dizer: 1 a cada 100.',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: 'Um centésimo é o mesmo que:',
          options: [
            { text: '1%', why: 'Isso: 1/100.' },
            { text: '10%', why: '10% é um décimo.' },
            { text: '100%', why: '100% é o inteiro.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'simbolo',
      part: 'A história',
      title: 'Século XV: nasce o %',
      art: 'livro',
      goal: 'Saber a origem do símbolo %.',
      explain:
        'Nos **manuscritos comerciais italianos**, por volta do **século XV**, os mercadores escreviam muito a expressão ***per cento***, "**por cento**".\n\nDe tanto ser abreviada à mão, ela foi virando o símbolo **%**.\n\nPor isso **25%** se lê "**vinte e cinco por cento**": 25 a cada 100.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'De onde vem o símbolo %?',
        options: [
          { text: 'Da abreviação de "per cento" em manuscritos italianos', why: 'Isso.' },
          { text: 'De uma tecla inventada para os computadores', why: 'É muito mais antigo que os computadores.' },
          { text: 'Do imposto de Augusto', why: 'O imposto é a ideia; o símbolo veio no século XV.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em como abreviamos "você" para "vc" de tanto escrever. Os mercadores italianos fizeram isso com **per cento** durante décadas, até sobrar só o desenho **%**. O sinal guarda a ideia: "por cem".',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: '25% quer dizer:',
          options: [
            { text: '25 a cada 100', why: 'Isso.' },
            { text: '25 a cada 10', why: 'Seria 250%.' },
            { text: '100 a cada 25', why: 'É o contrário.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'fator',
      part: 'A história',
      title: 'Hoje: o fator multiplicativo',
      art: 'chip',
      goal: 'Ver por que o fator multiplicativo se tornou o método mais seguro.',
      explain:
        'Com a **calculadora**, o jeito mais seguro de lidar com reajustes, descontos e juros passou a ser **multiplicar por um único número**: o **fator**.\n\n- Aumento de **10%**: multiplicar por **1,10**.\n- Desconto de **10%**: multiplicar por **0,90**.\n\nEm controle externo, isso aparece em tudo: **reajuste de contrato**, **execução orçamentária**, **glosa** de pagamento. A próxima aula mostra como montar cada fator.',
      check: {
        kind: 'choice',
        id: 'fa-c',
        prompt: 'Um contrato de R$ 1.000 tem aumento de 10%. Multiplicando pelo fator 1,10, qual o novo valor?',
        options: [
          { text: 'R$ 1.100', why: 'Isso: 1.000 × 1,10.' },
          { text: 'R$ 1.010', why: '10% de 1.000 é 100, não 10.' },
          { text: 'R$ 110', why: '110 é 10% de 1.100; o novo valor é 1.100.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O fator 1,10 tem duas partes: o **1** (o valor inteiro, 100%) e o **0,10** (os 10% a mais). Multiplicar por 1,10 é ficar com **tudo** e **mais 10%** de uma só vez: 1.000 + 100 = **1.100**.',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'Qual fator aplica um desconto de 10%?',
          options: [
            { text: '0,90', why: 'Isso: fica com 90%.' },
            { text: '1,10', why: '1,10 é aumento de 10%.' },
            { text: '0,10', why: '0,10 dá só os 10%, não o valor com desconto.' },
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
      items: ['Imposto do centésimo no tempo de Augusto', 'Símbolo % nos manuscritos italianos (século XV)', 'Fator multiplicativo com a calculadora'],
      why: 'A ideia de "por cem", o símbolo e o método atual.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['1% é um centésimo', '% vem de "per cento"', 'Desconto de 10%: multiplicar por 1,10'],
      bug: 2,
      why: '1,10 é aumento; desconto de 10% é multiplicar por 0,90.',
      fixed: 'Desconto de 10%: multiplicar por 0,90',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'Aumento ou desconto?',
      categories: ['Aumento', 'Desconto'],
      items: [
        { text: 'Multiplicar por 1,05', cat: 0, why: 'Mais 5%.' },
        { text: 'Multiplicar por 0,80', cat: 1, why: 'Menos 20%.' },
        { text: 'Multiplicar por 1,30', cat: 0, why: 'Mais 30%.' },
      ],
    },
  ],
  exam: [],
  summary: [
    'Roma (Augusto): imposto de um centésimo sobre as vendas, a ideia de contar "por cem".',
    'Século XV: "per cento" abreviado nos manuscritos italianos virou o símbolo %.',
    'Hoje: o fator multiplicativo. Aumento de 10%: × 1,10; desconto de 10%: × 0,90.',
  ],
};

export const matPctFator: MicroLesson = {
  ...S,
  id: 'mat.porcentagem.2',
  series: { id: 'mat.porcentagem', order: 2 },
  title: 'Porcentagem como fração e o fator',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Dos 72 processos de um setor, 54 foram julgados no prazo. Como saber que porcentagem isso representa?',
    options: [
      { text: 'Dividindo 54 por 72', why: 'Isso: dá 0,75, ou 75%. Esta aula mostra essa e outras contas.' },
      { text: 'Subtraindo 72 − 54', why: 'A diferença diz quantos ficaram fora do prazo, não a porcentagem.' },
      { text: 'Multiplicando 54 × 72', why: 'Porcentagem de quanto A é de B é uma divisão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'fracao',
      part: 'Porcentagem',
      title: 'Porcentagem é fração de 100',
      art: 'abaco',
      goal: 'Converter porcentagem em fração e decimal.',
      explain:
        '**p% = p/100**.\n\n- 25% = 0,25 = **1/4**\n- 12,5% = 0,125 = **1/8**\n- 150% = **1,5**\n\nCalcular **p% de um valor** é **multiplicar**: 18% de R$ 2.500 = 0,18 × 2.500 = **R$ 450**.',
      check: {
        kind: 'choice',
        id: 'fr-c',
        prompt: 'Quanto é 15% de R$ 2.000?',
        options: [
          { text: 'R$ 300', why: 'Isso: 0,15 × 2.000.' },
          { text: 'R$ 30', why: '0,15 × 2.000 = 300.' },
          { text: 'R$ 1.700', why: '1.700 é o que sobra depois de tirar 15%.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Use **10%** como base: 10% de 2.000 é **200** (basta tirar um zero). 5% é a metade, **100**. 15% = 10% + 5% = **300**. Confira com o decimal: 0,15 × 2.000 = 300.',
        check: {
          kind: 'choice',
          id: 'fr-r',
          prompt: '25% é a mesma coisa que:',
          options: [
            { text: '1/4', why: 'Isso: 25/100 = 1/4.' },
            { text: '1/25', why: '1/25 é 4%.' },
            { text: '2,5', why: '2,5 é 250%.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'de-de',
      part: 'Porcentagem',
      title: 'Que porcentagem A é de B',
      art: 'balanca',
      goal: 'Calcular que porcentagem um valor é de outro e porcentagem de porcentagem.',
      explain:
        '**Que porcentagem A é de B?** Faça **A ÷ B**.\n\n54 de 72 processos no prazo: 54/72 = 0,75 = **75%**.\n\n**Porcentagem de porcentagem multiplica**:\n\n30% de 40% = 0,3 × 0,4 = 0,12 = **12%**. Não é 70%, nem 10%.',
      check: {
        kind: 'choice',
        id: 'dd-c',
        prompt: 'Num órgão, 40% dos servidores são da TI, e 25% desses trabalham com redes. Que porcentagem do total trabalha com redes?',
        options: [
          { text: '10%', why: 'Isso: 0,4 × 0,25 = 0,10.' },
          { text: '65%', why: 'Porcentagem de porcentagem multiplica, não soma.' },
          { text: '15%', why: 'Não se subtrai: 0,4 × 0,25.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine **100 servidores**: 40% são da TI, ou seja, **40**. Desses 40, 25% trabalham com redes: **10**. Dez de cem é **10%**. "De" em porcentagem quer dizer **vezes**.',
        check: {
          kind: 'choice',
          id: 'dd-r',
          prompt: '"30% de 40% é 70%." Isso está:',
          options: [
            { text: 'Errado: é 12%', why: 'Isso: 0,3 × 0,4.' },
            { text: 'Certo', why: 'Porcentagem de porcentagem multiplica.' },
            { text: 'Errado: é 10%', why: '0,3 × 0,4 = 0,12, ou 12%.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'fatores',
      part: 'Fator',
      title: 'Montar o fator',
      art: 'chip',
      goal: 'Montar o fator de acréscimo e de desconto.',
      explain:
        '- **Acréscimo de p%**: fator **1 + p/100**. +8% → **× 1,08**.\n- **Desconto de p%**: fator **1 − p/100**. −15% → **× 0,85**.\n\nExemplo: R$ 200 com desconto de 15%: 200 × 0,85 = **R$ 170**. Numa conta só, sem precisar calcular os 15% à parte.',
      check: {
        kind: 'sort',
        id: 'ft-c',
        prompt: 'Qual o fator de cada operação?',
        categories: ['× 1,12', '× 0,88', '× 0,12'],
        items: [
          { text: 'Aumento de 12%', cat: 0, why: '1 + 0,12.' },
          { text: 'Desconto de 12%', cat: 1, why: '1 − 0,12.' },
          { text: 'Calcular só os 12%', cat: 2, why: 'A parte, sem o valor inteiro.' },
        ],
      },
      recovery: {
        explain: 'O **1** do fator é o valor inteiro. Num **aumento**, você fica com o inteiro **e mais** a parte (1 + 0,12). Num **desconto**, fica com o inteiro **menos** a parte (1 − 0,12 = 0,88). Só "0,12" dá a parte sozinha.',
        check: {
          kind: 'choice',
          id: 'ft-r',
          prompt: 'Qual o fator de um aumento de 5%?',
          options: [
            { text: '1,05', why: 'Isso.' },
            { text: '1,5', why: '1,5 é aumento de 50%.' },
            { text: '0,95', why: '0,95 é desconto de 5%.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'variacao',
      part: 'Fator',
      title: 'Variação percentual',
      art: 'progresso',
      goal: 'Calcular a variação percentual entre dois valores.',
      explain:
        '**Variação percentual** = **(novo ÷ antigo) − 1**.\n\nDe 200 para 230: 230/200 − 1 = 1,15 − 1 = **0,15 = 15%** de aumento.\n\nDe 250 para 200: 200/250 − 1 = 0,8 − 1 = **−0,20 = 20%** de redução.\n\nA base é sempre o **valor antigo**.',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'Um contrato passou de R$ 80.000 para R$ 92.000. Qual a variação?',
        options: [
          { text: 'Aumento de 15%', why: 'Isso: 92/80 = 1,15.' },
          { text: 'Aumento de 12%', why: '12.000 em relação a 80.000 é 15%.' },
          { text: 'Aumento de 13%', why: 'Divida o novo pelo antigo: 1,15.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Dois caminhos dão o mesmo resultado. **1)** Fator: 92.000 ÷ 80.000 = **1,15**; tire o 1: **15%**. **2)** Diferença sobre o antigo: 12.000 ÷ 80.000 = **0,15**. A base é sempre o valor de **antes**.',
        check: {
          kind: 'choice',
          id: 'va-r',
          prompt: 'Na variação percentual, a base da comparação é:',
          options: [
            { text: 'O valor antigo', why: 'Isso.' },
            { text: 'O valor novo', why: 'Comparar com o novo dá outro número.' },
            { text: 'Sempre 100', why: 'A base é o valor antigo, qualquer que seja.' },
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
      lines: ['18% de 2.500 = 450', '54 de 72 = 75%', 'Desconto de 15%: × 1,15'],
      bug: 2,
      why: 'Desconto de 15% é × 0,85; × 1,15 é aumento.',
      fixed: 'Desconto de 15%: × 0,85',
      errorKind: 'confusao',
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene, do menor ao maior.',
      items: ['12,5%', '0,25', '1/2', '150%'],
      why: '0,125; 0,25; 0,5; 1,5.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a dotação de um órgão era R$ 500 mil e foi para R$ 450 mil. Qual a variação?',
      options: [
        { text: 'Redução de 10%', why: 'Isso: 450/500 = 0,9.' },
        { text: 'Redução de 50%', why: 'Caiu 50 mil de 500 mil: 10%.' },
        { text: 'Redução de 11%', why: 'A base é o antigo (500): 50/500 = 10%.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'p% = p/100. p% de um valor: multiplique (0,18 × 2.500 = 450).',
    'Que porcentagem A é de B: A ÷ B. Porcentagem de porcentagem multiplica.',
    'Fator: acréscimo 1 + p/100; desconto 1 − p/100.',
    'Variação percentual: novo ÷ antigo − 1. A base é o valor antigo.',
  ],
};

export const matPctSucessivos: MicroLesson = {
  ...S,
  id: 'mat.porcentagem.3',
  series: { id: 'mat.porcentagem', order: 3 },
  title: 'Sucessivos, problema reverso e ponto percentual',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um preço sobe 50% e depois cai 50%. Volta ao valor inicial?',
    options: [
      { text: 'Não: fica 25% abaixo', why: 'Isso: 1,5 × 0,5 = 0,75. Esta aula mostra por que percentuais sucessivos se multiplicam.' },
      { text: 'Sim: um cancela o outro', why: 'Parece, mas o segundo incide sobre uma base maior. Esta aula mostra a conta.' },
      { text: 'Fica 50% acima', why: 'Faça com R$ 100: sobe para 150 e cai para 75.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'sucessivos',
      part: 'Sucessivos',
      title: 'Percentuais sucessivos se multiplicam',
      art: 'degraus',
      goal: 'Calcular acréscimos e descontos sucessivos com o fator acumulado.',
      explain:
        'Contrato de **R$ 250.000**: reajuste de **8%** e, depois, supressão de **5%** sobre o valor reajustado.\n\n- 250.000 × 1,08 = 270.000;\n- 270.000 × 0,95 = **256.500**.\n\nFator acumulado: **1,08 × 0,95 = 1,026**: aumento de **2,6%**.\n\nSomar 8% com −5% e dizer "3%" é o **erro típico**. Cada percentual incide sobre a **base já alterada**.',
      check: {
        kind: 'choice',
        id: 'su-c',
        prompt: 'Um contrato de R$ 400.000 tem acréscimo de 15% e, depois, supressão de 20%. Em relação ao inicial, o final representa:',
        options: [
          { text: 'Redução de 8%', why: 'Isso: 1,15 × 0,80 = 0,92.' },
          { text: 'Redução de 5%', why: 'Somou as taxas; elas se multiplicam.' },
          { text: 'Redução de 20%', why: 'Considerou só a última operação.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça com **R$ 100** para enxergar. Sobe 15%: **115**. Cai 20% **de 115**: 115 × 0,80 = **92**. De 100 para 92: **8% a menos**. Os 20% foram tirados de uma base maior (115), por isso tiraram mais que 15.',
        check: {
          kind: 'choice',
          id: 'su-r',
          prompt: 'Dois descontos sucessivos de 10% equivalem a:',
          options: [
            { text: 'Um desconto de 19%', why: 'Isso: 0,9 × 0,9 = 0,81.' },
            { text: 'Um desconto de 20%', why: 'O segundo incide sobre 90, não sobre 100: 19%.' },
            { text: 'Um desconto de 10%', why: 'São dois descontos: o total passa de 10%.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'tabela',
      part: 'Sucessivos',
      title: 'Casos que caem em prova',
      art: 'cartao',
      goal: 'Reconhecer os fatores acumulados mais comuns.',
      explain:
        '- **+10% e −10%**: 1,10 × 0,90 = **0,99**: redução de **1%**.\n- **+20% e +20%**: 1,20 × 1,20 = **1,44**: aumento de **44%**.\n- **−20% e −10%**: 0,80 × 0,90 = **0,72**: desconto total de **28%**.\n- **+25% e −20%**: 1,25 × 0,80 = **1,00**: volta ao inicial.\n\nA **ordem não importa**: +10% e depois −10% dá o mesmo que −10% e depois +10%.',
      check: {
        kind: 'choice',
        id: 'tb-c',
        prompt: 'Dois aumentos sucessivos de 20% resultam em:',
        options: [
          { text: 'Aumento de 44%', why: 'Isso: 1,2 × 1,2 = 1,44.' },
          { text: 'Aumento de 40%', why: 'O segundo incide sobre 120: dá 144.' },
          { text: 'Aumento de 22%', why: 'Multiplique os fatores: 1,44.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Com **R$ 100**: +20% dá **120**; +20% de 120 é +24, chegando a **144**. O ganho total é 44, não 40, porque o segundo aumento "cobra juros" sobre o primeiro.',
        check: {
          kind: 'choice',
          id: 'tb-r',
          prompt: '+25% e depois −20% levam a:',
          options: [
            { text: 'O valor inicial', why: 'Isso: 1,25 × 0,80 = 1.' },
            { text: 'Aumento de 5%', why: 'Os fatores se multiplicam: 1,00.' },
            { text: 'Redução de 5%', why: '1,25 × 0,80 = 1,00.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'reverso',
      part: 'Reverso',
      title: 'Descobrir o valor original',
      art: 'revisao',
      goal: 'Resolver o problema reverso dividindo pelo fator.',
      explain:
        'Se o valor **depois** de um aumento de 25% é **R$ 450**, o original é **450 ÷ 1,25 = R$ 360**. Conferência: 360 × 1,25 = 450.\n\nO **erro clássico** é tirar 25% de 450 (450 × 0,75 = 337,50). Errado, porque os 25% foram calculados sobre o **original**, não sobre o novo.\n\nDesconto também: depois de **12%** de desconto, R$ 13.200. Original: 13.200 ÷ 0,88 = **R$ 15.000**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Após reajuste de 12%, o contrato passou a R$ 33.600. Qual era o valor antes?',
        options: [
          { text: 'R$ 30.000', why: 'Isso: 33.600 ÷ 1,12.' },
          { text: 'R$ 29.568', why: 'Tirou 12% de 33.600; o reajuste foi sobre o valor antigo.' },
          { text: 'R$ 28.000', why: 'Dividiu por 1,2, confundindo 12% com 20%.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense de trás para a frente: **antigo × 1,12 = novo**. Para voltar, faça a operação contrária: **novo ÷ 1,12 = antigo**. 33.600 ÷ 1,12 = **30.000**. Confira sempre multiplicando de volta: 30.000 × 1,12 = 33.600.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: '"Se um preço subiu 20% e passou a R$ 120, o antigo era R$ 96." Isso está:',
          options: [
            { text: 'Errado: era R$ 100 (120 ÷ 1,2)', why: 'Isso. 96 sai de tirar 20% de 120.' },
            { text: 'Certo', why: '96 × 1,2 = 115,20, não 120.' },
            { text: 'Errado: era R$ 144', why: '144 seria aplicar mais 20%.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'regra-tres',
      part: 'Reverso',
      title: 'Porcentagem por regra de três',
      art: 'abaco',
      goal: 'Resolver porcentagem com regra de três, com o total valendo 100%.',
      explain:
        'Toda porcentagem pode ser resolvida por **regra de três simples direta**, com o **total valendo 100%**.\n\nUm órgão empenhou **R$ 3,6 milhões**, o que corresponde a **45%** da dotação. Dotação:\n\n3,6 está para 45 assim como x está para 100\n\n**x = 3,6 × 100 / 45 = R$ 8 milhões**.\n\nConferência: 45% de 8 = 3,6.',
      check: {
        kind: 'choice',
        id: 'rt-c',
        prompt: 'R$ 1,2 milhão correspondem a 30% de uma verba. Qual é a verba?',
        options: [
          { text: 'R$ 4 milhões', why: 'Isso: 1,2 × 100 / 30.' },
          { text: 'R$ 3,6 milhões', why: 'Multiplicou por 3; o certo é 1,2 ÷ 0,3.' },
          { text: 'R$ 1,56 milhão', why: 'Somou 30%; o total é 1,2 ÷ 0,3.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Passe por **10%**: se 30% valem 1,2, então **10%** valem 1,2 ÷ 3 = **0,4**. O total, **100%**, vale 10 × 0,4 = **4 milhões**. Confira: 30% de 4 = 1,2.',
        check: {
          kind: 'choice',
          id: 'rt-r',
          prompt: 'Na regra de três de porcentagem, o total vale:',
          options: [
            { text: '100%', why: 'Isso.' },
            { text: '1%', why: '1% é um centésimo do total.' },
            { text: '10%', why: '10% é um décimo do total.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pontos',
      part: 'Ponto percentual',
      title: 'Ponto percentual ou variação relativa',
      art: 'alvo',
      goal: 'Distinguir ponto percentual de variação relativa.',
      explain:
        'A taxa de processos julgados no prazo passou de **40%** para **50%**:\n\n- a **diferença** é de **10 pontos percentuais** (50 − 40);\n- o **aumento relativo** é de **25%** (10 ÷ 40).\n\nAs duas leituras estão certas, mas medem coisas diferentes. A banca gosta de alternativas que dizem "**aumentou 10%**" nesse caso, o que está **errado**.',
      check: {
        kind: 'choice',
        id: 'po-c',
        prompt: 'Uma taxa passou de 5% para 6%. Como descrever corretamente?',
        options: [
          { text: '1 ponto percentual, ou 20% em termos relativos', why: 'Isso: 1 ÷ 5 = 0,2.' },
          { text: 'Aumento de 1%', why: 'A diferença de taxas é em pontos percentuais; o relativo é 20%.' },
          { text: '20 pontos percentuais', why: 'Os 20% são o relativo; a diferença é 1 ponto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Ponto percentual** é a distância entre as duas taxas, como numa régua: de 40 a 50, **10 pontos**. **Variação relativa** compara essa distância com o ponto de partida: 10 em relação a 40 é **25%**. Régua ou comparação: são perguntas diferentes.',
        check: {
          kind: 'choice',
          id: 'po-r',
          prompt: 'De 40% para 50%, qual o aumento relativo?',
          options: [
            { text: '25%', why: 'Isso: 10 ÷ 40.' },
            { text: '10%', why: '10 é em pontos percentuais.' },
            { text: '20%', why: 'A base é a taxa inicial, 40: 10 ÷ 40 = 25%.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['+10% e −10%: redução de 1%', 'Valor antes do aumento: dividir pelo fator', 'De 40% para 50%: aumentou 10%'],
      bug: 2,
      why: 'São 10 pontos percentuais, ou 25% em termos relativos.',
      fixed: 'De 40% para 50%: 10 pontos percentuais (25% relativo)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual o resultado de cada sequência?',
      categories: ['Volta ao inicial', 'Fica abaixo', 'Fica acima'],
      items: [
        { text: '+25% e −20%', cat: 0, why: '1,25 × 0,8 = 1.' },
        { text: '+50% e −50%', cat: 1, why: '1,5 × 0,5 = 0,75.' },
        { text: '+20% e +20%', cat: 2, why: '1,44.' },
        { text: '+10% e −10%', cat: 1, why: '0,99.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Após 12% de desconto, uma licença custou R$ 13.200. Qual cálculo dá o preço original?',
      scenarios: [
        { title: 'Cálculo A', body: '13.200 × 1,12 = 14.784' },
        { title: 'Cálculo B', body: '13.200 ÷ 0,88 = 15.000' },
      ],
      answer: 1,
      why: 'O desconto foi sobre o original: original × 0,88 = 13.200. Divide-se pelo fator.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.010' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.011' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.012' },
  ],
  summary: [
    'Percentuais sucessivos se multiplicam: +8% e −5% dá 1,08 × 0,95 = 1,026 (+2,6%), não +3%.',
    '+10% e −10%: −1%. +20% e +20%: +44%. +25% e −20%: volta. A ordem não importa.',
    'Valor original: divida pelo fator (450 ÷ 1,25 = 360). Não tire a porcentagem do valor novo.',
    'Regra de três com o total valendo 100%.',
    'Ponto percentual é a diferença entre taxas; variação relativa divide essa diferença pela taxa inicial.',
  ],
};
