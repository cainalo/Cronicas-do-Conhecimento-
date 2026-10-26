-- Reinício do progresso de estudos (pacote v4, etapa 7). Marca de tempo por conta: o app passa a
-- ignorar, no aparelho e na sincronização, os registros de estudo anteriores a ela. Nada é apagado do
-- banco (o histórico continua lá); é reversível anulando a coluna. Migração só aditiva.
alter table public.profiles add column if not exists progress_reset_at timestamptz;

comment on column public.profiles.progress_reset_at is
  'Quando a pessoa reiniciou o progresso de estudos; registros anteriores não contam no app.';
