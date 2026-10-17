O edital fecha a parte de dados com "fundamentos de Big Data, processamento distribuído e características de volume, velocidade e variedade dos dados". Esta seção cobre os Vs, o ecossistema Hadoop, o Spark e as arquiteturas de armazenamento analítico.

### Os Vs do Big Data

O edital cita três Vs, que são o núcleo clássico. A literatura acrescenta outros dois.

| V | Significado | Exemplo |
|---|---|---|
| **Volume** | Quantidade de dados grande demais para ferramentas tradicionais. | Todas as notas fiscais eletrônicas de um estado em vários anos. |
| **Velocidade** | Ritmo em que os dados chegam e precisam ser processados. | Fluxo contínuo de registros de pagamentos. |
| **Variedade** | Diversidade de formatos: estruturados, semiestruturados (JSON, XML) e não estruturados (texto, imagem, áudio). | Planilhas, PDFs de editais, fotos de obras. |
| **Veracidade** | Confiabilidade e qualidade dos dados. | Dados declarados pelo próprio jurisdicionado, com erros. |
| **Valor** | Utilidade que se extrai dos dados. | Achados de auditoria gerados pelo cruzamento. |

Se a questão perguntar pelos três Vs originais, a resposta é **volume, velocidade e variedade**.

### Processamento distribuído

Quando os dados não cabem ou não são processados a tempo em uma única máquina, divide-se o trabalho entre várias máquinas (um **cluster**). A ideia central é **levar o processamento até os dados**, em vez de mover grandes volumes pela rede. A escalabilidade é **horizontal**: acrescentam-se máquinas comuns ao cluster.

| Modo | Característica | Exemplo |
|---|---|---|
| **Em lote** (*batch*) | Processa grandes conjuntos acumulados, com latência maior. | Cruzamento mensal de folhas de pagamento. |
| **Em fluxo** (*streaming*) | Processa eventos à medida que chegam, com baixa latência. | Alerta imediato de pagamento duplicado. |

O Apache **Kafka** é uma plataforma de mensageria distribuída muito usada para transportar fluxos de eventos.

### Ecossistema Hadoop

O **Apache Hadoop** é um framework de código aberto para armazenamento e processamento distribuído. Componentes principais:

- **HDFS** (*Hadoop Distributed File System*): divide arquivos em **blocos** grandes e os **replica** em vários nós para tolerar falhas. O **NameNode** guarda os metadados (onde está cada bloco); os **DataNodes** guardam os blocos. O fator de replicação padrão é 3.
- **MapReduce**: modelo de programação em duas fases principais. Na fase **map**, cada nó processa sua parte e emite pares chave-valor; segue o **shuffle**, que agrupa os pares por chave; na fase **reduce**, os valores de cada chave são combinados. Exemplo clássico: contar palavras em milhões de documentos.
- **YARN**: gerencia os recursos do cluster e agenda as tarefas.

Ferramentas associadas: **Hive** (consultas em linguagem semelhante a SQL sobre dados no Hadoop) e **HBase** (banco NoSQL orientado a colunas sobre o HDFS).

### Apache Spark

O **Spark** é um motor de processamento distribuído que mantém dados **em memória** entre as etapas, o que o torna muito mais rápido que o MapReduce em tarefas iterativas, como treinar modelos de aprendizado de máquina. Pontos de prova:

- Abstrações: **RDD** (conjunto distribuído resiliente) e **DataFrame**.
- **Avaliação preguiçosa** (*lazy evaluation*): **transformações** (como `filter` e `map`) só montam o plano; o processamento acontece quando uma **ação** (como `count` ou `collect`) é chamada.
- Módulos: Spark SQL, MLlib (aprendizado de máquina), Structured Streaming e GraphX (grafos).
- Pode rodar sobre o YARN e ler dados do HDFS; não depende do MapReduce.

### Data warehouse, data lake e lakehouse

| Aspecto | **Data warehouse** | **Data lake** |
|---|---|---|
| Dados | Estruturados, já tratados e integrados. | Brutos, em qualquer formato. |
| Esquema | **Schema-on-write**: definido antes de gravar. | **Schema-on-read**: aplicado na leitura. |
| Usuários típicos | Analistas de negócio, relatórios e painéis. | Cientistas de dados, exploração. |
| Risco | Rigidez para dados novos. | Virar um "pântano de dados" sem catálogo e governança. |

O **lakehouse** combina o armazenamento barato do data lake com recursos de gestão e consulta típicos do data warehouse.

### ETL e ELT

- **ETL** (*extract, transform, load*): os dados são extraídos, transformados em uma área intermediária e só então carregados no destino. Tradicional em data warehouses.
- **ELT** (*extract, load, transform*): os dados são carregados brutos no destino e transformados lá, aproveitando o poder de processamento de plataformas em nuvem e de data lakes.

### Pegadinhas

1. "Os três Vs originais do Big Data são volume, velocidade e veracidade." Falso. São volume, velocidade e variedade.
2. "No HDFS, o NameNode armazena os blocos de dados dos arquivos." Falso. Ele guarda os metadados; os blocos ficam nos DataNodes.
3. "O Spark processa dados em memória e tende a ser mais rápido que o MapReduce em algoritmos iterativos." Verdadeiro. Evita gravar em disco a cada etapa.
4. "Data lake usa schema-on-write." Falso. Usa schema-on-read; o data warehouse é que usa schema-on-write.
5. "No ELT, a transformação ocorre depois da carga no destino." Verdadeiro. Essa é a diferença em relação ao ETL.
