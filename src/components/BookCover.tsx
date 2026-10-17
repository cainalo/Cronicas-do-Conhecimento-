// Capa de grimório: couro curtido, gravação a ouro, cantoneiras e fecho de metal.
import type { Grimoire } from '@/content/types';
import { Icon } from './Icon';

const bindings: Record<NonNullable<Grimoire['binding']>, string> = {
  sangue: '92 26 20',
  floresta: '34 58 36',
  noite: '30 38 66',
  castanho: '78 46 24',
};

const boss = 'absolute h-3.5 w-3.5 rounded-full shadow-[0_1px_1px_rgb(0_0_0/.6)]';
const metal = { background: 'radial-gradient(circle at 35% 30%, #f6e2a8, #b8862b 45%, #5b3d0c 100%)' };

export function BookCover({ g, className = '' }: { g: Grimoire; className?: string }) {
  const tint = bindings[g.binding ?? 'castanho'];
  return (
    <div
      aria-hidden
      className={`relative aspect-[3/4] overflow-hidden rounded-r-[4px] rounded-l-[2px] ${className}`}
      style={{
        backgroundColor: `rgb(${tint})`,
        backgroundImage:
          'linear-gradient(90deg, rgb(0 0 0 / .55) 0, rgb(0 0 0 / .15) 7%, rgb(255 255 255 / .07) 9%, transparent 14%), radial-gradient(ellipse at 40% 35%, rgb(255 255 255 / .08), transparent 60%), var(--tex-leather), var(--tex-leather-mottle)',
        boxShadow: '3px 4px 10px rgb(0 0 0 / .55), inset -2px 0 3px rgb(0 0 0 / .5), inset 0 0 18px rgb(0 0 0 / .45)',
      }}
    >
      {/* Filetes dourados gravados */}
      <div className="absolute inset-[9%] border border-[#d6ac5c]/70" style={{ boxShadow: 'inset 0 0 0 3px transparent, inset 0 0 0 4px rgb(214 172 92 / .45), 0 1px 0 rgb(0 0 0 / .4)' }} />
      <div className="absolute inset-[16%] border border-dashed border-[#d6ac5c]/35" />
      {/* Cantoneiras */}
      <span className={`${boss} left-[5%] top-[4%]`} style={metal} />
      <span className={`${boss} right-[5%] top-[4%]`} style={metal} />
      <span className={`${boss} bottom-[4%] left-[5%]`} style={metal} />
      <span className={`${boss} bottom-[4%] right-[5%]`} style={metal} />
      {/* Fecho */}
      <span
        className="absolute right-0 top-1/2 h-[14%] w-[13%] -translate-y-1/2 rounded-l-[3px]"
        style={{ ...metal, background: 'linear-gradient(180deg, #e9cf86, #a77a22 50%, #6a4a12)', boxShadow: '-1px 1px 2px rgb(0 0 0 / .6)' }}
      />
      {/* Brasão */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-[18%] text-center" style={{ color: '#e2bd6c', filter: 'drop-shadow(0 1px 0 rgb(0 0 0 / .7))' }}>
        <Icon name={g.sigil ?? 'selo'} size={34} strokeWidth={1.3} />
        <span className="font-gothic text-[1.05rem] leading-tight">{g.title.replace(/^O |^A /, '')}</span>
      </div>
    </div>
  );
}
