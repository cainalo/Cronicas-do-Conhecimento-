// Reinício do progresso de estudos (pacote v4, etapa 7). Funções puras.
// Em vez de apagar o histórico remoto (o RLS nem permite), o reinício grava uma marca de tempo
// (`progressResetAt`, no aparelho e em profiles.progress_reset_at). Todo registro de estudo anterior
// a ela deixa de contar, venha de onde vier: do aparelho, de outro aparelho, do espelho no IndexedDB
// ou de uma sincronização atrasada. Assim nenhum estado antigo "volta" depois do reinício.
import { emptyPending, type StudyData } from './model';

/** O que o reinício limpa e o que mantém (texto da confirmação, para não prometer além do que faz). */
export const RESET_SCOPE = {
  clears: [
    'Trilha: aulas, etapas e trechos concluídos, e o ponto onde o Continuar retoma',
    'Questões respondidas, simulados, revisão espaçada e domínio por trecho',
    'Pontos (XP), sequência de dias e estatísticas',
    'Feed: posição em cada aula, respostas e marcas de entendi e preciso rever',
    'Escritório de TI e casos práticos: andamento e escolhas',
    'Plano do dia e registros de plano semanal',
  ],
  keeps: [
    'Sua conta, login, senha e perfil',
    'Aparência, tamanho do texto, sons e volumes',
    'Meta de estudo (minutos por dia e dias da semana)',
    'Marcadores, redações, anotações, dúvidas e posts guardados no feed',
    'Todo o conteúdo: aulas, questões, vídeos e materiais',
  ],
};

const before = (t: string | undefined, at: string) => !!t && t < at;

/** Remove os registros de estudo anteriores à marca de reinício (e as pendências deles). */
export function dropBefore(d: StudyData, at: string | undefined): StudyData {
  if (!at) return d;
  const keep = <T>(rec: Record<string, T>, ts: (v: T) => string | undefined) =>
    Object.fromEntries(Object.entries(rec).filter(([, v]) => !before(ts(v), at))) as Record<string, T>;
  const attempts = d.attempts.filter((a) => !before(a.answeredAt, at));
  const xp = d.xp.filter((e) => !before(e.createdAt, at));
  const reading = keep(d.reading, (r) => r.updatedAt);
  const lessons = keep(d.lessons, (l) => l.lastCompletedAt);
  const exams = keep(d.exams, (e) => e.startedAt);
  const cards = keep(d.cards, (c) => c.updatedAt);
  const unitLog = d.unitLog ? keep(d.unitLog, (v) => v) : undefined;
  const progress = d.progress ? keep(d.progress, (p) => p.updatedAt) : undefined;
  const story = d.story && before(d.story.updatedAt, at) ? undefined : d.story;
  const has = (ids: string[], set: Set<string>) => ids.filter((id) => set.has(id));
  return {
    ...d,
    attempts,
    xp,
    reading,
    lessons,
    exams,
    cards,
    unitLog: unitLog && Object.keys(unitLog).length ? unitLog : undefined,
    progress: progress && Object.keys(progress).length ? progress : undefined,
    story,
    pending: {
      ...d.pending,
      attempts: has(d.pending.attempts, new Set(attempts.map((a) => a.id))),
      xp: has(d.pending.xp, new Set(xp.map((e) => e.id))),
      reading: has(d.pending.reading, new Set(Object.keys(reading))),
      lessons: has(d.pending.lessons, new Set(Object.keys(lessons))),
      exams: has(d.pending.exams, new Set(Object.keys(exams))),
      cards: has(d.pending.cards, new Set(Object.keys(cards))),
    },
  };
}

/** A marca mais recente entre duas (ISO compara como texto). */
export const latestReset = (a?: string, b?: string) => (a && b ? (a > b ? a : b) : a ?? b);

/**
 * Reinicia o progresso: grava a marca, limpa o que é percurso e deixa pendente o envio da marca.
 * Idempotente: reiniciar de novo só move a marca para agora. Mantém marcadores, redações e meta.
 */
export function resetProgress(d: StudyData, at = new Date().toISOString()): StudyData {
  const cleared = dropBefore({ ...d, progressResetAt: latestReset(d.progressResetAt, at) }, '￿');
  return {
    ...cleared,
    progressResetAt: latestReset(d.progressResetAt, at),
    pending: {
      ...emptyPending(),
      bookmarks: d.pending.bookmarks,
      bookmarkDeletes: d.pending.bookmarkDeletes,
      essays: d.pending.essays,
      settings: d.pending.settings,
      reset: true,
    },
  };
}

/** Chaves do localStorage com andamento de estudo fora do StudyData (só estas são tocadas). */
export function progressStoreKeys(keys: string[], owner: string): string[] {
  return keys.filter(
    (k) =>
      k.startsWith('cronicas:mundo:') ||
      k.startsWith('cronicas:cenario:') ||
      k.startsWith(`cronicas:plano:v2:${owner}:`) ||
      k === 'cronicas:plan-snapshots',
  );
}

/** Feed: zera posição, respostas e marcas de entendi/rever; mantém anotações, dúvidas e guardados. */
export function resetFeedState(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw;
  const f = raw as { react?: Record<string, { salvo?: boolean }> };
  const react: Record<string, { salvo: true }> = {};
  for (const [k, v] of Object.entries(f.react ?? {})) if (v?.salvo) react[k] = { salvo: true };
  return { ...f, cursor: {}, answers: {}, react };
}
