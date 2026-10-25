import { emptyData, emptyPending, type StudyData } from './model';

// Cada usuário (ou o modo visitante) tem seu próprio espaço local.
export const GUEST = 'visitante';
const key = (owner: string) => `cronicas:v1:${owner}`;

const backupKey = (owner: string) => `cronicas:backup:${owner}`;

/**
 * Cópia de segurança antes de qualquer descarte (reformulação, Fase 5; ADR-009): nada some em
 * silêncio. Guarda o texto original, o motivo e a data; a última cópia de cada dono fica disponível.
 */
export function backupRaw(owner: string, raw: string, reason: string) {
  try {
    localStorage.setItem(backupKey(owner), JSON.stringify({ at: new Date().toISOString(), reason, raw }));
  } catch {
    /* sem espaço: não há o que fazer além de não apagar o original */
  }
}

export function readBackup(owner: string): { at: string; reason: string; raw: string } | null {
  try {
    return JSON.parse(localStorage.getItem(backupKey(owner)) ?? 'null');
  } catch {
    return null;
  }
}

export function loadData(owner: string): StudyData {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key(owner));
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as StudyData;
    if (parsed.version !== 1) {
      // Versão desconhecida: guarda o original e não o sobrescreve sem cópia.
      backupRaw(owner, raw, `versão desconhecida: ${String(parsed.version)}`);
      return emptyData();
    }
    return { ...emptyData(), ...parsed, pending: { ...emptyPending(), ...parsed.pending } };
  } catch {
    if (raw) backupRaw(owner, raw, 'dados ilegíveis');
    return emptyData();
  }
}

export function saveData(owner: string, data: StudyData) {
  try {
    localStorage.setItem(key(owner), JSON.stringify(data));
  } catch {
    // Armazenamento indisponível (modo privado, cota): os dados ficam só na memória e no espelho local.
  }
}

/** Remove os dados de um dono, guardando antes uma cópia de segurança. */
export function clearData(owner: string) {
  try {
    const raw = localStorage.getItem(key(owner));
    if (raw) backupRaw(owner, raw, 'limpeza após migração');
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
  /** Volumes separados, de 0 a 1 (ausente = 1). */
  musicVolume?: number;
  fireVolume?: number;
  /** Aparência personalizada (paleta, cores e estilos). Ausente = padrão. */
  look?: import('./theme').Look;
}
// v4 (25/10/2026, reformulação): identidade moderna clara. Quem vinha da v3/v2 mantém tamanho de
// letra, som, música e lareira; o tema passa para o claro uma vez, e a escolha volta a ser livre.
const PREFS = 'cronicas:prefs:v4';
const OLDER = ['cronicas:prefs:v3', 'cronicas:prefs:v2'];
export function loadPrefs(): Prefs {
  try {
    const cur = localStorage.getItem(PREFS);
    if (cur) return { fontScale: 1, theme: 'light', ...JSON.parse(cur) };
    for (const k of OLDER) {
      const old = localStorage.getItem(k);
      if (old) return { fontScale: 1, ...JSON.parse(old), theme: 'light' };
    }
    return { fontScale: 1, theme: 'light' };
  } catch {
    return { fontScale: 1, theme: 'light' };
  }
}
export function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(PREFS, JSON.stringify(p));
  } catch {
    /* ignora */
  }
}
