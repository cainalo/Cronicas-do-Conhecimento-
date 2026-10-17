O edital abre o bloco com "fundamentos da inteligência artificial" e "aprendizado de máquina: aprendizado supervisionado, não supervisionado e por reforço". Esta seção organiza esses conceitos e os erros mais cobrados.

### O que é inteligência artificial

Na definição clássica de Russell e Norvig, a IA estuda **agentes** que percebem o ambiente e agem para alcançar objetivos. Há duas grandes linhas históricas:

| Abordagem | Como funciona | Exemplo |
|---|---|---|
| **Simbólica** (baseada em regras e conhecimento) | Pessoas escrevem regras explícitas e uma máquina de inferência as aplica. | Sistema especialista que aplica "se o valor do contrato passa de X sem licitação, então gere alerta". |
| **Aprendizado de máquina** (*machine learning*) | O sistema ajusta parâmetros a partir de exemplos, sem que cada regra seja escrita à mão. | Modelo que aprende, com processos antigos, quais contratações costumam ter irregularidades. |

O **aprendizado profundo** (*deep learning*) é um subconjunto do aprendizado de máquina, que por sua vez é um subconjunto da IA. Essa relação de inclusão aparece com frequência em provas.

Também se distingue **IA fraca (estreita)**, especializada em uma tarefa, de **IA forte (geral)**, hipotética, com capacidade cognitiva ampla comparável à humana. Todos os sistemas em uso hoje, inclusive os grandes modelos de linguagem, são classificados como IA estreita na literatura didática.

### Aprendizado supervisionado

Os dados de treino têm **rótulo**: para cada entrada, a resposta correta é conhecida. O modelo aprende a mapear entrada em saída.

| Tarefa | Saída | Exemplos de algoritmos | Exemplo no Tribunal |
|---|---|---|---|
| **Classificação** | Categoria (classe) | Árvore de decisão, *random forest*, regressão logística, k-NN, SVM, Naive Bayes | Classificar uma nota fiscal como "regular" ou "suspeita". |
| **Regressão** | Valor numérico contínuo | Regressão linear, árvores de regressão | Estimar o preço de referência de uma obra por metro quadrado. |

A **regressão logística**, apesar do nome, é um algoritmo de **classificação**: ela estima a probabilidade de pertencer a uma classe.

### Aprendizado não supervisionado

Os dados **não têm rótulo**. O objetivo é descobrir estrutura.

- **Agrupamento** (*clustering*): reunir itens parecidos. O **k-means** exige que o número de grupos *k* seja definido antes; o agrupamento hierárquico gera um dendrograma; o DBSCAN agrupa por densidade e marca pontos isolados como ruído.
- **Redução de dimensionalidade**: representar os dados com menos variáveis, preservando o máximo de informação. A **PCA** (análise de componentes principais) cria novas variáveis não correlacionadas que concentram a variância.
- **Regras de associação**: descobrir itens que aparecem juntos (algoritmo Apriori, medidas de suporte e confiança).
- **Detecção de anomalias**: encontrar registros fora do padrão, como pagamentos atípicos a um fornecedor.

Existe ainda o aprendizado **semissupervisionado**, que combina poucos dados rotulados com muitos não rotulados.

### Aprendizado por reforço

Um **agente** interage com um **ambiente**. Em cada **estado**, escolhe uma **ação** e recebe uma **recompensa** (positiva ou negativa). O objetivo é aprender uma **política**, isto é, uma regra que diz qual ação tomar em cada estado para maximizar a recompensa acumulada ao longo do tempo.

| Elemento | Significado |
|---|---|
| Agente | Quem decide. |
| Ambiente | Tudo com que o agente interage. |
| Estado | Situação atual observada. |
| Ação | Escolha feita pelo agente. |
| Recompensa | Sinal numérico de retorno sobre a ação. |
| Política | Mapeamento de estados em ações. |

O dilema **exploração × aproveitamento** (*exploration × exploitation*) consiste em equilibrar testar ações novas e repetir as que já deram bons resultados. O **Q-learning** é um algoritmo clássico. Não há rótulos com a resposta certa: o agente aprende por tentativa e erro.

### Overfitting, underfitting e viés-variância

| Situação | Sintoma | Causa típica | Remédios |
|---|---|---|---|
| **Overfitting** (sobreajuste) | Erro baixo no treino e alto em dados novos. | Modelo complexo demais, poucos dados. | Mais dados, regularização, poda de árvores, *dropout*, parada antecipada, validação cruzada. |
| **Underfitting** (subajuste) | Erro alto no treino e nos dados novos. | Modelo simples demais. | Modelo mais expressivo, mais variáveis, mais treino. |

O **trade-off viés-variância** resume o problema. **Viés** alto é o erro de suposições simplificadoras (leva ao *underfitting*). **Variância** alta é a sensibilidade excessiva aos dados de treino (leva ao *overfitting*). Aumentar a complexidade tende a reduzir o viés e aumentar a variância.

### Aplicações práticas e automação de processos

O edital cita "aplicações práticas de IA em sistemas de informação e automação de processos". Em um órgão de controle, exemplos comuns são: triagem de denúncias por assunto (classificação de texto), cruzamento de bases para achar empresas com sócios em comum (regras e grafos), detecção de sobrepreço (regressão e anomalias) e extração de dados de editais em PDF. A **automação robótica de processos** (RPA) executa tarefas repetitivas em sistemas, imitando cliques e digitação; ela segue regras fixas e pode ser combinada com modelos de IA quando há decisões que dependem de interpretação.

### Pegadinhas

1. "A regressão logística é usada para prever valores contínuos." Falso. Ela é um método de classificação.
2. "No k-means, o algoritmo descobre sozinho o número ideal de grupos." Falso. O valor de *k* é definido antes da execução.
3. "No aprendizado por reforço, o agente aprende com exemplos rotulados com a ação correta." Falso. Ele aprende pelas recompensas obtidas ao agir.
4. "Um modelo com acerto quase perfeito no treino e fraco em dados novos sofre de overfitting." Verdadeiro. Ele memorizou o treino e não generaliza.
5. "PCA é uma técnica supervisionada de classificação." Falso. É redução de dimensionalidade, não supervisionada.
