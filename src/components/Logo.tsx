import { Link } from 'react-router-dom';

/**
 * Saberio brand mark: an open C-shaped path with a bridge spanning its center.
 * The wordmark below is drawn from custom SVG paths, not text rendered in a font.
 */
export function LogoMark({
  size = 32,
  accent = 'rgb(var(--gold))',
  color = 'rgb(var(--teal))',
  className = '',
}: {
  size?: number;
  accent?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M31 10C25 5 17 5 11 10 4 16 4 30 11 36 17 41 25 41 31 36"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 19Q36 13.8 42 19" fill="none" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M30 20.5H42" fill="none" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M32.5 20.5V24M39.5 20.5V24" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function SaberioWordmark({
  width = 220,
  color = 'rgb(var(--teal))',
  accent = 'rgb(var(--gold))',
  className = '',
}: {
  width?: number;
  color?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={Math.round(width * 42 / 230)}
      viewBox="0 0 230 42"
      role="img"
      aria-label="Saberio"
      focusable="false"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.9"
    >
      <g stroke={color}>
        <path d="M21 7C18 3.5 11 3 7 6 2 10 5 16 11 18L16 20C23 23 22 30 16 33 11 36 5 34 3 31" />
        <path d="M30 34L41.5 5 53 34M34.5 23H48.5" />
        <path d="M61 5V34M61 5H71C81 5 81 18 71 19H61M70 19C83 19 83 34 71 34H61" />
        <path d="M112 5H93V34H112M93 19.5H108" />
        <path d="M122 34V5H133C145 5 145 18 133 19H122M133 19L146 34" />
        <path d="M155 5H172M163.5 5V34M155 34H172" />
        <path d="M200 4.5C210 4.5 215 10.2 215 19.5S210 34.5 200 34.5 185 28.8 185 19.5 190 4.5 200 4.5Z" />
      </g>
      <g stroke={accent}>
        <path d="M34.5 23Q41.5 15.5 48.5 23M34.5 24.5H48.5" strokeWidth="2.9" />
        <path d="M37 24.5V27M46 24.5V27" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

/** Compact combined lockup for places where the complete brand signature is needed. */
export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2 text-ink" aria-label="Saberio, início">
      <LogoMark size={full ? 32 : 28} className="shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-6" />
      <SaberioWordmark width={full ? 184 : 156} className="h-auto" />
    </Link>
  );
}
