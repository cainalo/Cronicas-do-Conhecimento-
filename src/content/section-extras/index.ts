// Questões complementares por seção. Mantém apenas verificações de conteúdo, sem diálogos ou personagens.
import type { SectionExtras } from '@/content/types';
import { extrasTiGestao } from './ti-gestao';
import { extrasSegurancaIa } from './seguranca-ia';
import { extrasDevInfra } from './dev-infra';
import { extrasGerais } from './gerais';
import { extrasPrimeiros } from './primeiros';

const all: Record<string, SectionExtras> = {
  ...extrasPrimeiros,
  ...extrasTiGestao,
  ...extrasSegurancaIa,
  ...extrasDevInfra,
  ...extrasGerais,
};

export function getSectionExtras(chapterId: string, sectionId: string): SectionExtras | undefined {
  return all[`${chapterId}:${sectionId}`];
}

export const allSectionExtras = all;
