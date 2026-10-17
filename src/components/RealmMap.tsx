// Mapa do reino desenhado em SVG: cada disciplina do edital é uma região.
// Regiões sem grimório ficam sob névoa; as exploradas ganham aguada de cor conforme o domínio.
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Discipline } from '@/content/types';

export interface RegionState {
  discipline: Discipline;
  name: string;
  explored: boolean;
  mastery: number; // 0..1
  to?: string;
}

const COLS = 3;
const ROWS = 5;
const W = 300;
const H = 420;
const M = 22;

// Ruído determinístico para que o mapa seja sempre o mesmo.
const rnd = (a: number, b: number, k = 1) => {
  const x = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

type P = [number, number];

function useGeometry() {
  return useMemo(() => {
    const cw = (W - 2 * M) / COLS;
    const ch = (H - 2 * M) / ROWS;
    const V: P[][] = [];
    for (let i = 0; i <= COLS; i++) {
      V[i] = [];
      for (let j = 0; j <= ROWS; j++) {
        const edge = i === 0 || j === 0 || i === COLS || j === ROWS;
        const jx = rnd(i, j) * (edge ? 16 : 26);
        const jy = rnd(j, i, 2) * (edge ? 16 : 22);
        V[i][j] = [M + i * cw + jx, M + j * ch + jy];
      }
    }
    const mid = (a: P, b: P, s: number, amp: number): P => {
      const [x1, y1] = a;
      const [x2, y2] = b;
      const nx = -(y2 - y1);
      const ny = x2 - x1;
      const len = Math.hypot(nx, ny) || 1;
      return [(x1 + x2) / 2 + (nx / len) * s * amp, (y1 + y2) / 2 + (ny / len) * s * amp];
    };
    const Hm = (i: number, j: number) => mid(V[i][j], V[i + 1][j], rnd(i, j, 3), j === 0 || j === ROWS ? 22 : 16);
    const Em = (i: number, j: number) => mid(V[i][j], V[i][j + 1], rnd(i, j, 4), i === 0 || i === COLS ? 22 : 16);
    const cells: { c: number; r: number; pts: P[]; cx: number; cy: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const pts: P[] = [V[c][r], Hm(c, r), V[c + 1][r], Em(c + 1, r), V[c + 1][r + 1], Hm(c, r + 1), V[c][r + 1], Em(c, r)];
        const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
        const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
        cells.push({ c, r, pts, cx, cy });
      }
    }
    // Contorno da costa: percorre a borda externa.
    const coast: P[] = [];
    for (let i = 0; i < COLS; i++) coast.push(V[i][0], Hm(i, 0));
    for (let j = 0; j < ROWS; j++) coast.push(V[COLS][j], Em(COLS, j));
    for (let i = COLS; i > 0; i--) coast.push(V[i][ROWS], Hm(i - 1, ROWS));
    for (let j = ROWS; j > 0; j--) coast.push(V[0][j], Em(0, j - 1));
    return { cells, coast };
  }, []);
}

const path = (pts: P[]) => 'M' + pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L') + ' Z';

// Aguadas de cor (pigmentos terrosos) para as regiões exploradas.
const WASH = ['#b5523b', '#4f7a4a', '#3d5a8a', '#a07a2a', '#7a4a7a', '#3f7a78', '#8a5a3a'];

function wrap(name: string): string[] {
  const words = name.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 13 && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

export function RealmMap({ regions }: { regions: RegionState[] }) {
  const { cells, coast } = useGeometry();
  const navigate = useNavigate();
  const CAPITAL = 7; // célula central: a Torre
  let k = 0;
  const slots = cells.map((_, idx) => (idx === CAPITAL ? null : regions[k++] ?? null));

  return (
    <svg viewBox={`-10 -10 ${W + 20} ${H + 20}`} className="w-full" role="img" aria-label="Mapa do reino com as regiões de estudo">
      <defs>
        <filter id="tinta" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
        <pattern id="nevoa" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgb(60 40 20 / .28)" strokeWidth="1" />
        </pattern>
        <pattern id="mar" width="26" height="14" patternUnits="userSpaceOnUse">
          <path d="M2 9 q4 -4 8 0 t8 0" fill="none" stroke="rgb(50 70 90 / .35)" strokeWidth=".8" />
        </pattern>
      </defs>

      {/* Mar */}
      <rect x="-10" y="-10" width={W + 20} height={H + 20} fill="rgb(120 140 150 / .18)" />
      <rect x="-10" y="-10" width={W + 20} height={H + 20} fill="url(#mar)" />

      <g filter="url(#tinta)">
        <path d={path(coast)} fill="rgb(var(--parchment))" stroke="rgb(var(--ink) / .75)" strokeWidth="2.2" />
        {cells.map((cell, idx) => {
          const reg = slots[idx];
          if (idx === CAPITAL) {
            return <path key={idx} d={path(cell.pts)} fill="rgb(156 42 22 / .12)" stroke="rgb(var(--ink) / .5)" strokeWidth="1" strokeDasharray="3 2" />;
          }
          if (!reg) return null;
          const color = WASH[idx % WASH.length];
          return (
            <path
              key={idx}
              d={path(cell.pts)}
              fill={reg.explored ? color : 'url(#nevoa)'}
              fillOpacity={reg.explored ? 0.16 + reg.mastery * 0.5 : 1}
              stroke="rgb(var(--ink) / .5)"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
          );
        })}
        {/* Rio */}
        <path d="M 40 395 C 80 340, 60 300, 110 260 S 170 200, 150 150 S 200 70, 260 30" fill="none" stroke="rgb(60 90 120 / .55)" strokeWidth="2.4" />
      </g>

      {/* Rótulos e áreas de toque (fora do filtro, para ficarem nítidos) */}
      {cells.map((cell, idx) => {
        if (idx === CAPITAL) {
          return (
            <g key={idx} transform={`translate(${cell.cx} ${cell.cy})`}>
              <path d="M-9 8 V-6 l-3 -2 V-12 h4 v3 h3 v-3 h4 v3 h3 v-3 h4 v4 l-3 2 V8 z" fill="rgb(var(--ink) / .8)" />
              <text y="22" textAnchor="middle" className="font-display" fontSize="10" fill="rgb(var(--ember))">
                Torre dos Escribas
              </text>
            </g>
          );
        }
        const reg = slots[idx];
        if (!reg) return null;
        const lines = wrap(reg.name);
        return (
          <g
            key={idx}
            role="link"
            tabIndex={0}
            aria-label={`${reg.name}: ${reg.discipline.title}${reg.explored ? `, domínio ${Math.round(reg.mastery * 100)}%` : ', inexplorada'}`}
            className={reg.to ? 'cursor-pointer' : ''}
            onClick={() => reg.to && navigate(reg.to)}
            onKeyDown={(e) => e.key === 'Enter' && reg.to && navigate(reg.to)}
          >
            <path d={path(cell.pts)} fill="transparent" />
            {lines.map((l, i) => (
              <text
                key={i}
                x={cell.cx}
                y={cell.cy + (i - (lines.length - 1) / 2) * 11}
                textAnchor="middle"
                className="font-display"
                fontSize="9.5"
                fill={reg.explored ? 'rgb(var(--ink))' : 'rgb(var(--ink) / .45)'}
              >
                {l}
              </text>
            ))}
            {reg.explored && (
              <text x={cell.cx} y={cell.cy + (lines.length / 2) * 11 + 8} textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="rgb(var(--ember))">
                {Math.round(reg.mastery * 100)}%
              </text>
            )}
          </g>
        );
      })}

      {/* Rosa dos ventos */}
      <g transform={`translate(${W - 12} ${H - 6})`} fill="rgb(var(--ink) / .7)">
        <path d="M0 -14 L3 0 L0 14 L-3 0 Z M-14 0 L0 3 L14 0 L0 -3 Z" />
        <text y="-17" textAnchor="middle" fontSize="7" className="font-display">
          N
        </text>
      </g>
    </svg>
  );
}
