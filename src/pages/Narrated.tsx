// Aula visual narrada com player de tela inteira, cena animada e linha do tempo arrastável.
// A busca é estimada por fala: a voz do aparelho não fornece uma duração exata de vídeo.
import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNarrated } from '@/content';
import type { NarratedLesson, NumberLineState, Scene } from '@/content/narrated/types';
import { GEMINI_TTS_VOICES, getGeminiTtsApiKey, getGeminiTtsVoice, getVoice, saveGeminiTtsApiKey, saveGeminiTtsVoice, type VoiceAudioTrack } from '@/app/voice';
import { soundscape } from '@/app/soundscape';
import { beatIndexOf, narrationPositions, nextBeat, positionAtBeat, revealOf, transcript, type NarrationPos } from '@/lib/narration';
import { Icon } from '@/components/Icon';
import { Illustration, type IllustrationName } from '@/components/Illustration';

const RATES = [0.8, 1, 1.2] as const;
const VOICE_LABEL = { gemini: 'voz neural Gemini · áudio gerado por IA', nativa: 'voz pt-BR priorizada do aparelho (neural/natural quando instalada)', navegador: 'voz pt-BR priorizada do navegador (neural/natural quando disponível)', nenhuma: 'sem voz neste aparelho: legendas no tempo de leitura' } as const;
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

function cueDurationMs(text: string, rate = 1): number {
  const normalized = text.trim();
  const words = normalized.split(/\s+/).filter(Boolean).length;
  const commas = (normalized.match(/[,;:]/g) ?? []).length;
  const sentenceStops = (normalized.match(/[.!?…]/g) ?? []).length;
  const endingPause = /[,;:]$/.test(normalized) ? 90 : /[.!?…]$/.test(normalized) ? 230 : 0;
  return Math.max(750, (words / 2.15) * 1000 + commas * 85 + sentenceStops * 145 + endingPause) / rate;
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
  const [showCaptions, setShowCaptions] = useState(true);
  const [done, setDone] = useState(false);
  const [beatElapsed, setBeatElapsed] = useState(0);
  const [voiceStarted, setVoiceStarted] = useState(false);
  const [speechWordIndex, setSpeechWordIndex] = useState<number>();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [geminiKeyDraft, setGeminiKeyDraft] = useState(() => getGeminiTtsApiKey());
  const [geminiVoiceDraft, setGeminiVoiceDraft] = useState(() => getGeminiTtsVoice());
  const [voiceStatus, setVoiceStatus] = useState('');
  const [testingVoice, setTestingVoice] = useState(false);
  const [preparingTrack, setPreparingTrack] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<VoiceAudioTrack | null>(null);
  const [trackDurationMs, setTrackDurationMs] = useState(0);
  const [mediaElapsedMs, setMediaElapsedMs] = useState(0);
  const hideControlsTimer = useRef<number | undefined>(undefined);
  const controlsInteractionActive = useRef(false);
  const trackRef = useRef<VoiceAudioTrack | null>(null);
  const trackRequest = useRef(0);
  const activeCueRef = useRef(0);
  const elapsedRef = useRef(0);
  const resumeAfterSeek = useRef(false);
  const seekOffsetRef = useRef(0);
  const token = useRef(0);
  const voice = getVoice();
  const positions = useMemo(() => narrationPositions(l), [l]);
  const beatIndex = beatIndexOf(l, pos);
  // Cada marca usa peso aproximado pela fala, sem o mínimo artificial de 2,6 s por frase.
  // Com a faixa neural, os pesos são normalizados pela duração real do áudio.
  const durations = useMemo(() => positions.map((p) => cueDurationMs(l.scenes[p.scene].beats[p.beat].say, rate)), [l, positions, rate]);
  const estimatedTotalMs = durations.reduce((sum, value) => sum + value, 0);
  const trackDurations = useMemo(() => positions.map((p) => cueDurationMs(l.scenes[p.scene].beats[p.beat].say)), [l, positions]);
  const estimatedTrackTotalMs = trackDurations.reduce((sum, value) => sum + value, 0);
  // Uma faixa por aula, com fala contínua dentro de cada cena e pausa apenas entre cenas.
  const script = useMemo(() => l.scenes.map((item) => item.beats.map((beat) => beat.say.trim()).join(' ')).join('\n\n'), [l]);
  const hasGeneratedTrack = voice.kind === 'gemini' && !!generatedTrack;
  const totalMs = hasGeneratedTrack && trackDurationMs > 0 ? trackDurationMs : estimatedTotalMs;
  const beforeMs = durations.slice(0, beatIndex).reduce((sum, value) => sum + value, 0);
  const currentMs = Math.min(totalMs, hasGeneratedTrack ? mediaElapsedMs : beforeMs + beatElapsed);
  const scene = l.scenes[pos.scene];
  const say = scene.beats[pos.beat].say;
  const captionClockDuration = (hasGeneratedTrack ? trackDurations[beatIndex] : durations[beatIndex]) ?? 2200;
  const captionEstimatedWord = wordIndexAtChar(say, Math.floor((beatElapsed / Math.max(1, captionClockDuration)) * say.length));
  const captionWordIndex = Math.max(0, Math.min((say.match(/\S+\s*/g) ?? [say]).length - 1, speechWordIndex ?? captionEstimatedWord));
  // O B-roll é calculado pela duração da cena inteira, não pela frase isolada.
  // Assim ele entra uma única vez no meio da sequência e não abre/fecha a cada legenda.
  const sceneCueDurations = scene.beats.map((beat) => cueDurationMs(beat.say, hasGeneratedTrack ? 1 : rate));
  const sceneDurationMs = sceneCueDurations.reduce((sum, value) => sum + value, 0);
  const sceneElapsedMs = sceneCueDurations.slice(0, pos.beat).reduce((sum, value) => sum + value, 0)
    + Math.min(sceneCueDurations[pos.beat] ?? 0, beatElapsed);
  const sceneProgress = Math.min(1, sceneElapsedMs / Math.max(1, sceneDurationMs));
  const supportsCutaway = scene.beats.length > 1 && sceneDurationMs >= 9500 && scene.visual.kind !== 'title';
  // Visibilidade baseada na posição do filme, não no estado instantâneo da voz:
  // a síntese local faz pequenas pausas entre frases, mas o plano não deve piscar nelas.
  // Isso também mantém o mesmo quadro quando a pessoa pausa ou arrasta a linha do tempo.
  const cutawayVisible = supportsCutaway && sceneProgress >= 0.34 && sceneProgress < 0.68;

  const stop = useCallback(() => {
    token.current += 1;
    voice.stop();
  }, [voice]);

  useEffect(() => () => {
    trackRequest.current += 1;
    trackRef.current?.dispose();
    trackRef.current = null;
    stop();
  }, [stop]);
  // Carrega em segundo plano as fotos históricas desta aula para que uma troca de plano
  // não mostre um retângulo vazio enquanto a imagem é baixada durante a narração.
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (const item of l.scenes) {
      if (item.visual.kind !== 'timeline') continue;
      for (const entry of item.visual.items) {
        const photo = historicalVisualFor(entry.title + ' ' + entry.text);
        if (!photo) continue;
        const image = new Image();
        image.decoding = 'async';
        image.src = photo.src;
        images.push(image);
      }
    }
    return () => {
      for (const image of images) { image.onload = null; image.onerror = null; }
    };
  }, [l]);

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
  const clearControlsHideTimer = useCallback(() => {
    if (hideControlsTimer.current !== undefined) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = undefined;
  }, []);

  // O prazo conta a partir da última interação; uma cena mudar não reinicia o contador.
  // Enquanto o dedo ou o mouse estiver pressionado sobre um controle, a interface não some.
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    clearControlsHideTimer();
    if (controlsInteractionActive.current) return;
    hideControlsTimer.current = window.setTimeout(() => {
      hideControlsTimer.current = undefined;
      if (!controlsInteractionActive.current) setControlsVisible(false);
    }, 3800);
  }, [clearControlsHideTimer]);

  const beginControlsInteraction = useCallback(() => {
    controlsInteractionActive.current = true;
    clearControlsHideTimer();
    setControlsVisible(true);
  }, [clearControlsHideTimer]);

  const endControlsInteraction = useCallback(() => {
    if (!controlsInteractionActive.current) return;
    controlsInteractionActive.current = false;
    revealControls();
  }, [revealControls]);

  // Also catches pointer releases outside the control row (e.g. dragging the seek bar).
  useEffect(() => {
    const finishInteraction = () => endControlsInteraction();
    window.addEventListener('pointerup', finishInteraction);
    window.addEventListener('pointercancel', finishInteraction);
    return () => {
      window.removeEventListener('pointerup', finishInteraction);
      window.removeEventListener('pointercancel', finishInteraction);
    };
  }, [endControlsInteraction]);

  const togglePlayerControls = useCallback(() => {
    if (controlsVisible) {
      clearControlsHideTimer();
      setControlsVisible(false);
    } else {
      revealControls();
    }
  }, [controlsVisible, revealControls, clearControlsHideTimer]);

  useEffect(() => {
    if (controlsVisible) {
      if (!controlsInteractionActive.current) revealControls();
    } else {
      clearControlsHideTimer();
    }
    return clearControlsHideTimer;
  }, [controlsVisible, revealControls, clearControlsHideTimer]);

  useEffect(() => () => {
    controlsInteractionActive.current = false;
    clearControlsHideTimer();
  }, [clearControlsHideTimer]);

  useEffect(() => {
    soundscape.duck(playing && voice.kind !== 'nenhuma');
    return () => soundscape.duck(false);
  }, [playing, voice]);

  // O áudio neural é uma única faixa para a aula toda: o usuário pode buscar qualquer segundo
  // real da gravação, e o conteúdo visual acompanha a posição sem reiniciar o áudio a cada frase.
  useEffect(() => {
    if (!generatedTrack) return;
    const audio = generatedTrack.audio;
    const updatePosition = () => {
      const realDuration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : trackDurationMs;
      if (realDuration > 0 && realDuration !== trackDurationMs) setTrackDurationMs(realDuration);
      const mediaMs = Math.min(realDuration || estimatedTotalMs, Math.max(0, audio.currentTime * 1000));
      setMediaElapsedMs(mediaMs);
      const projectedMs = realDuration > 0 ? (mediaMs / realDuration) * estimatedTrackTotalMs : mediaMs;
      let cursor = 0;
      let nextIndex = Math.max(0, trackDurations.length - 1);
      for (let i = 0; i < trackDurations.length; i++) {
        if (projectedMs < cursor + trackDurations[i] || i === trackDurations.length - 1) { nextIndex = i; break; }
        cursor += trackDurations[i];
      }
      if (activeCueRef.current !== nextIndex) {
        activeCueRef.current = nextIndex;
        setPos(positionAtBeat(l, nextIndex));
        setSpeechWordIndex(undefined);
      }
      const localElapsed = Math.max(0, Math.min(trackDurations[nextIndex] ?? 0, projectedMs - cursor));
      elapsedRef.current = localElapsed;
      setBeatElapsed(localElapsed);
      setVoiceStarted(!audio.paused && !audio.ended);
    };
    const onEnded = () => {
      updatePosition();
      setPlaying(false);
      setDone(true);
      setVoiceStarted(false);
    };
    audio.addEventListener('timeupdate', updatePosition);
    audio.addEventListener('loadedmetadata', updatePosition);
    audio.addEventListener('play', updatePosition);
    audio.addEventListener('pause', updatePosition);
    audio.addEventListener('ended', onEnded);
    audio.playbackRate = rate;
    if (playing) {
      updatePosition();
      void audio.play().catch((error) => {
        setPlaying(false);
        setVoiceStatus(error instanceof Error ? error.message : 'Não foi possível reproduzir o áudio.');
      });
    } else {
      audio.pause();
      updatePosition();
    }
    return () => {
      audio.removeEventListener('timeupdate', updatePosition);
      audio.removeEventListener('loadedmetadata', updatePosition);
      audio.removeEventListener('play', updatePosition);
      audio.removeEventListener('pause', updatePosition);
      audio.removeEventListener('ended', onEnded);
    };
  }, [generatedTrack, playing, l, trackDurations, rate, estimatedTrackTotalMs, trackDurationMs]);

  useEffect(() => {
    if (!playing || !positions.length || (voice.kind === 'gemini' && voice.createAudioTrack)) return;
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
      }).catch((error) => {
        if (token.current !== ticket) return;
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (watchdog !== undefined) window.clearTimeout(watchdog);
        setVoiceStatus(error instanceof Error ? error.message : 'Não foi possível gerar a voz. Confira a conexão e as preferências.');
        if (voice.kind === 'gemini') {
          setShowVoiceSettings(true);
          setControlsVisible(true);
          setPlaying(false);
        } else {
          advanceTimer = window.setTimeout(advance, Math.max(900, duration));
        }
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
    const targetIndex = beatIndexOf(l, p);
    if (trackRef.current && Number.isFinite(trackRef.current.audio.duration) && trackRef.current.audio.duration > 0) {
      const estimatedPosition = trackDurations.slice(0, targetIndex).reduce((sum, value) => sum + value, 0);
      const targetMs = estimatedTrackTotalMs > 0 ? (estimatedPosition / estimatedTrackTotalMs) * trackRef.current.audio.duration * 1000 : 0;
      trackRef.current.audio.currentTime = targetMs / 1000;
      activeCueRef.current = targetIndex;
      setMediaElapsedMs(targetMs);
      setPos(p);
      setBeatElapsed(0);
      elapsedRef.current = 0;
      setSpeechWordIndex(undefined);
      setVoiceStarted(!trackRef.current.audio.paused);
      setDone(false);
      return;
    }
    stop();
    activeCueRef.current = targetIndex;
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
      if (trackRef.current) {
        trackRef.current.audio.pause();
        setPlaying(false);
        setVoiceStarted(false);
      } else {
        stop();
        setPlaying(false);
        setVoiceStarted(false);
        setSpeechWordIndex(undefined);
      }
    }
  };

  const seekTo = (rawValue: number) => {
    const target = Math.max(0, Math.min(totalMs, rawValue));
    if (trackRef.current && Number.isFinite(trackRef.current.audio.duration) && trackRef.current.audio.duration > 0) {
      const audio = trackRef.current.audio;
      const clamped = Math.min(audio.duration * 1000, target);
      audio.currentTime = clamped / 1000;
      setMediaElapsedMs(clamped);
      const projectedMs = (clamped / Math.max(1, audio.duration * 1000)) * estimatedTrackTotalMs;
      let cursor = 0;
      let targetIndex = Math.max(0, trackDurations.length - 1);
      for (let i = 0; i < trackDurations.length; i++) {
        if (projectedMs < cursor + trackDurations[i] || i === trackDurations.length - 1) { targetIndex = i; break; }
        cursor += trackDurations[i];
      }
      activeCueRef.current = targetIndex;
      setPos(positionAtBeat(l, targetIndex));
      const localOffset = Math.max(0, Math.min(trackDurations[targetIndex] ?? 0, projectedMs - cursor));
      seekOffsetRef.current = localOffset;
      elapsedRef.current = localOffset;
      setBeatElapsed(localOffset);
      setVoiceStarted(!audio.paused && !audio.ended);
      setSpeechWordIndex(undefined);
      setDone(false);
      return;
    }

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
    activeCueRef.current = targetIndex;
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

  const discardGeneratedTrack = () => {
    trackRequest.current += 1;
    trackRef.current?.dispose();
    trackRef.current = null;
    setGeneratedTrack(null);
    setTrackDurationMs(0);
    setMediaElapsedMs(0);
    setPreparingTrack(false);
  };

  const togglePlayback = () => {
    if (playing) {
      if (trackRef.current) {
        trackRef.current.audio.pause();
        setPlaying(false);
        setVoiceStarted(false);
        return;
      }
      stop();
      setPlaying(false);
      seekOffsetRef.current = 0;
      elapsedRef.current = 0;
      setBeatElapsed(0);
      setVoiceStarted(false);
      setSpeechWordIndex(undefined);
      return;
    }

    if (done) {
      if (trackRef.current) {
        trackRef.current.audio.currentTime = 0;
        setMediaElapsedMs(0);
      }
      activeCueRef.current = 0;
      setPos({ scene: 0, beat: 0 });
      seekOffsetRef.current = 0;
      elapsedRef.current = 0;
      setBeatElapsed(0);
      setVoiceStarted(false);
      setSpeechWordIndex(undefined);
    }
    setDone(false);

    if (voice.kind === 'gemini' && voice.createAudioTrack) {
      if (trackRef.current) {
        setPlaying(true);
        return;
      }
      if (preparingTrack) return;
      const requestId = ++trackRequest.current;
      setPreparingTrack(true);
      setVoiceStatus('Gerando uma única faixa contínua de áudio para esta aula…');
      void voice.createAudioTrack(script, rate).then((track) => {
        if (requestId !== trackRequest.current) {
          track.dispose();
          return;
        }
        trackRef.current = track;
        setGeneratedTrack(track);
        setTrackDurationMs(track.durationMs);
        setMediaElapsedMs(0);
        activeCueRef.current = 0;
        setPos({ scene: 0, beat: 0 });
        setBeatElapsed(0);
        setVoiceStarted(false);
        setVoiceStatus('');
        setPlaying(true);
      }).catch((error) => {
        if (requestId !== trackRequest.current || (error instanceof DOMException && error.name === 'AbortError')) return;
        setVoiceStatus(error instanceof Error ? error.message : 'Não foi possível gerar o áudio. Confira a chave e a conexão.');
        setShowVoiceSettings(true);
        setControlsVisible(true);
        setPlaying(false);
      }).finally(() => {
        if (requestId === trackRequest.current) setPreparingTrack(false);
      });
      return;
    }

    setPlaying(true);
  };

  // O palco visual ocupa a viewport inteira. Cabeçalho, legenda e controles são camadas
  // flutuantes com margens seguras; nunca empurram o vídeo nem ficam colados às bordas.
  const shell = 'fixed left-0 right-0 top-0 bottom-0 z-[100] isolate h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-screen min-w-[100vw] max-w-none overflow-hidden rounded-none bg-[#c8402a] text-ink';
  const visibleClass = controlsVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none translate-y-2 opacity-0';
  const stopOverlayClick = (event: MouseEvent) => event.stopPropagation();

  return createPortal((
    <div
      className={shell}
      style={{ width: '100vw', minWidth: '100vw', maxWidth: '100vw', height: '100dvh', minHeight: '100dvh', maxHeight: '100dvh', margin: 0, boxSizing: 'border-box' }}
      data-embedded={embedded ? 'true' : undefined}
      data-testid="narrada-player"
      onClick={togglePlayerControls}
      onPointerMove={(event) => { if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0)) revealControls(); }}
      onKeyDown={revealControls}
    >
      <section className="absolute inset-0 overflow-hidden bg-bg" aria-label="Aula em vídeo narrado" data-testid="narrada-stage" onClick={(event) => { event.stopPropagation(); togglePlayerControls(); }}>
        <div
          className="absolute inset-0 grid place-items-center"
          data-testid="narrada-cena"
        >
          <div className="relative flex h-full max-h-full w-full items-center justify-center" data-testid="narrada-elementos-visuais">
            <CinematicSceneMemo
              scene={scene}
              reveal={revealOf(scene, pos.beat)}
              sceneIndex={pos.scene}
              sceneCount={l.scenes.length}
              beatIndex={pos.beat}
              controlsVisible={controlsVisible}
              cutawayVisible={cutawayVisible}
              showCaptions={showCaptions}
              captionText={say}
              captionWordIndex={captionWordIndex}
              highlightCaptionWord={playing && voiceStarted}
            />
          </div>
        </div>
      </section>

      <div
        className={`absolute left-3 top-[max(0.85rem,env(safe-area-inset-top))] z-30 max-w-[calc(100vw-5.5rem)] transition-all duration-300 ${visibleClass}`}
        onClick={stopOverlayClick} aria-hidden={!controlsVisible} data-testid="narrada-titulo-flutuante"
      >
        <div className="rounded-full border border-white/20 bg-[#171b1b]/78 px-3 py-2 text-white shadow-lg backdrop-blur-md">
          <p className="text-[0.55rem] font-black uppercase tracking-[0.15em] text-[#ffbb8c]">{embedded ? 'Aula narrada · IA' : 'Aula narrada · ' + l.minutes + ' min'}</p>
          <p className="mt-0.5 truncate text-sm font-semibold leading-tight sm:text-base">{l.title}</p>
          <p className="truncate text-[0.65rem] text-white/70">{scene.heading} · cena {pos.scene + 1}/{l.scenes.length}</p>
        </div>
      </div>
      <button type="button" className={`absolute right-3 top-[max(0.85rem,env(safe-area-inset-top))] z-40 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[#171b1b]/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 ${visibleClass}`}
        onClick={(event) => { event.stopPropagation(); stop(); setPlaying(false); if (onClose) onClose(); }}
        aria-label={exitLabel} title={exitLabel} data-testid="narrada-sair">
        <Icon name="sair" size={19} />
      </button>
      <div className={`absolute bottom-[calc(4.7rem+env(safe-area-inset-bottom))] left-4 right-4 z-30 mx-auto max-w-2xl transition-all duration-300 ${visibleClass}`}
        onClick={stopOverlayClick}
        onPointerDown={beginControlsInteraction}
        onPointerUp={endControlsInteraction}
        onPointerCancel={endControlsInteraction}
        aria-hidden={!controlsVisible} data-testid="narrada-seek-panel">
        <div className="rounded-xl border border-white/20 bg-[#171b1b]/82 px-3 py-2 text-white shadow-lg backdrop-blur-lg">
          <div className="mb-1 flex items-center justify-between gap-3 text-[0.62rem] font-semibold tabular-nums text-white/75">
            <span>{formatTime(currentMs)}</span><span>{formatTime(totalMs)} · {hasGeneratedTrack ? 'faixa de áudio' : 'tempo estimado'}</span>
          </div>
          <input type="range" min={0} max={Math.max(1, totalMs)} step={100} value={Math.min(totalMs, currentMs)}
            onPointerDown={startSeek} onPointerUp={finishSeek} onPointerCancel={finishSeek}
            onChange={(e) => seekTo(Number(e.target.value))} aria-label="Barra de progresso da aula"
            aria-valuetext={'Posição ' + formatTime(currentMs) + ' de ' + formatTime(totalMs)}
            className="block h-5 w-full cursor-pointer accent-[#f0bf69]" data-testid="narrada-seek" />
        </div>
      </div>
      <div className={`absolute bottom-[max(0.35rem,env(safe-area-inset-bottom))] left-2 right-2 z-30 mx-auto flex max-w-xl items-center justify-center gap-1.5 px-1 transition-all duration-300 sm:bottom-[max(0.85rem,env(safe-area-inset-bottom))] sm:gap-3 ${visibleClass}`}
        onClick={stopOverlayClick}
        onPointerDown={beginControlsInteraction}
        onPointerUp={endControlsInteraction}
        onPointerCancel={endControlsInteraction}
        aria-hidden={!controlsVisible} data-testid="narrada-controles-flutuantes">
        <span className="sr-only">{VOICE_LABEL[voice.kind]}</span>
        <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-[#171b1b]/82 text-white shadow-lg backdrop-blur-md transition hover:bg-[#1f5c7a]" onClick={() => jump(positionAtBeat(l, Math.max(0, beatIndex - 1)))} aria-label="Voltar uma fala"><Icon name="voltar" size={17} /></button>
        <button type="button" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white/25 bg-[#c8402a] text-white shadow-xl transition hover:bg-[#a0301c]" onClick={togglePlayback} disabled={preparingTrack} aria-label={preparingTrack ? 'Preparando a narração' : playing ? 'Pausar aula' : done ? 'Assistir novamente' : 'Reproduzir aula'} data-testid="narrada-tocar">{preparingTrack ? <Icon name="ampulheta" size={19} /> : playing ? <span aria-hidden="true" className="text-xl leading-none">Ⅱ</span> : <Icon name="play" size={19} />}</button>
        <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-[#171b1b]/82 text-white shadow-lg backdrop-blur-md transition hover:bg-[#1f5c7a]" onClick={() => jump(positionAtBeat(l, Math.min(positions.length - 1, beatIndex + 1)))} aria-label="Avançar uma fala"><Icon name="seta" size={17} /></button>
        <label className="shrink-0" onClick={stopOverlayClick}><span className="sr-only">Velocidade da voz</span>
          <select className="h-10 max-w-[3.6rem] rounded-full border border-white/20 bg-[#171b1b]/88 px-2 text-xs font-bold text-white shadow-lg backdrop-blur-md sm:max-w-[4.2rem]" value={rate} onChange={(e) => setRate(Number(e.target.value) as (typeof RATES)[number])} aria-label="Velocidade da voz" data-testid="narrada-velocidade">
            {RATES.map((r) => <option key={r} value={r}>{r.toLocaleString('pt-BR')}×</option>)}
          </select>
        </label>
        <button type="button" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white shadow-lg backdrop-blur-md transition ${voice.kind === 'gemini' ? 'bg-[#6e3b5c]' : 'bg-[#171b1b]/82 hover:bg-[#6e3b5c]'}`} onClick={() => { setShowTranscript(false); setShowVoiceSettings((v) => !v); setVoiceStatus(''); }} aria-label="Preferências de voz" aria-expanded={showVoiceSettings} data-testid="narrada-preferencias-voz"><Icon name="alaude" size={17} /></button>
        <button
          type="button"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xs font-black tracking-tight text-white shadow-lg transition ${showCaptions ? 'border-white/45 bg-[#1f5c7a]' : 'border-white/20 bg-[#171b1b]/82 hover:bg-[#1f5c7a]'}`}
          onClick={() => setShowCaptions((value) => !value)}
          aria-label={showCaptions ? 'Desativar legendas' : 'Ativar legendas'}
          aria-pressed={showCaptions}
          title={showCaptions ? 'Desativar legendas' : 'Ativar legendas'}
          data-testid="narrada-legendas-toggle"
        >CC</button>
        <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-[#171b1b]/82 text-white shadow-lg backdrop-blur-md transition hover:bg-[#1f5c7a]" onClick={() => { setShowVoiceSettings(false); setShowTranscript((v) => !v); }} aria-label={showTranscript ? 'Ocultar transcrição' : 'Transcrição'} aria-expanded={showTranscript} data-testid="narrada-transcricao"><Icon name="livro" size={17} /></button>
      </div>
      <div
        className={`absolute bottom-[calc(7.1rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-2 transition-all duration-300 ${visibleClass}`}
        onClick={stopOverlayClick}
        onPointerDown={beginControlsInteraction}
        onPointerUp={endControlsInteraction}
        onPointerCancel={endControlsInteraction}
        aria-hidden={!controlsVisible}
        aria-label="Ir para uma cena da aula"
        data-testid="narrada-marcadores-cena"
      >
        {l.scenes.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`h-2 rounded-full transition-all duration-500 ${i === pos.scene ? 'w-7 bg-[#f0bf69]' : i < pos.scene ? 'w-2 bg-white/65' : 'w-2 bg-white/25 hover:bg-white/65'}`}
            aria-label={'Ir para a cena ' + (i + 1) + ': ' + item.heading}
            aria-current={i === pos.scene ? 'step' : undefined}
            onClick={() => jump({ scene: i, beat: 0 })}
          />
        ))}
      </div>

      {showVoiceSettings && controlsVisible && (
        <section className="absolute bottom-[calc(9.5rem+env(safe-area-inset-bottom))] left-3 right-3 z-40 mx-auto max-h-[calc(100dvh-12rem)] max-w-xl overflow-y-auto rounded-2xl border border-white/20 bg-[#171b1b]/96 p-4 text-white shadow-2xl backdrop-blur-xl" onClick={stopOverlayClick} onPointerDown={beginControlsInteraction} onPointerUp={endControlsInteraction} onPointerCancel={endControlsInteraction} aria-label="Configurações da voz" data-testid="narrada-painel-voz">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">Voz da narração</h2><p className="mt-1 text-xs leading-relaxed text-white/70">Para uma narração mais natural, use a voz neural Gemini. Ela gera uma faixa de áudio contínua para a aula inteira; precisa de internet e de uma chave pessoal.</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold">
              <a className="text-[#ffbb8c] underline underline-offset-2" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Criar ou copiar chave no AI Studio ↗</a>
              <a className="text-white/70 underline underline-offset-2" href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer">Ver cotas e preços ↗</a>
            </div>
            <p className="mt-2 text-[0.65rem] leading-relaxed text-white/55">A chave fica salva neste navegador/aparelho e é enviada diretamente à API do Google quando o áudio é gerado. Confira as cotas antes de usar.</p></div>
            <button type="button" onClick={() => setShowVoiceSettings(false)} aria-label="Fechar preferências de voz" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">×</button>
          </div>
          <label className="mt-3 block text-sm font-semibold">Voz neural Gemini
            <select className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-[#282725] px-3 text-sm text-white" value={geminiVoiceDraft} onChange={(e) => setGeminiVoiceDraft(e.target.value)} data-testid="narrada-gemini-voice">{GEMINI_TTS_VOICES.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}</select>
          </label>
          <label className="mt-3 block text-sm font-semibold">Chave de API do Gemini
            <input className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-[#282725] px-3 text-sm text-white placeholder:text-white/40" type="password" autoComplete="off" spellCheck={false} placeholder="Cole sua chave do AI Studio" value={geminiKeyDraft} onChange={(e) => setGeminiKeyDraft(e.target.value)} data-testid="narrada-gemini-key" />
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" className="rounded-full bg-[#c8402a] px-4 py-2 text-sm font-bold text-white" onClick={() => { discardGeneratedTrack(); stop(); setPlaying(false); saveGeminiTtsApiKey(geminiKeyDraft); saveGeminiTtsVoice(geminiVoiceDraft); setVoiceStatus(geminiKeyDraft.trim() ? 'Preferência guardada neste dispositivo. Toque em Testar voz.' : 'Chave removida. A voz local do aparelho será usada.'); }} data-testid="narrada-salvar-voz">Salvar preferência</button>
            <button type="button" disabled={testingVoice || !geminiKeyDraft.trim()} className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold disabled:opacity-40" onClick={async () => {
              setTestingVoice(true); setVoiceStatus('Gerando uma amostra de voz…'); discardGeneratedTrack(); stop(); setPlaying(false); saveGeminiTtsApiKey(geminiKeyDraft); saveGeminiTtsVoice(geminiVoiceDraft);
              try { await getVoice().speak('Olá! Esta é uma amostra da voz neural da sua aula. Vamos aprender com calma, clareza e exemplos.', 0.95); setVoiceStatus('Amostra concluída. A voz neural está pronta para as aulas.'); }
              catch (error) { setVoiceStatus(error instanceof Error ? error.message : 'Não foi possível gerar a amostra. Confira a chave e a conexão.'); }
              finally { setTestingVoice(false); }
            }} data-testid="narrada-testar-voz">{testingVoice ? 'Gerando…' : 'Testar voz'}</button>
            <a className="text-xs font-semibold text-[#ffbb8c] underline underline-offset-2" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Obter chave no AI Studio</a>
          </div>
          <p className="mt-2 text-[0.68rem] leading-relaxed text-white/55">A chave fica no armazenamento local deste aparelho e é enviada ao Google para gerar o áudio; não é enviada ao repositório. A API pode ter limites ou custos conforme sua conta.</p>
          {voiceStatus && <p className="mt-2 rounded-lg bg-white/10 p-2 text-xs leading-relaxed" role="status">{voiceStatus}</p>}
        </section>
      )}
      {showTranscript && controlsVisible && (
        <section className="absolute bottom-[calc(9.5rem+env(safe-area-inset-bottom))] left-3 right-3 z-40 mx-auto max-h-[calc(100dvh-12rem)] max-w-xl overflow-y-auto rounded-2xl border border-white/20 bg-[#171b1b]/96 p-4 text-white shadow-2xl backdrop-blur-xl" onClick={stopOverlayClick} onPointerDown={beginControlsInteraction} onPointerUp={endControlsInteraction} onPointerCancel={endControlsInteraction} aria-label="Transcrição" data-testid="narrada-transcricao-painel">
          <h2 className="font-display text-xl font-semibold">Transcrição completa</h2>
          {transcript(l).map((t) => <div key={t.heading} className="mb-3 last:mb-0"><h3 className="font-semibold text-[#ffbb8c]">{t.heading}</h3><p className="mt-1 text-sm leading-relaxed text-white/85">{t.lines.join(' ')}</p></div>)}
        </section>
      )}
      {!controlsVisible && <button type="button" className="absolute inset-0 z-10 cursor-pointer" aria-label="Mostrar controles da aula" onClick={(event) => { event.stopPropagation(); togglePlayerControls(); }} data-testid="narrada-mostrar-controles" />}

    </div>
  ), document.body);
}

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

type HistoricalVisual = { src: string; alt: string; caption: string; source: string; sourceUrl: string };
function historicalVisualFor(value: string): HistoricalVisual | undefined {
  const text = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/ada lovelace|ada king|lovelace/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ada_Lovelace_portrait.jpg?width=900',
    alt: 'Retrato em aquarela de Ada Lovelace, de cerca de 1840',
    caption: 'Ada Lovelace · matemática e autora de notas sobre a Máquina Analítica',
    source: 'Retrato de domínio público · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg',
  };
  if (/pascaline|maquina de pascal|blaise pascal/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arts_et_Metiers_Pascaline_dsc03869.jpg?width=1200',
    alt: 'Pascalina de 1642, calculadora mecânica com discos e engrenagens',
    caption: 'Pascalina · máquina mecânica de cálculo construída por Blaise Pascal',
    source: 'David.Monniaux · CC BY-SA 3.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Arts_et_Metiers_Pascaline_dsc03869.jpg',
  };
  if (/maquina analitica|analytical engine|babbage/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Analytical_engine_trial_model%2C_Charles_Babbage%2C_1834-1871_-_Science_Museum%2C_London_-_DSC05565.jpg?width=1200',
    alt: 'Modelo de teste da Máquina Analítica de Charles Babbage em exposição no Science Museum de Londres',
    caption: 'Máquina Analítica · o projeto de Babbage unia cálculo e armazenamento',
    source: 'Daderot · CC0 1.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Analytical_engine_trial_model,_Charles_Babbage,_1834-1871_-_Science_Museum,_London_-_DSC05565.jpg',
  };
  if (/jacquard|cartoes perfurados|cartões perfurados/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jacquard.loom.cards.jpg?width=900',
    alt: 'Close de cartões perfurados usados em um tear Jacquard',
    caption: 'Cartões perfurados · as instruções controlavam o padrão tecido',
    source: 'Ghw · domínio público · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jacquard.loom.cards.jpg',
  };
  if (/hollerith|censo/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/1902_Hollerith_electric_tabulating_machine.jpg?width=900',
    alt: 'Funcionário demonstrando a máquina tabuladora elétrica de Herman Hollerith',
    caption: 'Tabuladora de Hollerith · cartões perfurados ajudavam a contar o censo',
    source: 'U.S. Census Bureau · domínio público · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:1902_Hollerith_electric_tabulating_machine.jpg',
  };
  if (/4004|microprocessador|microprocessor/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Intel_4004_open.jpg?width=1200',
    alt: 'Microprocessador Intel 4004 de 1971 aberto, mostrando o circuito interno',
    caption: 'Intel 4004 · um dos primeiros microprocessadores comerciais em um único chip',
    source: 'Science Museum Group · CC BY 4.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Intel_4004_open.jpg',
  };
  if (/apple ii|computador pessoal|ibm pc/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_II_Computer.jpg?width=900',
    alt: 'Computador Apple II, exemplo de computador pessoal do fim dos anos 1970',
    caption: 'Apple II · o computador pessoal chega a casas e escritórios',
    source: 'Maksym Kozlenko · CC BY-SA 4.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Apple_II_Computer.jpg',
  };
  if (/\beniac\b/.test(text)) return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/ENIAC.jpg?width=1000',
    alt: 'Painéis do computador eletrônico ENIAC em exposição',
    caption: 'ENIAC · computador eletrônico pioneiro, instalado em grandes painéis',
    source: 'Imagem CC BY-SA 4.0 · Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:ENIAC.jpg',
  };
  return undefined;
}

function HistoricalPhoto({ photo, variant = 'scene' }: { photo: HistoricalVisual; variant?: 'scene' | 'slide' }) {
  return <figure className={'ccv-historical-photo ccv-historical-photo--' + variant} data-testid="historical-photo">
    <img src={photo.src} alt={photo.alt} loading="eager" decoding="async" />
    <figcaption><strong>{photo.caption}</strong><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.source}</a></figcaption>
  </figure>;
}

/**
 * Cena audiovisual estável: um único assunto em foco, não uma pilha de cartões.
 * O palco inteiro persiste entre falas; só o plano de apoio recebe uma transição suave
 * quando a fala/etapa muda. Não existem pulsos, flashes ou animações repetidas por render.
 */
function CinematicScene({
  scene, reveal, sceneIndex, sceneCount, beatIndex, controlsVisible, cutawayVisible,
  showCaptions, captionText, captionWordIndex, highlightCaptionWord,
}: {
  scene: Scene;
  reveal: number;
  sceneIndex: number;
  sceneCount: number;
  beatIndex: number;
  controlsVisible: boolean;
  cutawayVisible: boolean;
  showCaptions: boolean;
  captionText: string;
  captionWordIndex: number;
  highlightCaptionWord: boolean;
}) {
  const visual = scene.visual;
  const palette = CINEMA_PALETTES[sceneIndex % CINEMA_PALETTES.length];
  const activeIndex = (length: number) => Math.max(0, Math.min(length - 1, reveal - 1));
  let headline = scene.heading;
  let support = '';
  let eyebrow = 'IDEIA EM FOCO';
  let art: IllustrationName = illustrationForText(scene.heading);
  let dateOrStep = '';
  let equation: string | undefined;
  let historicalPhoto: HistoricalVisual | undefined;
  let numberline: { from: number; to: number; state: NumberLineState } | undefined;
  let progressCount = 1;
  let progressIndex = 0;

  if (visual.kind === 'title') {
    headline = visual.title;
    support = visual.subtitle ?? '';
    art = visual.art ?? illustrationForText(visual.title);
    eyebrow = 'ABERTURA';
  } else if (visual.kind === 'cards') {
    const index = activeIndex(visual.cards.length);
    const item = visual.cards[index];
    if (item) {
      headline = item.title;
      support = item.text;
      art = illustrationForText(item.title + ' ' + item.text);
      dateOrStep = String(index + 1).padStart(2, '0');
    }
    eyebrow = 'CONCEITO EM FOCO';
    progressCount = visual.cards.length;
    progressIndex = index;
  } else if (visual.kind === 'timeline') {
    const index = activeIndex(visual.items.length);
    const item = visual.items[index];
    if (item) {
      headline = item.title;
      support = item.text;
      dateOrStep = item.year;
      art = illustrationForText(item.title + ' ' + item.text);
      historicalPhoto = historicalVisualFor(item.title + ' ' + item.text);
    }
    eyebrow = 'MARCO HISTÓRICO';
    progressCount = visual.items.length;
    progressIndex = index;
  } else if (visual.kind === 'equation') {
    const index = activeIndex(visual.lines.length);
    equation = visual.lines[index] ?? visual.lines[0] ?? '';
    headline = equation;
    support = visual.note ?? '';
    dateOrStep = 'PASSO ' + (index + 1);
    art = illustrationForText(headline + ' ' + support);
    eyebrow = 'RACIOCÍNIO PASSO A PASSO';
    progressCount = visual.lines.length;
    progressIndex = index;
  } else if (visual.kind === 'numberline') {
    const index = Math.min(visual.states.length - 1, Math.max(0, reveal));
    const state = visual.states[index] ?? visual.states[0] ?? {};
    const jump = state.jumps?.[0];
    headline = jump ? (jump.to > jump.from ? 'Avance para a direita' : 'Volte para a esquerda') : 'Encontre a posição';
    support = jump ? `Partimos de ${jump.from} e chegamos a ${jump.to}.` : 'Observe a posição do número em relação ao zero.';
    eyebrow = 'MOVIMENTO NA RETA NUMÉRICA';
    dateOrStep = jump ? `${jump.from} → ${jump.to}` : 'RETA NUMÉRICA';
    numberline = { from: visual.from, to: visual.to, state };
    progressCount = visual.states.length;
    progressIndex = index;
  }

  if (!historicalPhoto && visual.kind === 'timeline') historicalPhoto = historicalVisualFor(headline + ' ' + support);

  // Cada frase realiza um corte editorial por máscara e deslocamento, sem fade de opacidade.
  // O plano de fundo, a paleta e as formas decorativas permanecem vivos e estáveis.
  return (
    <article
      className={'ccv-film-scene ' + (controlsVisible ? 'has-controls' : 'controls-hidden')}
      style={{ '--ccv-background': palette.background, '--ccv-accent': palette.accent, '--ccv-secondary': palette.secondary } as CSSProperties}
      aria-label={scene.heading}
      data-testid="narrada-cena-cinematica"
      data-beat={beatIndex}
    >
      <div className="ccv-film-grain" aria-hidden="true" />
      <div className="ccv-film-orbit ccv-film-orbit--one" aria-hidden="true" />
      <div className="ccv-film-orbit ccv-film-orbit--two" aria-hidden="true" />

      <header className="ccv-film-header">
        <span className="ccv-film-brand">CRÔNICAS <i /> DO CONHECIMENTO</span>
        <span className="ccv-film-counter">{String(sceneIndex + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}</span>
      </header>

      {showCaptions && <CaptionLine text={captionText} activeWordIndex={captionWordIndex} highlightWord={highlightCaptionWord} />}

      <div className={"ccv-film-content" + (cutawayVisible ? " has-cutaway" : "")}>
        <section className="ccv-film-copy">
          <div className="ccv-film-copy__take" key={scene.id + ':' + beatIndex} data-testid="narrada-corte-texto">
            <p className="ccv-film-eyebrow"><span />{eyebrow}</p>
            {dateOrStep && <p className="ccv-film-date">{dateOrStep}</p>}
            <h2 className="ccv-film-headline">{headline}</h2>
            {support && <p className="ccv-film-support">{support}</p>}
            <div className="ccv-film-progress" aria-hidden="true">
              {Array.from({ length: Math.max(1, progressCount) }, (_, index) => (
                <span key={index} className={index < progressIndex ? 'is-past' : index === progressIndex ? 'is-current' : ''} />
              ))}
            </div>
            <p className="ccv-film-footnote">{scene.heading}</p>
          </div>
        </section>

        <section className="ccv-film-art" aria-label="Demonstração visual" data-testid="narrada-cena-visual">
          <div className="ccv-film-art__rings" aria-hidden="true"><span /><span /><span /></div>
          <div key={scene.id + ':' + beatIndex} className="ccv-film-cut is-cue-cut" data-testid="narrada-corte-suave">
            {numberline ? (
              <div className="ccv-film-numberline">
                <CinematicNumberLine from={numberline.from} to={numberline.to} state={numberline.state} />
              </div>
            ) : historicalPhoto ? (
              <HistoricalPhoto photo={historicalPhoto} />
            ) : visual.kind === 'title' ? (
              <div className="ccv-film-hero">
                <Illustration name={art} accent={palette.accent} animate={false} className="ccv-film-illustration" label={headline} />
                <span className="ccv-film-symbol" aria-hidden="true">↗</span>
              </div>
            ) : visual.kind === 'equation' ? (
              <div className="ccv-film-equation">
                {progressIndex > 0 && <p className="ccv-film-equation__previous">{visual.lines[progressIndex - 1]}</p>}
                <span className="ccv-film-equation__rule" aria-hidden="true" />
                <strong>{equation}</strong>
                {progressIndex < visual.lines.length - 1 && <span className="ccv-film-equation__next" aria-hidden="true">↓</span>}
              </div>
            ) : visual.kind === 'timeline' ? (
              <div className="ccv-film-event">
                <div className="ccv-film-event__date">{dateOrStep}</div>
                <div className="ccv-film-event__illustration">
                  <Illustration name={art} accent={palette.accent} animate={false} className="ccv-film-illustration" label={headline} />
                </div>
                <div className="ccv-film-event__caption">{headline}</div>
              </div>
            ) : (
              <div className="ccv-film-concept">
                <span className="ccv-film-concept__number">{dateOrStep}</span>
                <Illustration name={art} accent={palette.accent} animate={false} className="ccv-film-illustration" label={headline} />
                <span className="ccv-film-concept__baseline">{scene.heading}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="ccv-film-footer">
        <span>VER · ENTENDER · APLICAR</span>
        <span className="ccv-film-footer__line" />
        <span>ÁUDIO E IMAGEM SINCRONIZADOS</span>
      </footer>

      <CinematicCutaway scene={scene} reveal={reveal} visible={cutawayVisible} palette={palette} />
    </article>
  );
}

/**
 * Inserção de apoio com o assunto real da cena: uma foto de arquivo, uma conta, um
 * movimento na reta ou o conceito tratado na fala. O palco principal não desmonta.
 */
function CinematicCutaway({
  scene, reveal, visible, palette,
}: { scene: Scene; reveal: number; visible: boolean; palette: CinemaPalette }) {
  const visual = scene.visual;
  const activeIndex = (length: number) => Math.max(0, Math.min(length - 1, reveal - 1));
  let title = scene.heading;
  let detail = '';
  let label = 'PLANO DE APOIO';
  let art: IllustrationName = illustrationForText(scene.heading);
  let photo: HistoricalVisual | undefined;
  let numberline: { from: number; to: number; state: NumberLineState } | undefined;
  let equation: string | undefined;
  let previousEquation: string | undefined;

  if (visual.kind === 'title') {
    title = visual.title;
    detail = visual.subtitle ?? '';
    art = visual.art ?? illustrationForText(visual.title);
    label = 'ABERTURA · DETALHE';
  } else if (visual.kind === 'cards') {
    const item = visual.cards[activeIndex(visual.cards.length)];
    if (item) {
      title = item.title;
      detail = item.text;
      art = illustrationForText(item.title + ' ' + item.text);
    }
    label = 'EXEMPLO EM FOCO';
  } else if (visual.kind === 'timeline') {
    const item = visual.items[activeIndex(visual.items.length)];
    if (item) {
      title = item.title;
      detail = item.text;
      label = item.year;
      art = illustrationForText(item.title + ' ' + item.text);
      photo = historicalVisualFor(item.title + ' ' + item.text);
    }
  } else if (visual.kind === 'equation') {
    const index = activeIndex(visual.lines.length);
    equation = visual.lines[index] ?? visual.lines[0] ?? '';
    previousEquation = index > 0 ? visual.lines[index - 1] : undefined;
    title = equation;
    detail = visual.note ?? '';
    label = 'PASSO DO CÁLCULO';
    art = illustrationForText(equation + ' ' + detail);
  } else if (visual.kind === 'numberline') {
    const index = Math.min(visual.states.length - 1, Math.max(0, reveal));
    const state = visual.states[index] ?? visual.states[0] ?? {};
    const jump = state.jumps?.[0];
    title = jump ? `${jump.from} → ${jump.to}` : 'Posição na reta numérica';
    detail = jump
      ? (jump.to > jump.from ? 'O ponto avança para a direita.' : 'O ponto volta para a esquerda.')
      : 'Observe a relação entre o número e o zero.';
    label = 'MOVIMENTO EM FOCO';
    art = 'degraus';
    numberline = { from: visual.from, to: visual.to, state };
  }

  return (
    <aside
      className={'ccv-cutaway' + (visible ? ' is-visible' : '')}
      aria-hidden={!visible}
      data-testid="narrada-insercao-visual"
      data-visible={visible ? 'true' : 'false'}
    >
      <div className="ccv-cutaway__media" style={{ '--ccv-insert-accent': palette.accent } as CSSProperties}>
        {numberline ? (
          <div className="ccv-cutaway__numberline"><CinematicNumberLine from={numberline.from} to={numberline.to} state={numberline.state} /></div>
        ) : photo ? (
          <img className="ccv-cutaway__photo" src={photo.src} alt={photo.alt} loading="eager" decoding="async" />
        ) : equation ? (
          <div className="ccv-cutaway__equation">
            {previousEquation && <span>{previousEquation}</span>}
            <i aria-hidden="true" />
            <strong>{equation}</strong>
          </div>
        ) : (
          <Illustration name={art} accent={palette.accent} animate={false} className="ccv-cutaway__illustration" label={title} />
        )}
        <span className="ccv-cutaway__frame" aria-hidden="true" />
      </div>
      <div className="ccv-cutaway__copy">
        <p className="ccv-cutaway__eyebrow"><span />{label}</p>
        <h3>{title}</h3>
        {detail && <p className="ccv-cutaway__detail">{detail}</p>}
        <p className="ccv-cutaway__source">CRÔNICAS DO CONHECIMENTO</p>
      </div>
    </aside>
  );
}

function CaptionLine({ text, activeWordIndex, highlightWord }: { text: string; activeWordIndex: number; highlightWord: boolean }) {
  const tokens = text.match(/\S+\s*/g) ?? [text];
  const visibleCount = Math.min(8, tokens.length);
  const start = Math.min(Math.max(0, activeWordIndex - 3), Math.max(0, tokens.length - visibleCount));
  const end = Math.min(tokens.length, start + visibleCount);

  return (
    <div className="mb-[clamp(.35rem,1vh,.7rem)] flex min-h-[1.8rem] w-full shrink-0 items-center justify-center px-1"
      role="status" aria-label="Legenda da fala atual" aria-live="polite" aria-atomic="true" data-testid="narrada-legenda">
      <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-[#171b1b]/88 px-2 py-1 text-center text-[0.68rem] font-medium leading-5 text-white shadow-sm sm:px-3 sm:text-sm">
        <span className="sr-only">Legenda: </span>
        <span data-testid="narrada-legenda-texto">
          {start > 0 && <span aria-hidden="true">… </span>}
          {tokens.slice(start, end).map((word, offset) => {
            const i = start + offset;
            const active = highlightWord && i === activeWordIndex;
            return <span key={`${i}-${word}`} className={active ? 'rounded bg-[#f0bf69]/25 px-0.5 font-bold text-[#ffd38a]' : 'text-white'}>{word}</span>;
          })}
          {end < tokens.length && <span aria-hidden="true">…</span>}
        </span>
      </p>
    </div>
  );
}

const CinematicSceneMemo = memo(CinematicScene);

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
