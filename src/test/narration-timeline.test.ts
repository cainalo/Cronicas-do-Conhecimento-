import { describe, expect, it } from 'vitest';
import {
  buildNarrationCues,
  createNarrationTimelineManifest,
  cueAtMediaTime,
  validateNarrationTimelineManifest,
  type AlignedWordTiming,
  type NarrationCueSource,
} from '@/lib/narration-timeline';

const sources: NarrationCueSource[] = [
  {
    id: 'historia:ada',
    sceneId: 'babbage-ada',
    sceneIndex: 2,
    beatIndex: 1,
    text: 'Ada Lovelace estudou a Máquina Analítica.',
  },
  {
    id: 'historia:programa',
    sceneId: 'babbage-ada',
    sceneIndex: 2,
    beatIndex: 2,
    text: 'Ela descreveu um algoritmo.',
  },
];

const alignedWords: AlignedWordTiming[] = [
  { text: 'ADA', startMs: 100, endMs: 220 },
  { text: 'Lovelace,', startMs: 230, endMs: 450 },
  { text: 'estudou', startMs: 470, endMs: 720 },
  { text: 'a', startMs: 730, endMs: 760 },
  { text: 'Máquina', startMs: 770, endMs: 980 },
  { text: 'Analítica.', startMs: 990, endMs: 1200 },
  { text: 'Ela', startMs: 1800, endMs: 1930 },
  { text: 'descreveu', startMs: 1940, endMs: 2200 },
  { text: 'um', startMs: 2210, endMs: 2270 },
  { text: 'algoritmo.', startMs: 2280, endMs: 2600 },
];

describe('timeline de narração com alinhamento real', () => {
  it('converte timestamps alinhados em janelas de fala sem estimar por caracteres', () => {
    const cues = buildNarrationCues(sources, alignedWords, 5000);
    expect(cues).toEqual([
      { id: 'historia:ada', sceneId: 'babbage-ada', sceneIndex: 2, beatIndex: 1, startMs: 100, endMs: 1200 },
      { id: 'historia:programa', sceneId: 'babbage-ada', sceneIndex: 2, beatIndex: 2, startMs: 1800, endMs: 2600 },
    ]);
  });

  it('mantém a imagem anterior durante o silêncio e muda no início real da próxima fala', () => {
    const cues = buildNarrationCues(sources, alignedWords, 5000);
    expect(cueAtMediaTime(cues, 0)).toBeUndefined();
    expect(cueAtMediaTime(cues, 100)?.id).toBe('historia:ada');
    expect(cueAtMediaTime(cues, 1500)?.id).toBe('historia:ada');
    expect(cueAtMediaTime(cues, 1800)?.id).toBe('historia:programa');
    expect(cueAtMediaTime(cues, 4999)?.id).toBe('historia:programa');
  });

  it('aceita o modelo do alinhador que agrupa palavra composta com hífen', () => {
    const twoPartSource: NarrationCueSource[] = [
      { id: 's1:b1', sceneId: 's1', sceneIndex: 0, beatIndex: 0, text: 'Use o padrão pt-BR.' },
    ];
    const words: AlignedWordTiming[] = [
      { text: 'Use', startMs: 0, endMs: 100 },
      { text: 'o', startMs: 110, endMs: 140 },
      { text: 'padrão', startMs: 150, endMs: 340 },
      { text: 'pt-BR.', startMs: 350, endMs: 600 },
    ];
    expect(buildNarrationCues(twoPartSource, words, 1000)[0]).toMatchObject({
      id: 's1:b1',
      startMs: 0,
      endMs: 600,
    });
  });

  it('falha de forma explícita se o áudio/transcrição não correspondem ao alinhamento', () => {
    expect(() => buildNarrationCues(
      sources,
      alignedWords.slice(0, -1),
      5000,
    )).toThrow(/alinhamento cobre/);

    const wrongWord = alignedWords.map((word, index) => index === 0 ? { ...word, text: 'Blaise' } : word);
    expect(() => buildNarrationCues(sources, wrongWord, 5000)).toThrow(/não corresponde à transcrição/);
  });

  it('valida manifesto, hash de conteúdo e timestamps dentro da duração real', () => {
    const manifest = createNarrationTimelineManifest({
      lessonId: 'prim.computador.1',
      contentHash: 'sha256:lesson-transcript-v3',
      audioAsset: '/audio/prim-computador-1-v3.mp3',
      durationMs: 5000,
      sources,
      alignedWords,
    });
    expect(validateNarrationTimelineManifest(manifest)).toEqual([]);
    expect(validateNarrationTimelineManifest(manifest, 'sha256:old-transcript')).toContain(
      'O hash do conteúdo não corresponde ao áudio/manifesto.',
    );
    const invalid = {
      ...manifest,
      cues: [...manifest.cues, { ...manifest.cues[1], id: 'historia:ada', startMs: 5100, endMs: 5200 }],
    };
    expect(validateNarrationTimelineManifest(invalid).join(' ')).toMatch(/ID de fala duplicado|Intervalo temporal inválido/);
  });
});
