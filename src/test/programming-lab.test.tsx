import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider } from '@/app/prefs';
import { StudyProvider } from '@/app/StudyProvider';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function renderAt(path = '/laboratorio/processos') {
  return render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
}

async function runCommand(user: ReturnType<typeof userEvent.setup>, command: string) {
  const terminal = screen.getByLabelText('Comando do terminal');
  await user.clear(terminal);
  await user.type(terminal, command);
  await user.click(screen.getByRole('button', { name: 'Executar comando' }));
}

describe('laboratórios Linux virtuais', () => {
  it('permite investigar processos com comandos Linux e registra os objetivos reais', async () => {
    const user = userEvent.setup();
    renderAt('/laboratorio/processos');
    expect(screen.getByRole('heading', { name: 'Processos e recursos' })).toBeInTheDocument();
    expect(screen.getByText(/Este laboratório interno simula saídas e usa arquivos virtuais/i)).toBeInTheDocument();

    await runCommand(user, 'pwd');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('/home/aluno');
    await runCommand(user, 'ps aux');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('4127');
    await runCommand(user, 'top');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('71.5');
    await runCommand(user, 'vmstat 2');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('si');
    await runCommand(user, 'kill 4127');
    await runCommand(user, 'free -h');
    await runCommand(user, 'df -h');
    expect(screen.getByText('Prática concluída')).toBeInTheDocument();
  });

  it('abre logs, filtra erros e usa opções do grep no laboratório de arquivos', async () => {
    const user = userEvent.setup();
    renderAt('/laboratorio/arquivos');
    expect(screen.getByRole('heading', { name: 'Arquivos e logs' })).toBeInTheDocument();
    await runCommand(user, 'cd /var/log');
    await runCommand(user, 'cat /var/log/relat-01.log');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('timeout ao consultar banco de dados');
    await runCommand(user, 'grep ERROR /var/log/relat-01.log');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('ERROR timeout ao consultar banco de dados');
  });

  it('cria cópias e ajusta permissões apenas no sistema de arquivos virtual', async () => {
    const user = userEvent.setup();
    renderAt('/laboratorio/shell');
    expect(screen.getByRole('heading', { name: 'Shell, cópias e permissões' })).toBeInTheDocument();
    await runCommand(user, 'mkdir -p /home/aluno/backup');
    await runCommand(user, 'cp /var/log/relat-01.log /home/aluno/backup/relat-01.log');
    await runCommand(user, 'chmod 640 /home/aluno/backup/relat-01.log');
    await runCommand(user, 'ls -l /home/aluno/backup');
    expect(screen.getByTestId('terminal-output')).toHaveTextContent('rw-r-----');
    expect(screen.getByRole('region', { name: 'Ambiente de computador simulado' })).toBeInTheDocument();
  });
});
