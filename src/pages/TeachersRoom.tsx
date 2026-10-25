// Sala dos Professores (Fase 6; spec 22): posts curtos e finitos, 5 por vez, sem rolagem infinita.
// Salvar, ocultar e responder mini-desafios ficam só neste aparelho e não contam como tentativa.
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useCheckpoint } from '@/app/useCheckpoint';
import { DEFAULT_CONTEST_ID, questionsForContest, teacherPosts, teachers } from '@/content';
import { FEED_PAGE, REASON_LABEL, buildFeed, emptySala, type FeedItem, type SalaPrefs } from '@/lib/teachers';
import { Icon } from '@/components/Icon';
import { Markdown } from '@/components/Markdown';
import { PageHeader } from '@/components/Page';

const KEY = 'cronicas:sala';
const KIND: Record<string, string> = { dica: 'Dica', 'mini-desafio': 'Mini-desafio', caso: 'Caso', pegadinha: 'Pegadinha', revisao: 'Revisão' };
const TONE = (t: string) => `rgb(var(--${t}))`;

function load(): SalaPrefs {
  try {
    return { ...emptySala(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return emptySala();
  }
}

export function TeachersRoomPage() {
  const { data } = useStudy();
  const cp = useCheckpoint();
  const [prefs, setPrefs] = useState<SalaPrefs>(load);
  const [tab, setTab] = useState<'feed' | 'salvos'>('feed');
  const [shown, setShown] = useState(FEED_PAGE);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* sem armazenamento */
    }
  }, [prefs]);
  const feed = useMemo(
    () =>
      buildFeed({
        data,
        posts: teacherPosts,
        bank: questionsForContest(DEFAULT_CONTEST_ID),
        prefs,
        current: cp.unit ? { chapterId: cp.unit.chapterId, sectionId: cp.unit.sectionId } : undefined,
      }),
    [data, prefs, cp.unit],
  );
  const list = tab === 'feed' ? feed.slice(0, shown) : feed.filter((f) => prefs.saved.includes(f.post.id));
  const toggle = (k: 'saved' | 'hidden', id: string) => setPrefs((p) => ({ ...p, [k]: p[k].includes(id) ? p[k].filter((x) => x !== id) : [...p[k], id] }));

  return (
    <div className="space-y-4">
      <PageHeader area="explorar" icon="balao" title="Sala dos Professores" subtitle="Dicas curtas, pegadinhas e mini-desafios do que você estuda" />
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3" aria-label="Professores">
        {teachers.map((t) => (
          <li key={t.id} className="card flex items-center gap-3 p-3">
            <Avatar name={t.name} tone={t.tone} />
            <span className="min-w-0">
              <span className="block text-sm font-bold">{t.name}</span>
              <span className="block text-xs text-muted">{t.expertiseLabel}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">Os professores são personagens fictícios. Cada post só reforça o que a aula do trecho ensina.</p>

      <div className="grid grid-cols-2 gap-1 rounded-full bg-raised p-1 text-sm" role="tablist">
        {(['feed', 'salvos'] as const).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} className={`rounded-full py-2 font-semibold transition ${tab === k ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`} onClick={() => setTab(k)}>
            {k === 'feed' ? 'Para você' : `Salvos (${prefs.saved.length})`}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="card p-4 text-sm">{tab === 'salvos' ? 'Nada salvo ainda. Toque em "Salvar" num post para guardar aqui.' : 'Você ocultou todos os posts.'}</p>
      ) : (
        <ul className="space-y-3">
          {list.map((f, i) => (
            <li key={f.post.id} className="anim-tile-in" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
              <PostCard
                item={f}
                prefs={prefs}
                onSave={() => toggle('saved', f.post.id)}
                onHide={() => toggle('hidden', f.post.id)}
                onAnswer={(ok) => setPrefs((p) => ({ ...p, answered: { ...p.answered, [f.post.id]: ok } }))}
              />
            </li>
          ))}
        </ul>
      )}
      {tab === 'feed' && shown < feed.length && (
        <button className="btn-ghost w-full" onClick={() => setShown((n) => n + FEED_PAGE)}>
          Mostrar mais {Math.min(FEED_PAGE, feed.length - shown)}
        </button>
      )}
      {prefs.hidden.length > 0 && (
        <button className="btn-ghost w-full text-sm" onClick={() => setPrefs((p) => ({ ...p, hidden: [] }))}>
          Mostrar de novo os {prefs.hidden.length} posts ocultos
        </button>
      )}
    </div>
  );
}

function Avatar({ name, tone }: { name: string; tone: string }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold text-white" style={{ background: TONE(tone) }} aria-hidden="true">
      {name.split(' ').at(-1)![0]}
    </span>
  );
}

function PostCard({ item, prefs, onSave, onHide, onAnswer }: { item: FeedItem; prefs: SalaPrefs; onSave: () => void; onHide: () => void; onAnswer: (ok: boolean) => void }) {
  const { post, preview, reason } = item;
  const t = teachers.find((x) => x.id === post.teacherId)!;
  const answered = post.id in prefs.answered;
  const [pick, setPick] = useState<boolean>();
  const saved = prefs.saved.includes(post.id);
  const got = pick !== undefined ? pick === post.challenge?.answer : prefs.answered[post.id];
  return (
    <article className="card p-4" aria-label={post.title} data-testid={`post-${post.id}`}>
      <header className="flex items-center gap-3">
        <Avatar name={t.name} tone={t.tone} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold">
            {t.name} <span className="font-normal text-muted">· personagem fictício</span>
          </span>
          <span className="block text-xs text-muted">
            {KIND[post.kind]} · {REASON_LABEL[reason]}
          </span>
        </span>
      </header>
      <h2 className="mt-3 text-lg leading-snug">{post.title}</h2>
      <div className="mt-1">
        <Markdown>{post.body}</Markdown>
      </div>
      {post.challenge &&
        (preview ? (
          <p className="mt-2 rounded-2xl bg-raised p-3 text-sm">O mini-desafio abre depois que você estudar este trecho.</p>
        ) : (
          <div className="mt-3 rounded-2xl bg-azure/10 p-3">
            <p className="text-sm font-semibold">Certo ou errado?</p>
            <p className="mt-1">{post.challenge.statement}</p>
            {pick === undefined && !answered ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    className="btn-ghost"
                    onClick={() => {
                      setPick(v);
                      onAnswer(v === post.challenge!.answer);
                    }}
                  >
                    {v ? 'Certo' : 'Errado'}
                  </button>
                ))}
              </div>
            ) : (
              <p className={`mt-2 text-sm ${got ? 'text-ok' : 'text-bad'}`} aria-live="polite">
                <b>{got ? 'Acertou.' : 'Não é bem assim.'}</b> A afirmação está {post.challenge.answer ? 'certa' : 'errada'}. {post.challenge.why}
              </p>
            )}
          </div>
        ))}
      <footer className="mt-3 flex flex-wrap gap-2">
        <Link to={`/aprender/${post.chapterId}/${post.sectionId}`} className="btn-ghost !min-h-0 flex-1 !py-2 text-sm">
          <Icon name="grimorio" size={16} /> {preview ? 'Estudar o trecho' : 'Rever o trecho'}
        </Link>
        <button className="btn-ghost !min-h-0 !py-2 text-sm" aria-pressed={saved} onClick={onSave}>
          <Icon name={saved ? 'fitaCheia' : 'fita'} size={16} /> {saved ? 'Salvo' : 'Salvar'}
        </button>
        <button className="btn-ghost !min-h-0 !py-2 text-sm" onClick={onHide}>
          Ocultar
        </button>
      </footer>
    </article>
  );
}
