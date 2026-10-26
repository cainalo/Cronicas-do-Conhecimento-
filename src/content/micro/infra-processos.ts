// Microaula-piloto: "Processos, memória e serviços" (cap.infra.03, seção processos), pelo modelo da
// auditoria de 24/10/2026 (docs/auditoria/13_EXEMPLO_AULA_MODELO_LINUX_PROCESSOS.md). Cobre todo o
// conteúdo da seção, uma ideia por etapa, cada uma com checagem imediata e recuperação com outro
// exemplo. Fatos conferidos com o texto do capítulo (01-processos-memoria.md). Tabelas com PID são
// exemplos didáticos, não saídas reais. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraProcessos: MicroLesson = {
  id: 'micro.infra.processos',
  chapterId: 'cap.infra.03',
  sectionId: 'processos',
  title: 'Processos, memória e serviços',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você clica duas vezes no ícone do editor de texto e abre duas janelas. O arquivo do programa é um só. O que o sistema precisa acompanhar?',
    options: [
      { text: 'Cada execução em andamento, separadamente', why: 'Isso. O arquivo é um só, mas há duas execuções acontecendo, e o sistema cuida de cada uma. É a diferença entre programa e processo, que vem agora.' },
      { text: 'Só o arquivo, porque o programa é único', why: 'O arquivo é um só, mas as duas janelas funcionam ao mesmo tempo, cada uma com o seu texto. O sistema precisa acompanhar cada execução.' },
      { text: 'Um novo sistema operacional para a segunda janela', why: 'Não. O mesmo sistema operacional administra as duas execuções. Vamos ver como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'computador',
      part: 'Antes de tudo',
      title: 'O computador por dentro: processador, memória e disco',
      goal: 'Saber o papel do processador, da memória RAM e do disco antes de falar de processos.',
      explain:
        'Três peças aparecem em toda esta aula.\n\nO **processador**, também chamado **CPU** (*central processing unit*, unidade central de processamento), é quem **executa as instruções**, uma depois da outra, muito rápido.\n\nA **memória RAM** é onde fica o que está **em uso agora**. É rápida, mas **apaga ao desligar** e tem tamanho limitado.\n\nO **disco** (HD ou SSD) **guarda** arquivos e programas mesmo desligado. É bem maior, mas bem mais lento que a RAM.',
      example: 'Abrir uma planilha: o arquivo sai do **disco**, é carregado na **RAM** e a **CPU** executa as instruções do programa sobre ele.',
      check: {
        kind: 'choice',
        id: 'hw-c',
        prompt: 'O que acontece com o conteúdo da memória RAM quando o computador é desligado?',
        options: [
          { text: 'Apaga; o que precisa durar fica no disco', why: 'Isso. A RAM guarda só o que está em uso; o disco guarda de forma permanente.' },
          { text: 'Fica guardado até a próxima vez', why: 'Quem guarda com o computador desligado é o disco. A RAM apaga.' },
          { text: 'Vai para a CPU', why: 'A CPU executa instruções; ela não guarda os seus arquivos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num escritório: o **arquivo de aço** é o disco (guarda tudo, mas buscar demora), a **mesa** é a RAM (só o que você está usando, ao alcance da mão) e **você trabalhando** é a CPU. No fim do dia, a mesa é esvaziada; o arquivo continua cheio.',
        check: {
          kind: 'sort',
          id: 'hw-r',
          prompt: 'Qual peça faz cada coisa?',
          categories: ['CPU', 'RAM', 'Disco'],
          items: [
            { text: 'Executa as instruções', cat: 0, why: 'O processador executa.' },
            { text: 'Guarda o que está em uso agora', cat: 1, why: 'Memória de trabalho, que apaga ao desligar.' },
            { text: 'Guarda os arquivos com o computador desligado', cat: 2, why: 'Armazenamento permanente.' },
          ],
        },
      },
    },
    {
      id: 'programa-processo',
      part: 'Processos',
      title: 'Programa e processo',
      goal: 'Diferenciar o arquivo do programa de uma execução dele.',
      explain:
        'O **sistema operacional** é o software que administra o computador: decide quem usa o processador, quanta memória cada programa recebe e quem pode acessar o quê.\n\nUm **programa** é o conjunto de instruções guardado num arquivo, no disco. Parado ali, ele não faz nada: é **passivo**.\n\nUm **processo** é o programa **em execução**. Ele tem memória própria, um número de identificação, um dono e um estado. Por isso, **um mesmo programa pode virar vários processos**.',
      example: 'Há um único `editor.exe` instalado. Você abre uma janela, depois outra.\n\n- Programas: **1** (o arquivo `editor.exe`).\n- Processos: **2** (as duas execuções).',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'O arquivo do navegador existe no disco, mas ninguém o abriu hoje. Isso, sozinho, é um processo executando?',
        options: [
          { text: 'Não. É só o programa guardado; o processo surge quando ele é executado', why: 'Exato. Existir no disco não significa estar executando.' },
          { text: 'Sim, porque o arquivo existe', why: 'Existir no disco não é executar. O arquivo parado é o programa; o processo só aparece quando ele roda.' },
          { text: 'Sim, todo arquivo do disco é um processo', why: 'Arquivos guardados são passivos. Processo é execução.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain:
          'Pense numa **receita de bolo** no livro e num **bolo sendo feito** na cozinha.\n\n- A receita no livro é o **programa**: instruções paradas.\n- Cada bolo sendo feito agora é um **processo**: a receita em andamento, com seus ingredientes e etapas.\n\nCom a mesma receita, duas pessoas podem fazer dois bolos ao mesmo tempo.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'O programa `planilha.exe` está instalado e foi aberto 3 vezes. Quantos programas e quantos processos há?',
          options: [
            { text: '1 programa e 3 processos', why: 'Isso. Um arquivo, três execuções.' },
            { text: '3 programas e 1 processo', why: 'Invertido. O arquivo é um só; as execuções são três.' },
            { text: '3 programas e 3 processos', why: 'Abrir de novo não cria outro arquivo de programa; cria outra execução.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'pid',
      part: 'Processos',
      title: 'O número de cada processo: PID',
      goal: 'Usar o PID para distinguir execuções do mesmo programa.',
      explain:
        'O sistema dá a cada processo um número chamado **PID** (do inglês *process identifier*, identificador do processo). É ele que separa uma execução da outra, mesmo quando vieram do mesmo programa.\n\nO PID **não é o nome do programa** e pode mudar de uma execução para outra.',
      example: 'Exemplo didático:\n\n| Programa | PID | Situação |\n|---|---:|---|\n| Editor | 4120 | Em execução |\n| Editor | 4168 | Em execução |\n| Navegador | 5224 | Esperando a rede |',
      check: {
        kind: 'choice',
        id: 'pid-c',
        prompt: 'Na tabela acima, o que diferencia as duas execuções do Editor?',
        options: [
          { text: 'O PID', why: 'Isso. O nome se repete; o PID identifica cada execução.' },
          { text: 'O nome do programa', why: 'O nome é igual nas duas linhas ("Editor"). Quem diferencia é o PID.' },
          { text: 'A situação', why: 'As duas estão "Em execução". A situação pode coincidir; o PID não.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'O PID funciona como a **senha numerada** de um atendimento: várias pessoas podem se chamar "Maria", mas cada senha é única. Quando você quer agir sobre um processo (por exemplo, encerrá-lo), informa o PID.',
        check: {
          kind: 'choice',
          id: 'pid-r',
          prompt: 'Você quer encerrar só uma das três janelas da planilha. O que precisa informar ao sistema?',
          options: [
            { text: 'O PID daquela execução', why: 'Isso. O PID aponta exatamente qual das três.' },
            { text: 'O nome "planilha"', why: 'O nome vale para as três; não diz qual delas.' },
            { text: 'O tamanho do arquivo', why: 'O tamanho do arquivo não identifica execuções.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'thread',
      part: 'Processos',
      title: 'Threads: tarefas dentro do processo',
      goal: 'Saber que threads do mesmo processo compartilham a memória dele.',
      explain:
        'Um processo pode ter uma ou várias **threads** (linhas de execução). Cada thread é uma tarefa que roda **dentro** do processo.\n\nAs threads do mesmo processo **compartilham a memória** dele. Isso torna a troca de dados entre elas rápida, mas exige cuidado quando duas mexem no mesmo dado ao mesmo tempo (problema de **concorrência**).',
      example: 'Num navegador, uma tarefa cuida da tela enquanto outra baixa dados, sem travar o que você vê. É só uma comparação: cada navegador organiza isso do seu jeito.',
      check: {
        kind: 'choice',
        id: 'th-c',
        prompt: 'Duas threads do mesmo processo, em geral:',
        options: [
          { text: 'Compartilham a memória do processo', why: 'Isso. Por isso conversam rápido e precisam de cuidado com concorrência.' },
          { text: 'Têm memórias totalmente separadas, como dois processos', why: 'Separação total é típica entre processos. Threads do mesmo processo compartilham a memória dele.' },
          { text: 'São dois programas diferentes no disco', why: 'Threads não são arquivos; são tarefas dentro de um processo em execução.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Três níveis, do maior para o menor:\n\n1. **Programa**: o arquivo parado.\n2. **Processo**: o programa rodando, com memória própria.\n3. **Thread**: uma tarefa dentro do processo, usando a memória dele.',
        check: {
          kind: 'sort',
          id: 'th-r',
          prompt: 'Classifique cada cartão.',
          categories: ['Programa', 'Processo', 'Thread'],
          items: [
            { text: 'navegador.exe guardado no disco', cat: 0, why: 'Arquivo parado é programa.' },
            { text: 'O navegador aberto agora, PID 5224', cat: 1, why: 'Execução com PID é processo.' },
            { text: 'A tarefa que baixa uma imagem dentro do navegador aberto', cat: 2, why: 'Tarefa dentro do processo é thread.' },
          ],
        },
      },
    },
    {
      id: 'estados',
      part: 'Processos',
      title: 'Pronto, executando e bloqueado',
      goal: 'Distinguir os três estados principais de um processo.',
      explain:
        'Um processo não usa o processador o tempo todo. Ele passa por **estados**:\n\n| Estado | Em palavras simples |\n|---|---|\n| **Pronto** | Tem tudo para rodar; só espera a vez de usar a CPU. |\n| **Executando** | Está usando a CPU neste instante. |\n| **Bloqueado** | Espera um acontecimento, como a leitura do disco ou a resposta da rede. |\n\nA diferença que mais cai: **pronto espera a CPU**; **bloqueado espera um evento**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Um processo pediu dados do disco e ainda espera a resposta. Em que estado ele está?',
        options: [
          { text: 'Bloqueado', why: 'Isso. Ele espera um evento (a leitura do disco), não a CPU.' },
          { text: 'Pronto', why: 'Pronto é quem só espera a vez na CPU. Este espera o disco, então está bloqueado.' },
          { text: 'Executando', why: 'Enquanto espera o disco, ele não está usando a CPU.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Imagine uma repartição:\n\n- **Pronto**: você está na fila, com todos os documentos, esperando ser chamado. Só falta a vez.\n- **Executando**: você está sendo atendido agora.\n- **Bloqueado**: o atendente pediu um documento que está chegando pelo correio. Mesmo que chamem você, não adianta: você espera o documento.',
        check: {
          kind: 'sort',
          id: 'es-r',
          prompt: 'Em que estado está cada processo?',
          categories: ['Pronto', 'Executando', 'Bloqueado'],
          items: [
            { text: 'Tem tudo, só aguarda a vez na CPU', cat: 0, why: 'Só falta a CPU: pronto.' },
            { text: 'Está usando a CPU neste momento', cat: 1, why: 'Usando a CPU: executando.' },
            { text: 'Aguarda a resposta de um servidor na rede', cat: 2, why: 'Espera um evento externo: bloqueado.' },
          ],
        },
      },
    },
    {
      id: 'escalonador',
      part: 'Processos',
      title: 'Quem decide a vez: o escalonador',
      goal: 'Entender escalonamento preemptivo, troca de contexto e os estados novo e terminado.',
      explain:
        'Além dos três estados, há o começo e o fim: **novo** (sendo criado) e **terminado** (encerrou e espera a liberação dos recursos).\n\nO **escalonador** é a parte do sistema que escolhe **qual processo pronto vai para a CPU**. Windows e Linux usam escalonamento **preemptivo**: o sistema pode **tirar a CPU** de um processo (porque a fatia de tempo dele acabou ou chegou alguém mais prioritário), sem esperar que ele a devolva.\n\nTrocar um processo por outro na CPU chama-se **troca de contexto**.',
      check: {
        kind: 'choice',
        id: 'esc-c',
        prompt: 'Quem escolhe qual processo pronto passa a usar a CPU?',
        options: [
          { text: 'O escalonador do sistema operacional', why: 'Isso.' },
          { text: 'O próprio processo, quando quiser', why: 'Em sistema preemptivo, a decisão é do escalonador, não do processo.' },
          { text: 'O usuário, clicando na janela', why: 'Clicar muda o foco da tela, não a decisão de uso da CPU.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '"Preemptivo" vem de *preempt*, passar à frente. O sistema pode **interromper** quem está usando a CPU para dar a vez a outro, como um juiz que controla o tempo de fala de cada pessoa numa sessão.',
        check: {
          kind: 'tf',
          id: 'esc-r',
          prompt: 'No escalonamento preemptivo, o sistema só troca de processo quando o processo atual libera a CPU por vontade própria.',
          answer: false,
          why: 'É o contrário: no preemptivo o sistema pode retirar a CPU do processo.',
        },
      },
    },
    {
      id: 'zumbi',
      part: 'Processos',
      title: 'Processo zumbi',
      goal: 'Reconhecer o que é um processo zumbi no Linux.',
      explain:
        'No Linux, todo processo tem um **processo pai** (quem o criou). Quando um processo termina, deixa um **código de saída** para o pai ler.\n\nSe o processo já terminou, mas o pai **ainda não leu** esse código, ele vira um **zumbi** (aparece com a letra `Z` no `ps`). O zumbi **não usa CPU**: ocupa só uma linha na tabela de processos.',
      check: {
        kind: 'choice',
        id: 'zu-c',
        prompt: 'Um processo zumbi é aquele que:',
        options: [
          { text: 'Já terminou, mas o pai ainda não leu o código de saída', why: 'Isso.' },
          { text: 'Está consumindo 100% da CPU', why: 'O zumbi não usa CPU; ele já terminou.' },
          { text: 'Está bloqueado esperando o disco', why: 'Esperar o disco é estado bloqueado, de quem ainda está vivo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como um funcionário que já foi embora, mas cujo nome continua na lista de presença porque o chefe ainda não assinou a saída. Não trabalha mais (não usa CPU), só ocupa uma linha da lista.',
        check: {
          kind: 'tf',
          id: 'zu-r',
          prompt: 'Um processo zumbi ainda consome bastante CPU.',
          answer: false,
          why: 'Ele já terminou; só ocupa uma entrada na tabela de processos.',
        },
      },
    },
    {
      id: 'observar',
      part: 'Processos',
      title: 'Observar processos no Linux: ps e top',
      goal: 'Escolher entre ps e top.',
      explain:
        'Antes de agir sobre um processo, **observe**.\n\nNo Linux, isso se faz no **terminal**: uma janela de texto onde você digita **comandos** (ordens escritas) e lê a resposta.\n\n- `ps aux` (ou `ps -ef`): lista os processos **naquele instante**, com PID, dono, uso de CPU e memória. É uma **foto**.\n- `top` (ou `htop`, se estiver instalado): mostra os processos **atualizando sem parar**. É um **vídeo**.',
      check: {
        kind: 'choice',
        id: 'ob-c',
        prompt: 'Você quer acompanhar o uso de CPU mudando enquanto investiga uma lentidão. Qual comando serve melhor?',
        options: [
          { text: 'top', why: 'Isso. O top atualiza continuamente.' },
          { text: 'ps aux', why: 'O ps mostra uma foto do momento. Para acompanhar mudando, o top é melhor.' },
          { text: 'Abrir o arquivo do programa no disco', why: 'O arquivo é o programa parado; ele não mostra o processo nem o uso de CPU.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre: **ps = foto**, **top = vídeo**. Para anexar a lista de um momento a um relatório, use a foto. Para ver o que muda enquanto você olha, use o vídeo.',
        check: {
          kind: 'choice',
          id: 'ob-r',
          prompt: 'Você quer guardar num arquivo a lista de processos deste exato momento para anexar ao relatório. Qual comando?',
          options: [
            { text: 'ps aux', why: 'Isso. A foto do momento.' },
            { text: 'top', why: 'O top é interativo e fica atualizando; para uma lista do momento, o ps é o natural.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'encerrar',
      part: 'Processos',
      title: 'Encerrar com cuidado: kill e kill -9',
      goal: 'Saber que kill envia SIGTERM e kill -9 envia SIGKILL.',
      explain:
        'O comando `kill` envia um **sinal** (um aviso) a um processo, informado pelo PID.\n\n- `kill PID`, sem opção, envia **SIGTERM** (número 15): um **pedido** de término. O programa pode tratá-lo: salvar dados, fechar arquivos e sair.\n- `kill -9 PID` envia **SIGKILL** (número 9): encerramento **forçado**, que o processo **não pode capturar nem ignorar**.\n\nRegra prática: tente primeiro `kill PID`. Use `kill -9` só se o processo não responder.',
      example: 'Outros sinais e atalhos: `kill -HUP PID` (SIGHUP, 1) faz muitos serviços **recarregarem a configuração**. `pkill nome` e `killall nome` enviam o sinal pelo **nome** do programa, em vez do PID.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'Qual tentativa deve vir primeiro, para o programa ter chance de fechar direito?',
        options: [
          { text: 'kill PID (SIGTERM)', why: 'Isso. É o pedido educado de término.' },
          { text: 'kill -9 PID (SIGKILL)', why: 'O -9 força o fim sem dar chance de salvar. Fica para quando o processo não responde.' },
          { text: 'kill -HUP PID', why: 'O HUP costuma pedir para recarregar a configuração, não para encerrar.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em pedir para alguém sair da sala (**SIGTERM**: a pessoa pega as coisas e sai) versus tirá-la à força (**SIGKILL**: sai na hora, sem pegar nada). Primeiro se pede.',
        check: {
          kind: 'order',
          id: 'en-r',
          prompt: 'Coloque os passos na ordem certa para encerrar um processo travado.',
          items: ['Identificar o PID com ps ou top', 'Enviar kill PID (SIGTERM)', 'Observar se o processo terminou', 'Só se não responder, usar kill -9 PID'],
          why: 'Identificar, pedir, conferir e só então forçar.',
        },
      },
    },
    {
      id: 'prioridade',
      part: 'Processos',
      title: 'Prioridade: nice e renice',
      goal: 'Ler a escala do nice (-20 a 19).',
      explain:
        'O valor **nice** ajusta a prioridade de um processo no Linux. Ele vai de **-20** (mais prioritário) a **19** (menos prioritário).\n\n"Nice" quer dizer "gentil": quanto **maior** o número, mais o processo **cede a vez** aos outros.\n\n- `nice -n 10 comando`: inicia já com nice 10.\n- `renice`: altera a prioridade de um processo que já está rodando.\n\nSó o **root** (o administrador) pode **reduzir** o valor, ou seja, dar mais prioridade.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Qual valor nice dá a MAIOR prioridade?',
        options: [
          { text: '-20', why: 'Isso. Quanto menor, menos "gentil" e mais prioritário.' },
          { text: '19', why: '19 é o mais gentil: o que mais cede a vez, ou seja, a menor prioridade.' },
          { text: '0', why: '0 é o valor do meio, o padrão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Escala: **-20 ... 0 ... 19**. Mais à esquerda, mais prioridade. Para um trabalho demorado atrapalhar menos os outros, aumente o nice (vá para a direita).',
        check: {
          kind: 'choice',
          id: 'pr-r',
          prompt: 'Um usuário comum quer rodar um backup demorado atrapalhando o mínimo. Qual comando?',
          options: [
            { text: 'nice -n 19 backup.sh', why: 'Isso. Menor prioridade, e qualquer usuário pode aumentar o nice.' },
            { text: 'nice -n -20 backup.sh', why: 'Isso daria a maior prioridade, e só o root pode fazer.' },
            { text: 'kill -9 backup.sh', why: 'kill encerra processos; não ajusta prioridade.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'segundo-plano',
      part: 'Processos',
      title: 'Primeiro e segundo plano no terminal',
      goal: 'Usar &, jobs, bg, fg, Ctrl+Z e nohup.',
      explain:
        'No terminal do Linux:\n\n- `comando &` roda o comando em **segundo plano** e libera o terminal.\n- `jobs` lista as tarefas do terminal.\n- `Ctrl+Z` **suspende** (pausa) a tarefa que está em primeiro plano.\n- `bg` continua uma tarefa suspensa **em segundo plano**; `fg` a traz para o **primeiro plano**.\n- `nohup comando &` mantém o comando rodando **depois que a sessão termina** (por exemplo, ao fechar a conexão SSH, o acesso remoto por terminal a outro computador).',
      check: {
        kind: 'choice',
        id: 'sp-c',
        prompt: 'Você vai fechar a conexão com o servidor, mas quer que o script continue rodando. Qual comando?',
        options: [
          { text: 'nohup script.sh &', why: 'Isso. O nohup mantém o comando vivo depois do fim da sessão.' },
          { text: 'script.sh &', why: 'O & libera o terminal, mas o comando pode ser encerrado quando a sessão terminar.' },
          { text: 'fg script.sh', why: 'fg traz uma tarefa para o primeiro plano; não protege do fim da sessão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**&** = "rode lá atrás enquanto eu uso o terminal". **nohup** = "continue mesmo se eu desligar". Ctrl+Z pausa; bg e fg retomam (atrás ou na frente).',
        check: {
          kind: 'sort',
          id: 'sp-r',
          prompt: 'O que faz cada um?',
          categories: ['Pausa', 'Retoma', 'Sobrevive ao fim da sessão'],
          items: [
            { text: 'Ctrl+Z', cat: 0, why: 'Suspende a tarefa em primeiro plano.' },
            { text: 'fg', cat: 1, why: 'Retoma em primeiro plano.' },
            { text: 'bg', cat: 1, why: 'Retoma em segundo plano.' },
            { text: 'nohup comando &', cat: 2, why: 'Continua depois que a sessão termina.' },
          ],
        },
      },
    },
    {
      id: 'windows',
      part: 'Processos',
      title: 'Processos no Windows',
      goal: 'Relacionar as ferramentas do Windows às do Linux.',
      explain:
        'No Windows:\n\n- **Gerenciador de Tarefas** (`Ctrl+Shift+Esc`): processos, desempenho, usuários, serviços e programas que iniciam com o sistema.\n- No Prompt de Comando: `tasklist` lista; `taskkill /PID 1234 /F` encerra à força; `taskkill /IM notepad.exe` encerra pelo nome.\n- No PowerShell: `Get-Process` lista (tem o apelido `ps`); `Stop-Process -Id 1234` ou `Stop-Process -Name notepad` encerra.',
      example: '| Objetivo | Linux | Windows |\n|---|---|---|\n| Listar ou observar | `ps`, `top` | Gerenciador de Tarefas, `tasklist`, `Get-Process` |\n| Encerrar | `kill PID` | `taskkill /PID`, `Stop-Process -Id` |\n\nAs ferramentas não são idênticas em tudo: opções e permissões mudam.',
      check: {
        kind: 'choice',
        id: 'win-c',
        prompt: 'No PowerShell, qual comando lista os processos?',
        options: [
          { text: 'Get-Process', why: 'Isso.' },
          { text: 'Stop-Process', why: 'Stop-Process encerra; para listar é Get-Process.' },
          { text: 'kill -9', why: 'Esse é o comando do Linux para encerrar à força.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No PowerShell, os comandos têm a forma **Verbo-Substantivo**: *Get* (obter) **-Process** lista; *Stop* (parar) **-Process** encerra. No Prompt antigo: **tasklist** lista e **taskkill** encerra.',
        check: {
          kind: 'sort',
          id: 'win-r',
          prompt: 'Para que serve cada comando?',
          categories: ['Listar', 'Encerrar'],
          items: [
            { text: 'tasklist', cat: 0, why: 'Lista processos.' },
            { text: 'Get-Process', cat: 0, why: 'Lista processos no PowerShell.' },
            { text: 'taskkill /PID 1234 /F', cat: 1, why: 'Encerra à força pelo PID.' },
            { text: 'Stop-Process -Name notepad', cat: 1, why: 'Encerra pelo nome no PowerShell.' },
          ],
        },
      },
    },
    {
      id: 'memoria-virtual',
      part: 'Memória',
      title: 'Memória virtual e páginas',
      goal: 'Explicar memória virtual, paginação e o papel da MMU.',
      explain:
        'A **memória principal** (RAM) é dividida entre o sistema e os processos. Os sistemas modernos usam **memória virtual**: cada processo enxerga um espaço de endereços **próprio e contínuo**, e o sistema faz a ligação com a RAM de verdade.\n\nEssa ligação é feita em blocos de tamanho fixo chamados **páginas** (técnica de **paginação**). Quem traduz o endereço virtual para o físico é a **MMU**, uma unidade do processador.\n\nGanhos: **isolamento** (um processo não lê a memória de outro) e usar **mais memória do que a RAM** disponível.',
      check: {
        kind: 'multi',
        id: 'mv-c',
        prompt: 'O que a memória virtual traz? Marque todas.',
        options: [
          { text: 'Isolamento entre processos', correct: true, why: 'Cada processo enxerga só o seu espaço.' },
          { text: 'Usar mais memória do que a RAM disponível', correct: true, why: 'Parte das páginas pode ficar no disco.' },
          { text: 'Deixar a RAM mais rápida', correct: false, why: 'A velocidade da RAM não muda; muda a organização.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **arquivo de escritório**: cada servidor tem as suas **pastas numeradas de 1 em diante** (endereços virtuais), e o arquivista (a **MMU**) sabe em que gaveta real (RAM) cada pasta está. Pastas pouco usadas podem ir para o depósito (disco).',
        check: {
          kind: 'tf',
          id: 'mv-r',
          prompt: 'Na paginação, a memória é dividida em blocos de tamanho fixo chamados páginas.',
          answer: true,
          why: 'É exatamente isso que a paginação faz.',
        },
      },
    },
    {
      id: 'swap',
      part: 'Memória',
      title: 'Falta de página, swap e thrashing',
      goal: 'Reconhecer page fault, swap e thrashing, e como diagnosticar.',
      explain:
        '| Termo | Significado |\n|---|---|\n| **Falta de página** (*page fault*) | O processo acessou uma página que não está na RAM; o sistema a busca no disco. |\n| **Swap** (Linux) / **arquivo de paginação** (Windows, `pagefile.sys`) | Área no disco que recebe páginas tiradas da RAM. |\n| **Thrashing** | O sistema passa mais tempo trocando páginas entre RAM e disco do que executando. Indica **falta de memória física**. |\n\nPara diagnosticar no Linux: `free -h` (RAM e swap), `vmstat` e `top`. No Windows: a aba Desempenho do Gerenciador de Tarefas e o Monitor de Recursos.',
      check: {
        kind: 'choice',
        id: 'sw-c',
        prompt: 'O sistema passa mais tempo trocando páginas entre RAM e disco do que executando, e tudo fica lento. Como se chama isso?',
        options: [
          { text: 'Thrashing', why: 'Isso. Sinal de memória física insuficiente.' },
          { text: 'Page fault', why: 'Uma falta de página é um evento isolado e normal. O excesso delas, travando o sistema, é thrashing.' },
          { text: 'Processo zumbi', why: 'Zumbi é processo que terminou; não tem a ver com troca de páginas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma **falta de página** de vez em quando é normal: é buscar uma pasta no depósito. **Thrashing** é quando o arquivista passa o dia todo indo e voltando do depósito e ninguém consegue trabalhar. A causa é ter gavetas (RAM) de menos.',
        check: {
          kind: 'choice',
          id: 'sw-r',
          prompt: 'O monitoramento mostra swap quase cheia, disco muito ativo e tudo lento. Isso indica, principalmente:',
          options: [
            { text: 'Falta de memória física (RAM)', why: 'Isso. É o quadro do thrashing.' },
            { text: 'Excesso de memória livre', why: 'É o contrário: memória de menos.' },
            { text: 'Rede lenta', why: 'Os sinais (swap cheia, disco ativo) apontam para memória.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'servicos',
      part: 'Serviços',
      title: 'Serviços: start não é enable',
      goal: 'Diferenciar iniciar agora (start) de iniciar no boot (enable).',
      explain:
        '**Serviços** (no Linux também chamados *daemons*) são processos que rodam em **segundo plano**, em geral desde que o sistema liga (o **boot**): servidor web, banco de dados, acesso remoto.\n\nNo Linux, quem cuida deles costuma ser o **systemd**, o gerenciador de serviços:\n\n| Ação | Comando |\n|---|---|\n| Ver estado | `systemctl status nginx` |\n| Ligar agora / desligar agora | `systemctl start nginx` / `systemctl stop nginx` |\n| Reiniciar | `systemctl restart nginx` |\n| Subir no próximo boot | `systemctl enable nginx` |\n| Não subir no boot | `systemctl disable nginx` |\n| Ver registros (logs) | `journalctl -u nginx` |\n\nAtenção: **start** liga agora; **enable** faz subir no boot. Um não implica o outro. `enable --now` faz os dois.',
      check: {
        kind: 'choice',
        id: 'sv-c',
        prompt: 'Qual comando faz o serviço nginx subir automaticamente no próximo boot?',
        options: [
          { text: 'systemctl enable nginx', why: 'Isso. enable configura o boot.' },
          { text: 'systemctl start nginx', why: 'start liga agora, mas não garante o próximo boot.' },
          { text: 'systemctl status nginx', why: 'status só mostra o estado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**start** é acender a luz agora. **enable** é programar o timer para acender a luz toda vez que a casa ligar. Dá para fazer os dois de uma vez com `enable --now`.',
        check: {
          kind: 'choice',
          id: 'sv-r',
          prompt: 'Quer ligar o nginx agora E garantir que ele suba no boot, com um só comando:',
          options: [
            { text: 'systemctl enable --now nginx', why: 'Isso: enable mais start de uma vez.' },
            { text: 'systemctl restart nginx', why: 'restart reinicia agora; não mexe no boot.' },
            { text: 'journalctl -u nginx', why: 'journalctl mostra os registros.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'servicos-windows',
      part: 'Serviços',
      title: 'Serviços no Windows e contas de administrador',
      goal: 'Usar Get-Service/Start-Service/Set-Service e reconhecer root, sudo e UAC.',
      explain:
        'No Windows (PowerShell): `Get-Service -Name Spooler` mostra o estado; `Start-Service`, `Stop-Service` e `Restart-Service` ligam, desligam e reiniciam; `Set-Service -Name X -StartupType Automatic` (ou `Disabled`) define se sobe com o sistema. O console gráfico de serviços é o `services.msc`; os registros ficam no Visualizador de Eventos (`eventvwr.msc`).\n\nContas de administrador: no Linux, o superusuário é o **root** (UID 0) e usuários autorizados usam `sudo` para comandos administrativos. No Windows, a elevação passa pelo **Controle de Conta de Usuário** (UAC).',
      check: {
        kind: 'choice',
        id: 'sw2-c',
        prompt: 'No Windows, qual comando faz um serviço iniciar automaticamente com o sistema?',
        options: [
          { text: 'Set-Service -Name X -StartupType Automatic', why: 'Isso. É o "enable" do Windows.' },
          { text: 'Start-Service -Name X', why: 'Liga agora, como o start do Linux; não define o boot.' },
          { text: 'Get-Service -Name X', why: 'Só mostra o estado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Mesma lógica do Linux: **Start-Service** = ligar agora; **Set-Service -StartupType Automatic** = subir no boot. E quem pode fazer isso? Administradores: **root/sudo** no Linux, **UAC** no Windows.',
        check: {
          kind: 'sort',
          id: 'sw2-r',
          prompt: 'Cada item é de qual sistema?',
          categories: ['Linux', 'Windows'],
          items: [
            { text: 'sudo e root (UID 0)', cat: 0, why: 'Administração no Linux.' },
            { text: 'UAC (Controle de Conta de Usuário)', cat: 1, why: 'Elevação no Windows.' },
            { text: 'journalctl -u nginx', cat: 0, why: 'Logs do systemd.' },
            { text: 'services.msc', cat: 1, why: 'Console de serviços do Windows.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'O protocolo eletrônico do Tribunal ficou lento. Ponha a investigação na ordem.',
      items: ['Rodar top e ver quem usa CPU e memória', 'Anotar o PID do processo de relatório travado', 'Enviar kill PID (SIGTERM)', 'Se não responder, usar kill -9 PID', 'Conferir com systemctl status que o serviço continua ativo'],
      why: 'Observar, identificar, pedir o término, forçar só se preciso e verificar o serviço.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'Um programa aberto duas vezes gera, em geral, dois processos', correct: true, why: 'Um arquivo, duas execuções.' },
        { text: 'Threads de um mesmo processo compartilham a memória dele', correct: true, why: 'Por isso conversam rápido e exigem cuidado com concorrência.' },
        { text: 'kill PID, sem opção, envia SIGKILL', correct: false, why: 'O padrão é SIGTERM (15). SIGKILL é o 9.' },
        { text: 'Um processo bloqueado espera a CPU', correct: false, why: 'Quem espera a CPU está pronto; o bloqueado espera um evento.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou como deixar o nginx funcionando também depois de reiniciar o servidor. Toque na linha errada.',
      lines: ['systemctl status nginx', 'systemctl start nginx   # liga agora', 'systemctl start nginx   # garante no próximo boot'],
      bug: 2,
      why: 'Para subir no boot, o comando é enable, não start.',
      fixed: 'systemctl enable nginx   # garante no próximo boot',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'Qual das duas condutas é a adequada para encerrar um serviço que trava de vez em quando?',
      scenarios: [
        { title: 'Conduta A', body: '```\nkill -9 4120\n```\nDireto ao forçado, sempre.' },
        { title: 'Conduta B', body: '```\nkill 4120\n# espera e confere\nkill -9 4120   # só se não responder\n```' },
      ],
      answer: 1,
      why: 'A conduta B dá ao programa a chance de salvar dados com o SIGTERM e só força se for preciso.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: um processo tem nice 5. O administrador quer que ele tenha MAIS prioridade. Para qual valor ele pode mudar?',
      options: [
        { text: '-5', why: 'Isso. Menor valor, mais prioridade (e só o root pode reduzir).' },
        { text: '15', why: '15 é mais "gentil": menos prioridade.' },
        { text: '25', why: 'A escala vai só até 19.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.003' },
  ],
  summary: [
    'Programa é o arquivo parado; processo é a execução, identificada pelo PID.',
    'Threads são tarefas dentro do processo e compartilham a memória dele.',
    'Pronto espera a CPU; bloqueado espera um evento. O escalonador (preemptivo) decide a vez.',
    'ps é foto, top é vídeo. kill PID pede (SIGTERM); kill -9 força (SIGKILL).',
    'nice vai de -20 (mais prioridade) a 19 (menos). nohup mantém o comando depois da sessão.',
    'Memória virtual dá isolamento; thrashing indica falta de RAM.',
    'start liga agora; enable sobe no boot. No Windows: Start-Service e Set-Service -StartupType.',
  ],
  vocab: [
    { term: 'CPU', match: '\\bCPU\\b|processador', step: 'computador' },
    { term: 'RAM', match: '\\bRAM\\b', step: 'computador' },
    { term: 'PID', match: '\\bPID\\b', step: 'pid' },
    { term: 'thread', match: '\\bthreads?\\b', step: 'thread' },
    { term: 'escalonador', match: 'escalonador|preemptiv', step: 'escalonador' },
    { term: 'zumbi', match: 'zumbi', step: 'zumbi' },
    { term: 'sinais de término', match: 'SIG(TERM|KILL)|\\bkill\\b', step: 'encerrar' },
    { term: 'nice', match: '\\bnice\\b|renice', step: 'prioridade' },
    { term: 'segundo plano', match: 'segundo plano', step: 'segundo-plano' },
    { term: 'memória virtual', match: 'memória virtual|\\bMMU\\b|paginação', step: 'memoria-virtual' },
    { term: 'swap e thrashing', match: 'swap|thrashing|falta de página', step: 'swap' },
    { term: 'serviços do Linux', match: 'daemon|systemd|systemctl', step: 'servicos' },
  ],
};
