import { useEffect, useState } from 'react';
import { getChapter } from '@/content';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { Portal } from '@/components/Portal';

type ReferenceMode = 'inline' | 'drawer';

export function ReferenceText({
  chapterId,
  sectionId,
  mode = 'inline',
  defaultOpen = true,
}: {
  chapterId: string;
  sectionId: string;
  mode?: ReferenceMode;
  defaultOpen?: boolean;
}) {
  const chapter = getChapter(chapterId);
  const section = chapter?.sections.find((item) => item.id === sectionId);
  const [open, setOpen] = useState(false);
  const [inlineOpen, setInlineOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!open || mode !== 'drawer') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, mode]);

  if (!chapter || !section || !section.body.trim()) return null;

  const title = section.title.replace(/^\d+\.\s*/, '');
  const body = (
    <div className="prose-content learn-text reference-reading">
      <Markdown>{section.body}</Markdown>
    </div>
  );

  if (mode === 'inline') {
    return (
      <details
        className="reference-text card mb-6 overflow-hidden"
        open={inlineOpen}
        onToggle={(event) => setInlineOpen(event.currentTarget.open)}
        data-testid="learn-reference-text"
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 sm:px-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
            <Icon name="livro" size={19} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">Texto completo de referência</span>
            <span className="mt-0.5 block text-sm text-muted">{title}</span>
          </span>
          <Icon name="seta" size={17} className="reference-text-chevron shrink-0 text-muted" />
        </summary>
        <div className="reference-text-body border-t border-line px-4 py-4 sm:px-5 sm:py-5">
          {body}
        </div>
      </details>
    );
  }

  return (
    <>
      <button
        type="button"
        className="flex h-10 w-12 shrink-0 flex-col items-center justify-center gap-0 rounded-lg text-muted transition hover:bg-raised hover:text-ink"
        onClick={() => setOpen(true)}
        aria-label="Abrir texto completo de referência"
        title="Ler o texto completo de referência"
      >
        <Icon name="livro" size={17} />
        <span className="text-[9px] font-semibold leading-tight">Texto</span>
      </button>
      {open && (
        <Portal>
          <div className="reference-drawer-overlay fixed inset-0 z-[100] overflow-y-auto bg-black/50 p-3 sm:p-6" onClick={() => setOpen(false)}>
            <section
              role="dialog"
              aria-modal="true"
              aria-label={"Texto completo de referência: " + title}
              className="reference-drawer-panel mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="sticky top-0 z-10 flex items-start gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur sm:px-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                  <Icon name="livro" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="kicker">Material de referência</p>
                  <h2 className="mt-0.5 text-lg leading-snug">{title}</h2>
                </div>
                <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => setOpen(false)} aria-label="Fechar texto de referência">
                  <Icon name="errado" size={20} />
                </button>
              </header>
              <div className="reference-text-body px-4 py-5 sm:px-6 sm:py-6">
                <p className="mb-4 text-sm text-muted">Leitura integral do material desta seção, incluindo as observações de revisão e os termos em destaque.</p>
                {body}
              </div>
            </section>
          </div>
        </Portal>
      )}
    </>
  );
}
