import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, getContest, grimoires, questionsForContest } from '@/content';
import { regionNames } from '@/content/game/realm';
import { RealmMap, type RegionState } from '@/components/RealmMap';
import { achievements, characterSheet, topicMastery } from '@/lib/game';
import { areaColor } from '@/app/areas';
import { PageHeader, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';
import { SceneBanner } from '@/components/SceneBanner';
import { Icon } from '@/components/Icon';
import { useState } from 'react';
import { Prologue } from '@/components/Prologue';
import { clues } from '@/content/game/story';

export function useRegions(): RegionState[] {
  const { data } = useStudy();
  const contest = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(contest.id);
  return contest.disciplines.map((d) => {
    const topicIds = d.topics.map((t) => t.id);
    const chs = chapters.filter((c) => c.topicIds.some((t) => topicIds.includes(t)));
    const withQuestions = topicIds.filter((t) => bank.some((q) => q.topicId === t));
    const mastery = withQuestions.length ? withQuestions.reduce((s, t) => s + topicMastery(data, t, bank), 0) / withQuestions.length : 0;
    const g = grimoires.find((x) => x.chapterIds.includes(chs[0]?.id ?? ''));
    return { discipline: d, name: regionNames[d.id] ?? d.title, explored: chs.length > 0, mastery, to: g ? `/grimorio/${g.id}` : undefined };
  });
}

export function RealmPage() {
  const { data } = useStudy();
  const dark = useIsDark();
  const color = areaColor('reino', dark);
  const regions = useRegions();
  const explored = regions.filter((r) => r.explored).length;
  const sheet = characterSheet(data);
  const seals = achievements(data, chapters, questionsForContest(DEFAULT_CONTEST_ID));
  const sealsWon = seals.filter((s) => s.done).length;
  const shades = dark ? ['#78b873', '#8f9df0', '#e8b13b', '#ef7a5a'] : ['#4a7f46', '#5160c4', '#a8740c', '#c2571f'];
  const [prologue, setPrologue] = useState(false);
  const revealed = Math.min(clues.length, Object.keys(data.lessons).length);

  return (
    <div className="space-y-6">
      <PageHeader area="reino" crumb={false} title="Reino" subtitle="Seu personagem, seu domínio e o edital" />
      <SceneBanner scene="reino" dark={dark}>
        {explored} de {regions.length} regiões já têm grimório. Cada acerto clareia o mapa.
      </SceneBanner>
      {prologue && <Prologue onClose={() => setPrologue(false)} />}

      <TileGrid>
        <Tile wide to="/personagem" icon="escudo" color={shades[0]} title={sheet.title} text="Ficha, selos, inventário e missões da semana." badge={`${sealsWon}/${seals.length} selos`} />
        <Tile to="/progresso" icon="grafico" color={shades[1]} title="Progresso" text="Acertos e domínio por tópico do edital." />
        <Tile to="/diario" icon="pergaminho" color={shades[3]} title="Diário de pistas" text="O mistério da Névoa, uma pista por lição." badge={`${revealed}/${clues.length}`} />
        <Tile to="/edital" icon="lista" art="pergaminho" color={shades[2]} title="Edital" text="Provas, pesos, regras e cobertura." />
      </TileGrid>

      <section>
        <SectionTitle icon="mapa" color={color}>
          Mapa do reino
        </SectionTitle>
        <div className="card overflow-hidden p-2">
          <RealmMap regions={regions} />
        </div>
        <p className="mt-2 text-center text-sm text-muted">
          {explored} de {regions.length} regiões com grimório. A cor se intensifica com o domínio; regiões sob névoa aguardam o seu livro.
        </p>
      </section>

      <button type="button" className="btn-ghost w-full" onClick={() => setPrologue(true)}>
        <Icon name="grimorio" size={18} /> Rever o prólogo da história
      </button>

      <ul className="ledger">
        {regions.map((r) => (
          <li key={r.discipline.id}>
            {r.to ? (
              <Link to={r.to} className="ledger-row">
                <span>
                  <span className="font-semibold">{r.name}</span>
                  <span className="block text-sm text-muted">{r.discipline.title}</span>
                </span>
                <span className="shrink-0 font-bold" style={{ color }}>
                  {Math.round(r.mastery * 100)}%
                </span>
              </Link>
            ) : (
              <div className="ledger-row text-muted">
                <span>
                  {r.name}
                  <span className="block text-sm">{r.discipline.title}</span>
                </span>
                <span className="shrink-0 text-sm">sob névoa</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
