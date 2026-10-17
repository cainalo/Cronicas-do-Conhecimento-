### OpenID Connect 1.0

O **OpenID Connect** (OIDC) é uma **camada de identidade sobre o OAuth 2.0**. Ele reaproveita os fluxos do OAuth e acrescenta o que faltava: um jeito padronizado de o cliente saber **quem é o usuário** que se autenticou.

O que o OIDC acrescenta:

- O escopo **`openid`**, que indica um pedido de autenticação.
- O **ID Token**, sempre no formato **JWT**, com informações sobre a autenticação.
- O endpoint **UserInfo**, de onde o cliente pode obter mais dados do usuário (com o token de acesso).
- **Descoberta** (`/.well-known/openid-configuration`), que publica os endereços e as chaves públicas do provedor.

| | Token de acesso (OAuth) | ID Token (OIDC) |
|---|---|---|
| Para quem | Para a **API** (servidor de recursos) | Para o **cliente** |
| Para quê | Autorizar o acesso a recursos | Informar quem se autenticou |
| Formato | Não definido pelo OAuth (pode ser opaco ou JWT) | Sempre JWT |

Claims típicas do ID Token: `iss` (emissor), `sub` (identificador do usuário no emissor), `aud` (o cliente a que se destina), `exp` (expiração), `iat` (emissão) e `nonce` (valor do cliente que impede reutilização).

### JSON Web Token (JWT)

O **JWT** (RFC 7519) é um formato compacto para transmitir claims entre partes. Na forma assinada (JWS), tem três partes em **Base64URL**, separadas por pontos:

```
xxxxx.yyyyy.zzzzz
cabeçalho.carga.assinatura
```

```json
// cabeçalho
{ "alg": "RS256", "typ": "JWT" }

// carga (claims)
{
  "iss": "https://login.exemplo.gov.br",
  "sub": "8f2c1a",
  "aud": "sistema-processos",
  "exp": 1792310400,
  "iat": 1792306800,
  "perfil": "auditor"
}
```

A **assinatura** é calculada sobre cabeçalho e carga:

| Algoritmo | Tipo | Chave |
|---|---|---|
| **HS256** | HMAC com SHA-256 | Segredo **compartilhado** entre emissor e verificador (simétrico). |
| **RS256** | RSA com SHA-256 | Emissor assina com a **privada**; qualquer um verifica com a **pública**. |
| **ES256** | ECDSA (curva P-256) com SHA-256 | Idem, com chaves menores. |

Isso conversa com o capítulo de criptografia do Códice das Sete Chaves: HS256 garante integridade e autenticidade entre quem compartilha o segredo; RS256 e ES256 são assinaturas digitais.

### O que o JWT garante e o que não garante

- A assinatura garante **integridade** e **origem**: alterar a carga invalida o token.
- Um JWT assinado **não é cifrado**. Base64URL é codificação, não criptografia: qualquer um lê a carga. Não coloque dados sigilosos nela. Para sigilo existe o **JWE** (JSON Web Encryption).

### Validação correta

Quem recebe um JWT deve:

1. Verificar a **assinatura** com a chave esperada.
2. Aceitar só algoritmos previstos (lista fixa). Nunca aceitar `alg: none`, e nunca deixar o próprio token escolher como será verificado.
3. Conferir `exp` (e `nbf`, se houver).
4. Conferir `iss` (emissor confiável) e `aud` (o token é para mim).

### Revogação e armazenamento

Como o JWT é verificado sem consulta ao emissor, revogá-lo antes de `exp` é difícil. A prática é usar **tokens de acesso de vida curta** (minutos) e tokens de atualização para renovar, que podem ser revogados no servidor de autorização. No navegador, guardar tokens em `localStorage` os expõe a scripts injetados (XSS); cookies `HttpOnly`, `Secure` e `SameSite` reduzem esse risco.
