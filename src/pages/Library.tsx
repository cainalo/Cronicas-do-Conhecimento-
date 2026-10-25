import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { BookCover } from '@/components/BookCover';
import { Trail, chapterStops } from '@/components/Trail';
import { SceneBanner } from '@/components/SceneBanner';
import { roman } from '@/lib/roman';
import { areaColor } from '@/app/areas';
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
  const dark = useIsDark();
  const color = areaColor('grimorios', dark);
  const { data } = useStudy();
  const bookProgress = (ids: string[]) => {
    const secs = ids.flatMap((id) => getChapter(id)?.sections.map((x) => `${id}:${x.id}`) ?? []);
    const read = ids.flatMap((id) => (data.reading[id]?.sectionsRead ?? []).map((x) => `${id}:${x}`));
    return secs.length ? read.length / secs.length : 0;
  };
  return (
    <div className="space-y-6">
      <PageHeader area="explorar" title="Biblioteca" subtitle={`${written.length} livros escritos para o ${contest.name}`}>
        <Link to="/estudos" className="btn-ghost mt-3 w-full text-sm">
          Estudos: trilha, atividades rápidas, vídeos e materiais
        </Link>
      </PageHeader>
      <SceneBanner scene="biblioteca" dark={dark}>
        Nunca estudou TI? Comece por Primeiros Passos em TI. Em cada trecho você aprende, pratica e, no fim do capítulo, enfrenta o desafio.
      </SceneBanner>
      <ul className="stagger grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {written.map((g) => (
          <li key={g.id}>
            <Link to={`/grimorio/${g.id}`} className="group block">
              <span className="relative block">
                <BookCover g={g} className="transition duration-300 ease-out group-hover:-translate-y-1 group-active:scale-[0.98]" />
                {g.id === 'grim.primeiros' && (
                  <span className="absolute -top-2 left-2 rounded-[3px] bg-ink px-1.5 py-0.5 text-[11px] font-semibold text-bg">Comece aqui</span>
                )}
              </span>
              <h2 className="mt-3 text-base leading-tight">{g.title}</h2>
              <p className="mt-0.5 text-xs text-muted">
                {g.chapterIds.length === 1 ? 'um capítulo' : `${g.chapterIds.length} capítulos`} · {Math.round(bookProgress(g.chapterIds) * 100)}% lido
              </p>
              <span className="meter mt-1.5 block !h-1.5">
                <span
                  style={{
                    width: `${bookProgress(g.chapterIds) * 100}%`,
                    background: color,
                  }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {contest.disciplines.some((d) => !hasMaterial(d.topics.map((t) => t.id))) && (
        <section>
          <SectionTitle>Livros por escrever</SectionTitle>
          <p className="mb-3 text-sm text-muted">Disciplinas do edital que ainda aguardam material.</p>
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
      )}
    </div>
  );
}

export function GrimoirePage() {
  const { id = '' } = useParams();
  const { data } = useStudy();
  const g = getGrimoire(id);
  const color = areaColor('grimorios', useIsDark());
  if (!g) return <p>Disciplina não encontrada.</p>;
  return (
    <div className="space-y-6">
      <PageHeader area="explorar" title={g.title} subtitle={g.description}>
        <p className="mt-2 text-xs text-muted">
          {g.chapterIds.length} capítulo{g.chapterIds.length > 1 ? 's' : ''}
          {g.epithet !== g.title ? ` · ${g.epithet}` : ''}
        </p>
      </PageHeader>
      <ol className="space-y-10">
        {g.chapterIds.map((cid) => {
          const c = getChapter(cid)!;
          const rp = data.reading[c.id];
          const read = rp?.sectionsRead.length ?? 0;
          const stops = chapterStops(c, data);
          const nx = stops.find((s) => !s.done) ?? stops[0];
          return (
            <li key={c.id}>
              <section aria-label={c.title}>
                <p className="kicker">
                  Capítulo {roman(c.number).toUpperCase()} · {read}/{c.sections.length} trechos · cerca de {c.estimatedMinutes} min
                </p>
                <h2 className="mt-1 text-[1.45rem] leading-snug">{c.title}</h2>
                <p className="text-sm text-muted">{c.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to={nx.to} className="btn-primary !min-h-[42px] text-sm">
                    {stops.some((s) => s.done) ? 'Continuar' : 'Começar'} <Icon name="avancar" size={16} />
                  </Link>
                  <Link to={`/capitulo/${c.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`} className="btn-ghost !min-h-[42px] text-sm">
                    <Icon name="livro" size={16} /> Texto completo
                  </Link>
                </div>
                <div className="mt-4">
                  <Trail chapter={c} data={data} color={color} />
                </div>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
