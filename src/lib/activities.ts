// Atividades das missões (kit de reformulação, seção 5): tipos declarativos, correção e as regras de
// diversidade (pelo menos três famílias, no máximo duas iguais seguidas, verdadeiro ou falso em até
// cerca de 10%). Cada erro traz explicação específica e, quando houver, uma atividade parecida com
// outros dados para a nova tentativa, em vez de repetir a mesma pergunta. Funções puras.

/** Tipo de erro, para o aluno saber o que falhou (kit, 10.1). */
export type ErrorKind = 'conceito' | 'confusao' | 'procedimento' | 'leitura';
export const ERROR_LABEL: Record<ErrorKind, string> = {
  conceito: 'falta de um conceito',
  confusao: 'confusão entre conceitos parecidos',
  procedimento: 'erro de procedimento',
  leitura: 'leitura apressada do enunciado',
};

interface Base {
  id: string;
  prompt: string;
  /** Material de apoio (Markdown; pode ter tabela ou bloco de código). */
  context?: string;
  errorKind?: ErrorKind;
  /** Atividade equivalente, com outros dados, oferecida depois de um erro. */
  variant?: MissionActivity;
}

export type MissionActivity =
  | (Base & { kind: 'choice'; options: { text: string; why: string }[]; answer: number })
  | (Base & { kind: 'multi'; options: { text: string; correct: boolean; why: string }[] })
  | (Base & { kind: 'order'; items: string[]; why: string })
  | (Base & { kind: 'sort'; categories: string[]; items: { text: string; cat: number; why: string }[] })
  | (Base & { kind: 'compare'; scenarios: { title: string; body: string }[]; answer: number; why: string })
  | (Base & { kind: 'fix'; lines: string[]; bug: number; why: string; fixed: string })
  | (Base & { kind: 'tf'; answer: boolean; why: string })
  | (Base & { kind: 'exam'; questionId: string });

export type Family = 'escolha' | 'selecao' | 'ordenar' | 'classificar' | 'comparar' | 'depurar' | 'vf' | 'prova';
export const FAMILY: Record<MissionActivity['kind'], Family> = {
  choice: 'escolha',
  multi: 'selecao',
  order: 'ordenar',
  sort: 'classificar',
  compare: 'comparar',
  fix: 'depurar',
  tf: 'vf',
  exam: 'prova',
};

export interface Grade {
  ok: boolean;
  /** Acerto por item (alternativa, posição ou cartão), quando fizer sentido. */
  parts?: boolean[];
}

export const gradeChoice = (a: { answer: number }, pick: number): Grade => ({ ok: pick === a.answer });

export function gradeMulti(a: { options: { correct: boolean }[] }, picks: Set<number>): Grade {
  const parts = a.options.map((o, i) => o.correct === picks.has(i));
  return { ok: parts.every(Boolean), parts };
}

export function gradeOrder(a: { items: string[] }, order: string[]): Grade {
  const parts = a.items.map((it, i) => order[i] === it);
  return { ok: parts.every(Boolean), parts };
}

export function gradeSort(a: { items: { cat: number }[] }, assign: (number | undefined)[]): Grade {
  const parts = a.items.map((it, i) => assign[i] === it.cat);
  return { ok: parts.every(Boolean), parts };
}

/** Embaralha de forma determinística (a ordem inicial de "ordenar" não pode já vir certa). */
export function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out.every((x, i) => x === items[i])) out.push(out.shift()!);
  return out;
}

/** Problemas de diversidade de uma sequência de atividades (lista vazia = ok). */
export function diversityProblems(acts: MissionActivity[]): string[] {
  const fams = acts.map((a) => FAMILY[a.kind]);
  const out: string[] = [];
  if (new Set(fams).size < 3) out.push('menos de três famílias de atividade');
  for (let i = 2; i < fams.length; i++) if (fams[i] === fams[i - 1] && fams[i] === fams[i - 2]) out.push(`três "${fams[i]}" seguidas a partir da ${i - 1}ª`);
  const tf = fams.filter((f) => f === 'vf').length;
  if (tf > Math.max(1, Math.round(acts.length * 0.1))) out.push(`verdadeiro ou falso demais (${tf} de ${acts.length})`);
  return out;
}
