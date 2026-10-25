// Sala dos Professores, agora feed didático (pacote v4, etapa 4): o currículo em posts curtos, na
// ordem da trilha, assinados por professores fictícios. Os posts vêm das próprias aulas em texto.
// Ações com função real e privadas: Entendi, Preciso rever, Guardar, anotação e dúvida guardada.
// Responder posts não conclui a aula; só "Concluir esta aula", depois de todas as checagens.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { feedLessons, feedPostsOf, getChapter, microSeries, teacherForChapter } from '@/content';
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
            <PostCard post={p} teacher={teacher} prefs={prefs} setPrefs={setPrefs} lesson={lesson} done={done} canFinish={canFinish} onFinish={finish} />
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
    </div>
  );
}

function PostCard({
  post: p,
  teacher,
  prefs,
  setPrefs,
  lesson,
  done,
  canFinish,
  onFinish,
}: {
  post: FeedPost;
  teacher: ReturnType<typeof teacherForChapter>;
  prefs: FeedPrefs;
  setPrefs: (f: (p: FeedPrefs) => FeedPrefs) => void;
  lesson: MicroLesson;
  done: boolean;
  canFinish: boolean;
  onFinish: () => void;
}) {
  const r = prefs.react[p.id] ?? {};
  const toggle = (k: 'entendi' | 'rever' | 'salvo') => setPrefs((x) => ({ ...x, react: { ...x.react, [p.id]: { ...x.react[p.id], [k]: !x.react[p.id]?.[k] } } }));
  const [open, setOpen] = useState<'nota' | 'duvida' | null>(null);
  const tip = p.kind === 'dica' && p.tip ? teacherForChapter(p.tip.chapterId) : teacher;
  return (
    <article className="card p-4 sm:p-5" aria-label={p.title} data-testid={`post-${p.id}`}>
      <header className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-title text-lg font-semibold text-white" style={{ background: `rgb(var(--${tip.tone}))` }} aria-hidden="true">
          {tip.name.split(' ').at(-1)![0]}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">
            {tip.name} <span className="font-normal text-muted">· personagem fictício</span>
          </span>
          <span className="block text-xs text-muted">{KIND[p.kind]}</span>
        </span>
      </header>
      <h2 className="mt-3 text-[1.3rem] leading-snug">{p.title}</h2>
      <div className="mt-2">
        <PostBody p={p} prefs={prefs} setPrefs={setPrefs} />
      </div>
      {p.kind === 'resumo' && (
        <div className="mt-3 rounded-md border border-line p-3 text-sm">
          {done ? (
            <p className="font-semibold text-ok">Aula concluída na trilha.</p>
          ) : canFinish ? (
            <button className="btn-primary w-full" onClick={onFinish} data-testid="feed-concluir">
              Concluir esta aula na trilha
            </button>
          ) : (
            <p className="text-muted">Para concluir a aula na trilha, responda as checagens de "{lesson.title}" no feed.</p>
          )}
          <Link to={`/aprender/${lesson.chapterId}/${lesson.sectionId}${microSeries(lesson.chapterId, lesson.sectionId).length > 1 ? `/${lesson.id}` : ''}`} className="mt-2 inline-flex items-center gap-1 font-semibold text-gold">
            <span className="link-grow">Abrir a aula completa</span> <Icon name="avancar" size={15} />
          </Link>
        </div>
      )}
      <footer className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3 text-[0.8rem]">
        <ActionBtn on={!!r.entendi} onClick={() => toggle('entendi')} icon="certo" label="Entendi" />
        <ActionBtn on={!!r.rever} onClick={() => toggle('rever')} icon="revisar" label="Preciso rever" />
        <ActionBtn on={!!r.salvo} onClick={() => toggle('salvo')} icon={r.salvo ? 'fitaCheia' : 'fita'} label="Guardar" />
        <ActionBtn on={open === 'nota' || !!prefs.notes[p.id]} onClick={() => setOpen(open === 'nota' ? null : 'nota')} icon="pena" label="Anotar" />
        <ActionBtn on={open === 'duvida' || !!prefs.questions[p.id]} onClick={() => setOpen(open === 'duvida' ? null : 'duvida')} icon="balao" label="Dúvida" />
      </footer>
      {open && (
        <label className="mt-2 block text-sm">
          <span className="text-muted">{open === 'nota' ? 'Sua anotação (só neste aparelho).' : 'Guarde a dúvida para levar ao seu professor ou rever depois. Não há resposta automática.'}</span>
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
    </article>
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
