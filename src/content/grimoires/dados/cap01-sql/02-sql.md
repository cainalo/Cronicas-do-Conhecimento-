### Categorias de comandos SQL

| Categoria | Comandos | Para quê |
|---|---|---|
| **DDL** (definição) | CREATE, ALTER, DROP, TRUNCATE | Estrutura: tabelas, índices, visões |
| **DML** (manipulação) | SELECT, INSERT, UPDATE, DELETE | Dados |
| **DCL** (controle) | GRANT, REVOKE | Permissões |
| **DTL / TCL** (transação) | COMMIT, ROLLBACK, SAVEPOINT | Confirmar ou desfazer |

Algumas classificações tratam o SELECT à parte, como **DQL** (consulta). Repare também na diferença entre `DELETE` sem `WHERE` (DML, remove linhas uma a uma, pode ser desfeito na transação e dispara gatilhos) e `TRUNCATE` (DDL, esvazia a tabela inteira de uma vez).

### Consultas

```sql
SELECT f.nome, COUNT(*) AS empenhos, SUM(e.valor) AS total
FROM empenho e
JOIN fornecedor f ON f.cnpj = e.cnpj_fornecedor
WHERE e.ano = 2026
GROUP BY f.nome
HAVING SUM(e.valor) > 100000
ORDER BY total DESC;
```

Ordem **lógica** de execução, que explica muitas pegadinhas:

1. `FROM` e `JOIN` · 2. `WHERE` · 3. `GROUP BY` · 4. `HAVING` · 5. `SELECT` · 6. `ORDER BY`

Por isso:

- `WHERE` filtra **linhas antes** do agrupamento e não aceita funções de agregação; `HAVING` filtra **grupos depois**.
- O apelido definido no `SELECT` (como `total`) pode ser usado no `ORDER BY`, mas não no `WHERE`.

### Junções

| Junção | Retorna |
|---|---|
| `INNER JOIN` | Só as linhas com correspondência nas duas tabelas |
| `LEFT JOIN` | Todas da esquerda; da direita, só as correspondentes (o resto vira NULL) |
| `RIGHT JOIN` | O inverso do LEFT |
| `FULL JOIN` | Todas as linhas das duas, casando quando possível |
| `CROSS JOIN` | Produto cartesiano: cada linha com cada linha |

Para listar fornecedores **sem** empenho: `LEFT JOIN` e `WHERE e.cnpj_fornecedor IS NULL`, ou `NOT EXISTS`.

### NULL e agregações

- `NULL` significa "desconhecido". Comparações com `= NULL` não são verdadeiras: usa-se **`IS NULL`** e **`IS NOT NULL`**.
- `COUNT(*)` conta linhas; `COUNT(coluna)` **ignora NULL**; `SUM`, `AVG`, `MIN` e `MAX` também ignoram NULL.

### Subconsultas

```sql
-- Empenhos acima da média do próprio ano (subconsulta correlacionada)
SELECT * FROM empenho e
WHERE e.valor > (SELECT AVG(valor) FROM empenho x WHERE x.ano = e.ano);
```

`IN` compara com uma lista; `EXISTS` testa se a subconsulta devolve alguma linha (e para na primeira).

### Álgebra relacional

A base teórica das consultas:

| Operação | Símbolo | Efeito | SQL aproximado |
|---|---|---|---|
| Seleção | σ | Filtra **linhas** | `WHERE` |
| Projeção | π | Escolhe **colunas** (sem duplicatas) | lista do `SELECT DISTINCT` |
| Produto cartesiano | × | Todas as combinações | `CROSS JOIN` |
| Junção | ⋈ | Combina linhas relacionadas | `JOIN` |
| União, interseção, diferença | ∪, ∩, − | Operações de conjunto (tabelas compatíveis) | `UNION`, `INTERSECT`, `EXCEPT` |
| Renomeação | ρ | Muda nomes | `AS` |

Pegadinha frequente: **seleção atua em linhas e projeção em colunas**.

### Visões, procedimentos e gatilhos

- **View** (visão): consulta salva com nome, usada como tabela virtual. Simplifica consultas e restringe o que cada usuário vê.
- **View materializada**: guarda o resultado fisicamente; é rápida de ler e precisa ser atualizada (`REFRESH`).
- **Procedure** (procedimento armazenado): rotina no banco, chamada explicitamente, que pode executar várias operações.
- **Função**: rotina que devolve um valor e pode ser usada dentro de consultas.
- **Trigger** (gatilho): rotina **disparada automaticamente** por um evento (INSERT, UPDATE, DELETE), antes (`BEFORE`) ou depois (`AFTER`), por linha ou por comando. Usos: auditoria, validação, manter campos calculados.
