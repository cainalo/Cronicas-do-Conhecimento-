import { getChapter } from '@/content';
import { trailUnits } from '@/app/useCheckpoint';
import { clearProgress, getLearningCheckpoint, saveProgress } from '@/lib/checkpoint';
import { emptyData } from '@/lib/model';
import { markSectionRead } from '@/lib/study';
import { mergeData } from '@/lib/merge';

describe('fonte única da trilha (checkpoint)', () => {
  const units = trailUnits();
  it('sem histórico, começa pela primeira atividade da trilha', () => {
    const c = getLearningCheckpoint(emptyData(), units);
    expect(c.action).toBe('Começar');
    expect(c.to).toBe(units[0].to);
    expect(c.context).toMatch(/do zero/);
  });
  it('uma atividade em andamento tem prioridade e mostra a etapa salva', () => {
    const d = saveProgress(emptyData(), units[5].key, 2, 'Praticar: atividade 3 de 12', '2026-10-24T10:00:00.000Z');
    const c = getLearningCheckpoint(d, units);
    expect(c.resuming).toBe(true);
    expect(c.to).toBe(units[5].to);
    expect(c.context).toContain('atividade 3 de 12');
  });
  it('a mais recente vence e a concluída não volta a ser oferecida', () => {
    // A = primeira aula; P = Praticar do mesmo trecho; H = próxima aula de outro trecho.
    const P = units.findIndex((u) => u.kind === 'praticar');
    const H = P + 1;
    let d = saveProgress(emptyData(), units[H].key, 1, undefined, '2026-10-24T10:00:00.000Z');
    d = saveProgress(d, units[0].key, 4, undefined, '2026-10-24T11:00:00.000Z');
    expect(getLearningCheckpoint(d, units).to).toBe(units[0].to);
    const ch = getChapter(units[0].chapterId)!;
    d = markSectionRead(d, ch, units[0].sectionId!).data;
    expect(getLearningCheckpoint(d, units).to).toBe(units[H].to);
    d = clearProgress(d, units[H].key);
    const c = getLearningCheckpoint(d, units);
    expect(c.to).toBe(units[P].to);
    expect(c.action).toBe('Continuar');
  });
  it('o ponto salvo sobrevive à fusão entre aparelhos (o mais recente vence)', () => {
    const a = saveProgress(emptyData(), 'k', 1, undefined, '2026-10-24T10:00:00.000Z');
    const b = saveProgress(emptyData(), 'k', 3, undefined, '2026-10-24T12:00:00.000Z');
    expect(mergeData(a, b).progress!.k.step).toBe(3);
    expect(mergeData(b, a).progress!.k.step).toBe(3);
  });
});
