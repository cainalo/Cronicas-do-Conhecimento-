import { useState } from 'react';
import { TeacherCharacter, CompanionMascots } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

type ViewMode = 'color' | 'silhouette' | 'portrait';
const VIEW_MODES: { value:ViewMode; label:string; description:string }[] = [
  { value:'color', label:'Cores', description:'A leitura completa das roupas, cabelos e rostos.' },
  { value:'silhouette', label:'Silhuetas', description:'A forma externa sem depender de cor ou acessórios.' },
  { value:'portrait', label:'Rostos', description:'A expressão, o cabelo e a identidade em tamanho de avatar.' },
];

/** V22: revisão exclusiva de arte estática. Poses e animações não entram nesta etapa. */
export function TeacherCharacterReviewPage() {
  const [view, setView] = useState<ViewMode>('color');
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:space-y-8"
      data-character-review-mode={view} data-character-review-stage="static-only">
      <header className="max-w-3xl space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · V22</p>
        <h1 className="font-title text-3xl font-bold leading-tight sm:text-4xl">Treze professores. Treze pessoas.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          A nova direção troca os antigos professores-animais por um elenco inteiramente humano.
          Cada identidade é construída com cabelo, rosto, proporções e roupa próprios, usando poucos detalhes
          e formas vetoriais orgânicas. Esta prancha avalia somente a arte estática.
        </p>
      </header>

      <section className="rounded-2xl border border-line bg-surface p-3 sm:p-4" aria-label="Leituras da arte">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-extrabold">Inspecionar os personagens</h2>
            <p className="text-xs text-muted">A silhueta precisa funcionar antes dos detalhes.</p>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Modo de visualização">
            {VIEW_MODES.map((mode) => (
              <button key={mode.value} type="button" aria-pressed={view === mode.value}
                onClick={() => setView(mode.value)}
                className={'rounded-xl border px-3 py-2 text-xs font-bold transition-colors ' + (view === mode.value
                  ? 'border-ink bg-ink text-white' : 'border-line bg-raised text-ink hover:bg-surface')}>
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted" aria-live="polite">
          {VIEW_MODES.find((mode) => mode.value === view)?.description}
        </p>
      </section>

      <section className="space-y-3" aria-label="Professores humanos do Pórtico">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-muted">Elenco principal</p>
            <h2 className="font-title text-xl font-bold">Professores humanos</h2>
          </div>
          <span className="text-xs text-muted">13 personagens · 13 identidades</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {teachers.map((teacher) => {
            const portrait = view === 'portrait';
            const silhouette = view === 'silhouette';
            return (
              <article key={teacher.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line/70 bg-surface"
                data-review-character={teacher.id}>
                <div className={'flex w-full items-end justify-center overflow-hidden ' + (portrait ? 'h-36' : 'h-52')}
                  style={{ backgroundColor:'rgb(var(--' + teacher.tone + ') / .16)' }}>
                  <div data-review-art={view} className="flex h-full w-full items-end justify-center"
                    style={{ filter:silhouette ? 'brightness(0)' : undefined }}>
                    <TeacherCharacter teacher={teacher} size={portrait ? 144 : 208} portrait={portrait} className="max-w-full"/>
                  </div>
                </div>
                <div className="min-h-[5.5rem] px-3 py-3">
                  <h3 className="text-sm font-extrabold leading-tight">{teacher.name}</h3>
                  <p className="mt-1 text-xs leading-snug text-muted">{teacher.expertiseLabel}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/80">{teacher.personalStyle}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="border-t border-line pt-6">
        <CompanionMascots/>
      </div>

      <section className="rounded-2xl border border-line bg-surface px-4 py-4 sm:px-5">
        <h2 className="font-title text-lg font-bold">Critérios de aprovação visual</h2>
        <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted sm:grid-cols-2">
          <p><strong className="text-ink">Identidade sem legenda.</strong> Cabelo, rosto e proporções distinguem cada pessoa mesmo quando a roupa fica escondida.</p>
          <p><strong className="text-ink">Formas orgânicas.</strong> O corpo não pode parecer um conjunto de círculos, retângulos ou triângulos encaixados.</p>
          <p><strong className="text-ink">Detalhe com propósito.</strong> Óculos, brincos ou objetos aparecem somente quando ajudam a contar algo sobre a pessoa.</p>
          <p><strong className="text-ink">Simplicidade equilibrada.</strong> Poucas cores, contornos limpos e rosto expressivo sem excesso de textura.</p>
          <p><strong className="text-ink">Unidade do elenco.</strong> Os treze devem pertencer à mesma família visual, sem serem variações de um único molde.</p>
          <p><strong className="text-ink">Mascotes separados.</strong> Os animais acompanham o estudante, mas não ocupam o papel de educador.</p>
        </div>
      </section>
    </main>
  );
}
