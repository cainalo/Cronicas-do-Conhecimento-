REST não é a única forma de oferecer uma API. O edital pede "conceitos de GraphQL e WebSockets".

### Como essas tecnologias surgiram

- **Anos 2000: perguntar sem parar.** Para mostrar novidades em tempo real, as páginas faziam **polling** (perguntar de tempos em tempos) e **long polling** (o servidor segura a resposta até haver novidade). Funcionava, mas desperdiçava conexões.
- **2011: o WebSocket.** A **RFC 6455** padronizou o **WebSocket**, um canal de ida e volta que fica aberto entre navegador e servidor.
- **2012 e 2015: o GraphQL.** O **Facebook** criou o **GraphQL** em 2012 para o seu aplicativo móvel, que precisava de muitos dados em poucas chamadas, e o publicou em 2015.
- **2018: governança aberta.** O GraphQL passou para a **GraphQL Foundation**, ligada à Linux Foundation.

### GraphQL

GraphQL é uma linguagem de consulta para APIs, criada no Facebook e publicada em 2015. Suas características centrais:

- **Um único endpoint** (por exemplo, `POST /graphql`), em vez de uma URI por recurso.
- **Esquema tipado**: o servidor declara tipos, campos e relações.
- **O cliente escolhe os campos** que quer receber, na forma exata da resposta.

Isso resolve dois problemas comuns do REST:

- **Excesso de dados** (*over-fetching*): o endpoint devolve campos que o cliente não usa.
- **Falta de dados** (*under-fetching*): o cliente precisa de várias chamadas para montar uma tela.

```graphql
query {
  processo(numero: "12345/2026") {
    relator { nome }
    anexos { nome }
  }
}
```

Operações:

| Operação | Papel |
|---|---|
| `query` | Leitura |
| `mutation` | Alteração (criar, atualizar, excluir) |
| `subscription` | Receber eventos em tempo real (normalmente via WebSocket) |

Cuidados: o cache HTTP tradicional funciona pior (tudo passa pelo mesmo endpoint, muitas vezes via POST); consultas muito aninhadas podem sobrecarregar o servidor, exigindo limites de profundidade e custo; e o problema das **N+1 consultas** ao banco aparece quando cada campo relacionado dispara uma consulta separada. Em geral, erros de negócio vêm no campo `errors` da resposta, muitas vezes com status HTTP 200.

### WebSockets

O protocolo WebSocket (RFC 6455) cria um canal de comunicação **bidirecional e simultâneo** (*full-duplex*) sobre uma única conexão TCP que permanece aberta. Servidor e cliente podem enviar mensagens a qualquer momento, sem que o cliente precise perguntar.

Como funciona:

1. O cliente faz uma requisição HTTP comum com o cabeçalho `Upgrade: websocket`.
2. O servidor aceita respondendo **101 Switching Protocols**.
3. A partir daí, a conexão deixa de ser HTTP e passa a trafegar quadros WebSocket.

Esquemas de URI: `ws://` e, cifrado com TLS, `wss://`.

### Formas de receber atualizações

| Técnica | Como funciona | Quando usar |
|---|---|---|
| *Polling* | O cliente pergunta de tempos em tempos. | Simples; atualizações raras. |
| *Long polling* | O servidor segura a resposta até haver novidade. | Compatibilidade com infraestrutura antiga. |
| SSE (*Server-Sent Events*) | O servidor envia um fluxo contínuo, só de ida, sobre HTTP. | Notificações e painéis em tempo real. |
| WebSocket | Canal de ida e volta persistente. | Chat, colaboração, jogos, cotações. |
