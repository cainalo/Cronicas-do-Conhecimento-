// Conta e segurança: entrar, criar conta, recuperar; com sessão, e-mail, troca de senha e sair.
// A senha nunca é mostrada nem guardada: o campo é limpo depois de cada envio.
import { useState, type FormEvent } from 'react';
import { useStudy } from '@/app/StudyProvider';
import { supabase } from '@/lib/supabase';
import { PUBLIC_SITE, isNative } from '@/app/native';
import { traduz } from '../Account';
import { SettingsPage } from './common';

const authRedirect = () => (isNative() ? `${PUBLIC_SITE}conta` : `${location.origin}${import.meta.env.BASE_URL}conta`);
type Mode = 'entrar' | 'criar' | 'recuperar';

export function AccessPage() {
  const { session, sync, authReady } = useStudy();
  const sb = supabase;
  const [mode, setMode] = useState<Mode>('entrar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [msg, setMsg] = useState<{ t: string; ok: boolean }>();
  const [busy, setBusy] = useState(false);

  const run = async (f: () => Promise<{ error: { message: string } | null }>, okMsg: string) => {
    setBusy(true);
    setMsg(undefined);
    const { error } = await f();
    setBusy(false);
    setPassword('');
    setMsg(error ? { t: traduz(error.message), ok: false } : { t: okMsg, ok: true });
    return !error;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!sb) return;
    if (mode === 'entrar') void run(() => sb.auth.signInWithPassword({ email, password }), 'Bem-vindo de volta!');
    if (mode === 'criar')
      void run(() => sb.auth.signUp({ email, password, options: { emailRedirectTo: authRedirect() } }), 'Conta criada. Se for pedido, confirme pelo link enviado ao seu e-mail e depois entre.');
    if (mode === 'recuperar')
      void run(() => sb.auth.resetPasswordForEmail(email, { redirectTo: authRedirect() }), 'Se o e-mail estiver cadastrado, você receberá um link. Ao abri-lo, defina a nova senha em Conta e segurança.');
  };

  return (
    <SettingsPage title="Conta e segurança" subtitle={session ? 'Sua sessão e sua senha' : 'Entre para guardar o progresso na nuvem'}>
      {!sb ? (
        <p className="card p-4 text-sm">Esta versão está sem servidor de contas. O progresso fica guardado neste aparelho.</p>
      ) : !authReady ? (
        <p className="text-muted">Verificando sessão…</p>
      ) : session ? (
        <>
          <section className="card space-y-1 p-4">
            <p className="text-sm text-muted">E-mail da conta</p>
            <p className="break-all font-semibold">{session.user.email}</p>
          </section>
          <section className="card space-y-3 p-4">
            <h2 className="text-base">Senha</h2>
            {!changing ? (
              <button className="btn-ghost w-full" onClick={() => setChanging(true)}>
                Trocar senha
              </button>
            ) : (
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void run(() => sb.auth.updateUser({ password }), 'Senha alterada.').then((ok) => ok && setChanging(false));
                }}
              >
                <label className="block text-sm text-muted" htmlFor="newpass">
                  Nova senha (mínimo de 8 caracteres)
                </label>
                <input id="newpass" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="input" autoComplete="new-password" />
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost flex-1" onClick={() => (setChanging(false), setPassword(''))}>
                    Cancelar
                  </button>
                  <button className="btn-primary flex-1" disabled={busy}>
                    Salvar nova senha
                  </button>
                </div>
              </form>
            )}
            <p className="text-xs text-muted">Esqueceu a senha? Saia e use Recuperar na tela de entrada.</p>
          </section>
          <button
            className="btn-ghost w-full text-bad"
            onClick={async () => {
              if (
                sync.pending &&
                !confirm(`Ainda há registros não enviados (${sync.pending}). Eles continuarão guardados neste aparelho para quando você entrar de novo. Sair mesmo assim?`)
              )
                return;
              await sb.auth.signOut();
            }}
          >
            Sair da conta
          </button>
        </>
      ) : (
        <section className="card p-4">
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-raised p-1 text-sm" role="tablist">
            {(['entrar', 'criar', 'recuperar'] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                className={`rounded-full py-2 text-sm font-semibold transition ${mode === m ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
                onClick={() => setMode(m)}
                type="button"
              >
                {{ entrar: 'Entrar', criar: 'Criar conta', recuperar: 'Recuperar' }[m]}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input type="email" required placeholder="E-mail" aria-label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="input" autoComplete="email" />
            {mode !== 'recuperar' && (
              <input
                type="password"
                required
                minLength={8}
                placeholder="Senha (mín. 8 caracteres)"
                aria-label="Senha"
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
      {msg && (
        <p role="status" className={`rounded-xl border p-3 text-sm ${msg.ok ? 'border-ok/50 text-ok' : 'border-bad/50 text-bad'}`}>
          {msg.t}
        </p>
      )}
    </SettingsPage>
  );
}
