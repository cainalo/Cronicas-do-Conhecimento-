# Mobile e offline

## Hoje
- Layout mobile-first (testado em 390×844), navegação inferior, alvos ≥44px, área segura.
- `manifest.webmanifest` + ícone SVG → "Adicionar à tela inicial". **Sem service worker**: o app não abre sem rede (exceto se o navegador tiver cache).
- Dados de estudo já são local-first: respostas feitas offline (com o app aberto) ficam pendentes e sincronizam ao reconectar.

## Planejado
1. `vite-plugin-pwa` (Workbox) com precache do app e do conteúdo (o conteúdo está no bundle, então precache = download offline de tudo). Quando o conteúdo crescer, separar capítulos em chunks e oferecer "baixar grimório".
2. Ícones PNG 192/512 e maskable; tela de abertura.
3. Capacitor (Android primeiro): `npx cap add android`, build com `npm run build && npx cap sync`. Rotas usam BrowserRouter (compatível com Capacitor).
4. Testar abertura offline e sincronização após reconexão antes de declarar concluído.

## Publicação (GitHub Pages)
- Workflow `.github/workflows/pages.yml`: a cada push em `main` ou no branch de trabalho, roda testes, gera o build com `GITHUB_PAGES=true` (base `/Cronicas-do-Conhecimento-/`), copia `index.html` para `404.html` (fallback de SPA) e publica no branch `gh-pages`.
- Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/
- Configuração única feita pelo usuário: Settings → Pages → Source: *Deploy from a branch* → `gh-pages` / `(root)`.
- Supabase: definir Authentication → URL Configuration → Site URL (e Redirect URLs) com o endereço acima, para os links de confirmação e recuperação de senha voltarem ao app.
