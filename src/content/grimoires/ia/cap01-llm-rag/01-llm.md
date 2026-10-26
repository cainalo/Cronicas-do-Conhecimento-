O edital cobra IA em dois blocos: "Engenharia de Software Assistida por IA e Sistemas Agentivos" (4 questões) e "Inteligência Artificial, Ciência de Dados e Automação" (5 questões). Este capítulo trata da base comum aos dois: o que é um modelo de linguagem, como conversar com ele e como dar a ele o conhecimento certo.

### Como os modelos de linguagem surgiram

- **1948: prever a próxima letra.** Em "A Mathematical Theory of Communication", **Claude Shannon** mostrou que é possível estimar o próximo caractere ou palavra de um texto em inglês a partir dos anteriores. É a ideia de base de todo modelo de linguagem.
- **2017: o transformer.** O artigo "Attention Is All You Need" apresentou a arquitetura que tornou possível treinar modelos enormes.
- **2018 a 2020: os grandes modelos.** O Google lançou o **BERT** e a OpenAI, o **GPT** (2018); o **GPT-3** (2020) mostrou que um modelo muito grande aprende tarefas só com exemplos no prompt.
- **2022: o assistente conversacional.** Com o ajuste por preferências humanas (**RLHF**), os modelos passaram a seguir instruções melhor, e o **ChatGPT** levou os LLMs ao grande público no fim de 2022.

### Onde os LLMs se encaixam

Os termos aparecem em prova como conjuntos dentro de conjuntos:

| Termo | O que abrange |
|---|---|
| Inteligência artificial | Qualquer técnica que faça a máquina executar tarefas associadas à inteligência humana. |
| Aprendizado de máquina | Subárea da IA em que o sistema aprende padrões a partir de dados, em vez de seguir regras escritas à mão. |
| Aprendizado profundo (*deep learning*) | Aprendizado de máquina com redes neurais de muitas camadas. |
| IA generativa | Modelos que produzem conteúdo novo: texto, imagem, áudio, código. |
| LLM (*Large Language Model*) | Modelo generativo de linguagem, com bilhões de parâmetros, treinado em grandes volumes de texto. |

### Como um LLM funciona

Um LLM é uma rede neural, quase sempre da arquitetura **Transformer** (apresentada no artigo *Attention Is All You Need*, de 2017). Sua tarefa básica é prever o próximo pedaço de texto a partir do que veio antes. Ao repetir essa previsão muitas vezes, o modelo escreve respostas inteiras.

Alguns conceitos que caem com frequência:

- **Token**: a unidade de texto que o modelo lê e escreve. Pode ser uma palavra, parte dela ou um sinal de pontuação. Limites e custos de uso costumam ser medidos em tokens.
- **Parâmetros**: os pesos numéricos da rede, ajustados no treinamento. É o que o "grande" de LLM indica.
- **Atenção (*self-attention*)**: o mecanismo que permite ao modelo ponderar a relevância de cada token do contexto ao gerar o próximo. É a ideia central do Transformer.
- **Janela de contexto**: a quantidade máxima de tokens que o modelo considera de uma vez (instruções, conversa, documentos e a própria resposta). O que fica fora da janela simplesmente não existe para o modelo naquela chamada.
- **Temperatura**: parâmetro que controla a aleatoriedade da geração. Valores baixos deixam a saída mais previsível; valores altos, mais variada.
- **Embedding**: representação de um texto como vetor de números, de modo que textos de sentido parecido fiquem próximos. É a base da busca semântica e do RAG.

### Etapas de treinamento

1. **Pré-treinamento**: o modelo aprende a prever texto em um corpus enorme. Sai daí um modelo com amplo conhecimento, mas que ainda não segue instruções bem.
2. **Ajuste fino (*fine-tuning*)**: treino adicional com exemplos específicos, como pares de instrução e resposta.
3. **Alinhamento com preferências humanas**: técnicas como o RLHF (aprendizado por reforço com feedback humano) ensinam o modelo a preferir respostas úteis, corretas e seguras.

O conhecimento aprendido no treinamento tem uma **data de corte**. Fatos posteriores só chegam ao modelo se forem colocados no contexto (por exemplo, via RAG ou ferramentas de busca).

### Alucinação

**Alucinação** é a geração de conteúdo fluente e convincente, porém falso ou sem fundamento: uma referência que não existe, uma função de biblioteca inventada, um artigo de lei trocado. Ela acontece porque o modelo produz o texto mais provável, e o mais provável nem sempre é o verdadeiro.

Formas de reduzir o problema:

- fornecer as fontes no contexto (RAG) e pedir que a resposta se limite a elas;
- pedir citações verificáveis;
- validar a saída com testes, ferramentas ou revisão humana;
- permitir que o modelo diga que não sabe.

Nenhuma dessas medidas zera o risco. Em código, a validação mais confiável continua sendo executar testes.

### Modelos multimodais

Modelos **multimodais** recebem e, às vezes, produzem mais de um tipo de dado: texto, imagem, áudio. Um exemplo de uso em TI é enviar a captura de tela de um erro e pedir o diagnóstico.
