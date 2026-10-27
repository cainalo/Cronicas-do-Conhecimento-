import type { SectionExtras } from '@/content/types';

// questões complementares por seção dos grimórios de Conhecimentos Gerais e de Inglês:
// grim.ingles, grim.portugues, grim.matematica e grim.institucional.
// Todo o conteúdo é autoral e usa apenas fatos apresentados no texto de cada seção.

export const extrasGerais: Record<string, SectionExtras> = {
  // ─── Estratégias de leitura em inglês (Leitura técnica em inglês) ───────────────────────

  'cap.ingles.01:estrategias': {
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
  },

  'cap.ingles.01:coesao': {
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
  },

  'cap.ingles.01:gramatica': {
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
  },

  'cap.ingles.02:api': {
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
  },

  'cap.ingles.02:generos': {
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
  },

  'cap.ingles.02:seguranca-nuvem': {
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
  },

  // ─── O Livro do Bem Escrever (Vale das Letras) ───────────────────────────────

  'cap.port.01:interpretacao': {
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
  },

  'cap.port.01:ortografia': {
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
  },

  'cap.port.01:pontuacao': {
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
  },

  'cap.port.01:morfologia': {
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
  },

  'cap.port.02:concordancia': {
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
  },

  'cap.port.02:regencia': {
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
  },

  'cap.port.02:periodo': {
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
  },

  'cap.port.02:redacao-oficial': {
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
  },

  // ─── O Ábaco do Tesoureiro (Montes dos Números) ──────────────────────────────

  'cap.mat.01:inteiros': {
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
  },

  'cap.mat.01:divisores': {
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
  },

  'cap.mat.01:razoes': {
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
  },

  'cap.mat.01:porcentagem': {
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
  },

  'cap.mat.02:associacao': {
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
  },

  'cap.mat.02:sequencias': {
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
  },

  'cap.mat.02:espacial': {
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
  },

  // ─── A Carta do Tribunal (Cidadela das Leis) ─────────────────────────────────

  'cap.inst.01:administracao-publica': {
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
  },

  'cap.inst.01:servidores': {
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
  },

  'cap.inst.01:fiscalizacao': {
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
  },

  // Seções sobre normas de Goiás: as atividades usam só os pontos que o texto marca como confirmados.

  'cap.inst.02:tce-go': {
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
  },

  'cap.inst.02:pessoal': {
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
  },

  'cap.inst.02:etica-resolucoes': {
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
  },
};
