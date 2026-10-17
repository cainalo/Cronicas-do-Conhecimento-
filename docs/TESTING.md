# Testes

## Comandos
- `npm test` — Vitest (jsdom) + Testing Library.
- `npm run build` — typecheck (`tsc -b`) + build.
- RLS: executar `supabase/tests/rls_check.sql` (transação revertida) via SQL Editor ou MCP.

## Suítes
| Arquivo | Cobre |
|---|---|
| `src/test/content.test.ts` | ids únicos; 5 alternativas; gabarito válido; comentários; nunca `oficial`; seção/tópico existentes; lições válidas |
| `src/test/study.test.ts` | XP único, revisão/recuperação, lição (melhor nota), capítulo lido, níveis, domínio, recomendação, marcadores |
| `src/test/merge.test.ts` | fusão entre aparelhos, XP sem duplicar, migração do visitante |
| `src/test/game.test.ts` | títulos, sequência, domínio, selos, missões, Rodada relâmpago (escolha das questões) |
| `src/test/study.test.ts` (prática e livro) | pegadinhas, montagem da prática, XP único, divisão em blocos, paginação, pistas proporcionais |
| `src/test/flow.test.tsx` | fluxo real de telas: lição com erro → resultado 90% → nova sessão → revisão → recuperação; leitor (marcar lida, busca); Aprender (páginas, trecho estudado, link do texto completo); prática; simulado |
| `src/test/content.test.ts` (camada simples) | toda seção tem explicação simples; 4–7 páginas; até 70 palavras por página; última "Resumindo"; 4–8 palavras novas; 3 verificações com V e F |

## Últimos resultados (2026-10-17)
- `npm test`: **688/688** ✅ (content, study, merge, training, planner, game, flow)
- `npm run build`: ✅ (aviso de chunk > 500 kB)
- `rls_check.sql` no remoto: 13/13 conforme esperado ✅
- Visual (Playwright/Chromium, 390×844, escuro e claro): sem overflow horizontal, sem erros de console ✅

## Não testado
Login/cadastro/recuperação e sincronização HTTP com o Supabase (rede do container bloqueia `*.supabase.co`); instalação PWA em aparelho; offline.
