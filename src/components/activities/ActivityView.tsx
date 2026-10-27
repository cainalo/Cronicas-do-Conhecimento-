// Componente único que mostra qualquer atividade de missão, cuida da resposta, corrige e explica.
// Os estados (selecionado, certo, errado) aparecem com ícone e texto, não só com cor. Depois de um
// erro, se a atividade tiver uma variante, o aluno pode tentar uma parecida com outros dados.
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Question } from '@/content/types';
import { ERROR_LABEL, gradeChoice, gradeMulti, gradeOrder, gradeSort, type MissionActivity } from '@/lib/activities';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';
import { ContentFlow, PageDots, type ContentItem } from '@/components/ContentFlow';

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


function randomShuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function randomizeQuestionOptions(question: Question): Question {
  const letters = ['A', 'B', 'C', 'D', 'E'] as const;
  // Preserve the identity of the correct option, not just its text: two distractors
  // can legitimately share similar wording, and text matching could move the key.
  const tagged = randomShuffle(question.options.map((option) => ({
    option,
    correct: option.key === question.answer,
  })));
  const options = tagged.map(({ option }, index) => ({ ...option, key: letters[index] }));
  const correctIndex = tagged.findIndex((item) => item.correct);
  return { ...question, options, answer: letters[Math.max(0, correctIndex)] };
}

/** Randomiza as alternativas sem perder o vínculo entre a resposta e a opção correta. */
function randomizeActivityOptions(activity: MissionActivity): MissionActivity {
  if (activity.kind === 'choice') {
    const tagged = randomShuffle(activity.options.map((value, index) => ({ value, index })));
    return { ...activity, options: tagged.map((x) => x.value), answer: tagged.findIndex((x) => x.index === activity.answer) };
  }
  if (activity.kind === 'compare') {
    const tagged = randomShuffle(activity.scenarios.map((value, index) => ({ value, index })));
    return { ...activity, scenarios: tagged.map((x) => x.value), answer: tagged.findIndex((x) => x.index === activity.answer) };
  }
  if (activity.kind === 'multi') return { ...activity, options: randomShuffle(activity.options) };
  if (activity.kind === 'sort') return { ...activity, items: randomShuffle(activity.items) };
  return activity;
}

export function ActivityView({
  a,
  question,
  onNext,
  onExamAnswer,
  fit,
}: {
  a: MissionActivity;
  question?: Question;
  onNext: (o: ActivityOutcome) => void;
  onExamAnswer?: (q: Question, key: string) => void;
  /** Ocupa a altura disponível sem rolagem vertical (partes lado a lado). */
  fit?: boolean;
}) {
  const { sfx } = useFx();
  const box = useRef<HTMLDivElement>(null);
  const [boxH, setBoxH] = useState(0);
  // A ordem é sorteada uma vez por montagem da atividade, sem mudar durante a resposta.
  const displayA = useMemo(() => randomizeActivityOptions(a), [a]);
  const displayQuestion = useMemo(
    () => question ? randomizeQuestionOptions(question) : undefined,
    [question],
  );
  const tfOptions = useMemo(() => randomShuffle(['f', 'v']), [displayA]);
  useLayoutEffect(() => {
    if (fit && box.current) setBoxH(box.current.clientHeight);
  }, [fit]);
  const [pick, setPick] = useState<number>();
  const [picks, setPicks] = useState<Set<number>>(new Set());
  const initialOrder = useMemo(() => (displayA.kind === 'order' ? randomShuffle(displayA.items) : []), [displayA]);
  const [order, setOrder] = useState<string[]>(initialOrder);
  const [assign, setAssign] = useState<(number | undefined)[]>(displayA.kind === 'sort' ? displayA.items.map(() => undefined) : []);
  const [result, setResult] = useState<{ ok: boolean; parts?: boolean[] }>();

  const ready =
    displayA.kind === 'multi' ? picks.size > 0 : displayA.kind === 'order' ? true : displayA.kind === 'sort' ? assign.every((x) => x !== undefined) : pick !== undefined;

  const check = () => {
    let g: { ok: boolean; parts?: boolean[] };
    switch (displayA.kind) {
      case 'choice':
      case 'compare':
        g = gradeChoice(displayA, pick!);
        break;
      case 'fix':
        g = { ok: pick === displayA.bug };
        break;
      case 'tf':
        g = { ok: (tfOptions[pick!] === 'v') === displayA.answer };
        break;
      case 'multi':
        g = gradeMulti(displayA, picks);
        break;
      case 'order':
        g = gradeOrder(displayA, order);
        break;
      case 'sort':
        g = gradeSort(displayA, assign);
        break;
      case 'exam': {
        const key = displayQuestion!.options[pick!].key;
        g = { ok: key === displayQuestion!.answer };
        onExamAnswer?.(displayQuestion!, key);
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

  // Explicação específica do resultado, em blocos (no modo sem rolagem, cada bloco pode ir para uma parte).
  const feedback = (): ReactNode[] => {
    if (!result) return [];
    switch (displayA.kind) {
      case 'choice':
        return [
          <p key="w">{displayA.options[pick!].why}</p>,
          !result.ok && (
            <p key="c">
              Resposta certa: <b>{displayA.options[displayA.answer].text}</b>. {displayA.options[displayA.answer].why}
            </p>
          ),
        ].filter(Boolean) as ReactNode[];
      case 'compare':
        return [
          <p key="w">
            {result.ok ? '' : `A certa é a ${displayA.scenarios[displayA.answer].title}. `}
            {displayA.why}
          </p>,
        ];
      case 'fix':
        return [
          <p key="w">
            {result.ok ? '' : `O erro está na linha ${displayA.bug + 1}. `}
            {displayA.why} Correção: <code className="rounded bg-black/5 px-1">{displayA.fixed}</code>
          </p>,
        ];
      case 'tf':
        return [
          <p key="w">
            É {displayA.answer ? 'verdadeiro' : 'falso'}. {displayA.why}
          </p>,
        ];
      case 'multi':
        return displayA.options
          .map((o, i) =>
            !result.parts![i] || o.correct ? (
              <p key={i}>
                {o.correct ? 'Correta' : 'Não serve'}: <b>{o.text}</b>. {o.why}
              </p>
            ) : null,
          )
          .filter(Boolean) as ReactNode[];
      case 'order':
        // Cada item da ordem certa é um bloco: a correção pode ir para outra parte sem cortar a listdisplayA.
        return [
          <p key="w">{displayA.why}</p>,
          ...(result.ok
            ? []
            : [
                <p key="h" className="font-semibold">
                  Ordem certa:
                </p>,
                ...displayA.items.map((it, i) => (
                  <p key={`o${i}`}>
                    {i + 1}. <code>{it}</code>
                  </p>
                )),
              ]),
        ];
      case 'sort':
        return result.ok
          ? [<p key="ok">Todos no lugar certo.</p>]
          : (displayA.items
              .map((it, i) =>
                !result.parts![i] ? (
                  <p key={i}>
                    <b>{it.text}</b>: {displayA.categories[it.cat]}. {it.why}
                  </p>
                ) : null,
              )
              .filter(Boolean) as ReactNode[]);
      case 'exam': {
        const q = displayQuestion!;
        const chosen = q.options[pick!];
        return [<p key="c">{chosen.comment}</p>, <p key="e">{q.explanation}</p>];
      }
    }
  };

  const st = (right: boolean, mine: boolean): 'sel' | 'ok' | 'bad' | undefined => (result ? (right ? 'ok' : mine ? 'bad' : undefined) : mine ? 'sel' : undefined);

  // Cabeçalho, enunciado e contexto.
  const head: ContentItem[] = [];
  if (displayA.kind === 'exam' && displayQuestion) {
    head.push({
      key: 'label',
      node: (
        <div>
          <p className="text-sm font-semibold text-muted">{LABEL[displayA.kind]}</p>
          <p className="mt-1 inline-block rounded-full border border-line px-2 py-0.5 text-xs text-muted">
            Questão autoral no estilo da FCC, não aplicada em prova · {displayQuestion.review === 'nao-revisado' ? 'não revisada por especialista' : 'revisada'}
          </p>
        </div>
      ),
    });
    head.push({ key: 'stem', md: displayQuestion.stem, wrap: (c) => <div className="prose-content !font-sans !text-[1rem] [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">{c}</div> });
  } else {
    head.push({
      key: 'label',
      node: (
        <div>
          <p className="text-sm font-semibold text-muted">{LABEL[displayA.kind]}</p>
          <p className="mt-1 font-display text-lg leading-snug">{displayA.prompt}</p>
        </div>
      ),
    });
  }
  if (displayA.context) {
    head.push({
      key: 'ctx',
      md: displayA.context,
      wrap: (c, cont) => (
        <div className="rounded-2xl border border-line bg-raised/50 p-3 text-sm [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">
          {cont && <p className="mb-1 text-xs text-muted">(continuação)</p>}
          {c}
        </div>
      ),
    });
  }

  // Alternativas: cada uma é um item inteiro (nunca cortado ao meio).
  const opts: ContentItem[] = [];
  if (displayA.kind === 'choice' || displayA.kind === 'exam') {
    (displayA.kind === 'choice' ? displayA.options.map((o) => o.text) : displayQuestion!.options.map((o) => `${o.key}) ${o.text}`)).forEach((t, i) => {
      const right = displayA.kind === 'choice' ? i === displayA.answer : displayQuestion!.options[i].key === displayQuestion!.answer;
      opts.push({
        key: `o${i}`,
        node: (
          <Opt disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={st(right, pick === i)}>
            {t}
          </Opt>
        ),
      });
    });
  }
  if (displayA.kind === 'tf') {
    opts.push({
      key: 'tf',
      node: (
        <div className="grid grid-cols-2 gap-2">
          {tfOptions.map((v, i) => (
            <Opt key={v} disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={st((v === 'v') === displayA.answer, pick === i)}>
              {v === 'v' ? 'Verdadeiro' : 'Falso'}
            </Opt>
          ))}
        </div>
      ),
    });
  }
  if (displayA.kind === 'multi') {
    displayA.options.forEach((o, i) => {
      const on = picks.has(i);
      opts.push({
        key: `m${i}`,
        node: (
          <Opt
            disabled={locked}
            pressed={on}
            onClick={() => {
              const n = new Set(picks);
              if (on) n.delete(i);
              else n.add(i);
              setPicks(n);
            }}
            state={st(o.correct, on)}
          >
            <span className="mr-1 inline-block w-5 text-center font-bold">{on ? '☑' : '☐'}</span>
            <code>{o.text}</code>
          </Opt>
        ),
      });
    });
  }
  if (displayA.kind === 'compare') {
    displayA.scenarios.forEach((sc, i) =>
      opts.push({
        key: `c${i}`,
        node: (
          <Opt disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={st(i === displayA.answer, pick === i)}>
            <b className="block">{sc.title}</b>
            <div className="text-sm [&_pre]:!my-1 [&_pre]:!p-2">
              <Markdown>{sc.body}</Markdown>
            </div>
          </Opt>
        ),
      }),
    );
  }
  if (displayA.kind === 'fix') {
    opts.push({
      key: 'fix',
      node: (
        <div className="overflow-hidden rounded-2xl border-2 border-line bg-[#1b2120] font-mono text-sm text-[#e6e1d3]">
          {displayA.lines.map((l, i) => (
            <button
              key={i}
              type="button"
              disabled={locked}
              aria-pressed={pick === i}
              onClick={() => setPick(i)}
              className={`flex w-full gap-3 px-3 py-2 text-left ${result && i === displayA.bug ? 'bg-bad/40' : pick === i ? 'bg-[#2c5f6e]/70' : 'hover:bg-white/5'}`}
            >
              <span className="w-4 text-right opacity-50">{i + 1}</span>
              <span className="flex-1">{l}</span>
              {result && i === displayA.bug && <span className="text-xs">erro</span>}
            </button>
          ))}
        </div>
      ),
    });
  }
  if (displayA.kind === 'order') {
    order.forEach((it, i) =>
      opts.push({
        key: `r${i}`,
        node: (
          <div role="listitem" aria-label={`${i + 1}º: ${it}`} className={`flex items-center gap-2 rounded-2xl border-2 bg-surface px-2 py-2 ${result ? (result.parts![i] ? 'border-ok' : 'border-bad') : 'border-line'}`}>
            <span className="w-5 text-center text-sm font-bold text-muted">{i + 1}</span>
            <code className="flex-1 text-sm">{it}</code>
            {!locked && (
              <span className="flex flex-col">
                <button type="button" className="grid h-7 w-8 place-items-center rounded-lg hover:bg-raised disabled:opacity-30" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Subir "${it}"`}>
                  ▲
                </button>
                <button
                  type="button"
                  className="grid h-7 w-8 place-items-center rounded-lg hover:bg-raised disabled:opacity-30"
                  disabled={i === order.length - 1}
                  onClick={() => move(i, 1)}
                  aria-label={`Descer "${it}"`}
                >
                  ▼
                </button>
              </span>
            )}
          </div>
        ),
      }),
    );
  }
  if (displayA.kind === 'sort') {
    displayA.items.forEach((it, i) =>
      opts.push({
        key: `s${i}`,
        node: (
          <div className={`rounded-2xl border-2 bg-surface p-2 ${result ? (result.parts![i] ? 'border-ok' : 'border-bad') : 'border-line'}`}>
            <code className="block px-1 text-sm">{it.text}</code>
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Categoria de ${it.text}`}>
              {displayA.categories.map((c, k) => (
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
          </div>
        ),
      }),
    );
  }

  const renderMd = (md: string) => <Markdown>{md}</Markdown>;
  const verdictTitle = (
    <>
      <p className="flex items-center gap-2 text-lg font-bold">
        <Icon name={result?.ok ? 'certo' : 'errado'} size={22} strokeWidth={2.6} /> {result?.ok ? 'Correto' : 'Ainda não'}
      </p>
      {result && !result.ok && displayA.errorKind && <p className="text-xs font-semibold opacity-80">Tipo de erro provável: {ERROR_LABEL[displayA.errorKind]}</p>}
    </>
  );
  const verdictButtons = result && (
    <div className="mt-3 flex gap-2">
      {!result.ok && displayA.variant && (
        <button className="flex-1 rounded-full border-2 border-current px-4 py-2.5 text-sm font-bold" onClick={() => onNext({ ok: false, retry: displayA.variant })}>
          Tentar uma parecida
        </button>
      )}
      <button className={`flex-1 rounded-full px-5 py-3 font-bold text-white shadow-md ${result.ok ? 'bg-[#28744a]' : 'bg-[#a6372a]'}`} onClick={() => onNext({ ok: result.ok })}>
        Continuar
      </button>
    </div>
  );
  const sheetCls = result ? (result.ok ? 'bg-[#d9eadf] text-[#173d29]' : 'bg-[#f3dcd5] text-[#5c1d12]') : '';

  if (fit) {
    // Sem rolagem vertical: enunciado e alternativas em partes lado a lado; a correção abre por cima,
    // também em partes quando é longdisplayA.
    const fb = feedback().map((n, i) => ({ key: `f${i}`, node: n }));
    return (
      <div ref={box} className="relative flex min-h-0 flex-1 flex-col">
        <ContentFlow items={[...head, ...opts]} layoutKey={`${displayA.id}:${result ? 'r' : 'q'}`} renderMd={renderMd} gap={8} label="Atividade" footer={(s) => <PageDots {...s} />} />
        {!result ? (
          <div className="pt-2">
            <button className="btn-primary w-full" disabled={!ready} onClick={check}>
              Verificar
            </button>
          </div>
        ) : (
          <div
            className={`anim-toast-in fixed inset-x-0 bottom-0 z-40 rounded-t-[1.6rem] px-4 pt-3 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.45)] sm:px-6 ${sheetCls}`}
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            role="status"
          >
            <div className="mx-auto max-w-3xl">
            {verdictTitle}
            <div className="mt-1 text-sm leading-snug">
              <ContentFlow
                items={fb}
                layoutKey={`${displayA.id}:fb`}
                renderMd={renderMd}
                maxHeight={Math.max(120, Math.round(boxH * 0.42))}
                gap={6}
                label="Explicação da correção"
                footer={(s) => <PageDots {...s} />}
              />
            </div>
            {verdictButtons}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2" role={displayA.kind === 'order' ? 'list' : undefined}>
        {[...head, ...opts].map((it) => (
          <div key={it.key}>{it.md !== undefined ? (it.wrap ? it.wrap(renderMd(it.md), false) : renderMd(it.md)) : it.node}</div>
        ))}
      </div>

      {!result ? (
        <div className="sticky bottom-0 mt-4 bg-bg pb-2 pt-2">
          <button className="btn-primary w-full" disabled={!ready} onClick={check}>
            Verificar
          </button>
        </div>
      ) : (
        <div className={`anim-toast-in sticky bottom-0 -mx-4 mt-4 rounded-t-[1.6rem] px-4 pb-4 pt-4 sm:-mx-6 sm:px-6 ${sheetCls}`} role="status">
          {verdictTitle}
          <div className="mt-1 space-y-1 text-sm leading-snug">{feedback()}</div>
          {verdictButtons}
        </div>
      )}
    </div>
  );
}
