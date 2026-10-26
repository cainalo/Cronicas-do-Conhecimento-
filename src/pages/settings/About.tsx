// Ajuda e sobre: versão, o app Android e como o estudo funciona. Sem prometer suporte que não existe.
import { Link } from 'react-router-dom';
import { isNative } from '@/app/native';
import { AppDownload } from '@/components/AppDownload';
import pkg from '../../../package.json';
import { SettingsPage } from './common';

export function AboutPage() {
  return (
    <SettingsPage title="Ajuda e sobre" subtitle="Versão e como o estudo funciona">
      <section className="card space-y-1 p-4">
        <p className="font-semibold">Crônicas do Conhecimento</p>
        <p className="text-sm text-muted">
          Versão {pkg.version} · {isNative() ? 'app Android' : 'site'}
        </p>
      </section>
      {!isNative() && <AppDownload />}
      <section className="space-y-2 text-sm">
        <h2 className="text-base">Como funciona</h2>
        <p>A trilha segue a ordem do edital: cada aula ensina do zero, com exemplos e checagens curtas, e depois vem a prática com questões comentadas.</p>
        <p>As questões são autorais, a não ser quando a origem está indicada. O que ainda não foi conferido com o edital oficial aparece marcado.</p>
      </section>
      <div className="ledger">
        <Link to="/edital" className="ledger-row">
          Edital e cobertura do conteúdo
        </Link>
        <Link to="/progresso" className="ledger-row">
          Como o domínio é calculado
        </Link>
        <Link to="/conta/sincronizacao" className="ledger-row">
          Estudar sem internet
        </Link>
      </div>
    </SettingsPage>
  );
}
