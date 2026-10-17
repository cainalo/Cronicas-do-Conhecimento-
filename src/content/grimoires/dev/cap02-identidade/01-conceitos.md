O edital agrupa "autenticação, identidade e autorização: OAuth 2.0, OpenID Connect (OIDC) 1.0; tokens e claims; JSON Web Token (JWT)". Antes dos protocolos, é preciso separar três ideias que as questões gostam de misturar.

| Conceito | Pergunta que responde | Exemplo |
|---|---|---|
| **Identificação** | Quem você diz ser? | Informar o CPF ou o e-mail. |
| **Autenticação** | Você é mesmo quem diz ser? | Senha, certificado digital, código do aplicativo autenticador. |
| **Autorização** | O que você pode fazer? | Permissão para ler, mas não alterar, um processo. |

A autenticação sempre vem antes da autorização: só faz sentido decidir o que alguém pode fazer depois de saber quem é.

### Fatores de autenticação

- **Algo que você sabe**: senha, PIN.
- **Algo que você tem**: celular com aplicativo autenticador, token físico, cartão com certificado.
- **Algo que você é**: biometria.

**Autenticação multifator** (MFA) exige fatores de **categorias diferentes**. Senha mais pergunta secreta são dois fatores da mesma categoria (ambos "algo que você sabe") e não constituem MFA.

### Sessões e tokens

Depois de autenticar, o sistema precisa reconhecer as próximas requisições sem pedir a senha de novo:

| Modelo | Como funciona | Observações |
|---|---|---|
| Sessão no servidor | O servidor guarda a sessão e entrega ao navegador um identificador em cookie. | Fácil de revogar (apaga-se a sessão); exige armazenamento compartilhado entre servidores. |
| Token autocontido | O servidor entrega um token assinado que carrega as informações (por exemplo, um JWT). | Não exige consulta a cada requisição, combina com APIs sem estado; revogar antes de expirar é mais difícil. |

### Claims

**Claim** (declaração, alegação) é uma informação afirmada sobre o sujeito ou sobre o próprio token: identificador do usuário, emissor, validade, perfis. Tokens carregam claims; quem os recebe decide se confia no emissor.

### Gestão de identidades (IAM) e SSO

Em organizações, um **provedor de identidade** (IdP) centraliza contas e autenticação. Os sistemas confiam nele em vez de manter senhas próprias. Isso permite o **login único** (*single sign-on*, SSO): o usuário se autentica uma vez e acessa vários sistemas. Os protocolos mais usados para isso na web são o **OpenID Connect** e, em ambientes corporativos mais antigos, o **SAML**. No governo federal, o **gov.br** é um exemplo de provedor de identidade que oferece OpenID Connect.
