import { describe, expect, it } from 'vitest';
import {
  narradaHistoriaComputador,
  narradaQuatroTarefas,
} from '@/content/narrated/prim-computador';
import { narradaSomarInteiros } from '@/content/narrated/mat-somar-inteiros';
import { narrationPositions, validateNarrated } from '@/lib/narration';

const lessons = [
  narradaHistoriaComputador,
  narradaQuatroTarefas,
  narradaSomarInteiros,
];

function spokenText(lesson: (typeof lessons)[number]): string {
  return lesson.scenes.flatMap((scene) => scene.beats.map((beat) => beat.say)).join(' ');
}

describe('qualidade estrutural das aulas narradas autorais', () => {
  it.each(lessons)('aula $title tem cenas, falas e revelações visuais válidas', (lesson) => {
    expect(lesson.scenes.length).toBeGreaterThan(0);
    expect(narrationPositions(lesson)).toHaveLength(
      lesson.scenes.reduce((sum, scene) => sum + scene.beats.length, 0),
    );
    expect(validateNarrated(lesson), validateNarrated(lesson).join('\n')).toEqual([]);
    for (const scene of lesson.scenes) {
      expect(scene.beats.length, scene.id).toBeGreaterThan(0);
      for (const beat of scene.beats) expect(beat.say.trim(), scene.id).not.toBe('');
    }
  });

  it('a aula histórica explica personagens, máquinas e consequências, não só datas', () => {
    const text = spokenText(narradaHistoriaComputador).toLocaleLowerCase('pt-BR');
    for (const concept of [
      'blaise pascal',
      'joseph-marie jacquard',
      'charles babbage',
      'ada lovelace',
      'números de bernoulli',
      'herman hollerith',
      'ibm',
      'eniac',
      'jean jennings bartik',
      'transistor',
      'circuitos integrados',
      'intel',
      'busicom',
      'apple ii',
      'ibm pc',
    ]) {
      expect(text, 'faltou contextualizar: ' + concept).toContain(concept);
    }
  });

  it('a aula de inteiros percorre os conceitos e exemplos essenciais', () => {
    const text = spokenText(narradaSomarInteiros).toLocaleLowerCase('pt-BR');
    for (const concept of [
      'reta numérica',
      'para a direita',
      'para a esquerda',
      'módulo',
      'sinais diferentes',
      'sinais iguais',
      'somar o seu oposto',
      'menos nove mais quatro',
      'menos seis mais seis',
      'seis menos menos dois',
    ]) {
      expect(text, 'faltou explicar: ' + concept).toContain(concept);
    }
  });

  it('as duas aulas reescritas têm duração estimada coerente com a ampliação do roteiro', () => {
    expect(narradaHistoriaComputador.minutes).toBeGreaterThanOrEqual(7);
    expect(narradaSomarInteiros.minutes).toBeGreaterThanOrEqual(7);
    expect(narradaHistoriaComputador.scenes.flatMap((scene) => scene.beats).length).toBeGreaterThanOrEqual(20);
    expect(narradaSomarInteiros.scenes.flatMap((scene) => scene.beats).length).toBeGreaterThanOrEqual(20);
  });
});
