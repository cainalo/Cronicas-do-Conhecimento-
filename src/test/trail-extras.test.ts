// Trilha integrada (26/10/2026): aulas narradas, videoaulas, posts dos professores e cartões entram
// na sequência, em ordem lógica, e contam como feitos ao abrir pela trilha (?u=chave).
import { describe, expect, it } from 'vitest';
import { trailUnits } from '@/app/useCheckpoint';
import { curatedVideos, flashcards, narratedLessons } from '@/content';
import { emptyData } from '@/lib/model';
import { logUnit, unitDone } from '@/lib/pace';

const units = trailUnits();
const idx = (pred: (u: (typeof units)[number]) => boolean) => units.findIndex(pred);

describe('trilha com todos os materiais', () => {
  it('toda aula narrada aparece logo depois da sua aula em texto', () => {
    for (const n of narratedLessons) {
      const i = idx((u) => u.key === `narrada:${n.id}`);
      expect(i, n.id).toBeGreaterThan(0);
      expect(units[i - 1].kind, n.id).toBe('aprender');
      expect(units[i].to).toContain(`/aula-narrada/${n.id}`);
    }
  });

  it('toda videoaula curada está na trilha, antes do Praticar do seu trecho', () => {
    for (const v of curatedVideos) {
      const i = idx((u) => u.key === `video:${v.id}`);
      expect(i, v.id).toBeGreaterThan(0);
      const pr = idx((u) => u.kind === 'praticar' && u.chapterId === v.chapterId && u.sectionId === (v.sectionId ?? units[i].sectionId));
      expect(i, v.id).toBeLessThan(pr);
    }
  });

  it('posts dos professores vêm depois das aulas do trecho e antes do Praticar', () => {
    const posts = units.filter((u) => u.kind === 'professores');
    expect(posts.length).toBeGreaterThan(10);
    for (const p of posts) {
      const i = units.indexOf(p);
      expect(units[i + 1].kind).toBe('praticar');
      expect(p.to).toMatch(/^\/sala\?aula=/);
    }
  });

  it('cartões de memorização fecham o capítulo, antes do Desafio', () => {
    const chapters = new Set(flashcards.map((f) => f.chapterId));
    for (const c of chapters) {
      const i = idx((u) => u.key === `flashcards:${c}`);
      if (i < 0) continue; // capítulo fora da trilha
      const next = units[i + 1];
      expect(next.chapterId === c ? next.kind : 'desafio').toBe('desafio');
    }
  });

  it('material aberto pela trilha conta como feito', () => {
    const u = units.find((x) => x.kind === 'video')!;
    expect(unitDone(emptyData(), u)).toBeUndefined();
    expect(u.to).toContain(`u=${encodeURIComponent(u.key)}`);
    expect(unitDone(logUnit(emptyData(), u.key), u)).toBeTruthy();
  });
});
