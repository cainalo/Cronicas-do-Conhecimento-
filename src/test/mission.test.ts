import { missions, getQuestion, getChapter, topicsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { diversityProblems, gradeMulti, gradeOrder, gradeSort, shuffled, type MissionActivity } from '@/lib/activities';
import { runQuery, sameResult } from '@/lib/sql';
import { chooseEnding, completeMission, missionDone, missionsDue, reviewDelayDays } from '@/lib/mission';
import { emptyData } from '@/lib/model';

describe('atividades', () => {
  it('corrige seleção múltipla, ordem e classificação item a item', () => {
    const multi = { options: [{ correct: true }, { correct: false }, { correct: true }] };
    expect(gradeMulti(multi, new Set([0, 2])).ok).toBe(true);
    expect(gradeMulti(multi, new Set([0])).parts).toEqual([true, true, false]);
    expect(gradeOrder({ items: ['a', 'b', 'c'] }, ['a', 'c', 'b']).parts).toEqual([true, false, false]);
    expect(gradeSort({ items: [{ cat: 0 }, { cat: 1 }] }, [0, 0]).ok).toBe(false);
  });
  it('embaralha sem devolver a ordem certa', () => {
    expect(shuffled(['a', 'b', 'c'], 1)).not.toEqual(['a', 'b', 'c']);
    expect([...shuffled(['a', 'b', 'c', 'd'], 7)].sort()).toEqual(['a', 'b', 'c', 'd']);
  });
  it('aponta falta de diversidade', () => {
    const tf = (id: string): MissionActivity => ({ kind: 'tf', id, prompt: 'x', answer: true, why: 'y' });
    expect(diversityProblems([tf('1'), tf('2'), tf('3')]).length).toBeGreaterThan(0);
  });
});

describe.each(missions)('missão $id', (m) => {
  it('segue as regras de diversidade do kit', () => {
    expect(diversityProblems([...m.training, m.exam])).toEqual([]);
  });
  it('aponta para tópicos do edital e para um trecho real', () => {
    const topics = new Set(topicsForContest(DEFAULT_CONTEST_ID).map((t) => t.id));
    for (const t of m.topicIds) expect(topics.has(t)).toBe(true);
    expect(getChapter(m.chapterId)?.sections.some((s) => s.id === m.sectionId)).toBe(true);
    expect(m.objectives.length).toBeGreaterThanOrEqual(2);
    expect(m.objectives.length).toBeLessThanOrEqual(4);
  });
  it('questão de prova existe e nunca é marcada como oficial sem fonte', () => {
    const q = m.exam.kind === 'exam' ? getQuestion(m.exam.questionId) : undefined;
    expect(q).toBeTruthy();
    expect(q!.origin).not.toBe('oficial');
  });
  it('cada tarefa do laboratório começa diferente do esperado e o esperado tem linhas', () => {
    for (const t of m.lab.tasks) {
      const exp = runQuery(m.lab.db, t.expected);
      expect(exp.rows.length, t.id).toBeGreaterThan(0);
      expect(sameResult(runQuery(m.lab.db, t.start), exp), t.id).toBe(false);
    }
  });
  it('toda alternativa errada explica o porquê', () => {
    const all = [...m.training, ...m.discovery.map((d) => d.check)];
    for (const a of all) {
      if (a.kind === 'choice') a.options.forEach((o) => expect(o.why.length).toBeGreaterThan(10));
      if (a.kind === 'multi') a.options.forEach((o) => expect(o.why.length).toBeGreaterThan(5));
      if (a.kind === 'sort') a.items.forEach((o) => expect(o.why.length).toBeGreaterThan(5));
    }
  });
});

describe('regras da missão', () => {
  const m = missions[0];
  it('conclui uma vez com XP, marca revisão e guarda a escolha', () => {
    let d = completeMission(emptyData(), m, 80, '2026-10-23T10:00:00.000Z').data;
    expect(missionDone(d, m.id)).toBe(true);
    const xp = d.xp.length;
    d = completeMission(d, m, 100, '2026-10-23T11:00:00.000Z').data;
    expect(d.xp.length).toBe(xp);
    expect(reviewDelayDays(60)).toBe(1);
    expect(missionsDue(d, '2026-10-30T00:00:00.000Z')).toEqual([m.id]);
    d = chooseEnding(d, m, m.ending.options[0].id);
    const again = chooseEnding(d, m, m.ending.options[1].id);
    expect(again.story!.choices[m.id]).toBe(m.ending.options[0].id);
    expect(again.story!.clues).toHaveLength(1);
  });
});
