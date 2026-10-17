import { questoesCap01 } from '@/content/grimoires/seguranca/questions-cap01';
import { capCriptografia } from '@/content/grimoires/seguranca';
import { emptyData, emptyPending } from '@/lib/model';
import { mergeData } from '@/lib/merge';
import { markSectionRead, recordAnswer, totalXp } from '@/lib/study';

const q = questoesCap01[0];

describe('fusão entre dispositivos', () => {
  it('une tentativas por id e XP por (tipo, referência), sem duplicar', () => {
    const a = recordAnswer(emptyData(), q, q.answer, 'lesson', 'x').data;
    const b = recordAnswer(emptyData(), q, q.answer, 'lesson', 'x').data; // outro aparelho
    const m = mergeData({ ...a, pending: emptyPending() }, b);
    expect(m.attempts).toHaveLength(2);
    expect(totalXp(m)).toBe(10);
    // O XP local que conflitou com o remoto não fica pendente.
    expect(m.pending.xp).toHaveLength(0);
  });

  it('une seções lidas de dois aparelhos', () => {
    const a = markSectionRead(emptyData(), capCriptografia, 'fundamentos', '2026-10-17T10:00:00.000Z').data;
    const b = markSectionRead(emptyData(), capCriptografia, 'hash', '2026-10-17T11:00:00.000Z').data;
    const m = mergeData(a, b);
    expect(m.reading[capCriptografia.id].sectionsRead.sort()).toEqual(['fundamentos', 'hash']);
    expect(m.reading[capCriptografia.id].lastSectionId).toBe('hash');
  });

  it('migração do visitante marca tudo como pendente', () => {
    const guest = { ...recordAnswer(emptyData(), q, q.answer, 'lesson', 'x').data, pending: emptyPending() };
    const m = mergeData(emptyData(), guest, true);
    expect(m.pending.attempts).toHaveLength(1);
    expect(m.pending.xp).toHaveLength(1);
  });
});
