// Renderiza overlays direto no body. Assim o fundo escuro de um modal cobre a tela inteira mesmo
// quando algum ancestral tem transform ou backdrop-filter (que prendem position: fixed ao ancestral).
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export function Portal({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return <>{children}</>;
  return createPortal(children, document.body);
}
