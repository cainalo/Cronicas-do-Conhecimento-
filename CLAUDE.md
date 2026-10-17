# CLAUDE.md — instruções permanentes

## Ao iniciar qualquer sessão
1. Leia este arquivo e `docs/SESSION_HANDOFF.md`.
2. Consulte `docs/PROJECT_STATUS.md`, `docs/ROADMAP.md`, `docs/PRODUCT_DECISIONS.md`, `docs/OPEN_QUESTIONS.md`.
3. Rode `git status`, `npm install`, `npm test` e compare com o estado documentado.
4. Continue da "Próxima tarefa exata" do handoff. Não reinicie nem refaça o que já funciona.

## Prioridades (nesta ordem)
1. Conteúdo fiel ao edital oficial. 2. Grimórios/capítulos/lições/questões funcionais. 3. Correção comentada, histórico, revisão, progresso persistente. 4. Conforto no celular. 5. Supabase real. 6. Formato da prova e discursiva. 7. Gamificação. 8. Visual/narrativa. 9. App nativo, offline avançado, outros concursos.
Trabalhe em fluxos completos e testados, um de cada vez. Estética nunca atrasa o estudo.

## Colaboração
- Decisões criativas importantes (visual, história, mecânicas, navegação, nome): pergunte com `AskUserQuestion` (3–6 perguntas por rodada, com recomendação e opção "Outra ideia"). Registre em `docs/PRODUCT_DECISIONS.md` (aprovadas) e `docs/OPEN_QUESTIONS.md` (pendentes). Não repita perguntas já respondidas.
- Decisões técnicas reversíveis: decida e documente.
- Exigem aprovação explícita: operações destrutivas no banco, custos externos, publicação/deploy, PR.

## Conteúdo
- Nunca invente disciplinas, artigos legais, comandos, critérios da banca ou fontes.
- Questões: marcar `origin` ('autoral' por padrão). **Nunca** marcar 'oficial' sem comprovação da prova de origem. O teste `src/test/content.test.ts` impede isso.
- Marcar `review` honestamente ('nao-revisado' até revisão humana).
- Dados do edital ficam em `src/content/contests/<id>/contest.ts` com `status` por item ('fonte-secundaria' até conferência no oficial).
- Atualizar `docs/CONTENT_COVERAGE.md` a cada capítulo/questão nova.

## Banco (Supabase, projeto `qptxcdksufdpbxddqpsw`, sa-east-1)
- Alterações só por migração em `supabase/migrations/` aplicada via MCP `apply_migration` (mesmo nome do arquivo).
- RLS em todas as tabelas; após DDL rode `get_advisors` e `supabase/tests/rls_check.sql` (transação revertida).
- Nunca reset destrutivo; nunca service role key no cliente ou no repositório.
- O projeto `NutriConnect` na mesma organização é de OUTRO produto: não tocar.

## Ao final de cada etapa
Atualize `docs/SESSION_HANDOFF.md`, `PROJECT_STATUS.md`, `ROADMAP.md`, `SESSION_LOG.md`, `TESTING.md` e demais afetados. Nunca declare concluído o que não foi testado. Commit com mensagem descritiva e push no branch de trabalho.

## Convenções de código
React 18 + TS + Vite + Tailwind 3 + React Router 6. Regras de estudo puras em `src/lib/study.ts` (testáveis, sem React). Telas só acessam conteúdo via `src/content/index.ts`. Texto da UI em pt-BR.
