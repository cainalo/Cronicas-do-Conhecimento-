// Trilha: a sequência completa do programa, apresentada no mesmo modelo editorial da trilha dentro
// dos livros. Cada capítulo mostra o próximo passo, acesso ao texto completo e a lista cronológica.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { trailUnits, useCheckpoint } from '@/app/useCheckpoint';
import { getChapter, getGrimoire } from '@/content';
import { trailByChapter, type UnitState } from '@/lib/trail';
import { Icon, type IconName } from '@/components/Icon';
import { PageHeader, useIsDark } from '@/components/Page';
import { roman } from '@/lib/roman';
import { areaColor } from '@/app/areas';

const STATE_LABEL: Record<UnitState, string> = {
  feita: 'Concluída',
  atual: 'Você está aqui',
  disponivel: 'Disponível',
  bloqueada: 'Bloqueada',
};
const KIND_LABEL: Record<string, string> = {
  aprender: 'Aprender',
  praticar: 'Praticar',
  missao: 'Caso prático',
  desafio: 'Desafio',
};
const KIND_ICON: Record<string, IconName> = {
  aprender: 'grimorio',
  praticar: 'chama',
  missao: 'mapa',
  desafio: 'escudo',
};

export function TrailPage() {
  const { data } = useStudy();
  const checkpoint = useCheckpoint();
  const units = useMemo(trailUnits, []);
  const chapters = useMemo(() => trailByChapter(data, units, checkpoint), [data, units, checkpoint]);
  const total = units.length;
  const done = chapters.reduce((n, chapter) => n + chapter.done, 0);
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
          const next = ch.units.find((unit) => unit.state === 'atual')
            ?? ch.units.find((unit) => unit.state === 'disponivel')
            ?? ch.units[0];
          const reading = data.reading[chapter.id];
          const pct = ch.units.length ? Math.round((ch.done / ch.units.length) * 100) : 0;

          return (
            <li key={ch.chapterId}>
              <section aria-label={chapter.title} data-testid={`trilha-capitulo-${chapter.id}`}>
                <p className="kicker">
                  {grimoire?.title} · Capítulo {roman(chapter.number).toUpperCase()} · {ch.done}/{ch.units.length} atividades · cerca de {chapter.estimatedMinutes} min
                </p>
                <h2 className="mt-1 text-[1.45rem] leading-snug">{chapter.title}</h2>
                <p className="text-sm text-muted">{chapter.subtitle}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link to={next.unit.to} className="btn-primary !min-h-[42px] text-sm">
                    {ch.done === ch.units.length ? 'Rever' : ch.done > 0 ? 'Continuar' : 'Começar'} <Icon name="avancar" size={16} />
                  </Link>
                  <Link to={`/capitulo/${chapter.id}${reading?.lastSectionId ? `#${reading.lastSectionId}` : ''}`} className="btn-ghost !min-h-[42px] text-sm">
                    <Icon name="livro" size={16} /> Texto completo
                  </Link>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-raised" aria-label={`Progresso: ${pct}%`}>
                  <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: color }} />
                </div>

                <div className="mt-3 rounded-2xl border border-line bg-surface/60 p-3" aria-label={`Laboratórios práticos para ${chapter.title}`}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Aplicar o que você aprendeu</p>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/escritorio" className="btn-ghost !min-h-[36px] !px-3 text-xs"><Icon name="mapa" size={14} /> Escritório de TI 2D</Link>
                    <Link to="/laboratorio-codigo" className="btn-ghost !min-h-[36px] !px-3 text-xs"><Icon name="tela" size={14} /> Laboratório de programação</Link>
                    <Link to="/laboratorios" className="btn-ghost !min-h-[36px] !px-3 text-xs"><Icon name="terminal" size={14} /> Laboratórios práticos</Link>
                  </div>
                </div>

                <ol className="ledger mt-4" aria-label={`Atividades de ${chapter.title}`}>
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
                          <span className="block text-xs text-muted">{KIND_LABEL[unit.kind] ?? unit.kind}</span>
                          <span className="block leading-snug">{unit.title.replace(/^[^:]+:\s*/, '')}</span>
                        </span>
                        {state === 'atual' ? (
                          <span className="shrink-0 text-xs font-semibold text-gold">Você está aqui</span>
                        ) : (
                          <Icon name={KIND_ICON[unit.kind] ?? 'grimorio'} size={16} className="shrink-0 text-muted" />
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

// Extensões da trilha do Claude. Atribuídas no fim do módulo para preservar sem alterações
// as linhas da trilha base e manter o merge textual limpo.
Object.assign(KIND_LABEL, {
  narrada: 'Aula narrada',
  video: 'Videoaula',
  professores: 'Posts dos professores',
  flashcards: 'Cartões de memorização',
});
Object.assign(KIND_LABEL, {
  laboratorio: 'Laboratório prático',
  escritorio: 'Escritório de TI',
});
Object.assign(KIND_ICON, {
  narrada: 'alaude',
  video: 'play',
  professores: 'balao',
  flashcards: 'cartas',
  laboratorio: 'tela',
  escritorio: 'mapa',
});
