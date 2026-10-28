import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { saveData } from '@/lib/storage';
import { emptyData } from '@/lib/model';
import { createTerminalState, executeTerminalCommand, getTerminalLab, terminalLabProgress } from '@/lib/terminal-lab';
vi.mock('@/lib/supabase', () => ({ supabase: null }));
import { getScenario } from '@/content';
import { escritorio } from '@/content/world/escritorio';
import { advance, choose, startScenario } from '@/lib/scenario';
import { adjacentInteractable, currentObjective, examine, scenarioForOfficeMap, facingOf, findPath, pathNextTo, restoreWorld, roomAt, talk, validateWorld, walkable, type WorldState } from '@/lib/world';

const s = getScenario(escritorio.scenarioId)!;
const start = (): WorldState => ({ worldId: escritorio.id, version: escritorio.version, pos: escritorio.start, facing: 'direita', examined: [], scenario: startScenario(s, 't0'), updatedAt: 't0' });

describe('cenário especial para o mapa interativo', () => {
  it('não injeta a saída do terminal automaticamente no mapa jogável', () => {
    const mapScenario = scenarioForOfficeMap(s);
    let state = startScenario(mapScenario, 't0');
    state = advance(mapScenario, choose(mapScenario, state, 'd.reiniciar', 't1'), 't1');
    for (const d of ['d.top', 'd.cpu']) state = advance(mapScenario, choose(mapScenario, state, d, 't2'), 't2');
    expect(state.nodeId).toBe('n.top');
    expect(state.evidence).not.toContain('ev.top');
    expect(state.evidence).not.toContain('ev.vmstat');
    state = advance(mapScenario, choose(mapScenario, state, 'd.thrashing', 't3'), 't3');
    state = advance(mapScenario, choose(mapScenario, state, 'd.term', 't4'), 't4');
    expect(state.nodeId).toBe('n.fim');
    expect(state.evidence).not.toContain('ev.depois');
    expect(s.nodes.find((node) => node.id === 'n.top')?.evidenceIds).toEqual(['ev.top', 'ev.vmstat']);
  });
});

describe('escritório 2D', () => {
  it('mapa válido: grade regular, todos alcançáveis, cada nó com quem o apresenta', () => {
    expect(validateWorld(escritorio, s)).toEqual([]);
    expect(roomAt(escritorio, escritorio.start)?.name).toBe('Recepção');
  });

  it('caminho desvia de paredes, móveis e pessoas; destino bloqueado não tem caminho', () => {
    const marta = escritorio.actors.find((a) => a.id === 'marta')!;
    const p = pathNextTo(escritorio, escritorio.start, [marta.at])!;
    expect(p.length).toBeGreaterThan(5);
    for (const t of p) expect(walkable(escritorio, t)).toBe(true);
    // Passos de uma casa por vez.
    let cur = escritorio.start;
    for (const t of p) {
      expect(Math.abs(t.x - cur.x) + Math.abs(t.y - cur.y)).toBe(1);
      cur = t;
    }
    expect(adjacentInteractable(escritorio, cur)).toEqual({ kind: 'actor', actor: marta });
    expect(findPath(escritorio, escritorio.start, { x: 0, y: 0 })).toEqual([]);
  });

  it('situação completa pelo mapa: conversa, objeto exigido, decisão errada com volta, conferência e fechamento', () => {
    let w = start();
    expect(currentObjective(escritorio, w)).toMatch(/Marta/);
    // Falar com quem não apresenta a etapa é só conversa.
    expect(talk(escritorio, w, 'joao').kind).toBe('conversa');
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.top')) };
    // O motor genérico do cenário conserva suas evidências de referência; o mapa usa scenarioForOfficeMap.
    expect(w.scenario.evidence).toEqual(expect.arrayContaining(['ev.top', 'ev.vmstat']));
    expect(talk(escritorio, w, 'marta')).toEqual({ kind: 'falta', objectIds: ['terminal'] });
    expect(currentObjective(escritorio, w)).toMatch(/terminal/);
    w = examine(escritorio, s, w, 'terminal').state;
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    // Hipótese errada volta à mesma etapa; a certa leva ao João.
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.cpu')) };
    expect(w.scenario.nodeId).toBe('n.top');
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.thrashing')) };
    expect(talk(escritorio, w, 'joao').kind).toBe('node');
    // O console só mostra algo depois da decisão.
    expect(examine(escritorio, s, w, 'console').available).toBe(false);
    w = { ...w, scenario: advance(s, choose(s, w.scenario, 'd.term')) };
    expect(talk(escritorio, w, 'marta')).toEqual({ kind: 'falta', objectIds: ['console'] });
    const ex = examine(escritorio, s, w, 'console');
    expect(ex.available).toBe(true);
    w = ex.state;
    expect(w.scenario.evidence).toContain('ev.depois');
    expect(talk(escritorio, w, 'marta').kind).toBe('node');
    w = { ...w, closed: true };
    expect(currentObjective(escritorio, w)).toMatch(/resolvida/);
  });

  it('estado salvo volta na mesma versão e em casa válida', () => {
    const w = { ...start(), pos: { x: 3, y: 6 } };
    expect(restoreWorld(escritorio, s, w)).toBe(w);
    expect(restoreWorld(escritorio, s, { ...w, pos: { x: 0, y: 0 } })).toBeUndefined();
    expect(restoreWorld(escritorio, s, { ...w, version: 99 })).toBeUndefined();
  });
});

describe('escritório: móveis, objetos de ambiente e direção', () => {
  it('móveis sólidos bloqueiam a passagem; tapete e cadeira não', () => {
    const solid = escritorio.decor!.find((d) => d.kind === 'sofa')!;
    expect(walkable(escritorio, { x: solid.x, y: solid.y })).toBe(false);
    const rug = escritorio.decor!.find((d) => d.kind === 'tapete')!;
    expect(walkable(escritorio, { x: rug.x, y: rug.y })).toBe(true);
  });
  it('objeto de ambiente mostra a própria descrição e não mexe no caso', () => {
    const w = start();
    const r = examine(escritorio, s, w, 'quadro-suporte');
    expect(r.available).toBe(true);
    expect(r.state.scenario).toEqual(w.scenario);
    expect(escritorio.objects.find((o) => o.id === 'quadro-suporte')!.info).toMatch(/2318/);
  });
  it('quem anda olha para onde vai, nas quatro direções', () => {
    const o = { x: 5, y: 5 };
    expect(facingOf(o, { x: 4, y: 5 }, 'baixo')).toBe('esquerda');
    expect(facingOf(o, { x: 6, y: 5 }, 'baixo')).toBe('direita');
    expect(facingOf(o, { x: 5, y: 4 }, 'baixo')).toBe('cima');
    expect(facingOf(o, { x: 5, y: 6 }, 'cima')).toBe('baixo');
    expect(facingOf(o, o, 'cima')).toBe('cima');
  });
});

describe('tela do escritório (tela cheia)', () => {
  const renderWorld = (path = '/escritorio') =>
    render(
      <PrefsProvider>
        <StudyProvider>
          <MemoryRouter initialEntries={[path]}>
            <AppRoutes />
          </MemoryRouter>
        </StudyProvider>
      </PrefsProvider>,
    );
  beforeEach(() => {
    localStorage.clear();
    // Movimento reduzido: o personagem chega direto ao destino (sem esperar os passos).
    window.matchMedia = ((q: string) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false })) as unknown as typeof window.matchMedia;
    saveData('visitante', { ...emptyData(), reading: { 'cap.infra.03': { chapterId: 'cap.infra.03', sectionsRead: ['processos'], updatedAt: '2026-10-25T10:00:00.000Z' } } });
  });

  it('registra a triagem ao examinar o chamado e preserva a interação com o quadro e a Marta', async () => {
    const user = userEvent.setup();
    renderWorld();
    expect(screen.getByTestId('mundo')).toBeInTheDocument();
    expect(screen.getByTestId('mundo-objetivo')).toHaveTextContent(/Marta/);

    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /chamado 2318, no balcão/i }));
    expect(await screen.findByTestId('mundo-objeto')).toHaveTextContent(/2318/);
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('cronicas:v1:visitante')!);
      expect(saved.unitLog?.['escritorio:triagem']).toBeTruthy();
    });

    await user.click(screen.getByRole('button', { name: 'Fechar o painel' }));
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /Quadro de chamados do Suporte/ }));
    expect(await screen.findByTestId('mundo-objeto')).toHaveTextContent(/2318/);
    expect(screen.getByTestId('mundo-sala')).toHaveTextContent('Suporte');
    await user.click(screen.getByRole('button', { name: 'Fechar o painel' }));
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /Marta, Suporte/ }));
    expect(await screen.findByTestId('mundo-conversa')).toHaveTextContent(/primeiro chamado/);
  });

  it('o terminal do mapa exige concluir o laboratório antes de liberar a evidência', async () => {
    const user = userEvent.setup();
    renderWorld();
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /terminal na mesa da Marta/i }));
    const panel = await screen.findByTestId('mundo-objeto');
    expect(panel).toHaveTextContent(/conclua os comandos Linux no laboratório/i);
    expect(panel).not.toHaveTextContent(/saída do top/i);
    expect(screen.getByRole('link', { name: /iniciar laboratório de comandos/i })).toHaveAttribute(
      'href',
      '/laboratorio/processos?origem=escritorio&fase=diagnostico',
    );
  });

  it('registra a evidência depois que todos os passos do laboratório foram concluídos', async () => {
    let labState = createTerminalState();
    for (const command of ['pwd', 'ps aux', 'top', 'vmstat 2', 'kill 4127', 'free -h', 'df -h']) {
      labState = executeTerminalCommand(labState, command).state;
    }
    const labDefinition = getTerminalLab('processos')!;
    expect(terminalLabProgress(labDefinition, labState).done).toBe(true);
    localStorage.setItem('cronicas:terminal-lab:v1:processos', JSON.stringify(labState));

    const user = userEvent.setup();
    renderWorld();
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /terminal na mesa da Marta/i }));
    const panel = await screen.findByTestId('mundo-objeto');
    expect(await screen.findByText(/Anotado no caderno de investigação/i)).toBeInTheDocument();
    expect(panel).toHaveTextContent(/Investigue antes de formular a hipótese/i);
    expect(screen.getByRole('link', { name: /revisar laboratório de comandos/i })).toHaveAttribute(
      'href',
      '/laboratorio/processos?origem=escritorio&fase=diagnostico',
    );
  });

  it('bloqueia o diagnóstico quando a triagem ainda não foi registrada', () => {
    renderWorld('/escritorio?fase=diagnostico');
    expect(screen.getByTestId('mundo-etapa-bloqueada')).toHaveTextContent(/Conclua a etapa anterior primeiro/);
    expect(screen.getByRole('link', { name: /Continuar: Triagem do chamado/ })).toHaveAttribute(
      'href',
      '/escritorio?fase=triagem',
    );
  });

  it('a resolução exige diagnóstico registrado e libera a fase anterior corretamente', () => {
    renderWorld('/escritorio?fase=resolucao');
    expect(screen.getByTestId('mundo-etapa-bloqueada')).toHaveTextContent(/Conclua a etapa anterior primeiro/);
    expect(screen.getByRole('link', { name: /Continuar: Diagnóstico com evidências/ })).toHaveAttribute(
      'href',
      '/escritorio?fase=diagnostico',
    );
  });

  it('mostra os objetivos da fase depois de registrar a etapa anterior', () => {
    saveData('visitante', {
      ...emptyData(),
      reading: { 'cap.infra.03': { chapterId: 'cap.infra.03', sectionsRead: ['processos'], updatedAt: '2026-10-28T10:00:00.000Z' } },
      unitLog: { 'escritorio:triagem': '2026-10-28T10:00:00.000Z' },
    });
    renderWorld('/escritorio?fase=diagnostico');
    expect(screen.getByTestId('mundo-fase')).toHaveTextContent(/Fase 2 de 3/);
    expect(screen.getByTestId('mundo-fase')).toHaveTextContent(/Diagnóstico com evidências/);
  });

  it('oferece retorno ao mapa ao abrir o laboratório a partir do escritório', () => {
    renderWorld('/laboratorio/processos?origem=escritorio&fase=diagnostico');
    expect(screen.getByTestId('return-office-map')).toHaveTextContent(/Voltar ao mapa do Escritório de TI/);
    expect(screen.getByRole('link', { name: /Voltar ao mapa do Escritório de TI/ })).toHaveAttribute('href', '/escritorio?fase=diagnostico');
  });

  it('teclado anda uma casa e vira o personagem; Esc fecha o painel', async () => {
    const user = userEvent.setup();
    renderWorld();
    const before = JSON.parse(localStorage.getItem('cronicas:mundo:mundo.escritorio')!).pos;
    await user.keyboard('{ArrowDown}');
    const after = JSON.parse(localStorage.getItem('cronicas:mundo:mundo.escritorio')!);
    expect(after.pos).toEqual({ x: before.x, y: before.y + 1 });
    expect(after.facing).toBe('baixo');
    await user.click(screen.getByRole('button', { name: 'Caderno de investigação' }));
    expect(screen.getByRole('region', { name: 'Caderno' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('region', { name: 'Caderno' })).toBeNull();
  });
});
