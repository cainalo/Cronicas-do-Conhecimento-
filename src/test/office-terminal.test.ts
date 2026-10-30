import { describe, expect, it } from 'vitest';
import { createTerminalState, executeTerminalCommand } from '@/lib/terminal-lab';
import { officeTerminalProgress } from '@/components/OfficeTerminal';

function runAll(commands: string[]) {
  return commands.reduce((state, command) => executeTerminalCommand(state, command).state, createTerminalState());
}

describe('terminal integrado ao escritório de TI', () => {
  it('só libera evidências do diagnóstico depois de top e vmstat 2', () => {
    expect(officeTerminalProgress(runAll(['top']), 'diagnostico')).toMatchObject({ completed: 1, total: 2, done: false });
    expect(officeTerminalProgress(runAll(['top', 'vmstat 2']), 'diagnostico')).toMatchObject({ completed: 2, total: 2, done: true });
  });
  it('só libera a resolução depois da ação escolhida e das verificações na ordem correta', () => {
    expect(officeTerminalProgress(runAll(['free -h', 'kill 4127', 'systemctl status relat-api']), 'resolucao', 'term').done).toBe(false);
    expect(officeTerminalProgress(runAll(['kill 4127', 'free -h']), 'resolucao', 'term').done).toBe(false);
    expect(officeTerminalProgress(runAll(['kill 4127', 'free -h', 'systemctl status relat-api']), 'resolucao', 'term')).toMatchObject({ completed: 3, total: 3, done: true });
  });
  it('respeita a decisão de término forçado e não aceita o comando alternativo como prova', () => {
    expect(officeTerminalProgress(runAll(['kill 4127', 'free -h', 'systemctl status relat-api']), 'resolucao', 'kill9').done).toBe(false);
    expect(officeTerminalProgress(runAll(['kill -9 4127', 'free -h', 'systemctl status relat-api']), 'resolucao', 'kill9').done).toBe(true);
  });
});
