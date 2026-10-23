import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityView } from '@/components/activities/ActivityView';
import type { MissionActivity } from '@/lib/activities';

const order: MissionActivity = { kind: 'order', id: 'o', prompt: 'Ordene', items: ['A', 'B', 'C'], why: 'Porque sim.' };
const sort: MissionActivity = { kind: 'sort', id: 's', prompt: 'Classifique', categories: ['X', 'Y'], items: [{ text: 'um', cat: 0, why: 'é X' }, { text: 'dois', cat: 1, why: 'é Y' }] };
const multi: MissionActivity = {
  kind: 'multi',
  id: 'm',
  prompt: 'Marque',
  options: [{ text: 'certa', correct: true, why: 'sim' }, { text: 'errada', correct: false, why: 'não' }],
  variant: { kind: 'tf', id: 'v', prompt: 'outra', answer: true, why: 'w' },
};

describe('componentes de atividade', () => {
  it('ordenar com botões de subir e descer, corrigindo por posição', async () => {
    const user = userEvent.setup();
    const next = vi.fn();
    render(<ActivityView a={order} onNext={next} />);
    const items = () => screen.getAllByRole('listitem').map((li) => li.textContent?.charAt(1));
    // Leva cada item para o lugar certo usando só os botões (acessível por teclado).
    for (const t of ['A', 'B']) {
      while (items().indexOf(t) > ['A', 'B'].indexOf(t)) await user.click(screen.getByRole('button', { name: `Subir "${t}"` }));
    }
    await user.click(screen.getByRole('button', { name: 'Verificar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Correto');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(next).toHaveBeenCalledWith({ ok: true });
  });
  it('classificar exige todos os cartões e explica o erro', async () => {
    const user = userEvent.setup();
    render(<ActivityView a={sort} onNext={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Verificar' })).toBeDisabled();
    await user.click(screen.getAllByRole('button', { name: 'X' })[0]);
    await user.click(screen.getAllByRole('button', { name: 'X' })[1]);
    await user.click(screen.getByRole('button', { name: 'Verificar' }));
    expect(screen.getByRole('status')).toHaveTextContent('é Y');
  });
  it('depois de um erro oferece uma atividade parecida', async () => {
    const user = userEvent.setup();
    const next = vi.fn();
    render(<ActivityView a={multi} onNext={next} />);
    await user.click(screen.getByRole('button', { name: /errada/ }));
    await user.click(screen.getByRole('button', { name: 'Verificar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Ainda não');
    await user.click(screen.getByRole('button', { name: 'Tentar uma parecida' }));
    expect(next).toHaveBeenCalledWith({ ok: false, retry: multi.kind === 'multi' ? multi.variant : undefined });
  });
});
