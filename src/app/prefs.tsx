import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadPrefs, savePrefs, type Prefs } from '@/lib/storage';
import { applyStatusBar } from '@/app/native';

const PrefsCtx = createContext<{ prefs: Prefs; setPrefs: (p: Partial<Prefs>) => void } | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, set] = useState<Prefs>(loadPrefs);
  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.theme === 'dark' ? '#2b1d12' : '#2b1d12');
    void applyStatusBar(prefs.theme);
    savePrefs(prefs);
  }, [prefs]);
  return <PrefsCtx.Provider value={{ prefs, setPrefs: (p) => set((c) => ({ ...c, ...p })) }}>{children}</PrefsCtx.Provider>;
}

export function usePrefs() {
  const c = useContext(PrefsCtx);
  if (!c) throw new Error('usePrefs fora do PrefsProvider');
  return c;
}
