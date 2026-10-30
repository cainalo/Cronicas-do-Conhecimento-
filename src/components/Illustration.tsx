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
  livro: {
    draw: (
      <>
        <path {...L} d="M80 34c-12-8-30-10-50-8v64c20-2 38 0 50 8 12-8 30-10 50-8V26c-20-2-38 0-50 8z" />
        <path {...L} d="M80 34v64" />
        <path {...L} d="M40 44h28M40 53h24M40 62h28M40 71h18M92 44h24M92 53h28M92 62h20" />
      </>
    ),
    accent: <path d="M106 24v20l5-3.5 5 3.5V24z" />,
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

  processador: {
    draw: (
      <>
        <rect {...L} x="48" y="27" width="64" height="64" rx="7" />
        <rect {...L} x="63" y="42" width="34" height="34" rx="3" />
        <path {...L} d="M58 27V15M72 27V15M86 27V15M100 27V15M58 103V91M72 103V91M86 103V91M100 103V91M48 39H34M48 53H34M48 67H34M48 81H34M126 39H112M126 53H112M126 67H112M126 81H112" />
        <path {...L} d="M19 111H141M78 42v34M63 59h34" />
      </>
    ),
    accent: <rect x="76" y="54" width="8" height="10" rx="2" />,
  },
  processo: {
    draw: (
      <>
        <rect {...L} x="22" y="25" width="116" height="78" rx="6" />
        <path {...L} d="M22 41h116M34 33h2M43 33h2M52 33h2" />
        <rect {...L} x="34" y="54" width="36" height="9" rx="2" />
        <rect {...L} x="34" y="70" width="56" height="7" rx="2" />
        <rect {...L} x="34" y="84" width="75" height="7" rx="2" />
        <path {...L} d="M105 55h20M115 55v32M105 87h20" />
      </>
    ),
    accent: <circle cx="121" cy="55" r="4" />,
  },
  identificador: {
    draw: (
      <>
        <path {...L} d="M80 14L136 35V70Q132 104 80 116Q28 104 24 70V35Z" />
        <circle {...L} cx="80" cy="55" r="17" />
        <path {...L} d="M49 91Q53 74 80 74Q107 74 111 91M59 101h42" />
        <path {...L} d="M42 42l-9-7M118 42l9-7" />
      </>
    ),
    accent: <path d="M80 31L85 40L95 45L85 50L80 60L75 50L65 45L75 40Z" />,
  },
  threads: {
    draw: (
      <>
        <rect {...L} x="16" y="20" width="128" height="85" rx="8" />
        <path {...L} d="M31 39H129M31 55H129M31 71H129M31 87H129" />
        <path {...L} d="M45 31v16M76 47v16M106 63v16M61 79v16M120 31v16" />
        <circle {...L} cx="45" cy="39" r="4" />
        <circle {...L} cx="76" cy="55" r="4" />
        <circle {...L} cx="106" cy="71" r="4" />
        <circle {...L} cx="61" cy="87" r="4" />
      </>
    ),
    accent: <circle cx="120" cy="39" r="5" />,
  },
  'estados-processo': {
    draw: (
      <>
        <rect {...L} x="8" y="47" width="42" height="29" rx="7" />
        <rect {...L} x="59" y="12" width="42" height="29" rx="7" />
        <rect {...L} x="110" y="47" width="42" height="29" rx="7" />
        <path {...L} d="M50 55L64 36M101 36l14 19M129 76v18H29V76" />
        <path {...L} d="M57 45l7-9 3 12M105 37l10 3-2 10M23 86l6 8 6-8" />
      </>
    ),
    accent: <circle cx="80" cy="27" r="5" />,
  },
  escalonador: {
    draw: (
      <>
        <path {...L} d="M18 104H142M28 88H132M38 72H122M48 56H112" />
        <rect {...L} x="23" y="26" width="28" height="14" rx="3" />
        <rect {...L} x="66" y="26" width="28" height="14" rx="3" />
        <rect {...L} x="109" y="26" width="28" height="14" rx="3" />
        <path {...L} d="M37 40v14M80 40v14M123 40v14M80 56v16" />
        <path {...L} d="M71 65l9 9 9-9" />
      </>
    ),
    accent: <rect x="67" y="83" width="26" height="8" rx="3" />,
  },
  'dns-consulta': {
    draw: (
      <>
        <rect {...L} x="9" y="43" width="35" height="32" rx="5" />
        <rect {...L} x="63" y="15" width="34" height="32" rx="5" />
        <rect {...L} x="116" y="43" width="35" height="32" rx="5" />
        <path {...L} d="M44 52L63 38M97 38l19 14M80 47v42M62 89h36" />
        <path {...L} d="M74 83l6 7 6-7M19 54h15M19 63h15M72 27h16M72 35h16M126 54h15M126 63h15" />
      </>
    ),
    accent: <circle cx="80" cy="99" r="5" />,
  },
  'cripto-roda': {
    draw: (
      <>
        <circle {...L} cx="80" cy="62" r="43" />
        <circle {...L} cx="80" cy="62" r="28" />
        <circle {...L} cx="80" cy="62" r="9" />
        <path {...L} d="M80 11v10M80 103v10M29 62h10M121 62h10M44 26l7 7M109 91l7 7M44 98l7-7M109 33l7-7" />
        <path {...L} d="M80 19V8M72 16h16" />
      </>
    ),
    accent: <path d="M80 46L85 57L97 62L85 67L80 79L75 67L63 62L75 57Z" />,
  },
  'rede-neural': {
    draw: (
      <>
        <path {...L} d="M33 27L80 48M33 62L80 62M33 97L80 76M80 48L127 27M80 62L127 62M80 76L127 97" />
        <circle {...L} cx="25" cy="27" r="9" />
        <circle {...L} cx="25" cy="62" r="9" />
        <circle {...L} cx="25" cy="97" r="9" />
        <circle {...L} cx="80" cy="48" r="10" />
        <circle {...L} cx="80" cy="62" r="10" />
        <circle {...L} cx="80" cy="76" r="10" />
        <circle {...L} cx="135" cy="27" r="9" />
        <circle {...L} cx="135" cy="62" r="9" />
        <circle {...L} cx="135" cy="97" r="9" />
      </>
    ),
    accent: <circle cx="80" cy="62" r="5" />,
  },
  'modelo-relacional': {
    draw: (
      <>
        <rect {...L} x="13" y="18" width="53" height="88" rx="4" />
        <rect {...L} x="94" y="18" width="53" height="88" rx="4" />
        <path {...L} d="M13 37h53M94 37h53M25 49h28M25 62h28M25 75h28M106 49h28M106 62h28M106 75h28" />
        <path {...L} d="M66 60h28M85 52l9 8-9 8" />
        <path {...L} d="M22 27h12M103 27h12" />
      </>
    ),
    accent: <rect x="25" y="49" width="28" height="8" rx="2" />,
  },

} satisfies Record<string, Art>;

export type IllustrationName = keyof typeof ART;

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
  return 'livro';
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
  const a = ART[name];
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
