import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { waitForRouteReady } from './route-ready';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

describe('apresentação da trilha', () => {
  it('mostra cada capítulo como uma seção editorial com acesso ao texto e lista ledger', async () => {
    render(
      <PrefsProvider>
        <StudyProvider>
          <MemoryRouter initialEntries={['/trilha']}>
            <AppRoutes />
          </MemoryRouter>
        </StudyProvider>
      </PrefsProvider>,
    );
    await waitForRouteReady();

    expect(screen.getByRole('heading', { name: 'Trilha' })).toBeInTheDocument();
    expect(screen.getByTestId('continuar-trilha')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Capítulos da trilha' })).toBeInTheDocument();

    const chapters = screen.getAllByTestId(/^trilha-capitulo-/);
    expect(chapters.length).toBeGreaterThan(0);
    const firstChapter = chapters[0];
    expect(within(firstChapter).getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(within(firstChapter).getByRole('link', { name: /Material completo/ })).toBeInTheDocument();
    expect(within(firstChapter).getByRole('list', { name: /Atividades de/ })).toBeInTheDocument();

    // A lista é aberta diretamente, sem cartões de capítulo que se expandem/recolhem.
    expect(within(firstChapter).queryByRole('button')).toBeNull();
  });
});
