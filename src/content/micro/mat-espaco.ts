// Série "Espaço e tempo" (cap.mat.02, trecho espacial), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta do calendário de Júlio César ao gregoriano e ao relógio de
// pêndulo; as seguintes ensinam a aritmética do calendário, os relógios e a orientação espacial, uma
// ideia por etapa, com exemplos resolvidos. Fatos conferidos com o texto do capítulo
// (03-espaco-tempo.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.02', sectionId: 'espacial' } as const;

export const matEspHistoria: MicroLesson = {
  ...S,
  id: 'mat.espaco.1',
  series: { id: 'mat.espaco', order: 1 },
  title: 'De Júlio César ao relógio de pêndulo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Por que fevereiro às vezes tem 29 dias?',
    options: [
      { text: 'Para o calendário acompanhar o ano do Sol, que tem quase 365 dias e um quarto', why: 'Isso. Esta aula conta como se chegou a essa regra.' },
      { text: 'Por sorteio', why: 'Há uma regra precisa, que você vai ver nesta aula.' },
      { text: 'Para dar mais um feriado', why: 'O dia a mais corrige o descompasso com o ano solar.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'juliano',
      part: 'A história',
      title: '46 a.C.: o calendário juliano',
      art: 'calendario',
      goal: 'Saber de onde vem o ano bissexto a cada quatro anos.',
      explain:
        'O ano do Sol dura **quase 365 dias e um quarto**. Um calendário de 365 dias certinhos vai se **atrasando** em relação às estações.\n\nEm **46 a.C.**, **Júlio César** reformou o calendário romano: o ano passou a ter **365 dias**, com **um dia a mais a cada 4 anos**, o **ano bissexto**.\n\nEsse é o **calendário juliano**.',
      check: {
        kind: 'choice',
        id: 'ju-c',
        prompt: 'No calendário juliano, havia ano bissexto:',
        options: [
          { text: 'A cada 4 anos, sem exceção', why: 'Isso.' },
          { text: 'A cada 100 anos', why: 'Era a cada 4 anos.' },
          { text: 'Nunca', why: 'O bissexto a cada 4 anos é justamente a reforma de César.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **relógio que atrasa 6 horas por ano**. Em 4 anos, atrasou um dia inteiro. Júlio César **acertou o relógio** pondo esse dia de volta a cada 4 anos: o 29 de fevereiro.',
        check: {
          kind: 'choice',
          id: 'ju-r',
          prompt: 'Quem instituiu o calendário juliano?',
          options: [
            { text: 'Júlio César', why: 'Isso, em 46 a.C.' },
            { text: 'Gregório XIII', why: 'Gregório XIII é do calendário de 1582.' },
            { text: 'Euclides', why: 'Euclides é da geometria.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'gregoriano',
      part: 'A história',
      title: '1582: o calendário gregoriano',
      art: 'livro',
      goal: 'Saber a regra do bissexto do calendário gregoriano e por que ela surgiu.',
      explain:
        'Um quarto de dia era **um pouquinho a mais** do que o real. Em mais de mil anos, o erro somou cerca de **dez dias**.\n\nEm **1582**, o papa **Gregório XIII** promulgou a reforma: depois da quinta-feira, **4 de outubro**, veio a sexta-feira, **15 de outubro**. Os **dias da semana** seguiram em ordem.\n\nE a regra mudou: anos terminados em **00** só são bissextos se divisíveis por **400**. **2000 foi** bissexto; **1900 não foi**.',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'O ano 1900 foi bissexto?',
        options: [
          { text: 'Não: termina em 00 e não é divisível por 400', why: 'Isso.' },
          { text: 'Sim: é divisível por 4', why: 'Pegadinha: os anos terminados em 00 precisam ser divisíveis por 400.' },
          { text: 'Sim, todo ano par é bissexto', why: 'A regra é divisível por 4, com a exceção dos 00.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'A regra tem **três degraus**: divisível por 4? bissexto. **Mas** termina em 00? então não é. **Mas** é divisível por 400? então volta a ser. 2000 passa pelos três: é bissexto. 1900 para no segundo: não é.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Na reforma de 1582, o que aconteceu com os dias da semana?',
          options: [
            { text: 'Seguiram em ordem: quinta, 4, e depois sexta, 15', why: 'Isso: só os números do mês saltaram.' },
            { text: 'Saltaram dez dias também', why: 'Os dias da semana continuaram em sequência.' },
            { text: 'Foram renomeados', why: 'Os nomes não mudaram.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'pendulo',
      part: 'A história',
      title: '1656: o relógio de pêndulo',
      art: 'engrenagem',
      goal: 'Saber que o pêndulo tornou os relógios precisos.',
      explain:
        'Os relógios mecânicos antigos **erravam muitos minutos por dia**.\n\nEm **1656**, o holandês **Christiaan Huygens** construiu o **relógio de pêndulo**. O pêndulo balança sempre no mesmo ritmo, e o erro caiu para **poucos segundos por dia**.\n\nAinda hoje, as questões de prova falam de relógios que **adiantam ou atrasam**: o desvio cresce **na mesma proporção** do tempo, como você verá na terceira aula.',
      check: {
        kind: 'choice',
        id: 'pe-c',
        prompt: 'O que o pêndulo trouxe aos relógios?',
        options: [
          { text: 'Precisão: um ritmo constante', why: 'Isso.' },
          { text: 'Ponteiros coloridos', why: 'O ganho foi de precisão.' },
          { text: 'O fim dos ponteiros', why: 'Os ponteiros continuaram.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um **balanço de parque**, solto, vai e volta sempre no **mesmo tempo**. Huygens usou essa regularidade para **marcar o tempo**: cada ida e volta é um "tique" confiável.',
        check: {
          kind: 'choice',
          id: 'pe-r',
          prompt: 'Quem construiu o relógio de pêndulo em 1656?',
          options: [
            { text: 'Christiaan Huygens', why: 'Isso.' },
            { text: 'Júlio César', why: 'César é do calendário de 46 a.C.' },
            { text: 'Fibonacci', why: 'Fibonacci é das sequências.' },
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
      items: ['Calendário juliano (46 a.C.)', 'Calendário gregoriano (1582)', 'Relógio de pêndulo (1656)'],
      why: 'Do calendário romano à precisão dos relógios.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'O ano é bissexto?',
      categories: ['Bissexto', 'Não bissexto'],
      items: [
        { text: '2000', cat: 0, why: 'Termina em 00 e é divisível por 400.' },
        { text: '2024', cat: 0, why: 'Divisível por 4.' },
        { text: '1900', cat: 1, why: 'Termina em 00 e não é divisível por 400.' },
        { text: '2026', cat: 1, why: 'Não é divisível por 4.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Juliano: bissexto a cada 4 anos', 'Gregoriano: 00 só se divisível por 400', 'Em 1582, saltaram também 10 dias da semana'],
      bug: 2,
      why: 'Os dias da semana seguiram em ordem: quinta, 4, e sexta, 15.',
      fixed: 'Em 1582, os dias da semana seguiram em ordem',
      errorKind: 'leitura',
    },
  ],
  exam: [],
  summary: [
    '46 a.C.: Júlio César institui o calendário juliano, com bissexto a cada 4 anos.',
    '1582: Gregório XIII reforma o calendário; depois de 4 de outubro veio 15 de outubro; anos 00 só bissextos se divisíveis por 400.',
    '1656: Christiaan Huygens e o relógio de pêndulo.',
  ],
};

export const matEspCalendario: MicroLesson = {
  ...S,
  id: 'mat.espaco.2',
  series: { id: 'mat.espaco', order: 2 },
  title: 'A aritmética do calendário',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Hoje é sexta-feira. Daqui a 7 dias, que dia será?',
    options: [
      { text: 'Sexta-feira', why: 'Isso: 7 dias é uma semana inteira. Esta aula usa essa ideia para qualquer quantidade de dias.' },
      { text: 'Sábado', why: 'Sete dias completam a semana: volta a ser sexta.' },
      { text: 'Quinta-feira', why: 'Sete dias completam a semana: volta a ser sexta.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'resto',
      part: 'Dias',
      title: 'O resto da divisão por 7',
      art: 'calendario',
      goal: 'Achar o dia da semana daqui a n dias.',
      explain:
        'Semanas inteiras **não mudam** o dia da semana. Só importa **o que sobra**: o **resto de n ÷ 7**.\n\n- Hoje é **terça**. Daqui a **100** dias: 100 = 7 × 14 + **2**. Terça + 2 = **quinta**.\n- Hoje é **segunda**. Daqui a **1.000** dias: 1.000 = 7 × 142 + **6**. Segunda + 6 = **domingo**.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'Hoje é sexta-feira. Daqui a 30 dias será:',
        options: [
          { text: 'Domingo', why: 'Isso: 30 = 7 × 4 + 2; sexta + 2.' },
          { text: 'Sexta-feira', why: 'Pegadinha: 30 não é múltiplo de 7; sobram 2 dias.' },
          { text: 'Sábado', why: 'Sobram 2 dias, não 1: sexta + 2 = domingo.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Imagine uma **roda com 7 casas**, uma para cada dia. Dar voltas inteiras deixa você no mesmo lugar. Em 30 dias, você dá **4 voltas** (28 dias) e anda mais **2 casas**: de sexta para sábado, de sábado para domingo.',
        check: {
          kind: 'choice',
          id: 'rs-r',
          prompt: 'Para saber o dia da semana daqui a n dias, usa-se:',
          options: [
            { text: 'O resto de n ÷ 7', why: 'Isso.' },
            { text: 'O quociente de n ÷ 7', why: 'O quociente conta as semanas inteiras, que não mudam o dia.' },
            { text: 'n × 7', why: 'Multiplicar não ajuda; o que importa é o resto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'meses',
      part: 'Meses e anos',
      title: 'Quanto cada mês empurra',
      art: 'degraus',
      goal: 'Saber quanto cada mês avança o dia da semana.',
      explain:
        'Do dia 10 de um mês ao dia 10 do mês seguinte, o dia da semana **avança**:\n\n| Mês com | Resto ÷ 7 | Avança |\n|---|---|---|\n| 31 dias | 3 | 3 |\n| 30 dias | 2 | 2 |\n| 29 dias | 1 | 1 |\n| 28 dias | 0 | 0 |\n\nTêm 31 dias: janeiro, março, maio, julho, agosto, outubro e dezembro.\n\nUm **ano comum** (365 = 52 semanas + 1) avança **um** dia; com um 29 de fevereiro no meio, **dois**.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'Se 1º de abril é segunda-feira, 1º de maio é:',
        options: [
          { text: 'Quarta-feira', why: 'Isso: abril tem 30 dias, avança 2.' },
          { text: 'Segunda-feira', why: 'Só fevereiro de 28 dias mantém o dia; abril tem 30.' },
          { text: 'Quinta-feira', why: 'Avança 3 quem tem 31 dias; abril tem 30, avança 2.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Separe **4 semanas** de cada mês: são 28 dias, que não mudam nada. O que **sobra** é o empurrão: um mês de 30 dias tem 28 + **2**; um de 31, 28 + **3**. Abril sobra 2: segunda + 2 = quarta.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'Uma data cai no mesmo dia da semana em dois anos comuns seguidos?',
          options: [
            { text: 'Não: avança um dia, porque 365 deixa resto 1', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'Pegadinha: 365 = 52 × 7 + 1.' },
            { text: 'Avança sete dias', why: 'Avança um dia.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'prazos',
      part: 'Prazos',
      title: 'Contar sem errar por um',
      art: 'revisao',
      goal: 'Contar prazos inclusive e "n dias depois".',
      explain:
        'Muitas alternativas erradas nascem de contar **um dia a mais ou a menos**:\n\n- "do dia 3 ao dia 10, **inclusive**": 10 − 3 + **1** = **8 dias**;\n- "**10 dias depois** do dia 3": é o dia **13**.\n\nOutra pergunta comum: um mês de **31 dias** tem 4 semanas e mais **3 dias**. Os **três dias da semana** em que o mês começa aparecem **5 vezes**; os outros, 4.',
      check: {
        kind: 'choice',
        id: 'pz-c',
        prompt: 'Quantos dias há do dia 5 ao dia 20, inclusive?',
        options: [
          { text: '16', why: 'Isso: 20 − 5 + 1.' },
          { text: '15', why: 'Esqueceu o "+ 1" de incluir os dois extremos.' },
          { text: '14', why: 'Conte os dois extremos: 20 − 5 + 1 = 16.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **postes de cerca**: do poste 1 ao poste 3 há **3 postes**, mas só **2 vãos**. "Inclusive" conta os **postes** (somando 1); "depois" conta os **vãos**.',
        check: {
          kind: 'choice',
          id: 'pz-r',
          prompt: 'Um mês de 31 dias começa numa quinta. Qual destes dias aparece 5 vezes?',
          options: [
            { text: 'Sábado', why: 'Isso: os 3 dias extras são quinta, sexta e sábado.' },
            { text: 'Domingo', why: 'Os três primeiros dias são quinta, sexta e sábado.' },
            { text: 'Quarta-feira', why: 'A quarta aparece 4 vezes.' },
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
      prompt: 'Quanto cada mês avança o dia da semana?',
      categories: ['Avança 3', 'Avança 2', 'Avança 0'],
      items: [
        { text: 'Março', cat: 0, why: '31 dias.' },
        { text: 'Agosto', cat: 0, why: '31 dias.' },
        { text: 'Junho', cat: 1, why: '30 dias.' },
        { text: 'Fevereiro de ano comum', cat: 2, why: '28 dias.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: '10 de março caiu numa quinta. Qual cálculo acha o dia de 25 de dezembro?',
      scenarios: [
        { title: 'Opção A', body: 'Contar os dias: 21 (resto de março) + 244 (abril a novembro) + 25 = **290**. Resto de 290 ÷ 7 é **3**: quinta + 3 = **domingo**.' },
        { title: 'Opção B', body: 'Contar só os meses: 9 meses, resto 2: **sábado**.' },
      ],
      answer: 0,
      why: 'Conta-se em dias, não em meses: 290 = 7 × 41 + 3.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Terça + 100 dias: quinta', 'Do dia 3 ao 10, inclusive: 8 dias', 'Sexta + 30 dias: sexta'],
      bug: 2,
      why: '30 = 7 × 4 + 2: sexta + 2 = domingo.',
      fixed: 'Sexta + 30 dias: domingo',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.009' }],
  summary: [
    'Dia da semana daqui a n dias: resto de n ÷ 7.',
    'Meses: 31 dias avançam 3; 30 avançam 2; 29 avançam 1; 28 não mudam.',
    'Ano comum avança 1 dia; com 29 de fevereiro no meio, 2.',
    'Inclusive: subtraia e some 1. Mês de 31 dias: os 3 primeiros dias da semana aparecem 5 vezes.',
  ],
};

export const matEspRelogio: MicroLesson = {
  ...S,
  id: 'mat.espaco.3',
  series: { id: 'mat.espaco', order: 3 },
  title: 'Relógios',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Quanto é 2,4 horas em horas e minutos?',
    options: [
      { text: '2 h 24 min', why: 'Isso: 0,4 × 60 = 24. Esta aula começa por essas conversões.' },
      { text: '2 h 40 min', why: 'Pegadinha: 0,4 hora é 0,4 × 60 = 24 minutos.' },
      { text: '2 h 4 min', why: '0,4 × 60 = 24 minutos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'conversao',
      part: 'Horas',
      title: 'Converter horas e minutos',
      art: 'abaco',
      goal: 'Converter frações de hora em minutos e o contrário.',
      explain:
        'Uma hora tem **60** minutos, não 100. Por isso:\n\n- **2,4 horas** = 2 h + 0,4 × 60 min = **2 h 24 min**;\n- **0,5 hora** = 0,5 × 60 = **30 min**;\n- **135 minutos** = 120 + 15 = **2 h 15 min**.\n\nA pegadinha é ler a vírgula como se fossem minutos.',
      check: {
        kind: 'choice',
        id: 'cv-c',
        prompt: '1,75 hora corresponde a:',
        options: [
          { text: '1 h 45 min', why: 'Isso: 0,75 × 60 = 45.' },
          { text: '1 h 75 min', why: 'Não existem 75 minutos numa hora; 0,75 × 60 = 45.' },
          { text: '1 h 7 min', why: '0,75 × 60 = 45 minutos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **fatias de pizza** de 60 pedaços. **Meia** pizza (0,5) são 30 pedaços. **Três quartos** (0,75) são 45. A parte depois da vírgula é uma **fração** da hora, que se multiplica por 60.',
        check: {
          kind: 'choice',
          id: 'cv-r',
          prompt: '0,5 hora corresponde a:',
          options: [
            { text: '30 minutos', why: 'Isso.' },
            { text: '50 minutos', why: 'Pegadinha: 0,5 × 60 = 30.' },
            { text: '5 minutos', why: '0,5 × 60 = 30.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'angulo',
      part: 'Ponteiros',
      title: 'O ângulo entre os ponteiros',
      art: 'alvo',
      goal: 'Calcular o ângulo entre os ponteiros com a fórmula.',
      explain:
        'O ponteiro dos **minutos** anda **6°** por minuto. O das **horas** anda **30°** por hora, ou seja, **0,5°** por minuto.\n\nÀs H horas e M minutos, o ângulo é **|30 × H − 5,5 × M|**. Se passar de 180°, o menor ângulo é 360° menos ele.\n\nExemplo: 3 h 40 min. |30 × 3 − 5,5 × 40| = |90 − 220| = **130°**.\n\nErro comum: deixar o ponteiro das horas **parado** no número.',
      check: {
        kind: 'choice',
        id: 'ag-c',
        prompt: 'Às 4 h 20 min, qual é o ângulo entre os ponteiros?',
        options: [
          { text: '10°', why: 'Isso: |120 − 110| = 10.' },
          { text: '0°', why: 'O ponteiro das horas já andou um terço entre o 4 e o 5.' },
          { text: '20°', why: 'Calcule: |30 × 4 − 5,5 × 20| = |120 − 110| = 10.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Às 4 h 20 min, o ponteiro dos minutos está **no 4** (20 minutos). Parece que os dois se encontram, mas o das horas **já andou** 20 × 0,5 = 10° além do 4. Por isso o ângulo é **10°**, não zero.',
        check: {
          kind: 'choice',
          id: 'ag-r',
          prompt: 'Às 6 h 30 min, os ponteiros estão sobrepostos?',
          options: [
            { text: 'Não: formam 15°', why: 'Isso: |180 − 165| = 15.' },
            { text: 'Sim', why: 'Pegadinha: o ponteiro das horas está entre o 6 e o 7.' },
            { text: 'Não: formam 90°', why: 'Calcule: |180 − 165| = 15.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'desvio',
      part: 'Relógio errado',
      title: 'Relógio que adianta ou atrasa',
      art: 'engrenagem',
      goal: 'Calcular o desvio proporcional ao tempo.',
      explain:
        'O desvio de um relógio é **proporcional** ao tempo decorrido.\n\nExemplo: um relógio **adianta 3 minutos por hora** e é acertado às **8 h**.\n\n1. Às **16 h** (hora certa) passaram **8 horas**.\n2. Desvio: 8 × 3 = **24 minutos**.\n3. Adianta: ele marca **16 h 24 min**.\n\nSe **atrasasse** 3 minutos por hora, marcaria **15 h 36 min**.',
      check: {
        kind: 'choice',
        id: 'dv-c',
        prompt: 'Um relógio adianta 2 min por hora e foi acertado às 10 h. Às 14 h (hora certa), ele marca:',
        options: [
          { text: '14 h 08 min', why: 'Isso: 4 horas × 2 = 8 minutos a mais.' },
          { text: '13 h 52 min', why: 'Esse seria o caso de atrasar.' },
          { text: '14 h 02 min', why: 'Passaram 4 horas: 4 × 2 = 8 minutos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte primeiro **quanto tempo passou** de verdade: das 10 h às 14 h são **4 horas**. Depois, multiplique pelo erro por hora: 4 × 2 = **8 min**. Adianta? **some**. Atrasa? **subtraia**.',
        check: {
          kind: 'choice',
          id: 'dv-r',
          prompt: 'Se o relógio atrasa, o desvio deve ser:',
          options: [
            { text: 'Subtraído da hora certa', why: 'Isso.' },
            { text: 'Somado à hora certa', why: 'Somar é para quem adianta.' },
            { text: 'Ignorado', why: 'O desvio entra na conta.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene o cálculo do relógio que adianta.',
      items: ['Contar o tempo decorrido de verdade', 'Multiplicar pelo desvio por hora', 'Somar à hora certa'],
      why: 'Tempo, desvio e ajuste.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Ponteiro dos minutos: 6° por minuto', 'Ponteiro das horas: 0,5° por minuto', '0,5 hora = 50 minutos'],
      bug: 2,
      why: '0,5 × 60 = 30 minutos.',
      fixed: '0,5 hora = 30 minutos',
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual cálculo dá o ângulo das 3 h 40 min?',
      scenarios: [
        { title: 'Opção A', body: 'Minutos em 240°; horas em 90° + 40 × 0,5 = 110°. Diferença: **130°**.' },
        { title: 'Opção B', body: 'Minutos no 8, horas no 3: cinco números de 30°, **150°**.' },
      ],
      answer: 0,
      why: 'O ponteiro das horas não fica parado no 3: já andou 20°.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.010' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.011' },
  ],
  summary: [
    'Frações de hora × 60: 2,4 h = 2 h 24 min; 0,5 h = 30 min.',
    'Ângulo: |30 × H − 5,5 × M|; se passar de 180°, use 360° menos ele.',
    'O ponteiro das horas anda 0,5° por minuto: não fica parado no número.',
    'Relógio errado: desvio = tempo decorrido × erro por hora; some se adianta, subtraia se atrasa.',
  ],
};

export const matEspOrientacao: MicroLesson = {
  ...S,
  id: 'mat.espaco.4',
  series: { id: 'mat.espaco', order: 4 },
  title: 'Orientação no espaço',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você está de frente para o norte. Qual lado é a sua direita?',
    options: [
      { text: 'Leste', why: 'Isso. Esta aula transforma direções em ângulos para não errar.' },
      { text: 'Oeste', why: 'De frente para o norte, o oeste fica à esquerda.' },
      { text: 'Sul', why: 'O sul fica às suas costas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'angulos',
      part: 'Direções',
      title: 'Direções viram ângulos',
      art: 'trilha',
      goal: 'Associar cada direção a um ângulo a partir do norte.',
      explain:
        'Meça cada direção no **sentido horário**, a partir do **norte**:\n\n- **N** = 0°, **NE** = 45°, **L** = 90°, **SE** = 135°;\n- **S** = 180°, **SO** = 225°, **O** = 270°, **NO** = 315°.\n\nGiro **horário**: **soma**. Giro **anti-horário**: **subtrai**. O resultado fica sempre entre 0° e 360°.',
      check: {
        kind: 'choice',
        id: 'an-c',
        prompt: 'Qual ângulo corresponde ao sudeste?',
        options: [
          { text: '135°', why: 'Isso: entre leste (90°) e sul (180°).' },
          { text: '225°', why: '225° é o sudoeste.' },
          { text: '45°', why: '45° é o nordeste.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pense num **relógio deitado no chão** com o 12 apontando para o norte. O **3** aponta para o **leste** (90°), o **6** para o **sul** (180°), o **9** para o **oeste** (270°). As direções do meio ficam no meio: sudeste entre o 3 e o 6, 135°.',
        check: {
          kind: 'choice',
          id: 'an-r',
          prompt: 'Num giro anti-horário, o que se faz com o ângulo?',
          options: [
            { text: 'Subtrai', why: 'Isso.' },
            { text: 'Soma', why: 'Soma-se no giro horário.' },
            { text: 'Multiplica', why: 'Giros somam ou subtraem.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'giros',
      part: 'Giros',
      title: 'Uma sequência de giros',
      art: 'engrenagem',
      goal: 'Resolver uma sequência de giros passo a passo.',
      explain:
        'Exemplo: um vistoriador está de frente para o **norte** (0°).\n\n1. Gira **90° horário**: 0 + 90 = **90°**.\n2. Gira **180°**: 90 + 180 = **270°**.\n3. Gira **45° anti-horário**: 270 − 45 = **225°**.\n\n225° é o **sudoeste**.\n\nSe uma conta der negativo, some 360°. Se passar de 360°, subtraia 360°.',
      check: {
        kind: 'choice',
        id: 'gi-c',
        prompt: 'De frente para o leste, quem gira 90° anti-horário fica de frente para:',
        options: [
          { text: 'O norte', why: 'Isso: 90° − 90° = 0°.' },
          { text: 'O sul', why: 'O sul seria o giro horário: 90° + 90° = 180°.' },
          { text: 'O oeste', why: 'O oeste exigiria 180°.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva **um número por giro** e só converta em direção **no fim**. Começou no leste: 90. Anti-horário 90: 90 − 90 = 0. Zero é o **norte**.',
        check: {
          kind: 'choice',
          id: 'gi-r',
          prompt: 'De frente para o norte, um giro de 135° horário leva a:',
          options: [
            { text: 'Sudeste', why: 'Isso: 0 + 135 = 135°.' },
            { text: 'Sudoeste', why: 'Sudoeste é 225°.' },
            { text: 'Nordeste', why: 'Nordeste é 45°.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'mesa',
      part: 'Posições',
      title: 'Direita, mesa, distância e dado',
      art: 'pessoal',
      goal: 'Resolver direita e esquerda, deslocamentos e faces do dado.',
      explain:
        'Mais quatro situações:\n\n- de frente para o **sul**, a direita é o **oeste**;\n- em **mesa redonda**, desenhe e marque quem fala: todos olham para o centro;\n- andar **3 km ao norte** e **4 km a leste** deixa você a **5 km** do início (triângulo 3, 4, 5);\n- num dado comum, as faces **opostas somam 7**: 1 e 6, 2 e 5, 3 e 4.',
      check: {
        kind: 'choice',
        id: 'me-c',
        prompt: 'Num dado comum, qual face fica oposta ao 2?',
        options: [
          { text: '5', why: 'Isso: 2 + 5 = 7.' },
          { text: '6', why: 'O oposto do 6 é o 1.' },
          { text: '4', why: 'O oposto do 4 é o 3.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Para a direita, **vire o corpo** em pensamento. De frente para o norte, a direita é o leste. Agora dê meia-volta: de frente para o **sul**, tudo inverte, e a direita vira o **oeste**.',
        check: {
          kind: 'choice',
          id: 'me-r',
          prompt: 'De frente para o sul, a sua direita é:',
          options: [
            { text: 'O oeste', why: 'Isso.' },
            { text: 'O leste', why: 'O leste é a direita de quem olha para o norte.' },
            { text: 'O norte', why: 'O norte fica às suas costas.' },
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
      prompt: 'Qual ângulo, a partir do norte, cada direção tem?',
      categories: ['90°', '180°', '270°'],
      items: [
        { text: 'Leste', cat: 0, why: 'Um quarto de volta horário.' },
        { text: 'Sul', cat: 1, why: 'Meia volta.' },
        { text: 'Oeste', cat: 2, why: 'Três quartos de volta.' },
      ],
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene a resolução de giros.',
      items: ['Converter a direção inicial em ângulo', 'Somar giros horários e subtrair anti-horários', 'Ajustar para ficar entre 0° e 360°', 'Converter o ângulo final em direção'],
      why: 'Tudo em números até o fim.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Faces opostas do dado somam 7', '3 km norte e 4 km leste: 5 km', 'De frente para o sul, a direita é o leste'],
      bug: 2,
      why: 'De frente para o sul, a direita é o oeste.',
      fixed: 'De frente para o sul, a direita é o oeste',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.012' }],
  summary: [
    'Ângulos a partir do norte, sentido horário: N 0°, NE 45°, L 90°, SE 135°, S 180°, SO 225°, O 270°, NO 315°.',
    'Giro horário soma; anti-horário subtrai; ajuste para 0° a 360°.',
    'De frente para o sul, a direita é o oeste. 3 km e 4 km em ângulo reto: 5 km.',
    'Dado comum: faces opostas somam 7.',
  ],
};
