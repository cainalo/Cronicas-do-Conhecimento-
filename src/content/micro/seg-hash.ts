// Microaula "Funções hash, MAC e senhas" (cap.seg.01, seção hash), no formato aprovado em 24/10/2026.
// Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto do
// capítulo (04-hash.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegHash: MicroLesson = {
  id: 'micro.seg.hash',
  chapterId: 'cap.seg.01',
  sectionId: 'hash',
  title: 'Funções hash, MAC e senhas',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você baixou o instalador de um sistema e o site publica um código de 64 caracteres ao lado do link. Para que ele serve?',
    options: [
      { text: 'Para conferir se o arquivo baixado é exatamente o publicado', why: 'Isso. Você calcula o resumo do arquivo e compara com o publicado: é o uso mais simples do hash.' },
      { text: 'É a senha para abrir o instalador', why: 'Não é senha: é um resumo do arquivo, para conferir a integridade.' },
      { text: 'Serve para decifrar o arquivo', why: 'O arquivo não está cifrado. O código é um resumo, e resumo não se "decifra".' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'resumo',
      part: 'O que é',
      title: 'Um resumo de tamanho fixo, sem volta',
      goal: 'Saber o que uma função hash produz e o que ela não faz.',
      explain:
        'Uma **função hash criptográfica** recebe uma entrada de **qualquer tamanho** e produz um **resumo** (*digest*) de **tamanho fixo**.\n\nEla **não usa chave** e **não pode ser revertida**: não existe "decifrar um hash".',
      example: '```\n"Tribunal de Contas"\n   ▼ SHA-256\n256 bits (64 dígitos hexadecimais)\n\n"Tribunal de contas"  (só o "c" mudou)\n   ▼ SHA-256\noutros 256 bits, completamente diferentes\n```',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: 'Você calcula o SHA-256 de uma palavra e depois de um disco inteiro. Os resumos têm:',
        options: [
          { text: 'O mesmo tamanho: 256 bits', why: 'Isso. O resumo tem sempre o mesmo comprimento.' },
          { text: 'Tamanhos proporcionais à entrada', why: 'O tamanho do resumo é fixo, qualquer que seja a entrada.' },
          { text: 'O disco não pode ter hash', why: 'Pode: a entrada pode ter qualquer tamanho.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **impressão digital**: uma pessoa de qualquer tamanho deixa uma digital do mesmo tamanho, e pela digital não se reconstrói a pessoa. O hash é a digital dos dados: tamanho fixo e sem caminho de volta.',
        check: {
          kind: 'multi',
          id: 're-r',
          prompt: 'Marque o que é verdade sobre a função hash.',
          options: [
            { text: 'Produz resumo de tamanho fixo', correct: true, why: 'Sempre.' },
            { text: 'Não usa chave', correct: true, why: 'Hash puro não tem chave.' },
            { text: 'Pode ser revertida com a chave certa', correct: false, why: 'Não há chave nem volta.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'propriedades',
      part: 'Propriedades',
      title: 'Determinismo e efeito avalanche',
      goal: 'Reconhecer determinismo, tamanho fixo e efeito avalanche.',
      explain:
        '| Propriedade | O que significa |\n|---|---|\n| **Determinismo** | A mesma entrada sempre gera o mesmo resumo |\n| **Tamanho fixo** | O resumo tem sempre o mesmo comprimento |\n| **Efeito avalanche** | Uma alteração mínima na entrada muda drasticamente o resumo |',
      check: {
        kind: 'choice',
        id: 'pr-c',
        prompt: 'Trocar só uma letra do texto mudou quase todo o resumo. Que propriedade é essa?',
        options: [
          { text: 'Efeito avalanche', why: 'Isso.' },
          { text: 'Determinismo', why: 'Determinismo é a mesma entrada dar sempre o mesmo resumo.' },
          { text: 'Tamanho fixo', why: 'Tamanho fixo fala do comprimento do resumo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Separe pelas perguntas. **Mesma entrada, mesmo resumo?** Determinismo. **Sempre o mesmo comprimento?** Tamanho fixo. **Mudou um pouco a entrada e o resumo mudou todo?** Avalanche.',
        check: {
          kind: 'sort',
          id: 'pr-r',
          prompt: 'Classifique cada observação.',
          categories: ['Determinismo', 'Tamanho fixo', 'Efeito avalanche'],
          items: [
            { text: 'Calculei duas vezes o hash do mesmo arquivo e deu igual', cat: 0, why: 'Mesma entrada, mesmo resumo.' },
            { text: 'Uma letra e um disco deram resumos de 256 bits', cat: 1, why: 'Comprimento constante.' },
            { text: 'Mudei uma vírgula e o resumo mudou quase todo', cat: 2, why: 'Pequena mudança, grande efeito.' },
          ],
        },
      },
    },
    {
      id: 'resistencias',
      part: 'Propriedades',
      title: 'As três resistências',
      goal: 'Diferenciar pré-imagem, segunda pré-imagem e colisão.',
      explain:
        '| Resistência | É inviável... |\n|---|---|\n| **À pré-imagem** (mão única) | dado um resumo **h**, achar uma entrada **m** com hash(m) = h |\n| **À segunda pré-imagem** | dada uma entrada **m1**, achar outra **m2** com o mesmo resumo |\n| **A colisões** | achar **quaisquer** duas entradas diferentes com o mesmo resumo |\n\n**Colisões sempre existem** (infinitas entradas, resumos finitos). O que se exige é que seja **inviável encontrá-las**.',
      check: {
        kind: 'choice',
        id: 'rs-c',
        prompt: 'Um atacante tem só o resumo de uma senha e tenta achar uma entrada que gere esse resumo. Ele ataca a resistência:',
        options: [
          { text: 'À pré-imagem', why: 'Isso: parte do resumo e procura uma entrada.' },
          { text: 'A colisões', why: 'Na colisão o atacante escolhe livremente as duas entradas; aqui o resumo já está dado.' },
          { text: 'À segunda pré-imagem', why: 'Na segunda pré-imagem parte-se de uma entrada conhecida, não de um resumo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Veja **o que o atacante recebe**. Só o **resumo**? Pré-imagem. Uma **entrada** e precisa de outra igual a ela? Segunda pré-imagem. **Nada**, e pode escolher as duas entradas à vontade? Colisão.',
        check: {
          kind: 'tf',
          id: 'rs-r',
          prompt: 'Uma boa função hash é aquela em que colisões não existem.',
          answer: false,
          why: 'Falso. Colisões sempre existem; exige-se que seja inviável encontrá-las.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'algoritmos',
      part: 'Algoritmos',
      title: 'MD5, SHA-1, SHA-2 e SHA-3',
      goal: 'Saber o tamanho e a situação de cada algoritmo.',
      explain:
        '| Algoritmo | Resumo | Situação |\n|---|---|---|\n| **MD5** | 128 bits | **Quebrado** para colisões. Não usar para segurança |\n| **SHA-1** | 160 bits | **Quebrado** (colisão prática em 2017). Descontinuado |\n| **SHA-2** (SHA-224, **SHA-256**, SHA-384, SHA-512) | 224 a 512 bits | **Seguro** e muito usado (FIPS 180-4) |\n| **SHA-3** (Keccak) | 224 a 512 bits | **Seguro**; construção diferente, "esponja" (FIPS 202) |',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'Qual associação está correta?',
        options: [
          { text: 'SHA-1: 160 bits, quebrado para colisões', why: 'Isso.' },
          { text: 'MD5: 256 bits, seguro', why: 'O MD5 tem 128 bits e está quebrado.' },
          { text: 'SHA-256: 160 bits, descontinuado', why: 'O SHA-256 tem 256 bits e é seguro.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Os dois mais velhos **caíram**: **MD5 (128)** e **SHA-1 (160)**. Os seguros são as famílias **SHA-2** e **SHA-3**, de 224 a 512 bits. Dica: no SHA-256, o número é o tamanho do resumo.',
        check: {
          kind: 'sort',
          id: 'al-r',
          prompt: 'Classifique.',
          categories: ['Quebrado', 'Seguro'],
          items: [
            { text: 'MD5', cat: 0, why: 'Colisões encontradas.' },
            { text: 'SHA-1', cat: 0, why: 'Colisão prática em 2017.' },
            { text: 'SHA-256', cat: 1, why: 'Família SHA-2.' },
            { text: 'SHA-3', cat: 1, why: 'Keccak, padronizado.' },
          ],
        },
      },
    },
    {
      id: 'usos',
      part: 'Usos',
      title: 'Para que serve, e o que não é',
      goal: 'Listar os usos do hash e rejeitar a ideia de que ele dá sigilo.',
      explain:
        'Usos do hash:\n\n1. **integridade** de arquivos baixados (comparar o resumo publicado com o calculado);\n2. **assinatura digital**: assina-se o **hash** da mensagem, não a mensagem inteira;\n3. **armazenamento de senhas** (com cuidados especiais);\n4. estruturas de dados, blockchain, deduplicação.\n\n**Hash não é criptografia:** não tem chave, não esconde a mensagem de forma recuperável e não é reversível.',
      check: {
        kind: 'choice',
        id: 'us-c',
        prompt: 'Qual afirmação é falsa?',
        options: [
          { text: 'O hash garante a confidencialidade da mensagem', why: 'É falsa, por isso é a resposta: hash não esconde a mensagem de forma recuperável.' },
          { text: 'O hash ajuda a verificar a integridade de um arquivo baixado', why: 'Verdadeira: é o uso mais comum.' },
          { text: 'Na assinatura digital, assina-se o hash da mensagem', why: 'Verdadeira.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre da impressão digital: ela serve para **conferir** quem é, não para **guardar segredo**. O hash confere integridade, entra na assinatura e ajuda com senhas, mas não é cofre: não dá sigilo nem tem chave para "abrir".',
        check: {
          kind: 'multi',
          id: 'us-r',
          prompt: 'Para que o hash é usado? Marque todas.',
          options: [
            { text: 'Conferir a integridade de arquivos', correct: true, why: 'Compara-se o resumo.' },
            { text: 'Fazer parte da assinatura digital', correct: true, why: 'Assina-se o hash.' },
            { text: 'Esconder o conteúdo para depois recuperá-lo', correct: false, why: 'Isso é cifragem, não hash.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'hmac',
      part: 'MAC e HMAC',
      title: 'Hash com chave: MAC e HMAC',
      goal: 'Saber o que o HMAC garante e o que não garante.',
      explain:
        'Um **MAC** é calculado a partir da mensagem **e de uma chave secreta compartilhada**. O **HMAC** é o MAC baseado em hash, como o **HMAC-SHA256**.\n\n| Garante | Não garante |\n|---|---|\n| **Integridade** | **Confidencialidade** (a mensagem segue em claro) |\n| **Autenticidade** entre quem tem a chave | **Não repúdio** (as duas partes conhecem a chave) |',
      check: {
        kind: 'choice',
        id: 'hm-c',
        prompt: 'Dois sistemas com uma chave em comum querem saber se a mensagem não foi alterada e veio do outro, sem precisar de sigilo. O mais adequado é:',
        options: [
          { text: 'HMAC', why: 'Isso: integridade e autenticidade entre quem tem a chave.' },
          { text: 'Hash simples, sem chave', why: 'Sem chave, qualquer um recalcula o hash de uma mensagem alterada.' },
          { text: 'Cifrar com AES em ECB', why: 'Cifrar dá sigilo, que não foi pedido, e o ECB nem autentica.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O hash simples é uma **digital que qualquer um tira**: um atacante muda a mensagem e recalcula. No **HMAC** entra uma **chave secreta**: sem ela, não dá para gerar um valor válido. Mas as duas partes têm a chave, então nenhuma prova a terceiros quem enviou (sem não repúdio), e o texto continua legível.',
        check: {
          kind: 'sort',
          id: 'hm-r',
          prompt: 'O HMAC garante ou não?',
          categories: ['Garante', 'Não garante'],
          items: [
            { text: 'Integridade', cat: 0, why: 'Detecta alteração.' },
            { text: 'Autenticidade entre as partes', cat: 0, why: 'Só quem tem a chave gera.' },
            { text: 'Confidencialidade', cat: 1, why: 'A mensagem segue em claro.' },
            { text: 'Não repúdio', cat: 1, why: 'As duas partes têm a chave.' },
          ],
        },
      },
    },
    {
      id: 'senhas-problema',
      part: 'Senhas',
      title: 'Por que SHA-256(senha) não basta',
      goal: 'Explicar o problema de guardar só o hash rápido da senha.',
      explain:
        'Guardar senhas em **texto claro** é inaceitável.\n\nGuardar só **SHA-256(senha)** também é **insuficiente**:\n\n- hashes de propósito geral são **rápidos**, o que favorece ataques de **dicionário** e **força bruta**;\n- **senhas iguais** gerariam **resumos iguais**.',
      check: {
        kind: 'choice',
        id: 'sp-c',
        prompt: 'Por que a rapidez do SHA-256 é um problema para guardar senhas?',
        options: [
          { text: 'Porque permite ao atacante testar muitas senhas por segundo', why: 'Isso: favorece dicionário e força bruta.' },
          { text: 'Porque o SHA-256 está quebrado', why: 'O SHA-256 é seguro; o problema aqui é ser rápido.' },
          { text: 'Porque a rapidez revela a senha diretamente', why: 'Não revela diretamente: facilita tentar muitas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Quem rouba o banco de hashes tenta **adivinhar**: calcula o hash de "123456", de "senha", de milhões de palavras, e compara. Se cada cálculo é **rapidíssimo**, testa bilhões. E se duas pessoas usam a mesma senha, o hash igual entrega as duas de uma vez.',
        check: {
          kind: 'multi',
          id: 'sp-r',
          prompt: 'Quais são problemas de guardar só SHA-256(senha)? Marque todos.',
          options: [
            { text: 'O cálculo é rápido e favorece força bruta', correct: true, why: 'Hash de propósito geral é rápido.' },
            { text: 'Senhas iguais geram resumos iguais', correct: true, why: 'Sem nada que diferencie cada usuário.' },
            { text: 'O SHA-256 pode ser decifrado com a chave', correct: false, why: 'Hash não tem chave nem decifragem.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'senhas-boas',
      part: 'Senhas',
      title: 'Sal, funções lentas e pimenta',
      goal: 'Aplicar as boas práticas da OWASP para guardar senhas.',
      explain:
        'Boas práticas (OWASP *Password Storage Cheat Sheet*):\n\n- **Sal** (*salt*): valor **aleatório e único por usuário**, guardado junto ao hash. Faz senhas iguais darem resumos diferentes e inutiliza tabelas pré-computadas (*rainbow tables*).\n- **Funções lentas e adaptativas**, próprias para senhas: **Argon2id** (preferencial), **scrypt**, **bcrypt** ou **PBKDF2**, com fator de trabalho configurável.\n- **Pimenta** (*pepper*), opcional: segredo extra guardado **fora do banco**.',
      check: {
        kind: 'choice',
        id: 'sb-c',
        prompt: 'Qual é a prática mais adequada para guardar senhas?',
        options: [
          { text: 'Argon2id com sal único por usuário', why: 'Isso: função lenta e própria para senhas, mais sal.' },
          { text: 'SHA-256 sem sal', why: 'Rápido demais e senhas iguais ficam iguais.' },
          { text: 'MD5 com sal', why: 'O MD5 é rápido e quebrado; o certo é uma função lenta para senhas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Três ingredientes. **Sal**: um tempero diferente para cada usuário, para que senhas iguais não fiquem iguais. **Função lenta** (Argon2id, scrypt, bcrypt, PBKDF2): cada tentativa do atacante custa caro. **Pimenta**: um segredo extra que nem está no banco.',
        check: {
          kind: 'sort',
          id: 'sb-r',
          prompt: 'Ligue cada técnica ao que ela faz.',
          categories: ['Sal', 'Função lenta', 'Pimenta'],
          items: [
            { text: 'Senhas iguais passam a ter resumos diferentes', cat: 0, why: 'Valor aleatório por usuário.' },
            { text: 'Cada tentativa de adivinhar fica cara', cat: 1, why: 'Fator de trabalho configurável.' },
            { text: 'Segredo extra guardado fora do banco', cat: 2, why: 'Pepper.' },
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
      lines: ['SHA-256: resumo de 256 bits, seguro', 'HMAC: integridade e autenticidade entre as partes', 'Hash: dá para decifrar com a chave adequada'],
      bug: 2,
      why: 'Hash não tem chave e não é reversível.',
      fixed: 'Hash: não tem chave e não pode ser revertido',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O sistema do órgão vai guardar as senhas dos servidores. Qual projeto?',
      scenarios: [
        { title: 'Projeto A', body: 'Guardar SHA-1(senha), sem sal, para o login ficar rápido.' },
        { title: 'Projeto B', body: 'Guardar o resultado do bcrypt com sal único por usuário.' },
      ],
      answer: 1,
      why: 'O SHA-1 é rápido e quebrado, e sem sal senhas iguais aparecem iguais. O bcrypt é lento de propósito e o sal diferencia cada usuário.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: alguém altera um relatório e recalcula o SHA-256 dele, publicando o novo resumo no lugar do antigo. O que teria impedido isso?',
      options: [
        { text: 'Um HMAC, com chave que o atacante não tem', why: 'Isso: sem a chave, ele não gera um valor válido.' },
        { text: 'Usar SHA-512 no lugar do SHA-256', why: 'Qualquer hash sem chave pode ser recalculado por quem alterou.' },
        { text: 'Calcular o hash duas vezes', why: 'Continua sem chave: o atacante faz o mesmo.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-4',
      prompt: 'Ordene do jeito MENOS seguro ao MAIS seguro de guardar senhas.',
      items: ['Texto claro', 'SHA-256(senha) sem sal', 'SHA-256 com sal único', 'Argon2id com sal único'],
      why: 'Texto claro é inaceitável; hash rápido sem sal deixa senhas iguais iguais; o sal resolve isso; a função lenta ainda encarece cada tentativa.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.011' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.012' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.013' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.014' },
  ],
  summary: [
    'Hash: entrada de qualquer tamanho, resumo de tamanho fixo, sem chave e sem volta.',
    'Determinismo, tamanho fixo, efeito avalanche; resistências à pré-imagem, à segunda pré-imagem e a colisões.',
    'Colisões sempre existem: exige-se que seja inviável encontrá-las.',
    'MD5 (128) e SHA-1 (160) quebrados; SHA-2 e SHA-3 seguros.',
    'Usos: integridade, assinatura (assina-se o hash), senhas. Hash não dá sigilo.',
    'HMAC: hash com chave secreta; integridade e autenticidade, sem sigilo e sem não repúdio.',
    'Senhas: sal único, função lenta (Argon2id, scrypt, bcrypt, PBKDF2) e, opcional, pimenta.',
  ],
};
