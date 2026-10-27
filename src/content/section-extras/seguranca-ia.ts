import type { SectionExtras } from '@/content/types';

// questões complementares por seção dos grimórios grim.seguranca (Segurança da informação, Fortaleza
// das Sete Chaves) e grim.ia (Inteligência artificial: capítulos 1 e 2 na Fundamentos de IA,
// capítulos 3 e 4 no Modelos e agentes de IA).
// Todo o conteúdo é autoral e usa apenas fatos apresentados no texto de cada seção.

export const extrasSegurancaIa: Record<string, SectionExtras> = {
  // ─── Segurança da informação (Segurança da informação) ────────────────────

  'cap.seg.01:fundamentos': {
    truths: [
      {
        statement: 'Pelo princípio de Kerckhoffs, um sistema criptográfico deve continuar seguro mesmo que o algoritmo seja público, desde que a chave permaneça secreta.',
        answer: true,
        why: 'O segredo deve estar somente na chave. Por isso AES, RSA e SHA-256 são públicos e amplamente analisados.',
      },
      {
        statement: 'A cifragem simétrica em modo CBC, sozinha, garante a integridade da mensagem.',
        answer: false,
        why: 'Na tabela-mestra, AES-CBC oferece só confidencialidade. Integridade e autenticidade entre as partes vêm da cifragem autenticada, como o AES-GCM.',
      },
      {
        statement: 'A criptologia reúne a criptografia e a criptoanálise.',
        answer: true,
        why: 'Criptografia protege a informação, criptoanálise estuda como quebrar cifras sem a chave, e criptologia é o conjunto das duas.',
      },
    ],
    blanks: [
      {
        sentence: 'O mecanismo criptográfico que garante o não repúdio é a ___.',
        options: ['assinatura digital', 'cifragem simétrica', 'função hash', 'HMAC'],
        answer: 'assinatura digital',
        why: 'Só o autor possui a chave privada, então só ele poderia ter assinado. No HMAC as duas partes conhecem a chave.',
      },
      {
        sentence: 'O estudo de como quebrar cifras sem conhecer a chave chama-se ___.',
        options: ['criptoanálise', 'criptologia', 'decifragem', 'cifragem'],
        answer: 'criptoanálise',
        why: 'Decifrar é usar a chave para recuperar o texto claro. Quebrar a cifra sem a chave é objeto da criptoanálise.',
      },
    ],
  },

  'cap.seg.01:simetrica': {
    truths: [
      {
        statement: 'No AES, o número de rodadas varia com o tamanho da chave: 10, 12 ou 14.',
        answer: true,
        why: 'O bloco do AES é sempre de 128 bits; o que muda é a chave (128, 192 ou 256 bits) e, com ela, o número de rodadas.',
      },
      {
        statement: 'O modo CTR exige processamento sequencial, bloco a bloco, assim como o CBC.',
        answer: false,
        why: 'O CTR cifra um contador e faz XOR com o texto, o que o torna paralelizável. Sequencial é o CBC.',
      },
      {
        statement: 'O ChaCha20 é uma cifra de fluxo moderna usada no TLS 1.3.',
        answer: true,
        why: 'A seção cita o ChaCha20 como cifra de fluxo moderna, com chave de 256 bits, usada no TLS 1.3.',
      },
    ],
    blanks: [
      {
        sentence: 'Para 10 pessoas trocarem mensagens em sigilo, dois a dois, com criptografia simétrica, são necessárias ___ chaves.',
        options: ['45', '10', '20', '90'],
        answer: '45',
        why: 'A fórmula é n(n − 1) / 2. Para 10 pessoas: 10 × 9 / 2 = 45.',
      },
      {
        sentence: 'O modo de operação que oferece cifragem autenticada (AEAD) é o ___.',
        options: ['GCM', 'ECB', 'CBC', 'CTR'],
        answer: 'GCM',
        why: 'O GCM combina o CTR com autenticação, garantindo confidencialidade e integridade. É o padrão no TLS.',
      },
    ],
  },

  'cap.seg.01:assimetrica': {
    truths: [
      {
        statement: 'O Diffie-Hellman puro autentica as partes e, por isso, impede o ataque do intermediário.',
        answer: false,
        why: 'O DH puro não autentica quem está do outro lado. A defesa é autenticar a troca, por exemplo assinando os parâmetros com chave vinculada a um certificado.',
      },
      {
        statement: 'Uma chave ECC de 256 bits oferece segurança comparável à de uma chave RSA de 3072 bits.',
        answer: true,
        why: 'As curvas elípticas atingem o mesmo nível de segurança com chaves bem menores.',
      },
      {
        statement: 'O DSA é um algoritmo usado apenas para assinatura.',
        answer: true,
        why: 'Na tabela de algoritmos, o DSA aparece com uso exclusivo de assinatura; o RSA serve para cifragem e assinatura.',
      },
    ],
    blanks: [
      {
        sentence: 'Com criptografia assimétrica, 100 participantes precisam de ___ chaves no total.',
        options: ['200', '100', '4.950', '9.900'],
        answer: '200',
        why: 'Cada participante tem um par, então são n pares, ou 2n chaves. Os 4.950 seriam necessários na simétrica.',
      },
      {
        sentence: 'A segurança do RSA se baseia na dificuldade de ___ o produto de dois primos grandes.',
        options: ['fatorar', 'multiplicar', 'somar', 'ordenar'],
        answer: 'fatorar',
        why: 'Multiplicar dois primos é fácil; recuperar os fatores a partir do produto é que é computacionalmente difícil.',
      },
    ],
  },

  'cap.seg.01:hash': {
    truths: [
      {
        statement: 'O SHA-1 produz resumos de 160 bits e é considerado quebrado para colisões.',
        answer: true,
        why: 'Uma colisão prática do SHA-1 foi demonstrada em 2017, e o algoritmo foi descontinuado.',
      },
      {
        statement: 'Pelo efeito avalanche, uma alteração mínima na entrada produz um resumo quase idêntico ao original.',
        answer: false,
        why: 'É o oposto: uma alteração mínima muda drasticamente o resumo, como no exemplo em que só o "c" mudou.',
      },
      {
        statement: 'O sal de cada senha deve ser guardado em segredo fora do banco de dados, longe do hash.',
        answer: false,
        why: 'O sal é armazenado junto ao hash. O segredo guardado fora do banco é a pimenta (pepper), que é opcional.',
      },
    ],
    blanks: [
      {
        sentence: 'Entre as funções próprias para senhas, a OWASP indica como preferencial o ___.',
        options: ['Argon2id', 'SHA-256', 'MD5', 'SHA-3'],
        answer: 'Argon2id',
        why: 'A OWASP recomenda funções lentas e adaptativas: Argon2id (preferencial), scrypt, bcrypt ou PBKDF2. Hashes de propósito geral são rápidos demais.',
      },
      {
        sentence: 'A exigência de ser inviável encontrar quaisquer duas entradas diferentes com o mesmo resumo é a resistência a ___.',
        options: ['colisões', 'pré-imagem', 'segunda pré-imagem', 'repetição'],
        answer: 'colisões',
        why: 'Na segunda pré-imagem, uma entrada é dada; na resistência a colisões, o atacante pode escolher livremente as duas.',
      },
    ],
  },

  'cap.seg.01:assinatura': {
    truths: [
      {
        statement: 'Na verificação de uma assinatura digital, o destinatário calcula o hash do documento recebido e o compara com o hash obtido da assinatura.',
        answer: true,
        why: 'Se os dois hashes coincidem, a assinatura é válida. A chave pública do remetente é usada para verificar a assinatura.',
      },
      {
        statement: 'O certificado da AC Raiz é autoassinado.',
        answer: true,
        why: 'A AC Raiz fica no topo da hierarquia; seu certificado é autoassinado e confiado previamente, já instalado em sistemas e navegadores.',
      },
      {
        statement: 'Na ICP, a Autoridade de Registro é quem assina os certificados emitidos aos usuários.',
        answer: false,
        why: 'A AR identifica o solicitante e encaminha o pedido. Quem emite e assina o certificado é a Autoridade Certificadora.',
      },
    ],
    blanks: [
      {
        sentence: 'A AC Raiz da ICP-Brasil é o ___.',
        options: ['ITI', 'Serpro', 'Banco Central', 'Receita Federal'],
        answer: 'ITI',
        why: 'O Instituto Nacional de Tecnologia da Informação é a AC Raiz da ICP-Brasil, instituída pela MP nº 2.200-2/2001.',
      },
      {
        sentence: 'Para consultar online o estado de revogação de um certificado específico, usa-se o protocolo ___.',
        options: ['OCSP', 'X.509', 'TLS', 'HMAC'],
        answer: 'OCSP',
        why: 'O OCSP responde o estado de um certificado. A alternativa é a LCR, lista publicada pela AC. X.509 é o formato do certificado.',
      },
    ],
  },

  'cap.seg.01:hibrida': {
    truths: [
      {
        statement: 'No handshake do TLS 1.3, o servidor assina o handshake com sua chave privada, provando que possui a chave correspondente ao certificado.',
        answer: true,
        why: 'É o passo 2 do handshake simplificado. Em seguida o cliente valida o certificado e os dois derivam as chaves de sessão.',
      },
      {
        statement: 'O TLS 1.3 manteve a troca de chaves por RSA estático como uma das opções do handshake.',
        answer: false,
        why: 'O TLS 1.3 removeu o RSA estático, que não oferecia sigilo futuro. O acordo de chaves é sempre efêmero (DHE/ECDHE).',
      },
      {
        statement: 'O HTTPS protege os dados armazenados no servidor contra vazamento.',
        answer: false,
        why: 'O HTTPS protege os dados em trânsito. Dados armazenados no servidor ou no computador do usuário ficam fora da sua proteção.',
      },
    ],
    blanks: [
      {
        sentence: 'A porta padrão do HTTPS é a ___.',
        options: ['443', '80', '22', '8080'],
        answer: '443',
        why: 'O HTTPS é o HTTP sobre TLS, com porta padrão 443.',
      },
      {
        sentence: 'Na criptografia híbrida, os dados são cifrados com uma chave de sessão ___.',
        options: ['simétrica', 'pública', 'privada', 'revogada'],
        answer: 'simétrica',
        why: 'A simétrica é rápida e cifra os dados; a assimétrica protege ou combina essa chave de sessão.',
      },
    ],
  },

  'cap.seg.02:principios': {
    truths: [
      {
        statement: 'Contratar um seguro cibernético é um exemplo de transferência do risco.',
        answer: true,
        why: 'Transferir é passar parte das consequências a terceiros, como em um seguro ou em cláusula contratual de responsabilidade.',
      },
      {
        statement: 'Pela Lei de Acesso à Informação, uma informação classificada como secreta pode ficar restrita por até 25 anos.',
        answer: false,
        why: 'O grau secreto tem prazo máximo de 15 anos. Os 25 anos são do grau ultrassecreto; o reservado tem 5.',
      },
      {
        statement: 'Uma vulnerabilidade é uma fraqueza que pode ser explorada, como software desatualizado ou senha fraca.',
        answer: true,
        why: 'A ameaça é a causa potencial do incidente; a vulnerabilidade é a fraqueza por onde ela age.',
      },
    ],
    blanks: [
      {
        sentence: 'Desativar um serviço desnecessário exposto à internet é um exemplo de ___ o risco.',
        options: ['evitar', 'aceitar', 'transferir', 'mitigar'],
        answer: 'evitar',
        why: 'Evitar é eliminar a atividade que gera o risco. Mitigar seria manter o serviço e aplicar controles.',
      },
      {
        sentence: 'Falhas conhecidas publicamente recebem um identificador chamado ___.',
        options: ['CVE', 'CVSS', 'CSIRT', 'SIEM'],
        answer: 'CVE',
        why: 'O CVE identifica a falha; o CVSS é a pontuação usada para priorizar; CSIRT é a equipe de resposta a incidentes.',
      },
    ],
  },

  'cap.seg.02:acesso': {
    truths: [
      {
        statement: 'No controle de acesso obrigatório (MAC), o usuário pode alterar os rótulos de classificação dos próprios arquivos.',
        answer: false,
        why: 'No MAC quem decide é o sistema, por rótulos e credenciamento, e o usuário não os altera. Quem decide pelo próprio recurso é o dono, no DAC.',
      },
      {
        statement: 'No ABAC, a decisão de acesso combina atributos do usuário, do recurso e do contexto.',
        answer: true,
        why: 'Exemplo da seção: permitir se setor = auditoria, documento = não sigiloso e horário comercial.',
      },
      {
        statement: 'No NIST SP 800-207, o administrador de política (PA) executa a decisão, abrindo ou fechando a sessão.',
        answer: true,
        why: 'O motor de política (PE) decide, o administrador (PA) executa a decisão e o ponto de aplicação (PEP) a aplica no caminho até o recurso.',
      },
    ],
    blanks: [
      {
        sentence: 'Dividir tarefas críticas para que quem cadastra um pagamento não seja quem o aprova é a ___.',
        options: ['segregação de funções', 'negação por padrão', 'necessidade de conhecer', 'recertificação'],
        answer: 'segregação de funções',
        why: 'A segregação de funções impede que uma pessoa sozinha complete uma fraude.',
      },
      {
        sentence: 'No ciclo de vida da identidade, a revogação de todos os acessos no desligamento é o ___.',
        options: ['desprovisionamento', 'provisionamento', 'recertificação', 'autenticação'],
        answer: 'desprovisionamento',
        why: 'O provisionamento cria a conta na admissão; o desprovisionamento revoga tudo no desligamento, imediatamente.',
      },
    ],
  },

  'cap.seg.02:owasp': {
    truths: [
      {
        statement: 'Na edição 2025 do OWASP Top 10, o SSRF passou a integrar a categoria de controle de acesso quebrado (A01).',
        answer: true,
        why: 'Essa é uma das mudanças em relação a 2021, ao lado das duas categorias novas, A03 e A10.',
      },
      {
        statement: 'SCA é a análise de componentes e dependências de terceiros com vulnerabilidades conhecidas.',
        answer: true,
        why: 'Na tabela de DevSecOps, a SCA roda a cada build; o SAST olha o código-fonte e o DAST a aplicação em execução.',
      },
      {
        statement: 'No OWASP Top 10:2025, as falhas de autenticação ocupam a posição A02.',
        answer: false,
        why: 'As falhas de autenticação estão em A07. A posição A02 é da configuração incorreta.',
      },
    ],
    blanks: [
      {
        sentence: 'A defesa principal contra injeção de SQL é a ___.',
        options: ['consulta parametrizada', 'codificação da saída', 'criptografia do banco', 'limitação de taxa'],
        answer: 'consulta parametrizada',
        why: 'Na consulta parametrizada, o valor nunca é interpretado como SQL. Codificar a saída é a defesa contra XSS.',
      },
      {
        sentence: 'O inventário dos componentes de software de uma aplicação é chamado de ___.',
        options: ['SBOM', 'SAST', 'CVE', 'DAST'],
        answer: 'SBOM',
        why: 'O SBOM é uma das defesas contra falhas na cadeia de suprimentos (A03), junto da fixação de versões e da verificação de assinaturas.',
      },
    ],
  },

  'cap.seg.02:ameacas': {
    truths: [
      {
        statement: 'Whaling é o spear phishing dirigido a altos dirigentes.',
        answer: true,
        why: 'O spear phishing é direcionado a uma pessoa ou grupo; quando o alvo são altos dirigentes, chama-se whaling.',
      },
      {
        statement: 'A detecção por assinatura é a mais indicada para descobrir ataques nunca vistos antes.',
        answer: false,
        why: 'A detecção por assinatura é precisa para o conhecido e cega para o novo. Ataques novos são alcançados pela detecção por anomalia.',
      },
      {
        statement: 'Um falso negativo é um ataque que passou sem gerar alerta.',
        answer: true,
        why: 'É o caso mais perigoso. O falso positivo, ao contrário, é um alerta disparado para algo legítimo.',
      },
    ],
    blanks: [
      {
        sentence: 'Um teste de invasão em que o testador recebe uma conta de usuário comum é de caixa ___.',
        options: ['cinza', 'preta', 'branca', 'aberta'],
        answer: 'cinza',
        why: 'Caixa cinza é conhecimento parcial. Na preta não há conhecimento prévio; na branca há acesso a código, arquitetura e credenciais.',
      },
      {
        sentence: 'O malware que esconde a presença do invasor e de outros malwares no sistema é o ___.',
        options: ['rootkit', 'worm', 'spyware', 'ransomware'],
        answer: 'rootkit',
        why: 'O rootkit oculta a intrusão. O spyware coleta informações; o ransomware cifra os dados e exige resgate.',
      },
    ],
  },

  'cap.seg.02:continuidade': {
    truths: [
      {
        statement: 'O backup diferencial cresce a cada dia até o próximo backup completo.',
        answer: true,
        why: 'Ele copia tudo o que mudou desde o último completo, então acumula as mudanças; em troca, restaura com só dois conjuntos.',
      },
      {
        statement: 'O RPO indica o tempo máximo para o serviço voltar a funcionar.',
        answer: false,
        why: 'Esse é o RTO. O RPO é a perda máxima de dados tolerável, medida em tempo, e orienta a frequência de backup.',
      },
      {
        statement: 'O sítio frio é o mais barato e leva dias ou semanas para assumir a operação.',
        answer: true,
        why: 'O sítio frio tem só espaço e energia. O quente, com dados replicados, assume em minutos ou horas e é o mais caro.',
      },
    ],
    blanks: [
      {
        sentence: 'Pela regra 3-2-1, das três cópias dos dados, ___ deve ficar fora do local.',
        options: ['uma', 'duas', 'três', 'nenhuma'],
        answer: 'uma',
        why: 'São 3 cópias, em 2 tipos de mídia, com 1 fora do local (offsite).',
      },
      {
        sentence: 'A norma de referência para gestão de continuidade de negócios é a ___.',
        options: ['ISO 22301', 'ISO/IEC 27002', 'ISO/IEC 27005', 'ISO/IEC 27701'],
        answer: 'ISO 22301',
        why: 'A ISO 22301 trata de continuidade. A 27002 traz controles de segurança, a 27005 riscos e a 27701 privacidade.',
      },
    ],
  },

  'cap.seg.02:iso': {
    truths: [
      {
        statement: 'No Anexo A da ISO/IEC 27001:2022, o tema com mais controles é o organizacional, com 37.',
        answer: true,
        why: 'Os 93 controles se dividem em organizacionais (37), pessoas (8), físicos (14) e tecnológicos (34).',
      },
      {
        statement: 'A ISO/IEC 27701 trata da gestão de riscos de segurança da informação.',
        answer: false,
        why: 'A 27701 é a extensão para gestão da privacidade. As orientações de gestão de riscos estão na 27005.',
      },
      {
        statement: 'A Declaração de Aplicabilidade registra quais controles do Anexo A a organização adota e justifica os excluídos.',
        answer: true,
        why: 'É o documento que liga o SGSI aos controles do Anexo A escolhidos pela organização.',
      },
    ],
    blanks: [
      {
        sentence: 'A norma que traz a visão geral e o vocabulário da família é a ISO/IEC ___.',
        options: ['27000', '27001', '27002', '27005'],
        answer: '27000',
        why: 'A 27000 é a porta de entrada da família: visão geral e vocabulário.',
      },
      {
        sentence: 'Os controles de mesa limpa e tela limpa pertencem ao tema ___ do Anexo A.',
        options: ['Físicos', 'Pessoas', 'Tecnológicos', 'Organizacionais'],
        answer: 'Físicos',
        why: 'O tema Físicos, com 14 controles, inclui perímetros, controle de entrada e mesa limpa e tela limpa.',
      },
    ],
  },

  // ─── Inteligência artificial, capítulos 1 e 2 (Fundamentos de IA) ────────────

  'cap.ia.01:llm': {
    truths: [
      {
        statement: 'O conhecimento que um LLM aprende no treinamento tem uma data de corte.',
        answer: true,
        why: 'Fatos posteriores só chegam ao modelo se forem colocados no contexto, por exemplo via RAG ou ferramentas de busca.',
      },
      {
        statement: 'Logo após o pré-treinamento, o modelo já segue instruções bem, dispensando ajuste fino e alinhamento.',
        answer: false,
        why: 'O pré-treinamento dá amplo conhecimento, mas o modelo ainda não segue instruções bem. Para isso existem o ajuste fino e o alinhamento.',
      },
      {
        statement: 'Temperaturas baixas deixam a saída do modelo mais previsível.',
        answer: true,
        why: 'A temperatura controla a aleatoriedade da geração: valores baixos, saída previsível; valores altos, mais variada.',
      },
    ],
    blanks: [
      {
        sentence: 'Conteúdo fluente e convincente, porém falso ou sem fundamento, é chamado de ___.',
        options: ['alucinação', 'injeção de prompt', 'temperatura', 'sobreajuste'],
        answer: 'alucinação',
        why: 'A alucinação acontece porque o modelo produz o texto mais provável, e o mais provável nem sempre é o verdadeiro.',
      },
      {
        sentence: 'O mecanismo que permite ao modelo ponderar a relevância de cada token do contexto ao gerar o próximo é a ___.',
        options: ['atenção', 'temperatura', 'tokenização', 'janela de contexto'],
        answer: 'atenção',
        why: 'A atenção (self-attention) é a ideia central da arquitetura Transformer.',
      },
    ],
  },

  'cap.ia.01:prompts': {
    truths: [
      {
        statement: 'O prompt de sistema costuma ser fixado pela aplicação e define papel, regras e tom para toda a conversa.',
        answer: true,
        why: 'O prompt do usuário, por sua vez, traz o pedido específico de cada interação.',
      },
      {
        statement: 'A injeção de prompt aparece como décimo item (LLM10) do OWASP Top 10 for LLM Applications.',
        answer: false,
        why: 'A injeção de prompt é o primeiro item da lista, o LLM01.',
      },
      {
        statement: 'A injeção de prompt indireta ocorre quando a instrução maliciosa está escondida em um conteúdo que o modelo lê, como uma página web ou um e-mail.',
        answer: true,
        why: 'Na injeção direta, é o próprio usuário quem escreve a instrução maliciosa.',
      },
    ],
    blanks: [
      {
        sentence: 'Pedir que o modelo raciocine passo a passo antes de concluir é a técnica de ___.',
        options: ['cadeia de pensamento', 'zero-shot', 'atribuição de papel', 'saída estruturada'],
        answer: 'cadeia de pensamento',
        why: 'A cadeia de pensamento (chain-of-thought) é indicada para problemas de várias etapas, como cálculo, lógica e depuração.',
      },
      {
        sentence: 'Aprender uma tarefa só com exemplos no próprio prompt, sem alterar os pesos, chama-se aprendizado ___.',
        options: ['em contexto', 'por reforço', 'supervisionado', 'por transferência'],
        answer: 'em contexto',
        why: 'É o in-context learning, popularizado pelo artigo do GPT-3, Language Models are Few-Shot Learners (2020).',
      },
    ],
  },

  'cap.ia.01:contexto': {
    truths: [
      {
        statement: 'Compactar o contexto significa resumir o histórico antigo, preservando decisões e pendências.',
        answer: true,
        why: 'A compactação libera espaço na janela sem perder o que importa para continuar o trabalho.',
      },
      {
        statement: 'O modelo guarda por conta própria, entre uma chamada e outra, tudo o que foi dito em sessões anteriores.',
        answer: false,
        why: 'O modelo não guarda nada entre chamadas. A memória é uma construção da aplicação, com arquivos, bancos ou bancos vetoriais.',
      },
      {
        statement: 'Estudos como Lost in the Middle indicam que os modelos aproveitam melhor o que está no início e no fim de contextos longos.',
        answer: true,
        why: 'O que fica no meio de contextos longos tende a ser menos aproveitado.',
      },
    ],
    blanks: [
      {
        sentence: 'Delegar uma subtarefa a outro agente com contexto próprio e receber só o resultado é a técnica de ___.',
        options: ['isolamento', 'compactação', 'seleção', 'estrutura'],
        answer: 'isolamento',
        why: 'O isolamento evita que a subtarefa lote o contexto principal.',
      },
      {
        sentence: 'Informações gravadas fora do modelo e trazidas de volta ao contexto quando necessário formam a memória de ___.',
        options: ['longo prazo', 'curto prazo', 'treino', 'atenção'],
        answer: 'longo prazo',
        why: 'A memória de curto prazo é o próprio conteúdo da janela durante a sessão.',
      },
    ],
  },

  'cap.ia.01:rag': {
    truths: [
      {
        statement: 'No RAG, a pergunta do usuário também é convertida em embedding antes da busca por similaridade.',
        answer: true,
        why: 'É o passo 5 do fluxo: a pergunta vira vetor, e o banco devolve os k trechos mais próximos.',
      },
      {
        statement: 'A busca híbrida combina busca por palavras-chave, como BM25, com busca vetorial.',
        answer: true,
        why: 'Ela ajuda com termos exatos, como siglas e números de lei, que a busca semântica não captura bem.',
      },
      {
        statement: 'Para ensinar um estilo ou comportamento ao modelo, o RAG é mais adequado que o ajuste fino.',
        answer: false,
        why: 'Estilo, formato ou comportamento pedem ajuste fino. O RAG é a escolha para conhecimento atualizado e com fonte.',
      },
    ],
    blanks: [
      {
        sentence: 'Quebrar textos longos em pedaços menores antes de gerar os embeddings chama-se ___.',
        options: ['chunking', 're-ranking', 'tokenização', 'top-k'],
        answer: 'chunking',
        why: 'O chunking é a divisão em trechos, às vezes com sobreposição, feita na fase de indexação.',
      },
      {
        sentence: 'Quando um segundo modelo reordena os candidatos antes de enviá-los ao LLM, faz-se o ___.',
        options: ['re-ranking', 'chunking', 'ajuste fino', 'alinhamento'],
        answer: 're-ranking',
        why: 'A reordenação é uma das melhorias usuais da recuperação, ao lado da busca híbrida e dos filtros por metadados.',
      },
    ],
  },

  'cap.ia.01:vetores': {
    truths: [
      {
        statement: 'A similaridade de cosseno ignora o tamanho dos vetores.',
        answer: true,
        why: 'Ela mede o ângulo entre os vetores. Para vetores normalizados, equivale ao produto escalar.',
      },
      {
        statement: 'Na distância euclidiana, quanto maior o valor, mais parecidos são os vetores.',
        answer: false,
        why: 'É distância: quanto menor, mais parecidos. No produto escalar é que o valor maior indica mais semelhança.',
      },
      {
        statement: 'Vetores gerados por modelos de embedding diferentes podem ser comparados entre si sem problema.',
        answer: false,
        why: 'Vetores de modelos diferentes não são comparáveis. Indexação e consulta devem usar o mesmo modelo, e trocar de modelo exige recalcular os vetores.',
      },
    ],
    blanks: [
      {
        sentence: 'No pgvector, o operador ___ calcula a distância de cosseno.',
        options: ['<=>', '<->', '<#>', 'LIKE'],
        answer: '<=>',
        why: 'No pgvector, <-> é a distância euclidiana, <=> a distância de cosseno e <#> o produto interno negativo.',
      },
      {
        sentence: 'Um dos índices de busca vetorial aproximada mais usados, baseado em grafos, é o ___.',
        options: ['HNSW', 'BM25', 'B-tree', 'TF-IDF'],
        answer: 'HNSW',
        why: 'O HNSW (Hierarchical Navigable Small World) é um índice ANN, que troca um pouco de precisão por muita velocidade.',
      },
    ],
  },

  'cap.ia.01:resumo': {
    truths: [
      {
        statement: 'Buscar trechos relevantes e inseri-los no prompt antes de gerar a resposta caracteriza o RAG.',
        answer: true,
        why: 'É a associação direta do quadro-resumo: recuperação antes da geração.',
      },
      {
        statement: 'Uma questão que fala em "limite de tokens que o modelo considera" trata de embeddings.',
        answer: false,
        why: 'Esse limite é a janela de contexto. Embedding é o vetor que representa o sentido de um texto.',
      },
      {
        statement: 'O pgvector é a extensão do PostgreSQL para busca vetorial.',
        answer: true,
        why: 'Ele adiciona o tipo vector e índices de busca, permitindo manter vetores e dados relacionais no mesmo banco.',
      },
    ],
    blanks: [
      {
        sentence: 'Pelo quadro-resumo, um texto externo que manipula o modelo aponta para injeção de prompt ___.',
        options: ['indireta', 'direta', 'estruturada', 'few-shot'],
        answer: 'indireta',
        why: 'Na injeção indireta, a instrução maliciosa vem de um conteúdo lido pelo modelo, e não do próprio usuário.',
      },
      {
        sentence: 'Exemplos colocados no próprio prompt, sem mudar os pesos, apontam para a técnica ___.',
        options: ['few-shot', 'ajuste fino', 'RLHF', 'chunking'],
        answer: 'few-shot',
        why: 'É o aprendizado em contexto. Ajuste fino e RLHF, ao contrário, alteram o modelo por treinamento.',
      },
    ],
  },

  'cap.ia.02:agentes': {
    truths: [
      {
        statement: 'As ferramentas disponíveis costumam ser descritas ao modelo com nome, descrição e parâmetros, geralmente em JSON Schema.',
        answer: true,
        why: 'É o primeiro passo do tool use: a aplicação informa ao modelo quais ferramentas existem.',
      },
      {
        statement: 'Na programação baseada em intenção, o desenvolvedor descreve o que quer e o agente decide como implementar.',
        answer: true,
        why: 'O papel humano se desloca para especificar bem, revisar e validar.',
      },
      {
        statement: 'O vibe coding, em que se aceita o código gerado quase sem lê-lo, é a prática indicada para sistemas de produção no setor público.',
        answer: false,
        why: 'A seção diz o contrário: para sistemas de produção, especialmente no setor público, é justamente o que se deve evitar.',
      },
    ],
    blanks: [
      {
        sentence: 'Depois que a aplicação executa a ferramenta pedida, o resultado volta ao modelo como parte do ___.',
        options: ['contexto', 'conjunto de treino', 'prompt de sistema', 'banco vetorial'],
        answer: 'contexto',
        why: 'O resultado entra no contexto, e o modelo decide se usa outra ferramenta ou se responde.',
      },
      {
        sentence: 'No Claude Code, as regras do projeto ficam no arquivo ___.',
        options: ['CLAUDE.md', 'SKILL.md', 'README.md', 'package.json'],
        answer: 'CLAUDE.md',
        why: 'O CLAUDE.md ilustra memória e gestão de contexto. O SKILL.md é o arquivo de uma skill.',
      },
    ],
  },

  'cap.ia.02:ciclo': {
    truths: [
      {
        statement: 'Em tarefas grandes, o modo de planejamento permite que o agente apresente o plano e só execute depois da aprovação humana.',
        answer: true,
        why: 'Muitas ferramentas oferecem esse modo na fase de planejamento e tomada de decisão.',
      },
      {
        statement: 'Mesmo sem teste para um comportamento, a verificação autônoma garante que o agente não o quebrou.',
        answer: false,
        why: 'A verificação só é tão boa quanto os testes disponíveis. Sem teste, o agente não tem como saber que quebrou o comportamento.',
      },
      {
        statement: 'A descoberta e coleta de contexto é a primeira das quatro fases do ciclo agentivo descrito no edital.',
        answer: true,
        why: 'O agente investiga antes de alterar; depois vêm planejamento, execução e verificação com autocorreção.',
      },
    ],
    blanks: [
      {
        sentence: 'O laço de corrigir os próprios erros a partir do retorno das ferramentas é o que o edital chama de mecanismos de ___.',
        options: ['autocorreção', 'alucinação', 'planejamento', 'descoberta'],
        answer: 'autocorreção',
        why: 'São os mecanismos de autocorreção (self-healing), da quarta fase do ciclo.',
      },
      {
        sentence: 'Manter um humano no laço de decisão é descrito pela expressão ___.',
        options: ['human-in-the-loop', 'vibe coding', 'self-healing', 'sandbox'],
        answer: 'human-in-the-loop',
        why: 'Revisar o diff e decidir sobre ações irreversíveis continuam sendo tarefas humanas.',
      },
    ],
  },

  'cap.ia.02:mcp': {
    truths: [
      {
        statement: 'O MCP é um protocolo aberto lançado pela Anthropic em novembro de 2024.',
        answer: true,
        why: 'Ele padroniza como aplicações de IA se conectam a fontes de dados e ferramentas externas.',
      },
      {
        statement: 'No MCP, os prompts são modelos reutilizáveis, com parâmetros, que o usuário escolhe usar.',
        answer: true,
        why: 'Das três primitivas do servidor, tools são decididas pelo modelo, resources pela aplicação e prompts pelo usuário.',
      },
      {
        statement: 'O transporte stdio é o indicado para servidores remotos acessados por HTTP.',
        answer: false,
        why: 'O stdio serve para servidores que rodam como processo local. Para servidores remotos, usa-se o Streamable HTTP.',
      },
    ],
    blanks: [
      {
        sentence: 'As mensagens do MCP seguem o formato ___.',
        options: ['JSON-RPC 2.0', 'GraphQL', 'SOAP', 'XML-RPC'],
        answer: 'JSON-RPC 2.0',
        why: 'A conexão começa com a inicialização, em que cliente e servidor negociam versão e capacidades, sempre em JSON-RPC 2.0.',
      },
      {
        sentence: 'Antes de chamar ferramentas, o cliente costuma descobrir as disponíveis com o método ___.',
        options: ['tools/list', 'tools/call', 'tools/find', 'tools/help'],
        answer: 'tools/list',
        why: 'O tools/list descobre as ferramentas; o tools/call, como no exemplo da seção, pede a execução de uma delas.',
      },
    ],
  },

  'cap.ia.02:skills': {
    truths: [
      {
        statement: 'Nas ferramentas da Anthropic, uma skill é uma pasta com um arquivo SKILL.md, cujo cabeçalho traz nome e descrição.',
        answer: true,
        why: 'O corpo do SKILL.md tem as instruções, e a pasta pode conter scripts e arquivos de apoio.',
      },
      {
        statement: 'Comandos personalizados são atalhos acionados pelo usuário que disparam um fluxo pronto.',
        answer: true,
        why: 'São indicados para tarefas frequentes acionadas pelo usuário.',
      },
      {
        statement: 'Um hook é uma instrução em texto que o modelo pode decidir não seguir.',
        answer: false,
        why: 'O hook é uma ação executada automaticamente pela aplicação em um evento. Por isso garante o comportamento, sem depender do modelo.',
      },
    ],
    blanks: [
      {
        sentence: 'Ver de início só o nome e a descrição de cada skill e carregar o resto sob demanda chama-se divulgação ___.',
        options: ['progressiva', 'seletiva', 'total', 'antecipada'],
        answer: 'progressiva',
        why: 'A divulgação progressiva permite ter muitas skills instaladas sem lotar a janela de contexto.',
      },
      {
        sentence: 'Para dar ao agente acesso a sistemas externos, usam-se ferramentas e servidores ___.',
        options: ['MCP', 'RAG', 'SQL', 'DNS'],
        answer: 'MCP',
        why: 'Na tabela de mecanismos de extensão, ferramentas e servidores MCP acrescentam novas ações ao agente.',
      },
    ],
  },

  'cap.ia.02:qualidade': {
    truths: [
      {
        statement: 'Código gerado por IA passa pelos mesmos controles de segurança aplicados ao código escrito por pessoas.',
        answer: true,
        why: 'Ele pode conter falhas clássicas, como injeção de SQL e validação ausente de entradas.',
      },
      {
        statement: 'A responsabilidade pelo código gerado é da ferramenta de IA que o escreveu.',
        answer: false,
        why: 'A responsabilidade continua de quem aprova e publica o código, não da ferramenta.',
      },
      {
        statement: 'Fazer um teste falhar de propósito ajuda a revelar um teste que não testa nada.',
        answer: true,
        why: 'Um teste que sempre passa, ou que foi ajustado para aceitar o erro, é um tipo de alucinação em código.',
      },
    ],
    blanks: [
      {
        sentence: 'O registro malicioso de pacotes com nomes que os modelos costumam inventar ganhou o apelido de ___.',
        options: ['slopsquatting', 'vibe coding', 'spear phishing', 'self-healing'],
        answer: 'slopsquatting',
        why: 'A defesa é conferir o pacote no repositório oficial antes de instalar.',
      },
      {
        sentence: 'No TCE-GO, o uso de ferramentas de IA é disciplinado pela Resolução Administrativa nº ___.',
        options: ['24/2024', '17/2024', '4.617/2021', '2.200/2001'],
        answer: '24/2024',
        why: 'A RA nº 24/2024 consta do edital em Legislação Institucional. A RA nº 17/2024 é a Política de Segurança da Informação.',
      },
    ],
  },

  // ─── Inteligência artificial, capítulos 3 e 4 (Modelos e agentes de IA) ────────────

  'cap.ia.03:aprendizado': {
    truths: [
      {
        statement: 'O DBSCAN agrupa os dados por densidade e marca pontos isolados como ruído.',
        answer: true,
        why: 'É uma das técnicas de agrupamento não supervisionado citadas, ao lado do k-means e do agrupamento hierárquico.',
      },
      {
        statement: 'Aumentar a complexidade do modelo tende a reduzir a variância e aumentar o viés.',
        answer: false,
        why: 'É o contrário: mais complexidade tende a reduzir o viés e aumentar a variância, abrindo caminho para o overfitting.',
      },
      {
        statement: 'Na literatura didática, os grandes modelos de linguagem atuais são classificados como IA estreita.',
        answer: true,
        why: 'Todos os sistemas em uso hoje são IA fraca (estreita). A IA forte, com capacidade cognitiva ampla, é hipotética.',
      },
    ],
    blanks: [
      {
        sentence: 'Estimar o preço de referência de uma obra por metro quadrado é uma tarefa de ___.',
        options: ['regressão', 'classificação', 'agrupamento', 'associação'],
        answer: 'regressão',
        why: 'A saída é um valor numérico contínuo, o que caracteriza a regressão no aprendizado supervisionado.',
      },
      {
        sentence: 'No aprendizado por reforço, equilibrar testar ações novas e repetir as que deram certo é o dilema exploração × ___.',
        options: ['aproveitamento', 'generalização', 'regularização', 'recompensa'],
        answer: 'aproveitamento',
        why: 'É o dilema exploration × exploitation, central no aprendizado por reforço.',
      },
    ],
  },

  'cap.ia.03:redes': {
    truths: [
      {
        statement: 'A softmax produz valores entre 0 e 1 que somam 1 e é usada na saída de classificação com várias classes.',
        answer: true,
        why: 'Por isso a saída da softmax pode ser lida como uma distribuição entre as classes.',
      },
      {
        statement: 'No gradiente descendente estocástico (SGD), os pesos são atualizados uma única vez por época.',
        answer: false,
        why: 'No SGD, os pesos são atualizados a cada exemplo; no mini-batch, a cada pequeno lote.',
      },
      {
        statement: 'O dropout desliga neurônios aleatoriamente durante o treino para combater o overfitting.',
        answer: true,
        why: 'Ao lado da regularização L1/L2 e da parada antecipada, é uma das defesas contra o sobreajuste.',
      },
    ],
    blanks: [
      {
        sentence: 'Uma passagem completa pelos dados de treino é chamada de ___.',
        options: ['época', 'lote', 'camada', 'perda'],
        answer: 'época',
        why: 'O lote (mini-batch) é só uma pequena parte dos dados; a época percorre todos eles.',
      },
      {
        sentence: 'As variantes ___ e GRU das redes recorrentes lidam melhor com dependências longas.',
        options: ['LSTM', 'CNN', 'MLP', 'ReLU'],
        answer: 'LSTM',
        why: 'As RNNs mantêm um estado oculto; LSTM e GRU reduzem o problema do gradiente que desaparece em sequências longas.',
      },
    ],
  },

  'cap.ia.03:pln': {
    truths: [
      {
        statement: 'Os n-gramas, como o bigrama "nota fiscal", recuperam parte do contexto local que o bag-of-words perde.',
        answer: true,
        why: 'O bag-of-words ignora a ordem; sequências de n tokens preservam um pouco dela.',
      },
      {
        statement: 'Os embeddings contextuais atribuem sempre o mesmo vetor a uma palavra, qualquer que seja a frase.',
        answer: false,
        why: 'Produzidos por transformers, eles dão vetores diferentes conforme a frase, como "banco" de dados e "banco" da praça.',
      },
      {
        statement: 'O RSLP é um exemplo de stemmer para o português.',
        answer: true,
        why: 'A seção o cita como stemmer para o português.',
      },
    ],
    blanks: [
      {
        sentence: 'Identificar substantivos, verbos e outras classes gramaticais é a tarefa de etiquetagem ___.',
        options: ['morfossintática', 'de sentimento', 'de entidades', 'de tópicos'],
        answer: 'morfossintática',
        why: 'É o POS tagging, uma das tarefas de base do PLN, ao lado da análise sintática.',
      },
      {
        sentence: 'A sumarização que reescreve o conteúdo com frases novas é chamada de ___.',
        options: ['abstrativa', 'extrativa', 'lematizada', 'tokenizada'],
        answer: 'abstrativa',
        why: 'A sumarização extrativa copia frases do texto; a abstrativa reescreve.',
      },
    ],
  },

  'cap.ia.04:etica': {
    truths: [
      {
        statement: 'No modelo human-on-the-loop, a pessoa monitora o sistema e pode intervir, sem aprovar cada decisão.',
        answer: true,
        why: 'No human-in-the-loop a pessoa aprova cada decisão; no human-out-of-the-loop não há intervenção.',
      },
      {
        statement: 'Usar o número de denúncias como medida de corrupção é um exemplo de viés de medição.',
        answer: true,
        why: 'Há viés de medição quando a variável usada é um substituto ruim do que se quer medir.',
      },
      {
        statement: 'Uma explicação global diz por que uma decisão específica saiu daquele jeito.',
        answer: false,
        why: 'Isso é a explicação local. A global mostra como o modelo se comporta em geral, como a importância das variáveis.',
      },
    ],
    blanks: [
      {
        sentence: 'Um modelo treinado com fiscalizações antigas que concentra alertas nos municípios sempre mais fiscalizados mostra viés ___.',
        options: ['histórico', 'de automação', 'de medição', 'de amostragem'],
        answer: 'histórico',
        why: 'O viés histórico surge quando os dados refletem desigualdades do passado.',
      },
      {
        sentence: 'Regressão linear e árvores de decisão pequenas são exemplos de modelos ___ por natureza.',
        options: ['interpretáveis', 'caixa-preta', 'generativos', 'multimodais'],
        answer: 'interpretáveis',
        why: 'Neles a lógica é visível. Para modelos caixa-preta, usam-se explicações post hoc, como LIME e SHAP.',
      },
    ],
  },

  'cap.ia.04:lgpd-ebia': {
    truths: [
      {
        statement: 'Dados anonimizados não são considerados dados pessoais, salvo quando a anonimização puder ser revertida com esforços razoáveis.',
        answer: true,
        why: 'É a regra do art. 12 da LGPD. Dados apenas pseudonimizados continuam sendo pessoais.',
      },
      {
        statement: 'Dados de saúde e dados biométricos são dados sensíveis, com hipóteses de tratamento mais restritas, previstas no art. 11.',
        answer: true,
        why: 'Para dados sensíveis, as bases legais são mais restritas que as dez hipóteses gerais do art. 7º.',
      },
      {
        statement: 'Pelo art. 20, §1º, o controlador deve revelar os critérios da decisão automatizada sem nenhuma ressalva quanto a segredos comercial e industrial.',
        answer: false,
        why: 'O §1º manda fornecer informações claras sobre critérios e procedimentos, observados os segredos comercial e industrial.',
      },
    ],
    blanks: [
      {
        sentence: 'Se as informações sobre a decisão automatizada não forem oferecidas com base em segredo comercial e industrial, a ___ poderá realizar auditoria para verificar aspectos discriminatórios.',
        options: ['ANPD', 'ICP-Brasil', 'OCDE', 'UNESCO'],
        answer: 'ANPD',
        why: 'É a previsão do art. 20, §2º, da LGPD.',
      },
      {
        sentence: 'O princípio que limita o tratamento ao mínimo necessário e fundamenta a minimização de dados é o da ___.',
        options: ['necessidade', 'finalidade', 'adequação', 'transparência'],
        answer: 'necessidade',
        why: 'A finalidade trata do propósito do tratamento; a adequação, da compatibilidade com a finalidade informada.',
      },
    ],
  },

  'cap.ia.04:ciencia-dados': {
    truths: [
      {
        statement: 'No CRISP-DM, a fase de avaliação pode mandar o trabalho de volta à preparação dos dados ou ao entendimento do negócio.',
        answer: true,
        why: 'O processo é iterativo, com seis fases que podem ser revisitadas.',
      },
      {
        statement: 'Um coeficiente de Pearson próximo de 0 prova que não existe nenhuma relação entre as duas variáveis.',
        answer: false,
        why: 'Ele indica ausência de relação linear, o que não exclui uma relação não linear.',
      },
      {
        statement: 'O RMSE volta à unidade original da variável prevista.',
        answer: true,
        why: 'O RMSE é a raiz do MSE. Por elevar os erros ao quadrado, penaliza mais os erros grandes.',
      },
    ],
    blanks: [
      {
        sentence: 'Usar no treino informação que não estaria disponível no momento da previsão é chamado de ___.',
        options: ['vazamento de dados', 'overfitting', 'imputação', 'normalização'],
        answer: 'vazamento de dados',
        why: 'O vazamento de dados (data leakage) gera desempenho irrealmente alto.',
      },
      {
        sentence: 'Para pagamentos de 2, 3, 3, 5 e 12 mil reais, a mediana é de ___ mil reais.',
        options: ['3', '4', '5', '12'],
        answer: '3',
        why: 'Ordenados os valores, o central é 3. A média é 5, puxada para cima pelo pagamento de 12 mil.',
      },
    ],
  },

  'cap.ia.04:big-data': {
    truths: [
      {
        statement: 'O fator de replicação padrão dos blocos no HDFS é 3.',
        answer: true,
        why: 'Os blocos são replicados em vários nós para tolerar falhas.',
      },
      {
        statement: 'No Spark, chamar uma transformação como filter dispara imediatamente o processamento dos dados.',
        answer: false,
        why: 'Pela avaliação preguiçosa, transformações só montam o plano. O processamento acontece quando uma ação, como count ou collect, é chamada.',
      },
      {
        statement: 'O YARN gerencia os recursos do cluster Hadoop e agenda as tarefas.',
        answer: true,
        why: 'É um dos componentes principais do Hadoop, ao lado do HDFS e do MapReduce.',
      },
    ],
    blanks: [
      {
        sentence: 'No MapReduce, a etapa entre map e reduce que agrupa os pares chave-valor por chave é o ___.',
        options: ['shuffle', 'collect', 'filter', 'count'],
        answer: 'shuffle',
        why: 'O map emite pares chave-valor, o shuffle os agrupa por chave e o reduce combina os valores de cada chave.',
      },
      {
        sentence: 'O banco NoSQL orientado a colunas que roda sobre o HDFS é o ___.',
        options: ['HBase', 'Hive', 'Kafka', 'YARN'],
        answer: 'HBase',
        why: 'O Hive oferece consultas semelhantes a SQL; o Kafka é mensageria distribuída para fluxos de eventos.',
      },
    ],
  },
};
