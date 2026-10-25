import { emptyData } from '@/lib/model';
import { getChapter } from '@/content';
import { trailUnits } from '@/app/useCheckpoint';
import { getLearningCheckpoint, saveProgress } from '@/lib/checkpoint';
import { markSectionRead } from '@/lib/study';
import { trailByChapter, unitStates } from '@/lib/trail';

describe('estado das atividades da trilha', () => {
  const units = trailUnits();

  it('no começo, só a primeira atividade de cada capítulo abre; a atual é a do Continuar', () => {
    const d = emptyData();
    const cp = getLearningCheckpoint(d, units);
    const states = unitStates(d, units, cp);
    expect(states[0]).toBe('atual');
    expect(states[1]).toBe('bloqueada');
    const chapters = trailByChapter(d, units, cp);
    for (const ch of chapters) {
      const open = ch.units.filter((u) => u.state !== 'bloqueada');
      expect(open).toHaveLength(1);
      expect(open[0]).toBe(ch.units[0]);
    }
  });

  it('concluir a primeira libera a seguinte do mesmo capítulo e marca a feita', () => {
    const first = units[0];
    const d = markSectionRead(emptyData(), getChapter(first.chapterId)!, first.sectionId!).data;
    const states = unitStates(d, units, getLearningCheckpoint(d, units));
    expect(states[0]).toBe('feita');
    expect(states[1]).toBe('atual');
    expect(states[2]).toBe('bloqueada');
  });

  it('uma atividade em andamento noutro capítulo aparece como atual sem desbloquear as posteriores', () => {
    const later = units.find((u) => u.chapterId !== units[0].chapterId)!;
    const d = saveProgress(emptyData(), later.key, 1, 'Página 2');
    const cp = getLearningCheckpoint(d, units);
    const states = unitStates(d, units, cp);
    expect(states[units.indexOf(later)]).toBe('atual');
    expect(states[units.indexOf(later) + 1]).toBe('bloqueada');
  });
});
