// Marca da identidade editorial: um "C" em arco aberto com o ponto final em vermelhão, a mesma
// assinatura dos ícones. A palavra "Crônicas" vem em Fraunces.
import { Link } from 'react-router-dom';

export function LogoMark({ size = 28, accent = 'rgb(var(--gold))', className = '' }: { size?: number; accent?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <path d="M23.7 9.6A10 10 0 1 0 23.7 22.4" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="butt" />
      <circle cx="25.6" cy="16" r="2.5" fill={accent} />
    </svg>
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2 text-ink" aria-label="Crônicas do Conhecimento, início">
      <LogoMark size={26} className="transition-transform duration-500 ease-out group-hover:-rotate-12" />
      <span className="whitespace-nowrap font-title text-[1.18rem] font-semibold leading-none tracking-[-0.02em]">
        Crônicas
        {full && <span className="font-normal italic text-muted"> do Conhecimento</span>}
      </span>
    </Link>
  );
}
