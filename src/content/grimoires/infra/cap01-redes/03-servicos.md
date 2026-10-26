### DNS

O **DNS** traduz nomes (`portal.tce.go.gov.br`) em endereços IP. É um banco de dados **distribuído e hierárquico**: servidores raiz, depois os de domínio de topo (`.br`), depois os autoritativos de cada domínio.

| Registro | Função |
|---|---|
| **A** | Nome → endereço IPv4 |
| **AAAA** | Nome → endereço IPv6 |
| **CNAME** | Apelido que aponta para outro nome |
| **MX** | Servidores de e-mail do domínio (com prioridade) |
| **NS** | Servidores autoritativos do domínio |
| **PTR** | Resolução reversa: IP → nome |
| **TXT** | Texto livre; usado em SPF, DKIM, DMARC e verificações de domínio |
| **SOA** | Dados da zona (servidor primário, serial, tempos) |

Na consulta **recursiva**, o resolvedor faz todo o trabalho e devolve a resposta final ao cliente. Na **iterativa**, cada servidor indica o próximo a ser consultado. As respostas ficam em **cache** pelo tempo do **TTL**. O DNS usa a porta 53, em UDP nas consultas comuns e em TCP para respostas grandes e transferências de zona.

### DHCP

O **DHCP** entrega automaticamente endereço IP, máscara, gateway e servidores DNS. A concessão (*lease*) tem prazo e precisa ser renovada. O processo tem quatro mensagens, lembradas pela sigla **DORA**:

1. **Discover**: o cliente procura servidores (broadcast).
2. **Offer**: um servidor oferece um endereço.
3. **Request**: o cliente pede o endereço oferecido.
4. **Acknowledge**: o servidor confirma.

Usa UDP, porta 67 no servidor e 68 no cliente.

### HTTP/2, HTTP/3 e HTTPS

| Versão | Transporte | Novidades |
|---|---|---|
| HTTP/1.1 | TCP | Texto; conexões persistentes; uma requisição por vez em cada conexão |
| **HTTP/2** | TCP | Formato **binário**, **multiplexação** de várias requisições na mesma conexão, compressão de cabeçalhos (HPACK), prioridades |
| **HTTP/3** | **QUIC sobre UDP** | Elimina o bloqueio do TCP quando um pacote se perde (*head-of-line blocking*), TLS 1.3 integrado, conexão mais rápida e que sobrevive à troca de rede (Wi-Fi para 4G) |

**HTTPS** é HTTP protegido por TLS (veja o Códice das Sete Chaves).

### E-mail, FTP e SSH

- **SMTP** envia mensagens (porta 25 entre servidores; 587 para o cliente enviar, com STARTTLS). Para **ler**, os clientes usam **IMAP** (mantém as mensagens no servidor e sincroniza pastas) ou **POP3** (baixa as mensagens).
- **FTP** transfere arquivos com uma conexão de controle (21) e outra de dados; no modo **ativo**, o servidor abre a conexão de dados para o cliente; no **passivo**, o cliente abre as duas, o que funciona melhor atrás de firewalls. O FTP tradicional trafega senhas em claro; as alternativas seguras são o **SFTP** (sobre SSH) e o **FTPS** (FTP com TLS).
- **SSH** (porta 22) oferece acesso remoto cifrado ao terminal, autenticação por senha ou **par de chaves**, cópia segura de arquivos (SCP/SFTP) e túneis. Substituiu o Telnet, que não cifrava nada.
