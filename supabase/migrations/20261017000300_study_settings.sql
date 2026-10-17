-- Preferências do planejador de estudos (uma linha por usuário; última escrita vence).
create table public.study_settings (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  minutes_per_day smallint not null check (minutes_per_day between 10 and 600),
  weekdays smallint[] not null check (weekdays <@ array[0,1,2,3,4,5,6]::smallint[] and cardinality(weekdays) between 1 and 7),
  daily_question_goal smallint not null default 10 check (daily_question_goal between 1 and 200),
  updated_at timestamptz not null
);

alter table public.study_settings enable row level security;
create policy "settings: ler as próprias" on public.study_settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "settings: inserir as próprias" on public.study_settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "settings: alterar as próprias" on public.study_settings
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

revoke all on public.study_settings from anon, authenticated;
grant select, insert, update on public.study_settings to authenticated;
