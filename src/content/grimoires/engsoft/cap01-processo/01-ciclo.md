**Engenharia de software** é a aplicação de uma abordagem sistemática, disciplinada e quantificável ao desenvolvimento, à operação e à manutenção de software. O **ciclo de vida** descreve as etapas pelas quais o software passa, da concepção à aposentadoria.

### Abordagens de ciclo de vida

| Abordagem | Ideia | Quando funciona bem |
|---|---|---|
| **Preditiva** (cascata) | Fases sequenciais: requisitos → projeto → implementação → testes → implantação. Escopo definido no início | Requisitos estáveis e bem conhecidos; forte exigência regulatória |
| **Iterativa** | Repete ciclos para **refinar** a solução a partir de *feedback* | Requisitos incertos que precisam amadurecer |
| **Incremental** | Entrega o produto em **partes funcionais** que se somam | Necessidade de valor cedo, em fatias |
| **Adaptativa / ágil** | Iterativa **e** incremental, com ciclos curtos, envolvimento do cliente e adaptação contínua | Ambiente de mudança, produto que evolui |
| **Híbrida** | Combina as anteriores (por exemplo, contrato e marcos preditivos com entregas ágeis) | Muitas organizações públicas |

Diferença que cai em prova: **iterativo** é refazer para melhorar; **incremental** é acrescentar pedaços prontos. O **modelo espiral** (Boehm) é iterativo e orientado a **riscos**; o **modelo em V** associa cada fase de especificação a um nível de teste.

### Scrum (lembrete)

Detalhado no grimório de Governança: Product Owner, Scrum Master e Developers; Sprint de até um mês; Product Backlog, Sprint Backlog e Incremento, com Meta do Produto, Meta da Sprint e Definição de Pronto.

### Kanban

Método de gestão do **fluxo**:

- visualizar o trabalho num quadro;
- **limitar o trabalho em progresso** (WIP);
- gerenciar o fluxo;
- explicitar as políticas;
- melhorar continuamente.

Métricas típicas: **lead time** (do pedido à entrega), **cycle time** (do início do trabalho à entrega) e **vazão** (itens por período). Não há papéis nem iterações obrigatórias.

### Lean Software Development

Adaptação do pensamento enxuto da Toyota ao software (Mary e Tom Poppendieck). Os sete princípios, na formulação mais citada:

1. Eliminar desperdícios.
2. Construir com qualidade (*build quality in*).
3. Criar conhecimento.
4. Adiar compromissos (decidir no último momento responsável).
5. Entregar rápido.
6. Respeitar as pessoas.
7. Otimizar o todo.

**Desperdícios** típicos: funcionalidades que ninguém usa, trabalho parcialmente feito, troca de contexto, espera, defeitos e repasses desnecessários.

### Extreme Programming (XP)

| Valores | Práticas mais cobradas |
|---|---|
| Comunicação, simplicidade, *feedback*, coragem e respeito | **Programação em par**; **TDD** (escrever o teste antes do código); **integração contínua**; **refatoração**; **design simples**; **pequenas entregas**; **propriedade coletiva** do código; padrões de codificação; **ritmo sustentável**; cliente presente; jogo do planejamento |

O ciclo do **TDD** é **vermelho → verde → refatorar**:

1. Escreve-se um teste que falha.
2. Faz-se o mínimo para ele passar.
3. Melhora-se o código mantendo os testes verdes.

### Pegadinhas

1. "Iterativo e incremental são sinônimos." Falso. Um refina; o outro acrescenta.
2. "Kanban exige sprints de duração fixa." Falso. Ele trabalha com fluxo contínuo.
3. "No TDD, os testes são escritos depois do código." Falso. Vêm antes.
4. "O modelo cascata é proibido no setor público." Falso. Serve quando os requisitos são estáveis.
