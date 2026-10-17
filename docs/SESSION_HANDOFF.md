# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (Criptografia), Livro dos Autômatos (IA, 2 caps.) Tratado das Pontes e dos Selos (Dev: APIs; identidade) e Atlas das Estradas e das Nuvens (Redes; Nuvem). Códice também com cap. 2 (Defesa em Profundidade) e O Arquivo Profundo (Banco de Dados, 2 caps.) As Atas do Conselho (Governança, 2 caps.) e O Livro das Leis do Reino (Legislação de TI, 2 caps.; normas de Goiás/TCE-GO só em panorama) O Caderno dos Arquitetos (Eng. de Software, 2 caps.) e O Diário do Porto (DevOps, 2 caps.). 22 lições, 236 questões, 3 estudos de caso. Cobertura 44/68 tópicos.
- Fase E feita: mapa do reino, ficha do personagem, selos, inventário, missões semanais (migração 4).
- Visual "medieval moderno" (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- App nativo Android (Capacitor) compilado no CI e baixável em `/download/` (ver `docs/MOBILE_AND_OFFLINE.md`). PWA removido.
- Fase D completa: simulados, estudos de caso (2), flashcards e planejador, todos sincronizáveis (migrações 2 e 3 aplicadas, RLS verificado). 
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 272/272; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.
- Pedir PDFs dos normativos do TCE-GO e da LC 205/2025 para completar `grimoires/legislacao/cap02-normas/02-goias-tce.md`.

## Próxima tarefa exata
1. **Capítulo 3 do Atlas (SO e diretório)**: `src/content/grimoires/infra/cap03-so/`, tópicos `ti.infra.so` (Windows/Linux, shell, PowerShell) e `ti.infra.diretorio` (AD, LDAP, virtualização) — conferir o texto exato no Anexo II (`docs/fontes/`, seção SO/Redes/Nuvem). Adicionar `capInfraSo` ao `chapterIds` do grimório, lição lic.infra.03, ~12 questões q.infra.03.*, artefatos.
2. Depois: IA (fundamentos de ML/deep learning/PLN, ética e Estratégia Brasileira de IA, ciência de dados e Big Data), Inglês, Gerais (Português, Matemática/RL, Legislação Institucional).
3. Se o usuário enviar os PDFs dos normativos do TCE-GO/LC 205, ampliar o cap. 2 de Legislação.
4. Narrativa (Fase F): perguntar protagonista, conflito e personagens.
