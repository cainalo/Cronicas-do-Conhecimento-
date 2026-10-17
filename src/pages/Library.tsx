import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { Icon } from '@/components/Icon';

export const reviewLabel: Record<ReviewStatus, string> = {
  'nao-revisado': 'Não revisado por especialista',
  'revisado-editorialmente': 'Revisado editorialmente',
  'validado-tecnicamente': 'Validado tecnicamente',
  'pendente-atualizacao': 'Pendente de atualização',
};

export function LibraryPage() {
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const written = grimoiresForContest(contest.id);
  const writtenDisciplines = new Set(written.map((g) => g.disciplineId));
  return (
    <div className="space-y-5">
      <h1 className="text-xl text-gold">Biblioteca da Torre</h1>
      <ul className="space-y-3">
        {written.map((g) => (
          <li key={g.id}>
            <Link to={`/grimorio/${g.id}`} className="card flex gap-4 p-4 hover:bg-raised">
              <div aria-hidden className="manuscript flex h-24 w-16 shrink-0 items-center justify-center rounded-sm text-gold">
                <Icon name="selo" size={30} />
              </div>
              <div>
                <p className="text-xs text-muted">{g.epithet}</p>
                <h2 className="text-lg">{g.title}</h2>
                <p className="mt-1 text-sm text-muted">{g.description}</p>
                <p className="mt-1 text-xs text-gold">{g.chapterIds.length} capítulo(s) escrito(s)</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <section>
        <h2 className="mb-2 text-base text-muted">Estantes ainda vazias</h2>
        <ul className="grid grid-cols-2 gap-2">
          {contest.disciplines
            .filter((d) => !writtenDisciplines.has(d.id))
            .map((d) => (
              <li key={d.id} className="rounded-sm border border-dashed border-line p-3 text-sm text-muted">
                {d.title}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export function GrimoirePage() {
  const { id = '' } = useParams();
  const { data } = useStudy();
  const g = getGrimoire(id);
  if (!g) return <p>Grimório não encontrado.</p>;
  return (
    <div className="space-y-4">
      <Link to="/biblioteca" className="text-sm text-muted">
        Voltar à biblioteca
      </Link>
      <header>
        <p className="text-xs text-muted">{g.epithet}</p>
        <h1 className="text-xl text-gold">{g.title}</h1>
        <p className="mt-1 text-sm text-muted">{g.description}</p>
      </header>
      <ol className="space-y-3">
        {g.chapterIds.map((cid) => {
          const c = getChapter(cid)!;
          const rp = data.reading[c.id];
          const read = rp?.sectionsRead.length ?? 0;
          return (
            <li key={c.id} className="card p-4">
              <p className="text-xs text-muted">Capítulo {c.number}</p>
              <h2 className="text-lg">{c.title}</h2>
              <p className="text-sm text-muted">{c.subtitle}</p>
              <p className="mt-2 text-xs text-muted">
                ~{c.estimatedMinutes} min · {read}/{c.sections.length} seções lidas · <span className="chip">{reviewLabel[c.review]}</span>
              </p>
              <div className="mt-3 flex gap-2">
                <Link to={`/capitulo/${c.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`} className="btn-primary flex-1">
                  {read ? 'Continuar leitura' : 'Ler'}
                </Link>
                {c.lessonIds.map((lid, i) => (
                  <Link key={lid} to={`/licao/${lid}`} className="btn-ghost">
                    Lição {i + 1}
                  </Link>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
