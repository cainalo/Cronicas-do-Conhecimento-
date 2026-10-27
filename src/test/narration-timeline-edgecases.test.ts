import { describe, expect, it } from 'vitest';
import { narratedLessons } from '@/content';
import {
  buildAlignedNarrationTimeline,
  buildNarrationScript,
  cueAtTime,
  type CharacterTimeAlignment,
} from '@/lib/narration-timeline';

function syntheticAlignment(text: string): CharacterTimeAlignment {
  const characters = Array.from(text);
  return {
    characters,
    character_start_times_seconds: characters.map((_, index) => index * 0.04),
    character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.04),
  };
}

function historyLesson() {
  const lesson = narratedLessons.find((item) => item.id === 'narrada.prim.historia');
  if (!lesson) throw new Error('Aula histórica não encontrada.');
  return lesson;
}

describe('casos-limite do alinhamento audiovisual', () => {
  it('usa offsets de pontos de código Unicode, inclusive com emoji fora do plano básico', () => {
    const base = historyLesson();
    const lesson = {
      ...base,
      scenes: [{
        ...base.scenes[0],
        id: 'unicode',
        heading: 'Unicode e termos técnicos',
        beats: [{ say: 'Ação 😀 CPU.' }],
      }],
    };
    const script = buildNarrationScript(lesson);
    const characters = Array.from(script.text);

    expect(script.segments[0].textStartCharacter).toBe(0);
    expect(script.segments[0].textEndCharacter).toBe(characters.length);
    expect(characters.filter((character) => character === '😀')).toHaveLength(1);

    const timeline = buildAlignedNarrationTimeline(lesson, syntheticAlignment(script.text));
    expect(timeline.wordCues.map((cue) => cue.word)).toEqual(['Ação', 'CPU']);
    expect(timeline.wordCues[1].textStartCharacter).toBe(Array.from('Ação 😀 ').length);
    expect(timeline.cues[0].endMs).toBe(characters.length * 40);
  });

  it('rejeita timestamps negativos, não finitos ou invertidos', () => {
    const lesson = historyLesson();
    const script = buildNarrationScript(lesson);

    const negative = syntheticAlignment(script.text);
    negative.character_start_times_seconds[0] = -0.01;
    expect(() => buildAlignedNarrationTimeline(lesson, negative)).toThrow(/Invalid TTS timestamps/);

    const notFinite = syntheticAlignment(script.text);
    notFinite.character_end_times_seconds[0] = Number.NaN;
    expect(() => buildAlignedNarrationTimeline(lesson, notFinite)).toThrow(/Invalid TTS timestamps/);

    const inverted = syntheticAlignment(script.text);
    inverted.character_end_times_seconds[0] = inverted.character_start_times_seconds[0] - 0.01;
    expect(() => buildAlignedNarrationTimeline(lesson, inverted)).toThrow(/Invalid TTS timestamps/);
  });

  it('rejeita marcas de início que voltam no tempo', () => {
    const lesson = historyLesson();
    const script = buildNarrationScript(lesson);
    const alignment = syntheticAlignment(script.text);
    alignment.character_start_times_seconds[10] = alignment.character_start_times_seconds[9] - 0.001;
    alignment.character_end_times_seconds[10] = alignment.character_start_times_seconds[10] + 0.01;

    expect(() => buildAlignedNarrationTimeline(lesson, alignment)).toThrow(/not monotonic/);
  });

  it('mantém a cue anterior durante pausas e não inventa uma cue antes da fala começar', () => {
    const cues = [
      { id: 'first', startMs: 250, endMs: 900 },
      { id: 'second', startMs: 1400, endMs: 1900 },
    ];

    expect(cueAtTime(cues, 249)).toBeUndefined();
    expect(cueAtTime(cues, 250)?.id).toBe('first');
    expect(cueAtTime(cues, 1300)?.id).toBe('first');
    expect(cueAtTime(cues, 1400)?.id).toBe('second');
    expect(cueAtTime(cues, Number.NaN)).toBeUndefined();
  });
});
