// Série "Redes e internet" (cap.prim.02, trecho redes), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como a internet surgiu, da ARPANET à nuvem; as seguintes apresentam
// endereço, roteador e pacote, depois cliente, servidor, DNS e nuvem, uma ideia por etapa. Fatos
// conferidos com o texto do capítulo (01-redes-internet.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.02', sectionId: 'redes' } as const;

export const primRedeHistoria: MicroLesson = {
  ...S,
  id: 'prim.redes.1',
  series: { id: 'prim.redes', order: 1 },
  title: 'Da ARPANET à internet',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você manda uma mensagem do celular e ela chega do outro lado do mundo em um segundo. A internet sempre existiu desse jeito?',
    options: [
      { text: 'Não: começou pequena, ligando poucos computadores', why: 'Isso. Esta aula conta como uma rede de pesquisa virou a internet de hoje.' },
      { text: 'Sim, desde os primeiros computadores', why: 'Os primeiros computadores trabalhavam sozinhos. A rede veio depois, e esta aula conta como.' },
      { text: 'Ela foi inventada junto com o celular', why: 'A internet é bem mais velha que o celular. Esta aula mostra quando começou.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'rede',
      part: 'A história',
      title: 'O que é uma rede',
      art: 'rede',
      goal: 'Saber o que é uma rede e o que é a internet.',
      explain:
        'Uma **rede** é um grupo de computadores **ligados entre si** para **trocar informação**.\n\nPode ser **pequena**, como os computadores de uma sala, ou **gigante**, como a **internet**.\n\nA internet é **a rede que liga redes** do mundo inteiro: a rede da sua casa, a do Tribunal, a de uma universidade no Japão, todas ligadas.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'A internet é:',
        options: [
          { text: 'A rede que liga redes do mundo inteiro', why: 'Isso.' },
          { text: 'Um programa instalado no computador', why: 'O navegador é um programa; a internet é a ligação entre as redes.' },
          { text: 'Uma peça dentro do celular', why: 'A internet não é uma peça: é uma rede gigante.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nas **ruas**: a rua da sua casa é uma rede pequena; as ruas se ligam a avenidas, as avenidas a estradas, e as estradas ligam cidades do país inteiro. A internet é esse **mapa de estradas** ligando as redes pequenas umas às outras.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Os computadores de uma sala, ligados para trocar arquivos, formam:',
          options: [
            { text: 'Uma rede', why: 'Isso: uma rede pequena.' },
            { text: 'Um sistema operacional', why: 'O sistema operacional gerencia uma máquina; a ligação entre elas é a rede.' },
            { text: 'Um arquivo', why: 'Arquivo é um conjunto de dados com nome.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'arpanet',
      part: 'A história',
      title: '1969: chegou só "LO"',
      art: 'computador',
      goal: 'Conhecer a ARPANET e a primeira mensagem.',
      explain:
        'Em **1969**, nos Estados Unidos, uma rede de pesquisa chamada **ARPANET** ligou computadores de **universidades**.\n\nA primeira mensagem saiu da **UCLA**, em Los Angeles, para o **Instituto de Pesquisa de Stanford**.\n\nEra para ser **"LOGIN"**, mas o sistema **travou** depois das duas primeiras letras: chegou só **"LO"**.\n\nFoi um começo pequeno, e com defeito, da rede que hoje liga o mundo.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'O que foi a ARPANET, de 1969?',
        options: [
          { text: 'Uma rede de pesquisa que ligou computadores de universidades', why: 'Isso: a semente da internet.' },
          { text: 'O primeiro celular', why: 'Celulares com internet vieram décadas depois.' },
          { text: 'Um sistema operacional', why: 'A ARPANET era uma rede, não um sistema operacional.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine a primeira linha de telefone entre **duas casas** da cidade: ainda não liga o mundo, mas mostra que a ideia funciona. A ARPANET foi isso para a internet: poucas universidades ligadas, e a primeira mensagem, "LO", chegou pela metade.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Por que a primeira mensagem da ARPANET chegou só como "LO"?',
          options: [
            { text: 'O sistema travou depois das duas primeiras letras de "LOGIN"', why: 'Isso.' },
            { text: 'Era para ser só "LO" mesmo', why: 'Era para ser "LOGIN"; o sistema travou no meio.' },
            { text: 'Faltou luz na universidade', why: 'O texto conta que o sistema travou.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tcpip',
      part: 'A história',
      title: 'Regras comuns: TCP/IP',
      art: 'livro',
      goal: 'Saber que o TCP/IP são as regras que permitem redes diferentes conversarem.',
      explain:
        'Cada rede tinha seu jeito de funcionar. Para redes **diferentes conversarem**, era preciso combinar **regras comuns**.\n\nEm **1974**, **Vint Cerf** e **Bob Kahn** publicaram o desenho do **TCP**.\n\nEm **1983**, a ARPANET passou a usar o **TCP/IP**, as regras que a internet **usa até hoje**.\n\nUm conjunto de regras assim se chama **protocolo**.',
      check: {
        kind: 'choice',
        id: 'tc-c',
        prompt: 'Um conjunto de regras combinadas para a conversa na rede funcionar se chama:',
        options: [
          { text: 'Protocolo', why: 'Isso. O TCP/IP é o protocolo da internet.' },
          { text: 'Pasta', why: 'Pasta agrupa arquivos.' },
          { text: 'Variável', why: 'Variável guarda um valor num programa.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **protocolo** de uma audiência: quem fala primeiro, como se pede a palavra, como se encerra. Sem essas regras, vira confusão. Na rede é igual: o **TCP/IP** diz como os computadores conversam, e por isso máquinas de fabricantes diferentes se entendem.',
        check: {
          kind: 'order',
          id: 'tc-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['ARPANET liga universidades (1969)', 'Cerf e Kahn publicam o desenho do TCP (1974)', 'A ARPANET passa a usar o TCP/IP (1983)'],
          why: '1969, 1974 e 1983: primeiro a rede, depois as regras comuns.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'web',
      part: 'A história',
      title: 'Nomes e páginas: DNS e Web',
      art: 'trilha',
      goal: 'Saber quando surgiram o DNS e a World Wide Web.',
      explain:
        'Em **1983**, **Paul Mockapetris** criou o **DNS**, que troca **nomes fáceis** por endereços numéricos.\n\nEm **1989**, no **CERN**, na Suíça, **Tim Berners-Lee** propôs a **World Wide Web**: páginas ligadas umas às outras por **links**, abertas num **navegador**.\n\nO **primeiro site** entrou no ar em **1991**. Foi a Web que deixou a internet fácil para qualquer pessoa.',
      check: {
        kind: 'choice',
        id: 'we-c',
        prompt: 'Quem propôs a World Wide Web, em 1989?',
        options: [
          { text: 'Tim Berners-Lee, no CERN', why: 'Isso.' },
          { text: 'Linus Torvalds', why: 'Linus Torvalds começou o Linux, em 1991.' },
          { text: 'Paul Mockapetris', why: 'Mockapetris criou o DNS, em 1983.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A internet é a **estrada**; a **Web** é um dos serviços que andam por ela: as **páginas com links**, que você abre no navegador. Antes da Web, usar a internet exigia conhecer comandos. Depois dela, bastava **clicar num link**.',
        check: {
          kind: 'choice',
          id: 'we-r',
          prompt: 'A World Wide Web é:',
          options: [
            { text: 'Páginas ligadas por links, abertas num navegador', why: 'Isso.' },
            { text: 'O cabo que liga os países', why: 'Cabos são parte física da rede; a Web são as páginas.' },
            { text: 'O mesmo que o DNS', why: 'O DNS traduz nomes em endereços; a Web são as páginas.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'brasil-nuvem',
      part: 'A história',
      title: 'A internet chega a todos',
      art: 'nuvem',
      goal: 'Saber que a internet comercial chegou ao Brasil em 1995 e que a nuvem ganhou força em 2006.',
      explain:
        'Por anos, a internet foi usada **sobretudo por universidades** e centros de pesquisa.\n\nEm **1995**, no Brasil, ela passou a ser **oferecida ao público por empresas**: a internet comercial.\n\nEm **2006**, a **Amazon** lançou serviços para guardar arquivos e rodar sistemas em computadores dela, **pagando pelo uso**. Foi um dos marcos da **computação em nuvem**.',
      check: {
        kind: 'order',
        id: 'bn-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Proposta da World Wide Web (1989)', 'Internet comercial no Brasil (1995)', 'Serviços de nuvem da Amazon (2006)'],
        why: '1989, 1995 e 2006: das páginas com links à internet para todos e à nuvem.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na **energia elétrica**: no começo, cada fábrica tinha o seu gerador; depois, passou-se a comprar energia da rede e pagar pelo que usa. A **nuvem** fez isso com computadores: em vez de manter máquinas próprias, usa-se as de outra empresa, pela internet, pagando pelo uso.',
        check: {
          kind: 'choice',
          id: 'bn-r',
          prompt: 'Antes de 1995, no Brasil, a internet era usada:',
          options: [
            { text: 'Sobretudo por universidades e centros de pesquisa', why: 'Isso.' },
            { text: 'Por todas as casas', why: 'O acesso do público veio com a internet comercial, em 1995.' },
            { text: 'Só pelos celulares', why: 'Celulares com internet vieram bem depois.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história inteira.',
      items: ['ARPANET e a mensagem "LO" (1969)', 'ARPANET adota o TCP/IP e nasce o DNS (1983)', 'Primeiro site da Web (1991)', 'Internet comercial no Brasil (1995)'],
      why: 'Da rede de pesquisa às regras comuns, às páginas e ao público.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['TCP/IP: as regras da internet', 'DNS: troca nomes por endereços numéricos', 'Web: o cabo que liga os continentes'],
      bug: 2,
      why: 'A Web são as páginas ligadas por links, abertas no navegador.',
      fixed: 'Web: páginas ligadas por links',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o Tribunal passa a guardar arquivos em computadores de uma empresa, pela internet, pagando pelo espaço usado. Isso é:',
      options: [
        { text: 'Computação em nuvem', why: 'Isso: computadores de outra empresa, pela internet, pagando pelo uso.' },
        { text: 'A ARPANET', why: 'A ARPANET foi a rede de pesquisa de 1969.' },
        { text: 'Um protocolo', why: 'Protocolo é um conjunto de regras de conversa, não um serviço de guarda.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Rede: computadores ligados para trocar informação. A internet é a rede que liga redes do mundo inteiro.',
    'Em 1969, a ARPANET ligou universidades; a primeira mensagem chegou só como "LO".',
    'Cerf e Kahn desenharam o TCP (1974); a ARPANET adotou o TCP/IP em 1983. Protocolo é um conjunto de regras.',
    'Mockapetris criou o DNS (1983); Tim Berners-Lee propôs a Web (1989), e o primeiro site veio em 1991.',
    'Internet comercial no Brasil em 1995; nuvem da Amazon em 2006.',
  ],
  vocab: [{ term: 'protocolo', match: 'protocolo', step: 'tcpip' }],
};

export const primRedeEndereco: MicroLesson = {
  ...S,
  id: 'prim.redes.2',
  series: { id: 'prim.redes', order: 2 },
  title: 'Endereço, roteador e pacote',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Para uma carta chegar à casa certa, o que ela precisa ter?',
    options: [
      { text: 'Um endereço', why: 'Isso. Na rede é igual, e esta aula mostra o endereço dos aparelhos.' },
      { text: 'Um selo bonito', why: 'O selo paga o envio, mas sem endereço a carta não sabe para onde ir.' },
      { text: 'Uma foto de quem mandou', why: 'O que guia a carta é o endereço.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ip',
      part: 'Endereço',
      title: 'O endereço IP',
      art: 'dados',
      goal: 'Saber o que é endereço IP e reconhecer um IPv4.',
      explain:
        'Cada aparelho conectado à rede recebe um **endereço IP**. IP quer dizer **Protocolo de Internet**.\n\nNo formato mais comum, o **IPv4**, o endereço tem **quatro números separados por pontos**:\n\n`192.168.0.10`\n\nÉ por esse endereço que os dados **sabem para onde ir**, como a carta sabe a casa pelo endereço.',
      check: {
        kind: 'choice',
        id: 'ip-c',
        prompt: 'Qual destes é um endereço IPv4?',
        options: [
          { text: '192.168.0.10', why: 'Isso: quatro números separados por pontos.' },
          { text: 'www.exemplo.gov.br', why: 'Esse é um nome de site; o DNS o traduz para um IP.' },
          { text: 'contrato-01.pdf', why: 'Esse é o nome de um arquivo.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'O IP é o **endereço da casa** de cada aparelho na rede. No IPv4, ele parece um número de telefone dividido em **quatro partes por pontos**, como 192.168.0.10. Sem esse número, os dados não saberiam a que aparelho entregar a resposta.',
        check: {
          kind: 'choice',
          id: 'ip-r',
          prompt: 'Para que serve o endereço IP?',
          options: [
            { text: 'Para identificar cada aparelho na rede', why: 'Isso.' },
            { text: 'Para guardar senhas', why: 'O IP identifica o aparelho; não guarda senhas.' },
            { text: 'Para dar nome a arquivos', why: 'Arquivos têm nome e extensão; o IP é do aparelho na rede.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ipv6',
      part: 'Endereço',
      title: 'IPv6: porque os endereços acabaram',
      art: 'degraus',
      goal: 'Saber por que o IPv6 foi criado.',
      explain:
        'Lembra que a internet começou ligando **poucas universidades**? Hoje há celulares, computadores, televisores, tudo conectado.\n\nOs endereços **IPv4** estavam **acabando**.\n\nPor isso criou-se o **IPv6**, um formato **mais novo e mais longo**, com muito mais endereços possíveis.',
      check: {
        kind: 'choice',
        id: 'v6-c',
        prompt: 'Por que o IPv6 foi criado?',
        options: [
          { text: 'Porque os endereços IPv4 estavam acabando', why: 'Isso.' },
          { text: 'Para substituir o DNS', why: 'O DNS continua traduzindo nomes; o IPv6 é um formato de endereço.' },
          { text: 'Para deixar os endereços mais curtos', why: 'É o contrário: o IPv6 é mais longo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense nas **placas de carro**: quando os carros ficaram numerosos demais, foi preciso um formato com mais letras e números. Com os aparelhos na rede aconteceu igual: o **IPv4** ficou pequeno, e o **IPv6**, mais longo, abriu espaço para muito mais endereços.',
        check: {
          kind: 'choice',
          id: 'v6-r',
          prompt: 'Comparado ao IPv4, o IPv6 é:',
          options: [
            { text: 'Mais novo e mais longo', why: 'Isso.' },
            { text: 'Mais antigo e mais curto', why: 'O IPv6 veio depois e é mais longo.' },
            { text: 'Um tipo de cabo', why: 'É um formato de endereço, não um cabo.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'pacote',
      part: 'O caminho',
      title: 'A mensagem vai em pacotes',
      art: 'cartao',
      goal: 'Saber que a mensagem é dividida em pacotes.',
      explain:
        'Na rede, uma mensagem não viaja inteira. Ela é dividida em **pacotes**: **pedacinhos da mensagem**.\n\nCada pacote leva o **endereço IP** do destino, como um envelope.\n\nNo destino, os pedaços são **juntados** de novo e a mensagem aparece completa.',
      example: 'É como mandar um livro pelo correio em vários envelopes numerados, cada um com o endereço de quem vai receber.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Um pacote de dados é:',
        options: [
          { text: 'Um pedacinho da mensagem', why: 'Isso.' },
          { text: 'Um programa de computador', why: 'Programa é software; pacote é um pedaço da mensagem viajando.' },
          { text: 'O nome de um site', why: 'Nome de site é traduzido pelo DNS; pacote é pedaço de mensagem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **mudança de casa**: os móveis não vão num caminhão só, vão em **várias caixas**, cada uma com o endereço novo. Lá, você desembala e monta tudo. Na rede, as caixas são os **pacotes**, e o endereço escrito nelas é o **IP**.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'O que cada pacote leva para chegar ao destino certo?',
          options: [
            { text: 'O endereço IP do destino', why: 'Isso, como o envelope leva o endereço.' },
            { text: 'A senha de quem enviou', why: 'O que guia o pacote é o endereço.' },
            { text: 'Nada: ele chega por sorte', why: 'Ele leva o endereço do destino.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'roteador',
      part: 'O caminho',
      title: 'O roteador, carteiro da esquina',
      art: 'rede',
      goal: 'Saber o que faz o roteador.',
      explain:
        'O **roteador** é o aparelho que **liga uma rede a outra** e **escolhe por onde cada pacote deve seguir**.\n\nO roteador da sua casa liga os seus aparelhos à internet.\n\nNa internet, **muitos roteadores** passam a mensagem **de mão em mão** até o destino, como **agências de correio**.',
      check: {
        kind: 'order',
        id: 'ro-c',
        prompt: 'Ordene a viagem de uma mensagem do seu celular.',
        items: ['O celular divide a mensagem em pacotes', 'O roteador de casa envia os pacotes para a internet', 'Outros roteadores passam os pacotes adiante', 'No destino, os pacotes são juntados'],
        why: 'Dividir, enviar, passar de mão em mão, juntar.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'A carta sai da sua caixa e vai para a **agência do bairro**, que manda para a agência da cidade de destino, que entrega na casa. Cada agência olha o **endereço** e decide o próximo passo. Os **roteadores** fazem isso com os pacotes, olhando o **IP**.',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: 'Que aparelho liga uma rede a outra e escolhe o caminho dos pacotes?',
          options: [
            { text: 'O roteador', why: 'Isso.' },
            { text: 'O monitor', why: 'O monitor mostra imagens.' },
            { text: 'O teclado', why: 'O teclado é dispositivo de entrada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['IP: identifica cada aparelho na rede', 'Pacote: um pedacinho da mensagem', 'IPv6: mais curto que o IPv4'],
      bug: 2,
      why: 'O IPv6 é mais novo e mais longo.',
      fixed: 'IPv6: mais novo e mais longo que o IPv4',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Na comparação com o correio, o que é cada coisa?',
      categories: ['Endereço IP', 'Pacote', 'Roteador'],
      items: [
        { text: 'O endereço escrito no envelope', cat: 0, why: 'Identifica o destino.' },
        { text: 'Cada envelope com um pedaço do livro', cat: 1, why: 'Um pedacinho da mensagem.' },
        { text: 'A agência que manda o envelope adiante', cat: 2, why: 'Escolhe o próximo passo.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: a internet da sua casa caiu, mas o celular ainda conversa com o computador da sala pelo Wi-Fi. Qual ligação parou?',
      options: [
        { text: 'A do roteador de casa com a internet', why: 'Isso: a rede de casa funciona; a ligação com as outras redes caiu.' },
        { text: 'A do teclado com o computador', why: 'O teclado não tem relação com a internet.' },
        { text: 'Todas: sem internet não existe rede', why: 'A rede da casa continua; parou a ligação com a internet.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.001' }],
  summary: [
    'Endereço IP (Protocolo de Internet): identifica cada aparelho. No IPv4, quatro números com pontos, como 192.168.0.10.',
    'O IPv6, mais novo e mais longo, foi criado porque os endereços IPv4 estavam acabando.',
    'A mensagem viaja em pacotes, pedacinhos que levam o endereço do destino.',
    'O roteador liga redes e escolhe o caminho; na internet, muitos roteadores passam os pacotes de mão em mão.',
  ],
};

export const primRedeServidor: MicroLesson = {
  ...S,
  id: 'prim.redes.3',
  series: { id: 'prim.redes', order: 3 },
  title: 'Cliente, servidor, DNS e nuvem',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No restaurante, você faz o pedido e a cozinha prepara e entrega. Quem pede e quem atende têm papéis diferentes?',
    options: [
      { text: 'Sim: um pede, o outro atende', why: 'Isso. Na rede é igual, e esta aula mostra os nomes desses papéis.' },
      { text: 'Não: os dois fazem a mesma coisa', why: 'Você não vai à cozinha, e a cozinha não faz pedido: os papéis são diferentes.' },
      { text: 'Quem pede também cozinha', why: 'No restaurante, quem pede é atendido pela cozinha.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cliente-servidor',
      part: 'Quem pede e quem atende',
      title: 'Cliente e servidor',
      art: 'suporte',
      goal: 'Distinguir cliente de servidor.',
      explain:
        'Na rede, quase toda conversa tem **dois lados**:\n\n- **Cliente**: quem **pede**. Seu celular pedindo uma página é o cliente.\n- **Servidor**: quem **atende**. É um computador que fica **ligado esperando pedidos** e entrega a resposta.\n\nNo restaurante: você é o **cliente**; a cozinha é o **servidor**.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: 'Seu celular pede uma página e outro computador, sempre ligado, a entrega. Quem é o cliente?',
        options: [
          { text: 'O celular', why: 'Isso: quem pede é o cliente.' },
          { text: 'O computador que entrega a página', why: 'Esse é o servidor: quem atende.' },
          { text: 'O roteador', why: 'O roteador só encaminha os pacotes.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre pela palavra: **servidor** é quem **serve**, como o garçom e a cozinha. **Cliente** é quem chega e **pede**. O servidor fica ligado o tempo todo, esperando os pedidos chegarem.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: 'O computador que fica ligado esperando pedidos e entrega as respostas é o:',
          options: [
            { text: 'Servidor', why: 'Isso.' },
            { text: 'Cliente', why: 'O cliente é quem pede.' },
            { text: 'Navegador', why: 'O navegador é um programa do lado de quem pede.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'navegador',
      part: 'Quem pede e quem atende',
      title: 'Navegador e site',
      art: 'celular',
      goal: 'Saber que o navegador é cliente e o site fica no servidor.',
      explain:
        'O **navegador** é o programa que você usa para **abrir páginas**: Chrome, Firefox, Edge, Safari. Ele é um **cliente**.\n\nUm **site** é um **conjunto de páginas** guardado em um **servidor**.\n\nLembra da Web de Tim Berners-Lee? É exatamente isso: páginas no servidor, abertas pelo navegador.',
      check: {
        kind: 'sort',
        id: 'na-c',
        prompt: 'Cliente ou servidor?',
        categories: ['Cliente', 'Servidor'],
        items: [
          { text: 'Navegador Chrome', cat: 0, why: 'Pede as páginas.' },
          { text: 'Computador que guarda o site do Tribunal', cat: 1, why: 'Atende os pedidos.' },
          { text: 'Navegador Firefox', cat: 0, why: 'Pede as páginas.' },
        ],
      },
      recovery: {
        explain: 'O **site** é como o **cardápio e a comida**, que ficam na cozinha (servidor). O **navegador** é você na mesa, fazendo o pedido e recebendo o prato. O site não fica no navegador: o navegador só o **pede** e **mostra**.',
        check: {
          kind: 'choice',
          id: 'na-r',
          prompt: '"O navegador é o servidor que guarda os sites." Isso está:',
          options: [
            { text: 'Errado: o navegador é o cliente; o site fica no servidor', why: 'Isso.' },
            { text: 'Certo', why: 'O navegador pede as páginas; quem guarda é o servidor.' },
            { text: 'Certo só no celular', why: 'Em qualquer aparelho, o navegador é cliente.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'dns',
      part: 'Nomes e proteção',
      title: 'DNS: a agenda da internet',
      art: 'livro',
      goal: 'Saber que o DNS traduz nomes em endereços IP.',
      explain:
        'Você chega a um site por um **nome fácil**, como `www.exemplo.gov.br`, em vez de decorar o IP.\n\nO **DNS**, criado em 1983, faz a **tradução** do **nome** para o **endereço IP**.\n\nFunciona como uma **agenda telefônica**: você procura pelo nome e ela devolve o número.',
      check: {
        kind: 'order',
        id: 'dn-c',
        prompt: 'Ordene o que acontece ao digitar o nome de um site.',
        items: ['Você digita www.exemplo.gov.br', 'O DNS troca o nome pelo endereço IP', 'O navegador pede a página a esse IP', 'O servidor entrega a página'],
        why: 'Nome, tradução pelo DNS, pedido ao IP, resposta do servidor.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Ninguém decora o telefone de todos os amigos: a **agenda** guarda e você procura pelo **nome**. O **DNS** é essa agenda para a internet: você escreve o **nome do site**, e ele encontra o **número** (o IP) para o pedido chegar ao servidor certo.',
        check: {
          kind: 'choice',
          id: 'dn-r',
          prompt: 'O serviço que traduz o nome de um site para o endereço IP é o:',
          options: [
            { text: 'DNS', why: 'Isso.' },
            { text: 'Roteador', why: 'O roteador encaminha pacotes; quem traduz nomes é o DNS.' },
            { text: 'Navegador', why: 'O navegador pede a página; a tradução é feita pelo DNS.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'https',
      part: 'Nomes e proteção',
      title: 'O "s" do https',
      art: 'cadeado',
      goal: 'Saber que o https protege a conversa com criptografia.',
      explain:
        'Quando o endereço começa com **https**, a conversa entre o **navegador** e o **site** vai **protegida por criptografia**.\n\n**Criptografia** quer dizer: a mensagem vira um **código** que **só as duas pontas** conseguem ler.\n\nSe alguém no meio do caminho pegar os pacotes, vê só o código embaralhado.',
      check: {
        kind: 'choice',
        id: 'ht-c',
        prompt: 'O que o https garante na conversa com o site?',
        options: [
          { text: 'Que ela vai em código que só as duas pontas leem', why: 'Isso: criptografia.' },
          { text: 'Que o site é sempre mais rápido', why: 'O https protege a conversa; não trata de velocidade.' },
          { text: 'Que não precisa de endereço IP', why: 'O IP continua necessário; o https protege o conteúdo.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em mandar um bilhete **num envelope lacrado** em vez de num cartão-postal. O cartão, qualquer carteiro lê; o envelope lacrado, só quem recebe abre. O **https** é o envelope lacrado da conversa com o site.',
        check: {
          kind: 'choice',
          id: 'ht-r',
          prompt: 'Criptografia é:',
          options: [
            { text: 'Transformar a mensagem num código que só as pontas leem', why: 'Isso.' },
            { text: 'Apagar a mensagem depois de ler', why: 'Criptografia é codificar, não apagar.' },
            { text: 'Mandar a mensagem mais rápido', why: 'Criptografia protege; não acelera.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'nuvem',
      part: 'Nomes e proteção',
      title: 'A nuvem em uma frase',
      art: 'nuvem',
      goal: 'Saber o que é computação em nuvem.',
      explain:
        '**Computação em nuvem** é usar **computadores de outra empresa**, **pela internet**, para guardar arquivos ou rodar sistemas, **pagando pelo uso**, em vez de manter tudo em máquinas próprias.\n\nA "nuvem" não é mágica: são **servidores de verdade**, em algum prédio, que você usa a distância.',
      check: {
        kind: 'choice',
        id: 'nu-c',
        prompt: 'Onde ficam, de fato, os arquivos guardados "na nuvem"?',
        options: [
          { text: 'Em servidores de outra empresa, acessados pela internet', why: 'Isso.' },
          { text: 'No céu, sem nenhum computador', why: 'A nuvem é feita de servidores de verdade.' },
          { text: 'Só na memória RAM do seu celular', why: 'Ficam em servidores de outra empresa.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à energia elétrica: você não tem uma usina em casa, mas usa a energia **dela** e paga a conta pelo consumo. Na **nuvem**, os computadores são de outra empresa, e você usa **pela internet**, pagando pelo que usa.',
        check: {
          kind: 'choice',
          id: 'nu-r',
          prompt: 'Qual destas frases descreve a computação em nuvem?',
          options: [
            { text: 'Usar computadores de outra empresa pela internet, pagando pelo uso', why: 'Isso.' },
            { text: 'Comprar um computador mais rápido para o escritório', why: 'Isso é ter máquina própria.' },
            { text: 'Trocar o roteador de casa', why: 'O roteador liga redes; não é nuvem.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Cliente: quem pede', 'DNS: traduz nomes em endereços IP', 'https: a conversa vai sem nenhuma proteção'],
      bug: 2,
      why: 'No https a conversa vai protegida por criptografia.',
      fixed: 'https: a conversa vai protegida por criptografia',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Que palavra descreve cada coisa?',
      categories: ['DNS', 'Servidor', 'Nuvem'],
      items: [
        { text: 'A agenda que troca nomes por números', cat: 0, why: 'Tradução de nome para IP.' },
        { text: 'O computador sempre ligado que entrega o site', cat: 1, why: 'Quem atende.' },
        { text: 'Computadores de outra empresa usados pela internet', cat: 2, why: 'Paga-se pelo uso.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Você vai digitar a senha do sistema do Tribunal. Em qual endereço é mais seguro?',
      scenarios: [
        { title: 'Endereço A', body: 'http://sistema.exemplo.gov.br' },
        { title: 'Endereço B', body: 'https://sistema.exemplo.gov.br' },
      ],
      answer: 1,
      why: 'Com https, a senha viaja em código que só o navegador e o site leem.',
      errorKind: 'leitura',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.002' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.003' },
  ],
  summary: [
    'Cliente pede; servidor atende e fica ligado esperando pedidos (restaurante: você e a cozinha).',
    'O navegador (Chrome, Firefox, Edge, Safari) é cliente; o site fica no servidor.',
    'O DNS traduz o nome do site para o IP, como uma agenda telefônica.',
    'https: a conversa vai protegida por criptografia, um código que só as duas pontas leem.',
    'Nuvem: computadores de outra empresa, pela internet, pagando pelo uso.',
  ],
};
