// Prólogo da história: três telas na primeira visita, que podem ser puladas e revistas no Reino.
import { useState } from 'react';
import { prologue, PROLOGUE_KEY } from '@/content/game/story';
import { SceneBanner } from '@/components/SceneBanner';
import { useIsDark } from '@/components/Page';

export function prologueSeen(): boolean {
  try {
    return localStorage.getItem(PROLOGUE_KEY) === '1';
  } catch {
    return true;
  }
}

export function markPrologueSeen() {
  try {
    localStorage.setItem(PROLOGUE_KEY, '1');
  } catch {
    /* sem armazenamento: o prólogo pode reaparecer */
  }
}

export function Prologue({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const dark = useIsDark();
  const page = prologue[i];
  const last = i === prologue.length - 1;
  const close = () => {
    markPrologueSeen();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/45 p-3 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label="Prólogo">
      <div key={i} className="anim-toast-in w-full max-w-md rounded-[2rem] bg-bg p-4 shadow-2xl">
        <SceneBanner scene={page.scene} dark={dark} mood={last ? 'cheer' : 'talk'}>
          {page.title}
        </SceneBanner>
        <p className="px-1 text-[1.02rem] leading-relaxed">{page.text}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {prologue.map((_, k) => (
              <span key={k} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-ember' : 'w-2 bg-line'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            {!last && (
              <button type="button" className="btn-ghost !min-h-[42px] !px-4 text-sm" onClick={close}>
                Pular
              </button>
            )}
            <button type="button" className="btn-primary !min-h-[42px] !px-5 text-sm" onClick={() => (last ? close() : setI(i + 1))}>
              {last ? 'Começar a jornada' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
