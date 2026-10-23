// Missão do Arquivo Real (kit, seção 4): cena → objetivos → descoberta guiada → laboratório →
// treino variado → questão de prova → desfecho com escolha → revisão. Pode sair e voltar; a cena já
// vista pode ser pulada.
import { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { getMission, getQuestion, topicTitle, DEFAULT_CONTEST_ID } from '@/content';
import { cast } from '@/content/game/cast';
import type { MissionActivity } from '@/lib/activities';
import { chooseEnding, completeMission, missionDone } from '@/lib/mission';
import { recordAnswer } from '@/lib/study';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { Mascot } from '@/components/Mascot';
import { ActivityView, type ActivityOutcome } from '@/components/activities/ActivityView';
import { SqlLab, TableView } from '@/components/activities/SqlLab';
import { SceneTranscript } from '@/components/scene/SceneTranscript';

const Scene3D = lazy(() => import('@/components/scene/Scene3D'));

type Step = 'cena' | 'objetivos' | 'descoberta' | 'laboratorio' | 'treino' | 'prova' | 'desfecho' | 'revisao';
const STEPS: Step[] = ['cena', 'objetivos', 'descoberta', 'laboratorio', 'treino', 'prova', 'desfecho', 'revisao'];
const STEP_LABEL: Record<Step, string> = {
  cena: 'Cena',
  objetivos: 'Objetivos',
  descoberta: 'Descoberta',
  laboratorio: 'Laboratório',
  treino: 'Treino',
  prova: 'Prova',
  desfecho: 'Desfecho',
  revisao: 'Revisão',
};

/** O que acontece em cada etapa, dito com calma. */
const STEP_NOW: Record<Step, string> = {
  cena: 'Assista à cena: ela mostra o problema que você vai investigar. Pode pausar, voltar ou ler em texto.',
  objetivos: 'Veja o mistério e o que você precisa aprender para resolvê-lo.',
  descoberta: 'Uma ideia de cada vez, com a tabela na sua frente. Responda a pergunta de cada ideia antes de seguir.',
  laboratorio: 'Agora é com você: monte a consulta, execute e compare o resultado com o pedido. As dicas ajudam se travar.',
  treino: 'Treino variado para fixar. Se errar, a explicação aparece e você pode tentar uma parecida.',
  prova: 'Uma questão no estilo da prova, para ver se o assunto ficou firme.',
  desfecho: 'Decida o que fazer com o que descobriu. A escolha muda a história, não o que você estuda.',
  revisao: 'Resumo do que aprendeu, onde tropeçou e quando revisar.',
};

const can3D = () => {
  if (import.meta.env.MODE === 'test' || typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

const whoColor = (who: string) => Object.values(cast).find((c) => who.includes(c.name))?.color ?? '#54605a';

export function MissionPage() {
  const { id = '' } = useParams();
  const m = getMission(id);
  const navigate = useNavigate();
  const { data, update } = useStudy();
  const { sfx, confetti } = useFx();
  const seen = m ? missionDone(data, m.id) : false;
  const [step, setStep] = useState<Step>('cena');
  const [di, setDi] = useState(0);
  const [li, setLi] = useState(0);
  const [queue, setQueue] = useState<MissionActivity[]>(() => m?.training ?? []);
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [mode3d, setMode3d] = useState(can3D);
  const [score, setScore] = useState<number>();
  const chosen = m ? data.story?.choices[m.id] : undefined;
  const total = useMemo(() => (m ? m.training.length + m.discovery.length + 1 : 1), [m]);

  if (!m) return <p>Missão não encontrada.</p>;

  const go = (s: Step) => {
    setStep(s);
    window.scrollTo?.({ top: 0 });
  };
  const note = (a: MissionActivity, o: ActivityOutcome) => {
    if (!(a.id in firstTry)) setFirstTry((f) => ({ ...f, [a.id]: o.ok }));
    if (!o.ok) setErrors((e) => [...e, a.prompt]);
  };
  const finish = () => {
    // Só as atividades-base contam (as parecidas, depois de um erro, são reforço).
    const base = new Set([...m.training, ...m.discovery.map((d) => d.check), m.exam].map((a) => a.id));
    const ok = Object.entries({ ...firstTry }).filter(([k, v]) => v && base.has(k)).length;
    const pct = Math.round((ok / total) * 100);
    setScore(pct);
    update((d) => completeMission(d, m, pct).data);
    sfx('done');
    confetti(pct >= 70 ? 100 : 50);
    go('desfecho');
  };

  const idx = STEPS.indexOf(step);
  const examQ = m.exam.kind === 'exam' ? getQuestion(m.exam.questionId) : undefined;

  return (
    <div className="-mt-2 flex min-h-[calc(100dvh-5.5rem)] flex-col">
      {/* Topo: sair e etapas */}
      <div className="mb-4 flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => navigate(-1)} aria-label="Sair da missão">
          <Icon name="errado" size={22} />
        </button>
        <ol className="flex flex-1 gap-1" aria-label="Etapas da missão">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1" title={STEP_LABEL[s]}>
              <span className={`block h-2 rounded-full ${i < idx ? 'bg-gold' : i === idx ? 'bg-ember' : 'bg-raised'}`} />
              <span className="sr-only">
                {STEP_LABEL[s]}
                {i < idx ? ' (feita)' : i === idx ? ' (atual)' : ''}
              </span>
            </li>
          ))}
        </ol>
        <span className="text-xs font-semibold text-muted">{STEP_LABEL[step]}</span>
      </div>
      <p className="guide-bar -mt-2 mb-4 rounded-2xl px-3 py-2 text-sm" role="note">
        <b>Etapa {idx + 1} de {STEPS.length}: {STEP_LABEL[step]}.</b> {STEP_NOW[step]}
      </p>

      {step === 'cena' && (
        <section className="flex flex-1 flex-col" aria-label="Cena de abertura">
          <p className="text-xs font-semibold text-gold">{m.place}</p>
          <h1 className="mt-1 text-2xl leading-tight">{m.title}</h1>
          <div className="mt-3 flex-1">
            {mode3d ? (
              <Suspense fallback={<div className="grid h-[52dvh] place-items-center rounded-3xl bg-[#141817] text-sm text-[#cfc8b6]">Carregando a cena…</div>}>
                <Scene3D beats={m.scene} onEnd={() => go('objetivos')} onFallback={() => setMode3d(false)} />
              </Suspense>
            ) : (
              <SceneTranscript beats={m.scene} color={whoColor} />
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {mode3d ? (
              <button className="btn-ghost flex-1 text-sm" onClick={() => setMode3d(false)}>
                Ler em texto
              </button>
            ) : (
              can3D() && (
                <button className="btn-ghost flex-1 text-sm" onClick={() => setMode3d(true)}>
                  Ver a cena
                </button>
              )
            )}
            <button className="btn-primary flex-1" onClick={() => go('objetivos')}>
              {seen ? 'Pular a cena' : 'Começar a investigação'}
            </button>
          </div>
        </section>
      )}

      {step === 'objetivos' && (
        <section className="flex flex-1 flex-col" aria-label="Objetivos">
          <h1 className="text-2xl">O que você vai descobrir</h1>
          <p className="mt-2 rounded-2xl border-l-4 border-ember bg-ember/5 p-3 font-display italic">{m.mystery}</p>
          <ol className="mt-4 space-y-2">
            {m.objectives.map((o, i) => (
              <li key={o} className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-sm font-bold text-white">{i + 1}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">
            Edital: {m.topicIds.map((t) => topicTitle(DEFAULT_CONTEST_ID, t)).join('; ')} · cerca de {m.minutes} min
          </p>
          <button className="btn-primary mt-auto w-full" onClick={() => go('descoberta')}>
            Vamos lá
          </button>
        </section>
      )}

      {step === 'descoberta' && (
        <section className="flex flex-1 flex-col" aria-label="Descoberta guiada">
          <p className="text-xs font-semibold text-muted">
            Descoberta {di + 1} de {m.discovery.length}
          </p>
          <h2 className="text-xl">{m.discovery[di].title}</h2>
          <div className="prose-manuscript mt-2 !font-sans !text-[1rem]">
            <Markdown>{m.discovery[di].text}</Markdown>
          </div>
          {m.discovery[di].table && (
            <div className="my-3">
              <TableView t={m.lab.db[m.discovery[di].table!]} caption={`Tabela ${m.discovery[di].table}`} />
            </div>
          )}
          <div className="mt-2 flex flex-1 flex-col rounded-3xl border border-line bg-raised/30 p-3">
            <ActivityView
              key={m.discovery[di].check.id}
              a={m.discovery[di].check}
              onNext={(o) => {
                note(m.discovery[di].check, o);
                if (di + 1 < m.discovery.length) setDi(di + 1);
                else go('laboratorio');
              }}
            />
          </div>
        </section>
      )}

      {step === 'laboratorio' && (
        <section aria-label="Laboratório">
          <p className="mb-2 text-xs font-semibold text-muted">
            Laboratório · tarefa {li + 1} de {m.lab.tasks.length}
          </p>
          <SqlLab
            key={m.lab.tasks[li].id}
            db={m.lab.db}
            task={m.lab.tasks[li]}
            onSolved={() => {
              if (li + 1 < m.lab.tasks.length) setLi(li + 1);
              else go('treino');
            }}
          />
        </section>
      )}

      {step === 'treino' && queue[0] && (
        <section className="flex flex-1 flex-col" aria-label="Treino">
          <p className="mb-1 text-xs font-semibold text-muted">
            Treino · {m.training.length - queue.filter((q) => m.training.includes(q)).length + 1} de {m.training.length}
          </p>
          <ActivityView
            key={queue[0].id + queue.length}
            a={queue[0]}
            onNext={(o) => {
              note(queue[0], o);
              const rest = queue.slice(1);
              // Errou e pediu: entra uma atividade parecida, com outros dados, logo em seguida.
              const next = o.retry ? [o.retry, ...rest] : rest;
              if (next.length) setQueue(next);
              else go('prova');
            }}
          />
        </section>
      )}

      {step === 'prova' && examQ && (
        <section className="flex flex-1 flex-col" aria-label="Questão de prova">
          <ActivityView
            a={m.exam}
            question={examQ}
            onExamAnswer={(q, key) => update((d) => recordAnswer(d, q, key, 'practice', `missao:${m.id}`).data)}
            onNext={(o) => {
              note(m.exam, o);
              finish();
            }}
          />
        </section>
      )}

      {step === 'desfecho' && (
        <section className="flex flex-1 flex-col" aria-label="Desfecho">
          <div className="flex items-end gap-2">
            <Mascot mood="think" size={72} />
            <p className="mb-6 flex-1 rounded-2xl rounded-bl-sm bg-surface p-3 text-sm shadow-sm">{m.ending.text}</p>
          </div>
          <h2 className="mt-3 text-xl">{m.ending.prompt}</h2>
          <div className="mt-3 space-y-2">
            {m.ending.options.map((o) => {
              const picked = chosen === o.id;
              return (
                <div key={o.id}>
                  <button
                    type="button"
                    disabled={!!chosen}
                    aria-pressed={picked}
                    onClick={() => update((d) => chooseEnding(d, m, o.id))}
                    className={`w-full rounded-2xl border-2 p-3 text-left font-semibold ${picked ? 'border-gold bg-gold/10' : 'border-line bg-surface'} ${chosen && !picked ? 'opacity-50' : ''}`}
                  >
                    {o.label}
                  </button>
                  {picked && (
                    <div className="anim-toast-in mt-2 rounded-2xl bg-raised/60 p-3 text-sm">
                      <p>{o.result}</p>
                      <p className="mt-2 text-xs font-bold text-gold">Pista registrada no diário: {o.clue}</p>
                      <p className="mt-1 text-xs text-muted">Essa escolha fica na sua história. Ela muda a confiança dos personagens, não o conteúdo que você estuda.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="btn-primary mt-auto w-full" disabled={!chosen} onClick={() => go('revisao')}>
            Ver o resumo
          </button>
        </section>
      )}

      {step === 'revisao' && (
        <section className="flex flex-1 flex-col" aria-label="Revisão">
          <h2 className="text-2xl">Missão concluída</h2>
          {score !== undefined && <p className="text-muted">{score}% de acerto na primeira tentativa.</p>}
          <h3 className="mt-4 font-bold">O que você aprendeu</h3>
          <ul className="mt-1 space-y-1">
            {m.recap.learned.map((l) => (
              <li key={l} className="flex gap-2">
                <Icon name="certo" size={16} className="mt-1 shrink-0 text-ok" /> {l}
              </li>
            ))}
          </ul>
          <h3 className="mt-4 font-bold">Cuidado na prova</h3>
          <ul className="mt-1 list-disc pl-5">
            {m.recap.watch.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          {errors.length > 0 && (
            <>
              <h3 className="mt-4 font-bold">Onde você tropeçou</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-muted">
                {[...new Set(errors)].map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-4 rounded-2xl bg-gold/10 p-3 text-sm">
            Revisão marcada para {new Date(data.story?.reviews[m.id] ?? Date.now()).toLocaleDateString('pt-BR')}. Ela aparece na Torre quando chegar o dia.
          </p>
          <div className="mt-auto flex gap-2 pt-4">
            <Link to={`/aprender/${m.chapterId}/${m.sectionId}`} className="btn-ghost flex-1 text-sm">
              Rever a explicação
            </Link>
            <Link to="/" className="btn-primary flex-1">
              Voltar à Torre
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
