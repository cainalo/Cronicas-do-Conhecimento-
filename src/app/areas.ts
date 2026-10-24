// Cada área do app tem a sua cor e o seu ícone: o menu acende a aba da área em que a pessoa está
// e o cabeçalho de cada página repete essa cor, para que ela saiba sempre onde se encontra.
import type { IconName } from '@/components/Icon';

export type AreaKey = 'torre' | 'grimorios' | 'treino' | 'reino' | 'conta';

export interface Area {
  key: AreaKey;
  label: string;
  /** Página central da área (para onde leva a aba e a migalha de pão). */
  to: string;
  icon: IconName;
  /** Cor no tema claro e no escuro. */
  color: [string, string];
  /** Prefixos de endereço que pertencem à área. */
  paths: string[];
}

export const AREAS: Record<AreaKey, Area> = {
  torre: { key: 'torre', label: 'Torre', to: '/', icon: 'torre', color: ['#1f5c45', '#6fae8c'], paths: [] },
  grimorios: {
    key: 'grimorios',
    label: 'Grimórios',
    to: '/biblioteca',
    icon: 'grimorio',
    color: ['#2c5f6e', '#7fb3c2'],
    paths: ['/biblioteca', '/estudos', '/grimorio', '/capitulo', '/pratica', '/licao'],
  },
  treino: {
    key: 'treino',
    label: 'Treino',
    to: '/treino',
    icon: 'ampulheta',
    color: ['#9a5b20', '#e8b13b'],
    paths: ['/treino', '/relampago', '/plano', '/revisao', '/flashcards', '/simulado', '/discursiva', '/historico'],
  },
  reino: {
    key: 'reino',
    label: 'Reino',
    to: '/reino',
    icon: 'mapa',
    color: ['#5b6b2e', '#a5b86a'],
    paths: ['/reino', '/diario', '/personagem', '/progresso', '/edital'],
  },
  conta: { key: 'conta', label: 'Conta', to: '/conta', icon: 'pessoa', color: ['#4a4f57', '#a9b0ba'], paths: ['/conta'] },
};

export function areaOf(pathname: string): AreaKey {
  for (const a of Object.values(AREAS)) {
    if (a.paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return a.key;
  }
  return 'torre';
}

/** Página central de uma área (a aba do menu), em oposição às páginas internas. */
export const isAreaHome = (pathname: string) => Object.values(AREAS).some((a) => a.to === pathname);

export const areaColor = (key: AreaKey, dark: boolean) => AREAS[key].color[dark ? 1 : 0];

/** Fundo suave da cor da área. */
export const tint = (color: string, pct = 15) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;
