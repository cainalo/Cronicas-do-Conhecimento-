// Painel de personalização da aparência (pedido do usuário, 25/10/2026): paletas prontas, cada cor
// ajustável (por tema), estilos de fundo, cartões, atalhos, botões, sombras, espaçamento, fonte e
// movimento, com prévia ao vivo, aviso de contraste, restaurar padrão e copiar/colar a aparência.
// Tudo é salvo nas preferências do aparelho (prefs.look) e aplicado na hora (lib/theme.ts).
import { useMemo, useState, type ReactNode } from 'react';
import { usePrefs } from '@/app/prefs';
import {
  COLOR_GROUPS,
  COLOR_LABEL,
  DEFAULT_LOOK,
  PALETTES,
  contrastWarnings,
  exportLook,
  importLook,
  normalizeLook,
  resolveColors,
  type ColorKey,
  type Look,
} from '@/lib/theme';
import { Icon } from '@/components/Icon';
import { PageHeader, Tile, TileGrid } from '@/components/Page';

function Choice<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <fieldset className="mt-3">
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {options.map(([v, text]) => (
          <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)} className={value === v ? 'btn-primary !min-h-[38px] !px-3 !py-1.5 text-sm' : 'btn-ghost !min-h-[38px] !px-3 !py-1.5 text-sm'}>
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="mt-3 block">
      <span className="flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span className="tabular-nums text-muted">
          {value}
          {unit}
        </span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full accent-[rgb(var(--gold))]" aria-label={label} />
    </label>
  );
}

function Section({ title, children, hint }: { title: string; children: ReactNode; hint?: string }) {
  return (
    <section className="card p-4 sm:p-5">
      <h2 className="text-lg">{title}</h2>
      {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
      {children}
    </section>
  );
}

export function CustomizePage() {
  const { prefs, setPrefs } = usePrefs();
  const look = normalizeLook(prefs.look);
  const theme = prefs.theme;
  const colors = useMemo(() => resolveColors(look, theme), [look, theme]);
  const warnings = contrastWarnings(colors, theme);
  const [io, setIo] = useState('');
  const [ioMsg, setIoMsg] = useState<string>();
  const set = (patch: Partial<Look>) => setPrefs({ look: { ...look, ...patch } });
  const setColor = (k: ColorKey, hex: string | undefined) => {
    const cur = { ...look.colors[theme] };
    if (hex) cur[k] = hex;
    else delete cur[k];
    set({ colors: { ...look.colors, [theme]: cur } });
  };
  const overridden = (k: ColorKey) => k in look.colors[theme];

  return (
    <div className="space-y-5">
      <PageHeader area="conta" title="Personalizar aparência" subtitle="Cores e estilos de tudo, salvos neste aparelho" icon="estrela" />

      <section className="card p-4" aria-label="Prévia">
        <p className="text-sm font-semibold text-gold">Prévia ao vivo</p>
        <div className="mt-2">
          <TileGrid>
            <Tile to="/personalizar" icon="mapa" color="rgb(var(--area-trilha))" title="Cartão de atalho" text="Assim ficam os atalhos." badge="novo" />
            <Tile to="/personalizar" icon="ampulheta" color="rgb(var(--area-revisar))" title="Outro atalho" text="Cada área tem sua cor." />
          </TileGrid>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="btn-primary pointer-events-none">Botão principal</span>
          <span className="btn-ghost pointer-events-none">Secundário</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-raised">
          <div className="progress-shine h-full w-2/3 rounded-full bg-gold" />
        </div>
        <p className="mt-2 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-ok/15 px-2.5 py-1 font-semibold text-ok">✓ Correto</span>
          <span className="rounded-full bg-bad/15 px-2.5 py-1 font-semibold text-bad">✗ Ainda não</span>
          <span className="term-link">termo do glossário</span>
        </p>
      </section>

      <Section title="Tema">
        <div className="mt-2 flex gap-2">
          <button className={theme === 'light' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={theme === 'light'} onClick={() => setPrefs({ theme: 'light' })}>
            <Icon name="sol" size={18} /> Claro
          </button>
          <button className={theme === 'dark' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={theme === 'dark'} onClick={() => setPrefs({ theme: 'dark' })}>
            <Icon name="lua" size={18} /> Escuro
          </button>
        </div>
      </Section>

      <Section title="Paletas prontas" hint="Escolher uma paleta desfaz as cores trocadas à mão.">
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PALETTES.map((p) => {
            const c = resolveColors({ ...look, palette: p.id, colors: { light: {}, dark: {} } }, theme);
            const on = look.palette === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => set({ palette: p.id, colors: { light: {}, dark: {} } })}
                className={`rounded-2xl border-2 p-3 text-left transition hover:-translate-y-0.5 ${on ? 'border-gold' : 'border-line'}`}
                style={{ background: c.bg }}
              >
                <span className="flex gap-1">
                  {[c.primary, c.secondary, c.teal, c.pink, c.accent].map((x) => (
                    <span key={x} className="swatch" style={{ background: x }} />
                  ))}
                </span>
                <span className="mt-2 block text-sm font-bold" style={{ color: c.ink }}>
                  {p.name} {on && '✓'}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Cores" hint={`Toque numa cor para trocar. Vale para o tema ${theme === 'dark' ? 'escuro' : 'claro'}; troque o tema acima para ajustar o outro.`}>
        {warnings.length > 0 && (
          <div className="mt-3 rounded-2xl border border-bad/40 bg-bad/10 p-3 text-sm" role="status">
            <p className="font-semibold">Atenção à leitura:</p>
            <ul className="mt-1 list-disc pl-5">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}
        {COLOR_GROUPS.map((g) => (
          <div key={g.title} className="mt-4">
            <h3 className="text-sm font-semibold text-muted">{g.title}</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {g.keys.map((k) => (
                <li key={k} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-2">
                  <input type="color" className="color-input shrink-0" value={colors[k]} onChange={(e) => setColor(k, e.target.value)} aria-label={COLOR_LABEL[k]} />
                  <span className="min-w-0 flex-1 text-sm leading-snug">
                    {COLOR_LABEL[k]}
                    <span className="block font-mono text-xs uppercase text-muted">{colors[k]}</span>
                  </span>
                  {overridden(k) && (
                    <button type="button" className="shrink-0 text-xs font-semibold text-gold underline" onClick={() => setColor(k, undefined)} aria-label={`Voltar ${COLOR_LABEL[k]} à cor da paleta`}>
                      Voltar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Estilos">
        <Choice label="Fundo da página" value={look.bg} onChange={(bg) => set({ bg })} options={[['manchas', 'Manchas de cor'], ['degrade', 'Degradê'], ['pontos', 'Pontinhos'], ['listras', 'Listras'], ['liso', 'Liso']]} />
        <Choice label="Cartões" value={look.cards} onChange={(cards) => set({ cards })} options={[['tingido', 'Coloridos'], ['solido', 'Brancos'], ['contorno', 'Só contorno'], ['vidro', 'Vidro']]} />
        <Choice label="Cartões de atalho" value={look.tiles} onChange={(tiles) => set({ tiles })} options={[['degrade', 'Degradê vivo'], ['solido', 'Cor sólida'], ['claro', 'Claros']]} />
        <Choice label="Botões" value={look.buttons} onChange={(buttons) => set({ buttons })} options={[['arredondado', 'Arredondados'], ['pilula', 'Pílula'], ['reto', 'Retos']]} />
        <Choice label="Sombras" value={look.shadow} onChange={(shadow) => set({ shadow })} options={[['suave', 'Suaves'], ['forte', 'Fortes'], ['nenhuma', 'Sem sombra']]} />
        <Choice label="Espaçamento" value={look.density} onChange={(density) => set({ density })} options={[['compacto', 'Compacto'], ['normal', 'Normal'], ['amplo', 'Amplo']]} />
        <Choice label="Fonte" value={look.font} onChange={(font) => set({ font })} options={[['plex', 'Plex (padrão)'], ['sistema', 'Do aparelho'], ['arredondada', 'Arredondada'], ['serifada', 'Serifada'], ['mono', 'Monoespaçada']]} />
        <Choice label="Animações" value={look.motion} onChange={(motion) => set({ motion })} options={[['completo', 'Todas'], ['reduzido', 'Poucas'], ['nenhum', 'Nenhuma']]} />
        <Slider label="Arredondamento dos cartões" value={look.radius} min={4} max={32} step={2} unit=" px" onChange={(radius) => set({ radius })} />
        <Slider label="Espaço entre linhas do texto" value={look.leading} min={1.3} max={2} step={0.05} unit="" onChange={(leading) => set({ leading })} />
        <Slider label="Tamanho do texto das aulas" value={Math.round(prefs.fontScale * 100)} min={90} max={140} step={5} unit="%" onChange={(v) => setPrefs({ fontScale: v / 100 })} />
      </Section>

      <Section title="Guardar e compartilhar" hint="Copie o código da sua aparência para usar em outro aparelho, ou cole um código para aplicar.">
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-ghost flex-1"
            onClick={() => {
              const code = exportLook(look);
              setIo(code);
              void navigator.clipboard?.writeText(code).then(
                () => setIoMsg('Código copiado.'),
                () => setIoMsg('Código no campo abaixo: copie manualmente.'),
              );
            }}
          >
            Copiar minha aparência
          </button>
          <button
            type="button"
            className="btn-ghost flex-1"
            onClick={() => {
              const l = importLook(io);
              if (!l) return setIoMsg('Código inválido.');
              setPrefs({ look: l });
              setIoMsg('Aparência aplicada.');
            }}
          >
            Aplicar código colado
          </button>
        </div>
        <textarea value={io} onChange={(e) => setIo(e.target.value)} rows={2} className="input mt-2 font-mono text-xs" aria-label="Código da aparência" placeholder="Cole aqui um código de aparência" />
        {ioMsg && (
          <p className="mt-1 text-sm text-muted" role="status">
            {ioMsg}
          </p>
        )}
        <button type="button" className="btn-ghost mt-3 w-full text-bad" onClick={() => setPrefs({ look: DEFAULT_LOOK })}>
          Restaurar a aparência padrão
        </button>
      </Section>
    </div>
  );
}
