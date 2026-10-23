// Versão em texto da cena: serve de alternativa acessível à cena 3D (leitor de tela, movimento
// reduzido, aparelho sem WebGL ou conexão lenta). Mostra quem fala, o que faz e o enquadramento.
import type { SceneBeat } from '@/content/types';

const SHOT: Record<SceneBeat['shot'], string> = { geral: 'Plano geral', dupla: 'Dois personagens', close: 'Close', objeto: 'Detalhe' };

export function SceneTranscript({ beats, color }: { beats: SceneBeat[]; color: (who: string) => string }) {
  return (
    <ol className="space-y-2 rounded-3xl bg-[#141817] p-4 text-[#ece7da]" aria-label="Transcrição da cena">
      {beats.map((b, i) => (
        <li key={i} className="rounded-2xl bg-white/5 p-3">
          <p className="text-[0.7rem] font-semibold opacity-60">{SHOT[b.shot]}</p>
          {b.who === 'Narração' ? (
            <p className="italic opacity-90">{b.text}</p>
          ) : (
            <p>
              <b style={{ color: `color-mix(in srgb, ${color(b.who)} 55%, white)` }}>{b.who}:</b> {b.text}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
