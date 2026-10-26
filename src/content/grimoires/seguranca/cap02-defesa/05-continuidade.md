### Cópias de segurança (backup)

| Tipo | Copia | Restauração |
|---|---|---|
| **Completo** (*full*) | Todos os dados | Só o último completo |
| **Incremental** | O que mudou desde o **último backup de qualquer tipo** | Último completo **mais todos** os incrementais seguintes, em ordem |
| **Diferencial** | O que mudou desde o **último backup completo** | Último completo **mais o último** diferencial |

Consequências: o incremental é o mais rápido e menor de fazer, mas a restauração é mais trabalhosa; o diferencial cresce a cada dia até o próximo completo, mas restaura com só dois conjuntos.

A **regra 3-2-1** é uma boa prática consagrada: **3** cópias dos dados, em **2** tipos de mídia diferentes, sendo **1** fora do local (*offsite*). Contra ransomware, acrescenta-se uma cópia **imutável ou desconectada**. Backup que nunca foi restaurado em teste não é garantia.

### Continuidade de negócios e recuperação de desastres

| Conceito | Significado |
|---|---|
| **BIA** (análise de impacto nos negócios) | Identifica processos críticos, impactos da parada e prazos toleráveis; é a base dos planos. |
| **PCN** (plano de continuidade de negócios) | Como a organização continua operando durante uma crise (pessoas, processos, comunicação). |
| **PRD** (plano de recuperação de desastres) | Como restaurar a TI após o desastre. |
| **RTO** | Tempo máximo para o serviço voltar. |
| **RPO** | Perda máxima de dados tolerável, medida em tempo; orienta a frequência de backup. |

Sítios de contingência:

- **Quente** (*hot site*): pronto para assumir em minutos ou horas, com dados replicados. Mais caro.
- **Morno** (*warm site*): infraestrutura parcial; leva horas ou dias.
- **Frio** (*cold site*): só espaço e energia; leva dias ou semanas. Mais barato.

A norma de referência para gestão de continuidade é a **ISO 22301**.

### Pegadinhas do capítulo

1. "O IDS bloqueia automaticamente os ataques." Falso. Quem bloqueia é o IPS; o IDS detecta e alerta.
2. "Worm precisa de um arquivo hospedeiro." Falso. Isso é o vírus; o worm se propaga sozinho.
3. "No backup incremental, restaura-se o último completo e o último incremental." Falso. São necessários todos os incrementais desde o completo.
4. "Zero Trust confia em quem está conectado à VPN corporativa." Falso. A localização na rede não concede confiança.
5. "No RBAC, o dono do arquivo decide quem acessa." Falso. Isso é DAC; no RBAC, as permissões vêm dos papéis.
6. "Aceitar um risco é ignorá-lo." Falso. É decisão consciente e registrada sobre o risco residual.
7. "No OWASP Top 10:2025, falhas criptográficas continuam em segundo lugar." Falso. Caíram para A04; A02 é configuração incorreta.
8. "SAST testa a aplicação em execução." Falso. SAST analisa o código; DAST testa a aplicação rodando.
