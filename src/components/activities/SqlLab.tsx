// Laboratório de SQL: o aluno monta a consulta com controles (colunas, filtros, junção, ordem), vê o
// SQL que construiu, executa e compara o resultado com o pedido. No celular, os painéis viram abas
// "Dados / Consulta / Resultado"; em telas largas ficam lado a lado.
import { useMemo, useState } from 'react';
import type { LabTask } from '@/content/types';
import { runQuery, sameResult, toSql, type Cell, type Cond, type Db, type Op, type Query, type Result, type Table } from '@/lib/sql';
import { Icon } from '@/components/Icon';
import { useFx } from '@/app/fx';

export function TableView({ t, caption, highlight }: { t: Table | Result & { name?: string }; caption?: string; highlight?: (row: Cell[]) => boolean }) {
  const cols = t.columns;
  return (
    <div className="rounded-2xl border border-line bg-surface [&_td]:[overflow-wrap:anywhere] [&_th]:[overflow-wrap:anywhere]">
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="px-3 pt-2 text-left text-xs font-bold text-muted">{caption}</caption>}
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} scope="col" className="border-b border-line bg-gold/10 px-3 py-2 font-mono text-xs font-semibold text-gold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.length === 0 && (
            <tr>
              <td colSpan={cols.length} className="px-3 py-4 text-center text-muted">
                Nenhuma linha.
              </td>
            </tr>
          )}
          {t.rows.map((r, i) => (
            <tr key={i} className={highlight?.(r) ? 'bg-[#e8b13b]/20' : i % 2 ? 'bg-raised/40' : ''}>
              {r.map((v, j) => (
                <td key={j} className="border-b border-line/60 px-3 py-1.5 font-mono text-[0.8rem]">
                  {v === null ? <span className="rounded bg-ink/10 px-1 text-[0.7rem] font-bold text-muted">NULL</span> : String(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const OPS: Op[] = ['=', '<>', '>', '<', 'IS NULL', 'IS NOT NULL'];

/** Diagnóstico específico do erro mais comum, antes das dicas genéricas. */
function diagnose(q: Query, res: Result | undefined, exp: Result): string | undefined {
  if (q.where.some((c) => (c.op === '=' || c.op === '<>') && c.value === null)) return 'Há uma comparação com NULL usando "=" ou "<>". Ela dá desconhecido em todas as linhas. Para campos vazios, use IS NULL ou IS NOT NULL.';
  if (q.join?.type === 'INNER' && res && res.rows.length < exp.rows.length) return `O resultado tem ${res.rows.length} linhas, mas eram esperadas ${exp.rows.length}. O INNER JOIN descarta linhas sem par.`;
  if (res && res.columns.length !== exp.columns.length) return `Você mostrou ${res.columns.length} coluna(s); o pedido pede ${exp.columns.length}: ${exp.columns.map((c) => c.split('.').pop()).join(', ')}.`;
  if (res && res.rows.length !== exp.rows.length) return `Vieram ${res.rows.length} linha(s), mas eram esperadas ${exp.rows.length}. Confira o filtro.`;
  return undefined;
}

export function SqlLab({ db, task, onSolved }: { db: Db; task: LabTask; onSolved: () => void }) {
  const { sfx } = useFx();
  const [q, setQ] = useState<Query>(task.start);
  const [res, setRes] = useState<Result>();
  const [err, setErr] = useState<string>();
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);
  const [tab, setTab] = useState<'dados' | 'consulta' | 'resultado'>('consulta');
  const expected = useMemo(() => runQuery(db, task.expected), [db, task]);

  const tables = Object.values(db);
  const joinTable = q.join ? db[q.join.table] : undefined;
  const allCols = [...db[q.from].columns.map((c) => `${q.from}.${c}`), ...(joinTable ? joinTable.columns.map((c) => `${joinTable.name}.${c}`) : [])];
  const short = (c: string) => {
    const name = c.split('.').pop()!;
    return allCols.filter((x) => x.endsWith(`.${name}`)).length > 1 ? c : name;
  };
  const valuesOf = (col: string): Cell[] => {
    try {
      const r = runQuery(db, { ...q, select: [col], where: [], orderBy: undefined, count: false });
      return [...new Set(r.rows.map((x) => x[0]))].filter((v) => v !== null);
    } catch {
      return [];
    }
  };

  const set = (n: Partial<Query>) => {
    setQ({ ...q, ...n });
    setRes(undefined);
    setErr(undefined);
  };
  const setCond = (i: number, c: Partial<Cond>) => set({ where: q.where.map((x, j) => (j === i ? { ...x, ...c } : x)) });

  const run = () => {
    try {
      const r = runQuery(db, q);
      setRes(r);
      setErr(undefined);
      setTab('resultado');
      if (sameResult(r, expected)) {
        setSolved(true);
        sfx('ok');
      } else sfx('tap');
    } catch (e) {
      setErr((e as Error).message);
      sfx('bad');
    }
  };

  const diag = res && !solved ? diagnose(q, res, expected) : undefined;

  const dataPanel = (
    <div className="grid gap-2 sm:grid-cols-2">
      {tables.map((t) => (
        <TableView key={t.name} t={t} caption={`Tabela ${t.name}`} />
      ))}
    </div>
  );

  const queryPanel = (
    <div className="space-y-3">
      <fieldset className="rounded-2xl border border-line p-3">
        <legend className="px-1 text-xs font-bold text-muted">FROM e JOIN</legend>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <label className="flex items-center gap-1">
            <span className="font-mono text-xs">FROM</span>
            <select className="input !w-auto !py-1" value={q.from} disabled={solved} onChange={(e) => set({ from: e.target.value, select: [], where: [], join: undefined, orderBy: undefined })}>
              {tables.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </label>
          {(task.allowJoin || q.join) && (
            <label className="flex items-center gap-1">
              <span className="font-mono text-xs">JOIN</span>
              <select
                className="input !w-auto !py-1"
                disabled={solved}
                value={q.join?.type ?? ''}
                onChange={(e) => set({ join: e.target.value ? { type: e.target.value as 'INNER' | 'LEFT', table: (q.join ?? task.expected.join ?? task.start.join)!.table, on: (q.join ?? task.expected.join ?? task.start.join)!.on } : undefined })}
              >
                <option value="">sem junção</option>
                <option value="INNER">INNER JOIN</option>
                <option value="LEFT">LEFT JOIN</option>
              </select>
            </label>
          )}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-line p-3">
        <legend className="px-1 text-xs font-bold text-muted">SELECT: colunas a mostrar</legend>
        <div className="flex flex-wrap gap-1.5">
          {allCols.map((c) => {
            const on = q.select.includes(short(c)) || q.select.includes(c);
            return (
              <button
                key={c}
                type="button"
                disabled={solved}
                aria-pressed={on}
                onClick={() => set({ select: on ? q.select.filter((x) => x !== short(c) && x !== c) : [...q.select, short(c)] })}
                className={`rounded-full border px-2.5 py-1 font-mono text-xs ${on ? 'border-gold bg-gold text-white' : 'border-line hover:border-gold/60'}`}
              >
                {short(c)}
              </button>
            );
          })}
        </div>
        {q.select.length === 0 && <p className="mt-1 text-xs text-muted">Nenhuma marcada: mostra todas (*).</p>}
      </fieldset>

      <fieldset className="rounded-2xl border border-line p-3">
        <legend className="px-1 text-xs font-bold text-muted">WHERE: filtros</legend>
        <ul className="space-y-2">
          {q.where.map((c, i) => {
            const vals = valuesOf(c.col);
            return (
              <li key={i} className="flex flex-wrap items-center gap-1.5">
                <select className="input !w-auto !py-1 font-mono text-xs" disabled={solved} value={c.col} onChange={(e) => setCond(i, { col: e.target.value, value: valuesOf(e.target.value)[0] ?? null })} aria-label="Coluna do filtro">
                  {allCols.map((x) => (
                    <option key={x} value={short(x)}>
                      {short(x)}
                    </option>
                  ))}
                </select>
                <select className="input !w-auto !py-1 font-mono text-xs" disabled={solved} value={c.op} onChange={(e) => setCond(i, { op: e.target.value as Op })} aria-label="Operador">
                  {OPS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {!c.op.startsWith('IS') && (
                  <select
                    className="input !w-auto !py-1 font-mono text-xs"
                    disabled={solved}
                    value={c.value === null || c.value === undefined ? '__null' : String(c.value)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const v = raw === '__null' ? null : vals.find((x) => String(x) === raw) ?? raw;
                      setCond(i, { value: v });
                    }}
                    aria-label="Valor"
                  >
                    {vals.map((v) => (
                      <option key={String(v)} value={String(v)}>
                        {typeof v === 'string' ? `'${v}'` : v}
                      </option>
                    ))}
                    <option value="__null">NULL</option>
                  </select>
                )}
                {!solved && (
                  <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-raised" onClick={() => set({ where: q.where.filter((_, j) => j !== i) })} aria-label="Remover filtro">
                    <Icon name="errado" size={14} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        {!solved && q.where.length < 2 && (
          <button type="button" className="mt-2 text-sm font-semibold text-gold underline" onClick={() => set({ where: [...q.where, { col: short(allCols[1] ?? allCols[0]), op: '=', value: valuesOf(short(allCols[1] ?? allCols[0]))[0] ?? null }] })}>
            + filtro
          </button>
        )}
      </fieldset>

      <pre className="whitespace-pre-wrap break-words rounded-2xl bg-[#1b2120] p-3 font-mono text-[0.8rem] leading-relaxed text-[#e6e1d3]" aria-label="SQL montado">
        {toSql(q)}
      </pre>
    </div>
  );

  const resultPanel = (
    <div className="space-y-2">
      {err && <p className="rounded-2xl bg-bad/10 p-3 text-sm text-bad">{err}</p>}
      {res ? (
        <>
          <p className="text-sm text-muted">
            {res.rows.length} linha(s) · esperado: {expected.rows.length}
          </p>
          <TableView t={res} />
          {!solved && (
            <button type="button" className="btn-ghost w-full text-sm lg:hidden" onClick={() => setTab('consulta')}>
              Editar a consulta
            </button>
          )}
        </>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-4 text-center text-sm text-muted">Execute a consulta para ver o resultado.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-gold/40 bg-gold/5 p-3">
        <p className="text-xs font-bold text-gold">{task.title}</p>
        <p className="font-display text-lg leading-snug">{task.ask}</p>
      </div>

      {/* Celular: abas. Tela larga: três colunas. */}
      <div className="flex gap-1 rounded-full bg-raised p-1 lg:hidden" role="tablist">
        {(['dados', 'consulta', 'resultado'] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={`flex-1 rounded-full px-2 py-1.5 text-sm font-semibold capitalize ${tab === t ? 'bg-surface shadow-sm' : 'text-muted'}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="lg:hidden">{tab === 'dados' ? dataPanel : tab === 'consulta' ? queryPanel : resultPanel}</div>
      <div className="hidden space-y-3 lg:block">
        {dataPanel}
        <div className="grid grid-cols-2 gap-3">
          {queryPanel}
          {resultPanel}
        </div>
      </div>

      {diag && <p className="rounded-2xl bg-[#e8b13b]/15 p-3 text-sm">{diag}</p>}
      {!solved && hint > 0 && (
        <ul className="space-y-1 rounded-2xl bg-raised/60 p-3 text-sm">
          {task.hints.slice(0, hint).map((h, i) => (
            <li key={i}>
              <b>Dica {i + 1}:</b> {h}
            </li>
          ))}
        </ul>
      )}
      {solved ? (
        <div className="anim-toast-in rounded-2xl bg-[#d9eadf] p-3 text-[#173d29]" role="status">
          <p className="flex items-center gap-2 font-bold">
            <Icon name="certo" size={20} strokeWidth={2.6} /> Consulta certa
          </p>
          <p className="mt-1 text-sm">{task.explain}</p>
          <button className="btn-primary mt-3 w-full" onClick={onSolved}>
            Continuar
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          {hint < task.hints.length && (
            <button className="btn-ghost flex-1 text-sm" onClick={() => setHint(hint + 1)}>
              Pedir dica
            </button>
          )}
          <button className="btn-primary flex-1" onClick={run}>
            <Icon name="play" size={16} fill="currentColor" /> Executar
          </button>
        </div>
      )}
    </div>
  );
}
