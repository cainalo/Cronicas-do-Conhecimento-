// Materiais externos da página Estudos. Regra: só entra o que tem fonte verificável. Nada de título,
// duração ou autor inventado. Videoaulas curadas ficam vazias até alguém conferir cada vídeo (título,
// canal, duração e se cobre o edital); enquanto isso a pessoa pode guardar as suas próprias.
export interface ExternalMaterial {
  id: string;
  title: string;
  /** Quem publica (órgão ou projeto oficial). */
  publisher: string;
  url: string;
  /** Para que serve no estudo. */
  use: string;
  /** Capítulo relacionado, quando houver. */
  chapterId?: string;
}

export interface CuratedVideo {
  id: string;
  title: string;
  /** Canal que publica; "não conferido" enquanto ninguém abriu o vídeo no YouTube. */
  channel: string;
  url: string;
  /** Duração conferida no próprio vídeo, "mm:ss" (só quando conferida). */
  duration?: string;
  chapterId: string;
  sectionId?: string;
  /** Aula da trilha que ensina o mesmo assunto em texto. */
  lessonId?: string;
  /** O que o vídeo ajuda a aprender. */
  objective: string;
  /**
   * "conferido": uma pessoa abriu o vídeo e conferiu título, canal, duração e se cobre o edital.
   * "a-conferir": encontrado por busca, sem acesso ao YouTube para conferir. Aparece com aviso.
   */
  status: 'conferido' | 'a-conferir';
  checkedAt: string;
  /** Onde o vídeo foi encontrado, quando ainda não conferido. */
  source?: string;
}

/** Documentação oficial dos assuntos já escritos (endereços estáveis dos próprios mantenedores). */
export const externalMaterials: ExternalMaterial[] = [
  {
    id: 'lei-13709',
    title: 'Lei nº 13.709/2018 (LGPD), texto compilado',
    publisher: 'Planalto (Presidência da República)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    use: 'Conferir artigos citados no capítulo de proteção de dados.',
  },
  {
    id: 'lei-14133',
    title: 'Lei nº 14.133/2021 (Licitações e Contratos), texto compilado',
    publisher: 'Planalto (Presidência da República)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm',
    use: 'Conferir os artigos sobre contratações citados nas normas.',
  },
  {
    id: 'man-ps',
    title: 'Manual do comando ps (Linux man-pages)',
    publisher: 'Linux man-pages project',
    url: 'https://man7.org/linux/man-pages/man1/ps.1.html',
    use: 'Opções do ps vistas na aula de processos.',
  },
  {
    id: 'man-kill',
    title: 'Manual dos sinais (signal(7), Linux man-pages)',
    publisher: 'Linux man-pages project',
    url: 'https://man7.org/linux/man-pages/man7/signal.7.html',
    use: 'Lista oficial de sinais, como SIGTERM e SIGKILL.',
  },
  {
    id: 'pg-select',
    title: 'PostgreSQL: comando SELECT',
    publisher: 'PostgreSQL Global Development Group',
    url: 'https://www.postgresql.org/docs/current/sql-select.html',
    use: 'Referência das cláusulas usadas na missão de SQL.',
  },
];

// Encontrados em 26/10/2026 por busca na web. O YouTube não é acessível do ambiente onde o app foi
// montado, então título e canal vêm do índice de busca e a duração não foi conferida. Ficam marcados
// como "a conferir" até alguém abrir cada um e confirmar.
const BUSCA = 'Índice de busca na web (página de resumo de terceiros); não aberto no YouTube';

/** Videoaulas: conferidas por uma pessoa, ou sugestões marcadas "a conferir". */
export const curatedVideos: CuratedVideo[] = [
  {
    id: 'yt-YJyY6A_MOQc',
    title: 'FRAÇÕES (Parte 1): Notação de Frações e suas propriedades | Matemática Básica - Aula 4',
    channel: 'Não conferido',
    url: 'https://www.youtube.com/watch?v=YJyY6A_MOQc',
    chapterId: 'cap.mat.01',
    sectionId: 'inteiros',
    lessonId: 'mat.inteiros.6',
    objective: 'O que é uma fração, frações equivalentes e simplificação.',
    status: 'a-conferir',
    checkedAt: '2026-10-26',
    source: BUSCA,
  },
  {
    id: 'yt-SgJpB78R7x0',
    title: 'FRAÇÕES (Parte 2): Operações Básicas | Matemática Básica - Aula 5',
    channel: 'Não conferido',
    url: 'https://www.youtube.com/watch?v=SgJpB78R7x0',
    chapterId: 'cap.mat.01',
    sectionId: 'inteiros',
    lessonId: 'mat.inteiros.7',
    objective: 'Somar, subtrair, multiplicar e dividir frações.',
    status: 'a-conferir',
    checkedAt: '2026-10-26',
    source: BUSCA,
  },
  {
    id: 'yt-4Vfw1XiHTpM',
    title: 'POTENCIAÇÃO: Definição e Propriedades | Matemática Básica - Aula 6',
    channel: 'Não conferido',
    url: 'https://www.youtube.com/watch?v=4Vfw1XiHTpM',
    chapterId: 'cap.mat.01',
    sectionId: 'inteiros',
    lessonId: 'mat.inteiros.5',
    objective: 'Potência como multiplicação repetida, sinais e propriedades.',
    status: 'a-conferir',
    checkedAt: '2026-10-26',
    source: BUSCA,
  },
];
