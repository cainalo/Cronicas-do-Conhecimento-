import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { getChapter, getGrimoire, getLesson } from '@/content';
import { Markdown } from '@/components/Markdown';
import { markSectionRead, setLastSection, toggleBookmark } from '@/lib/study';
import { reviewLabel } from './Library';
import { roman } from '@/lib/roman';

/** "3. Título" vira ["iii", "Título"]. */
function splitNumber(title: string): [string | null, string] {
  const m = /^(\d+)\.\s*(.*)$/.exec(title);
  return m ? [roman(Number(m[1])), m[2]] : [null, title];
}
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';
import { Mascot, SpeechBubble } from '@/components/Mascot';

function stripMd(s: string) {
  return s.replace(/[#*_`>|]/g, ' ').replace(/\s+/g, ' ');
}

export function ReaderPage() {
  const { id = '' } = useParams();
  const { hash } = useLocation();
  const chapter = getChapter(id);
  const { data, update } = useStudy();
  const { prefs, setPrefs } = usePrefs();
  const { sfx, confetti } = useFx();
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
      <div className="sticky top-14 z-10 -mx-4 -mt-5 mb-4 flex items-center gap-2 border-b border-line/30 bg-bg/80 px-4 py-2 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <button className="btn-ghost !min-h-[40px] !px-3 !py-1.5" onClick={() => setTocOpen((v) => !v)} aria-expanded={tocOpen}>
          <Icon name="sumario" size={18} /> Sumário
        </button>
        <span className="flex-1 px-1 text-center text-xs text-muted">
          <span className="block truncate">{rp?.sectionsRead.length ?? 0} de {chapter.sections.length} lidas</span>
          <span className="meter mt-1 block !h-1.5">
            <span style={{ width: `${((rp?.sectionsRead.length ?? 0) / chapter.sections.length) * 100}%` }} />
          </span>
        </span>
        <button className="btn-ghost !min-h-[40px] !px-3 !py-1.5" aria-label="Diminuir fonte" onClick={() => setPrefs({ fontScale: Math.max(0.85, +(prefs.fontScale - 0.1).toFixed(2)) })}>
          A−
        </button>
        <button className="btn-ghost !min-h-[40px] !px-3 !py-1.5" aria-label="Aumentar fonte" onClick={() => setPrefs({ fontScale: Math.min(1.5, +(prefs.fontScale + 0.1).toFixed(2)) })}>
          A+
        </button>
        <button className="btn-ghost !min-h-[40px] !px-3 !py-1.5" aria-label="Alternar tema" onClick={() => setPrefs({ theme: prefs.theme === 'dark' ? 'light' : 'dark' })}>
          <Icon name={prefs.theme === 'dark' ? 'sol' : 'lua'} size={18} />
        </button>
      </div>

      {tocOpen && (
        <nav className="card mb-4 p-4" aria-label="Sumário do capítulo">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no capítulo…"
            className="mb-3 w-full rounded-xl border border-line bg-raised px-3 py-2 text-ink placeholder:text-muted"
          />
          {query.trim().length >= 2 && (
            <ul className="mb-3 space-y-2 text-sm">
              {results.length === 0 && <li className="text-muted">Nada encontrado.</li>}
              {results.map((r) => (
                <li key={r.s.id}>
                  <button className="text-left" onClick={() => go(r.s.id)}>
                    <b className="rubric">{r.s.title}</b> <span className="text-muted">({r.count})</span>
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
                  <span className={rp?.sectionsRead.includes(s.id) ? 'text-ok' : 'text-muted'}>{rp?.sectionsRead.includes(s.id) ? <Icon name="certo" size={16} /> : <span className="inline-block w-4 text-center">·</span>}</span>
                  <span className="flex-1">{s.title}</span>
                  {isBookmarked(s.id) && <Icon name="fitaCheia" size={16} className="text-ember" aria-label="marcada" />}
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

      <article className="manuscript px-4 py-6 sm:px-8">
        <header className="mb-8 text-center">
          <Link to={`/grimorio/${chapter.grimoireId}`} className="font-display text-sm text-muted">
            {grimoire?.title}
          </Link>
          <p className="rubric mt-3 font-display text-lg">Capitulum {roman(chapter.number)}</p>
          <h1 className="mt-1 text-[2.1rem] leading-tight">{chapter.title}</h1>
          <p className="mx-auto mt-2 max-w-sm italic text-muted">{chapter.subtitle}</p>
          <p className="mt-3 text-xs text-muted">
            cerca de {chapter.estimatedMinutes} minutos · {reviewLabel[chapter.review]} · texto autoral
          </p>
          <div className="divider-ornament !mb-0" aria-hidden>
            ✠
          </div>
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
              {idx > 0 && <div className="divider-ornament" aria-hidden>❧</div>}
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-[1.35rem] leading-snug">
                  {splitNumber(s.title)[0] && <span className="rubric mr-2">{splitNumber(s.title)[0]}.</span>}
                  {splitNumber(s.title)[1]}
                </h2>
                <button
                  className="p-1"
                  aria-label={isBookmarked(s.id) ? 'Remover marcador' : 'Adicionar marcador'}
                  aria-pressed={isBookmarked(s.id)}
                  onClick={() => update((d) => toggleBookmark(d, chapter.id, s.id))}
                >
                  <Icon name={isBookmarked(s.id) ? 'fitaCheia' : 'fita'} size={22} className={isBookmarked(s.id) ? 'text-ember' : 'opacity-60'} />
                </button>
              </div>
              <div className="prose-manuscript">
                <div className={`illuminated ${idx % 2 ? 'rubra' : ''}`}>
                  <Markdown highlightTerm={query.trim()}>{s.body}</Markdown>
                </div>
              </div>
              <button
                className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full border-2 px-4 py-3 font-semibold transition active:scale-[0.98] ${read ? 'border-ok/50 bg-ok/10 text-ok' : 'border-ember/60 text-ember hover:bg-ember/10'}`}
                disabled={read}
                onClick={() => {
                  const xp = markSectionRead(data, chapter, s.id).xp;
                  update((d) => markSectionRead(d, chapter, s.id).data);
                  sfx(xp ? 'done' : 'ok');
                  if (xp) {
                    flash(`Capítulo concluído. +${xp.amount} XP`);
                    confetti(80);
                  }
                  const nextSec = chapter.sections[idx + 1];
                  if (nextSec) window.setTimeout(() => sectionRefs.current[nextSec.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 450);
                }}
              >
                <Icon name="certo" size={18} strokeWidth={2.4} className={read ? 'pop' : ''} />
                {read ? 'Seção lida' : 'Marcar seção como lida'}
              </button>
              <p className="mt-2 text-right font-display text-xs text-muted">fol. {roman(idx + 1)}</p>
            </section>
          );
        })}

        {chapter.lessonIds[0] && (
          <div className="my-6 flex items-end gap-2">
            <Mascot mood={(rp?.sectionsRead.length ?? 0) === chapter.sections.length ? 'cheer' : 'talk'} size={70} />
            <SpeechBubble className="mb-6 flex-1">
              {(rp?.sectionsRead.length ?? 0) === chapter.sections.length ? 'Capítulo lido! Hora de provar o que aprendeu.' : 'Quando terminar a leitura, a lição testa o que ficou.'}
              <Link to={`/licao/${chapter.lessonIds[0]}`} className="btn-primary mt-2 w-full !min-h-[40px] text-sm">
                <Icon name="escudo" size={16} strokeWidth={2.2} /> Fazer a lição
              </Link>
            </SpeechBubble>
          </div>
        )}
        <div className="divider-ornament" aria-hidden>
          ❧
        </div>
        <section id="glossario" ref={(el) => (sectionRefs.current.glossario = el)} className="prose-manuscript scroll-mt-28">
          <h2 className="rubric mb-3 text-xl">Glossarium</h2>
          <dl className="space-y-2">
            {chapter.glossary.map((g) => (
              <div key={g.term}>
                <dt className="font-semibold"><span className="rubric">¶</span> {g.term}</dt>
                <dd className="opacity-90">{g.definition}</dd>
              </div>
            ))}
          </dl>
          <h2 className="rubric mb-3 mt-6 text-xl">Fontes e referências</h2>
          <ul>
            {chapter.references.map((r) => (
              <li key={r.title}>
                <b>{r.title}</b>. {r.detail}
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
              <span className="rubric font-display">{done ? `Melhor: ${done.bestScore}%` : 'Iniciar'}</span>
            </Link>
          );
        })}
      </section>

      {toast && (
        <div role="status" className="fixed inset-x-4 bottom-24 z-30 mx-auto max-w-sm leather-band px-4 py-3 text-center font-display shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
