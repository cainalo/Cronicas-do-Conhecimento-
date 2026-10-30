import { describe, expect, it } from 'vitest';
import { runJavaScriptSubset, CODING_EXERCISES, codingExercisePassed } from '@/lib/code-lab';

describe('laboratório de programação JavaScript', () => {
  it('declara variáveis, concatena texto e produz saída como console.log', () => {
    const source = 'const nome = "Ana";\nconsole.log("Olá,", nome);';
    const result = runJavaScriptSubset(source);
    expect(result.ok).toBe(true);
    expect(result.output).toBe('Olá, Ana');
    expect(result.variables.nome).toBe('Ana');
    expect(codingExercisePassed(CODING_EXERCISES[0], source, result.output)).toBe(true);
  });

  it('avalia expressões aritméticas e mantém as variáveis observáveis', () => {
    const result = runJavaScriptSubset('const base = 6;\nconst altura = 7;\nconst area = base * altura;\nconsole.log(area);');
    expect(result).toMatchObject({ ok: true, output: '42', variables: { base: 6, altura: 7, area: 42 } });
  });

  it('executa apenas o ramo correto de if/else', () => {
    const yes = runJavaScriptSubset('const cpu = 78;\nif (cpu > 70) { console.log("investigar"); } else { console.log("acompanhar"); }');
    const no = runJavaScriptSubset('const cpu = 28;\nif (cpu > 70) { console.log("investigar"); } else { console.log("acompanhar"); }');
    expect(yes.output).toBe('investigar');
    expect(no.output).toBe('acompanhar');
  });

  it('apresenta erros de sintaxe, variáveis desconhecidas e divisão por zero', () => {
    expect(runJavaScriptSubset('const a = ;').error).toMatch(/Linha 1/);
    expect(runJavaScriptSubset('console.log(segredo);').error).toMatch(/não foi declarada/);
    expect(runJavaScriptSubset('console.log(1 / 0);').error).toMatch(/dividir por zero/);
  });

  it('recusa loops e APIs fora do subconjunto sem avaliar o código como JavaScript arbitrário', () => {
    expect(runJavaScriptSubset('while (true) { console.log("loop"); }').error).toMatch(/não faz parte deste laboratório/);
    expect(runJavaScriptSubset('console.log(window.location);').ok).toBe(false);
    expect(runJavaScriptSubset('console.log(fetch("https://example.com"));').ok).toBe(false);
  });
});
