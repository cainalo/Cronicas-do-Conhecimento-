import { describe, expect, it } from 'vitest';
import { chapters } from '@/content';
import { buildReviewSlides, plainReviewText } from '@/pages/ReviewSlides';

describe('caderno de slides para revisão', () => {
  it('constrói capa, lâminas por seção, conceitos e checagem final', () => {
    const chapter = chapters[0];
    const slides = buildReviewSlides(chapter);
    expect(slides[0].kind).toBe('cover');
    expect(slides.filter((slide) => slide.kind === 'section')).toHaveLength(chapter.sections.length);
    expect(slides.filter((slide) => slide.kind === 'glossary')).toHaveLength(chapter.glossary.length);
    expect(slides.at(-1)?.kind).toBe('closing');
    expect(slides.every((slide) => slide.title.trim().length > 2)).toBe(true);
    expect(slides.every((slide) => slide.body.trim().length > 0)).toBe(true);
  });

  it('mantém o texto-fonte legível ao retirar marcação Markdown', () => {
    const tick = String.fromCharCode(96);
    const plain = plainReviewText('## Variável\n**Nome** que guarda ' + tick + 'um valor' + tick + '.\n\n- primeiro exemplo\n- segundo exemplo');
    expect(plain).toContain('Variável');
    expect(plain).toContain('Nome');
    expect(plain).toContain('um valor');
    expect(plain).toContain('primeiro exemplo');
    expect(plain).not.toContain('**');
  });
});
