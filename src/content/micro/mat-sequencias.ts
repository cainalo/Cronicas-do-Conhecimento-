// Série "Sequências e conceitos" (cap.mat.02, trecho sequencias), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta de Euclides a Fibonacci e Dirichlet; as seguintes ensinam o roteiro
// das sequências numéricas, depois letras e ciclos, depois conceitos, analogias e contagens, uma ideia
// por etapa, com exemplos resolvidos. Fatos conferidos com o texto do capítulo
// (02-sequencias-conceitos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.02', sectionId: 'sequencias' } as const;

export const matSeqHistoria: MicroLesson = {
  ...S,
  id: 'mat.sequencias.1',
  series: { id: 'mat.sequencias', order: 1 },
  title: 'De Euclides aos coelhos de Fibonacci',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Complete: 1, 1, 2, 3, 5, 8, ... Qual vem depois?',
    options: [
      { text: '13', why: 'Isso: cada termo é a soma dos dois anteriores (5 + 8). Esta aula conta de onde vem essa sequência.' },
      { text: '11', why: 'Some os dois anteriores: 5 + 8 = 13.' },
      { text: '16', why: 'Não é dobrar: é somar os dois anteriores, 5 + 8 = 13.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'euclides',
      part: 'A história',
      title: 'Por volta de 300 a.C.: Euclides',
      art: 'livro',
      goal: 'Saber que as progressões já eram estudadas na Grécia antiga.',
      explain:
        'Por volta de **300 a.C.**, o grego **Euclides** escreveu os **Elementos**, a obra de matemática mais copiada da Antiguidade.\n\nNela já aparecem números em **proporção contínua**, como 3, 6, 12, 24: cada um é o anterior **multiplicado pelo mesmo número**. Hoje chamamos isso de **progressão geométrica** (PG).\n\nA ideia vizinha, **somar sempre o mesmo número**, como 5, 9, 13, 17, é a **progressão aritmética** (PA).',
      check: {
        kind: 'choice',
        id: 'eu-c',
        prompt: 'Na sequência 3, 6, 12, 24, o que se repete?',
        options: [
          { text: 'Multiplicar por 2', why: 'Isso: é uma PG de razão 2.' },
          { text: 'Somar 3', why: '3 + 3 = 6, mas 6 + 3 não dá 12.' },
          { text: 'Nada se repete', why: 'Repete-se a multiplicação por 2.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **dinheiro na poupança**. Na **PA**, você deposita **sempre R$ 4** por mês: 5, 9, 13, 17. Na **PG**, o valor **dobra** a cada mês: 3, 6, 12, 24. Uma **soma** o mesmo; a outra **multiplica** pelo mesmo.',
        check: {
          kind: 'choice',
          id: 'eu-r',
          prompt: '5, 9, 13, 17 é uma:',
          options: [
            { text: 'PA de razão 4', why: 'Isso: soma-se 4.' },
            { text: 'PG de razão 4', why: 'Na PG se multiplica; aqui se soma.' },
            { text: 'Sequência de Fibonacci', why: 'Em Fibonacci se somam os dois anteriores.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'fibonacci',
      part: 'A história',
      title: '1202: Fibonacci e os coelhos',
      art: 'abaco',
      goal: 'Conhecer a origem da sequência de Fibonacci.',
      explain:
        'Em **1202**, **Leonardo de Pisa**, conhecido como **Fibonacci**, publicou o **Liber Abaci**, livro que ajudou a espalhar pela Europa os algarismos que usamos hoje.\n\nNele há um problema de **coelhos**: cada casal adulto gera um novo casal por mês. Contando os casais mês a mês, surge 1, 1, 2, 3, 5, 8, 13...\n\nCada termo é a **soma dos dois anteriores**.',
      check: {
        kind: 'choice',
        id: 'fi-c',
        prompt: 'Na sequência de Fibonacci, como se obtém um termo?',
        options: [
          { text: 'Somando os dois anteriores', why: 'Isso.' },
          { text: 'Dobrando o anterior', why: 'Dobrar dá PG; Fibonacci soma os dois anteriores.' },
          { text: 'Somando sempre 2', why: 'Somar sempre o mesmo dá PA.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **escada** que você sobe de **um ou dois degraus** por vez. O número de jeitos de chegar a cada degrau é a soma dos jeitos de chegar aos **dois anteriores**: 1, 2, 3, 5, 8. É a mesma regra dos coelhos.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Depois de 8 e 13, vem:',
          options: [
            { text: '21', why: 'Isso: 8 + 13.' },
            { text: '18', why: 'Some os dois: 8 + 13 = 21.' },
            { text: '26', why: 'Não se dobra: soma-se 8 + 13.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'dirichlet',
      part: 'A história',
      title: '1834: Dirichlet e as gavetas',
      art: 'cartao',
      goal: 'Conhecer o princípio da casa dos pombos.',
      explain:
        'Em **1834**, o matemático alemão **Peter Dirichlet** usou um princípio simples, que ficou conhecido como **princípio das gavetas** ou da **casa dos pombos**:\n\nse você põe **mais objetos do que gavetas**, pelo menos uma gaveta fica com **dois ou mais**.\n\nParece óbvio, mas resolve questões de "**quantos é preciso retirar para garantir**...", que caem nas provas.',
      check: {
        kind: 'choice',
        id: 'dr-c',
        prompt: 'Com 4 pombos e 3 casinhas, o que é certo?',
        options: [
          { text: 'Pelo menos uma casinha tem dois pombos', why: 'Isso: há mais pombos que casinhas.' },
          { text: 'Cada casinha tem um pombo', why: 'Sobra um pombo, que precisa dividir alguma casinha.' },
          { text: 'Uma casinha fica vazia', why: 'Não é garantido; o certo é que uma tem dois ou mais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Numa sala com **13 pessoas**, duas fazem aniversário no **mesmo mês**: são 12 meses (gavetas) e 13 pessoas (objetos). Mesmo no pior caso, uma de cada mês, a 13ª repete algum.',
        check: {
          kind: 'choice',
          id: 'dr-r',
          prompt: 'O princípio das gavetas ajuda em questões do tipo:',
          options: [
            { text: '"Quantos é preciso retirar para garantir..."', why: 'Isso.' },
            { text: '"Qual é o próximo termo..."', why: 'Isso é sequência.' },
            { text: '"Que dia da semana será..."', why: 'Isso é calendário.' },
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
      items: ['Elementos de Euclides (cerca de 300 a.C.)', 'Liber Abaci de Fibonacci (1202)', 'Princípio de Dirichlet (1834)'],
      why: 'Da Grécia antiga ao século XIX.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Cada sequência é PA, PG ou Fibonacci?',
      categories: ['PA', 'PG', 'Fibonacci'],
      items: [
        { text: '5, 9, 13, 17', cat: 0, why: 'Soma 4.' },
        { text: '3, 6, 12, 24', cat: 1, why: 'Multiplica por 2.' },
        { text: '1, 1, 2, 3, 5', cat: 2, why: 'Soma dos dois anteriores.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['PA: soma sempre o mesmo', 'PG: multiplica sempre o mesmo', 'Fibonacci: dobra o anterior'],
      bug: 2,
      why: 'Em Fibonacci, cada termo é a soma dos dois anteriores.',
      fixed: 'Fibonacci: soma dos dois anteriores',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Cerca de 300 a.C.: nos Elementos de Euclides, números em proporção contínua (PG).',
    'PA soma sempre o mesmo; PG multiplica sempre o mesmo.',
    '1202: Fibonacci, no Liber Abaci, e os coelhos: cada termo é a soma dos dois anteriores.',
    '1834: Dirichlet e o princípio das gavetas (casa dos pombos).',
  ],
};

export const matSeqNumeros: MicroLesson = {
  ...S,
  id: 'mat.sequencias.2',
  series: { id: 'mat.sequencias', order: 2 },
  title: 'O roteiro das sequências numéricas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Diante de 2, 5, 10, 17, 26, ..., qual é o primeiro teste a fazer?',
    options: [
      { text: 'Calcular as diferenças entre termos vizinhos', why: 'Isso. Esta aula monta o roteiro de testes, em ordem.' },
      { text: 'Chutar o próximo número', why: 'Há um roteiro que evita o chute.' },
      { text: 'Somar todos os termos', why: 'A soma não revela o padrão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'diferencas',
      part: 'O roteiro',
      title: 'Diferenças e quocientes',
      art: 'degraus',
      goal: 'Aplicar os dois primeiros testes do roteiro.',
      explain:
        'Os dois primeiros testes:\n\n1. **Diferenças** entre vizinhos. Constantes? É **PA**.\n2. **Quocientes**. Constantes? É **PG**.\n\nExemplos:\n\n- 5, 9, 13, 17: diferenças 4, 4, 4. PA de razão 4; o próximo é **21**.\n- 3, 6, 12, 24: quocientes 2, 2, 2. PG de razão 2; o próximo é **48**.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Qual é o próximo termo de 7, 12, 17, 22, ...?',
        options: [
          { text: '27', why: 'Isso: diferenças constantes de 5.' },
          { text: '44', why: 'Não é PG; as diferenças são constantes.' },
          { text: '29', why: 'Some a mesma diferença, 5: 22 + 5 = 27.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva **embaixo** de cada par o que mudou: entre 7 e 12, **+5**; entre 12 e 17, **+5**; entre 17 e 22, **+5**. Se a linha de baixo for sempre igual, basta continuar: 22 + 5 = 27.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: 'Qual é o próximo termo de 2, 6, 18, 54, ...?',
          options: [
            { text: '162', why: 'Isso: quocientes 3; 54 × 3.' },
            { text: '90', why: 'As diferenças não são constantes; os quocientes são: × 3.' },
            { text: '108', why: 'É × 3, não × 2: 54 × 3 = 162.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'segunda',
      part: 'O roteiro',
      title: 'Diferenças das diferenças',
      art: 'engrenagem',
      goal: 'Reconhecer sequências de segunda ordem.',
      explain:
        'Se as diferenças **não** são constantes, olhe as **diferenças das diferenças**.\n\nExemplo: 2, 5, 10, 17, 26, __.\n\n- Diferenças: 3, 5, 7, 9.\n- Diferenças delas: 2, 2, 2. **Constantes**.\n\nEntão a próxima diferença é **11**, e o próximo termo é 26 + 11 = **37**.\n\nConferência pela posição: o 6º termo é 6² + 1 = 37.',
      check: {
        kind: 'choice',
        id: 'sg-c',
        prompt: 'Qual é o próximo termo de 1, 4, 9, 16, 25, ...?',
        options: [
          { text: '36', why: 'Isso: diferenças 3, 5, 7, 9; a próxima é 11.' },
          { text: '34', why: 'A próxima diferença é 11: 25 + 11 = 36.' },
          { text: '30', why: 'As diferenças crescem de 2 em 2; a próxima é 11.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça **duas linhas** embaixo da sequência. Na primeira, as diferenças (3, 5, 7, 9). Na segunda, as diferenças delas (2, 2, 2). Quando a **segunda linha** for constante, você constrói de baixo para cima: 9 + 2 = 11, e 25 + 11 = 36.',
        check: {
          kind: 'choice',
          id: 'sg-r',
          prompt: 'Se as diferenças crescem de 2 em 2, a sequência é uma PA?',
          options: [
            { text: 'Não: é de segunda ordem', why: 'Isso: na PA as diferenças são constantes.' },
            { text: 'Sim, de razão 2', why: 'Pegadinha: são as diferenças que formam uma PA.' },
            { text: 'Sim, é uma PG', why: 'Não há quociente constante.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'outros',
      part: 'O roteiro',
      title: 'Operações compostas e intercaladas',
      art: 'trilha',
      goal: 'Reconhecer "× 2 + 1" e sequências intercaladas.',
      explain:
        'Mais três testes, se os anteriores falharem:\n\n- **operação composta**: 3, 7, 15, 31, 63. Cada termo é o anterior **× 2 + 1**. O próximo é 127;\n- **intercalada**: 1, 10, 3, 20, 5, 30. As posições ímpares fazem 1, 3, 5; as pares, 10, 20, 30. O próximo é **7**;\n- **relação com a posição**: n², n³, n² + 1, números primos.',
      check: {
        kind: 'choice',
        id: 'ou-c',
        prompt: 'Qual é o próximo termo de 5, 11, 23, 47, ...?',
        options: [
          { text: '95', why: 'Isso: × 2 + 1 (47 × 2 + 1).' },
          { text: '71', why: 'As diferenças dobram (6, 12, 24); a próxima é 48: 47 + 48 = 95.' },
          { text: '94', why: 'Falta o "+ 1": 47 × 2 + 1 = 95.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Quando o número **quase dobra**, teste "**× 2 e mais alguma coisa**". 5 × 2 = 10, mais 1 dá 11. 11 × 2 = 22, mais 1 dá 23. Confirmou em dois pares? Aplique ao último: 47 × 2 + 1 = 95.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: 'Em 1, 10, 3, 20, 5, 30, ..., cada termo depende de qual?',
          options: [
            { text: 'Do termo duas posições antes', why: 'Isso: é intercalada.' },
            { text: 'Do termo imediatamente anterior', why: 'Pegadinha: são duas sequências misturadas.' },
            { text: 'De nenhum', why: 'Cada metade segue a sua regra.' },
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
      prompt: 'Ordene o roteiro de testes.',
      items: ['Diferenças (PA)', 'Quocientes (PG)', 'Diferenças das diferenças', 'Operações compostas e intercaladas'],
      why: 'Do teste mais simples ao mais elaborado.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual padrão cada sequência segue?',
      categories: ['PA', 'PG', 'Segunda ordem', 'Composta'],
      items: [
        { text: '5, 9, 13, 17', cat: 0, why: 'Diferença 4.' },
        { text: '3, 6, 12, 24', cat: 1, why: 'Quociente 2.' },
        { text: '2, 5, 10, 17', cat: 2, why: 'Diferenças 3, 5, 7.' },
        { text: '3, 7, 15, 31', cat: 3, why: '× 2 + 1.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['5, 9, 13, 17: próximo 21', '3, 6, 12, 24: próximo 48', '2, 5, 10, 17, 26: próximo 35'],
      bug: 2,
      why: 'As diferenças são 3, 5, 7, 9; a próxima é 11, e 26 + 11 = 37.',
      fixed: '2, 5, 10, 17, 26: próximo 37',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.005' }],
  summary: [
    'Roteiro: diferenças (PA), quocientes (PG), diferenças das diferenças (segunda ordem), operações compostas, intercaladas, relação com a posição, soma dos anteriores.',
    '2, 5, 10, 17, 26: diferenças 3, 5, 7, 9; próximo 37.',
    '3, 7, 15, 31: × 2 + 1. 1, 10, 3, 20, 5, 30: intercalada.',
  ],
};

export const matSeqLetras: MicroLesson = {
  ...S,
  id: 'mat.sequencias.3',
  series: { id: 'mat.sequencias', order: 3 },
  title: 'Letras e ciclos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No alfabeto de 26 letras, que posição ocupa a letra T?',
    options: [
      { text: '20ª', why: 'Isso. Converter letras em posições é o primeiro passo desta aula.' },
      { text: '18ª', why: 'A 18ª é o R. Conte: ... R (18), S (19), T (20).' },
      { text: '21ª', why: 'A 21ª é o U; o T é a 20ª.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'letras',
      part: 'Letras',
      title: 'Letras viram números',
      art: 'teclado',
      goal: 'Resolver sequências de letras pelas posições no alfabeto.',
      explain:
        'Converta cada letra na sua **posição** no alfabeto de **26 letras** (com K, W e Y): A = 1, E = 5, J = 10, O = 15, T = 20, Z = 26.\n\nExemplo: A, C, F, J, O, __.\n\n- Posições: 1, 3, 6, 10, 15.\n- Saltos: +2, +3, +4, +5.\n- Próximo salto: +6, posição **21**, letra **U**.\n\nAtenção: se a questão usar o alfabeto **sem K, W e Y**, as posições depois do J mudam.',
      check: {
        kind: 'choice',
        id: 'le-c',
        prompt: 'Com 26 letras, qual vem depois de C, F, J, O?',
        options: [
          { text: 'U', why: 'Isso: posições 3, 6, 10, 15; saltos +3, +4, +5; próximo +6, posição 21.' },
          { text: 'T', why: 'T é a 20ª; o salto +6 leva a 21, o U.' },
          { text: 'V', why: 'V é a 22ª; o próximo salto é +6: 15 + 6 = 21, o U.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva o número **embaixo** de cada letra: C (3), F (6), J (10), O (15). Depois faça a linha dos saltos: +3, +4, +5. O próximo é **+6**: 15 + 6 = 21. Volte à tabela: 21 é o **U**.',
        check: {
          kind: 'choice',
          id: 'le-r',
          prompt: 'Antes de contar letras, o que conferir no enunciado?',
          options: [
            { text: 'Qual alfabeto considerar (com ou sem K, W e Y)', why: 'Isso: muda as posições depois do J.' },
            { text: 'A cor das letras', why: 'O que importa é o alfabeto considerado.' },
            { text: 'Se as letras são maiúsculas', why: 'Maiúscula não muda a posição.' },
          ],
          answer: 0,
          errorKind: 'leitura',
        },
      },
    },
    {
      id: 'ciclos',
      part: 'Ciclos',
      title: 'O resto da divisão',
      art: 'calendario',
      goal: 'Achar um termo distante de um padrão que se repete.',
      explain:
        'Quando um padrão se repete com **período k**, o termo da posição n é o mesmo da posição dada pelo **resto de n ÷ k**. Resto **0** corresponde ao **último** do ciclo.\n\nExemplo: TCEGOTCEGO... Qual é a **2.026ª** letra?\n\n- O ciclo tem **5** letras.\n- 2.026 = 5 × 405 + **1**. Resto 1.\n- É a 1ª letra do ciclo: **T**.',
      check: {
        kind: 'choice',
        id: 'ci-c',
        prompt: 'Num ciclo de 7 elementos, o 50º termo coincide com qual?',
        options: [
          { text: 'O 1º', why: 'Isso: 50 = 7 × 7 + 1, resto 1.' },
          { text: 'O 7º', why: 'O resto é 1, não 0.' },
          { text: 'O 5º', why: 'Divida: 50 = 7 × 7 + 1. Resto 1.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **relógio de 5 horas**: depois da 5, volta à 1. Voltas completas não mudam nada; só importa **o que sobra**. Em 2.026, cabem 405 voltas de 5 e **sobra 1**. Então você para na posição 1.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'No ciclo TCEGO, se o resto da divisão por 5 for 0, a letra é:',
          options: [
            { text: 'O, a última do ciclo', why: 'Isso: resto 0 é o fim da volta.' },
            { text: 'T, a primeira', why: 'Resto 0 fecha a volta: é a última.' },
            { text: 'Nenhuma', why: 'Resto 0 corresponde à última letra.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'rodizio',
      part: 'Ciclos',
      title: 'Rodízio de plantão',
      art: 'pessoal',
      goal: 'Aplicar o resto a escalas que começam no dia 1.',
      explain:
        'Em **rodízios**, cuidado com o começo. Seis servidores em ordem fixa; o 1º faz o dia 1.\n\nO dia 1 não "anda" nada. Por isso conte o **deslocamento**: dia n anda **n − 1** casas.\n\nDia 100: (100 − 1) ÷ 6 = 16, **resto 3**. Andar 3 casas a partir do 1º leva à **4ª pessoa** da lista.\n\nResto 0 aqui significa voltar ao **1º**.',
      check: {
        kind: 'choice',
        id: 'ro-c',
        prompt: 'Com 6 servidores e o 1º no dia 1, quem faz o dia 13?',
        options: [
          { text: 'O 1º', why: 'Isso: (13 − 1) ÷ 6 = 2, resto 0; volta ao 1º.' },
          { text: 'O 6º', why: 'O dia 12 é do 6º; o 13 recomeça no 1º.' },
          { text: 'O 2º', why: 'O resto de 12 ÷ 6 é 0: volta ao 1º.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Escreva os primeiros dias: dia 1, o 1º; dia 6, o 6º; dia **7**, de novo o **1º**. Então a escala recomeça nos dias 1, 7, 13, 19... Todo dia que **deixa resto 1** na divisão por 6 é do 1º servidor.',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: 'Por que se usa n − 1 no rodízio?',
          options: [
            { text: 'Porque o dia 1 é a posição de partida, sem deslocamento', why: 'Isso.' },
            { text: 'Porque um servidor sempre falta', why: 'O − 1 vem da contagem a partir do dia 1.' },
            { text: 'Por costume, sem motivo', why: 'Há motivo: o dia 1 não anda nenhuma casa.' },
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
      prompt: 'Ordene os passos para achar a 2.026ª letra de TCEGOTCEGO...',
      items: ['Contar o tamanho do ciclo (5)', 'Dividir 2.026 por 5', 'Pegar o resto (1)', 'Ler a letra dessa posição (T)'],
      why: 'Tamanho, divisão, resto e leitura.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['T é a 20ª letra', 'A, C, F, J, O: próximo U', 'Resto 0 é o primeiro do ciclo'],
      bug: 2,
      why: 'Nos ciclos contados a partir da posição 1, resto 0 é o último elemento.',
      fixed: 'Resto 0 é o último do ciclo',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Uma questão pede a 30ª letra de ABCDABCD... Qual cálculo está certo?',
      scenarios: [
        { title: 'Opção A', body: '30 = 4 × 7 + **2**. Resto 2: letra **B**.' },
        { title: 'Opção B', body: '30 ÷ 4 = 7,5. Arredonda para 8: letra **D**.' },
      ],
      answer: 0,
      why: 'Use o resto inteiro, não a divisão com vírgula: resto 2 é a 2ª letra, B.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.006' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.007' },
  ],
  summary: [
    'Letras: converta em posições (26 letras: T = 20, U = 21) e procure o padrão dos saltos.',
    'Confira se o alfabeto é com ou sem K, W e Y.',
    'Ciclo de período k: a posição n vale o resto de n ÷ k; resto 0 é o último.',
    'Rodízio que começa no dia 1: use (n − 1) ÷ k; resto 0 volta ao 1º.',
  ],
};

export const matSeqConceitos: MicroLesson = {
  ...S,
  id: 'mat.sequencias.4',
  series: { id: 'mat.sequencias', order: 4 },
  title: 'Analogias, intrusos e contagens',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Auditor está para auditoria assim como juiz está para..."',
    options: [
      { text: 'Julgamento', why: 'Isso: agente e atividade. Esta aula treina esse tipo de relação.' },
      { text: 'Tribunal', why: 'Tribunal é o lugar; a relação do primeiro par é agente e atividade.' },
      { text: 'Advogado', why: 'Advogado é outro agente; falta a atividade.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'analogias',
      part: 'Raciocínio verbal',
      title: 'Analogias',
      art: 'balanca',
      goal: 'Identificar a relação do primeiro par antes de olhar as alternativas.',
      explain:
        'Analogia é uma **relação que se repete**. Tipos frequentes:\n\n- **parte e todo**: página está para livro;\n- **agente e instrumento**: escrivão está para pena;\n- **causa e efeito**: atraso está para multa;\n- **gênero e espécie**: documento está para ofício.\n\nO segredo: dê **nome** à relação do primeiro par **antes** de olhar as alternativas.',
      check: {
        kind: 'choice',
        id: 'an-c',
        prompt: '"Página está para livro assim como tecla está para..."',
        options: [
          { text: 'Teclado', why: 'Isso: parte e todo.' },
          { text: 'Dedo', why: 'Dedo usa a tecla; a relação é parte e todo.' },
          { text: 'Letra', why: 'A tecla mostra a letra; mas o todo de que ela é parte é o teclado.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Transforme o primeiro par numa **frase**: "a página é **uma parte** do livro". Depois teste a mesma frase com cada alternativa: "a tecla é uma parte do **teclado**". A frase que funciona é a resposta.',
        check: {
          kind: 'choice',
          id: 'an-r',
          prompt: '"Atraso está para multa" é uma relação de:',
          options: [
            { text: 'Causa e efeito', why: 'Isso.' },
            { text: 'Parte e todo', why: 'A multa não é parte do atraso; é consequência.' },
            { text: 'Gênero e espécie', why: 'Gênero e espécie é documento e ofício.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'intruso',
      part: 'Conceitos',
      title: 'Achar o intruso',
      art: 'alvo',
      goal: 'Descobrir a propriedade comum e o elemento que não a tem.',
      explain:
        '**Formação de conceitos** é descobrir a propriedade comum. **Discriminação** é achar quem não a tem.\n\nGrupo: 121, 169, 225, 324, 361.\n\n- Todos são **quadrados perfeitos**: 11², 13², 15², 18², 19².\n- Mas só **324** é quadrado de número **par** (18).\n\nO conceito é "quadrado de número ímpar", e o intruso é **324**. Dica: teste **mais de uma** propriedade.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'No grupo 3, 5, 7, 9, 11, qual é o intruso?',
        options: [
          { text: '9', why: 'Isso: é o único que não é primo (9 = 3 × 3).' },
          { text: '3', why: '3 é primo, como os outros.' },
          { text: '11', why: '11 é primo, como os outros.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Se a primeira propriedade vale para **todos**, ela não separa ninguém. No grupo 3, 5, 7, 9, 11, todos são **ímpares**: essa não serve. Tente outra: **primos**? 9 não é. Achou o intruso.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Se todos os números do grupo são pares, o que fazer?',
          options: [
            { text: 'Testar outra propriedade, como múltiplo de 4', why: 'Isso.' },
            { text: 'Concluir que não há intruso', why: 'Pode haver; teste outra propriedade.' },
            { text: 'Escolher o maior', why: 'O tamanho raramente é o critério.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'contagens',
      part: 'Raciocínio matemático',
      title: 'Páginas e o pior caso',
      art: 'abaco',
      goal: 'Fazer contagens de algarismos e de pior caso.',
      explain:
        '**Algarismos de 1 a 120**:\n\n- 1 a 9: 9 páginas × 1 = 9;\n- 10 a 99: 90 páginas × 2 = 180;\n- 100 a 120: 21 páginas × 3 = 63.\n\nTotal: **252**.\n\n**Pior caso**: 5 pastas azuis, 7 verdes e 4 vermelhas, retiradas no escuro. Para **garantir duas da mesma cor**: no pior caso sai uma de cada (3); a próxima repete: **4**.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Na mesma gaveta, quantas retirar para garantir três verdes?',
        options: [
          { text: '12', why: 'Isso: pior caso, saem todas as azuis (5) e vermelhas (4), e depois 3 verdes.' },
          { text: '3', why: 'Podem sair azuis e vermelhas antes.' },
          { text: '7', why: 'No pior caso, as 9 não verdes saem antes: 9 + 3 = 12.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'No pior caso, imagine o **azar total**: tudo que **não** é verde sai primeiro. São 5 azuis + 4 vermelhas = 9. Só então começam as verdes, e você precisa de 3: 9 + 3 = **12**.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Com 3 cores, retirar 3 pastas garante duas da mesma cor?',
          options: [
            { text: 'Não: podem sair três cores diferentes; são precisas 4', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'Pegadinha: no pior caso sai uma de cada cor.' },
            { text: 'Só se a gaveta estiver cheia', why: 'O número de cores decide: 3 cores pedem 4 retiradas.' },
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
      prompt: 'Qual relação cada par mostra?',
      categories: ['Parte e todo', 'Agente e instrumento', 'Causa e efeito'],
      items: [
        { text: 'Página e livro', cat: 0, why: 'A página é parte do livro.' },
        { text: 'Escrivão e pena', cat: 1, why: 'O escrivão usa a pena.' },
        { text: 'Atraso e multa', cat: 2, why: 'O atraso causa a multa.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['1 a 9: 9 algarismos', '10 a 99: 180 algarismos', '100 a 120: 60 algarismos'],
      bug: 2,
      why: 'De 100 a 120 são 21 páginas, não 20: 21 × 3 = 63.',
      fixed: '100 a 120: 63 algarismos',
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'No grupo 121, 169, 225, 324, 361, qual raciocínio acha o intruso?',
      scenarios: [
        { title: 'Opção A', body: 'Todos são quadrados perfeitos; **só 324** é quadrado de número par.' },
        { title: 'Opção B', body: 'O maior número é o intruso: **361**.' },
      ],
      answer: 0,
      why: 'É preciso achar a propriedade que todos menos um têm; o tamanho não é critério.',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.02.008' }],
  summary: [
    'Analogias: nomeie a relação do primeiro par (parte e todo, agente e instrumento, causa e efeito, gênero e espécie).',
    'Intruso: ache a propriedade comum; teste mais de uma.',
    'Algarismos de 1 a 120: 9 + 180 + 63 = 252.',
    'Pior caso: tudo que não interessa sai primeiro; 3 cores pedem 4 retiradas para repetir.',
  ],
};
