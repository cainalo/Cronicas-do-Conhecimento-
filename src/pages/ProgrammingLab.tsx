import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/Page';
import { Icon } from '@/components/Icon';

type OutputLine = { kind: 'log' | 'error'; text: string };
type TerminalState = { cwd: string; files: Record<string, string>; directories: string[] };

const START_FILES: Record<string, string> = {
  '/home/aluno/README.md': 'Ambiente fictício de treinamento do Pórtico.\nUse help para listar os comandos disponíveis.',
  '/home/aluno/atividade.js': 'console.log("Olá, laboratório!");',
  '/home/aluno/logs/app.log': 'INFO 08:00 aplicação iniciada\nWARN 08:05 tentativa sem autenticação\nINFO 08:06 serviço normalizado',
};
const START_DIRS = ['/', '/home', '/home/aluno', '/home/aluno/logs', '/home/aluno/projetos'];
const INITIAL_TERMINAL: TerminalState = { cwd: '/home/aluno', files: START_FILES, directories: START_DIRS };

function pathFrom(cwd: string, path: string) {
  if (!path || path === '.') return cwd;
  const parts = (path.startsWith('/') ? path : cwd + '/' + path).split('/');
  const out: string[] = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') out.pop();
    else out.push(part);
  }
  return '/' + out.join('/');
}

function terminalCommand(input: string, state: TerminalState): { state: TerminalState; output: string[]; clear?: boolean } {
  const raw = input.trim();
  if (!raw) return { state, output: [] };
  const [cmd, ...args] = raw.split(/\s+/);
  const rest = args.join(' ');
  const unavailable = (name: string) => ['bash: ' + name + ': operação não disponível no simulador didático.'];
  if (cmd === 'clear') return { state, output: [], clear: true };
  if (cmd === 'help') return { state, output: [
    'Comandos: help, pwd, whoami, uname -a, ls, cd, cat, grep, touch, mkdir, echo, node --version, python --version, git status, git log --oneline, tree, clear',
    'Dica: use cat logs/app.log e grep WARN logs/app.log para investigar o registro.',
    'Limite: terminal virtual; os comandos não alteram o Android nem um servidor real.',
  ] };
  if (cmd === 'pwd') return { state, output: [state.cwd] };
  if (cmd === 'whoami') return { state, output: ['aluno'] };
  if (cmd === 'uname') return { state, output: ['Linux portico-lab 6.1.0-edu #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux (saída simulada)'] };
  if (cmd === 'node' && rest === '--version') return { state, output: ['v22.0.0 (versão didática simulada)'] };
  if (cmd === 'python' && (rest === '--version' || rest === '-V')) return { state, output: ['Python 3.12.0 (versão didática simulada)'] };
  if (cmd === 'ls') {
    const prefix = state.cwd === '/' ? '/' : state.cwd + '/';
    const dirs = state.directories.filter((d) => d.startsWith(prefix) && d !== state.cwd).map((d) => d.slice(prefix.length)).filter((s) => s && !s.includes('/')).map((s) => s + '/');
    const files = Object.keys(state.files).filter((f) => f.startsWith(prefix)).map((f) => f.slice(prefix.length)).filter((s) => s && !s.includes('/'));
    return { state, output: [...dirs, ...files].sort() };
  }
  if (cmd === 'cd') {
    const next = pathFrom(state.cwd, args[0] ?? '/home/aluno');
    if (state.directories.includes(next)) return { state: { ...state, cwd: next }, output: [] };
    return { state, output: ['bash: cd: ' + (args[0] ?? '') + ': diretório não encontrado'] };
  }
  if (cmd === 'cat') {
    const target = pathFrom(state.cwd, args[0] ?? '');
    return { state, output: target in state.files ? state.files[target].split('\n') : ['cat: ' + (args[0] ?? '') + ': arquivo não encontrado'] };
  }
  if (cmd === 'grep') {
    const needle = args[0];
    const target = pathFrom(state.cwd, args[1] ?? '');
    if (!needle || !(target in state.files)) return { state, output: ['Uso: grep TEXTO arquivo'] };
    const matches = state.files[target].split('\n').filter((line) => line.includes(needle));
    return { state, output: matches.length ? matches : [] };
  }
  if (cmd === 'mkdir' || cmd === 'touch') {
    const name = args[0];
    if (!name) return { state, output: ['Uso: ' + cmd + ' nome'] };
    const target = pathFrom(state.cwd, name);
    if (cmd === 'mkdir') {
      if (state.directories.includes(target) || target in state.files) return { state, output: ['mkdir: ' + name + ': já existe'] };
      return { state: { ...state, directories: [...state.directories, target] }, output: ['diretório criado: ' + target] };
    }
    if (target in state.files || state.directories.includes(target)) return { state, output: ['touch: ' + name + ': já existe'] };
    return { state: { ...state, files: { ...state.files, [target]: '' } }, output: ['arquivo criado: ' + target] };
  }
  if (cmd === 'echo') {
    const redirect = raw.match(/^echo\s+(.+?)\s*>\s*(\S+)$/);
    if (redirect) {
      const target = pathFrom(state.cwd, redirect[2]);
      if (!(target in state.files)) return { state, output: ['bash: ' + redirect[2] + ': crie o arquivo primeiro com touch'] };
      return { state: { ...state, files: { ...state.files, [target]: redirect[1].replace(/^['"]|['"]$/g, '') } }, output: ['texto gravado no arquivo (simulado)'] };
    }
    return { state, output: [raw.slice(5).replace(/^['"]|['"]$/g, '')] };
  }
  if (cmd === 'git' && rest === 'status') return { state, output: [
    'On branch main (repositório fictício)',
    'Changes not staged for commit: use o laboratório de Git guiado para praticar staging e commits.',
    'nothing was altered in a real repository',
  ] };
  if (cmd === 'git' && rest.startsWith('log')) return { state, output: ['a81c104 feat: adiciona exercícios', 'b3270ef docs: registra a atividade', '0f19d7a init: cria projeto de treino'] };
  if (cmd === 'tree') return { state, output: ['/home/aluno/', '├── README.md', '├── atividade.js', '├── logs/', '│   └── app.log', '└── projetos/'] };
  if (cmd === 'npm' && rest === 'test') return { state, output: ['Test suite simulada: 8 testes aprovados, 0 falhas.', 'Saída ilustrativa; nenhum teste real foi executado neste terminal.'] };
  if (cmd === 'npm' && rest === 'run build') return { state, output: ['Build simulado: dist/ criado sem erros.', 'Saída ilustrativa; nenhum build real foi executado neste terminal.'] };
  if (['sudo', 'rm', 'curl', 'wget', 'ssh', 'scp', 'shutdown', 'reboot', 'dd'].includes(cmd)) return { state, output: unavailable(cmd) };
  return { state, output: ['bash: ' + cmd + ': comando não encontrado. Digite help.'] };
}

// Worker descartável: sem DOM, rede ou acesso ao sistema de arquivos do aparelho; é encerrado em 1,5 s.
const WORKER_SOURCE = [
  "const deny = () => Promise.reject(new Error('Rede desativada neste laboratório.'));",
  "self.fetch = deny;",
  "self.XMLHttpRequest = class { constructor() { throw new Error('Acesso à rede desativado.'); } };",
  "self.WebSocket = undefined; self.EventSource = undefined; self.WebTransport = undefined;",
  "self.RTCPeerConnection = undefined; self.Worker = undefined; self.SharedWorker = undefined;",
  "self.importScripts = () => { throw new Error('Carregar scripts externos está desativado.'); };",
  "function format(value) { if (typeof value === 'string') return value; try { const s = JSON.stringify(value); return s === undefined ? String(value) : s; } catch { return String(value); } }",
  "const send = (kind, text) => self.postMessage({ kind, text: String(text) });",
  "const outputConsole = { log: (...v) => send('log', v.map(format).join(' ')), info: (...v) => send('log', v.map(format).join(' ')), warn: (...v) => send('log', 'Aviso: ' + v.map(format).join(' ')), error: (...v) => send('error', v.map(format).join(' ')), clear: () => self.postMessage({ kind: 'clear' }) };",
  "self.console = outputConsole;",
  "self.onmessage = (event) => { try { (new Function('console', event.data))(outputConsole); } catch (error) { send('error', error && error.stack ? error.stack : String(error)); } self.postMessage({ kind: 'done' }); };",
].join('\n');

export function ProgrammingLabPage() {
  const [code, setCode] = useState('const assunto = "sistemas operacionais";\nconst comandos = ["pwd", "ls", "cat README.md"];\nconsole.log("Estudando:", assunto);\nconsole.log("Comandos da prática:", comandos);\nconsole.log("Total de comandos:", comandos.length);');
  const [output, setOutput] = useState<OutputLine[]>([{ kind: 'log', text: 'A saída do JavaScript aparecerá aqui. Pressione Executar código.' }]);
  const [running, setRunning] = useState(false);
  const [command, setCommand] = useState('');
  const [terminalState, setTerminalState] = useState<TerminalState>(INITIAL_TERMINAL);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Terminal didático pronto. Digite help para começar.']);
  const workerRef = useRef<Worker | null>(null);
  const workerUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const stopWorker = () => {
    workerRef.current?.terminate();
    workerRef.current = null;
    if (workerUrlRef.current) URL.revokeObjectURL(workerUrlRef.current);
    workerUrlRef.current = null;
    if (timeoutRef.current !== undefined) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  };

  useEffect(() => () => stopWorker(), []);

  const runCode = () => {
    stopWorker();
    setOutput([]);
    setRunning(true);
    try {
      const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
      workerUrlRef.current = url;
      const worker = new Worker(url);
      workerRef.current = worker;
      worker.onmessage = (event: MessageEvent<{ kind: string; text?: string }>) => {
        if (event.data.kind === 'log' || event.data.kind === 'error') {
          setOutput((lines) => [...lines, { kind: event.data.kind as OutputLine['kind'], text: event.data.text ?? '' }]);
        }
        if (event.data.kind === 'clear') setOutput([]);
        if (event.data.kind === 'done') {
          stopWorker();
          setRunning(false);
        }
      };
      worker.onerror = (event) => {
        setOutput((lines) => [...lines, { kind: 'error', text: event.message || 'Erro ao executar o código.' }]);
        stopWorker();
        setRunning(false);
      };
      worker.postMessage(code);
      timeoutRef.current = window.setTimeout(() => {
        stopWorker();
        setRunning(false);
        setOutput((lines) => [...lines, { kind: 'error', text: 'Tempo limite de 1,5 segundo atingido. O código foi interrompido para proteger a página.' }]);
      }, 1500);
    } catch (error) {
      stopWorker();
      setRunning(false);
      setOutput([{ kind: 'error', text: error instanceof Error ? error.message : 'Não foi possível iniciar o ambiente.' }]);
    }
  };

  const runTerminal = (event: FormEvent) => {
    event.preventDefault();
    const raw = command;
    const result = terminalCommand(raw, terminalState);
    setTerminalState(result.state);
    if (result.clear) setTerminalOutput([]);
    else setTerminalOutput((lines) => [...lines, 'aluno@portico:' + terminalState.cwd + '$ ' + raw, ...result.output].slice(-120));
    setCommand('');
  };

  return (
    <div className="space-y-4 pb-5">
      <PageHeader area="explorar" icon="tela" title="Laboratório de programação" subtitle="Escreva código, observe a execução e treine comandos de terminal em um ambiente didático isolado." />

      <section className="card space-y-3 p-4" aria-labelledby="code-lab-title">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/15 text-teal"><Icon name="tela" size={20} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="code-lab-title" className="text-lg font-semibold">1. Bancada de JavaScript</h2>
            <p className="text-sm text-muted">JavaScript real em uma thread isolada. A rede e as APIs de acesso ao dispositivo ficam desativadas; este não é um ambiente Node.js.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-[#171b24]">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-xs text-white/70">
            <span>atividade.js</span><span>JavaScript · UTF-8</span>
          </div>
          <label htmlFor="program-code" className="sr-only">Código JavaScript</label>
          <textarea
            id="program-code"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="min-h-52 w-full resize-y bg-transparent p-3 font-mono text-sm leading-relaxed text-[#e8edf7] outline-none"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary flex-1" onClick={runCode} disabled={running}>
            <Icon name={running ? 'chama' : 'play'} size={16} /> {running ? 'Executando…' : 'Executar código'}
          </button>
          <button type="button" className="btn-ghost" onClick={() => { stopWorker(); setRunning(false); setCode('console.log("Olá, mundo!");\nconsole.log(2 + 3);'); setOutput([]); }}>
            Limpar e recomeçar
          </button>
        </div>
        <section className="rounded-xl border border-line bg-bg p-3" aria-label="Saída do código">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Console de saída</h3>
            <span className="text-xs text-muted">{running ? 'Em execução' : 'Pronto'}</span>
          </div>
          <pre className="min-h-16 whitespace-pre-wrap break-words font-mono text-sm" aria-live="polite">{output.length ? output.map((line, index) => <span key={index} className={'block ' + (line.kind === 'error' ? 'text-bad' : 'text-ink')}>{line.text}</span>) : <span className="text-muted">Sem saída.</span>}</pre>
        </section>
      </section>

      <section className="card space-y-3 p-4" aria-labelledby="terminal-lab-title">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ember/15 text-ember"><Icon name="tela" size={20} /></span>
          <div>
            <h2 id="terminal-lab-title" className="text-lg font-semibold">2. Terminal Linux didático</h2>
            <p className="text-sm text-muted">O terminal imita um pequeno sistema de arquivos. Os comandos não são enviados ao Android, ao servidor ou a uma shell real.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-[#111714]">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-xs text-[#b3c8b8]">
            <span>aluno@portico</span><span>simulador · sem acesso ao sistema</span>
          </div>
          <div className="max-h-64 space-y-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed text-[#d8e7dc]" aria-live="polite">
            {terminalOutput.map((line, index) => <pre key={index} className="whitespace-pre-wrap break-words">{line}</pre>)}
          </div>
          <form onSubmit={runTerminal} className="flex items-center gap-2 border-t border-white/10 px-3 py-2 font-mono text-xs">
            <label htmlFor="terminal-command" className="shrink-0 text-[#8dd5a7]">$</label>
            <input id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} autoCapitalize="off" autoCorrect="off" spellCheck={false} placeholder="help" className="min-w-0 flex-1 bg-transparent py-1 text-[#f3fff5] outline-none placeholder:text-[#748d7c]" />
            <button type="submit" className="rounded-lg bg-[#24553b] px-3 py-2 font-bold text-white">Enter</button>
          </form>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {['help', 'pwd', 'ls', 'cat logs/app.log', 'grep WARN logs/app.log', 'git status'].map((example) => (
            <button key={example} type="button" className="btn-ghost !min-h-[34px] !px-2.5 font-mono" onClick={() => setCommand(example)}>{example}</button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-line p-4">
        <h2 className="font-semibold">Como usar esta bancada</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>Altere as variáveis e execute o código; observe como o valor impresso muda.</li>
          <li>No terminal, navegue com <code>cd</code>, liste arquivos com <code>ls</code> e leia registros com <code>cat</code>/<code>grep</code>.</li>
          <li>Use o escritório de TI 2D e os simuladores para aplicar o que aprendeu em situações de trabalho.</li>
        </ol>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/escritorio" className="btn-ghost text-sm">Abrir escritório de TI 2D</Link>
          <Link to="/simulador" className="btn-ghost text-sm">Ver laboratórios práticos</Link>
        </div>
      </section>
    </div>
  );
}
