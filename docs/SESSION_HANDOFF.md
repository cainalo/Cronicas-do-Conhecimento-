# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`): https://cainalo.github.io/Cronicas-do-Conhecimento-/ e APK em `/download/`. Usuário confirmou que o APK instala e funciona.
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- **Conteúdo: 68/68 tópicos com material** (13 grimórios, 31 capítulos, 35 lições, 391 questões autorais, 8 estudos de caso). Ver `docs/CONTENT_COVERAGE.md`; normas estaduais/TCE-GO e LC 205 só em panorama (faltam os PDFs oficiais).
- Visual claro no estilo do NutriConnect + camada divertida: mascote Bubo (coruja escriba, **provisório**), trilha estilo Duolingo em cada capítulo, cenas ilustradas nas páginas centrais, desenhos animados nos cartões, confete/avisos de XP/nível/selo, sons (chave em Conta), Rodada relâmpago, "Você sabia?".
- Simulado no formato da prova (70 questões por disciplina conforme o edital, pontos ponderados gerais × 1 e específicas × 2).
- Fases D e E completas; Supabase com RLS verificado; login/sync pelo navegador ainda **não confirmados pelo usuário**.

## Testes
`npm test` 438/438; `tsc -b` OK; build OK; capturas 390×844 (claro/escuro) e 1280×800 sem overflow nem erros.

## Pendências com o usuário
- Pedir retorno sobre o visual novo e sobre login/sincronização.
- Configurar Site URL/Redirect URLs no Supabase (passo em `docs/MOBILE_AND_OFFLINE.md`).
- PDFs: LC estadual 205/2025, RN 13/2016, RA 14/2024, RA 17/2024, RA 14/2025, PDTI 2025–2026, Lei 16.168/2007, Regimento (Res. 22/2008), Lei 15.122/2005, Lei 20.756/2020, Código de Ética, RN 5/2024, RA 24/2024, RA 5/2024, RA 19/2024, RA 15/2024, Constituição de Goiás (TCE).
- Rodada criativa da narrativa (Fase F): protagonista, conflito, personagens, nome do mascote e da plataforma.

## Próxima tarefa exata
1. Narrativa (Fase F): perguntar ao usuário (AskUserQuestion) protagonista, conflito, personagens, nome do mascote e da plataforma; depois prólogo e falas por região do mapa.
2. Quando o usuário enviar os PDFs, ampliar `legislacao/cap02-normas/02-goias-tce.md` e `institucional/cap02-goias/*` e suas questões.
3. Revisão de qualidade amostral das questões (gabaritos, comentários) e dos textos com "Nota de fonte"; estudos de caso para Legislação de TI e Português (redação oficial) se o usuário quiser.
4. Ideias de produto pendentes: virada de página no leitor, ilustrações nas margens, sons opcionais mais ricos.
