import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { feedLessons, feedPostsOf, microLessons } from '@/content';
import { emptyFeed, lessonAnswered, lessonUnlocked } from '@/lib/feed';
import { loadData } from '@/lib/storage';

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

describe('feed didático: conteúdo', () => {
  it('cobre todas as aulas em texto e cada etapa vira explicação e atividade, na ordem', () => {
    expect(new Set(feedLessons.map((m) => m.id))).toEqual(new Set(microLessons.map((m) => m.id)));
    for (const m of feedLessons) {
      const posts = feedPostsOf(m.id);
      expect(new Set(posts.map((p) => p.id)).size, m.id).toBe(posts.length);
      for (const s of m.steps) {
        const i = posts.findIndex((p) => p.stepId === s.id && (p.kind === 'explica' || p.kind === 'carrossel'));
        const j = posts.findIndex((p) => p.stepId === s.id && p.kind === 'atividade');
        expect(i, `${m.id}/${s.id}`).toBeGreaterThanOrEqual(0);
        // A atividade da etapa vem depois da explicação dela.
        expect(j, `${m.id}/${s.id}`).toBeGreaterThan(i);
      }
      expect(posts.at(-1)!.kind).toBe('resumo');
      // Vídeo, aula narrada e dica só depois da última etapa.
      const lastStep = Math.max(...posts.map((p, k) => (p.stepId ? k : -1)));
      posts.forEach((p, k) => ['video', 'narrada', 'dica'].includes(p.kind) && expect(k).toBeGreaterThan(lastStep));
    }
    // Variedade: há carrossel, exemplo, atividade, vídeo, aula narrada, dica e resumo no conjunto.
    const kinds = new Set(feedLessons.flatMap((m) => feedPostsOf(m.id).map((p) => p.kind)));
    for (const k of ['carrossel', 'exemplo', 'atividade', 'video', 'narrada', 'dica', 'resumo'] as const) expect(kinds.has(k), k).toBe(true);
  });

  it('ordem guiada: só abre a aula quando as anteriores estão concluídas', () => {
    const order = ['a', 'b', 'c'];
    expect(lessonUnlocked(order, () => false, 'a')).toBe(true);
    expect(lessonUnlocked(order, () => false, 'b')).toBe(false);
    expect(lessonUnlocked(order, (x) => x === 'a', 'b')).toBe(true);
    const posts = feedPostsOf(feedLessons[0].id);
    const acts = posts.filter((p) => p.kind === 'atividade');
    expect(lessonAnswered(posts, emptyFeed())).toBe(false);
    expect(lessonAnswered(posts, { ...emptyFeed(), answers: Object.fromEntries(acts.map((p) => [p.id, true])) })).toBe(true);
  });
});

it('feed na tela: um post por vez, ações salvas, e a aula só conclui depois de todas as checagens', async () => {
  const user = userEvent.setup();
  const first = feedLessons[0];
  const posts = feedPostsOf(first.id);
  renderAt('/sala');
  expect(screen.getAllByRole('article')).toHaveLength(1);
  // Ações privadas e reais.
  const p0 = screen.getByTestId(`post-${posts[0].id}`);
  await user.click(within(p0).getByRole('button', { name: /Preciso rever/ }));
  await user.click(within(p0).getByRole('button', { name: /Anotar/ }));
  await user.type(within(p0).getByLabelText('Anotação'), 'rever com calma');
  const saved = JSON.parse(localStorage.getItem('cronicas:feed:v1')!);
  expect(saved.react[posts[0].id].rever).toBe(true);
  expect(saved.notes[posts[0].id]).toBe('rever com calma');
  expect(screen.getByRole('region', { name: 'Seus marcadores' })).toHaveTextContent('Marcados para rever (1)');
  // Avança até o fim respondendo as atividades com a alternativa certa (índice da resposta).
  for (let i = 1; i < posts.length; i++) {
    await user.click(screen.getByTestId('feed-proximo'));
    const p = posts[i];
    if (p.kind === 'atividade' && p.activity?.kind === 'choice') {
      const card = screen.getByTestId(`post-${p.id}`);
      await user.click(within(card).getByRole('button', { name: p.activity.options[p.activity.answer].text }));
      await user.click(within(card).getByRole('button', { name: 'Verificar' }));
    } else if (p.kind === 'atividade') {
      // Atividade de outro tipo: registra direto (o motor comum é testado em outro lugar).
      const st = JSON.parse(localStorage.getItem('cronicas:feed:v1')!);
      localStorage.setItem('cronicas:feed:v1', JSON.stringify({ ...st, answers: { ...st.answers, [p.id]: true } }));
    }
  }
  expect(screen.getByTestId('feed-fim')).toBeInTheDocument();
  // Ler e responder não conclui a aula sozinho.
  expect(loadData('visitante').unitLog ?? {}).toEqual({});
});

it('concluir a aula no feed registra na trilha a mesma aula (e libera a próxima)', async () => {
  const user = userEvent.setup();
  const first = feedLessons[0];
  const posts = feedPostsOf(first.id);
  const answers = Object.fromEntries(posts.filter((p) => p.kind === 'atividade').map((p) => [p.id, true]));
  localStorage.setItem('cronicas:feed:v1', JSON.stringify({ ...emptyFeed(), answers, cursor: { [first.id]: posts.length - 1 } }));
  renderAt('/sala');
  await user.click(screen.getByTestId('feed-concluir'));
  const log = loadData('visitante').unitLog ?? {};
  expect(Object.keys(log).some((k) => k.includes(first.chapterId) && k.includes(first.sectionId))).toBe(true);
  expect(screen.getByRole('button', { name: /Próxima aula/ })).toBeInTheDocument();
});
