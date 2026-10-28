// Terminal educacional em sistema de arquivos virtual. Nenhum comando é enviado ao aparelho,
// ao servidor de hospedagem ou a uma shell real. A sintaxe e os efeitos suportados são interpretados
// aqui, dentro de um ambiente descartável e previsível para aprender com segurança.
export type TerminalLabId = 'primeiros-passos' | 'arquivos-logs' | 'permissoes' | 'processos-linux' | 'javascript' | 'git';

export interface TerminalTask {
  id: string;
  title: string;
  hint: string;
}

export interface TerminalLab {
  id: TerminalLabId;
  title: string;
  subtitle: string;
  objective: string;
  chapterId: string;
  sectionId: string;
  tasks: TerminalTask[];
  suggestions: string[];
}

export const terminalLabs: TerminalLab[] = [
  {
    id: 'primeiros-passos',
    title: 'Primeiros passos no terminal',
    subtitle: 'Aprenda a se localizar, listar pastas e ler arquivos no Linux.',
    objective: 'Você acaba de entrar em uma máquina de treinamento. Descubra onde está e encontre as instruções do projeto.',
    chapterId: 'cap.prim.01',
    sectionId: 'sistema',
    tasks: [
      { id: 'pwd', title: 'Descubra o diretório atual', hint: 'O comando pwd imprime o caminho completo do lugar em que você está.' },
      { id: 'ls-hidden', title: 'Liste os arquivos, incluindo os ocultos', hint: 'Experimente ls -la. A opção -a inclui nomes iniciados por ponto.' },
      { id: 'cd-demo', title: 'Entre na pasta projetos/demo', hint: 'Use cd /home/aprendiz/projetos/demo ou navegue por partes com cd.' },
      { id: 'readme', title: 'Leia o README.md do projeto', hint: 'Dentro da pasta demo, execute cat README.md.' },
    ],
    suggestions: ['pwd', 'ls -la', 'cd /home/aprendiz/projetos/demo', 'cat README.md'],
  },
  {
    id: 'arquivos-logs',
    title: 'Investigar arquivos e registros',
    subtitle: 'Navegue pela árvore de diretórios e encontre um erro em logs.',
    objective: 'A aplicação registrou falhas durante a madrugada. Localize o arquivo certo, filtre as linhas relevantes e leia o final do registro.',
    chapterId: 'cap.infra.03',
    sectionId: 'arquivos',
    tasks: [
      { id: 'cd-logs', title: 'Entre em /var/log', hint: 'Use cd /var/log. O caminho absoluto começa na raiz /.' },
      { id: 'list-logs', title: 'Confira quais registros existem', hint: 'Use ls -lah para listar os arquivos e seus tamanhos.' },
      { id: 'grep-error', title: 'Encontre as linhas que contêm ERROR', hint: 'grep -in "ERROR" app.log mostra o número da linha e ignora maiúsculas/minúsculas.' },
      { id: 'tail-log', title: 'Leia as cinco linhas mais recentes', hint: 'tail -n 5 app.log mostra o final do arquivo.' },
    ],
    suggestions: ['cd /var/log', 'ls -lah', 'grep -in "ERROR" app.log', 'tail -n 5 app.log'],
  },
  {
    id: 'permissoes',
    title: 'Permissões e acesso a arquivos',
    subtitle: 'Leia modos Unix, verifique metadados e conceda somente a permissão necessária.',
    objective: 'Uma pessoa da equipe não consegue executar o script de relatório. Inspecione as permissões antes de alterá-las; depois restrinja um arquivo de dados fictício para que só o proprietário possa lê-lo e modificá-lo.',
    chapterId: 'cap.infra.03',
    sectionId: 'arquivos',
    tasks: [
      { id: 'cd-home', title: 'Entre na pasta do usuário', hint: 'Use cd /home/aprendiz. Os arquivos de treino ficam dentro da pasta pessoal.' },
      { id: 'ls-mode', title: 'Leia as permissões do script', hint: 'Use ls -l scripts ou ls -l scripts/backup.sh. r = leitura, w = escrita, x = execução.' },
      { id: 'stat-script', title: 'Consulte os metadados do arquivo', hint: 'stat scripts/backup.sh deve mostrar o modo inicial 0644.' },
      { id: 'chmod-script', title: 'Permita que o proprietário execute o script', hint: 'Use chmod u+x scripts/backup.sh. Isso acrescenta execução para o dono, sem mudar as permissões do grupo e dos outros.' },
      { id: 'verify-script', title: 'Confira que a permissão mudou', hint: 'Use ls -l scripts/backup.sh ou stat scripts/backup.sh e confirme que o dono tem x.' },
      { id: 'run-script', title: 'Execute o script que você autorizou', hint: 'Use ./scripts/backup.sh. Sem a permissão de execução, o sistema retorna Permission denied.' },
      { id: 'secure-data', title: 'Restrinja o arquivo de dados fictício', hint: 'Use chmod 600 dados/clientes.csv. Somente o proprietário terá leitura e escrita.' },
      { id: 'verify-data', title: 'Confirme o modo 0600', hint: 'Use stat dados/clientes.csv e confira o modo final.' },
    ],
    suggestions: ['cd /home/aprendiz', 'ls -l scripts', 'stat scripts/backup.sh', 'chmod u+x scripts/backup.sh', 'ls -l scripts/backup.sh', './scripts/backup.sh', 'chmod 600 dados/clientes.csv', 'stat dados/clientes.csv'],
  },
  {
    id: 'processos-linux',
    title: 'Chamado 2318: servidor lento',
    subtitle: 'Observe processos, memória e swap antes de agir.',
    objective: 'O servidor relat-01 está lento. Reúna evidências, identifique a causa provável, encerre o processo de forma graciosa e confira o resultado.',
    chapterId: 'cap.infra.03',
    sectionId: 'processos',
    tasks: [
      { id: 'top', title: 'Observe os processos em execução', hint: 'top mostra uma visão atualizada; neste laboratório, a saída é uma amostra didática.' },
      { id: 'free', title: 'Confira a memória e o swap', hint: 'free -h apresenta os tamanhos em unidades legíveis.' },
      { id: 'vmstat', title: 'Compare as amostras de troca de memória', hint: 'vmstat 1 3 mostra três amostras; observe si e so.' },
      { id: 'kill-graceful', title: 'Peça o encerramento do PID 4127', hint: 'kill 4127 envia SIGTERM. Prefira o pedido normal antes de considerar kill -9.' },
      { id: 'verify', title: 'Confirme que o processo terminou', hint: 'Execute ps aux e confira se o importador 4127 não aparece mais.' },
    ],
    suggestions: ['top', 'free -h', 'vmstat 1 3', 'kill 4127', 'ps aux'],
  },
  {
    id: 'javascript',
    title: 'Executar e alterar um programa',
    subtitle: 'Leia um arquivo JavaScript, execute-o com Node.js e confira sua alteração.',
    objective: 'Você recebeu um pequeno programa. Leia o código antes de executá-lo; depois faça uma alteração controlada e teste de novo.',
    chapterId: 'cap.dev.04',
    sectionId: 'javascript-ts',
    tasks: [
      { id: 'cd-project', title: 'Entre na pasta do projeto', hint: 'Use cd /home/aprendiz/projeto.' },
      { id: 'cat-code', title: 'Leia o código antes de executá-lo', hint: 'Use cat app.js.' },
      { id: 'run-original', title: 'Execute a versão inicial', hint: 'node app.js executa o exemplo conhecido pelo laboratório, sem avaliar código arbitrário.' },
      { id: 'edit-code', title: 'Altere app.js com redirecionamento', hint: 'Experimente echo \'console.log("Olá do terminal!")\' > app.js.' },
      { id: 'run-updated', title: 'Execute o programa alterado', hint: 'Rode node app.js outra vez e compare a saída.' },
      { id: 'check-code', title: 'Confira a sintaxe do arquivo', hint: 'Use node --check app.js.' },
    ],
    suggestions: ['cd /home/aprendiz/projeto', 'cat app.js', 'node app.js', 'node --check app.js'],
  },
  {
    id: 'git',
    title: 'Git: entender uma mudança',
    subtitle: 'Inspecione o estado do repositório, o histórico e as diferenças.',
    objective: 'Antes de registrar uma alteração, descubra o que mudou. Você vai editar uma anotação de exemplo e inspecionar a diferença que o Git detecta.',
    chapterId: 'cap.devops.01',
    sectionId: 'git',
    tasks: [
      { id: 'cd-git', title: 'Entre na pasta do projeto', hint: 'Use cd /home/aprendiz/projeto.' },
      { id: 'status', title: 'Confira o estado de trabalho', hint: 'git status mostra arquivos alterados e não rastreados.' },
      { id: 'log', title: 'Consulte o histórico', hint: 'git log --oneline resume os commits do repositório de exemplo.' },
      { id: 'edit-readme', title: 'Acrescente uma nota ao README', hint: 'Use echo "Anotação de estudo" >> README.md. O operador >> acrescenta sem apagar o conteúdo.' },
      { id: 'diff', title: 'Leia a diferença antes de registrar', hint: 'git diff -- README.md mostra a linha acrescentada.' },
    ],
    suggestions: ['cd /home/aprendiz/projeto', 'git status', 'git log --oneline', 'echo "Anotação de estudo" >> README.md', 'git diff -- README.md'],
  },
];

export const getTerminalLab = (id?: string): TerminalLab | undefined =>
  terminalLabs.find((lab) => lab.id === id);

export interface TerminalEntry {
  id: number;
  cwd: string;
  command: string;
  output: string;
  exitCode: 0 | 1;
}

export interface TerminalProcess {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  command: string;
  terminated: boolean;
}

export interface TerminalState {
  labId: TerminalLabId;
  cwd: string;
  files: Record<string, string>;
  directories: string[];
  permissions: Record<string, string>;
  processes: TerminalProcess[];
  history: TerminalEntry[];
  completedTasks: string[];
  nextEntryId: number;
}

export interface TerminalRun {
  state: TerminalState;
  entry: TerminalEntry;
}

const HOME = '/home/aprendiz';
const PROJECT = HOME + '/projeto';
const DEMO = HOME + '/projetos/demo';
const BASE_FILES: Record<string, string> = {
  [HOME + '/README.md']: 'Terminal de treinamento\n\nEste ambiente é virtual e isolado.\n',
  [HOME + '/.bashrc']: '# Preferências locais do shell de treinamento\n',
  [DEMO + '/README.md']: 'Projeto demo\n\n1. Leia o arquivo antes de executar qualquer programa.\n2. Registre o que encontrou.\n',
  [PROJECT + '/README.md']: '# Projeto de exemplo\n\nAplicação pequena para aprender comandos, código e Git.\n',
  [PROJECT + '/app.js']: 'console.log("Sistema pronto");\n',
  [PROJECT + '/package.json']: '{\n  "name": "projeto-de-estudo",\n  "version": "1.0.0",\n  "private": true\n}\n',
  [HOME + '/scripts/backup.sh']: '#!/bin/sh\necho "Relatorio de estudo pronto"\n',
  [HOME + '/dados/clientes.csv']: 'id,registro\n1,dado-ficticio\n',
  '/var/log/app.log': '2026-10-28T08:30:11Z INFO  serviço inicializado\n2026-10-28T08:31:04Z WARN  fila de relatórios crescendo\n2026-10-28T08:32:17Z ERROR conexão esgotada ao consultar relat-01\n2026-10-28T08:32:20Z ERROR nova tentativa excedeu o tempo limite\n2026-10-28T08:34:01Z INFO  nova tentativa agendada\n2026-10-28T08:35:40Z ERROR consulta excedeu 120 segundos\n',
  '/var/log/syslog': 'Oct 28 08:30:12 relat-01 kernel: memória livre abaixo do limite de alerta\nOct 28 08:32:18 relat-01 reports-api: tempo de resposta acima de 120s\nOct 28 08:35:41 relat-01 reports-api: requisição encerrada por timeout\n',
  '/etc/os-release': 'NAME="Debian GNU/Linux"\nVERSION="12 (bookworm)"\nID=debian\n',
  '/srv/relatorios/status.txt': 'Serviço de relatórios: degradado\nHost: relat-01\nÚltima coleta: 08:35 UTC\n',
};
const BASE_DIRECTORIES = [
  '/', '/home', HOME, HOME + '/projetos', DEMO, PROJECT, HOME + '/scripts', HOME + '/dados', '/var', '/var/log',
  '/etc', '/tmp', '/srv', '/srv/relatorios', '/proc', '/usr', '/usr/bin',
];
const BASE_MODES: Record<string, string> = {
  [HOME]: '755',
  [HOME + '/README.md']: '644',
  [HOME + '/.bashrc']: '644',
  [DEMO + '/README.md']: '644',
  [PROJECT + '/README.md']: '644',
  [PROJECT + '/app.js']: '644',
  [PROJECT + '/package.json']: '644',
  [HOME + '/scripts']: '755',
  [HOME + '/scripts/backup.sh']: '644',
  [HOME + '/dados']: '700',
  [HOME + '/dados/clientes.csv']: '640',
  '/var/log/app.log': '644',
  '/var/log/syslog': '640',
  '/etc/os-release': '644',
  '/srv/relatorios/status.txt': '644',
};
const INITIAL_PROCESSES: TerminalProcess[] = [
  { pid: 4127, user: 'relat', cpu: 9.8, mem: 71.5, command: 'importador', terminated: false },
  { pid: 912, user: 'postgres', cpu: 6.2, mem: 9.0, command: 'postgres', terminated: false },
  { pid: 1034, user: 'www-data', cpu: 1.1, mem: 2.3, command: 'nginx', terminated: false },
  { pid: 1, user: 'root', cpu: 0.1, mem: 0.4, command: 'systemd', terminated: false },
];

export function createTerminalState(labId: TerminalLabId): TerminalState {
  return {
    labId,
    cwd: HOME,
    files: { ...BASE_FILES },
    directories: [...BASE_DIRECTORIES],
    permissions: { ...BASE_MODES },
    processes: INITIAL_PROCESSES.map((p) => ({ ...p })),
    history: [],
    completedTasks: [],
    nextEntryId: 1,
  };
}

export function restoreTerminalState(labId: TerminalLabId, saved: unknown): TerminalState {
  if (!saved || typeof saved !== 'object') return createTerminalState(labId);
  const s = saved as Partial<TerminalState>;
  if (
    s.labId !== labId ||
    typeof s.cwd !== 'string' ||
    !Array.isArray(s.history) ||
    !Array.isArray(s.directories) ||
    !Array.isArray(s.processes) ||
    !s.files ||
    typeof s.files !== 'object'
  ) return createTerminalState(labId);
  return {
    ...createTerminalState(labId),
    ...s,
    permissions: s.permissions && typeof s.permissions === 'object' ? { ...BASE_MODES, ...s.permissions } : { ...BASE_MODES },
    history: s.history.slice(-100),
    completedTasks: Array.isArray(s.completedTasks) ? s.completedTasks.filter((x): x is string => typeof x === 'string') : [],
    nextEntryId: typeof s.nextEntryId === 'number' ? s.nextEntryId : s.history.length + 1,
  } as TerminalState;
}

export function isTerminalLabComplete(labId: TerminalLabId, state: TerminalState): boolean {
  const lab = getTerminalLab(labId);
  return !!lab && lab.tasks.every((task) => state.completedTasks.includes(task.id));
}

function resolvePath(cwd: string, rawPath?: string): string {
  let target = rawPath?.trim() || cwd;
  if (target === '~') target = HOME;
  else if (target.startsWith('~/')) target = HOME + target.slice(1);
  else if (!target.startsWith('/')) target = cwd + '/' + target;
  const out: string[] = [];
  for (const part of target.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') out.pop();
    else out.push(part);
  }
  return '/' + out.join('/');
}

function isDirectory(path: string, directories: string[]): boolean {
  return directories.includes(path);
}

function exists(path: string, state: TerminalState): boolean {
  return isDirectory(path, state.directories) || Object.prototype.hasOwnProperty.call(state.files, path);
}

function words(raw: string): string[] {
  const result: string[] = [];
  const re = /"((?:\\.|[^"])*)"|'((?:\\.|[^'])*)'|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw))) result.push((match[1] ?? match[2] ?? match[3] ?? '').replace(/\\(["'])/g, '$1'));
  return result;
}

function hasPermission(path: string, state: TerminalState, permission: 'r' | 'w' | 'x'): boolean {
  const isDir = state.directories.includes(path);
  const mode = (state.permissions[path] ?? (isDir ? '755' : '644')).padStart(3, '0').slice(-3);
  const ownerBits = Number.parseInt(mode[0], 8) || 0;
  const needed = permission === 'r' ? 4 : permission === 'w' ? 2 : 1;
  // Todos os arquivos de treino pertencem ao usuário atual, aprendiz; grupo/outros aparecem
  // nas saídas para estudo, mas não há troca de usuário neste sandbox.
  return (ownerBits & needed) !== 0;
}

function shellScriptOutput(script: string): string {
  const output = script.split('\n').map((line) => line.trim()).filter((line) => line.startsWith('echo ')).map((line) => {
    const match = line.match(/^echo\s+(?:"([^"]*)"|'([^']*)'|(.+))$/);
    return match ? (match[1] ?? match[2] ?? match[3] ?? '') : '';
  }).filter(Boolean);
  return output.length ? output.join('\n') : 'Script executado; não há comandos echo reconhecidos neste laboratório.';
}

function modeString(path: string, state: TerminalState): string {
  const isDir = state.directories.includes(path);
  const mode = (state.permissions[path] ?? (isDir ? '755' : '644')).padStart(3, '0').slice(-3);
  const letters = mode.split('').map((digit) => {
    const n = Number.parseInt(digit, 8) || 0;
    return (n & 4 ? 'r' : '-') + (n & 2 ? 'w' : '-') + (n & 1 ? 'x' : '-');
  }).join('');
  return (isDir ? 'd' : '-') + letters;
}

function changeMode(current: string, spec: string): string | undefined {
  if (/^[0-7]{3,4}$/.test(spec)) return spec.slice(-3);
  const match = spec.match(/^([ugoa]*)([+-])([rwx]+)$/);
  if (!match) return undefined;
  const scopes = match[1] || 'a';
  const operator = match[2];
  const perms = match[3];
  const digits = current.padStart(3, '0').slice(-3).split('').map((digit) => Number.parseInt(digit, 8) || 0);
  const slots = [4, 2, 1]; // dono, grupo, outros
  const scopeBits: Record<string, number> = { u: 4, g: 2, o: 1, a: 7 };
  const permBits: Record<string, number> = { r: 4, w: 2, x: 1 };
  for (let i = 0; i < 3; i++) {
    if (![...scopes].some((scope) => (scopeBits[scope] ?? 0) & slots[i])) continue;
    const bits = [...perms].reduce((n, perm) => n | permBits[perm], 0);
    digits[i] = operator === '+' ? digits[i] | bits : digits[i] & ~bits;
  }
  return digits.map((digit) => digit.toString(8)).join('');
}

function childNames(path: string, state: TerminalState): string[] {
  const prefix = path === '/' ? '/' : path + '/';
  const names = new Set<string>();
  for (const dir of state.directories) {
    if (dir === path || !dir.startsWith(prefix)) continue;
    const rest = dir.slice(prefix.length);
    if (rest && !rest.includes('/')) names.add(rest + '/');
  }
  for (const file of Object.keys(state.files)) {
    if (!file.startsWith(prefix)) continue;
    const rest = file.slice(prefix.length);
    if (rest && !rest.includes('/')) names.add(rest);
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}

function safeWritable(path: string): boolean {
  return path.startsWith(HOME + '/') || path.startsWith('/tmp/');
}

function baseCommand(command: string): string {
  return command.trim().replace(/^\.\//, '');
}

function nodeOutput(code: string): string {
  const output: string[] = [];
  const strings = /console\.log\(\s*(['"])(.*?)\1\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = strings.exec(code))) output.push(match[2].replace(/\\n/g, '\n'));
  const arithmetic = /console\.log\(\s*(-?\d+(?:\.\d+)?)\s*([+*/-])\s*(-?\d+(?:\.\d+)?)\s*\)/g;
  while ((match = arithmetic.exec(code))) {
    const a = Number(match[1]);
    const b = Number(match[3]);
    const v = match[2] === '+' ? a + b : match[2] === '-' ? a - b : match[2] === '*' ? a * b : b === 0 ? NaN : a / b;
    if (Number.isFinite(v)) output.push(String(v));
  }
  if (!output.length) return 'O laboratório reconhece console.log com texto literal e contas numéricas simples. Não executou código arbitrário.';
  return output.join('\n');
}

function processTable(processes: TerminalProcess[]): string {
  const active = processes.filter((p) => !p.terminated);
  return ['USER       PID %CPU %MEM COMMAND', ...active.map((p) =>
    p.user.padEnd(10) + ' ' + String(p.pid).padStart(4) + ' ' + p.cpu.toFixed(1).padStart(4) + ' ' + p.mem.toFixed(1).padStart(4) + ' ' + p.command,
  )].join('\n');
}

function taskUpdates(
  labId: TerminalLabId,
  command: string,
  args: string[],
  before: TerminalState,
  after: TerminalState,
  output: string,
  exitCode: 0 | 1,
): string[] {
  const done = new Set(after.completedTasks);
  const cmd = command;
  const argText = args.join(' ');
  const success = exitCode === 0;
  const mark = (id: string) => done.add(id);
  const valid = (text: string) => success && text.length > 0;
  if (labId === 'primeiros-passos') {
    if (cmd === 'pwd' && valid(output)) mark('pwd');
    if (cmd === 'ls' && args.some((a) => a.includes('a')) && valid(output)) mark('ls-hidden');
    if (cmd === 'cd' && after.cwd === DEMO) mark('cd-demo');
    if (cmd === 'cat' && before.cwd === DEMO && args.includes('README.md') && valid(output)) mark('readme');
  }
  if (labId === 'arquivos-logs') {
    if (cmd === 'cd' && after.cwd === '/var/log') mark('cd-logs');
    if (cmd === 'ls' && after.cwd === '/var/log' && valid(output)) mark('list-logs');
    if (cmd === 'grep' && argText.toLowerCase().includes('error') && argText.includes('app.log') && output.includes('ERROR')) mark('grep-error');
    if (cmd === 'tail' && after.cwd === '/var/log' && argText.includes('app.log') && valid(output)) mark('tail-log');
  }
  if (labId === 'permissoes') {
    const script = HOME + '/scripts/backup.sh';
    const dataFile = HOME + '/dados/clientes.csv';
    if (cmd === 'cd' && after.cwd === HOME) mark('cd-home');
    if (cmd === 'ls' && args.some((a) => a === 'scripts' || a.endsWith('/scripts')) && args.some((a) => a.startsWith('-') && a.includes('l')) && valid(output)) mark('ls-mode');
    if (cmd === 'stat' && args.includes('scripts/backup.sh') && output.includes('0644') && success) mark('stat-script');
    if (cmd === 'chmod' && args[0] === 'u+x' && args[1] === 'scripts/backup.sh' && after.permissions[script] === '744' && success) mark('chmod-script');
    if (cmd === 'ls' && args.some((a) => a.endsWith('backup.sh')) && args.some((a) => a.startsWith('-') && a.includes('l')) && modeString(script, after).includes('x') && valid(output)) mark('verify-script');
    if (cmd === 'scripts/backup.sh' && output.includes('Relatorio de estudo pronto') && success) mark('run-script');
    if (cmd === 'chmod' && args[0] === '600' && args[1] === 'dados/clientes.csv' && after.permissions[dataFile] === '600' && success) mark('secure-data');
    if (cmd === 'stat' && args.includes('dados/clientes.csv') && output.includes('0600') && success) mark('verify-data');
  }
  if (labId === 'processos-linux') {
    if (cmd === 'top' && valid(output)) mark('top');
    if (cmd === 'free' && args.includes('-h') && valid(output)) mark('free');
    if (cmd === 'vmstat' && valid(output)) mark('vmstat');
    if (cmd === 'kill' && args.length === 1 && args[0] === '4127' && !after.processes.find((p) => p.pid === 4127 && !p.terminated)) mark('kill-graceful');
    if (cmd === 'ps' && args.includes('aux') && after.completedTasks.includes('kill-graceful') && !output.includes('4127')) mark('verify');
  }
  if (labId === 'javascript') {
    if (cmd === 'cd' && after.cwd === PROJECT) mark('cd-project');
    if (cmd === 'cat' && before.cwd === PROJECT && args.includes('app.js') && valid(output)) mark('cat-code');
    if (cmd === 'node' && args[0] === 'app.js' && before.cwd === PROJECT && output.includes('Sistema pronto')) mark('run-original');
    if (cmd === 'echo' && output.includes(PROJECT + '/app.js') && after.files[PROJECT + '/app.js'] !== BASE_FILES[PROJECT + '/app.js']) mark('edit-code');
    if (cmd === 'node' && args[0] === 'app.js' && before.cwd === PROJECT && after.files[PROJECT + '/app.js'] !== BASE_FILES[PROJECT + '/app.js'] && output.length > 0) mark('run-updated');
    if (cmd === 'node' && args[0] === '--check' && args[1] === 'app.js' && before.cwd === PROJECT && valid(output)) mark('check-code');
  }
  if (labId === 'git') {
    if (cmd === 'cd' && after.cwd === PROJECT) mark('cd-git');
    if (cmd === 'git' && args[0] === 'status' && valid(output)) mark('status');
    if (cmd === 'git' && args[0] === 'log' && valid(output)) mark('log');
    if (after.files[PROJECT + '/README.md'] !== BASE_FILES[PROJECT + '/README.md']) mark('edit-readme');
    if (cmd === 'git' && args[0] === 'diff' && args.includes('README.md') && output.includes('Anotação')) mark('diff');
  }
  return [...done];
}

export function runTerminalCommand(state: TerminalState, rawCommand: string): TerminalRun {
  const commandText = rawCommand.trim().slice(0, 500);
  if (!commandText) return { state, entry: { id: state.nextEntryId, cwd: state.cwd, command: '', output: '', exitCode: 0 } };
  const before = state;
  let cwd = state.cwd;
  let files = { ...state.files };
  let directories = [...state.directories];
  let permissions = { ...state.permissions };
  let processes = state.processes.map((p) => ({ ...p }));
  let output = '';
  let exitCode: 0 | 1 = 0;
  let command = '';
  let args: string[] = [];
  const redirection = commandText.match(/^echo\s+(?:"([^"]*)"|'([^']*)'|(.+?))\s*(>>|>)\s*(\S+)\s*$/);
  if (redirection) {
    command = 'echo';
    const content = redirection[1] ?? redirection[2] ?? redirection[3] ?? '';
    const append = redirection[4] === '>>';
    const target = resolvePath(cwd, redirection[5]);
    if (!safeWritable(target)) {
      output = 'Permissão negada: o laboratório só permite gravar em /home/aprendiz e /tmp.';
      exitCode = 1;
    } else if (!isDirectory(target.slice(0, target.lastIndexOf('/')) || '/', directories)) {
      output = 'Diretório de destino não existe. Crie a pasta antes de gravar.';
      exitCode = 1;
    } else if (files[target] !== undefined && !hasPermission(target, { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId }, 'w')) {
      output = 'Permissão negada: o usuário aprendiz não tem escrita neste arquivo.';
      exitCode = 1;
    } else {
      files[target] = append ? (files[target] ?? '') + content + '\n' : content + '\n';
      output = 'Arquivo atualizado: ' + target;
      args = [content, redirection[4], redirection[5]];
    }
  } else {
    const tokens = words(commandText);
    command = baseCommand(tokens[0] ?? '');
    args = tokens.slice(1);
    const firstPath = args.find((a) => !a.startsWith('-'));
        const fileAt = (p: string) => files[p];
    const fail = (msg: string) => { output = msg; exitCode = 1; };
    const linesFor = (p: string) => fileAt(p)?.replace(/\n$/, '').split('\n') ?? [];
    switch (command) {
      case 'help':
        output = [
          'Comandos disponíveis neste ambiente didático:',
          'pwd, ls -la, cd, cat, head, tail, grep, find, touch, mkdir, cp, mv, rm, echo ... > arquivo',
          'whoami, uname -a, free -h, top, ps aux, vmstat 1 3, kill PID, df -h, du -sh, ip addr, ping',
          'node, node --check, npm, git status, git log, git diff.',
          'Alguns comandos são amostras simuladas; nada é executado fora deste laboratório.',
        ].join('\n');
        break;
      case 'pwd':
        output = cwd;
        break;
      case 'whoami':
        output = 'aprendiz';
        break;
      case 'uname':
        output = args.includes('-a') ? 'Linux terminal-lab 6.8.0-educational #1 SMP x86_64 GNU/Linux' : 'Linux';
        break;
      case 'date':
        output = 'qua 28 out 2026 13:16:00 -03 (horário ilustrativo do laboratório)';
        break;
      case 'ls': {
        const targetArg = args.find((a) => !a.startsWith('-'));
        const target = resolvePath(cwd, targetArg);
        const longFormat = args.some((a) => a.startsWith('-') && a.includes('l'));
        const includeHidden = args.some((a) => a.startsWith('-') && a.includes('a'));
        const view = { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId };
        if (!exists(target, view)) fail('ls: não é possível acessar ' + (targetArg ?? '.') + ': caminho inexistente');
        else if (!isDirectory(target, directories)) {
          const name = target.split('/').pop() ?? target;
          output = longFormat
            ? modeString(target, view) + ' 1 aprendiz aprendiz ' + String(files[target]?.length ?? 0).padStart(5) + ' Out 28 09:10 ' + name
            : name;
        } else {
          let names = childNames(target, view);
          if (includeHidden) {
            names = ['.', '..', ...names];
            if (target === HOME && !names.includes('.bashrc')) names.push('.bashrc');
            names = [...new Set(names)].sort();
          }
          output = longFormat
            ? names.map((name) => {
                const cleanName = name.endsWith('/') ? name.slice(0, -1) : name;
                const fullPath = cleanName === '.' ? target : cleanName === '..'
                  ? (target.slice(0, target.lastIndexOf('/')) || '/')
                  : resolvePath(target, cleanName);
                const size = files[fullPath]?.length ?? 4096;
                return modeString(fullPath, view) + ' 1 aprendiz aprendiz ' + String(size).padStart(5) + ' Out 28 09:10 ' + name;
              }).join('\n')
            : names.length ? names.join('  ') : '(diretório vazio)';
        }
        break;
      }
      case 'cd': {
        const target = resolvePath(cwd, args[0] ?? HOME);
        if (isDirectory(target, directories)) cwd = target;
        else fail('cd: diretório inexistente: ' + (args[0] ?? HOME));
        break;
      }
      case 'cat':
      case 'head':
      case 'tail': {
        const fileArg = args.find((a, index) => !a.startsWith('-') && !(index > 0 && args[index - 1] === '-n'));
        if (!fileArg) fail(command + ': informe um arquivo');
        else {
          const path = resolvePath(cwd, fileArg);
          if (isDirectory(path, directories)) fail(command + ': ' + fileArg + ' é um diretório');
          else if (files[path] === undefined) fail(command + ': ' + fileArg + ': arquivo inexistente');
          else if (!hasPermission(path, { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId }, 'r')) fail(command + ': ' + fileArg + ': Permissão negada');
          else {
            let lines = linesFor(path);
            const nIndex = args.indexOf('-n');
            const n = nIndex >= 0 ? Math.max(1, Math.min(100, Number(args[nIndex + 1]) || 10)) : 10;
            if (command === 'head') lines = lines.slice(0, n);
            if (command === 'tail') lines = lines.slice(-n);
            output = lines.join('\n');
          }
        }
        break;
      }
      case 'grep': {
        const values = args.filter((a) => !a.startsWith('-'));
        const pattern = values[0];
        const fileArgs = values.slice(1);
        if (!pattern || !fileArgs.length) fail('Uso: grep [-in] PADRÃO ARQUIVO');
        else {
          const matches: string[] = [];
          for (const f of fileArgs) {
            const p = resolvePath(cwd, f);
            if (files[p] === undefined) { fail('grep: ' + f + ': arquivo inexistente'); break; }
            linesFor(p).forEach((line, i) => {
              const insensitive = args.some((a) => a.startsWith('-') && a.includes('i'));
              const numbered = args.some((a) => a.startsWith('-') && a.includes('n'));
              const haystack = insensitive ? line.toLowerCase() : line;
              const needle = insensitive ? pattern.toLowerCase() : pattern;
              if (haystack.includes(needle)) matches.push((numbered ? String(i + 1) + ':' : '') + line);
            });
          }
          if (exitCode === 0) output = matches.join('\n') || 'Nenhuma linha corresponde ao padrão.';
        }
        break;
      }
      case 'find': {
        const base = resolvePath(cwd, args[0] && !args[0].startsWith('-') ? args[0] : '.');
        const nameIndex = args.indexOf('-name');
        const pattern = nameIndex >= 0 ? args[nameIndex + 1]?.replace(/^["']|["']$/g, '') : undefined;
        if (!exists(base, { ...state, files, directories, processes, cwd, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId })) fail('find: caminho inexistente: ' + base);
        else {
          const all = [...directories, ...Object.keys(files)].filter((p) => p === base || p.startsWith(base === '/' ? '/' : base + '/'));
          const filtered = pattern ? all.filter((p) => {
            const name = p.split('/').pop() ?? '';
            if (pattern.startsWith('*.')) return name.endsWith(pattern.slice(1));
            return name === pattern;
          }) : all;
          output = filtered.sort().join('\n');
        }
        break;
      }
      case 'mkdir': {
        const recursive = args.includes('-p');
        const raw = args.find((a) => !a.startsWith('-'));
        if (!raw) fail('mkdir: informe um diretório');
        else {
          const target = resolvePath(cwd, raw);
          if (!safeWritable(target)) fail('Permissão negada: grave apenas em /home/aprendiz ou /tmp.');
          else if (directories.includes(target)) output = 'mkdir: o diretório já existe: ' + target;
          else {
            const parent = target.slice(0, target.lastIndexOf('/')) || '/';
            if (!directories.includes(parent) && !recursive) fail('mkdir: diretório pai inexistente; use -p para criar os níveis intermediários.');
            else {
              if (recursive) {
                const parts = target.split('/').filter(Boolean);
                let p = '';
                for (const part of parts) { p += '/' + part; if (!directories.includes(p)) { directories.push(p); permissions[p] ??= '755'; } }
              } else { directories.push(target); permissions[target] = '755'; }
              output = 'Diretório criado: ' + target;
            }
          }
        }
        break;
      }
      case 'touch': {
        const raw = args.find((a) => !a.startsWith('-'));
        if (!raw) fail('touch: informe um arquivo');
        else {
          const target = resolvePath(cwd, raw);
          if (!safeWritable(target)) fail('Permissão negada: grave apenas em /home/aprendiz ou /tmp.');
          else if (!directories.includes(target.slice(0, target.lastIndexOf('/')) || '/')) fail('Diretório pai inexistente.');
          else { if (files[target] === undefined) { files[target] = ''; permissions[target] = '644'; } output = ''; }
        }
        break;
      }
      case 'echo':
        output = args.join(' ');
        break;
      case 'rm': {
        if (args.some((a) => a === '-rf' || a === '-r' || a === '-f') && args.some((a) => a.includes('/'))) {
          fail('Operação bloqueada neste laboratório: remoção recursiva/forçada não está disponível.');
          break;
        }
        const raw = args.find((a) => !a.startsWith('-'));
        const target = raw ? resolvePath(cwd, raw) : '';
        if (!raw) fail('rm: informe um arquivo');
        else if (!safeWritable(target)) fail('Permissão negada: arquivos do sistema são protegidos.');
        else if (files[target] === undefined) fail('rm: não foi possível remover: arquivo inexistente');
        else { delete files[target]; delete permissions[target]; output = ''; }
        break;
      }
      case 'cp':
      case 'mv': {
        const values = args.filter((a) => !a.startsWith('-'));
        if (values.length < 2) fail(command + ': informe origem e destino');
        else {
          const from = resolvePath(cwd, values[0]);
          const to = resolvePath(cwd, values[1]);
          if (files[from] === undefined) fail(command + ': arquivo de origem inexistente');
          else if (!safeWritable(to) || !directories.includes(to.slice(0, to.lastIndexOf('/')) || '/')) fail('Destino não permitido ou diretório pai inexistente.');
          else {
            files[to] = files[from];
            permissions[to] = permissions[from] ?? '644';
            if (command === 'mv') { delete files[from]; delete permissions[from]; }
            output = '';
          }
        }
        break;
      }
      case 'stat': {
        const raw = args.find((a) => !a.startsWith('-'));
        const target = raw ? resolvePath(cwd, raw) : '';
        const view = { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId };
        if (!raw) fail('stat: informe um arquivo ou diretório');
        else if (!exists(target, view)) fail('stat: não foi possível consultar ' + raw + ': caminho inexistente');
        else {
          const size = files[target]?.length ?? 4096;
          const mode = (permissions[target] ?? (directories.includes(target) ? '755' : '644')).padStart(4, '0');
          const type = directories.includes(target) ? 'diretório' : 'arquivo regular';
          output = [
            '  File: ' + target,
            '  Size: ' + size + '  Blocks: ' + Math.ceil(size / 512) + '  IO Block: 4096 ' + type,
            'Access: (' + mode + '/' + modeString(target, view) + ')  Uid: (1000/aprendiz)  Gid: (1000/aprendiz)',
          ].join('\n');
        }
        break;
      }
      case 'chmod': {
        const spec = args[0];
        const raw = args[1];
        const target = raw ? resolvePath(cwd, raw) : '';
        const view = { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId };
        if (!spec || !raw) fail('Uso: chmod MODO ARQUIVO');
        else if (!exists(target, view)) fail('chmod: não foi possível acessar ' + raw + ': caminho inexistente');
        else if (!safeWritable(target)) fail('Permissão negada: o laboratório só permite mudar permissões em /home/aprendiz e /tmp.');
        else {
          const oldMode = permissions[target] ?? (directories.includes(target) ? '755' : '644');
          const newMode = changeMode(oldMode, spec);
          if (!newMode) fail('chmod: modo não reconhecido. Use um modo octal como 600 ou uma alteração simbólica como u+x.');
          else { permissions[target] = newMode; output = ''; }
        }
        break;
      }
      case 'free':
        if (!args.includes('-h')) fail('Neste exercício, use free -h para ver unidades legíveis.');
        else {
          const alive = processes.some((p) => p.pid === 4127 && !p.terminated);
          output = [
            '               total        used        free      shared  buff/cache   available',
            'Mem:            7.6Gi       ' + (alive ? '7.4Gi' : '2.1Gi') + '       ' + (alive ? '96Mi' : '5.4Gi') + '       128Mi       1.3Gi       ' + (alive ? '128Mi' : '5.1Gi'),
            'Swap:           2.0Gi       ' + (alive ? '1.9Gi' : '0.1Gi') + '       ' + (alive ? '118Mi' : '1.9Gi'),
          ].join('\n');
        }
        break;
      case 'top': {
        const alive = processes.some((p) => p.pid === 4127 && !p.terminated);
        output = [
          'top - amostra didática do relat-01',
          'Tasks: 142 total, ' + (alive ? '3' : '2') + ' running, 139 sleeping',
          '%Cpu(s): 12.0 us, 4.1 sy, 9.6 id, ' + (alive ? '74.3 wa' : '2.1 wa'),
          'MiB Mem : 7820 total, ' + (alive ? '96 free, 7590 used' : '5520 free, 1900 used'),
          'MiB Swap: 2048 total, ' + (alive ? '1930 used, 118 free' : '100 used, 1948 free'),
          '',
          processTable(processes),
        ].join('\n');
        break;
      }
      case 'ps':
        if (!args.includes('aux')) fail('Experimente ps aux para listar processos.');
        else output = processTable(processes);
        break;
      case 'vmstat': {
        const alive = processes.some((p) => p.pid === 4127 && !p.terminated);
        output = [
          'procs  ----memory----   ---swap--',
          ' r  b   swpd   free     si    so',
          alive ? ' 1  6 1976320  98500  4120  3980' : ' 1  0  102400 5520000     0     0',
          alive ? ' 0  7 1977100  96100  4310  4050' : ' 0  0  102400 5512000     0     0',
          alive ? ' 1  6 1976800  97300  4005  4120' : ' 0  0  102400 5508000     0     0',
        ].join('\n');
        break;
      }
      case 'kill': {
        const sigkill = args[0] === '-9';
        const pidText = sigkill ? args[1] : args[0];
        const pid = Number(pidText);
        const p = processes.find((x) => x.pid === pid && !x.terminated);
        if (!pidText || !Number.isInteger(pid)) fail('Uso: kill [ -9 ] PID');
        else if (!p) fail('kill: processo ' + pid + ' não está em execução');
        else {
          p.terminated = true;
          output = sigkill
            ? 'SIGKILL (9) aplicado ao PID ' + pid + '. Encerramento forçado simulado; prefira SIGTERM primeiro quando possível.'
            : 'SIGTERM (15) enviado ao PID ' + pid + ' (' + p.command + '). Processo encerrado no cenário simulado.';
        }
        break;
      }
      case 'df':
        output = args.includes('-h')
          ? 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1        40G   18G   20G  48% /\ntmpfs           3.8G    0   3.8G   0% /tmp'
          : 'Use df -h para ver os tamanhos em unidades legíveis.';
        break;
      case 'du':
        output = args.includes('-sh') ? '124M  ' + resolvePath(cwd, firstPath) : 'Use du -sh CAMINHO para estimar o tamanho.';
        break;
      case 'ip':
        output = args.includes('addr') ? 'lo: 127.0.0.1/8\neth0: 192.0.2.24/24 (endereço reservado para documentação)' : 'Experimente ip addr.';
        break;
      case 'ping':
        output = args.includes('relat-01') || args.some((a) => a === 'example.com')
          ? 'PING relat-01 (192.0.2.31): 3 pacotes enviados, 3 recebidos, perda 0% (amostra simulada)'
          : 'PING (amostra simulada): use ping -c 3 relat-01';
        break;
      case 'systemctl':
        output = '● reports-api.service - API de relatórios\n   Loaded: loaded (/etc/systemd/system/reports-api.service; enabled)\n   Active: active (running) · saída demonstrativa';
        break;
      case 'journalctl':
        output = 'Oct 28 08:32:18 relat-01 reports-api: tempo de resposta acima de 120s\nOct 28 08:35:41 relat-01 reports-api: requisição encerrada por timeout';
        break;
      case 'scripts/backup.sh': {
        const target = resolvePath(cwd, command);
        const view = { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId };
        if (files[target] === undefined) fail(command + ': arquivo inexistente');
        else if (!hasPermission(target, view, 'x')) fail('bash: ' + command + ': Permissão negada. Verifique a permissão de execução com ls -l e chmod.');
        else output = shellScriptOutput(files[target]);
        break;
      }
      case 'node': {
        const fileArg = args.find((a) => a.endsWith('.js'));
        if (args[0] === '--version' || args[0] === '-v') output = 'v22.11.0 (versão de exemplo)';
        else if (args[0] === '--check' && args[1]?.endsWith('.js')) {
          const target = resolvePath(cwd, args[1]);
          if (files[target] === undefined) fail('node --check: arquivo inexistente: ' + args[1]);
          else {
            const code = files[target];
            const open = [...code].filter((ch) => ch === '(' || ch === '{' || ch === '[').length;
            const close = [...code].filter((ch) => ch === ')' || ch === '}' || ch === ']').length;
            if (open !== close || !code.includes('console.log')) fail('SyntaxError: verifique parênteses, chaves e console.log no exemplo.');
            else output = 'Syntax OK';
          }
        } else if (!fileArg) fail('Uso: node ARQUIVO.js ou node --check ARQUIVO.js');
        else {
          const target = resolvePath(cwd, fileArg);
          if (files[target] === undefined) fail('node: arquivo inexistente: ' + fileArg);
          else if (!hasPermission(target, { ...state, cwd, files, directories, permissions, processes, history: state.history, completedTasks: state.completedTasks, nextEntryId: state.nextEntryId }, 'r')) fail('node: ' + fileArg + ': Permissão negada');
          else output = nodeOutput(files[target]);
        }
        break;
      }
      case 'python':
        if (args[0] === '--version' || args[0] === '-V') output = 'Python 3.12.0 (versão de exemplo)';
        else if (args[0] === '-c' && args[1]) {
          const m = args[1].match(/^print\((['"])(.*?)\1\)$/);
          output = m ? m[2] : 'O laboratório só interpreta print com texto literal; não executa código arbitrário.';
          if (!m) exitCode = 1;
        } else fail('Uso: python --version ou python -c "print(\'texto\')"');
        break;
      case 'npm':
        if (args[0] === '--version' || args[0] === '-v') output = '10.9.0 (versão de exemplo)';
        else if (args[0] === 'test') output = 'Testes de exemplo: 4 passaram, 0 falharam (resultado simulado).';
        else if (args[0] === 'run' && args[1] === 'build') output = 'Build didático concluído. Nenhum pacote ou arquivo real foi instalado.';
        else fail('Neste ambiente, npm só reconhece --version, test e run build.');
        break;
      case 'git': {
        if (!cwd.startsWith(PROJECT)) { fail('fatal: não é um repositório Git (entre em /home/aprendiz/projeto)'); break; }
        if (args[0] === 'status') {
          const changed = files[PROJECT + '/README.md'] !== BASE_FILES[PROJECT + '/README.md'] || files[PROJECT + '/app.js'] !== BASE_FILES[PROJECT + '/app.js'];
          output = args.includes('--short')
            ? (files[PROJECT + '/README.md'] !== BASE_FILES[PROJECT + '/README.md'] ? ' M README.md\n' : '') + (files[PROJECT + '/app.js'] !== BASE_FILES[PROJECT + '/app.js'] ? ' M app.js\n' : '')
            : 'On branch main\n' + (changed ? 'Changes not staged for commit:\n  modified: ' + (files[PROJECT + '/README.md'] !== BASE_FILES[PROJECT + '/README.md'] ? 'README.md' : 'app.js') : 'nothing to commit, working tree clean');
          if (!output.trim()) output = 'working tree clean';
        } else if (args[0] === 'log') output = 'a13f7c2 (HEAD -> main) exemplo: estrutura inicial\n8b42d10 exemplo: cria app.js';
        else if (args[0] === 'branch') output = '* main';
        else if (args[0] === 'diff') {
          const targetArg = args.find((a) => a === 'README.md' || a === 'app.js') ?? 'README.md';
          const target = PROJECT + '/' + targetArg;
          const beforeText = BASE_FILES[target] ?? '';
          const afterText = files[target] ?? '';
          if (beforeText === afterText) output = '';
          else {
            const oldLines = beforeText.replace(/\n$/, '').split('\n');
            const newLines = afterText.replace(/\n$/, '').split('\n');
            const added = newLines.filter((line) => !oldLines.includes(line));
            output = 'diff --git a/' + targetArg + ' b/' + targetArg + '\n--- a/' + targetArg + '\n+++ b/' + targetArg + '\n' + added.map((line) => '+' + line).join('\n');
          }
        } else fail('Experimente git status, git log --oneline, git branch ou git diff -- README.md.');
        break;
      }
      case 'clear':
        output = 'O histórico é mantido para você revisar os comandos. Use Reiniciar ambiente para começar de novo.';
        break;
      case 'sudo':
      case 'su':
      case 'shutdown':
      case 'reboot':
        fail('Comando bloqueado por segurança: este ambiente não oferece privilégios administrativos nem controla o dispositivo.');
        break;
      default:
        fail(command + ': comando não encontrado no laboratório. Digite help para ver os comandos disponíveis.');
    }
  }

  const entry: TerminalEntry = { id: state.nextEntryId, cwd: state.cwd, command: commandText, output, exitCode };
  let next: TerminalState = {
    ...state,
    cwd,
    files,
    directories,
    permissions,
    processes,
    history: [...state.history, entry].slice(-100),
    nextEntryId: state.nextEntryId + 1,
  };
  next = { ...next, completedTasks: taskUpdates(state.labId, command, args, before, next, output, exitCode) };
  return { state: next, entry };
}
