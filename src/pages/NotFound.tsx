// Endereço que não existe: fica dentro do app (cabeçalho, menu, tema), explica e oferece saída.
import { Link } from 'react-router-dom';
import { useCheckpoint } from '@/app/useCheckpoint';
import { Icon } from '@/components/Icon';

export function NotFoundPage() {
  const next = useCheckpoint();
  return (
    <section className="space-y-4" aria-label="Página não encontrada">
      <p className="kicker">Erro 404</p>
      <h1 className="text-2xl">Página não encontrada</h1>
      <p className="border-l-2 border-gold pl-3 text-sm text-muted">Este endereço não existe ou mudou. Seu progresso continua guardado.</p>
      <Link to={next.to} className="btn-primary w-full" data-testid="nao-encontrada-trilha">
        <Icon name="play" size={18} fill="currentColor" /> Voltar à trilha
      </Link>
      <div className="flex gap-2">
        <Link to="/estudos" className="btn-ghost flex-1">
          Abrir Estudos
        </Link>
        <Link to="/" className="btn-ghost flex-1">
          Ir para Hoje
        </Link>
      </div>
    </section>
  );
}
