// Ícones próprios da identidade editorial (25/10/2026). Grade de 24, traço de 1,5, só retas e arcos
// de quarto de círculo; a assinatura do conjunto é um pequeno ponto cheio (o "ponto final" do
// editorial) em quase todos os ícones. Nada de emoji nem biblioteca genérica.
import type { SVGProps } from 'react';

const dot = (x: number, y: number) => <circle cx={x} cy={y} r="1.15" fill="currentColor" stroke="none" />;

const paths = {
  // ---- Áreas ----
  hoje: (
    <>
      <path d="M3 17h18M6.5 17a5.5 5.5 0 0 1 11 0M12 6v2.5M5.2 9.2 7 11M18.8 9.2 17 11" />
      {dot(12, 20.5)}
    </>
  ),
  trilha: (
    <>
      <path d="M6 19.5V15a3 3 0 0 1 3-3h6a3 3 0 0 0 3-3V4.5" />
      <circle cx="6" cy="19.5" r="1.6" />
      <circle cx="18" cy="4.5" r="1.6" />
      {dot(12, 12)}
    </>
  ),
  livro: (
    <>
      <path d="M6 3.5h9l4 4v13H6zM15 3.5v4h4M9 12h7M9 15.5h7" />
      {dot(9, 8.5)}
    </>
  ),
  revisar: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4v3.5H16" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </>
  ),
  progresso: (
    <>
      <path d="M3.5 20.5h17M6 20.5v-5M10.5 20.5v-8M15 20.5V9.5M19.5 20.5V5" />
      {dot(19.5, 3)}
    </>
  ),
  // ---- Navegação e ação ----
  avancar: <path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" />,
  diagonal: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  voltar: <path d="M15 5l-7 7 7 7" />,
  seta: <path d="M9 5l7 7-7 7" />,
  mais: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  download: (
    <>
      <path d="M12 4v11M7 10.5l5 5 5-5M4.5 19.5h15" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none" />,
  certo: <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />,
  errado: <path d="M6 6l12 12M18 6L6 18" />,
  sair: <path d="M6 6l12 12M18 6L6 18" />,
  aviso: (
    <>
      <path d="M12 3.5 21 19.5H3zM12 10v4.5" />
      {dot(12, 17)}
    </>
  ),
  // ---- Conteúdo ----
  torre: (
    <>
      <path d="M4 20.5h16M5.5 16h13M8 11h8M10 5.5h4M12 5.5v15" />
      {dot(8, 8.5)}
      {dot(16, 8.5)}
    </>
  ),
  grimorio: (
    <>
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="3" cy="6" r=".8" fill="currentColor" />
      <circle cx="3" cy="12" r=".8" fill="currentColor" />
      <circle cx="3" cy="18" r=".8" fill="currentColor" />
    </>
  ),
  ampulheta: (
    <>
      <path d="M6.5 3.5h11M6.5 20.5h11M8 3.5v2.5L12 12l4-6V3.5M8 20.5V18l4-6 4 6v2.5" />
      {dot(12, 17.5)}
    </>
  ),
  mapa: (
    <>
      <path d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2zM9 4.5v13M15 6.5v13" />
    </>
  ),
  chave: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12h9M17.5 12v3M20.5 12v2" />
    </>
  ),
  fita: <path d="M7 3.5h10v17l-5-3.8-5 3.8z" />,
  fitaCheia: <path d="M7 3.5h10v17l-5-3.8-5 3.8z" fill="currentColor" />,
  coracao: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  coracaoCheio: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="currentColor" />,
  compartilhar: (
    <>
      <path d="M12 15V4M8 8l4-4 4 4M5 13v6.5h14V13" />
    </>
  ),
  sumario: (
    <>
      <path d="M9 6.5h11M9 12h11M9 17.5h7" />
      {dot(4.5, 6.5)}
      {dot(4.5, 12)}
      {dot(4.5, 17.5)}
    </>
  ),
  lista: (
    <>
      <path d="M9 6.5h11M9 12h11M9 17.5h7" />
      {dot(4.5, 6.5)}
      {dot(4.5, 12)}
      {dot(4.5, 17.5)}
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  lua: <path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z" />,
  pena: (
    <>
      <path d="M19.5 4.5 9 15l-1.5 4.5L12 18 22.5 7.5a2.1 2.1 0 0 0-3-3zM16 8l2.5 2.5" />
      <path d="M3 21h6" />
    </>
  ),
  selo: (
    <>
      <circle cx="12" cy="10" r="5.5" />
      <path d="M8.8 14.5 7.5 21l4.5-2.5 4.5 2.5-1.3-6.5" />
      {dot(12, 10)}
    </>
  ),
  calendario: (
    <>
      <path d="M4 6.5h16v14H4zM4 10.5h16M8.5 4v4M15.5 4v4" />
      {dot(8.5, 14.5)}
    </>
  ),
  cartas: (
    <>
      <path d="M8 3.5h11.5v14H8zM4.5 7v13.5H16" />
      <path d="M11 8h5.5M11 11.5h3.5" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8.5v4l3 2" />
      {dot(12, 2.5)}
    </>
  ),
  escudo: (
    <>
      <path d="M12 3.5 19.5 6v5.5c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  pergaminho: (
    <>
      <path d="M6 3.5h9l4 4v13H6zM15 3.5v4h4M9 12h7M9 15.5h5" />
    </>
  ),
  pessoa: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  chama: <path d="M12 3.5c.8 3.5 5.5 5.5 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.8 1.8-4.6 2.8-5.6 0 1.8.9 2.8 2 2.8 0-2.8-.9-4.6.7-7.7z" />,
  alaude: (
    <>
      <path d="M9 18.5a3.5 3.5 0 1 1 0-7h0a3.5 3.5 0 1 1 0 7zM12 12V4.5h7v4h-7" />
    </>
  ),
  estrela: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />,
  grafico: (
    <>
      <path d="M3.5 20.5h17M6 20.5v-5M10.5 20.5v-8M15 20.5V9.5M19.5 20.5V5" />
    </>
  ),
  tela: (
    <>
      <path d="M3.5 4.5h17v12h-17zM8.5 20.5h7M12 16.5v4" />
      <path d="M7 9l2.5 2L7 13M11.5 13H15" />
    </>
  ),
  balao: (
    <>
      <path d="M4 5h16v11.5H10.5L6 20.5v-4H4z" />
      {dot(8.5, 10.8)}
      {dot(12, 10.8)}
      {dot(15.5, 10.8)}
    </>
  ),
  cadeado: (
    <>
      <path d="M5.5 10.5h13v10h-13zM8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
      {dot(12, 15.5)}
    </>
  ),
  nuvem: <path d="M7 18.5a4 4 0 0 1-.6-8 6 6 0 0 1 11.6 1.5 3.3 3.3 0 0 1-.5 6.5z" />,
  rede: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="18.5" r="2" />
      <path d="M11 7.3 6.5 16.7M13 7.3l4.5 9.4M7.5 18.5h9" />
    </>
  ),
  dados: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  balanca: (
    <>
      <path d="M12 4v16.5M8 20.5h8M5 7.5h14M5 7.5 2.5 13a2.5 2.5 0 0 0 5 0zM19 7.5 16.5 13a2.5 2.5 0 0 0 5 0z" />
      {dot(12, 4)}
    </>
  ),
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
      strokeWidth={1.5}
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
