import { describe, expect, it } from 'vitest';
import { getChapter, getQuestion, microSeries } from '@/content';
import { diversityProblems } from '@/lib/activities';

const platform = microSeries('cap.devops.02', 'iac-containers');
const observability = microSeries('cap.devops.02', 'observabilidade');

describe('microaulas de Plataforma e Observabilidade', () => {
  it('cobre os dois trechos na ordem didática planejada', () => {
    expect(platform.map((lesson) => lesson.series?.order)).toEqual([1, 2, 3, 4]);
    expect(observability.map((lesson) => lesson.series?.order)).toEqual([1, 2, 3]);
    expect(platform[0].title).toMatch(/infraestrutura como código/i);
    expect(observability[0].title).toMatch(/observabilidade/i);
  });

  it('cada aula pertence a um capítulo e trecho existentes e tem etapas pequenas', () => {
    for (const lesson of [...platform, ...observability]) {
      const chapter = getChapter(lesson.chapterId);
      expect(chapter, lesson.id).toBeTruthy();
      expect(chapter?.sections.some((section) => section.id === lesson.sectionId), lesson.id).toBe(true);
      expect(lesson.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
      for (const step of lesson.steps) {
        expect(step.goal.length, lesson.id + ':' + step.id).toBeGreaterThan(8);
        expect(step.check.prompt.length, lesson.id + ':' + step.id).toBeGreaterThan(10);
        expect(step.recovery.explain.length, lesson.id + ':' + step.id).toBeGreaterThan(30);
      }
    }
  });

  it('consolidação mistura ao menos três famílias de atividade', () => {
    for (const lesson of [...platform, ...observability]) {
      expect(diversityProblems(lesson.consolidation), lesson.id).toEqual([]);
    }
  });

  it('questões usadas nas aulas existem e pertencem ao trecho correspondente', () => {
    for (const lesson of [...platform, ...observability]) {
      for (const activity of lesson.exam) {
        if (activity.kind !== 'exam') continue;
        const question = getQuestion(activity.questionId);
        expect(question, activity.questionId).toBeTruthy();
        expect(question?.chapterId).toBe('cap.devops.02');
        expect(question?.sectionId).toBe(lesson.sectionId);
      }
    }
  });
});
