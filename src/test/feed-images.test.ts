import { describe, expect, it } from 'vitest';
import { duplicateFeedImageSources, feedImages } from '@/content/estudos/imagens';

describe('acervo visual do feed', () => {
  it('atribui fontes diferentes a cada cartão para evitar imagens repetidas', () => {
    expect(Object.keys(feedImages).length).toBeGreaterThanOrEqual(10);
    expect(duplicateFeedImageSources(feedImages)).toEqual([]);
  });

  it('inclui ilustrações locais e fotos editoriais com fonte e licença', () => {
    const values = Object.values(feedImages);
    expect(values.some((image) => image.kind === 'illustration' && image.src.startsWith('/images/feed/'))).toBe(true);
    expect(values.some((image) => image.kind === 'photo' && image.src.startsWith('https://images.unsplash.com/'))).toBe(true);
    expect(values.every((image) => image.alt.trim().length > 0 && image.sourceUrl && image.license && image.licenseUrl)).toBe(true);
  });
});
