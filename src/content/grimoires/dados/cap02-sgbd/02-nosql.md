### Por que NoSQL

Bancos **NoSQL** ("não apenas SQL") abrem mão de parte das garantias e da estrutura rígida do modelo relacional para ganhar **flexibilidade de esquema** e **escala horizontal** com facilidade. Não substituem os relacionais: cada um serve melhor a certos problemas.

| Modelo | Como guarda | Exemplos | Bom para |
|---|---|---|---|
| **Documento** | Documentos semiestruturados (JSON/BSON) agrupados em coleções | **MongoDB** | Cadastros com estrutura variável, catálogos, conteúdo |
| **Chave-valor** | Pares chave → valor, consultados pela chave | **Redis** | Cache, sessões, filas, contadores |
| **Famílias de colunas** (*wide-column*) | Linhas com conjuntos flexíveis de colunas agrupadas em famílias | Cassandra, HBase | Grandes volumes de escrita, séries temporais |
| **Grafos** | Nós e arestas com propriedades | Neo4j | Relações complexas: redes de vínculos societários, fraudes |

Detalhes que caem em prova:

- O **MongoDB** armazena documentos em **BSON** (JSON binário), sem esquema obrigatório, com consultas por campos, índices secundários, replicação por *replica sets* e distribuição por *sharding*.
- O **Redis** guarda os dados **em memória** (com persistência opcional em disco), oferece estruturas como listas, conjuntos e *hashes*, e permite expirar chaves automaticamente (**TTL**), o que o torna ideal para **cache**.
- Bancos de **grafos** respondem bem a perguntas como "quais empresas estão ligadas a este sócio em até três níveis?", que exigiriam muitas junções no modelo relacional.

### ACID, BASE e o teorema CAP

Muitos sistemas NoSQL distribuídos seguem o modelo **BASE**: *Basically Available, Soft state, Eventually consistent* (basicamente disponível, estado flexível, **consistência eventual**). Uma escrita pode levar algum tempo para aparecer em todas as réplicas.

O **teorema CAP** diz que um sistema distribuído, diante de uma **partição de rede** (P), precisa escolher entre **consistência** (C: todos leem o dado mais recente) e **disponibilidade** (A: toda requisição recebe resposta). Não é possível garantir as três propriedades ao mesmo tempo durante a partição.

### Bancos vetoriais

Armazenam **embeddings** e buscam por similaridade (capítulo de RAG do Livro dos Autômatos). No PostgreSQL, a extensão **pgvector** cumpre esse papel.

### Replicação, alta disponibilidade e backup

| Conceito | Significado |
|---|---|
| Replicação **síncrona** | O commit só é confirmado depois que a réplica grava: sem perda de dados, mais latência. |
| Replicação **assíncrona** | O primário confirma e a réplica recebe depois: mais rápido, pode perder as últimas transações numa falha. |
| **Failover** | Promoção automática ou manual de uma réplica quando o primário cai. |
| **Sharding** | Dividir os dados entre servidores por uma chave (particionamento horizontal) para escalar. |
| Réplicas de leitura | Distribuem consultas e aliviam o primário. |

Replicação **não substitui backup**: um `DELETE` errado é replicado fielmente para todas as cópias.

### Segurança e governança de dados

- **Acesso**: contas nominais, menor privilégio por papéis, nada de aplicações usando o superusuário.
- **Criptografia** em trânsito (TLS) e em repouso (por exemplo, TDE no Oracle).
- **Mascaramento e anonimização** de dados pessoais em ambientes de teste.
- **Auditoria** de acessos e alterações sensíveis.
- **Governança**: dono de cada conjunto de dados, catálogo e dicionário de dados, qualidade, ciclo de vida e conformidade com a LGPD.

### Pegadinhas

1. "Redis é um banco orientado a documentos." Falso. É chave-valor, em memória.
2. "MongoDB exige esquema fixo definido antes da inserção." Falso. O esquema é flexível.
3. "Pelo teorema CAP, é possível ter consistência, disponibilidade e tolerância a partição ao mesmo tempo durante uma partição." Falso.
4. "Replicação dispensa backup." Falso. Erros lógicos são replicados.
5. "VACUUM, no PostgreSQL, apaga dados válidos antigos." Falso. Recupera o espaço de versões que já não são visíveis para nenhuma transação.
