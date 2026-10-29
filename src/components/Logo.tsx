import { Link } from 'react-router-dom';

const PORTICO = {
  petroleum: '#0F4C5C',
  terracotta: '#C8402A',
  ochre: '#D4A017',
  plum: '#6B3A6E',
  olive: '#556B2F',
  paper: '#F7EEDF',
};

/**
 * Identidade vetorial Pórtico.
 * O símbolo nasce do conceito de um portal: arco de entrada, estrela-guia e degraus.
 * Wordmark em SVG inline mantém contornos vetoriais em qualquer densidade de tela.
 * Não usar capturas/recortes rasterizados da prancha de referência.
 */
export function LogoMark({
  size = 30,
  className = '',
  color = PORTICO.petroleum,
  accent = PORTICO.terracotta,
  star = PORTICO.ochre,
  paper = PORTICO.paper,
  withTile = false,
}: {
  size?: number;
  className?: string;
  color?: string;
  accent?: string;
  star?: string;
  paper?: string;
  withTile?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 76"
      className={className}
      role="img"
      aria-label="Símbolo Pórtico"
      xmlns="http://www.w3.org/2000/svg"
    >
      {withTile && <rect x="0" y="0" width="64" height="76" rx="15" fill={color} />}
      <g transform={withTile ? 'translate(0 0)' : undefined}>
        <path
          d="M5 72V32A27 27 0 0 1 59 32V72Z M17 72V32A15 15 0 0 1 47 32V72Z"
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M18.5 54V33A13.5 13.5 0 0 1 45.5 33V54"
          fill="none"
          stroke={paper}
          strokeWidth="3.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M32 23L35.5 29.5L42 33L35.5 36.5L32 43L28.5 36.5L22 33L28.5 29.5Z" fill={star}/>
        <path d="M22 46H42L46 52H18Z" fill={accent}/>
        <path d="M17 53.5H47L51.5 60H12.5Z" fill={accent}/>
        <path d="M11.5 61.5H52.5L59 70H5Z" fill={accent}/>
      </g>
    </svg>
  );
}

export function PorticoWordmark({
  width = 190,
  className = '',
  showSlogan = false,
}: {
  width?: number;
  className?: string;
  showSlogan?: boolean;
}) {
  const heightRatio = showSlogan ? 0.42 : 0.34;
  return (
    <svg
      width={width}
      height={Math.round(width * heightRatio)}
      viewBox={showSlogan ? '0 0 320 134' : '0 0 320 108'}
      className={className}
      role="img"
      aria-label={showSlogan ? 'Pórtico — conhecimento é o nosso ponto de partida' : 'Pórtico'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="160"
        y="69"
        textAnchor="middle"
        fill={PORTICO.petroleum}
        fontFamily="'Fraunces Variable', Fraunces, Georgia, 'Times New Roman', serif"
        fontSize="63"
        fontWeight="650"
        letterSpacing="-2.8"
      >Pórtico</text>
      <path
        d="M72 82Q160 53 248 82"
        fill="none"
        stroke={PORTICO.petroleum}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M160 85L163.2 91.1L169.5 94L163.2 97L160 103L156.8 97L150.5 94L156.8 91.1Z" fill={PORTICO.terracotta}/>
      {showSlogan && (
        <text
          x="160"
          y="125"
          textAnchor="middle"
          fill={PORTICO.petroleum}
          fontFamily="'Inter Tight Variable', 'IBM Plex Sans', Arial, sans-serif"
          fontSize="9.2"
          fontWeight="600"
          letterSpacing="4.2"
        >CONHECIMENTO É O NOSSO PONTO DE PARTIDA</text>
      )}
    </svg>
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link
      to="/"
      className="group inline-flex min-w-0 items-center gap-2 text-ink"
      aria-label="Pórtico, início"
    >
      <LogoMark size={full ? 38 : 30} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"/>
      <span className="flex min-w-0 flex-col items-start">
        <PorticoWordmark width={full ? 184 : 148} className="block h-auto" showSlogan={full}/>
      </span>
    </Link>
  );
}
