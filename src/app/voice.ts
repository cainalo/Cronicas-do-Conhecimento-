// Voz da aula narrada. Escolhe automaticamente a melhor voz pt-BR disponível no aparelho
// ou no navegador. Não baixa áudio nem depende de uma chave de API externa: a qualidade e as vozes
// disponíveis continuam dependendo do motor de voz instalado no dispositivo.
import { Capacitor } from '@capacitor/core';

export type VoiceKind = 'nativa' | 'navegador' | 'nenhuma';
export interface VoiceCallbacks { onStart?: () => void; onBoundary?: (charIndex: number, charLength: number) => void; }
export interface Voice { kind: VoiceKind; speak(text: string, rate: number, callbacks?: VoiceCallbacks): Promise<void>; stop(): void; }
export interface VoiceCandidate { name?: string; lang?: string; default?: boolean; localService?: boolean; }

/**
 * Prioriza primeiro o português brasileiro e, dentro dele, vozes neurais/naturais de
 * maior qualidade quando o motor do dispositivo as expõe. A lista muda entre Android,
 * navegador e pacotes de voz instalados.
 */
export function portugueseVoiceScore(v: VoiceCandidate): number {
  const lang = (v.lang ?? '').toLowerCase().replace('_', '-');
  let score = lang === 'pt-br' ? 120 : lang.startsWith('pt-') || lang === 'pt' ? 45 : -1000;
  const name = (v.name ?? '').toLowerCase();
  if (/(chirp.?3|neural.?2|neural.?hd|dragon.?hd|wavenet|neural|natural|enhanced|premium|studio|high.?quality|online)/i.test(name)) score += 70;
  if (/(google|microsoft|samsung|francisca|thalita|brenda|camila|marina|antonio|antónio|thalia|luciana|felipe)/i.test(name)) score += 18;
  if (/(e.?speak|compact|basic|legacy|robot|low.?quality)/i.test(name)) score -= 45;
  if (v.localService === false) score += 2;
  if (v.default) score += 1;
  return score;
}

export function bestPortugueseVoiceIndex(voices: readonly VoiceCandidate[]): number | undefined {
  let bestIndex = -1;
  let bestScore = -1000;
  voices.forEach((voice, index) => {
    const score = portugueseVoiceScore(voice);
    if (score > bestScore) { bestIndex = index; bestScore = score; }
  });
  return bestIndex >= 0 && bestScore > 0 ? bestIndex : undefined;
}

/** Chrome/Android frequentemente popula a lista de vozes depois do primeiro getVoices(). */
async function browserVoicesReady(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const initial = synth.getVoices();
  if (initial.length) return initial;
  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      synth.removeEventListener('voiceschanged', changed);
      resolve(synth.getVoices());
    };
    const changed = () => { if (synth.getVoices().length) finish(); };
    const timer = window.setTimeout(finish, 1000);
    synth.addEventListener('voiceschanged', changed);
    synth.getVoices();
  });
}

const none: Voice = { kind: 'nenhuma', speak: () => Promise.resolve(), stop: () => undefined };

function browserVoice(): Voice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return undefined;
  const synth = window.speechSynthesis;
  return {
    kind: 'navegador',
    speak: async (text, rate, callbacks) => {
      const voices = await browserVoicesReady(synth);
      const voiceIndex = bestPortugueseVoiceIndex(voices);
      return new Promise<void>((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR';
        u.rate = rate;
        if (voiceIndex !== undefined && voices[voiceIndex]) u.voice = voices[voiceIndex];
        u.onstart = () => callbacks?.onStart?.();
        u.onboundary = (event) => callbacks?.onBoundary?.(event.charIndex, event.charLength);
        u.onend = () => resolve();
        u.onerror = () => resolve();
        synth.speak(u);
      });
    },
    stop: () => synth.cancel(),
  };
}

function nativeVoice(): Voice | undefined {
  if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable('TextToSpeech')) return undefined;
  let mod: typeof import('@capacitor-community/text-to-speech') | undefined;
  let voicesPromise: Promise<{ voices: VoiceCandidate[] }> | undefined;
  const load = async () => (mod ??= await import('@capacitor-community/text-to-speech'));
  const supported = async () => {
    if (!voicesPromise) voicesPromise = load().then(({ TextToSpeech }) => TextToSpeech.getSupportedVoices()).catch(() => ({ voices: [] }));
    return voicesPromise;
  };
  return {
    kind: 'nativa',
    speak: async (text, rate, callbacks) => {
      const { TextToSpeech } = await load();
      let voice: number | undefined;
      try { voice = bestPortugueseVoiceIndex((await supported()).voices); } catch { voice = undefined; }
      // O plugin nativo não expõe eventos de palavra. Preferimos a voz neural pt-BR de maior
      // pontuação que estiver instalada; o relógio da legenda é estimado no Android.
      callbacks?.onStart?.();
      try {
        await TextToSpeech.speak({
          text, lang: 'pt-BR', rate, pitch: 1, volume: 1, category: 'playback', queueStrategy: 0,
          ...(voice === undefined ? {} : { voice }),
        });
      } catch {
        try {
          await TextToSpeech.speak({ text, lang: 'pt-BR', rate, pitch: 1, volume: 1, category: 'playback', queueStrategy: 0 });
        } catch { /* player continua com legendas se o motor falhar */ }
      }
    },
    stop: () => { void load().then(({ TextToSpeech }) => TextToSpeech.stop().catch(() => undefined)); },
  };
}

let cached: Voice | undefined;
export function getVoice(): Voice { return (cached ??= nativeVoice() ?? browserVoice() ?? none); }
// Estimativa mais conservadora para manter as legendas acompanhando a voz nativa; nos
// navegadores, os eventos onboundary prevalecem sobre essa aproximação.
// Tempo conservador para a legenda não chegar ao fim antes da voz, sobretudo no TTS Android.
export const readingMs = (text: string, rate = 1) => Math.max(2200, (text.split(/\s+/).filter(Boolean).length / 2) * 1000) / rate;
