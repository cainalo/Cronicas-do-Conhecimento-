import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { saveData } from '@/lib/storage';
import { emptyData } from '@/lib/model';
vi.mock('@/lib/supabase', () => ({ supabase: null }));
import { getScenario } from '@/content';
import { escritorio } from '@/content/world/escritorio';
import { advance, choose, startScenario } from '@/lib/scenario';
import { adjacentInteractable, currentObjective, examine, facingOf, findPath, pathNextTo, restoreWorld, roomAt, talk, validateWorld, walkable, type WorldState } from '@/lib/world';

const s = getScenario(escritorio.scenarioId)!;
const start = (): WorldState => ({ worldId: escritorio.id, version: escritorio.version, pos: escritorio.start, facing: 'direita', examined: [], scenario: startScenario(s, 't0'), updatedAt: 't0' });

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
    // A hipótese só abre depois de examinar o terminal.
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
  const renderWorld = () =>
    render(
      <PrefsProvider>
        <StudyProvider>
          <MemoryRouter initialEntries={['/escritorio']}>
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

  it('mapa por cima de tudo; ir até um objeto mostra a descrição; ir até a Marta abre a conversa', async () => {
    const user = userEvent.setup();
    renderWorld();
    expect(screen.getByTestId('mundo')).toBeInTheDocument();
    expect(screen.getByTestId('mundo-objetivo')).toHaveTextContent(/Marta/);
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /Quadro de chamados do Suporte/ }));
    expect(await screen.findByTestId('mundo-objeto')).toHaveTextContent(/2318/);
    expect(screen.getByTestId('mundo-sala')).toHaveTextContent('Suporte');
    await user.click(screen.getByRole('button', { name: 'Fechar o painel' }));
    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /Marta, Suporte/ }));
    expect(await screen.findByTestId('mundo-conversa')).toHaveTextContent(/primeiro chamado/);
  });

  it('abre o terminal interativo do mesmo chamado e depois retoma o mapa do escritório', async () => {
    const user = userEvent.setup();
    renderWorld();

    await user.click(screen.getByRole('button', { name: 'Ir até' }));
    await user.click(screen.getByRole('button', { name: /Terminal na mesa da Marta/ }));
    const terminalPanel = await screen.findByTestId('mundo-objeto');
    expect(terminalPanel).toHaveTextContent('Saída do top');
    const launch = within(terminalPanel).getByRole('link', { name: /Abrir terminal do chamado 2318/ });
    expect(launch).toHaveAttribute('href', '/laboratorio-codigo?origem=escritorio&chamado=2318');

    await user.click(launch);
    expect(await screen.findByRole('heading', { name: 'Laboratório de programação' })).toBeInTheDocument();
    expect(screen.getByText(/Aberto pelo terminal da Marta no mapa/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Voltar ao escritório 2D' }));
    expect(await screen.findByTestId('mundo')).toBeInTheDocument();
    expect(screen.getByTestId('mundo-sala')).toHaveTextContent('Recepção');
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
