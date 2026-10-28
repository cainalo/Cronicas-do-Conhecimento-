import { Link } from 'react-router-dom';

/** Pórtico: arco duplo, estrela ocre e degraus terracota. Wordmark vetorial próprio. */
export function LogoMark({
  size = 32,
  color = 'rgb(var(--teal))',
  accent = 'rgb(var(--gold))',
  star = 'rgb(var(--sun))',
  paper = 'rgb(var(--bg))',
  className = '',
}: {
  size?: number; color?: string; accent?: string; star?: string; paper?: string; className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className}>
      <path d="M19 83V42A31 31 0 0 1 81 42V83" fill="none" stroke={color} strokeWidth="7.5" strokeLinecap="square" />
      <path d="M31 75V43A19 19 0 0 1 69 43V66" fill="none" stroke={color} strokeWidth="5.2" strokeLinecap="square" />
      <path d="M50 31 55.5 39 64 42 55.5 45 50 53 44.5 45 36 42 44.5 39Z" fill={star} />
      <path d="M42 56H58L62 63H38Z" fill={accent} stroke={paper} strokeWidth="1.6" />
      <path d="M36 65H64L69 73H31Z" fill={accent} stroke={paper} strokeWidth="1.6" />
      <path d="M29 75H71L77 84H23Z" fill={accent} stroke={paper} strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Bespoke wordmark paths: stylized Pórtico with an arched baseline and terracotta star.
 * The SVG contains no text nodes or font dependency.
 */
export function PorticoWordmark({
  width = 200,
  color = 'rgb(var(--teal))',
  accent = 'rgb(var(--gold))',
  className = '',
}: {
  width?: number; color?: string; accent?: string; className?: string;
}) {
  return (
    <svg width={width} height={Math.round(width * 132 / 500)} viewBox="0 0 500 132" role="img" aria-label="Pórtico" focusable="false" className={className}>
      <g fill={color} fillRule="evenodd">
        <path d="M9 98V25Q9 16 1 13V8H53C84 8 100 22 100 43C100 65 83 78 54 78H35V87Q35 94 48 96V101H9Z M35 66H51C67 66 76 58 76 43C76 28 67 20 51 20H35Z" />
        <path d="M139 29C119 29 107 43 107 65C107 87 119 101 139 101C159 101 171 87 171 65C171 43 159 29 139 29ZM139 42C149 42 156 50 156 65C156 80 149 88 139 88C129 88 122 80 122 65C122 50 129 42 139 42Z" />
        <path d="M129 23L144 10L151 13L137 27Z" />
        <path d="M181 100V49Q181 42 173 40V35H196V49C203 38 212 31 221 34C231 37 230 50 221 53C213 55 209 47 204 47C199 47 196 53 196 61V88Q196 94 208 96V100Z" />
        <path d="M256 100C247 100 242 94 242 84V45H230V35H242V20L257 15V35H279V45H257V82Q257 90 264 90Q271 90 277 82L284 88C277 97 268 101 259 101Z" />
        <path d="M292 46H309V88Q309 94 317 96V100H284V96Q292 94 292 88Z" />
        <circle cx="300.5" cy="24" r="8.5" />
        <path d="M376 43L367 54C360 47 353 43 345 43C333 43 326 52 326 66C326 81 333 89 345 89C354 89 362 84 368 76L377 83C370 96 357 102 342 102C321 102 307 87 307 67C307 45 322 31 344 31C357 31 368 36 376 43Z" />
        <path d="M417 31C397 31 385 45 385 67C385 89 397 103 417 103C437 103 449 89 449 67C449 45 437 31 417 31ZM417 44C427 44 434 52 434 67C434 82 427 90 417 90C407 90 400 82 400 67C400 52 407 44 417 44Z" />
      </g>
      <path d="M40 108Q231 77 441 108" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M247 104L252 112L261 115L252 118L247 126L242 118L233 115L242 112Z" fill={accent} />
    </svg>
  );
}

export function Logo({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2 text-ink" aria-label="Pórtico, início">
      <LogoMark size={full ? 34 : 29} className="shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
      <PorticoWordmark width={full ? 184 : 156} className="h-auto" />
    </Link>
  );
}
