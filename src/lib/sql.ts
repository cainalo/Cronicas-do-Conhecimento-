// Mini-motor de consultas do laboratório de SQL: tabelas em memória e um subconjunto de SQL
// (SELECT colunas ou COUNT, FROM, INNER/LEFT JOIN por igualdade, WHERE com AND, ORDER BY).
// Segue a lógica de três valores do SQL: comparar com NULL dá "desconhecido", e a linha não passa
// no WHERE. Funções puras, sem React, para o laboratório e os testes.

export type Cell = string | number | null;
export interface Table {
  name: string;
  columns: string[];
  rows: Cell[][];
}
export type Db = Record<string, Table>;

export type Op = '=' | '<>' | '>' | '<' | '>=' | '<=' | 'IS NULL' | 'IS NOT NULL';
export interface Cond {
  col: string;
  op: Op;
  /** Valor comparado. `null` aqui escreve "= NULL", o erro clássico. */
  value?: Cell;
}
export interface Query {
  /** Colunas (podem vir qualificadas, "f.nome") ou vazio para "*". */
  select: string[];
  count?: boolean;
  from: string;
  join?: { type: 'INNER' | 'LEFT'; table: string; on: [string, string] };
  where: Cond[];
  orderBy?: { col: string; dir: 'ASC' | 'DESC' };
}
export interface Result {
  columns: string[];
  rows: Cell[][];
}

type Row = Record<string, Cell>;

/** Linhas de uma tabela com as colunas qualificadas pelo nome da tabela ("fornecedor.nome"). */
function qualified(t: Table): Row[] {
  return t.rows.map((r) => Object.fromEntries(t.columns.map((c, i) => [`${t.name}.${c}`, r[i]])));
}

/** Encontra a coluna qualificada a partir do nome dado (com ou sem tabela). */
export function resolveColumn(keys: string[], col: string): string {
  if (keys.includes(col)) return col;
  const hits = keys.filter((k) => k.endsWith(`.${col}`));
  if (hits.length === 1) return hits[0];
  if (hits.length > 1) throw new Error(`A coluna "${col}" é ambígua: existe em mais de uma tabela.`);
  throw new Error(`A coluna "${col}" não existe.`);
}

/** Resultado de uma comparação na lógica de três valores: true, false ou null (desconhecido). */
export function compare(a: Cell, op: Op, b: Cell | undefined): boolean | null {
  if (op === 'IS NULL') return a === null;
  if (op === 'IS NOT NULL') return a !== null;
  if (a === null || b === null || b === undefined) return null;
  switch (op) {
    case '=':
      return a === b;
    case '<>':
      return a !== b;
    case '>':
      return a > b;
    case '<':
      return a < b;
    case '>=':
      return a >= b;
    case '<=':
      return a <= b;
  }
}

export function runQuery(db: Db, q: Query): Result {
  const base = db[q.from];
  if (!base) throw new Error(`A tabela "${q.from}" não existe.`);
  let rows = qualified(base);
  let keys = base.columns.map((c) => `${base.name}.${c}`);
  if (q.join) {
    const other = db[q.join.table];
    if (!other) throw new Error(`A tabela "${q.join.table}" não existe.`);
    const right = qualified(other);
    const rKeys = other.columns.map((c) => `${other.name}.${c}`);
    const all = [...keys, ...rKeys];
    const l = resolveColumn(all, q.join.on[0]);
    const r = resolveColumn(all, q.join.on[1]);
    const out: Row[] = [];
    for (const row of rows) {
      const matches = right.filter((rr) => compare({ ...row, ...rr }[l], '=', { ...row, ...rr }[r]) === true);
      if (matches.length) matches.forEach((m) => out.push({ ...row, ...m }));
      else if (q.join.type === 'LEFT') out.push({ ...row, ...Object.fromEntries(rKeys.map((k) => [k, null])) });
    }
    rows = out;
    keys = all;
  }
  // WHERE: só passam as linhas em que todas as condições são verdadeiras (desconhecido não passa).
  const conds = q.where.map((c) => ({ ...c, key: resolveColumn(keys, c.col) }));
  rows = rows.filter((row) => conds.every((c) => compare(row[c.key], c.op, c.value) === true));
  if (q.orderBy) {
    const k = resolveColumn(keys, q.orderBy.col);
    const s = q.orderBy.dir === 'DESC' ? -1 : 1;
    // NULL vai para o fim na ordem crescente (como no PostgreSQL).
    rows = [...rows].sort((a, b) => (a[k] === b[k] ? 0 : a[k] === null ? s : b[k] === null ? -s : a[k]! > b[k]! ? s : -s));
  }
  if (q.count) return { columns: ['COUNT(*)'], rows: [[rows.length]] };
  const cols = q.select.length ? q.select.map((c) => resolveColumn(keys, c)) : keys;
  return { columns: cols, rows: rows.map((r) => cols.map((c) => r[c])) };
}

const lit = (v: Cell | undefined) => (v === null || v === undefined ? 'NULL' : typeof v === 'number' ? String(v) : `'${v}'`);

/** Texto SQL equivalente à consulta montada (para o aluno ver o que construiu). */
export function toSql(q: Query): string {
  const sel = q.count ? 'COUNT(*)' : q.select.length ? q.select.join(', ') : '*';
  const lines = [`SELECT ${sel}`, `FROM ${q.from}`];
  if (q.join) lines.push(`${q.join.type} JOIN ${q.join.table} ON ${q.join.on[0]} = ${q.join.on[1]}`);
  q.where.forEach((c, i) => lines.push(`${i === 0 ? 'WHERE' : '  AND'} ${c.col} ${c.op}${c.op.startsWith('IS') ? '' : ` ${lit(c.value)}`}`));
  if (q.orderBy) lines.push(`ORDER BY ${q.orderBy.col} ${q.orderBy.dir}`);
  return lines.join('\n');
}

/** Dois resultados são iguais se têm as mesmas colunas (sem importar a tabela de origem) e as mesmas linhas. */
export function sameResult(a: Result, b: Result, ordered = false): boolean {
  const short = (c: string) => c.split('.').pop();
  if (a.columns.length !== b.columns.length) return false;
  const idx = a.columns.map((c) => b.columns.map(short).indexOf(short(c)));
  if (idx.some((i) => i < 0)) return false;
  const norm = (rows: Cell[][]) => rows.map((r) => JSON.stringify(r));
  const ar = norm(a.rows);
  const br = norm(b.rows.map((r) => idx.map((i) => r[i])));
  if (ordered) return JSON.stringify(ar) === JSON.stringify(br);
  return JSON.stringify([...ar].sort()) === JSON.stringify([...br].sort());
}
