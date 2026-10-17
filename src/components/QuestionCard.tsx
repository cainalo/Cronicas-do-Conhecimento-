import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Question } from '@/content/types';
import { getChapter } from '@/content';
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';

const originLabel: Record<Question['origin'], string> = {
  autoral: 'Questão autoral (não oficial)',
  oficial: 'Questão oficial',
  'gerada-nao-revisada': 'Gerada, não revisada',
};

interface Props {
  question: Question;
  onAnswer: (selected: string) => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function QuestionCard({ question: q, onAnswer, onNext, nextLabel = 'Continuar' }: Props) {
  const [selected, setSelected] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);
  const correct = selected === q.answer;
  const chapter = getChapter(q.chapterId);
  const section = chapter?.sections.find((s) => s.id === q.sectionId);
  const { sfx } = useFx();

  return (
    <article className={`card p-4 ${confirmed ? (correct ? 'pop' : 'anim-shake') : ''}`} aria-live="polite">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="chip">{originLabel[q.origin]}</span>
        <span className="chip">{['Fácil', 'Média', 'Difícil'][q.difficulty - 1]}</span>
      </div>
      <p className="mb-4 text-[1.05rem] leading-relaxed">{q.stem}</p>
      <ol className="space-y-2">
        {q.options.map((o) => {
          const isSel = selected === o.key;
          const state = !confirmed ? (isSel ? 'sel' : '') : o.key === q.answer ? 'ok' : isSel ? 'bad' : 'dim';
          const cls = {
            '': 'border-line/50 hover:border-gold/40 hover:bg-raised/50',
            sel: 'border-gold bg-gold/10 shadow-[inset_0_0_0_1px_rgb(var(--gold))]',
            ok: 'pop border-ok bg-ok/10 shadow-[inset_0_0_0_1px_rgb(var(--ok))]',
            bad: 'border-bad bg-bad/10',
            dim: 'border-line/40 opacity-60',
          }[state];
          return (
            <li key={o.key}>
              <button
                type="button"
                disabled={confirmed}
                onClick={() => setSelected(o.key)}
                aria-pressed={isSel}
                className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition duration-150 active:scale-[0.99] ${cls}`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold transition ${
                    state === 'ok' ? 'bg-ok text-white' : state === 'bad' ? 'bg-bad text-white' : state === 'sel' ? 'bg-gold text-white' : 'bg-raised text-muted'
                  }`}
                >
                  {o.key}
                </span>
                <span className="flex-1">
                  {o.text}
                  {confirmed && (o.key === q.answer || isSel) && (
                    <span className={`mt-1 block text-sm ${o.key === q.answer ? 'text-ok' : 'text-bad'}`}>{o.comment}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {!confirmed ? (
        <button
          type="button"
          className="btn-primary mt-4 w-full"
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            setConfirmed(true);
            sfx(selected === q.answer ? 'ok' : 'bad');
            onAnswer(selected);
          }}
        >
          Confirmar resposta
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className={`font-display text-lg ${correct ? 'text-ok' : 'text-bad'}`}>
            <Icon name={correct ? 'certo' : 'errado'} className="mr-1 inline align-[-3px]" />
            {correct ? 'Correto' : `Resposta correta: ${q.answer}`}
          </p>
          <div className="rounded-xl bg-raised p-3 text-[0.98rem] leading-relaxed">{q.explanation}</div>
          <details className="rounded-xl border border-line p-3 text-sm">
            <summary className="cursor-pointer text-muted">Comentário de todas as alternativas</summary>
            <ul className="mt-2 space-y-1">
              {q.options.map((o) => (
                <li key={o.key}>
                  <b className={o.key === q.answer ? 'text-ok' : ''}>{o.key})</b> {o.comment}
                </li>
              ))}
            </ul>
          </details>
          {chapter && section && (
            <Link to={`/capitulo/${chapter.id}#${section.id}`} className="rubric block underline">
              Estudar no grimório: {section.title}
            </Link>
          )}
          {onNext && (
            <button type="button" className="btn-primary w-full" onClick={onNext}>
              {nextLabel}
            </button>
          )}
        </div>
      )}
    </article>
  );
}
