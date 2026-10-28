// Cenário "Primeiro dia no suporte" (Fase 6; spec 21). Aplica só o que a aula de Processos, memória e
// serviços ensina: top, free -h, vmstat, swap/thrashing, kill e nice. Pessoas, máquinas e números são
// fictícios. Revisão editorial humana: pendente.
import type { Scenario } from '@/lib/scenario';

export const cenarioSuporteLento: Scenario = {
  id: 'cen.suporte-lento',
  version: 2,
  title: 'Primeiro dia no suporte: o servidor lento',
  summary: 'O servidor de relatórios ficou lento. Colha sinais, forme a hipótese certa e resolva sem estragar nada.',
  setting: 'Sala de suporte de TI, segunda-feira, 9h10',
  topicIds: ['ti.infra.so'],
  requires: [{ chapterId: 'cap.infra.03', sectionId: 'processos', label: 'Processos, memória e serviços' }],
  prerequisiteConceptIds: ['c.so.processo', 'c.so.pid', 'c.so.ps-top', 'c.so.swap', 'c.so.thrashing', 'c.so.sinais', 'c.so.nice', 'c.so.zumbi'],
  estimatedMinutes: 8,
  review: 'nao-revisado',
  characters: [
    { id: 'marta', name: 'Marta', role: 'coordenadora do suporte (personagem fictícia)', tone: 'teal' },
    { id: 'joao', name: 'João', role: 'analista do setor de relatórios (personagem fictício)', tone: 'ember' },
  ],
  evidence: [
    {
      id: 'ev.chamado',
      title: 'Chamado 2318',
      body: 'Servidor: relat-01 (Linux)\nSintoma: telas de relatório levando mais de 2 minutos para abrir desde as 8h30.\nNada foi instalado no fim de semana.',
      hint: 'O chamado conta o sintoma, não a causa. A causa você descobre observando.',
    },
    {
      id: 'ev.top',
      title: 'Saída do top (cabeçalho e 3 primeiros processos)',
      body:
        '%Cpu(s): 12,0 us,  4,1 sy,  0,0 ni,  9,6 id, 74,3 wa\nMiB Mem :  7820,0 total,   96,2 free,  7590,4 used\nMiB Swap:  2048,0 total,  118,0 free,  1930,0 used\n\n  PID USER     %CPU %MEM COMMAND\n 4127 relat     9,8 71,5 importador\n  912 postgres  6,2  9,0 postgres\n 1034 www-data  1,1  2,3 nginx',
      hint: '"wa" é o tempo em que a CPU fica parada esperando o disco. Repare também na memória livre e no swap usado.',
    },
    {
      id: 'ev.vmstat',
      title: 'Saída do vmstat 2 (três amostras)',
      body: 'procs  ----memory----   ---swap--\n r  b   swpd   free     si    so\n 1  6 1976320  98500  4120  3980\n 0  7 1977100  96100  4310  4050\n 1  6 1976800  97300  4005  4120',
      hint: 'swpd e free estão em KiB. si e so são a memória (em KiB por segundo) que entra e sai do swap. Números altos e constantes indicam troca intensa entre RAM e disco.',
    },
    {
      id: 'ev.joao',
      title: 'Recado do João',
      body: 'O importador é a carga mensal de dados. Ele pode ser rodado de novo à noite sem prejuízo; os relatórios de hoje é que não podem esperar.',
    },
    {
      id: 'ev.depois',
      title: 'free -h, dois minutos depois',
      body: '        total   used   free\nMem:    7,6Gi  2,0Gi  5,4Gi\nSwap:   2,0Gi  0,1Gi  1,9Gi',
      hint: 'Com a memória física de volta, o sistema para de trocar páginas e os relatórios voltam a abrir.',
    },
  ],
  entryNodeId: 'n.inicio',
  nodes: [
    {
      id: 'n.inicio',
      speakerId: 'marta',
      objective: 'Escolher a primeira ação.',
      dialogue: 'Bom dia! Seu primeiro chamado: o servidor de relatórios está se arrastando. Antes de mexer em qualquer coisa, o que você faz?',
      evidenceIds: ['ev.chamado'],
      decisions: [
        {
          id: 'd.top',
          label: 'Abrir o top para ver os processos e a memória atualizando',
          feedback: 'Boa escolha. Antes de agir, observe. O top mostra o que muda enquanto você olha.',
          outcome: 'boa',
          nextNodeId: 'n.top',
          conceptIds: ['c.so.ps-top'],
        },
        {
          id: 'd.ps',
          label: 'Rodar ps aux uma vez',
          feedback: 'Serve, mas o ps é uma foto de um instante. Para acompanhar um problema em andamento, o top (o vídeo) mostra mais. A Marta abre o top com você.',
          outcome: 'aceitavel',
          nextNodeId: 'n.top',
          conceptIds: ['c.so.ps-top'],
        },
        {
          id: 'd.reiniciar',
          label: 'Reiniciar o servidor logo de cara',
          feedback: 'Reiniciar sem saber a causa derruba os relatórios de todo mundo e apaga as pistas: o problema pode voltar em minutos. A Marta pede para você observar primeiro.',
          outcome: 'ruim',
          nextNodeId: 'n.inicio',
          conceptIds: ['c.so.ps-top'],
        },
      ],
    },
    {
      id: 'n.top',
      speakerId: 'marta',
      objective: 'Formar a hipótese.',
      dialogue: 'Esta é a tela do top. Junto, rodei o vmstat por alguns segundos. Qual é a sua hipótese?',
      decisions: [
        {
          id: 'd.thrashing',
          label: 'Falta memória física: o sistema está trocando páginas sem parar com o swap (thrashing)',
          feedback: 'Isso. Quase nenhuma RAM livre, swap quase cheio, si e so altos o tempo todo e a CPU parada esperando o disco (wa 74%). O sistema gasta o tempo trocando páginas, não trabalhando.',
          outcome: 'boa',
          nextNodeId: 'n.acao',
          conceptIds: ['c.so.swap', 'c.so.thrashing'],
        },
        {
          id: 'd.cpu',
          label: 'A CPU está no limite por causa de um processo',
          feedback: 'Olhe de novo: o importador usa só 9,8% de CPU, e 74% do tempo a CPU está esperando o disco (wa). O gargalo não é processamento.',
          outcome: 'ruim',
          nextNodeId: 'n.top',
          conceptIds: ['c.so.thrashing'],
        },
        {
          id: 'd.zumbi',
          label: 'Há um processo zumbi travando a máquina',
          feedback: 'Nada na tela indica zumbi, e um zumbi não usa CPU nem segura memória de trabalho: é só a entrada esperando o pai ler o código de saída. Procure quem está ocupando a memória.',
          outcome: 'ruim',
          nextNodeId: 'n.top',
          conceptIds: ['c.so.zumbi'],
        },
      ],
    },
    {
      id: 'n.acao',
      speakerId: 'joao',
      objective: 'Resolver sem estragar nada.',
      dialogue: 'O processo que está ocupando 71,5% da memória é o meu importador (PID 4127). O que vocês vão fazer com ele?',
      evidenceIds: ['ev.joao'],
      decisions: [
        {
          id: 'd.term',
          label: 'Pedir o término com kill 4127 e conferir se ele terminou',
          feedback: 'Boa escolha. kill PID envia SIGTERM, um pedido de término: o importador pode fechar arquivos e conexões direito. Ele pode rodar de novo à noite.',
          outcome: 'boa',
          nextNodeId: 'n.fim',
          conceptIds: ['c.so.sinais'],
        },
        {
          id: 'd.kill9',
          label: 'Encerrar à força com kill -9 4127',
          feedback: 'Resolve, mas pulou um passo. SIGKILL não pode ser capturado: o importador não tem chance de fechar o que estava fazendo. A ordem segura é kill PID primeiro e kill -9 só se ele não responder.',
          outcome: 'aceitavel',
          nextNodeId: 'n.fim',
          conceptIds: ['c.so.sinais'],
        },
        {
          id: 'd.renice',
          label: 'Diminuir a prioridade com renice 19 -p 4127 e deixar rodando',
          feedback: 'O nice muda a vez do processo na CPU, mas não libera memória. Os 71,5% de RAM continuam ocupados e o thrashing segue. Escolha outra ação.',
          outcome: 'ruim',
          nextNodeId: 'n.acao',
          conceptIds: ['c.so.nice', 'c.so.thrashing'],
        },
      ],
    },
    {
      id: 'n.fim',
      speakerId: 'marta',
      terminal: true,
      dialogue: 'O importador terminou, a memória voltou e os relatórios abrem de novo. Chamado resolvido. Vamos combinar com o João de rodar a carga à noite.',
    },
  ],
  principle:
    'Lentidão com memória livre quase zero, swap cheio, si/so altos e CPU esperando o disco (wa alto) é sinal de thrashing: falta memória física. A saída é liberar memória (aqui, encerrar o processo que podia esperar), começando pelo pedido de término (SIGTERM) e deixando o SIGKILL como último recurso. Mudar a prioridade com nice não libera memória.',
};
