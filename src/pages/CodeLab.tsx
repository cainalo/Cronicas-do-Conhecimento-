import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { logUnit } from '@/lib/pace';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import {
  CODING_EXERCISES,
  codingExercisePassed,
  runJavaScriptSubset,
  type CodeRunResult,
  type CodeValue,
} from '@/lib/code-lab';

const STORAGE_KEY = 'cronicas:coding-lab:v1';
interface CodingSession {
  activeId: string;
  source: Record<string, string>;
  passed: string[];
  results: Record<string, CodeRunResult>;
}
function freshSession(): CodingSession {
  return {
    activeId: CODING_EXERCISES[0].id,
    source: Object.fromEntries(CODING_EXERCISES.map((exercise) => [exercise.id, exercise.starterCode])),
    passed: [],
    results: {},
  };
}
function loadSession(): CodingSession {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<CodingSession> | null;
    const initial = freshSession();
    if (!saved) return initial;
    return {
      activeId: CODING_EXERCISES.some((x) => x.id === saved.activeId) ? saved.activeId! : initial.activeId,
      source: { ...initial.source, ...(saved.source ?? {}) },
      passed: Array.isArray(saved.passed) ? saved.passed.filter((id) => CODING_EXERCISES.some((x) => x.id === id)) : [],
      results: saved.results ?? {},
    };
  } catch {
    return freshSession();
  }
}
function showValue(value: CodeValue): string {
  return value === null ? 'null' : String(value);
}

export function CodeLabPage() {
  const [searchParams] = useSearchParams();
  const { data, update } = useStudy();
  const [session, setSession] = useState<CodingSession>(loadSession);
  const active = CODING_EXERCISES.find((exercise) => exercise.id === session.activeId) ?? CODING_EXERCISES[0];
  const source = session.source[active.id] ?? active.starterCode;
  const result = session.results[active.id];
  const passed = session.passed.includes(active.id);
  const completed = CODING_EXERCISES.filter((exercise) => session.passed.includes(exercise.id)).length;
  const done = completed === CODING_EXERCISES.length;
  const unitKey = searchParams.get('u') ?? 'laboratorio:codigo';
  const variables = useMemo(() => Object.entries(result?.variables ?? {}), [result]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(session)); } catch { /* a sessão continua em memória */ }
  }, [session]);

  useEffect(() => {
    if (!done || data.unitLog?.[unitKey]) return;
    update((current) => logUnit(current, unitKey));
  }, [done, data.unitLog, unitKey, update]);

  const chooseExercise = (id: string) => setSession((current) => ({ ...current, activeId: id }));
  const changeSource = (value: string) => setSession((current) => ({
    ...current,
    source: { ...current.source, [active.id]: value },
  }));
  const run = (event: FormEvent) => {
    event.preventDefault();
    const output = runJavaScriptSubset(source);
    const success = output.ok && codingExercisePassed(active, source, output.output);
    const finalResult: CodeRunResult = success
      ? { ...output, output: output.output || 'Execução concluída.' }
      : output;
    setSession((current) => ({
      ...current,
      results: { ...current.results, [active.id]: finalResult },
      passed: success ? Array.from(new Set([...current.passed, active.id])) : current.passed,
    }));
  };
  const resetCurrent = () => setSession((current) => ({
    ...current,
    source: { ...current.source, [active.id]: active.starterCode },
    results: Object.fromEntries(Object.entries(current.results).filter(([id]) => id !== active.id)),
  }));

  return (
    <div className="space-y-5">
      <PageHeader area="explorar" title="Laboratório de programação" subtitle="Escreva código JavaScript, execute-o e observe a saída. Aprenda fazendo, sem depender de perguntas de múltipla escolha." art="suporte">
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">JavaScript · modo iniciante</span>
          <span className="rounded-full bg-raised px-3 py-1 text-xs text-muted">{completed}/{CODING_EXERCISES.length} desafios</span>
        </div>
      </PageHeader>

      <section className="rounded-2xl border border-teal/30 bg-teal/5 p-4" data-testid="codigo-sandbox-notice">
        <div className="flex items-start gap-3">
          <Icon name="escudo" size={22} className="shrink-0 text-teal" />
          <div>
            <h2 className="font-semibold">Código de verdade, execução controlada</h2>
            <p className="mt-1 text-sm text-muted">Você escreve JavaScript e o laboratório interpreta a sintaxe suportada: variáveis, expressões, <code>console.log</code> e <code>if/else</code>. Ele não usa <code>eval</code>, não acessa a internet nem o seu aparelho. Loops e APIs externas ainda não fazem parte deste primeiro módulo.</p>
          </div>
        </div>
      </section>

      <nav className="grid gap-2 sm:grid-cols-3" aria-label="Desafios de programação">
        {CODING_EXERCISES.map((exercise, index) => {
          const isPassed = session.passed.includes(exercise.id);
          const current = exercise.id === active.id;
          return (
            <button key={exercise.id} type="button" onClick={() => chooseExercise(exercise.id)} aria-current={current ? 'step' : undefined} className={'rounded-xl border p-3 text-left transition-colors ' + (current ? 'border-teal bg-teal/10' : 'border-line bg-surface hover:bg-raised')}>
              <span className="flex items-center justify-between gap-2">
                <span className="kicker">Desafio {index + 1}</span>
                {isPassed ? <Icon name="certo" size={17} className="text-ok" /> : <Icon name="play" size={16} className="text-muted" />}
              </span>
              <span className="mt-1 block font-semibold leading-snug">{exercise.title}</span>
            </button>
          );
        })}
      </nav>

      <section className="card space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="kicker">{passed ? 'Objetivo atingido' : 'Objetivo do desafio'}</p>
            <h2 className="mt-1 text-xl leading-snug">{active.title}</h2>
            <p className="mt-2 text-sm text-muted">{active.goal}</p>
          </div>
          {passed && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ok/10 px-2.5 py-1 text-xs font-semibold text-ok"><Icon name="certo" size={14} /> Concluído</span>}
        </div>

        <form onSubmit={run} className="overflow-hidden rounded-2xl border border-[#34514f] bg-[#101b22] text-[#edf4ef]">
          <div className="flex items-center gap-2 border-b border-[#34514f] bg-[#192831] px-3 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c8402a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#556b2f]" />
            <span className="min-w-0 flex-1 text-center text-xs text-[#b6c4c3]">main.js · editor interativo</span>
            <button type="button" onClick={resetCurrent} className="text-xs text-[#b6c4c3] underline underline-offset-2">Restaurar exemplo</button>
          </div>
          <label htmlFor="codigo-editor" className="sr-only">Código JavaScript do desafio</label>
          <textarea
            id="codigo-editor"
            value={source}
            onChange={(event) => changeSource(event.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="min-h-[15rem] w-full resize-y bg-[#101b22] p-4 font-mono text-sm leading-6 text-[#e7f0eb] outline-none focus:ring-2 focus:ring-inset focus:ring-[#d4a017]"
            aria-describedby="codigo-comandos"
            data-testid="codigo-editor"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#34514f] bg-[#192831] p-3">
            <p id="codigo-comandos" className="text-xs text-[#b6c4c3]">Ctrl/⌘+Enter não é necessário: use o botão Executar.</p>
            <button type="submit" className="btn-primary !min-h-[42px]" data-testid="codigo-executar"><Icon name="play" size={16} /> Executar código</button>
          </div>
        </form>

        <section className="overflow-hidden rounded-xl border border-line" aria-label="Console de saída">
          <div className="flex items-center gap-2 bg-raised px-3 py-2">
            <Icon name="tela" size={16} />
            <h3 className="text-sm font-semibold">Console de saída</h3>
            <span className="ml-auto text-xs text-muted">{result ? (result.ok ? 'Execução concluída' : 'Erro de execução') : 'Aguardando execução'}</span>
          </div>
          <div className="min-h-24 bg-[#101b22] p-4 font-mono text-sm text-[#dce8e4]" data-testid="codigo-output" aria-live="polite">
            {result ? result.error ? (
              <p className="whitespace-pre-wrap text-[#f2a08d]">{result.error}</p>
            ) : (
              <>
                <pre className="whitespace-pre-wrap break-words">{result.output || '(sem saída no console)'}</pre>
                {variables.length > 0 && (
                  <div className="mt-3 border-t border-[#34514f] pt-3">
                    <p className="mb-2 text-xs uppercase tracking-wider text-[#8da39f]">Variáveis após executar</p>
                    <div className="flex flex-wrap gap-2">
                      {variables.map(([name, value]) => <span key={name} className="rounded-md bg-[#192831] px-2 py-1 text-xs"><span className="text-[#75c5a8]">{name}</span> = {showValue(value)}</span>)}
                    </div>
                  </div>
                )}
                {codingExercisePassed(active, source, result.output) && (
                  <p className="mt-3 flex items-start gap-2 border-t border-[#34514f] pt-3 font-sans text-sm text-[#9bddb3]"><Icon name="certo" size={17} /> Objetivo cumprido. Você pode seguir para o próximo desafio.</p>
                )}
              </>
            ) : (
              <p className="text-[#8da39f]">A saída do console aparecerá aqui quando você executar o código.</p>
            )}
          </div>
        </section>

        <div className="rounded-xl bg-raised/70 p-3">
          <p className="text-sm font-semibold">Dica</p>
          <p className="mt-1 text-sm text-muted">{active.hint}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" className="btn-ghost flex-1" disabled={!passed && !result} onClick={() => chooseExercise(CODING_EXERCISES[Math.min(CODING_EXERCISES.length - 1, CODING_EXERCISES.findIndex((x) => x.id === active.id) + 1)].id)}>
            Próximo desafio <Icon name="avancar" size={15} />
          </button>
          <Link to="/trilha" className="btn-ghost flex-1">Voltar à trilha</Link>
        </div>
      </section>

      {done && (
        <section className="card space-y-3 border border-ok/30 p-4" data-testid="codigo-conclusao">
          <p className="kicker text-ok">Trilha prática concluída</p>
          <h2 className="text-xl">Você executou os três desafios.</h2>
          <p className="text-sm text-muted">Você declarou variáveis, calculou valores e usou uma condição para mudar o comportamento do programa. Agora tente modificar os números e prever a saída antes de executar.</p>
          <Link to="/trilha" className="btn-primary w-full">Continuar a trilha <Icon name="avancar" size={16} /></Link>
        </section>
      )}
    </div>
  );
}
