// Ilustração contextual dos momentos de estudo. Não representa um personagem nem uma história:
// cada estado escolhe um símbolo simples (computador, conversa, alvo ou revisão).
// Mantemos o nome do componente para não quebrar as telas que já o utilizam.
import type { ReactNode } from 'react';
import { Illustration, type IllustrationName } from '@/components/Illustration';

export type MascotMood = 'idle' | 'talk' | 'cheer' | 'sad' | 'think';

const MOOD_ART: Record<MascotMood, IllustrationName> = { idle: 'computador', talk: 'professores', cheer: 'alvo', sad: 'revisao', think: 'revisao' };

export function Mascot({ mood = 'idle', size = 96, className = '' }: { mood?: MascotMood; size?: number; className?: string }) {
  // Ilustração proporcional ao espaço que o mascote ocupava (altura ~ 3/4 do tamanho antigo).
  return <Illustration name={MOOD_ART[mood]} className={`w-auto shrink-0 text-ink ${className}`} style={{ height: Math.max(36, Math.round(size * 0.75)) }} />;
}

/** Fala curta: nota com filete na cor de destaque. */
export function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border-l-2 border-gold py-0.5 pl-3 text-sm leading-snug text-ink ${className}`}>{children}</div>;
}

/** Fala para o topo das páginas e para os momentos de resultado (sem figura ao lado). */
export function MascotSays({ children }: { children: ReactNode; mood?: MascotMood; size?: number }) {
  return <SpeechBubble className="anim-toast-in">{children}</SpeechBubble>;
}
