import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from '@/components/Markdown';

describe('ênfase editorial dos materiais', () => {
  it('renderiza ++termos++ como sublinhado sem interpretar HTML arbitrário', () => {
    const { container } = render(<Markdown>O termo ++processo++ não é o mesmo que programa.</Markdown>);
    const underline = container.querySelector('u.term-underline');
    expect(underline).toHaveTextContent('processo');
    expect(container.querySelector('u')).toBeInTheDocument();
  });

  it('mantém o negrito do Markdown para a hierarquia de leitura', () => {
    const { container } = render(<Markdown>O **processador** executa instruções.</Markdown>);
    expect(container.querySelector('strong')).toHaveTextContent('processador');
  });
});
