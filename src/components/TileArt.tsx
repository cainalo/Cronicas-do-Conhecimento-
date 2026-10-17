// Desenhos animados dos cartões (como na página Funções do NutriConnect): cada cartão tem a
// sua cena no canto. Decoração (aria-hidden); "reduzir movimento" para tudo.
export type ArtId = 'ampulheta' | 'cartas' | 'relogio' | 'pena' | 'calendario' | 'lista' | 'mapa' | 'escudo' | 'grafico' | 'pergaminho' | 'grimorio' | 'torre' | 'chama';

export function TileArt({ art, color }: { art: ArtId; color: string }) {
  const soft = `color-mix(in srgb, ${color} 30%, transparent)`;
  const mid = `color-mix(in srgb, ${color} 60%, transparent)`;
  return (
    <svg
      viewBox="0 0 64 64"
      className="pointer-events-none absolute right-2 top-2 h-[3.75rem] w-[3.75rem] opacity-90 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
      aria-hidden="true"
    >
      {art === 'ampulheta' && (
        <g>
          <path d="M18 8h28M18 56h28" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M21 9c0 14 11 16 11 23S21 41 21 55h22c0-14-11-16-11-23s11-9 11-23z" fill="none" stroke={mid} strokeWidth="2.5" />
          <path className="anim-sand" d="M24 12h16c-1 9-8 13-8 17-0-4-7-8-8-17z" fill={color} />
          <rect className="anim-drip" x="31" y="31" width="2" height="5" rx="1" fill={color} />
          <path className="anim-sand-fill" d="M24 53h16c-2-7-6-9-8-11-2 2-6 4-8 11z" fill={color} />
        </g>
      )}
      {art === 'cartas' && (
        <g>
          <rect x="14" y="16" width="26" height="36" rx="4" fill={soft} transform="rotate(-12 27 34)" />
          <g className="anim-flip">
            <rect x="24" y="12" width="26" height="36" rx="4" fill={color} />
            <path d="M30 24h14M30 30h14M30 36h9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".85" />
          </g>
        </g>
      )}
      {art === 'relogio' && (
        <g>
          <circle cx="34" cy="36" r="20" fill={soft} stroke={color} strokeWidth="3" />
          <path d="M28 10h12" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <path className="anim-spin" d="M34 36V22" stroke={color} strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '34px 36px' }} />
          <path d="M34 36l8 5" stroke={mid} strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="36" r="2.5" fill={color} />
        </g>
      )}
      {art === 'pena' && (
        <g>
          <rect x="8" y="34" width="48" height="24" rx="4" fill={soft} />
          <path className="anim-write" d="M14 48c6-6 10 4 16-2s8 2 12-2" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <g className="anim-floaty">
            <path d="M52 6c-12 2-20 12-24 30l3 3c16-6 24-16 21-33z" fill={color} />
            <path d="M28 36l-4 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      )}
      {art === 'calendario' && (
        <g>
          <rect x="10" y="14" width="44" height="40" rx="6" fill={soft} stroke={color} strokeWidth="2.5" />
          <rect x="10" y="14" width="44" height="11" rx="5" fill={color} />
          <path d="M20 10v8M44 10v8" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={16 + i * 9} y="31" width="6" height="6" rx="1.5" fill={mid} />
          ))}
          <path className="anim-write" d="M17 44l4 4 8-8" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {art === 'lista' && (
        <g>
          <rect x="12" y="8" width="40" height="50" rx="5" fill={soft} />
          {[18, 30, 42].map((y, i) => (
            <g key={y}>
              <circle cx="21" cy={y} r="3.5" fill={i < 2 ? color : 'none'} stroke={color} strokeWidth="2" />
              <rect className="anim-grow" style={{ animationDelay: `${i * 0.2}s`, transformOrigin: 'left', transformBox: 'fill-box' }} x="28" y={y - 2} width={18 - i * 3} height="4" rx="2" fill={mid} />
            </g>
          ))}
        </g>
      )}
      {art === 'mapa' && (
        <g>
          <path d="M6 18l16-6 18 6 18-6v36l-18 6-18-6-16 6z" fill={soft} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M14 40c6-10 14 2 22-8s10-6 14-4" stroke={color} strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <path d="M48 26v-14" stroke={color} strokeWidth="2.5" />
          <path className="anim-flag" d="M48 12h10l-3 4 3 4H48z" fill={color} />
        </g>
      )}
      {art === 'escudo' && (
        <g className="anim-floaty">
          <path d="M32 6l20 7v14c0 13-9 22-20 26-11-4-20-13-20-26V13z" fill={color} />
          <path d="M32 12l14 5v10c0 9-6 16-14 19z" fill="#fff" opacity=".22" />
          <path d="M24 30l6 6 11-12" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {art === 'grafico' && (
        <g>
          {[
            [12, 30],
            [24, 20],
            [36, 36],
            [48, 46],
          ].map(([x, h], i) => (
            <rect key={x} className="anim-grow" style={{ animationDelay: `${i * 0.15}s` }} x={x} y={56 - h} width="8" height={h} rx="2.5" fill={i === 3 ? color : mid} />
          ))}
          <path d="M8 57h50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {art === 'pergaminho' && (
        <g className="anim-floaty">
          <rect x="14" y="10" width="36" height="44" rx="3" fill={soft} />
          <path d="M14 12a5 5 0 0 1 5-5h28a5 5 0 0 1 0 10M50 52a5 5 0 0 1-5 5H17a5 5 0 0 1 0-10" fill={color} />
          <path d="M22 24h20M22 31h20M22 38h14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {art === 'grimorio' && (
        <g className="anim-floaty">
          <path d="M12 16c8-4 14-4 20 2 6-6 12-6 20-2v34c-8-4-14-4-20 2-6-6-12-6-20-2z" fill={soft} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 18v34" stroke={color} strokeWidth="2" />
          <path className="anim-twinkle" d="M46 6l1.8 4 4 1.8-4 1.8L46 18l-1.8-4.4-4-1.8 4-1.8z" fill={color} />
        </g>
      )}
      {art === 'chama' && (
        <g>
          <path className="anim-flicker" d="M32 6c3 10 16 15 16 30a16 16 0 0 1-32 0c0-8 5-13 8-16 0 6 3 9 6 9 0-9-2-15 2-23z" fill={color} />
          <path className="anim-flicker" style={{ animationDelay: '.3s' }} d="M32 30c2 5 8 8 8 15a8 8 0 0 1-16 0c0-4 3-7 4-8 1 3 2 4 3 4 0-4 0-7 1-11z" fill="#fff" opacity=".55" />
          <path className="anim-twinkle" d="M52 12l1.5 3.5 3.5 1.5-3.5 1.5L52 22l-1.5-3.5L47 17l3.5-1.5z" fill={color} />
        </g>
      )}
      {art === 'torre' && (
        <g>
          <path d="M20 58V24l-3-2v-8h5v4h5v-4h10v4h5v-4h5v8l-3 2v34" fill={soft} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <rect className="anim-flicker" x="29" y="32" width="6" height="9" rx="3" fill={color} />
          <path d="M42 14V4" stroke={color} strokeWidth="2" />
          <path className="anim-flag" d="M42 4h10l-3 3 3 3H42z" fill={color} />
        </g>
      )}
    </svg>
  );
}
