import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { getQuestion } from '@/content';
import { Icon } from '@/components/Icon';

type Filter = 'todas' | 'certas' | 'erradas';

export function HistoryPage() {
  const { data } = useStudy();
  const [filter, setFilter] = useState<Filter>('todas');
  const pending = useMemo(() => new Set(data.pending.attempts), [data.pending.attempts]);
  const list = [...data.attempts]
    .sort((a, b) => b.answeredAt.localeCompare(a.answeredAt))
    .filter((a) => filter === 'todas' || (filter === 'certas' ? a.isCorrect : !a.isCorrect));
  const ctx = { lesson: 'Lição', review: 'Revisão', practice: 'Prática', exam: 'Simulado' } as const;

  return (
    <div className="space-y-4">
      <Link to="/progresso" className="text-sm text-muted">
        Voltar ao progresso
      </Link>
      <h1 className="text-center text-4xl">Histórico de questões</h1>
      <div className="flex gap-2" role="tablist">
        {(['todas', 'certas', 'erradas'] as Filter[]).map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'btn-primary flex-1' : 'btn-ghost flex-1'} onClick={() => setFilter(f)}>
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="text-muted">Nenhuma resposta registrada ainda.</p>}
      <ul className="space-y-2">
        {list.map((a) => {
          const q = getQuestion(a.questionId);
          return (
            <li key={a.id} className="card p-3 text-sm">
              <details>
                <summary className="cursor-pointer list-none">
                  <Icon name={a.isCorrect ? 'certo' : 'errado'} size={16} className={`mr-1 inline align-[-2px] ${a.isCorrect ? 'text-ok' : 'text-bad'}`} /> {q ? q.stem.slice(0, 90) + '…' : a.questionId}
                  <span className="mt-1 block text-xs text-muted">
                    {new Date(a.answeredAt).toLocaleString('pt-BR')} · {ctx[a.context]} · marcou {a.selectedOption}
                    {q && ` · gabarito ${q.answer}`} · {pending.has(a.id) ? 'pendente de envio' : 'salvo no servidor'}
                  </span>
                </summary>
                {q && (
                  <div className="mt-2 space-y-2">
                    <p className="rounded bg-raised p-2">{q.explanation}</p>
                    <Link to={`/capitulo/${q.chapterId}#${q.sectionId}`} className="rubric underline">
                      Estudar no grimório
                    </Link>
                  </div>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
