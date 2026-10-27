import { screen, waitFor } from '@testing-library/react';

/**
 * AppRoutes usa React.lazy nas rotas secundárias. Testes de fluxo precisam esperar
 * o módulo da rota ser resolvido antes de consultar controles de forma síncrona.
 * Isso mantém os testes alinhados com o ciclo real de renderização sem sleeps fixos.
 */
export async function waitForRouteReady(): Promise<void> {
  await waitFor(() => {
    expect(screen.queryByText(/Carregando esta área/)).not.toBeInTheDocument();
  });
}
