// Aula visual narrada (pacote v4, etapa 3): a cena se monta enquanto a voz explica, frase por frase.
// Começa parada (sem tocar sozinha); tem tocar/pausar, cena anterior e seguinte, repetir, velocidade,
// legenda e transcrição. Sem voz no aparelho, segue com legendas no tempo de leitura. Opcional:
// não muda o progresso da trilha.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNarrated } from '@/content';
import type { NarratedLesson, NumberLineState, Scene } from '@/content/narrated/types';
import { getVoice, readingMs } from '@/app/voice';
import { soundscape } from '@/app/soundscape';
import { nextBeat, nextScene, prevScene, revealOf, transcript, type NarrationPos } from '@/lib/narration';
import { Icon } from '@/components/Icon';
import { Illustration } from '@/components/Illustration';
import { PageHeader } from '@/components/Page';
import { ActivityView } from '@/components/activities/ActivityView';

const RATES = [0.8, 1, 1.2] as const;
const VOICE_LABEL = { nativa: 'voz do aparelho', navegador: 'voz do navegador', nenhuma: 'sem voz neste aparelho: legendas no tempo de leitura' } as const;

export function NarratedPage() {
  const { id = '' } = useParams();
  const l = getNarrated(id);
  if (!l)
    return (
      <div className="card p-5">
        <h1 className="text-xl">Aula narrada não encontrada</h1>
        <Link to="/explorar" className="btn-ghost mt-3 w-full">
          Voltar a Explorar
        </Link>
      </div>
    );
  return <Player key={l.id} l={l} />;
}

function Player({ l }: { l: NarratedLesson }) {
  const [pos, setPos] = useState<NarrationPos>({ scene: 0, beat: 0 });
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState<(typeof RATES)[number]>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [done, setDone] = useState(false);
  const voice = getVoice();
  // Cada mudança (pausa, pular, repetir) invalida a fala em andamento.
  const token = useRef(0);

  const stop = useCallback(() => {
    token.current++;
    voice.stop();
  }, [voice]);

  useEffect(() => () => stop(), [stop]);
  // Enquanto a voz fala, o ambiente sonoro (se estiver tocando) fica baixo.
  useEffect(() => {
    soundscape.duck(playing && voice.kind !== 'nenhuma');
    return () => soundscape.duck(false);
  }, [playing, voice]);

  useEffect(() => {
    if (!playing) return;
    const my = ++token.current;
    const text = l.scenes[pos.scene].beats[pos.beat].say;
    let timer = 0;
    const go = () => {
      if (token.current !== my) return;
      const n = nextBeat(l, pos);
      if (n) setPos(n);
      else {
        setPlaying(false);
        setDone(true);
      }
    };
    if (voice.kind === 'nenhuma') timer = window.setTimeout(go, readingMs(text, rate));
    else {
      // Se a voz do aparelho travar ou não avisar o fim, a aula segue depois do dobro do tempo de leitura.
      const limit = new Promise<void>((r) => (timer = window.setTimeout(r, readingMs(text, rate) * 2 + 1500)));
      // Se a fala acabar cedo demais (voz falhou em silêncio), a legenda fica o tempo mínimo de leitura.
      const t0 = Date.now();
      void Promise.race([voice.speak(text, rate), limit]).then(() => window.setTimeout(go, Math.max(350, readingMs(text, rate) * 0.6 - (Date.now() - t0))));
    }
    return () => window.clearTimeout(timer);
  }, [playing, pos, rate, l, voice]);

  const jump = (p: NarrationPos) => {
    stop();
    setDone(false);
    setPos(p);
  };
  const scene = l.scenes[pos.scene];

  return (
    <div className="space-y-4">
      <PageHeader area="explorar" title={l.title} subtitle={`Aula narrada · cerca de ${l.minutes} min · o mesmo conteúdo da aula em texto`} />

      <section className="card overflow-hidden p-0" aria-label="Apresentação">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 text-sm">
          <span className="kicker truncate">{scene.heading}</span>
          <span className="shrink-0 tabular-nums text-muted">
            {pos.scene + 1}/{l.scenes.length}
          </span>
        </div>
        <div className="grid min-h-[15rem] place-items-center px-4 py-6 sm:min-h-[19rem] sm:px-8" data-testid="narrada-cena">
          <SceneView key={scene.id} scene={scene} reveal={revealOf(scene, pos.beat)} />
        </div>
        <p className="min-h-[4.5rem] border-t border-line bg-raised/50 px-4 py-3 text-[1.02rem] leading-snug" aria-live="polite" data-testid="narrada-legenda">
          {scene.beats[pos.beat].say}
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Controles da aula">
        <button className="btn-ghost !px-3" aria-label="Cena anterior" onClick={() => jump(prevScene(l, pos))}>
          <Icon name="voltar" size={18} />
        </button>
        <button
          className="btn-primary min-w-[9rem] flex-1 sm:flex-none"
          onClick={() => {
            if (playing) {
              stop();
              setPlaying(false);
            } else {
              if (done) jump({ scene: 0, beat: 0 });
              setPlaying(true);
            }
          }}
          data-testid="narrada-tocar"
        >
          {playing ? 'Pausar' : done ? 'Ouvir de novo' : pos.scene === 0 && pos.beat === 0 ? 'Ouvir a aula' : 'Continuar'}
        </button>
        <button className="btn-ghost !px-3" aria-label="Próxima cena" onClick={() => jump(nextScene(l, pos))}>
          <Icon name="seta" size={18} />
        </button>
        <button className="btn-ghost !px-3 text-sm" onClick={() => jump({ scene: pos.scene, beat: 0 })}>
          Repetir cena
        </button>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-muted">Velocidade</span>
          <select className="input !w-auto !py-1.5" value={rate} onChange={(e) => setRate(Number(e.target.value) as (typeof RATES)[number])}>
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r.toLocaleString('pt-BR')}×
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>Voz: {VOICE_LABEL[voice.kind]}.</span>
        <div className="flex flex-wrap gap-1.5" aria-label="Cenas">
          {l.scenes.map((s, i) => (
            <button key={s.id} className={`h-2.5 w-6 rounded-sm ${i < pos.scene ? 'bg-ink' : i === pos.scene ? 'bg-gold' : 'bg-ink/15'}`} aria-label={`Ir para a cena ${i + 1}: ${s.heading}`} onClick={() => jump({ scene: i, beat: 0 })} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn-ghost flex-1" aria-expanded={showTranscript} onClick={() => setShowTranscript((v) => !v)}>
          {showTranscript ? 'Ocultar a transcrição' : 'Mostrar a transcrição'}
        </button>
        <Link to={`/aprender/${l.chapterId}/${l.sectionId}/${l.lessonId}`} className="btn-ghost flex-1">
          Estudar em texto <Icon name="avancar" size={16} />
        </Link>
      </div>
      {showTranscript && (
        <section className="card space-y-3 p-4" aria-label="Transcrição">
          {transcript(l).map((t) => (
            <div key={t.heading}>
              <h3 className="text-base">{t.heading}</h3>
              <p className="mt-0.5 text-sm">{t.lines.join(' ')}</p>
            </div>
          ))}
        </section>
      )}

      {done && l.check && (
        <section className="card p-4" aria-label="Checagem">
          <p className="kicker">Confira o que viu (opcional, não vale nota)</p>
          <div className="mt-2">
            <ActivityView a={l.check} onNext={() => undefined} />
          </div>
        </section>
      )}
    </div>
  );
}

function SceneView({ scene, reveal }: { scene: Scene; reveal: number }) {
  const v = scene.visual;
  if (v.kind === 'title')
    return (
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        {v.art && <Illustration name={v.art} className="h-28 w-36 text-ink" />}
        <h2 className="anim-tile-in mt-2 text-[1.9rem] leading-tight sm:text-[2.3rem]">{v.title}</h2>
        {v.subtitle && reveal >= 2 && <p className="anim-tile-in mt-2 font-title text-lg italic text-muted">{v.subtitle}</p>}
      </div>
    );
  if (v.kind === 'numberline') return <NumberLine from={v.from} to={v.to} state={v.states[reveal] ?? {}} />;
  if (v.kind === 'cards')
    return (
      <div className={`grid w-full gap-3 ${v.cards.length > 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
        {v.cards.map((c, i) => (
          <div
            key={c.title}
            className={`rounded-md border p-4 transition-all duration-500 ${i < reveal ? 'translate-y-0 border-line bg-surface opacity-100' : 'translate-y-2 border-dashed border-line/60 opacity-25'} ${i === reveal - 1 ? 'ring-1 ring-ink' : ''}`}
          >
            <p className="font-title text-lg leading-tight">{c.title}</p>
            <p className="mt-1 text-sm">{c.text}</p>
          </div>
        ))}
      </div>
    );
  return (
    <div className="w-full max-w-md">
      <div className="space-y-1 text-center font-title text-[1.8rem] tabular-nums sm:text-[2.2rem]">
        {v.lines.map((line, i) =>
          i < reveal ? (
            <p key={line} className={`anim-tile-in leading-tight ${i === reveal - 1 ? 'text-ink' : 'text-muted'}`}>
              {line}
              {i === reveal - 1 && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-gold align-middle" aria-hidden="true" />}
            </p>
          ) : null,
        )}
      </div>
      {v.note && reveal >= v.lines.length && <p className="anim-tile-in mx-auto mt-4 w-fit border-l-2 border-gold pl-3 text-sm">{v.note}</p>}
    </div>
  );
}

/** Reta numérica: marcas, números, pontos e saltos em arco que se desenham. */
function NumberLine({ from, to, state }: { from: number; to: number; state: NumberLineState }) {
  const W = 640;
  const pad = 30;
  const step = (W - 2 * pad) / (to - from);
  const X = (n: number) => pad + (n - from) * step;
  const y = 110;
  const nums = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  return (
    <svg viewBox={`0 0 ${W} 160`} className="h-auto w-full max-w-2xl" role="img" aria-label="Reta numérica">
      <line x1={pad - 14} y1={y} x2={W - pad + 14} y2={y} stroke="currentColor" strokeWidth="1.6" />
      {nums.map((n) => (
        <g key={n}>
          <line x1={X(n)} y1={y - 6} x2={X(n)} y2={y + 6} stroke="currentColor" strokeWidth={n === 0 ? 2 : 1.2} />
          <text x={X(n)} y={y + 26} textAnchor="middle" fontSize="15" fill="currentColor" fontFamily="var(--font-text)" className="tabular-nums">
            {n < 0 ? `−${-n}` : n}
          </text>
        </g>
      ))}
      <g className="draw">
        {(state.jumps ?? []).map((j) => {
          const x1 = X(j.from);
          const x2 = X(j.to);
          const h = Math.min(70, 18 + Math.abs(x2 - x1) * 0.25);
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={`${j.from}-${j.to}`}>
              <path pathLength={1} d={`M${x1} ${y - 8} Q${(x1 + x2) / 2} ${y - 8 - h * 2} ${x2} ${y - 8}`} fill="none" stroke="rgb(var(--gold))" strokeWidth="2.4" />
              <path pathLength={1} d={`M${x2 - dir * 9} ${y - 18} L${x2} ${y - 8} L${x2 - dir * 1} ${y - 21}`} fill="none" stroke="rgb(var(--gold))" strokeWidth="2.4" />
            </g>
          );
        })}
      </g>
      {(state.points ?? []).map((n, i) => (
        <circle key={`${n}-${i}`} cx={X(n)} cy={y} r={7} fill={i === (state.points ?? []).length - 1 ? 'rgb(var(--gold))' : 'rgb(var(--ink))'} className="anim-tile-in" />
      ))}
    </svg>
  );
}
