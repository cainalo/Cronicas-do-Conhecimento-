O edital menciona bancos vetoriais duas vezes: em "RAG e bancos vetoriais" (bloco de IA) e em "noções de bancos de dados vetoriais aplicados à IA (embeddings)" (Banco de Dados).

### Embeddings

Um **embedding** é um vetor de números (centenas ou milhares de dimensões) gerado por um modelo, de forma que conteúdos com significado parecido fiquem próximos no espaço vetorial. "Tribunal de Contas" e "órgão de controle externo" terão vetores mais próximos entre si do que de "receita de bolo".

É isso que permite a **busca semântica**: encontrar trechos pelo sentido, mesmo que usem palavras diferentes das da pergunta.

### Medidas de proximidade

| Medida | Ideia | Interpretação |
|---|---|---|
| **Similaridade de cosseno** | Cosseno do ângulo entre os vetores. | Varia de −1 a 1; quanto mais perto de 1, mais parecidos. Ignora o tamanho dos vetores. |
| **Produto escalar** | Soma dos produtos das coordenadas. | Maior valor indica mais semelhança. Para vetores normalizados, equivale ao cosseno. |
| **Distância euclidiana** | Distância "em linha reta". | Quanto menor, mais parecidos. |

### Banco vetorial

Um **banco de dados vetorial** armazena embeddings e responde consultas do tipo "quais são os *k* vetores mais próximos deste?". Comparar a pergunta com todos os vetores (busca exata) fica lento com milhões de itens. Por isso se usam índices de **vizinho mais próximo aproximado** (ANN, *Approximate Nearest Neighbor*), que trocam um pouco de precisão por muita velocidade. Um dos índices mais usados é o **HNSW** (*Hierarchical Navigable Small World*), baseado em grafos.

Exemplos de tecnologias:

- **pgvector**: extensão do **PostgreSQL** que adiciona um tipo `vector` e índices para busca vetorial. Permite manter vetores e dados relacionais no mesmo banco.
- Bancos dedicados, como Milvus, Qdrant, Weaviate, Pinecone e Chroma.
- Bibliotecas de busca, como a FAISS.

### Exemplo com pgvector

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE trechos (
  id bigserial PRIMARY KEY,
  documento text,
  conteudo text,
  embedding vector(1536)
);

-- Os 5 trechos mais próximos de um vetor de consulta.
-- O operador <=> calcula a distância de cosseno.
SELECT documento, conteudo
FROM trechos
ORDER BY embedding <=> $1
LIMIT 5;
```

O tamanho `1536` é apenas um exemplo: ele deve ser igual à dimensão do modelo de embedding usado. No pgvector, `<->` é a distância euclidiana, `<=>` a distância de cosseno e `<#>` o produto interno negativo.

### Cuidados

- Use o **mesmo modelo de embedding** para indexar e consultar; vetores de modelos diferentes não são comparáveis.
- Trocar de modelo exige recalcular os vetores.
- Embeddings de dados pessoais também são dados pessoais para fins de LGPD; o controle de acesso precisa acompanhar o documento de origem.
