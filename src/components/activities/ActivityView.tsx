// Componente único que mostra qualquer atividade de missão, cuida da resposta, corrige e explica.
// Os estados (selecionado, certo, errado) aparecem com ícone e texto, não só com cor. Depois de um
// erro, se a atividade tiver uma variante, o aluno pode tentar uma parecida com outros dados.
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Question } from '@/content/types';
import { ERROR_LABEL, gradeChoice, gradeMulti, gradeOrder, gradeSort, shuffled, type MissionActivity } from '@/lib/activities';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';
import { PageDots, SwipePages, type PageItem } from '@/components/SwipePages';

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
  useLayoutEffect(() => {
    if (fit && box.current) setBoxH(box.current.clientHeight);
  }, [fit]);
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

  // Explicação específica do resultado, em blocos (no modo sem rolagem, cada bloco pode ir para uma parte).
  const feedback = (): ReactNode[] => {
    if (!result) return [];
    switch (a.kind) {
      case 'choice':
        return [
          <p key="w">{a.options[pick!].why}</p>,
          !result.ok && (
            <p key="c">
              Resposta certa: <b>{a.options[a.answer].text}</b>. {a.options[a.answer].why}
            </p>
          ),
        ].filter(Boolean) as ReactNode[];
      case 'compare':
        return [
          <p key="w">
            {result.ok ? '' : `A certa é a ${a.scenarios[a.answer].title}. `}
            {a.why}
          </p>,
        ];
      case 'fix':
        return [
          <p key="w">
            {result.ok ? '' : `O erro está na linha ${a.bug + 1}. `}
            {a.why} Correção: <code className="rounded bg-black/5 px-1">{a.fixed}</code>
          </p>,
        ];
      case 'tf':
        return [
          <p key="w">
            É {a.answer ? 'verdadeiro' : 'falso'}. {a.why}
          </p>,
        ];
      case 'multi':
        return a.options
          .map((o, i) =>
            !result.parts![i] || o.correct ? (
              <p key={i}>
                {o.correct ? 'Correta' : 'Não serve'}: <b>{o.text}</b>. {o.why}
              </p>
            ) : null,
          )
          .filter(Boolean) as ReactNode[];
      case 'order':
        return [
          <p key="w">{a.why}</p>,
          !result.ok && (
            <ol key="o" className="ml-5 list-decimal">
              {a.items.map((it) => (
                <li key={it}>
                  <code>{it}</code>
                </li>
              ))}
            </ol>
          ),
        ].filter(Boolean) as ReactNode[];
      case 'sort':
        return result.ok
          ? [<p key="ok">Todos no lugar certo.</p>]
          : (a.items
              .map((it, i) =>
                !result.parts![i] ? (
                  <p key={i}>
                    <b>{it.text}</b>: {a.categories[it.cat]}. {it.why}
                  </p>
                ) : null,
              )
              .filter(Boolean) as ReactNode[]);
      case 'exam': {
        const q = question!;
        const chosen = q.options[pick!];
        return [<p key="c">{chosen.comment}</p>, <p key="e">{q.explanation}</p>];
      }
    }
  };

  const st = (right: boolean, mine: boolean): 'sel' | 'ok' | 'bad' | undefined => (result ? (right ? 'ok' : mine ? 'bad' : undefined) : mine ? 'sel' : undefined);

  // Cabeçalho, enunciado e contexto.
  const head: PageItem[] = [];
  if (a.kind === 'exam' && question) {
    head.push({
      key: 'label',
      node: (
        <div>
          <p className="text-sm font-semibold text-muted">{LABEL[a.kind]}</p>
          <p className="mt-1 inline-block rounded-full border border-line px-2 py-0.5 text-xs text-muted">
            Questão autoral no estilo da FCC, não aplicada em prova · {question.review === 'nao-revisado' ? 'não revisada por especialista' : 'revisada'}
          </p>
        </div>
      ),
    });
    head.push({ key: 'stem', md: question.stem, wrap: (c) => <div className="prose-manuscript !font-sans !text-[1rem] [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">{c}</div> });
  } else {
    head.push({
      key: 'label',
      node: (
        <div>
          <p className="text-sm font-semibold text-muted">{LABEL[a.kind]}</p>
          <p className="mt-1 font-display text-lg leading-snug">{a.prompt}</p>
        </div>
      ),
    });
  }
  if (a.context) {
    head.push({
      key: 'ctx',
      md: a.context,
      wrap: (c, cont) => (
        <div className="rounded-2xl border border-line bg-raised/50 p-3 text-sm [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">
          {cont && <p className="mb-1 text-xs text-muted">(continuação)</p>}
          {c}
        </div>
      ),
    });
  }

  // Alternativas: cada uma é um item inteiro (nunca cortado ao meio).
  const opts: PageItem[] = [];
  if (a.kind === 'choice' || a.kind === 'exam') {
    (a.kind === 'choice' ? a.options.map((o) => o.text) : question!.options.map((o) => `${o.key}) ${o.text}`)).forEach((t, i) => {
      const right = a.kind === 'choice' ? i === a.answer : question!.options[i].key === question!.answer;
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
  if (a.kind === 'tf') {
    opts.push({
      key: 'tf',
      node: (
        <div className="grid grid-cols-2 gap-2">
          {['Falso', 'Verdadeiro'].map((t, i) => (
            <Opt key={t} disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={st((i === 1) === a.answer, pick === i)}>
              {t}
            </Opt>
          ))}
        </div>
      ),
    });
  }
  if (a.kind === 'multi') {
    a.options.forEach((o, i) => {
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
  if (a.kind === 'compare') {
    a.scenarios.forEach((sc, i) =>
      opts.push({
        key: `c${i}`,
        node: (
          <Opt disabled={locked} pressed={pick === i} onClick={() => setPick(i)} state={st(i === a.answer, pick === i)}>
            <b className="block">{sc.title}</b>
            <div className="text-sm [&_pre]:!my-1 [&_pre]:!p-2">
              <Markdown>{sc.body}</Markdown>
            </div>
          </Opt>
        ),
      }),
    );
  }
  if (a.kind === 'fix') {
    opts.push({
      key: 'fix',
      node: (
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
      ),
    });
  }
  if (a.kind === 'order') {
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
  if (a.kind === 'sort') {
    a.items.forEach((it, i) =>
      opts.push({
        key: `s${i}`,
        node: (
          <div className={`rounded-2xl border-2 bg-surface p-2 ${result ? (result.parts![i] ? 'border-ok' : 'border-bad') : 'border-line'}`}>
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
      {result && !result.ok && a.errorKind && <p className="text-xs font-semibold opacity-80">Tipo de erro provável: {ERROR_LABEL[a.errorKind]}</p>}
    </>
  );
  const verdictButtons = result && (
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
  );
  const sheetCls = result ? (result.ok ? 'bg-[#d9eadf] text-[#173d29]' : 'bg-[#f3dcd5] text-[#5c1d12]') : '';

  if (fit) {
    // Sem rolagem vertical: enunciado e alternativas em partes lado a lado; a correção abre por cima,
    // também em partes quando é longa.
    const fb = feedback().map((n, i) => ({ key: `f${i}`, node: n }));
    return (
      <div ref={box} className="relative flex min-h-0 flex-1 flex-col">
        <SwipePages items={[...head, ...opts]} layoutKey={`${a.id}:${result ? 'r' : 'q'}`} renderMd={renderMd} gap={8} label="Atividade" footer={(s) => <PageDots {...s} />} />
        {!result ? (
          <div className="pt-2">
            <button className="btn-primary w-full" disabled={!ready} onClick={check}>
              Verificar
            </button>
          </div>
        ) : (
          <div className={`anim-toast-in absolute inset-x-0 bottom-0 z-10 -mx-4 rounded-t-[1.6rem] px-4 pb-3 pt-3 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.6)] sm:-mx-6 sm:px-6 ${sheetCls}`} role="status">
            {verdictTitle}
            <div className="mt-1 text-sm leading-snug">
              <SwipePages
                items={fb}
                layoutKey={`${a.id}:fb`}
                renderMd={renderMd}
                maxHeight={Math.max(120, Math.round(boxH * 0.42))}
                gap={6}
                label="Explicação da correção"
                footer={(s) => <PageDots {...s} />}
              />
            </div>
            {verdictButtons}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2" role={a.kind === 'order' ? 'list' : undefined}>
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
