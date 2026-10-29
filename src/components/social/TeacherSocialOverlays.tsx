import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { FictionalTeacher } from '@/content/teachers';
import type { IllustrationName } from '@/components/Illustration';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { Illustration } from '@/components/Illustration';
import { Icon } from '@/components/Icon';

export interface TeacherStory {
  id: string;
  teacherId: string;
  title: string;
  text: string;
  art: IllustrationName;
  song: string;
  songUrl: string;
  linkTitle: string;
  linkUrl: string;
}

export function TeacherSocialModal({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', keydown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', keydown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[90] grid items-end overflow-y-auto bg-ink/55 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-label={label} className="max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-line bg-surface p-5 shadow-xl sm:mx-auto sm:max-w-xl sm:rounded-2xl">
        {children}
      </section>
    </div>,
    document.body,
  );
}

export function TeacherStoryViewer({ story, teacher, onClose, onProfile }: { story: TeacherStory; teacher: FictionalTeacher; onClose: () => void; onProfile: () => void }) {
  const [showSong, setShowSong] = useState(false);
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink px-3 py-4 text-bg" role="dialog" aria-modal="true" aria-label={'Story de ' + teacher.name}>
      <div className="flex h-[min(88dvh,52rem)] w-full max-w-md flex-col overflow-hidden rounded-[1.5rem] border border-bg/20 shadow-2xl" style={{ background: 'linear-gradient(160deg,rgb(var(--' + teacher.tone + ')),rgb(var(--teal)),#102c33)' }}>
        <div className="flex gap-1 p-3" aria-hidden="true"><span className="h-1 flex-1 rounded-full bg-bg"/><span className="h-1 flex-1 rounded-full bg-bg/30"/></div>
        <div className="flex items-center gap-3 px-4 pb-2">
          <button type="button" onClick={onProfile}><TeacherAvatar t={teacher} size={40} ring/></button>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{teacher.name}</p><p className="text-xs text-bg/70">{story.title} · hoje</p></div>
          <button type="button" onClick={onClose} aria-label="Fechar story" className="grid h-9 w-9 place-items-center rounded-full bg-bg/15"><Icon name="errado" size={21}/></button>
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-5 text-center">
          <div className="absolute inset-0 opacity-20"><Illustration name={story.art} className="h-full w-full text-bg" animate={false}/></div>
          <div className="relative grid h-48 w-full place-items-center"><Illustration name={story.art} className="h-44 w-auto max-w-full text-bg"/></div>
          <h2 className="relative mt-2 font-title text-3xl leading-tight">{story.title}</h2>
          <p className="relative mt-3 max-w-sm text-base leading-relaxed text-bg/90">{story.text}</p>
          <div className="relative mt-4 w-full rounded-xl border border-bg/20 bg-black/20 p-3 text-left">
            <div className="flex items-center gap-2"><Icon name="alaude" size={18}/><div className="min-w-0 flex-1"><p className="text-[0.65rem] uppercase tracking-wide text-bg/60">Trilha sonora sugerida</p><p className="truncate text-sm font-semibold">{story.song}</p></div><button type="button" onClick={() => setShowSong((value) => !value)} aria-expanded={showSong} aria-label="Detalhes da música"><Icon name="play" size={17}/></button></div>
            {showSong && <a href={story.songUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline">Abrir busca de música em nova aba</a>}
          </div>
          <a href={story.linkUrl} target="_blank" rel="noreferrer" className="relative mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-bg px-4 py-2 text-sm font-semibold text-ink"><span className="truncate">{story.linkTitle}</span><Icon name="seta" size={16}/></a>
        </div>
        <div className="flex items-center justify-between border-t border-bg/15 px-4 py-3 text-xs text-bg/75"><span>Story educativo simulado</span><button type="button" onClick={onClose} className="font-semibold text-bg">Concluir</button></div>
      </div>
    </div>,
    document.body,
  );
}
