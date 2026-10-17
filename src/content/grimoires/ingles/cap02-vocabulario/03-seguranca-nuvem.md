Segurança da informação e computação em nuvem são temas fortes no edital de TI, e os textos em inglês sobre eles têm vocabulário próprio. Esta seção reúne os termos mais frequentes e mostra como lê-los em trechos curtos e autorais, com o olhar de quem trabalha em um Tribunal de Contas: proteção de dados, trilhas de auditoria, continuidade do serviço.

### Segurança: vocabulário básico

| Termo | Glosa |
|---|---|
| *threat* | ameaça (algo que pode causar dano) |
| *vulnerability* | vulnerabilidade (fraqueza explorável) |
| *exploit* | código ou técnica que explora uma vulnerabilidade; como verbo, explorar |
| *breach* / *data breach* | violação, vazamento de dados |
| *attack surface* | superfície de ataque |
| *patch* | correção aplicada ao software; *to patch*, corrigir |
| *update* / *upgrade* | atualização / atualização para versão superior |
| *malware*, *ransomware* | software malicioso; software que sequestra dados mediante resgate |
| *phishing* | golpe para obter credenciais por mensagens falsas |
| *credential* | credencial (usuário e senha, chave, token) |
| *multi-factor authentication* (MFA) | autenticação multifator |
| *least privilege* | menor privilégio |
| *encryption at rest* / *in transit* | criptografia em repouso / em trânsito |
| *hash* | resumo criptográfico de mão única |
| *key rotation* | troca periódica de chaves |
| *audit trail* / *audit log* | trilha de auditoria / registro de auditoria |
| *compliance* | conformidade com normas e regras |
| *incident response* | resposta a incidentes |
| *disclosure* | divulgação (*responsible disclosure*: divulgação responsável de falhas) |

Note a diferença conceitual: *threat* é a ameaça, *vulnerability* é a fraqueza, e *risk* combina a probabilidade de a ameaça explorar a fraqueza com o impacto.

Trecho: *"A critical vulnerability was found in the file upload module. Although no breach has been detected so far, administrators must apply the patch immediately. As a temporary workaround, uploads can be disabled."*

Glosa: foi encontrada uma vulnerabilidade **crítica** no módulo de envio de arquivos; **embora** nenhuma violação tenha sido detectada **até agora** (*so far*), os administradores **devem** (*must*, obrigação) aplicar a correção **imediatamente**; como **solução de contorno temporária** (*workaround*), os envios **podem** ser desativados.

### Nuvem: vocabulário básico

| Termo | Glosa |
|---|---|
| *cloud provider* | provedor de nuvem |
| *on-premises* (*on-prem*) | infraestrutura própria, no local da organização |
| *region* / *availability zone* | região geográfica / zona de disponibilidade isolada dentro da região |
| *workload* | carga de trabalho (aplicação ou processo executado) |
| *tenant* / *multi-tenant* | inquilino (cliente) / vários clientes compartilhando a infraestrutura |
| *scale up* / *scale out* | aumentar a capacidade de uma máquina / acrescentar mais máquinas |
| *load balancer* | balanceador de carga |
| *uptime* / *downtime* | tempo em funcionamento / tempo fora do ar |
| *SLA* | *service level agreement*, acordo de nível de serviço |
| *failover* | transferência automática para um recurso reserva quando o principal falha |
| *backup* / *restore* | cópia de segurança / restauração |
| *rollback* | reverter para a versão anterior |
| *deploy* / *deployment* | implantar / implantação |
| *provisioning* | provisionamento (alocar recursos) |
| *serverless* | modelo em que o cliente não gerencia servidores |
| *pay-as-you-go* | pagamento conforme o uso |
| *vendor lock-in* | dependência excessiva de um fornecedor |

Trecho: *"The application runs in two availability zones. If one zone fails, traffic is automatically redirected to the other, so users experience little or no downtime. However, this setup does not protect against accidental deletion; therefore, daily backups are still required."*

Glosa: a aplicação roda em duas zonas de disponibilidade; se uma falhar, o tráfego é **redirecionado automaticamente** para a outra, de modo que os usuários têm **pouca ou nenhuma** indisponibilidade; **contudo**, essa configuração **não** protege contra exclusão acidental e, **portanto**, cópias de segurança diárias **continuam** necessárias.

A leitura correta exige separar duas ideias: redundância entre zonas trata de **disponibilidade**; *backup* trata de **recuperação de dados**. Uma alternativa que diga "as zonas tornam o backup desnecessário" contraria o texto.

### Expressões que mudam o sentido

| Expressão | Sentido |
|---|---|
| *so far* / *to date* | até agora |
| *not yet* | ainda não |
| *no longer* | não mais |
| *still* | ainda (continuidade) |
| *already* | já |
| *by default* | por padrão |
| *on demand* | sob demanda |
| *out of the box* | pronto para uso, sem configuração adicional |
| *in place* | no local, sem mover (*in-place upgrade*) |
| *up to date* / *out of date* | atualizado / desatualizado |
| *end-to-end* | de ponta a ponta |

### Pegadinhas

1. "*Workaround* significa a correção definitiva de um defeito." Falso. É uma solução de contorno, temporária.
2. "*On-premises* refere-se a recursos hospedados no provedor de nuvem." Falso. Refere-se à infraestrutura própria da organização.
3. "*Scale out* significa acrescentar mais instâncias ou máquinas." Verdadeiro. *Scale up* aumenta a capacidade de uma única máquina.
4. "*No breach has been detected so far* afirma que nunca haverá violação." Falso. Afirma apenas que nenhuma foi detectada até agora.
5. "*Least privilege* recomenda conceder apenas as permissões necessárias à tarefa." Verdadeiro. É o princípio do menor privilégio.
