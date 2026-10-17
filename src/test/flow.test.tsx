import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { getLesson, getQuestion } from '@/content';
import { loadData } from '@/lib/storage';

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

it('fluxo: lição → erro → revisão → recuperação, com persistência local', async () => {
  const user = userEvent.setup();
  const lesson = getLesson('lic.seg.01.a')!;
  const { unmount } = renderAt(`/licao/${lesson.id}`);

  for (let i = 0; i < lesson.cards.length; i++) await user.click(screen.getByRole('button', { name: /Próximo|Começar questões/ }));

  for (let i = 0; i < lesson.questionIds.length; i++) {
    const q = getQuestion(lesson.questionIds[i])!;
    // Erra a primeira questão de propósito; acerta as demais.
    const key = i === 0 ? q.options.find((o) => o.key !== q.answer)!.key : q.answer;
    const opt = screen.getAllByRole('button').find((b) => within(b).queryByText(key) && b.textContent?.startsWith(key))!;
    await user.click(opt);
    await user.click(screen.getByRole('button', { name: 'Confirmar resposta' }));
    if (i === 0) expect(screen.getByText(new RegExp(`Resposta correta: ${q.answer}`))).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Próxima questão|Ver resultado/ }));
  }
  expect(screen.getByText('90%')).toBeInTheDocument();

  const saved = loadData('visitante');
  expect(saved.attempts).toHaveLength(10);
  expect(saved.lessons[lesson.id].bestScore).toBe(90);
  unmount();

  // Nova sessão: a questão errada está na revisão.
  renderAt('/revisao');
  await user.click(screen.getByRole('button', { name: 'Começar revisão' }));
  const q0 = getQuestion(lesson.questionIds[0])!;
  const opt = screen.getAllByRole('button').find((b) => b.textContent?.startsWith(q0.answer))!;
  await user.click(opt);
  await user.click(screen.getByRole('button', { name: 'Confirmar resposta' }));
  expect(screen.getByText('Correto')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Concluir' }));
  expect(screen.getByText(/Recuperadas: 1 de 1/)).toBeInTheDocument();
  expect(loadData('visitante').attempts).toHaveLength(11);
});

it('leitor: marca seção lida e mostra o sumário', async () => {
  const user = userEvent.setup();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  // jsdom não implementa IntersectionObserver
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  renderAt('/capitulo/cap.seg.01');
  expect(screen.getByRole('heading', { name: 'Criptografia' })).toBeInTheDocument();
  await user.click(screen.getAllByRole('button', { name: 'Marcar seção como lida' })[0]);
  expect(loadData('visitante').reading['cap.seg.01'].sectionsRead).toEqual(['fundamentos']);
  await user.click(screen.getByRole('button', { name: /Sumário/ }));
  await user.type(screen.getByPlaceholderText('Buscar no capítulo…'), 'Kerckhoffs');
  expect(screen.getAllByText(/1\. Fundamentos/).length).toBeGreaterThan(0);
});

it('simulado: monta, responde, entrega e mostra o boletim', async () => {
  const user = userEvent.setup();
  renderAt('/simulado');
  await user.click(screen.getByRole('button', { name: '10' }));
  await user.click(screen.getByRole('button', { name: 'Livre' }));
  await user.click(screen.getByRole('button', { name: /Iniciar simulado com 10 questões/ }));
  expect(screen.getByText(/Respondidas 0 de 10/)).toBeInTheDocument();
  // Responde a primeira com a letra A e entrega (confirmação aceita).
  await user.click(screen.getAllByRole('button', { pressed: false }).find((b) => b.textContent?.startsWith('A'))!);
  window.confirm = () => true;
  await user.click(screen.getByRole('button', { name: 'Entregar a prova' }));
  expect(screen.getByRole('heading', { name: 'Boletim' })).toBeInTheDocument();
  const exams = Object.values(loadData('visitante').exams);
  expect(exams).toHaveLength(1);
  expect(exams[0].finishedAt).toBeTruthy();
});

it('flashcards: revela e avalia um cartão', async () => {
  const user = userEvent.setup();
  renderAt('/flashcards');
  await user.click(screen.getByRole('button', { name: 'Revelar o verso' }));
  await user.click(screen.getByRole('button', { name: /Bom/ }));
  expect(screen.getByText(/Próxima revisão amanhã/)).toBeInTheDocument();
  expect(Object.keys(loadData('visitante').cards)).toHaveLength(1);
});
