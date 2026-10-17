// Trilha do capítulo, no estilo Duolingo (e da trilha do NutriConnect): cada seção é uma parada
// do caminho e a lição fecha o trecho. A parada atual pulsa e o mascote espera ao lado dela.
import { Link } from 'react-router-dom';
import type { Chapter } from '@/content/types';
import type { StudyData } from '@/lib/model';
import { getLesson } from '@/content';
import { Icon, type IconName } from '@/components/Icon';
import { Mascot } from '@/components/Mascot';
import { tint } from '@/app/areas';

interface Stop {
  key: string;
  to: string;
  label: string;
  icon: IconName;
  done: boolean;
  kind: 'read' | 'lesson';
}

const OFFSETS = [0, 62, 92, 62, 0, -62, -92, -62];
const ROW = 92;

export function chapterStops(c: Chapter, data: StudyData): Stop[] {
  const read = new Set(data.reading[c.id]?.sectionsRead ?? []);
  const stops: Stop[] = c.sections.map((s) => ({
    key: `${c.id}:${s.id}`,
    to: `/capitulo/${c.id}#${s.id}`,
    label: s.title.replace(/^\d+\.\s*/, ''),
    icon: 'grimorio',
    done: read.has(s.id),
    kind: 'read',
  }));
  for (const lid of c.lessonIds) {
    const l = getLesson(lid);
    stops.push({ key: lid, to: `/licao/${lid}`, label: l ? `Lição: ${l.title}` : 'Lição', icon: 'escudo', done: !!data.lessons[lid], kind: 'lesson' });
  }
  return stops;
}

/** Enfeites do cenário ao lado do caminho (árvores, torres, bandeiras). */
function Scenery({ i, color, side }: { i: number; color: string; side: 1 | -1 }) {
  const kind = i % 3;
  const style = { left: `calc(50% + ${side * 140}px - 22px)` };
  return (
    <svg viewBox="0 0 44 44" className="anim-floaty absolute h-11 w-11 opacity-70" style={{ ...style, top: i * ROW + 20, animationDelay: `${i * 0.4}s` }} aria-hidden="true">
      {kind === 0 && (
        <g>
          <path d="M22 6l12 18H10z M22 14l14 20H8z" fill={tint(color, 45)} />
          <rect x="20" y="33" width="4" height="7" fill={tint(color, 60)} />
        </g>
      )}
      {kind === 1 && (
        <g>
          <path d="M12 40V16l-2-2V8h4v3h4V8h8v3h4V8h4v6l-2 2v24" fill={tint(color, 40)} />
          <rect className="anim-flicker" x="19" y="22" width="6" height="8" rx="3" fill={color} />
        </g>
      )}
      {kind === 2 && (
        <g>
          <path d="M14 40V8" stroke={tint(color, 70)} strokeWidth="2.5" />
          <path className="anim-flag" d="M14 8h18l-5 6 5 6H14z" fill={tint(color, 55)} />
        </g>
      )}
    </svg>
  );
}

export function Trail({ chapter, data, color, guide = true }: { chapter: Chapter; data: StudyData; color: string; guide?: boolean }) {
  const stops = chapterStops(chapter, data);
  const current = stops.findIndex((s) => !s.done);
  const height = stops.length * ROW;
  // Caminho que liga os centros das paradas, em curvas suaves.
  const pts = stops.map((_, i) => [170 + OFFSETS[i % OFFSETS.length], i * ROW + 38]);
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    const my = (py + y) / 2;
    return `${acc} C${px} ${my} ${x} ${my} ${x} ${y}`;
  }, '');
  const doneUpTo = current === -1 ? stops.length - 1 : current;
  const dDone = pts.slice(0, doneUpTo + 1).reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = arr[i - 1];
    const my = (py + y) / 2;
    return `${acc} C${px} ${my} ${x} ${my} ${x} ${y}`;
  }, '');

  return (
    <div className="relative mx-auto w-full max-w-[340px]" style={{ height }}>
      <svg viewBox={`0 0 340 ${height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={d} fill="none" stroke="rgb(var(--line))" strokeWidth="10" strokeLinecap="round" strokeDasharray="2 16" />
        {doneUpTo > 0 && <path d={dDone} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray="2 16" opacity=".8" />}
      </svg>
      {stops.map((_, i) => (i % 2 === 1 ? <Scenery key={`s${i}`} i={i} color={color} side={OFFSETS[i % OFFSETS.length] >= 0 ? -1 : 1} /> : null))}
      <ol>
        {stops.map((s, i) => {
          const isCurrent = i === current;
          const x = OFFSETS[i % OFFSETS.length];
          return (
            <li key={s.key} className="absolute left-1/2" style={{ top: i * ROW, transform: `translateX(calc(-50% + ${x}px))` }}>
              <Link to={s.to} className="group flex flex-col items-center" aria-label={`${s.label}${s.done ? ' (feito)' : isCurrent ? ' (próxima)' : ''}`}>
                <span
                  className={`relative grid place-items-center rounded-full transition duration-200 group-hover:scale-105 group-active:scale-95 ${s.kind === 'lesson' ? 'h-[4.5rem] w-[4.5rem]' : 'h-16 w-16'} ${isCurrent ? 'ping-ring anim-hop' : ''}`}
                  style={{
                    color: s.done || isCurrent ? '#fff' : 'rgb(var(--muted))',
                    background: s.done
                      ? `linear-gradient(160deg, ${color}, color-mix(in srgb, ${color} 70%, #000))`
                      : isCurrent
                        ? `linear-gradient(160deg, rgb(var(--ember)), color-mix(in srgb, rgb(var(--ember)) 70%, #000))`
                        : 'rgb(var(--raised))',
                    boxShadow: s.done || isCurrent ? `0 6px 0 color-mix(in srgb, ${isCurrent ? 'rgb(var(--ember))' : color} 60%, #000), 0 12px 20px -10px rgb(0 0 0 / 0.4)` : '0 5px 0 rgb(var(--line))',
                  }}
                >
                  <Icon name={s.done ? 'certo' : s.icon} size={s.kind === 'lesson' ? 30 : 26} strokeWidth={2.2} />
                </span>
                <span className="mt-2 max-w-[9rem] truncate text-center text-[11px] font-semibold text-muted">{s.label}</span>
              </Link>
              {isCurrent && guide && (
                <div className={`pointer-events-none absolute -top-6 flex flex-col items-center ${x >= 0 ? 'right-full mr-1' : 'left-full ml-1'}`}>
                  <span className="anim-toast-in whitespace-nowrap rounded-xl border border-line bg-surface px-2 py-1 text-[11px] font-bold shadow-sm" style={{ color: 'rgb(var(--ember))' }}>
                    {s.kind === 'lesson' ? 'Hora da lição!' : 'Comece aqui'}
                  </span>
                  <Mascot mood="talk" size={52} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
