import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { chapters, getChapter } from '@/content';
import type { Chapter } from '@/content/types';
import { Icon } from '@/components/Icon';

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
      body: paragraphs.slice(0, 3).join('\n\n').slice(0, 560) || 'Abra o capítulo completo para revisar este trecho.',
      chapterId: chapter.id, sectionId: section.id,
    });
  }
  for (const item of chapter.glossary) {
    slides.push({
      id: chapter.id + ':termo:' + item.term, kind: 'glossary', title: item.term,
      eyebrow: 'Conceito-chave', body: item.definition.length > 520 ? item.definition.slice(0, 500).replace(/\s+\S*$/, '') + '…' : item.definition, chapterId: chapter.id,
    });
  }
  if (chapter.references.length) {
    slides.push({
      id: chapter.id + ':fontes', kind: 'references', title: 'Fontes e aprofundamento',
      eyebrow: 'Confira as referências do capítulo',
      body: chapter.references.slice(0, 5).map((ref) => ref.title + '\n' + ref.detail).join('\n\n').slice(0, 620), chapterId: chapter.id,
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
  const palettes: Record<ReviewSlide['kind'], string> = {
    cover: 'bg-[#173e49] text-white',
    section: 'bg-surface text-ink',
    glossary: 'bg-[#f0e3bd] text-[#3b2c12]',
    references: 'bg-[#d6e7e6] text-[#172e34]',
    closing: 'bg-[#f3d7ca] text-[#3a211c]',
  };
  return (
    <article
      className={`review-slide-card relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.35rem] border border-line/70 p-4 shadow-sm sm:rounded-[1.8rem] sm:p-8 ${palettes[slide.kind]}`}
      data-testid="slide-card"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rotate-12 rounded-3xl border-[14px] border-[#c8402a]/15" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border-[10px] border-[#2e7182]/15" aria-hidden="true" />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <p className={`text-[0.62rem] font-bold uppercase tracking-[0.13em] ${slide.kind === 'cover' ? 'text-[#f4bd7b]' : 'text-[#2e7182]'}`}>{slide.eyebrow}</p>
        <h2 className="mt-2 max-h-[26%] overflow-hidden font-display text-xl font-semibold leading-tight sm:mt-3 sm:text-3xl">{slide.title}</h2>
        {slide.kind === 'cover' ? (
          <p className="mt-3 max-h-[44%] overflow-hidden text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-lg">{slide.body}</p>
        ) : slide.kind === 'glossary' ? (
          <p className="mt-4 min-h-0 flex-1 overflow-hidden text-sm leading-relaxed sm:mt-6 sm:text-lg sm:leading-7">{slide.body}</p>
        ) : (
          <div className="mt-3 min-h-0 flex-1 overflow-hidden whitespace-pre-line text-[0.8rem] leading-[1.35rem] sm:mt-5 sm:text-base sm:leading-7">{slide.body}</div>
        )}
      </div>
      <div className={`relative mt-3 flex shrink-0 items-end justify-between gap-3 border-t pt-2.5 ${slide.kind === 'cover' ? 'border-white/25' : 'border-current/15'}`}>
        <span className={`text-[0.62rem] ${slide.kind === 'cover' ? 'text-white/70' : 'opacity-65'}`}>Crônicas do Conhecimento</span>
        <span className="font-mono text-xs tabular-nums opacity-70">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </article>
  );
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

  return (
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
  );
}
