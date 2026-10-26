// Microaula: uma ideia por vez. Cada etapa tem explicação, exemplo e checagem imediata; se errar,
// vem outra explicação e um item equivalente com outros dados. Depois: prática cumulativa, questão
// no estilo da prova e síntese. O ponto exato fica salvo (useSession), e o Continuar volta aqui.
// Nenhuma tela rola para baixo: o que não cabe vira outra parte, ao lado (SwipePages).
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import type { MicroLesson } from '@/content/types';
import type { FeedPost } from '@/lib/feed';
import { curatedVideos, feedPostsOf, getChapter, getQuestion, narratedFor, teacherForChapter } from '@/content';
import { NarratedPlayer } from './Narrated';
import { VideoEmbed } from '@/components/VideoEmbed';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { useSession } from '@/app/useSession';
import { learnKey, logUnit, seriesKey } from '@/lib/pace';
import { markSectionRead, recordAnswer } from '@/lib/study';
import { Markdown } from '@/components/Markdown';
import { PageDots, SwipePages, type PageItem } from '@/components/SwipePages';
import { splitMarkdown } from '@/lib/book';
import { Icon } from '@/components/Icon';
import { Illustration } from '@/components/Illustration';
import { StepGuide } from '@/components/StepGuide';
import { ActivityView } from '@/components/activities/ActivityView';

type Phase =
  | { k: 'abertura' }
  | { k: 'explicar'; i: number }
  | { k: 'checar'; i: number }
  | { k: 'recuperar'; i: number }
  | { k: 'rechecar'; i: number }
  /** Sequência única (25/10/2026): aula narrada e videoaula conferida, dentro da aula, antes da prática. */
  | { k: 'midia' }
  | { k: 'praticar'; i: number }
  | { k: 'prova'; i: number }
  | { k: 'sintese' };

interface Saved {
  phase: Phase;
  /** Acerto na primeira tentativa de cada checagem. */
  first: Record<string, boolean>;
  /** Etapas que precisaram de recuperação (para a síntese e a revisão). */
  struggled: string[];
}

/**
 * Ponto salvo que não existe mais (a aula mudou de tamanho depois que foi salvo, ou o dado veio
 * corrompido) não pode derrubar a tela: vai para a fase válida mais próxima, sem perder o avanço.
 */
export function clampPhase(p: Phase | undefined, l: Pick<MicroLesson, 'steps' | 'consolidation' | 'exam'>, hasMedia = false): Phase {
  const toExam = (): Phase => (l.exam.length ? { k: 'prova', i: 0 } : { k: 'sintese' });
  const toPractice = (): Phase => (l.consolidation.length ? { k: 'praticar', i: 0 } : toExam());
  if (!p || typeof p !== 'object') return { k: 'abertura' };
  if (p.k === 'abertura' || p.k === 'sintese') return p;
  if (p.k === 'midia') return hasMedia ? p : toPractice();
  const i = 'i' in p && Number.isInteger(p.i) && p.i >= 0 ? p.i : -1;
  if (['explicar', 'checar', 'recuperar', 'rechecar'].includes(p.k)) return i >= 0 && i < l.steps.length ? p : i < 0 ? { k: 'abertura' } : toPractice();
  if (p.k === 'praticar') return i >= 0 && i < l.consolidation.length ? p : toExam();
  if (p.k === 'prova') return i >= 0 && i < l.exam.length ? p : { k: 'sintese' };
  return { k: 'abertura' };
}

export function MicroLessonPage({ lesson, series }: { lesson: MicroLesson; series?: { index: number; total: number; next?: MicroLesson } }) {
  const navigate = useNavigate();
  const { update } = useStudy();
  const { sfx, confetti } = useFx();
  const chapter = getChapter(lesson.chapterId)!;
  const narrated = narratedFor(lesson.id);
  // Só videoaulas conferidas entram na sequência; as "a conferir" ficam na biblioteca de vídeos.
  const videos = curatedVideos.filter((v) => v.lessonId === lesson.id && v.status === 'conferido');
  const relatedTips = useMemo(() => feedPostsOf(lesson.id).filter((post) => post.kind === 'dica'), [lesson.id]);
  const hasMedia = !!narrated || videos.length > 0;
  const n = lesson.steps.length;
  // Em série, cada aula tem o seu ponto salvo; sozinha, usa a chave do trecho (como antes).
  const key = series ? seriesKey(lesson.chapterId, lesson.sectionId, lesson.id) : learnKey(lesson.chapterId, lesson.sectionId);
  const session = useSession<Saved>(
    key,
    () => ({ phase: { k: 'abertura' }, first: {}, struggled: [] }),
    (s) => ('i' in s.phase && ['explicar', 'checar', 'recuperar', 'rechecar'].includes(s.phase.k) ? `Aula: etapa ${s.phase.i + 1} de ${n}` : s.phase.k === 'praticar' ? 'Aula: prática final' : s.phase.k === 'prova' ? 'Aula: questão de prova' : 'Aula'),
  );
  const phase = clampPhase(session.state.phase, lesson, hasMedia);
  const { first = {}, struggled = [] } = session.state;
  const set = (p: Phase, extra?: Partial<Saved>) => {
    session.setState((s) => ({ ...s, ...extra, phase: p }));
    window.scrollTo?.({ top: 0 });
  };
  const note = (id: string, ok: boolean) => session.setState((s) => (id in s.first ? s : { ...s, first: { ...s.first, [id]: ok } }));

  // Barra de progresso: abertura, etapas, prática, prova, síntese.
  const m = hasMedia ? 1 : 0;
  const totalSlots = n + 3 + m;
  const slot =
    phase.k === 'abertura' ? 0 : phase.k === 'midia' ? n + 1 : phase.k === 'praticar' ? n + 1 + m : phase.k === 'prova' ? n + 2 + m : phase.k === 'sintese' ? n + 3 + m : phase.i + 1;
  const step = 'i' in phase && ['explicar', 'checar', 'recuperar', 'rechecar'].includes(phase.k) ? lesson.steps[phase.i] : undefined;
  const examQs = useMemo(() => lesson.exam.map((a) => (a.kind === 'exam' ? getQuestion(a.questionId) : undefined)), [lesson]);

  const finishLesson = () => {
    // Aula da série que não é a última: registra só a aula. A última conclui o trecho.
    if (series && series.next) update((d) => logUnit(d, key));
    else update((d) => logUnit(markSectionRead(d, chapter, lesson.sectionId).data, key));
    const ok = Object.values(first).filter(Boolean).length;
    if (ok / Math.max(1, Object.keys(first).length) >= 0.7) confetti(90);
    sfx('done');
    set({ k: 'sintese' });
    session.finish();
  };

  const renderMd = (md: string) => (
    <div className="prose-manuscript !font-sans !text-[1.02rem] [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0 [&_table]:!text-sm">
      <Markdown>{md}</Markdown>
    </div>
  );

  // Explicação em partes que cabem na tela: parágrafos (divisíveis) e o exemplo numa moldura.
  const explainItems = (): PageItem[] => {
    if (!step) return [];
    const body = phase.k === 'explicar' ? step.explain : step.recovery.explain;
    const items: PageItem[] = splitMarkdown(body).map((md, k) => ({ key: `e${k}`, md }));
    if (phase.k === 'explicar' && step.art) items.unshift({ key: 'art', node: <Illustration name={step.art} className="mx-auto h-24 w-auto text-ink" /> });
    if (phase.k === 'explicar' && step.example) {
      items.push({
        key: 'ex',
        md: step.example,
        wrap: (c, cont) => (
          <div className="rounded-2xl border-l-4 border-ember bg-ember/5 px-4 py-3">
            <p className="mb-1 text-sm font-bold text-ember">{cont ? 'Exemplo (continuação)' : 'Exemplo'}</p>
            {c}
          </div>
        ),
      });
    }
    return items;
  };

  const summaryItems = (): PageItem[] => [
    { key: 'h', node: <h2 className="text-lg">O que você aprendeu</h2> },
    ...lesson.summary.map((t, k) => ({
      key: `s${k}`,
      node: (
        <p className="flex gap-2">
          <Icon name="certo" size={16} className="mt-1 shrink-0 text-ok" /> {t}
        </p>
      ),
    })),
    ...(struggled.length
      ? [
          { key: 'rh', node: <h2 className="text-lg">Vale revisar</h2> },
          ...lesson.steps
            .filter((x) => struggled.includes(x.id))
            .map((x) => ({ key: `r${x.id}`, node: <p className="text-sm text-muted">• {x.title}</p> })),
        ]
      : []),
    {
      key: 'n',
      node: <p className="text-sm text-muted">{series?.next ? `Próxima aula: ${series.next.title}.` : 'Próximo passo da trilha: praticar este trecho.'}</p>,
    },
  ];

  return (
    // Altura fixa da tela: nada rola para baixo. O que não cabe vai para a parte seguinte, ao lado.
    <div className="-mt-2 flex flex-col overflow-hidden" style={{ height: 'calc(100dvh - 5.5rem - env(safe-area-inset-top, 0px))' }}>
      <div className="mb-2 flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => navigate('/trilha')} aria-label="Sair (o lugar fica salvo)">
          <Icon name="errado" size={22} />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-raised" aria-label={`Progresso: ${slot} de ${totalSlots}`}>
          <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(slot / totalSlots) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted">
          {slot}/{totalSlots}
        </span>
      </div>
      {series ? (
        <p className="mb-2 truncate text-sm text-muted">
          <span className="font-title italic">Aula {series.index + 1} de {series.total}</span> · {lesson.title}
        </p>
      ) : (
        <div className="mb-2">
          <StepGuide chapterId={lesson.chapterId} sectionId={lesson.sectionId} current="aprender" compact />
        </div>
      )}

      {phase.k === 'abertura' && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label="Abertura">
          <p className="mb-3 border-l-2 border-gold pl-3 text-sm text-muted">Antes de explicar, uma pergunta. Não vale nota: é só para você pensar no problema.</p>
          <ActivityView key="abertura" fit a={lesson.opening} onNext={() => set({ k: 'explicar', i: 0 })} />
        </section>
      )}

      {step && (phase.k === 'explicar' || phase.k === 'recuperar') && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label={phase.k === 'explicar' ? 'Explicação' : 'Outra explicação'}>
          <p className="text-xs font-semibold text-gold">
            {step.part} · etapa {phase.i + 1} de {n}
          </p>
          <h1 className="mt-0.5 text-2xl leading-tight">{phase.k === 'explicar' ? step.title : 'Vamos ver de outro jeito'}</h1>
          {phase.k === 'explicar' && <p className="mb-2 mt-0.5 text-sm text-muted">Objetivo: {step.goal}</p>}
          <div className="mt-2 flex min-h-0 flex-1 flex-col">
            <SwipePages
              items={explainItems()}
              layoutKey={`${phase.k}-${step.id}`}
              renderMd={renderMd}
              label="Explicação"
              footer={({ page, total, go }) => (
                <div className="pt-1">
                  <PageDots page={page} total={total} go={go} />
                  <div className="flex gap-2 pt-1">
                    {(page > 0 || (phase.k === 'explicar' && phase.i > 0)) && (
                      <button className="btn-ghost" onClick={() => (page > 0 ? go(page - 1) : set({ k: 'explicar', i: phase.i - 1 }))}>
                        <Icon name="voltar" size={18} /> {page > 0 ? 'Parte anterior' : 'Anterior'}
                      </button>
                    )}
                    {page < total - 1 ? (
                      <button className="btn-primary flex-1" onClick={() => go(page + 1)}>
                        Próxima parte <Icon name="seta" size={18} />
                      </button>
                    ) : (
                      <button className="btn-primary flex-1" onClick={() => set({ k: phase.k === 'explicar' ? 'checar' : 'rechecar', i: phase.i })}>
                        Entendi, quero conferir
                      </button>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        </section>
      )}

      {step && (phase.k === 'checar' || phase.k === 'rechecar') && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label="Checagem">
          <p className="mb-1 text-xs font-semibold text-gold">
            {phase.k === 'checar' ? 'Confira o que acabou de aprender' : 'Mais uma, com outro exemplo'} · etapa {phase.i + 1} de {n}
          </p>
          <ActivityView
            key={`${phase.k}-${step.id}`}
            fit
            a={phase.k === 'checar' ? step.check : step.recovery.check}
            onNext={(o) => {
              if (phase.k === 'checar') {
                note(step.check.id, o.ok);
                if (!o.ok) return set({ k: 'recuperar', i: phase.i }, { struggled: [...new Set([...struggled, step.id])] });
              }
              set(phase.i + 1 < n ? { k: 'explicar', i: phase.i + 1 } : hasMedia ? { k: 'midia' } : { k: 'praticar', i: 0 });
            }}
          />
        </section>
      )}

      {phase.k === 'midia' && narrated && createPortal(
        <div
          className="fixed inset-0 z-[80] overflow-hidden bg-bg px-3 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label={'Aula narrada: ' + narrated.title}
          style={{
            paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col">
            <div className="min-h-0 flex-1">
              <NarratedPlayer
                l={narrated}
                embedded
                exitLabel="Ir para a prática"
                onClose={() => set(lesson.consolidation.length ? { k: 'praticar', i: 0 } : lesson.exam.length ? { k: 'prova', i: 0 } : { k: 'sintese' })}
              />
            </div>
            <RelatedProfessionalPosts posts={relatedTips} />
            {videos.length > 0 && (
              <details className="max-h-20 shrink-0 overflow-y-auto rounded-lg border border-line bg-surface px-3 py-2 text-sm">
                <summary className="cursor-pointer font-semibold">Videoaulas complementares</summary>
                <div className="mt-2 space-y-2">
                  {videos.map((v) => <VideoEmbed key={v.id} url={v.url} title={v.title} meta={[v.channel, v.duration].filter(Boolean).join(' · ')} />)}
                </div>
              </details>
            )}
          </div>
        </div>,
        document.body,
      )}
      {phase.k === 'midia' && !narrated && (
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-label="Veja de outro jeito">
          <div className="mb-3 shrink-0">
            <p className="kicker">Antes de praticar</p>
            <h1 className="mt-0.5 text-2xl leading-tight">Veja de outro jeito</h1>
            <p className="mt-1 text-sm text-muted">Videoaulas complementares do assunto; carregam só quando você tocar.</p>
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain">
            {videos.map((v) => <VideoEmbed key={v.id} url={v.url} title={v.title} meta={[v.channel, v.duration].filter(Boolean).join(' · ')} />)}
          </div>
          <RelatedProfessionalPosts posts={relatedTips} />
          <button className="btn-primary mt-2 w-full shrink-0" onClick={() => set(lesson.consolidation.length ? { k: 'praticar', i: 0 } : lesson.exam.length ? { k: 'prova', i: 0 } : { k: 'sintese' })} data-testid="midia-continuar">
            Continuar para a prática <Icon name="avancar" size={16} />
          </button>
        </section>
      )}
      {phase.k === 'praticar' && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label="Prática final">
          <p className="mb-1 text-xs font-semibold text-gold">
            Prática com tudo o que você aprendeu · {phase.i + 1} de {lesson.consolidation.length}
          </p>
          <ActivityView
            key={lesson.consolidation[phase.i].id}
            fit
            a={lesson.consolidation[phase.i]}
            onNext={(o) => {
              note(lesson.consolidation[phase.i].id, o.ok);
              if (phase.i + 1 < lesson.consolidation.length) set({ k: 'praticar', i: phase.i + 1 });
              else if (lesson.exam.length) set({ k: 'prova', i: 0 });
              else finishLesson();
            }}
          />
        </section>
      )}

      {phase.k === 'prova' && examQs[phase.i] && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label="Questão de prova">
          <ActivityView
            key={lesson.exam[phase.i].id}
            fit
            a={lesson.exam[phase.i]}
            question={examQs[phase.i]}
            onExamAnswer={(q, key) => update((d) => recordAnswer(d, q, key, 'practice', `micro:${lesson.id}`).data)}
            onNext={(o) => {
              note(lesson.exam[phase.i].id, o.ok);
              if (phase.i + 1 < lesson.exam.length) set({ k: 'prova', i: phase.i + 1 });
              else finishLesson();
            }}
          />
        </section>
      )}

      {phase.k === 'sintese' && (
        <section className="flex min-h-0 flex-1 flex-col" aria-label="Síntese">
          <p className="kicker">Fim da aula</p>
          <h1 className="mb-3 text-2xl">Aula concluída</h1>
          <div className="mt-2 flex min-h-0 flex-1 flex-col">
            <SwipePages
              items={summaryItems()}
              layoutKey="sintese"
              renderMd={renderMd}
              gap={8}
              label="Síntese"
              footer={(s) => (
                <div className="pt-1">
                  <PageDots {...s} />
                  <div className="flex gap-2 pt-1">
                    <Link to={`/capitulo/${lesson.chapterId}#${lesson.sectionId}`} className="btn-ghost flex-1 text-sm">
                      Texto de referência
                    </Link>
                    {series?.next ? (
                      <Link to={`/aprender/${lesson.chapterId}/${lesson.sectionId}/${series.next.id}`} className="btn-primary flex-1">
                        Próxima aula
                      </Link>
                    ) : (
                      <Link to={`/pratica/${lesson.chapterId}/${lesson.sectionId}`} className="btn-primary flex-1">
                        Praticar
                      </Link>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        </section>
      )}
    </div>
  );
}

/** Posts profissionais de apoio aparecem na mesma etapa da trilha e expandem no próprio lugar. */
function RelatedProfessionalPosts({ posts }: { posts: FeedPost[] }) {
  const tips = posts.filter((post) => post.kind === 'dica' && post.tip);
  if (!tips.length) return null;
  return (
    <section className="shrink-0 border-t border-line pt-1.5" aria-label="Perspectivas profissionais">
      <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted">Perspectiva profissional · {tips.length}</p>
      <div className="max-h-24 space-y-1 overflow-y-auto overscroll-contain">
        {tips.map((post) => {
          const tip = post.tip!;
          const teacher = teacherForChapter(tip.chapterId);
          return (
            <details key={post.id} className="rounded-lg border border-line bg-surface">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-2 py-1.5">
                {post.image && (
                  <img
                    src={post.image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-9 w-9 shrink-0 rounded object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{post.title}</span>
                  <span className="block truncate text-[0.65rem] text-muted">{teacher.name} · dica profissional</span>
                </span>
                <Icon name="seta" size={14} className="shrink-0 text-muted" />
              </summary>
              <div className="space-y-1.5 px-2 pb-2 text-xs leading-snug">
                <Markdown>{tip.body}</Markdown>
                {post.image && (
                  <p className="text-[0.65rem] text-muted">
                    {post.image.credit} · <a href={post.image.sourceUrl} target="_blank" rel="noreferrer" className="underline">Fonte</a>
                    {post.image.licenseUrl && <> · <a href={post.image.licenseUrl} target="_blank" rel="noreferrer" className="underline">{post.image.license}</a></>}
                  </p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
