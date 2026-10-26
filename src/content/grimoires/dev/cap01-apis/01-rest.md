Uma **API** (*Application Programming Interface*) é o contrato pelo qual um sistema oferece funções a outro. Na web, a forma mais comum é a API **REST** sobre HTTP: o aplicativo do celular pede dados ao servidor, o servidor responde em JSON.

### Como as APIs web surgiram

- **1991: o HTTP.** **Tim Berners-Lee** criou o **HTTP** para a World Wide Web: o navegador pede uma página, o servidor responde. A primeira versão só tinha o método GET.
- **1996 e 1999: o HTTP cresce.** O **HTTP/1.0** (RFC 1945, 1996) trouxe cabeçalhos, códigos de status e outros métodos; o **HTTP/1.1** (RFC 2616, 1999), escrito com a participação de **Roy Fielding**, tornou-se a base da web por mais de uma década.
- **Por volta de 2000: o SOAP.** Para que sistemas conversassem entre si, surgiram os serviços web com **SOAP**, mensagens em XML com contratos rígidos.
- **2000: a tese de Fielding.** Na sua tese de doutorado, **Roy Fielding** descreveu o **REST**: um jeito mais simples de fazer sistemas conversarem, usando o próprio HTTP como foi pensado.

### O estilo REST

REST (*Representational State Transfer*) foi descrito por Roy Fielding em sua tese de doutorado, em 2000. Não é um protocolo nem um padrão formal: é um **estilo arquitetural** definido por restrições.

| Restrição | Significado |
|---|---|
| Cliente-servidor | Interface separada do armazenamento; cada lado evolui sozinho. |
| **Sem estado** (*stateless*) | Cada requisição traz tudo o que o servidor precisa para atendê-la; o servidor não guarda sessão do cliente entre chamadas. |
| Cache | Respostas indicam se podem ser guardadas e reutilizadas. |
| Interface uniforme | Recursos identificados por URI, manipulados por representações, mensagens autodescritivas e hipermídia (HATEOAS). |
| Sistema em camadas | O cliente não sabe se fala com o servidor final ou com um intermediário (proxy, balanceador, cache). |
| Código sob demanda | Opcional: o servidor pode enviar código executável ao cliente. |

**Recurso** é qualquer coisa nomeável: um processo, um jurisdicionado, uma lista de pareceres. A URI nomeia o recurso com substantivos (`/processos/123`), e o **método HTTP** diz o que fazer com ele.

### Métodos HTTP

| Método | Uso típico | Seguro? | Idempotente? |
|---|---|---|---|
| GET | Ler um recurso | Sim | Sim |
| HEAD | Como GET, só os cabeçalhos | Sim | Sim |
| OPTIONS | Consultar métodos permitidos | Sim | Sim |
| POST | Criar ou processar | Não | Não |
| PUT | Substituir o recurso inteiro (ou criar em URI conhecida) | Não | Sim |
| PATCH | Alterar parte do recurso | Não | Não necessariamente |
| DELETE | Remover | Não | Sim |

- **Seguro**: não altera o estado do servidor.
- **Idempotente**: repetir a mesma requisição tem o mesmo efeito que fazê-la uma vez. Apagar o processo 123 duas vezes deixa o sistema no mesmo estado que apagar uma vez (a segunda resposta pode até ser 404, mas o estado é o mesmo).

Idempotência importa em redes instáveis: se a resposta se perdeu, um PUT pode ser reenviado sem medo; um POST pode criar um registro duplicado.

### Códigos de status

| Faixa | Sentido | Exemplos que caem em prova |
|---|---|---|
| 2xx | Sucesso | **200** OK; **201** Created (recurso criado, com cabeçalho `Location`); **204** No Content |
| 3xx | Redirecionamento | **301** movido permanentemente; **302** encontrado em outro lugar; **304** não modificado (use o cache) |
| 4xx | Erro do cliente | **400** requisição malformada; **401** não autenticado; **403** autenticado, porém sem permissão; **404** não encontrado; **405** método não permitido; **409** conflito; **422** conteúdo inválido; **429** requisições demais |
| 5xx | Erro do servidor | **500** erro interno; **502** gateway recebeu resposta inválida; **503** serviço indisponível; **504** tempo esgotado no gateway |

A pegadinha clássica é a dupla **401 e 403**. Apesar do nome oficial "Unauthorized", o 401 significa que faltou autenticação (credencial ausente ou inválida). O 403 significa que o servidor sabe quem você é, mas você não tem permissão.

### Exemplo de diálogo

```
POST /api/processos HTTP/1.1
Host: sistema.tce.example
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{ "numero": "12345/2026", "jurisdicionado": "Município X" }

HTTP/1.1 201 Created
Location: /api/processos/987
Content-Type: application/json

{ "id": 987, "numero": "12345/2026" }
```

### Boas práticas de desenho

- Substantivos no plural nas URIs, sem verbos: `GET /processos`, não `GET /listarProcessos`.
- Filtros e paginação na *query string*: `/processos?ano=2026&page=2`.
- Versionamento explícito (`/v1/...` ou cabeçalho).
- Erros com corpo padronizado (por exemplo, o formato *Problem Details*, RFC 9457).
- HTTPS sempre, e limitação de taxa (429) para evitar abuso.
