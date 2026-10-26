// Estado de uma atividade que sobrevive a sair, trocar de tela ou recarregar: lê o ponto salvo em
// StudyData.progress ao abrir e grava a cada mudança. `finish` apaga o ponto (atividade concluída);
// `restart` recomeça de propósito.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { clearProgress, readProgress, saveProgress } from '@/lib/checkpoint';

export function useSession<T>(key: string, initial: () => T, label?: (s: T) => string) {
  const { data, update } = useStudy();
  const [state, setState] = useState<T>(() => readProgress<T>(data, key) ?? initial());
  const resumed = useRef(!!readProgress<T>(data, key));
  const done = useRef(false);
  const labelRef = useRef(label);
  labelRef.current = label;
  useEffect(() => {
    if (done.current) return;
    update((d) => saveProgress(d, key, state, labelRef.current?.(state)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state]);
  const finish = useCallback(() => {
    done.current = true;
    update((d) => clearProgress(d, key));
  }, [key, update]);
  const restart = useCallback(() => {
    done.current = false;
    resumed.current = false;
    setState(initial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { state, setState, finish, restart, resumed: resumed.current };
}
