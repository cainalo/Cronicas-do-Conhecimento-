import { compare, runQuery, sameResult, toSql, type Db } from '@/lib/sql';

const db: Db = {
  fornecedor: {
    name: 'fornecedor',
    columns: ['cnpj', 'nome', 'cidade'],
    rows: [
      [11, 'Ferraria do Vale', 'Goiânia'],
      [22, 'Papelaria Real', 'Anápolis'],
      [44, 'Névoa Cinzenta', null],
    ],
  },
  empenho: {
    name: 'empenho',
    columns: ['id', 'cnpj_fornecedor', 'valor', 'status'],
    rows: [
      [1, 11, 12000, 'pago'],
      [2, 44, 95000, null],
      [3, 99, 40000, 'pago'],
    ],
  },
};

describe('mini-motor SQL do laboratório', () => {
  it('filtra com WHERE e projeta colunas', () => {
    const r = runQuery(db, { select: ['nome'], from: 'fornecedor', where: [{ col: 'cidade', op: '=', value: 'Goiânia' }] });
    expect(r.rows).toEqual([['Ferraria do Vale']]);
  });
  it('segue a lógica de três valores: = NULL e <> não trazem a linha nula', () => {
    expect(compare(null, '=', null)).toBeNull();
    expect(runQuery(db, { select: [], from: 'empenho', where: [{ col: 'status', op: '=', value: null }] }).rows).toHaveLength(0);
    expect(runQuery(db, { select: [], from: 'empenho', where: [{ col: 'status', op: '<>', value: 'pago' }] }).rows).toHaveLength(0);
    expect(runQuery(db, { select: ['id'], from: 'empenho', where: [{ col: 'status', op: 'IS NULL' }] }).rows).toEqual([[2]]);
  });
  it('INNER JOIN descarta o empenho sem fornecedor; LEFT JOIN o mantém com NULL', () => {
    const on: [string, string] = ['empenho.cnpj_fornecedor', 'fornecedor.cnpj'];
    const inner = runQuery(db, { select: ['id', 'nome'], from: 'empenho', join: { type: 'INNER', table: 'fornecedor', on }, where: [] });
    expect(inner.rows).toHaveLength(2);
    const left = runQuery(db, { select: ['id', 'nome'], from: 'empenho', join: { type: 'LEFT', table: 'fornecedor', on }, where: [] });
    expect(left.rows).toContainEqual([3, null]);
  });
  it('conta, ordena com NULL no fim e escreve o SQL', () => {
    expect(runQuery(db, { select: [], count: true, from: 'empenho', where: [] }).rows).toEqual([[3]]);
    const o = runQuery(db, { select: ['cidade'], from: 'fornecedor', where: [], orderBy: { col: 'cidade', dir: 'ASC' } });
    expect(o.rows.map((r) => r[0])).toEqual(['Anápolis', 'Goiânia', null]);
    expect(toSql({ select: ['nome'], from: 'fornecedor', where: [{ col: 'cidade', op: 'IS NULL' }] })).toBe('SELECT nome\nFROM fornecedor\nWHERE cidade IS NULL');
  });
  it('compara resultados sem depender da ordem das linhas nem do prefixo da tabela', () => {
    expect(sameResult({ columns: ['fornecedor.nome'], rows: [['a'], ['b']] }, { columns: ['nome'], rows: [['b'], ['a']] })).toBe(true);
    expect(sameResult({ columns: ['nome'], rows: [['a']] }, { columns: ['nome'], rows: [['b']] })).toBe(false);
  });
  it('avisa coluna inexistente ou ambígua', () => {
    expect(() => runQuery(db, { select: ['xyz'], from: 'fornecedor', where: [] })).toThrow(/não existe/);
  });
});
