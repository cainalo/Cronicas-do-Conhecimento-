-- Verificação de RLS/privilégios. Executar no SQL Editor (ou via MCP execute_sql).
-- Tudo roda numa transação revertida: não deixa dados no banco.
begin;
insert into auth.users (id, email, instance_id, aud, role) values
 ('11111111-1111-1111-1111-111111111111','a@teste.local','00000000-0000-0000-0000-000000000000','authenticated','authenticated'),
 ('22222222-2222-2222-2222-222222222222','b@teste.local','00000000-0000-0000-0000-000000000000','authenticated','authenticated');
create temp table r(k text, v text) on commit drop;
grant all on r to authenticated, anon;
insert into r select 'profiles_criados_pelo_trigger (esperado 2)', count(*)::text from public.profiles
  where id in ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
insert into public.question_attempts (id,user_id,contest_id,question_id,topic_id,selected_option,is_correct,context,answered_at)
 values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','c','q1','t','A',true,'lesson',now());
insert into public.xp_events (id,user_id,kind,ref_id,amount,created_at) values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','question_first_correct','q1',10,now());
insert into public.xp_events (id,user_id,kind,ref_id,amount,created_at) values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','question_first_correct','q1',10,now())
  on conflict (user_id,kind,ref_id) do nothing;
-- Caminho do upsert usado pela sincronização (ON CONFLICT DO UPDATE)
insert into public.reading_progress (user_id,chapter_id,sections_read,updated_at) values ('11111111-1111-1111-1111-111111111111','cap',array['a'],now());
insert into public.reading_progress (user_id,chapter_id,sections_read,updated_at) values ('11111111-1111-1111-1111-111111111111','cap',array['a','b'],now())
  on conflict (user_id,chapter_id) do update set sections_read = excluded.sections_read, updated_at = excluded.updated_at;
insert into public.lesson_completions (user_id,lesson_id,best_score,first_completed_at,last_completed_at) values ('11111111-1111-1111-1111-111111111111','l',50,now(),now())
  on conflict (user_id,lesson_id) do update set best_score = excluded.best_score;
insert into r select 'A ve suas tentativas (esperado 1)', count(*)::text from public.question_attempts;
insert into r select 'A xp sem duplicata (esperado 1)', count(*)::text from public.xp_events;
insert into r select 'A upsert leitura (esperado 2)', array_length(sections_read,1)::text from public.reading_progress;

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
insert into r select 'B ve tentativas de A (esperado 0)', count(*)::text from public.question_attempts;
insert into r select 'B ve leitura de A (esperado 0)', count(*)::text from public.reading_progress;
insert into r select 'B ve perfis (esperado 1: o proprio)', count(*)::text from public.profiles;
do $$ begin
  begin
    insert into public.question_attempts (id,user_id,contest_id,question_id,topic_id,selected_option,is_correct,context,answered_at)
      values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','c','q2','t','A',true,'lesson',now());
    insert into r values ('B insere como A','PERMITIDO (FALHA)');
  exception when others then insert into r values ('B insere como A','bloqueado: '||sqlerrm); end;
  begin
    update public.reading_progress set sections_read = '{}';
    insert into r values ('B altera leitura de A (linhas afetadas)', (select count(*) from public.reading_progress)::text);
  exception when others then insert into r values ('B altera leitura de A','bloqueado: '||sqlerrm); end;
  begin
    update public.question_attempts set is_correct=false;
    insert into r values ('B update attempts','executou');
  exception when others then insert into r values ('B update attempts','bloqueado: '||sqlerrm); end;
end $$;

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
insert into r select 'A leitura intacta apos B (esperado 2)', array_length(sections_read,1)::text from public.reading_progress;
do $$ begin
  begin
    delete from public.question_attempts;
    insert into r values ('A apaga historico','executou');
  exception when others then insert into r values ('A apaga historico','bloqueado: '||sqlerrm); end;
end $$;

reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$ begin
  begin
    perform count(*) from public.question_attempts;
    insert into r values ('anon le attempts','PERMITIDO (FALHA)');
  exception when others then insert into r values ('anon le attempts','bloqueado: '||sqlerrm); end;
end $$;
reset role;
select * from r;
rollback;
