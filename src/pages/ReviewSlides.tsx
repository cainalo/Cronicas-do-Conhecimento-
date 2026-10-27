import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { chapters, getChapter } from '@/content';
import type { Chapter } from '@/content/types';
import { Icon } from '@/components/Icon';
import { Illustration, illustrationFor } from '@/components/Illustration';

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
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, '')
    .replace(/^\s*\|([^\n]*?)\|\s*$/gm, (_, cells: string) => '• ' + cells.split('|').map((cell: string) => cell.trim()).filter(Boolean).join(' · '))
    .replace(/^\s*[-:| ]{3,}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Quebra o material inteiro em lâminas legíveis. Limite por palavra/frase, nunca por
 * substring: nenhuma lâmina termina no meio de uma palavra ou corta o final do texto.
 */
export function splitReviewChunks(value: string, maxChars = 430): string[] {
  const normalized = plainReviewText(value);
  const paragraphs = normalized.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const result: string[] = [];
  for (const paragraph of paragraphs) {
    let current = '';
    const flush = () => { if (current.trim()) result.push(current.trim()); current = ''; };
    const sentences = paragraph.match(/[^.!?]+[.!?]+[\]})'"']*|[^.!?]+$/g) ?? [paragraph];
    for (const rawSentence of sentences) {
      const sentence = rawSentence.trim();
      if (!sentence) continue;
      if (sentence.length > maxChars) {
        flush();
        let part = '';
        for (const word of sentence.split(/\s+/)) {
          if (part && (part + ' ' + word).length > maxChars) { result.push(part); part = word; }
          else part = part ? part + ' ' + word : word;
        }
        if (part) current = part;
      } else if (current && (current + ' ' + sentence).length > maxChars) {
        flush();
        current = sentence;
      } else {
        current = current ? current + ' ' + sentence : sentence;
      }
    }
    flush();
  }
  return result.length ? result : ['Abra o capítulo completo para revisar este trecho.'];
}

/** Cada lâmina usa texto real do capítulo, dividido sem truncamento. */
export function buildReviewSlides(chapter: Chapter): ReviewSlide[] {
  const slides: ReviewSlide[] = [{
    id: chapter.id + ':capa', kind: 'cover', title: chapter.title,
    eyebrow: 'Caderno visual de revisão', body: chapter.subtitle, chapterId: chapter.id,
  }];
  for (const section of chapter.sections) {
    const chunks = splitReviewChunks(section.body);
    chunks.forEach((body, partIndex) => {
      slides.push({
        id: chapter.id + ':' + section.id + ':' + partIndex, kind: 'section',
        title: section.title.replace(/^\d+\.\s*/, ''),
        eyebrow: chunks.length > 1 ? `Pontos de revisão · parte ${partIndex + 1} de ${chunks.length}` : 'Pontos de revisão · texto do capítulo',
        body, chapterId: chapter.id, sectionId: section.id,
      });
    });
  }
  for (const item of chapter.glossary) {
    const chunks = splitReviewChunks(item.definition);
    chunks.forEach((body, partIndex) => {
      slides.push({
        id: chapter.id + ':termo:' + item.term + ':' + partIndex, kind: 'glossary',
        title: item.term,
        eyebrow: chunks.length > 1 ? `Conceito-chave · parte ${partIndex + 1} de ${chunks.length}` : 'Conceito-chave',
        body, chapterId: chapter.id,
      });
    });
  }
  for (const ref of chapter.references) {
    const chunks = splitReviewChunks(ref.title + '\n\n' + ref.detail);
    chunks.forEach((body, partIndex) => {
      slides.push({
        id: chapter.id + ':fonte:' + ref.title + ':' + partIndex, kind: 'references',
        title: 'Fontes e aprofundamento',
        eyebrow: chunks.length > 1 ? `Referência · parte ${partIndex + 1} de ${chunks.length}` : 'Confira as referências do capítulo',
        body, chapterId: chapter.id,
      });
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

function reviewHistoricalVisual(value: string): { src: string; alt: string; caption: string; source: string; sourceUrl: string } | undefined {
  const text = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/ada lovelace|ada king|lovelace/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ada_Lovelace_portrait.jpg?width=900',
    alt: 'Retrato em aquarela de Ada Lovelace, matemática do século XIX',
    caption: 'Ada Lovelace · c. 1840', source: 'Domínio público · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg',
  };
  if (/\beniac\b/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/ENIAC.jpg?width=1000',
    alt: 'Painéis do ENIAC, computador eletrônico pioneiro',
    caption: 'ENIAC · computador pioneiro', source: 'CC BY-SA 4.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:ENIAC.jpg',
  };
  return undefined;
}

function SlideVisual({ slide, variant = 'standard' }: { slide: ReviewSlide; variant?: 'standard' | 'cover' }) {
  const photo = reviewHistoricalVisual(slide.title + ' ' + slide.body);
  if (photo) return <figure className={'review-slide-visual review-slide-visual--' + variant} data-testid="review-slide-visual">
    <img src={photo.src} alt={photo.alt} loading="eager" decoding="async" />
    <figcaption><strong>{photo.caption}</strong><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.source}</a></figcaption>
  </figure>;
  return <div className={'review-slide-illustration review-slide-illustration--' + variant} data-testid="review-slide-visual">
    <Illustration name={illustrationFor(slide.chapterId + ' ' + slide.title + ' ' + slide.body)} animate className="h-full w-full" />
    <span aria-hidden="true">{String(slide.chapterId.replace(/[^a-z0-9]/gi, '').length + slide.title.length).padStart(2, '0')}</span>
  </div>;
}

function SlideCard({ slide, index, total }: { slide: ReviewSlide; index: number; total: number }) {
  const palettes: Record<ReviewSlide['kind'], string> = {
    cover: 'bg-[#c8402a] text-white',
    section: 'bg-[#1f5c7a] text-white',
    glossary: 'bg-[#6e3b5c] text-white',
    references: 'bg-[#a8365e] text-white',
    closing: 'bg-[#9e6a14] text-white',
  };
  const sectionPalette = ['bg-[#1f5c7a] text-white', 'bg-[#6e3b5c] text-white', 'bg-[#a8365e] text-white', 'bg-[#9e6a14] text-white', 'bg-[#c8402a] text-white'];
  const palette = slide.kind === 'section' ? sectionPalette[index % sectionPalette.length] : palettes[slide.kind];

  if (slide.kind === 'cover') return <article className="review-slide-card review-slide-cover relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/15 p-4 shadow-sm sm:rounded-[1.8rem] sm:p-8" data-testid="slide-card">
    <div className="review-slide-cover__ring" aria-hidden="true" />
    <div className="review-slide-cover__ring review-slide-cover__ring--inner" aria-hidden="true" />
    <div className="review-slide-cover__grid" aria-hidden="true" />
    <div className="relative flex min-h-0 flex-1 flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] sm:items-center sm:gap-5">
      <div className="relative z-10 flex min-h-0 flex-col justify-center">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/80">CRÔNICAS DO CONHECIMENTO</p>
        <div className="mt-5 flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#fff1c9]"><span className="h-2 w-2 rounded-full bg-[#fff1c9]" />{slide.eyebrow}</div>
        <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2.2rem,6.3vh,5rem)] font-semibold leading-[.98] tracking-tight sm:mt-5">{slide.title}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-xl sm:leading-8">{slide.body}</p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/30 pt-3 sm:mt-8"><span className="font-mono text-[0.65rem] font-bold tracking-widest text-[#fff1c9]">CADERNO VISUAL</span><span className="h-px flex-1 bg-white/35" /><span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/70">Aprender · revisar · aplicar</span></div>
      </div>
      <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center sm:mt-0">
        <SlideVisual slide={slide} variant="cover" />
        <div className="absolute bottom-2 right-2 rotate-[-7deg] border-2 border-white/60 px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.2em] text-white/85 sm:bottom-4 sm:right-0">GUIA DE ESTUDO</div>
      </div>
    </div>
    <footer className="relative mt-3 flex shrink-0 items-end justify-between gap-3 border-t border-white/30 pt-2.5"><span className="text-[0.62rem] text-white/75">Material de revisão · {slide.chapterId}</span><span className="font-mono text-xs tabular-nums text-white/80">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></footer>
  </article>;

  return <article className={\`review-slide-card relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/15 p-4 shadow-sm sm:rounded-[1.8rem] sm:p-8 \${palette}\`} data-testid="slide-card">
    <div className="review-slide-cover__ring review-slide-cover__ring--inner" aria-hidden="true" />
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex shrink-0 items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center border border-white/30 bg-white/10 font-mono text-sm font-black sm:h-14 sm:w-14 sm:text-lg">{String(index + 1).padStart(2, '0')}</div>
        <div className="min-w-0 flex-1"><p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/70">{slide.eyebrow}</p><h2 className="mt-1 font-display text-xl font-semibold leading-tight sm:mt-2 sm:text-3xl">{slide.title}</h2></div>
      </header>
      <div className="relative mt-3 flex min-h-0 flex-1 flex-col gap-3 sm:mt-5 sm:grid sm:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] sm:items-center sm:gap-6">
        <div className="review-slide-copy min-h-0 flex-1 whitespace-pre-line break-words text-[clamp(.98rem,2.45vh,1.28rem)] leading-[1.45] sm:text-lg sm:leading-[1.6]" data-testid="review-slide-copy">{slide.body}</div>
        <SlideVisual slide={slide} />
      </div>
    </div>
    <footer className="relative mt-3 flex shrink-0 items-end justify-between gap-3 border-t border-white/30 pt-2.5"><span className="text-[0.62rem] font-bold uppercase tracking-wider text-white/75">Crônicas do Conhecimento</span><span className="font-mono text-xs tabular-nums text-white/80">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></footer>
  </article>;
}

export function ReviewSlidesPage() {
  const [chapterId, setChapterId] = useState(chapters[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const chapter = getChapter(chapterId);
  const slides = useMemo(() => chapter ? buildReviewSlides(chapter) : [], [chapter]);
  const current = slides[Math.min(index, Math.max(0, slides.length - 1))];
  const windowStart = Math.max(0, Math.min(index - 2, slides.length - 5));
  const visibleDots = slides.slice(windowStart, windowStart + 5);

  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, []);

  if (!chapter || !current) return <p>Não foi possível carregar as lâminas de revisão deste capítulo.</p>;
  const previous = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));
  const changeChapter = (id: string) => { setChapterId(id); setIndex(0); };

  return createPortal((
    <div
      className="review-slides-fullscreen fixed inset-0 z-[90] h-[100dvh] max-h-[100dvh] w-screen overflow-hidden bg-bg p-3 text-ink sm:p-5"
      data-testid="review-slides-fullscreen"
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && /^(INPUT|SELECT|BUTTON|A)$/.test(event.target.tagName)) return;
        if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      }}
    >
      <style>{'@media print { body { background: white !important; color: black !important; } .review-slides-controls, .review-slides-live, header, nav { display: none !important; } .review-slides-fullscreen { position: static !important; width: auto !important; height: auto !important; max-height: none !important; overflow: visible !important; padding: 0 !important; } main { display: block !important; height: auto !important; max-width: none !important; padding: 0 !important; overflow: visible !important; } .review-slide-print { display: block !important; } .review-slide-print article { min-height: 95vh !important; height: 95vh !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; break-after: page; page-break-after: always; color: black !important; background: white !important; } }'}</style>

      <header className="review-slides-controls absolute left-3 right-3 top-[max(0.6rem,env(safe-area-inset-top))] z-30 mx-auto flex max-w-5xl items-center gap-2 sm:left-5 sm:right-5 sm:top-4 sm:gap-3">
        <div className="min-w-[5.4rem] shrink-0">
          <h1 className="text-xs font-semibold leading-tight sm:text-base">Slides de revisão</h1>
          <p className="mt-0.5 text-[0.62rem] tabular-nums text-muted sm:text-xs">{index + 1} / {slides.length}</p>
        </div>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Capítulo</span>
          <select className="input h-10 w-full min-w-0 truncate px-2 py-1 text-xs sm:text-sm" value={chapterId} onChange={(e) => changeChapter(e.target.value)}>
            {chapters.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </label>
        <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface" onClick={() => window.print()} aria-label="Imprimir ou salvar como PDF" title="Imprimir / Salvar como PDF">
          <Icon name="pergaminho" size={17} />
        </button>
        <Link to={'/capitulo/' + chapter.id} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface" aria-label="Abrir capítulo completo" title="Abrir capítulo completo">
          <Icon name="livro" size={17} />
        </Link>
      </header>

      <main
        className="review-slides-live absolute inset-x-3 min-h-0 sm:inset-x-5"
        style={{ top: 'max(4.5rem, calc(env(safe-area-inset-top) + 3.5rem))', bottom: 'max(4.9rem, calc(env(safe-area-inset-bottom) + 3.9rem))' }}
        aria-label="Lâmina atual; deslize para os lados para navegar"
      >
        <div
          className="h-full min-h-0 w-full select-none"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(event) => { dragStart.current = { x: event.clientX, y: event.clientY }; }}
          onPointerUp={(event) => {
            const start = dragStart.current;
            dragStart.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
            if (dx < 0) next(); else previous();
          }}
          onPointerCancel={() => { dragStart.current = null; }}
          data-testid="review-slide-swipe-area"
        >
          <SlideCard slide={current} index={index} total={slides.length} />
        </div>
      </main>

      <footer className="review-slides-controls absolute bottom-[max(0.45rem,env(safe-area-inset-bottom))] left-3 right-3 z-30 mx-auto max-w-5xl sm:bottom-3 sm:left-5 sm:right-5">
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-raised" aria-label="Progresso dos slides">
            <div className="h-full rounded-full bg-[#c8402a] transition-all duration-300" style={{ width: (((index + 1) / slides.length) * 100) + '%' }} />
          </div>
          <span className="font-mono text-[0.62rem] tabular-nums text-muted">{Math.round(((index + 1) / slides.length) * 100)}%</span>
        </div>
        <div className="mt-1.5 flex items-center justify-center gap-2" aria-label="Ir diretamente para um slide">
          {visibleDots.map((slide, i) => {
            const slideIndex = windowStart + i;
            return <button key={slide.id} type="button" aria-label={'Ir para slide ' + (slideIndex + 1) + ': ' + slide.title} aria-current={slideIndex === index ? 'step' : undefined} onClick={() => setIndex(slideIndex)}
              className={'h-1.5 rounded-full transition-all ' + (slideIndex === index ? 'w-7 bg-[#c8402a]' : 'w-1.5 bg-line hover:bg-[#2e7182]')} />;
          })}
        </div>
        <p className="mt-1 text-center text-[0.58rem] leading-tight text-muted">Deslize para a esquerda ou direita para mudar de lâmina</p>
      </footer>

      <div className="review-slide-print hidden">
        {slides.map((slide, i) => <SlideCard key={slide.id} slide={slide} index={i} total={slides.length} />)}
      </div>
    </div>
  ), document.body);
}
