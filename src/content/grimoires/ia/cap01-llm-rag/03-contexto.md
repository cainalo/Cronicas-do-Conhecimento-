Se o prompt é o pedido, o **contexto** é tudo o que o modelo enxerga ao responder. A **engenharia de contexto** trata de escolher, organizar e manter essas informações dentro da janela de contexto, que é limitada. O edital usa os dois termos lado a lado: "engenharia de contexto e engenharia de prompts aplicadas ao desenvolvimento de software".

### O que ocupa a janela

Em um assistente de programação, a janela costuma conter:

1. o prompt de sistema e as regras do projeto;
2. o histórico da conversa;
3. o conteúdo de arquivos lidos;
4. os resultados de ferramentas (saída de comandos, buscas, testes);
5. documentos recuperados por RAG;
6. a resposta em construção.

Tudo disputa o mesmo espaço. Contexto demais custa caro, deixa a resposta mais lenta e pode piorar a qualidade.

### Problemas típicos

- **Estouro da janela**: a conversa longa ultrapassa o limite e partes antigas precisam sair.
- **Informação perdida no meio**: estudos (como *Lost in the Middle*, de 2023) mostraram que modelos tendem a aproveitar melhor o que está no início e no fim de contextos longos do que o que está no meio.
- **Contexto contaminado**: um erro ou uma informação velha no histórico continua influenciando as respostas seguintes.
- **Ruído**: arquivos irrelevantes distraem o modelo do que importa.

### Técnicas de gestão de contexto

| Técnica | Ideia |
|---|---|
| Seleção | Incluir só o que é relevante para a tarefa atual (os arquivos certos, não o repositório inteiro). |
| Recuperação sob demanda | Buscar a informação quando ela for necessária (RAG, ferramentas de busca) em vez de carregar tudo antes. |
| Compactação | Resumir o histórico antigo, preservando decisões e pendências. |
| Isolamento | Delegar subtarefas a outro agente com contexto próprio e receber só o resultado. |
| Estrutura | Colocar instruções importantes em posição de destaque e separar seções com marcações claras. |

### Memória

Como o modelo não guarda nada entre chamadas, a **memória** de um sistema de IA é uma construção da aplicação:

- **Memória de curto prazo**: o próprio conteúdo da janela de contexto durante a sessão.
- **Memória de longo prazo**: informações gravadas fora do modelo (arquivos, banco de dados, banco vetorial) e trazidas de volta ao contexto quando necessário.

Nos agentes de programação, um exemplo prático são os **arquivos de instruções do projeto** lidos no início de cada sessão. No Claude Code, esse papel é do arquivo `CLAUDE.md`, que registra convenções, comandos e decisões do repositório. É a mesma estratégia usada neste aplicativo para que uma nova sessão retome o trabalho sem depender da conversa anterior.

### Prompt e contexto: diferença de foco

| | Engenharia de prompts | Engenharia de contexto |
|---|---|---|
| Pergunta central | Como pedir? | O que o modelo precisa ter à mão? |
| Unidade | A instrução | Tudo o que entra na janela |
| Exemplos | *Few-shot*, papéis, formato de saída | Seleção de arquivos, RAG, compactação, memória |
