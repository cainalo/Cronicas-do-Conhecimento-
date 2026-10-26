// Microaula "Backup e continuidade" (cap.seg.02, seção continuidade), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto
// do capítulo (cap02-defesa/05-continuidade.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegContinuidade: MicroLesson = {
  id: 'micro.seg.continuidade',
  chapterId: 'cap.seg.02',
  sectionId: 'continuidade',
  title: 'Backup e continuidade',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O órgão faz backup toda noite há anos, mas nunca tentou restaurar. Um dia o servidor falha. O que pode dar errado?',
    options: [
      { text: 'Descobrir só agora que as cópias não restauram', why: 'Isso. Backup que nunca foi restaurado em teste não é garantia.' },
      { text: 'Nada: se o backup rodou, a restauração funciona', why: 'Rodar a cópia não prova que ela restaura. Só o teste prova.' },
      { text: 'O backup ocupar espaço demais', why: 'Espaço é detalhe. O risco grave é a cópia não restaurar.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'tipos',
      part: 'Backup',
      title: 'Completo, incremental e diferencial',
      goal: 'Saber o que cada tipo de backup copia.',
      explain:
        '| Tipo | Copia |\n|---|---|\n| **Completo** (*full*) | **Todos** os dados |\n| **Incremental** | O que mudou desde o **último backup de qualquer tipo** |\n| **Diferencial** | O que mudou desde o **último backup completo** |',
      check: {
        kind: 'choice',
        id: 'ti-c',
        prompt: 'O backup diferencial copia o que mudou desde:',
        options: [
          { text: 'O último backup completo', why: 'Isso.' },
          { text: 'O último backup de qualquer tipo', why: 'Esse é o incremental.' },
          { text: 'O primeiro backup já feito', why: 'A referência é o último completo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **fotos de uma obra**. O **completo** é a foto da casa inteira. O **incremental** registra só o que mudou **desde a foto de ontem**, seja ela qual for. O **diferencial** registra tudo o que mudou **desde a última foto da casa inteira**.',
        check: {
          kind: 'sort',
          id: 'ti-r',
          prompt: 'Classifique.',
          categories: ['Completo', 'Incremental', 'Diferencial'],
          items: [
            { text: 'Copia tudo', cat: 0, why: 'Todos os dados.' },
            { text: 'Copia o que mudou desde o backup de ontem, qualquer que tenha sido', cat: 1, why: 'Último de qualquer tipo.' },
            { text: 'Copia o que mudou desde o último completo', cat: 2, why: 'Referência no completo.' },
          ],
        },
      },
    },
    {
      id: 'restaurar',
      part: 'Backup',
      title: 'O que é preciso para restaurar',
      goal: 'Saber quais conjuntos são necessários para restaurar em cada estratégia.',
      explain:
        '| Tipo | Restauração |\n|---|---|\n| Completo | Só o **último completo** |\n| Incremental | Último completo **mais todos** os incrementais seguintes, **em ordem** |\n| Diferencial | Último completo **mais o último** diferencial |\n\nO incremental é o **mais rápido e menor** de fazer, mas restaura com mais trabalho. O diferencial **cresce** a cada dia, mas restaura com **só dois** conjuntos.',
      example: 'Completo no domingo, incrementais de segunda a sábado. Para restaurar a quinta à noite: o **completo de domingo** e os incrementais de **segunda, terça, quarta e quinta**, nessa ordem.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Completo no domingo e diferenciais de segunda a sábado. Para restaurar a quinta à noite, são necessários:',
        options: [
          { text: 'O completo de domingo e o diferencial de quinta', why: 'Isso: o último diferencial já contém tudo desde o completo.' },
          { text: 'O completo de domingo e todos os diferenciais de segunda a quinta', why: 'Isso seria com incrementais. No diferencial, basta o último.' },
          { text: 'Só o diferencial de quinta', why: 'O diferencial precisa do completo como base.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Cada **incremental** é um **degrau**: para chegar a quinta, sobe-se todos, um a um, desde o completo. O **diferencial** é um **elevador**: do completo, vai direto ao último dia. Por isso o incremental exige a corrente toda, e o diferencial, só dois conjuntos.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Completo no domingo e incrementais de segunda a sábado. Para restaurar a quarta à noite:',
          options: [
            { text: 'Completo de domingo e incrementais de segunda, terça e quarta, em ordem', why: 'Isso.' },
            { text: 'Completo de domingo e só o incremental de quarta', why: 'No incremental, precisa de todos desde o completo.' },
            { text: 'Só os incrementais', why: 'Falta o completo como base.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'regra-321',
      part: 'Backup',
      title: 'A regra 3-2-1',
      goal: 'Aplicar a regra 3-2-1 e o reforço contra ransomware.',
      explain:
        'A **regra 3-2-1**: **3** cópias dos dados, em **2** tipos de mídia diferentes, sendo **1** fora do local (*offsite*).\n\nContra **ransomware**, acrescenta-se uma cópia **imutável ou desconectada**.\n\nBackup que **nunca foi restaurado em teste** não é garantia.',
      check: {
        kind: 'choice',
        id: 'r3-c',
        prompt: 'O que significa a regra 3-2-1?',
        options: [
          { text: '3 cópias, em 2 tipos de mídia, 1 fora do local', why: 'Isso.' },
          { text: '3 backups por dia, 2 por semana, 1 por mês', why: 'A regra fala de cópias, mídias e local.' },
          { text: '3 servidores, 2 redes, 1 firewall', why: 'A regra é sobre cópias de segurança.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Conte de cima para baixo. **3**: os dados existem em três cópias. **2**: em dois tipos de mídia diferentes, para uma falha de mídia não levar tudo. **1**: uma cópia longe, para um incêndio ou enchente no prédio não levar tudo.',
        check: {
          kind: 'choice',
          id: 'r3-r',
          prompt: 'O órgão tem 3 cópias, todas em discos na mesma sala. O que falta para cumprir a 3-2-1?',
          options: [
            { text: 'Outro tipo de mídia e uma cópia fora do local', why: 'Isso: faltam o "2" e o "1".' },
            { text: 'Nada: já são 3 cópias', why: 'Três cópias na mesma sala e mídia não bastam.' },
            { text: 'Só mais uma cópia na mesma sala', why: 'Faltam outra mídia e uma cópia fora do local.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'bia-planos',
      part: 'Continuidade',
      title: 'BIA, PCN e PRD',
      goal: 'Diferenciar BIA, PCN e PRD.',
      explain:
        '| Conceito | Significado |\n|---|---|\n| **BIA** (análise de impacto nos negócios) | Identifica processos **críticos**, impactos da parada e prazos toleráveis; é a **base** dos planos |\n| **PCN** (plano de continuidade de negócios) | Como a organização **continua operando** durante a crise (pessoas, processos, comunicação) |\n| **PRD** (plano de recuperação de desastres) | Como **restaurar a TI** após o desastre |\n\nA norma de referência para continuidade é a **ISO 22301**.',
      check: {
        kind: 'choice',
        id: 'bp-c',
        prompt: 'A análise que identifica os processos críticos, o impacto da interrupção e os prazos toleráveis, base dos planos, é a:',
        options: [
          { text: 'BIA', why: 'Isso.' },
          { text: 'PRD', why: 'O PRD é o plano de restaurar a TI, feito com base na BIA.' },
          { text: 'PCN', why: 'O PCN diz como continuar operando; ele se apoia na BIA.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Primeiro se **descobre o que importa** (BIA). Depois se planeja **como continuar trabalhando** na crise (PCN) e **como reerguer os sistemas** (PRD). A BIA vem antes porque os planos dependem dela.',
        check: {
          kind: 'sort',
          id: 'bp-r',
          prompt: 'Classifique.',
          categories: ['BIA', 'PCN', 'PRD'],
          items: [
            { text: 'Descobrir que a folha de pagamento não pode parar mais de um dia', cat: 0, why: 'Processo crítico e prazo tolerável.' },
            { text: 'Equipe trabalha de outro prédio e avisa os jurisdicionados', cat: 1, why: 'Continuar operando.' },
            { text: 'Passo a passo para reerguer os servidores', cat: 2, why: 'Restaurar a TI.' },
          ],
        },
      },
    },
    {
      id: 'rto-rpo',
      part: 'Continuidade',
      title: 'RTO e RPO',
      goal: 'Diferenciar RTO de RPO.',
      explain:
        '| Sigla | Significado |\n|---|---|\n| **RTO** | **Tempo** máximo para o serviço **voltar** |\n| **RPO** | **Perda máxima de dados** tolerável, medida em tempo; orienta a **frequência de backup** |',
      check: {
        kind: 'choice',
        id: 'rr-c',
        prompt: 'A gestão diz: "podemos perder no máximo 1 hora de dados". Isso define o:',
        options: [
          { text: 'RPO', why: 'Isso: perda de dados tolerável, medida em tempo.' },
          { text: 'RTO', why: 'O RTO é o tempo para o serviço voltar.' },
          { text: 'BIA', why: 'A BIA é a análise; o número é o RPO.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Olhe para a linha do tempo a partir da falha. **Para trás** é o **RPO**: até onde os dados podem se perder (com RPO de 1 hora, é preciso backup pelo menos a cada hora). **Para frente** é o **RTO**: em quanto tempo o serviço precisa voltar.',
        check: {
          kind: 'sort',
          id: 'rr-r',
          prompt: 'RTO ou RPO?',
          categories: ['RTO', 'RPO'],
          items: [
            { text: 'O portal precisa voltar em até 4 horas', cat: 0, why: 'Tempo para voltar.' },
            { text: 'Aceita-se perder no máximo 15 minutos de dados', cat: 1, why: 'Perda de dados.' },
            { text: 'Define de quanto em quanto tempo fazer backup', cat: 1, why: 'O RPO orienta a frequência.' },
          ],
        },
      },
    },
    {
      id: 'sitios',
      part: 'Continuidade',
      title: 'Sítios quente, morno e frio',
      goal: 'Comparar os sítios de contingência em tempo e custo.',
      explain:
        '- **Quente** (*hot site*): pronto em **minutos ou horas**, com dados replicados. **Mais caro**.\n- **Morno** (*warm site*): infraestrutura **parcial**; leva **horas ou dias**.\n- **Frio** (*cold site*): só **espaço e energia**; leva **dias ou semanas**. **Mais barato**.',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'O sistema de pagamentos tem RTO de 1 hora. Que sítio de contingência atende?',
        options: [
          { text: 'Quente', why: 'Isso: assume em minutos ou horas, com dados replicados.' },
          { text: 'Frio', why: 'O frio leva dias ou semanas.' },
          { text: 'Morno', why: 'O morno leva horas ou dias; para 1 hora, é preciso o quente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **restaurante reserva**. **Quente**: cozinha montada e comida pronta, abre na hora (caro). **Morno**: cozinha montada, falta abastecer. **Frio**: só o salão vazio com luz (barato e demorado).',
        check: {
          kind: 'order',
          id: 'si-r',
          prompt: 'Ordene do sítio que assume MAIS RÁPIDO ao mais lento.',
          items: ['Quente', 'Morno', 'Frio'],
          why: 'Quente em minutos ou horas, morno em horas ou dias, frio em dias ou semanas.',
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
      lines: ['Diferencial: último completo + último diferencial', 'RTO: tempo máximo para o serviço voltar', 'Incremental: último completo + último incremental'],
      bug: 2,
      why: 'No incremental, são necessários todos os incrementais desde o completo, em ordem.',
      fixed: 'Incremental: último completo + todos os incrementais seguintes, em ordem',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Contra ransomware, qual estratégia de cópias é melhor?',
      scenarios: [
        { title: 'Estratégia A', body: '3-2-1, com uma cópia imutável ou desconectada e restaurações testadas.' },
        { title: 'Estratégia B', body: 'Uma cópia diária numa pasta de rede sempre conectada, nunca testada.' },
      ],
      answer: 0,
      why: 'A cópia sempre conectada pode ser cifrada junto, e backup nunca testado não é garantia.',
      errorKind: 'conceito',
    },
    {
      kind: 'multi',
      id: 'cons-3',
      prompt: 'Marque as afirmações corretas.',
      options: [
        { text: 'O RPO orienta a frequência de backup', correct: true, why: 'Perda tolerável de dados.' },
        { text: 'O sítio frio é o mais barato e o mais lento', correct: true, why: 'Só espaço e energia.' },
        { text: 'A BIA é feita depois dos planos de continuidade', correct: false, why: 'A BIA é a base dos planos: vem antes.' },
        { text: 'A ISO 22301 é a referência para gestão de continuidade', correct: true, why: 'Norma citada no capítulo.' },
      ],
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: a gestão aceita que o sistema de protocolo fique fora até 3 dias, e o orçamento é curto. Que sítio de contingência é o mais adequado?',
      options: [
        { text: 'Morno', why: 'Isso: infraestrutura parcial, volta em horas ou dias, custo intermediário.' },
        { text: 'Quente', why: 'Atenderia, mas é o mais caro, e o prazo de 3 dias não exige tanto.' },
        { text: 'Nenhum: basta o backup', why: 'Sem sítio, não há onde rodar o sistema enquanto o principal está fora.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.017' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.018' },
  ],
  summary: [
    'Completo (tudo), incremental (desde o último de qualquer tipo), diferencial (desde o último completo).',
    'Restaurar: incremental exige o completo e todos os incrementais em ordem; diferencial, o completo e o último diferencial.',
    'Regra 3-2-1: 3 cópias, 2 mídias, 1 fora do local; mais uma imutável ou desconectada contra ransomware.',
    'Backup nunca restaurado em teste não é garantia.',
    'BIA (base dos planos), PCN (continuar operando), PRD (restaurar a TI). ISO 22301.',
    'RTO: tempo para voltar. RPO: perda de dados tolerável; orienta a frequência de backup.',
    'Sítio quente (rápido, caro), morno (parcial), frio (só espaço e energia, barato e lento).',
  ],
};
