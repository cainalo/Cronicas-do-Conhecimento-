import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curatedVideos, getChapter, trailPlaceOf } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { Markdown } from '@/components/Markdown';
import { useCheckpoint } from '@/app/useCheckpoint';

const WATCHED_KEY = 'cronicas:videos-vistos';
function storedNotes(key: string): string { try { return typeof localStorage === 'undefined' ? '' : localStorage.getItem(key) ?? ''; } catch { return ''; } }
function isWatched(id: string): boolean { try { const v: unknown = JSON.parse(localStorage.getItem(WATCHED_KEY) ?? '[]'); return Array.isArray(v) && v.includes(id); } catch { return false; } }
function saveWatched(id: string, next: boolean) { try { const v: unknown = JSON.parse(localStorage.getItem(WATCHED_KEY) ?? '[]'); const ids = new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []); if (next) ids.add(id); else ids.delete(id); localStorage.setItem(WATCHED_KEY, JSON.stringify(Array.from(ids))); } catch { /* o estado visual segue funcionando */ } }

export function TrailVideoPage() {
 const { id = '' } = useParams();
 const checkpoint = useCheckpoint();
 const video = curatedVideos.find((item) => item.id === id);
 if (!video) return <p>Vídeo não encontrado.</p>;
 return <TrailVideoDetail key={video.id} video={video} checkpointTo={checkpoint.to} />;
}
function TrailVideoDetail({ video, checkpointTo }: { video: (typeof curatedVideos)[number]; checkpointTo: string }) {
 const place = video.lessonId ? trailPlaceOf(video.lessonId) : undefined;
 const chapter = getChapter(video.chapterId);
 const section = chapter?.sections.find((item) => item.id === video.sectionId);
 const notesKey = 'cronicas:video-notas:' + video.id;
 const [notes, setNotes] = useState(() => storedNotes(notesKey));
 const [watched, setWatched] = useState(() => isWatched(video.id));
 const [panel, setPanel] = useState<'resumo' | 'anotacoes' | 'ferramentas'>('resumo');
 const [timestamp, setTimestamp] = useState('00:00');
 const [reflection, setReflection] = useState('');
 useEffect(() => { try { localStorage.setItem(notesKey, notes); } catch { /* armazenamento local opcional */ } }, [notesKey, notes]);
 const summary = useMemo(() => [
   'Objetivo: ' + video.objective,
   section ? 'Trecho relacionado: ' + section.title.replace(/^\\d+\\.\\s*/, '') : '',
   'Ao assistir, anote um conceito, um exemplo concreto e uma dúvida para revisar.'
 ].filter(Boolean), [video.objective, section]);
 const toggleWatched = () => { const next = !watched; setWatched(next); saveWatched(video.id, next); };
 const insertTimestamp = () => { const mark = '[' + (timestamp.trim() || '00:00') + '] '; setNotes((value) => (value ? value + '\\n' : '') + mark); setPanel('anotacoes'); };
 const generateSummary = () => { setNotes((value) => (value ? value + '\\n\\n' : '') + '# ' + video.title + '\\n\\n' + summary.join('\\n\\n') + (section?.body ? '\\n\\n## Para aprofundar\\n' + section.body : '')); setPanel('anotacoes'); };
 const downloadSummary = () => { const text = '# ' + video.title + '\\n\\n' + summary.join('\\n\\n') + '\\n\\n## Minhas anotações\\n\\n' + notes; const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'anotacoes-' + video.id + '.md'; a.click(); URL.revokeObjectURL(url); };
 return <div className="space-y-4">
  <PageHeader area="grimorios" title="Videoaula" subtitle={video.objective}/>
  <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]">
   <section className="min-w-0 space-y-3" aria-label="Player da videoaula">
    <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="kicker">{video.channel === 'Não conferido' ? 'Canal ainda não conferido' : video.channel}</p><h1 className="mt-1 font-title text-2xl leading-tight">{video.title}</h1><p className="mt-1 text-sm text-muted">{video.duration ? video.duration + ' · ' : ''}Vídeo no formato horizontal · YouTube</p></div><button type="button" onClick={toggleWatched} aria-pressed={watched} className={watched ? 'btn-ghost !min-h-[42px] border-ok/50 text-ok' : 'btn-primary !min-h-[42px]'}><Icon name={watched ? 'certo' : 'play'} size={17}/>{watched ? 'Assistida' : 'Marcar como assistida'}</button></div>
    <VideoEmbed url={video.url} title={video.title} meta={video.channel + (video.duration ? ' · ' + video.duration : '')} autoLoad autoPlay/>
    <p className="flex items-start gap-1.5 text-xs text-muted"><Icon name="play" size={14} className="mt-0.5 shrink-0"/>O player mantém proporção 16:9 e permite tela cheia pelos controles do YouTube.</p>
    {video.status === 'a-conferir' && <p className="rounded-xl border border-gold/40 bg-gold/5 p-3 text-sm text-muted"><Icon name="aviso" size={16} inline/> Este vídeo ainda precisa de conferência humana de título, canal e aderência ao objetivo.</p>}
   </section>
   <aside className="card min-w-0 overflow-hidden" aria-label="Ferramentas da videoaula">
    <div className="grid grid-cols-3 border-b border-line bg-raised/40 p-1">{([{id:'resumo',label:'Resumo'},{id:'anotacoes',label:'Anotações'},{id:'ferramentas',label:'Ferramentas'}] as const).map((item) => <button key={item.id} type="button" onClick={() => setPanel(item.id)} aria-pressed={panel === item.id} className={panel === item.id ? 'rounded-lg bg-surface px-1 py-2 text-xs font-semibold shadow-sm' : 'rounded-lg px-1 py-2 text-xs text-muted'}>{item.label}</button>)}</div>
    <div className="space-y-3 p-3 sm:p-4">
     {panel === 'resumo' && <><h2 className="font-title text-xl">O que observar</h2><p className="text-sm leading-relaxed">{video.objective}</p><ul className="space-y-2">{summary.map((line) => <li key={line} className="flex gap-2 text-sm"><Icon name="certo" size={16} className="mt-0.5 shrink-0 text-ok"/><span>{line}</span></li>)}</ul><button className="btn-primary w-full text-sm" type="button" onClick={generateSummary}>Criar resumo nas minhas notas</button>{section && <details className="rounded-xl border border-line p-3"><summary className="cursor-pointer text-sm font-semibold">Abrir trecho de referência</summary><div className="prose-content mt-3 text-sm"><Markdown>{section.body}</Markdown></div></details>}</>}
     {panel === 'anotacoes' && <><h2 className="font-title text-xl">Meu caderno</h2><p className="text-xs text-muted">Salvo automaticamente neste aparelho. Use uma marca temporal para localizar um momento do vídeo depois.</p><label className="block"><span className="text-sm font-semibold">Minhas anotações</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={8} placeholder="Conceito, exemplo, dúvida…" aria-label="Anotações desta videoaula" className="input mt-1 min-h-40 w-full resize-y"/></label><div className="flex gap-2"><label className="min-w-0 flex-1"><span className="text-xs text-muted">Tempo (mm:ss)</span><input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="input mt-1 w-full" aria-label="Tempo da marca temporal" placeholder="02:14"/></label><button type="button" onClick={insertTimestamp} className="btn-ghost self-end text-sm">Inserir marca</button></div><button type="button" onClick={downloadSummary} className="btn-ghost w-full text-sm"><Icon name="baixar" size={16}/> Baixar resumo e notas (.md)</button></>}
     {panel === 'ferramentas' && <><h2 className="font-title text-xl">Fixar a aprendizagem</h2><div className="rounded-xl bg-raised/45 p-3"><p className="text-sm font-semibold">Teste de 1 minuto</p><p className="mt-1 text-sm">Sem voltar o vídeo, escreva qual foi a ideia mais importante e por que ela importa.</p><textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={3} className="input mt-2 w-full" placeholder="Minha resposta…" aria-label="Reflexão rápida"/><button type="button" className="btn-ghost mt-2 w-full text-sm" onClick={() => setNotes((value) => value + (value ? '\\n\\n' : '') + 'Reflexão rápida: ' + reflection)}>Guardar reflexão nas notas</button></div>{place && <Link to={place.to} className="btn-ghost w-full text-sm"><Icon name="livro" size={16}/> Rever a aula em texto: {place.label}</Link>}<button type="button" onClick={generateSummary} className="btn-ghost w-full text-sm">Montar resumo a partir do material disponível</button></>}
     <div className="grid gap-2"><Link to={checkpointTo} className="btn-primary w-full">Seguir na trilha <Icon name="avancar" size={16}/></Link><Link to="/trilha" className="btn-ghost w-full">Ver toda a trilha</Link></div>
    </div>
   </aside>
  </div>
 </div>;
}
