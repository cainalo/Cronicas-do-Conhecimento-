### Transações e ACID

Uma **transação** é um conjunto de operações tratado como unidade: ou tudo acontece, ou nada acontece. As propriedades **ACID**:

| Propriedade | Garante que |
|---|---|
| **Atomicidade** | A transação é indivisível: em caso de falha, tudo é desfeito (*rollback*). |
| **Consistência** | O banco passa de um estado válido a outro, respeitando restrições e regras. |
| **Isolamento** | Transações simultâneas não interferem indevidamente umas nas outras. |
| **Durabilidade** | Depois do *commit*, os dados persistem mesmo após queda de energia (garantido pelo registro de log). |

```sql
BEGIN;
UPDATE conta SET saldo = saldo - 500 WHERE id = 1;
UPDATE conta SET saldo = saldo + 500 WHERE id = 2;
COMMIT;   -- ou ROLLBACK, se algo falhar
```

### Anomalias de concorrência e níveis de isolamento

| Anomalia | O que acontece |
|---|---|
| **Leitura suja** (*dirty read*) | Ler dado alterado por outra transação **ainda não confirmada**. |
| **Leitura não repetível** | Ler a mesma linha duas vezes e obter valores diferentes, porque outra transação a alterou e confirmou. |
| **Leitura fantasma** (*phantom*) | Repetir uma consulta e aparecerem (ou sumirem) **linhas**, porque outra transação inseriu ou excluiu. |

Níveis do padrão SQL, do mais fraco ao mais forte:

| Nível | Leitura suja | Não repetível | Fantasma |
|---|---|---|---|
| READ UNCOMMITTED | pode ocorrer | pode ocorrer | pode ocorrer |
| READ COMMITTED | evitada | pode ocorrer | pode ocorrer |
| REPEATABLE READ | evitada | evitada | pode ocorrer |
| SERIALIZABLE | evitada | evitada | evitada |

Quanto mais forte o isolamento, menos anomalias e menor a concorrência. O **READ COMMITTED** é o padrão do PostgreSQL e do Oracle. (Implementações reais podem ir além do mínimo exigido: o REPEATABLE READ do PostgreSQL, por exemplo, também impede fantasmas.)

### Índices e otimização

Um **índice** é uma estrutura auxiliar que acelera a localização de linhas, como o índice remissivo de um livro.

- O tipo padrão na maioria dos SGBDs é a **árvore B** (*B-tree*), boa para igualdade, intervalos e ordenação.
- Índices **aceleram leituras**, mas **custam espaço e tornam as escritas mais lentas**, porque precisam ser atualizados a cada INSERT, UPDATE e DELETE.
- São mais úteis em colunas **seletivas** (muitos valores distintos) usadas em filtros e junções.
- Em índice composto `(ano, orgao)`, a ordem importa: ele ajuda consultas por `ano` ou por `ano e orgao`, mas pouco por `orgao` sozinho.
- Funções sobre a coluna no filtro (`WHERE UPPER(nome) = ...`) podem impedir o uso do índice comum.

Para entender o que o banco fará, usa-se o **plano de execução**: `EXPLAIN` (e `EXPLAIN ANALYZE`, que executa e mede, no PostgreSQL). Sinais de alerta: varredura completa (*sequential scan*) em tabelas grandes com filtros seletivos, estimativas de linhas muito diferentes das reais.

### Pegadinhas

1. "HAVING filtra linhas antes do agrupamento." Falso. Quem faz isso é o WHERE.
2. "COUNT(coluna) conta também os valores nulos." Falso. Só COUNT(*) conta todas as linhas.
3. "Projeção filtra linhas." Falso. Projeção escolhe colunas; seleção filtra linhas.
4. "Índices sempre melhoram o desempenho." Falso. Pioram as escritas e ocupam espaço.
5. "No nível READ COMMITTED não há leitura não repetível." Falso. Ela pode ocorrer; o nível só evita a leitura suja.
6. "Uma tabela na 3FN pode ter dependência transitiva." Falso. A 3FN elimina exatamente isso.
