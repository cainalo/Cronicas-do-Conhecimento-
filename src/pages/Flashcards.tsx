import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { flashcards, getChapter, getFlashcard } from '@/content';
import { dueCards, reviewCard, type Grade } from '@/lib/training';
import { PageHeader } from '@/components/Page';

const grades: { g: Grade; label: string; hint: string }[] = [
  { g: 'errei', label: 'Errei', hint: 'volta em minutos' },
  { g: 'dificil', label: 'Difícil', hint: 'intervalo curto' },
  { g: 'bom', label: 'Bom', hint: 'intervalo normal' },
  { g: 'facil', label: 'Fácil', hint: 'intervalo longo' },
];

function when(days: number) {
  if (days <= 0) return 'em 10 minutos';
  if (days < 1.5) return 'amanhã';
  return `em ${Math.round(days)} dias`;
}

export function FlashcardsPage() {
  const { data, update } = useStudy();
  // A fila da sessão é congelada ao abrir; cartões errados voltam ao fim da fila.
  const [queue, setQueue] = useState<string[]>(() => dueCards(data, flashcards.map((f) => f.id)));
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(0);
  const [last, setLast] = useState<string>();
  const total = useMemo(() => queue.length + done, [queue.length, done]);

  const id = queue[0];
  const card = id ? getFlashcard(id) : undefined;

  const grade = (g: Grade) => {
    if (!id) return;
    // Prévia calculada fora do atualizador de estado (que pode rodar depois).
    const preview = reviewCard(data, id, g).state.intervalDays;
    update((d) => reviewCard(d, id, g).data);
    setLast(`Próxima revisão ${when(preview)}.`);
    setShown(false);
    setQueue((q) => (g === 'errei' ? [...q.slice(1), q[0]] : q.slice(1)));
    if (g !== 'errei') setDone((n) => n + 1);
  };

  return (
    <div className="space-y-5">
      <PageHeader area="treino" icon="cartas" title="Flashcards" subtitle="Termos dos glossários com repetição espaçada" />
      {!card ? (
        <div className="card space-y-2 p-5 text-center">
          <h2 className="text-xl">Nada para hoje</h2>
          <p>Os cartões voltam na data certa para a revisão. Novos cartões entram à medida que os capítulos são escritos.</p>
          <Link to="/treino" className="btn-ghost mt-2">
            Voltar
          </Link>
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-muted">
            Cartão {Math.min(done + 1, total)} de {total} · {getChapter(card.chapterId)?.title}
          </p>
          <section className="manuscript flex min-h-[16rem] flex-col items-center justify-center gap-4 px-5 py-8 text-center">
            <p className="rubric text-sm font-semibold">Frente</p>
            <p className="text-2xl leading-snug">{card.front}</p>
            {shown && (
              <>
                <div className="divider-ornament !my-1 w-full" aria-hidden>
                  ❧
                </div>
                <p className="rubric text-sm font-semibold">Verso</p>
                <p className="text-[1.15rem] leading-relaxed">{card.back}</p>
              </>
            )}
          </section>
          {!shown ? (
            <button className="btn-primary w-full" onClick={() => setShown(true)}>
              Revelar o verso
            </button>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {grades.map((x) => (
                <button key={x.g} className={x.g === 'bom' ? 'btn-primary flex-col !gap-0 !px-1' : 'btn-ghost flex-col !gap-0 !px-1'} onClick={() => grade(x.g)}>
                  <span>{x.label}</span>
                  <span className="font-serif text-[0.7rem] opacity-80">{x.hint}</span>
                </button>
              ))}
            </div>
          )}
          {last && <p className="text-center text-sm text-muted">{last}</p>}
          <p className="text-center text-xs text-muted">
            Seja honesto na nota: ela define quando o cartão volta. Um cartão chega ao domínio quando o intervalo passa de 21 dias.
          </p>
        </>
      )}
    </div>
  );
}
