// Peças de página no estilo do NutriConnect: cabeçalho com a cor da área, títulos de seção
// com ícone e grade de cartões coloridos.
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePrefs } from '@/app/prefs';
import { AREAS, areaColor, tint, type AreaKey } from '@/app/areas';
import { Icon, type IconName } from '@/components/Icon';
import { TileArt, type ArtId } from '@/components/TileArt';

export const useIsDark = () => usePrefs().prefs.theme === 'dark';

export function useAreaColor(area: AreaKey) {
  return areaColor(area, useIsDark());
}

/** Ícone em placa colorida, com leve degradê da própria cor. */
export function IconBadge({ icon, color, size = 'md' }: { icon: IconName; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const box = size === 'sm' ? 'h-8 w-8 rounded-xl' : size === 'lg' ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10 rounded-2xl';
  const px = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  return (
    <span
      className={`grid shrink-0 place-items-center text-white shadow-md ${box}`}
      style={{ background: `linear-gradient(145deg, ${color}, color-mix(in srgb, ${color} 70%, #000))` }}
    >
      <Icon name={icon} size={px} strokeWidth={2} />
    </span>
  );
}

/**
 * Cabeçalho de página: migalha de pão até a página central da área (nas páginas internas),
 * ícone na cor da área, título e subtítulo.
 */
export function PageHeader({
  area,
  title,
  subtitle,
  icon,
  crumb = true,
  children,
}: {
  area: AreaKey;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: IconName;
  /** Mostrar a migalha "Área ›". Desligue na própria página central da área. */
  crumb?: boolean;
  children?: ReactNode;
}) {
  const a = AREAS[area];
  const color = useAreaColor(area);
  return (
    <header className="mb-5">
      {crumb && (
        <Link
          to={a.to}
          className="mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition hover:opacity-80"
          style={{ color, backgroundColor: tint(color, 12) }}
        >
          <Icon name="voltar" size={14} strokeWidth={2.2} />
          {a.label}
        </Link>
      )}
      <div className="flex items-center gap-3">
        <IconBadge icon={icon ?? a.icon} color={color} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-[1.6rem] leading-tight">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {children}
    </header>
  );
}

/** Título de seção: ícone colorido, texto e um fio que se apaga na mesma cor. */
export function SectionTitle({ icon, color, children, action }: { icon: IconName; color: string; children: ReactNode; action?: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-lg">
      <IconBadge icon={icon} color={color} size="sm" />
      <span className="shrink-0">{children}</span>
      <span aria-hidden="true" className="ml-1 h-[3px] flex-1 rounded-full opacity-35" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      {action && <span className="shrink-0 font-sans text-sm font-semibold">{action}</span>}
    </h2>
  );
}

export interface TileProps {
  to: string;
  icon: IconName;
  color: string;
  title: string;
  text: string;
  badge?: string;
  wide?: boolean;
  /** Desenho animado do canto; por padrão, o do próprio ícone. */
  art?: ArtId | null;
  index?: number;
}

export const TILE_ARTS: string[] = ['ampulheta', 'cartas', 'relogio', 'pena', 'calendario', 'lista', 'mapa', 'escudo', 'grafico', 'pergaminho', 'grimorio', 'torre', 'chama'];

/** Inclina o elemento na direção do mouse (no toque, só afunda um pouco). */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
    ref.current.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    ref.current?.style.removeProperty('--rx');
    ref.current?.style.removeProperty('--ry');
  };
  return { ref, onPointerMove, onPointerLeave };
}

/** Cartão de função: fundo suave na cor do cartão, ícone em placa, desenho animado, título e descrição curta. */
export function Tile({ to, icon, color, title, text, badge, wide, art, index = 0 }: TileProps) {
  const tilt = useTilt<HTMLAnchorElement>();
  const artId = art ? art : null; // ilustrações automáticas desligadas na reformulação
  // Reformulação: cartão claro com a cor só no ícone e numa faixa fina, sem gradiente.
  const style: CSSProperties = {
    background: 'rgb(var(--surface))',
    borderColor: 'rgb(var(--line))',
    boxShadow: `inset 0 3px 0 ${color}, var(--shadow-card)`,
  };
  return (
    <div className={`anim-tile-in ${wide ? 'col-span-2' : ''}`} style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}>
      <Link
        to={to}
        {...tilt}
        className="tilt group relative flex h-full min-h-[8.75rem] flex-col items-start gap-2 overflow-hidden rounded-[1.6rem] border p-3.5 text-left shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] active:scale-[0.98]"
        style={style}
      >
        {artId && <TileArt art={artId} color={color} />}
        <span className="relative transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <IconBadge icon={icon} color={color} />
        </span>
        {badge && (
          <span className="relative mt-auto max-w-full truncate rounded-full px-2 py-0.5 text-[11px] font-bold text-white shadow-sm" style={{ background: color }}>
            {badge}
          </span>
        )}
        <span className={`relative text-[0.95rem] font-bold leading-tight ${badge ? '' : 'mt-auto'}`} style={{ color: 'rgb(var(--ink))' }}>
          {title}
        </span>
        <span className="relative line-clamp-2 text-xs leading-snug text-ink/70">{text}</span>
      </Link>
    </div>
  );
}

export function TileGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}
