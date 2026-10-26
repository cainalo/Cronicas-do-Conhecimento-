// Microaula "Arquitetura TCP/IP" (cap.infra.01, seção tcpip), no formato aprovado em 24/10/2026. Uma
// ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos conferidos com o texto do
// capítulo (01-tcpip.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraTcpip: MicroLesson = {
  id: 'micro.infra.tcpip',
  chapterId: 'cap.infra.01',
  sectionId: 'tcpip',
  title: 'Arquitetura TCP/IP',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você envia um relatório por e-mail para outro tribunal. O programa de e-mail precisa saber como funciona o cabo de rede ou o Wi-Fi?',
    options: [
      { text: 'Não: cada parte da rede cuida de um problema e usa a de baixo', why: 'Isso. É a ideia de camadas, que vamos ver agora.' },
      { text: 'Sim: o programa controla o sinal elétrico do cabo', why: 'Não. O programa de e-mail cuida da mensagem; outras camadas cuidam do transporte e do meio físico.' },
      { text: 'Sim: por isso cada programa só funciona num tipo de rede', why: 'O mesmo e-mail funciona por cabo, Wi-Fi ou celular, justamente porque as camadas separam os problemas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'camadas',
      part: 'Modelos de camadas',
      title: 'Por que camadas',
      goal: 'Entender que cada camada resolve um problema e usa a de baixo.',
      explain:
        'Uma rede funciona em **camadas**. Cada camada resolve **um problema** e usa os serviços da camada **de baixo**.\n\nO edital cobra a **arquitetura TCP/IP**, mas as questões costumam compará-la ao **modelo OSI**. O OSI é um modelo de referência **didático**; o TCP/IP é a pilha que a internet **efetivamente usa**.',
      example: 'No e-mail: o programa monta a mensagem (aplicação), o TCP garante a entrega (transporte), o IP acha o caminho (internet) e o Wi-Fi leva os bits até o roteador (acesso à rede).',
      check: {
        kind: 'choice',
        id: 'cm-c',
        prompt: 'Qual dos dois modelos é a pilha que a internet efetivamente usa?',
        options: [
          { text: 'TCP/IP', why: 'Isso. O OSI é o modelo de referência didático.' },
          { text: 'OSI', why: 'O OSI é didático, de referência. A internet usa o TCP/IP.' },
          { text: 'Nenhum: a internet não usa camadas', why: 'Usa: a pilha TCP/IP é organizada em camadas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense nos **Correios**: quem escreve a carta não dirige o caminhão, e o motorista não lê a carta. Cada um cuida de uma parte e entrega para o próximo. Assim são as camadas.',
        check: {
          kind: 'choice',
          id: 'cm-r',
          prompt: 'O que cada camada faz em relação à camada de baixo?',
          options: [
            { text: 'Usa os serviços dela', why: 'Isso.' },
            { text: 'Substitui o trabalho dela', why: 'Não substitui: apoia-se nela.' },
            { text: 'Nada: as camadas não se comunicam', why: 'Cada camada usa a de baixo.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'osi-tcpip',
      part: 'Modelos de camadas',
      title: 'OSI (7) e TCP/IP (4) lado a lado',
      goal: 'Associar as camadas do OSI às do TCP/IP e seus protocolos.',
      explain:
        '| OSI (7 camadas) | TCP/IP (4 camadas) | Exemplos |\n|---|---|---|\n| 7 Aplicação, 6 Apresentação, 5 Sessão | **Aplicação** | HTTP, DNS, SMTP, SSH, FTP |\n| 4 Transporte | **Transporte** | TCP, UDP |\n| 3 Rede | **Internet** | IP, ICMP |\n| 2 Enlace, 1 Física | **Acesso à rede** | Ethernet, Wi-Fi (802.11) |',
      check: {
        kind: 'choice',
        id: 'ot-c',
        prompt: 'Na arquitetura TCP/IP, o protocolo IP pertence à camada de:',
        options: [
          { text: 'Internet', why: 'Isso. Corresponde à camada 3 (Rede) do OSI.' },
          { text: 'Transporte', why: 'Na de transporte ficam TCP e UDP.' },
          { text: 'Aplicação', why: 'Na de aplicação ficam HTTP, DNS, SMTP.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Atalho: as **três de cima** do OSI (aplicação, apresentação, sessão) viram **uma** só no TCP/IP: Aplicação. As **duas de baixo** (enlace e física) viram **Acesso à rede**. As do meio ficam: Transporte e Rede (que no TCP/IP se chama **Internet**).',
        check: {
          kind: 'sort',
          id: 'ot-r',
          prompt: 'Em que camada do TCP/IP fica cada protocolo?',
          categories: ['Aplicação', 'Transporte', 'Internet'],
          items: [
            { text: 'HTTP', cat: 0, why: 'Protocolo de aplicação.' },
            { text: 'UDP', cat: 1, why: 'Protocolo de transporte.' },
            { text: 'ICMP', cat: 2, why: 'Camada Internet, junto com o IP.' },
          ],
        },
      },
    },
    {
      id: 'encapsulamento',
      part: 'Modelos de camadas',
      title: 'Encapsulamento: segmento, pacote e quadro',
      goal: 'Dar o nome certo à unidade de dados de cada camada.',
      explain:
        'Cada camada acrescenta **seu cabeçalho** aos dados que recebe de cima. Isso é o **encapsulamento**.\n\nOs nomes das unidades:\n\n| Camada | Unidade |\n|---|---|\n| Transporte | **segmento** (TCP) ou **datagrama** (UDP) |\n| Rede (Internet) | **pacote** |\n| Enlace | **quadro** |',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'Como se chama a unidade de dados na camada de enlace?',
        options: [
          { text: 'Quadro', why: 'Isso.' },
          { text: 'Pacote', why: 'Pacote é a unidade da camada de rede.' },
          { text: 'Segmento', why: 'Segmento é a unidade do TCP, no transporte.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **envelopes dentro de envelopes**: a carta (dados) vai num envelope do transporte (**segmento**), que vai num envelope da rede (**pacote**), que vai numa caixa do enlace (**quadro**). Cada envelope tem o seu endereço.',
        check: {
          kind: 'order',
          id: 'en-r',
          prompt: 'Ponha as unidades na ordem do encapsulamento, de dentro para fora.',
          items: ['Segmento (transporte)', 'Pacote (rede)', 'Quadro (enlace)'],
          why: 'O transporte encapsula os dados; a rede encapsula o segmento; o enlace encapsula o pacote.',
        },
      },
    },
    {
      id: 'tcp',
      part: 'TCP e UDP',
      title: 'TCP: conexão e garantias',
      goal: 'Listar as garantias do TCP.',
      explain:
        'O **TCP** é **orientado a conexão**: abre a conexão, troca dados e a fecha.\n\nEle garante a entrega com **confirmações**, **retransmissão** e **ordem garantida**. Também faz **controle de fluxo** e **de congestionamento**.\n\nO preço é **mais sobrecarga**. Usos: web (HTTP/1.1 e HTTP/2), e-mail, SSH, transferência de arquivos.',
      check: {
        kind: 'choice',
        id: 'tc-c',
        prompt: 'Qual destas é uma característica do TCP?',
        options: [
          { text: 'Retransmite o que se perdeu e entrega em ordem', why: 'Isso.' },
          { text: 'Não abre conexão', why: 'Quem não abre conexão é o UDP.' },
          { text: 'Tem menos sobrecarga que o UDP', why: 'É o contrário: o TCP tem mais sobrecarga por causa das garantias.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O TCP é a **carta registrada com aviso de recebimento**: tem protocolo de abertura, confirmação de cada entrega, reenvio se algo se perder e tudo chega na ordem. Dá mais trabalho, mas é seguro.',
        check: {
          kind: 'choice',
          id: 'tc-r',
          prompt: 'Para baixar um arquivo de contrato sem perder nenhum pedaço, qual protocolo de transporte?',
          options: [
            { text: 'TCP', why: 'Isso. Precisa de todos os pedaços, na ordem.' },
            { text: 'UDP', why: 'UDP não garante nada; um pedaço perdido estragaria o arquivo.' },
            { text: 'ICMP', why: 'ICMP leva mensagens de controle e erro, não arquivos.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'udp',
      part: 'TCP e UDP',
      title: 'UDP: rápido e sem garantias',
      goal: 'Saber quando o UDP é a escolha certa.',
      explain:
        'O **UDP** é **sem conexão** e **não dá garantias**: nada de confirmação, retransmissão ou ordem. Em troca, tem **menos sobrecarga**.\n\nUsos típicos:\n\n- **DNS** (consultas comuns);\n- **DHCP**;\n- **voz e vídeo em tempo real**;\n- **QUIC**, a base do **HTTP/3**.',
      check: {
        kind: 'choice',
        id: 'ud-c',
        prompt: 'Uma videoconferência prefere perder alguns pacotes a atrasar a imagem esperando retransmissões. Qual protocolo de transporte?',
        options: [
          { text: 'UDP', why: 'Isso. Sem retransmissão, sem esperar.' },
          { text: 'TCP', why: 'O TCP retransmite e espera a ordem, o que atrasaria a imagem.' },
          { text: 'ICMP', why: 'ICMP é de mensagens de controle, não de transporte de vídeo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O UDP é o **recado gritado** pela janela: rápido, mas se alguém não ouviu, ninguém repete. Numa chamada de vídeo, repetir a imagem de 2 segundos atrás não serve; é melhor seguir em frente.',
        check: {
          kind: 'sort',
          id: 'ud-r',
          prompt: 'Uso típico de TCP ou de UDP?',
          categories: ['TCP', 'UDP'],
          items: [
            { text: 'SSH', cat: 0, why: 'Precisa de entrega confiável.' },
            { text: 'Consulta DNS comum', cat: 1, why: 'Rápida e curta.' },
            { text: 'Voz em tempo real', cat: 1, why: 'Atraso pior que perda.' },
            { text: 'E-mail', cat: 0, why: 'Precisa chegar inteiro.' },
          ],
        },
      },
    },
    {
      id: 'handshake',
      part: 'TCP e UDP',
      title: 'O aperto de mão em três vias',
      goal: 'Ordenar SYN, SYN-ACK e ACK.',
      explain:
        'A conexão TCP começa pelo **aperto de mão em três vias** (*three-way handshake*):\n\n```\nCliente  ── SYN ──────────►  Servidor\nCliente  ◄──── SYN-ACK ────  Servidor\nCliente  ── ACK ──────────►  Servidor\n```\n\n1. O cliente pede para conectar (**SYN**).\n2. O servidor aceita e também pede (**SYN-ACK**).\n3. O cliente confirma (**ACK**).',
      check: {
        kind: 'choice',
        id: 'hs-c',
        prompt: 'Depois que o cliente envia SYN, o que o servidor responde?',
        options: [
          { text: 'SYN-ACK', why: 'Isso. Depois o cliente fecha com ACK.' },
          { text: 'ACK, e a conexão está pronta', why: 'Faltaria o SYN do servidor. Ele responde SYN-ACK; o ACK final é do cliente.' },
          { text: 'FIN', why: 'FIN não faz parte da abertura.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Como um telefonema: "**Alô, pode falar?**" (SYN). "**Posso, e você me ouve?**" (SYN-ACK). "**Ouço.**" (ACK). Só então a conversa começa.',
        check: {
          kind: 'order',
          id: 'hs-r',
          prompt: 'Ponha o aperto de mão na ordem.',
          items: ['SYN (cliente)', 'SYN-ACK (servidor)', 'ACK (cliente)'],
          why: 'Pedido, aceite com pedido, confirmação.',
        },
      },
    },
    {
      id: 'portas',
      part: 'Portas',
      title: 'Portas: o processo certo',
      goal: 'Entender para que servem as portas e quais são as bem conhecidas.',
      explain:
        'Um servidor pode rodar vários serviços ao mesmo tempo. A camada de transporte usa **portas** para entregar os dados ao **processo certo**.\n\nAs portas de **0 a 1023** são as **bem conhecidas**: reservadas aos serviços mais comuns.',
      example: 'No mesmo servidor, o site responde na porta 443 e o acesso administrativo por SSH na 22. O endereço IP é o mesmo; a porta decide qual programa recebe.',
      check: {
        kind: 'choice',
        id: 'pt-c',
        prompt: 'Para que serve a porta na camada de transporte?',
        options: [
          { text: 'Entregar os dados ao processo certo dentro da máquina', why: 'Isso.' },
          { text: 'Encontrar o caminho entre as redes', why: 'Achar o caminho é tarefa da camada Internet (IP).' },
          { text: 'Converter nomes em endereços IP', why: 'Isso é o DNS.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **IP** é o endereço do **prédio** do Tribunal; a **porta** é o número da **sala**. A carta chega ao prédio pelo endereço e à pessoa certa pela sala.',
        check: {
          kind: 'choice',
          id: 'pt-r',
          prompt: 'Qual faixa de portas é chamada de "bem conhecidas"?',
          options: [
            { text: '0 a 1023', why: 'Isso.' },
            { text: '1024 a 65535', why: 'Essa faixa fica fora das bem conhecidas.' },
            { text: 'Só a 80 e a 443', why: 'Essas são duas das bem conhecidas, que vão de 0 a 1023.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'portas-1',
      part: 'Portas',
      title: 'FTP, SSH, SMTP, DNS e DHCP',
      goal: 'Memorizar as portas de FTP, SSH, SMTP, DNS e DHCP.',
      explain:
        '| Serviço | Porta | Transporte |\n|---|---|---|\n| FTP | **21** (controle) e **20** (dados, modo ativo) | TCP |\n| SSH (e SFTP) | **22** | TCP |\n| SMTP | **25** (entre servidores); **587** (envio por clientes) | TCP |\n| DNS | **53** | UDP e TCP |\n| DHCP | **67** (servidor) e **68** (cliente) | UDP |',
      check: {
        kind: 'choice',
        id: 'p1-c',
        prompt: 'O SFTP, transferência de arquivos segura, usa qual porta?',
        options: [
          { text: '22, a mesma do SSH', why: 'Isso. O SFTP roda sobre o SSH.' },
          { text: '21, a do FTP', why: 'O SFTP não é FTP com TLS; ele roda sobre o SSH, na 22.' },
          { text: '53', why: '53 é o DNS.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma sequência ajuda: **20-21** FTP, **22** SSH, **25** SMTP, **53** DNS, **67-68** DHCP. O DNS é o único dessa lista que usa **UDP e TCP**; o DHCP usa só **UDP**.',
        check: {
          kind: 'sort',
          id: 'p1-r',
          prompt: 'Qual serviço usa cada porta?',
          categories: ['SSH', 'DNS', 'SMTP'],
          items: [
            { text: 'Porta 22', cat: 0, why: 'SSH.' },
            { text: 'Porta 53', cat: 1, why: 'DNS.' },
            { text: 'Porta 25', cat: 2, why: 'SMTP entre servidores.' },
          ],
        },
      },
    },
    {
      id: 'portas-2',
      part: 'Portas',
      title: 'HTTP, HTTPS, IMAP, POP3, LDAP e RDP',
      goal: 'Memorizar as portas de web, e-mail, diretório e área de trabalho remota.',
      explain:
        '| Serviço | Porta | Transporte |\n|---|---|---|\n| HTTP | **80** | TCP |\n| HTTPS | **443** | TCP (e UDP para HTTP/3) |\n| IMAP / POP3 | **143 / 110** (993 / 995 com TLS) | TCP |\n| LDAP / LDAPS | **389 / 636** | TCP |\n| RDP | **3389** | TCP |',
      check: {
        kind: 'choice',
        id: 'p2-c',
        prompt: 'O acesso remoto à área de trabalho de um servidor Windows (RDP) usa qual porta?',
        options: [
          { text: '3389', why: 'Isso.' },
          { text: '22', why: '22 é o SSH.' },
          { text: '443', why: '443 é o HTTPS.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pares para memorizar: web **80 → 443** com TLS; IMAP **143 → 993**; POP3 **110 → 995**; LDAP **389 → 636**. O RDP fica sozinho, na **3389**.',
        check: {
          kind: 'choice',
          id: 'p2-r',
          prompt: 'As portas padrão de SSH, DNS e HTTPS são, nesta ordem:',
          options: [
            { text: '22, 53 e 443', why: 'Isso.' },
            { text: '21, 53 e 80', why: '21 é FTP e 80 é HTTP sem TLS.' },
            { text: '22, 67 e 443', why: '67 é o servidor DHCP; DNS é 53.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'icmp',
      part: 'ICMP',
      title: 'ICMP: ping e traceroute',
      goal: 'Saber o que o ICMP carrega e como ping e traceroute o usam.',
      explain:
        'O **ICMP** carrega **mensagens de controle e erro** da camada de rede.\n\n- O **`ping`** usa ICMP ***echo request*** e ***echo reply***: "você está aí?", "estou".\n- O **`traceroute`** (no Windows, **`tracert`**) usa o campo **TTL** para descobrir o **caminho** até o destino, roteador por roteador.',
      check: {
        kind: 'choice',
        id: 'ic-c',
        prompt: 'Você quer descobrir por quais roteadores o tráfego passa até o servidor do TCE. Qual comando?',
        options: [
          { text: 'traceroute (tracert no Windows)', why: 'Isso. Ele usa o TTL para mapear o caminho.' },
          { text: 'ping', why: 'O ping diz se o destino responde, não o caminho.' },
          { text: 'tar', why: 'tar empacota arquivos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **ping** é bater na porta e ouvir "estou aqui" (echo request e reply). O **traceroute** é perguntar em **cada esquina** do caminho "por onde passei?", aproveitando o TTL, um contador que diminui a cada roteador.',
        check: {
          kind: 'choice',
          id: 'ic-r',
          prompt: 'Que mensagens ICMP o ping usa?',
          options: [
            { text: 'Echo request e echo reply', why: 'Isso.' },
            { text: 'SYN e ACK', why: 'SYN e ACK são do aperto de mão do TCP.' },
            { text: 'Bind e search', why: 'Bind e search são operações do LDAP.' },
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
      prompt: 'O navegador abre https://portal.tce.go.gov.br. Ponha na ordem o que acontece no transporte e na rede.',
      items: ['Consulta DNS (UDP, porta 53) para descobrir o IP', 'Aperto de mão TCP: SYN, SYN-ACK, ACK', 'Pedido HTTPS para a porta 443', 'Resposta do servidor, com confirmações do TCP'],
      why: 'Primeiro o nome vira endereço, depois a conexão abre, então o pedido segue e a resposta volta confirmada.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'TCP e UDP ficam na camada de transporte', correct: true, why: 'Nos dois modelos.' },
        { text: 'O ping usa ICMP', correct: true, why: 'Echo request e echo reply.' },
        { text: 'O UDP retransmite os pacotes perdidos', correct: false, why: 'Quem retransmite é o TCP.' },
        { text: 'O DHCP usa as portas 67 e 68 sobre TCP', correct: false, why: 'O DHCP usa UDP.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites listou as portas a liberar no firewall do servidor web. Toque na linha errada.',
      lines: ['HTTP: TCP 80', 'HTTPS: TCP 443', 'SSH administrativo: TCP 3389'],
      bug: 2,
      why: '3389 é o RDP. SSH é a porta 22.',
      fixed: 'SSH administrativo: TCP 22',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'Qual escolha de transporte é a adequada para cada caso?',
      scenarios: [
        { title: 'Escolha A', body: 'Transferir o backup diário por **UDP**; transmitir a sessão plenária ao vivo por **TCP**.' },
        { title: 'Escolha B', body: 'Transferir o backup diário por **TCP**; transmitir a sessão plenária ao vivo por **UDP**.' },
      ],
      answer: 1,
      why: 'O backup precisa chegar inteiro (TCP). A transmissão ao vivo prefere perder um pouco a atrasar (UDP).',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o leitor de e-mail do analista baixa as mensagens por IMAP com TLS. Qual porta?',
      options: [
        { text: '993', why: 'Isso. IMAP é 143; com TLS, 993.' },
        { text: '995', why: '995 é o POP3 com TLS.' },
        { text: '587', why: '587 é o envio de e-mail por clientes (SMTP).' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.003' },
  ],
  summary: [
    'Camadas: cada uma resolve um problema e usa a de baixo. OSI é didático (7); TCP/IP é o usado (4).',
    'Aplicação (HTTP, DNS), Transporte (TCP, UDP), Internet (IP, ICMP), Acesso à rede (Ethernet, Wi-Fi).',
    'Encapsulamento: segmento ou datagrama, pacote, quadro.',
    'TCP: conexão, confirmações, retransmissão e ordem. UDP: sem conexão e sem garantias, mais leve.',
    'Aperto de mão: SYN, SYN-ACK, ACK.',
    'Portas: 20-21 FTP, 22 SSH, 25/587 SMTP, 53 DNS, 67-68 DHCP, 80/443 web, 3389 RDP.',
    'ping usa ICMP echo; traceroute usa o TTL para mapear o caminho.',
  ],
};
