import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider } from '@/app/prefs';
import { StudyProvider } from '@/app/StudyProvider';
import { AppRoutes } from '@/App';

vi.mock('@/lib/supabase', () => ({ supabase: null }));
beforeEach(() => localStorage.clear());

function renderAt(path = '/sala') {
  return render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
}

describe('Sala dos Professores — feed social', () => {
  it('exibe stories e permite avançar e fechar a sequência de cada professor', async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getAllByRole('button', { name: /Story/ })[0]);
    const story = screen.getByRole('dialog', { name: 'Stories de Professora Clara' });
    expect(story).toHaveTextContent('Uma questão de porcentagem');
    await user.click(within(story).getByRole('button', { name: 'Próximo story' }));
    expect(story).toHaveTextContent('explique a regra sem usar a fórmula');
    await user.click(within(story).getByRole('button', { name: 'Concluir' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('publica texto e persiste a publicação local depois de atualizar o estado', async () => {
    const user = userEvent.setup();
    const view = renderAt();
    await user.type(screen.getByPlaceholderText(/Uma dúvida, uma curiosidade/), 'Descobri uma coisa interessante sobre DNS.');
    await user.click(screen.getByRole('button', { name: 'Publicar' }));
    expect(screen.getByText('Descobri uma coisa interessante sobre DNS.')).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem('portico:sala-social:v1') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].body).toBe('Descobri uma coisa interessante sobre DNS.');
    view.unmount();
    renderAt();
    expect(screen.getByText('Descobri uma coisa interessante sobre DNS.')).toBeInTheDocument();
  });

  it('permite curtir e comentar um post de professor sem redirecionar para fora do feed', async () => {
    const user = userEvent.setup();
    renderAt();
    const post = screen.getAllByRole('article').find((article) => within(article).queryByRole('heading', { name: 'Foto ou vídeo?' }));
    expect(post).toBeTruthy();
    if (!post) throw new Error('Publicação editorial não encontrada no feed');
    const like = within(post).getByRole('button', { name: /Curtir/ });
    const before = Number(like.textContent?.match(/\d+/)?.[0] ?? 0);
    await user.click(like);
    expect(within(post).getByRole('button', { name: /Curtir/ })).toHaveTextContent(String(before + 1));
    await user.click(within(post).getByRole('button', { name: /Comentar/ }));
    await user.type(within(post).getByPlaceholderText('Escreva um comentário…'), 'Boa analogia!');
    await user.click(within(post).getByRole('button', { name: 'Enviar' }));
    expect(within(post).getByText('Boa analogia!')).toBeInTheDocument();
  });

  it('separa o feed social da sequência didática da trilha', () => {
    renderAt();
    expect(screen.getByRole('heading', { name: 'Sala dos Professores' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument();
    expect(screen.queryByTestId('feed-proximo')).not.toBeInTheDocument();
  });
  it('abre o perfil completo do professor a partir dos stories', async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getAllByRole('button', { name: /Story/ })[0]);
    await user.click(screen.getByRole('button', { name: 'Ver perfil e publicações de Clara' }));
    const profile = screen.getByRole('dialog', { name: 'Perfil de Professora Clara' });
    expect(profile).toHaveTextContent('@clara.numeros');
    expect(profile).toHaveTextContent('ESTILO E PRESENÇA');
    expect(profile).toHaveTextContent('Fora da sala de aula');
    expect(profile).toHaveTextContent('Publicações');
    await user.click(within(profile).getByRole('button', { name: 'Voltar ao feed' }));
    expect(screen.getByRole('heading', { name: 'Sala dos Professores' })).toBeInTheDocument();
  });

  it('publica um carrossel de fotos com vídeo do YouTube', async () => {
    const user = userEvent.setup();
    renderAt();
    await user.type(screen.getByPlaceholderText(/Uma dúvida, uma curiosidade/), 'Veja este material de estudo.');
    const files = [
      new File(['foto-a'], 'foto-a.png', { type: 'image/png' }),
      new File(['foto-b'], 'foto-b.png', { type: 'image/png' }),
    ];
    await user.upload(screen.getByLabelText('Adicionar até 3 fotos'), files);
    await user.type(screen.getByPlaceholderText('https://www.youtube.com/watch?v=…'), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await user.click(screen.getByRole('button', { name: 'Publicar' }));
    const stored = JSON.parse(localStorage.getItem('portico:sala-social:v1') ?? '[]');
    expect(stored[0].images).toHaveLength(2);
    expect(stored[0].videoUrl).toContain('dQw4w9WgXcQ');
    expect(screen.getByRole('button', { name: /Carregar o vídeo/ })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Próxima imagem do carrossel' }));
    expect(screen.getByText('2 de 2')).toBeInTheDocument();
  });

});
