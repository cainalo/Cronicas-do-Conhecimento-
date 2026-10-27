import { fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { chapters } from '@/content';
import { buildReviewSlides, plainReviewText, ReviewSlidesPage, splitReviewChunks } from '@/pages/ReviewSlides';

describe('caderno de slides para revisão', () => {
  it('constrói capa, lâminas por seção, conceitos e checagem final', () => {
    const chapter = chapters[0];
    const slides = buildReviewSlides(chapter);
    expect(slides[0].kind).toBe('cover');
    const sectionSlides = slides.filter((slide) => slide.kind === 'section');
    const glossarySlides = slides.filter((slide) => slide.kind === 'glossary');
    // Seções longas agora são divididas em lâminas completas, sem truncar o fim.
    expect(sectionSlides.length).toBeGreaterThanOrEqual(chapter.sections.length);
    expect(chapter.sections.every((section) => sectionSlides.some((slide) => slide.sectionId === section.id))).toBe(true);
    expect(glossarySlides.length).toBeGreaterThanOrEqual(chapter.glossary.length);
    expect(chapter.glossary.every((item) => glossarySlides.some((slide) => slide.title === item.term))).toBe(true);
    expect(slides.at(-1)?.kind).toBe('closing');
    expect(slides.every((slide) => slide.title.trim().length > 2)).toBe(true);
    expect(slides.every((slide) => slide.body.trim().length > 0)).toBe(true);
  });

  it('divide textos longos sem eliminar o fim nem cortar palavras', () => {
    const source = 'A primeira parte explica o conceito. ' + 'Palavra longa sem truncar '.repeat(25) + 'A frase final deve permanecer inteira.';
    const normalized = plainReviewText(source);
    const chunks = splitReviewChunks(source, 90);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join(' ')).toBe(normalized.replace(/\s+/g, ' ').trim());
    expect(chunks.at(-1)).toContain('A frase final deve permanecer inteira.');
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


it('slides ocupam a viewport e permitem navegar por gesto horizontal', () => {
  const total = buildReviewSlides(chapters[0]).length;
  render(createElement(MemoryRouter, null, createElement(ReviewSlidesPage)));
  const root = screen.getByTestId('review-slides-fullscreen');
  const area = screen.getByTestId('review-slide-swipe-area');
  expect(root).toHaveClass('fixed', 'inset-0', 'h-[100dvh]', 'overflow-hidden');
  expect(area).toBeInTheDocument();
  expect(root.querySelector('header')?.textContent).toContain('1 / ' + total);

  fireEvent.pointerDown(area, { pointerId: 1, clientX: 280, clientY: 220 });
  fireEvent.pointerUp(area, { pointerId: 1, clientX: 170, clientY: 222 });
  expect(root.querySelector('header')?.textContent).toContain('2 / ' + total);

  fireEvent.pointerDown(area, { pointerId: 1, clientX: 90, clientY: 220 });
  fireEvent.pointerUp(area, { pointerId: 1, clientX: 210, clientY: 221 });
  expect(root.querySelector('header')?.textContent).toContain('1 / ' + total);
});
