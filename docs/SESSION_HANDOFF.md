# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** B concluída; C em andamento.

## Situação atual
App React/Vite funcional com o primeiro fluxo de estudo completo (capítulo de Criptografia, 2 lições, 20 questões autorais comentadas, revisão, histórico, progresso, XP). Persistência local-first com sincronização para o Supabase (projeto `qptxcdksufdpbxddqpsw`, migração `20261017000100_initial_user_progress` aplicada, RLS verificado).

## Última tarefa realizada
Criação do projeto completo, conteúdo, banco, testes e documentação.

## Testes executados
- `npm test` → 37/37 passando.
- `npm run build` → OK.
- `supabase/tests/rls_check.sql` no banco remoto → 13/13 resultados esperados; nenhuma linha persistida.
- Capturas em 390×844 (escuro e claro), sem rolagem horizontal e sem erros de console.

## Erros/limitações conhecidos
- Rede do container bloqueia `concursosfcc.com.br`, `portal.tce.go.gov.br`, `*.supabase.co` → edital não lido; sync HTTP não testado daqui.

## Decisões relevantes
Ver `PRODUCT_DECISIONS.md` (manuscritos antigos + noite na torre; Supabase separado).

## Pendências com o usuário
Ver `OPEN_QUESTIONS.md` (liberar rede; próxima rodada: nome, tom, protagonista, trilha, metas, simulados, ordem dos grimórios).

## Próxima tarefa exata
1. **Se a rede foi liberada:** `WebFetch`/`curl` em https://www.concursosfcc.com.br/concursos/tcego125/index.html → baixar o edital e a retificação 02/2026 (pdftotext disponível) para `docs/fontes/` → atualizar `src/content/contests/tce-go-2026/contest.ts` (tópicos literais do Anexo II, nº de questões por disciplina, regras da discursiva), marcando `oficial-verificado`; atualizar `docs/CONTENT_AND_EDITAL.md` e `CONTENT_COVERAGE.md`; ajustar `topicIds` do capítulo de criptografia se o texto oficial divergir. Verificar com `npm test`.
2. **Senão:** escrever o Grimório de IA (`src/content/grimoires/ia/`, mesmo formato do de segurança: seções `.md`, `index.ts`, `questions-*.ts`, `lessons-*.ts`, registrar em `src/content/index.ts`). Verificar com `npm test` (o teste de integridade cobre novos conteúdos).
3. Pedir ao usuário que teste cadastro/login/sincronização em `npm run dev` no navegador e relate.
