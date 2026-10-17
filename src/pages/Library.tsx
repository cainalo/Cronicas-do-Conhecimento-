import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { BookCover } from '@/components/BookCover';
import { Trail, chapterStops } from '@/components/Trail';
import { SceneBanner } from '@/components/SceneBanner';
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
  const dark = useIsDark();
  const color = areaColor('grimorios', dark);
  return (
    <div className="space-y-6">
      <PageHeader area="grimorios" crumb={false} title="Grimórios" subtitle={`${written.length} livros escritos para o ${contest.name}`} />
      <SceneBanner scene="biblioteca" dark={dark}>
        Escolha um livro. Cada capítulo é uma trilha com paradas e uma lição no fim.
      </SceneBanner>
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
  // O mascote espera só no primeiro capítulo ainda não concluído.
  const firstOpen = g.chapterIds.findIndex((cid) => chapterStops(getChapter(cid)!, data).some((s) => !s.done));
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
        <SectionTitle icon="mapa" color={color}>
          Trilha
        </SectionTitle>
        <ol className="space-y-8">
          {g.chapterIds.map((cid, ci) => {
            const c = getChapter(cid)!;
            const rp = data.reading[c.id];
            const read = rp?.sectionsRead.length ?? 0;
            return (
              <li key={c.id}>
                {/* Faixa do trecho, como as unidades do Duolingo */}
                <div
                  className="shine relative mb-6 overflow-hidden rounded-[1.6rem] p-4 text-white shadow-[var(--shadow-card)]"
                  style={{ background: `linear-gradient(140deg, ${color}, color-mix(in srgb, ${color} 65%, #000))` }}
                >
                  <p className="text-xs font-bold uppercase tracking-wide opacity-85">
                    Capítulo {roman(c.number).toUpperCase()} · {read}/{c.sections.length} seções
                  </p>
                  <h3 className="mt-1 text-lg leading-snug">{c.title}</h3>
                  <p className="text-sm opacity-90">{c.subtitle}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link
                      to={`/capitulo/${c.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm transition active:scale-95"
                      style={{ color }}
                    >
                      <Icon name="grimorio" size={16} strokeWidth={2.2} /> {read ? 'Continuar leitura' : 'Abrir o capítulo'}
                    </Link>
                    <span className="text-xs opacity-85">cerca de {c.estimatedMinutes} min · {reviewLabel[c.review].toLowerCase()}</span>
                  </div>
                </div>
                <Trail chapter={c} data={data} color={color} guide={ci === firstOpen} />
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
