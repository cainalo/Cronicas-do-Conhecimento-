// Aula visual narrada (pacote v4, etapa 3): cenas curtas; cada cena tem frases (a narração) e, para
// cada frase, o que a tela mostra. A voz lê uma frase por vez e a cena acompanha. O mesmo conteúdo
// existe por inteiro na aula em texto (`lessonId`); esta é uma alternativa, nunca a única forma.
import type { IllustrationName } from '@/components/Illustration';
import type { MissionActivity } from '@/lib/activities';

export interface NumberLineState {
  /** Pontos marcados na reta. */
  points?: number[];
  /** Saltos desenhados (de, para), na ordem. */
  jumps?: { from: number; to: number }[];
}

export type Visual =
  | { kind: 'title'; title: string; subtitle?: string; art?: IllustrationName }
  | { kind: 'numberline'; from: number; to: number; states: NumberLineState[] }
  | { kind: 'cards'; cards: { title: string; text: string }[] }
  | { kind: 'equation'; lines: string[]; note?: string };

export interface Beat {
  /** Texto falado (e mostrado como legenda). */
  say: string;
  /**
   * Quanto da cena aparece nesta frase: em cartões e contas, quantos itens; na reta, qual estado.
   * Sem valor, usa a posição da frase (1ª frase = 1 item).
   */
  show?: number;
}

export interface Scene {
  id: string;
  /** Título curto no alto da cena. */
  heading: string;
  visual: Visual;
  beats: Beat[];
}

export interface NarratedLesson {
  id: string;
  title: string;
  /** Aula em texto com o mesmo conteúdo. */
  chapterId: string;
  sectionId: string;
  lessonId: string;
  minutes: number;
  scenes: Scene[];
  /** Checagem opcional no fim: só o que as cenas mostraram. */
  check?: MissionActivity;
  review: 'nao-revisado' | 'revisado';
}
