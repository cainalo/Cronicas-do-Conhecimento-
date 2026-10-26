// Microaula "Endereçamento IPv4 e IPv6" (cap.infra.01, seção enderecos), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos e contas
// conferidos com o texto do capítulo (02-enderecos.md); endereços são exemplos didáticos.
// Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraEnderecos: MicroLesson = {
  id: 'micro.infra.enderecos',
  chapterId: 'cap.infra.01',
  sectionId: 'enderecos',
  title: 'Endereçamento IPv4 e IPv6',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Os computadores do Tribunal têm endereços como 192.168.10.37. Como o roteador sabe se outro computador está na mesma rede ou fora dela?',
    options: [
      { text: 'Comparando a parte de rede dos dois endereços, definida pela máscara', why: 'Isso. Cada endereço tem uma parte de rede e uma de host. É o que vamos aprender.' },
      { text: 'Pelo nome do computador', why: 'Nomes são resolvidos pelo DNS. Quem diz se está na mesma rede é a parte de rede do endereço.' },
      { text: 'Perguntando ao usuário', why: 'Não. O próprio endereço, com a máscara, responde isso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ipv4',
      part: 'IPv4',
      title: '32 bits: rede e host',
      goal: 'Saber o tamanho do IPv4 e a função da máscara.',
      explain:
        'Um endereço **IPv4** tem **32 bits**, escritos em **quatro octetos** decimais: `192.168.10.37`.\n\nEle se divide em duas partes:\n\n- **rede**: diz em qual rede o computador está;\n- **host**: identifica o computador dentro dessa rede.\n\nQuem separa as duas partes é a **máscara**.',
      example: '`192.168.10.37` com máscara `255.255.255.0`: rede `192.168.10`, host `37`. O `192.168.10.80` está na mesma rede; o `192.168.11.5`, não.',
      check: {
        kind: 'choice',
        id: 'v4-c',
        prompt: 'Quantos bits tem um endereço IPv4?',
        options: [
          { text: '32', why: 'Isso: quatro octetos de 8 bits.' },
          { text: '128', why: '128 bits é o IPv6.' },
          { text: '4', why: 'São 4 octetos, mas cada um tem 8 bits: 32 no total.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num endereço de correspondência: a **rua** é a parte de rede, o **número da casa** é o host. A **máscara** é a regra que diz onde termina a rua e começa o número.',
        check: {
          kind: 'choice',
          id: 'v4-r',
          prompt: 'Com máscara 255.255.255.0, os endereços 10.1.1.20 e 10.1.2.20 estão na mesma rede?',
          options: [
            { text: 'Não: a parte de rede é 10.1.1 em um e 10.1.2 no outro', why: 'Isso.' },
            { text: 'Sim: o host é 20 nos dois', why: 'O host igual não importa; a parte de rede é diferente.' },
            { text: 'Sim: começam com 10', why: 'Com essa máscara, os três primeiros octetos são a rede, e eles diferem.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'cidr',
      part: 'IPv4',
      title: 'Notação CIDR: o número depois da barra',
      goal: 'Converter /24 em máscara e ler um prefixo.',
      explain:
        'Na notação **CIDR**, o número depois da barra diz **quantos bits pertencem à rede**.\n\n`/24` = 24 bits de rede = máscara **`255.255.255.0`**. Sobram 32 − 24 = **8 bits de host**.\n\n| Prefixo | Máscara |\n|---|---|\n| /24 | 255.255.255.0 |\n| /25 | 255.255.255.128 |\n| /26 | 255.255.255.192 |\n| /27 | 255.255.255.224 |\n| /28 | 255.255.255.240 |\n| /30 | 255.255.255.252 |',
      check: {
        kind: 'choice',
        id: 'ci-c',
        prompt: 'Num /26, quantos bits ficam para os hosts?',
        options: [
          { text: '6', why: 'Isso: 32 − 26 = 6.' },
          { text: '26', why: '26 são os bits de rede. Para host sobram 32 − 26.' },
          { text: '8', why: '8 bits de host seria um /24.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Regra única: **bits de host = 32 − prefixo**.\n\n- /24 → 8 bits de host.\n- /27 → 5 bits de host.\n- /30 → 2 bits de host.\n\nQuanto **maior** o prefixo, **menor** a rede.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'Qual máscara corresponde a /27?',
          options: [
            { text: '255.255.255.224', why: 'Isso.' },
            { text: '255.255.255.192', why: 'Essa é a do /26.' },
            { text: '255.255.255.0', why: 'Essa é a do /24.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'hosts',
      part: 'IPv4',
      title: 'Quantos hosts cabem: 2^h − 2',
      goal: 'Calcular os hosts utilizáveis de uma sub-rede.',
      explain:
        'Com **h** bits de host há **2^h** endereços. Dois são reservados: o **endereço da rede** e o de **broadcast**. Então:\n\n**hosts utilizáveis = 2^h − 2**\n\n| Prefixo | Endereços | Hosts utilizáveis |\n|---|---|---|\n| /24 | 256 | 254 |\n| /25 | 128 | 126 |\n| /26 | 64 | 62 |\n| /27 | 32 | 30 |\n| /28 | 16 | 14 |\n| /30 | 4 | 2 |',
      check: {
        kind: 'choice',
        id: 'ho-c',
        prompt: 'Quantos hosts utilizáveis há num /27?',
        options: [
          { text: '30', why: 'Isso: 2^5 = 32, menos 2.' },
          { text: '32', why: '32 é o total de endereços. Tire a rede e o broadcast.' },
          { text: '62', why: '62 é o do /26.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Faça em três passos:\n\n1. Bits de host: 32 − prefixo.\n2. Endereços: 2 elevado a esse número.\n3. Hosts: tire 2.\n\nExemplo /28: 32 − 28 = 4; 2^4 = 16; 16 − 2 = **14**.',
        check: {
          kind: 'choice',
          id: 'ho-r',
          prompt: 'Um setor tem 50 computadores. Qual o menor bloco que comporta todos?',
          options: [
            { text: '/26, com 62 hosts', why: 'Isso. O /27 (30 hosts) não basta.' },
            { text: '/27, com 30 hosts', why: '30 é menos que 50.' },
            { text: '/24, com 254 hosts', why: 'Comporta, mas não é o menor.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'sub-rede',
      part: 'IPv4',
      title: 'A que sub-rede pertence um endereço',
      goal: 'Achar a rede, o broadcast e a faixa de hosts pelo tamanho do bloco.',
      explain:
        'Exemplo: **192.168.10.77/26**.\n\n1. Um /26 tem blocos de **64** endereços: 0, 64, 128, 192.\n2. 77 está no bloco que começa em **64**.\n3. **Rede**: `192.168.10.64`. **Broadcast**: o último do bloco, `192.168.10.127`. **Hosts**: de `.65` a `.126`.',
      check: {
        kind: 'choice',
        id: 'sr-c',
        prompt: 'Qual é o endereço de rede de 10.0.5.200/28?',
        options: [
          { text: '10.0.5.192', why: 'Isso. Blocos de 16: ..., 176, 192, 208. O 200 está no bloco de 192.' },
          { text: '10.0.5.200', why: '200 é o próprio host. A rede é o início do bloco de 16: 192.' },
          { text: '10.0.5.0', why: '10.0.5.0 seria a rede num /24.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O tamanho do bloco é o número de **endereços** do prefixo (/26 = 64, /27 = 32, /28 = 16). Conte de bloco em bloco até passar do número:\n\n- **Rede** = início do bloco.\n- **Broadcast** = início do próximo bloco − 1.\n- **Hosts** = tudo entre os dois.',
        check: {
          kind: 'choice',
          id: 'sr-r',
          prompt: 'Qual é o broadcast da sub-rede de 10.0.5.200/28?',
          options: [
            { text: '10.0.5.207', why: 'Isso. O bloco é 192 a 207.' },
            { text: '10.0.5.255', why: '255 seria o broadcast num /24.' },
            { text: '10.0.5.208', why: '208 já é o início do bloco seguinte.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'privados',
      part: 'Endereços especiais',
      title: 'Endereços privados (RFC 1918)',
      goal: 'Reconhecer as três faixas privadas.',
      explain:
        'Três faixas são **privadas** (RFC 1918): **não são roteadas na internet**. Servem às redes internas.\n\n| Faixa | Observação |\n|---|---|\n| `10.0.0.0/8` | Tudo que começa com 10 |\n| `172.16.0.0/12` | De **172.16** a **172.31** |\n| `192.168.0.0/16` | Tudo que começa com 192.168 |',
      check: {
        kind: 'choice',
        id: 'pv-c',
        prompt: 'Qual destes endereços é privado?',
        options: [
          { text: '172.20.1.1', why: 'Isso. Está entre 172.16 e 172.31.' },
          { text: '172.40.1.1', why: '172.40 passa de 172.31; está fora da faixa privada.' },
          { text: '8.8.8.8', why: 'É um endereço público.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Decore como **três portas de casa**: **10** (a grande), **172.16 a 172.31** (a do meio, que engana) e **192.168** (a mais comum em roteadores domésticos).',
        check: {
          kind: 'sort',
          id: 'pv-r',
          prompt: 'Privado ou público?',
          categories: ['Privado', 'Público'],
          items: [
            { text: '10.200.3.4', cat: 0, why: 'Faixa 10/8.' },
            { text: '192.168.50.2', cat: 0, why: 'Faixa 192.168/16.' },
            { text: '172.32.0.9', cat: 1, why: 'Passa de 172.31.' },
            { text: '200.10.20.30', cat: 1, why: 'Fora das faixas privadas.' },
          ],
        },
      },
    },
    {
      id: 'especiais',
      part: 'Endereços especiais',
      title: 'Loopback, link-local e broadcast limitado',
      goal: 'Identificar 127.0.0.1, 169.254.x.x e 255.255.255.255.',
      explain:
        '| Faixa | Uso |\n|---|---|\n| `127.0.0.0/8` (ex.: **127.0.0.1**) | **Loopback**: a própria máquina |\n| `169.254.0.0/16` | **Link-local**: atribuído quando o **DHCP falha** |\n| `255.255.255.255` | **Broadcast limitado** |',
      example: 'Um computador aparece com o endereço `169.254.33.10`. Sinal de que ele não conseguiu falar com o servidor DHCP.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Um notebook recebeu 169.254.12.7. O que isso indica?',
        options: [
          { text: 'Que o DHCP falhou e ele se deu um endereço link-local', why: 'Isso.' },
          { text: 'Que ele está na internet com endereço público', why: '169.254/16 é link-local, não público.' },
          { text: 'Que é o loopback da máquina', why: 'Loopback é 127.0.0.0/8.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**127** = "eu mesmo" (testar o próprio computador). **169.254** = "fiquei sem endereço e improvisei" (DHCP falhou). **255.255.255.255** = "falar com todos" da rede local.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'Para testar a pilha de rede da própria máquina, sem sair dela, usa-se:',
          options: [
            { text: '127.0.0.1', why: 'Isso. É o loopback.' },
            { text: '169.254.0.1', why: 'Esse é link-local.' },
            { text: '255.255.255.255', why: 'Esse é broadcast limitado.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'nat',
      part: 'Endereços especiais',
      title: 'NAT: muitos privados, um público',
      goal: 'Entender por que e como o NAT é usado.',
      explain:
        'Os endereços **públicos IPv4 se esgotaram**. Por isso as redes internas usam endereços **privados** e saem para a internet por **NAT** (tradução de endereços).\n\nO NAT **troca o endereço privado** do computador pelo **endereço público do roteador** na saída, e faz o caminho inverso na volta.',
      example: 'Os 600 computadores da sede usam `10.x.x.x`. Para a internet, todos aparecem com o mesmo endereço público do roteador do Tribunal.',
      check: {
        kind: 'choice',
        id: 'na-c',
        prompt: 'O que o NAT faz?',
        options: [
          { text: 'Troca o endereço privado pelo público do roteador', why: 'Isso.' },
          { text: 'Converte nomes em endereços IP', why: 'Isso é o DNS.' },
          { text: 'Distribui endereços automaticamente aos computadores', why: 'Isso é o DHCP.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense na **central telefônica** de um órgão: lá dentro cada sala tem um ramal (privado); para fora, todas as ligações saem pelo **número principal** (público). A central lembra quem ligou para devolver a resposta ao ramal certo.',
        check: {
          kind: 'choice',
          id: 'na-r',
          prompt: 'Por que o NAT se tornou tão usado no IPv4?',
          options: [
            { text: 'Porque os endereços públicos IPv4 se esgotaram', why: 'Isso.' },
            { text: 'Porque o IPv4 tem 128 bits', why: 'O IPv4 tem 32 bits; 128 é o IPv6.' },
            { text: 'Porque endereços privados são roteados na internet', why: 'É o contrário: privados não são roteados na internet.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ipv6',
      part: 'IPv6',
      title: 'IPv6: 128 bits em hexadecimal',
      goal: 'Reconhecer o formato de um endereço IPv6.',
      explain:
        'O **IPv6** tem **128 bits**, escritos em **oito grupos** de **quatro dígitos hexadecimais** separados por **dois-pontos**:\n\n```\n2001:0db8:0000:0000:0000:ff00:0042:8329\n```\n\nHexadecimal usa os dígitos de 0 a 9 e as letras de a até f.',
      check: {
        kind: 'choice',
        id: 'v6-c',
        prompt: 'Como é escrito um endereço IPv6 completo?',
        options: [
          { text: 'Oito grupos de quatro dígitos hexadecimais separados por dois-pontos', why: 'Isso.' },
          { text: 'Quatro números decimais separados por pontos', why: 'Esse é o IPv4.' },
          { text: 'Seis pares hexadecimais separados por hífen', why: 'Esse formato não é o do IPv6.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Compare lado a lado:\n\n- IPv4: `192.168.10.37`, **4** números **decimais**, separados por **ponto**, 32 bits.\n- IPv6: `2001:db8::ff00:42:8329`, até **8** grupos **hexadecimais**, separados por **dois-pontos**, 128 bits.',
        check: {
          kind: 'choice',
          id: 'v6-r',
          prompt: 'Quantos bits tem um endereço IPv6?',
          options: [
            { text: '128', why: 'Isso.' },
            { text: '32', why: '32 é o IPv4.' },
            { text: '64', why: 'O IPv6 tem 128 bits.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'abreviacao',
      part: 'IPv6',
      title: 'Abreviar sem errar: zeros e ::',
      goal: 'Aplicar as duas regras de abreviação do IPv6.',
      explain:
        'Duas regras:\n\n1. **Zeros à esquerda** de cada grupo podem ser omitidos: `0db8` vira `db8`, `0042` vira `42`.\n2. **Uma única** sequência de grupos só de zeros pode virar **`::`**.\n\n```\n2001:0db8:0000:0000:0000:ff00:0042:8329\n2001:db8::ff00:42:8329\n```\n\nUsar `::` **duas vezes** deixa o endereço **ambíguo**: não dá para saber quantos zeros cada um representa.',
      check: {
        kind: 'choice',
        id: 'ab-c',
        prompt: 'Qual destes endereços IPv6 é INVÁLIDO?',
        options: [
          { text: '2001:db8::1::5', why: 'Isso. Tem :: duas vezes, o que é ambíguo.' },
          { text: '2001:db8::5', why: 'Válido: um único ::.' },
          { text: 'fe80::202:b3ff:fe1e:8329', why: 'Válido: um único :: e zeros à esquerda omitidos.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Abrevie em ordem: primeiro tire os **zeros à esquerda** de cada grupo; depois troque **o maior trecho** de grupos zerados por `::`, **uma vez só**.\n\n`fe80:0000:0000:0000:0202:b3ff:fe1e:8329`\n→ `fe80:0:0:0:202:b3ff:fe1e:8329`\n→ `fe80::202:b3ff:fe1e:8329`',
        check: {
          kind: 'choice',
          id: 'ab-r',
          prompt: 'Qual é a forma abreviada de 2001:0db8:0000:0000:0000:ff00:0042:8329?',
          options: [
            { text: '2001:db8::ff00:42:8329', why: 'Isso.' },
            { text: '2001:db8::ff:42:8329', why: 'ff00 não pode virar ff: só se tiram zeros à esquerda, não à direita.' },
            { text: '2001:db8:ff00:42:8329', why: 'Faltou o :: indicando os grupos de zeros.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'v4-v6',
      part: 'IPv6',
      title: 'O que muda do IPv4 para o IPv6',
      goal: 'Comparar broadcast, autoconfiguração, loopback, link-local, NAT e cabeçalho.',
      explain:
        '| Aspecto | IPv4 | IPv6 |\n|---|---|---|\n| Tamanho | 32 bits | 128 bits |\n| Broadcast | Existe | **Não existe**; usa multicast |\n| Configuração automática | DHCP | **SLAAC** ou DHCPv6 |\n| Loopback | 127.0.0.1 | **`::1`** |\n| Link-local | 169.254.0.0/16 | **`fe80::/10`** |\n| NAT | Muito usado | Desnecessário em princípio |\n| Cabeçalho | Variável, com checksum | **Fixo de 40 bytes, sem checksum** |',
      check: {
        kind: 'choice',
        id: 'vv-c',
        prompt: 'Sobre o IPv6, é correto afirmar:',
        options: [
          { text: 'Não tem broadcast; usa multicast', why: 'Isso.' },
          { text: 'Usa broadcast como o IPv4', why: 'O IPv6 não tem broadcast.' },
          { text: 'Tem cabeçalho variável com checksum', why: 'É o contrário: fixo de 40 bytes e sem checksum.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pares para memorizar: loopback **127.0.0.1 → ::1**; link-local **169.254 → fe80**; configuração **DHCP → SLAAC**; broadcast **existe → não existe**. E como sobram endereços, o NAT deixa de ser necessário, em princípio.',
        check: {
          kind: 'sort',
          id: 'vv-r',
          prompt: 'IPv4 ou IPv6?',
          categories: ['IPv4', 'IPv6'],
          items: [
            { text: 'Loopback ::1', cat: 1, why: 'É o loopback do IPv6.' },
            { text: 'Link-local 169.254.0.0/16', cat: 0, why: 'É do IPv4.' },
            { text: 'Autoconfiguração SLAAC', cat: 1, why: 'É do IPv6.' },
            { text: 'Broadcast 255.255.255.255', cat: 0, why: 'O IPv6 não tem broadcast.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Descobrir a faixa de hosts de 192.168.4.150/27. Ponha os passos na ordem.',
      items: ['Bits de host: 32 − 27 = 5', 'Tamanho do bloco: 2^5 = 32', 'Blocos: 128, 160... o 150 está no de 128', 'Rede .128, broadcast .159, hosts de .129 a .158'],
      why: 'Bits de host, tamanho do bloco, bloco do endereço e, por fim, rede, broadcast e hosts.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'Um /24 tem 254 hosts utilizáveis', correct: true, why: '256 − 2.' },
        { text: '172.16.0.0/12 vai de 172.16 a 172.31', correct: true, why: 'É a faixa privada do meio.' },
        { text: 'No IPv6 pode-se usar :: duas vezes no mesmo endereço', correct: false, why: 'Só uma vez; duas deixaria ambíguo.' },
        { text: 'O loopback do IPv6 é fe80::1', correct: false, why: 'O loopback é ::1; fe80::/10 é link-local.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou a sub-rede do setor de TI. Toque na linha errada.',
      lines: ['Endereço: 10.20.30.77/26', 'Rede: 10.20.30.64', 'Broadcast: 10.20.30.255'],
      bug: 2,
      why: 'Num /26 os blocos têm 64 endereços. O bloco de 64 termina em 127, que é o broadcast.',
      fixed: 'Broadcast: 10.20.30.127',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O setor jurídico tem 100 computadores. Qual plano usa o menor bloco que comporta todos?',
      scenarios: [
        { title: 'Plano A', body: 'Sub-rede **/25**, com 126 hosts utilizáveis.' },
        { title: 'Plano B', body: 'Sub-rede **/26**, com 62 hosts utilizáveis.' },
      ],
      answer: 0,
      why: '62 não comporta 100. O /25, com 126, é o menor que basta.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: um servidor responde no endereço 192.168.1.10 dentro da rede, mas de fora ninguém o alcança por esse endereço. Por quê?',
      options: [
        { text: '192.168.x.x é privado e não é roteado na internet', why: 'Isso. Para ser alcançado de fora, ele precisa de um endereço público (por exemplo, via NAT).' },
        { text: 'Porque 192.168.1.10 é o loopback', why: 'Loopback é 127.0.0.0/8.' },
        { text: 'Porque endereços IPv4 só funcionam dentro do prédio', why: 'Endereços públicos IPv4 funcionam na internet. O problema é que este é privado.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.01.006' },
  ],
  summary: [
    'IPv4: 32 bits em quatro octetos; a máscara separa rede e host.',
    'CIDR: /n são os bits de rede; bits de host = 32 − n.',
    'Hosts utilizáveis = 2^h − 2 (/24: 254, /26: 62, /27: 30, /30: 2).',
    'Sub-rede pelo tamanho do bloco: rede no início, broadcast no fim, hosts entre os dois.',
    'Privados: 10/8, 172.16 a 172.31, 192.168/16. Loopback 127.0.0.1; link-local 169.254 quando o DHCP falha.',
    'NAT troca o privado pelo público do roteador.',
    'IPv6: 128 bits, hexadecimal; um único ::. Sem broadcast; ::1, fe80::/10, SLAAC, cabeçalho fixo de 40 bytes.',
  ],
};
