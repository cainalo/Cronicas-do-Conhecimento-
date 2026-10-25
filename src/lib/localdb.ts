// Espelho local estruturado (reformulação, Fase 5; spec 17). O progresso continua no localStorage
// (compatível com tudo o que existe) e passa a ter uma cópia no IndexedDB do aparelho, que resiste a
// limpeza de cota e serve de recuperação se a chave principal sumir ou vier corrompida. A gravação é
// assíncrona e nunca bloqueia o estudo; a leitura de recuperação só é usada se a principal estiver vazia.
import type { StudyData } from './model';

const DB = 'cronicas';
const STORE = 'snapshots';
const VERSION = 1;

export interface Snapshot {
  owner: string;
  savedAt: string;
  data: StudyData;
}

function open(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    const req = indexedDB.open(DB, VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE, { keyPath: 'owner' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

export async function putSnapshot(owner: string, data: StudyData, now = new Date().toISOString()): Promise<boolean> {
  const db = await open();
  if (!db) return false;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put({ owner, savedAt: now, data } satisfies Snapshot);
    tx.oncomplete = () => {
      db.close();
      resolve(true);
    };
    tx.onerror = () => {
      db.close();
      resolve(false);
    };
  });
}

export async function getSnapshot(owner: string): Promise<Snapshot | null> {
  const db = await open();
  if (!db) return null;
  return new Promise((resolve) => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(owner);
    req.onsuccess = () => {
      db.close();
      resolve((req.result as Snapshot | undefined) ?? null);
    };
    req.onerror = () => {
      db.close();
      resolve(null);
    };
  });
}

/** Escolhe o que carregar: a principal se tiver progresso; senão, a cópia do IndexedDB, se tiver. */
export function pickRecovery(primary: StudyData, snapshot: Snapshot | null, hasData: (d: StudyData) => boolean): StudyData | null {
  if (hasData(primary) || !snapshot || snapshot.data.version !== 1 || !hasData(snapshot.data)) return null;
  return snapshot.data;
}
