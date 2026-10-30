O ++sistema operacional++ é o software que administra o hardware e oferece serviços aos programas: ele decide quem usa a CPU, quanta memória cada programa recebe, como os arquivos são guardados e quem pode acessar o quê. O edital pede **administração básica** de Windows e Linux e o **gerenciamento de processos, memória e sistemas de arquivos**. Esta seção trata dos dois primeiros e dos serviços do sistema.

### Programa, processo e thread

| Conceito | O que é |
|---|---|
| **Programa** | Arquivo executável guardado em disco. É passivo. |
| **++Processo++** | Um programa em execução, com espaço de memória próprio, identificador (++PID++), dono e estado. |
| **++Thread++** | Linha de execução dentro de um processo. As threads de um mesmo processo **compartilham a memória** dele, o que torna a troca de dados mais rápida e exige cuidado com concorrência. |

Abrir duas vezes o mesmo editor de planilhas gera, em geral, dois processos distintos a partir de um único programa.

### Estados de um processo

Um processo alterna entre estados ao longo da vida:

| Estado | Situação |
|---|---|
| Novo | Sendo criado. |
| **Pronto** | Aguarda apenas a CPU. |
| **Executando** | Está usando a CPU neste instante. |
| **Bloqueado** (em espera) | Aguarda um evento, como a leitura de disco ou a resposta de rede. |
| Terminado | Encerrou e aguarda a liberação dos recursos. |

O **++escalonador++** escolhe qual processo pronto vai para a CPU. Windows e Linux usam escalonamento **preemptivo**: o sistema pode retirar a CPU de um processo (por fim da fatia de tempo ou chegada de um processo mais prioritário) sem esperar que ele a libere. A troca de um processo por outro na CPU chama-se **troca de contexto**.

No Linux, um processo **zumbi** (estado `Z` no `ps`) já terminou, mas o processo pai ainda não leu seu código de saída. Ele não consome CPU, só uma entrada na tabela de processos.

### Gerenciar processos no Linux

| Comando | Uso |
|---|---|
| `ps aux` ou `ps -ef` | Lista todos os processos (PID, dono, uso de CPU e memória, comando). |
| `top` (ou `htop`, se instalado) | Monitoramento interativo e contínuo de CPU, memória e processos. |
| `kill PID` | Envia um **sinal** ao processo. Sem opção, envia **SIGTERM (15)**, pedido de término que o programa pode tratar. |
| `kill -9 PID` | Envia **SIGKILL (9)**: encerramento forçado, que o processo não pode capturar nem ignorar. |
| `kill -HUP PID` | **SIGHUP (1)**: muitos serviços o interpretam como "recarregue a configuração". |
| `pkill nome` / `killall nome` | Envia sinal aos processos pelo nome. |
| `nice -n 10 comando` / `renice` | Define ou altera a prioridade. O valor *nice* vai de **-20** (mais prioritário) a **19** (menos prioritário). Só o root pode reduzir o valor. |
| `comando &`, `jobs`, `bg`, `fg` | Executa em segundo plano e controla tarefas do terminal. `Ctrl+Z` suspende a tarefa em primeiro plano. |
| `nohup comando &` | Mantém o comando rodando após o encerramento da sessão. |

Regra prática: tente primeiro `kill PID` (SIGTERM), que permite ao programa salvar dados e fechar arquivos. Use `kill -9` só quando o processo não responde.

### Gerenciar processos no Windows

- **Gerenciador de Tarefas** (`Ctrl+Shift+Esc`): processos, desempenho, usuários, serviços e programas de inicialização.
- Prompt de comando: `tasklist` lista processos; `taskkill /PID 1234 /F` encerra à força; `taskkill /IM notepad.exe` encerra pelo nome da imagem.
- PowerShell: `Get-Process` lista processos (alias `ps`); `Stop-Process -Id 1234` ou `Stop-Process -Name notepad` encerra.

### Gerenciamento de memória

A memória principal (RAM) é dividida entre o sistema e os processos. Os sistemas modernos usam **memória virtual**: cada processo enxerga um espaço de endereços próprio e contínuo, que o sistema mapeia para a RAM física em blocos de tamanho fixo chamados **páginas** (técnica de **paginação**). Isso traz isolamento (um processo não lê a memória de outro) e permite usar mais memória do que a RAM disponível.

| Conceito | Significado |
|---|---|
| **Falta de página** (*page fault*) | O processo acessou uma página que não está na RAM; o sistema a busca no disco. |
| **Swap** (Linux) / **arquivo de paginação** (Windows, `pagefile.sys`) | Área em disco que recebe páginas retiradas da RAM. |
| **Thrashing** | O sistema passa mais tempo trocando páginas entre RAM e disco do que executando, e o desempenho despenca. Indica falta de memória física. |
| **MMU** | Unidade do processador que traduz endereços virtuais em físicos. |

Para diagnosticar memória no Linux: `free -h` (RAM e swap em unidades legíveis), `vmstat` e o próprio `top`. No Windows, a aba Desempenho do Gerenciador de Tarefas e o Monitor de Recursos.

### Serviços do sistema

Serviços (no Linux, também chamados *daemons*) são processos que rodam em segundo plano, normalmente iniciados com o sistema: servidor web, banco de dados, SSH.

| Ação | Linux com systemd | Windows (PowerShell) |
|---|---|---|
| Ver estado | `systemctl status nginx` | `Get-Service -Name Spooler` |
| Iniciar / parar | `systemctl start nginx` / `systemctl stop nginx` | `Start-Service` / `Stop-Service` |
| Reiniciar | `systemctl restart nginx` | `Restart-Service` |
| Iniciar com o sistema | `systemctl enable nginx` | `Set-Service -Name X -StartupType Automatic` |
| Não iniciar com o sistema | `systemctl disable nginx` | `Set-Service -Name X -StartupType Disabled` |
| Ver logs | `journalctl -u nginx` | Visualizador de Eventos (`eventvwr.msc`) |

Atenção à diferença: `start` liga o serviço agora; `enable` faz com que ele suba no próximo boot. Um não implica o outro. No Windows, o console gráfico de serviços é o `services.msc`.

Na administração de contas, o superusuário do Linux é o **root** (UID 0). Usuários autorizados executam comandos administrativos com `sudo`. No Windows, tarefas administrativas pedem elevação pelo **Controle de Conta de Usuário** (UAC).

**Exemplo no Tribunal.** O sistema de protocolo eletrônico ficou lento. O técnico roda `top`, vê um processo de relatório usando 100% de CPU e a swap quase cheia. Tenta `kill PID`; como o processo não responde, usa `kill -9 PID` e registra o ocorrido. Em seguida, confirma com `systemctl status` que o serviço do protocolo continua ativo.

### Pegadinhas

1. "O comando `kill PID`, sem opções, envia o sinal SIGKILL." Falso. O padrão é SIGTERM (15); SIGKILL é o 9.
2. "Um valor *nice* de 19 dá ao processo a maior prioridade possível." Falso. 19 é a menor prioridade; -20 é a maior.
3. "Threads de um mesmo processo compartilham o espaço de memória dele." Verdadeiro. Por isso a comunicação entre elas é rápida e sujeita a problemas de concorrência.
4. "`systemctl enable` inicia o serviço imediatamente." Falso. Ele configura a inicialização no boot; para iniciar agora usa-se `start` (ou `enable --now`).
5. "Thrashing é sinal de excesso de memória livre." Falso. Indica memória física insuficiente, com troca excessiva de páginas.
