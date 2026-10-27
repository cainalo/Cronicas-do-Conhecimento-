import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { Trail, chapterStops } from '@/components/Trail';
import { areaColor } from '@/app/areas';
import { Icon } from '@/components/Icon';
import { PageHeader, SectionTitle, useIsDark } from '@/components/Page';

export const reviewLabel: Record<ReviewStatus, string> = {
  'nao-revisado': 'Revisão especializada pendente',
  'revisado-editorialmente': 'Revisado editorialmente',
  'validado-tecnicamente': 'Validado tecnicamente',
  'pendente-atualizacao': 'Atualização pendente',
};

function subjectArt(title: string): 'rede' | 'dados' | 'balanca' | 'grafico' | 'cadeado' | 'tela' | 'lista' {
  if (/rede|infraestrutura|sistema operacional/i.test(title)) return 'rede';
  if (/dados|banco|sql/i.test(title)) return 'dados';
  if (/legisla|direito|norma|govern/i.test(title)) return 'balanca';
  if (/matem|lógica|raciocínio/i.test(title)) return 'grafico';
  if (/segurança|proteção|criptografia/i.test(title)) return 'cadeado';
  if (/desenvol|software|devops|inteligência artificial/i.test(title)) return 'tela';
  return 'lista';
}

export function LibraryPage() {
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const subjects = grimoiresForContest(contest.id);
  const coveredTopics = new Set(chapters.flatMap((chapter) => chapter.topicIds));
  const hasMaterial = (topicIds: string[]) => topicIds.some((topicId) => coveredTopics.has(topicId));
  const { data } = useStudy();

  const metrics = (chapterIds: string[]) => {
    const chaptersForSubject = chapterIds.map((id) => getChapter(id)).filter((chapter): chapter is NonNullable<typeof chapter> => !!chapter);
    const sectionCount = chaptersForSubject.reduce((sum, chapter) => sum + chapter.sections.length, 0);
    const completedCount = chaptersForSubject.reduce((sum, chapter) => sum + (data.reading[chapter.id]?.sectionsRead.length ?? 0), 0);
    return { sectionCount, completedCount, percent: sectionCount ? Math.min(100, Math.round(completedCount / sectionCount * 100)) : 0 };
  };

  return (
    <div className="space-y-6">
      <PageHeader area="explorar" crumb={false} title="Matérias e materiais" subtitle={`Conteúdo organizado por disciplina para ${contest.name}. Escolha uma matéria ou retome pela trilha.`}>
        <Link to="/trilha" className="btn-primary mt-4 inline-flex min-h-[44px] items-center gap-2">
          <Icon name="trilha" size={17} /> Abrir trilha guiada <Icon name="avancar" size={17} />
        </Link>
      </PageHeader>

      <section aria-label="Disciplinas" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold">Estudar por matéria</h2>
          <span className="text-xs text-muted">{subjects.length} matérias</span>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {subjects.map((subject, index) => {
            const stats = metrics(subject.chapterIds);
            const tint = index % 4 === 0 ? 'var(--gold)' : index % 4 === 1 ? 'var(--teal)' : index % 4 === 2 ? 'var(--azure)' : 'var(--leaf)';
            return (
              <li key={subject.id}>
                <Link
                  to={`/grimorio/${subject.id}`}
                  className="group block h-full rounded-2xl border border-line p-4 transition hover:-translate-y-0.5 hover:border-ink/25 sm:p-5"
                  style={{ background: `color-mix(in srgb, rgb(${tint}) 8%, rgb(var(--surface)))` }}
                >
                  <span className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, rgb(${tint}) 16%, transparent)`, color: `rgb(${tint})` }}>
                      <Icon name={subjectArt(subject.title)} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-semibold leading-tight">{subject.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{subject.description}</span>
                    </span>
                    <Icon name="avancar" size={17} className="mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-3 text-xs text-muted">
                    <span>{subject.chapterIds.length} capítulo(s) · {stats.sectionCount} trechos</span>
                    <span>{stats.percent}% lido</span>
                  </span>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-raised">
                    <span className="block h-full rounded-full transition-[width]" style={{ width: `${stats.percent}%`, background: `rgb(${tint})` }} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {contest.disciplines.some((discipline) => !hasMaterial(discipline.topics.map((topic) => topic.id))) && (
        <section>
          <SectionTitle>Conteúdos a complementar</SectionTitle>
          <p className="mb-3 text-sm text-muted">Estas disciplinas ainda não têm um capítulo associado a seus tópicos no catálogo.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {contest.disciplines.filter((discipline) => !hasMaterial(discipline.topics.map((topic) => topic.id))).map((discipline) => (
              <li key={discipline.id} className="flex items-start gap-2 rounded-xl border border-line bg-surface p-3 text-sm">
                <Icon name="mais" size={16} className="mt-0.5 shrink-0 text-muted" />
                <span>{discipline.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function GrimoirePage() {
  const { id = '' } = useParams();
  const { data } = useStudy();
  const subject = getGrimoire(id);
  const color = areaColor('explorar', useIsDark());
  if (!subject) return <p>Matéria não encontrada.</p>;

  return (
    <div className="space-y-6">
      <PageHeader area="explorar" title={subject.title} subtitle={subject.description} />
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
        <span className="text-sm text-muted">{subject.chapterIds.length} capítulos nesta matéria.</span>
        <Link to="/trilha" className="btn-primary min-h-[42px]">Seguir a trilha <Icon name="avancar" size={16} /></Link>
      </div>
      <ol className="space-y-8">
        {subject.chapterIds.map((chapterId, index) => {
          const chapter = getChapter(chapterId);
          if (!chapter) return null;
          const reading = data.reading[chapter.id];
          const completed = reading?.sectionsRead.length ?? 0;
          const stops = chapterStops(chapter, data);
          const next = stops.find((stop) => !stop.done) ?? stops[0];
          const percent = chapter.sections.length ? Math.round(completed / chapter.sections.length * 100) : 0;
          return (
            <li key={chapter.id}>
              <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5" aria-label={chapter.title}>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-raised text-sm font-semibold text-muted">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="kicker">Capítulo {chapter.number} · {completed}/{chapter.sections.length} trechos concluídos</p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight">{chapter.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{chapter.subtitle}</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-raised" aria-label={`Progresso: ${percent}%`}>
                  <div className="h-full rounded-full" style={{ width: `${percent}%`, background: color }} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {next && <Link to={next.to} className="btn-primary min-h-[42px] text-sm">{completed ? 'Continuar' : 'Começar'} <Icon name="avancar" size={16} /></Link>}
                  <Link to={`/capitulo/${chapter.id}`} className="btn-ghost min-h-[42px] text-sm"><Icon name="lista" size={16} /> Material completo</Link>
                </div>
                <div className="mt-4">
                  <Trail chapter={chapter} data={data} color={color} />
                </div>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
