// Som e concentração (pacote v4, etapa 6): ambientes gerados no aparelho, todos desligados de início.
// Tocar/Pausar é sempre um toque da pessoa; cada ambiente tem volume próprio e pode ser misturado.
import { usePrefs } from '@/app/prefs';
import { useFx } from '@/app/fx';
import { CHANNELS, PRESETS, normalizeMix, presetMix, soundscape, type Channel, type Mix } from '@/app/soundscape';
import { Icon } from '@/components/Icon';
import { SettingsPage, Switch, useSoundPlaying } from './common';

export function SoundsPage() {
  const { prefs, setPrefs } = usePrefs();
  const { sfx } = useFx();
  const playing = useSoundPlaying();
  const mix = normalizeMix(prefs.sounds);
  const anyOn = CHANNELS.some((c) => mix[c.id].on);

  const save = (m: Mix) => {
    setPrefs({ sounds: m });
    soundscape.setMix(m);
  };
  const toggle = (c: Channel, on: boolean) => {
    const m = { ...mix, [c]: { ...mix[c], on } };
    save(m);
    // Ligar um ambiente é um toque: já toca, para ouvir na hora.
    if (on && !playing) soundscape.play(m);
  };

  return (
    <SettingsPage title="Som e concentração" subtitle="Ambientes para estudar, gerados no aparelho">
      <section className="card space-y-3 p-4">
        <div className="flex items-center gap-3">
          <button
            className={playing ? 'btn-ghost flex-1' : 'btn-primary flex-1'}
            disabled={!soundscape.supported || (!anyOn && !playing)}
            onClick={() => (playing ? soundscape.stop() : soundscape.play(mix))}
            data-testid="sons-tocar"
          >
            <Icon name={playing ? 'errado' : 'play'} size={16} /> {playing ? 'Pausar sons' : 'Tocar'}
          </button>
        </div>
        <p className="text-xs text-muted">
          {!soundscape.supported
            ? 'Este navegador não toca áudio gerado.'
            : anyOn
              ? 'Nada toca sozinho ao abrir o app. A aula narrada abaixa o ambiente enquanto fala.'
              : 'Escolha um ambiente ou uma combinação pronta para começar.'}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              className="rounded-[var(--radius-control)] border border-line p-3 text-left transition-colors hover:border-ink"
              onClick={() => {
                const m = presetMix(mix, p.id);
                save(m);
                soundscape.play(m);
              }}
            >
              <span className="block font-semibold">{p.name}</span>
              <span className="block text-xs text-muted">{p.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-4 p-4" aria-label="Ambientes">
        {CHANNELS.map((c) => (
          <div key={c.id}>
            <Switch label={c.name} sub={c.desc} checked={mix[c.id].on} onChange={(v) => toggle(c.id, v)} />
            {mix[c.id].on && (
              <label className="mt-2 flex items-center gap-3 text-sm">
                <span className="w-16 shrink-0 text-muted">Volume</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  aria-label={`Volume: ${c.name}`}
                  value={Math.round(mix[c.id].vol * 100)}
                  onChange={(e) => save({ ...mix, [c.id]: { on: true, vol: Number(e.target.value) / 100 } })}
                  className="flex-1 accent-[rgb(var(--gold))]"
                />
                <span className="w-10 text-right tabular-nums text-muted">{Math.round(mix[c.id].vol * 100)}%</span>
              </label>
            )}
          </div>
        ))}
        <p className="text-xs text-muted">Todos funcionam sem internet. O piano é gerado na hora, nota a nota; não é gravação de música.</p>
      </section>

      <section className="card p-4">
        <Switch
          label="Sons de resposta"
          sub="Toques curtos ao acertar, errar e concluir."
          checked={prefs.sound !== false}
          onChange={(on) => {
            setPrefs({ sound: on });
            if (on) sfx('ok', true);
          }}
        />
      </section>
    </SettingsPage>
  );
}
