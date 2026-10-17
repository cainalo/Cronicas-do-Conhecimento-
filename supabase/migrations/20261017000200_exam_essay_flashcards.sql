-- Simulados, prática discursiva e flashcards (dados privados do usuário).
-- Alterações não destrutivas: novas tabelas e ampliação da lista de tipos de XP.

-- Simulados concluídos (imutáveis) -----------------------------------------
create table public.mock_exams (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  contest_id text not null,
  question_ids text[] not null check (cardinality(question_ids) between 1 and 200),
  answers jsonb not null default '{}'::jsonb,
  time_limit_min smallint check (time_limit_min between 1 and 600),
  started_at timestamptz not null,
  finished_at timestamptz not null,
  correct smallint not null check (correct >= 0),
  total smallint not null check (total > 0 and correct <= total)
);
create index mock_exams_user_idx on public.mock_exams (user_id, finished_at desc);

-- Respostas discursivas (rascunho único por enunciado, última versão vence) --
create table public.essay_answers (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  prompt_id text not null,
  body text not null default '' check (char_length(body) <= 20000),
  checklist text[] not null default '{}',
  submitted_at timestamptz,
  updated_at timestamptz not null,
  primary key (user_id, prompt_id)
);

-- Estado de repetição espaçada por cartão ----------------------------------
create table public.flashcard_states (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  card_id text not null,
  due_at timestamptz not null,
  interval_days real not null check (interval_days >= 0),
  ease real not null check (ease between 1.3 and 3.5),
  reps integer not null default 0 check (reps >= 0),
  lapses integer not null default 0 check (lapses >= 0),
  updated_at timestamptz not null,
  primary key (user_id, card_id)
);

-- Novos tipos de XP ---------------------------------------------------------
alter table public.xp_events drop constraint xp_events_kind_check;
alter table public.xp_events add constraint xp_events_kind_check
  check (kind in ('question_first_correct', 'lesson_complete', 'chapter_read', 'review_recovered', 'essay_submitted', 'card_mastered'));

-- RLS ------------------------------------------------------------------------
alter table public.mock_exams enable row level security;
alter table public.essay_answers enable row level security;
alter table public.flashcard_states enable row level security;

create policy "exams: ler os próprios" on public.mock_exams
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "exams: inserir os próprios" on public.mock_exams
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "essays: ler as próprias" on public.essay_answers
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "essays: inserir as próprias" on public.essay_answers
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "essays: alterar as próprias" on public.essay_answers
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "cards: ler os próprios" on public.flashcard_states
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "cards: inserir os próprios" on public.flashcard_states
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "cards: alterar os próprios" on public.flashcard_states
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

revoke all on public.mock_exams, public.essay_answers, public.flashcard_states from anon, authenticated;
grant select, insert on public.mock_exams to authenticated;
grant select, insert, update on public.essay_answers to authenticated;
grant select, insert, update on public.flashcard_states to authenticated;
