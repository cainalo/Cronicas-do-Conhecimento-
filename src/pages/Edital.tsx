import { Link } from 'react-router-dom';
import { DEFAULT_CONTEST_ID, chapters, getContest, questionsForContest } from '@/content';
import type { SourceStatus } from '@/content/types';

const statusLabel: Record<SourceStatus, { t: string; c: string }> = {
  'oficial-verificado': { t: 'Oficial verificado', c: 'text-ok border-ok/50' },
  'fonte-secundaria': { t: 'Fonte secundária', c: 'text-gold border-gold/50' },
  'nao-confirmado': { t: 'Não confirmado', c: 'text-bad border-bad/50' },
};
const Status = ({ s }: { s: SourceStatus }) => <span className={`chip ${statusLabel[s].c}`}>{statusLabel[s].t}</span>;

export function EditalPage() {
  const c = getContest(DEFAULT_CONTEST_ID)!;
  const bank = questionsForContest(c.id);
  return (
    <div className="space-y-5">
      <Link to="/progresso" className="text-sm text-muted">
        Voltar ao progresso
      </Link>
      <h1 className="text-xl text-gold">Edital do {c.name}</h1>
      <p className="rounded-sm border border-ok/50 p-3 text-sm">
        Dados conferidos no <b>Edital nº 01/2026 retificado (versão consolidada de 15/09/2026)</b>. A cobertura do material ainda <b>não é integral</b>: veja abaixo o
        que já tem grimório e questões.
      </p>
      <section className="card p-4">
        <h2 className="mb-1 text-base">{c.role}</h2>
        <p className="mb-3 text-sm text-muted">Banca: {c.board}</p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="space-y-2">
        <h2 className="text-base">Provas</h2>
        {c.exam.map((e) => (
          <div key={e.title} className="card p-3 text-sm">
            <div className="flex justify-between gap-2">
              <b>{e.title}</b>
              <Status s={e.status} />
            </div>
            <p className="mt-1 text-muted">{e.detail}</p>
          </div>
        ))}
      </section>
      <section className="space-y-2">
        <h2 className="text-base">Disciplinas e cobertura</h2>
        {(['gerais', 'especificos'] as const).map((block) => (
          <div key={block} className="space-y-2">
            <h3 className="text-sm text-muted">{block === 'gerais' ? 'Conhecimentos Gerais (25 questões, peso 1)' : 'Conhecimentos Específicos (45 questões, peso 2)'}</h3>
            {c.disciplines
              .filter((d) => d.block === block)
              .map((d) => (
                <div key={d.id} className="card p-3 text-sm">
                  <p>
                    <b>{d.title}</b>
                    {d.questions !== undefined && (
                      <span className="text-muted">
                        {' '}
                        · {d.questions} questões ({statusLabel[d.questionsStatus ?? 'nao-confirmado'].t.toLowerCase()})
                      </span>
                    )}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {d.topics.map((t) => {
                      const nCh = chapters.filter((ch) => ch.topicIds.includes(t.id)).length;
                      const nQ = bank.filter((q) => q.topicId === t.id).length;
                      return (
                        <li key={t.id} className="flex flex-wrap items-center gap-2">
                          <span className="flex-1">{t.title}</span>
                          <span className={`text-xs ${nCh ? 'text-ok' : 'text-muted'}`}>
                            {nCh ? `${nCh} cap. · ${nQ} questões` : 'sem material'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </section>
      <section className="space-y-2 text-sm">
        <h2 className="text-base">Versões do edital</h2>
        {c.editalVersions.map((v) => (
          <div key={v.id} className="card p-3">
            <div className="flex justify-between gap-2">
              <b>{v.title}</b>
              <Status s={v.status} />
            </div>
            <p className="mt-1 text-muted">{v.summary}</p>
          </div>
        ))}
      </section>
      <section className="space-y-1 text-sm">
        <h2 className="text-base">Fontes</h2>
        <ul className="space-y-1">
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="text-gold underline">
                {s.title}
              </a>{' '}
              <span className="text-muted">
                ({s.kind}, consultado em {s.accessed}){s.note && `. ${s.note}`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
