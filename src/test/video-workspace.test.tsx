import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider } from '@/app/prefs';
import { StudyProvider } from '@/app/StudyProvider';
import { AppRoutes } from '@/App';
import { curatedVideos } from '@/content';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function renderVideoAt(path: string) {
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

describe('espaço de estudo da videoaula', () => {
  it('oferece resumo editável, marcadores temporais e checklist de revisão', async () => {
    const user = userEvent.setup();
    const video = curatedVideos[0];
    if (!video) throw new Error('Não há videoaula curada para testar');
    renderVideoAt('/video/' + video.id);

    expect(screen.getByRole('heading', { name: 'Resumo da aula' })).toBeInTheDocument();
    const summary = screen.getByLabelText('Meu resumo');
    await user.clear(summary);
    await user.type(summary, 'O resumo que escrevi durante o estudo.');
    expect(localStorage.getItem('cronicas:video-resumo:' + video.id)).toBe('O resumo que escrevi durante o estudo.');

    await user.click(screen.getByRole('tab', { name: 'Anotações' }));
    await user.type(screen.getByRole('textbox', { name: 'Anotações da videoaula' }), 'Rever este conceito.');
    await user.clear(screen.getByLabelText('Tempo do vídeo'));
    await user.type(screen.getByLabelText('Tempo do vídeo'), '03:25');
    await user.type(screen.getByLabelText('Nota deste momento'), 'Exemplo importante.');
    await user.click(screen.getByRole('button', { name: 'Adicionar marcador' }));
    expect(screen.getByRole('link', { name: '03:25' })).toHaveAttribute('href', expect.stringContaining('t=205'));
    expect(localStorage.getItem('cronicas:video-momentos:' + video.id)).toContain('Exemplo importante.');

    await user.click(screen.getByRole('tab', { name: 'Ferramentas' }));
    await user.click(screen.getByLabelText('Consigo explicar o objetivo da aula.'));
    expect(localStorage.getItem('cronicas:video-checklist:' + video.id)).toContain('"objective":true');
    await user.click(screen.getByRole('button', { name: /Copiar resumo e anotações/ }));
    expect(screen.getByRole('button', { name: /Copiar resumo e anotações/ })).toBeInTheDocument();
  });
});
