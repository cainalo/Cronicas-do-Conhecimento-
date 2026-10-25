// Navegação da aula narrada: posição (cena, frase), avanço, voltar, repetir e o que a cena mostra
// em cada frase. Funções puras, sem React.
import type { NarratedLesson, Scene } from '@/content/narrated/types';

export interface NarrationPos {
  scene: number;
  beat: number;
}

/** Próxima frase; undefined quando a aula acabou. */
export function nextBeat(l: NarratedLesson, p: NarrationPos): NarrationPos | undefined {
  if (p.beat + 1 < l.scenes[p.scene].beats.length) return { scene: p.scene, beat: p.beat + 1 };
  if (p.scene + 1 < l.scenes.length) return { scene: p.scene + 1, beat: 0 };
  return undefined;
}

export const nextScene = (l: NarratedLesson, p: NarrationPos): NarrationPos => ({ scene: Math.min(l.scenes.length - 1, p.scene + 1), beat: 0 });
export const prevScene = (_l: NarratedLesson, p: NarrationPos): NarrationPos => ({ scene: Math.max(0, p.beat > 0 ? p.scene : p.scene - 1), beat: 0 });

/** Quanto da cena aparece na frase (itens revelados ou estado da reta). */
export function revealOf(s: Scene, beat: number): number {
  return s.beats[beat]?.show ?? beat + 1;
}

/** Transcrição completa, cena a cena. */
export function transcript(l: NarratedLesson): { heading: string; lines: string[] }[] {
  return l.scenes.map((s) => ({ heading: s.heading, lines: s.beats.map((b) => b.say) }));
}

/** Problemas de conteúdo: cena sem fala, revelação fora do alcance, estado de reta inexistente. */
export function validateNarrated(l: NarratedLesson): string[] {
  const errs: string[] = [];
  for (const s of l.scenes) {
    if (!s.beats.length) errs.push(`${s.id}: sem fala`);
    s.beats.forEach((b, i) => {
      const r = revealOf(s, i);
      if (!b.say.trim()) errs.push(`${s.id}/${i}: fala vazia`);
      if (s.visual.kind === 'numberline' && !s.visual.states[r]) errs.push(`${s.id}/${i}: estado ${r} da reta não existe`);
      if (s.visual.kind === 'cards' && r > s.visual.cards.length) errs.push(`${s.id}/${i}: mostra ${r} cartões, há ${s.visual.cards.length}`);
      if (s.visual.kind === 'timeline' && r > s.visual.items.length) errs.push(`${s.id}/${i}: mostra ${r} marcos, há ${s.visual.items.length}`);
      if (s.visual.kind === 'equation' && r > s.visual.lines.length) errs.push(`${s.id}/${i}: mostra ${r} linhas, há ${s.visual.lines.length}`);
    });
    if (s.visual.kind === 'numberline')
      for (const st of s.visual.states)
        for (const n of [...(st.points ?? []), ...(st.jumps ?? []).flatMap((j) => [j.from, j.to])])
          if (n < s.visual.from || n > s.visual.to) errs.push(`${s.id}: ${n} fora da reta`);
  }
  return errs;
}
