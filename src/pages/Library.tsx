import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getChapter, getContest, getGrimoire, grimoiresForContest } from '@/content';
import type { ReviewStatus } from '@/content/types';
import { BookCover } from '@/components/BookCover';
import { Trail, chapterStops } from '@/components/Trail';
import { SceneBanner } from '@/components/SceneBanner';
import { MascotSays } from '@/components/Mascot';
import { regionStories } from '@/content/game/story';
import { useRegions } from './Realm';
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
                <BookCover g={g} className="transition duration-300 ease-out group-hover:[transform:perspective(700px)_rotateY(-10deg)_translateY(-4px)] group-active:scale-[0.98]" />
                {g.id === 'grim.primeiros' && (
                  <span className="anim-hop absolute -right-1 -top-2 rounded-full bg-ember px-2.5 py-1 text-[11px] font-bold text-white shadow-md">Comece aqui</span>
                )}
              </span>
              <p className="mt-3 text-xs font-semibold" style={{ color }}>{g.epithet}</p>
              <h2 className="text-base leading-tight">{g.title}</h2>
              <p className="mt-0.5 text-xs text-muted">
                {g.chapterIds.length === 1 ? 'um capítulo' : `${g.chapterIds.length} capítulos`} · {Math.round(bookProgress(g.chapterIds) * 100)}% lido
              </p>
              <span className="meter mt-1.5 block !h-1.5">
                <span style={{ width: `${bookProgress(g.chapterIds) * 100}%`, background: color }} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <section>
        <SectionTitle icon="pena" color={color}>
          Livros por escrever
        </SectionTitle>
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
    </div>
  );
}

export function GrimoirePage() {
  const { id = '' } = useParams();
  const { data } = useStudy();
  const g = getGrimoire(id);
  const color = areaColor('grimorios', useIsDark());
  const regions = useRegions();
  if (!g) return <p>Disciplina não encontrada.</p>;
  const region = regions.find((r) => r.discipline.id === g.disciplineId);
  const story = regionStories[g.disciplineId];
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
          <Icon name="voltar" size={14} strokeWidth={2.2} /> Biblioteca
        </Link>
        <div className="flex items-center gap-4">
          <BookCover g={g} className="w-24 shrink-0" />
          <div>
            <p className="text-xs font-semibold" style={{ color }}>{g.epithet}</p>
            <h1 className="text-[1.6rem] leading-tight">{g.title}</h1>
          </div>
        </div>
        <p className="mt-4 text-[0.95rem] text-muted">{g.description}</p>
        {story && (
          <div className="mt-4">
            <MascotSays mood={(region?.mastery ?? 0) >= 0.8 ? 'cheer' : 'talk'} size={68}>
              {(region?.mastery ?? 0) >= 0.8 ? story.cleared : story.intro}
            </MascotSays>
          </div>
        )}
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
                  <p className="text-xs font-bold opacity-85">
                    Capítulo {roman(c.number).toUpperCase()} · {read}/{c.sections.length} trechos
                  </p>
                  <h3 className="mt-1 text-lg leading-snug">{c.title}</h3>
                  <p className="text-sm opacity-90">{c.subtitle}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {(() => {
                      const stops = chapterStops(c, data);
                      const nx = stops.find((s) => !s.done) ?? stops[0];
                      return (
                        <Link
                          to={nx.to}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm transition active:scale-95"
                          style={{ color }}
                        >
                          <Icon name="play" size={15} fill="currentColor" /> {stops.some((s) => s.done) ? 'Continuar' : 'Começar'}
                        </Link>
                      );
                    })()}
                    <Link
                      to={`/capitulo/${c.id}${rp?.lastSectionId ? `#${rp.lastSectionId}` : ''}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/60 px-3 py-1.5 text-xs font-semibold transition active:scale-95"
                    >
                      <Icon name="grimorio" size={14} strokeWidth={2.2} /> Texto completo
                    </Link>
                    <span className="text-xs opacity-85">cerca de {c.estimatedMinutes} min</span>
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
