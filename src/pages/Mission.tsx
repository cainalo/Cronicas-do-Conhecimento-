// Caso prático (antiga "missão"): objetivos → descoberta guiada → laboratório de consultas → treino
// → questão de prova → resumo. Sem cena 3D nem desfecho narrativo (pacote v4, limpeza de identidade):
// o ensino e o laboratório continuam iguais. O ponto salvo antigo continua valendo.
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { getMission, getQuestion, topicTitle, DEFAULT_CONTEST_ID } from '@/content';
import type { MissionActivity } from '@/lib/activities';
import { completeMission, missionKey } from '@/lib/mission';
import { useSession } from '@/app/useSession';
import { recordAnswer } from '@/lib/study';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';
import { ActivityView, type ActivityOutcome } from '@/components/activities/ActivityView';
import { SqlLab, TableView } from '@/components/activities/SqlLab';

type Step = 'objetivos' | 'descoberta' | 'laboratorio' | 'treino' | 'prova' | 'revisao';
/** Etapas antigas (cena, desfecho) caem na etapa equivalente. */
const LEGACY: Record<string, Step> = { cena: 'objetivos', desfecho: 'revisao' };
const STEPS: Step[] = ['objetivos', 'descoberta', 'laboratorio', 'treino', 'prova', 'revisao'];
const STEP_LABEL: Record<Step, string> = {
  objetivos: 'Objetivos',
  descoberta: 'Descoberta',
  laboratorio: 'Laboratório',
  treino: 'Treino',
  prova: 'Prova',
  revisao: 'Resumo',
};

/** O que acontece em cada etapa, dito com calma. */
const STEP_NOW: Record<Step, string> = {
  objetivos: 'Veja a situação de trabalho e o que você precisa aprender para resolvê-la.',
  descoberta: 'Uma ideia de cada vez, com a tabela na sua frente. Responda a pergunta de cada ideia antes de seguir.',
  laboratorio: 'Agora é com você: monte a consulta, execute e compare o resultado com o pedido. As dicas ajudam se travar.',
  treino: 'Treino variado para fixar. Se errar, a explicação aparece e você pode tentar uma parecida.',
  prova: 'Uma questão no estilo da prova, para ver se o assunto ficou firme.',
  revisao: 'Resumo do que aprendeu, onde tropeçou e quando revisar.',
};

export function MissionPage() {
  const { id = '' } = useParams();
  const m = getMission(id);
  const navigate = useNavigate();
  const { data, update } = useStudy();
  const { sfx, confetti } = useFx();
  // Etapa, descoberta, tarefa do laboratório, fila do treino e acertos ficam salvos: sair no meio e
  // voltar retoma na mesma parte (antes, a missão recomeçava da cena).
  type Saved = { step: Step; di: number; li: number; queue: string[]; firstTry: Record<string, boolean>; errors: string[]; score?: number };
  const session = useSession<Saved>(
    missionKey(id),
    () => ({ step: 'objetivos', di: 0, li: 0, queue: (m?.training ?? []).map((a) => a.id), firstTry: {}, errors: [] }),
    (s) => `Caso prático: etapa ${STEPS.indexOf(LEGACY[s.step] ?? s.step) + 1} de ${STEPS.length} (${STEP_LABEL[LEGACY[s.step] ?? s.step]})`,
  );
  const byId = useMemo(() => {
    const out = new Map<string, MissionActivity>();
    for (const a of m?.training ?? []) {
      out.set(a.id, a);
      if (a.variant) out.set(a.variant.id, a.variant);
    }
    return out;
  }, [m]);
  const { di, li, firstTry, errors, score } = session.state;
  const step: Step = LEGACY[session.state.step] ?? session.state.step;
  const queue = session.state.queue.map((qid) => byId.get(qid)).filter((a): a is MissionActivity => !!a);
  const patch = (p: Partial<Saved> | ((s: Saved) => Partial<Saved>)) => session.setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }));
  const setStep = (x: Step) => patch({ step: x });
  const setDi = (x: number) => patch({ di: x });
  const setLi = (x: number) => patch({ li: x });
  const setQueue = (q: MissionActivity[]) => patch({ queue: q.map((a) => a.id) });
  const setFirstTry = (f: (x: Record<string, boolean>) => Record<string, boolean>) => patch((s) => ({ firstTry: f(s.firstTry) }));
  const setErrors = (f: (x: string[]) => string[]) => patch((s) => ({ errors: f(s.errors) }));
  const setScore = (x: number) => patch({ score: x });
  const total = useMemo(() => (m ? m.training.length + m.discovery.length + 1 : 1), [m]);

  if (!m) return <p>Caso prático não encontrado.</p>;

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
    go('revisao');
    session.finish();
  };

  const idx = STEPS.indexOf(step);
  const examQ = m.exam.kind === 'exam' ? getQuestion(m.exam.questionId) : undefined;

  return (
    <div className="flex min-h-[calc(100dvh-1.75rem)] flex-col">
      {/* Topo: sair e etapas */}
      <div className="mb-4 flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={() => navigate(-1)} aria-label="Sair do caso prático">
          <Icon name="errado" size={22} />
        </button>
        <ol className="flex flex-1 gap-1" aria-label="Etapas do caso prático">
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
      <p className="guide-bar -mt-2 mb-4 rounded-md px-3 py-2 text-sm" role="note">
        <b>Etapa {idx + 1} de {STEPS.length}: {STEP_LABEL[step]}.</b> {STEP_NOW[step]}
      </p>

      {step === 'objetivos' && (
        <section className="flex flex-1 flex-col" aria-label="Objetivos">
          <p className="kicker">Caso prático · {m.place}</p>
          <h1 className="mt-1 text-2xl">{m.title}</h1>
          <p className="mt-2 border-l-2 border-gold pl-3 font-display italic">{m.mystery}</p>
          <h2 className="mt-4 text-lg">O que você vai aprender</h2>
          <ol className="mt-4 space-y-2">
            {m.objectives.map((o, i) => (
              <li key={o} className="flex gap-3 rounded-md border border-line bg-surface p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-bg">{i + 1}</span>
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
          <div className="prose-content mt-2 !font-sans !text-[1rem]">
            <Markdown>{m.discovery[di].text}</Markdown>
          </div>
          {m.discovery[di].table && (
            <div className="my-3">
              <TableView t={m.lab.db[m.discovery[di].table!]} caption={`Tabela ${m.discovery[di].table}`} />
            </div>
          )}
          <div className="mt-2 flex flex-1 flex-col rounded-md border border-line bg-raised/30 p-3">
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

      {step === 'revisao' && (
        <section className="flex flex-1 flex-col" aria-label="Revisão">
          <h2 className="text-2xl">Caso prático concluído</h2>
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
          <p className="mt-4 rounded-md bg-gold/10 p-3 text-sm">
            Revisão marcada para {new Date(data.story?.reviews[m.id] ?? Date.now()).toLocaleDateString('pt-BR')}. Ela aparece em Hoje quando chegar o dia.
          </p>
          <div className="mt-auto flex gap-2 pt-4">
            <Link to={`/aprender/${m.chapterId}/${m.sectionId}`} className="btn-ghost flex-1 text-sm">
              Rever a explicação
            </Link>
            <Link to="/" className="btn-primary flex-1">
              Voltar para Hoje
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
