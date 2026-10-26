// Biblioteca de videoaulas (pacote v4, etapa 3): filtro por assunto e busca, player dentro do app
// (só carrega ao tocar, sem tocar sozinho) e ligação com a aula em texto do mesmo assunto. Vídeo não
// conferido aparece com aviso e a origem; nada é apresentado como curado sem conferência.
import { useMemo, useState } from 'react';
import { curatedVideos, getChapter } from '@/content';
import { VideoEmbed } from '@/components/VideoEmbed';
import { TrailPlace } from './TrailPlace';
import { Icon } from '@/components/Icon';

export function VideoLibrary() {
  const [subject, setSubject] = useState<string>('todos');
  const [q, setQ] = useState('');
  const subjects = useMemo(() => [...new Set(curatedVideos.map((v) => v.chapterId))].map((id) => ({ id, title: getChapter(id)?.title ?? id })), []);
  const list = curatedVideos.filter(
    (v) => (subject === 'todos' || v.chapterId === subject) && (!q.trim() || `${v.title} ${v.objective}`.toLowerCase().includes(q.trim().toLowerCase())),
  );
  if (!curatedVideos.length) return <p className="text-sm text-muted">Ainda não há videoaulas na biblioteca. Guarde abaixo as aulas que você já usa.</p>;
  return (
    <div className="space-y-3" data-testid="videoteca">
      <div className="flex flex-wrap items-center gap-2">
        {[{ id: 'todos', title: 'Todos os assuntos' }, ...subjects].map((s) => (
          <button key={s.id} type="button" aria-pressed={subject === s.id} onClick={() => setSubject(s.id)} className={`chip !px-3 !py-1.5 !text-sm ${subject === s.id ? '!bg-ink !text-bg' : ''}`}>
            {s.title}
          </button>
        ))}
        <input className="input !w-auto min-w-0 flex-1 !py-1.5 text-sm" placeholder="Buscar vídeo" aria-label="Buscar vídeo" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-muted">Nenhum vídeo com esse filtro.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((v) => (
            <div key={v.id} className="space-y-1.5">
              <VideoEmbed url={v.url} title={v.title} meta={[v.channel, v.duration, v.objective].filter(Boolean).join(' · ')} />
              {v.status === 'a-conferir' && (
                <p className="flex items-start gap-1.5 text-xs text-muted" data-testid="video-a-conferir">
                  <Icon name="aviso" size={14} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    <b className="text-ink">A conferir.</b> {v.source}. Título como indexado; canal e duração ainda não confirmados.
                  </span>
                </p>
              )}
              <TrailPlace lessonId={v.lessonId} className="max-w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
