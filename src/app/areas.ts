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
  torre: { key: 'torre', label: 'Torre', to: '/', icon: 'torre', color: ['#c2571f', '#f08a4b'], paths: [] },
  grimorios: {
    key: 'grimorios',
    label: 'Grimórios',
    to: '/biblioteca',
    icon: 'grimorio',
    color: ['#3b6fb0', '#6aa6e6'],
    paths: ['/biblioteca', '/grimorio', '/capitulo', '/licao'],
  },
  treino: {
    key: 'treino',
    label: 'Treino',
    to: '/treino',
    icon: 'ampulheta',
    color: ['#a8740c', '#e8b13b'],
    paths: ['/treino', '/relampago', '/plano', '/revisao', '/flashcards', '/simulado', '/discursiva', '/historico'],
  },
  reino: {
    key: 'reino',
    label: 'Reino',
    to: '/reino',
    icon: 'mapa',
    color: ['#4a7f46', '#78b873'],
    paths: ['/reino', '/personagem', '/progresso', '/edital'],
  },
  conta: { key: 'conta', label: 'Conta', to: '/conta', icon: 'pessoa', color: ['#5160c4', '#8f9df0'], paths: ['/conta'] },
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
