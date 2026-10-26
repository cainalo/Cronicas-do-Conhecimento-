// Tela (só no app Android): modo imersivo, ligado por padrão. A escolha vale já na próxima abertura,
// porque o app guarda também nas preferências nativas.
import { useState } from 'react';
import { usePrefs } from '@/app/prefs';
import { isNative, setImmersive } from '@/app/native';
import { SettingsPage, Switch } from './common';

export function ScreenPage() {
  const { prefs, setPrefs } = usePrefs();
  const [err, setErr] = useState(false);
  const on = prefs.immersive !== false;
  return (
    <SettingsPage title="Tela" subtitle="Como o app ocupa a tela do celular">
      {isNative() ? (
        <section className="card space-y-3 p-4">
          <Switch
            label="Tela cheia durante o estudo"
            sub="Esconde a barra de status e a barra de navegação. Deslize a partir da borda de cima ou de baixo para vê-las por alguns instantes."
            checked={on}
            onChange={async (v) => {
              setPrefs({ immersive: v });
              setErr(!(await setImmersive(v)));
            }}
          />
          {err && <p className="text-sm text-bad">Não foi possível mudar agora. Feche e abra o app para tentar de novo.</p>}
        </section>
      ) : (
        <p className="card p-4 text-sm">No navegador, quem controla as barras do sistema é o próprio navegador. A tela cheia é um recurso do app Android.</p>
      )}
    </SettingsPage>
  );
}
