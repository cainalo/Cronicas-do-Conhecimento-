# Testes

## Comandos
- `npm test` — Vitest (jsdom) + Testing Library.
- `npm run build` — typecheck (`tsc -b`) + build.
- RLS: executar `supabase/tests/rls_check.sql` (transação revertida) via SQL Editor ou MCP.

## Suítes
| Arquivo | Cobre |
|---|---|
| `src/test/reset.test.tsx` | reinício do progresso: regra pura, fusão com estado antigo, espelho do IndexedDB, chaves locais, sync com Supabase simulado, diálogo (cancelar, confirmar, recarregar, Continuar no início, preferências mantidas) |
| `src/test/content.test.ts` | ids únicos; 5 alternativas; gabarito válido; comentários; nunca `oficial`; seção/tópico existentes; lições válidas |
| `src/test/study.test.ts` | XP único, revisão/recuperação, lição (melhor nota), capítulo lido, níveis, domínio, recomendação, marcadores |
| `src/test/merge.test.ts` | fusão entre aparelhos, XP sem duplicar, migração do visitante |
| `src/test/game.test.ts` | títulos, sequência, domínio, selos, missões, Rodada relâmpago (escolha das questões) |
| `src/test/study.test.ts` (prática e livro) | pegadinhas, montagem da prática, XP único, divisão em blocos, paginação, pistas proporcionais |
| `src/test/flow.test.tsx` | fluxo real de telas: lição com erro → resultado 90% → nova sessão → revisão → recuperação; leitor (marcar lida, busca); Aprender (páginas, trecho estudado, link do texto completo); prática; simulado |
| `src/test/content.test.ts` (camada simples) | toda seção tem explicação simples; 4–7 páginas; até 70 palavras por página; última "Resumindo"; 4–8 palavras novas; 3 verificações com V e F |

## Últimos resultados (2026-10-24, auditoria)
- `npm test`: **787/787** (10 microaulas; regra contra listas aninhadas). Antes: **753/753** (micro.test.ts roda as regras para as 4 microaulas do cap.infra.03). Antes: **741/741** (+ `packPages` em `micro.test.ts`; varredura Playwright das fases da microaula sem rolagem em 390×844, 360×640, 1280×800). Antes: **740/740** (rodada Estudos: `studies.test.tsx` com página Estudos, vídeo só ao tocar, página não encontrada, Conta sem servidor e volumes, recuperação adaptativa; `planner.test.ts` com a ordem do dia seguindo a trilha). Antes: 731 (novos: `checkpoint.test.ts`, `micro.test.ts`, divisão de blocos do livro, fluxos de retomada em Aprender/Missão/Desafio/Prática/Microaula, destino único dos botões, leitura contínua).
- Livro: script Playwright percorreu todas as folhas dos 33 capítulos em 390×844 (fonte 1) e 1280×800 (fonte 1,4): **0 folhas com conteúdo transbordando**, sem erros de console; 20 combinações extras (fontes 1 e 1,4 em 5 capítulos) também 0.
- Microaula no Chromium 390×844: explicação, checagem, erro com recuperação e Torre mostrando "Você parou aqui".
- Não testado: sincronização real com o Supabase (domínio bloqueado), APK em aparelho, leitor de tela.

## Resultados de 2026-10-23
- `npm test`: **715/715** (inclui `pace.test.ts`, cartão de ritmo e guia no fluxo)
- Áudio: ambiente renderizado offline (node-web-audio-api) 40 s: pico 0,34, −25 dB RMS, sem clipagem; espectrograma conferido.
- `npm test` anterior: **709/709** (inclui `sql.test.ts`, `mission.test.ts`, `activities.test.tsx`, fluxo da missão e códice)
- Missão completa percorrida no Chromium em 1280×800 e 390×844 (Playwright): sem erros; história salva. Cena 3D renderizada (SwiftShader) nas duas larguras.
- `npm test` anterior: **689/689** ✅ (content, study, merge, training, planner, game, flow)
- `npm run build`: ✅ (aviso de chunk > 500 kB)
- `rls_check.sql` no remoto: 13/13 conforme esperado ✅
- Visual (Playwright/Chromium, 390×844, escuro e claro): sem overflow horizontal, sem erros de console ✅

## Não testado
Login/cadastro/recuperação e sincronização HTTP com o Supabase (rede do container bloqueia `*.supabase.co`); instalação PWA em aparelho; offline.

## Última execução (25/10/2026)
`npm test`: 913/913 em 26 arquivos; `tsc -b` e build OK; varredura Playwright de 36 rotas × 3 larguras × 2 temas sem estouro nem erro de JavaScript; CI 72 verde (site e APK).

## Execução de 25/10/2026 (noite)
`npm test`: 1003/1003; `tsc -b` e build OK. Testes novos: fase de mídia da aula (narrada dentro da aula), feed social (perfil, curtir, revisão rápida), tela do Escritório (ir até, objeto, conversa, teclado, Esc), móveis e direção no mapa, retomada da microaula com ponto salvo inválido.
