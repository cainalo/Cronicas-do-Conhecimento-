// Ícones próprios, traço único de "pena": substituem emojis e bibliotecas genéricas.
import type { SVGProps } from 'react';

const paths = {
  torre: (
    <>
      <path d="M6 21V9l-1.5-1V4h2v2h2V4h2v2h2V4h2v2h2V4h2v4L18 9v12" />
      <path d="M4 21h16M10 21v-4a2 2 0 0 1 4 0v4M11 11h2" />
    </>
  ),
  grimorio: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3M12 7l1 2 2 .3-1.5 1.4.4 2.1L12 11.8l-1.9 1 .4-2.1L9 9.3l2-.3z" />
    </>
  ),
  ampulheta: (
    <>
      <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
      <path d="M9.5 18.5h5" />
    </>
  ),
  mapa: (
    <>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14M15 6v14M5.5 11.5l2 1.5 2.5-2 3 2.5 3-3 2.5 1.5" />
    </>
  ),
  chave: (
    <>
      <circle cx="7.5" cy="8.5" r="3.5" />
      <path d="M10 11l9 9M15 16l2-2M17.5 18.5l2-2" />
    </>
  ),
  fita: <path d="M7 3h10v18l-5-4-5 4z" />,
  fitaCheia: <path d="M7 3h10v18l-5-4-5 4z" fill="currentColor" />,
  certo: <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />,
  errado: <path d="M6 6l12 12M18 6L6 18" />,
  sumario: <path d="M4 6h2M9 6h11M4 12h2M9 12h11M4 18h2M9 18h11" />,
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </>
  ),
  lua: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  sair: <path d="M6 6l12 12M18 6L6 18" />,
  pena: (
    <>
      <path d="M20 4c-7 1-12 6-14 14l2 2c8-2 13-7 14-14z" />
      <path d="M4 20l6-6M10 10l4 4" />
    </>
  ),
  selo: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9 15l-2 6 5-2.5L17 21l-2-6M12 7v6M9 10h6" />
    </>
  ),
  aviso: <path d="M12 3l10 18H2zM12 10v5M12 18v.5" />,
  voltar: <path d="M15 5l-7 7 7 7" />,
  seta: <path d="M9 5l7 7-7 7" />,
  play: <path d="M8 5.5v13l10-6.5z" />,
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" />
    </>
  ),
  cartas: (
    <>
      <rect x="7" y="3" width="12" height="16" rx="2.5" />
      <path d="M5 6.5v12A2.5 2.5 0 0 0 7.5 21H15" />
      <path d="M10.5 9h5M10.5 12.5h5" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M9.5 2.5h5" />
    </>
  ),
  lista: <path d="M4 6h2M9 6h11M4 12h2M9 12h11M4 18h2M9 18h11" />,
  escudo: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  pergaminho: (
    <>
      <path d="M7 4h11a2 2 0 0 1 2 2v1h-4M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V7" />
      <path d="M9 9h6M9 12.5h6M9 16h4" />
    </>
  ),
  pessoa: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" />
    </>
  ),
  grafico: <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
