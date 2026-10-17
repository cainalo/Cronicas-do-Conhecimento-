# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (cap. 1 Criptografia) e Livro dos Autômatos (cap. 1 LLM/contexto/RAG; cap. 2 agentes/MCP/qualidade). 6 lições, 60 questões autorais. Cobertura 7/68 tópicos.
- Visual sem "cara de IA" (regras em `docs/DESIGN_SYSTEM.md`, seção Anti-padrões).
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 77/77; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
**Grimório de Desenvolvimento de Sistemas** (5 questões), em `src/content/grimoires/dev/`, mesmo formato dos outros (seções `.md` com `?raw`, `index.ts` com `sigil`, `questions-capNN.ts`, `lessons.ts`; registrar em `src/content/index.ts`).
- Cap. 1 sugerido: "APIs e autenticação": REST, GraphQL, WebSockets, JSON/XML, OpenAPI; OAuth 2.0, OpenID Connect, JWT (tópicos `ti.dev.apis`, `ti.dev.auth`).
- Seguir as regras de texto (sem excesso de travessão, sem emojis, comentários de alternativa com motivo real; o teste exige > 5 caracteres).
- Verificar com `npm test`; atualizar `CONTENT_COVERAGE.md`.
