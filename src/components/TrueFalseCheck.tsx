import { useState } from 'react';
import { useFx } from '@/app/fx';

export interface TrueFalseItem {
  statement: string;
  answer: boolean;
  why: string;
}

/** Verificação imediata de compreensão, sem vínculo com a narrativa antiga. */
export function TrueFalseCheck({ item }: { item: TrueFalseItem }) {
  const [pick, setPick] = useState<boolean>();
  const { sfx } = useFx();
  const done = pick !== undefined;
  const ok = pick === item.answer;

  return (
    <li className={`rounded-xl border p-3 transition ${done ? (ok ? 'border-ok/50 bg-ok/10' : 'border-bad/50 bg-bad/10') : 'border-line bg-surface'}`}>
      <p className="text-[0.95em] leading-relaxed">{item.statement}</p>
      {!done ? (
        <div className="mt-3 flex gap-2">
          {[true, false].map((value) => (
            <button
              key={String(value)}
              type="button"
              className="min-h-10 flex-1 rounded-xl border border-line bg-raised/60 px-3 py-2 text-sm font-semibold transition hover:bg-raised"
              onClick={() => { setPick(value); sfx(value === item.answer ? 'ok' : 'bad'); }}
            >
              {value ? 'Verdadeiro' : 'Falso'}
            </button>
          ))}
        </div>
      ) : (
        <p className={`mt-3 text-sm leading-relaxed ${ok ? 'text-ok' : 'text-bad'}`}>
          <b>{ok ? 'Correto.' : 'Vamos corrigir.'}</b> {item.answer ? 'A afirmação é verdadeira.' : 'A afirmação é falsa.'} {item.why}
        </p>
      )}
    </li>
  );
}
