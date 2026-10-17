import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, questionsForContest } from '@/content';
import { reviewQueue } from '@/lib/study';
import { activeExam, dueCards } from '@/lib/training';

export function TrainingPage() {
  const { data } = useStudy();
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const wrong = reviewQueue(data, bank).length;
  const due = dueCards(data, flashcards.map((f) => f.id)).length;
  const exam = activeExam(data);
  const finishedExams = Object.values(data.exams).filter((e) => e.finishedAt).length;
  const essaysDone = essayPrompts.filter((p) => data.essays[p.id]?.submittedAt).length;

  const items = [
    {
      to: '/revisao',
      title: 'Revisão de erros',
      text: 'Questões cuja última resposta foi errada, até você acertá-las.',
      status: wrong ? `${wrong} aguardando` : 'nenhuma pendente',
      hot: wrong > 0,
    },
    {
      to: '/flashcards',
      title: 'Flashcards',
      text: 'Termos dos glossários com repetição espaçada: o cartão volta quando você está prestes a esquecê-lo.',
      status: due ? `${due} para hoje` : 'em dia',
      hot: due > 0,
    },
    {
      to: '/simulado',
      title: 'Simulado',
      text: 'Questões sorteadas, sem correção imediata, com tempo opcional e boletim ao final.',
      status: exam ? 'um simulado em andamento' : finishedExams === 1 ? '1 concluído' : `${finishedExams} concluídos`,
      hot: !!exam,
    },
    {
      to: '/discursiva',
      title: 'Estudo de caso',
      text: 'Prática da prova discursiva: escreva a solução, compare com a orientação e o modelo comentado.',
      status: `${essaysDone} de ${essayPrompts.length} entregues`,
      hot: false,
    },
  ];

  return (
    <div className="space-y-5">
      <header className="text-center">
        <h1 className="text-4xl">Exercitia</h1>
        <p className="font-display text-muted">o campo de treino do aprendiz</p>
      </header>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="card block p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xl">{i.title}</h2>
                <span className={`shrink-0 text-sm italic ${i.hot ? 'rubric' : 'text-muted'}`}>{i.status}</span>
              </div>
              <p className="mt-1">{i.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
