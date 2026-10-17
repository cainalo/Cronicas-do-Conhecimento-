A definição mais citada de computação em nuvem é a do **NIST** (publicação SP 800-145, de 2011): um modelo que permite acesso conveniente e sob demanda, pela rede, a um conjunto compartilhado de recursos configuráveis, que podem ser rapidamente provisionados e liberados com mínimo esforço de gestão.

### As cinco características essenciais (NIST)

| Característica | Significado |
|---|---|
| **Autoatendimento sob demanda** | O cliente provisiona recursos sozinho, sem interação humana com o provedor. |
| **Amplo acesso pela rede** | Recursos acessíveis por mecanismos padrão, de vários tipos de dispositivo. |
| **Agrupamento de recursos** (*resource pooling*) | Recursos compartilhados entre vários clientes (multilocação), alocados dinamicamente. |
| **Elasticidade rápida** | Recursos aumentam e diminuem conforme a demanda, às vezes automaticamente. |
| **Serviço medido** | O uso é monitorado e cobrado ou controlado (pague pelo que usar). |

### Modelos de serviço

| Modelo | O provedor entrega | O cliente gerencia | Exemplos |
|---|---|---|---|
| **IaaS** (infraestrutura) | Máquinas virtuais, rede, armazenamento | Sistema operacional, *middleware*, aplicação, dados | Máquinas virtuais em nuvem, armazenamento de blocos |
| **PaaS** (plataforma) | Infraestrutura, sistema operacional e ambiente de execução | Aplicação e dados | Plataformas de publicação de aplicações, bancos de dados gerenciados |
| **SaaS** (software) | A aplicação completa | Configuração e dados de uso | E-mail na web, suítes de escritório online |

Quanto mais "acima" na pilha (de IaaS para SaaS), menos o cliente administra e menos controle ele tem.

### Responsabilidade compartilhada

Em qualquer modelo, a segurança é dividida. O provedor sempre responde pela infraestrutura física; o cliente sempre responde por **seus dados, suas contas e as permissões que concede**. Em IaaS, o cliente ainda aplica atualizações no sistema operacional e configura firewalls das máquinas; em SaaS, quase tudo fica com o provedor, mas não o controle de acesso dos usuários.

### Modelos de implantação

| Modelo | Quem usa |
|---|---|
| **Pública** | Qualquer cliente, na infraestrutura do provedor. |
| **Privada** | Uma única organização (pode estar no próprio datacenter ou num provedor). |
| **Comunitária** | Um grupo de organizações com interesses comuns (por exemplo, órgãos públicos). |
| **Híbrida** | Combinação de duas ou mais, integradas, com portabilidade de dados e aplicações. |
