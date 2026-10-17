import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, questionsForContest } from '@/content';
import { reviewQueue } from '@/lib/study';
import { activeExam, dueCards } from '@/lib/training';
import { isDone } from '@/lib/planner';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor } from '@/app/areas';
import { PageHeader, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';

export function TrainingPage() {
  const { data } = useStudy();
  const dark = useIsDark();
  const color = areaColor('treino', dark);
  const bank = questionsForContest(DEFAULT_CONTEST_ID);
  const wrong = reviewQueue(data, bank).length;
  const due = dueCards(data, flashcards.map((f) => f.id)).length;
  const exam = activeExam(data);
  const finishedExams = Object.values(data.exams).filter((e) => e.finishedAt).length;
  const essaysDone = essayPrompts.filter((p) => data.essays[p.id]?.submittedAt).length;
  const { plan } = usePlanOfToday();
  const done = plan.items.filter((i) => isDone(i, data, plan.day)).length;

  // Tons vizinhos da cor da área, para diferenciar os cartões sem sair da família.
  const shades = dark ? ['#e8b13b', '#ef7a5a', '#f0c25e', '#6aa6e6', '#78b873', '#c9a27a'] : ['#a8740c', '#c2571f', '#b8860b', '#3b6fb0', '#4a7f46', '#8a6a48'];

  return (
    <div className="space-y-6">
      <PageHeader area="treino" crumb={false} title="Treino" subtitle="Praticar, revisar e testar o que foi estudado" />

      <section>
        <SectionTitle icon="calendario" color={color}>
          Hoje
        </SectionTitle>
        <TileGrid>
          <Tile
            wide
            to="/plano"
            icon="calendario"
            color={shades[0]}
            title="Ordem do dia"
            text={plan.restDay ? 'Hoje é dia de descanso. Volte amanhã ou estude livremente.' : 'Atividades do dia montadas a partir do seu histórico e do tempo disponível.'}
            badge={plan.restDay ? 'descanso' : `${done} de ${plan.items.length}`}
          />
          <Tile to="/revisao" icon="ampulheta" color={shades[1]} title="Revisão de erros" text="Questões erradas voltam até você acertar." badge={wrong ? `${wrong}` : undefined} />
          <Tile to="/flashcards" icon="cartas" color={shades[2]} title="Flashcards" text="Repetição espaçada dos glossários." badge={due ? `${due} hoje` : undefined} />
        </TileGrid>
      </section>

      <section>
        <SectionTitle icon="relogio" color={color}>
          Formato da prova
        </SectionTitle>
        <TileGrid>
          <Tile
            to="/simulado"
            icon="relogio"
            color={shades[3]}
            title="Simulado"
            text="Questões sorteadas, com tempo e boletim."
            badge={exam ? 'em andamento' : finishedExams ? `${finishedExams} feito(s)` : undefined}
          />
          <Tile to="/discursiva" icon="pena" color={shades[4]} title="Estudo de caso" text="Prática da prova discursiva." badge={`${essaysDone}/${essayPrompts.length}`} />
          <Tile to="/historico" icon="lista" color={shades[5]} title="Histórico" text="Todas as respostas, com a correção." />
        </TileGrid>
      </section>
    </div>
  );
}
