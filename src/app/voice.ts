// Voz da aula narrada. Escolhe automaticamente a melhor voz pt-BR disponível no aparelho
// ou no navegador. Não baixa áudio nem depende de uma chave de API externa: a qualidade e as vozes
// disponíveis continuam dependendo do motor de voz instalado no dispositivo.
import { Capacitor } from '@capacitor/core';

export type VoiceKind = 'nativa' | 'navegador' | 'nenhuma';
export interface VoiceCallbacks { onStart?: () => void; onBoundary?: (charIndex: number, charLength: number) => void; }
export interface Voice { kind: VoiceKind; speak(text: string, rate: number, callbacks?: VoiceCallbacks): Promise<void>; stop(): void; }
export interface VoiceCandidate { name?: string; lang?: string; default?: boolean; localService?: boolean; }

export function portugueseVoiceScore(v: VoiceCandidate): number {
  const lang = (v.lang ?? '').toLowerCase().replace('_', '-');
  let score = lang === 'pt-br' ? 100 : lang.startsWith('pt-') || lang === 'pt' ? 45 : -1000;
  const name = (v.name ?? '').toLowerCase();
  if (/(natural|neural|enhanced|premium|online)/i.test(name)) score += 25;
  if (/(google|microsoft|luciana|francisca|felipe|camila|antonio|antónio|marina)/i.test(name)) score += 12;
  if (v.localService === false) score += 3;
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

const none: Voice = { kind: 'nenhuma', speak: () => Promise.resolve(), stop: () => undefined };

function browserVoice(): Voice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return undefined;
  const synth = window.speechSynthesis;
  const pick = (): SpeechSynthesisVoice | undefined => {
    const voices = synth.getVoices();
    const index = bestPortugueseVoiceIndex(voices);
    return index === undefined ? undefined : voices[index];
  };
  return {
    kind: 'navegador',
    speak: (text, rate, callbacks) => new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR'; u.rate = rate;
      const v = pick();
      if (v) u.voice = v;
      u.onstart = () => callbacks?.onStart?.();
      u.onboundary = (event) => callbacks?.onBoundary?.(event.charIndex, event.charLength);
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    }),
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
      // O plugin nativo não expõe eventos de palavra. Começamos o relógio somente depois de
      // carregar o plugin/voz; a legenda usa temporização estimada no Android e eventos reais no web.
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
