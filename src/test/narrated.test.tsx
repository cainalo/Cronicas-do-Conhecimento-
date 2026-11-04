import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { microLessons, narratedLessons } from '@/content';
import { nextBeat, prevScene, revealOf, transcript, validateNarrated } from '@/lib/narration';
import { emptyData } from '@/lib/model';
import { splitCaptionLines } from '@/pages/Narrated';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function RouteProbe() {
  const location = useLocation();
  return <output data-testid="route-location">{location.pathname}</output>;
}

// O motor de narração fica preservado para compatibilidade com dados antigos,
// mas não é mais um formato de aula oferecido no percurso atual do Pórtico.
describe.each(narratedLessons.map((n) => [n.id, n] as const))('arquivo legado %s', (_, l) => {
  it('conteúdo válido e ligado a uma microaula existente', () => {
    expect(validateNarrated(l)).toEqual([]);
    expect(microLessons.some((m) => m.id === l.lessonId && m.chapterId === l.chapterId && m.sectionId === l.sectionId)).toBe(true);
    expect(transcript(l).flatMap((t) => t.lines).length).toBe(l.scenes.reduce((n, s) => n + s.beats.length, 0));
  });
  it('navegação interna percorre todas as falas sem perder a ordem', () => {
    let p: { scene: number; beat: number } | undefined = { scene: 0, beat: 0 };
    let n = 0;
    while (p) { n++; p = nextBeat(l, p); }
    expect(n).toBe(l.scenes.reduce((k, s) => k + s.beats.length, 0));
    expect(prevScene(l, { scene: 2, beat: 1 })).toEqual({ scene: 2, beat: 0 });
    expect(prevScene(l, { scene: 2, beat: 0 })).toEqual({ scene: 1, beat: 0 });
    expect(revealOf(l.scenes[0], 0)).toBe(1);
  });
});

it('legenda divide a fala em linhas estáveis de até sete palavras', () => {
  const text = 'Uma primeira frase curta para acompanhar. Depois vem a segunda parte da explicação com mais algumas palavras.';
  const lines = splitCaptionLines(text);
  expect(lines.length).toBeGreaterThan(1);
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

it('links antigos de aula narrada redirecionam para a trilha, sem abrir o player legado', () => {
  const legacy = narratedLessons[0];
  render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={[`/aula-narrada/${legacy.id}`]}>
          <AppRoutes />
          <RouteProbe />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
  expect(screen.getByTestId('route-location')).toHaveTextContent('/trilha');
  expect(screen.queryByTestId('narrada-player')).toBeNull();
});

it('uma sessão antiga salva na etapa de narração continua na prática, sem voltar a abrir o player', () => {
  const key = 'aprender:cap.prim.01:computador#prim.computador.1';
  localStorage.setItem(
    'cronicas:v1:visitante',
    JSON.stringify({
      ...emptyData(),
      progress: {
        [key]: {
          step: { phase: { k: 'midia' }, first: {}, struggled: [] },
          updatedAt: new Date().toISOString(),
        },
      },
    }),
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
  expect(screen.queryByTestId('narrada-player')).toBeNull();
  expect(screen.getByRole('region', { name: 'Prática final' })).toBeInTheDocument();
});
