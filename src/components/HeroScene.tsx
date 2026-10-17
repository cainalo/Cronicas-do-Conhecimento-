// Ilustração de abertura: a Torre dos Escribas ao entardecer. SVG próprio, animado com CSS
// (estrelas, janelas acesas, bandeiras), respeitando prefers-reduced-motion.
import type { ReactNode } from 'react';

const stars = [
  [30, 22, 1.1], [62, 40, 0.8], [96, 16, 1.2], [140, 34, 0.7], [178, 12, 1], [214, 44, 0.8], [252, 20, 1.2],
  [290, 38, 0.7], [326, 14, 1], [356, 46, 0.8], [48, 64, 0.6], [120, 58, 0.6], [236, 66, 0.6], [300, 70, 0.6],
] as const;

export function HeroScene({ children }: { children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_48px_-24px_rgb(0_0_0/0.8)]">
      <svg viewBox="0 0 380 230" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141a2e" />
            <stop offset=".55" stopColor="#3b2b3a" />
            <stop offset=".85" stopColor="#a4583a" />
            <stop offset="1" stopColor="#e3a05a" />
          </linearGradient>
          <radialGradient id="lua" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff4d6" />
            <stop offset=".7" stopColor="#f2dca8" />
            <stop offset="1" stopColor="#f2dca8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nevoa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e3a05a" stopOpacity="0" />
            <stop offset="1" stopColor="#e3a05a" stopOpacity=".35" />
          </linearGradient>
          <linearGradient id="sombra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#120f0c" stopOpacity="0" />
            <stop offset="1" stopColor="#120f0c" stopOpacity=".92" />
          </linearGradient>
        </defs>
        <rect width="380" height="230" fill="url(#ceu)" />
        {stars.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff1cf" style={{ animation: `twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.37}s infinite` }} />
        ))}
        <circle cx="300" cy="62" r="26" fill="url(#lua)" />
        <circle cx="300" cy="62" r="15" fill="#fbecc4" />

        {/* Montanhas em camadas */}
        <path d="M0 150 L40 112 L72 134 L118 92 L160 128 L196 104 L240 140 L282 108 L330 138 L380 116 V230 H0 Z" fill="#4a3446" opacity=".75" />
        <path d="M0 170 L50 140 L94 160 L140 132 L188 162 L236 140 L292 166 L340 146 L380 160 V230 H0 Z" fill="#33263a" />
        <rect y="120" width="380" height="80" fill="url(#nevoa)" />

        {/* Castelo */}
        <g fill="#1b1520">
          <path d="M150 188 V132 h8 v-6 h6 v6 h6 v-6 h6 v6 h8 V188 Z" />
          <path d="M176 188 V96 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 V188 Z" />
          <path d="M175 96 L191 66 L207 96 Z" />
          <path d="M206 188 V124 h7 v-6 h6 v6 h6 v-6 h6 v6 h7 V188 Z" />
          <path d="M120 188 V156 h40 v32 Z M222 188 V150 h44 v38 Z" />
          <path d="M118 156 l6 -6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 Z M220 150 l6 -6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h4 v6 Z" />
        </g>
        {/* Janelas acesas */}
        {[
          [187, 108], [195, 108], [191, 128], [160, 146], [222, 138], [234, 166], [140, 170], [191, 150],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="4" height="7" rx="2" fill="#f5c46a" style={{ animation: `flicker ${3 + (i % 3)}s ease-in-out ${i * 0.5}s infinite` }} />
        ))}
        {/* Bandeiras */}
        <line x1="191" y1="66" x2="191" y2="48" stroke="#1b1520" strokeWidth="1.5" />
        <path d="M191 48 h16 l-4 5 l4 5 h-16 Z" fill="#a8341f" style={{ transformOrigin: '191px 53px', animation: 'flag 2.6s ease-in-out infinite' }} />
        <line x1="160" y1="126" x2="160" y2="112" stroke="#1b1520" strokeWidth="1.2" />
        <path d="M160 112 h11 l-3 4 l3 4 h-11 Z" fill="#d4a24c" style={{ transformOrigin: '160px 116px', animation: 'flag 3.1s ease-in-out .4s infinite' }} />

        {/* Primeiro plano */}
        <path d="M0 200 Q60 182 120 192 T240 190 T380 196 V230 H0 Z" fill="#17121a" />
        <rect y="140" width="380" height="90" fill="url(#sombra)" />
      </svg>
      {children && <div className="absolute inset-x-0 bottom-0 p-5">{children}</div>}
    </div>
  );
}
