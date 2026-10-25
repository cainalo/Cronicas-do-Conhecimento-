import { useStudy } from '@/app/StudyProvider';
import { DEFAULT_CONTEST_ID, essayPrompts, flashcards, questionsForContest } from '@/content';
import { reviewQueue } from '@/lib/study';
import { activeExam, dueCards } from '@/lib/training';
import { isDone } from '@/lib/planner';
import { usePlanOfToday } from '@/app/usePlanOfToday';
import { areaColor } from '@/app/areas';
import { PageHeader, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';
import { SceneBanner } from '@/components/SceneBanner';

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
  const shades = dark ? ['#889eff', '#5ec8c0', '#f5a868', '#c4acf5', '#70ce98', '#a3afc1'] : ['#4258cd', '#127672', '#a85314', '#704eb6', '#1e704a', '#526072'];

  return (
    <div className="space-y-6">
      <PageHeader area="treino" crumb={false} title="Revisar e praticar" subtitle="Revisões, flashcards, questões, simulados e discursivas" />
      <SceneBanner scene="treino" dark={dark} mood={wrong ? 'think' : 'talk'}>
        {wrong
          ? `${wrong} questão(ões) esperam revanche na revisão de erros.`
          : due
            ? `${due} cartões querem ser lembrados hoje.`
            : 'Tudo em dia. Que tal um simulado para medir forças?'}
      </SceneBanner>

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
          <Tile to="/relampago" icon="chama" color={dark ? '#f5a868' : '#a85314'} title="Rodada relâmpago" text="5 questões rápidas, com sequência de acertos." />
          <Tile to="/revisao" icon="ampulheta" color={shades[1]} title="Revisão de erros" text="Questões erradas voltam até você acertar." badge={wrong ? `${wrong}` : undefined} />
          <Tile wide to="/flashcards" icon="cartas" color={shades[2]} title="Flashcards" text="Repetição espaçada dos glossários." badge={due ? `${due} hoje` : undefined} />
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
