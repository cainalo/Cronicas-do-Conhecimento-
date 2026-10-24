import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadPrefs, savePrefs, type Prefs } from '@/lib/storage';
import { applyStatusBar } from '@/app/native';
import { ambience } from '@/app/ambience';

const PrefsCtx = createContext<{ prefs: Prefs; setPrefs: (p: Partial<Prefs>) => void } | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, set] = useState<Prefs>(loadPrefs);
  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.theme === 'dark' ? '#2b1d12' : '#2b1d12');
    void applyStatusBar(prefs.theme);
    savePrefs(prefs);
  }, [prefs]);
  // Ambiente sonoro: liga conforme a preferência; navegadores só tocam depois de um toque na tela.
  useEffect(() => {
    if (import.meta.env.MODE === 'test') return;
    const apply = () => ambience.set({ music: !!prefs.music, fire: !!prefs.fire, musicVolume: prefs.musicVolume, fireVolume: prefs.fireVolume });
    apply();
    if (!prefs.music && !prefs.fire) return;
    const once = () => apply();
    window.addEventListener('pointerdown', once, { once: true });
    return () => window.removeEventListener('pointerdown', once);
  }, [prefs.music, prefs.fire, prefs.musicVolume, prefs.fireVolume]);
  return <PrefsCtx.Provider value={{ prefs, setPrefs: (p) => set((c) => ({ ...c, ...p })) }}>{children}</PrefsCtx.Provider>;
}

export function usePrefs() {
  const c = useContext(PrefsCtx);
  if (!c) throw new Error('usePrefs fora do PrefsProvider');
  return c;
}
