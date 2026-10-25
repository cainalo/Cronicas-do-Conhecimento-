// Trilha: o programa inteiro em ordem, capítulo por capítulo, com o estado de cada atividade.
// A atividade atual é a mesma do Continuar (fonte única). Atividades bloqueadas aparecem, mas não
// abrem: a do mesmo capítulo precisa ser concluída antes (lib/trail.ts).
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits, useCheckpoint } from '@/app/useCheckpoint';
import { getChapter, getGrimoire } from '@/content';
import { trailByChapter, type UnitState } from '@/lib/trail';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';

const STATE_LABEL: Record<UnitState, string> = { feita: 'Concluída', atual: 'Você está aqui', disponivel: 'Disponível', bloqueada: 'Bloqueada' };
const KIND_LABEL = { aprender: 'Aprender', praticar: 'Praticar', missao: 'Missão', desafio: 'Desafio' } as const;

export function TrailPage() {
  const { data } = useStudy();
  const checkpoint = useCheckpoint();
  const units = useMemo(trailUnits, []);
  const chapters = useMemo(() => trailByChapter(data, units, checkpoint), [data, units, checkpoint]);
  const total = units.length;
  const done = chapters.reduce((n, c) => n + c.done, 0);
  const currentChapter = checkpoint.unit?.chapterId;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const isOpen = (id: string) => open[id] ?? id === currentChapter;

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

      <ol className="space-y-3" aria-label="Capítulos da trilha">
        {chapters.map((ch) => {
          const chapter = getChapter(ch.chapterId)!;
          const grimoire = getGrimoire(chapter.grimoireId);
          const pct = Math.round((ch.done / ch.units.length) * 100);
          const expanded = isOpen(ch.chapterId);
          return (
            <li key={ch.chapterId} className="card overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center gap-3 p-4 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen((o) => ({ ...o, [ch.chapterId]: !expanded }))}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-muted">{grimoire?.title}</span>
                  <span className="block font-semibold leading-snug">{chapter.title}</span>
                  <span className="mt-2 flex items-center gap-2">
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-raised" aria-hidden="true">
                      <span className="block h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-xs text-muted">
                      {ch.done}/{ch.units.length}
                    </span>
                  </span>
                </span>
                <Icon name="seta" size={18} className={`shrink-0 text-muted transition ${expanded ? 'rotate-90' : ''}`} />
              </button>
              {expanded && (
                <ol className="border-t border-line">
                  {ch.units.map(({ unit, state, index }) => {
                    const body = (
                      <>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                            state === 'feita' ? 'bg-ok text-white' : state === 'atual' ? 'bg-gold text-white' : state === 'disponivel' ? 'border-2 border-gold text-gold' : 'bg-raised text-muted'
                          }`}
                          aria-hidden="true"
                        >
                          {state === 'feita' ? <Icon name="certo" size={14} strokeWidth={2.6} /> : state === 'bloqueada' ? <Icon name="chave" size={13} /> : index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-muted">{KIND_LABEL[unit.kind]}</span>
                          <span className="block leading-snug">{unit.title.replace(/^[^:]+:\s*/, '')}</span>
                        </span>
                        <span className={`shrink-0 text-xs font-semibold ${state === 'atual' ? 'text-gold' : state === 'feita' ? 'text-ok' : 'text-muted'}`}>{STATE_LABEL[state]}</span>
                      </>
                    );
                    return (
                      <li key={unit.key} className="border-b border-line last:border-b-0">
                        {state === 'bloqueada' ? (
                          <div className="flex items-center gap-3 px-4 py-3 opacity-70" aria-disabled="true" title="Conclua a atividade anterior deste capítulo">
                            {body}
                          </div>
                        ) : (
                          <Link to={unit.to} className="flex items-center gap-3 px-4 py-3 transition hover:bg-raised" aria-current={state === 'atual' ? 'step' : undefined}>
                            {body}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
