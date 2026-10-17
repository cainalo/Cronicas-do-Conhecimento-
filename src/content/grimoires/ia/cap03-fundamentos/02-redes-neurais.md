O edital pede "redes neurais artificiais e noções de deep learning". O foco da FCC costuma ser o vocabulário: neurônio, pesos, função de ativação, camadas, retropropagação e os tipos de rede mais conhecidos.

### O neurônio artificial

Um neurônio artificial recebe entradas *x₁, x₂, ..., xₙ*, multiplica cada uma por um **peso** *wᵢ*, soma tudo com um **viés** (*bias*) *b* e aplica uma **função de ativação** *f*:

saída = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)

Os pesos e o viés são os **parâmetros** aprendidos no treino. O **perceptron** de Rosenblatt (1958) é o modelo pioneiro, com uma única camada. Ele só resolve problemas **linearmente separáveis**; por isso não consegue representar a função XOR. Redes com camadas ocultas superam essa limitação.

### Camadas

| Camada | Papel |
|---|---|
| Entrada | Recebe os atributos (por exemplo, valor do contrato, prazo, modalidade). |
| Ocultas | Combinam as entradas e aprendem representações intermediárias. |
| Saída | Produz a previsão (uma classe, uma probabilidade, um valor). |

Uma rede com várias camadas ocultas é chamada de **profunda**; daí o termo *deep learning*. O perceptron multicamadas (MLP) é a rede totalmente conectada clássica.

### Funções de ativação

| Função | Faixa de saída | Observação |
|---|---|---|
| **Degrau** | 0 ou 1 | Usada no perceptron original. |
| **Sigmoide** | 0 a 1 | Interpretável como probabilidade; sofre com gradiente que desaparece. |
| **Tangente hiperbólica (tanh)** | −1 a 1 | Centrada em zero. |
| **ReLU** | 0 a +∞ (max(0, x)) | Simples e muito usada em camadas ocultas. |
| **Softmax** | Valores entre 0 e 1 que somam 1 | Camada de saída em classificação com várias classes. |

Sem funções de ativação **não lineares**, várias camadas equivaleriam a uma única transformação linear, e a rede perderia poder de representação.

### Como a rede aprende

1. **Propagação direta** (*forward*): os dados passam pela rede e geram uma previsão.
2. **Função de perda** (*loss*): mede o erro da previsão (por exemplo, erro quadrático médio na regressão, entropia cruzada na classificação).
3. **Retropropagação** (*backpropagation*): calcula, pela regra da cadeia, o gradiente da perda em relação a cada peso, da saída para a entrada.
4. **Gradiente descendente**: ajusta cada peso no sentido oposto ao gradiente, em passos controlados pela **taxa de aprendizado**.

Taxa de aprendizado alta demais faz o treino oscilar ou divergir; baixa demais deixa o treino lento. Uma passagem completa pelos dados de treino é uma **época**. No gradiente descendente **estocástico** (SGD) os pesos são atualizados a cada exemplo; no **mini-batch**, a cada pequeno lote.

O **gradiente que desaparece** (*vanishing gradient*) ocorre quando os gradientes ficam muito pequenos nas camadas iniciais, que quase não aprendem. ReLU, normalização e arquiteturas como LSTM ajudam a reduzir o problema. Contra o overfitting, usam-se **dropout** (desligar neurônios aleatoriamente no treino), regularização L1/L2 e parada antecipada.

### Arquiteturas de deep learning

| Arquitetura | Ideia central | Uso típico |
|---|---|---|
| **CNN** (rede convolucional) | Filtros (convoluções) percorrem a imagem e detectam padrões locais; camadas de *pooling* reduzem a dimensão. | Imagens: ler documentos digitalizados, identificar obras em fotos de fiscalização. |
| **RNN** (rede recorrente) | Mantém um estado oculto que carrega informação dos passos anteriores da sequência. | Séries temporais, texto. Variantes **LSTM** e **GRU** lidam melhor com dependências longas. |
| **Transformer** | Mecanismo de **atenção**: cada elemento da sequência pondera a relevância de todos os outros, com processamento em paralelo. | Base dos LLMs (visto no capítulo 1), tradução, também imagens. |

O **transformer** foi apresentado em 2017 no artigo "Attention Is All You Need". A vantagem sobre as RNNs é processar a sequência inteira em paralelo e relacionar diretamente posições distantes. O funcionamento dos modelos de linguagem construídos sobre ele está no capítulo 1 deste grimório.

### Aprendizado por transferência

Em vez de treinar do zero, reaproveita-se um modelo já treinado em grande volume de dados e ajusta-se para a tarefa nova (*transfer learning* ou ajuste fino). Isso reduz a necessidade de dados rotulados, o que é útil para órgãos públicos com bases pequenas.

### Pegadinhas

1. "Um perceptron de camada única resolve a função XOR." Falso. XOR não é linearmente separável; exige camada oculta.
2. "A retropropagação é o algoritmo que define a arquitetura da rede." Falso. Ela calcula os gradientes usados para ajustar os pesos.
3. "Empilhar camadas lineares sem ativação não linear aumenta o poder da rede." Falso. O resultado continua sendo uma transformação linear.
4. "CNNs são especialmente indicadas para dados com estrutura espacial, como imagens." Verdadeiro. As convoluções capturam padrões locais.
5. "Uma taxa de aprendizado muito alta garante convergência mais rápida e estável." Falso. Pode fazer o treino oscilar ou divergir.
