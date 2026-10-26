-- Crônicas do Conhecimento — esquema inicial de dados privados do usuário.
-- O conteúdo didático (grimórios, questões, edital) é versionado no repositório
-- (src/content) e referenciado aqui por identificadores textuais estáveis.

-- Perfis --------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 60),
  active_contest_id text not null default 'tce-go-2026-tecnico-ti',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Tentativas de questões (histórico imutável) ------------------------------
-- id é gerado no cliente: permite reenvio idempotente após falha de rede.
create table public.question_attempts (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  contest_id text not null,
  question_id text not null,
  topic_id text not null,
  selected_option text not null,
  is_correct boolean not null,
  context text not null check (context in ('lesson', 'review', 'practice', 'exam')),
  context_ref text,
  answered_at timestamptz not null,
  synced_at timestamptz not null default now()
);
create index question_attempts_user_question_idx on public.question_attempts (user_id, question_id, answered_at desc);
create index question_attempts_user_topic_idx on public.question_attempts (user_id, topic_id);

-- Progresso de leitura -----------------------------------------------------
create table public.reading_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  chapter_id text not null,
  last_section_id text,
  sections_read text[] not null default '{}',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

-- Marcadores ---------------------------------------------------------------
create table public.bookmarks (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  chapter_id text not null,
  section_id text not null,
  note text check (char_length(note) <= 500),
  created_at timestamptz not null default now(),
  unique (user_id, chapter_id, section_id)
);

-- Lições concluídas --------------------------------------------------------
create table public.lesson_completions (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id text not null,
  best_score smallint not null check (best_score between 0 and 100),
  first_completed_at timestamptz not null,
  last_completed_at timestamptz not null,
  primary key (user_id, lesson_id)
);

-- Eventos de XP ------------------------------------------------------------
-- A unicidade (user_id, kind, ref_id) impede recompensas duplicadas.
create table public.xp_events (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('question_first_correct', 'lesson_complete', 'chapter_read', 'review_recovered')),
  ref_id text not null,
  amount integer not null check (amount > 0 and amount <= 200),
  created_at timestamptz not null,
  unique (user_id, kind, ref_id)
);

-- Row Level Security -------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.question_attempts enable row level security;
alter table public.reading_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.xp_events enable row level security;

create policy "profiles: ler o próprio" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles: alterar o próprio" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Histórico: o usuário lê e insere apenas o seu; não altera nem apaga.
create policy "attempts: ler as próprias" on public.question_attempts
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "attempts: inserir as próprias" on public.question_attempts
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "reading: ler o próprio" on public.reading_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "reading: inserir o próprio" on public.reading_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "reading: alterar o próprio" on public.reading_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "bookmarks: ler os próprios" on public.bookmarks
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "bookmarks: inserir os próprios" on public.bookmarks
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "bookmarks: apagar os próprios" on public.bookmarks
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "lessons: ler as próprias" on public.lesson_completions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "lessons: inserir as próprias" on public.lesson_completions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "lessons: alterar as próprias" on public.lesson_completions
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "xp: ler os próprios" on public.xp_events
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "xp: inserir os próprios" on public.xp_events
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- Privilégios: anon não acessa nada; authenticated só o necessário.
revoke all on public.profiles, public.question_attempts, public.reading_progress,
  public.bookmarks, public.lesson_completions, public.xp_events from anon;
revoke all on public.profiles, public.question_attempts, public.reading_progress,
  public.bookmarks, public.lesson_completions, public.xp_events from authenticated;
grant select, update (display_name, active_contest_id, updated_at) on public.profiles to authenticated;
grant select, insert on public.question_attempts to authenticated;
grant select, insert, update on public.reading_progress to authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
grant select, insert, update on public.lesson_completions to authenticated;
grant select, insert on public.xp_events to authenticated;
