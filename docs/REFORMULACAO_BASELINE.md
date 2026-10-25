# Reformulação — baseline factual (Fase 0)

Data: 25/10/2026. Pacote técnico: `Cronicas_Reformulacao_Pacote_Tecnico` (lido: README, 00, specs 03, 04, 06, 07, 26, 28, 30). Nada de conteúdo, banco ou comportamento foi alterado nesta fase.

## Checkout

| Item | Valor observado |
|---|---|
| Branch | `claude/cronicas-conhecimento-estudos-jgbofo` |
| Commit de partida | `36740de` (Fase 3 das microaulas: Infraestrutura inteira e início de Segurança) |
| `git status` | limpo antes da reformulação |
| Node / npm | v22.22.0 / 10.9.4 |
| Lockfile | `package-lock.json` (npm) |
| Scripts | `dev`, `build` (`tsc -b && vite build`), `preview`, `test` (`vitest run`), `typecheck` (`tsc -b`) |

## Comandos executados e resultados reais

| Comando | Resultado |
|---|---|
| `npm ci` | ok (avisos de `npm audit`, sem falha) |
| `npm run typecheck` | ok (saída 0) |
| `npm test` | 14 arquivos, **792/792** testes passando |
| `npm run build` | ok em ~8 s. JS principal **2.708 kB** (868 kB gzip); `Scene3D` em chunk separado de 602 kB. Aviso de chunk > 500 kB |
| Build Android | **não executado aqui**: há `java`, mas não há Android SDK (`ANDROID_HOME` vazio). O APK é gerado na CI (`.github/workflows/pages.yml`: `npm ci` → `npm test` → `npm run build` → `npx cap sync android` → assinatura com chave em secret → `assembleRelease` → APK copiado para `dist/download/`). Última execução da CI (run 54, commit `36740de`): **sucesso** |

## Inventário

- **Stack**: React 18, Vite 5, TypeScript, Tailwind 3, React Router 6, Capacitor 7 (`appId: io.github.cainalo.cronicas`, `webDir: dist`), Supabase JS 2, Vitest 2 + Testing Library + jsdom, react-markdown, three.
- **Rotas** (`src/App.tsx`): `/`, `biblioteca`, `estudos`, `grimorio/:id`, `capitulo/:id`, `aprender/:chapterId/:sectionId`, `missao/:id`, `download`, `pratica/:chapterId/:sectionId`, `licao/:id`, `revisao`, `historico`, `progresso`, `edital`, `conta`, `treino`, `plano`, `reino`, `personagem`, `flashcards`, `relampago`, `diario`, `simulado`, `simulado/:id`, `discursiva`, `discursiva/:id`, `*` (página não encontrada).
- **Conteúdo**: edital TCE-GO 2026 Técnico TI (FCC) em `src/content/contests/tce-go-2026/contest.ts` (`examDate: 2027-01-17`); 14 grimórios, 33 capítulos (contagem do registro em `src/content/index.ts`), 383 questões autorais (contagem de `id: 'q.`), 11 microaulas em `src/content/micro/`, 1 missão SQL.
- **Progresso**: `StudyData` v1 (`src/lib/model.ts`) em `localStorage` (`cronicas:v1:<owner>`, `src/lib/storage.ts`); se a versão é desconhecida, `loadData` devolve dados vazios (risco de perda silenciosa a tratar na Fase 5). Checkpoint único em `src/lib/checkpoint.ts` + `src/app/useCheckpoint.ts`; ritmo em `src/lib/pace.ts`; plano em `src/lib/planner.ts` (já alinhado à trilha).
- **Sync**: `src/app/StudyProvider.tsx` + `src/lib/sync.ts` + `src/lib/merge.ts` com Supabase; marcação de pendentes em `StudyData.pending`.
- **Banco remoto** (`supabase/migrations/`, 4 migrações): tabelas `profiles`, `question_attempts`, `reading_progress`, `bookmarks`, `lesson_completions`, `xp_events`, `mock_exams`, `essay_answers`, `flashcard_states`, `study_settings`. RLS habilitada nas 10 tabelas criadas (6 + 3 + 1); a 4ª migração altera tipos de XP. Testes de RLS: `supabase/tests/rls_check.sql`, `rls_check_02.sql` (não executados nesta fase: exigem o banco).
- **Offline**: não há service worker/PWA no `vite.config.ts` atual nem banco local estruturado; só `localStorage`. Requisito offline relacional fica para a Fase 5.
- **Tema**: tokens em `src/styles/index.css` (`--bg`, `--surface`, `--ink`, `--gold`, `--ember` etc., em RGB), com texturas medievais (`--wall`, `--panel`, couro, pergaminho), fontes Cinzel/serif, tochas e trilha sonora medieval.

## Divergências entre docs e código

- Docs antigos citam PWA/service worker; o código atual não o tem.
- Contagens antigas de testes (731, 753...) estão superadas: o número real hoje é 792.
- O pacote pede leitura com rolagem natural; o pedido anterior do usuário (24/10) foi "nenhuma rolagem vertical" nas microaulas (SwipePages). Registrado em `docs/OPEN_QUESTIONS.md`; a microaula continua como está até a Fase 2.
