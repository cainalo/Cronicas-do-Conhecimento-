import { beforeEach, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
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

it('abre um story com identidade do professor, música sugerida e referência externa', async () => {
  const user = userEvent.setup();
  renderAt('/sala');

  await user.click(screen.getByRole('button', { name: 'Abrir story de Professora Clara' }));

  expect(screen.getByRole('dialog', { name: 'Story de Professora Clara' })).toBeInTheDocument();
  expect(screen.getByText('Matemática no céu')).toBeInTheDocument();
  expect(screen.getByText('Piano instrumental para estudar')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explorar gráficos interativos' })).toHaveAttribute('href', 'https://www.geogebra.org/calculator');
});

it('cria uma publicação de texto e persiste o conteúdo no aparelho', async () => {
  const user = userEvent.setup();
  renderAt('/sala');

  await user.click(screen.getByRole('button', { name: /Criar publicação/i }));
  await user.type(screen.getByLabelText('Sua publicação'), 'Minha descoberta de hoje.');
  await user.click(screen.getByRole('button', { name: 'Publicar no meu feed' }));

  expect(screen.getByText('Minha descoberta de hoje.')).toBeInTheDocument();
  await waitFor(() => expect(localStorage.getItem('portico:sala-social:v1')).toContain('Minha descoberta de hoje.'));
});

it('permite seguir um professor e filtrar por quem está sendo seguido', async () => {
  const user = userEvent.setup();
  renderAt('/sala');

  const follow = screen.getAllByRole('button', { name: 'Seguir', exact: true })[0];
  await user.click(follow);

  const filter = screen.getByRole('button', { name: 'Seguindo', exact: true });
  await user.click(filter);
  expect(filter).toHaveAttribute('aria-pressed', 'true');
});
