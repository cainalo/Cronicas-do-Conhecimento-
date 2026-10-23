// Tocha de parede: suporte de ferro, cabo de madeira e chama em camadas que tremula, com halo.
export function Torch({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 72" width={size * 0.56} height={size} className={className} aria-hidden="true">
      <circle className="torch-glow" cx="20" cy="18" r="17" fill="#ff9a3c" opacity=".6" style={{ filter: 'blur(6px)' }} />
      <path className="torch-flame" d="M20 2c7 9 10 15 6 23-2 4-10 4-12 0-4-8-1-14 6-23z" fill="#ff8a2a" />
      <path className="torch-flame-in" d="M20 10c4 6 5 10 3 15-1 3-5 3-6 0-2-5-1-9 3-15z" fill="#ffd36b" />
      <path d="M14 27h12l-2 8h-8z" fill="#3a2a1a" />
      <rect x="17" y="34" width="6" height="26" rx="2" fill="#6b4a2a" />
      <path d="M10 44h20v4H10z" fill="#4a4a4a" />
      <path d="M12 48h4v14h-4zM24 48h4v14h-4z" fill="#3a3a3a" />
      <circle cx="14" cy="66" r="2.5" fill="#555" />
      <circle cx="26" cy="66" r="2.5" fill="#555" />
    </svg>
  );
}
