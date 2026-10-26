// Microaula "DNS, DHCP e protocolos de aplicação" (cap.infra.01, seção servicos), no formato aprovado
// em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos
// conferidos com o texto do capítulo (03-servicos.md); nomes e endereços são exemplos didáticos.
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraServicos: MicroLesson = {
  id: 'micro.infra.servicos',
  chapterId: 'cap.infra.01',
  sectionId: 'servicos',
  title: 'DNS, DHCP e protocolos de aplicação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você digita portal.tce.go.gov.br no navegador. Mas a rede só entrega dados a endereços IP. O que acontece antes de a página carregar?',
    options: [
      { text: 'Um serviço traduz o nome no endereço IP do servidor', why: 'Isso. É o DNS, o primeiro assunto da aula.' },
      { text: 'O navegador adivinha o endereço pelo nome', why: 'Não há adivinhação. O DNS consulta e responde o endereço.' },
      { text: 'Nada: a rede entende nomes diretamente', why: 'A rede entrega por endereço IP. Alguém precisa traduzir o nome: o DNS.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'dns',
      part: 'DNS',
      title: 'DNS: de nomes para endereços',
      goal: 'Saber o que o DNS faz e como ele é organizado.',
      explain:
        'O **DNS** traduz **nomes** (`portal.tce.go.gov.br`) em **endereços IP**.\n\nEle é um banco de dados **distribuído e hierárquico**:\n\n1. **servidores raiz**;\n2. servidores dos **domínios de topo** (como `.br`);\n3. servidores **autoritativos** de cada domínio, que têm a resposta oficial.',
      check: {
        kind: 'choice',
        id: 'dn-c',
        prompt: 'Como o DNS é organizado?',
        options: [
          { text: 'Distribuído e hierárquico: raiz, domínios de topo e autoritativos', why: 'Isso.' },
          { text: 'Num único servidor mundial com todos os nomes', why: 'Não. Ele é distribuído em muitos servidores, em hierarquia.' },
          { text: 'Uma lista guardada em cada computador', why: 'Não. A consulta vai a servidores organizados em hierarquia.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **endereço postal lido de trás para frente**: `portal.tce.go.gov.br` começa pelo **br** (o país), depois **gov**, **go**, **tce** e por fim o **portal**. Cada nível sabe quem cuida do nível seguinte, até chegar ao servidor **autoritativo**, que tem a resposta.',
        check: {
          kind: 'choice',
          id: 'dn-r',
          prompt: 'Qual servidor tem a resposta oficial sobre os nomes de um domínio?',
          options: [
            { text: 'O servidor autoritativo do domínio', why: 'Isso.' },
            { text: 'O servidor raiz', why: 'A raiz só indica quem cuida dos domínios de topo.' },
            { text: 'O servidor DHCP', why: 'DHCP distribui configurações de rede; não responde nomes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'registros-1',
      part: 'DNS',
      title: 'Registros A, AAAA, CNAME e PTR',
      goal: 'Associar cada registro à sua tradução.',
      explain:
        '| Registro | Função |\n|---|---|\n| **A** | Nome → endereço **IPv4** |\n| **AAAA** | Nome → endereço **IPv6** |\n| **CNAME** | **Apelido** que aponta para outro nome |\n| **PTR** | Resolução **reversa**: IP → nome |',
      example: '`www.tribunal.local` é CNAME de `portal.tribunal.local`; este tem registro A `10.0.0.20` e AAAA `2001:db8::20`.',
      check: {
        kind: 'choice',
        id: 'r1-c',
        prompt: 'Qual registro traduz um nome em endereço IPv6?',
        options: [
          { text: 'AAAA', why: 'Isso. A é para IPv4; AAAA, para IPv6.' },
          { text: 'A', why: 'A é para IPv4.' },
          { text: 'PTR', why: 'PTR faz o caminho inverso: IP para nome.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Um macete: o IPv6 é **quatro vezes** maior que o IPv4 (128 contra 32 bits), e o registro dele tem **quatro letras A**: AAAA. O **PTR** (de *pointer*) aponta de volta, do número para o nome.',
        check: {
          kind: 'sort',
          id: 'r1-r',
          prompt: 'Qual registro resolve cada pergunta?',
          categories: ['A', 'CNAME', 'PTR'],
          items: [
            { text: 'Qual é o IPv4 de intranet.tribunal.local?', cat: 0, why: 'Nome para IPv4.' },
            { text: 'www é outro nome para portal?', cat: 1, why: 'Apelido.' },
            { text: 'Qual nome tem o endereço 10.0.0.20?', cat: 2, why: 'Reverso: IP para nome.' },
          ],
        },
      },
    },
    {
      id: 'registros-2',
      part: 'DNS',
      title: 'Registros MX, NS, TXT e SOA',
      goal: 'Associar MX, NS, TXT e SOA às suas funções.',
      explain:
        '| Registro | Função |\n|---|---|\n| **MX** | Servidores de **e-mail** do domínio (com **prioridade**) |\n| **NS** | Servidores **autoritativos** do domínio |\n| **TXT** | Texto livre; usado em **SPF, DKIM, DMARC** e verificações de domínio |\n| **SOA** | Dados da **zona**: servidor primário, serial, tempos |',
      check: {
        kind: 'choice',
        id: 'r2-c',
        prompt: 'O SPF, que diz quais servidores podem enviar e-mail em nome do domínio, é publicado em que tipo de registro?',
        options: [
          { text: 'TXT', why: 'Isso. SPF, DKIM e DMARC vão em registros TXT.' },
          { text: 'MX', why: 'MX indica quem recebe o e-mail do domínio; o SPF vai em TXT.' },
          { text: 'SOA', why: 'SOA traz dados da zona.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**MX** = *mail exchanger*: para onde vai o **e-mail recebido**. **NS** = *name server*: quem **responde** pelo domínio. **SOA** = *start of authority*: a **ficha da zona**. **TXT** = um **mural** onde se publicam textos, como as regras antifraude do e-mail.',
        check: {
          kind: 'choice',
          id: 'r2-r',
          prompt: 'Qual registro indica os servidores responsáveis por receber e-mails do domínio?',
          options: [
            { text: 'MX', why: 'Isso, com prioridade entre eles.' },
            { text: 'NS', why: 'NS indica os servidores autoritativos de DNS.' },
            { text: 'CNAME', why: 'CNAME é apelido.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'recursiva',
      part: 'DNS',
      title: 'Consulta recursiva e iterativa',
      goal: 'Diferenciar os dois modos de consulta.',
      explain:
        '- Na consulta **recursiva**, o **resolvedor faz todo o trabalho** e devolve a **resposta final** ao cliente.\n- Na **iterativa**, cada servidor **indica o próximo** a ser consultado.',
      example: 'Seu computador pergunta ao resolvedor do Tribunal (recursiva). O resolvedor, por sua vez, pergunta à raiz, que indica o `.br`, que indica o servidor de `tce.go.gov.br` (iterativa).',
      check: {
        kind: 'choice',
        id: 'rc-c',
        prompt: 'Em qual consulta o servidor responde "não sei, pergunte àquele outro"?',
        options: [
          { text: 'Iterativa', why: 'Isso. Cada servidor indica o próximo.' },
          { text: 'Recursiva', why: 'Na recursiva o resolvedor entrega a resposta final.' },
          { text: 'Reversa', why: 'Reversa é IP para nome (PTR), outro assunto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Recursiva** é pedir ao **secretário**: "descubra para mim" e ele volta com a resposta pronta. **Iterativa** é ir de **balcão em balcão**, e cada um diz "não é aqui, vá ao balcão 3".',
        check: {
          kind: 'choice',
          id: 'rc-r',
          prompt: 'Na consulta recursiva, quem faz o trabalho de percorrer os servidores?',
          options: [
            { text: 'O resolvedor', why: 'Isso. O cliente só recebe a resposta final.' },
            { text: 'O próprio cliente', why: 'Isso é o que acontece na iterativa.' },
            { text: 'O servidor DHCP', why: 'O DHCP não participa da resolução de nomes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'cache-porta',
      part: 'DNS',
      title: 'Cache, TTL e a porta 53',
      goal: 'Saber quanto tempo a resposta fica guardada e qual transporte o DNS usa.',
      explain:
        'As respostas do DNS ficam em **cache** pelo tempo do **TTL** (o prazo de validade da resposta). Assim, a próxima consulta ao mesmo nome é respondida na hora.\n\nO DNS usa a **porta 53**:\n\n- em **UDP** nas consultas comuns;\n- em **TCP** para respostas grandes e **transferências de zona**.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Uma transferência de zona entre servidores DNS usa:',
        options: [
          { text: 'TCP, porta 53', why: 'Isso. Respostas grandes e transferências de zona vão por TCP.' },
          { text: 'UDP, porta 53', why: 'UDP é das consultas comuns.' },
          { text: 'UDP, porta 67', why: '67 é o servidor DHCP.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **TTL** como a **data de validade** de um bilhete na geladeira: enquanto vale, ninguém pergunta de novo. Para recados curtos, o DNS usa o rápido **UDP**; para mandar a lista inteira de nomes (transferência de zona), usa o confiável **TCP**.',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'O que define por quanto tempo uma resposta DNS fica em cache?',
          options: [
            { text: 'O TTL', why: 'Isso.' },
            { text: 'O registro MX', why: 'MX indica servidores de e-mail.' },
            { text: 'A porta 53', why: 'A porta diz onde o serviço escuta, não o tempo de cache.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dhcp',
      part: 'DHCP',
      title: 'DHCP: configuração automática',
      goal: 'Saber o que o DHCP entrega e o que é a concessão.',
      explain:
        'O **DHCP** entrega **automaticamente** ao computador:\n\n- endereço **IP**;\n- **máscara**;\n- **gateway** (o roteador de saída);\n- servidores **DNS**.\n\nA **concessão** (*lease*) tem **prazo** e precisa ser **renovada**. O DHCP usa **UDP**, porta **67** no servidor e **68** no cliente.',
      check: {
        kind: 'choice',
        id: 'dh-c',
        prompt: 'Qual destes itens NÃO é entregue pelo DHCP?',
        options: [
          { text: 'A senha do usuário no domínio', why: 'Isso. Senhas não são assunto do DHCP.' },
          { text: 'O gateway', why: 'O gateway é entregue pelo DHCP.' },
          { text: 'Os servidores DNS', why: 'Os servidores DNS são entregues pelo DHCP.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O DHCP é a **recepção do prédio** que entrega ao recém-chegado o **crachá provisório**: número da sala (IP), andar (máscara), saída (gateway) e a quem perguntar endereços (DNS). O crachá **vence** e precisa ser renovado: é a concessão.',
        check: {
          kind: 'choice',
          id: 'dh-r',
          prompt: 'Que portas e transporte o DHCP usa?',
          options: [
            { text: 'UDP, 67 no servidor e 68 no cliente', why: 'Isso.' },
            { text: 'TCP, 67 e 68', why: 'O DHCP usa UDP.' },
            { text: 'UDP, 53', why: '53 é o DNS.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dora',
      part: 'DHCP',
      title: 'DORA: as quatro mensagens',
      goal: 'Ordenar Discover, Offer, Request e Acknowledge.',
      explain:
        'O DHCP tem quatro mensagens, lembradas pela sigla **DORA**:\n\n1. **Discover**: o cliente procura servidores (**broadcast**).\n2. **Offer**: um servidor **oferece** um endereço.\n3. **Request**: o cliente **pede** o endereço oferecido.\n4. **Acknowledge**: o servidor **confirma**.',
      check: {
        kind: 'choice',
        id: 'do-c',
        prompt: 'Qual é a sequência correta do DHCP?',
        options: [
          { text: 'Discover, Offer, Request, Acknowledge', why: 'Isso: DORA.' },
          { text: 'Request, Offer, Discover, Acknowledge', why: 'Começa pelo Discover: o cliente ainda nem sabe quem é o servidor.' },
          { text: 'Offer, Discover, Acknowledge, Request', why: 'O servidor só oferece depois de o cliente procurar.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Como pedir um quarto num hotel desconhecido: "**tem alguém aí?**" (Discover), "**tenho o quarto 12**" (Offer), "**quero o 12**" (Request), "**está reservado**" (Acknowledge). As iniciais formam **DORA**.',
        check: {
          kind: 'order',
          id: 'do-r',
          prompt: 'Ponha as mensagens do DHCP na ordem.',
          items: ['Discover', 'Offer', 'Request', 'Acknowledge'],
          why: 'DORA.',
        },
      },
    },
    {
      id: 'http2',
      part: 'Web',
      title: 'HTTP/1.1 e HTTP/2',
      goal: 'Saber o que o HTTP/2 trouxe em relação ao HTTP/1.1.',
      explain:
        '| Versão | Transporte | Características |\n|---|---|---|\n| HTTP/1.1 | TCP | Texto; conexões persistentes; **uma requisição por vez** em cada conexão |\n| **HTTP/2** | TCP | Formato **binário**, **multiplexação** de várias requisições na mesma conexão, compressão de cabeçalhos (**HPACK**), prioridades |\n\n**HTTPS** é HTTP protegido por **TLS**.',
      check: {
        kind: 'choice',
        id: 'h2-c',
        prompt: 'O que significa multiplexação no HTTP/2?',
        options: [
          { text: 'Várias requisições ao mesmo tempo na mesma conexão', why: 'Isso.' },
          { text: 'Uma requisição por vez em cada conexão', why: 'Isso é o HTTP/1.1.' },
          { text: 'Usar UDP em vez de TCP', why: 'Isso é do HTTP/3 (QUIC sobre UDP).' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'HTTP/1.1 é um **guichê com fila única**: um pedido por vez. HTTP/2 é o **mesmo guichê** atendendo **vários pedidos intercalados**, em formato binário e com cabeçalhos comprimidos (HPACK).',
        check: {
          kind: 'choice',
          id: 'h2-r',
          prompt: 'Qual é o formato das mensagens no HTTP/2?',
          options: [
            { text: 'Binário', why: 'Isso. O HTTP/1.1 é texto.' },
            { text: 'Texto, como no HTTP/1.1', why: 'O HTTP/2 passou a ser binário.' },
            { text: 'LDIF', why: 'LDIF é formato do LDAP.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'http3',
      part: 'Web',
      title: 'HTTP/3: QUIC sobre UDP',
      goal: 'Saber o que distingue o HTTP/3.',
      explain:
        'O **HTTP/3** roda sobre **QUIC**, que usa **UDP**. Ganhos:\n\n- elimina o bloqueio do TCP quando um pacote se perde (***head-of-line blocking***);\n- **TLS 1.3 integrado**;\n- conexão **mais rápida**, que **sobrevive à troca de rede** (do Wi-Fi para o 4G).',
      check: {
        kind: 'choice',
        id: 'h3-c',
        prompt: 'Em comparação com o HTTP/2, o HTTP/3 se distingue por:',
        options: [
          { text: 'Usar QUIC sobre UDP', why: 'Isso.' },
          { text: 'Usar TCP com multiplexação', why: 'Isso é o HTTP/2.' },
          { text: 'Voltar a enviar texto puro', why: 'Não. A novidade é o transporte QUIC sobre UDP.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No HTTP/2 sobre TCP, se **um pacote se perde**, **todos** os pedidos da conexão esperam (como uma fila que trava por causa de um só). O QUIC trata cada pedido separadamente, então a perda de um não trava os outros.',
        check: {
          kind: 'choice',
          id: 'h3-r',
          prompt: 'O analista sai do Wi-Fi do Tribunal e passa ao 4G no meio de um download. Qual versão do HTTP tende a manter a conexão?',
          options: [
            { text: 'HTTP/3', why: 'Isso. A conexão QUIC sobrevive à troca de rede.' },
            { text: 'HTTP/1.1', why: 'A conexão TCP se perde com a troca de rede.' },
            { text: 'HTTP/2', why: 'Também usa TCP, que não sobrevive à troca de rede.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'email',
      part: 'E-mail, FTP e SSH',
      title: 'E-mail: SMTP envia; IMAP e POP3 leem',
      goal: 'Diferenciar SMTP, IMAP e POP3.',
      explain:
        'O **SMTP** **envia** mensagens: porta **25** entre servidores; **587** para o cliente enviar, com STARTTLS.\n\nPara **ler**, os clientes usam:\n\n- **IMAP**: **mantém** as mensagens no servidor e **sincroniza** as pastas;\n- **POP3**: **baixa** as mensagens.',
      check: {
        kind: 'choice',
        id: 'em-c',
        prompt: 'O analista lê o e-mail no celular e no computador e quer ver as mesmas pastas nos dois. Qual protocolo?',
        options: [
          { text: 'IMAP', why: 'Isso. Mantém no servidor e sincroniza.' },
          { text: 'POP3', why: 'POP3 baixa as mensagens; não sincroniza pastas entre aparelhos.' },
          { text: 'SMTP', why: 'SMTP é para enviar.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**SMTP** é o **carteiro que leva** a carta. **IMAP** é a **caixa postal no correio**: você consulta de qualquer lugar e tudo fica lá. **POP3** é **levar as cartas para casa**: saem da caixa.',
        check: {
          kind: 'sort',
          id: 'em-r',
          prompt: 'Qual protocolo?',
          categories: ['SMTP', 'IMAP', 'POP3'],
          items: [
            { text: 'Enviar a mensagem do cliente ao servidor (porta 587)', cat: 0, why: 'Envio é SMTP.' },
            { text: 'Ler mantendo as pastas sincronizadas no servidor', cat: 1, why: 'IMAP.' },
            { text: 'Baixar as mensagens para o computador', cat: 2, why: 'POP3.' },
          ],
        },
      },
    },
    {
      id: 'ftp',
      part: 'E-mail, FTP e SSH',
      title: 'FTP ativo, passivo e as versões seguras',
      goal: 'Diferenciar FTP ativo e passivo e conhecer SFTP e FTPS.',
      explain:
        'O **FTP** usa uma conexão de **controle** (porta **21**) e outra de **dados**.\n\n- No modo **ativo**, o **servidor** abre a conexão de dados para o cliente.\n- No **passivo**, o **cliente** abre as duas, o que funciona **melhor atrás de firewalls**.\n\nO FTP tradicional trafega **senhas em claro**. Alternativas seguras: **SFTP** (sobre SSH) e **FTPS** (FTP com TLS).',
      check: {
        kind: 'choice',
        id: 'ft-c',
        prompt: 'Qual modo do FTP funciona melhor quando o cliente está atrás de um firewall?',
        options: [
          { text: 'Passivo, porque o cliente abre as duas conexões', why: 'Isso.' },
          { text: 'Ativo, porque o servidor abre a conexão de dados', why: 'É justamente a conexão aberta pelo servidor que o firewall do cliente costuma barrar.' },
          { text: 'Nenhum: FTP não funciona com firewall', why: 'Funciona; o passivo se dá melhor.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O firewall do cliente deixa **sair** pedidos, mas desconfia de quem tenta **entrar**. No **ativo**, o servidor tenta entrar (abre a conexão de dados): costuma ser barrado. No **passivo**, é o cliente quem sai para abrir tudo.',
        check: {
          kind: 'choice',
          id: 'ft-r',
          prompt: 'Qual é a alternativa segura que roda sobre o SSH?',
          options: [
            { text: 'SFTP', why: 'Isso. FTPS é o FTP com TLS.' },
            { text: 'FTPS', why: 'FTPS é FTP com TLS, não sobre SSH.' },
            { text: 'FTP no modo passivo', why: 'O modo passivo não cifra a senha.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ssh',
      part: 'E-mail, FTP e SSH',
      title: 'SSH: o terminal remoto cifrado',
      goal: 'Saber o que o SSH oferece e o que ele substituiu.',
      explain:
        'O **SSH** (porta **22**) oferece:\n\n- **acesso remoto cifrado** ao terminal;\n- autenticação por **senha** ou por **par de chaves**;\n- **cópia segura** de arquivos (SCP/SFTP);\n- **túneis**.\n\nEle **substituiu o Telnet**, que **não cifrava nada**.',
      check: {
        kind: 'choice',
        id: 'ss-c',
        prompt: 'Por que o Telnet foi substituído pelo SSH?',
        options: [
          { text: 'Porque o Telnet não cifrava nada', why: 'Isso.' },
          { text: 'Porque o Telnet não tinha terminal', why: 'O Telnet dava acesso ao terminal, mas sem cifrar.' },
          { text: 'Porque o SSH usa UDP', why: 'O SSH usa TCP, porta 22. O motivo foi a cifra.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Telnet é conversar com o servidor **em voz alta no corredor**: senha e comandos, todos ouvem. SSH é a mesma conversa **em sala fechada**, com a opção de entrar com uma **chave** em vez de senha.',
        check: {
          kind: 'choice',
          id: 'ss-r',
          prompt: 'Qual destes recursos NÃO é do SSH?',
          options: [
            { text: 'Distribuir endereços IP aos computadores', why: 'Isso é o DHCP.' },
            { text: 'Autenticação por par de chaves', why: 'É do SSH.' },
            { text: 'Cópia segura de arquivos (SCP/SFTP)', why: 'É do SSH.' },
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
      prompt: 'Um notebook novo é ligado na rede e abre o portal. Ponha na ordem.',
      items: ['DHCP Discover e Offer', 'DHCP Request e Acknowledge: recebe IP, gateway e DNS', 'Consulta DNS pelo registro A do portal', 'Conexão HTTPS ao endereço recebido'],
      why: 'Primeiro a configuração de rede (DORA), depois o nome vira endereço, então a conexão.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'O registro MX indica os servidores de e-mail do domínio', correct: true, why: 'Com prioridade.' },
        { text: 'O HTTP/3 usa QUIC sobre UDP', correct: true, why: 'É a diferença central.' },
        { text: 'O POP3 mantém as pastas sincronizadas no servidor', correct: false, why: 'Isso é o IMAP; o POP3 baixa.' },
        { text: 'O DNS usa só TCP', correct: false, why: 'UDP nas consultas comuns; TCP nas grandes e nas transferências de zona.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou os registros DNS do novo sistema. Toque na linha errada.',
      lines: ['sistema.tribunal.local  A     10.0.0.40', 'sistema.tribunal.local  AAAA  10.0.0.41', 'app.tribunal.local      CNAME sistema.tribunal.local'],
      bug: 1,
      why: 'AAAA aponta para um endereço IPv6. 10.0.0.41 é IPv4 e iria num registro A.',
      fixed: 'sistema.tribunal.local  AAAA  2001:db8::41',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O Tribunal precisa receber arquivos de um fornecedor com segurança. Qual proposta atende?',
      scenarios: [
        { title: 'Proposta A', body: 'FTP tradicional na porta 21, modo ativo.' },
        { title: 'Proposta B', body: 'SFTP, sobre SSH, na porta 22, com autenticação por par de chaves.' },
      ],
      answer: 1,
      why: 'O FTP tradicional trafega a senha em claro. O SFTP cifra tudo e aceita par de chaves.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: um computador recebe o IP, mas não consegue abrir nenhum site pelo nome, só pelo endereço IP. O que provavelmente falta na configuração que veio do DHCP?',
      options: [
        { text: 'Os servidores DNS', why: 'Isso. Sem DNS, nomes não viram endereços.' },
        { text: 'A porta 22', why: '22 é o SSH, sem relação com abrir sites por nome.' },
        { text: 'O registro MX', why: 'MX trata de e-mail, não da navegação.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.010' },
  ],
  summary: [
    'DNS: nomes para IPs, distribuído e hierárquico (raiz, topo, autoritativos).',
    'A (IPv4), AAAA (IPv6), CNAME (apelido), PTR (reverso), MX (e-mail), NS, TXT (SPF, DKIM, DMARC), SOA.',
    'Recursiva: o resolvedor entrega a resposta; iterativa: cada um indica o próximo. Cache pelo TTL. Porta 53, UDP e TCP.',
    'DHCP entrega IP, máscara, gateway e DNS; concessão com prazo; DORA; UDP 67 e 68.',
    'HTTP/2: binário e multiplexado sobre TCP. HTTP/3: QUIC sobre UDP, sem bloqueio por perda, TLS 1.3.',
    'SMTP envia (25 e 587); IMAP sincroniza; POP3 baixa.',
    'FTP passivo funciona melhor com firewall; seguro é SFTP (SSH) ou FTPS (TLS). SSH substituiu o Telnet.',
  ],
};
