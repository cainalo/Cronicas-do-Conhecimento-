// Aula visual narrada com player de tela inteira, cena animada e linha do tempo arrastável.
// A busca é estimada por fala: a voz do aparelho não fornece uma duração exata de vídeo.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNarrated } from '@/content';
import type { NarratedLesson, NumberLineState, Scene } from '@/content/narrated/types';
import { getVoice, readingMs } from '@/app/voice';
import { soundscape } from '@/app/soundscape';
import { beatIndexOf, narrationPositions, nextBeat, positionAtBeat, revealOf, transcript, type NarrationPos } from '@/lib/narration';
import { Icon } from '@/components/Icon';
import { Illustration } from '@/components/Illustration';
import { ActivityView } from '@/components/activities/ActivityView';

const RATES = [0.8, 1, 1.2] as const;
const VOICE_LABEL = { nativa: 'voz do aparelho', navegador: 'voz do navegador', nenhuma: 'sem voz neste aparelho: legendas no tempo de leitura' } as const;
const formatTime = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
};

export function NarratedPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const l = getNarrated(id);
  if (!l) {
    return <div className="p-5"><h1 className="text-xl">Aula narrada não encontrada</h1><Link to="/trilha" className="btn-ghost mt-3 w-full">Voltar à trilha</Link></div>;
  }
  return <NarratedPlayer key={l.id} l={l} embedded onClose={() => navigate('/aprender/' + l.chapterId + '/' + l.sectionId + '/' + l.lessonId)} exitLabel="Voltar ao Aprender" />;
}

export function NarratedPlayer({
  l, onClose, embedded = false, exitLabel = 'Voltar ao Aprender',
}: {
  l: NarratedLesson;
  onClose?: () => void;
  embedded?: boolean;
  exitLabel?: string;
}) {
  const [pos, setPos] = useState<NarrationPos>({ scene: 0, beat: 0 });
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState<(typeof RATES)[number]>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [done, setDone] = useState(false);
  const [beatElapsed, setBeatElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const resumeAfterSeek = useRef(false);
  const token = useRef(0);
  const voice = getVoice();
  const positions = useMemo(() => narrationPositions(l), [l]);
  const beatIndex = beatIndexOf(l, pos);
  const durations = useMemo(() => positions.map((p) => readingMs(l.scenes[p.scene].beats[p.beat].say, rate)), [l, positions, rate]);
  const totalMs = durations.reduce((sum, value) => sum + value, 0);
  const beforeMs = durations.slice(0, beatIndex).reduce((sum, value) => sum + value, 0);
  const currentMs = Math.min(totalMs, beforeMs + beatElapsed);
  const scene = l.scenes[pos.scene];
  const say = scene.beats[pos.beat].say;

  const stop = useCallback(() => {
    token.current += 1;
    voice.stop();
  }, [voice]);

  useEffect(() => () => stop(), [stop]);
  useEffect(() => {
    soundscape.duck(playing && voice.kind !== 'nenhuma');
    return () => soundscape.duck(false);
  }, [playing, voice]);

  useEffect(() => {
    if (!playing || !positions.length) return;
    const ticket = ++token.current;
    const duration = durations[beatIndex] ?? 1800;
    const text = l.scenes[pos.scene].beats[pos.beat].say;
    let watchdog: number | undefined;
    let advanceTimer: number | undefined;
    const advance = () => {
      if (token.current !== ticket) return;
      const next = nextBeat(l, pos);
      if (next) {
        elapsedRef.current = 0;
        setBeatElapsed(0);
        setPos(next);
      } else {
        elapsedRef.current = duration;
        setBeatElapsed(duration);
        setPlaying(false);
        setDone(true);
      }
    };
    if (voice.kind === 'nenhuma') {
      watchdog = window.setTimeout(advance, Math.max(0, duration - elapsedRef.current));
    } else {
      watchdog = window.setTimeout(() => {
        if (token.current !== ticket) return;
        voice.stop();
        advance();
      }, Math.max(duration * 2.3, 5000));
      void voice.speak(text, rate).then(() => {
        if (token.current !== ticket) return;
        if (watchdog !== undefined) window.clearTimeout(watchdog);
        advanceTimer = window.setTimeout(advance, Math.max(300, Math.min(900, duration * 0.16)));
      }).catch(() => {
        if (token.current !== ticket) return;
        if (watchdog !== undefined) window.clearTimeout(watchdog);
        advanceTimer = window.setTimeout(advance, Math.max(900, duration));
      });
    }
    return () => {
      if (watchdog !== undefined) window.clearTimeout(watchdog);
      if (advanceTimer !== undefined) window.clearTimeout(advanceTimer);
      if (token.current === ticket) {
        token.current += 1;
        voice.stop();
      }
    };
  }, [playing, pos, rate, l, voice, positions.length, durations, beatIndex]);

  useEffect(() => {
    if (!playing) return;
    const started = Date.now();
    const initial = elapsedRef.current;
    const duration = durations[beatIndex] ?? 1800;
    const timer = window.setInterval(() => {
      const value = Math.min(duration, initial + Date.now() - started);
      elapsedRef.current = value;
      setBeatElapsed(value);
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, beatIndex, durations]);

  const jump = (p: NarrationPos) => {
    stop();
    elapsedRef.current = 0;
    setBeatElapsed(0);
    setDone(false);
    setPos(p);
  };

  const startSeek = () => {
    resumeAfterSeek.current = playing;
    if (playing) {
      stop();
      setPlaying(false);
    }
  };

  const seekTo = (rawValue: number) => {
    const target = Math.max(0, Math.min(totalMs, rawValue));
    let cursor = 0;
    let targetIndex = Math.max(0, positions.length - 1);
    for (let i = 0; i < durations.length; i++) {
      if (target < cursor + durations[i] || i === durations.length - 1) {
        targetIndex = i;
        break;
      }
      cursor += durations[i];
    }
    setPos(positionAtBeat(l, targetIndex));
    elapsedRef.current = 0;
    setBeatElapsed(0);
    setDone(false);
  };

  const finishSeek = () => {
    if (resumeAfterSeek.current) {
      resumeAfterSeek.current = false;
      setPlaying(true);
    }
  };

  const togglePlayback = () => {
    if (playing) {
      stop();
      setPlaying(false);
      elapsedRef.current = 0;
      setBeatElapsed(0);
    } else {
      if (done) {
        setPos({ scene: 0, beat: 0 });
        elapsedRef.current = 0;
        setBeatElapsed(0);
      }
      setDone(false);
      setPlaying(true);
    }
  };

  const shell = embedded ? 'flex h-full min-h-0 flex-col gap-2 overflow-hidden' : 'mx-auto flex min-h-[70dvh] w-full max-w-4xl flex-col gap-4';
  const stage = embedded ? 'flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-surface' : 'card flex flex-col overflow-hidden p-0';
  const visual = embedded ? 'grid min-h-0 flex-1 place-items-center overflow-hidden px-3 py-2 sm:px-6' : 'grid min-h-[15rem] place-items-center px-4 py-6 sm:min-h-[19rem] sm:px-8';

  return (
    <div className={shell} data-testid="narrada-player">
      <header className="flex shrink-0 items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="kicker">{embedded ? 'Aula visual narrada' : 'Aula narrada · cerca de ' + l.minutes + ' min'}</p>
          <h1 className={embedded ? 'truncate text-lg leading-tight' : 'text-2xl leading-tight'}>{l.title}</h1>
        </div>
        <button type="button" className="btn-primary shrink-0 !min-h-[40px] !px-3 text-xs sm:text-sm" onClick={() => { stop(); setPlaying(false); if (onClose) onClose(); }} data-testid="narrada-sair">{exitLabel}</button>
      </header>

      <section className={stage} aria-label="Aula em vídeo narrado">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-3 py-2 text-sm">
          <span className="kicker truncate">{scene.heading}</span>
          <span className="shrink-0 tabular-nums text-muted">{pos.scene + 1}/{l.scenes.length}</span>
        </div>
        <div className={visual} data-testid="narrada-cena">
          <div className="anim-tile-in grid h-full w-full place-items-center" key={scene.id + ':' + pos.beat}>
            <SceneView scene={scene} reveal={revealOf(scene, pos.beat)} />
          </div>
        </div>
        <p className="max-h-24 shrink-0 overflow-y-auto border-t border-line bg-raised/50 px-3 py-3 text-sm leading-snug sm:px-4 sm:text-base" aria-live="polite" data-testid="narrada-legenda">{say}</p>
      </section>

      <div className="shrink-0 space-y-1.5">
        <div className="flex items-center justify-between gap-3 text-xs tabular-nums text-muted">
          <span>{formatTime(currentMs)}</span>
          <span>{formatTime(totalMs)} · tempo estimado</span>
        </div>
        <input
          type="range" min={0} max={Math.max(1, totalMs)} step={250} value={Math.min(totalMs, currentMs)}
          onPointerDown={startSeek} onPointerUp={finishSeek} onPointerCancel={finishSeek}
          onChange={(e) => seekTo(Number(e.target.value))}
          aria-label="Barra de progresso da aula"
          aria-valuetext={'Fala ' + (beatIndex + 1) + ' de ' + positions.length + ' · tempo estimado'}
          className="w-full cursor-pointer accent-gold" data-testid="narrada-seek"
        />
        <div className="flex items-center gap-2">
          <button type="button" className="btn-ghost !min-h-[40px] !px-2.5" onClick={() => jump(positionAtBeat(l, Math.max(0, beatIndex - 1)))} aria-label="Voltar uma fala"><Icon name="voltar" size={18} /></button>
          <button type="button" className="btn-primary min-w-0 flex-1 !min-h-[42px]" onClick={togglePlayback} data-testid="narrada-tocar">{playing ? 'Pausar' : done ? 'Ouvir de novo' : beatIndex === 0 ? 'Ouvir a aula' : 'Continuar'}</button>
          <button type="button" className="btn-ghost !min-h-[40px] !px-2.5" onClick={() => jump(positionAtBeat(l, Math.min(positions.length - 1, beatIndex + 1)))} aria-label="Avançar uma fala"><Icon name="seta" size={18} /></button>
          <label className="flex shrink-0 items-center gap-1 text-xs">
            <span className="sr-only">Velocidade</span>
            <select className="input !w-auto !min-w-[4.4rem] !py-1.5" value={rate} onChange={(e) => setRate(Number(e.target.value) as (typeof RATES)[number])} aria-label="Velocidade da voz">
              {RATES.map((r) => <option key={r} value={r}>{r.toLocaleString('pt-BR')}×</option>)}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-[0.68rem] text-muted">Voz: {VOICE_LABEL[voice.kind]}.</span>
          <button type="button" className="shrink-0 text-xs font-semibold text-gold underline" aria-expanded={showTranscript} onClick={() => setShowTranscript((v) => !v)}>
            {showTranscript ? 'Ocultar a transcrição' : 'Mostrar a transcrição'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5" aria-label="Cenas">
          {l.scenes.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`h-2.5 w-4 rounded-sm ${i < pos.scene ? 'bg-ink' : i === pos.scene ? 'bg-gold' : 'bg-ink/15'}`}
              aria-label={'Ir para a cena ' + (i + 1) + ': ' + item.heading}
              aria-current={i === pos.scene ? 'step' : undefined}
              onClick={() => jump({ scene: i, beat: 0 })}
            />
          ))}
        </div>
        {showTranscript && (
          <section className="max-h-24 overflow-y-auto rounded-lg border border-line bg-surface p-2 text-xs" aria-label="Transcrição">
            {transcript(l).map((t) => <div key={t.heading} className="mb-2 last:mb-0"><h2 className="font-semibold">{t.heading}</h2><p>{t.lines.join(' ')}</p></div>)}
          </section>
        )}
      </div>
      {done && l.check && (
        <details className="shrink-0 rounded-lg border border-line p-2 text-sm">
          <summary className="cursor-pointer font-semibold">Conferir o que viu (opcional)</summary>
          <div className="mt-2"><ActivityView a={l.check} onNext={() => undefined} /></div>
        </details>
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
  if (v.kind === 'timeline')
    return (
      <ol className="relative w-full max-w-xl border-l-2 border-line pl-5">
        {v.items.map((it, i) => (
          <li
            key={it.year + it.title}
            className={`relative pb-3 transition-all duration-500 last:pb-0 ${i < reveal ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-20'}`}
          >
            <span className={`absolute -left-[1.72rem] top-1.5 h-3 w-3 rounded-full border-2 ${i < reveal ? 'border-gold bg-gold' : 'border-line bg-bg'}`} aria-hidden="true" />
            <p className="font-title text-sm tabular-nums text-gold">{it.year}</p>
            <p className={`font-title leading-tight ${i === reveal - 1 ? 'text-lg' : 'text-base'}`}>{it.title}</p>
            {i === reveal - 1 && <p className="anim-tile-in mt-0.5 text-sm text-muted">{it.text}</p>}
          </li>
        ))}
      </ol>
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
