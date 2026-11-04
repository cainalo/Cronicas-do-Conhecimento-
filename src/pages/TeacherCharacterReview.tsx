import { TeacherCharacter, type TeacherPose } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

const REVIEW_POSES: Record<string, TeacherPose> = {
  'prof.clara': 'presenting',
  'prof.lia': 'hands-on-hips',
  'prof.davi': 'listening',
  'prof.iara': 'shrug',
  'prof.nina': 'thinking',
  'prof.ravi': 'celebrating',
  'prof.mateus': 'arms-down',
  'prof.marina': 'greeting',
  'prof.beatriz': 'hands-on-hips',
  'prof.sofia': 'celebrating',
  'prof.helena': 'listening',
  'prof.augusto': 'arms-down',
  'prof.caio': 'greeting',
};

/** Galeria temporária de revisão visual; acesso direto, fora da navegação principal. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
      <header className="space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · DIREÇÃO V6</p>
        <h1 className="text-3xl font-bold">Os professores do Pórtico</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Estudos de silhueta, proporção da cabeça, olhos, boca, cintura, roupas e gestos próprios. Esta galeria é uma etapa de revisão,
          ainda não representa uma família aprovada.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-label="Galeria dos treze professores">
        {teachers.map((teacher) => (
          <article
            key={teacher.id}
            className="flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-line/70"
            style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .14)' }}
          >
            <div className="flex h-48 w-full items-end justify-center overflow-hidden pt-3">
              <TeacherCharacter
                teacher={teacher}
                pose={REVIEW_POSES[teacher.id] ?? 'presenting'}
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
          <li>Tronco, quadril e parte inferior da roupa formam silhuetas legíveis e diferentes.</li>
          <li>Olhos expressivos, poucos traços faciais e gestos legíveis em celular.</li>
          <li>Pés separados das pernas por espaço negativo, sem parecerem presos ao corpo.</li>
          <li>Diferenças reais entre os professores: cabeça, cabelo, corpo, olhos, boca e gesto-assinatura.</li>
        </ul>
      </section>
    </main>
  );
}
