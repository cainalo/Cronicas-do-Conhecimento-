// Endereço que não existe: fica dentro do app (cabeçalho, menu, tema), explica e oferece saída.
import { Link } from 'react-router-dom';
import { useCheckpoint } from '@/app/useCheckpoint';
import { Icon } from '@/components/Icon';
import { MascotSays } from '@/components/Mascot';

export function NotFoundPage() {
  const next = useCheckpoint();
  return (
    <section className="space-y-4" aria-label="Página não encontrada">
      <h1 className="text-2xl">Este corredor não existe</h1>
      <MascotSays mood="think" size={72}>
        Procurei em todas as estantes do Arquivo e não achei esta página. Talvez o endereço tenha mudado ou esteja incompleto. Seu progresso continua guardado.
      </MascotSays>
      <Link to={next.to} className="btn-primary w-full" data-testid="nao-encontrada-trilha">
        <Icon name="play" size={18} fill="currentColor" /> Voltar à trilha
      </Link>
      <div className="flex gap-2">
        <Link to="/estudos" className="btn-ghost flex-1">
          Abrir Estudos
        </Link>
        <Link to="/" className="btn-ghost flex-1">
          Ir à Torre
        </Link>
      </div>
    </section>
  );
}
