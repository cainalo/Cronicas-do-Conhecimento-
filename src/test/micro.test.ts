import { microLessons, getChapter, getQuestion } from '@/content';
import { diversityProblems, FAMILY } from '@/lib/activities';

describe.each(microLessons)('microaula $id', (m) => {
  it('pertence a um trecho real', () => {
    expect(getChapter(m.chapterId)?.sections.some((s) => s.id === m.sectionId)).toBe(true);
  });
  it('cada etapa tem objetivo, explicação, checagem imediata e recuperação com item diferente', () => {
    expect(m.steps.length).toBeGreaterThanOrEqual(5);
    const ids = new Set<string>();
    for (const s of m.steps) {
      expect(s.goal.length, s.id).toBeGreaterThan(10);
      expect(s.explain.length, s.id).toBeGreaterThan(120);
      expect(s.recovery.explain.length, s.id).toBeGreaterThan(60);
      expect(s.recovery.check.id).not.toBe(s.check.id);
      expect(s.recovery.explain).not.toBe(s.explain);
      for (const a of [s.check, s.recovery.check]) {
        expect(ids.has(a.id), a.id).toBe(false);
        ids.add(a.id);
        if (a.kind === 'choice') a.options.forEach((o) => expect(o.why.length).toBeGreaterThan(3));
      }
    }
  });
  it('explica uma ideia por etapa (explicação curta) e não depende de verdadeiro ou falso', () => {
    for (const s of m.steps) expect(s.explain.split(/\s+/).length, s.id).toBeLessThan(170);
    const checks = m.steps.map((s) => s.check);
    expect(checks.filter((a) => a.kind === 'tf').length).toBeLessThanOrEqual(Math.ceil(checks.length * 0.1));
  });
  it('prática final variada e questão de prova autoral existente', () => {
    expect(diversityProblems(m.consolidation)).toEqual([]);
    expect(new Set(m.consolidation.map((a) => FAMILY[a.kind])).size).toBeGreaterThanOrEqual(3);
    for (const e of m.exam) {
      const q = e.kind === 'exam' ? getQuestion(e.questionId) : undefined;
      expect(q).toBeTruthy();
      expect(q!.origin).not.toBe('oficial');
      expect(q!.sectionId).toBe(m.sectionId);
    }
  });
});

describe('partes sem rolagem (SwipePages)', () => {
  it('distribui alturas em páginas sem passar da altura, nunca deixando página vazia', async () => {
    const { packPages } = await import('@/components/SwipePages');
    expect(packPages([100, 100, 100], 250, 10)).toEqual([[0, 1], [2]]);
    expect(packPages([300, 50], 250, 10)).toEqual([[0], [1]]); // item maior que a página fica sozinho
    expect(packPages([], 250, 10)).toEqual([]);
    const hs = [120, 80, 200, 40, 40, 90, 160];
    for (const pg of packPages(hs, 300, 12)) {
      expect(pg.length).toBeGreaterThan(0);
      if (pg.length > 1) expect(pg.reduce((s, i) => s + hs[i], 0) + 12 * (pg.length - 1)).toBeLessThanOrEqual(300);
    }
  });
});
