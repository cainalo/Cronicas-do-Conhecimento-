# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (Criptografia), Livro dos Autômatos (IA, 2 caps.) Tratado das Pontes e dos Selos (Dev: APIs; identidade) e Atlas das Estradas e das Nuvens (Redes; Nuvem). Códice também com cap. 2 (Defesa em Profundidade) e O Arquivo Profundo (Banco de Dados, 2 caps.). 14 lições, 148 questões, 3 estudos de caso. Cobertura 24/68 tópicos (Segurança e Banco de Dados completos).
- Fase E feita: mapa do reino, ficha do personagem, selos, inventário, missões semanais (migração 4).
- Visual "medieval moderno" (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- App nativo Android (Capacitor) compilado no CI e baixável em `/download/` (ver `docs/MOBILE_AND_OFFLINE.md`). PWA removido.
- Fase D completa: simulados, estudos de caso (2), flashcards e planejador, todos sincronizáveis (migrações 2 e 3 aplicadas, RLS verificado). 
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 184/184; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
1. **Grimório de Governança de TI** (4 questões): `src/content/grimoires/governanca/`. Conferir em `contest.ts` os 5 tópicos `ti.governanca.*` e o texto do Anexo II em `docs/fontes/` antes de escrever (não inventar frameworks fora do edital). Cobrir o que o edital citar (por exemplo COBIT, ITIL 4, gestão de projetos/ágil, contratações de TI), com versões conferidas por busca. ~12 questões por capítulo, lições, glossário, artefatos em `content/game/artifacts.ts`. Padrão: copiar a estrutura de `grimoires/dados/`.
2. Depois: Legislação aplicada à TI, Eng. de Software, DevOps, SO (Windows/Linux, AD/LDAP), IA (fundamentos de ML, ética, ciência de dados), Inglês, Gerais.
3. Narrativa (Fase F): perguntar protagonista, conflito e personagens.
