### IPv4

Um endereço IPv4 tem **32 bits**, escritos em quatro octetos decimais: `192.168.10.37`. Ele se divide em parte de **rede** e parte de **host**, separadas pela **máscara**.

Na notação **CIDR**, o número após a barra indica quantos bits pertencem à rede: `/24` equivale à máscara `255.255.255.0`.

**Quantos hosts cabem numa sub-rede?** Com *h* bits de host, há 2^h endereços, dos quais dois são reservados (o endereço da rede e o de broadcast): **2^h − 2 hosts utilizáveis**.

| Prefixo | Máscara | Endereços | Hosts utilizáveis |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /30 | 255.255.255.252 | 4 | 2 |

**Exemplo resolvido:** a qual sub-rede pertence `192.168.10.77/26`?

1. Um /26 tem blocos de 64 endereços: 0, 64, 128, 192.
2. 77 está no bloco que começa em 64.
3. Rede: `192.168.10.64`; broadcast: `192.168.10.127`; hosts de `.65` a `.126`.

### Endereços especiais

| Faixa | Uso |
|---|---|
| `10.0.0.0/8`, `172.16.0.0/12` (de 172.16 a 172.31), `192.168.0.0/16` | **Privados** (RFC 1918): não são roteados na internet |
| `127.0.0.0/8` (ex.: 127.0.0.1) | *Loopback*: a própria máquina |
| `169.254.0.0/16` | *Link-local*: atribuído quando o DHCP falha |
| `255.255.255.255` | Broadcast limitado |

Como os endereços públicos IPv4 se esgotaram, redes internas usam endereços privados e saem para a internet por **NAT** (tradução de endereços), que troca o endereço privado pelo público do roteador.

### IPv6

O IPv6 tem **128 bits**, escritos em oito grupos de quatro dígitos hexadecimais separados por dois-pontos.

```
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8::ff00:42:8329          (forma abreviada)
```

Regras de abreviação:

- Zeros à esquerda de cada grupo podem ser omitidos (`0db8` vira `db8`).
- **Uma única** sequência de grupos só de zeros pode ser trocada por `::`. Usar `::` duas vezes deixaria o endereço ambíguo.

Diferenças em relação ao IPv4:

| Aspecto | IPv4 | IPv6 |
|---|---|---|
| Tamanho | 32 bits | 128 bits |
| Broadcast | Existe | **Não existe**; usa multicast |
| Configuração automática | DHCP | SLAAC (autoconfiguração) ou DHCPv6 |
| Loopback | 127.0.0.1 | `::1` |
| Link-local | 169.254.0.0/16 | `fe80::/10` |
| NAT | Muito usado | Desnecessário em princípio (há endereços de sobra) |
| Cabeçalho | Variável, com checksum | Fixo de 40 bytes, sem checksum |
