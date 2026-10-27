import { describe, expect, it } from 'vitest';
import { getChapter, getQuestion, microSeries } from '@/content';
import { diversityProblems } from '@/lib/activities';

const sections = ['estrategias', 'coesao', 'gramatica'] as const;
const expectedQuestions: Record<(typeof sections)[number], string[]> = {
  estrategias: ['q.ingles.01.001', 'q.ingles.01.002', 'q.ingles.01.003', 'q.ingles.01.004'],
  coesao: ['q.ingles.01.005', 'q.ingles.01.006', 'q.ingles.01.007', 'q.ingles.01.008'],
  gramatica: ['q.ingles.01.009', 'q.ingles.01.010', 'q.ingles.01.011'],
};

describe('microaulas graduais de Estratégias de Leitura em Inglês', () => {
  it('cobre as três seções na sequência de 4, 4 e 3 aulas', () => {
    for (const section of sections) {
      const lessons = microSeries('cap.ingles.01', section);
      expect(lessons.map((lesson) => {
        const exam = lesson.exam[0];
        return exam?.kind === 'exam' ? exam.questionId : '';
      }), section).toEqual(expectedQuestions[section]);
      expect(lessons.map((lesson) => lesson.series?.order), section)
        .toEqual(Array.from({ length: expectedQuestions[section].length }, (_, i) => i + 1));
      expect(lessons[0].steps[0].part, section).toBe('A história');
    }
  });

  it('liga cada aula a uma seção existente, com explicação, checagem e recuperação', () => {
    const chapter = getChapter('cap.ingles.01');
    expect(chapter).toBeTruthy();

    for (const section of sections) {
      expect(chapter?.sections.some((part) => part.id === section), section).toBe(true);
      for (const lesson of microSeries('cap.ingles.01', section)) {
        expect(lesson.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
        expect(lesson.opening.prompt.length, lesson.id).toBeGreaterThan(20);
        for (const step of lesson.steps) {
          expect(step.goal.length, lesson.id + ':' + step.id).toBeGreaterThan(10);
          expect(step.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(120);
          expect(step.check.prompt.length, lesson.id + ':' + step.id).toBeGreaterThan(10);
          expect(step.recovery.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(60);
          expect(step.recovery.check.id, lesson.id + ':' + step.id).not.toBe(step.check.id);
        }
      }
    }
  });

  it('registra fatos históricos e fontes nos três textos completos', () => {
    const chapter = getChapter('cap.ingles.01');
    expect(chapter).toBeTruthy();

    for (const section of sections) {
      const body = chapter?.sections.find((part) => part.id === section)?.body ?? '';
      expect(body, section).toContain('Contexto histórico');
      expect(body, section).toMatch(/https?:\/\//);
      expect(body.length, section).toBeGreaterThan(800);
    }
  });

  it('usa três famílias de atividade na consolidação de cada aula', () => {
    for (const section of sections) {
      for (const lesson of microSeries('cap.ingles.01', section)) {
        expect(diversityProblems(lesson.consolidation), lesson.id).toEqual([]);
      }
    }
  });

  it('liga as 11 questões autorais à seção certa sem atribuí-las à banca', () => {
    const used: string[] = [];
    for (const section of sections) {
      for (const lesson of microSeries('cap.ingles.01', section)) {
        const exam = lesson.exam[0];
        expect(exam?.kind).toBe('exam');
        if (exam?.kind !== 'exam') continue;
        const question = getQuestion(exam.questionId);
        expect(question, exam.questionId).toBeTruthy();
        expect(question?.chapterId).toBe('cap.ingles.01');
        expect(question?.sectionId).toBe(section);
        expect(question?.origin).toBe('autoral');
        used.push(exam.questionId);
      }
    }
    expect(new Set(used).size).toBe(11);
  });
});
