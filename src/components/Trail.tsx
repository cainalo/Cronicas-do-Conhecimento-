// Trilha do capítulo: cada trecho tem Aprender e Praticar (e caso prático, quando houver), e o
// desafio fecha o capítulo. Lista editorial numerada; a próxima parada aparece destacada.
import { Link } from 'react-router-dom';
import type { Chapter } from '@/content/types';
import type { StudyData } from '@/lib/model';
import { getLesson, missionForSection } from '@/content';
import { missionDone } from '@/lib/mission';
import { Icon, type IconName } from '@/components/Icon';
import { practiceDone } from '@/lib/practice';

interface Stop {
  key: string;
  to: string;
  label: string;
  icon: IconName;
  done: boolean;
  kind: 'read' | 'practice' | 'lesson' | 'mission';
}

export function chapterStops(c: Chapter, data: StudyData): Stop[] {
  const read = new Set(data.reading[c.id]?.sectionsRead ?? []);
  const stops: Stop[] = c.sections.flatMap((s) => {
    const label = s.title.replace(/^\d+\.\s*/, '');
    return [
      { key: `${c.id}:${s.id}:ler`, to: `/aprender/${c.id}/${s.id}`, label: `Aprender: ${label}`, icon: 'grimorio' as IconName, done: read.has(s.id), kind: 'read' as const },
      {
        key: `${c.id}:${s.id}:praticar`,
        to: `/pratica/${c.id}/${s.id}`,
        label: `Praticar: ${label}`,
        icon: 'chama' as IconName,
        done: practiceDone(data, c.id, s.id),
        kind: 'practice' as const,
      },
      ...(() => {
        const m = missionForSection(c.id, s.id);
        return m ? [{ key: `${c.id}:${s.id}:missao`, to: `/missao/${m.id}`, label: `Caso prático: ${m.title}`, icon: 'mapa' as IconName, done: missionDone(data, m.id), kind: 'mission' as const }] : [];
      })(),
    ];
  });
  for (const lid of c.lessonIds) {
    const l = getLesson(lid);
    stops.push({ key: lid, to: `/licao/${lid}`, label: l ? `Desafio: ${l.title}` : 'Desafio', icon: 'escudo', done: !!data.lessons[lid], kind: 'lesson' });
  }
  return stops;
}

const KIND: Record<Stop['kind'], string> = { read: 'Aprender', practice: 'Praticar', lesson: 'Desafio', mission: 'Caso prático' };

export function Trail({ chapter, data, color }: { chapter: Chapter; data: StudyData; color: string; guide?: boolean }) {
  const stops = chapterStops(chapter, data);
  const current = stops.findIndex((s) => !s.done);
  return (
    <ol className="ledger">
      {stops.map((s, i) => {
        const isCurrent = i === current;
        const label = s.label.replace(/^(Aprender|Praticar|Desafio|Caso prático):\s*/, '');
        return (
          <li key={s.key}>
            <Link
              to={s.to}
              className={`ledger-row ${isCurrent ? 'bg-gold/5' : ''}`}
              aria-label={`${s.label}${s.done ? ' (feito)' : isCurrent ? ' (próxima)' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs tabular-nums"
                style={s.done ? { background: color, borderColor: color, color: '#fff' } : isCurrent ? { borderColor: 'rgb(var(--gold))', color: 'rgb(var(--gold))' } : { borderColor: 'rgb(var(--line))', color: 'rgb(var(--muted))' }}
              >
                {s.done ? <Icon name="certo" size={15} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted">{KIND[s.kind]}</span>
                <span className="block leading-snug">{label}</span>
              </span>
              {isCurrent ? <span className="shrink-0 text-xs font-semibold text-gold">Próximo</span> : <Icon name={s.icon} size={16} className="shrink-0 text-muted" />}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
