### Controle de acesso: os três "A"

1. **Autenticação**: provar quem é (senha, certificado, biometria, MFA).
2. **Autorização**: decidir o que pode fazer.
3. **Auditoria** (*accounting*): registrar o que foi feito, para rastrear e responsabilizar.

### Princípios

- **Menor privilégio**: cada usuário ou sistema recebe só as permissões necessárias à sua função, pelo tempo necessário.
- **Necessidade de conhecer** (*need to know*): mesmo com nível de acesso adequado, só se acessa o que a tarefa exige.
- **Segregação de funções**: tarefas críticas são divididas para que uma pessoa sozinha não complete uma fraude (quem cadastra o pagamento não é quem o aprova).
- **Negação por padrão**: o que não foi explicitamente permitido é proibido.

### Modelos de controle de acesso

| Modelo | Quem decide | Exemplo |
|---|---|---|
| **DAC** (discricionário) | O **dono** do recurso concede acesso a quem quiser. | Compartilhar uma pasta com colegas. |
| **MAC** (obrigatório) | O **sistema**, por rótulos de classificação e credenciamento; o usuário não altera. | Ambientes militares: só quem tem credencial "secreta" lê documento "secreto". |
| **RBAC** (baseado em papéis) | Permissões atribuídas a **papéis**; usuários recebem papéis. | Papel "Auditor" pode ler processos; papel "Protocolo" pode cadastrá-los. |
| **ABAC** (baseado em atributos) | Políticas que combinam **atributos** do usuário, do recurso e do contexto. | Permitir acesso se setor = auditoria, documento = não sigiloso e horário comercial. |

### Gestão de identidades e acessos (IAM)

O IAM cobre o **ciclo de vida** da identidade:

1. **Provisionamento**: criar a conta com os papéis certos na admissão.
2. **Revisão periódica**: confirmar que os acessos ainda fazem sentido (recertificação).
3. **Mudança de função**: ajustar papéis, retirando os antigos (evita o "acúmulo de privilégios").
4. **Desprovisionamento**: revogar tudo no desligamento, imediatamente.

Contas privilegiadas (administradores) recebem controle reforçado: **PAM** (gestão de acessos privilegiados), MFA obrigatório, sessões gravadas, credenciais temporárias.

### Zero Trust

O modelo **Zero Trust** (confiança zero), descrito no **NIST SP 800-207** (2020), parte de uma premissa: **nenhuma confiança implícita** é dada a usuários, dispositivos ou fluxos só por estarem "dentro" da rede. Resume-se em "nunca confie, sempre verifique".

| Modelo de perímetro (castelo e fosso) | Zero Trust |
|---|---|
| Quem está dentro da rede é confiável. | A localização na rede não concede confiança. |
| Defesa concentrada na borda. | Cada acesso a cada recurso é autenticado e autorizado. |
| Acesso amplo após entrar na VPN. | Acesso por sessão, com menor privilégio. |
| Movimentação lateral fácil para o invasor. | Microssegmentação limita a movimentação. |

Componentes lógicos do NIST SP 800-207:

- **Motor de política** (*Policy Engine*, PE): decide se concede o acesso, com base em políticas e sinais (identidade, estado do dispositivo, risco).
- **Administrador de política** (*Policy Administrator*, PA): executa a decisão, abrindo ou fechando a sessão.
- **Ponto de aplicação de política** (*Policy Enforcement Point*, PEP): fica no caminho entre o usuário e o recurso, aplicando a decisão.

Zero Trust não é um produto: é uma estratégia que combina identidade forte, avaliação contínua do dispositivo e do contexto, menor privilégio e monitoramento.
