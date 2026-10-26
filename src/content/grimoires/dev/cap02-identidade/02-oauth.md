O **OAuth 2.0** (RFC 6749) é um *framework* de **autorização delegada**: permite que um aplicativo acesse recursos de um usuário em outro serviço **sem receber a senha desse usuário**, apenas um **token de acesso** com permissões limitadas.

### Por que o OAuth foi criado

- **Meados dos anos 2000: entregar a senha.** Para importar contatos ou publicar em outro serviço, muitos sites pediam a senha do usuário nesse serviço, ganhando acesso total à conta.
- **2006 e 2007: o OAuth 1.0.** Blaine Cook, que trabalhava no Twitter, e outros desenvolvedores buscaram um jeito de dar acesso sem a senha. Em 2007 saiu a primeira versão do OAuth, publicada como RFC 5849 em 2010.
- **2012: o OAuth 2.0.** A RFC 6749 definiu o OAuth 2.0, e a RFC 6750, o token portador (*bearer*).
- **2015: o PKCE.** A RFC 7636 protegeu o fluxo de código em aplicativos que não guardam segredo, como os de celular.

Exemplo cotidiano: um aplicativo de agenda pede acesso ao seu calendário em outro serviço. Você entra no serviço do calendário, autoriza o escopo "ler eventos" e o aplicativo recebe um token que só serve para isso.

> **Ponto de prova:** OAuth 2.0 trata de **autorização**, não de autenticação. Saber "quem é o usuário" é papel do OpenID Connect, construído por cima do OAuth.

### Papéis

| Papel | Quem é | No exemplo |
|---|---|---|
| **Proprietário do recurso** (*resource owner*) | Quem pode conceder acesso, normalmente o usuário. | Você. |
| **Cliente** (*client*) | O aplicativo que quer acessar. | O aplicativo de agenda. |
| **Servidor de autorização** | Autentica o proprietário e emite tokens. | O login do serviço de calendário. |
| **Servidor de recursos** | A API que guarda os dados e aceita tokens. | A API do calendário. |

### Tokens e escopos

- **Token de acesso** (*access token*): credencial de curta duração enviada à API, geralmente no cabeçalho `Authorization: Bearer <token>` (RFC 6750). "Portador" (*bearer*) significa que quem tiver o token pode usá-lo, por isso ele só deve trafegar com TLS.
- **Token de atualização** (*refresh token*): de duração maior, entregue ao cliente para obter novos tokens de acesso sem incomodar o usuário. Nunca é enviado à API de recursos.
- **Escopo** (*scope*): a extensão do acesso concedido, como `processos:leitura`. Aplica o menor privilégio.

### Fluxos de concessão (*grant types*)

| Fluxo | Quando usar | Situação atual |
|---|---|---|
| **Código de autorização** (*authorization code*) | Aplicativos com usuário: web, celular, SPA. O navegador é redirecionado ao servidor de autorização, que devolve um código; o cliente troca o código por tokens. | Recomendado, **com PKCE**. |
| **PKCE** (RFC 7636) | Extensão do fluxo de código: o cliente cria um segredo aleatório (*code verifier*) e envia só o resumo dele (*code challenge*); na troca do código, prova que conhece o segredo. | Obrigatório para clientes públicos (celular, SPA) e recomendado para todos. |
| **Credenciais do cliente** (*client credentials*) | Comunicação entre sistemas, **sem usuário**: um serviço chama outro em nome próprio. | Recomendado para esse caso. |
| **Atualização** (*refresh token*) | Renovar o token de acesso. | Em uso. |
| Implícito (*implicit*) | Entregava o token direto na URL do navegador. | **Desaconselhado** (expõe o token). |
| Senha do proprietário (*password*) | O cliente recebia a senha do usuário. | **Desaconselhado** (contraria a ideia do OAuth). |

As boas práticas atuais de segurança do OAuth (consolidadas no OAuth 2.1, em elaboração na IETF) eliminam os fluxos implícito e de senha e exigem PKCE.

### Fluxo de código de autorização com PKCE, passo a passo

1. O cliente gera o *code verifier* e calcula o *code challenge* (SHA-256 do verifier).
2. Redireciona o usuário ao servidor de autorização com `client_id`, `redirect_uri`, `scope`, `state` e `code_challenge`.
3. O usuário se autentica e consente.
4. O servidor redireciona de volta com um **código de autorização** de uso único.
5. O cliente troca o código, junto com o *code verifier*, por um token de acesso (e talvez um de atualização).
6. O cliente chama a API com o token.

O parâmetro `state` protege contra falsificação de requisição entre sites (CSRF); o PKCE impede que um código interceptado seja trocado por quem não tem o *verifier*.
