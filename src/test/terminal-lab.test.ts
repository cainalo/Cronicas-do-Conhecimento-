import { describe, expect, it } from 'vitest';
import {
  createTerminalState,
  executeTerminalCommand,
  getTerminalLab,
  terminalLabProgress,
} from '@/lib/terminal-lab';

function session() {
  let state = createTerminalState();
  return {
    get state() { return state; },
    run(command: string) {
      const result = executeTerminalCommand(state, command);
      state = result.state;
      return result.output;
    },
  };
}

describe('terminal Linux virtual e isolado', () => {
  it('começa em /home/aluno e navega por diretórios reais do cenário', () => {
    const shell = session();
    expect(shell.run('pwd')).toBe('/home/aluno');
    expect(shell.run('cd /var/log')).toBe('');
    expect(shell.run('pwd')).toBe('/var/log');
    expect(shell.run('ls -la')).toContain('relat-01.log');
  });

  it('lê logs e filtra linhas ERROR com a sintaxe usual do grep', () => {
    const shell = session();
    const all = shell.run('cat /var/log/relat-01.log');
    expect(all).toContain('timeout ao consultar banco de dados');
    const errors = shell.run('grep ERROR /var/log/relat-01.log');
    expect(errors).toContain('ERROR timeout ao consultar banco de dados');
    expect(errors).toContain('ERROR pool de conexoes esgotado');
    expect(errors).not.toContain('INFO relat-api inicializado');
  });

  it('cria uma cópia, altera permissão e preserva o arquivo original', () => {
    const shell = session();
    expect(shell.run('mkdir -p /home/aluno/backup')).toBe('');
    expect(shell.run('cp /var/log/relat-01.log /home/aluno/backup/relat-01.log')).toBe('');
    expect(shell.run('chmod 640 /home/aluno/backup/relat-01.log')).toBe('');
    expect(shell.state.files['/home/aluno/backup/relat-01.log'].mode).toBe('640');
    expect(shell.state.files['/var/log/relat-01.log']).toBeDefined();
    expect(shell.run('ls -l /home/aluno/backup')).toContain('rw-r-----');
  });

  it('apresenta processos, memória, rede, serviço e logs como saídas didáticas consistentes', () => {
    const shell = session();
    expect(shell.run('ps aux')).toContain('relat-api');
    expect(shell.run('top')).toContain('71.5');
    expect(shell.run('vmstat 2')).toContain('4120');
    expect(shell.run('free -h')).toContain('Swap:');
    expect(shell.run('df -h')).toContain('/dev/vda1');
    expect(shell.run('ip addr')).toContain('10.0.0.24/24');
    expect(shell.run('ping -c 4 10.0.0.12')).toContain('0% packet loss');
    expect(shell.run('systemctl status relat-api')).toContain('active (running)');
    expect(shell.run('journalctl -u relat-api')).toContain('pool de conexões esgotado');
  });

  it('faz o processo virtual mudar depois de SIGTERM e recupera RAM/swap sem reiniciar o serviço', () => {
    const shell = session();
    expect(shell.run('top')).toContain('importador');
    expect(shell.run('vmstat 2')).toContain('4120');
    expect(shell.run('kill 4127')).toContain('SIGTERM');
    expect(shell.run('ps aux')).not.toContain('importador');
    expect(shell.run('free -h')).toContain('5.4Gi');
    expect(shell.run('free -h')).toContain('1.9Gi');
    expect(shell.run('systemctl status relat-api')).toContain('active (running)');
  });
  it('distingue o encerramento forçado SIGKILL e preserva outros processos do sistema simulado', () => {
    const shell = session();
    expect(shell.run('kill -9 4127')).toContain('SIGKILL');
    expect(shell.run('ps aux')).toContain('relat-api');
    expect(shell.run('ps aux')).not.toContain('importador');
  });

  it('não executa comandos administrativos nem permite remover diretórios de sistema', () => {
    const shell = session();
    expect(shell.run('sudo rm -rf /')).toContain('não concede privilégios administrativos');
    expect(shell.run('rm -rf /')).toContain('protegida no laboratório');
    expect(shell.state.files['/etc/os-release']).toBeDefined();
    expect(shell.state.files['/var/log/relat-01.log']).toBeDefined();
  });

  it('os objetivos de cada laboratório dependem dos comandos que produzem evidências', () => {
    const lab = getTerminalLab('arquivos')!;
    const shell = session();
    expect(terminalLabProgress(lab, shell.state)).toMatchObject({ completed: 0, total: 4, done: false });
    shell.run('ls -la');
    shell.run('cd /var/log');
    shell.run('cat /var/log/relat-01.log');
    shell.run('grep ERROR /var/log/relat-01.log');
    expect(terminalLabProgress(lab, shell.state)).toMatchObject({ completed: 4, total: 4, done: true });
    expect(getTerminalLab('desconhecido')).toBeUndefined();
  });

  it('clear limpa somente a saída, não a história de comandos nem os arquivos virtuais', () => {
    const shell = session();
    shell.run('touch anotacao.txt');
    const result = executeTerminalCommand(shell.state, 'clear');
    expect(result.cleared).toBe(true);
    expect(result.state.commands).toContain('touch anotacao.txt');
    expect(result.state.files['/home/aluno/anotacao.txt']).toBeDefined();
    expect(result.state.transcript).toEqual([]);
  });
});
