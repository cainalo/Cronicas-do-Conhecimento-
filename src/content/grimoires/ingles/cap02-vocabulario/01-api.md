A documentação de API é um dos gêneros citados expressamente no edital. Ela tem vocabulário próprio e uma estrutura bastante previsível: descrição do recurso, método, URL, parâmetros, exemplo de requisição, exemplo de resposta, códigos de status e limites de uso. Os trechos em inglês desta seção são autorais e imitam esse estilo, sem reproduzir documentação real.

### Vocabulário essencial

| Termo | Glosa em português |
|---|---|
| *endpoint* | ponto de acesso; URL que responde a determinada operação (*the /invoices endpoint*) |
| *request* / *response* | requisição / resposta |
| *payload* / *body* | conteúdo transportado na requisição ou na resposta (em geral JSON) |
| *query parameter* | parâmetro na URL depois de `?` (`?page=2&limit=50`) |
| *path parameter* | parâmetro dentro do caminho (`/invoices/{id}`) |
| *header* | cabeçalho HTTP (*Authorization*, *Content-Type*) |
| *status code* | código de status HTTP da resposta |
| *method* / *verb* | método HTTP: GET, POST, PUT, PATCH, DELETE |
| *required* / *optional* | obrigatório / opcional |
| *default* | valor padrão, usado quando nada é informado |
| *deprecated* | obsoleto, desaconselhado; ainda funciona, mas será removido no futuro |
| *rate limit* | limite de requisições por período |
| *throttling* | redução deliberada da velocidade de atendimento |
| *breaking change* | mudança incompatível, que quebra integrações existentes |
| *backward compatible* | compatível com versões anteriores |
| *pagination* | divisão do resultado em páginas |
| *timeout* | tempo-limite de espera esgotado |
| *retry* | nova tentativa |
| *webhook* | chamada HTTP que o serviço faz para o sistema do cliente quando ocorre um evento |
| *SDK* | *software development kit*, kit de desenvolvimento |

### Lendo um trecho de referência

*"**GET /v2/contracts/{id}** Returns a single contract. The `id` path parameter is required. Use the optional `fields` query parameter to limit the attributes returned, e.g. `?fields=number,value`. Requests must include a valid bearer token in the `Authorization` header. If the contract does not exist, the API returns 404."*

Glosa: o endpoint retorna um único contrato; o parâmetro de caminho `id` é obrigatório; o parâmetro de consulta `fields` é opcional e limita os atributos devolvidos; toda requisição deve trazer um token válido no cabeçalho `Authorization`; se o contrato não existir, a resposta é 404.

Perguntas possíveis: "qual informação é obrigatória?" (o `id` e o token), "para que serve `fields`?" (restringir os atributos retornados), "o que acontece se o contrato não existir?" (código 404).

### Códigos de status HTTP mais citados

| Código | Nome | Sentido |
|---|---|---|
| 200 | *OK* | sucesso |
| 201 | *Created* | recurso criado |
| 204 | *No Content* | sucesso, sem corpo na resposta |
| 400 | *Bad Request* | requisição malformada ou inválida |
| 401 | *Unauthorized* | falta autenticação válida (apesar do nome, trata de autenticação) |
| 403 | *Forbidden* | autenticado, mas sem permissão |
| 404 | *Not Found* | recurso não encontrado |
| 409 | *Conflict* | conflito com o estado atual do recurso |
| 429 | *Too Many Requests* | limite de requisições excedido |
| 500 | *Internal Server Error* | erro inesperado no servidor |
| 503 | *Service Unavailable* | serviço temporariamente indisponível |

A família indica a natureza: **2xx** sucesso, **3xx** redirecionamento, **4xx** erro do cliente, **5xx** erro do servidor.

### Rate limit, depreciação e mudanças incompatíveis

*"Each client may send up to 60 requests per minute. When the limit is exceeded, subsequent requests are rejected with status 429 until the window resets. Clients should wait and retry rather than send requests in a loop."*

Glosa: cada cliente pode enviar **até 60** requisições por minuto; ao exceder, as requisições seguintes são rejeitadas com 429 **até a janela reiniciar**; os clientes **devem (recomendação, *should*)** esperar e tentar de novo, **em vez de** (*rather than*) enviar em laço.

*"The `status` field is deprecated and will be removed in v3. Use `state` instead. Removing the field is a breaking change; therefore, it will only happen in a major release."*

Glosa: o campo `status` está **obsoleto** e será removido na v3; use `state` **em vez disso**; a remoção é uma **mudança incompatível** e, **portanto**, só ocorrerá em uma versão principal (*major*).

Observe que *deprecated* não significa "já removido" nem "proibido". O recurso ainda funciona, mas há aviso de que deixará de existir.

### Versionamento semântico

Muitas APIs e bibliotecas seguem o **Semantic Versioning** (semver.org), no formato `MAJOR.MINOR.PATCH`:

- **MAJOR**: mudanças incompatíveis na API (*breaking changes*);
- **MINOR**: novas funcionalidades compatíveis com versões anteriores;
- **PATCH**: correções de defeitos compatíveis com versões anteriores.

Passar de 2.4.1 para 3.0.0 sinaliza risco de quebra; de 2.4.1 para 2.4.2, apenas correção.

### Pegadinhas

1. "Um campo *deprecated* já foi removido da API." Falso. Ainda existe, mas é desaconselhado e deve ser removido no futuro.
2. "O código 401 indica que o usuário está autenticado, mas sem permissão." Falso. Isso é 403; o 401 indica falta de autenticação válida.
3. "*Query parameters* aparecem na URL depois do sinal de interrogação." Verdadeiro. Exemplo: `?page=2`.
4. "Uma *breaking change* é uma correção de segurança sem impacto para clientes." Falso. É uma mudança incompatível que pode quebrar integrações.
5. "No semver, novas funcionalidades compatíveis aumentam o número MINOR." Verdadeiro. MAJOR é para incompatibilidades e PATCH para correções.
