import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

describe('trilha organizada por matéria', () => {
  it('agrupa capítulos em mini trilhas por disciplina e mostra o progresso real', () => {
    render(
      <PrefsProvider>
        <StudyProvider>
          <MemoryRouter initialEntries={['/trilha']}>
            <AppRoutes />
          </MemoryRouter>
        </StudyProvider>
      </PrefsProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Trilha' })).toBeInTheDocument();
    expect(screen.getByTestId('continuar-trilha')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Matérias da trilha' })).toBeInTheDocument();

    const subjects = screen.getAllByTestId(/^trilha-materia-/);
    expect(subjects.length).toBeGreaterThan(1);
    const firstSubject = subjects[0];
    expect(within(firstSubject).getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(1);
    expect(within(firstSubject).getByRole('progressbar')).toBeInTheDocument();
    expect(within(firstSubject).getByRole('link', { name: /Ver matéria/ })).toBeInTheDocument();

    const miniTrails = within(firstSubject).getAllByTestId(/^mini-trilha-/);
    expect(miniTrails.length).toBeGreaterThan(0);
    expect(within(miniTrails[0]).getByRole('list', { name: /Atividades de/ })).toBeInTheDocument();
    expect(within(miniTrails[0]).getByRole('link', { name: /Texto completo/ })).toBeInTheDocument();
    expect(within(firstSubject).getByRole('region', { name: /explicando:/i })).toBeInTheDocument();
  });
});
