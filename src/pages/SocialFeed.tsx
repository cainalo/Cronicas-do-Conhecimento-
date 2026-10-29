import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { teachers, teacherPosts, type FictionalTeacher } from '@/content/teachers';
import { Icon } from '@/components/Icon';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { PageHeader } from '@/components/Page';
import { Markdown } from '@/components/Markdown';
import { VideoEmbed, youTubeId } from '@/components/VideoEmbed';

type CommunityPost = {
  id: string; teacherId: string; title: string; body: string; publishedAt: string;
  kind: 'teacher' | 'member'; image?: string; images?: string[]; videoUrl?: string; likes: number; comments: { author: string; text: string }[];
};
type LocalPost = CommunityPost & { liked?: boolean };
const STORAGE = 'portico:sala-social:v1';
const MUSIC = ['Lo-fi para concentrar · instrumental', 'Jazz de biblioteca · instrumental', 'Piano de fim de tarde · instrumental', 'Batida leve para estudar · instrumental'];
const STORY_LINKS: Record<string, { label: string; url: string }> = {
  'prof.clara': { label: 'Explore porcentagens com exemplos', url: 'https://pt.khanacademy.org/math/arithmetic/arith-review-percentages' },
  'prof.lia': { label: 'Manual do comando top', url: 'https://man7.org/linux/man-pages/man1/top.1.html' },
  'prof.davi': { label: 'Leia a especificação do DNS', url: 'https://www.rfc-editor.org/rfc/rfc1034' },
  'prof.iara': { label: 'Veja os riscos OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
};
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
  const [images, setImages] = useState<string[]>([]);
  const [videoUrlDraft, setVideoUrlDraft] = useState('');
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'todos' | 'professores' | 'comunidade'>('todos');
  const [story, setStory] = useState<FictionalTeacher | null>(null);
  const [profile, setProfile] = useState<FictionalTeacher | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [playingMusic, setPlayingMusic] = useState(false);
  const [teacherLikes, setTeacherLikes] = useState<Record<string, boolean>>({});
  const [teacherComments, setTeacherComments] = useState<Record<string, { author: string; text: string }[]>>({});
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
    const videoUrl = videoUrlDraft.trim();
    if (videoUrl && !youTubeId(videoUrl)) {
      setMediaError('Use um link válido do YouTube para anexar um vídeo.');
      return;
    }
    if (!body && images.length === 0 && !videoUrl) return;
    const post: LocalPost = {
      id: `membro-${Date.now()}`, teacherId: 'member', title: 'Uma publicação da comunidade',
      body, publishedAt: new Date().toISOString(), kind: 'member', images, videoUrl: videoUrl || undefined, likes: 0, comments: [],
    };
    persist([post, ...localPosts]); setDraft(''); setImages([]); setVideoUrlDraft(''); setMediaError(null);
  };
  const chooseImages = async (files?: FileList | null) => {
    if (!files?.length) return;
    const chosen = Array.from(files);
    if (chosen.some((file) => !file.type.startsWith('image/'))) {
      setMediaError('Selecione somente arquivos de imagem.');
      return;
    }
    if (chosen.length > 3) {
      setMediaError('O carrossel aceita até três imagens por publicação.');
      return;
    }
    if (chosen.reduce((sum, file) => sum + file.size, 0) > 1_500_000) {
      setMediaError('As imagens devem somar até 1,5 MB para caber no armazenamento local.');
      return;
    }
    try {
      const dataUrls = await Promise.all(chosen.map((file) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error ?? new Error('Não foi possível ler a imagem.'));
        reader.readAsDataURL(file);
      })));
      setImages(dataUrls);
      setMediaError(null);
    } catch {
      setMediaError('Não foi possível ler uma das imagens. Tente outro arquivo.');
    }
  };
  const toggleLike = (id: string) => persist(localPosts.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: Math.max(0, p.likes + (p.liked ? -1 : 1)) } : p));
  const addComment = (id: string, isMember: boolean) => {
    if (!comment.trim()) return;
    const item = { author: 'Você', text: comment.trim() };
    if (isMember) persist(localPosts.map((p) => p.id === id ? { ...p, comments: [...p.comments, item] } : p));
    else setTeacherComments((old) => ({ ...old, [id]: [...(old[id] ?? []), item] }));
    setComment(''); setCommentsFor(null);
  };
  const storyItems = STORY_COPY[story?.id ?? ''] ?? [];
  return <div className="mx-auto max-w-2xl space-y-5 pb-8">
    <PageHeader area="explorar" title="Sala dos Professores" subtitle="Ideias, bastidores e descobertas da comunidade Pórtico." />
    <section className="card p-4">
      <div className="flex gap-4 overflow-x-auto pb-1" aria-label="Stories dos professores">
        {teachers.map((t) => <button key={t.id} className="flex w-[76px] shrink-0 flex-col items-center gap-2 text-center" onClick={() => { setStory(t); setStoryIndex(0); setPlayingMusic(false); }}>
          <span className="rounded-full bg-gradient-to-br from-[#d4a017] via-[#c8402a] to-[#6b3a6e] p-[3px]"><span className="block rounded-full bg-surface p-[2px]"><TeacherAvatar t={t} size={54}/></span></span>
          <span className="w-full truncate text-xs">{t.name.replace('Professora ', '').replace('Professor ', '')}</span>
          <span className="text-[10px] text-muted">Story</span>
        </button>)}
      </div>
    </section>
    <section className="card space-y-3 p-4" aria-label="Criar publicação">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg text-xs font-bold">Você</span><span className="font-semibold">Compartilhe uma descoberta</span></div>
      <textarea className="input min-h-24 resize-y" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Uma dúvida, uma curiosidade ou algo que você aprendeu hoje…" maxLength={1200}/>
      {images.length > 0 && <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">{images.map((src, index) => <img key={src.slice(0, 48) + index} src={src} alt={'Prévia da imagem ' + (index + 1)} className="max-h-48 w-full rounded-xl border border-line object-cover"/>)}</div>
        <p className="text-xs text-muted">Carrossel com {images.length} imagem(ns).</p>
        <button className="btn-ghost text-sm" onClick={() => setImages([])}>Remover imagens</button>
      </div>}
      <label className="block text-sm"><span className="font-semibold">Vídeo do YouTube (opcional)</span><input type="url" className="input mt-1 w-full" value={videoUrlDraft} onChange={(e) => { setVideoUrlDraft(e.target.value); setMediaError(null); }} placeholder="https://www.youtube.com/watch?v=…"/></label>
      {mediaError && <p role="alert" className="text-sm text-bad">{mediaError}</p>}
      <div className="flex flex-wrap items-center gap-2">
        <label className="btn-ghost cursor-pointer text-sm"><Icon name="livro" size={16}/> Adicionar até 3 fotos<input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { void chooseImages(e.target.files); e.currentTarget.value = ''; }}/></label>
        <span className="flex-1"/>
        <button className="btn-primary" onClick={publish} disabled={!draft.trim() && images.length === 0 && !videoUrlDraft.trim()}>Publicar</button>
      </div>
      <p className="text-xs text-muted">As publicações deste protótipo ficam salvas neste aparelho. Ainda não são compartilhadas entre contas.</p>
    </section>
    <div className="flex gap-2" aria-label="Filtrar feed">
      {(['todos','professores','comunidade'] as const).map((f) => <button key={f} className={filter === f ? 'btn-primary flex-1 text-sm' : 'btn-ghost flex-1 text-sm'} onClick={() => setFilter(f)}>{f === 'todos' ? 'Para você' : f === 'professores' ? 'Professores' : 'Comunidade'}</button>)}
    </div>
    <div className="space-y-4">
      {feed.map((p) => {
        const isMember = p.kind === 'member'; const t = isMember ? null : teacherFor(p.teacherId);
        return <article key={p.id} className="card overflow-hidden p-0" aria-label={p.title}>
          <header className="flex items-center gap-3 p-4">
            {t ? <button onClick={() => setProfile(t)} aria-label={'Ver perfil de ' + t.name}><TeacherAvatar t={t} size={44}/></button> : <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bg text-xs font-bold">Você</span>}
            <div className="min-w-0 flex-1"><p className="truncate font-semibold">{t?.name ?? 'Você'} <span className="text-xs font-normal text-muted">{t ? '@'+t.handle : '@comunidade'}</span></p><p className="text-xs text-muted">{t?.expertiseLabel ?? 'Comunidade Pórtico'} · {relativeLabel(p.publishedAt)}</p></div>
            {t && <span className="rounded-full bg-gold/10 px-2 py-1 text-xs text-gold">Professor</span>}
          </header>
          <div className="space-y-2 px-4 pb-4"><h2 className="font-title text-xl">{p.title}</h2><p className="whitespace-pre-wrap text-sm leading-relaxed">{p.body}</p></div>
          <PostMedia post={p}/>
          <footer className="flex flex-wrap items-center gap-2 border-t border-line p-3">
            <button className={(isMember ? p.liked : teacherLikes[p.id]) ? 'btn-primary text-sm' : 'btn-ghost text-sm'} onClick={() => isMember ? toggleLike(p.id) : setTeacherLikes((old) => ({ ...old, [p.id]: !old[p.id] }))}><Icon name="coracao" size={16}/> {p.likes + ((isMember ? p.liked : teacherLikes[p.id]) ? 1 : 0)} · Curtir</button>
            <button className="btn-ghost text-sm" onClick={() => setCommentsFor(commentsFor === p.id ? null : p.id)}><Icon name="balao" size={16}/> Comentar ({p.comments.length + (teacherComments[p.id]?.length ?? 0)})</button>
            <span className="flex-1"/>
            <button className="btn-ghost text-sm" onClick={() => navigator.clipboard?.writeText(p.title + '\n' + p.body)}><Icon name="fita" size={16}/> Copiar</button>
          </footer>
          {p.comments.length > 0 && <div className="space-y-2 px-4 pb-3">{[...p.comments, ...(teacherComments[p.id] ?? [])].slice(-3).map((c,i) => <p key={i} className="rounded-lg bg-raised/60 px-3 py-2 text-sm"><strong>{c.author}</strong> {c.text}</p>)}</div>}
          {commentsFor === p.id && <div className="flex gap-2 px-4 pb-4"><input className="input min-w-0 flex-1" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escreva um comentário…" maxLength={400}/><button className="btn-primary" onClick={() => addComment(p.id, isMember)}>Enviar</button></div>}
        </article>;
      })}
      {feed.length === 0 && <div className="card p-6 text-center text-sm text-muted">Ainda não há publicações neste filtro.</div>}
    </div>
    {story && createPortal(
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#0f4c5c] p-4 text-[#f7eedf]" role="dialog" aria-modal="true" aria-label={`Stories de ${story.name}`}>
      <div className="flex gap-1">{storyItems.map((_,i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= storyIndex ? 'bg-[#f7eedf]' : 'bg-[#f7eedf]/30'}`}/>)}</div>
      <header className="flex items-center gap-3 py-4"><TeacherAvatar t={story} size={42}/><div className="flex-1"><p className="font-semibold">{story.name}</p><p className="text-xs opacity-70">@{story.handle}</p></div><button onClick={() => setStory(null)} aria-label="Fechar stories"><Icon name="errado" size={24}/></button></header>
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#164e63] via-[#2c6870] to-[#6b3a6e] p-6">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[22px] border-white/10"/><div className="absolute -bottom-10 -left-8 h-40 w-40 rotate-12 rounded-3xl bg-[#d4a017]/30"/>
        <p className="relative text-xs uppercase tracking-[.2em] opacity-70">Caderno de {story.name.split(' ').at(-1)}</p>
        <p className="relative mt-6 font-title text-3xl leading-tight">{storyItems[storyIndex]}</p>
        <a href={STORY_LINKS[story.id]?.url} target="_blank" rel="noreferrer" className="relative mt-6 inline-flex max-w-full items-center gap-2 self-start rounded-full bg-[#f7eedf] px-4 py-2 text-sm font-semibold text-[#0f4c5c] underline-offset-2 hover:underline">
          <Icon name="link" size={16}/>{STORY_LINKS[story.id]?.label}
        </a>
        <div className="relative mt-5 rounded-xl border border-white/20 bg-black/15 p-3"><p className="text-xs">Trilha sonora sugerida</p><p className="mt-1 text-sm">{MUSIC[(teachers.findIndex((x) => x.id === story.id) + storyIndex) % MUSIC.length]}</p><button className="mt-2 rounded-full border border-white/30 px-3 py-1 text-xs" onClick={() => setPlayingMusic(!playingMusic)}>{playingMusic ? 'Pausar indicação musical' : 'Selecionar música'}</button><p className="mt-1 text-[10px] opacity-60">A plataforma sugere uma faixa; não reproduz áudio protegido.</p></div>
        <p className="relative mt-4 text-xs opacity-80">Perfil fictício · conteúdo demonstrativo</p>
      </div>
      <div className="flex gap-3 py-4"><button className="btn-ghost flex-1 border-white/30 text-[#f7eedf]" onClick={() => setStoryIndex(Math.max(0, storyIndex-1))} disabled={storyIndex===0}>Anterior</button><button className="btn-primary flex-1" onClick={() => storyIndex+1 < storyItems.length ? setStoryIndex(storyIndex+1) : setStory(null)}>{storyIndex+1 < storyItems.length ? 'Próximo story' : 'Concluir'}</button></div>
      <button className="mx-auto mb-2 flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm" onClick={() => { setProfile(story); setStory(null); }}>
        <Icon name="pessoa" size={16}/> Ver perfil e publicações de {story.name.split(' ').at(-1)}
      </button>
    </div>, document.body
    )}
    {profile && <TeacherProfileModal teacher={profile} onClose={() => setProfile(null)} />}
    <div className="text-center text-xs text-muted"><Link to="/trilha" className="underline">Voltar à trilha</Link> · Feed de demonstração com personagens fictícios</div>
  </div>;
}


function TeacherProfileModal({ teacher, onClose }: { teacher: FictionalTeacher; onClose: () => void }) {
  const authored = teacherPosts.filter((post) => post.teacherId === teacher.id).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={'Perfil de ' + teacher.name}>
      <section className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-surface text-ink shadow-2xl sm:rounded-2xl">
        <header className="relative overflow-hidden bg-[#0f4c5c] p-5 text-[#f7eedf] sm:p-7">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10"/>
          <button className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" onClick={onClose} aria-label="Fechar perfil"><Icon name="errado" size={22}/></button>
          <div className="relative flex items-center gap-4">
            <span className="rounded-full bg-[#f7eedf] p-1.5"><TeacherAvatar t={teacher} size={84}/></span>
            <div className="min-w-0">
              <p className="text-xs opacity-70">PERSONAGEM DE PÓRTICO</p>
              <h2 className="mt-1 font-title text-2xl leading-tight sm:text-3xl">{teacher.name}</h2>
              <p className="mt-1 text-sm opacity-85">@{teacher.handle} · {teacher.expertiseLabel}</p>
            </div>
          </div>
          {teacher.motto && <p className="relative mt-5 font-title text-xl italic">“{teacher.motto}”</p>}
        </header>
        <div className="space-y-5 p-4 sm:p-6">
          <section>
            <h3 className="font-title text-xl">A pessoa por trás das aulas</h3>
            <p className="mt-2 text-sm leading-relaxed">{teacher.biography}</p>
            {teacher.personalStyle && <div className="mt-3 rounded-xl border border-line bg-raised/40 p-3">
              <p className="text-xs font-semibold text-muted">ESTILO E PRESENÇA</p>
              <p className="mt-1 text-sm leading-relaxed">{teacher.personalStyle}</p>
            </div>}
          </section>
          {teacher.speakingStyle && <section>
            <h3 className="font-title text-xl">Como ensina</h3>
            <p className="mt-2 text-sm leading-relaxed">{teacher.speakingStyle}</p>
          </section>}
          {teacher.interests && <section>
            <h3 className="font-title text-xl">Fora da sala de aula</h3>
            <div className="mt-2 flex flex-wrap gap-2">{teacher.interests.map((interest) => <span key={interest} className="rounded-full border border-line px-3 py-1 text-xs">{interest}</span>)}</div>
          </section>}
          {teacher.topics && <section>
            <h3 className="font-title text-xl">Assuntos que acompanha</h3>
            <div className="mt-2 flex flex-wrap gap-2">{teacher.topics.map((topic) => <span key={topic} className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">#{topic.replace(/\s+/g, '')}</span>)}</div>
          </section>}
          {teacher.references && <section>
            <h3 className="font-title text-xl">Referências recomendadas</h3>
            <div className="mt-2 space-y-2">{teacher.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-line p-3 text-sm hover:bg-raised/40">
              <span>{reference.label}</span><Icon name="link" size={16}/>
            </a>)}</div>
          </section>}
          <section>
            <div className="flex items-end justify-between gap-3">
              <div><h3 className="font-title text-xl">Publicações</h3><p className="mt-1 text-sm text-muted">{authored.length} posts de {teacher.name}</p></div>
              <span className="text-xs text-muted">Conteúdo demonstrativo</span>
            </div>
            <div className="mt-3 space-y-3">{authored.map((post) => <article key={post.id} className="rounded-xl border border-line p-3">
              <div className="flex items-center justify-between gap-3"><span className="text-xs capitalize text-gold">{post.kind.replace('-', ' ')}</span><time className="text-xs text-muted">{post.publishedAt}</time></div>
              <h4 className="mt-1 font-semibold">{post.title}</h4>
              <div className="prose-manuscript mt-2 text-sm leading-relaxed"><Markdown>{post.body}</Markdown></div>
            </article>)}</div>
          </section>
          <button className="btn-primary w-full" onClick={onClose}>Voltar ao feed</button>
        </div>
      </section>
    </div>,
    document.body,
  );
}


function PostMedia({ post }: { post: CommunityPost }) {
  const [active, setActive] = useState(0);
  const images = post.images?.length ? post.images : post.image ? [post.image] : [];
  const current = images[Math.min(active, Math.max(0, images.length - 1))];
  return <>
    {post.videoUrl && <div className="border-y border-line"><VideoEmbed url={post.videoUrl} title={post.title} meta="Vídeo compartilhado pela comunidade" /></div>}
    {current && <figure className="relative border-y border-line bg-raised/30">
      <img src={current} alt={'Imagem ' + (active + 1) + ' da publicação'} className="max-h-[32rem] w-full object-contain" loading="lazy" decoding="async"/>
      {images.length > 1 && <figcaption className="flex items-center justify-between gap-3 p-2">
        <button className="btn-ghost !min-h-9 !px-3" onClick={() => setActive((old) => (old - 1 + images.length) % images.length)} aria-label="Imagem anterior do carrossel"><Icon name="voltar" size={16}/></button>
        <span className="text-xs text-muted">{active + 1} de {images.length}</span>
        <button className="btn-ghost !min-h-9 !px-3" onClick={() => setActive((old) => (old + 1) % images.length)} aria-label="Próxima imagem do carrossel"><Icon name="avancar" size={16}/></button>
      </figcaption>}
    </figure>}
  </>;
}
