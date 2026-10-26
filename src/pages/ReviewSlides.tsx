import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { chapters, getChapter } from '@/content';
import type { Chapter } from '@/content/types';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';

export interface ReviewSlide {
  id: string;
  kind: 'cover' | 'section' | 'glossary' | 'references' | 'closing';
  title: string;
  eyebrow: string;
  body: string;
  chapterId: string;
  sectionId?: string;
}

export function plainReviewText(markdown: string): string {
  const tick = String.fromCharCode(96);
  const inlineCode = new RegExp(tick + '+([^' + tick + ']+)' + tick + '+', 'g');
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(inlineCode, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '• ')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^\s*\|.*\|\s*$/gm, '')
    .replace(/^\s*[-:| ]{3,}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Excertos literais do capítulo e verbetes do glossário; a lâmina não inventa um resumo. */
export function buildReviewSlides(chapter: Chapter): ReviewSlide[] {
  const slides: ReviewSlide[] = [{
    id: chapter.id + ':capa', kind: 'cover', title: chapter.title,
    eyebrow: 'Caderno visual de revisão', body: chapter.subtitle, chapterId: chapter.id,
  }];
  for (const section of chapter.sections) {
    const paragraphs = plainReviewText(section.body)
      .split(/\n\s*\n/)
      .map((part) => part.replace(/\s+/g, ' ').trim())
      .filter((part) => part.length > 30 && !/^\d+\s*\|/.test(part));
    slides.push({
      id: chapter.id + ':' + section.id, kind: 'section',
      title: section.title.replace(/^\d+\.\s*/, ''),
      eyebrow: 'Pontos de revisão · texto do capítulo',
      body: paragraphs.slice(0, 4).join('\n\n').slice(0, 1150) || 'Abra o capítulo completo para revisar este trecho.',
      chapterId: chapter.id, sectionId: section.id,
    });
  }
  for (const item of chapter.glossary) {
    slides.push({
      id: chapter.id + ':termo:' + item.term, kind: 'glossary', title: item.term,
      eyebrow: 'Conceito-chave', body: item.definition, chapterId: chapter.id,
    });
  }
  if (chapter.references.length) {
    slides.push({
      id: chapter.id + ':fontes', kind: 'references', title: 'Fontes e aprofundamento',
      eyebrow: 'Confira as referências do capítulo',
      body: chapter.references.map((ref) => ref.title + '\n' + ref.detail).join('\n\n'), chapterId: chapter.id,
    });
  }
  slides.push({
    id: chapter.id + ':fechamento', kind: 'closing', title: 'Explique com suas palavras',
    eyebrow: 'Checagem de aprendizagem',
    body: 'Sem olhar o texto, explique os conceitos principais deste capítulo. Dê um exemplo concreto, diferencie conceitos parecidos e diga em que situação cada um é usado. Depois, abra a prática para testar o que conseguiu recuperar da memória.',
    chapterId: chapter.id,
  });
  return slides;
}

function SlideCard({ slide, index, total }: { slide: ReviewSlide; index: number; total: number }) {
  return (
    <article className="review-slide-card relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-line bg-surface p-6 shadow-sm sm:min-h-[31rem] sm:p-10" data-testid="slide-card">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#2e7182]/10 blur-2xl" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2e7182]">{slide.eyebrow}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-4xl">{slide.title}</h2>
        {slide.kind === 'glossary' ? (
          <p className="mt-6 text-lg leading-relaxed sm:text-xl">{slide.body}</p>
        ) : slide.kind === 'cover' ? (
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{slide.body}</p>
        ) : (
          <div className="mt-6 whitespace-pre-line text-sm leading-relaxed sm:text-base sm:leading-7">{slide.body}</div>
        )}
      </div>
      <div className="relative mt-8 flex items-end justify-between gap-3 border-t border-line/70 pt-4">
        <span className="text-xs text-muted">Crônicas do Conhecimento</span>
        <span className="font-mono text-sm tabular-nums text-muted">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </article>
  );
}

export function ReviewSlidesPage() {
  const [chapterId, setChapterId] = useState(chapters[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const chapter = getChapter(chapterId);
  const slides = useMemo(() => chapter ? buildReviewSlides(chapter) : [], [chapter]);
  const current = slides[Math.min(index, Math.max(0, slides.length - 1))];

  if (!chapter || !current) return <p>Não foi possível carregar as lâminas de revisão deste capítulo.</p>;
  const previous = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));
  const changeChapter = (id: string) => { setChapterId(id); setIndex(0); };

  return (
    <div className="space-y-4">
      <style>{'@media print { body { background: white !important; color: black !important; } .review-slides-controls, header, nav { display: none !important; } main { display: block !important; height: auto !important; max-width: none !important; padding: 0 !important; overflow: visible !important; } .review-slide-print { display: block !important; } .review-slide-print article { min-height: 95vh !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; break-after: page; page-break-after: always; color: black !important; background: white !important; } }'}</style>
      <div className="review-slides-controls space-y-3">
        <PageHeader area="treino" icon="cartas" title="Slides de revisão" subtitle="Lâminas para revisar o texto, recuperar conceitos e imprimir ou salvar como PDF." />
        <div className="card flex flex-col gap-3 p-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm">
            <span className="font-semibold">Capítulo</span>
            <select className="input mt-1 w-full" value={chapterId} onChange={(e) => changeChapter(e.target.value)}>
              {chapters.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </label>
          <button type="button" className="btn-ghost w-full sm:w-auto" onClick={() => window.print()}>
            <Icon name="pergaminho" size={17} /> Imprimir / Salvar como PDF
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted">{slides.length} lâminas · navegue com os botões</span>
          <div className="flex gap-2">
            <button type="button" className="btn-ghost !min-h-10 !px-3" onClick={previous} disabled={index === 0} aria-label="Slide anterior"><Icon name="voltar" size={17} /></button>
            <button type="button" className="btn-primary !min-h-10 !px-3" onClick={next} disabled={index >= slides.length - 1} aria-label="Próximo slide">Próximo <Icon name="avancar" size={17} /></button>
          </div>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-raised" aria-label="Progresso dos slides">
          <div className="h-full rounded-full bg-[#c8402a] transition-all duration-300" style={{ width: (((index + 1) / slides.length) * 100) + '%' }} />
        </div>
      </div>
      <div className="review-slides-controls">
        <SlideCard slide={current} index={index} total={slides.length} />
        <div className="mt-3 flex flex-wrap justify-center gap-1.5" aria-label="Ir diretamente para um slide">
          {slides.map((slide, i) => (
            <button key={slide.id} type="button" aria-label={'Ir para slide ' + (i + 1) + ': ' + slide.title} aria-current={i === index ? 'step' : undefined} onClick={() => setIndex(i)}
              className={'h-2 rounded-full transition-all ' + (i === index ? 'w-8 bg-[#c8402a]' : 'w-2 bg-line hover:bg-[#2e7182]')} />
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted">Os trechos vêm do conteúdo do capítulo; as lâminas não substituem a leitura completa nem as questões.</p>
        <Link to={'/capitulo/' + chapter.id} className="btn-ghost mt-3 w-full">Abrir capítulo completo</Link>
      </div>
      <div className="review-slide-print hidden">
        {slides.map((slide, i) => <SlideCard key={slide.id} slide={slide} index={i} total={slides.length} />)}
      </div>
    </div>
  );
}
