import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { returnToPreviousPage } from '@/lib/navigation';
import { PageHeader } from '@/components/Page';
import { Icon } from '@/components/Icon';

type OutputLine = { kind: 'log' | 'error'; text: string };
type TerminalState = { cwd: string; files: Record<string, string>; directories: string[] };

const START_FILES: Record<string, string> = {
  '/home/aluno/README.md': 'Ambiente virtual de treinamento do Pórtico.\nChamado 2318: investigue por que o servidor relat-01 está lento.',
  '/home/aluno/atividade.js': 'console.log("Olá, laboratório!");',
  '/home/aluno/logs/app.log': 'INFO 08:00 serviço de relatórios iniciado\nWARN 08:30 latência dos relatórios acima de 120 segundos\nWARN 08:31 memória livre 96 MiB; swap usado 1,9 GiB\nINFO 08:32 importador PID 4127 ocupando 71,5% da memória',
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

type TerminalResult = { state: TerminalState; output: string[]; clear?: boolean };

/** Tokenizador didático: entende espaços, aspas simples/duplas e escape com barra invertida. */
function shellWords(input: string): string[] | null {
  const words: string[] = [];
  let current = '';
  let quote: "'" | '"' | null = null;
  let escaped = false;
  let started = false;
  for (const char of input) {
    if (escaped) { current += char; escaped = false; started = true; continue; }
    if (char === '\\' && quote !== "'") { escaped = true; started = true; continue; }
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
      started = true;
      continue;
    }
    if (char === "'" || char === '"') { quote = char; started = true; continue; }
    if (/\s/.test(char)) {
      if (started) { words.push(current); current = ''; started = false; }
      continue;
    }
    current += char;
    started = true;
  }
  if (quote || escaped) return null;
  if (started) words.push(current);
  return words;
}

function directEntries(directory: string, state: TerminalState) {
  const prefix = directory === '/' ? '/' : directory + '/';
  const dirs = state.directories
    .filter((dir) => dir.startsWith(prefix) && dir !== directory)
    .map((dir) => dir.slice(prefix.length))
    .filter((name) => name && !name.includes('/'))
    .map((name) => name + '/');
  const files = Object.keys(state.files)
    .filter((file) => file.startsWith(prefix))
    .map((file) => file.slice(prefix.length))
    .filter((name) => name && !name.includes('/'));
  return [...dirs, ...files].sort();
}

function terminalCommandSingle(input: string, state: TerminalState, stdin?: string[]): TerminalResult {
  const raw = input.trim();
  if (!raw) return { state, output: stdin ?? [] };

  // Implementa redirecionamento comum de shell sem permitir escrita fora da máquina virtual.
  const redirect = raw.match(/^(echo|printf)\s+(.+?)\s*(>>|>)\s*(\S+)$/);
  if (redirect) {
    const before = shellWords(redirect[1] + ' ' + redirect[2]);
    const targetName = shellWords(redirect[4])?.[0];
    if (!before || !targetName) return { state, output: ['bash: erro de sintaxe próximo ao redirecionamento'] };
    const target = pathFrom(state.cwd, targetName);
    const parent = pathFrom(target, '..');
    if (!state.directories.includes(parent)) {
      return { state, output: ['bash: ' + targetName + ': diretório de destino não encontrado'] };
    }
    let value = before.slice(1).join(' ');
    if (redirect[1] === 'echo') value += '\n';
    else value = value.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const previous = state.files[target] ?? '';
    const nextValue = redirect[3] === '>>' ? previous + value : value;
    return {
      state: { ...state, files: { ...state.files, [target]: nextValue } },
      output: [redirect[3] === '>>' ? 'texto acrescentado ao arquivo (simulado)' : 'texto gravado no arquivo (simulado)'],
    };
  }

  const parsed = shellWords(raw);
  if (!parsed) return { state, output: ['bash: aspas ou escape sem fechamento'] };
  const [cmd, ...args] = parsed;
  const rest = args.join(' ');
  const unavailable = (name: string) => ['bash: ' + name + ': operação não disponível no simulador didático.'];

  if (cmd === 'clear') return { state, output: [], clear: true };
  if (cmd === 'help') return { state, output: [
    'Comandos didáticos: pwd, whoami, uname -a, ls [-la] [caminho], cd, cat, grep [-iniv], head, tail, wc -l, find, tree, echo, printf, touch, mkdir [-p], ps, top, git status, git log --oneline, node --version, python --version, clear.',
    'Pipelines: cat logs/app.log | grep WARN  ·  grep WARN logs/app.log | wc -l',
    'O vocabulário e a sintaxe são inspirados em Linux/Bash. A saída é executada neste sistema virtual, sem alterar o Android, o computador ou um servidor real.',
  ] };
  if (cmd === 'pwd') return { state, output: [state.cwd] };
  if (cmd === 'whoami') return { state, output: ['aluno'] };
  if (cmd === 'uname') return rest === '-a'
    ? { state, output: ['Linux portico-lab 6.1.0-edu #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux (sistema virtual)'] }
    : { state, output: ['Uso: uname -a'] };
  if (cmd === 'node' && rest === '--version') return { state, output: ['v22.0.0 (runtime didático simulado)'] };
  if (cmd === 'python' && (rest === '--version' || rest === '-V')) return { state, output: ['Python 3.12.0 (runtime didático simulado)'] };
  if (cmd === 'command' && args[0] === '-v' && args[1] === 'node') return { state, output: ['/usr/bin/node'] };

  if (cmd === 'ls') {
    const flags = args.filter((arg) => arg.startsWith('-'));
    const targetArg = args.find((arg) => !arg.startsWith('-'));
    const target = targetArg ? pathFrom(state.cwd, targetArg === '~' ? '/home/aluno' : targetArg) : state.cwd;
    if (!state.directories.includes(target)) return { state, output: ['ls: não foi possível acessar ' + (targetArg ?? target) + ': arquivo ou diretório não encontrado'] };
    const entries = directEntries(target, state);
    if (flags.some((flag) => flag.includes('a'))) entries.unshift('..', '.');
    const output = flags.some((flag) => flag.includes('l'))
      ? ['total ' + entries.length, ...entries.map((entry) => {
          const path = pathFrom(target, entry.replace(/\/$/, ''));
          const isDir = entry.endsWith('/');
          const size = isDir ? 4096 : (state.files[path] ?? '').length;
          return (isDir ? 'drwxr-xr-x' : '-rw-r--r--') + '  1 aluno aluno ' + String(size).padStart(5) + ' out 29 08:00 ' + entry;
        })]
      : entries;
    return { state, output };
  }

  if (cmd === 'cd') {
    const requested = args[0] ?? '/home/aluno';
    const target = pathFrom(state.cwd, requested === '~' ? '/home/aluno' : requested);
    if (state.directories.includes(target)) return { state: { ...state, cwd: target }, output: [] };
    return { state, output: ['bash: cd: ' + requested + ': diretório não encontrado'] };
  }

  if (cmd === 'cat') {
    if (args.length === 0 && stdin) return { state, output: stdin };
    if (!args.length) return { state, output: ['Uso: cat arquivo'] };
    const output: string[] = [];
    for (const name of args) {
      const target = pathFrom(state.cwd, name);
      if (target in state.files) output.push(...state.files[target].split('\n'));
      else output.push('cat: ' + name + ': arquivo não encontrado');
    }
    return { state, output };
  }

  if (cmd === 'grep') {
    let lineNumbers = false;
    let insensitive = false;
    let invert = false;
    const positionals: string[] = [];
    for (const arg of args) {
      if (arg === '-n') lineNumbers = true;
      else if (arg === '-i') insensitive = true;
      else if (arg === '-v') invert = true;
      else if (arg === '--') continue;
      else if (arg.startsWith('-') && arg.length > 1 && /^[^-]+$/.test(arg.slice(1)) && [...arg.slice(1)].every((c) => 'niv'.includes(c))) {
        lineNumbers ||= arg.includes('n');
        insensitive ||= arg.includes('i');
        invert ||= arg.includes('v');
      } else positionals.push(arg);
    }
    const needle = positionals[0];
    const fileName = positionals[1];
    if (!needle || (!fileName && !stdin)) return { state, output: ['Uso: grep [-n] TEXTO arquivo (ou receba texto por pipeline)'] };
    const file = fileName ? pathFrom(state.cwd, fileName) : '';
    if (fileName && !(file in state.files)) return { state, output: ['grep: ' + fileName + ': arquivo não encontrado'] };
    const source = fileName ? (state.files[file] ?? '').split('\n') : (stdin ?? []);
    const targetNeedle = insensitive ? needle.toLocaleLowerCase('pt-BR') : needle;
    const matches = source.flatMap((line, index) => {
      const haystack = insensitive ? line.toLocaleLowerCase('pt-BR') : line;
      const contains = haystack.includes(targetNeedle);
      return (invert ? !contains : contains) ? [(lineNumbers ? (index + 1) + ':' : '') + line] : [];
    });
    return { state, output: matches };
  }

  if (cmd === 'head' || cmd === 'tail') {
    let count = 10;
    let fileName: string | undefined;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-n') { count = Math.max(0, Math.min(100, Number(args[i + 1]) || 10)); i++; }
      else if (/^-\d+$/.test(args[i])) count = Math.max(0, Math.min(100, Number(args[i].slice(1))));
      else if (!args[i].startsWith('-')) fileName = args[i];
    }
    if (!fileName && !stdin) return { state, output: ['Uso: ' + cmd + ' [-n quantidade] arquivo (ou receba texto por pipeline)'] };
    if (fileName && !(pathFrom(state.cwd, fileName) in state.files)) return { state, output: [cmd + ': ' + fileName + ': arquivo não encontrado'] };
    const lines = fileName ? (state.files[pathFrom(state.cwd, fileName)] ?? '').split('\n') : (stdin ?? []);
    return { state, output: cmd === 'head' ? lines.slice(0, count) : lines.slice(Math.max(0, lines.length - count)) };
  }

  if (cmd === 'wc' && args.includes('-l')) {
    const fileName = args.find((arg) => !arg.startsWith('-'));
    if (!fileName && !stdin) return { state, output: ['Uso: wc -l arquivo (ou receba texto por pipeline)'] };
    if (fileName && !(pathFrom(state.cwd, fileName) in state.files)) return { state, output: ['wc: ' + fileName + ': arquivo não encontrado'] };
    const lines = fileName ? (state.files[pathFrom(state.cwd, fileName)] ?? '').split('\n') : (stdin ?? []);
    return { state, output: [String(lines.length) + (fileName ? ' ' + fileName : '')] };
  }

  if (cmd === 'find') {
    const baseArg = args.find((arg) => !arg.startsWith('-')) ?? '.';
    const base = pathFrom(state.cwd, baseArg);
    if (!state.directories.includes(base) && !(base in state.files)) return { state, output: ['find: ' + baseArg + ': arquivo ou diretório não encontrado'] };
    const typeIndex = args.indexOf('-type');
    const kind = typeIndex >= 0 ? args[typeIndex + 1] : '';
    const allFiles = Object.keys(state.files).filter((file) => file === base || file.startsWith(base === '/' ? '/' : base + '/'));
    const allDirs = state.directories.filter((dir) => dir === base || dir.startsWith(base === '/' ? '/' : base + '/'));
    const prefix = state.cwd === '/' ? '/' : state.cwd + '/';
    const relative = (path: string) => path === state.cwd ? '.' : path.startsWith(prefix) ? './' + path.slice(prefix.length) : path;
    return { state, output: [
      ...((!kind || kind === 'f') ? allFiles : []).map(relative),
      ...((!kind || kind === 'd') ? allDirs.filter((dir) => dir !== base) : []).map((dir) => relative(dir) + '/'),
    ].sort() };
  }

  if (cmd === 'mkdir') {
    const recursive = args.includes('-p');
    const name = args.find((arg) => !arg.startsWith('-'));
    if (!name) return { state, output: ['Uso: mkdir [-p] diretório'] };
    const target = pathFrom(state.cwd, name);
    if (state.directories.includes(target)) return { state, output: recursive ? [] : ['mkdir: ' + name + ': já existe'] };
    if (target in state.files) return { state, output: ['mkdir: ' + name + ': já existe um arquivo com esse nome'] };
    const parent = pathFrom(target, '..');
    if (!state.directories.includes(parent) && !recursive) return { state, output: ['mkdir: ' + name + ': diretório pai não existe'] };
    const additions: string[] = [];
    if (recursive) {
      const parts = target.split('/').filter(Boolean);
      let cursor = '';
      for (const part of parts) { cursor += '/' + part; if (!state.directories.includes(cursor)) additions.push(cursor); }
    } else additions.push(target);
    return { state: { ...state, directories: [...state.directories, ...additions] }, output: ['diretório criado: ' + target] };
  }

  if (cmd === 'touch') {
    const name = args[0];
    if (!name) return { state, output: ['Uso: touch arquivo'] };
    const target = pathFrom(state.cwd, name);
    const parent = pathFrom(target, '..');
    if (!state.directories.includes(parent)) return { state, output: ['touch: ' + name + ': diretório pai não existe'] };
    if (state.directories.includes(target)) return { state, output: ['touch: ' + name + ': é um diretório'] };
    if (target in state.files) return { state, output: ['timestamps atualizados: ' + target] };
    return { state: { ...state, files: { ...state.files, [target]: '' } }, output: ['arquivo criado: ' + target] };
  }

  if (cmd === 'echo' || cmd === 'printf') {
    const value = args.join(' ');
    return { state, output: [cmd === 'echo' ? value : value.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/%s/g, args[1] ?? '')] };
  }

  if (cmd === 'ps') return { state, output: [
    'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
    'relat     4127  9.8 71.5 2340000 558900 ?      Sl   08:22  0:18 /usr/bin/importador --arquivo mensal.csv',
    'postgres   912  6.2  9.0  820000  70200 ?      Ssl  07:45  0:32 postgres',
    'www-data  1034  1.1  2.3  210000  18000 ?      S    07:40  0:03 nginx',
    'aluno     1301  0.0  0.1   18000   2200 pts/0 R+   09:10  0:00 ps',
  ] };
  if (cmd === 'top') return { state, output: [
    'top - 09:10:12 up 4 days,  2 users,  load average: 3.72, 3.64, 3.51 (simulado)',
    'Tasks: 84 total, 1 running, 83 sleeping',
    '%Cpu(s): 12.0 us, 4.1 sy, 0.0 ni, 9.6 id, 74.3 wa',
    'MiB Mem : 7820.0 total, 96.2 free, 7590.4 used',
    'MiB Swap: 2048.0 total, 118.0 free, 1930.0 used',
    '  PID USER     %CPU %MEM COMMAND',
    ' 4127 relat     9.8 71.5 importador',
    '  912 postgres  6.2  9.0 postgres',
    ' 1034 www-data  1.1  2.3 nginx',
  ] };
  if (cmd === 'free' && args.includes('-h')) return { state, output: [
    '              total        used        free      shared  buff/cache   available',
    'Mem:           7.6Gi       7.4Gi        96Mi       128Mi       420Mi        96Mi',
    'Swap:          2.0Gi       1.9Gi       118Mi',
  ] };
  if (cmd === 'vmstat') return { state, output: [
    'procs  ----memory----   ---swap--',
    ' r  b   swpd   free     si    so',
    ' 1  6 1976320  98500  4120  3980',
    ' 0  7 1977100  96100  4310  4050',
    ' 1  6 1976800  97300  4005  4120',
  ] };
  if (cmd === 'git' && rest === 'status') return { state, output: [
    'On branch main (repositório fictício)',
    'Changes not staged for commit: README.md',
    'nothing was altered in a real repository',
  ] };
  if (cmd === 'git' && rest.startsWith('log')) return { state, output: ['a81c104 feat: adiciona exercícios', 'b3270ef docs: registra a atividade', '0f19d7a init: cria projeto de treino'] };
  if (cmd === 'tree') {
    const entries = directEntries(state.cwd, state);
    return { state, output: [state.cwd + '/', ...entries.map((entry) => (entry.endsWith('/') ? '├── ' + entry : '├── ' + entry))] };
  }
  if (cmd === 'npm' && rest === 'test') return { state, output: ['Test suite didática simulada: 8 testes aprovados, 0 falhas.', 'Saída ilustrativa; nenhum teste real foi executado neste terminal.'] };
  if (cmd === 'npm' && rest === 'run build') return { state, output: ['Build didático simulado: dist/ criado sem erros.', 'Saída ilustrativa; nenhum build real foi executado neste terminal.'] };
  if (['sudo', 'rm', 'curl', 'wget', 'ssh', 'scp', 'shutdown', 'reboot', 'dd', 'kill', 'chmod', 'chown', 'mount', 'umount'].includes(cmd)) return { state, output: unavailable(cmd) };
  return { state, output: ['bash: ' + cmd + ': comando não encontrado. Digite help.'] };
}

/** Interpreta pipes da esquerda para a direita. Apenas a saída textual flui entre comandos. */
function terminalCommand(input: string, state: TerminalState): TerminalResult {
  const segments = input.split('|').map((segment) => segment.trim());
  if (segments.length === 1) return terminalCommandSingle(input, state);
  if (segments.some((segment) => !segment)) return { state, output: ['bash: sintaxe inválida no pipeline'] };
  let currentState = state;
  let output: string[] = [];
  for (const segment of segments) {
    const result = terminalCommandSingle(segment, currentState, output);
    if (result.clear) return result;
    currentState = result.state;
    output = result.output;
  }
  return { state: currentState, output };
}

type IncidentStep = { id: string; title: string; command: string; explanation: string };
const OFFICE_REPORT_KEY = 'cronicas:escritorio:terminal:2318';

const INCIDENT_STEPS: IncidentStep[] = [
  { id: 'location', title: 'Confirme em qual diretório você está', command: 'pwd', explanation: 'pwd mostra o diretório de trabalho atual.' },
  { id: 'files', title: 'Localize os registros do chamado', command: 'ls', explanation: 'ls encontrou a pasta logs, que guarda os registros do serviço.' },
  { id: 'top', title: 'Observe CPU, memória e processos', command: 'top', explanation: 'O top mostrou 74,3% de espera por I/O (wa), quase nenhuma RAM livre e swap quase cheio.' },
  { id: 'memory', title: 'Confira RAM e swap com free -h', command: 'free -h', explanation: 'A RAM disponível está em cerca de 96 MiB; aproximadamente 1,9 GiB de swap estão usados.' },
  { id: 'vmstat', title: 'Confirme a troca intensa de páginas', command: 'vmstat 2', explanation: 'Valores persistentes de si/so indicam tráfego constante entre memória e swap.' },
  { id: 'process', title: 'Identifique o processo que ocupa memória', command: 'ps aux | grep importador', explanation: 'A saída identifica o importador, PID 4127, com 71,5% de memória.' },
];

function terminalStepMatches(id: string, raw: string, result: TerminalResult): boolean {
  const command = raw.trim().replace(/\s+/g, ' ');
  if (id === 'location') return /^pwd$/.test(command) && result.output.includes('/home/aluno');
  if (id === 'files') return /^(?:ls|ls -l|ls -a|ls -la|ls -al)(?: \.)?$/.test(command) && result.output.some((line) => line.includes('logs/'));
  if (id === 'top') return /^top$/.test(command) && result.output.some((line) => line.includes('74.3 wa')) && result.output.some((line) => line.includes('4127'));
  if (id === 'memory') return /^free -h$/.test(command) && result.output.some((line) => line.includes('96Mi')) && result.output.some((line) => line.includes('1.9Gi'));
  if (id === 'vmstat') return /^vmstat 2$/.test(command) && result.output.some((line) => line.includes('4120')) && result.output.some((line) => line.includes('4050'));
  if (id === 'process') return /^ps aux \| grep importador$/.test(command) && result.output.some((line) => line.includes('4127')) && result.output.some((line) => line.includes('importador'));
  return false;
}

type Diagnosis = 'cpu' | 'thrashing' | 'zombie';
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
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Terminal didático pronto. Digite help para listar os comandos.']);
  const [completedIncidentSteps, setCompletedIncidentSteps] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fromOffice = new URLSearchParams(location.search).get('origem') === 'escritorio';
  const chooseDiagnosis = (value: Diagnosis) => {
    setDiagnosis(value);
    try {
      if (value === 'thrashing') {
        localStorage.setItem(OFFICE_REPORT_KEY, JSON.stringify({ callId: '2318', diagnosis: value, completedAt: new Date().toISOString() }));
      } else {
        localStorage.removeItem(OFFICE_REPORT_KEY);
      }
    } catch { /* o diagnóstico permanece visível mesmo se o navegador bloquear o armazenamento */ }
  };
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
    setCompletedIncidentSteps((old) => {
      const next = [...old];
      for (let i = 0; i < INCIDENT_STEPS.length; i++) {
        const step = INCIDENT_STEPS[i];
        if (next.includes(step.id)) continue;
        if (i > 0 && !INCIDENT_STEPS.slice(0, i).every((previous) => next.includes(previous.id))) continue;
        if (terminalStepMatches(step.id, raw, result)) next.push(step.id);
      }
      return next;
    });
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
            <p className="text-sm text-muted">Pratique a sintaxe de Bash/Linux num sistema de arquivos virtual persistente durante esta sessão. A saída é simulada; nada é executado no Android, no computador ou num servidor real.</p>
          </div>
        </div>
        <section className="rounded-xl border border-line bg-raised/40 p-3" aria-label="Chamado guiado: investigar servidor lento">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="kicker">Chamado 2318 · Escritório de TI</p>
              <h3 className="mt-1 font-semibold">Investigue o servidor de relatórios lento</h3>
              <p className="mt-1 text-sm text-muted">O servidor relat-01 está lento. Use comandos de sistema para reunir evidências antes de escolher a causa. Cada etapa só é concluída quando a saída esperada aparece.</p>
              {fromOffice && <p className="mt-2 rounded-lg bg-teal/10 p-2 text-xs text-teal">Aberto pelo terminal da Marta no mapa do escritório. Ao voltar, sua posição no mapa será retomada.</p>}
            </div>
            <span className="shrink-0 rounded-full border border-line px-2 py-1 text-xs font-semibold">{completedIncidentSteps.length}/{INCIDENT_STEPS.length}</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Progresso do chamado" aria-valuemin={0} aria-valuemax={INCIDENT_STEPS.length} aria-valuenow={completedIncidentSteps.length}>
            <div className="h-full bg-teal transition-[width]" style={{ width: (completedIncidentSteps.length / INCIDENT_STEPS.length * 100) + '%' }} />
          </div>
          <ol className="mt-3 space-y-2">
            {INCIDENT_STEPS.map((step, index) => {
              const done = completedIncidentSteps.includes(step.id);
              const unlocked = index === 0 || INCIDENT_STEPS.slice(0, index).every((previous) => completedIncidentSteps.includes(previous.id));
              return <li key={step.id} data-testid={'terminal-step-' + step.id} className="flex items-start gap-2 rounded-lg border border-line bg-surface/70 p-2.5">
                <span className={'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ' + (done ? 'bg-ok/15 text-ok' : 'bg-raised text-muted')}>{done ? '✓' : index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{done ? step.explanation : unlocked ? 'Próxima ação: ' + step.command : 'Conclua a etapa anterior para desbloquear.'}</p>
                </div>
                <button type="button" className="btn-ghost !min-h-8 !px-2 text-xs" disabled={done || !unlocked} onClick={() => setCommand(step.command)} aria-label={'Preencher comando ' + step.command}>Usar comando</button>
              </li>;
            })}
          </ol>
          {completedIncidentSteps.length === INCIDENT_STEPS.length && <section className="mt-4 rounded-xl border border-line bg-surface p-3" aria-label="Diagnóstico do chamado">
            <h4 className="font-semibold">Qual é a causa mais provável?</h4>
            <p className="mt-1 text-sm text-muted">Cruze os sinais do top, free e vmstat antes de decidir.</p>
            <div className="mt-3 space-y-2">
              <button type="button" className={diagnosis === 'cpu' ? 'btn-primary w-full !justify-start text-left' : 'btn-ghost w-full !justify-start text-left'} onClick={() => chooseDiagnosis('cpu')} aria-pressed={diagnosis === 'cpu'}>A CPU está saturada por um único processo.</button>
              <button type="button" className={diagnosis === 'thrashing' ? 'btn-primary w-full !justify-start text-left' : 'btn-ghost w-full !justify-start text-left'} onClick={() => chooseDiagnosis('thrashing')} aria-pressed={diagnosis === 'thrashing'}>Falta RAM; o sistema está trocando páginas com o swap sem parar (thrashing).</button>
              <button type="button" className={diagnosis === 'zombie' ? 'btn-primary w-full !justify-start text-left' : 'btn-ghost w-full !justify-start text-left'} onClick={() => chooseDiagnosis('zombie')} aria-pressed={diagnosis === 'zombie'}>Um processo zumbi está bloqueando o servidor.</button>
            </div>
            {diagnosis && <p role="status" className={'mt-3 rounded-lg p-3 text-sm ' + (diagnosis === 'thrashing' ? 'bg-ok/10 text-ok' : 'bg-bad/10 text-bad')}>
              {diagnosis === 'thrashing'
                ? 'Diagnóstico correto. A RAM está quase esgotada, swap está quase cheio, si/so permanecem altos e a CPU passa 74,3% do tempo esperando I/O. Antes de agir, você já tem evidências. O próximo passo no escritório é pedir o término gracioso do importador (kill PID/SIGTERM) e conferir a memória.'
                : diagnosis === 'cpu'
                  ? 'Ainda não. O processo usa apenas 9,8% de CPU; 74,3% é espera por I/O. Releia free -h e vmstat 2.'
                  : 'Ainda não. Nenhuma evidência aponta para zumbi; o problema é a pressão de memória e a troca constante com swap.'}
            </p>}
          </section>}
          <button type="button" className="btn-ghost mt-3 text-xs" onClick={() => { setTerminalState(INITIAL_TERMINAL); setCompletedIncidentSteps([]); setDiagnosis(null); setCommand(''); setTerminalOutput(['Terminal virtual reiniciado. O sistema real não foi alterado.']); }}>Reiniciar terminal e chamado</button>
        </section>
                <div className="overflow-hidden rounded-xl border border-line bg-[#111714]">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-xs text-[#b3c8b8]">
            <span>aluno@portico</span><span>Linux virtual · sem acesso ao sistema real</span>
          </div>
          <div role="log" aria-label="Saída do terminal" className="max-h-64 space-y-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed text-[#d8e7dc]" aria-live="polite">
            {terminalOutput.map((line, index) => <pre key={index} className="whitespace-pre-wrap break-words">{line}</pre>)}
          </div>
          <form onSubmit={runTerminal} className="flex items-center gap-2 border-t border-white/10 px-3 py-2 font-mono text-xs">
            <label htmlFor="terminal-command" className="shrink-0 text-[#8dd5a7]">$</label>
            <input id="terminal-command" aria-label="Comando do terminal" value={command} onChange={(event) => setCommand(event.target.value)} autoCapitalize="off" autoCorrect="off" spellCheck={false} placeholder="help" className="min-w-0 flex-1 bg-transparent py-1 text-[#f3fff5] outline-none placeholder:text-[#748d7c]" />
            <button type="submit" className="rounded-lg bg-[#24553b] px-3 py-2 font-bold text-white" aria-label="Executar comando">Enter</button>
          </form>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {['help', 'pwd', 'ls -la', 'top', 'free -h', 'vmstat 2', 'ps aux | grep importador', 'cat logs/app.log | grep WARN', 'grep WARN logs/app.log | wc -l'].map((example) => (
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
          {fromOffice && <button type="button" className="btn-primary text-sm" onClick={() => returnToPreviousPage(navigate, location.key, '/escritorio')}>Voltar ao escritório 2D</button>}
          <Link to="/simulador" className="btn-ghost text-sm">Ver laboratórios práticos</Link>
        </div>
      </section>
    </div>
  );
}
