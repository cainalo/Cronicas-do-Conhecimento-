### Máquinas virtuais, containers e serverless

| | Máquina virtual | Container | Serverless (FaaS) |
|---|---|---|---|
| Isola | Um sistema operacional inteiro sobre um hipervisor | Processos que compartilham o núcleo do sistema hospedeiro | Funções executadas pelo provedor sob demanda |
| Inicialização | Minutos | Segundos | Milissegundos a segundos (com possível "partida a frio") |
| O cliente gerencia | Sistema operacional e tudo acima | Imagem e configuração | Apenas o código da função |
| Cobrança típica | Por tempo ligado | Pelos recursos do cluster | Por execução e tempo de execução |

**Serverless** não significa ausência de servidores: significa que o cliente não os administra. O código roda em resposta a eventos (requisição HTTP, arquivo enviado, mensagem numa fila) e escala automaticamente, inclusive até zero.

### Escalabilidade e elasticidade

- **Escala vertical** (*scale up*): aumentar a capacidade de uma máquina (mais CPU, mais memória). Tem limite físico e costuma exigir reinício.
- **Escala horizontal** (*scale out*): acrescentar mais máquinas e distribuir a carga com um balanceador. Exige que a aplicação seja preparada para isso, por exemplo, sem guardar sessão localmente (como nas APIs REST sem estado).
- **Elasticidade**: capacidade de escalar para cima **e para baixo** automaticamente, acompanhando a demanda.

### Alta disponibilidade

Alta disponibilidade é manter o serviço funcionando apesar de falhas, eliminando **pontos únicos de falha**: servidores redundantes, balanceamento com verificação de saúde, réplicas de banco de dados e distribuição em **zonas de disponibilidade** (datacenters independentes de uma mesma região) ou em regiões diferentes.

Quanto representa cada "nove" de disponibilidade em um ano (8.760 horas):

| Disponibilidade | Indisponibilidade máxima por ano |
|---|---|
| 99% | cerca de 3,65 dias |
| 99,9% | cerca de 8 horas e 46 minutos |
| 99,99% | cerca de 53 minutos |
| 99,999% | cerca de 5 minutos |

Na recuperação de desastres, dois indicadores definem a meta:

- **RPO** (*Recovery Point Objective*): quanta perda de dados é tolerável, medida em tempo (até que ponto do passado se volta).
- **RTO** (*Recovery Time Objective*): em quanto tempo o serviço precisa voltar.

### Integração entre ambiente local e nuvem

Em nuvem híbrida, o datacenter da organização se liga ao provedor por **VPN** sobre a internet ou por **link dedicado**. Identidades costumam ser federadas (o mesmo diretório autentica nos dois ambientes) e os dados sensíveis podem permanecer no ambiente local por exigência legal.

### Monitoramento

Monitorar a infraestrutura significa acompanhar **métricas** (uso de CPU, memória, latência, taxa de erros), **logs** e alertas, com painéis e limites definidos. A disciplina mais ampla, que inclui *traces* distribuídos, é a **observabilidade**, cobrada no bloco de DevOps.

### Pegadinhas

1. "Em SaaS, o cliente aplica atualizações no sistema operacional." Falso. Isso cabe ao cliente em IaaS.
2. "Serverless dispensa servidores." Falso. Dispensa a administração deles pelo cliente.
3. "Escala vertical é acrescentar máquinas." Falso. Isso é horizontal.
4. "Na nuvem pública, a segurança dos dados é responsabilidade exclusiva do provedor." Falso. A responsabilidade é compartilhada; dados e acessos são sempre do cliente.
5. "RPO é o tempo para restabelecer o serviço." Falso. Esse é o RTO; o RPO mede a perda de dados tolerável.
