# Reformulação — registro de execução

Pacote: `Cronicas_Reformulacao_Pacote_Tecnico` (specs lidos: README, 00, 03, 04, 06, 07, 26, 28, 30). Baseline em `docs/REFORMULACAO_BASELINE.md`.

## Fase ativa

**Fase 4 (continuação): modelo do estudante e agenda semanal.** Fases 0 a 3 concluídas. A primeira parte da Fase 4 (viabilidade em minutos, revisão só do que foi apresentado, reforço no checkpoint) também.

## Fase 0 — baseline (concluída, 25/10/2026)

- Inventário factual e comandos reais em `docs/REFORMULACAO_BASELINE.md`.
- `npm ci` ok; `npm run typecheck` ok; `npm test` 792/792; `npm run build` ok. Build Android local impossível (sem Android SDK). A CI gera o APK (run 54: sucesso).

## Fase 1 — design system, shell e Hoje/Trilha (concluída, 25/10/2026)

**Feito**
- Tokens novos no fim de `src/styles/index.css`, com tema claro como padrão e escuro com tokens próprios. Os nomes antigos (`--gold`, `--ember` etc.) foram mantidos para não editar cada componente. Fontes IBM Plex Sans (já empacotada), sem texturas, cards de 18 px, botões planos, barras claras, foco visível e `prefers-reduced-motion`.
- Preferências v4 (`src/lib/storage.ts`): migra v3/v2 preservando tamanho de letra e som, com o tema claro aplicado uma vez. As chaves antigas não são apagadas.
- Navegação em cinco áreas (`src/app/areas.ts`, `src/components/Layout.tsx`): **Hoje** `/`, **Trilha** `/trilha`, **Explorar** `/explorar`, **Revisar** `/revisar` e **Progresso** `/progresso`. Mesmas abas no menu de baixo (celular) e no topo (desktop).
  - Sem o botão central sobreposto; o Continuar é compacto no cabeçalho e some dentro das atividades.
  - Sem tochas e sem o botão de música no cabeçalho. Música e lareira continuam em Conta, desligadas por padrão.
- Rotas novas: `/trilha` (`src/pages/Trail.tsx`), `/explorar` (alias de Estudos) e `/revisar` (alias de Treino). Todas as rotas antigas continuam.
- Trilha: estado de cada atividade em `src/lib/trail.ts` (feita/atual/disponível/bloqueada). Pré-requisito mínimo: dentro do capítulo, só abre a atividade depois das anteriores. A "atual" é a do Continuar (fonte única).
- Hoje (`src/pages/Dashboard.tsx`): saudação sem mascote, contagem regressiva sem castelo, mesmo checkpoint.
- Mascote e cenários: `Mascot` virou ícone em círculo colorido (mesma API; a coruja ficou como `MascotOwl`, sem uso) e `SceneBanner` virou aviso em cartão. Os componentes antigos não foram apagados.
- Branding: `Crônicas do Conhecimento` (título, `appName` do Capacitor, logo). `appId` preservado. Barra de status do Android segue o tema.

**Arquivos**: `src/styles/index.css`, `src/lib/storage.ts`, `src/app/areas.ts`, `src/components/Layout.tsx`, `src/components/Mascot.tsx`, `src/components/SceneBanner.tsx`, `src/components/Page.tsx`, `src/pages/{Dashboard,Trail,Studies,Library,Training,Progress}.tsx`, `src/App.tsx`, `src/app/{native,prefs}.tsx?`, `src/lib/trail.ts`, `src/test/trail.test.ts`, `index.html`, `capacitor.config.ts`.

**Comandos e resultados**: `npx tsc --noEmit` ok; `npm test` **795/795** (3 novos em `trail.test.ts`); `npm run build` ok. Capturas Playwright de Hoje, Trilha, Explorar, Revisar, Progresso, aula e Conta em 390×844 e 1280×800, sem overflow horizontal nem erro de página.

**Limitações**
- A regra de bloqueio vale só na página Trilha. Abrir uma URL de atividade bloqueada diretamente ainda funciona; o bloqueio no domínio entra na Fase 3/4, com o grafo de conceitos.
- Ainda há telas internas com textos do tema antigo (Reino, Diário, Personagem, missão 3D, prólogo).
- O ícone do app (`pwa-192.png`) ainda é o antigo.

## Fase 2 — contrato declarativo + texto interativo, piloto Processos (concluída, 25/10/2026)

**Feito**
- `src/content/learning.ts`: tipos `Concept`, `ContentBlock` (`paragraph`, `workedExample`, `inlineActivity`), `LearningStep`, `LearningUnit` (versão, edital, tópicos, objetivo, faixa de minutos, dificuldade, pré-requisitos, conceitos, abertura diagnóstica, etapas, prática, prova, status editorial) e `UnitMap`.
- `unitFromMicro` adapta a microaula existente à unidade **sem copiar o texto**: a microaula continua sendo a fonte, e a unidade só acrescenta o mapa de conceitos.
- `src/content/units/infra-processos.ts`: glossário com 21 conceitos (definições fiéis ao texto) e o mapa do que cada etapa introduz e do que cada uma das 37 atividades cobra.
- `src/lib/contentValidator.ts` acusa, com unidade, id e vínculo:
  - conceito cobrado antes de ser ensinado;
  - atividade antes da explicação;
  - id duplicado;
  - conceito não registrado;
  - unidade sem objetivo, etapas ou tempo;
  - alias de glossário ambíguo;
  - ciclo de pré-requisitos (`findCycle`).

  A abertura é diagnóstica e não conta como ensino.
- Leitor `src/pages/InteractiveUnit.tsx`, aberto pelo Aprender quando o trecho tem unidade:
  - leitura com rolagem natural, em que cada etapa aparece abaixo da anterior depois da checagem;
  - termos em negrito que são conceitos **já apresentados** viram botões e abrem a definição em diálogo acessível (foco, Escape, foco devolvido), sem mudar o checkpoint; conceito futuro não vira link;
  - erro na checagem leva a outra explicação e a uma atividade equivalente, e depois se volta ao ponto e se avança;
  - prática final, prova e síntese;
  - o ponto (etapa) fica salvo na mesma chave do Aprender; o formato antigo da microaula é convertido (`normalizeSession`), sem perder o lugar de quem estava no meio.
- `Markdown` aceita a opção `strong` para termos clicáveis.
- Testes: `src/test/units.test.ts` (8) e 2 fluxos novos em `flow.test.tsx`. O teste da microaula antiga passou a usar Arquivos, que continua no formato antigo.

**Comandos e resultados**: `npm run typecheck` ok; `npm test` **805/805** (16 arquivos); `npm run build` ok. Captura Playwright do leitor e do diálogo de termo em 390×844 e 1280×800, sem overflow nem erro.

**Limitações**
- Só Processos tem unidade interativa. As demais seções seguem em microaula (sem rolagem) ou no Aprender simples.
- Não há anotação, destaque nem "marcar para revisar" por bloco (spec 09 §3): ficam para a Fase 4, junto com a revisão.
- O pacote offline da unidade é da Fase 5. Hoje o conteúdo vai no bundle, então funciona sem rede depois de carregado, mas não há service worker.
- O bloqueio por pré-requisito existe na página Trilha e no validador do conteúdo, mas não impede abrir uma URL de atividade futura (Fase 4).

## Rodada visual "bem colorido" (25/10/2026, pedido do usuário)

- Fundo nunca branco: tinta lavanda com manchas de cor fixas e duas manchas que flutuam devagar (`body::before/after`).
- Cards (`.card`, `.ledger`) tingidos, alternando azul, verde-água, rosa, laranja e lilás pela posição, com faixa colorida no topo e elevação no hover. Tiles em degradê vivo com texto branco (contraste AA no claro; no escuro a cor é escurecida) e bolhas animadas.
- Botão principal em degradê com brilho, faixa colorida sob o cabeçalho, entradas de página e de listas animadas. Tudo é desligado com `prefers-reduced-motion`.
- Nenhuma rolagem interna:
  - tabelas e código quebram linha;
  - o laboratório SQL quebra células;
  - a leitura contínua do livro passou a rolar a própria página;
  - o sumário e a ajuda da Prática viraram painéis de tela cheia;
  - o flashcard cresce até caber o verso.

  Exceção: o deslizar lateral das aulas antigas (SwipePages), escolha anterior do usuário.
- Testes 805/805, typecheck e build ok, capturas em 390×844 e 1280×800 sem overflow.

## Fase 3 — engine de atividades e gate de pré-requisitos (concluída, 25/10/2026)

**Feito**
- `src/lib/engine.ts`:
  - contrato único `EngineActivity` (tipos do spec 12 implementados no app, família, modo diagnóstico/ensino/prática/revisão/prova, `requiresConceptIds`/`assessesConceptIds`, `ErrorCode` do spec 12 §5);
  - adaptadores `fromMission` e `fromPractice`, sem reescrever os renderers;
  - `diversityReport` (V/F até ~10%, sem três da mesma família seguidas) e `interleave` determinístico;
  - `taughtConcepts`: conceitos ensinados a partir das etapas salvas, entendendo o formato novo e o antigo; diagnóstico não conta;
  - `eligible` (gate) e `practiceUnlocked`.
- Gate na trilha: a Prática de um trecho mostra "Primeiro, aprenda este trecho" até o Aprender ser concluído (antes abria direto pela URL).
- Prática do piloto: termos e pares vêm só dos conceitos ensinados da unidade. Antes vinham do glossário do capítulo inteiro (LDAP, permissão 750, AD...). A recuperação usa o mesmo glossário.
- Testes: `src/test/engine.test.ts` (6) e fluxo da prática bloqueada. Os testes antigos que abriam a Prática direto passaram a marcar o trecho como aprendido antes.

**Comandos e resultados**: typecheck ok; `npm test` **812/812** (17 arquivos); build ok.

**Limitações**
- Os renderers continuam sendo dois (ActivityView e Prática): a unificação é de contrato e regras, não de componente.
- Não há tipos novos (label_diagram, terminal_simulator, scenario_branch, predict_result).
- Tentativas ainda não guardam `changeId` nem versão da atividade (Fase 5, com o outbox).

## Fase 4, parte 1 — viabilidade em minutos, revisão gated e reforço no checkpoint (25/10/2026)

**Feito**
- `src/lib/feasibility.ts` (spec 15 §4–5):
  - minutos por atividade em faixa (mínimo/típico/máximo); a aula interativa usa a faixa da unidade;
  - dias de estudo de hoje até a véspera da prova, sem o dia da prova e em data local;
  - revisão espaçada (15%), erros e cartões pendentes, e folga de 10%;
  - `PlanFeasibility` com necessário, disponível, déficit, minutos por dia necessários, dias necessários, semana final de revisão reservada **só se couber** e premissas explícitas.
- `src/components/FeasibilityCard.tsx` em Hoje e no Plano: se não cabe, mostra o déficit em vermelho e as opções reais (mais minutos, mais dias, terminar depois), sem barra verde e sem retirar conteúdo. No Plano saíram as linhas antigas que contradiriam o cartão.
- Revisão só do que foi apresentado: `unlockedCardIds` (`src/lib/training.ts`) libera cartões apenas de capítulos com algum trecho estudado, mais os já em revisão. Vale em Hoje, Revisar, Explorar, Flashcards e no plano do dia. Antes, 15 cartões de matéria nunca vista apareciam no primeiro dia.
- Reforço no checkpoint: durante a recuperação da aula interativa, o Continuar mostra "Reforço do assunto: etapa N" e leva de volta ao mesmo ponto.
- Testes: `src/test/feasibility.test.ts` (6); fluxos de flashcards gated e de reforço no checkpoint.

**Comandos e resultados**: typecheck ok; `npm test` **818/818**; build ok; captura do cartão em 390×844 sem erro.

**Limitações**: ainda não há agenda semanal por disciplina, modelo de domínio por conceito, `StudyPlanSnapshot` versionado nem agendador único (os flashcards seguem o SM-2 simplificado existente).

## Próxima ação exata

Fase 4, parte 2 (specs 13 e 14):
1. Estimativa de domínio por conceito a partir das tentativas, como heurística explicada.
2. Plano semanal com minutos por dia: novo, prática e revisão.
3. Snapshot versionado do plano, que preserva os itens concluídos ao replanejar.

Depois, Fase 5: armazenamento local estruturado (IndexedDB na web) com migração do `localStorage` sem apagar a chave antiga, e outbox idempotente.
