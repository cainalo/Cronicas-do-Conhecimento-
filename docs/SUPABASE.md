# Supabase

- Projeto: `cronicas-do-conhecimento` — ref `qptxcdksufdpbxddqpsw` — região sa-east-1 — org `ohaqnnrzsicllhweoszr` (criado em 17/10/2026; custo informado $0).
- URL: https://qptxcdksufdpbxddqpsw.supabase.co · chave publicável em `src/lib/supabase.ts` (pode ser pública; nunca usar service role no cliente).
- ⚠ O projeto `NutriConnect` (mesma org) é de outro produto.

## Migrações
| Arquivo | Aplicada no remoto |
|---|---|
| `20261017000100_initial_user_progress.sql` | ✅ 17/10/2026 (nome `initial_user_progress`) |

## Esquema (somente dados privados; conteúdo fica no repositório)
| Tabela | Chave | Observações |
|---|---|---|
| profiles | id → auth.users | criada por trigger `on_auth_user_created` (função security definer sem EXECUTE público) |
| question_attempts | id (uuid do cliente) | imutável: só SELECT/INSERT |
| reading_progress | (user_id, chapter_id) | upsert |
| bookmarks | id; único (user_id, chapter_id, section_id) | insert/delete |
| lesson_completions | (user_id, lesson_id) | upsert, guarda melhor nota |
| xp_events | id; **único (user_id, kind, ref_id)** | anti-duplicação de XP |

## Segurança
RLS em todas; políticas `to authenticated` com `(select auth.uid()) = user_id`; `anon` sem privilégio algum; `authenticated` só com os privilégios necessários (sem UPDATE/DELETE no histórico e no XP). Verificado com `supabase/tests/rls_check.sql` e `get_advisors` (0 alertas de segurança; só "unused index" informativo).

## Auth
E-mail + senha; recuperação por link (redireciona para `/conta`, onde se define a nova senha). Ao publicar: cadastrar URL do site em Authentication → URL Configuration. Confirmação de e-mail: configuração padrão do projeto (não alterada).
