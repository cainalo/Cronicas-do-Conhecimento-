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
  'prof.nina': { skin: '#E4B99B', hair: '#2C3444', shirt: '#FFF4E3', hairPath: 'M18 31c0-13 6-20 14-20s14 7 14 20v18H18z' },
  'prof.ravi': { skin: '#A96F4F', hair: '#241B18', shirt: '#F7EEDF', hairPath: 'M20 28c0-9 5-14 12-14s12 5 12 14c-4-4-8-5-12-5s-9 2-12 5z', extra: 'M23 37c2 7 6 10 9 10s7-3 9-10c-3 2-6 3-9 3s-6-1-9-3z' },
  'prof.mateus': { skin: '#D4A17B', hair: '#513629', shirt: '#F7EEDF', hairPath: 'M20 28c0-10 5-15 12-15s12 5 12 15c-4-4-8-5-12-5s-8 1-12 5z' },
  'prof.marina': { skin: '#B97855', hair: '#2C1D1B', shirt: '#F7EEDF', hairPath: 'M19 29c0-10 6-16 13-16s13 6 13 16c-4-4-8-6-13-6s-9 2-13 6zM43 22q10 10 3 24' },
  'prof.beatriz': { skin: '#E8C2A4', hair: '#493126', shirt: '#FFF5E8', hairPath: 'M20 29c0-10 5-16 12-16s12 6 12 16c-3-4-7-6-12-6s-9 2-12 6zM27 10a5 5 0 1 0 10 0 5 5 0 1 0-10 0z' },
  'prof.sofia': { skin: '#F0C6A5', hair: '#A64F2D', shirt: '#FFF4E4', hairPath: 'M18 30c0-12 6-18 14-18s14 6 14 18c-4-5-8-7-14-7s-10 2-14 7zM18 30q-8 8-3 19M46 30q8 8 3 19' },
  'prof.helena': { skin: '#D5A17B', hair: '#211E28', shirt: '#F7EEDF', hairPath: 'M18 30c0-12 6-18 14-18s14 6 14 18v25h-5V31c-2-5-6-7-9-8-4 2-8 4-10 9v23h-4z' },
  'prof.augusto': { skin: '#B77D5D', hair: '#D2C7B5', shirt: '#F7EEDF', hairPath: 'M20 28c0-9 5-14 12-14s12 5 12 14c-4-3-8-4-12-4s-8 1-12 4z' },
  'prof.caio': { skin: '#D09A76', hair: '#27222B', shirt: '#F7EEDF', hairPath: 'M20 28c0-10 5-14 12-14s12 4 12 14c-4-4-8-5-12-5s-8 1-12 5z' },
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
