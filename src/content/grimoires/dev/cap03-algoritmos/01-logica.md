Um **algoritmo** é uma sequência finita de passos bem definidos que transforma uma entrada em uma saída. Donald Knuth, em *The Art of Computer Programming*, lista cinco propriedades: **finitude** (termina após um número finito de passos), **definição** (cada passo é preciso, sem ambiguidade), **entrada** (zero ou mais), **saída** (uma ou mais) e **efetividade** (cada passo pode ser executado de fato). Uma receita que diz "tempere a gosto" falha na definição; um laço que nunca termina falha na finitude.

### Estruturas de controle

Todo programa imperativo combina três formas de controle. O teorema de Böhm e Jacopini (1966) mostra que elas bastam para expressar qualquer algoritmo computável, o que fundamenta a **programação estruturada** (sem `goto`).

| Estrutura | Para que serve | Exemplos |
|---|---|---|
| Sequência | Executar instruções uma após a outra | atribuições, chamadas |
| Seleção (decisão) | Escolher um caminho conforme uma condição | `if`, `if/else`, `switch` |
| Repetição (iteração) | Repetir um bloco | `while`, `do...while`, `for` |

Diferenças que caem em prova:

- `while` testa a condição **antes** de cada volta: o corpo pode não executar nenhuma vez.
- `do...while` testa **depois**: o corpo executa **pelo menos uma vez**.
- `for` reúne inicialização, condição e incremento em uma linha; é usado quando o número de voltas é conhecido.
- Em `switch` de Java, C e JavaScript, esquecer o `break` faz a execução "cair" no caso seguinte (*fall-through*).

Os operadores lógicos **E** (`&&`) e **OU** (`||`) costumam ser avaliados em **curto-circuito**: em `a && b`, se `a` for falso, `b` nem é avaliado. Isso permite escrever `if (processo != null && processo.ativo())` sem risco de erro de referência nula.

### Recursão

Uma função é **recursiva** quando chama a si mesma. Toda recursão correta tem:

1. **Caso base**: a situação resolvida diretamente, sem nova chamada.
2. **Passo recursivo**: a chamada para um problema menor, que se aproxima do caso base.

```javascript
function fatorial(n) {
  if (n <= 1) return 1;          // caso base
  return n * fatorial(n - 1);    // passo recursivo
}
// fatorial(4) = 4 * 3 * 2 * 1 = 24
```

Cada chamada ocupa um quadro na **pilha de chamadas** (*call stack*). Sem caso base, ou com um passo que não reduz o problema, as chamadas se acumulam até estourar a pilha (*stack overflow*). Recursão costuma ser mais elegante, mas gasta memória proporcional à profundidade; a versão iterativa equivalente usa espaço constante.

O Fibonacci recursivo ingênuo, `fib(n) = fib(n-1) + fib(n-2)`, recalcula os mesmos valores muitas vezes e tem custo **exponencial**. Guardar resultados já calculados (**memoização**, base da programação dinâmica) reduz o custo para linear.

### Complexidade e notação Big-O

A análise de complexidade estima como o tempo (ou a memória) cresce em função do tamanho da entrada `n`. A notação **O (Big-O)** dá um **limite superior** assintótico: dizer que um algoritmo é O(n²) significa que, para `n` grande, seu custo não cresce mais rápido que uma constante vezes n². Há também **Ω (ômega)**, limite inferior, e **Θ (teta)**, limite justo (superior e inferior ao mesmo tempo).

| Ordem | Nome | Exemplo |
|---|---|---|
| O(1) | Constante | acessar `v[i]` em um vetor; consulta média em tabela hash |
| O(log n) | Logarítmica | busca binária em vetor ordenado |
| O(n) | Linear | percorrer uma lista para somar valores |
| O(n log n) | Linearítmica | merge sort; quick sort no caso médio |
| O(n²) | Quadrática | dois laços aninhados sobre os mesmos dados; bubble sort |
| O(2ⁿ) | Exponencial | Fibonacci recursivo ingênuo; testar todos os subconjuntos |
| O(n!) | Fatorial | testar todas as permutações (caixeiro-viajante por força bruta) |

Regras práticas:

- **Descarte constantes**: O(3n + 10) é O(n).
- **Fique com o termo dominante**: O(n² + n) é O(n²).
- **Laços em sequência somam**; **laços aninhados multiplicam**. Um laço de `n` dentro de outro de `n` dá O(n²).
- Um laço que **divide** o problema pela metade a cada volta é O(log n).

```python
def tem_duplicado(cpfs):          # O(n²): compara cada par
    for i in range(len(cpfs)):
        for j in range(i + 1, len(cpfs)):
            if cpfs[i] == cpfs[j]:
                return True
    return False

def tem_duplicado_rapido(cpfs):   # O(n) em média: usa conjunto (hash)
    return len(set(cpfs)) != len(cpfs)
```

No contexto de um Tribunal de Contas, cruzar a folha de pagamento de 200 mil servidores com uma base de óbitos por comparação par a par (O(n·m)) pode levar horas; carregar uma das bases em uma tabela hash e consultar a outra reduz o trabalho para O(n + m).

Complexidade de **pior caso**, **caso médio** e **melhor caso** são coisas distintas. A busca linear tem melhor caso O(1) (o item é o primeiro) e pior caso O(n). Quando a questão não especifica, a convenção é falar do pior caso.

### Pegadinhas

1. "O laço `do...while` pode não executar nenhuma vez." Falso. Ele testa a condição ao final, então o corpo executa pelo menos uma vez.
2. "Uma função recursiva sem caso base termina quando a memória acaba, o que é um comportamento correto." Falso. Ela causa estouro de pilha; todo algoritmo precisa de finitude.
3. "O(2n + 100) e O(n) representam a mesma classe de complexidade." Verdadeiro. Constantes multiplicativas e aditivas são descartadas.
4. "Dois laços aninhados, cada um de 1 a n, resultam em O(2n)." Falso. Laços aninhados multiplicam: O(n²).
5. "Big-O descreve um limite superior de crescimento." Verdadeiro. Θ é o limite justo e Ω, o inferior.
