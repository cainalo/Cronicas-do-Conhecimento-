// Prática de um trecho, no estilo Duolingo: atividades curtas e variadas, painel de resposta embaixo,
// erros voltam para o fim da fila e o Bubo abre e fecha a rodada com a cena da história.
import { Portal } from '@/components/Portal';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { DEFAULT_CONTEST_ID, concepts, getChapter, getLearningUnit, getSectionExtras, getSimpleSection, learningUnits, questionsForContest } from '@/content';
import { practiceUnlocked, taughtConcepts } from '@/lib/engine';
import { buildPractice, completePractice, isRecovery, nextQueue, practiceId, recoveryFor, type Activity } from '@/lib/practice';
import { useSession } from '@/app/useSession';
import { recordAnswer, totalXp } from '@/lib/study';
import { Icon } from '@/components/Icon';
import { StepGuide } from '@/components/StepGuide';
import { Mascot, SpeechBubble } from '@/components/Mascot';
import { QuestionStem } from '@/components/QuestionCard';

type Verdict = { ok: boolean; title: string; detail?: string; recovery?: Activity };

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const choiceCls = (state: 'idle' | 'sel' | 'ok' | 'bad' | 'dim') =>
  ({
    idle: 'border-line bg-surface hover:bg-raised/60',
    sel: 'border-[#2c5f6e] bg-[#2c5f6e]/10 shadow-[inset_0_0_0_1px_#2c5f6e]',
    ok: 'border-ok bg-ok/10',
    bad: 'border-bad bg-bad/10',
    dim: 'border-line bg-surface opacity-60',
  })[state];

/** Escolha única (V/F, lacuna, termo, questão). */
function Choices({ options, answer, locked, value, onPick, labels }: { options: string[]; answer: string; locked: boolean; value?: string; onPick: (v: string) => void; labels?: Record<string, string> }) {
  return (
    <ul className="space-y-2">
      {options.map((o, i) => {
        const state = !locked ? (value === o ? 'sel' : 'idle') : o === answer ? 'ok' : value === o ? 'bad' : 'dim';
        return (
          <li key={o}>
            <button
              type="button"
              disabled={locked}
              onClick={() => onPick(o)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left text-[0.98rem] shadow-[0_3px_0_rgb(var(--line))] transition active:translate-y-[2px] active:shadow-none ${choiceCls(state)}`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line text-xs font-bold text-muted">{i + 1}</span>
              <span className="flex-1">{labels?.[o] ?? o}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Associar pares: toque num termo e depois na definição. */
function Pairs({ a, onDone }: { a: Extract<Activity, { kind: 'pairs' }>; onDone: (ok: boolean) => void }) {
  const { sfx } = useFx();
  const left = useMemo(() => shuffle(a.pairs.map((p) => p.term)), [a]);
  const right = useMemo(() => shuffle(a.pairs.map((p) => p.definition)), [a]);
  const [selL, setSelL] = useState<string>();
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string>();
  const [mistakes, setMistakes] = useState(0);
  const pick = (def: string) => {
    if (!selL) return;
    const ok = a.pairs.find((p) => p.term === selL)?.definition === def;
    if (ok) {
      sfx('ok');
      const m = [...matched, selL];
      setMatched(m);
      setSelL(undefined);
      if (m.length === a.pairs.length) window.setTimeout(() => onDone(mistakes === 0), 350);
    } else {
      sfx('bad');
      setMistakes((n) => n + 1);
      setWrong(def);
      window.setTimeout(() => setWrong(undefined), 450);
    }
  };
  const matchedDefs = a.pairs.filter((p) => matched.includes(p.term)).map((p) => p.definition);
  return (
    <div className="grid grid-cols-2 gap-2">
      <ul className="space-y-2">
        {left.map((t) => (
          <li key={t}>
            <button
              type="button"
              disabled={matched.includes(t)}
              onClick={() => setSelL(t)}
              className={`w-full rounded-2xl border-2 p-2.5 text-left text-sm font-semibold shadow-[0_3px_0_rgb(var(--line))] transition ${matched.includes(t) ? 'border-ok/50 bg-ok/10 text-ok opacity-60' : selL === t ? choiceCls('sel') : choiceCls('idle')}`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {right.map((d) => (
          <li key={d}>
            <button
              type="button"
              disabled={matchedDefs.includes(d)}
              onClick={() => pick(d)}
              className={`w-full rounded-2xl border-2 p-2.5 text-left text-xs leading-snug shadow-[0_3px_0_rgb(var(--line))] transition ${matchedDefs.includes(d) ? 'border-ok/50 bg-ok/10 opacity-60' : wrong === d ? 'anim-shake border-bad bg-bad/10' : choiceCls('idle')}`}
            >
              {d}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Gate da trilha (reformulação, Fase 3): a Prática só abre depois do Aprender do mesmo trecho. */
export function PracticePage() {
  const { chapterId = '', sectionId = '' } = useParams();
  const { data } = useStudy();
  const chapter = getChapter(chapterId);
  const section = chapter?.sections.find((s) => s.id === sectionId);
  if (chapter && section && !practiceUnlocked(data, chapter, sectionId)) {
    return (
      <section className="card mx-auto mt-6 max-w-xl p-5" aria-label="Prática bloqueada">
        <p className="text-sm font-semibold text-leaf">Ainda não</p>
        <h1 className="mt-1 text-2xl">Primeiro, aprenda este trecho</h1>
        <p className="mt-2 text-muted">
          A prática de <b className="text-ink">{section.title.replace(/^\d+\.\s*/, '')}</b> só cobra o que já foi ensinado. Conclua o Aprender deste trecho e ela abre em seguida.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/aprender/${chapterId}/${sectionId}`} className="btn-primary flex-1">
            <Icon name="play" size={18} fill="currentColor" /> Ir para o Aprender
          </Link>
          <Link to="/trilha" className="btn-ghost flex-1">
            Ver a trilha
          </Link>
        </div>
      </section>
    );
  }
  return <PracticeRun key={`${chapterId}:${sectionId}`} />;
}

function PracticeRun() {
  const { chapterId = '', sectionId = '' } = useParams();
  const navigate = useNavigate();
  const chapter = getChapter(chapterId);
  const section = chapter?.sections.find((s) => s.id === sectionId);
  const extras = getSectionExtras(chapterId, sectionId);
  const simple = getSimpleSection(chapterId, sectionId);
  const { data, update } = useStudy();
  const { sfx, confetti } = useFx();
  const startXp = useMemo(() => totalXp(data), []); // eslint-disable-line react-hooks/exhaustive-deps
  // Trecho com unidade interativa: as palavras da prática vêm só dos conceitos já ensinados (gate).
  const glossary = useMemo(() => {
    const unit = getLearningUnit(chapterId, sectionId);
    if (!unit) return undefined;
    const taught = taughtConcepts(data, learningUnits);
    return concepts.filter((c) => unit.conceptIds.includes(c.id) && taught.has(c.id)).map((c) => ({ term: c.term, definition: c.definition }));
  }, [chapterId, sectionId]); // eslint-disable-line react-hooks/exhaustive-deps
  const questionHistoryKey = `cronicas:questoes-pratica:${chapterId}:${sectionId}`;
  const recentQuestionIds = useMemo<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(questionHistoryKey) ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  }, [questionHistoryKey]);
  const initial = useMemo(
    () => (chapter ? buildPractice(chapter, sectionId, questionsForContest(DEFAULT_CONTEST_ID), extras, Math.random, simple, glossary, recentQuestionIds) : []),
    [chapter, sectionId, extras, simple, glossary, recentQuestionIds],
  );
  useEffect(() => {
    const selected = initial.filter((activity) => activity.kind === 'mcq').map((activity) => activity.kind === 'mcq' ? activity.question.id : '');
    if (!selected.length) return;
    try {
      const previous: unknown = JSON.parse(localStorage.getItem(questionHistoryKey) ?? '[]');
      const previousIds = Array.isArray(previous) ? previous.filter((id): id is string => typeof id === 'string') : [];
      localStorage.setItem(questionHistoryKey, JSON.stringify([...selected, ...previousIds.filter((id) => !selected.includes(id))].slice(0, 18)));
    } catch {
      // Sem armazenamento, a rodada segue variando normalmente em memória.
    }
  }, [initial, questionHistoryKey]);
  // Fila, fase e acertos guardados: ao voltar, a prática continua na mesma atividade.
  type Saved = { queue: Activity[]; phase: 'intro' | 'play' | 'done'; firstTry: Record<string, boolean>; total: number };
  const session = useSession<Saved>(
    practiceId(chapterId, sectionId),
    () => ({ queue: initial, phase: 'intro', firstTry: {}, total: initial.length }),
    (s) => (s.phase === 'play' ? `Praticar: atividade ${s.total - s.queue.length + 1} de ${s.total}` : 'Praticar'),
    { resume: false },
  );
  const { queue, phase } = session.state;
  const firstTry = session.state.firstTry;
  const setQueue = (q: Activity[]) => session.setState((s) => ({ ...s, queue: q }));
  const setPhase = (p: Saved['phase']) => session.setState((s) => ({ ...s, phase: p }));
  const setFirstTry = (f: (x: Record<string, boolean>) => Record<string, boolean>) => session.setState((s) => ({ ...s, firstTry: f(s.firstTry) }));
  const [value, setValue] = useState<string>();
  const [sentenceIndexes, setSentenceIndexes] = useState<number[]>([]);
  const [multiBlankValues, setMultiBlankValues] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<Verdict>();
  const [combo, setCombo] = useState(0);
  const [help, setHelp] = useState(false);
  const act = queue[0];
  const booleanChoices = useMemo(() => shuffle(['v', 'f']), [act?.id]);

  if (!chapter || !section) return <p>Trecho não encontrado.</p>;
  const total = session.state.total;
  const progress = phase === 'done' ? 1 : Math.min(1, Math.max(0, (total - queue.length) / Math.max(1, total)));
  const correctFirst = Object.values(firstTry).filter(Boolean).length;
  const score = total ? Math.round((correctFirst / total) * 100) : 100;

  const judge = (ok: boolean, title: string, detail?: string) => {
    // Errou: além da explicação, prepara um item equivalente com outros dados (quando existe).
    const recovery = !ok && act ? recoveryFor(act, { chapter, sectionId, bank: questionsForContest(DEFAULT_CONTEST_ID), simple, queue, glossary }) : undefined;
    setVerdict({ ok, title, detail, recovery });
    sfx(ok ? 'ok' : 'bad');
    setCombo((c) => (ok ? c + 1 : 0));
    if (act && !isRecovery(act.id) && !(act.id in firstTry)) setFirstTry((f) => ({ ...f, [act.id]: ok }));
    if (act?.kind === 'mcq' && value) update((d) => recordAnswer(d, act.question, value, 'practice', `pratica:${chapterId}:${sectionId}`).data);
  };

  const check = () => {
    if (!act) return;
    if (act.kind === 'multiBlank') {
      const ok = multiBlankValues.length === act.answers.length && act.answers.every((answer, i) => multiBlankValues[i] === answer);
      judge(ok, ok ? 'Definição completada!' : 'Revise as lacunas.', act.why);
      return;
    }
    if (act.kind === 'build') {
      const built = sentenceIndexes.map((i) => act.words[i]);
      const ok = built.length === act.answer.length && built.every((word, i) => word === act.answer[i]);
      judge(ok, ok ? 'Frase montada corretamente!' : 'Ainda não. Revise a ordem das palavras.', act.why);
      return;
    }
    if (value === undefined) return;
    if (act.kind === 'tf') {
      const ok = (value === 'v') === act.answer;
      judge(ok, ok ? 'Correto!' : `É ${act.answer ? 'verdadeiro' : 'falso'}.`, act.why);
    } else if (act.kind === 'blank') {
      const ok = value === act.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${act.answer}`, act.why);
    } else if (act.kind === 'term') {
      const ok = value === act.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${act.answer}`, ok ? undefined : `${act.answer} é: ${act.definition}`);
    } else if (act.kind === 'mcq') {
      const q = act.question;
      const ok = value === q.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${q.answer}`, ok ? q.options.find((o) => o.key === q.answer)?.comment : q.explanation);
    }
  };

  const next = () => {
    const ok = !!verdict?.ok;
    const recovery = verdict?.recovery;
    setVerdict(undefined);
    setValue(undefined);
    setSentenceIndexes([]);
    setMultiBlankValues([]);
    // Errou: vem logo adiante um item equivalente com outros dados; sem equivalente, a mesma volta no fim.
    const q = nextQueue(queue, ok, recovery);
    if (q.length === 0) {
      const finalScore = total ? Math.round((Object.values({ ...firstTry }).filter(Boolean).length / total) * 100) : 100;
      update((d) => completePractice(d, chapterId, sectionId, finalScore).data);
      session.finish();
      sfx('done');
      if (finalScore >= 70) confetti(finalScore === 100 ? 110 : 60);
      setPhase('done');
    }
    setQueue(q);
  };

  // Sair explicitamente encerra só a sessão incompleta; a próxima abertura sorteia outra rodada.
  // As conclusões e o histórico de respostas já registrados continuam salvos.
  const exit = () => { session.finish(); navigate('/trilha'); };

  return (
    <div className="-mt-2 flex min-h-0 flex-col overflow-hidden" style={{ height: "calc(100dvh - 5.5rem - env(safe-area-inset-top, 0px))" }}>
      {/* Topo: sair, progresso e sequência */}
      <div className="mb-4 flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={exit} aria-label="Sair da prática">
          <Icon name="errado" size={22} />
        </button>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full rounded-full bg-ok transition-all duration-500" style={{ width: `${progress * 100}%` }} />
        </div>
        {simple && phase === 'play' && (
          <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => setHelp(true)} aria-label="Palavras do trecho">
            <Icon name="pergaminho" size={20} />
          </button>
        )}
        <span className={`inline-flex items-center gap-1 text-sm font-bold ${combo >= 2 ? 'anim-hop text-ember' : 'text-muted'}`} aria-label={`Sequência de ${combo}`}>
          <Icon name="chama" size={18} strokeWidth={2.2} /> {combo}
        </span>
      </div>

      {help && simple && (
        <Portal>
        <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/40 p-3" onClick={() => setHelp(false)}>
          <div className="anim-toast-in my-auto h-fit w-full max-w-md rounded-[1.8rem] bg-bg p-4 shadow-2xl" role="dialog" aria-label="Palavras do trecho" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg">Palavras do trecho</h2>
              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-raised" onClick={() => setHelp(false)} aria-label="Fechar">
                <Icon name="errado" size={18} />
              </button>
            </div>
            <dl className="space-y-2">
              {simple.words.map((w) => (
                <div key={w.term} className="rounded-xl bg-raised/60 px-3 py-2">
                  <dt className="font-bold">{w.term}</dt>
                  <dd className="text-sm text-muted">{w.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        </Portal>
      )}

      {phase === 'intro' && (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="mb-3">
            <StepGuide chapterId={chapterId} sectionId={sectionId} current="praticar" compact />
          </div>
          <p className="rubric text-sm font-semibold">{chapter.title}</p>
          <h1 className="text-2xl leading-tight">Prática: {section.title.replace(/^\d+\.\s*/, '')}</h1>
          <div className="mt-6 flex items-end gap-2">
            <Mascot mood="talk" size={92} />
            <SpeechBubble className="anim-toast-in mb-8 flex-1">
              {extras?.scene?.length
                ? `${extras.scene[extras.scene.length - 1].text}`
                : 'Vamos ver o que ficou deste trecho. Errou? A pergunta volta no fim até você acertar.'}
            </SpeechBubble>
          </div>
          <p className="text-sm text-muted">{total} atividades curtas. Começa fácil e vai ficando mais difícil. Errou? A atividade volta no fim.</p>
          <div className="mt-auto pt-6">
            <button className="btn-primary w-full" onClick={() => setPhase('play')} disabled={!total}>
              <Icon name="play" size={18} fill="currentColor" /> Começar
            </button>
            <Link to={simple ? `/aprender/${chapterId}/${sectionId}` : `/capitulo/${chapterId}#${sectionId}`} className="btn-ghost mt-2 w-full">
              <Icon name="grimorio" size={18} /> Rever a explicação
            </Link>
          </div>
        </div>
      )}

      {phase === 'play' && act && (
        <div className="flex min-h-0 flex-1 flex-col">
          <div key={act.id + queue.length} className="anim-tile-in min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2">
            {act.kind === 'tf' && (
              <>
                <p className="text-sm font-semibold text-muted">Verdadeiro ou falso?</p>
                <p className="mb-5 mt-2 font-display text-xl leading-snug">{act.statement}</p>
                <Choices options={booleanChoices} labels={{ v: 'Verdadeiro', f: 'Falso' }} answer={act.answer ? 'v' : 'f'} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'blank' && (
              <>
                <p className="text-sm font-semibold text-muted">Complete a frase</p>
                <p className="mb-5 mt-2 font-display text-xl leading-snug">
                  {act.sentence.split('___').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`mx-1 inline-block min-w-[4rem] rounded-lg border-b-2 px-2 text-center ${value ? 'border-[#2c5f6e] text-[#2c5f6e]' : 'border-muted text-transparent'}`}>{value ?? '____'}</span>
                      )}
                    </span>
                  ))}
                </p>
                <Choices options={act.options} answer={act.answer} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'multiBlank' && (
              <>
                <p className="text-sm font-semibold text-muted">Complete mais de uma lacuna</p>
                <p className="mb-4 mt-2 text-base leading-relaxed">{act.prompt}</p>
                <div className="rounded-2xl border border-line bg-surface p-4 font-serif text-lg leading-[2.4]" aria-label="Frase com lacunas">
                  {act.sentence.split('___').map((part, i, parts) => (
                    <span key={`${i}-${part}`}>
                      {part}
                      {i < parts.length - 1 && (
                        <label className="mx-1 inline-flex align-middle">
                          <span className="sr-only">{'Palavra ausente ' + (i + 1)}</span>
                          <select
                            aria-label={'Palavra ausente ' + (i + 1)}
                            disabled={!!verdict}
                            value={multiBlankValues[i] ?? ''}
                            onChange={(e) => setMultiBlankValues((current) => {
                              const next = [...current];
                              next[i] = e.target.value;
                              return next;
                            })}
                            className="max-w-[8rem] rounded-lg border-2 border-[#2e7182]/50 bg-[#d6e7e6] px-2 py-1 font-sans text-sm font-semibold text-[#172e34] focus:outline-none focus:ring-2 focus:ring-[#c8402a]"
                          >
                            <option value="">Escolher</option>
                            {act.options.map((option) => (
                              <option key={option} value={option} disabled={multiBlankValues.some((selected, slot) => slot !== i && selected === option)}>{option}</option>
                            ))}
                          </select>
                        </label>
                      )}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted">Use cada palavra uma vez. As opções incluem termos parecidos de outras definições.</p>
              </>
            )}

            {act.kind === 'term' && (
              <>
                <p className="text-sm font-semibold text-muted">Qual é o termo?</p>
                <p className="mb-5 mt-2 rounded-2xl border border-line bg-surface p-4 font-serif text-lg leading-snug">{act.definition}</p>
                <Choices options={act.options} answer={act.answer} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'pairs' && (
              <>
                <p className="mb-4 text-sm font-semibold text-muted">Associe cada termo à sua definição</p>
                <Pairs a={act} onDone={(ok) => judge(ok, ok ? 'Pares perfeitos!' : 'Pares completos', ok ? undefined : 'Houve tropeços no caminho; a rodada volta a esta atividade no fim.')} />
              </>
            )}
            {act.kind === 'build' && (
              <>
                <p className="text-sm font-semibold text-muted">Montagem de frase</p>
                <p className="mb-4 mt-2 font-display text-xl leading-snug">{act.prompt}</p>
                <div className="min-h-20 rounded-2xl border-2 border-dashed border-[#2e7182]/50 bg-[#d6e7e6]/60 p-3" role="group" aria-label="Frase montada">
                  {sentenceIndexes.length ? (
                    <div className="flex flex-wrap gap-2">
                      {sentenceIndexes.map((wordIndex, slot) => (
                        <button
                          key={`${wordIndex}-${slot}`}
                          type="button"
                          disabled={!!verdict}
                          onClick={() => setSentenceIndexes((current) => current.filter((_, i) => i !== slot))}
                          className="rounded-lg bg-[#2e7182] px-2.5 py-2 text-sm font-semibold text-white shadow-sm"
                          aria-label={`Remover palavra ${act.words[wordIndex]}`}
                        >
                          {act.words[wordIndex]} <span aria-hidden="true" className="ml-1 opacity-70">×</span>
                        </button>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted">Toque nas palavras abaixo para montar a frase.</p>}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {act.words.map((word, i) => {
                    const selected = sentenceIndexes.includes(i);
                    return (
                      <button
                        key={`${word}-${i}`}
                        type="button"
                        disabled={selected || !!verdict}
                        onClick={() => setSentenceIndexes((current) => [...current, i])}
                        className={`min-h-11 rounded-xl border-2 px-2 py-2 text-left text-sm font-medium transition ${selected ? 'border-line bg-raised/50 opacity-35' : 'border-line bg-surface hover:border-[#c8402a] hover:bg-[#f3d7ca]/50'}`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
                {sentenceIndexes.length > 0 && !verdict && (
                  <button type="button" className="mt-3 text-sm font-semibold text-[#c8402a] underline" onClick={() => setSentenceIndexes([])}>
                    Recomeçar frase
                  </button>
                )}
              </>
            )}

            {act.kind === 'mcq' && (
              <>
                <p className="text-sm font-semibold text-muted">Questão no estilo da prova</p>
                <QuestionStem text={act.question.stem} className="mb-4 mt-2" />
                <Choices
                  options={act.question.options.map((o) => o.key)}
                  labels={Object.fromEntries(act.question.options.map((o) => [o.key, `${o.key}) ${o.text}`]))}
                  answer={act.question.answer}
                  locked={!!verdict}
                  value={value}
                  onPick={setValue}
                />
              </>
            )}
          </div>

          {/* Painel de resposta */}
          {act.kind !== 'pairs' && !verdict && (
            <div className="mt-4 shrink-0 bg-bg pb-2 pt-2">
              <button className="btn-primary w-full" disabled={act.kind === 'build' ? sentenceIndexes.length === 0 : act.kind === 'multiBlank' ? act.answers.some((_, i) => !multiBlankValues[i]) : value === undefined} onClick={check}>
                Verificar
              </button>
            </div>
          )}
          {verdict && (
            <div className={`anim-toast-in -mx-4 mt-4 shrink-0 rounded-t-[1.6rem] px-4 pb-4 pt-4 sm:-mx-6 sm:px-6 ${verdict.ok ? 'bg-[#dcefd8] text-[#1f4d1c]' : 'bg-[#f6d9d2] text-[#6b1f12]'}`} role="status">
              <p className="flex items-center gap-2 text-lg font-bold">
                <Icon name={verdict.ok ? 'certo' : 'errado'} size={22} strokeWidth={2.6} /> {verdict.title}
              </p>
              {verdict.detail && <p className="mt-1 text-sm leading-snug">{verdict.detail}</p>}
              {!verdict.ok && (
                <p className="mt-1 text-sm font-semibold leading-snug">
                  {verdict.recovery ? 'Logo adiante vem uma parecida, com outro exemplo, para firmar a ideia.' : 'Esta volta no fim da rodada para você tentar de novo.'}
                </p>
              )}
              <button className={`mt-3 w-full rounded-full px-5 py-3 font-bold text-white shadow-md ${verdict.ok ? 'bg-[#3d7d42]' : 'bg-[#aa3d2a]'}`} onClick={next}>
                Continuar
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto overscroll-contain text-center">
          <div className="flex items-end gap-2">
            <Mascot mood={score >= 70 ? 'cheer' : 'talk'} size={104} />
            <SpeechBubble className="anim-toast-in mb-10 max-w-[15rem] text-left">
              {extras?.outro ?? (score >= 70 ? 'Muito bem! A névoa recua deste trecho.' : 'Os erros voltaram até você acertar. Isso também é aprender.')}
            </SpeechBubble>
          </div>
          <h1 className="mt-2 text-2xl">Trecho praticado!</h1>
          <div className="mt-4 grid w-full grid-cols-3 gap-2">
            <span className="rounded-2xl border-2 border-[#e8b13b] p-2">
              <b className="block text-xl text-[#9a5b20]">+{totalXp(data) - startXp}</b>
              <span className="text-xs text-muted">pontos</span>
            </span>
            <span className="rounded-2xl border-2 border-ok p-2">
              <b className="block text-xl text-ok">{score}%</b>
              <span className="text-xs text-muted">de primeira</span>
            </span>
            <span className="rounded-2xl border-2 border-[#2c5f6e] p-2">
              <b className="block text-xl text-[#2c5f6e]">{total}</b>
              <span className="text-xs text-muted">atividades</span>
            </span>
          </div>
          <div className="mt-auto w-full pt-6">
            <button className="btn-primary w-full" onClick={exit}>
              Continuar a trilha
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
