// Microaula "Shell Linux, PowerShell e scripts" (cap.infra.03, seção shell), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos conferidos
// com o texto do capítulo (03-shell-powershell.md), que segue a documentação da Microsoft para as
// políticas de execução. Nomes de arquivos e pastas são exemplos didáticos. Revisão humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraShell: MicroLesson = {
  id: 'micro.infra.shell',
  chapterId: 'cap.infra.03',
  sectionId: 'shell',
  title: 'Shell Linux, PowerShell e scripts',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Todo dia às 2h alguém precisa compactar a pasta de auditorias e anotar se deu certo. Qual é o melhor caminho?',
    options: [
      { text: 'Escrever um script e agendar para rodar sozinho', why: 'Isso. Comandos em sequência viram um script, e o sistema agenda a execução. É o que vamos aprender.' },
      { text: 'Pedir a um servidor que faça à mão todas as madrugadas', why: 'Funciona, mas cansa e falha. Comandos repetidos viram script, e o sistema agenda.' },
      { text: 'Não há como: backup só se faz com programa comprado', why: 'Dá para fazer com os comandos do próprio sistema. Vamos ver como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'texto-objeto',
      part: 'Primeiros passos',
      title: 'Shell e PowerShell: texto e objetos',
      goal: 'Saber a diferença central entre o shell do Linux e o PowerShell.',
      explain:
        'O **shell** é o programa em que você digita comandos. O edital pede os comandos básicos do **shell do Linux** (o mais comum é o **bash**) e do **Windows PowerShell**, além de **automação por scripts**.\n\nOs comandos podem ser ligados por um ***pipe*** (`|`): a saída de um vira a entrada do outro. A diferença central está no que passa por esse cano:\n\n- No **bash**, passa **texto**.\n- No **PowerShell**, passam **objetos**, com propriedades (nome, estado, uso de CPU).',
      check: {
        kind: 'choice',
        id: 'to-c',
        prompt: 'O que passa pelo pipe no PowerShell?',
        options: [
          { text: 'Objetos com propriedades', why: 'Isso. É a diferença central em relação ao bash.' },
          { text: 'Texto, como no bash', why: 'No bash passa texto. No PowerShell passam objetos.' },
          { text: 'Arquivos compactados', why: 'O pipe liga a saída de um comando à entrada de outro; no PowerShell, com objetos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa lista de servidores do Tribunal. No **bash**, você recebe a lista como **texto impresso** e precisa recortar a coluna certa. No **PowerShell**, recebe **fichas** com campos (Nome, Estado) e pode pedir "só as fichas com Estado = parado".',
        check: {
          kind: 'sort',
          id: 'to-r',
          prompt: 'O que passa pelo pipe em cada um?',
          categories: ['Texto', 'Objetos'],
          items: [
            { text: 'bash no Linux', cat: 0, why: 'Os comandos trocam texto.' },
            { text: 'Windows PowerShell', cat: 1, why: 'Os cmdlets trocam objetos.' },
          ],
        },
      },
    },
    {
      id: 'navegar',
      part: 'Shell Linux',
      title: 'Onde estou: pwd, cd e ls',
      goal: 'Navegar entre diretórios e listar o conteúdo com opções.',
      explain:
        '| Comando | O que faz |\n|---|---|\n| `pwd` | Mostra o diretório atual |\n| `cd /var/log` | Entra em /var/log |\n| `cd ..` | Sobe um nível |\n| `cd ~` | Vai ao diretório pessoal |\n| `ls` | Lista o conteúdo |\n\nOpções do `ls`: **`-l`** detalhado, **`-a`** inclui os ocultos, **`-h`** tamanhos legíveis. Juntas: `ls -lah`.',
      check: {
        kind: 'choice',
        id: 'nv-c',
        prompt: 'Qual opção do ls faz aparecer também os arquivos ocultos?',
        options: [
          { text: '-a', why: 'Isso. a de all (todos).' },
          { text: '-l', why: '-l mostra os detalhes (permissões, dono, tamanho), não os ocultos.' },
          { text: '-h', why: '-h deixa os tamanhos legíveis (K, M, G).' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Três letras, três ideias: **l** de *long* (lista longa, com detalhes), **a** de *all* (todos, até os ocultos), **h** de *human* (tamanhos para humanos: 4,0K, 12M).\n\nE para andar: `cd ..` sobe, `cd ~` volta para casa, `pwd` diz onde você está.',
        check: {
          kind: 'choice',
          id: 'nv-r',
          prompt: 'Você está em /dados/aud2026/papeis e digita cd .. . Onde fica?',
          options: [
            { text: '/dados/aud2026', why: 'Isso. .. é o diretório de cima.' },
            { text: '/dados', why: 'Subiu dois níveis. cd .. sobe só um.' },
            { text: 'No diretório pessoal', why: 'Isso seria cd ~.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'arquivos',
      part: 'Shell Linux',
      title: 'Copiar, mover, apagar e criar',
      goal: 'Usar cp, mv, rm e mkdir com as opções mais cobradas.',
      explain:
        '| Comando | Função | Opção que cai |\n|---|---|---|\n| `cp` | Copia | `-r` copia pastas inteiras (recursivo) |\n| `mv` | **Move ou renomeia** | `mv rel.txt rel-2026.txt` renomeia |\n| `rm` | Remove | `-r` recursivo, `-f` sem pedir confirmação |\n| `mkdir` | Cria diretório | `-p` cria os intermediários |\n\nExemplo do `-p`: `mkdir -p dados/2026/out` cria `dados`, `2026` e `out` de uma vez, se não existirem.',
      check: {
        kind: 'choice',
        id: 'aq-c',
        prompt: 'Qual comando renomeia relatorio.txt para relatorio-2026.txt?',
        options: [
          { text: 'mv relatorio.txt relatorio-2026.txt', why: 'Isso. mv move e também renomeia.' },
          { text: 'cp relatorio.txt relatorio-2026.txt', why: 'cp cria uma cópia; o original continua lá.' },
          { text: 'mkdir relatorio-2026.txt', why: 'mkdir cria um diretório.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Renomear é, para o Linux, **mover para outro nome** no mesmo lugar. Por isso não existe um comando "rename" básico: usa-se `mv`.\n\nE cuidado com `rm -rf`: apaga pastas inteiras sem perguntar.',
        check: {
          kind: 'choice',
          id: 'aq-r',
          prompt: 'Qual comando copia a pasta modelos/ inteira para backup/?',
          options: [
            { text: 'cp -r modelos/ backup/', why: 'Isso. -r copia recursivamente.' },
            { text: 'cp modelos/ backup/', why: 'Sem -r o cp não copia diretórios.' },
            { text: 'mv -r modelos/ backup/', why: 'mv move (o original sai de lá); a tarefa era copiar.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ver',
      part: 'Shell Linux',
      title: 'Ver conteúdo: cat, less, head e tail',
      goal: 'Escolher o comando certo para ler um arquivo e acompanhar um log.',
      explain:
        '- **`cat`**: mostra o arquivo inteiro de uma vez.\n- **`less`**: mostra **paginado**, para ler com calma.\n- **`head`**: as **primeiras** linhas.\n- **`tail`**: as **últimas** linhas.\n- **`tail -f`**: **acompanha** o arquivo enquanto ele cresce. Muito usado em logs: `tail -f /var/log/syslog`.\n- **`man comando`**: abre o manual de um comando (`man find`).',
      check: {
        kind: 'choice',
        id: 'vr-c',
        prompt: 'Você quer ver, ao vivo, as novas linhas que o sistema grava no log. Qual comando?',
        options: [
          { text: 'tail -f /var/log/syslog', why: 'Isso. -f acompanha o arquivo crescendo.' },
          { text: 'head /var/log/syslog', why: 'head mostra o começo, que é o mais antigo.' },
          { text: 'cat /var/log/syslog', why: 'cat mostra tudo uma vez e termina; não acompanha.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**head** é a cabeça (o começo); **tail** é a cauda (o fim). Num log, o fim é o mais recente. O **-f** (*follow*, seguir) deixa o tail parado olhando a cauda, mostrando cada linha nova que chega.',
        check: {
          kind: 'choice',
          id: 'vr-r',
          prompt: 'Para ler com calma, página por página, um contrato longo:',
          options: [
            { text: 'less contrato.txt', why: 'Isso. less pagina o conteúdo.' },
            { text: 'tail contrato.txt', why: 'tail mostra só o final.' },
            { text: 'wc -l contrato.txt', why: 'wc -l conta linhas; não mostra o texto.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'grep-find',
      part: 'Shell Linux',
      title: 'grep procura dentro; find procura arquivos',
      goal: 'Diferenciar grep de find e ler -mtime +30.',
      explain:
        '**`grep`** procura um **texto dentro** dos arquivos. Opções: `-i` ignora maiúsculas, `-r` recursivo, `-v` inverte (mostra o que não casa), `-n` mostra o número da linha.\n\n`grep -i "erro" app.log`\n\n**`find`** procura **os arquivos** por atributos: nome, tipo, data, tamanho.\n\n`find /dados -name "*.pdf" -mtime +30`\n\nEm `find`, **`-mtime +30`** significa **modificado há mais de 30 dias**.',
      check: {
        kind: 'choice',
        id: 'gf-c',
        prompt: 'Você quer achar as linhas com a palavra "falha" dentro de app.log. Qual comando?',
        options: [
          { text: 'grep "falha" app.log', why: 'Isso. Procurar dentro do arquivo é com grep.' },
          { text: 'find "falha" app.log', why: 'find localiza arquivos por atributos, não texto dentro deles.' },
          { text: 'ls -l app.log', why: 'ls lista o arquivo, sem procurar texto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No arquivo do Tribunal: **find** é o funcionário que acha **as pastas** pela etiqueta ("todas de 2025, com mais de 30 dias"). **grep** abre as pastas e procura **uma frase** dentro das folhas.',
        check: {
          kind: 'choice',
          id: 'gf-r',
          prompt: 'Localizar os .pdf em /dados modificados há mais de 30 dias:',
          options: [
            { text: 'find /dados -name "*.pdf" -mtime +30', why: 'Isso. find, por nome e data.' },
            { text: 'find /dados -name "*.pdf" -mtime -30', why: '-30 seria há menos de 30 dias. Mais de 30 é +30.' },
            { text: 'grep -r ".pdf" /dados', why: 'grep procuraria o texto ".pdf" dentro dos arquivos.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'colunas',
      part: 'Shell Linux',
      title: 'Contar, ordenar e recortar: wc, sort, uniq, cut',
      goal: 'Conhecer os comandos que tratam texto em linhas e colunas.',
      explain:
        '- **`wc -l`**: conta as linhas (`wc -l lista.csv`).\n- **`sort`**: ordena as linhas.\n- **`uniq`**: elimina repetições **adjacentes** (por isso costuma vir depois do `sort`); `uniq -c` conta quantas vezes cada linha aparece.\n- **`cut`**: recorta colunas. `cut -d\';\' -f2 lista.csv` pega a 2ª coluna de um arquivo separado por ponto e vírgula.',
      example: '`lista.csv` tem `nome;cargo` em cada linha. `cut -d\';\' -f2 lista.csv | sort | uniq -c` mostra quantas pessoas há em cada cargo.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'Por que o uniq costuma vir depois do sort?',
        options: [
          { text: 'Porque o uniq só elimina repetições adjacentes', why: 'Isso. O sort junta as linhas iguais, e o uniq as reduz.' },
          { text: 'Porque o uniq só funciona em arquivos ordenados por data', why: 'Não tem a ver com data: ele só olha linhas vizinhas.' },
          { text: 'Porque o sort conta as linhas', why: 'Quem conta linhas é o wc -l.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine a lista "TI, Jurídico, TI". O `uniq` olha só a linha de cima: "TI" e "Jurídico" são diferentes, "Jurídico" e "TI" também, e nada é removido. Ordenando antes ("Jurídico, TI, TI"), os dois "TI" ficam vizinhos e o `uniq` os junta.',
        check: {
          kind: 'choice',
          id: 'cl-r',
          prompt: 'Quantas linhas tem o arquivo lista.csv? Qual comando responde?',
          options: [
            { text: 'wc -l lista.csv', why: 'Isso. -l conta linhas.' },
            { text: 'cut -d\';\' -f2 lista.csv', why: 'cut recorta colunas.' },
            { text: 'sort lista.csv', why: 'sort ordena, não conta.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'tar',
      part: 'Shell Linux',
      title: 'tar: empacotar e extrair',
      goal: 'Ler as opções -c, -x, -z e -f do tar.',
      explain:
        'O **`tar`** junta vários arquivos num pacote só (e pode compactar). As letras:\n\n| Opção | Significado |\n|---|---|\n| `-c` | **cria** o pacote |\n| `-x` | **extrai** o pacote |\n| `-z` | compacta com **gzip** |\n| `-f` | o nome do **arquivo** do pacote vem a seguir |\n\n`tar -czf logs.tar.gz /var/log/app` cria `logs.tar.gz`, compactado, com o conteúdo de `/var/log/app`.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Qual opção do tar indica que o pacote será EXTRAÍDO?',
        options: [
          { text: '-x', why: 'Isso. x de extrair.' },
          { text: '-c', why: '-c cria o pacote.' },
          { text: '-z', why: '-z diz que há compactação gzip.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia o `tar` como uma frase: `-czf` = **c**riar, com g**z**ip, no **f**ile (arquivo) tal. `-xzf` = e**x**trair, com g**z**ip, do arquivo tal.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'Abrir o pacote logs.tar.gz no diretório atual:',
          options: [
            { text: 'tar -xzf logs.tar.gz', why: 'Isso: extrair, gzip, arquivo.' },
            { text: 'tar -czf logs.tar.gz', why: 'Isso criaria o pacote, não abriria.' },
            { text: 'cat logs.tar.gz', why: 'cat mostraria bytes compactados, não extrairia.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'pipe',
      part: 'Pipes e redirecionamentos',
      title: 'Pipe, > e >>',
      goal: 'Diferenciar pipe, sobrescrever e acrescentar.',
      explain:
        '| Símbolo | Efeito |\n|---|---|\n| `a \\| b` | A saída de `a` vira a entrada de `b` |\n| `> arq` | Grava a saída no arquivo, **sobrescrevendo** |\n| `>> arq` | **Acrescenta** ao final do arquivo |\n| `< arq` | Usa o arquivo como entrada |\n\nExemplo: `grep "ERRO" app.log | sort | uniq -c | sort -rn | head -5` mostra as cinco mensagens de erro mais frequentes.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'O que faz echo "ok" >> backup.log?',
        options: [
          { text: 'Acrescenta "ok" no final de backup.log', why: 'Isso. >> acrescenta.' },
          { text: 'Apaga backup.log e grava só "ok"', why: 'Isso seria >, que sobrescreve.' },
          { text: 'Lê backup.log como entrada', why: 'Entrada é <.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um sinal, uma folha nova: **`>`** joga fora o que havia e escreve de novo. Dois sinais, mais uma linha: **`>>`** mantém tudo e **acrescenta** embaixo. Para um log que vai crescendo dia após dia, é **`>>`**.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'Você quer guardar a listagem de hoje em lista.txt, substituindo a de ontem:',
          options: [
            { text: 'ls -l > lista.txt', why: 'Isso. > sobrescreve.' },
            { text: 'ls -l >> lista.txt', why: '>> acrescentaria, mantendo a lista de ontem.' },
            { text: 'ls -l < lista.txt', why: '< usa o arquivo como entrada.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'erros',
      part: 'Pipes e redirecionamentos',
      title: 'Saída de erro: 2> e 2>&1',
      goal: 'Redirecionar os erros e juntar saída e erros num só arquivo.',
      explain:
        'Um comando tem duas saídas: a **padrão** (os resultados) e a **de erro** (as mensagens de falha), que é o **descritor 2**.\n\n- **`2> erros.txt`**: manda só os **erros** para o arquivo.\n- **`> saida.log 2>&1`**: manda a saída **e** os erros para o **mesmo** arquivo.',
      example: '`/opt/scripts/backup.sh >> /var/log/backup.log 2>&1` acrescenta ao log tanto as mensagens normais quanto as de erro do backup.',
      check: {
        kind: 'choice',
        id: 'er-c',
        prompt: 'O que significa o 2 em 2> erros.txt?',
        options: [
          { text: 'A saída de erro (descritor 2)', why: 'Isso.' },
          { text: 'Gravar duas vezes no arquivo', why: 'Não. 2 é o número do descritor da saída de erro.' },
          { text: 'A segunda coluna do texto', why: 'Coluna é assunto do cut. 2 aqui é a saída de erro.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **duas bandejas** na mesa do comando: uma para os documentos prontos (saída padrão) e outra para as reclamações (saída de erro, a número 2). `2>&1` diz: "ponha as reclamações na mesma bandeja dos documentos".',
        check: {
          kind: 'choice',
          id: 'er-r',
          prompt: 'Qual linha guarda resultados e erros do script no mesmo arquivo run.log?',
          options: [
            { text: './script.sh > run.log 2>&1', why: 'Isso. Saída para o arquivo, e erros para onde a saída foi.' },
            { text: './script.sh 2> run.log', why: 'Só os erros iriam para o arquivo.' },
            { text: './script.sh | run.log', why: 'O pipe liga a outro comando, não a um arquivo.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'script',
      part: 'Scripts em bash',
      title: 'Um script: shebang, chmod +x e ./',
      goal: 'Saber o que é o shebang e como tornar um script executável.',
      explain:
        'Um **script** é um arquivo com comandos em sequência.\n\n```bash\n#!/bin/bash\n# backup-diario.sh\ntar -czf /backup/auditorias.tar.gz /dados/auditorias\n```\n\n- A primeira linha, **`#!/bin/bash`**, é o ***shebang***: indica qual interpretador roda o script.\n- O arquivo precisa de permissão de execução: **`chmod +x backup-diario.sh`**.\n- Para rodar: **`./backup-diario.sh`**.\n- Há estruturas `if`, `for`, `while` e `case`.',
      check: {
        kind: 'choice',
        id: 'sc-c',
        prompt: 'O script tem shebang correto, mas ao rodar ./backup.sh aparece "Permissão negada". O que falta?',
        options: [
          { text: 'chmod +x backup.sh', why: 'Isso. Falta a permissão de execução.' },
          { text: 'Trocar o shebang por #!/bin/bash2', why: 'O shebang está correto. O problema é a permissão de execução.' },
          { text: 'Renomear para backup.exe', why: 'No Linux, a extensão não torna nada executável. Falta o x.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Três passos, sempre nesta ordem: **escrever** o arquivo começando pelo shebang, **dar execução** com `chmod +x`, **rodar** com `./nome.sh`. Lembre da aula de permissões: sem o `x`, o sistema não executa.',
        check: {
          kind: 'order',
          id: 'sc-r',
          prompt: 'Ponha na ordem os passos para criar e rodar um script.',
          items: ['Escrever o arquivo começando com #!/bin/bash', 'chmod +x backup.sh', './backup.sh'],
          why: 'Primeiro o conteúdo, depois a permissão, por fim a execução.',
        },
      },
    },
    {
      id: 'variaveis',
      part: 'Scripts em bash',
      title: '$1, $# e $?',
      goal: 'Ler os argumentos e o código de saída num script.',
      explain:
        '- **`$1`, `$2`**: o primeiro e o segundo **argumentos** passados ao script.\n- **`$#`**: a **quantidade** de argumentos.\n- **`$?`**: o **código de saída** do último comando. **0 indica sucesso**; outro valor indica falha.\n\nNo script de backup:\n\n```bash\ntar -czf "$DESTINO" "$ORIGEM"\nif [ $? -eq 0 ]; then\n  echo "Backup concluído" >> /var/log/backup.log\nelse\n  echo "Falha no backup" >> /var/log/backup.log\nfi\n```',
      check: {
        kind: 'choice',
        id: 'vb-c',
        prompt: 'Depois de um comando, $? vale 0. Isso indica:',
        options: [
          { text: 'Que o último comando terminou com sucesso', why: 'Isso. Zero é sucesso.' },
          { text: 'Que o último comando falhou', why: 'É o contrário: 0 é sucesso; outro valor é falha.' },
          { text: 'Que nenhum argumento foi passado', why: 'Quantidade de argumentos é $#.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense no relatório que o comando entrega ao terminar: **"0 problemas"** quer dizer que deu certo. Qualquer outro número é o código de um problema. Por isso `[ $? -eq 0 ]` pergunta "deu certo?".',
        check: {
          kind: 'sort',
          id: 'vb-r',
          prompt: 'O que cada variável guarda?',
          categories: ['$1', '$#', '$?'],
          items: [
            { text: 'O primeiro argumento do script', cat: 0, why: '$1 é o primeiro argumento.' },
            { text: 'Quantos argumentos foram passados', cat: 1, why: '$# é a quantidade.' },
            { text: 'Se o último comando deu certo', cat: 2, why: '$? é o código de saída.' },
          ],
        },
      },
    },
    {
      id: 'cron',
      part: 'Scripts em bash',
      title: 'Agendar com o cron',
      goal: 'Ler os cinco campos de tempo de uma linha do cron.',
      explain:
        'O **cron** executa tarefas periódicas. As tarefas são editadas com **`crontab -e`**. Cada linha tem **cinco campos de tempo** e depois o comando:\n\n| minuto | hora | dia do mês | mês | dia da semana |\n|---|---|---|---|---|\n| 30 | 2 | * | * | 1-5 |\n\n`30 2 * * 1-5 /opt/scripts/backup-diario.sh` roda às **2h30**, de **segunda a sexta**. O `*` quer dizer "qualquer".\n\nNo systemd também existem os *timers*.',
      check: {
        kind: 'choice',
        id: 'cr-c',
        prompt: 'Na linha 0 18 * * 5 /opt/rel.sh, quando o script roda?',
        options: [
          { text: 'Às 18h00, toda sexta-feira', why: 'Isso. Minuto 0, hora 18, dia da semana 5.' },
          { text: 'Às 0h18, todo dia 5', why: 'A ordem é minuto e depois hora: 0 18 é 18h00. E o 5 está no campo do dia da semana.' },
          { text: 'A cada 18 minutos, em maio', why: 'Os campos não são intervalos nem meses aqui. É 18h00 de sexta.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia sempre da esquerda para a direita, do menor para o maior: **minuto, hora, dia, mês, dia da semana**. Em `30 2 * * 1-5`: minuto 30, hora 2, qualquer dia, qualquer mês, de segunda (1) a sexta (5).',
        check: {
          kind: 'choice',
          id: 'cr-r',
          prompt: 'Qual comando abre a lista de tarefas do cron para edição?',
          options: [
            { text: 'crontab -e', why: 'Isso. -e de editar.' },
            { text: 'cron -start', why: 'Não é assim que se editam as tarefas; usa-se crontab -e.' },
            { text: 'systemctl enable cron.sh', why: 'enable trata de serviços no boot, não da lista do cron.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'cmdlets',
      part: 'PowerShell',
      title: 'Cmdlets: Verbo-Substantivo',
      goal: 'Reconhecer o formato dos cmdlets e os três que ajudam a descobrir o resto.',
      explain:
        'Os comandos do PowerShell são **cmdlets** no formato **Verbo-Substantivo**: `Get-Process`, `Get-Service`, `Get-ChildItem`, `Set-Location`, `Stop-Process`.\n\nTrês ajudam a descobrir os outros:\n\n- **`Get-Help`**: ajuda.\n- **`Get-Command`**: lista os comandos.\n- **`Get-Member`**: mostra as propriedades e métodos de um objeto.\n\nHá **apelidos** (*alias*) conhecidos: `dir`, `ls` e `gci` para `Get-ChildItem`; `cd` para `Set-Location`; `cat` para `Get-Content`.',
      check: {
        kind: 'choice',
        id: 'cd-c',
        prompt: 'Qual cmdlet mostra as propriedades de um objeto, como as de um serviço?',
        options: [
          { text: 'Get-Member', why: 'Isso. Membros = propriedades e métodos.' },
          { text: 'Get-Command', why: 'Get-Command lista comandos disponíveis.' },
          { text: 'Get-Help', why: 'Get-Help mostra a ajuda de um comando.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em perguntas: "**o que** posso fazer?" (`Get-Command`), "**como** uso isso?" (`Get-Help`), "**do que é feito** esse objeto?" (`Get-Member`).',
        check: {
          kind: 'sort',
          id: 'cd-r',
          prompt: 'Qual é o equivalente no Linux?',
          categories: ['ls', 'grep', 'cat'],
          items: [
            { text: 'Get-ChildItem', cat: 0, why: 'Lista arquivos, como ls.' },
            { text: 'Select-String', cat: 1, why: 'Busca texto, como grep.' },
            { text: 'Get-Content', cat: 2, why: 'Lê arquivo, como cat.' },
          ],
        },
      },
    },
    {
      id: 'pipeline-objetos',
      part: 'PowerShell',
      title: 'Filtrar objetos: Where-Object e $_',
      goal: 'Ler um pipeline com Where-Object, Select-Object e Sort-Object.',
      explain:
        '```powershell\nGet-Service | Where-Object { $_.Status -eq \'Stopped\' }\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU\n```\n\n- **`Where-Object`** filtra; **`Select-Object`** escolhe propriedades ou quantidade; **`Sort-Object`** ordena; **`ForEach-Object`** age em cada item.\n- **`$_`** (ou `$PSItem`) é o **objeto atual** no pipeline.\n- Comparações são palavras: `-eq`, `-ne`, `-gt`, `-lt`, `-like` (curinga), `-match` (expressão regular).',
      check: {
        kind: 'choice',
        id: 'po-c',
        prompt: 'Em Where-Object { $_.Status -eq \'Stopped\' }, o que é $_?',
        options: [
          { text: 'O objeto atual que passa pelo pipeline', why: 'Isso. Cada serviço, um de cada vez.' },
          { text: 'O código de saída do último comando', why: 'Isso é o $? do bash. $_ é o objeto atual.' },
          { text: 'O primeiro argumento do script', why: 'Isso é o $1 do bash.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia em voz alta: "pegue os serviços, **e para cada um** ($_), deixe passar **só se** o Estado **for igual a** Parado". O `-eq` é o "igual"; `-gt`, "maior que"; `-lt`, "menor que".',
        check: {
          kind: 'choice',
          id: 'po-r',
          prompt: 'Qual pipeline mostra os 5 processos que mais usam CPU?',
          options: [
            { text: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5', why: 'Isso. Ordena do maior para o menor e pega os 5 primeiros.' },
            { text: 'Get-Process | Select-Object -First 5', why: 'Sem ordenar, pega 5 quaisquer.' },
            { text: 'Get-Process | Where-Object { $_.CPU -eq 5 }', why: 'Isso filtraria quem usou exatamente 5, não os 5 maiores.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'politica',
      part: 'PowerShell',
      title: 'ExecutionPolicy: quem pode rodar scripts',
      goal: 'Diferenciar Restricted, RemoteSigned, AllSigned, Unrestricted e Bypass.',
      explain:
        'Scripts do PowerShell têm extensão **.ps1**. A ***ExecutionPolicy*** define se eles rodam:\n\n| Política | Efeito |\n|---|---|\n| **Restricted** | Não roda scripts. Padrão nos clientes Windows. |\n| **RemoteSigned** | Locais rodam; **baixados da internet** precisam de assinatura confiável. Padrão no Windows Server. |\n| **AllSigned** | **Todo** script precisa de assinatura. |\n| **Unrestricted** | Roda tudo, com aviso para os baixados. |\n| **Bypass** | Nada bloqueado, sem avisos. |\n\nConsulta: `Get-ExecutionPolicy`. Alteração: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.',
      check: {
        kind: 'choice',
        id: 'ep-c',
        prompt: 'Scripts escritos na própria máquina devem rodar, e os baixados da internet só com assinatura. Qual política?',
        options: [
          { text: 'RemoteSigned', why: 'Isso. Remoto (baixado) precisa de assinatura; local não.' },
          { text: 'AllSigned', why: 'AllSigned exige assinatura também dos scripts locais.' },
          { text: 'Restricted', why: 'Restricted não roda script nenhum.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma escada, do mais fechado ao mais aberto: **Restricted** (nada) → **AllSigned** (só assinados) → **RemoteSigned** (assinatura só para os de fora) → **Unrestricted** (tudo, com aviso) → **Bypass** (tudo, calado).\n\nA Microsoft lembra: a política evita execução **acidental**; não é barreira contra quem está decidido.',
        check: {
          kind: 'choice',
          id: 'ep-r',
          prompt: 'Qual política exige assinatura de TODO script, inclusive os locais?',
          options: [
            { text: 'AllSigned', why: 'Isso. All = todos.' },
            { text: 'RemoteSigned', why: 'RemoteSigned só exige dos baixados da internet.' },
            { text: 'Bypass', why: 'Bypass não bloqueia nada.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'automacao-windows',
      part: 'PowerShell',
      title: 'Agendar e administrar à distância no Windows',
      goal: 'Associar Agendador de Tarefas, Invoke-Command e pwsh às suas funções.',
      explain:
        '- O **Agendador de Tarefas** (ou `Register-ScheduledTask`) faz no Windows o papel do **cron**.\n- A administração **remota** usa **`Invoke-Command`** e **`Enter-PSSession`**, sobre o **WinRM**.\n- O **PowerShell 7** (`pwsh`) é **multiplataforma**: roda também em Linux e macOS.',
      example: 'O backup diário do servidor Windows: um script .ps1 cadastrado no Agendador de Tarefas para 2h30, de segunda a sexta, como o `30 2 * * 1-5` do cron.',
      check: {
        kind: 'choice',
        id: 'aw-c',
        prompt: 'No Windows, o que faz o papel do cron?',
        options: [
          { text: 'O Agendador de Tarefas (Register-ScheduledTask)', why: 'Isso.' },
          { text: 'O Invoke-Command', why: 'Invoke-Command executa comandos em máquinas remotas.' },
          { text: 'O Get-ExecutionPolicy', why: 'Esse consulta a política de execução de scripts.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Três ferramentas, três perguntas: **quando** rodar? Agendador de Tarefas. **Onde** rodar (outra máquina)? `Invoke-Command` e `Enter-PSSession`, pelo WinRM. **Em que sistema**? O `pwsh` (PowerShell 7) roda no Windows, no Linux e no macOS.',
        check: {
          kind: 'choice',
          id: 'aw-r',
          prompt: 'Qual cmdlet abre uma sessão interativa num servidor remoto?',
          options: [
            { text: 'Enter-PSSession', why: 'Isso. Entra numa sessão remota (via WinRM).' },
            { text: 'Set-Location', why: 'Set-Location muda de pasta, como o cd.' },
            { text: 'Register-ScheduledTask', why: 'Esse agenda tarefas.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Montar o backup automático no Linux. Ponha os passos na ordem.',
      items: [
        'Escrever backup.sh começando com #!/bin/bash',
        'chmod +x backup.sh',
        'Testar com ./backup.sh e conferir $?',
        'crontab -e e adicionar 30 2 * * 1-5 /opt/scripts/backup.sh',
      ],
      why: 'Escreve, dá execução, testa à mão e só então agenda.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'grep procura texto dentro dos arquivos', correct: true, why: 'find é que procura os arquivos.' },
        { text: '>> acrescenta ao final do arquivo', correct: true, why: '> é que sobrescreve.' },
        { text: '$? igual a 0 indica falha', correct: false, why: '0 indica sucesso.' },
        { text: 'No PowerShell o pipe transmite texto, como no bash', correct: false, why: 'Transmite objetos.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou um script que guarda o log do dia sem apagar os anteriores. Toque na linha errada.',
      lines: ['#!/bin/bash', 'tar -czf /backup/logs.tar.gz /var/log/app', 'echo "Backup de $(date +%F)" > /var/log/backup.log'],
      bug: 2,
      why: 'Com > o log é sobrescrito todo dia. Para acumular, use >>.',
      fixed: 'echo "Backup de $(date +%F)" >> /var/log/backup.log',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'Qual das duas formas lista os serviços parados no Windows usando as propriedades dos objetos?',
      scenarios: [
        { title: 'Forma A', body: '```powershell\nGet-Service | Where-Object { $_.Status -eq \'Stopped\' }\n```' },
        { title: 'Forma B', body: '```powershell\nGet-Service | Select-String "Stopped"\n```' },
      ],
      answer: 0,
      why: 'A forma A filtra pela propriedade Status de cada objeto. Select-String procura texto, como o grep, e não usa as propriedades.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o relatório deve rodar às 7h15 no primeiro dia de cada mês. Qual linha do cron?',
      options: [
        { text: '15 7 1 * * /opt/rel.sh', why: 'Isso. Minuto 15, hora 7, dia 1, qualquer mês, qualquer dia da semana.' },
        { text: '7 15 1 * * /opt/rel.sh', why: 'Inverteu minuto e hora: isso roda às 15h07.' },
        { text: '15 7 * * 1 /opt/rel.sh', why: 'O 1 no último campo é segunda-feira, não o dia 1 do mês.' },
      ],
      answer: 0,
      errorKind: 'leitura',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.009' },
  ],
  summary: [
    'No bash o pipe passa texto; no PowerShell passa objetos com propriedades.',
    'pwd, cd, ls -lah; cp -r, mv (também renomeia), rm -rf, mkdir -p.',
    'tail -f acompanha o log; grep procura dentro, find procura arquivos (-mtime +30 = mais de 30 dias).',
    'sort antes de uniq; cut recorta colunas; tar -czf cria, -xzf extrai.',
    '> sobrescreve, >> acrescenta, 2> manda os erros, 2>&1 junta tudo.',
    'Script: shebang, chmod +x, ./script. $? igual a 0 é sucesso.',
    'cron: minuto, hora, dia, mês, dia da semana; editar com crontab -e.',
    'Cmdlets Verbo-Substantivo; Where-Object com $_ e -eq; Get-Member mostra propriedades.',
    'RemoteSigned: locais rodam, baixados precisam de assinatura. AllSigned: todos assinados.',
  ],
};
