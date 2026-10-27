O edital descreve o raciocínio lógico como **estrutura lógica de relações arbitrárias entre pessoas, lugares, objetos ou eventos fictícios**, a **dedução de novas informações** a partir das relações fornecidas e a **avaliação das condições** usadas para montar essa estrutura. Termina com a compreensão do processo que, a partir de um conjunto de **hipóteses**, conduz **de forma válida** a conclusões. Em termos de prova, são três famílias de questão: problemas de associação (quem fez o quê, onde), problemas de ordenação e problemas de dedução (verdade e mentira, argumentos com "todo", "algum", "nenhum" e "se... então").

### De Aristóteles aos enigmas de lógica

- **Século IV a.C.: os silogismos.** Aristóteles estudou conclusões que decorrem de premissas com "todo", "algum" e "nenhum".
- **Século III a.C.: os estoicos.** Filósofos como Crisipo estudaram frases do tipo "se... então", de onde vêm formas como o *modus ponens*.
- **1768 e 1880: os círculos.** Leonhard Euler explicou os silogismos com círculos em cartas a uma princesa alemã, publicadas em 1768; John Venn propôs, em 1880, os diagramas com círculos sempre cruzados.
- **1978: pessoas verídicas e mentirosas.** Raymond Smullyan publicou enigmas com pessoa verídicas, que sempre dizem a verdade, e pessoas mentirosas, que sempre mentem.

### Problemas de associação: a tabela de dupla entrada

Quando há pessoas e atributos (setor, cidade, cor, cargo) em correspondência um para um, monte uma tabela com as pessoas nas linhas e os atributos nas colunas.

1. Marque **X** onde uma pista proíbe a combinação e **✓** onde ela confirma.
2. Em cada linha e em cada coluna há exatamente um ✓. Quando uma linha tem um ✓, marque X no resto da linha e da coluna.
3. Se sobrar uma única casa livre numa linha ou coluna, ela é o ✓.
4. Volte às pistas condicionais ("quem trabalha em Obras não é Fábio") depois de cada avanço.

**Exemplo resolvido 1.** Davi, Elisa, Fábio e Gina trabalham, cada um, em um setor diferente: Licitações, Pessoal, Obras e TI.

- Davi não trabalha em Obras nem em TI.
- Elisa trabalha em Licitações ou em TI.
- Fábio não trabalha em Pessoal nem em Licitações.
- Gina não trabalha em Licitações nem em TI.
- Quem trabalha em Obras não é Fábio.

| | Licitações | Pessoal | Obras | TI |
|---|---|---|---|---|
| Davi | X | **✓** | X | X |
| Elisa | **✓** | X | X | X |
| Fábio | X | X | X | **✓** |
| Gina | X | X | **✓** | X |

Resolução: Fábio só poderia estar em Obras ou TI (terceira pista) e não está em Obras (quinta), logo **Fábio está em TI**. Então Elisa, que estava entre Licitações e TI, está em **Licitações**. Davi ficaria entre Licitações e Pessoal, logo **Pessoal**. Sobra **Obras para Gina**, compatível com a quarta pista. Conferência: todas as cinco pistas são satisfeitas e cada setor tem uma só pessoa.

Com três categorias (pessoa, setor e cidade, por exemplo), use uma tabela "em escada" com os cruzamentos pessoa×setor, pessoa×cidade e setor×cidade, ou uma lista de trincas que vai sendo preenchida.

### Problemas de ordenação

Pistas do tipo "chegou antes de", "imediatamente depois", "entre" pedem uma **linha de posições**.

**Exemplo resolvido 2.** Cinco servidores chegaram a uma reunião. Ulisses foi o primeiro; Rui chegou antes de Sara; Tom chegou depois de Sara; Vera chegou imediatamente antes de Tom. Como Ulisses ocupa a 1ª posição, as posições 2 a 5 ficam para Rui, Sara, Vera e Tom. Sara vem antes de Tom e Vera está colada antes de Tom, então Sara vem antes de Vera. Com Rui antes de Sara, a única ordem é **Ulisses, Rui, Sara, Vera, Tom**.

Pistas "imediatamente" formam **blocos** (Vera-Tom) que se movem juntos; comece por elas e pelas posições fixas.

### Verdade e mentira: o método das hipóteses

Quando o problema diz quantos falam a verdade, teste cada hipótese possível e conte as afirmações verdadeiras.

**Exemplo resolvido 3.** Um processo foi extraviado e um dos três servidores, A, B ou C, é o responsável. A diz: "Foi B". B diz: "Não fui eu". C diz: "Não fui eu". Apenas um deles diz a verdade.

| Hipótese de culpado | A ("Foi B") | B ("Não fui eu") | C ("Não fui eu") | Verdades |
|---|---|---|---|---|
| A | F | V | V | 2 |
| B | V | F | V | 2 |
| C | F | V | F | **1** |

Só a hipótese "C é o culpado" deixa exatamente uma afirmação verdadeira. O responsável é **C**, e quem fala a verdade é B.

Variante com "pessoa verídicas" (sempre falam a verdade) e "pessoas mentirosas" (sempre mentem): A diz "Nós dois somos pessoas mentirosas". Se A fosse pessoa verídica, a frase seria verdadeira e ele seria mentiroso, contradição. Logo A é mentiroso, a frase é falsa, e portanto não são os dois pessoas mentirosas: **B é pessoa verídica**.

### Dedução válida a partir de hipóteses

Um argumento é **válido** quando, sendo as premissas verdadeiras, a conclusão é necessariamente verdadeira. Validade depende da forma, e não de a conclusão "parecer" certa.

**Com quantificadores**, desenhe diagramas de conjuntos:

- "Todo A é B": o círculo A dentro de B.
- "Nenhum A é B": círculos separados.
- "Algum A é B": há pelo menos um elemento na interseção.

Exemplo inválido: "Todo auditor é servidor. Algum servidor é engenheiro. Logo, algum auditor é engenheiro." Os engenheiros podem estar na parte dos servidores que não são auditores. A conclusão **não decorre** das premissas.

Exemplo válido: "Nenhum estagiário assina relatório. Todo auditor assina relatório. Logo, nenhum auditor é estagiário." Os auditores estão dentro do conjunto dos que assinam, que não toca o dos estagiários.

**Com condicionais** ("se P, então Q"):

| Forma | Estrutura | Situação |
|---|---|---|
| Modus ponens | P → Q; P; logo Q | Válida |
| Modus tollens | P → Q; não Q; logo não P | Válida |
| Afirmação do consequente | P → Q; Q; logo P | Inválida (falácia) |
| Negação do antecedente | P → Q; não P; logo não Q | Inválida (falácia) |

"Se o contrato tem sobrepreço, então há dano ao erário" equivale a "Se não há dano ao erário, então o contrato não tem sobrepreço" (contrapositiva). Não equivale a "Se há dano, então há sobrepreço".

Negações que caem muito: a negação de "Todo servidor é concursado" é "**Algum servidor não é concursado**"; a de "Nenhum processo atrasou" é "Algum processo atrasou".

### Pegadinhas

- "Em associação um para um, quando uma pessoa recebe um atributo, nenhuma outra pode recebê-lo." Verdadeiro. Por isso se marca X em toda a coluna.
- "Se todo A é B e algum B é C, então algum A é C." Falso. Os elementos de C podem estar em B fora de A.
- "A negação de 'Todo relatório foi entregue' é 'Nenhum relatório foi entregue'." Falso. É "Algum relatório não foi entregue".
- "De 'se chove, a sessão é adiada' e 'a sessão foi adiada' conclui-se que choveu." Falso. É a falácia da afirmação do consequente.
- "Em problema de verdade e mentira, a hipótese correta é a única que respeita a quantidade de verdades informada." Verdadeiro. Por isso se testam todas.
