import type { SimpleSection } from '@/content/types';

/**
 * Porta de entrada "do zero" das seções dos grimórios de Inglês, Português,
 * Matemática e Conhecimentos Institucionais. O texto completo da seção
 * continua disponível como aprofundamento.
 */
export const simpleGerais: Record<string, SimpleSection> = {
  // ------------------------------------------------------------------
  // Inglês
  // ------------------------------------------------------------------
  'cap.ingles.01:estrategias': {
    pages: [
      {
        title: 'Para que serve esta prova?',
        text: 'No trabalho de TI, muitos manuais e sistemas vêm escritos em inglês. A prova não pede que você escreva em inglês. Ela traz um texto em inglês e faz perguntas em português sobre ele. Você só precisa entender o que o texto diz.',
      },
      {
        title: 'Leia a pergunta primeiro',
        text: 'Antes do texto, leia a pergunta. Ela mostra o que você procura. Se pede a ideia geral, você passa os olhos pelo texto todo. Se pede um dado, como um número ou uma data, você caça só esse dado. Assim você economiza tempo.',
      },
      {
        title: 'Skimming e scanning',
        text: '**Skimming** (passar os olhos) é ler rápido o título e o começo de cada parágrafo para pegar a ideia geral. **Scanning** (varrer) é procurar um dado certo, como quem procura um nome numa lista de chamada. Exemplo: "o limite é de quantas requisições?" pede scanning.',
      },
      {
        title: 'Palavras parecidas que enganam',
        text: 'Muitas palavras em inglês parecem português e têm o mesmo sentido, como *system* (sistema). Mas algumas enganam. São os **falsos cognatos**, palavras que parecem uma coisa e significam outra. *Actually* não é "atualmente": é "na verdade". *Library* não é "livraria": é "biblioteca". *Data* não é "data": é "dados".',
      },
      {
        title: 'Um engano que custa caro',
        text: '*Eventually* parece "eventualmente", mas significa "por fim, com o tempo". Veja: *Eventually, all old endpoints will be removed* quer dizer "Por fim, todos os endereços antigos serão removidos". É uma certeza. Se você traduzir como "eventualmente", vira uma chance de vez em quando, e você erra.',
      },
      {
        title: 'O texto manda',
        text: 'Se aparecer uma palavra que você não conhece, não pare. Olhe as palavras em volta para adivinhar o sentido. Mas cuidado: a resposta certa precisa estar no texto. Uma alternativa pode ser verdade na vida real e mesmo assim estar errada, porque o texto não diz aquilo.',
      },
      {
        title: 'Resumindo',
        text: 'Leia a pergunta antes do texto. Use skimming para a ideia geral e scanning para um dado. Desconfie dos falsos cognatos, como *actually* (na verdade) e *eventually* (por fim).',
      },
    ],
    words: [
      { term: 'Skimming', meaning: 'Leitura rápida, só para pegar a ideia geral do texto.' },
      { term: 'Scanning', meaning: 'Procurar com os olhos um dado certo, sem ler tudo.' },
      { term: 'Falso cognato', meaning: 'Palavra inglesa parecida com o português, mas com outro sentido.' },
      { term: 'Actually', meaning: 'Na verdade. Atualmente, em inglês, é currently.' },
      { term: 'Eventually', meaning: 'Por fim, com o tempo. Não é eventualmente.' },
      { term: 'Library', meaning: 'Biblioteca, inclusive biblioteca de código. Livraria é bookstore.' },
    ],
    checks: [
      { statement: 'Scanning é procurar um dado certo no texto, sem ler tudo.', answer: true, why: 'É como procurar um nome numa lista: você vai direto ao dado.' },
      { statement: 'Actually significa "atualmente".', answer: false, why: 'Actually significa "na verdade"; é um falso cognato.' },
      { statement: 'A resposta certa precisa estar apoiada no texto.', answer: true, why: 'Se o texto não diz aquilo, a alternativa está errada na prova.' },
    ],
  },
  'cap.ingles.01:coesao': {
    pages: [
      {
        title: 'As palavrinhas que mudam tudo',
        text: 'Num texto, pequenas palavras ligam uma ideia à outra. Elas dizem se a próxima ideia soma, contraria ou conclui. Errar uma delas pode inverter o sentido do parágrafo inteiro. Por isso a prova pergunta muito sobre elas.',
      },
      {
        title: 'O que é um conectivo?',
        text: 'Um **conectivo** é uma palavra que liga duas ideias, como "mas" ou "portanto". Em inglês, *however* (contudo) mostra contraste. *Moreover* (além disso) soma uma ideia. *Therefore* (portanto) traz uma conclusão. *Because* (porque) mostra a causa.',
      },
      {
        title: 'Condições: unless e as long as',
        text: '*Unless* quer dizer "a menos que", o mesmo que "se não". Exemplo: *The job fails unless the file exists* é "A tarefa falha a menos que o arquivo exista". *As long as* não fala de tamanho: quer dizer "desde que". *Otherwise* quer dizer "caso contrário".',
      },
      {
        title: 'Embora e ao passo que',
        text: '*Although* (embora) vem antes de uma frase completa: *although the test passed* (embora o teste tenha passado). *Despite* (apesar de) vem antes de um nome: *despite the failure* (apesar da falha). *Whereas* (ao passo que) compara duas coisas diferentes.',
      },
      {
        title: 'A quem o pronome se refere?',
        text: 'Um **pronome** é uma palavra que ocupa o lugar de outra já dita, como "ele". *It* (ele, ela, para coisas) retoma algo no singular. *They* (eles) retoma algo no plural. Em *The server restarted because its disk was full*, *its* (seu) é "do servidor": o disco do servidor estava cheio.',
      },
      {
        title: 'O truque da troca',
        text: 'Para achar a quem o pronome se refere, troque o pronome por cada candidato e leia de novo. O certo combina no número, singular ou plural, e faz sentido. *The latter* quer dizer "o último de dois". Em *Python and Java*, *the latter* é Java.',
      },
      {
        title: 'Resumindo',
        text: 'Conectivos mostram se a ideia soma, contraria, conclui ou impõe condição. *Unless* é "a menos que". Para achar o sentido de um pronome, troque-o pelo candidato e veja se faz sentido.',
      },
    ],
    words: [
      { term: 'Conectivo', meaning: 'Palavra que liga duas ideias, como "mas" ou "portanto".' },
      { term: 'However', meaning: 'Contudo, no entanto. Mostra contraste.' },
      { term: 'Therefore', meaning: 'Portanto. Traz uma conclusão.' },
      { term: 'Unless', meaning: 'A menos que. Quer dizer o mesmo que "se não".' },
      { term: 'As long as', meaning: 'Desde que. É uma condição, não fala de tamanho.' },
      { term: 'Pronome', meaning: 'Palavra que ocupa o lugar de outra já dita, como "ele".' },
    ],
    checks: [
      { statement: 'Unless tem o mesmo sentido de "se".', answer: false, why: 'Unless quer dizer "a menos que", ou seja, "se não".' },
      { statement: 'However mostra um contraste, como "contudo".', answer: true, why: 'However liga duas ideias que se opõem.' },
      { statement: 'Em "Python and Java", the latter se refere a Java.', answer: true, why: 'The latter é o último de dois, e Java vem por último.' },
    ],
  },
  'cap.ingles.01:gramatica': {
    pages: [
      {
        title: 'Por que olhar a gramática?',
        text: 'Manuais repetem poucas formas de frase. Se você reconhece essas formas, entende rápido três coisas: quem faz o quê, o que é obrigatório e o que é só conselho. Isso cai muito em prova de leitura técnica.',
      },
      {
        title: 'Frases que dão ordens',
        text: 'O **imperativo** é a forma do verbo que dá uma ordem, sem sujeito. Exemplo: *Open the file* (Abra o arquivo). Para proibir, usa-se *do not* ou *don\'t* (não): *Do not share your password* (Não compartilhe sua senha). *Never* (nunca) reforça a proibição.',
      },
      {
        title: 'Quem fez a ação?',
        text: 'Na **voz passiva**, a frase destaca o que sofreu a ação, e não quem agiu. Ela usa o verbo *be* (ser) mais o verbo principal: *The bug was fixed* (O defeito foi corrigido). Quem agiu vem depois de *by* (por): *approved by the auditor* é "aprovado pelo auditor".',
      },
      {
        title: 'Obrigado, proibido ou dispensado?',
        text: 'Os **modais** são verbos que mostram a força de uma regra. *Must* é "deve", uma obrigação. *Must not* é "não pode", uma proibição. *Don\'t have to* é "não precisa", ninguém é obrigado. *Should* é "deveria", um conselho. Confundir *must not* com *don\'t have to* inverte a regra.',
      },
      {
        title: 'Possibilidade: may e might',
        text: '*May* pode ser permissão ou possibilidade: *This may take several minutes* (Isto pode levar vários minutos). *Might* também é possibilidade, mas mais fraca. *Will* indica futuro ou certeza: *The token will expire* (O token vai expirar). Um **token** é um passe digital de acesso.',
      },
      {
        title: 'Pedacinhos que dão sentido',
        text: 'Um **afixo** é um pedaço colado no começo ou no fim da palavra. *Un-* nega: *unavailable* (indisponível). *Re-* repete: *retry* (tentar de novo). *-able* quer dizer "que pode": *scalable* (que pode crescer). *-less* quer dizer "sem": *passwordless* (sem senha).',
      },
      {
        title: 'Resumindo',
        text: 'O imperativo dá ordens. Na voz passiva, quem agiu vem depois de *by*. *Must not* proíbe, *don\'t have to* só dispensa, e *should* aconselha.',
      },
    ],
    words: [
      { term: 'Imperativo', meaning: 'Forma do verbo que dá ordem, como "Abra o arquivo".' },
      { term: 'Voz passiva', meaning: 'Frase que destaca o que sofreu a ação, e não quem agiu.' },
      { term: 'Modal', meaning: 'Verbo que mostra a força da regra: obrigação, conselho ou possibilidade.' },
      { term: 'Must', meaning: 'Deve. Indica obrigação forte.' },
      { term: 'Should', meaning: 'Deveria. Indica conselho, mais fraco que must.' },
      { term: 'Afixo', meaning: 'Pedaço colado no começo ou no fim de uma palavra.' },
      { term: '-less', meaning: 'Pedaço do fim da palavra que quer dizer "sem".' },
    ],
    checks: [
      { statement: 'Don\'t have to quer dizer que algo é proibido.', answer: false, why: 'Don\'t have to quer dizer "não precisa"; proibir é must not.' },
      { statement: 'Em "approved by the auditor", foi o auditor quem aprovou.', answer: true, why: 'Na voz passiva, quem agiu vem depois de by.' },
      { statement: 'Should indica uma obrigação absoluta.', answer: false, why: 'Should é um conselho; obrigação forte é must.' },
    ],
  },
  'cap.ingles.02:api': {
    pages: [
      {
        title: 'O que é uma API?',
        text: 'Uma **API** é a porta pela qual um programa conversa com outro. Pense num balcão de atendimento: você faz um pedido e recebe uma resposta. A **documentação** da API é o manual desse balcão, quase sempre em inglês. O edital cita esse tipo de texto.',
      },
      {
        title: 'Pedido e resposta',
        text: 'Cada pedido é uma *request* (requisição). O que volta é a *response* (resposta). O endereço que atende um pedido é o *endpoint* (ponto de acesso). O conteúdo levado no pedido ou na resposta é o *payload* (carga). *Required* é obrigatório e *optional* é opcional.',
      },
      {
        title: 'Detalhes no endereço',
        text: 'Um *query parameter* (parâmetro de consulta) é uma informação extra no fim do endereço, depois do sinal de interrogação. Exemplo: `?page=2` pede a página 2. Funciona como escrever "página 2" num bilhete preso ao pedido.',
      },
      {
        title: 'Os números da resposta',
        text: 'Toda resposta traz um **código de status**, um número que diz como foi. Começa com 2: deu certo. Começa com 4: o erro foi de quem pediu. Começa com 5: o erro foi do servidor. 404 é "não encontrado". 401 é "falta se identificar". 403 é "identificado, mas sem permissão". 429 é "pedidos demais".',
      },
      {
        title: 'Obsoleto não é removido',
        text: '*Deprecated* quer dizer obsoleto: ainda funciona, mas vai sumir no futuro. É como uma loja que avisa "este produto sai de linha". *Breaking change* (mudança que quebra) é uma mudança que faz sistemas antigos pararem de funcionar. *Rate limit* (limite de uso) é o máximo de pedidos por período.',
      },
      {
        title: 'O número da versão',
        text: 'Muitas APIs usam versões no formato 2.4.1. O primeiro número sobe quando há mudança que quebra. O do meio sobe com novidade que não quebra nada. O último sobe com correção de defeito. Passar de 2.4.1 para 3.0.0 é sinal de risco.',
      },
      {
        title: 'Resumindo',
        text: 'A API é um balcão entre programas, com pedido e resposta. Códigos 4xx são erro de quem pediu e 5xx são erro do servidor. Deprecated ainda funciona, mas vai sair.',
      },
    ],
    words: [
      { term: 'API', meaning: 'Porta pela qual um programa conversa com outro.' },
      { term: 'Endpoint', meaning: 'Endereço da API que atende um tipo de pedido.' },
      { term: 'Request / response', meaning: 'Requisição (pedido) e resposta.' },
      { term: 'Payload', meaning: 'Conteúdo levado no pedido ou na resposta.' },
      { term: 'Status code', meaning: 'Código de status: número que diz como foi a resposta.' },
      { term: 'Deprecated', meaning: 'Obsoleto: ainda funciona, mas será removido no futuro.' },
      { term: 'Breaking change', meaning: 'Mudança que faz sistemas antigos pararem de funcionar.' },
    ],
    checks: [
      { statement: 'Um recurso deprecated já foi apagado da API.', answer: false, why: 'Deprecated ainda funciona; só há aviso de que vai sair.' },
      { statement: 'O código 404 quer dizer "não encontrado".', answer: true, why: 'A página explica que 404 é "não encontrado".' },
      { statement: 'Códigos que começam com 5 indicam erro do servidor.', answer: true, why: 'A família 5xx é de erro do servidor.' },
    ],
  },
  'cap.ingles.02:generos': {
    pages: [
      {
        title: 'Cada texto tem seu jeito',
        text: 'Textos técnicos seguem modelos. Saber onde cada informação costuma ficar ajuda a achar rápido o que a pergunta pede. Nesta seção você vê o README, as notas de versão, as mensagens de erro, os artigos e as abreviações.',
      },
      {
        title: 'O README',
        text: 'O **README** (leia-me) é o arquivo de apresentação de um projeto. Ele tem partes como *Installation* (instalação), *Usage* (uso) e *Configuration* (configuração). Exemplo: *Node.js 20 or later* quer dizer "Node.js 20 ou mais novo". Node.js é um programa.',
      },
      {
        title: 'O que mudou na versão?',
        text: 'As **notas de versão** contam o que mudou. Usam rótulos como *Added* (adicionado), *Fixed* (corrigido) e *Removed* (removido). *Known issues* (problemas conhecidos) lista falhas que ainda existem. *Not yet supported* quer dizer "ainda não aceito".',
      },
      {
        title: 'Mensagens de erro',
        text: 'Erros aparecem em frases curtas. *Permission denied* é "permissão negada". *File not found* é "arquivo não encontrado". *Connection timed out* é "tempo de conexão esgotado". *Access token expired* é "o passe de acesso expirou".',
      },
      {
        title: 'Artigos falam com cautela',
        text: 'Artigos científicos começam com o *abstract* (resumo). Eles usam palavras de cautela, como *suggest* (sugerir) e *may* (pode). Se o texto diz *the results suggest*, ele não diz que algo foi provado. Uma alternativa que diz "comprovou" exagera e está errada.',
      },
      {
        title: 'e.g. ou i.e.?',
        text: '*e.g.* quer dizer "por exemplo": *a browser, e.g. Firefox* (um navegador, por exemplo o Firefox). *i.e.* quer dizer "isto é": explica exatamente o que foi dito. *TBD* é "a definir". *EOL* é "fim da vida": o produto não tem mais suporte.',
      },
      {
        title: 'Resumindo',
        text: 'README apresenta o projeto e notas de versão contam o que mudou. Known issues são falhas que ainda existem. e.g. é "por exemplo" e i.e. é "isto é".',
      },
    ],
    words: [
      { term: 'README', meaning: 'Leia-me: arquivo que apresenta um projeto.' },
      { term: 'Release notes', meaning: 'Notas de versão: contam o que mudou.' },
      { term: 'Known issues', meaning: 'Problemas conhecidos que ainda não foram corrigidos.' },
      { term: 'Abstract', meaning: 'Resumo que abre um artigo científico.' },
      { term: 'e.g.', meaning: 'Por exemplo.' },
      { term: 'i.e.', meaning: 'Isto é, ou seja.' },
      { term: 'TBD', meaning: 'A definir.' },
    ],
    checks: [
      { statement: 'Known issues lista problemas que ainda existem.', answer: true, why: 'São falhas conhecidas que ainda não foram corrigidas.' },
      { statement: 'i.e. quer dizer "por exemplo".', answer: false, why: 'Por exemplo é e.g.; i.e. quer dizer "isto é".' },
      { statement: 'Se um artigo diz que os resultados suggest algo, ele provou esse algo.', answer: false, why: 'Suggest é "sugerir", uma palavra de cautela, não de prova.' },
    ],
  },
  'cap.ingles.02:seguranca-nuvem': {
    pages: [
      {
        title: 'Segurança e nuvem em inglês',
        text: 'Um Tribunal de Contas guarda dados importantes e precisa manter seus sistemas no ar. Por isso, textos sobre segurança e sobre nuvem são comuns. Nesta seção você aprende as palavras em inglês mais usadas nesses temas.',
      },
      {
        title: 'Ameaça ou fraqueza?',
        text: '*Threat* é ameaça: algo que pode causar dano, como um ladrão. *Vulnerability* é vulnerabilidade: uma fraqueza, como uma janela sem tranca. *Breach* é violação, quando alguém de fato entra ou vaza dados. *Patch* é a correção do programa, como pôr a tranca na janela.',
      },
      {
        title: 'Remendo provisório',
        text: '*Workaround* é uma solução de contorno: um jeito provisório de evitar o problema enquanto a correção não chega. *So far* quer dizer "até agora". Assim, *no breach has been detected so far* é "nenhuma violação foi detectada até agora". Não promete nada sobre o futuro.',
      },
      {
        title: 'O que é a nuvem?',
        text: 'A **nuvem** é usar computadores de uma empresa pela internet, em vez de ter os seus. A empresa é o *cloud provider* (provedor de nuvem). O contrário é *on-premises* (no próprio local): os computadores ficam dentro da própria organização, na sala dela.',
      },
      {
        title: 'Crescer e ter reserva',
        text: '*Scale up* é deixar uma máquina mais forte. *Scale out* é acrescentar mais máquinas, como abrir mais caixas numa fila de banco. *Failover* é a troca automática para uma reserva quando a principal falha. *Downtime* é o tempo em que o sistema fica fora do ar.',
      },
      {
        title: 'Reserva não é cópia',
        text: 'Ter duas cópias do sistema rodando protege contra queda, mas não contra apagar algo sem querer. Para recuperar dados apagados, é preciso *backup* (cópia de segurança). Exemplo: se alguém apaga uma planilha, a reserva também a perde. O backup a traz de volta.',
      },
      {
        title: 'Resumindo',
        text: 'Threat é ameaça, vulnerability é fraqueza e patch é correção. Workaround é só um remendo provisório. On-premises é dentro da própria organização, e scale out é acrescentar máquinas.',
      },
    ],
    words: [
      { term: 'Threat', meaning: 'Ameaça: algo que pode causar dano.' },
      { term: 'Vulnerability', meaning: 'Vulnerabilidade: uma fraqueza que pode ser explorada.' },
      { term: 'Patch', meaning: 'Correção aplicada a um programa.' },
      { term: 'Workaround', meaning: 'Solução de contorno, provisória, até chegar a correção.' },
      { term: 'On-premises', meaning: 'Computadores dentro da própria organização, fora da nuvem.' },
      { term: 'Failover', meaning: 'Troca automática para uma reserva quando a principal falha.' },
      { term: 'Backup', meaning: 'Cópia de segurança para recuperar dados.' },
    ],
    checks: [
      { statement: 'Workaround é a correção definitiva de um defeito.', answer: false, why: 'Workaround é um remendo provisório; a correção é o patch.' },
      { statement: 'Scale out é acrescentar mais máquinas.', answer: true, why: 'É como abrir mais caixas numa fila de banco.' },
      { statement: 'On-premises quer dizer computadores dentro da própria organização.', answer: true, why: 'É o contrário de usar a nuvem de um provedor.' },
    ],
  },
  // ------------------------------------------------------------------
  // Português
  // ------------------------------------------------------------------
  'cap.port.01:interpretacao': {
    pages: [
      {
        title: 'Por que ler bem rende pontos?',
        text: 'A prova de português quase sempre começa com um texto e perguntas sobre ele. Até as questões de gramática usam frases desse texto. No Tribunal, você também vai ler relatórios e leis todo dia. Ler com atenção é a habilidade que mais rende pontos.',
      },
      {
        title: 'Dito ou sugerido?',
        text: '**Compreender** é achar o que o texto diz com todas as letras. **Interpretar** é tirar uma conclusão a partir de pistas do texto. Em ambos, a resposta precisa estar apoiada no texto. Desconfie de alternativas com "sempre", "todos" ou "nunca": elas costumam exagerar.',
      },
      {
        title: 'O que a frase já garante',
        text: 'Um **pressuposto** é uma informação que a própria frase garante. Exemplo: "O Tribunal voltou a apontar falhas". A frase garante que ele já tinha apontado antes. Já o **subentendido** depende da situação e da intenção de quem fala.',
      },
      {
        title: 'Sentido de dicionário ou figurado?',
        text: '**Denotação** é o sentido literal, de dicionário: "O auditor abriu a porta". **Conotação** é o sentido figurado: "A transparência é a porta do controle". Relatórios e documentos oficiais preferem a denotação, porque o sentido figurado pode ser lido de mais de um jeito.',
      },
      {
        title: 'Falas no texto',
        text: 'No **discurso direto**, a fala aparece igual, entre aspas: Ele disse: "Vou pedir o processo". No **discurso indireto**, o narrador conta a fala com as palavras dele: Ele disse que ia pedir o processo. Repare que "vou" virou "ia".',
      },
      {
        title: 'Figuras de linguagem',
        text: 'São jeitos criativos de dizer algo. **Metáfora** compara sem usar "como": "o orçamento é uma colcha curta". **Hipérbole** é exagero: "pedi mil vezes". **Ironia** diz o contrário do que pensa. **Metonímia** troca um nome por outro próximo: "o Planalto vetou" quer dizer a Presidência.',
      },
      {
        title: 'Resumindo',
        text: 'A resposta precisa estar apoiada no texto. Denotação é o sentido literal, e conotação é o figurado. Metáfora compara sem "como", e hipérbole exagera.',
      },
    ],
    words: [
      { term: 'Interpretar', meaning: 'Tirar uma conclusão a partir de pistas do texto.' },
      { term: 'Pressuposto', meaning: 'Informação que a própria frase já garante.' },
      { term: 'Denotação', meaning: 'Sentido literal, de dicionário.' },
      { term: 'Conotação', meaning: 'Sentido figurado, que depende do contexto.' },
      { term: 'Metáfora', meaning: 'Comparação feita sem usar a palavra "como".' },
      { term: 'Hipérbole', meaning: 'Exagero de propósito, como "pedi mil vezes".' },
      { term: 'Metonímia', meaning: 'Troca de um nome por outro próximo, como "Planalto" por Presidência.' },
    ],
    checks: [
      { statement: 'Alternativas com "sempre" ou "nunca" costumam exagerar o que o texto diz.', answer: true, why: 'Essas palavras muitas vezes vão além do que o texto afirma.' },
      { statement: '"Pedi mil vezes" é um exemplo de hipérbole.', answer: true, why: 'É um exagero de propósito.' },
      { statement: 'Documentos oficiais preferem o sentido figurado.', answer: false, why: 'Eles preferem o sentido literal, que tem uma leitura só.' },
    ],
  },
  'cap.port.01:ortografia': {
    pages: [
      {
        title: 'Escrever certo conta ponto',
        text: 'Um erro de acento ou de crase pode mudar o sentido ou passar descuido num documento oficial. O edital manda seguir as regras do **Acordo Ortográfico**, um acordo entre países de língua portuguesa para escrever do mesmo jeito. Ele vale para a redação e para a prova objetiva.',
      },
      {
        title: 'Onde fica a sílaba forte?',
        text: 'A **sílaba tônica** é a mais forte da palavra. Se ela é a antepenúltima, a palavra é **proparoxítona**, e todas levam acento: pú-bli-co, crédito, análise. Se é a última, a palavra é **oxítona**: ganha acento se termina em a, e, o, em, ens. Exemplos: está, você, após, também.',
      },
      {
        title: 'O que o Acordo mudou',
        text: 'Algumas palavras perderam o acento. "Idéia" virou ideia e "heróico" virou heroico. Mas "herói" e "papéis" continuam com acento, porque a sílaba forte é a última. O **trema**, os dois pontinhos sobre o u, sumiu: "freqüente" virou frequente. "Vôo" virou voo.',
      },
      {
        title: 'Acentos que ficaram',
        text: 'Alguns acentos servem para diferenciar palavras e continuam. "Pôr" é verbo e "por" é preposição. "Pôde" é passado e "pode" é presente. "Eles têm" e "eles vêm" levam chapeuzinho no plural. "Ele tem" e "ele vem", no singular, não levam.',
      },
      {
        title: 'O que é crase?',
        text: '**Crase** é a junção de duas letras "a": a preposição "a" e o artigo "a". Ela é marcada com o acento grave: à. Truque: troque a palavra feminina por uma masculina. Se aparecer "ao", há crase. Exemplo: "Fui à sede" vira "Fui ao prédio". Então há crase.',
      },
      {
        title: 'Onde não há crase',
        text: 'Não há crase antes de palavra masculina: "pagamento a prazo". Também não há antes de verbo: "começou a analisar". Nem antes de "Vossa Excelência": "Dirijo-me a Vossa Excelência". Nem entre palavras repetidas: "gota a gota". Antes de horas certas, há crase: "às 14h".',
      },
      {
        title: 'Resumindo',
        text: 'Toda proparoxítona leva acento. O Acordo tirou o acento de "ideia" e o trema, mas "herói" mantém. Há crase quando, trocando por masculino, aparece "ao".',
      },
    ],
    words: [
      { term: 'Sílaba tônica', meaning: 'A sílaba mais forte da palavra.' },
      { term: 'Proparoxítona', meaning: 'Palavra com a sílaba forte na antepenúltima. Todas levam acento.' },
      { term: 'Oxítona', meaning: 'Palavra com a sílaba forte na última sílaba.' },
      { term: 'Trema', meaning: 'Dois pontinhos sobre o u, que o Acordo eliminou.' },
      { term: 'Crase', meaning: 'Junção de dois "a", marcada pelo acento grave: à.' },
      { term: 'Acordo Ortográfico', meaning: 'Acordo para os países de língua portuguesa escreverem igual.' },
    ],
    checks: [
      { statement: 'Depois do Acordo, "herói" perdeu o acento.', answer: false, why: '"Herói" mantém o acento; quem perdeu foi "heroico".' },
      { statement: 'Não há crase antes de verbo, como em "começou a analisar".', answer: true, why: 'A crase não aparece antes de verbo.' },
      { statement: 'Todas as proparoxítonas levam acento.', answer: true, why: 'É a regra: público, crédito, análise.' },
    ],
  },
  'cap.port.01:pontuacao': {
    pages: [
      {
        title: 'Para que serve a vírgula?',
        text: 'A vírgula organiza a frase e evita confusão. Uma vírgula a mais ou a menos pode mudar quem fez o quê. Por isso a prova pede para você dizer se uma vírgula pode sair ou se uma frase está bem pontuada.',
      },
      {
        title: 'A regra de ouro',
        text: 'Nunca separe com uma vírgula só o **sujeito**, quem faz a ação, e o verbo, a ação. Errado: "Os auditores, concluíram o relatório". Certo: "Os auditores concluíram o relatório". Se houver algo no meio, use duas vírgulas: "Os auditores, após três meses, concluíram o relatório".',
      },
      {
        title: 'Vírgulas que mudam o sentido',
        text: 'Compare. "Os servidores que faltaram serão avisados": só os que faltaram. "Os servidores, que faltaram, serão avisados": todos faltaram. Com vírgulas, a frase explica algo sobre todos. Sem vírgulas, ela separa um grupo. Tirar ou pôr as vírgulas muda o sentido.',
      },
      {
        title: 'Outros usos da vírgula',
        text: 'Use vírgula no **vocativo**, o chamado a alguém: "Senhor Presidente, encaminho o relatório". Use também para uma explicação no meio da frase: "O TCE-GO, órgão de controle, emitiu parecer". E antes de "mas": "Analisou as notas, mas não achou o contrato".',
      },
      {
        title: 'Pronome antes ou depois?',
        text: 'Palavras como "me", "se" e "lhe" são **pronomes oblíquos**: pequenas palavras que completam o verbo. Na escrita formal, não comece a frase com elas. Errado: "Me informaram". Certo: "Informaram-me". Depois de "não", o pronome vem antes do verbo: "Não se admite recurso".',
      },
      {
        title: 'Cujo e Vossa Excelência',
        text: '"Cujo" indica posse e nunca vem seguido de "o" ou "a". Certo: "o órgão cujas contas foram rejeitadas". Errado: "cujas as contas". Com "Vossa Excelência", o verbo fica como se fosse "ele": "Vossa Excelência decidiu". E o certo é "sua equipe", não "vossa equipe".',
      },
      {
        title: 'Resumindo',
        text: 'Nunca separe com uma vírgula só quem age e a ação. Pôr ou tirar vírgulas pode mudar o sentido. Não comece a frase com "me", e nunca escreva "cujo o".',
      },
    ],
    words: [
      { term: 'Sujeito', meaning: 'Quem faz a ação na frase, ou de quem se fala.' },
      { term: 'Vocativo', meaning: 'Chamado a alguém, como "Senhor Presidente,".' },
      { term: 'Pronome oblíquo', meaning: 'Palavrinha que completa o verbo, como me, se, lhe, o.' },
      { term: 'Cujo', meaning: 'Palavra que indica posse, como "do qual". Nunca vem com "o" depois.' },
    ],
    checks: [
      { statement: '"Os auditores, concluíram o relatório" está bem pontuado.', answer: false, why: 'Uma vírgula só não pode separar quem age da ação.' },
      { statement: 'Pôr ou tirar vírgulas pode mudar o sentido da frase.', answer: true, why: 'Com vírgulas fala-se de todos; sem elas, de um grupo.' },
      { statement: '"Cujas as contas" é a forma correta.', answer: false, why: '"Cujo" nunca vem seguido de "o" ou "a".' },
    ],
  },
  'cap.port.01:morfologia': {
    pages: [
      {
        title: 'Tipo e papel da palavra',
        text: 'Toda palavra tem uma **classe**, que é o tipo dela: nome, verbo, adjetivo. E tem uma **função**, que é o papel dela na frase. A mesma palavra pode mudar de tipo. Em "O olhar do relator era severo", o verbo "olhar" virou nome.',
      },
      {
        title: 'Os vários "que"',
        text: 'O "que" pode ter papéis diferentes. Em "O relatório que li", ele retoma "relatório" e pode virar "o qual". Em "Sabe-se que houve dano", ele só abre a frase seguinte e pode virar "isso": "sabe-se isso". Teste a troca para descobrir o papel.',
      },
      {
        title: 'Como nascem as palavras',
        text: 'Muitas palavras nascem de outras. Pode-se colar um pedaço no começo, o **prefixo**: in + constitucional. Ou no fim, o **sufixo**: fiscaliza + ção. Também dá para juntar duas palavras: passa + tempo vira passatempo. "Planalto" junta plano e alto, perdendo letras.',
      },
      {
        title: 'Começo e fim juntos',
        text: 'Em "entardecer", o começo "en" e o fim "ecer" entram juntos. Não existe "entarde" nem "tardecer". Isso se chama **parassíntese**. Já em "deslealdade" existe "desleal" e existe "lealdade". Ali, cada pedaço entrou de forma independente.',
      },
      {
        title: 'Palavras de mesmo sentido',
        text: '**Sinônimos** são palavras de sentido parecido. **Antônimos** têm sentido oposto: lícito e ilícito. Na prova, o sinônimo vale sempre dentro da frase. Exemplo: em "o conselheiro ponderou que", ponderou pode ser trocado por "considerou", mas não por "pesou".',
      },
      {
        title: 'Resumindo',
        text: 'A classe é o tipo da palavra, e a função é o papel dela na frase. Prefixo vai no começo e sufixo no fim. Sinônimo se avalia sempre dentro da frase.',
      },
    ],
    words: [
      { term: 'Classe', meaning: 'O tipo da palavra: nome, verbo, adjetivo e outros.' },
      { term: 'Função', meaning: 'O papel que a palavra faz dentro da frase.' },
      { term: 'Prefixo', meaning: 'Pedaço colado no começo da palavra, como "in".' },
      { term: 'Sufixo', meaning: 'Pedaço colado no fim da palavra, como "ção".' },
      { term: 'Parassíntese', meaning: 'Começo e fim entram juntos, como em "entardecer".' },
      { term: 'Sinônimo', meaning: 'Palavra de sentido parecido com outra, na mesma frase.' },
    ],
    checks: [
      { statement: 'Em "fiscalização", "ção" é um sufixo.', answer: true, why: 'Sufixo é o pedaço colado no fim da palavra.' },
      { statement: 'O sinônimo, na prova, se avalia fora da frase, só pelo dicionário.', answer: false, why: 'O sentido que vale é sempre o da frase.' },
      { statement: 'Em "Sabe-se que houve dano", o "que" pode ser trocado por "o qual".', answer: false, why: 'Ali o "que" só abre a frase; ele vira "isso", não "o qual".' },
    ],
  },
  'cap.port.02:concordancia': {
    pages: [
      {
        title: 'O que é concordância?',
        text: '**Concordância** é fazer as palavras combinarem. Se quem age, o **sujeito**, está no plural, o verbo vai ao plural: "os auditores trabalham". É o assunto de gramática que mais cai na prova. A técnica é sempre a mesma: ache o verbo, ache quem age e confira.',
      },
      {
        title: 'Quem age vem depois',
        text: 'Às vezes quem age aparece depois do verbo. Exemplo: "Faltam ainda três documentos". Ponha na ordem direta: "Três documentos ainda faltam". Agora fica fácil ver que o verbo vai ao plural. Esse é o erro mais comum na prova.',
      },
      {
        title: 'Haver no sentido de existir',
        text: 'Quando "haver" quer dizer existir, ele é um **verbo impessoal**: não tem ninguém agindo e fica no singular. Certo: "Havia irregularidades". Errado: "Haviam irregularidades". Já "existir" vai ao plural: "Existiam irregularidades". O singular passa para o verbo ao lado: "Deve haver falhas", nunca "devem haver".',
      },
      {
        title: 'Fazer quando fala de tempo',
        text: 'Quando "fazer" indica tempo que passou, ele também fica no singular. Certo: "Faz três meses que a obra parou". Errado: "Fazem três meses". O mesmo vale para "haver" com tempo: "Há dois anos o contrato foi assinado".',
      },
      {
        title: 'O "se" que muda a regra',
        text: 'Em "Vendem-se imóveis", pense: imóveis são vendidos. Então o verbo vai ao plural. Em "Precisa-se de técnicos", há a palavra "de" no meio. Aí o verbo fica no singular. Errado: "Precisam-se de técnicos".',
      },
      {
        title: 'Anexo e meio',
        text: '"Anexo" combina com o nome: "Seguem anexas as planilhas". Mas "em anexo" nunca muda: "Seguem em anexo as planilhas". "Meio", no sentido de "um pouco", não muda: "ela estava meio cansada". No sentido de metade, muda: "meia hora".',
      },
      {
        title: 'Resumindo',
        text: 'O verbo combina com quem age, mesmo que venha depois. "Haver" de existir e "fazer" de tempo ficam no singular. Com "de" no meio, como em "precisa-se de", o verbo fica no singular.',
      },
    ],
    words: [
      { term: 'Concordância', meaning: 'Fazer as palavras da frase combinarem, no singular ou plural.' },
      { term: 'Sujeito', meaning: 'Quem faz a ação, ou de quem se fala.' },
      { term: 'Ordem direta', meaning: 'Quem age primeiro, depois a ação: "três documentos faltam".' },
      { term: 'Verbo impessoal', meaning: 'Verbo sem ninguém agindo; fica sempre no singular.' },
      { term: 'Em anexo', meaning: 'Expressão que nunca muda: "seguem em anexo as planilhas".' },
    ],
    checks: [
      { statement: '"Havia irregularidades no edital" está certo.', answer: true, why: '"Haver" no sentido de existir fica no singular.' },
      { statement: '"Fazem três meses que a obra parou" está certo.', answer: false, why: '"Fazer" com sentido de tempo fica no singular: "faz".' },
      { statement: '"Vendem-se imóveis" está certo.', answer: true, why: 'Imóveis são vendidos, então o verbo vai ao plural.' },
    ],
  },
  'cap.port.02:regencia': {
    pages: [
      {
        title: 'O que é regência?',
        text: '**Regência** é saber se uma palavra pede uma **preposição** depois dela. Preposição é uma palavrinha de ligação, como "a", "de", "em". Exemplo: quem obedece, obedece **a** alguma coisa. Isso ajuda também a acertar a crase.',
      },
      {
        title: 'Verbos que mudam de sentido',
        text: '"Assistir" no sentido de ver pede "a": "assistimos à sessão". "Visar" no sentido de ter como objetivo pede "a": "a auditoria visa ao controle". "Chegar" pede "a": "chegou ao Tribunal". "Chegar em" é fala do dia a dia, não da escrita formal.',
      },
      {
        title: 'Preferir uma coisa a outra',
        text: 'Com "preferir", não se usa "mais" nem "do que". Errado: "Prefiro mais revisar do que reescrever". Certo: "Prefiro revisar a reescrever". "Implicar", no sentido de causar, não pede "em": "o atraso implica multa".',
      },
      {
        title: 'Ativa e passiva',
        text: 'Na **voz ativa**, quem age vem primeiro: "O Tribunal julgou as contas". Na **voz passiva**, o destaque vai para o que sofreu a ação: "As contas foram julgadas pelo Tribunal". Quem agiu vem depois de "por": é o **agente da passiva**. O tempo combina: "aprovará" vira "será aprovado".',
      },
      {
        title: 'Tempos que combinam',
        text: 'Os tempos dos verbos precisam combinar. Isso é a **correlação de tempos**. "Se o prazo fosse maior, a equipe concluiria." "Se o prazo for maior, a equipe concluirá." Errado: "Se o gestor tivesse prestado contas, não será multado". Certo: "não seria multado".',
      },
      {
        title: 'Ver e vir',
        text: 'Cuidado com "ver" e "vir" no futuro. "Quando eu vir o documento" vem de ver. "Quando eu vier aqui" vem de vir. Errado: "Quando o fiscal ver a nota". Certo: "Quando o fiscal vir a nota". Também: "se ele mantiver", nunca "se ele manter".',
      },
      {
        title: 'Resumindo',
        text: 'Regência é saber se a palavra pede preposição. "Prefiro revisar a reescrever", sem "mais" e sem "do que". Os tempos dos verbos precisam combinar entre si.',
      },
    ],
    words: [
      { term: 'Regência', meaning: 'Saber se uma palavra pede preposição depois dela.' },
      { term: 'Preposição', meaning: 'Palavrinha de ligação, como a, de, em, por.' },
      { term: 'Voz ativa', meaning: 'Frase em que quem age vem primeiro.' },
      { term: 'Voz passiva', meaning: 'Frase que destaca o que sofreu a ação.' },
      { term: 'Agente da passiva', meaning: 'Quem fez a ação, na voz passiva, depois de "por".' },
      { term: 'Correlação de tempos', meaning: 'Combinar os tempos dos verbos numa mesma frase.' },
    ],
    checks: [
      { statement: '"Prefiro revisar a reescrever" está certo.', answer: true, why: '"Preferir" pede "a", sem "mais" e sem "do que".' },
      { statement: '"Quando o fiscal ver a nota" está certo.', answer: false, why: 'O certo é "quando o fiscal vir a nota".' },
      { statement: 'Na voz passiva, "aprovará" vira "será aprovado".', answer: true, why: 'O verbo "ser" fica no mesmo tempo do verbo original.' },
    ],
  },
  'cap.port.02:periodo': {
    pages: [
      {
        title: 'Reescrever sem mudar o sentido',
        text: 'Muitas questões pedem para trocar uma palavra de ligação ou reescrever um trecho sem mudar o sentido. No trabalho, você também vai revisar textos de outras pessoas. Para isso, é preciso entender como as frases se ligam.',
      },
      {
        title: 'Frases soltas ou dependentes',
        text: 'Na **coordenação**, as frases ficam lado a lado, como vagões soltos: "Analisou as notas e redigiu o relatório". Na **subordinação**, uma frase depende da outra para fazer sentido: "Concluiu que as notas eram falsas". A segunda parte completa a primeira.',
      },
      {
        title: 'O que cada ligação diz',
        text: 'Cada palavra de ligação tem um sentido. "Mas", "porém", "contudo" mostram oposição. "Portanto" e "logo" trazem conclusão. "Porque" e "já que" dão a causa. "Se" e "caso" trazem condição. "Embora" mostra uma **concessão**: uma ideia que não impede a outra.',
      },
      {
        title: 'Troca segura',
        text: 'Para trocar, use uma palavra com o mesmo sentido. "Embora o prazo fosse curto, a equipe concluiu" pode virar "O prazo era curto; no entanto, a equipe concluiu". Trocar "embora" por "porque" muda o sentido e deixa a frase errada.',
      },
      {
        title: 'Ajustes depois da troca',
        text: 'Depois de trocar, confira o verbo. "Embora" pede "fosse", "houvesse": "Embora houvesse falhas". Com "apesar de", fica: "Apesar das falhas". Confira também a vírgula, a concordância e a crase. Cuidado: "à medida em que" não existe. O certo é "à medida que".',
      },
      {
        title: 'Resumindo',
        text: 'Coordenação deixa frases lado a lado; subordinação faz uma depender da outra. Para reescrever, troque por uma ligação de mesmo sentido e confira verbo e pontuação.',
      },
    ],
    words: [
      { term: 'Coordenação', meaning: 'Frases lado a lado, cada uma com sentido próprio.' },
      { term: 'Subordinação', meaning: 'Uma frase depende da outra para fazer sentido.' },
      { term: 'Conectivo', meaning: 'Palavra que liga frases, como mas, porque, embora.' },
      { term: 'Concessão', meaning: 'Ideia que não impede a outra, como em "embora".' },
      { term: 'Reescrita', meaning: 'Dizer a mesma coisa com outras palavras, sem mudar o sentido.' },
    ],
    checks: [
      { statement: '"Contudo" mostra uma ideia de oposição, como "mas".', answer: true, why: 'É uma palavra de oposição, igual a "porém".' },
      { statement: 'Trocar "embora" por "porque" mantém o sentido.', answer: false, why: '"Embora" não impede a outra ideia; "porque" dá a causa.' },
      { statement: '"À medida em que" é uma forma correta.', answer: false, why: 'O certo é "à medida que".' },
    ],
  },
  'cap.port.02:redacao-oficial': {
    pages: [
      {
        title: 'O que é redação oficial?',
        text: '**Redação oficial** é o jeito como o poder público escreve seus documentos e comunicações. No Tribunal, você vai ler e escrever esse tipo de texto. A base usada pelas bancas é o **Manual de Redação da Presidência da República**. A 3ª edição dele saiu em 2018.',
      },
      {
        title: 'Como deve ser o texto',
        text: 'O texto oficial deve ser **claro**, para ser entendido de primeira. Deve ser **conciso**: dizer tudo com poucas palavras, sem cortar o essencial. Deve ser **impessoal**: quem fala é o órgão, não a opinião de quem escreveu. E deve seguir a norma padrão da língua.',
      },
      {
        title: 'Um exemplo de falta de clareza',
        text: 'Veja: "O auditor informou ao gestor que seu relatório estava atrasado". O relatório é de quem, do auditor ou do gestor? A frase deixa dúvida. Isso fere a clareza. Outro erro comum é escrever "Achei o pedido simpático": é opinião pessoal e fere a impessoalidade.',
      },
      {
        title: 'Vossa Excelência',
        text: 'Um **pronome de tratamento** é a forma respeitosa de se dirigir a alguém. "Vossa Excelência" é usado para altas autoridades. Mesmo começando com "Vossa", o verbo fica como se fosse "ele": "Vossa Excelência decidiu", e "sua decisão". O Manual aboliu "Ilustríssimo" e "Digníssimo".',
      },
      {
        title: 'Um só nome: ofício',
        text: 'Antes existiam ofício, aviso e memorando, cada um com seu formato. A 3ª edição do Manual juntou os três num formato só, o **padrão ofício**. Hoje o nome usado nos três casos é "ofício". Ele tem partes fixas, como local e data, assunto, texto e identificação de quem assina.',
      },
      {
        title: 'Resumindo',
        text: 'O texto oficial é claro, conciso e impessoal. Com "Vossa Excelência", o verbo fica como "ele decidiu". Ofício, aviso e memorando viraram um formato só: o ofício.',
      },
    ],
    words: [
      { term: 'Redação oficial', meaning: 'Jeito como o poder público escreve seus documentos.' },
      { term: 'Concisão', meaning: 'Dizer tudo com poucas palavras, sem cortar o essencial.' },
      { term: 'Impessoalidade', meaning: 'Quem fala é o órgão, sem opinião pessoal de quem escreve.' },
      { term: 'Pronome de tratamento', meaning: 'Forma respeitosa de falar com alguém, como Vossa Excelência.' },
      { term: 'Ofício', meaning: 'Nome único do documento oficial no padrão do Manual.' },
    ],
    checks: [
      { statement: 'Com "Vossa Excelência", o certo é "Vossa Excelência decidiu".', answer: true, why: 'O verbo fica como se fosse "ele".' },
      { statement: 'Concisão permite cortar informação essencial.', answer: false, why: 'Concisão tira só o que sobra, nunca o essencial.' },
      { statement: 'Na 3ª edição do Manual, ofício, aviso e memorando viraram um formato só.', answer: true, why: 'Os três passaram ao padrão ofício.' },
    ],
  },
  // ------------------------------------------------------------------
  // Matemática
  // ------------------------------------------------------------------
  'cap.mat.01:inteiros': {
    pages: [
      {
        title: 'Contas do dia a dia',
        text: 'No Tribunal, você vai lidar com saldos, gastos e parcelas de contratos. A prova não pede conta solta: ela conta uma pequena história com números. Quase todo erro vem de duas coisas: fazer as contas na ordem errada ou trocar o sinal de mais e menos.',
      },
      {
        title: 'Números negativos',
        text: 'Os **números inteiros** incluem os negativos, como uma conta bancária no vermelho: −50 é dever 50 reais. Na multiplicação, sinais iguais dão positivo e sinais diferentes dão negativo. Exemplo: (−2) × (−3) = 6. Já (−2) × 3 = −6.',
      },
      {
        title: 'O que é potência?',
        text: '**Potência** é multiplicar um número por ele mesmo várias vezes. 2³ quer dizer 2 × 2 × 2 = 8. Cuidado com o sinal: (−2)² = (−2) × (−2) = 4. Mas −2² = −4, porque sem parênteses o **expoente**, o número pequeno no alto, vale só para o 2.',
      },
      {
        title: 'A ordem das contas',
        text: 'Numa conta grande, siga esta ordem. Primeiro o que está entre parênteses. Depois as potências. Depois multiplicação e divisão, da esquerda para a direita. Por último, soma e subtração. Exemplo: 20 ÷ 4 × 5. Primeiro 20 ÷ 4 = 5. Depois 5 × 5 = 25.',
      },
      {
        title: 'O que é fração?',
        text: 'Uma **fração** é uma parte de um todo, como fatias de uma pizza. Em 3/8, o 8, o **denominador**, diz em quantas partes o todo foi dividido. O 3, o **numerador**, diz quantas partes você pega. Para achar 3/8 de 1.200: primeiro 1.200 ÷ 8 = 150. Depois 150 × 3 = 450.',
      },
      {
        title: 'A fração do que sobrou',
        text: 'A banca adora este caso. Você tem 1.200, gasta 3/8 e depois 2/5 do que sobrou. Passo 1: 3/8 de 1.200 = 450. Passo 2: sobram 1.200 − 450 = 750. Passo 3: 2/5 de 750 = 750 ÷ 5 × 2 = 300. Passo 4: sobram 750 − 300 = 450.',
      },
      {
        title: 'Resumindo',
        text: 'Faça as contas na ordem certa: parênteses, potências, multiplicação e divisão, soma e subtração. Fração é parte de um todo. "Do que sobrou" quer dizer calcular sobre o resto, não sobre o total.',
      },
    ],
    words: [
      { term: 'Número inteiro', meaning: 'Número sem vírgula, positivo, negativo ou zero.' },
      { term: 'Número negativo', meaning: 'Número abaixo de zero, como dívida: −50.' },
      { term: 'Potência', meaning: 'Multiplicar um número por ele mesmo várias vezes: 2³ = 8.' },
      { term: 'Fração', meaning: 'Parte de um todo, como 3/8 de uma pizza.' },
      { term: 'Numerador', meaning: 'Número de cima da fração: quantas partes você pega.' },
      { term: 'Denominador', meaning: 'Número de baixo da fração: em quantas partes o todo foi dividido.' },
    ],
    checks: [
      { statement: '(−2) × (−3) dá 6.', answer: true, why: 'Sinais iguais na multiplicação dão resultado positivo.' },
      { statement: 'Em 20 ÷ 4 × 5, faz-se primeiro 4 × 5.', answer: false, why: 'Multiplicação e divisão vão da esquerda para a direita: 20 ÷ 4 primeiro.' },
      { statement: '3/8 de 1.200 é 450.', answer: true, why: '1.200 ÷ 8 = 150, e 150 × 3 = 450.' },
    ],
  },
  'cap.mat.01:divisores': {
    pages: [
      {
        title: 'Para que serve isto?',
        text: 'Este assunto resolve dois tipos de problema. Um: quando dois eventos que se repetem vão acontecer juntos de novo, como duas cópias de segurança. Dois: como dividir coisas em grupos iguais, do maior tamanho possível, como lotes de processos.',
      },
      {
        title: 'Múltiplo e divisor',
        text: 'Um **múltiplo** de 9 é o resultado de 9 vezes algum número: 9, 18, 27, 36. Um **divisor** de 36 é um número que divide 36 sem sobrar nada. Como 36 ÷ 9 = 4, sem resto, 9 é divisor de 36. E 36 é múltiplo de 9.',
      },
      {
        title: 'O que é número primo?',
        text: 'Um **número primo** só pode ser dividido por 1 e por ele mesmo. Exemplos: 2, 3, 5, 7, 11, 13. O 1 não é primo. O 2 é o único primo par. Todo número maior que 1 pode ser escrito como uma multiplicação de primos: 60 = 2 × 2 × 3 × 5.',
      },
      {
        title: 'Truques para dividir',
        text: 'Um número divide por 2 se termina em número par. Divide por 5 se termina em 0 ou 5. Divide por 3 se a soma dos algarismos divide por 3. Exemplo: 7.452. Some: 7 + 4 + 5 + 2 = 18. Como 18 ÷ 3 = 6, então 7.452 divide por 3.',
      },
      {
        title: 'MMC: quando coincidem de novo',
        text: '**MMC** é o menor múltiplo comum. Ele responde "quando vão coincidir de novo". Exemplo: um sistema faz cópia a cada 6 dias e outro a cada 8. Múltiplos de 6: 6, 12, 18, 24. Múltiplos de 8: 8, 16, 24. O primeiro em comum é 24. Coincidem de novo em 24 dias.',
      },
      {
        title: 'MDC: o maior grupo igual',
        text: '**MDC** é o maior divisor comum. Ele responde "qual o maior grupo igual, sem sobra". Exemplo: 48 processos de um tipo e 72 de outro, em lotes iguais, sem misturar. Divisores de 48 incluem 12 e 24. Divisores de 72 também incluem 12 e 24. O maior em comum é 24 processos por lote.',
      },
      {
        title: 'Resumindo',
        text: 'Primo só divide por 1 e por ele mesmo, e o 1 não é primo. "Vão coincidir de novo" pede MMC. "Maior grupo igual, sem sobra" pede MDC.',
      },
    ],
    words: [
      { term: 'Múltiplo', meaning: 'Resultado de um número vezes outro: 36 é múltiplo de 9.' },
      { term: 'Divisor', meaning: 'Número que divide outro sem sobrar nada.' },
      { term: 'Número primo', meaning: 'Número que só divide por 1 e por ele mesmo.' },
      { term: 'Algarismo', meaning: 'Cada dígito de um número: 7.452 tem os algarismos 7, 4, 5 e 2.' },
      { term: 'MMC', meaning: 'Menor múltiplo comum: diz quando eventos coincidem de novo.' },
      { term: 'MDC', meaning: 'Maior divisor comum: diz o maior grupo igual, sem sobra.' },
    ],
    checks: [
      { statement: 'O número 1 é primo.', answer: false, why: 'O 1 não é primo; primo divide só por 1 e por ele mesmo, sendo diferente de 1.' },
      { statement: 'Para saber quando dois eventos coincidem de novo, usa-se o MMC.', answer: true, why: 'O MMC é o primeiro múltiplo em comum.' },
      { statement: 'Para montar lotes iguais do maior tamanho possível, usa-se o MMC.', answer: false, why: 'Nesse caso se usa o MDC.' },
    ],
  },
  'cap.mat.01:razoes': {
    pages: [
      {
        title: 'Dividir de forma justa',
        text: 'No Tribunal, é comum dividir verba entre setores ou calcular quantos dias uma equipe leva numa tarefa. Esses problemas usam razão, proporção e regra de três. São os mais cobrados com histórias do dia a dia na prova.',
      },
      {
        title: 'O que é razão?',
        text: 'Uma **razão** é uma divisão que compara dois números. Exemplo: 30 processos julgados em 6 sessões. A razão é 30 ÷ 6 = 5. Ou seja, 5 processos por sessão. Uma **proporção** é quando duas razões são iguais: 1/2 = 2/4.',
      },
      {
        title: 'Junto ou ao contrário?',
        text: 'Uma **grandeza** é algo que se mede ou conta, como tempo ou páginas. Duas grandezas são **diretamente proporcionais** quando uma dobra e a outra também dobra. Exemplo: mais páginas, mais tempo de impressão. São **inversamente proporcionais** quando uma dobra e a outra cai pela metade. Exemplo: mais servidores, menos dias para terminar a mesma tarefa.',
      },
      {
        title: 'Dividir em partes',
        text: 'Divida R$ 84.000 entre três setores nos pesos 2, 3 e 7. Passo 1: some os pesos: 2 + 3 + 7 = 12. Passo 2: 84.000 ÷ 12 = 7.000. Passo 3: multiplique cada peso: 2 × 7.000 = 14.000; 3 × 7.000 = 21.000; 7 × 7.000 = 49.000.',
      },
      {
        title: 'Regra de três direta',
        text: 'A **regra de três** acha um número que falta. Exemplo: em 30 minutos saem 1.200 páginas. Em 45 minutos, quantas? Mais tempo, mais páginas: é direta. Passo 1: 1.200 ÷ 30 = 40 páginas por minuto. Passo 2: 40 × 45 = 1.800 páginas.',
      },
      {
        title: 'Regra de três inversa',
        text: 'Seis servidores fazem um inventário em 15 dias. Com 9 servidores, em quantos dias? Mais gente, menos dias: é inversa. O total de trabalho fica igual. Passo 1: 6 × 15 = 90. Passo 2: 90 ÷ 9 = 10 dias.',
      },
      {
        title: 'Resumindo',
        text: 'Razão compara dois números com uma divisão. Pergunte sempre: se um aumenta, o outro aumenta ou diminui? Se aumenta, é direta. Se diminui, é inversa.',
      },
    ],
    words: [
      { term: 'Razão', meaning: 'Divisão que compara dois números: 30 ÷ 6 = 5.' },
      { term: 'Proporção', meaning: 'Igualdade entre duas razões, como 1/2 = 2/4.' },
      { term: 'Grandeza', meaning: 'Algo que se pode medir ou contar: tempo, páginas, pessoas.' },
      { term: 'Diretamente proporcional', meaning: 'Uma aumenta e a outra aumenta junto.' },
      { term: 'Inversamente proporcional', meaning: 'Uma aumenta e a outra diminui.' },
      { term: 'Regra de três', meaning: 'Jeito de achar um número que falta numa proporção.' },
    ],
    checks: [
      { statement: 'Mais servidores e menos dias para a mesma tarefa é uma relação inversa.', answer: true, why: 'Quando um aumenta, o outro diminui.' },
      { statement: 'Na divisão por pesos 2, 3 e 7, primeiro se somam os pesos.', answer: true, why: '2 + 3 + 7 = 12, e o total é dividido por 12.' },
      { statement: 'Se 6 servidores levam 15 dias, 9 servidores levam mais de 15 dias.', answer: false, why: 'Mais gente faz em menos tempo: 6 × 15 = 90 e 90 ÷ 9 = 10 dias.' },
    ],
  },
  'cap.mat.01:porcentagem': {
    pages: [
      {
        title: 'Porcentagem está em tudo',
        text: 'Reajuste de contrato, desconto de compra, taxa de processos julgados no prazo. Tudo isso usa porcentagem. No controle das contas públicas, você vai calcular porcentagem o tempo todo.',
      },
      {
        title: 'O que é porcentagem?',
        text: '**Porcentagem** quer dizer "a cada cem". 25% é 25 em cada 100, ou seja, 0,25. Para achar 18% de R$ 2.500, multiplique por 0,18. Passo a passo: 2.500 ÷ 100 = 25. Depois 25 × 18 = 450. Resposta: R$ 450.',
      },
      {
        title: 'O número que multiplica',
        text: 'Use o **fator multiplicativo**, o número que já faz o aumento ou o desconto. Um **acréscimo** (aumento) de 8%: multiplique por 1,08. Desconto de 15%: multiplique por 0,85. Exemplo: R$ 100 com aumento de 8% vira 100 × 1,08 = 108.',
      },
      {
        title: 'Um aumento depois do outro',
        text: 'Porcentagens seguidas se multiplicam, não se somam. Exemplo: R$ 100 sobe 10% e depois cai 10%. Passo 1: 100 × 1,10 = 110. Passo 2: 110 × 0,90 = 99. Não voltou a 100. Houve perda de 1%, porque o segundo cálculo foi sobre 110.',
      },
      {
        title: 'Descobrir o valor antigo',
        text: 'Um preço subiu 20% e virou R$ 120. Qual era o preço antigo? Não tire 20% de 120. Divida pelo fator: 120 ÷ 1,2 = 100. Confira: 100 × 1,2 = 120. Tirar 20% de 120 daria 96, que está errado.',
      },
      {
        title: 'Ponto percentual',
        text: 'Uma taxa passou de 40% para 50%. A diferença é de 10 **pontos percentuais**, que é a conta 50 − 40. Mas, em relação aos 40% do início, o aumento é de 25%, porque 10 ÷ 40 = 0,25. Dizer "aumentou 10%" nesse caso está errado.',
      },
      {
        title: 'Resumindo',
        text: 'Porcentagem é "a cada cem". Aumentos e descontos seguidos se multiplicam. Para achar o valor antigo, divida pelo fator, em vez de tirar a porcentagem do valor novo.',
      },
    ],
    words: [
      { term: 'Porcentagem', meaning: 'Quantidade "a cada cem": 25% é 25 em 100.' },
      { term: 'Fator multiplicativo', meaning: 'Número que já faz o aumento ou desconto: +8% é × 1,08.' },
      { term: 'Acréscimo', meaning: 'Aumento sobre um valor.' },
      { term: 'Desconto', meaning: 'Redução sobre um valor.' },
      { term: 'Ponto percentual', meaning: 'Diferença simples entre duas porcentagens: de 40% a 50% são 10 pontos.' },
    ],
    checks: [
      { statement: 'Subir 10% e depois cair 10% faz o valor voltar ao início.', answer: false, why: '100 × 1,10 = 110 e 110 × 0,90 = 99: houve perda.' },
      { statement: 'Um aumento de 8% é o mesmo que multiplicar por 1,08.', answer: true, why: '1,08 é o fator de um aumento de 8%.' },
      { statement: 'Se o preço subiu 20% e virou R$ 120, o antigo era R$ 100.', answer: true, why: '120 ÷ 1,2 = 100.' },
    ],
  },
  'cap.mat.02:associacao': {
    pages: [
      {
        title: 'Lógica é organizar pistas',
        text: 'O raciocínio lógico da prova parece um jogo de detetive. Você recebe pistas sobre pessoas, lugares ou objetos e precisa descobrir quem fez o quê. No trabalho de auditoria, é a mesma coisa: juntar fatos e tirar conclusões seguras.',
      },
      {
        title: 'A tabela de pistas',
        text: 'Quando cada pessoa tem um setor diferente, monte uma tabela. Pessoas nas linhas, setores nas colunas. Marque X onde a pista proíbe. Exemplo: "Davi não trabalha em Obras" vira um X na casa Davi e Obras. Se só sobrar uma casa livre na linha, é ela.',
      },
      {
        title: 'Quem chegou primeiro?',
        text: 'Pistas como "antes de" e "logo depois de" pedem uma fila. Desenhe posições 1, 2, 3. Comece pelo que é fixo, como "Ulisses foi o primeiro". Depois encaixe os pares colados, como "Vera chegou logo antes de Tom". Eles andam juntos, como um bloco.',
      },
      {
        title: 'Quem está mentindo?',
        text: 'Se o problema diz que só um fala a verdade, teste cada possibilidade. Suponha que o culpado é A e conte quantas frases ficam verdadeiras. Depois faça o mesmo com B e com C. A resposta é a única hipótese que bate com o número de verdades dado.',
      },
      {
        title: 'Todo, algum, nenhum',
        text: 'Desenhe círculos. "Todo auditor é servidor": o círculo dos auditores fica dentro do dos servidores. Agora, "algum servidor é engenheiro" não garante que algum auditor seja engenheiro. Os engenheiros podem estar fora do círculo dos auditores. E o contrário de "todo relatório foi entregue" é "algum relatório não foi entregue".',
      },
      {
        title: 'Se isto, então aquilo',
        text: 'Uma **premissa** é uma pista dada como verdadeira: "Se chove, a sessão é adiada". Choveu? Então a sessão foi adiada. A sessão não foi adiada? Então não choveu. Mas, se a sessão foi adiada, você não pode concluir que choveu. Pode ter sido outro motivo.',
      },
      {
        title: 'Resumindo',
        text: 'Use tabela para associar e fila para ordenar. Em verdade e mentira, teste cada hipótese. O contrário de "todo" é "algum não".',
      },
    ],
    words: [
      { term: 'Associação', meaning: 'Ligar cada pessoa ao seu atributo, como setor ou cidade.' },
      { term: 'Hipótese', meaning: 'Suposição que você testa para ver se dá certo.' },
      { term: 'Premissa', meaning: 'Informação dada como verdadeira no início do raciocínio.' },
      { term: 'Conclusão', meaning: 'O que se descobre a partir das premissas.' },
      { term: 'Negação', meaning: 'A frase contrária. A de "todo" é "algum não".' },
    ],
    checks: [
      { statement: 'O contrário de "todo relatório foi entregue" é "nenhum relatório foi entregue".', answer: false, why: 'O contrário é "algum relatório não foi entregue".' },
      { statement: 'Em verdade e mentira, testa-se cada hipótese possível.', answer: true, why: 'Só uma bate com o número de verdades dado.' },
      { statement: 'Se a sessão foi adiada, conclui-se com certeza que choveu.', answer: false, why: 'A sessão pode ter sido adiada por outro motivo.' },
    ],
  },
  'cap.mat.02:sequencias': {
    pages: [
      {
        title: 'Achar o padrão',
        text: 'Muitas questões mostram uma lista de números, letras ou figuras e pedem o próximo. O segredo é descobrir a regra que se repete. É como olhar o calendário de plantão e prever quem trabalha no próximo fim de semana.',
      },
      {
        title: 'Primeiro, olhe os saltos',
        text: 'Uma **sequência** é uma lista em que cada item, o **termo**, segue uma regra. Veja 5, 9, 13, 17. Calcule os saltos: 9 − 5 = 4; 13 − 9 = 4; 17 − 13 = 4. O salto é sempre 4. Então o próximo é 17 + 4 = 21.',
      },
      {
        title: 'Saltos que crescem',
        text: 'Às vezes o salto muda. Veja 2, 5, 10, 17, 26. Saltos: 3, 5, 7, 9. Os saltos crescem de 2 em 2. O próximo salto é 11. Então o próximo número é 26 + 11 = 37. Outro padrão: 3, 6, 12, 24. Cada um é o dobro do anterior: 48.',
      },
      {
        title: 'Letras viram números',
        text: 'Com letras, troque cada uma pela posição no alfabeto: A = 1, B = 2, C = 3. Veja A, C, F, J, O. Posições: 1, 3, 6, 10, 15. Saltos: 2, 3, 4, 5. O próximo salto é 6: 15 + 6 = 21, que é a letra U. Confira se a questão usa o alfabeto de 26 letras.',
      },
      {
        title: 'Padrões que se repetem',
        text: 'A palavra TCEGO se repete: TCEGOTCEGO. Qual é a 12ª letra? O ciclo tem 5 letras. Divida: 12 ÷ 5 = 2, sobra 2. A sobra, o **resto**, diz a posição no ciclo. A 2ª letra de TCEGO é C. Se sobrar zero, é a última letra do ciclo.',
      },
      {
        title: 'O intruso do grupo',
        text: 'Em outras questões, você acha o que o grupo tem em comum e aponta quem não tem. Exemplo: 3, 5, 7, 9, 11. Quase todos são primos, mas 9 = 3 × 3 não é. O intruso é o 9. Teste mais de uma ideia antes de responder.',
      },
      {
        title: 'Resumindo',
        text: 'Para achar o próximo termo, comece calculando os saltos. Letras viram números pela posição no alfabeto. Em padrões que se repetem, a sobra da divisão mostra a posição.',
      },
    ],
    words: [
      { term: 'Sequência', meaning: 'Lista em que cada item segue uma regra.' },
      { term: 'Termo', meaning: 'Cada item de uma sequência.' },
      { term: 'Ciclo', meaning: 'Grupo de itens que se repete sempre na mesma ordem.' },
      { term: 'Resto', meaning: 'O que sobra numa divisão: 12 ÷ 5 dá 2 e sobra 2.' },
      { term: 'Intruso', meaning: 'Item que não segue a regra do resto do grupo.' },
    ],
    checks: [
      { statement: 'Em 5, 9, 13, 17, o próximo número é 21.', answer: true, why: 'O salto é sempre 4: 17 + 4 = 21.' },
      { statement: 'Na posição do alfabeto, A vale 1 e C vale 3.', answer: true, why: 'A é a 1ª letra e C é a 3ª.' },
      { statement: 'Em 3, 6, 12, 24, o próximo número é 30.', answer: false, why: 'Cada número é o dobro do anterior: 24 × 2 = 48.' },
    ],
  },
  'cap.mat.02:espacial': {
    pages: [
      {
        title: 'Datas, relógios e direções',
        text: 'Contar prazos é parte do trabalho num Tribunal. A prova pergunta em que dia da semana cai uma data, que horas um relógio marca e para onde alguém fica virado depois de girar. Quase tudo se resolve com a sobra de uma divisão.',
      },
      {
        title: 'A semana tem 7 dias',
        text: 'A cada 7 dias, o dia da semana se repete. Então divida o número de dias por 7 e olhe a sobra, o **resto**. Exemplo: hoje é terça. Daqui a 100 dias? 100 ÷ 7 = 14, sobra 2. Ande 2 dias a partir de terça: quarta, quinta. Será quinta-feira.',
      },
      {
        title: 'Contar prazos sem errar',
        text: 'Do dia 3 ao dia 10, contando os dois, são 8 dias. A conta é 10 − 3 + 1 = 8. Já "dez dias depois do dia 3" é o dia 13. Muitas respostas erradas na prova vêm de contar um dia a mais ou a menos.',
      },
      {
        title: 'Horas com vírgula',
        text: 'Uma hora tem 60 minutos, não 100. Então 2,4 horas não são 2 horas e 40 minutos. Faça a conta: 0,4 × 60 = 24. Resposta: 2 horas e 24 minutos. Do mesmo jeito, meia hora é 0,5 × 60 = 30 minutos.',
      },
      {
        title: 'Relógio que adianta',
        text: 'Um relógio adianta 3 minutos por hora. Ele foi acertado às 8h. Que horas marca às 16h? Passo 1: passaram 16 − 8 = 8 horas. Passo 2: 8 × 3 = 24 minutos de adiantamento. Ele marca 16h24.',
      },
      {
        title: 'Girar no lugar',
        text: 'Os **pontos cardeais**, as quatro direções, viram graus: norte é 0, leste é 90, sul é 180, oeste é 270. Girar no **sentido horário**, o dos ponteiros do relógio, soma. Girar ao contrário subtrai. Exemplo: de frente para o norte, gire 90 no horário: 0 + 90 = 90. Você fica de frente para o leste.',
      },
      {
        title: 'Resumindo',
        text: 'Para dias da semana, divida por 7 e use a sobra. Uma hora tem 60 minutos, então 0,5 hora é 30 minutos. Girar no sentido horário soma graus.',
      },
    ],
    words: [
      { term: 'Resto', meaning: 'O que sobra numa divisão: 100 ÷ 7 dá 14 e sobra 2.' },
      { term: 'Prazo', meaning: 'Tempo marcado para fazer algo.' },
      { term: 'Sentido horário', meaning: 'Girar para o mesmo lado dos ponteiros do relógio.' },
      { term: 'Pontos cardeais', meaning: 'As quatro direções principais: norte, sul, leste e oeste.' },
    ],
    checks: [
      { statement: '0,5 hora é o mesmo que 50 minutos.', answer: false, why: '0,5 × 60 = 30 minutos.' },
      { statement: 'Se hoje é terça, daqui a 100 dias será quinta.', answer: true, why: '100 ÷ 7 sobra 2, e terça mais 2 dias é quinta.' },
      { statement: 'De frente para o norte, girar 90 graus no sentido horário deixa você de frente para o leste.', answer: true, why: '0 + 90 = 90, que é o leste.' },
    ],
  },
  // ------------------------------------------------------------------
  // Conhecimentos institucionais
  // ------------------------------------------------------------------
  'cap.inst.01:administracao-publica': {
    pages: [
      {
        title: 'As regras do serviço público',
        text: 'A **Constituição Federal** é a lei mais importante do país. O **art. 37** dela traz as regras básicas de todo o serviço público. O Tribunal de Contas usa essas regras para avaliar se um gasto ou uma nomeação seguiu a lei. A prova cobra o texto ao pé da letra.',
      },
      {
        title: 'Os cinco princípios: LIMPE',
        text: 'Um **princípio** é uma regra-mãe, que guia todas as outras. O art. 37 traz cinco: **legalidade**, **impessoalidade**, **moralidade**, **publicidade** e **eficiência**. Para lembrar, junte as iniciais: LIMPE. Eles valem para todos os Poderes, na União, nos Estados, no Distrito Federal e nos Municípios.',
      },
      {
        title: 'O que cada um quer dizer',
        text: 'Legalidade: o gestor só faz o que a lei autoriza. Impessoalidade: agir para todos, sem favorecer ninguém. Moralidade: agir com ética e honestidade. Publicidade: mostrar os atos ao público, salvo sigilo previsto em lei. Eficiência: o melhor resultado com o dinheiro disponível.',
      },
      {
        title: 'Concurso público',
        text: 'Para ocupar um **cargo efetivo**, o cargo fixo de carreira, é preciso passar em **concurso público**. A exceção é o **cargo em comissão**, de livre nomeação e exoneração. O concurso vale por até dois anos e pode ser prorrogado uma vez, pelo mesmo período. Exemplo: validade de 2 anos, mais 2 de prorrogação.',
      },
      {
        title: 'Propaganda sem promoção pessoal',
        text: 'A propaganda do governo deve educar, informar ou orientar. Ela não pode ter nomes, símbolos ou imagens que promovam uma autoridade. Exemplo: uma placa de obra com o nome do prefeito em destaque fere essa regra. A obra é do poder público, não da pessoa.',
      },
      {
        title: 'Acumular cargos',
        text: 'Em regra, é proibido receber por dois cargos públicos ao mesmo tempo. A Constituição abre exceções, desde que os horários não choquem. São elas: dois cargos de professor; um de professor e outro técnico ou científico; ou dois cargos de profissionais de saúde com profissão regulamentada.',
      },
      {
        title: 'Resumindo',
        text: 'O art. 37 traz os princípios LIMPE: legalidade, impessoalidade, moralidade, publicidade e eficiência. Cargo efetivo exige concurso, que vale até dois anos e pode ser prorrogado uma vez.',
      },
    ],
    words: [
      { term: 'Constituição Federal', meaning: 'A lei mais importante do país; todas as outras seguem ela.' },
      { term: 'Princípio', meaning: 'Regra-mãe que guia todas as outras regras.' },
      { term: 'LIMPE', meaning: 'Iniciais de legalidade, impessoalidade, moralidade, publicidade e eficiência.' },
      { term: 'Cargo efetivo', meaning: 'Cargo fixo de carreira, ocupado por quem passou em concurso.' },
      { term: 'Cargo em comissão', meaning: 'Cargo de livre nomeação e exoneração, sem concurso.' },
      { term: 'Prorrogar', meaning: 'Esticar um prazo por mais um tempo.' },
    ],
    checks: [
      { statement: 'O concurso público pode ser prorrogado duas vezes.', answer: false, why: 'Ele pode ser prorrogado só uma vez, pelo mesmo período.' },
      { statement: 'Eficiência é um dos princípios do art. 37.', answer: true, why: 'É o "E" de LIMPE.' },
      { statement: 'A propaganda do governo pode trazer o nome do prefeito para promovê-lo.', answer: false, why: 'É proibido usar nomes ou imagens para promoção pessoal.' },
    ],
  },
  'cap.inst.01:servidores': {
    pages: [
      {
        title: 'A vida do servidor',
        text: 'Os artigos 38 a 41 da Constituição tratam de situações da vida do servidor público. Por exemplo: o que acontece se ele for eleito, quando ele ganha estabilidade e como pode perder o cargo. A prova costuma cobrar isso em pequenos casos práticos.',
      },
      {
        title: 'Servidor eleito',
        text: 'Um **mandato eletivo** é o período de quem foi eleito, como deputado ou vereador. Se o servidor vira deputado, ele se afasta do cargo. Se vira prefeito, também se afasta, mas pode escolher qual salário receber. Se vira vereador e os horários combinam, ele pode exercer os dois.',
      },
      {
        title: 'O que é estabilidade?',
        text: '**Estabilidade** é a proteção de não ser demitido sem um motivo previsto. O servidor fica estável após três anos de efetivo exercício. Para isso, precisa ocupar cargo efetivo e ter passado em concurso. Também precisa ser aprovado numa avaliação especial de desempenho, feita por uma comissão.',
      },
      {
        title: 'Cargo em comissão não dá estabilidade',
        text: 'Quem ocupa **cargo em comissão**, de livre nomeação, nunca fica estável, mesmo depois de três anos. A estabilidade é só para quem ocupa cargo efetivo e entrou por concurso.',
      },
      {
        title: 'Como o estável perde o cargo',
        text: 'O servidor estável só perde o cargo em três casos do art. 41. Um: decisão judicial definitiva, sem mais recurso. Dois: processo administrativo com direito de defesa. Três: avaliação periódica de desempenho, na forma de lei complementar, também com direito de defesa.',
      },
      {
        title: 'Cargo extinto',
        text: 'Se o cargo for extinto, o estável não é demitido. Ele fica em **disponibilidade**: para de trabalhar e recebe um valor proporcional ao tempo de serviço, até ir para outro cargo. Exemplo: proporcional quer dizer que quem trabalhou mais tempo recebe mais.',
      },
      {
        title: 'Resumindo',
        text: 'O servidor fica estável após três anos, em cargo efetivo, com concurso e avaliação especial. Cargo em comissão nunca dá estabilidade. Com cargo extinto, o estável fica em disponibilidade, com pagamento proporcional.',
      },
    ],
    words: [
      { term: 'Mandato eletivo', meaning: 'Período de trabalho de quem foi eleito, como vereador.' },
      { term: 'Estabilidade', meaning: 'Proteção de não ser demitido sem um motivo previsto.' },
      { term: 'Efetivo exercício', meaning: 'Tempo realmente trabalhado no cargo.' },
      { term: 'Avaliação especial', meaning: 'Avaliação feita por comissão para o servidor ganhar estabilidade.' },
      { term: 'Disponibilidade', meaning: 'O estável para de trabalhar e recebe valor proporcional ao tempo de serviço.' },
      { term: 'Proporcional', meaning: 'Que cresce junto: mais tempo de serviço, valor maior.' },
    ],
    checks: [
      { statement: 'O servidor fica estável após três anos de efetivo exercício.', answer: true, why: 'É o prazo do art. 41.' },
      { statement: 'Quem ocupa cargo em comissão fica estável depois de três anos.', answer: false, why: 'Estabilidade é só para cargo efetivo com concurso.' },
      { statement: 'O servidor eleito vereador sempre precisa se afastar do cargo.', answer: false, why: 'Se os horários combinam, ele pode exercer os dois.' },
    ],
  },
  'cap.inst.01:fiscalizacao': {
    pages: [
      {
        title: 'O coração do Tribunal',
        text: 'Os artigos 70 a 75 da Constituição explicam o que um Tribunal de Contas faz. O texto fala do Congresso Nacional e do TCU, o Tribunal de Contas da União. O art. 75 manda usar o mesmo modelo nos Estados. Em Goiás, leia Assembleia Legislativa e TCE-GO.',
      },
      {
        title: 'O que é controle externo?',
        text: '**Controle externo** é a fiscalização feita de fora sobre o uso do dinheiro público. Quem o exerce é o Poder Legislativo, com o auxílio do Tribunal de Contas. Também existe o **controle interno**, que cada Poder faz dentro da própria casa.',
      },
      {
        title: 'Quem presta contas?',
        text: '**Prestar contas** é mostrar como usou o dinheiro que recebeu. Pela Constituição, presta contas qualquer pessoa, pública ou privada, que use, guarde ou administre dinheiro, bens ou valores públicos. Exemplo: uma ONG que recebe dinheiro público por convênio precisa prestar contas.',
      },
      {
        title: 'Apreciar não é julgar',
        text: 'Esta é a pegadinha mais comum. O Tribunal **aprecia** as contas do Presidente da República: dá uma opinião, o **parecer prévio**, em sessenta dias. Quem julga essas contas é o Congresso. O próprio Tribunal **julga** as contas de quem administra dinheiro público.',
      },
      {
        title: 'Ato ou contrato?',
        text: 'Um **ato** é uma decisão do gestor. Se um ato irregular não for corrigido, o próprio Tribunal pode **sustar**, ou seja, suspender, sua execução. Se for um **contrato**, quem susta é o Legislativo. O Tribunal só decide se, em noventa dias, o Legislativo ou o Executivo não tomarem as medidas.',
      },
      {
        title: 'Qualquer pessoa pode denunciar',
        text: 'Qualquer cidadão, partido político, associação ou sindicato pode **denunciar** irregularidades ao Tribunal de Contas. O Tribunal também pode aplicar multas. Nos Estados, o Tribunal de Contas tem sete Conselheiros, que são os seus julgadores.',
      },
      {
        title: 'Resumindo',
        text: 'O Legislativo faz o controle externo com o auxílio do Tribunal de Contas. O Tribunal só aprecia as contas do chefe do Executivo e julga as dos administradores. Quem susta contrato é o Legislativo.',
      },
    ],
    words: [
      { term: 'Controle externo', meaning: 'Fiscalização feita de fora sobre o uso do dinheiro público.' },
      { term: 'Controle interno', meaning: 'Fiscalização que cada Poder faz dentro da própria casa.' },
      { term: 'Prestar contas', meaning: 'Mostrar como usou o dinheiro público que recebeu.' },
      { term: 'Parecer prévio', meaning: 'Opinião do Tribunal sobre as contas do chefe do Executivo.' },
      { term: 'Apreciar', meaning: 'Dar uma opinião, sem decidir de forma final.' },
      { term: 'Sustar', meaning: 'Suspender, fazer parar.' },
      { term: 'Conselheiro', meaning: 'Julgador do Tribunal de Contas de um Estado.' },
    ],
    checks: [
      { statement: 'O Tribunal de Contas julga as contas anuais do Presidente da República.', answer: false, why: 'Ele só aprecia, com parecer prévio; quem julga é o Congresso.' },
      { statement: 'Uma ONG que recebe dinheiro público precisa prestar contas.', answer: true, why: 'Qualquer pessoa que use dinheiro público presta contas.' },
      { statement: 'Qualquer cidadão pode denunciar irregularidades ao Tribunal de Contas.', answer: true, why: 'A Constituição dá esse direito a qualquer cidadão.' },
    ],
  },
  'cap.inst.02:tce-go': {
    pages: [
      {
        title: 'As leis do próprio Tribunal',
        text: 'O edital cobra três normas sobre o TCE-GO: a **Constituição do Estado de Goiás**, a **Lei Orgânica** do Tribunal e o **Regimento Interno**, que é o seu manual de funcionamento. Elas repetem, para Goiás, o modelo da Constituição Federal. O texto oficial deve ser conferido antes da prova.',
      },
      {
        title: 'O que o TCE-GO faz',
        text: 'O TCE-GO ajuda a **Assembleia Legislativa**, os deputados estaduais, a fiscalizar o dinheiro público. Ele aprecia as contas do Governador com um parecer prévio, em sessenta dias. Quem julga essas contas é a Assembleia. O próprio Tribunal julga as contas dos administradores.',
      },
      {
        title: 'Quem compõe o Tribunal',
        text: 'O TCE-GO tem sete **conselheiros**, que são os seus julgadores. A sede fica na Capital, e ele atua em todo o Estado. Atenção: em Goiás também existe o TCM-GO, o Tribunal de Contas dos Municípios. São dois órgãos diferentes.',
      },
      {
        title: 'Como as contas são julgadas',
        text: 'Pela Lei Orgânica, as contas podem ser **regulares**: tudo certo, e o responsável recebe **quitação**, ou seja, fica livre. **Regulares com ressalva**: houve só uma falha de forma, sem prejuízo ao dinheiro público. **Irregulares**: pode haver ordem de devolver o dinheiro e multa.',
      },
      {
        title: 'Quando não dá para julgar',
        text: 'As contas são **iliquidáveis** quando um **caso fortuito ou de força maior**, algo que ninguém podia evitar, torna impossível julgar. Exemplo: os documentos se perderam numa enchente que ninguém poderia evitar. Nesse caso, o Tribunal manda **trancar** as contas, ou seja, encerrá-las sem dizer se estão certas ou erradas.',
      },
      {
        title: 'Resumindo',
        text: 'O TCE-GO tem sete conselheiros e ajuda a Assembleia. Ele aprecia as contas do Governador e julga as dos administradores. Falha só de forma, sem prejuízo, leva a contas regulares com ressalva.',
      },
    ],
    words: [
      { term: 'Lei Orgânica', meaning: 'Lei principal que organiza o Tribunal.' },
      { term: 'Regimento Interno', meaning: 'Manual de funcionamento do Tribunal.' },
      { term: 'Assembleia Legislativa', meaning: 'Casa dos deputados estaduais.' },
      { term: 'Quitação', meaning: 'Declaração de que o responsável está livre, sem dívida.' },
      { term: 'Ressalva', meaning: 'Observação sobre uma falha de forma, sem prejuízo.' },
      { term: 'Contas iliquidáveis', meaning: 'Contas impossíveis de julgar por caso fortuito ou força maior.' },
      { term: 'TCM-GO', meaning: 'Tribunal de Contas dos Municípios de Goiás, outro órgão.' },
    ],
    checks: [
      { statement: 'O TCE-GO tem sete conselheiros.', answer: true, why: 'É a composição prevista na Constituição de Goiás.' },
      { statement: 'O TCE-GO e o TCM-GO são o mesmo órgão.', answer: false, why: 'São dois tribunais diferentes.' },
      { statement: 'Uma falha só de forma, sem prejuízo, leva a contas irregulares.', answer: false, why: 'Nesse caso as contas são regulares com ressalva.' },
    ],
  },
  'cap.inst.02:pessoal': {
    pages: [
      {
        title: 'As leis da sua carreira',
        text: 'Duas leis de Goiás vão reger sua vida de servidor. A **Lei 15.122/2005** diz em que carreira você estará no TCE-GO. A **Lei 20.756/2020** é o **estatuto**: a lei dos direitos, deveres e punições dos servidores do Estado. As duas já mudaram várias vezes, então confira o texto atual.',
      },
      {
        title: 'Os cargos do TCE-GO',
        text: 'A Lei 15.122/2005 cria três cargos efetivos: **Analista de Controle Externo**, de nível superior; **Técnico de Controle Externo**; e **Auxiliar de Controle Externo**. Os cargos são organizados em classes e padrões, como degraus de uma escada. O servidor sobe conforme as regras do Tribunal.',
      },
      {
        title: 'O período de teste',
        text: 'O **estágio probatório** é um período de teste depois que o servidor entra. No estatuto de Goiás, ele dura três anos de efetivo exercício. Serve para ver se o servidor é apto para o cargo. Quem não é aprovado é exonerado, ou seja, sai do cargo. Se já era estável em outro cargo, volta para ele.',
      },
      {
        title: 'O que é avaliado',
        text: 'No estágio probatório, o estatuto avalia cinco pontos: iniciativa; assiduidade e pontualidade, que é não faltar e chegar na hora; relacionamento com os colegas; eficiência; e compromisso com o trabalho.',
      },
      {
        title: 'As punições',
        text: 'O estatuto lista sete **penalidades**, que são punições. Algumas: **advertência**, um aviso por escrito para faltas leves; **suspensão**, de até 90 dias; e **demissão**, para faltas graves. Existe também **multa**, só para aposentados ou servidores em disponibilidade, por falta cometida quando trabalhavam.',
      },
      {
        title: 'Resumindo',
        text: 'Os cargos do TCE-GO são Analista, Técnico e Auxiliar de Controle Externo. O estágio probatório no estatuto de Goiás dura três anos. A suspensão vai até 90 dias.',
      },
    ],
    words: [
      { term: 'Estatuto', meaning: 'Lei dos direitos, deveres e punições dos servidores.' },
      { term: 'Estágio probatório', meaning: 'Período de teste do servidor, de três anos em Goiás.' },
      { term: 'Exonerar', meaning: 'Tirar a pessoa do cargo, sem ser punição.' },
      { term: 'Assiduidade', meaning: 'Não faltar ao trabalho.' },
      { term: 'Penalidade', meaning: 'Punição aplicada ao servidor que comete uma falta.' },
      { term: 'Advertência', meaning: 'Punição mais leve: um aviso por escrito.' },
    ],
    checks: [
      { statement: 'O estágio probatório no estatuto de Goiás dura dois anos.', answer: false, why: 'Ele dura três anos de efetivo exercício.' },
      { statement: 'Assiduidade e pontualidade são avaliadas no estágio probatório.', answer: true, why: 'Estão entre os cinco pontos avaliados.' },
      { statement: 'Técnico de Controle Externo é um dos cargos do TCE-GO.', answer: true, why: 'A Lei 15.122/2005 cria Analista, Técnico e Auxiliar.' },
    ],
  },
  'cap.inst.02:etica-resolucoes': {
    pages: [
      {
        title: 'As normas da casa',
        text: 'Além das leis, o TCE-GO tem normas próprias. Uma é o **Código de Ética**, as regras de bom comportamento dos servidores. As outras são **resoluções**: decisões escritas do Tribunal sobre sua organização. Os textos oficiais não foram lidos aqui e devem ser conferidos antes da prova.',
      },
      {
        title: 'O Código de Ética',
        text: 'O Código de Ética foi criado em 2014. Segundo notícia do próprio Tribunal, ele foi atualizado em 2026, com regras sobre conduta em redes sociais e contra assédio e discriminação. Também passou a valer para estagiários e prestadores de serviço. Confira qual versão vale para a prova.',
      },
      {
        title: 'Cada resolução, um assunto',
        text: 'Uma resolução é uma regra interna do Tribunal. O edital diz o assunto de cada uma. A RA 14/2025 trata da estrutura do Tribunal. A RA 17/2024 trata da segurança da informação. A RN 5/2024 trata da proteção de dados pessoais. A RA 24/2024 trata do uso de inteligência artificial.',
      },
      {
        title: 'Mais duas para lembrar',
        text: 'A RA 5/2024 trata da política de gestão de pessoas. A RA 19/2024 trata da política de comunicação. Cuidado com a pegadinha dos números iguais: RA 19/2024 é comunicação. Já a RA 19/2022 era a antiga norma da estrutura, que foi revogada, ou seja, deixou de valer.',
      },
      {
        title: 'Quem dirige o Tribunal',
        text: 'Pela RA 14/2025, o **corpo diretivo**, o grupo que dirige o Tribunal, tem três partes: a Presidência, a Vice-Presidência e a Corregedoria-Geral. Para estudar, baixe cada resolução no sistema de normas do Tribunal e anote o objetivo e os responsáveis.',
      },
      {
        title: 'Resumindo',
        text: 'O Código de Ética traz as regras de conduta, e cada resolução trata de um assunto. RN 5/2024 é dados pessoais e RA 24/2024 é inteligência artificial. Confira os textos oficiais antes da prova.',
      },
    ],
    words: [
      { term: 'Código de Ética', meaning: 'Regras de bom comportamento para quem trabalha no Tribunal.' },
      { term: 'Resolução', meaning: 'Decisão escrita do Tribunal sobre sua própria organização.' },
      { term: 'RA', meaning: 'Resolução Administrativa, um tipo de resolução do Tribunal.' },
      { term: 'Revogar', meaning: 'Fazer uma norma deixar de valer.' },
      { term: 'Dados pessoais', meaning: 'Informações que identificam uma pessoa, como nome e CPF.' },
      { term: 'Corpo diretivo', meaning: 'Grupo que dirige o Tribunal: Presidência, Vice e Corregedoria.' },
    ],
    checks: [
      { statement: 'A RA 24/2024 trata do uso de inteligência artificial.', answer: true, why: 'É o assunto indicado pelo edital.' },
      { statement: 'A RN 5/2024 trata de inteligência artificial.', answer: false, why: 'A RN 5/2024 trata da proteção de dados pessoais.' },
      { statement: 'A RA 19/2024 trata da política de comunicação.', answer: true, why: 'A RA 19/2022 é que era a antiga norma da estrutura.' },
    ],
  },
};
