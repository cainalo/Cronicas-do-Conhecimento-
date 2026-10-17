import { chapters, lessons, questionsForContest, flashcards, essayPrompts, DEFAULT_CONTEST_ID } from '@/content';
import { emptyData, emptyPending } from '@/lib/model';
import { buildPlan, isDone, localDay, remainingMinutes, setSettings, settingsOf, studyDaysUntil, DEFAULT_SETTINGS } from '@/lib/planner';
import { markSectionRead, recordAnswer } from '@/lib/study';
import { mergeData } from '@/lib/merge';

const content = { chapters, lessons, bank: questionsForContest(DEFAULT_CONTEST_ID), cardIds: flashcards.map((f) => f.id), essays: essayPrompts };
// 20/10/2026 é uma terça-feira; 18/10/2026, domingo.
const tue = new Date(2026, 9, 20, 9, 0);
const sun = new Date(2026, 9, 18, 9, 0);
const mon = new Date(2026, 9, 19, 9, 0);
const sat = new Date(2026, 9, 24, 9, 0);

describe('planejador', () => {
  it('domingo fora da agenda é dia de descanso, sem culpa', () => {
    const p = buildPlan(emptyData(), DEFAULT_SETTINGS, content, sun);
    expect(p.restDay).toBe(true);
    expect(p.items).toHaveLength(0);
  });

  it('respeita o tempo disponível e começa pelo conteúdo não lido', () => {
    const p = buildPlan(emptyData(), { ...DEFAULT_SETTINGS, minutesPerDay: 30 }, content, tue);
    const total = p.items.reduce((m, i) => m + i.minutes, 0);
    expect(total).toBeLessThanOrEqual(30 + 10);
    expect(p.items[0].kind).toBe('cards'); // há cartões novos para hoje
    expect(p.items.some((i) => i.kind === 'read')).toBe(true);
  });

  it('prioriza revisão de erros e marca atividades cumpridas pelo estudo real', () => {
    let d = emptyData();
    const q = content.bank[0];
    d = recordAnswer(d, q, q.options.find((o) => o.key !== q.answer)!.key, 'lesson', 'x').data;
    const p = buildPlan(d, DEFAULT_SETTINGS, content, tue);
    expect(p.items[0].kind).toBe('review');
    const read = p.items.find((i) => i.kind === 'read')!;
    expect(isDone(read, d, p.day)).toBe(false);
    d = markSectionRead(d, chapters.find((c) => c.id === read.chapterId)!, read.ref!).data;
    expect(isDone(read, d, p.day)).toBe(true);
  });

  it('estudo de caso no primeiro dia da semana e simulado no último, quando há base', () => {
    expect(buildPlan(emptyData(), { ...DEFAULT_SETTINGS, minutesPerDay: 120 }, content, mon).items.some((i) => i.kind === 'essay')).toBe(true);
    let d = emptyData();
    for (const q of content.bank.slice(0, 10)) d = recordAnswer(d, q, q.answer, 'lesson', 'x').data;
    expect(buildPlan(d, { ...DEFAULT_SETTINGS, minutesPerDay: 120 }, content, sat).items.some((i) => i.kind === 'exam')).toBe(true);
  });

  it('conta dias de estudo, minutos restantes e sincroniza preferências', () => {
    expect(studyDaysUntil('2026-10-26', [1, 2, 3, 4, 5, 6], sun)).toBe(6); // seg a sáb
    expect(remainingMinutes(emptyData(), content)).toBeGreaterThan(100);
    const d = setSettings(emptyData(), { minutesPerDay: 90, weekdays: [1, 3, 5], dailyQuestionGoal: 20 }, '2026-10-17T10:00:00.000Z');
    expect(d.pending.settings).toBe(true);
    expect(settingsOf(d).minutesPerDay).toBe(90);
    const older = setSettings(emptyData(), { minutesPerDay: 30, weekdays: [1], dailyQuestionGoal: 5 }, '2026-10-16T10:00:00.000Z');
    expect(mergeData({ ...older, pending: emptyPending() }, d).settings!.minutesPerDay).toBe(90);
    expect(localDay(new Date(2026, 0, 2, 23, 30))).toBe('2026-01-02');
  });
});
