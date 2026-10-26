### A linha do tempo dos dois capítulos

| Ano | APIs | Identidade |
|---|---|---|
| Anos 1960 | | Senhas no CTSS (MIT) |
| 1991 | HTTP (Tim Berners-Lee) | |
| 1998 | XML 1.0 (W3C) | |
| 2000 | Tese de Roy Fielding sobre o REST | |
| 2001 | WSDL | |
| 2002 | | SAML (OASIS) |
| 2005 | | OpenID (Brad Fitzpatrick) |
| 2007 | | OAuth 1.0 |
| 2011 | WebSocket (RFC 6455) | |
| 2012 | | OAuth 2.0 (RFC 6749) e bearer (RFC 6750) |
| 2014 | | OpenID Connect 1.0 |
| 2015 | GraphQL publicado | JWT (RFC 7519) e PKCE (RFC 7636) |
| 2016 | Swagger renomeado OpenAPI | |

### Quadro-resumo dos dois capítulos

| Se a questão fala em... | Pense em... |
|---|---|
| Requisição traz todo o contexto; servidor não guarda sessão | REST sem estado (*stateless*) |
| Repetir a chamada não muda o resultado final | Idempotência (GET, PUT, DELETE) |
| Recurso criado | 201 Created |
| Sem credencial válida / credencial válida sem permissão | 401 / 403 |
| Chaves com aspas duplas, sem comentários | JSON |
| Sintaxe correta / obedece ao esquema | XML bem formado / válido |
| Um endpoint, o cliente escolhe os campos | GraphQL |
| Canal bidirecional persistente, `Upgrade`, 101 | WebSocket |
| Descrever a API em YAML/JSON, Swagger UI | OpenAPI |
| Acessar recurso do usuário sem a senha dele | OAuth 2.0 (autorização delegada) |
| Sistema chama sistema, sem usuário | *Client credentials* |
| Aplicativo de celular ou SPA | Código de autorização com PKCE |
| Saber quem é o usuário, ID Token, escopo `openid` | OpenID Connect |
| cabeçalho.carga.assinatura em Base64URL | JWT |

### Pegadinhas

1. "OAuth 2.0 é um protocolo de autenticação." Falso. É de autorização; a autenticação padronizada vem com o OpenID Connect.
2. "O conteúdo de um JWT assinado é sigiloso." Falso. É apenas codificado em Base64URL; qualquer um o lê.
3. "POST é idempotente." Falso. Repetir um POST pode criar dois registros.
4. "O código 401 indica que o usuário autenticado não tem permissão." Falso. Isso é o 403; o 401 indica falta de autenticação válida.
5. "Em JSON, comentários são permitidos com //." Falso.
6. "Todo XML bem formado é válido." Falso. Validade exige obedecer a um esquema.
7. "GraphQL exige um endpoint por tipo de recurso." Falso. Usa um endpoint único.
8. "O fluxo implícito é o recomendado para aplicativos de página única." Falso. Hoje se recomenda o código de autorização com PKCE.
9. "HS256 usa par de chaves pública e privada." Falso. HS256 é HMAC com segredo compartilhado; RS256 e ES256 usam par de chaves.
10. "O token de atualização deve ser enviado em toda chamada à API." Falso. Ele só é usado junto ao servidor de autorização.
