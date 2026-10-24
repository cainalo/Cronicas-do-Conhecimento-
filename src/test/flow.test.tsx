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

it('livro: vira páginas, marca o trecho como lido e busca no sumário', async () => {
  const user = userEvent.setup();
  renderAt('/capitulo/cap.seg.01');
  expect(screen.getByRole('heading', { name: 'Criptografia' })).toBeInTheDocument();
  // Vira até o fim do primeiro trecho (a página com "Praticar agora").
  for (let i = 0; i < 6 && !screen.queryByTestId('praticar-fundamentos'); i++) {
    await user.click(screen.getByRole('button', { name: 'Próxima página' }));
  }
  expect(screen.getByTestId('praticar-fundamentos')).toBeInTheDocument();
  expect(loadData('visitante').reading['cap.seg.01'].sectionsRead).toEqual(['fundamentos']);
  await user.click(screen.getByRole('button', { name: 'Sumário' }));
  await user.type(screen.getByPlaceholderText('Buscar no capítulo…'), 'Kerckhoffs');
  expect(screen.getAllByText(/1\. Fundamentos/).length).toBeGreaterThan(0);
});

it('aprender: livro simples do trecho, palavras novas e convite para praticar', async () => {
  const user = userEvent.setup();
  renderAt('/aprender/cap.prim.01/computador');
  expect(screen.getByText(/Trecho I/)).toBeInTheDocument();
  for (let i = 0; i < 12 && !screen.queryByTestId('praticar-computador'); i++) {
    await user.click(screen.getByRole('button', { name: 'Próxima página' }));
    if (i === 0) expect(screen.getByText(/^1 de \d$/)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Onde você está" })).toHaveTextContent("Trecho 1 de");
  }
  expect(screen.getByText('Trecho aprendido!')).toBeInTheDocument();
  expect(loadData('visitante').reading['cap.prim.01'].sectionsRead).toEqual(['computador']);
  expect(screen.getByRole('link', { name: /texto completo/ })).toHaveAttribute('href', '/capitulo/cap.prim.01#computador');
});

it('prática: abre a rodada do trecho e mostra a primeira atividade', async () => {
  const user = userEvent.setup();
  renderAt('/pratica/cap.seg.01/fundamentos');
  expect(screen.getByRole('heading', { name: /Prática:/ })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Começar/ }));
  expect(screen.getByRole('button', { name: 'Sair da prática' })).toBeInTheDocument();
  expect(screen.getByText(/Verdadeiro ou falso\?|Qual é o termo\?|Complete a frase|Associe cada termo|Questão no estilo da prova/)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Palavras do trecho' }));
  expect(screen.getByRole('dialog', { name: 'Palavras do trecho' })).toBeInTheDocument();
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
  expect(screen.getByRole('heading', { name: 'Boletim do simulado' })).toBeInTheDocument();
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

it('missão SQL: cena em texto, objetivos, descoberta e laboratório com a consulta montada', async () => {
  const user = userEvent.setup();
  renderAt('/missao/missao.sql.01');
  expect(screen.getByRole('list', { name: 'Transcrição da cena' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Começar a investigação/ }));
  expect(screen.getByText(/Por que a lista de empenhos/)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Vamos lá' }));
  // Descoberta: a primeira alternativa é a certa nas quatro verificações.
  for (let k = 0; k < 4; k++) {
    const sec = screen.getByRole('region', { name: 'Descoberta guiada' });
    await user.click(within(sec).getAllByRole('button', { pressed: false })[0]);
    await user.click(screen.getByRole('button', { name: 'Verificar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Correto');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
  }
  // Laboratório, tarefa 1: SELECT nome FROM fornecedor WHERE cidade = 'Goiânia'.
  expect(screen.getByText('Mostre o nome dos fornecedores de Goiânia.')).toBeInTheDocument();
  await user.click(screen.getAllByRole('button', { name: 'nome' })[0]);
  await user.click(screen.getAllByRole('button', { name: '+ filtro' })[0]);
  await user.selectOptions(screen.getAllByLabelText('Coluna do filtro')[0], 'cidade');
  await user.selectOptions(screen.getAllByLabelText('Valor')[0], 'Goiânia');
  expect(screen.getAllByLabelText('SQL montado')[0]).toHaveTextContent("WHERE cidade = 'Goiânia'");
  await user.click(screen.getByRole('button', { name: /Executar/ }));
  expect(screen.getByText('Consulta certa')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  // Tarefa 2: a consulta do Tesoureiro vem com "= NULL"; rodar mostra o diagnóstico.
  await user.click(screen.getByRole('button', { name: /Executar/ }));
  expect(screen.getByText(/comparação com NULL/)).toBeInTheDocument();
  await user.selectOptions(screen.getAllByLabelText('Operador')[0], 'IS NULL');
  await user.click(screen.getByRole('button', { name: /Executar/ }));
  expect(screen.getByText('Consulta certa')).toBeInTheDocument();
});

it('torre: mostra os dias até a prova e a meta de hoje para terminar o curso a tempo', () => {
  renderAt('/');
  const card = screen.getByRole('region', { name: 'Ritmo até a prova' });
  expect(card).toHaveTextContent(/Faltam \d+ dias para a prova/);
  expect(card).toHaveTextContent(/Meta de hoje: \d+ atividade/);
  expect(card).toHaveTextContent(/O curso inteiro tem \d+ atividades/);
});

it('um só destino: Torre, cabeçalho e menu levam ao mesmo passo', () => {
  renderAt('/');
  const torre = screen.getByTestId('continuar-torre').getAttribute('href');
  expect(screen.getByTestId('continuar-topo').getAttribute('href')).toBe(torre);
  expect(screen.getByTestId('continuar-menu').getAttribute('href')).toBe(torre);
  expect(torre).toBe('/aprender/cap.prim.01/computador');
});

it('retomada exata: Aprender e Missão voltam ao mesmo ponto depois de sair', async () => {
  const user = userEvent.setup();
  const first = renderAt('/aprender/cap.prim.01/computador');
  for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: 'Próxima página' }));
  expect(screen.getByText('4/11')).toBeInTheDocument();
  first.unmount();
  // A Torre agora oferece Continuar, no mesmo trecho.
  const home = renderAt('/');
  expect(screen.getByTestId('continuar-torre')).toHaveTextContent('Continuar');
  expect(screen.getByText(/Aprender: página 4/)).toBeInTheDocument();
  home.unmount();
  const again = renderAt('/aprender/cap.prim.01/computador');
  expect(screen.getByText('4/11')).toBeInTheDocument();
  again.unmount();

  const m1 = renderAt('/missao/missao.sql.01');
  await user.click(screen.getByRole('button', { name: /Começar a investigação/ }));
  await user.click(screen.getByRole('button', { name: 'Vamos lá' }));
  const sec = screen.getByRole('region', { name: 'Descoberta guiada' });
  await user.click(within(sec).getAllByRole('button', { pressed: false })[0]);
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  expect(screen.getByText('Descoberta 2 de 4')).toBeInTheDocument();
  m1.unmount();
  renderAt('/missao/missao.sql.01');
  expect(screen.getByText('Descoberta 2 de 4')).toBeInTheDocument();
});

it('retomada exata: Desafio e Prática continuam na mesma questão/atividade', async () => {
  const user = userEvent.setup();
  const lesson = getLesson('lic.seg.01.a')!;
  const a = renderAt(`/licao/${lesson.id}`);
  for (let i = 0; i < lesson.cards.length; i++) await user.click(screen.getByRole('button', { name: /Próximo|Começar questões/ }));
  for (let i = 0; i < 2; i++) {
    const q = getQuestion(lesson.questionIds[i])!;
    await user.click(screen.getAllByRole('button').find((b) => b.textContent?.startsWith(q.answer))!);
    await user.click(screen.getByRole('button', { name: 'Confirmar resposta' }));
    await user.click(screen.getByRole('button', { name: 'Próxima questão' }));
  }
  expect(screen.getByText(/Questão 3 de 10/)).toBeInTheDocument();
  a.unmount();
  const b = renderAt(`/licao/${lesson.id}`);
  expect(screen.getByText(/Questão 3 de 10/)).toBeInTheDocument();
  b.unmount();

  const c = renderAt('/pratica/cap.seg.01/fundamentos');
  await user.click(screen.getByRole('button', { name: /Começar/ }));
  expect(screen.getByRole('button', { name: 'Sair da prática' })).toBeInTheDocument();
  c.unmount();
  renderAt('/pratica/cap.seg.01/fundamentos');
  // Volta direto para a atividade, sem a tela de abertura.
  expect(screen.queryByRole('heading', { name: /Prática:/ })).toBeNull();
  expect(screen.getByRole('button', { name: 'Verificar' })).toBeInTheDocument();
});
