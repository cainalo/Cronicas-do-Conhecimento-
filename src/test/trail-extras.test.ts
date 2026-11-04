// Trilha integrada: videoaulas verificadas, posts dos professores e cartões entram na sequência lógica.
import { describe, expect, it } from 'vitest';
import { trailUnits } from '@/app/useCheckpoint';
import { chapters, curatedVideos, flashcards, porticoVideoPlan } from '@/content';
import { emptyData } from '@/lib/model';
import { logUnit, unitDone } from '@/lib/pace';

const units = trailUnits();
const idx = (pred: (u: (typeof units)[number]) => boolean) => units.findIndex(pred);

describe('trilha com todos os materiais', () => {
  it('aulas narradas antigas não criam mais etapas na trilha', () => {
    expect(units.some((u) => u.key.startsWith('narrada:'))).toBe(false);
    expect(units.some((u) => u.to.startsWith('/aula-narrada/'))).toBe(false);
  });

  it('o catálogo próprio aponta as novas videoaulas para a unidade didática correta', () => {
    expect(porticoVideoPlan).toHaveLength(2);
    for (const v of porticoVideoPlan) {
      expect(v.chapterId).toBe('cap.infra.03');
      expect(v.sectionId).toBe('processos');
      expect(v.lessonId).toBe('micro.infra.processos');
    }
  });

  it('só videoaulas verificadas aparecem uma única vez, antes do Praticar do trecho', () => {
    for (const v of curatedVideos) {
      const matches = units.filter((u) => u.key === `video:${v.id}`);
      if (v.status !== 'conferido') {
        expect(matches, v.id).toHaveLength(0);
        continue;
      }
      expect(matches, v.id).toHaveLength(1);
      const i = units.indexOf(matches[0]);
      expect(i, v.id).toBeGreaterThan(0);
      if (!v.sectionId) {
        const firstSection = chapters.find((c) => c.id === v.chapterId)?.sections[0]?.id;
        expect(matches[0].sectionId, v.id).toBe(firstSection);
      }
      const pr = idx((u) => u.kind === 'praticar' && u.chapterId === v.chapterId && u.sectionId === (v.sectionId ?? matches[0].sectionId));
      expect(i, v.id).toBeLessThan(pr);
    }
  });

  it('posts dos professores vêm depois das aulas do trecho e antes do Praticar', () => {
    const posts = units.filter((u) => u.kind === 'professores');
    expect(posts.length).toBeGreaterThan(10);
    for (const p of posts) {
      const i = units.indexOf(p);
      expect(units[i + 1].kind).toBe('praticar');
      expect(p.to).toMatch(/^\/trilha-post\//);
    }
  });

  it('o bloco na trilha só inclui posts editoriais próprios, não a cópia do Aprender', () => {
    expect(units.some((u) => u.key === 'professores:cap.infra.03:processos' && u.to.startsWith('/trilha-post/cap.infra.03/processos'))).toBe(true);
    expect(units.some((u) => u.key === 'professores:cap.prim.01:computador')).toBe(false);
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
    const u = units.find((x) => x.kind === 'video') ?? units.find((x) => x.kind === 'professores')!;
    expect(unitDone(emptyData(), u)).toBeUndefined();
    expect(u.to).toContain(`u=${encodeURIComponent(u.key)}`);
    expect(unitDone(logUnit(emptyData(), u.key), u)).toBeTruthy();
  });
});
