O edital cita a "administração e otimização de PostgreSQL e Oracle Database". Para o nível técnico, o importante são os conceitos de cada um e as tarefas rotineiras.

### De onde vieram os dois

- **1970: o modelo relacional.** Edgar Codd, na IBM, propôs organizar os dados em relações (tabelas).
- **1977 a 1979: o Oracle.** Larry Ellison, Bob Miner e Ed Oates fundaram uma pequena empresa que, em 1979, lançou o Oracle, um dos primeiros bancos relacionais com SQL vendidos comercialmente. A empresa depois adotou o nome do produto.
- **Anos 1970 e 1986: Ingres e Postgres.** Na Universidade da Califórnia em Berkeley, Michael Stonebraker liderou o Ingres e, em 1986, começou o sucessor, o Postgres ("depois do Ingres").
- **1994 a 1996: PostgreSQL.** Com o SQL acrescentado, o sistema virou Postgres95 e, em 1996, ganhou o nome PostgreSQL, mantido por uma comunidade, com código aberto.

### PostgreSQL

| Conceito | O que é |
|---|---|
| **MVCC** | Controle de concorrência por múltiplas versões: leitores não bloqueiam escritores. Cada atualização cria uma nova versão da linha. |
| **VACUUM** | Recupera o espaço das versões antigas ("tuplas mortas") deixadas pelo MVCC. O *autovacuum* faz isso automaticamente. |
| **ANALYZE** | Atualiza as estatísticas usadas pelo otimizador para escolher planos de execução. |
| **WAL** (*Write-Ahead Log*) | Registro em que toda alteração é gravada antes de ir para os arquivos de dados; base da durabilidade, da replicação e da recuperação. |
| **Schemas** | Espaços de nomes dentro de um banco (por exemplo, `public`). |
| **Extensões** | Recursos adicionais instaláveis, como o **pgvector** (vetores) e o PostGIS (dados geográficos). |

Backup no PostgreSQL:

- **Lógico**: `pg_dump` (um banco) e `pg_dumpall` (todo o servidor) geram comandos SQL ou arquivo próprio, restaurados com `psql` ou `pg_restore`. Portável entre versões.
- **Físico**: `pg_basebackup` copia os arquivos do servidor; com o arquivamento contínuo do WAL, permite a **recuperação a um ponto no tempo** (PITR).

Replicação: **por streaming** (física, réplica idêntica, geralmente somente leitura) e **lógica** (replica tabelas escolhidas, por publicação e assinatura).

### Oracle Database

| Conceito | O que é |
|---|---|
| **Instância × banco** | A instância é o conjunto de processos e memória (SGA); o banco são os arquivos de dados. |
| **Tablespace** | Unidade lógica de armazenamento, formada por arquivos de dados. |
| **Redo log** | Registro das alterações, usado na recuperação (equivalente conceitual ao WAL). |
| **Undo** | Guarda os valores anteriores, permitindo rollback e leitura consistente. |
| **RMAN** | Ferramenta oficial de backup e recuperação. |
| **Data Guard** | Mantém bancos *standby* sincronizados para recuperação de desastres. |
| **RAC** (*Real Application Clusters*) | Várias instâncias em servidores diferentes acessando o mesmo banco, para disponibilidade e escala. |
| **Data Pump** | Exportação e importação lógica (`expdp`, `impdp`). |

### Rotinas de administração e otimização

- Monitorar consultas lentas e analisar planos de execução.
- Criar ou remover índices conforme o padrão de uso; manter estatísticas atualizadas.
- Controlar crescimento de armazenamento e de logs.
- Testar restaurações de backup periodicamente.
- Gerenciar usuários, papéis e permissões com menor privilégio (`GRANT` e `REVOKE`).
- Aplicar atualizações de versão e de segurança.
