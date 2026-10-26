O **Model Context Protocol (MCP)** é um protocolo aberto, lançado pela Anthropic em novembro de 2024, que padroniza como aplicações de IA se conectam a fontes de dados e ferramentas externas. A documentação oficial o compara a uma porta USB-C: em vez de cada aplicação criar uma integração própria para cada sistema, todos falam o mesmo protocolo.

### O problema que ele resolve

Sem um padrão, *M* aplicações de IA integradas a *N* sistemas exigem até *M × N* integrações diferentes. Com o MCP, cada aplicação implementa o lado cliente uma vez e cada sistema implementa um servidor uma vez: *M + N*.

### Arquitetura

| Participante | O que é | Exemplo |
|---|---|---|
| **Host** | A aplicação de IA com que o usuário interage. | Um agente de programação, um aplicativo de chat, uma IDE. |
| **Cliente** | Componente dentro do host que mantém a conexão com **um** servidor. | O host cria um cliente para cada servidor conectado. |
| **Servidor** | Programa que expõe capacidades ao host. | Servidor de acesso ao GitHub, a um banco de dados, ao sistema de arquivos. |

As mensagens seguem o formato **JSON-RPC 2.0**. A conexão começa com uma fase de **inicialização**, em que cliente e servidor negociam versão do protocolo e capacidades suportadas.

### Transportes

- **stdio**: o servidor roda como processo local e a comunicação passa pela entrada e saída padrão. Usado para servidores na própria máquina.
- **Streamable HTTP**: comunicação por HTTP, para servidores remotos. Substituiu o transporte anterior baseado em HTTP com SSE.

### O que um servidor oferece

| Primitiva | Para que serve | Quem controla |
|---|---|---|
| **Tools** (ferramentas) | Funções que o modelo pode pedir para executar: criar um registro, consultar uma API, rodar uma busca. | O modelo decide quando usar. |
| **Resources** (recursos) | Dados que servem de contexto: conteúdo de arquivos, registros, documentos. | A aplicação decide o que incluir. |
| **Prompts** | Modelos de prompt reutilizáveis, com parâmetros. | O usuário escolhe usar. |

O cliente também pode oferecer recursos ao servidor, como *sampling* (o servidor pede ao host uma geração do LLM) e *elicitation* (o servidor pede informações adicionais ao usuário).

### Exemplo de chamada de ferramenta

Pedido do cliente ao servidor:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "buscar_processo",
    "arguments": { "numero": "12345/2026" }
  }
}
```

O servidor executa e devolve o resultado, que o host repassa ao modelo como contexto. Antes disso, o cliente costuma descobrir as ferramentas disponíveis com o método `tools/list`.

### Segurança

Um servidor MCP pode ler dados e executar ações em nome do usuário. Por isso:

- instale apenas servidores de origem confiável;
- conceda o mínimo de permissões e de escopo de credenciais;
- exija consentimento do usuário para ações relevantes;
- trate descrições de ferramentas e resultados devolvidos como conteúdo não confiável, porque podem conter instruções maliciosas (injeção de prompt indireta, também chamada de envenenamento de ferramenta).
