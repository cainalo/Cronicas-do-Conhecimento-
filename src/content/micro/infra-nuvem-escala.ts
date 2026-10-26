// Microaula "Escala, disponibilidade e serverless" (cap.infra.02, seção escala), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos e contas
// conferidos com o texto do capítulo (02-escala.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraNuvemEscala: MicroLesson = {
  id: 'micro.infra.nuvem-escala',
  chapterId: 'cap.infra.02',
  sectionId: 'escala',
  title: 'Escala, disponibilidade e serverless',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No último dia de prestação de contas, o sistema recebe dez vezes mais acessos e fica lento. Qual é o caminho mais sustentável?',
    options: [
      { text: 'Pôr mais servidores atrás de um balanceador e tirá-los depois', why: 'Isso. É escala horizontal com elasticidade. Vamos ver cada parte.' },
      { text: 'Pedir aos jurisdicionados que acessem de madrugada', why: 'Não resolve o problema técnico. A infraestrutura precisa acompanhar a demanda.' },
      { text: 'Comprar um único servidor gigante e deixá-lo ligado o ano todo', why: 'Funciona até certo ponto, mas tem limite físico e custa o ano inteiro. Há opções melhores.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'vm-container-serverless',
      part: 'Formas de executar',
      title: 'Máquina virtual, container e serverless',
      goal: 'Comparar as três formas pelo que isolam e quanto o cliente gerencia.',
      explain:
        '| | Máquina virtual | Container | Serverless (FaaS) |\n|---|---|---|---|\n| Isola | SO inteiro sobre um hipervisor | Processos que compartilham o núcleo | Funções executadas sob demanda |\n| Início | Minutos | Segundos | Milissegundos a segundos |\n| O cliente gerencia | SO e tudo acima | Imagem e configuração | **Só o código da função** |\n| Cobrança típica | Tempo ligado | Recursos do cluster | **Por execução** e tempo de execução |',
      check: {
        kind: 'choice',
        id: 'vs-c',
        prompt: 'Em qual das três o cliente gerencia apenas o código?',
        options: [
          { text: 'Serverless (FaaS)', why: 'Isso. O provedor executa a função sob demanda.' },
          { text: 'Container', why: 'No container o cliente cuida da imagem e da configuração.' },
          { text: 'Máquina virtual', why: 'Na VM o cliente cuida do SO e de tudo acima.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Do mais pesado ao mais leve: a **VM** é uma casa inteira (SO completo, minutos para ficar pronta); o **container** é um apartamento (divide o núcleo, segundos); o **serverless** é um **quarto de hotel por noite**: você só aparece com a bagagem (o código) e paga pelo uso.',
        check: {
          kind: 'sort',
          id: 'vs-r',
          prompt: 'Qual forma de execução?',
          categories: ['Máquina virtual', 'Container', 'Serverless'],
          items: [
            { text: 'Cobrada por tempo ligada, com SO completo', cat: 0, why: 'VM.' },
            { text: 'Compartilha o núcleo do hospedeiro, inicia em segundos', cat: 1, why: 'Container.' },
            { text: 'Cobrada por execução da função', cat: 2, why: 'Serverless.' },
          ],
        },
      },
    },
    {
      id: 'serverless',
      part: 'Formas de executar',
      title: 'Serverless não é "sem servidor"',
      goal: 'Entender o que serverless significa e como ele roda.',
      explain:
        '**Serverless** **não significa ausência de servidores**: significa que o **cliente não os administra**.\n\nO código roda **em resposta a eventos** (uma requisição HTTP, um arquivo enviado, uma mensagem numa fila) e **escala automaticamente**, inclusive **até zero**.\n\nPode haver **"partida a frio"**: a primeira execução depois de um tempo parada demora mais.',
      check: {
        kind: 'choice',
        id: 'sl-c',
        prompt: 'Sobre o serverless, é correto afirmar:',
        options: [
          { text: 'Há servidores, mas o cliente não os administra', why: 'Isso.' },
          { text: 'Dispensa servidores de qualquer tipo', why: 'Os servidores existem; quem os administra é o provedor.' },
          { text: 'Fica sempre ligado, mesmo sem uso', why: 'É o contrário: pode escalar até zero.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como **táxi por aplicativo**: o carro existe, mas você não é dono, não faz a manutenção e só paga a corrida. Se ninguém chama, nenhum carro trabalha para você (**escala até zero**). O chamado é o **evento**.',
        check: {
          kind: 'choice',
          id: 'sl-r',
          prompt: 'O que dispara a execução de uma função serverless?',
          options: [
            { text: 'Um evento, como uma requisição HTTP ou um arquivo enviado', why: 'Isso.' },
            { text: 'O cliente ligar a máquina virtual de manhã', why: 'Não há VM para o cliente ligar; a função responde a eventos.' },
            { text: 'Um cron no computador do usuário', why: 'Pode haver eventos de horário no provedor, mas o que dispara é sempre um evento, não o computador do usuário.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'vertical',
      part: 'Escalabilidade',
      title: 'Escala vertical: uma máquina maior',
      goal: 'Reconhecer a escala vertical e seus limites.',
      explain:
        '**Escala vertical** (*scale up*): **aumentar a capacidade de uma máquina**: mais CPU, mais memória.\n\nLimites:\n\n- tem **limite físico** (não existe máquina infinita);\n- costuma **exigir reinício**.',
      check: {
        kind: 'choice',
        id: 'vt-c',
        prompt: 'O servidor do banco passou de 16 para 64 GB de memória. Isso é escala:',
        options: [
          { text: 'Vertical', why: 'Isso. A mesma máquina ficou maior.' },
          { text: 'Horizontal', why: 'Horizontal seria acrescentar outras máquinas.' },
          { text: 'Serverless', why: 'Serverless é forma de execução, não tipo de escala.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Vertical** = **crescer para cima**: o mesmo prédio ganha andares. Chega uma hora em que não dá mais para subir, e a obra costuma parar o prédio (reinício).',
        check: {
          kind: 'choice',
          id: 'vt-r',
          prompt: 'Qual é uma desvantagem típica da escala vertical?',
          options: [
            { text: 'Tem limite físico e costuma exigir reinício', why: 'Isso.' },
            { text: 'Exige que a aplicação não guarde sessão local', why: 'Essa exigência é da escala horizontal.' },
            { text: 'Precisa de balanceador de carga', why: 'Balanceador é da escala horizontal.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'horizontal',
      part: 'Escalabilidade',
      title: 'Escala horizontal: mais máquinas',
      goal: 'Reconhecer a escala horizontal e o que ela exige da aplicação.',
      explain:
        '**Escala horizontal** (*scale out*): **acrescentar mais máquinas** e distribuir a carga com um **balanceador**.\n\nExige que a aplicação esteja **preparada**: por exemplo, **sem guardar sessão localmente**, como nas **APIs REST sem estado**. Assim, qualquer servidor pode atender qualquer pedido.',
      check: {
        kind: 'choice',
        id: 'hz-c',
        prompt: 'Acrescentar servidores atrás de um balanceador para atender mais acessos é escala:',
        options: [
          { text: 'Horizontal', why: 'Isso.' },
          { text: 'Vertical', why: 'Vertical é aumentar uma máquina.' },
          { text: 'Diagonal', why: 'O termo cobrado é horizontal.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Horizontal** = **crescer para os lados**: abrir mais guichês iguais e uma recepção (o balanceador) que distribui as pessoas. Funciona bem se **qualquer guichê** puder atender **qualquer pessoa**, sem precisar lembrar do atendimento anterior (sem estado local).',
        check: {
          kind: 'choice',
          id: 'hz-r',
          prompt: 'A aplicação guarda a sessão do usuário na memória do servidor em que ele entrou. Que tipo de escala isso atrapalha?',
          options: [
            { text: 'Horizontal', why: 'Isso. Outro servidor não teria a sessão.' },
            { text: 'Vertical', why: 'Com uma máquina só, a sessão local não atrapalha.' },
            { text: 'Nenhuma', why: 'Atrapalha a horizontal, que exige aplicação sem estado local.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'elasticidade',
      part: 'Escalabilidade',
      title: 'Elasticidade: subir e descer sozinho',
      goal: 'Diferenciar escalabilidade de elasticidade.',
      explain:
        '**Elasticidade** é a capacidade de escalar **para cima e para baixo**, **automaticamente**, acompanhando a demanda.\n\nEscalar só para cima é escalabilidade. Elasticidade inclui **devolver** o que sobrou quando a demanda cai.',
      example: 'Às 18h do último dia de prazo, o sistema sobe de 3 para 12 servidores. À meia-noite, volta a 3.',
      check: {
        kind: 'choice',
        id: 'el-c',
        prompt: 'O que distingue a elasticidade?',
        options: [
          { text: 'Escalar para cima e para baixo automaticamente', why: 'Isso.' },
          { text: 'Só crescer, nunca diminuir', why: 'Elasticidade inclui diminuir.' },
          { text: 'Trocar de provedor a cada mês', why: 'Não tem relação com elasticidade.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Escalabilidade é **poder** crescer. Elasticidade é **crescer e encolher sozinho**, como um **elástico**: estica no pico e volta depois, sem alguém precisar mexer.',
        check: {
          kind: 'choice',
          id: 'el-r',
          prompt: 'Depois do pico, o sistema devolve automaticamente os servidores extras. Isso mostra:',
          options: [
            { text: 'Elasticidade', why: 'Isso.' },
            { text: 'Escala vertical', why: 'Vertical é aumentar uma máquina.' },
            { text: 'Ponto único de falha', why: 'Ponto único de falha é um risco, não uma capacidade.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'alta-disponibilidade',
      part: 'Disponibilidade',
      title: 'Alta disponibilidade: sem ponto único de falha',
      goal: 'Reconhecer as medidas que eliminam pontos únicos de falha.',
      explain:
        '**Alta disponibilidade** é manter o serviço funcionando **apesar de falhas**, eliminando os **pontos únicos de falha**.\n\nMedidas:\n\n- servidores **redundantes**;\n- **balanceamento** com verificação de saúde;\n- **réplicas** de banco de dados;\n- distribuição em **zonas de disponibilidade** (datacenters independentes de uma mesma região) ou em **regiões** diferentes.',
      check: {
        kind: 'choice',
        id: 'ad-c',
        prompt: 'Para eliminar pontos únicos de falha de uma aplicação em nuvem, a medida mais adequada é:',
        options: [
          { text: 'Distribuir instâncias em zonas de disponibilidade, atrás de um balanceador', why: 'Isso.' },
          { text: 'Aumentar a memória do único servidor', why: 'Continua havendo um servidor só: um ponto único de falha.' },
          { text: 'Fazer backup semanal', why: 'Backup ajuda a recuperar, mas não mantém o serviço no ar durante a falha.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Ponto único de falha** é a peça que, se quebrar, **derruba tudo**. A cura é ter **pelo menos dois de cada coisa**, em lugares que não falham juntos: duas zonas, dois servidores, banco com réplica.',
        check: {
          kind: 'choice',
          id: 'ad-r',
          prompt: 'O que é uma zona de disponibilidade?',
          options: [
            { text: 'Um datacenter independente dentro de uma mesma região', why: 'Isso.' },
            { text: 'Uma faixa de endereços IP privados', why: 'Isso são as faixas da RFC 1918.' },
            { text: 'O horário em que o sistema está no ar', why: 'Não. É um datacenter independente na região.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'noves',
      part: 'Disponibilidade',
      title: 'Os "noves" da disponibilidade',
      goal: 'Converter percentual de disponibilidade em tempo fora do ar por ano.',
      explain:
        'Um ano tem **8.760 horas**. Cada "nove" a mais reduz o tempo fora do ar:\n\n| Disponibilidade | Indisponibilidade máxima por ano |\n|---|---|\n| 99% | cerca de **3,65 dias** |\n| 99,9% | cerca de **8 horas e 46 minutos** |\n| 99,99% | cerca de **53 minutos** |\n| 99,999% | cerca de **5 minutos** |',
      check: {
        kind: 'choice',
        id: 'nv-c',
        prompt: 'Um contrato promete 99,99% de disponibilidade ao ano. Quanto tempo fora do ar ele tolera, no máximo?',
        options: [
          { text: 'Cerca de 53 minutos', why: 'Isso.' },
          { text: 'Cerca de 8 horas e 46 minutos', why: 'Esse é o de 99,9%.' },
          { text: 'Cerca de 5 minutos', why: 'Esse é o de 99,999%.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Conta rápida: o que **falta** para 100% é o tempo fora do ar. 99% → falta 1% de 8.760 h = **87,6 h** (cerca de 3,65 dias). Cada nove a mais **divide por 10**: 99,9% → 8,76 h; 99,99% → 0,876 h (cerca de 53 min).',
        check: {
          kind: 'order',
          id: 'nv-r',
          prompt: 'Ordene do que tolera MAIS tempo fora do ar para o que tolera MENOS.',
          items: ['99%', '99,9%', '99,99%', '99,999%'],
          why: 'Cada nove a mais divide por 10 o tempo de indisponibilidade.',
        },
      },
    },
    {
      id: 'rpo-rto',
      part: 'Disponibilidade',
      title: 'RPO e RTO',
      goal: 'Diferenciar perda de dados tolerável de tempo de volta.',
      explain:
        'Na **recuperação de desastres**, dois indicadores definem a meta:\n\n- **RPO** (*Recovery Point Objective*): **quanta perda de dados** é tolerável, medida em tempo. Até que **ponto do passado** se volta.\n- **RTO** (*Recovery Time Objective*): em **quanto tempo** o serviço precisa **voltar**.',
      example: 'Backup a cada 1 hora: no pior caso perde-se 1 hora de dados (RPO de 1 hora). Se o sistema precisa estar de pé em 2 horas após a falha, o RTO é de 2 horas.',
      check: {
        kind: 'choice',
        id: 'rp-c',
        prompt: 'O plano aceita perder no máximo 30 minutos de dados. Esse valor é o:',
        options: [
          { text: 'RPO', why: 'Isso. Perda de dados tolerável.' },
          { text: 'RTO', why: 'RTO é o tempo para o serviço voltar.' },
          { text: 'TTL', why: 'TTL é o tempo de cache do DNS.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia as letras do meio: RP**O** de **P**onto (até que **ponto** volto nos dados); RT**O** de **T**empo (em quanto **tempo** volto a funcionar). Um olha para **trás** (dados perdidos); o outro, para **frente** (tempo parado).',
        check: {
          kind: 'choice',
          id: 'rp-r',
          prompt: 'Após uma falha, o serviço deve voltar em até 4 horas. Esse valor é o:',
          options: [
            { text: 'RTO', why: 'Isso. Tempo para restabelecer.' },
            { text: 'RPO', why: 'RPO mede a perda de dados tolerável.' },
            { text: 'SLA de 99,999%', why: 'Não. É o RTO do plano de recuperação.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'hibrida',
      part: 'Integração e monitoramento',
      title: 'Ligar o datacenter à nuvem',
      goal: 'Saber como o ambiente local se liga ao provedor numa nuvem híbrida.',
      explain:
        'Em **nuvem híbrida**, o datacenter da organização se liga ao provedor por:\n\n- **VPN** sobre a internet; ou\n- **link dedicado**.\n\nAs **identidades** costumam ser **federadas**: o mesmo diretório autentica nos dois ambientes. E os **dados sensíveis** podem **permanecer no ambiente local** por exigência legal.',
      check: {
        kind: 'choice',
        id: 'hb-c',
        prompt: 'O servidor faz login com a mesma conta do AD no sistema local e no sistema em nuvem. Isso é:',
        options: [
          { text: 'Identidade federada', why: 'Isso. O mesmo diretório autentica nos dois.' },
          { text: 'Escala horizontal', why: 'Escala é sobre capacidade, não sobre login.' },
          { text: 'Serverless', why: 'Serverless é forma de execução.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Uma ponte e um crachá: a **ponte** liga os dois ambientes (VPN ou link dedicado); o **crachá único** (identidade federada) abre as portas dos dois lados. E o que a lei manda guardar em casa (dados sensíveis) pode ficar em casa.',
        check: {
          kind: 'choice',
          id: 'hb-r',
          prompt: 'Quais são as formas de ligar o datacenter local ao provedor de nuvem?',
          options: [
            { text: 'VPN sobre a internet ou link dedicado', why: 'Isso.' },
            { text: 'Só pen drive', why: 'Não. A ligação é por VPN ou link dedicado.' },
            { text: 'Só por DNS', why: 'DNS resolve nomes; não liga redes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'monitoramento',
      part: 'Integração e monitoramento',
      title: 'Monitoramento e observabilidade',
      goal: 'Saber o que se monitora e o que é observabilidade.',
      explain:
        '**Monitorar** a infraestrutura é acompanhar:\n\n- **métricas**: uso de CPU, memória, latência, taxa de erros;\n- **logs**;\n- **alertas**, com painéis e limites definidos.\n\nA disciplina mais ampla, que inclui ***traces* distribuídos**, é a **observabilidade**, cobrada no bloco de DevOps.',
      check: {
        kind: 'choice',
        id: 'mo-c',
        prompt: 'Qual destes itens é uma métrica de monitoramento?',
        options: [
          { text: 'Latência das requisições', why: 'Isso. Assim como CPU, memória e taxa de erros.' },
          { text: 'O nome do provedor', why: 'Não é uma métrica de funcionamento.' },
          { text: 'A cor do painel', why: 'Não é uma métrica de funcionamento.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Métricas** são os **números** do painel do carro (velocidade, temperatura). **Logs** são o **diário de bordo**. **Alertas** são as **luzes** que acendem ao passar do limite. **Observabilidade** junta tudo isso e ainda segue o caminho de cada pedido entre os serviços (*traces*).',
        check: {
          kind: 'sort',
          id: 'mo-r',
          prompt: 'O que é cada item?',
          categories: ['Métrica', 'Log', 'Alerta'],
          items: [
            { text: 'CPU em 87%', cat: 0, why: 'Número medido.' },
            { text: '"10:42 erro ao gravar no banco"', cat: 1, why: 'Registro de evento.' },
            { text: 'Aviso enviado quando a taxa de erros passa de 5%', cat: 2, why: 'Disparado ao passar do limite.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Preparar o sistema para o pico do último dia de prazo. Ponha na ordem.',
      items: ['Tirar a sessão da memória local (aplicação sem estado)', 'Colocar as instâncias atrás de um balanceador com verificação de saúde', 'Distribuir as instâncias em duas zonas de disponibilidade', 'Configurar a elasticidade para subir e descer com a demanda'],
      why: 'Primeiro a aplicação aceita várias máquinas; depois o balanceador; então a redundância entre zonas; por fim, o ajuste automático.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'Escala horizontal é acrescentar máquinas', correct: true, why: 'Vertical é aumentar uma.' },
        { text: 'RTO é o tempo para o serviço voltar', correct: true, why: 'RPO é a perda de dados tolerável.' },
        { text: 'Serverless dispensa servidores', correct: false, why: 'Dispensa a administração deles pelo cliente.' },
        { text: '99,9% ao ano tolera cerca de 53 minutos fora do ar', correct: false, why: '53 minutos é o de 99,99%; 99,9% tolera cerca de 8 h 46 min.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou as metas do plano de recuperação. Toque na linha errada.',
      lines: ['Backup do banco a cada 15 minutos', 'RPO: 15 minutos de dados no máximo', 'RPO: sistema de volta em até 4 horas'],
      bug: 2,
      why: 'O tempo para o sistema voltar é o RTO, não o RPO.',
      fixed: 'RTO: sistema de volta em até 4 horas',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'Uma rotina converte cada PDF enviado pelos jurisdicionados e passa dias sem uso. Qual arquitetura combina com isso?',
      scenarios: [
        { title: 'Arquitetura A', body: 'Uma máquina virtual ligada 24 horas, esperando os arquivos.' },
        { title: 'Arquitetura B', body: 'Uma função serverless disparada pelo evento "arquivo enviado".' },
      ],
      answer: 1,
      why: 'A função roda só quando há arquivo, escala até zero e é cobrada por execução. A VM seria paga pelo tempo ligada, mesmo parada.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o banco de dados está numa máquina só, e quando ela cai o sistema inteiro para. Qual é o problema e a correção?',
      options: [
        { text: 'Ponto único de falha; criar réplica do banco em outra zona', why: 'Isso.' },
        { text: 'Falta de elasticidade; aumentar a memória da máquina', why: 'Aumentar a máquina continua deixando uma peça única que derruba tudo.' },
        { text: 'RPO alto; reduzir o TTL do DNS', why: 'O problema é a peça única, e TTL do DNS não resolve isso.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.02.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.02.008' },
  ],
  summary: [
    'VM: SO completo, cobrada por tempo ligada. Container: núcleo compartilhado. Serverless: só o código, por execução.',
    'Serverless tem servidores; o cliente só não os administra. Roda por eventos e escala até zero.',
    'Vertical: máquina maior (limite físico, reinício). Horizontal: mais máquinas e balanceador, aplicação sem estado.',
    'Elasticidade: subir e descer automaticamente.',
    'Alta disponibilidade: sem ponto único de falha; redundância, réplicas, zonas de disponibilidade.',
    '99% ≈ 3,65 dias; 99,9% ≈ 8 h 46 min; 99,99% ≈ 53 min; 99,999% ≈ 5 min por ano.',
    'RPO: perda de dados tolerável. RTO: tempo para voltar.',
    'Híbrida: VPN ou link dedicado e identidade federada. Monitoramento: métricas, logs e alertas.',
  ],
};
