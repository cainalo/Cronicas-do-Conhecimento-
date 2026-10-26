// Aula visual narrada com player de tela inteira, cena animada e linha do tempo arrastável.
// A busca é estimada por fala: a voz do aparelho não fornece uma duração exata de vídeo.
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
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

function wordIndexAtChar(text: string, charIndex: number): number {
  const words = Array.from(text.matchAll(/\S+/g));
  if (!words.length) return 0;
  for (let i = 0; i < words.length; i++) {
    const start = words[i].index ?? 0;
    if (charIndex < start + words[i][0].length) return i;
  }
  return words.length - 1;
}

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
  const [voiceStarted, setVoiceStarted] = useState(false);
  const [speechWordIndex, setSpeechWordIndex] = useState<number>();
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimer = useRef<number | undefined>(undefined);
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
  // A composição cobre a viewport, então a página por trás não deve continuar rolando no toque.
  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, []);
  // Como em um player de vídeo, a interface desaparece por inatividade tanto
  // durante a reprodução quanto quando a aula está pausada. Um toque a revela.
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideControlsTimer.current !== undefined) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(() => {
      hideControlsTimer.current = undefined;
      setControlsVisible(false);
    }, 3800);
  }, []);
  const togglePlayerControls = useCallback(() => {
    if (controlsVisible) {
      if (hideControlsTimer.current !== undefined) window.clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = undefined;
      setControlsVisible(false);
    } else {
      revealControls();
    }
  }, [controlsVisible, revealControls]);

  useEffect(() => {
    if (hideControlsTimer.current !== undefined) {
      window.clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = undefined;
    }
    if (!controlsVisible) return;
    hideControlsTimer.current = window.setTimeout(() => {
      hideControlsTimer.current = undefined;
      setControlsVisible(false);
    }, 3800);
    return () => {
      if (hideControlsTimer.current !== undefined) {
        window.clearTimeout(hideControlsTimer.current);
        hideControlsTimer.current = undefined;
      }
    };
  }, [controlsVisible, pos]);

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
        setVoiceStarted(false);
        setSpeechWordIndex(undefined);
        setPos(next);
      } else {
        elapsedRef.current = duration;
        setBeatElapsed(duration);
        setPlaying(false);
        setDone(true);
      }
    };
    setVoiceStarted(false);
    setSpeechWordIndex(undefined);
    if (voice.kind === 'nenhuma') {
      setVoiceStarted(true);
      watchdog = window.setTimeout(advance, Math.max(0, duration - elapsedRef.current));
    } else {
      const armWatchdog = () => {
        if (watchdog !== undefined) window.clearTimeout(watchdog);
        watchdog = window.setTimeout(() => {
          if (token.current !== ticket) return;
          voice.stop();
          advance();
        }, Math.max(duration * 2.3, 5000));
      };
      armWatchdog();
      void voice.speak(text, rate, {
        onStart: () => {
          if (token.current !== ticket) return;
          elapsedRef.current = 0;
          setBeatElapsed(0);
          setVoiceStarted(true);
          armWatchdog();
        },
        onBoundary: (charIndex) => {
          if (token.current !== ticket) return;
          setSpeechWordIndex(wordIndexAtChar(text, charIndex));
        },
      }).then(() => {
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
    if (!playing || !voiceStarted) return;
    const started = Date.now();
    const initial = elapsedRef.current;
    const duration = durations[beatIndex] ?? 1800;
    const timer = window.setInterval(() => {
      const value = Math.min(duration, initial + Date.now() - started);
      elapsedRef.current = value;
      setBeatElapsed(value);
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, voiceStarted, beatIndex, durations]);

  const jump = (p: NarrationPos) => {
    stop();
    elapsedRef.current = 0;
    setBeatElapsed(0);
    setVoiceStarted(false);
    setSpeechWordIndex(undefined);
    setDone(false);
    setPos(p);
  };

  const startSeek = () => {
    resumeAfterSeek.current = playing;
    if (playing) {
      stop();
      setPlaying(false);
      setVoiceStarted(false);
      setSpeechWordIndex(undefined);
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
    setVoiceStarted(false);
    setSpeechWordIndex(undefined);
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
      setVoiceStarted(false);
      setSpeechWordIndex(undefined);
    } else {
      if (done) {
        setPos({ scene: 0, beat: 0 });
        elapsedRef.current = 0;
        setBeatElapsed(0);
        setVoiceStarted(false);
        setSpeechWordIndex(undefined);
      }
      setDone(false);
      setPlaying(true);
    }
  };

  // O palco visual ocupa a viewport inteira. Cabeçalho, legenda e controles são camadas
  // flutuantes com margens seguras; nunca empurram o vídeo nem ficam colados às bordas.
  const shell = 'fixed inset-0 z-[100] isolate h-[100dvh] max-h-[100dvh] w-screen max-w-none overflow-hidden rounded-none bg-bg text-ink';
  const visibleClass = controlsVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none translate-y-2 opacity-0';
  const stopOverlayClick = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className={shell}
      data-embedded={embedded ? 'true' : undefined}
      data-testid="narrada-player"
      onClick={togglePlayerControls}
      onPointerMove={(event) => { if (event.pointerType === 'mouse') revealControls(); }}
      onKeyDown={revealControls}
    >
      <section className="absolute inset-0 overflow-hidden bg-bg" aria-label="Aula em vídeo narrado" data-testid="narrada-stage">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-[18%] h-48 w-48 rounded-full bg-[#2e7182]/10 blur-3xl" />
          <div className="absolute -right-16 bottom-[26%] h-52 w-52 rounded-full bg-[#c8402a]/10 blur-3xl" />
        </div>
        <div
          className={`absolute inset-0 grid place-items-center transition-[padding] duration-300 ${controlsVisible ? 'px-4 pb-[14.5rem] pt-28 sm:px-10 sm:pb-[15rem] sm:pt-32' : 'px-4 pb-8 pt-8 sm:px-10'}`}
          data-testid="narrada-cena"
        >
          <div className="anim-tile-in relative flex h-full max-h-full w-full flex-col items-center justify-center gap-3" key={scene.id}>
            <SceneView scene={scene} reveal={revealOf(scene, pos.beat)} />
            {scene.visual.kind !== 'cards' && <SceneMotionStrip key={scene.id + ':' + pos.beat} scene={scene} say={say} />}
          </div>
        </div>
      </section>

      <header
        className={`absolute left-4 right-4 top-[max(0.85rem,env(safe-area-inset-top))] z-20 mx-auto flex max-w-5xl items-start gap-3 rounded-2xl border border-line/70 bg-bg/85 p-3 shadow-[0_8px_28px_rgb(27_26_23_/_0.08)] backdrop-blur-md transition-all duration-300 sm:left-7 sm:right-7 sm:p-4 ${visibleClass}`}
        onClick={stopOverlayClick}
        aria-hidden={!controlsVisible}
        data-testid="narrada-cabecalho-flutuante"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2e7182] text-white sm:h-11 sm:w-11">
          <Icon name="livro" size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">{embedded ? 'Aula visual narrada' : 'Aula narrada · cerca de ' + l.minutes + ' min'}</p>
          <h1 className="mt-0.5 text-base font-semibold leading-tight sm:text-xl">{l.title}</h1>
          <p className="mt-1 truncate text-xs text-muted sm:text-sm">{scene.heading} <span className="mx-1 opacity-50">·</span> Cena {pos.scene + 1} de {l.scenes.length}</p>
        </div>
        <button
          type="button"
          className="grid min-h-10 min-w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition hover:bg-raised sm:min-h-11 sm:min-w-11"
          onClick={() => { stop(); setPlaying(false); if (onClose) onClose(); }}
          aria-label={exitLabel}
          title={exitLabel}
          data-testid="narrada-sair"
        >
          <Icon name="sair" size={19} />
        </button>
      </header>

      <p
        className={`absolute left-5 right-5 z-10 mx-auto max-w-3xl rounded-xl bg-[#171b1b]/90 px-4 py-3 text-center text-sm font-medium leading-relaxed text-white shadow-lg backdrop-blur-sm transition-[bottom] duration-300 sm:left-10 sm:right-10 sm:px-6 sm:py-3.5 sm:text-base ${controlsVisible ? 'bottom-[calc(14rem+env(safe-area-inset-bottom))] sm:bottom-[calc(15rem+env(safe-area-inset-bottom))]' : 'bottom-8'}`}
        aria-live="polite"
        data-testid="narrada-legenda"
      >
        <span className="sr-only">Legenda: </span>
        <span data-testid="narrada-legenda-texto">
          {(say.match(/\S+\s*/g) ?? [say]).map((word, i, words) => {
            const estimatedWord = voiceStarted
              ? Math.min(words.length - 1, Math.floor((beatElapsed / Math.max(1, durations[beatIndex] ?? 1800)) * words.length))
              : -1;
            const activeWord = playing && voiceStarted ? (speechWordIndex ?? estimatedWord) : -1;
            return <span key={`${i}-${word}`} className={i === activeWord ? 'rounded bg-[#f0bf69]/25 px-0.5 font-bold text-[#ffd38a] transition-colors duration-150' : i < activeWord ? 'text-white/65 transition-colors duration-150' : 'text-white transition-colors duration-150'}>{word}</span>;
          })}
        </span>
      </p>

      <div
        className={`absolute bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-4 right-4 z-20 mx-auto max-w-3xl transition-all duration-300 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:left-8 sm:right-8 ${visibleClass}`}
        onClick={stopOverlayClick}
        aria-hidden={!controlsVisible}
        data-testid="narrada-controles-flutuantes"
      >
        <div className="rounded-2xl border border-line/80 bg-bg/90 p-3 shadow-[0_14px_36px_rgb(27_26_23_/_0.16)] backdrop-blur-xl sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3 text-[0.68rem] font-medium tabular-nums text-muted sm:text-xs">
            <span>{formatTime(currentMs)}</span>
            <span>{formatTime(totalMs)} · tempo estimado</span>
          </div>
          <input
            type="range" min={0} max={Math.max(1, totalMs)} step={250} value={Math.min(totalMs, currentMs)}
            onPointerDown={startSeek} onPointerUp={finishSeek} onPointerCancel={finishSeek}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Barra de progresso da aula"
            aria-valuetext={'Fala ' + (beatIndex + 1) + ' de ' + positions.length + ' · tempo estimado'}
            className="mb-3 block h-5 w-full cursor-pointer accent-[#c8402a]" data-testid="narrada-seek"
          />
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface transition hover:bg-raised sm:h-11 sm:w-11" onClick={() => jump(positionAtBeat(l, Math.max(0, beatIndex - 1)))} aria-label="Voltar uma fala">
              <Icon name="voltar" size={18} />
            </button>
            <button
              type="button"
              className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#c8402a] px-4 font-semibold text-white transition hover:bg-[#a0301c] sm:max-w-xs sm:text-base"
              onClick={togglePlayback}
              data-testid="narrada-tocar"
            >
              {playing ? <span aria-hidden="true" className="text-lg leading-none">Ⅱ</span> : <Icon name="play" size={19} />}
              {playing ? 'Pausar aula' : done ? 'Assistir novamente' : beatIndex === 0 ? 'Começar aula' : 'Continuar aula'}
            </button>
            <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface transition hover:bg-raised sm:h-11 sm:w-11" onClick={() => jump(positionAtBeat(l, Math.min(positions.length - 1, beatIndex + 1)))} aria-label="Avançar uma fala">
              <Icon name="seta" size={18} />
            </button>
            <label className="shrink-0">
              <span className="sr-only">Velocidade da voz</span>
              <select className="h-10 max-w-[4.8rem] rounded-full border border-line bg-surface px-2 text-xs font-semibold sm:h-11" value={rate} onChange={(e) => setRate(Number(e.target.value) as (typeof RATES)[number])} aria-label="Velocidade da voz">
                {RATES.map((r) => <option key={r} value={r}>{r.toLocaleString('pt-BR')}×</option>)}
              </select>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/70 pt-2">
            <span className="min-w-0 truncate text-[0.67rem] text-muted">Narração: {VOICE_LABEL[voice.kind]}.</span>
            <button type="button" className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-[#c8402a] hover:bg-[#c8402a]/10" aria-expanded={showTranscript} onClick={() => setShowTranscript((v) => !v)}>
              {showTranscript ? 'Ocultar transcrição' : 'Transcrição'}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2" aria-label="Cenas">
            {l.scenes.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`h-1.5 w-5 rounded-full transition-all ${i < pos.scene ? 'bg-[#2e7182]' : i === pos.scene ? 'w-8 bg-[#c8402a]' : 'bg-line'}`}
                aria-label={'Ir para a cena ' + (i + 1) + ': ' + item.heading}
                aria-current={i === pos.scene ? 'step' : undefined}
                onClick={() => jump({ scene: i, beat: 0 })}
              />
            ))}
          </div>
          {showTranscript && (
            <section className="mt-3 max-h-40 overflow-y-auto rounded-xl border border-line bg-surface p-3 text-xs leading-relaxed sm:text-sm" aria-label="Transcrição">
              {transcript(l).map((t) => <div key={t.heading} className="mb-3 last:mb-0"><h2 className="font-semibold text-[#2e7182]">{t.heading}</h2><p className="mt-1">{t.lines.join(' ')}</p></div>)}
            </section>
          )}
        </div>
      </div>

      {!controlsVisible && (
        <button
          type="button"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Mostrar controles da aula"
          onClick={(event) => { event.stopPropagation(); togglePlayerControls(); }}
          data-testid="narrada-mostrar-controles"
        />
      )}

      {done && l.check && (
        <div className="absolute inset-x-4 bottom-28 z-30 mx-auto max-w-xl rounded-2xl border border-line bg-bg/95 p-4 shadow-xl backdrop-blur-xl sm:bottom-32" role="region" aria-label="Checagem">
          <p className="font-semibold">Confira o que viu (opcional)</p>
          <div className="mt-2 max-h-48 overflow-y-auto"><ActivityView a={l.check} onNext={() => undefined} /></div>
        </div>
      )}
    </div>
  );
}

function SceneMotionStrip({ scene, say }: { scene: Scene; say: string }) {
  const stopWords = new Set(['para', 'pela', 'pelo', 'como', 'isso', 'essa', 'esse', 'estas', 'estes', 'quando', 'onde', 'entre', 'sobre', 'muito', 'mais', 'menos', 'também', 'porque', 'então', 'depois', 'antes', 'ainda', 'cada', 'que', 'com', 'sem', 'uma', 'uns', 'umas', 'dos', 'das', 'por', 'não', 'são', 'ser', 'tem', 'ter', 'foi', 'vai', 'aos', 'nas', 'nos']);
  // Palavras-chave entram em sequência curta para dar movimento ao quadro sem
  // alongar a narração nem transformar a aula em uma pilha de slides.
  const keywords = Array.from(new Set((say + ' ' + say + ' ' + scene.heading)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
    .filter((word) => word.length >= 4 && !stopWords.has(word))))
    .slice(0, 5);
  const palettes = [
    'border-[#2e7182]/30 bg-[#d6e7e6] text-[#172e34]',
    'border-[#c8402a]/30 bg-[#f3d7ca] text-[#3a211c]',
    'border-[#9e6a14]/30 bg-[#f0e3bd] text-[#3b2c12]',
  ];
  const artFor = (word: string) => /dado|memoria|arquivo|valor|guardar|variavel/.test(word)
    ? 'dados'
    : /rede|internet|servidor|protocolo|pacote/.test(word)
      ? 'rede'
      : /nuvem|cloud|online/.test(word)
        ? 'nuvem'
        : /computador|processador|hardware|maquina/.test(word)
          ? 'computador'
          : (['livro', 'teclado', 'dados'] as const)[word.length % 3];
  if (!keywords.length) return null;
  return (
    <div className="relative flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 px-1 sm:gap-2.5" aria-hidden="true" data-testid="narrada-elementos-visuais">
      {keywords.map((word, i) => (
        <div
          key={scene.id + ':' + word}
          className={`anim-tile-in flex min-w-0 max-w-[48%] items-center gap-1.5 rounded-xl border px-2 py-1.5 shadow-sm transition-all duration-500 sm:gap-2 sm:px-3 sm:py-2 ${palettes[i % palettes.length]} `}
          style={{ animationDelay: `${i * 130}ms` }}
        >
          <span className="anim-bob grid h-8 w-9 shrink-0 place-items-center sm:h-10 sm:w-11"><Illustration name={artFor(word)} animate className="h-8 w-9 sm:h-10 sm:w-11" /></span>
          <span className="min-w-0 truncate text-xs font-bold capitalize sm:text-sm">{word}</span>
          <span className="hidden text-[0.58rem] font-bold uppercase tracking-wider opacity-65 sm:inline">{['IDEIA', 'LIGAÇÃO', 'EXEMPLO'][i]}</span>
        </div>
      ))}
    </div>
  );
}

function SceneView({ scene, reveal }: { scene: Scene; reveal: number }) {
  const v = scene.visual;
  if (v.kind === 'title')
    return (
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        {v.art && <Illustration name={v.art} animate className="h-28 w-36 text-ink" />}
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
            className={`relative pb-3 transition-all duration-500 last:pb-0 ${i === reveal - 1 ? 'anim-tile-in' : ''} ${i < reveal ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-20'}`}
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
        {v.cards.map((c, i) => {
          const subject = (c.title + ' ' + c.text).toLowerCase();
          const art = /computador|processador|\\bcpu\\b|hardware|máquina/.test(subject)
            ? 'computador'
            : /rede|servidor|roteador|\\bip\\b/.test(subject)
              ? 'rede'
              : /dado|memória|arquivo|banco|guardar/.test(subject)
                ? 'dados'
                : /nuvem|internet/.test(subject)
                  ? 'nuvem'
                  : (['livro', 'teclado', 'computador', 'dados'] as const)[i % 4];
          return (
            <div
              key={c.title}
              className={`rounded-2xl border p-4 transition-all duration-500 sm:p-5 ${i === reveal - 1 ? 'anim-tile-in' : ''} ${['border-[#2e7182]/35 bg-[#d6e7e6] text-[#172e34]','border-[#c8402a]/30 bg-[#f3d7ca] text-[#3a211c]','border-[#9e6a14]/30 bg-[#f0e3bd] text-[#3b2c12]','border-[#a8365e]/30 bg-[#edd6e0] text-[#3c2030]'][i % 4]} ${i < reveal ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-25'} ${i === reveal - 1 ? 'scale-[1.02] shadow-lg ring-2 ring-[#c8402a]/35' : ''}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Illustration name={art} animate className="h-10 w-12 shrink-0" />
                <p className="font-title text-lg leading-tight">{c.title}</p>
              </div>
              <p className="text-sm leading-relaxed">{c.text}</p>
            </div>
          );
        })}
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
