// Estudos: um só lugar para todos os jeitos de estudar. O primeiro passo é sempre o mesmo destino do
// Continuar (fonte única); o resto são caminhos livres: biblioteca, atividades rápidas, revisão,
// videoaulas e materiais oficiais. Vídeos só carregam quando a pessoa pede, sem tocar sozinhos.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { useCheckpoint } from '@/app/useCheckpoint';
import { areaColor } from '@/app/areas';
import { DEFAULT_CONTEST_ID, externalMaterials, flashcards, getContest, narratedLessons, questionsForContest } from '@/content';
import { reviewQueue } from '@/lib/study';
import { dueCards, unlockedCardIds } from '@/lib/training';
import { Icon } from '@/components/Icon';
import { PageHeader, SectionTitle, Tile, TileGrid, useIsDark } from '@/components/Page';
import { VideoLibrary } from '@/components/VideoLibrary';
import { TrailPlace } from '@/components/TrailPlace';
import { VideoEmbed, youTubeId } from '@/components/VideoEmbed';

interface OwnVideo {
  url: string;
  title: string;
}
const OWN_KEY = 'cronicas:videos-proprios';

function readOwn(): OwnVideo[] {
  try {
    const v = JSON.parse(localStorage.getItem(OWN_KEY) ?? '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x?.url === 'string' && typeof x?.title === 'string') : [];
  } catch {
    return [];
  }
}
function writeOwn(v: OwnVideo[]) {
  try {
    localStorage.setItem(OWN_KEY, JSON.stringify(v));
  } catch {
    /* sem armazenamento: a lista vale só nesta visita */
  }
}

export function StudiesPage() {
  const { data } = useStudy();
  const dark = useIsDark();
  const color = areaColor('grimorios', dark);
  const next = useCheckpoint();
  const wrong = reviewQueue(data, questionsForContest(DEFAULT_CONTEST_ID)).length;
  const due = dueCards(data, unlockedCardIds(data, flashcards)).length;
  const officialSources = getContest(DEFAULT_CONTEST_ID)?.sources ?? [];
  const [own, setOwn] = useState<OwnVideo[]>(readOwn);
  const [form, setForm] = useState({ url: '', title: '' });
  const validUrl = !!youTubeId(form.url);

  const save = (v: OwnVideo[]) => {
    setOwn(v);
    writeOwn(v);
  };

  return (
    <div className="space-y-6">
      <PageHeader area="explorar" crumb={false} title="Explorar" subtitle="Biblioteca, atividades livres, vídeos e materiais. Nada aqui muda o ponto da trilha." />

      <section aria-label="Continuar a trilha" className="card p-4">
        <p className="text-sm font-semibold text-gold">{next.resuming ? 'Você parou aqui' : 'Próximo passo da trilha'}</p>
        <p className="mt-1 text-lg font-bold leading-snug">{next.title}</p>
        <p className="text-sm text-muted">{next.context}</p>
        <Link to={next.to} className="btn-primary mt-3 w-full" data-testid="continuar-estudos">
          <Icon name="play" size={18} fill="currentColor" /> {next.action}
        </Link>
      </section>

      <section>
        <SectionTitle icon="grimorio" color={color}>
          Matérias e prática
        </SectionTitle>
        <TileGrid>
          <Tile wide to="/biblioteca" icon="lista" color={color} title="Matérias e materiais" text="Conteúdo por disciplina, leitura contínua, atividades e referências." />
          <Tile to="/relampago" icon="chama" color="rgb(var(--leaf))" title="Rodada relâmpago" text="5 questões rápidas." />
          <Tile
            to="/flashcards"
            icon="cartas"
            color="rgb(var(--pink))"
            title="Flashcards"
            text="Repetição espaçada dos glossários."
            badge={due ? `${due} hoje` : undefined}
          />
          <Tile
            wide
            to="/revisao"
            icon="ampulheta"
            color="rgb(var(--ok))"
            title="Revisão de erros"
            text="As questões que você errou voltam até acertar."
            badge={wrong ? `${wrong} a revisar` : undefined}
          />
          <Tile to="/slides" icon="cartas" color="rgb(var(--gold))" title="Slides de revisão" text="Revise os conceitos em lâminas visuais por capítulo; imprima ou salve em PDF." />
          <Tile to="/sala" icon="balao" color="rgb(var(--azure))" title="Sala dos Professores" text="Dicas, pegadinhas e mini-desafios." />
        </TileGrid>
      </section>

      <section aria-label="Aulas narradas">
        <SectionTitle icon="play" color={color}>
          Aulas narradas
        </SectionTitle>
        <ul className="ledger">
          {narratedLessons.map((n) => (
            <li key={n.id} className="px-4 py-3.5">
              <Link to={`/aula-narrada/${n.id}`} className="flex items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{n.title}</span>
                  <span className="block text-sm text-muted">Voz explicando enquanto a cena se monta · {n.minutes} min · com legenda e transcrição</span>
                </span>
                <Icon name="avancar" size={18} className="shrink-0 text-muted" />
              </Link>
              <TrailPlace lessonId={n.lessonId} className="mt-1.5 max-w-full" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Videoaulas">
        <SectionTitle icon="play" color={color}>
          Videoaulas
        </SectionTitle>
        <VideoLibrary />

        <h3 className="mt-4 font-semibold">Suas videoaulas</h3>
        {own.length > 0 && (
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {own.map((v, i) => (
              <div key={`${v.url}-${i}`}>
                <VideoEmbed url={v.url} title={v.title} meta="Guardada por você neste aparelho" />
                <button type="button" className="mt-1 text-xs text-muted underline" onClick={() => save(own.filter((_, j) => j !== i))}>
                  Tirar da lista
                </button>
              </div>
            ))}
          </div>
        )}
        <form
          className="card mt-2 space-y-2 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!validUrl || !form.title.trim()) return;
            save([...own, { url: form.url.trim(), title: form.title.trim() }]);
            setForm({ url: '', title: '' });
          }}
        >
          <label className="block text-sm">
            <span className="font-semibold">Endereço do vídeo no YouTube</span>
            <input
              className="input mt-1 w-full"
              inputMode="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </label>
          {form.url && !validUrl && <p className="text-xs text-bad">Esse endereço não parece de um vídeo do YouTube.</p>}
          <label className="block text-sm">
            <span className="font-semibold">Nome para lembrar</span>
            <input
              className="input mt-1 w-full"
              placeholder="Ex.: Processos no Linux"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <button className="btn-ghost w-full" disabled={!validUrl || !form.title.trim()}>
            Guardar a videoaula
          </button>
        </form>
      </section>

      <section aria-label="Materiais externos">
        <SectionTitle icon="pergaminho" color={color}>
          Materiais oficiais
        </SectionTitle>
        <ul className="ledger">
          {[
            ...officialSources.map((s) => ({
              id: s.url,
              title: s.title,
              publisher: s.kind === 'oficial' ? 'Fonte oficial do concurso' : 'Fonte secundária',
              url: s.url,
              use: '',
            })),
            ...externalMaterials,
          ].map((m) => (
            <li key={m.id}>
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="ledger-row items-start">
                <span className="flex-1">
                  <span className="block font-semibold">{m.title}</span>
                  <span className="block text-sm text-muted">
                    {m.publisher}
                    {m.use ? ` · ${m.use}` : ''}
                  </span>
                </span>
                <Icon name="seta" size={16} className="mt-1 shrink-0 text-muted" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted">Abrem no site de quem publica. A lei vale sempre no texto oficial; o resumo daqui serve para estudar.</p>
      </section>
    </div>
  );
}
