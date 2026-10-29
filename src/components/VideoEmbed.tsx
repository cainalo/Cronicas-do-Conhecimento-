import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
export function youTubeId(url: string): string | undefined {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\.|^m\./, '');
    let id: string | null | undefined;
    if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
    return id && /^[\w-]{11}$/.test(id) ? id : undefined;
  } catch { return undefined; }
}
export function VideoEmbed({url,title,meta,autoLoad=false,autoPlay=false}:{url:string;title:string;meta?:string;autoLoad?:boolean;autoPlay?:boolean}) {
  const id=youTubeId(url);
  const [on,setOn]=useState(autoLoad);
  useEffect(()=>setOn(autoLoad),[url,autoLoad]);
  return <figure className="card overflow-hidden">
    {id&&on ? <div className="relative aspect-video w-full bg-black"><iframe className="absolute inset-0 h-full w-full" src={'https://www.youtube-nocookie.com/embed/'+id+(autoPlay?'?rel=0&autoplay=1&mute=1&playsinline=1':'?rel=0')} title={title} loading={autoLoad?'eager':'lazy'} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div>
    : id ? <button type="button" onClick={()=>setOn(true)} className="grid aspect-video w-full place-items-center bg-raised text-ink transition hover:bg-surface" aria-label={'Carregar o vídeo: '+title}>
      <span className="flex flex-col items-center gap-2 px-4 text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-ember text-white"><Icon name="play" size={26} fill="currentColor"/></span><span className="text-sm font-semibold">Carregar o vídeo</span><span className="text-xs text-muted">{typeof navigator!=='undefined'&&navigator.onLine===false?'Sem internet agora: o vídeo precisa de conexão. As aulas em texto funcionam sem rede.':'O vídeo será carregado ao tocar; abra a página dedicada para início automático.'}</span></span>
    </button> : null}
    <figcaption className="p-3"><p className="font-semibold leading-snug">{title}</p>{meta&&<p className="text-sm text-muted">{meta}</p>}<a href={url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold underline-offset-2 hover:underline">{id?'Não abriu? Ver no site original':'Abrir no site original'} <Icon name="seta" size={14}/></a></figcaption>
  </figure>;
}