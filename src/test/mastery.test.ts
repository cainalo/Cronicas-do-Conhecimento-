import { DEFAULT_CONTEST_ID, chapters, journey, learningUnits, missions, questionsForContest } from '@/content';
import { trailUnits } from '@/app/useCheckpoint';
import { emptyData, type Attempt, type StudyData } from '@/lib/model';
import { sectionMastery, chapterMastery } from '@/lib/mastery';
import { computeFeasibility, snapshotPlan, weeklyPlan } from '@/lib/feasibility';

const bank = questionsForContest(DEFAULT_CONTEST_ID);
const target = chapters.flatMap((c) => c.sections.map((s) => ({ c, s: s.id }))).find(({ c, s }) => bank.filter((q) => q.chapterId === c.id && q.sectionId === s).length >= 2)!;
const qs = bank.filter((q) => q.chapterId === target.c.id && q.sectionId === target.s);

const att = (qid: string, ok: boolean, at: string): Attempt => ({
  id: `${qid}-${at}`,
  contestId: DEFAULT_CONTEST_ID,
  questionId: qid,
  topicId: 't',
  selectedOption: 'A',
  isCorrect: ok,
  context: 'practice',
  answeredAt: at,
});

const read = (d: StudyData): StudyData => ({
  ...d,
  reading: { [target.c.id]: { chapterId: target.c.id, sectionsRead: [target.s], updatedAt: '2026-10-01T00:00:00Z' } },
});

describe('domínio estimado por trecho', () => {
  it('sobe de nível com leitura, prática e acertos em dias diferentes, sempre com motivos', () => {
    const d0 = emptyData();
    expect(sectionMastery(d0, target.c.id, target.s, bank).level).toBe('novo');
    const d1 = read(d0);
    expect(sectionMastery(d1, target.c.id, target.s, bank).level).toBe('lido');
    const sameDay = { ...d1, attempts: qs.map((q) => att(q.id, true, '2026-10-02T10:00:00Z')) };
    const m2 = sectionMastery(sameDay, target.c.id, target.s, bank);
    expect(m2.level).toBe('aprendendo');
    expect(m2.reasons.join(' ')).toMatch(/um só dia/);
    const twoDays = { ...sameDay, attempts: [...sameDay.attempts, att(qs[0].id, true, '2026-10-05T10:00:00Z')] };
    const m3 = sectionMastery(twoDays, target.c.id, target.s, bank);
    expect(m3.level).toBe('firme');
    expect(m3.score).toBeGreaterThan(m2.score - 0.001);
    // Um erro recente na última resposta derruba o nível.
    const wrong = { ...twoDays, attempts: [...twoDays.attempts, ...qs.map((q) => att(q.id, false, '2026-10-06T10:00:00Z'))] };
    expect(sectionMastery(wrong, target.c.id, target.s, bank).level).toBe('aprendendo');
    expect(chapterMastery(twoDays, target.c, bank).firm).toBeGreaterThanOrEqual(1);
  });
});

describe('plano semanal em minutos', () => {
  const base = {
    data: emptyData(),
    units: trailUnits(),
    chapters: journey,
    learningUnits,
    missions,
    minutesPerDay: 60,
    weekdays: [1, 2, 3, 4, 5],
    examDate: '2027-06-01',
    pendingReviewQuestions: 10,
    dueCards: 0,
    now: new Date(2026, 9, 26), // segunda
  };

  it('distribui só nos dias escolhidos, respeita os minutos e coloca revisão primeiro', () => {
    const week = weeklyPlan(base);
    expect(week).toHaveLength(7);
    expect(week.filter((d) => d.study).map((d) => d.weekday)).toEqual([1, 2, 3, 4, 5]);
    for (const d of week.filter((x) => x.study)) {
      expect(d.reviewMinutes).toBeLessThanOrEqual(18);
      expect(d.units.length).toBeGreaterThan(0);
    }
    expect(week[0].reviewMinutes).toBe(18);
    // Segue a ordem da trilha sem repetir atividade.
    const keys = week.flatMap((d) => d.units.map((u) => u.key));
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys[0]).toBe(base.units[0].key);
  });

  it('não planeja estudo no dia da prova nem depois', () => {
    const week = weeklyPlan({ ...base, examDate: '2026-10-28' });
    expect(week.filter((d) => d.study).map((d) => d.date)).toEqual(['2026-10-26', '2026-10-27']);
  });

  it('fotografia versionada guarda os minutos e as atividades de cada dia', () => {
    const week = weeklyPlan(base);
    const f = computeFeasibility(base);
    const snap = snapshotPlan(f, week, { minutesPerDay: 60, weekdays: base.weekdays, examDate: base.examDate }, new Date('2026-10-26T12:00:00Z'));
    expect(snap.version).toBe(1);
    expect(snap.days).toHaveLength(5);
    expect(snap.days[0].unitKeys.length).toBeGreaterThan(0);
    expect(snap.requiredMinutes).toBe(f.requiredMinutes);
  });
});
