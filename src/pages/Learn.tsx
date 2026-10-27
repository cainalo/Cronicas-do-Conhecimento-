// Aprender: sequência responsiva em etapas, com explicações, vocabulário, verificações e acesso à prática.
import { useEffect, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { useFx } from '@/app/fx';
import { useSession } from '@/app/useSession';
import { learnKey, seriesKey } from '@/lib/pace';
import { getChapter, getLearningUnit, getSimpleSection, microSeries } from '@/content';
import { InteractiveUnitPage } from '@/pages/InteractiveUnit';
import { MicroLessonPage } from './MicroLesson';
import { markSectionRead, setLastSection } from '@/lib/study';
import { practiceDone } from '@/lib/practice';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { Pegadinha } from './Book';

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
  const { data, update } = useStudy();
  const { prefs } = usePrefs();
  const { sfx, confetti, toast } = useFx();
  // Página exata guardada para o Continuar retomar aqui.
  const session = useSession<number>(learnKey(chapterId, sectionId), () => 0, (p) => `Aprender: página ${p + 1}`);
  const page = session.state;
  const setPage = session.setState;

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

  // Ao concluir o módulo, registra a leitura sem exigir virada de página.
  useEffect(() => {
    if (!chapter || !section || pages[page]?.kind !== 'end') return;
    if (data.reading[chapter.id]?.sectionsRead.includes(section.id)) return;
    const r = markSectionRead(data, chapter, section.id);
    update((d) => markSectionRead(d, chapter, section.id).data);
    session.finish();
    sfx('done');
    confetti(r.xp ? 90 : 40);
    if (r.xp) toast({ text: 'Trecho estudado!', sub: `+${r.xp.amount} pontos`, icon: 'certo', color: '#2c5f6e' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages]);

  if (!chapter || !section) return <p>Trecho não encontrado.</p>;
  // Sem explicação simples, abre o texto completo.
  if (!simple) return <Navigate to={`/capitulo/${chapterId}#${sectionId}`} replace />;

  const title = section.title.replace(/^\d+\.\s*/, '');
  const textTotal = simple.pages.length;

  const body = (p: LearnPage) => {
    switch (p.kind) {
      case 'open':
        return (
          <div className="space-y-4">
            <div>
              <p className="kicker">Trecho {idx + 1}</p>
              <h1 className="mt-1 text-[1.7rem] leading-tight">{title}</h1>
            </div>
            <p className="border-l-4 border-gold pl-3 text-[1rem] leading-relaxed">
              Vamos por partes: primeiro a explicação, depois os termos essenciais e uma checagem rápida.
            </p>
            <p className="text-sm text-muted">
              {textTotal} partes · {simple.words.length} termos essenciais · {simple.checks.length} verificações
            </p>
          </div>
        );
      case 'text': {
        const pg = simple.pages[p.i];
        return (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Parte {p.i + 1} de {textTotal}</p>
            <h2 className="text-[1.4rem] leading-snug">{pg.title}</h2>
            <div className="prose-manuscript learn-text">
              <Markdown>{pg.text}</Markdown>
            </div>
          </div>
        );
      }
      case 'words':
        return (
          <div className="space-y-3">
            <div>
              <p className="kicker">Vocabulário essencial</p>
              <h2 className="text-xl">Termos deste trecho</h2>
            </div>
            <dl className="grid gap-2 sm:grid-cols-2">
              {simple.words.map((w) => (
                <div key={w.term} className="rounded-xl border border-line bg-raised/50 p-3">
                  <dt className="font-bold">{w.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{w.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      case 'checks':
        return (
          <div className="space-y-3">
            <div>
              <p className="kicker">Verificação rápida</p>
              <h2 className="text-xl">Você entendeu?</h2>
            </div>
            <p className="text-sm text-muted">Responda verdadeiro ou falso e leia a explicação.</p>
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
          <div className="space-y-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ok/10 text-ok">
              <Icon name="certo" size={28} />
            </span>
            <div>
              <h2 className="text-[1.5rem] leading-tight">Trecho concluído</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{'Agora pratique para consolidar o que aprendeu.'}</p>
            </div>
            <Link to={`/pratica/${chapterId}/${sectionId}`} className="btn-primary inline-flex min-h-[46px] w-full max-w-sm items-center justify-center" data-testid={`praticar-${sectionId}`}>
              <Icon name="play" size={18} /> {done ? 'Praticar novamente' : 'Começar a prática'}
            </Link>
            <Link to={`/capitulo/${chapterId}#${sectionId}`} className="inline-flex text-sm font-semibold text-muted underline underline-offset-4">
              Consultar material completo
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-7.5rem)] w-full max-w-3xl flex-col gap-4 py-2" style={{ ['--font-scale' as string]: prefs.fontScale }}>
      <div className="flex items-center gap-3">
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-raised" onClick={() => navigate('/trilha')} aria-label="Sair do Aprender">
          <Icon name="errado" size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="h-2.5 overflow-hidden rounded-full bg-raised" aria-label={`Progresso: etapa ${page + 1} de ${pages.length}`}>
            <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${((page + 1) / pages.length) * 100}%` }} />
          </div>
          <p className="mt-1 text-right text-xs text-muted">Etapa {page + 1} de {pages.length}</p>
        </div>
      </div>

      <section key={page} className="card min-h-[42vh] p-4 sm:p-6" aria-label={title} data-testid="aprender-etapa">
        {pages[page] && body(pages[page])}
      </section>

      <div className="mt-auto flex gap-3 pb-2">
        <button type="button" className="btn-ghost min-h-[46px] flex-1" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
          Anterior
        </button>
        {page < pages.length - 1 ? (
          <button type="button" className="btn-primary min-h-[46px] flex-1" onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}>
            Continuar <Icon name="avancar" size={18} />
          </button>
        ) : (
          <span className="flex min-h-[46px] flex-1 items-center justify-center rounded-xl bg-raised/55 px-3 text-sm font-semibold text-muted">
            Trecho concluído
          </span>
        )}
      </div>
    </div>
  );
}
