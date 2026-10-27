import { describe, expect, it } from 'vitest';
import { getChapter, getQuestion, microSeries } from '@/content';
import { diversityProblems } from '@/lib/activities';

const sections = ['etica', 'lgpd-ebia', 'ciencia-dados', 'big-data'] as const;
const expectedQuestionIds: Record<(typeof sections)[number], string[]> = {
  etica: ['q.ia.04.001', 'q.ia.04.002', 'q.ia.04.003'],
  'lgpd-ebia': ['q.ia.04.006', 'q.ia.04.005', 'q.ia.04.004'],
  'ciencia-dados': ['q.ia.04.007', 'q.ia.04.008', 'q.ia.04.009'],
  'big-data': ['q.ia.04.010', 'q.ia.04.011', 'q.ia.04.012'],
};

describe('microaulas graduais de Ética, LGPD, Ciência de Dados e Big Data', () => {
  it('cobre os quatro trechos com três aulas em sequência por trecho', () => {
    for (const section of sections) {
      const lessons = microSeries('cap.ia.04', section);
      expect(lessons, section).toHaveLength(3);
      expect(lessons.map((lesson) => lesson.series?.order), section).toEqual([1, 2, 3]);
      expect(lessons[0].steps[0].part, section).toBe('A história');
    }
  });

  it('cada aula pertence a uma seção real e tem explicação, checagem e recuperação', () => {
    const chapter = getChapter('cap.ia.04');
    expect(chapter).toBeTruthy();

    for (const section of sections) {
      expect(chapter?.sections.some((part) => part.id === section), section).toBe(true);
      for (const lesson of microSeries('cap.ia.04', section)) {
        expect(lesson.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
        expect(lesson.opening.prompt.length, lesson.id).toBeGreaterThan(20);
        for (const step of lesson.steps) {
          expect(step.goal.length, lesson.id + ':' + step.id).toBeGreaterThan(8);
          expect(step.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(120);
          expect(step.check.prompt.length, lesson.id + ':' + step.id).toBeGreaterThan(10);
          expect(step.recovery.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(60);
          expect(step.recovery.check.id, lesson.id + ':' + step.id).not.toBe(step.check.id);
        }
      }
    }
  });

  it('mantém introduções históricas nas quatro seções do capítulo completo', () => {
    const chapter = getChapter('cap.ia.04');
    expect(chapter).toBeTruthy();
    for (const section of sections) {
      const body = chapter?.sections.find((part) => part.id === section)?.body ?? '';
      expect(body, section).toContain('Contexto histórico');
      expect(body.length, section).toBeGreaterThan(800);
    }
  });

  it('usa três famílias diferentes de consolidação em cada aula', () => {
    for (const section of sections) {
      for (const lesson of microSeries('cap.ia.04', section)) {
        expect(diversityProblems(lesson.consolidation), lesson.id).toEqual([]);
      }
    }
  });

  it('liga as 12 questões autorais à seção correspondente, sem marcá-las como oficiais', () => {
    const used: string[] = [];
    for (const section of sections) {
      const lessons = microSeries('cap.ia.04', section);
      expect(lessons.map((lesson) => {
        const exam = lesson.exam[0];
        return exam?.kind === 'exam' ? exam.questionId : '';
      }), section).toEqual(expectedQuestionIds[section]);

      for (const lesson of lessons) {
        const exam = lesson.exam[0];
        expect(exam?.kind).toBe('exam');
        if (exam?.kind !== 'exam') continue;
        const question = getQuestion(exam.questionId);
        expect(question, exam.questionId).toBeTruthy();
        expect(question?.chapterId).toBe('cap.ia.04');
        expect(question?.sectionId).toBe(lesson.sectionId);
        expect(question?.origin).toBe('autoral');
        used.push(exam.questionId);
      }
    }

    expect(new Set(used).size).toBe(12);
  });
});
