import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Icon } from '@/components/Icon';
import { executeTerminalCommand, type TerminalState } from '@/lib/terminal-lab';

export type OfficeTerminalMode = 'diagnostico' | 'resolucao';
export type OfficeTerminalAction = 'term' | 'kill9';
export interface OfficeTerminalStep { id: string; label: string; done: boolean }

export function officeTerminalProgress(state: TerminalState, mode: OfficeTerminalMode, action: OfficeTerminalAction = 'term'): { steps: OfficeTerminalStep[]; completed: number; total: number; done: boolean } {
  const commands = state.commands.map((value) => value.trim());
  const lastIndex = (pattern: RegExp) => {
    for (let i = commands.length - 1; i >= 0; i--) if (pattern.test(commands[i])) return i;
    return -1;
  };
  if (mode === 'diagnostico') {
    const topAt = lastIndex(/^top$/i);
    const vmstatAt = lastIndex(/^vmstat\s+2$/i);
    const steps = [
      { id: 'top', label: 'Executou top para observar processos e memória', done: topAt >= 0 },
      { id: 'vmstat', label: 'Executou vmstat 2 para observar as trocas de memória', done: vmstatAt >= 0 },
    ];
    const completed = steps.filter((step) => step.done).length;
    return { steps, completed, total: steps.length, done: completed === steps.length };
  }
  const killPattern = action === 'kill9' ? /^kill\s+-9\s+4127$/i : /^kill\s+4127$/i;
  const killAt = lastIndex(killPattern);
  const freeAt = lastIndex(/^free\s+-h$/i);
  const serviceAt = lastIndex(/^systemctl\s+status\s+relat-api(?:\.service)?$/i);
  const steps = [
    { id: 'kill', label: action === 'kill9' ? 'Executou a decisão escolhida: kill -9 4127' : 'Enviou o pedido de encerramento: kill 4127', done: killAt >= 0 },
    { id: 'free', label: 'Executou free -h depois da ação e conferiu a recuperação da memória', done: killAt >= 0 && freeAt > killAt },
    { id: 'service', label: 'Confirmou que relat-api continua ativo com systemctl status', done: freeAt >= 0 && serviceAt > freeAt },
  ];
  const completed = steps.filter((step) => step.done).length;
  return { steps, completed, total: steps.length, done: completed === steps.length };
}

export function OfficeTerminal({ mode, state, setState, evidenceRecorded, expectedAction = 'term', onComplete }: {
  mode: OfficeTerminalMode; state: TerminalState; setState: Dispatch<SetStateAction<TerminalState>>;
  evidenceRecorded: boolean; expectedAction?: OfficeTerminalAction; onComplete: () => void;
}) {
  const [command, setCommand] = useState('');
  const progress = officeTerminalProgress(state, mode, expectedAction);
  const title = mode === 'diagnostico' ? 'Terminal de investigação · relat-01' : 'Console de recuperação · relat-01';
  const hints = mode === 'diagnostico'
    ? [{ label: 'top', command: 'top' }, { label: 'vmstat 2', command: 'vmstat 2' }]
    : [
        { label: expectedAction === 'kill9' ? 'kill -9 4127' : 'kill 4127', command: expectedAction === 'kill9' ? 'kill -9 4127' : 'kill 4127' },
        { label: 'free -h', command: 'free -h' },
        { label: 'systemctl status relat-api', command: 'systemctl status relat-api' },
      ];
  useEffect(() => {
    if (progress.done && !evidenceRecorded) onComplete();
  }, [progress.done, evidenceRecorded, onComplete]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!command.trim()) return;
    setState(executeTerminalCommand(state, command).state);
    setCommand('');
  };
  return (
    <div className="mt-3 space-y-3" data-testid="escritorio-terminal" data-mode={mode}>
      <div className="rounded-xl border border-[#34514f] bg-[#101b22] text-[#edf4ef]">
        <div className="flex items-center gap-2 rounded-t-xl border-b border-[#34514f] bg-[#192831] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c8402a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#d4a017]" /><span className="h-2.5 w-2.5 rounded-full bg-[#556b2f]" />
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-[#b6c4c3]">{title}</span>
        </div>
        <div className="max-h-40 min-h-24 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed sm:text-xs" data-testid="escritorio-terminal-output" aria-live="polite">
          {state.transcript.slice(-24).map((line, index) => (
            <div key={index} className="mb-2">
              {line.command && <p className="break-words text-[#d4a017]"><span className="text-[#75c5a8]">aluno@relat-01:</span>{line.cwd === '/home/aluno' ? '~' : line.cwd} $ {line.command}</p>}
              {line.output && <pre className="mt-1 whitespace-pre-wrap break-words text-[#dce8e4]">{line.output}</pre>}
            </div>
          ))}
          <p className="text-[#75c5a8]">aluno@relat-01:{state.cwd === '/home/aluno' ? '~' : state.cwd} $ <span className="text-[#b6c4c3]">terminal virtual de treinamento</span></p>
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-[#34514f] bg-[#192831] p-2.5">
          <label htmlFor="office-terminal-command" className="sr-only">Comando do terminal do escritório</label>
          <span className="font-mono text-sm text-[#75c5a8]">$</span>
          <input id="office-terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} placeholder="Digite um comando Linux…" className="min-w-0 flex-1 rounded-lg border border-[#34514f] bg-[#101b22] px-3 py-2.5 font-mono text-sm text-[#edf4ef] placeholder:text-[#8da39f] focus:border-[#d4a017] focus:outline-none" data-testid="escritorio-terminal-input" />
          <button type="submit" className="grid min-h-10 min-w-10 place-items-center rounded-lg bg-[#c8402a] text-white" aria-label="Executar comando no escritório" data-testid="escritorio-terminal-run"><Icon name="avancar" size={17} /></button>
        </form>
      </div>
      <section className="rounded-xl border border-line bg-raised/50 p-3" aria-label="Evidências exigidas nesta etapa">
        <div className="flex items-center justify-between gap-2"><p className="kicker">{mode === 'diagnostico' ? 'Investigação' : 'Validação da correção'}</p><span className="text-xs font-semibold tabular-nums text-muted">{progress.completed}/{progress.total}</span></div>
        <ol className="mt-2 space-y-2">
          {progress.steps.map((step, index) => (
            <li key={step.id} className="flex items-start gap-2 text-xs leading-relaxed">
              <span className={'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ' + (step.done ? 'bg-ok text-white' : 'border border-line text-muted')}>{step.done ? <Icon name="certo" size={12} /> : index + 1}</span>
              <span className={step.done ? 'text-ink' : 'text-muted'}>{step.label}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex flex-wrap gap-2">
          {hints.map((hint) => <button key={hint.command} type="button" onClick={() => setCommand(hint.command)} className="rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] font-semibold text-teal hover:bg-raised">Sugerir <code>{hint.label}</code></button>)}
        </div>
        {evidenceRecorded
          ? <p className="mt-3 flex items-start gap-2 text-xs font-semibold text-ok"><Icon name="certo" size={15} /> Evidências registradas no caderno. Volte à equipe para continuar o chamado.</p>
          : progress.done
            ? <p className="mt-3 text-xs text-muted">Comandos completos. Registrando as evidências no caderno…</p>
            : <p className="mt-3 text-xs text-muted">Digite os comandos. A evidência só será liberada depois das verificações necessárias.</p>}
      </section>
      <p className="text-[11px] leading-relaxed text-muted">Este é um terminal de treinamento: os comandos seguem sintaxe Linux, mas executam em um ambiente virtual isolado e não alteram o celular nem um servidor real.</p>
    </div>
  );
}
