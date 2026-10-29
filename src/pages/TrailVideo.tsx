import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curatedVideos, trailPlaceOf } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { useCheckpoint } from '@/app/useCheckpoint';
const WATCHED_KEY='cronicas:videos-vistos';
function storedNotes(key:string):string{try{return typeof localStorage==='undefined'?'':localStorage.getItem(key)??'';}catch{return '';}}
function isWatched(id:string):boolean{try{const value:unknown=JSON.parse(localStorage.getItem(WATCHED_KEY)??'[]');return Array.isArray(value)&&value.includes(id);}catch{return false;}}
export function TrailVideoPage(){
 const {id=''}=useParams();const checkpoint=useCheckpoint();const video=curatedVideos.find(item=>item.id===id);
 if(!video)return <p>Vídeo não encontrado.</p>;
 return <TrailVideoDetail key={video.id} video={video} checkpointTo={checkpoint.to}/>;
}
function TrailVideoDetail({video,checkpointTo}:{video:(typeof curatedVideos)[number];checkpointTo:string}){
 const place=video.lessonId?trailPlaceOf(video.lessonId):undefined;
 const notesKey='cronicas:video-notas:'+video.id;
 const [notes,setNotes]=useState(()=>storedNotes(notesKey));const [watched,setWatched]=useState(()=>isWatched(video.id));
 useEffect(()=>{try{localStorage.setItem(notesKey,notes);}catch{/* armazenamento local opcional */}},[notesKey,notes]);
 const toggleWatched=()=>{const next=!watched;setWatched(next);try{const raw:unknown=JSON.parse(localStorage.getItem(WATCHED_KEY)??'[]');const ids=new Set(Array.isArray(raw)?raw.filter((v):v is string=>typeof v==='string'):[]);if(next)ids.add(video.id);else ids.delete(video.id);localStorage.setItem(WATCHED_KEY,JSON.stringify(Array.from(ids)));}catch{/* estado visual local */}};
 return <div className="space-y-4">
  <PageHeader area="grimorios" title="Videoaula" subtitle={video.objective}/>
  <section className="space-y-3" aria-label="Player da videoaula">
   <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="kicker">{video.channel==='Não conferido'?'Canal ainda não conferido':video.channel}</p><h1 className="mt-1 font-title text-2xl leading-tight">{video.title}</h1><p className="mt-1 text-sm text-muted">{video.duration?video.duration+' · ':''}Reprodução no YouTube</p></div>
   <button type="button" onClick={toggleWatched} aria-pressed={watched} className={watched?'btn-ghost !min-h-[42px] border-ok/50 text-ok':'btn-primary !min-h-[42px]'}><Icon name={watched?'certo':'play'} size={17}/>{watched?'Assistida':'Marcar como assistida'}</button></div>
   <VideoEmbed url={video.url} title={video.title} meta={video.channel+(video.duration?' · '+video.duration:'')} autoLoad autoPlay/>
   <p className="flex items-start gap-1.5 text-xs text-muted"><Icon name="play" size={14} className="mt-0.5 shrink-0"/>O player tenta começar automaticamente, sem som. Use os controles do YouTube para ativar o áudio; algumas configurações do navegador podem bloquear a reprodução automática.</p>
   {video.status==='a-conferir'&&<p className="flex items-start gap-1.5 rounded-xl border border-gold/40 bg-gold/5 p-3 text-sm text-muted"><Icon name="aviso" size={16} className="mt-0.5 shrink-0 text-gold"/>Este vídeo veio de uma busca e ainda não foi conferido por uma pessoa. Confira se o título, o canal e o conteúdo correspondem ao objetivo da aula.</p>}
  </section>
  <section className="card space-y-3 p-4" aria-label="Ferramentas de estudo"><div><p className="kicker">ROTEIRO DE ESTUDO</p><h2 className="mt-1 text-xl">O que observar</h2><p className="mt-1 text-sm leading-relaxed">{video.objective}</p></div>
   <label className="block"><span className="text-sm font-semibold">Minhas anotações</span><textarea value={notes} onChange={event=>setNotes(event.target.value)} rows={4} placeholder="Registre conceitos, exemplos ou dúvidas para revisar depois…" aria-label="Anotações desta videoaula" className="input mt-1 min-h-24 w-full resize-y"/><span className="mt-1 block text-xs text-muted">Salvas automaticamente neste aparelho.</span></label>
   {place&&<Link to={place.to} className="btn-ghost w-full text-sm"><Icon name="livro" size={16}/>Rever a aula em texto: {place.label}</Link>}
   <div className="grid gap-2 sm:grid-cols-2"><Link to={checkpointTo} className="btn-primary w-full">Seguir na trilha <Icon name="avancar" size={16}/></Link><Link to="/trilha" className="btn-ghost w-full">Ver toda a trilha</Link></div>
  </section>
 </div>;
}