// Ilustrações próprias em traço (identidade editorial, 25/10/2026). Desenho de linha fina na cor
// do texto, com um único detalhe chapado na cor de destaque. Cada traço tem pathLength=1 e se
// desenha ao aparecer (classe .draw em index.css); o detalhe de cor entra por último.
import type { CSSProperties, ReactNode } from 'react';

const L = { pathLength: 1 } as const;

type Art = { draw: ReactNode; accent: ReactNode };

const ART = {
  computador: {
    draw: (
      <>
        <path {...L} d="M14 104h132" />
        <rect {...L} x="30" y="18" width="100" height="64" rx="3" />
        <path {...L} d="M42 34h30M42 44h46M50 54h28M42 64h14" />
        <path {...L} d="M72 82v10M88 82v10M60 92h40" />
        <path {...L} d="M114 90h12v9a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3zM126 93h2.5a2.5 2.5 0 0 1 0 5H126" />
        <path {...L} d="M118 84c-2-2 2-4 0-6M122 84c-2-2 2-4 0-6" />
      </>
    ),
    accent: <rect x="60" y="59" width="6" height="9" />,
  },
  rede: {
    draw: (
      <>
        <path {...L} d="M46 34 74 56M114 34 86 56M80 68v16M46 98h68" />
        <circle {...L} cx="40" cy="28" r="9" />
        <circle {...L} cx="120" cy="28" r="9" />
        <circle {...L} cx="80" cy="60" r="10" />
        <circle {...L} cx="38" cy="98" r="8" />
        <circle {...L} cx="122" cy="98" r="8" />
        <path {...L} d="M80 84v6" />
      </>
    ),
    accent: <circle cx="60" cy="44" r="4.5" />,
  },
  cadeado: {
    draw: (
      <>
        <path {...L} d="M18 106h124" />
        <rect {...L} x="48" y="52" width="64" height="50" rx="4" />
        <path {...L} d="M62 52V38a18 18 0 0 1 36 0v14" />
        <circle {...L} cx="80" cy="72" r="5.5" />
        <path {...L} d="M80 77.5v10" />
        <path {...L} d="M126 30l6-6M130 42h8M120 22v-8" />
      </>
    ),
    accent: <rect x="74" y="92" width="12" height="4" />,
  },
  nuvem: {
    draw: (
      <>
        <path {...L} d="M50 66a15 15 0 0 1 2-30 22 22 0 0 1 42-8 17 17 0 0 1 14 38z" />
        <path {...L} d="M80 66v16" />
        <rect {...L} x="52" y="82" width="56" height="11" rx="2" />
        <rect {...L} x="52" y="96" width="56" height="11" rx="2" />
        <path {...L} d="M60 87.5h4M60 101.5h4M18 112h124" />
      </>
    ),
    accent: <circle cx="98" cy="87.5" r="2.6" />,
  },
  dados: {
    draw: (
      <>
        <ellipse {...L} cx="66" cy="28" rx="32" ry="9" />
        <path {...L} d="M34 28v56c0 5 14.3 9 32 9s32-4 32-9V28" />
        <path {...L} d="M34 47c0 5 14.3 9 32 9s32-4 32-9M34 66c0 5 14.3 9 32 9s32-4 32-9" />
        <path {...L} d="M108 46h36v44h-36zM108 60h36M108 75h36M124 46v44" />
      </>
    ),
    accent: <rect x="124" y="60" width="20" height="15" />,
  },
  balanca: {
    draw: (
      <>
        <path {...L} d="M80 26v70M58 96h44M36 36h88" />
        <path {...L} d="M36 36 24 64h24zM124 36l-12 28h24z" />
        <path {...L} d="M22 64a14 6 0 0 0 28 0M110 64a14 6 0 0 0 28 0" />
        <path {...L} d="M14 108h132" />
      </>
    ),
    accent: <circle cx="80" cy="24" r="4.5" />,
  },
  calendario: {
    draw: (
      <>
        <rect {...L} x="34" y="26" width="92" height="76" rx="3" />
        <path {...L} d="M34 44h92M56 18v14M104 18v14" />
        <path {...L} d="M48 58h10M70 58h10M92 58h10M48 74h10M70 74h10M48 90h10M70 90h10M92 90h10" />
      </>
    ),
    accent: <rect x="90" y="69" width="14" height="11" />,
  },
  trilha: {
    draw: (
      <>
        <path {...L} d="M18 104c28 0 26-38 56-38s30-40 60-40" />
        <circle {...L} cx="18" cy="104" r="5" />
        <circle {...L} cx="74" cy="66" r="5" />
        <path {...L} d="M134 26V6" />
        <path {...L} d="M14 114h132" />
      </>
    ),
    accent: <path d="M134 6h16l-4.5 5 4.5 5h-16z" />,
  },
  revisao: {
    draw: (
      <>
        <path {...L} d="M54 24h52v72H54z" />
        <path {...L} d="M46 32v72h52" />
        <path {...L} d="M66 60l9 9 18-20" />
        <path {...L} d="M128 44a30 30 0 0 1-6 40M122 84l-1-9M122 84l-9 1" />
        <path {...L} d="M64 38h20" />
      </>
    ),
    accent: <rect x="64" y="80" width="28" height="4" />,
  },
  progresso: {
    draw: (
      <>
        <path {...L} d="M18 104h124" />
        <path {...L} d="M34 104V82M60 104V68M86 104V56M112 104V36" />
        <path {...L} d="M28 76 56 62l26-12 34-24" />
      </>
    ),
    accent: <circle cx="118" cy="25" r="5" />,
  },
  suporte: {
    draw: (
      <>
        <rect {...L} x="22" y="16" width="116" height="70" rx="3" />
        <path {...L} d="M22 28h116" />
        <path {...L} d="M34 42l8 6-8 6M48 54h20" />
        <path {...L} d="M34 72h18l6-10 8 18 8-26 6 18h22" />
        <path {...L} d="M68 86v10M92 86v10M56 96h48M14 106h132" />
      </>
    ),
    accent: <circle cx="122" cy="22" r="2.6" />,
  },
  professores: {
    draw: (
      <>
        <path {...L} d="M20 22h72v42H52L38 76V64H20z" />
        <path {...L} d="M32 36h48M32 48h34" />
        <path {...L} d="M70 74h70v36h-14v12l-14-12H70z" />
        <path {...L} d="M82 88h44M82 98h26" />
      </>
    ),
    accent: <circle cx="122" cy="98" r="3.5" />,
  },
  alvo: {
    draw: (
      <>
        <circle {...L} cx="70" cy="62" r="38" />
        <circle {...L} cx="70" cy="62" r="24" />
        <circle {...L} cx="70" cy="62" r="10" />
        <path {...L} d="M74 58 134 20M122 20h12v12" />
      </>
    ),
    accent: <circle cx="70" cy="62" r="4" />,
  },
  vazio: {
    draw: (
      <>
        <path {...L} d="M30 54l50-18 50 18-50 18z" />
        <path {...L} d="M30 54v34l50 18 50-18V54M80 72v34" />
        <path {...L} d="M30 54 16 40l50-18 14 14M130 54l14-14-50-18-14 14" />
      </>
    ),
    accent: <circle cx="80" cy="18" r="3.5" />,
  },
  // História do computador e primeiros conceitos (25/10/2026): ilustrações para a série
  // "O que é um computador" e para os posts do feed.
  abaco: {
    draw: (
      <>
        <rect {...L} x="22" y="16" width="116" height="92" rx="3" />
        <path {...L} d="M22 40h116M22 62h116M22 84h116" />
        <circle {...L} cx="40" cy="40" r="6" />
        <circle {...L} cx="54" cy="40" r="6" />
        <circle {...L} cx="108" cy="40" r="6" />
        <circle {...L} cx="40" cy="62" r="6" />
        <circle {...L} cx="94" cy="62" r="6" />
        <circle {...L} cx="108" cy="62" r="6" />
        <circle {...L} cx="122" cy="62" r="6" />
        <circle {...L} cx="54" cy="84" r="6" />
        <circle {...L} cx="68" cy="84" r="6" />
        <path {...L} d="M14 116h132" />
      </>
    ),
    accent: <circle cx="122" cy="40" r="6" />,
  },
  engrenagem: {
    draw: (
      <>
        <circle {...L} cx="62" cy="62" r="26" />
        <circle {...L} cx="62" cy="62" r="7" />
        <path {...L} d="M62 28v8M62 88v8M28 62h8M88 62h8M38 38l6 6M80 80l6 6M38 86l6-6M80 44l6-6" />
        <circle {...L} cx="114" cy="40" r="16" />
        <circle {...L} cx="114" cy="40" r="4.5" />
        <path {...L} d="M114 18v6M114 56v6M92 40h6M130 40h6" />
        <path {...L} d="M18 112h124" />
      </>
    ),
    accent: <circle cx="62" cy="62" r="3" />,
  },
  cartao: {
    draw: (
      <>
        <path {...L} d="M24 30h104l12 12v58H24z" />
        <path {...L} d="M128 30v12h12" />
        <path {...L} d="M38 48h6M56 48h6M86 48h6M38 62h6M74 62h6M104 62h6M48 76h6M66 76h6M96 76h6M38 90h6M86 90h6M116 90h6" />
        <path {...L} d="M16 112h128" />
      </>
    ),
    accent: <rect x="114" y="46" width="6" height="4" />,
  },
  valvula: {
    draw: (
      <>
        <path {...L} d="M60 92V44a20 20 0 0 1 40 0v48z" />
        <path {...L} d="M56 92h48v10H56zM66 102v12M80 102v12M94 102v12" />
        <path {...L} d="M70 80V58h20v22M80 58V48" />
        <path {...L} d="M112 30l8-6M116 44h10M48 30l-8-6M44 44H34" />
      </>
    ),
    accent: <circle cx="80" cy="44" r="4" />,
  },
  chip: {
    draw: (
      <>
        <rect {...L} x="48" y="30" width="64" height="64" rx="4" />
        <rect {...L} x="62" y="44" width="36" height="36" rx="2" />
        <path {...L} d="M58 30V18M70 30V18M82 30V18M94 30V18M106 30V18M58 106V94M70 106V94M82 106V94M94 106V94M106 106V94M48 40H36M48 52H36M48 64H36M48 76H36M48 88H36M112 40h12M112 52h12M112 64h12M112 76h12M112 88h12" />
      </>
    ),
    accent: <rect x="74" y="56" width="12" height="12" />,
  },
  pessoal: {
    draw: (
      <>
        <path {...L} d="M40 18h80v62H40z" />
        <rect {...L} x="50" y="28" width="60" height="42" rx="2" />
        <path {...L} d="M60 42h20M60 52h32" />
        <path {...L} d="M66 80l-6 10h40l-6-10" />
        <path {...L} d="M28 98h104l6 10H22z" />
        <path {...L} d="M42 102h76" />
      </>
    ),
    accent: <rect x="84" y="40" width="8" height="5" />,
  },
  celular: {
    draw: (
      <>
        <rect {...L} x="56" y="12" width="48" height="96" rx="7" />
        <path {...L} d="M74 20h12" />
        <rect {...L} x="62" y="28" width="36" height="58" rx="2" />
        <path {...L} d="M68 40h24M68 50h16M68 60h20" />
        <circle {...L} cx="80" cy="97" r="4" />
        <path {...L} d="M116 40c6 4 6 14 0 18M124 34c10 7 10 23 0 30" />
      </>
    ),
    accent: <rect x="68" y="70" width="10" height="8" />,
  },
  teclado: {
    draw: (
      <>
        <rect {...L} x="16" y="58" width="128" height="44" rx="4" />
        <path {...L} d="M26 70h8M40 70h8M54 70h8M68 70h8M82 70h8M96 70h8M110 70h8M124 70h8M30 82h8M44 82h8M58 82h8M72 82h8M86 82h8M100 82h8M114 82h8M50 94h60" />
        <path {...L} d="M80 58V40c0-10 12-12 18-6" />
        <rect {...L} x="96" y="18" width="20" height="28" rx="10" />
        <path {...L} d="M106 18v10" />
      </>
    ),
    accent: <rect x="68" y="66" width="8" height="8" />,
  },
  interruptor: {
    draw: (
      <>
        <rect {...L} x="22" y="30" width="48" height="70" rx="4" />
        <rect {...L} x="36" y="44" width="20" height="42" rx="3" />
        <path {...L} d="M40 48h12v16H40z" />
        <rect {...L} x="90" y="30" width="48" height="70" rx="4" />
        <rect {...L} x="104" y="44" width="20" height="42" rx="3" />
        <path {...L} d="M108 66h12v16h-12z" />
        <path {...L} d="M43 15l3-3v14" />
        <ellipse {...L} cx="114" cy="19" rx="4" ry="6" />
        <path {...L} d="M14 112h132" />
      </>
    ),
    accent: <rect x="40" y="48" width="12" height="16" />,
  },
  degraus: {
    draw: (
      <>
        <path {...L} d="M18 104h28V84h28V62h28V40h28V18" />
        <path {...L} d="M18 104h124" />
        <path {...L} d="M26 98h12M54 78h12M82 56h12M110 34h12" />
      </>
    ),
    accent: <rect x="130" y="12" width="8" height="8" />,
  },
} satisfies Record<string, Art>;

export type IllustrationName = keyof typeof ART | 'livro';

/** Ilustração de assunto: escolhe pelo id da disciplina, do capítulo ou do tópico. */
export function illustrationFor(id: string): IllustrationName {
  const s = id.toLowerCase();
  if (/seg|cripto|lgpd|privac/.test(s)) return 'cadeado';
  if (/redes|tcp|perimetro|enderec/.test(s)) return 'rede';
  if (/nuvem|cloud/.test(s)) return 'nuvem';
  if (/dados|sql|banco|bi\b/.test(s)) return 'dados';
  if (/leg|direito|lei|norma|tce|institucional|etica|controle/.test(s)) return 'balanca';
  if (/infra|so\b|sistema|diretorio|processo/.test(s)) return 'computador';
  if (/dev|program|algorit|engenharia|software/.test(s)) return 'suporte';
  if (/gest|govern|aquisic|projeto|itil|cobit/.test(s)) return 'calendario';
  return 'computador';
}

export function Illustration({
  name,
  accent = 'rgb(var(--gold))',
  className = '',
  style,
  label,
  animate = true,
}: {
  name: IllustrationName;
  accent?: string;
  className?: string;
  style?: CSSProperties;
  /** Texto alternativo; sem ele a imagem é decorativa. */
  label?: string;
  animate?: boolean;
}) {
  const a = name === 'livro' ? ART.computador : ART[name];
  return (
    <svg
      viewBox="0 0 160 124"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? 'draw' : ''} ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {a.draw}
      <g fill={accent} stroke="none" className={animate ? 'ill-accent' : undefined}>
        {a.accent}
      </g>
    </svg>
  );
}
