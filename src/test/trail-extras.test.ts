// Trilha integrada (26/10/2026): aulas narradas, videoaulas, posts dos professores e cartões entram
// na sequência, em ordem lógica, e contam como feitos ao abrir pela trilha (?u=chave).
import { describe, expect, it } from 'vitest';
import { trailUnits } from '@/app/useCheckpoint';
import { chapters, curatedVideos, flashcards, narratedLessons } from '@/content';
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

  it('toda videoaula curada aparece uma única vez, antes do Praticar do seu trecho', () => {
    for (const v of curatedVideos) {
      const matches = units.filter((u) => u.key === `video:${v.id}`);
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
  it('insere laboratórios de comandos e a fase do mapa na trilha correspondente', () => {
    const first = units.findIndex((u) => u.key === 'laboratorio:primeiros-passos');
    const logs = units.findIndex((u) => u.key === 'laboratorio:arquivos-logs');
    const processes = units.findIndex((u) => u.key === 'laboratorio:processos-linux');
    const office1 = units.findIndex((u) => u.key === 'escritorio:triagem');
    const office2 = units.findIndex((u) => u.key === 'escritorio:diagnostico');
    const office3 = units.findIndex((u) => u.key === 'escritorio:fechamento');
    const js = units.findIndex((u) => u.key === 'laboratorio:javascript');
    const git = units.findIndex((u) => u.key === 'laboratorio:git');

    expect(first).toBeGreaterThan(0);
    expect(units[first - 1].kind).toBe('praticar');
    expect(units[first].to).toContain('/laboratorio/primeiros-passos');
    expect(units[logs].chapterId).toBe('cap.infra.03');
    expect(units[logs].sectionId).toBe('arquivos');
    expect(units[processes].kind).toBe('laboratorio');
    expect(units[office1].kind).toBe('escritorio');
    expect(office1).toBe(processes + 1);
    expect(office2).toBe(office1 + 1);
    expect(office3).toBe(office2 + 1);
    expect(units[office1].to).toContain('/escritorio?fase=triagem');
    expect(units[office2].to).toContain('/escritorio?fase=diagnostico');
    expect(units[office3].to).toContain('/escritorio?fase=fechamento');
    expect(units[js].chapterId).toBe('cap.dev.04');
    expect(units[git].chapterId).toBe('cap.devops.01');
  });

  it('laboratório e fase do mapa só contam como concluídos após registro explícito', () => {
    const lab = units.find((u) => u.key === 'laboratorio:processos-linux')!;
    const office = units.find((u) => u.key === 'escritorio:triagem')!;
    const finale = units.find((u) => u.key === 'escritorio:fechamento')!;
    expect(unitDone(emptyData(), lab)).toBeUndefined();
    expect(unitDone(emptyData(), office)).toBeUndefined();
    expect(unitDone(emptyData(), finale)).toBeUndefined();
    expect(unitDone(logUnit(emptyData(), lab.key), lab)).toBeTruthy();
    expect(unitDone(logUnit(emptyData(), office.key), office)).toBeTruthy();
    expect(unitDone(logUnit(emptyData(), finale.key), finale)).toBeTruthy();
  });

});
