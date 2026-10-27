import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

it('encaminha o endereço antigo do escritório para Estudos sem carregar personagens', () => {
  render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={['/escritorio']}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );

  expect(screen.getByRole('heading', { name: 'Explorar' })).toBeInTheDocument();
  expect(screen.queryByText(/Ande pelo escritório|converse com a equipe/i)).toBeNull();
  expect(screen.queryByRole('heading', { name: /Escritório de TI/i })).toBeNull();
});
