import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { microLessons, narratedLessons } from '@/content';
import { nextBeat, prevScene, revealOf, transcript, validateNarrated } from '@/lib/narration';
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
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(/Imagine que sua conta tem saldo zero/);
  expect(screen.getByTestId('narrada-player')).toHaveClass('fixed', 'inset-0', 'h-[100dvh]', 'overflow-hidden');
  expect(screen.getByTestId('narrada-elementos-visuais')).toBeInTheDocument();
  expect(screen.getByText(/sem voz neste aparelho/)).toBeInTheDocument();
  // Não toca sozinha.
  await act(async () => void vi.advanceTimersByTime(20000));
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(l.scenes[0].beats[0].say);
  await user.click(screen.getByTestId('narrada-tocar'));
  const captionWords = screen.getByTestId('narrada-legenda-texto').querySelectorAll(':scope > span');
  expect(captionWords.length).toBeLessThanOrEqual(8);
  expect(captionWords[0]).toHaveClass('text-[#ffd38a]');
  await user.click(screen.getByTestId('narrada-legendas-toggle'));
  expect(screen.queryByTestId('narrada-legenda')).toBeNull();
  await user.click(screen.getByTestId('narrada-legendas-toggle'));
  expect(screen.getByTestId('narrada-legenda')).toBeInTheDocument();
  await act(async () => void vi.advanceTimersByTime(20000));
  expect(screen.getByTestId('narrada-legenda')).not.toHaveTextContent(/Imagine que sua conta tem saldo zero/);
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-0');
  await user.click(screen.getByTestId('narrada-mostrar-controles'));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-100');
  // Durante o uso, cada interação reinicia a contagem; trocar cena não reinicia o prazo sozinha.
  await user.click(screen.getByRole('button', { name: 'Ir para a cena 6: Subtrair é somar o oposto' }));
  await act(async () => void vi.advanceTimersByTime(3000));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-100');
  await user.click(screen.getByRole('button', { name: 'Ir para a cena 7: Por que subtrair um negativo dá uma soma?' }));
  await act(async () => void vi.advanceTimersByTime(3000));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-100');
  await act(async () => void vi.advanceTimersByTime(1000));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-0');
  // Um toque na área do vídeo também esconde os controles; um novo toque revela-os.
  await user.click(screen.getByTestId('narrada-stage'));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-0');
  await user.click(screen.getByTestId('narrada-mostrar-controles'));
  expect(screen.getByTestId('narrada-controles-flutuantes')).toHaveClass('opacity-100');
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
  expect(screen.getByTestId('narrada-seek')).toBeInTheDocument();
  expect(screen.queryByTestId('midia-narrada')).toBeNull();
  expect(screen.getByTestId('narrada-legenda')).toHaveTextContent(/nenhuma dessas capacidades apareceu de uma vez/);
  await user.click(screen.getByRole('button', { name: 'Ir para a prática' }));
  expect(screen.queryByRole('dialog', { name: /Aula narrada/ })).toBeNull();
  expect(screen.getByText(/Organize a linha do tempo/)).toBeInTheDocument();
});
