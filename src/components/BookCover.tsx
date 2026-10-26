// Capa de livro editorial: cor chapada da paleta, título em serifa e um filete. Sem couro nem metais.
import type { Grimoire } from '@/content/types';
import { Icon } from './Icon';

const bindings: Record<NonNullable<Grimoire['binding']>, string> = {
  sangue: 'var(--gold)',
  floresta: 'var(--ok)',
  noite: 'var(--azure)',
  castanho: 'var(--teal)',
};

export function BookCover({ g, className = '' }: { g: Grimoire; className?: string }) {
  const tone = bindings[g.binding ?? 'castanho'];
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[6px] p-[9%] text-white ${className}`}
      style={{ backgroundColor: `rgb(${tone})`, boxShadow: 'inset 6px 0 0 rgb(0 0 0 / .12)' }}
    >
      <span className="flex items-center justify-between text-[10px] tracking-wide opacity-80">
        <span>Crônicas</span>
        <Icon name={g.sigil ?? 'livro'} size={16} />
      </span>
      <span>
        <span className="mb-2 block h-px w-8 bg-white/70" />
        <span className="block font-title text-[1.05rem] font-semibold leading-[1.08] [hyphens:auto]">{g.title}</span>
      </span>
    </div>
  );
}
