import type { FictionalTeacher } from '@/content/teachers';
import { TeacherCharacter } from '@/components/TeacherCharacter';

/** Avatar, retrato e professor em cena partem exatamente da mesma ilustração vetorial. */
export function TeacherAvatar({ t, size = 40, ring = false }: { t: FictionalTeacher; size?: number; ring?: boolean }) {
  return (
    <TeacherCharacter teacher={t} pose="listening" size={size} portrait
      className={ring ? 'ring-2 ring-gold ring-offset-2 ring-offset-bg' : ''}/>
  );
}
