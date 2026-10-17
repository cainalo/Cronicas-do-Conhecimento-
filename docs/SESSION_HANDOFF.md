# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (cap. 1 Criptografia) e Livro dos Autômatos (cap. 1 LLM/contexto/RAG; cap. 2 agentes/MCP/qualidade). 6 lições, 60 questões autorais. Cobertura 7/68 tópicos.
- Visual de livro medieval gótico (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- Fase D completa: simulados, estudos de caso (2), flashcards e planejador, todos sincronizáveis (migrações 2 e 3 aplicadas, RLS verificado). PWA offline testado.
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 92/92; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
1. **Grimório de Desenvolvimento de Sistemas** (5 questões): `src/content/grimoires/dev/`, mesmo formato dos outros (`binding: 'noite'`, `sigil: 'grimorio'`). Cap. 1: APIs REST, GraphQL, WebSockets, JSON/XML, OpenAPI; OAuth 2.0, OpenID Connect, JWT (tópicos `ti.dev.apis`, `ti.dev.auth`). ~20 questões, 2 lições, glossário (vira flashcards automaticamente). Um estudo de caso em `src/content/discursivas/tce-go-2026.ts`. Verificar com `npm test` e atualizar `CONTENT_COVERAGE.md`.
2. Seguir a ordem de prioridade de conteúdo de `CONTENT_COVERAGE.md` (SO/Redes/Nuvem, Segurança restante, Banco de Dados...).
3. Fase E (gamificação: missões e conquistas ligadas ao estudo real) e rodada de perguntas criativas de `OPEN_QUESTIONS.md` antes da narrativa.
