import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { waitForRouteReady } from './route-ready';
import { getLesson, getQuestion } from '@/content';
import { loadData, saveData } from '@/lib/storage';
import { getChapter } from '@/content';
import { markSectionRead } from '@/lib/study';
import { getLearningCheckpoint } from '@/lib/checkpoint';
import { trailUnits } from '@/app/useCheckpoint';
import { journey, microSeries, getLearningUnit } from '@/content';
import { missaoSql01 } from '@/content/missions/sql-01';

/** Primeiro trecho de um capítulo ainda sem microaula: só nesses o livro simples aparece. */
const SIMPLE = (() => {
  for (const ch of [...journey].reverse()) {
    const s = ch.sections[0];
    if (!microSeries(ch.id, s.id).length && !getLearningUnit(ch.id, s.id)) return { c: ch.id, s: s.id };
  }
  throw new Error('nenhum trecho sem microaula');
})();

/** A Prática só abre depois do Aprender do trecho (gate da trilha). */
function readSection(chapterId: string, sectionId: string) {
  saveData('visitante', markSectionRead(loadData('visitante'), getChapter(chapterId)!, sectionId).data);
}

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
  await waitForRouteReady();

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
  await waitForRouteReady();
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

it('material completo: leitura contínua e navegação por trechos', async () => {
  renderAt('/capitulo/cap.seg.01');
  await waitForRouteReady();
  await waitForRouteReady();
  expect(screen.getByRole('heading', { name: 'Criptografia' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Voltar à trilha' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Estudar este trecho' })).toHaveAttribute('href', '/aprender/cap.seg.01/fundamentos');
  expect(screen.queryByRole('button', { name: 'Próxima página' })).toBeNull();
});

it('Aprender apresenta o conteúdo em etapas contínuas e registra a conclusão', async () => {
  const user = userEvent.setup();
  renderAt(`/aprender/${SIMPLE.c}/${SIMPLE.s}`);
  await waitForRouteReady();
  expect(screen.getByRole('button', { name: 'Sair do Aprender' })).toBeInTheDocument();
  expect(screen.getByTestId('aprender-etapa')).toBeInTheDocument();
  for (let i = 0; i < 15 && !screen.queryByTestId(`praticar-${SIMPLE.s}`); i++) {
    const next = screen.queryByRole('button', { name: /Continuar/ });
    if (!next) break;
    await user.click(next);
  }
  expect(screen.getByTestId(`praticar-${SIMPLE.s}`)).toBeInTheDocument();
  expect(loadData('visitante').reading[SIMPLE.c].sectionsRead).toContain(SIMPLE.s);
});

it('prática: abre a rodada do trecho e mostra a primeira atividade', async () => {
  const user = userEvent.setup();
  readSection('cap.seg.01', 'fundamentos');
  renderAt('/pratica/cap.seg.01/fundamentos');
  await waitForRouteReady();
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
  await waitForRouteReady();
  await waitForRouteReady();
  await user.click(screen.getByRole('button', { name: '10' }));
  await user.click(screen.getByRole('button', { name: 'Livre' }));
  await user.click(screen.getByRole('button', { name: /Iniciar simulado com 10 questões/ }));
  expect(screen.getByText(/Respondidas 0 de 10/)).toBeInTheDocument();
  // Responde a primeira com a letra A e entrega (confirmação aceita).
  await user.click(screen.getAllByRole('button', { pressed: false }).find((b) => b.textContent?.startsWith('A'))!);
  window.confirm = () => true;
  await user.click(screen.getByRole('button', { name: 'Entregar a prova' }));
  await waitForRouteReady();
  expect(screen.getByText('Boletim do simulado')).toBeInTheDocument();
  const exams = Object.values(loadData('visitante').exams);
  expect(exams).toHaveLength(1);
  expect(exams[0].finishedAt).toBeTruthy();
});

it('flashcards: só de capítulos já estudados; revela e avalia um cartão', async () => {
  const user = userEvent.setup();
  const empty = renderAt('/flashcards');
  await waitForRouteReady();
  await waitForRouteReady();
  expect(screen.queryByRole('button', { name: 'Revelar o verso' })).toBeNull();
  empty.unmount();
  readSection('cap.seg.01', 'fundamentos');
  renderAt('/flashcards');
  await waitForRouteReady();
  await waitForRouteReady();
  await user.click(screen.getByRole('button', { name: 'Revelar o verso' }));
  await user.click(screen.getByRole('button', { name: /Bom/ }));
  expect(screen.getByText(/Próxima revisão amanhã/)).toBeInTheDocument();
  expect(Object.keys(loadData('visitante').cards)).toHaveLength(1);
});

it('caso prático de SQL: objetivos (sem cena de jogo), descoberta e laboratório com a consulta montada', async () => {
  const user = userEvent.setup();
  renderAt('/missao/missao.sql.01');
  await waitForRouteReady();
  await waitForRouteReady();
  expect(screen.queryByRole('list', { name: 'Transcrição da cena' })).toBeNull();
  expect(screen.getByText(/Por que a lista de empenhos/)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Vamos lá' }));
  // A alternativa correta deve ser selecionada pelo conteúdo, não por uma posição fixa.
  // O player embaralha opções para cada tentativa, inclusive nas atividades da missão.
  for (let k = 0; k < missaoSql01.discovery.length; k++) {
    const sec = screen.getByRole('region', { name: 'Descoberta guiada' });
    const check = missaoSql01.discovery[k].check;
    if (check.kind !== 'choice') throw new Error('Checagem de descoberta inesperada');
    const correctText = check.options[check.answer].text;
    await user.click(within(sec).getByRole('button', { name: correctText }));
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

it('página inicial apresenta progresso visual e próximos passos sem contador dominante', async () => {
  renderAt('/');
  await waitForRouteReady();
  expect(screen.getByRole('region', { name: 'Seu avanço nas matérias' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Você já avançou em \d+% do conteúdo/ })).toBeInTheDocument();
  expect(screen.getByTestId('continuar-torre')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Ver detalhes/ })).toHaveAttribute('href', '/progresso');
});

it('um só destino: Torre, cabeçalho e menu levam ao mesmo passo', async () => {
  renderAt('/');
  await waitForRouteReady();
  const torre = screen.getByTestId('continuar-torre').getAttribute('href');
  expect(screen.getByTestId('continuar-topo').getAttribute('href')).toBe(torre);
  expect(screen.getByTestId('continuar-menu').getAttribute('href')).toBe(torre);
  expect(torre).toBe(trailUnits()[0].to);
});

it('retomada exata: Aprender e Missão voltam ao mesmo ponto depois de sair', async () => {
  const user = userEvent.setup();
  const first = renderAt(`/aprender/${SIMPLE.c}/${SIMPLE.s}`);
  await waitForRouteReady();
  for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: /Continuar/ }));
  expect(screen.getByText(/^Etapa 4 de \d+$/)).toBeInTheDocument();
  first.unmount();
  // A Torre agora oferece Continuar, no mesmo trecho.
  const home = renderAt('/');
  await waitForRouteReady();
  expect(screen.getByTestId('continuar-torre')).toHaveTextContent('Continuar');
  expect(screen.getByText(/Aprender: página 4/)).toBeInTheDocument();
  home.unmount();
  const again = renderAt(`/aprender/${SIMPLE.c}/${SIMPLE.s}`);
  await waitForRouteReady();
  expect(screen.getByText(/^Etapa 4 de \d+$/)).toBeInTheDocument();
  again.unmount();

  const m1 = renderAt('/missao/missao.sql.01');
  await waitForRouteReady();
  await user.click(screen.getByRole('button', { name: 'Vamos lá' }));
  const sec = screen.getByRole('region', { name: 'Descoberta guiada' });
  await user.click(within(sec).getAllByRole('button', { pressed: false })[0]);
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  expect(screen.getByText('Descoberta 2 de 4')).toBeInTheDocument();
  m1.unmount();
  renderAt('/missao/missao.sql.01');
  await waitForRouteReady();
  expect(screen.getByText('Descoberta 2 de 4')).toBeInTheDocument();
});

it('retomada exata: Desafio e Prática continuam na mesma questão/atividade', async () => {
  const user = userEvent.setup();
  const lesson = getLesson('lic.seg.01.a')!;
  const a = renderAt(`/licao/${lesson.id}`);
  await waitForRouteReady();
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
  await waitForRouteReady();
  expect(screen.getByText(/Questão 3 de 10/)).toBeInTheDocument();
  b.unmount();

  readSection('cap.seg.01', 'fundamentos');
  const c = renderAt('/pratica/cap.seg.01/fundamentos');
  await waitForRouteReady();
  await user.click(screen.getByRole('button', { name: /Começar/ }));
  expect(screen.getByRole('button', { name: 'Sair da prática' })).toBeInTheDocument();
  c.unmount();
  renderAt('/pratica/cap.seg.01/fundamentos');
  await waitForRouteReady();
  // Volta direto para a atividade, sem a tela de abertura.
  expect(screen.queryByRole('heading', { name: /Prática:/ })).toBeNull();
  expect(screen.getByRole('button', { name: 'Verificar' })).toBeInTheDocument();
});

it('microaula: explica, confere na hora, ensina de novo quando erra e retoma na mesma etapa', async () => {
  const user = userEvent.setup();
  const a = renderAt('/aprender/cap.infra.03/arquivos');
  await waitForRouteReady();
  // Abertura
  await user.click(screen.getByRole('button', { name: /pelas permissões do arquivo/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  // Etapa 1: explicação, depois checagem errada de propósito.
  expect(screen.getByRole('heading', { name: 'O que um sistema de arquivos faz' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Entendi, quero conferir' }));
  await user.click(screen.getByRole('button', { name: /Conteúdo do arquivo/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  // Recuperação: outra explicação e item equivalente.
  expect(screen.getByRole('heading', { name: 'Vamos ver de outro jeito' })).toBeInTheDocument();
  expect(screen.getByText(/pasta de processo físico/)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Entendi, quero conferir' }));
  for (const [item, cat] of [['O texto do relatório', 'Conteúdo'], ['O dono: maria', 'Metadado'], ['Tamanho: 8192 bytes', 'Metadado']]) {
    await user.click(within(screen.getByRole('group', { name: `Categoria de ${item}` })).getByRole('button', { name: cat }));
  }
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  expect(screen.getByRole('heading', { name: 'NTFS, FAT32, exFAT e ReFS' })).toBeInTheDocument();
  a.unmount();
  // Sai e volta: mesma etapa.
  renderAt('/aprender/cap.infra.03/arquivos');
  await waitForRouteReady();
  expect(screen.getByRole('heading', { name: 'NTFS, FAT32, exFAT e ReFS' })).toBeInTheDocument();
});

it('texto interativo (piloto Processos): termo clicável, recuperação com retorno e retomada na etapa exata', async () => {
  const user = userEvent.setup();
  const a = renderAt('/aprender/cap.infra.03/processos');
  await waitForRouteReady();
  expect(screen.getByRole('heading', { level: 1, name: 'Processos, memória e serviços' })).toBeInTheDocument();
  // Abertura (diagnóstica, não vale nota)
  await user.click(screen.getByRole('button', { name: /Cada execução em andamento/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  // Etapa 1: a base (processador, memória e disco), antes de qualquer termo de processos.
  expect(screen.getByRole('heading', { name: /O computador por dentro/ })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Apaga; o que precisa durar fica no disco/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  // Etapa 2 em texto, com termo do glossário que abre a definição sem sair do lugar.
  expect(screen.getByRole('heading', { name: 'Programa e processo' })).toBeInTheDocument();
  await user.click(screen.getAllByRole('button', { name: /^processo \(abrir definição\)/ })[0]);
  const dialog = screen.getByRole('dialog', { name: 'Conceito: Processo' });
  expect(within(dialog).getByText(/Programa em execução/)).toBeInTheDocument();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).toBeNull();
  // Termo de conceito futuro não vira link.
  expect(screen.queryByRole('button', { name: /Thrashing \(abrir definição\)/ })).toBeNull();
  // Erra a checagem: recuperação com outra explicação e item equivalente; depois volta e avança.
  await user.click(screen.getByRole('button', { name: /Sim, porque o arquivo existe/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  const rec = screen.getByRole('generic', { name: 'Recuperação' });
  // Durante a recuperação, o Continuar indica reforço e aponta para a mesma aula (retorno garantido).
  const cp = getLearningCheckpoint(loadData('visitante'), trailUnits());
  expect(cp.to).toBe('/aprender/cap.infra.03/processos');
  expect(cp.context).toContain('Reforço do assunto: etapa 2 de 16');
  expect(within(rec).getByText(/receita de bolo/)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /1 programa e 3 processos/ }));
  await user.click(screen.getByRole('button', { name: 'Verificar' }));
  await user.click(screen.getByRole('button', { name: 'Continuar' }));
  expect(screen.getByRole('heading', { name: 'O número de cada processo: PID' })).toBeInTheDocument();
  expect(screen.getByText('Etapa 3 de 16')).toBeInTheDocument();
  a.unmount();
  // Sai e volta: mesma etapa; o Continuar de Hoje aponta para cá.
  renderAt('/aprender/cap.infra.03/processos');
  await waitForRouteReady();
  expect(screen.getByText('Etapa 3 de 16')).toBeInTheDocument();
  expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent('O número de cada processo: PID');
});

it('ponto salvo pela microaula antiga continua valendo no texto interativo', async () => {
  const data = loadData('visitante');
  localStorage.setItem(
    'cronicas:v1:visitante',
    JSON.stringify({ ...data, progress: { 'aprender:cap.infra.03:processos': { step: { phase: { k: 'checar', i: 3 }, first: {}, struggled: [] }, updatedAt: new Date().toISOString() } } }),
  );
  renderAt('/aprender/cap.infra.03/processos');
  await waitForRouteReady();
  // A aula ganhou uma etapa inicial (processador, memória e disco): o ponto antigo abre uma etapa
  // antes, sem perder nada.
  expect(screen.getByText('Etapa 4 de 16')).toBeInTheDocument();
  expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent('Threads: tarefas dentro do processo');
});

it('material completo não oferece controles de virada de página', async () => {
  renderAt('/capitulo/cap.seg.01');
  await waitForRouteReady();
  await waitForRouteReady();
  expect(screen.getByRole('heading', { name: 'Criptografia' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /página seguinte|próxima página/i })).toBeNull();
  expect(screen.getByRole('link', { name: 'Estudar este trecho' })).toBeInTheDocument();
});

it('prática bloqueada antes do Aprender do trecho, com caminho para aprender', async () => {
  renderAt('/pratica/cap.infra.03/processos');
  await waitForRouteReady();
  expect(screen.getByRole('heading', { name: 'Primeiro, aprenda este trecho' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Ir para o Aprender/ })).toHaveAttribute('href', '/aprender/cap.infra.03/processos');
  expect(screen.queryByRole('button', { name: /Começar/ })).toBeNull();
});
