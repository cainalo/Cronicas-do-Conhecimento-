// Videoaula encaixada na trilha: o vídeo (só carrega ao tocar, sem autoplay), o que ele ajuda a
// aprender, o aviso quando ainda não foi conferido, e o caminho de volta para a aula e para a trilha.
import { Link, useParams } from 'react-router-dom';
import { curatedVideos, trailPlaceOf } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { useCheckpoint } from '@/app/useCheckpoint';

export function TrailVideoPage() {
  const { id = '' } = useParams();
  const checkpoint = useCheckpoint();
  const v = curatedVideos.find((x) => x.id === id);
  if (!v) return <p>Vídeo não encontrado.</p>;
  const place = v.lessonId ? trailPlaceOf(v.lessonId) : undefined;
  return (
    <div className="space-y-4">
      <PageHeader area="grimorios" title="Videoaula" subtitle={v.objective} />
      <VideoEmbed url={v.url} title={v.title} meta={`${v.channel}${v.duration ? ` · ${v.duration}` : ''}`} />
      {v.status === 'a-conferir' && (
        <p className="flex items-start gap-1.5 text-xs text-muted">
          <Icon name="aviso" size={14} className="mt-0.5 shrink-0" /> Vídeo encontrado por busca e ainda não conferido por uma pessoa: confira se o conteúdo bate com a aula.
        </p>
      )}
      {place && (
        <Link to={place.to} className="btn-ghost w-full text-sm">
          <Icon name="livro" size={16} /> Rever a aula em texto: {place.label}
        </Link>
      )}
      <Link to={checkpoint.to} className="btn-primary w-full">
        Seguir na trilha <Icon name="avancar" size={16} />
      </Link>
    </div>
  );
}
