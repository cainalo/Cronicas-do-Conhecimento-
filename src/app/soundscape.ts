// Sons para estudar (pacote v4, etapa 6). Tudo é gerado no próprio aparelho (Web Audio), sem arquivos
// nem internet: chuva, riacho, floresta, ruído marrom, ruído rosa e um piano ambiente gerado na hora
// (não é gravação de música clássica: gravações só entram com licença conferida). Nada toca sozinho:
// só depois de um toque da pessoa. Cada ambiente tem volume próprio, entra e sai com fade, e o total
// passa por um limitador. A aula narrada pode abaixar o ambiente enquanto fala (duck).

export type Channel = 'chuva' | 'riacho' | 'floresta' | 'marrom' | 'rosa' | 'piano';

export const CHANNELS: { id: Channel; name: string; desc: string }[] = [
  { id: 'chuva', name: 'Chuva suave', desc: 'Chuva constante com gotas esparsas.' },
  { id: 'riacho', name: 'Riacho', desc: 'Água correndo devagar.' },
  { id: 'floresta', name: 'Floresta', desc: 'Vento leve nas folhas e pássaros discretos.' },
  { id: 'marrom', name: 'Ruído marrom', desc: 'Grave e uniforme; ajuda a isolar barulhos.' },
  { id: 'rosa', name: 'Ruído rosa', desc: 'Mais claro que o marrom, como um chiado suave.' },
  { id: 'piano', name: 'Piano ambiente', desc: 'Notas lentas e calmas, geradas no aparelho.' },
];

export interface ChannelState {
  on: boolean;
  /** 0 a 1. */
  vol: number;
}

export type Mix = Record<Channel, ChannelState>;

export const DEFAULT_MIX: Mix = {
  chuva: { on: false, vol: 0.5 },
  riacho: { on: false, vol: 0.5 },
  floresta: { on: false, vol: 0.4 },
  marrom: { on: false, vol: 0.4 },
  rosa: { on: false, vol: 0.3 },
  piano: { on: false, vol: 0.4 },
};

export const PRESETS: { id: string; name: string; desc: string; mix: Partial<Record<Channel, number>> }[] = [
  { id: 'leitura', name: 'Leitura', desc: 'Piano ambiente com chuva ao fundo.', mix: { piano: 0.35, chuva: 0.3 } },
  { id: 'foco', name: 'Foco profundo', desc: 'Só ruído marrom, para isolar o ambiente.', mix: { marrom: 0.45 } },
  { id: 'pausa', name: 'Pausa', desc: 'Riacho e floresta.', mix: { riacho: 0.4, floresta: 0.35 } },
];

/** Mix de uma predefinição (os demais ambientes desligados, volumes guardados). */
export function presetMix(base: Mix, id: string): Mix {
  const p = PRESETS.find((x) => x.id === id);
  if (!p) return base;
  const out = { ...base };
  for (const c of Object.keys(out) as Channel[]) out[c] = { on: c in p.mix, vol: p.mix[c] ?? out[c].vol };
  return out;
}

export const normalizeMix = (m?: Partial<Record<Channel, Partial<ChannelState>>>): Mix =>
  Object.fromEntries((Object.keys(DEFAULT_MIX) as Channel[]).map((c) => [c, { ...DEFAULT_MIX[c], ...(m?.[c] ?? {}) }])) as Mix;

/** Teto de cada ambiente: nenhum chega ao volume máximo do aparelho (evita sustos). */
const CAP: Record<Channel, number> = { chuva: 0.5, riacho: 0.45, floresta: 0.5, marrom: 0.5, rosa: 0.32, piano: 0.55 };
const FADE = 1.2;

class Soundscape {
  private ctx?: AudioContext;
  private master?: GainNode;
  private buses = new Map<Channel, GainNode>();
  private started = new Set<Channel>();
  private timers: number[] = [];
  private playing = false;
  private mix: Mix = DEFAULT_MIX;
  private ducked = false;
  private listeners = new Set<() => void>();

  /** Avisa quem mostra o estado (tocando ou não) a cada mudança. */
  subscribe(f: () => void) {
    this.listeners.add(f);
    return () => {
      this.listeners.delete(f);
    };
  }
  private emit() {
    for (const f of this.listeners) f();
  }

  get supported() {
    return typeof window !== 'undefined' && !!(window.AudioContext || (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext);
  }

  get isPlaying() {
    return this.playing;
  }

  private init() {
    if (this.ctx || !this.supported) return;
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new C();
    this.ctx = ctx;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.ratio.value = 8;
    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(limiter).connect(ctx.destination);
  }

  private noise(color: 'branco' | 'rosa' | 'marrom', seconds = 4): AudioBuffer {
    const ctx = this.ctx!;
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        if (color === 'branco') d[i] = w * 0.5;
        else if (color === 'marrom') {
          last = (last + 0.02 * w) / 1.02;
          d[i] = last * 3.2;
        } else {
          // Ruído rosa (filtro de Paul Kellet).
          b0 = 0.99886 * b0 + w * 0.0555179;
          b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.969 * b2 + w * 0.153852;
          b3 = 0.8665 * b3 + w * 0.3104856;
          b4 = 0.55 * b4 + w * 0.5329522;
          b5 = -0.7616 * b5 - w * 0.016898;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
          b6 = w * 0.115926;
        }
      }
    }
    return buf;
  }

  private loop(buf: AudioBuffer, to: AudioNode) {
    const src = this.ctx!.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(to);
    src.start();
    return src;
  }

  private bus(c: Channel) {
    let g = this.buses.get(c);
    if (!g) {
      g = this.ctx!.createGain();
      g.gain.value = 0;
      g.connect(this.master!);
      this.buses.set(c, g);
    }
    return g;
  }

  /** Monta a fonte de um ambiente (uma vez); o volume é controlado pelo bus. */
  private build(c: Channel) {
    if (this.started.has(c)) return;
    this.started.add(c);
    const ctx = this.ctx!;
    const out = this.bus(c);
    if (c === 'marrom') this.loop(this.noise('marrom'), out);
    if (c === 'rosa') this.loop(this.noise('rosa'), out);
    if (c === 'chuva') {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 2600;
      this.loop(this.noise('rosa', 5), f);
      f.connect(out);
      // Gotas esparsas: pequenos estalos filtrados em momentos aleatórios.
      const drop = () => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const o = this.ctx.createBufferSource();
        o.buffer = this.noise('branco', 0.05);
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1800 + Math.random() * 2600;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.35 * Math.random() + 0.1, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        o.connect(bp).connect(g).connect(out);
        o.start(t);
        this.timers.push(window.setTimeout(drop, 40 + Math.random() * 180));
      };
      drop();
    }
    if (c === 'riacho') {
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 700;
      bp.Q.value = 0.7;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.13;
      const depth = ctx.createGain();
      depth.gain.value = 260;
      lfo.connect(depth).connect(bp.frequency);
      lfo.start();
      this.loop(this.noise('marrom', 6), bp);
      bp.connect(out);
      const hi = ctx.createBiquadFilter();
      hi.type = 'highpass';
      hi.frequency.value = 2400;
      const hg = ctx.createGain();
      hg.gain.value = 0.18;
      this.loop(this.noise('rosa', 3), hi);
      hi.connect(hg).connect(out);
    }
    if (c === 'floresta') {
      const wind = ctx.createBiquadFilter();
      wind.type = 'lowpass';
      wind.frequency.value = 500;
      const wg = ctx.createGain();
      wg.gain.value = 0.6;
      this.loop(this.noise('rosa', 6), wind);
      wind.connect(wg).connect(out);
      // Pássaros: trinados curtos e raros, em alturas variadas.
      const bird = () => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const n = 2 + Math.floor(Math.random() * 4);
        const base = 2400 + Math.random() * 1600;
        for (let i = 0; i < n; i++) {
          const o = this.ctx.createOscillator();
          o.type = 'sine';
          const g = this.ctx.createGain();
          const s = t + i * 0.13;
          o.frequency.setValueAtTime(base, s);
          o.frequency.exponentialRampToValueAtTime(base * (1.25 + Math.random() * 0.3), s + 0.07);
          g.gain.setValueAtTime(0.0001, s);
          g.gain.exponentialRampToValueAtTime(0.06, s + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, s + 0.1);
          o.connect(g).connect(out);
          o.start(s);
          o.stop(s + 0.12);
        }
        this.timers.push(window.setTimeout(bird, 4000 + Math.random() * 9000));
      };
      this.timers.push(window.setTimeout(bird, 1500));
    }
    if (c === 'piano') {
      // Escala pentatônica de dó, notas lentas com ataque suave e eco curto.
      const notes = [48, 52, 55, 57, 60, 62, 64, 67, 69, 72];
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.42;
      const fb = ctx.createGain();
      fb.gain.value = 0.32;
      delay.connect(fb).connect(delay);
      delay.connect(out);
      const note = () => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const chord = Math.random() < 0.3 ? 2 : 1;
        for (let k = 0; k < chord; k++) {
          const m = notes[Math.floor(Math.random() * notes.length)] - (k ? 12 : 0);
          const f = 440 * Math.pow(2, (m - 69) / 12);
          for (const [type, mult, amp] of [['triangle', 1, 0.16], ['sine', 2, 0.05]] as const) {
            const o = this.ctx.createOscillator();
            o.type = type;
            o.frequency.value = f * mult;
            const g = this.ctx.createGain();
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(amp, t + 0.03);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 3.6);
            o.connect(g);
            g.connect(out);
            g.connect(delay);
            o.start(t);
            o.stop(t + 3.8);
          }
        }
        this.timers.push(window.setTimeout(note, 1300 + Math.random() * 2200));
      };
      note();
    }
  }

  private level(c: Channel) {
    const s = this.mix[c];
    return this.playing && s.on ? s.vol * CAP[c] * (this.ducked ? 0.25 : 1) : 0;
  }

  private apply() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    for (const c of Object.keys(this.mix) as Channel[]) {
      const target = this.level(c);
      if (target > 0) this.build(c);
      const g = this.buses.get(c);
      if (!g) continue;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(target, t + FADE);
    }
  }

  /** Atualiza a mistura (volumes e ligados). Só soa se `play()` já foi chamado por um toque. */
  setMix(mix: Mix) {
    this.mix = mix;
    this.apply();
  }

  /** Começa a tocar (chamar só a partir de um toque da pessoa). */
  play(mix?: Mix) {
    this.init();
    if (!this.ctx) return;
    if (mix) this.mix = mix;
    void this.ctx.resume();
    this.playing = true;
    this.apply();
    this.emit();
  }

  stop() {
    this.playing = false;
    this.apply();
    this.emit();
  }

  /** Abaixa o ambiente enquanto a aula narrada fala. */
  duck(on: boolean) {
    this.ducked = on;
    this.apply();
  }
}

export const soundscape = new Soundscape();
