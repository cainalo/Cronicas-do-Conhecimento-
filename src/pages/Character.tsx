import { useState } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, questionsForContest, topicTitle } from '@/content';
import { artifacts } from '@/content/game/artifacts';
import { MASTERY_FOR_ARTIFACT, TITLES, achievements, characterSheet, claimMission, missionProgress, topicMastery } from '@/lib/game';
import { roman } from '@/lib/roman';
import { WaxSeal } from '@/components/WaxSeal';
import { Icon } from '@/components/Icon';
import { PageHeader, SectionTitle, useIsDark } from '@/components/Page';
import { Mascot } from '@/components/Mascot';
import { ProgressRing } from '@/components/ProgressRing';
import { areaColor, tint } from '@/app/areas';

export function CharacterPage() {
  const { data, update } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const sheet = characterSheet(data);
  const seals = achievements(data, chapters, bank);
  const missions = missionProgress(data);
  const next = TITLES.find((t) => t.minLevel > sheet.level);
  const dark = useIsDark();
  const color = areaColor('reino', dark);
  const gold = dark ? '#e8b13b' : '#9a5b20';
  const [allArtifacts, setAllArtifacts] = useState(false);
  // Conquistados primeiro, depois os mais próximos de surgir.
  const ranked = [...artifacts].sort((a, b) => topicMastery(data, b.topicId, bank) - topicMastery(data, a.topicId, bank));
  const gotCount = ranked.filter((a) => topicMastery(data, a.topicId, bank) >= MASTERY_FOR_ARTIFACT).length;
  const shownArtifacts = allArtifacts ? ranked : ranked.slice(0, Math.max(6, gotCount + 4));

  return (
    <div className="space-y-6">
      <PageHeader area="reino" icon="escudo" title={sheet.title} subtitle={`Ficha do personagem · nível ${roman(sheet.level).toUpperCase()}`} />
      <header
        className="relative overflow-hidden rounded-[2rem] border p-4 shadow-[var(--shadow-card)]"
        style={{ borderColor: tint(color, 26), background: `linear-gradient(160deg, ${tint(color, 18)}, ${tint(color, 4)}), rgb(var(--surface))` }}
      >
        <div className="flex items-center gap-3">
          <Mascot mood={sheet.streak ? 'cheer' : 'idle'} size={80} />
          <ProgressRing value={sheet.into / sheet.span}>
            <span className="font-display text-2xl font-bold" style={{ color }}>{sheet.level}</span>
            <span className="-mt-1 text-[0.65rem] text-muted">nível</span>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl leading-tight">{sheet.title}</p>
            <p className="text-sm text-muted">{sheet.xp} XP · faltam {sheet.span - sheet.into} para o nível {sheet.level + 1}</p>
          </div>
        </div>
        {next && <p className="mt-3 text-xs text-muted">Próximo título: <b className="text-ink">{next.title}</b>, no nível {next.minLevel}.</p>}
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: '#1f5c45' }}>
          <Icon name="chama" size={16} strokeWidth={2.2} />
          {sheet.streak ? `${sheet.streak} dia(s) seguido(s)` : 'Estude hoje para acender a chama'}
        </p>
      </header>

      <section>
        <SectionTitle icon="calendario" color={gold}>
          Missões da semana
        </SectionTitle>
        <ul className="ledger">
          {missions.map((m) => (
            <li key={m.id} className="ledger-row">
              <span className="flex-1">
                <span className="font-medium">{m.title}</span>
                <span className="meter mt-1.5 block">
                  <span style={{ width: `${(m.cur / m.target) * 100}%`, background: m.done ? 'rgb(var(--ok))' : gold }} />
                </span>
              </span>
              {m.claimed ? (
                <span className="shrink-0 text-sm text-ok">recompensa recebida</span>
              ) : m.done ? (
                <button className="btn-primary shine anim-hop shrink-0 !min-h-0 !py-1.5 text-sm" onClick={() => update((d) => claimMission(d, m.id).data)}>
                  Receber 40 XP
                </button>
              ) : (
                <span className="shrink-0 text-sm text-muted">
                  {m.cur}/{m.target}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-1 text-xs text-muted">As missões recomeçam toda segunda-feira. Não cumprir uma missão não tira nada de você.</p>
      </section>

      <section>
        <SectionTitle icon="selo" color="#1f5c45" action={<span className="text-muted">{seals.filter((x) => x.done).length}/{seals.length}</span>}>
          Selos
        </SectionTitle>
        <ul className="grid grid-cols-3 gap-2">
          {seals.map((s, i) => (
            <li
              key={s.id}
              className={`anim-tile-in card p-2.5 text-center ${s.done ? 'shine' : ''}`}
              style={{ animationDelay: `${i * 40}ms` }}
              title={s.how}
            >
              <WaxSeal letter={s.name[0]} size={54} className={s.done ? 'mx-auto drop-shadow-md' : 'mx-auto opacity-25 grayscale'} />
              {!s.done && (
                <span className="meter mx-auto mt-1 block w-14">
                  <span style={{ width: `${(s.cur / s.max) * 100}%`, background: '#1f5c45' }} />
                </span>
              )}
              <p className={`mt-1 text-[0.8rem] font-semibold leading-tight ${s.done ? '' : 'text-muted'}`}>{s.name}</p>
              <p className="text-[0.7rem] leading-tight text-muted">{s.done ? s.how : `${s.cur}/${s.max} · ${s.how}`}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle icon="escudo" color={color} action={<span className="text-muted">{artifacts.filter((a) => topicMastery(data, a.topicId, bank) >= MASTERY_FOR_ARTIFACT).length}/{artifacts.length}</span>}>
          Inventário
        </SectionTitle>
        <p className="text-sm text-muted">Cada artefato surge quando você acerta, na última tentativa, ao menos {MASTERY_FOR_ARTIFACT * 100}% das questões do tópico.</p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {shownArtifacts.map((a) => {
            const m = topicMastery(data, a.topicId, bank);
            const got = m >= MASTERY_FOR_ARTIFACT;
            return (
              <li
                key={a.topicId}
                className={`relative flex flex-col gap-1.5 overflow-hidden rounded-[1.4rem] border p-3 ${got ? 'shine' : ''}`}
                style={{
                  borderColor: got ? tint(gold, 40) : 'rgb(var(--line))',
                  background: got ? `linear-gradient(160deg, ${tint(gold, 20)}, ${tint(gold, 4)}), rgb(var(--surface))` : 'rgb(var(--raised) / 0.5)',
                }}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl ${got ? 'anim-floaty text-white shadow-md' : 'text-muted'}`}
                  style={{ background: got ? `linear-gradient(145deg, ${gold}, color-mix(in srgb, ${gold} 65%, #000))` : 'rgb(var(--line))' }}
                >
                  <Icon name={got ? 'estrela' : 'chave'} size={22} strokeWidth={2} />
                </span>
                <span className="text-sm font-bold leading-tight">{got ? a.name : 'Artefato oculto'}</span>
                <span className="line-clamp-3 text-xs leading-snug text-muted">{got ? a.lore : topicTitle(DEFAULT_CONTEST_ID, a.topicId)}</span>
                <span className="meter mt-auto block">
                  <span style={{ width: `${Math.min(1, m / MASTERY_FOR_ARTIFACT) * 100}%`, background: got ? gold : 'rgb(var(--muted))' }} />
                </span>
              </li>
            );
          })}
        </ul>
        {!allArtifacts && ranked.length > shownArtifacts.length && (
          <button type="button" className="btn-ghost mt-3 w-full" onClick={() => setAllArtifacts(true)}>
            Ver os {ranked.length - shownArtifacts.length} artefatos ocultos restantes
          </button>
        )}
      </section>
    </div>
  );
}
