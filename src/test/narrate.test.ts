// Aulas narradas geradas do texto das aulas (lib/narrate.ts): fala limpa e fiel ao texto.
import { describe, expect, it } from 'vitest';
import { feedLessons, narratedLessons } from '@/content';
import { trailUnits } from '@/app/useCheckpoint';
import { plainSpeech } from '@/lib/narrate';

const auto = narratedLessons.filter((n) => n.id.startsWith('narrada.auto.'));

describe('aulas narradas geradas', () => {
  it('existe uma para cada primeira aula de trecho sem narrada feita à mão', () => {
    expect(auto.length).toBeGreaterThan(50);
  });
  it('a fala não tem marcação, código nem tabela, e nenhuma fala fica vazia', () => {
    for (const n of auto)
      for (const sc of n.scenes)
        for (const b of sc.beats) {
          expect(b.say.trim().length, `${n.id}/${sc.id}`).toBeGreaterThan(3);
          expect(b.say, `${n.id}/${sc.id}`).not.toMatch(/\*\*|`|^\||```|\]\(/);
        }
  });
  it('só usa frases que estão na própria aula em texto', () => {
    for (const n of auto.slice(0, 20)) {
      const m = feedLessons.find((x) => x.id === n.lessonId)!;
      const source = [...m.steps.flatMap((s) => [...plainSpeech(s.explain), ...(s.example ? plainSpeech(s.example) : [])])].join(' ');
      const scene = n.scenes.find((sc) => sc.id === m.steps[0].id)!;
      for (const b of scene.beats) for (const piece of b.say.split(/(?<=[.!?:])\s+/)) expect(source, n.id).toContain(piece.replace(/^Por exemplo:\s*/, ''));
    }
  });
  it('cada uma entra na trilha logo depois da sua aula', () => {
    const units = trailUnits();
    for (const n of auto) {
      const i = units.findIndex((u) => u.key === `narrada:${n.id}`);
      expect(i, n.id).toBeGreaterThan(0);
      expect(units[i - 1].key.endsWith(`#${n.lessonId}`) || units[i - 1].kind === 'aprender', n.id).toBe(true);
    }
  });
  it('plainSpeech tira a marcação de markdown', () => {
    expect(plainSpeech('- **Git**: `git add` e *staging*;\n```bash\nls\n```\n| a | b |')).toEqual(['Git: git add e staging.']);
  });
});
