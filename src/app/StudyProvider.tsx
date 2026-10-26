import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { emptyData, emptyPending } from '@/lib/model';
import { GUEST, backupRaw, clearData, hasData, loadData, saveData } from '@/lib/storage';
import { getSnapshot, pickRecovery, putSnapshot } from '@/lib/localdb';
import { pendingCount, type StudyData } from '@/lib/model';
import { mergeData } from '@/lib/merge';
import { syncAll } from '@/lib/sync';
import { progressStoreKeys, resetFeedState, resetProgress } from '@/lib/reset';

export type SyncState = 'local' | 'idle' | 'syncing' | 'offline' | 'error';

interface Ctx {
  data: StudyData;
  update: (f: (d: StudyData) => StudyData) => void;
  session: Session | null;
  authReady: boolean;
  sync: { state: SyncState; pending: number; lastSyncAt?: string; error?: string };
  syncNow: () => Promise<StudyData | undefined>;
  /** Reinicia o progresso de estudos (pacote v4). Diz se a marca já chegou ao servidor. */
  resetAll: () => Promise<ResetOutcome>;
}

/** local = só aparelho (visitante); synced = servidor confirmou; pending = gravado aqui, envio pendente. */
export type ResetOutcome = 'local' | 'synced' | 'pending';

/** Andamento de estudo guardado fora do StudyData: só estas chaves são tocadas (nunca um clear geral). */
function resetLocalStores(owner: string) {
  try {
    const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).filter((k): k is string => !!k);
    for (const k of progressStoreKeys(keys, owner)) localStorage.removeItem(k);
    const feed = localStorage.getItem('cronicas:feed:v1');
    if (feed) localStorage.setItem('cronicas:feed:v1', JSON.stringify(resetFeedState(JSON.parse(feed))));
  } catch {
    /* sem armazenamento: nada a limpar */
  }
}

const StudyCtx = createContext<Ctx | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!supabase);
  const owner = session?.user.id ?? GUEST;
  const [data, setData] = useState<StudyData>(() => loadData(GUEST));
  const dataRef = useRef(data);
  dataRef.current = data;
  const [syncState, setSyncState] = useState<SyncState>('local');
  const [syncError, setSyncError] = useState<string>();
  const syncing = useRef(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: s }) => {
      setSession(s.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Troca de dono: carrega os dados do usuário e migra o progresso feito como visitante.
  useEffect(() => {
    let next = loadData(owner);
    if (owner !== GUEST) {
      const { progressResetAt: _guestReset, ...guest } = loadData(GUEST);
      // O reinício feito como visitante vale só para os dados do visitante, não para a conta.
      void _guestReset;
      if (hasData(guest)) {
        next = mergeData(next, guest, true);
        saveData(owner, next);
        clearData(GUEST);
      }
    }
    setData(next);
    setSyncState(owner === GUEST ? 'local' : 'idle');
    // Recuperação: se a cópia principal estiver vazia (apagada ou ilegível), usa o espelho do IndexedDB.
    let alive = true;
    void getSnapshot(owner).then((snap) => {
      const rec = pickRecovery(next, snap, hasData);
      if (!alive || !rec) return;
      const restored = { ...emptyData(), ...rec, pending: { ...emptyPending(), ...rec.pending } };
      // Só restaura se nada foi feito desde a abertura (nunca sobrescreve progresso novo).
      setData((cur) => {
        if (hasData(cur)) return cur;
        saveData(owner, restored);
        return restored;
      });
    });
    return () => {
      alive = false;
    };
  }, [owner]);

  // Espelho local estruturado: cada mudança vai também para o IndexedDB (assíncrono, agrupado).
  // Estado vazio não é gravado: assim uma cópia boa no espelho nunca é apagada por um carregamento falho.
  useEffect(() => {
    if (!hasData(data)) return;
    const t = window.setTimeout(() => void putSnapshot(owner, data), 400);
    return () => window.clearTimeout(t);
  }, [owner, data]);

  const update = useCallback(
    (f: (d: StudyData) => StudyData) => {
      setData((d) => {
        const n = f(d);
        saveData(owner, n);
        return n;
      });
    },
    [owner],
  );

  const syncNow = useCallback(async (): Promise<StudyData | undefined> => {
    if (!supabase || owner === GUEST || syncing.current) return undefined;
    if (!navigator.onLine) {
      setSyncState('offline');
      return undefined;
    }
    syncing.current = true;
    setSyncState('syncing');
    try {
      const snapshot = dataRef.current;
      const result = await syncAll(supabase, owner, snapshot);
      // Alterações feitas durante a sincronização são preservadas e ficam pendentes.
      setData((cur) => {
        const merged = cur === snapshot ? result : mergeData(result, cur);
        saveData(owner, merged);
        return merged;
      });
      setSyncState(pendingCount(result.pending) ? 'error' : 'idle');
      setSyncError(pendingCount(result.pending) ? 'Alguns registros não foram enviados; nova tentativa em breve.' : undefined);
      return result;
    } catch (e) {
      setSyncState(navigator.onLine ? 'error' : 'offline');
      setSyncError(e instanceof Error ? e.message : String(e));
      return undefined;
    } finally {
      syncing.current = false;
    }
  }, [owner]);

  const resetAll = useCallback(async (): Promise<ResetOutcome> => {
    const cur = dataRef.current;
    // Cópia de segurança antes de qualquer descarte (ADR-009).
    backupRaw(owner, JSON.stringify(cur), 'antes de reiniciar o progresso de estudos');
    const next = resetProgress(cur);
    saveData(owner, next);
    // O espelho recebe o estado reiniciado já agora, para nunca restaurar o progresso antigo.
    await putSnapshot(owner, next);
    resetLocalStores(owner);
    dataRef.current = next;
    setData(next);
    if (owner === GUEST || !supabase) return 'local';
    const result = await syncNow();
    return result && !result.pending.reset ? 'synced' : 'pending';
  }, [owner, syncNow]);

  // Sincroniza ao entrar, ao voltar a conexão, ao retornar à aba e após alterações.
  useEffect(() => {
    if (owner === GUEST) return;
    void syncNow();
    const on = () => void syncNow();
    const vis = () => document.visibilityState === 'visible' && void syncNow();
    window.addEventListener('online', on);
    document.addEventListener('visibilitychange', vis);
    return () => {
      window.removeEventListener('online', on);
      document.removeEventListener('visibilitychange', vis);
    };
  }, [owner, syncNow]);

  const pending = pendingCount(data.pending);
  useEffect(() => {
    if (owner === GUEST || pending === 0) return;
    // Em caso de erro, nova tentativa mais espaçada.
    const t = setTimeout(() => void syncNow(), syncState === 'error' ? 30000 : 1500);
    return () => clearTimeout(t);
  }, [owner, pending, syncNow, data, syncState]);

  const value = useMemo<Ctx>(
    () => ({
      data,
      update,
      session,
      authReady,
      sync: { state: syncState, pending, lastSyncAt: data.lastSyncAt, error: syncError },
      syncNow,
      resetAll,
    }),
    [data, update, session, authReady, syncState, pending, syncError, syncNow, resetAll],
  );

  return <StudyCtx.Provider value={value}>{children}</StudyCtx.Provider>;
}

export function useStudy() {
  const c = useContext(StudyCtx);
  if (!c) throw new Error('useStudy fora do StudyProvider');
  return c;
}
