O edital cita **múltiplos e divisores de números naturais** e problemas. Na prática da FCC isso significa: critérios de divisibilidade, decomposição em fatores primos, **MMC** (eventos que se repetem e voltam a coincidir) e **MDC** (dividir coisas diferentes em grupos iguais, do maior tamanho possível).

### Conceitos básicos

- **Múltiplo**: 36 é múltiplo de 9 porque 36 = 9 × 4. Todo número tem infinitos múltiplos, e o zero é múltiplo de todos.
- **Divisor**: 9 é divisor de 36 porque a divisão é exata (resto zero).
- **Número primo**: tem exatamente dois divisores naturais, 1 e ele mesmo (2, 3, 5, 7, 11, 13, ...). O 1 não é primo, e o 2 é o único primo par.
- **Decomposição em fatores primos**: todo natural maior que 1 se escreve de forma única como produto de primos. 360 = 2³ × 3² × 5.
- **Quantidade de divisores**: some 1 a cada expoente e multiplique. Para 360: (3 + 1)(2 + 1)(1 + 1) = 4 × 3 × 2 = **24 divisores**.

### Critérios de divisibilidade

| Divisível por | Critério | Exemplo |
|---|---|---|
| 2 | Termina em algarismo par | 7.452 |
| 3 | Soma dos algarismos divisível por 3 | 7.452: 7 + 4 + 5 + 2 = 18 |
| 4 | Os dois últimos algarismos formam número divisível por 4 | 7.452: 52 = 4 × 13 |
| 5 | Termina em 0 ou 5 | 3.555 |
| 6 | Divisível por 2 e por 3 | 7.452 |
| 8 | Os três últimos algarismos formam número divisível por 8 | 5.136: 136 = 8 × 17 |
| 9 | Soma dos algarismos divisível por 9 | 7.452: soma 18 |
| 10 | Termina em 0 | 3.150 |
| 11 | Diferença entre a soma dos algarismos de ordem ímpar e a dos de ordem par é múltiplo de 11 (inclusive 0) | 2.574: (4 + 5) − (7 + 2) = 0 |

Para divisores compostos, combine critérios de fatores **primos entre si**: divisível por 36 é ser divisível por 4 e por 9. O número 7.452 passa nos dois, e de fato 7.452 = 36 × 207.

**Exemplo resolvido 1.** Um código de processo tem a forma 3A5B, em que A e B são algarismos, e deve ser divisível por 2, por 5 e por 9. Ser divisível por 2 e por 5 exige terminar em 0, logo B = 0. A soma 3 + A + 5 + 0 = 8 + A deve ser múltiplo de 9, o que só ocorre com A = 1 (soma 9). O código é **3.150**. Conferência: 3.150 ÷ 9 = 350 e 3.150 ÷ 10 = 315.

### MMC e MDC pela decomposição

Decomponha os números em primos.

- **MDC**: produto dos fatores **comuns**, cada um com o **menor** expoente.
- **MMC**: produto de **todos** os fatores, cada um com o **maior** expoente.

Para 60 = 2² × 3 × 5 e 84 = 2² × 3 × 7: MDC = 2² × 3 = **12**; MMC = 2² × 3 × 5 × 7 = **420**.

Conferência útil para dois números: MDC × MMC = produto dos números. 12 × 420 = 5.040 e 60 × 84 = 5.040.

### Como reconhecer qual usar

| Pista no enunciado | Use | Por quê |
|---|---|---|
| "voltarão a coincidir", "próxima vez juntos", "a cada x dias" | MMC | Procura-se o menor tempo que é múltiplo de todos os períodos |
| "maior tamanho possível", "mesma quantidade em cada grupo", "sem sobras e sem misturar" | MDC | Procura-se o maior número que divide todas as quantidades |

**Exemplo resolvido 2 (MMC).** Três sistemas do Tribunal fazem cópia de segurança completa a cada 6, 8 e 10 dias e coincidiram hoje. Decompondo: 6 = 2 × 3, 8 = 2³, 10 = 2 × 5. MMC = 2³ × 3 × 5 = **120 dias**. Note que o produto 6 × 8 × 10 = 480 também é múltiplo comum, mas não é o menor, e a banca costuma colocá-lo como alternativa.

**Exemplo resolvido 3 (MDC).** Uma unidade técnica precisa separar 48 processos de licitação, 72 de convênios e 120 de pessoal em lotes com a mesma quantidade de processos, sem misturar tipos, com o maior tamanho possível. Decompondo: 48 = 2⁴ × 3, 72 = 2³ × 3², 120 = 2³ × 3 × 5. MDC = 2³ × 3 = **24 processos por lote**. Quantidade de lotes: 48 ÷ 24 + 72 ÷ 24 + 120 ÷ 24 = 2 + 3 + 5 = **10 lotes**.

Leia com atenção o que se pede: o **tamanho** do lote (24) ou o **número** de lotes (10). As duas respostas aparecem nas alternativas.

### Problemas com resto

"Qual o menor número maior que 2 que, dividido por 6, 8 ou 10, deixa sempre resto 2?" Ele é um múltiplo comum mais 2: MMC(6, 8, 10) + 2 = 120 + 2 = **122**. Conferência: 122 = 6 × 20 + 2 = 8 × 15 + 2 = 10 × 12 + 2.

Relação fundamental da divisão: **dividendo = divisor × quociente + resto**, com 0 ≤ resto < divisor. Ela é a base da aritmética de calendário do capítulo 2.

### Pegadinhas

- "O número 1 é primo." Falso. Tem apenas um divisor natural.
- "Se um número é divisível por 4 e por 6, é divisível por 24." Falso. 4 e 6 não são primos entre si; 12 é divisível por 4 e por 6 e não por 24.
- "O MMC de dois números primos entre si é o produto deles." Verdadeiro. Como o MDC é 1, MMC = produto.
- "Em problema de lotes iguais com o maior tamanho possível, usa-se o MMC." Falso. Usa-se o MDC.
- "360 tem 24 divisores naturais." Verdadeiro. 360 = 2³ × 3² × 5, e (3 + 1)(2 + 1)(1 + 1) = 24.
