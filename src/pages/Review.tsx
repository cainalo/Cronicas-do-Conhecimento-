import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, questionsForContest } from '@/content';
import { QuestionCard } from '@/components/QuestionCard';
import { attemptsFor, recordAnswer, reviewQueue } from '@/lib/study';

export function ReviewPage() {
  const { data, update } = useStudy();
  // A fila é congelada ao abrir a sessão, para não mudar enquanto se responde.
  const [queueIds, setQueueIds] = useState<string[] | null>(null);
  const [i, setI] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const bank = useMemo(() => questionsForContest(DEFAULT_CONTEST_ID), []);
  const live = reviewQueue(data, bank);

  if (!queueIds) {
    return (
      <div className="space-y-4">
        <h1 className="text-center text-4xl">Revisão</h1>
        {live.length === 0 ? (
          <p className="card p-4 text-muted">Nenhuma questão errada aguardando revisão. Quando você errar, ela aparecerá aqui até ser respondida corretamente.</p>
        ) : (
          <>
            <p className="text-muted">
              {live.length} questão(ões) cuja última resposta foi errada. Responda de novo; acertando, ela sai da fila.
            </p>
            <button className="btn-primary w-full" onClick={() => setQueueIds(live.map((q) => q.id))}>
              Começar revisão
            </button>
            <ul className="space-y-2">
              {live.map((q) => (
                <li key={q.id} className="card p-3 text-sm">
                  {q.stem.slice(0, 110)}…
                  <span className="block text-xs text-muted">Errada {attemptsFor(data, q.id).filter((a) => !a.isCorrect).length}×</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <Link to="/historico" className="btn-ghost w-full">
          Ver histórico completo
        </Link>
      </div>
    );
  }

  if (i >= queueIds.length) {
    return (
      <div className="card space-y-3 p-5 text-center">
        <h1 className="text-center text-4xl">Revisão concluída</h1>
        <p>
          Recuperadas: {recovered} de {queueIds.length}
        </p>
        <button
          className="btn-primary w-full"
          onClick={() => {
            setQueueIds(null);
            setI(0);
            setRecovered(0);
          }}
        >
          Voltar
        </button>
      </div>
    );
  }

  const q = bank.find((x) => x.id === queueIds[i])!;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Revisão {i + 1} de {queueIds.length}
      </p>
      <QuestionCard
        key={q.id}
        question={q}
        onAnswer={(sel) => {
          if (sel === q.answer) setRecovered((r) => r + 1);
          update((d) => recordAnswer(d, q, sel, 'review', undefined).data);
        }}
        onNext={() => {
          setI(i + 1);
          window.scrollTo(0, 0);
        }}
        nextLabel={i + 1 < queueIds.length ? 'Próxima' : 'Concluir'}
      />
    </div>
  );
}
