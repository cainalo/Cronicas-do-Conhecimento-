import type { CharacterTimeAlignment } from '@/lib/narration-timeline';

export interface ElevenLabsAlignmentResult {
  alignment: CharacterTimeAlignment;
  /** Provider-reported overall alignment loss; lower generally indicates a better fit. */
  loss: number;
}

interface ElevenLabsAlignedCharacter {
  text: string;
  start: number;
  end: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseCharacter(value: unknown, index: number): ElevenLabsAlignedCharacter {
  if (!isRecord(value)) {
    throw new Error('ElevenLabs alignment character ' + index + ' is not an object.');
  }

  const { text, start, end } = value;
  if (typeof text !== 'string' || Array.from(text).length !== 1) {
    throw new Error('ElevenLabs alignment item ' + index + ' must contain exactly one Unicode code point.');
  }
  if (typeof start !== 'number' || typeof end !== 'number'
    || !Number.isFinite(start) || !Number.isFinite(end)
    || start < 0 || end < start) {
    throw new Error('ElevenLabs alignment timestamps are invalid at character ' + index + '.');
  }

  return { text, start, end };
}

/**
 * Adapts the documented ElevenLabs POST /v1/forced-alignment response:
 * { characters: [{ text, start, end }], words: [...], loss }.
 *
 * The provider's transcript must match the exact text submitted for synthesis/alignment.
 * This function deliberately rejects omissions, Unicode normalization, and malformed timing
 * instead of fabricating or interpolating offsets.
 *
 * Make the API request on a trusted server; never ship an ElevenLabs API key in the web bundle.
 */
export function parseElevenLabsForcedAlignmentResponse(
  payload: unknown,
  expectedText: string,
): ElevenLabsAlignmentResult {
  if (!isRecord(payload)) {
    throw new Error('ElevenLabs forced-alignment response is not an object.');
  }
  if (typeof expectedText !== 'string' || expectedText.length === 0) {
    throw new Error('The exact transcript submitted for alignment is required.');
  }
  if (!Array.isArray(payload.characters)) {
    throw new Error('ElevenLabs response does not contain a characters array.');
  }
  if (typeof payload.loss !== 'number' || !Number.isFinite(payload.loss) || payload.loss < 0) {
    throw new Error('ElevenLabs response contains an invalid alignment loss.');
  }

  const expectedCharacters = Array.from(expectedText);
  if (payload.characters.length !== expectedCharacters.length) {
    throw new Error(
      'ElevenLabs character count mismatch: transcript has ' + expectedCharacters.length
      + ' Unicode code points but response has ' + payload.characters.length + '.',
    );
  }

  const characters: string[] = [];
  const character_start_times_seconds: number[] = [];
  const character_end_times_seconds: number[] = [];
  let previousStart = -1;
  let previousEnd = -1;

  payload.characters.forEach((rawCharacter, index) => {
    const item = parseCharacter(rawCharacter, index);
    if (item.text !== expectedCharacters[index]) {
      throw new Error(
        'ElevenLabs transcript mismatch at character ' + index + ': expected "'
        + expectedCharacters[index] + '", received "' + item.text + '".',
      );
    }
    if (item.start < previousStart || item.end < previousEnd) {
      throw new Error('ElevenLabs timestamps are not monotonic at character ' + index + '.');
    }

    characters.push(item.text);
    character_start_times_seconds.push(item.start);
    character_end_times_seconds.push(item.end);
    previousStart = item.start;
    previousEnd = item.end;
  });

  return {
    alignment: {
      characters,
      character_start_times_seconds,
      character_end_times_seconds,
    },
    loss: payload.loss,
  };
}
