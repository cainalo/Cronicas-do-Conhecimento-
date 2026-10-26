import { questions, flashcards, essayPrompts, topicsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { emptyData, emptyPending } from '@/lib/model';
import { mergeData } from '@/lib/merge';
import { totalXp, reviewQueue } from '@/lib/study';
import {
  activeExam,
  answerExam,
  dueCards,
  estimateLines,
  finishExam,
  pickExamQuestions,
  reviewCard,
  saveEssay,
  schedule,
  newCard,
  startExam,
  submitEssay,
} from '@/lib/training';

const seeded = (s = 42) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

describe('simulado', () => {
  it('sorteia sem repetir e equilibra os tópicos', () => {
    const topics = ['ti.seguranca.criptografia', 'ti.ia-eng.mcp'];
    const qs = pickExamQuestions(questions, topics, 8, seeded());
    expect(new Set(qs.map((q) => q.id)).size).toBe(8);
    const a = qs.filter((q) => q.topicId === topics[0]).length;
    expect(a).toBe(4);
  });

  it('corrige ao entregar, grava tentativas e marca para envio só quando concluído', () => {
    const [q1, q2, q3] = questions;
    let d = startExam(emptyData(), DEFAULT_CONTEST_ID, [q1.id, q2.id, q3.id], 30, '2026-10-17T10:00:00.000Z').data;
    const id = activeExam(d)!.id;
    expect(d.pending.exams).toHaveLength(0);
    d = answerExam(d, id, q1.id, q1.answer);
    d = answerExam(d, id, q2.id, q2.options.find((o) => o.key !== q2.answer)!.key);
    d = finishExam(d, id, questions, '2026-10-17T10:20:00.000Z');
    expect(d.exams[id].correct).toBe(1);
    expect(d.attempts.filter((a) => a.context === 'exam')).toHaveLength(2); // em branco não vira tentativa
    expect(reviewQueue(d, questions).map((q) => q.id)).toEqual([q2.id]);
    expect(d.pending.exams).toEqual([id]);
    expect(activeExam(d)).toBeUndefined();
    // Respostas não mudam depois de entregue.
    expect(answerExam(d, id, q3.id, 'A')).toBe(d);
  });
});

describe('discursiva', () => {
  it('estima linhas e concede XP de entrega uma única vez', () => {
    expect(estimateLines('')).toBe(0);
    expect(estimateLines('a'.repeat(150))).toBe(2);
    expect(estimateLines('linha 1\nlinha 2')).toBe(2);
    let d = saveEssay(emptyData(), 'ec.seg.01', 'texto', []);
    expect(submitEssay(emptyData(), 'ec.seg.01').xp).toBeUndefined(); // sem texto, sem entrega
    d = submitEssay(d, 'ec.seg.01').data;
    d = submitEssay(d, 'ec.seg.01').data;
    expect(d.essays['ec.seg.01'].submittedAt).toBeTruthy();
    expect(totalXp(d)).toBe(20);
  });

  it('enunciados têm critérios somando 100 e tópicos do edital', () => {
    const ids = topicsForContest(DEFAULT_CONTEST_ID).map((t) => t.id);
    for (const p of essayPrompts) {
      expect(p.criteria.reduce((s, c) => s + c.points, 0)).toBe(100);
      p.topicIds.forEach((t) => expect(ids).toContain(t));
      expect(p.origin).not.toBe('oficial');
    }
  });
});

describe('flashcards', () => {
  const now = '2026-10-17T12:00:00.000Z';
  it('intervalos crescem com acertos e voltam a zero com erro', () => {
    let c = newCard('x', now);
    c = schedule(c, 'bom', now);
    expect(c.intervalDays).toBe(1);
    c = schedule(c, 'bom', now);
    expect(c.intervalDays).toBe(3);
    c = schedule(c, 'bom', now);
    expect(c.intervalDays).toBeCloseTo(7.5, 1);
    c = schedule(c, 'errei', now);
    expect(c.intervalDays).toBe(0);
    expect(c.lapses).toBe(1);
    expect(c.ease).toBeCloseTo(2.3);
  });

  it('cartões vencidos aparecem antes dos novos; XP de domínio uma vez', () => {
    const ids = flashcards.slice(0, 3).map((f) => f.id);
    let d = reviewCard(emptyData(), ids[0], 'bom', '2026-10-01T00:00:00.000Z').data;
    expect(dueCards(d, ids, now)).toEqual([ids[0], ids[1], ids[2]]);
    for (let k = 0; k < 6; k++) d = reviewCard(d, ids[1], 'facil', now).data;
    expect(d.cards[ids[1]].intervalDays).toBeGreaterThanOrEqual(21);
    expect(d.xp.filter((e) => e.kind === 'card_mastered')).toHaveLength(1);
  });

  it('fusão: versão mais recente do cartão vence; simulado concluído vence o em andamento', () => {
    const a = reviewCard(emptyData(), 'c', 'bom', '2026-10-17T10:00:00.000Z').data;
    const b = reviewCard(emptyData(), 'c', 'errei', '2026-10-17T11:00:00.000Z').data;
    expect(mergeData({ ...a, pending: emptyPending() }, b).cards.c.lapses).toBe(1);
  });

  it('há cartões gerados dos glossários com ids únicos', () => {
    expect(flashcards.length).toBeGreaterThan(20);
    expect(new Set(flashcards.map((f) => f.id)).size).toBe(flashcards.length);
  });
});

import { pickFullExam, weightedScore } from '@/lib/training';
import { getContest as gct, DEFAULT_CONTEST_ID as DC2, questionsForContest as qfc2 } from '@/content';

describe('prova completa', () => {
  const contest = gct(DC2)!;
  const bank = qfc2(DC2);
  it('respeita o número de questões por disciplina do edital, gerais primeiro', () => {
    const qs = pickFullExam(bank, contest.disciplines, () => 0.3);
    expect(qs).toHaveLength(70);
    expect(new Set(qs.map((q) => q.id)).size).toBe(70);
    for (const d of contest.disciplines) {
      const ids = new Set(d.topics.map((t) => t.id));
      expect(qs.filter((q) => ids.has(q.topicId))).toHaveLength(d.questions ?? 0);
    }
    const geraisIds = new Set(contest.disciplines.filter((d) => d.block === 'gerais').flatMap((d) => d.topics.map((t) => t.id)));
    expect(qs.slice(0, 25).every((q) => geraisIds.has(q.topicId))).toBe(true);
  });
  it('pondera gerais com peso 1 e específicas com peso 2', () => {
    const qs = pickFullExam(bank, contest.disciplines, () => 0.7);
    const answers = Object.fromEntries(qs.map((q) => [q.id, q.answer]));
    const ws = weightedScore({ id: 'x', contestId: DC2, questionIds: qs.map((q) => q.id), answers, startedAt: '' }, bank, contest.disciplines);
    expect(ws.gerais).toEqual({ ok: 25, n: 25 });
    expect(ws.especificos).toEqual({ ok: 45, n: 45 });
    expect(ws.points).toBe(115);
    expect(ws.max).toBe(115);
  });
});
