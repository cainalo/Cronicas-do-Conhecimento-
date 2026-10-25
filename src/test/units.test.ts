import { concepts, getChapter, getQuestion, learningUnits, microLessons } from '@/content';
import { conceptForTerm, findCycle, validateConcepts, validateUnit } from '@/lib/contentValidator';
import type { LearningUnit } from '@/content/learning';

describe('contrato das unidades interativas', () => {
  it('glossário sem ids nem aliases repetidos', () => {
    expect(validateConcepts(concepts)).toEqual([]);
  });

  describe.each(learningUnits)('unidade $id', (u) => {
    it('passa no validador: nada é cobrado antes de ser ensinado', () => {
      expect(validateUnit(u, concepts)).toEqual([]);
    });
    it('preserva todo o texto da microaula de origem', () => {
      const m = microLessons.find((x) => x.chapterId === u.chapterId && x.sectionId === u.sectionId)!;
      expect(u.steps.map((s) => s.id)).toEqual(m.steps.map((s) => s.id));
      for (const [i, s] of u.steps.entries()) {
        const blocks = s.blocks.map((b) => ('md' in b ? b.md : ''));
        expect(blocks).toContain(m.steps[i].explain);
        if (m.steps[i].example) expect(blocks).toContain(m.steps[i].example);
        expect(s.recovery.md).toBe(m.steps[i].recovery.explain);
      }
    });
    it('é rastreável ao edital e às questões', () => {
      expect(getChapter(u.chapterId)?.sections.some((s) => s.id === u.sectionId)).toBe(true);
      expect(u.topicIds.length).toBeGreaterThan(0);
      for (const e of u.exam) if (e.activity.kind === 'exam') expect(getQuestion(e.activity.questionId)?.origin).not.toBe('oficial');
    });
    it('cada conceito introduzido tem termo clicável no texto da sua etapa, quando há alias', () => {
      for (const s of u.steps) {
        const bold = [...s.blocks.flatMap((b) => ('md' in b ? [...b.md.matchAll(/\*\*([^*]+)\*\*/g)].map((x) => x[1]) : []))];
        for (const cid of s.introduces) {
          const c = concepts.find((x) => x.id === cid)!;
          if (!c.aliases.length) continue;
          expect(bold.some((t) => conceptForTerm(t, concepts, new Set([cid]))), `${s.id}: ${cid}`).toBe(true);
        }
      }
    });
  });

  it('acusa atividade que cobra conceito ainda não ensinado (e a posição no texto)', () => {
    const u = learningUnits[0];
    const bad: LearningUnit = {
      ...u,
      steps: u.steps.map((s, i) =>
        i === 0 ? { ...s, blocks: s.blocks.map((b) => (b.kind === 'inlineActivity' ? { ...b, assesses: [...b.assesses, 'c.so.thrashing'] } : b)) } : s,
      ),
    };
    const errs = validateUnit(bad, concepts);
    expect(errs).toContainEqual({ unitId: u.id, ref: 'pp-c', message: 'cobra c.so.thrashing antes de ele ser ensinado' });
    const early: LearningUnit = { ...u, steps: [{ ...u.steps[0], blocks: [...u.steps[0].blocks].reverse() }, ...u.steps.slice(1)] };
    expect(validateUnit(early, concepts).some((e) => e.message === 'atividade antes da explicação')).toBe(true);
  });

  it('encontra ciclo no grafo de pré-requisitos', () => {
    expect(findCycle({ a: ['b'], b: ['c'], c: [] })).toBeNull();
    expect(findCycle({ a: ['b'], b: ['c'], c: ['a'] })).toEqual(['a', 'b', 'c', 'a']);
  });

  it('termo em negrito só vira link quando o conceito já foi apresentado', () => {
    const avail = new Set(['c.so.pid']);
    expect(conceptForTerm('PID', concepts, avail)?.id).toBe('c.so.pid');
    expect(conceptForTerm('Thrashing', concepts, avail)).toBeUndefined();
  });
});
