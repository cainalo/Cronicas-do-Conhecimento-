// Microaula "Criptografia híbrida e TLS" (cap.seg.01, seção hibrida), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto
// do capítulo (06-hibrida-tls.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegHibrida: MicroLesson = {
  id: 'micro.seg.hibrida',
  chapterId: 'cap.seg.01',
  sectionId: 'hibrida',
  title: 'Criptografia híbrida e TLS',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'A simétrica é rápida, mas tem o problema de entregar a chave. A assimétrica resolve a entrega, mas é lenta. Como juntar o melhor das duas?',
    options: [
      { text: 'Usar a assimétrica só para a chave e a simétrica para os dados', why: 'Isso. É a criptografia híbrida, o que acontece em cada acesso HTTPS.' },
      { text: 'Usar só a assimétrica para tudo', why: 'Ela é lenta demais para grandes volumes de dados.' },
      { text: 'Usar só a simétrica e mandar a chave junto', why: 'Quem interceptasse a chave abriria tudo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'hibrida',
      part: 'Híbrida',
      title: 'Cada família no que faz melhor',
      goal: 'Descrever os três passos da criptografia híbrida e dar exemplos.',
      explain:
        '1. Gera-se uma **chave de sessão simétrica** aleatória.\n2. Os **dados** são cifrados com essa chave simétrica (rápido).\n3. A **chave de sessão** é protegida pela assimétrica: cifrada com a **pública do destinatário** ou combinada por **acordo de chaves** (Diffie-Hellman).\n\nExemplos: **TLS/HTTPS**, **PGP/GPG** e **S/MIME** (e-mail seguro).',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'Numa conexão HTTPS, por que a criptografia é híbrida?',
        options: [
          { text: 'A assimétrica troca a chave de sessão, e a simétrica cifra os dados por ser mais eficiente', why: 'Isso: a formulação típica de prova.' },
          { text: 'A simétrica troca a chave, e a assimétrica cifra os dados', why: 'Invertido: a assimétrica é a lenta, fica só com a chave.' },
          { text: 'Para cifrar os dados duas vezes', why: 'Os dados são cifrados uma vez, com a chave simétrica.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre do **caminhão e do cofre pequeno**: o caminhão (simétrica) leva toda a carga rápido; o cofre (assimétrica) leva só a chave do caminhão em segurança. A chave do caminhão se chama **chave de sessão**.',
        check: {
          kind: 'multi',
          id: 'hi-r',
          prompt: 'Quais usam criptografia híbrida? Marque todos.',
          options: [
            { text: 'TLS/HTTPS', correct: true, why: 'Exemplo clássico.' },
            { text: 'PGP/GPG', correct: true, why: 'E-mail e arquivos.' },
            { text: 'S/MIME', correct: true, why: 'E-mail seguro.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'tls',
      part: 'TLS',
      title: 'TLS, HTTPS e as versões aceitas',
      goal: 'Saber o que é o TLS, a porta do HTTPS e quais versões valem hoje.',
      explain:
        'O **TLS** protege a comunicação entre cliente e servidor. O **HTTPS** é o HTTP sobre TLS, na porta padrão **443**.\n\n| Versão | Situação |\n|---|---|\n| SSL, TLS 1.0, TLS 1.1 | **Obsoletos** |\n| **TLS 1.2** e **TLS 1.3** (RFC 8446) | **Aceitos** hoje |',
      check: {
        kind: 'sort',
        id: 'tl-c',
        prompt: 'Classifique cada versão.',
        categories: ['Obsoleta', 'Aceita'],
        items: [
          { text: 'SSL', cat: 0, why: 'Antigo.' },
          { text: 'TLS 1.1', cat: 0, why: 'Obsoleto.' },
          { text: 'TLS 1.2', cat: 1, why: 'Aceito.' },
          { text: 'TLS 1.3', cat: 1, why: 'Aceito (RFC 8446).' },
        ],
      },
      recovery: {
        explain: 'Regra simples: **do 1.2 para cima vale**; SSL, 1.0 e 1.1 ficaram para trás. E o **HTTPS** é só o HTTP passando por dentro do TLS, na porta **443**.',
        check: {
          kind: 'choice',
          id: 'tl-r',
          prompt: 'Qual é a porta padrão do HTTPS?',
          options: [
            { text: '443', why: 'Isso.' },
            { text: '80', why: 'A porta padrão do HTTPS é a 443.' },
            { text: '8446', why: '8446 é o número da RFC do TLS 1.3, não uma porta.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'handshake',
      part: 'TLS',
      title: 'O aperto de mão do TLS 1.3',
      goal: 'Ordenar os passos simplificados do handshake.',
      explain:
        '1. O **cliente** envia as cifras que suporta e sua parte do **acordo de chaves** (ECDHE).\n2. O **servidor** responde com a parte dele, envia o **certificado** e **assina** o handshake com a **chave privada**, provando que tem a chave do certificado.\n3. O cliente **valida o certificado** (cadeia até a raiz, validade, nome do servidor, revogação).\n4. Ambos derivam as mesmas **chaves de sessão simétricas**.\n5. Os dados passam cifrados com **cifragem autenticada** (AES-GCM ou ChaCha20-Poly1305).',
      check: {
        kind: 'order',
        id: 'hs-c',
        prompt: 'Ordene o handshake simplificado do TLS 1.3.',
        items: [
          'Cliente envia cifras e sua parte do acordo de chaves',
          'Servidor envia sua parte, o certificado e assina o handshake',
          'Cliente valida o certificado',
          'Ambos derivam as chaves de sessão',
          'Dados trafegam com cifragem autenticada',
        ],
        why: 'Acordo, certificado e assinatura, validação, chaves de sessão, dados.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense numa **conversa com o banco**: você diz como pode falar e começa a combinar o segredo; o banco completa o combinado e mostra a **carteira de identidade** (certificado), assinando para provar que é ele; você confere a carteira; os dois chegam à mesma chave; e só então a conversa sigilosa começa.',
        check: {
          kind: 'choice',
          id: 'hs-r',
          prompt: 'No handshake, por que o servidor assina com a chave privada?',
          options: [
            { text: 'Para provar que tem a chave privada correspondente ao certificado', why: 'Isso.' },
            { text: 'Para cifrar todos os dados da sessão', why: 'Os dados vão com as chaves de sessão simétricas.' },
            { text: 'Para mandar a chave privada ao cliente', why: 'A privada nunca é enviada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'forward',
      part: 'TLS',
      title: 'Sigilo futuro',
      goal: 'Explicar o sigilo futuro e por que o TLS 1.3 tirou o RSA estático.',
      explain:
        'No **TLS 1.3**, o acordo de chaves é sempre **efêmero** (DHE/ECDHE).\n\nAs chaves de sessão **não podem ser recalculadas depois**, mesmo que, no futuro, a **chave privada do servidor vaze**. Isso é o **sigilo futuro** (*forward secrecy*).\n\nPor isso o TLS 1.3 **removeu a troca de chaves por RSA estático**, que não oferecia essa propriedade.',
      check: {
        kind: 'choice',
        id: 'fw-c',
        prompt: 'Qual é o principal benefício de exigir acordo efêmero (DHE/ECDHE) no TLS 1.3?',
        options: [
          { text: 'Sessões passadas continuam protegidas mesmo se a privada do servidor vazar depois', why: 'Isso: sigilo futuro.' },
          { text: 'Dispensar o certificado do servidor', why: 'O certificado continua sendo enviado e validado.' },
          { text: 'Deixar a conexão sem cifragem para ganhar velocidade', why: 'Os dados continuam cifrados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Com **RSA estático**, quem gravou as conversas de hoje e roubar a chave privada do servidor amanhã consegue abrir tudo. Com acordo **efêmero**, cada sessão usa um segredo descartável: roubar a privada depois não reabre as conversas antigas.',
        check: {
          kind: 'tf',
          id: 'fw-r',
          prompt: 'No TLS 1.3, se a chave privada do servidor vazar, as conversas gravadas no passado podem ser decifradas.',
          answer: false,
          why: 'Falso. O acordo efêmero garante sigilo futuro: as chaves de sessão não podem ser recalculadas.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'limites',
      part: 'Limites',
      title: 'O que o cadeado protege e o que não',
      goal: 'Saber os limites do HTTPS.',
      explain:
        '| Protege | Não protege |\n|---|---|\n| Confidencialidade dos dados **em trânsito** | Dados **armazenados** no servidor ou no computador |\n| Integridade dos dados em trânsito | Site legítimo mas **malicioso** (o cadeado não atesta boa-fé) |\n| Autenticidade do **servidor** (certificado) | Falhas da aplicação (injeção de SQL, XSS) |',
      check: {
        kind: 'choice',
        id: 'li-c',
        prompt: 'Um site com cadeado tem uma falha de injeção de SQL. O HTTPS impede o ataque?',
        options: [
          { text: 'Não: o HTTPS protege o trânsito, não falhas da aplicação', why: 'Isso.' },
          { text: 'Sim: com cadeado, o site é seguro', why: 'O cadeado não corrige falhas da aplicação.' },
          { text: 'Sim, se for TLS 1.3', why: 'Nenhuma versão do TLS corrige a aplicação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O HTTPS é um **túnel blindado** entre você e o site. Ele protege o que passa **pelo túnel**. Não diz se o site é honesto, não protege o que está guardado nas pontas e não conserta uma aplicação com falhas.',
        check: {
          kind: 'sort',
          id: 'li-r',
          prompt: 'O HTTPS protege ou não?',
          categories: ['Protege', 'Não protege'],
          items: [
            { text: 'Senha digitada enquanto viaja até o servidor', cat: 0, why: 'Dado em trânsito.' },
            { text: 'Banco de dados guardado no servidor', cat: 1, why: 'Dado armazenado.' },
            { text: 'Site de golpe com certificado válido', cat: 1, why: 'O cadeado não atesta boa-fé.' },
            { text: 'Saber que o servidor é quem diz ser', cat: 0, why: 'Autenticidade via certificado.' },
          ],
        },
      },
    },
    {
      id: 'quadro',
      part: 'Revisão do capítulo',
      title: 'Preciso de quê? Use o quê',
      goal: 'Escolher o mecanismo certo para cada necessidade.',
      explain:
        '| Preciso de… | Use… |\n|---|---|\n| Cifrar grande volume | Simétrica (AES, de preferência GCM) |\n| Só o destinatário ler | Pública do destinatário (na prática, híbrida) |\n| Provar autoria | Assinatura (privada do remetente) |\n| Detectar alteração com chave compartilhada | HMAC |\n| Integridade de um download | Hash publicado por fonte confiável |\n| Guardar senhas | Argon2id, scrypt, bcrypt ou PBKDF2, com sal |\n| Confiar que a pública é de quem diz | Certificado emitido por AC |',
      check: {
        kind: 'sort',
        id: 'qd-c',
        prompt: 'Ligue cada necessidade ao mecanismo.',
        categories: ['Assinatura', 'HMAC', 'Certificado'],
        items: [
          { text: 'Provar quem é o autor e impedir que ele negue', cat: 0, why: 'Privada do remetente.' },
          { text: 'Detectar alteração entre dois sistemas que têm a mesma chave', cat: 1, why: 'Chave compartilhada.' },
          { text: 'Confiar que a chave pública é mesmo do servidor', cat: 2, why: 'Emitido por AC.' },
        ],
      },
      recovery: {
        explain: 'Faça a pergunta **"o que eu quero provar ou esconder?"**. Esconder muito dado: simétrica. Esconder para alguém: pública dele. Provar autoria a qualquer um: assinatura. Provar que não mudou, entre quem tem a mesma chave: HMAC. Confiar numa chave pública: certificado.',
        check: {
          kind: 'choice',
          id: 'qd-r',
          prompt: 'O órgão vai cifrar 2 TB de arquivos de backup. Qual mecanismo?',
          options: [
            { text: 'Simétrica, como AES em GCM', why: 'Isso: grande volume pede simétrica.' },
            { text: 'Assinatura digital', why: 'Assinatura não esconde nada.' },
            { text: 'Hash SHA-256', why: 'Hash não cifra.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'multi',
      id: 'cons-1',
      prompt: 'Pegadinhas do capítulo: marque só as afirmações VERDADEIRAS.',
      options: [
        { text: 'Na híbrida, a assimétrica troca a chave de sessão e a simétrica cifra os dados', correct: true, why: 'Formulação correta.' },
        { text: 'O AES admite blocos de 128, 192 e 256 bits', correct: false, why: 'O bloco é sempre 128; as chaves é que variam.' },
        { text: 'MAC garante não repúdio', correct: false, why: 'A chave é compartilhada.' },
        { text: 'Na simétrica, 20 usuários precisam de 190 chaves', correct: true, why: '20 × 19 / 2 = 190.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação sobre TLS tem um erro. Toque na linha errada.',
      lines: ['HTTPS: HTTP sobre TLS, porta 443', 'TLS 1.3: acordo de chaves sempre efêmero', 'TLS 1.3: troca de chaves por RSA estático continua permitida'],
      bug: 2,
      why: 'O TLS 1.3 removeu o RSA estático, que não oferecia sigilo futuro.',
      fixed: 'TLS 1.3: troca de chaves por RSA estático foi removida',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Para o portal do órgão, qual configuração de servidor é melhor?',
      scenarios: [
        { title: 'Configuração A', body: 'Aceita SSL e TLS 1.0 para compatibilidade com navegadores antigos.' },
        { title: 'Configuração B', body: 'Aceita só TLS 1.2 e TLS 1.3.' },
      ],
      answer: 1,
      why: 'SSL e TLS 1.0 estão obsoletos; as versões aceitas hoje são 1.2 e 1.3.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: o usuário entrou num site de golpe que tem cadeado e certificado válido. O que o cadeado garantiu?',
      options: [
        { text: 'Só que a conversa com aquele site estava cifrada e que o servidor era aquele domínio', why: 'Isso: o cadeado não atesta boa-fé.' },
        { text: 'Que o site é confiável', why: 'O cadeado não atesta boa-fé.' },
        { text: 'Nada, porque golpes não usam certificado', why: 'Podem usar: o certificado prova o domínio, não a honestidade.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.019' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.020' },
  ],
  summary: [
    'Híbrida: chave de sessão simétrica para os dados; assimétrica (pública do destinatário ou Diffie-Hellman) para a chave.',
    'Exemplos: TLS/HTTPS, PGP/GPG, S/MIME.',
    'HTTPS = HTTP sobre TLS, porta 443. Aceitos: TLS 1.2 e 1.3; SSL, 1.0 e 1.1 obsoletos.',
    'Handshake: acordo ECDHE, certificado e assinatura do servidor, validação, chaves de sessão, dados com cifragem autenticada.',
    'TLS 1.3: acordo sempre efêmero (sigilo futuro); RSA estático removido.',
    'O cadeado protege o trânsito e autentica o servidor; não protege dados guardados, não atesta boa-fé, não corrige a aplicação.',
  ],
};
