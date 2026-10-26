// Microaula "Controle de acesso, IAM e Zero Trust" (cap.seg.02, seção acesso), no formato aprovado
// em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do
// texto do capítulo (cap02-defesa/02-acesso.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegAcesso: MicroLesson = {
  id: 'micro.seg.acesso',
  chapterId: 'cap.seg.02',
  sectionId: 'acesso',
  title: 'Controle de acesso, IAM e Zero Trust',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um estagiário entrou no órgão e recebeu acesso de administrador "para não dar trabalho". Qual é o problema?',
    options: [
      { text: 'Ele ganhou muito mais permissão do que a função dele precisa', why: 'Isso. Cada pessoa deve receber só o necessário: é o princípio do menor privilégio.' },
      { text: 'Nenhum: dar acesso amplo evita chamados ao suporte', why: 'Evita chamados, mas multiplica o estrago de um erro ou de uma conta invadida.' },
      { text: 'Só seria problema se ele fosse mal-intencionado', why: 'Um erro honesto, ou uma senha roubada, já causa estrago com tanto acesso.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tres-a',
      part: 'Controle de acesso',
      title: 'Os três "A"',
      goal: 'Diferenciar autenticação, autorização e auditoria.',
      explain:
        '1. **Autenticação**: provar **quem é** (senha, certificado, biometria, MFA).\n2. **Autorização**: decidir **o que pode fazer**.\n3. **Auditoria** (*accounting*): **registrar o que foi feito**, para rastrear e responsabilizar.',
      check: {
        kind: 'sort',
        id: 'ta-c',
        prompt: 'Classifique cada situação.',
        categories: ['Autenticação', 'Autorização', 'Auditoria'],
        items: [
          { text: 'Digitar a senha e o código do celular para entrar', cat: 0, why: 'Prova quem é.' },
          { text: 'O sistema permite ler, mas não editar, o processo', cat: 1, why: 'Decide o que pode.' },
          { text: 'O log mostra quem abriu o processo às 15h', cat: 2, why: 'Registra o que foi feito.' },
        ],
      },
      recovery: {
        explain: 'Pense na **portaria de um prédio**. Mostrar o crachá é **autenticação** (quem é você). Ter acesso só a alguns andares é **autorização** (o que pode). O livro de entrada e saída é a **auditoria** (o que foi feito).',
        check: {
          kind: 'choice',
          id: 'ta-r',
          prompt: 'Um servidor já entrou no sistema, mas tenta abrir um relatório e recebe "acesso negado". Qual "A" agiu?',
          options: [
            { text: 'Autorização', why: 'Isso: ele já provou quem é, mas não pode fazer aquilo.' },
            { text: 'Autenticação', why: 'A autenticação já tinha acontecido ao entrar.' },
            { text: 'Auditoria', why: 'A auditoria registra; quem nega é a autorização.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'principios',
      part: 'Controle de acesso',
      title: 'Menor privilégio e companhia',
      goal: 'Reconhecer menor privilégio, necessidade de conhecer, segregação de funções e negação por padrão.',
      explain:
        '- **Menor privilégio**: só as permissões necessárias à função, pelo tempo necessário.\n- **Necessidade de conhecer**: mesmo com nível adequado, só se acessa o que a tarefa exige.\n- **Segregação de funções**: tarefas críticas divididas para que uma pessoa sozinha não complete uma fraude (quem **cadastra** o pagamento não é quem o **aprova**).\n- **Negação por padrão**: o que não foi permitido é **proibido**.',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'No sistema de pagamentos, quem cadastra uma despesa não pode aprová-la. Que princípio é esse?',
        options: [
          { text: 'Segregação de funções', why: 'Isso: uma pessoa sozinha não completa a fraude.' },
          { text: 'Negação por padrão', why: 'Negação por padrão é proibir o que não foi permitido.' },
          { text: 'Necessidade de conhecer', why: 'Necessidade de conhecer limita o que se acessa, não divide tarefas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Associe cada princípio a uma frase. **Menor privilégio**: "só o que a função precisa". **Necessidade de conhecer**: "só o que esta tarefa precisa". **Segregação**: "um faz, outro aprova". **Negação por padrão**: "se não está liberado, está proibido".',
        check: {
          kind: 'sort',
          id: 'pr-r',
          prompt: 'Ligue cada regra ao princípio.',
          categories: ['Menor privilégio', 'Segregação de funções', 'Negação por padrão'],
          items: [
            { text: 'O analista recebe só as permissões do cargo dele', cat: 0, why: 'Só o necessário.' },
            { text: 'Quem faz o contrato não é quem o homologa', cat: 1, why: 'Tarefa crítica dividida.' },
            { text: 'O firewall bloqueia tudo que não está numa lista de liberações', cat: 2, why: 'Não permitido = proibido.' },
          ],
        },
      },
    },
    {
      id: 'dac-mac',
      part: 'Modelos',
      title: 'DAC e MAC: quem decide',
      goal: 'Diferenciar o controle discricionário do obrigatório.',
      explain:
        '| Modelo | Quem decide | Exemplo |\n|---|---|---|\n| **DAC** (discricionário) | O **dono** do recurso concede acesso a quem quiser | Compartilhar uma pasta com colegas |\n| **MAC** (obrigatório) | O **sistema**, por rótulos de classificação e credenciamento; o usuário não altera | Só quem tem credencial "secreta" lê documento "secreto" |',
      check: {
        kind: 'choice',
        id: 'dm-c',
        prompt: 'Num ambiente militar, só quem tem credencial "secreta" lê documentos "secretos", e nem o autor pode mudar isso. Qual modelo?',
        options: [
          { text: 'MAC', why: 'Isso: o sistema decide por rótulos.' },
          { text: 'DAC', why: 'No DAC o dono decide; aqui nem o autor pode mudar.' },
          { text: 'Nenhum: isso é só autenticação', why: 'É um modelo de controle de acesso, o MAC.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte **quem manda no acesso**. Se é o **dono** ("vou compartilhar minha pasta com você"), é **DAC**, de discrição, à vontade do dono. Se é a **regra do sistema**, por rótulos que ninguém altera, é **MAC**, obrigatório.',
        check: {
          kind: 'choice',
          id: 'dm-r',
          prompt: 'Maria compartilhou a pasta dela com dois colegas. Qual modelo?',
          options: [
            { text: 'DAC', why: 'Isso: a dona decidiu.' },
            { text: 'MAC', why: 'No MAC o usuário não altera os acessos.' },
            { text: 'RBAC', why: 'No RBAC o acesso vem do papel, não da escolha da dona.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'rbac-abac',
      part: 'Modelos',
      title: 'RBAC e ABAC: papéis e atributos',
      goal: 'Diferenciar o controle por papéis do controle por atributos.',
      explain:
        '| Modelo | Quem decide | Exemplo |\n|---|---|---|\n| **RBAC** (papéis) | Permissões atribuídas a **papéis**; usuários recebem papéis | Papel "Auditor" lê processos; papel "Protocolo" os cadastra |\n| **ABAC** (atributos) | Políticas que combinam **atributos** do usuário, do recurso e do contexto | Acesso se setor = auditoria, documento = não sigiloso e horário comercial |',
      check: {
        kind: 'choice',
        id: 'ra-c',
        prompt: 'As permissões estão em perfis como "Auditor" e "Protocolo", e cada usuário recebe um perfil conforme o cargo. Qual modelo?',
        options: [
          { text: 'RBAC', why: 'Isso: permissões nos papéis.' },
          { text: 'ABAC', why: 'O ABAC combina atributos e contexto, como horário e setor.' },
          { text: 'DAC', why: 'No DAC o dono do recurso decide.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No **RBAC** a pergunta é **"qual é o seu papel?"**. No **ABAC** a regra olha **várias características ao mesmo tempo**: o setor de quem pede, o tipo de documento e até o horário. Se a regra tem "e se for horário comercial", é ABAC.',
        check: {
          kind: 'choice',
          id: 'ra-r',
          prompt: 'Regra: "liberar se setor = auditoria, documento não sigiloso e acesso em horário comercial". Qual modelo?',
          options: [
            { text: 'ABAC', why: 'Isso: combina atributos e contexto.' },
            { text: 'RBAC', why: 'O RBAC olha só o papel.' },
            { text: 'MAC', why: 'O MAC usa rótulos de classificação e credenciamento.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'iam',
      part: 'IAM',
      title: 'O ciclo de vida da identidade',
      goal: 'Ordenar o ciclo do IAM e evitar o acúmulo de privilégios.',
      explain:
        'O **IAM** (gestão de identidades e acessos) cobre o ciclo de vida:\n\n1. **Provisionamento**: criar a conta com os papéis certos na admissão.\n2. **Revisão periódica**: confirmar que os acessos ainda fazem sentido (recertificação).\n3. **Mudança de função**: ajustar papéis, **retirando os antigos** (evita o acúmulo de privilégios).\n4. **Desprovisionamento**: revogar tudo no desligamento, **imediatamente**.',
      check: {
        kind: 'order',
        id: 'ia-c',
        prompt: 'Ordene o ciclo de vida da identidade.',
        items: ['Provisionamento', 'Revisão periódica', 'Mudança de função', 'Desprovisionamento'],
        why: 'Criar, revisar, ajustar e, no desligamento, revogar tudo.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **chave de prédio**. Na chegada, recebe as chaves certas. De tempos em tempos, alguém confere se ainda precisa delas. Ao mudar de sala, **devolve** as chaves antigas. Ao sair do órgão, devolve **todas** no mesmo dia.',
        check: {
          kind: 'choice',
          id: 'ia-r',
          prompt: 'Um servidor mudou de setor três vezes e manteve os acessos de todos os setores. Que falha é essa?',
          options: [
            { text: 'Acúmulo de privilégios: os papéis antigos não foram retirados', why: 'Isso.' },
            { text: 'Falha no desprovisionamento', why: 'Desprovisionar é no desligamento; aqui ele só mudou de função.' },
            { text: 'Nenhuma: acessos antigos não fazem mal', why: 'Fazem: ele tem muito mais do que precisa.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'pam',
      part: 'IAM',
      title: 'Contas privilegiadas',
      goal: 'Saber os controles reforçados para administradores.',
      explain:
        'Contas **privilegiadas** (administradores) recebem controle reforçado:\n\n- **PAM** (gestão de acessos privilegiados);\n- **MFA obrigatório**;\n- **sessões gravadas**;\n- **credenciais temporárias**.',
      check: {
        kind: 'multi',
        id: 'pa-c',
        prompt: 'Quais controles reforçados se aplicam às contas de administrador? Marque todos.',
        options: [
          { text: 'MFA obrigatório', correct: true, why: 'Controle reforçado.' },
          { text: 'Sessões gravadas', correct: true, why: 'Permite auditar o que foi feito.' },
          { text: 'Credenciais temporárias', correct: true, why: 'Reduzem a janela de abuso.' },
          { text: 'Senha compartilhada entre a equipe', correct: false, why: 'Impede saber quem fez o quê.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Quem tem a **chave mestra** precisa de mais cuidado: duas provas de identidade (MFA), câmera ligada (sessão gravada) e uma chave que **expira** (credencial temporária). O conjunto dessas práticas é o **PAM**.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'O que significa PAM?',
          options: [
            { text: 'Gestão de acessos privilegiados', why: 'Isso.' },
            { text: 'Política de acesso por modelo', why: 'Não: é a gestão das contas privilegiadas.' },
            { text: 'Ponto de aplicação de mensagens', why: 'Não: é a gestão das contas privilegiadas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'zero-trust',
      part: 'Zero Trust',
      title: 'Nunca confie, sempre verifique',
      goal: 'Contrastar o modelo de perímetro com o Zero Trust.',
      explain:
        'O **Zero Trust** (NIST SP 800-207, 2020): **nenhuma confiança implícita** só por estar "dentro" da rede.\n\n| Perímetro (castelo e fosso) | Zero Trust |\n|---|---|\n| Quem está dentro é confiável | A localização não concede confiança |\n| Defesa concentrada na borda | Cada acesso é autenticado e autorizado |\n| Acesso amplo após a VPN | Acesso por sessão, com menor privilégio |\n| Movimentação lateral fácil | Microssegmentação limita a movimentação |\n\nNão é um produto: é uma **estratégia**.',
      check: {
        kind: 'choice',
        id: 'zt-c',
        prompt: 'A arquitetura Zero Trust caracteriza-se por:',
        options: [
          { text: 'Não dar confiança implícita pela localização na rede, verificando cada acesso', why: 'Isso.' },
          { text: 'Confiar em todos que estão conectados pela VPN', why: 'Esse é o modelo de perímetro.' },
          { text: 'Ser um produto que se instala no firewall', why: 'Zero Trust é uma estratégia, não um produto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **castelo**, passou da ponte, anda por onde quiser. No **Zero Trust**, cada **porta** pede crachá de novo, e o crachá abre só a sala daquela tarefa. Assim, um invasor que entrou não passeia pela rede (menos movimentação lateral).',
        check: {
          kind: 'sort',
          id: 'zt-r',
          prompt: 'Qual modelo?',
          categories: ['Perímetro', 'Zero Trust'],
          items: [
            { text: 'Entrou na VPN, acessa quase tudo', cat: 0, why: 'Acesso amplo após entrar.' },
            { text: 'Cada acesso a cada recurso é verificado', cat: 1, why: 'Nunca confie, sempre verifique.' },
            { text: 'Microssegmentação da rede', cat: 1, why: 'Limita a movimentação lateral.' },
            { text: 'Toda a defesa fica na borda', cat: 0, why: 'Castelo e fosso.' },
          ],
        },
      },
    },
    {
      id: 'componentes',
      part: 'Zero Trust',
      title: 'Motor, administrador e ponto de aplicação',
      goal: 'Diferenciar PE, PA e PEP.',
      explain:
        'Componentes lógicos do NIST SP 800-207:\n\n| Componente | Papel |\n|---|---|\n| **Motor de política** (PE) | **Decide** se concede o acesso, por políticas e sinais (identidade, dispositivo, risco) |\n| **Administrador de política** (PA) | **Executa** a decisão, abrindo ou fechando a sessão |\n| **Ponto de aplicação** (PEP) | Fica **no caminho** entre o usuário e o recurso, **aplicando** a decisão |',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Qual componente fica no caminho entre o usuário e o recurso, aplicando a decisão de permitir ou negar?',
        options: [
          { text: 'O ponto de aplicação de política (PEP)', why: 'Isso.' },
          { text: 'O motor de política (PE)', why: 'O PE decide, mas não fica no caminho.' },
          { text: 'O administrador de política (PA)', why: 'O PA executa a decisão abrindo ou fechando a sessão.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **balada com lista**. O **gerente** que decide quem entra é o motor (PE). Quem **avisa** a porta e libera ou fecha a entrada é o administrador (PA). O **segurança na porta**, entre a fila e o salão, é o ponto de aplicação (PEP).',
        check: {
          kind: 'sort',
          id: 'co-r',
          prompt: 'Ligue cada componente ao papel.',
          categories: ['PE', 'PA', 'PEP'],
          items: [
            { text: 'Decide com base em políticas e sinais', cat: 0, why: 'Motor de política.' },
            { text: 'Abre ou fecha a sessão conforme a decisão', cat: 1, why: 'Administrador de política.' },
            { text: 'Fica entre o usuário e o recurso', cat: 2, why: 'Ponto de aplicação.' },
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
      lines: ['RBAC: permissões em papéis', 'DAC: o dono do recurso decide', 'MAC: o usuário altera os rótulos como quiser'],
      bug: 2,
      why: 'No MAC o sistema decide por rótulos, e o usuário não altera.',
      fixed: 'MAC: o sistema decide por rótulos; o usuário não altera',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Um servidor foi desligado do órgão hoje. Qual procedimento é o correto?',
      scenarios: [
        { title: 'Procedimento A', body: 'Revogar todos os acessos imediatamente.' },
        { title: 'Procedimento B', body: 'Manter a conta ativa até a próxima revisão periódica.' },
      ],
      answer: 0,
      why: 'No desprovisionamento, revoga-se tudo imediatamente, no desligamento.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-3',
      prompt: 'Sobre Zero Trust, marque as corretas.',
      options: [
        { text: 'É descrito no NIST SP 800-207', correct: true, why: 'Publicado em 2020.' },
        { text: 'Estar dentro da rede já garante confiança', correct: false, why: 'É exatamente o que o Zero Trust nega.' },
        { text: 'Combina identidade forte, avaliação do dispositivo, menor privilégio e monitoramento', correct: true, why: 'É uma estratégia.' },
      ],
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: o firewall libera só as portas de uma lista aprovada e bloqueia o resto. Que princípio está em uso?',
      options: [
        { text: 'Negação por padrão', why: 'Isso: o que não foi permitido é proibido.' },
        { text: 'Segregação de funções', why: 'Segregação divide tarefas entre pessoas.' },
        { text: 'Auditoria', why: 'Auditoria registra; aqui o firewall está bloqueando.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.004' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.005' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.006' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.007' },
  ],
  summary: [
    'Três "A": autenticação (quem é), autorização (o que pode), auditoria (o que fez).',
    'Menor privilégio, necessidade de conhecer, segregação de funções (quem cadastra não aprova), negação por padrão.',
    'DAC: o dono decide. MAC: o sistema, por rótulos. RBAC: papéis. ABAC: atributos e contexto.',
    'IAM: provisionamento, revisão periódica, mudança de função (retirar os antigos), desprovisionamento imediato.',
    'Contas privilegiadas: PAM, MFA obrigatório, sessões gravadas, credenciais temporárias.',
    'Zero Trust (NIST SP 800-207): nenhuma confiança implícita pela localização; estratégia, não produto.',
    'PE decide, PA executa, PEP fica no caminho e aplica.',
  ],
};
