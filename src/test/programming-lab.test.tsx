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
    expect(screen.getByRole('heading', { name: 'Investigue uma tentativa sem autenticação' })).toBeInTheDocument();
    expect(screen.getByText(/A saída é simulada/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Preencher comando pwd' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-location')).toHaveTextContent('pwd mostra o diretório');
    expect(within(screen.getByRole('log', { name: 'Saída do terminal' })).getByText('/home/aluno')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Preencher comando ls' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-files')).toHaveTextContent('ls lista os arquivos');

    await user.click(screen.getByRole('button', { name: 'Preencher comando cat logs/app.log' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-read-log')).toHaveTextContent('cat exibe o conteúdo');

    await user.click(screen.getByRole('button', { name: 'Preencher comando grep WARN logs/app.log' }));
    await user.click(screen.getByRole('button', { name: 'Executar comando' }));
    expect(screen.getByTestId('terminal-step-filter-warning')).toHaveTextContent('grep filtra as linhas');
    expect(screen.getByRole('status')).toHaveTextContent('o log confirma uma tentativa sem autenticação');
    expect(screen.getByRole('progressbar', { name: 'Progresso do chamado' })).toHaveAttribute('aria-valuenow', '4');
  });

  it('interpreta pipes, opções e padrão com espaços sem acessar um shell real', async () => {
    const user = userEvent.setup();
    renderAt();
    await runCommand(user, 'cat logs/app.log | grep WARN');
    const output = screen.getByRole('log', { name: 'Saída do terminal' });
    expect(output).toHaveTextContent('WARN 08:05 tentativa sem autenticação');
    expect(output).not.toHaveTextContent('INFO 08:00');

    await runCommand(user, 'grep -n "sem autenticação" logs/app.log');
    expect(output).toHaveTextContent('2:WARN 08:05 tentativa sem autenticação');

    await runCommand(user, 'grep WARN logs/app.log | wc -l');
    expect(output).toHaveTextContent('1');
  });

  it('pode criar diretório e arquivo e gravar texto dentro do sistema virtual', async () => {
    const user = userEvent.setup();
    renderAt();
    await runCommand(user, 'mkdir -p projetos/incidente');
    await runCommand(user, 'touch projetos/incidente/nota.txt');
    await runCommand(user, 'echo "investigar login" > projetos/incidente/nota.txt');
    await runCommand(user, 'cat projetos/incidente/nota.txt');
    expect(screen.getByRole('log', { name: 'Saída do terminal' })).toHaveTextContent('investigar login');
    expect(screen.getByText(/nada é executado no Android|não altera o Android/i)).toBeInTheDocument();
  });
});
