import { describe, expect, it } from 'vitest';
import { parseElevenLabsForcedAlignmentResponse, parseElevenLabsTtsWithTimestampsResponse } from '@/lib/elevenlabs-alignment-adapter';
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


function ttsWithTimestampsResponseFor(text: string) {
  const characters = Array.from(text);
  return {
    audio_base64: 'ZmFrZS1hdWRpby1ieXRlcw==',
    alignment: {
      characters,
      character_start_times_seconds: characters.map((_, index) => index * 0.08),
      character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.08),
    },
    normalized_alignment: {
      characters,
      character_start_times_seconds: characters.map((_, index) => index * 0.08),
      character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.08),
    },
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


describe('adaptador de resposta ElevenLabs TTS com timestamps', () => {
  it('recebe áudio e alinhamento no mesmo payload, sem segunda chamada de alinhamento', () => {
    const transcript = 'A CPU executa instruções.';
    const parsed = parseElevenLabsTtsWithTimestampsResponse(
      ttsWithTimestampsResponseFor(transcript),
      transcript,
    );

    expect(parsed.audioBase64).toBe('ZmFrZS1hdWRpby1ieXRlcw==');
    expect(parsed.alignment.characters).toEqual(Array.from(transcript));
    expect(parsed.alignment.character_start_times_seconds).toHaveLength(Array.from(transcript).length);
  });

  it('rejeita áudio ausente e alinhamento que não corresponde ao texto original', () => {
    const transcript = 'Ada Lovelace';
    const missingAudio = ttsWithTimestampsResponseFor(transcript);
    missingAudio.audio_base64 = '';
    expect(() => parseElevenLabsTtsWithTimestampsResponse(missingAudio, transcript)).toThrow(/no audio_base64/);

    const mismatched = ttsWithTimestampsResponseFor(transcript);
    mismatched.alignment.characters[0] = 'E';
    expect(() => parseElevenLabsTtsWithTimestampsResponse(mismatched, transcript)).toThrow(/transcript mismatch/);

    expect(() => parseElevenLabsTtsWithTimestampsResponse({ audio_base64: 'YQ==' }, transcript))
      .toThrow(/alignment is not an object/);
  });

  it('liga o TTS direto ao helper de timeline para a aula real', () => {
    const lesson = narratedLessons.find((item) => item.id === 'narrada.prim.historia');
    if (!lesson) throw new Error('Aula histórica não encontrada.');
    const script = buildNarrationScript(lesson);
    const parsed = parseElevenLabsTtsWithTimestampsResponse(
      ttsWithTimestampsResponseFor(script.text),
      script.text,
    );
    const timeline = buildAlignedNarrationTimeline(lesson, parsed.alignment);

    expect(timeline.cues.length).toBe(lesson.scenes.reduce((sum, scene) => sum + scene.beats.length, 0));
    expect(timeline.wordCues.length).toBeGreaterThan(timeline.cues.length);
  });
});

