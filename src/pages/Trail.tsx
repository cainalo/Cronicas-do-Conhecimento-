// Trilha principal organizada por matéria: cada disciplina tem seu próprio percurso e progresso.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits, useCheckpoint } from '@/app/useCheckpoint';
import { getChapter, grimoires } from '@/content';
import { teacherForChapter } from '@/content';
import { trailByChapter, type UnitState } from '@/lib/trail';
import { Icon, type IconName } from '@/components/Icon';
import { PageHeader, useIsDark } from '@/components/Page';
import { areaColor } from '@/app/areas';
import { BookCover } from '@/components/BookCover';
import { TeacherCue } from '@/components/TeacherCharacter';
import { roman } from '@/lib/roman';

const STATE_LABEL: Record<UnitState, string> = {
  feita: 'Concluída',
  atual: 'Próxima atividade',
  disponivel: 'Disponível',
  bloqueada: 'Bloqueada',
};

const KIND_LABEL: Record<string, string> = {
  aprender: 'Aula',
  narrada: 'Aula narrada',
  video: 'Videoaula',
  professores: 'Professores',
  praticar: 'Prática',
  missao: 'Caso prático',
  flashcards: 'Memorização',
  desafio: 'Desafio',
};

const KIND_ICON: Record<string, IconName> = {
  aprender: 'grimorio',
  narrada: 'play',
  video: 'play',
  professores: 'balao',
  praticar: 'chama',
  missao: 'mapa',
  flashcards: 'cartas',
  desafio: 'escudo',
};

export function TrailPage() {
  const { data } = useStudy();
  const checkpoint = useCheckpoint();
  const units = useMemo(trailUnits, []);
  const chapterRows = useMemo(() => trailByChapter(data, units, checkpoint), [data, units, checkpoint]);
  const dark = useIsDark();
  const color = areaColor('grimorios', dark);

  const subjects = useMemo(() => {
    const byChapter = new Map(chapterRows.map((item) => [item.chapterId, item]));
    return grimoires.map((grimoire) => {
      const subjectChapters = grimoire.chapterIds
        .map((id) => byChapter.get(id))
        .filter((item): item is NonNullable<typeof item> => !!item);
      const total = subjectChapters.reduce((sum, item) => sum + item.units.length, 0);
      const done = subjectChapters.reduce((sum, item) => sum + item.done, 0);
      const next = subjectChapters.flatMap((item) => item.units).find((item) => item.state === 'atual' || item.state === 'disponivel')
        ?? subjectChapters[0]?.units[0];
      return {
        grimoire,
        chapters: subjectChapters,
        total,
        done,
        percent: total ? Math.round((done / total) * 100) : 0,
        next,
      };
    }).filter((subject) => subject.total > 0);
  }, [chapterRows]);

  const total = subjects.reduce((sum, item) => sum + item.total, 0);
  const done = subjects.reduce((sum, item) => sum + item.done, 0);

  return (
    <div className="space-y-7">
      <PageHeader area="grimorios" crumb={false} title="Trilha" subtitle={done + ' de ' + total + ' atividades concluídas · ' + subjects.length + ' matérias'} />

      <Link to={checkpoint.to} className="card card-interactive flex items-center gap-3 p-4" data-testid="continuar-trilha">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-white">
          <Icon name="play" size={20} fill="currentColor" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-gold">{checkpoint.resuming ? 'Você parou aqui' : 'Próximo passo'}</span>
          <span className="block truncate font-semibold">{checkpoint.title}</span>
          <span className="block truncate text-sm text-muted">{checkpoint.context}</span>
        </span>
        <span className="btn-primary hidden !min-h-[40px] sm:inline-flex">{checkpoint.action}</span>
      </Link>

      <ol className="space-y-8" aria-label="Matérias da trilha">
        {subjects.map((subject) => {
          const { grimoire, chapters: subjectChapters, total: subjectTotal, done: subjectDone, percent, next } = subject;
          const firstChapter = subjectChapters[0] ? getChapter(subjectChapters[0].chapterId) : undefined;
          const teacher = teacherForChapter(firstChapter?.id ?? '');
          return (
            <li key={grimoire.id}>
              <section className="overflow-hidden rounded-2xl border border-line bg-surface/75 p-3 sm:p-4" aria-label={'Matéria ' + grimoire.title} data-testid={'trilha-materia-' + grimoire.id}>
                <div className="flex items-start gap-3">
                  <BookCover g={grimoire} className="w-[4.8rem] shrink-0 sm:w-[5.4rem]" />
                  <div className="min-w-0 flex-1">
                    <p className="kicker">{grimoire.epithet}</p>
                    <h2 className="mt-1 text-xl leading-tight">{grimoire.title}</h2>
                    <p className="mt-1 text-xs text-muted">{subjectChapters.length + ' capítulos · ' + subjectDone + ' de ' + subjectTotal + ' etapas'}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised" role="progressbar" aria-label={'Progresso em ' + grimoire.title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: percent + '%', background: color }} />
                    </div>
                    <p className="mt-1 text-right text-[0.68rem] font-semibold tabular-nums text-muted">{percent}%</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link to={'/grimorio/' + grimoire.id} className="btn-ghost !min-h-[36px] !px-3 text-xs">
                        Ver matéria <Icon name="avancar" size={14} />
                      </Link>
                      {next && (
                        <Link to={next.unit.to} className="btn-primary !min-h-[36px] !px-3 text-xs">
                          {subjectDone ? 'Continuar' : 'Começar'} <Icon name="play" size={13} fill="currentColor" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <TeacherCue teacher={teacher} pose="presenting" size={66} compact>
                    {teacher.motto}
                  </TeacherCue>
                </div>

                <div className="mt-4 space-y-4">
                  {subjectChapters.map((row) => {
                    const chapter = getChapter(row.chapterId);
                    if (!chapter) return null;
                    const pct = row.units.length ? Math.round((row.done / row.units.length) * 100) : 0;
                    return (
                      <section key={row.chapterId} className="rounded-xl border border-line bg-bg/65 p-3" aria-label={'Mini trilha de ' + chapter.title} data-testid={'mini-trilha-' + chapter.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="kicker">Capítulo {roman(chapter.number).toUpperCase()} · {row.done}/{row.units.length} etapas</p>
                            <h3 className="mt-1 text-base leading-snug">{chapter.title}</h3>
                            <p className="mt-0.5 text-xs text-muted">{chapter.subtitle}</p>
                          </div>
                          <Link to={'/capitulo/' + chapter.id} className="shrink-0 text-xs font-semibold text-gold underline underline-offset-2">Texto completo</Link>
                        </div>
                        <div className="relative mt-4">
                          <div className="absolute bottom-5 left-[17px] top-5 w-[3px] rounded-full bg-raised" aria-hidden="true" />
                          <div className="absolute left-[17px] top-5 w-[3px] rounded-full" style={{ height: 'calc(' + pct + '% - 1.25rem)', background: color }} aria-hidden="true" />
                          <ol className="relative space-y-2" aria-label={'Atividades de ' + chapter.title}>
                            {row.units.map(({ unit, state }, index) => {
                              const title = unit.title.replace(/^[^:]+:\s*/, '');
                              const icon = KIND_ICON[unit.kind] ?? 'lista';
                              const contents = (
                                <>
                                  <span
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 bg-bg text-xs font-bold tabular-nums"
                                    style={state === 'feita'
                                      ? { background: color, borderColor: color, color: '#fff' }
                                      : state === 'atual'
                                        ? { borderColor: 'rgb(var(--gold))', color: 'rgb(var(--gold))', boxShadow: '0 0 0 4px rgb(var(--gold) / .12)' }
                                        : { borderColor: 'rgb(var(--line))', color: 'rgb(var(--muted))' }}
                                    aria-hidden="true"
                                  >
                                    {state === 'feita' ? <Icon name="certo" size={15} /> : state === 'bloqueada' ? <Icon name="chave" size={13} /> : <Icon name={icon} size={14} />}
                                  </span>
                                  <span className="min-w-0 flex-1 py-0.5 text-left">
                                    <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-muted">{KIND_LABEL[unit.kind] ?? unit.kind}</span>
                                    <span className="block text-sm leading-snug">{title}</span>
                                  </span>
                                  <span className="shrink-0 text-[0.62rem] font-semibold text-muted">{state === 'feita' ? 'Feita' : state === 'atual' ? 'Agora' : state === 'bloqueada' ? 'Feche a etapa anterior' : 'Disponível'}</span>
                                </>
                              );
                              return (
                                <li key={unit.key} className="pl-0">
                                  {state === 'bloqueada' ? (
                                    <div className="flex min-h-12 items-center gap-3 opacity-55" aria-disabled="true" aria-label={unit.title + ' (' + STATE_LABEL[state] + ')'}>{contents}</div>
                                  ) : (
                                    <Link to={unit.to} className={'flex min-h-12 items-center gap-3 rounded-xl px-1 py-1 transition hover:bg-raised/70 ' + (state === 'atual' ? 'bg-gold/5' : '')} aria-current={state === 'atual' ? 'step' : undefined} aria-label={unit.title + ' (' + STATE_LABEL[state] + ')'}>
                                      {contents}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
