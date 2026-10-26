Um assistente de conversa responde. Um **agente** age: recebe um objetivo, decide os passos, usa ferramentas, observa o resultado e continua até concluir ou precisar de ajuda. O edital chama isso de **sistemas agentivos de desenvolvimento**.

### O que faz de um LLM um agente

Em termos simples, um agente é um LLM dentro de um laço, com acesso a ferramentas:

| Componente | Papel |
|---|---|
| Modelo (LLM) | Interpreta o objetivo, decide a próxima ação e redige o resultado. |
| Ferramentas | Ações que o modelo pode pedir: ler e editar arquivos, executar comandos, buscar na web, consultar APIs. |
| Laço de execução | A aplicação executa a ferramenta pedida, devolve o resultado ao modelo e repete. |
| Contexto e memória | Instruções do projeto, histórico, resultados anteriores. |
| Controles | Permissões, confirmações humanas, limites de custo e de tempo. |

### Uso de ferramentas (*tool use*)

O mecanismo, também chamado de *function calling*, funciona assim:

1. A aplicação informa ao modelo quais ferramentas existem, com nome, descrição e parâmetros (geralmente em **JSON Schema**).
2. Quando precisa, o modelo responde com um **pedido estruturado** de uso de ferramenta: o nome e os argumentos.
3. A **aplicação** (não o modelo) executa a ferramenta.
4. O resultado volta ao modelo como parte do contexto.
5. O modelo decide se usa outra ferramenta ou se responde.

Ponto de prova: o modelo **não executa** nada por conta própria. Ele só pede; quem executa é o programa que o hospeda, que pode negar, pedir confirmação ou limitar a ação.

### Assistentes de codificação: CLI e IDE

O edital cita dois formatos de interface e dá exemplos:

- **Em terminal (CLI)**: o agente roda na linha de comando, dentro da pasta do projeto, lê o código, edita arquivos, executa testes e comandos git. O **Claude Code**, da Anthropic, é citado nominalmente no edital, assim como o Antigravity CLI.
- **Integrado à IDE**: o agente atua dentro do editor, com acesso aos arquivos abertos, ao terminal integrado e aos diagnósticos.

No Claude Code, alguns recursos ilustram conceitos do edital:

| Recurso | Conceito que ilustra |
|---|---|
| Arquivo `CLAUDE.md` com regras do projeto | Memória e gestão de contexto |
| Modos de permissão e confirmação de comandos | Controle humano sobre ações do agente |
| Subagentes com contexto próprio | Isolamento de contexto |
| Servidores MCP | Protocolo de interoperabilidade com ferramentas |
| *Skills* e comandos personalizados | Extensibilidade de fluxos especializados |
| *Hooks* (ações automáticas antes ou depois de eventos) | Automação de fluxos de trabalho |

### Programação baseada em intenção

Na **programação baseada em intenção** (*intent-based programming*), o desenvolvedor descreve **o que** quer, em linguagem natural, e o agente decide **como** implementar. O papel humano se desloca para especificar bem, revisar e validar. A expressão informal *vibe coding* (cunhada por Andrej Karpathy em 2025) descreve o extremo dessa prática: aceitar o código gerado quase sem lê-lo. Para sistemas de produção, especialmente no setor público, isso é justamente o que se deve evitar.
