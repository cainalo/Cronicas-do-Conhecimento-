import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { BookCover } from '@/components/BookCover';
import { roman } from '@/lib/roman';

export const reviewLabel: Record<ReviewStatus, string> = {
  'nao-revisado': 'Não revisado por especialista',
  'revisado-editorialmente': 'Revisado editorialmente',
  'validado-tecnicamente': 'Validado tecnicamente',
  'pendente-atualizacao': 'Pendente de atualização',
};

export function LibraryPage() {
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const written = grimoiresForContest(contest.id);
  const coveredTopics = new Set(chapters.flatMap((c) => c.topicIds));
  const hasMaterial = (topicIds: string[]) => topicIds.some((t) => coveredTopics.has(t));
  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-4xl">Bibliotheca</h1>
        <p className="font-display text-muted">da Torre dos Escribas</p>
      </header>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-7">
        {written.map((g) => (
          <li key={g.id}>
            <Link to={`/grimorio/${g.id}`} className="group block">
              <BookCover g={g} className="transition duration-300 ease-out group-hover:[transform:perspective(700px)_rotateY(-10deg)_translateY(-4px)] group-active:scale-[0.98]" />
              <p className="mt-3 font-display text-[0.8rem] text-muted">{g.epithet}</p>
              <h2 className="text-lg leading-tight">{g.title}</h2>
              <p className="mt-0.5 text-sm italic text-muted">
                {g.chapterIds.length === 1 ? 'um capítulo escrito' : `${g.chapterIds.length} capítulos escritos`}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="divider-ornament" aria-hidden>
        ❧
      </div>
      <section>
        <h2 className="mb-1 text-lg">Livros por escrever</h2>
        <p className="mb-3 text-sm italic text-muted">Disciplinas do edital que ainda aguardam o seu grimório.</p>
        <ul className="columns-2 gap-6 text-[0.98rem]">
          {contest.disciplines
            .filter((d) => !hasMaterial(d.topics.map((t) => t.id)))
            .map((d) => (
              <li key={d.id} className="mb-1.5 break-inside-avoid">
                <span className="rubric">¶</span> {d.title}
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
    <div className="space-y-6">
      <Link to="/biblioteca" className="font-display text-sm text-muted">
        Voltar à biblioteca
      </Link>
      <header className="flex items-start gap-4">
        <BookCover g={g} className="w-28 shrink-0" />
        <div>
          <p className="font-display text-sm text-muted">{g.epithet}</p>
          <h1 className="text-3xl leading-tight">{g.title}</h1>
          <p className="mt-2 text-[0.98rem]">{g.description}</p>
        </div>
      </header>
      <section>
        <h2 className="rubric text-center text-xl">Index capitulorum</h2>
        <ol className="mt-3 space-y-5">
          {g.chapterIds.map((cid) => {
            const c = getChapter(cid)!;
            const rp = data.reading[c.id];
            const read = rp?.sectionsRead.length ?? 0;
            return (
              <li key={c.id} className="border-t border-ink/25 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="rubric font-display text-lg">Cap. {roman(c.number)}</span>
                  <span className="flex-1 border-b border-dotted border-ink/40" />
                  <span className="text-sm italic text-muted">
                    {read}/{c.sections.length} seções
                  </span>
                </div>
                <h3 className="mt-1 text-xl leading-snug">{c.title}</h3>
                <p className="italic text-muted">{c.subtitle}</p>
                <p className="mt-1 text-xs text-muted">
                  cerca de {c.estimatedMinutes} minutos · {reviewLabel[c.review]}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to={`/capitulo/${c.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`} className="btn-primary flex-1">
                    {read ? 'Continuar leitura' : 'Abrir o capítulo'}
                  </Link>
                  {c.lessonIds.map((lid, i) => (
                    <Link key={lid} to={`/licao/${lid}`} className="btn-ghost">
                      Lição {roman(i + 1).toUpperCase()}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
