### Quadro-resumo

| Se a questão fala em... | Pense em... |
|---|---|
| Prever o próximo token, Transformer, atenção | Funcionamento do LLM |
| Limite de tokens que o modelo considera | Janela de contexto |
| Resposta convincente, porém falsa | Alucinação |
| Exemplos no próprio prompt, sem mudar pesos | *Few-shot* / aprendizado em contexto |
| Raciocínio passo a passo | Cadeia de pensamento |
| Texto externo que manipula o modelo | Injeção de prompt (indireta) |
| Escolher o que entra na janela, compactar, memória | Engenharia de contexto |
| Buscar trechos e inserir no prompt antes de gerar | RAG |
| Conhecimento atualizável e com fonte | RAG (não ajuste fino) |
| Vetor que representa o sentido de um texto | Embedding |
| *k* vizinhos mais próximos, HNSW, ANN | Banco vetorial |
| Extensão de busca vetorial do PostgreSQL | pgvector |

### Pegadinhas

1. "O LLM consulta a internet a cada resposta." Falso. Ele gera a partir do que aprendeu e do que está no contexto; busca só acontece se a aplicação oferecer uma ferramenta para isso.
2. "*Few-shot* altera os pesos do modelo." Falso. Os exemplos ficam só no prompt.
3. "Temperatura alta deixa a resposta mais determinística." Falso. É o contrário.
4. "RAG elimina as alucinações." Falso. Reduz, mas a recuperação pode falhar e o modelo pode interpretar mal o trecho.
5. "Para atualizar o conhecimento de um sistema RAG é preciso retreinar o modelo." Falso. Atualiza-se a base indexada.
6. "Similaridade de cosseno igual a 1 indica vetores opostos." Falso. Indica mesma direção; −1 indica direções opostas.
7. "Delimitadores no prompt eliminam a injeção de prompt." Falso. Ajudam, mas a defesa principal é limitar o que o modelo pode fazer.
8. "Uma janela de contexto maior sempre melhora a resposta." Falso. Contexto irrelevante pode atrapalhar, e informações no meio de textos longos tendem a ser menos aproveitadas.
