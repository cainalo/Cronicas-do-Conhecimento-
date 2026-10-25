import { microLessons, getChapter, getQuestion, microSeries } from '@/content';
import type { MissionActivity } from '@/lib/activities';
import type { MicroLesson } from '@/content/types';
import { diversityProblems, FAMILY } from '@/lib/activities';

describe.each(microLessons)('microaula $id', (m) => {
  it('pertence a um trecho real', () => {
    expect(getChapter(m.chapterId)?.sections.some((s) => s.id === m.sectionId)).toBe(true);
  });
  it('cada etapa tem objetivo, explicação, checagem imediata e recuperação com item diferente', () => {
    // Aula avulsa cobre o trecho inteiro (5 etapas ou mais); em série, cada aula é pequena (3 ou mais).
    expect(m.steps.length).toBeGreaterThanOrEqual(m.series ? 3 : 5);
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
  it('sem listas aninhadas (não se dividem em partes e quebrariam a tela sem rolagem)', () => {
    for (const s of m.steps) for (const t of [s.explain, s.example ?? '', s.recovery.explain]) expect(/\n\s{2,}[-*\d]/.test(t), s.id).toBe(false);
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

/** Todo o texto que o estudante lê numa atividade (enunciado, apoio, alternativas, explicações). */
function activityText(a: MissionActivity): string {
  const parts: string[] = [a.prompt, a.context ?? ''];
  if (a.kind === 'choice') a.options.forEach((o) => parts.push(o.text, o.why));
  if (a.kind === 'multi') a.options.forEach((o) => parts.push(o.text, o.why));
  if (a.kind === 'order' || a.kind === 'tf') parts.push(a.why, ...('items' in a ? a.items : []));
  if (a.kind === 'sort') parts.push(...a.categories, ...a.items.flatMap((i) => [i.text, i.why]));
  if (a.kind === 'compare') parts.push(a.why, ...a.scenarios.flatMap((x) => [x.title, x.body]));
  if (a.kind === 'fix') parts.push(a.why, a.fixed, ...a.lines);
  if (a.variant) parts.push(activityText(a.variant));
  return parts.join(' \n ');
}

/** Textos de uma aula com a posição (etapa) em que aparecem; prática e prova ficam depois da última etapa. */
function textsOf(m: MicroLesson): { pos: number; where: string; text: string }[] {
  const out = m.steps.flatMap((s, i) => [
    { pos: i, where: `${s.id} (explicação)`, text: [s.title, s.goal, s.explain, s.example ?? ''].join(' ') },
    { pos: i, where: `${s.id} (checagem)`, text: activityText(s.check) },
    { pos: i, where: `${s.id} (recuperação)`, text: s.recovery.explain + ' ' + activityText(s.recovery.check) },
  ]);
  m.consolidation.forEach((a) => out.push({ pos: m.steps.length, where: `prática ${a.id}`, text: activityText(a) }));
  return out;
}

/** Usos de termo antes da aula/etapa que o apresenta. */
function vocabProblems(lessons: MicroLesson[]): string[] {
  const intro = lessons.flatMap((m, li) =>
    (m.vocab ?? []).map((v) => {
      const si = m.steps.findIndex((s) => s.id === v.step);
      if (si < 0) throw new Error(`${m.id}: etapa ${v.step} do termo ${v.term} não existe`);
      return { ...v, at: [li, si] as const, re: new RegExp(v.match, 'i') };
    }),
  );
  const problems: string[] = [];
  lessons.forEach((m, li) => {
    for (const t of textsOf(m)) {
      for (const v of intro) {
        const before = li < v.at[0] || (li === v.at[0] && t.pos < v.at[1]);
        if (before && v.re.test(t.text)) problems.push(`${m.id} › ${t.where}: usa "${v.term}" antes da aula ${v.at[0] + 1}, etapa ${v.at[1] + 1}`);
      }
    }
  });
  return problems;
}

it('o validador de vocabulário acusa termo usado antes de ser ensinado', () => {
  const [a, b] = [microLessons.find((m) => m.id === 'mat.inteiros.1')!, microLessons.find((m) => m.id === 'mat.inteiros.6')!];
  // Uma checagem da aula 1 que fala de "fração" (ensinada só na aula 6) precisa ser acusada.
  const early: MicroLesson = { ...a, steps: [{ ...a.steps[0], check: { ...a.steps[0].check, prompt: 'Qual fração representa isso?' } }, ...a.steps.slice(1)] };
  expect(vocabProblems([early, b]).some((p) => p.includes('"fração"'))).toBe(true);
  expect(vocabProblems([a, b])).toEqual([]);
});

const seriesIds = [...new Set(microLessons.filter((m) => m.series).map((m) => m.series!.id))];

describe.each(seriesIds)('série %s: ordem didática', (id) => {
  const first = microLessons.find((m) => m.series?.id === id)!;
  const lessons = microSeries(first.chapterId, first.sectionId);

  it('aulas em ordem, sem buracos, no mesmo trecho', () => {
    expect(lessons.map((m) => m.series!.order)).toEqual(lessons.map((_, i) => i + 1));
  });

  it('nenhum termo é usado antes de ser ensinado (explicações, atividades, alternativas e feedback)', () => {
    expect(vocabProblems(lessons)).toEqual([]);
  });

  it('questões de prova só na aula em que tudo o que pedem já foi ensinado (sempre do trecho)', () => {
    for (const m of lessons) for (const e of m.exam) expect(e.kind === 'exam' && getQuestion(e.questionId)?.sectionId).toBe(m.sectionId);
  });
});

describe.each(microLessons.filter((m) => m.vocab && !m.series))('aula $id: vocabulário controlado', (m) => {
  it('nenhum termo é usado antes da etapa que o ensina', () => {
    expect(vocabProblems([m])).toEqual([]);
  });
});
