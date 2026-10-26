// Rodada relâmpago: 5 questões rápidas, com sequência de acertos e comemoração no fim.
// Prefere questões ainda não respondidas dos capítulos que a pessoa já começou a ler.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useFx } from '@/app/fx';
import { DEFAULT_CONTEST_ID, questionsForContest } from '@/content';
import type { Question } from '@/content/types';
import { latestAttempt, recordAnswer } from '@/lib/study';
import type { StudyData } from '@/lib/model';
import { QuestionCard } from '@/components/QuestionCard';
import { Mascot, SpeechBubble } from '@/components/Mascot';
import { PageHeader } from '@/components/Page';
import { Icon } from '@/components/Icon';

const ROUND = 5;

export function pickBlitz(data: StudyData, bank: Question[], rnd: () => number = Math.random): Question[] {
  const started = new Set(Object.keys(data.reading));
  const shuffle = <T,>(a: T[]) => a.map((x) => [rnd(), x] as const).sort((p, q) => p[0] - q[0]).map(([, x]) => x);
  const fresh = (q: Question) => !latestAttempt(data, q.id);
  const tiers = [
    bank.filter((q) => started.has(q.chapterId) && fresh(q)),
    bank.filter((q) => started.has(q.chapterId)),
    bank.filter(fresh),
    bank,
  ];
  const out: Question[] = [];
  for (const t of tiers) {
    for (const q of shuffle(t)) {
      if (out.length >= ROUND) break;
      if (!out.includes(q)) out.push(q);
    }
  }
  return out;
}

export function BlitzPage() {
  const { data, update } = useStudy();
  const { confetti, sfx } = useFx();
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const qs = useMemo(() => pickBlitz(data, questionsForContest(DEFAULT_CONTEST_ID)), [seed]);
  const [i, setI] = useState(0);
  const [hits, setHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const done = i >= qs.length;

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setHits(0);
    setCombo(0);
    setBest(0);
  };

  return (
    <div className="space-y-4">
      <PageHeader area="treino" icon="chama" title="Rodada relâmpago" subtitle={`${ROUND} questões rápidas dos capítulos que você já começou`} />
      {!done && qs[i] && (
        <>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-1.5">
              {qs.map((q, k) => (
                <span key={q.id} className={`h-2.5 flex-1 rounded-full transition-colors ${k < i ? 'bg-ok' : k === i ? 'bg-ember' : 'bg-raised'}`} />
              ))}
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white transition ${combo >= 2 ? 'anim-hop' : ''}`}
              style={{ background: combo ? '#1f5c45' : 'rgb(var(--muted))' }}
              aria-label={`Sequência de ${combo} acertos`}
            >
              <Icon name="chama" size={14} strokeWidth={2.2} /> x{combo}
            </span>
          </div>
          <QuestionCard
            key={qs[i].id}
            question={qs[i]}
            onAnswer={(sel) => {
              const q = qs[i];
              const ok = sel === q.answer;
              update((d) => recordAnswer(d, q, sel, 'practice', 'relampago').data);
              setHits((h) => h + (ok ? 1 : 0));
              setCombo((c) => {
                const n = ok ? c + 1 : 0;
                setBest((b) => Math.max(b, n));
                return n;
              });
            }}
            nextLabel={i + 1 < qs.length ? 'Próxima' : 'Ver resultado'}
            onNext={() => {
              const last = i + 1 >= qs.length;
              setI(i + 1);
              window.scrollTo(0, 0);
              if (last) {
                sfx('done');
                if (hits >= 4) confetti(hits === ROUND ? 120 : 60);
              }
            }}
          />
        </>
      )}
      {done && (
        <section className="card space-y-4 p-5 text-center">
          <div className="flex items-end justify-center gap-2">
            <Mascot mood={hits >= 4 ? 'cheer' : hits >= 2 ? 'talk' : 'sad'} size={92} />
            <SpeechBubble className="anim-toast-in mb-8 max-w-[14rem] text-left">
              {hits === ROUND ? 'Rodada perfeita! Raio certeiro.' : hits >= 3 ? 'Boa rodada! Mais uma?' : 'Os erros já foram para a revisão. Vamos de novo?'}
            </SpeechBubble>
          </div>
          <p className="font-display text-5xl">
            {hits}/{qs.length}
          </p>
          <p className="text-sm text-muted">Melhor sequência: {best} acerto(s) seguido(s)</p>
          <div className="flex gap-2">
            <button type="button" className="btn-primary flex-1" onClick={restart}>
              <Icon name="chama" size={18} strokeWidth={2.2} /> Nova rodada
            </button>
            <Link to="/treino" className="btn-ghost flex-1">
              Treino
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
