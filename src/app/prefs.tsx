import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadPrefs, savePrefs, type Prefs } from '@/lib/storage';
import { applyStatusBar, setImmersive } from '@/app/native';
import { normalizeMix, soundscape } from '@/app/soundscape';
import { LOOK_VERSION, applyLook, migrateLook, normalizeLook } from '@/lib/theme';

const PrefsCtx = createContext<{ prefs: Prefs; setPrefs: (p: Partial<Prefs>) => void } | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  // Aparência salva antes da identidade editorial: vale a nova, e a antiga fica guardada para voltar.
  const [prefs, set] = useState<Prefs>(() => {
    const p = loadPrefs();
    return p.look && p.look.v !== LOOK_VERSION ? { ...p, look: migrateLook(p.look) } : p;
  });
  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
    // Paleta e estilos escolhidos no painel de personalização (o padrão é a paleta Editorial).
    applyLook(normalizeLook(prefs.look), prefs.theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.theme === 'dark' ? '#151412' : '#f4f0e8');
    void applyStatusBar(prefs.theme);
    savePrefs(prefs);
  }, [prefs]);
  // Modo imersivo do Android: o nativo guarda a escolha; aqui só reforça quando a pessoa o desligou.
  useEffect(() => {
    if (prefs.immersive === false) void setImmersive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Sons para estudar: a mistura salva é aplicada, mas só toca depois que a pessoa aperta Tocar.
  useEffect(() => {
    soundscape.setMix(normalizeMix(prefs.sounds));
  }, [prefs.sounds]);
  return <PrefsCtx.Provider value={{ prefs, setPrefs: (p) => set((c) => ({ ...c, ...p })) }}>{children}</PrefsCtx.Provider>;
}

export function usePrefs() {
  const c = useContext(PrefsCtx);
  if (!c) throw new Error('usePrefs fora do PrefsProvider');
  return c;
}
