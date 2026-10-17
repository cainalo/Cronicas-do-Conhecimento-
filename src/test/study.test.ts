import { capCriptografia } from '@/content/grimoires/seguranca';
import { questoesCap01 } from '@/content/grimoires/seguranca/questions-cap01';
import { licoesCap01 } from '@/content/grimoires/seguranca/lessons-cap01';
import { emptyData } from '@/lib/model';
import {
  completeLesson,
  levelInfo,
  markSectionRead,
  recommend,
  recordAnswer,
  reviewQueue,
  toggleBookmark,
  topicStats,
  totalXp,
} from '@/lib/study';

const q1 = questoesCap01[0];
const wrong = q1.options.find((o) => o.key !== q1.answer)!.key;

describe('respostas e XP', () => {
  it('acerto na primeira vez dá XP uma única vez', () => {
    let d = emptyData();
    d = recordAnswer(d, q1, q1.answer, 'lesson', 'x').data;
    d = recordAnswer(d, q1, q1.answer, 'lesson', 'x').data;
    expect(d.attempts).toHaveLength(2);
    expect(totalXp(d)).toBe(10);
    expect(d.pending.attempts).toHaveLength(2);
  });

  it('erro entra na revisão; acerto posterior recupera e dá bônus único', () => {
    let d = emptyData();
    d = recordAnswer(d, q1, wrong, 'lesson', 'x').data;
    expect(reviewQueue(d, questoesCap01).map((q) => q.id)).toEqual([q1.id]);
    const r = recordAnswer(d, q1, q1.answer, 'review', undefined);
    expect(r.xp.map((e) => e.kind).sort()).toEqual(['question_first_correct', 'review_recovered']);
    d = r.data;
    expect(reviewQueue(d, questoesCap01)).toHaveLength(0);
    d = recordAnswer(d, q1, wrong, 'review', undefined).data;
    d = recordAnswer(d, q1, q1.answer, 'review', undefined).data;
    expect(totalXp(d)).toBe(15); // sem novas recompensas
  });

  it('lição concluída: XP único e melhor nota preservada', () => {
    let d = emptyData();
    d = completeLesson(d, licoesCap01[0], 80).data;
    d = completeLesson(d, licoesCap01[0], 50).data;
    expect(d.lessons[licoesCap01[0].id].bestScore).toBe(80);
    expect(totalXp(d)).toBe(30);
  });

  it('capítulo lido por completo concede XP uma vez', () => {
    let d = emptyData();
    for (const s of capCriptografia.sections) d = markSectionRead(d, capCriptografia, s.id).data;
    expect(d.reading[capCriptografia.id].completedAt).toBeTruthy();
    d = markSectionRead(d, capCriptografia, capCriptografia.sections[0].id).data;
    expect(totalXp(d)).toBe(50);
  });

  it('níveis', () => {
    expect(levelInfo(0).level).toBe(1);
    expect(levelInfo(49).level).toBe(1);
    expect(levelInfo(50).level).toBe(2);
    expect(levelInfo(200).level).toBe(3);
  });
});

describe('progresso e recomendação', () => {
  it('domínio usa a última tentativa', () => {
    let d = emptyData();
    d = recordAnswer(d, q1, q1.answer, 'lesson', 'x').data;
    d = recordAnswer(d, q1, wrong, 'review', undefined).data;
    const s = topicStats(d, q1.topicId, questoesCap01, [capCriptografia]);
    expect(s.answered).toBe(1);
    expect(s.correctNow).toBe(0);
    expect(s.accuracy).toBe(0.5);
  });

  it('recomenda ler quando nada foi feito e revisar quando há erros acumulados', () => {
    let d = emptyData();
    expect(recommend(d, [capCriptografia], licoesCap01, questoesCap01)?.kind).toBe('read');
    for (const q of questoesCap01.slice(0, 3)) d = recordAnswer(d, q, q.options.find((o) => o.key !== q.answer)!.key, 'lesson', 'x').data;
    const r = recommend(d, [capCriptografia], licoesCap01, questoesCap01);
    expect(r?.kind).toBe('review');
    expect(r?.reason.length).toBeGreaterThan(10);
  });

  it('marcador: alternar adiciona e remove sem deixar pendência de exclusão local', () => {
    let d = emptyData();
    d = toggleBookmark(d, 'c', 's');
    expect(d.bookmarks).toHaveLength(1);
    d = toggleBookmark(d, 'c', 's');
    expect(d.bookmarks).toHaveLength(0);
    expect(d.pending.bookmarks).toHaveLength(0);
    expect(d.pending.bookmarkDeletes).toHaveLength(0);
  });
});
