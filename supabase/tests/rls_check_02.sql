-- Verificação de RLS das tabelas da migração 20261017000200 (simulados, discursivas, flashcards).
-- Transação revertida: não deixa dados.
begin;
insert into auth.users (id, email, instance_id, aud, role) values
 ('11111111-1111-1111-1111-111111111111','a@teste.local','00000000-0000-0000-0000-000000000000','authenticated','authenticated'),
 ('22222222-2222-2222-2222-222222222222','b@teste.local','00000000-0000-0000-0000-000000000000','authenticated','authenticated');
create temp table r(k text, v text) on commit drop;
grant all on r to authenticated, anon;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
insert into public.mock_exams (id,user_id,contest_id,question_ids,answers,started_at,finished_at,correct,total) values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','c',array['q1','q2'],'{"q1":"A"}',now(),now(),1,2);
insert into public.essay_answers (user_id,prompt_id,body,updated_at) values ('11111111-1111-1111-1111-111111111111','ec','texto',now());
insert into public.essay_answers (user_id,prompt_id,body,updated_at) values ('11111111-1111-1111-1111-111111111111','ec','texto 2',now()) on conflict (user_id,prompt_id) do update set body=excluded.body, updated_at=excluded.updated_at;
insert into public.flashcard_states (user_id,card_id,due_at,interval_days,ease,updated_at) values ('11111111-1111-1111-1111-111111111111','fc1',now(),1,2.5,now());
insert into public.xp_events (id,user_id,kind,ref_id,amount,created_at) values (gen_random_uuid(),'11111111-1111-1111-1111-111111111111','essay_submitted','ec',20,now());
insert into r select 'A: essay upsert (esperado texto 2)', body from public.essay_answers;
insert into r select 'A: exames (esperado 1)', count(*)::text from public.mock_exams;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
insert into r select 'B ve exames de A (0)', count(*)::text from public.mock_exams;
insert into r select 'B ve essays de A (0)', count(*)::text from public.essay_answers;
insert into r select 'B ve cards de A (0)', count(*)::text from public.flashcard_states;
do $$ begin
  begin
    update public.essay_answers set body='x';
    insert into r values ('B altera essay de A (linhas, esperado 0)', (select count(*) from public.essay_answers where body='x')::text);
  exception when others then insert into r values ('B altera essay de A','bloqueado: '||sqlerrm); end;
  begin
    insert into public.flashcard_states (user_id,card_id,due_at,interval_days,ease,updated_at) values ('11111111-1111-1111-1111-111111111111','fc9',now(),1,2.5,now());
    insert into r values ('B insere card como A','PERMITIDO (FALHA)');
  exception when others then insert into r values ('B insere card como A','bloqueado: '||sqlerrm); end;
  begin
    delete from public.mock_exams;
    insert into r values ('B apaga exames','executou');
  exception when others then insert into r values ('B apaga exames','bloqueado: '||sqlerrm); end;
end $$;
reset role;
set local role anon;
do $$ begin
  begin perform count(*) from public.essay_answers; insert into r values ('anon le essays','PERMITIDO (FALHA)');
  exception when others then insert into r values ('anon le essays','bloqueado: '||sqlerrm); end;
end $$;
reset role;
select * from r;
rollback;
