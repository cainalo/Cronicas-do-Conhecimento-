// Regra de testes de layout (docs/TESTING.md): barra, já no npm test, os padrões que fizeram
// overlays e o cartão de correção ficarem presos à coluna da página, com margem clara em volta.
// A verificação completa no navegador fica em scripts/e2e-layout.mjs (npm run test:e2e, no CI).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

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
    expect(narrated).toMatch(/function CinematicScene/);
    expect(narrated).toMatch(/data-testid="narrada-cena-cinematica"/);
    expect(narrated).toMatch(/wordStarts\.reduce/);
    expect(narrated).toMatch(/const targetOffset = Math\.max\(0, target - cursor\)/);
    expect(narrated).toMatch(/wordIndexAtChar\(say, Math\.floor/);
  });

  it('a composição audiovisual não remonta a tela por frações do tempo e não usa a faixa antiga de palavras', () => {
    const narrated = readFileSync(join(ROOT, 'pages/Narrated.tsx'), 'utf8');
    const css = readFileSync(join(ROOT, 'styles/index.css'), 'utf8');
    expect(narrated).not.toMatch(/visualPhase|EditorialVideoCut|SceneMotionStrip|function SceneView/);
    expect(narrated).toMatch(/<CinematicScene key={scene\.id}/);
    expect(narrated).toMatch(/visual\.kind === 'timeline'/);
    expect(narrated).toMatch(/visual\.kind === 'equation'/);
    expect(css).toMatch(/@keyframes ccv-scene-enter/);
    expect(css).toMatch(/@keyframes ccv-object-float/);
    expect(css).toMatch(/prefers-reduced-motion: reduce/);
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
  });

  it('o app Android reativa o modo imersivo ao iniciar', () => {
    const src = readFileSync(join(ROOT, 'app/native.ts'), 'utf8');
    expect(src).toMatch(/await setImmersive\(true\)/);
  });
});
