// Personalização da aparência (pedido do usuário, 25/10/2026): paletas prontas e cada cor e estilo
// ajustável. Toda a interface lê variáveis CSS (tokens); aqui elas são calculadas e aplicadas no
// <html>. Uma paleta define só algumas cores-base; os tons de fundo, cartão, linha e texto, para o
// claro e o escuro, saem delas. Qualquer cor pode ser trocada à mão por cima da paleta.
// Funções puras (exceto applyLook, que escreve no documento).

export type ColorKey =
  | 'primary'
  | 'primaryDeep'
  | 'secondary'
  | 'teal'
  | 'pink'
  | 'accent'
  | 'sun'
  | 'ok'
  | 'bad'
  | 'bg'
  | 'surface'
  | 'raised'
  | 'line'
  | 'ink'
  | 'muted'
  | 'areaHoje'
  | 'areaTrilha'
  | 'areaExplorar'
  | 'areaRevisar'
  | 'areaProgresso'
  | 'areaConta';

/** Variável CSS de cada cor (os nomes antigos continuam por compatibilidade). */
export const COLOR_VAR: Record<ColorKey, string> = {
  primary: '--gold',
  primaryDeep: '--ember',
  secondary: '--azure',
  teal: '--teal',
  pink: '--pink',
  accent: '--leaf',
  sun: '--sun',
  ok: '--ok',
  bad: '--bad',
  bg: '--bg',
  surface: '--surface',
  raised: '--raised',
  line: '--line',
  ink: '--ink',
  muted: '--muted',
  areaHoje: '--area-hoje',
  areaTrilha: '--area-trilha',
  areaExplorar: '--area-explorar',
  areaRevisar: '--area-revisar',
  areaProgresso: '--area-progresso',
  areaConta: '--area-conta',
};

export const COLOR_LABEL: Record<ColorKey, string> = {
  primary: 'Cor principal (destaques, links, foco)',
  primaryDeep: 'Principal escura (destaques de texto)',
  secondary: 'Secundária (conceitos)',
  teal: 'Petróleo (termos do glossário)',
  pink: 'Framboesa (detalhes)',
  accent: 'Ocre (atenção, exemplos)',
  sun: 'Mostarda (marca-texto)',
  ok: 'Acerto',
  bad: 'Erro',
  bg: 'Fundo da página',
  surface: 'Fundo dos cartões',
  raised: 'Fundo de áreas elevadas',
  line: 'Bordas e linhas',
  ink: 'Texto',
  muted: 'Texto secundário',
  areaHoje: 'Área Hoje',
  areaTrilha: 'Área Trilha',
  areaExplorar: 'Área Explorar',
  areaRevisar: 'Área Revisar',
  areaProgresso: 'Área Progresso',
  areaConta: 'Área Conta',
};

export const COLOR_GROUPS: { title: string; keys: ColorKey[] }[] = [
  { title: 'Cores de destaque', keys: ['primary', 'primaryDeep', 'secondary', 'teal', 'pink', 'accent', 'sun'] },
  { title: 'Acerto e erro', keys: ['ok', 'bad'] },
  { title: 'Fundo e texto', keys: ['bg', 'surface', 'raised', 'line', 'ink', 'muted'] },
  { title: 'Cores das áreas (abas e cartões)', keys: ['areaHoje', 'areaTrilha', 'areaExplorar', 'areaRevisar', 'areaProgresso', 'areaConta'] },
];

type Neutral = 'bg' | 'surface' | 'raised' | 'line' | 'ink' | 'muted';
type AreaKey = 'areaHoje' | 'areaTrilha' | 'areaExplorar' | 'areaRevisar' | 'areaProgresso' | 'areaConta';

export interface PaletteSeed {
  id: string;
  name: string;
  /** Matiz (0–360) dos fundos e textos neutros, quando a paleta não define os seus. */
  hue: number;
  primary: string;
  secondary: string;
  teal: string;
  pink: string;
  accent: string;
  sun: string;
  ok: string;
  bad: string;
  /** Neutros próprios, em vez dos calculados pela matiz. */
  neutrals?: { light: Record<Neutral, string>; dark: Record<Neutral, string> };
  /** Cores das áreas, quando diferem das cores de destaque. */
  areas?: Record<AreaKey, string>;
}

const NEUTROS = {
  light: { bg: '#f6f8fc', surface: '#ffffff', raised: '#edf1f7', line: '#dce3ec', ink: '#172033', muted: '#59677b' },
  dark: { bg: '#101722', surface: '#192333', raised: '#243246', line: '#34445c', ink: '#eaf0f7', muted: '#a5b4c6' },
};

export const PALETTES: PaletteSeed[] = [
  {
    id: 'editorial',
    name: 'Essencial',
    hue: 220,
    primary: '#4f46e5',
    secondary: '#7c3aed',
    teal: '#0d9488',
    pink: '#db2777',
    accent: '#ea580c',
    sun: '#facc15',
    ok: '#15803d',
    bad: '#b91c1c',
    neutrals: NEUTROS,
    areas: { areaHoje: '#4f46e5', areaTrilha: '#0d9488', areaExplorar: '#7c3aed', areaRevisar: '#ea580c', areaProgresso: '#15803d', areaConta: '#334155' },
  },
  {
    id: 'jornal',
    name: 'Contraste',
    hue: 40,
    primary: '#1b1a17',
    secondary: '#3a3631',
    teal: '#1b1a17',
    pink: '#c8402a',
    accent: '#c8402a',
    sun: '#c4921e',
    ok: '#2f5f2f',
    bad: '#b02822',
    neutrals: { light: { ...NEUTROS.light, bg: '#ffffff', surface: '#ffffff' }, dark: NEUTROS.dark },
    areas: { areaHoje: '#c8402a', areaTrilha: '#1b1a17', areaExplorar: '#3a3631', areaRevisar: '#1b1a17', areaProgresso: '#3a3631', areaConta: '#5f5a50' },
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    hue: 45,
    primary: '#d33a1f',
    secondary: '#1d3f8f',
    teal: '#1d3f8f',
    pink: '#d33a1f',
    accent: '#a87400',
    sun: '#e3b11a',
    ok: '#2f6b3a',
    bad: '#b3261e',
    neutrals: { light: { ...NEUTROS.light, bg: '#f1f5fb' }, dark: NEUTROS.dark },
    areas: { areaHoje: '#d33a1f', areaTrilha: '#1d3f8f', areaExplorar: '#1b1a17', areaRevisar: '#a87400', areaProgresso: '#2f6b3a', areaConta: '#3a3631' },
  },
  { id: 'aurora', name: 'Aurora', hue: 230, primary: '#4258cd', secondary: '#704eb6', teal: '#127672', pink: '#c2357a', accent: '#c4621a', sun: '#d99a10', ok: '#1e704a', bad: '#ac3544' },
  { id: 'oceano', name: 'Oceano', hue: 200, primary: '#0b6fb3', secondary: '#0f8a9c', teal: '#0d7a6a', pink: '#3d5bd9', accent: '#d9652b', sun: '#e0b020', ok: '#17785a', bad: '#b8323f' },
  { id: 'por-do-sol', name: 'Pôr do sol', hue: 20, primary: '#c2410c', secondary: '#be185d', teal: '#0f766e', pink: '#db2777', accent: '#b45309', sun: '#eab308', ok: '#15803d', bad: '#b91c1c' },
  { id: 'floresta', name: 'Floresta', hue: 140, primary: '#2f7d32', secondary: '#55782a', teal: '#0f766e', pink: '#9c4a7a', accent: '#b0641a', sun: '#c99a1a', ok: '#1b6e3c', bad: '#a73a2c' },
  { id: 'doce', name: 'Doce', hue: 320, primary: '#c026d3', secondary: '#7c3aed', teal: '#0e7490', pink: '#db2777', accent: '#ea580c', sun: '#ca8a04', ok: '#15803d', bad: '#be123c' },
  { id: 'lavanda', name: 'Lavanda', hue: 265, primary: '#6d4ad6', secondary: '#8b5cf6', teal: '#0f766e', pink: '#c0457f', accent: '#c2410c', sun: '#b7950b', ok: '#1f7a4d', bad: '#b4253e' },
  { id: 'grafite', name: 'Grafite', hue: 215, primary: '#334155', secondary: '#475569', teal: '#0f766e', pink: '#9f1239', accent: '#b45309', sun: '#a16207', ok: '#166534', bad: '#991b1b' },
  { id: 'arco-iris', name: 'Arco-íris', hue: 45, primary: '#2563eb', secondary: '#9333ea', teal: '#059669', pink: '#e11d48', accent: '#ea580c', sun: '#eab308', ok: '#16a34a', bad: '#dc2626' },
];

export type BgStyle = 'liso' | 'degrade' | 'pontos' | 'listras';
export type CardStyle = 'editorial' | 'solido' | 'contorno' | 'vidro';
export type TileStyle = 'solido' | 'contorno' | 'claro' | 'degrade';
export type ButtonShape = 'suave' | 'reto' | 'arredondado' | 'pilula';
export type Motion = 'completo' | 'reduzido' | 'nenhum';
export type Density = 'compacto' | 'normal' | 'amplo';
export type FontFamily = 'plex' | 'sistema' | 'arredondada' | 'mono';
export type Shadow = 'nenhuma' | 'suave' | 'forte';

export interface Look {
  /** Versão da identidade (2 = editorial). Aparências salvas antes dela são guardadas em `previous`. */
  v?: number;
  palette: string;
  /** Cores trocadas à mão, por tema (hex). */
  colors: { light: Partial<Record<ColorKey, string>>; dark: Partial<Record<ColorKey, string>> };
  bg: BgStyle;
  cards: CardStyle;
  tiles: TileStyle;
  buttons: ButtonShape;
  motion: Motion;
  density: Density;
  font: FontFamily;
  shadow: Shadow;
  /** Arredondamento dos cartões, em px. */
  radius: number;
  /** Altura de linha do texto. */
  leading: number;
}

export const LOOK_VERSION = 3;

export const DEFAULT_LOOK: Look = {
  v: LOOK_VERSION,
  palette: 'editorial',
  colors: { light: {}, dark: {} },
  bg: 'liso',
  cards: 'editorial',
  tiles: 'solido',
  buttons: 'suave',
  motion: 'completo',
  density: 'normal',
  font: 'plex',
  shadow: 'nenhuma',
  radius: 10,
  leading: 1.65,
};

// Valores de estilo que deixaram de existir viram o equivalente atual.
const RENAMED: Partial<Record<keyof Look, Record<string, string>>> = {
  bg: { manchas: 'liso', papel: 'liso' },
  font: { editorial: 'plex', serifada: 'plex' },
  cards: { tingido: 'editorial' },
};

/** Junta o que foi salvo com o padrão (campos novos ganham valor padrão; nada quebra). */
export function normalizeLook(l?: Partial<Look> | null): Look {
  const { previous: _legacyPrevious, ...saved } = (l ?? {}) as Partial<Look> & { previous?: unknown };
  void _legacyPrevious;
  const base = { ...DEFAULT_LOOK, ...saved } as Look;
  for (const [k, map] of Object.entries(RENAMED) as [keyof Look, Record<string, string>][]) {
    const v = base[k] as unknown as string;
    if (map[v]) (base as unknown as Record<string, unknown>)[k] = map[v];
  }
  return { ...base, colors: { light: { ...(l?.colors?.light ?? {}) }, dark: { ...(l?.colors?.dark ?? {}) } } };
}

/**
 * Migra preferências anteriores para os estilos atuais. Cores escolhidas e tamanho de texto são
 * preservados; fundo de papel e fontes serifadas convergem para as opções modernas equivalentes.
 */
export function migrateLook(l?: Partial<Look> | null): Look {
  if (!l) return normalizeLook(DEFAULT_LOOK);
  return normalizeLook({ ...l, v: LOOK_VERSION });
}

// ---------- cores ----------

export function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}
export const rgbToHex = ([r, g, b]: [number, number, number]) => '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');

export function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) => lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex([f(0) * 255, f(8) * 255, f(4) * 255]);
}

/** Mistura duas cores (t = peso da segunda). */
export function mix(a: string, b: string, t: number): string {
  const x = hexToRgb(a)!;
  const y = hexToRgb(b)!;
  return rgbToHex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as [number, number, number]);
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex) ?? [0, 0, 0];
  const c = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/** Razão de contraste WCAG entre duas cores (1 a 21). */
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** Todas as cores de uma paleta num tema, já com as trocas à mão aplicadas. */
export function resolveColors(look: Look, theme: 'light' | 'dark'): Record<ColorKey, string> {
  const p = PALETTES.find((x) => x.id === look.palette) ?? PALETTES[0];
  const dark = theme === 'dark';
  // No escuro, as cores de destaque clareiam para manter contraste sobre o fundo escuro.
  const lift = (c: string) => (dark ? mix(c, '#ffffff', 0.38) : c);
  const base: Record<ColorKey, string> = {
    primary: lift(p.primary),
    primaryDeep: dark ? mix(p.primary, '#ffffff', 0.45) : mix(p.primary, '#000000', 0.12),
    secondary: lift(p.secondary),
    teal: lift(p.teal),
    pink: lift(p.pink),
    accent: lift(p.accent),
    sun: lift(p.sun),
    ok: lift(p.ok),
    bad: lift(p.bad),
    bg: dark ? hslToHex(p.hue, 40, 9) : hslToHex(p.hue, 70, 95),
    surface: dark ? hslToHex(p.hue, 34, 15) : hslToHex(p.hue, 60, 99.5),
    raised: dark ? hslToHex(p.hue, 30, 21) : hslToHex(p.hue, 55, 92),
    line: dark ? hslToHex(p.hue, 24, 29) : hslToHex(p.hue, 35, 85),
    ink: dark ? hslToHex(p.hue, 35, 93) : hslToHex(p.hue, 35, 15),
    muted: dark ? hslToHex(p.hue, 15, 72) : hslToHex(p.hue, 15, 36),
    areaHoje: lift(p.primary),
    areaTrilha: lift(p.teal),
    areaExplorar: lift(p.secondary),
    areaRevisar: lift(p.accent),
    areaProgresso: lift(p.ok),
    areaConta: dark ? hslToHex(p.hue, 12, 68) : hslToHex(p.hue, 14, 38),
  };
  if (p.neutrals) Object.assign(base, dark ? p.neutrals.dark : p.neutrals.light);
  if (p.areas) for (const [k, v] of Object.entries(p.areas) as [AreaKey, string][]) base[k] = lift(v);
  return { ...base, ...(dark ? look.colors.dark : look.colors.light) };
}

/** Avisos de contraste (texto sobre fundo, texto branco sobre cores de cartão e botão). */
export function contrastWarnings(c: Record<ColorKey, string>, theme: 'light' | 'dark'): string[] {
  const out: string[] = [];
  if (contrast(c.ink, c.bg) < 4.5) out.push('O texto está com pouco contraste sobre o fundo da página.');
  if (contrast(c.ink, c.surface) < 4.5) out.push('O texto está com pouco contraste sobre os cartões.');
  if (contrast(c.muted, c.surface) < 3) out.push('O texto secundário está difícil de ler sobre os cartões.');
  if (theme === 'light') {
    for (const k of ['primary', 'areaHoje', 'areaTrilha', 'areaExplorar', 'areaRevisar', 'areaProgresso'] as ColorKey[]) {
      if (contrast('#ffffff', c[k]) < 3) out.push(`Texto branco fica difícil de ler sobre "${COLOR_LABEL[k]}".`);
    }
  }
  return out;
}

const triplet = (hex: string) => (hexToRgb(hex) ?? [0, 0, 0]).join(' ');

/** Escreve as cores e estilos no <html>. */
export function applyLook(look: Look, theme: 'light' | 'dark', root: HTMLElement = document.documentElement) {
  const c = resolveColors(look, theme);
  for (const k of Object.keys(COLOR_VAR) as ColorKey[]) root.style.setProperty(COLOR_VAR[k], triplet(c[k]));
  root.style.setProperty('--radius-card', `${look.radius}px`);
  root.style.setProperty('--leading', String(look.leading));
  const ds = root.dataset;
  ds.bg = look.bg;
  ds.cards = look.cards;
  ds.tiles = look.tiles;
  ds.buttons = look.buttons;
  ds.motion = look.motion;
  ds.density = look.density;
  ds.font = look.font;
  ds.shadow = look.shadow;
}

/** Texto da paleta para copiar e colar (exportar/importar a aparência). */
export const exportLook = (look: Look) => JSON.stringify(look);
export function importLook(text: string): Look | null {
  try {
    const l = JSON.parse(text);
    if (!l || typeof l !== 'object' || typeof l.palette !== 'string') return null;
    return normalizeLook(l);
  } catch {
    return null;
  }
}
