// Estado de cada atividade da trilha principal (reformulação, Fase 1). Regra de pré-requisito
// mínima, enquanto o grafo de conceitos (Fase 3) não existe: dentro de um capítulo, as atividades
// seguem a ordem (aprender → praticar → missão → ... → desafio), e uma só abre quando todas as
// anteriores do mesmo capítulo foram concluídas. Capítulos diferentes não se bloqueiam entre si.
// Funções puras, sem React.
import type { StudyData } from './model';
import { unitDone, type Unit } from './pace';
import type { Checkpoint } from './checkpoint';

export type UnitState = 'feita' | 'atual' | 'disponivel' | 'bloqueada';

export interface TrailChapter {
  chapterId: string;
  units: { unit: Unit; state: UnitState; index: number }[];
  done: number;
}

export function unitStates(data: StudyData, units: Unit[], checkpoint?: Pick<Checkpoint, 'unit'>): UnitState[] {
  const blockedChapter = new Set<string>();
  return units.map((u) => {
    const done = !!unitDone(data, u);
    let state: UnitState;
    if (done) state = 'feita';
    else if (blockedChapter.has(u.chapterId)) state = 'bloqueada';
    else {
      state = 'disponivel';
      // A primeira pendente do capítulo abre; as seguintes ficam bloqueadas até ela ser feita.
      blockedChapter.add(u.chapterId);
    }
    if (checkpoint?.unit && checkpoint.unit.key === u.key && !done) state = 'atual';
    return state;
  });
}

/** Agrupa por capítulo, na ordem da trilha. */
export function trailByChapter(data: StudyData, units: Unit[], checkpoint?: Pick<Checkpoint, 'unit'>): TrailChapter[] {
  const states = unitStates(data, units, checkpoint);
  const out: TrailChapter[] = [];
  units.forEach((unit, index) => {
    let ch = out[out.length - 1];
    if (!ch || ch.chapterId !== unit.chapterId) {
      ch = { chapterId: unit.chapterId, units: [], done: 0 };
      out.push(ch);
    }
    ch.units.push({ unit, state: states[index], index });
    if (states[index] === 'feita') ch.done++;
  });
  return out;
}
