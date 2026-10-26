// Número que sobe até o valor ao aparecer (efeito da identidade editorial). Sem animação nos
// testes, com "menos movimento" do sistema ou com animações desligadas no painel.
import { useEffect, useState } from 'react';

const still = () =>
  import.meta.env.MODE === 'test' ||
  typeof window === 'undefined' ||
  typeof window.requestAnimationFrame !== 'function' ||
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motion === 'nenhum';

export function useCountUp(value: number, ms = 900): number {
  const [n, setN] = useState(() => (still() ? value : 0));
  useEffect(() => {
    if (still()) return setN(value);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return n;
}
