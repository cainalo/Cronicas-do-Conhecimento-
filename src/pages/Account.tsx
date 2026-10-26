// Conta e ajustes (pacote v4, etapa 6): página de entrada organizada. Nada sensível fica exposto aqui
// (senha, sair, reinício): cada grupo leva a uma área secundária com destino e efeito reais.
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { supabase } from '@/lib/supabase';
import { isNative } from '@/app/native';
import { CHANNELS, normalizeMix } from '@/app/soundscape';
import { PageHeader } from '@/components/Page';
import { HubRow, useSoundPlaying } from './settings/common';

export function AccountPage() {
  const { session, sync, authReady } = useStudy();
  const { prefs } = usePrefs();
  const playing = useSoundPlaying();
  const sb = supabase;
  const on = CHANNELS.filter((c) => normalizeMix(prefs.sounds)[c.id].on).map((c) => c.name.toLowerCase());

  const who = !sb
    ? 'Estudando só neste aparelho'
    : !authReady
      ? 'Verificando sessão…'
      : session
        ? `Conectado como ${session.user.email}`
        : 'Modo visitante: entre para guardar o progresso na nuvem';
  const syncSummary = !sb
    ? 'Sem servidor nesta versão; tudo fica no aparelho'
    : !session
      ? 'Só neste aparelho até você entrar'
      : sync.state === 'offline'
        ? `Sem conexão · ${sync.pending} a enviar`
        : sync.state === 'error'
          ? 'Falha ao sincronizar; nova tentativa em breve'
          : sync.pending
            ? `${sync.pending} registros aguardando envio`
            : 'Tudo salvo no servidor';

  return (
    <div className="space-y-6">
      <PageHeader area="conta" crumb={false} title="Conta e ajustes" subtitle={who} />

      {!sb && (
        <section className="card space-y-2 p-4" aria-label="Modo local">
          <h2 className="text-base">Estudando só neste aparelho</h2>
          <p className="text-sm">
            Esta versão está sem ligação com o servidor de contas, então não há login agora. Nada se perde: todo o progresso fica guardado neste aparelho e a
            trilha continua de onde você parou.
          </p>
          <p className="text-sm text-muted">Para sincronizar entre aparelhos, use o site publicado ou o app Android, que têm o servidor configurado.</p>
        </section>
      )}

      <nav aria-label="Áreas da conta" className="space-y-5">
        <div className="ledger">
          <HubRow to="/conta/acesso" icon="cadeado" title="Conta e segurança" summary={session ? 'E-mail, trocar senha, sair' : 'Entrar, criar conta, recuperar senha'} testId="conta-acesso" />
          <HubRow to="/conta/sincronizacao" icon="nuvem" title="Offline e sincronização" summary={syncSummary} testId="conta-sync" />
        </div>
        <div className="ledger">
          <HubRow to="/conta/aparencia" icon="sol" title="Aparência e leitura" summary={`Tema ${prefs.theme === 'dark' ? 'escuro' : 'claro'} · texto ${Math.round(prefs.fontScale * 100)}%`} testId="conta-aparencia" />
          <HubRow to="/conta/sons" icon="balao" title="Som e concentração" summary={playing ? `Tocando: ${on.join(', ') || 'nada ligado'}` : on.length ? `Pronto: ${on.join(', ')}` : 'Chuva, riacho, ruídos e piano'} testId="conta-sons" />
          <HubRow to="/plano" icon="calendario" title="Preferências de estudo" summary="Minutos por dia, dias da semana e meta" />
          {isNative() && <HubRow to="/conta/tela" icon="tela" title="Tela" summary={prefs.immersive === false ? 'Barras do sistema visíveis' : 'Tela cheia durante o estudo'} />}
        </div>
        <div className="ledger">
          <HubRow to="/conta/dados" icon="dados" title="Dados e progresso" summary="Baixar uma cópia ou reiniciar o progresso" testId="conta-dados" />
          <HubRow to="/conta/sobre" icon="aviso" title="Ajuda e sobre" summary={isNative() ? 'Versão, como funciona, contato' : 'Versão, app Android, como funciona'} testId="conta-sobre" />
        </div>
      </nav>
    </div>
  );
}

export function traduz(m: string) {
  if (/invalid login credentials/i.test(m)) return 'E-mail ou senha incorretos.';
  if (/email not confirmed/i.test(m)) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
  if (/already registered/i.test(m)) return 'Este e-mail já tem conta. Use "Entrar".';
  if (/rate limit/i.test(m)) return 'Muitas tentativas. Aguarde alguns minutos.';
  if (/should be different/i.test(m)) return 'A nova senha precisa ser diferente da atual.';
  return m;
}
