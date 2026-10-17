# Mobile e offline

## Hoje
- Layout mobile-first (testado em 390×844), navegação inferior, alvos ≥ 44px, área segura.
- **PWA com `vite-plugin-pwa` (Workbox, `registerType: autoUpdate`)**: manifesto gerado no build, ícones PNG 192/512, maskable e apple-touch (gerados de `public/icon.svg` com Chromium), service worker com precache de JS, CSS, HTML, fontes e ícones (≈ 38 itens, 1,5 MB) e `navigateFallback` para rotas do SPA.
- Como todo o conteúdo dos grimórios está no bundle, o primeiro acesso já deixa **todos os grimórios, lições, questões, flashcards e estudos de caso disponíveis offline**. Quando o conteúdo crescer muito, separar capítulos em chunks e oferecer "baixar grimório" (planejado).
- Dados de estudo são local-first: respostas, leitura, simulados, discursivas e cartões feitos offline ficam pendentes e sincronizam ao reconectar (evento `online`).
- **Testado** (Playwright/Chromium, 17/10/2026): após o primeiro carregamento, com a rede desligada, abriram o capítulo `cap.ia.02` com fontes e a lição `lic.ia.01.a`, e uma resposta foi gravada localmente. A sincronização após reconexão com o Supabase real não pôde ser testada no container (rede bloqueada).

## Planejado
1. Indicador "disponível offline" e botão para baixar grimórios quando houver divisão em chunks.
2. Capacitor (Android primeiro): `npx cap add android`, `npm run build && npx cap sync`. As rotas usam BrowserRouter (compatível).
3. Notificações opcionais de lembrete (exigem decisão do usuário).

## Publicação (GitHub Pages)
- Workflow `.github/workflows/pages.yml`: a cada push em `main` ou no branch de trabalho, roda testes, gera o build com `GITHUB_PAGES=true` (base `/Cronicas-do-Conhecimento-/`), copia `index.html` para `404.html` (fallback de SPA) e publica no branch `gh-pages`.
- Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/
- Configuração única feita pelo usuário: Settings → Pages → Source: *Deploy from a branch* → `gh-pages` / `(root)`.
- Supabase: definir Authentication → URL Configuration → Site URL (e Redirect URLs) com o endereço acima, para os links de confirmação e recuperação de senha voltarem ao app.
