// Microaula "Princípios, riscos e classificação" (cap.seg.02, seção principios), no formato aprovado
// em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do
// texto do capítulo (cap02-defesa/01-principios.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegPrincipios: MicroLesson = {
  id: 'micro.seg.principios',
  chapterId: 'cap.seg.02',
  sectionId: 'principios',
  title: 'Princípios, riscos e classificação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O sistema de folha de pagamento ficou fora do ar no dia do pagamento, mas nenhum dado vazou nem foi alterado. Houve problema de segurança?',
    options: [
      { text: 'Sim: a informação não estava disponível quando era preciso', why: 'Isso. Segurança não é só sigilo: disponibilidade também é um princípio.' },
      { text: 'Não: segurança é só impedir vazamentos', why: 'Vazamento fere a confidencialidade, mas há outros princípios, como a disponibilidade.' },
      { text: 'Não: só há problema se alguém alterar dados', why: 'Alteração fere a integridade; ficar fora do ar fere a disponibilidade.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cid',
      part: 'Princípios',
      title: 'A tríade CID',
      goal: 'Reconhecer violações de confidencialidade, integridade e disponibilidade.',
      explain:
        '| Princípio | Pergunta | Violação |\n|---|---|---|\n| **Confidencialidade** | Só quem pode, lê? | Vazamento de planilha de servidores com CPF |\n| **Integridade** | Está correta e completa? | Alteração indevida do valor de um empenho |\n| **Disponibilidade** | Está acessível quando preciso? | Sistema fora do ar por negação de serviço |\n\nOs três formam a **tríade CID** (em inglês, CIA).',
      check: {
        kind: 'sort',
        id: 'ci-c',
        prompt: 'Qual princípio foi violado?',
        categories: ['Confidencialidade', 'Integridade', 'Disponibilidade'],
        items: [
          { text: 'Uma planilha com CPFs vazou na internet', cat: 0, why: 'Quem não podia, leu.' },
          { text: 'Alguém mudou o valor de um empenho', cat: 1, why: 'A informação deixou de ser correta.' },
          { text: 'O portal caiu por um ataque de negação de serviço', cat: 2, why: 'Não estava acessível.' },
        ],
      },
      recovery: {
        explain: 'Faça três perguntas. **Quem leu?** Se leu quem não podia, é confidencialidade. **Está certo?** Se mudou sem autorização, é integridade. **Consigo usar agora?** Se não, é disponibilidade.',
        check: {
          kind: 'choice',
          id: 'ci-r',
          prompt: 'Um servidor apagou por engano parte de um processo, que ficou incompleto. Que princípio foi ferido?',
          options: [
            { text: 'Integridade', why: 'Isso: a informação não está mais completa.' },
            { text: 'Confidencialidade', why: 'Ninguém leu o que não devia.' },
            { text: 'Não repúdio', why: 'Não repúdio é sobre negar a autoria.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'autenticidade',
      part: 'Princípios',
      title: 'Autenticidade e não repúdio',
      goal: 'Diferenciar autenticidade de não repúdio.',
      explain:
        '| Princípio | Pergunta | Violação |\n|---|---|---|\n| **Autenticidade** | A origem é quem diz ser? | E-mail falso se passando pela presidência |\n| **Não repúdio** | O autor pode negar a autoria? | Gestor nega ter enviado um documento sem assinatura digital |',
      check: {
        kind: 'choice',
        id: 'au-c',
        prompt: 'Chega um e-mail "da presidência" pedindo dados, mas foi enviado por um golpista. Que princípio foi violado?',
        options: [
          { text: 'Autenticidade', why: 'Isso: a origem não é quem diz ser.' },
          { text: 'Disponibilidade', why: 'O sistema de e-mail funcionou; o problema é a origem falsa.' },
          { text: 'Integridade', why: 'O ponto não é a mensagem ter sido alterada, mas a origem ser falsa.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Autenticidade** olha para **quem mandou**: é mesmo essa pessoa? **Não repúdio** olha para **depois**: quem mandou consegue negar que mandou? Sem assinatura digital, o gestor pode dizer "não fui eu".',
        check: {
          kind: 'choice',
          id: 'au-r',
          prompt: 'Um gestor diz que nunca enviou um ofício eletrônico, e não há assinatura digital para provar. Qual princípio falhou?',
          options: [
            { text: 'Não repúdio', why: 'Isso: o autor consegue negar a autoria.' },
            { text: 'Confidencialidade', why: 'Ninguém leu o que não devia.' },
            { text: 'Disponibilidade', why: 'O documento está acessível.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'vocabulario',
      part: 'Riscos',
      title: 'Ativo, vulnerabilidade e ameaça',
      goal: 'Diferenciar ativo, vulnerabilidade e ameaça.',
      explain:
        '| Termo | Significado |\n|---|---|\n| **Ativo** | Tudo que tem valor: dados, sistemas, pessoas, reputação |\n| **Vulnerabilidade** | **Fraqueza** que pode ser explorada (software desatualizado, senha fraca, porta aberta) |\n| **Ameaça** | **Causa potencial** de um incidente (atacante, falha de energia, erro humano) |',
      check: {
        kind: 'sort',
        id: 'vo-c',
        prompt: 'Classifique cada item.',
        categories: ['Ativo', 'Vulnerabilidade', 'Ameaça'],
        items: [
          { text: 'Banco de dados de processos', cat: 0, why: 'Tem valor.' },
          { text: 'Servidor com sistema desatualizado', cat: 1, why: 'Fraqueza explorável.' },
          { text: 'Grupo de atacantes', cat: 2, why: 'Causa potencial de incidente.' },
          { text: 'Senha fraca do administrador', cat: 1, why: 'Fraqueza explorável.' },
        ],
      },
      recovery: {
        explain: 'Pense numa **casa**. Os **bens** dentro são os ativos. A **janela sem trinco** é a vulnerabilidade. O **ladrão** (ou uma tempestade) é a ameaça. A fraqueza é da casa; a ameaça vem de fora.',
        check: {
          kind: 'choice',
          id: 'vo-r',
          prompt: 'A fraqueza de um ativo que pode ser explorada por uma ameaça chama-se:',
          options: [
            { text: 'Vulnerabilidade', why: 'Isso.' },
            { text: 'Ameaça', why: 'A ameaça é a causa potencial, quem explora.' },
            { text: 'Controle', why: 'Controle é a medida que reduz o risco.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'risco',
      part: 'Riscos',
      title: 'Risco, incidente e controle',
      goal: 'Saber o que é risco, como se avalia, e diferenciar de incidente e controle.',
      explain:
        '| Termo | Significado |\n|---|---|\n| **Risco** | Possibilidade de uma ameaça explorar uma vulnerabilidade e causar impacto; avaliado por **probabilidade × impacto** |\n| **Incidente** | Evento que **de fato** compromete a segurança |\n| **Controle** | Medida que **reduz** o risco |\n\nSem vulnerabilidade, a ameaça não tem por onde agir; sem ameaça, a vulnerabilidade não gera risco.',
      check: {
        kind: 'choice',
        id: 'ri-c',
        prompt: 'O risco é avaliado por:',
        options: [
          { text: 'Probabilidade × impacto', why: 'Isso.' },
          { text: 'Número de ativos × número de servidores', why: 'O risco combina a chance de acontecer e o tamanho do estrago.' },
          { text: 'Apenas pelo número de vulnerabilidades', why: 'Vulnerabilidade sozinha, sem ameaça, não gera risco.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Risco é **o que pode acontecer**; incidente é **o que aconteceu**; controle é **o que se faz para reduzir**. E o tamanho do risco vem de duas perguntas: **qual a chance?** e **qual o estrago?**',
        check: {
          kind: 'sort',
          id: 'ri-r',
          prompt: 'Classifique.',
          categories: ['Risco', 'Incidente', 'Controle'],
          items: [
            { text: 'Chance de o servidor desatualizado ser invadido', cat: 0, why: 'Possibilidade.' },
            { text: 'O servidor foi invadido ontem', cat: 1, why: 'Aconteceu.' },
            { text: 'Aplicar a atualização de segurança', cat: 2, why: 'Reduz o risco.' },
          ],
        },
      },
    },
    {
      id: 'tratamento',
      part: 'Riscos',
      title: 'Quatro formas de tratar um risco',
      goal: 'Identificar mitigar, transferir, evitar e aceitar.',
      explain:
        '| Opção | O que é | Exemplo |\n|---|---|---|\n| **Mitigar** | Controles para diminuir probabilidade ou impacto | Atualizar o sistema, ativar MFA |\n| **Transferir** | Passar parte das consequências a terceiros | Seguro cibernético |\n| **Evitar** | Eliminar a atividade que gera o risco | Desativar serviço desnecessário exposto |\n| **Aceitar** | Assumir conscientemente o risco residual | Controle custaria mais que o prejuízo |',
      check: {
        kind: 'choice',
        id: 'tr-c',
        prompt: 'O órgão contratou seguro contra incidentes cibernéticos. Essa opção é:',
        options: [
          { text: 'Transferir o risco', why: 'Isso: parte das consequências passa ao segurador.' },
          { text: 'Mitigar o risco', why: 'O seguro não diminui a chance do incidente; ele repassa o prejuízo.' },
          { text: 'Evitar o risco', why: 'Evitar seria eliminar a atividade.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Imagine um carro. **Mitigar**: instalar alarme. **Transferir**: fazer seguro. **Evitar**: vender o carro. **Aceitar**: seguir assim, sabendo do risco. Cada opção mexe numa coisa diferente.',
        check: {
          kind: 'sort',
          id: 'tr-r',
          prompt: 'Classifique cada decisão.',
          categories: ['Mitigar', 'Transferir', 'Evitar', 'Aceitar'],
          items: [
            { text: 'Ativar MFA para todos', cat: 0, why: 'Reduz a probabilidade.' },
            { text: 'Contrato com cláusula de responsabilidade do fornecedor', cat: 1, why: 'Repassa consequências.' },
            { text: 'Desligar um serviço antigo exposto à internet', cat: 2, why: 'Elimina a atividade.' },
            { text: 'Manter um risco baixo, registrado pela gestão', cat: 3, why: 'Assume o risco residual.' },
          ],
        },
      },
    },
    {
      id: 'residual',
      part: 'Riscos',
      title: 'Risco residual',
      goal: 'Saber o que é o risco residual e quem decide aceitá-lo.',
      explain:
        'O risco que **sobra após os controles** é o **risco residual**.\n\nAceitá-lo é **decisão da gestão**, **registrada formalmente**.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Depois de atualizar o sistema e ativar MFA, ainda sobra algum risco. Como ele se chama, e quem decide aceitá-lo?',
        options: [
          { text: 'Risco residual; a gestão, com registro formal', why: 'Isso.' },
          { text: 'Risco zero; ninguém precisa decidir', why: 'Sempre pode sobrar risco depois dos controles.' },
          { text: 'Risco residual; o técnico que aplicou os controles, sem registro', why: 'A aceitação é da gestão e fica registrada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Controles **diminuem** o risco, raramente o zeram. O que sobra é o **residual**. Como alguém precisa responder por ele, a **gestão** decide aceitá-lo e deixa isso **por escrito**.',
        check: {
          kind: 'tf',
          id: 're-r',
          prompt: 'O risco residual é o que sobra depois dos controles, e aceitá-lo é decisão da gestão, registrada formalmente.',
          answer: true,
          why: 'Verdadeiro.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'gestao',
      part: 'Gestão',
      title: 'Vulnerabilidades e incidentes no dia a dia',
      goal: 'Conhecer o ciclo de gestão de vulnerabilidades e de resposta a incidentes.',
      explain:
        '**Vulnerabilidades:** inventário de ativos, varreduras periódicas, priorização (pontuação **CVSS** e exposição do ativo), correção e verificação. Falhas conhecidas publicamente recebem um identificador **CVE**.\n\n**Incidentes** (ciclo do NIST SP 800-61): preparação; detecção e análise; contenção, erradicação e recuperação; lições aprendidas. A equipe dedicada é o **CSIRT** (ou ETIR).',
      check: {
        kind: 'order',
        id: 'ge-c',
        prompt: 'Ordene o ciclo de resposta a incidentes.',
        items: ['Preparação', 'Detecção e análise', 'Contenção', 'Erradicação', 'Recuperação', 'Lições aprendidas'],
        why: 'É a sequência descrita no NIST SP 800-61.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **incêndio**: ter extintores (preparação), perceber a fumaça (detecção), fechar as portas para não espalhar (contenção), apagar o fogo (erradicação), voltar a usar o prédio (recuperação) e mudar o que falhou (lições aprendidas).',
        check: {
          kind: 'sort',
          id: 'ge-r',
          prompt: 'Ligue cada sigla ao significado.',
          categories: ['CVE', 'CVSS', 'CSIRT'],
          items: [
            { text: 'Identificador de falha conhecida publicamente', cat: 0, why: 'Cada falha pública tem um.' },
            { text: 'Pontuação usada para priorizar vulnerabilidades', cat: 1, why: 'Ajuda a decidir o que corrigir primeiro.' },
            { text: 'Equipe de tratamento e resposta a incidentes', cat: 2, why: 'Também chamada de ETIR.' },
          ],
        },
      },
    },
    {
      id: 'classificacao',
      part: 'Classificação',
      title: 'Classificar a informação e a LAI',
      goal: 'Saber para que serve classificar e os graus e prazos da LAI.',
      explain:
        '**Classificar** é atribuir um nível de sensibilidade para definir quem acessa e como a informação é protegida. Cada organização define seus níveis (por exemplo: pública, interna, restrita, confidencial).\n\nNo setor público, a **LAI** (Lei nº 12.527/2011) prevê três graus de sigilo:\n\n| Grau | Prazo máximo |\n|---|---|\n| Reservada | 5 anos |\n| Secreta | 15 anos |\n| Ultrassecreta | 25 anos |\n\nNa LAI, a regra é a **publicidade**; o sigilo é exceção. Dados pessoais seguem também a LGPD.',
      check: {
        kind: 'choice',
        id: 'cl-c',
        prompt: 'Pela LAI, qual é o prazo máximo de restrição para informação secreta?',
        options: [
          { text: '15 anos', why: 'Isso.' },
          { text: '5 anos', why: '5 anos é o prazo da reservada.' },
          { text: '25 anos', why: '25 anos é o prazo da ultrassecreta.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Os prazos sobem de **10 em 10** a partir de 5: **reservada 5**, **secreta 15**, **ultrassecreta 25**. E lembre: na LAI, **publicar é a regra**; classificar como sigilosa é a exceção.',
        check: {
          kind: 'sort',
          id: 'cl-r',
          prompt: 'Ligue cada grau ao prazo máximo.',
          categories: ['5 anos', '15 anos', '25 anos'],
          items: [
            { text: 'Reservada', cat: 0, why: 'Grau mais baixo.' },
            { text: 'Secreta', cat: 1, why: 'Grau intermediário.' },
            { text: 'Ultrassecreta', cat: 2, why: 'Grau mais alto.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Vulnerabilidade: fraqueza que pode ser explorada', 'Ameaça: causa potencial de um incidente', 'Contratar seguro é mitigar o risco'],
      bug: 2,
      why: 'Seguro é transferir: passa parte das consequências a terceiros.',
      fixed: 'Contratar seguro é transferir o risco',
      errorKind: 'confusao',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Marque as afirmações corretas.',
      options: [
        { text: 'A tríade CID é confidencialidade, integridade e disponibilidade', correct: true, why: 'Os três primeiros princípios.' },
        { text: 'Na LAI, o sigilo é a regra e a publicidade, a exceção', correct: false, why: 'É o contrário: a regra é a publicidade.' },
        { text: 'Sem vulnerabilidade, a ameaça não tem por onde agir', correct: true, why: 'O risco depende das duas.' },
        { text: 'Incidente é a possibilidade de algo dar errado', correct: false, why: 'Isso é risco; incidente é o que de fato aconteceu.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Um serviço antigo, que ninguém usa, está exposto à internet com falhas conhecidas. Qual tratamento é mais adequado?',
      scenarios: [
        { title: 'Opção A', body: 'Aceitar o risco e manter o serviço como está.' },
        { title: 'Opção B', body: 'Desativar o serviço desnecessário.' },
      ],
      answer: 1,
      why: 'Se a atividade não é necessária, evitar o risco eliminando-a é o mais adequado.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: o atacante já entrou num servidor, e a equipe isola a máquina da rede para o problema não se espalhar. Que fase do ciclo de incidentes é essa?',
      options: [
        { text: 'Contenção', why: 'Isso: impedir que se espalhe.' },
        { text: 'Lições aprendidas', why: 'Essa é a última fase, depois de tudo resolvido.' },
        { text: 'Preparação', why: 'A preparação vem antes do incidente.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.002' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.003' },
  ],
  summary: [
    'Princípios: confidencialidade, integridade, disponibilidade (tríade CID), autenticidade e não repúdio.',
    'Ativo (valor), vulnerabilidade (fraqueza), ameaça (causa potencial).',
    'Risco = probabilidade × impacto; incidente é o que de fato ocorreu; controle reduz o risco.',
    'Tratar: mitigar, transferir (seguro), evitar (eliminar a atividade), aceitar.',
    'Risco residual: o que sobra; a gestão aceita e registra.',
    'Vulnerabilidades: inventário, varredura, CVSS, correção; falhas públicas têm CVE. Incidentes: ciclo do NIST SP 800-61, CSIRT.',
    'LAI: reservada 5, secreta 15, ultrassecreta 25 anos. Publicidade é a regra.',
  ],
};
