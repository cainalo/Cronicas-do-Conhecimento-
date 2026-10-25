// Microaula "Fundamentos e objetivos da criptografia" (cap.seg.01, seção fundamentos), no formato
// aprovado em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo.
// Fatos conferidos com o texto do capítulo (01-fundamentos.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegFundamentos: MicroLesson = {
  id: 'micro.seg.fundamentos',
  chapterId: 'cap.seg.01',
  sectionId: 'fundamentos',
  title: 'Fundamentos e objetivos da criptografia',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O Tribunal envia um relatório sigiloso a outro órgão. Além de ninguém mais conseguir ler, o que mais pode importar?',
    options: [
      { text: 'Saber se foi alterado no caminho e quem de fato enviou', why: 'Isso. Sigilo é só um dos objetivos. A criptografia também cuida de integridade, autenticidade e não repúdio.' },
      { text: 'Nada: segurança é só impedir a leitura', why: 'Impedir a leitura é a confidencialidade, mas há outros objetivos: integridade, autenticidade e não repúdio.' },
      { text: 'Só a velocidade do envio', why: 'Velocidade importa, mas a pergunta é de segurança: alteração e origem também contam.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'vocabulario',
      part: 'Vocabulário',
      title: 'Texto claro, cifrado, algoritmo e chave',
      goal: 'Usar corretamente os termos básicos da criptografia.',
      explain:
        '| Termo | Significado |\n|---|---|\n| **Texto claro** (*plaintext*) | A mensagem original, legível |\n| **Texto cifrado** (*ciphertext*) | A mensagem após a cifragem; ininteligível sem a chave |\n| **Algoritmo** (cifra) | O procedimento matemático de cifrar e decifrar |\n| **Chave** | O parâmetro secreto (ou par de parâmetros) que controla o algoritmo |\n| **Cifrar / decifrar** | Claro → cifrado / cifrado → claro, usando a chave |',
      check: {
        kind: 'choice',
        id: 'vc-c',
        prompt: 'Qual é o parâmetro secreto que controla o algoritmo de cifragem?',
        options: [
          { text: 'A chave', why: 'Isso.' },
          { text: 'O texto claro', why: 'O texto claro é a mensagem original.' },
          { text: 'O texto cifrado', why: 'O texto cifrado é o resultado da cifragem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cofre**: o **documento** dentro é o texto claro; o **cofre fechado** é o texto cifrado; o **mecanismo da fechadura** é o algoritmo; o **segredo** que abre é a chave.',
        check: {
          kind: 'sort',
          id: 'vc-r',
          prompt: 'Classifique cada item.',
          categories: ['Texto claro', 'Texto cifrado', 'Chave'],
          items: [
            { text: '"Relatório de auditoria nº 12"', cat: 0, why: 'Mensagem legível.' },
            { text: '"9f3a7c...e21b" ilegível', cat: 1, why: 'Resultado da cifragem.' },
            { text: 'O segredo de 256 bits guardado no cofre do órgão', cat: 2, why: 'Parâmetro secreto do algoritmo.' },
          ],
        },
      },
    },
    {
      id: 'criptoanalise',
      part: 'Vocabulário',
      title: 'Criptoanálise, criptologia e o hash',
      goal: 'Diferenciar criptografia, criptoanálise e criptologia, e saber que hash não cifra.',
      explain:
        '- **Criptoanálise**: estudo de como **quebrar** cifras **sem conhecer a chave**.\n- **Criptologia**: **criptografia + criptoanálise**.\n\nCuidado com a expressão "criptografar com hash". **Função hash não cifra**: ela **não tem chave** nem operação inversa de "decifrar".',
      check: {
        kind: 'choice',
        id: 'ca-c',
        prompt: 'Criptologia é:',
        options: [
          { text: 'Criptografia somada à criptoanálise', why: 'Isso.' },
          { text: 'Apenas a quebra de cifras', why: 'Quebrar cifras é a criptoanálise, uma parte da criptologia.' },
          { text: 'O mesmo que função hash', why: 'Hash é um tipo de função, não a área inteira.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **fazer** e **arrombar** fechaduras: quem faz é a **criptografia**, quem estuda como arrombar é a **criptoanálise**, e a ciência das duas juntas é a **criptologia**. E o hash não é fechadura: não há chave nem como "abrir" de volta.',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'É correto dizer que um hash "cifra" a senha?',
          options: [
            { text: 'Não: hash não tem chave nem operação de decifrar', why: 'Isso.' },
            { text: 'Sim: hash é cifragem com chave pública', why: 'Hash não usa chave.' },
            { text: 'Sim: basta aplicar o hash de novo para decifrar', why: 'Não existe "decifrar" um hash.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'kerckhoffs',
      part: 'Vocabulário',
      title: 'Princípio de Kerckhoffs',
      goal: 'Saber de onde vem a segurança de um sistema criptográfico.',
      explain:
        'Formulado no século XIX por **Auguste Kerckhoffs**: **um sistema criptográfico deve continuar seguro mesmo que tudo sobre ele seja público, exceto a chave**.\n\nNa prática, algoritmos modernos (**AES, RSA, SHA-256**) são **públicos** e amplamente analisados; o segredo está **somente na chave**.\n\nEsconder o algoritmo (**"segurança por obscuridade"**) **não substitui** uma chave forte.',
      check: {
        kind: 'choice',
        id: 'kk-c',
        prompt: 'Segundo Kerckhoffs, a segurança de um sistema criptográfico deve depender:',
        options: [
          { text: 'Apenas do segredo da chave', why: 'Isso.' },
          { text: 'Do segredo do algoritmo', why: 'Isso é segurança por obscuridade, que o princípio rejeita.' },
          { text: 'De ninguém saber que há criptografia', why: 'Tudo pode ser público, exceto a chave.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Todo mundo sabe **como funciona** uma fechadura de cofre de banco; mesmo assim, ela é segura porque **o segredo** não é conhecido. Se a segurança dependesse de esconder o **modelo** da fechadura, bastaria alguém descobri-lo.',
        check: {
          kind: 'choice',
          id: 'kk-r',
          prompt: 'O órgão criou um algoritmo próprio e secreto para não precisar de chaves fortes. Segundo Kerckhoffs, isso é:',
          options: [
            { text: 'Inadequado: é segurança por obscuridade', why: 'Isso.' },
            { text: 'Ideal: algoritmo secreto é mais seguro', why: 'O princípio diz o contrário: o algoritmo pode ser público; a chave é que deve ser secreta.' },
            { text: 'Obrigatório por lei', why: 'Não há essa exigência; o princípio recomenda algoritmos públicos e chaves fortes.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'confidencialidade',
      part: 'Objetivos',
      title: 'Confidencialidade e integridade',
      goal: 'Associar confidencialidade à cifragem e integridade a hash, MAC e assinatura.',
      explain:
        '1. **Confidencialidade**: **só quem tem autorização consegue ler**. Mecanismo típico: **cifragem** (simétrica ou assimétrica).\n2. **Integridade**: **qualquer alteração é detectável**. Mecanismos: **hash**, **MAC/HMAC**, **assinatura digital**.',
      check: {
        kind: 'choice',
        id: 'cf-c',
        prompt: 'Cifrar um arquivo com AES garante principalmente:',
        options: [
          { text: 'Confidencialidade', why: 'Isso. Só quem tem a chave lê.' },
          { text: 'Não repúdio', why: 'Não repúdio vem da assinatura digital.' },
          { text: 'Disponibilidade', why: 'Disponibilidade não é garantida pela criptografia.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Confidencialidade** responde "**quem pode ler?**". **Integridade** responde "**alguém mexeu?**". São perguntas diferentes, com mecanismos diferentes: cifragem para a primeira; hash, MAC ou assinatura para a segunda.',
        check: {
          kind: 'choice',
          id: 'cf-r',
          prompt: 'Qual destes mecanismos serve para detectar alterações?',
          options: [
            { text: 'HMAC', why: 'Isso. Assim como hash e assinatura digital.' },
            { text: 'Redundância de servidores', why: 'Redundância trata de disponibilidade.' },
            { text: 'Nenhum: alteração não é detectável', why: 'É detectável com hash, MAC/HMAC ou assinatura.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'autenticidade',
      part: 'Objetivos',
      title: 'Autenticidade e não repúdio',
      goal: 'Diferenciar autenticidade de não repúdio.',
      explain:
        '3. **Autenticidade**: confirma-se a **origem** (quem enviou). Mecanismos: **MAC/HMAC** (entre quem compartilha a chave) e **assinatura digital**.\n4. **Não repúdio** (irretratabilidade): o autor **não consegue negar a autoria perante terceiros**. Mecanismo: **assinatura digital**, porque só o autor possui a **chave privada**.',
      check: {
        kind: 'choice',
        id: 'au-c',
        prompt: 'Qual mecanismo garante que o autor não possa negar, diante de um juiz, que assinou o documento?',
        options: [
          { text: 'Assinatura digital', why: 'Isso. Só ele tem a chave privada.' },
          { text: 'HMAC', why: 'O HMAC usa chave compartilhada: o destinatário também poderia tê-lo gerado.' },
          { text: 'Hash isolado', why: 'O hash não identifica o autor.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Autenticidade é "**veio de quem diz que veio?**", e serve entre as duas partes. Não repúdio é "**consigo provar isso a um terceiro?**". Para provar a um terceiro, a prova precisa ser algo que **só o autor** poderia ter feito: uma assinatura com a chave privada dele.',
        check: {
          kind: 'choice',
          id: 'au-r',
          prompt: 'Não repúdio também é chamado de:',
          options: [
            { text: 'Irretratabilidade', why: 'Isso.' },
            { text: 'Disponibilidade', why: 'Disponibilidade é outro objetivo.' },
            { text: 'Criptoanálise', why: 'Criptoanálise é a quebra de cifras.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'disponibilidade',
      part: 'Objetivos',
      title: 'E a disponibilidade?',
      goal: 'Saber que disponibilidade não é garantida pela criptografia.',
      explain:
        'A **disponibilidade** faz parte da tríade **CID** (Confidencialidade, Integridade, Disponibilidade) da segurança da informação.\n\nMas ela **não é garantida pela criptografia**. É obtida com **redundância**, **backup**, **proteção contra negação de serviço** etc.\n\nEssa distinção é uma **pegadinha frequente**.',
      check: {
        kind: 'choice',
        id: 'dp-c',
        prompt: 'Qual destes objetivos NÃO é garantido por mecanismos criptográficos?',
        options: [
          { text: 'Disponibilidade', why: 'Isso. Vem de redundância, backup e proteção contra negação de serviço.' },
          { text: 'Integridade', why: 'Integridade vem de hash, MAC e assinatura.' },
          { text: 'Confidencialidade', why: 'Confidencialidade vem da cifragem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Cifrar o portal não o mantém **no ar** durante um ataque que o derruba. Para isso servem **servidores redundantes**, **backup** e proteção contra **negação de serviço**. A criptografia protege o **conteúdo**, não a **presença** do serviço.',
        check: {
          kind: 'choice',
          id: 'dp-r',
          prompt: 'Para manter o sistema no ar mesmo se um servidor cair, o que se usa?',
          options: [
            { text: 'Redundância de servidores', why: 'Isso. Disponibilidade.' },
            { text: 'Assinatura digital', why: 'Assinatura garante integridade, autenticidade e não repúdio.' },
            { text: 'Cifragem AES', why: 'Cifragem garante confidencialidade.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'mac-assinatura',
      part: 'Mecanismo e propriedade',
      title: 'MAC e assinatura: a diferença decisiva',
      goal: 'Explicar por que o MAC não dá não repúdio e a assinatura dá.',
      explain:
        '| Mecanismo | Confid. | Integridade | Autenticidade | Não repúdio |\n|---|---|---|---|---|\n| **MAC / HMAC** | não | sim | sim, entre as partes | **não** |\n| **Assinatura digital** | não | sim | sim | **sim** |\n\n**Por que o MAC não dá não repúdio?** Porque remetente e destinatário conhecem **a mesma chave**: o destinatário também **poderia ter gerado** aquele MAC. Um terceiro não tem como saber quem o produziu.',
      check: {
        kind: 'choice',
        id: 'ma-c',
        prompt: 'Por que o HMAC não garante não repúdio?',
        options: [
          { text: 'Porque as duas partes conhecem a mesma chave', why: 'Isso. Qualquer uma delas poderia ter gerado o código.' },
          { text: 'Porque o HMAC não detecta alterações', why: 'Detecta: ele garante integridade.' },
          { text: 'Porque o HMAC é público', why: 'A chave do HMAC é secreta, mas compartilhada pelas duas partes.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um **carimbo que você e seu colega têm cópias iguais**. O documento carimbado prova que veio **de um de vocês dois**, mas não de **qual**. A assinatura digital é como uma **rubrica única**, que só você sabe fazer.',
        check: {
          kind: 'choice',
          id: 'ma-r',
          prompt: 'Nem MAC nem assinatura digital garantem qual propriedade?',
          options: [
            { text: 'Confidencialidade', why: 'Isso. Nenhum dos dois esconde o conteúdo.' },
            { text: 'Integridade', why: 'Os dois garantem integridade.' },
            { text: 'Autenticidade', why: 'Os dois garantem autenticidade (o MAC, entre as partes).' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'cifragem-tabela',
      part: 'Mecanismo e propriedade',
      title: 'Cifragem: simples, autenticada e com chave pública',
      goal: 'Saber o que cada forma de cifragem garante.',
      explain:
        '| Mecanismo | Confid. | Integridade | Autenticidade | Não repúdio |\n|---|---|---|---|---|\n| Cifragem simétrica (ex.: AES-CBC) | sim | não | não | não |\n| **Cifragem autenticada** (ex.: AES-GCM) | sim | **sim** | **sim, entre as partes** | não |\n| Cifragem com a **chave pública do destinatário** | sim | não | não | não |',
      check: {
        kind: 'choice',
        id: 'ct-c',
        prompt: 'Qual forma de cifragem garante, ao mesmo tempo, confidencialidade e integridade?',
        options: [
          { text: 'Cifragem autenticada, como AES-GCM', why: 'Isso.' },
          { text: 'AES-CBC sozinho', why: 'AES-CBC sozinho dá só confidencialidade.' },
          { text: 'Cifrar com a chave pública do destinatário', why: 'Isso dá confidencialidade, mas não integridade nem autenticidade.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Cifrar **esconde**, mas não necessariamente **acusa** uma alteração. A cifragem **autenticada** (como **GCM**) junta as duas coisas: esconde e acusa qualquer mexida. E cifrar com a **chave pública** de alguém só garante que **só ele lê**, não **quem mandou**.',
        check: {
          kind: 'choice',
          id: 'ct-r',
          prompt: 'Cifrar com a chave pública do destinatário garante que:',
          options: [
            { text: 'Só o destinatário consegue ler', why: 'Isso: confidencialidade.' },
            { text: 'O destinatário sabe quem enviou', why: 'Qualquer um pode usar a chave pública; não prova o remetente.' },
            { text: 'O remetente não pode negar a autoria', why: 'Isso é não repúdio, da assinatura digital.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'hash-isolado',
      part: 'Mecanismo e propriedade',
      title: 'Hash isolado: só contra erro acidental',
      goal: 'Entender o limite do hash sem chave.',
      explain:
        'Um **hash isolado** (ex.: **SHA-256**) não dá confidencialidade, autenticidade nem não repúdio. Quanto à integridade, protege **só contra erros acidentais**.\n\nPor quê? Se um **atacante** pode trocar a mensagem, pode também **recalcular e trocar o hash**.\n\nContra adversários, o hash precisa estar protegido por uma **chave (HMAC)** ou por uma **assinatura**.',
      check: {
        kind: 'choice',
        id: 'hi-c',
        prompt: 'O site publica um arquivo e, ao lado, o hash SHA-256 dele. Um invasor troca os dois. O hash ajuda a perceber?',
        options: [
          { text: 'Não: o invasor recalculou o hash do arquivo falso', why: 'Isso. Sem chave ou assinatura, o hash não protege contra quem pode trocá-lo.' },
          { text: 'Sim: hash sempre denuncia qualquer alteração', why: 'Só se o hash estiver protegido. Aqui ele foi trocado junto.' },
          { text: 'Sim: o hash é cifrado', why: 'Hash não é cifrado; não tem chave.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O hash é como uma **etiqueta com o peso** do pacote: se o pacote quebra no caminho e perde peças, a etiqueta acusa. Mas um ladrão que troca o pacote pode também **trocar a etiqueta**. Para isso não acontecer, a etiqueta precisa de um **lacre** (chave do HMAC) ou de uma **assinatura**.',
        check: {
          kind: 'choice',
          id: 'hi-r',
          prompt: 'O que torna o hash útil contra um adversário?',
          options: [
            { text: 'Protegê-lo com uma chave (HMAC) ou com uma assinatura', why: 'Isso.' },
            { text: 'Usar um hash maior', why: 'O tamanho não impede o atacante de recalcular o hash.' },
            { text: 'Publicá-lo em letras maiúsculas', why: 'Não tem efeito nenhum.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'familias',
      part: 'As três famílias',
      title: 'Simétrica, assimétrica e hash',
      goal: 'Distinguir as três famílias de técnicas.',
      explain:
        '- **Simétrica**: **uma única chave secreta** compartilhada cifra e decifra. **Rápida**.\n- **Assimétrica** (de chave pública): **par de chaves**, pública e privada, matematicamente relacionadas. **Mais lenta**, mas **resolve a distribuição de chaves** e permite **assinaturas**.\n- **Funções hash**: resumo de **tamanho fixo**, **sem chave**, de **mão única**.\n\nNa prática, sistemas reais (HTTPS, VPNs, e-mail seguro) **combinam as três**.',
      check: {
        kind: 'choice',
        id: 'fm-c',
        prompt: 'Qual família usa um par de chaves, pública e privada?',
        options: [
          { text: 'Assimétrica', why: 'Isso.' },
          { text: 'Simétrica', why: 'A simétrica usa uma única chave compartilhada.' },
          { text: 'Hash', why: 'Hash não usa chave.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Simétrica** = **uma chave igual** para trancar e destrancar (rápida, mas é preciso entregar a chave com segurança). **Assimétrica** = **cadeado aberto** (público) que qualquer um fecha e **chave** (privada) que só o dono tem. **Hash** = **impressão digital** do arquivo, sem chave nenhuma.',
        check: {
          kind: 'sort',
          id: 'fm-r',
          prompt: 'Qual família?',
          categories: ['Simétrica', 'Assimétrica', 'Hash'],
          items: [
            { text: 'AES', cat: 0, why: 'Chave única compartilhada.' },
            { text: 'RSA', cat: 1, why: 'Par de chaves.' },
            { text: 'SHA-256', cat: 2, why: 'Resumo sem chave.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene os mecanismos do que garante MENOS propriedades para o que garante MAIS.',
      items: ['Hash isolado (nada contra adversário)', 'Cifragem AES-CBC (confidencialidade)', 'HMAC (integridade e autenticidade entre as partes)', 'Assinatura digital (integridade, autenticidade e não repúdio)'],
      why: 'Pela tabela: o hash sozinho não resiste a adversário; o AES-CBC dá uma propriedade; o HMAC, duas; a assinatura, três.',
      errorKind: 'conceito',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'A assinatura digital garante não repúdio', correct: true, why: 'Só o autor tem a chave privada.' },
        { text: 'Pelo princípio de Kerckhoffs, só a chave precisa ser secreta', correct: true, why: 'O algoritmo pode ser público.' },
        { text: 'A criptografia garante a disponibilidade', correct: false, why: 'Disponibilidade vem de redundância, backup e proteção contra negação de serviço.' },
        { text: 'Função hash cifra a mensagem com uma chave', correct: false, why: 'Hash não tem chave nem decifragem.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites montou a tabela de mecanismos. Toque na linha errada.',
      lines: ['AES-GCM: confidencialidade, integridade e autenticidade entre as partes', 'Assinatura digital: integridade, autenticidade e não repúdio', 'HMAC: integridade, autenticidade e não repúdio'],
      bug: 2,
      why: 'O HMAC não dá não repúdio: as duas partes conhecem a mesma chave.',
      fixed: 'HMAC: integridade e autenticidade entre as partes',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O Tribunal precisa que uma decisão eletrônica tenha autoria comprovável perante qualquer pessoa. Qual solução?',
      scenarios: [
        { title: 'Solução A', body: 'Calcular um HMAC com uma chave combinada entre o Tribunal e o destinatário.' },
        { title: 'Solução B', body: 'Assinar digitalmente com a chave privada do relator.' },
      ],
      answer: 1,
      why: 'Para provar a terceiros (não repúdio) é preciso algo que só o autor poderia fazer: a assinatura com a chave privada. O HMAC poderia ter sido gerado por qualquer das duas partes.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o portal ficou fora do ar por um ataque de negação de serviço, embora todo o tráfego fosse cifrado com TLS. O que falhou?',
      options: [
        { text: 'A disponibilidade, que a criptografia não garante', why: 'Isso. Precisa de redundância e proteção contra negação de serviço.' },
        { text: 'A confidencialidade, porque o TLS não funcionou', why: 'O conteúdo continuou protegido; o que caiu foi o serviço.' },
        { text: 'O não repúdio do portal', why: 'Não repúdio é sobre autoria, não sobre o serviço estar no ar.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.001' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.002' },
  ],
  summary: [
    'Texto claro, texto cifrado, algoritmo e chave. Criptologia = criptografia + criptoanálise.',
    'Hash não cifra: não tem chave nem decifragem.',
    'Kerckhoffs: tudo pode ser público, exceto a chave. Obscuridade não substitui chave forte.',
    'Confidencialidade (cifragem), integridade (hash, MAC, assinatura), autenticidade (MAC, assinatura), não repúdio (só assinatura).',
    'Disponibilidade não vem da criptografia: vem de redundância, backup e proteção contra negação de serviço.',
    'MAC não dá não repúdio porque a chave é compartilhada. AES-GCM cifra e autentica.',
    'Hash isolado só protege contra erro acidental.',
    'Simétrica (uma chave, rápida), assimétrica (par de chaves, assinaturas), hash (resumo sem chave).',
  ],
};
