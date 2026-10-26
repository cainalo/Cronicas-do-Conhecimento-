// Trilha: o programa inteiro em ordem, capítulo por capítulo, no mesmo modelo da página do livro
// (título, Continuar, Texto completo e a lista de atividades), com o estado de cada uma.
// A atividade atual é a mesma do Continuar (fonte única). Atividades bloqueadas aparecem, mas não
// abrem: a do mesmo capítulo precisa ser concluída antes (lib/trail.ts).
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits, useCheckpoint } from '@/app/useCheckpoint';
import { getChapter, getGrimoire } from '@/content';
import { trailByChapter, type UnitState } from '@/lib/trail';
import { Icon } from '@/components/Icon';
import { PageHeader, useIsDark } from '@/components/Page';
import type { IconName } from '@/components/Icon';
import { roman } from '@/lib/roman';
import { areaColor } from '@/app/areas';

const STATE_LABEL: Record<UnitState, string> = { feita: 'Concluída', atual: 'Você está aqui', disponivel: 'Disponível', bloqueada: 'Bloqueada' };
const KIND_LABEL = { aprender: 'Aprender', praticar: 'Praticar', missao: 'Caso prático', desafio: 'Desafio' } as const;
const KIND_ICON: Record<keyof typeof KIND_LABEL, IconName> = { aprender: 'grimorio', praticar: 'chama', missao: 'mapa', desafio: 'escudo' };

export function TrailPage() {
  const { data } = useStudy();
  const checkpoint = useCheckpoint();
  const units = useMemo(trailUnits, []);
  const chapters = useMemo(() => trailByChapter(data, units, checkpoint), [data, units, checkpoint]);
  const total = units.length;
  const done = chapters.reduce((n, c) => n + c.done, 0);
  const color = areaColor('grimorios', useIsDark());

  return (
    <div className="space-y-5">
      <PageHeader area="grimorios" crumb={false} title="Trilha" subtitle={`${done} de ${total} atividades concluídas, na ordem do programa`} />

      <Link to={checkpoint.to} className="card card-interactive flex items-center gap-3 p-4" data-testid="continuar-trilha">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-white">
          <Icon name="play" size={20} fill="currentColor" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-gold">{checkpoint.resuming ? 'Você parou aqui' : 'Próximo passo'}</span>
          <span className="block truncate font-semibold">{checkpoint.title}</span>
          <span className="block truncate text-sm text-muted">{checkpoint.context}</span>
        </span>
        <span className="btn-primary hidden !min-h-[40px] sm:inline-flex">{checkpoint.action}</span>
      </Link>

      <ol className="space-y-10" aria-label="Capítulos da trilha">
        {chapters.map((ch) => {
          const chapter = getChapter(ch.chapterId)!;
          const grimoire = getGrimoire(chapter.grimoireId);
          const next = ch.units.find((u) => u.state === 'atual') ?? ch.units.find((u) => u.state === 'disponivel') ?? ch.units[0];
          const rp = data.reading[chapter.id];
          return (
            <li key={ch.chapterId}>
              <section aria-label={chapter.title}>
                <p className="kicker">
                  {grimoire?.title} · Capítulo {roman(chapter.number).toUpperCase()} · {ch.done}/{ch.units.length} atividades · cerca de {chapter.estimatedMinutes} min
                </p>
                <h2 className="mt-1 text-[1.45rem] leading-snug">{chapter.title}</h2>
                <p className="text-sm text-muted">{chapter.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to={next.unit.to} className="btn-primary !min-h-[42px] text-sm">
                    {ch.done === ch.units.length ? 'Rever' : ch.done > 0 ? 'Continuar' : 'Começar'} <Icon name="avancar" size={16} />
                  </Link>
                  <Link to={`/capitulo/${chapter.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`} className="btn-ghost !min-h-[42px] text-sm">
                    <Icon name="livro" size={16} /> Texto completo
                  </Link>
                </div>
                <ol className="ledger mt-4">
                  {ch.units.map(({ unit, state }, index) => {
                    const body = (
                      <>
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs tabular-nums"
                          style={
                            state === 'feita'
                              ? { background: color, borderColor: color, color: '#fff' }
                              : state === 'atual' || state === 'disponivel'
                                ? { borderColor: 'rgb(var(--gold))', color: 'rgb(var(--gold))' }
                                : { borderColor: 'rgb(var(--line))', color: 'rgb(var(--muted))' }
                          }
                          aria-hidden="true"
                        >
                          {state === 'feita' ? <Icon name="certo" size={15} /> : state === 'bloqueada' ? <Icon name="chave" size={13} /> : index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-muted">{KIND_LABEL[unit.kind]}</span>
                          <span className="block leading-snug">{unit.title.replace(/^[^:]+:\s*/, '')}</span>
                        </span>
                        {state === 'atual' ? (
                          <span className="shrink-0 text-xs font-semibold text-gold">Você está aqui</span>
                        ) : (
                          <Icon name={KIND_ICON[unit.kind]} size={16} className="shrink-0 text-muted" />
                        )}
                      </>
                    );
                    return (
                      <li key={unit.key}>
                        {state === 'bloqueada' ? (
                          <div className="ledger-row opacity-70" aria-disabled="true" title="Conclua a atividade anterior deste capítulo" aria-label={`${unit.title} (${STATE_LABEL[state]})`}>
                            {body}
                          </div>
                        ) : (
                          <Link
                            to={unit.to}
                            className={`ledger-row ${state === 'atual' ? 'bg-gold/5' : ''}`}
                            aria-current={state === 'atual' ? 'step' : undefined}
                            aria-label={`${unit.title} (${STATE_LABEL[state]})`}
                          >
                            {body}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
