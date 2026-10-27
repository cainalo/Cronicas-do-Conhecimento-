// Regra de testes de layout (docs/TESTING.md): barra, já no npm test, os padrões que fizeram
// overlays e o cartão de correção ficarem presos à coluna da página, com margem clara em volta.
// A verificação completa no navegador fica em scripts/e2e-layout.mjs (npm run test:e2e, no CI).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { plainReviewText, splitReviewChunks } from '../pages/ReviewSlides';

const ROOT = join(__dirname, '..');

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'test' ? [] : tsxFiles(p);
    return p.endsWith('.tsx') ? [p] : [];
  });
}

// Elementos fixos que ficam fora do contêiner animado da página (no Layout) e por isso podem
// usar position: fixed direto. Qualquer outro overlay de tela cheia precisa de Portal.
const ALLOWED_DIRECT_FIXED = ['components/Layout.tsx', 'app/fx.tsx'];

describe('overlays de tela cheia', () => {
  const files = tsxFiles(ROOT);

  it('todo overlay "fixed inset-0" fica dentro de Portal ou createPortal', () => {
    const problems: string[] = [];
    for (const f of files) {
      const rel = f.slice(ROOT.length + 1);
      if (ALLOWED_DIRECT_FIXED.includes(rel)) continue;
      const lines = readFileSync(f, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (!/className=["{`][^"]*\bfixed inset-0\b/.test(line)) return;
        const before = lines.slice(Math.max(0, i - 4), i).join('\n');
        if (!/<Portal>|createPortal\(/.test(before)) problems.push(`${rel}:${i + 1}`);
      });
    }
    expect(problems, `Overlays fixos sem Portal (ficam presos a ancestrais com transform ou backdrop-filter): ${problems.join(', ')}`).toEqual([]);
  });

  it('o cartão de correção das atividades é fixo na base, de borda a borda', () => {
    const src = readFileSync(join(ROOT, 'components/activities/ActivityView.tsx'), 'utf8');
    expect(src).toMatch(/anim-toast-in fixed inset-x-0 bottom-0/);
    expect(src).toMatch(/safe-area-inset-bottom/);
  });
});

describe('animações de contêiner', () => {
  const css = readFileSync(join(ROOT, 'styles/index.css'), 'utf8');

  // Animação de transform com fill "both" ou "forwards" deixa um transform no elemento depois de
  // terminar, e todo position: fixed dentro dele passa a se medir por ele, não pela tela.
  it.each(['.page-enter', '.stagger > *'])('%s não mantém transform ao terminar', (selector) => {
    const rule = css.split('\n').find((l) => l.trim().startsWith(`${selector} {`));
    expect(rule, `regra ${selector} não encontrada`).toBeTruthy();
    expect(rule).not.toMatch(/\b(both|forwards)\b/);
  });
});

describe('experiência imersiva de aula e revisão', () => {
  it('a aula narrada ocupa a viewport e bloqueia rolagem vertical', () => {
    const narrated = readFileSync(join(ROOT, 'pages/Narrated.tsx'), 'utf8');
    expect(narrated).toMatch(/fixed inset-0[^\n]*h-\[100dvh\]/);
    expect(narrated).toMatch(/document\.body\.style\.overflow = 'hidden'/);
    // Portal para body evita que transforms/backdrop-filter de ancestrais encolham o player.
    expect(narrated).toContain('return createPortal((');
    expect(narrated).toContain('document.body);');
    expect(narrated).toContain('data-testid="narrada-legendas-toggle"');
    expect(narrated).toContain('whitespace-nowrap');
    expect(narrated).not.toContain('ActivityView');
    expect(narrated).not.toContain('done && l.check');
    expect(narrated).toMatch(/function CinematicScene/);
    expect(narrated).toMatch(/data-testid="narrada-cena-cinematica"/);
    expect(narrated).toMatch(/wordStarts\.reduce/);
    expect(narrated).toMatch(/const targetOffset = Math\.max\(0, target - cursor\)/);
    expect(narrated).toMatch(/wordIndexAtChar\(say, Math\.floor/);
  });

  it('a composição audiovisual mantém o palco e não usa listas de cartões que piscam', () => {
    const narrated = readFileSync(join(ROOT, 'pages/Narrated.tsx'), 'utf8');
    const css = readFileSync(join(ROOT, 'styles/index.css'), 'utf8');
    expect(narrated).not.toMatch(/EditorialVideoCut|SceneMotionStrip|function SceneView/);
    expect(narrated).not.toMatch(/visualPhase|ccv-sequence__step|ccv-timeline__event|ccv-equation__line/);
    expect(narrated).toContain('beatIndex={pos.beat}');
    expect(narrated).not.toContain("key={scene.id + ':visual:' + beatIndex}");
    expect(narrated).not.toContain("key={scene.id + ':copy:' + beatIndex}");
    expect(narrated).toContain('const CinematicSceneMemo = memo(CinematicScene)');
    expect(narrated).toContain('voice.createAudioTrack(script, rate)');
    expect(narrated).toContain('function cueDurationMs(text: string, rate = 1): number');
    expect(narrated).toMatch(/beats\.map\(\(beat\) => beat\.say\.trim\(\)\)\.join\(' '\)/);
    expect(narrated).not.toContain("positions.map((p) => l.scenes[p.scene].beats[p.beat].say.trim()).join('\\n\\n')");

    expect(narrated).toContain('audio.currentTime = clamped / 1000');
    expect(narrated).toContain("useCueMotion(scene.id + ':' + beatIndex)");
    expect(narrated).toContain('const sceneMotion = useCueMotion(scene.id)');
    expect(narrated).toContain("sceneMotion ? ' is-scene-change' : ''");
    expect(narrated).toContain('data-testid="narrada-corte-suave"');
    expect(narrated).toContain('beatVisualDuration >= 6000');
    expect(narrated).toContain('beatVisualProgress >= 0.24');
    expect(narrated).toContain('beatVisualProgress < 0.84');
    expect(narrated).toContain('function CinematicCutaway');
    expect(narrated).toContain('data-testid="narrada-insercao-visual"');
    expect(narrated).toContain("visual.kind === 'timeline'");
    expect(narrated).toContain("visual.kind === 'equation'");
    expect(css).toContain('@keyframes ccv-film-cut-in');
    expect(css).toContain('@keyframes ccv-film-scene-in');
    expect(css).toContain('.ccv-film-copy.is-cue-change');
    expect(css).toContain('.ccv-film-cut.is-scene-change');
    expect(css).toContain('.ccv-cutaway.is-visible');
    expect(css).toContain('.ccv-cutaway {');
    expect(css).toContain('clip-path: inset(0 100% 0 0)');
    expect(css).toContain('transition: clip-path 850ms');
    expect(css).not.toContain('transform: translate3d(calc(100% + 2.2rem)');
    expect(css).toContain('.ccv-film-scene');
    expect(css).not.toMatch(/ccv-shot-reveal|ccv-scene__change|ccv-sequence__step|ccv-timeline__event/);
    expect(css).toContain('prefers-reduced-motion: reduce');
  });

  it('as aulas oferecem catálogo de vozes neurais e mantêm fallback local', () => {
    const voice = readFileSync(join(ROOT, 'app/voice.ts'), 'utf8');
    expect(voice).toContain("id: 'Sulafat', label: 'Sulafat · acolhedora e quente (recomendada)'");
    expect(voice).toContain("id: 'Callirrhoe'");
    expect(voice).toContain("id: 'Charon'");
    expect(voice).toContain("gemini-3.8-flash-tts");
    expect(voice).toContain('cadência uniforme');
    expect(voice).toContain('nativeVoice() ?? browserVoice() ?? none');
    expect((voice.match(/id: '[A-Za-z]+'/g) ?? []).length).toBe(30);
  });

  it('as revisões preservam o texto completo sem cortes por substring e usam cores editoriais fortes', () => {
    const slides = readFileSync(join(ROOT, 'pages/ReviewSlides.tsx'), 'utf8');
    expect(slides).toMatch(/export function splitReviewChunks/);
    expect(slides).toMatch(/chunks\.forEach/);
    expect(slides).not.toMatch(/slice\(0, (560|620|500)\)/);
    expect(slides).toMatch(/bg-\[#c8402a\] text-white/);
  });

  it('os slides de revisão cabem na viewport e aceitam gesto horizontal', () => {
    const src = readFileSync(join(ROOT, 'pages/ReviewSlides.tsx'), 'utf8');
    expect(src).toMatch(/fixed inset-0[^\n]*h-\[100dvh\][^\n]*overflow-hidden/);
    expect(src).toMatch(/review-slide-swipe-area/);
    expect(src).toMatch(/if \(dx < 0\) next\(\); else previous\(\)/);
    expect(src).toMatch(/document\.documentElement\.style\.overflow = 'hidden'/);
    expect(src).toMatch(/review-slide-cover/);
    expect(src).toMatch(/data-testid=\"review-slide-visual\"/);
    expect(src).toMatch(/maxChars = 250/);
    expect(src).not.toMatch(/slice\(0, 560\)|slice\(0, 620\)|slice\(0, 500\)/);
  });

  it('o app Android reativa o modo imersivo ao iniciar', () => {
    const src = readFileSync(join(ROOT, 'app/native.ts'), 'utf8');
    expect(src).toMatch(/await setImmersive\(true\)/);
  });
});


describe('integridade do texto dos slides', () => {
  it('preserva todas as células das tabelas Markdown como texto legível', () => {
    const table = [
      '| Conceito | Função |',
      '| --- | --- |',
      '| CPU | Executa instruções do programa |',
      '| RAM | Mantém dados temporários em uso |',
    ].join('\n');
    const plain = plainReviewText(table);
    expect(plain).toContain('Conceito');
    expect(plain).toContain('CPU');
    expect(plain).toContain('Executa instruções do programa');
    expect(plain).toContain('RAM');
    expect(plain).toContain('Mantém dados temporários em uso');
  });

  it('divide textos longos em blocos curtos sem perder nenhuma palavra ou frase', () => {
    const original = ('Uma explicação completa preserva o conceito e o exemplo. ').repeat(18).trim();
    const normalized = plainReviewText(original);
    const chunks = splitReviewChunks(original, 250);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join(' ')).toBe(normalized);
    expect(chunks.every((chunk) => chunk.length <= 250)).toBe(true);
  });
});

