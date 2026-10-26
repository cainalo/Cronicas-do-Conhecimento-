// Série "Razões, divisão proporcional e regra de três" (cap.mat.01, trecho razoes), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta de Tales a Fibonacci; as seguintes ensinam
// razão, proporção, grandezas e divisão direta, depois divisão inversa e regra de três simples e
// composta, uma ideia por etapa. Contas conferidas com o texto do capítulo
// (03-razoes-regra-de-tres.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.mat.01', sectionId: 'razoes' } as const;

export const matRazHistoria: MicroLesson = {
  ...S,
  id: 'mat.razoes.1',
  series: { id: 'mat.razoes', order: 1 },
  title: 'De Tales a Fibonacci: a arte de comparar',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma receita usa 2 xícaras de farinha para 1 de leite. Para fazer o dobro, quanto leite vai com 4 xícaras de farinha?',
    options: [
      { text: '2 xícaras', why: 'Isso: a comparação entre farinha e leite se mantém. Esta aula conta como os antigos usaram essa ideia.' },
      { text: '1 xícara', why: 'Se a farinha dobrou, o leite também precisa dobrar para manter o sabor.' },
      { text: '4 xícaras', why: 'Ficaria com leite demais: a receita pede metade de leite em relação à farinha.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tales',
      part: 'A história',
      title: 'A sombra da pirâmide',
      art: 'alvo',
      goal: 'Ver na história de Tales a ideia de proporção.',
      explain:
        'Conta a tradição que o grego **Tales de Mileto** mediu a **altura de uma pirâmide** sem subir nela.\n\nEle comparou a **sombra da pirâmide** com a **sombra de uma vara**. No mesmo instante, as duas comparações, **altura por sombra**, são **iguais**.\n\nCom números redondos: se uma vara de **1 m** faz sombra de **2 m**, uma pirâmide com sombra de **300 m** tem **150 m** de altura. Duas comparações iguais formam uma **proporção**.',
      check: {
        kind: 'choice',
        id: 'ta-c',
        prompt: 'Uma vara de 1 m faz sombra de 3 m. Ao mesmo tempo, um prédio faz sombra de 60 m. Qual a altura do prédio?',
        options: [
          { text: '20 m', why: 'Isso: a sombra é 3 vezes a altura; 60 ÷ 3 = 20.' },
          { text: '180 m', why: 'A sombra é maior que a altura: divida, não multiplique.' },
          { text: '63 m', why: 'Não se soma: compara-se pela divisão.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: **a sombra é quantas vezes a altura?** Na vara, 3 m de sombra para 1 m de altura: a sombra é **3 vezes** maior. No prédio vale o mesmo, porque o sol está igual para os dois. Então a altura é a sombra dividida por 3: 60 ÷ 3 = **20 m**.',
        check: {
          kind: 'choice',
          id: 'ta-r',
          prompt: 'Uma vara de 2 m faz sombra de 1 m. Uma torre faz sombra de 15 m. Qual a altura da torre?',
          options: [
            { text: '30 m', why: 'Isso: a altura é o dobro da sombra.' },
            { text: '7,5 m', why: 'Aqui a altura é maior que a sombra: dobre.' },
            { text: '17 m', why: 'Não se soma: a altura é o dobro da sombra.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'eudoxo',
      part: 'A história',
      title: 'Euclides e Eudoxo',
      art: 'livro',
      goal: 'Saber que a teoria das proporções está no livro V dos Elementos.',
      explain:
        'Por volta de **300 a.C.**, o **livro V** dos ***Elementos***, de **Euclides**, organizou a **teoria das proporções**, atribuída ao matemático **Eudoxo**.\n\nOs gregos estudaram com rigor quando duas comparações são **iguais**.\n\nÉ a mesma ideia que usamos para **rateios** de verbas, **escalas** de mapas e **prazos** de equipes.',
      check: {
        kind: 'choice',
        id: 'eu-c',
        prompt: 'Em que obra está organizada a teoria das proporções atribuída a Eudoxo?',
        options: [
          { text: 'No livro V dos Elementos, de Euclides', why: 'Isso.' },
          { text: 'No Liber Abaci', why: 'O Liber Abaci, de Fibonacci, é de 1202.' },
          { text: 'Numa lei do Tribunal', why: 'É uma obra de matemática grega.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O mesmo livro de Euclides que traz os números primos traz também, no **livro V**, as **proporções**. Euclides reuniu e organizou o que matemáticos anteriores, como **Eudoxo**, tinham descoberto.',
        check: {
          kind: 'choice',
          id: 'eu-r',
          prompt: 'A teoria das proporções do livro V é atribuída a:',
          options: [
            { text: 'Eudoxo', why: 'Isso.' },
            { text: 'Brahmagupta', why: 'Brahmagupta descreveu a regra de três, em 628.' },
            { text: 'Gauss', why: 'Gauss é de 1801 e demonstrou a decomposição única.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'brahmagupta',
      part: 'A história',
      title: '628: a regra das três quantidades',
      art: 'abaco',
      goal: 'Saber que Brahmagupta descreveu a regra de três.',
      explain:
        'Na **Índia**, em **628**, o matemático **Brahmagupta** descreveu a regra que chamava de ***trairāśika***, "a das **três quantidades**".\n\nA ideia: conhecendo **três valores**, acha-se o **quarto**.\n\nExemplo: se 3 cestos custam 12 moedas, quanto custam 5 cestos? Conhecemos 3, 12 e 5; o quarto valor é **20 moedas**.',
      check: {
        kind: 'choice',
        id: 'br-c',
        prompt: 'Se 4 cadernos custam 20 reais, quanto custam 6 cadernos?',
        options: [
          { text: '30 reais', why: 'Isso: cada caderno custa 5; 6 × 5 = 30.' },
          { text: '22 reais', why: 'Não se soma 2: cada caderno custa 5.' },
          { text: '24 reais', why: 'Ache o preço de um: 20 ÷ 4 = 5; depois 6 × 5 = 30.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Passe pela **unidade**: se 4 custam 20, **1 custa 20 ÷ 4 = 5**. Agora, 6 custam **6 × 5 = 30**. Esse caminho, achar o valor de um e depois multiplicar, é a forma mais segura de fazer a regra de três de cabeça.',
        check: {
          kind: 'choice',
          id: 'br-r',
          prompt: 'O que quer dizer trairāśika?',
          options: [
            { text: '"A das três quantidades"', why: 'Isso: com três valores, acha-se o quarto.' },
            { text: '"A do resto zero"', why: 'É a regra das três quantidades.' },
            { text: '"A dos números primos"', why: 'É a regra das três quantidades.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'fibonacci',
      part: 'A história',
      title: '1202: a regra no comércio',
      art: 'cartao',
      goal: 'Saber que Fibonacci levou a regra de três aos mercadores europeus.',
      explain:
        'Em **1202**, no ***Liber Abaci***, **Fibonacci** ensinou a regra de três aos **mercadores** europeus, para problemas de **câmbio**, **preços** e **pesos**.\n\nFoi assim que ela se espalhou pelo comércio e chegou às escolas, com o nome de **regra de três**.\n\nHoje ela resolve, na prova, rateios de verbas, prazos de auditoria e produtividade de servidores.',
      check: {
        kind: 'order',
        id: 'fi-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Teoria das proporções nos Elementos (cerca de 300 a.C.)', 'Trairāśika de Brahmagupta (628)', 'Regra de três no Liber Abaci (1202)'],
        why: 'Grécia, Índia e, depois, o comércio europeu.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A ideia viajou: os **gregos** estudaram as proporções; os **indianos** deram a regra prática das três quantidades; **Fibonacci** a levou aos **mercados** da Europa. Cada povo tornou a ideia mais útil para o dia a dia.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Para que os mercadores usavam a regra de três no Liber Abaci?',
          options: [
            { text: 'Câmbio, preços e pesos', why: 'Isso.' },
            { text: 'Achar números primos', why: 'Para os primos, havia o crivo de Eratóstenes.' },
            { text: 'Medir pirâmides', why: 'A pirâmide é a história de Tales.' },
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
      lines: ['Tales: comparou sombras', 'Brahmagupta: regra das três quantidades', 'Fibonacci: inventou a pirâmide'],
      bug: 2,
      why: 'Fibonacci levou a regra de três ao comércio, no Liber Abaci (1202).',
      fixed: 'Fibonacci: regra de três no comércio (1202)',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem fez o quê?',
      categories: ['Tales', 'Brahmagupta', 'Fibonacci'],
      items: [
        { text: 'Mediu a pirâmide pela sombra', cat: 0, why: 'Proporção de sombras.' },
        { text: 'Trairāśika, em 628', cat: 1, why: 'Três quantidades.' },
        { text: 'Liber Abaci, em 1202', cat: 2, why: 'Regra de três no comércio.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: 5 impressões custam R$ 2,00. Quanto custam 15 impressões?',
      options: [
        { text: 'R$ 6,00', why: 'Isso: o triplo de impressões, o triplo do preço.' },
        { text: 'R$ 12,00', why: '15 é 3 vezes 5: o preço é 3 × 2 = 6.' },
        { text: 'R$ 3,00', why: 'Triplicou a quantidade: o preço também triplica.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Tales comparou sombras para medir a pirâmide: duas comparações iguais formam uma proporção.',
    'O livro V dos Elementos, de Euclides, organizou a teoria das proporções atribuída a Eudoxo.',
    'Brahmagupta (628): trairāśika, a regra das três quantidades. Caminho seguro: passar pela unidade.',
    'Fibonacci (1202) levou a regra de três ao comércio europeu.',
  ],
};

export const matRazProporcao: MicroLesson = {
  ...S,
  id: 'mat.razoes.2',
  series: { id: 'mat.razoes', order: 2 },
  title: 'Razão, proporção e divisão proporcional',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma verba de R$ 54.000 será dividida entre três equipes conforme o número de auditorias: 4, 6 e 8. A equipe com 8 deve ganhar mais que as outras?',
    options: [
      { text: 'Sim: quem fez mais recebe mais', why: 'Isso: é uma divisão diretamente proporcional. Esta aula ensina a calcular.' },
      { text: 'Não: todas ganham igual', why: 'Dividir igual ignora o critério das auditorias.' },
      { text: 'A de 4 ganha mais', why: 'Na divisão direta, quem tem o maior número recebe mais.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'razao',
      part: 'Razão',
      title: 'Razão é uma divisão',
      art: 'balanca',
      goal: 'Calcular e interpretar uma razão.',
      explain:
        '**Razão** entre a e b (com b diferente de zero) é o **quociente a/b**.\n\n- 30 processos julgados em 6 sessões: razão **30/6 = 5** processos por sessão.\n- Uma planta na **escala 1:500**: 1 cm no papel vale **500 cm** reais.\n\nA razão diz **quanto de uma coisa há para cada unidade da outra**.',
      check: {
        kind: 'choice',
        id: 'ra-c',
        prompt: 'Um servidor analisou 48 processos em 8 dias. Qual a razão processos por dia?',
        options: [
          { text: '6', why: 'Isso: 48 ÷ 8.' },
          { text: '56', why: 'Razão é divisão, não soma.' },
          { text: '384', why: 'Razão é divisão, não multiplicação.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Leia a razão como "**por**": "processos **por** dia" = processos ÷ dias. 48 processos ÷ 8 dias = **6 por dia**. Na escala 1:500, "500 cm reais **por** 1 cm de papel".',
        check: {
          kind: 'choice',
          id: 'ra-r',
          prompt: 'Numa planta na escala 1:100, uma parede de 5 cm no papel mede, na realidade:',
          options: [
            { text: '500 cm, ou 5 m', why: 'Isso: cada 1 cm vale 100 cm.' },
            { text: '105 cm', why: 'Não se soma: multiplica-se por 100.' },
            { text: '20 cm', why: 'Na planta, o real é maior: 5 × 100.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'proporcao',
      part: 'Proporção',
      title: 'Proporção e a propriedade fundamental',
      art: 'degraus',
      goal: 'Resolver proporções pela propriedade fundamental.',
      explain:
        '**Proporção** é a igualdade de duas razões: **a/b = c/d**.\n\n**Propriedade fundamental**: o produto dos **meios** é igual ao dos **extremos**:\n\n**a × d = b × c** ("multiplicar cruzado").\n\nExemplo: 3/4 = x/20 → **4x = 60** → **x = 15**.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'Resolva 2/5 = x/30.',
        options: [
          { text: 'x = 12', why: 'Isso: 5x = 60.' },
          { text: 'x = 75', why: 'Cruze certo: 2 × 30 = 5 × x, logo x = 12.' },
          { text: 'x = 27', why: 'Não se soma: multiplica-se cruzado.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Desenhe um **X** sobre a proporção: 2 com 30, 5 com x. Os produtos do X são iguais: **2 × 30 = 5 × x**, ou 60 = 5x. Divida os dois lados por 5: **x = 12**. Confira: 12/30 = 2/5.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'Na proporção a/b = c/d, a propriedade fundamental diz que:',
          options: [
            { text: 'a × d = b × c', why: 'Isso.' },
            { text: 'a + d = b + c', why: 'É produto, não soma.' },
            { text: 'a × b = c × d', why: 'Multiplicam-se extremos (a e d) e meios (b e c).' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'soma-termos',
      part: 'Proporção',
      title: 'Quando o problema dá o total',
      art: 'pessoal',
      goal: 'Usar a soma dos termos quando o total é conhecido.',
      explain:
        'A razão entre **analistas** e **técnicos** é **2/5**, e o setor tem **35** servidores dessas carreiras.\n\nPense em **partes**: 2 partes de analistas + 5 de técnicos = **7 partes** = 35 servidores. Cada parte vale **35 ÷ 7 = 5**.\n\nAnalistas = 2 × 5 = **10**; técnicos = 5 × 5 = **25**. Conferência: 10 + 25 = 35 e 10/25 = 2/5.\n\nCuidado: razão 2/5 **não** quer dizer que analistas são 2/5 do total. São **2/7**.',
      check: {
        kind: 'choice',
        id: 'st-c',
        prompt: 'A razão entre homens e mulheres numa equipe é 3/4, e a equipe tem 28 pessoas. Quantas são mulheres?',
        options: [
          { text: '16', why: 'Isso: 7 partes, cada uma vale 4; 4 × 4 = 16.' },
          { text: '21', why: '21 seria 3/4 de 28; aqui são 4 partes de 7.' },
          { text: '12', why: '12 é o número de homens (3 partes).' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Escreva as **partes**: homens 3, mulheres 4, total **7 partes**. 28 ÷ 7 = **4** por parte. Mulheres: 4 partes × 4 = **16**. Homens: 3 × 4 = 12. Some para conferir: 16 + 12 = 28.',
        check: {
          kind: 'choice',
          id: 'st-r',
          prompt: '"Se a razão entre A e B é 3/4, então A representa 3/4 do total A + B." Isso está:',
          options: [
            { text: 'Errado: A representa 3/7 do total', why: 'Isso: 3 partes de 7.' },
            { text: 'Certo', why: 'A razão compara A com B, não com o total.' },
            { text: 'Errado: A representa 4/7', why: '4/7 é a fração de B no total.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'grandezas',
      part: 'Grandezas',
      title: 'Direta ou inversa',
      art: 'interruptor',
      goal: 'Distinguir grandezas diretamente e inversamente proporcionais.',
      explain:
        '- **Diretamente proporcionais**: quando uma **dobra**, a outra **dobra**. A **razão** entre elas é constante. Ex.: páginas impressas e tempo de impressão.\n- **Inversamente proporcionais**: quando uma **dobra**, a outra **cai pela metade**. O **produto** é constante. Ex.: número de servidores e tempo para concluir a mesma tarefa.\n\nVelocidade e tempo, para a **mesma distância**, são **inversas**.',
      check: {
        kind: 'sort',
        id: 'gr-c',
        prompt: 'Direta ou inversa?',
        categories: ['Direta', 'Inversa'],
        items: [
          { text: 'Quantidade de cópias e custo total', cat: 0, why: 'Mais cópias, mais custo.' },
          { text: 'Servidores e prazo para a mesma tarefa', cat: 1, why: 'Mais servidores, menos dias.' },
          { text: 'Velocidade e tempo, mesma distância', cat: 1, why: 'Mais rápido, menos tempo.' },
          { text: 'Servidores e processos analisados no mesmo prazo', cat: 0, why: 'Mais servidores, mais processos.' },
        ],
      },
      recovery: {
        explain: 'Faça a pergunta: **"se esta aumentar, a outra aumenta ou diminui?"** Aumenta junto: **direta**. Diminui: **inversa**. Mais servidores fazem **mais** processos no mesmo prazo (direta), mas fazem a mesma tarefa em **menos** dias (inversa).',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Em grandezas inversamente proporcionais, o que se mantém constante?',
          options: [
            { text: 'O produto', why: 'Isso.' },
            { text: 'A razão', why: 'A razão constante é das diretas.' },
            { text: 'A soma', why: 'É o produto que se mantém.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'divisao-direta',
      part: 'Divisão proporcional',
      title: 'Rateio diretamente proporcional',
      art: 'abaco',
      goal: 'Dividir um valor em partes diretamente proporcionais.',
      explain:
        '**Divida o total pela soma dos pesos** e **multiplique por cada peso**.\n\nR$ 84.000 entre três setores, na proporção **2, 3 e 7**:\n\n- soma dos pesos: **12**;\n- constante: 84.000 ÷ 12 = **7.000**;\n- partes: 2 × 7.000 = **14.000**; 3 × 7.000 = **21.000**; 7 × 7.000 = **49.000**.\n\nConferência: 14.000 + 21.000 + 49.000 = 84.000.',
      check: {
        kind: 'choice',
        id: 'dd-c',
        prompt: 'R$ 30.000 divididos em partes diretamente proporcionais a 1, 2 e 3. Quanto recebe o peso 3?',
        options: [
          { text: 'R$ 15.000', why: 'Isso: 30.000 ÷ 6 = 5.000; 3 × 5.000.' },
          { text: 'R$ 10.000', why: '10.000 é a divisão em partes iguais.' },
          { text: 'R$ 5.000', why: '5.000 é a parte do peso 1.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Transforme pesos em **fatias de pizza**: 1 + 2 + 3 = **6 fatias**. A pizza inteira vale 30.000, então cada fatia vale **5.000**. Quem tem peso 3 leva **3 fatias**: 15.000. Some no fim para conferir: 5 + 10 + 15 = 30 mil.',
        check: {
          kind: 'choice',
          id: 'dd-r',
          prompt: 'Qual o primeiro passo do rateio diretamente proporcional?',
          options: [
            { text: 'Somar os pesos', why: 'Isso: depois divide-se o total por essa soma.' },
            { text: 'Dividir o total pelo número de setores', why: 'Isso dividiria em partes iguais.' },
            { text: 'Multiplicar os pesos entre si', why: 'Os pesos são somados.' },
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
      lines: ['Razão: a ÷ b', 'Proporção: a × d = b × c', 'Velocidade e tempo, mesma distância: diretas'],
      bug: 2,
      why: 'Para a mesma distância, velocidade e tempo são inversamente proporcionais.',
      fixed: 'Velocidade e tempo, mesma distância: inversas',
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-2',
      prompt: 'Ordene os passos do rateio diretamente proporcional.',
      items: ['Somar os pesos', 'Dividir o total pela soma', 'Multiplicar a constante por cada peso', 'Conferir se as partes somam o total'],
      why: 'Soma, constante, partes e conferência.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: R$ 54.000 entre equipes com 4, 6 e 8 auditorias, de forma diretamente proporcional. Quanto recebe a de 8?',
      options: [
        { text: 'R$ 24.000', why: 'Isso: 54.000 ÷ 18 = 3.000; 8 × 3.000.' },
        { text: 'R$ 18.000', why: '18.000 é a divisão igual, ou a parte da equipe de 6.' },
        { text: 'R$ 12.000', why: '12.000 é a parte da equipe de 4.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.007' }],
  summary: [
    'Razão: a ÷ b, "quanto de uma para cada unidade da outra". Escala 1:500.',
    'Proporção: a/b = c/d; multiplicar cruzado: a × d = b × c.',
    'Com o total: pense em partes. Razão 2/5 dá 2 partes de 7 no total, não 2/5.',
    'Direta: razão constante (dobra e dobra). Inversa: produto constante (dobra e cai à metade).',
    'Rateio direto: total ÷ soma dos pesos, vezes cada peso; confira a soma.',
  ],
};

export const matRazRegraTres: MicroLesson = {
  ...S,
  id: 'mat.razoes.3',
  series: { id: 'mat.razoes', order: 3 },
  title: 'Divisão inversa e regra de três',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um prêmio será dividido entre unidades conforme o número de pendências: quem tem menos pendências deve ganhar mais. Que tipo de divisão é essa?',
    options: [
      { text: 'Inversamente proporcional', why: 'Isso: menos pendências, mais prêmio. Esta aula ensina a calcular e segue para a regra de três.' },
      { text: 'Diretamente proporcional', why: 'Na direta, quem tem mais pendências ganharia mais.' },
      { text: 'Em partes iguais', why: 'Partes iguais ignoram as pendências.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'inversa',
      part: 'Divisão inversa',
      title: 'Rateio inversamente proporcional',
      art: 'balanca',
      goal: 'Dividir um valor em partes inversamente proporcionais.',
      explain:
        'Ser **inversamente** proporcional a 2, 3 e 6 é ser **diretamente** proporcional a **1/2, 1/3 e 1/6**.\n\nPara usar inteiros, multiplique pelo **MMC** dos denominadores (6): os pesos viram **3, 2 e 1**.\n\nR$ 72.000 na razão inversa de 2, 3 e 6 pendências: soma dos pesos 6; constante 72.000 ÷ 6 = 12.000. Partes: **36.000** (2 pendências), **24.000** (3) e **12.000** (6).\n\nQuem tem **menos** pendências recebe **mais**.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Dividir R$ 60 em partes inversamente proporcionais a 2 e 3. Quanto recebe o "2"?',
        options: [
          { text: 'R$ 36', why: 'Isso: pesos 3 e 2, soma 5, constante 12; 3 × 12.' },
          { text: 'R$ 24', why: '24 é a parte do "3". O menor número recebe mais.' },
          { text: 'R$ 30', why: '30 é a divisão igual.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: '**Inverta** os números e **troque por inteiros**: 2 e 3 viram 1/2 e 1/3; multiplicando por 6, ficam **3 e 2**. Agora é rateio direto: 3 + 2 = 5 partes; 60 ÷ 5 = 12; o "2" leva 3 × 12 = **36**. O menor número ficou com o maior peso.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'Inversamente proporcional a 1, 2 e 4 equivale a diretamente proporcional a:',
          options: [
            { text: '4, 2 e 1', why: 'Isso: 1, 1/2 e 1/4 vezes 4.' },
            { text: '1, 2 e 4', why: 'Esses são os próprios números: isso seria a direta.' },
            { text: '2, 4 e 8', why: 'É preciso inverter, não dobrar.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'simples-direta',
      part: 'Regra de três',
      title: 'Regra de três simples direta',
      art: 'cartao',
      goal: 'Montar e resolver uma regra de três simples direta.',
      explain:
        'Monte as grandezas em **colunas**, veja se a relação é **direta** ou **inversa** e resolva.\n\n4 impressoras imprimem **1.200 páginas em 30 minutos**. Em **45 minutos**, imprimem x.\n\nMais tempo, mais páginas: **direta**.\n\n**x = 1.200 × 45 / 30 = 1.800 páginas**.',
      check: {
        kind: 'choice',
        id: 'sd-c',
        prompt: 'Em 20 minutos, a equipe digitaliza 300 páginas. Em 50 minutos, mantido o ritmo, quantas?',
        options: [
          { text: '750', why: 'Isso: 300 × 50 / 20.' },
          { text: '120', why: 'Mais tempo dá mais páginas, não menos.' },
          { text: '330', why: 'Não se somam os 30 minutos a mais: multiplica-se pela razão.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Passe pela unidade: em 20 minutos, 300 páginas, ou seja, **15 por minuto**. Em 50 minutos: 50 × 15 = **750**. A conta 300 × 50 / 20 é o mesmo caminho, numa linha só.',
        check: {
          kind: 'choice',
          id: 'sd-r',
          prompt: 'Na regra de três direta, se uma grandeza aumenta, a outra:',
          options: [
            { text: 'Aumenta na mesma proporção', why: 'Isso.' },
            { text: 'Diminui', why: 'Isso é a inversa.' },
            { text: 'Fica igual', why: 'Na direta, as duas variam juntas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'simples-inversa',
      part: 'Regra de três',
      title: 'Regra de três simples inversa',
      art: 'pessoal',
      goal: 'Resolver uma regra de três simples inversa.',
      explain:
        '**6 servidores** concluem um inventário em **15 dias**. Com **9 servidores**, em quantos dias?\n\nMais servidores, **menos** dias: **inversa**. O **produto** se mantém:\n\n**6 × 15 = 9 × x** → 90 = 9x → **x = 10 dias**.\n\nO produto 90 é o "trabalho total" em servidor-dias.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: '4 técnicos instalam os computadores de um andar em 6 dias. Com 8 técnicos, em quantos dias?',
        options: [
          { text: '3 dias', why: 'Isso: 4 × 6 = 8 × x.' },
          { text: '12 dias', why: 'Mais técnicos terminam mais rápido, não mais devagar.' },
          { text: '6 dias', why: 'Com o dobro de técnicos, o prazo cai à metade.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense no **trabalho total**: 4 técnicos × 6 dias = **24 técnico-dias**. Esse trabalho não muda. Com 8 técnicos: 24 ÷ 8 = **3 dias**. Dobrou a equipe, caiu à metade o prazo.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Por que servidores e dias, para a mesma tarefa, são inversos?',
          options: [
            { text: 'Mais servidores, menos dias: o produto se mantém', why: 'Isso.' },
            { text: 'Mais servidores, mais dias', why: 'É o contrário.' },
            { text: 'Não têm relação', why: 'Têm: o trabalho total é fixo.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'composta',
      part: 'Regra de três composta',
      title: 'Uma grandeza de cada vez',
      art: 'degraus',
      goal: 'Montar uma regra de três composta comparando cada grandeza com a procurada.',
      explain:
        '**8 auditores**, **6 horas/dia**, analisam **240 contratos** em **10 dias**. Quantos dias para **12 auditores**, **5 horas/dia**, **360 contratos**?\n\nCompare cada grandeza **com os dias**, uma de cada vez:\n\n- contratos 240 → 360: **direta** (mais contratos, mais dias): × 360/240;\n- auditores 8 → 12: **inversa**: × 8/12;\n- horas 6 → 5: **inversa**: × 6/5.\n\nDias = 10 × 1,5 × (2/3) × 1,2 = **12 dias**.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Na regra de três composta, como cada grandeza é analisada?',
        options: [
          { text: 'Comparada com a procurada, mantendo as demais fixas', why: 'Isso.' },
          { text: 'Todas tratadas como diretas', why: 'É o erro típico: algumas são inversas.' },
          { text: 'Comparadas entre si, duas a duas', why: 'Cada uma é comparada com a grandeza procurada.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Faça uma pergunta por linha: "se **só esta** aumentar, os **dias** aumentam ou diminuem?". Contratos: aumentam (direta, fração como está). Auditores: diminuem (inversa, fração invertida). Horas: diminuem (inversa). Multiplique o prazo antigo por todas as frações.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'No exemplo, por que horas por dia é inversa aos dias?',
          options: [
            { text: 'Trabalhando menos horas por dia, são necessários mais dias', why: 'Isso.' },
            { text: 'Porque horas e dias são a mesma coisa', why: 'São grandezas diferentes; menos horas pedem mais dias.' },
            { text: 'Porque toda grandeza é inversa', why: 'Contratos, no exemplo, é direta.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'produtividade',
      part: 'Regra de três composta',
      title: 'Conferindo pela produtividade',
      art: 'alvo',
      goal: 'Conferir uma regra de três composta pela produtividade.',
      explain:
        'Outra forma de resolver, ótima para conferir:\n\n1. **Produtividade**: 240 contratos ÷ (8 × 6 × 10) auditor-horas = **0,5 contrato por auditor-hora**.\n2. **Nova situação**: 360 = 0,5 × 12 × 5 × d → 360 = 30d → **d = 12**.\n\nOs dois métodos dão **12 dias**.\n\nO erro típico é tratar tudo como direto, ou inverter só uma grandeza.',
      check: {
        kind: 'choice',
        id: 'pd-c',
        prompt: '6 analistas, 8 h/dia, analisam 432 prestações em 9 dias. Qual a produtividade por analista-hora?',
        options: [
          { text: '1 prestação por analista-hora', why: 'Isso: 432 ÷ (6 × 8 × 9) = 432 ÷ 432.' },
          { text: '8 prestações por analista-hora', why: 'Divida pelo produto de analistas, horas e dias: 432.' },
          { text: '48 prestações por analista-hora', why: '432 ÷ 9 = 48 é por dia, para a equipe toda.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte o **trabalho em analista-horas**: 6 analistas × 8 horas × 9 dias = **432 analista-horas**. Foram feitas 432 prestações: **1 por analista-hora**. Com 9 analistas e 6 h/dia, cada dia rende 54 prestações; 648 prestações levam 648 ÷ 54 = **12 dias**.',
        check: {
          kind: 'choice',
          id: 'pd-r',
          prompt: 'Para que serve o método da produtividade?',
          options: [
            { text: 'Para resolver ou conferir a regra de três composta', why: 'Isso.' },
            { text: 'Para achar números primos', why: 'Isso é o crivo.' },
            { text: 'Para calcular razão inversa sem pesos', why: 'Serve para a regra de três composta.' },
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
      lines: ['Inversa a 2 e 3: pesos 3 e 2', 'Mais servidores, menos dias: inversa', 'Na composta, todas as grandezas são diretas'],
      bug: 2,
      why: 'Cada grandeza é comparada com a procurada: algumas são inversas.',
      fixed: 'Na composta, cada grandeza é comparada com a procurada',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Em relação ao prazo em dias, cada grandeza é direta ou inversa?',
      categories: ['Direta', 'Inversa'],
      items: [
        { text: 'Número de processos a analisar', cat: 0, why: 'Mais processos, mais dias.' },
        { text: 'Número de analistas', cat: 1, why: 'Mais analistas, menos dias.' },
        { text: 'Horas trabalhadas por dia', cat: 1, why: 'Mais horas, menos dias.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: R$ 35.000 divididos inversamente às faltas 1, 2 e 4. Quanto recebe quem teve 4 faltas?',
      options: [
        { text: 'R$ 5.000', why: 'Isso: pesos 4, 2 e 1; 35.000 ÷ 7 = 5.000.' },
        { text: 'R$ 20.000', why: '20.000 é de quem teve 1 falta; ou da divisão direta.' },
        { text: 'R$ 8.750', why: 'Dividiu por 4 sem montar a proporção.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.mat.01.009' },
  ],
  summary: [
    'Inversa: inverta os números e multiplique pelo MMC dos denominadores; depois, rateio direto. Menor número, maior parte.',
    'Simples direta: mais de uma, mais da outra (passe pela unidade).',
    'Simples inversa: o produto se mantém (trabalho total).',
    'Composta: compare cada grandeza com a procurada, uma de cada vez; inverta as inversas.',
    'Confira pela produtividade (por servidor-hora).',
  ],
};
