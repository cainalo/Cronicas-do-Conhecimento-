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
  channel: string;
  url: string;
  /** Duração conferida no próprio vídeo, "mm:ss". */
  duration: string;
  chapterId: string;
  checkedAt: string;
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

/** Videoaulas conferidas por uma pessoa. Vazio de propósito: nada entra sem conferência. */
export const curatedVideos: CuratedVideo[] = [];
