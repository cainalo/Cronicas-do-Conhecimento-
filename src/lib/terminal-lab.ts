// Terminal didático isolado. Os comandos usam sintaxe Linux real, mas operam APENAS
// sobre o sistema de arquivos virtual deste módulo: nunca executam comandos no aparelho.
export interface VirtualEntry {
  kind: 'dir' | 'file';
  content?: string;
  mode: string;
  owner: string;
}
export interface TerminalLine { command: string; cwd: string; output: string; }
export interface TerminalState {
  cwd: string;
  files: Record<string, VirtualEntry>;
  commands: string[];
  transcript: TerminalLine[];
}
export interface LabStep {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  doneWhen: (state: TerminalState) => boolean;
}
export interface TerminalLabDefinition {
  id: 'processos' | 'arquivos' | 'shell' | 'rede';
  title: string;
  eyebrow: string;
  summary: string;
  goal: string;
  duration: string;
  steps: LabStep[];
}
export interface TerminalResult { state: TerminalState; output: string; cleared?: boolean; }

const seed: Record<string, VirtualEntry> = {
  '/': { kind: 'dir', mode: '755', owner: 'root' },
  '/home': { kind: 'dir', mode: '755', owner: 'root' },
  '/home/aluno': { kind: 'dir', mode: '755', owner: 'aluno' },
  '/home/aluno/projetos': { kind: 'dir', mode: '755', owner: 'aluno' },
  '/home/aluno/relatorios': { kind: 'dir', mode: '755', owner: 'aluno' },
  '/home/aluno/scripts': { kind: 'dir', mode: '755', owner: 'aluno' },
  '/var': { kind: 'dir', mode: '755', owner: 'root' },
  '/var/log': { kind: 'dir', mode: '755', owner: 'root' },
  '/etc': { kind: 'dir', mode: '755', owner: 'root' },
  '/tmp': { kind: 'dir', mode: '1777', owner: 'root' },
  '/opt': { kind: 'dir', mode: '755', owner: 'root' },
  '/opt/relat-api': { kind: 'dir', mode: '755', owner: 'root' },
  '/proc': { kind: 'dir', mode: '555', owner: 'root' },
  '/sys': { kind: 'dir', mode: '555', owner: 'root' },
  '/usr': { kind: 'dir', mode: '755', owner: 'root' },
  '/usr/bin': { kind: 'dir', mode: '755', owner: 'root' },
  '/home/aluno/README.md': { kind: 'file', mode: '644', owner: 'aluno', content: 'Laboratório Linux — ambiente de treinamento\n\nVocê é a pessoa de suporte de plantão. Investigue com evidências antes de alterar qualquer coisa.\nOs arquivos e os processos deste ambiente são fictícios e isolados.' },
  '/home/aluno/relatorios/README.txt': { kind: 'file', mode: '644', owner: 'aluno', content: 'Relatórios do setor dependem do serviço relat-api no servidor relat-01.' },
  '/home/aluno/relatorios/resumo.csv': { kind: 'file', mode: '644', owner: 'aluno', content: 'data,servico,duracao_segundos\n2026-10-28,relat-api,142\n2026-10-28,relat-api,138\n2026-10-28,relat-api,19' },
  '/home/aluno/scripts/healthcheck.sh': { kind: 'file', mode: '755', owner: 'aluno', content: '#!/bin/sh\necho "Verificando relat-api..."\nsystemctl status relat-api' },
  '/var/log/relat-01.log': { kind: 'file', mode: '640', owner: 'root', content: '2026-10-28T08:29:55Z INFO relat-api inicializado\n2026-10-28T08:30:11Z WARNING consulta /relatorios demorou 142s\n2026-10-28T08:30:12Z ERROR timeout ao consultar banco de dados\n2026-10-28T08:30:15Z WARNING memoria livre abaixo de 10%\n2026-10-28T08:31:02Z ERROR pool de conexoes esgotado\n2026-10-28T08:31:09Z INFO nova tentativa agendada' },
  '/var/log/syslog': { kind: 'file', mode: '640', owner: 'root', content: 'Oct 28 08:25:00 relat-01 systemd[1]: Started relat-api.service\nOct 28 08:30:12 relat-01 kernel: memory pressure detected\nOct 28 08:30:13 relat-01 systemd[1]: relat-api.service still running' },
  '/etc/hostname': { kind: 'file', mode: '644', owner: 'root', content: 'relat-01' },
  '/etc/os-release': { kind: 'file', mode: '644', owner: 'root', content: 'NAME="Ubuntu Linux (laboratório)"\nID=ubuntu\nVERSION_ID="24.04"\nPRETTY_NAME="Ubuntu 24.04 LTS — ambiente simulado"' },
  '/etc/passwd': { kind: 'file', mode: '644', owner: 'root', content: 'root:x:0:0:root:/root:/bin/bash\naluno:x:1000:1000:Aluno do laboratório:/home/aluno:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin' },
  '/opt/relat-api/README.txt': { kind: 'file', mode: '644', owner: 'root', content: 'Serviço fictício relat-api. A aplicação consulta o banco e entrega os relatórios internos.' },
};
const HOME = '/home/aluno';

export function createTerminalState(): TerminalState {
  return {
    cwd: HOME,
    files: Object.fromEntries(Object.entries(seed).map(([path, entry]) => [path, { ...entry }])),
    commands: [],
    transcript: [{ command: '', cwd: HOME, output: 'Pórtico Lab OS 24.04 · terminal virtual\nAmbiente isolado para prática. Digite help para ver os comandos disponíveis.\n' }],
  };
}

export function normalizeVirtualPath(input: string, cwd: string): string {
  const raw = input.startsWith('/') ? input : (cwd === '/' ? '/' : cwd + '/') + input;
  const parts: string[] = [];
  for (const part of raw.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  return '/' + parts.join('/');
}

function tokenize(line: string): string[] {
  const raw = line.match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
  return raw.map((token) => {
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) return token.slice(1, -1);
    return token;
  });
}
function parentOf(path: string): string {
  if (path === '/') return '/';
  const i = path.lastIndexOf('/');
  return i <= 0 ? '/' : path.slice(0, i);
}
function baseName(path: string): string { return path === '/' ? '/' : path.slice(path.lastIndexOf('/') + 1); }
function modeBits(mode: string, kind: 'dir' | 'file'): string {
  const digits = mode.padStart(3, '0').slice(-3);
  const convert = (n: string) => {
    const v = Number(n);
    return (v & 4 ? 'r' : '-') + (v & 2 ? 'w' : '-') + (v & 1 ? 'x' : '-');
  };
  return (kind === 'dir' ? 'd' : '-') + convert(digits[0]) + convert(digits[1]) + convert(digits[2]);
}
function isDir(state: TerminalState, path: string): boolean { return state.files[path]?.kind === 'dir'; }
function isFile(state: TerminalState, path: string): boolean { return state.files[path]?.kind === 'file'; }
function requireFile(state: TerminalState, path: string): string | undefined {
  const entry = state.files[path];
  if (!entry) return 'cat: ' + path + ': No such file or directory';
  if (entry.kind !== 'file') return 'cat: ' + path + ': Is a directory';
  return undefined;
}
function children(state: TerminalState, dir: string): { name: string; path: string; entry: VirtualEntry }[] {
  const prefix = dir === '/' ? '/' : dir + '/';
  return Object.entries(state.files)
    .filter(([path]) => path !== dir && path.startsWith(prefix) && path.slice(prefix.length).length > 0 && !path.slice(prefix.length).includes('/'))
    .map(([path, entry]) => ({ name: baseName(path), path, entry }))
    .sort((a, b) => (a.entry.kind === b.entry.kind ? a.name.localeCompare(b.name) : a.entry.kind === 'dir' ? -1 : 1));
}
function parentExists(state: TerminalState, path: string): boolean { return isDir(state, parentOf(path)); }
function writeVirtualFile(state: TerminalState, path: string, content: string, append: boolean): string | undefined {
  if (path === '/' || isDir(state, path)) return 'bash: ' + path + ': Is a directory';
  if (!parentExists(state, path)) return 'bash: ' + path + ': No such file or directory';
  const old = state.files[path];
  state.files[path] = {
    kind: 'file',
    mode: old?.mode ?? '644',
    owner: old?.owner ?? 'aluno',
    content: (append && old?.kind === 'file' ? old.content ?? '' : '') + content,
  };
  return undefined;
}
// Reconhece redirecionamento apenas fora de aspas; nunca executa uma shell do sistema.
function redirectParts(line: string): { command: string; operator: '>' | '>>'; target: string } | undefined {
  let quote = '';
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if ((c === '"' || c === "'") && !quote) { quote = c; continue; }
    if (c === quote) { quote = ''; continue; }
    if (c === '>' && !quote) {
      const operator: '>' | '>>' = line[i + 1] === '>' ? '>>' : '>';
      const command = line.slice(0, i).trim();
      const target = line.slice(i + operator.length).trim();
      if (command && target) return { command, operator, target };
    }
  }
  return undefined;
}
const helpText = [
  'COMANDOS DISPONÍVEIS NO LABORATÓRIO',
  'Arquivos: pwd, ls -la, cd, cat, head, tail, grep, find, touch, mkdir -p, cp, mv, rm',
  'Conteúdo: echo "texto" > arquivo, echo "texto" >> arquivo, chmod 640 arquivo',
  'Sistema: whoami, hostname, uname -a, uptime, ps aux, top, vmstat 2, free -h, df -h, kill PID',
  'Rede e serviços: ip addr, ping -c 4 10.0.0.12, systemctl status relat-api, journalctl -u relat-api',
  'Ajuda: help, man <comando>, history, clear',
  'Aviso: sistema de arquivos virtual. Nenhum comando é executado no seu aparelho.',
].join('\n');

export function executeTerminalCommand(previous: TerminalState, raw: string): TerminalResult {
  const original = raw.trim();
  if (!original) return { state: previous, output: '' };
  const commands = [...previous.commands, original].slice(-500);
  if (original === 'clear') return { state: { ...previous, commands, transcript: [] }, output: '', cleared: true };

  const redirected = redirectParts(original);
  const commandLine = redirected?.command ?? original;
  const tokens = tokenize(commandLine);
  const command = tokens[0] ?? '';
  const args = tokens.slice(1);
  const state: TerminalState = {
    cwd: previous.cwd,
    files: { ...previous.files },
    commands,
    transcript: [...previous.transcript],
  };
  const path = (input: string) => normalizeVirtualPath(input, state.cwd);
  const stoppedCommand = (value: string) => /^kill\s+(?:-9\s+)?4127$/i.test(value.trim());
  const importerWasStopped = previous.commands.some(stoppedCommand);
  const importerStopped = commands.some(stoppedCommand);
  let output = '';

  if (command === 'help' || (command === 'man' && !args.length)) output = helpText;
  else if (command === 'man') {
    const name = args[0];
    const summaries: Record<string, string> = {
      pwd: 'pwd — mostra o diretório de trabalho atual.',
      ls: 'ls [OPÇÕES] [CAMINHO] — lista arquivos e diretórios. -l mostra detalhes; -a inclui ocultos.',
      cd: 'cd CAMINHO — muda o diretório atual. cd .. sobe um nível; cd sem argumentos volta para a home.',
      cat: 'cat ARQUIVO — imprime o conteúdo do arquivo.',
      grep: 'grep PADRÃO ARQUIVO — imprime linhas que contêm o padrão.',
      find: 'find CAMINHO -name "PADRÃO" — procura caminhos por nome.',
      ps: 'ps aux — mostra uma fotografia dos processos em execução; top permite acompanhar a carga do sistema.',
      vmstat: 'vmstat 2 — mostra amostras de processos, memória, swap e espera de I/O no ambiente de treinamento.',
      kill: 'kill PID — envia SIGTERM para pedir que um processo encerre de forma graciosa. No laboratório, use o PID fictício 4127.',
      chmod: 'chmod MODO ARQUIVO — altera permissões no laboratório. Exemplo: chmod 640 relatorio.txt.',
      systemctl: 'systemctl status SERVIÇO — mostra o estado do serviço simulado.',
      journalctl: 'journalctl -u SERVIÇO — consulta os registros do serviço simulado.',
      ping: 'ping -c 4 HOST — verifica conectividade no ambiente de rede simulado.',
    };
    output = summaries[name] ?? 'Não há uma página de manual específica para "' + (name ?? '') + '". Digite help.';
  } else if (command === 'pwd') output = state.cwd;
  else if (command === 'whoami') output = 'aluno';
  else if (command === 'hostname') output = 'relat-01';
  else if (command === 'uname') output = args.includes('-a') ? 'Linux relat-01 6.8.0-lab #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : args.includes('-r') ? '6.8.0-lab' : 'Linux';
  else if (command === 'date') output = 'qua out 28 08:00:00 -03 2026';
  else if (command === 'uptime') output = ' 08:00:00 up 12 days,  4:32,  2 users,  load average: 2.41, 2.08, 1.92';
  else if (command === 'history') output = commands.map((c, i) => String(i + 1).padStart(4, ' ') + '  ' + c).join('\n');
  else if (command === 'ls') {
    const showAll = args.some((x) => x.includes('a'));
    const long = args.some((x) => x.includes('l'));
    const targetInput = [...args].reverse().find((x) => !x.startsWith('-'));
    const target = path(targetInput ?? '.');
    if (!state.files[target]) output = 'ls: cannot access ' + target + ': No such file or directory';
    else if (!isDir(state, target)) output = baseName(target);
    else {
      const rows = children(state, target).filter((x) => showAll || !x.name.startsWith('.')).map((x) => {
        if (!long) return x.name + (x.entry.kind === 'dir' ? '/' : '');
        const size = x.entry.kind === 'file' ? String((x.entry.content ?? '').length).padStart(5, ' ') : ' 4096';
        return modeBits(x.entry.mode, x.entry.kind) + ' 1 ' + x.entry.owner.padEnd(7, ' ') + ' ' + x.entry.owner.padEnd(7, ' ') + ' ' + size + ' Oct 28 08:00 ' + x.name;
      });
      output = (long ? 'total ' + rows.length * 4 + '\n' : '') + rows.join('\n');
    }
  } else if (command === 'cd') {
    const dest = path(args[0] ?? HOME);
    if (!isDir(state, dest)) output = 'bash: cd: ' + (args[0] ?? HOME) + ': No such file or directory';
    else { state.cwd = dest; output = ''; }
  } else if (command === 'cat' || command === 'head' || command === 'tail') {
    const nIndex = args.findIndex((x) => x === '-n');
    const name = args.find((x, i) => !x.startsWith('-') && !(nIndex >= 0 && i === nIndex + 1));
    if (!name) output = command + ': missing file operand';
    else {
      const target = path(name);
      const err = requireFile(state, target);
      if (err) output = err;
      else {
        const lines = (state.files[target].content ?? '').split('\n');
        const count = nIndex >= 0 ? Math.max(1, Number(args[nIndex + 1]) || 10) : 10;
        output = (command === 'head' ? lines.slice(0, count) : command === 'tail' ? lines.slice(-count) : lines).join('\n');
      }
    }
  } else if (command === 'grep') {
    const cleanArgs = args.filter((x) => x !== '-n' && x !== '-i');
    const ignoreCase = args.includes('-i');
    const pattern = cleanArgs[0];
    const files = cleanArgs.slice(1);
    if (!pattern || !files.length) output = 'Uso: grep PADRÃO ARQUIVO';
    else {
      const matches: string[] = [];
      for (const fileName of files) {
        const target = path(fileName);
        const err = requireFile(state, target);
        if (err) { matches.push(err); continue; }
        const lines = (state.files[target].content ?? '').split('\n');
        lines.forEach((line, i) => {
          const ok = ignoreCase ? line.toLowerCase().includes(pattern.toLowerCase()) : line.includes(pattern);
          if (ok) matches.push((files.length > 1 ? target + ':' : '') + (args.includes('-n') ? String(i + 1) + ':' : '') + line);
        });
      }
      output = matches.join('\n') || '';
    }
  } else if (command === 'find') {
    const rootInput = args.find((x) => !x.startsWith('-')) ?? '.';
    const root = path(rootInput);
    const nameIndex = args.findIndex((x) => x === '-name');
    const pattern = nameIndex >= 0 ? (args[nameIndex + 1] ?? '*').replace(/^\*|\*$/g, '') : '';
    if (!state.files[root]) output = 'find: ' + root + ': No such file or directory';
    else {
      output = Object.keys(state.files).filter((p) => (p === root || p.startsWith(root === '/' ? '/' : root + '/')) && baseName(p).includes(pattern)).sort().join('\n');
    }
  } else if (command === 'mkdir') {
    const recursive = args.includes('-p');
    const targets = args.filter((x) => !x.startsWith('-'));
    if (!targets.length) output = 'mkdir: missing operand';
    else for (const input of targets) {
      const target = path(input);
      if (state.files[target]) { if (!recursive) output = 'mkdir: cannot create directory "' + input + '": File exists'; }
      else if (!parentExists(state, target)) output = 'mkdir: cannot create directory "' + input + '": No such file or directory';
      else state.files[target] = { kind: 'dir', mode: '755', owner: 'aluno' };
    }
  } else if (command === 'touch') {
    if (!args.length) output = 'touch: missing file operand';
    else for (const input of args) {
      const target = path(input);
      if (!state.files[target]) {
        if (!parentExists(state, target)) output = 'touch: cannot touch "' + input + '": No such file or directory';
        else state.files[target] = { kind: 'file', mode: '644', owner: 'aluno', content: '' };
      } else if (isDir(state, target)) output = 'touch: "' + input + '": Is a directory';
    }
  } else if (command === 'cp' || command === 'mv') {
    if (args.length < 2) output = command + ': missing destination file operand';
    else {
      const src = path(args[0]);
      const destRaw = path(args[1]);
      if (!isFile(state, src)) output = command + ': cannot stat "' + args[0] + '": No such file or directory';
      else {
        const dest = isDir(state, destRaw) ? normalizeVirtualPath(baseName(src), destRaw) : destRaw;
        if (!parentExists(state, dest)) output = command + ': cannot create "' + args[1] + '": No such file or directory';
        else {
          state.files[dest] = { ...state.files[src], content: state.files[src].content ?? '' };
          if (command === 'mv') delete state.files[src];
        }
      }
    }
  } else if (command === 'rm') {
    const names = args.filter((x) => !x.startsWith('-'));
    if (!names.length) output = 'rm: missing operand';
    else for (const name of names) {
      const target = path(name);
      if (target === '/' || target === '/home' || target === '/etc' || target.startsWith('/var') || target.startsWith('/usr')) {
        output = 'rm: operação protegida no laboratório; diretórios de sistema não podem ser removidos';
      } else if (!state.files[target]) {
        if (!args.includes('-f')) output = 'rm: cannot remove "' + name + '": No such file or directory';
      } else if (isDir(state, target)) output = 'rm: cannot remove "' + name + '": Is a directory (este laboratório não implementa remoção recursiva)';
      else delete state.files[target];
    }
  } else if (command === 'chmod') {
    if (args.length < 2) output = 'chmod: missing operand';
    else {
      const mode = args[0].replace(/[^0-7]/g, '');
      const target = path(args[1]);
      if (!/^[0-7]{3,4}$/.test(mode)) output = 'chmod: modo inválido: "' + args[0] + '" (use, por exemplo, 640 ou 755)';
      else if (!state.files[target]) output = 'chmod: cannot access "' + args[1] + '": No such file or directory';
      else if (target.startsWith('/etc/') || target.startsWith('/usr/') || target.startsWith('/var/')) output = 'chmod: permissão negada: este arquivo pertence a root no laboratório';
      else state.files[target] = { ...state.files[target], mode: mode.slice(-3) };
    }
  } else if (command === 'echo' || command === 'printf') {
    output = args.join(' ') + (command === 'echo' ? '\n' : '');
  } else if (command === 'kill') {
    const pid = args.find((value) => /^\d+$/.test(value));
    const force = args.includes('-9');
    if (!pid) output = 'kill: uso: kill [-sinal] PID';
    else if (pid !== '4127') output = 'bash: kill: (' + pid + ') - No such process no cenário atual';
    else if (importerWasStopped) output = 'bash: kill: (4127) - No such process';
    else output = force
      ? 'Enviado SIGKILL ao PID 4127 (importador). Processo encerrado à força; não teve chance de finalizar de forma graciosa.'
      : 'Enviado SIGTERM ao PID 4127 (importador). Pedido de encerramento enviado; o processo saiu sem precisar de SIGKILL.';
  } else if (command === 'ps') {
    output = '    PID TTY          TIME CMD\n      1 ?        00:00:03 systemd\n    418 ?        00:00:16 relat-api\n    602 ?        00:00:08 postgres\n' +
      (importerStopped ? '' : '   4127 ?        00:02:41 importador\n') +
      '    811 pts/0    00:00:00 bash\n    846 pts/0    00:00:00 ps';
  } else if (command === 'top') {
    output = importerStopped
      ? 'top - 08:33:12 up 12 days, 4:35, 2 users, load average: 0.74, 1.10, 1.60\nTasks: 125 total, 1 running, 124 sleeping, 0 stopped, 0 zombie\n%Cpu(s): 7.1 us, 2.3 sy, 0.0 ni, 70.0 id, 1.0 wa\nMiB Mem : 7820.0 total, 2048.0 used, 5500.0 free\nMiB Swap: 2048.0 total, 1948.0 free, 100.0 used\n\n PID USER     %CPU %MEM COMMAND\n  912 postgres  6.2  9.0 postgres\n 1034 www-data  1.1  2.3 nginx'
      : 'top - 08:31:12 up 12 days, 4:33, 2 users, load average: 2.41, 2.08, 1.92\nTasks: 126 total, 2 running, 124 sleeping, 0 stopped, 0 zombie\n%Cpu(s): 12.0 us, 4.1 sy, 0.0 ni, 9.6 id, 74.3 wa\nMiB Mem : 7820.0 total, 96.2 free, 7590.4 used\nMiB Swap: 2048.0 total, 118.0 free, 1930.0 used\n\n PID USER     %CPU %MEM COMMAND\n 4127 relat     9.8 71.5 importador\n  912 postgres  6.2  9.0 postgres\n 1034 www-data  1.1  2.3 nginx';
  } else if (command === 'vmstat') {
    output = importerStopped
      ? 'procs  ----memory----   ---swap--\n r  b   swpd   free     si    so\n 0  0 102400 5500000 0 0\n 0  0 102400 5500000 0 0\n 0  0 102400 5500000 0 0'
      : 'procs  ----memory----   ---swap--\n r  b   swpd   free     si    so\n 1  6 1976320  98500  4120  3980\n 0  7 1977100  96100  4310  4050\n 1  6 1976800  97300  4005  4120';
    if (args[0] !== undefined && args[0] !== '2') output = 'Uso: vmstat 2 (este terminal mostra três amostras didáticas).';
  } else if (command === 'free') {
    output = importerStopped
      ? '              total        used        free      shared  buff/cache   available\nMem:           7.6Gi       2.0Gi       5.4Gi       82Mi       420Mi       5.3Gi\nSwap:          2.0Gi       0.1Gi       1.9Gi'
      : '              total        used        free      shared  buff/cache   available\nMem:           7.6Gi       7.4Gi        96Mi       82Mi       320Mi       140Mi\nSwap:          2.0Gi       1.9Gi       118Mi';
    if (!args.includes('-h')) output = importerStopped
      ? '              total        used        free      shared  buff/cache   available\nMem:        7969177     2097152     5662310       83968      430080     5557452\nSwap:       2097152      102400     1994752'
      : '              total        used        free      shared  buff/cache   available\nMem:        7969177     7762340       98304       83968      327680      143360\nSwap:       2097152     1976320      121832';
  } else if (command === 'df') {
    output = 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1        40G   31G  7.0G  82% /\ntmpfs           2.0G  4.0M  2.0G   1% /run\n/dev/vdb1       100G   47G   53G  48% /dados';
  } else if (command === 'ip') {
    output = args[0] === 'addr' || args[0] === 'a'
      ? '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 10.0.0.24/24 brd 10.0.0.255 scope global enp0s3'
      : 'Uso didático: ip addr';
  } else if (command === 'ping') {
    const host = [...args].reverse().find((x) => !x.startsWith('-')) ?? '';
    if (!host) output = 'ping: destino ausente';
    else if (host === '10.0.0.99' || host === '10.0.0.254') output = 'PING ' + host + ' (' + host + ') 56(84) bytes of data.\nFrom 10.0.0.24 icmp_seq=1 Destination Host Unreachable\n\n--- ' + host + ' ping statistics ---\n4 packets transmitted, 0 received, +4 errors, 100% packet loss';
    else output = 'PING ' + host + ' (' + host + ') 56(84) bytes of data.\n64 bytes from ' + host + ': icmp_seq=1 ttl=64 time=1.4 ms\n64 bytes from ' + host + ': icmp_seq=2 ttl=64 time=1.2 ms\n64 bytes from ' + host + ': icmp_seq=3 ttl=64 time=1.3 ms\n64 bytes from ' + host + ': icmp_seq=4 ttl=64 time=1.1 ms\n\n--- ' + host + ' ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss';
  } else if (command === 'systemctl') {
    if (args[0] !== 'status') output = 'Uso: systemctl status relat-api';
    else {
      const service = args[1] ?? 'relat-api';
      output = service === 'relat-api' || service === 'relat-api.service'
        ? '● relat-api.service - API de relatórios\n     Loaded: loaded (/etc/systemd/system/relat-api.service; enabled)\n     Active: active (running) since Wed 2026-10-28 08:25:00 -03; 6min ago\n   Main PID: 418 (relat-api)\n      Tasks: 18\n     Memory: 640.0M\n        CPU: 16.2s'
        : '○ ' + service + '.service - serviço simulado\n     Loaded: loaded\n     Active: inactive (dead)';
    }
  } else if (command === 'journalctl') {
    output = args.includes('-u') && (args.includes('relat-api') || args.includes('relat-api.service'))
      ? 'Oct 28 08:25:00 relat-01 systemd[1]: Started relat-api.service\nOct 28 08:30:12 relat-01 relat-api[418]: WARNING consulta /relatorios demorou 142s\nOct 28 08:30:12 relat-01 relat-api[418]: ERROR timeout ao consultar banco de dados\nOct 28 08:30:15 relat-01 relat-api[418]: WARNING memoria disponível abaixo de 10%\nOct 28 08:31:02 relat-01 relat-api[418]: ERROR pool de conexões esgotado'
      : 'Uso: journalctl -u relat-api';
  } else if (command.startsWith('./')) {
    const target = path(command);
    if (!isFile(state, target)) output = 'bash: ' + command + ': No such file or directory';
    else if (!state.files[target].mode.includes('7') && !state.files[target].mode.includes('5') && !state.files[target].mode.includes('1')) output = 'bash: ' + command + ': Permission denied (use chmod +x para tornar executável)';
    else if (command.endsWith('healthcheck.sh')) output = 'Verificando relat-api...\nActive: active (running)\nMemória usada: 92% — atenção recomendada';
    else output = 'Script executado no ambiente virtual.';
  } else if (command === 'sudo' || command === 'su') {
    output = 'Este laboratório não concede privilégios administrativos reais. Pratique primeiro comandos de leitura e confirme a evidência antes de planejar uma alteração.';
  } else {
    output = 'bash: ' + command + ': command not found\nDigite help para ver os comandos disponíveis.';
  }

  if (redirected) {
    const target = path(tokenize(redirected.target)[0] ?? '');
    const body = command === 'echo' || command === 'printf' ? output : output + (output ? '\n' : '');
    const error = writeVirtualFile(state, target, body, redirected.operator === '>>');
    if (error) output = error;
    else output = '';
  }
  state.transcript.push({ command: original, cwd: previous.cwd, output });
  if (state.transcript.length > 250) state.transcript = state.transcript.slice(-250);
  return { state, output };
}

const ran = (state: TerminalState, regex: RegExp) => state.commands.some((command) => regex.test(command.trim()));
const fileHasMode = (state: TerminalState, path: string, mode: string) => state.files[path]?.kind === 'file' && state.files[path].mode === mode;
const processSteps: LabStep[] = [
  { id: 'pwd', title: 'Descubra onde você está', instruction: 'Veja o diretório de trabalho antes de iniciar a investigação.', hint: 'pwd', doneWhen: (s) => ran(s, /^pwd$/) },
  { id: 'ps', title: 'Liste os processos', instruction: 'Identifique o PID e o processo que consome mais recursos.', hint: 'ps aux', doneWhen: (s) => ran(s, /^ps(?:\s|$)/) },
  { id: 'top', title: 'Observe a carga ao vivo', instruction: 'Use o monitor de processos e localize o consumo de RAM e a espera por disco (wa).', hint: 'top', doneWhen: (s) => ran(s, /^top$/) },
  { id: 'vmstat', title: 'Confirme a pressão de memória', instruction: 'Leia si e so para descobrir se o sistema troca páginas constantemente com o swap.', hint: 'vmstat 2', doneWhen: (s) => ran(s, /^vmstat\s+2$/) },
  { id: 'kill', title: 'Peça o encerramento do processo não crítico', instruction: 'Depois de observar as evidências, envie SIGTERM ao importador fictício. O comando só altera o ambiente virtual.', hint: 'kill 4127', doneWhen: (s) => ran(s, /^kill\s+4127$/) && ran(s, /^top$/) && ran(s, /^vmstat\s+2$/) },
  { id: 'memory', title: 'Confira a recuperação', instruction: 'Compare a memória livre e o swap e confira o espaço do disco.', hint: 'free -h  e  df -h', doneWhen: (s) => ran(s, /^free\s+-h$/) && ran(s, /^df\s+-h$/) },
];
const fileSteps: LabStep[] = [
  { id: 'list', title: 'Explore o diretório inicial', instruction: 'Liste os arquivos com permissões e arquivos ocultos.', hint: 'ls -la', doneWhen: (s) => ran(s, /^ls\s+.*-l.*-a|^ls\s+-la|^ls\s+-al/) },
  { id: 'logs', title: 'Entre na pasta de logs', instruction: 'Acesse os registros do sistema.', hint: 'cd /var/log', doneWhen: (s) => ran(s, /^cd\s+\/var\/log$/) },
  { id: 'read', title: 'Leia o log do servidor', instruction: 'Abra o arquivo relat-01.log e encontre as mensagens da aplicação.', hint: 'cat /var/log/relat-01.log', doneWhen: (s) => ran(s, /^cat\s+\/var\/log\/relat-01\.log$/) },
  { id: 'grep', title: 'Filtre os erros', instruction: 'Busque apenas as linhas com ERROR sem imprimir o arquivo inteiro.', hint: 'grep ERROR /var/log/relat-01.log', doneWhen: (s) => ran(s, /^grep\s+ERROR\s+\/var\/log\/relat-01\.log$/) },
];
const shellSteps: LabStep[] = [
  { id: 'mkdir', title: 'Prepare uma pasta de evidências', instruction: 'Crie uma pasta para armazenar a cópia do log.', hint: 'mkdir -p /home/aluno/backup', doneWhen: (s) => isDir(s, '/home/aluno/backup') },
  { id: 'cp', title: 'Copie o log sem mexer no original', instruction: 'Copie o registro para sua pasta de backup.', hint: 'cp /var/log/relat-01.log /home/aluno/backup/relat-01.log', doneWhen: (s) => isFile(s, '/home/aluno/backup/relat-01.log') },
  { id: 'chmod', title: 'Defina uma permissão mínima', instruction: 'Deixe o arquivo legível pelo dono e pelo grupo, sem acesso para os demais.', hint: 'chmod 640 /home/aluno/backup/relat-01.log', doneWhen: (s) => fileHasMode(s, '/home/aluno/backup/relat-01.log', '640') },
  { id: 'verify', title: 'Confira o resultado', instruction: 'Mostre a listagem detalhada para confirmar a permissão aplicada.', hint: 'ls -l /home/aluno/backup', doneWhen: (s) => ran(s, /^ls\s+-l\s+\/home\/aluno\/backup$/) },
];
const networkSteps: LabStep[] = [
  { id: 'ip', title: 'Confira a configuração da rede', instruction: 'Localize o endereço IPv4 da interface ativa.', hint: 'ip addr', doneWhen: (s) => ran(s, /^ip\s+(addr|a)$/) },
  { id: 'ping', title: 'Teste a conectividade', instruction: 'Envie quatro testes para o equipamento da rede de relatórios.', hint: 'ping -c 4 10.0.0.12', doneWhen: (s) => ran(s, /^ping\s+(?:-c\s+4\s+)?10\.0\.0\.12$/) },
  { id: 'service', title: 'Verifique o serviço', instruction: 'Confirme se a API continua ativa, sem reiniciá-la.', hint: 'systemctl status relat-api', doneWhen: (s) => ran(s, /^systemctl\s+status\s+relat-api(?:\.service)?$/) },
  { id: 'logs', title: 'Correlacione com os registros', instruction: 'Consulte as mensagens recentes do serviço e procure timeout/pool esgotado.', hint: 'journalctl -u relat-api', doneWhen: (s) => ran(s, /^journalctl\s+-u\s+relat-api(?:\.service)?$/) },
];

export const TERMINAL_LABS: TerminalLabDefinition[] = [
  { id: 'processos', title: 'Processos e recursos', eyebrow: 'Laboratório 01', summary: 'Observe CPU, memória e processos em execução.', goal: 'Investigue por que o servidor relat-01 parece lento antes de fazer qualquer alteração.', duration: '10–15 min', steps: processSteps },
  { id: 'arquivos', title: 'Arquivos e logs', eyebrow: 'Laboratório 02', summary: 'Navegue no sistema de arquivos, leia logs e filtre mensagens.', goal: 'Encontre as mensagens de erro no log do servidor sem modificar arquivos do sistema.', duration: '10–15 min', steps: fileSteps },
  { id: 'shell', title: 'Shell, cópias e permissões', eyebrow: 'Laboratório 03', summary: 'Crie diretórios, copie um arquivo e aplique permissões.', goal: 'Prepare uma cópia de evidências com permissões mínimas e confirme o resultado.', duration: '10–15 min', steps: shellSteps },
  { id: 'rede', title: 'Rede e serviços', eyebrow: 'Laboratório 04', summary: 'Inspecione interfaces, teste conectividade e consulte serviços/logs.', goal: 'Diferencie problema de rede de problema do serviço usando evidências.', duration: '10–15 min', steps: networkSteps },
];

export function getTerminalLab(id: string | undefined): TerminalLabDefinition | undefined {
  return TERMINAL_LABS.find((lab) => lab.id === id);
}
export function terminalLabProgress(lab: TerminalLabDefinition, state: TerminalState) {
  const steps = lab.steps.map((step) => ({ ...step, done: step.doneWhen(state) }));
  const completed = steps.filter((step) => step.done).length;
  return { steps, completed, total: steps.length, done: completed === steps.length };
}
