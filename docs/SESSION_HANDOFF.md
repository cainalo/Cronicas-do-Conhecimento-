# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (Criptografia), Livro dos Autômatos (IA, 2 caps.) Tratado das Pontes e dos Selos (Dev: APIs; identidade) e Atlas das Estradas e das Nuvens (Redes; Nuvem). Códice também com cap. 2 (Defesa em Profundidade) e O Arquivo Profundo (Banco de Dados, 2 caps.) e As Atas do Conselho (Governança, 2 caps.). 16 lições, 170 questões, 3 estudos de caso. Cobertura 29/68 tópicos (Segurança, Banco de Dados e Governança completos).
- Fase E feita: mapa do reino, ficha do personagem, selos, inventário, missões semanais (migração 4).
- Visual "medieval moderno" (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- App nativo Android (Capacitor) compilado no CI e baixável em `/download/` (ver `docs/MOBILE_AND_OFFLINE.md`). PWA removido.
- Fase D completa: simulados, estudos de caso (2), flashcards e planejador, todos sincronizáveis (migrações 2 e 3 aplicadas, RLS verificado). 
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 206/206; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
1. **Grimório de Legislação Aplicada à TI** (4 questões): `src/content/grimoires/legislacao/`, tópicos `ti.legislacao.*` (ver `contest.ts` e o Anexo II em `docs/fontes/`, linha ~1587). Cap. 1: LGPD aplicada a sistemas (privacy by design/default, minimização, anonimização × pseudonimização) e Marco Civil (neutralidade, guarda de registros: 1 ano conexão, 6 meses aplicação). Cap. 2: requisitos de segurança em contratações de TIC, certificação digital; LC estadual 205/2025 e normativos do TCE-GO (RN 13/2016, RA 14/2024, RA 17/2024, RA 14/2025, PDTI 2025–2026): **não inventar conteúdo** — se o texto não puder ser obtido por busca, escrever só o que for verificável e pedir ao usuário o PDF dos normativos. ~12 + ~10 questões, lições, glossário, artefatos. Padrão: `grimoires/governanca/`.
2. Depois: Eng. de Software, DevOps, SO (Windows/Linux, AD/LDAP), IA (fundamentos de ML, ética, ciência de dados), Inglês, Gerais.
3. Narrativa (Fase F): perguntar protagonista, conflito e personagens.
