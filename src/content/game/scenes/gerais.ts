import type { SectionExtras } from '@/content/types';

// Cenas e atividades por seção dos grimórios de Conhecimentos Gerais e de Inglês:
// grim.ingles, grim.portugues, grim.matematica e grim.institucional.
// Todo o conteúdo é autoral e usa apenas fatos apresentados no texto de cada seção.

export const scenesGerais: Record<string, SectionExtras> = {
  // ─── O Códice dos Estrangeiros (Ilha dos Estrangeiros) ───────────────────────

  'cap.ingles.01:estrategias': {
    scene: [
      { who: 'Bubo', text: 'Chegou à Ilha um manual estrangeiro sobre a nova ponte de pagamentos. A névoa apagou a tradução, e os escrivães já discutem o que ele diz.' },
      { who: 'Aprendiz', text: 'Um deles jura que o texto fala de algo que acontece "eventualmente". Outro diz que é certeza. Como saber quem tem razão?' },
      { who: 'Morador da Ilha', text: 'Eu só preciso saber uma data: até quando a ponte antiga funciona. Ninguém tem paciência para ler tudo.' },
      { who: 'Bubo', text: 'Há um jeito de ler para a ideia geral e outro para achar um dado pontual. E há palavras que fingem ser nossas. Leia a seção e volte com o manual decifrado.' },
    ],
    truths: [
      {
        statement: 'Segundo a seção, convém ler a pergunta antes do texto, porque ela indica se é preciso visão geral ou um detalhe.',
        answer: true,
        why: 'É o primeiro passo do procedimento prático: a pergunta diz se a tarefa pede skimming ou scanning.',
      },
      {
        statement: 'Em documentação técnica, "the script assumes Python 3 is installed" significa que o script assume a tarefa de instalar o Python 3.',
        answer: false,
        why: 'Assume é falso cognato: significa supor, presumir. O script parte do princípio de que o Python 3 já está instalado.',
      },
      {
        statement: 'A expressão "at least 8 characters" estabelece um máximo de 8 caracteres.',
        answer: false,
        why: 'At least indica o mínimo. Para o máximo, o texto usa at most, up to ou no more than.',
      },
    ],
    blanks: [
      {
        sentence: 'Na frase "The tool prevents duplicate records", o verbo prevent significa ___.',
        options: ['impedir', 'avisar antes', 'prever', 'registrar'],
        answer: 'impedir',
        why: 'Prevent é falso cognato: não é "prevenir no sentido de avisar", e sim impedir, evitar.',
      },
      {
        sentence: 'Em "Clients no longer wait for a final answer", a expressão no longer significa ___.',
        options: ['não mais', 'por mais tempo', 'ainda não', 'nunca'],
        answer: 'não mais',
        why: 'O texto de treino da seção traduz no longer como "não mais": os clientes deixaram de esperar a resposta final.',
      },
    ],
    outro: 'O manual da ponte foi decifrado sem chutes: o que era certeza continuou certeza. A névoa recua da primeira praia da Ilha.',
  },

  'cap.ingles.01:coesao': {
    scene: [
      { who: 'Arquivista', text: 'Recebemos uma nota estrangeira sobre os registros de acesso do Arquivo. A névoa borrou só as palavras pequenas, e agora ninguém sabe se os registros antigos foram guardados ou não.' },
      { who: 'Aprendiz', text: 'Se faltam só as palavras pequenas, o sentido não deve ter mudado tanto, certo?' },
      { who: 'Bubo', text: 'Engano comum. Uma palavrinha de contraste ou de condição vira o parágrafo do avesso. E um "it" mal ligado culpa a pessoa errada.' },
      { who: 'Bubo', text: 'Estude os conectivos e as referências antes de assinarmos qualquer conclusão. A seção está aberta.' },
    ],
    truths: [
      {
        statement: 'Em "Save your changes; otherwise, they will be lost", otherwise indica o que acontece se a instrução não for seguida.',
        answer: true,
        why: 'Otherwise expressa a consequência do contrário: caso contrário, as alterações serão perdidas.',
      },
      {
        statement: 'Since sempre indica causa, nunca tempo.',
        answer: false,
        why: 'Since pode indicar tempo ("desde", como em since version 2.0) ou causa ("já que"). O contexto decide.',
      },
      {
        statement: 'Em "The client sends the token to the server, which validates it", o pronome it retoma the token.',
        answer: true,
        why: 'Which retoma the server, que valida; it retoma the token, que é o elemento validado.',
      },
    ],
    blanks: [
      {
        sentence: 'Em "The new framework is faster. However, it requires more memory.", um substituto adequado para However é ___.',
        options: ['Nevertheless', 'Therefore', 'Moreover', 'Because'],
        answer: 'Nevertheless',
        why: 'However expressa contraste, e nevertheless pertence à mesma relação. Therefore conclui, moreover adiciona e because indica causa.',
      },
      {
        sentence: 'Em "If the old key expires, create a new one", a palavra one substitui ___.',
        options: ['key', 'old', 'expires', 'create'],
        answer: 'key',
        why: 'One substitui um substantivo já citado; aqui, a chave (key).',
      },
    ],
    outro: 'Cada "it" encontrou seu dono e cada conectivo voltou ao lugar. A nota do Arquivo diz de novo o que dizia antes da névoa.',
  },

  'cap.ingles.01:gramatica': {
    scene: [
      { who: 'Morador da Ilha', text: 'O manual do farol estrangeiro diz algo sobre reiniciar a máquina. Metade do porto acha que é proibido, a outra metade acha que é obrigatório.' },
      { who: 'Aprendiz', text: 'E se não for nenhum dos dois? Pode ser só um conselho.' },
      { who: 'Bubo', text: 'Boa desconfiança. Nos manuais, os verbos modais medem a força de cada regra, e a voz passiva esconde quem age.' },
      { who: 'Bubo', text: 'Aprenda a ler essa gramática dos manuais, e o farol volta a girar sem briga no porto. Vamos à seção.' },
    ],
    truths: [
      {
        statement: 'A negativa do imperativo em inglês se forma com do not ou don\'t seguido do verbo.',
        answer: true,
        why: 'É a forma apresentada na seção, como em "Do not share your API key".',
      },
      {
        statement: 'Em "Your account has been locked", a voz passiva está no presente perfeito.',
        answer: true,
        why: 'Has been + particípio é a passiva no presente perfeito; a seção traduz como "Sua conta foi bloqueada".',
      },
      {
        statement: 'Nas RFCs da IETF, a palavra SHOULD em maiúsculas indica requisito absoluto.',
        answer: false,
        why: 'Pela RFC 2119, requisito absoluto é MUST. SHOULD é recomendação que pode ser descumprida com razões válidas e consciência das consequências.',
      },
    ],
    blanks: [
      {
        sentence: 'O prefixo ___ indica repetição, como em retry e reboot.',
        options: ['re-', 'de-', 'mis-', 'over-'],
        answer: 're-',
        why: 'Re- significa "de novo". De- reverte, mis- indica erro e over- indica excesso.',
      },
      {
        sentence: 'Em "Passwords must contain at least 12 characters", o modal must expressa ___.',
        options: ['obrigação', 'recomendação', 'possibilidade remota', 'ausência de obrigação'],
        answer: 'obrigação',
        why: 'Must é o modal de obrigação forte. Recomendação é should; possibilidade remota é might; ausência de obrigação é don\'t have to.',
      },
    ],
    outro: 'O farol voltou a girar: ninguém mais confunde proibição com conselho. Os manuais da Ilha obedecem a você agora.',
  },

  'cap.ingles.02:api': {
    scene: [
      { who: 'Bubo', text: 'Os sistemas da Ilha conversam com o Tesouro por uma API estrangeira. Desde ontem, metade das consultas volta com números estranhos no lugar dos contratos.' },
      { who: 'Aprendiz', text: 'Números como 401, 404, 429? Alguém sabe o que eles querem dizer?' },
      { who: 'Arquivista', text: 'A névoa levou a página da documentação que explicava. Sobrou só o trecho de referência, todo em inglês.' },
      { who: 'Bubo', text: 'Então vamos ler como auditores: endpoint, parâmetros, cabeçalhos, códigos e limites. A seção ensina o vocabulário. Depois voltamos aos números.' },
    ],
    truths: [
      {
        statement: 'O código 201 (Created) indica que um recurso foi criado.',
        answer: true,
        why: 'Na tabela de códigos da seção, 201 Created significa recurso criado.',
      },
      {
        statement: 'Os códigos da família 5xx indicam erro do cliente.',
        answer: false,
        why: 'A família 4xx indica erro do cliente; a 5xx indica erro do servidor.',
      },
      {
        statement: 'No semver, passar de 2.4.1 para 3.0.0 sinaliza risco de quebra de compatibilidade.',
        answer: true,
        why: 'A mudança no número MAJOR indica mudanças incompatíveis na API (breaking changes).',
      },
    ],
    blanks: [
      {
        sentence: 'Em /invoices/{id}, o id é um ___.',
        options: ['path parameter', 'query parameter', 'header', 'status code'],
        answer: 'path parameter',
        why: 'O parâmetro de caminho fica dentro do próprio caminho da URL. O query parameter vem depois do sinal de interrogação.',
      },
      {
        sentence: 'Quando o cliente excede o rate limit, a API responde com o código ___.',
        options: ['429', '403', '409', '503'],
        answer: '429',
        why: '429 Too Many Requests indica limite de requisições excedido.',
      },
    ],
    outro: 'Cada número da API voltou a ter sentido, e o Tesouro recebe de novo os contratos certos. A névoa perdeu mais um porto na Ilha.',
  },

  'cap.ingles.02:generos': {
    scene: [
      { who: 'Morador da Ilha', text: 'Achamos um baú de papéis estrangeiros: um README, notas de versão e um artigo. A névoa misturou tudo, e ninguém sabe o que é instrução e o que é resultado de pesquisa.' },
      { who: 'Aprendiz', text: 'Cada tipo de texto deve guardar a informação num lugar diferente. Se eu souber onde procurar, acho mais rápido.' },
      { who: 'Bubo', text: 'Exatamente. E há abreviações miúdas que trocam exemplo por explicação. Um artigo cauteloso também não é uma prova.' },
      { who: 'Bubo', text: 'Leia sobre os gêneros e as abreviações. Depois separamos o baú, papel por papel.' },
    ],
    truths: [
      {
        statement: 'Na convenção Keep a Changelog, a categoria Fixed agrupa defeitos corrigidos.',
        answer: true,
        why: 'Fixed significa corrigido. As outras categorias são Added, Changed, Deprecated, Removed e Security.',
      },
      {
        statement: 'Em um README, a seção Requirements descreve como colaborar com o projeto.',
        answer: false,
        why: 'Requirements (ou Prerequisites) lista o que precisa estar instalado antes. Como colaborar fica em Contributing.',
      },
      {
        statement: 'Para captar a ideia principal de um artigo científico, a seção recomenda ler o abstract e a conclusão.',
        answer: true,
        why: 'O abstract resume o trabalho e a conclusão fecha os resultados, por isso são o atalho indicado.',
      },
    ],
    blanks: [
      {
        sentence: 'Em "make sure Node.js 20 or later is available", or later significa ___.',
        options: ['ou superior', 'ou anterior', 'mais tarde', 'no máximo'],
        answer: 'ou superior',
        why: 'A glosa da seção traduz como "20 ou superior": qualquer versão a partir da 20 serve.',
      },
      {
        sentence: 'Na mensagem de erro, Connection ___ indica que o tempo de conexão se esgotou.',
        options: ['timed out', 'refused', 'denied', 'expired'],
        answer: 'timed out',
        why: 'Connection timed out é tempo esgotado. Connection refused é recusa pelo destino.',
      },
    ],
    outro: 'O baú foi separado: instruções de um lado, resultados de outro, e nenhum "suggest" virou prova. A Ilha confia na sua leitura.',
  },

  'cap.ingles.02:seguranca-nuvem': {
    scene: [
      { who: 'Bubo', text: 'Chegou um alerta estrangeiro sobre o módulo de envio de arquivos da Torre. O mensageiro só sabe dizer que fala de "vulnerability" e "workaround".' },
      { who: 'Aprendiz', text: 'Isso quer dizer que já invadiram o sistema? Ou que ainda dá tempo?' },
      { who: 'Tesoureiro-Mor', text: 'Ora, o sistema roda em duas zonas na nuvem. Não precisamos nos preocupar com cópias de segurança.' },
      { who: 'Bubo', text: 'Hum. Antes de concordar com o Tesoureiro, leia o vocabulário de segurança e nuvem. Depois decidimos o que o alerta pede.' },
    ],
    truths: [
      {
        statement: 'A redundância entre zonas de disponibilidade torna as cópias de segurança desnecessárias.',
        answer: false,
        why: 'O texto separa as ideias: zonas tratam de disponibilidade; backup trata de recuperação de dados. Elas não protegem contra exclusão acidental.',
      },
      {
        statement: 'Threat é a ameaça; vulnerability é a fraqueza que pode ser explorada.',
        answer: true,
        why: 'É a distinção conceitual da seção; o risco combina a probabilidade de a ameaça explorar a fraqueza com o impacto.',
      },
      {
        statement: 'Scale up significa acrescentar mais máquinas ao sistema.',
        answer: false,
        why: 'Scale up aumenta a capacidade de uma máquina; acrescentar máquinas é scale out.',
      },
    ],
    blanks: [
      {
        sentence: 'Trocar as chaves criptográficas periodicamente chama-se key ___.',
        options: ['rotation', 'rollback', 'disclosure', 'provisioning'],
        answer: 'rotation',
        why: 'Key rotation é a troca periódica de chaves. Rollback é reverter versão; disclosure, divulgação; provisioning, alocar recursos.',
      },
      {
        sentence: 'A dependência excessiva de um único fornecedor de nuvem chama-se vendor ___.',
        options: ['lock-in', 'tenant', 'workload', 'uptime'],
        answer: 'lock-in',
        why: 'Vendor lock-in é a dependência excessiva de um fornecedor, termo da tabela de nuvem da seção.',
      },
    ],
    outro: 'O alerta foi lido inteiro: a correção é obrigatória e as cópias diárias continuam necessárias, diga o Tesoureiro o que disser. A Ilha dos Estrangeiros está livre da névoa.',
  },

  // ─── O Livro do Bem Escrever (Vale das Letras) ───────────────────────────────

  'cap.port.01:interpretacao': {
    scene: [
      { who: 'Morador do Vale', text: 'Encontraram no arquivo uma crônica antiga sobre as obras do Vale. A névoa apagou o final, e cada escrivão jura que o autor quis dizer uma coisa diferente.' },
      { who: 'Aprendiz', text: 'Um diz que a crônica acusa o mestre de obras. Outro diz que só elogia. Os dois não podem estar certos.' },
      { who: 'Bubo', text: 'Talvez nenhum esteja. O que vale é o que o texto sustenta, e não o que gostaríamos que ele dissesse. Às vezes o autor fala pelo avesso.' },
      { who: 'Bubo', text: 'Leia sobre interpretação, discursos e figuras. Depois voltamos à crônica com olhos de auditor.' },
    ],
    truths: [
      {
        statement: 'Na transposição do discurso direto para o indireto, o imperativo "entregue" passa a "que entregasse".',
        answer: true,
        why: 'Pela tabela da seção, o imperativo do discurso direto corresponde ao imperfeito do subjuntivo no indireto.',
      },
      {
        statement: '"Os relatórios gritavam o desvio" é exemplo de hipérbole.',
        answer: false,
        why: 'Atribuir uma ação humana (gritar) a seres inanimados é prosopopeia. Hipérbole é o exagero intencional.',
      },
      {
        statement: 'Relatórios técnicos e redação oficial preferem a linguagem conotativa, porque ela enriquece o sentido.',
        answer: false,
        why: 'Eles preferem a denotação, porque a conotação admite mais de uma leitura.',
      },
    ],
    blanks: [
      {
        sentence: 'Em "Eu analisei a receita; ela, a despesa.", a omissão do verbo já expresso chama-se ___.',
        options: ['zeugma', 'pleonasmo', 'antítese', 'eufemismo'],
        answer: 'zeugma',
        why: 'Zeugma é a omissão de um termo já expresso antes na frase; aqui, o verbo "analisou".',
      },
      {
        sentence: 'A reescrita de um texto com outras palavras, mantendo o sentido original, chama-se ___.',
        options: ['paráfrase', 'paródia', 'alusão', 'epígrafe'],
        answer: 'paráfrase',
        why: 'A paráfrase preserva o sentido; a paródia o inverte; a alusão é referência indireta; a epígrafe é trecho na abertura.',
      },
    ],
    outro: 'A crônica não acusava nem elogiava: ironizava, e você percebeu sem inventar nada. As primeiras casas do Vale saem da névoa.',
  },

  'cap.port.01:ortografia': {
    scene: [
      { who: 'Bubo', text: 'Um edital do Vale foi recopiado depois que a névoa passou. O copista pôs acentos onde não devia e tirou outros que eram obrigatórios.' },
      { who: 'Aprendiz', text: 'Acento parece detalhe. Faz diferença num edital?' },
      { who: 'Arquivista', text: 'Faz. Onde se lê "ratificar" e era "retificar", a ordem muda inteira. E as crases tortas confundem a quem o documento se dirige.' },
      { who: 'Bubo', text: 'O Acordo Ortográfico e a crase são o nosso esquadro aqui. Estude a seção, e depois revisamos o edital linha por linha.' },
    ],
    truths: [
      {
        statement: 'Após o Acordo de 1990, "idéia" passou a "ideia", mas "papéis" manteve o acento.',
        answer: true,
        why: 'O ditongo aberto perde o acento nas paroxítonas (ideia), mas o mantém nas oxítonas e monossílabos (papéis, céu).',
      },
      {
        statement: '"Itens" leva acento agudo, assim como "hífen".',
        answer: false,
        why: '"Itens" é paroxítona terminada em -ens e não leva acento; "hífen" termina em -n e é acentuada.',
      },
      {
        statement: 'Em "A sessão começa às 14h", a crase é obrigatória.',
        answer: true,
        why: 'Diante de horas determinadas, a crase é obrigatória.',
      },
    ],
    blanks: [
      {
        sentence: 'Pela regra dos prefixos, escreve-se ___.',
        options: ['micro-ondas', 'microondas', 'micro ondas', 'microndas'],
        answer: 'micro-ondas',
        why: 'Usa-se hífen quando o segundo elemento começa pela mesma vogal com que termina o prefixo.',
      },
      {
        sentence: 'Para entrar no depósito, o juiz expediu um ___ de busca.',
        options: ['mandado', 'mandato', 'mandando', 'mandante'],
        answer: 'mandado',
        why: 'Mandado é ordem judicial; mandato é período de exercício.',
      },
    ],
    outro: 'O edital do Vale voltou a dizer o que dizia: cada acento no lugar, cada crase com motivo. A névoa recua das praças do Vale.',
  },

  'cap.port.01:pontuacao': {
    scene: [
      { who: 'Morador do Vale', text: 'Saiu um aviso: "Os servidores, que faltaram, serão notificados." Agora todo mundo da repartição acha que vai levar advertência.' },
      { who: 'Aprendiz', text: 'Mas só dois faltaram. Será que a névoa mexeu nas vírgulas?' },
      { who: 'Bubo', text: 'Pode ter mexido. Um par de vírgulas muda quem é atingido pela frase. E há pronomes fora do lugar no mesmo aviso.' },
      { who: 'Bubo', text: 'Leia sobre pontuação e pronomes. Depois decidimos se o aviso precisa ser corrigido antes de assustar mais alguém.' },
    ],
    truths: [
      {
        statement: 'O ponto e vírgula pode separar itens de uma enumeração, como os incisos de uma lei.',
        answer: true,
        why: 'É um dos usos principais do ponto e vírgula apresentados na seção.',
      },
      {
        statement: 'Com verbo no particípio, a norma-padrão admite a ênclise, como em "Tinha encaminhado-o".',
        answer: false,
        why: 'Não se usa ênclise com particípio. As formas corretas são "Tinha-o encaminhado" ou "o tinha encaminhado".',
      },
      {
        statement: 'Em "O cargo a que aspira", a preposição vem antes do relativo porque o verbo aspirar exige "a".',
        answer: true,
        why: 'A preposição pedida pelo verbo da oração adjetiva se coloca antes do pronome relativo.',
      },
    ],
    blanks: [
      {
        sentence: 'Ligando "analisar" ao pronome "o", a forma correta é ___.',
        options: ['analisá-lo', 'analisar-o', 'analisa-o', 'analisá-no'],
        answer: 'analisá-lo',
        why: 'Após verbo terminado em r, s ou z, o pronome "o" vira "lo", e a terminação do verbo cai.',
      },
      {
        sentence: 'Pronomes de tratamento levam o verbo à ___ pessoa.',
        options: ['3ª', '2ª', '1ª', 'mesma do possessivo "vossa"'],
        answer: '3ª',
        why: 'Diz-se "Vossa Excelência decidiu", com verbo e possessivos na 3ª pessoa.',
      },
    ],
    outro: 'As vírgulas do aviso foram retiradas, e só os dois faltosos serão notificados. A repartição respirou, e a névoa perdeu mais uma rua do Vale.',
  },

  'cap.port.01:morfologia': {
    scene: [
      { who: 'Arquivista', text: 'Um parecer chegou com uma palavra apagada: "o conselheiro ___ que o prazo era exíguo". Temos três candidatas e nenhuma certeza.' },
      { who: 'Aprendiz', text: 'Exíguo eu nem sei o que é. E se a palavra apagada mudar o sentido do parecer?' },
      { who: 'Bubo', text: 'Por isso estudamos o que cada palavra é e o que ela faz na frase. Um "que" pode ser três coisas diferentes no mesmo parágrafo.' },
      { who: 'Bubo', text: 'A seção trata de classes, formação de palavras e sinonímia. Leia, e o parecer volta a ter sentido.' },
    ],
    truths: [
      {
        statement: 'Em "Ele falou alto", o adjetivo "alto" funciona como advérbio e fica invariável.',
        answer: true,
        why: 'É exemplo de derivação imprópria: a palavra muda de classe sem mudar de forma.',
      },
      {
        statement: '"Guarda-chuva" é formada por aglutinação, porque une duas palavras.',
        answer: false,
        why: 'Em "guarda-chuva" não há perda de fonemas, então é justaposição. Aglutinação envolve perda, como em "planalto".',
      },
      {
        statement: 'Em "Analisaram-se as contas", o "se" é pronome apassivador.',
        answer: true,
        why: 'Com verbo transitivo direto, o "se" forma a voz passiva sintética.',
      },
    ],
    blanks: [
      {
        sentence: 'No contexto de "mitigar os riscos", um sinônimo adequado de mitigar é ___.',
        options: ['atenuar', 'eliminar', 'confirmar', 'legitimar'],
        answer: 'atenuar',
        why: 'Mitigar significa atenuar, suavizar. Eliminar corresponde a elidir; confirmar, a corroborar; legítimo, a lídimo.',
      },
      {
        sentence: 'Em "Era tão complexo que demorou", o "que" é conjunção ___.',
        options: ['consecutiva', 'integrante', 'causal', 'expletiva'],
        answer: 'consecutiva',
        why: 'Acompanhado de "tão" ou "tanto", o "que" introduz a consequência.',
      },
    ],
    outro: 'Exíguo é curto, e o parecer agora pede mais prazo com todas as letras. O Vale das Letras lê de novo sem tropeçar.',
  },

  'cap.port.02:concordancia': {
    scene: [
      { who: 'Arquivista', text: 'O relatório do Vale sobre as pontes chegou cheio de verbos no plural onde devia haver singular, e vice-versa. A névoa embaralhou quem é sujeito de quê.' },
      { who: 'Aprendiz', text: 'Há uma frase que diz "devem haver falhas na obra". Soa natural para mim.' },
      { who: 'Bubo', text: 'Soar natural não basta para um documento oficial. Ache o verbo, ache o sujeito, ponha tudo na ordem direta e confira.' },
      { who: 'Bubo', text: 'A seção sobre concordância é o nosso prumo. Leia, e depois endireitamos o relatório.' },
    ],
    truths: [
      {
        statement: '"Faltam ainda três documentos" está de acordo com a norma-padrão.',
        answer: true,
        why: 'O sujeito posposto é "três documentos", no plural; na ordem direta, "três documentos ainda faltam".',
      },
      {
        statement: 'Em "Mais de um conselheiro votou contra", o verbo deveria ir ao plural.',
        answer: false,
        why: 'Com "mais de um", o verbo fica no singular, salvo reciprocidade ou repetição.',
      },
      {
        statement: 'A expressão "em anexo" é invariável: "Seguem em anexo as planilhas".',
        answer: true,
        why: '"Anexo" sozinho concorda com o nome, mas a locução "em anexo" não varia.',
      },
    ],
    blanks: [
      {
        sentence: 'Na norma-padrão, escreve-se: "___ irregularidades no edital."',
        options: ['Havia', 'Haviam', 'Houveram', 'Existia'],
        answer: 'Havia',
        why: 'Haver no sentido de existir é impessoal e fica no singular. Já "existir" é pessoal e iria ao plural: "existiam".',
      },
      {
        sentence: 'A servidora estava ___ cansada depois da sessão.',
        options: ['meio', 'meia', 'meios', 'meias'],
        answer: 'meio',
        why: 'No sentido de "um pouco", meio é advérbio e fica invariável.',
      },
    ],
    outro: 'Cada verbo do relatório encontrou seu sujeito, e as pontes voltaram a constar no mapa do Vale.',
  },

  'cap.port.02:regencia': {
    scene: [
      { who: 'Morador do Vale', text: 'A ata da última sessão diz que "o atraso implica em multa" e que "a auditoria visa o controle". O escrivão novo jura que está tudo certo.' },
      { who: 'Aprendiz', text: 'E se a ata estiver errada? Alguém pode contestar a multa por causa de uma preposição?' },
      { who: 'Bubo', text: 'Uma ata mal escrita dá trabalho a quem quer contestar e a quem quer defender. Regência, vozes e tempos verbais precisam fechar.' },
      { who: 'Bubo', text: 'Estude a seção e depois relemos a ata juntos, verbo por verbo.' },
    ],
    truths: [
      {
        statement: 'Na norma-padrão, "Chegou ao Tribunal" é preferível a "Chegou no Tribunal".',
        answer: true,
        why: 'Verbos de movimento como chegar e ir pedem a preposição "a"; "chegar em" é coloquial.',
      },
      {
        statement: 'A forma correta do pretérito perfeito de "intervir" é "ele interviu".',
        answer: false,
        why: 'Intervir segue o verbo vir: "ele interveio", "eles intervieram".',
      },
      {
        statement: 'Na transposição para a passiva analítica, o objeto direto da ativa passa a ser o sujeito.',
        answer: true,
        why: 'É o primeiro passo da transposição; o antigo sujeito vira agente da passiva.',
      },
    ],
    blanks: [
      {
        sentence: 'Pela correlação de tempos: "Se o prazo for maior, a equipe ___."',
        options: ['concluirá', 'concluiria', 'concluísse', 'conclua'],
        answer: 'concluirá',
        why: 'Condicional com futuro do subjuntivo ("for") combina com futuro do presente ("concluirá").',
      },
      {
        sentence: 'No sentido de presenciar: "Assistimos ___ sessão plenária."',
        options: ['à', 'a', 'na', 'com a'],
        answer: 'à',
        why: 'Assistir no sentido de ver é transitivo indireto e pede "a"; com o artigo de "sessão", há crase.',
      },
    ],
    outro: 'A ata foi corrigida: o atraso implica multa, e a auditoria visa ao controle. Mais um trecho do Vale volta ao mapa.',
  },

  'cap.port.02:periodo': {
    scene: [
      { who: 'Bubo', text: 'Um despacho do Vale foi reescrito às pressas depois da névoa. Onde estava "embora", alguém pôs "porque". O sentido virou do avesso.' },
      { who: 'Aprendiz', text: 'Então o despacho agora diz que as contas foram aprovadas por causa das falhas, e não apesar delas?' },
      { who: 'Arquivista', text: 'Exatamente o que o Tesoureiro-Mor gostaria que ficasse escrito, se me permite a observação.' },
      { who: 'Bubo', text: 'Cada conectivo carrega uma relação. Leia sobre coordenação, subordinação e reescrita, e devolvemos ao despacho o sentido original.' },
    ],
    truths: [
      {
        statement: '"Como faltavam documentos, o processo foi devolvido" pode ser reescrita como "O processo foi devolvido porque faltavam documentos", sem mudar o sentido.',
        answer: true,
        why: '"Como" anteposto expressa causa, assim como "porque". É uma das transformações equivalentes da seção.',
      },
      {
        statement: '"Embora havia falhas, as contas foram aprovadas" está de acordo com a norma-padrão.',
        answer: false,
        why: 'Concessivas com "embora" pedem subjuntivo: "Embora houvesse falhas".',
      },
      {
        statement: '"Desde que" pode expressar condição ou tempo, conforme o contexto.',
        answer: true,
        why: 'Condição em "desde que haja dotação"; tempo em "desde que assumiu".',
      },
    ],
    blanks: [
      {
        sentence: 'Em "O prazo era curto; ___, a equipe concluiu", o conectivo adequado é de valor adversativo.',
        options: ['contudo', 'portanto', 'porque', 'conforme'],
        answer: 'contudo',
        why: 'Contudo é adversativo. Portanto é conclusivo, porque é causal ou explicativo e conforme indica conformidade.',
      },
      {
        sentence: 'Ao trocar "chegou à meta" por "atingiu ___ meta", a crase desaparece.',
        options: ['a', 'à', 'na', 'para a'],
        answer: 'a',
        why: '"Atingir" é transitivo direto, sem preposição; resta só o artigo.',
      },
    ],
    outro: 'O despacho diz de novo "embora", e as contas voltaram a ser aprovadas com ressalvas, não por mérito das falhas. O Tesoureiro-Mor não gostou nada.',
  },

  'cap.port.02:redacao-oficial': {
    scene: [
      { who: 'Morador do Vale', text: 'A Torre precisa mandar um ofício ao Conselho pedindo os registros apagados. O rascunho tem três parágrafos de saudação antes de dizer o que quer.' },
      { who: 'Aprendiz', text: 'E ainda começa com "Achei por bem escrever". Isso não parece coisa de órgão público.' },
      { who: 'Bubo', text: 'Não parece porque não é. Quem fala num ofício é o órgão, e o pedido vem logo. O Manual da Presidência mostra como.' },
      { who: 'Bubo', text: 'Leia a seção sobre Redação Oficial. Depois reescrevemos o ofício como se deve.' },
    ],
    truths: [
      {
        statement: 'Pela 3ª edição do Manual, o padrão ofício passou a valer também para as comunicações internas entre unidades do mesmo órgão.',
        answer: true,
        why: 'A edição unificou ofício, aviso e memorando sob o nome "ofício", usado inclusive internamente.',
      },
      {
        statement: 'Segundo o Manual, "doutor" é forma de tratamento adequada para qualquer autoridade.',
        answer: false,
        why: 'O Manual orienta que "doutor" é título acadêmico, não forma de tratamento, e deve ser evitado indiscriminadamente.',
      },
      {
        statement: 'Usa-se "Sua Excelência" quando se fala diretamente com a autoridade.',
        answer: false,
        why: 'Fala-se com a autoridade usando "Vossa Excelência"; "Sua Excelência" é usado quando se fala dela.',
      },
    ],
    blanks: [
      {
        sentence: 'No padrão ofício, o local e a data vêm por extenso e alinhados à ___.',
        options: ['direita', 'esquerda', 'margem central', 'linha do assunto'],
        answer: 'direita',
        why: 'É a orientação da seção: "Goiânia, 17 de outubro de 2026.", alinhado à direita.',
      },
      {
        sentence: 'O atributo que pede o máximo de informação com o mínimo de palavras, sem cortar o essencial, é a ___.',
        options: ['concisão', 'formalidade', 'impessoalidade', 'coesão'],
        answer: 'concisão',
        why: 'Essa é a definição de concisão no Manual; ela elimina o supérfluo, não o necessário.',
      },
    ],
    outro: 'O ofício saiu em uma página, impessoal e direto. O Conselho vai ler, e o Vale das Letras está livre da névoa.',
  },

  // ─── O Ábaco do Tesoureiro (Montes dos Números) ──────────────────────────────

  'cap.mat.01:inteiros': {
    scene: [
      { who: 'Morador dos Montes', text: 'O livro-caixa da aldeia diz que sobrou dinheiro da reforma do moinho, mas o cofre está vazio. A névoa apagou as contas intermediárias.' },
      { who: 'Aprendiz', text: 'Só restaram as frações: uma parte foi gasta, depois uma parte do que sobrou. Alguém pode ter feito a conta sobre o total.' },
      { who: 'Bubo', text: 'Esse é o truque mais velho dos Montes. Um sinal trocado ou uma fração aplicada na base errada, e o desvio se esconde no meio da conta.' },
      { who: 'Bubo', text: 'Revise inteiros, potências e frações. Depois refazemos o livro-caixa, linha por linha.' },
    ],
    truths: [
      {
        statement: 'A dízima 0,2727... corresponde à fração 27/100.',
        answer: false,
        why: 'Em dízima periódica simples, o período vai sobre tantos noves quantos forem seus algarismos: 27/99 = 3/11.',
      },
      {
        statement: 'A expressão 12 − 8 ÷ 4 × 2 vale 11.',
        answer: false,
        why: 'Divisão e multiplicação seguem a ordem de leitura: 8 ÷ 4 = 2 e 2 × 2 = 4. Então 12 − 4 = 8.',
      },
      {
        statement: 'Se sobram 2/5 de uma verba e isso vale R$ 600, a verba inteira era R$ 1.500.',
        answer: true,
        why: 'Divide-se pelo numerador e multiplica-se pelo denominador: 600 ÷ 2 × 5 = 1.500. Conferência: 2/5 de 1.500 = 600.',
      },
    ],
    blanks: [
      {
        sentence: 'De uma verba de R$ 800, gastou-se 1/4 e, depois, 1/2 do restante. Sobraram R$ ___.',
        options: ['300', '200', '400', '100'],
        answer: '300',
        why: '1/4 de 800 = 200; restam 600; metade de 600 = 300; sobram 300. Pelas frações: 3/4 × 1/2 = 3/8, e 3/8 de 800 = 300.',
      },
      {
        sentence: 'O valor de 3² · 3⁻⁴ ÷ 3⁻³ é ___.',
        options: ['3', '1/3', '9', '1/27'],
        answer: '3',
        why: 'Somam-se e subtraem-se os expoentes: 2 + (−4) − (−3) = 1, e 3¹ = 3.',
      },
    ],
    outro: 'O livro-caixa do moinho fecha de novo: a segunda fração era sobre o restante, e não sobre o total. Uma trilha dos Montes reaparece no mapa.',
  },

  'cap.mat.01:divisores': {
    scene: [
      { who: 'Bubo', text: 'Os três guardas dos Montes fazem a ronda dos cofres em ciclos diferentes. A névoa apagou a tabela, e ninguém sabe quando voltam a passar juntos.' },
      { who: 'Aprendiz', text: 'E os processos da aldeia também estão misturados. Precisamos dividi-los em lotes iguais, sem misturar os tipos.' },
      { who: 'Tesoureiro-Mor', text: 'Basta multiplicar os ciclos dos guardas e pronto. Para que tanta conta?' },
      { who: 'Bubo', text: 'Multiplicar dá um múltiplo comum, mas talvez não o menor. Estude múltiplos, divisores, MMC e MDC, e veremos se o Tesoureiro tem razão.' },
    ],
    truths: [
      {
        statement: 'O número 1.234 é divisível por 3.',
        answer: false,
        why: 'A soma dos algarismos é 1 + 2 + 3 + 4 = 10, que não é divisível por 3.',
      },
      {
        statement: 'Para 18 e 24, o MDC é 6 e o MMC é 72.',
        answer: true,
        why: '18 = 2 × 3² e 24 = 2³ × 3. MDC = 2 × 3 = 6; MMC = 2³ × 3² = 72. Conferência: 6 × 72 = 432 = 18 × 24.',
      },
      {
        statement: 'O número 1.016 é divisível por 8.',
        answer: true,
        why: 'Os três últimos algarismos formam 016 = 16 = 8 × 2. De fato, 1.016 = 8 × 127.',
      },
    ],
    blanks: [
      {
        sentence: 'Três guardas fazem ronda a cada 4, 6 e 9 dias e passaram juntos hoje. Voltarão a passar juntos daqui a ___ dias.',
        options: ['36', '216', '12', '18'],
        answer: '36',
        why: '4 = 2², 6 = 2 × 3, 9 = 3². MMC = 2² × 3² = 36. O produto 216 também é múltiplo comum, mas não o menor.',
      },
      {
        sentence: 'Há 36, 60 e 84 processos de tipos diferentes para separar em lotes iguais, sem misturar tipos e com o maior tamanho possível. Cada lote terá ___ processos.',
        options: ['12', '15', '6', '4'],
        answer: '12',
        why: '36 = 2² × 3², 60 = 2² × 3 × 5, 84 = 2² × 3 × 7. MDC = 2² × 3 = 12. Serão 3 + 5 + 7 = 15 lotes, mas o tamanho de cada um é 12.',
      },
    ],
    outro: 'Os guardas voltam a se encontrar em 36 dias, e não em 216, como queria o Tesoureiro-Mor. Os cofres dos Montes têm ronda certa outra vez.',
  },

  'cap.mat.01:razoes': {
    scene: [
      { who: 'Morador dos Montes', text: 'O prêmio das aldeias seria dividido conforme o trabalho de cada uma. A névoa apagou a regra, e a aldeia que menos trabalhou ficou com a maior parte.' },
      { who: 'Aprendiz', text: 'Pode ter sido erro de conta. Ou alguém dividiu na proporção direta quando devia ser inversa.' },
      { who: 'Bubo', text: 'Ou o contrário. Razões, proporções e regra de três dizem quem deve receber quanto, e quem errou a conta de propósito.' },
      { who: 'Bubo', text: 'Leia a seção com calma. Depois refazemos o rateio na frente de todas as aldeias.' },
    ],
    truths: [
      {
        statement: 'Dividir 90 em partes diretamente proporcionais a 2, 3 e 4 resulta em 20, 30 e 40.',
        answer: true,
        why: 'A soma dos pesos é 9, e a constante é 90 ÷ 9 = 10. As partes são 2 × 10, 3 × 10 e 4 × 10.',
      },
      {
        statement: 'Se 5 servidores concluem uma tarefa em 12 dias, 10 servidores concluem a mesma tarefa em 24 dias.',
        answer: false,
        why: 'Servidores e dias são inversamente proporcionais: o produto se mantém. 5 × 12 = 10 × d, logo d = 6 dias.',
      },
      {
        statement: 'Ser inversamente proporcional a 3 e 6 equivale a ser diretamente proporcional a 1 e 2.',
        answer: false,
        why: 'Os inversos são 1/3 e 1/6; multiplicando pelo MMC 6, os pesos ficam 2 e 1. Quem tem o menor número recebe mais.',
      },
    ],
    blanks: [
      {
        sentence: 'Três impressoras imprimem 600 páginas em 20 minutos. No mesmo ritmo, em 50 minutos imprimem ___ páginas.',
        options: ['1.500', '240', '1.200', '1.800'],
        answer: '1.500',
        why: 'Tempo e páginas são diretamente proporcionais: 600 × 50 ÷ 20 = 1.500.',
      },
      {
        sentence: 'A razão entre analistas e técnicos de um setor é 3/5, e o setor tem 40 servidores dessas carreiras. Há ___ analistas.',
        options: ['15', '24', '25', '8'],
        answer: '15',
        why: 'Pela soma dos termos: 40 ÷ (3 + 5) = 5. Analistas = 3 × 5 = 15 e técnicos = 25. Conferência: 15/25 = 3/5.',
      },
    ],
    outro: 'O rateio foi refeito em praça pública, e cada aldeia recebeu o que lhe cabia. A névoa perdeu mais um vale dos Montes.',
  },

  'cap.mat.01:porcentagem': {
    scene: [
      { who: 'Arquivista', text: 'Um contrato dos Montes teve reajuste e depois um desconto. O relatório diz que o valor final é o original "mais a diferença das taxas". A névoa levou o resto.' },
      { who: 'Aprendiz', text: 'Somar e subtrair porcentagens parece tão natural. Qual é o problema?' },
      { who: 'Bubo', text: 'O problema é que cada taxa incide sobre uma base diferente. E as pistas do Tesouro falam numa diferença que se repete sempre.' },
      { who: 'Bubo', text: 'Estude porcentagem, acréscimos e descontos. Quem domina o fator multiplicativo não se deixa enganar por relatórios bonitos.' },
    ],
    truths: [
      {
        statement: 'Um aumento de 20% seguido de um desconto de 20% devolve o valor inicial.',
        answer: false,
        why: 'Os fatores se multiplicam: 1,20 × 0,80 = 0,96. Há redução de 4%.',
      },
      {
        statement: 'Um preço de R$ 400 com desconto de 15% passa a R$ 340.',
        answer: true,
        why: 'O fator do desconto é 0,85, e 400 × 0,85 = 340.',
      },
      {
        statement: 'Se uma taxa passou de 20% para 30%, o aumento relativo foi de 10%.',
        answer: false,
        why: 'A diferença é de 10 pontos percentuais; o aumento relativo é 10 ÷ 20 = 50%.',
      },
    ],
    blanks: [
      {
        sentence: 'Após um aumento de 20%, um serviço passou a custar R$ 600. Antes custava R$ ___.',
        options: ['500', '480', '720', '580'],
        answer: '500',
        why: 'Divide-se pelo fator: 600 ÷ 1,2 = 500. Tirar 20% de 600 (resultado 480) é o erro clássico.',
      },
      {
        sentence: '25% de 60% equivale a ___.',
        options: ['15%', '35%', '85%', '40%'],
        answer: '15%',
        why: 'Porcentagem de porcentagem multiplica: 0,25 × 0,60 = 0,15 = 15%.',
      },
    ],
    outro: 'As taxas do contrato foram multiplicadas, e a diferença escondida apareceu no livro. O Tesoureiro-Mor terá de explicar para onde ela foi.',
  },

  'cap.mat.02:associacao': {
    scene: [
      { who: 'Bubo', text: 'Quatro escrivães dos Montes estavam no arquivo na noite em que um registro sumiu. Cada um deu uma versão, e a névoa apagou o livro de entradas.' },
      { who: 'Aprendiz', text: 'Se soubermos quantos dizem a verdade, dá para testar cada suspeito, um de cada vez.' },
      { who: 'Morador dos Montes', text: 'E tem mais: alguém concluiu que, se o relatório não atrasou, ninguém merece multa. Isso faz sentido?' },
      { who: 'Bubo', text: 'Nem toda conclusão que parece certa decorre das premissas. Estude associações, ordenações e deduções. O interrogatório começa depois.' },
    ],
    truths: [
      {
        statement: 'A negação de "Nenhum contrato foi aditado" é "Algum contrato foi aditado".',
        answer: true,
        why: 'Para negar "nenhum", basta que exista pelo menos um caso contrário.',
      },
      {
        statement: 'De "se o relatório atrasa, há multa" e "o relatório não atrasou", conclui-se validamente que não há multa.',
        answer: false,
        why: 'É a falácia da negação do antecedente (P → Q; não P; logo não Q). A multa pode ter outra causa.',
      },
      {
        statement: 'De "se há sobrepreço, há dano" e "não há dano", conclui-se validamente que não há sobrepreço.',
        answer: true,
        why: 'É o modus tollens (P → Q; não Q; logo não P), forma válida.',
      },
    ],
    blanks: [
      {
        sentence: 'Dora chegou primeiro; Caio chegou imediatamente depois de Ana; Beto chegou antes de Ana. Entre os quatro, o último a chegar foi ___.',
        options: ['Caio', 'Ana', 'Beto', 'Dora'],
        answer: 'Caio',
        why: 'Dora ocupa a 1ª posição. O bloco Ana-Caio vem depois de Beto, então a ordem é Dora, Beto, Ana, Caio.',
      },
      {
        sentence: 'Um entre A, B e C apagou o registro. A diz "Foi B"; B diz "Foi C"; C diz "Foi B". Só um diz a verdade. O culpado é ___.',
        options: ['C', 'A', 'B', 'nenhum deles'],
        answer: 'C',
        why: 'Se fosse A, nenhuma frase seria verdadeira; se fosse B, duas (A e C). Só com C culpado há exatamente uma verdade, a de B.',
      },
    ],
    outro: 'O interrogatório terminou sem palpites: cada hipótese foi testada, e só uma sobreviveu. Os Montes guardam agora o nome de quem apagou o registro.',
  },

  'cap.mat.02:sequencias': {
    scene: [
      { who: 'Arquivista', text: 'Os registros do cofre dos Montes eram numerados por um código. A névoa apagou alguns números do meio, e precisamos deles para achar as caixas.' },
      { who: 'Aprendiz', text: 'Se o código seguir um padrão, dá para reconstruir o que falta. Mas qual padrão?' },
      { who: 'Bubo', text: 'Diferenças, quocientes, ciclos, letras trocadas por posições. Há um roteiro, e é preciso testá-lo em ordem.' },
      { who: 'Bubo', text: 'Leia sobre sequências e formação de conceitos. As caixas não vão se achar sozinhas.' },
    ],
    truths: [
      {
        statement: 'O próximo termo de 4, 7, 12, 19, 28 é 39.',
        answer: true,
        why: 'As diferenças são 3, 5, 7, 9; a próxima é 11, e 28 + 11 = 39. Pela posição, o termo é n² + 3, e 6² + 3 = 39.',
      },
      {
        statement: 'No alfabeto de 26 letras, o próximo termo de B, D, G, K é O.',
        answer: false,
        why: 'As posições são 2, 4, 7, 11, com saltos +2, +3, +4. O próximo salto é +5, posição 16, letra P.',
      },
      {
        statement: 'Com pastas de 4 cores numa gaveta, é preciso retirar 5 pastas para garantir duas da mesma cor.',
        answer: true,
        why: 'No pior caso sai uma de cada cor (4); a quinta repete uma cor.',
      },
    ],
    blanks: [
      {
        sentence: 'A palavra CONTAS é escrita repetidamente: CONTASCONTAS... A 100ª letra é ___.',
        options: ['T', 'A', 'N', 'S'],
        answer: 'T',
        why: 'O ciclo tem 6 letras; 100 = 6 × 16 + 4, resto 4. A 4ª letra de CONTAS é T.',
      },
      {
        sentence: 'Para numerar as páginas de 1 a 50, usam-se ___ algarismos.',
        options: ['91', '100', '82', '90'],
        answer: '91',
        why: 'De 1 a 9 são 9 algarismos; de 10 a 50 são 41 páginas com 2 algarismos, 82. Total: 9 + 82 = 91.',
      },
    ],
    outro: 'Os códigos do cofre foram reconstruídos e as caixas, encontradas. A névoa recua dos picos mais altos dos Montes.',
  },

  'cap.mat.02:espacial': {
    scene: [
      { who: 'Morador dos Montes', text: 'O sino da torre dos Montes marca o pagamento dos fornecedores. A névoa apagou o calendário, e ninguém sabe em que dia da semana cai o próximo.' },
      { who: 'Aprendiz', text: 'E o vigia diz que o relógio da torre adianta. Talvez os pagamentos estejam saindo na hora errada.' },
      { who: 'Bubo', text: 'Calendário, relógio e bússola obedecem ao resto da divisão. Quem domina isso sabe exatamente quando e para onde a névoa vai.' },
      { who: 'Bubo', text: 'Leia sobre orientação temporal e espacial. Depois subimos à torre para conferir.' },
    ],
    truths: [
      {
        statement: 'Se hoje é quarta-feira, daqui a 15 dias será quinta-feira.',
        answer: true,
        why: '15 = 7 × 2 + 1, resto 1. Quarta + 1 = quinta.',
      },
      {
        statement: 'Às 9 h em ponto, o menor ângulo entre os ponteiros é de 90°.',
        answer: true,
        why: '|30 × 9 − 5,5 × 0| = 270°, que passa de 180°; o menor ângulo é 360° − 270° = 90°.',
      },
      {
        statement: '1,25 hora corresponde a 1 h 25 min.',
        answer: false,
        why: '0,25 × 60 = 15 minutos. Então 1,25 hora é 1 h 15 min.',
      },
    ],
    blanks: [
      {
        sentence: 'Às 2 h 30 min, o menor ângulo entre os ponteiros do relógio é de ___.',
        options: ['105°', '90°', '120°', '75°'],
        answer: '105°',
        why: '|30 × 2 − 5,5 × 30| = |60 − 165| = 105°. Conferência: minutos em 180°, horas em 60° + 15° = 75°, diferença 105°.',
      },
      {
        sentence: 'De frente para o sul, uma pessoa gira 90° no sentido horário e fica de frente para o ___.',
        options: ['oeste', 'leste', 'norte', 'sudoeste'],
        answer: 'oeste',
        why: 'Sul é 180°; o giro horário soma: 180° + 90° = 270°, que é o oeste.',
      },
    ],
    outro: 'O calendário da torre foi refeito e o relógio, acertado. Agora se sabe quando a névoa engrossa: na véspera de cada pagamento. Os Montes dos Números estão livres.',
  },

  // ─── A Carta do Tribunal (Cidadela das Leis) ─────────────────────────────────

  'cap.inst.01:administracao-publica': {
    scene: [
      { who: 'Arquivista', text: 'Na Cidadela, a névoa apagou a lista de aprovados do último concurso. No lugar dela, apareceram nomeações de parentes do Tesoureiro-Mor para cargos efetivos.' },
      { who: 'Aprendiz', text: 'E as placas das obras novas trazem o nome dele em letras enormes. Isso pode?' },
      { who: 'Bubo', text: 'A Carta tem resposta para as duas coisas, e para muitas outras. O art. 37 é o primeiro escudo da Administração contra quem a usa em proveito próprio.' },
      { who: 'Bubo', text: 'Leia os princípios e as regras do art. 37 com atenção à letra da lei. Depois conferimos cada nomeação.' },
    ],
    truths: [
      {
        statement: 'O princípio da eficiência foi incluído no caput do art. 37 pela EC nº 19/1998.',
        answer: true,
        why: 'Os outros quatro princípios do LIMPE já constavam; a eficiência entrou com a EC nº 19/1998.',
      },
      {
        statement: 'Pelo inciso XIX, uma empresa pública é criada diretamente por lei complementar.',
        answer: false,
        why: 'Somente por lei específica se cria autarquia e se autoriza a instituição de empresa pública, sociedade de economia mista e fundação. A lei complementar define as áreas de atuação da fundação.',
      },
      {
        statement: 'A não observância das regras de concurso e de seu prazo de validade implica a nulidade do ato e a punição da autoridade responsável.',
        answer: true,
        why: 'É o que dispõe o § 2º do art. 37 quanto aos incisos II e III.',
      },
    ],
    blanks: [
      {
        sentence: 'Pela CF, o direito de greve do servidor será exercido nos termos e limites definidos em lei ___.',
        options: ['específica', 'complementar', 'orgânica', 'delegada'],
        answer: 'específica',
        why: 'O inciso VII do art. 37 remete a lei específica.',
      },
      {
        sentence: 'No Judiciário estadual, o subteto é o subsídio dos Desembargadores do TJ, limitado a ___ do subsídio dos Ministros do STF.',
        options: ['90,25%', '95%', '80%', '75%'],
        answer: '90,25%',
        why: 'O inciso XI fixa esse limite, que também se aplica a membros do Ministério Público, Procuradores e Defensores Públicos.',
      },
    ],
    outro: 'As nomeações sem concurso foram anuladas, e as placas, retiradas. A Carta volta a brilhar no primeiro salão da Cidadela.',
  },

  'cap.inst.01:servidores': {
    scene: [
      { who: 'Morador da Cidadela', text: 'Um técnico da Torre foi eleito vereador e o chefe mandou que ele se afastasse. Outro servidor teve o cargo extinto e agora não sabe quanto vai receber.' },
      { who: 'Aprendiz', text: 'A névoa apagou o regulamento, e cada um está dando um palpite diferente.' },
      { who: 'Bubo', text: 'Palpite não é norma. Os arts. 38 a 41 dizem o que acontece com o servidor eleito, com o estável e com quem perde o cargo.' },
      { who: 'Bubo', text: 'Estude a seção, e depois respondemos aos dois servidores com a Carta na mão.' },
    ],
    truths: [
      {
        statement: 'O servidor eleito Prefeito fica afastado do cargo, sendo-lhe facultado optar pela remuneração.',
        answer: true,
        why: 'É a regra do art. 38 para o mandato de Prefeito.',
      },
      {
        statement: 'O servidor eleito deputado estadual pode continuar no cargo se houver compatibilidade de horários.',
        answer: false,
        why: 'Para mandato federal, estadual ou distrital, o afastamento é obrigatório. A compatibilidade de horários só importa para o vereador.',
      },
      {
        statement: 'A avaliação periódica de desempenho, na forma de lei complementar, é hipótese de perda do cargo pelo servidor já estável.',
        answer: true,
        why: 'Está no art. 41, § 1º, III. A avaliação especial do § 4º é outra coisa: condição para adquirir a estabilidade.',
      },
    ],
    blanks: [
      {
        sentence: 'Invalidada por sentença judicial a demissão do servidor estável, ele será ___.',
        options: ['reintegrado', 'reconduzido', 'aproveitado', 'readaptado'],
        answer: 'reintegrado',
        why: 'Reintegração é a volta do estável demitido ilegalmente. Recondução é o retorno do eventual ocupante da vaga ao cargo de origem.',
      },
      {
        sentence: 'O subsídio previsto no art. 39, § 4º, é fixado em parcela ___.',
        options: ['única', 'dupla', 'variável', 'mensal acrescida de gratificação'],
        answer: 'única',
        why: 'É vedado o acréscimo de gratificação, adicional, abono, prêmio, verba de representação ou outra espécie remuneratória.',
      },
    ],
    outro: 'O técnico vereador continua no cargo, e o servidor do cargo extinto sabe que receberá proporcionalmente. A Cidadela devolve aos servidores o que a névoa tirou.',
  },

  'cap.inst.01:fiscalizacao': {
    scene: [
      { who: 'Tesoureiro-Mor', text: 'O Tribunal não tem poder sobre os meus contratos. Quem decide sobre eles é a Assembleia, e a Assembleia está ocupada.' },
      { who: 'Aprendiz', text: 'Ele disse isso diante de todos. Será verdade? E se a Assembleia nunca agir?' },
      { who: 'Bubo', text: 'Parte do que ele diz está na Carta. A outra parte, a névoa apagou da memória dele, ou ele prefere esquecer.' },
      { who: 'Bubo', text: 'Os arts. 70 a 75 são o coração do controle externo. Leia cada verbo com atenção: apreciar, julgar, sustar. Depois respondemos ao Tesoureiro.' },
    ],
    truths: [
      {
        statement: 'Uma entidade privada que recebe recursos públicos por convênio deve prestar contas.',
        answer: true,
        why: 'Pelo parágrafo único do art. 70, presta contas qualquer pessoa física ou jurídica, pública ou privada, que utilize ou administre dinheiros, bens e valores públicos.',
      },
      {
        statement: 'A legalidade das nomeações para cargo em comissão é apreciada pelo Tribunal para fins de registro.',
        answer: false,
        why: 'O inciso III do art. 71 excetua expressamente as nomeações para cargo em comissão.',
      },
      {
        statement: 'O Tribunal encaminha ao Legislativo relatório de suas atividades trimestral e anualmente.',
        answer: true,
        why: 'É o que prevê o art. 71, § 4º.',
      },
    ],
    blanks: [
      {
        sentence: 'As decisões do Tribunal que resultem em imputação de débito ou multa têm eficácia de ___.',
        options: ['título executivo', 'sentença penal', 'lei ordinária', 'parecer prévio'],
        answer: 'título executivo',
        why: 'É o art. 71, § 3º. Segundo o STF, a execução cabe ao ente público beneficiário da condenação.',
      },
      {
        sentence: 'Os responsáveis pelo controle interno que souberem de irregularidade e não derem ciência ao Tribunal respondem de forma ___.',
        options: ['solidária', 'subsidiária', 'exclusiva', 'nenhuma'],
        answer: 'solidária',
        why: 'O art. 74, § 1º, prevê responsabilidade solidária.',
      },
    ],
    outro: 'O Tesoureiro-Mor estava meio certo: quem susta o contrato é o Legislativo, mas, se ninguém agir em noventa dias, o Tribunal decide. A Cidadela já sabe quem fiscaliza quem.',
  },

  // Seções sobre normas de Goiás: as atividades usam só os pontos que o texto marca como confirmados.

  'cap.inst.02:tce-go': {
    scene: [
      { who: 'Arquivista', text: 'A névoa entrou na sala do Plenário e apagou a placa que dizia como o Tribunal se organiza. Agora há quem pense que o parecer sobre as contas do Governador é a palavra final.' },
      { who: 'Aprendiz', text: 'E um gestor pediu para trancar as contas dele, dizendo que os documentos sumiram na névoa. Isso existe?' },
      { who: 'Bubo', text: 'Existe algo parecido, mas com condições. A Carta estadual, a Lei Orgânica e o Regimento dizem quem aprecia, quem julga e como cada conta termina.' },
      { who: 'Bubo', text: 'Leia a seção, e repare na nota de fonte: estude o texto compilado antes da prova. Depois examinamos o pedido do gestor.' },
    ],
    truths: [
      {
        statement: 'Pela Constituição estadual, o TCE-GO tem sede na Capital e jurisdição em todo o território estadual.',
        answer: true,
        why: 'É o que o art. 28 dispõe, junto com a composição de sete conselheiros e quadro próprio de pessoal.',
      },
      {
        statement: 'Contas julgadas regulares dão ao responsável quitação com ressalvas.',
        answer: false,
        why: 'Contas regulares dão quitação plena. A ressalva aparece quando há impropriedade ou falta formal sem dano ao erário.',
      },
      {
        statement: 'A multa do art. 112 da Lei Orgânica só pode ser aplicada quando o responsável é julgado em débito.',
        answer: false,
        why: 'A multa ligada ao débito é a do art. 111, de até duas vezes o dano. A do art. 112 tem teto em valor fixo e é aplicável mesmo sem débito.',
      },
    ],
    blanks: [
      {
        sentence: 'Além do Plenário, o TCE-GO funciona com duas Câmaras, cada uma com ___ conselheiros, excluído o Presidente.',
        options: ['três', 'quatro', 'dois', 'sete'],
        answer: 'três',
        why: 'É a estrutura descrita pelo Regimento e pelas resoluções de estrutura.',
      },
      {
        sentence: 'O parecer prévio sobre as contas anuais do Governador é elaborado em ___ dias a contar do recebimento.',
        options: ['sessenta', 'trinta', 'noventa', 'cento e vinte'],
        answer: 'sessenta',
        why: 'Art. 26, I, da Constituição estadual, repetido no art. 1º da Lei Orgânica. O parecer é opinativo: quem julga é a Assembleia.',
      },
    ],
    outro: 'O gestor terá de provar caso fortuito ou força maior, e o parecer voltou a ser o que é: uma opinião técnica. A placa do Plenário reaparece na Cidadela.',
  },

  'cap.inst.02:pessoal': {
    scene: [
      { who: 'Morador da Cidadela', text: 'Um servidor aposentado voltou a trabalhar na Torre, outro foi punido sem saber por quê, e a névoa apagou a página do estatuto que explicaria tudo.' },
      { who: 'Aprendiz', text: 'E eu? Quando for nomeado, em que carreira vou estar? Quanto tempo de estágio probatório?' },
      { who: 'Bubo', text: 'Duas leis respondem: o plano de carreiras do Tribunal e o regime jurídico dos servidores de Goiás. Conhecê-las é conhecer a casa onde você vai morar.' },
      { who: 'Bubo', text: 'Leia a seção, lembrando que os textos oficiais devem ser conferidos no compilado. Depois respondemos aos dois servidores.' },
    ],
    truths: [
      {
        statement: 'A Lei nº 20.756/2020 lista sete formas de provimento, entre elas a promoção.',
        answer: true,
        why: 'O art. 9º enumera nomeação, readaptação, reversão, reintegração, recondução, aproveitamento e promoção.',
      },
      {
        statement: 'O servidor estável que não é aprovado em novo estágio probatório é exonerado.',
        answer: false,
        why: 'Pelo estatuto goiano, o não aprovado é exonerado ou, se estável, reconduzido ao cargo anteriormente ocupado.',
      },
      {
        statement: 'No estatuto goiano, a advertência pode ser aplicada verbalmente.',
        answer: false,
        why: 'A advertência, para infrações leves, é aplicada por escrito.',
      },
    ],
    blanks: [
      {
        sentence: 'O retorno do servidor aposentado à atividade chama-se ___.',
        options: ['reversão', 'readaptação', 'recondução', 'reintegração'],
        answer: 'reversão',
        why: 'Readaptação atende a limitação de capacidade; recondução devolve o estável ao cargo anterior; reintegração devolve o estável demitido ilegalmente.',
      },
      {
        sentence: 'Ao ocupante de cargo em comissão sem vínculo efetivo aplica-se a penalidade de ___ de cargo em comissão.',
        options: ['destituição', 'cassação', 'suspensão', 'reversão'],
        answer: 'destituição',
        why: 'A destituição de cargo em comissão é uma das sete penalidades do art. 193 da Lei nº 20.756/2020.',
      },
    ],
    outro: 'O aposentado voltou por reversão, e o servidor punido agora sabe qual penalidade recebeu e por quê. A Cidadela recupera a página do estatuto.',
  },

  'cap.inst.02:etica-resolucoes': {
    scene: [
      { who: 'Bubo', text: 'Na biblioteca da Cidadela, a névoa embaralhou as etiquetas das resoluções do Tribunal. A de estrutura está com o número de outra, de outro ano.' },
      { who: 'Aprendiz', text: 'Números iguais em anos diferentes. Parece feito de propósito para confundir.' },
      { who: 'Arquivista', text: 'E o Código de Ética mudou há pouco. Já há quem jure que ele só vale para os servidores efetivos.' },
      { who: 'Bubo', text: 'Esta seção é um mapa: o que cada norma trata e o que se confirmou. Leia, e antes da prova baixe cada texto inteiro. Hoje, vamos reetiquetar a biblioteca.' },
    ],
    truths: [
      {
        statement: 'A RA nº 14/2025, sobre estrutura organizacional e competências, revogou a RA nº 19/2022.',
        answer: true,
        why: 'A RA nº 19/2022 era a antiga norma de estrutura. Não confunda com a RA nº 19/2024, que trata da Política de Comunicação.',
      },
      {
        statement: 'O Código de Ética dos Servidores do TCE-GO foi instituído originalmente pela Resolução nº 6/2026.',
        answer: false,
        why: 'Foi instituído pela Resolução Administrativa nº 1/2014. A Resolução nº 6/2026 o atualizou.',
      },
      {
        statement: 'A RA nº 17/2024 trata da Política de Segurança da Informação do Tribunal.',
        answer: true,
        why: 'É o assunto indicado pelo edital; a seção cita disponibilidade, integridade, confidencialidade e autenticidade da informação.',
      },
    ],
    blanks: [
      {
        sentence: 'A RA nº 23/2024 criou o Serviço de ___, ligado à Diretoria de Tecnologia da Informação.',
        options: ['Inteligência Artificial', 'Segurança da Informação', 'Proteção de Dados', 'Comunicação'],
        answer: 'Inteligência Artificial',
        why: 'O serviço acompanha a RA nº 24/2024, que trata do uso de ferramentas de Inteligência Artificial no Tribunal.',
      },
      {
        sentence: 'A Política de Gestão de Pessoas, instituída pela RA nº 5/2024, reúne ___ diretrizes.',
        options: ['25', '19', '14', '7'],
        answer: '25',
        why: 'As 25 diretrizes tratam de planejamento, seleção, alocação, avaliação e desenvolvimento de pessoas.',
      },
    ],
    outro: 'Cada resolução voltou à sua prateleira, com número e ano certos. A Cidadela das Leis está livre da névoa, e a Carta do Tribunal brilha inteira.',
  },
};
