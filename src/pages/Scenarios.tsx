// Simulador de situações profissionais (Fase 6; spec 21). Opcional: não mexe no checkpoint da trilha.
// O estado de cada cenário fica neste aparelho e é retomado ao voltar.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { concepts, getScenario, scenarios } from '@/content';
import { advance, choose, decisionOf, restoreScenario, scenarioReport, startScenario, type Scenario, type ScenarioState } from '@/lib/scenario';
import type { StudyData } from '@/lib/model';
import { Icon } from '@/components/Icon';
import { Markdown } from '@/components/Markdown';
import { PageHeader } from '@/components/Page';

const KEY = (id: string) => `cronicas:cenario:${id}`;
const TONE = (t: string) => `rgb(var(--${t}))`;

function loadState(s: Scenario): ScenarioState | undefined {
  try {
    return restoreScenario(s, JSON.parse(localStorage.getItem(KEY(s.id)) ?? 'null') ?? undefined);
  } catch {
    return undefined;
  }
}
function saveState(st: ScenarioState) {
  try {
    localStorage.setItem(KEY(st.scenarioId), JSON.stringify(st));
  } catch {
    /* sem armazenamento: o cenário continua, só não é retomado */
  }
}

const missing = (data: StudyData, s: Scenario) => s.requires.filter((r) => !data.reading[r.chapterId]?.sectionsRead.includes(r.sectionId));

export function ScenarioListPage() {
  const { data } = useStudy();
  return (
    <div className="space-y-4">
      <PageHeader area="explorar" icon="tela" title="Simulador" subtitle="Situações de trabalho para aplicar o que você estudou" />
      <p className="text-sm text-muted">Os cenários são opcionais e não mudam o seu ponto na trilha. Pessoas, máquinas e números são fictícios.</p>
      <ul className="space-y-3">
        {scenarios.map((s) => {
          const lock = missing(data, s);
          const st = loadState(s);
          const status = st?.finishedAt ? 'Concluído' : st ? 'Em andamento' : 'Não iniciado';
          return (
            <li key={s.id}>
              <Link to={`/simulador/${s.id}`} className="card block p-4 transition hover:-translate-y-0.5" data-testid={`cenario-${s.id}`}>
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal text-white" aria-hidden="true">
                    <Icon name="tela" size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug">{s.title}</span>
                    <span className="block text-sm text-muted">{s.summary}</span>
                    <span className="mt-1 block text-xs text-muted">
                      {s.estimatedMinutes} min · {lock.length ? `Estude antes: ${lock.map((r) => r.label).join(', ')}` : status}
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ScenarioPage() {
  const { id = '' } = useParams();
  const s = getScenario(id);
  const { data } = useStudy();
  if (!s) {
    return (
      <div className="card p-5">
        <h1 className="text-xl">Cenário não encontrado</h1>
        <Link to="/simulador" className="btn-ghost mt-3 w-full">
          Ver os cenários
        </Link>
      </div>
    );
  }
  const lock = missing(data, s);
  if (lock.length) {
    return (
      <div className="space-y-4">
        <PageHeader area="explorar" icon="tela" title={s.title} subtitle={s.setting} />
        <section className="card p-5" data-testid="cenario-bloqueado">
          <h2 className="text-lg">Primeiro, estude o assunto</h2>
          <p className="mt-1 text-sm">Este cenário aplica o que a aula ensina; ele não ensina do zero. Conclua antes:</p>
          <ul className="mt-2 space-y-2">
            {lock.map((r) => (
              <li key={r.sectionId}>
                <Link to={`/aprender/${r.chapterId}/${r.sectionId}`} className="btn-primary w-full">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
  return <ScenarioPlayer s={s} />;
}

function ScenarioPlayer({ s }: { s: Scenario }) {
  const [st, setSt] = useState<ScenarioState>(() => loadState(s) ?? startScenario(s));
  useEffect(() => saveState(st), [st]);
  const node = s.nodes.find((n) => n.id === st.nodeId)!;
  const speaker = s.characters.find((c) => c.id === node.speakerId);
  const pend = st.pending && decisionOf(s, st.pending.nodeId, st.pending.decisionId);
  const steps = s.nodes.filter((n) => !n.terminal);
  const stepIdx = Math.max(0, steps.findIndex((n) => n.id === node.id));
  const evidence = s.evidence.filter((e) => st.evidence.includes(e.id));

  return (
    <div className="space-y-4">
      <PageHeader area="explorar" icon="tela" title={s.title} subtitle={s.setting} />

      <div className="flex items-center gap-2" aria-label={node.terminal ? 'Cenário concluído' : `Etapa ${stepIdx + 1} de ${steps.length}`}>
        {steps.map((n, i) => (
          <span key={n.id} className={`h-2 flex-1 rounded-full ${node.terminal || i < stepIdx ? 'bg-ok' : i === stepIdx ? 'bg-gold' : 'bg-raised'}`} />
        ))}
      </div>

      <section className="scenario-stage card overflow-hidden p-0" aria-label="Cena">
        <div className="relative p-4 sm:p-5" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${TONE(speaker?.tone ?? 'azure')} 22%, transparent), transparent)` }}>
          {node.objective && !node.terminal && <p className="mb-2 text-xs font-semibold text-muted">Objetivo: {node.objective}</p>}
          <div className="flex items-start gap-3" key={node.id}>
            {speaker && (
              <span className="anim-tile-in grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-bold text-white shadow-lg" style={{ background: TONE(speaker.tone) }} aria-hidden="true">
                {speaker.name[0]}
              </span>
            )}
            <div className="anim-tile-in min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-surface p-3 shadow-sm" aria-live="polite">
              {speaker && (
                <p className="text-sm font-bold">
                  {speaker.name} <span className="font-normal text-muted">· {speaker.role}</span>
                </p>
              )}
              <p className="mt-0.5">{node.dialogue}</p>
            </div>
          </div>
        </div>
      </section>

      {evidence.length > 0 && (
        <section aria-label="Evidências">
          <h2 className="mb-2 text-lg">Caderno de investigação</h2>
          <ul className="space-y-2">
            {evidence.map((e) => (
              <li key={e.id}>
                <details className="card p-3" open={node.evidenceIds?.includes(e.id)}>
                  <summary className="cursor-pointer font-semibold">{e.title}</summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-raised p-3 font-mono text-[0.8rem] leading-relaxed">{e.body}</pre>
                  {e.hint && <p className="mt-2 text-sm text-muted">{e.hint}</p>}
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      {pend ? (
        <section className={`card border-2 p-4 ${pend.outcome === 'boa' ? 'border-ok/60' : pend.outcome === 'aceitavel' ? 'border-gold/60' : 'border-bad/60'}`} aria-live="polite" data-testid="cenario-retorno">
          <p className={`font-bold ${pend.outcome === 'boa' ? 'text-ok' : pend.outcome === 'aceitavel' ? 'text-gold' : 'text-bad'}`}>
            {pend.outcome === 'boa' ? 'Boa decisão' : pend.outcome === 'aceitavel' ? 'Funciona, mas dá para fazer melhor' : 'Essa não resolve'}
          </p>
          <p className="mt-1">{pend.feedback}</p>
          <button className="btn-primary mt-3 w-full" onClick={() => setSt((x) => advance(s, x))}>
            {pend.nextNodeId === node.id ? 'Tentar outra decisão' : 'Continuar'}
          </button>
        </section>
      ) : node.terminal ? (
        <ScenarioClosing s={s} st={st} onRestart={() => setSt(startScenario(s))} />
      ) : (
        <section aria-label="Decisão">
          <h2 className="mb-2 text-lg">O que você faz?</h2>
          <div className="space-y-2">
            {node.decisions!.map((d) => (
              <button key={d.id} className="btn-ghost w-full !justify-start text-left" onClick={() => setSt((x) => choose(s, x, d.id))}>
                {d.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ScenarioClosing({ s, st, onRestart }: { s: Scenario; st: ScenarioState; onRestart: () => void }) {
  const r = scenarioReport(s, st);
  const terms = r.toReview.map((id) => concepts.find((c) => c.id === id)).filter(Boolean);
  return (
    <section className="card space-y-3 p-4" data-testid="cenario-fechamento">
      <h2 className="text-lg">Chamado resolvido</h2>
      <p className="text-sm">
        Acertou de primeira {r.goodFirstTry} de {r.steps} decisões.
      </p>
      <div className="rounded-2xl bg-ok/10 p-3">
        <p className="text-sm font-semibold">O princípio</p>
        <Markdown>{s.principle}</Markdown>
      </div>
      {terms.length > 0 && (
        <div>
          <p className="text-sm font-semibold">Vale revisar</p>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {terms.map((c) => (
              <li key={c!.id}>
                <b>{c!.term}</b>: {c!.definition}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button className="btn-ghost flex-1" onClick={onRestart}>
          Jogar de novo
        </button>
        <Link to="/simulador" className="btn-primary flex-1">
          Outros cenários
        </Link>
      </div>
    </section>
  );
}
