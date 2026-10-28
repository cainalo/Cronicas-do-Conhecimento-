import { describe, expect, it } from 'vitest';
import {
  createTerminalState,
  getTerminalLab,
  isTerminalLabComplete,
  restoreTerminalState,
  runTerminalCommand,
} from '@/lib/terminal';

function run(state: ReturnType<typeof createTerminalState>, command: string) {
  return runTerminalCommand(state, command);
}

describe('laboratórios de terminal', () => {
  it('primeiros passos: navegar, ver arquivos ocultos e ler instruções', () => {
    let state = createTerminalState('primeiros-passos');
    state = run(state, 'pwd').state;
    expect(state.completedTasks).toContain('pwd');
    state = run(state, 'ls -la').state;
    expect(state.history[state.history.length - 1]?.output).toContain('.bashrc');
    state = run(state, 'cd /home/aprendiz/projetos/demo').state;
    state = run(state, 'cat README.md').state;
    expect(state.history[state.history.length - 1]?.output).toContain('Projeto demo');
    expect(isTerminalLabComplete('primeiros-passos', state)).toBe(true);
  });

  it('logs: encontra erros pelo padrão e lê o fim do arquivo', () => {
    let state = createTerminalState('arquivos-logs');
    state = run(state, 'cd /var/log').state;
    state = run(state, 'ls -lah').state;
    state = run(state, 'grep -in "ERROR" app.log').state;
    expect(state.history[state.history.length - 1]?.output).toContain('ERROR');
    expect(state.history[state.history.length - 1]?.output).toContain('3:');
    state = run(state, 'tail -n 5 app.log').state;
    expect(state.history[state.history.length - 1]?.output).toContain('120 segundos');
    expect(isTerminalLabComplete('arquivos-logs', state)).toBe(true);
  });

  it('chamado do servidor: observa memória, processos e verifica o encerramento', () => {
    let state = createTerminalState('processos-linux');
    state = run(state, 'top').state;
    expect(state.history[state.history.length - 1]?.output).toContain('4127');
    state = run(state, 'free -h').state;
    expect(state.history[state.history.length - 1]?.output).toContain('96Mi');
    state = run(state, 'vmstat 1 3').state;
    expect(state.history[state.history.length - 1]?.output).toContain('4120');
    state = run(state, 'kill 4127').state;
    expect(state.history[state.history.length - 1]?.output).toContain('SIGTERM');
    state = run(state, 'ps aux').state;
    expect(state.history[state.history.length - 1]?.output).not.toContain('4127');
    expect(isTerminalLabComplete('processos-linux', state)).toBe(true);
    state = run(state, 'free -h').state;
    expect(state.history[state.history.length - 1]?.output).toContain('5.4Gi');
  });

  it('JavaScript: edita um arquivo do sistema virtual, executa e valida sintaxe', () => {
    let state = createTerminalState('javascript');
    state = run(state, 'cd /home/aprendiz/projeto').state;
    state = run(state, 'cat app.js').state;
    state = run(state, 'node app.js').state;
    expect(state.history[state.history.length - 1]?.output).toContain('Sistema pronto');
    state = run(state, 'echo \'console.log("Olá do terminal!")\' > app.js').state;
    state = run(state, 'node app.js').state;
    expect(state.history[state.history.length - 1]?.output).toContain('Olá do terminal!');
    state = run(state, 'node --check app.js').state;
    expect(state.history[state.history.length - 1]?.output).toContain('Syntax OK');
    expect(isTerminalLabComplete('javascript', state)).toBe(true);
  });

  it('Git: inspeciona estado, histórico e diferença antes de registrar', () => {
    let state = createTerminalState('git');
    state = run(state, 'cd /home/aprendiz/projeto').state;
    state = run(state, 'git status').state;
    state = run(state, 'git log --oneline').state;
    expect(state.history[state.history.length - 1]?.output).toContain('a13f7c2');
    state = run(state, 'echo "Anotação de estudo" >> README.md').state;
    state = run(state, 'git diff -- README.md').state;
    expect(state.history[state.history.length - 1]?.output).toContain('+Anotação de estudo');
    expect(isTerminalLabComplete('git', state)).toBe(true);
  });

  it('sistema virtual bloqueia privilégios administrativos e remoção recursiva perigosa', () => {
    const state = createTerminalState('primeiros-passos');
    const sudo = run(state, 'sudo apt update');
    expect(sudo.entry.exitCode).toBe(1);
    expect(sudo.entry.output).toContain('bloqueado por segurança');
    const rm = run(state, 'rm -rf /');
    expect(rm.entry.exitCode).toBe(1);
    expect(rm.entry.output).toContain('bloqueada');
    expect(Object.keys(rm.state.files)).toEqual(Object.keys(state.files));
  });

  it('ignora estado salvo com formato ou laboratório incompatível', () => {
    const state = createTerminalState('primeiros-passos');
    expect(restoreTerminalState('primeiros-passos', null).cwd).toBe('/home/aprendiz');
    expect(restoreTerminalState('git', state).labId).toBe('git');
    expect(getTerminalLab('processos-linux')?.tasks).toHaveLength(5);
    expect(getTerminalLab('unknown')).toBeUndefined();
  });
});
