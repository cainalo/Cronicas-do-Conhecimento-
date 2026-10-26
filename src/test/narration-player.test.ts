import { describe, expect, it } from 'vitest';
import type { NarratedLesson } from '@/content/narrated/types';
import { beatIndexOf, narrationPositions, positionAtBeat } from '@/lib/narration';
import { bestPortugueseVoiceIndex, portugueseVoiceScore } from '@/app/voice';

const sample: NarratedLesson = {
  id: 'sample', title: 'Aula de teste', chapterId: 'cap.prim.01', sectionId: 'computador', lessonId: 'sample.lesson',
  minutes: 1, review: 'revisado',
  scenes: [
    { id: 's1', heading: 'Primeira cena', visual: { kind: 'title', title: 'Abertura' }, beats: [{ say: 'Primeira fala.' }, { say: 'Segunda fala.' }] },
    { id: 's2', heading: 'Segunda cena', visual: { kind: 'cards', cards: [{ title: 'A', text: 'B' }] }, beats: [{ say: 'Terceira fala.' }] },
  ],
};

describe('linha do tempo da aula narrada', () => {
  it('achata as falas em ordem e permite buscar qualquer ponto', () => {
    expect(narrationPositions(sample)).toEqual([{ scene: 0, beat: 0 }, { scene: 0, beat: 1 }, { scene: 1, beat: 0 }]);
    expect(beatIndexOf(sample, { scene: 1, beat: 0 })).toBe(2);
    expect(positionAtBeat(sample, 1)).toEqual({ scene: 0, beat: 1 });
  });

  it('limita posições fora do intervalo às falas válidas', () => {
    expect(positionAtBeat(sample, -5)).toEqual({ scene: 0, beat: 0 });
    expect(positionAtBeat(sample, 100)).toEqual({ scene: 1, beat: 0 });
    expect(beatIndexOf(sample, { scene: 0, beat: 999 })).toBe(1);
  });
});

describe('seleção automática da melhor voz portuguesa disponível', () => {
  it('prefere pt-BR a uma voz genérica de outro português', () => {
    const voices = [
      { name: 'Portuguese', lang: 'pt-PT' },
      { name: 'Google português do Brasil', lang: 'pt-BR' },
      { name: 'Português', lang: 'pt' },
    ];
    expect(bestPortugueseVoiceIndex(voices)).toBe(1);
  });

  it('prefere uma voz marcada como natural quando há mais de uma pt-BR', () => {
    const voices = [
      { name: 'Português do Brasil', lang: 'pt-BR', default: true },
      { name: 'Português (Brasil) Natural Online', lang: 'pt-BR' },
    ];
    expect(bestPortugueseVoiceIndex(voices)).toBe(1);
    expect(portugueseVoiceScore(voices[1])).toBeGreaterThan(portugueseVoiceScore(voices[0]));
  });

  it('não seleciona voz de idioma diferente do português', () => {
    expect(bestPortugueseVoiceIndex([{ name: 'English', lang: 'en-US' }])).toBeUndefined();
  });
});
