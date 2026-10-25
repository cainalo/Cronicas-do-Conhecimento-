// Microaula "Ameaças, detecção e testes" (cap.seg.02, seção ameacas), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto
// do capítulo (cap02-defesa/04-ameacas.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegAmeacas: MicroLesson = {
  id: 'micro.seg.ameacas',
  chapterId: 'cap.seg.02',
  sectionId: 'ameacas',
  title: 'Ameaças, detecção e testes',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Chega um e-mail "do suporte de TI" pedindo sua senha com urgência, para "evitar o bloqueio da conta". O que o atacante está explorando?',
    options: [
      { text: 'A confiança e a pressa de quem lê', why: 'Isso. É engenharia social: não explora uma falha técnica, explora as pessoas.' },
      { text: 'Uma falha no servidor de e-mail', why: 'O e-mail chegou normalmente. O golpe está em convencer a pessoa.' },
      { text: 'Nada: o suporte pode pedir senha', why: 'Pedido incomum e urgente é sinal de golpe. Confirme por outro canal.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'malware-a',
      part: 'Malware',
      title: 'Vírus, worm e cavalo de Troia',
      goal: 'Diferenciar vírus, worm e cavalo de Troia.',
      explain:
        '| Tipo | O que o define |\n|---|---|\n| **Vírus** | Insere-se em arquivos ou programas **hospedeiros** e depende da execução deles para se propagar |\n| **Worm** | Propaga-se **sozinho** pela rede, explorando vulnerabilidades, **sem hospedeiro** |\n| **Cavalo de Troia** | **Parece legítimo**, mas executa ações maliciosas ocultas |',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'Que código malicioso se propaga automaticamente pela rede, sem precisar de arquivo hospedeiro?',
        options: [
          { text: 'Worm', why: 'Isso.' },
          { text: 'Vírus', why: 'O vírus precisa de hospedeiro.' },
          { text: 'Cavalo de Troia', why: 'O cavalo de Troia se disfarça de programa legítimo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **como chega**. O **vírus** pega carona em outro arquivo e espera alguém abrir. O **worm** anda **sozinho** de máquina em máquina. O **cavalo de Troia** é o **presente** que parece bom, mas traz o inimigo dentro.',
        check: {
          kind: 'sort',
          id: 'ma-r',
          prompt: 'Classifique.',
          categories: ['Vírus', 'Worm', 'Cavalo de Troia'],
          items: [
            { text: 'Gruda num documento e age quando ele é aberto', cat: 0, why: 'Depende do hospedeiro.' },
            { text: 'Espalha-se pela rede sozinho, por uma falha', cat: 1, why: 'Sem hospedeiro.' },
            { text: 'Um "editor de PDF grátis" que rouba dados', cat: 2, why: 'Parece legítimo.' },
          ],
        },
      },
    },
    {
      id: 'malware-b',
      part: 'Malware',
      title: 'Ransomware, spyware, rootkit, backdoor e botnet',
      goal: 'Reconhecer os demais tipos de malware.',
      explain:
        '| Tipo | O que o define |\n|---|---|\n| **Ransomware** | Cifra os dados (ou ameaça divulgá-los) e exige **resgate** |\n| **Spyware** | Coleta informações sem consentimento; *keyloggers* registram o que é digitado |\n| **Rootkit** | **Esconde** a presença do invasor e de outros malwares |\n| **Backdoor** | Abre **acesso remoto escondido** para o atacante voltar |\n| **Bot/botnet** | Máquina controlada remotamente; em conjunto, usadas em **DDoS** |',
      check: {
        kind: 'sort',
        id: 'mb-c',
        prompt: 'Classifique.',
        categories: ['Ransomware', 'Rootkit', 'Botnet'],
        items: [
          { text: 'Arquivos cifrados e pedido de pagamento', cat: 0, why: 'Exige resgate.' },
          { text: 'Esconde o invasor do antivírus e do administrador', cat: 1, why: 'Oculta a presença.' },
          { text: 'Milhares de máquinas atacando um site ao mesmo tempo', cat: 2, why: 'DDoS por máquinas controladas.' },
        ],
      },
      recovery: {
        explain: 'Pense no **objetivo** de cada um. **Ransomware**: dinheiro (sequestro). **Spyware**: espiar. **Rootkit**: se esconder. **Backdoor**: voltar depois. **Botnet**: um exército de máquinas.',
        check: {
          kind: 'choice',
          id: 'mb-r',
          prompt: 'Um programa registra tudo o que o usuário digita, inclusive senhas. É:',
          options: [
            { text: 'Spyware (keylogger)', why: 'Isso.' },
            { text: 'Ransomware', why: 'O ransomware cifra e pede resgate.' },
            { text: 'Backdoor', why: 'O backdoor abre acesso remoto escondido.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ransom',
      part: 'Malware',
      title: 'A defesa decisiva contra ransomware',
      goal: 'Saber qual é a defesa decisiva contra ransomware.',
      explain:
        'Contra **ransomware**, a defesa **decisiva** é ter **cópias de segurança isoladas** (fora de linha ou imutáveis) **e testadas**.\n\nCompletam: **atualizações**, **menor privilégio** e **segmentação**.',
      check: {
        kind: 'choice',
        id: 'ra-c',
        prompt: 'Qual é a defesa decisiva contra ransomware?',
        options: [
          { text: 'Backups isolados (fora de linha ou imutáveis) e testados', why: 'Isso.' },
          { text: 'Backup numa pasta de rede sempre conectada', why: 'Se está sempre conectada, o ransomware pode cifrá-la também.' },
          { text: 'Pagar o resgate rapidamente', why: 'A defesa é ter como restaurar sem depender do atacante.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O ransomware tranca **tudo o que alcança**. Uma cópia **ao alcance** dele também será trancada. Por isso a cópia precisa estar **isolada** (desconectada, ou num local que não pode ser alterado) e **testada**: cópia que nunca foi restaurada pode não funcionar na hora.',
        check: {
          kind: 'tf',
          id: 'ra-r',
          prompt: 'Uma cópia de segurança gravada numa unidade de rede sempre conectada protege bem contra ransomware.',
          answer: false,
          why: 'Falso. O ransomware pode cifrá-la também. A cópia precisa ser isolada.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'phishing',
      part: 'Engenharia social',
      title: 'Phishing e suas variações',
      goal: 'Diferenciar phishing, spear phishing, whaling, smishing, vishing e pretexting.',
      explain:
        'A **engenharia social** explora a confiança e a pressa das pessoas.\n\n- **Phishing**: mensagem falsa que induz a clicar, dar senha ou baixar anexo.\n- **Spear phishing**: **direcionado**, com informações personalizadas.\n- **Whaling**: spear phishing contra **altos dirigentes**.\n- **Smishing** e **vishing**: por **SMS** e por **voz**.\n- **Pretexting**: o atacante cria uma **história** (técnico, fornecedor).',
      check: {
        kind: 'choice',
        id: 'ph-c',
        prompt: 'Um e-mail com nome e cargo do destinatário foi enviado só ao diretor financeiro, pedindo pagamento urgente de uma fatura falsa. É:',
        options: [
          { text: 'Spear phishing (e, por mirar um alto dirigente, whaling)', why: 'Isso: direcionado e personalizado, contra a alta gestão.' },
          { text: 'Vishing', why: 'Vishing é por voz; aqui foi e-mail.' },
          { text: 'Worm', why: 'Worm é malware que se propaga sozinho.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **pescaria**. **Phishing** joga a rede para muitos. **Spear** (arpão) mira **um** peixe, com isca personalizada. **Whaling** mira a **baleia**: o alto dirigente. Mude o canal e muda o nome: **S**MS é **smishing**, **v**oz é **vishing**.',
        check: {
          kind: 'sort',
          id: 'ph-r',
          prompt: 'Classifique.',
          categories: ['Smishing', 'Vishing', 'Pretexting'],
          items: [
            { text: 'SMS falso "do banco" com um link', cat: 0, why: 'Por SMS.' },
            { text: 'Ligação "do suporte" pedindo a senha', cat: 1, why: 'Por voz.' },
            { text: 'Alguém se diz técnico do fornecedor e inventa um chamado', cat: 2, why: 'Cria uma história.' },
          ],
        },
      },
    },
    {
      id: 'defesas-social',
      part: 'Engenharia social',
      title: 'Como se defender',
      goal: 'Escolher defesas contra engenharia social.',
      explain:
        'Defesas:\n\n- **conscientização contínua**;\n- **MFA**: uma senha roubada deixa de bastar;\n- **verificação por outro canal** antes de atender pedidos incomuns;\n- filtros de e-mail com **SPF, DKIM e DMARC**.',
      check: {
        kind: 'choice',
        id: 'ds-c',
        prompt: 'Por que o MFA ajuda contra phishing?',
        options: [
          { text: 'Porque uma senha roubada deixa de bastar para entrar', why: 'Isso.' },
          { text: 'Porque impede o e-mail falso de chegar', why: 'Quem filtra e-mail são SPF, DKIM e DMARC; o MFA age no login.' },
          { text: 'Porque cifra a mensagem', why: 'O MFA é sobre provar identidade, não cifrar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **camadas**. Antes do e-mail chegar: filtros (**SPF, DKIM, DMARC**). Na cabeça de quem lê: **conscientização** e o hábito de **confirmar por outro canal**. Se mesmo assim a senha vazar: o **MFA** pede uma segunda prova que o golpista não tem.',
        check: {
          kind: 'multi',
          id: 'ds-r',
          prompt: 'Quais são defesas contra engenharia social? Marque todas.',
          options: [
            { text: 'Ligar de volta, por outro canal, antes de atender pedido incomum', correct: true, why: 'Verificação por outro canal.' },
            { text: 'Filtros de e-mail com SPF, DKIM e DMARC', correct: true, why: 'Barram mensagens falsas.' },
            { text: 'Responder rápido para não atrasar o trabalho', correct: false, why: 'A pressa é justamente o que o golpista explora.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'ids-ips',
      part: 'Detecção',
      title: 'IDS detecta, IPS bloqueia',
      goal: 'Diferenciar IDS de IPS e saber o papel de firewall e EDR.',
      explain:
        '| Controle | Função |\n|---|---|\n| **Firewall** | Filtra o tráfego por regras |\n| **Antivírus / EDR** | Detecta malware no dispositivo; o EDR acrescenta monitoramento de comportamento e resposta |\n| **IDS** | **Detecta e alerta**; recebe uma **cópia** do tráfego e não bloqueia |\n| **IPS** | Fica **no caminho** (*inline*) e **bloqueia** o ataque |',
      check: {
        kind: 'choice',
        id: 'ii-c',
        prompt: 'Sobre IDS e IPS, é correto:',
        options: [
          { text: 'O IDS detecta e alerta; o IPS fica no caminho e bloqueia', why: 'Isso.' },
          { text: 'O IDS bloqueia; o IPS só alerta', why: 'Invertido.' },
          { text: 'Os dois são a mesma coisa', why: 'A diferença é bloquear ou não.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O **IDS** é a **câmera**: vê uma cópia do que passa e avisa. O **IPS** é o **segurança na porta**: está no caminho e barra quem é suspeito. A letra ajuda: **D**etecção e **P**revenção.',
        check: {
          kind: 'choice',
          id: 'ii-r',
          prompt: 'Um equipamento recebe uma cópia do tráfego e envia alertas, sem bloquear nada. É um:',
          options: [
            { text: 'IDS', why: 'Isso.' },
            { text: 'IPS', why: 'O IPS fica no caminho e bloqueia.' },
            { text: 'EDR', why: 'O EDR age no dispositivo, não numa cópia do tráfego.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'deteccao',
      part: 'Detecção',
      title: 'Assinatura, anomalia e falsos alarmes',
      goal: 'Comparar detecção por assinatura e por anomalia, e entender falsos positivos e negativos.',
      explain:
        '- **Por assinatura**: compara com padrões **conhecidos**. Preciso para o conhecido, **cego para o novo**.\n- **Por anomalia**: aprende o normal e alerta sobre desvios. **Detecta ataques novos**, mas gera **mais falsos positivos**.\n\n**Falso positivo**: alerta para algo legítimo. **Falso negativo**: ataque que passou **sem alerta** (o mais perigoso).\n\nUm **SIEM** centraliza e correlaciona registros de várias fontes.',
      check: {
        kind: 'choice',
        id: 'dt-c',
        prompt: 'Um ataque totalmente novo, nunca visto antes, tem mais chance de ser detectado por qual método?',
        options: [
          { text: 'Por anomalia', why: 'Isso: alerta sobre o que foge do normal.' },
          { text: 'Por assinatura', why: 'A assinatura só reconhece padrões já conhecidos.' },
          { text: 'Nenhum dos dois detecta nada novo', why: 'A detecção por anomalia pode detectar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A **assinatura** é uma lista de **procurados**: reconhece bem quem está na lista, mas não um rosto novo. A **anomalia** observa o **comportamento**: estranha quem age diferente, mesmo sem ficha, mas às vezes estranha gente inocente (falso positivo). O pior erro é o **falso negativo**: o ataque passou e ninguém soube.',
        check: {
          kind: 'sort',
          id: 'dt-r',
          prompt: 'Classifique.',
          categories: ['Falso positivo', 'Falso negativo'],
          items: [
            { text: 'Backup noturno legítimo gerou alerta de ataque', cat: 0, why: 'Alerta para algo legítimo.' },
            { text: 'Invasor copiou dados e nenhum alerta disparou', cat: 1, why: 'Ataque sem alerta.' },
          ],
        },
      },
    },
    {
      id: 'pentest',
      part: 'Testes',
      title: 'Análise de vulnerabilidades e pentest',
      goal: 'Diferenciar análise de vulnerabilidades de teste de invasão e os tipos de caixa.',
      explain:
        '| | Análise de vulnerabilidades | Pentest |\n|---|---|---|\n| Objetivo | **Listar** falhas conhecidas, em amplitude | **Explorar** falhas para mostrar o impacto real |\n| Forma | Em geral **automatizada** | **Manual** e criativa |\n\nInformação dada ao testador:\n\n- **Caixa preta**: nenhuma, como atacante externo;\n- **Caixa cinza**: **parcial** (por exemplo, uma conta comum);\n- **Caixa branca**: código, arquitetura e credenciais.\n\nTodo pentest exige **autorização formal** e escopo; sem isso, é ataque.',
      check: {
        kind: 'choice',
        id: 'pt-c',
        prompt: 'Num teste de invasão do tipo caixa cinza, o testador:',
        options: [
          { text: 'Tem conhecimento parcial, como uma conta de usuário comum', why: 'Isso.' },
          { text: 'Não recebe informação nenhuma', why: 'Essa é a caixa preta.' },
          { text: 'Recebe código, arquitetura e credenciais', why: 'Essa é a caixa branca.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **quanto se vê dentro da caixa**. **Preta**: nada, como quem chega de fora. **Branca**: tudo, código e senhas. **Cinza**: um pouco, como um funcionário comum. E não importa a cor: **sem autorização por escrito**, é crime, não teste.',
        check: {
          kind: 'sort',
          id: 'pt-r',
          prompt: 'Análise de vulnerabilidades ou pentest?',
          categories: ['Análise de vulnerabilidades', 'Pentest'],
          items: [
            { text: 'Varredor automático lista falhas conhecidas', cat: 0, why: 'Amplitude, automatizado.' },
            { text: 'Especialista explora uma falha e mostra até onde chega', cat: 1, why: 'Demonstra o impacto real.' },
            { text: 'Resultado: lista priorizada de vulnerabilidades', cat: 0, why: 'Produto da análise.' },
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
      lines: ['Worm: propaga-se sozinho pela rede', 'IPS: fica no caminho e bloqueia', 'Falso positivo: ataque que passou sem alerta'],
      bug: 2,
      why: 'Ataque que passou sem alerta é o falso negativo. Falso positivo é alerta para algo legítimo.',
      fixed: 'Falso negativo: ataque que passou sem alerta',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O órgão quer saber até onde um invasor chegaria explorando as falhas reais. O que contratar?',
      scenarios: [
        { title: 'Opção A', body: 'Uma varredura automatizada que lista falhas conhecidas.' },
        { title: 'Opção B', body: 'Um teste de invasão com autorização formal e escopo definido.' },
      ],
      answer: 1,
      why: 'O pentest explora as falhas e demonstra o impacto real; a varredura só lista.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: o servidor de arquivos amanheceu com tudo cifrado e um bilhete pedindo pagamento. Qual medida permite voltar sem pagar?',
      options: [
        { text: 'Restaurar das cópias isoladas e testadas', why: 'Isso: a defesa decisiva contra ransomware.' },
        { text: 'Trocar a senha do administrador', why: 'Não devolve os arquivos já cifrados.' },
        { text: 'Instalar um IDS', why: 'O IDS só alerta e chegaria tarde.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-4',
      prompt: 'Classifique cada golpe.',
      categories: ['Phishing', 'Whaling', 'Vishing'],
      items: [
        { text: 'E-mail genérico "sua caixa está cheia" para todo o órgão', cat: 0, why: 'Para muitos.' },
        { text: 'E-mail personalizado para o presidente do Tribunal', cat: 1, why: 'Alto dirigente.' },
        { text: 'Telefonema fingindo ser do banco', cat: 2, why: 'Por voz.' },
      ],
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.013' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.014' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.015' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.016' },
  ],
  summary: [
    'Vírus (hospedeiro), worm (sozinho pela rede), cavalo de Troia (parece legítimo).',
    'Ransomware (resgate), spyware/keylogger (espiona), rootkit (esconde), backdoor (volta), botnet (DDoS).',
    'Contra ransomware: backups isolados e testados; mais atualização, menor privilégio e segmentação.',
    'Phishing, spear (direcionado), whaling (dirigentes), smishing (SMS), vishing (voz), pretexting (história).',
    'Defesas: conscientização, MFA, confirmar por outro canal, SPF/DKIM/DMARC.',
    'IDS detecta e alerta (cópia do tráfego); IPS fica no caminho e bloqueia. SIEM correlaciona registros.',
    'Assinatura: conhecido. Anomalia: detecta o novo, mais falsos positivos. Falso negativo é o pior.',
    'Análise de vulnerabilidades lista; pentest explora. Caixa preta, cinza, branca. Sempre com autorização formal.',
  ],
};
