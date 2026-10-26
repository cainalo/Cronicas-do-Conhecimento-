O **sistema de arquivos** organiza os dados no disco em arquivos e diretórios, guarda metadados (dono, datas, tamanho, permissões) e controla quem pode ler ou alterar cada item. Em provas, o assunto aparece em três frentes: os tipos de sistema de arquivos, a estrutura de diretórios do Linux e, principalmente, as **permissões**.

### Tipos de sistema de arquivos

| Sistema | Onde aparece | Observações |
|---|---|---|
| **NTFS** | Windows | Permissões por ACL, registro em diário (*journaling*), criptografia (EFS), cotas e compactação. Padrão nos discos de sistema do Windows. |
| **FAT32** | Pen drives, cartões, compatibilidade | Sem permissões; arquivo individual limitado a 4 GB. |
| **exFAT** | Mídias removíveis grandes | Sem o limite de 4 GB por arquivo do FAT32, sem permissões do NTFS. |
| **ReFS** | Windows Server | Voltado a grandes volumes e integridade de dados. |
| **ext4** | Linux | Padrão em muitas distribuições; usa *journaling*. |
| **XFS** | Linux (padrão no Red Hat Enterprise Linux) | Bom desempenho com arquivos grandes. |

*Journaling* significa registrar as alterações num diário antes de aplicá-las, o que permite recuperar a consistência após um desligamento abrupto.

### Estrutura de diretórios do Linux

No Linux tudo parte de uma única raiz `/`. Discos e partições são **montados** em diretórios (`mount`), em vez de receberem letras como `C:` no Windows.

| Diretório | Conteúdo |
|---|---|
| `/etc` | Arquivos de configuração do sistema e dos serviços. |
| `/home` | Diretórios pessoais dos usuários. `/root` é o do superusuário. |
| `/var` | Dados variáveis; `/var/log` guarda os logs. |
| `/bin`, `/sbin`, `/usr` | Programas e bibliotecas do sistema. |
| `/tmp` | Arquivos temporários, gravável por todos. |
| `/dev` | Dispositivos representados como arquivos (por exemplo, discos em `/dev/sda`). |
| `/proc` | Sistema de arquivos virtual com informações do núcleo e dos processos. |

Usuários ficam em `/etc/passwd`; os hashes de senha, em `/etc/shadow`, legível apenas pelo root. Para espaço em disco: `df -h` mostra o uso por sistema de arquivos montado; `du -sh diretorio` mostra o tamanho de um diretório.

**Links.** `ln origem destino` cria um *hard link* (outro nome para o mesmo inode, ou seja, para os mesmos dados; só vale dentro do mesmo sistema de arquivos). `ln -s origem destino` cria um **link simbólico**, um atalho que aponta para o caminho e fica "quebrado" se o original for apagado.

### Lendo a saída de `ls -l`

```
-rwxr-x---  1 maria auditoria  2048 out 10 09:15 relatorio.sh
drwxrwxrwt 12 root  root       4096 out 17 08:00 tmp
```

O primeiro caractere é o tipo: `-` arquivo comum, `d` diretório, `l` link simbólico. Depois vêm três trios de permissões: **dono** (u), **grupo** (g) e **outros** (o). Em seguida, o número de links, o dono, o grupo, o tamanho e a data.

| Letra | Em arquivo | Em diretório | Valor octal |
|---|---|---|---|
| `r` | Ler o conteúdo | Listar os nomes | 4 |
| `w` | Alterar o conteúdo | Criar, renomear e apagar itens dentro dele | 2 |
| `x` | Executar | Entrar (`cd`) e acessar itens | 1 |

Somando os valores de cada trio obtém-se a notação octal. No exemplo, `rwxr-x---` = (4+2+1)(4+0+1)(0+0+0) = **750**: o dono lê, grava e executa; o grupo lê e executa; os outros não têm acesso.

| Octal | Letras | Uso típico |
|---|---|---|
| 755 | `rwxr-xr-x` | Scripts e diretórios públicos para leitura |
| 644 | `rw-r--r--` | Arquivos comuns |
| 640 | `rw-r-----` | Arquivo legível pelo grupo, fechado para outros |
| 600 | `rw-------` | Chaves privadas e arquivos sigilosos |
| 700 | `rwx------` | Diretório privado do dono |

### Alterando permissões e donos

- `chmod 750 relatorio.sh`: define as permissões em octal.
- `chmod u+x script.sh`, `chmod g-w arquivo`, `chmod o= arquivo`: forma simbólica (acrescenta, retira ou zera para dono, grupo ou outros; `a` significa todos).
- `chmod -R 750 pasta/`: aplica recursivamente.
- `chown maria:auditoria arquivo`: muda dono e grupo. Em geral, só o root pode trocar o dono.
- `chgrp auditoria arquivo`: muda só o grupo.
- `umask`: máscara que retira permissões dos arquivos novos. Com `umask 022`, arquivos nascem 644 e diretórios 755.

**Bits especiais.** Um quarto dígito à esquerda ativa permissões especiais: **setuid** (4) faz o executável rodar com os privilégios do dono (o `passwd` usa isso para gravar em `/etc/shadow`); **setgid** (2) faz o programa rodar com o grupo do arquivo e, em diretório, faz os arquivos novos herdarem o grupo dele; **sticky bit** (1), em diretório, impede que um usuário apague arquivos de outros. É o `t` no final de `drwxrwxrwt` do `/tmp` (modo 1777).

### Permissões no Windows (NTFS)

O NTFS usa **listas de controle de acesso** (ACL): cada arquivo ou pasta tem entradas que concedem ou negam permissões a usuários e grupos. As permissões básicas são **Controle total**, **Modificar**, **Ler e executar**, **Listar conteúdo da pasta**, **Ler** e **Gravar**.

- **Herança**: por padrão, arquivos e subpastas herdam as permissões da pasta-mãe.
- **Negar**: uma negação explícita prevalece sobre uma permissão concedida no mesmo nível. Por isso a Microsoft recomenda usar *Negar* com moderação.
- **Compartilhamento + NTFS**: quem acessa pela rede está sujeito às permissões do compartilhamento **e** às do NTFS; vale a **mais restritiva** das duas.
- Linha de comando: `icacls` exibe e altera ACLs; no PowerShell, `Get-Acl` e `Set-Acl`.

**Exemplo no Tribunal.** A pasta de papéis de trabalho de uma auditoria deve ser editada pela equipe e lida pela coordenação. No Linux, o técnico cria o grupo `aud2026`, faz `chown -R lider:aud2026 /dados/aud2026` e `chmod -R 770` (outros sem acesso) e, como o Linux também aceita ACLs, concede leitura à coordenação com `setfacl -R -m g:coordenacao:rX /dados/aud2026`. No Windows, concede *Modificar* ao grupo da equipe e *Ler* ao grupo da coordenação, sem dar permissões individuais a cada pessoa.

### Pegadinhas

1. "A permissão 640 permite que o grupo grave no arquivo." Falso. 6 (rw) é do dono; 4 (r) do grupo, que só lê.
2. "Em diretório Linux, a permissão `x` permite entrar nele e acessar seus itens." Verdadeiro. Sem `x` não é possível usar `cd` no diretório.
3. "O sticky bit em `/tmp` impede que um usuário apague arquivos de outro usuário." Verdadeiro. Só o dono do arquivo, o dono do diretório ou o root podem apagá-lo.
4. "No acesso por compartilhamento de rede, vale a permissão mais permissiva entre a do compartilhamento e a do NTFS." Falso. Vale a mais restritiva.
5. "FAT32 suporta permissões por usuário como o NTFS." Falso. FAT32 não tem ACLs.
