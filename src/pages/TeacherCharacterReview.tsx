import { TeacherCharacter, TEACHER_SIGNATURE_POSES } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

/** Prancha de arte: acesso direto, fora da navegação principal. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:space-y-7">
      <header className="max-w-3xl space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · DIREÇÃO V17</p>
        <h1 className="font-title text-3xl font-bold leading-tight sm:text-4xl">Uma comunidade. Treze personalidades.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Cada professor tem uma silhueta, um rosto, uma maneira de se mover e um jeito próprio de ensinar.
          O elenco usa uma linguagem vetorial compartilhada, mas não um molde corporal único. Cada personalidade também tem um gesto e um ritmo de repouso próprios.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4" aria-label="Os treze personagens do Pórtico">
        {teachers.map((teacher) => (
          <article
            key={teacher.id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line/70 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .11)' }}
          >
            <div
              className="relative flex h-[13.25rem] w-full items-end justify-center overflow-hidden pt-2 sm:h-[15rem]"
              style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .2)' }}
            >
              <TeacherCharacter
                teacher={teacher}
                pose={TEACHER_SIGNATURE_POSES[teacher.id] ?? 'presenting'}
                size={218}
                className="max-w-full"
              />
            </div>
            <div className="flex min-h-[6.6rem] flex-1 flex-col bg-surface/95 px-3 py-3 sm:px-3.5">
              <h2 className="text-sm font-extrabold leading-tight sm:text-base">{teacher.name}</h2>
              <p className="mt-1 text-[.68rem] font-semibold leading-snug text-muted sm:text-xs">{teacher.expertiseLabel}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/85">{teacher.motto ?? teacher.biography}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-line bg-surface px-4 py-4 sm:px-5">
        <h2 className="font-title text-lg font-bold">A linguagem visual do elenco</h2>
        <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted sm:grid-cols-2">
          <p><strong className="text-ink">Leitura em um segundo.</strong> Silhueta, rosto e gesto precisam ser reconhecidos sem depender de acessórios pequenos.</p>
          <p><strong className="text-ink">Rostos com intenção.</strong> Pálpebras, direção das pupilas e sobrancelhas mudam de personagem para personagem.</p>
          <p><strong className="text-ink">Espécies de verdade.</strong> Patas, asas, cascos, caudas e proporções pertencem à anatomia de cada personagem.</p>
          <p><strong className="text-ink">Uma família original.</strong> Formas arredondadas, cor chapada e acabamento coerente unem o elenco sem copiar personagens existentes.</p>
        </div>
      </section>
    </main>
  );
}
