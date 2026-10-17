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

import { essayPrompts } from '@/content';

describe('estudos de caso', () => {
  it.each(essayPrompts.map((e) => [e.id, e] as const))('%s é bem formado', (_id, e) => {
    expect(e.criteria.reduce((s, c) => s + c.points, 0)).toBe(100);
    expect(new Set(e.criteria.map((c) => c.id)).size).toBe(e.criteria.length);
    const ids = topicsForContest(e.contestId).map((t) => t.id);
    e.topicIds.forEach((t) => expect(ids).toContain(t));
    expect(e.origin).not.toBe('oficial');
    expect(e.modelAnswer.length).toBeGreaterThan(400);
  });
});

import { allSectionExtras } from '@/content';

describe('cenas e atividades por seção', () => {
  it('toda seção de todo capítulo tem cena e atividades', () => {
    for (const c of chapters) for (const s of c.sections) expect(allSectionExtras[`${c.id}:${s.id}`], `${c.id}:${s.id}`).toBeTruthy();
  });
  it.each(Object.entries(allSectionExtras))('%s é bem formada', (key, ex) => {
    const [chapterId, sectionId] = key.split(':');
    expect(getChapter(chapterId)?.sections.some((s) => s.id === sectionId)).toBe(true);
    expect(ex.scene.length).toBeGreaterThanOrEqual(3);
    expect(ex.truths.some((t) => t.answer) && ex.truths.some((t) => !t.answer)).toBe(true);
    for (const b of ex.blanks) {
      expect(b.sentence.split('___').length).toBe(2);
      expect(new Set(b.options).size).toBe(b.options.length);
      expect(b.options).toContain(b.answer);
    }
    expect(ex.outro.length).toBeGreaterThan(10);
  });
});

// Camada "do zero": cada trecho tem uma explicação curta e simples antes do texto completo.
import { allSimpleSections } from '@/content';
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
describe('explicação simples por trecho', () => {
  it('toda seção tem explicação simples e nenhuma sobra', () => {
    const keys = new Set(chapters.flatMap((c) => c.sections.map((s) => `${c.id}:${s.id}`)));
    for (const k of keys) expect(allSimpleSections[k], k).toBeTruthy();
    for (const k of Object.keys(allSimpleSections)) expect(keys.has(k), k).toBe(true);
  });
  it.each(Object.entries(allSimpleSections))('%s é curta e bem formada', (_k, s) => {
    expect(s.pages.length).toBeGreaterThanOrEqual(4);
    expect(s.pages.length).toBeLessThanOrEqual(7);
    for (const p of s.pages) {
      expect(p.title.length).toBeGreaterThan(2);
      expect(words(p.text)).toBeLessThanOrEqual(70);
    }
    expect(s.pages[s.pages.length - 1].title).toBe('Resumindo');
    expect(s.words.length).toBeGreaterThanOrEqual(4);
    expect(s.words.length).toBeLessThanOrEqual(8);
    expect(s.checks.length).toBe(3);
    expect(s.checks.some((c) => c.answer)).toBe(true);
    expect(s.checks.some((c) => !c.answer)).toBe(true);
  });
});
