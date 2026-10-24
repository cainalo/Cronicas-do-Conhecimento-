import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { chapters, curatedVideos, externalMaterials, questionsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { youTubeId } from '@/components/VideoEmbed';
import { buildPractice, isRecovery, nextQueue, recoveryFor, type Activity } from '@/lib/practice';
import { loadPrefs } from '@/lib/storage';

vi.mock('@/lib/supabase', () => ({ supabase: null }));

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

beforeEach(() => localStorage.clear());

describe('página Estudos', () => {
  it('leva ao mesmo destino do Continuar e mostra atalhos, vídeos e materiais', () => {
    renderAt('/estudos');
    const cont = screen.getByTestId('continuar-estudos');
    expect(cont).toHaveTextContent('Começar');
    expect(cont.getAttribute('href')).toBe(screen.getByTestId('continuar-topo').getAttribute('href'));
    for (const name of [/Biblioteca/, /Rodada relâmpago/, /Flashcards/, /Revisão de erros/]) expect(screen.getByRole('link', { name })).toBeInTheDocument();
    expect(screen.getByText(/Ainda não há videoaulas conferidas/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Lei nº 13.709\/2018/ })).toHaveAttribute('target', '_blank');
  });

  it('guarda uma videoaula própria e só carrega o vídeo quando a pessoa pede', async () => {
    const user = userEvent.setup();
    renderAt('/estudos');
    await user.type(screen.getByLabelText(/Endereço do vídeo/), 'https://exemplo.com/video');
    expect(screen.getByText(/não parece de um vídeo do YouTube/)).toBeInTheDocument();
    await user.clear(screen.getByLabelText(/Endereço do vídeo/));
    await user.type(screen.getByLabelText(/Endereço do vídeo/), 'https://youtu.be/abcdefghijk');
    await user.type(screen.getByLabelText(/Nome para lembrar/), 'Minha aula');
    await user.click(screen.getByRole('button', { name: 'Guardar a videoaula' }));
    expect(document.querySelector('iframe')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Carregar o vídeo: Minha aula' }));
    const iframe = document.querySelector('iframe')!;
    expect(iframe.src).toContain('youtube-nocookie.com/embed/abcdefghijk');
    expect(iframe.src).not.toContain('autoplay');
    expect(JSON.parse(localStorage.getItem('cronicas:videos-proprios')!)).toHaveLength(1);
  });

  it('reconhece endereços do YouTube e a curadoria não tem vídeo sem dados conferidos', () => {
    expect(youTubeId('https://www.youtube.com/watch?v=abcdefghijk&t=10')).toBe('abcdefghijk');
    expect(youTubeId('https://youtube.com/shorts/abcdefghijk')).toBe('abcdefghijk');
    expect(youTubeId('https://youtu.be/curto')).toBeUndefined();
    expect(youTubeId('nada')).toBeUndefined();
    for (const v of curatedVideos) expect(v.title && v.channel && v.duration && v.checkedAt).toBeTruthy();
    for (const m of externalMaterials) expect(m.url).toMatch(/^https:\/\//);
  });
});

it('endereço inexistente fica dentro do app, com saída para a trilha e para Estudos', () => {
  renderAt('/nao-existe/mesmo');
  expect(screen.getByRole('heading', { name: 'Este corredor não existe' })).toBeInTheDocument();
  expect(screen.getByTestId('nao-encontrada-trilha').getAttribute('href')).toBe(screen.getByTestId('continuar-topo').getAttribute('href'));
  expect(screen.getByRole('link', { name: 'Abrir Estudos' })).toHaveAttribute('href', '/estudos');
});

it('conta sem servidor explica o modo local e mantém aparência e volumes', async () => {
  const user = userEvent.setup();
  renderAt('/conta');
  expect(screen.getByText('Estudando só neste aparelho')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Noite/ })).toBeInTheDocument();
  await user.click(screen.getByRole('switch', { name: 'Lareira' }));
  const slider = screen.getByLabelText('Volume: Lareira');
  expect(screen.queryByLabelText('Volume: Música medieval')).toBeNull();
  // Muda o volume da lareira sem mexer no da música.
  fireEvent.change(slider, { target: { value: '40' } });
  expect(screen.getByText('40%')).toBeInTheDocument();
  expect(loadPrefs().fireVolume).toBeCloseTo(0.4);
  expect(loadPrefs().musicVolume).toBeUndefined();
});

describe('recuperação adaptativa na prática', () => {
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const ch = chapters.find((c) => c.glossary.length >= 6)!;
  const sec = ch.sections[0].id;
  it('termo errado traz outro termo do mesmo glossário, logo adiante', () => {
    const queue = buildPractice(ch, sec, bank, undefined, () => 0.3);
    const t = queue.find((a) => a.kind === 'term')! as Extract<Activity, { kind: 'term' }>;
    const q = [t, ...queue.filter((a) => a !== t)];
    const r = recoveryFor(t, { chapter: ch, sectionId: sec, bank, queue: q })! as Extract<Activity, { kind: 'term' }>;
    expect(r.kind).toBe('term');
    expect(r.answer).not.toBe(t.answer);
    expect(isRecovery(r.id)).toBe(true);
    const after = nextQueue(q, false, r);
    expect(after).toHaveLength(q.length);
    expect(after[1]).toBe(r);
    expect(after).not.toContain(t);
    // Sem equivalente, a mesma volta no fim; acerto só tira da fila.
    expect(nextQueue(q, false).at(-1)).toBe(t);
    expect(nextQueue(q, true)).toHaveLength(q.length - 1);
  });

  it('questão errada traz outra questão do mesmo trecho, se houver', () => {
    const target = chapters.flatMap((c) => c.sections.map((s) => ({ c, s: s.id }))).find(({ c, s }) => bank.filter((q) => q.chapterId === c.id && q.sectionId === s).length >= 2)!;
    const qs = bank.filter((q) => q.chapterId === target.c.id && q.sectionId === target.s);
    const a: Activity = { kind: 'mcq', id: qs[0].id, question: qs[0] };
    const r = recoveryFor(a, { chapter: target.c, sectionId: target.s, bank, queue: [a] })!;
    expect(r.kind).toBe('mcq');
    expect(r.kind === 'mcq' && r.question.id).not.toBe(qs[0].id);
    const tf: Activity = { kind: 'tf', id: 'x', statement: 's', answer: true, why: 'w' };
    expect(recoveryFor(tf, { chapter: target.c, sectionId: target.s, bank, queue: [tf] })).toBeUndefined();
  });
});
