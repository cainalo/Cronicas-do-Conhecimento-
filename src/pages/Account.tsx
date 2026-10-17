import { useState, type FormEvent } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { usePrefs } from '@/app/prefs';
import { supabase } from '@/lib/supabase';
import { AppDownload } from '@/components/AppDownload';
import { PUBLIC_SITE, isNative } from '@/app/native';

// No app nativo os links do e-mail abrem o site público; no navegador, a própria página.
const authRedirect = () => (isNative() ? `${PUBLIC_SITE}conta` : `${location.origin}${import.meta.env.BASE_URL}conta`);
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/Page';

type Mode = 'entrar' | 'criar' | 'recuperar';

export function AccountPage() {
  const { session, sync, syncNow, authReady } = useStudy();
  const { prefs, setPrefs } = usePrefs();
  const [mode, setMode] = useState<Mode>('entrar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<{ t: string; ok: boolean }>();
  const [busy, setBusy] = useState(false);

  if (!supabase) return <p>Backend não configurado. O progresso fica apenas neste aparelho.</p>;
  const sb = supabase;

  const run = async (f: () => Promise<{ error: { message: string } | null }>, okMsg: string) => {
    setBusy(true);
    setMsg(undefined);
    const { error } = await f();
    setBusy(false);
    setMsg(error ? { t: traduz(error.message), ok: false } : { t: okMsg, ok: true });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'entrar') void run(() => sb.auth.signInWithPassword({ email, password }), 'Bem-vindo de volta!');
    if (mode === 'criar')
      void run(
        () => sb.auth.signUp({ email, password, options: { emailRedirectTo: authRedirect() } }),
        'Conta criada. Se for pedido, confirme pelo link enviado ao seu e-mail e depois entre.',
      );
    if (mode === 'recuperar')
      void run(
        () => sb.auth.resetPasswordForEmail(email, { redirectTo: authRedirect() }),
        'Se o e-mail estiver cadastrado, você receberá um link. Ao abri-lo, defina a nova senha nesta tela.',
      );
  };

  const syncText = {
    local: 'Modo visitante: progresso só neste aparelho.',
    idle: sync.pending ? `Registros aguardando envio: ${sync.pending}.` : 'Tudo salvo no servidor.',
    syncing: 'Sincronizando…',
    offline: `Sem conexão. Registros a enviar quando ela voltar: ${sync.pending}.`,
    error: `Falha ao sincronizar: ${sync.error ?? ''}`,
  }[sync.state];

  return (
    <div className="space-y-5">
      <PageHeader area="conta" crumb={false} title="Conta" subtitle="Login, sincronização, aparência e o app Android" />

      {!authReady ? (
        <p className="text-muted">Verificando sessão…</p>
      ) : session ? (
        <section className="card space-y-3 p-4">
          <p>
            Conectado como <b>{session.user.email}</b>
          </p>
          <p className="text-sm text-muted">{syncText}</p>
          {sync.lastSyncAt && <p className="text-xs text-muted">Última sincronização: {new Date(sync.lastSyncAt).toLocaleString('pt-BR')}</p>}
          <button className="btn-ghost w-full" onClick={() => void syncNow()} disabled={sync.state === 'syncing'}>
            Sincronizar agora
          </button>
          <form
            className="space-y-2 border-t border-line pt-3"
            onSubmit={(e) => {
              e.preventDefault();
              void run(() => sb.auth.updateUser({ password }), 'Senha alterada.');
            }}
          >
            <label className="block text-sm text-muted" htmlFor="newpass">
              Definir nova senha
            </label>
            <input id="newpass" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="input" autoComplete="new-password" />
            <button className="btn-ghost w-full" disabled={busy}>
              Salvar senha
            </button>
          </form>
          <button
            className="btn-ghost w-full text-bad"
            onClick={async () => {
              if (sync.pending && !confirm(`Ainda há registros não enviados (${sync.pending}). Eles continuarão guardados neste aparelho para quando você entrar de novo. Sair mesmo assim?`)) return;
              await sb.auth.signOut();
            }}
          >
            Sair
          </button>
        </section>
      ) : (
        <section className="card p-4">
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-raised p-1 text-sm">
            {(['entrar', 'criar', 'recuperar'] as Mode[]).map((m) => (
              <button key={m} className={`rounded-full py-2 text-sm font-semibold transition ${mode === m ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`} onClick={() => setMode(m)} type="button">
                {{ entrar: 'Entrar', criar: 'Criar conta', recuperar: 'Recuperar' }[m]}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="input" autoComplete="email" />
            {mode !== 'recuperar' && (
              <input
                type="password"
                required
                minLength={8}
                placeholder="Senha (mín. 8 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                autoComplete={mode === 'criar' ? 'new-password' : 'current-password'}
              />
            )}
            <button className="btn-primary w-full" disabled={busy}>
              {{ entrar: 'Entrar', criar: 'Criar conta', recuperar: 'Enviar link de recuperação' }[mode]}
            </button>
          </form>
          <p className="mt-3 text-xs text-muted">O progresso feito como visitante neste aparelho é levado para a conta ao entrar.</p>
        </section>
      )}

      {msg && <p className={`rounded-xl border p-3 text-sm ${msg.ok ? 'border-ok/50 text-ok' : 'border-bad/50 text-bad'}`}>{msg.t}</p>}

      <AppDownload />

      <section className="card space-y-2 p-4">
        <h2 className="text-base">Aparência</h2>
        <div className="flex gap-2">
          <button className={prefs.theme === 'dark' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} onClick={() => setPrefs({ theme: 'dark' })}>
            <Icon name="lua" size={18} /> Escuro
          </button>
          <button className={prefs.theme === 'light' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} onClick={() => setPrefs({ theme: 'light' })}>
            <Icon name="sol" size={18} /> Claro
          </button>
        </div>
      </section>
    </div>
  );
}

function traduz(m: string) {
  if (/invalid login credentials/i.test(m)) return 'E-mail ou senha incorretos.';
  if (/email not confirmed/i.test(m)) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
  if (/already registered/i.test(m)) return 'Este e-mail já tem conta. Use "Entrar".';
  if (/rate limit/i.test(m)) return 'Muitas tentativas. Aguarde alguns minutos.';
  return m;
}
