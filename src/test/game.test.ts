import { chapters, questionsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { emptyData } from '@/lib/model';
import { achievements, bestStreak, claimMission, missionProgress, streak, titleFor, topicMastery, weekId } from '@/lib/game';
import { recordAnswer, totalXp } from '@/lib/study';
import type { StudyData } from '@/lib/model';

const bank = questionsForContest(DEFAULT_CONTEST_ID);
const answerAt = (d: StudyData, i: number, iso: string, right = true) => {
  const q = bank[i];
  return recordAnswer(d, q, right ? q.answer : q.options.find((o) => o.key !== q.answer)!.key, 'practice', undefined, iso).data;
};

describe('gamificação', () => {
  it('títulos por nível', () => {
    expect(titleFor(1)).toBe('Aprendiz');
    expect(titleFor(4)).toBe('Praticante');
    expect(titleFor(20)).toBe('Especialista');
  });

  it('sequência de dias conta só dias com estudo e tolera hoje ainda sem estudo', () => {
    let d = emptyData();
    d = answerAt(d, 0, new Date(2026, 9, 14, 10).toISOString());
    d = answerAt(d, 1, new Date(2026, 9, 15, 10).toISOString());
    d = answerAt(d, 2, new Date(2026, 9, 16, 10).toISOString());
    expect(streak(d, new Date(2026, 9, 17, 9))).toBe(3); // hoje sem estudo ainda
    expect(streak(d, new Date(2026, 9, 18, 9))).toBe(0); // ontem sem estudo: quebrou
    expect(bestStreak(d)).toBe(3);
  });

  it('missões semanais: progresso da semana e recompensa uma única vez', () => {
    const now = new Date(2026, 9, 21, 12); // quarta-feira
    expect(weekId(now)).toBe('2026-10-19');
    let d = emptyData();
    for (let i = 0; i < 50; i++) d = answerAt(d, i % bank.length, new Date(2026, 9, 20, 8, i).toISOString(), false);
    d = answerAt(d, 0, new Date(2026, 9, 12, 8).toISOString()); // semana anterior: não conta
    const m = missionProgress(d, now).find((x) => x.id === 'questoes')!;
    expect(m.cur).toBe(50);
    expect(m.done).toBe(true);
    const before = totalXp(d);
    d = claimMission(d, 'questoes', now).data;
    d = claimMission(d, 'questoes', now).data;
    expect(totalXp(d) - before).toBe(40);
    // Missão não cumprida não rende nada.
    expect(claimMission(d, 'cartoes', now).data).toBe(d);
  });

  it('selos e domínio por tópico refletem o histórico real', () => {
    let d = emptyData();
    const seals = () => Object.fromEntries(achievements(d, chapters, bank).map((a) => [a.id, a.done]));
    expect(seals()['cem-respostas']).toBe(false);
    const topic = bank[0].topicId;
    bank.filter((q) => q.topicId === topic).forEach((q) => {
      d = recordAnswer(d, q, q.answer, 'practice', undefined).data;
    });
    expect(topicMastery(d, topic, bank)).toBe(1);
    expect(seals()['dominio']).toBe(true);
  });
});

import { pickBlitz } from '@/pages/Blitz';
import { questionsForContest as qfc, DEFAULT_CONTEST_ID as DCI } from '@/content';
import { emptyData as emptyD } from '@/lib/model';
import { markSectionRead as msr } from '@/lib/study';
import { getChapter as gc } from '@/content';

describe('rodada relâmpago', () => {
  it('escolhe 5 questões distintas, priorizando capítulos começados e questões novas', () => {
    const bank = qfc(DCI);
    let d = emptyD();
    const ch = gc('cap.dados.01')!;
    d = msr(d, ch, ch.sections[0].id).data;
    const picked = pickBlitz(d, bank, () => 0.5);
    expect(picked).toHaveLength(5);
    expect(new Set(picked.map((q) => q.id)).size).toBe(5);
    expect(picked.every((q) => q.chapterId === 'cap.dados.01')).toBe(true);
  });
});

});
