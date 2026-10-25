# Checklist de release (spec 36 do pacote técnico)

Data: 25/10/2026. Branch: `claude/cronicas-conhecimento-estudos-jgbofo`.
Legenda: **OK** tem evidência real; **PARCIAL** vale em parte; **NÃO VERIFICADO** é um risco declarado; **N/A** não se aplica a esta versão.

## Funcionalidade
| Item | Estado | Evidência |
|---|---|---|
| Continue usa resolvedor único e checkpoint correto | OK | `getLearningCheckpoint` (`lib/checkpoint.ts`) é a fonte única para Hoje, cabeçalho e menu. Testes em `flow.test.tsx` e `studies.test.tsx`. |
| Grafo de pré-requisitos sem ciclos | OK | Trilha linear (`trailUnits`), sem ciclos por construção. `validateUnit` e `validateScenario` testados. |
| Cada tópico ativo do edital com cobertura rastreável | OK | 68/68 tópicos com material (`docs/CONTENT_COVERAGE.md`). `content.test.ts` confere os ids. |
| Atividade não exige conceito futuro | PARCIAL | Garantido por teste no piloto Processos (`units.test.ts`, `engine.test.ts`), no simulador e na Prática (portão). As demais seções ainda não têm mapa de conceitos. |
| Recuperação volta ao checkpoint pai | OK | Contexto "Reforço do assunto" testado em `flow.test.tsx`. |
| Texto completo sem mídia | OK | Todo o conteúdo é texto embutido no app. Vídeo é opcional. |
| Videoaula com fallback e sem autoplay | OK | `studies.test.tsx`: carrega só ao tocar, sem `autoplay`, com link para o original. Sem rede, avisa que o vídeo precisa de conexão. |
| Aula visual interrompe a voz ao sair | N/A | A aula visual narrada (spec 20) não existe nesta versão. |
| Feed editorial não altera checkpoint | OK | `phase6.test.tsx` confere que, depois de usar a Sala e o simulador, tentativas, leitura, retomada, XP e checkpoint ficam iguais. |

## Dados e segurança
| Item | Estado | Evidência |
|---|---|---|
| IDs antigos preservados | OK | Nenhum id de conteúdo, tentativa ou tabela foi renomeado. `appId` `io.github.cainalo.cronicas` mantido. |
| Backup antes de migração local | OK | `loadData` e `clearData` gravam `cronicas:backup:<dono>` antes de descartar (`storage.test.ts`). |
| Migração local idempotente com leitura de volta | OK | `localdb.test.ts`: espelho no IndexedDB, recuperação só com dados vazios. |
| Envio idempotente, nova tentativa e confirmação | OK | `upsert` com `onConflict: 'id'` e `ignoreDuplicates` em `lib/sync.ts`. A fila só é limpa após sucesso. |
| RLS: usuário A contra B em cada tabela | PARCIAL | 25/10: as 10 tabelas têm RLS, com políticas só para `authenticated` e `auth.uid() = user_id`. Os scripts `supabase/tests/rls_check.sql` e `rls_check_02.sql` (transação revertida) já passaram nas rodadas de 17/10. A nova rodada cobre também `bookmarks` e `study_settings`, mas ficou à espera da confirmação do usuário no servidor. |
| Sem service role ou segredo no bundle | OK | 25/10: busca em `dist/` e `src/`. Só a chave publicável; "sb_secret_" aparece apenas no código da biblioteca que testa prefixos. Keystore fora do repositório (segredos do GitHub). |
| Trocar de conta não mistura dados | OK | Dados por dono (`cronicas:v1:<dono>`). `localdb.test.ts`: um dono não vê o espelho do outro. |
| Proteção contra senhas vazadas (aviso do Supabase) | NÃO VERIFICADO | Desligada. Liga-se no painel do Supabase (Authentication → Policies → Password security), não por migração. Fica para o dono do projeto. |

## Offline
| Item | Estado | Evidência |
|---|---|---|
| App abre sem rede | PARCIAL | APK: os arquivos vão dentro do app (Capacitor). Site: sem service worker, por decisão de 17/10 ("app nativo, não PWA"). |
| Conteúdo funciona em modo avião | PARCIAL | No APK, todo o conteúdo está embutido. Não testei num aparelho físico nesta sessão. |
| Progresso sobrevive a fechar e reabrir | OK | localStorage com espelho no IndexedDB (testes de retomada em `flow.test.tsx`). |
| Fila pendente mostra estado e sincroniza depois | OK | A tela Conta mostra os registros aguardando. O envio tenta de novo ao reconectar. |
| Pacote baixável não fica pronto sem arquivo crítico | N/A | Não há pacotes baixáveis: tudo vai no app. |
| YouTube mostra limitação offline | OK | Aviso sem conexão no botão do vídeo (25/10). |

## Interface
| Item | Estado | Evidência |
|---|---|---|
| Celular e computador sem estouro | OK | Varreduras Playwright em 360×640, 390×844 e 1280×800 (microaulas, personalização, simulador, Sala, Explorar): sem estouro horizontal nem rolagem interna. |
| Contraste e rótulos | PARCIAL | `theme.test.tsx`: as 8 paletas passam 4,5:1 no texto. O painel avisa contraste ruim nas cores trocadas à mão. Rótulos aria nos botões principais; sem auditoria completa com leitor de tela. |
| Teclado, foco, alternativas ao arrastar | PARCIAL | As atividades de ordenar e classificar usam botões, sem arrastar. Navegação só por teclado não foi testada sistematicamente. |
| Menos animação e tamanho de fonte | PARCIAL | `prefers-reduced-motion` respeitado no CSS. A opção "animação" do painel desliga movimentos. Ampliação de fonte do sistema não foi testada. |
| Estados de carregando, vazio, erro e offline | PARCIAL | Vazios e modo local cobertos em testes (Conta sem servidor, página não encontrada, Sala vazia). Erro de rede da sincronização mostrado na Conta. |

## Release técnico
| Item | Estado | Evidência |
|---|---|---|
| typecheck | OK | `npx tsc --noEmit -p .` sem erros (25/10). |
| testes | OK | `npx vitest run`: 22 arquivos, 841 testes (25/10). |
| build | OK | `npm run build` (25/10). |
| Workflow do site e do APK | OK | Execuções 59, 60 e 61 de "Publicar site e app Android" com sucesso. |
| Deep links e BASE_URL | PARCIAL | `BASE_URL` e `404.html` (fallback de rotas) no Pages. Sem deep links Android (não há intent filter); links de e-mail abrem o site. |
| APK identificado, checksum e versionCode | OK | `version.json` publicado com versionName, versionCode (número da execução), tamanho, **sha256** e **signing** (release com keystore dos segredos, senão debug). |
| Instalação e atualização em Android físico | PARCIAL | O usuário confirmou antes que o APK instala e funciona. Não reinstalei nesta sessão. |
| Docs, reversão e changelog | OK | Este arquivo, `REFORMULACAO_EXECUCAO.md` e a seção abaixo. |

## Como reverter
- **Site:** o Pages publica a branch `gh-pages` a cada push. Para voltar, faça revert do commit na branch de trabalho e um novo push; o workflow republica.
- **App:** instale o APK anterior por cima (mesma assinatura e `appId`). O versionCode menor exige desinstalar, e isso apaga só o armazenamento local. Antes, entre na conta e sincronize.
- **Dados locais:** `cronicas:backup:<dono>` guarda a última versão antes de qualquer descarte. O espelho no IndexedDB recupera quando o armazenamento principal some.
- **Banco:** nenhuma migração nesta reformulação; não há o que reverter.

## Changelog da reformulação (24 a 25/10/2026)
- **Fase 0:** baseline e inventário.
- **Fase 1:** trilha única com checkpoint e 5 áreas.
- **Fase 2:** texto interativo (piloto Processos) e motor de atividades com portão por conceito.
- **Fase 3:** microaulas de Infraestrutura (10) e fundamentos de Segurança.
- **Fase 4:** viabilidade em minutos, plano dos 7 dias e domínio por trecho.
- **Fase 5:** cópia de segurança e espelho IndexedDB; idempotência conferida.
- **Visual:** colorido, com painel de personalização completo.
- **Fase 6:** simulador 2D e Sala dos Professores.
- **Fase 7:** auditoria de segurança (somente leitura), checksum do APK, aviso offline no vídeo e este checklist.
