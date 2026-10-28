// Aprender: porta de entrada de cada trecho, em etapas curtas e contínuas. Uma ideia por etapa,
// vocabulário essencial, verificações de compreensão e convite para praticar. O conteúdo completo
// fica disponível em leitura contínua para aprofundamento.
import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { useFx } from '@/app/fx';
import { useSession } from '@/app/useSession';
import { learnKey, seriesKey } from '@/lib/pace';
import { getChapter, getLearningUnit, getSimpleSection, microSeries } from '@/content';
import { InteractiveUnitPage } from '@/pages/InteractiveUnit';
import { MicroLessonPage } from './MicroLesson';
import { markSectionRead, setLastSection } from '@/lib/study';
import { Markdown } from '@/components/Markdown';
import { ReferenceText } from '@/components/ReferenceText';
import { Icon } from '@/components/Icon';
import { TrueFalseCheck } from '@/components/TrueFalseCheck';

export function LearnPage() {
  const { chapterId = '', sectionId = '' } = useParams();
  // Reformulação: trecho com unidade interativa abre o leitor de texto interativo (piloto).
  const unit = getLearningUnit(chapterId, sectionId);
  if (unit) return <InteractiveUnitPage key={unit.id} unit={unit} />;
  return <MicroOrSimple />;
}

function MicroOrSimple() {
  const { chapterId = '', sectionId = '', aula } = useParams();
  const { data } = useStudy();
  const series = microSeries(chapterId, sectionId);
  if (!series.length) return <SimpleLearnPage />;
  // Trecho com microaula: a aula em etapas é o caminho principal (fonte única do conteúdo didático).
  // Em série, abre a aula pedida ou, sem indicação, a primeira ainda não concluída.
  const lesson =
    series.find((m) => m.id === aula) ??
    (series.length > 1 ? series.find((m) => !data.unitLog?.[seriesKey(chapterId, sectionId, m.id)]) ?? series[0] : series[0]);
  const i = series.indexOf(lesson);
  return <MicroLessonPage key={lesson.id} lesson={lesson} series={series.length > 1 ? { index: i, total: series.length, next: series[i + 1] } : undefined} />;
}

function SimpleLearnPage() {
  const { chapterId = '', sectionId = '' } = useParams();
  const chapter = getChapter(chapterId);
  const sectionIndex = chapter?.sections.findIndex((section) => section.id === sectionId) ?? -1;
  const section = chapter?.sections[sectionIndex];
  const simple = getSimpleSection(chapterId, sectionId);
  const { data, update } = useStudy();
  const { prefs } = usePrefs();
  const { sfx, confetti, toast } = useFx();
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const session = useSession<number>(learnKey(chapterId, sectionId), () => 0, (stage) => `Aprender: etapa ${stage + 1}`);

  useEffect(() => {
    if (chapter && section) update((d) => setLastSection(d, chapter.id, section.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, sectionId]);

  // A aula usa o texto integral da seção como leitura principal; vocabulário e questões continuam como etapas próprias.
  const totalStages = simple
    ? 1 + (simple.words.length ? 1 : 0) + (simple.checks.length ? 1 : 0) + 1
    : 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const targets = [...root.querySelectorAll<HTMLElement>('[data-stage-index]')];
    const initial = Math.max(0, Math.min(session.state, targets.length - 1));
    if (session.resumed && targets[initial]) {
      window.setTimeout(() => targets[initial]?.scrollIntoView?.({ behavior: 'auto', block: 'start' }), 0);
    }
    const stageObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const index = visible ? Number((visible.target as HTMLElement).dataset.stageIndex) : NaN;
      if (Number.isInteger(index) && index >= 0) session.setState(index);
    }, { threshold: [0.25, 0.5, 0.75] });
    targets.forEach((target) => stageObserver.observe(target));

    const end = root.querySelector<HTMLElement>('[data-learn-complete]');
    const alreadyRead = !!(chapter && section && data.reading[chapter.id]?.sectionsRead.includes(section.id));
    completedRef.current = alreadyRead;
    const completionObserver = end ? new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || completedRef.current || !chapter || !section) return;
      completedRef.current = true;
      const result = markSectionRead(data, chapter, section.id);
      update((d) => markSectionRead(d, chapter, section.id).data);
      session.finish();
      sfx('done');
      if (result.xp) {
        confetti(55);
        toast({ text: 'Trecho estudado', sub: `+${result.xp.amount} pontos`, icon: 'certo', color: '#2c5f6e' });
      }
    }, { threshold: 0.2 }) : undefined;
    if (end && completionObserver) completionObserver.observe(end);
    return () => {
      stageObserver.disconnect();
      completionObserver?.disconnect();
    };
    // Observadores são refeitos apenas quando o trecho muda; a marcação é protegida por completedRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, sectionId, simple]);

  if (!chapter || !section) return <p>Trecho não encontrado.</p>;
  if (!simple) return <Navigate to={`/capitulo/${chapterId}#${sectionId}`} replace />;

  const stageTotal = totalStages;
  let stage = 0;
  const stageProps = () => ({ 'data-stage-index': stage++, className: 'scroll-mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-5' });

  return (
    <div className="space-y-4 pb-8" style={{ ['--font-scale' as string]: prefs.fontScale }}>
      <div className="flex items-center gap-3">
        <Link to={`/grimorio/${chapter.grimoireId}`} aria-label="Sair de Aprender" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-raised">
          <Icon name="sair" size={22} />
        </Link>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-raised" role="progressbar" aria-label="Progresso de Aprender" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((Math.min(session.state + 1, stageTotal) / stageTotal) * 100)}>
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${(Math.min(session.state + 1, stageTotal) / stageTotal) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted">{Math.min(session.state + 1, stageTotal)}/{stageTotal}</span>
        <ReferenceText chapterId={chapterId} sectionId={sectionId} mode="drawer" />
      </div>

      <div ref={rootRef} className="space-y-3">
        <section {...stageProps()} aria-label="Introdução ao trecho">
          <p className="kicker">Primeiro, entenda</p>
          <h1 className="mt-1 text-2xl leading-tight">{section.title.replace(/^\d+\.\s*/, '')}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">Siga as etapas em sequência. O texto, as palavras importantes e as verificações ficam na mesma leitura; role para continuar.</p>
        </section>

        <section {...stageProps()} aria-label="Texto completo da matéria">
          <p className="kicker">Leitura principal · texto de referência</p>
          <h2 className="mt-1 text-xl leading-snug">{section.title.replace(/^\\d+\\.\\s*/, '')}</h2>
          <div className="prose-content learn-text reference-reading mt-3">
            <Markdown>{section.body}</Markdown>
          </div>
          <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
            Depois da leitura integral, revise o vocabulário e responda às questões para consolidar os conceitos.
          </p>
        </section>

        {simple.words.length > 0 && (
          <section {...stageProps()} aria-label="Palavras importantes">
            <p className="kicker">Vocabulário</p>
            <h2 className="mt-1 text-xl">Palavras importantes</h2>
            <dl className="mt-3 grid gap-2 sm:grid-cols-2">
              {simple.words.map((word) => (
                <div key={word.term} className="rounded-xl border border-line bg-raised/35 p-3">
                  <dt className="font-semibold">{word.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{word.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {simple.checks.length > 0 && (
          <section {...stageProps()} aria-label="Verifique a compreensão">
            <p className="kicker">Verificação</p>
            <h2 className="mt-1 text-xl">Você entendeu?</h2>
            <p className="mt-1 text-sm text-muted">Responda e leia a explicação de cada item.</p>
            <ul className="mt-3 space-y-2">
              {simple.checks.map((item, index) => <TrueFalseCheck key={item.statement + index} item={item} />)}
            </ul>
          </section>
        )}

        <section {...stageProps()} data-learn-complete aria-label="Próximo passo">
          <p className="kicker">Próximo passo</p>
          <h2 className="mt-1 text-xl">Agora coloque o conceito em prática</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">O trecho fica marcado como estudado quando você chega a esta etapa.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link to={`/pratica/${chapterId}/${sectionId}`} className="btn-primary flex-1">
              <Icon name="chama" size={18} /> Praticar agora
            </Link>
            <Link to={`/capitulo/${chapterId}#${sectionId}`} className="btn-ghost flex-1 text-sm">
              <Icon name="lista" size={16} /> Material de referência
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
