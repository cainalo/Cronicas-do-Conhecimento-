import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider } from '@/app/prefs';
import { StudyProvider } from '@/app/StudyProvider';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function renderAt(path: string) {
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

describe('posts dos professores dentro da trilha', () => {
  it('abre uma publicação específica sem mudar para o feed social completo', () => {
    renderAt('/trilha-post/cap.infra.03/processos?u=professores%3Acap.infra.03%3Aprocessos');
    expect(screen.getByRole('heading', { name: 'Posts dos professores' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Foto ou vídeo?' })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Uma dúvida, uma curiosidade/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Continuar na trilha/ })).toHaveAttribute('href', '/trilha');
  });

  it('avança por várias publicações e mostra a explicação do mini-desafio', async () => {
    const user = userEvent.setup();
    renderAt('/trilha-post/cap.infra.03/processos?u=professores%3Acap.infra.03%3Aprocessos');
    await user.click(screen.getByRole('button', { name: /Próxima publicação/ }));
    expect(screen.getByRole('article', { name: 'Pedir ou forçar?' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Falso' }));
    expect(screen.getByText('Isso mesmo!')).toBeInTheDocument();
    expect(screen.getByText(/SIGKILL não pode ser capturado nem ignorado/)).toBeInTheDocument();
  });

  it('guarda uma publicação no aparelho', async () => {
    const user = userEvent.setup();
    const view = renderAt('/trilha-post/cap.infra.03/processos?u=professores%3Acap.infra.03%3Aprocessos');
    const card = screen.getByRole('article', { name: 'Foto ou vídeo?' });
    await user.click(within(card).getByRole('button', { name: 'Guardar publicação' }));
    const saved = JSON.parse(localStorage.getItem('portico:trilha-professores:v1') ?? '{}');
    expect(saved.saved).toContain('post.ps-top');
    view.unmount();
  });
});
