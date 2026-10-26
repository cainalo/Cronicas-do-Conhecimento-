import { describe, expect, it } from 'vitest';
import type { Chapter, Question } from '@/content/types';
import { buildPractice } from '@/lib/practice';

const chapter: Chapter = {
  id: 'cap.teste',
  grimoireId: 'grim.teste',
  number: 1,
  title: 'Fundamentos',
  subtitle: 'Teste de prática',
  topicIds: ['ti.teste'],
  review: 'nao-revisado',
  estimatedMinutes: 10,
  sections: [{ id: 'fundamentos', title: 'Fundamentos', body: '' }],
  glossary: [
    { term: 'Processador', definition: 'Executa instruções e coordena operações do computador' },
    { term: 'Memória RAM', definition: 'Armazena temporariamente dados e programas em uso' },
    { term: 'Sistema operacional', definition: 'Gerencia recursos e oferece serviços aos programas' },
    { term: 'Armazenamento', definition: 'Mantém arquivos mesmo depois que o computador desliga' },
  ],
  references: [],
  lessonIds: [],
};

const question: Question = {
  id: 'q.teste.001',
  contestId: 'concurso.teste',
  topicId: 'ti.teste',
  chapterId: 'cap.teste',
  sectionId: 'fundamentos',
  origin: 'autoral',
  review: 'nao-revisado',
  difficulty: 2,
  stem: 'Qual alternativa está correta?',
  options: [
    { key: 'A', text: 'Distrator sobre memória', comment: 'Não descreve a ideia perguntada.' },
    { key: 'B', text: 'Resposta conceitual correta', comment: 'Esta alternativa preserva o significado correto.' },
    { key: 'C', text: 'Distrator sobre rede', comment: 'Rede não é o conceito perguntado.' },
    { key: 'D', text: 'Distrator sobre monitor', comment: 'Monitor é dispositivo de saída.' },
    { key: 'E', text: 'Distrator sobre arquivo', comment: 'Arquivo não corresponde ao conceito.' },
  ],
  answer: 'B',
  explanation: 'O gabarito deve continuar associado ao texto da alternativa correta.',
};

describe('variação das atividades de prática', () => {
  it('embaralha alternativas e reatribui as letras sem perder a resposta correta', () => {
    const activities = buildPractice(chapter, 'fundamentos', [question], undefined, () => 0, undefined);
    const mcq = activities.find((activity) => activity.kind === 'mcq');
    expect(mcq).toBeDefined();
    if (!mcq || mcq.kind !== 'mcq') throw new Error('Questão de múltipla escolha não foi criada');

    const correct = mcq.question.options.find((option) => option.text === 'Resposta conceitual correta');
    expect(correct).toBeDefined();
    expect(correct?.key).toBe(mcq.question.answer);
    expect(mcq.question.options.map((option) => option.key)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('gera montagem de frase com palavras da definição e palavras extras', () => {
    const activities = buildPractice(chapter, 'fundamentos', [], undefined, () => 0, undefined);
    const build = activities.find((activity) => activity.kind === 'build');
    expect(build).toBeDefined();
    if (!build || build.kind !== 'build') throw new Error('Atividade de montar frase não foi criada');

    expect(build.prompt).toContain('Processador');
    expect(build.answer.join(' ')).toBe(chapter.glossary[0].definition);
    expect(build.words.length).toBeGreaterThan(build.answer.length);
    expect(build.answer.every((word) => build.words.includes(word))).toBe(true);
  });
});
