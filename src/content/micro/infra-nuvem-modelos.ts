// Microaula "Modelos de nuvem" (cap.infra.02, seção modelos), no formato aprovado em 24/10/2026. Uma
// ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos conferidos com o texto do
// capítulo (01-modelos.md), que segue a definição do NIST SP 800-145. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraNuvemModelos: MicroLesson = {
  id: 'micro.infra.nuvem-modelos',
  chapterId: 'cap.infra.02',
  sectionId: 'modelos',
  title: 'Modelos de nuvem',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O Tribunal precisa de mais 10 servidores só durante o mês de prestação de contas. Comprar máquinas para usar um mês por ano faz sentido?',
    options: [
      { text: 'Melhor alugar sob demanda e devolver depois, pagando pelo uso', why: 'Isso. É a ideia central da computação em nuvem, que vamos ver agora.' },
      { text: 'Sim: o certo é sempre comprar para o pico', why: 'Comprar para o pico deixa máquinas paradas 11 meses. A nuvem permite crescer e diminuir.' },
      { text: 'Não há como: servidor só existe se for comprado', why: 'Há: provedores de nuvem alugam recursos sob demanda.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'nist',
      part: 'Definição',
      title: 'A definição do NIST',
      goal: 'Conhecer a definição de nuvem mais citada.',
      explain:
        'A definição mais citada é a do **NIST**, na publicação **SP 800-145** (2011):\n\num modelo que permite **acesso conveniente e sob demanda**, **pela rede**, a um **conjunto compartilhado de recursos configuráveis**, que podem ser **rapidamente provisionados e liberados** com **mínimo esforço de gestão**.',
      check: {
        kind: 'choice',
        id: 'ni-c',
        prompt: 'Qual publicação traz a definição de computação em nuvem mais citada em provas?',
        options: [
          { text: 'NIST SP 800-145', why: 'Isso.' },
          { text: 'RFC 1918', why: 'A RFC 1918 define as faixas de endereços IPv4 privados.' },
          { text: 'IEEE 802.11', why: '802.11 é a família do Wi-Fi.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Guarde as palavras-chave da definição: **sob demanda**, **pela rede**, **recursos compartilhados**, **rápido de pegar e de devolver**, **pouco esforço de gestão**. Quem disse isso foi o NIST, órgão de padrões dos Estados Unidos, no documento SP 800-145.',
        check: {
          kind: 'choice',
          id: 'ni-r',
          prompt: 'Segundo o NIST, os recursos de nuvem podem ser provisionados e liberados:',
          options: [
            { text: 'Rapidamente, com mínimo esforço de gestão', why: 'Isso.' },
            { text: 'Só com contrato anual e instalação física', why: 'É o contrário: rápido e com pouco esforço.' },
            { text: 'Apenas pelo próprio provedor, nunca pelo cliente', why: 'O cliente provisiona sozinho: é o autoatendimento.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'caracteristicas-1',
      part: 'Características essenciais',
      title: 'Autoatendimento, acesso pela rede e agrupamento',
      goal: 'Reconhecer três das cinco características essenciais.',
      explain:
        '| Característica | Significado |\n|---|---|\n| **Autoatendimento sob demanda** | O cliente provisiona recursos **sozinho**, sem interação humana com o provedor |\n| **Amplo acesso pela rede** | Recursos acessíveis por mecanismos padrão, de **vários tipos de dispositivo** |\n| **Agrupamento de recursos** (*resource pooling*) | Recursos **compartilhados entre vários clientes** (**multilocação**), alocados dinamicamente |',
      check: {
        kind: 'choice',
        id: 'c1-c',
        prompt: 'O analista cria uma máquina virtual pelo painel do provedor, às 23h, sem falar com ninguém. Qual característica é essa?',
        options: [
          { text: 'Autoatendimento sob demanda', why: 'Isso. Sem interação humana com o provedor.' },
          { text: 'Agrupamento de recursos', why: 'Agrupamento é compartilhar recursos entre clientes.' },
          { text: 'Serviço medido', why: 'Serviço medido é medir e cobrar o uso.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Autoatendimento** é o **caixa eletrônico**: você faz sozinho, a qualquer hora. **Amplo acesso** é usar do celular, do notebook ou do computador do escritório. **Agrupamento** é o **prédio comercial** onde várias empresas dividem a mesma estrutura (multilocação).',
        check: {
          kind: 'choice',
          id: 'c1-r',
          prompt: 'Vários clientes usam o mesmo conjunto de servidores físicos do provedor, cada um com sua parte. Qual característica?',
          options: [
            { text: 'Agrupamento de recursos (multilocação)', why: 'Isso.' },
            { text: 'Amplo acesso pela rede', why: 'Amplo acesso é acessar de vários dispositivos.' },
            { text: 'Autoatendimento', why: 'Autoatendimento é provisionar sozinho.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'caracteristicas-2',
      part: 'Características essenciais',
      title: 'Elasticidade rápida e serviço medido',
      goal: 'Reconhecer as outras duas características essenciais.',
      explain:
        '| Característica | Significado |\n|---|---|\n| **Elasticidade rápida** | Recursos **aumentam e diminuem** conforme a demanda, às vezes **automaticamente** |\n| **Serviço medido** | O uso é **monitorado** e **cobrado ou controlado** (pague pelo que usar) |\n\nCom as três da etapa anterior, são as **cinco características essenciais** do NIST.',
      check: {
        kind: 'choice',
        id: 'c2-c',
        prompt: 'No mês de prestação de contas, o sistema ganha servidores sozinho; depois, devolve. Qual característica?',
        options: [
          { text: 'Elasticidade rápida', why: 'Isso. Cresce e diminui com a demanda.' },
          { text: 'Serviço medido', why: 'Serviço medido é medir e cobrar. Crescer e diminuir é elasticidade.' },
          { text: 'Amplo acesso pela rede', why: 'Amplo acesso é acessar de vários dispositivos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Elasticidade** é o **elástico**: estica no pico e volta depois. **Serviço medido** é o **relógio de luz**: mede o consumo, e você paga pelo que usou.',
        check: {
          kind: 'sort',
          id: 'c2-r',
          prompt: 'Qual característica essencial?',
          categories: ['Elasticidade', 'Serviço medido', 'Amplo acesso'],
          items: [
            { text: 'A fatura mostra as horas de máquina usadas no mês', cat: 1, why: 'Uso medido e cobrado.' },
            { text: 'À noite o sistema encolhe para 2 servidores', cat: 0, why: 'Diminui com a demanda.' },
            { text: 'O auditor acessa pelo tablet e pelo notebook', cat: 2, why: 'Vários tipos de dispositivo.' },
          ],
        },
      },
    },
    {
      id: 'iaas',
      part: 'Modelos de serviço',
      title: 'IaaS: infraestrutura como serviço',
      goal: 'Saber o que o provedor entrega e o que o cliente gerencia no IaaS.',
      explain:
        'No **IaaS** (infraestrutura como serviço):\n\n- o **provedor entrega**: máquinas virtuais, rede, armazenamento;\n- o **cliente gerencia**: **sistema operacional**, *middleware*, aplicação e dados.\n\nExemplos: máquinas virtuais em nuvem, armazenamento de blocos.',
      check: {
        kind: 'choice',
        id: 'ia-c',
        prompt: 'O órgão contrata máquinas virtuais e instala nelas o sistema operacional, o servidor de aplicação e o seu sistema. Qual modelo?',
        options: [
          { text: 'IaaS', why: 'Isso. O cliente cuida do sistema operacional para cima.' },
          { text: 'PaaS', why: 'No PaaS o sistema operacional já vem gerenciado pelo provedor.' },
          { text: 'SaaS', why: 'No SaaS a aplicação inteira vem pronta.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'IaaS é **alugar o terreno com a casa vazia**: paredes e encanamento (máquinas, rede, disco) vêm prontos; **móveis, pintura e moradores** (sistema operacional, programas, dados) são por sua conta.',
        check: {
          kind: 'choice',
          id: 'ia-r',
          prompt: 'No IaaS, quem aplica as atualizações do sistema operacional das máquinas virtuais?',
          options: [
            { text: 'O cliente', why: 'Isso. O SO é gerenciado pelo cliente no IaaS.' },
            { text: 'O provedor', why: 'No IaaS o provedor vai só até a máquina virtual; o SO é do cliente.' },
            { text: 'Ninguém: no IaaS não há SO', why: 'Há; e é o cliente quem cuida dele.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'paas',
      part: 'Modelos de serviço',
      title: 'PaaS: plataforma como serviço',
      goal: 'Saber o que muda do IaaS para o PaaS.',
      explain:
        'No **PaaS** (plataforma como serviço):\n\n- o **provedor entrega**: infraestrutura, **sistema operacional** e **ambiente de execução**;\n- o **cliente gerencia**: só a **aplicação e os dados**.\n\nExemplos: plataformas de publicação de aplicações, **bancos de dados gerenciados**.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'A equipe só envia o código do sistema e a plataforma cuida de servidor, sistema operacional e ambiente de execução. Qual modelo?',
        options: [
          { text: 'PaaS', why: 'Isso. O cliente cuida da aplicação e dos dados.' },
          { text: 'IaaS', why: 'No IaaS a equipe teria de cuidar do sistema operacional.' },
          { text: 'SaaS', why: 'No SaaS a aplicação já viria pronta; aqui o código é da equipe.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'PaaS é **alugar a cozinha montada** de um restaurante: fogão, gás e manutenção são do dono. Você só traz **a receita e os ingredientes** (a aplicação e os dados).',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Um banco de dados gerenciado pelo provedor, em que o órgão só cuida das tabelas e dos dados, é exemplo de:',
          options: [
            { text: 'PaaS', why: 'Isso.' },
            { text: 'IaaS', why: 'No IaaS o órgão instalaria e manteria o banco e o SO.' },
            { text: 'Nuvem comunitária', why: 'Comunitária é modelo de implantação, não de serviço.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'saas',
      part: 'Modelos de serviço',
      title: 'SaaS: software como serviço',
      goal: 'Reconhecer o SaaS e o que ainda fica com o cliente.',
      explain:
        'No **SaaS** (software como serviço):\n\n- o **provedor entrega** a **aplicação completa**;\n- o **cliente gerencia**: a **configuração** e os **dados de uso**.\n\nExemplos: **e-mail na web**, **suítes de escritório online**.',
      check: {
        kind: 'choice',
        id: 'sa-c',
        prompt: 'O Tribunal assina uma suíte de escritório online e os servidores só usam. Qual modelo?',
        options: [
          { text: 'SaaS', why: 'Isso. A aplicação vem completa.' },
          { text: 'PaaS', why: 'No PaaS o órgão desenvolveria a aplicação.' },
          { text: 'IaaS', why: 'No IaaS o órgão instalaria tudo nas máquinas virtuais.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'SaaS é **comer no restaurante**: a comida vem pronta. Você escolhe o prato e a mesa (configuração) e é dono do que pediu (seus dados de uso).',
        check: {
          kind: 'sort',
          id: 'sa-r',
          prompt: 'Qual modelo de serviço?',
          categories: ['IaaS', 'PaaS', 'SaaS'],
          items: [
            { text: 'Máquina virtual em que o órgão instala tudo', cat: 0, why: 'O cliente cuida do SO para cima.' },
            { text: 'Plataforma onde a equipe só publica o código', cat: 1, why: 'O cliente cuida da aplicação e dos dados.' },
            { text: 'E-mail na web, pronto para usar', cat: 2, why: 'A aplicação vem completa.' },
          ],
        },
      },
    },
    {
      id: 'pilha',
      part: 'Modelos de serviço',
      title: 'Subindo a pilha: menos gestão, menos controle',
      goal: 'Relacionar o modelo de serviço ao controle do cliente.',
      explain:
        'Quanto mais **"acima" na pilha** (de **IaaS** para **PaaS** e depois **SaaS**), **menos o cliente administra** e **menos controle** ele tem.\n\n| Modelo | O cliente administra | Controle |\n|---|---|---|\n| IaaS | SO, *middleware*, aplicação, dados | Maior |\n| PaaS | Aplicação, dados | Médio |\n| SaaS | Configuração e dados de uso | Menor |',
      check: {
        kind: 'choice',
        id: 'pl-c',
        prompt: 'O sistema precisa de uma configuração específica do sistema operacional. Qual modelo dá ao órgão esse controle?',
        options: [
          { text: 'IaaS', why: 'Isso. No IaaS o cliente gerencia o SO.' },
          { text: 'SaaS', why: 'No SaaS o cliente não chega ao sistema operacional.' },
          { text: 'PaaS', why: 'No PaaS o SO é do provedor.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É uma troca: **conforto** contra **controle**. No restaurante (SaaS) você não escolhe o fogão; na casa alugada vazia (IaaS) escolhe tudo, mas também cuida de tudo.',
        check: {
          kind: 'order',
          id: 'pl-r',
          prompt: 'Ordene do modelo em que o cliente administra MAIS para o que administra MENOS.',
          items: ['IaaS', 'PaaS', 'SaaS'],
          why: 'Quanto mais acima na pilha, menos o cliente administra.',
        },
      },
    },
    {
      id: 'responsabilidade',
      part: 'Responsabilidade compartilhada',
      title: 'Quem cuida do quê na segurança',
      goal: 'Saber o que fica sempre com o provedor e sempre com o cliente.',
      explain:
        'Em qualquer modelo, a segurança é **dividida**:\n\n- o **provedor** sempre responde pela **infraestrutura física**;\n- o **cliente** sempre responde por **seus dados, suas contas e as permissões que concede**.\n\nEm **IaaS**, o cliente ainda aplica **atualizações do SO** e configura os **firewalls das máquinas**. Em **SaaS**, quase tudo fica com o provedor, **mas não o controle de acesso dos usuários**.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'No SaaS, um servidor que saiu do Tribunal continua com acesso ao e-mail. De quem é a responsabilidade?',
        options: [
          { text: 'Do cliente: contas e permissões são sempre dele', why: 'Isso.' },
          { text: 'Do provedor, porque no SaaS ele cuida de tudo', why: 'Quase tudo, mas não o controle de acesso dos usuários.' },
          { text: 'De ninguém: é falha do modelo SaaS', why: 'O controle de acesso é responsabilidade do cliente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cofre alugado no banco**: o banco cuida do **prédio e da porta blindada** (infraestrutura física). Mas **quem tem a chave** e **o que vai dentro** (contas, permissões e dados) é sempre problema seu.',
        check: {
          kind: 'sort',
          id: 'rs-r',
          prompt: 'No IaaS, de quem é cada tarefa?',
          categories: ['Provedor', 'Cliente'],
          items: [
            { text: 'Segurança física do datacenter', cat: 0, why: 'Sempre do provedor.' },
            { text: 'Atualizações do sistema operacional da VM', cat: 1, why: 'No IaaS, do cliente.' },
            { text: 'Permissões dadas aos usuários', cat: 1, why: 'Sempre do cliente.' },
          ],
        },
      },
    },
    {
      id: 'publica-privada',
      part: 'Modelos de implantação',
      title: 'Nuvem pública e privada',
      goal: 'Diferenciar nuvem pública de privada.',
      explain:
        '| Modelo | Quem usa |\n|---|---|\n| **Pública** | **Qualquer cliente**, na infraestrutura do provedor |\n| **Privada** | **Uma única organização** (pode estar no próprio datacenter ou num provedor) |\n\nAtenção: a nuvem **privada** pode ficar **num provedor**. O que a define é ser **exclusiva** de uma organização, não o lugar.',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'O Tribunal usa uma nuvem exclusiva dele, hospedada no datacenter de um provedor. Que modelo de implantação é?',
        options: [
          { text: 'Privada', why: 'Isso. É exclusiva de uma organização, mesmo estando num provedor.' },
          { text: 'Pública', why: 'Pública é aberta a qualquer cliente.' },
          { text: 'Comunitária', why: 'Comunitária é de um grupo de organizações.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pergunte **quem usa**, não **onde está**. Ônibus de linha (qualquer passageiro) é a **pública**. Carro do órgão, ainda que guardado na garagem de uma locadora, é a **privada**.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: 'Qualquer empresa pode contratar recursos na infraestrutura do provedor. Que modelo?',
          options: [
            { text: 'Pública', why: 'Isso.' },
            { text: 'Privada', why: 'Privada é de uma única organização.' },
            { text: 'Híbrida', why: 'Híbrida combina dois ou mais modelos.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'comunitaria-hibrida',
      part: 'Modelos de implantação',
      title: 'Nuvem comunitária e híbrida',
      goal: 'Reconhecer a nuvem comunitária e a híbrida.',
      explain:
        '| Modelo | Quem usa |\n|---|---|\n| **Comunitária** | Um **grupo de organizações** com interesses comuns (por exemplo, órgãos públicos) |\n| **Híbrida** | **Combinação de duas ou mais**, integradas, com **portabilidade** de dados e aplicações |',
      check: {
        kind: 'choice',
        id: 'ch-c',
        prompt: 'O Tribunal mantém os dados sigilosos na nuvem privada e usa a pública para o portal, com os dois ambientes integrados. Que modelo?',
        options: [
          { text: 'Híbrida', why: 'Isso. Combinação integrada de dois modelos.' },
          { text: 'Comunitária', why: 'Comunitária é a compartilhada por um grupo de organizações.' },
          { text: 'Pública', why: 'Ele usa a pública, mas combinada com a privada: é híbrida.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Comunitária** é o **condomínio** de vizinhos com as mesmas necessidades (por exemplo, vários tribunais de contas). **Híbrida** é morar em **dois lugares ligados por uma ponte**, levando suas coisas de um para o outro.',
        check: {
          kind: 'choice',
          id: 'ch-r',
          prompt: 'Vários tribunais de contas compartilham uma nuvem exclusiva para eles, com requisitos comuns. Que modelo?',
          options: [
            { text: 'Comunitária', why: 'Isso.' },
            { text: 'Privada', why: 'Privada é de uma única organização; aqui são várias.' },
            { text: 'Pública', why: 'Pública é aberta a qualquer cliente; esta é exclusiva do grupo.' },
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
      prompt: 'Ordene os modelos de serviço do que entrega MENOS pronto ao cliente para o que entrega MAIS pronto.',
      items: ['IaaS: máquinas, rede e armazenamento', 'PaaS: também SO e ambiente de execução', 'SaaS: a aplicação completa'],
      why: 'Subindo a pilha, o provedor entrega mais e o cliente administra menos.',
      errorKind: 'conceito',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais são características essenciais da nuvem segundo o NIST? Marque todas.',
      options: [
        { text: 'Elasticidade rápida', correct: true, why: 'É uma das cinco.' },
        { text: 'Serviço medido', correct: true, why: 'É uma das cinco.' },
        { text: 'Contrato mínimo de cinco anos', correct: false, why: 'Não faz parte; o modelo é sob demanda.' },
        { text: 'Hardware exclusivo para cada cliente', correct: false, why: 'É o contrário: agrupamento de recursos (multilocação).' },
      ],
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites resumiu a responsabilidade compartilhada no SaaS. Toque na linha errada.',
      lines: ['Provedor: infraestrutura física', 'Provedor: a aplicação e suas atualizações', 'Provedor: quem pode acessar o e-mail do Tribunal'],
      bug: 2,
      why: 'O controle de acesso dos usuários é sempre do cliente, mesmo no SaaS.',
      fixed: 'Cliente: quem pode acessar o e-mail do Tribunal',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'A equipe quer publicar um sistema próprio sem cuidar de sistema operacional nem de servidor. Qual contratação?',
      scenarios: [
        { title: 'Contratação A', body: 'IaaS: máquinas virtuais, com a equipe instalando o SO e o servidor de aplicação.' },
        { title: 'Contratação B', body: 'PaaS: plataforma de publicação, com a equipe enviando só o código e os dados.' },
      ],
      answer: 1,
      why: 'No PaaS o provedor cuida da infraestrutura, do SO e do ambiente de execução; a equipe fica com a aplicação e os dados.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o painel do provedor mostra quantas horas de máquina e quantos gigabytes cada setor usou, e a conta vem por isso. Qual característica essencial aparece aqui?',
      options: [
        { text: 'Serviço medido', why: 'Isso. Uso monitorado e cobrado.' },
        { text: 'Elasticidade rápida', why: 'Elasticidade é crescer e diminuir com a demanda.' },
        { text: 'Autoatendimento', why: 'Autoatendimento é provisionar sozinho.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.02.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.02.004' },
  ],
  summary: [
    'Nuvem (NIST SP 800-145): acesso sob demanda, pela rede, a recursos compartilhados, rápidos de pegar e devolver.',
    'Cinco características: autoatendimento, amplo acesso, agrupamento (multilocação), elasticidade e serviço medido.',
    'IaaS: cliente cuida do SO para cima. PaaS: da aplicação e dos dados. SaaS: da configuração e dos dados de uso.',
    'Subindo a pilha, menos gestão e menos controle.',
    'O provedor sempre cuida do físico; o cliente sempre cuida de dados, contas e permissões.',
    'Pública (qualquer cliente), privada (uma organização), comunitária (um grupo), híbrida (combinação integrada).',
  ],
};
