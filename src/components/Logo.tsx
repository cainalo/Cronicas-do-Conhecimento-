import { Link } from 'react-router-dom';

/** Recortes rasterizados extraídos da prancha original da identidade do Pórtico. */
const brandAsset = (name: string) => import.meta.env.BASE_URL + 'images/brand/' + name;

export function LogoMark({
  size = 32,
  className = '',
}: {
  size?: number;
  color?: string;
  accent?: string;
  star?: string;
  paper?: string;
  className?: string;
}) {
  return (
    <img
      src={brandAsset('portico-mark.png')}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export function PorticoWordmark({
  width = 200,
  className = '',
}: {
  width?: number;
  color?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <img
      src={brandAsset('portico-wordmark.png')}
      width={width}
      height={Math.round(width * 117 / 320)}
      alt="Pórtico"
      draggable={false}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2 text-ink" aria-label="Pórtico, início">
      <LogoMark size={full ? 34 : 29} className="shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
      <span className="flex min-w-0 flex-col items-start">
        <PorticoWordmark width={full ? 184 : 156} className="h-auto" />
        {full && <span className="mt-0.5 text-[0.42rem] leading-tight tracking-[0.2em] text-muted">CONHECIMENTO É O NOSSO PONTO DE PARTIDA</span>}
      </span>
    </Link>
  );
}
