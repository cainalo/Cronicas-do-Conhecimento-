// Selo de lacre vermelho com a inicial gravada.
export function WaxSeal({ letter = 'C', size = 56, className = '' }: { letter?: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="cera" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#d2483a" />
          <stop offset=".55" stopColor="#9a1f17" />
          <stop offset="1" stopColor="#5a0d09" />
        </radialGradient>
      </defs>
      <path
        d="M32 3c4 0 6 3 9 3s7-1 9 2 1 6 3 9 6 5 5 9-4 5-4 8 3 6 1 9-6 2-8 5-3 7-7 8-6-2-8-2-5 3-9 2-4-5-6-7-7-2-8-6 2-6 1-9-5-5-4-9 5-5 6-8-1-7 2-9 6 0 9-2 4-3 8-3z"
        fill="url(#cera)"
      />
      <circle cx="32" cy="32" r="17" fill="none" stroke="#5a0d09" strokeWidth="2" opacity=".7" />
      <circle cx="32" cy="32" r="17" fill="none" stroke="#e46a5a" strokeWidth=".8" opacity=".5" transform="translate(-.6 -.6)" />
      <text x="32" y="41" textAnchor="middle" fontFamily="UnifrakturMaguntia, serif" fontSize="24" fill="#5a0d09" opacity=".85">
        {letter}
      </text>
      <text x="31.4" y="40.4" textAnchor="middle" fontFamily="UnifrakturMaguntia, serif" fontSize="24" fill="#e46a5a" opacity=".35">
        {letter}
      </text>
    </svg>
  );
}
