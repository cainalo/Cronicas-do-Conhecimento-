import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, chapters, questionsForContest, topicTitle } from '@/content';
import { artifacts } from '@/content/game/artifacts';
import { MASTERY_FOR_ARTIFACT, TITLES, achievements, characterSheet, claimMission, missionProgress, topicMastery } from '@/lib/game';
import { roman } from '@/lib/roman';
import { WaxSeal } from '@/components/WaxSeal';
import { Icon } from '@/components/Icon';

export function CharacterPage() {
  const { data, update } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const sheet = characterSheet(data);
  const seals = achievements(data, chapters, bank);
  const missions = missionProgress(data);
  const next = TITLES.find((t) => t.minLevel > sheet.level);

  return (
    <div className="space-y-6">
      <header className="text-center">
        <p className="rubric font-display">Ficha do personagem</p>
        <h1 className="text-4xl">{sheet.title}</h1>
        <p className="mt-1 font-display text-lg">Nível {roman(sheet.level).toUpperCase()}</p>
        <div className="meter mx-auto mt-2 max-w-xs">
          <span style={{ width: `${(sheet.into / sheet.span) * 100}%`, background: 'rgb(var(--gold))' }} />
        </div>
        <p className="mt-1 text-sm italic text-muted">
          {sheet.xp} XP · faltam {sheet.span - sheet.into} para o nível {sheet.level + 1}
          {next ? ` · título de ${next.title} no nível ${next.minLevel}` : ''}
        </p>
        <p className="mt-2 font-display">
          {sheet.streak ? `${sheet.streak} dia(s) seguido(s) de estudo` : 'Nenhuma sequência ativa: um estudo hoje começa uma nova.'}
        </p>
      </header>

      <section>
        <h2 className="text-xl">Missões da semana</h2>
        <ul className="ledger mt-2">
          {missions.map((m) => (
            <li key={m.id} className="ledger-row">
              <span className="flex-1">
                {m.title}
                <span className="meter mt-1 block">
                  <span style={{ width: `${(m.cur / m.target) * 100}%` }} />
                </span>
              </span>
              {m.claimed ? (
                <span className="shrink-0 text-sm italic text-ok">recompensa recebida</span>
              ) : m.done ? (
                <button className="btn-primary shrink-0 !min-h-0 !py-1.5 text-sm" onClick={() => update((d) => claimMission(d, m.id).data)}>
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
        <p className="mt-1 text-xs italic text-muted">As missões recomeçam toda segunda-feira. Não cumprir uma missão não tira nada de você.</p>
      </section>

      <section>
        <h2 className="text-xl">Selos</h2>
        <ul className="mt-3 grid grid-cols-3 gap-x-2 gap-y-4">
          {seals.map((s) => (
            <li key={s.id} className="text-center" title={s.how}>
              <WaxSeal letter={s.name[0]} size={54} className={s.done ? 'mx-auto' : 'mx-auto opacity-25 grayscale'} />
              <p className={`mt-1 font-display text-[0.8rem] leading-tight ${s.done ? '' : 'text-muted'}`}>{s.name}</p>
              <p className="text-[0.7rem] italic leading-tight text-muted">{s.done ? s.how : `${s.cur}/${s.max} · ${s.how}`}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl">Inventário</h2>
        <p className="text-sm italic text-muted">Cada artefato surge quando você acerta, na última tentativa, ao menos {MASTERY_FOR_ARTIFACT * 100}% das questões do tópico.</p>
        <ul className="mt-2 space-y-2">
          {artifacts.map((a) => {
            const m = topicMastery(data, a.topicId, bank);
            const got = m >= MASTERY_FOR_ARTIFACT;
            return (
              <li key={a.topicId} className={`card flex items-start gap-3 p-3 ${got ? '' : 'opacity-60'}`}>
                <span className={got ? 'text-gold' : 'text-muted'}>
                  <Icon name="selo" size={26} />
                </span>
                <span className="flex-1">
                  <span className="font-display">{got ? a.name : 'Artefato oculto'}</span>
                  <span className="block text-sm italic text-muted">{got ? a.lore : topicTitle(DEFAULT_CONTEST_ID, a.topicId)}</span>
                </span>
                <span className="shrink-0 text-sm text-muted">{Math.round(m * 100)}%</span>
              </li>
            );
          })}
        </ul>
      </section>
      <Link to="/" className="btn-ghost w-full">
        Voltar à Torre
      </Link>
    </div>
  );
}
