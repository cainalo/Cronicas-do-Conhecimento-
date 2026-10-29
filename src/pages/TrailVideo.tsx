import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curatedVideos, trailPlaceOf } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';
import { useCheckpoint } from '@/app/useCheckpoint';

const watchedKey = (id: string) => 'cronicas:video-visto:' + id;
const notesKey = (id: string) => 'cronicas:video-notas:' + id;
const summaryKey = (id: string) => 'cronicas:video-resumo:' + id;
const momentsKey = (id: string) => 'cronicas:video-momentos:' + id;
const checklistKey = (id: string) => 'cronicas:video-checklist:' + id;
type VideoMoment = { id: string; time: string; text: string };
type VideoChecklist = { objective: boolean; example: boolean; recall: boolean };
type Panel = 'resumo' | 'anotacoes' | 'ferramentas';

function readLocal(key: string, fallback: string) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function readJson<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; } catch { return fallback; }
}
function timeInSeconds(value: string): number {
  const parts = value.trim().split(':').map(Number);
  if (!parts.length || parts.some((part) => !Number.isFinite(part) || part < 0)) return 0;
  return parts.length === 1 ? parts[0] : parts.reduce((total, part) => total * 60 + part, 0);
}
function timestampUrl(url: string, time: string) {
  try {
    const out = new URL(url);
    out.searchParams.set('t', String(timeInSeconds(time)));
    return out.toString();
  } catch { return url; }
}

export function TrailVideoPage() {
  const { id = '' } = useParams();
  const checkpoint = useCheckpoint();
  const video = curatedVideos.find((item) => item.id === id);
  if (!video) return <section className="card space-y-3 p-5">
    <h1 className="text-xl">Videoaula não encontrada</h1>
    <p className="text-sm text-muted">O vídeo pode ter sido removido do catálogo.</p>
    <Link to="/trilha" className="btn-primary w-full">Voltar para a trilha</Link>
  </section>;
  return <VideoStudyPage key={video.id} video={video} checkpointTo={checkpoint.to} />;
}

function VideoStudyPage({ video, checkpointTo }: { video: (typeof curatedVideos)[number]; checkpointTo: string }) {
  const place = video.lessonId ? trailPlaceOf(video.lessonId) : undefined;
  const [panel, setPanel] = useState<Panel>('resumo');
  const [watched, setWatched] = useState(() => readLocal(watchedKey(video.id), 'false') === 'true');
  const [notes, setNotes] = useState(() => readLocal(notesKey(video.id), ''));
  const [summary, setSummary] = useState(() => readLocal(summaryKey(video.id), video.objective));
  const [moments, setMoments] = useState<VideoMoment[]>(() => readJson(momentsKey(video.id), []));
  const [timeDraft, setTimeDraft] = useState('00:00');
  const [momentDraft, setMomentDraft] = useState('');
  const [checklist, setChecklist] = useState<VideoChecklist>(() => readJson(checklistKey(video.id), { objective: false, example: false, recall: false }));
  const [copied, setCopied] = useState(false);

  useEffect(() => { try { localStorage.setItem(notesKey(video.id), notes); } catch { /* mantém as notas enquanto a página estiver aberta */ } }, [video.id, notes]);
  useEffect(() => { try { localStorage.setItem(summaryKey(video.id), summary); } catch { /* mantém o resumo enquanto a página estiver aberta */ } }, [video.id, summary]);
  useEffect(() => { try { localStorage.setItem(momentsKey(video.id), JSON.stringify(moments)); } catch { /* armazenamento local opcional */ } }, [video.id, moments]);
  useEffect(() => { try { localStorage.setItem(checklistKey(video.id), JSON.stringify(checklist)); } catch { /* armazenamento local opcional */ } }, [video.id, checklist]);

  const toggleWatched = () => {
    const next = !watched;
    setWatched(next);
    try { localStorage.setItem(watchedKey(video.id), String(next)); } catch { /* estado visual local */ }
  };
  const addMoment = () => {
    const text = momentDraft.trim();
    if (!text || !/^\d{1,2}:\d{2}$/.test(timeDraft.trim())) return;
    const seconds = Number(timeDraft.trim().split(':')[1]);
    if (seconds > 59) return;
    setMoments((old) => [...old, { id: String(Date.now()), time: timeDraft.trim(), text }].sort((a, b) => timeInSeconds(a.time) - timeInSeconds(b.time)));
    setMomentDraft('');
  };
  const copyStudyNotes = async () => {
    const text = [video.title, '', 'Resumo', summary, '', 'Anotações', notes, '', 'Pontos do vídeo', ...moments.map((m) => `[${m.time}] ${m.text}`)].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch { setCopied(false); }
  };
  const toggleChecklist = (key: keyof VideoChecklist) => setChecklist((old) => ({ ...old, [key]: !old[key] }));
  const completedChecks = Object.values(checklist).filter(Boolean).length;

  return <div className="space-y-4 pb-5">
    <PageHeader area="grimorios" title="Videoaula" subtitle={video.objective} />
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="min-w-0 space-y-3" aria-label="Player da videoaula">
        <VideoEmbed url={video.url} title={video.title} meta={[video.channel, video.duration].filter(Boolean).join(' · ')} autoLoad autoPlay />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={toggleWatched} aria-pressed={watched} className={watched ? 'btn-ghost !min-h-[42px] border-ok/50 text-ok' : 'btn-primary !min-h-[42px]'}>
            <Icon name={watched ? 'certo' : 'play'} size={17}/>{watched ? 'Videoaula assistida' : 'Marcar como assistida'}
          </button>
          <span className="text-xs text-muted">{completedChecks}/3 etapas de revisão</span>
        </div>
        {video.status === 'a-conferir' && <p className="flex items-start gap-1.5 rounded-xl border border-gold/40 bg-gold/5 p-3 text-sm text-muted">
          <Icon name="aviso" size={16} className="mt-0.5 shrink-0 text-gold"/>Este vídeo ainda precisa de conferência humana. Valide o canal, o título e o conteúdo com a aula em texto.
        </p>}
        {place && <Link to={place.to} className="btn-ghost w-full text-sm"><Icon name="livro" size={16}/>Rever a aula em texto: {place.label}</Link>}
      </section>

      <aside className="min-w-0 overflow-hidden rounded-2xl border border-line bg-surface" aria-label="Ferramentas da videoaula">
        <div className="grid grid-cols-3 border-b border-line" role="tablist" aria-label="Painéis da videoaula">
          {([['resumo','Resumo'],['anotacoes','Anotações'],['ferramentas','Ferramentas']] as [Panel,string][]).map(([key,label]) =>
            <button key={key} role="tab" aria-selected={panel === key} className={panel === key ? 'border-b-2 border-gold px-2 py-3 text-xs font-semibold text-ink' : 'px-2 py-3 text-xs text-muted'} onClick={() => setPanel(key)}>{label}</button>
          )}
        </div>
        {panel === 'resumo' && <section className="space-y-3 p-4" role="tabpanel" aria-label="Resumo da videoaula">
          <div><p className="kicker">GUIA DE ESTUDO</p><h2 className="mt-1 font-title text-xl">Resumo da aula</h2></div>
          <p className="text-sm leading-relaxed text-muted">O objetivo informado para este vídeo é:</p>
          <p className="rounded-lg bg-raised/50 p-3 text-sm leading-relaxed">{video.objective}</p>
          <label className="block text-sm font-semibold" htmlFor="video-summary">Meu resumo</label>
          <textarea id="video-summary" className="input min-h-36 w-full resize-y" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Registre com suas palavras as ideias principais…"/>
          <p className="text-xs text-muted">Salvo neste aparelho. Este campo é seu resumo de estudo, não uma transcrição automática do YouTube.</p>
        </section>}
        {panel === 'anotacoes' && <section className="space-y-3 p-4" role="tabpanel" aria-label="Anotações da videoaula">
          <div><p className="kicker">SEU CADERNO</p><h2 className="mt-1 font-title text-xl">Anotações da videoaula</h2></div>
          <textarea className="input min-h-36 w-full resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Registre uma ideia importante, um exemplo ou uma dúvida para rever depois…" aria-label="Anotações da videoaula"/>
          <p className="text-xs text-muted">As anotações são salvas automaticamente neste aparelho.</p>
          <div className="space-y-2 border-t border-line pt-3">
            <h3 className="font-semibold">Marcar um momento</h3>
            <p className="text-xs text-muted">Crie um marcador com o tempo do vídeo, por exemplo 03:25.</p>
            <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
              <input className="input" value={timeDraft} onChange={(e) => setTimeDraft(e.target.value)} aria-label="Tempo do vídeo" placeholder="03:25"/>
              <input className="input" value={momentDraft} onChange={(e) => setMomentDraft(e.target.value)} aria-label="Nota deste momento" placeholder="O que acontece aqui?" maxLength={300}/>
            </div>
            <button className="btn-primary w-full" onClick={addMoment} disabled={!momentDraft.trim() || !/^\d{1,2}:\d{2}$/.test(timeDraft.trim())}>Adicionar marcador</button>
            {moments.length > 0 && <ul className="space-y-2">{moments.map((moment) => <li key={moment.id} className="rounded-lg border border-line p-3">
              <div className="flex items-start gap-2"><a className="shrink-0 font-semibold text-gold underline" href={timestampUrl(video.url, moment.time)} target="_blank" rel="noreferrer">{moment.time}</a><p className="min-w-0 flex-1 text-sm">{moment.text}</p><button className="text-xs text-muted underline" onClick={() => setMoments((old) => old.filter((m) => m.id !== moment.id))} aria-label={`Remover marcador ${moment.time}`}>Remover</button></div>
            </li>)}</ul>}
          </div>
        </section>}
        {panel === 'ferramentas' && <section className="space-y-4 p-4" role="tabpanel" aria-label="Ferramentas de revisão">
          <div><p className="kicker">DEPOIS DE ASSISTIR</p><h2 className="mt-1 font-title text-xl">Checklist de revisão</h2></div>
          {([
            ['objective','Consigo explicar o objetivo da aula.'],
            ['example','Identifiquei um exemplo ou aplicação.'],
            ['recall','Consigo lembrar as ideias sem olhar as notas.'],
          ] as [keyof VideoChecklist,string][]).map(([key,label]) => <label key={key} className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-[rgb(var(--gold))]" checked={checklist[key]} onChange={() => toggleChecklist(key)}/>
            <span>{label}</span>
          </label>)}
          <div className="rounded-lg bg-raised/50 p-3"><p className="text-sm font-semibold">{completedChecks === 3 ? 'Revisão concluída' : `Você concluiu ${completedChecks} de 3 itens`}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full bg-gold transition-[width]" style={{ width: (completedChecks / 3 * 100) + '%' }}/></div></div>
          <button className="btn-ghost w-full" onClick={() => void copyStudyNotes()}><Icon name="fita" size={16}/>{copied ? 'Notas copiadas' : 'Copiar resumo e anotações'}</button>
          <p className="text-xs text-muted">O navegador pode pedir permissão para copiar ao clipboard.</p>
        </section>}
      </aside>
    </div>

    <div className="grid gap-2 sm:grid-cols-2">
      <Link to={checkpointTo} className="btn-primary w-full">Seguir na trilha <Icon name="avancar" size={16}/></Link>
      <Link to="/trilha" className="btn-ghost w-full">Voltar para a trilha</Link>
    </div>
  </div>;
}
