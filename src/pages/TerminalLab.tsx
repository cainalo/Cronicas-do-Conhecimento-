import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { PageHeader } from '@/components/Page';
import {
  createTerminalState,
  getTerminalLab,
  isTerminalLabComplete,
  restoreTerminalState,
  runTerminalCommand,
  type TerminalLab,
  type TerminalState,
} from '@/lib/terminal';
import { logUnit } from '@/lib/pace';

const storageKey = (id: string) => 'cronicas:terminal-lab:v1:' + id;
const formatPath = (cwd: string) => cwd === '/home/aprendiz'
  ? '~'
  : cwd.startsWith('/home/aprendiz/')
    ? '~' + cwd.slice('/home/aprendiz'.length)
    : cwd;

function initialState(lab: TerminalLab): TerminalState {
  try {
    const raw = localStorage.getItem(storageKey(lab.id));
    return raw ? restoreTerminalState(lab.id, JSON.parse(raw)) : createTerminalState(lab.id);
  } catch {
    return createTerminalState(lab.id);
  }
}

export function TerminalLabPage() {
  const { id } = useParams();
  const lab = getTerminalLab(id);
  if (!lab) {
    return (
      <div className="space-y-4">
        <PageHeader area="explorar" title="Laboratório de TI" subtitle="Escolha um laboratório a partir da trilha." />
        <Link to="/trilha" className="btn-primary">Voltar à trilha</Link>
      </div>
    );
  }
  return <TerminalLabRun key={lab.id} lab={lab} />;
}

function TerminalLabRun({ lab }: { lab: TerminalLab }) {
  const { update } = useStudy();
  const [state, setState] = useState<TerminalState>(() => initialState(lab));
  const [command, setCommand] = useState('');
  const completed = isTerminalLabComplete(lab.id, state);
  const pathLabel = formatPath(state.cwd);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(lab.id), JSON.stringify(state));
    } catch {
      // O laboratório continua funcional quando o armazenamento local não está disponível.
    }
  }, [lab.id, state]);

  // O ponto da trilha só se conclui quando todas as tarefas são cumpridas, não ao abrir a tela.
  useEffect(() => {
    if (completed) update((data) => logUnit(data, 'laboratorio:' + lab.id));
  }, [completed, lab.id, update]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!command.trim()) return;
    const next = runTerminalCommand(state, command);
    setState(next.state);
    setCommand('');
  };

  const reset = () => {
    setState(createTerminalState(lab.id));
    setCommand('');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        area="explorar"
        title={lab.title}
        subtitle={lab.subtitle}
        art="suporte"
      />

      <section className="rounded-2xl border border-line bg-raised/70 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#dce9dc] text-[#234f35]" aria-hidden="true">
            <span className="font-mono text-lg font-bold">&gt;_</span>
          </span>
          <div className="min-w-0">
            <h2 className="font-semibold">Sua missão</h2>
            <p className="mt-1 text-sm leading-relaxed">{lab.objective}</p>
          </div>
        </div>
        <p className="mt-3 rounded-xl border border-line bg-surface px-3 py-2 text-xs leading-relaxed text-muted">
          Ambiente didático isolado. Os comandos usam sintaxe familiar, mas atuam em arquivos e processos virtuais.
          Nada é executado no seu celular, no site publicado ou em um servidor real. Algumas saídas são amostras
          preparadas para você investigar com segurança.
        </p>
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)]">
        <section className="min-w-0 overflow-hidden rounded-2xl border border-[#333d3a] bg-[#17211f] text-[#e8eee9]" aria-label="Terminal de treinamento">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#202c29] px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold">Terminal Linux</p>
              <p className="truncate font-mono text-[11px] text-[#a7b9ae]">aprendiz@cronicas:{pathLabel}</p>
            </div>
            <span className="rounded-md border border-[#789c7d]/50 px-2 py-1 font-mono text-[10px] text-[#b8d7bc]">VIRTUAL</span>
          </div>

          <div className="space-y-3 p-3 sm:p-4" role="log" aria-live="polite" aria-label="Histórico de comandos">
            {state.history.length === 0 ? (
              <div className="space-y-2 py-2 font-mono text-xs leading-relaxed text-[#b3c5ba]">
                <p>Crônicas Shell 1.0 · ambiente de prática</p>
                <p>Digite <code className="text-[#e6d89c]">help</code> para conhecer os comandos disponíveis.</p>
                <p>Comece por <code className="text-[#e6d89c]">{lab.suggestions[0]}</code>.</p>
              </div>
            ) : (
              state.history.map((entry) => (
                <div key={entry.id} className="space-y-1.5 font-mono text-xs leading-relaxed">
                  <p className="break-words text-[#9ed7aa]">
                    <span className="text-[#7e9b87]">aprendiz@cronicas:{formatPath(entry.cwd ?? state.cwd)}$</span> {entry.command}
                  </p>
                  {entry.output && (
                    <pre className={\`whitespace-pre-wrap break-words pl-1 \${entry.exitCode === 0 ? 'text-[#d4ded7]' : 'text-[#ffb3a9]'}\`}>{entry.output}</pre>
                  )}
                  {entry.exitCode !== 0 && <p className="text-[10px] text-[#ffb3a9]">Código de saída: {entry.exitCode}</p>}
                </div>
              ))
            )}
            {completed && (
              <div className="rounded-xl border border-[#6a9a73]/60 bg-[#25412e] p-3 text-sm text-[#d9f1dc]" role="status">
                <p className="font-semibold">Laboratório concluído.</p>
                <p className="mt-1 text-xs leading-relaxed">Você concluiu as tarefas desta etapa. O progresso foi registrado na trilha.</p>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="border-t border-white/10 bg-[#202c29] p-3 sm:p-4">
            <label htmlFor="terminal-command" className="mb-2 block text-xs font-semibold text-[#c9d8ce]">Digite um comando</label>
            <div className="flex min-w-0 gap-2">
              <span className="flex shrink-0 items-center font-mono text-sm text-[#9ed7aa]" aria-hidden="true">$</span>
              <input
                id="terminal-command"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="Ex.: pwd"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#101715] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#9ed7aa]"
                aria-label="Comando de terminal"
                maxLength={500}
              />
              <button type="submit" className="rounded-lg bg-[#a6d4ac] px-3 py-2 text-sm font-bold text-[#17351f] hover:bg-[#c2e6c7]" aria-label="Executar comando">
                Executar
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] text-[#a7b9ae]">Enter executa · comandos perigosos são bloqueados</p>
              <button type="button" onClick={reset} className="text-xs font-semibold text-[#c9d8ce] underline underline-offset-2">
                Reiniciar ambiente
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Etapas do exercício</h2>
              <span className="text-xs tabular-nums text-muted">{state.completedTasks.length}/{lab.tasks.length}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised" aria-label={\`Progresso \${Math.round(state.completedTasks.length / lab.tasks.length * 100)}%\`}>
              <div className="h-full rounded-full bg-[#52875c] transition-[width]" style={{ width: \`\${state.completedTasks.length / lab.tasks.length * 100}%\` }} />
            </div>
            <ol className="mt-4 space-y-3">
              {lab.tasks.map((task, index) => {
                const done = state.completedTasks.includes(task.id);
                return (
                  <li key={task.id} className="flex items-start gap-3">
                    <span className={\`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold \${done ? 'border-[#52875c] bg-[#dce9dc] text-[#234f35]' : 'border-line text-muted'}\`} aria-label={done ? 'Concluída' : 'Pendente'}>
                      {done ? '✓' : index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={\`text-sm leading-snug \${done ? 'font-semibold' : ''}\`}>{task.title}</p>
                      <details className="mt-1">
                        <summary className="cursor-pointer text-xs font-semibold text-muted underline underline-offset-2">Ver dica</summary>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{task.hint}</p>
                      </details>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="rounded-2xl border border-line bg-raised/60 p-4">
            <h2 className="font-semibold">Comandos de referência</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">Toque para preencher o terminal; você ainda executa e observa o resultado.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {lab.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setCommand(suggestion)}
                  className="max-w-full break-all rounded-lg border border-line bg-surface px-2.5 py-2 text-left font-mono text-xs hover:border-[#52875c]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="font-semibold">Próximo passo</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Depois de concluir as tarefas, volte à trilha e siga para a próxima etapa. O estado deste laboratório
              fica salvo neste aparelho.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="/trilha" className="btn-primary">Voltar à trilha</Link>
              {lab.id === 'processos-linux' && <Link to="/escritorio" className="btn-ghost">Voltar ao mapa</Link>}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
