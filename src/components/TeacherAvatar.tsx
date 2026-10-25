// Retratos ilustrados dos professores fictícios do feed: vetor chapado, sem degradê, no estilo do
// app. Cada um tem cabelo, pele e roupa próprios; o fundo usa a cor do professor.
import type { FictionalTeacher } from '@/content/teachers';

type Look = { skin: string; hair: string; shirt: string; hairPath: string; extra?: string };

const LOOKS: Record<string, Look> = {
  // Cabelo longo e solto.
  'prof.clara': { skin: '#E9B994', hair: '#3B2418', shirt: '#F4F0E8', hairPath: 'M18 30c0-11 7-18 14-18s14 7 14 18v22h-6V31c-2-5-7-8-8-12-2 6-8 9-12 12v21h-2z' },
  // Coque no alto.
  'prof.lia': { skin: '#C98E6A', hair: '#1D1A17', shirt: '#F4F0E8', hairPath: 'M20 30c0-10 5-16 12-16s12 6 12 16c-3-5-7-8-12-8s-9 3-12 8zM27 10a5 5 0 1 0 10 0 5 5 0 1 0-10 0z' },
  // Cabelo curto e barba.
  'prof.davi': { skin: '#8D5A3F', hair: '#1D1A17', shirt: '#F4F0E8', hairPath: 'M20 28c0-9 5-14 12-14s12 5 12 14c-3-3-7-5-12-5s-9 2-12 5z', extra: 'M23 36c1 8 5 12 9 12s8-4 9-12c-2 3-5 4-9 4s-7-1-9-4z' },
  // Cabelo cacheado volumoso.
  'prof.iara': { skin: '#A86F4C', hair: '#2A1A12', shirt: '#F4F0E8', hairPath: 'M14 32c-3-6 0-12 5-13 1-6 7-9 13-8 6-1 12 2 13 8 5 1 8 7 5 13 2 5-1 10-5 11V30c-3-4-8-7-13-7s-10 3-13 7v13c-4-1-7-6-5-11z' },
};

export function TeacherAvatar({ t, size = 40, ring = false }: { t: FictionalTeacher; size?: number; ring?: boolean }) {
  const l = LOOKS[t.id] ?? LOOKS['prof.lia'];
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${ring ? 'ring-2 ring-gold ring-offset-2 ring-offset-bg' : ''}`}
      role="img"
      aria-label={`Retrato ilustrado de ${t.name}`}
    >
      <circle cx="32" cy="32" r="32" fill={`rgb(var(--${t.tone}))`} />
      <path d="M10 64c2-11 11-17 22-17s20 6 22 17z" fill={l.shirt} />
      <path d="M27 42h10v8c-2 2-8 2-10 0z" fill={l.skin} />
      <ellipse cx="32" cy="32" rx="11" ry="13" fill={l.skin} />
      <path d={l.hairPath} fill={l.hair} />
      {l.extra && <path d={l.extra} fill={l.hair} />}
      <circle cx="28" cy="32" r="1.3" fill="#1B1A17" />
      <circle cx="36" cy="32" r="1.3" fill="#1B1A17" />
      <path d="M29 38c2 1.5 4 1.5 6 0" stroke="#1B1A17" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
