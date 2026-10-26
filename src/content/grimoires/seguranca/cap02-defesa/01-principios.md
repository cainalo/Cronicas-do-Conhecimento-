O edital abre a disciplina com "princípios da segurança da informação: confidencialidade, integridade, disponibilidade, autenticidade e não repúdio", seguidos de gestão de riscos e classificação da informação.

### Os princípios

| Princípio | Pergunta | Exemplo de violação |
|---|---|---|
| **Confidencialidade** | Só quem pode, lê? | Vazamento de uma planilha de servidores com CPF. |
| **Integridade** | A informação está correta e completa? | Alteração indevida do valor de um empenho. |
| **Disponibilidade** | Está acessível quando preciso? | Sistema fora do ar por ataque de negação de serviço. |
| **Autenticidade** | A origem é quem diz ser? | E-mail falso se passando pela presidência. |
| **Não repúdio** | O autor pode negar a autoria? | Gestor nega ter enviado um documento sem assinatura digital. |

Os três primeiros formam a **tríade CID** (em inglês, CIA). O capítulo 1 mostrou quais mecanismos criptográficos atendem a cada um.

### Vocabulário de risco

| Termo | Significado |
|---|---|
| **Ativo** | Tudo que tem valor: dados, sistemas, pessoas, reputação. |
| **Vulnerabilidade** | Fraqueza que pode ser explorada (software desatualizado, senha fraca, porta aberta). |
| **Ameaça** | Causa potencial de um incidente (atacante, falha de energia, erro humano). |
| **Risco** | Possibilidade de uma ameaça explorar uma vulnerabilidade e causar impacto; avaliado por **probabilidade × impacto**. |
| **Incidente** | Evento que de fato compromete a segurança. |
| **Controle** | Medida que reduz o risco. |

Sem vulnerabilidade, a ameaça não tem por onde agir; sem ameaça, a vulnerabilidade não gera risco. Por isso o risco depende das duas e do impacto sobre o ativo.

### Tratamento de riscos

| Opção | O que é | Exemplo |
|---|---|---|
| **Mitigar** (reduzir) | Aplicar controles para diminuir probabilidade ou impacto. | Atualizar o sistema, ativar MFA. |
| **Transferir** (compartilhar) | Passar parte das consequências a terceiros. | Seguro cibernético, contrato com cláusula de responsabilidade. |
| **Evitar** | Eliminar a atividade que gera o risco. | Desativar um serviço desnecessário exposto à internet. |
| **Aceitar** (reter) | Assumir conscientemente o risco residual. | Risco baixo cujo controle custaria mais que o prejuízo. |

O risco que sobra após os controles é o **risco residual**; aceitá-lo é decisão da gestão, registrada formalmente.

### Gestão de vulnerabilidades e de incidentes

- **Vulnerabilidades**: inventário de ativos, varreduras periódicas, priorização (por exemplo, pela pontuação CVSS e pela exposição do ativo), correção e verificação. As falhas conhecidas publicamente recebem um identificador **CVE**.
- **Incidentes**: preparação, detecção e análise, contenção, erradicação, recuperação e lições aprendidas (ciclo descrito no NIST SP 800-61). Equipes dedicadas são chamadas de **CSIRT** ou ETIR (equipe de tratamento e resposta a incidentes).

### Classificação da informação

Classificar é atribuir um nível de sensibilidade para definir quem acessa e como a informação é protegida. Cada organização define seus níveis (por exemplo: pública, interna, restrita, confidencial).

No setor público brasileiro, a **Lei de Acesso à Informação** (Lei nº 12.527/2011) prevê a classificação de informações sigilosas em três graus, com prazos máximos de restrição:

| Grau | Prazo máximo |
|---|---|
| Reservada | 5 anos |
| Secreta | 15 anos |
| Ultrassecreta | 25 anos |

A regra na LAI é a **publicidade**; o sigilo é exceção. Dados pessoais seguem, além disso, a LGPD.
