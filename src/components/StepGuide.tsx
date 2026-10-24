// "Onde estou": mostra em que parte do estudo a pessoa está (livro, capítulo, trecho), os passos do
// trecho (Aprender, Praticar, Missão e o Desafio do capítulo), o que acontece agora e o que vem
// depois. Compacto por padrão; tocar em "Entender esta etapa" abre a explicação.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getChapter, getGrimoire } from '@/content';
import { useStudy } from '@/app/StudyProvider';
import { chapterStops } from '@/components/Trail';
import { Icon } from '@/components/Icon';

export type StepKind = 'aprender' | 'praticar' | 'missao' | 'desafio' | 'texto';

const NOW: Record<StepKind, string> = {
  aprender:
    'Você está lendo a explicação simples deste trecho, uma ideia por página. Leia com calma e vire a página quando entender. No fim há as palavras novas e três perguntas sem nota.',
  praticar:
    'Você vai treinar o que acabou de ler. Começa fácil (verdadeiro ou falso, palavras novas) e termina com questões no estilo da prova. Errou? Sem problema: a atividade volta no fim, até você acertar.',
  missao:
    'Você vai usar o que aprendeu numa investigação do Arquivo: assiste à cena, recebe os objetivos, faz o laboratório, treina, responde uma questão de prova e decide o que fazer com o achado.',
  desafio:
    'Este é o desafio do capítulo, no nível da prova: alguns cartões de resumo e depois questões com correção comentada. As que você errar vão para a revisão.',
  texto:
    'Este é o texto completo do capítulo, mais longo e mais difícil. Use para aprofundar depois do Aprender e do Praticar. Não é obrigatório para seguir a trilha.',
};

const LABEL: Record<string, string> = { read: 'Aprender', practice: 'Praticar', mission: 'Missão', lesson: 'Desafio' };
const KIND: Record<StepKind, string> = { aprender: 'read', praticar: 'practice', missao: 'mission', desafio: 'lesson', texto: 'read' };

export function StepGuide({ chapterId, sectionId, current, open: startOpen = false }: { chapterId: string; sectionId?: string; current: StepKind; open?: boolean }) {
  const { data } = useStudy();
  const [open, setOpen] = useState(startOpen);
  const chapter = getChapter(chapterId);
  if (!chapter) return null;
  const grimoire = getGrimoire(chapter.grimoireId);
  const idx = sectionId ? chapter.sections.findIndex((s) => s.id === sectionId) : -1;
  const section = idx >= 0 ? chapter.sections[idx] : undefined;
  const all = chapterStops(chapter, data);
  // Passos deste trecho e, por fim, o desafio do capítulo.
  const steps = all.filter((s) => (sectionId && s.key.startsWith(`${chapter.id}:${sectionId}:`)) || s.kind === 'lesson');
  const curIdx = steps.findIndex((s) => s.kind === KIND[current] && (s.kind === 'lesson' || current !== 'desafio'));
  const next = steps.slice(curIdx + 1).find((s) => !s.done) ?? (idx >= 0 && idx + 1 < chapter.sections.length ? { label: `Próximo trecho: ${chapter.sections[idx + 1].title.replace(/^\d+\.\s*/, '')}`, to: `/aprender/${chapter.id}/${chapter.sections[idx + 1].id}` } : undefined);

  return (
    <div className="guide-bar rounded-2xl px-3 py-2 text-sm" role="region" aria-label="Onde você está">
      <div className="flex items-center gap-2">
        <Icon name="mapa" size={16} className="shrink-0 text-ember" />
        <p className="min-w-0 flex-1 truncate text-[0.8rem]">
          <span className="text-muted">{grimoire?.title} › Cap. {chapter.number}</span>
          {section && (
            <>
              {' '}
              › <b>Trecho {idx + 1} de {chapter.sections.length}</b>
            </>
          )}
        </p>
        <button type="button" className="shrink-0 rounded-full px-2 py-0.5 text-[0.75rem] font-semibold text-ember underline" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Fechar' : 'Entender esta etapa'}
        </button>
      </div>
      <ol className="mt-1.5 flex flex-nowrap items-center gap-1 overflow-hidden whitespace-nowrap" aria-label="Passos">
        {steps.map((s, i) => {
          const here = i === curIdx;
          return (
            <li key={s.key} className="flex shrink-0 items-center gap-1">
              {i > 0 && <span className="text-muted" aria-hidden="true">›</span>}
              <span className={`rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${here ? 'bg-ember text-[rgb(var(--bg))]' : s.done ? 'bg-gold/20 text-gold' : 'bg-raised text-muted'}`} aria-current={here ? 'step' : undefined}>
                {s.done && !here ? '✓ ' : ''}
                {LABEL[s.kind]}
                {s.kind === 'lesson' ? ' do capítulo' : ''}
              </span>
            </li>
          );
        })}
        {current === 'texto' && <li className="rounded-full bg-ember px-2 py-0.5 text-[0.72rem] font-semibold text-[rgb(var(--bg))]">Texto completo</li>}
      </ol>
      {open && (
        <div className="anim-toast-in mt-2 space-y-1.5 border-t border-line/60 pt-2">
          <p>
            <b>O que acontece agora.</b> {NOW[current]}
          </p>
          {section && <p className="text-muted">Trecho: {section.title.replace(/^\d+\.\s*/, '')}.</p>}
          {next && (
            <p>
              <b>Depois:</b>{' '}
              <Link to={next.to} className="underline">
                {next.label}
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
