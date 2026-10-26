**Arquitetura de software** é a organização fundamental de um sistema: seus componentes, as relações entre eles e com o ambiente, e os princípios que guiam o desenho e a evolução.

### Das camadas aos microsserviços

- **1968 e 1972: camadas e módulos.** Edsger Dijkstra descreveu o sistema THE, organizado em camadas; David Parnas mostrou como dividir sistemas em módulos que escondem decisões de projeto. Nos anos 1970, Larry Constantine deu nome a coesão e acoplamento.
- **1987 a 2004: Liskov e SOLID.** Barbara Liskov apresentou o princípio de substituição (1987); por volta de 2000, Robert C. Martin reuniu os princípios cujas iniciais Michael Feathers notou formarem SOLID.
- **2014: microsserviços.** Depois da SOA dos anos 2000, James Lewis e Martin Fowler popularizaram o termo microsserviços.

### Estilos arquiteturais

| Estilo | Como é | Vantagens | Cuidados |
|---|---|---|---|
| **Camadas** | Apresentação → negócio → dados; cada camada usa só a de baixo | Separação de responsabilidades, simples de entender | Pode virar "monólito em camadas" e adicionar latência |
| **SOA** (orientada a serviços) | Serviços corporativos reutilizáveis, contratos formais (frequentemente SOAP/WSDL), muitas vezes integrados por um **ESB** (barramento) | Reuso e integração entre sistemas legados | Barramento centralizado vira gargalo e ponto de acoplamento |
| **Microsserviços** | Serviços **pequenos, independentes**, cada um com **seus próprios dados**, implantados separadamente, comunicando-se por APIs leves ou mensagens | Implantação e escala independentes, equipes autônomas, tolerância a falhas | Complexidade distribuída: rede, consistência eventual, observabilidade, versionamento |
| **Orientada a eventos** | Componentes publicam **eventos** e outros reagem, via *broker* (filas, tópicos) | Baixo acoplamento, assincronia, escala | Fluxo difícil de rastrear; garantias de entrega e ordem |

Padrões associados: **API Gateway** (porta única de entrada), **circuit breaker** (para de chamar um serviço que está falhando), **saga** (transações distribuídas com compensação), **CQRS** (separar escrita e leitura), *event sourcing* (guardar a sequência de eventos como fonte da verdade).

Um **monólito** bem modular não é erro: microsserviços trazem custos que só compensam com escala e equipes suficientes.

### Coesão e acoplamento

- **Coesão**: quão relacionadas são as responsabilidades **dentro** de um módulo. Queremos **alta coesão**.
- **Acoplamento**: quanto um módulo **depende** de outro. Queremos **baixo acoplamento**.

Regra de ouro: **alta coesão, baixo acoplamento**.

### SOLID

| Letra | Princípio | Em uma frase |
|---|---|---|
| **S** | Responsabilidade única | Uma classe deve ter um só motivo para mudar |
| **O** | Aberto/fechado | Aberto para extensão, fechado para modificação |
| **L** | Substituição de Liskov | Subtipos devem poder substituir seus tipos base sem quebrar o comportamento |
| **I** | Segregação de interfaces | Várias interfaces específicas são melhores que uma geral; ninguém deve depender de métodos que não usa |
| **D** | Inversão de dependência | Dependa de abstrações, não de implementações concretas |

### Outros princípios

- **DRY** (*Don't Repeat Yourself*): cada conhecimento deve ter uma representação única no sistema.
- **KISS** (*Keep It Simple, Stupid*): prefira a solução mais simples que funcione.
- **YAGNI** (*You Aren't Gonna Need It*): não implemente o que ainda não é necessário.

### Pegadinhas

1. "Em microsserviços, o ideal é todos os serviços compartilharem o mesmo banco." Falso. Cada serviço é dono dos seus dados.
2. "Alto acoplamento facilita a manutenção." Falso. Espalha o efeito das mudanças.
3. "O princípio aberto/fechado proíbe evoluir o sistema." Falso. Pede que se evolua por extensão.
4. "YAGNI recomenda preparar o código para todos os cenários futuros." Falso. Recomenda o contrário.
