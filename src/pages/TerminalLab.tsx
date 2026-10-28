import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { Icon, type IconName } from '@/components/Icon';
import { PageHeader, SectionTitle } from '@/components/Page';
import { logUnit } from '@/lib/pace';
import {
  createTerminalState,
  executeTerminalCommand,
  getTerminalLab,
  TERMINAL_LABS,
  terminalLabProgress,
  type TerminalState,
  type VirtualEntry,
} from '@/lib/terminal-lab';

const STORE = (id: string) => 'cronicas:terminal-lab:v1:' + id;
type LabTab = 'terminal' | 'arquivos' | 'processos';
const LAB_ICON: Record<string, IconName> = { processos: 'dados', arquivos: 'lista', shell: 'tela', rede: 'rede' };
const PROCESS_ROWS = [
  { pid: '1', user: 'root', cpu: '0.1%', mem: '0.4%', status: 'systemd', color: 'text-ok' },
  { pid: '418', user: 'relat', cpu: '78.4%', mem: '15.6%', status: 'relat-api', color: 'text-bad' },
  { pid: '602', user: 'postgres', cpu: '12.1%', mem: '5.4%', status: 'postgres', color: 'text-gold' },
  { pid: '811', user: 'aluno', cpu: '0.0%', mem: '0.1%', status: 'bash', color: 'text-muted' },
];

function loadState(id: string): TerminalState {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE(id)) ?? 'null') as TerminalState | null;
    if (parsed && typeof parsed.cwd === 'string' && parsed.files && Array.isArray(parsed.commands) && Array.isArray(parsed.transcript)) return parsed;
  } catch {
    // Armazenamento inválido: iniciar uma sessão de laboratório limpa.
  }
  return createTerminalState();
}

function modeLabel(entry: VirtualEntry) {
  const mode = entry.mode.padStart(3, '0').slice(-3);
  const bits = (digit: string) => {
    const value = Number(digit);
    return (value & 4 ? 'r' : '-') + (value & 2 ? 'w' : '-') + (value & 1 ? 'x' : '-');
  };
  return (entry.kind === 'dir' ? 'd' : '-') + bits(mode[0]) + bits(mode[1]) + bits(mode[2]);
}

export function TerminalLabPage() {
  const { id } = useParams();
  if (!id) return <TerminalLabCatalog />;
  const lab = getTerminalLab(id);
  if (!lab) {
    return (
      <div className="space-y-4">
        <PageHeader area="explorar" title="Laboratório não encontrado" subtitle="Escolha uma das práticas disponíveis." />
        <Link to="/laboratorios" className="btn-primary">Ver laboratórios <Icon name="avancar" size={16} /></Link>
      </div>
    );
  }
  return <TerminalWorkbench key={lab.id} labId={lab.id} />;
}

function TerminalLabCatalog() {
  return (
    <div className="space-y-6">
      <PageHeader area="explorar" crumb={false} title="Laboratórios práticos" subtitle="Aprenda fazendo: use comandos Linux, navegue por arquivos e investigue problemas de sistemas." art="suporte" />
      <section className="rounded-2xl border border-teal/30 bg-teal/5 p-4" data-testid="terminal-sandbox-notice">
        <div className="flex items-start gap-3">
          <Icon name="tela" size={22} className="shrink-0 text-teal" />
          <div>
            <h2 className="font-semibold">Um ambiente para experimentar com segurança</h2>
            <p className="mt-1 text-sm text-muted">Os comandos têm sintaxe real e o terminal responde com saídas de um Linux de treinamento. O sistema de arquivos é virtual: nada é executado no seu celular nem altera o Android.</p>
          </div>
        </div>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        {TERMINAL_LABS.map((lab, index) => (
          <Link key={lab.id} to={'/laboratorio/' + lab.id} className="card card-interactive flex min-h-40 flex-col p-4" data-testid={'terminal-lab-' + lab.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="kicker">{lab.eyebrow}</span>
              <Icon name={LAB_ICON[lab.id]} size={22} className="text-teal" />
            </div>
            <h2 className="mt-2 text-xl leading-tight">{lab.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{lab.summary}</p>
            <p className="mt-3 flex items-center justify-between text-sm font-semibold text-teal">
              <span>{lab.duration}</span><span className="inline-flex items-center gap-1">Abrir prática <Icon name="avancar" size={15} /></span>
            </p>
          </Link>
        ))}
      </div>
      <Link to="/trilha" className="btn-ghost w-full">Voltar à trilha</Link>
    </div>
  );
}

function TerminalWorkbench({ labId }: { labId: string }) {
  const lab = getTerminalLab(labId)!;
  const { data, update } = useStudy();
  const [state, setState] = useState<TerminalState>(() => loadState(labId));
  const [command, setCommand] = useState('');
  const [tab, setTab] = useState<LabTab>('terminal');
  const [selectedFile, setSelectedFile] = useState('/var/log/relat-01.log');
  const transcriptRef = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => terminalLabProgress(lab, state), [lab, state]);
  const unitKey = 'laboratorio:' + lab.id;

  useEffect(() => {
    try { localStorage.setItem(STORE(labId), JSON.stringify(state)); } catch { /* a sessão continua em memória */ }
  }, [labId, state]);

  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [state.transcript]);

  useEffect(() => {
    if (progress.done && !data.unitLog?.[unitKey]) update((current) => logUnit(current, unitKey));
  }, [progress.done, data.unitLog, unitKey, update]);

  const submitCommand = (event: FormEvent) => {
    event.preventDefault();
    if (!command.trim()) return;
    const result = executeTerminalCommand(state, command);
    setState(result.state);
    setCommand('');
    setTab('terminal');
  };

  const suggest = (value: string) => {
    const first = value.split(/\s+→\s+|\s+e\s+/)[0].trim();
    setCommand(first);
    setTab('terminal');
  };
  const changeDirectory = (path: string) => {
    setState((current) => ({ ...current, cwd: path }));
    setTab('terminal');
  };
  const files = Object.entries(state.files).sort(([a, av], [b, bv]) => {
    if (av.kind !== bv.kind) return av.kind === 'dir' ? -1 : 1;
    return a.localeCompare(b);
  });
  const selected = state.files[selectedFile];

  return (
    <div className="space-y-5">
      <PageHeader area="explorar" title={lab.title} subtitle={lab.goal} art="suporte">
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">{lab.eyebrow}</span>
          <span className="rounded-full bg-raised px-3 py-1 text-xs text-muted">{lab.duration}</span>
          <span className="rounded-full bg-raised px-3 py-1 text-xs text-muted">{progress.completed}/{progress.total} objetivos</span>
        </div>
      </PageHeader>

      <section className="card space-y-3 p-4" aria-label="Objetivos do laboratório">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="kicker">Missão de trabalho</p>
            <h2 className="mt-1 text-lg leading-snug">{lab.goal}</h2>
          </div>
          {progress.done && <span className="inline-flex items-center gap-1 rounded-full bg-ok/10 px-2.5 py-1 text-xs font-semibold text-ok"><Icon name="certo" size={14} /> Concluído</span>}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-raised" aria-label={'Progresso ' + progress.completed + ' de ' + progress.total}>
          <div className="h-full rounded-full bg-teal transition-[width]" style={{ width: (progress.completed / progress.total * 100) + '%' }} />
        </div>
        <ol className="space-y-2">
          {progress.steps.map((step, index) => (
            <li key={step.id} className={'rounded-xl border p-3 ' + (step.done ? 'border-ok/30 bg-ok/5' : 'border-line')}>
              <div className="flex items-start gap-3">
                <span className={'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ' + (step.done ? 'border-ok bg-ok text-white' : 'border-line text-muted')}>
                  {step.done ? <Icon name="certo" size={14} /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.instruction}</p>
                  <button type="button" className="mt-2 text-sm font-semibold text-teal underline underline-offset-4" onClick={() => suggest(step.hint)}>
                    Sugerir comando: <code>{step.hint}</code>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#34514f] bg-[#101b22] text-[#edf4ef]" aria-label="Ambiente de computador simulado">
        <div className="flex items-center gap-2 border-b border-[#34514f] bg-[#192831] px-3 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c8402a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#556b2f]" />
          <div className="min-w-0 flex-1 text-center text-xs text-[#b6c4c3]">aluno@relat-01 · Pórtico Lab OS</div>
          <button type="button" className="text-xs text-[#b6c4c3] underline underline-offset-2" onClick={() => setState(createTerminalState())}>Reiniciar</button>
        </div>
        <div className="flex gap-1 border-b border-[#34514f] bg-[#13232b] p-2" role="tablist" aria-label="Ferramentas do laboratório">
          {([
            ['terminal', 'Terminal'],
            ['arquivos', 'Arquivos'],
            ['processos', 'Processos'],
          ] as [LabTab, string][]).map(([key, title]) => (
            <button key={key} type="button" role="tab" aria-selected={tab === key} className={'rounded-lg px-3 py-2 text-sm ' + (tab === key ? 'bg-[#0f4c5c] text-white' : 'text-[#b6c4c3] hover:bg-[#223944]')} onClick={() => setTab(key)}>
              {title}
            </button>
          ))}
        </div>

        {tab === 'terminal' && (
          <>
            <div ref={transcriptRef} className="h-[19rem] overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm" data-testid="terminal-output" aria-live="polite">
              {state.transcript.map((line, index) => (
                <div key={index} className="mb-3">
                  {line.command && <p className="break-words text-[#d4a017]"><span className="text-[#75c5a8]">aluno@relat-01:</span>{line.cwd === '/home/aluno' ? '~' : line.cwd} $ {line.command}</p>}
                  {line.output && <pre className="mt-1 whitespace-pre-wrap break-words text-[#dce8e4]">{line.output}</pre>}
                </div>
              ))}
              <p className="text-[#75c5a8]">aluno@relat-01:{state.cwd === '/home/aluno' ? '~' : state.cwd} $ <span className="text-[#b6c4c3]">| digite o próximo comando abaixo</span></p>
            </div>
            <form onSubmit={submitCommand} className="flex items-center gap-2 border-t border-[#34514f] bg-[#192831] p-3">
              <label htmlFor="linux-command" className="sr-only">Comando do terminal</label>
              <span className="hidden font-mono text-sm text-[#75c5a8] sm:inline">$</span>
              <input id="linux-command" value={command} onChange={(e) => setCommand(e.target.value)} autoComplete="off" spellCheck={false} placeholder="Digite um comando, por exemplo: ls -la" className="min-w-0 flex-1 rounded-lg border border-[#34514f] bg-[#101b22] px-3 py-3 font-mono text-sm text-[#edf4ef] placeholder:text-[#8da39f] focus:border-[#d4a017] focus:outline-none" data-testid="terminal-input" />
              <button type="submit" className="grid min-h-11 min-w-11 place-items-center rounded-lg bg-[#c8402a] text-white" aria-label="Executar comando" data-testid="terminal-run"><Icon name="avancar" size={19} /></button>
            </form>
          </>
        )}

        {tab === 'arquivos' && (
          <div className="grid gap-0 sm:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]" data-testid="terminal-file-browser">
            <div className="max-h-[20rem] overflow-y-auto border-b border-[#34514f] p-2 sm:border-b-0 sm:border-r">
              {files.map(([path, entry]) => (
                <button key={path} type="button" className={'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-mono text-xs ' + (selectedFile === path ? 'bg-[#0f4c5c] text-white' : 'text-[#c3d4cf] hover:bg-[#223944]')} onClick={() => {
                  setSelectedFile(path);
                  if (entry.kind === 'dir') changeDirectory(path);
                }}>
                  <Icon name={entry.kind === 'dir' ? 'tela' : 'livro'} size={14} />
                  <span className="min-w-0 flex-1 break-all">{path}</span>
                </button>
              ))}
            </div>
            <div className="min-h-40 p-3">
              {selected ? (
                <>
                  <p className="break-all font-mono text-xs text-[#d4a017]">{selectedFile}</p>
                  <p className="mt-1 text-xs text-[#8da39f]">{selected.kind === 'dir' ? 'Diretório' : 'Arquivo'} · {modeLabel(selected)} · dono: {selected.owner}</p>
                  {selected.kind === 'file' ? <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[#dce8e4]">{selected.content}</pre> : <p className="mt-3 text-sm text-[#b6c4c3]">Abra o terminal e use <code>cd</code> e <code>ls</code> para navegar por este diretório.</p>}
                </>
              ) : <p className="text-sm text-[#b6c4c3]">Selecione um arquivo para ver seu conteúdo.</p>}
            </div>
          </div>
        )}

        {tab === 'processos' && (
          <div className="overflow-x-auto p-3" data-testid="terminal-process-monitor">
            <p className="mb-3 text-sm text-[#b6c4c3]">Visão de referência dos processos deste cenário. Rode <code className="text-[#d4a017]">ps aux</code> ou <code className="text-[#d4a017]">top</code> no terminal para consultar a saída.</p>
            <table className="w-full min-w-[28rem] border-collapse text-left font-mono text-xs">
              <thead><tr className="border-b border-[#34514f] text-[#8da39f]"><th className="p-2">PID</th><th className="p-2">USER</th><th className="p-2">%CPU</th><th className="p-2">%MEM</th><th className="p-2">COMMAND</th></tr></thead>
              <tbody>{PROCESS_ROWS.map((row) => <tr key={row.pid} className="border-b border-[#34514f]/60"><td className="p-2">{row.pid}</td><td className="p-2">{row.user}</td><td className={'p-2 ' + row.color}>{row.cpu}</td><td className="p-2">{row.mem}</td><td className="p-2">{row.status}</td></tr>)}</tbody>
            </table>
            <button type="button" className="btn-primary mt-3" onClick={() => { setCommand('ps aux'); setTab('terminal'); }}>Abrir o comando ps aux <Icon name="avancar" size={15} /></button>
          </div>
        )}
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className="card space-y-2 p-4">
          <p className="kicker">Aprender a interpretar</p>
          <h2 className="text-lg">Não basta decorar o comando</h2>
          <p className="text-sm text-muted">Observe o que mudou na saída, compare os dados e só então decida a próxima ação. Este ambiente usa exemplos controlados para treinar a mesma lógica de diagnóstico.</p>
        </section>
        <section className="card space-y-2 p-4">
          <p className="kicker">Próxima etapa</p>
          <h2 className="text-lg">{progress.done ? 'Prática concluída' : 'Conclua os objetivos'}</h2>
          <p className="text-sm text-muted">{progress.done ? 'Seu avanço foi registrado na trilha. Você pode repetir o laboratório sem perder o registro da conclusão.' : 'Os objetivos são marcados quando você executa os comandos e produz as evidências pedidas.'}</p>
          <Link to="/trilha" className="btn-ghost w-full">Voltar à trilha</Link>
        </section>
      </div>
    </div>
  );
}
