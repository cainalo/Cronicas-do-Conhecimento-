// Diário de pistas: cada lição concluída revela a próxima pista do mistério da Névoa.
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { clues } from '@/content/game/story';
import { PageHeader } from '@/components/Page';
import { MascotSays } from '@/components/Mascot';
import { Icon } from '@/components/Icon';

export function DiaryPage() {
  const { data } = useStudy();
  const revealed = Math.min(clues.length, Object.keys(data.lessons).length);
  return (
    <div className="space-y-5">
      <PageHeader area="reino" icon="pergaminho" title="Diário de pistas" subtitle={`${revealed} de ${clues.length} pistas sobre a Névoa`} />
      <MascotSays mood={revealed === clues.length ? 'cheer' : 'think'} size={72}>
        {revealed === 0
          ? 'O diário ainda está em branco. Conclua uma lição e a primeira pista aparece.'
          : revealed === clues.length
            ? 'O mistério está todo diante de você. Falta só o Grande Exame.'
            : 'Cada lição concluída revela uma nova pista. Quem será que alimenta a névoa?'}
      </MascotSays>
      <ol className="space-y-2">
        {clues.slice(0, revealed).map((c, i) => (
          <li key={i} className="manuscript anim-tile-in px-4 py-3" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
            <p className="font-serif text-[1.02rem] leading-relaxed">{c}</p>
          </li>
        ))}
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
