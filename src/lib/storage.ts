import { emptyData, emptyPending, type StudyData } from './model';

// Cada usuário (ou o modo visitante) tem seu próprio espaço local.
export const GUEST = 'visitante';
const key = (owner: string) => `cronicas:v1:${owner}`;

export function loadData(owner: string): StudyData {
  try {
    const raw = localStorage.getItem(key(owner));
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as StudyData;
    if (parsed.version !== 1) return emptyData();
    return { ...emptyData(), ...parsed, pending: { ...emptyPending(), ...parsed.pending } };
  } catch {
    return emptyData();
  }
}

export function saveData(owner: string, data: StudyData) {
  try {
    localStorage.setItem(key(owner), JSON.stringify(data));
  } catch {
    // Armazenamento indisponível (modo privado, cota): os dados ficam só na memória.
  }
}

export function clearData(owner: string) {
  try {
    localStorage.removeItem(key(owner));
  } catch {
    /* ignora */
  }
}

export function hasData(d: StudyData) {
  return (
    d.attempts.length +
      d.xp.length +
      d.bookmarks.length +
      Object.keys(d.reading).length +
      Object.keys(d.lessons).length +
      Object.keys(d.exams).length +
      Object.keys(d.essays).length +
      Object.keys(d.cards).length >
    0
  );
}

// Preferências do leitor (por dispositivo).
export interface Prefs {
  fontScale: number;
  /** Efeitos sonoros curtos (acerto, erro, conclusão). */
  sound?: boolean;
  theme: 'dark' | 'light';
  /** Música medieval de fundo. */
  music?: boolean;
  /** Lareira crepitando. */
  fire?: boolean;
}
// v3 (23/10/2026): visual medieval, com a "Noite" (tochas e pedra) como padrão. Quem vinha da v2
// mantém tamanho de letra e som; o tema passa para a noite uma vez, e a escolha volta a ser livre.
const PREFS = 'cronicas:prefs:v3';
const OLD = 'cronicas:prefs:v2';
export function loadPrefs(): Prefs {
  try {
    const cur = localStorage.getItem(PREFS);
    if (cur) return { fontScale: 1, theme: 'dark', ...JSON.parse(cur) };
    const old = JSON.parse(localStorage.getItem(OLD) ?? '{}');
    return { fontScale: 1, ...old, theme: 'dark' };
  } catch {
    return { fontScale: 1, theme: 'dark' };
  }
}
export function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(PREFS, JSON.stringify(p));
  } catch {
    /* ignora */
  }
}
