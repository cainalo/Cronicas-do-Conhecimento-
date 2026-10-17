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

import { buildPractice, completePractice, parsePegadinhas, practiceDone } from '@/lib/practice';
import { chapterBlocks, paginate, splitMarkdown } from '@/lib/book';
import { cluesRevealed } from '@/lib/game';
import { getChapter as gch, questionsForContest as qfc3, DEFAULT_CONTEST_ID as DC3 } from '@/content';
import { emptyData as ed3 } from '@/lib/model';

describe('prática e livro', () => {
  const ch = gch('cap.dados.01')!;
  it('lê as pegadinhas do texto', () => {
    const p = parsePegadinhas(ch.sections[2].body);
    expect(p.length).toBeGreaterThan(0);
    expect(p[0].answer).toBe(false);
  });
  it('monta uma rodada variada e conclui a prática uma única vez com XP', () => {
    const acts = buildPractice(ch, ch.sections[2].id, qfc3(DC3), undefined, () => 0.4);
    const kinds = new Set(acts.map((a) => a.kind));
    expect(kinds.has('tf')).toBe(true);
    expect(kinds.has('term')).toBe(true);
    expect(kinds.has('pairs')).toBe(true);
    expect(kinds.has('mcq')).toBe(true);
    expect(new Set(acts.map((a) => a.id)).size).toBe(acts.length);
    let d = ed3();
    d = completePractice(d, ch.id, ch.sections[0].id, 80).data;
    expect(practiceDone(d, ch.id, ch.sections[0].id)).toBe(true);
    const xp1 = d.xp.length;
    d = completePractice(d, ch.id, ch.sections[0].id, 100).data;
    expect(d.xp.length).toBe(xp1);
  });
  it('com a explicação simples, começa pelo aquecimento fácil e fica curta', () => {
    const simple = { pages: [], words: ['a', 'b', 'c', 'd'].map((t) => ({ term: t, meaning: `significado ${t}` })), checks: [{ statement: 'x', answer: true, why: 'y' }, { statement: 'z', answer: false, why: 'w' }, { statement: 'k', answer: true, why: 'q' }] };
    const acts = buildPractice(ch, ch.sections[2].id, qfc3(DC3), undefined, () => 0.4, simple);
    expect(acts[0].id.endsWith(':s0')).toBe(true);
    expect(acts.slice(0, 4).map((a) => a.kind)).toEqual(['tf', 'tf', 'term', 'pairs']);
    expect(acts.length).toBeLessThanOrEqual(12);
    expect(acts[acts.length - 1].kind).toBe('mcq');
  });
  it('divide o texto em blocos e pagina respeitando a altura', () => {
    const blocks = splitMarkdown('### Título\n\nTexto um.\n\n```\ncódigo\n\nainda código\n```\n\nFim.');
    expect(blocks).toEqual(['### Título\n\nTexto um.', '```\ncódigo\n\nainda código\n```', 'Fim.']);
    const bb = chapterBlocks(ch, () => undefined);
    expect(bb[0].kind).toBe('cover');
    const pages = paginate(bb, bb.map(() => 100), 250);
    expect(pages.flat()).toEqual(bb.map((_, i) => i));
    expect(pages.every((p) => p.length <= 3)).toBe(true);
  });
  it('revela as pistas em proporção ao avanço', () => {
    expect(cluesRevealed(0, 140, 35)).toBe(0);
    expect(cluesRevealed(1, 140, 35)).toBe(1);
    expect(cluesRevealed(70, 140, 35)).toBe(18);
    expect(cluesRevealed(140, 140, 35)).toBe(35);
  });
});
