/**
 * Utilities for a word-aligned narration timeline.
 *
 * Provider-specific adapters should convert timestamps to milliseconds and pass the
 * exact transcript used to generate the audio. This module deliberately does not
 * estimate timings from character count, word count, or speaking rate.
 */

export interface NarrationCueSource {
  /** Stable ID, e.g. sceneId + ":" + beatId. */
  id: string;
  sceneId: string;
  sceneIndex: number;
  beatIndex: number;
  /** Exact spoken text used in the generated audio transcript. */
  text: string;
}

export interface AlignedWordTiming {
  /** Word/phrase token returned by a forced-alignment provider. */
  text: string;
  startMs: number;
  endMs: number;
}

export interface NarrationCue {
  id: string;
  sceneId: string;
  sceneIndex: number;
  beatIndex: number;
  /** Media-clock milliseconds. The cue becomes active at startMs. */
  startMs: number;
  /** End of the final aligned word in this beat; not an estimated duration. */
  endMs: number;
}

export interface NarrationTimelineManifest {
  schemaVersion: 1;
  lessonId: string;
  /** Hash/version of the exact transcript and cue order used to make this audio. */
  contentHash: string;
  /** Stable audio URL/path or asset identifier; do not store expiring signed URLs here. */
  audioAsset: string;
  durationMs: number;
  cues: NarrationCue[];
}

function tokens(text: string): string[] {
  return (text.match(/[\p{L}\p{N}]+/gu) ?? []).map((token) => token.toLocaleLowerCase('pt-BR'));
}

/**
 * Converts forced-alignment word timings into visual cues.
 * A mismatch is rejected rather than silently fabricating timestamps.
 */
export function buildNarrationCues(
  sources: readonly NarrationCueSource[],
  alignedWords: readonly AlignedWordTiming[],
  durationMs: number,
): NarrationCue[] {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    throw new Error('A duração do áudio deve ser um número positivo em milissegundos.');
  }
  if (sources.length === 0) {
    throw new Error('A linha do tempo precisa de pelo menos uma fala.');
  }

  const sourceIds = new Set<string>();
  const sourceTokens: Array<{ token: string; cueIndex: number }> = [];

  sources.forEach((source, cueIndex) => {
    if (!source.id.trim() || !source.sceneId.trim()) {
      throw new Error('Cada fala precisa de IDs estáveis de cena e fala.');
    }
    if (sourceIds.has(source.id)) {
      throw new Error('ID de fala duplicado: ' + source.id);
    }
    sourceIds.add(source.id);
    if (!Number.isInteger(source.sceneIndex) || source.sceneIndex < 0
      || !Number.isInteger(source.beatIndex) || source.beatIndex < 0) {
      throw new Error('Os índices de cena e fala devem ser inteiros não negativos: ' + source.id);
    }
    const sourceWords = tokens(source.text);
    if (sourceWords.length === 0) {
      throw new Error('A fala não tem palavras alinháveis: ' + source.id);
    }
    sourceWords.forEach((token) => sourceTokens.push({ token, cueIndex }));
  });

  if (alignedWords.length !== sourceTokens.length) {
    throw new Error(
      'O alinhamento retornou ' + alignedWords.length + ' palavras, mas a transcrição contém '
      + sourceTokens.length + '. Não é seguro inventar os tempos ausentes.',
    );
  }

  let previousStart = -1;
  alignedWords.forEach((word, index) => {
    const alignedTokens = tokens(word.text);
    if (alignedTokens.length !== 1 || alignedTokens[0] !== sourceTokens[index].token) {
      throw new Error(
        'A palavra alinhada na posição ' + (index + 1) + ' não corresponde à transcrição: esperado "'
        + sourceTokens[index].token + '", recebido "' + word.text + '".',
      );
    }
    if (!Number.isFinite(word.startMs) || !Number.isFinite(word.endMs)
      || word.startMs < 0 || word.endMs <= word.startMs || word.endMs > durationMs) {
      throw new Error('Timestamp inválido para a palavra na posição ' + (index + 1) + '.');
    }
    if (word.startMs < previousStart) {
      throw new Error('Os timestamps das palavras estão fora de ordem na posição ' + (index + 1) + '.');
    }
    previousStart = word.startMs;
  });

  const cues: NarrationCue[] = [];
  let tokenCursor = 0;
  for (let cueIndex = 0; cueIndex < sources.length; cueIndex++) {
    const source = sources[cueIndex];
    const wordCount = tokens(source.text).length;
    const first = alignedWords[tokenCursor];
    const last = alignedWords[tokenCursor + wordCount - 1];
    if (!first || !last || last.endMs <= first.startMs) {
      throw new Error('Não foi possível determinar a janela temporal da fala: ' + source.id);
    }
    const previousCue = cues[cues.length - 1];
    if (previousCue && first.startMs < previousCue.startMs) {
      throw new Error('As falas não estão em ordem temporal: ' + source.id);
    }
    cues.push({
      id: source.id,
      sceneId: source.sceneId,
      sceneIndex: source.sceneIndex,
      beatIndex: source.beatIndex,
      startMs: first.startMs,
      endMs: last.endMs,
    });
    tokenCursor += wordCount;
  }

  return cues;
}

/**
 * Returns the latest cue whose aligned start time is at or before mediaTimeMs.
 * In a silence between cues, the previous visual remains visible. Before the first
 * aligned word, returns undefined; callers can show the opening scene.
 */
export function cueAtMediaTime(
  cues: readonly NarrationCue[],
  mediaTimeMs: number,
): NarrationCue | undefined {
  if (cues.length === 0 || !Number.isFinite(mediaTimeMs) || mediaTimeMs < cues[0].startMs) {
    return undefined;
  }

  let low = 0;
  let high = cues.length - 1;
  let match = 0;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (cues[middle].startMs <= mediaTimeMs) {
      match = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return cues[match];
}

export function createNarrationTimelineManifest(input: {
  lessonId: string;
  contentHash: string;
  audioAsset: string;
  durationMs: number;
  sources: readonly NarrationCueSource[];
  alignedWords: readonly AlignedWordTiming[];
}): NarrationTimelineManifest {
  if (!input.lessonId.trim() || !input.contentHash.trim() || !input.audioAsset.trim()) {
    throw new Error('A manifestação precisa de lessonId, contentHash e audioAsset.');
  }
  const cues = buildNarrationCues(input.sources, input.alignedWords, input.durationMs);
  return {
    schemaVersion: 1,
    lessonId: input.lessonId,
    contentHash: input.contentHash,
    audioAsset: input.audioAsset,
    durationMs: input.durationMs,
    cues,
  };
}

export function validateNarrationTimelineManifest(
  manifest: NarrationTimelineManifest,
  expectedContentHash?: string,
): string[] {
  const errors: string[] = [];
  if (manifest.schemaVersion !== 1) errors.push('Versão de manifesto não suportada.');
  if (!manifest.lessonId.trim()) errors.push('lessonId está vazio.');
  if (!manifest.contentHash.trim()) errors.push('contentHash está vazio.');
  if (!manifest.audioAsset.trim()) errors.push('audioAsset está vazio.');
  if (!Number.isFinite(manifest.durationMs) || manifest.durationMs <= 0) {
    errors.push('durationMs deve ser positivo.');
  }
  if (expectedContentHash !== undefined && manifest.contentHash !== expectedContentHash) {
    errors.push('O hash do conteúdo não corresponde ao áudio/manifesto.');
  }
  if (manifest.cues.length === 0) errors.push('O manifesto não contém falas alinhadas.');

  const ids = new Set<string>();
  let previousStart = -1;
  manifest.cues.forEach((cue) => {
    if (!cue.id.trim() || !cue.sceneId.trim()) errors.push('Há uma fala sem ID de fala/cena.');
    if (ids.has(cue.id)) errors.push('ID de fala duplicado: ' + cue.id);
    ids.add(cue.id);
    if (!Number.isInteger(cue.sceneIndex) || cue.sceneIndex < 0
      || !Number.isInteger(cue.beatIndex) || cue.beatIndex < 0) {
      errors.push('Índices inválidos na fala: ' + cue.id);
    }
    if (!Number.isFinite(cue.startMs) || !Number.isFinite(cue.endMs)
      || cue.startMs < 0 || cue.endMs <= cue.startMs || cue.endMs > manifest.durationMs) {
      errors.push('Intervalo temporal inválido na fala: ' + cue.id);
    }
    if (cue.startMs < previousStart) errors.push('As falas estão fora da ordem temporal: ' + cue.id);
    previousStart = cue.startMs;
  });

  return errors;
}
