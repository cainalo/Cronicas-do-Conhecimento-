O **processamento de linguagem natural** (PLN) trata de fazer computadores lidarem com texto e fala humanos. Para um Tribunal de Contas, é o que permite classificar denúncias, extrair dados de editais e analisar milhares de pareceres. Esta seção cobre o pipeline clássico; os grandes modelos de linguagem estão no capítulo 1.

### Como o processamento de linguagem surgiu

- **1954: a primeira tradução automática pública.** O experimento **Georgetown-IBM** traduziu cerca de sessenta frases do russo para o inglês, com regras escritas à mão.
- **1966: ELIZA.** No MIT, **Joseph Weizenbaum** criou a **ELIZA**, um programa que conversava imitando uma terapeuta, apenas reorganizando as palavras do usuário.
- **1972: o IDF.** A cientista britânica **Karen Spärck Jones** propôs dar mais peso aos termos que aparecem em poucos documentos: a ideia do **IDF**, base do TF-IDF.
- **1980: o stemmer de Porter.** **Martin Porter** publicou um algoritmo de **stemming** para o inglês que se tornou referência.
- **2013: palavras como vetores.** O **word2vec** mostrou que vetores aprendidos pelo contexto aproximam palavras de sentido parecido.

### Etapas de pré-processamento

| Etapa | O que faz | Exemplo |
|---|---|---|
| **Tokenização** | Divide o texto em unidades (tokens): palavras, partes de palavras ou sinais. | "Contrato vencido." → ["Contrato", "vencido", "."] |
| **Normalização** | Padroniza: minúsculas, remoção de acentos ou pontuação, conforme o objetivo. | "CONTRATO" → "contrato" |
| **Remoção de stopwords** | Retira palavras muito frequentes e pouco informativas. | "o", "de", "que", "em" |
| **Stemming** | Corta sufixos por regras para chegar a um radical, que pode não ser uma palavra real. | "licitações", "licitante" → "licit" |
| **Lematização** | Reduz a palavra à sua forma de dicionário (lema), usando análise morfológica. | "fiscalizaram" → "fiscalizar"; "melhores" → "bom" |

A diferença entre **stemming** e **lematização** é cobrada com frequência. O stemming é mais simples e rápido, porém grosseiro. A lematização é mais precisa porque considera vocabulário e classe gramatical. Para o português existe, por exemplo, o *stemmer* RSLP. A remoção de stopwords nem sempre é desejável: em análise de sentimento, retirar "não" pode inverter o sentido da frase.

Outras tarefas de base são a **etiquetagem morfossintática** (POS *tagging*, que identifica substantivos, verbos etc.) e a análise sintática.

### Representação do texto

Modelos precisam de números. As formas clássicas de transformar texto em vetores são:

- **Bag-of-words** (saco de palavras): cada documento vira um vetor de contagens das palavras do vocabulário. A **ordem das palavras é ignorada**. "O fiscal multou a empresa" e "a empresa multou o fiscal" ficam iguais.
- **N-gramas**: sequências de *n* tokens ("nota fiscal" é um bigrama), que recuperam parte do contexto local.
- **TF-IDF**: pondera a frequência do termo no documento (TF) pelo inverso da frequência nos documentos da coleção (IDF). Uma forma comum é tf × log(N / df), em que N é o número de documentos e df o número de documentos que contêm o termo. Termos que aparecem em quase todos os documentos, como "processo" em uma base de autos, recebem peso baixo; termos raros e concentrados recebem peso alto.
- **Embeddings de palavras**: vetores densos aprendidos a partir do contexto em que a palavra aparece, como no word2vec (2013). Palavras de sentido parecido ficam próximas. Diferentemente de bag-of-words e TF-IDF, que geram vetores esparsos e longos, embeddings são densos e de dimensão menor.
- **Embeddings contextuais**: produzidos por transformers; a mesma palavra recebe vetores diferentes conforme a frase ("banco" de dados × "banco" da praça).

### Tarefas de PLN

| Tarefa | Descrição | Exemplo no controle externo |
|---|---|---|
| **Classificação de texto** | Atribuir uma categoria ao documento. | Triagem de denúncias por área (saúde, obras, educação). |
| **Reconhecimento de entidades nomeadas** (NER) | Identificar nomes de pessoas, organizações, locais, datas, valores. | Extrair CNPJ, nome do fornecedor e valor de um extrato de contrato. |
| **Análise de sentimento** | Identificar a polaridade (positiva, negativa, neutra) de um texto. | Medir a percepção dos cidadãos em manifestações à ouvidoria. |
| **Sumarização** | Gerar resumo extrativo (copia frases) ou abstrativo (reescreve). | Resumir relatórios de auditoria. |
| **Tradução automática** e **perguntas e respostas** | Converter idiomas; responder a perguntas sobre um texto. | Consultas à jurisprudência do Tribunal. |
| **Reconhecimento de fala** | Converter áudio em texto. | Transcrição de sessões plenárias. |

### Medidas de similaridade

Com textos transformados em vetores, a proximidade é medida em geral pela **similaridade de cosseno**. Ela permite achar processos parecidos ou documentos duplicados, mesmo com tamanhos diferentes.

### Dificuldades próprias da linguagem

- **Ambiguidade** lexical e sintática ("o auditor viu o gestor com o binóculo").
- Ironia e sarcasmo, que enganam a análise de sentimento.
- Linguagem jurídica e siglas específicas do órgão, que pedem vocabulário ou ajuste ao domínio.
- Vieses presentes no texto de treino, que podem ser reproduzidos pelo modelo (tema do capítulo 4).

### Pegadinhas

1. "Stemming e lematização produzem sempre o mesmo resultado." Falso. O stemming corta sufixos por regra; a lematização retorna a forma de dicionário.
2. "No modelo bag-of-words, a ordem das palavras é preservada." Falso. Só importam as contagens.
3. "No TF-IDF, um termo presente em quase todos os documentos da coleção recebe peso alto." Falso. O IDF reduz o peso de termos muito comuns.
4. "NER identifica entidades como pessoas, organizações e locais em um texto." Verdadeiro. É a tarefa de reconhecimento de entidades nomeadas.
5. "Remover stopwords é sempre benéfico." Falso. Em análise de sentimento, retirar a negação pode distorcer o resultado.
