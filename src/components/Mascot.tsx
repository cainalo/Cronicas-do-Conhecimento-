// Marca de nota (antigo mascote): ícone pequeno de traço junto de uma fala curta. Sem personagem
// desde a identidade editorial; o nome do componente ficou para não mexer em todas as telas.
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';

export type MascotMood = 'idle' | 'talk' | 'cheer' | 'sad' | 'think';

const MOOD_ICON: Record<MascotMood, IconName> = { idle: 'pergaminho', talk: 'pergaminho', cheer: 'certo', sad: 'aviso', think: 'aviso' };

export function Mascot({ mood = 'idle', size = 96, className = '' }: { mood?: MascotMood; size?: number; className?: string }) {
  // Identidade editorial: só o ícone de traço, pequeno, na cor de destaque (sem placa colorida).
  const d = Math.min(26, Math.max(18, Math.round(size * 0.28)));
  return (
    <span className={`grid shrink-0 place-items-center text-gold ${className}`} style={{ width: d, height: d }} aria-hidden="true">
      <Icon name={MOOD_ICON[mood]} size={d} />
    </span>
  );
}

/** Balão de fala do mascote. */
export function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border-l-2 border-gold py-0.5 pl-3 text-sm leading-snug text-ink ${className}`}>{children}</div>;
}

/** Mascote com fala, para o topo das páginas e para os momentos de resultado. */
export function MascotSays({ children, mood = 'talk', size = 84 }: { children: ReactNode; mood?: MascotMood; size?: number }) {
  return (
    <div className="flex items-start gap-2">
      <Mascot mood={mood} size={size} />
      <SpeechBubble className="flex-1 anim-toast-in">{children}</SpeechBubble>
    </div>
  );
}
