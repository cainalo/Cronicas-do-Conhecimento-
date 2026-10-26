// Série "CI/CD" (cap.devops.01, trecho cicd), no ritmo lento com história pedido em 25/10/2026: a
// primeira aula conta da integração contínua do XP ao GitHub Actions; as seguintes ensinam CI,
// entrega e implantação contínuas com o pipeline, ambientes e estratégias de implantação, e as
// ferramentas, uma ideia por etapa. Fatos conferidos com o texto do capítulo (02-cicd.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.devops.01', sectionId: 'cicd' } as const;

export const dvCiHistoria: MicroLesson = {
  ...S,
  id: 'devops.cicd.1',
  series: { id: 'devops.cicd', order: 1 },
  title: 'Da integração contínua ao DevOps',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Uma equipe junta o código de todos só uma vez por mês. O que costuma acontecer nesse dia?',
    options: [
      { text: 'Muitos conflitos e defeitos de uma vez', why: 'Isso. Esta aula conta como a integração contínua resolveu isso.' },
      { text: 'Tudo encaixa perfeitamente', why: 'Quanto mais tempo separado, mais conflitos.' },
      { text: 'Nada; o código não muda', why: 'O código muda todo dia; por isso os conflitos.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ci',
      part: 'A história',
      title: 'Anos 1990 e 2000: integração contínua',
      art: 'engrenagem',
      goal: 'Saber de onde vem a integração contínua.',
      explain:
        'Nos anos **1990**, o **XP** adotou a **integração contínua**: juntar o código de todos **várias vezes ao dia**, rodando os testes a cada vez.\n\nEm **2000**, **Martin Fowler** escreveu um artigo que espalhou a ideia. Em **2001**, surgiu o **CruiseControl**, uma das primeiras ferramentas para automatizar isso.\n\nIntegrar sempre torna cada junção **pequena** e fácil de corrigir.',
      check: {
        kind: 'choice',
        id: 'ci-c',
        prompt: 'Qual é a ideia da integração contínua?',
        options: [
          { text: 'Integrar o código com frequência, rodando os testes a cada vez', why: 'Isso.' },
          { text: 'Integrar uma vez por ano, com cuidado', why: 'É o oposto.' },
          { text: 'Nunca integrar', why: 'Integrar com frequência é o ponto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Arrumar a **cozinha todo dia** leva 10 minutos. Arrumar **uma vez por mês** leva um fim de semana, e algo sempre se perde. A integração contínua é arrumar todo dia.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'Qual método ágil adotou a integração contínua nos anos 1990?',
          options: [
            { text: 'XP', why: 'Isso.' },
            { text: 'Cascata', why: 'A cascata integra no fim.' },
            { text: 'Modelo em V', why: 'O V organiza testes por fase.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'jenkins',
      part: 'A história',
      title: '2005 a 2011: Hudson e Jenkins',
      art: 'professores',
      goal: 'Saber de onde vem o Jenkins.',
      explain:
        'Em **2005**, **Kohsuke Kawaguchi**, na Sun, criou o **Hudson**, um servidor de automação para integração contínua.\n\nEm **2011**, depois de uma disputa com a Oracle, a comunidade **renomeou** o projeto para **Jenkins**, que segue **aberto** e extensível por **plugins**.\n\nEm **2010**, o livro *Continuous Delivery*, de **Jez Humble** e **David Farley**, levou a ideia além: deixar **toda versão pronta** para produção.',
      check: {
        kind: 'choice',
        id: 'je-c',
        prompt: 'O Jenkins nasceu de qual projeto?',
        options: [
          { text: 'Hudson', why: 'Isso, renomeado em 2011.' },
          { text: 'Git', why: 'O Git é controle de versão.' },
          { text: 'GitHub Actions', why: 'O Actions é bem posterior.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'É como uma **associação de moradores** que muda de nome depois de uma briga com o dono do salão: as mesmas pessoas, o mesmo trabalho, nome novo. O Hudson virou **Jenkins** em 2011.',
        check: {
          kind: 'choice',
          id: 'je-r',
          prompt: 'Quem escreveu o livro Continuous Delivery, em 2010?',
          options: [
            { text: 'Jez Humble e David Farley', why: 'Isso.' },
            { text: 'Linus Torvalds', why: 'Torvalds criou o Git.' },
            { text: 'Kent Beck', why: 'Beck é do XP.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'devops',
      part: 'A história',
      title: '2009 a 2019: DevOps e Actions',
      art: 'nuvem',
      goal: 'Saber de onde vêm o termo DevOps e o GitHub Actions.',
      explain:
        'Em **2009**, **Patrick Debois** organizou os primeiros **DevOpsDays**, na Bélgica, e o termo **DevOps** pegou: desenvolvimento e operação trabalhando juntos, com automação.\n\nAs plataformas de código passaram a trazer o pipeline embutido: o **GitLab CI/CD** e, em **2019**, o **GitHub Actions** com integração e entrega contínuas.',
      check: {
        kind: 'order',
        id: 'dv-c',
        prompt: 'Ordene do mais antigo ao mais recente.',
        items: ['Artigo de Fowler sobre CI (2000)', 'Hudson (2005)', 'DevOpsDays (2009)', 'Jenkins (2011)', 'GitHub Actions com CI/CD (2019)'],
        why: 'Da ideia às ferramentas embutidas nas plataformas.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**DevOps** junta **Dev** (quem desenvolve) e **Ops** (quem opera). Antes, um time **jogava o código por cima do muro** para o outro. DevOps derruba o muro: os dois automatizam juntos a entrega.',
        check: {
          kind: 'choice',
          id: 'dv-r',
          prompt: 'Quem organizou os primeiros DevOpsDays, em 2009?',
          options: [
            { text: 'Patrick Debois', why: 'Isso.' },
            { text: 'Martin Fowler', why: 'Fowler escreveu sobre CI em 2000.' },
            { text: 'Kohsuke Kawaguchi', why: 'Kawaguchi criou o Hudson.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história.',
      items: ['CruiseControl (2001)', 'Hudson (2005)', 'Livro Continuous Delivery (2010)', 'Jenkins (2011)'],
      why: 'Das primeiras ferramentas à entrega contínua.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem está ligado a cada marco?',
      categories: ['Fowler', 'Kawaguchi', 'Debois'],
      items: [
        { text: 'Artigo sobre integração contínua', cat: 0, why: '2000.' },
        { text: 'Hudson, depois Jenkins', cat: 1, why: '2005.' },
        { text: 'DevOpsDays', cat: 2, why: '2009.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Jenkins: aberto e com plugins', 'DevOps: desenvolvimento e operação juntos', 'Integração contínua: juntar o código uma vez por mês'],
      bug: 2,
      why: 'A integração contínua junta o código várias vezes ao dia.',
      fixed: 'Integração contínua: várias vezes ao dia',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    'Anos 1990: o XP adota a integração contínua; 2000: artigo de Martin Fowler; 2001: CruiseControl.',
    '2005: Hudson (Kohsuke Kawaguchi); 2011: renomeado Jenkins. 2010: livro Continuous Delivery (Humble e Farley).',
    '2009: DevOpsDays de Patrick Debois. 2019: GitHub Actions com CI/CD.',
  ],
};

export const dvCiPipeline: MicroLesson = {
  ...S,
  id: 'devops.cicd.2',
  series: { id: 'devops.cicd', order: 2 },
  title: 'CI, entrega e implantação contínuas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Na entrega contínua, toda mudança vai sozinha para produção?',
    options: [
      { text: 'Não: fica pronta, e a publicação é uma decisão manual', why: 'Isso. Esta aula separa as três práticas e mostra o pipeline.' },
      { text: 'Sim, sempre', why: 'Pegadinha: isso é a implantação contínua.' },
      { text: 'Só às sextas-feiras', why: 'A diferença é a decisão manual antes da produção.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tres',
      part: 'As práticas',
      title: 'Três práticas, três alcances',
      art: 'degraus',
      goal: 'Distinguir integração, entrega e implantação contínuas.',
      explain:
        '- **Integração contínua** (CI): integrar no tronco com frequência; a cada integração, o pipeline **compila e testa**. Vai até o **artefato testado**;\n- **entrega contínua** (*delivery*): todo commit aprovado gera uma versão **pronta para produção**; publicar é **decisão manual**;\n- **implantação contínua** (*deployment*): todo commit que passa vai **automaticamente** para produção.\n\nA diferença entre as duas últimas é **só a aprovação manual**.',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'Na implantação contínua, diferentemente da entrega contínua:',
        options: [
          { text: 'As mudanças aprovadas no pipeline vão automaticamente para produção', why: 'Isso.' },
          { text: 'Não há testes automatizados', why: 'As duas usam testes automatizados.' },
          { text: 'A publicação depende sempre de aprovação manual', why: 'Isso é a entrega contínua.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **padaria**: na **entrega contínua**, o pão sai do forno e fica **pronto no balcão**, esperando o padeiro dizer "pode vender". Na **implantação contínua**, o pão sai do forno e **vai direto** para a prateleira do cliente.',
        check: {
          kind: 'choice',
          id: 'tr-r',
          prompt: 'Até onde vai a integração contínua?',
          options: [
            { text: 'Até o artefato compilado e testado', why: 'Isso.' },
            { text: 'Até a produção, sempre', why: 'Isso é a implantação contínua.' },
            { text: 'Só até o commit', why: 'Ela compila e testa a cada integração.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'etapas',
      part: 'O pipeline',
      title: 'As etapas, das rápidas às lentas',
      art: 'trilha',
      goal: 'Ordenar as etapas típicas de um pipeline.',
      explain:
        'Etapas típicas:\n\n1. *checkout* do código;\n2. instalação de dependências;\n3. *build*;\n4. **testes unitários**;\n5. **análise estática** e de segurança (SAST, dependências vulneráveis, segredos);\n6. empacotamento;\n7. testes de integração;\n8. implantação em **homologação**;\n9. testes de aceitação;\n10. implantação em **produção**.\n\n***Fail fast***: etapas **rápidas primeiro**, para dar retorno em minutos.',
      check: {
        kind: 'order',
        id: 'et-c',
        prompt: 'Ordene estas etapas do pipeline.',
        items: ['Build', 'Testes unitários', 'Implantação em homologação', 'Implantação em produção'],
        why: 'Construir, testar rápido, homologar e publicar.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Numa **linha de montagem**, a peça é inspecionada **logo na primeira estação**: se estiver torta, nem segue. O pipeline faz o mesmo: os testes **rápidos e baratos** vêm primeiro; produção só no fim.',
        check: {
          kind: 'choice',
          id: 'et-r',
          prompt: 'O que significa fail fast no pipeline?',
          options: [
            { text: 'Etapas rápidas primeiro, para falhar cedo e dar retorno rápido', why: 'Isso.' },
            { text: 'Falhar de propósito toda vez', why: 'É detectar falhas o mais cedo possível.' },
            { text: 'Pular os testes', why: 'Os testes rápidos vêm primeiro, não são pulados.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'principios',
      part: 'O pipeline',
      title: 'Construa uma vez, implante muitas',
      art: 'cartao',
      goal: 'Aplicar os princípios do pipeline.',
      explain:
        'Princípios:\n\n- **construa uma vez, implante muitas**: o **mesmo artefato** passa por todos os ambientes; só a **configuração** muda;\n- **pipeline quebrado** é prioridade da equipe;\n- **segredos** ficam em cofres ou variáveis protegidas, **nunca no repositório**.\n\nCompilar de novo para cada ambiente arrisca levar à produção algo **diferente** do que foi testado.',
      check: {
        kind: 'choice',
        id: 'pc-c',
        prompt: 'O artefato implantado em produção deve ser:',
        options: [
          { text: 'O mesmo testado em homologação, mudando só a configuração', why: 'Isso.' },
          { text: 'Compilado de novo para produção', why: 'Pegadinha: seria diferente do que foi testado.' },
          { text: 'Montado à mão pelo administrador', why: 'O pipeline gera o artefato uma vez.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na **vacina**, o mesmo **lote** que passou nos testes é o que vai aos postos. Fabricar um lote novo para cada cidade exigiria testar tudo de novo. No pipeline, o artefato é o lote: **um só**, testado e distribuído.',
        check: {
          kind: 'choice',
          id: 'pc-r',
          prompt: 'Onde guardar a senha do banco usada pelo pipeline?',
          options: [
            { text: 'Num cofre ou variável protegida', why: 'Isso.' },
            { text: 'No arquivo YAML do pipeline', why: 'O YAML fica no repositório; segredo não vai lá.' },
            { text: 'No README', why: 'Nunca no repositório.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual prática cada frase descreve?',
      categories: ['Integração contínua', 'Entrega contínua', 'Implantação contínua'],
      items: [
        { text: 'Compila e testa a cada integração', cat: 0, why: 'Artefato testado.' },
        { text: 'Versão pronta; publicar é decisão manual', cat: 1, why: 'Aprovação humana.' },
        { text: 'Passou no pipeline, vai à produção sozinho', cat: 2, why: 'Automático.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Fail fast: etapas rápidas primeiro', 'Segredos fora do repositório', 'Um artefato diferente para cada ambiente'],
      bug: 2,
      why: 'Constrói-se uma vez; muda-se só a configuração.',
      fixed: 'Um artefato para todos os ambientes',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O órgão exige que um gestor autorize cada publicação em produção. Qual prática se aplica?',
      scenarios: [
        { title: 'Opção A', body: '**Entrega contínua**: versões sempre prontas, publicação com aprovação manual.' },
        { title: 'Opção B', body: '**Implantação contínua**: tudo que passa vai automaticamente.' },
      ],
      answer: 0,
      why: 'Com aprovação manual antes da produção, é entrega contínua.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.008' },
  ],
  summary: [
    'CI: integrar e testar sempre. Entrega contínua: sempre pronto, publicação manual. Implantação contínua: automática.',
    'Pipeline: checkout, dependências, build, unitários, análise estática, empacotar, integração, homologação, aceitação, produção. Fail fast.',
    'Construa uma vez, implante muitas; pipeline quebrado é prioridade; segredos em cofres.',
  ],
};

export const dvCiAmbientes: MicroLesson = {
  ...S,
  id: 'devops.cicd.3',
  series: { id: 'devops.cicd', order: 3 },
  title: 'Ambientes e estratégias de implantação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A nova versão vai primeiro para 5% dos usuários e, se tudo der certo, a fatia cresce. Que estratégia é essa?',
    options: [
      { text: 'Canary', why: 'Isso. Esta aula mostra ambientes e estratégias.' },
      { text: 'Blue-green', why: 'No blue-green, a troca é de uma vez.' },
      { text: 'Rolling', why: 'O rolling troca instâncias, não fatias de usuários por métricas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ambientes',
      part: 'Ambientes',
      title: 'Desenvolvimento, homologação e produção',
      art: 'computador',
      goal: 'Saber o papel de cada ambiente.',
      explain:
        '- **Desenvolvimento**: trabalho diário dos desenvolvedores;\n- **homologação** (*staging*): **réplica o mais fiel possível da produção**, para testes finais e **aceite do usuário**;\n- **produção**: **usuários reais**.\n\nDiferenças de configuração devem ser **explícitas e versionadas**. Dados pessoais reais **não** vão para desenvolvimento **sem mascaramento**.',
      check: {
        kind: 'choice',
        id: 'am-c',
        prompt: 'O ambiente que reproduz a produção para testes finais e aceite do usuário é o de:',
        options: [
          { text: 'Homologação', why: 'Isso.' },
          { text: 'Desenvolvimento', why: 'Desenvolvimento é o trabalho diário.' },
          { text: 'Produção', why: 'Produção é com usuários reais.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No **teatro**: os **ensaios** soltos são o desenvolvimento; o **ensaio geral**, com figurino, luz e palco de verdade, é a homologação; a **estreia** com plateia é a produção.',
        check: {
          kind: 'choice',
          id: 'am-r',
          prompt: 'Copiar a base de produção com CPFs reais para desenvolvimento, sem mascarar, é:',
          options: [
            { text: 'Inadequado: é preciso mascarar os dados pessoais', why: 'Isso.' },
            { text: 'Recomendado, para testar com dados reais', why: 'Expõe dados pessoais sem necessidade.' },
            { text: 'Indiferente', why: 'Fere a proteção de dados pessoais.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'estrategias',
      part: 'Estratégias',
      title: 'Rolling, blue-green e canary',
      art: 'balanca',
      goal: 'Distinguir rolling, blue-green e canary.',
      explain:
        '- ***Rolling***: substitui as instâncias **aos poucos**;\n- ***blue-green***: dois ambientes idênticos; o tráfego é **trocado de uma vez** do antigo (azul) para o novo (verde), com **retorno imediato** se der errado;\n- ***canary***: a nova versão recebe primeiro uma **pequena fatia** dos usuários; **amplia-se** se as métricas estiverem boas.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Dois ambientes idênticos, com o tráfego trocado de uma vez e retorno imediato, caracterizam:',
        options: [
          { text: 'Blue-green', why: 'Isso.' },
          { text: 'Canary', why: 'Canary migra por fatias de usuários.' },
          { text: 'Rolling', why: 'Rolling troca instâncias aos poucos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O nome **canary** vem dos **canários** que os mineiros levavam: se o ar estivesse ruim, o pássaro avisava primeiro. A pequena fatia de usuários é o canário. No **blue-green**, há **duas pontes** prontas e muda-se o trânsito de uma para a outra.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'No blue-green, os usuários são migrados aos poucos por percentual?',
          options: [
            { text: 'Não: a troca é de uma vez; aos poucos é a canary', why: 'Isso.' },
            { text: 'Sim', why: 'Pegadinha: por percentual é a canary.' },
            { text: 'Sim, por ordem alfabética', why: 'A troca é de uma vez.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'flags',
      part: 'Estratégias',
      title: 'Feature flags: implantar não é lançar',
      art: 'interruptor',
      goal: 'Entender como as feature flags separam implantar de lançar.',
      explain:
        'Com ***feature flags***, o código vai para produção **desligado** e é **ativado por configuração**.\n\nIsso separa duas coisas:\n\n- **implantar**: o código está em produção;\n- **lançar**: os usuários passam a ver a funcionalidade.\n\nDá para ligar para um grupo de teste, desligar na hora se algo der errado, sem nova implantação.',
      check: {
        kind: 'choice',
        id: 'fl-c',
        prompt: 'O que as feature flags permitem?',
        options: [
          { text: 'Implantar o código desligado e ativá-lo depois por configuração', why: 'Isso.' },
          { text: 'Pular os testes', why: 'Os testes continuam; a flag controla a ativação.' },
          { text: 'Guardar senhas', why: 'Senhas vão em cofres.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como instalar a **iluminação de Natal** em novembro, **desligada**. Ela já está lá (implantada); só **acende** (lança) no dia certo, com um **interruptor**, e apaga na hora se der curto.',
        check: {
          kind: 'choice',
          id: 'fl-r',
          prompt: 'Com feature flags, desligar uma funcionalidade com problema exige:',
          options: [
            { text: 'Só mudar a configuração', why: 'Isso: sem nova implantação.' },
            { text: 'Um novo build e implantação', why: 'A flag evita isso.' },
            { text: 'Apagar o banco', why: 'Basta desligar a flag.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual estratégia cada descrição indica?',
      categories: ['Rolling', 'Blue-green', 'Canary'],
      items: [
        { text: 'Troca as instâncias aos poucos', cat: 0, why: 'Substituição gradual.' },
        { text: 'Troca todo o tráfego de uma vez entre dois ambientes', cat: 1, why: 'Azul e verde.' },
        { text: '5% dos usuários primeiro, depois mais', cat: 2, why: 'Fatia por métricas.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Homologação: réplica da produção', 'Feature flag: implantar não é lançar', 'Blue-green: migra os usuários por percentual'],
      bug: 2,
      why: 'Por percentual é a canary; no blue-green a troca é de uma vez.',
      fixed: 'Blue-green: troca de uma vez',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O portal novo é crítico, e o órgão quer testar com poucos usuários reais antes de liberar a todos. Qual estratégia?',
      scenarios: [
        { title: 'Opção A', body: '**Canary**: uma pequena fatia primeiro, ampliando com métricas boas.' },
        { title: 'Opção B', body: '**Trocar tudo de uma vez**, sem observar métricas.' },
      ],
      answer: 0,
      why: 'A canary expõe poucos usuários e só amplia com evidência.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.012' },
  ],
  summary: [
    'Desenvolvimento (dia a dia), homologação (réplica da produção, aceite), produção (usuários reais). Mascarar dados pessoais.',
    'Rolling (instâncias aos poucos), blue-green (troca de uma vez, retorno imediato), canary (fatia crescente por métricas).',
    'Feature flags: código implantado desligado; ativar por configuração separa implantar de lançar.',
  ],
};

export const dvCiFerramentas: MicroLesson = {
  ...S,
  id: 'devops.cicd.4',
  series: { id: 'devops.cicd', order: 4 },
  title: 'GitHub Actions, GitLab CI e Jenkins',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Onde ficam os workflows do GitHub Actions?',
    options: [
      { text: 'Em arquivos YAML na pasta .github/workflows/', why: 'Isso. Esta aula compara as três ferramentas.' },
      { text: 'No arquivo .gitlab-ci.yml', why: 'Esse é do GitLab.' },
      { text: 'No Jenkinsfile', why: 'Esse é do Jenkins.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'actions',
      part: 'Ferramentas',
      title: 'GitHub Actions',
      art: 'engrenagem',
      goal: 'Ler a estrutura de um workflow do GitHub Actions.',
      explain:
        'No **GitHub Actions**, os workflows são arquivos **YAML** em `.github/workflows/`. São disparados por **eventos** (`push`, `pull_request`, `schedule`), têm **jobs** que rodam em ***runners***, e cada job tem **steps**. Actions prontas se reaproveitam com `uses:`.\n\n```yaml\nname: ci\non: [push, pull_request]\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps: [{ uses: actions/checkout@v4 }, { run: npm test }]\n```',
      check: {
        kind: 'choice',
        id: 'ac-c',
        prompt: 'No GitHub Actions, onde os jobs são executados?',
        options: [
          { text: 'Em runners', why: 'Isso.' },
          { text: 'Em stages do GitLab', why: 'Stages são do GitLab.' },
          { text: 'No Jenkinsfile', why: 'Jenkinsfile é do Jenkins.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia o workflow como uma **ordem de serviço**: **quando** fazer (`on`), **quem** faz (`runs-on`, o runner), e a **lista de tarefas** (`steps`). O `uses` é pegar uma **ferramenta pronta** da caixa.',
        check: {
          kind: 'choice',
          id: 'ac-r',
          prompt: 'O que dispara um workflow do GitHub Actions?',
          options: [
            { text: 'Eventos, como push, pull_request e schedule', why: 'Isso.' },
            { text: 'Só um clique manual', why: 'Também há eventos automáticos.' },
            { text: 'O Jenkins', why: 'O Actions é independente do Jenkins.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'gitlab',
      part: 'Ferramentas',
      title: 'GitLab CI/CD',
      art: 'trilha',
      goal: 'Reconhecer a estrutura do GitLab CI/CD.',
      explain:
        'No **GitLab CI/CD**, o pipeline fica no arquivo **`.gitlab-ci.yml`**, na **raiz** do repositório.\n\nEle tem **stages** executados **em ordem** (por exemplo, build, test, deploy) e **jobs** dentro de cada stage, executados pelos ***GitLab Runners***.\n\nJobs do mesmo stage podem rodar em paralelo; o próximo stage espera o anterior.',
      check: {
        kind: 'choice',
        id: 'gl-c',
        prompt: 'O arquivo de pipeline do GitLab é:',
        options: [
          { text: '.gitlab-ci.yml, na raiz', why: 'Isso.' },
          { text: '.github/workflows/ci.yml', why: 'Esse é o caminho do GitHub Actions.' },
          { text: 'Jenkinsfile', why: 'Esse é do Jenkins.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Os **stages** são as **etapas de uma obra**: fundação, paredes, telhado, sempre nessa ordem. Os **jobs** são as **equipes** de cada etapa, que podem trabalhar ao mesmo tempo. Só se começa o telhado quando as paredes terminam.',
        check: {
          kind: 'choice',
          id: 'gl-r',
          prompt: 'No GitLab, quem executa os jobs?',
          options: [
            { text: 'Os GitLab Runners', why: 'Isso.' },
            { text: 'Os plugins do Jenkins', why: 'Plugins são do Jenkins.' },
            { text: 'O navegador do usuário', why: 'Os runners executam os jobs.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'jenkins',
      part: 'Ferramentas',
      title: 'Jenkins',
      art: 'chip',
      goal: 'Reconhecer a estrutura do Jenkins.',
      explain:
        'O **Jenkins** é um **servidor de automação** de **código aberto**, extensível por ***plugins***.\n\nOs pipelines são descritos num **`Jenkinsfile`**, em estilo **declarativo** ou ***scripted***, com blocos `pipeline`, `agent`, `stages` e `steps`.\n\nDiferente do Actions e do GitLab, o Jenkins é um **servidor à parte**, que a equipe instala e mantém.',
      check: {
        kind: 'choice',
        id: 'jk-c',
        prompt: 'Sobre Jenkins e GitLab CI/CD, é correto:',
        options: [
          { text: 'O Jenkins usa Jenkinsfile; o GitLab, o .gitlab-ci.yml com stages e jobs', why: 'Isso.' },
          { text: 'Os dois usam .github/workflows', why: 'Esse caminho é do GitHub Actions.' },
          { text: 'O Jenkins é um produto fechado e pago', why: 'É de código aberto.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O Jenkins é uma **oficina própria**: você monta, escolhe as **ferramentas** (plugins) e cuida da manutenção. O Actions e o GitLab CI são **oficinas da concessionária**, já embutidas na plataforma onde o código mora.',
        check: {
          kind: 'choice',
          id: 'jk-r',
          prompt: 'Como o Jenkins ganha novas funções?',
          options: [
            { text: 'Por plugins', why: 'Isso.' },
            { text: 'Por actions com uses:', why: 'Isso é do GitHub Actions.' },
            { text: 'Não ganha', why: 'É extensível por plugins.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'De qual ferramenta é cada item?',
      categories: ['GitHub Actions', 'GitLab CI/CD', 'Jenkins'],
      items: [
        { text: '.github/workflows/', cat: 0, why: 'Pasta dos workflows.' },
        { text: '.gitlab-ci.yml', cat: 1, why: 'Arquivo na raiz.' },
        { text: 'Jenkinsfile', cat: 2, why: 'Pipeline do Jenkins.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Actions: jobs em runners', 'Jenkins: extensível por plugins', 'GitLab: pipeline em .github/workflows'],
      bug: 2,
      why: 'O GitLab usa .gitlab-ci.yml na raiz.',
      fixed: 'GitLab: pipeline em .gitlab-ci.yml',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'O código do órgão está no GitHub, e a equipe não quer manter um servidor de automação. O que usar?',
      scenarios: [
        { title: 'Opção A', body: '**GitHub Actions**, embutido na plataforma.' },
        { title: 'Opção B', body: '**Jenkins** num servidor próprio a instalar e manter.' },
      ],
      answer: 0,
      why: 'O Actions já vem com o GitHub; o Jenkins exige servidor próprio.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.010' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.devops.01.011' },
  ],
  summary: [
    'GitHub Actions: YAML em .github/workflows/; eventos, jobs em runners, steps, uses.',
    'GitLab CI/CD: .gitlab-ci.yml na raiz; stages em ordem, jobs em GitLab Runners.',
    'Jenkins: servidor aberto com plugins; Jenkinsfile declarativo ou scripted (pipeline, agent, stages, steps).',
  ],
};
