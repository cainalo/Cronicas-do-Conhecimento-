O edital pede "fundamentos de ciência de dados: coleta, preparação, limpeza, transformação, exploração e análise de dados; noções de estatística aplicada e avaliação de modelos". Esta seção segue o caminho dos dados até a métrica final.

### O processo de ciência de dados

Um modelo de referência muito citado é o **CRISP-DM**, com seis fases: entendimento do negócio, entendimento dos dados, preparação dos dados, modelagem, avaliação e implantação. O processo é **iterativo**: a avaliação pode mandar de volta à preparação ou ao entendimento do negócio.

| Etapa | Atividades | Exemplo no Tribunal |
|---|---|---|
| **Coleta** | Obter dados de sistemas, APIs, arquivos, portais de transparência, raspagem de páginas. | Extrair empenhos e pagamentos dos municípios jurisdicionados. |
| **Limpeza** | Tratar valores ausentes, duplicados, inconsistentes e erros de digitação. | CNPJ com dígitos faltando; mesmo fornecedor grafado de três formas. |
| **Transformação** | Normalizar escalas, codificar categorias, criar variáveis derivadas, agregar. | Criar "percentual de aditivos sobre o valor inicial". |
| **Exploração** (EDA) | Estatísticas descritivas, gráficos, correlações, detecção de *outliers*. | Histograma dos valores de contratos por modalidade. |
| **Modelagem e análise** | Aplicar algoritmos e testar hipóteses. | Modelo de risco de sobrepreço. |

### Tratamentos comuns na preparação

- **Valores ausentes**: remover registros, imputar média ou mediana, ou usar um valor que sinalize a ausência. A escolha deve ser registrada.
- ***Outliers***: valores extremos podem ser erro de digitação ou o próprio achado de auditoria. Não se apagam automaticamente.
- **Normalização** (escala de 0 a 1, *min-max*) e **padronização** (*z-score*: média 0 e desvio-padrão 1) colocam variáveis em escalas comparáveis.
- **Codificação de categorias**: *one-hot encoding* cria uma coluna binária por categoria.
- **Vazamento de dados** (*data leakage*): usar no treino informação que não estaria disponível no momento da previsão. Gera desempenho irrealmente alto.

### Estatística descritiva

| Medida | Definição | Sensível a valores extremos? |
|---|---|---|
| **Média** | Soma dos valores dividida pela quantidade. | Sim. |
| **Mediana** | Valor central dos dados ordenados. | Não (é robusta a *outliers*). |
| **Moda** | Valor mais frequente. Pode haver mais de uma ou nenhuma. | Não. |
| **Amplitude** | Máximo menos mínimo. | Sim. |
| **Variância** | Média dos quadrados dos desvios em relação à média. | Sim. |
| **Desvio-padrão** | Raiz quadrada da variância, na mesma unidade dos dados. | Sim. |

Exemplo: pagamentos de 2, 3, 3, 5 e 12 mil reais. Média = 25 / 5 = 5; mediana = 3; moda = 3. O pagamento de 12 mil puxa a média para cima, mas não altera a mediana. Por isso a mediana descreve melhor dados assimétricos, como salários e valores de contratos.

Em uma distribuição **assimétrica à direita** (cauda longa de valores altos), em geral média > mediana.

### Correlação e causalidade

O **coeficiente de correlação de Pearson** varia de −1 a 1 e mede a força da relação **linear** entre duas variáveis. Valor perto de 0 indica ausência de relação linear, o que não exclui uma relação não linear.

**Correlação não implica causalidade.** Municípios com mais auditorias podem ter mais irregularidades registradas sem que a auditoria cause irregularidade: ambas podem depender de uma terceira variável, como o volume de recursos recebidos (variável de confusão).

### Divisão dos dados e validação

- **Treino e teste**: o modelo aprende no conjunto de treino e é avaliado em um conjunto de teste separado, que ele nunca viu. Divisões como 70/30 ou 80/20 são comuns.
- **Validação**: um terceiro conjunto, ou a validação cruzada, serve para escolher hiperparâmetros sem contaminar o teste.
- **Validação cruzada k-fold**: os dados são divididos em *k* partes; o modelo é treinado *k* vezes, cada vez usando uma parte diferente como teste, e o resultado é a média. Dá uma estimativa mais estável do desempenho.

### Matriz de confusão e métricas de classificação

Suponha 1.000 contratos, dos quais 50 são de fato irregulares. O modelo aponta 40 como irregulares e acerta 30.

| | Previsto irregular | Previsto regular |
|---|---|---|
| **Real irregular** | VP = 30 | FN = 20 |
| **Real regular** | FP = 10 | VN = 940 |

| Métrica | Fórmula | Resultado | Pergunta que responde |
|---|---|---|---|
| **Acurácia** | (VP + VN) / total | 970 / 1.000 = 97% | Quanto acertou no geral? |
| **Precisão** | VP / (VP + FP) | 30 / 40 = 75% | Dos que apontei, quantos eram mesmo irregulares? |
| **Revocação** (*recall*, sensibilidade) | VP / (VP + FN) | 30 / 50 = 60% | Dos irregulares, quantos encontrei? |
| **F1** | 2 × P × R / (P + R) | ≈ 66,7% | Equilíbrio entre precisão e revocação (média harmônica). |
| **Especificidade** | VN / (VN + FP) | 940 / 950 ≈ 98,9% | Dos regulares, quantos reconheci? |

A acurácia de 97% engana: um modelo que dissesse "regular" para tudo teria 95%. Em **classes desbalanceadas**, prefira precisão, revocação, F1 e AUC. Quando deixar passar uma irregularidade é grave, prioriza-se a **revocação**; quando cada alerta gera trabalho caro de auditoria, a **precisão** pesa mais.

A **curva ROC** mostra a taxa de verdadeiros positivos contra a taxa de falsos positivos para vários limiares de decisão. A **AUC** é a área sob essa curva: 1 indica separação perfeita e 0,5 equivale a um palpite aleatório.

### Métricas de regressão

- **MAE** (erro absoluto médio): média dos valores absolutos dos erros, na unidade da variável.
- **MSE** (erro quadrático médio) e **RMSE** (raiz do MSE): elevam os erros ao quadrado e, por isso, **penalizam mais os erros grandes**. O RMSE volta à unidade original.
- **R²** (coeficiente de determinação): proporção da variância explicada pelo modelo.

### Pegadinhas

1. "Acurácia alta garante bom modelo mesmo com classes muito desbalanceadas." Falso. Prever sempre a classe majoritária já dá acurácia alta.
2. "A revocação mede, entre os casos apontados como positivos, quantos são positivos de fato." Falso. Essa é a precisão; revocação olha os positivos reais.
3. "A mediana é menos afetada por valores extremos do que a média." Verdadeiro. Ela depende só da posição central.
4. "AUC igual a 0,5 indica desempenho equivalente ao acaso." Verdadeiro. A curva coincide com a diagonal.
5. "Correlação forte entre duas variáveis prova que uma causa a outra." Falso. Pode haver variável de confusão ou coincidência.
