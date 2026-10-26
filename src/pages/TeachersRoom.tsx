// Sala dos Professores, agora feed didático (pacote v4, etapa 4): o currículo em posts curtos, na
// ordem da trilha, assinados por professores fictícios. Os posts vêm das próprias aulas em texto.
// Ações com função real e privadas: Entendi, Preciso rever, Guardar, anotação e dúvida guardada.
// Responder posts não conclui a aula; só "Concluir esta aula", depois de todas as checagens.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useStudy } from '@/app/StudyProvider';
import { feedLessons, feedPostsOf, getChapter, microSeries, teacherForChapter, teachers } from '@/content';
import type { FictionalTeacher } from '@/content/teachers';
import type { MicroLesson } from '@/content/types';
import { emptyFeed, lessonAnswered, lessonUnlocked, toReview, type FeedPost, type FeedPrefs } from '@/lib/feed';
import { learnKey, logUnit, seriesKey } from '@/lib/pace';
import { markSectionRead } from '@/lib/study';
import type { StudyData } from '@/lib/model';
import { splitMarkdown } from '@/lib/book';
import { Icon } from '@/components/Icon';
import { Markdown } from '@/components/Markdown';
import { PageHeader } from '@/components/Page';
import { VideoEmbed } from '@/components/VideoEmbed';
import { ActivityView } from '@/components/activities/ActivityView';
import { Illustration } from '@/components/Illustration';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { TrailPlace } from '@/components/TrailPlace';

const KEY = 'cronicas:feed:v1';
const KIND: Record<FeedPost['kind'], string> = {
  explica: 'Explicação',
  carrossel: 'Em partes',
  exemplo: 'Exemplo resolvido',
  atividade: 'Confira',
  video: 'Videoaula',
  narrada: 'Aula narrada',
  dica: 'Dica',
  resumo: 'Resumo',
};

function loadFeed(): FeedPrefs {
  try {
    return { ...emptyFeed(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return emptyFeed();
  }
}

const unitKeyOf = (m: MicroLesson) => (microSeries(m.chapterId, m.sectionId).length > 1 ? seriesKey(m.chapterId, m.sectionId, m.id) : learnKey(m.chapterId, m.sectionId));
const lessonDone = (data: StudyData, m: MicroLesson) => !!data.unitLog?.[unitKeyOf(m)] || !!data.reading[m.chapterId]?.sectionsRead.includes(m.sectionId);

export function TeachersRoomPage() {
  const { data, update } = useStudy();
  const [prefs, setPrefs] = useState<FeedPrefs>(loadFeed);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* sem armazenamento */
    }
  }, [prefs]);

  const order = feedLessons.map((m) => m.id);
  const unlocked = (id: string) => lessonUnlocked(order, (x) => lessonDone(data, feedLessons.find((m) => m.id === x)!), id);
  // Aula aberta: a escolhida, senão a primeira não concluída (a mesma lógica da trilha).
  const firstOpen = feedLessons.find((m) => !lessonDone(data, m)) ?? feedLessons[0];
  const [lessonId, setLessonId] = useState(firstOpen.id);
  const lesson = feedLessons.find((m) => m.id === lessonId)!;
  const posts = useMemo(() => feedPostsOf(lesson.id), [lesson.id]);
  const shown = Math.min(posts.length, (prefs.cursor[lesson.id] ?? 0) + 1);
  const teacher = teacherForChapter(lesson.chapterId);
  const idx = order.indexOf(lesson.id);
  const next = feedLessons[idx + 1];
  const allPosts = useMemo(() => feedLessons.flatMap((m) => feedPostsOf(m.id)), []);
  const review = toReview(allPosts, prefs);
  const saved = allPosts.filter((p) => prefs.react[p.id]?.salvo);
  const lastRef = useRef<HTMLLIElement>(null);
  const [profile, setProfile] = useState<FictionalTeacher | null>(null);
  const [story, setStory] = useState<number | null>(null);
  const doneLessons = feedLessons.filter((m) => lessonDone(data, m));

  const reveal = () => {
    setPrefs((p) => ({ ...p, cursor: { ...p.cursor, [lesson.id]: Math.min(posts.length - 1, shown) } }));
    setTimeout(() => lastRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' }), 60);
  };
  const done = lessonDone(data, lesson);
  const canFinish = lessonAnswered(posts, prefs);
  const finish = () =>
    update((d) => {
      const series = microSeries(lesson.chapterId, lesson.sectionId);
      const isLast = series[series.length - 1].id === lesson.id;
      const logged = logUnit(d, unitKeyOf(lesson));
      return isLast ? markSectionRead(logged, getChapter(lesson.chapterId)!, lesson.sectionId).data : logged;
    });

  return (
    <div className="space-y-5">
      <PageHeader area="explorar" title="Sala dos Professores" subtitle="O currículo em posts curtos, na mesma ordem da trilha. Os professores são personagens fictícios." />

      <TeacherStrip onOpen={setProfile} current={teacher.id} />

      {doneLessons.length > 0 && (
        <section aria-label="Revisões rápidas">
          <p className="kicker">Revisões rápidas das aulas concluídas</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {doneLessons.slice(-8).map((m) => (
              <button key={m.id} className="flex w-16 flex-col items-center gap-1 text-center" onClick={() => setStory(doneLessons.indexOf(m))} aria-label={`Revisão rápida: ${m.title}`}>
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-surface">
                  <Illustration name={m.steps.find((x) => x.art)?.art ?? 'livro'} className="h-8 w-auto text-ink" animate={false} />
                </span>
                <span className="w-full truncate text-xs">{m.title}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="card space-y-3 p-4" aria-label="Aula no feed">
        <label className="block text-sm">
          <span className="kicker">Aula</span>
          <select className="input mt-1" value={lesson.id} onChange={(e) => setLessonId(e.target.value)} aria-label="Escolher aula">
            {feedLessons.map((m, i) => (
              <option key={m.id} value={m.id} disabled={!unlocked(m.id)}>
                {i + 1}. {m.title}
                {lessonDone(data, m) ? ' (concluída)' : !unlocked(m.id) ? ' (depois das anteriores)' : ''}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted">
            {getChapter(lesson.chapterId)?.title} · post {shown} de {posts.length}
          </span>
          <span className="h-1.5 w-28 overflow-hidden rounded-sm bg-ink/10" aria-hidden="true">
            <span className="block h-full bg-ink transition-all duration-500" style={{ width: `${(shown / posts.length) * 100}%` }} />
          </span>
        </div>
      </section>

      <ol className="space-y-4" aria-label="Posts">
        {posts.slice(0, shown).map((p, i) => (
          <li key={p.id} ref={i === shown - 1 ? lastRef : undefined} className="anim-tile-in scroll-mt-20">
            <PostCard post={p} pos={i + 1} total={posts.length} teacher={teacher} prefs={prefs} setPrefs={setPrefs} lesson={lesson} done={done} canFinish={canFinish} onFinish={finish} onProfile={setProfile} />
          </li>
        ))}
      </ol>

      {shown < posts.length ? (
        <button className="btn-primary w-full" onClick={reveal} data-testid="feed-proximo">
          Próximo post <Icon name="avancar" size={18} />
        </button>
      ) : (
        <section className="card p-4" data-testid="feed-fim">
          <p className="kicker">Fim desta aula no feed</p>
          <p className="mt-1 text-sm">{done ? 'Aula concluída na trilha.' : canFinish ? 'Conclua a aula no resumo acima para ela contar na trilha.' : 'Responda as checagens desta aula para poder concluí-la.'}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {next && unlocked(next.id) && (
              <button className="btn-primary flex-1" onClick={() => setLessonId(next.id)}>
                Próxima aula <Icon name="avancar" size={18} />
              </button>
            )}
            <Link to="/trilha" className="btn-ghost flex-1">
              Ver a trilha
            </Link>
          </div>
        </section>
      )}

      {(review.length > 0 || saved.length > 0) && (
        <section className="card space-y-3 p-4" aria-label="Seus marcadores">
          {review.length > 0 && (
            <div>
              <h2 className="text-base">Marcados para rever ({review.length})</h2>
              <ul className="mt-1 space-y-1 text-sm">
                {review.map((p) => (
                  <li key={p.id}>
                    <button className="link-grow text-left" onClick={() => setLessonId(p.lessonId)}>
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {saved.length > 0 && (
            <div>
              <h2 className="text-base">Guardados ({saved.length})</h2>
              <ul className="mt-1 space-y-1 text-sm">
                {saved.map((p) => (
                  <li key={p.id}>
                    <button className="link-grow text-left" onClick={() => setLessonId(p.lessonId)}>
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
      {profile && (
        <ProfileDialog
          t={profile}
          onClose={() => setProfile(null)}
          onLesson={(id) => {
            setProfile(null);
            if (unlocked(id)) setLessonId(id);
          }}
        />
      )}
      {story !== null && doneLessons[story] && <StoryViewer lessons={doneLessons} start={story} onClose={() => setStory(null)} />}
    </div>
  );
}

function PostCard({
  post: p,
  pos,
  total,
  teacher,
  prefs,
  setPrefs,
  lesson,
  done,
  canFinish,
  onFinish,
  onProfile,
}: {
  post: FeedPost;
  pos: number;
  total: number;
  teacher: ReturnType<typeof teacherForChapter>;
  prefs: FeedPrefs;
  setPrefs: (f: (p: FeedPrefs) => FeedPrefs) => void;
  lesson: MicroLesson;
  done: boolean;
  canFinish: boolean;
  onFinish: () => void;
  onProfile: (t: FictionalTeacher) => void;
}) {
  const r = prefs.react[p.id] ?? {};
  const toggle = (k: 'entendi' | 'rever' | 'salvo' | 'curti') => setPrefs((x) => ({ ...x, react: { ...x.react, [p.id]: { ...x.react[p.id], [k]: !x.react[p.id]?.[k] } } }));
  const [open, setOpen] = useState<'nota' | 'duvida' | null>(null);
  const tip = p.kind === 'dica' && p.tip ? teacherForChapter(p.tip.chapterId) : teacher;
  const note = prefs.notes[p.id];
  const question = prefs.questions[p.id];
  return (
    <article className="card overflow-hidden p-0" aria-label={p.title} data-testid={`post-${p.id}`}>
      <header className="flex items-center gap-3 px-4 pt-4">
        <button className="shrink-0 rounded-full" onClick={() => onProfile(tip)} aria-label={`Ver o perfil de ${tip.name}`}>
          <TeacherAvatar t={tip} size={42} />
        </button>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">
            {tip.name} <span className="font-normal text-muted">@{tip.handle}</span>
          </span>
          <span className="block truncate text-xs text-muted">
            {KIND[p.kind]} · {lesson.title} · {pos} de {total}
          </span>
        </span>
      </header>
      <div className="px-4 pt-3">
        <h2 className="text-[1.3rem] leading-snug">{p.title}</h2>
      </div>
      {p.image ? (
        <figure className="mt-3 border-y border-line bg-raised/40">
          <img
            src={p.image.src}
            alt={p.image.alt}
            className="aspect-[4/3] max-h-72 w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <figcaption className="flex flex-wrap items-center gap-x-2 px-4 py-1.5 text-[11px] text-muted">
            <span>{p.image.credit}</span>
            <a href={p.image.sourceUrl} target="_blank" rel="noreferrer" className="underline">Fonte</a>
            {p.image.licenseUrl && (
              <a href={p.image.licenseUrl} target="_blank" rel="noreferrer" className="underline">{p.image.license}</a>
            )}
          </figcaption>
        </figure>
      ) : p.art ? (
        <div className="mt-3 grid place-items-center border-y border-line bg-raised/40 py-4" aria-hidden="true">
          <Illustration name={p.art} className="h-28 w-auto text-ink" />
        </div>
      ) : null}
      <div className="px-4 pt-3">
        <PostBody p={p} prefs={prefs} setPrefs={setPrefs} />
        {p.tags && p.tags.length > 0 && <p className="mt-2 text-sm text-gold">{p.tags.map((t) => `#${t}`).join(' ')}</p>}
      </div>
      {p.kind === 'resumo' && (
        <div className="mx-4 mt-3 rounded-md border border-line p-3 text-sm">
          {done ? (
            <p className="font-semibold text-ok">Aula concluída na trilha.</p>
          ) : canFinish ? (
            <button className="btn-primary w-full" onClick={onFinish} data-testid="feed-concluir">
              Concluir esta aula na trilha
            </button>
          ) : (
            <p className="text-muted">Para concluir a aula na trilha, responda as checagens de "{lesson.title}" no feed.</p>
          )}
          <TrailPlace lessonId={lesson.id} className="mt-2 max-w-full" />
        </div>
      )}
      <footer className="mt-3 flex flex-wrap items-center gap-1 border-t border-line px-3 py-2 text-[0.8rem]">
        <IconAction on={!!r.curti} onClick={() => toggle('curti')} icon={r.curti ? 'coracaoCheio' : 'coracao'} label="Curtir" />
        <ActionBtn on={!!r.entendi} onClick={() => toggle('entendi')} icon="certo" label="Entendi" />
        <ActionBtn on={!!r.rever} onClick={() => toggle('rever')} icon="revisar" label="Preciso rever" />
        <span className="ml-auto" />
        <IconAction on={!!r.salvo} onClick={() => toggle('salvo')} icon={r.salvo ? 'fitaCheia' : 'fita'} label="Guardar" />
      </footer>
      <section className="space-y-2 border-t border-line px-4 py-3 text-sm" aria-label="Comentários">
        {p.goal && (
          <div className="flex gap-2">
            <TeacherAvatar t={tip} size={26} />
            <p className="min-w-0 flex-1 rounded-md bg-raised/60 px-3 py-2">
              <span className="font-semibold">{tip.name.split(' ').at(-1)}</span> <span className="text-xs text-muted">· fixado</span>
              <br />
              Depois deste post, você deve conseguir: {p.goal.charAt(0).toLowerCase() + p.goal.slice(1)}
            </p>
          </div>
        )}
        {note && open !== 'nota' && <MyComment label="Sua anotação" text={note} />}
        {question && open !== 'duvida' && <MyComment label="Sua dúvida guardada" text={question} />}
        <div className="flex gap-2">
          <button className="flex-1 rounded-md border border-line px-3 py-2 text-left text-muted hover:border-ink/40" aria-pressed={open === 'nota'} onClick={() => setOpen(open === 'nota' ? null : 'nota')}>
            <Icon name="pena" size={14} className="mr-1 inline" /> Anotar
          </button>
          <button className="flex-1 rounded-md border border-line px-3 py-2 text-left text-muted hover:border-ink/40" aria-pressed={open === 'duvida'} onClick={() => setOpen(open === 'duvida' ? null : 'duvida')}>
            <Icon name="balao" size={14} className="mr-1 inline" /> Dúvida
          </button>
        </div>
        {open && (
          <label className="block">
            <span className="text-xs text-muted">{open === 'nota' ? 'Sua anotação (só neste aparelho).' : 'Guarde a dúvida para levar ao seu professor ou rever depois. Não há resposta automática.'}</span>
            <textarea
              className="input mt-1 min-h-[5rem]"
              value={(open === 'nota' ? prefs.notes : prefs.questions)[p.id] ?? ''}
              onChange={(e) => {
                const v = e.target.value;
                setPrefs((x) => (open === 'nota' ? { ...x, notes: { ...x.notes, [p.id]: v } } : { ...x, questions: { ...x.questions, [p.id]: v } }));
              }}
              aria-label={open === 'nota' ? 'Anotação' : 'Dúvida'}
            />
          </label>
        )}
      </section>
    </article>
  );
}

function MyComment({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-2">
      <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-bg" aria-hidden="true">
        Você
      </span>
      <p className="min-w-0 flex-1 rounded-md border border-line px-3 py-2">
        <span className="text-xs text-muted">{label}</span>
        <br />
        {text}
      </p>
    </div>
  );
}

function IconAction({ on, onClick, icon, label }: { on: boolean; onClick: () => void; icon: Parameters<typeof Icon>[0]['name']; label: string }) {
  return (
    <button type="button" aria-pressed={on} aria-label={label} title={label} onClick={onClick} className={`grid h-9 w-9 place-items-center rounded-md transition-colors ${on ? 'text-gold' : 'text-ink hover:bg-raised'}`}>
      <Icon name={icon} size={20} />
    </button>
  );
}

/** Faixa de professores: retrato, nome e perfil. */
function TeacherStrip({ onOpen, current }: { onOpen: (t: FictionalTeacher) => void; current: string }) {
  return (
    <section aria-label="Professores" className="flex flex-wrap gap-4">
      {teachers.map((t) => (
        <button key={t.id} className="flex w-16 flex-col items-center gap-1 text-center" onClick={() => onOpen(t)} aria-label={`Ver o perfil de ${t.name}`}>
          <TeacherAvatar t={t} size={56} ring={t.id === current} />
          <span className="w-full truncate text-xs">{t.name.split(' ').at(-1)}</span>
        </button>
      ))}
    </section>
  );
}

/** Perfil do professor: quem é, do que fala e as aulas dele na trilha. */
function ProfileDialog({ t, onClose, onLesson }: { t: FictionalTeacher; onClose: () => void; onLesson: (id: string) => void }) {
  const mine = feedLessons.filter((m) => teacherForChapter(m.chapterId).id === t.id);
  return createPortal(
    <div className="fixed inset-0 z-[80] grid place-items-end bg-ink/40 sm:place-items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={`Perfil de ${t.name}`} className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-[var(--radius-card)] bg-surface p-5 sm:rounded-[var(--radius-card)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <TeacherAvatar t={t} size={76} />
          <div className="min-w-0">
            <h2 className="text-[1.4rem] leading-tight">{t.name}</h2>
            <p className="text-sm text-muted">@{t.handle} · personagem fictício</p>
          </div>
        </div>
        <p className="mt-3 text-sm">{t.expertiseLabel}.</p>
        <p className="mt-1 text-sm text-muted">{t.biography}</p>
        {t.topics && <p className="mt-2 text-sm text-gold">{t.topics.map((x) => `#${x.replace(/\s+/g, '')}`).join(' ')}</p>}
        <h3 className="mt-4 text-base">Aulas no feed ({mine.length})</h3>
        <ul className="mt-1 divide-y divide-line">
          {mine.slice(0, 12).map((m) => (
            <li key={m.id}>
              <button className="w-full py-2 text-left text-sm" onClick={() => onLesson(m.id)}>
                <span className="link-grow">{m.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-ghost mt-4 w-full" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>,
    document.body,
  );
}

/** Revisões rápidas: o resumo de cada aula concluída, em telas que passam com um toque. */
function StoryViewer({ lessons, start, onClose }: { lessons: MicroLesson[]; start: number; onClose: () => void }) {
  const [li, setLi] = useState(start);
  const [si, setSi] = useState(0);
  const m = lessons[li];
  const t = teacherForChapter(m.chapterId);
  const next = () => (si + 1 < m.summary.length ? setSi(si + 1) : li + 1 < lessons.length ? (setLi(li + 1), setSi(0)) : onClose());
  const prev = () => (si > 0 ? setSi(si - 1) : li > 0 ? (setLi(li - 1), setSi(0)) : undefined);
  useEffect(() => {
    const k = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : e.key === 'ArrowRight' ? next() : e.key === 'ArrowLeft' ? prev() : undefined);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
  return createPortal(
    <div className="fixed inset-0 z-[80] flex flex-col bg-ink text-bg" role="dialog" aria-modal="true" aria-label={`Revisão rápida: ${m.title}`} style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
      <div className="flex gap-1 px-3" aria-hidden="true">
        {m.summary.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-sm ${i <= si ? 'bg-bg' : 'bg-bg/25'}`} />
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <TeacherAvatar t={t} size={34} />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">{m.title}</span>
        <button className="grid h-9 w-9 place-items-center" onClick={onClose} aria-label="Fechar a revisão">
          <Icon name="errado" size={22} />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-6">
        <button className="absolute inset-y-0 left-0 w-1/3" onClick={prev} aria-label="Anterior" />
        <button className="absolute inset-y-0 right-0 w-2/3" onClick={next} aria-label="Próximo" />
        <div className="pointer-events-none max-w-md text-center" key={`${li}-${si}`}>
          <p className="kicker !text-bg/70">
            {si + 1} de {m.summary.length}
          </p>
          <p className="anim-tile-in mt-3 font-title text-[1.6rem] leading-snug">{m.summary[si]}</p>
        </div>
      </div>
      <p className="px-4 pb-6 text-center text-xs text-bg/60">Toque à direita para avançar e à esquerda para voltar.</p>
    </div>,
    document.body,
  );
}

function ActionBtn({ on, onClick, icon, label }: { on: boolean; onClick: () => void; icon: Parameters<typeof Icon>[0]['name']; label: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 transition-colors ${on ? 'border-ink bg-ink text-bg' : 'border-ink/15 hover:border-ink/50'}`}>
      <Icon name={icon} size={15} /> {label}
    </button>
  );
}

function PostBody({ p, prefs, setPrefs }: { p: FeedPost; prefs: FeedPrefs; setPrefs: (f: (p: FeedPrefs) => FeedPrefs) => void }) {
  const [slide, setSlide] = useState(0);
  const [steps, setSteps] = useState(1);
  const [recover, setRecover] = useState<'nao' | 'mostrar' | 'feito'>('nao');
  const md = (t: string) => (
    <div className="prose-manuscript !text-[1rem] [&>*:last-child]:!mb-0">
      <Markdown>{t}</Markdown>
    </div>
  );
  if (p.kind === 'explica' || p.kind === 'dica') return md(p.md ?? p.tip?.body ?? '');
  if (p.kind === 'carrossel' && p.slides)
    return (
      <div>
        <div className="min-h-[3.5rem]" aria-live="polite" key={slide}>
          <div className="anim-tile-in">{md(p.slides[slide])}</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="btn-ghost !min-h-[38px] !px-3" disabled={slide === 0} onClick={() => setSlide((s) => s - 1)} aria-label="Parte anterior">
            <Icon name="voltar" size={16} />
          </button>
          <span className="flex flex-1 justify-center gap-1.5" aria-label={`Parte ${slide + 1} de ${p.slides.length}`}>
            {p.slides.map((_, i) => (
              <span key={i} className={`h-1.5 w-5 rounded-sm ${i === slide ? 'bg-ink' : 'bg-ink/15'}`} />
            ))}
          </span>
          <button className="btn-ghost !min-h-[38px] !px-3" disabled={slide === p.slides.length - 1} onClick={() => setSlide((s) => s + 1)} aria-label="Próxima parte">
            <Icon name="seta" size={16} />
          </button>
        </div>
      </div>
    );
  if (p.kind === 'exemplo' && p.md) {
    const parts = splitMarkdown(p.md);
    return (
      <div>
        <div className="space-y-2 border-l-2 border-gold pl-3">
          {parts.slice(0, steps).map((t, i) => (
            <div key={i} className="anim-tile-in">
              {md(t)}
            </div>
          ))}
        </div>
        {steps < parts.length && (
          <button className="btn-ghost mt-3 w-full text-sm" onClick={() => setSteps((s) => s + 1)}>
            Mostrar o próximo passo
          </button>
        )}
      </div>
    );
  }
  if (p.kind === 'atividade' && p.activity) {
    const answered = p.id in prefs.answers;
    return (
      <div>
        {recover === 'nao' && (
          <ActivityView
            a={p.activity}
            onNext={(o) => {
              setPrefs((x) => (p.id in x.answers ? x : { ...x, answers: { ...x.answers, [p.id]: o.ok } }));
              if (!o.ok && p.recovery) setRecover('mostrar');
            }}
          />
        )}
        {recover !== 'nao' && p.recovery && (
          <div className="space-y-3">
            <div className="rounded-md bg-raised/60 p-3">
              <p className="kicker">Vamos ver de outro jeito</p>
              {md(p.recovery.md)}
            </div>
            {recover === 'mostrar' ? <ActivityView a={p.recovery.activity} onNext={() => setRecover('feito')} /> : <p className="text-sm font-semibold text-ok">Pronto. Siga para o próximo post.</p>}
          </div>
        )}
        {answered && recover === 'nao' && <p className="mt-2 text-xs text-muted">Respondida neste aparelho.</p>}
      </div>
    );
  }
  if (p.kind === 'video' && p.video)
    return (
      <div className="space-y-1.5">
        <VideoEmbed url={p.video.url} title={p.video.title} meta={[p.video.channel, p.video.objective].join(' · ')} />
        {p.video.status === 'a-conferir' && <p className="text-xs text-muted">A conferir: título como indexado; canal e duração ainda não confirmados.</p>}
      </div>
    );
  if (p.kind === 'narrada' && p.narrated)
    return (
      <div>
        <p className="text-sm">Uma voz explica o mesmo assunto enquanto a cena se monta na tela. Com legenda, transcrição e controles; não toca sozinha.</p>
        <Link to={`/aula-narrada/${p.narrated.id}`} className="btn-primary mt-3 w-full">
          Assistir à aula narrada <Icon name="avancar" size={18} />
        </Link>
      </div>
    );
  if (p.kind === 'resumo' && p.summary)
    return (
      <ul className="space-y-1.5">
        {p.summary.map((t) => (
          <li key={t} className="flex gap-2">
            <Icon name="certo" size={16} className="mt-1 shrink-0 text-ok" /> <span>{t}</span>
          </li>
        ))}
      </ul>
    );
  return null;
}
