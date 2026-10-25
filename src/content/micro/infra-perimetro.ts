// Microaula "Firewalls, VPN, proxies e balanceamento" (cap.infra.01, seção perimetro), no formato
// aprovado em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo.
// Fatos conferidos com o texto do capítulo (04-perimetro.md); cenários são exemplos didáticos.
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraPerimetro: MicroLesson = {
  id: 'micro.infra.perimetro',
  chapterId: 'cap.infra.01',
  sectionId: 'perimetro',
  title: 'Firewalls, VPN, proxies e balanceamento',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O portal do Tribunal precisa ser acessado por qualquer cidadão, mas o servidor com os processos sigilosos não pode ficar exposto. Como organizar isso?',
    options: [
      { text: 'Separar o que é público do que é interno, com controles entre as partes', why: 'Isso. Firewalls, DMZ, proxies e VPN fazem essa separação. É a aula de hoje.' },
      { text: 'Colocar tudo na mesma rede, com senhas fortes', why: 'Senha forte ajuda, mas misturar público e sigiloso expõe demais. A rede precisa ser separada.' },
      { text: 'Desligar o portal à noite', why: 'Não resolve: o problema é a separação, não o horário.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'filtro',
      part: 'Firewalls',
      title: 'Filtro de pacotes e firewall com estado',
      goal: 'Diferenciar o filtro sem estado do firewall com estado.',
      explain:
        '| Tipo | Como decide | Observação |\n|---|---|---|\n| **Filtro de pacotes** (sem estado) | Regras por **endereço, porta e protocolo**, **pacote a pacote** | Simples e rápido, mas **não entende conexões** |\n| **Com estado** (*stateful*) | **Acompanha as conexões**; libera automaticamente as **respostas** de conexões iniciadas de dentro | O **padrão** em firewalls de rede |',
      check: {
        kind: 'choice',
        id: 'fi-c',
        prompt: 'Um servidor interno acessa um site, e a resposta do site é liberada automaticamente na volta. Que tipo de firewall faz isso?',
        options: [
          { text: 'Com estado (stateful)', why: 'Isso. Ele lembra que a conexão começou de dentro.' },
          { text: 'Filtro de pacotes sem estado', why: 'O filtro sem estado olha cada pacote isolado; não sabe que é resposta.' },
          { text: 'Nenhum: respostas nunca passam por firewall', why: 'Passam; o firewall com estado as libera por saber da conexão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **sem estado** é o porteiro que confere **cada pessoa** pela lista, sem memória. O **com estado** é o porteiro que **lembra** quem saiu: quando a pessoa volta, deixa entrar sem nova consulta.',
        check: {
          kind: 'choice',
          id: 'fi-r',
          prompt: 'Qual é a limitação do filtro de pacotes sem estado?',
          options: [
            { text: 'Não entende conexões, só pacotes isolados', why: 'Isso.' },
            { text: 'É lento demais', why: 'É simples e rápido. O problema é não entender conexões.' },
            { text: 'Só funciona com IPv6', why: 'Não há essa restrição.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ngfw-waf',
      part: 'Firewalls',
      title: 'NGFW e WAF',
      goal: 'Saber o que o NGFW e o WAF inspecionam.',
      explain:
        '| Tipo | Como decide | Observação |\n|---|---|---|\n| **De aplicação / nova geração (NGFW)** | **Inspeciona o conteúdo** e identifica aplicações, usuários e ameaças | Pode incluir **IPS** |\n| **WAF** (firewall de aplicação web) | Analisa **requisições HTTP** e bloqueia ataques como **injeção de SQL** e **XSS** | Protege **aplicações web** específicas |',
      check: {
        kind: 'choice',
        id: 'nw-c',
        prompt: 'O portal sofre tentativas de injeção de SQL pelos formulários. Qual proteção é a mais específica?',
        options: [
          { text: 'Um WAF na frente do portal', why: 'Isso. Ele analisa as requisições HTTP e bloqueia injeção de SQL e XSS.' },
          { text: 'Um filtro de pacotes por porta', why: 'A injeção vem pela porta 443, que precisa ficar aberta. O filtro não olha o conteúdo.' },
          { text: 'Uma VPN site a site', why: 'VPN liga redes; não analisa os formulários do portal.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Porta e endereço dizem **por onde** o tráfego passa. Injeção de SQL está **no conteúdo** do pedido. Para pegá-la, é preciso ler o conteúdo HTTP: é o trabalho do **WAF**. O **NGFW** também olha conteúdo, de forma mais ampla: aplicações, usuários e ameaças.',
        check: {
          kind: 'sort',
          id: 'nw-r',
          prompt: 'Que tipo de firewall?',
          categories: ['Sem estado', 'Com estado', 'WAF'],
          items: [
            { text: 'Bloqueia a porta 23 pacote a pacote', cat: 0, why: 'Regra por porta, sem memória.' },
            { text: 'Libera as respostas das conexões iniciadas de dentro', cat: 1, why: 'Acompanha conexões.' },
            { text: 'Barra um XSS num formulário do portal', cat: 2, why: 'Analisa requisições HTTP.' },
          ],
        },
      },
    },
    {
      id: 'dmz',
      part: 'Firewalls',
      title: 'DMZ: a zona intermediária',
      goal: 'Saber o que fica na DMZ e por quê.',
      explain:
        'A **DMZ** (zona desmilitarizada) é uma **sub-rede intermediária** onde ficam os serviços **expostos à internet** (portal, e-mail), **separada da rede interna** por firewall.\n\nSe um servidor da DMZ for comprometido, o atacante **ainda não está na rede interna**.',
      example: 'O servidor do portal fica na DMZ. O banco com os processos fica na rede interna, e o firewall só deixa o portal falar com ele na porta necessária.',
      check: {
        kind: 'choice',
        id: 'dz-c',
        prompt: 'Qual destes servidores deve ficar na DMZ?',
        options: [
          { text: 'O portal acessado pelos cidadãos', why: 'Isso. Serviço exposto à internet.' },
          { text: 'O banco de dados dos processos sigilosos', why: 'Esse fica na rede interna, protegido.' },
          { text: 'O controlador de domínio', why: 'O DC é interno; não deve ficar exposto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A DMZ é o **balcão de atendimento** do prédio: o público entra até ali. Os **arquivos** ficam lá dentro, atrás de outra porta. Se alguém mal-intencionado chega ao balcão, ainda não chegou aos arquivos.',
        check: {
          kind: 'choice',
          id: 'dz-r',
          prompt: 'Qual é a vantagem de pôr o servidor de e-mail na DMZ?',
          options: [
            { text: 'Se ele for invadido, o atacante ainda não está na rede interna', why: 'Isso.' },
            { text: 'Ele fica imune a qualquer ataque', why: 'Não fica imune; a DMZ limita o estrago.' },
            { text: 'Ele dispensa firewall', why: 'É o contrário: a DMZ depende de firewall separando as redes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'vpn',
      part: 'VPN',
      title: 'VPN: site a site e acesso remoto',
      goal: 'Diferenciar os dois tipos de VPN.',
      explain:
        'Uma **VPN** cria um **túnel cifrado** sobre uma rede insegura (como a internet).\n\n- **Site a site**: liga **duas redes**, por exemplo a sede e um escritório regional.\n- **Acesso remoto**: liga **um usuário** à rede da organização.',
      check: {
        kind: 'choice',
        id: 'vp-c',
        prompt: 'O auditor em viagem precisa acessar os sistemas internos pelo notebook. Que tipo de VPN?',
        options: [
          { text: 'Acesso remoto', why: 'Isso. Liga um usuário à rede.' },
          { text: 'Site a site', why: 'Site a site liga duas redes inteiras.' },
          { text: 'Nenhuma: basta abrir o sistema na internet', why: 'Expor sistemas internos é o que a VPN evita.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Site a site é uma **ponte permanente** entre dois prédios. Acesso remoto é um **crachá** que deixa **uma pessoa** entrar de longe. Nos dois casos, o caminho vai **cifrado**.',
        check: {
          kind: 'choice',
          id: 'vp-r',
          prompt: 'A sede em Goiânia e a regional de Anápolis precisam ficar ligadas o tempo todo. Que tipo de VPN?',
          options: [
            { text: 'Site a site', why: 'Isso. Liga as duas redes.' },
            { text: 'Acesso remoto', why: 'Acesso remoto liga um usuário, não uma rede inteira.' },
            { text: 'Proxy reverso', why: 'Proxy reverso fica na frente de servidores; não liga redes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'vpn-tecnologias',
      part: 'VPN',
      title: 'IPsec (AH e ESP), TLS e WireGuard',
      goal: 'Saber o que AH e ESP fazem e conhecer as tecnologias de VPN.',
      explain:
        'Tecnologias de VPN:\n\n- **IPsec**: camada de **rede**; modos **túnel** e **transporte**. Dois protocolos:\n\n| Protocolo | Faz |\n|---|---|\n| **AH** | **Autentica** |\n| **ESP** | **Cifra e autentica** |\n\n- **VPN TLS/SSL**.\n- **WireGuard**: moderna e enxuta.',
      check: {
        kind: 'choice',
        id: 'vt-c',
        prompt: 'No IPsec, qual protocolo cifra os dados?',
        options: [
          { text: 'ESP', why: 'Isso. ESP cifra e autentica.' },
          { text: 'AH', why: 'AH só autentica; não cifra.' },
          { text: 'WireGuard', why: 'WireGuard é outra tecnologia de VPN, não um protocolo do IPsec.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**AH** é o **selo** no envelope: garante quem mandou e que ninguém mexeu, mas dá para ler. **ESP** é o **envelope lacrado e opaco**: além do selo, ninguém lê o conteúdo.',
        check: {
          kind: 'choice',
          id: 'vt-r',
          prompt: 'Em que camada atua o IPsec?',
          options: [
            { text: 'Rede', why: 'Isso.' },
            { text: 'Aplicação', why: 'Não. O IPsec atua na camada de rede.' },
            { text: 'Física', why: 'Não. O IPsec atua na camada de rede.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'proxy',
      part: 'Proxies',
      title: 'Proxy e proxy reverso',
      goal: 'Saber na frente de quem fica cada tipo de proxy.',
      explain:
        '| Tipo | Fica na frente de | Para quê |\n|---|---|---|\n| **Proxy** (de encaminhamento) | Os **clientes** | Controlar e registrar o acesso dos usuários à internet, fazer cache, filtrar conteúdo |\n| **Proxy reverso** | Os **servidores** | Esconder os servidores internos, **terminar o TLS**, fazer cache, balancear carga, servir de WAF |',
      check: {
        kind: 'choice',
        id: 'px-c',
        prompt: 'Um servidor recebe as requisições da internet, termina o TLS e repassa aos servidores web internos. Ele é um:',
        options: [
          { text: 'Proxy reverso', why: 'Isso. Fica na frente dos servidores.' },
          { text: 'Proxy de encaminhamento', why: 'Esse fica na frente dos clientes, controlando o acesso deles à internet.' },
          { text: 'Servidor DHCP', why: 'DHCP distribui configurações de rede.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: **quem ele representa?** O proxy comum representa os **usuários de dentro** quando saem para a internet. O **reverso** representa os **servidores** para quem chega de fora. Uma pegadinha comum: o reverso **não** protege os clientes internos.',
        check: {
          kind: 'sort',
          id: 'px-r',
          prompt: 'Proxy de encaminhamento ou reverso?',
          categories: ['Encaminhamento', 'Reverso'],
          items: [
            { text: 'Registra os sites que os servidores do Tribunal acessam', cat: 0, why: 'Fica na frente dos clientes.' },
            { text: 'Esconde os servidores web internos de quem vem da internet', cat: 1, why: 'Fica na frente dos servidores.' },
            { text: 'Bloqueia sites proibidos para os usuários', cat: 0, why: 'Filtra o acesso dos clientes.' },
          ],
        },
      },
    },
    {
      id: 'balanceamento',
      part: 'Balanceamento',
      title: 'Balanceador e seus algoritmos',
      goal: 'Conhecer os algoritmos de balanceamento.',
      explain:
        'O **balanceador de carga** distribui as requisições entre **vários servidores**, aumentando a **capacidade** e a **disponibilidade**.\n\nAlgoritmos:\n\n- ***round robin***: rodízio, um de cada vez;\n- **menos conexões**: vai para o mais livre;\n- **por peso**: servidores mais fortes recebem mais;\n- **por *hash* do endereço do cliente**: o mesmo cliente cai sempre no mesmo servidor (**afinidade**).',
      check: {
        kind: 'choice',
        id: 'bl-c',
        prompt: 'O sistema guarda a sessão do usuário só no servidor em que ele entrou. Que algoritmo mantém o usuário sempre no mesmo servidor?',
        options: [
          { text: 'Hash do endereço do cliente (afinidade)', why: 'Isso.' },
          { text: 'Round robin', why: 'O rodízio mandaria cada pedido a um servidor diferente.' },
          { text: 'Menos conexões', why: 'Vai para o mais livre, que pode mudar a cada pedido.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **guichês**: **rodízio** é chamar o próximo guichê da fila; **menos conexões** é mandar para o guichê com menos gente; **peso** é o guichê com dois atendentes receber o dobro; **afinidade** é o cidadão voltar sempre ao **mesmo** atendente, que já conhece o caso.',
        check: {
          kind: 'choice',
          id: 'bl-r',
          prompt: 'Para que serve um balanceador de carga?',
          options: [
            { text: 'Distribuir as requisições entre vários servidores', why: 'Isso: mais capacidade e disponibilidade.' },
            { text: 'Cifrar a ligação entre duas redes', why: 'Isso é VPN.' },
            { text: 'Traduzir nomes em IPs', why: 'Isso é DNS.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'camadas-saude',
      part: 'Balanceamento',
      title: 'Camada 4, camada 7 e verificação de saúde',
      goal: 'Diferenciar balanceamento por IP e porta do balanceamento por conteúdo.',
      explain:
        '- **Camada 4**: decide por **IP e porta**, **sem olhar o conteúdo**.\n- **Camada 7**: decide pelo **conteúdo HTTP** (caminho, cabeçalhos, cookies).\n- **Verificação de saúde** (*health check*): servidores que **não respondem saem do rodízio** automaticamente.',
      example: 'Pedidos para `/api` vão aos servidores de API e pedidos para `/imagens` vão aos de arquivos. Só um balanceador de camada 7 faz isso, porque precisa ler o caminho.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: 'Mandar /api para um grupo de servidores e /imagens para outro exige balanceamento de:',
        options: [
          { text: 'Camada 7, que lê o conteúdo HTTP', why: 'Isso. O caminho está no HTTP.' },
          { text: 'Camada 4, que olha IP e porta', why: 'IP e porta são os mesmos para os dois caminhos. É preciso ler o HTTP.' },
          { text: 'Nenhum: isso é tarefa do DNS', why: 'O DNS resolve nomes, não caminhos dentro do site.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Camada **4** olha só o **envelope** (endereço e porta). Camada **7** **abre e lê** a carta (caminho, cabeçalhos, cookies). E a verificação de saúde é **checar se o atendente está presente** antes de mandar alguém a ele.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'Um dos três servidores web caiu. O que faz o balanceador com verificação de saúde?',
          options: [
            { text: 'Tira o servidor do rodízio automaticamente', why: 'Isso. Os pedidos seguem para os outros dois.' },
            { text: 'Continua mandando pedidos a ele', why: 'Sem verificação de saúde seria assim; com ela, ele sai do rodízio.' },
            { text: 'Desliga os outros dois', why: 'Não. Os que respondem continuam atendendo.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'wifi',
      part: 'Redes sem fio',
      title: 'Wi-Fi: WPA2, WPA3 e o modo Enterprise',
      goal: 'Escolher a segurança adequada para uma rede sem fio corporativa.',
      explain:
        'As redes Wi-Fi seguem a família **IEEE 802.11**.\n\n- Use **WPA2** ou, **preferencialmente, WPA3**.\n- **WEP** e o **WPA original** são **inseguros**.\n- Em ambiente corporativo, o modo **Enterprise** autentica **cada usuário individualmente** (**802.1X** com servidor **RADIUS**), em vez de uma senha compartilhada.',
      check: {
        kind: 'choice',
        id: 'wf-c',
        prompt: 'O Tribunal quer que cada servidor entre no Wi-Fi com o próprio usuário, e não com uma senha única para todos. O que usar?',
        options: [
          { text: 'Modo Enterprise: 802.1X com servidor RADIUS', why: 'Isso.' },
          { text: 'WEP com senha forte', why: 'WEP é inseguro, e continua sendo senha compartilhada.' },
          { text: 'WPA original com senha única', why: 'O WPA original é inseguro, e a senha seria compartilhada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Senha compartilhada é **uma chave para o prédio todo**: se alguém sai do órgão, é preciso trocar a fechadura. No modo **Enterprise**, cada um tem **o próprio crachá** (802.1X), conferido por um servidor (RADIUS). Para a cifra, prefira **WPA3**.',
        check: {
          kind: 'sort',
          id: 'wf-r',
          prompt: 'Seguro ou inseguro hoje?',
          categories: ['Recomendado', 'Inseguro'],
          items: [
            { text: 'WPA3', cat: 0, why: 'É o preferido.' },
            { text: 'WEP', cat: 1, why: 'Considerado inseguro.' },
            { text: 'WPA original', cat: 1, why: 'Considerado inseguro.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Um cidadão acessa o portal do Tribunal. Ponha na ordem o caminho da requisição.',
      items: ['Firewall de borda libera a porta 443', 'Proxy reverso na DMZ termina o TLS e passa pelo WAF', 'Balanceador escolhe um servidor web saudável', 'Servidor web consulta o banco na rede interna'],
      why: 'De fora para dentro: firewall, proxy reverso com WAF, balanceamento e, por fim, o acesso à rede interna.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'O firewall com estado libera as respostas de conexões iniciadas de dentro', correct: true, why: 'Ele acompanha as conexões.' },
        { text: 'No IPsec, o ESP cifra e autentica', correct: true, why: 'O AH só autentica.' },
        { text: 'O proxy reverso protege os clientes da rede interna', correct: false, why: 'Ele fica na frente dos servidores.' },
        { text: 'WEP é recomendado para redes corporativas', correct: false, why: 'WEP é inseguro.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites desenhou a topologia nova. Toque na linha errada.',
      lines: ['DMZ: portal e servidor de e-mail', 'Rede interna: banco de processos e controlador de domínio', 'DMZ: servidor de arquivos sigilosos da Presidência'],
      bug: 2,
      why: 'Arquivos sigilosos não são serviço exposto à internet: ficam na rede interna, nunca na DMZ.',
      fixed: 'Rede interna: servidor de arquivos sigilosos da Presidência',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O Tribunal precisa ligar a sede a 3 escritórios regionais com segurança. Qual proposta?',
      scenarios: [
        { title: 'Proposta A', body: 'VPN site a site com IPsec (ESP) entre a sede e cada regional.' },
        { title: 'Proposta B', body: 'Abrir na internet as portas dos sistemas internos para os IPs das regionais.' },
      ],
      answer: 0,
      why: 'A VPN cria túneis cifrados entre as redes. Expor os sistemas internos na internet aumenta muito o risco.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: os servidores do Tribunal devem acessar a internet só por um ponto que registre e filtre os sites visitados. O que colocar?',
      options: [
        { text: 'Um proxy de encaminhamento', why: 'Isso. Fica na frente dos clientes, registra e filtra.' },
        { text: 'Um proxy reverso', why: 'O reverso fica na frente dos servidores para quem vem de fora.' },
        { text: 'Um balanceador de camada 4', why: 'Balanceador distribui carga entre servidores; não filtra a navegação.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.012' },
  ],
  summary: [
    'Filtro de pacotes olha pacote a pacote; o firewall com estado acompanha conexões.',
    'NGFW inspeciona conteúdo, aplicações e usuários; WAF barra injeção de SQL e XSS nas requisições HTTP.',
    'DMZ guarda os serviços expostos, separados da rede interna.',
    'VPN site a site liga redes; acesso remoto liga um usuário. IPsec: AH autentica, ESP cifra e autentica.',
    'Proxy fica na frente dos clientes; proxy reverso, na frente dos servidores (TLS, cache, WAF).',
    'Balanceamento: rodízio, menos conexões, peso, afinidade. Camada 4 olha IP e porta; camada 7 lê o HTTP. Health check tira quem caiu.',
    'Wi-Fi: WPA3 (ou WPA2); WEP e WPA original são inseguros. Enterprise: 802.1X com RADIUS.',
  ],
};
