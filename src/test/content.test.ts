import { chapters, contests, getChapter, getQuestion, lessons, questions, topicsForContest } from '@/content';

describe('integridade do conteúdo', () => {
  it('ids únicos', () => {
    for (const list of [questions, lessons, chapters]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it.each(questions.map((q) => [q.id, q] as const))('questão %s é bem formada', (_id, q) => {
    expect(q.options.map((o) => o.key)).toEqual(['A', 'B', 'C', 'D', 'E']);
    expect(q.options.some((o) => o.key === q.answer)).toBe(true);
    expect(new Set(q.options.map((o) => o.text)).size).toBe(5);
    expect(q.explanation.length).toBeGreaterThan(40);
    q.options.forEach((o) => expect(o.comment.length).toBeGreaterThan(5));
    // Nunca atribuir à banca uma questão sem comprovação.
    expect(q.origin).not.toBe('oficial');
    const ch = getChapter(q.chapterId);
    expect(ch?.sections.some((s) => s.id === q.sectionId)).toBe(true);
    const topicIds = topicsForContest(q.contestId).map((t) => t.id);
    expect(topicIds).toContain(q.topicId);
  });

  it('lições apontam para questões e capítulos existentes', () => {
    for (const l of lessons) {
      expect(getChapter(l.chapterId)).toBeTruthy();
      l.questionIds.forEach((id) => expect(getQuestion(id)).toBeTruthy());
      expect(l.cards.length).toBeGreaterThan(0);
    }
  });

  it('capítulos têm seções com corpo substancial e tópicos do edital', () => {
    for (const c of chapters) {
      expect(c.sections.length).toBeGreaterThan(0);
      c.sections.forEach((s) => expect(s.body.length).toBeGreaterThan(800));
      const ids = topicsForContest(contests[0].id).map((t) => t.id);
      c.topicIds.forEach((t) => expect(ids).toContain(t));
    }
  });

  it('gabaritos não são todos a mesma letra', () => {
    expect(new Set(questions.map((q) => q.answer)).size).toBeGreaterThanOrEqual(4);
  });
});
