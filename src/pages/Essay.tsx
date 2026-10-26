import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { essayPrompts, getEssayPrompt, topicTitle } from '@/content';
import { Markdown } from '@/components/Markdown';
import { estimateLines, saveEssay, submitEssay } from '@/lib/training';
import { PageHeader } from '@/components/Page';

export function EssayListPage() {
  const { data } = useStudy();
  return (
    <div className="space-y-5">
      <PageHeader
        area="treino"
        icon="pena"
        title="Estudo de caso"
        subtitle="A discursiva de TI é uma questão prática sobre os Conhecimentos Específicos, com nota de 0 a 100 e mínimo de 50 (edital, cap. 11)."
      />
      <ul className="space-y-3">
        {essayPrompts.map((p) => {
          const e = data.essays[p.id];
          return (
            <li key={p.id}>
              <Link to={`/discursiva/${p.id}`} className="card block p-4">
                <h2 className="text-xl">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.topicIds.map((t) => topicTitle(p.contestId, t)).join(' · ')}</p>
                <p className="mt-2 text-sm">
                  {e?.submittedAt ? <span className="text-ok">Entregue</span> : e?.body ? <span className="rubric">Rascunho salvo</span> : 'Não iniciado'}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function EssayPage() {
  const { id = '' } = useParams();
  const p = getEssayPrompt(id);
  const { data, update } = useStudy();
  const saved = data.essays[id];
  const [body, setBody] = useState(saved?.body ?? '');
  const [savedAt, setSavedAt] = useState<string | undefined>(saved?.updatedAt);
  const [showGuide, setShowGuide] = useState(false);
  const first = useRef(true);

  // Salvamento automático, um segundo e meio depois da última tecla.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      update((d) => saveEssay(d, id, body, d.essays[id]?.checklist ?? []));
      setSavedAt(new Date().toISOString());
    }, 1500);
    return () => clearTimeout(t);
  }, [body, id, update]);

  if (!p) return <p>Estudo de caso não encontrado.</p>;
  const lines = estimateLines(body);
  const submitted = !!saved?.submittedAt;
  const checklist = saved?.checklist ?? [];
  const score = p.criteria.filter((c) => checklist.includes(c.id)).reduce((s, c) => s + c.points, 0);

  const toggle = (cid: string) =>
    update((d) => {
      const cur = d.essays[id]?.checklist ?? [];
      return saveEssay(d, id, d.essays[id]?.body ?? body, cur.includes(cid) ? cur.filter((x) => x !== cid) : [...cur, cid]);
    });

  return (
    <div className="space-y-5">
      <PageHeader area="treino" icon="pena" title={p.title} subtitle={`Estudo de caso autoral, não é questão da FCC · limite de treino: ${p.lineLimit} linhas`} />

      <section className="manuscript px-4 py-5">
        <div className="prose-manuscript">
          <h3>Situação</h3>
          <Markdown>{p.scenario}</Markdown>
          <h3>O que se pede</h3>
          <Markdown>{p.command}</Markdown>
        </div>
      </section>

      <section className="space-y-2">
        <button className="btn-ghost w-full" onClick={() => setShowGuide((v) => !v)} aria-expanded={showGuide}>
          {showGuide ? 'Ocultar a orientação' : 'Ver a orientação de resposta'}
        </button>
        {showGuide && (
          <div className="card p-4">
            <p className="text-sm text-muted">
              Critérios pedagógicos deste treino. A banca define a própria grade, divulgada apenas na vista de prova.
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.criteria.map((c) => (
                <li key={c.id}>
                  <span className="rubric">¶</span> {c.text} <span className="text-sm text-muted">({c.points} pontos)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between">
          <label htmlFor="resposta" className="font-display text-lg">
            Sua resposta
          </label>
          <span className={`text-sm ${lines > p.lineLimit ? 'rubric' : 'text-muted'}`}>
            cerca de {lines} de {p.lineLimit} linhas
          </span>
        </div>
        <textarea
          id="resposta"
          className="input min-h-[22rem] font-serif text-[1.08rem] leading-[1.9]"
          style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 calc(1.9em - 1px), rgb(var(--ink) / 0.12) calc(1.9em - 1px) 1.9em)', backgroundAttachment: 'local' }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escreva como na folha de resposta: parágrafos curtos, na ordem do que foi pedido."
        />
        <p className="text-xs text-muted">
          {savedAt ? `Salvo às ${new Date(savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.` : 'Ainda não salvo.'} A estimativa
          considera cerca de 75 caracteres por linha manuscrita.
        </p>
        {!submitted && (
          <button
            className="btn-primary w-full"
            disabled={!body.trim()}
            onClick={() =>
              update((d) => {
                const withBody = saveEssay(d, id, body, d.essays[id]?.checklist ?? []);
                return submitEssay(withBody, id).data;
              })
            }
          >
            Entregar e ver o modelo comentado
          </button>
        )}
      </section>

      {submitted && (
        <>
          <section className="card space-y-2 p-4">
            <h2 className="text-xl">Autoavaliação</h2>
            <p className="text-sm text-muted">Marque o que sua resposta realmente contém. A soma é uma estimativa pedagógica, não a nota da banca.</p>
            {p.criteria.map((c) => (
              <label key={c.id} className="flex items-start gap-3 py-1">
                <input type="checkbox" className="mt-1.5 h-4 w-4 accent-[rgb(var(--ember))]" checked={checklist.includes(c.id)} onChange={() => toggle(c.id)} />
                <span className="flex-1">
                  {c.text} <span className="text-sm text-muted">({c.points})</span>
                </span>
              </label>
            ))}
            <p className="pt-2 text-right font-display text-lg">
              Estimativa: <span className="rubric">{score}</span> de 100 {score >= 50 ? '(acima do mínimo de 50)' : '(abaixo do mínimo de 50)'}
            </p>
          </section>
          <section className="manuscript px-4 py-5">
            <div className="prose-manuscript">
              <h3>Resposta-modelo</h3>
              <div className="illuminated">
                <Markdown>{p.modelAnswer}</Markdown>
              </div>
              <h3>Comentário</h3>
              <Markdown>{p.commentary}</Markdown>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
