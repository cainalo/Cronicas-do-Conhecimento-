Uma rede funciona em **camadas**: cada camada resolve um problema e usa os serviços da camada de baixo. O edital cobra a **arquitetura TCP/IP**, mas as questões costumam compará-la ao modelo OSI.

### Modelos de camadas

| OSI (7 camadas) | TCP/IP (4 camadas) | Exemplos |
|---|---|---|
| 7 Aplicação, 6 Apresentação, 5 Sessão | **Aplicação** | HTTP, DNS, SMTP, SSH, FTP |
| 4 Transporte | **Transporte** | TCP, UDP |
| 3 Rede | **Internet** | IP, ICMP |
| 2 Enlace, 1 Física | **Acesso à rede** | Ethernet, Wi-Fi (802.11) |

O OSI é um modelo de referência didático; o TCP/IP é a pilha que a internet efetivamente usa.

Cada camada acrescenta seu cabeçalho aos dados recebidos de cima (**encapsulamento**). Os nomes das unidades: **segmento** (TCP) ou **datagrama** (UDP) no transporte, **pacote** na camada de rede e **quadro** no enlace.

### TCP e UDP

| Característica | TCP | UDP |
|---|---|---|
| Conexão | Orientado a conexão (abre e fecha) | Sem conexão |
| Confiabilidade | Confirmações, retransmissão, ordem garantida | Nenhuma garantia |
| Controle de fluxo e de congestionamento | Sim | Não |
| Sobrecarga | Maior | Menor |
| Usos | Web (HTTP/1.1 e HTTP/2), e-mail, SSH, transferência de arquivos | DNS (consultas comuns), DHCP, voz e vídeo em tempo real, QUIC (HTTP/3) |

A conexão TCP começa pelo **aperto de mão em três vias** (*three-way handshake*):

```
Cliente  ── SYN ──────────►  Servidor
Cliente  ◄──── SYN-ACK ────  Servidor
Cliente  ── ACK ──────────►  Servidor
```

### Portas

A camada de transporte usa **portas** para entregar os dados ao processo certo. Portas de 0 a 1023 são as "bem conhecidas".

| Serviço | Porta | Transporte |
|---|---|---|
| FTP | 21 (controle) e 20 (dados, modo ativo) | TCP |
| SSH (e SFTP) | 22 | TCP |
| SMTP | 25 (entre servidores); 587 (envio por clientes) | TCP |
| DNS | 53 | UDP e TCP |
| DHCP | 67 (servidor) e 68 (cliente) | UDP |
| HTTP | 80 | TCP |
| HTTPS | 443 | TCP (e UDP para HTTP/3) |
| IMAP / POP3 | 143 / 110 (993 / 995 com TLS) | TCP |
| LDAP / LDAPS | 389 / 636 | TCP |
| RDP | 3389 | TCP |

### ICMP

O **ICMP** carrega mensagens de controle e erro da camada de rede. O `ping` usa ICMP *echo request* e *echo reply*; o `traceroute` (ou `tracert`, no Windows) usa o campo TTL para descobrir o caminho até o destino.
