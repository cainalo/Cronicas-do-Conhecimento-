import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curatedVideos, trailPlaceOf } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { useCheckpoint } from '@/app/useCheckpoint';

const watchedKey = (id: string) => 'cronicas:video-visto:' + id;
const notesKey = (id: string) => 'cronicas:video-notas:' + id;

function readLocal(key: string, fallback: string) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

export function TrailVideoPage() {
  const { id = '' } = useParams();
  const checkpoint = useCheckpoint();
  const v = curatedVideos.find((x) => x.id === id);
  const [watched, setWatched] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!v) return;
    setWatched(readLocal(watchedKey(v.id), 'false') === 'true');
    setNotes(readLocal(notesKey(v.id), ''));
  }, [v?.id]);

  useEffect(() => {
    if (!v) return;
    try { localStorage.setItem(notesKey(v.id), notes); } catch { /* notas ficam nesta sessão sem armazenamento */ }
  }, [v?.id, notes]);

  if (!v) {
    return (
      <section className="card space-y-3 p-5">
        <h1 className="text-xl">Videoaula não encontrada</h1>
        <p className="text-sm text-muted">O vídeo pode ter sido removido do catálogo.</p>
        <Link to="/trilha" className="btn-primary w-full">Voltar à trilha</Link>
      </section>
    );
  }

  const place = v.lessonId ? trailPlaceOf(v.lessonId) : undefined;
  const markWatched = () => {
    const next = !watched;
    setWatched(next);
    try { localStorage.setItem(watchedKey(v.id), String(next)); } catch { /* aula segue acessível */ }
  };

  return (
    <div className="space-y-4 pb-4">
      <PageHeader area="grimorios" title="Videoaula" subtitle={v.objective} />
      <section className="space-y-3">
        <VideoEmbed
          url={v.url}
          title={v.title}
          meta={[v.channel, v.duration].filter(Boolean).join(' · ')}
          autoLoad
          autoPlay
        />
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold" aria-hidden="true">
            <Icon name="livro" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold">Objetivo desta aula</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{v.objective}</p>
          </div>
        </div>
      </section>

      {v.status === 'a-conferir' && (
        <p className="flex items-start gap-1.5 rounded-xl border border-line p-3 text-xs text-muted">
          <Icon name="aviso" size={14} className="mt-0.5 shrink-0" />
          Este vídeo foi encontrado por busca e ainda não foi conferido por uma pessoa. Use-o como complemento e valide o conteúdo com a aula em texto.
        </p>
      )}

      <section className="card space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="kicker">Acompanhamento</p>
            <h2 className="mt-1 text-lg">Sua sessão de estudo</h2>
          </div>
          <span className={watched ? 'rounded-full bg-ok/10 px-3 py-1 text-xs font-semibold text-ok' : 'rounded-full bg-raised px-3 py-1 text-xs font-semibold text-muted'}>
            {watched ? 'Marcada como vista' : 'Em andamento'}
          </span>
        </div>
        <p className="text-sm text-muted">Ao terminar, marque o vídeo como visto para organizar sua revisão. Essa marcação fica salva neste aparelho.</p>
        <button type="button" className={watched ? 'btn-ghost w-full' : 'btn-primary w-full'} onClick={markWatched}>
          <Icon name={watched ? 'voltar' : 'certo'} size={16} />
          {watched ? 'Desmarcar como visto' : 'Marcar vídeo como visto'}
        </button>
      </section>

      <section className="card space-y-2 p-4">
        <label htmlFor="video-notes" className="font-semibold">Anotações da videoaula</label>
        <p className="text-sm text-muted">Registre uma ideia importante, um exemplo ou uma dúvida para rever depois. As notas são salvas automaticamente neste aparelho.</p>
        <textarea
          id="video-notes"
          className="min-h-28 w-full resize-y rounded-xl border border-line bg-bg p-3 text-sm outline-none focus:border-gold"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Ex.: A diferença central entre os conceitos é..."
          rows={4}
        />
      </section>

      <section className="space-y-2" aria-label="Próximos passos">
        {place && (
          <Link to={place.to} className="btn-ghost w-full text-sm">
            <Icon name="livro" size={16} /> Rever a aula em texto: {place.label}
          </Link>
        )}
        <Link to={checkpoint.to} className="btn-primary w-full">
          Seguir na trilha <Icon name="avancar" size={16} />
        </Link>
        <Link to="/trilha" className="btn-ghost w-full">Voltar para a trilha</Link>
      </section>
    </div>
  );
}
