# Fontes e evidências da auditoria

## Fonte principal

- Repositório: https://github.com/cainalo/Cronicas-do-Conhecimento-
- Branch de implementação observada: https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/claude/cronicas-conhecimento-estudos-jgbofo
- Commit-base: `be2ece0059622aeb00bdd3fa638b60cb13eb7fdd`

## Arquivos de código analisados (trechos selecionados)

- `src/App.tsx` — rotas da aplicação.
- `src/components/Layout.tsx` — navegação principal, botão de continuação, header e navegação inferior.
- `src/pages/Dashboard.tsx` — “Começar”, próximo passo, ritmo de estudo, blocos e atalhos.
- `src/app/usePlanOfToday.ts` — plano diário congelado em armazenamento local e cálculo de próxima atividade.
- `src/lib/pace.ts` — sequência de unidades e cálculo do ritmo até o exame.
- `src/content/index.ts` — registro do conteúdo, ordenação da jornada e contagem de unidades.
- `src/content/types.ts` — tipos `SimpleSection`, `SectionExtras`, `Mission`, `Question` e status de conteúdo.
- `src/pages/Learn.tsx` — sequência de páginas curtas, vocabulário, verificações, CTA de prática e link ao texto completo.
- `src/lib/practice.ts` — conjunto e composição das atividades de prática comum.
- `src/lib/activities.ts` — famílias alternativas e regra de diversidade do motor de missão.
- `src/components/LeatherBook.tsx` — componente `Leaf` com `overflow-y-auto` e regras de página/virada.
- `src/lib/book.ts` — divisão e paginação dos blocos; comenta rolagem interna de blocos maiores.
- `src/pages/Mission.tsx` — etapas da missão e estados React locais.
- `src/components/activities/ActivityView.tsx` — correção, feedback e tipos de atividade da missão.
- `src/components/scene/Scene3D.tsx` — cena Three.js, personagens, câmera, legenda, som e fallback.
- `src/content/grimoires/infra/cap03-so/01-processos-memoria.md` — conteúdo técnico de processos/memória/serviços usado como exemplo de densidade.
- `src/content/game/simple/dev-infra.ts` — exemplo do modelo “do zero” de página por página e checagens ao final.
- `src/test/content.test.ts` e `src/test/flow.test.tsx` — exemplos dos controles estruturais e fluxos já testados.

## Documentação do repositório analisada

- `README.md` e `CLAUDE.md`.
- `docs/ARCHITECTURE.md`.
- `docs/AUDITORIA_REFORMULACAO.md`.
- `docs/CONTENT_COVERAGE.md`.
- `docs/DESIGN_SYSTEM.md`.
- `docs/PRODUCT_DECISIONS.md`.
- `docs/PROJECT_STATUS.md`.
- `docs/ROADMAP.md`.
- `docs/TESTING.md`.
- `.github/workflows/pages.yml`.

## Classificação das afirmações

- **Confirmado por código observado:** os trechos e responsabilidades listados acima; múltiplas fontes de próximo passo; sequência do Learn; `overflow-y-auto` no fólio; estados da missão em componente; famílias de prática limitadas; diferença entre motor de missão e prática padrão.
- **Declarado em documentação existente, ainda a reproduzir:** 715 testes passando, build, screenshots Playwright, métricas de conteúdo e resultados de RLS/sync.
- **Precisa ser reproduzido em UI/dispositivo:** bugs de botão fora de posição, visual exato do livro em cada aparelho, login/sync com rede real, desempenho/consumo da cena, detalhes de foco e scroll em várias alturas.
- **Recomendação de produto:** página Estudos, videoaulas, microaula do professor, design tokens, métricas editoriais e roteiro de correção.

## Limitações

O ambiente de leitura não conseguiu clonar o repositório; por isso não houve execução independente de testes/build nem verificação visual ao vivo durante esta auditoria. O pacote orienta Claude a iniciar com baseline reproduzível. Não foi declarado que arquivos foram modificados no repositório do usuário: este é um pacote de auditoria para implementação futura.
