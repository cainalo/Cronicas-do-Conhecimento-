# Reformulação — registro de execução

Pacote: `Cronicas_Reformulacao_Pacote_Tecnico` (specs lidos: README, 00, 03, 04, 06, 07, 26, 28, 30). Baseline em `docs/REFORMULACAO_BASELINE.md`.

## Fase ativa

**Fase 2: contrato declarativo de unidades e blocos + texto interativo (piloto).** As Fases 0 e 1 foram concluídas.

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

## Próxima ação exata

Fase 2: ler `specs/08_CONTRATO_DO_CONTEUDO.md` e `specs/09_LEITURA_INTERATIVA.md`. Depois:
1. Adaptar `MicroLesson` para `LearningUnit`/`LearningStep`/`ContentBlock`, com conceitos introduzidos e exigidos por etapa.
2. Criar o validador de "conceito cobrado antes de ensinado", com teste.
3. Fazer o piloto `infra-processos` com glossário clicável (InteractiveTerm), checkpoint por `stepId` e leitura em página com rolagem natural.

Ponto em aberto (OPEN_QUESTIONS): o pedido anterior de "sem rolagem vertical" contra o spec 07 do pacote ("rolagem natural").
