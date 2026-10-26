// Voz da aula narrada (pacote v4, etapa 3). Ordem de preferência:
// 1) no app Android, o texto-para-fala nativo do aparelho (plugin @capacitor-community/text-to-speech),
//    porque o WebView do Android normalmente não tem speechSynthesis;
// 2) no navegador, a síntese de voz do próprio navegador (Web Speech API);
// 3) sem nenhuma das duas, a aula segue com legendas e avanço pelo tempo de leitura.
// A qualidade da voz depende do aparelho: nenhuma promessa de voz natural.
import { Capacitor } from '@capacitor/core';

export type VoiceKind = 'nativa' | 'navegador' | 'nenhuma';

export interface Voice {
  kind: VoiceKind;
  /** Fala o texto; resolve quando termina (ou quando é interrompida). */
  speak(text: string, rate: number): Promise<void>;
  stop(): void;
}

const none: Voice = { kind: 'nenhuma', speak: () => Promise.resolve(), stop: () => undefined };

function browserVoice(): Voice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return undefined;
  const synth = window.speechSynthesis;
  const pick = () => synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith('pt-br')) ?? synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith('pt'));
  return {
    kind: 'navegador',
    speak: (text, rate) =>
      new Promise((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR';
        u.rate = rate;
        const v = pick();
        if (v) u.voice = v;
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
  const load = async () => (mod ??= await import('@capacitor-community/text-to-speech'));
  return {
    kind: 'nativa',
    speak: async (text, rate) => {
      const { TextToSpeech } = await load();
      try {
        await TextToSpeech.speak({ text, lang: 'pt-BR', rate, pitch: 1, volume: 1, category: 'playback' });
      } catch {
        /* sem voz instalada para pt-BR: segue em silêncio, com legenda */
      }
    },
    stop: () => {
      void load().then(({ TextToSpeech }) => TextToSpeech.stop().catch(() => undefined));
    },
  };
}

let cached: Voice | undefined;
export function getVoice(): Voice {
  return (cached ??= nativeVoice() ?? browserVoice() ?? none);
}

/** Tempo de leitura de uma frase sem voz (legenda): cerca de 2,6 palavras por segundo. */
export const readingMs = (text: string, rate = 1) => Math.max(1800, (text.split(/\s+/).length / 2.6) * 1000) / rate;
