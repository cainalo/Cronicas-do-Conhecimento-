import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { loadPrefs } from '@/lib/storage';
import { DEFAULT_LOOK, PALETTES, applyLook, contrast, contrastWarnings, exportLook, importLook, migrateLook, normalizeLook, resolveColors } from '@/lib/theme';

vi.mock('@/lib/supabase', () => ({ supabase: null }));

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('style');
});

describe('motor de aparência', () => {
  it('usa por padrão a identidade Pórtico aprovada: papel, terracota, azul-petróleo e Fraunces/Inter Tight', () => {
    expect(DEFAULT_LOOK).toMatchObject({ palette: 'editorial', bg: 'papel', font: 'editorial' });
    const c = resolveColors(DEFAULT_LOOK, 'light');
    expect(c.bg).toBe('#f7efdf');
    expect(c.ink).toBe('#0f4c5c');
    expect(c.primary).toBe('#c8402a');
    expect(c.teal).toBe('#0f4c5c');
    expect(normalizeLook({ palette: 'editorial', bg: 'papel', font: 'editorial' }))
      .toMatchObject({ palette: 'editorial', bg: 'papel', font: 'editorial' });
    expect(migrateLook({ v: 3, palette: 'aurora', bg: 'liso', font: 'plex' }))
      .toMatchObject({ palette: 'editorial', bg: 'papel', font: 'editorial' });
  });

  it('todas as paletas passam no contraste de texto, no claro e no escuro', () => {
    for (const p of PALETTES) {
      for (const theme of ['light', 'dark'] as const) {
        const c = resolveColors({ ...DEFAULT_LOOK, palette: p.id }, theme);
        expect(contrast(c.ink, c.bg), `${p.id} ${theme} texto/fundo`).toBeGreaterThanOrEqual(4.5);
        expect(contrast(c.ink, c.surface), `${p.id} ${theme} texto/cartão`).toBeGreaterThanOrEqual(4.5);
        expect(contrastWarnings(c, theme).filter((w) => w.startsWith('O texto')), `${p.id} ${theme}`).toEqual([]);
      }
    }
  });

  it('cor trocada à mão vale só para o tema em que foi trocada e avisa contraste ruim', () => {
    const look = { ...DEFAULT_LOOK, colors: { light: { bg: '#111111' }, dark: {} } };
    expect(resolveColors(look, 'light').bg).toBe('#111111');
    expect(resolveColors(look, 'dark').bg).not.toBe('#111111');
    expect(contrastWarnings(resolveColors(look, 'light'), 'light').length).toBeGreaterThan(0);
  });

  it('aplica variáveis e estilos no documento', () => {
    applyLook({ ...DEFAULT_LOOK, palette: 'floresta', cards: 'vidro', radius: 26 }, 'light');
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--gold')).toMatch(/^\d+ \d+ \d+$/);
    expect(root.style.getPropertyValue('--area-trilha')).toMatch(/^\d+ \d+ \d+$/);
    expect(root.style.getPropertyValue('--radius-card')).toBe('26px');
    expect(root.dataset.cards).toBe('vidro');
  });

  it('exporta e importa a aparência; código inválido é recusado; campos novos ganham padrão', () => {
    const l = { ...DEFAULT_LOOK, palette: 'doce', font: 'mono' as const };
    expect(importLook(exportLook(l))).toEqual(l);
    expect(importLook('nada')).toBeNull();
    expect(normalizeLook({ palette: 'oceano' }).cards).toBe(DEFAULT_LOOK.cards);
  });
});

describe('painel de personalização', () => {
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

  it('mostra os novos cartões da página inicial com cores chapadas editoriais', () => {
    renderAt('/');
    expect(screen.getByTestId('dashboard-continuar').style.background).toBe('rgb(var(--area-hoje))');
    expect(screen.getByTestId('dashboard-stat-questions').style.background).toBe('rgb(var(--area-hoje))');
    expect(screen.getByTestId('dashboard-stat-review').style.background).toBe('rgb(var(--area-trilha))');
    expect(screen.getByTestId('dashboard-plano').style.background).toBe('rgb(var(--area-trilha))');
    expect(screen.getByTestId('dashboard-progress').style.background).toBe('rgb(var(--area-explorar))');
  });

  it('troca paleta, cor, estilo e restaura o padrão, salvando no aparelho', async () => {
    const user = userEvent.setup();
    renderAt('/personalizar');
    expect(screen.getByRole('heading', { name: 'Personalizar aparência' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Pôr do sol/ }));
    expect(loadPrefs().look?.palette).toBe('por-do-sol');
    fireEvent.change(screen.getByLabelText(COLOR_PRIMARY), { target: { value: '#123456' } });
    expect(loadPrefs().look?.colors.light.primary).toBe('#123456');
    expect(document.documentElement.style.getPropertyValue('--gold')).toBe('18 52 86');
    await user.click(screen.getByRole('button', { name: /Voltar Cor principal/ }));
    expect(loadPrefs().look?.colors.light.primary).toBeUndefined();
    await user.click(screen.getByRole('button', { name: 'Vidro' }));
    expect(document.documentElement.dataset.cards).toBe('vidro');
    await user.click(screen.getByRole('button', { name: 'Restaurar a aparência padrão' }));
    expect(loadPrefs().look?.palette).toBe(DEFAULT_LOOK.palette);
    expect(document.documentElement.dataset.cards).toBe('editorial');
  });
});

const COLOR_PRIMARY = 'Cor principal (destaques, links, foco)';
