O edital lista, entre as formas de compreender a lógica das situações, o **raciocínio verbal**, o **raciocínio matemático**, o **raciocínio sequencial**, a **formação de conceitos** e a **discriminação de elementos**. Na prova, isso vira sequências de números, letras ou figuras para completar, analogias, identificação do elemento que não pertence ao grupo e pequenos problemas de contagem. O segredo é ter um repertório de padrões e testá-los em ordem.

### De Euclides aos coelhos de Fibonacci

- **Cerca de 300 a.C.: Euclides.** Os *Elementos* já tratam de números em proporção contínua, o que hoje chamamos de progressão geométrica.
- **1202: Fibonacci.** No *Liber Abaci*, que ajudou a espalhar pela Europa os algarismos indo-arábicos, Leonardo de Pisa propôs o problema dos coelhos: 1, 1, 2, 3, 5, 8..., cada termo a soma dos dois anteriores.
- **1834: Dirichlet.** Peter Dirichlet usou o princípio das gavetas (ou da casa dos pombos): com mais objetos do que gavetas, alguma gaveta recebe dois ou mais.

### Roteiro para sequências numéricas

1. **Diferenças** entre termos consecutivos. Se forem constantes, é progressão aritmética (PA).
2. **Quocientes**. Se forem constantes, é progressão geométrica (PG).
3. **Diferenças das diferenças** (segunda ordem). Se forem constantes, o padrão é quadrático.
4. **Operações alternadas** ou compostas, como "× 2 + 1".
5. **Sequências intercaladas**: termos de posição ímpar seguem uma regra, os de posição par seguem outra.
6. **Relação com a posição**: n², n³, n² + 1, números primos.
7. **Soma dos anteriores** (tipo Fibonacci: cada termo é a soma dos dois anteriores).

| Sequência | Padrão | Próximo termo |
|---|---|---|
| 5, 9, 13, 17, ... | PA de razão 4 | 21 |
| 3, 6, 12, 24, ... | PG de razão 2 | 48 |
| 3, 7, 15, 31, 63, ... | × 2 + 1 | 127 |
| 2, 5, 10, 17, 26, ... | n² + 1 (diferenças 3, 5, 7, 9) | 37 |
| 1, 10, 3, 20, 5, 30, ... | intercalada: ímpares 1, 3, 5; pares 10, 20, 30 | 7 |
| 1, 1, 2, 3, 5, 8, ... | soma dos dois anteriores | 13 |

**Exemplo resolvido 1.** Complete: 2, 5, 10, 17, 26, __. Diferenças: 3, 5, 7, 9; a próxima é 11, e 26 + 11 = **37**. Conferência pela posição: o 6º termo é 6² + 1 = 37.

### Sequências de letras

Converta letras em posições do alfabeto. A banca informa qual alfabeto considerar; com as **26 letras** (incluindo K, W e Y):

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |

| N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 |

**Exemplo resolvido 2.** A, C, F, J, O, __. Posições 1, 3, 6, 10, 15: saltos +2, +3, +4, +5. O próximo salto é +6, posição 21, letra **U**.

Se a questão usar o alfabeto sem K, W e Y (23 letras), as posições depois do J mudam. Leia o enunciado antes de contar.

### Padrões cíclicos e o resto da divisão

Quando um padrão se repete com período k, o termo de posição n é o mesmo da posição dada pelo **resto de n ÷ k** (resto 0 corresponde ao último elemento do ciclo).

**Exemplo resolvido 3.** A palavra TCEGO é escrita repetidamente: TCEGOTCEGOTCEGO... Qual é a 2.026ª letra? O ciclo tem 5 letras; 2.026 = 5 × 405 + 1, resto 1. A letra é a primeira do ciclo: **T**.

Em rodízios de plantão a lógica é a mesma. Com 6 servidores em ordem fixa, começando pelo primeiro no dia 1, o dia 100 corresponde à posição (100 − 1) ÷ 6 = 16, resto 3, ou seja, a 4ª pessoa da lista (o resto 0 corresponde à 1ª, porque o deslocamento começa do dia 1).

Sequências de **figuras** seguem as mesmas ideias: observe rotação (de 45° ou 90° a cada passo), acréscimo de traços, alternância de preenchimento ou um ciclo de posições.

### Raciocínio verbal: analogias e relações entre palavras

Analogia é uma relação que se repete: "Auditor está para auditoria assim como juiz está para julgamento" (agente e atividade). Tipos frequentes:

- parte e todo (página : livro);
- agente e instrumento (escrivão : pena);
- causa e efeito (atraso : multa);
- gênero e espécie (documento : ofício).

Identifique a relação do primeiro par **antes** de olhar as alternativas.

### Formação de conceitos e discriminação de elementos

**Formação de conceitos**: descobrir a propriedade comum a um grupo. **Discriminação de elementos**: encontrar o elemento que não tem essa propriedade.

Exemplo: no grupo 121, 169, 225, 324, 361, todos são quadrados perfeitos (11², 13², 15², 18², 19²), mas apenas 324 é quadrado de número **par**. O conceito do grupo é "quadrado de número ímpar" e o intruso é **324**.

Teste mais de uma propriedade: às vezes todos são pares, mas um não é múltiplo de 4; todos são primos, exceto um que é ímpar composto (como 9 ou 21).

### Raciocínio matemático: contagens rápidas

**Algarismos para numerar páginas.** Para numerar de 1 a 120: páginas 1 a 9 usam 9 algarismos; 10 a 99 são 90 páginas com 2 algarismos, 180; 100 a 120 são 21 páginas com 3 algarismos, 63. Total: 9 + 180 + 63 = **252 algarismos**.

**Princípio da casa dos pombos (pior caso).** Uma gaveta tem 5 pastas azuis, 7 verdes e 4 vermelhas. Retirando no escuro, quantas é preciso pegar para **garantir** duas da mesma cor? No pior caso, sai uma de cada cor (3); a próxima repete uma cor: **4**. Para garantir **três verdes**, o pior caso retira antes todas as outras: 5 + 4 + 3 = **12**.

### Pegadinhas

- "Em uma sequência intercalada, cada termo depende apenas do termo imediatamente anterior." Falso. Depende do termo duas posições antes.
- "No alfabeto de 26 letras, a letra T ocupa a 20ª posição." Verdadeiro.
- "Para garantir duas pastas da mesma cor entre três cores, basta retirar três pastas." Falso. No pior caso as três são de cores diferentes; são necessárias quatro.
- "Num ciclo de 7 elementos, o 50º termo coincide com o 1º." Verdadeiro. 50 = 7 × 7 + 1, resto 1.
- "Se as diferenças entre termos consecutivos crescem de 2 em 2, a sequência é uma PA." Falso. Na PA as diferenças são constantes; aqui as diferenças formam uma PA, e a sequência é de segunda ordem.
