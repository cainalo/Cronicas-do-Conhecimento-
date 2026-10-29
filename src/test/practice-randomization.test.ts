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
    expect(mcq.question.answer).toBe('A');
    expect(mcq.question.options[0].text).toBe('Resposta conceitual correta');
    expect(mcq.question.options.map((option) => option.key)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('gera duas lacunas distintas e oferece cada resposta correta no banco de opções', () => {
    const activities = buildPractice(chapter, 'fundamentos', [], undefined, () => 0, undefined);
    const exercise = activities.find((activity) => activity.kind === 'multiBlank');
    expect(exercise).toBeDefined();
    if (!exercise || exercise.kind !== 'multiBlank') throw new Error('Exercício de lacunas múltiplas não foi criado');

    expect(exercise.answers).toHaveLength(2);
    expect(exercise.sentence.split('___')).toHaveLength(3);
    expect(exercise.answers[0]).not.toBe(exercise.answers[1]);
    expect(exercise.answers.every((answer) => exercise.options.includes(answer))).toBe(true);
    expect(exercise.options.length).toBeGreaterThan(exercise.answers.length);
  });

  it('gera montagem de frase com palavras da definição e palavras extras', () => {
    const activities = buildPractice(chapter, 'fundamentos', [], undefined, () => 0.9999999, undefined);
    const build = activities.find((activity) => activity.kind === 'build');
    expect(build).toBeDefined();
    if (!build || build.kind !== 'build') throw new Error('Atividade de montar frase não foi criada');

    expect(build.prompt).toContain('Processador');
    expect(build.answer.join(' ')).toBe(chapter.glossary[0].definition);
    expect(build.words.length).toBeGreaterThan(build.answer.length);
    expect(build.answer.every((word) => build.words.includes(word))).toBe(true);
  });
  it('amplia o banco com questões de treino do glossário, claramente não revisadas', () => {
    const activities = buildPractice(chapter, 'fundamentos', [], undefined, () => 0.4);
    const mcqs = activities.filter((activity) => activity.kind === 'mcq');
    expect(mcqs).toHaveLength(3);
    expect(mcqs.every((activity) => activity.kind === 'mcq' && activity.question.origin === 'gerada-nao-revisada')).toBe(true);
    for (const activity of mcqs) {
      if (activity.kind !== 'mcq') continue;
      expect(activity.question.review).toBe('nao-revisado');
      const answer = activity.question.options.find((option) => option.key === activity.question.answer);
      expect(answer?.text).toBeTruthy();
      expect(activity.question.explanation).toContain(answer?.text ?? 'conceito-inexistente');
    }
  });

  it('prioriza questões não usadas na visita anterior sem aumentar a rodada', () => {
    const bank = [
      question,
      { ...question, id: 'q.teste.002', stem: 'Qual conceito gerencia memória?' },
      { ...question, id: 'q.teste.003', stem: 'Qual conceito mantém dados persistentes?' },
      { ...question, id: 'q.teste.004', stem: 'Qual conceito coordena processos?' },
    ];
    const activities = buildPractice(chapter, 'fundamentos', bank, undefined, () => 0.4, undefined, chapter.glossary, ['q.teste.001']);
    const ids = activities.filter((activity) => activity.kind === 'mcq').map((activity) => activity.kind === 'mcq' ? activity.question.id : '');
    expect(ids).toHaveLength(3);
    expect(ids).not.toContain('q.teste.001');
    expect(new Set(ids).size).toBe(3);
  });

});
