import type { CuratedVideo } from './materiais';

/** Videoaulas originais; só entram no currículo depois de envio e conferência dos arquivos. */
export const porticoVideoPlan = [
  {
    id: 'portico.01.computador-por-dentro',
    fileName: '01-o-computador-por-dentro.mp4',
    title: 'O computador por dentro — CPU, memória RAM e armazenamento',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    lessonId: 'micro.infra.processos',
    objective: 'Distinguir o papel do processador, da memória RAM e do armazenamento, acompanhando o caminho que dados e instruções percorrem durante o funcionamento do computador.',
  },
  {
    id: 'portico.02.programa-e-processo',
    fileName: '02-programa-e-processo.mp4',
    title: 'Programa e processo — qual é a diferença?',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    lessonId: 'micro.infra.processos',
    objective: 'Entender por que um programa armazenado é diferente de um processo em execução, como o sistema cria processos e por que cada execução possui estado e recursos próprios.',
  },
] as const;

// Lista vazia até que os MP4s existam no bucket público do Supabase Storage.
const PUBLISHED_IDS: string[] = [];
const BUCKET = 'https://qptxcdksufdpbxddqpsw.supabase.co/storage/v1/object/public/portico-lesson-videos';

export const publishedPorticoVideos: CuratedVideo[] = porticoVideoPlan
  .filter((item) => PUBLISHED_IDS.includes(item.id))
  .map((item) => ({
    id: item.id,
    title: item.title,
    channel: 'Pórtico',
    url: `${BUCKET}/${item.fileName}`,
    chapterId: item.chapterId,
    sectionId: item.sectionId,
    lessonId: item.lessonId,
    objective: item.objective,
    status: 'conferido' as const,
    checkedAt: '2026-11-04',
    source: 'Produção original do Pórtico; arquivo armazenado no Supabase Storage.',
  }));
