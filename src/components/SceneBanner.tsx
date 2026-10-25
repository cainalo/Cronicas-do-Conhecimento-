// Nota curta do topo das páginas centrais (identidade editorial: só texto com filete).
import type { ReactNode } from 'react';
import type { MascotMood } from '@/components/Mascot';

export type Scene = 'biblioteca' | 'treino' | 'reino' | 'conta';

export function SceneBanner({ children }: { scene: Scene; children: ReactNode; mood?: MascotMood; dark?: boolean }) {
  // Identidade editorial: nota curta com fio de destaque, sem cena nem mascote.
  return (
    <p className="mb-5 border-l-2 border-gold py-0.5 pl-3 text-sm text-muted" role="note">
      {children}
    </p>
  );
}
