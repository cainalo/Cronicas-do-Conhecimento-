### Firewalls

| Tipo | Como decide | Observação |
|---|---|---|
| Filtro de pacotes (sem estado) | Regras por endereço, porta e protocolo, pacote a pacote | Simples e rápido, mas não entende conexões |
| **Com estado** (*stateful*) | Acompanha as conexões; libera automaticamente as respostas de conexões iniciadas de dentro | O padrão em firewalls de rede |
| De aplicação / nova geração (NGFW) | Inspeciona o conteúdo e identifica aplicações, usuários e ameaças | Pode incluir IPS |
| **WAF** (firewall de aplicação web) | Analisa requisições HTTP e bloqueia ataques como injeção de SQL e XSS | Protege aplicações web específicas |

Uma **DMZ** (zona desmilitarizada) é uma sub-rede intermediária onde ficam os serviços expostos à internet (portal, e-mail), separada da rede interna por firewall. Se um servidor da DMZ for comprometido, o atacante ainda não está na rede interna.

### VPN

Uma **VPN** cria um túnel cifrado sobre uma rede insegura.

- **Site a site**: liga duas redes (por exemplo, a sede e um escritório regional).
- **Acesso remoto**: liga um usuário à rede da organização.

Tecnologias: **IPsec** (camada de rede; modos túnel e transporte; protocolos AH, que autentica, e ESP, que cifra e autentica), **VPN TLS/SSL** e **WireGuard** (moderna e enxuta).

### Proxies

| Tipo | Fica na frente de | Para quê |
|---|---|---|
| **Proxy** (de encaminhamento) | Os **clientes** | Controlar e registrar o acesso dos usuários à internet, fazer cache, filtrar conteúdo |
| **Proxy reverso** | Os **servidores** | Esconder os servidores internos, terminar TLS, fazer cache, balancear carga, servir de WAF |

### Balanceamento de carga

O balanceador distribui as requisições entre vários servidores, aumentando a capacidade e a disponibilidade.

- **Algoritmos**: *round robin* (rodízio), menos conexões, por peso, por *hash* do endereço do cliente (afinidade).
- **Camada 4**: decide por IP e porta, sem olhar o conteúdo.
- **Camada 7**: decide pelo conteúdo HTTP (caminho, cabeçalhos, cookies).
- **Verificação de saúde** (*health check*): servidores que não respondem saem do rodízio automaticamente.

### Redes sem fio

As redes Wi-Fi seguem a família IEEE 802.11. Para segurança, usa-se **WPA2** ou, preferencialmente, **WPA3**. O WEP e o WPA original são considerados inseguros. Em ambientes corporativos, o modo *Enterprise* autentica cada usuário individualmente (802.1X com servidor RADIUS) em vez de uma senha compartilhada.

### Pegadinhas

1. "UDP garante a entrega ordenada." Falso. Quem garante é o TCP.
2. "Um /26 tem 64 hosts utilizáveis." Falso. São 64 endereços e 62 hosts.
3. "O IPv6 usa broadcast como o IPv4." Falso. Usa multicast.
4. "Um endereço IPv6 pode ter `::` duas vezes." Falso. Apenas uma vez.
5. "O registro MX traduz nome em IPv6." Falso. Isso é o AAAA; o MX indica servidores de e-mail.
6. "HTTP/3 funciona sobre TCP." Falso. Funciona sobre QUIC, que usa UDP.
7. "Proxy reverso protege os clientes da rede interna." Falso. Ele fica na frente dos servidores.
