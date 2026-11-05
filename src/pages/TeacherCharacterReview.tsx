import { TeacherCharacter, TEACHER_SIGNATURE_POSES } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

/** Prancha estática de revisão do elenco; acesso direto, fora da navegação principal. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-5 px-4 py-6">
      <header className="space-y-2">
        <p className="kicker">PÓRTICO · ESTÚDIO DE PERSONAGENS · V15</p>
        <h1 className="text-3xl font-bold">Os professores do Pórtico</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Treze professores humanos, cada um com uma silhueta desenhada individualmente.
          A família compartilha uma linguagem de ilustração vetorial simples, expressiva e
          colorida; cabelos, proporções, roupas, rostos e posturas dão identidade própria
          a cada pessoa. Esta prancha avalia o desenho estático, antes de qualquer animação.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-label="Galeria dos treze professores humanos">
        {teachers.map((teacher) => (
          <article
            key={teacher.id}
            data-teacher-id={teacher.id}
            className="flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-line/70"
            style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .14)' }}
          >
            <div className="flex h-52 w-full items-end justify-center overflow-hidden pt-3">
              <TeacherCharacter
                teacher={teacher}
                pose={TEACHER_SIGNATURE_POSES[teacher.id]}
                size={188}
              />
            </div>
            <div className="w-full bg-surface/90 px-2.5 py-3 text-center">
              <h2 className="text-sm font-extrabold leading-tight">{teacher.name}</h2>
              <p className="mt-1 line-clamp-2 text-[.68rem] leading-snug text-muted">{teacher.expertiseLabel}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4">
        <h2 className="font-bold">Critérios de avaliação desta etapa</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>Silhueta reconhecível mesmo sem rosto, acessórios ou detalhes internos.</li>
          <li>Proporções e contorno corporal próprios; não parecer o mesmo boneco com roupa e cabelo trocados.</li>
          <li>Diversidade humana real: tons de pele, idades aparentes, cabelos, biotipos e presença corporal.</li>
          <li>Rosto simples e expressivo, com leitura clara em tamanho de avatar.</li>
          <li>Roupa de poucas massas de cor; acessórios só quando ajudam a reconhecer a pessoa.</li>
          <li>Paleta viva e coerente, contornos orgânicos e formas vetoriais limpas, sem acabamento de desenho improvisado.</li>
          <li>Personalidade percebida pela pose, expressão e silhueta, não por texto ou excesso de objetos.</li>
          <li>Todos os treze professores são humanos; não há animais, mascotes ou anatomias híbridas.</li>
          <li>Referência de linguagem visual, não de personagens: não reproduzir Duo, o elenco nem ativos do Duolingo.</li>
          <li>Esta fase aprova a identidade estática; animações, ciclos e gestos secundários ficam para uma etapa posterior.</li>
        </ul>
      </section>
    </main>
  );
}
