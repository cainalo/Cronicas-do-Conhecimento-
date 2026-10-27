import type { SimpleSection } from '@/content/types';

/**
 * Porta de entrada "do zero" das seções de Segurança da Informação e Inteligência Artificial.
 * Linguagem simples; o texto completo de cada seção continua disponível como aprofundamento.
 */
export const simpleSegurancaIa: Record<string, SimpleSection> = {
  // ───────────── Segurança, capítulo 1: Criptografia ─────────────
  'cap.seg.01:fundamentos': {
    pages: [
      {
        title: 'Para que serve isso?',
        text: 'Um Tribunal de Contas guarda dados de pessoas, contratos e pagamentos. Esses dados viajam pela internet todos os dias. A **criptografia** é transformar uma mensagem em um código que só quem tem a chave consegue ler. Ela protege o segredo e ajuda a provar quem escreveu.',
      },
      {
        title: 'Texto claro e texto cifrado',
        text: 'O **texto claro** é a mensagem normal, que qualquer um lê. O **texto cifrado** é a mesma mensagem embaralhada. **Cifrar** é embaralhar. **Decifrar** é desembaralhar. Para isso você usa uma **chave**, que funciona como a chave de um cadeado. Sem a chave certa, o texto cifrado parece lixo.',
      },
      {
        title: 'O segredo fica só na chave',
        text: 'Imagine um cadeado vendido em qualquer loja. Todo mundo sabe como ele funciona, mas só você tem a chave. Esse é o **princípio de Kerckhoffs**: o método pode ser público, só a chave precisa ser secreta. Por isso métodos famosos, como o AES (um cadeado digital muito usado), são abertos e seguros.',
      },
      {
        title: 'O que ela protege',
        text: 'A criptografia ajuda em quatro coisas. **Confidencialidade**: só quem pode, lê. **Integridade**: você percebe se alguém mexeu. **Autenticidade**: você sabe quem mandou. **Não repúdio**: o autor não consegue negar que escreveu. Exemplo: um gestor assina um documento digitalmente e depois não pode dizer que não foi ele.',
      },
      {
        title: 'O que ela não garante',
        text: 'A **disponibilidade** é o sistema estar no ar quando você precisa. A criptografia não garante isso. Para manter o sistema funcionando, você usa cópias de segurança e equipamentos de reserva. Essa diferença cai muito em prova.',
      },
      {
        title: 'Três famílias de ferramentas',
        text: 'Existem três grupos principais. A **simétrica** usa uma única chave para fechar e abrir. A **assimétrica** usa um par de chaves, uma pública e uma privada. O **hash** gera um resumo da mensagem, sem chave. Os sistemas reais, como os sites seguros, combinam as três.',
      },
      {
        title: 'Resumindo',
        text: 'Criptografia embaralha a mensagem com uma chave. O método pode ser público; a chave, não. Ela cuida de sigilo, integridade, autoria e não repúdio, mas não de disponibilidade.',
      },
    ],
    words: [
      { term: 'Criptografia', meaning: 'Técnica de embaralhar mensagens para só quem tem a chave ler.' },
      { term: 'Chave', meaning: 'Informação secreta que fecha e abre a mensagem embaralhada.' },
      { term: 'Texto cifrado', meaning: 'Mensagem já embaralhada, ilegível sem a chave.' },
      { term: 'Integridade', meaning: 'Garantia de que ninguém alterou a informação sem você perceber.' },
      { term: 'Não repúdio', meaning: 'O autor não consegue negar que fez ou assinou algo.' },
      { term: 'Disponibilidade', meaning: 'A informação estar acessível quando você precisa.' },
    ],
    checks: [
      { statement: 'Pelo princípio de Kerckhoffs, só a chave precisa ser secreta.', answer: true, why: 'O método pode ser público; a segurança está na chave.' },
      { statement: 'A criptografia garante que o sistema nunca saia do ar.', answer: false, why: 'Disponibilidade depende de cópias e reservas, não de criptografia.' },
      { statement: 'Decifrar é transformar o texto cifrado de volta em texto claro.', answer: true, why: 'Decifrar é desembaralhar usando a chave.' },
    ],
  },

  'cap.seg.01:simetrica': {
    pages: [
      {
        title: 'Uma chave só',
        text: 'Pense na porta da sua casa. A mesma chave tranca e destranca. A **criptografia simétrica** funciona assim: a mesma chave secreta cifra e decifra a mensagem. Quem envia e quem recebe precisam ter uma cópia dessa chave antes de conversar.',
      },
      {
        title: 'Por que ela é usada?',
        text: 'Ela é muito **rápida**. Por isso serve para proteger muitos dados de uma vez. Exemplo: o disco inteiro de um computador ou os dados que passam pela rede. O **AES** é o nome do cadeado digital simétrico mais usado hoje. É o padrão oficial atual.',
      },
      {
        title: 'O problema de entregar a chave',
        text: 'Você e um colega precisam da mesma chave. Como entregar a chave sem que alguém a copie no caminho? Esse é o problema da **distribuição de chaves**. Outro ponto: como os dois têm a mesma chave, a simétrica não oferece não repúdio. Qualquer um dos dois poderia ter escrito.',
      },
      {
        title: 'Muitas pessoas, muitas chaves',
        text: 'Cada dupla precisa de uma chave própria. A conta é n vezes (n menos 1), dividido por 2. Exemplo: com 10 pessoas, 10 vezes 9 dá 90; dividido por 2, dá **45 chaves**. Com 20 pessoas, são 190 chaves. O número cresce rápido.',
      },
      {
        title: 'Nomes que caem em prova',
        text: 'O **DES** é antigo e hoje é inseguro, porque a chave é curta. O **AES** é o padrão atual. Um **bit** é a menor unidade de informação do computador. O AES sempre trabalha em pedaços de 128 bits. O que muda é o tamanho da chave: 128, 192 ou 256 bits. O **RC4** também é considerado inseguro.',
      },
      {
        title: 'Um modo que revela padrões',
        text: 'O **ECB** é um modo, ou seja, um jeito de usar o cadeado. Nele, pedaços iguais da mensagem viram pedaços cifrados iguais. Isso deixa desenhos aparecerem. Uma imagem de pinguim cifrada assim continua reconhecível. Por isso o ECB não deve ser usado. O modo **GCM** é o recomendado: esconde e também detecta alterações.',
      },
      {
        title: 'Resumindo',
        text: 'Na simétrica, a mesma chave fecha e abre. Ela é rápida, mas entregar a chave é difícil e não há não repúdio. AES é o padrão atual; DES e RC4 são inseguros.',
      },
    ],
    words: [
      { term: 'Criptografia simétrica', meaning: 'Usa a mesma chave secreta para cifrar e decifrar.' },
      { term: 'AES', meaning: 'Cadeado digital simétrico padrão atual, rápido e seguro.' },
      { term: 'DES', meaning: 'Cadeado simétrico antigo, hoje inseguro por ter chave curta.' },
      { term: 'Distribuição de chaves', meaning: 'Problema de entregar a chave secreta sem ninguém copiar.' },
      { term: 'ECB', meaning: 'Modo de uso que deixa padrões aparecerem; não deve ser usado.' },
      { term: 'GCM', meaning: 'Modo recomendado que esconde a mensagem e detecta alterações.' },
    ],
    checks: [
      { statement: 'Na criptografia simétrica, a mesma chave cifra e decifra.', answer: true, why: 'É isso que define a simétrica.' },
      { statement: 'Com 10 pessoas, a simétrica precisa de apenas 10 chaves.', answer: false, why: 'Cada dupla precisa de uma chave: são 45.' },
      { statement: 'O modo ECB é o mais recomendado por ser simples.', answer: false, why: 'O ECB revela padrões da mensagem.' },
    ],
  },

  'cap.seg.01:assimetrica': {
    pages: [
      {
        title: 'Um par de chaves',
        text: 'Na **criptografia assimétrica**, cada pessoa tem duas chaves ligadas entre si. A **chave pública** pode ser dada a qualquer um. A **chave privada** fica só com o dono e nunca é compartilhada. O que uma chave fecha, só a outra do mesmo par abre.',
      },
      {
        title: 'Como guardar um segredo',
        text: 'Pense em uma caixa de correio com fenda. Qualquer um coloca uma carta, mas só o dono tem a chave para abrir. Para mandar algo secreto a Bruno, Ana fecha a mensagem com a **chave pública de Bruno**. Só a chave privada de Bruno abre.',
      },
      {
        title: 'Como provar quem escreveu',
        text: 'Para assinar, é o contrário. Ana usa a **própria chave privada**. Qualquer pessoa confere com a chave pública de Ana. Se Ana fechasse um segredo com a privada dela, todo mundo abriria com a pública. Então isso prova autoria, mas não esconde nada.',
      },
      {
        title: 'Por que ela foi criada',
        text: 'A chave pública pode circular à vontade, então o problema de entregar a chave some. Também são necessárias menos chaves: cada pessoa tem um par. Com 100 pessoas, são 100 pares, ou 200 chaves. Na simétrica seriam 4.950 chaves.',
      },
      {
        title: 'Nomes importantes',
        text: 'O **RSA** é o nome mais famoso: cifra e assina. O **Diffie-Hellman** serve só para duas partes combinarem uma chave secreta; ele não cifra mensagens. As **curvas elípticas** (ECC) dão a mesma segurança com chaves menores. O **DSA** serve apenas para assinar.',
      },
      {
        title: 'O ponto fraco',
        text: 'A assimétrica é muito mais **lenta** que a simétrica. Por isso ninguém cifra um arquivo grande com RSA. Na prática, a assimétrica protege uma chave simétrica, e a simétrica cifra os dados. Essa mistura se chama criptografia híbrida.',
      },
      {
        title: 'Resumindo',
        text: 'Para sigilo, use a chave pública de quem recebe. Para assinar, use a sua chave privada. A assimétrica resolve a entrega de chaves, mas é lenta.',
      },
    ],
    words: [
      { term: 'Chave pública', meaning: 'Chave que você pode entregar a qualquer pessoa.' },
      { term: 'Chave privada', meaning: 'Chave que só o dono tem e nunca compartilha.' },
      { term: 'RSA', meaning: 'Método assimétrico famoso, usado para cifrar e assinar.' },
      { term: 'Diffie-Hellman', meaning: 'Método para duas partes combinarem uma chave secreta; não cifra mensagens.' },
      { term: 'ECC', meaning: 'Curvas elípticas: mesma segurança com chaves menores.' },
    ],
    checks: [
      { statement: 'Para mandar um segredo a Bruno, Ana usa a chave pública de Bruno.', answer: true, why: 'Só a chave privada de Bruno consegue abrir.' },
      { statement: 'Cifrar com a própria chave privada garante sigilo.', answer: false, why: 'Todo mundo tem a pública e abriria; isso prova autoria.' },
      { statement: 'A assimétrica é mais rápida que a simétrica.', answer: false, why: 'Ela é bem mais lenta.' },
    ],
  },

  'cap.seg.01:hash': {
    pages: [
      {
        title: 'Uma impressão digital do arquivo',
        text: 'Quando você baixa um programa, como saber se ele chegou inteiro? Um **hash** é um resumo de tamanho fixo calculado a partir de qualquer texto ou arquivo. É como uma impressão digital. Se o arquivo mudar um pouco, o resumo muda totalmente.',
      },
      {
        title: 'Hash não tem volta',
        text: 'O hash não usa chave e não pode ser desfeito. Não existe "decifrar um hash". Por isso o hash **não é criptografia** de sigilo e não esconde a mensagem. Questões de prova adoram dizer o contrário.',
      },
      {
        title: 'Um exemplo pequeno',
        text: 'Calcule o hash de "Tribunal de Contas". Agora troque só o "C" por "c". O resumo fica completamente diferente. Isso se chama **efeito avalanche**. Já o mesmo texto sempre gera o mesmo resumo. Uma **colisão** é quando dois textos diferentes dão o mesmo resumo; achar uma deve ser praticamente impossível.',
      },
      {
        title: 'Quais usar e quais evitar',
        text: 'O **MD5** e o **SHA-1** estão quebrados: já acharam colisões. Não use para segurança. O **SHA-256**, da família SHA-2, e o SHA-3 são seguros e muito usados hoje.',
      },
      {
        title: 'Hash com chave',
        text: 'O **HMAC** é um hash calculado junto com uma chave secreta que os dois lados conhecem. Ele mostra que ninguém mexeu e que veio de quem tem a chave. Mas ele não esconde a mensagem. Também não dá não repúdio, porque os dois lados têm a mesma chave.',
      },
      {
        title: 'Como guardar senhas',
        text: 'Nunca guarde senhas como texto normal. O certo é guardar um hash lento feito para senhas, como o **Argon2id** ou o **bcrypt**. Junto, use um **sal**: um valor aleatório diferente para cada pessoa. Assim, duas senhas iguais geram resumos diferentes.',
      },
      {
        title: 'Resumindo',
        text: 'Hash é um resumo sem chave e sem volta, que denuncia alterações. MD5 e SHA-1 estão quebrados. Senhas se guardam com hash lento e sal.',
      },
    ],
    words: [
      { term: 'Hash', meaning: 'Resumo de tamanho fixo de um texto ou arquivo, sem volta.' },
      { term: 'Efeito avalanche', meaning: 'Uma mudança mínima no texto muda todo o resumo.' },
      { term: 'Colisão', meaning: 'Dois textos diferentes que geram o mesmo resumo.' },
      { term: 'SHA-256', meaning: 'Função hash segura e muito usada hoje.' },
      { term: 'HMAC', meaning: 'Hash calculado com uma chave secreta compartilhada.' },
      { term: 'Sal', meaning: 'Valor aleatório único por pessoa, guardado junto ao hash da senha.' },
    ],
    checks: [
      { statement: 'É possível decifrar um hash com a chave certa.', answer: false, why: 'Hash não tem chave nem volta.' },
      { statement: 'O MD5 está quebrado e não deve ser usado para segurança.', answer: true, why: 'Já foram encontradas colisões nele.' },
      { statement: 'O sal faz senhas iguais gerarem resumos diferentes.', answer: true, why: 'Cada pessoa recebe um valor aleatório diferente.' },
    ],
  },

  'cap.seg.01:assinatura': {
    pages: [
      {
        title: 'Assinar sem caneta',
        text: 'No Tribunal, muitos documentos são assinados no computador. A **assinatura digital** prova quem assinou e mostra se o documento foi alterado depois. Ela junta duas ideias que você já viu: o hash e a chave privada.',
      },
      {
        title: 'Como se assina',
        text: 'Quem assina calcula o hash do documento. Depois, fecha esse hash com a **própria chave privada**. O resultado é a assinatura. Quem recebe calcula o hash de novo e confere a assinatura com a **chave pública** de quem assinou. Se os dois resumos baterem, a assinatura vale.',
      },
      {
        title: 'O que ela garante',
        text: 'A assinatura garante **integridade**, **autenticidade** e **não repúdio**. Mas ela não esconde o conteúdo: o documento assinado continua legível. Se você precisa de segredo também, precisa cifrar além de assinar.',
      },
      {
        title: 'Essa chave é mesmo dele?',
        text: 'Como saber se a chave pública é de Bruno e não de um impostor? Para isso existe o **certificado digital**: uma espécie de RG eletrônico que liga uma chave pública a uma pessoa ou site. Quem carimba esse RG é uma **Autoridade Certificadora**, ou AC. O certificado nunca contém a chave privada.',
      },
      {
        title: 'Certificados no Brasil',
        text: 'A **ICP-Brasil** é o sistema oficial de certificados do país. Ela foi criada pela Medida Provisória 2.200-2, de 2001. A AC Raiz, que fica no topo, é o **ITI**, o Instituto Nacional de Tecnologia da Informação. Um certificado pode ser cancelado antes do prazo, por exemplo se a chave privada vazar. Isso se chama **revogação**.',
      },
      {
        title: 'Digital não é digitalizada',
        text: 'Uma **assinatura digitalizada** é só a foto escaneada da sua assinatura no papel. Ela não oferece a proteção da assinatura digital. Exemplo: qualquer um pode copiar e colar uma imagem da sua assinatura em outro documento.',
      },
      {
        title: 'Resumindo',
        text: 'Assina-se com a chave privada e confere-se com a pública. A assinatura prova autoria e integridade, mas não esconde o texto. O certificado digital liga a chave pública a uma pessoa.',
      },
    ],
    words: [
      { term: 'Assinatura digital', meaning: 'Prova eletrônica de quem assinou e de que nada mudou.' },
      { term: 'Certificado digital', meaning: 'RG eletrônico que liga uma chave pública a alguém.' },
      { term: 'Autoridade Certificadora', meaning: 'Entidade que emite e assina certificados digitais.' },
      { term: 'ICP-Brasil', meaning: 'Sistema oficial brasileiro de certificados digitais.' },
      { term: 'Revogação', meaning: 'Cancelamento de um certificado antes do vencimento.' },
    ],
    checks: [
      { statement: 'A assinatura digital esconde o conteúdo do documento.', answer: false, why: 'O documento assinado continua legível.' },
      { statement: 'O certificado digital contém a chave privada do dono.', answer: false, why: 'Ele contém só a chave pública.' },
      { statement: 'Para assinar, a pessoa usa a própria chave privada.', answer: true, why: 'E qualquer um confere com a chave pública dela.' },
    ],
  },

  'cap.seg.01:hibrida': {
    pages: [
      {
        title: 'O cadeado do navegador',
        text: 'Quando você acessa um site com endereço "https", aparece um cadeado. Ele indica que a conversa entre você e o site está protegida. Por trás disso existe a **criptografia híbrida**, que mistura o melhor da simétrica e da assimétrica.',
      },
      {
        title: 'Como a mistura funciona',
        text: 'Primeiro, cria-se uma **chave de sessão**: uma chave simétrica nova, só para aquela conversa. Os dados são cifrados com ela, porque a simétrica é rápida. A assimétrica entra só para proteger ou combinar essa chave de sessão. Assim você tem velocidade e entrega segura da chave.',
      },
      {
        title: 'O que é TLS',
        text: 'O **TLS** é o protocolo, ou seja, o conjunto de regras, que protege a conversa com o site. O **HTTPS** é a navegação comum rodando dentro do TLS. O antigo SSL e as versões 1.0 e 1.1 do TLS estão ultrapassados. Hoje se aceitam o TLS 1.2 e o 1.3.',
      },
      {
        title: 'O aperto de mão',
        text: 'No começo da conexão acontece o **handshake**, um aperto de mão. O site mostra seu certificado. O seu navegador confere se o certificado é válido. Depois, os dois combinam as chaves de sessão e passam a conversar cifrado. Exemplo: é isso que acontece antes de você ver a página do banco.',
      },
      {
        title: 'O cadeado não é tudo',
        text: 'O HTTPS protege os dados **enquanto viajam**. Ele não protege dados guardados no servidor. Também não prova que o site é honesto: um site golpista pode ter cadeado. E ele não corrige falhas do próprio sistema.',
      },
      {
        title: 'Resumindo',
        text: 'A híbrida usa a assimétrica para a chave de sessão e a simétrica para os dados. O HTTPS é a navegação protegida pelo TLS. O cadeado protege o caminho, não garante que o site seja confiável.',
      },
    ],
    words: [
      { term: 'Criptografia híbrida', meaning: 'Mistura assimétrica, para a chave, com simétrica, para os dados.' },
      { term: 'Chave de sessão', meaning: 'Chave simétrica criada só para uma conversa.' },
      { term: 'TLS', meaning: 'Conjunto de regras que protege a conversa com um site.' },
      { term: 'HTTPS', meaning: 'Navegação na web protegida pelo TLS; mostra o cadeado.' },
      { term: 'Handshake', meaning: 'Aperto de mão inicial em que site e navegador combinam as chaves.' },
    ],
    checks: [
      { statement: 'Na híbrida, a simétrica cifra os dados por ser mais rápida.', answer: true, why: 'A assimétrica fica só com a chave de sessão.' },
      { statement: 'O cadeado do HTTPS prova que o site é honesto.', answer: false, why: 'Um site golpista também pode ter cadeado.' },
      { statement: 'O TLS 1.3 é uma versão aceita hoje.', answer: true, why: 'As versões aceitas são 1.2 e 1.3.' },
    ],
  },

  // ───────────── Segurança, capítulo 2: Defesa em profundidade ─────────────
  'cap.seg.02:principios': {
    pages: [
      {
        title: 'O que é preciso proteger?',
        text: 'O Tribunal lida com CPF de servidores, valores de contratos e decisões. Se esses dados vazarem, forem alterados ou sumirem, o prejuízo é grande. A **segurança da informação** é o cuidado para que isso não aconteça. Ela se apoia em cinco princípios.',
      },
      {
        title: 'Os cinco princípios',
        text: '**Confidencialidade**: só quem pode, lê. **Integridade**: o dado está certo e completo. **Disponibilidade**: o sistema funciona quando você precisa. **Autenticidade**: a origem é quem diz ser. **Não repúdio**: o autor não nega o que fez. Os três primeiros formam a **tríade CID**.',
      },
      {
        title: 'Exemplos de cada falha',
        text: 'Uma planilha com CPFs vaza: falha de confidencialidade. Alguém muda o valor de um pagamento: falha de integridade. O sistema cai por um ataque: falha de disponibilidade. Um e-mail falso finge ser da presidência: falha de autenticidade.',
      },
      {
        title: 'Fraqueza, ameaça e risco',
        text: 'Uma **vulnerabilidade** é uma fraqueza, como uma senha fraca. Uma **ameaça** é o que pode causar dano, como um invasor. O **risco** junta a chance de a ameaça usar a fraqueza e o tamanho do estrago. Pense em uma janela aberta (fraqueza) e um ladrão (ameaça).',
      },
      {
        title: 'O que fazer com um risco',
        text: 'Há quatro saídas. **Mitigar**: reduzir o risco, por exemplo atualizando o sistema. **Transferir**: passar o prejuízo a outro, como num seguro. **Evitar**: parar a atividade arriscada. **Aceitar**: assumir de propósito o **risco residual**, o que sobra, com registro. Aceitar não é ignorar.',
      },
      {
        title: 'Dar nível de segredo',
        text: '**Classificar** a informação é dizer o quanto ela é sensível. A Lei de Acesso à Informação (LAI) prevê três graus de sigilo: **reservada**, até 5 anos; **secreta**, até 15 anos; e **ultrassecreta**, até 25 anos. Na lei, a regra é a informação ser pública; o sigilo é exceção.',
      },
      {
        title: 'Resumindo',
        text: 'Os princípios são confidencialidade, integridade, disponibilidade, autenticidade e não repúdio. Risco junta fraqueza, ameaça e impacto. Na LAI, os graus são 5, 15 e 25 anos.',
      },
    ],
    words: [
      { term: 'Tríade CID', meaning: 'Confidencialidade, integridade e disponibilidade juntas.' },
      { term: 'Vulnerabilidade', meaning: 'Fraqueza que alguém pode explorar.' },
      { term: 'Ameaça', meaning: 'Algo ou alguém que pode causar um incidente.' },
      { term: 'Risco', meaning: 'Chance de uma ameaça usar uma fraqueza e o estrago causado.' },
      { term: 'Risco residual', meaning: 'Risco que sobra depois de aplicar as proteções.' },
      { term: 'Classificação', meaning: 'Dar um nível de sensibilidade a uma informação.' },
    ],
    checks: [
      { statement: 'Aceitar um risco é o mesmo que ignorá-lo.', answer: false, why: 'Aceitar é uma decisão consciente e registrada.' },
      { statement: 'Uma senha fraca é exemplo de vulnerabilidade.', answer: true, why: 'É uma fraqueza que pode ser explorada.' },
      { statement: 'Na LAI, a informação ultrassecreta fica em sigilo por até 25 anos.', answer: true, why: 'Os prazos são 5, 15 e 25 anos.' },
    ],
  },

  'cap.seg.02:acesso': {
    pages: [
      {
        title: 'Quem entra e o que faz?',
        text: 'Nem todo servidor do Tribunal pode ver tudo. O **controle de acesso** decide quem entra e o que cada um pode fazer. Ele tem três partes: **autenticação** (provar quem você é), **autorização** (o que você pode fazer) e **auditoria** (registrar o que foi feito).',
      },
      {
        title: 'Só o necessário',
        text: 'O **menor privilégio** diz: cada pessoa recebe só as permissões que precisa para o seu trabalho. A **segregação de funções** divide tarefas importantes entre pessoas diferentes. Exemplo: quem cadastra um pagamento não é quem aprova. Assim, uma pessoa sozinha não consegue fraudar.',
      },
      {
        title: 'Quem decide o acesso',
        text: 'No **DAC**, o dono do arquivo decide quem acessa, como quando você compartilha uma pasta. No **MAC**, o sistema decide por rótulos de sigilo, e o usuário não muda. No **RBAC**, as permissões vêm do **papel** da pessoa, como "Auditor". No **ABAC**, a regra combina várias características, como setor e horário.',
      },
      {
        title: 'A vida de uma conta',
        text: 'A **gestão de identidades** cuida da conta do começo ao fim. Na entrada, cria-se a conta com os papéis certos. De tempos em tempos, revisam-se os acessos. Na mudança de setor, tiram-se as permissões antigas. Na saída da pessoa, tudo é cancelado imediatamente.',
      },
      {
        title: 'Confiança zero',
        text: 'Antigamente, muitas redes tratavam os acessos internos como confiáveis por padrão. O **Zero Trust**, ou confiança zero, muda isso: estar dentro da rede não garante confiança. Cada acesso é verificado, de acordo com o princípio "nunca confie, sempre verifique". O NIST descreve essa abordagem em suas publicações de segurança.',
      },
      {
        title: 'Resumindo',
        text: 'Controle de acesso é autenticar, autorizar e registrar. Dê só o necessário e divida tarefas críticas. No RBAC, o acesso vem do papel; no Zero Trust, cada acesso é verificado.',
      },
    ],
    words: [
      { term: 'Autenticação', meaning: 'Provar quem você é, com senha, certificado ou biometria.' },
      { term: 'Autorização', meaning: 'Decidir o que uma pessoa pode fazer no sistema.' },
      { term: 'Menor privilégio', meaning: 'Dar a cada um só as permissões que precisa.' },
      { term: 'Segregação de funções', meaning: 'Dividir tarefas críticas entre pessoas diferentes.' },
      { term: 'RBAC', meaning: 'Acesso definido pelo papel da pessoa na organização.' },
      { term: 'Zero Trust', meaning: 'Modelo em que estar dentro da rede não dá confiança.' },
    ],
    checks: [
      { statement: 'No RBAC, o dono do arquivo decide quem acessa.', answer: false, why: 'Isso é DAC; no RBAC, o acesso vem do papel.' },
      { statement: 'No Zero Trust, cada acesso é verificado.', answer: true, why: 'O lema é nunca confiar e sempre verificar.' },
      { statement: 'Quem cadastra um pagamento não deve ser quem aprova.', answer: true, why: 'É a segregação de funções.' },
    ],
  },

  'cap.seg.02:owasp': {
    pages: [
      {
        title: 'Uma lista de erros comuns',
        text: 'Os sistemas do Tribunal funcionam pela web. A **OWASP** é uma fundação que publica o **OWASP Top 10**. É a lista dos dez riscos mais importantes em **aplicações web**, os sistemas usados pelo navegador. O edital cobra a edição de 2025.',
      },
      {
        title: 'O primeiro lugar',
        text: 'O primeiro item, A01, é o **controle de acesso quebrado**: a pessoa vê o que não deveria. Exemplo: você abre o processo 123 e troca o número no endereço para 124. Aparece o processo de outro órgão. A defesa é o servidor conferir a permissão a cada pedido.',
      },
      {
        title: 'O que mudou em 2025',
        text: 'A lista ganhou dois itens novos. O A03 trata de falhas na **cadeia de suprimentos**: peças de software de terceiros com problemas. O A10 trata de erros e situações inesperadas mal tratados. A **configuração incorreta** subiu para o 2º lugar. As falhas de criptografia desceram para o 4º.',
      },
      {
        title: 'Injeção',
        text: 'A **injeção** (A05) acontece quando o que o usuário digita vira um comando para o sistema. Exemplo: alguém digita um trecho no campo de login e o banco de dados devolve todos os usuários. A defesa principal é a **consulta parametrizada**, que trata o texto digitado sempre como dado, nunca como comando.',
      },
      {
        title: 'Segurança desde o começo',
        text: '**DevSecOps** é colocar a segurança em todas as etapas da criação do sistema, e não só no fim. Duas ferramentas aparecem muito. O **SAST** lê o código sem executar. O **DAST** testa o sistema já funcionando, de fora, como um atacante faria.',
      },
      {
        title: 'Resumindo',
        text: 'O OWASP Top 10 lista os riscos web mais importantes. Em 2025, controle de acesso quebrado é o primeiro e há dois itens novos. SAST lê o código; DAST testa o sistema rodando.',
      },
    ],
    words: [
      { term: 'OWASP Top 10', meaning: 'Lista dos dez riscos mais importantes em aplicações web.' },
      { term: 'Controle de acesso quebrado', meaning: 'Falha que deixa alguém ver ou fazer o que não deveria.' },
      { term: 'Injeção', meaning: 'Texto digitado pelo usuário que vira comando no sistema.' },
      { term: 'Consulta parametrizada', meaning: 'Jeito de consultar o banco tratando o texto digitado só como dado.' },
      { term: 'DevSecOps', meaning: 'Segurança incluída em todas as etapas de criar um sistema.' },
      { term: 'SAST e DAST', meaning: 'SAST lê o código; DAST testa o sistema funcionando.' },
    ],
    checks: [
      { statement: 'No OWASP Top 10:2025, o primeiro lugar é controle de acesso quebrado.', answer: true, why: 'É o item A01.' },
      { statement: 'O SAST testa a aplicação já em funcionamento.', answer: false, why: 'O SAST lê o código; quem testa rodando é o DAST.' },
      { statement: 'A consulta parametrizada é a principal defesa contra injeção.', answer: true, why: 'Ela trata o que é digitado sempre como dado.' },
    ],
  },

  'cap.seg.02:ameacas': {
    pages: [
      {
        title: 'Programas do mal',
        text: '**Malware** é qualquer programa feito para causar dano. Um ataque pode parar o Tribunal por dias. Conhecer os tipos ajuda a reconhecer e a responder em prova. Os nomes mais cobrados são vírus, worm, cavalo de Troia e ransomware.',
      },
      {
        title: 'Vírus, worm e cavalo de Troia',
        text: 'O **vírus** se esconde dentro de um arquivo e precisa que esse arquivo seja aberto para se espalhar. O **worm** se espalha **sozinho** pela rede, sem precisar de arquivo. O **cavalo de Troia** parece um programa legítimo, mas faz coisas ruins escondido.',
      },
      {
        title: 'Sequestro de dados',
        text: 'O **ransomware** tranca os seus arquivos com criptografia e pede um resgate para devolver. A defesa decisiva é ter **cópias de segurança** separadas da rede e testadas. Assim você recupera os dados sem pagar.',
      },
      {
        title: 'Golpes que enganam pessoas',
        text: '**Engenharia social** é enganar pessoas em vez de máquinas. O **phishing** é uma mensagem falsa que pede para você clicar ou informar a senha. O **spear phishing** é o mesmo golpe feito sob medida para uma pessoa. Exemplo: um e-mail com seu nome e o nome do seu chefe pedindo um pagamento urgente.',
      },
      {
        title: 'Alarme ou bloqueio?',
        text: 'O **IDS** é um alarme: ele detecta um ataque e avisa, mas não bloqueia. O **IPS** fica no caminho dos dados da rede e **bloqueia** o ataque. Pense no IDS como a câmera de segurança e no IPS como o porteiro que fecha a porta.',
      },
      {
        title: 'Testar antes do invasor',
        text: 'No **teste de invasão**, ou pentest, um especialista tenta invadir de verdade para mostrar o estrago possível. Na **caixa preta**, ele não sabe nada do sistema. Na **caixa branca**, recebe tudo, até o código. Todo teste precisa de **autorização formal**; sem ela, é ataque.',
      },
      {
        title: 'Resumindo',
        text: 'O vírus precisa de arquivo; o worm anda sozinho. Contra ransomware, valem cópias separadas e testadas. O IDS avisa; o IPS bloqueia.',
      },
    ],
    words: [
      { term: 'Malware', meaning: 'Programa feito para causar dano.' },
      { term: 'Worm', meaning: 'Malware que se espalha sozinho pela rede.' },
      { term: 'Ransomware', meaning: 'Malware que tranca seus dados e pede resgate.' },
      { term: 'Phishing', meaning: 'Mensagem falsa que tenta roubar senhas ou induzir cliques.' },
      { term: 'IDS', meaning: 'Sistema que detecta ataques e avisa, sem bloquear.' },
      { term: 'IPS', meaning: 'Sistema no caminho dos dados da rede que bloqueia ataques.' },
      { term: 'Pentest', meaning: 'Teste de invasão autorizado para mostrar falhas reais.' },
    ],
    checks: [
      { statement: 'O worm precisa de um arquivo hospedeiro para se espalhar.', answer: false, why: 'Quem precisa de arquivo é o vírus.' },
      { statement: 'O IDS detecta e avisa, mas não bloqueia.', answer: true, why: 'Quem bloqueia é o IPS.' },
      { statement: 'Um teste de invasão pode ser feito sem autorização.', answer: false, why: 'Sem autorização formal, é ataque.' },
    ],
  },

  'cap.seg.02:continuidade': {
    pages: [
      {
        title: 'E se tudo parar?',
        text: 'Um incêndio, um defeito ou um ataque podem apagar os dados do Tribunal. O **backup** é uma cópia de segurança dos dados, guardada para recuperar o que se perdeu. A **continuidade de negócios** é o plano para o trabalho seguir mesmo durante a crise.',
      },
      {
        title: 'Três tipos de cópia',
        text: 'O **completo** copia tudo. O **incremental** copia só o que mudou desde a **última cópia de qualquer tipo**. O **diferencial** copia o que mudou desde o **último completo**. Pense em fotos de uma gaveta: uma foto inteira, ou só das coisas que mudaram.',
      },
      {
        title: 'Como recuperar',
        text: 'Suponha um completo no domingo e cópias de segunda a quarta. No incremental, você precisa do completo **e de todas** as cópias seguintes, em ordem. No diferencial, basta o completo **e a última** cópia, a de quarta. O incremental é mais rápido de fazer; o diferencial é mais fácil de recuperar.',
      },
      {
        title: 'A regra 3-2-1',
        text: 'Uma boa prática é a **regra 3-2-1**: tenha **3** cópias dos dados, em **2** tipos de **mídia** diferentes, com **1** delas fora do prédio. Mídia é o meio onde a cópia fica guardada. Contra ransomware, mantenha também uma cópia desconectada. E teste: um backup nunca restaurado não é garantia.',
      },
      {
        title: 'Quanto tempo e quanto dado',
        text: 'O **RTO** é o tempo máximo para o serviço voltar. O **RPO** é quanto dado você aceita perder, medido em tempo. Exemplo: um RPO de 1 hora pede cópias pelo menos a cada hora. A **BIA** é o estudo que mostra quais processos são críticos e quanto tempo podem ficar parados.',
      },
      {
        title: 'Resumindo',
        text: 'O incremental pega o que mudou desde qualquer cópia; o diferencial, desde o último completo. Siga a regra 3-2-1 e teste a restauração. RTO é o tempo para voltar; RPO, a perda de dados aceita.',
      },
    ],
    words: [
      { term: 'Backup', meaning: 'Cópia de segurança dos dados para recuperar perdas.' },
      { term: 'Incremental', meaning: 'Copia o que mudou desde a última cópia de qualquer tipo.' },
      { term: 'Diferencial', meaning: 'Copia o que mudou desde o último backup completo.' },
      { term: 'RTO', meaning: 'Tempo máximo para um serviço voltar a funcionar.' },
      { term: 'RPO', meaning: 'Quantidade máxima de dados que se aceita perder, medida em tempo.' },
      { term: 'BIA', meaning: 'Estudo que mostra os processos críticos e o impacto de pará-los.' },
    ],
    checks: [
      { statement: 'No incremental, basta o completo e o último incremental.', answer: false, why: 'É preciso o completo e todos os incrementais seguintes.' },
      { statement: 'A regra 3-2-1 pede uma cópia fora do local.', answer: true, why: 'São 3 cópias, 2 mídias e 1 fora do prédio.' },
      { statement: 'O RTO é o tempo máximo para o serviço voltar.', answer: true, why: 'O RPO é que trata da perda de dados.' },
    ],
  },

  'cap.seg.02:iso': {
    pages: [
      {
        title: 'Um manual internacional',
        text: 'Como saber se um órgão cuida bem da segurança? Existem **normas**: documentos com regras aceitas no mundo todo. A ISO e a IEC são organizações internacionais que publicam normas. A **família ISO/IEC 27000** trata da gestão da segurança da informação. No Brasil, a ABNT, órgão brasileiro de normas, adota essas normas com a sigla NBR.',
      },
      {
        title: 'O que diz e como fazer',
        text: 'A **ISO 27001** diz **o que** um **SGSI** precisa ter. SGSI é o sistema de gestão da segurança da informação de uma organização. Ela é a norma que permite **certificação**. A **ISO 27002** explica **como** colocar os controles em prática, mas não certifica.',
      },
      {
        title: 'Outras normas da família',
        text: 'A **27000** traz o vocabulário, as definições. A **27005** orienta a **gestão de riscos**. A **27701** trata de **privacidade** e dados pessoais. Pense em uma coleção de livros: cada um cuida de um assunto.',
      },
      {
        title: 'Os números da versão 2022',
        text: 'A 27001 atual é de 2022. Ela tem um anexo, o **Anexo A**, com **93 controles** organizados em **4 temas**: organizacionais, pessoas, físicos e tecnológicos. Um **controle** é uma medida de proteção. Exemplo de controle físico: mesa limpa e tela limpa. A versão antiga, de 2013, tinha 114 controles.',
      },
      {
        title: 'A política do Tribunal',
        text: 'A **política de segurança** é o documento mais alto, aprovado pela direção. Ela define as regras gerais e quem é responsável. No TCE-GO, a política é a Resolução Administrativa nº 17/2024, citada no edital.',
      },
      {
        title: 'Resumindo',
        text: 'A 27001 diz o que o SGSI precisa ter e é a certificável. A 27002 explica como fazer. A versão 2022 tem 93 controles em 4 temas.',
      },
    ],
    words: [
      { term: 'Norma', meaning: 'Documento com regras e boas práticas aceitas amplamente.' },
      { term: 'SGSI', meaning: 'Sistema de gestão da segurança da informação de uma organização.' },
      { term: 'ISO 27001', meaning: 'Norma com os requisitos do SGSI; permite certificação.' },
      { term: 'ISO 27002', meaning: 'Norma que explica como aplicar os controles.' },
      { term: 'Controle', meaning: 'Medida que reduz um risco de segurança.' },
      { term: 'Certificação', meaning: 'Reconhecimento formal de que a organização cumpre a norma.' },
    ],
    checks: [
      { statement: 'A ISO 27002 é a norma certificável.', answer: false, why: 'A certificação é pela 27001.' },
      { statement: 'A ISO 27001:2022 tem 93 controles em 4 temas.', answer: true, why: 'Esse é o Anexo A da versão 2022.' },
      { statement: 'A ISO 27005 orienta a gestão de riscos.', answer: true, why: 'É a norma da família sobre riscos.' },
    ],
  },

  // ───────────── IA, capítulo 1: LLM, contexto e RAG ─────────────
  'cap.ia.01:llm': {
    pages: [
      {
        title: 'Por que estudar IA?',
        text: 'Hoje, assistentes de IA escrevem textos e códigos. No trabalho de TI de um Tribunal, eles ajudam a programar e a analisar documentos. O edital dedica 9 questões a IA. Tudo começa por entender o que é um **LLM**.',
      },
      {
        title: 'Caixas dentro de caixas',
        text: 'A **inteligência artificial** é a caixa maior: máquinas fazendo tarefas que parecem exigir inteligência. Dentro dela está o **aprendizado de máquina**: o sistema aprende com exemplos. Dentro dele, o **aprendizado profundo**, que usa redes inspiradas no cérebro, com muitas camadas. Um **LLM** é um grande modelo de linguagem, treinado com muito texto.',
      },
      {
        title: 'Um autocompletar gigante',
        text: 'Sabe quando o celular sugere a próxima palavra? Um LLM faz isso em escala enorme. Ele prevê o próximo pedaço de texto, e depois o próximo, até formar uma resposta. Cada pedaço se chama **token**: pode ser uma palavra, parte dela ou um sinal.',
      },
      {
        title: 'O que ele enxerga',
        text: 'A **janela de contexto** é o limite de texto que o modelo consegue considerar de uma vez. O que fica fora dela não existe para ele. A **temperatura** controla a criatividade: baixa deixa a resposta mais previsível; alta, mais variada.',
      },
      {
        title: 'Ele pode inventar',
        text: 'A **alucinação** é quando o modelo escreve algo convincente, mas falso. Exemplo: ele cita um artigo de lei que não existe. Isso acontece porque ele escolhe o texto mais provável, que nem sempre é o verdadeiro. Dar fontes, pedir citações e conferir reduzem o problema, mas não o eliminam.',
      },
      {
        title: 'Ele tem data de corte',
        text: 'O modelo aprende com textos até uma certa data, a **data de corte**. Fatos depois disso ele não conhece. Para saber algo novo, alguém precisa colocar a informação no contexto, por exemplo com uma busca.',
      },
      {
        title: 'Resumindo',
        text: 'Um LLM prevê o próximo token, várias vezes, até formar a resposta. Ele só vê o que cabe na janela de contexto. Ele pode alucinar, então confira sempre.',
      },
    ],
    words: [
      { term: 'LLM', meaning: 'Grande modelo de linguagem, treinado com muito texto.' },
      { term: 'Token', meaning: 'Pedaço de texto que o modelo lê e escreve.' },
      { term: 'Janela de contexto', meaning: 'Limite de texto que o modelo considera de uma vez.' },
      { term: 'Temperatura', meaning: 'Ajuste que deixa a resposta mais previsível ou mais variada.' },
      { term: 'Alucinação', meaning: 'Resposta convincente, porém falsa ou inventada.' },
      { term: 'Data de corte', meaning: 'Data até onde vai o que o modelo aprendeu.' },
    ],
    checks: [
      { statement: 'Um LLM funciona prevendo o próximo pedaço de texto.', answer: true, why: 'Ele repete essa previsão até formar a resposta.' },
      { statement: 'Temperatura alta deixa a resposta mais previsível.', answer: false, why: 'É o contrário: alta deixa mais variada.' },
      { statement: 'Alucinação é quando o modelo escreve algo falso com aparência de verdade.', answer: true, why: 'Ele escolhe o mais provável, não o verdadeiro.' },
    ],
  },

  'cap.ia.01:prompts': {
    pages: [
      {
        title: 'Saber pedir',
        text: 'O **prompt** é o pedido que você escreve para o modelo. Um pedido vago gera uma resposta vaga. A **engenharia de prompts** é a arte de escrever pedidos claros. Pense em pedir ajuda a um colega competente que não conhece o seu trabalho.',
      },
      {
        title: 'As partes de um pedido',
        text: 'O **prompt de sistema** traz regras gerais para toda a conversa, como "responda em português". O **prompt do usuário** é o pedido do momento. Você também pode dar **contexto**, como um documento. E pode dizer o **formato** da resposta, como uma lista.',
      },
      {
        title: 'Com ou sem exemplos',
        text: 'No **zero-shot**, você pede sem dar exemplos. No **few-shot**, você mostra alguns exemplos antes do pedido. Os exemplos ficam só no pedido: o modelo não muda por dentro. Na **cadeia de pensamento**, você pede para ele raciocinar passo a passo, útil em contas e lógica.',
      },
      {
        title: 'Um pedido melhor',
        text: 'Pedido fraco: "Fale sobre o edital". Pedido melhor: "Use só o trecho do edital abaixo. Liste as disciplinas e o número de questões em uma tabela. Se faltar dado, escreva não informado". O segundo diz o papel, a fonte, o formato e o que fazer quando falta dado.',
      },
      {
        title: 'O golpe do texto escondido',
        text: 'A **injeção de prompt** é quando um texto malicioso faz o modelo ignorar as instruções originais. Ela pode vir do próprio usuário ou estar escondida em uma página ou e-mail que o modelo lê. A melhor defesa é limitar o que o modelo pode fazer e pedir confirmação humana para ações sensíveis.',
      },
      {
        title: 'Resumindo',
        text: 'Um bom prompt diz objetivo, fonte, formato e o que fazer na falta de dado. Few-shot usa exemplos sem mudar o modelo. Injeção de prompt é texto malicioso que manipula o modelo.',
      },
    ],
    words: [
      { term: 'Prompt', meaning: 'Pedido ou instrução que você escreve para o modelo.' },
      { term: 'Prompt de sistema', meaning: 'Regras gerais que valem para toda a conversa.' },
      { term: 'Few-shot', meaning: 'Pedido com alguns exemplos, sem mudar o modelo por dentro.' },
      { term: 'Cadeia de pensamento', meaning: 'Pedir ao modelo que raciocine passo a passo.' },
      { term: 'Injeção de prompt', meaning: 'Texto malicioso que faz o modelo ignorar as instruções.' },
    ],
    checks: [
      { statement: 'No few-shot, os exemplos mudam o modelo por dentro.', answer: false, why: 'Os exemplos ficam só no pedido.' },
      { statement: 'Um bom prompt pode dizer o formato da resposta.', answer: true, why: 'Formato é uma das partes de um bom pedido.' },
      { statement: 'A injeção de prompt pode estar escondida em uma página web.', answer: true, why: 'Ela pode vir em um conteúdo que o modelo lê.' },
    ],
  },

  'cap.ia.01:contexto': {
    pages: [
      {
        title: 'O que o modelo enxerga?',
        text: 'Se o prompt é o pedido, o **contexto** é tudo o que o modelo enxerga ao responder. A **engenharia de contexto** é escolher e organizar essas informações. Pense em uma mesa de trabalho: o espaço é limitado, então você coloca só o que precisa.',
      },
      {
        title: 'Tudo disputa espaço',
        text: 'Na janela de contexto entram as regras do projeto e a conversa. Entram também os arquivos lidos, os resultados de comandos e a própria resposta. Tudo divide o mesmo espaço. Contexto demais custa caro, deixa a resposta lenta e pode até piorar a qualidade.',
      },
      {
        title: 'Problemas comuns',
        text: 'Em textos muito longos, o modelo aproveita melhor o **início** e o **fim** do que o **meio**. Um erro antigo na conversa pode continuar influenciando as respostas. Arquivos sem relação com a tarefa distraem o modelo.',
      },
      {
        title: 'Como organizar',
        text: 'Você pode **selecionar** só os arquivos certos. Pode **buscar** a informação só quando precisar. Pode **compactar**, ou seja, resumir a conversa antiga guardando as decisões. E pode **isolar**: mandar uma parte da tarefa para outro assistente de IA e receber só o resultado.',
      },
      {
        title: 'O modelo não lembra sozinho',
        text: 'O modelo não guarda nada de uma conversa para outra. A **memória** é feita pelo programa em volta dele. Exemplo: no Claude Code, um assistente de programação, o arquivo `CLAUDE.md` guarda as regras do projeto. Ele é lido no início de cada sessão. Assim, o trabalho continua sem depender da conversa anterior.',
      },
      {
        title: 'Resumindo',
        text: 'Engenharia de contexto é escolher o que entra na janela. Mais contexto nem sempre é melhor. A memória entre sessões é guardada fora do modelo, em arquivos ou bancos.',
      },
    ],
    words: [
      { term: 'Contexto', meaning: 'Tudo o que o modelo enxerga ao responder.' },
      { term: 'Engenharia de contexto', meaning: 'Escolher e organizar o que entra na janela do modelo.' },
      { term: 'Compactação', meaning: 'Resumir a conversa antiga, guardando decisões e pendências.' },
      { term: 'Memória de longo prazo', meaning: 'Informação guardada fora do modelo e trazida quando preciso.' },
      { term: 'CLAUDE.md', meaning: 'Arquivo com regras do projeto lido no início de cada sessão.' },
    ],
    checks: [
      { statement: 'Uma janela de contexto maior sempre melhora a resposta.', answer: false, why: 'Contexto irrelevante pode atrapalhar.' },
      { statement: 'O modelo guarda sozinho tudo de uma conversa para a outra.', answer: false, why: 'A memória é feita pelo programa em volta dele.' },
      { statement: 'Compactar é resumir o histórico antigo.', answer: true, why: 'Assim sobra espaço e as decisões ficam guardadas.' },
    ],
  },

  'cap.ia.01:rag': {
    pages: [
      {
        title: 'Consultar antes de responder',
        text: 'O modelo não conhece as normas internas do Tribunal. O **RAG** resolve isso. É como um aluno que pode consultar o livro antes de responder. O sistema busca trechos relevantes nos documentos e coloca esses trechos junto da pergunta. Só então o modelo responde.',
      },
      {
        title: 'Por que vale a pena',
        text: 'Com RAG, o modelo responde com base em documentos atuais ou privados. Ele alucina menos, porque se apoia em texto real. Pode citar de onde tirou cada informação. E, para atualizar o conhecimento, basta atualizar os documentos. Não é preciso treinar o modelo de novo.',
      },
      {
        title: 'Preparando a biblioteca',
        text: 'Antes das perguntas, o sistema prepara os documentos. Ele corta textos longos em pedaços menores; isso se chama **chunking**. Cada pedaço vira uma lista de números que representa o sentido, chamada **embedding**. Esses números ficam guardados em um **banco vetorial**.',
      },
      {
        title: 'Na hora da pergunta',
        text: 'A pergunta também vira embedding. O banco devolve os pedaços mais parecidos. Esses pedaços entram no pedido, junto da pergunta. Exemplo: você pergunta sobre diárias. O sistema traz o trecho da norma de diárias, e só então o modelo responde.',
      },
      {
        title: 'RAG ou novo treino?',
        text: 'O **ajuste fino** é treinar o modelo de novo com exemplos. Use RAG quando o conhecimento muda muito e você quer citar a fonte. Use ajuste fino para mudar o estilo ou o comportamento do modelo. RAG reduz alucinações, mas não as elimina: se a busca trouxer o trecho errado, a resposta sai ruim.',
      },
      {
        title: 'Resumindo',
        text: 'RAG busca trechos nos documentos e os coloca no pedido antes de gerar. Para atualizar, basta atualizar a base. Conhecimento que muda pede RAG; mudar estilo pede ajuste fino.',
      },
    ],
    words: [
      { term: 'RAG', meaning: 'Buscar trechos em documentos e colocá-los no pedido antes de responder.' },
      { term: 'Chunking', meaning: 'Cortar documentos longos em pedaços menores.' },
      { term: 'Embedding', meaning: 'Lista de números que representa o sentido de um texto.' },
      { term: 'Banco vetorial', meaning: 'Banco que guarda embeddings e acha os mais parecidos.' },
      { term: 'Ajuste fino', meaning: 'Treinar o modelo de novo com exemplos específicos.' },
    ],
    checks: [
      { statement: 'Para atualizar um sistema RAG, é preciso treinar o modelo de novo.', answer: false, why: 'Basta atualizar os documentos da base.' },
      { statement: 'O RAG elimina totalmente as alucinações.', answer: false, why: 'Ele reduz, mas a busca pode falhar.' },
      { statement: 'No RAG, os trechos encontrados entram no pedido junto da pergunta.', answer: true, why: 'Assim o modelo responde apoiado nesses trechos.' },
    ],
  },

  'cap.ia.01:vetores': {
    pages: [
      {
        title: 'Buscar pelo sentido',
        text: 'Uma busca comum procura palavras iguais. Mas e se o documento usa outras palavras com o mesmo sentido? A **busca semântica** procura pelo significado. Ela é a base do RAG e aparece no edital em IA e em Banco de Dados.',
      },
      {
        title: 'Textos viram números',
        text: 'Um **embedding** transforma um texto em uma longa lista de números. Textos com sentido parecido recebem números parecidos. Exemplo: "Tribunal de Contas" e "órgão de controle externo" ficam perto. "Receita de bolo" fica longe. É como um mapa onde ideias parecidas moram no mesmo bairro.',
      },
      {
        title: 'Medindo a proximidade',
        text: 'A medida mais comum é a **similaridade de cosseno**. Ela vai de -1 a 1. Quanto mais perto de 1, mais parecidos são os textos. Perto de -1, eles apontam para lados opostos. Também existe a **distância euclidiana**: quanto menor, mais parecidos.',
      },
      {
        title: 'Onde ficam os números',
        text: 'Um **banco vetorial** guarda os embeddings e responde "quais são os mais parecidos com este?". Com milhões de itens, comparar um por um é lento. Então ele usa uma busca **aproximada**, que perde um pouco de precisão e ganha muita velocidade. O **pgvector** faz isso. Ele é um complemento do PostgreSQL, um banco de dados muito usado.',
      },
      {
        title: 'Cuidados',
        text: 'Use **o mesmo modelo** de embedding para guardar e para perguntar. Números de modelos diferentes não se comparam. E atenção: a LGPD é a lei que protege dados pessoais. Para ela, embeddings feitos com dados pessoais também são dados pessoais.',
      },
      {
        title: 'Resumindo',
        text: 'Embeddings transformam o sentido do texto em números. A similaridade de cosseno perto de 1 indica textos parecidos. Bancos vetoriais, como o pgvector, acham rápido os mais próximos.',
      },
    ],
    words: [
      { term: 'Busca semântica', meaning: 'Busca pelo significado, não pelas palavras exatas.' },
      { term: 'Embedding', meaning: 'Lista de números que representa o sentido de um texto.' },
      { term: 'Similaridade de cosseno', meaning: 'Medida de -1 a 1; perto de 1 indica textos parecidos.' },
      { term: 'Banco vetorial', meaning: 'Banco que guarda embeddings e acha os mais próximos.' },
      { term: 'pgvector', meaning: 'Extensão do PostgreSQL para guardar e buscar embeddings.' },
    ],
    checks: [
      { statement: 'Similaridade de cosseno igual a 1 indica textos opostos.', answer: false, why: 'Igual a 1 indica a mesma direção; -1 é que indica opostos.' },
      { statement: 'O pgvector é uma extensão do PostgreSQL.', answer: true, why: 'Ele adiciona busca por vetores ao PostgreSQL.' },
      { statement: 'Pode-se misturar embeddings de modelos diferentes sem problema.', answer: false, why: 'Números de modelos diferentes não se comparam.' },
    ],
  },

  'cap.ia.01:resumo': {
    pages: [
      {
        title: 'Hora de revisar',
        text: 'Esta parte junta as ideias do capítulo e mostra as armadilhas mais comuns da prova. Use como uma lista de conferência antes do simulado. Se alguma ideia parecer estranha, volte à seção dela.',
      },
      {
        title: 'Como o modelo funciona',
        text: 'O LLM prevê o próximo **token**. Ele só enxerga o que cabe na **janela de contexto**. Ele não consulta a internet sozinho: só busca se o programa oferecer uma ferramenta de busca. Resposta convincente e falsa se chama **alucinação**.',
      },
      {
        title: 'Como pedir',
        text: '**Few-shot** é dar exemplos no pedido, sem mudar o modelo. **Cadeia de pensamento** é pedir raciocínio passo a passo. Temperatura alta deixa a resposta mais variada, não mais previsível. **Delimitadores**, marcas que separam a instrução do texto colado, ajudam contra injeção de prompt. Mas não resolvem sozinhos.',
      },
      {
        title: 'Como dar conhecimento',
        text: '**RAG** busca trechos e os coloca no pedido antes de gerar. Para atualizar, basta atualizar a base. O **embedding** representa o sentido em números. A busca nos embeddings é feita por um **banco vetorial**, como o pgvector.',
      },
      {
        title: 'Armadilhas clássicas',
        text: 'Falso: "RAG elimina alucinações". Falso: "janela maior sempre ajuda". Falso: "cosseno 1 indica textos opostos". Verdadeiro: "conhecimento atualizável e com fonte pede RAG, não ajuste fino". Exemplo de uso: se a questão fala em "exemplos no prompt", pense em few-shot.',
      },
      {
        title: 'Resumindo',
        text: 'O LLM prevê tokens e só vê a janela de contexto. Few-shot usa exemplos sem mudar o modelo. RAG reduz alucinações, mas não as elimina.',
      },
    ],
    words: [
      { term: 'Token', meaning: 'Pedaço de texto que o modelo lê e escreve.' },
      { term: 'Alucinação', meaning: 'Resposta convincente, porém falsa.' },
      { term: 'Few-shot', meaning: 'Pedido com exemplos, sem mudar o modelo por dentro.' },
      { term: 'RAG', meaning: 'Buscar trechos e colocá-los no pedido antes de responder.' },
      { term: 'Delimitador', meaning: 'Marca que separa a instrução do texto colado.' },
    ],
    checks: [
      { statement: 'O LLM consulta a internet sozinho a cada resposta.', answer: false, why: 'Só busca se o programa oferecer uma ferramenta.' },
      { statement: 'Few-shot é dar exemplos no próprio pedido.', answer: true, why: 'Os exemplos ficam só no prompt.' },
      { statement: 'Delimitadores eliminam totalmente a injeção de prompt.', answer: false, why: 'Ajudam, mas não resolvem sozinhos.' },
    ],
  },

  // ───────────── IA, capítulo 2: Agentes e MCP ─────────────
  'cap.ia.02:agentes': {
    pages: [
      {
        title: 'Do conversar ao fazer',
        text: 'Um assistente de conversa só responde. Um **agente** age. Ele recebe um objetivo, decide os passos, usa ferramentas e confere o resultado. Exemplo: você pede "corrija este erro" e ele lê os arquivos, edita o código e roda os testes. O edital chama isso de sistemas agentivos.',
      },
      {
        title: 'Do que um agente é feito',
        text: 'Pense em um agente como um modelo de linguagem dentro de uma **repetição**, com acesso a **ferramentas**. As ferramentas são ações como ler arquivos, rodar comandos ou buscar na web. O programa executa a ferramenta, mostra o resultado ao modelo e repete até terminar.',
      },
      {
        title: 'Quem aperta o botão',
        text: 'No **uso de ferramentas**, o modelo não executa nada sozinho. Ele só **pede**: "use a ferramenta X com estes dados". Quem executa é o **programa** que hospeda o modelo. Esse programa pode negar, pedir sua confirmação ou limitar a ação. Isso cai muito em prova.',
      },
      {
        title: 'Terminal ou editor',
        text: 'Há dois formatos comuns. No **terminal**, ou CLI, o agente roda na tela de comandos, dentro da pasta do projeto. O edital cita o **Claude Code** e o Antigravity CLI. **Integrado à IDE**, o agente trabalha dentro do editor de código.',
      },
      {
        title: 'Dizer o quê, não o como',
        text: 'Na **programação baseada em intenção**, você descreve **o que** quer, em palavras comuns. O agente decide **como** fazer. O seu papel vira explicar bem, revisar e conferir. Aceitar o código quase sem ler é perigoso, sobretudo no setor público.',
      },
      {
        title: 'Resumindo',
        text: 'Um agente é um modelo em repetição, com ferramentas. O modelo pede a ferramenta; o programa executa. Você continua responsável por revisar e conferir.',
      },
    ],
    words: [
      { term: 'Agente', meaning: 'Sistema com IA que recebe um objetivo e age usando ferramentas.' },
      { term: 'Ferramenta', meaning: 'Ação que o agente pode pedir, como ler arquivo ou rodar comando.' },
      { term: 'Uso de ferramentas', meaning: 'O modelo pede uma ação e o programa a executa.' },
      { term: 'CLI', meaning: 'Tela de comandos em texto, também chamada terminal.' },
      { term: 'IDE', meaning: 'Programa editor usado para escrever código.' },
    ],
    checks: [
      { statement: 'O modelo executa diretamente os comandos que decide.', answer: false, why: 'Ele só pede; o programa executa.' },
      { statement: 'O Claude Code é citado no edital.', answer: true, why: 'Ele aparece como exemplo de agente no terminal.' },
      { statement: 'Um agente pode ler arquivos e rodar testes.', answer: true, why: 'Essas ações são as ferramentas dele.' },
    ],
  },

  'cap.ia.02:ciclo': {
    pages: [
      {
        title: 'Um ciclo de quatro passos',
        text: 'Quando um agente trabalha, ele segue um **ciclo** que se repete até a tarefa ficar pronta. São quatro fases: descobrir, planejar, agir e verificar. Pense em um pedreiro que olha a obra, faz o plano, constrói e depois confere com o prumo.',
      },
      {
        title: 'Descobrir e planejar',
        text: 'Primeiro, o agente **investiga**: lê as pastas, os arquivos ligados à tarefa, as regras do projeto e os testes. Depois, **planeja**: divide o objetivo em passos e escolhe onde mexer. Em tarefas grandes, há um **modo de planejamento**, em que você aprova o plano antes de ele agir.',
      },
      {
        title: 'Agir com cuidado',
        text: 'Na fase de ação, o agente edita arquivos e roda comandos. Por isso as permissões importam. Dê só o necessário, o **menor privilégio**. Exija confirmação para apagar arquivos ou publicar algo. E, se possível, rode o agente em um ambiente isolado.',
      },
      {
        title: 'Conferir e se corrigir',
        text: 'Depois de agir, o agente **verifica**: roda os testes e lê as mensagens de erro. Se algo falha, ele corrige e confere de novo. O edital chama isso de **autocorreção**. Exemplo: um teste antigo falha, o agente lê o erro, ajusta o código e roda tudo até passar.',
      },
      {
        title: 'O humano continua no comando',
        text: 'A verificação só vale o que valem os testes. Se não há teste, o agente não percebe o que quebrou. Por isso a pessoa revisa as mudanças e decide sobre ações sem volta. Isso se chama **humano no laço**.',
      },
      {
        title: 'Resumindo',
        text: 'O ciclo é descobrir, planejar, agir e verificar, repetindo. A autocorreção usa o resultado dos testes. A responsabilidade final é de quem aprova.',
      },
    ],
    words: [
      { term: 'Ciclo agentivo', meaning: 'Descobrir, planejar, agir e verificar, repetindo até terminar.' },
      { term: 'Modo de planejamento', meaning: 'O agente mostra o plano e só age depois da aprovação.' },
      { term: 'Menor privilégio', meaning: 'Dar só as permissões necessárias para a tarefa.' },
      { term: 'Autocorreção', meaning: 'O agente corrige os próprios erros usando o resultado dos testes.' },
      { term: 'Humano no laço', meaning: 'Uma pessoa revisa e aprova as decisões importantes.' },
    ],
    checks: [
      { statement: 'O ciclo agentivo termina sempre depois da primeira ação.', answer: false, why: 'Ele se repete até a tarefa ficar pronta.' },
      { statement: 'Na autocorreção, o agente usa o resultado dos testes.', answer: true, why: 'Ele lê o erro, corrige e confere de novo.' },
      { statement: 'Apagar arquivos deve exigir confirmação.', answer: true, why: 'Ações sem volta pedem aprovação humana.' },
    ],
  },

  'cap.ia.02:mcp': {
    pages: [
      {
        title: 'Uma tomada padrão',
        text: 'Antes, cada aplicativo de IA precisava de uma ligação própria com cada sistema. O **MCP**, ou Model Context Protocol, é um **protocolo**: um conjunto de regras comum para essas ligações. A documentação oficial compara o MCP a uma porta USB-C. Ele foi lançado pela Anthropic, empresa de IA, em novembro de 2024.',
      },
      {
        title: 'Menos ligações',
        text: 'Imagine 3 aplicativos de IA e 4 sistemas. Sem padrão, podem ser necessárias até 3 vezes 4, ou 12 ligações diferentes. Com o MCP, cada aplicativo e cada sistema implementa o padrão uma vez: 3 mais 4, ou 7.',
      },
      {
        title: 'Quem é quem',
        text: 'O **host** é o aplicativo de IA que você usa. Dentro dele há **clientes**. Cada cliente conversa com **um único servidor**. O **servidor** é o programa que oferece acesso a algo, como o GitHub ou um banco de dados. Um host pode ter vários clientes.',
      },
      {
        title: 'O que um servidor oferece',
        text: 'As **tools**, ou ferramentas, são ações que o modelo pode pedir, como buscar um processo. Os **resources**, ou recursos, são dados para consulta, como o conteúdo de um arquivo. Os **prompts** são modelos de pedido prontos, que o usuário escolhe usar.',
      },
      {
        title: 'Cuidados de segurança',
        text: 'Um servidor MCP pode ler dados e agir em seu nome. Então instale só servidores de origem confiável. Dê o mínimo de permissões. Peça confirmação para ações importantes. E desconfie do que o servidor devolve: pode conter instruções maliciosas escondidas.',
      },
      {
        title: 'Resumindo',
        text: 'O MCP é um padrão para ligar aplicativos de IA a ferramentas e dados. Cada cliente fala com um servidor. Tools são ações; resources são dados.',
      },
    ],
    words: [
      { term: 'Protocolo', meaning: 'Conjunto de regras comuns para sistemas conversarem.' },
      { term: 'MCP', meaning: 'Padrão aberto para ligar aplicativos de IA a ferramentas e dados.' },
      { term: 'Host', meaning: 'Aplicativo de IA que você usa e que contém os clientes.' },
      { term: 'Servidor MCP', meaning: 'Programa que oferece ferramentas e dados ao aplicativo de IA.' },
      { term: 'Tools', meaning: 'Ações que o modelo pode pedir ao servidor.' },
      { term: 'Resources', meaning: 'Dados que o servidor oferece como contexto.' },
    ],
    checks: [
      { statement: 'No MCP, cada cliente conversa com vários servidores.', answer: false, why: 'Cada cliente fala com um servidor; o host pode ter vários clientes.' },
      { statement: 'Resources são funções que o modelo executa.', answer: false, why: 'Funções são tools; resources são dados.' },
      { statement: 'O MCP é comparado a uma porta USB-C.', answer: true, why: 'É um padrão comum para várias ligações.' },
    ],
  },

  'cap.ia.02:skills': {
    pages: [
      {
        title: 'Ensinar o jeito da equipe',
        text: 'Um agente sabe programar, mas não conhece o jeito do seu órgão. Ele não sabe, por exemplo, quais conferências são obrigatórias antes de salvar. Repetir isso em toda conversa cansa e gasta espaço. Por isso existem formas de **estender** o agente.',
      },
      {
        title: 'As formas de estender',
        text: 'Há **instruções do projeto**, como o arquivo `CLAUDE.md`, lidas no início. Há **skills**, pacotes de instruções para tarefas especiais. Há **servidores MCP**, que dão novas ações. Há **comandos personalizados**, que são atalhos. E há **hooks**, ações automáticas disparadas por um evento.',
      },
      {
        title: 'O que é uma skill',
        text: 'Uma **skill** é uma pasta com um arquivo chamado `SKILL.md`. No começo do arquivo ficam o nome e a descrição. Depois vem o passo a passo. Exemplo: uma skill de "revisão de acessibilidade" com uma lista de conferência de apoio.',
      },
      {
        title: 'Carregar só quando precisa',
        text: 'No início, o agente vê só o **nome e a descrição** de cada skill. O conteúdo completo só entra quando a tarefa pede. Isso se chama **divulgação progressiva**. É como um índice de livro: você vê os títulos e abre só o capítulo que interessa.',
      },
      {
        title: 'Pedido ou garantia?',
        text: 'Instruções em texto, como o `CLAUDE.md` ou uma skill, **orientam** o modelo, mas ele pode não seguir. Um **hook** ou uma regra de permissão é executado pelo programa e **garante** o comportamento. Para segurança, prefira garantias a pedidos.',
      },
      {
        title: 'Resumindo',
        text: 'Skills são pacotes de instruções carregados só quando a tarefa pede. Instruções orientam; hooks e permissões garantem.',
      },
    ],
    words: [
      { term: 'Skill', meaning: 'Pacote de instruções carregado quando a tarefa pede.' },
      { term: 'Hook', meaning: 'Ação automática que o programa executa em um evento.' },
      { term: 'Divulgação progressiva', meaning: 'Mostrar primeiro só nome e descrição, e o resto quando preciso.' },
      { term: 'Comando personalizado', meaning: 'Atalho que dispara um fluxo de trabalho pronto.' },
      { term: 'SKILL.md', meaning: 'Arquivo principal de uma skill, com nome, descrição e passos.' },
    ],
    checks: [
      { statement: 'Skills carregam todo o conteúdo desde o início.', answer: false, why: 'Primeiro só o nome e a descrição.' },
      { statement: 'Um hook garante um comportamento sem depender do modelo.', answer: true, why: 'Ele é executado pelo programa.' },
      { statement: 'Uma instrução no CLAUDE.md garante que o agente nunca fará algo.', answer: false, why: 'Instruções orientam; não garantem.' },
    ],
  },

  'cap.ia.02:qualidade': {
    pages: [
      {
        title: 'IA faz rascunho',
        text: 'A IA pode gerar, revisar, documentar e corrigir código, e também criar testes. Mas o que ela entrega é um **rascunho** que precisa ser conferido. Regra prática: quanto mais difícil conferir a resposta, mais cuidado você deve ter.',
      },
      {
        title: 'Quando o código alucina',
        text: 'A IA pode chamar uma função que não existe. Pode sugerir um pacote que não existe. Pode escrever um código que funciona, mas faz outra coisa. E pode criar um teste que sempre passa. Por isso o código gerado passa pelos mesmos controles do código feito por pessoas.',
      },
      {
        title: 'Um golpe com nomes inventados',
        text: 'Atacantes registram pacotes com nomes que a IA costuma inventar. Quando alguém instala o pacote sugerido, instala o programa do golpista. Isso ganhou o apelido de **slopsquatting**. A defesa é conferir no **repositório oficial**, o site que distribui os pacotes, antes de instalar.',
      },
      {
        title: 'Como conferir',
        text: 'Use **testes automáticos** a cada mudança. Use ferramentas que analisam o código. Peça **revisão** de uma pessoa que entenda a mudança. Compare com o que foi pedido. Atenção: testes que passam só provam o que eles cobrem.',
      },
      {
        title: 'Dados e responsabilidade',
        text: 'Mandar código ou dados a um serviço de IA é entregar informação a outra empresa. Dados pessoais e sigilosos não devem ir para ferramentas não autorizadas. No TCE-GO, o uso de IA segue a Resolução Administrativa nº 24/2024. E a responsabilidade pelo código é de quem aprova, não da ferramenta.',
      },
      {
        title: 'Resumindo',
        text: 'Código de IA é rascunho e precisa de testes e revisão. Confira pacotes antes de instalar. Quem aprova o código responde por ele.',
      },
    ],
    words: [
      { term: 'Rascunho', meaning: 'Versão inicial que ainda precisa ser conferida.' },
      { term: 'Pacote', meaning: 'Conjunto de código pronto que se instala para usar no projeto.' },
      { term: 'Slopsquatting', meaning: 'Golpe de registrar pacotes com nomes que a IA costuma inventar.' },
      { term: 'Teste automático', meaning: 'Programa que confere sozinho se o código faz o esperado.' },
      { term: 'Revisão de código', meaning: 'Uma pessoa lê e avalia a mudança antes de aprovar.' },
    ],
    checks: [
      { statement: 'Se os testes passaram, o código gerado está totalmente correto.', answer: false, why: 'Só está correto no que os testes cobrem.' },
      { statement: 'Antes de instalar um pacote sugerido pela IA, confira se ele existe no repositório oficial.', answer: true, why: 'Isso evita o slopsquatting.' },
      { statement: 'A responsabilidade pelo código é da ferramenta de IA.', answer: false, why: 'É de quem aprova e publica.' },
    ],
  },

  // ───────────── IA, capítulo 3: Fundamentos ─────────────
  'cap.ia.03:aprendizado': {
    pages: [
      {
        title: 'Para que serve no Tribunal?',
        text: 'Um Tribunal analisa milhares de contratos. A IA pode apontar quais parecem suspeitos. Há dois jeitos de fazer isso. No jeito **simbólico**, pessoas escrevem regras: "se passar de X sem licitação, alerte". No **aprendizado de máquina**, o sistema aprende sozinho a partir de exemplos antigos.',
      },
      {
        title: 'Aprender com gabarito',
        text: 'No **aprendizado supervisionado**, cada exemplo vem com a resposta certa, chamada **rótulo**. É como estudar com gabarito. Se a resposta é uma categoria, como "regular" ou "suspeita", é **classificação**. Se é um número, como o preço de uma obra, é **regressão**.',
      },
      {
        title: 'Uma pegadinha de nome',
        text: 'A **regressão logística**, apesar do nome, serve para **classificação**. Ela calcula a chance de algo pertencer a uma categoria. Exemplo: a chance de uma nota fiscal ser suspeita. Essa troca de nomes cai em prova.',
      },
      {
        title: 'Aprender sem gabarito',
        text: 'No **aprendizado não supervisionado**, os dados não têm rótulo. O sistema procura padrões sozinho. Exemplo: o **agrupamento** junta itens parecidos, como fornecedores com comportamento semelhante. No **k-means**, um método de agrupamento famoso, você precisa dizer antes quantos grupos quer.',
      },
      {
        title: 'Aprender por tentativa',
        text: 'No **aprendizado por reforço**, um **agente** age em um ambiente e recebe **recompensas** ou punições. Ele aprende por tentativa e erro, como um cachorro que ganha petisco ao obedecer. Não há gabarito com a ação certa.',
      },
      {
        title: 'Decorar não é aprender',
        text: 'O **overfitting** é quando o modelo decora os exemplos de treino. Ele acerta quase tudo no treino, mas erra muito em dados novos. O **underfitting** é o oposto: o modelo é simples demais e erra em tudo. Pense no aluno que decorou a prova antiga e trava na nova.',
      },
      {
        title: 'Resumindo',
        text: 'Supervisionado usa gabarito; não supervisionado acha padrões; por reforço aprende com recompensas. Regressão logística classifica. Overfitting é decorar o treino e errar no novo.',
      },
    ],
    words: [
      { term: 'Aprendizado de máquina', meaning: 'O sistema aprende padrões a partir de exemplos.' },
      { term: 'Rótulo', meaning: 'A resposta certa que acompanha cada exemplo de treino.' },
      { term: 'Classificação', meaning: 'Prever uma categoria, como regular ou suspeita.' },
      { term: 'Regressão', meaning: 'Prever um número, como um preço.' },
      { term: 'Agrupamento', meaning: 'Juntar itens parecidos sem ter rótulos.' },
      { term: 'Recompensa', meaning: 'Sinal de acerto ou erro no aprendizado por reforço.' },
      { term: 'Overfitting', meaning: 'Modelo que decorou o treino e erra em dados novos.' },
    ],
    checks: [
      { statement: 'A regressão logística é usada para classificação.', answer: true, why: 'Ela estima a chance de pertencer a uma categoria.' },
      { statement: 'No k-means, o sistema descobre sozinho quantos grupos criar.', answer: false, why: 'O número de grupos é definido antes.' },
      { statement: 'No aprendizado por reforço, o agente aprende com recompensas.', answer: true, why: 'Ele aprende por tentativa e erro.' },
    ],
  },

  'cap.ia.03:redes': {
    pages: [
      {
        title: 'Inspiradas no cérebro',
        text: 'As **redes neurais artificiais** são a base de quase toda IA moderna, inclusive dos modelos de linguagem. Elas são inspiradas, de forma bem simples, nos neurônios do cérebro. A prova costuma cobrar o vocabulário: neurônio, peso, camada e ativação.',
      },
      {
        title: 'Um neurônio por dentro',
        text: 'Um **neurônio artificial** recebe números de entrada. Ele multiplica cada um por um **peso**, que diz a importância daquela entrada. Soma tudo e passa o resultado por uma **função de ativação**, que decide a saída. Pense em uma receita: cada ingrediente tem uma quantidade, e o forno decide o resultado.',
      },
      {
        title: 'Camadas',
        text: 'A rede tem uma camada de **entrada**, que recebe os dados. Tem camadas **ocultas**, no meio, que combinam as informações. E tem a camada de **saída**, que dá a resposta. Uma rede com várias camadas ocultas é chamada de **profunda**. Daí vem o nome **deep learning**.',
      },
      {
        title: 'Como a rede aprende',
        text: 'A rede faz uma previsão e mede o erro. Depois, a **retropropagação** calcula quanto cada peso contribuiu para o erro, da saída para a entrada. Então os pesos são ajustados um pouco. A **taxa de aprendizado** é o tamanho desse ajuste. Alta demais, o treino fica instável; baixa demais, fica lento.',
      },
      {
        title: 'Tipos de rede famosos',
        text: 'A **CNN** é boa com **imagens**: ela procura padrões em pedaços da figura. A **RNN** trabalha com **sequências**, como texto e séries no tempo. O **Transformer** usa **atenção**: cada palavra olha para todas as outras ao mesmo tempo. Ele é a base dos modelos de linguagem.',
      },
      {
        title: 'Resumindo',
        text: 'Um neurônio soma entradas com pesos e aplica uma ativação. Muitas camadas ocultas formam o deep learning. CNN serve para imagens; Transformer é a base dos LLMs.',
      },
    ],
    words: [
      { term: 'Rede neural', meaning: 'Modelo feito de neurônios artificiais ligados em camadas.' },
      { term: 'Peso', meaning: 'Número que diz a importância de cada entrada.' },
      { term: 'Função de ativação', meaning: 'Regra que decide a saída do neurônio.' },
      { term: 'Deep learning', meaning: 'Aprendizado com redes de muitas camadas ocultas.' },
      { term: 'Retropropagação', meaning: 'Cálculo de quanto cada peso contribuiu para o erro.' },
      { term: 'CNN', meaning: 'Rede neural especializada em imagens.' },
      { term: 'Transformer', meaning: 'Rede baseada em atenção; base dos modelos de linguagem.' },
    ],
    checks: [
      { statement: 'Redes com várias camadas ocultas são chamadas de profundas.', answer: true, why: 'Daí vem o nome deep learning.' },
      { statement: 'Uma taxa de aprendizado muito alta deixa o treino sempre mais estável.', answer: false, why: 'Ela pode deixar o treino instável.' },
      { statement: 'A CNN é indicada para imagens.', answer: true, why: 'Ela procura padrões em pedaços da figura.' },
    ],
  },

  'cap.ia.03:pln': {
    pages: [
      {
        title: 'Computador lendo texto',
        text: 'O **processamento de linguagem natural**, ou PLN, faz o computador lidar com texto e fala humanos. No Tribunal, ele ajuda a separar denúncias por assunto, tirar dados de editais e analisar milhares de pareceres.',
      },
      {
        title: 'Preparando o texto',
        text: 'Primeiro, a **tokenização** corta o texto em pedaços, como palavras. Exemplo: "Contrato vencido." vira "Contrato", "vencido" e ".". Depois vem a **normalização**, como passar tudo para minúsculas. A remoção de **stopwords** tira palavras muito comuns, como "o", "de" e "que".',
      },
      {
        title: 'Cortar ou consultar o dicionário',
        text: 'O **stemming** corta o fim das palavras por regras e pode gerar algo que nem é palavra: "licitações" vira "licit". A **lematização** leva a palavra à forma do dicionário: "fiscalizaram" vira "fiscalizar". A lematização é mais precisa; o stemming é mais rápido.',
      },
      {
        title: 'Texto vira número',
        text: 'No **saco de palavras**, o texto vira uma contagem de palavras, e a ordem é ignorada. Assim, "o fiscal multou a empresa" e "a empresa multou o fiscal" ficam iguais. O **TF-IDF** é outra forma de contar. Ele dá peso baixo a palavras presentes em quase todos os documentos. As raras ganham peso alto.',
      },
      {
        title: 'Tarefas comuns',
        text: 'A **classificação de texto** dá uma categoria ao documento. O **reconhecimento de entidades**, ou NER, encontra nomes de pessoas, empresas, lugares e valores. A **análise de sentimento** diz se um texto é positivo, negativo ou neutro. Cuidado: tirar a palavra "não" pode inverter o sentido.',
      },
      {
        title: 'Resumindo',
        text: 'Tokenizar é cortar o texto em pedaços. Stemming corta por regra; lematização usa o dicionário. No saco de palavras, a ordem não importa.',
      },
    ],
    words: [
      { term: 'PLN', meaning: 'Área que faz o computador lidar com texto e fala humanos.' },
      { term: 'Tokenização', meaning: 'Cortar o texto em pedaços, como palavras.' },
      { term: 'Stopwords', meaning: 'Palavras muito comuns e pouco informativas, como "de".' },
      { term: 'Stemming', meaning: 'Cortar o fim das palavras por regras.' },
      { term: 'Lematização', meaning: 'Levar a palavra à forma do dicionário.' },
      { term: 'NER', meaning: 'Tarefa de achar nomes de pessoas, empresas, lugares e valores.' },
    ],
    checks: [
      { statement: 'Stemming e lematização dão sempre o mesmo resultado.', answer: false, why: 'Um corta por regra; o outro usa o dicionário.' },
      { statement: 'No saco de palavras, a ordem das palavras é ignorada.', answer: true, why: 'Só importa quantas vezes cada palavra aparece.' },
      { statement: 'O NER encontra nomes de pessoas e empresas em um texto.', answer: true, why: 'É o reconhecimento de entidades nomeadas.' },
    ],
  },

  // ───────────── IA, capítulo 4: Ética e dados ─────────────
  'cap.ia.04:etica': {
    pages: [
      {
        title: 'IA também precisa de regras',
        text: 'Um Tribunal pode usar IA para escolher o que auditar. E pode fiscalizar a IA usada por prefeituras. Se a IA errar sempre contra o mesmo grupo, há injustiça. A **IA responsável** é o conjunto de cuidados para que a IA seja segura, justa e controlável.',
      },
      {
        title: 'Os princípios principais',
        text: '**Justiça**: não prejudicar grupos sem razão. **Transparência**: saber que há uma IA em uso. **Explicabilidade**: conseguir dizer por que ela decidiu assim. **Responsabilização**: alguém responde pelas decisões. **Supervisão humana**: pessoas podem corrigir ou parar o sistema.',
      },
      {
        title: 'O que é viés',
        text: 'O **viés algorítmico** é um erro que se repete e favorece ou prejudica certos grupos. Exemplo: um modelo treinado com fiscalizações antigas aponta sempre os mesmos municípios, só porque eles sempre foram mais fiscalizados. Tirar dados como sexo ou raça não basta: outros dados, como o CEP, podem revelar a mesma coisa.',
      },
      {
        title: 'Confiar demais na máquina',
        text: 'O **viés de automação** é quando a pessoa aceita a resposta da máquina sem conferir. Exemplo: o auditor recebe uma lista de risco e não confere nada. Por isso a revisão humana precisa ser de verdade, não só um carimbo.',
      },
      {
        title: 'Explicar a decisão',
        text: '**Explicabilidade**, ou XAI, reúne técnicas para entender decisões de modelos. Alguns modelos são claros por natureza, como uma árvore de decisão pequena. Para modelos complexos, há técnicas como **LIME** e **SHAP**. Elas mostram quais dados pesaram mais em uma decisão.',
      },
      {
        title: 'Governança de IA',
        text: '**Governança de IA** é organizar como a instituição usa IA: lista dos sistemas em uso, regras de uso, responsáveis e acompanhamento. No TCE-GO, o uso de ferramentas de IA é tratado pela Resolução Administrativa nº 24/2024, citada no edital. O edital não cita normas internacionais de IA.',
      },
      {
        title: 'Resumindo',
        text: 'IA responsável busca justiça, transparência, explicação e supervisão humana. Tirar a variável sensível não elimina o viés. LIME e SHAP ajudam a explicar decisões.',
      },
    ],
    words: [
      { term: 'IA responsável', meaning: 'Cuidados para a IA ser segura, justa e controlável.' },
      { term: 'Viés algorítmico', meaning: 'Erro repetido que favorece ou prejudica certos grupos.' },
      { term: 'Viés de automação', meaning: 'Confiar demais na resposta da máquina sem conferir.' },
      { term: 'Explicabilidade', meaning: 'Conseguir dizer por que a IA chegou àquela decisão.' },
      { term: 'SHAP', meaning: 'Técnica que mostra quanto cada dado pesou na decisão.' },
      { term: 'Governança de IA', meaning: 'Regras, responsáveis e controle do uso de IA.' },
    ],
    checks: [
      { statement: 'Remover sexo e raça dos dados garante um modelo sem viés.', answer: false, why: 'Outros dados, como o CEP, podem revelar o mesmo.' },
      { statement: 'Viés de automação é confiar demais na máquina.', answer: true, why: 'A pessoa aceita a saída sem conferir.' },
      { statement: 'Explicabilidade é conseguir dizer por que a IA decidiu.', answer: true, why: 'É o objetivo da XAI.' },
    ],
  },

  'cap.ia.04:lgpd-ebia': {
    pages: [
      {
        title: 'IA e dados de pessoas',
        text: 'Muitos sistemas de IA usam **dados pessoais**: nome, CPF, endereço. A **LGPD**, Lei nº 13.709/2018, é a lei que protege esses dados. Ela vale em todas as etapas da IA: ao coletar, treinar, usar o modelo e guardar resultados.',
      },
      {
        title: 'Anonimizado ou pseudonimizado',
        text: 'Um dado **anonimizado** não permite mais saber de quem é. Então a lei deixa de valer para ele. A exceção é quando dá para reverter com esforço razoável. Um dado **pseudonimizado** só troca o nome por um código. Como a ligação ainda pode ser refeita, ele continua sendo dado pessoal.',
      },
      {
        title: 'Só o necessário',
        text: 'A LGPD tem princípios. A **finalidade** diz que o dado deve ser usado para um propósito claro. A **necessidade** diz para usar só o mínimo. Exemplo: não colete o endereço de alguém "porque pode ser útil um dia". A **não discriminação** proíbe usar dados para discriminar.',
      },
      {
        title: 'Não é só consentimento',
        text: 'Todo uso de dados precisa de uma **base legal**, ou seja, um motivo previsto na lei. O artigo 7º traz dez motivos. O **consentimento** é só um deles. O poder público costuma usar outros, como cumprir uma obrigação legal ou executar políticas públicas.',
      },
      {
        title: 'Decisão feita por máquina',
        text: 'Às vezes uma máquina decide sozinha algo que afeta você. O **artigo 20** dá o direito de pedir **revisão** dessa decisão. Pegadinha: o texto atual não exige que a revisão seja feita por uma pessoa. Mesmo assim, revisão humana é uma boa prática.',
      },
      {
        title: 'O plano do Brasil para IA',
        text: 'A **Estratégia Brasileira de Inteligência Artificial**, ou **EBIA**, orienta a política pública de IA no país. Segundo as fontes do material, ela foi criada em 2021 pelo MCTI, o ministério da ciência. Ela tem nove eixos, ou seja, nove temas. Esses dados vieram de fontes secundárias; o texto oficial deve ser conferido.',
      },
      {
        title: 'Resumindo',
        text: 'A LGPD vale sempre que a IA usa dados pessoais. Pseudonimizado ainda é dado pessoal. Consentimento não é a única base legal, e o artigo 20 garante revisão de decisões automáticas.',
      },
    ],
    words: [
      { term: 'Dado pessoal', meaning: 'Informação ligada a uma pessoa, como nome ou CPF.' },
      { term: 'LGPD', meaning: 'Lei brasileira que protege os dados pessoais.' },
      { term: 'Anonimizado', meaning: 'Dado que não permite mais saber de quem é.' },
      { term: 'Pseudonimizado', meaning: 'Dado com o nome trocado por código; ainda é pessoal.' },
      { term: 'Base legal', meaning: 'Motivo previsto na lei que permite usar o dado.' },
      { term: 'EBIA', meaning: 'Estratégia Brasileira de Inteligência Artificial, a política pública do país.' },
    ],
    checks: [
      { statement: 'O consentimento é a única base legal da LGPD.', answer: false, why: 'O artigo 7º traz dez motivos.' },
      { statement: 'Dados pseudonimizados continuam sendo dados pessoais.', answer: true, why: 'A ligação com a pessoa ainda pode ser refeita.' },
      { statement: 'O artigo 20 permite pedir revisão de decisões feitas só por máquina.', answer: true, why: 'É o direito de revisão de decisões automatizadas.' },
    ],
  },

  'cap.ia.04:ciencia-dados': {
    pages: [
      {
        title: 'Dos dados à resposta',
        text: 'A **ciência de dados** transforma dados brutos em respostas úteis. No Tribunal, por exemplo, ela cruza pagamentos de prefeituras para achar sinais de sobrepreço. O caminho tem etapas: coletar, limpar, transformar, explorar e analisar.',
      },
      {
        title: 'Limpar antes de usar',
        text: 'Dados reais vêm bagunçados. Exemplo: o mesmo fornecedor escrito de três formas, ou um CNPJ faltando dígitos. A **limpeza** corrige isso. Um **outlier** é um valor muito fora do padrão. Ele pode ser erro de digitação ou o próprio achado da auditoria, então não se apaga sem analisar.',
      },
      {
        title: 'Média e mediana',
        text: 'Pagamentos de 2, 3, 3, 5 e 12 mil reais. A **média** soma tudo e divide: 25 dividido por 5 dá 5. A **mediana** é o valor do meio, com os números em ordem: 3. A **moda** é o que mais aparece: 3. O valor de 12 puxa a média, mas não mexe na mediana.',
      },
      {
        title: 'Andar junto não é causar',
        text: 'A **correlação** mede se duas coisas sobem ou descem juntas. Mas **correlação não é causa**. Exemplo: cidades com mais auditorias têm mais irregularidades registradas. Isso não quer dizer que a auditoria cause irregularidade. As duas podem depender de uma terceira coisa, como o volume de dinheiro recebido.',
      },
      {
        title: 'Acertar no geral engana',
        text: 'Imagine 1.000 contratos, só 50 irregulares. Um modelo que diz "regular" para tudo acerta 95%. Essa é a **acurácia**, e ela engana aqui. A **precisão** pergunta: dos que apontei, quantos eram irregulares? A **revocação** pergunta: dos irregulares, quantos encontrei?',
      },
      {
        title: 'Resumindo',
        text: 'Limpe os dados e analise os outliers antes de apagar. A mediana resiste a valores extremos. Correlação não é causa, e acurácia alta pode enganar.',
      },
    ],
    words: [
      { term: 'Ciência de dados', meaning: 'Transformar dados brutos em respostas úteis.' },
      { term: 'Outlier', meaning: 'Valor muito fora do padrão dos outros.' },
      { term: 'Mediana', meaning: 'Valor do meio quando os números estão em ordem.' },
      { term: 'Correlação', meaning: 'Medida de quanto duas coisas variam juntas.' },
      { term: 'Acurácia', meaning: 'Porcentagem de acertos no geral.' },
      { term: 'Precisão', meaning: 'Dos casos apontados, quantos estavam certos.' },
      { term: 'Revocação', meaning: 'Dos casos reais, quantos o modelo encontrou.' },
    ],
    checks: [
      { statement: 'A mediana é menos afetada por valores extremos que a média.', answer: true, why: 'Ela depende só do valor do meio.' },
      { statement: 'Correlação forte prova que uma coisa causa a outra.', answer: false, why: 'Pode haver uma terceira causa ou coincidência.' },
      { statement: 'Outliers devem ser apagados sempre, sem análise.', answer: false, why: 'Eles podem ser o próprio achado da auditoria.' },
    ],
  },

  'cap.ia.04:big-data': {
    pages: [
      {
        title: 'Dados demais para um computador',
        text: 'Pense em todas as notas fiscais de um estado durante vários anos. Um computador comum não dá conta. **Big Data** é o nome dado a dados grandes, rápidos ou variados demais para as ferramentas comuns.',
      },
      {
        title: 'Os três Vs',
        text: 'O edital cita três Vs. **Volume**: a quantidade enorme de dados. **Velocidade**: o ritmo em que os dados chegam. **Variedade**: os formatos diferentes, como planilhas, PDFs e fotos. Alguns autores somam **veracidade** e **valor**, mas os três originais são volume, velocidade e variedade.',
      },
      {
        title: 'Dividir o trabalho',
        text: 'No **processamento distribuído**, o trabalho é dividido entre várias máquinas, que formam um **cluster**. É como uma fila de banco com muitos caixas. Para crescer, você acrescenta máquinas comuns. A ideia é levar o trabalho até onde os dados estão. Assim, não é preciso mover tudo pela rede.',
      },
      {
        title: 'Hadoop',
        text: 'O **Hadoop** é um conjunto de ferramentas para guardar e processar dados em cluster. O **HDFS**, o sistema de arquivos do Hadoop, divide arquivos em blocos e guarda cópias em várias máquinas. O **NameNode** sabe onde está cada bloco; os **DataNodes** guardam os blocos. O **MapReduce** processa em partes e depois junta os resultados.',
      },
      {
        title: 'Spark e onde guardar',
        text: 'O **Spark** mantém os dados na memória entre as etapas. Por isso costuma ser mais rápido que o MapReduce em tarefas repetitivas. O **data warehouse** guarda dados já tratados e organizados. O **data lake** guarda dados brutos, em qualquer formato.',
      },
      {
        title: 'Resumindo',
        text: 'Os três Vs originais são volume, velocidade e variedade. O processamento distribuído divide o trabalho entre máquinas. No HDFS, o NameNode sabe onde ficam os blocos, e o Spark trabalha em memória.',
      },
    ],
    words: [
      { term: 'Big Data', meaning: 'Dados grandes, rápidos ou variados demais para ferramentas comuns.' },
      { term: 'Cluster', meaning: 'Grupo de computadores trabalhando juntos.' },
      { term: 'Hadoop', meaning: 'Conjunto de ferramentas para guardar e processar dados em cluster.' },
      { term: 'NameNode', meaning: 'Parte do HDFS que sabe onde está cada bloco.' },
      { term: 'Spark', meaning: 'Ferramenta de processamento distribuído que trabalha em memória.' },
      { term: 'Data lake', meaning: 'Depósito de dados brutos, em qualquer formato.' },
    ],
    checks: [
      { statement: 'Os três Vs originais são volume, velocidade e veracidade.', answer: false, why: 'São volume, velocidade e variedade.' },
      { statement: 'No HDFS, o NameNode guarda os blocos de dados.', answer: false, why: 'Ele guarda onde estão os blocos; os DataNodes guardam os blocos.' },
      { statement: 'O Spark mantém dados na memória entre as etapas.', answer: true, why: 'Por isso tende a ser mais rápido em tarefas repetitivas.' },
    ],
  },
};
