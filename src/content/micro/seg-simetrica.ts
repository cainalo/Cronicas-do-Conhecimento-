// Microaula "Criptografia simétrica" (cap.seg.01, seção simetrica), no formato aprovado em 24/10/2026.
// Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto do
// capítulo (02-simetrica.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegSimetrica: MicroLesson = {
  id: 'micro.seg.simetrica',
  chapterId: 'cap.seg.01',
  sectionId: 'simetrica',
  title: 'Criptografia simétrica',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Ana tranca um arquivo com uma senha e quer que Bruno, em outra cidade, consiga abrir. Qual é o primeiro problema?',
    options: [
      { text: 'Fazer a senha chegar a Bruno sem que ninguém a intercepte', why: 'Isso. Se os dois usam o mesmo segredo, ele precisa chegar ao outro lado em segurança. É o problema central desta aula.' },
      { text: 'O arquivo ficar grande demais para trancar', why: 'Trancar arquivos grandes não é o problema: esse tipo de cifra é rápido. O difícil é entregar o segredo.' },
      { text: 'Nenhum: basta mandar a senha junto com o arquivo', why: 'Se a senha vai junto, quem interceptar o arquivo também abre. O segredo precisa de outro caminho.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ideia',
      part: 'A ideia',
      title: 'Uma chave só, dos dois lados',
      goal: 'Reconhecer que na simétrica a mesma chave cifra e decifra.',
      explain:
        'Na criptografia **simétrica** (ou **de chave secreta**), **a mesma chave** cifra e decifra.\n\nPor isso, remetente e destinatário precisam **ter a chave antes** de se comunicar.',
      example: '```\nTexto claro\n   │  cifrar com a chave K\n   ▼\nTexto cifrado\n   │  decifrar com a MESMA chave K\n   ▼\nTexto claro\n```',
      check: {
        kind: 'tf',
        id: 'id-c',
        prompt: 'Na criptografia simétrica, uma chave cifra e outra chave, diferente, decifra.',
        answer: false,
        why: 'Falso. Na simétrica é a mesma chave nos dois sentidos. Par de chaves diferentes é coisa da assimétrica.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cadeado com uma única chave**: quem tranca e quem abre usam a mesma chave. Por isso ela também se chama criptografia **de chave secreta**: os dois lados guardam o mesmo segredo.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'Bruno recebeu um arquivo cifrado com AES pela chave K. Com que chave ele decifra?',
          options: [
            { text: 'Com a mesma chave K', why: 'Isso: simétrica, mesma chave.' },
            { text: 'Com uma chave pública de Ana', why: 'Chave pública pertence à assimétrica.' },
            { text: 'Sem chave nenhuma', why: 'Sem a chave, decifrar é exatamente o que a cifra impede.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'vantagem',
      part: 'A ideia',
      title: 'A grande vantagem: velocidade',
      goal: 'Saber por que a simétrica é usada para grandes volumes de dados e onde aparece.',
      explain:
        'A simétrica é **muito rápida** e eficiente. Por isso é a escolha para **grandes volumes de dados**.\n\nOnde ela aparece:\n\n- criptografia de **disco e arquivos** (BitLocker e LUKS usam AES);\n- a **sessão** de um canal TLS/HTTPS, depois que as chaves são combinadas;\n- **VPNs** (IPsec, WireGuard), para cifrar o tráfego.',
      check: {
        kind: 'choice',
        id: 'va-c',
        prompt: 'O órgão quer cifrar todos os discos dos notebooks. Que tipo de criptografia faz esse trabalho pesado?',
        options: [
          { text: 'Simétrica, por ser rápida para grandes volumes', why: 'Isso. BitLocker e LUKS usam AES, uma cifra simétrica.' },
          { text: 'Nenhuma: disco não se cifra', why: 'Cifra-se, sim: BitLocker e LUKS fazem isso.' },
          { text: 'Simétrica só para arquivos pequenos', why: 'É o contrário: ela é justamente a adequada para grandes volumes.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Guarde assim: **volume grande pede simétrica**. Disco inteiro, arquivos, tráfego de VPN e a parte longa de uma conexão HTTPS: tudo isso é cifrado com chave simétrica, porque ela é rápida.',
        check: {
          kind: 'multi',
          id: 'va-r',
          prompt: 'Onde a criptografia simétrica é usada? Marque todas.',
          options: [
            { text: 'Criptografia de disco (BitLocker, LUKS)', correct: true, why: 'Usam AES.' },
            { text: 'Tráfego de VPN (IPsec, WireGuard)', correct: true, why: 'O tráfego é cifrado com chave simétrica.' },
            { text: 'A sessão de uma conexão HTTPS, depois de combinadas as chaves', correct: true, why: 'A sessão usa chave simétrica.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'distribuicao',
      part: 'Limitações',
      title: 'Como entregar a chave?',
      goal: 'Explicar o problema da distribuição de chaves e por que não há não repúdio.',
      explain:
        '**Limitação 1, a distribuição de chaves:** como fazer a chave chegar ao outro lado **sem que alguém a intercepte**? Esse é o problema que a criptografia **assimétrica** veio resolver.\n\n**Limitação 2, o não repúdio:** como as duas partes **compartilham** a chave, qualquer uma delas poderia ter cifrado a mensagem. A simétrica **não oferece não repúdio**.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Por que a criptografia simétrica não oferece não repúdio?',
        options: [
          { text: 'Porque as duas partes conhecem a mesma chave', why: 'Isso. Se ambos têm a chave, não dá para provar qual dos dois produziu a mensagem.' },
          { text: 'Porque ela é lenta', why: 'Ela é rápida; a velocidade não tem relação com não repúdio.' },
          { text: 'Porque ela não cifra a mensagem', why: 'Ela cifra, sim. O problema é a chave ser compartilhada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um **cofre com duas cópias da chave**, uma com Ana e outra com Bruno. Se algo aparece dentro do cofre, ninguém consegue provar a um terceiro **quem** colocou: os dois podiam abrir. É isso que impede o não repúdio. E para entregar a cópia a Bruno, alguém teria de levá-la sem ser interceptado: é a distribuição de chaves.',
        check: {
          kind: 'tf',
          id: 'di-r',
          prompt: 'O problema de levar a chave secreta ao outro lado com segurança foi o que a criptografia assimétrica veio resolver.',
          answer: true,
          why: 'Verdadeiro. É a limitação da distribuição de chaves.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'escala',
      part: 'Limitações',
      title: 'Quantas chaves para muita gente?',
      goal: 'Calcular o número de chaves com a fórmula n(n − 1) / 2.',
      explain:
        '**Limitação 3, a escalabilidade:** cada **par** de pessoas que quer sigilo entre si precisa de **uma chave própria**.\n\nPara **n** participantes, são necessárias **n(n − 1) / 2** chaves.',
      example: '10 pessoas → 10 × 9 / 2 = **45 chaves**.\n\n100 pessoas → 100 × 99 / 2 = **4.950 chaves**.',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'Seis setores querem sigilo exclusivo entre cada par usando só criptografia simétrica. Quantas chaves?',
        options: [
          { text: '15', why: 'Isso: 6 × 5 / 2 = 15.' },
          { text: '30', why: '30 é 6 × 5, sem dividir por 2. Cada chave serve aos dois lados do par.' },
          { text: '6', why: 'Uma chave por setor não basta: cada par precisa da sua.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte os **pares**: com 4 pessoas (A, B, C, D), os pares são AB, AC, AD, BC, BD e CD, **6 chaves**. A fórmula faz a mesma conta: 4 × 3 / 2 = 6. Multiplica-se n por (n − 1) e **divide-se por 2**, porque o par AB é o mesmo que BA.',
        check: {
          kind: 'choice',
          id: 'es-r',
          prompt: 'E com 5 pessoas?',
          options: [
            { text: '10', why: 'Isso: 5 × 4 / 2 = 10.' },
            { text: '20', why: 'Faltou dividir por 2.' },
            { text: '25', why: '25 é 5 × 5; a fórmula usa n − 1 e divide por 2.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'bloco-fluxo',
      part: 'Tipos de cifra',
      title: 'Cifra de bloco e cifra de fluxo',
      goal: 'Diferenciar cifra de bloco de cifra de fluxo e dar exemplos.',
      explain:
        '| Tipo | Como funciona | Exemplos |\n|---|---|---|\n| **Bloco** | Processa a mensagem em **blocos de tamanho fixo** (no AES, 128 bits) | DES, 3DES, AES, Blowfish, Twofish |\n| **Fluxo** | Gera uma sequência pseudoaleatória (*keystream*) e a combina, normalmente por **XOR**, com cada bit ou byte | RC4, ChaCha20 |',
      check: {
        kind: 'sort',
        id: 'bf-c',
        prompt: 'Classifique cada algoritmo.',
        categories: ['Bloco', 'Fluxo'],
        items: [
          { text: 'AES', cat: 0, why: 'Blocos de 128 bits.' },
          { text: 'ChaCha20', cat: 1, why: 'Cifra de fluxo moderna.' },
          { text: 'DES', cat: 0, why: 'Blocos de 64 bits.' },
          { text: 'RC4', cat: 1, why: 'Cifra de fluxo (hoje insegura).' },
        ],
      },
      recovery: {
        explain: 'Pense em **caixas** e numa **torneira**. A cifra de **bloco** corta a mensagem em caixas do mesmo tamanho e cifra cada caixa. A de **fluxo** é uma torneira de bits aleatórios misturada, bit a bit, com o texto. AES e DES são de caixas; RC4 e ChaCha20 são de torneira.',
        check: {
          kind: 'choice',
          id: 'bf-r',
          prompt: 'Uma cifra combina uma sequência pseudoaleatória com cada byte do texto por XOR. Ela é:',
          options: [
            { text: 'De fluxo', why: 'Isso: keystream combinado por XOR.' },
            { text: 'De bloco', why: 'A de bloco processa blocos de tamanho fixo.' },
            { text: 'Assimétrica', why: 'Ainda é simétrica; o que muda é o modo de processar.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'algoritmos',
      part: 'Algoritmos',
      title: 'Quem está em uso e quem caiu',
      goal: 'Saber a situação de DES, 3DES, AES, ChaCha20 e RC4.',
      explain:
        '| Algoritmo | Tipo | Situação |\n|---|---|---|\n| **DES** | Bloco | **Inseguro**: chave de 56 bits efetivos, quebrável por força bruta |\n| **3DES** | Bloco | **Legado**, descontinuado pelo NIST |\n| **AES** | Bloco | **Padrão atual** (NIST FIPS 197, 2001) |\n| **ChaCha20** | Fluxo | Moderno, usado no TLS 1.3 e comum em celulares |\n| **RC4** | Fluxo | **Inseguro**, proibido no TLS |',
      check: {
        kind: 'choice',
        id: 'al-c',
        prompt: 'Qual destes é o padrão atual de cifra simétrica?',
        options: [
          { text: 'AES', why: 'Isso: padrão do NIST desde 2001 (FIPS 197).' },
          { text: 'DES', why: 'O DES é inseguro: chave de 56 bits.' },
          { text: 'RC4', why: 'O RC4 é inseguro e proibido no TLS.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Separe em três grupos. **Caíram:** DES (chave curta) e RC4. **Legado:** 3DES, descontinuado. **Em uso:** AES (padrão) e ChaCha20 (moderno).',
        check: {
          kind: 'sort',
          id: 'al-r',
          prompt: 'Classifique.',
          categories: ['Inseguro', 'Legado', 'Em uso'],
          items: [
            { text: 'DES', cat: 0, why: '56 bits efetivos.' },
            { text: 'RC4', cat: 0, why: 'Proibido no TLS.' },
            { text: '3DES', cat: 1, why: 'Descontinuado pelo NIST.' },
            { text: 'AES', cat: 2, why: 'Padrão atual.' },
          ],
        },
      },
    },
    {
      id: 'aes',
      part: 'Algoritmos',
      title: 'AES e 3DES em detalhe',
      goal: 'Saber o bloco e as chaves do AES e como funciona o 3DES.',
      explain:
        '**AES:** o NIST o escolheu em concurso público, e o vencedor foi o algoritmo **Rijndael**. O **bloco é fixo, de 128 bits**. O que varia é o **tamanho da chave**: 128, 192 ou 256 bits, com 10, 12 ou 14 rodadas.\n\n**3DES:** aplica o DES **três vezes** (cifrar, decifrar, cifrar: "EDE"). Com três chaves, a chave nominal é de 168 bits, mas a segurança efetiva é menor por causa do ataque *meet-in-the-middle*.',
      check: {
        kind: 'choice',
        id: 'ae-c',
        prompt: 'No AES-256, o número 256 indica:',
        options: [
          { text: 'O tamanho da chave, em bits', why: 'Isso. O bloco continua de 128 bits.' },
          { text: 'O tamanho do bloco, em bits', why: 'O bloco do AES é sempre de 128 bits.' },
          { text: 'O número de rodadas', why: 'Com chave de 256 bits são 14 rodadas.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No AES, o número no nome fala da **chave**, nunca do bloco. AES-128, AES-192 e AES-256 cifram todos **blocos de 128 bits**; muda só a chave (e o número de rodadas: 10, 12, 14).',
        check: {
          kind: 'choice',
          id: 'ae-r',
          prompt: 'No AES-192, quais são o bloco e a chave?',
          options: [
            { text: 'Bloco de 128 bits e chave de 192 bits', why: 'Isso.' },
            { text: 'Bloco de 192 bits e chave de 192 bits', why: 'O bloco é sempre 128.' },
            { text: 'Bloco de 64 bits e chave de 192 bits', why: '64 bits é o bloco do DES e do 3DES.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ecb-cbc',
      part: 'Modos de operação',
      title: 'ECB e CBC',
      goal: 'Explicar por que o ECB revela padrões e o que o CBC faz diferente.',
      explain:
        'Uma cifra de bloco sozinha cifra **um** bloco. Para mensagens maiores, usa-se um **modo de operação**.\n\n| Modo | Ideia | Atenção |\n|---|---|---|\n| **ECB** | Cada bloco é cifrado **isoladamente** com a mesma chave | **Blocos iguais geram cifrados iguais**: revela padrões. Não usar para dados reais |\n| **CBC** | Cada bloco é combinado (XOR) com o **cifrado anterior**; o primeiro usa um **IV** | O IV deve ser **imprevisível**. Não dá para cifrar em paralelo |',
      example: 'O exemplo famoso: a imagem de um **pinguim** cifrada em ECB continua reconhecível, porque as áreas da mesma cor viram blocos cifrados iguais.',
      check: {
        kind: 'choice',
        id: 'ec-c',
        prompt: 'Após cifrar uma imagem, os contornos ainda aparecem no arquivo cifrado. Qual modo foi usado?',
        options: [
          { text: 'ECB', why: 'Isso. Blocos iguais viram cifrados iguais, e o desenho aparece.' },
          { text: 'CBC', why: 'No CBC cada bloco depende do anterior, o que esconde as repetições.' },
          { text: 'Nenhum: toda cifra mostra contornos', why: 'Só o ECB vaza padrões assim.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'No **ECB**, cada bloco é cifrado sozinho: o mesmo pedaço de texto sempre vira o mesmo pedaço cifrado, como um dicionário. No **CBC**, cada bloco é misturado com o resultado do anterior (e o primeiro, com o IV), então pedaços iguais ficam diferentes depois de cifrados.',
        check: {
          kind: 'tf',
          id: 'ec-r',
          prompt: 'O modo ECB é recomendado por ser simples e permitir paralelismo.',
          answer: false,
          why: 'Falso, e é pegadinha clássica: o ECB vaza padrões do texto claro e não deve ser usado para dados reais.',
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ctr-gcm',
      part: 'Modos de operação',
      title: 'CTR e GCM',
      goal: 'Saber o que CTR e GCM oferecem e o cuidado com o nonce.',
      explain:
        '| Modo | Ideia | Atenção |\n|---|---|---|\n| **CTR** | Cifra um **contador** e faz XOR com o texto; na prática, vira cifra de fluxo | Pode ser feito **em paralelo**; **nunca repetir** o par chave + contador (*nonce*) |\n| **GCM** | **CTR + autenticação** | Cifragem autenticada (**AEAD**): confidencialidade **e** integridade e autenticidade. Padrão no TLS |',
      check: {
        kind: 'choice',
        id: 'cg-c',
        prompt: 'Um sistema precisa, com um único mecanismo, manter o sigilo e detectar adulteração. Qual modo?',
        options: [
          { text: 'GCM', why: 'Isso: cifragem autenticada (AEAD).' },
          { text: 'ECB', why: 'O ECB não autentica e ainda vaza padrões.' },
          { text: 'CTR puro', why: 'O CTR sozinho dá sigilo, mas não detecta adulteração. O GCM acrescenta a autenticação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **GCM** como o **CTR com lacre**: o CTR esconde o conteúdo; o lacre (autenticação) mostra se alguém mexeu. Por isso o GCM entrega as duas coisas de uma vez e é o padrão no TLS. No CTR, o cuidado é nunca repetir o contador com a mesma chave.',
        check: {
          kind: 'sort',
          id: 'cg-r',
          prompt: 'Ligue cada modo à sua característica.',
          categories: ['ECB', 'CBC', 'CTR', 'GCM'],
          items: [
            { text: 'Blocos iguais geram cifrados iguais', cat: 0, why: 'Vaza padrões.' },
            { text: 'Usa um IV imprevisível e encadeia os blocos', cat: 1, why: 'Cifragem sequencial.' },
            { text: 'Nunca repetir chave + contador', cat: 2, why: 'O nonce não pode se repetir.' },
            { text: 'Sigilo e integridade juntos (AEAD)', cat: 3, why: 'Cifragem autenticada.' },
          ],
        },
      },
    },
    {
      id: 'forca-bruta',
      part: 'Tamanho de chave',
      title: 'Cada bit dobra o trabalho',
      goal: 'Entender por que 56 e 128 bits são mundos diferentes.',
      explain:
        'Uma chave de **k** bits tem **2^k** possibilidades. Cada bit a mais **dobra** o esforço de força bruta (testar todas as chaves).\n\n| Chave | Possibilidades |\n|---|---|\n| DES, 56 bits | ≈ 7,2 × 10^16, viáveis com hardware dedicado |\n| AES, 128 bits | ≈ 3,4 × 10^38 |\n\nA diferença não é "duas vezes e pouco": é gigantesca.',
      check: {
        kind: 'choice',
        id: 'fb-c',
        prompt: 'Passar de uma chave de 56 bits para uma de 57 bits:',
        options: [
          { text: 'Dobra o esforço de força bruta', why: 'Isso: 2^57 é o dobro de 2^56.' },
          { text: 'Aumenta o esforço em 1 tentativa', why: 'Um bit a mais dobra o total de chaves possíveis.' },
          { text: 'Não muda nada', why: 'Muda: cada bit dobra as possibilidades.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Com **1 bit** há 2 chaves; com **2 bits**, 4; com **3 bits**, 8. Cada bit novo **dobra** a lista. De 56 para 128 bits são 72 dobras seguidas, por isso o AES está longe do alcance da força bruta que derrubou o DES.',
        check: {
          kind: 'tf',
          id: 'fb-r',
          prompt: 'Uma chave de 128 bits é só um pouco mais de duas vezes mais difícil de quebrar por força bruta do que uma de 56 bits.',
          answer: false,
          why: 'Falso. São 2^72 vezes mais chaves: a diferença é gigantesca.',
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'multi',
      id: 'cons-1',
      prompt: 'Quais afirmações sobre a criptografia simétrica estão corretas? Marque todas.',
      options: [
        { text: 'A mesma chave cifra e decifra', correct: true, why: 'É a definição.' },
        { text: 'É rápida, adequada para grandes volumes', correct: true, why: 'Por isso cifra discos e tráfego.' },
        { text: 'Oferece não repúdio', correct: false, why: 'Não: a chave é compartilhada.' },
        { text: 'Precisa de uma chave por par de participantes', correct: true, why: 'Daí n(n − 1) / 2.' },
      ],
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação de estudo tem um erro. Toque na linha errada.',
      lines: ['AES: bloco de 128 bits; chave de 128, 192 ou 256 bits', 'DES: chave de 56 bits efetivos, inseguro', 'ECB: recomendado por permitir paralelismo'],
      bug: 2,
      why: 'O ECB não é recomendado: blocos iguais geram cifrados iguais e o padrão vaza.',
      fixed: 'ECB: blocos iguais geram cifrados iguais; não usar para dados reais',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: 20 unidades querem sigilo exclusivo entre cada par, só com chave simétrica. Quantas chaves?',
      options: [
        { text: '190', why: 'Isso: 20 × 19 / 2 = 190.' },
        { text: '380', why: 'Faltou dividir por 2.' },
        { text: '20', why: 'Uma por unidade não basta: é uma por par.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'Para cifrar o tráfego de uma VPN que também precisa detectar adulteração, qual configuração é melhor?',
      scenarios: [
        { title: 'Configuração A', body: 'AES em modo ECB.' },
        { title: 'Configuração B', body: 'AES em modo GCM.' },
      ],
      answer: 1,
      why: 'O GCM é cifragem autenticada: sigilo e integridade. O ECB vaza padrões e não autentica.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.003' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.004' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.005' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.006' },
  ],
  summary: [
    'Simétrica = chave secreta: a mesma chave cifra e decifra.',
    'Vantagem: rapidez. Usada em discos (BitLocker, LUKS), sessão TLS e VPNs.',
    'Limitações: distribuir a chave, n(n − 1) / 2 chaves para n pessoas, e nenhum não repúdio.',
    'Bloco (DES, 3DES, AES, Blowfish, Twofish) e fluxo (RC4, ChaCha20).',
    'AES (Rijndael): bloco de 128 bits; chave de 128, 192 ou 256 bits. DES inseguro, 3DES legado, RC4 inseguro.',
    'ECB vaza padrões; CBC encadeia com IV imprevisível; CTR não pode repetir o nonce; GCM cifra e autentica.',
    'Cada bit de chave dobra o esforço de força bruta.',
  ],
};
