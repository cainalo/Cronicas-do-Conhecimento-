// Sala dos Professores (reformulação, Fase 6; spec 22): posts editoriais curtos, versionados, ligados
// a um trecho da trilha. Cada post deve acrescentar um ângulo novo — caso, diagnóstico, curiosidade
// ou decisão profissional — em vez de reescrever a explicação principal. Personagens são fictícios.
// Revisão editorial humana: pendente.

export interface FictionalTeacher {
  id: string;
  name: string;
  expertiseLabel: string;
  biography: string;
  tone: 'gold' | 'azure' | 'teal' | 'pink' | 'leaf' | 'ember';
  fictional: true;
  /** Nome de usuário no feed. */
  handle?: string;
  /** Assuntos que a pessoa costuma postar (aparecem no perfil). */
  topics?: string[];
  /** Direção de arte e vestuário do personagem, usados na ficha pública. */
  personalStyle?: string;
  /** Interesses humanos além da disciplina, para dar identidade ao personagem. */
  interests?: string[];
  /** Referências públicas para quem quiser aprofundar os assuntos. */
  references?: { label: string; url: string }[];
  /** Frase curta recorrente do personagem. */
  motto?: string;
  /** Ritmo, tom e abordagem didática característicos. */
  speakingStyle?: string;
}

export interface TeacherPost {
  id: string;
  version: number;
  teacherId: string;
  publishedAt: string;
  kind: 'dica' | 'mini-desafio' | 'caso' | 'pegadinha' | 'revisao';
  title: string;
  body: string;
  /** Trecho da trilha que ensina o assunto do post. */
  chapterId: string;
  sectionId: string;
  topicIds: string[];
  estimatedMinutes: number;
  /** Mini-desafio: certo ou errado, só depois de estudar o trecho. Não conta como tentativa de prova. */
  challenge?: { statement: string; answer: boolean; why: string };
  review: 'nao-revisado' | 'revisado';
}

export const teachers: FictionalTeacher[] = [
  {
    id: 'prof.clara',
    handle: 'clara.numeros',
    topics: ['Matemática', 'Raciocínio lógico', 'Primeiros passos'],
    name: 'Professora Clara',
    expertiseLabel: 'Matemática e raciocínio lógico',
    biography: 'Clara é uma professora fictícia de matemática aplicada. Antes de escrever uma fórmula, procura uma situação cotidiana que faça a pessoa perceber o padrão por conta própria. É curiosa, acolhedora e transforma erros em pistas para a próxima tentativa.',
    personalStyle: 'Blazer terracota, camisa creme, brincos geométricos pequenos e um caderno com marcações coloridas; visual urbano, criativo e organizado.',
    interests: ['desafios de lógica', 'cafés e livrarias', 'ilustração científica', 'jogos de tabuleiro'],
    references: [{ label: 'Porcentagens — Khan Academy', url: 'https://pt.khanacademy.org/math/arithmetic/arith-review-percentages' }],
    motto: 'A fórmula fica mais fácil quando a ideia faz sentido.',
    speakingStyle: 'Fala com energia e paciência; usa exemplos de preços, filas e receitas, pergunta antes de explicar e evita tratar uma dúvida como erro bobo.',
    tone: 'ember',
    fictional: true,
  },
  {
    id: 'prof.lia',
    handle: 'lia.sistemas',
    topics: ['Primeiros passos', 'Sistemas operacionais', 'Linha de comando'],
    name: 'Professora Lia',
    expertiseLabel: 'Sistemas operacionais e linha de comando',
    biography: 'Lia é uma engenheira de sistemas fictícia que adora descobrir o que acontece por trás da interface. Organiza o raciocínio em etapas e ensina a investigar antes de executar um comando — especialmente quando uma máquina está sob pressão.',
    personalStyle: 'Jaqueta verde-petróleo, camiseta preta, calça funcional, tênis e coque alto; leva um terminal portátil e um caderno de anotações.',
    interests: ['Linux e software livre', 'consertar computadores antigos', 'café forte', 'mapas de metrô'],
    references: [{ label: 'Manual do comando ps', url: 'https://man7.org/linux/man-pages/man1/ps.1.html' }, { label: 'Manual do comando top', url: 'https://man7.org/linux/man-pages/man1/top.1.html' }],
    motto: 'Observe primeiro. Comande depois.',
    speakingStyle: 'Direta, metódica e bem-humorada; descreve comandos passo a passo, explica o risco e sempre pergunta qual evidência confirma a hipótese.',
    tone: 'teal',
    fictional: true,
  },
  {
    id: 'prof.davi',
    handle: 'davi.redes',
    topics: ['Redes', 'Internet', 'Serviços'],
    name: 'Professor Davi',
    expertiseLabel: 'Redes e serviços',
    biography: 'Davi é um professor fictício de redes que enxerga a internet como uma cidade em movimento: endereços, rotas, protocolos e serviços trabalhando juntos. Gosta de desmontar ideias aparentemente mágicas até revelar a infraestrutura.',
    personalStyle: 'Camisa azul-marinho com detalhes ocre, jaqueta leve, barba curta e mochila com adesivos de conferências de tecnologia.',
    interests: ['rádio amador', 'ciclismo urbano', 'histórias da internet', 'fotografia de arquitetura'],
    references: [{ label: 'DNS — RFC 1034', url: 'https://www.rfc-editor.org/rfc/rfc1034' }, { label: 'DNS — RFC 1035', url: 'https://www.rfc-editor.org/rfc/rfc1035' }],
    motto: 'Toda mensagem precisa de um caminho.',
    speakingStyle: 'Conversador e visual; usa analogias com Correios e mapas, desenha o caminho dos pacotes e gosta de perguntar onde a comunicação pode falhar.',
    tone: 'azure',
    fictional: true,
  },
  {
    id: 'prof.iara',
    handle: 'iara.seguranca',
    topics: ['Segurança', 'Criptografia', 'Nuvem'],
    name: 'Professora Iara',
    expertiseLabel: 'Segurança e nuvem',
    biography: 'Iara é uma especialista fictícia em segurança e nuvem que começa pelo impacto para as pessoas. Prefere ameaças concretas e decisões justificadas a alarmismo, e lembra que segurança é um processo contínuo, não um botão mágico.',
    personalStyle: 'Cabelo cacheado volumoso, camisa ameixa sob jaqueta verde-oliva, acessórios discretos e uma bolsa com etiquetas de laboratórios e conferências.',
    interests: ['segurança por design', 'privacidade digital', 'documentários', 'jardinagem'],
    references: [{ label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }, { label: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/' }],
    motto: 'Confiança precisa de evidências.',
    speakingStyle: 'Calma, criteriosa e investigativa; apresenta ameaças sem dramatizar, diferencia risco de certeza e sempre sugere uma forma de verificar a proteção.',
    tone: 'pink',
    fictional: true,
  },
  {
    id: 'prof.nina', handle: 'nina.inteligencia', topics: ['Inteligência artificial', 'Modelos de linguagem', 'Ética em IA'],
    name: 'Professora Nina', expertiseLabel: 'Inteligência artificial e modelos de linguagem',
    biography: 'Nina é uma pesquisadora fictícia de IA que gosta de separar demonstração impressionante de evidência. Faz perguntas sobre dados, contexto, limites e impacto antes de aceitar uma resposta gerada por um modelo.',
    personalStyle: 'Corte bob azul-escuro, óculos redondos, jaqueta ameixa com pequenos pins de conferências e tablet cheio de esquemas.',
    interests: ['linguagem e cognição', 'museus de ciência', 'visualização de dados', 'xadrez'],
    references: [{ label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }],
    motto: 'Uma resposta convincente ainda precisa de verificação.',
    speakingStyle: 'Investigativa e curiosa; compara exemplos, pede evidências e mostra como avaliar limitações e riscos sem demonizar a tecnologia.',
    tone: 'azure', fictional: true,
  },
  {
    id: 'prof.ravi', handle: 'ravi.codigo', topics: ['Programação', 'Algoritmos', 'Engenharia de software'],
    name: 'Professor Ravi', expertiseLabel: 'Desenvolvimento de software e algoritmos',
    biography: 'Ravi é um desenvolvedor fictício que ensina a pensar em etapas pequenas. Gosta de transformar problemas confusos em entradas, regras, saídas e testes que qualquer pessoa da equipe consegue revisar.',
    personalStyle: 'Cabelo baixo nas laterais e cacheado no topo, jaqueta verde-oliva, camiseta clara e pulseira de tecido de eventos de tecnologia.',
    interests: ['programação competitiva', 'música instrumental', 'bicicletas', 'projetos open source'],
    references: [{ label: 'The Twelve-Factor App', url: 'https://12factor.net/' }],
    motto: 'Código bom é aquele que outra pessoa consegue entender.',
    speakingStyle: 'Prático e colaborativo; desenha fluxos, faz perguntas de depuração e mostra como testar cada hipótese antes de mudar várias coisas.',
    tone: 'leaf', fictional: true,
  },
  {
    id: 'prof.mateus', handle: 'mateus.dados', topics: ['Banco de dados', 'SQL', 'Modelagem'],
    name: 'Professor Mateus', expertiseLabel: 'Banco de dados e análise de dados',
    biography: 'Mateus é um analista fictício de dados que enxerga tabelas como registros de uma história. Ensina a modelar antes de consultar, conferir a qualidade dos dados e explicar o resultado para quem tomou a decisão.',
    personalStyle: 'Óculos retangulares, cabelo castanho curto, jaqueta azul-petróleo, caderno quadriculado e cartões de relacionamento entre tabelas.',
    interests: ['estatística aplicada', 'mapas', 'quebra-cabeças', 'café coado'],
    references: [{ label: 'PostgreSQL — documentação SQL', url: 'https://www.postgresql.org/docs/current/sql.html' }],
    motto: 'Antes de perguntar aos dados, organize a pergunta.',
    speakingStyle: 'Preciso e paciente; usa tabelas pequenas, exemplos concretos e compara o resultado esperado com o resultado obtido.',
    tone: 'teal', fictional: true,
  },
  {
    id: 'prof.marina', handle: 'marina.gestao', topics: ['Governança', 'Gestão de TI', 'Serviços'],
    name: 'Professora Marina', expertiseLabel: 'Governança e gestão de tecnologia',
    biography: 'Marina é uma gestora fictícia que conecta tecnologia a objetivos públicos e organizacionais. Gosta de mostrar quem decide, quem executa, como se mede resultado e como se presta contas.',
    personalStyle: 'Trança lateral, blazer verde-oliva, camisa creme, relógio discreto e uma pasta de mapas de processos.',
    interests: ['gestão de projetos', 'arquitetura de serviços', 'jardinagem', 'fotografia urbana'],
    references: [{ label: 'COBIT — ISACA', url: 'https://www.isaca.org/resources/cobit' }],
    motto: 'Tecnologia precisa entregar valor que possa ser demonstrado.',
    speakingStyle: 'Organizada e estratégica; monta quadros de responsabilidade, relaciona decisões com evidências e evita siglas sem explicar o papel de cada uma.',
    tone: 'leaf', fictional: true,
  },
  {
    id: 'prof.beatriz', handle: 'bia.normas', topics: ['Legislação', 'Direito público', 'Controle externo'],
    name: 'Professora Beatriz', expertiseLabel: 'Legislação e administração pública',
    biography: 'Beatriz é uma professora fictícia de direito público que ensina a ler normas sem decorar frases isoladas. Primeiro identifica competência, sujeito, condição e consequência; depois compara artigos e exceções.',
    personalStyle: 'Coque baixo, óculos finos, blazer ameixa, camisa de gola alta e marcador de texto ocre preso ao caderno.',
    interests: ['história institucional', 'arquivos públicos', 'literatura brasileira', 'debates'],
    references: [{ label: 'Constituição Federal — Portal da Legislação', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' }],
    motto: 'Leia a regra inteira antes de concluir o que ela permite.',
    speakingStyle: 'Clara e criteriosa; separa regra, exceção e competência, sempre pedindo que o estudante encontre o fundamento no texto.',
    tone: 'pink', fictional: true,
  },
  {
    id: 'prof.sofia', handle: 'sofia.reads', topics: ['Inglês', 'Leitura técnica', 'Vocabulário'],
    name: 'Professora Sofia', expertiseLabel: 'Língua inglesa e leitura técnica',
    biography: 'Sofia é uma professora fictícia de inglês que ensina a ler primeiro pelo contexto. Ajuda a reconhecer cognatos, conectores, referência pronominal e a ideia central antes de traduzir palavra por palavra.',
    personalStyle: 'Cabelo ruivo ondulado com faixa verde, jaqueta terracota, camiseta clara e cartões de vocabulário ilustrados.',
    interests: ['cinema', 'literatura de viagem', 'línguas', 'música ao vivo'],
    references: [{ label: 'British Council — LearnEnglish', url: 'https://learnenglish.britishcouncil.org/' }],
    motto: 'Entenda a ideia antes de caçar cada palavra.',
    speakingStyle: 'Animada e acolhedora; lê trechos em voz alta, destaca conectores e mostra como o contexto muda o sentido.',
    tone: 'ember', fictional: true,
  },
  {
    id: 'prof.helena', handle: 'helena.textos', topics: ['Português', 'Interpretação', 'Gramática'],
    name: 'Professora Helena', expertiseLabel: 'Língua portuguesa e interpretação',
    biography: 'Helena é uma professora fictícia de português que aproxima gramática e leitura real. Gosta de mostrar como a pontuação, a escolha de palavras e a organização das ideias mudam o sentido de um texto.',
    personalStyle: 'Cabelo longo escuro com faixa ocre, jaqueta azul-petróleo, caderno de capa ilustrada e canetas de várias cores.',
    interests: ['crônicas', 'teatro', 'clubes de leitura', 'revisão editorial'],
    references: [{ label: 'ABL — Academia Brasileira de Letras', url: 'https://www.academia.org.br/' }],
    motto: 'A forma também constrói o sentido.',
    speakingStyle: 'Expressiva e cuidadosa; lê exemplos em voz alta, compara versões de frases e estimula a justificar interpretações com pistas do texto.',
    tone: 'teal', fictional: true,
  },
  {
    id: 'prof.augusto', handle: 'augusto.instituicoes', topics: ['Instituições públicas', 'Constituição', 'Tribunais de contas'],
    name: 'Professor Augusto', expertiseLabel: 'Instituições e organização do Estado',
    biography: 'Augusto é um professor fictício de organização institucional que conecta órgãos, competências e controles. Prefere desenhar relações entre instituições a apresentar listas de nomes para decorar.',
    personalStyle: 'Cabelo grisalho curto, óculos discretos, paletó azul-petróleo, camisa clara e pasta de documentos com abas coloridas.',
    interests: ['história política', 'arquitetura cívica', 'xadrez', 'memória institucional'],
    references: [{ label: 'Constituição do Estado de Goiás — Assembleia Legislativa', url: 'https://portal.al.go.leg.br/' }],
    motto: 'Uma instituição se entende pelo que pode fazer e por quem a controla.',
    speakingStyle: 'Sereno e didático; usa organogramas, exemplos de competências e perguntas de comparação para evitar confundir órgãos e funções.',
    tone: 'teal', fictional: true,
  },
  {
    id: 'prof.caio', handle: 'caio.plataforma', topics: ['Computação em nuvem', 'DevOps', 'Infraestrutura'],
    name: 'Professor Caio', expertiseLabel: 'Nuvem, infraestrutura e DevOps',
    biography: 'Caio é um engenheiro fictício de plataforma que acompanha o caminho do código até o serviço em produção. Ensina a pensar em automação, observabilidade, capacidade, recuperação e responsabilidade operacional.',
    personalStyle: 'Cabelo escuro em degradê, headset leve, jaqueta azul-petróleo com detalhes ocre e um pequeno tablet de monitoramento.',
    interests: ['automação residencial', 'laboratórios caseiros', 'trilhas', 'hardware'],
    references: [{ label: 'DORA — Accelerate State of DevOps', url: 'https://dora.dev/' }],
    motto: 'Entregar é só o começo; manter funcionando também é engenharia.',
    speakingStyle: 'Objetivo e experimental; desenha pipelines, demonstra etapas de implantação e pergunta como saberemos se a mudança funcionou.',
    tone: 'azure', fictional: true,
  },

];

const P = (p: Omit<TeacherPost, 'version' | 'review'>): TeacherPost => ({ version: 1, review: 'nao-revisado', ...p });

export const teacherPosts: TeacherPost[] = [
  P({
    id: 'post.ps-top',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-20',
    kind: 'dica',
    title: 'Foto ou vídeo?',
    body: '`ps aux` tira uma **foto** dos processos naquele instante. `top` é o **vídeo**: fica atualizando. Para anexar a lista a um relatório, foto. Para ver um problema acontecendo, vídeo.',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.kill',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-21',
    kind: 'mini-desafio',
    title: 'Pedir ou forçar?',
    body: '`kill PID` envia SIGTERM, um **pedido** de término. `kill -9 PID` envia SIGKILL, o encerramento **forçado**.',
    challenge: {
      statement: 'Um processo pode capturar e ignorar o SIGKILL.',
      answer: false,
      why: 'O SIGKILL não pode ser capturado nem ignorado. Por isso fica como último recurso: o processo não tem chance de fechar o que estava fazendo.',
    },
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.nice',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-22',
    kind: 'pegadinha',
    title: 'Nice alto é prioridade alta?',
    body: 'Não. "Nice" é "gentil": quanto **maior** o número, mais o processo **cede a vez**. A escala vai de **-20** (mais prioritário) a **19** (menos). E só o root pode **reduzir** o valor.',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.fat32',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-18',
    kind: 'dica',
    title: 'O pen drive que não aceita o arquivo de 5 GB',
    body: '**FAT32** cabe em todo lugar, mas trava em **4 GB por arquivo** e não tem permissões. Para pen drive grande, **exFAT**. Para o disco do Windows, com permissões, **NTFS**.',
    chapterId: 'cap.infra.03',
    sectionId: 'arquivos',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.uniq',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-19',
    kind: 'mini-desafio',
    title: 'O uniq que não juntou nada',
    body: 'O `uniq` só compara uma linha com a **de cima**. Repetidas que não estão vizinhas passam direto.',
    challenge: {
      statement: 'Para contar repetições numa lista desordenada, o certo é ordenar antes: sort | uniq -c.',
      answer: true,
      why: 'Ordenando, as linhas iguais ficam vizinhas e o uniq consegue juntá-las.',
    },
    chapterId: 'cap.infra.03',
    sectionId: 'shell',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.lsdou',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-17',
    kind: 'revisao',
    title: 'Quem fala por último vence',
    body: 'As GPOs chegam na ordem **L**ocal, **S**ite, **D**omínio, **OU**. A última aplicada é a que vale, salvo a marcada como **Imposta**.',
    chapterId: 'cap.infra.03',
    sectionId: 'diretorio',
    topicIds: ['ti.infra.diretorio'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.tcp-udp',
    teacherId: 'prof.davi',
    publishedAt: '2026-10-21',
    kind: 'dica',
    title: 'Carta registrada ou recado gritado',
    body: 'O **TCP** é a carta registrada: abre conexão, confirma, reenvia e entrega na ordem. O **UDP** é o recado gritado pela janela: rápido, sem repetir. Numa chamada de vídeo, seguir em frente vale mais que repetir a imagem de 2 segundos atrás.',
    chapterId: 'cap.infra.01',
    sectionId: 'tcpip',
    topicIds: ['ti.infra.redes'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.hosts',
    teacherId: 'prof.davi',
    publishedAt: '2026-10-22',
    kind: 'mini-desafio',
    title: 'Conta rápida de sub-rede',
    body: 'Bits de host = 32 − prefixo. Endereços = 2 elevado a isso. Hosts = endereços − 2.',
    challenge: {
      statement: 'Uma rede /28 comporta 14 hosts.',
      answer: true,
      why: '32 − 28 = 4 bits; 2^4 = 16 endereços; tirando rede e broadcast, sobram 14.',
    },
    chapterId: 'cap.infra.01',
    sectionId: 'enderecos',
    topicIds: ['ti.infra.redes'],
    estimatedMinutes: 2,
  }),
  P({
    id: 'post.172',
    teacherId: 'prof.davi',
    publishedAt: '2026-10-16',
    kind: 'pegadinha',
    title: 'A faixa privada do meio engana',
    body: 'As privadas são **10**, **172.16 a 172.31** e **192.168**. Um 172.32 já é público. E **169.254** é o endereço improvisado quando o DHCP falha.',
    chapterId: 'cap.infra.01',
    sectionId: 'enderecos',
    topicIds: ['ti.infra.redes'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.dns53',
    teacherId: 'prof.davi',
    publishedAt: '2026-10-20',
    kind: 'revisao',
    title: 'DNS: UDP ou TCP?',
    body: 'Os dois, na porta **53**. Consulta curta vai por **UDP**, que é rápido. Transferência de zona, a lista inteira, vai por **TCP**, que é confiável.',
    chapterId: 'cap.infra.01',
    sectionId: 'servicos',
    topicIds: ['ti.infra.redes'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.waf',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-21',
    kind: 'caso',
    title: 'O firewall não viu a injeção de SQL',
    body: 'Porta e endereço dizem **por onde** o tráfego passa. A injeção de SQL está **no conteúdo** do pedido HTTP. Quem lê esse conteúdo é o **WAF**.',
    chapterId: 'cap.infra.01',
    sectionId: 'perimetro',
    topicIds: ['ti.infra.perimetro'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.proxy',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-19',
    kind: 'mini-desafio',
    title: 'Quem o proxy representa?',
    body: 'O proxy comum representa **os usuários de dentro** quando saem para a internet. O reverso representa **os servidores** para quem chega de fora.',
    challenge: {
      statement: 'O proxy reverso protege os clientes internos que navegam na internet.',
      answer: false,
      why: 'O reverso fica na frente dos servidores, para quem vem de fora. Quem atende os clientes internos que saem é o proxy comum.',
    },
    chapterId: 'cap.infra.01',
    sectionId: 'perimetro',
    topicIds: ['ti.infra.perimetro'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.paas',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-22',
    kind: 'dica',
    title: 'Terreno, cozinha ou restaurante',
    body: '**IaaS**: a casa vazia, e o sistema operacional é seu. **PaaS**: a cozinha montada, e você traz a aplicação e os dados. **SaaS**: o prato pronto. Quanto mais alto, menos gestão e menos controle.',
    chapterId: 'cap.infra.02',
    sectionId: 'modelos',
    topicIds: ['ti.infra.nuvem'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.serverless',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-18',
    kind: 'pegadinha',
    title: 'Serverless tem servidor',
    body: 'Tem, só não é seu: você não administra nem paga por ele parado. Como o táxi por aplicativo, só se paga a corrida, e sem chamado nenhum carro trabalha para você (**escala até zero**).',
    chapterId: 'cap.infra.02',
    sectionId: 'escala',
    topicIds: ['ti.infra.nuvem'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.disponibilidade',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-23',
    kind: 'caso',
    title: 'Cifrar não mantém o portal no ar',
    body: 'Criptografia protege o **conteúdo**, não a **presença** do serviço. Contra a queda, valem servidores redundantes, backup e proteção contra negação de serviço.',
    chapterId: 'cap.seg.01',
    sectionId: 'fundamentos',
    topicIds: ['ti.seguranca.criptografia'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.kerckhoffs',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-24',
    kind: 'mini-desafio',
    title: 'Segredo é a chave, não o algoritmo',
    body: 'Pelo princípio de Kerckhoffs, o sistema deve continuar seguro mesmo que todos conheçam o algoritmo. O que precisa ficar em segredo é a **chave**.',
    challenge: {
      statement: 'Esconder o funcionamento do algoritmo é o que garante a segurança de um bom sistema criptográfico.',
      answer: false,
      why: 'É o contrário: o algoritmo pode ser público. A segurança está no segredo da chave.',
    },
    chapterId: 'cap.seg.01',
    sectionId: 'fundamentos',
    topicIds: ['ti.seguranca.criptografia'],
    estimatedMinutes: 1,
  }),

  P({
    id: 'post.lia.memoria-pressao',
    teacherId: 'prof.lia',
    publishedAt: '2026-10-29',
    kind: 'caso',
    title: 'O servidor está lento: memória cheia é a causa?',
    body: 'No plantão, a equipe vê RAM quase esgotada e quer reiniciar tudo. Eu começaria por três evidências: se há swap sendo usada, se o sistema está lendo/escrevendo nela continuamente e qual processo cresceu. **Memória ocupada não prova, sozinha, que existe thrashing.** O diagnóstico vem do conjunto de sinais e da evolução ao longo do tempo.',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    topicIds: ['ti.infra.so'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Se a RAM está em 95% de uso, reiniciar o servidor é sempre a primeira ação correta.',
      answer: false,
      why: 'Antes de uma ação disruptiva, colete evidências, identifique o processo e avalie impacto. Uso alto pode ser cache útil ou uma carga esperada; pressão persistente e paginação intensa contam uma história diferente.',
    },
  }),
  P({
    id: 'post.davi-dns-investigacao',
    teacherId: 'prof.davi',
    publishedAt: '2026-10-28',
    kind: 'caso',
    title: 'O site abre pelo IP, mas não pelo nome',
    body: 'Esse sintoma é uma pista: a conectividade até o servidor pode estar funcionando, enquanto a resolução de nomes falha. Compare a resposta do resolvedor configurado com uma consulta a outro resolvedor autorizado, confira o registro e o TTL, e lembre que um resultado em cache pode continuar aparecendo depois de uma mudança. Não altere a zona inteira antes de descobrir onde a resposta diverge.',
    chapterId: 'cap.infra.01',
    sectionId: 'servicos',
    topicIds: ['ti.infra.redes'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Se o site abre pelo IP, isso prova que o DNS está funcionando corretamente.',
      answer: false,
      why: 'Acessar pelo IP contorna a resolução de nomes. O teste ajuda a separar conectividade e serviço web de um possível problema de DNS, mas ainda é necessário investigar a causa.',
    },
  }),
  P({
    id: 'post.iara-backup-restore',
    teacherId: 'prof.iara',
    publishedAt: '2026-10-27',
    kind: 'caso',
    title: 'Backup concluído não significa recuperação garantida',
    body: 'Num incidente, a pergunta decisiva não é só “temos backup?”, mas “conseguimos restaurar dentro do tempo necessário e com dados íntegros?”. Uma rotina de backup pode terminar com sucesso e ainda produzir cópias incompletas, credenciais indisponíveis ou um tempo de recuperação incompatível com o negócio. Marque testes de restauração e registre o resultado — evidência é melhor que esperança.',
    chapterId: 'cap.seg.01',
    sectionId: 'fundamentos',
    topicIds: ['ti.seguranca.criptografia'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Uma tarefa de backup com status “sucesso” garante que a organização conseguirá recuperar o serviço no prazo esperado.',
      answer: false,
      why: 'Só um teste de restauração valida, na prática, a integridade da cópia, o procedimento e o tempo necessário. Defina objetivos de recuperação e teste-os periodicamente.',
    },
  }),


  P({
    id: 'post.nina-rag-evidencia',
    teacherId: 'prof.nina',
    publishedAt: '2026-10-29',
    kind: 'caso',
    title: 'RAG melhora a resposta, mas não a torna infalível',
    body: 'Uma equipe conectou um assistente a documentos internos e comemorou: agora ele “consulta a fonte”. Na primeira revisão, porém, o sistema recuperou um trecho antigo e respondeu com segurança. O cuidado não é só recuperar: é verificar atualidade, relevância, permissão de acesso e se a resposta realmente decorre do trecho citado. **Fonte recuperada não é sinônimo de conclusão correta.**',
    chapterId: 'cap.ia.01',
    sectionId: 'rag',
    topicIds: ['ti.ia-eng.llm'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Um sistema RAG sempre produz respostas corretas porque consulta documentos externos ao modelo.',
      answer: false,
      why: 'A recuperação pode trazer documentos incompletos, antigos ou pouco relevantes. A geração ainda pode interpretar mal a evidência. Avaliação e rastreabilidade continuam necessárias.',
    },
  }),
  P({
    id: 'post.ravi-retries-api',
    teacherId: 'prof.ravi',
    publishedAt: '2026-10-29',
    kind: 'caso',
    title: 'A API caiu? Antes de repetir a requisição, pense no efeito',
    body: 'Imagine que um cliente envia uma solicitação para criar um pagamento. A conexão cai antes de chegar a resposta. Repetir a chamada sem controle pode criar duas operações. Uma chave de idempotência permite reconhecer tentativas que representam a mesma intenção. **O tratamento de repetição precisa considerar o efeito da operação, não apenas o código HTTP.**',
    chapterId: 'cap.dev.01',
    sectionId: 'rest',
    topicIds: ['ti.dev.apis'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Repetir automaticamente qualquer requisição POST após um timeout é sempre seguro.',
      answer: false,
      why: 'O servidor pode ter concluído a primeira operação mesmo que a resposta não tenha chegado. Para operações com efeito, use idempotência ou um mecanismo equivalente de deduplicação.',
    },
  }),
  P({
    id: 'post.mateus-modelagem',
    teacherId: 'prof.mateus',
    publishedAt: '2026-10-28',
    kind: 'caso',
    title: 'O mesmo endereço aparece em vinte registros',
    body: 'Uma equipe guarda cliente, endereço e pedido na mesma tabela. Quando o cliente muda de endereço, alguém atualiza quinze linhas e esquece cinco. O resultado é uma inconsistência difícil de explicar. A pergunta de modelagem é: quais fatos pertencem a cada entidade e qual chave permite relacioná-las sem copiar o mesmo dado sem necessidade?',
    chapterId: 'cap.dados.01',
    sectionId: 'modelagem',
    topicIds: ['ti.dados.modelagem'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Separar cliente e pedido em tabelas relacionadas pode reduzir atualização duplicada e anomalias.',
      answer: true,
      why: 'A decomposição coerente evita repetir atributos do cliente em cada pedido, desde que as relações e chaves sejam modeladas corretamente.',
    },
  }),
  P({
    id: 'post.marina-indicador-governanca',
    teacherId: 'prof.marina',
    publishedAt: '2026-10-28',
    kind: 'caso',
    title: 'Um painel tem vinte indicadores e nenhuma decisão',
    body: 'O comitê recebe um painel enorme, mas ninguém sabe qual decisão cada gráfico deveria apoiar. Comece pelo objetivo: que resultado se busca, quem responde por ele, qual evidência será observada e que ação muda quando o indicador sai da faixa esperada? **Métrica sem responsável e sem consequência vira decoração.**',
    chapterId: 'cap.gov.01',
    sectionId: 'governanca',
    topicIds: ['ti.governanca.estrategia'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Um indicador de governança é útil mesmo quando não existe responsável nem decisão associada.',
      answer: false,
      why: 'A medição precisa estar ligada a objetivos, responsabilidades e decisões; caso contrário, não orienta a gestão.',
    },
  }),
  P({
    id: 'post.beatriz-minimizacao-lgpd',
    teacherId: 'prof.beatriz',
    publishedAt: '2026-10-27',
    kind: 'pegadinha',
    title: '“Vai que um dia precisamos”: precisamos guardar todos os dados?',
    body: 'Um formulário pede nome, documento, endereço, data de nascimento e informações que não têm relação com o serviço oferecido. A equipe diz que talvez esses dados sejam úteis no futuro. A pergunta jurídica e de projeto é mais simples: qual finalidade concreta justifica cada campo, por quanto tempo ele precisa existir e quem realmente precisa acessá-lo?',
    chapterId: 'cap.leg.01',
    sectionId: 'lgpd',
    topicIds: ['ti.legislacao.lgpd'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Coletar dados pessoais sem necessidade definida pode contrariar o princípio da necessidade.',
      answer: true,
      why: 'A coleta deve se limitar ao mínimo necessário para finalidades legítimas, específicas e informadas, observadas as bases legais aplicáveis.',
    },
  }),
  P({
    id: 'post.sofia-skimming-scanning',
    teacherId: 'prof.sofia',
    publishedAt: '2026-10-27',
    kind: 'dica',
    title: 'Você não precisa traduzir o manual inteiro',
    body: 'Quando chegar um manual técnico em inglês, faça duas leituras diferentes. Primeiro, passe os olhos pelo título, subtítulos e primeira frase dos parágrafos para localizar a ideia geral. Depois, procure o dado específico que a tarefa pede: versão, parâmetro, aviso ou etapa. **Skimming procura a visão geral; scanning caça uma informação pontual.**',
    chapterId: 'cap.ingles.01',
    sectionId: 'estrategias',
    topicIds: ['ti.ingles.leitura'],
    estimatedMinutes: 1,
  }),
  P({
    id: 'post.helena-pontuacao',
    teacherId: 'prof.helena',
    publishedAt: '2026-10-26',
    kind: 'caso',
    title: 'A vírgula mudou o responsável',
    body: 'Compare: “Os servidores que concluíram o treinamento receberão acesso” e “Os servidores, que concluíram o treinamento, receberão acesso”. Na primeira frase, a oração delimita um grupo; na segunda, a informação aparece como explicação sobre o grupo inteiro. A pontuação não é enfeite: ela organiza a relação entre as ideias.',
    chapterId: 'cap.port.01',
    sectionId: 'interpretacao',
    topicIds: ['cg.portugues.interpretacao'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Em qualquer frase, inserir vírgulas em uma oração relativa mantém exatamente o mesmo sentido.',
      answer: false,
      why: 'A pontuação pode mudar o valor restritivo ou explicativo da oração e, portanto, alterar o alcance da informação.',
    },
  }),
  P({
    id: 'post.augusto-competencia',
    teacherId: 'prof.augusto',
    publishedAt: '2026-10-26',
    kind: 'caso',
    title: 'Quem pode fiscalizar não é necessariamente quem executa',
    body: 'Num processo público, a unidade executora realiza uma atividade, a autoridade competente decide dentro de suas atribuições e o controle externo examina a legalidade e os resultados conforme a Constituição. Desenhar o fluxo de responsabilidades ajuda a separar execução, decisão, fiscalização e prestação de contas — funções que não devem ser confundidas.',
    chapterId: 'cap.inst.01',
    sectionId: 'administracao-publica',
    topicIds: ['cg.legislacao.cf'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'Execução administrativa e controle externo são funções institucionais distintas.',
      answer: true,
      why: 'A Administração executa políticas e serviços; o controle externo atua nos termos constitucionais e legais para fiscalizar a gestão pública.',
    },
  }),
  P({
    id: 'post.caio-cicd-rollback',
    teacherId: 'prof.caio',
    publishedAt: '2026-10-25',
    kind: 'caso',
    title: 'Pipeline verde, serviço indisponível: o que faltou?',
    body: 'O código passou nos testes e a imagem foi construída, mas a nova versão falhou depois do deploy. O pipeline não deve ser avaliado apenas pelo último selo verde: precisa incluir validação após a implantação, observabilidade e um plano de recuperação. Antes da mudança, defina como detectar impacto e quem decide interromper ou reverter a versão.',
    chapterId: 'cap.devops.01',
    sectionId: 'cicd',
    topicIds: ['ti.devops.cicd'],
    estimatedMinutes: 2,
    challenge: {
      statement: 'O sucesso da etapa de build garante, por si só, que a versão funcionará corretamente em produção.',
      answer: false,
      why: 'Build e testes prévios não substituem validação no ambiente, monitoramento e procedimentos de rollback.',
    },
  }),

];

/** Quem assina os posts de cada capítulo no feed didático. */
export function teacherForChapter(chapterId: string): FictionalTeacher {
  const prefix = chapterId.split('.')[1] ?? '';
  const id =
    prefix === 'mat' ? 'prof.clara' :
    prefix === 'prim' ? (chapterId === 'cap.prim.02' ? 'prof.davi' : 'prof.lia') :
    prefix === 'infra' ? (chapterId === 'cap.infra.01' ? 'prof.davi' : chapterId === 'cap.infra.02' ? 'prof.caio' : 'prof.lia') :
    prefix === 'seg' ? 'prof.iara' :
    prefix === 'ia' ? 'prof.nina' :
    prefix === 'dev' || prefix === 'es' ? 'prof.ravi' :
    prefix === 'dados' ? 'prof.mateus' :
    prefix === 'gov' ? 'prof.marina' :
    prefix === 'leg' ? 'prof.beatriz' :
    prefix === 'devops' ? 'prof.caio' :
    prefix === 'ingles' ? 'prof.sofia' :
    prefix === 'port' ? 'prof.helena' :
    prefix === 'inst' ? 'prof.augusto' : 'prof.lia';
  return teachers.find((teacher) => teacher.id === id) ?? teachers[0];
}
