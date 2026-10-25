// Peças de página da identidade editorial: cabeçalho com título em serifa e fio que corre, títulos
// de seção com fio fino, e o cartão-pôster (cor chapada, ilustração em traço, seta que avança).
import { type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePrefs } from '@/app/prefs';
import { AREAS, areaColor, type AreaKey } from '@/app/areas';
import { Icon, type IconName } from '@/components/Icon';
import { Illustration, type IllustrationName } from '@/components/Illustration';
import type { ArtId } from '@/components/TileArt';

export const useIsDark = () => usePrefs().prefs.theme === 'dark';

export function useAreaColor(area: AreaKey) {
  return areaColor(area, useIsDark());
}

/** Ícone de traço na cor indicada (sem placa nem degradê). */
export function IconBadge({ icon, color, size = 'md' }: { icon: IconName; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const px = size === 'sm' ? 18 : size === 'lg' ? 28 : 22;
  return (
    <span className="grid shrink-0 place-items-center" style={{ color }}>
      <Icon name={icon} size={px} />
    </span>
  );
}

/**
 * Cabeçalho de página: volta para a área (nas páginas internas), título grande em serifa,
 * subtítulo curto, fio que corre por baixo e, se houver, a ilustração do assunto.
 */
export function PageHeader({
  area,
  title,
  subtitle,
  crumb = true,
  art,
  children,
}: {
  area: AreaKey;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Mantido por compatibilidade; o cabeçalho editorial não mostra ícone. */
  icon?: IconName;
  /** Mostrar o link de volta para a área. Desligue na própria página central da área. */
  crumb?: boolean;
  art?: IllustrationName;
  children?: ReactNode;
}) {
  const a = AREAS[area];
  const color = useAreaColor(area);
  return (
    <header className="mb-6">
      {crumb && (
        <Link to={a.to} className="group mb-3 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
          <Icon name="voltar" size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="link-grow">{a.label}</span>
        </Link>
      )}
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-[2rem] leading-[1.05] sm:text-[2.5rem]">{title}</h1>
          {subtitle && <p className="mt-2 max-w-xl text-[0.98rem] text-muted">{subtitle}</p>}
        </div>
        {art && <Illustration name={art} accent={color} className="hidden h-24 w-32 shrink-0 text-ink sm:block" />}
      </div>
      <span className="rule mt-4" aria-hidden="true" />
      {children}
    </header>
  );
}

/** Título de seção: serifa, fio fino até a margem e uma ação opcional à direita. */
export function SectionTitle({ icon, color, children, action }: { icon?: IconName; color?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2.5 text-[1.3rem]">
      {icon && <IconBadge icon={icon} color={color ?? 'currentColor'} size="sm" />}
      <span className="shrink-0">{children}</span>
      <span aria-hidden="true" className="ml-1 h-px flex-1 bg-line" />
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
  /** Mantido por compatibilidade com o desenho antigo; o pôster usa a ilustração do ícone. */
  art?: ArtId | null;
  /** Ilustração do pôster; por padrão, a que combina com o ícone. */
  illustration?: IllustrationName;
  index?: number;
}

export const TILE_ARTS: string[] = ['ampulheta', 'cartas', 'relogio', 'pena', 'calendario', 'lista', 'mapa', 'escudo', 'grafico', 'pergaminho', 'grimorio', 'torre', 'chama'];

const ICON_ART: Partial<Record<IconName, IllustrationName>> = {
  grimorio: 'livro',
  livro: 'livro',
  pena: 'livro',
  pergaminho: 'livro',
  lista: 'livro',
  torre: 'livro',
  cartas: 'revisao',
  ampulheta: 'revisao',
  revisar: 'revisao',
  relogio: 'calendario',
  calendario: 'calendario',
  hoje: 'calendario',
  mapa: 'trilha',
  trilha: 'trilha',
  grafico: 'progresso',
  progresso: 'progresso',
  escudo: 'cadeado',
  cadeado: 'cadeado',
  tela: 'suporte',
  balao: 'professores',
  chama: 'alvo',
  estrela: 'alvo',
  selo: 'alvo',
};

/** Cartão-pôster: cor chapada, número, título em serifa e a ilustração em traço que se desenha. */
export function Tile({ to, icon, color, title, text, badge, wide, illustration, index }: TileProps) {
  const dark = useIsDark();
  // No claro, texto branco sobre a cor; no escuro as cores clareiam e o texto fica escuro.
  const fg = dark ? 'rgb(var(--bg))' : '#ffffff';
  const style: CSSProperties = { background: color, color: fg, ['--tile' as string]: color };
  const art = illustration ?? ICON_ART[icon] ?? 'livro';
  return (
    <div className={`anim-tile-in ${wide ? 'col-span-2' : ''}`} style={{ animationDelay: `${Math.min(index ?? 0, 12) * 70}ms` }}>
      <Link to={to} className="tile-color group relative flex h-full min-h-[11.75rem] flex-col items-start overflow-hidden rounded-[10px] p-4 text-left" style={style}>
        <span className="tile-on flex w-full items-center justify-between text-[0.8rem] font-medium tabular-nums opacity-80">
          <span>{index !== undefined ? String(index + 1).padStart(2, '0') : ''}</span>
          <Icon name="diagonal" size={18} className="tile-arrow" />
        </span>
        <Illustration
          name={art}
          accent={dark ? '#ffffff' : 'rgb(27 26 23)'}
          className={`tile-art tile-on pointer-events-none absolute right-2 opacity-95 ${wide ? 'top-6 h-28 w-36 sm:top-4' : 'top-8 h-20 w-24'}`}
        />
        <span className={`relative mt-auto font-title text-[1.32rem] font-semibold leading-[1.05] tracking-[-0.02em] ${wide ? 'max-w-[58%]' : ''}`}>{title}</span>
        <span className="tile-sub relative mt-1.5 line-clamp-2 text-[0.8rem] leading-snug opacity-85">{text}</span>
        {badge && (
          <span className="relative mt-2 rounded-[3px] px-1.5 py-0.5 text-[11px] font-semibold" style={{ background: fg, color }}>
            {badge}
          </span>
        )}
      </Link>
    </div>
  );
}

export function TileGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}
