import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { BookCover } from '@/components/BookCover';
import { roman } from '@/lib/roman';
import { areaColor, tint } from '@/app/areas';
import { Icon } from '@/components/Icon';
import { PageHeader, SectionTitle, useIsDark } from '@/components/Page';

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
  const color = areaColor('grimorios', useIsDark());
  return (
    <div className="space-y-6">
      <PageHeader area="grimorios" crumb={false} title="Grimórios" subtitle={`${written.length} livros escritos para o ${contest.name}`} />
      <ul className="stagger grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {written.map((g) => (
          <li key={g.id}>
            <Link to={`/grimorio/${g.id}`} className="group block">
              <BookCover g={g} className="transition duration-300 ease-out group-hover:[transform:perspective(700px)_rotateY(-10deg)_translateY(-4px)] group-active:scale-[0.98]" />
              <p className="mt-3 text-xs font-semibold" style={{ color }}>{g.epithet.replace('Grimório de ', '')}</p>
              <h2 className="text-base leading-tight">{g.title}</h2>
              <p className="mt-0.5 text-xs text-muted">
                {g.chapterIds.length === 1 ? 'um capítulo escrito' : `${g.chapterIds.length} capítulos escritos`}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <section>
        <SectionTitle icon="pena" color={color}>
          Livros por escrever
        </SectionTitle>
        <p className="mb-3 text-sm text-muted">Disciplinas do edital que ainda aguardam o seu grimório.</p>
        <ul className="card columns-2 gap-6 p-4 text-[0.95rem]">
          {contest.disciplines
            .filter((d) => !hasMaterial(d.topics.map((t) => t.id)))
            .map((d) => (
              <li key={d.id} className="mb-1.5 break-inside-avoid">
                <span style={{ color }}>•</span> {d.title}
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
  const color = areaColor('grimorios', useIsDark());
  if (!g) return <p>Grimório não encontrado.</p>;
  return (
    <div className="space-y-6">
      <header>
        <Link
          to="/biblioteca"
          className="mb-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ color, backgroundColor: tint(color, 12) }}
        >
          <Icon name="voltar" size={14} strokeWidth={2.2} /> Grimórios
        </Link>
        <div className="flex items-center gap-4">
          <BookCover g={g} className="w-24 shrink-0" />
          <div>
            <p className="text-xs font-semibold" style={{ color }}>{g.epithet}</p>
            <h1 className="text-[1.6rem] leading-tight">{g.title}</h1>
          </div>
        </div>
        <p className="mt-4 text-[0.95rem] text-muted">{g.description}</p>
      </header>
      <section>
        <SectionTitle icon="sumario" color={color}>
          Capítulos
        </SectionTitle>
        <ol className="stagger space-y-3">
          {g.chapterIds.map((cid) => {
            const c = getChapter(cid)!;
            const rp = data.reading[c.id];
            const read = rp?.sectionsRead.length ?? 0;
            return (
              <li key={c.id} className="card p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ background: color }}>
                    Capítulo {roman(c.number).toUpperCase()}
                  </span>
                  <span className="text-xs text-muted">
                    {read}/{c.sections.length} seções lidas
                  </span>
                </div>
                <span className="meter mt-3">
                  <span style={{ width: `${(read / c.sections.length) * 100}%`, background: color }} />
                </span>
                <h3 className="mt-3 text-lg leading-snug">{c.title}</h3>
                <p className="text-sm text-muted">{c.subtitle}</p>
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
