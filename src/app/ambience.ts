// Ambiente sonoro medieval gerado no próprio aparelho (Web Audio), sem arquivos de áudio:
// - lareira: brasa grave, chiado da chama e estalos aleatórios de lenha;
// - música: melodia modal original (ré dórico, no estilo das danças medievais) com alaúde dedilhado
//   (síntese de corda de Karplus-Strong), flauta com sopro e vibrato, bordão de sanfona, tambor de
//   moldura e o eco de um salão de pedra.
// Não há vozes: só entrariam com voz natural de boa qualidade (decisão do usuário, 23/10/2026).
// Quando o usuário enviar gravações CC0 reais, elas podem substituir as camadas sintetizadas.

type Note = [midi: number, beats: number];

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

// Melodia em ré dórico, compasso ternário (semínima = 1). Duas frases: A e B.
const A: Note[] = [
  [62, 1], [65, 1], [69, 1], [67, 1.5], [65, 0.5], [64, 1], [65, 1], [69, 1], [72, 1], [71, 1.5], [69, 0.5], [67, 1],
  [69, 1], [74, 1], [72, 1], [69, 1], [67, 1], [65, 1], [64, 1], [67, 1], [65, 0.5], [64, 0.5], [62, 3],
];
const B: Note[] = [
  [69, 1], [72, 1], [74, 1], [76, 1.5], [74, 0.5], [72, 1], [74, 1], [72, 1], [69, 1], [67, 1.5], [69, 0.5], [71, 1],
  [72, 1], [71, 1], [69, 1], [67, 1], [65, 1], [64, 1], [65, 1], [64, 0.5], [62, 0.5], [64, 1], [62, 3],
];
// Acorde (fundamental, quinta, oitava) por compasso de 3 tempos.
const CHORDS_A = [50, 48, 53, 55, 50, 53, 48, 50];
const CHORDS_B = [57, 48, 50, 55, 57, 48, 53, 50];
// Forma: só alaúde (A), alaúde e flauta (A, B), tudo com tambor (A, B), e recomeça.
const FORM: { mel: Note[]; chords: number[]; flute: boolean; drum: boolean }[] = [
  { mel: A, chords: CHORDS_A, flute: false, drum: false },
  { mel: A, chords: CHORDS_A, flute: true, drum: false },
  { mel: B, chords: CHORDS_B, flute: true, drum: true },
  { mel: A, chords: CHORDS_A, flute: true, drum: true },
  { mel: B, chords: CHORDS_B, flute: false, drum: true },
];
const BPM = 84;

class Ambience {
  private ctx?: AudioContext;
  private master?: GainNode;
  private musicBus?: GainNode;
  private fireBus?: GainNode;
  private reverb?: ConvolverNode;
  private noise?: AudioBuffer;
  private plucks = new Map<number, AudioBuffer>();
  private timer?: number;
  private crackleTimer?: number;
  private nextTime = 0;
  private section = 0;
  private musicOn = false;
  private fireOn = false;

  get supported() {
    return typeof window !== 'undefined' && !!(window.AudioContext || (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext);
  }

  private init(given?: BaseAudioContext) {
    if (this.ctx) return;
    if (!given && !this.supported) return;
    const C = given ? undefined : window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = (given ?? new C!()) as AudioContext;
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(ctx.destination);
    // Salão de pedra: resposta ao impulso gerada (ruído com queda exponencial, 2,4 s).
    const len = Math.floor(ctx.sampleRate * 2.4);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.32;
    this.reverb.connect(wet).connect(this.master);
    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = 0;
    this.musicBus.connect(this.master);
    this.musicBus.connect(this.reverb);
    this.fireBus = ctx.createGain();
    this.fireBus.gain.value = 0;
    this.fireBus.connect(this.master);
    const n = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const nd = n.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.noise = n;
  }

  /** Corda dedilhada (Karplus-Strong), guardada por altura. */
  private pluck(midi: number): AudioBuffer {
    const hit = this.plucks.get(midi);
    if (hit) return hit;
    const ctx = this.ctx!;
    const sr = ctx.sampleRate;
    const dur = 2.2;
    const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr);
    const out = buf.getChannelData(0);
    const period = sr / mtof(midi);
    const N = Math.max(2, Math.floor(period));
    const frac = period - N;
    const line = new Float32Array(N + 1);
    // Ataque com ruído filtrado (dedo na corda, mais suave que palheta).
    let prev = 0;
    for (let i = 0; i <= N; i++) {
      const r = Math.random() * 2 - 1;
      prev = prev * 0.5 + r * 0.5;
      line[i] = prev;
    }
    let idx = 0;
    const decay = 0.9965 - Math.max(0, midi - 60) * 0.0002;
    for (let i = 0; i < out.length; i++) {
      const a = line[idx];
      const b = line[(idx + 1) % (N + 1)];
      const v = (a * (1 - frac) + b * frac + a) * 0.5 * decay;
      out[i] = a;
      line[idx] = v;
      idx = (idx + 1) % (N + 1);
    }
    // Envelope de saída curto no fim para não estalar.
    for (let i = out.length - 2000; i < out.length; i++) out[i] *= (out.length - i) / 2000;
    this.plucks.set(midi, buf);
    return buf;
  }

  private playPluck(midi: number, t: number, gain: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.pluck(midi);
    // Caixa do alaúde: ressonância grave e um brilho suave.
    const body = ctx.createBiquadFilter();
    body.type = 'peaking';
    body.frequency.value = 220;
    body.gain.value = 5;
    body.Q.value = 1.2;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3600;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(body).connect(tone).connect(g).connect(this.musicBus!);
    src.start(t);
  }

  private playFlute(midi: number, t: number, dur: number) {
    const ctx = this.ctx!;
    const f = mtof(midi + 12);
    const o1 = ctx.createOscillator();
    o1.type = 'triangle';
    o1.frequency.value = f;
    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = f * 2;
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.2;
    const vibAmt = ctx.createGain();
    vibAmt.gain.setValueAtTime(0, t);
    vibAmt.gain.linearRampToValueAtTime(f * 0.006, t + Math.min(0.4, dur * 0.6));
    vib.connect(vibAmt);
    vibAmt.connect(o1.frequency);
    vibAmt.connect(o2.frequency);
    const g2 = ctx.createGain();
    g2.gain.value = 0.18;
    // Sopro: ruído em banda estreita na altura da nota.
    const breath = ctx.createBufferSource();
    breath.buffer = this.noise!;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = f;
    bp.Q.value = 12;
    const bg = ctx.createGain();
    bg.gain.value = 0.35;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    const env = ctx.createGain();
    const peak = 0.075;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(peak, t + 0.06);
    env.gain.setValueAtTime(peak * 0.85, t + Math.max(0.07, dur - 0.08));
    env.gain.linearRampToValueAtTime(0, t + dur);
    o1.connect(lp);
    o2.connect(g2).connect(lp);
    breath.connect(bp).connect(bg).connect(lp);
    lp.connect(env).connect(this.musicBus!);
    for (const s of [o1, o2, vib]) {
      s.start(t);
      s.stop(t + dur + 0.05);
    }
    breath.start(t, Math.random() * 2);
    breath.stop(t + dur + 0.05);
  }

  private playDrone(t: number, dur: number, root: number) {
    const ctx = this.ctx!;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.02, t + 0.5);
    env.gain.setValueAtTime(0.02, t + dur - 0.5);
    env.gain.linearRampToValueAtTime(0, t + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 700;
    lp.Q.value = 0.8;
    for (const m of [root, root + 7]) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = mtof(m);
      o.detune.value = (Math.random() - 0.5) * 6;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
    lp.connect(env).connect(this.musicBus!);
  }

  private playDrum(t: number, accent: boolean) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(accent ? 110 : 140, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(accent ? 0.2 : 0.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g).connect(this.musicBus!);
    o.start(t);
    o.stop(t + 0.4);
    // Pele: ruído curto e abafado.
    const n = ctx.createBufferSource();
    n.buffer = this.noise!;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(accent ? 0.12 : 0.06, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    n.connect(lp).connect(ng).connect(this.musicBus!);
    n.start(t, Math.random() * 2);
    n.stop(t + 0.15);
  }

  /** Agenda uma seção inteira (8 compassos) a partir de `t`; devolve a duração. */
  private scheduleSection(t: number): number {
    const beat = 60 / BPM;
    const s = FORM[this.section % FORM.length];
    this.section++;
    // Alaúde: arpejo do acorde em colcheias (fundamental, quinta, oitava, quinta...).
    s.chords.forEach((root, bar) => {
      const pat = [root, root + 7, root + 12, root + 7, root + 12, root + 7];
      pat.forEach((m, k) => this.playPluck(m, t + (bar * 3 + k * 0.5) * beat + Math.random() * 0.012, k === 0 ? 0.55 : 0.32));
      if (s.drum) {
        this.playDrum(t + bar * 3 * beat, true);
        this.playDrum(t + (bar * 3 + 2) * beat, false);
      }
    });
    this.playDrone(t, s.chords.length * 3 * beat, 50);
    // Melodia: flauta, ou alaúde agudo quando a flauta descansa.
    let pos = 0;
    for (const [m, b] of s.mel) {
      const at = t + pos * beat;
      if (s.flute) this.playFlute(m, at, b * beat * 0.95);
      else this.playPluck(m + 12, at, 0.42);
      pos += b;
    }
    return s.chords.length * 3 * beat;
  }

  private startScheduler() {
    if (this.timer) return;
    const ctx = this.ctx!;
    this.nextTime = Math.max(this.nextTime, ctx.currentTime + 0.2);
    const tick = () => {
      if (!this.musicOn) return;
      while (this.nextTime < ctx.currentTime + 4) this.nextTime += this.scheduleSection(this.nextTime);
    };
    tick();
    this.timer = window.setInterval(tick, 500);
  }

  private fireLayers = false;

  private startFire() {
    const ctx = this.ctx!;
    if (this.crackleTimer) return;
    if (!this.fireLayers) this.startFireLayers(ctx);
    this.startCrackles(ctx);
  }

  private startFireLayers(ctx: AudioContext) {
    this.fireLayers = true;
    // Brasa: ruído grave que respira devagar.
    const rumble = ctx.createBufferSource();
    rumble.buffer = this.noise!;
    rumble.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 320;
    const rg = ctx.createGain();
    rg.gain.value = 0.11;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.23;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 0.04;
    lfo.connect(lfoAmt).connect(rg.gain);
    rumble.connect(lp).connect(rg).connect(this.fireBus!);
    // Chama: chiado agudo e baixo.
    const hiss = ctx.createBufferSource();
    hiss.buffer = this.noise!;
    hiss.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.value = 2600;
    hp.Q.value = 0.5;
    const hg = ctx.createGain();
    hg.gain.value = 0.025;
    hiss.connect(hp).connect(hg).connect(this.fireBus!);
    rumble.start();
    hiss.start(0, 1.3);
    lfo.start();
  }

  private crackleAt(ctx: AudioContext, now: number) {
    const count = 2 + Math.floor(Math.random() * 6);
    for (let k = 0; k < count; k++) {
      const t = now + Math.random() * 0.25;
      const big = Math.random() < 0.12;
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = big ? 900 + Math.random() * 900 : 1800 + Math.random() * 4000;
      bp.Q.value = 1.5 + Math.random() * 3;
      const g = ctx.createGain();
      const len = big ? 0.03 + Math.random() * 0.05 : 0.004 + Math.random() * 0.018;
      g.gain.setValueAtTime(big ? 0.55 : 0.08 + Math.random() * 0.18, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + len);
      src.connect(bp).connect(g).connect(this.fireBus!);
      src.start(t, Math.random() * 2.5);
      src.stop(t + len + 0.02);
    }
  }

  private startCrackles(ctx: AudioContext) {
    // Estalos: rajadas curtas em tempos aleatórios, algumas mais fortes (nós da lenha).
    this.crackleTimer = window.setInterval(() => {
      if (this.fireOn) this.crackleAt(ctx, ctx.currentTime);
    }, 260);
  }

  /**
   * Renderiza alguns segundos do ambiente num contexto offline (para conferir volume e distorção
   * fora do navegador e gerar uma amostra). Usa o mesmo código das camadas ao vivo.
   */
  renderInto(ctx: BaseAudioContext, seconds: number) {
    this.init(ctx);
    this.musicBus!.gain.value = 0.55;
    this.fireBus!.gain.value = 1.1;
    this.musicOn = true;
    this.startFireLayers(ctx as AudioContext);
    let t = 0.2;
    while (t < seconds) t += this.scheduleSection(t);
    // Estalos ao longo do tempo, como o timer faria ao vivo.
    for (let at = 0; at < seconds; at += 0.26) this.crackleAt(ctx as AudioContext, at);
  }

  /** Liga ou desliga as camadas (precisa vir de um toque do usuário na primeira vez). */
  set(opts: { music: boolean; fire: boolean; volume?: number }) {
    if (!opts.music && !opts.fire && !this.ctx) return;
    this.init();
    const ctx = this.ctx;
    if (!ctx) return;
    void ctx.resume();
    const now = ctx.currentTime;
    const vol = opts.volume ?? 1;
    if (opts.fire && !this.fireOn) {
      this.fireOn = true;
      this.startFire();
    }
    if (!opts.fire) this.fireOn = false;
    this.fireBus!.gain.cancelScheduledValues(now);
    this.fireBus!.gain.linearRampToValueAtTime(opts.fire ? 1.1 * vol : 0, now + 1.2);
    if (!opts.fire && this.crackleTimer) {
      window.clearInterval(this.crackleTimer);
      this.crackleTimer = undefined;
    }
    this.musicOn = opts.music;
    this.musicBus!.gain.cancelScheduledValues(now);
    this.musicBus!.gain.linearRampToValueAtTime(opts.music ? 0.55 * vol : 0, now + 1.5);
    if (opts.music) this.startScheduler();
    else if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}

export const ambience = new Ambience();
