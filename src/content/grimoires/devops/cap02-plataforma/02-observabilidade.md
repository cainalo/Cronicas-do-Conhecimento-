**Monitoramento** responde a perguntas conhecidas ("o servidor está no ar?"). **Observabilidade** é a capacidade de entender o estado interno do sistema pelas saídas que ele produz, inclusive para perguntas que não se previram.

### Os três sinais

| Sinal | O que é | Exemplo |
|---|---|---|
| **Métricas** | Números agregados ao longo do tempo, baratos de guardar | Requisições por segundo, latência no percentil 95, uso de CPU, taxa de erros |
| **Logs** | Registros de eventos discretos, de preferência **estruturados** (JSON) | `{"nivel":"erro","rota":"/processos","usuario":"u123","msg":"timeout no banco"}` |
| **Traces** | O caminho de **uma requisição** por vários serviços, dividido em ***spans*** com duração | Tela → API → serviço de documentos → banco, mostrando onde se perdeu o tempo |

A **correlação** entre os sinais é o que dá poder à investigação. Um **ID de correlação** (*trace ID*) propagado entre serviços e gravado nos logs liga uma métrica ruim aos traces e logs da mesma requisição.

### Telemetria e instrumentação

- **Instrumentar** é fazer o código emitir telemetria: automática (bibliotecas e agentes) ou manual (*spans* e métricas de negócio).
- O **OpenTelemetry** é o padrão aberto (CNCF) para gerar e coletar métricas, logs e traces sem ficar preso a um fornecedor. O **Collector** recebe, processa e exporta para o destino.
- Ferramentas comuns: **Prometheus** (coleta métricas por *pull* e as guarda em série temporal) e **Grafana** (painéis); pilhas de logs como ELK/Elastic e Loki; Jaeger e Tempo para traces.

### Indicadores e alertas

Dois métodos práticos para escolher métricas:

- **Sinais dourados** (SRE do Google): **latência**, **tráfego**, **erros** e **saturação**.
- **RED** para serviços (*Rate, Errors, Duration*) e **USE** para recursos (*Utilization, Saturation, Errors*).

Indicadores de confiabilidade:

| Termo | Significado | Exemplo |
|---|---|---|
| **SLI** | Indicador medido | Percentual de requisições respondidas em menos de 300 ms |
| **SLO** | **Meta interna** para o SLI | 99,5% em 30 dias |
| **SLA** | **Acordo** com o cliente, geralmente com consequências | Multa contratual abaixo de 99% |
| **Orçamento de erro** | O que o SLO permite falhar (100% − SLO) | 0,5% das requisições no mês |

Bons **alertas**:

- disparam por **sintomas** que afetam o usuário (erro e latência acima do SLO), não por qualquer oscilação de CPU;
- são **acionáveis**, com instruções (*runbook*);
- evitam a **fadiga de alertas**, em que o excesso de avisos faz a equipe ignorar os importantes.

Também se acompanham indicadores de entrega, como as **métricas DORA**: frequência de implantação, tempo de espera das mudanças (*lead time*), taxa de falha das mudanças e tempo de recuperação.

### Pegadinhas

1. "Logs e traces são a mesma coisa." Falso. O trace acompanha uma requisição entre serviços, em *spans*.
2. "SLO é o contrato com multa assinado com o cliente." Falso. Esse é o SLA; o SLO é a meta interna.
3. "Quanto mais alertas, melhor a operação." Falso. O excesso causa fadiga e faz perder o que importa.
4. "Log estruturado dificulta a busca." Falso. Facilita filtrar e correlacionar.
