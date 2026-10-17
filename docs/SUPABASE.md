# Supabase

- Projeto: `cronicas-do-conhecimento` — ref `qptxcdksufdpbxddqpsw` — região sa-east-1 — org `ohaqnnrzsicllhweoszr` (criado em 17/10/2026; custo informado $0).
- URL: https://qptxcdksufdpbxddqpsw.supabase.co · chave publicável em `src/lib/supabase.ts` (pode ser pública; nunca usar service role no cliente).
- ⚠ O projeto `NutriConnect` (mesma org) é de outro produto.

## Migrações
| Arquivo | Aplicada no remoto |
|---|---|
| `20261017000100_initial_user_progress.sql` | ✅ 17/10/2026 (nome `initial_user_progress`) |
| `20261017000200_exam_essay_flashcards.sql` | ✅ 17/10/2026 (nome `exam_essay_flashcards`) |
| `20261017000300_study_settings.sql` | ✅ 17/10/2026 (nome `study_settings`) |
| `20261017000400_weekly_mission_xp.sql` | ✅ 17/10/2026 (nome `weekly_mission_xp`) |

## Esquema (somente dados privados; conteúdo fica no repositório)
| Tabela | Chave | Observações |
|---|---|---|
| profiles | id → auth.users | criada por trigger `on_auth_user_created` (função security definer sem EXECUTE público) |
| question_attempts | id (uuid do cliente) | imutável: só SELECT/INSERT |
| reading_progress | (user_id, chapter_id) | upsert |
| bookmarks | id; único (user_id, chapter_id, section_id) | insert/delete |
| lesson_completions | (user_id, lesson_id) | upsert, guarda melhor nota |
| xp_events | id; **único (user_id, kind, ref_id)** | anti-duplicação de XP; tipos: question_first_correct, review_recovered, lesson_complete, chapter_read, essay_submitted, card_mastered |
| mock_exams | id | simulados concluídos, imutáveis (só SELECT/INSERT) |
| essay_answers | (user_id, prompt_id) | rascunho/entrega discursiva; última escrita vence |
| flashcard_states | (user_id, card_id) | repetição espaçada; última escrita vence |
| study_settings | user_id | minutos/dia, dias da semana, meta diária de questões; última escrita vence |

## Segurança
RLS em todas; políticas `to authenticated` com `(select auth.uid()) = user_id`; `anon` sem privilégio algum; `authenticated` só com os privilégios necessários (sem UPDATE/DELETE no histórico e no XP). Verificado com `supabase/tests/rls_check.sql` e `rls_check_02.sql` e `get_advisors` (0 alertas de segurança; só "unused index" informativo).

## Auth
E-mail + senha; recuperação por link (redireciona para `/conta`, onde se define a nova senha). Ao publicar: cadastrar URL do site em Authentication → URL Configuration. Confirmação de e-mail: configuração padrão do projeto (não alterada).
