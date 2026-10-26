### Códigos maliciosos (malware)

| Tipo | Característica que o define |
|---|---|
| **Vírus** | Insere-se em arquivos ou programas hospedeiros e depende da execução deles para se propagar. |
| **Worm** (verme) | Propaga-se **sozinho** pela rede, explorando vulnerabilidades, sem precisar de hospedeiro. |
| **Cavalo de Troia** (*trojan*) | Parece legítimo, mas executa ações maliciosas ocultas. |
| **Ransomware** | Cifra os dados (ou ameaça divulgá-los) e exige resgate. |
| **Spyware** | Coleta informações do usuário sem consentimento; *keyloggers* registram o que é digitado. |
| **Rootkit** | Esconde a presença do invasor e de outros malwares no sistema. |
| **Backdoor** | Abre acesso remoto escondido para o atacante voltar. |
| **Bot / botnet** | Máquina controlada remotamente; em conjunto, formam redes usadas, por exemplo, em ataques de negação de serviço distribuída (DDoS). |

Contra **ransomware**, a defesa decisiva é ter **cópias de segurança isoladas** (fora de linha ou imutáveis) e testadas, além de atualizações, menor privilégio e segmentação.

### Engenharia social e phishing

**Engenharia social** explora a confiança e a pressa das pessoas, não falhas técnicas.

- **Phishing**: mensagem falsa que induz a clicar, informar senha ou baixar anexo.
- **Spear phishing**: phishing **direcionado** a uma pessoa ou grupo, com informações personalizadas.
- **Whaling**: spear phishing contra altos dirigentes.
- **Smishing** e **vishing**: o mesmo golpe por SMS e por voz.
- **Pretexting**: o atacante cria uma história (técnico do suporte, fornecedor) para obter informações.

Defesas: conscientização contínua, MFA (uma senha roubada deixa de bastar), verificação por outro canal antes de atender pedidos incomuns e filtros de e-mail com SPF, DKIM e DMARC.

### Firewalls, antivírus, IDS e IPS

| Controle | Função |
|---|---|
| **Firewall** | Filtra o tráfego por regras (detalhado no capítulo de Redes). |
| **Antivírus / EDR** | Detecta malware no dispositivo; o EDR acrescenta monitoramento de comportamento e resposta. |
| **IDS** (sistema de detecção de intrusão) | **Detecta e alerta**; normalmente recebe uma cópia do tráfego e não bloqueia. |
| **IPS** (sistema de prevenção de intrusão) | Fica **no caminho** do tráfego (*inline*) e **bloqueia** o ataque detectado. |

Métodos de detecção:

- **Por assinatura**: compara com padrões de ataques conhecidos. Preciso para o conhecido, cego para o novo.
- **Por anomalia** (comportamento): aprende o normal e alerta sobre desvios. Detecta ataques novos, mas gera mais falsos positivos.

Um **falso positivo** é um alerta para algo legítimo; um **falso negativo** é um ataque que passou sem alerta (o mais perigoso). Um **SIEM** centraliza e correlaciona registros de várias fontes.

### Testes de invasão e análise de vulnerabilidades

| | Análise de vulnerabilidades | Teste de invasão (*pentest*) |
|---|---|---|
| Objetivo | Encontrar e listar falhas conhecidas, em amplitude | **Explorar** falhas para demonstrar o impacto real |
| Forma | Em geral automatizada (varredores) | Manual e criativa, com ferramentas |
| Resultado | Lista priorizada de vulnerabilidades | Prova de comprometimento e caminho do ataque |

Quanto à informação dada ao testador:

- **Caixa preta**: nenhum conhecimento prévio, como um atacante externo.
- **Caixa cinza**: conhecimento parcial (por exemplo, uma conta de usuário comum).
- **Caixa branca**: acesso a código, arquitetura e credenciais.

Todo teste de invasão exige **autorização formal** e escopo definido; sem isso, é ataque.
