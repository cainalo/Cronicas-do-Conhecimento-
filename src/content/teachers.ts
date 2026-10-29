// Sala dos Professores (reformulação, Fase 6; spec 22): posts editoriais curtos, versionados, ligados
// a um trecho da trilha. Os professores são personagens fictícios, sem credenciais reais, e não são
// fonte de autoridade: cada post só repete, de outro jeito, o que a aula do trecho já ensina.
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
    biography: 'Personagem fictícia. Começa sempre por um exemplo de dinheiro, fila ou pizza antes da regra.',
    tone: 'ember',
    fictional: true,
  },
  {
    id: 'prof.lia',
    handle: 'lia.sistemas',
    topics: ['Primeiros passos', 'Sistemas operacionais', 'Linha de comando'],
    name: 'Professora Lia',
    expertiseLabel: 'Sistemas operacionais e linha de comando',
    biography: 'Personagem fictícia. Gosta de comparar o computador com um cartório bem organizado.',
    tone: 'teal',
    fictional: true,
  },
  {
    id: 'prof.davi',
    handle: 'davi.redes',
    topics: ['Redes', 'Internet', 'Serviços'],
    name: 'Professor Davi',
    expertiseLabel: 'Redes e serviços',
    biography: 'Personagem fictício. Explica rede como se fosse o serviço dos Correios.',
    tone: 'azure',
    fictional: true,
  },
  {
    id: 'prof.iara',
    handle: 'iara.seguranca',
    topics: ['Segurança', 'Criptografia', 'Nuvem'],
    name: 'Professora Iara',
    expertiseLabel: 'Segurança e nuvem',
    biography: 'Personagem fictícia. Sempre pergunta: "o que acontece se esta peça quebrar?".',
    tone: 'pink',
    fictional: true,
  },
  {
    id: 'prof.helena', handle: 'helena.palavras', topics: ['Português', 'Interpretação', 'Escrita'],
    name: 'Professora Helena', expertiseLabel: 'Língua portuguesa e interpretação',
    biography: 'Personagem fictícia. Observa como contexto, pontuação e escolha de palavras mudam a interpretação.',
    tone: 'pink', fictional: true,
  },
  {
    id: 'prof.caio', handle: 'caio.incontext', topics: ['Inglês', 'Vocabulário', 'Leitura'],
    name: 'Professor Caio', expertiseLabel: 'Inglês instrumental',
    biography: 'Personagem fictício. Ensina a inferir significados pelo contexto sem traduzir cada palavra.',
    tone: 'azure', fictional: true,
  },
  {
    id: 'prof.tomas', handle: 'tomas.processos', topics: ['Governança', 'Engenharia de software', 'Gestão pública'],
    name: 'Professor Tomás', expertiseLabel: 'Governança e engenharia de software',
    biography: 'Personagem fictício. Organiza problemas em objetivos, papéis, riscos e evidências.',
    tone: 'leaf', fictional: true,
  },
  {
    id: 'prof.joana', handle: 'joana.dados', topics: ['Banco de dados', 'SQL', 'Modelagem'],
    name: 'Professora Joana', expertiseLabel: 'Banco de dados e SQL',
    biography: 'Personagem fictícia. Encontra padrões em tabelas e traduz perguntas em consultas.',
    tone: 'teal', fictional: true,
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
];

/** Quem assina os posts de cada capítulo: o elenco acompanha as disciplinas da trilha. */
export function teacherForChapter(chapterId: string): FictionalTeacher {
  let id = 'prof.lia';
  if (chapterId.startsWith('cap.mat')) id = 'prof.clara';
  else if (chapterId.startsWith('cap.port')) id = 'prof.helena';
  else if (chapterId.startsWith('cap.ingles')) id = 'prof.caio';
  else if (chapterId.startsWith('cap.dados')) id = 'prof.joana';
  else if (chapterId.startsWith('cap.gov') || chapterId.startsWith('cap.es') || chapterId.startsWith('cap.leg') || chapterId.startsWith('cap.inst')) id = 'prof.tomas';
  else if (chapterId === 'cap.infra.01' || chapterId === 'cap.prim.02') id = 'prof.davi';
  else if (chapterId.startsWith('cap.seg') || chapterId.startsWith('cap.ia') || chapterId === 'cap.infra.02') id = 'prof.iara';
  return teachers.find((t) => t.id === id) ?? teachers[0];
}
