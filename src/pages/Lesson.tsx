import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { getLesson, getQuestion } from '@/content';
import { Markdown } from '@/components/Markdown';
import { QuestionCard } from '@/components/QuestionCard';
import { completeLesson, recordAnswer, totalXp } from '@/lib/study';

type Phase = { k: 'cards'; i: number } | { k: 'q'; i: number } | { k: 'done' };

export function LessonPage() {
  const { id = '' } = useParams();
  const lesson = getLesson(id);
  const { data, update } = useStudy();
  const startXp = useRef(totalXp(data));
  const [phase, setPhase] = useState<Phase>({ k: 'cards', i: 0 });
  const [results, setResults] = useState<Record<string, boolean>>({});
  const qs = useMemo(() => lesson?.questionIds.map((q) => getQuestion(q)!).filter(Boolean) ?? [], [lesson]);

  if (!lesson) return <p>Lição não encontrada.</p>;
  const correct = Object.values(results).filter(Boolean).length;
  const score = qs.length ? Math.round((correct / qs.length) * 100) : 0;
  const progress = phase.k === 'cards' ? 0 : phase.k === 'q' ? phase.i / qs.length : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to={`/capitulo/${lesson.chapterId}`} className="text-xl text-muted" aria-label="Sair da lição">
          ✕
        </Link>
        <div className="h-2 flex-1 rounded bg-raised">
          <div className="h-2 rounded bg-gold transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {phase.k === 'cards' && (
        <section className="manuscript rounded-lg p-5">
          <p className="font-display text-xs uppercase tracking-widest text-gold">
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
              }
            }}
          />
        </>
      )}

      {phase.k === 'done' && (
        <section className="card space-y-3 p-5 text-center">
          <p className="font-display text-xs uppercase tracking-widest text-gold">Lição concluída</p>
          <h1 className="text-2xl">{score}%</h1>
          <p className="text-muted">
            {correct} de {qs.length} corretas · +{totalXp(data) - startXp.current} XP
          </p>
          <p className="text-sm text-muted">XP só é concedido na primeira vez que cada conquista acontece; refazer a lição serve para fixar, não para acumular pontos.</p>
          <ul className="space-y-1 text-left text-sm">
            {qs.map((q, i) => (
              <li key={q.id} className={results[q.id] ? 'text-ok' : 'text-bad'}>
                {results[q.id] ? '✔' : '✘'} Questão {i + 1}: {q.stem.slice(0, 70)}…
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
