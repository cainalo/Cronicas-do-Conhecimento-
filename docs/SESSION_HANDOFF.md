# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1, após receber o edital)
**Fase:** B concluída; C em andamento.

## Situação atual
App React/Vite funcional com o primeiro fluxo de estudo completo (capítulo de Criptografia, 2 lições, 20 questões autorais comentadas, revisão, histórico, progresso, XP). Persistência local-first com sincronização para o Supabase (projeto `qptxcdksufdpbxddqpsw`, migração `20261017000100_initial_user_progress` aplicada, RLS verificado).
**Edital oficial conferido** (PDF consolidado de 15/09/2026 em `docs/fontes/`); `contest.ts` contém os 14 componentes da prova e 68 tópicos oficiais, todos `oficial-verificado`.

## Testes executados
- `npm test` → 37/37; `tsc -b` OK; `npm run build` OK.
- `supabase/tests/rls_check.sql` no remoto → 13/13 esperados.

## Limitações conhecidas
- Container bloqueia `*.supabase.co`: login/sync HTTP não testados daqui.
- Duração da prova não está no edital (sairá na convocação de 11/12/2026).

## Pendências com o usuário
Ver `OPEN_QUESTIONS.md` (testar login/sync no navegador; rodada criativa: nome, tom, protagonista, trilha, metas, simulados).

## Próxima tarefa exata
**Escrever o Grimório de IA** (9 questões na prova). Criar `src/content/grimoires/ia/` no mesmo formato do de segurança (seções `.md` importadas com `?raw`, `index.ts` com Grimoire + Chapter, `questions-capNN.ts`, `lessons-capNN.ts`) e registrar em `src/content/index.ts`.
- Cap. 1 sugerido: "LLMs, engenharia de prompts e de contexto, RAG e bancos vetoriais" → tópicos `ti.ia-eng.llm`, `ti.ia-eng.contexto`, `ti.ia.generativa`.
- Cap. 2: "Agentes de codificação, ciclo agentivo, MCP, skills/tool use, validação e alucinações" → `ti.ia-eng.agentes`, `ti.ia-eng.mcp`, `ti.ia-eng.qualidade`.
- Cada capítulo: ≥6 seções, ~20 questões autorais (5 alternativas, comentário por alternativa), 2 lições, glossário e referências reais (documentação oficial do MCP, papers de RAG, etc.).
- Verificar com `npm test` (o teste de integridade valida tópicos, gabaritos e seções) e atualizar `docs/CONTENT_COVERAGE.md`.
