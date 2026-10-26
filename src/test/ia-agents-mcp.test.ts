import { describe, expect, it } from 'vitest';
import { getChapter, getQuestion, microSeries } from '@/content';
import { diversityProblems } from '@/lib/activities';

const sections = ['agentes', 'ciclo', 'mcp', 'skills', 'qualidade'] as const;
const expectedSections: Record<string, string> = {
  'q.ia.02.001': 'agentes', 'q.ia.02.002': 'agentes', 'q.ia.02.006': 'agentes',
  'q.ia.02.003': 'ciclo', 'q.ia.02.004': 'ciclo', 'q.ia.02.005': 'ciclo',
  'q.ia.02.007': 'mcp', 'q.ia.02.008': 'mcp', 'q.ia.02.009': 'mcp',
  'q.ia.02.010': 'mcp', 'q.ia.02.011': 'mcp', 'q.ia.02.012': 'mcp',
  'q.ia.02.013': 'skills', 'q.ia.02.014': 'skills',
  'q.ia.02.015': 'qualidade', 'q.ia.02.016': 'qualidade', 'q.ia.02.017': 'qualidade',
  'q.ia.02.018': 'qualidade', 'q.ia.02.019': 'qualidade', 'q.ia.02.020': 'qualidade',
};

describe('microaulas de Agentes de Programação e MCP', () => {
  it('cobre cinco trechos com três aulas em ordem', () => {
    for (const section of sections) {
      const lessons = microSeries('cap.ia.02', section);
      expect(lessons, section).toHaveLength(3);
      expect(lessons.map((lesson) => lesson.series?.order), section).toEqual([1, 2, 3]);
      expect(lessons[0].steps[0].part, section).toBe('A história');
    }
  });

  it('todas as aulas têm checagem, recuperação e capítulo/seção existentes', () => {
    for (const section of sections) {
      for (const lesson of microSeries('cap.ia.02', section)) {
        const chapter = getChapter(lesson.chapterId);
        expect(chapter, lesson.id).toBeTruthy();
        expect(chapter?.sections.some((part) => part.id === lesson.sectionId), lesson.id).toBe(true);
        expect(lesson.steps.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.opening.prompt.length, lesson.id).toBeGreaterThan(20);
        for (const step of lesson.steps) {
          expect(step.goal.length, lesson.id + ':' + step.id).toBeGreaterThan(8);
          expect(step.check.prompt.length, lesson.id + ':' + step.id).toBeGreaterThan(10);
          expect(step.recovery.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(30);
        }
      }
    }
  });

  it('consolida com três famílias de atividade', () => {
    for (const section of sections) {
      for (const lesson of microSeries('cap.ia.02', section)) {
        expect(diversityProblems(lesson.consolidation), lesson.id).toEqual([]);
      }
    }
  });

  it('questões integradas existem e correspondem à seção correta', () => {
    const linked: string[] = [];
    for (const section of sections) {
      for (const lesson of microSeries('cap.ia.02', section)) {
        for (const activity of lesson.exam) {
          if (activity.kind !== 'exam') continue;
          const question = getQuestion(activity.questionId);
          expect(question, activity.questionId).toBeTruthy();
          expect(question?.chapterId).toBe('cap.ia.02');
          expect(question?.sectionId).toBe(lesson.sectionId);
          expect(question?.sectionId).toBe(expectedSections[activity.questionId]);
          linked.push(activity.questionId);
        }
      }
    }
    expect(new Set(linked).size).toBe(20);
    for (let i = 1; i <= 20; i++) expect(linked).toContain('q.ia.02.' + String(i).padStart(3, '0'));
  });
});
