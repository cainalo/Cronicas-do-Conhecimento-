import type { NavigateFunction } from 'react-router-dom';

/**
 * Activity exits should return to the real page that opened them, not a fixed section.
 * A deep-linked page has the default location key, so use a safe in-app fallback.
 */
export function returnToPreviousPage(navigate: NavigateFunction, locationKey: string, fallback: string): void {
  if (locationKey && locationKey !== 'default') {
    navigate(-1);
    return;
  }
  navigate(fallback, { replace: true });
}
