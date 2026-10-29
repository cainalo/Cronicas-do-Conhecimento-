import { Link } from 'react-router-dom';

/**
 * Assets-mestres recortados diretamente da prancha de identidade visual aprovada pelo usuário.
 * Não reconstruir a wordmark usando uma fonte aproximada; os arquivos ficam em public/brand.
 */
const markSrc = `${import.meta.env.BASE_URL}brand/portico-app-icon.jpg`;
const wordmarkSrc = `${import.meta.env.BASE_URL}brand/portico-wordmark.jpg`;

export function LogoMark({ size = 28, className = '' }: { size?: number; accent?: string; className?: string }) {
  return (
    <img
      src={markSrc}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={`shrink-0 rounded-[23%] object-contain ${className}`}
    />
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-2 text-ink" aria-label="Pórtico — conhecimento é o nosso ponto de partida">
      <LogoMark size={full ? 40 : 32} className="transition-transform duration-300 group-hover:-translate-y-px"/>
      <img
        src={wordmarkSrc}
        alt="Pórtico — conhecimento é o nosso ponto de partida"
        width={full ? 160 : 128}
        height={full ? 74 : 59}
        className={`block h-auto ${full ? 'w-32 sm:w-40' : 'w-24 sm:w-32'} object-contain transition-transform duration-300 group-hover:-translate-y-px`}
      />
    </Link>
  );
}
