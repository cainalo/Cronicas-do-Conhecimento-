import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, questionsForContest } from '@/content';
import { reviewQueue } from '@/lib/study';
import { activeExam, dueCards } from '@/lib/training';
import { Icon, type IconName } from '@/components/Icon';

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
      icon: 'ampulheta' as IconName,
      tint: 'bg-ember/15 text-ember',
      title: 'Revisão de erros',
      text: 'Questões cuja última resposta foi errada, até você acertá-las.',
      status: wrong ? `${wrong} aguardando` : 'nenhuma pendente',
      hot: wrong > 0,
    },
    {
      to: '/flashcards',
      icon: 'grimorio' as IconName,
      tint: 'bg-gold/15 text-gold',
      title: 'Flashcards',
      text: 'Termos dos glossários com repetição espaçada: o cartão volta quando você está prestes a esquecê-lo.',
      status: due ? `${due} para hoje` : 'em dia',
      hot: due > 0,
    },
    {
      to: '/simulado',
      icon: 'selo' as IconName,
      tint: 'bg-azure/20 text-[#9ab4e6]',
      title: 'Simulado',
      text: 'Questões sorteadas, sem correção imediata, com tempo opcional e boletim ao final.',
      status: exam ? 'um simulado em andamento' : finishedExams === 1 ? '1 concluído' : `${finishedExams} concluídos`,
      hot: !!exam,
    },
    {
      to: '/discursiva',
      icon: 'pena' as IconName,
      tint: 'bg-ok/15 text-ok',
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
      <ul className="stagger space-y-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="card flex items-start gap-4 p-4">
              <span className={`icon-tile ${i.tint}`}>
                <Icon name={i.icon} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-base font-bold">{i.title}</span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${i.hot ? 'bg-ember/15 text-ember' : 'bg-raised text-muted'}`}>{i.status}</span>
                </span>
                <span className="mt-1 block text-[0.95rem] text-muted">{i.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
