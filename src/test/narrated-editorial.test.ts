import { describe, expect, it } from 'vitest';
import { narratedLessons } from '@/content';
import { narrationPositions, revealOf, validateNarrated } from '@/lib/narration';

function lessonById(id: string) {
  const lesson = narratedLessons.find((item) => item.id === id);
  if (!lesson) throw new Error(`Aula narrada não encontrada no catálogo: ${id}`);
  return lesson;
}

function spokenText(id: string): string {
  return lessonById(id).scenes.flatMap((scene) => scene.beats.map((beat) => beat.say)).join(' ');
}

function wordCount(value: string): number {
  return (value.match(/[\p{L}\p{N}]+/gu) ?? []).length;
}

describe('conteúdo editorial das aulas narradas prioritárias', () => {
  it('preserva contexto histórico e uma explicação desenvolvida da história dos computadores', () => {
    const lesson = lessonById('narrada.prim.historia');
    const text = spokenText(lesson.id).toLocaleLowerCase('pt-BR');

    expect(lesson.minutes).toBeGreaterThanOrEqual(8);
    expect(lesson.scenes.length).toBeGreaterThanOrEqual(6);
    expect(lesson.scenes.flatMap((scene) => scene.beats).length).toBeGreaterThanOrEqual(25);
    expect(wordCount(text)).toBeGreaterThan(1_000);

    for (const concept of [
      'ada lovelace',
      'números de bernoulli',
      'máquina analítica',
      'programadoras originais do eniac',
      'transistor',
      'circuito integrado',
      'microprocessador',
      'memória de trabalho',
    ]) {
      expect(text, `A narração histórica deve contextualizar “${concept}”.`).toContain(concept);
    }

    expect(validateNarrated(lesson)).toEqual([]);
  });

  it('liga todos os marcos da linha do tempo a pelo menos uma fala que os revela', () => {
    const lesson = lessonById('narrada.prim.historia');
    const timelines = lesson.scenes.filter((scene) => scene.visual.kind === 'timeline');

    expect(timelines.length).toBeGreaterThanOrEqual(4);
    for (const scene of timelines) {
      if (scene.visual.kind !== 'timeline') continue;
      const revealed = new Set(scene.beats.map((_, beatIndex) => revealOf(scene, beatIndex)));
      for (let itemIndex = 1; itemIndex <= scene.visual.items.length; itemIndex++) {
        expect(revealed.has(itemIndex), `${scene.id} precisa revelar o marco visual ${itemIndex}.`).toBe(true);
      }
    }
  });

  it('explica de forma progressiva as regras de soma e subtração de inteiros', () => {
    const lesson = lessonById('narrada.mat.somar-inteiros');
    const text = spokenText(lesson.id).toLocaleLowerCase('pt-BR');

    expect(lesson.minutes).toBeGreaterThanOrEqual(7);
    expect(lesson.scenes.length).toBeGreaterThanOrEqual(8);
    expect(lesson.scenes.flatMap((scene) => scene.beats).length).toBeGreaterThanOrEqual(30);
    expect(wordCount(text)).toBeGreaterThan(900);

    for (const concept of [
      'módulo é a distância entre o número e o zero',
      'quando os sinais são iguais',
      'quando os sinais são diferentes',
      'somar o oposto dele',
      'menos quatro mais nove',
      'seis menos menos dois',
    ]) {
      expect(text, `A aula de inteiros precisa explicar “${concept}”.`).toContain(concept);
    }

    for (const scene of lesson.scenes) {
      if (scene.visual.kind !== 'numberline') continue;
      // Guarde o membro discriminado numa variável: o TypeScript perde o narrowing
      // de scene.visual dentro do callback de forEach.
      const visual = scene.visual;
      expect(visual.states.length).toBe(scene.beats.length);
      scene.beats.forEach((beat, beatIndex) => {
        expect(beat.show, `${scene.id}, fala ${beatIndex + 1}: associe a fala a um estado explícito da reta.`).toBeDefined();
        const stateIndex = revealOf(scene, beatIndex);
        expect(visual.states[stateIndex], `${scene.id}, fala ${beatIndex + 1}: estado visual existente.`).toBeDefined();
      });
    }

    expect(validateNarrated(lesson)).toEqual([]);
  });
  it('mantém a estrutura íntegra em todas as aulas narradas do catálogo', () => {
    for (const lesson of narratedLessons) {
      const beats = lesson.scenes.flatMap((scene) => scene.beats);
      expect(lesson.scenes.length, lesson.id).toBeGreaterThan(0);
      expect(narrationPositions(lesson), lesson.id).toHaveLength(beats.length);
      expect(validateNarrated(lesson), lesson.id).toEqual([]);
      for (const beat of beats) expect(beat.say.trim(), lesson.id).not.toBe('');
      for (const scene of lesson.scenes) {
        if (scene.visual.kind !== 'numberline') continue;
        const visual = scene.visual;
        expect(visual.states.length, scene.id).toBe(scene.beats.length);
        scene.beats.forEach((beat, beatIndex) => {
          expect(beat.show, `${scene.id}/${beatIndex}`).toBeDefined();
          expect(visual.states[revealOf(scene, beatIndex)], `${scene.id}/${beatIndex}: estado visual`).toBeDefined();
        });
      }
    }
  });

});
