import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChapter, teacherPosts, teachers } from '@/content';
import type { FictionalTeacher } from '@/content/teachers';
import { PageHeader } from '@/components/Page';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { Markdown } from '@/components/Markdown';
import { Icon } from '@/components/Icon';

type PostState = { liked: string[]; saved: string[]; answers: Record<string, boolean> };
const STORAGE = 'portico:trilha-professores:v1';
const emptyState = (): PostState => ({ liked: [], saved: [], answers: {} });
function loadState(): PostState {
  try { return { ...emptyState(), ...JSON.parse(localStorage.getItem(STORAGE) ?? '{}') }; }
  catch { return emptyState(); }
}
function teacherFor(id: string): FictionalTeacher {
  return teachers.find((teacher) => teacher.id === id) ?? teachers[0];
}
function dateLabel(value: string): string {
  const date = new Date(value + 'T12:00:00');
  if (Number.isNaN(date.getTime())) return 'Publicação didática';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
}

export function TrailTeacherPostPage() {
  const { chapterId = '', sectionId = '' } = useParams();
  const chapter = getChapter(chapterId);
  const posts = teacherPosts.filter((post) => post.chapterId === chapterId && post.sectionId === sectionId);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<PostState>(loadState);
  const [answer, setAnswer] = useState<boolean | null>(null);
  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch { /* reações ficam na sessão atual */ }
  }, [state]);

  if (!chapter || posts.length === 0) {
    return <section className="card space-y-3 p-5">
      <h1 className="text-xl">Publicação não encontrada</h1>
      <p className="text-sm text-muted">Este trecho ainda não tem publicações editoriais selecionadas.</p>
      <Link to="/trilha" className="btn-primary w-full">Voltar à trilha</Link>
    </section>;
  }

  const post = posts[Math.min(index, posts.length - 1)];
  const teacher = teacherFor(post.teacherId);
  const liked = state.liked.includes(post.id);
  const saved = state.saved.includes(post.id);
  const chooseAnswer = (value: boolean) => {
    setAnswer(value);
    setState((old) => ({ ...old, answers: { ...old.answers, [post.id]: value } }));
  };
  const toggle = (key: 'liked' | 'saved') => setState((old) => {
    const list = old[key];
    return { ...old, [key]: list.includes(post.id) ? list.filter((id) => id !== post.id) : [...list, post.id] };
  });
  const next = () => { setIndex((old) => Math.min(posts.length - 1, old + 1)); setAnswer(null); };
  const previous = () => { setIndex((old) => Math.max(0, old - 1)); setAnswer(null); };

  return <div className="mx-auto max-w-2xl space-y-4 pb-8">
    <PageHeader area="grimorios" title="Posts dos professores" subtitle={chapter.title + ' · uma perspectiva complementar dentro da trilha'} />
    <div className="flex items-center gap-3" aria-label="Progresso das publicações">
      <span className="text-sm text-muted">Publicação {index + 1} de {posts.length}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuemin={0} aria-valuemax={posts.length} aria-valuenow={index + 1}>
        <div className="h-full rounded-full bg-gold transition-[width]" style={{ width: ((index + 1) / posts.length * 100) + '%' }} />
      </div>
    </div>

    <article className="card overflow-hidden p-0" aria-label={post.title}>
      <header className="flex items-center gap-3 p-4">
        <TeacherAvatar t={teacher} size={52} />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">{teacher.name}</h2>
          <p className="text-xs text-muted">@{teacher.handle} · {teacher.expertiseLabel}</p>
          <p className="mt-0.5 text-xs text-muted">{post.kind.replace('-', ' ')} · {dateLabel(post.publishedAt)} · {post.estimatedMinutes} min</p>
        </div>
        <button className={saved ? 'btn-primary !min-h-9 !px-3' : 'btn-ghost !min-h-9 !px-3'} onClick={() => toggle('saved')} aria-pressed={saved} aria-label={saved ? 'Remover dos guardados' : 'Guardar publicação'}>
          <Icon name={saved ? 'fitaCheia' : 'fita'} size={17} />
        </button>
      </header>
      <div className="border-y border-line bg-raised/30 px-5 py-5">
        <p className="kicker">{post.kind === 'mini-desafio' ? 'Pense e responda' : post.kind === 'caso' ? 'Caso de aplicação' : post.kind === 'pegadinha' ? 'Cuidado com esta confusão' : post.kind === 'revisao' ? 'Consolide a ideia' : 'Um olhar além da aula'}</p>
        <h1 className="mt-2 font-title text-2xl leading-tight sm:text-3xl">{post.title}</h1>
        <div className="prose-manuscript mt-4 text-base leading-relaxed"><Markdown>{post.body}</Markdown></div>
      </div>
      {post.challenge && <section className="space-y-3 p-4" aria-label="Mini-desafio do professor">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="kicker">Desafio de {teacher.name.split(' ').at(-1)}</p>
          <p className="mt-2 font-semibold leading-relaxed">{post.challenge.statement}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className={answer === true ? 'btn-primary' : 'btn-ghost'} onClick={() => chooseAnswer(true)} aria-pressed={answer === true}>Verdadeiro</button>
          <button className={answer === false ? 'btn-primary' : 'btn-ghost'} onClick={() => chooseAnswer(false)} aria-pressed={answer === false}>Falso</button>
        </div>
        {answer !== null && <div className="rounded-xl border border-line p-3" aria-live="polite">
          <p className={answer === post.challenge.answer ? 'font-semibold text-ok' : 'font-semibold text-bad'}>{answer === post.challenge.answer ? 'Isso mesmo!' : 'Ainda não — veja o raciocínio.'}</p>
          <p className="mt-1 text-sm leading-relaxed">{post.challenge.why}</p>
        </div>}
        {post.id in state.answers && state.answers[post.id] !== undefined && <p className="text-xs text-muted">Sua resposta fica registrada neste aparelho.</p>}
      </section>}
      <footer className="flex flex-wrap items-center gap-2 border-t border-line p-3">
        <button className={liked ? 'btn-primary text-sm' : 'btn-ghost text-sm'} onClick={() => toggle('liked')} aria-pressed={liked}><Icon name={liked ? 'coracaoCheio' : 'coracao'} size={17}/>{liked ? ' Curtido' : ' Curtir'}</button>
        <button className={saved ? 'btn-primary text-sm' : 'btn-ghost text-sm'} onClick={() => toggle('saved')} aria-pressed={saved}><Icon name={saved ? 'fitaCheia' : 'fita'} size={17}/>{saved ? ' Guardado' : ' Guardar'}</button>
        <span className="flex-1"/>
        <span className="text-xs text-muted">Personagem fictício · conteúdo didático</span>
      </footer>
    </article>

    <div className="flex flex-wrap gap-2">
      <button className="btn-ghost flex-1" disabled={index === 0} onClick={previous}><Icon name="voltar" size={16}/> Anterior</button>
      {index + 1 < posts.length && <button className="btn-primary flex-1" onClick={next}>Próxima publicação <Icon name="avancar" size={16}/></button>}
      <Link to="/trilha" className="btn-ghost w-full sm:flex-1">Continuar na trilha <Icon name="avancar" size={16}/></Link>
    </div>
    <p className="text-center text-xs text-muted">As publicações desta etapa complementam o Aprender. O feed completo continua na Sala dos Professores.</p>
  </div>;
}
