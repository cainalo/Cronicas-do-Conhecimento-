// Leitor de texto interativo (reformulação, Fase 2; spec 09). A unidade é lida como página, com
// rolagem natural: cada etapa aparece abaixo da anterior depois da checagem. Termos em negrito que
// representam conceitos já apresentados abrem a definição numa folha (sem mudar o checkpoint). Errou a
// checagem? Vem outra explicação e uma atividade equivalente; depois, volta-se exatamente ao ponto.
// O ponto salvo é a etapa (stepId), na mesma chave do Aprender, então o Continuar volta aqui.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Concept, LearningUnit } from '@/content/learning';
import { concepts as allConcepts, getChapter, getQuestion } from '@/content';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { useSession } from '@/app/useSession';
import { learnKey } from '@/lib/pace';
import { markSectionRead, recordAnswer } from '@/lib/study';
import { conceptForTerm } from '@/lib/contentValidator';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { ActivityView } from '@/components/activities/ActivityView';

type Stage = 'abertura' | 'etapas' | 'pratica' | 'prova' | 'sintese';

export interface UnitSession {
  stage: Stage;
  /** Etapa atual (as anteriores estão concluídas). */
  step: number;
  /** Etapa em recuperação (errou a checagem). */
  recovery: string | null;
  /** Índice na prática ou na prova. */
  pi: number;
  /** Acerto na primeira tentativa de cada atividade. */
  results: Record<string, boolean>;
  struggled: string[];
}

const START: UnitSession = { stage: 'abertura', step: 0, recovery: null, pi: 0, results: {}, struggled: [] };

/** Converte o ponto salvo pela microaula antiga (mesma chave) para o formato da unidade. */
export function normalizeSession(raw: unknown, steps: { id: string }[]): UnitSession {
  if (!raw || typeof raw !== 'object') return START;
  const r = raw as Record<string, unknown>;
  if (typeof r.stage === 'string') return { ...START, ...(r as Partial<UnitSession>) } as UnitSession;
  const phase = r.phase as { k: string; i?: number } | undefined;
  const results = (r.first as Record<string, boolean>) ?? {};
  const struggled = (r.struggled as string[]) ?? [];
  if (!phase) return START;
  const i = phase.i ?? 0;
  const base = { ...START, results, struggled };
  switch (phase.k) {
    case 'explicar':
    case 'checar':
      return { ...base, stage: 'etapas', step: i };
    case 'recuperar':
    case 'rechecar':
      return { ...base, stage: 'etapas', step: i, recovery: steps[i]?.id ?? null };
    case 'praticar':
      return { ...base, stage: 'pratica', step: steps.length, pi: i };
    case 'prova':
      return { ...base, stage: 'prova', step: steps.length, pi: i };
    case 'sintese':
      return { ...base, stage: 'sintese', step: steps.length };
    default:
      return base;
  }
}

function TermSheet({ concept, onClose }: { concept: Concept; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={`Conceito: ${concept.term}`} className="anim-toast-in w-full max-w-md rounded-[1.4rem] bg-surface p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-azure">Conceito</p>
            <h2 className="text-xl">{concept.term}</h2>
          </div>
          <button ref={closeRef} type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-raised" onClick={onClose} aria-label="Fechar">
            <Icon name="errado" size={18} />
          </button>
        </div>
        <p className="mt-2 leading-relaxed">{concept.definition}</p>
        <p className="mt-3 text-xs text-muted">Abrir um conceito não muda o seu ponto na trilha.</p>
      </div>
    </div>
  );
}

export function InteractiveUnitPage({ unit }: { unit: LearningUnit }) {
  const navigate = useNavigate();
  const { update } = useStudy();
  const { sfx } = useFx();
  const chapter = getChapter(unit.chapterId)!;
  const n = unit.steps.length;
  const session = useSession<UnitSession>(learnKey(unit.chapterId, unit.sectionId), () => START, (s) =>
    // Recuperação obrigatória: o Continuar mostra que é um reforço e volta ao mesmo ponto da etapa.
    s.stage === 'etapas' && s.recovery ? `Reforço do assunto: etapa ${Math.min(s.step + 1, n)} de ${n}` : s.stage === 'etapas' ? `Aula: etapa ${Math.min(s.step + 1, n)} de ${n}` : s.stage === 'pratica' ? 'Aula: prática final' : s.stage === 'prova' ? 'Aula: questão de prova' : 'Aula',
  );
  const st = useMemo(() => normalizeSession(session.state, unit.steps), [session.state, unit.steps]);
  const set = (patch: Partial<UnitSession>) => session.setState((s) => ({ ...normalizeSession(s, unit.steps), ...patch }));
  const note = (id: string, ok: boolean) => session.setState((s) => {
    const cur = normalizeSession(s, unit.steps);
    return id in cur.results ? cur : { ...cur, results: { ...cur.results, [id]: ok } };
  });
  const [term, setTerm] = useState<Concept>();
  const closeTerm = useCallback(() => setTerm(undefined), []);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Conceitos já apresentados: os das etapas abertas (até a atual) ou todos, depois das etapas.
  const available = useMemo(() => {
    const upTo = st.stage === 'etapas' ? st.step : st.stage === 'abertura' ? -1 : n - 1;
    return new Set(unit.steps.slice(0, upTo + 1).flatMap((s) => s.introduces));
  }, [st.stage, st.step, n, unit.steps]);
  const strong = (text: string) => {
    const c = conceptForTerm(text, allConcepts, available);
    if (!c) return undefined;
    return (
      <button type="button" className="term-link" onClick={() => setTerm(c)} aria-label={`${text} (abrir definição)`}>
        {text}
      </button>
    );
  };
  const md = (text: string) => (
    <div className="prose-manuscript [&>*:first-child]:!mt-0">
      <Markdown strong={strong}>{text}</Markdown>
    </div>
  );

  // Ao avançar de etapa (ou ao retomar), leva a leitura até a etapa atual.
  useEffect(() => {
    if (st.stage !== 'etapas' || st.step === 0) return;
    stepRefs.current[st.step]?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }, [st.stage, st.step]);

  const finish = () => {
    update((d) => markSectionRead(d, chapter, unit.sectionId).data);
    sfx('done');
    set({ stage: 'sintese' });
    session.finish();
  };
  const advanceStep = () => (st.step + 1 < n ? set({ step: st.step + 1, recovery: null }) : set({ stage: 'pratica', step: n, recovery: null, pi: 0 }));
  const doneSteps = st.stage === 'etapas' ? st.step : st.stage === 'abertura' ? 0 : n;

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="sticky top-14 z-20 -mx-4 mb-4 flex items-center gap-3 border-b border-line bg-bg/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
        <button className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => navigate('/trilha')} aria-label="Sair (o lugar fica salvo)">
          <Icon name="errado" size={20} />
        </button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-raised" aria-hidden="true">
          <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(doneSteps / n) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted" aria-live="polite">
          {st.stage === 'etapas' ? `Etapa ${st.step + 1} de ${n}` : st.stage === 'abertura' ? 'Abertura' : st.stage === 'pratica' ? 'Prática final' : st.stage === 'prova' ? 'Questão de prova' : 'Concluída'}
        </span>
      </div>

      <header className="mb-6">
        <p className="text-sm font-semibold text-teal">{chapter.title}</p>
        <h1 className="mt-1 text-[1.75rem] leading-tight">{unit.title}</h1>
        <p className="mt-2 text-muted">{unit.objective}</p>
        <p className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-raised px-2.5 py-1 font-semibold">
            {unit.estimatedMinutes[0]} a {unit.estimatedMinutes[1]} min
          </span>
          <span className="rounded-full bg-raised px-2.5 py-1 font-semibold">{n} etapas</span>
          <span className="rounded-full bg-azure/10 px-2.5 py-1 font-semibold text-azure">Toque nos termos sublinhados para ver a definição</span>
        </p>
      </header>

      {st.stage === 'abertura' && (
        <section className="card p-4 sm:p-5" aria-label="Pergunta de abertura">
          <p className="mb-2 text-sm font-semibold text-leaf">Antes de começar · pergunta para pensar (não vale nota)</p>
          <ActivityView key="abertura" a={unit.opening.activity} onNext={() => set({ stage: 'etapas', step: 0 })} />
        </section>
      )}

      {st.stage !== 'abertura' && (
        <ol className="space-y-8" aria-label="Etapas da aula">
          {unit.steps.slice(0, st.stage === 'etapas' ? st.step + 1 : n).map((s, i) => {
            const current = st.stage === 'etapas' && i === st.step;
            const check = s.blocks.find((b) => b.kind === 'inlineActivity');
            const inRecovery = current && st.recovery === s.id;
            return (
              <li key={s.id} ref={(el) => (stepRefs.current[i] = el)} className="scroll-mt-28" aria-current={current ? 'step' : undefined}>
                <p className="text-xs font-semibold text-gold">
                  {s.part} · etapa {i + 1} de {n}
                </p>
                <h2 className="mt-1 text-xl">{s.title}</h2>
                <p className="mt-0.5 text-sm text-muted">Objetivo: {s.goal}</p>
                <div className="mt-3 space-y-3">
                  {s.blocks.map((b) =>
                    b.kind === 'paragraph' ? (
                      <div key={b.id}>{md(b.md)}</div>
                    ) : b.kind === 'workedExample' ? (
                      <div key={b.id} className="rounded-2xl border-l-4 border-leaf bg-leaf/10 px-4 py-3">
                        <p className="mb-1 text-sm font-bold text-ink">Exemplo</p>
                        {md(b.md)}
                      </div>
                    ) : null,
                  )}
                </div>
                {current && check && check.kind === 'inlineActivity' && !inRecovery && (
                  <div className="card mt-4 p-4" aria-label="Checagem da etapa">
                    <p className="mb-2 text-sm font-semibold text-gold">Confira o que acabou de ler</p>
                    <ActivityView
                      key={`c-${s.id}`}
                      a={check.activity}
                      onNext={(o) => {
                        note(check.activity.id, o.ok);
                        if (!o.ok) set({ recovery: s.id, struggled: [...new Set([...st.struggled, s.id])] });
                        else advanceStep();
                      }}
                    />
                  </div>
                )}
                {inRecovery && (
                  <div className="mt-4 space-y-3" aria-label="Recuperação">
                    <div className="rounded-2xl border-l-4 border-azure bg-azure/10 px-4 py-3">
                      <p className="mb-1 text-sm font-bold">Vamos ver de outro jeito</p>
                      {md(s.recovery.md)}
                    </div>
                    <div className="card p-4">
                      <p className="mb-2 text-sm font-semibold text-azure">Uma parecida, com outro exemplo</p>
                      <ActivityView key={`r-${s.id}`} a={s.recovery.activity} onNext={() => advanceStep()} />
                    </div>
                  </div>
                )}
                {!current && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ok">
                    <Icon name="certo" size={16} strokeWidth={2.6} /> Etapa concluída
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {st.stage === 'pratica' && (
        <section className="card mt-8 p-4 sm:p-5" aria-label="Prática final">
          <p className="mb-2 text-sm font-semibold text-gold">
            Prática com tudo o que você aprendeu · {st.pi + 1} de {unit.practice.length}
          </p>
          <ActivityView
            key={unit.practice[st.pi].activity.id}
            a={unit.practice[st.pi].activity}
            onNext={(o) => {
              note(unit.practice[st.pi].activity.id, o.ok);
              set(st.pi + 1 < unit.practice.length ? { pi: st.pi + 1 } : { stage: 'prova', pi: 0 });
            }}
          />
        </section>
      )}

      {st.stage === 'prova' && (() => {
        const e = unit.exam[st.pi].activity;
        const q = e.kind === 'exam' ? getQuestion(e.questionId) : undefined;
        return (
          <section className="card mt-8 p-4 sm:p-5" aria-label="Questão de prova">
            <ActivityView
              key={e.id}
              a={e}
              question={q}
              onExamAnswer={(qq, key) => update((d) => recordAnswer(d, qq, key, 'practice', `unit:${unit.id}`).data)}
              onNext={(o) => {
                note(e.id, o.ok);
                if (st.pi + 1 < unit.exam.length) set({ pi: st.pi + 1 });
                else finish();
              }}
            />
          </section>
        );
      })()}

      {st.stage === 'sintese' && (
        <section className="card mt-8 p-4 sm:p-5" aria-label="Síntese">
          <h2 className="text-xl">Aula concluída</h2>
          <h3 className="mt-3 font-semibold">O que você aprendeu</h3>
          <ul className="mt-1 space-y-1.5">
            {unit.summary.map((t) => (
              <li key={t} className="flex gap-2">
                <Icon name="certo" size={16} className="mt-1 shrink-0 text-ok" /> {t}
              </li>
            ))}
          </ul>
          {st.struggled.length > 0 && (
            <>
              <h3 className="mt-4 font-semibold">Vale revisar</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-muted">
                {unit.steps.filter((s) => st.struggled.includes(s.id)).map((s) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={`/pratica/${unit.chapterId}/${unit.sectionId}`} className="btn-primary flex-1">
              Próximo passo: praticar
            </Link>
            <Link to={`/capitulo/${unit.chapterId}#${unit.sectionId}`} className="btn-ghost flex-1 text-sm">
              Texto de referência
            </Link>
          </div>
        </section>
      )}

      {term && <TermSheet concept={term} onClose={closeTerm} />}
    </div>
  );
}
