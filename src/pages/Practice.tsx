// Prática de um trecho, no estilo Duolingo: atividades curtas e variadas, painel de resposta embaixo,
// erros voltam para o fim da fila e o Bubo abre e fecha a rodada com a cena da história.
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { DEFAULT_CONTEST_ID, getChapter, getSectionExtras, getSimpleSection, questionsForContest } from '@/content';
import { buildPractice, completePractice, type Activity } from '@/lib/practice';
import { recordAnswer, totalXp } from '@/lib/study';
import { Icon } from '@/components/Icon';
import { Mascot, SpeechBubble } from '@/components/Mascot';
import { QuestionStem } from '@/components/QuestionCard';

type Verdict = { ok: boolean; title: string; detail?: string };

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const choiceCls = (state: 'idle' | 'sel' | 'ok' | 'bad' | 'dim') =>
  ({
    idle: 'border-line bg-surface hover:bg-raised/60',
    sel: 'border-[#3b6fb0] bg-[#3b6fb0]/10 shadow-[inset_0_0_0_1px_#3b6fb0]',
    ok: 'border-ok bg-ok/10',
    bad: 'border-bad bg-bad/10',
    dim: 'border-line bg-surface opacity-60',
  })[state];

/** Escolha única (V/F, lacuna, termo, questão). */
function Choices({ options, answer, locked, value, onPick, labels }: { options: string[]; answer: string; locked: boolean; value?: string; onPick: (v: string) => void; labels?: Record<string, string> }) {
  return (
    <ul className="space-y-2">
      {options.map((o, i) => {
        const state = !locked ? (value === o ? 'sel' : 'idle') : o === answer ? 'ok' : value === o ? 'bad' : 'dim';
        return (
          <li key={o}>
            <button
              type="button"
              disabled={locked}
              onClick={() => onPick(o)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left text-[0.98rem] shadow-[0_3px_0_rgb(var(--line))] transition active:translate-y-[2px] active:shadow-none ${choiceCls(state)}`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line text-xs font-bold text-muted">{i + 1}</span>
              <span className="flex-1">{labels?.[o] ?? o}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Associar pares: toque num termo e depois na definição. */
function Pairs({ a, onDone }: { a: Extract<Activity, { kind: 'pairs' }>; onDone: (ok: boolean) => void }) {
  const { sfx } = useFx();
  const left = useMemo(() => shuffle(a.pairs.map((p) => p.term)), [a]);
  const right = useMemo(() => shuffle(a.pairs.map((p) => p.definition)), [a]);
  const [selL, setSelL] = useState<string>();
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string>();
  const [mistakes, setMistakes] = useState(0);
  const pick = (def: string) => {
    if (!selL) return;
    const ok = a.pairs.find((p) => p.term === selL)?.definition === def;
    if (ok) {
      sfx('ok');
      const m = [...matched, selL];
      setMatched(m);
      setSelL(undefined);
      if (m.length === a.pairs.length) window.setTimeout(() => onDone(mistakes === 0), 350);
    } else {
      sfx('bad');
      setMistakes((n) => n + 1);
      setWrong(def);
      window.setTimeout(() => setWrong(undefined), 450);
    }
  };
  const matchedDefs = a.pairs.filter((p) => matched.includes(p.term)).map((p) => p.definition);
  return (
    <div className="grid grid-cols-2 gap-2">
      <ul className="space-y-2">
        {left.map((t) => (
          <li key={t}>
            <button
              type="button"
              disabled={matched.includes(t)}
              onClick={() => setSelL(t)}
              className={`w-full rounded-2xl border-2 p-2.5 text-left text-sm font-semibold shadow-[0_3px_0_rgb(var(--line))] transition ${matched.includes(t) ? 'border-ok/50 bg-ok/10 text-ok opacity-60' : selL === t ? choiceCls('sel') : choiceCls('idle')}`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {right.map((d) => (
          <li key={d}>
            <button
              type="button"
              disabled={matchedDefs.includes(d)}
              onClick={() => pick(d)}
              className={`w-full rounded-2xl border-2 p-2.5 text-left text-xs leading-snug shadow-[0_3px_0_rgb(var(--line))] transition ${matchedDefs.includes(d) ? 'border-ok/50 bg-ok/10 opacity-60' : wrong === d ? 'anim-shake border-bad bg-bad/10' : choiceCls('idle')}`}
            >
              {d}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PracticePage() {
  const { chapterId = '', sectionId = '' } = useParams();
  const navigate = useNavigate();
  const chapter = getChapter(chapterId);
  const section = chapter?.sections.find((s) => s.id === sectionId);
  const extras = getSectionExtras(chapterId, sectionId);
  const simple = getSimpleSection(chapterId, sectionId);
  const { data, update } = useStudy();
  const { sfx, confetti } = useFx();
  const startXp = useMemo(() => totalXp(data), []); // eslint-disable-line react-hooks/exhaustive-deps
  const initial = useMemo(() => (chapter ? buildPractice(chapter, sectionId, questionsForContest(DEFAULT_CONTEST_ID), extras, Math.random, simple) : []), [chapter, sectionId, extras, simple]);
  const [queue, setQueue] = useState<Activity[]>(initial);
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [value, setValue] = useState<string>();
  const [verdict, setVerdict] = useState<Verdict>();
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});
  const [combo, setCombo] = useState(0);

  if (!chapter || !section) return <p>Trecho não encontrado.</p>;
  const total = initial.length;
  const progress = phase === 'done' ? 1 : Math.min(1, Math.max(0, (total - queue.length) / Math.max(1, total)));
  const act = queue[0];
  const correctFirst = Object.values(firstTry).filter(Boolean).length;
  const score = total ? Math.round((correctFirst / total) * 100) : 100;

  const judge = (ok: boolean, title: string, detail?: string) => {
    setVerdict({ ok, title, detail });
    sfx(ok ? 'ok' : 'bad');
    setCombo((c) => (ok ? c + 1 : 0));
    if (act && !(act.id in firstTry)) setFirstTry((f) => ({ ...f, [act.id]: ok }));
    if (act?.kind === 'mcq' && value) update((d) => recordAnswer(d, act.question, value, 'practice', `pratica:${chapterId}:${sectionId}`).data);
  };

  const check = () => {
    if (!act || value === undefined) return;
    if (act.kind === 'tf') {
      const ok = (value === 'v') === act.answer;
      judge(ok, ok ? 'Correto!' : `É ${act.answer ? 'verdadeiro' : 'falso'}.`, act.why);
    } else if (act.kind === 'blank') {
      const ok = value === act.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${act.answer}`, act.why);
    } else if (act.kind === 'term') {
      const ok = value === act.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${act.answer}`);
    } else if (act.kind === 'mcq') {
      const q = act.question;
      const ok = value === q.answer;
      judge(ok, ok ? 'Correto!' : `Resposta: ${q.answer}`, ok ? q.options.find((o) => o.key === q.answer)?.comment : q.explanation);
    }
  };

  const next = () => {
    const ok = verdict?.ok;
    setVerdict(undefined);
    setValue(undefined);
    const [head, ...rest] = queue;
    // Errou: a atividade volta no fim da fila, como no Duolingo.
    const q = ok ? rest : [...rest, head];
    if (q.length === 0) {
      const finalScore = total ? Math.round((Object.values({ ...firstTry }).filter(Boolean).length / total) * 100) : 100;
      update((d) => completePractice(d, chapterId, sectionId, finalScore).data);
      sfx('done');
      if (finalScore >= 70) confetti(finalScore === 100 ? 110 : 60);
      setPhase('done');
    }
    setQueue(q);
  };

  const exit = () => navigate(`/grimorio/${chapter.grimoireId}`);

  return (
    <div className="-mt-2 flex min-h-[calc(100dvh-5.5rem)] flex-col">
      {/* Topo: sair, progresso e sequência */}
      <div className="mb-4 flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-raised" onClick={exit} aria-label="Sair da prática">
          <Icon name="errado" size={22} />
        </button>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full rounded-full bg-ok transition-all duration-500" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className={`inline-flex items-center gap-1 text-sm font-bold ${combo >= 2 ? 'anim-hop text-ember' : 'text-muted'}`} aria-label={`Sequência de ${combo}`}>
          <Icon name="chama" size={18} strokeWidth={2.2} /> {combo}
        </span>
      </div>

      {phase === 'intro' && (
        <div className="flex flex-1 flex-col">
          <p className="rubric text-sm font-semibold">{chapter.title}</p>
          <h1 className="text-2xl leading-tight">Prática: {section.title.replace(/^\d+\.\s*/, '')}</h1>
          <div className="mt-6 flex items-end gap-2">
            <Mascot mood="talk" size={92} />
            <SpeechBubble className="anim-toast-in mb-8 flex-1">
              {extras?.scene?.length
                ? `${extras.scene[extras.scene.length - 1].text}`
                : 'Vamos ver o que ficou deste trecho. Errou? A pergunta volta no fim até você acertar.'}
            </SpeechBubble>
          </div>
          <p className="text-sm text-muted">{total} atividades curtas. Começa fácil e vai ficando mais difícil. Errou? A atividade volta no fim.</p>
          <div className="mt-auto pt-6">
            <button className="btn-primary w-full" onClick={() => setPhase('play')} disabled={!total}>
              <Icon name="play" size={18} fill="currentColor" /> Começar
            </button>
            <Link to={simple ? `/aprender/${chapterId}/${sectionId}` : `/capitulo/${chapterId}#${sectionId}`} className="btn-ghost mt-2 w-full">
              <Icon name="grimorio" size={18} /> Rever a explicação
            </Link>
          </div>
        </div>
      )}

      {phase === 'play' && act && (
        <div className="flex flex-1 flex-col">
          <div key={act.id + queue.length} className="anim-tile-in flex-1">
            {act.kind === 'tf' && (
              <>
                <p className="text-sm font-semibold text-muted">Verdadeiro ou falso?</p>
                <p className="mb-5 mt-2 font-display text-xl leading-snug">{act.statement}</p>
                <Choices options={['v', 'f']} labels={{ v: 'Verdadeiro', f: 'Falso' }} answer={act.answer ? 'v' : 'f'} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'blank' && (
              <>
                <p className="text-sm font-semibold text-muted">Complete a frase</p>
                <p className="mb-5 mt-2 font-display text-xl leading-snug">
                  {act.sentence.split('___').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`mx-1 inline-block min-w-[4rem] rounded-lg border-b-2 px-2 text-center ${value ? 'border-[#3b6fb0] text-[#3b6fb0]' : 'border-muted text-transparent'}`}>{value ?? '____'}</span>
                      )}
                    </span>
                  ))}
                </p>
                <Choices options={act.options} answer={act.answer} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'term' && (
              <>
                <p className="text-sm font-semibold text-muted">Qual é o termo?</p>
                <p className="mb-5 mt-2 rounded-2xl border border-line bg-surface p-4 font-serif text-lg leading-snug">{act.definition}</p>
                <Choices options={act.options} answer={act.answer} locked={!!verdict} value={value} onPick={setValue} />
              </>
            )}
            {act.kind === 'pairs' && (
              <>
                <p className="mb-4 text-sm font-semibold text-muted">Associe cada termo à sua definição</p>
                <Pairs a={act} onDone={(ok) => judge(ok, ok ? 'Pares perfeitos!' : 'Pares completos', ok ? undefined : 'Houve tropeços no caminho; a rodada volta a esta atividade no fim.')} />
              </>
            )}
            {act.kind === 'mcq' && (
              <>
                <p className="text-sm font-semibold text-muted">Questão no estilo da prova</p>
                <QuestionStem text={act.question.stem} className="mb-4 mt-2" />
                <Choices
                  options={act.question.options.map((o) => o.key)}
                  labels={Object.fromEntries(act.question.options.map((o) => [o.key, `${o.key}) ${o.text}`]))}
                  answer={act.question.answer}
                  locked={!!verdict}
                  value={value}
                  onPick={setValue}
                />
              </>
            )}
          </div>

          {/* Painel de resposta */}
          {act.kind !== 'pairs' && !verdict && (
            <div className="sticky bottom-0 mt-4 bg-bg pb-2 pt-2">
              <button className="btn-primary w-full" disabled={value === undefined} onClick={check}>
                Verificar
              </button>
            </div>
          )}
          {verdict && (
            <div className={`anim-toast-in sticky bottom-0 -mx-4 mt-4 rounded-t-[1.6rem] px-4 pb-4 pt-4 sm:-mx-6 sm:px-6 ${verdict.ok ? 'bg-[#dcefd8] text-[#1f4d1c]' : 'bg-[#f6d9d2] text-[#6b1f12]'}`} role="status">
              <p className="flex items-center gap-2 text-lg font-bold">
                <Icon name={verdict.ok ? 'certo' : 'errado'} size={22} strokeWidth={2.6} /> {verdict.title}
              </p>
              {verdict.detail && <p className="mt-1 text-sm leading-snug">{verdict.detail}</p>}
              <button className={`mt-3 w-full rounded-full px-5 py-3 font-bold text-white shadow-md ${verdict.ok ? 'bg-[#3d7d42]' : 'bg-[#aa3d2a]'}`} onClick={next}>
                Continuar
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-1 flex-col items-center text-center">
          <div className="flex items-end gap-2">
            <Mascot mood={score >= 70 ? 'cheer' : 'talk'} size={104} />
            <SpeechBubble className="anim-toast-in mb-10 max-w-[15rem] text-left">
              {extras?.outro ?? (score >= 70 ? 'Muito bem! A névoa recua deste trecho.' : 'Os erros voltaram até você acertar. Isso também é aprender.')}
            </SpeechBubble>
          </div>
          <h1 className="mt-2 text-2xl">Trecho praticado!</h1>
          <div className="mt-4 grid w-full grid-cols-3 gap-2">
            <span className="rounded-2xl border-2 border-[#e8b13b] p-2">
              <b className="block text-xl text-[#a8740c]">+{totalXp(data) - startXp}</b>
              <span className="text-xs text-muted">XP</span>
            </span>
            <span className="rounded-2xl border-2 border-ok p-2">
              <b className="block text-xl text-ok">{score}%</b>
              <span className="text-xs text-muted">de primeira</span>
            </span>
            <span className="rounded-2xl border-2 border-[#3b6fb0] p-2">
              <b className="block text-xl text-[#3b6fb0]">{total}</b>
              <span className="text-xs text-muted">atividades</span>
            </span>
          </div>
          <div className="mt-auto w-full pt-6">
            <button className="btn-primary w-full" onClick={exit}>
              Continuar a trilha
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
