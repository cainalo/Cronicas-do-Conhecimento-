import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { getChapter, getGrimoire, getLesson } from '@/content';
import { Markdown } from '@/components/Markdown';
import { markSectionRead, setLastSection, toggleBookmark } from '@/lib/study';
import { reviewLabel } from './Library';

function stripMd(s: string) {
  return s.replace(/[#*_`>|]/g, ' ').replace(/\s+/g, ' ');
}

export function ReaderPage() {
  const { id = '' } = useParams();
  const { hash } = useLocation();
  const chapter = getChapter(id);
  const { data, update } = useStudy();
  const { prefs, setPrefs } = usePrefs();
  const [tocOpen, setTocOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<string>();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Retomada: vai para a âncora pedida ou para a última seção registrada.
  useEffect(() => {
    if (!chapter) return;
    const target = hash.slice(1) || data.reading[chapter.id]?.lastSectionId;
    if (target) requestAnimationFrame(() => sectionRefs.current[target]?.scrollIntoView({ block: 'start' }));
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.id, hash]);

  // Registra a seção visível como ponto de retomada.
  useEffect(() => {
    if (!chapter) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const sid = vis?.target.getAttribute('data-section');
        if (sid) update((d) => setLastSection(d, chapter.id, sid));
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [chapter, update]);

  const results = useMemo(() => {
    if (!chapter || query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    return chapter.sections.flatMap((s) => {
      const text = stripMd(s.body);
      const i = text.toLowerCase().indexOf(q);
      if (i < 0) return [];
      const count = text.toLowerCase().split(q).length - 1;
      return [{ s, count, snippet: '…' + text.slice(Math.max(0, i - 50), i + q.length + 60) + '…' }];
    });
  }, [chapter, query]);

  if (!chapter) return <p>Capítulo não encontrado.</p>;
  const grimoire = getGrimoire(chapter.grimoireId);
  const rp = data.reading[chapter.id];
  const isBookmarked = (sid: string) => data.bookmarks.some((b) => b.chapterId === chapter.id && b.sectionId === sid);
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(undefined), 2500);
  };
  const go = (sid: string) => {
    setTocOpen(false);
    sectionRefs.current[sid]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ ['--font-scale' as string]: prefs.fontScale }}>
      {/* Barra do leitor */}
      <div className="sticky top-12 z-10 -mx-4 mb-3 flex items-center gap-2 border-b border-line bg-bg/95 px-4 py-2 backdrop-blur">
        <button className="btn-ghost px-3 py-2" onClick={() => setTocOpen((v) => !v)} aria-expanded={tocOpen}>
          ☰ Sumário
        </button>
        <span className="flex-1 truncate text-center text-xs text-muted">
          {rp?.sectionsRead.length ?? 0}/{chapter.sections.length} lidas
        </span>
        <button className="btn-ghost px-3 py-2" aria-label="Diminuir fonte" onClick={() => setPrefs({ fontScale: Math.max(0.85, +(prefs.fontScale - 0.1).toFixed(2)) })}>
          A−
        </button>
        <button className="btn-ghost px-3 py-2" aria-label="Aumentar fonte" onClick={() => setPrefs({ fontScale: Math.min(1.5, +(prefs.fontScale + 0.1).toFixed(2)) })}>
          A+
        </button>
        <button className="btn-ghost px-3 py-2" aria-label="Alternar tema" onClick={() => setPrefs({ theme: prefs.theme === 'dark' ? 'light' : 'dark' })}>
          {prefs.theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      {tocOpen && (
        <nav className="card mb-4 p-4" aria-label="Sumário do capítulo">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no capítulo…"
            className="mb-3 w-full rounded-lg border border-line bg-raised px-3 py-2 text-ink placeholder:text-muted"
          />
          {query.trim().length >= 2 && (
            <ul className="mb-3 space-y-2 text-sm">
              {results.length === 0 && <li className="text-muted">Nada encontrado.</li>}
              {results.map((r) => (
                <li key={r.s.id}>
                  <button className="text-left" onClick={() => go(r.s.id)}>
                    <b className="text-gold">{r.s.title}</b> <span className="text-muted">({r.count})</span>
                    <span className="block text-muted">{r.snippet}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <ol className="space-y-1">
            {chapter.sections.map((s) => (
              <li key={s.id}>
                <button className="flex w-full items-center gap-2 py-1 text-left" onClick={() => go(s.id)}>
                  <span className={rp?.sectionsRead.includes(s.id) ? 'text-ok' : 'text-muted'}>{rp?.sectionsRead.includes(s.id) ? '✓' : '○'}</span>
                  <span className="flex-1">{s.title}</span>
                  {isBookmarked(s.id) && <span aria-label="marcada">🔖</span>}
                </button>
              </li>
            ))}
            <li>
              <button className="py-1 text-left text-muted" onClick={() => go('glossario')}>
                Glossário e referências
              </button>
            </li>
          </ol>
        </nav>
      )}

      <article className="manuscript rounded-lg px-5 py-6 sm:px-8">
        <header className="mb-6 text-center">
          <Link to={`/grimorio/${chapter.grimoireId}`} className="text-xs uppercase tracking-widest opacity-70">
            {grimoire?.title}
          </Link>
          <p className="mt-2 font-display text-sm opacity-70">Capítulo {chapter.number}</p>
          <h1 className="text-2xl text-gold">{chapter.title}</h1>
          <p className="mt-1 italic opacity-80">{chapter.subtitle}</p>
          <p className="mt-3 text-xs opacity-60">
            ~{chapter.estimatedMinutes} min · {reviewLabel[chapter.review]} · Texto autoral
          </p>
        </header>

        {chapter.sections.map((s, idx) => {
          const read = rp?.sectionsRead.includes(s.id);
          return (
            <section
              key={s.id}
              id={s.id}
              data-section={s.id}
              ref={(el) => {
                sectionRefs.current[s.id] = el;
              }}
              className="scroll-mt-28"
            >
              {idx > 0 && <div className="divider-ornament" aria-hidden>✦</div>}
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-lg text-gold">{s.title}</h2>
                <button
                  className="text-xl"
                  aria-label={isBookmarked(s.id) ? 'Remover marcador' : 'Adicionar marcador'}
                  aria-pressed={isBookmarked(s.id)}
                  onClick={() => update((d) => toggleBookmark(d, chapter.id, s.id))}
                >
                  {isBookmarked(s.id) ? '🔖' : '🏷️'}
                </button>
              </div>
              <div className="prose-manuscript">
                <div className="illuminated">
                  <Markdown highlightTerm={query.trim()}>{s.body}</Markdown>
                </div>
              </div>
              <button
                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm ${read ? 'border-ok/50 text-ok' : 'border-gold/50 text-gold'}`}
                disabled={read}
                onClick={() =>
                  update((d) => {
                    const r = markSectionRead(d, chapter, s.id);
                    if (r.xp) flash(`Capítulo concluído! +${r.xp.amount} XP`);
                    return r.data;
                  })
                }
              >
                {read ? '✓ Seção lida' : 'Marcar seção como lida'}
              </button>
            </section>
          );
        })}

        <div className="divider-ornament" aria-hidden>
          ✦ ✦ ✦
        </div>
        <section id="glossario" ref={(el) => (sectionRefs.current.glossario = el)} className="prose-manuscript scroll-mt-28">
          <h2 className="mb-3 text-lg text-gold">Glossário</h2>
          <dl className="space-y-2">
            {chapter.glossary.map((g) => (
              <div key={g.term}>
                <dt className="font-semibold">{g.term}</dt>
                <dd className="opacity-90">{g.definition}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mb-3 mt-6 text-lg text-gold">Referências</h2>
          <ul>
            {chapter.references.map((r) => (
              <li key={r.title}>
                <b>{r.title}</b> — {r.detail}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section className="mt-5 space-y-2">
        <h2 className="text-base">Pratique este capítulo</h2>
        {chapter.lessonIds.map((lid) => {
          const l = getLesson(lid)!;
          const done = data.lessons[lid];
          return (
            <Link key={lid} to={`/licao/${lid}`} className="card flex items-center justify-between p-4 hover:bg-raised">
              <span>
                <span className="block">{l.title}</span>
                <span className="text-xs text-muted">{l.questionIds.length} questões</span>
              </span>
              <span className="text-sm text-gold">{done ? `Melhor: ${done.bestScore}%` : 'Iniciar →'}</span>
            </Link>
          );
        })}
      </section>

      {toast && (
        <div role="status" className="fixed inset-x-4 bottom-24 z-30 mx-auto max-w-sm rounded-lg bg-gold px-4 py-3 text-center font-display text-bg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
