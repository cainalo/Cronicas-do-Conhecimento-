// Camada de voz das aulas narradas. Preferência: voz neural Gemini configurada pelo usuário;
// fallback para a melhor voz pt-BR instalada no aparelho/navegador. Nenhuma chave fica no código.
import { Capacitor } from '@capacitor/core';

export type VoiceKind = 'gemini' | 'nativa' | 'navegador' | 'nenhuma';
export interface VoiceCallbacks { onStart?: () => void; onBoundary?: (charIndex: number, charLength: number) => void; }
export interface Voice { kind: VoiceKind; speak(text: string, rate: number, callbacks?: VoiceCallbacks): Promise<void>; stop(): void; }
export interface VoiceCandidate { name?: string; lang?: string; default?: boolean; localService?: boolean; }

const KEY_STORAGE = 'cronicas:gemini-tts-api-key';
const VOICE_STORAGE = 'cronicas:gemini-tts-voice';
export const GEMINI_TTS_VOICES = [
  { id: 'Sulafat', label: 'Sulafat · acolhedora e quente (recomendada)' },
  { id: 'Callirrhoe', label: 'Callirrhoe · tranquila e natural' },
  { id: 'Aoede', label: 'Aoede · leve e expressiva' },
  { id: 'Despina', label: 'Despina · suave e fluida' },
  { id: 'Erinome', label: 'Erinome · clara e articulada' },
  { id: 'Achernar', label: 'Achernar · suave e delicada' },
  { id: 'Kore', label: 'Kore · firme e segura' },
  { id: 'Leda', label: 'Leda · jovem e próxima' },
  { id: 'Laomedeia', label: 'Laomedeia · animada e viva' },
  { id: 'Vindemiatrix', label: 'Vindemiatrix · gentil e calma' },
  { id: 'Autonoe', label: 'Autonoe · brilhante e clara' },
  { id: 'Iapetus', label: 'Iapetus · nítida e precisa' },
  { id: 'Gacrux', label: 'Gacrux · madura e encorpada' },
  { id: 'Charon', label: 'Charon · informativa e objetiva' },
  { id: 'Achird', label: 'Achird · amigável e conversacional' },
  { id: 'Algieba', label: 'Algieba · suave e aveludada' },
  { id: 'Algenib', label: 'Algenib · grave e áspera' },
  { id: 'Orus', label: 'Orus · firme e direta' },
  { id: 'Rasalgethi', label: 'Rasalgethi · informativa e estável' },
  { id: 'Alnilam', label: 'Alnilam · firme e marcante' },
  { id: 'Schedar', label: 'Schedar · equilibrada e neutra' },
  { id: 'Zubenelgenubi', label: 'Zubenelgenubi · casual e descontraída' },
  { id: 'Sadaltager', label: 'Sadaltager · experiente e conhecedora' },
  { id: 'Sadachbia', label: 'Sadachbia · viva e energética' },
  { id: 'Zephyr', label: 'Zephyr · brilhante e arejada' },
  { id: 'Puck', label: 'Puck · animada e informal' },
  { id: 'Fenrir', label: 'Fenrir · energética e intensa' },
  { id: 'Enceladus', label: 'Enceladus · soprosa e íntima' },
  { id: 'Umbriel', label: 'Umbriel · tranquila e suave' },
  { id: 'Pulcherrima', label: 'Pulcherrima · expressiva e marcante' },
] as const;

export function getGeminiTtsApiKey(): string {
  try { return typeof localStorage === 'undefined' ? '' : localStorage.getItem(KEY_STORAGE) ?? ''; } catch { return ''; }
}
export function saveGeminiTtsApiKey(value: string): void {
  try { const key = value.trim(); if (key) localStorage.setItem(KEY_STORAGE, key); else localStorage.removeItem(KEY_STORAGE); } catch { /* armazenamento local indisponível */ }
}
export function getGeminiTtsVoice(): string {
  try {
    const value = typeof localStorage === 'undefined' ? '' : localStorage.getItem(VOICE_STORAGE) ?? '';
    return GEMINI_TTS_VOICES.some((voice) => voice.id === value) ? value : 'Sulafat';
  } catch { return 'Sulafat'; }
}
export function saveGeminiTtsVoice(value: string): void {
  try { localStorage.setItem(VOICE_STORAGE, GEMINI_TTS_VOICES.some((voice) => voice.id === value) ? value : 'Sulafat'); } catch { /* opcional */ }
}

export function portugueseVoiceScore(v: VoiceCandidate): number {
  const lang = (v.lang ?? '').toLowerCase().replace('_', '-');
  let score = lang === 'pt-br' ? 100 : lang.startsWith('pt-') || lang === 'pt' ? 45 : -1000;
  const name = (v.name ?? '').toLowerCase();
  if (/(natural|neural|enhanced|premium|studio|wavenet)/i.test(name)) score += 45;
  if (/(google|microsoft|luciana|francisca|felipe|camila|antonio|antónio|marina)/i.test(name)) score += 8;
  if (/(standard|classic|default|compact)/i.test(name)) score -= 35;
  if (v.localService === false) score += 2;
  if (v.default) score += 1;
  return score;
}

export function bestPortugueseVoiceIndex(voices: readonly VoiceCandidate[]): number | undefined {
  let bestIndex = -1;
  let bestScore = -1000;
  voices.forEach((voice, index) => { const score = portugueseVoiceScore(voice); if (score > bestScore) { bestIndex = index; bestScore = score; } });
  return bestIndex >= 0 && bestScore > 0 ? bestIndex : undefined;
}

async function browserVoicesReady(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const initial = synth.getVoices();
  if (initial.length) return initial;
  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true; window.clearTimeout(timer); synth.removeEventListener('voiceschanged', changed); resolve(synth.getVoices());
    };
    const changed = () => { if (synth.getVoices().length) finish(); };
    const timer = window.setTimeout(finish, 1000);
    synth.addEventListener('voiceschanged', changed); synth.getVoices();
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
        const u = new SpeechSynthesisUtterance(text); u.lang = 'pt-BR'; u.rate = rate;
        if (voiceIndex !== undefined && voices[voiceIndex]) u.voice = voices[voiceIndex];
        u.onstart = () => callbacks?.onStart?.();
        u.onboundary = (event) => callbacks?.onBoundary?.(event.charIndex, event.charLength);
        u.onend = () => resolve(); u.onerror = () => resolve(); synth.speak(u);
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
      callbacks?.onStart?.();
      try {
        await TextToSpeech.speak({ text, lang: 'pt-BR', rate, pitch: 1, volume: 1, category: 'playback', queueStrategy: 0, ...(voice === undefined ? {} : { voice }) });
      } catch {
        try { await TextToSpeech.speak({ text, lang: 'pt-BR', rate, pitch: 1, volume: 1, category: 'playback', queueStrategy: 0 }); } catch { /* segue com legendas */ }
      }
    },
    stop: () => { void load().then(({ TextToSpeech }) => TextToSpeech.stop().catch(() => undefined)); },
  };
}

let activeAudio: HTMLAudioElement | undefined;
let activeController: AbortController | undefined;
let activeProgressTimer: number | undefined;
function stopGeneratedAudio() {
  if (activeProgressTimer !== undefined && typeof window !== 'undefined') window.clearInterval(activeProgressTimer);
  activeProgressTimer = undefined;
  if (activeController) activeController.abort();
  activeController = undefined;
  if (activeAudio) { activeAudio.pause(); activeAudio.removeAttribute('src'); activeAudio.load(); }
  activeAudio = undefined;
}
function decodeBase64(value: string): Uint8Array {
  const clean = value.replace(/^data:audio\/[a-z0-9.+-]+;base64,/i, '').replace(/\s/g, '');
  const raw = atob(clean); const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

function geminiVoice(apiKey: string, voiceName: string): Voice {
  return {
    kind: 'gemini',
    speak: async (text, rate, callbacks) => {
      stopGeneratedAudio();
      const controller = new AbortController(); activeController = controller;
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          model: 'gemini-3.8-flash-tts',
          input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style: `Português brasileiro (pt-BR), sotaque brasileiro natural. Narração educacional de alta qualidade, como uma professora experiente explicando a uma pessoa ao lado: timbre humano e caloroso, articulação clara sem exagero, ritmo conversacional, entonação expressiva ligada ao sentido, pequenas pausas em vírgulas e pausas maiores entre ideias. Evite voz de GPS, leitura mecânica, cadência uniforme e entusiasmo artificial. Velocidade ${rate}x. Leia apenas o texto fornecido.` }] }] }],
          response_format: { type: 'audio' },
          generation_config: { speech_config: [{ voice: voiceName }] },
        }),
      });
      if (!response.ok) throw new Error(`Gemini TTS respondeu ${response.status}. ${(await response.text()).slice(0, 400)}`);
      const payload = await response.json() as { output_audio?: { data?: string }; steps?: Array<{ content?: Array<{ type?: string; data?: string }> }> };
      const audioData = payload.output_audio?.data ?? [...(payload.steps ?? [])].reverse().flatMap((step) => step.content ?? []).find((part) => part.type === 'audio')?.data;
      if (!audioData) throw new Error('A API não devolveu o áudio da narração.');
      if (controller.signal.aborted) throw new DOMException('Voz cancelada', 'AbortError');
      const url = URL.createObjectURL(new Blob([decodeBase64(audioData)], { type: 'audio/wav' }));
      const audio = new Audio(url); activeAudio = audio;
      const release = () => {
        if (activeProgressTimer !== undefined) window.clearInterval(activeProgressTimer);
        activeProgressTimer = undefined; URL.revokeObjectURL(url);
        if (activeAudio === audio) activeAudio = undefined; if (activeController === controller) activeController = undefined;
      };
      await new Promise<void>((resolve, reject) => {
        audio.onloadedmetadata = () => {
          audio.playbackRate = 1; callbacks?.onStart?.();
          activeProgressTimer = window.setInterval(() => {
            if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
            callbacks?.onBoundary?.(Math.min(text.length, Math.floor((audio.currentTime / audio.duration) * text.length)), 1);
          }, 100);
        };
        audio.onended = () => { release(); resolve(); };
        audio.onerror = () => { release(); reject(new Error('Não foi possível reproduzir o áudio neural.')); };
        controller.signal.addEventListener('abort', () => { audio.pause(); release(); reject(new DOMException('Voz cancelada', 'AbortError')); }, { once: true });
        void audio.play().catch((error) => { release(); reject(error); });
      });
    },
    stop: stopGeneratedAudio,
  };
}

let cachedVoice: Voice | undefined;
let cachedSignature = '';
export function getVoice(): Voice {
  const apiKey = getGeminiTtsApiKey();
  const signature = apiKey ? 'gemini:' + apiKey + ':' + getGeminiTtsVoice() : 'device';
  if (cachedVoice && signature === cachedSignature) return cachedVoice;
  stopGeneratedAudio(); cachedSignature = signature;
  cachedVoice = apiKey ? geminiVoice(apiKey, getGeminiTtsVoice()) : nativeVoice() ?? browserVoice() ?? none;
  return cachedVoice;
}
export const readingMs = (text: string, rate = 1) => Math.max(2600, (text.split(/\s+/).filter(Boolean).length / 2.05) * 1000) / rate;
