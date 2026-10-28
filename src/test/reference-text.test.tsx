import { fireEvent, render, screen } from '@testing-library/react';
import { ReferenceText } from '@/components/ReferenceText';

describe('texto completo de referência nas aulas', () => {
  it('mostra o conteúdo integral da seção em formato editorial no Aprender', () => {
    render(<ReferenceText chapterId="cap.prim.01" sectionId="computador" mode="inline" defaultOpen />);
    const reference = screen.getByTestId('learn-reference-text');
    expect(reference).toHaveTextContent(/Texto completo de referência/i);
    expect(reference).toHaveTextContent(/Blaise Pascal/i);
    expect(reference).toHaveTextContent(/Ábaco/i);
    expect(reference.querySelector('.reference-reading')).toBeInTheDocument();
  });

  it('abre a leitura integral sobre a aula e pode ser fechada', () => {
    render(<ReferenceText chapterId="cap.prim.01" sectionId="computador" mode="drawer" />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir texto completo de referência' }));
    const dialog = screen.getByRole('dialog', { name: /Texto completo de referência/i });
    expect(dialog).toHaveTextContent(/transistor/i);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar texto de referência' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
