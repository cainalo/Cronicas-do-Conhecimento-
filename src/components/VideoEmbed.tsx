import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';

/** Identificador do vídeo em endereços do YouTube (watch, youtu.be, embed, shorts e live). */
export function youTubeId(url: string): string | undefined {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\.|^m\./, '');
    let id: string | null | undefined;
    if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
    }
    return id && /^[\w-]{11}$/.test(id) ? id : undefined;
  } catch {
    return undefined;
  }
}

export function VideoEmbed({
  url, title, meta, autoLoad = false, autoPlay = false,
}: {
  url: string;
  title: string;
  meta?: string;
  /** Carrega o player ao abrir o componente, sem exigir toque no pôster. */
  autoLoad?: boolean;
  /** Tenta iniciar o vídeo automaticamente. O player fica mudo para respeitar as políticas dos navegadores. */
  autoPlay?: boolean;
}) {
  const id = youTubeId(url);
  const [on, setOn] = useState(autoLoad);
  useEffect(() => setOn(autoLoad), [id, autoLoad]);

  const query = new URLSearchParams({ rel: '0', playsinline: '1', controls: '1' });
  if (autoPlay) {
    query.set('autoplay', '1');
    query.set('mute', '1');
  }

  return (
    <figure className="card overflow-hidden">
      {id && on ? (
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={'https://www.youtube-nocookie.com/embed/' + id + '?' + query.toString()}
            title={title}
            loading={autoLoad ? 'eager' : 'lazy'}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : id ? (
        <button
          type="button"
          onClick={() => setOn(true)}
          className="grid aspect-video w-full place-items-center bg-raised text-ink transition hover:bg-surface"
          aria-label={'Carregar o vídeo: ' + title}
        >
          <span className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ember text-white">
              <Icon name="play" size={26} fill="currentColor" />
            </span>
            <span className="text-sm font-semibold">Carregar o vídeo</span>
            <span className="text-xs text-muted">
              {typeof navigator !== 'undefined' && navigator.onLine === false
                ? 'Sem internet agora: o vídeo precisa de conexão. As aulas em texto funcionam sem rede.'
                : 'O vídeo será carregado quando você tocar.'}
            </span>
          </span>
        </button>
      ) : (
        <div className="grid aspect-video place-items-center bg-raised px-4 text-center text-sm text-muted">
          Este endereço não parece ser um vídeo do YouTube compatível.
        </div>
      )}
      <figcaption className="p-3">
        <p className="font-semibold leading-snug">{title}</p>
        {meta && <p className="text-sm text-muted">{meta}</p>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold underline-offset-2 hover:underline"
        >
          Abrir no YouTube <Icon name="seta" size={14} />
        </a>
        {autoPlay && on && (
          <p className="mt-1 text-xs text-muted">
            O início automático depende do navegador e da conexão. O vídeo é iniciado sem som; use os controles para ativar o áudio.
          </p>
        )}
      </figcaption>
    </figure>
  );
}
