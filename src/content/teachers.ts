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

];

/** Quem assina os posts de cada capítulo no feed didático. */
export function teacherForChapter(chapterId: string): FictionalTeacher {
  const id = chapterId.startsWith('cap.mat') ? 'prof.clara' : chapterId === 'cap.infra.01' ? 'prof.davi' : chapterId.startsWith('cap.seg') || chapterId === 'cap.infra.02' ? 'prof.iara' : 'prof.lia';
  return teachers.find((t) => t.id === id)!;
}
