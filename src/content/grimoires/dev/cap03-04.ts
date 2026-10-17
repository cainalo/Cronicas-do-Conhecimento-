import type { Chapter, Lesson } from '@/content/types';
import c3s1 from './cap03-algoritmos/01-logica.md?raw';
import c3s2 from './cap03-algoritmos/02-estruturas.md?raw';
import c3s3 from './cap03-algoritmos/03-paradigmas.md?raw';
import c4s1 from './cap04-linguagens/01-java-python.md?raw';
import c4s2 from './cap04-linguagens/02-javascript-ts.md?raw';
import c4s3 from './cap04-linguagens/03-web-react.md?raw';
import c4s4 from './cap04-linguagens/04-pacotes.md?raw';

export const capDevAlgoritmos: Chapter = {
  id: 'cap.dev.03',
  grimoireId: 'grim.dev',
  number: 3,
  title: 'Algoritmos, Estruturas e Paradigmas',
  subtitle: 'Lógica, complexidade, estruturas de dados, orientação a objetos e programação funcional',
  topicIds: ['ti.dev.algoritmos'],
  review: 'nao-revisado',
  estimatedMinutes: 50,
  sections: [
    { id: 'logica', title: '1. Lógica, recursão e complexidade', body: c3s1 },
    { id: 'estruturas', title: '2. Estruturas de dados, buscas e ordenação', body: c3s2 },
    { id: 'paradigmas', title: '3. Orientação a objetos e programação funcional', body: c3s3 },
  ],
  glossary: [
    { term: 'Big-O', definition: 'Notação de limite superior assintótico do crescimento do custo de um algoritmo em função do tamanho da entrada.' },
    { term: 'Caso base', definition: 'Situação resolvida diretamente em uma recursão, sem nova chamada; sem ele ocorre estouro de pilha.' },
    { term: 'Pilha e fila', definition: 'Pilha é LIFO (último a entrar, primeiro a sair); fila é FIFO (primeiro a entrar, primeiro a sair).' },
    { term: 'Busca binária', definition: 'Busca em vetor ordenado que descarta metade a cada passo: O(log n).' },
    { term: 'Tabela hash', definition: 'Estrutura chave-valor com função hash; busca O(1) em média e O(n) no pior caso por colisões.' },
    { term: 'Ordenação estável', definition: 'Mantém a ordem relativa de elementos com chaves iguais (inserção, bolha, merge sort).' },
    { term: 'Quick sort', definition: 'Ordenação por particionamento em torno de um pivô; O(n log n) no caso médio e O(n²) no pior.' },
    { term: 'Sobrecarga e sobrescrita', definition: 'Sobrecarga: mesmo nome, parâmetros diferentes, resolvida na compilação. Sobrescrita: subclasse redefine o método, resolvida em execução.' },
    { term: 'Função pura', definition: 'Mesma entrada gera sempre a mesma saída, sem efeitos colaterais.' },
    { term: 'Closure', definition: 'Função que mantém acesso às variáveis do escopo em que foi criada.' },
  ],
  references: [
    { title: 'CORMEN, T. H. et al.', detail: 'Introduction to Algorithms (Algoritmos: teoria e prática). MIT Press.' },
    { title: 'KNUTH, D. E.', detail: 'The Art of Computer Programming, v. 1 e 3. Addison-Wesley.' },
    { title: 'SZWARCFITER, J. L.; MARKENZON, L.', detail: 'Estruturas de Dados e Seus Algoritmos. LTC.' },
    { title: 'GAMMA, E. et al.', detail: 'Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.' },
    { title: 'MDN Web Docs', detail: 'Array.prototype.map, filter, reduce e Closures (developer.mozilla.org).' },
  ],
  lessonIds: ['lic.dev.03'],
};

export const capDevLinguagens: Chapter = {
  id: 'cap.dev.04',
  grimoireId: 'grim.dev',
  number: 4,
  title: 'Linguagens, Web e Pacotes',
  subtitle: 'Java, Python, JavaScript, Node.js, TypeScript, HTML5, CSS3, React e a publicação de aplicações',
  topicIds: ['ti.dev.linguagens', 'ti.dev.git-pacotes'],
  review: 'nao-revisado',
  estimatedMinutes: 60,
  sections: [
    { id: 'java-python', title: '1. Java e Python', body: c4s1 },
    { id: 'javascript-ts', title: '2. JavaScript, Node.js e TypeScript', body: c4s2 },
    { id: 'web-react', title: '3. HTML5, CSS3 e React', body: c4s3 },
    { id: 'pacotes', title: '4. Dependências, empacotamento e publicação', body: c4s4 },
  ],
  glossary: [
    { term: 'Bytecode', definition: 'Código intermediário gerado pelo javac (.class) e executado pela JVM.' },
    { term: 'Checked exception', definition: 'Exceção Java que o compilador obriga a tratar ou declarar (ex.: IOException); RuntimeException e subclasses são unchecked.' },
    { term: 'venv', definition: 'Ambiente virtual Python que isola as dependências de cada projeto.' },
    { term: '=== em JavaScript', definition: 'Igualdade estrita: compara valor e tipo, sem coerção.' },
    { term: 'Event loop', definition: 'Mecanismo que executa callbacks das filas quando a pilha está vazia; microtarefas antes de macrotarefas.' },
    { term: 'async/await', definition: 'Sintaxe sobre Promises; função async retorna Promise e await suspende só a função.' },
    { term: 'Especificidade CSS', definition: 'Peso do seletor: inline, depois IDs, depois classes/atributos/pseudo-classes, depois elementos.' },
    { term: 'useEffect', definition: 'Hook React para efeitos após a renderização; o vetor de dependências controla quando reexecuta.' },
    { term: 'key em listas', definition: 'Identificador estável e único entre irmãos que o React usa na reconciliação.' },
    { term: 'SemVer', definition: 'MAJOR.MINOR.PATCH; ^ aceita minor e patch, ~ aceita só patch.' },
    { term: 'Lockfile', definition: 'Arquivo com versões exatas de toda a árvore de dependências; deve ser versionado.' },
  ],
  references: [
    { title: 'Oracle', detail: 'The Java Language Specification e The Java Tutorials (docs.oracle.com).' },
    { title: 'Python Software Foundation', detail: 'Documentação oficial do Python 3, tutorial, módulo venv e PEP 8 (docs.python.org).' },
    { title: 'Ecma International', detail: 'ECMA-262, ECMAScript Language Specification.' },
    { title: 'MDN Web Docs', detail: 'HTML, CSS, JavaScript, Promises e event loop (developer.mozilla.org).' },
    { title: 'Microsoft', detail: 'TypeScript Handbook (typescriptlang.org).' },
    { title: 'Meta / React', detail: 'Documentação oficial do React (react.dev).' },
    { title: 'W3C', detail: 'Web Content Accessibility Guidelines (WCAG) 2.2.' },
    { title: 'Semantic Versioning', detail: 'Semantic Versioning 2.0.0 (semver.org); documentação do npm (docs.npmjs.com).' },
    { title: 'Apache Maven', detail: 'Introduction to the Build Lifecycle (maven.apache.org).' },
  ],
  lessonIds: ['lic.dev.04'],
};

export const licoesDev34: Lesson[] = [
  {
    id: 'lic.dev.03',
    chapterId: 'cap.dev.03',
    title: 'As Engrenagens do Raciocínio',
    goal: 'Dominar complexidade, estruturas de dados, buscas, ordenações, POO e programação funcional.',
    cards: [
      {
        title: 'Complexidade',
        body: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).\n\nDescarte constantes, fique com o termo dominante. Laços aninhados **multiplicam**; em sequência **somam**. Busca binária: O(log n), exige vetor **ordenado**.',
      },
      {
        title: 'Estruturas e ordenações',
        body: 'Pilha **LIFO**, fila **FIFO**. Hash: O(1) médio. ABB sem balanceamento: pior O(n).\n\nBolha, inserção, seleção: O(n²). Merge: O(n log n) sempre, estável, memória O(n). Quick: médio O(n log n), **pior O(n²)**.',
      },
      {
        title: 'Paradigmas',
        body: '**Sobrecarga**: parâmetros diferentes, compilação. **Sobrescrita**: mesma assinatura na subclasse, execução.\n\nComposição = tem um; herança = é um. Função **pura**: sem efeitos colaterais. `map` mantém o tamanho, `filter` pode reduzir, `reduce` gera um valor.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.dev.03.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.dev.04',
    chapterId: 'cap.dev.04',
    title: 'Os Idiomas das Máquinas',
    goal: 'Revisar Java, Python, JavaScript, Node.js, TypeScript, HTML5, CSS3, React e gerenciamento de pacotes.',
    cards: [
      {
        title: 'Java e Python',
        body: 'javac gera **bytecode**, a **JVM** executa. 8 primitivos; objetos por referência (`==` compara referência, `equals` conteúdo). **Checked** (IOException) obriga tratar; **RuntimeException** é unchecked.\n\nPython: tipagem dinâmica e forte, blocos por indentação, tupla imutável, `venv` + `pip`.',
      },
      {
        title: 'JavaScript, TS e React',
        body: '`let`/`const` têm escopo de bloco; `===` sem coerção. Microtarefas (Promises) antes de `setTimeout`. `async` sempre retorna Promise.\n\nTypeScript: tipos apagados na compilação. React: props só leitura, `useEffect(fn, [])` só na montagem, `key` estável em listas.',
      },
      {
        title: 'Web e pacotes',
        body: 'Especificidade: inline > ID > classe > elemento. Flexbox 1D, grid 2D.\n\nSemVer: `^1.2.3` até < 2.0.0; `~1.2.3` até < 1.3.0. **Lockfile versionado**, `node_modules` não. Maven: `package` executa as fases anteriores.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.dev.04.${String(i + 1).padStart(3, '0')}`),
  },
];
