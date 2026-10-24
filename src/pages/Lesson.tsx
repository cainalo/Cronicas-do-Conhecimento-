import { useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { getLesson, getQuestion } from '@/content';
import { Markdown } from '@/components/Markdown';
import { QuestionCard } from '@/components/QuestionCard';
import { completeLesson, recordAnswer, totalXp } from '@/lib/study';
import { Icon } from '@/components/Icon';
import { StepGuide } from '@/components/StepGuide';
import { useSession } from '@/app/useSession';
import { useFx } from '@/app/fx';
import { Mascot, SpeechBubble } from '@/components/Mascot';

type Phase = { k: 'cards'; i: number } | { k: 'q'; i: number } | { k: 'done' };

export function LessonPage() {
  const { id = '' } = useParams();
  const lesson = getLesson(id);
  const { data, update } = useStudy();
  const { confetti, sfx } = useFx();
  const startXp = useRef(totalXp(data));
  const qs = useMemo(() => lesson?.questionIds.map((q) => getQuestion(q)!).filter(Boolean) ?? [], [lesson]);
  // Ponto exato (cartão ou questão e respostas já dadas) guardado para retomar depois.
  const session = useSession<{ phase: Phase; results: Record<string, boolean> }>(
    id,
    () => ({ phase: { k: 'cards', i: 0 }, results: {} }),
    (s) => (s.phase.k === 'q' ? `Desafio: questão ${s.phase.i + 1} de ${qs.length}` : s.phase.k === 'cards' ? `Desafio: cartão ${s.phase.i + 1}` : 'Desafio concluído'),
  );
  const saved = session.state;
  const phase: Phase = saved.phase;
  // Ao reabrir: se a questão atual já tinha sido respondida antes de sair, segue para a próxima
  // (assim a mesma resposta não é registrada duas vezes).
  useEffect(() => {
    const pq = saved.phase.k === 'q' ? qs[saved.phase.i] : undefined;
    if (session.resumed && pq && pq.id in saved.results && saved.phase.k === 'q' && saved.phase.i + 1 < qs.length) setPhase({ k: 'q', i: saved.phase.i + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const results = saved.results;
  const setPhase = (p: Phase) => session.setState((s) => ({ ...s, phase: p }));
  const setResults = (f: (r: Record<string, boolean>) => Record<string, boolean>) => session.setState((s) => ({ ...s, results: f(s.results) }));

  if (!lesson) return <p>Lição não encontrada.</p>;
  const correct = Object.values(results).filter(Boolean).length;
  const score = qs.length ? Math.round((correct / qs.length) * 100) : 0;
  const progress = phase.k === 'cards' ? 0 : phase.k === 'q' ? phase.i / qs.length : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to={`/capitulo/${lesson.chapterId}`} className="text-xl text-muted" aria-label="Sair da lição">
          <Icon name="sair" size={22} />
        </Link>
        <div className="meter flex-1">
          <span className="transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {phase.k === 'cards' && phase.i === 0 && <StepGuide chapterId={lesson.chapterId} current="desafio" open />}

      {phase.k === 'cards' && (
        <section className="manuscript p-5">
          <p className="rubric font-display text-lg">
            {lesson.title} · {phase.i + 1}/{lesson.cards.length}
          </p>
          <h1 className="mt-2 text-xl">{lesson.cards[phase.i].title}</h1>
          <div className="prose-manuscript mt-3">
            <Markdown>{lesson.cards[phase.i].body}</Markdown>
          </div>
          <div className="mt-4 flex gap-2">
            {phase.i > 0 && (
              <button className="btn-ghost" onClick={() => setPhase({ k: 'cards', i: phase.i - 1 })}>
                Voltar
              </button>
            )}
            <button
              className="btn-primary flex-1"
              onClick={() => setPhase(phase.i + 1 < lesson.cards.length ? { k: 'cards', i: phase.i + 1 } : { k: 'q', i: 0 })}
            >
              {phase.i + 1 < lesson.cards.length ? 'Próximo' : 'Começar questões'}
            </button>
          </div>
          {phase.i === 0 && <p className="mt-3 text-xs opacity-70">Objetivo: {lesson.goal}</p>}
        </section>
      )}

      {phase.k === 'q' && (
        <>
          <p className="text-sm text-muted">
            Questão {phase.i + 1} de {qs.length}
          </p>
          <QuestionCard
            key={qs[phase.i].id}
            question={qs[phase.i]}
            onAnswer={(sel) => {
              const q = qs[phase.i];
              setResults((r) => ({ ...r, [q.id]: sel === q.answer }));
              update((d) => recordAnswer(d, q, sel, 'lesson', lesson.id).data);
            }}
            nextLabel={phase.i + 1 < qs.length ? 'Próxima questão' : 'Ver resultado'}
            onNext={() => {
              if (phase.i + 1 < qs.length) {
                setPhase({ k: 'q', i: phase.i + 1 });
                window.scrollTo(0, 0);
              } else {
                const finalScore = Math.round((Object.values(results).filter(Boolean).length / qs.length) * 100);
                update((d) => completeLesson(d, lesson, finalScore).data);
                setPhase({ k: 'done' });
                session.finish();
                window.scrollTo(0, 0);
                sfx('done');
                if (finalScore >= 70) confetti(finalScore === 100 ? 120 : 70);
              }
            }}
          />
        </>
      )}

      {phase.k === 'done' && (
        <section className="card space-y-3 p-5 text-center">
          <div className="flex items-end justify-center gap-2">
            <Mascot mood={score >= 70 ? 'cheer' : score >= 40 ? 'talk' : 'sad'} size={92} />
            <SpeechBubble className="mb-8 max-w-[14rem] text-left anim-toast-in">
              {score === 100
                ? 'Perfeito! Nem uma vírgula fora do lugar.'
                : score >= 70
                  ? 'Muito bem! O Tribunal ficaria orgulhoso.'
                  : score >= 40
                    ? 'Bom começo. Revise os erros e volte mais forte.'
                    : 'Toda grande obra começa com rascunhos. Vamos revisar juntos?'}
            </SpeechBubble>
          </div>
          <p className="rubric text-sm font-semibold">Lição concluída</p>
          <h1 className="font-display text-5xl">{score}%</h1>
          <p className="text-muted">
            {correct} de {qs.length} corretas · +{totalXp(data) - startXp.current} XP
          </p>
          <p className="text-sm text-muted">Cada conquista rende XP uma única vez. Refazer a lição ajuda a fixar o conteúdo, mas não soma pontos de novo.</p>
          <ul className="space-y-1 text-left text-sm">
            {qs.map((q, i) => (
              <li key={q.id} className={results[q.id] ? 'text-ok' : 'text-bad'}>
                <Icon name={results[q.id] ? 'certo' : 'errado'} size={16} className="mr-1 inline align-[-2px]" />Questão {i + 1}: {q.stem.slice(0, 70)}…
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {correct < qs.length && (
              <Link to="/revisao" className="btn-primary flex-1">
                Revisar erros
              </Link>
            )}
            <Link to="/" className="btn-ghost flex-1">
              Voltar à Torre
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
