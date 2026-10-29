import type { NavigateFunction } from 'react-router-dom';

/** Use o índice do histórico do React Router, não window.history.length (que inclui páginas externas). */
export function goBack(navigate: NavigateFunction, fallback: string) {
  const state = window.history.state as { idx?: unknown } | null;
  if (typeof state?.idx === 'number' && state.idx > 0) navigate(-1);
  else navigate(fallback, { replace: true });
}
