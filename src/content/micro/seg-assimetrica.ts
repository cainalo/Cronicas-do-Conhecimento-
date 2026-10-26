// Microaula "Criptografia assimétrica" (cap.seg.01, seção assimetrica), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto
// do capítulo (03-assimetrica.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegAssimetrica: MicroLesson = {
  id: 'micro.seg.assimetrica',
  chapterId: 'cap.seg.01',
  sectionId: 'assimetrica',
  title: 'Criptografia assimétrica',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Imagine uma caixa de correio na rua: qualquer pessoa põe uma carta pela fresta, mas só o dono tem a chave para abrir. O que essa ideia resolve?',
    options: [
      { text: 'Qualquer um consegue mandar algo sigiloso ao dono sem combinar um segredo antes', why: 'Isso. É a ideia da chave pública: a fresta é de todos, a chave que abre é só do dono.' },
      { text: 'Nada: continua sendo preciso entregar uma chave secreta a cada remetente', why: 'Não é preciso: a fresta é pública. Só quem abre precisa de chave.' },
      { text: 'Deixa o envio mais rápido', why: 'Rapidez não é o ponto. O ganho é não precisar combinar um segredo antes.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'par',
      part: 'A ideia',
      title: 'Um par de chaves',
      goal: 'Saber o que é a chave pública, a chave privada e como elas se relacionam.',
      explain:
        'Na criptografia **assimétrica** (ou **de chave pública**), cada participante tem um **par de chaves** relacionadas:\n\n- **chave pública**: pode ser divulgada a qualquer pessoa;\n- **chave privada**: fica **só com o titular** e nunca é compartilhada.\n\nO que uma chave cifra, **somente a outra chave do mesmo par** desfaz. E, conhecendo a pública, não é viável descobrir a privada.',
      check: {
        kind: 'choice',
        id: 'pa-c',
        prompt: 'Qual das chaves do par pode ser divulgada a qualquer pessoa?',
        options: [
          { text: 'A chave pública', why: 'Isso. A privada fica só com o titular.' },
          { text: 'A chave privada', why: 'A privada nunca é compartilhada.' },
          { text: 'Nenhuma das duas', why: 'A pública existe justamente para ser divulgada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Volte à caixa de correio: a **fresta** é a chave pública (todo mundo usa), a **chave da porta** é a privada (só o dono tem). O que entra pela fresta, só a chave da porta tira. E olhar a fresta não ensina ninguém a fazer a chave da porta.',
        check: {
          kind: 'choice',
          id: 'pa-r',
          prompt: 'Uma mensagem foi cifrada com a chave pública de Bruno. Qual chave a desfaz?',
          options: [
            { text: 'A chave privada de Bruno', why: 'Isso: a outra chave do mesmo par.' },
            { text: 'A chave pública de Bruno', why: 'A mesma chave não desfaz; é preciso a outra do par.' },
            { text: 'A chave privada de qualquer pessoa', why: 'Só a do mesmo par, a de Bruno.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sigilo',
      part: 'Regras de ouro',
      title: 'Para sigilo: a pública do destinatário',
      goal: 'Escolher a chave certa para que só o destinatário leia.',
      explain:
        'Para **confidencialidade** (só o destinatário lê):\n\n- o remetente cifra com a **chave pública do destinatário**;\n- só a **chave privada do destinatário** decifra.',
      example: '```\nAna cifra com a PÚBLICA de Bruno\n   ▼\n[texto cifrado]\n   ▼\nBruno decifra com a PRIVADA de Bruno\n```',
      check: {
        kind: 'choice',
        id: 'si-c',
        prompt: 'Ana quer mandar a Bruno um arquivo que só Bruno consiga ler. Ana cifra com:',
        options: [
          { text: 'A chave pública de Bruno', why: 'Isso. Só a privada de Bruno desfaz.' },
          { text: 'A chave privada de Ana', why: 'Qualquer um tem a pública de Ana e poderia decifrar. Isso não esconde nada.' },
          { text: 'A chave pública de Ana', why: 'Aí só a privada de Ana desfaria: Bruno não conseguiria ler.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: **quem deve conseguir ler?** Bruno. Então tem de ser algo que **só Bruno** desfaz: a **privada de Bruno**. Para isso, Ana cifra com a outra chave do par de Bruno, a **pública de Bruno**.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Carla quer que só o Tribunal leia o documento. Ela cifra com:',
          options: [
            { text: 'A chave pública do Tribunal', why: 'Isso: só a privada do Tribunal decifra.' },
            { text: 'A chave privada de Carla', why: 'Isso prova autoria, não esconde o conteúdo.' },
            { text: 'A chave privada do Tribunal', why: 'Carla não tem a privada do Tribunal: ela nunca é compartilhada.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'assinatura',
      part: 'Regras de ouro',
      title: 'Para assinar: a própria privada',
      goal: 'Escolher a chave certa para provar a autoria.',
      explain:
        'Para **assinatura** (autenticidade, integridade e não repúdio):\n\n- o remetente assina com a **própria chave privada**;\n- **qualquer pessoa** verifica com a **chave pública do remetente**.\n\nCifrar com a privada do remetente serve para **provar a autoria**, não para esconder o conteúdo.',
      example: '```\nAna assina com a PRIVADA de Ana\n   ▼\n[mensagem + assinatura]\n   ▼\nQualquer um verifica com a PÚBLICA de Ana\n```',
      check: {
        kind: 'sort',
        id: 'as-c',
        prompt: 'Ana manda uma mensagem a Bruno. Classifique cada uso de chave.',
        categories: ['Garante sigilo', 'Garante autoria'],
        items: [
          { text: 'Ana cifra com a pública de Bruno', cat: 0, why: 'Só Bruno desfaz.' },
          { text: 'Ana assina com a própria privada', cat: 1, why: 'Só Ana tem essa chave.' },
          { text: 'Bruno decifra com a própria privada', cat: 0, why: 'É o fim do caminho do sigilo.' },
          { text: 'Qualquer um verifica com a pública de Ana', cat: 1, why: 'Confere a assinatura.' },
        ],
      },
      recovery: {
        explain: 'Assinatura é como um **carimbo que só você tem**: só a sua privada faz. E todos conferem o carimbo com a sua pública. Se Ana "cifra com a própria privada", qualquer um desfaz com a pública dela, então nada fica escondido: o que se ganha é a prova de que foi Ana.',
        check: {
          kind: 'choice',
          id: 'as-r',
          prompt: 'O relator quer que todos possam conferir que a decisão é dele. Ele assina com:',
          options: [
            { text: 'A própria chave privada', why: 'Isso. Todos verificam com a pública dele.' },
            { text: 'A própria chave pública', why: 'A pública é de todos: não prova nada sobre o relator.' },
            { text: 'A chave pública de quem vai ler', why: 'Isso daria sigilo para o leitor, não prova de autoria.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'distribuicao',
      part: 'Vantagens',
      title: 'Fim do problema da entrega e menos chaves',
      goal: 'Explicar por que a assimétrica resolve a distribuição de chaves e calcular 2n.',
      explain:
        'A chave pública pode **trafegar abertamente**: não é preciso um canal secreto antes.\n\nE a escala melhora: para **n** participantes bastam **n pares**, ou seja, **2n chaves** no total (contra n(n − 1) / 2 na simétrica).',
      example: '100 pessoas → 100 pares (**200 chaves**) na assimétrica, contra **4.950 chaves** na simétrica.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Quantas chaves, no total, 50 pessoas precisam na criptografia assimétrica?',
        options: [
          { text: '100', why: 'Isso: 50 pares, 2 × 50 = 100 chaves.' },
          { text: '1.225', why: 'Isso seria na simétrica: 50 × 49 / 2.' },
          { text: '50', why: '50 são os pares; cada par tem 2 chaves.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Na assimétrica, cada pessoa tem **um par** (uma pública e uma privada). Então conte **2 por pessoa**: 10 pessoas, 20 chaves; 30 pessoas, 60 chaves. Não importa quantos pares de conversa existem, porque a pública de cada um serve para todos.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: 'E 30 pessoas?',
          options: [
            { text: '60 chaves', why: 'Isso: 30 pares.' },
            { text: '435 chaves', why: 'Isso é a conta da simétrica: 30 × 29 / 2.' },
            { text: '30 chaves', why: 'Cada pessoa tem duas chaves.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'rsa-ecc',
      part: 'Algoritmos',
      title: 'RSA, ECC e DSA',
      goal: 'Saber a base e o uso de RSA, ECC e DSA.',
      explain:
        '| Algoritmo | Base | Uso |\n|---|---|---|\n| **RSA** (1977) | Dificuldade de **fatorar** o produto de dois primos grandes | Cifragem e assinatura. Mínimo usual hoje: **2048 bits** |\n| **ECC** (ECDH, ECDSA, Ed25519) | Logaritmo discreto em **curvas elípticas** | Mesma segurança com **chaves bem menores**: ECC de 256 bits ≈ RSA de 3072 bits |\n| **DSA** | Logaritmo discreto | **Apenas assinatura** |',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Comparada ao RSA, a criptografia de curvas elípticas (ECC):',
        options: [
          { text: 'Dá segurança comparável com chaves bem menores', why: 'Isso: 256 bits de ECC ≈ 3072 bits de RSA.' },
          { text: 'Precisa de chaves maiores para a mesma segurança', why: 'É o contrário: as chaves ECC são menores.' },
          { text: 'Serve apenas para assinatura', why: 'Quem serve apenas para assinatura é o DSA.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Guarde três palavras. **RSA: fatorar** (cifra e assina). **ECC: menor** (mesma segurança, chave bem menor). **DSA: só assina**.',
        check: {
          kind: 'sort',
          id: 're-r',
          prompt: 'Ligue cada algoritmo à característica.',
          categories: ['RSA', 'ECC', 'DSA'],
          items: [
            { text: 'Baseado na dificuldade de fatorar primos grandes', cat: 0, why: 'Base do RSA.' },
            { text: 'Chave de 256 bits comparável a 3072 bits do outro', cat: 1, why: 'Vantagem das curvas elípticas.' },
            { text: 'Apenas assinatura', cat: 2, why: 'O DSA não cifra.' },
          ],
        },
      },
    },
    {
      id: 'dh',
      part: 'Algoritmos',
      title: 'Diffie-Hellman: combinar um segredo em público',
      goal: 'Saber que o Diffie-Hellman serve para acordo de chaves, e não para cifrar ou assinar.',
      explain:
        'O **Diffie-Hellman (DH)**, de 1976, baseia-se no **logaritmo discreto**.\n\nEle faz **acordo (troca) de chaves**: duas partes combinam um segredo por um **canal público**.\n\nO DH **não cifra** mensagens e **não assina**.',
      check: {
        kind: 'choice',
        id: 'dh-c',
        prompt: 'O Diffie-Hellman é corretamente descrito como um mecanismo de:',
        options: [
          { text: 'Acordo de chaves por um canal público', why: 'Isso.' },
          { text: 'Assinatura digital de documentos', why: 'O DH não assina. Assinatura é com RSA, ECDSA ou DSA.' },
          { text: 'Cifragem de arquivos grandes', why: 'O DH não cifra mensagens: só combina o segredo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em duas pessoas que **combinam uma senha conversando em voz alta**, de um jeito que quem ouve não consegue descobrir a senha. É isso que o DH faz: **combina**. Depois, quem cifra os dados é outro algoritmo, usando o segredo combinado.',
        check: {
          kind: 'multi',
          id: 'dh-r',
          prompt: 'O que o Diffie-Hellman faz? Marque todas as corretas.',
          options: [
            { text: 'Permite combinar um segredo por um canal público', correct: true, why: 'É o acordo de chaves.' },
            { text: 'Assina mensagens', correct: false, why: 'Não assina.' },
            { text: 'Baseia-se no logaritmo discreto', correct: true, why: 'Essa é a base matemática.' },
            { text: 'Cifra o conteúdo das mensagens', correct: false, why: 'Não cifra mensagens.' },
          ],
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'mitm',
      part: 'Algoritmos',
      title: 'O ataque do intermediário',
      goal: 'Explicar a falha do Diffie-Hellman puro e como ela é corrigida.',
      explain:
        'O DH "puro" **não autentica** quem está do outro lado.\n\nUm atacante no meio (*man-in-the-middle*) faz **um acordo com cada lado**, separadamente, e repassa as mensagens.\n\nA defesa é **autenticar** a troca: por exemplo, **assinar os parâmetros** com uma chave ligada a um **certificado digital**, como faz o TLS.',
      check: {
        kind: 'choice',
        id: 'mi-c',
        prompt: 'Qual é a defesa contra o ataque do intermediário no Diffie-Hellman?',
        options: [
          { text: 'Autenticar a troca, assinando os parâmetros com chave ligada a certificado', why: 'Isso. É o que o TLS faz.' },
          { text: 'Usar uma chave DH maior', why: 'Chave maior não resolve: o problema é não saber quem está do outro lado.' },
          { text: 'Repetir a troca duas vezes', why: 'O atacante repetiria também. Falta autenticação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine que você combina a senha por telefone, mas quem atende é um **impostor**, que liga para o seu amigo e combina outra senha com ele. Os dois acham que falam entre si. A saída é **confirmar a identidade** de quem atende: no TLS, os parâmetros vêm **assinados** e ligados a um certificado.',
        check: {
          kind: 'tf',
          id: 'mi-r',
          prompt: 'O Diffie-Hellman puro garante que você está combinando a chave com a pessoa certa.',
          answer: false,
          why: 'Falso. Ele não autentica: por isso existe o ataque do intermediário.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'desempenho',
      part: 'Comparação',
      title: 'O preço: lentidão',
      goal: 'Saber por que não se cifra arquivo grande com RSA e o que se faz no lugar.',
      explain:
        'Operações assimétricas são **muito mais lentas** que as simétricas (ordens de grandeza).\n\nPor isso, na prática, ninguém cifra um arquivo grande com RSA. Usa-se a **assimétrica** para **trocar ou proteger uma chave simétrica**, e a **simétrica** para cifrar os dados.\n\nEsse arranjo é a **criptografia híbrida**.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'Para enviar um vídeo grande em sigilo, o que é mais adequado?',
        options: [
          { text: 'Cifrar o vídeo com chave simétrica e proteger essa chave com a assimétrica', why: 'Isso: criptografia híbrida.' },
          { text: 'Cifrar o vídeo inteiro com RSA', why: 'A assimétrica é muito mais lenta; não se usa para dados grandes.' },
          { text: 'Mandar sem cifrar, porque é grande demais', why: 'Dá para cifrar com a simétrica, que é rápida.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Divida o trabalho: a **simétrica** é o caminhão (leva muita carga depressa); a **assimétrica** é o cofre pequeno que leva **só a chave do caminhão** com segurança. Juntas, formam a criptografia **híbrida**.',
        check: {
          kind: 'choice',
          id: 'de-r',
          prompt: 'Na criptografia híbrida, a assimétrica é usada para:',
          options: [
            { text: 'Trocar ou proteger a chave simétrica', why: 'Isso.' },
            { text: 'Cifrar todos os dados', why: 'Os dados são cifrados com a simétrica, mais rápida.' },
            { text: 'Substituir a simétrica por completo', why: 'As duas trabalham juntas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'comparativo',
      part: 'Comparação',
      title: 'Simétrica e assimétrica lado a lado',
      goal: 'Comparar as duas em chaves, velocidade, distribuição e não repúdio.',
      explain:
        '| Aspecto | Simétrica | Assimétrica |\n|---|---|---|\n| Chaves | Uma secreta, compartilhada | Par: pública + privada |\n| Velocidade | Alta | Baixa |\n| Distribuição | Problema central | Resolvida pela pública |\n| Chaves para n pessoas | n(n − 1) / 2 | 2n |\n| Não repúdio | Não | Sim (via assinatura) |\n| Exemplos | AES, 3DES, ChaCha20 | RSA, ECC, DH, DSA |',
      check: {
        kind: 'multi',
        id: 'co-c',
        prompt: 'Sobre a assimétrica em comparação com a simétrica, marque as corretas.',
        options: [
          { text: 'É mais lenta', correct: true, why: 'Ordens de grandeza mais lenta.' },
          { text: 'Permite não repúdio por meio da assinatura', correct: true, why: 'Só o titular tem a privada.' },
          { text: 'Exige mais chaves para muitos participantes', correct: false, why: 'Exige menos: 2n contra n(n − 1) / 2.' },
          { text: 'Exige um canal secreto prévio para entregar a chave', correct: false, why: 'A pública trafega abertamente.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Resuma em duas frases. **Simétrica:** rápida, mas o segredo precisa ser entregue e não há não repúdio. **Assimétrica:** lenta, mas a pública anda solta, precisa de menos chaves e permite assinar.',
        check: {
          kind: 'sort',
          id: 'co-r',
          prompt: 'Classifique cada característica.',
          categories: ['Simétrica', 'Assimétrica'],
          items: [
            { text: 'Alta velocidade', cat: 0, why: 'Por isso cifra os dados.' },
            { text: 'Par de chaves', cat: 1, why: 'Pública e privada.' },
            { text: 'Não oferece não repúdio', cat: 0, why: 'A chave é compartilhada.' },
            { text: '2n chaves para n pessoas', cat: 1, why: 'Um par por pessoa.' },
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
      lines: ['Sigilo: cifrar com a pública do destinatário', 'Assinatura: assinar com a privada do remetente', 'Para garantir sigilo, Ana cifra com a própria chave privada'],
      bug: 2,
      why: 'Qualquer um tem a pública de Ana e poderia decifrar. Cifrar com a privada do remetente prova autoria, não esconde o conteúdo.',
      fixed: 'Para garantir sigilo, Ana cifra com a pública de Bruno',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Dois servidores que nunca se falaram precisam combinar uma chave secreta pela internet sem cair no ataque do intermediário. Qual proposta?',
      scenarios: [
        { title: 'Proposta A', body: 'Diffie-Hellman puro, sem nenhuma verificação de identidade.' },
        { title: 'Proposta B', body: 'Diffie-Hellman com os parâmetros assinados por chave ligada a certificado digital.' },
      ],
      answer: 1,
      why: 'O DH puro não autentica; assinar os parâmetros com certificado, como no TLS, impede o intermediário.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: 200 servidores. Quantas chaves na assimétrica, no total?',
      options: [
        { text: '400', why: 'Isso: 200 pares.' },
        { text: '19.900', why: 'Isso seria na simétrica: 200 × 199 / 2.' },
        { text: '200', why: 'São 200 pares, com 2 chaves cada.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-4',
      prompt: 'Classifique cada algoritmo pelo uso principal.',
      categories: ['Acordo de chaves', 'Apenas assinatura', 'Cifra e assina'],
      items: [
        { text: 'Diffie-Hellman', cat: 0, why: 'Combina um segredo.' },
        { text: 'DSA', cat: 1, why: 'Só assina.' },
        { text: 'RSA', cat: 2, why: 'Cifragem e assinatura.' },
      ],
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.008' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.009' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.010' },
  ],
  summary: [
    'Assimétrica = chave pública: cada um tem um par (pública divulgada, privada só do titular).',
    'Sigilo: cifra com a PÚBLICA do destinatário; ele decifra com a PRIVADA dele.',
    'Assinatura: assina com a PRIVADA do remetente; todos verificam com a PÚBLICA dele.',
    'Resolve a distribuição de chaves e precisa de 2n chaves para n pessoas.',
    'RSA (fatorar, cifra e assina, mínimo 2048 bits), ECC (chaves menores), DSA (só assina), DH (só acordo de chaves).',
    'DH puro não autentica: sujeito ao intermediário. Defesa: assinar os parâmetros com certificado.',
    'É muito mais lenta: na prática, protege a chave simétrica (criptografia híbrida).',
  ],
};
