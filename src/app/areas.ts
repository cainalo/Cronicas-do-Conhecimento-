// Cada área do app tem a sua cor e o seu ícone: o menu acende a aba da área em que a pessoa está
// e o cabeçalho de cada página repete essa cor, para que ela saiba sempre onde se encontra.
import type { IconName } from '@/components/Icon';

export type AreaKey = 'torre' | 'grimorios' | 'explorar' | 'treino' | 'reino' | 'conta';

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

// Reformulação (Fase 1): cinco áreas com nomes objetivos. As chaves internas antigas continuam
// (as páginas as usam), mas o rótulo, o destino e a cor seguem o novo design system.
export const AREAS: Record<AreaKey, Area> = {
  torre: { key: 'torre', label: 'Hoje', to: '/', icon: 'calendario', color: ['#4258cd', '#889eff'], paths: ['/plano'] },
  grimorios: {
    key: 'grimorios',
    label: 'Trilha',
    to: '/trilha',
    icon: 'mapa',
    color: ['#127672', '#5ec8c0'],
    paths: ['/trilha', '/aprender', '/pratica', '/licao', '/missao'],
  },
  explorar: {
    key: 'explorar',
    label: 'Explorar',
    to: '/explorar',
    icon: 'grimorio',
    color: ['#704eb6', '#c4acf5'],
    paths: ['/explorar', '/estudos', '/biblioteca', '/grimorio', '/capitulo', '/edital'],
  },
  treino: {
    key: 'treino',
    label: 'Revisar',
    to: '/revisar',
    icon: 'ampulheta',
    color: ['#a85314', '#f5a868'],
    paths: ['/revisar', '/treino', '/relampago', '/revisao', '/flashcards', '/simulado', '/discursiva', '/historico'],
  },
  reino: {
    key: 'reino',
    label: 'Progresso',
    to: '/progresso',
    icon: 'grafico',
    color: ['#1e704a', '#70ce98'],
    paths: ['/progresso', '/reino', '/diario', '/personagem'],
  },
  conta: { key: 'conta', label: 'Conta', to: '/conta', icon: 'pessoa', color: ['#4a5568', '#a9b0ba'], paths: ['/conta', '/download'] },
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
