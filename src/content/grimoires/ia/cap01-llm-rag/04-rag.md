**++RAG++** (*Retrieval-Augmented Generation*, geração aumentada por recuperação) combina uma etapa de **++busca++** com a **++geração++** do LLM. Antes de responder, o sistema recupera trechos relevantes de uma base de conhecimento e os coloca no contexto. O termo vem do artigo de Lewis e colegas, de 2020.

### Como o RAG surgiu

- **Anos 1990: buscar por palavras.** O algoritmo **BM25**, desenvolvido por **Stephen Robertson** e colegas no projeto Okapi, em Londres, tornou-se padrão em mecanismos de busca por palavras-chave.
- **2020: o nome RAG.** **Patrick Lewis** e colegas publicaram o artigo que juntou **busca** e **geração** e deu nome à técnica.
- **A partir de 2023: RAG em toda parte.** Com os assistentes conversacionais, empresas e órgãos passaram a conectar LLMs às suas próprias bases de documentos, para responder com fonte.

### Por que usar

- O modelo passa a responder com base em documentos atualizados ou privados (normas internas, manuais, processos) que não estavam no treinamento.
- Reduz alucinações, porque a resposta se apoia em texto fornecido.
- Permite citar a fonte de cada afirmação.
- Atualizar o conhecimento é só atualizar a base; não é preciso treinar o modelo de novo.

### O fluxo, passo a passo

**Fase de indexação (feita antes):**

1. **Coleta** dos documentos (PDFs, páginas, tabelas).
2. **Divisão em trechos** (*chunking*): textos longos são quebrados em pedaços menores, às vezes com sobreposição entre eles.
3. **Geração de embeddings**: cada trecho vira um vetor.
4. **Armazenamento** dos vetores, com o texto e metadados, em um **++banco vetorial++**.

**Fase de consulta (a cada pergunta):**

5. A pergunta do usuário também é convertida em embedding.
6. **Busca por similaridade**: o banco devolve os *k* trechos mais próximos (*top-k*).
7. **Aumento**: os trechos recuperados são inseridos no prompt, junto da pergunta.
8. **Geração**: o LLM responde usando esses trechos, de preferência citando-os.

```
Pergunta
   ▼ embedding
Busca no banco vetorial (top-k)
   ▼ trechos relevantes
Prompt = instruções + trechos + pergunta
   ▼
LLM gera a resposta com citações
```

### Onde o RAG falha

A qualidade da resposta depende da qualidade da recuperação. Se o trecho certo não vier, o modelo responde mal ou alucina. Causas comuns: trechos grandes ou pequenos demais, documentos mal convertidos, perguntas com termos exatos (siglas, números de lei) que a busca semântica não captura bem.

Melhorias usuais:

- **Busca híbrida**: combina busca por palavras-chave (como BM25) com busca vetorial.
- **Reordenação** (*re-ranking*): um segundo modelo reordena os candidatos antes de enviá-los ao LLM.
- **Metadados e filtros**: restringir a busca por data, órgão, tipo de documento.

### RAG ou ajuste fino?

| Critério | RAG | Ajuste fino |
|---|---|---|
| Conhecimento que muda com frequência | Adequado: basta atualizar a base | Inadequado: exige novo treino |
| Citar a fonte | Natural | Difícil |
| Ensinar estilo, formato ou comportamento | Limitado | Adequado |
| Custo de atualização | Baixo | Alto |

Os dois podem ser combinados. Em prova, a associação mais cobrada é: **conhecimento atualizado e rastreável → RAG**; **mudança de comportamento ou estilo → ajuste fino**.
