# Auditoria técnica — Crônicas do Conhecimento

**Data:** 26/10/2026  
**Branch analisada:** `claude/cronicas-conhecimento-estudos-jgbofo`  
**Branch de trabalho desta auditoria:** `codex/qa-visual-audit-20261026`

## Escopo

Leitura estática de `package.json`, `src/App.tsx`, `src/components/Layout.tsx`, páginas de configurações, `src/pages/Book.tsx`, `src/pages/MicroLesson.tsx`, `src/pages/InteractiveUnit.tsx`, `src/components/activities/ActivityView.tsx`, `src/app/native.ts`, `src/app/prefs.tsx`, `src/lib/reset.ts`, `src/test/layout-guard.test.ts`, `src/test/reset.test.tsx`, `scripts/e2e-layout.mjs`, `docs/TESTING.md`, `docs/PROJECT_STATUS.md` e `docs/V4_EXECUCAO.md`.

## Resumo

O repositório já contém código para modo imersivo Android e reinício do progresso. Não dupliquei essas funcionalidades:
- `android/.../MainActivity.java` usa `WindowInsetsControllerCompat` para ocultar as barras e permitir que apareçam temporariamente por gesto.
- `src/pages/settings/Data.tsx` e `src/lib/reset.ts` implementam o reinício com marca temporal e cópia de segurança.
- Os documentos existentes reconhecem que modo imersivo e sincronização real do reinício ainda precisam de validação no aparelho/servidor real.

A principal lacuna confirmada foi a cobertura do QA visual. O script antigo `scripts/e2e-layout.mjs` usa uma lista fixa de rotas e testa overflow horizontal e alguns overlays; ele não gera screenshots. As subpáginas de Conta e todos os 33 capítulos não são exercitados de forma sistemática por esse script. A própria documentação registra coberturas mais amplas do que o arquivo atual do teste executa.

## Mudança feita nesta branch

Foi adicionado `scripts/e2e-visual-audit.mjs` e o comando `npm run test:visual`. A auditoria:
- abre as rotas de navegação e as 33 rotas de capítulos;
- percorre viewports 360×640, 390×844 e 1280×800 em tema claro e escuro;
- guarda screenshot de viewport para cada combinação;
- quando o documento é mais alto que a viewport, guarda também a página inteira e a vista do fim da rolagem;
- mede overflow horizontal, registra erros JavaScript e detecta candidatos a conteúdo cortado em elementos com overflow oculto;
- escreve `artifacts/visual-audit/report.json` e `report.md`.

Candidatos a clipping são heurísticos e devem ser inspecionados nas imagens; nem todo `overflow: hidden` é defeito. Não se deve remover a rolagem de páginas que foram desenhadas para rolar. No livro e nas microaulas de altura fixa, porém, nenhum texto, ilustração, resposta ou CTA pode ficar oculto.

A branch também inclui um workflow de QA que executa testes, build e auditoria, e armazena screenshots como artefato. O workflow de publicação do site/APK inclui a auditoria visual como etapa bloqueante e salva o artefato mesmo quando o teste falha.

## Limitações restantes

Esta mudança ainda precisa ser executada no CI. Não afirmar que testes passam até ver os resultados do Actions e abrir as capturas. O modo imersivo deve ser verificado no APK instalado num Galaxy A14 5G físico, incluindo navegação por três botões e por gestos. A sincronização do reinício deve ser verificada com conta de teste dedicada, não apagando o histórico real do usuário.

## Condições de conclusão

1. `npm ci`, `npm test`, `npm run build`, `npm run test:e2e` e `npm run test:visual` terminam sem falhas.
2. Abrir e revisar o artefato de screenshots, especialmente cada candidato a clipping, os estados de atividades e as configurações.
3. Corrigir e repetir qualquer falha encontrada.
4. Preencher `docs/QA_ANDROID_FISICO.md` após teste manual do APK.
5. Abrir PR para revisão; não mesclar se houver falhas de build/teste nem alegar validação física sem evidência.
