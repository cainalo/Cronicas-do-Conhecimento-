import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { VideoEmbed } from '@/components/VideoEmbed';

describe('VideoEmbed', () => {
  it('carrega um arquivo MP4 somente depois do toque', () => {
    const url = 'https://example.supabase.co/storage/v1/object/public/lesson-videos/aula.mp4';
    const { container } = render(<VideoEmbed url={url} title="Aula do Pórtico" />);

    expect(container.querySelector('video')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Carregar o vídeo: Aula do Pórtico' }));

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video?.hasAttribute('controls')).toBe(true);
    expect(video?.querySelector('source')?.getAttribute('src')).toBe(url);
    expect(video?.querySelector('source')?.getAttribute('type')).toBe('video/mp4');
  });

  it('continua carregando vídeos do YouTube em iframe', () => {
    const { container } = render(<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Vídeo externo" />);
    fireEvent.click(screen.getByRole('button', { name: 'Carregar o vídeo: Vídeo externo' }));

    expect(container.querySelector('iframe')?.getAttribute('src')).toContain('/embed/dQw4w9WgXcQ');
  });
});
