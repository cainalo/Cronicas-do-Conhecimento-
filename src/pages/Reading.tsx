// Material de referência em leitura vertical, responsiva e acessível. Sem capa física, fólio ou virada de página.
import { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { getChapter } from '@/content';
import { readingBlocks, type ReadingBlock } from '@/lib/reading-content';
import { markSectionRead } from '@/lib/study';
import { practiceDone } from '@/lib/practice';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { TrueFalseCheck } from '@/components/TrueFalseCheck';

function ReadingBlockView({ b, chapterId }: { b: ReadingBlock; chapterId: string }) {
  const { data } = useStudy();
  switch (b.kind) {
    case 'title':
      return (
        <header className="border-l-4 border-azure pl-4 py-1">
          <p className="kicker">Seção {b.number}</p>
          <h2 className="mt-1 text-[1.45rem] leading-snug">{b.title}</h2>
        </header>
      );
    case 'md':
      return (
        <div className="prose-content learn-text max-w-none">
          <Markdown>{b.md}</Markdown>
        </div>
      );
    case 'quiz':
      return (
        <section className="rounded-2xl border border-line bg-raised/35 p-4" aria-label="Verificação de compreensão">
          <h3 className="mb-3 text-lg font-semibold">Verifique sua compreensão</h3>
          <ul className="!m-0 !list-none space-y-2 !pl-0 [&>li]:before:!content-none">
            {b.items.map((item, i) => <TrueFalseCheck key={i} item={item} />)}
          </ul>
        </section>
      );
    case 'end': {
      const done = practiceDone(data, chapterId, b.sectionId);
      return (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-4" aria-label="Prática da seção">
          <div>
            <p className="font-semibold">Final desta seção</p>
            <p className="mt-1 text-sm text-muted">Faça exercícios para consolidar o conteúdo.</p>
          </div>
          <Link to={`/pratica/${chapterId}/${b.sectionId}`} className="btn-primary min-h-[42px]">
            <Icon name="play" size={17} /> {done ? 'Praticar novamente' : 'Praticar agora'}
          </Link>
        </section>
      );
    }
    case 'glossary':
      return (
        <section className="rounded-2xl border border-line p-4">
          <h3 className="mb-3 text-xl">Glossário</h3>
          <dl className="grid gap-3 sm:grid-cols-2">
            {b.items.map((item) => (
              <div key={item.term} className="rounded-xl bg-raised/45 p-3">
                <dt className="font-semibold">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case 'refs':
      return (
        <section className="border-t border-line pt-4">
          <h3 className="mb-3 text-xl">Fontes e referências</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {b.items.map((item) => <li key={item.title}><b>{item.title}.</b> {item.detail}</li>)}
          </ul>
        </section>
      );
  }
}

/** Conteúdo integral numa coluna rolável; chegar ao fim de uma seção registra a leitura. */
function ContinuousReading({ blocks, chapterId, onEnd }: { blocks: ReadingBlock[]; chapterId: string; onEnd: (sectionId: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = (entry.target as HTMLElement).dataset.end;
          if (sectionId) endRef.current(sectionId);
        }
      }),
      { root: null, threshold: 0.1 },
    );
    root.querySelectorAll('[data-end]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [blocks]);

  return (
    <article ref={ref} className="mx-auto w-full max-w-3xl space-y-6" aria-label="Material de referência">
      {blocks.map((block, index) => (
        <div
          key={index}
          id={block.kind === 'title' ? block.sectionId : undefined}
          data-end={block.kind === 'end' ? block.sectionId : undefined}
          className={block.kind === 'title' ? 'scroll-mt-24' : undefined}
        >
          <ReadingBlockView b={block} chapterId={chapterId} />
        </div>
      ))}
    </article>
  );
}

export function ReadingPage() {
  const { id = '' } = useParams();
  const { hash } = useLocation();
  const chapter = getChapter(id);
  const { data, update } = useStudy();
  const { sfx, confetti, toast } = useFx();
  const blocks = useMemo(() => chapter ? readingBlocks(chapter) : [], [chapter]);

  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => {
      const targetId = decodeURIComponent(hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [hash, blocks]);

  if (!chapter) return <p>Material não encontrado.</p>;

  const onEnd = (sectionId: string) => {
    if (data.reading[chapter.id]?.sectionsRead.includes(sectionId)) return;
    const result = markSectionRead(data, chapter, sectionId);
    update((current) => markSectionRead(current, chapter, sectionId).data);
    sfx('done');
    if (result.xp) {
      confetti(60);
      toast({ text: 'Seção estudada', sub: `+${result.xp.amount} pontos`, icon: 'certo', color: '#2c5f6e' });
    }
  };
  const firstSectionId = chapter.sections[0]?.id;

  return (
    <div className="space-y-5 pb-8">
      <PageHeader area="explorar" title={chapter.title} subtitle={chapter.subtitle} />
      <section className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="kicker">Material de referência</p>
          <p className="mt-1 text-sm text-muted">{chapter.sections.length} seções · cerca de {chapter.estimatedMinutes} minutos · {chapter.review === 'validado-tecnicamente' ? 'validado tecnicamente' : chapter.review === 'revisado-editorialmente' ? 'revisado editorialmente' : chapter.review === 'pendente-atualizacao' ? 'atualização pendente' : 'revisão especializada pendente'}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {firstSectionId && <Link to={`/aprender/${chapter.id}/${firstSectionId}`} className="btn-primary min-h-[42px]">Estudar este trecho <Icon name="avancar" size={17} /></Link>}
          <Link to="/trilha" className="btn-ghost min-h-[42px]">Voltar à trilha</Link>
        </div>
      </section>

      <nav className="rounded-2xl border border-line bg-surface p-3 sm:p-4" aria-label="Seções do material">
        <p className="mb-2 text-sm font-semibold">Ir direto para uma seção</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {chapter.sections.map((section, index) => (
            <Link key={section.id} to={`/capitulo/${chapter.id}#${section.id}`} className="flex min-h-11 items-center gap-3 rounded-xl bg-raised/45 px-3 py-2 text-sm transition hover:bg-raised">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-azure/10 text-xs font-bold text-azure">{index + 1}</span>
              <span className="min-w-0 flex-1">{section.title.replace(/^\d+\.\s*/, '')}</span>
              <Icon name="avancar" size={15} className="shrink-0 text-muted" />
            </Link>
          ))}
        </div>
      </nav>

      <ContinuousReading blocks={blocks} chapterId={chapter.id} onEnd={onEnd} />
    </div>
  );
}
