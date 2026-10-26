Um **requisito** é uma condição ou capacidade que o sistema deve ter para resolver um problema ou atender a um contrato ou norma.

### Funcionais e não funcionais

| Tipo | Descreve | Exemplo |
|---|---|---|
| **Funcional** | **O que** o sistema faz: funções, comportamentos, regras | "O sistema deve permitir que o jurisdicionado envie a prestação de contas em PDF." |
| **Não funcional** | **Como** o sistema deve ser: qualidades e restrições | "A consulta deve responder em até 2 segundos para 95% das requisições." "Os dados pessoais devem ser cifrados em repouso." |

Requisitos não funcionais comuns: desempenho, escalabilidade, disponibilidade, segurança, usabilidade, acessibilidade, manutenibilidade, portabilidade, conformidade legal (LGPD). Um bom requisito não funcional é **mensurável**: "rápido" não serve; "até 2 segundos" serve.

### Engenharia de requisitos

| Atividade | O que se faz |
|---|---|
| **Levantamento** (elicitação) | Entrevistas, oficinas, questionários, observação, análise de documentos, prototipação |
| **Análise** | Resolver conflitos, priorizar (por exemplo, MoSCoW: *must*, *should*, *could*, *won't*), modelar |
| **Especificação** | Documentar de forma clara, sem ambiguidade, verificável |
| **Validação** | Confirmar com os interessados que os requisitos representam **a necessidade real** ("estamos construindo o produto certo?") |
| **Gerenciamento** | Controlar mudanças, versões e **rastreabilidade** (do requisito ao código e ao teste) |

Não confunda **validação** (produto certo) com **verificação** (produto feito do jeito certo, conforme a especificação).

### Histórias de usuário

Formato comum: **Como** [papel], **quero** [ação], **para** [benefício].

> Como auditor, quero filtrar os contratos por fornecedor, para identificar concentração de gastos.

Boas histórias seguem o acrônimo **INVEST**:

- **I**ndependente;
- **N**egociável;
- **V**aliosa;
- **E**stimável;
- **S**mall (pequena);
- **T**estável.

Os **critérios de aceite** definem quando a história está atendida. Uma forma comum é a do BDD, *Given/When/Then* (**Dado** um contexto, **quando** ocorre uma ação, **então** espera-se um resultado):

> Dado que existem 3 contratos do fornecedor X, quando o auditor filtrar por X, então o sistema exibe os 3 contratos e o valor total.

### Casos de uso

Descrevem a interação entre **atores** (pessoas ou sistemas externos) e o sistema para atingir um objetivo.

- **Fluxo principal** (cenário de sucesso), **fluxos alternativos** e **fluxos de exceção**.
- **Pré-condições** e **pós-condições**.
- No diagrama UML de casos de uso:
  - **include**: o caso incluído é executado **sempre** (comportamento obrigatório reaproveitado, como "Autenticar");
  - **extend**: o caso estendido acontece **só em certas condições** (comportamento opcional, como "Emitir comprovante");
  - **generalização**: herança entre atores ou casos.

### Pegadinhas

1. "Disponibilidade de 99,5% é requisito funcional." Falso. É não funcional.
2. "Validação verifica se o código segue a especificação." Falso. Isso é verificação; validação confirma a necessidade.
3. "No include, o comportamento incluído é opcional." Falso. Opcional é o extend.
4. "Critério de aceite é a mesma coisa que Definição de Pronto." Falso. O critério é de cada história; a Definição de Pronto vale para todo incremento.
