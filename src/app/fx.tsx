// Efeitos de comemoração: confete, avisos flutuantes (+XP, novo nível, selo) e sons curtos
// sintetizados (Web Audio, sem arquivos). Tudo respeita "reduzir movimento" e a preferência de som.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefs } from '@/app/prefs';
import { Icon, type IconName } from '@/components/Icon';

type Sfx = 'ok' | 'bad' | 'done' | 'level' | 'tap';
interface Toast {
  id: number;
  text: string;
  sub?: string;
  icon: IconName;
  color: string;
}
interface Fx {
  confetti: (amount?: number) => void;
  toast: (t: Omit<Toast, 'id'>) => void;
  sfx: (s: Sfx, force?: boolean) => void;
}

const FxCtx = createContext<Fx>({ confetti: () => {}, toast: () => {}, sfx: () => {} });
export const useFx = () => useContext(FxCtx);

const COLORS = ['#c2571f', '#e8b13b', '#3b6fb0', '#4a7f46', '#5160c4', '#d6456b'];
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

let audio: AudioContext | null = null;
function play(notes: [number, number, number][], type: OscillatorType = 'triangle', gain = 0.06) {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    audio ??= new Ctor();
    const t0 = audio.currentTime;
    for (const [freq, start, dur] of notes) {
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, t0 + start);
      g.gain.linearRampToValueAtTime(gain, t0 + start + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
      o.connect(g).connect(audio.destination);
      o.start(t0 + start);
      o.stop(t0 + start + dur + 0.02);
    }
  } catch {
    /* sem áudio */
  }
}

const SOUNDS: Record<Sfx, () => void> = {
  ok: () => play([[660, 0, 0.14], [990, 0.09, 0.22]]),
  bad: () => play([[220, 0, 0.18], [175, 0.12, 0.26]], 'sine', 0.07),
  done: () => play([[523, 0, 0.16], [659, 0.1, 0.16], [784, 0.2, 0.16], [1047, 0.3, 0.35]]),
  level: () => play([[392, 0, 0.14], [523, 0.12, 0.14], [659, 0.24, 0.14], [784, 0.36, 0.14], [1047, 0.5, 0.5]], 'square', 0.035),
  tap: () => play([[880, 0, 0.05]], 'sine', 0.03),
};

export function FxProvider({ children }: { children: ReactNode }) {
  const { prefs } = usePrefs();
  const [pieces, setPieces] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);
  const soundOn = prefs.sound !== false;

  const confetti = useCallback((amount = 60) => {
    if (reducedMotion()) return;
    const batch = Array.from({ length: amount }, () => {
      const id = ++seq.current;
      return {
        id,
        style: {
          left: `${Math.random() * 100}vw`,
          background: COLORS[id % COLORS.length],
          '--dx': `${(Math.random() - 0.5) * 30}vw`,
          '--rot': `${360 + Math.random() * 720}deg`,
          '--dur': `${2 + Math.random() * 1.6}s`,
          '--delay': `${Math.random() * 0.35}s`,
          width: `${6 + Math.random() * 6}px`,
          height: `${9 + Math.random() * 8}px`,
          borderRadius: id % 3 === 0 ? '9999px' : '2px',
        } as React.CSSProperties,
      };
    });
    setPieces((p) => [...p, ...batch]);
    window.setTimeout(() => setPieces((p) => p.filter((x) => !batch.some((b) => b.id === x.id))), 4200);
  }, []);

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = ++seq.current;
    setToasts((l) => [...l.slice(-2), { ...t, id }]);
    window.setTimeout(() => setToasts((l) => l.filter((x) => x.id !== id)), 2600);
  }, []);

  const sfx = useCallback((s: Sfx, force = false) => (soundOn || force) && SOUNDS[s](), [soundOn]);

  return (
    <FxCtx.Provider value={{ confetti, toast, sfx }}>
      {children}
      <div aria-hidden="true">
        {pieces.map((p) => (
          <span key={p.id} className="confetti-piece" style={p.style} />
        ))}
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="anim-toast-in flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 shadow-[var(--shadow-lift)]">
            <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: t.color }}>
              <Icon name={t.icon} size={18} strokeWidth={2.2} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">{t.text}</span>
              {t.sub && <span className="block text-xs text-muted">{t.sub}</span>}
            </span>
          </div>
        ))}
      </div>
    </FxCtx.Provider>
  );
}

/** Observa o estudo e comemora: +XP, novo nível e selos conquistados. */
export function useCelebrations(xp: number, level: number, seals: { id: string; name: string; done: boolean }[], lessonsDone = 0, cluesTotal = 0) {
  const { toast, confetti, sfx } = useFx();
  const last = useRef<{ xp: number; level: number; seals: Set<string>; lessons: number } | null>(null);
  useEffect(() => {
    const doneSeals = new Set(seals.filter((s) => s.done).map((s) => s.id));
    const prev = last.current;
    last.current = { xp, level, seals: doneSeals, lessons: lessonsDone };
    if (!prev) return;
    if (level > prev.level) {
      toast({ text: `Nível ${level}!`, sub: 'Você subiu de nível', icon: 'escudo', color: '#4a7f46' });
      confetti(90);
      sfx('level');
    } else if (xp > prev.xp) {
      toast({ text: `+${xp - prev.xp} XP`, icon: 'selo', color: '#a8740c' });
    }
    if (lessonsDone > prev.lessons && lessonsDone <= cluesTotal) {
      toast({ text: 'Nova pista no diário', sub: `Pista ${lessonsDone} de ${cluesTotal}`, icon: 'pergaminho', color: '#4a7f46' });
    }
    for (const s of seals) {
      if (s.done && !prev.seals.has(s.id)) {
        toast({ text: 'Selo conquistado', sub: s.name, icon: 'selo', color: '#c2571f' });
        confetti(50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp, level, seals.filter((s) => s.done).length, lessonsDone]);
}
