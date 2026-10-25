import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { DEFAULT_CONTEST_ID, chapters, concepts, questionsForContest, scenarios, teacherPosts, teachers } from '@/content';
import { advance, choose, restoreScenario, scenarioReport, startScenario, validateScenario, type Scenario } from '@/lib/scenario';
import { FEED_PAGE, buildFeed, emptySala } from '@/lib/teachers';
import { emptyData, type StudyData } from '@/lib/model';
import { saveData } from '@/lib/storage';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

const readAt = (d: StudyData, chapterId: string, sectionId: string): StudyData => ({
  ...d,
  reading: { ...d.reading, [chapterId]: { chapterId, sectionsRead: [...(d.reading[chapterId]?.sectionsRead ?? []), sectionId], updatedAt: '2026-10-01T00:00:00Z' } },
});

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

describe('simulador: conteúdo', () => {
  it.each(scenarios.map((s) => [s.id, s] as const))('%s tem grafo válido, conceitos conhecidos e trechos existentes', (_, s) => {
    expect(validateScenario(s)).toEqual([]);
    const known = new Set(concepts.map((c) => c.id));
    for (const c of s.prerequisiteConceptIds) expect(known.has(c), c).toBe(true);
    for (const n of s.nodes) for (const d of n.decisions ?? []) for (const c of d.conceptIds) expect(s.prerequisiteConceptIds, `${d.id} cobra ${c}`).toContain(c);
    for (const r of s.requires) expect(chapters.find((c) => c.id === r.chapterId)?.sections.some((x) => x.id === r.sectionId), r.sectionId).toBe(true);
    expect(s.review).toBe('nao-revisado');
  });

  it('o validador acusa destino inexistente, nó inalcançável e beco sem saída', () => {
    const bad: Scenario = {
      ...scenarios[0],
      nodes: [
        { id: 'a', dialogue: 'x', decisions: [{ id: 'd1', label: 'l', feedback: 'f', outcome: 'boa', nextNodeId: 'b', conceptIds: [] }, { id: 'd2', label: 'l', feedback: 'f', outcome: 'ruim', nextNodeId: 'zz', conceptIds: [] }] },
        { id: 'b', dialogue: 'x', decisions: [{ id: 'd3', label: 'l', feedback: 'f', outcome: 'boa', nextNodeId: 'b', conceptIds: [] }] },
        { id: 'c', dialogue: 'x', terminal: true },
      ],
      entryNodeId: 'a',
    };
    const errs = validateScenario(bad).join(' | ');
    expect(errs).toMatch(/destino zz/);
    expect(errs).toMatch(/c: inalcançável/);
    expect(errs).toMatch(/b: não leva a nenhum fechamento/);
  });
});

describe('simulador: motor', () => {
  const s = scenarios[0];
  it('escolha ruim volta à mesma etapa com explicação; o caminho chega ao fechamento com relatório', () => {
    let st = startScenario(s, 't0');
    st = choose(s, st, 'd.reiniciar', 't1');
    expect(st.pending?.decisionId).toBe('d.reiniciar');
    // Não dá para escolher de novo antes de ver o retorno.
    expect(choose(s, st, 'd.top')).toBe(st);
    st = advance(s, st);
    expect(st.nodeId).toBe('n.inicio');
    for (const d of ['d.top', 'd.cpu']) st = advance(s, choose(s, st, d));
    expect(st.nodeId).toBe('n.top');
    expect(st.evidence).toEqual(expect.arrayContaining(['ev.top', 'ev.vmstat']));
    for (const d of ['d.thrashing', 'd.term']) st = advance(s, choose(s, st, d, 't9'), 't9');
    expect(st.finishedAt).toBe('t9');
    const r = scenarioReport(s, st);
    expect(r).toMatchObject({ steps: 3, goodFirstTry: 1 });
    expect(r.toReview).toEqual(expect.arrayContaining(['c.so.ps-top', 'c.so.thrashing']));
  });

  it('estado salvo só é retomado na mesma versão do cenário', () => {
    const st = startScenario(s);
    expect(restoreScenario(s, st)).toBe(st);
    expect(restoreScenario({ ...s, version: s.version + 1 }, st)).toBeUndefined();
    expect(restoreScenario(s, { ...st, nodeId: 'sumiu' })).toBeUndefined();
  });
});

describe('Sala dos Professores: conteúdo e feed', () => {
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  it('posts apontam para trecho, tópico e professor existentes; professores são fictícios', () => {
    expect(new Set(teacherPosts.map((p) => p.id)).size).toBe(teacherPosts.length);
    for (const t of teachers) expect(t.fictional).toBe(true);
    for (const p of teacherPosts) {
      const ch = chapters.find((c) => c.id === p.chapterId);
      expect(ch?.sections.some((x) => x.id === p.sectionId), p.id).toBe(true);
      for (const t of p.topicIds) expect(ch!.topicIds, p.id).toContain(t);
      expect(teachers.some((t) => t.id === p.teacherId)).toBe(true);
      expect(p.review).toBe('nao-revisado');
    }
    expect(teacherPosts.length).toBeGreaterThan(FEED_PAGE);
  });

  it('assunto atual e erros vêm antes; não estudado é prévia; ocultos somem', () => {
    const cur = { chapterId: 'cap.infra.03', sectionId: 'processos' };
    let d = readAt(emptyData(), 'cap.infra.03', 'processos');
    let feed = buildFeed({ data: d, posts: teacherPosts, bank, prefs: emptySala(), current: cur });
    expect(feed[0].reason).toBe('agora');
    expect(feed[0].preview).toBe(false);
    expect(feed.filter((f) => f.post.sectionId !== 'processos').every((f) => f.preview && f.reason === 'previa')).toBe(true);
    // Erro na última resposta de um trecho estudado faz o post subir como reforço.
    const q = bank.find((x) => x.chapterId === 'cap.infra.01' && x.sectionId === 'enderecos')!;
    d = readAt(d, 'cap.infra.01', 'enderecos');
    d = { ...d, attempts: [{ id: 'a', contestId: DEFAULT_CONTEST_ID, questionId: q.id, topicId: q.topicId, selectedOption: 'A', isCorrect: false, context: 'practice', answeredAt: '2026-10-02T00:00:00Z' }] };
    feed = buildFeed({ data: d, posts: teacherPosts, bank, prefs: emptySala(), current: { chapterId: 'cap.infra.01', sectionId: 'tcpip' } });
    // O próximo passo da trilha vem primeiro (ainda como prévia, sem mini-desafio); logo depois, o reforço.
    expect(feed[0]).toMatchObject({ reason: 'agora', preview: true });
    expect(feed[0].post.sectionId).toBe('tcpip');
    expect(feed[1].reason).toBe('reforco');
    expect(feed[1].post.sectionId).toBe('enderecos');
    const hidden = buildFeed({ data: d, posts: teacherPosts, bank, prefs: { ...emptySala(), hidden: [feed[0].post.id] } });
    expect(hidden.some((f) => f.post.id === feed[0].post.id)).toBe(false);
  });
});

describe('telas da fase 6', () => {
  it('simulador bloqueado antes de estudar; depois joga até o fim e retoma ao voltar', async () => {
    const user = userEvent.setup();
    const { unmount } = renderAt('/simulador/cen.suporte-lento');
    expect(screen.getByTestId('cenario-bloqueado')).toBeInTheDocument();
    unmount();
    saveData('visitante', readAt(emptyData(), 'cap.infra.03', 'processos'));
    const r2 = renderAt('/simulador/cen.suporte-lento');
    await user.click(screen.getByRole('button', { name: /Abrir o top/ }));
    expect(screen.getByTestId('cenario-retorno')).toHaveTextContent('Boa decisão');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByText(/Saída do vmstat/)).toBeInTheDocument();
    r2.unmount();
    // Retoma na etapa da hipótese.
    renderAt('/simulador/cen.suporte-lento');
    await user.click(screen.getByRole('button', { name: /Falta memória física/ }));
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    await user.click(screen.getByRole('button', { name: /kill 4127 e conferir/ }));
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByTestId('cenario-fechamento')).toHaveTextContent('Acertou de primeira 3 de 3');
  });

  it('Sala: 5 posts por vez, mini-desafio só no trecho estudado, salvar e ocultar', async () => {
    const user = userEvent.setup();
    saveData('visitante', readAt(emptyData(), 'cap.infra.03', 'processos'));
    renderAt('/sala');
    expect(screen.getAllByRole('article')).toHaveLength(FEED_PAGE);
    const kill = screen.getByTestId('post-post.kill');
    await user.click(within(kill).getByRole('button', { name: 'Errado' }));
    expect(kill).toHaveTextContent(/Acertou\..*não pode ser capturado/);
    await user.click(screen.getByRole('button', { name: /Mostrar mais/ }));
    expect(screen.getAllByRole('article').length).toBeGreaterThan(FEED_PAGE);
    expect(screen.getAllByText(/abre depois que você estudar/).length).toBeGreaterThan(0);
    const nice = screen.getByTestId('post-post.nice');
    await user.click(within(nice).getByRole('button', { name: 'Salvar' }));
    await user.click(screen.getByRole('tab', { name: /Salvos \(1\)/ }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(screen.getByRole('tab', { name: 'Para você' }));
    await user.click(within(screen.getByTestId('post-post.ps-top')).getByRole('button', { name: 'Ocultar' }));
    expect(screen.queryByTestId('post-post.ps-top')).toBeNull();
    expect(JSON.parse(localStorage.getItem('cronicas:sala')!).hidden).toEqual(['post.ps-top']);
  });
});

