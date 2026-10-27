import { describe, expect, it } from 'vitest';
import { narratedLessons } from '@/content';
import {
  buildAlignedNarrationTimeline,
  buildNarrationScript,
  cueAtTime,
  type CharacterTimeAlignment,
} from '@/lib/narration-timeline';

function lessonById(id: string) {
  const lesson = narratedLessons.find((item) => item.id === id);
  if (!lesson) throw new Error(`Aula narrada não encontrada no catálogo: ${id}`);
  return lesson;
}

function syntheticAlignment(text: string): CharacterTimeAlignment {
  const characters = Array.from(text);
  return {
    characters,
    character_start_times_seconds: characters.map((_, index) => index * 0.04),
    character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.04),
  };
}

describe('linha do tempo baseada no alinhamento real do áudio', () => {
  it('monta uma faixa única mantendo offsets de cada fala na ordem do roteiro', () => {
    const lesson = lessonById('narrada.prim.historia');
    const script = buildNarrationScript(lesson);
    const expected = lesson.scenes.flatMap((scene) => scene.beats.map((beat) => beat.say.trim())).join('\n\n');

    expect(script.text).toBe(expected);
    expect(script.segments.length).toBe(lesson.scenes.reduce((total, scene) => total + scene.beats.length, 0));

    for (const segment of script.segments) {
      const recovered = Array.from(script.text).slice(segment.textStartCharacter, segment.textEndCharacter).join('');
      expect(recovered).toBe(segment.text);
    }
  });

  it('converte timestamps por caractere em cues por fala e palavra', () => {
    const lesson = lessonById('narrada.prim.historia');
    const script = buildNarrationScript(lesson);
    const timeline = buildAlignedNarrationTimeline(lesson, syntheticAlignment(script.text));
    const beatCount = lesson.scenes.reduce((total, scene) => total + scene.beats.length, 0);

    expect(timeline.cues).toHaveLength(beatCount);
    expect(timeline.wordCues.length).toBeGreaterThan(beatCount);
    expect(timeline.wordCues[0].word).toBe('Pegue');
    expect(timeline.cues[0].startMs).toBe(0);
    expect(timeline.cues[0].endMs).toBeGreaterThan(timeline.cues[0].startMs);
    expect(timeline.durationMs).toBe(syntheticAlignment(script.text).character_end_times_seconds.length * 40);

    const nextCue = timeline.cues[1];
    expect(cueAtTime(timeline.cues, nextCue.startMs - 1)).toBe(timeline.cues[0]);
    expect(cueAtTime(timeline.cues, nextCue.startMs)).toBe(nextCue);
    expect(cueAtTime(timeline.cues, -1)).toBeUndefined();
  });

  it('rejeita silenciosamente nenhum desalinhamento: falha explicitamente se o texto não coincidir', () => {
    const lesson = lessonById('narrada.mat.somar-inteiros');
    const script = buildNarrationScript(lesson);
    const alignment = syntheticAlignment(script.text);
    alignment.characters[0] = 'X';

    expect(() => buildAlignedNarrationTimeline(lesson, alignment)).toThrow(/text mismatch/);
  });

  it('rejeita vetores de timestamps incompletos', () => {
    const lesson = lessonById('narrada.mat.somar-inteiros');
    const script = buildNarrationScript(lesson);
    const alignment = syntheticAlignment(script.text);
    alignment.character_end_times_seconds.pop();

    expect(() => buildAlignedNarrationTimeline(lesson, alignment)).toThrow(/length mismatch/);
  });
});
