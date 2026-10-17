// Diário de pistas: cada lição concluída revela a próxima pista do mistério da Névoa.
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { clues } from '@/content/game/story';
import { PageHeader } from '@/components/Page';
import { MascotSays } from '@/components/Mascot';
import { Icon } from '@/components/Icon';
import { cluesRevealed } from '@/lib/game';
import { totalUnits } from '@/content';

export function DiaryPage() {
  const { data } = useStudy();
  const revealed = cluesRevealed(Object.keys(data.lessons).length, totalUnits, clues.length);
  return (
    <div className="space-y-5">
      <PageHeader area="reino" icon="pergaminho" title="Diário de pistas" subtitle={`${revealed} de ${clues.length} pistas sobre a Névoa`} />
      <MascotSays mood={revealed === clues.length ? 'cheer' : 'think'} size={72}>
        {revealed === 0
          ? 'O diário ainda está em branco. Pratique um trecho e a primeira pista aparece.'
          : revealed === clues.length
            ? 'O mistério está todo diante de você. Falta só o Grande Exame.'
            : 'Cada trecho praticado e cada desafio vencido aproximam a próxima pista. Quem será que alimenta a névoa?'}
      </MascotSays>
      <ol className="space-y-2">
        {clues.slice(0, revealed).map((c, i) => (
          <li key={i} className="manuscript anim-tile-in px-4 py-3" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
            <p className="font-serif text-[1.02rem] leading-relaxed">{c}</p>
          </li>
        ))}
        {revealed === clues.length && (
          <li className="shine relative overflow-hidden rounded-[1.8rem] p-5 text-center text-white shadow-[var(--shadow-lift)]" style={{ background: 'linear-gradient(140deg, #c2571f, #7a2e10)' }}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-85">Fim do diário</p>
            <p className="mt-1 font-display text-2xl">O Grande Exame aguarda</p>
            <p className="mt-2 text-sm opacity-90">Você reuniu todas as pistas. Agora a névoa só se vence no dia da prova: mantenha a revisão em dia e faça a prova completa no simulado.</p>
            <Link to="/simulado" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#7a2e10]">
              <Icon name="relogio" size={16} strokeWidth={2.2} /> Ir ao simulado
            </Link>
          </li>
        )}
        {revealed < clues.length && (
          <li className="flex items-center gap-3 rounded-2xl border border-dashed border-line p-4 text-muted">
            <Icon name="chave" size={20} />
            <span className="flex-1 text-sm">
              {clues.length - revealed} pista(s) ainda sob a névoa. <Link to="/biblioteca" className="font-semibold text-gold">Fazer uma lição</Link>
            </span>
          </li>
        )}
      </ol>
    </div>
  );
}
