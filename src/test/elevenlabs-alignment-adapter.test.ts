import { describe, expect, it } from 'vitest';
import { parseElevenLabsForcedAlignmentResponse } from '@/lib/elevenlabs-alignment-adapter';
import { narratedLessons } from '@/content';
import { buildAlignedNarrationTimeline, buildNarrationScript } from '@/lib/narration-timeline';

function responseFor(text: string) {
  const characters = Array.from(text);
  return {
    characters: characters.map((character, index) => ({
      text: character,
      start: index * 0.08,
      end: (index + 1) * 0.08,
    })),
    words: [],
    loss: 0.12,
  };
}

describe('adaptador de resposta ElevenLabs Forced Alignment', () => {
  it('converte objetos character { text, start, end } em arrays paralelos', () => {
    const transcript = 'Olá, CPU 😀.';
    const result = parseElevenLabsForcedAlignmentResponse(responseFor(transcript), transcript);

    expect(result.loss).toBe(0.12);
    expect(result.alignment.characters).toEqual(Array.from(transcript));
    expect(result.alignment.character_start_times_seconds).toHaveLength(Array.from(transcript).length);
    expect(result.alignment.character_end_times_seconds.at(-1)).toBe(Array.from(transcript).length * 0.08);
  });

  it('preserva espaços e pontuação; não faz trim nem normalização silenciosa', () => {
    const transcript = ' Ada  Lovelace, CPU. ';
    const result = parseElevenLabsForcedAlignmentResponse(responseFor(transcript), transcript);

    expect(result.alignment.characters.join('')).toBe(transcript);
    expect(result.alignment.characters[0]).toBe(' ');
    expect(result.alignment.characters.at(-1)).toBe(' ');
    expect(result.alignment.characters.filter((character) => character === ' ')).toHaveLength(5);
  });

  it('rejeita texto distinto e quantidade de caracteres incompleta', () => {
    const transcript = 'Ada CPU';
    const wrongText = responseFor(transcript);
    wrongText.characters[0].text = 'E';
    expect(() => parseElevenLabsForcedAlignmentResponse(wrongText, transcript)).toThrow(/transcript mismatch/);

    const shortResponse = responseFor(transcript);
    shortResponse.characters.pop();
    expect(() => parseElevenLabsForcedAlignmentResponse(shortResponse, transcript)).toThrow(/count mismatch/);
  });

  it('rejeita timestamps inválidos e não monotônicos', () => {
    const transcript = 'abc';
    const negative = responseFor(transcript);
    negative.characters[1].start = -0.01;
    expect(() => parseElevenLabsForcedAlignmentResponse(negative, transcript)).toThrow(/timestamps are invalid/);

    const reversed = responseFor(transcript);
    reversed.characters[2].start = 0.01;
    reversed.characters[2].end = 0.02;
    expect(() => parseElevenLabsForcedAlignmentResponse(reversed, transcript)).toThrow(/not monotonic/);
  });


  it('conecta o payload adaptado ao helper de cues por cena/fala', () => {
    const lesson = narratedLessons.find((item) => item.id === 'narrada.prim.historia');
    if (!lesson) throw new Error('Aula histórica não encontrada.');

    const script = buildNarrationScript(lesson);
    const parsed = parseElevenLabsForcedAlignmentResponse(responseFor(script.text), script.text);
    const timeline = buildAlignedNarrationTimeline(lesson, parsed.alignment);

    expect(timeline.script.text).toBe(script.text);
    expect(timeline.cues).toHaveLength(lesson.scenes.reduce((sum, scene) => sum + scene.beats.length, 0));
    expect(timeline.wordCues.length).toBeGreaterThan(timeline.cues.length);
    expect(timeline.durationMs).toBeGreaterThan(0);
  });

  it('rejeita payload sem loss ou sem array de caracteres', () => {
    expect(() => parseElevenLabsForcedAlignmentResponse({ characters: [] }, 'x')).toThrow(/alignment loss/);
    expect(() => parseElevenLabsForcedAlignmentResponse({ loss: 0 }, 'x')).toThrow(/characters array/);
    expect(() => parseElevenLabsForcedAlignmentResponse(responseFor('x'), '')).toThrow(/exact transcript/);
  });
});
