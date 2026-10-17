// Cenas ilustradas do topo das páginas centrais (biblioteca, campo de treino, reino), com o
// mascote e uma fala. Desenhos próprios em SVG, com detalhes animados.
import type { ReactNode } from 'react';
import { Mascot, type MascotMood } from '@/components/Mascot';

export type Scene = 'biblioteca' | 'treino' | 'reino' | 'conta';

function Art({ scene, dark }: { scene: Scene; dark: boolean }) {
  const sky = dark ? ['#20263d', '#3a2d3d'] : ['#f6e7c8', '#f9efdc'];
  return (
    <svg viewBox="0 0 360 140" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="360" height="140" fill={`url(#sky-${scene})`} />
      {/* nuvens */}
      <g className="anim-drift" fill={dark ? '#ffffff' : '#ffffff'} opacity={dark ? 0.08 : 0.8}>
        <ellipse cx="250" cy="26" rx="26" ry="8" />
        <ellipse cx="268" cy="22" rx="16" ry="8" />
        <ellipse cx="90" cy="18" rx="18" ry="6" />
      </g>
      {dark && (
        <g fill="#fff4d6">
          {[
            [40, 14],
            [130, 30],
            [210, 12],
            [320, 34],
            [300, 10],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.2" className="anim-twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </g>
      )}

      {scene === 'biblioteca' && (
        <g>
          {/* estantes */}
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x="150" y={36 + r * 32} width="200" height="4" rx="2" fill={dark ? '#5a4330' : '#b88a5c'} />
              {Array.from({ length: 12 }, (_, i) => {
                const h = 18 + ((i * 7 + r * 5) % 9);
                const colors = ['#9b3b2a', '#3b6fb0', '#4a7f46', '#a8740c', '#6b4a8f', '#c2571f'];
                return <rect key={i} x={156 + i * 16} y={36 + r * 32 - h} width="12" height={h} rx="2" fill={colors[(i + r) % colors.length]} opacity={dark ? 0.75 : 0.9} />;
              })}
            </g>
          ))}
          {/* vela */}
          <rect x="120" y="96" width="10" height="22" rx="2" fill="#f4ead6" />
          <path className="anim-flicker" d="M125 84c4 5 4 10 0 12-4-2-4-7 0-12z" fill="#e8b13b" />
          <circle cx="125" cy="90" r="16" fill="#e8b13b" opacity=".18" className="anim-twinkle" />
          <rect x="0" y="118" width="360" height="22" fill={dark ? '#2b241c' : '#e7d6b6'} />
        </g>
      )}

      {scene === 'treino' && (
        <g>
          <path d="M0 108c60-10 120-6 180 0s120 8 180-2v34H0z" fill={dark ? '#2f3a26' : '#c9d6a3'} />
          {/* alvo */}
          <g transform="translate(290 70)">
            <rect x="-2" y="10" width="4" height="40" fill={dark ? '#5a4330' : '#8a6240'} />
            <circle r="22" fill="#f4ead6" />
            <circle r="16" fill="#c2571f" />
            <circle r="10" fill="#f4ead6" />
            <circle r="4" fill="#c2571f" />
            <g className="anim-hop">
              <path d="M-40 -6l38 6" stroke="#5a3c22" strokeWidth="2.5" />
              <path d="M-44 -10l6 4-6 4" fill="#a8740c" />
            </g>
          </g>
          {/* boneco de treino */}
          <g transform="translate(210 64)" className="anim-floaty">
            <rect x="-2" y="20" width="4" height="34" fill={dark ? '#5a4330' : '#8a6240'} />
            <rect x="-16" y="16" width="32" height="5" rx="2" fill={dark ? '#5a4330' : '#8a6240'} />
            <ellipse cx="0" cy="26" rx="11" ry="14" fill="#d9c49a" />
            <circle cx="0" cy="6" r="9" fill="#d9c49a" />
          </g>
          {/* ampulheta */}
          <g transform="translate(150 78)">
            <path d="M-10 0h20M-10 36h20" stroke="#a8740c" strokeWidth="3" strokeLinecap="round" />
            <path d="M-8 1c0 10 8 11 8 17s-8 7-8 17h16c0-10-8-11-8-17s8-7 8-17z" fill="none" stroke="#a8740c" strokeWidth="2" />
            <path className="anim-sand" d="M-6 3h12c-1 6-6 9-6 12 0-3-5-6-6-12z" fill="#e8b13b" />
            <path className="anim-sand-fill" d="M-6 34h12c-2-5-4-6-6-8-2 2-4 3-6 8z" fill="#e8b13b" />
          </g>
        </g>
      )}

      {scene === 'reino' && (
        <g>
          <path d="M0 96l50-30 40 22 50-38 60 44 50-26 60 32 50-20v60H0z" fill={dark ? '#3a3046' : '#d7c4a0'} opacity=".8" />
          <path d="M0 112c70-14 140-12 200-2s110 10 160-4v34H0z" fill={dark ? '#2f3a26' : '#b9c98f'} />
          {/* castelo */}
          <g transform="translate(250 50)">
            <path d="M0 62V22l-4-3v-9h6v5h6v-5h12v5h6v-5h6v9l-4 3v40" fill={dark ? '#1b1520' : '#8a7a68'} />
            <path d="M22 10V-4" stroke={dark ? '#1b1520' : '#8a7a68'} strokeWidth="2" />
            <path className="anim-flag" d="M22 -4h14l-4 4 4 4H22z" fill="#c2571f" />
            <rect className="anim-flicker" x="13" y="30" width="6" height="10" rx="3" fill="#e8b13b" />
          </g>
          {/* estrada */}
          <path d="M180 140c10-20 40-26 70-30" stroke={dark ? '#5a4a36' : '#efe2c4'} strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>
      )}

      {scene === 'conta' && (
        <g>
          <path d="M0 116c70-10 140-8 200 0s110 8 160-2v26H0z" fill={dark ? '#2b241c' : '#e7d6b6'} />
          <g transform="translate(280 60)" className="anim-floaty">
            <path d="M0 0l22 8v16c0 14-10 24-22 28-12-4-22-14-22-28V8z" fill="#5160c4" />
            <path d="M-9 26l7 7 13-14" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g transform="translate(200 86)">
            <circle r="9" fill="none" stroke="#a8740c" strokeWidth="3" />
            <path d="M7 6l18 18M18 18l4-4M22 22l4-4" stroke="#a8740c" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      )}
    </svg>
  );
}

export function SceneBanner({ scene, children, mood = 'talk', dark = false }: { scene: Scene; children: ReactNode; mood?: MascotMood; dark?: boolean }) {
  return (
    <div className="relative mb-5 h-[9.5rem] overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-card)]">
      <Art scene={scene} dark={dark} />
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-1 p-3">
        <Mascot mood={mood} size={74} />
        <div className="anim-toast-in mb-10 max-w-[10.5rem] rounded-2xl rounded-bl-sm bg-surface/95 px-3 py-2 text-[13px] font-semibold leading-snug text-ink shadow-md backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
}
