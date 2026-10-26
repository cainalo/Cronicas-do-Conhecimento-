Um **serviço de diretório** é um banco de dados hierárquico, otimizado para leitura, que guarda informações sobre usuários, grupos, computadores e outros recursos da rede, e responde a perguntas como "quem é este usuário, qual sua senha e a que grupos pertence". O edital cita o **Active Directory** (da Microsoft) e o **LDAP** (o protocolo padrão de acesso a diretórios). Na mesma linha, cobra **virtualização e containers**, temas que dividem a máquina física entre vários ambientes isolados.

### Active Directory: a estrutura lógica

O serviço central é o **AD DS** (*Active Directory Domain Services*).

| Elemento | O que é |
|---|---|
| **Domínio** | Unidade administrativa com um banco de dados de diretório próprio e políticas comuns. Tem nome DNS, como `tribunal.local`. |
| **Controlador de domínio (DC)** | Servidor que hospeda uma cópia do banco do AD e autentica os usuários. Em domínios com vários DCs, as alterações são replicadas entre eles. |
| **Árvore** | Conjunto de domínios que compartilham um **espaço de nomes DNS contíguo**: `tribunal.local` e `auditoria.tribunal.local`. |
| **Floresta** | Conjunto de uma ou mais árvores que compartilham o mesmo **esquema** e o mesmo **catálogo global**. É o limite de segurança do AD. O primeiro domínio criado é o domínio raiz da floresta. |
| **Unidade organizacional (OU)** | Contêiner dentro de um domínio para organizar objetos (por setor, por exemplo), **delegar administração** e **vincular GPOs**. |
| **Grupo** | Reúne contas para receber permissões. Grupos de **segurança** recebem permissões; grupos de **distribuição** servem a listas de e-mail. |
| **Relação de confiança** | Permite que usuários de um domínio acessem recursos de outro. Dentro da floresta, as confianças entre domínios são automáticas, bidirecionais e transitivas. |
| **Catálogo global** | Índice parcial de todos os objetos da floresta, usado em buscas e no logon. |
| **Esquema** | Definição das classes de objetos e dos atributos que o diretório aceita. |

Distinção cobrada: **OU** organiza e recebe GPO e delegação; **grupo** recebe permissões em recursos. Não se concede permissão em uma pasta a uma OU.

O AD depende do **DNS**: os clientes localizam os controladores de domínio por registros SRV.

### GPO: as políticas de grupo

Uma **GPO** (*Group Policy Object*) é um conjunto de configurações aplicado a usuários e computadores: política de senha, mapeamento de unidades, bloqueio de USB, papel de parede, instalação de software. As GPOs são aplicadas na ordem **LSDOU**: **L**ocal, **S**ite, **D**omínio e **OU** (da mais externa para a mais interna). Em caso de conflito, prevalece a aplicada por último, isto é, a mais próxima do objeto, salvo uso de opções como "Imposto" (*Enforced*) ou "Bloquear herança".

Comandos úteis no cliente: `gpupdate /force` reaplica as políticas; `gpresult /r` mostra quais GPOs foram aplicadas.

### Autenticação: Kerberos

No domínio, a autenticação padrão é o **Kerberos** (porta 88). O controlador de domínio atua como **KDC** (*Key Distribution Center*):

1. No logon, o usuário prova sua identidade ao KDC e recebe um **TGT** (*Ticket Granting Ticket*).
2. Para acessar um serviço (um servidor de arquivos, por exemplo), apresenta o TGT e recebe um **ticket de serviço**.
3. Apresenta o ticket ao servidor, sem enviar a senha pela rede.

Como os tickets têm validade, o Kerberos exige **relógios sincronizados**; por padrão, o AD tolera diferença de até 5 minutos. O **NTLM** é o protocolo legado, ainda aceito para compatibilidade.

### LDAP

O **LDAP** (*Lightweight Directory Access Protocol*) é um protocolo aberto para consultar e alterar diretórios. O AD o implementa, assim como o OpenLDAP e outros servidores. Aplicações (sistemas web, VPN, Wi-Fi corporativo) usam LDAP para autenticar usuários do diretório.

**Portas.** LDAP usa **389** (TCP). **LDAPS**, LDAP sobre TLS, usa **636**. Também é possível iniciar TLS na própria porta 389 com a operação **StartTLS**. No AD, o catálogo global responde em 3268 (e 3269 com TLS).

**Nome distinto (DN).** Cada entrada é identificada pelo caminho completo na árvore, do mais específico ao mais geral:

```
CN=Maria Souza,OU=Auditoria,DC=tribunal,DC=local
```

| Sigla | Significado |
|---|---|
| `CN` | *Common name*, nome comum (usuário, grupo, computador) |
| `OU` | Unidade organizacional |
| `DC` | Componente de domínio (cada parte do nome DNS) |

**Operações.** *Bind* (autenticar a sessão), *search* (buscar com base, escopo e filtro), *add*, *modify*, *delete* e *compare*. Um *simple bind* na porta 389 sem TLS envia a senha **em texto claro**; por isso integrações devem usar LDAPS ou StartTLS. Dados são trocados em arquivos no formato **LDIF**, e a ferramenta de linha de comando clássica é o `ldapsearch`. Filtros têm a forma `(&(objectClass=user)(sAMAccountName=msouza))`.

### Virtualização e hipervisores

A **virtualização** permite que uma máquina física execute várias **máquinas virtuais** (VMs), cada uma com seu sistema operacional. Quem cria e controla as VMs é o **hipervisor**.

| | Tipo 1 (nativo, *bare metal*) | Tipo 2 (hospedado) |
|---|---|---|
| Onde roda | Diretamente sobre o hardware | Como aplicativo sobre um sistema operacional hospedeiro |
| Desempenho | Maior, menos camadas | Menor, depende do SO hospedeiro |
| Uso típico | Datacenters e servidores de produção | Estações de trabalho, testes, laboratório |
| Exemplos | VMware ESXi, Microsoft Hyper-V, Xen, KVM | Oracle VirtualBox, VMware Workstation |

Os processadores oferecem extensões que aceleram a virtualização: **Intel VT-x** e **AMD-V**. Na **paravirtualização**, o sistema convidado é modificado para cooperar com o hipervisor.

Recursos típicos: **snapshot** (registro do estado da VM em um momento, útil antes de uma atualização), **clonagem e modelos** (*templates*) e **migração ao vivo** de uma VM entre hosts sem desligá-la. Snapshot não substitui backup: em geral ele depende dos discos da própria VM e fica no mesmo armazenamento.

> Nota de fonte: a classificação do KVM é discutida na literatura. Ele é um módulo do núcleo Linux que transforma o próprio Linux em hipervisor, e costuma ser apresentado como tipo 1. Se uma questão tratar do tema, leia com atenção o critério usado no enunciado.

### Containers no nível do sistema operacional

Um **container** isola processos **compartilhando o núcleo** do sistema hospedeiro, sem um sistema operacional convidado completo. No Linux, a base são dois recursos do núcleo:

- **Namespaces**: dão ao container uma visão própria de processos (PID), rede, pontos de montagem, nome do host, usuários e comunicação entre processos.
- **cgroups** (*control groups*): limitam e contabilizam CPU, memória e E/S de um grupo de processos.

| | Máquina virtual | Container |
|---|---|---|
| Isola | Um sistema operacional inteiro | Processos sobre o mesmo núcleo |
| Peso e inicialização | Gigabytes; minutos | Megabytes; segundos |
| Isolamento | Mais forte (núcleos separados) | Menor (núcleo compartilhado) |
| Sistema convidado | Qualquer um suportado pelo hipervisor | Precisa ser compatível com o núcleo do hospedeiro |

Antecessores e variantes: `chroot`, FreeBSD Jails, Solaris Zones e **LXC** no Linux. O Windows tem containers próprios, com isolamento de processo ou isolamento Hyper-V (cada container em uma VM leve). Ferramentas como Docker e orquestradores como Kubernetes são tratados no grimório de DevOps.

**Exemplo no Tribunal.** O setor de infraestrutura roda servidores de produção como VMs em um cluster com hipervisor tipo 1, usa VirtualBox (tipo 2) no notebook dos analistas para testes e publica os sistemas web em containers. A autenticação de todos eles aponta para o AD por LDAPS na porta 636.

### Pegadinhas

1. "A floresta é o limite de segurança do Active Directory, e seus domínios compartilham o mesmo esquema." Verdadeiro.
2. "É possível conceder permissão NTFS diretamente a uma OU." Falso. Permissões vão para usuários e grupos; a OU organiza, delega e recebe GPO.
3. "LDAPS usa a porta 389." Falso. LDAP usa 389; LDAPS usa 636.
4. "VirtualBox é um hipervisor tipo 1." Falso. Ele roda sobre um sistema operacional hospedeiro, o que o torna tipo 2.
5. "Containers Linux compartilham o núcleo do hospedeiro e usam namespaces e cgroups." Verdadeiro.
