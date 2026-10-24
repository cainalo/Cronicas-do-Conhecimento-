// Hook da fonte única da trilha: todos os botões de Continuar usam este resultado.
import { useMemo } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { journey, lessons, missions } from '@/content';
import { courseUnits } from '@/lib/pace';
import { getLearningCheckpoint } from '@/lib/checkpoint';

export const trailUnits = () => courseUnits(journey, lessons, missions);

export function useCheckpoint() {
  const { data } = useStudy();
  const units = useMemo(trailUnits, []);
  return useMemo(() => getLearningCheckpoint(data, units), [data, units]);
}
