// Explicações "do zero" de cada trecho: a porta de entrada antes do texto completo.
import type { SimpleSection } from '@/content/types';
import { simpleTiGestao } from './ti-gestao';
import { simpleSegurancaIa } from './seguranca-ia';
import { simpleGerais } from './gerais';
import { simpleDevInfra } from './dev-infra';
import { simplePrimeiros } from '../../grimoires/primeiros/simple';

const all: Record<string, SimpleSection> = { ...simplePrimeiros, ...simpleTiGestao, ...simpleSegurancaIa, ...simpleGerais, ...simpleDevInfra };

export function getSimpleSection(chapterId: string, sectionId: string): SimpleSection | undefined {
  return all[`${chapterId}:${sectionId}`];
}
export const allSimpleSections = all;
