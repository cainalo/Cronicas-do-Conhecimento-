// Aula visual narrada com player de tela inteira, cena animada e linha do tempo arrastável.
// A busca é estimada por fala: a voz do aparelho não fornece uma duração exata de vídeo.
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNarrated } from '@/content';
import type { NarratedLesson, NumberLineState, Scene } from '@/content/narrated/types';
import { getVoice, readingMs } from '@/app/voice';
import { soundscape } from '@/app/soundscape';
import { beatIndexOf, narrationPositions, nextBeat, positionAtBeat, revealOf, transcript, type NarrationPos } from '@/lib/narration';
import { Icon } from '@/components/Icon';
import { Illustration, type IllustrationName } from '@/components/Illustration';
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
  const seekOffsetRef = useRef(0);
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
  // Mudanças de enquadramento graduais a cada ~2,8 s; a cena e os componentes não são remontados.
  const visualPhase = Math.min(2, Math.floor(beatElapsed / 2800));

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
    const requestedOffset = Math.min(duration, Math.max(0, seekOffsetRef.current));
    const requestedChar = requestedOffset > 0 ? Math.min(text.length - 1, Math.floor((requestedOffset / Math.max(1, duration)) * text.length)) : 0;
    const wordStarts = Array.from(text.matchAll(/\S+/g)).map((match) => match.index ?? 0);
    const startChar = wordStarts.reduce((nearest, candidate) =>
      Math.abs(candidate - requestedChar) < Math.abs(nearest - requestedChar) ? candidate : nearest, 0);
    const startOffset = text.length ? (startChar / text.length) * duration : 0;
    seekOffsetRef.current = 0;
    const spokenText = text.slice(startChar).trim() || text;
    let watchdog: number | undefined;
    let advanceTimer: number | undefined;
    const advance = () => {
      if (token.current !== ticket) return;
      const next = nextBeat(l, pos);
      if (next) {
        elapsedRef.current = 0;
        seekOffsetRef.current = 0;
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
      void voice.speak(spokenText, rate, {
        onStart: () => {
          if (token.current !== ticket) return;
          elapsedRef.current = startOffset;
          setBeatElapsed(startOffset);
          setVoiceStarted(true);
          armWatchdog();
        },
        onBoundary: (charIndex) => {
          if (token.current !== ticket) return;
          setSpeechWordIndex(wordIndexAtChar(text, startChar + charIndex));
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
    seekOffsetRef.current = 0;
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
    const targetOffset = Math.max(0, target - cursor);
    const localOffset = Math.min(durations[targetIndex] ?? 0, targetOffset);
    setPos(positionAtBeat(l, targetIndex));
    seekOffsetRef.current = localOffset;
    elapsedRef.current = localOffset;
    setBeatElapsed(localOffset);
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
      seekOffsetRef.current = 0;
      elapsedRef.current = 0;
      setBeatElapsed(0);
      setVoiceStarted(false);
      setSpeechWordIndex(undefined);
    } else {
      if (done) {
        setPos({ scene: 0, beat: 0 });
        seekOffsetRef.current = 0;
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
          <div className="relative flex h-full max-h-full w-full items-center justify-center" data-testid="narrada-elementos-visuais">
            <CinematicScene key={scene.id} scene={scene} reveal={revealOf(scene, pos.beat)} sceneIndex={pos.scene} sceneCount={l.scenes.length} beatIndex={pos.beat} phase={visualPhase} />
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
          {(say.match(/\S+\s*/g) ?? [say]).map((word, i) => {
            // No Android nativo não há evento de palavra; estimamos pela posição em
            // caracteres para que palavras longas não avancem tão depressa quanto as curtas.
            const estimatedWord = voiceStarted
              ? wordIndexAtChar(say, Math.floor((beatElapsed / Math.max(1, durations[beatIndex] ?? 2200)) * say.length))
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

/**
 * Plano de apoio editorial: usa apenas objetos, termos e números que pertencem à cena atual.
 * A cada quarto da fala entra um corte visual diferente, com movimento e cor chapada da identidade
 * editorial; não cria etiquetas a partir de palavras soltas da narração.
 */
/**
 * Direção de arte da aula: cenas compostas a partir dos dados didáticos existentes.
 * O palco permanece montado durante a fala. Só o conteúdo da cena muda quando a narração
 * avança para outra frase; não há alternância de componentes por porcentagem do relógio.
 */
type CinemaPalette = { background: string; accent: string; secondary: string; name: string };
const CINEMA_PALETTES: CinemaPalette[] = [
  { background: '#c8402a', accent: '#f0bf69', secondary: '#1b1a17', name: 'vermelhão editorial' },
  { background: '#1f5c7a', accent: '#ffbb8c', secondary: '#111f2a', name: 'azul petróleo' },
  { background: '#6e3b5c', accent: '#f0bf69', secondary: '#241521', name: 'ameixa' },
  { background: '#a8365e', accent: '#f3d7ca', secondary: '#351723', name: 'framboesa' },
  { background: '#9e6a14', accent: '#fff1c9', secondary: '#2c1e07', name: 'ocre' },
];

function illustrationForText(value: string): IllustrationName {
  const text = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/dado|memoria|arquivo|armazen|guardar|banco|informacao/.test(text)) return 'dados';
  if (/rede|internet|servidor|roteador|protocolo|pacote|conexao/.test(text)) return 'rede';
  if (/computador|processador|hardware|maquina|cpu|chip/.test(text)) return 'computador';
  if (/nuvem|cloud|online/.test(text)) return 'nuvem';
  if (/conta|soma|numero|reta|positivo|negativo|oposto|subtrair/.test(text)) return 'degraus';
  if (/tempo|ano|historia|data|origem|evolucao/.test(text)) return 'calendario';
  if (/cartao|teclado|entrada|saida|interruptor/.test(text)) return 'teclado';
  if (/lei|regra|direito|norma|controle/.test(text)) return 'balanca';
  return 'livro';
}

function CinematicScene({
  scene, reveal, sceneIndex, sceneCount, beatIndex, phase,
}: { scene: Scene; reveal: number; sceneIndex: number; sceneCount: number; beatIndex: number; phase: number }) {
  const visual = scene.visual;
  const palette = CINEMA_PALETTES[sceneIndex % CINEMA_PALETTES.length];
  const activeIndex = (length: number) => Math.max(0, Math.min(length - 1, reveal - 1));
  let headline = scene.heading;
  let support = '';
  let eyebrow = 'IDEIA EM FOCO';
  let art: IllustrationName = illustrationForText(scene.heading + ' ' + support);

  if (visual.kind === 'title') {
    headline = visual.title;
    support = visual.subtitle ?? support;
    art = visual.art ?? illustrationForText(visual.title);
    eyebrow = 'ABERTURA';
  } else if (visual.kind === 'cards') {
    const item = visual.cards[activeIndex(visual.cards.length)];
    if (item) { headline = item.title; support = item.text; art = illustrationForText(item.title + ' ' + item.text); }
    eyebrow = 'CONCEITO';
  } else if (visual.kind === 'timeline') {
    const item = visual.items[activeIndex(visual.items.length)];
    if (item) { headline = item.title; support = item.text; art = illustrationForText(item.title + ' ' + item.text); eyebrow = item.year; }
  } else if (visual.kind === 'equation') {
    headline = visual.lines[activeIndex(visual.lines.length)] ?? visual.lines[0] ?? scene.heading;
    support = visual.note ?? '';
    art = illustrationForText(headline + ' ' + support);
    eyebrow = 'ETAPA DO RACIOCÍNIO';
  } else if (visual.kind === 'numberline') {
    const state = visual.states[Math.min(visual.states.length - 1, Math.max(0, reveal))] ?? visual.states[0] ?? {};
    const jump = state.jumps?.[0];
    headline = jump ? (jump.to > jump.from ? 'Avance para a direita' : 'Volte para a esquerda') : 'Encontre a posição';
    eyebrow = 'RETA NUMÉRICA';
    art = 'degraus';
  }

  return (
    <article
      className="ccv-scene"
      style={{ '--ccv-background': palette.background, '--ccv-accent': palette.accent, '--ccv-secondary': palette.secondary } as CSSProperties}
      aria-label={scene.heading}
      data-testid="narrada-cena-cinematica"
      data-phase={phase}
    >
      <div className="ccv-scene__orbit ccv-scene__orbit--one" aria-hidden="true" />
      <div className="ccv-scene__orbit ccv-scene__orbit--two" aria-hidden="true" />
      <div className="ccv-scene__top">
        <span>CRÔNICAS DO CONHECIMENTO</span>
        <span className="ccv-scene__counter">{String(sceneIndex + 1).padStart(2, '0')} <i /> {String(sceneCount).padStart(2, '0')}</span>
      </div>

      <div className={'ccv-scene__layout ccv-scene__layout--phase-' + phase}>
        <div className="ccv-scene__copy">
          <p className="ccv-scene__eyebrow"><span />{eyebrow}</p>
          <h2 key={scene.id + ':' + beatIndex + ':' + headline} className="ccv-scene__headline ccv-scene__change">{headline}</h2>
          <p key={scene.id + ':' + beatIndex + ':' + support} className="ccv-scene__support ccv-scene__change">{support}</p>
          <div className="ccv-scene__soundline" aria-hidden="true">
            <span className="ccv-scene__soundline-mark">▶</span>
            <span className="ccv-scene__soundline-rule"><i /></span>
            <span className="ccv-scene__soundline-label">AULA NARRADA</span>
          </div>
        </div>

        <div className="ccv-scene__visual" key={scene.id + ':' + visual.kind} data-testid="narrada-cena-visual">
          {visual.kind === 'title' && (
            <div className="ccv-scene__hero-art">
              <div className="ccv-scene__art-disc" aria-hidden="true"><span /><span /><span /></div>
              <Illustration name={art} accent={palette.accent} animate className="ccv-scene__illustration ccv-scene__illustration--hero" label={visual.title} />
              {visual.subtitle && <span className="ccv-scene__floating-label">{visual.subtitle}</span>}
            </div>
          )}

          {visual.kind === 'cards' && (
            <div className="ccv-sequence">
              <div className="ccv-sequence__rail" aria-hidden="true" />
              {visual.cards.map((item, index) => (
                <div key={scene.id + ':step:' + index} className={'ccv-sequence__step ' + (index === activeIndex(visual.cards.length) ? 'is-active ccv-scene__change' : index < activeIndex(visual.cards.length) ? 'is-past' : '')}>
                  <span className="ccv-sequence__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="ccv-sequence__label">{item.title}</span>
                </div>
              ))}
              <div className="ccv-sequence__focus">
                <span className="ccv-sequence__focus-number">{String(activeIndex(visual.cards.length) + 1).padStart(2, '0')}</span>
                <Illustration name={art} accent={palette.accent} animate className="ccv-scene__illustration" />
              </div>
            </div>
          )}

          {visual.kind === 'timeline' && (
            <div className="ccv-timeline">
              <div className="ccv-timeline__path" aria-hidden="true"><span style={{ height: (((activeIndex(visual.items.length) + 1) / visual.items.length) * 100) + '%' }} /></div>
              {visual.items.map((item, index) => (
                <div key={scene.id + ':event:' + index} className={'ccv-timeline__event ' + (index === activeIndex(visual.items.length) ? 'is-active ccv-scene__change' : index < activeIndex(visual.items.length) ? 'is-past' : '')}>
                  <span className="ccv-timeline__dot">{index < activeIndex(visual.items.length) ? '✓' : String(index + 1).padStart(2, '0')}</span>
                  <span className="ccv-timeline__year">{item.year}</span>
                  <strong>{item.title}</strong>
                  {index === activeIndex(visual.items.length) && <span className="ccv-timeline__current">AGORA</span>}
                </div>
              ))}
              <div className="ccv-timeline__illustration"><Illustration name={art} accent={palette.accent} animate className="ccv-scene__illustration" /></div>
            </div>
          )}

          {visual.kind === 'equation' && (
            <div className="ccv-equation">
              {visual.lines.map((line, index) => (
                <div key={scene.id + ':equation:' + index} className={'ccv-equation__line ' + (index === activeIndex(visual.lines.length) ? 'is-active ccv-scene__change' : index < activeIndex(visual.lines.length) ? 'is-past' : '')}>
                  <span className="ccv-equation__index">{index === 0 ? 'PASSO 1' : 'PASSO ' + (index + 1)}</span>
                  <strong>{line}</strong>
                  {index === activeIndex(visual.lines.length) && <span className="ccv-equation__underline" />}
                </div>
              ))}
              {visual.note && <p className="ccv-equation__note">{visual.note}</p>}
            </div>
          )}

          {visual.kind === 'numberline' && (
            <CinematicNumberLine from={visual.from} to={visual.to} state={visual.states[Math.min(visual.states.length - 1, Math.max(0, reveal))] ?? visual.states[0] ?? {}} />
          )}
        </div>
      </div>
      <div className="ccv-scene__footer"><span>{scene.heading}</span><span className="ccv-scene__footer-rule" /><span>APRENDER · ENTENDER · APLICAR</span></div>
    </article>
  );
}

function CinematicNumberLine({ from, to, state }: { from: number; to: number; state: NumberLineState }) {
  const width = 680;
  const pad = 26;
  const y = 122;
  const x = (value: number) => pad + ((value - from) / (to - from)) * (width - pad * 2);
  const points = state.points ?? [];
  const jump = state.jumps?.[0];
  const current = points.length ? points[points.length - 1] : 0;
  return (
    <div className="ccv-numberline">
      <svg viewBox={`0 0 ${width} 210`} role="img" aria-label="Reta numérica animada">
        <path d={`M${pad} ${y} H${width - pad}`} className="ccv-numberline__base" />
        {Array.from({ length: to - from + 1 }, (_, index) => from + index).map((number) => (
          <g key={number}>
            <path d={`M${x(number)} ${y - 14} V${y + 14}`} className="ccv-numberline__tick" />
            <text x={x(number)} y={y + 43} textAnchor="middle" className="ccv-numberline__label">{number}</text>
          </g>
        ))}
        {jump && <path key={`${jump.from}-${jump.to}`} d={`M${x(jump.from)} ${y - 12} Q${(x(jump.from) + x(jump.to)) / 2} 18 ${x(jump.to)} ${y - 12}`} className="ccv-numberline__jump" pathLength="1" />}
        {points.map((number, index) => (
          <circle key={number + ':' + index} cx={x(number)} cy={y} r={index === points.length - 1 ? 12 : 7} className={index === points.length - 1 ? 'ccv-numberline__point is-current' : 'ccv-numberline__point'} />
        ))}
      </svg>
      <div className="ccv-numberline__readout"><span>POSIÇÃO</span><strong>{current > 0 ? '+' + current : String(current)}</strong>{jump && <em>{jump.from} → {jump.to}</em>}</div>
    </div>
  );
}
