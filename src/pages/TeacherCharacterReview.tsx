import { TeacherCharacter } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

/** Galeria temporária de revisão visual; acesso direto, fora da navegação principal. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
      <header className="space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · DIREÇÃO V4</p>
        <h1 className="text-3xl font-bold">Os professores do Pórtico</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Estudos de silhueta, rosto, cabelo e postura. Esta galeria é uma etapa de revisão,
          ainda não representa uma família aprovada.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-label="Galeria dos treze professores">
        {teachers.map((teacher, index) => (
          <article
            key={teacher.id}
            className="flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-line/70"
            style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .14)' }}
          >
            <div className="flex h-48 w-full items-end justify-center overflow-hidden pt-3">
              <TeacherCharacter
                teacher={teacher}
                pose={index % 4 === 0 ? 'greeting' : index % 4 === 1 ? 'presenting' : index % 4 === 2 ? 'thinking' : 'celebrating'}
                size={178}
              />
            </div>
            <div className="w-full bg-surface/85 px-2 py-2.5 text-center">
              <h2 className="text-sm font-extrabold leading-tight">{teacher.name}</h2>
              <p className="mt-1 line-clamp-2 text-[.68rem] leading-snug text-muted">{teacher.expertiseLabel}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4">
        <h2 className="font-bold">Critérios desta rodada</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>Uma silhueta própria e identificável antes de qualquer detalhe.</li>
          <li>Corpo e roupa como massas gráficas simples, sem anatomia realista em miniatura.</li>
          <li>Olhos expressivos, poucos traços faciais e gestos legíveis em celular.</li>
          <li>Pés destacados e proporções exageradas, mas coerentes entre o elenco.</li>
          <li>Diferenças reais entre os professores: cabeça, cabelo, corpo, expressão e postura.</li>
        </ul>
      </section>
    </main>
  );
}
