// Série "Estruturas de dados, buscas e ordenação" (cap.dev.03, trecho estruturas), no ritmo lento com
// história pedido em 25/10/2026: a primeira aula conta de Euler a Tony Hoare; as seguintes ensinam
// estruturas lineares, árvores, heap, hash e grafos, depois buscas e ordenação, uma ideia por etapa.
// Fatos conferidos com o texto do capítulo (02-estruturas.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.dev.03', sectionId: 'estruturas' } as const;

export const devEstHistoria: MicroLesson = {
  ...S,
  id: 'dev.estruturas.1',
  series: { id: 'dev.estruturas', order: 1 },
  title: 'Das pontes de Euler ao quick sort',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma pilha de pratos, uma fila de banco e um fichário em ordem alfabética guardam coisas de jeitos diferentes. Isso importa para o computador?',
    options: [
      { text: 'Sim: cada jeito torna uma tarefa mais rápida', why: 'Isso. São estruturas de dados, e esta aula conta como foram inventadas.' },
      { text: 'Não: o computador guarda tudo igual', why: 'Ele pode guardar de muitos jeitos, e a escolha muda a velocidade. Esta aula conta a história.' },
      { text: 'Só em computadores antigos', why: 'Continua importando hoje. Esta aula mostra de onde vêm essas ideias.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'euler',
      part: 'A história',
      title: '1736: as pontes de Königsberg',
      art: 'rede',
      goal: 'Saber que a teoria dos grafos começou com Euler.',
      explain:
        'A cidade de **Königsberg** tinha **sete pontes**. Os moradores se perguntavam: dá para atravessar **todas**, **uma única vez** cada?\n\nEm **1736**, **Leonhard Euler** provou que **não**. Para isso, trocou o mapa por **pontos** (as margens) e **linhas** (as pontes).\n\nNascia a **teoria dos grafos**: **vértices** ligados por **arestas**.',
      check: {
        kind: 'choice',
        id: 'eu-c',
        prompt: 'Num grafo, o que são vértices e arestas?',
        options: [
          { text: 'Vértices são os pontos; arestas, as ligações', why: 'Isso: margens e pontes.' },
          { text: 'Vértices são as ligações; arestas, os pontos', why: 'É o contrário.' },
          { text: 'São nomes de linguagens de programação', why: 'São as partes de um grafo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num **mapa de metrô**: as **estações** são os vértices; as **linhas entre elas** são as arestas. Euler fez isso com Königsberg: deixou de lado ruas e casas e ficou só com pontos e ligações.',
        check: {
          kind: 'choice',
          id: 'eu-r',
          prompt: 'Quem iniciou a teoria dos grafos, em 1736?',
          options: [
            { text: 'Leonhard Euler', why: 'Isso.' },
            { text: 'Tony Hoare', why: 'Hoare criou o quick sort, em 1959.' },
            { text: 'Fibonacci', why: 'Fibonacci é de 1202 e propôs a sequência dos coelhos.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'vonneumann',
      part: 'A história',
      title: '1945 e 1946: ordenar e buscar',
      art: 'chip',
      goal: 'Saber que o merge sort e a busca binária vêm dos primeiros computadores.',
      explain:
        'Assim que surgiram os computadores, surgiu a necessidade de **ordenar** e **buscar**.\n\nEm **1945**, **John von Neumann** descreveu o **merge sort**: dividir ao meio, ordenar as metades e **intercalar**.\n\nEm **1946**, **John Mauchly**, um dos criadores do ENIAC, citou a **busca binária** numa série de palestras: em lista ordenada, olhar o meio e descartar metade.',
      check: {
        kind: 'choice',
        id: 'vn-c',
        prompt: 'Quem descreveu o merge sort em 1945?',
        options: [
          { text: 'John von Neumann', why: 'Isso.' },
          { text: 'John Mauchly', why: 'Mauchly citou a busca binária, em 1946.' },
          { text: 'Hans Peter Luhn', why: 'Luhn descreveu a ideia do hash, em 1953.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O mesmo **von Neumann** do programa guardado na memória pensou também em **ordenar**: dividir a pilha de fichas ao meio, arrumar cada metade e **juntar** as duas pilhas já em ordem. E Mauchly, do ENIAC, lembrou o truque do **dicionário**: abrir no meio e descartar a metade errada.',
        check: {
          kind: 'choice',
          id: 'vn-r',
          prompt: 'O que a busca binária faz a cada passo?',
          options: [
            { text: 'Olha o meio e descarta metade', why: 'Isso, em lista ordenada.' },
            { text: 'Olha todos os itens, um a um', why: 'Isso é a busca linear.' },
            { text: 'Embaralha a lista', why: 'Ela precisa da lista ordenada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'luhn-pilha',
      part: 'A história',
      title: 'Anos 1950: hash e pilha',
      art: 'cartao',
      goal: 'Saber de onde vêm a tabela hash e a pilha.',
      explain:
        'Em **1953**, **Hans Peter Luhn**, da **IBM**, descreveu a ideia de espalhar as chaves em **"baldes"** usando uma **função**: a origem da **tabela hash**.\n\nNos **anos 1950**, os alemães **Friedrich Bauer** e **Klaus Samelson** descreveram o princípio da **pilha** para traduzir **fórmulas** em programas: o último símbolo guardado é o primeiro a ser usado.',
      check: {
        kind: 'sort',
        id: 'lp-c',
        prompt: 'Quem descreveu cada ideia?',
        categories: ['Luhn', 'Bauer e Samelson'],
        items: [
          { text: 'Espalhar chaves em baldes por uma função', cat: 0, why: 'Origem do hash.' },
          { text: 'Último guardado, primeiro usado, para traduzir fórmulas', cat: 1, why: 'Princípio da pilha.' },
        ],
      },
      recovery: {
        explain: 'O **hash** é como um **arquivo de gavetas por inicial**: uma regra (a primeira letra) diz em que gaveta procurar, sem olhar as outras. A **pilha** é como **pratos empilhados**: o último que você pôs é o primeiro que tira.',
        check: {
          kind: 'choice',
          id: 'lp-r',
          prompt: 'Hans Peter Luhn trabalhava em qual empresa quando descreveu a ideia do hash?',
          options: [
            { text: 'IBM', why: 'Isso, em 1953.' },
            { text: 'Xerox', why: 'Na Xerox nasceu o Smalltalk, nos anos 1970.' },
            { text: 'CERN', why: 'No CERN nasceu a Web.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'hoare-avl',
      part: 'A história',
      title: '1959 a 1962: quick sort e árvore AVL',
      art: 'degraus',
      goal: 'Conhecer o quick sort de Hoare e a árvore AVL.',
      explain:
        'Em **1959**, **Tony Hoare** criou o **quick sort** (publicado em **1961**): escolher um **pivô**, separar menores e maiores e ordenar cada parte. Até hoje é dos mais rápidos na prática.\n\nEm **1962**, **Adelson-Velsky** e **Landis** publicaram a **árvore AVL** (as iniciais dos dois), a primeira árvore de busca que **se rebalanceia sozinha**.',
      check: {
        kind: 'order',
        id: 'ha-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Pontes de Königsberg (1736)', 'Merge sort de von Neumann (1945)', 'Hash de Luhn (1953)', 'Árvore AVL (1962)'],
        why: '1736, 1945, 1953 e 1962.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Quick sort é como **separar processos** por um valor de referência (o pivô): os menores para um lado, os maiores para o outro, e repetir em cada lado. A **AVL** leva no nome as iniciais de **A**delson-**V**elsky e **L**andis, e se reorganiza para não ficar torta.',
        check: {
          kind: 'choice',
          id: 'ha-r',
          prompt: 'O que o quick sort escolhe para separar os elementos?',
          options: [
            { text: 'Um pivô', why: 'Isso.' },
            { text: 'Uma chave estrangeira', why: 'Chave estrangeira é de banco de dados.' },
            { text: 'Um caso base', why: 'Caso base é da recursão; o quick sort separa por um pivô.' },
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
      lines: ['Euler (1736): teoria dos grafos', 'von Neumann (1945): merge sort', 'Tony Hoare (1959): árvore AVL'],
      bug: 2,
      why: 'Hoare criou o quick sort; a AVL é de Adelson-Velsky e Landis (1962).',
      fixed: 'Tony Hoare (1959): quick sort',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que comparação do dia a dia combina com cada estrutura?',
      categories: ['Pilha', 'Hash', 'Grafo'],
      items: [
        { text: 'Pratos empilhados', cat: 0, why: 'Último a entrar, primeiro a sair.' },
        { text: 'Gavetas por inicial', cat: 1, why: 'Uma regra diz a gaveta.' },
        { text: 'Mapa de metrô', cat: 2, why: 'Estações e ligações.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a auditoria quer saber quais empresas se ligam por sócios em comum. Que estrutura modela isso?',
      options: [
        { text: 'Um grafo: empresas como vértices, sócios em comum como arestas', why: 'Isso.' },
        { text: 'Uma pilha', why: 'A pilha guarda a ordem de chegada invertida; não modela ligações.' },
        { text: 'Um vetor ordenado', why: 'O vetor não representa ligações entre empresas.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Euler (1736), pontes de Königsberg: início da teoria dos grafos (vértices e arestas).',
    'Von Neumann descreveu o merge sort (1945); Mauchly citou a busca binária (1946).',
    'Luhn, da IBM (1953): ideia do hash. Bauer e Samelson (anos 1950): princípio da pilha.',
    'Hoare criou o quick sort (1959, publicado em 1961); a árvore AVL, que se rebalanceia, é de 1962.',
  ],
};

export const devEstLineares: MicroLesson = {
  ...S,
  id: 'dev.estruturas.2',
  series: { id: 'dev.estruturas', order: 2 },
  title: 'Vetor, lista, pilha, fila, árvores e hash',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O botão "desfazer" de um editor desfaz primeiro a última ação feita. Que estrutura funciona assim?',
    options: [
      { text: 'A pilha', why: 'Isso: o último a entrar é o primeiro a sair. Esta aula mostra essa e outras estruturas.' },
      { text: 'A fila', why: 'A fila atende primeiro quem chegou primeiro, o contrário do desfazer.' },
      { text: 'O vetor ordenado', why: 'O desfazer depende da ordem de chegada invertida: pilha.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'vetor-lista',
      part: 'Lineares',
      title: 'Vetor e lista ligada',
      art: 'trilha',
      goal: 'Comparar vetor e lista ligada.',
      explain:
        '- **Vetor** (*array*): posições **contíguas** na memória. Acesso por posição em **O(1)**; inserir **no meio** custa **O(n)**, porque desloca elementos.\n- **Lista ligada**: **nós** com valor e **ponteiro** para o próximo. Acesso por posição em **O(n)**; inserir custa **O(1)** quando já se tem a referência do nó (ou no início).\n\nA **lista duplamente ligada** tem ponteiros para o próximo **e** para o anterior.',
      check: {
        kind: 'choice',
        id: 'vl-c',
        prompt: 'Qual estrutura acessa o 500º elemento em O(1)?',
        options: [
          { text: 'Vetor', why: 'Isso: posições contíguas, acesso direto.' },
          { text: 'Lista ligada', why: 'Na lista, é preciso percorrer nó a nó: O(n).' },
          { text: 'Fila', why: 'A fila só dá acesso à frente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **vetor** é uma **fileira de cadeiras numeradas**: você vai direto à cadeira 500, mas encaixar alguém no meio obriga todos a chegar para o lado. A **lista ligada** é uma **caça ao tesouro**: cada pista diz onde está a próxima; achar a 500ª exige seguir todas, mas incluir uma pista nova é só trocar um bilhete.',
        check: {
          kind: 'choice',
          id: 'vl-r',
          prompt: 'Por que inserir no meio de um vetor custa O(n)?',
          options: [
            { text: 'É preciso deslocar os elementos seguintes', why: 'Isso.' },
            { text: 'O vetor não aceita inserção', why: 'Aceita, mas desloca os seguintes.' },
            { text: 'Precisa ordenar tudo de novo', why: 'Não precisa ordenar; precisa deslocar.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pilha-fila',
      part: 'Lineares',
      title: 'Pilha (LIFO) e fila (FIFO)',
      art: 'cartao',
      goal: 'Distinguir pilha de fila e reconhecer usos.',
      explain:
        '- **Pilha** (*stack*): **LIFO**, último a entrar, primeiro a sair. **push** e **pop** em O(1). Usos: **desfazer**, **pilha de chamadas**, verificar **parênteses balanceados**.\n- **Fila** (*queue*): **FIFO**, primeiro a entrar, primeiro a sair. **enqueue** no fim e **dequeue** no início em O(1). Usos: **fila de impressão**, requisições **por ordem de chegada**, **busca em largura**.',
      check: {
        kind: 'sort',
        id: 'pf-c',
        prompt: 'Pilha ou fila?',
        categories: ['Pilha', 'Fila'],
        items: [
          { text: 'Botão desfazer', cat: 0, why: 'A última ação sai primeiro.' },
          { text: 'Fila de impressão', cat: 1, why: 'Por ordem de chegada.' },
          { text: 'Verificar parênteses balanceados', cat: 0, why: 'Último aberto, primeiro fechado.' },
          { text: 'Atender requisições por ordem de chegada', cat: 1, why: 'FIFO.' },
        ],
      },
      recovery: {
        explain: '**Pilha de pratos**: o último posto é o primeiro tirado (LIFO). **Fila do banco**: quem chegou primeiro é atendido primeiro (FIFO). Lembre pela letra: **L**IFO, "**L**ast in"; **F**IFO, "**F**irst in".',
        check: {
          kind: 'choice',
          id: 'pf-r',
          prompt: '"Pilha segue a política FIFO." Isso está:',
          options: [
            { text: 'Errado: pilha é LIFO; fila é FIFO', why: 'Isso.' },
            { text: 'Certo', why: 'É o contrário.' },
            { text: 'Certo só em Java', why: 'Em qualquer linguagem, pilha é LIFO.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'abb',
      part: 'Árvores',
      title: 'Árvore binária de busca',
      art: 'degraus',
      goal: 'Entender a ABB, seus custos e percursos.',
      explain:
        'Na **árvore binária de busca** (ABB), cada nó tem até **dois filhos**; à **esquerda** ficam os **menores**, à **direita**, os **maiores**.\n\nBusca, inserção e remoção custam **O(h)**, a altura. Equilibrada, h ≈ **log n**. Se os valores entram **já ordenados**, ela vira uma "lista" e o pior caso é **O(n)**. Árvores **balanceadas** (AVL, rubro-negra) fazem **rotações** para garantir O(log n).\n\nPercurso **em ordem** (esquerda, raiz, direita) visita os valores em **ordem crescente**.',
      check: {
        kind: 'choice',
        id: 'ab-c',
        prompt: 'Números de processo entram já em ordem crescente numa ABB sem balanceamento. Qual o pior caso da busca?',
        options: [
          { text: 'O(n)', why: 'Isso: a árvore vira uma lista.' },
          { text: 'O(log n)', why: 'Só se estivesse equilibrada.' },
          { text: 'O(1)', why: 'Buscar numa árvore não é acesso direto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Inserir 1, 2, 3, 4, 5 em ordem: cada um é maior que o anterior e vai **sempre para a direita**. A árvore fica como uma **escada de um lado só**, e buscar o 5 obriga a passar por todos: O(n). As árvores **balanceadas** giram os nós para manter a árvore "baixa".',
        check: {
          kind: 'order',
          id: 'ab-r',
          prompt: 'Ordene as visitas do percurso em ordem.',
          items: ['Subárvore esquerda', 'Raiz', 'Subárvore direita'],
          why: 'Esquerda, raiz, direita: dá os valores em ordem crescente.',
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'heap',
      part: 'Árvores',
      title: 'Heap: fila de prioridade',
      art: 'alvo',
      goal: 'Saber o que é heap e para que serve.',
      explain:
        'O **heap binário** é uma árvore binária **completa**, normalmente guardada em vetor, em que cada **pai** é **maior** (heap de máximo) ou **menor** (heap de mínimo) que seus filhos.\n\n- Consultar o topo: **O(1)**.\n- Inserir e remover o topo: **O(log n)**.\n\nÉ a implementação usual de **fila de prioridade**, por exemplo para atender primeiro os processos com **prazo mais próximo**.\n\nAtenção: heap **não é ABB**; irmãos não têm ordem entre si.',
      check: {
        kind: 'choice',
        id: 'hp-c',
        prompt: 'Para sempre atender primeiro o processo de prazo mais próximo, a estrutura usual é:',
        options: [
          { text: 'Heap (fila de prioridade)', why: 'Isso: o mais urgente fica no topo.' },
          { text: 'Fila comum', why: 'A fila comum atende por ordem de chegada, não de prioridade.' },
          { text: 'Pilha', why: 'A pilha atende o último que chegou.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **pronto-socorro**, não vale a ordem de chegada: o caso **mais grave** é atendido primeiro. O heap é essa triagem: o mais urgente está sempre no **topo**, e reorganizar após cada atendimento custa só O(log n).',
        check: {
          kind: 'choice',
          id: 'hp-r',
          prompt: 'Um heap é uma árvore binária de busca?',
          options: [
            { text: 'Não: só pai e filho têm ordem; irmãos, não', why: 'Isso.' },
            { text: 'Sim, sempre', why: 'No heap, irmãos não têm ordem entre si.' },
            { text: 'Só o heap de mínimo', why: 'Nenhum dos dois é ABB.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'hash',
      part: 'Hash e grafos',
      title: 'Tabela hash',
      art: 'dados',
      goal: 'Entender tabela hash, colisões e custos.',
      explain:
        'Na **tabela hash** (dicionário, mapa), uma **função hash** transforma a **chave** num **índice** do vetor interno.\n\n- Inserção, busca e remoção: **O(1) em média**.\n- Duas chaves no mesmo índice geram **colisão**, tratada por **encadeamento** (lista em cada posição) ou **endereçamento aberto** (procura outra posição livre).\n- Com muitas colisões, o pior caso chega a **O(n)**.\n- Tabelas hash **não mantêm os dados ordenados**.',
      check: {
        kind: 'choice',
        id: 'hs-c',
        prompt: 'Duas chaves caem no mesmo índice. Isso se chama:',
        options: [
          { text: 'Colisão', why: 'Isso.' },
          { text: 'Rotação', why: 'Rotação é de árvores balanceadas.' },
          { text: 'Fall-through', why: 'Fall-through é do switch sem break.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Volte às **gavetas por inicial**: "Ana" e "André" caem na gaveta A. Isso é a **colisão**. Ou a gaveta tem uma **lista** dentro (encadeamento), ou André vai para a **próxima gaveta livre** (endereçamento aberto). Se todos os nomes começarem com A, volta-se a procurar um a um: O(n).',
        check: {
          kind: 'choice',
          id: 'hs-r',
          prompt: 'Qual o custo médio de buscar uma chave numa tabela hash?',
          options: [
            { text: 'O(1)', why: 'Isso, em média.' },
            { text: 'O(log n)', why: 'Esse é o custo da busca binária.' },
            { text: 'O(n²)', why: 'Muito mais rápido que isso.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'grafo',
      part: 'Hash e grafos',
      title: 'Grafos, BFS e DFS',
      art: 'rede',
      goal: 'Conhecer as representações de grafo e as buscas BFS e DFS.',
      explain:
        '**Grafo**: **vértices** ligados por **arestas**, dirigidas ou não, com ou sem peso.\n\n- **Matriz de adjacência**: espaço O(V²); bom para grafos **densos**.\n- **Lista de adjacência**: espaço O(V + E); bom para grafos **esparsos**.\n\n- **Busca em largura (BFS)** usa **fila** e acha o caminho com **menos arestas** em grafo não ponderado.\n- **Busca em profundidade (DFS)** usa **pilha** (ou recursão).\n\nNuma auditoria, uma BFS a partir de uma empresa revela as ligadas por sócios a uma, duas, três "distâncias".',
      check: {
        kind: 'choice',
        id: 'gr-c',
        prompt: 'Que estrutura auxiliar a busca em largura (BFS) usa?',
        options: [
          { text: 'Fila', why: 'Isso.' },
          { text: 'Pilha', why: 'A pilha é da busca em profundidade (DFS).' },
          { text: 'Heap', why: 'O heap é fila de prioridade, usada em outros algoritmos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **BFS** é como uma **pedra na água**: primeiro os vizinhos diretos, depois os vizinhos dos vizinhos, em ondas. Para isso usa **fila**. A **DFS** é como explorar um **labirinto**: vai fundo por um caminho e só volta quando não dá mais. Para isso usa **pilha**.',
        check: {
          kind: 'choice',
          id: 'gr-r',
          prompt: 'Para um grafo esparso, a representação mais econômica é:',
          options: [
            { text: 'Lista de adjacência', why: 'Isso: O(V + E).' },
            { text: 'Matriz de adjacência', why: 'A matriz ocupa O(V²), mesmo com poucas arestas.' },
            { text: 'Tabela hash sem chaves', why: 'A forma usual é a lista de adjacência.' },
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
      prompt: 'Que estrutura usar em cada caso?',
      categories: ['Fila', 'Heap', 'Tabela hash'],
      items: [
        { text: 'Atender pedidos por ordem de chegada', cat: 0, why: 'FIFO.' },
        { text: 'Atender primeiro o prazo mais curto', cat: 1, why: 'Prioridade.' },
        { text: 'Achar o nome do órgão pelo código, rápido', cat: 2, why: 'Busca por chave em O(1) médio.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Vetor: acesso por posição em O(1)', 'BFS usa fila', 'ABB sempre garante busca em O(log n)'],
      bug: 2,
      why: 'Sem balanceamento, a ABB pode degenerar e chegar a O(n).',
      fixed: 'ABB balanceada garante O(log n)',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Para guardar os documentos de um processo e inserir muitos no início, qual estrutura é melhor?',
      scenarios: [
        { title: 'Estrutura A', body: 'Vetor: cada inserção no início desloca todos os outros.' },
        { title: 'Estrutura B', body: 'Lista ligada: inserir no início é só criar um nó e apontar para o antigo primeiro.' },
      ],
      answer: 1,
      why: 'Na lista ligada, inserir no início é O(1); no vetor, O(n).',
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.005' }],
  summary: [
    'Vetor: acesso O(1), inserção no meio O(n). Lista ligada: acesso O(n), inserção O(1) com a referência.',
    'Pilha: LIFO (desfazer, chamadas, parênteses). Fila: FIFO (impressão, ordem de chegada, BFS).',
    'ABB: esquerda menor, direita maior; O(h). Sem balanceamento, pode ir a O(n). Em ordem dá ordem crescente.',
    'Heap: pai maior (ou menor) que os filhos; topo O(1), inserir e remover O(log n); fila de prioridade.',
    'Hash: O(1) médio, colisões por encadeamento ou endereçamento aberto, sem ordem. Grafos: BFS com fila, DFS com pilha.',
  ],
};

export const devEstOrdenacao: MicroLesson = {
  ...S,
  id: 'dev.estruturas.3',
  series: { id: 'dev.estruturas', order: 3 },
  title: 'Buscas e ordenação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você procura um CPF numa lista de 1 milhão, em ordem. Olhando um por um, podem ser 1 milhão de olhadas. Existe jeito mais rápido?',
    options: [
      { text: 'Sim: olhar o meio e descartar metade, repetidas vezes', why: 'Isso: é a busca binária. Esta aula mostra quantas olhadas bastam.' },
      { text: 'Não: tem que olhar todos', why: 'Com a lista em ordem, dá para descartar metade a cada olhada.' },
      { text: 'Só com um computador quântico', why: 'Basta um truque antigo: a busca binária.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'buscas',
      part: 'Buscas',
      title: 'Linear e binária',
      art: 'alvo',
      goal: 'Comparar busca linear e binária e estimar o número de comparações.',
      explain:
        '- **Busca linear**: percorre um a um. **O(n)**. Funciona em **qualquer** coleção.\n- **Busca binária**: exige vetor **ordenado** com acesso por índice; a cada passo **descarta metade**. **O(log n)**.\n\nEm **1 milhão** de registros, a binária faz no máximo **cerca de 20** comparações, porque 2²⁰ é pouco mais de 1 milhão.\n\nNo código, **meio = ini + (fim − ini) / 2** evita estouro de inteiro.',
      check: {
        kind: 'choice',
        id: 'bu-c',
        prompt: 'Busca binária num vetor ordenado de 1.000.000 de CPFs. O máximo aproximado de comparações é:',
        options: [
          { text: 'Cerca de 20', why: 'Isso: 2²⁰ ≈ 1 milhão.' },
          { text: 'Cerca de 1.000', why: 'Bem menos: cada passo divide por 2.' },
          { text: '1.000.000', why: 'Isso seria a busca linear no pior caso.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Divida por 2 até sobrar 1: 1.000.000, 500.000, 250.000... Contando, são cerca de **20 divisões**. Cada divisão é uma comparação. Por isso a binária é O(log n): o número de passos cresce muito devagar.',
        check: {
          kind: 'choice',
          id: 'bu-r',
          prompt: '"A busca binária pode ser aplicada a qualquer vetor, ordenado ou não." Isso está:',
          options: [
            { text: 'Errado: ela exige dados ordenados', why: 'Isso.' },
            { text: 'Certo', why: 'Sem ordem, descartar metade não faz sentido.' },
            { text: 'Certo se o vetor for pequeno', why: 'Mesmo pequeno, precisa estar ordenado.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'simples',
      part: 'Ordenação',
      title: 'Bolha, inserção e seleção',
      art: 'cartao',
      goal: 'Distinguir os três algoritmos simples de ordenação.',
      explain:
        '- **Bolha** (*bubble*): compara **vizinhos** e troca se estiverem fora de ordem; a cada passada o maior "**sobe**" para o fim. O(n²); melhor caso O(n) se parar quando não houver troca.\n- **Inserção**: insere cada elemento na posição certa da parte já ordenada, como quem **organiza cartas na mão**. Bom para vetores **pequenos ou quase ordenados**.\n- **Seleção**: procura o **menor** da parte restante e o põe na posição seguinte. Sempre O(n²) comparações, mas só O(n) **trocas**.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'Qual algoritmo funciona como quem organiza cartas na mão?',
        options: [
          { text: 'Inserção', why: 'Isso.' },
          { text: 'Bolha', why: 'A bolha troca vizinhos e faz o maior subir.' },
          { text: 'Seleção', why: 'A seleção procura o menor do resto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Três imagens: **bolha** é a bolha de ar que sobe no copo (o maior vai para o fim); **inserção** é a carta nova encaixada no lugar certo da mão; **seleção** é **escolher** o menor da mesa e pôr na fila, um por vez.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Qual algoritmo simples faz poucas trocas, só O(n)?',
          options: [
            { text: 'Seleção', why: 'Isso: uma troca por posição.' },
            { text: 'Bolha', why: 'A bolha pode trocar muito, O(n²).' },
            { text: 'Inserção', why: 'A inserção desloca muitos elementos no caso médio.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'merge-quick',
      part: 'Ordenação',
      title: 'Merge sort, quick sort e heap sort',
      art: 'degraus',
      goal: 'Comparar merge, quick e heap sort.',
      explain:
        '- **Merge sort**: divide ao meio, ordena as metades e **intercala**. **Divisão e conquista**. **O(n log n) em todos os casos**, mas precisa de memória **O(n)**.\n- **Quick sort**: escolhe um **pivô** e particiona. Muito rápido na prática; **pior caso O(n²)** quando o pivô divide mal, como pegar sempre o primeiro de um vetor já ordenado.\n- **Heap sort**: O(n log n) em todos os casos, memória extra O(1).',
      check: {
        kind: 'choice',
        id: 'mq-c',
        prompt: 'Qual destes tem pior caso O(n²)?',
        options: [
          { text: 'Quick sort', why: 'Isso: quando o pivô divide mal.' },
          { text: 'Merge sort', why: 'O merge garante O(n log n) sempre.' },
          { text: 'Heap sort', why: 'O heap sort também garante O(n log n).' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O quick sort depende da **sorte do pivô**: se ele cair no meio, divide bem; se for sempre o menor, cada passo só tira um elemento e vira O(n²). O merge **sempre** divide ao meio, por isso garante O(n log n), pagando com a memória extra para intercalar.',
        check: {
          kind: 'choice',
          id: 'mq-r',
          prompt: '"O merge sort é estável e tem O(n log n) no pior caso." Isso está:',
          options: [
            { text: 'Certo; o custo é a memória auxiliar O(n)', why: 'Isso.' },
            { text: 'Errado: o pior caso é O(n²)', why: 'Isso vale para o quick sort, não para o merge.' },
            { text: 'Errado: o merge não é estável', why: 'O merge é estável.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'estavel',
      part: 'Ordenação',
      title: 'O que é ordenação estável',
      art: 'balanca',
      goal: 'Entender estabilidade e o limite das ordenações por comparação.',
      explain:
        '**Estável** significa que elementos com **chaves iguais** mantêm a **ordem relativa original**.\n\nOrdenar licitações **por valor** com um algoritmo estável **preserva a ordem por data** entre as de mesmo valor.\n\n- Estáveis: **bolha**, **inserção**, **merge**.\n- Não estáveis (versões usuais): **seleção**, **quick**, **heap**.\n\nOrdenações por **comparação** não podem ser melhores que **O(n log n)** no pior caso.',
      check: {
        kind: 'sort',
        id: 'es-c',
        prompt: 'Estável ou não estável (versão usual)?',
        categories: ['Estável', 'Não estável'],
        items: [
          { text: 'Merge sort', cat: 0, why: 'Mantém a ordem dos iguais.' },
          { text: 'Quick sort', cat: 1, why: 'Pode trocar iguais de lugar.' },
          { text: 'Inserção', cat: 0, why: 'Mantém a ordem dos iguais.' },
          { text: 'Heap sort', cat: 1, why: 'Pode trocar iguais de lugar.' },
        ],
      },
      recovery: {
        explain: 'Imagine a **fila do protocolo** já em ordem de chegada. Você reordena por **assunto**. Se for estável, dentro de cada assunto quem chegou antes **continua antes**. Se não for, a ordem de chegada pode se embaralhar entre os de mesmo assunto.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Qual o melhor pior caso possível para ordenação por comparação?',
          options: [
            { text: 'O(n log n)', why: 'Isso.' },
            { text: 'O(n)', why: 'Por comparação, não dá para garantir isso no pior caso.' },
            { text: 'O(1)', why: 'Ordenar exige olhar os elementos.' },
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
      lines: ['Busca binária exige vetor ordenado', 'Merge sort precisa de memória extra O(n)', 'Quick sort é O(n log n) em todos os casos'],
      bug: 2,
      why: 'O caso médio é O(n log n), mas o pior é O(n²).',
      fixed: 'Quick sort: O(n log n) médio, O(n²) no pior caso',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual o pior caso de cada algoritmo?',
      categories: ['O(n log n)', 'O(n²)'],
      items: [
        { text: 'Merge sort', cat: 0, why: 'Garantido.' },
        { text: 'Bolha', cat: 1, why: 'Quadrático.' },
        { text: 'Heap sort', cat: 0, why: 'Garantido.' },
        { text: 'Quick sort', cat: 1, why: 'Pivô ruim.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: uma lista de 30 processos já quase toda em ordem precisa ser ordenada. Qual algoritmo simples é eficiente aqui?',
      options: [
        { text: 'Inserção', why: 'Isso: bom para vetores pequenos ou quase ordenados.' },
        { text: 'Seleção', why: 'A seleção faz sempre O(n²) comparações, mesmo quase ordenado.' },
        { text: 'Quick sort com o primeiro como pivô', why: 'Com dados quase ordenados, esse pivô tende ao pior caso.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.006' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.007' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.dev.03.008' },
  ],
  summary: [
    'Busca linear: O(n), qualquer coleção. Binária: O(log n), exige ordem; 1 milhão em cerca de 20 comparações.',
    'Bolha (vizinhos, O(n²)); inserção (cartas na mão, boa para quase ordenado); seleção (menor do resto, O(n) trocas).',
    'Merge: O(n log n) sempre, estável, memória O(n). Quick: pivô, O(n log n) médio e O(n²) pior. Heap sort: O(n log n), O(1) extra.',
    'Estável: iguais mantêm a ordem original (bolha, inserção, merge).',
    'Ordenação por comparação não passa de O(n log n) no pior caso.',
  ],
};
