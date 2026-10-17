// Bubo, a coruja escriba: mascote que acompanha o estudo (como a Nina no NutriConnect).
// SVG próprio e animado (respira, pisca, acena, fala). Nome e papel provisórios até a
// rodada de narrativa com o usuário (ver docs/OPEN_QUESTIONS.md).
import type { ReactNode } from 'react';

export type MascotMood = 'idle' | 'talk' | 'cheer' | 'sad' | 'think';

export function Mascot({ mood = 'idle', size = 96, className = '' }: { mood?: MascotMood; size?: number; className?: string }) {
  const cheer = mood === 'cheer';
  const sad = mood === 'sad';
  return (
    <svg viewBox="0 0 120 140" width={size} height={(size * 140) / 120} className={`anim-bob shrink-0 overflow-visible ${className}`} aria-hidden="true">
      {/* sombra */}
      <ellipse cx="60" cy="134" rx="30" ry="4.5" fill="#000" opacity=".12" />
      {/* asa esquerda (acena com a pena) */}
      <g className={cheer || mood === 'talk' ? 'anim-wave' : ''}>
        <path d="M24 70c-12 6-16 22-10 34 6-3 14-10 18-20z" fill="#6b4a2f" />
        <path d="M9 64l-4-14" stroke="#b4532a" strokeWidth="3" strokeLinecap="round" />
        <path d="M5 50c-3-9 3-16 9-17-1 8-3 13-9 17z" fill="#f4ead6" stroke="#b4532a" strokeWidth="1.2" />
      </g>
      {/* asa direita */}
      <g className={cheer ? 'anim-wave' : ''} style={{ transformOrigin: '15% 15%' }}>
        <path d="M96 70c12 6 16 22 10 34-6-3-14-10-18-20z" fill="#6b4a2f" />
      </g>
      {/* corpo */}
      <path d="M60 30c-24 0-38 18-38 46 0 30 16 52 38 52s38-22 38-52c0-28-14-46-38-46z" fill="#8a6240" />
      <path d="M60 62c-15 0-24 12-24 30 0 18 10 30 24 30s24-12 24-30c0-18-9-30-24-30z" fill="#f2e3c6" />
      {/* penas do peito */}
      <path d="M50 84q5 4 10 0q5 4 10 0M46 96q7 5 14 0q7 5 14 0M50 108q5 4 10 0q5 4 10 0" stroke="#c9ad83" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* tufos */}
      <path d="M30 40l-6-18 16 10zM90 40l6-18-16 10z" fill="#6b4a2f" />
      {/* capuz de escriba */}
      <path d="M28 44c4-14 18-22 32-22s28 8 32 22c-10-6-20-8-32-8s-22 2-32 8z" fill="#b4532a" />
      <circle cx="60" cy="22" r="4" fill="#e8b13b" />
      {/* olhos */}
      <g className="anim-blink">
        <circle cx="45" cy="56" r="13" fill="#fffaf0" stroke="#5a3c22" strokeWidth="2" />
        <circle cx="75" cy="56" r="13" fill="#fffaf0" stroke="#5a3c22" strokeWidth="2" />
        {sad ? (
          <>
            <path d="M38 58q7-5 14 0M68 58q7-5 14 0" stroke="#2b1d0b" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : cheer ? (
          <>
            <path d="M38 58q7-8 14 0M68 58q7-8 14 0" stroke="#2b1d0b" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx={mood === 'think' ? 49 : 47} cy={mood === 'think' ? 52 : 57} r="6" fill="#2b1d0b" />
            <circle cx={mood === 'think' ? 79 : 77} cy={mood === 'think' ? 52 : 57} r="6" fill="#2b1d0b" />
            <circle cx={mood === 'think' ? 51 : 49} cy={mood === 'think' ? 50 : 55} r="2" fill="#fff" />
            <circle cx={mood === 'think' ? 81 : 79} cy={mood === 'think' ? 50 : 55} r="2" fill="#fff" />
          </>
        )}
      </g>
      {/* óculos de leitura */}
      <path d="M58 56h4" stroke="#5a3c22" strokeWidth="2" />
      {/* bico */}
      <g className={mood === 'talk' ? 'anim-talk' : ''}>
        <path d="M54 66l6 9 6-9z" fill="#e8a33b" />
      </g>
      {/* bochechas */}
      <circle cx="36" cy="70" r="4" fill="#e98b6d" opacity={cheer ? 0.7 : 0.35} />
      <circle cx="84" cy="70" r="4" fill="#e98b6d" opacity={cheer ? 0.7 : 0.35} />
      {/* pés */}
      <path d="M50 127l-4 6M54 127v7M58 127l4 6M66 127l-4 6M70 127v7M74 127l4 6" stroke="#e8a33b" strokeWidth="3" strokeLinecap="round" />
      {cheer && (
        <g className="anim-twinkle" fill="#e8b13b">
          <path d="M104 26l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
          <path d="M14 22l1.5 3.5 3.5 1.5-3.5 1.5L14 32l-1.5-3.5L9 27l3.5-1.5z" />
        </g>
      )}
    </svg>
  );
}

/** Balão de fala do mascote. */
export function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl rounded-bl-sm border border-line bg-surface px-3.5 py-2.5 text-sm font-medium leading-snug text-ink shadow-[var(--shadow-card)] ${className}`}>
      {children}
    </div>
  );
}

/** Mascote com fala, para o topo das páginas e para os momentos de resultado. */
export function MascotSays({ children, mood = 'talk', size = 84 }: { children: ReactNode; mood?: MascotMood; size?: number }) {
  return (
    <div className="flex items-end gap-2">
      <Mascot mood={mood} size={size} />
      <SpeechBubble className="mb-6 flex-1 anim-toast-in">{children}</SpeechBubble>
    </div>
  );
}
