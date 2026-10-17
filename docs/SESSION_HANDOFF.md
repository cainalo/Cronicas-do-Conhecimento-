# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (cap. 1 Criptografia) e Livro dos Autômatos (cap. 1 LLM/contexto/RAG; cap. 2 agentes/MCP/qualidade). 6 lições, 60 questões autorais. Cobertura 7/68 tópicos.
- Visual de livro medieval gótico (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- Fase D quase completa: simulados, estudos de caso (2) e flashcards, todos sincronizáveis (migração 2 aplicada, RLS verificado). Falta o planejador.
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 87/87; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
1. **PWA offline** (Fase G, prioridade porque o usuário só usa o celular): instalar `vite-plugin-pwa`, gerar service worker com precache do app e das fontes (o conteúdo está no bundle), ícones PNG 192/512 e maskable gerados do `public/icon.svg`; respeitar o `base` do GitHub Pages; testar com Playwright em modo offline (`context.setOffline(true)`) abrindo o leitor após um primeiro carregamento. Registrar em `docs/MOBILE_AND_OFFLINE.md`.
2. **Planejador de estudos** (fecha a Fase D): disponibilidade diária em minutos, distribuição de leitura/lições/revisões/flashcards/discursiva até 17/01/2027, sem apagar o histórico ao replanejar.
3. **Grimório de Desenvolvimento de Sistemas** (`src/content/grimoires/dev/`, cap. 1 APIs REST/GraphQL/WebSockets, OAuth 2.0, OIDC, JWT; `binding: 'noite'`).
