// Acervo visual do feed do Crônicas do Conhecimento.
// Fotos editoriais usam URLs diretas do Unsplash e mantêm a licença/fonte documentadas.
// Duas ilustrações originais locais garantem variação sem depender da rede.
// Cada fonte é atribuída a uma única chave para evitar que cartões diferentes repitam a imagem.
import type { FeedImage } from '@/lib/feed';

const LICENSE = 'https://unsplash.com/license';
const image = (
  src: string,
  alt: string,
  credit: string,
  kind: 'photo' | 'illustration' = 'photo',
  sourceUrl = src,
  licenseUrl = LICENSE,
  license = 'Licença Unsplash',
): FeedImage => ({ src, alt, credit, kind, sourceUrl, licenseUrl, license });

export const feedImages: Record<string, FeedImage> = {
  // Ilustrações originais criadas para o projeto, guardadas localmente para funcionar sem internet.
  'prim.computador.1:abaco': image(
    '/images/feed/estudo-em-equipe.webp',
    'Ilustração editorial de pessoas estudando e trabalhando juntas',
    'Ilustração original do Crônicas do Conhecimento',
    'illustration',
    'https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/main/public/images/feed',
    'https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/main/public/images/feed',
    'Arte original do projeto',
  ),
  'mat.inteiros.1:reta': image(
    '/images/feed/planejamento-visual.webp',
    'Ilustração editorial de uma pessoa organizando anotações de estudo',
    'Ilustração original do Crônicas do Conhecimento',
    'illustration',
    'https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/main/public/images/feed',
    'https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/main/public/images/feed',
    'Arte original do projeto',
  ),
  'prim.computador.3:bit': image(
    'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=900&q=80',
    'Mãos usando um telefone e computador durante uma tarefa digital',
    'Foto editorial da comunidade Unsplash',
  ),

  // Fotos editoriais para posts profissionais. Não são retratos dos professores fictícios.
  'post:post.ps-top': image(
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    'Ambiente de desenvolvimento com computador portátil',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.kill': image(
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    'Pessoa usando um computador portátil durante o trabalho',
    'Foto de John Schnobrich via Unsplash',
  ),
  'post:post.nice': image(
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    'Mãos escrevendo em um caderno de anotações',
    'Foto de Aaron Burden via Unsplash',
  ),
  'post:post.fat32': image(
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'Detalhe de componentes eletrônicos de um circuito',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.uniq': image(
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80',
    'Anotações e lista de tarefas sobre uma mesa de trabalho',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.tcp-udp': image(
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    'Equipe trabalhando em computadores no ambiente profissional',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.hosts': image(
    'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80',
    'Agenda e anotações para organizar uma tarefa',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.waf': image(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    'Painel de análise de dados em uma tela',
    'Foto editorial da comunidade Unsplash',
  ),
  'post:post.paas': image(
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    'Colegas em reunião de trabalho colaborativo',
    'Foto editorial da comunidade Unsplash',
  ),
};

/** Retorna as chaves que, por engano, reutilizam a mesma fonte de imagem. */
export function duplicateFeedImageSources(images: Record<string, FeedImage> = feedImages): string[] {
  const ownerBySource = new Map<string, string>();
  const duplicates: string[] = [];
  for (const [key, value] of Object.entries(images)) {
    const previous = ownerBySource.get(value.src);
    if (previous) duplicates.push(previous + ' ↔ ' + key);
    else ownerBySource.set(value.src, key);
  }
  return duplicates;
}
