// Aprender: a porta de entrada de cada trecho, para quem está começando do zero. Um livrinho de
// poucas páginas curtas (uma ideia por página), as palavras novas, três verificações fáceis e,
// no fim, o convite para praticar. O texto completo fica para depois, como aprofundamento.
import { useEffect, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { useFx } from '@/app/fx';
import { useSession } from '@/app/useSession';
import { learnKey, seriesKey } from '@/lib/pace';
import { getChapter, getLearningUnit, getSectionExtras, getSimpleSection, microSeries } from '@/content';
import { InteractiveUnitPage } from '@/pages/InteractiveUnit';
import { MicroLessonPage } from './MicroLesson';
import { markSectionRead, setLastSection } from '@/lib/study';
import { practiceDone } from '@/lib/practice';
import { roman } from '@/lib/roman';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { StepGuide } from '@/components/StepGuide';
import { Mascot } from '@/components/Mascot';
import { LeatherBook, Leaf, useSpread, visiblePages } from '@/components/LeatherBook';
import { Pegadinha } from './Book';

/** Vinheta de rodapé: pena e tinteiro ou vela, alternando, como nos manuscritos. */
function Vignette({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 120 60" className="mx-auto mt-auto h-16 w-32 opacity-50" aria-hidden="true">
      <path d="M10 50h100" stroke="rgb(var(--line))" strokeWidth="1.2" />
      <path d="M40 50c6-6 14-6 20 0 6-6 14-6 20 0" fill="none" stroke="rgb(var(--ember))" strokeWidth="1.2" />
      {i % 2 === 0 ? (
        <g>
          <path d="M52 48h16l-2-12H54z" fill="rgb(var(--ink) / 0.55)" />
          <path d="M60 36C66 22 78 12 92 8 84 18 74 28 62 38" fill="none" stroke="rgb(var(--ink) / 0.6)" strokeWidth="1.4" />
        </g>
      ) : (
        <g>
          <rect x="56" y="30" width="8" height="18" rx="1.5" fill="rgb(var(--ink) / 0.35)" />
          <path className="anim-flicker" d="M60 18c4 5 4 9 0 11-4-2-4-6 0-11z" fill="#e8b13b" />
        </g>
      )}
    </svg>
  );
}

type LearnPage = { kind: 'open' } | { kind: 'text'; i: number } | { kind: 'words' } | { kind: 'checks' } | { kind: 'end' };

export function LearnPage() {
  const { chapterId = '', sectionId = '' } = useParams();
  // Reformulação: trecho com unidade interativa abre o leitor de texto interativo (piloto).
  const unit = getLearningUnit(chapterId, sectionId);
  if (unit) return <InteractiveUnitPage key={unit.id} unit={unit} />;
  return <MicroOrSimple />;
}

function MicroOrSimple() {
  const { chapterId = '', sectionId = '', aula } = useParams();
  const { data } = useStudy();
  const series = microSeries(chapterId, sectionId);
  if (!series.length) return <SimpleLearnPage />;
  // Trecho com microaula: a aula em etapas é o caminho principal (fonte única do conteúdo didático).
  // Em série, abre a aula pedida ou, sem indicação, a primeira ainda não concluída.
  const lesson =
    series.find((m) => m.id === aula) ??
    (series.length > 1 ? series.find((m) => !data.unitLog?.[seriesKey(chapterId, sectionId, m.id)]) ?? series[0] : series[0]);
  const i = series.indexOf(lesson);
  return <MicroLessonPage key={lesson.id} lesson={lesson} series={series.length > 1 ? { index: i, total: series.length, next: series[i + 1] } : undefined} />;
}

function SimpleLearnPage() {
  const { chapterId = '', sectionId = '' } = useParams();
  const navigate = useNavigate();
  const chapter = getChapter(chapterId);
  const idx = chapter?.sections.findIndex((s) => s.id === sectionId) ?? -1;
  const section = chapter?.sections[idx];
  const simple = getSimpleSection(chapterId, sectionId);
  const extras = getSectionExtras(chapterId, sectionId);
  const { data, update } = useStudy();
  const { prefs } = usePrefs();
  const { sfx, confetti, toast } = useFx();
  // Página exata guardada para o Continuar retomar aqui.
  const session = useSession<number>(learnKey(chapterId, sectionId), () => 0, (p) => `Aprender: página ${p + 1}`);
  const page = session.state;
  const setPage = session.setState;
  const spread = useSpread();

  const pages = useMemo<LearnPage[]>(() => {
    if (!simple) return [];
    return [
      { kind: 'open' },
      ...simple.pages.map((_, i) => ({ kind: 'text' as const, i })),
      ...(simple.words.length ? [{ kind: 'words' as const }] : []),
      ...(simple.checks.length ? [{ kind: 'checks' as const }] : []),
      { kind: 'end' },
    ];
  }, [simple]);

  useEffect(() => {
    if (chapter && section) update((d) => setLastSection(d, chapter.id, section.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, sectionId]);

  // Chegar à última página conta como trecho estudado.
  useEffect(() => {
    if (!chapter || !section || !visiblePages(page, pages.length, spread).some((p) => pages[p]?.kind === 'end')) return;
    if (data.reading[chapter.id]?.sectionsRead.includes(section.id)) return;
    const r = markSectionRead(data, chapter, section.id);
    update((d) => markSectionRead(d, chapter, section.id).data);
    session.finish();
    sfx('done');
    confetti(r.xp ? 90 : 40);
    if (r.xp) toast({ text: 'Capítulo estudado!', sub: `+${r.xp.amount} pontos`, icon: 'grimorio', color: '#2c5f6e' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages, spread]);

  if (!chapter || !section) return <p>Trecho não encontrado.</p>;
  // Sem explicação simples, abre o texto completo.
  if (!simple) return <Navigate to={`/capitulo/${chapterId}#${sectionId}`} replace />;

  const title = section.title.replace(/^\d+\.\s*/, '');
  const textTotal = simple.pages.length;

  const body = (p: LearnPage) => {
    switch (p.kind) {
      case 'open':
        return (
          <div className="flex h-full flex-col">
            <div className="text-center">
              <p className="kicker">Trecho {idx + 1}</p>
              <h1 className="mt-1 text-[1.6rem] leading-tight">{title}</h1>
            </div>
            <p className="mt-6 border-l-2 border-gold pl-3 text-[0.98rem]">Vamos começar do começo, uma ideia por página. Vire a página quando estiver pronto.</p>
            <p className="mt-auto pt-3 text-center text-xs text-muted">
              {textTotal} páginas curtas · explicação do zero <Icon name="seta" size={12} className="inline" />
            </p>
          </div>
        );
      case 'text': {
        const pg = simple.pages[p.i];
        return (
          <div className="flex h-full flex-col">
            <p className="text-xs text-muted">
              {p.i + 1} de {textTotal}
            </p>
            <h2 className="mt-1 text-[1.4rem] leading-snug">{pg.title}</h2>
            <div className="prose-manuscript learn-text mt-3">
              <div className={p.i === 0 ? 'illuminated' : ''}>
                <Markdown>{pg.text}</Markdown>
              </div>
            </div>
            {p.i === textTotal - 1 ? (
              <div className="mt-auto flex items-end gap-2 pt-2">
                <Mascot mood="cheer" size={52} />
                <span className="mb-4 text-sm text-muted">Agora as palavras novas.</span>
              </div>
            ) : (
              <Vignette i={p.i} />
            )}
          </div>
        );
      }
      case 'words':
        return (
          <div className="prose-manuscript">
            <h3 className="!mt-0">Palavras novas</h3>
            <dl className="space-y-2.5">
              {simple.words.map((w) => (
                <div key={w.term} className="rounded-xl bg-surface/60 px-3 py-2">
                  <dt className="font-bold">{w.term}</dt>
                  <dd className="leading-snug opacity-90">{w.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      case 'checks':
        return (
          <div className="prose-manuscript !text-[0.95em]">
            <h3 className="!mt-0">Você entendeu?</h3>
            <p className="!mb-2 text-sm text-muted">Toque em verdadeiro ou falso. Não vale nota.</p>
            <ul className="!m-0 !list-none space-y-2 !pl-0 [&>li]:before:!content-none">
              {simple.checks.map((it, i) => (
                <Pegadinha key={i} item={it} />
              ))}
            </ul>
          </div>
        );
      case 'end': {
        const done = practiceDone(data, chapterId, sectionId);
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Mascot mood="cheer" size={92} />
            <h2 className="mt-2 text-[1.5rem]">Trecho aprendido!</h2>
            <p className="mt-1 max-w-xs text-sm text-muted">{extras?.outro ?? 'Agora pratique um pouco para não esquecer.'}</p>
            <Link to={`/pratica/${chapterId}/${sectionId}`} className="btn-primary mt-5 w-full max-w-xs" data-testid={`praticar-${sectionId}`}>
              <Icon name="chama" size={18} strokeWidth={2.2} /> {done ? 'Praticar de novo' : 'Praticar agora'}
            </Link>
            <Link to={`/capitulo/${chapterId}#${sectionId}`} className="btn-ghost mt-2 w-full max-w-xs text-sm">
              <Icon name="grimorio" size={16} /> Ler o texto completo (mais difícil)
            </Link>
          </div>
        );
      }
    }
  };

  const render = (i: number) => (
    <Leaf
      head={
        <>
          <span className="truncate">Aprender · {title}</span>
          <span className="shrink-0">Cap. {roman(chapter.number).toUpperCase()}</span>
        </>
      }
      folio={`fol. ${roman(i + 1)}`}
    >
      {pages[i] && body(pages[i])}
    </Leaf>
  );

  return (
    <div className="-mt-2 flex h-[calc(100dvh-5.5rem-env(safe-area-inset-top))] flex-col" style={{ ['--font-scale' as string]: prefs.fontScale }}>
      <div className="mb-2 flex shrink-0 items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => navigate(`/grimorio/${chapter.grimoireId}`)} aria-label="Sair">
          <Icon name="errado" size={22} />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full rounded-full bg-[#2c5f6e] transition-all duration-500" style={{ width: `${((page + 1) / pages.length) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted">
          {page + 1}/{pages.length}
        </span>
      </div>
      <div className="mb-2 shrink-0">
        <StepGuide chapterId={chapterId} sectionId={sectionId} current="aprender" />
      </div>
      <LeatherBook
        spread={spread}
        page={page}
        total={pages.length}
        onPage={setPage}
        render={render}
        last={
          <Link to={`/pratica/${chapterId}/${sectionId}`} className="btn-primary !min-h-[44px] flex-1 text-sm">
            Praticar <Icon name="seta" size={18} />
          </Link>
        }
      />
    </div>
  );
}
