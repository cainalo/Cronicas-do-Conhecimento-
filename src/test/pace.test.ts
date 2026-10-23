import { chapters, journey, lessons, missions, getChapter } from '@/content';
import { computePace, courseUnits, daysUntilExam, logUnit } from '@/lib/pace';
import { emptyData } from '@/lib/model';
import { markSectionRead } from '@/lib/study';
import { completePractice } from '@/lib/practice';

describe('ritmo até a prova', () => {
  const units = courseUnits(journey, lessons, missions);
  it('conta os dias pelo calendário: de 23/10/2026 a 17/01/2027 são 86', () => {
    expect(daysUntilExam('2027-01-17', new Date(2026, 9, 23, 0, 5))).toBe(86);
    expect(daysUntilExam('2027-01-17', new Date(2026, 9, 23, 23, 50))).toBe(86);
    expect(daysUntilExam('2027-01-17', new Date(2027, 0, 17, 9))).toBe(0);
  });
  it('soma todas as atividades: aprender e praticar por trecho, missões e desafios', () => {
    const sections = chapters.reduce((n, c) => n + c.sections.length, 0);
    expect(units.length).toBe(sections * 2 + lessons.length + missions.length);
    expect(new Set(units.map((u) => u.key)).size).toBe(units.length);
    expect(units[0].kind).toBe('aprender');
  });
  it('divide o que falta pelos dias de estudo, guardando a última semana para revisão', () => {
    const p = computePace(emptyData(), units, '2027-01-17', new Date(2026, 9, 23, 10));
    expect(p.daysLeft).toBe(86);
    expect(p.studyDays).toBe(79);
    expect(p.finishBy).toBe('2027-01-09');
    expect(p.perDay).toBe(Math.ceil(units.length / 79));
    expect(p.leftToday).toBe(p.perDay);
    expect(p.next?.key).toBe(units[0].key);
  });
  it('o que foi feito hoje desconta da meta de hoje, sem aumentar a meta', () => {
    const now = new Date(2026, 9, 23, 10);
    const iso = now.toISOString();
    const ch = getChapter(units[0].chapterId)!;
    let d = markSectionRead(emptyData(), ch, units[0].sectionId!, iso).data;
    d = completePractice(d, ch.id, units[0].sectionId!, 90, iso).data;
    const before = computePace(emptyData(), units, '2027-01-17', now);
    const p = computePace(d, units, '2027-01-17', now);
    expect(p.done).toBe(2);
    expect(p.doneToday).toBe(2);
    expect(p.perDay).toBe(before.perDay);
    expect(p.leftToday).toBe(before.perDay - 2);
  });
  it('perto da prova não reserva semana e nunca divide por zero', () => {
    const p = computePace(emptyData(), units, '2027-01-17', new Date(2027, 0, 14, 8));
    expect(p.studyDays).toBe(3);
    expect(computePace(emptyData(), units, '2027-01-17', new Date(2027, 0, 17, 8)).studyDays).toBe(1);
    expect(logUnit(logUnit(emptyData(), 'x', 'a').unitLog ? logUnit(emptyData(), 'x', 'a') : emptyData(), 'x', 'b').unitLog!.x).toBe('a');
  });
});
