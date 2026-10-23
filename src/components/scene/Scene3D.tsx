// Cena 3D em tempo real do prólogo da missão (kit, seção 7, caminho "3D gratuito" escolhido pelo
// usuário). A sala do Arquivo é montada com peças CC0 do KayKit; os personagens são modelos com
// esqueleto e animações (andar, gesticular, pegar objetos). Cada fala tem um enquadramento: a câmera
// se move entre plano geral, dois personagens, close e detalhe; velas e tocha tremulam e projetam
// sombra; um relâmpago abre a cena; a folha do livro de empenhos se desenrola sobre a mesa.
// Legendas sempre visíveis, controles de pausar, voltar, avançar, pular e som; sem WebGL, com
// "reduzir movimento" ou em caso de erro, a missão usa a transcrição.
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneBeat } from '@/content/types';
import { usePrefs } from '@/app/prefs';
import { Icon } from '@/components/Icon';

const BASE = `${import.meta.env.BASE_URL}scene/arquivo/`;

type Shot = { pos: THREE.Vector3; look: THREE.Vector3; drift?: THREE.Vector3 };
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

const beatDuration = (b: SceneBeat) => Math.min(9000, Math.max(3800, 1600 + b.text.length * 55));

interface Actor {
  root: THREE.Object3D;
  mixer: THREE.AnimationMixer;
  actions: Record<string, THREE.AnimationAction>;
  current?: THREE.AnimationAction;
}

function play(a: Actor | undefined, name: string, once = false) {
  if (!a) return;
  const next = a.actions[name];
  if (!next || next === a.current) return;
  next.reset();
  next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
  next.clampWhenFinished = once;
  next.enabled = true;
  if (a.current) next.crossFadeFrom(a.current, 0.35, false);
  next.play();
  a.current = next;
}

/** Folha de pergaminho com a tabela de empenhos (o "objeto" que a cena mostra). */
function ledgerTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const g = c.getContext('2d')!;
  g.fillStyle = '#efe2c2';
  g.fillRect(0, 0, 512, 320);
  g.strokeStyle = '#8a6a3a';
  g.lineWidth = 4;
  g.strokeRect(8, 8, 496, 304);
  g.fillStyle = '#3a2a16';
  g.font = 'bold 26px Georgia, serif';
  g.fillText('Livro de Empenhos · 2026', 28, 46);
  const rows = [
    ['id', 'fornecedor', 'valor', 'status'],
    ['1', '11', '12000', 'pago'],
    ['2', '22', '3500', 'pago'],
    ['4', '44', '95000', 'NULL'],
    ['5', '44', '87000', 'NULL'],
    ['6', '99', '40000', 'pago'],
  ];
  const xs = [28, 110, 270, 390];
  rows.forEach((r, i) => {
    const y = 90 + i * 38;
    if (r[3] === 'NULL') {
      g.fillStyle = 'rgba(232,177,59,0.45)';
      g.fillRect(20, y - 26, 472, 34);
    }
    g.fillStyle = i === 0 ? '#1f5c45' : '#2b2015';
    g.font = `${i === 0 ? 'bold ' : ''}22px "Courier New", monospace`;
    r.forEach((t, k) => g.fillText(t, xs[k], y));
    g.strokeStyle = 'rgba(90,60,30,0.35)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(20, y + 10);
    g.lineTo(492, y + 10);
    g.stroke();
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Bubo: coruja low-poly feita com geometria simples (sem modelo externo). */
function makeOwl(): THREE.Group {
  const g = new THREE.Group();
  const mat = (c: string) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, flatShading: true });
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 1), mat('#6b4a2f'));
  body.scale.set(1, 1.25, 0.95);
  body.position.y = 0.3;
  const belly = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 1), mat('#e9d9b8'));
  belly.scale.set(1, 1.3, 0.6);
  belly.position.set(0, 0.27, 0.15);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), mat('#7a5636'));
  head.position.y = 0.66;
  const eyeW = mat('#fff8e6');
  const eyeB = mat('#1b1510');
  for (const s of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 10), eyeW);
    e.position.set(0.08 * s, 0.7, 0.16);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), eyeB);
    p.position.set(0.08 * s, 0.7, 0.215);
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), mat('#5a3c22'));
    ear.position.set(0.12 * s, 0.86, 0);
    ear.rotation.z = -0.35 * s;
    g.add(e, p, ear);
  }
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 4), mat('#d98f2b'));
  beak.position.set(0, 0.63, 0.2);
  beak.rotation.x = Math.PI / 2 + 0.4;
  g.add(body, belly, head, beak);
  g.traverse((o) => ((o as THREE.Mesh).castShadow = true));
  return g;
}

export default function Scene3D({ beats, onEnd, onFallback }: { beats: SceneBeat[]; onEnd: () => void; onFallback: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const { prefs } = usePrefs();
  const [loading, setLoading] = useState(0);
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(!!prefs.sound);
  const [done, setDone] = useState(false);
  const api = useRef<{ beat: (n: number) => void; audio: (on: boolean) => void } | null>(null);
  const reduce = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    } catch {
      onFallback();
      return;
    }
    renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0e1211');
    scene.fog = new THREE.Fog('#0e1211', 9, 22);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);

    // Luz: ambiente fria e baixa, lua pela esquerda, velas e tocha quentes (com sombra).
    const hemi = new THREE.HemisphereLight('#6c7f9a', '#2a1d12', 0.45);
    const moon = new THREE.DirectionalLight('#8fa6d8', 0.55);
    moon.position.set(-8, 10, 6);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    moon.shadow.camera.left = -8;
    moon.shadow.camera.right = 8;
    moon.shadow.camera.top = 8;
    moon.shadow.camera.bottom = -8;
    const candle = new THREE.PointLight('#ffb35c', 14, 9, 1.6);
    candle.castShadow = true;
    candle.shadow.mapSize.set(512, 512);
    candle.shadow.bias = -0.002;
    const torch = new THREE.PointLight('#ff8a3c', 10, 10, 1.6);
    torch.position.set(-2.2, 2.6, -4.6);
    scene.add(hemi, moon, candle, torch);

    const loader = new GLTFLoader(
      new THREE.LoadingManager(
        () => undefined,
        (_u, loaded, total) => setLoading(Math.round((loaded / total) * 100)),
        () => onFallback(),
      ),
    );
    const actors: Record<string, Actor> = {};
    const mixers: THREE.AnimationMixer[] = [];
    let owl: THREE.Group | undefined;
    let ledger: THREE.Mesh | undefined;
    let tableTop = 1;
    let disposed = false;

    // Câmera: alvo atual e interpolação suave entre enquadramentos.
    const camPos = v(9, 5.2, 11);
    const camLook = v(0, 1, 0);
    let target: Shot = { pos: v(7.5, 4.4, 9), look: v(0, 1.1, 0), drift: v(-0.06, -0.02, -0.08) };
    camera.position.copy(camPos);

    // Roteiro: cada fala muda o enquadramento e dispara ações.
    let walk: { from: THREE.Vector3; to: THREE.Vector3; t: number; start?: number } | undefined;
    let unroll = 0;
    let unrollStart: number | undefined;
    let flash = 0;
    const shots = (b: SceneBeat): Shot => {
      switch (b.shot) {
        case 'geral':
          return { pos: v(6.0, 3.6, 7.0), look: v(0.8, 1.0, -0.5), drift: v(-0.08, -0.02, -0.1) };
        case 'dupla':
          return b.action === 'brites-cruza-bracos' ? { pos: v(0.5, 1.75, 0.9), look: v(3.0, 1.3, -0.6), drift: v(0.02, 0, -0.02) } : { pos: v(5.6, 2.0, 7.4), look: v(5.2, 1.1, 2.0), drift: v(-0.55, 0, -0.12) };
        case 'close':
          return { pos: v(0.5, 1.75, 1.3), look: v(0, 1.35, -1.6), drift: v(-0.02, 0, -0.02) };
        case 'objeto':
          // No celular (retrato), a câmera sobe para a folha inteira caber na largura.
          return camera.aspect < 1 ? { pos: v(0, tableTop + 2.4, 1.3), look: v(0, tableTop, 0.2), drift: v(0, -0.02, -0.01) } : { pos: v(0, tableTop + 1.5, 1.6), look: v(0, tableTop, 0.25), drift: v(0, -0.02, -0.02) };
      }
    };
    const beat = (n: number) => {
      const b = beats[n];
      if (!b) return;
      target = shots(b);
      if (reduce || n === 0) {
        camPos.copy(target.pos);
        camLook.copy(target.look);
      }
      switch (b.action) {
        case 'camera-entra':
          if (!reduce) flash = 1;
          break;
        case 'valerio-entra':
          if (actors.valerio) {
            walk = { from: v(7.5, 0, 2.2), to: v(2.6, 0, 1.9), t: 0 };
            actors.valerio.root.position.copy(walk.from);
            play(actors.valerio, 'Walking_A');
          }
          break;
        case 'brites-cruza-bracos':
          play(actors.brites, 'Interact', true);
          break;
        case 'isolda-aponta':
          play(actors.isolda, 'Spellcast_Raise', true);
          break;
        case 'livro-abre':
          play(actors.isolda, 'Use_Item', true);
          unroll = 0.0001;
          unrollStart = undefined;
          break;
      }
    };

    const build = async () => {
      const [sala, isolda, valerio, brites] = await Promise.all(['sala', 'isolda', 'valerio', 'brites'].map((n) => loader.loadAsync(`${BASE}${n}.glb`)));
      if (disposed) return;
      const pick = (name: string) => {
        const o = sala.scene.getObjectByName(name);
        if (!o) throw new Error(`peça ${name} ausente`);
        return o;
      };
      const place = (name: string, x: number, y: number, z: number, ry = 0) => {
        const o = pick(name).clone(true);
        o.position.set(x, y, z);
        o.rotation.y = ry;
        scene.add(o);
        return o;
      };
      // Piso, paredes, colunas, estantes, estandarte, tocha e móveis.
      for (const x of [-4, 0, 4, 8]) for (const z of [-4, 0, 4]) place('floor_wood_large_dark', x, 0, z);
      place('wall_shelves', -4, 0, -6);
      place('wall', 0, 0, -6);
      place('wall_shelves', 4, 0, -6);
      place('wall', -6, 0, -4, Math.PI / 2);
      place('wall_shelves', -6, 0, 0, Math.PI / 2);
      place('banner_green', 0, 0, -5.7);
      place('torch_mounted', -2.2, 0, -5.8);
      place('column', -5.2, 0, 3.6);
      place('shelves', 4.6, 0, -4.4, -Math.PI / 6);
      place('box_stacked', 6.2, 0, -2.4, 0.4);
      const table = place('table_long_tablecloth', 0, 0, 0, Math.PI / 2);
      const box = new THREE.Box3().setFromObject(table);
      tableTop = box.max.y;
      place('chair', -1.5, 0, -1.6);
      place('candle_triple', 1.15, tableTop - 0.02, -0.4);
      place('candle_lit', -1.6, tableTop - 0.02, -0.45);
      place('bottle_A_labeled_green', -1.75, tableTop - 0.02, 0.15);
      place('plate_stack', -1.7, tableTop - 0.02, -0.75);
      candle.position.set(1.15, tableTop + 0.9, -0.4);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });

      // Personagens: sem armas; Isolda segura o livro aberto.
      const setup = (key: string, g: { scene: THREE.Group; animations: THREE.AnimationClip[] }, hide: string[], pos: THREE.Vector3, ry: number) => {
        const root = g.scene;
        root.traverse((o) => {
          if (hide.includes(o.name)) o.visible = false;
          const m = o as THREE.Mesh;
          if (m.isMesh) m.castShadow = true;
        });
        root.position.copy(pos);
        root.rotation.y = ry;
        scene.add(root);
        const mixer = new THREE.AnimationMixer(root);
        mixers.push(mixer);
        const actions = Object.fromEntries(g.animations.map((c) => [c.name, mixer.clipAction(c)]));
        actors[key] = { root, mixer, actions };
        mixer.addEventListener('finished', () => play(actors[key], key === 'isolda' ? 'Idle' : 'Unarmed_Idle'));
        play(actors[key], key === 'isolda' ? 'Idle' : 'Unarmed_Idle');
      };
      setup('isolda', isolda, ['Spellbook', '1H_Wand', '2H_Staff'], v(0, 0, -1.6), 0);
      setup('valerio', valerio, ['1H_Sword_Offhand', 'Badge_Shield', 'Rectangle_Shield', 'Round_Shield', 'Spike_Shield', '1H_Sword', '2H_Sword', 'Knight_Helmet'], v(7.5, 0, 2.2), -1.6);
      setup('brites', brites, ['Knife_Offhand', '1H_Crossbow', '2H_Crossbow', 'Knife', 'Throwable'], v(3.6, 0, -0.8), -1.3);

      owl = makeOwl();
      owl.position.set(-1.25, tableTop - 0.02, 0.25);
      owl.rotation.y = 0.5;
      scene.add(owl);

      // A folha que se desenrola sobre a mesa.
      ledger = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1), new THREE.MeshStandardMaterial({ map: ledgerTexture(), roughness: 0.9 }));
      ledger.rotation.x = -Math.PI / 2;
      ledger.position.set(0, tableTop + 0.012, 0.2);
      ledger.scale.set(0.001, 1, 1);
      ledger.receiveShadow = true;
      scene.add(ledger);

      setReady(true);
      beat(0);
    };
    build().catch(() => onFallback());

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / Math.max(1, h);
      camera.fov = camera.aspect < 1 ? 56 : 42;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : undefined;
    ro?.observe(el);

    // Som ambiente opcional: chuva (ruído filtrado), gerado na hora, sem arquivo de áudio.
    let ctx: AudioContext | undefined;
    let gain: GainNode | undefined;
    const audio = (on: boolean) => {
      if (on && !ctx) {
        try {
          ctx = new AudioContext();
          const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.loop = true;
          const f = ctx.createBiquadFilter();
          f.type = 'bandpass';
          f.frequency.value = 1400;
          f.Q.value = 0.6;
          gain = ctx.createGain();
          gain.gain.value = 0;
          src.connect(f).connect(gain).connect(ctx.destination);
          src.start();
        } catch {
          return;
        }
      }
      if (gain && ctx) gain.gain.linearRampToValueAtTime(on ? 0.06 : 0, ctx.currentTime + 0.4);
    };
    api.current = { beat, audio };

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const dt = Math.min(0.05, clock.getDelta());
      const t = clock.elapsedTime;
      mixers.forEach((m) => m.update(dt));
      // Valério atravessa a sala até a mesa.
      if (walk && actors.valerio) {
        // Tempo real (não o intervalo limitado), para chegar no mesmo instante em aparelhos lentos.
        walk.start ??= t;
        walk.t = Math.min(1, (t - walk.start) / 3.2);
        actors.valerio.root.position.lerpVectors(walk.from, walk.to, walk.t);
        actors.valerio.root.rotation.y = Math.atan2(walk.to.x - walk.from.x, walk.to.z - walk.from.z);
        if (walk.t >= 1) {
          walk = undefined;
          actors.valerio.root.rotation.y = -2.45;
          play(actors.valerio, 'Unarmed_Idle');
        }
      }
      if (ledger && unroll > 0 && unroll < 1) {
        unrollStart ??= t;
        unroll = Math.min(1, 0.0001 + (t - unrollStart) / 1.4);
        ledger.scale.x = 0.001 + unroll * (1 - 0.001);
      }
      if (owl) {
        owl.position.y = tableTop - 0.02 + Math.abs(Math.sin(t * 1.3)) * 0.02;
        owl.rotation.y = 0.5 + Math.sin(t * 0.6) * 0.35;
      }
      // Chama das velas e da tocha.
      candle.intensity = 13 + Math.sin(t * 9) * 1.2 + Math.sin(t * 23) * 0.8;
      torch.intensity = 9 + Math.sin(t * 7 + 1) * 1.4 + Math.sin(t * 17) * 0.7;
      // Relâmpago na abertura.
      if (flash > 0) {
        moon.intensity = 0.55 + flash * 4;
        flash = Math.max(0, flash - dt * 1.8);
      }
      // Câmera desliza até o enquadramento e segue com um leve movimento.
      if (target.drift && !reduce) {
        target.pos.addScaledVector(target.drift, dt);
        if (walk && actors.valerio) target.look.lerp(actors.valerio.root.position.clone().setY(1.1), 0.05);
      }
      const k = reduce ? 1 : 1 - Math.pow(0.0025, dt);
      camPos.lerp(target.pos, k);
      camLook.lerp(target.look, k);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      void ctx?.close();
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
      });
      el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Avanço automático das falas.
  useEffect(() => {
    if (!ready || paused || done) return;
    api.current?.beat(i);
    const t = window.setTimeout(() => (i + 1 < beats.length ? setI(i + 1) : setDone(true)), beatDuration(beats[i]));
    return () => window.clearTimeout(t);
  }, [i, ready, paused, done, beats]);

  useEffect(() => {
    api.current?.audio(sound && ready);
  }, [sound, ready]);

  const b = beats[i];
  return (
    <div className="relative h-[52dvh] min-h-[320px] overflow-hidden rounded-3xl bg-[#0e1211] lg:h-[62vh]">
      <div ref={host} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-[#cfc8b6]" role="status">
          Montando a sala do Arquivo… {loading}%
        </div>
      )}
      {ready && (
        <>
          {/* Legenda sincronizada */}
          <div className="pointer-events-none absolute inset-x-3 bottom-14 text-center" aria-live="polite">
            <p className="inline-block max-w-[34rem] rounded-xl bg-black/65 px-3 py-2 text-[0.95rem] leading-snug text-[#f3eee2] shadow-lg backdrop-blur-sm">
              {b.who !== 'Narração' && <b className="mr-1 text-[#e8b13b]">{b.who}:</b>}
              <span className={b.who === 'Narração' ? 'italic' : ''}>{b.text}</span>
            </p>
          </div>
          {/* Controles */}
          <div className="absolute inset-x-2 bottom-2 flex items-center gap-1 text-[#f3eee2]">
            <button className="grid h-10 w-10 place-items-center rounded-full bg-black/45 disabled:opacity-40" disabled={i === 0} onClick={() => { setDone(false); setI(i - 1); }} aria-label="Fala anterior">
              <Icon name="voltar" size={18} />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-black/45" onClick={() => setPaused(!paused)} aria-label={paused ? 'Continuar a cena' : 'Pausar a cena'}>
              {paused ? <Icon name="play" size={18} fill="currentColor" /> : <span className="text-sm font-bold">II</span>}
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-black/45 disabled:opacity-40" disabled={i >= beats.length - 1} onClick={() => setI(i + 1)} aria-label="Próxima fala">
              <Icon name="seta" size={18} />
            </button>
            <span className="flex-1 text-center text-xs opacity-75">
              {i + 1}/{beats.length}
            </span>
            <button className="rounded-full bg-black/45 px-3 py-2 text-xs font-semibold" onClick={() => setSound(!sound)} aria-pressed={sound} aria-label={sound ? 'Desligar o som ambiente' : 'Ligar o som ambiente'}>
              {sound ? 'Som: ligado' : 'Som: desligado'}
            </button>
            <button className="rounded-full bg-black/45 px-3 py-2 text-xs font-semibold" onClick={() => { setI(0); setDone(false); setPaused(false); }} aria-label="Rever a cena do início">
              Rever
            </button>
          </div>
          {done && (
            <div className="absolute inset-x-0 top-3 text-center">
              <button className="rounded-full bg-[#e8b13b] px-4 py-2 text-sm font-bold text-[#1b1510] shadow-lg" onClick={onEnd}>
                Continuar para os objetivos
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
