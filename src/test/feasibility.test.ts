import { journey, learningUnits, missions, getChapter } from '@/content';
import { trailUnits } from '@/app/useCheckpoint';
import { emptyData } from '@/lib/model';
import { markSectionRead } from '@/lib/study';
import { computeFeasibility, fmtHours, studyDaysBetween, unitMinutes } from '@/lib/feasibility';

const units = trailUnits();
const base = { units, chapters: journey, learningUnits, missions, examDate: '2027-01-17', pendingReviewQuestions: 0, dueCards: 0, now: new Date(2026, 9, 25, 10) };

describe('viabilidade do plano em minutos', () => {
  it('conta dias de estudo sem o dia da prova e sem erro de fuso', () => {
    const sun = new Date(2026, 9, 25, 23, 30);
    expect(studyDaysBetween(sun, '2026-11-02', [0, 1, 2, 3, 4, 5, 6])).toBe(8);
    expect(studyDaysBetween(sun, '2026-11-02', [1, 2, 3, 4, 5, 6])).toBe(6);
    expect(studyDaysBetween(sun, '2026-10-25', [0, 1, 2, 3, 4, 5, 6])).toBe(0);
  });

  it('estimativa vem em faixa e usa o tempo da unidade interativa quando existe', () => {
    const r = unitMinutes(units.find((u) => u.sectionId === 'processos' && u.kind === 'aprender')!, { chapters: journey, learningUnits, missions });
    expect(r.typical).toBe(42.5);
    expect(r.min).toBeLessThan(r.typical);
    expect(r.max).toBeGreaterThan(r.typical);
  });

  it('com pouco tempo, mostra déficit positivo e o que seria preciso, sem esconder conteúdo', () => {
    const f = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 15, weekdays: [6] });
    expect(f.feasible).toBe(false);
    expect(f.deficitMinutes).toBe(f.requiredMinutes - f.availableMinutes);
    expect(f.deficitMinutes).toBeGreaterThan(0);
    expect(f.minutesPerDayNeeded).toBeGreaterThan(15);
    expect(f.finalReviewDays).toBe(0); // não reserva a semana final se nem o conteúdo cabe
    expect(f.requiredRange.min).toBeLessThan(f.requiredMinutes);
    expect(f.requiredRange.max).toBeGreaterThan(f.requiredMinutes);
  });

  it('4 dias por semana contra 7 muda o tempo disponível e a viabilidade', () => {
    const four = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 90, weekdays: [1, 3, 5, 6] });
    const seven = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 90, weekdays: [0, 1, 2, 3, 4, 5, 6] });
    expect(seven.availableMinutes).toBeGreaterThan(four.availableMinutes);
    expect(seven.studyDays).toBeGreaterThan(four.studyDays);
    const generous = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 240, weekdays: [0, 1, 2, 3, 4, 5, 6] });
    expect(generous.feasible).toBe(true);
    expect(generous.deficitMinutes).toBe(0);
    expect(generous.finalReviewDays).toBe(7);
  });

  it('o que já foi estudado sai da conta; revisões pendentes entram', () => {
    const first = units[0];
    const done = markSectionRead(emptyData(), getChapter(first.chapterId)!, first.sectionId!).data;
    const a = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 60, weekdays: [1, 2, 3, 4, 5] });
    const b = computeFeasibility({ ...base, data: done, minutesPerDay: 60, weekdays: [1, 2, 3, 4, 5] });
    expect(b.newContentMinutes).toBeLessThan(a.newContentMinutes);
    const c = computeFeasibility({ ...base, data: emptyData(), minutesPerDay: 60, weekdays: [1, 2, 3, 4, 5], pendingReviewQuestions: 10, dueCards: 20 });
    expect(c.requiredMinutes).toBeGreaterThan(a.requiredMinutes);
  });

  it('formata horas', () => {
    expect(fmtHours(200)).toBe('3 h 20 min');
    expect(fmtHours(45)).toBe('45 min');
    expect(fmtHours(120)).toBe('2 h');
  });
});
