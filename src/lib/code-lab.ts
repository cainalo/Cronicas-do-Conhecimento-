// Interpretador restrito de JavaScript para exercícios de programação.
// Não usa eval/Function, não acessa DOM/rede/armazenamento, e não permite loops,
// funções do usuário, importações ou APIs do dispositivo. Executa um subconjunto explícito.
export type CodeValue = string | number | boolean | null;
export interface CodeRunResult {
  ok: boolean;
  output: string;
  error?: string;
  variables: Record<string, CodeValue>;
}
type Token = { kind: 'number' | 'string' | 'identifier' | 'operator' | 'punct' | 'eof'; value: string; line: number };
type Expr =
  | { type: 'literal'; value: CodeValue; line: number }
  | { type: 'identifier'; name: string; line: number }
  | { type: 'unary'; op: string; value: Expr; line: number }
  | { type: 'binary'; op: string; left: Expr; right: Expr; line: number };
type Stmt =
  | { type: 'declare'; name: string; value: Expr; line: number }
  | { type: 'assign'; name: string; value: Expr; line: number }
  | { type: 'log'; args: Expr[]; line: number }
  | { type: 'if'; test: Expr; yes: Stmt[]; no: Stmt[]; line: number };

class CodeSyntaxError extends Error {
  constructor(message: string, readonly line: number) { super(message); }
}

function tokenize(source: string): Token[] {
  if (source.length > 12000) throw new CodeSyntaxError('O código passou do limite de 12.000 caracteres.', 1);
  const out: Token[] = [];
  let i = 0, line = 1;
  const push = (kind: Token['kind'], value: string, atLine: number) => {
    out.push({ kind, value, line: atLine });
    if (out.length > 1800) throw new CodeSyntaxError('Código muito grande para este laboratório (máximo: 1.800 tokens).', atLine);
  };
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\n') { line++; i++; continue; }
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i++;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const at = line, quote = ch;
      i++;
      let value = '';
      let closed = false;
      while (i < source.length) {
        const c = source[i++];
        if (c === quote) { closed = true; break; }
        if (c === '\n') throw new CodeSyntaxError('Texto entre aspas não pode atravessar linhas.', at);
        if (c === '\\') {
          const escaped = source[i++];
          const escapes: Record<string, string> = { n: '\n', t: '\t', r: '\r', '\\': '\\', '"': '"', "'": "'" };
          if (escaped === undefined) break;
          value += escapes[escaped] ?? escaped;
        } else value += c;
      }
      if (!closed) throw new CodeSyntaxError('Texto sem aspas de fechamento.', at);
      push('string', value, at);
      continue;
    }
    if (/[0-9]/.test(ch)) {
      const at = line, start = i;
      while (i < source.length && /[0-9.]/.test(source[i])) i++;
      const value = source.slice(start, i);
      if (!/^\d+(?:\.\d+)?$/.test(value)) throw new CodeSyntaxError('Número inválido: ' + value, at);
      push('number', value, at);
      continue;
    }
    if (/[A-Za-z_$]/.test(ch)) {
      const at = line, start = i;
      while (i < source.length && /[A-Za-z0-9_$]/.test(source[i])) i++;
      push('identifier', source.slice(start, i), at);
      continue;
    }
    const multi = ['===', '!==', '>=', '<=', '==', '!=', '&&', '||'];
    const op = multi.find((candidate) => source.startsWith(candidate, i));
    if (op) { push('operator', op, line); i += op.length; continue; }
    if ('+-*/%<>!='.includes(ch)) { push('operator', ch, line); i++; continue; }
    if ('(){}.,;'.includes(ch)) { push('punct', ch, line); i++; continue; }
    throw new CodeSyntaxError('Caractere não suportado: ' + ch, line);
  }
  out.push({ kind: 'eof', value: '', line });
  return out;
}

class Parser {
  private pos = 0;
  private statements = 0;
  constructor(private readonly tokens: Token[]) {}
  private get t(): Token { return this.tokens[this.pos]; }
  private take(): Token { return this.tokens[this.pos++]; }
  private match(value: string): boolean {
    if (this.t.value !== value) return false;
    this.pos++;
    return true;
  }
  private need(value: string): Token {
    if (this.t.value !== value) throw new CodeSyntaxError('Esperado "' + value + '", encontrado "' + (this.t.value || 'fim do código') + '".', this.t.line);
    return this.take();
  }
  private needIdentifier(): Token {
    if (this.t.kind !== 'identifier') throw new CodeSyntaxError('Esperado nome de variável.', this.t.line);
    return this.take();
  }
  parse(): Stmt[] {
    const out: Stmt[] = [];
    while (this.t.kind !== 'eof') {
      if (this.match(';')) continue;
      out.push(this.statement());
      if (out.length > 120) throw new CodeSyntaxError('Limite de 120 instruções por execução.', this.t.line);
    }
    return out;
  }
  private statement(): Stmt {
    this.statements++;
    if (this.statements > 240) throw new CodeSyntaxError('Código muito complexo para esta atividade.', this.t.line);
    const line = this.t.line;
    if (this.t.value === 'const' || this.t.value === 'let' || this.t.value === 'var') {
      this.take();
      const name = this.needIdentifier();
      this.need('=');
      const value = this.expression();
      this.match(';');
      return { type: 'declare', name: name.value, value, line };
    }
    if (this.match('if')) {
      this.need('(');
      const test = this.expression();
      this.need(')');
      const yes = this.block();
      let no: Stmt[] = [];
      if (this.match('else')) no = this.block();
      return { type: 'if', test, yes, no, line };
    }
    if (this.t.value === 'console') {
      this.take();
      this.need('.');
      this.need('log');
      this.need('(');
      const args: Expr[] = [];
      if (this.t.value !== ')') {
        do { args.push(this.expression()); } while (this.match(','));
      }
      this.need(')');
      this.match(';');
      return { type: 'log', args, line };
    }
    if (this.t.kind === 'identifier') {
      const name = this.take();
      this.need('=');
      const value = this.expression();
      this.match(';');
      return { type: 'assign', name: name.value, value, line };
    }
    if (['for', 'while', 'do', 'function', 'class', 'return', 'import', 'export', 'new', 'await', 'throw', 'try'].includes(this.t.value)) {
      throw new CodeSyntaxError('"' + this.t.value + '" ainda não faz parte deste laboratório. Use variáveis, expressões, console.log e if/else.', line);
    }
    throw new CodeSyntaxError('Instrução não reconhecida perto de "' + (this.t.value || 'fim do código') + '".', line);
  }
  private block(): Stmt[] {
    this.need('{');
    const out: Stmt[] = [];
    while (this.t.value !== '}' && this.t.kind !== 'eof') {
      if (this.match(';')) continue;
      out.push(this.statement());
    }
    this.need('}');
    return out;
  }
  private expression(depth = 0, minPrec = 0): Expr {
    if (depth > 40) throw new CodeSyntaxError('Expressão aninhada demais.', this.t.line);
    const line = this.t.line;
    let left: Expr;
    if (['!', '-', '+'].includes(this.t.value) && this.t.kind === 'operator') {
      const op = this.take().value;
      left = { type: 'unary', op, value: this.expression(depth + 1, 7), line };
    } else if (this.match('(')) {
      left = this.expression(depth + 1);
      this.need(')');
    } else if (this.t.kind === 'number') {
      left = { type: 'literal', value: Number(this.take().value), line };
    } else if (this.t.kind === 'string') {
      left = { type: 'literal', value: this.take().value, line };
    } else if (this.t.kind === 'identifier') {
      const token = this.take();
      if (token.value === 'true' || token.value === 'false') left = { type: 'literal', value: token.value === 'true', line };
      else if (token.value === 'null') left = { type: 'literal', value: null, line };
      else left = { type: 'identifier', name: token.value, line };
    } else {
      throw new CodeSyntaxError('Esperava um valor ou nome de variável.', line);
    }
    const precedence: Record<string, number> = { '||': 1, '&&': 2, '==': 3, '===': 3, '!=': 3, '!==': 3, '>': 4, '<': 4, '>=': 4, '<=': 4, '+': 5, '-': 5, '*': 6, '/': 6, '%': 6 };
    while (this.t.kind === 'operator' && (precedence[this.t.value] ?? -1) >= minPrec) {
      const op = this.take().value;
      const prec = precedence[op];
      const right = this.expression(depth + 1, prec + 1);
      left = { type: 'binary', op, left, right, line };
    }
    return left;
  }
}

function render(value: CodeValue): string { return value === null ? 'null' : String(value); }
function truthy(value: CodeValue): boolean { return Boolean(value); }
function evaluate(expr: Expr, vars: Record<string, CodeValue>): CodeValue {
  if (expr.type === 'literal') return expr.value;
  if (expr.type === 'identifier') {
    if (!Object.prototype.hasOwnProperty.call(vars, expr.name)) throw new CodeSyntaxError('Variável "' + expr.name + '" ainda não foi declarada.', expr.line);
    return vars[expr.name];
  }
  if (expr.type === 'unary') {
    const value = evaluate(expr.value, vars);
    if (expr.op === '!') return !truthy(value);
    if (typeof value !== 'number') throw new CodeSyntaxError('O operador "' + expr.op + '" espera um número.', expr.line);
    return expr.op === '-' ? -value : value;
  }
  const left = evaluate(expr.left, vars);
  const right = evaluate(expr.right, vars);
  switch (expr.op) {
    case '+': return typeof left === 'string' || typeof right === 'string' ? render(left) + render(right) : Number(left) + Number(right);
    case '-': return Number(left) - Number(right);
    case '*': return Number(left) * Number(right);
    case '/':
      if (Number(right) === 0) throw new CodeSyntaxError('Não é possível dividir por zero.', expr.line);
      return Number(left) / Number(right);
    case '%':
      if (Number(right) === 0) throw new CodeSyntaxError('Não é possível calcular resto da divisão por zero.', expr.line);
      return Number(left) % Number(right);
    case '==': case '===': return left === right;
    case '!=': case '!==': return left !== right;
    case '>': return typeof left === 'string' && typeof right === 'string' ? left > right : Number(left) > Number(right);
    case '<': return typeof left === 'string' && typeof right === 'string' ? left < right : Number(left) < Number(right);
    case '>=': return typeof left === 'string' && typeof right === 'string' ? left >= right : Number(left) >= Number(right);
    case '<=': return typeof left === 'string' && typeof right === 'string' ? left <= right : Number(left) <= Number(right);
    case '&&': return truthy(left) ? right : left;
    case '||': return truthy(left) ? left : right;
    default: throw new CodeSyntaxError('Operador não permitido: ' + expr.op, expr.line);
  }
}
function execute(stmts: Stmt[], vars: Record<string, CodeValue>, logs: string[]): void {
  for (const stmt of stmts) {
    if (stmt.type === 'declare') vars[stmt.name] = evaluate(stmt.value, vars);
    else if (stmt.type === 'assign') {
      if (!Object.prototype.hasOwnProperty.call(vars, stmt.name)) throw new CodeSyntaxError('A variável "' + stmt.name + '" precisa ser declarada antes de receber um valor.', stmt.line);
      vars[stmt.name] = evaluate(stmt.value, vars);
    } else if (stmt.type === 'log') {
      const values = stmt.args.map((arg) => evaluate(arg, vars));
      logs.push(values.map(render).join(' '));
      if (logs.length > 40) throw new CodeSyntaxError('O código gerou mais de 40 linhas de saída.', stmt.line);
    } else {
      const test = evaluate(stmt.test, vars);
      execute(truthy(test) ? stmt.yes : stmt.no, vars, logs);
    }
  }
}
export function runJavaScriptSubset(source: string): CodeRunResult {
  try {
    const vars: Record<string, CodeValue> = Object.create(null) as Record<string, CodeValue>;
    const logs: string[] = [];
    const ast = new Parser(tokenize(source)).parse();
    execute(ast, vars, logs);
    return { ok: true, output: logs.join('\n'), variables: vars };
  } catch (error) {
    if (error instanceof CodeSyntaxError) return { ok: false, output: '', error: 'Linha ' + error.line + ': ' + error.message, variables: {} };
    return { ok: false, output: '', error: 'Não foi possível executar este exemplo.', variables: {} };
  }
}
export interface CodingExercise {
  id: 'variaveis' | 'calculo' | 'decisao';
  title: string;
  goal: string;
  starterCode: string;
  hint: string;
  success: (source: string, output: string) => boolean;
}
export const CODING_EXERCISES: CodingExercise[] = [
  {
    id: 'variaveis',
    title: 'Variáveis e saída',
    goal: 'Guarde o nome em uma variável e mostre uma saudação com console.log.',
    starterCode: 'const nome = "Ana";\nconsole.log("Olá,", nome);',
    hint: 'Declare uma variável com const e use console.log para combinar texto e valores.',
    success: (source, output) => /\b(?:const|let|var)\s+nome\s*=/.test(source) && /console\s*\.\s*log\s*\(/.test(source) && output.includes('Olá, Ana'),
  },
  {
    id: 'calculo',
    title: 'Calcular indicadores',
    goal: 'Guarde CPU e memória em variáveis e imprima os dois indicadores usando os valores.',
    starterCode: 'const cpu = 78;\nconst memoria = 92;\nconsole.log("CPU:", cpu + "%");\nconsole.log("Memória:", memoria + "%");',
    hint: 'Use duas variáveis numéricas. O operador + também pode juntar um número a um texto.',
    success: (source, output) => /\b(?:const|let|var)\s+cpu\s*=/.test(source) && /\b(?:const|let|var)\s+memoria\s*=/.test(source) && output.includes('CPU: 78%') && output.includes('Memória: 92%'),
  },
  {
    id: 'decisao',
    title: 'Tomar uma decisão com if/else',
    goal: 'Se CPU for maior que 70, imprima “Ação: investigar”; caso contrário, imprima “Ação: acompanhar”.',
    starterCode: 'const cpu = 78;\nif (cpu > 70) {\n  console.log("Ação: investigar");\n} else {\n  console.log("Ação: acompanhar");\n}',
    hint: 'A condição fica entre parênteses. O bloco { } do if roda quando a condição é verdadeira; else cobre o outro caso.',
    success: (source, output) => /\bif\s*\(/.test(source) && /\belse\b/.test(source) && output.includes('Ação: investigar'),
  },
];
export function codingExercisePassed(exercise: CodingExercise, source: string, output: string): boolean {
  return exercise.success(source, output);
}
