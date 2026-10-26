// Dados e progresso: baixar uma cópia e reiniciar todo o progresso de estudos (pacote v4, etapa 7).
// O reinício exige confirmação deliberada; cancelar não muda nada. O resultado diz a verdade sobre o
// servidor: confirmado, pendente (sem conexão) ou só no aparelho (visitante).
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useStudy, type ResetOutcome } from '@/app/StudyProvider';
import { RESET_SCOPE } from '@/lib/reset';
import { Icon } from '@/components/Icon';
import { SettingsPage } from './common';

const OUTCOME: Record<ResetOutcome, string> = {
  synced: 'Progresso reiniciado neste aparelho e na sua conta.',
  pending:
    'Progresso reiniciado neste aparelho. O servidor ainda não confirmou: o reinício será enviado assim que houver conexão, e o progresso antigo não volta.',
  local: 'Progresso reiniciado neste aparelho.',
};

export function DataPage() {
  const { data, session } = useStudy();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<ResetOutcome>();

  const download = () => {
    const { pending: _p, ...rest } = data;
    void _p;
    const blob = new Blob([JSON.stringify(rest, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cronicas-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <SettingsPage title="Dados e progresso" subtitle="Seu histórico de estudo">
      <section className="card space-y-2 p-4">
        <h2 className="text-base">Cópia dos seus dados</h2>
        <p className="text-sm">Um arquivo com suas respostas, leituras, revisões e anotações de estudo, para guardar onde quiser.</p>
        <button className="btn-ghost w-full" onClick={download}>
          <Icon name="download" size={16} /> Baixar cópia (JSON)
        </button>
      </section>

      <section className="card space-y-2 border-bad/40 p-4" aria-labelledby="reset-h">
        <h2 id="reset-h" className="text-base">
          Recomeçar do zero
        </h2>
        <p className="text-sm">Volta a trilha ao começo, como se fosse o primeiro dia. Sua conta, aparência e anotações continuam.</p>
        {data.progressResetAt && <p className="text-xs text-muted">Último reinício: {new Date(data.progressResetAt).toLocaleString('pt-BR')}</p>}
        <button className="btn-ghost w-full text-bad" onClick={() => (setDone(undefined), setOpen(true))} data-testid="abrir-reinicio">
          Reiniciar todo o progresso de estudos
        </button>
      </section>

      {done && (
        <section role="status" className="card space-y-3 border-ok/50 p-4">
          <p className="text-sm">{OUTCOME[done]}</p>
          <Link to="/" className="btn-primary w-full" data-testid="comecar-inicio">
            Começar do início <Icon name="seta" size={16} />
          </Link>
        </section>
      )}

      {open && <ResetDialog loggedIn={!!session} onClose={() => setOpen(false)} onDone={(o) => (setOpen(false), setDone(o))} />}
    </SettingsPage>
  );
}

function ResetDialog({ loggedIn, onClose, onDone }: { loggedIn: boolean; onClose: () => void; onDone: (o: ResetOutcome) => void }) {
  const { resetAll } = useStudy();
  const [sure, setSure] = useState(false);
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const offline = typeof navigator !== 'undefined' && !navigator.onLine;

  useEffect(() => {
    box.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [busy, onClose]);

  // Portal no body: a página tem animação com transform, que prenderia o fixed dentro dela.
  return createPortal(
    <div className="fixed inset-0 z-[80] grid place-items-end bg-ink/40 sm:place-items-center" onClick={() => !busy && onClose()}>
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[var(--radius-card)] bg-surface p-5 shadow-xl sm:rounded-[var(--radius-card)]"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="reset-title" className="text-[1.35rem]">
          Reiniciar todo o progresso?
        </h2>
        <p className="mt-1 text-sm text-muted">A trilha volta ao começo. O conteúdo e os pré-requisitos continuam iguais.</p>
        <h3 className="mt-4 text-sm font-semibold">Volta ao zero</h3>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
          {RESET_SCOPE.clears.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h3 className="mt-3 text-sm font-semibold">Continua como está</h3>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
          {RESET_SCOPE.keeps.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          {loggedIn
            ? offline
              ? 'Você está sem conexão. O reinício vale já neste aparelho e é enviado à conta quando a conexão voltar; o progresso antigo não volta.'
              : 'Vale para todos os aparelhos da conta. O histórico antigo deixa de contar, mas não é apagado do servidor.'
            : 'Vale para este aparelho.'}{' '}
          Antes, uma cópia de segurança fica guardada no aparelho.
        </p>
        <label className="mt-4 flex items-start gap-3 rounded-[var(--radius-control)] border border-line p-3 text-sm">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[rgb(var(--bad))]" checked={sure} onChange={(e) => setSure(e.target.checked)} data-testid="reinicio-confirmo" />
          <span>Entendi que meu progresso de estudos volta ao começo.</span>
        </label>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row">
          <button className="btn-ghost flex-1" onClick={onClose} disabled={busy} data-autofocus>
            Cancelar
          </button>
          <button
            className="btn-primary flex-1 !bg-bad !text-white disabled:opacity-40"
            disabled={!sure || busy}
            data-testid="reinicio-confirmar"
            onClick={async () => {
              setBusy(true);
              const o = await resetAll();
              setBusy(false);
              onDone(o);
            }}
          >
            {busy ? 'Reiniciando…' : 'Reiniciar progresso'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
