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
    <PrefsProvider><StudyProvider><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></StudyProvider></PrefsProvider>,
  );
}
it('carrega o player da videoaula dedicada automaticamente e permite anotações locais', async () => {
  const user = userEvent.setup();
  renderAt('/video/yt-JdSTF0iYYhI-cap-prim-01');
  const iframe = document.querySelector('iframe');
  expect(iframe).not.toBeNull();
  expect(iframe).toHaveAttribute('loading', 'eager');
  expect(iframe?.getAttribute('src')).toContain('autoplay=1');
  expect(iframe?.getAttribute('src')).toContain('mute=1');
  expect(screen.getByRole('heading', { name: 'O que observar' })).toBeInTheDocument();
  await user.type(screen.getByLabelText('Anotações desta videoaula'), 'Rever os conceitos principais.');
  await waitFor(() => expect(localStorage.getItem('cronicas:video-notas:yt-JdSTF0iYYhI-cap-prim-01')).toBe('Rever os conceitos principais.'));
  await user.click(screen.getByRole('button', { name: 'Marcar como assistida' }));
  expect(localStorage.getItem('cronicas:videos-vistos')).toContain('yt-JdSTF0iYYhI-cap-prim-01');
  expect(screen.getByRole('button', { name: 'Assistida' })).toHaveAttribute('aria-pressed', 'true');
});
