import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider } from '@/app/prefs';
import { StudyProvider } from '@/app/StudyProvider';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function renderAt(path = '/laboratorio-codigo') {
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

describe('laboratório Linux virtual', () => {
  it('ensina claramente o limite do ambiente e conclui o chamado com evidências', async () => {
    const user = userEvent.setup();
    renderAt();
    expect(screen.getByRole('heading', { name: 'Investigue o servidor de relatórios lento' })).toBeInTheDocument();
    expect(screen.getByText(/A saída é simulada/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Preencher comando pwd' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-location')).toHaveTextContent('pwd mostra o diretório');
    expect(within(screen.getByRole('log', { name: 'Saída do terminal' })).getByText('/home/aluno')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Preencher comando ls' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-files')).toHaveTextContent('ls encontrou a pasta logs');

    await user.click(screen.getByRole('button', { name: 'Preencher comando top' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-top')).toHaveTextContent('74,3% de espera por I/O');

    await user.click(screen.getByRole('button', { name: 'Preencher comando free -h' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-memory')).toHaveTextContent('96 MiB');

    await user.click(screen.getByRole('button', { name: 'Preencher comando vmstat 2' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-vmstat')).toHaveTextContent('si/so');

    await user.click(screen.getByRole('button', { name: 'Preencher comando ps aux | grep importador' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-process')).toHaveTextContent('PID 4127');

    await user.click(screen.getByRole('button', { name: /Falta RAM/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Diagnóstico correto');
    expect(screen.getByRole('progressbar', { name: 'Progresso do chamado' })).toHaveAttribute('aria-valuenow', '6');
  });

  it('interpreta pipes, opções e padrão com espaços sem acessar um shell real', async () => {
    const user = userEvent.setup();
    renderAt();
    await runCommand(user, 'top');
    const output = screen.getByRole('log', { name: 'Saída do terminal' });
    expect(output).toHaveTextContent('74.3 wa');
    expect(output).toHaveTextContent('4127 relat');

    await runCommand(user, 'cat logs/app.log | grep WARN');
    expect(output).toHaveTextContent('WARN 08:30 latência dos relatórios acima de 120 segundos');
    await runCommand(user, 'grep WARN logs/app.log | wc -l');
    expect(within(output).getByText('2', { exact: true })).toBeInTheDocument();
  });

  it('pode criar diretório e arquivo e gravar texto dentro do sistema virtual', async () => {
    const user = userEvent.setup();
    renderAt();
    await runCommand(user, 'mkdir -p projetos/incidente');
    await runCommand(user, 'touch projetos/incidente/nota.txt');
    await runCommand(user, 'echo "investigar memória" > projetos/incidente/nota.txt');
    await runCommand(user, 'cat projetos/incidente/nota.txt');
    expect(screen.getByRole('log', { name: 'Saída do terminal' })).toHaveTextContent('investigar memória');
    expect(screen.getByText(/nada é executado no Android|não altera o Android/i)).toBeInTheDocument();
  });
});
