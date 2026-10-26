// Fotos reais para o feed (decisão do usuário em 25/10/2026): só de acervo livre (Wikimedia Commons,
// domínio público ou licença livre), sempre com autor, licença e link da fonte, conferidos na página
// do arquivo. A chave é "<id da aula>:<id da etapa>". Vazio enquanto a rede do ambiente bloqueia a
// Wikimedia: nenhuma foto entra sem a licença conferida.
import type { FeedImage } from '@/lib/feed';

export const realImages: Record<string, FeedImage> = {};
