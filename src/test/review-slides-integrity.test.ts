import { describe, expect, it } from 'vitest';
import { chapters } from '@/content';
import { buildReviewSlides, plainReviewText, splitReviewChunks } from '@/pages/ReviewSlides';

function normalizedMarkdown(value: string): string {
  return plainReviewText(value).replace(/\s+/g, ' ').trim();
}

describe('integridade de conteúdo dos slides de revisão', () => {
  it('preserva o texto normalizado de cada seção em todos os capítulos', () => {
    expect(chapters.length).toBeGreaterThan(0);

    for (const chapter of chapters) {
      for (const section of chapter.sections) {
        const expected = normalizedMarkdown(section.body);
        const chunks = splitReviewChunks(section.body);
        const label = chapter.id + '/' + section.id;

        expect(chunks.length, label + ': deve gerar lâminas').toBeGreaterThan(0);
        expect(chunks.every((chunk) => chunk.trim().length > 0), label + ': lâminas vazias').toBe(true);
        expect(chunks.join(' '), label + ': texto foi perdido ou reordenado').toBe(expected);
      }
    }
  });

  it('preserva definições do glossário e referências completas', () => {
    for (const chapter of chapters) {
      for (const item of chapter.glossary) {
        expect(
          splitReviewChunks(item.definition).join(' '),
          chapter.id + '/glossário/' + item.term,
        ).toBe(normalizedMarkdown(item.definition));
      }

      for (const ref of chapter.references) {
        const source = ref.title + '\n\n' + ref.detail;
        expect(
          splitReviewChunks(source).join(' '),
          chapter.id + '/referência/' + ref.title,
        ).toBe(normalizedMarkdown(source));
      }
    }
  });

  it('cada seção de origem aparece na ordem correta do caderno gerado', () => {
    for (const chapter of chapters) {
      const slides = buildReviewSlides(chapter);
      const sectionSlides = slides.filter((slide) => slide.kind === 'section');

      let previousIndex = -1;
      for (const section of chapter.sections) {
        const matching = sectionSlides.filter((slide) => slide.sectionId === section.id);
        expect(matching.length, chapter.id + '/' + section.id + ': seção ausente').toBeGreaterThan(0);

        const firstIndex = slides.indexOf(matching[0]);
        expect(firstIndex, chapter.id + '/' + section.id + ': seção fora de ordem').toBeGreaterThan(previousIndex);
        previousIndex = firstIndex;

        expect(
          matching.map((slide) => slide.body).join(' '),
          chapter.id + '/' + section.id + ': corpo das lâminas não preserva o texto',
        ).toBe(normalizedMarkdown(section.body));
      }
    }
  });

  it('não usa a mensagem de contingência para esconder conteúdo de origem não vazio', () => {
    const fallback = 'Abra o capítulo completo para revisar este trecho.';
    for (const chapter of chapters) {
      for (const section of chapter.sections) {
        if (normalizedMarkdown(section.body)) {
          expect(splitReviewChunks(section.body)).not.toEqual([fallback]);
        }
      }
    }
  });
});
