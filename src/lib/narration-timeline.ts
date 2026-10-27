import type { NarratedLesson } from '@/content/narrated/types';

/**
 * Character-level alignment returned by a TTS provider.
 * Each item in characters must map to one Unicode code point in the exact script sent for synthesis.
 */
export interface CharacterTimeAlignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

export interface NarrationScriptSegment {
  sceneId: string;
  sceneIndex: number;
  beatIndex: number;
  text: string;
  /** Zero-based Unicode code-point offset, inclusive. */
  textStartCharacter: number;
  /** Zero-based Unicode code-point offset, exclusive. */
  textEndCharacter: number;
}

export interface NarrationScript {
  lessonId: string;
  text: string;
  segments: NarrationScriptSegment[];
}

export interface NarrationCue extends NarrationScriptSegment {
  startMs: number;
  endMs: number;
}

export interface NarrationWordCue {
  sceneId: string;
  sceneIndex: number;
  beatIndex: number;
  word: string;
  /** Zero-based Unicode code-point offset, inclusive. */
  textStartCharacter: number;
  /** Zero-based Unicode code-point offset, exclusive. */
  textEndCharacter: number;
  startMs: number;
  endMs: number;
}

export interface AlignedNarrationTimeline {
  script: NarrationScript;
  cues: NarrationCue[];
  wordCues: NarrationWordCue[];
  durationMs: number;
}

const BEAT_SEPARATOR = '\n\n';
const WORD_PATTERN = /[\p{L}\p{N}]+(?:[’'‐‑-][\p{L}\p{N}]+)*/gu;

/**
 * Builds the canonical one-track script and preserves the exact text span of every beat.
 * Use this exact script for the TTS request; do not independently trim/reformat it afterward.
 */
export function buildNarrationScript(lesson: NarratedLesson): NarrationScript {
  const pieces: string[] = [];
  const segments: NarrationScriptSegment[] = [];
  let offset = 0;

  lesson.scenes.forEach((scene, sceneIndex) => {
    scene.beats.forEach((beat, beatIndex) => {
      const text = beat.say.trim();
      if (!text) {
        throw new Error(`Cannot build narration script: empty beat at ${scene.id}/${beatIndex}.`);
      }

      if (segments.length > 0) {
        pieces.push(BEAT_SEPARATOR);
        offset += Array.from(BEAT_SEPARATOR).length;
      }

      const length = Array.from(text).length;
      segments.push({
        sceneId: scene.id,
        sceneIndex,
        beatIndex,
        text,
        textStartCharacter: offset,
        textEndCharacter: offset + length,
      });
      pieces.push(text);
      offset += length;
    });
  });

  return { lessonId: lesson.id, text: pieces.join(''), segments };
}

function assertAlignmentMatchesScript(script: NarrationScript, alignment: CharacterTimeAlignment): void {
  const scriptCharacters = Array.from(script.text);
  const lengths = [
    alignment.characters.length,
    alignment.character_start_times_seconds.length,
    alignment.character_end_times_seconds.length,
  ];

  if (lengths.some((length) => length !== scriptCharacters.length)) {
    throw new Error(
      `TTS alignment length mismatch: script has ${scriptCharacters.length} characters, alignment arrays have ${lengths.join('/')}. Use alignment for the exact submitted script, not normalized text.`,
    );
  }

  for (let index = 0; index < scriptCharacters.length; index += 1) {
    if (alignment.characters[index] !== scriptCharacters[index]) {
      throw new Error(
        `TTS alignment text mismatch at character ${index}. The provider may have normalized the text; do not claim exact synchronization until offsets are mapped safely.`,
      );
    }

    const start = alignment.character_start_times_seconds[index];
    const end = alignment.character_end_times_seconds[index];
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start) {
      throw new Error(`Invalid TTS timestamps at character ${index}.`);
    }
    if (index > 0 && start < alignment.character_start_times_seconds[index - 1]) {
      throw new Error(`TTS character start times are not monotonic at character ${index}.`);
    }
  }
}

function firstAndLastSpokenCharacter(script: NarrationScript, segment: NarrationScriptSegment): [number, number] {
  let first = segment.textStartCharacter;
  let last = segment.textEndCharacter - 1;
  const characters = Array.from(script.text);

  while (first <= last && /^\s$/u.test(characters[first] ?? '')) first += 1;
  while (last >= first && /^\s$/u.test(characters[last] ?? '')) last -= 1;

  if (first > last) {
    throw new Error(`Cannot align an empty narration beat: ${segment.sceneId}/${segment.beatIndex}.`);
  }
  return [first, last];
}

/**
 * Converts a provider's exact character alignment into cue intervals for the existing scene/beat
 * model and into optional word-level highlight cues. Times are milliseconds from the audio track.
 *
 * The function deliberately rejects normalized/mismatched text instead of silently making
 * approximate timing look exact. A provider adapter must map normalized offsets explicitly first.
 */
export function buildAlignedNarrationTimeline(
  lesson: NarratedLesson,
  alignment: CharacterTimeAlignment,
): AlignedNarrationTimeline {
  const script = buildNarrationScript(lesson);
  assertAlignmentMatchesScript(script, alignment);

  const cues: NarrationCue[] = script.segments.map((segment) => {
    const [first, last] = firstAndLastSpokenCharacter(script, segment);
    return {
      ...segment,
      startMs: Math.round(alignment.character_start_times_seconds[first] * 1000),
      endMs: Math.round(alignment.character_end_times_seconds[last] * 1000),
    };
  });

  const wordCues: NarrationWordCue[] = [];
  WORD_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = WORD_PATTERN.exec(script.text)) !== null) {
    const textStartCharacter = Array.from(script.text.slice(0, match.index)).length;
    const textEndCharacter = textStartCharacter + Array.from(match[0]).length;
    const first = textStartCharacter;
    const last = textEndCharacter - 1;
    const segment = script.segments.find(
      (candidate) => first >= candidate.textStartCharacter && last < candidate.textEndCharacter,
    );

    // Words cannot cross beat separators; skip anything that does not belong to a source beat.
    if (!segment) continue;
    wordCues.push({
      sceneId: segment.sceneId,
      sceneIndex: segment.sceneIndex,
      beatIndex: segment.beatIndex,
      word: match[0],
      textStartCharacter,
      textEndCharacter,
      startMs: Math.round(alignment.character_start_times_seconds[first] * 1000),
      endMs: Math.round(alignment.character_end_times_seconds[last] * 1000),
    });
  }

  return {
    script,
    cues,
    wordCues,
    durationMs: Math.max(0, ...alignment.character_end_times_seconds.map((time) => Math.round(time * 1000))),
  };
}

/**
 * Returns the latest cue that has started at the requested time.
 * Holding the previous cue through a silence keeps the visual stable; callers should switch
 * to the next cue only when its real startMs is reached. Returns undefined before the first cue.
 */
export function cueAtTime<T extends { startMs: number }>(cues: readonly T[], currentMs: number): T | undefined {
  if (!cues.length || !Number.isFinite(currentMs) || currentMs < cues[0].startMs) return undefined;

  let low = 0;
  let high = cues.length - 1;
  let found = 0;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (cues[middle].startMs <= currentMs) {
      found = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return cues[found];
}
