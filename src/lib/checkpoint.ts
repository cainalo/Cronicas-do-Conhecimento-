// Fonte única da trilha (auditoria de 24/10/2026, P0-01/P0-02): a mesma função decide para onde
// levam o "Continuar" do cabeçalho, o botão central do menu, a Torre e o cartão de ritmo. Também
// guarda o ponto exato de cada atividade em andamento (página do Aprender, fila da Prática, etapa da
// missão, cartão/questão do Desafio, etapa da microaula), para retomar no mesmo lugar depois de sair
// ou recarregar. Funções puras, sem React.
import type { StudyData, SessionProgress } from './model';
import { unitDone, type Unit } from './pace';

export type { SessionProgress };

/** Guarda o ponto de uma atividade em andamento. */
export function saveProgress(data: StudyData, key: string, step: unknown, label?: string, now = new Date().toISOString()): StudyData {
  return { ...data, progress: { ...data.progress, [key]: { step, label, updatedAt: now } } };
}

/** Apaga o ponto salvo (ao concluir ou ao recomeçar de propósito). */
export function clearProgress(data: StudyData, key: string): StudyData {
  if (!data.progress?.[key]) return data;
  const rest = { ...data.progress };
  delete rest[key];
  return { ...data, progress: rest };
}

export const readProgress = <T>(data: StudyData, key: string): T | undefined => data.progress?.[key]?.step as T | undefined;

export interface Checkpoint {
  /** Atividade para onde o Continuar leva (ausente quando o curso todo foi feito). */
  unit?: Unit;
  to: string;
  /** "Começar" (nada feito ainda) ou "Continuar". */
  action: 'Começar' | 'Continuar';
  /** Título da atividade. */
  title: string;
  /** Contexto curto: posição na trilha e etapa salva. */
  context: string;
  /** Está no meio de uma atividade (há ponto salvo)? */
  resuming: boolean;
  position: number;
  total: number;
}

const KIND_LABEL: Record<Unit['kind'], string> = { aprender: 'Aprender', narrada: 'Aula narrada', video: 'Videoaula', professores: 'Professores', praticar: 'Praticar', missao: 'Missão', flashcards: 'Cartões', desafio: 'Desafio', laboratorio: 'Laboratório prático', escritorio: 'Escritório de TI' };

export function getLearningCheckpoint(data: StudyData, units: Unit[]): Checkpoint {
  // 1) Uma atividade em andamento (com ponto salvo e ainda não concluída) tem prioridade: a mais recente.
  let resume: { u: Unit; i: number; at: string; label?: string } | undefined;
  units.forEach((u, i) => {
    const p = data.progress?.[u.key];
    if (p && !unitDone(data, u) && (!resume || p.updatedAt > resume.at)) resume = { u, i, at: p.updatedAt, label: p.label };
  });
  const anyDone = units.some((u) => unitDone(data, u)) || !!Object.keys(data.progress ?? {}).length;
  if (resume) {
    return {
      unit: resume.u,
      to: resume.u.to,
      action: 'Continuar',
      title: resume.u.title,
      context: `Atividade ${resume.i + 1} de ${units.length} · ${resume.label ?? KIND_LABEL[resume.u.kind]}`,
      resuming: true,
      position: resume.i + 1,
      total: units.length,
    };
  }
  // 2) Senão, a primeira atividade ainda não feita, na ordem da trilha.
  const i = units.findIndex((u) => !unitDone(data, u));
  if (i < 0) {
    return { to: '/revisao', action: 'Continuar', title: 'Revisar e treinar para a prova', context: 'Todo o curso foi feito', resuming: false, position: units.length, total: units.length };
  }
  const u = units[i];
  return {
    unit: u,
    to: u.to,
    action: anyDone ? 'Continuar' : 'Começar',
    title: u.title,
    context: anyDone ? `Atividade ${i + 1} de ${units.length} · ${KIND_LABEL[u.kind]}` : `Começando do zero · atividade 1 de ${units.length}`,
    resuming: false,
    position: i + 1,
    total: units.length,
  };
}
