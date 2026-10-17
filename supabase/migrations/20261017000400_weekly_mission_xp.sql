-- XP de missões semanais (uma vez por missão por semana: ref_id = "<semana>:<missão>").
alter table public.xp_events drop constraint xp_events_kind_check;
alter table public.xp_events add constraint xp_events_kind_check
  check (kind in ('question_first_correct', 'lesson_complete', 'chapter_read', 'review_recovered', 'essay_submitted', 'card_mastered', 'weekly_mission'));
