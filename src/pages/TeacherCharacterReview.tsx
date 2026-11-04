import { TeacherCharacter, TEACHER_SIGNATURE_POSES } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

const REVIEW_POSES = TEACHER_SIGNATURE_POSES;

/** Galeria temporária de revisão visual; acesso direto, fora da navegação principal. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
      <header className="space-y-2">
        <p className="kicker">LABORATÓRIO DE PERSONAGENS · DIREÇÃO V9</p>
        <h1 className="text-3xl font-bold">Os professores do Pórtico</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Um elenco misto de pessoas e criaturas ligadas ao universo do conhecimento. A V9 introduz espécies próprias, silhuetas animais, roupas com pequenos acabamentos e gestos de assinatura. Esta galeria continua em revisão,
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
          <li>Rostos realmente diferentes: distância e inclinação dos olhos, sobrancelhas, nariz, bochechas e expressão.</li>
          <li>Uma silhueta inferior própria: calças retas, largas, joggers, saia, vestido, casaco ou shorts, sem repetir o mesmo triângulo.</li>
          <li>Espécies variadas: capivara, castor, axolote, gato, sapo, tatu, tartaruga, papagaio e camaleão.</li>
          <li>Roupas com pequenos acabamentos funcionais: golas, costuras, bolsos, fechos, faixas e insígnias.</li>
          <li>Os detalhes reforçam a personalidade sem competir com a silhueta.</li>
        </ul>
      </section>
    </main>
  );
}
