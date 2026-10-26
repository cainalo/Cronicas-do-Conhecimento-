O edital pede **comandos básicos de shell (Linux) e do Windows PowerShell** e **automação por scripts**. A diferença central entre os dois é o que passa pelo *pipe*: no shell do Linux (bash) os comandos trocam **texto**; no PowerShell trocam **objetos**.

### Comandos essenciais do shell Linux

| Comando | Função | Exemplo |
|---|---|---|
| `pwd` | Mostra o diretório atual | `pwd` |
| `cd` | Muda de diretório (`cd ..` sobe, `cd ~` vai ao diretório pessoal) | `cd /var/log` |
| `ls` | Lista (`-l` detalhado, `-a` inclui ocultos, `-h` tamanhos legíveis) | `ls -lah` |
| `cp` | Copia (`-r` recursivo) | `cp -r modelos/ backup/` |
| `mv` | Move ou renomeia | `mv rel.txt rel-2026.txt` |
| `rm` | Remove (`-r` recursivo, `-f` sem confirmação) | `rm -r temp/` |
| `mkdir` | Cria diretório (`-p` cria os intermediários) | `mkdir -p dados/2026/out` |
| `cat`, `less` | Exibe conteúdo (inteiro ou paginado) | `less contrato.txt` |
| `head`, `tail` | Primeiras ou últimas linhas; `tail -f` acompanha o arquivo crescendo | `tail -f /var/log/syslog` |
| `grep` | Busca texto por padrão (`-i` ignora caixa, `-r` recursivo, `-v` inverte, `-n` número da linha) | `grep -i "erro" app.log` |
| `find` | Procura arquivos por nome, tipo, data, tamanho | `find /dados -name "*.pdf" -mtime +30` |
| `wc -l` | Conta linhas | `wc -l lista.csv` |
| `sort`, `uniq`, `cut` | Ordena, elimina repetições adjacentes, recorta colunas | `cut -d';' -f2 lista.csv` |
| `tar` | Empacota (`-c` cria, `-x` extrai, `-z` gzip, `-f` arquivo) | `tar -czf logs.tar.gz /var/log/app` |
| `man` | Manual do comando | `man find` |

Atenção às diferenças que a banca explora: `grep` procura **dentro** dos arquivos; `find` procura **os arquivos** pelos atributos. Em `find`, `-mtime +30` significa modificado há mais de 30 dias.

### Pipes e redirecionamentos

| Símbolo | Efeito |
|---|---|
| `a \| b` | A saída padrão de `a` vira a entrada de `b`. |
| `> arq` | Grava a saída padrão no arquivo, **sobrescrevendo**. |
| `>> arq` | **Acrescenta** ao final do arquivo. |
| `< arq` | Usa o arquivo como entrada. |
| `2> arq` | Redireciona a **saída de erro** (descritor 2). |
| `> arq 2>&1` | Envia saída e erros para o mesmo arquivo. |

Exemplo: `grep "ERRO" app.log | sort | uniq -c | sort -rn | head -5` mostra as cinco mensagens de erro mais frequentes.

### Scripts em bash

```bash
#!/bin/bash
# backup-diario.sh: compacta os papéis de trabalho e registra o resultado
ORIGEM="/dados/auditorias"
DESTINO="/backup/auditorias-$(date +%F).tar.gz"
tar -czf "$DESTINO" "$ORIGEM"
if [ $? -eq 0 ]; then
  echo "Backup concluído: $DESTINO" >> /var/log/backup.log
else
  echo "Falha no backup" >> /var/log/backup.log
fi
```

- A primeira linha (**shebang**, `#!/bin/bash`) indica o interpretador.
- O arquivo precisa de permissão de execução: `chmod +x backup-diario.sh`, e roda com `./backup-diario.sh`.
- `$1`, `$2` são os argumentos; `$#` é a quantidade deles; `$?` é o **código de saída** do último comando (0 indica sucesso).
- Há estruturas `if`, `for`, `while` e `case`.

**Agendamento.** O `cron` executa tarefas periódicas, editadas com `crontab -e`. Cada linha tem cinco campos de tempo (minuto, hora, dia do mês, mês, dia da semana) e o comando. `30 2 * * 1-5 /opt/scripts/backup-diario.sh` roda às 2h30 de segunda a sexta. No systemd também existem os *timers*.

### PowerShell: cmdlets e objetos

Os comandos do PowerShell são **cmdlets** no formato **Verbo-Substantivo**: `Get-Process`, `Get-Service`, `Get-ChildItem`, `Set-Location`, `Stop-Process`. Três cmdlets ajudam a descobrir o resto: `Get-Help` (ajuda), `Get-Command` (lista comandos) e `Get-Member` (mostra propriedades e métodos de um objeto).

| Tarefa | PowerShell | Alias comuns | Equivalente aproximado no Linux |
|---|---|---|---|
| Listar arquivos | `Get-ChildItem` | `dir`, `ls`, `gci` | `ls` |
| Mudar de pasta | `Set-Location` | `cd` | `cd` |
| Ler arquivo | `Get-Content` (`-Wait` acompanha) | `cat`, `type` | `cat`, `tail -f` |
| Buscar texto | `Select-String` | | `grep` |
| Processos | `Get-Process`, `Stop-Process` | `ps`, `kill` | `ps`, `kill` |
| Serviços | `Get-Service`, `Start-Service`, `Stop-Service` | | `systemctl` |
| Copiar, mover, remover | `Copy-Item`, `Move-Item`, `Remove-Item` | `cp`, `mv`, `rm` | `cp`, `mv`, `rm` |

**Pipeline de objetos.** No PowerShell o *pipe* passa objetos com propriedades, não texto. Por isso dá para filtrar e ordenar por propriedade, sem recortar colunas:

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU
Get-Service | Where-Object { $_.Status -eq 'Stopped' }
Get-ChildItem C:\Relatorios -Recurse -Filter *.pdf | Measure-Object
Get-Process | Export-Csv processos.csv -NoTypeInformation
```

- `Where-Object` filtra; `Select-Object` escolhe propriedades ou quantidade; `Sort-Object` ordena; `ForEach-Object` executa algo para cada item; `Format-Table` formata a exibição.
- `$_` (ou `$PSItem`) representa o objeto atual no pipeline.
- Operadores de comparação são palavras: `-eq`, `-ne`, `-gt`, `-lt`, `-like` (curinga), `-match` (expressão regular).
- Variáveis começam com `$`: `$pasta = "C:\Dados"`.

### Scripts PowerShell e ExecutionPolicy

Scripts do PowerShell têm extensão **.ps1**. A **política de execução** (*ExecutionPolicy*) define se scripts podem rodar:

| Política | Efeito |
|---|---|
| **Restricted** | Não executa scripts, só comandos interativos. Padrão nos clientes Windows. |
| **RemoteSigned** | Scripts locais rodam; scripts baixados da internet precisam de assinatura digital confiável. Padrão no Windows Server. |
| **AllSigned** | Todo script precisa estar assinado por editor confiável. |
| **Unrestricted** | Executa tudo, com aviso para scripts baixados da internet. |
| **Bypass** | Nada é bloqueado e não há avisos. |

Consulta com `Get-ExecutionPolicy` e altera com, por exemplo, `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. A própria Microsoft observa que a política é um recurso de segurança contra execução acidental, e não uma barreira contra um usuário determinado.

Para automação no Windows, o **Agendador de Tarefas** (ou `Register-ScheduledTask`) cumpre o papel do cron. A administração remota usa `Invoke-Command` e `Enter-PSSession`, sobre o WinRM. O PowerShell 7 (`pwsh`) é multiplataforma e roda também em Linux e macOS.

> Nota de fonte: as políticas e seus padrões seguem a documentação da Microsoft (about_Execution_Policies). Os padrões citados valem para o Windows PowerShell em versões atuais do Windows e podem diferir em ambientes configurados por política de grupo.

### Pegadinhas

1. "No PowerShell, o pipeline transmite texto entre os comandos, como no bash." Falso. Transmite objetos .NET com propriedades.
2. "`>>` sobrescreve o arquivo de destino." Falso. `>>` acrescenta; `>` sobrescreve.
3. "Com a política RemoteSigned, scripts criados localmente podem rodar sem assinatura." Verdadeiro. A exigência de assinatura recai sobre scripts vindos da internet.
4. "`find` busca um texto dentro do conteúdo dos arquivos." Falso. Isso é o `grep`; o `find` localiza arquivos por nome e atributos.
5. "`$?` igual a 0 indica que o último comando falhou." Falso. Zero indica sucesso.
