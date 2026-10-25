import { concepts, getChapter, learningUnits, microLessons, questionsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { emptyData } from '@/lib/model';
import { saveProgress } from '@/lib/checkpoint';
import { markSectionRead } from '@/lib/study';
import { buildPractice } from '@/lib/practice';
import { diversityReport, eligible, fromMission, fromPractice, interleave, practiceUnlocked, taughtConcepts } from '@/lib/engine';
import { learnKey } from '@/lib/pace';

const unit = learningUnits[0];
const key = learnKey(unit.chapterId, unit.sectionId);

describe('engine de atividades', () => {
  it('adapta os dois formatos ao contrato único, com família e código de erro', () => {
    const m = microLessons[0];
    const a = fromMission(m.steps[0].check, ['c.so.processo']);
    expect(a.kind).toBe('single_choice');
    expect(a.family).toBe('escolha');
    expect(a.errorCode).not.toBe('');
    const ord = fromMission(m.consolidation.find((x) => x.kind === 'order')!);
    expect(ord.kind).toBe('order_sequence');
    expect(ord.errorCode).toBe('sequence_error');
    const diag = fromMission(m.opening, ['c.so.processo'], 'diagnostic');
    expect(diag.assessesConceptIds).toEqual([]);
    const p = fromPractice({ kind: 'term', id: 'x', definition: 'd', options: ['a', 'b'], answer: 'a' });
    expect([p.kind, p.errorCode]).toEqual(['single_choice', 'term_confusion']);
  });

  it('conceitos ensinados seguem a etapa salva; diagnóstico e etapas futuras não contam', () => {
    expect(taughtConcepts(emptyData(), learningUnits).size).toBe(0);
    let d = saveProgress(emptyData(), key, { stage: 'etapas', step: 2, recovery: null, pi: 0, results: {}, struggled: [] });
    const t = taughtConcepts(d, learningUnits);
    expect(t.has('c.so.processo')).toBe(true); // etapa 1
    expect(t.has('c.so.pid')).toBe(true); // etapa 2
    expect(t.has('c.so.thread')).toBe(false); // etapa 3, ainda não concluída
    // Formato antigo da microaula também é entendido.
    d = saveProgress(emptyData(), key, { phase: { k: 'checar', i: 1 }, first: {}, struggled: [] });
    expect(taughtConcepts(d, learningUnits).has('c.so.pid')).toBe(false);
    // Trecho concluído: todos os conceitos da unidade.
    d = markSectionRead(emptyData(), getChapter(unit.chapterId)!, unit.sectionId).data;
    expect(taughtConcepts(d, learningUnits).size).toBe(unit.conceptIds.length);
  });

  it('gate: atividade que exige conceito não ensinado não é elegível (diagnóstico é exceção)', () => {
    const act = fromMission(unit.practice[0].activity, unit.practice[0].assesses);
    expect(eligible(act, new Set())).toBe(false);
    expect(eligible(act, new Set(unit.conceptIds))).toBe(true);
    expect(eligible(fromMission(unit.opening.activity, ['c.so.processo'], 'diagnostic'), new Set())).toBe(true);
  });

  it('prática do piloto só usa termos de conceitos ensinados, e só abre depois do Aprender', () => {
    const ch = getChapter(unit.chapterId)!;
    expect(practiceUnlocked(emptyData(), ch, unit.sectionId)).toBe(false);
    const d = markSectionRead(emptyData(), ch, unit.sectionId).data;
    expect(practiceUnlocked(d, ch, unit.sectionId)).toBe(true);
    const taught = taughtConcepts(d, learningUnits);
    const glossary = concepts.filter((c) => unit.conceptIds.includes(c.id) && taught.has(c.id)).map((c) => ({ term: c.term, definition: c.definition }));
    const allowed = new Set(glossary.map((g) => g.term));
    const round = buildPractice(ch, unit.sectionId, questionsForContest(DEFAULT_CONTEST_ID), undefined, () => 0.4, undefined, glossary);
    for (const a of round) {
      if (a.kind === 'term') expect(allowed.has(a.answer)).toBe(true);
      if (a.kind === 'pairs') for (const p of a.pairs) expect(allowed.has(p.term)).toBe(true);
    }
    // O glossário do capítulo inteiro (LDAP, permissão 750...) não entra.
    expect(round.some((a) => a.kind === 'term' && /LDAP|750/.test(a.answer))).toBe(false);
  });

  it('diversidade: acusa V/F demais e três iguais seguidas; interleave resolve sem perder itens', () => {
    const tf = (i: number) => fromPractice({ kind: 'tf', id: `t${i}`, statement: 's', answer: true, why: 'w' });
    const ch = (i: number) => fromMission({ kind: 'choice', id: `c${i}`, prompt: 'p', options: [{ text: 'a', why: 'w' }, { text: 'b', why: 'w' }], answer: 0 });
    const bad = [tf(1), tf(2), tf(3), ch(1), ch(2), ch(3), ch(4), ch(5), ch(6), ch(7)];
    const rep = diversityReport(bad);
    expect(rep.some((r) => r.startsWith('verdadeiro ou falso demais'))).toBe(true);
    expect(rep.some((r) => r.startsWith('três'))).toBe(true);
    const mixed = [tf(1), tf(2), ch(1), ch(2), ch(3), fromPractice({ kind: 'blank', id: 'b', sentence: '___', options: ['x'], answer: 'x', why: 'w' })];
    const fixed = interleave(mixed);
    expect(fixed).toHaveLength(mixed.length);
    expect(diversityReport(fixed, { maxTfShare: 0.5 }).filter((r) => r.startsWith('três'))).toEqual([]);
  });

  it('microaulas existentes passam na régua de diversidade da engine (prática final)', () => {
    for (const m of microLessons) expect(diversityReport(m.consolidation.map((a) => fromMission(a)))).toEqual([]);
  });
});
