// Componente único que mostra qualquer atividade de missão, cuida da resposta, corrige e explica.
// Os estados (selecionado, certo, errado) aparecem com ícone e texto, não só com cor. Depois de um
// erro, se a atividade tiver uma variante, o aluno pode tentar uma parecida com outros dados.
import { useMemo, useState, type ReactNode } from 'react';
import type { Question } from '@/content/types';
import { ERROR_LABEL, gradeChoice, gradeMulti, gradeOrder, gradeSort, shuffled, type MissionActivity } from '@/lib/activities';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';

export interface ActivityOutcome {
  ok: boolean;
  /** Variante para nova tentativa, quando o aluno pedir. */
  retry?: MissionActivity;
}

const LABEL: Record<MissionActivity['kind'], string> = {
  choice: 'Escolha a resposta',
  multi: 'Marque todas as corretas',
  order: 'Ponha em ordem',
  sort: 'Classifique',
  compare: 'Compare os cenários',
  fix: 'Ache o erro',
  tf: 'Verdadeiro ou falso',
  exam: 'Questão no estilo da prova',
};

function Opt({ children, state, onClick, disabled, pressed }: { children: ReactNode; state?: 'sel' | 'ok' | 'bad'; onClick?: () => void; disabled?: boolean; pressed?: boolean }) {
  const cls =
    state === 'ok' ? 'border-ok bg-ok/10' : state === 'bad' ? 'border-bad bg-bad/10' : state === 'sel' ? 'border-gold bg-gold/10' : 'border-line bg-surface hover:border-gold/60';
  return (
    <button type="button" disabled={disabled} aria-pressed={pressed} onClick={onClick} className={`flex w-full items-start gap-2 rounded-2xl border-2 px-3 py-2.5 text-left text-[0.95rem] leading-snug transition active:scale-[0.99] ${cls}`}>
      {state === 'ok' && <Icon name="certo" size={18} className="mt-0.5 shrink-0 text-ok" strokeWidth={2.6} />}
      {state === 'bad' && <Icon name="errado" size={18} className="mt-0.5 shrink-0 text-bad" strokeWidth={2.6} />}
      <span className="flex-1">{children}</span>
    </button>
  );
}

export function ActivityView({ a, question, onNext, onExamAnswer }: { a: MissionActivity; question?: Question; onNext: (o: ActivityOutcome) => void; onExamAnswer?: (q: Question, key: string) => void }) {
  const { sfx } = useFx();
  const [pick, setPick] = useState<number>();
  const [picks, setPicks] = useState<Set<number>>(new Set());
  const initialOrder = useMemo(() => (a.kind === 'order' ? shuffled(a.items, a.id.length * 7 + a.items.length) : []), [a]);
  const [order, setOrder] = useState<string[]>(initialOrder);
  const [assign, setAssign] = useState<(number | undefined)[]>(a.kind === 'sort' ? a.items.map(() => undefined) : []);
  const [result, setResult] = useState<{ ok: boolean; parts?: boolean[] }>();

  const ready =
    a.kind === 'multi' ? picks.size > 0 : a.kind === 'order' ? true : a.kind === 'sort' ? assign.every((x) => x !== undefined) : pick !== undefined;

  const check = () => {
    let g: { ok: boolean; parts?: boolean[] };
    switch (a.kind) {
      case 'choice':
      case 'compare':
        g = gradeChoice(a, pick!);
        break;
      case 'fix':
        g = { ok: pick === a.bug };
        break;
      case 'tf':
        g = { ok: (pick === 1) === a.answer };
        break;
      case 'multi':
        g = gradeMulti(a, picks);
        break;
      case 'order':
        g = gradeOrder(a, order);
        break;
      case 'sort':
        g = gradeSort(a, assign);
        break;
      case 'exam': {
        const key = question!.options[pick!].key;
        g = { ok: key === question!.answer };
        onExamAnswer?.(question!, key);
        break;
      }
    }
    setResult(g);
    sfx(g.ok ? 'ok' : 'bad');
  };

  const locked = !!result;
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const n = [...order];
    [n[i], n[j]] = [n[j], n[i]];
    setOrder(n);
  };

  // Explicação específica do resultado.
  const feedback = (): ReactNode => {
    if (!result) return null;
    switch (a.kind) {
      case 'choice':
        return (
          <>
            <p>{a.options[pick!].why}</p>
            {!result.ok && <p className="mt-1">Resposta certa: <b>{a.options[a.answer].text}</b>. {a.options[a.answer].why}</p>}
          </>
        );
      case 'compare':
        return <p>{result.ok ? '' : `A certa é a ${a.scenarios[a.answer].title}. `}{a.why}</p>;
      case 'fix':
        return (
          <p>
            {result.ok ? '' : `O erro está na linha ${a.bug + 1}. `}
            {a.why} Correção: <code className="rounded bg-black/5 px-1">{a.fixed}</code>
          </p>
        );
      case 'tf':
        return <p>É {a.answer ? 'verdadeiro' : 'falso'}. {a.why}</p>;
      case 'multi':
        return (
          <ul className="space-y-1">
            {a.options.map((o, i) => (!result.parts![i] || o.correct) && <li key={i}>{o.correct ? 'Correta' : 'Não serve'}: <b>{o.text}</b>. {o.why}</li>)}
          </ul>
        );
      case 'order':
        return (
          <>
            <p>{a.why}</p>
            {!result.ok && <ol className="ml-5 mt-1 list-decimal">{a.items.map((it) => <li key={it}><code>{it}</code></li>)}</ol>}
          </>
        );
      case 'sort':
        return (
          <ul className="space-y-1">
            {a.items.map((it, i) => (!result.parts![i] ? <li key={i}><b>{it.text}</b>: {a.categories[it.cat]}. {it.why}</li> : null))}
            {result.ok && <li>Todos no lugar certo.</li>}
          </ul>
        );
      case 'exam': {
        const q = question!;
        const chosen = q.options[pick!];
        return (
          <>
            <p>{chosen.comment}</p>
            <p className="mt-1">{q.explanation}</p>
          </>
        );
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <p className="text-sm font-semibold text-muted">{LABEL[a.kind]}</p>
        {a.kind === 'exam' && question ? (
          <>
            <p className="mt-1 inline-block rounded-full border border-line px-2 py-0.5 text-xs text-muted">
              Questão autoral no estilo da FCC, não aplicada em prova · {question.review === 'nao-revisado' ? 'não revisada por especialista' : 'revisada'}
            </p>
            <div className="prose-manuscript mb-3 mt-2 !text-[1rem] !font-sans">
              <Markdown>{question.stem}</Markdown>
            </div>
          </>
        ) : (
          <p className="mb-3 mt-1 font-display text-lg leading-snug">{a.prompt}</p>
        )}
        {a.context && (
          <div className="mb-3 rounded-2xl border border-line bg-raised/50 p-3 text-sm">
            <Markdown>{a.context}</Markdown>
          </div>
        )}

        {(a.kind === 'choice' || a.kind === 'exam') && (
          <div className="space-y-2">
            {(a.kind === 'choice' ? a.options.map((o) => o.text) : question!.options.map((o) => `${o.key}) ${o.text}`)).map((t, i) => {
              const right = a.kind === 'choice' ? i === a.answer : question!.options[i].key === question!.answer;
              return (
                <Opt key={i} disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={result ? (right ? 'ok' : pick === i ? 'bad' : undefined) : pick === i ? 'sel' : undefined}>
                  {t}
                </Opt>
              );
            })}
          </div>
        )}

        {a.kind === 'tf' && (
          <div className="grid grid-cols-2 gap-2">
            {['Falso', 'Verdadeiro'].map((t, i) => (
              <Opt key={t} disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={result ? ((i === 1) === a.answer ? 'ok' : pick === i ? 'bad' : undefined) : pick === i ? 'sel' : undefined}>
                {t}
              </Opt>
            ))}
          </div>
        )}

        {a.kind === 'multi' && (
          <div className="space-y-2">
            {a.options.map((o, i) => {
              const on = picks.has(i);
              return (
                <Opt
                  key={i}
                  disabled={locked}
                  pressed={on}
                  onClick={() => {
                    const n = new Set(picks);
                    if (on) n.delete(i);
                    else n.add(i);
                    setPicks(n);
                  }}
                  state={result ? (o.correct ? 'ok' : on ? 'bad' : undefined) : on ? 'sel' : undefined}
                >
                  <span className="mr-1 inline-block w-5 text-center font-bold">{on ? '☑' : '☐'}</span>
                  <code>{o.text}</code>
                </Opt>
              );
            })}
          </div>
        )}

        {a.kind === 'compare' && (
          <div className="grid gap-2 sm:grid-cols-2">
            {a.scenarios.map((s, i) => (
              <Opt key={i} disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={result ? (i === a.answer ? 'ok' : pick === i ? 'bad' : undefined) : pick === i ? 'sel' : undefined}>
                <b className="block">{s.title}</b>
                <div className="text-sm [&_pre]:!my-1 [&_pre]:!p-2">
                  <Markdown>{s.body}</Markdown>
                </div>
              </Opt>
            ))}
          </div>
        )}

        {a.kind === 'fix' && (
          <div className="overflow-hidden rounded-2xl border-2 border-line bg-[#1b2120] font-mono text-sm text-[#e6e1d3]">
            {a.lines.map((l, i) => (
              <button
                key={i}
                type="button"
                disabled={locked}
                aria-pressed={pick === i}
                onClick={() => setPick(i)}
                className={`flex w-full gap-3 px-3 py-2 text-left ${result && i === a.bug ? 'bg-bad/40' : pick === i ? 'bg-[#2c5f6e]/70' : 'hover:bg-white/5'}`}
              >
                <span className="w-4 text-right opacity-50">{i + 1}</span>
                <span className="flex-1">{l}</span>
                {result && i === a.bug && <span className="text-xs">erro</span>}
              </button>
            ))}
          </div>
        )}

        {a.kind === 'order' && (
          <ol className="space-y-2">
            {order.map((it, i) => (
              <li key={it} className={`flex items-center gap-2 rounded-2xl border-2 bg-surface px-2 py-2 ${result ? (result.parts![i] ? 'border-ok' : 'border-bad') : 'border-line'}`}>
                <span className="w-5 text-center text-sm font-bold text-muted">{i + 1}</span>
                <code className="flex-1 text-sm">{it}</code>
                {!locked && (
                  <span className="flex flex-col">
                    <button type="button" className="grid h-7 w-8 place-items-center rounded-lg hover:bg-raised disabled:opacity-30" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Subir "${it}"`}>
                      ▲
                    </button>
                    <button type="button" className="grid h-7 w-8 place-items-center rounded-lg hover:bg-raised disabled:opacity-30" disabled={i === order.length - 1} onClick={() => move(i, 1)} aria-label={`Descer "${it}"`}>
                      ▼
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}

        {a.kind === 'sort' && (
          <ul className="space-y-3">
            {a.items.map((it, i) => (
              <li key={i} className={`rounded-2xl border-2 bg-surface p-2 ${result ? (result.parts![i] ? 'border-ok' : 'border-bad') : 'border-line'}`}>
                <code className="block px-1 text-sm">{it.text}</code>
                <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Categoria de ${it.text}`}>
                  {a.categories.map((c, k) => (
                    <button
                      key={c}
                      type="button"
                      disabled={locked}
                      aria-pressed={assign[i] === k}
                      onClick={() => setAssign(assign.map((x, j) => (j === i ? k : x)))}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${assign[i] === k ? 'border-gold bg-gold text-white' : 'border-line hover:border-gold/60'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!result ? (
        <div className="sticky bottom-0 mt-4 bg-bg pb-2 pt-2">
          <button className="btn-primary w-full" disabled={!ready} onClick={check}>
            Verificar
          </button>
        </div>
      ) : (
        <div className={`anim-toast-in sticky bottom-0 -mx-4 mt-4 rounded-t-[1.6rem] px-4 pb-4 pt-4 sm:-mx-6 sm:px-6 ${result.ok ? 'bg-[#d9eadf] text-[#173d29]' : 'bg-[#f3dcd5] text-[#5c1d12]'}`} role="status">
          <p className="flex items-center gap-2 text-lg font-bold">
            <Icon name={result.ok ? 'certo' : 'errado'} size={22} strokeWidth={2.6} /> {result.ok ? 'Correto' : 'Ainda não'}
          </p>
          {!result.ok && a.errorKind && <p className="text-xs font-semibold opacity-80">Tipo de erro provável: {ERROR_LABEL[a.errorKind]}</p>}
          <div className="mt-1 text-sm leading-snug">{feedback()}</div>
          <div className="mt-3 flex gap-2">
            {!result.ok && a.variant && (
              <button className="flex-1 rounded-full border-2 border-current px-4 py-2.5 text-sm font-bold" onClick={() => onNext({ ok: false, retry: a.variant })}>
                Tentar uma parecida
              </button>
            )}
            <button className={`flex-1 rounded-full px-5 py-3 font-bold text-white shadow-md ${result.ok ? 'bg-[#28744a]' : 'bg-[#a6372a]'}`} onClick={() => onNext({ ok: result.ok })}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
