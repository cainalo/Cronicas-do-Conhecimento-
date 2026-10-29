import { describe, expect, it, vi } from 'vitest';
import { returnToPreviousPage } from '@/lib/navigation';

describe('retorno à página de origem', () => {
  it('volta ao histórico real quando a página foi aberta por navegação interna', () => {
    const navigate = vi.fn();
    returnToPreviousPage(navigate, 'entry-2', '/trilha');
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('usa um destino seguro quando a atividade foi aberta diretamente', () => {
    const navigate = vi.fn();
    returnToPreviousPage(navigate, 'default', '/trilha');
    expect(navigate).toHaveBeenCalledWith('/trilha', { replace: true });
  });
});
