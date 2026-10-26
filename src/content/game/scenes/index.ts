// Cenas e atividades extras por seção (ver SectionExtras em content/types.ts).
import type { SectionExtras } from '@/content/types';

import { scenesTiGestao } from './ti-gestao';
import { scenesSegurancaIa } from './seguranca-ia';
import { scenesDevInfra } from './dev-infra';
import { scenesGerais } from './gerais';
import { scenesPrimeiros } from '../../grimoires/primeiros/extras';

const all: Record<string, SectionExtras> = { ...scenesPrimeiros, ...scenesTiGestao, ...scenesSegurancaIa, ...scenesDevInfra, ...scenesGerais };

export function getSectionExtras(chapterId: string, sectionId: string): SectionExtras | undefined {
  return all[`${chapterId}:${sectionId}`];
}

export const allSectionExtras = all;
