// "Na trilha": mostra de que aula da sequência principal um conteúdo faz parte e leva até ela.
import { Link } from 'react-router-dom';
import { trailPlaceOf } from '@/content';
import { Icon } from './Icon';

export function TrailPlace({ lessonId, className = '' }: { lessonId?: string; className?: string }) {
  const p = lessonId ? trailPlaceOf(lessonId) : undefined;
  if (!p) return null;
  return (
    <Link to={p.to} className={`group inline-flex min-w-0 items-center gap-1.5 text-sm ${className}`} data-testid="na-trilha">
      <Icon name="trilha" size={15} className="shrink-0 text-gold" />
      <span className="min-w-0 truncate">
        <span className="text-muted">Na trilha: </span>
        <span className="link-grow font-semibold">{p.label}</span>
      </span>
    </Link>
  );
}
