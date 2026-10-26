// Offline e sincronização: o que está no aparelho, o que falta enviar e a última sincronização.
import { Link } from 'react-router-dom';
import { useStudy } from '@/app/StudyProvider';
import { supabase } from '@/lib/supabase';
import { SettingsPage } from './common';

export function SyncPage() {
  const { session, sync, syncNow } = useStudy();
  const online = typeof navigator === 'undefined' || navigator.onLine;
  const text = {
    local: 'Modo visitante: o progresso fica só neste aparelho.',
    idle: sync.pending ? `Registros aguardando envio: ${sync.pending}.` : 'Tudo salvo no servidor.',
    syncing: 'Sincronizando…',
    offline: `Sem conexão. Registros a enviar quando ela voltar: ${sync.pending}.`,
    error: `Falha ao sincronizar: ${sync.error ?? ''}`,
  }[sync.state];

  return (
    <SettingsPage title="Offline e sincronização" subtitle="Onde o seu progresso está guardado">
      <section className="card space-y-2 p-4" aria-live="polite">
        <p className="font-semibold">{online ? 'Com conexão' : 'Sem conexão agora'}</p>
        <p className="text-sm">{!supabase ? 'Esta versão não tem servidor: tudo fica neste aparelho.' : text}</p>
        {sync.lastSyncAt && <p className="text-xs text-muted">Última sincronização: {new Date(sync.lastSyncAt).toLocaleString('pt-BR')}</p>}
        {supabase && session && (
          <button className="btn-ghost w-full" onClick={() => void syncNow()} disabled={sync.state === 'syncing' || !online}>
            Sincronizar agora
          </button>
        )}
        {supabase && !session && (
          <Link to="/conta/acesso" className="btn-primary w-full">
            Entrar para sincronizar
          </Link>
        )}
      </section>
      <section className="space-y-2 text-sm">
        <h2 className="text-base">Como funciona</h2>
        <p>Tudo o que você faz fica salvo primeiro neste aparelho, com uma cópia de segurança. Dá para estudar sem internet.</p>
        <p>Com a conta conectada, os registros sobem sozinhos quando há conexão: ao abrir o app, ao voltar a internet e logo depois de cada atividade.</p>
        <p className="text-muted">Aulas, questões e textos funcionam sem conexão. Videoaulas do YouTube precisam de internet.</p>
      </section>
    </SettingsPage>
  );
}
