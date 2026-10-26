O **OWASP Top 10** é o documento de conscientização mais conhecido sobre riscos em aplicações web, mantido pela fundação OWASP. O edital cita a edição **2025**, que reorganizou a lista de 2021.

### OWASP Top 10:2025

| Posição | Categoria | Em poucas palavras |
|---|---|---|
| A01 | **Broken Access Control** (controle de acesso quebrado) | Usuário acessa dados ou funções que não deveria. Inclui agora o SSRF. |
| A02 | **Security Misconfiguration** (configuração incorreta) | Padrões inseguros, serviços desnecessários, mensagens de erro detalhadas, permissões abertas. |
| A03 | **Software Supply Chain Failures** (falhas na cadeia de suprimentos) | Dependências, ferramentas de build e distribuição comprometidas ou vulneráveis. Nova, amplia a antiga "componentes vulneráveis e desatualizados". |
| A04 | **Cryptographic Failures** (falhas criptográficas) | Dados sensíveis sem cifragem, algoritmos fracos, chaves mal guardadas. |
| A05 | **Injection** (injeção) | Dados do usuário interpretados como comando: SQL, sistema operacional, LDAP, e também XSS. |
| A06 | **Insecure Design** (projeto inseguro) | Falhas de concepção, que nenhuma implementação perfeita corrige. |
| A07 | **Authentication Failures** (falhas de autenticação) | Senhas fracas aceitas, ausência de MFA, sessões mal gerenciadas. |
| A08 | **Software or Data Integrity Failures** (falhas de integridade) | Atualizações e dados aceitos sem verificar origem e integridade; desserialização insegura. |
| A09 | **Security Logging and Alerting Failures** (falhas de registro e alerta) | Ataques não registrados ou registrados sem que ninguém seja avisado. |
| A10 | **Mishandling of Exceptional Conditions** (tratamento inadequado de condições excepcionais) | Erros e situações inesperadas tratados de forma insegura (falhar "aberto", vazar detalhes). Nova. |

Mudanças em relação a 2021 que podem cair: **duas categorias novas** (A03 e A10), **SSRF incorporado ao A01**, **configuração incorreta subiu** para o 2º lugar e **falhas criptográficas desceram** do 2º para o 4º.

### Exemplos e defesas

**Controle de acesso quebrado (A01).** A URL `/api/processos/123` mostra o processo de outro órgão quando o usuário troca 123 por 124. Esse padrão é a **referência direta insegura a objeto** (IDOR, ou BOLA em APIs). Defesa: verificar a autorização **no servidor, a cada requisição**, para aquele objeto específico; negar por padrão.

**Injeção (A05).** Montar SQL concatenando texto do usuário:

```js
// Vulnerável: o valor vira parte do comando
db.query("SELECT * FROM usuarios WHERE login = '" + login + "'");

// Seguro: consulta parametrizada; o valor nunca é interpretado como SQL
db.query('SELECT * FROM usuarios WHERE login = $1', [login]);
```

Com `login = ' OR '1'='1`, a primeira versão devolve todos os usuários. A defesa principal é a **consulta parametrizada** (*prepared statement*); validação de entrada e menor privilégio no banco complementam. No **XSS**, o dado injetado é código JavaScript que roda no navegador da vítima; a defesa é **codificar a saída** conforme o contexto e usar política de segurança de conteúdo (CSP).

**Cadeia de suprimentos (A03).** Uma biblioteca popular é comprometida e passa a enviar dados a terceiros. Defesas: inventário de componentes (**SBOM**), fixação de versões, análise de dependências, verificação de assinaturas, revisão de atualizações.

### Codificação segura e DevSecOps

**DevSecOps** integra a segurança a todo o ciclo de desenvolvimento e entrega, em vez de deixá-la para o fim (*shift left*, "deslocar para a esquerda"). Ferramentas típicas no pipeline:

| Sigla | O que analisa | Quando |
|---|---|---|
| **SAST** | O **código-fonte**, sem executar | Desde o commit |
| **DAST** | A **aplicação em execução**, de fora, como um atacante | Em homologação |
| **SCA** | **Componentes e dependências** de terceiros com vulnerabilidades conhecidas | A cada build |
| Varredura de segredos | Senhas e chaves esquecidas no código | A cada commit |
| Varredura de IaC e imagens | Arquivos de infraestrutura e imagens de container | Antes da implantação |

### APIs, containers e nuvem

- **APIs**: autenticação e autorização em cada chamada, verificação por objeto (o BOLA lidera o OWASP API Security Top 10), limitação de taxa, validação de entrada e de esquema, não expor mais campos do que o necessário.
- **Containers**: imagens mínimas e de origem confiável, varredura de vulnerabilidades, não executar como *root*, segredos fora da imagem, sistema de arquivos somente leitura quando possível.
- **Nuvem**: lembrar a responsabilidade compartilhada (capítulo de Nuvem); a maior parte dos incidentes vem de **configurações incorretas** e permissões excessivas do cliente.
