### De um livro de arquitetura aos padrões de software

- **1977 e 1994: padrões.** O arquiteto Christopher Alexander publicou *A Pattern Language*; Gamma, Helm, Johnson e Vlissides levaram a ideia ao software no livro *Design Patterns*, com 23 padrões.
- **1997: UML.** A OMG adotou a UML, unificada por Booch, Rumbaugh e Jacobson.
- **2004 e 2011: BPMN.** A primeira versão saiu pela BPMI (2004); a OMG publicou a BPMN 2.0 (2011).

### UML

A **UML** (*Unified Modeling Language*), mantida pela OMG, é uma linguagem de modelagem, não um processo. A versão 2.5 tem **14 diagramas**, em dois grupos:

| Estruturais (7) | Comportamentais (7) |
|---|---|
| **Classes**, objetos, **componentes**, estrutura composta, pacotes, **implantação**, perfil | **Casos de uso**, **atividades**, **máquina de estados**, e os de interação: **sequência**, comunicação, tempo e visão geral da interação |

Os mais cobrados:

- **Classes**: atributos, operações e relações.
  - Associação.
  - **Agregação** (losango vazio): o todo e as partes existem separadamente, como um departamento e seus servidores.
  - **Composição** (losango cheio): a parte não existe sem o todo, como um pedido e seus itens.
  - Generalização (herança) e dependência.
  - Visibilidade: `+` pública, `-` privada, `#` protegida, `~` pacote.
- **Sequência**: troca de mensagens entre objetos **ao longo do tempo** (linhas de vida verticais).
- **Atividades**: fluxo de ações, decisões e paralelismo; parecido com um fluxograma.
- **Máquina de estados**: estados de um objeto e as transições disparadas por eventos (por exemplo, processo: autuado → em instrução → julgado → arquivado).
- **Implantação**: nós físicos (servidores, contêineres) e os artefatos instalados neles.

### BPMN

A **BPMN 2.0** (*Business Process Model and Notation*), também da OMG, modela **processos de negócio**.

| Categoria | Elementos |
|---|---|
| **Objetos de fluxo** | **Eventos** (círculos: início, intermediário, fim), **atividades** (retângulos arredondados: tarefa, subprocesso), **gateways** (losangos) |
| **Objetos de conexão** | **Fluxo de sequência** (seta cheia, dentro de um *pool*), **fluxo de mensagem** (seta tracejada, **entre** *pools*), associação |
| **Raias** | **Pool** (participante, como o Tribunal ou o jurisdicionado) e **lane** (subdivisão, como setores) |
| **Artefatos** | Objeto de dados, grupo, anotação |

**Gateways**:

| Gateway | Símbolo | Comportamento |
|---|---|---|
| Exclusivo | X | Um único caminho, conforme a condição |
| Paralelo | + | Todos os caminhos ao mesmo tempo (e espera todos ao juntar) |
| Inclusivo | O | Um ou mais caminhos, conforme as condições |
| Baseado em eventos | Pentágono no círculo | O caminho depende de qual evento ocorre primeiro |

### Padrões de projeto (GoF)

O livro *Design Patterns* (Gamma, Helm, Johnson e Vlissides, a "Gangue dos Quatro") cataloga **23 padrões**:

| Grupo | Propósito | Padrões |
|---|---|---|
| **Criacionais** (5) | Como os objetos são **criados** | Abstract Factory, **Builder**, **Factory Method**, Prototype, **Singleton** |
| **Estruturais** (7) | Como classes e objetos são **compostos** | **Adapter**, Bridge, **Composite**, **Decorator**, **Facade**, Flyweight, **Proxy** |
| **Comportamentais** (11) | Como objetos **interagem** e dividem responsabilidades | Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Template Method, Visitor |

Os que mais aparecem:

| Padrão | Para quê |
|---|---|
| **Singleton** | Garantir uma única instância com acesso global (cuidado: dificulta testes) |
| **Factory Method** | Deixar subclasses decidirem qual classe instanciar |
| **Builder** | Montar objetos complexos passo a passo |
| **Adapter** | Converter a interface de uma classe para outra que o cliente espera (por exemplo, um sistema legado) |
| **Facade** | Oferecer uma interface simples para um subsistema complexo |
| **Decorator** | Acrescentar responsabilidades a um objeto dinamicamente, sem herança |
| **Proxy** | Representante que controla o acesso a outro objeto (cache, carga tardia, segurança) |
| **Composite** | Tratar objetos individuais e composições da mesma forma (árvores) |
| **Observer** | Notificar vários objetos quando um muda de estado (base de eventos) |
| **Strategy** | Trocar o algoritmo em tempo de execução, encapsulando cada um |

### Pegadinhas

1. "Composição na UML indica que a parte existe independentemente do todo." Falso. Isso é agregação.
2. "Na BPMN, o fluxo de sequência liga pools diferentes." Falso. Entre pools, usa-se o fluxo de mensagem.
3. "Adapter é um padrão criacional." Falso. É estrutural.
4. "A UML define o processo de desenvolvimento a seguir." Falso. É só uma linguagem de modelagem.
