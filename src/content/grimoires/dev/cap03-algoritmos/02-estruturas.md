Uma **estrutura de dados** é uma forma de organizar dados na memória para que certas operações sejam eficientes. A escolha certa depende da operação mais frequente: acessar por posição, inserir no meio, buscar por chave, sempre pegar o mais urgente.

### Como as estruturas de dados surgiram

- **1736: o primeiro grafo.** **Leonhard Euler** resolveu o problema das **sete pontes de Königsberg**, provando que não havia como atravessar todas uma única vez. Foi o início da teoria dos grafos.
- **1945 e 1946: ordenar e buscar.** **John von Neumann** descreveu o **merge sort** em 1945. Em 1946, **John Mauchly**, um dos criadores do ENIAC, citou a **busca binária** numa série de palestras.
- **1953: o hash.** **Hans Peter Luhn**, da IBM, descreveu a ideia de espalhar as chaves em "baldes" por uma função: a origem da **tabela hash**.
- **Anos 1950: a pilha.** Os alemães **Friedrich Bauer** e **Klaus Samelson** descreveram o princípio da **pilha** para traduzir fórmulas em programas.
- **1959 a 1962: quick sort e árvore AVL.** **Tony Hoare** criou o **quick sort** em 1959 (publicado em 1961), e **Adelson-Velsky e Landis** publicaram em 1962 a **árvore AVL**, a primeira árvore de busca que se rebalanceia sozinha.

### Estruturas lineares

| Estrutura | Ideia | Acesso por posição | Busca | Inserção/remoção |
|---|---|---|---|---|
| **Vetor** (*array*) | Posições contíguas na memória | O(1) | O(n); O(log n) se ordenado | O(n) no meio (desloca elementos); O(1) amortizado no fim em vetores dinâmicos |
| **Lista ligada** | Nós com valor e ponteiro para o próximo | O(n) | O(n) | O(1) quando já se tem a referência do nó (ou no início) |
| **Pilha** (*stack*) | **LIFO**: último a entrar, primeiro a sair | só o topo | – | `push` e `pop` em O(1) |
| **Fila** (*queue*) | **FIFO**: primeiro a entrar, primeiro a sair | só a frente | – | `enqueue` no fim e `dequeue` no início em O(1) |

- A **lista duplamente ligada** tem ponteiros para o próximo e para o anterior, permitindo percorrer nos dois sentidos.
- A pilha aparece no botão "desfazer", na pilha de chamadas de funções e na verificação de parênteses balanceados.
- A fila aparece em filas de impressão, no processamento de requisições por ordem de chegada e na busca em largura em grafos.

### Árvores, heap e tabela hash

**Árvore binária de busca (ABB)**: cada nó tem até dois filhos; todos os valores da subárvore esquerda são **menores** que o nó e todos os da direita são **maiores**. Busca, inserção e remoção custam O(h), em que `h` é a altura. Se a árvore estiver equilibrada, h ≈ log n; se os valores forem inseridos já ordenados, ela degenera em uma "lista" e o pior caso vira **O(n)**. Árvores **balanceadas** (AVL, rubro-negra) fazem rotações para garantir O(log n). O percurso **em ordem** (esquerda, raiz, direita) de uma ABB visita os valores em ordem crescente.

| Percurso | Ordem de visita |
|---|---|
| Pré-ordem | raiz, esquerda, direita |
| Em ordem | esquerda, raiz, direita |
| Pós-ordem | esquerda, direita, raiz |

**Heap binário**: árvore binária completa, normalmente guardada em vetor, em que cada pai é maior (heap de máximo) ou menor (heap de mínimo) que seus filhos. Consultar o topo custa O(1); inserir e remover o topo custam O(log n). É a implementação usual de **fila de prioridade**, por exemplo para atender primeiro os processos com prazo mais próximo. Um heap não é uma ABB: irmãos não têm ordem entre si.

**Tabela hash** (*hash table*, dicionário, mapa): uma **função hash** transforma a chave em um índice do vetor interno. Inserção, busca e remoção custam **O(1) em média**. Duas chaves no mesmo índice geram **colisão**, tratada por **encadeamento** (lista em cada posição) ou **endereçamento aberto** (procura outra posição livre). Com muitas colisões o pior caso chega a O(n). Tabelas hash não mantêm os dados ordenados.

**Grafo**: conjunto de **vértices** ligados por **arestas**, que podem ser dirigidas ou não e ter peso. Modela redes de empresas, relações societárias entre fornecedores, rotas. Representações:

| Representação | Espaço | Bom para |
|---|---|---|
| Matriz de adjacência | O(V²) | grafos densos; saber em O(1) se existe a aresta (u, v) |
| Lista de adjacência | O(V + E) | grafos esparsos; percorrer vizinhos |

A **busca em largura** (BFS) usa uma **fila** e encontra o caminho com menos arestas em grafo não ponderado. A **busca em profundidade** (DFS) usa uma **pilha** (ou recursão). Em uma auditoria, uma BFS a partir de uma empresa contratada revela as empresas ligadas a ela por sócios em comum a uma, duas ou três "distâncias".

### Busca linear e busca binária

A **busca linear** percorre os elementos um a um: O(n), funciona em qualquer coleção. A **busca binária** exige vetor **ordenado** com acesso por índice e, a cada passo, descarta metade: O(log n). Em 1 milhão de registros, são no máximo cerca de 20 comparações.

```java
int buscaBinaria(int[] v, int alvo) {
    int ini = 0, fim = v.length - 1;
    while (ini <= fim) {
        int meio = ini + (fim - ini) / 2;   // evita estouro de int
        if (v[meio] == alvo) return meio;
        if (v[meio] < alvo) ini = meio + 1;
        else fim = meio - 1;
    }
    return -1;   // não encontrado
}
```

### Ordenação

| Algoritmo | Melhor | Médio | Pior | Memória extra | Estável? |
|---|---|---|---|---|---|
| Bolha (*bubble*) | O(n)* | O(n²) | O(n²) | O(1) | Sim |
| Inserção (*insertion*) | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Seleção (*selection*) | O(n²) | O(n²) | O(n²) | O(1) | Não (versão usual) |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick sort | O(n log n) | O(n log n) | **O(n²)** | O(log n) de pilha | Não |
| Heap sort | O(n log n) | O(n log n) | O(n log n) | O(1) | Não |

\* Com a versão que para quando uma passada não faz nenhuma troca.

- **Bolha**: compara vizinhos e troca se estiverem fora de ordem; a cada passada o maior "sobe" para o fim.
- **Inserção**: insere cada elemento na posição certa da parte já ordenada, como quem organiza cartas na mão. É eficiente para vetores pequenos ou quase ordenados.
- **Seleção**: procura o menor da parte restante e o coloca na posição seguinte. Faz sempre O(n²) comparações, mas apenas O(n) trocas.
- **Merge sort**: divide ao meio, ordena cada metade recursivamente e **intercala** (*merge*). Estratégia de **divisão e conquista**, desempenho garantido, porém precisa de memória auxiliar.
- **Quick sort**: escolhe um **pivô**, particiona em menores e maiores e ordena cada parte. Muito rápido na prática; o pior caso O(n²) ocorre quando o pivô divide mal, como ao escolher sempre o primeiro elemento de um vetor já ordenado.

**Estável** significa que elementos com chaves iguais mantêm a ordem relativa original. Ordenar licitações por valor com um algoritmo estável preserva a ordem por data entre as de mesmo valor. Ordenações baseadas em comparação não podem ser melhores que O(n log n) no pior caso.

### Pegadinhas

1. "A busca binária pode ser aplicada a qualquer vetor, ordenado ou não." Falso. Ela exige dados ordenados.
2. "Pilha segue a política FIFO." Falso. Pilha é LIFO; fila é FIFO.
3. "O quick sort tem complexidade O(n log n) em todos os casos." Falso. O caso médio é O(n log n), mas o pior é O(n²).
4. "O merge sort é estável e tem O(n log n) no pior caso." Verdadeiro. O custo é a memória auxiliar O(n).
5. "Uma árvore binária de busca sempre garante busca em O(log n)." Falso. Sem balanceamento, ela pode degenerar e chegar a O(n).
