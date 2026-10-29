import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { teachers, teacherPosts, type FictionalTeacher } from '@/content/teachers';
import { Icon } from '@/components/Icon';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { PageHeader } from '@/components/Page';

type CommunityPost = {
  id: string; teacherId: string; title: string; body: string; publishedAt: string;
  kind: 'teacher' | 'member'; image?: string; likes: number; comments: { author: string; text: string }[];
};
type LocalPost = CommunityPost & { liked?: boolean };
const STORAGE = 'portico:sala-social:v1';
const MUSIC = ['Lo-fi para concentrar · instrumental', 'Jazz de biblioteca · instrumental', 'Piano de fim de tarde · instrumental', 'Batida leve para estudar · instrumental'];
const STORY_COPY: Record<string, string[]> = {
  'prof.clara': ['Uma questão de porcentagem pode ser uma história sobre uma promoção.', 'Meu desafio de hoje: explique a regra sem usar a fórmula.'],
  'prof.lia': ['Dica de laboratório: antes de encerrar um processo, descubra o que ele está fazendo.', 'Terminal aberto, café ao lado e uma pergunta: o que mudou desde o último comando?'],
  'prof.davi': ['A internet não é uma nuvem mágica: são redes, rotas e acordos.', 'Curiosidade de rede: o DNS é como uma agenda de contatos distribuída.'],
  'prof.iara': ['Segurança começa com boas perguntas, não com medo.', 'Antes de confiar num link, confira o domínio e o contexto.'],
};
function readPosts(): LocalPost[] {
  try { return JSON.parse(localStorage.getItem(STORAGE) ?? '[]') as LocalPost[]; } catch { return []; }
}
function teacherFor(id: string): FictionalTeacher { return teachers.find((t) => t.id === id) ?? teachers[0]; }
function relativeLabel(date: string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  return days === 0 ? 'hoje' : days === 1 ? 'ontem' : `há ${days} dias`;
}
export function SocialFeedPage() {
  const [localPosts, setLocalPosts] = useState<LocalPost[]>(readPosts);
  const [draft, setDraft] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [filter, setFilter] = useState<'todos' | 'professores' | 'comunidade'>('todos');
  const [story, setStory] = useState<FictionalTeacher | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [playingMusic, setPlayingMusic] = useState(false);
  const teacherFeed: LocalPost[] = teacherPosts.map((p) => ({
    id: p.id, teacherId: p.teacherId, title: p.title, body: p.body,
    publishedAt: p.publishedAt, kind: 'teacher', likes: 12 + p.title.length * 3,
    comments: [{ author: teacherFor(p.teacherId).name, text: 'Guarde esta ideia para usar no próximo exercício.' }],
  }));
  const feed = useMemo(() => [...teacherFeed, ...localPosts].filter((p) =>
    filter === 'todos' || (filter === 'professores' ? p.kind === 'teacher' : p.kind === 'member')
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()), [teacherFeed, localPosts, filter]);
  const persist = (next: LocalPost[]) => {
    setLocalPosts(next);
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); } catch { /* o feed continua funcionando nesta sessão */ }
  };
  const publish = () => {
    const body = draft.trim();
    if (!body && !image) return;
    const post: LocalPost = {
      id: `membro-${Date.now()}`, teacherId: 'member', title: 'Uma publicação da comunidade',
      body, publishedAt: new Date().toISOString(), kind: 'member', image, likes: 0, comments: [],
    };
    persist([post, ...localPosts]); setDraft(''); setImage(undefined);
  };
  const chooseImage = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 2_000_000) { alert('Escolha uma imagem de até 2 MB para manter o feed leve.'); return; }
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };
  const toggleLike = (id: string) => persist(localPosts.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: Math.max(0, p.likes + (p.liked ? -1 : 1)) } : p));
  const addComment = (id: string) => {
    if (!comment.trim()) return;
    persist(localPosts.map((p) => p.id === id ? { ...p, comments: [...p.comments, { author: 'Você', text: comment.trim() }] } : p));
    setComment(''); setCommentsFor(null);
  };
  const storyItems = STORY_COPY[story?.id ?? ''] ?? [];
  return <div className="mx-auto max-w-2xl space-y-5 pb-8">
    <PageHeader area="explorar" title="Sala dos Professores" subtitle="Ideias, bastidores e descobertas da comunidade Pórtico." />
    <section className="card p-4">
      <div className="flex gap-4 overflow-x-auto pb-1" aria-label="Stories dos professores">
        {teachers.map((t, i) => <button key={t.id} className="flex w-[76px] shrink-0 flex-col items-center gap-2 text-center" onClick={() => { setStory(t); setStoryIndex(0); setPlayingMusic(false); }}>
          <span className="rounded-full bg-gradient-to-br from-[#d4a017] via-[#c8402a] to-[#6b3a6e] p-[3px]"><span className="block rounded-full bg-surface p-[2px]"><TeacherAvatar t={t} size={54}/></span></span>
          <span className="w-full truncate text-xs">{t.name.replace('Professora ', '').replace('Professor ', '')}</span>
          <span className="text-[10px] text-muted">Story</span>
        </button>)}
      </div>
    </section>
    <section className="card space-y-3 p-4" aria-label="Criar publicação">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg text-xs font-bold">Você</span><span className="font-semibold">Compartilhe uma descoberta</span></div>
      <textarea className="input min-h-24 resize-y" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Uma dúvida, uma curiosidade ou algo que você aprendeu hoje…" maxLength={1200}/>
      {image && <div className="relative"><img src={image} alt="Prévia da imagem da publicação" className="max-h-64 w-full rounded-xl object-cover"/><button className="btn-ghost mt-2" onClick={() => setImage(undefined)}>Remover imagem</button></div>}
      <div className="flex flex-wrap items-center gap-2">
        <label className="btn-ghost cursor-pointer text-sm"><Icon name="livro" size={16}/> Adicionar foto<input type="file" accept="image/*" className="sr-only" onChange={(e) => chooseImage(e.target.files?.[0])}/></label>
        <span className="flex-1"/>
        <button className="btn-primary" onClick={publish} disabled={!draft.trim() && !image}>Publicar</button>
      </div>
      <p className="text-xs text-muted">As publicações deste protótipo ficam salvas neste aparelho. Ainda não são compartilhadas entre contas.</p>
    </section>
    <div className="flex gap-2" aria-label="Filtrar feed">
      {(['todos','professores','comunidade'] as const).map((f) => <button key={f} className={filter === f ? 'btn-primary flex-1 text-sm' : 'btn-ghost flex-1 text-sm'} onClick={() => setFilter(f)}>{f === 'todos' ? 'Para você' : f === 'professores' ? 'Professores' : 'Comunidade'}</button>)}
    </div>
    <div className="space-y-4">
      {feed.map((p) => {
        const isMember = p.kind === 'member'; const t = isMember ? null : teacherFor(p.teacherId);
        return <article key={p.id} className="card overflow-hidden p-0">
          <header className="flex items-center gap-3 p-4">
            {t ? <button onClick={() => { setStory(t); setStoryIndex(0); }}><TeacherAvatar t={t} size={44}/></button> : <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bg text-xs font-bold">Você</span>}
            <div className="min-w-0 flex-1"><p className="truncate font-semibold">{t?.name ?? 'Você'} <span className="text-xs font-normal text-muted">{t ? '@'+t.handle : '@comunidade'}</span></p><p className="text-xs text-muted">{t?.expertiseLabel ?? 'Comunidade Pórtico'} · {relativeLabel(p.publishedAt)}</p></div>
            {t && <span className="rounded-full bg-gold/10 px-2 py-1 text-xs text-gold">Professor</span>}
          </header>
          <div className="space-y-2 px-4 pb-4"><h2 className="font-title text-xl">{p.title}</h2><p className="whitespace-pre-wrap text-sm leading-relaxed">{p.body}</p></div>
          {p.image && <img src={p.image} alt="Imagem compartilhada pela comunidade" className="max-h-[28rem] w-full object-cover"/>}
          <footer className="flex flex-wrap items-center gap-2 border-t border-line p-3">
            <button className={p.liked ? 'btn-primary text-sm' : 'btn-ghost text-sm'} onClick={() => isMember ? toggleLike(p.id) : setLocalPosts((old) => old)}><Icon name="coracao" size={16}/> {p.likes + (p.liked ? 0 : 0)} · Curtir</button>
            <button className="btn-ghost text-sm" onClick={() => setCommentsFor(commentsFor === p.id ? null : p.id)}><Icon name="balao" size={16}/> Comentar ({p.comments.length})</button>
            <span className="flex-1"/>
            <button className="btn-ghost text-sm" onClick={() => navigator.clipboard?.writeText(p.title + '\n' + p.body)}><Icon name="fita" size={16}/> Copiar</button>
          </footer>
          {p.comments.length > 0 && <div className="space-y-2 px-4 pb-3">{p.comments.slice(-3).map((c,i) => <p key={i} className="rounded-lg bg-raised/60 px-3 py-2 text-sm"><strong>{c.author}</strong> {c.text}</p>)}</div>}
          {commentsFor === p.id && <div className="flex gap-2 px-4 pb-4"><input className="input min-w-0 flex-1" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escreva um comentário…" maxLength={400}/><button className="btn-primary" onClick={() => addComment(p.id)}>Enviar</button></div>}
        </article>;
      })}
      {feed.length === 0 && <div className="card p-6 text-center text-sm text-muted">Ainda não há publicações neste filtro.</div>}
    </div>
    {story && <div className="fixed inset-0 z-[90] flex flex-col bg-[#0f4c5c] p-4 text-[#f7eedf]" role="dialog" aria-modal="true" aria-label={`Stories de ${story.name}`}>
      <div className="flex gap-1">{storyItems.map((_,i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= storyIndex ? 'bg-[#f7eedf]' : 'bg-[#f7eedf]/30'}`}/>)}</div>
      <header className="flex items-center gap-3 py-4"><TeacherAvatar t={story} size={42}/><div className="flex-1"><p className="font-semibold">{story.name}</p><p className="text-xs opacity-70">@{story.handle}</p></div><button onClick={() => setStory(null)} aria-label="Fechar stories"><Icon name="errado" size={24}/></button></header>
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#164e63] via-[#2c6870] to-[#6b3a6e] p-6">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[22px] border-white/10"/><div className="absolute -bottom-10 -left-8 h-40 w-40 rotate-12 rounded-3xl bg-[#d4a017]/30"/>
        <p className="relative text-xs uppercase tracking-[.2em] opacity-70">Caderno de {story.name.split(' ').at(-1)}</p>
        <p className="relative mt-6 font-title text-3xl leading-tight">{storyItems[storyIndex]}</p>
        <div className="relative mt-8 rounded-xl border border-white/20 bg-black/15 p-3"><p className="text-xs">Trilha sonora sugerida</p><p className="mt-1 text-sm">{MUSIC[(teachers.findIndex((x) => x.id === story.id) + storyIndex) % MUSIC.length]}</p><button className="mt-2 rounded-full border border-white/30 px-3 py-1 text-xs" onClick={() => setPlayingMusic(!playingMusic)}>{playingMusic ? 'Pausar indicação musical' : 'Selecionar música'}</button><p className="mt-1 text-[10px] opacity-60">A plataforma sugere uma faixa; não reproduz áudio protegido.</p></div>
        <p className="relative mt-4 text-xs opacity-80">Perfil fictício · conteúdo demonstrativo</p>
      </div>
      <div className="flex gap-3 py-4"><button className="btn-ghost flex-1 border-white/30 text-[#f7eedf]" onClick={() => setStoryIndex(Math.max(0, storyIndex-1))} disabled={storyIndex===0}>Anterior</button><button className="btn-primary flex-1" onClick={() => storyIndex+1 < storyItems.length ? setStoryIndex(storyIndex+1) : setStory(null)}>{storyIndex+1 < storyItems.length ? 'Próximo story' : 'Concluir'}</button></div>
    </div>}
    <div className="text-center text-xs text-muted"><Link to="/trilha" className="underline">Voltar à trilha</Link> · Feed de demonstração com personagens fictícios</div>
  </div>;
}
