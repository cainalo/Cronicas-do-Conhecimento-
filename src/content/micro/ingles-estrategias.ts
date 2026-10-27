// Microaulas graduais de cap.ingles.01: estratégias de leitura, coesão e gramática técnica.
// Cada seção começa com contexto histórico verificável; a revisão editorial humana continua pendente.
import type { MicroLesson } from '@/content/types';
import type { MissionActivity } from '@/lib/activities';

type Section = 'estrategias' | 'coesao' | 'gramatica';
type Q = {
  prompt: string;
  correct: string;
  wrong: [string, string];
  answer: 0 | 1 | 2;
  why: string;
};
type LessonDef = {
  id: string;
  section: Section;
  group: string;
  order: number;
  title: string;
  history: string;
  core: string;
  application: string;
  q1: Q;
  q2: Q;
  transfer: Q;
  examQuestion: string;
  summary: [string, string, string];
};

const base: Record<Section, { chapterId: string; sectionId: Section }> = {
  estrategias: { chapterId: 'cap.ingles.01', sectionId: 'estrategias' },
  coesao: { chapterId: 'cap.ingles.01', sectionId: 'coesao' },
  gramatica: { chapterId: 'cap.ingles.01', sectionId: 'gramatica' },
};

function activity(q: Q, id: string): MissionActivity {
  const options: string[] = [];
  const reasons: string[] = [];
  const spare = [0, 1, 2].filter((i) => i !== q.answer);
  options[q.answer] = q.correct;
  reasons[q.answer] = q.why;
  options[spare[0]] = q.wrong[0];
  reasons[spare[0]] = 'Essa alternativa não é sustentada pelas palavras do texto.';
  options[spare[1]] = q.wrong[1];
  reasons[spare[1]] = 'Essa leitura confunde a função ou o sentido da expressão.';
  return {
    kind: 'choice',
    id,
    prompt: q.prompt,
    options: options.map((text, i) => ({ text, why: reasons[i] })),
    answer: q.answer,
    errorKind: 'conceito',
  };
}

function variant(q: Q, prefix: string): Q {
  return { ...q, prompt: prefix + q.prompt, wrong: [q.wrong[1], q.wrong[0] + ' — sem reler o contexto'] };
}

function build(l: LessonDef): MicroLesson {
  const first = {
    id: 'base',
    part: l.order === 1 ? 'A história' : 'Ideia principal',
    title: l.order === 1 ? 'Como essa estratégia se desenvolveu' : l.title,
    goal: 'Reconhecer a ideia de ' + l.title + ' e quando ela ajuda a ler documentação.',
    explain: (l.history ? l.history + '\n\n' : '') + l.core,
    art: 'livro' as const,
    check: activity(l.q1, l.id + '-base-check'),
    recovery: {
      explain: 'Retome a estratégia: ' + l.core,
      check: activity(variant(l.q1, 'Em outro trecho: '), l.id + '-base-recovery'),
    },
  };
  const second = {
    id: 'aplicar',
    part: 'Aplicação prática',
    title: 'Ler um trecho de documentação',
    goal: 'Usar a estratégia em uma situação curta sem traduzir todas as palavras.',
    explain: l.application,
    art: 'engrenagem' as const,
    check: activity(l.q2, l.id + '-apply-check'),
    recovery: {
      explain: 'Leia de novo procurando a pista específica indicada no enunciado. ' + l.application,
      check: activity(variant(l.q2, 'Agora, em uma nova situação: '), l.id + '-apply-recovery'),
    },
  };
  const third = {
    id: 'transferir',
    part: 'Síntese',
    title: 'Transferir para outro texto',
    goal: 'Escolher a pista certa e justificar a interpretação com evidências.',
    explain:
      'Antes de escolher uma tradução, identifique qual pergunta precisa responder. Procure a frase que contém a informação, observe conectivos e pronomes e compare a interpretação com o restante do parágrafo. Uma palavra isolada pode enganar; a relação entre as frases costuma mostrar o sentido. Em documentação técnica, confira também limites, exceções e condições: palavras como only, unless e must alteram o alcance de uma instrução.',
    art: 'revisao' as const,
    check: activity(l.transfer, l.id + '-transfer-check'),
    recovery: {
      explain:
        'Na recuperação, separe o trecho citado da hipótese que você fez. Substitua o pronome ou a palavra pelo significado candidato e veja se a frase continua coerente. Se houver uma condição ou contraste, verifique os dois lados antes de concluir.',
      check: activity(variant(l.transfer, 'Em um novo trecho: '), l.id + '-transfer-recovery'),
    },
  };
  return {
    ...base[l.section],
    id: l.id,
    series: { id: l.group, order: l.order },
    title: l.title,
    opening: activity({ ...l.q1, prompt: 'Antes da explicação: ' + l.q1.prompt }, l.id + '-opening'),
    steps: [first, second, third],
    consolidation: [
      {
        kind: 'sort',
        id: 'classificar',
        prompt: 'Classifique as leituras sobre ' + l.title + '.',
        categories: ['Sustentada pelo texto', 'Leitura incorreta'],
        items: [
          { text: l.q1.correct, cat: 0, why: l.q1.why },
          { text: l.q1.wrong[0], cat: 1, why: 'O contexto não sustenta essa interpretação.' },
          { text: l.q2.wrong[1], cat: 1, why: 'Essa alternativa não usa a pista apresentada.' },
        ],
      },
      {
        kind: 'fix',
        id: 'depurar',
        prompt: 'Uma anotação de leitura contém um erro. Toque na linha incorreta.',
        lines: [l.q1.correct, l.q2.correct, l.q2.wrong[1]],
        bug: 2,
        why: l.q2.why,
        fixed: l.q2.correct,
        errorKind: 'conceito',
      },
      {
        kind: 'compare',
        id: 'comparar',
        prompt: 'Qual interpretação é mais bem justificada?',
        scenarios: [
          { title: 'Leitura A', body: l.q2.correct + ' ' + l.q2.why },
          { title: 'Leitura B', body: 'Escolher um sentido conhecido de uma palavra sem conferir o restante da frase.' },
        ],
        answer: 0,
        why: 'A leitura precisa combinar com as pistas gramaticais e o sentido do parágrafo.',
        errorKind: 'procedimento',
      },
    ],
    exam: [{ kind: 'exam', id: l.id + '-exam', prompt: 'Questão de fixação', questionId: l.examQuestion }],
    summary: [...l.summary],
  };
}

const lessons: LessonDef[] = [
  {
    id: 'ingles.estrategias.1', section: 'estrategias', group: 'ingles.estrategias', order: 1,
    title: 'Skimming e scanning: duas formas de procurar informação',
    history: 'Em 1969, a pesquisadora Martha J. Maxwell apresentou um trabalho sobre o ensino de skimming e scanning a estudantes universitários; em 1972, publicou uma discussão sobre as bases e os métodos desse treinamento. Esses registros não são a origem absoluta das técnicas, mas documentam seu estudo como habilidades que podem ser ensinadas. A ideia prática é simples: leitores não precisam tratar todo texto como se cada palavra tivesse a mesma importância.',
    core: 'Skimming é percorrer rapidamente títulos, início, fim e palavras repetidas para descobrir a ideia geral. Scanning é procurar um dado delimitado, como uma data, um tamanho máximo ou o nome de um recurso. Em uma documentação de API, use skimming para saber para que serve a página e scanning para encontrar o parâmetro, código de erro ou limite de requisição. A pergunta define a estratégia.',
    application: 'Se você precisa saber por que um portal ficará indisponível, leia o título e as primeiras frases para captar o assunto. Se precisa descobrir o horário da manutenção, procure números, horários e palavras como from, until ou during. Não é obrigatório traduzir cada palavra para localizar um fato explícito.',
    q1: {
      prompt: 'Você só precisa descobrir o assunto geral de uma página técnica. Qual estratégia ajuda primeiro?',
      correct: 'Skimming: observar títulos, começo e palavras que resumem o assunto.',
      wrong: ['Traduzir palavra por palavra desde a primeira linha.', 'Procurar apenas um número, sem entender o tema da página.'],
      answer: 0, why: 'Skimming busca a ideia geral e ajuda a decidir quais partes merecem leitura mais atenta.',
    },
    q2: {
      prompt: 'Você quer encontrar o tamanho máximo de um arquivo em uma especificação. Qual estratégia é mais direta?',
      correct: 'Scanning: procurar números e unidades como MB, GB ou limites.',
      wrong: ['Ler lentamente todo o documento antes de procurar o tamanho.', 'Ignorar valores numéricos e deduzir pelo título.'],
      answer: 0, why: 'Scanning localiza uma informação específica, por exemplo “smaller than 10 MB”.',
    },
    transfer: {
      prompt: 'Uma página tem 30 parágrafos, mas você precisa apenas da versão mínima do sistema. O que fazer?',
      correct: 'Procurar a pergunta ou o termo específico e varrer o texto atrás da versão.',
      wrong: ['Decidir pela versão mais alta sem ler a especificação.', 'Ler só o primeiro parágrafo e assumir que contém todos os números.'],
      answer: 0, why: 'A busca por um dado delimitado é scanning; confirme a unidade e as condições adjacentes.',
    },
    examQuestion: 'q.ingles.01.001',
    summary: ['Skimming procura a ideia geral; scanning procura um detalhe específico.', 'A pergunta define qual estratégia usar.', 'Números, títulos, limites e palavras repetidas são pistas úteis em documentação.'],
  },
  {
    id: 'ingles.estrategias.2', section: 'estrategias', group: 'ingles.estrategias', order: 2,
    title: 'Cognatos e falsos cognatos',
    history: '',
    core: 'Cognatos são palavras de línguas diferentes com origem comum e forma ou sentido semelhante, como information e informação. Falsos cognatos parecem familiares, mas têm outro sentido no contexto. Actually costuma significar “na verdade”, eventually “por fim/com o tempo” e library “biblioteca” (inclusive de código), não “atualmente”, “eventualmente” e “livraria”. A semelhança é uma pista, nunca uma prova suficiente.',
    application: 'Ao encontrar actually em “Actually, the server is offline”, a frase provavelmente corrige uma informação anterior: “Na verdade, o servidor está offline”. Compare o trecho antes e depois da palavra. Para eventually, observe se ela aponta para algo que ocorrerá com o tempo; para library, veja se a página fala de funções e dependências de software.',
    q1: {
      prompt: 'Em “Actually, the old module was replaced last year”, qual é o sentido de actually?',
      correct: 'Na verdade; a palavra corrige uma crença anterior.',
      wrong: ['Atualmente; a frase só indica o tempo presente.', 'Ocasionalmente; a substituição acontece de vez em quando.'],
      answer: 0, why: 'Actually costuma introduzir uma correção ou esclarecimento, não significa “atualmente”.',
    },
    q2: {
      prompt: 'Uma página de programação diz “Install the library and import the package”. O que library significa?',
      correct: 'Biblioteca de código que oferece funções ou componentes reutilizáveis.',
      wrong: ['Livraria física onde se vendem livros.', 'Lugar para guardar arquivos antigos sem executar código.'],
      answer: 0, why: 'O contexto install/import/package indica uma biblioteca de software.',
    },
    transfer: {
      prompt: 'O texto diz “The migration will eventually finish”. Como interpretar eventually?',
      correct: 'A migração terminará por fim ou com o tempo.',
      wrong: ['A migração termina ocasionalmente, em alguns casos.', 'A migração terminou atualmente, no passado.'],
      answer: 0, why: 'Eventually aponta para um resultado futuro depois de algum tempo; occasionally seria “ocasionalmente”.',
    },
    examQuestion: 'q.ingles.01.002',
    summary: ['Cognatos ajudam a inferir sentido, mas a semelhança pode enganar.', 'Actually = na verdade; eventually = por fim/com o tempo; library = biblioteca.', 'Confira a função da palavra na frase antes de escolher a tradução.'],
  },
  {
    id: 'ingles.estrategias.3', section: 'estrategias', group: 'ingles.estrategias', order: 3,
    title: 'Scanning para encontrar limites e exceções',
    history: '',
    core: 'Documentação técnica frequentemente descreve condições por números, unidades e expressões curtas: up to (até/no máximo), smaller than (menor que), at least (pelo menos), only (somente) e does not support (não oferece suporte). Um único detalhe pode mudar a interpretação: “up to 20 files” significa no máximo vinte arquivos, não pelo menos vinte.',
    application: 'Leia uma especificação procurando tanto o dado principal quanto a negação e a unidade ao lado dele. Se o texto diz “smaller than 10 MB”, o limite é estritamente menor que 10 MB; exatamente 10 MB não satisfaz a frase. Em CSV, JSON e XML, são os nomes dos formatos e os verbos support/does not support que determinam a compatibilidade.',
    q1: {
      prompt: '“Up to 20 files can be processed” estabelece qual limite?',
      correct: 'No máximo 20 arquivos.',
      wrong: ['No mínimo 20 arquivos.', 'Exatamente 20 arquivos em todos os lotes.'],
      answer: 0, why: 'Up to estabelece um teto; o lote pode conter menos de vinte arquivos.',
    },
    q2: {
      prompt: 'Uma ferramenta exige arquivos “smaller than 10 MB”. Qual tamanho atende literalmente à regra?',
      correct: '9 MB, pois é menor que 10 MB.',
      wrong: ['10 MB, pois igualdade é menor que o limite.', '12 MB, pois arquivos maiores podem ser comprimidos automaticamente.'],
      answer: 0, why: 'Smaller than exclui a igualdade e qualquer valor acima do limite.',
    },
    transfer: {
      prompt: 'A documentação diz “The service does not support XML”. O que essa frase informa?',
      correct: 'XML não é compatível com o serviço, conforme a especificação.',
      wrong: ['XML é aceito, mas pode ficar lento.', 'O serviço oferece suporte apenas a XML.'],
      answer: 0, why: 'A negação does not support exclui o formato da lista de compatibilidade.',
    },
    examQuestion: 'q.ingles.01.003',
    summary: ['Scanning localiza limites, formatos, datas e condições explícitas.', 'Up to = no máximo; smaller than = estritamente menor que.', 'Confira negação e unidade antes de decidir se algo é permitido.'],
  },
  {
    id: 'ingles.estrategias.4', section: 'estrategias', group: 'ingles.estrategias', order: 4,
    title: 'Inferir o sentido pelo contexto',
    history: '',
    core: 'Quando uma palavra é desconhecida, procure pistas de contraste, causa, exemplos e reformulações ao redor dela. Em “The old process was cumbersome: it required twelve manual steps. The new one, by contrast, is simple”, a expressão após os dois-pontos explica o termo difícil e by contrast indica oposição. Essa leitura é mais segura do que escolher a primeira tradução parecida.',
    application: 'Procure marcadores como for example, because, therefore, unlike e by contrast. Veja se a frase seguinte explica o termo, fornece um exemplo ou apresenta o oposto. Em textos técnicos, comandos, números e efeitos descritos podem revelar o sentido de um adjetivo mesmo sem dicionário.',
    q1: {
      prompt: 'O processo foi chamado de “cumbersome”, e o texto diz que exigia doze etapas manuais e falhava com frequência. O que isso sugere?',
      correct: 'Que era complicado ou trabalhoso.',
      wrong: ['Que era confiável e simples.', 'Que era econômico e automatizado.'],
      answer: 0, why: 'As muitas etapas e falhas descrevem um processo pesado e difícil de usar.',
    },
    q2: {
      prompt: 'Em uma frase, “by contrast” normalmente avisa que o autor vai',
      correct: 'apresentar uma diferença ou oposição em relação ao que veio antes.',
      wrong: ['listar outra vantagem semelhante.', 'indicar a causa obrigatória da afirmação anterior.'],
      answer: 0, why: 'By contrast introduz contraste, assim como in contrast ou in comparison em contextos adequados.',
    },
    transfer: {
      prompt: 'Você não conhece a palavra “robust”, mas a frase diz que o serviço continua funcionando durante falhas de rede. Qual sentido o contexto sugere?',
      correct: 'Resistente ou capaz de lidar bem com falhas.',
      wrong: ['Colorido e decorativo.', 'Necessariamente barato, sem relação com falhas.'],
      answer: 0, why: 'O efeito descrito — continuar funcionando durante falhas — explica o sentido técnico de robust.',
    },
    examQuestion: 'q.ingles.01.004',
    summary: ['Pistas como exemplos, contraste e explicação ajudam a inferir uma palavra desconhecida.', 'By contrast indica oposição; os dois-pontos podem introduzir uma explicação.', 'A interpretação precisa combinar com a situação descrita.'],
  },
  {
    id: 'ingles.coesao.1', section: 'coesao', group: 'ingles.coesao', order: 1,
    title: 'Conectivos: como as frases se ligam',
    history: 'Em 1976, M. A. K. Halliday e Ruqaiya Hasan publicaram Cohesion in English, obra que organizou o estudo das relações que conectam partes de um texto, incluindo referência, repetição lexical e conjunções. O livro não inventou os conectivos; ajudou a descrever como recursos linguísticos fazem frases se relacionarem e formarem uma unidade compreensível.',
    core: 'Um conectivo sinaliza a relação lógica entre ideias. However e nevertheless marcam contraste; moreover acrescenta informação; therefore apresenta uma conclusão; because introduz causa; whereas compara diferenças. O leitor deve interpretar a relação, não apenas traduzir a palavra. Se a segunda frase limita uma vantagem anunciada na primeira, procure um conector de contraste.',
    application: 'Em “The method is faster. However, it is not compatible with older devices”, a primeira frase anuncia uma vantagem e a segunda limita essa vantagem. However pode ser trocado por nevertheless sem alterar a relação principal. Therefore não seria equivalente, pois indicaria uma conclusão, não uma ressalva.',
    q1: {
      prompt: '“The method is faster. However, it is not compatible with old devices.” O que however sinaliza?',
      correct: 'Contraste: uma vantagem seguida de uma limitação.',
      wrong: ['Uma causa que explica por que o método é rápido.', 'Uma informação adicional no mesmo sentido, sem oposição.'],
      answer: 0, why: 'However equivale a “contudo/no entanto” e introduz uma ideia que contrasta com a anterior.',
    },
    q2: {
      prompt: 'Qual conectivo pode substituir however no início dessa frase mantendo o contraste?',
      correct: 'Nevertheless.',
      wrong: ['Therefore.', 'Moreover.'],
      answer: 0, why: 'Nevertheless também significa “apesar disso/no entanto”; therefore conclui e moreover acrescenta.',
    },
    transfer: {
      prompt: '“The patch is small. Moreover, it fixes two security defects.” Qual relação moreover apresenta?',
      correct: 'Adição: acrescenta outra informação sobre o patch.',
      wrong: ['Contraste: invalida que o patch seja pequeno.', 'Causa: o tamanho pequeno provocou os defeitos.'],
      answer: 0, why: 'Moreover significa “além disso” e adiciona uma informação, sem indicar contraste por si só.',
    },
    examQuestion: 'q.ingles.01.005',
    summary: ['Conectivos mostram contraste, adição, causa, condição e conclusão.', 'However/nevertheless = contraste; moreover = adição; therefore = conclusão.', 'Identifique a relação entre as frases antes de escolher a equivalência.'],
  },
  {
    id: 'ingles.coesao.2', section: 'coesao', group: 'ingles.coesao', order: 2,
    title: 'Condições com unless e as long as',
    history: '',
    core: 'Conectivos condicionais indicam o que precisa ocorrer para que outra coisa valha. Unless costuma equivaler a if not (“a menos que/se não”); as long as equivale a “desde que/contanto que”. Leia a condição junto da consequência e verifique se o enunciado exige uma aprovação, uma permissão ou o cumprimento de um requisito. Não confunda a condição necessária com a própria consequência.',
    application: 'Em “Access is denied unless the request is approved”, o acesso é negado se o pedido não for aprovado. A frase não diz que a aprovação causa a negação; ela apresenta uma exceção à regra de negar acesso. Em instruções de API, as long as pode introduzir uma condição para continuar uma operação.',
    q1: {
      prompt: '“Access is denied unless the request is approved.” Quando o acesso é negado?',
      correct: 'Quando o pedido não é aprovado.',
      wrong: ['Sempre que o pedido é aprovado.', 'Apenas depois que o registro é apagado.'],
      answer: 0, why: 'Unless equivale a if not: a regra deixa de se aplicar se o pedido for aprovado.',
    },
    q2: {
      prompt: 'Em “You can retry as long as the token is valid”, o que significa as long as?',
      correct: 'Desde que o token seja válido.',
      wrong: ['Mesmo que o token esteja inválido.', 'Depois que o token for apagado.'],
      answer: 0, why: 'As long as estabelece uma condição para a ação permitida.',
    },
    transfer: {
      prompt: '“The backup runs unless the administrator disables it.” Qual interpretação preserva a condição?',
      correct: 'O backup roda, exceto se o administrador o desativar.',
      wrong: ['O backup só roda quando o administrador o desativa.', 'O backup foi sempre desativado no passado.'],
      answer: 0, why: 'Unless apresenta a exceção: desativar o backup impede a execução padrão.',
    },
    examQuestion: 'q.ingles.01.006',
    summary: ['Unless equivale a if not: “a menos que/se não”.', 'As long as significa “desde que/contanto que”.', 'Leia a regra geral e a exceção como partes diferentes da mesma condição.'],
  },
  {
    id: 'ingles.coesao.3', section: 'coesao', group: 'ingles.coesao', order: 3,
    title: 'Pronomes que retomam termos anteriores',
    history: '',
    core: 'A referência pronominal evita repetir o mesmo substantivo a cada frase. Para resolver, observe concordância, função e sentido: em “the server validates the token and returns it”, it tende a retomar token, porque é o objeto validado e devolvido. Um pronome relativo como which pode retomar o substantivo que funciona como antecedente da oração seguinte. Sempre teste a substituição no texto.',
    application: 'Em “The client sends the token to the authentication server, which validates it”, which retoma authentication server: é esse servidor que valida. It retoma token: é o token que é validado. Pergunte “quem faz a ação?” e “o que recebe a ação?” para confirmar, em vez de confiar apenas na palavra mais próxima.',
    q1: {
      prompt: '“The client sends the token to the authentication server, which validates it.” Which se refere a quê?',
      correct: 'Ao servidor de autenticação, que realiza a validação.',
      wrong: ['Ao cliente, que envia a requisição.', 'À permissão do usuário, que ainda será retornada.'],
      answer: 0, why: 'A oração introduzida por which descreve quem valida o token: o authentication server.',
    },
    q2: {
      prompt: 'Na mesma frase, o pronome it se refere a quê?',
      correct: 'Ao token, que é enviado e validado.',
      wrong: ['Ao servidor que executa a validação.', 'Ao cliente que envia o token.'],
      answer: 0, why: 'O token é o objeto de validates; substituir it por the token mantém a frase coerente.',
    },
    transfer: {
      prompt: '“The database stores the record. It can be encrypted at rest.” A que “it” provavelmente se refere?',
      correct: 'Ao registro, que pode ser criptografado em repouso.',
      wrong: ['À ação de armazenar, como se fosse um objeto.', 'A uma pessoa mencionada em outro contexto.'],
      answer: 0, why: 'Record é o objeto armazenado e pode ser criptografado; o sentido da frase confirma o referente.',
    },
    examQuestion: 'q.ingles.01.007',
    summary: ['Which retoma o antecedente que participa da oração relativa.', 'It retoma o objeto mencionado e coerente com a ação.', 'Substituir o pronome pelo candidato é um teste prático de leitura.'],
  },
  {
    id: 'ingles.coesao.4', section: 'coesao', group: 'ingles.coesao', order: 4,
    title: 'Whereas, the former e the latter',
    history: '',
    core: 'Whereas compara dois elementos destacando uma diferença: “A is fixed, whereas B is flexible”. The former retoma o primeiro de dois termos citados; the latter retoma o segundo. Moreover acrescenta uma informação, normalmente sem oposição. Essas expressões ajudam a interpretar comparações técnicas e evitam inverter a característica atribuída a cada sistema.',
    application: 'Em “Relational databases enforce a fixed schema, whereas document databases allow different structures. Moreover, the latter scale out more easily”, whereas introduz contraste; the latter significa document databases porque é o segundo grupo mencionado; moreover adiciona uma característica. Releia a ordem dos termos antes de escolher quem possui cada propriedade.',
    q1: {
      prompt: 'Em uma frase que compara banco relacional e banco de documentos, whereas normalmente indica',
      correct: 'contraste entre as características dos dois tipos.',
      wrong: ['a conclusão de que os dois são iguais.', 'a causa que obrigatoriamente produz a característica seguinte.'],
      answer: 0, why: 'Whereas significa “ao passo que/enquanto”, e destaca uma diferença entre elementos.',
    },
    q2: {
      prompt: 'Se o texto menciona primeiro A e depois B, o que the latter normalmente retoma?',
      correct: 'B, o segundo e último dos dois elementos mencionados.',
      wrong: ['A, o primeiro elemento mencionado.', 'Um terceiro elemento que não aparece no texto.'],
      answer: 0, why: 'The latter aponta para o último dos dois termos; the former aponta para o primeiro.',
    },
    transfer: {
      prompt: '“Python is dynamically typed, whereas Java uses static typing. The latter catches some type errors before execution.” A que the latter se refere?',
      correct: 'A Java, mencionado em segundo lugar.',
      wrong: ['A Python, mencionado em primeiro lugar.', 'Aos erros, e não a uma linguagem.'],
      answer: 0, why: 'The latter retoma o segundo termo do par: Java.',
    },
    examQuestion: 'q.ingles.01.008',
    summary: ['Whereas introduz contraste entre dois elementos.', 'The former = o primeiro; the latter = o segundo de um par.', 'Moreover acrescenta informação; não é, por si só, um conector de oposição.'],
  },
  {
    id: 'ingles.gramatica.1', section: 'gramatica', group: 'ingles.gramatica', order: 1,
    title: 'Must, should e don’t have to em textos técnicos',
    history: 'Em março de 1997, a RFC 2119 da IETF definiu como interpretar palavras em maiúsculas usadas para indicar níveis de requisito em documentos técnicos da Internet. Ela distingue MUST/MUST NOT (obrigação/proibição) de SHOULD/SHOULD NOT (recomendação com possibilidade de exceções justificadas) e MAY (permissão). A RFC 8174, de 2017, atualizou a orientação para deixar claro o tratamento dessas palavras. A norma não criou a gramática inglesa; padronizou a interpretação operacional em especificações que a adotam.',
    core: 'Em manuais, must expressa obrigação forte e must not proibição. Should recomenda uma ação, mas admite exceção ponderada. Don’t have to significa que não há obrigação: a pessoa pode fazer, só não é necessário. Portanto, don’t have to não equivale a must not. Quando aparecer uma regra, identifique se ela obriga, proíbe ou apenas recomenda.',
    application: '“Users must change passwords” significa que a troca é obrigatória. “They should use a password manager” recomenda o gerenciador. “They don’t have to contact support” diz que não precisam contatar o suporte, sem proibir o contato. Em RFCs, observe se a especificação declara seguir os termos definidos pela RFC 2119/8174.',
    q1: {
      prompt: 'Em um manual, “You must update the client before using the new endpoint” indica',
      correct: 'obrigação: atualizar o cliente antes de usar o novo endpoint.',
      wrong: ['apenas uma sugestão sem importância.', 'proibição de atualizar o cliente.'],
      answer: 0, why: 'Must indica requisito forte; o modal deve ser interpretado junto da condição temporal before using.',
    },
    q2: {
      prompt: 'Qual é a diferença correta entre don’t have to e must not?',
      correct: 'Don’t have to dispensa a obrigação; must not proíbe a ação.',
      wrong: ['As duas expressões sempre proíbem a ação.', 'As duas expressões significam obrigação absoluta.'],
      answer: 0, why: 'Ausência de obrigação não significa proibição, diferença central em instruções técnicas.',
    },
    transfer: {
      prompt: 'Uma especificação diz “Clients should retry after a timeout”. Como ler should?',
      correct: 'Como recomendação; avalie o contexto antes de tratar como obrigação absoluta.',
      wrong: ['Como proibição de repetir.', 'Como garantia de que repetir sempre terá sucesso.'],
      answer: 0, why: 'Should normalmente indica recomendação; em documentos que adotam RFC 2119/8174, a força do requisito é definida de forma específica.',
    },
    examQuestion: 'q.ingles.01.009',
    summary: ['Must = obrigação; must not = proibição; should = recomendação.', 'Don’t have to significa ausência de obrigação, não proibição.', 'RFC 2119 (1997) padroniza termos de requisito em documentos técnicos que a adotam.'],
  },
  {
    id: 'ingles.gramatica.2', section: 'gramatica', group: 'ingles.gramatica', order: 2,
    title: 'Voz passiva: destaque para o processo ou resultado',
    history: '',
    core: 'Na voz passiva, o foco recai sobre quem ou o que recebe a ação. Em “Reports are reviewed by an auditor”, reports é o tema da frase; are reviewed é a forma passiva no presente; by an auditor informa quem realiza a revisão. Documentação técnica usa voz passiva quando o procedimento ou o objeto importa mais que a pessoa responsável. A passiva não elimina o agente se o texto o informa.',
    application: 'Compare “An auditor reviews each report” (ativa: o auditor vem como sujeito) com “Each report is reviewed by an auditor” (passiva: o relatório fica em destaque). Observe o verbo be + particípio: is stored, are reviewed, was created, has been rejected. Depois procure by para identificar o agente, quando ele aparece.',
    q1: {
      prompt: 'Em “All expense reports are reviewed by an auditor”, quem revisa os relatórios?',
      correct: 'Um auditor; a expressão by an auditor identifica o agente.',
      wrong: ['O departamento que recebe os relatórios.', 'Os relatórios, que revisam o auditor.'],
      answer: 0, why: 'Na voz passiva, by pode introduzir quem executa a ação.',
    },
    q2: {
      prompt: 'Qual é uma pista comum de voz passiva em inglês?',
      correct: 'Uma forma do verbo be seguida pelo particípio, como are reviewed.',
      wrong: ['Sempre haver uma palavra interrogativa no começo.', 'O verbo nunca poder vir acompanhado de by.'],
      answer: 0, why: 'Be + particípio é a construção central da passiva; by pode indicar o agente.',
    },
    transfer: {
      prompt: '“The rejected reports are returned to the department.” O que acontece aos relatórios rejeitados?',
      correct: 'São devolvidos ao departamento.',
      wrong: ['Devolvem o departamento a outro lugar.', 'São automaticamente aprovados para pagamento.'],
      answer: 0, why: 'Are returned é passiva: os relatórios recebem a ação de ser devolvidos.',
    },
    examQuestion: 'q.ingles.01.010',
    summary: ['Voz passiva: be + particípio; o objeto/resultado fica em destaque.', 'By pode indicar quem executa a ação.', 'Traduza a relação entre os participantes, não só a ordem das palavras.'],
  },
  {
    id: 'ingles.gramatica.3', section: 'gramatica', group: 'ingles.gramatica', order: 3,
    title: 'Afixos: pistas dentro das palavras',
    history: '',
    core: 'Afixos são partes adicionadas ao começo ou ao fim de uma palavra. Prefixos como un- e re- mudam o sentido (“não” e “de novo”); sufixos como -less e -able indicam ausência ou possibilidade. Em palavras compostas tecnicamente, stateless pode ser entendido como state + less (“sem estado”), unreadable como un + read + able (“que não pode ser lido”) e reusable como re + use + able (“que pode ser usado novamente”).',
    application: 'Ao encontrar uma palavra desconhecida, separe prefixo, base e sufixo. Verifique se a soma das partes combina com a frase e com o domínio técnico. A estratégia ajuda, mas não é infalível: a forma histórica nem sempre pode ser deduzida perfeitamente, e o contexto continua necessário.',
    q1: {
      prompt: 'O que o sufixo -less costuma indicar em stateless?',
      correct: 'Ausência: stateless significa “sem estado”.',
      wrong: ['Repetição de uma ação.', 'Obrigação de manter o estado.'],
      answer: 0, why: '-less indica “sem/falta de”; em arquitetura, stateless descreve um componente que não mantém estado de sessão entre requisições no sentido do contexto.',
    },
    q2: {
      prompt: 'Como decompor reusable de maneira útil para inferir seu sentido?',
      correct: 're- (de novo) + use (usar) + -able (que pode ser): que pode ser usado novamente.',
      wrong: ['un- (não) + read (ler) + -less (sem).', 're- (depois) + use (usuário) + -ful (cheio de).'],
      answer: 0, why: 'Os afixos apontam para repetição e possibilidade; a palavra significa reutilizável.',
    },
    transfer: {
      prompt: 'Em uma especificação, o que unreadable sugere?',
      correct: 'Que algo não pode ser lido ou está ilegível.',
      wrong: ['Que algo será lido novamente.', 'Que algo pode ser reutilizado.'],
      answer: 0, why: 'Un- nega; read é ler; -able indica possibilidade. A combinação sugere “ilegível”.',
    },
    examQuestion: 'q.ingles.01.011',
    summary: ['Prefixos modificam o sentido no início; sufixos se juntam no final.', '-less = sem; un- = negação; re- = repetição; -able = possibilidade.', 'Use afixos como pistas e confirme a interpretação no contexto.'],
  },
];

export const microLessonsInglesLeitura: MicroLesson[] = lessons.map(build);
