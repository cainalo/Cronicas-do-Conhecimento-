import { useState } from 'react';
import { TeacherCharacter, TEACHER_SIGNATURE_POSES, type TeacherPose } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

type RenderMode = 'color' | 'silhouette' | 'portrait';
type PoseMode = 'signature' | 'presenting' | 'thinking' | 'celebrating';

const RENDER_MODES: { value: RenderMode; label: string; description: string }[] = [
  { value: 'color', label: 'Coloridos', description: 'Personagens em corpo inteiro, com cores e detalhes' },
  { value: 'silhouette', label: 'Silhuetas', description: 'Apenas as formas externas, sem depender de cores' },
  { value: 'portrait', label: 'Retratos', description: 'Rostos e acessórios em tamanho de avatar' },
];

const POSE_MODES: { value: PoseMode; label: string }[] = [
  { value: 'signature', label: 'Assinatura' },
  { value: 'presenting', label: 'Apresentando' },
  { value: 'thinking', label: 'Pensando' },
  { value: 'celebrating', label: 'Comemorando' },
];

function teacherPose(id: string, mode: PoseMode): TeacherPose {
  return mode === 'signature' ? (TEACHER_SIGNATURE_POSES[id] ?? 'presenting') : mode;
}

/** Prancha viva de arte: comparação de silhuetas, retratos e linguagem corporal. */
export function TeacherCharacterReviewPage() {
  const [renderMode, setRenderMode] = useState<RenderMode>('color');
  const [poseMode, setPoseMode] = useState<PoseMode>('signature');

  return (
    <main
      className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:space-y-7"
      data-character-review-mode={renderMode}
      data-character-review-pose={poseMode}
    >
      <header className="max-w-3xl space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · DIREÇÃO V21</p>
        <h1 className="font-title text-3xl font-bold leading-tight sm:text-4xl">Uma comunidade. Treze personalidades.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          A meta desta rodada é fazer cada personagem funcionar antes dos detalhes: a silhueta precisa ser reconhecível,
          o rosto deve transmitir intenção e o gesto precisa combinar com a personalidade. O contorno externo e o olhar agora seguem regras compartilhadas. Compare o elenco inteiro
          nos mesmos enquadramentos e poses — sem aprovar um desenho apenas porque ele é diferente dos outros.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-line bg-surface p-3 sm:p-4" aria-label="Controles de revisão visual">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-extrabold">Como olhar para o elenco</h2>
            <p className="text-xs text-muted">Mude o enquadramento e compare os mesmos personagens.</p>
          </div>
          <p className="text-xs font-semibold text-muted">13 personagens · 3 leituras · 4 poses · contorno comum</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-muted">Enquadramento</p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Enquadramento dos personagens">
              {RENDER_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  aria-pressed={renderMode === mode.value}
                  onClick={() => setRenderMode(mode.value)}
                  className={'rounded-xl border px-3 py-2 text-xs font-bold transition-colors ' + (renderMode === mode.value
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-raised text-ink hover:bg-surface')}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted" aria-live="polite">
              {RENDER_MODES.find((mode) => mode.value === renderMode)?.description}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-muted">Linguagem corporal</p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pose dos personagens">
              {POSE_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  aria-pressed={poseMode === mode.value}
                  onClick={() => setPoseMode(mode.value)}
                  className={'rounded-xl border px-3 py-2 text-xs font-bold transition-colors ' + (poseMode === mode.value
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-raised text-ink hover:bg-surface')}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted">
              “Assinatura” preserva o gesto de cada professor; as outras opções aplicam a mesma pose aos treze.
            </p>
          </div>
        </div>
      </section>

      <section
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4"
        aria-label="Os treze personagens do Pórtico"
      >
        {teachers.map((teacher) => {
          const pose = teacherPose(teacher.id, poseMode);
          const portrait = renderMode === 'portrait';
          const silhouette = renderMode === 'silhouette';
          return (
            <article
              key={teacher.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line/70 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .11)' }}
              data-review-character={teacher.id}
            >
              <div
                className={'relative flex w-full items-center justify-center overflow-hidden ' + (portrait ? 'h-40' : 'h-[14.5rem]')}
                style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .2)' }}
              >
                <div
                  data-review-art={renderMode}
                  className="flex h-full w-full items-center justify-center"
                  style={{ filter: silhouette ? 'brightness(0)' : undefined }}
                >
                  <TeacherCharacter
                    teacher={teacher}
                    pose={pose}
                    size={portrait ? 144 : 220}
                    portrait={portrait}
                    className="max-w-full"
                  />
                </div>
              </div>
              <div className="flex min-h-[6.6rem] flex-1 flex-col bg-surface/95 px-3 py-3 sm:px-3.5">
                <h2 className="text-sm font-extrabold leading-tight sm:text-base">{teacher.name}</h2>
                <p className="mt-1 text-[.68rem] font-semibold leading-snug text-muted sm:text-xs">{teacher.expertiseLabel}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/85">{teacher.motto ?? teacher.biography}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-line bg-surface px-4 py-4 sm:px-5">
        <h2 className="font-title text-lg font-bold">Critérios desta comparação</h2>
        <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted sm:grid-cols-2">
          <p><strong className="text-ink">Leitura em um segundo.</strong> A forma externa precisa identificar a espécie e a personalidade mesmo sem cor, texto ou acessório.</p>
          <p><strong className="text-ink">Peso visual equilibrado.</strong> Um animal quadrúpede pode ser baixo e horizontal, mas não deve parecer menor ou menos importante que os personagens em pé.</p>
          <p><strong className="text-ink">Expressão intencional.</strong> Olhos, pálpebras, sobrancelhas, boca e direção do olhar precisam criar emoções diferentes e legíveis.</p>
          <p><strong className="text-ink">Gestos com personalidade.</strong> As quatro poses permitem comparar se cada corpo comunica a ação sem perder sua anatomia.</p>
          <p><strong className="text-ink">Família consistente.</strong> Contorno, acabamento, proporção, contraste e simplicidade devem pertencer ao mesmo universo visual.</p>
          <p><strong className="text-ink">Detalhes com função.</strong> Roupa, objetos e insígnias reforçam a história do professor, mas não podem salvar uma silhueta fraca.</p>
        </div>
      </section>
    </main>
  );
}
