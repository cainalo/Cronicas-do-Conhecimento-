// Leitor em forma de livro: páginas que viram (sem rolagem vertical). A página é montada a partir da
// altura real da tela; arrastar para o lado, tocar nas bordas ou usar as setas vira a página.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { useFx } from '@/app/fx';
import { getChapter, getGrimoire, getSectionExtras } from '@/content';
import { chapterBlocks, paginate, type BookBlock } from '@/lib/book';
import { markSectionRead, setLastSection, toggleBookmark } from '@/lib/study';
import { practiceDone, practiceId } from '@/lib/practice';
import { roman } from '@/lib/roman';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { Mascot } from '@/components/Mascot';
import { SceneArt } from '@/components/SceneBanner';
import { LeatherBook, Leaf } from '@/components/LeatherBook';
import { reviewLabel } from './Library';

export function Pegadinha({ item }: { item: { statement: string; answer: boolean; why: string } }) {
  const [pick, setPick] = useState<boolean>();
  const { sfx } = useFx();
  const done = pick !== undefined;
  const ok = pick === item.answer;
  return (
    <li className={`rounded-2xl border p-3 transition ${done ? (ok ? 'border-ok/50 bg-ok/10' : 'border-bad/50 bg-bad/10') : 'border-line bg-raised/60'}`}>
      <p className="text-[0.95em] leading-snug">{item.statement}</p>
      {!done ? (
        <div className="mt-2 flex gap-2">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              className="flex-1 rounded-full border-2 border-line bg-surface px-3 py-1.5 text-sm font-semibold transition active:scale-95"
              onClick={() => {
                setPick(v);
                sfx(v === item.answer ? 'ok' : 'bad');
              }}
            >
              {v ? 'Verdadeiro' : 'Falso'}
            </button>
          ))}
        </div>
      ) : (
        <p className={`pop mt-2 text-sm ${ok ? 'text-ok' : 'text-bad'}`}>
          <b>{ok ? 'Isso!' : 'Quase.'}</b> É {item.answer ? 'verdadeiro' : 'falso'}. {item.why}
        </p>
      )}
    </li>
  );
}

export function SceneLines({ lines }: { lines: { who: string; text: string }[] }) {
  return (
    <div className="space-y-2">
      <div className="relative h-24 overflow-hidden rounded-2xl">
        <SceneArt scene="biblioteca" dark={false} />
      </div>
      <p className="rubric text-center font-logo text-sm font-bold">Cena</p>
      <ul className="space-y-2">
        {lines.map((l, i) => {
          const bubo = l.who.toLowerCase() === 'bubo';
          return (
            <li key={i} className={`flex items-end gap-2 ${bubo ? '' : 'flex-row-reverse'}`}>
              {bubo ? (
                <Mascot mood={i === lines.length - 1 ? 'talk' : 'idle'} size={38} />
              ) : (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#5160c4] text-xs font-bold text-white">{l.who[0]}</span>
              )}
              <span className={`rounded-2xl px-3 py-2 text-[0.92rem] leading-snug shadow-sm ${bubo ? 'rounded-bl-sm bg-surface' : 'rounded-br-sm bg-[#5160c4]/12'}`}>
                <b className="block text-[0.72rem] opacity-70">{l.who}</b>
                {l.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BlockView({ b, chapterId, measuring }: { b: BookBlock; chapterId: string; measuring?: boolean }) {
  const chapter = getChapter(chapterId)!;
  const grimoire = getGrimoire(chapter.grimoireId);
  const { data } = useStudy();
  switch (b.kind) {
    case 'cover':
      return (
        <div className="flex h-full flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-muted">{grimoire?.title}</p>
          <p className="rubric mt-4 font-logo text-lg">Capítulo {roman(chapter.number).toUpperCase()}</p>
          <h1 className="mt-2 text-[1.9rem] leading-tight">{chapter.title}</h1>
          <p className="mt-2 max-w-xs font-serif italic text-muted">{chapter.subtitle}</p>
          <div className="divider-ornament w-40" aria-hidden>
            ✠
          </div>
          <p className="text-xs text-muted">
            {chapter.sections.length} trechos · cerca de {chapter.estimatedMinutes} min · {reviewLabel[chapter.review].toLowerCase()}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted">
            Deslize ou toque na borda direita para virar <Icon name="seta" size={14} />
          </p>
        </div>
      );
    case 'scene':
      return <SceneLines lines={b.lines} />;
    case 'title':
      return (
        <div className="mb-2 pt-1">
          <p className="rubric font-logo text-sm">Trecho {roman(b.number).toUpperCase()}</p>
          <h2 className="text-[1.35rem] leading-snug">{b.title}</h2>
        </div>
      );
    case 'md':
      return (
        <div className="prose-manuscript">
          <div className={b.first ? 'illuminated' : ''}>
            <Markdown>{b.md}</Markdown>
          </div>
        </div>
      );
    case 'quiz':
      return (
        <div className="prose-manuscript !text-[0.95em]">
          <h3 className="!mt-2">Pare e pense</h3>
          <ul className="!m-0 !list-none space-y-2 !pl-0 [&>li]:before:!content-none">
            {b.items.map((it, i) => (
              <Pegadinha key={i} item={it} />
            ))}
          </ul>
        </div>
      );
    case 'end': {
      const done = practiceDone(data, chapterId, b.sectionId);
      return (
        <div className="mt-3 rounded-2xl border border-line bg-surface/80 p-3 text-center">
          <p className="text-sm font-semibold">Fim do trecho</p>
          <Link
            to={`/pratica/${chapterId}/${b.sectionId}`}
            className="btn-primary mt-2 w-full !min-h-[42px] text-sm"
            data-testid={measuring ? undefined : `praticar-${b.sectionId}`}
            tabIndex={measuring ? -1 : undefined}
          >
            <Icon name="chama" size={16} strokeWidth={2.2} /> {done ? 'Praticar de novo' : 'Praticar agora'}
          </Link>
        </div>
      );
    }
    case 'glossary':
      return (
        <div className="prose-manuscript">
          <h3 className="!mt-0">Glossário</h3>
          <dl className="space-y-2">
            {b.items.map((g) => (
              <div key={g.term}>
                <dt className="font-semibold">
                  <span className="rubric">¶</span> {g.term}
                </dt>
                <dd className="opacity-90">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case 'refs':
      return (
        <div className="prose-manuscript">
          <h3 className="!mt-0">Fontes e referências</h3>
          <ul>
            {b.items.map((r) => (
              <li key={r.title}>
                <b>{r.title}</b>. {r.detail}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function BookPage() {
  const { id = '' } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const chapter = getChapter(id);
  const { data, update } = useStudy();
  const { prefs, setPrefs } = usePrefs();
  const { sfx, confetti, toast } = useFx();
  const blocks = useMemo(() => (chapter ? chapterBlocks(chapter, (sid) => getSectionExtras(chapter.id, sid)) : []), [chapter]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [pages, setPages] = useState<number[][]>(() => paginate(blocks, [], Infinity));
  const [page, setPage] = useState(0);
  const [toc, setToc] = useState(false);
  const [query, setQuery] = useState('');
  const placed = useRef<string | null>(null);

  // Tamanho útil da página.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mede cada bloco e monta as páginas.
  useLayoutEffect(() => {
    const m = measureRef.current;
    if (!m) return;
    const heights = Array.from(m.children).map((c) => (c as HTMLElement).offsetHeight + 12);
    const next = paginate(blocks, heights, size.h > 80 ? size.h : Infinity);
    setPages(next);
  }, [blocks, size.w, size.h, prefs.fontScale]);

  const pageOfBlock = (bi: number) => Math.max(0, pages.findIndex((p) => p.includes(bi)));
  const pageOfSection = (sid: string) => pageOfBlock(blocks.findIndex((b) => 'sectionId' in b && b.sectionId === sid));

  // Posição inicial: âncora pedida, última seção lida ou capa.
  useEffect(() => {
    if (!chapter) return;
    const target = hash.slice(1) || data.reading[chapter.id]?.lastSectionId || '';
    const key = `${chapter.id}#${target}#${pages.length}`;
    if (placed.current === key) return;
    placed.current = key;
    if (target && chapter.sections.some((s) => s.id === target)) setPage(pageOfSection(target));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.id, hash, pages.length]);

  const cur = pages[Math.min(page, pages.length - 1)] ?? [];
  const curSection = (() => {
    for (const bi of cur) {
      const b = blocks[bi];
      if ('sectionId' in b) return b.sectionId;
    }
    return undefined;
  })();

  // Ao chegar ao fim de um trecho, ele é marcado como lido; a seção atual vira ponto de retomada.
  useEffect(() => {
    if (!chapter) return;
    if (curSection) update((d) => setLastSection(d, chapter.id, curSection));
    for (const bi of cur) {
      const b = blocks[bi];
      if (b.kind === 'end' && !data.reading[chapter.id]?.sectionsRead.includes(b.sectionId)) {
        const r = markSectionRead(data, chapter, b.sectionId);
        update((d) => markSectionRead(d, chapter, b.sectionId).data);
        sfx(r.xp ? 'done' : 'ok');
        if (r.xp) {
          confetti(80);
          toast({ text: 'Capítulo lido!', sub: `+${r.xp.amount} XP`, icon: 'grimorio', color: '#3b6fb0' });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages]);

  if (!chapter) return <p>Capítulo não encontrado.</p>;

  const total = pages.length;

  const bookmarked = curSection ? data.bookmarks.some((b) => b.chapterId === chapter.id && b.sectionId === curSection) : false;
  const results =
    query.trim().length >= 2
      ? blocks
          .map((b, i) => ({ b, i }))
          .filter(({ b }) => b.kind === 'md' && b.md.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 8)
      : [];

  const renderPage = (pi: number) => (
    <Leaf
      head={
        <>
          <span className="truncate">{chapter.title}</span>
          <span className="shrink-0">Cap. {roman(chapter.number).toUpperCase()}</span>
        </>
      }
      folio={`fol. ${roman(pi + 1)}`}
    >
      <div className="space-y-3">
        {(pages[pi] ?? []).map((bi) => (
          <div key={bi}>
            <BlockView b={blocks[bi]} chapterId={chapter.id} />
          </div>
        ))}
      </div>
    </Leaf>
  );

  return (
    <div className="-mt-2 flex h-[calc(100dvh-5.5rem-env(safe-area-inset-top))] flex-col" style={{ ['--font-scale' as string]: prefs.fontScale }}>
      {/* Barra do livro */}
      <div className="mb-2 flex shrink-0 items-center gap-1.5">
        <button className="btn-ghost !min-h-[38px] !px-3 !py-1 text-sm" onClick={() => setToc(true)} aria-label="Sumário">
          <Icon name="sumario" size={18} /> Sumário
        </button>
        <span className="flex-1 px-1">
          <span className="meter block !h-1.5">
            <span style={{ width: `${((page + 1) / Math.max(1, total)) * 100}%`, background: '#3b6fb0' }} />
          </span>
          <span className="mt-0.5 block text-center text-[0.65rem] text-muted">
            página {page + 1} de {total}
          </span>
        </span>
        <button className="btn-ghost !min-h-[38px] !px-2.5 !py-1 text-sm" aria-label="Diminuir fonte" onClick={() => setPrefs({ fontScale: Math.max(0.85, +(prefs.fontScale - 0.1).toFixed(2)) })}>
          A−
        </button>
        <button className="btn-ghost !min-h-[38px] !px-2.5 !py-1 text-sm" aria-label="Aumentar fonte" onClick={() => setPrefs({ fontScale: Math.min(1.4, +(prefs.fontScale + 0.1).toFixed(2)) })}>
          A+
        </button>
        {curSection && (
          <button
            className="btn-ghost !min-h-[38px] !px-2.5 !py-1"
            aria-label={bookmarked ? 'Remover marcador' : 'Adicionar marcador'}
            aria-pressed={bookmarked}
            onClick={() => update((d) => toggleBookmark(d, chapter.id, curSection))}
          >
            <Icon name={bookmarked ? 'fitaCheia' : 'fita'} size={18} className={bookmarked ? 'text-ember' : ''} />
          </button>
        )}
      </div>

      {/* O livro */}
      <LeatherBook
        page={Math.min(page, total - 1)}
        total={total}
        onPage={setPage}
        render={renderPage}
        overlay={
          <>
            {/* Medidor invisível: mesma largura do corpo da página */}
            <div ref={measureRef} aria-hidden="true" className="book-page pointer-events-none invisible absolute left-0 top-0 -z-10 space-y-0 px-5" style={{ width: size.w ? size.w + 40 : undefined }}>
              {blocks.map((b, i) => (
                <div key={i} style={{ width: size.w || undefined }}>
                  <BlockView b={b} chapterId={chapter.id} measuring />
                </div>
              ))}
            </div>
            {/* Corpo de referência para a altura útil */}
            <div className="pointer-events-none absolute inset-x-5 bottom-[1.6rem] top-[2.6rem]" ref={bodyRef} aria-hidden="true" />
          </>
        }
        last={
          <button className="btn-primary !min-h-[44px] flex-1 text-sm" onClick={() => navigate(`/grimorio/${chapter.grimoireId}`)}>
            Voltar à trilha
          </button>
        }
      />

      {/* Sumário */}
      {toc && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" onClick={() => setToc(false)}>
          <nav className="anim-toast-in max-h-[80dvh] w-full max-w-md overflow-y-auto rounded-[1.8rem] bg-bg p-4 shadow-2xl" aria-label="Sumário do capítulo" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg">Sumário</h2>
              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-raised" onClick={() => setToc(false)} aria-label="Fechar sumário">
                <Icon name="errado" size={18} />
              </button>
            </div>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no capítulo…" className="input mb-3" />
            {query.trim().length >= 2 && (
              <ul className="mb-3 space-y-2 text-sm">
                {results.length === 0 && <li className="text-muted">Nada encontrado.</li>}
                {results.map(({ b, i }) => {
                  const sid = 'sectionId' in b ? b.sectionId : '';
                  const s = chapter.sections.find((x) => x.id === sid);
                  const md = b.kind === 'md' ? b.md : '';
                  const at = md.toLowerCase().indexOf(query.trim().toLowerCase());
                  return (
                    <li key={i}>
                      <button
                        className="w-full rounded-xl p-2 text-left hover:bg-raised"
                        onClick={() => {
                          setToc(false);
                          setPage(pageOfBlock(i));
                        }}
                      >
                        <b className="rubric">{s?.title}</b> <span className="text-muted">· pág. {pageOfBlock(i) + 1}</span>
                        <span className="block text-muted">…{md.replace(/[#*_`>|]/g, ' ').slice(Math.max(0, at - 40), at + 70)}…</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <ol className="space-y-1">
              {chapter.sections.map((s) => {
                const read = data.reading[chapter.id]?.sectionsRead.includes(s.id);
                const prat = !!data.lessons[practiceId(chapter.id, s.id)];
                return (
                  <li key={s.id}>
                    <button
                      className="flex w-full items-center gap-2 rounded-xl p-2 text-left hover:bg-raised"
                      onClick={() => {
                        setToc(false);
                        setPage(pageOfSection(s.id));
                      }}
                    >
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${read ? 'border-ok bg-ok text-white' : 'border-line'}`}>{read && <Icon name="certo" size={13} strokeWidth={2.6} />}</span>
                      <span className="flex-1">{s.title}</span>
                      <span className="text-xs text-muted">{prat ? 'praticado' : `pág. ${pageOfSection(s.id) + 1}`}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  className="w-full rounded-xl p-2 text-left text-muted hover:bg-raised"
                  onClick={() => {
                    setToc(false);
                    setPage(pageOfBlock(blocks.findIndex((b) => b.kind === 'glossary')));
                  }}
                >
                  Glossário e referências
                </button>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </div>
  );
}
