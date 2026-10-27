import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { waitForRouteReady } from './route-ready';
import { microLessons, narratedLessons } from '@/content';
import { nextBeat, prevScene, revealOf, transcript, validateNarrated } from '@/lib/narration';
import { splitCaptionLines } from '@/pages/Narrated';
import { emptyData } from '@/lib/model';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

describe.each(narratedLessons.map((n) => [n.id, n] as const))('aula narrada %s', (_, l) => {
  it('conteúdo válido e ligado a uma aula em texto existente', () => {
    expect(validateNarrated(l)).toEqual([]);
    expect(microLessons.some((m) => m.id === l.lessonId && m.chapterId === l.chapterId && m.sectionId === l.sectionId)).toBe(true);
    expect(transcript(l).flatMap((t) => t.lines).length).toBe(l.scenes.reduce((n, s) => n + s.beats.length, 0));
  });
  it('navegação: avança frase a frase, cena a cena, e termina', () => {
    let p: { scene: number; beat: number } | undefined = { scene: 0, beat: 0 };
    let n = 0;
    while (p) {
      n++;
      p = nextBeat(l, p);
    }
    expect(n).toBe(l.scenes.reduce((k, s) => k + s.beats.length, 0));
    expect(prevScene(l, { scene: 2, beat: 1 })).toEqual({ scene: 2, beat: 0 });
    expect(prevScene(l, { scene: 2, beat: 0 })).toEqual({ scene: 1, beat: 0 });
    expect(revealOf(l.scenes[0], 0)).toBe(1);
  });
});

it('legenda divide a fala em linhas estáveis, sem rolagem com reticências', () => {
  const text = 'Uma primeira frase curta para acompanhar. Depois vem a segunda parte da explicação com mais algumas palavras.';
  const lines = splitCaptionLines(text);
  expect(lines.length).toBeGreaterThan(1);
  expect(lines[0].text).toMatch(/acompanhar\.$/);
  expect(lines.every((line) => line.end > line.start && line.text.length > 0)).toBe(true);
  expect(lines.every((line) => line.end - line.start <= 7)).toBe(true);
  expect(lines.map((line) => line.text).join(' ')).toBe(text);
  expect(lines.some((line) => line.text.includes('…'))).toBe(false);
});

it('validador acusa revelação fora do alcance e número fora da reta', () => {
  const l = narratedLessons[0];
  const bad = { ...l, scenes: [{ id: 'x', heading: 'x', visual: { kind: 'numberline' as const, from: 0, to: 3, states: [{ points: [9] }] }, beats: [{ say: 'a', show: 2 }] }] };
  const errs = validateNarrated(bad).join(' | ');
  expect(errs).toMatch(/estado 2/);
  expect(errs).toMatch(/9 fora da reta/);
});

it('página: começa parada; legenda de uma linha é opcional; controles reiniciam o prazo; sem atividade ao terminar', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const l = narratedLessons.find((x) => x.id === 'narrada.mat.somar-inteiros')!;
  render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={[`/aula-narrada/${l.id}`]}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
  await waitForRouteReady();
  const caption = screen.getByTestId('narrada-legenda');
  expect(caption).toHaveTextContent(/Imagine que sua conta tem saldo zero/);
  expect(caption).toContainElement(screen.getByTestId('narrada-legenda-texto'));
  expect(caption.querySelector('p')!).toHaveClass('whitespace-nowrap', 'overflow-hidden');
  const player = screen.getByTestId('narrada-player');
  expect(player).toHaveClass('fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'h-[100dvh]', 'overflow-hidden', 'w-screen');
  expect(player.style.width).toBe('100vw');
  expect(player.style.height).toBe('100dvh');
  expect(screen.getByTestId('narrada-cena')).not.toHaveClass('px-3', 'sm:px-6');
  expect(screen.getByTestId('narrada-elementos-visuais')).toBeInTheDocument();
  expect(screen.getByText(/sem voz neste aparelho/)).toBeInTheDocument();
  // Não toca sozinha.
  await act(async () => void vi.advanceTimersByTime(20000));
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(/Imagine que sua conta tem saldo zero/);
  await user.click(screen.getByTestId('narrada-tocar'));
  const captionWords = screen.getByTestId('narrada-legenda-texto').querySelectorAll(':scope > span');
  // A legenda mantém um trecho fixo e não usa reticências para simular rolagem.
  expect(captionWords.length).toBeLessThanOrEqual(7);
  expect(screen.getByTestId('narrada-legenda-texto')).not.toHaveTextContent('…');
  expect(Array.from(captionWords).some((word) => word.className.includes('text-[#ffd38a]'))).toBe(true);
  await user.click(screen.getByTestId('narrada-legendas-toggle'));
  expect(screen.queryByTestId('narrada-legenda')).toBeNull();
  await user.click(screen.getByTestId('narrada-legendas-toggle'));
  expect(screen.getByTestId('narrada-legenda')).toBeInTheDocument();
  await act(async () => void vi.advanceTimersByTime(20000));
  expect(screen.getByTestId('narrada-legenda')).not.toHaveTextContent(/Imagine que sua conta tem saldo zero/);
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-0');
  await user.click(screen.getByTestId('narrada-mostrar-controles'));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-100');
  // Segurar a área dos controles por mais que o prazo não deve escondê-los.
  const controls = screen.getByTestId('narrada-controles-flutuantes');
  fireEvent.pointerDown(controls, { pointerId: 1, pointerType: 'touch' });
  await act(async () => void vi.advanceTimersByTime(5000));
  expect(controls).toHaveClass('opacity-100');
  fireEvent.pointerUp(window, { pointerId: 1, pointerType: 'touch' }); // libera também fora da área dos controles
  await act(async () => void vi.advanceTimersByTime(3000));
  expect(controls).toHaveClass('opacity-100');

  // Cada interação reinicia o prazo; mudar a cena, sozinha, não o reinicia.
  await user.click(screen.getByRole('button', { name: 'Ir para a cena 6: Subtrair é somar o oposto' }));
  await act(async () => void vi.advanceTimersByTime(3000));
  expect(controls).toHaveClass('opacity-100');
  await user.click(screen.getByRole('button', { name: 'Ir para a cena 7: Por que subtrair um negativo dá uma soma?' }));
  await act(async () => void vi.advanceTimersByTime(3000));
  expect(controls).toHaveClass('opacity-100');
  await act(async () => void vi.advanceTimersByTime(1000));
  expect(controls).toHaveClass('opacity-0');

  // Um toque no vídeo revela os controles ocultos; um toque seguinte pode escondê-los.
  fireEvent.click(screen.getByTestId('narrada-stage')); // toque direto, sem simular movimento de mouse
  expect(controls).toHaveClass('opacity-100');
  fireEvent.click(screen.getByTestId('narrada-stage'));
  expect(controls).toHaveClass('opacity-0');
  await user.click(screen.getByTestId('narrada-mostrar-controles'));
  expect(controls).toHaveClass('opacity-100');
  await user.click(screen.getByTestId('narrada-tocar')); // pausa
  await user.click(screen.getByRole('button', { name: 'Ir para a cena 6: Subtrair é somar o oposto' }));
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(/cinco menos oito/);
  await user.click(screen.getByRole('button', { name: 'Transcrição' }));
  expect(screen.getByRole('region', { name: 'Transcrição' })).toHaveTextContent(/seis menos menos dois/i);
  // Vai à última cena e deixa terminar: a aula acaba sem abrir outra atividade.
  await user.click(screen.getByRole('button', { name: /Ir para a cena 9/ }));
  await user.click(screen.getByTestId('narrada-tocar'));
  for (let i = 0; i < 20; i++) await act(async () => void vi.advanceTimersByTime(8000));
  expect(screen.queryByRole('region', { name: 'Checagem' })).not.toBeInTheDocument();
  expect(screen.getByTestId('narrada-tocar')).toHaveAttribute('aria-label', 'Assistir novamente');
  vi.useRealTimers();
});

it('sequência única: a aula narrada abre automaticamente em tela inteira e segue para a prática', async () => {
  const user = userEvent.setup();
  const key = 'aprender:cap.prim.01:computador#prim.computador.1';
  localStorage.setItem(
    'cronicas:v1:visitante',
    JSON.stringify({ ...emptyData(), progress: { [key]: { step: { phase: { k: 'midia' }, first: {}, struggled: [] }, updatedAt: new Date().toISOString() } } }),
  );
  render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={['/aprender/cap.prim.01/computador/prim.computador.1']}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
  expect(screen.getByRole('dialog', { name: /Aula narrada: Do ábaco ao celular/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Conta e configurações' })).toBeNull();
  expect(screen.getByTestId('narrada-seek')).toBeInTheDocument();
  expect(screen.queryByTestId('midia-narrada')).toBeNull();
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(/Pegue o celular que está na sua mão/);
  await user.click(screen.getByRole('button', { name: 'Ir para a prática' }));
  expect(screen.queryByRole('dialog', { name: /Aula narrada/ })).toBeNull();
  expect(screen.getByText(/Organize a linha do tempo/)).toBeInTheDocument();
});
