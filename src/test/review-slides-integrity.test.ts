import { describe, expect, it } from 'vitest';
import { chapters } from '@/content';
import { buildReviewSlides, plainReviewText, splitReviewChunks } from '@/pages/ReviewSlides';

function normalizedMarkdown(value: string): string {
  return plainReviewText(value).replace(/\s+/g, ' ').trim();
}

describe('integridade de conteúdo dos slides de revisão', () => {
  it('preserva pontuação de abreviações e iniciais bibliográficas', () => {
    const source = 'Ex.: Windows, Linux.\n\nTANENBAUM, A. S.; AUSTIN, T. Organização Estruturada de Computadores. Pearson.';
    expect(splitReviewChunks(source).join(' ')).toBe(normalizedMarkdown(source));
  });


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

  it('preserva as definições do glossário nas lâminas geradas, em ordem', () => {
    for (const chapter of chapters) {
      const slides = buildReviewSlides(chapter);
      const glossarySlides = slides.filter((slide) => slide.kind === 'glossary');
      let cursor = 0;

      for (const item of chapter.glossary) {
        const chunks = splitReviewChunks(item.definition);
        const matching = glossarySlides.slice(cursor, cursor + chunks.length);
        const label = chapter.id + '/glossário/' + item.term;

        expect(matching.length, label + ': quantidade de lâminas geradas').toBe(chunks.length);
        expect(matching.every((slide) => slide.title === item.term), label + ': termo/título incorreto').toBe(true);
        expect(matching.map((slide) => slide.body).join(' '), label + ': definição omitida ou reordenada')
          .toBe(normalizedMarkdown(item.definition));
        cursor += chunks.length;
      }

      expect(cursor, chapter.id + ': lâminas extras ou ausentes de glossário').toBe(glossarySlides.length);
    }
  });

  it('preserva as referências geradas nas lâminas, em ordem e sem omissões', () => {
    for (const chapter of chapters) {
      const slides = buildReviewSlides(chapter);
      const referenceSlides = slides.filter((slide) => slide.kind === 'references');
      let cursor = 0;

      for (const ref of chapter.references) {
        const source = ref.title + '\n\n' + ref.detail;
        const chunks = splitReviewChunks(source);
        const matching = referenceSlides.slice(cursor, cursor + chunks.length);
        const label = chapter.id + '/referência/' + ref.title;

        expect(matching.length, label + ': quantidade de lâminas geradas').toBe(chunks.length);
        expect(matching.every((slide) => slide.title === 'Fontes e aprofundamento'), label + ': título de referência')
          .toBe(true);
        expect(matching.map((slide) => slide.body).join(' '), label + ': referência omitida ou reordenada')
          .toBe(normalizedMarkdown(source));
        cursor += chunks.length;
      }

      expect(cursor, chapter.id + ': lâminas extras ou ausentes de referências').toBe(referenceSlides.length);
    }
  });

  it('cada seção de origem aparece na ordem correta do caderno gerado', () => {
    for (const chapter of chapters) {
      const slides = buildReviewSlides(chapter);
      const sectionSlides = slides.filter((slide) => slide.kind === 'section');

      expect(slides[0]?.kind, chapter.id + ': capa ausente').toBe('cover');
      expect(slides.at(-1)?.kind, chapter.id + ': fechamento ausente').toBe('closing');

      let previousIndex = -1;
      for (const section of chapter.sections) {
        const matching = sectionSlides.filter((slide) => slide.sectionId === section.id);
        const label = chapter.id + '/' + section.id;
        expect(matching.length, label + ': seção ausente').toBeGreaterThan(0);

        const firstIndex = slides.indexOf(matching[0]);
        expect(firstIndex, label + ': seção fora de ordem').toBeGreaterThan(previousIndex);
        previousIndex = firstIndex;

        expect(matching.map((slide) => slide.body).join(' '), label + ': corpo das lâminas não preserva o texto')
          .toBe(normalizedMarkdown(section.body));
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
