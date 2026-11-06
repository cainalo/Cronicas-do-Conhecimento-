import { TeacherCharacter, TEACHER_FACE_EXPRESSIONS, TEACHER_SIGNATURE_POSES } from '@/components/TeacherCharacter';
import { teachers } from '@/content';

/** Prancha de auditoria de silhuetas e personagens completos. */
export function TeacherCharacterReviewPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6" data-review-version="v18">
      <header className="space-y-2">
        <p className="kicker">PÓRTICO · ESTÚDIO DE PERSONAGENS · V18</p>
        <h1 className="text-3xl font-bold">Os professores do Pórtico</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Nesta rodada, os treze rostos receberam desenhos individuais: formato dos olhos, sobrancelhas, boca e marcas pessoais. As geometrias corporais e as silhuetas aprovadas na V17 foram preservadas. O foco agora é reconhecer a personalidade em tamanho de avatar, sem depender do nome ou da disciplina.
        </p>
      </header>

      <section className="space-y-3" aria-label="Teste de reconhecimento pelas silhuetas">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><p className="kicker">TESTE 01 · SEM DETALHES</p><h2 className="text-xl font-bold">Reconheça pela silhueta</h2></div>
          <p className="max-w-xs text-xs text-muted">Uma cor, sem olhos, pele, cabelo colorido, acessórios ou estampas.</p>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 lg:grid-cols-7">
          {teachers.map((teacher) => (
            <article key={teacher.id} data-silhouette-id={teacher.id} className="flex min-w-0 flex-col items-center">
              <div className="flex h-36 w-full items-end justify-center rounded-xl bg-[#F1EDE5] px-1 pt-2">
                <TeacherCharacter teacher={teacher} silhouette size={128}/>
              </div>
              <h3 className="mt-1.5 text-center text-xs font-bold leading-tight">{teacher.name.replace(/^(Professora|Professor) /, '')}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3" aria-label="Prancha de rostos e expressões">
        <div><p className="kicker">TESTE 02 · ROSTOS EM TAMANHO DE AVATAR</p><h2 className="text-xl font-bold">Treze expressões, treze personalidades</h2><p className="text-xs text-muted">Compare sobrancelhas, olhos, boca e marcas pessoais sem depender das roupas.</p></div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {teachers.map((teacher) => (
            <article key={teacher.id} data-face-id={teacher.id} className="flex min-w-0 flex-col items-center rounded-xl border border-line/70 bg-surface p-2 text-center">
              <TeacherCharacter teacher={teacher} portrait size={104}/>
              <h3 className="mt-1 text-xs font-bold leading-tight">{teacher.name.replace(/^(Professora|Professor) /, '')}</h3>
              <p className="mt-1 text-[.65rem] leading-snug text-muted">{TEACHER_FACE_EXPRESSIONS[teacher.id]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3" aria-label="Contrastes definidos na V18">
        <div><p className="kicker">TESTE 01B · IDENTIDADE DE CADA DUPLA</p><h2 className="text-xl font-bold">Quatro contrastes de personalidade</h2></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <article className="rounded-xl border border-line/70 bg-surface p-3"><h3 className="font-bold">Clara × Sofia</h3><p className="mt-1 text-sm text-muted">Clara: gesto assimétrico e postura de orientação. Sofia: braços erguidos em V, cabelo longo em movimento e corpo mais leve.</p></article>
          <article className="rounded-xl border border-line/70 bg-surface p-3"><h3 className="font-bold">Davi × Ravi</h3><p className="mt-1 text-sm text-muted">Davi: tórax muito largo, braços pesados e base firme. Ravi: cintura estreita, pernas mais longas e gesto atlético.</p></article>
          <article className="rounded-xl border border-line/70 bg-surface p-3"><h3 className="font-bold">Iara × Helena</h3><p className="mt-1 text-sm text-muted">Iara: trança lateral única e veste assimétrica mais estreita. Helena: locs espessos em vários comprimentos e túnica de maior volume.</p></article>
          <article className="rounded-xl border border-line/70 bg-surface p-3"><h3 className="font-bold">Mateus × Augusto</h3><p className="mt-1 text-sm text-muted">Mateus: abdômen arredondado, cabelo cheio e postura compacta. Augusto: ombros caídos, barba grisalha e bengala.</p></article>
        </div>
      </section>

      <section className="space-y-3" aria-label="Personagens completos em cores">
        <div><p className="kicker">TESTE 02 · DESENHO COMPLETO</p><h2 className="text-xl font-bold">Os mesmos professores em cores</h2><p className="text-xs text-muted">Nas oito revisadas, a cor é aplicada sobre a mesma anatomia vetorial usada na prancha preta.</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <article key={teacher.id} data-teacher-id={teacher.id} className="flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-line/70" style={{ backgroundColor: 'rgb(var(--' + teacher.tone + ') / .14)' }}>
              <div className="flex h-52 w-full items-end justify-center overflow-hidden pt-3"><TeacherCharacter teacher={teacher} pose={TEACHER_SIGNATURE_POSES[teacher.id]} size={188}/></div>
              <div className="w-full bg-surface/90 px-2.5 py-3 text-center"><h3 className="text-sm font-extrabold leading-tight">{teacher.name}</h3><p className="mt-1 line-clamp-2 text-[.68rem] leading-snug text-muted">{teacher.expertiseLabel}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4">
        <h2 className="font-bold">Critérios de aprovação da etapa</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>Cada silhueta precisa ter um contorno dominante diferente, legível sem cor ou rosto.</li>
          <li>Variar de forma intencional: alto/baixo, largo/estreito, redondo/angular, compacto/alongado.</li>
          <li>Não repetir a mesma cabeça, ombro, cintura e comprimento de pernas em todo o elenco.</li>
          <li>Os vazios entre braços, tronco e pernas também fazem parte da identidade.</li>
          <li>Manter coerência entre a prancha preta e o desenho colorido do mesmo professor.</li>
          <li>Preservar diversidade de tons de pele, idades aparentes, corpos, cabelos e personalidades.</li>
          <li>Usar poucas formas vetoriais orgânicas; cada detalhe precisa melhorar leitura ou personalidade.</li>
          <li>Não copiar personagens, desenhos, poses proprietárias ou ativos do Duolingo.</li>
          <li>Esta etapa continua estática: animações só começam depois da aprovação dos desenhos.</li>
        </ul>
      </section>
    </main>
  );
}