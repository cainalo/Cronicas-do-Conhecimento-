# Modelo de aula: Processos no Linux e Windows

**Propósito:** demonstrar o novo ritmo de ensino usando um tema que o estudante relatou como confuso. Isto é uma especificação pedagógica para pilotar, não uma tentativa de cobrir em poucas telas todo o capítulo técnico.

## Abertura — problema concreto

**Professor:** “Você clica duas vezes no ícone do editor de texto. O arquivo do programa é o mesmo, mas agora duas janelas estão abertas. O que o sistema precisa acompanhar para cada execução?”

Opções: (A) Só um arquivo, pois o programa é único. (B) Cada execução em andamento como uma instância separada. (C) Um novo sistema operacional.

**Feedback esperado:** a melhor resposta é B. O arquivo do programa continua sendo o mesmo; o sistema precisa administrar cada execução em andamento. Essa ideia prepara a diferença entre programa e processo.

## Microetapa 1 — programa e processo

**Explicação:** um **programa** é o conjunto de instruções guardado num arquivo. Enquanto está apenas armazenado, não está usando CPU para executar aquelas instruções. Um **processo** é uma execução desse programa, com estado e recursos que o sistema operacional administra. Por isso, um mesmo programa pode originar mais de um processo.

**Exemplo guiado:** existe um único `editor.exe` instalado. Você abre uma janela, depois abre outra instância. O arquivo instalado continua um; o sistema pode estar administrando duas instâncias em execução.

**Checagem imediata:** “O arquivo do navegador existe no disco, mas ninguém o abriu. Isso, sozinho, é um processo executando?”

- Correta: não. O arquivo é o programa; executar cria um processo.
- Distrator plausível: sim, pois o arquivo existe. Feedback: existir no disco não significa que instruções estejam sendo executadas.

**Recuperação se errar:** mostrar duas figuras lado a lado: arquivo fechado versus processo em execução; repetir a pergunta com um aplicativo diferente. Não avançar diretamente para PID, thread e escalonamento.

## Microetapa 2 — PID e múltiplas instâncias

**Explicação:** o sistema dá a cada processo um identificador chamado **PID** (*process identifier*). Ele permite distinguir uma execução de outra, mesmo que tenham vindo do mesmo programa. O PID não é o nome do programa, e pode mudar entre execuções.

**Demonstração:** apresente uma tabela fictícia rotulada como exemplo didático:

| Programa | PID de exemplo | Situação |
|---|---:|---|
| Editor | 4120 | Em execução |
| Editor | 4168 | Em execução |
| Navegador | 5224 | Aguardando rede |

**Checagem:** “Qual campo diferencia as duas execuções do Editor nesta tabela?” Resposta: PID. Feedback explica que o nome do programa pode repetir; o PID identifica a instância atual.

## Microetapa 3 — processo e thread

**Explicação:** um processo pode conter uma ou várias **threads**, que são fluxos de execução dentro do processo. Em geral, threads do mesmo processo compartilham seu espaço de memória, embora cada thread tenha seu próprio estado de execução e pilha. Isso pode melhorar a concorrência, mas exige cuidado quando várias threads alteram o mesmo dado.

**Exemplo trabalhado:** num navegador, uma tarefa pode tratar a interface e outra trabalhar com dados em segundo plano. Isso é apenas uma analogia didática; detalhes da implementação variam conforme o navegador.

**Checagem:** “Duas threads do mesmo processo normalmente usam espaços de memória totalmente independentes?” Não; compartilham a memória do processo. Feedback: diferenciar thread de processo, sem sugerir que absolutamente todo estado é compartilhado.

**Recuperação:** pedir ao aluno que classifique três cartões: arquivo de programa, processo do navegador e thread de trabalho.

## Microetapa 4 — estados básicos

**Explicação em uma tabela pequena:**

| Estado | Em palavras simples |
|---|---|
| Pronto | Pode executar, mas espera sua vez de usar a CPU. |
| Executando | Está usando a CPU naquele momento. |
| Bloqueado | Espera algo, como leitura de disco ou resposta da rede. |

A lista completa pode introduzir criação/novo e término depois, mas primeiro o aluno precisa distinguir estas três ideias.

**Pergunta visual:** “Uma tarefa pediu dados do disco e ainda espera a resposta. Qual estado descreve melhor essa espera?” Bloqueado. Mostrar por que “pronto” não significa “esperando qualquer coisa”: pronto espera CPU; bloqueado espera um evento.

## Microetapa 5 — observar antes de encerrar

**Ideia:** antes de finalizar um processo, identifique-o e observe seu consumo. No Linux, `ps` mostra uma lista em determinado instante; `top` permite observar e atualizar os dados continuamente. No Windows, Gerenciador de Tarefas e `Get-Process` cumprem tarefas parecidas, embora as colunas e formatos sejam diferentes.

**Checagem de decisão:** “Você quer observar os processos mudando enquanto investiga lentidão. Qual ferramenta é mais adequada: `ps` ou `top`?” A resposta didática esperada é `top`, porque atualiza continuamente. Feedback pode esclarecer que `ps` também é útil, mas normalmente é uma fotografia da lista no momento em que roda.

## Microetapa 6 — encerrar um processo no Linux com cuidado

**Explicação:** `kill PID`, sem opção de sinal, normalmente envia `SIGTERM` — um pedido de término que o programa pode tratar. `kill -9 PID` envia `SIGKILL`, que força o encerramento e não pode ser capturado pelo processo. Usar o encerramento forçado sem necessidade pode impedir que o programa finalize tarefas ou salve dados.

**Sequência de decisão:** identificar PID → tentar encerramento normal → observar resultado → usar encerramento forçado só se for justificado.

**Checagem:** “Qual tentativa deve vir primeiro quando se quer dar ao programa chance de fechar corretamente?” `SIGTERM`/`kill PID`. O feedback explica o contraste; não cobrar sinais adicionais agora.

## Microetapa 7 — aproximar Linux e Windows

Mostrar um quadro de comparação apenas depois de os conceitos estarem claros:

| Objetivo | Linux | Windows |
|---|---|---|
| Listar/observar | `ps`, `top` | Gerenciador de Tarefas, `Get-Process` |
| Encerrar | `kill PID` / sinais | `Stop-Process`, `taskkill` |

A comparação não deve fingir equivalência exata entre todos os comandos. O comportamento depende de permissões, parâmetros e contexto; a aula aprofunda as exceções depois.

**Checagem de discriminação:** mostrar um objetivo e pedir que o aluno escolha uma ferramenta de cada sistema; feedback explica o porquê.

## Microetapa 8 — consolidar antes de avançar

O aluno resolve uma atividade de ordenar:

1. Identificar o processo correto.
2. Observar estado/consumo.
3. Escolher um encerramento adequado.
4. Verificar se o serviço/aplicação continua funcionando.

Depois, responder uma questão autoral no estilo da banca, marcada como **autoral e não validada pela banca**, com explicação por alternativa. Essa questão pode misturar programa/processo/PID, porque esses conceitos já foram ensinados.

## O que não deve acontecer

- Não colocar processo, thread, cinco estados, oito comandos Linux, cinco comandos Windows, paginação, swap, thrashing, MMU e serviços systemd em uma única tela.
- Não encerrar a matéria com três perguntas V/F genéricas que testam só reconhecimento.
- Não obrigar uma cena medieval longa antes de cada conceito.
- Não separar a aula completa em um “resumo de 70 palavras” e um texto independente difícil.
- Não tratar um erro como fracasso; explicar a confusão e ensinar de outra forma.

## Como avaliar o piloto

- O estudante consegue explicar programa versus processo com palavras próprias?
- Consegue usar PID para distinguir duas instâncias?
- Distingue pronto, executando e bloqueado?
- Escolhe uma ferramenta para observar processos?
- Distingue pedido normal de término e encerramento forçado?
- O feedback resolve a confusão ou apenas mostra o gabarito?
- Ao sair em qualquer microetapa e apertar Continuar, retoma exatamente onde estava?
- O layout mostra o conteúdo sem rolagem dentro da página do livro?

Expandir o padrão para outras seções somente depois de revisão editorial e teste de compreensão do piloto.
