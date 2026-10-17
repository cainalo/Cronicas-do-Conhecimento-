# Estado do projeto (atualizado em 2026-10-17)

## Funciona e foi testado
| Funcionalidade | Evidência |
|---|---|
| Leitor do capítulo (sumário, busca com destaque, marcadores, retomada pela última seção, fonte A−/A+, tema claro/escuro, glossário, referências, marcar seção lida) | Teste de fluxo `flow.test.tsx` + inspeção visual 390×844 |
| Lições (cartões → 10 questões → correção comentada → resultado) | `flow.test.tsx` |
| Histórico com filtros (todas/certas/erradas), indicando pendente/salvo | Build + inspeção de código (sem teste dedicado) |
| Revisão de erradas até acertar | `flow.test.tsx`, `study.test.ts` |
| XP único, níveis, progresso/domínio por tópico, recomendação com motivo | `study.test.ts` |
| Persistência local (visitante e por usuário) | `flow.test.tsx` |
| Fusão entre dispositivos / migração visitante→conta | `merge.test.ts` |
| Banco Supabase: 6 tabelas, RLS, privilégios, trigger de perfil, unicidade de XP | `supabase/tests/rls_check.sql` executado no banco remoto (13/13 esperados), advisors de segurança sem alertas |
| Integridade do conteúdo (gabarito, comentários, tópicos do edital, nunca 'oficial') | `content.test.ts` |
| Edital oficial (consolidado 15/09/2026) transcrito: provas, pesos, nº de questões, regras da discursiva, 61 tópicos do Anexo II | Conferido contra o PDF; `npm test` |
| Tela do edital com status de verificação e cobertura por tópico | Build |
| Manifesto web (instalar na tela inicial) | Arquivo presente; não testado em aparelho |

## Implementado, mas NÃO testado ponta a ponta
- **Sincronização real com Supabase e Auth (cadastro, login, recuperação de senha) pelo app.** O container bloqueia `*.supabase.co`; o caminho SQL foi validado, o cliente HTTP não. Testar no navegador do celular/PC.
- Confirmação de e-mail: depende da configuração padrão do Supabase Auth (provavelmente ativa). URL de redirecionamento precisa ser cadastrada ao publicar.

## Incompleto / não iniciado
- Cobertura do edital: 1 de 61 tópicos oficiais com material.
- Flashcards, simulados, discursiva, planejador, missões/conquistas/inventário, narrativa, mapa/trilha visual, service worker/offline, Capacitor/Android.

## Conhecido
- Bundle JS ~660 kB (sem code-splitting) — aceitável por ora.
- Ao publicar em hospedagem estática é preciso fallback de SPA.
